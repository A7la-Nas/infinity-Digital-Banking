define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var accntflag = 0;
    return {
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        accessibleCustomerIds: [],
        profileAccess: '',
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
                if (uiData.serverError) {
                    this.setServerError(true)
                }
                if (uiData.accountInfo) {
                    this.updateAccountDetails(uiData.accountInfo);
                }
                if (uiData.noMoreRecords) {
                    this.showNoMoreRecords();
                }
                if (uiData.transactionDetails) {
                    this.setServerError(false);
                    this.updateTransactions(uiData.transactionDetails);
                    FormControllerUtility.setSortingHandlers(this.schduledTransactionsSortMap, this.onSchduledTransactionsSortClickHandler, this);
                    FormControllerUtility.updateSortFlex(this.schduledTransactionsSortMap, uiData.transactionDetails.pagination);
                    this.view.scheduledTransactions.forceLayout();
                }
                if (uiData.accountList) {
                    this.updateAccountList(uiData.accountList);
                }
                if (uiData.topBar) {
                    this.updateTopBar(uiData.topBar);
                }
                if (uiData.campaign) {
                    CampaignUtility.showCampaign(uiData.campaign, this.view, "flxMainWrapper");
                }
                this.AdjustScreen();
            }
        },
        /**  Returns height of the page
         * @returns {String} height height of the page
         */
        getPageHeight: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxMainWrapper.info.frame.height + this.view.flxFooter.info.frame.height + ViewConstants.MAGIC_NUMBERS.FRAME_HEIGHT;
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
         * Method gets called on init of frmScheduled Transaction Controller
         */
        initFrmFunction: function() {
            var scopeObj = this;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
            scopeObj.view.scheduledTransactions.segTransactions.setData([]); //Reset Segment
            //Schedule Transactions sort Map
            scopeObj.schduledTransactionsSortMap = [{
                name: 'scheduledDate',
                imageFlx: scopeObj.view.scheduledTransactions.imgSortDate,
                clickContainer: scopeObj.view.scheduledTransactions.flxDate
            }, {
                name: 'amount',
                imageFlx: scopeObj.view.scheduledTransactions.imgSortAmount,
                clickContainer: scopeObj.view.scheduledTransactions.flxAmount
            }];
            scopeObj.view.scheduledTransactions.imgSortDescription.setVisibility(false);
            scopeObj.view.scheduledTransactions.imgSortType.setVisibility(false);
            scopeObj.view.imgCloseDowntimeWarning.onTouchEnd = function() {
                scopeObj.setServerError(false);
            };
            scopeObj.view.scheduledTransactions.flxPagination.setVisibility(false);
        },
        /**
         * Method to update Pagination Bar
         * @param {Object} transactionDetails transaction details like pagination, transactions etc
         */
        updatePaginationBar: function(transactionDetails) {
            var pagination = transactionDetails.pagination;
            var account = transactionDetails.account;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.scheduledTransactions.lblPagination, (pagination.offset + 1) + " - " + (pagination.offset + pagination.limit) + " " + kony.i18n.getLocalizedString('i18n.common.transactions'), accessibilityConfig);
            this.view.scheduledTransactions.flxPaginationPrevious.onClick = this.loadAccountModule().presentationController.fetchPreviousScheduledTransactions.bind(this.loadAccountModule().presentationController, account);
            this.view.scheduledTransactions.flxPaginationNext.onClick = this.loadAccountModule().presentationController.fetchNextScheduledTransactions.bind(this.loadAccountModule().presentationController, account);
            if (pagination.offset >= pagination.paginationRowLimit) {
                this.view.scheduledTransactions.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                this.view.scheduledTransactions.flxPaginationPrevious.setEnabled(true);
            } else {
                this.view.scheduledTransactions.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                this.view.scheduledTransactions.flxPaginationPrevious.setEnabled(false);
            }
            if (pagination.limit < pagination.paginationRowLimit) {
                this.view.scheduledTransactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                this.view.scheduledTransactions.flxPaginationNext.setEnabled(false);
            } else {
                this.view.scheduledTransactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                this.view.scheduledTransactions.flxPaginationNext.setEnabled(true);
            }
            this.AdjustScreen();
        },
        /**
         * Method gets called on preshow of frmScheduled Transaction Controller
         */
        preshowFunction: function() {
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.accessibleCustomerIds = applicationManager.getUserPreferencesManager().accessibleCustomerIds;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var scopeObj = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.scheduledTransactions.lblTransactions, kony.i18n.getLocalizedString("i18n.accounts.scheduledTransactions"), accessibilityConfig);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            //this.onBreakpointChange(kony.application.getCurrentBreakpoint());
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.accountTypes.setVisibility(false);
            this.view.accountInfo.setVisibility(false);
            this.view.customheader.forceCloseHamburger();
            this.view.breadcrumb.setBreadcrumbData([{
                text: kony.i18n.getLocalizedString("i18n.topmenu.accounts")
            }, {
                text: kony.i18n.getLocalizedString("i18n.transfers.accountDetails")
            }]);
            this.view.breadcrumb.btnBreadcrumb1.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            this.view.breadcrumb.lblBreadcrumb2.toolTip = kony.i18n.getLocalizedString("i18n.transfers.accountDetails");
            scopeObj.view.scheduledTransactions.btnViewAccountList.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.ViewAccountList");
            //SET ACTIONS:
            this.view.flxAccountTypes.onTouchStart = function() {
                if (scopeObj.view.accountTypes.isVisible) {
                    scopeObj.view.accountTypes.origin = true;
                    if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                        scopeObj.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                        scopeObj.view.accountTypes.isVisible = false;
                    }
                }
            }
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader',
                'flxMain',
                'flxFooter',
                'flxMainWrapper',
                'flxDowntimeWarning',
                'flxAccountTypes',
                'customheader',
                'imgAccountTypes'
            ,'flxFormContent']);

            this.view.flxAccountTypes.onClick = function() {
                scopeObj.showAccountTypes();
            };
            applicationManager.getNavigationManager().applyUpdates(this);
            CampaignUtility.fetchPopupCampaigns();
        },
        /**
         * Method gets called on preshow of frmScheduled Transaction Controller
         */
        postShowFrmAccountDetails: function() {
            this.view.customheader.imgKony.setFocus(true);
            this.view.accountInfo.left = 420 + this.view.flxMain.info.frame.x + ViewConstants.POSITIONAL_VALUES.DP;
            if (kony.application.getCurrentBreakpoint() > 640) {
                this.view.accountTypes.left = 89 + this.view.flxMain.info.frame.x + ViewConstants.POSITIONAL_VALUES.DP;
            }
            this.AdjustScreen();

        },
        /**
         * Method to show account info
         *
         */
        showAccountInfo: function() {
            if (this.view.accountInfo.isVisible === false) {
                var top;
                if (this.view.flxDowntimeWarning.isVisible) {
                    top = "185" + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    top = "105" + ViewConstants.POSITIONAL_VALUES.DP;
                }
                this.view.accountInfo.top = top;
                this.view.accountInfo.isVisible = true;
            } else {
                this.view.accountInfo.isVisible = false;
            }
        },
        /**
         * Method to display account types flex
         */
        showAccountTypes: function() {
            if (this.view.accountTypes.origin) {
                this.view.accountTypes.origin = false;
                return;
            }
            this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
            this.view.accountTypes.imgToolTip.setFocus(true);
            if (this.view.flxDowntimeWarning.isVisible === true) {
                this.view.accountTypes.top = this.view.flxDowntimeWarning.info.frame.height + 20 + ViewConstants.POSITIONAL_VALUES.DP;
            } else {
                this.view.accountTypes.top = "60dp";
            }
            if (kony.application.getCurrentBreakpoint() > 640 && !(this.orientationHandler.isMobile)) {
                this.view.accountTypes.left = (this.view.flxMain.info.frame.x + this.view.flxAccountTypes.info.frame.x) + "dp";
            }
            this.view.accountTypes.isVisible = true;
            this.view.forceLayout();
        },
        /**
         * On Transactions Sort click handler.
         * @param {object} event, click event object.
         * @param {object} data, column details.
         */
        onSchduledTransactionsSortClickHandler: function(event, data) {
            var scopeObj = this;
            applicationManager.getPaginationManager().resetValues(); //for sorting reset offset.
            scopeObj.loadAccountModule().presentationController.fetchScheduledFormTransactions(null, data);
        },
        /**
         *  Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.info.frame.height + this.view.flxMainWrapper.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
                }
                this.view.forceLayout();
            } else {
                this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
                this.view.forceLayout();
            }
        },
        /**
         * Method to show server error on and off
         * @param {Boolean} status true/false
         */
        setServerError: function(status) {
            if (status === true) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.lblDowntimeWarning, kony.i18n.getLocalizedString("i18n.common.OoopsServerError"), accessibilityConfig);
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.lblDowntimeWarning.setFocus(true);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            this.AdjustScreen();
        },
        /**
         * Method to show account details
         * @param {JSON} account Account whose details needs to be shown
         */
        updateAccountDetails: function(account) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblAccountTypes, CommonUtilities.getAccountName(account) + " " + CommonUtilities.accountNumberMask(account.accountID), accessibilityConfig);
            //if(applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true"){
            if (this.profileAccess === "both") {
                this.view.lblIconAccountType.text = account.isBusinessAccount === "true" ? 'r' : 's';
                this.view.lblIconAccountType.setVisibility(true);
            } else
                this.view.lblIconAccountType.setVisibility(false);
            this.view.lblAccountTypes.toolTip = CommonUtilities.getAccountName(account) + CommonUtilities.accountNumberMask(account.accountID);
            this.updateAccountInfo(account);
            this.view.scheduledTransactions.btnViewAccountList.onClick = this.loadAccountModule().presentationController.showAccountDetails.bind(this.loadAccountModule().presentationController, account);
        },
        /**
         *  Method to handle account type to account image w.r.t account info
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
            this.view.accountTypes.forceLayout();
            this.AdjustScreen();
        },
        /**
         * Method to display account info w.r.t account
         * @param {JSON}  account Account whos info needs to be shown
         */
        updateAccountInfo: function(account) {
            var controller = this;
            var LabelToDisplayMap = {
                accountNumber: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                routingNumber: kony.i18n.getLocalizedString("i18n.accounts.routingNumber"),
                swiftCode: kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                primaryAccountHolder: kony.i18n.getLocalizedString("i18n.accounts.primaryholder"),
                jointHolder: kony.i18n.getLocalizedString("i18n.accounts.jointHolder"),
                creditcardNumber: kony.i18n.getLocalizedString("i18n.accountDetail.creditCardNumber"),
                creditIssueDate: kony.i18n.getLocalizedString("i18n.accountDetail.creditIssueDate")
            };
            var accountInfo = {
                accountName: CommonUtilities.getAccountName(account),
                accountNumber: account.accountID,
                accountID: account.accountID,
                accountType: account.accountType,
                routingNumber: account.routingNumber,
                swiftCode: account.swiftCode,
                primaryAccountHolder: account.accountHolder,
                jointHolder: account.jointHolders,
                creditIssueDate: CommonUtilities.getFrontendDateString(account.openingDate),
                creditcardNumber: account.creditCardNumber
            }
            var AccountTypeConfig = {};
            AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = ['accountNumber', 'routingNumber', 'swiftCode', 'primaryAccountHolder', 'jointHolder'],
                AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = ['creditcardNumber', 'primaryAccountHolder', 'creditIssueDate'],
                AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = ['accountNumber', 'primaryAccountHolder', 'jointHolder'],
                AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = ['accountNumber', 'primaryAccountHolder', 'jointHolder'],
                AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = ['accountNumber', 'routingNumber', 'swiftCode', 'primaryAccountHolder', 'jointHolder'],
                AccountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = ['accountNumber', 'primaryAccountHolder', 'jointHolder']
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
            }];
            AccountInfoUIConfigs.map(function(uiConfig, i) {
                var toShow = null;
                var key = AccountTypeConfig[account.accountType][i];
                if (key) {
                    toShow = {
                        label: key,
                        value: accountInfo[key]
                    };
                }
                return {
                    uiConfig: uiConfig,
                    toShow: toShow
                };
            }).forEach(function(config) {
                if (config.toShow === null) {
                    controller.view.accountInfo[config.uiConfig.flx].isVisible = false;
                    controller.view.accountInfo[config.uiConfig.label].text = '';
                    controller.view.accountInfo[config.uiConfig.value].text = '';
                } else {
                    controller.view.accountInfo[config.uiConfig.flx].isVisible = true;
                    controller.view.accountInfo[config.uiConfig.label].text = LabelToDisplayMap[config.toShow.label];
                    controller.view.accountInfo[config.uiConfig.value].text = config.toShow.value;
                }
            });
            this.view.accountInfo.forceLayout();
            this.alignAccountTypesToAccountSelectionImg();
        },
        /**
         *  Method update flexs w.r.t transactions
         * @param {Object} transactionDetails transaction details like pagination, transactions etc
         */
        adjustUIForTransactions: function(transactionDetails) {
            if (transactionDetails.scheduledTransactions.length > 0) {
                this.view.scheduledTransactions.flxNoTransactions.isVisible = false;
                this.view.scheduledTransactions.flxSort.isVisible = true;
                if (transactionDetails) {
                    this.updatePaginationBar(transactionDetails);
                    this.view.scheduledTransactions.flxPagination.setVisibility(true);
                }
            } else {
                this.view.scheduledTransactions.flxNoTransactions.isVisible = true;
                this.view.scheduledTransactions.flxSort.isVisible = false;
                this.view.scheduledTransactions.flxPagination.setVisibility(false);
            }
        },
        /**
         *  Method to format account name
         * @param {string}  accountName account name
         * @returns {String} Account Name
         */
        formatAccountName: function(accountName) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (accountName.length <= OLBConstants.ACCOUNT_LIST_NAME_MAX_LENGTH) {
                return accountName;
            } else {
                return accountName.substring(0, OLBConstants.ACCOUNT_LIST_NAME_MAX_LENGTH) + '...';
            }
        },
        /**
         * Method to create accounts list segment model
         * @param {JSON} account Account whose view model is required
         * @returns {JSON} account segment view model
         */
        createAccountListSegmentsModel: function(account) {
            if (this.orientationHandler === null) {
                this.orientationHandler = new OrientationHandler();
            }
            return {
                "lblUsers": {
                    "text": this.formatAccountName(CommonUtilities.getAccountName(account)),
                    "toolTip": CommonUtilities.getAccountName(account),
                    "accessibilityconfig": {
                        "a11yLabel": this.formatAccountName(CommonUtilities.getAccountName(account)),
                    }
                },
                "lblSeparator": "Separator",
                "flxAccountTypes": {
                    "onClick": this.loadAccountModule().presentationController.showScheduledTransactionsForm.bind(this.loadAccountModule().presentationController, account)
                },
                "flxAccountTypesMobile": {
                    "onClick": this.loadAccountModule().presentationController.showScheduledTransactionsForm.bind(this.loadAccountModule().presentationController, account)
                },
                template: kony.application.getCurrentBreakpoint() == 640 || this.orientationHandler.isMobile ? "flxAccountTypesMobile" : "flxAccountTypes"
            };
        },
        /**
         * Method to bind data to accounts list segment
         * @param {Collection} accounts account list view model
         */
        updateAccountList: function(accounts) {
            if (!this.isSingleCustomerProfile) {
                var dataMap = {
                    //                 "lblDefaultAccountIcon": "lblDefaultAccountIcon",
                    //                 "lblDefaultAccountName": "lblDefaultAccountName",
                    //                 "accountId": "accountId",
                    // 				"lblAccountRoleType":"lblAccountRoleType",
                    //                 "lblAccountTypeHeader":"lblAccountTypeHeader",
                    // 				"flxDefaultAccountsHeader":"flxDefaultAccountsHeader",
                    //             	"flxRowDefaultAccounts": "flxRowDefaultAccounts"
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
                this.view.accountTypes.segAccountTypes.widgetDataMap = dataMap;
                var segData = this.getDataWithSections(accounts);
                this.view.accountTypes.segAccountTypes.setData(segData);
            } else {
                var data = this.getDataWithAccountTypeSections(accounts); //accounts.map(this.createAccountListSegmentsModel);
                var dataMap = {
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
                this.view.accountTypes.segAccountTypes.widgetDataMap = dataMap;
                this.view.accountTypes.segAccountTypes.setData(data);
            }
            this.view.accountTypes.forceLayout();
            this.AdjustScreen();
        },
        /**Method to group accounts by company type
         * @param {Collection} accounts account list view model
         */

        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser;
            var business = kony.i18n.getLocalizedString("i18n.accounts.Business");
            var personal = kony.i18n.getLocalizedString("i18n.accounts.Personal");
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
                        accountTypeIcon = "s";
                    }
                    //                      }
                    else {
                        accountType = account.Membership_id;
                        accountTypeIcon = "s";
                    }
                } else {
                    accountType = account.Membership_id;
                    accountTypeIcon = "r";
                }

                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    if (accountType != "Personal Accounts") prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            //             lblAccountRoleType: accountType === personal ? "s" : "r",
                            //             lblAccountTypeHeader: accountType,
                            //             template: "flxDefaultAccountsHeader"
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentData(account)]
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
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
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
                        [scopeObj.createSegmentData(account)]
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
         * Method to create Accounts List segment view model
         * @param {JSON} account Account for which you want to create view Model
         * @returns {JSON} View model
         */
        createSegmentData: function(account) {
            var dataObject = {
                "lblDefaultAccountName": CommonUtilities.getAccountDisplayName(account),
                "accountID": account.Account_id || account.accountID || account.accountNumber,
                "lblDefaultAccountIcon": {
                    text: account.isBusinessAccount === "true" ? "r" : "s",
                    isVisible: this.profileAccess === "both" ? true : false
                },
                "flxRowDefaultAccounts": {
                    "isVisible": true,
                    "onClick": this.loadAccountModule().presentationController.showScheduledTransactionsForm.bind(this.loadAccountModule().presentationController, account)
                },
                template: "flxRowDefaultAccounts"
            };
            return dataObject;
        },
        /**
         * Method to create transaction UI view model
         * @param {JSON}  transaction transaction view model
         * @return {JSON} formatted UI transaction view model
         */
        createTransactionSegmentModel: function(transaction) {
            var scopeObj = this;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            return {
                btnAction: {
                    text: kony.i18n.getLocalizedString("i18n.transfers.Modify"),
                    toolTip: kony.i18n.getLocalizedString("i18n.common.modifyTransaction"),
                    onClick: function() {
                        scopeObj.onModifyTransaction(transaction);
                    },
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.Modify"),
                    }
                },
                btnCancelThisOccurrence: {
                    text: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? kony.i18n.getLocalizedString("i18n.transfers.Cancel") : kony.i18n.getLocalizedString("i18n.common.cancelThisOccurrence"),
                    toolTip: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? kony.i18n.getLocalizedString("i18n.transfers.Cancel") : kony.i18n.getLocalizedString("i18n.common.cancelThisOccurrence"),
                    isVisible: true,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? kony.i18n.getLocalizedString("i18n.transfers.Cancel") : kony.i18n.getLocalizedString("i18n.common.cancelThisOccurrence"),
                    },
                    onClick: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? function() {
                        scopeObj.onCancelTransaction(transaction);
                    } : function() {
                        scopeObj.onCancelOccurrence(transaction);
                    }
                },
                btnCancelSeries: {
                    text: kony.i18n.getLocalizedString("i18n.common.cancelSeries"),
                    toolTip: kony.i18n.getLocalizedString("i18n.common.cancelSeries"),
                    isVisible: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? false : true,
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.cancelSeries"),
                    },
                    onClick: function() {
                        scopeObj.onCancelSeries(transaction);
                    }
                },
                lblSeparatorLineActions: {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "accessibilityconfig": {
                        "a11yLabel": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    }
                },
                imgDropdown: {
                    "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                    "accessibilityconfig": {
                        "a11yLabel": "View Transaction Details"
                    }
                },
                lblAmount: {
                    "text": CommonUtilities.getDisplayCurrencyFormat(transaction.amount),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(transaction.amount),
                    }
                },
                lblDate: {
                    "text": CommonUtilities.getFrontendDateString(transaction.scheduledDate),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.getFrontendDateString(transaction.scheduledDate),
                    }
                },
                lblDescription: {
                    "text": transaction.description,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.description,
                    }
                },
                lblSeparator2: " ",
                lblType: {
                    "text": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transaction.transactionType) != null ?
                        applicationManager.getTypeManager().getTransactionTypeDisplayValue(transaction.transactionType) :
                        transaction.transactionType),
                    "accessibilityconfig": {
                        "a11yLabel": (applicationManager.getTypeManager().getTransactionTypeDisplayValue(transaction.transactionType) != null ?
                            applicationManager.getTypeManager().getTransactionTypeDisplayValue(transaction.transactionType) :
                            transaction.transactionType),
                    }
                },
                lblToTitle: {
                    "text": kony.i18n.getLocalizedString("i18n.common.To"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.To"),
                    }
                },
                lblNotesTitle: {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                lblToValue: {
                    "text": transaction.payPersonName || transaction.payeeNickName || transaction.payeeName || transaction.toAccountName,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.payPersonName || transaction.payeeNickName || transaction.payeeName || transaction.toAccountName,
                    }
                },
                lblNotesValue: {
                    "text": transaction.transactionsNotes ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                    "accessibilityconfig": {
                        "a11yLabel": transaction.transactionsNotes ? transaction.transactionsNotes : kony.i18n.getLocalizedString("i18n.common.none"),
                    }
                },
                lblFrequencyTitle: {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),
                    }
                },
                lblFrequencyValue: {
                    "text": transaction.frequencyType,
                    "accessibilityconfig": {
                        "a11yLabel": transaction.frequencyType,
                    }
                },
                flxRecurrenceTitle: {
                    isVisible: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? false : true
                },
                flxRecurrenceValue: {
                    isVisible: transaction.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? false : true
                },
                lblRecurrenceTitle: {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.recurrence"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.recurrence"),
                    }
                },
                lblRecurrenceValue: {
                    "text": transaction.recurrenceDesc ? transaction.recurrenceDesc : "-",
                    "accessibilityconfig": {
                        "a11yLabel": transaction.recurrenceDesc ? transaction.recurrenceDesc : "-",
                    }
                },
                lblSeperator: " ",
                template: kony.application.getCurrentBreakpoint() == 640 ? "flxScheduledTransactionsMobile" : "flxScheduledTransactions"
            };
        },
        /**
         * Method to update transaction segment with transactions
         * @param {Object} transactionDetails Transaction details like list of transactions
         */
        updateTransactions: function(transactionDetails) {
            this.view.flxCancelPopup.setVisibility(false);
            this.view.accountTypes.setVisibility(false);
            this.view.scheduledTransactions.segTransactions.widgetDataMap = {
                btnAction: "btnAction",
                btnCancelThisOccurrence: "btnCancelThisOccurrence",
                btnCancelSeries: "btnCancelSeries",
                flxAction: "flxAction",
                flxAmount: "flxAmount",
                flxDate: "flxDate",
                flxDescription: "flxDescription",
                flxDropdown: "flxDropdown",
                flxScheduledTransactionsSelectedMobile: "flxScheduledTransactionsSelectedMobile",
                flxScheduledTransactionsSelected: "flxScheduledTransactionsSelected",
                flxScheduledTransactions: "flxScheduledTransactions",
                flxScheduledTransactionsMobile: "flxScheduledTransactionsMobile",
                flxSegScheduledTransactions: "flxSegScheduledTransactions",
                flxSegTransactionRowWrapper: "flxSegTransactionRowWrapper",
                lblSeperator: "lblSeperator",
                lblSeparatorLineActions: "lblSeparatorLineActions",
                flxButtonContainer: "flxButtonContainer",
                flxType: "flxType",
                flxWrapper: "flxWrapper",
                imgDropdown: "imgDropdown",
                lblAmount: "lblAmount",
                lblDate: "lblDate",
                lblDescription: "lblDescription",
                lblSeparator2: "lblSeparator2",
                lblType: "lblType",
                flxDetail: 'flxDetail',
                flxDetailWrapperOne: 'flxDetailWrapperOne',
                flxDetailWrapperTwo: 'flxDetailWrapperTwo',
                flxToTitle: 'flxToTitle',
                flxNotesTitle: 'flxNotesTitle',
                flxToValue: 'flxToValue',
                flxNotesValue: 'flxNotesValue',
                flxFrequencyTitle: 'flxFrequencyTitle',
                flxFrequencyValue: 'flxFrequencyValue',
                flxRecurrenceTitle: 'flxRecurrenceTitle',
                flxRecurrenceValue: 'flxRecurrenceTitle',
                lblFrequencyTitle: 'lblFrequencyTitle',
                lblFrequencyValue: 'lblFrequencyValue',
                lblRecurrenceTitle: 'lblRecurrenceTitle',
                lblRecurrenceValue: 'lblRecurrenceValue',
                lblToTitle: "lblToTitle",
                lblNotesTitle: "lblNotesTitle",
                lblToValue: "lblToValue",
                lblNotesValue: "lblNotesValue",
            };
            this.adjustUIForTransactions(transactionDetails);
            this.view.scheduledTransactions.segTransactions.setData(transactionDetails.scheduledTransactions.map(this.createTransactionSegmentModel));
            this.view.scheduledTransactions.forceLayout();
            FormControllerUtility.hideProgressBar(this.view)
            this.AdjustScreen();
        },
        /**
         * Method that gets called on click of modify transaction
         * @param {JSON} transaction transaction that needs to be modified
         */
        onModifyTransaction: function(transaction) {
            var transactionData;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var onCancel = this.loadAccountModule().presentationController.presentScheduledTransaction.bind(this.loadAccountModule().presentationController);
            if (transaction.transactionType === OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER || transaction.transactionType === OLBConstants.TRANSACTION_TYPE.INTERNALTRANSFER) {
                transactionData = {
                    "amount": String(Math.abs(transaction.amount)),
                    "frequencyEndDate": transaction.frequencyEndDate,
                    "frequencyStartDate": transaction.frequencyStartDate,
                    "frequencyType": transaction.frequencyType,
                    "fromAccountNumber": transaction.fromAccountNumber,
                    "isScheduled": transaction.isScheduled,
                    "numberOfRecurrences": transaction.numberOfRecurrences,
                    "scheduledDate": transaction.scheduledDate,
                    "toAccountNumber": transaction.toAccountNumber,
                    "transactionDate": transaction.transactionDate,
                    "ExternalAccountNumber": transaction.ExternalAccountNumber,
                    "transactionId": transaction.transactionId,
                    "notes": transaction.transactionsNotes,
                    "serviceName": transaction.serviceName,
                    "transactionType": transaction.transactionType,
                    "category": transaction.category,
                    "isInternationalAccount": transaction.isInternationalAccount
                };
                if (transaction.isInternationalAccount === "false" && transaction.transactionType === OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER) {
                    transactionData.IBAN = transaction.IBAN ? transaction.IBAN : "",
                        transactionData.toAccountName = transaction.toAccountName ? transaction.toAccountName : "";
                } else if (transaction.isInternationalAccount === "true" && transaction.transactionType === OLBConstants.TRANSACTION_TYPE.EXTERNALTRANSFER) {
                    transactionData.swiftCode = transaction.swiftCode ? transaction.swiftCode : "";
                    transactionData.toAccountName = transaction.toAccountName ? transaction.toAccountName : "";
                    transactionData.bankName = transaction.bankName ? transaction.bankName : "";
                    transactionData.ExternalAccountNumber = transaction.ExternalAccountNumber ? transaction.ExternalAccountNumber : "";
                }
                this.loadAccountModule().presentationController.modifyTransfer(transactionData, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.BILLPAY)) {
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
                    "referenceNumber": transaction.transactionId,
                    "isScheduled": transaction.isScheduled,
                    "lastPaidAmount": transaction.billPaidAmount || transaction.lastPaidAmount,
                    "lastPaidDate": transaction.billPaidDate || transaction.lastPaidDate,
                    "nameOnBill": transaction.nameOnBill,
                    "eBillSupport": transaction.eBillSupport,
                    "eBillStatus": transaction.eBillEnable,
                    "billDueDate": transaction.billDueDate,
                    "billCategory": transaction.billCategoryId,
                    "billCategoryName": transaction.billCategory,
                    "billGeneratedDate": transaction.billGeneratedDate,
                    "frequencyType": transaction.frequencyType,
                    "numberOfRecurrences": transaction.numberOfRecurrences,
                    "frequencyStartDate": transaction.frequencyStartDate,
                    "frequencyEndDate": transaction.frequencyEndDate,
                    "ebillURL": transaction.ebillURL
                }
                this.loadAccountModule().presentationController.repeatBillPay(transactionData, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.P2P)) {
                this.loadAccountModule().presentationController.repeatP2P(transaction, onCancel);
            } else if (transaction.transactionType === applicationManager.getTypeManager().getTransactionTypeBackendValue(OLBConstants.TRANSACTION_TYPE.LOAN)) {
                this.loadAccountModule().presentationController.modifyLoan(transaction.toAccountNumber, onCancel);
            }
        },
        /**
         * Method to handle transaction cancel action
         * @param {JSON} transaction transaction that needs to be cancelled
         */
        onCancelTransaction: function(transaction) {
            var self = this;
            this.view.flxCancelPopup.setVisibility(true);
            this.view.flxCancelPopup.height = this.getPageHeight();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.CustomPopupCancel.lblPopupMessage, kony.i18n.getLocalizedString("I18n.billPay.QuitTransactionMsg"), accessibilityConfig);
            CommonUtilities.setText(this.view.CustomPopupCancel.lblHeading, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                FormControllerUtility.showProgressBar(self.view);
                self.loadAccountModule().presentationController.cancelScheduledTransaction(transaction);
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
            this.view.CustomPopupCancel.imgCross.onTouchEnd = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
        },
        /**
         * Method to handle transaction cancel occurence action
         * @param {JSON} transaction transaction that needs to be cancelled
         */
        onCancelOccurrence: function(transaction) {
            var self = this;
            this.view.flxCancelPopup.setVisibility(true);
            this.view.flxCancelPopup.height = this.getPageHeight();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.CustomPopupCancel.lblPopupMessage, kony.i18n.getLocalizedString("i18n.common.cancelOccurrenceMessage"), accessibilityConfig);
            CommonUtilities.setText(this.view.CustomPopupCancel.lblHeading, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                self.view.flxCancelPopup.setVisibility(false);
                self.loadAccountModule().presentationController.cancelScheduledTransactionOccurrence(transaction);
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
            this.view.CustomPopupCancel.imgCross.onTouchEnd = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
        },
        /**
         * Method to handle transaction cancel series action
         * @param {JSON} transaction transaction that needs to be cancelled
         */
        onCancelSeries: function(transaction) {
            var self = this;
            this.view.flxCancelPopup.setVisibility(true);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.CustomPopupCancel.lblPopupMessage, kony.i18n.getLocalizedString("i18n.common.cancelSeriesMessage"), accessibilityConfig);
            CommonUtilities.setText(this.view.CustomPopupCancel.lblHeading, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                FormControllerUtility.showProgressBar(self.view);
                self.view.flxCancelPopup.setVisibility(false);
                self.loadAccountModule().presentationController.cancelScheduledTransactionSeries(transaction);
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
            this.view.CustomPopupCancel.imgCross.onTouchEnd = function() {
                self.view.flxCancelPopup.setVisibility(false);
            };
        },
        orientationHandler: null,
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            if (this.orientationHandler === null) {
                this.orientationHandler = new OrientationHandler();
            }
            this.orientationHandler.onOrientationChange(this.onBreakpointChange);
            this.view.customheader.onBreakpointChangeComponent(width);
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.setupFormOnTouchEnd(width);
            this.AdjustScreen();
            var responsiveFonts = new ResponsiveFonts();
            var mobileTemplates = {
                "flxScheduledTransactions": "flxScheduledTransactionsMobile",
                "flxScheduledTransactionsSelected": "flxScheduledTransactionsSelectedMobile",
            };
            var desktopTemplates = {
                "flxScheduledTransactionsMobile": "flxScheduledTransactions",
                "flxScheduledTransactionsSelectedMobile": "flxScheduledTransactionsSelected",
            };
            if (width === 640) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, kony.i18n.getLocalizedString('i18n.accounts.scheduledTransactions'), accessibilityConfig);
                this.view.scheduledTransactions.segTransactions.top = "-41dp";
                this.view.scheduledTransactions.lblTransactions.skin = "slLabel0d8a72616b3cc47";
                responsiveFonts.setMobileFonts();
                var data = this.view.scheduledTransactions.segTransactions.data;
                if (data === undefined) return;
                data.map(function(e) {
                    if (mobileTemplates[e.template] === undefined) return;
                    e.template = mobileTemplates[e.template];
                });
                this.view.scheduledTransactions.segTransactions.setData(data);
            } else {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.customheader.lblHeaderMobile, "", accessibilityConfig);
                this.view.scheduledTransactions.segTransactions.top = "0dp";
                this.view.scheduledTransactions.lblTransactions.skin = "sknlbl424242SSPReg17px";
                responsiveFonts.setDesktopFonts();
                var data = this.view.scheduledTransactions.segTransactions.data;
                if (data == undefined) return;
                data.map(function(e) {
                    if (desktopTemplates[e.template] == undefined) return;
                    e.template = desktopTemplates[e.template];
                });
                this.view.scheduledTransactions.segTransactions.setData(data);
            }
            this.AdjustScreen();
            this.view.forceLayout();
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
        nullifyPopupOnTouchStart: function() {},
        /**
         * Method to display no more recored in pagination.
         */
        showNoMoreRecords: function() {
            this.view.scheduledTransactions.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            this.view.scheduledTransactions.flxPaginationNext.setEnabled(false);
            FormControllerUtility.hideProgressBar(this.view);
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound")); //PM expected this change.
        }
    };
});