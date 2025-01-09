define({
	init : function(){
       var navManager = applicationManager.getNavigationManager();
       var currentForm=navManager.getCurrentForm();
       applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    setInitialFormConfigurations: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : setInitialFormConfigurations ####");
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxHeader.isVisible = false;
                this.view.flxFooter.isVisible = true;
            } else {
                this.view.flxFooter.isVisible = false;
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.ExternalAccounts.ManageOtherBankAccounts");
            }
            this.view.flxMainContainer.skin = "slFboxmb";
             var configManager = applicationManager.getConfigurationManager();
             var MenuHandler =  applicationManager.getMenuHandler();
          MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENUMANAGEOTHERBANKACCOUNTS);
            this.view.tbxSearch.setEnabled(false);
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.ExternalAccounts.ManageOtherBankAccounts");
            this.view.btnAdd.onClick = this.navigateToExtenalBanksList;
            this.view.segTransactions.onRowClick = this.fetchSingleExternalAccountDetails;
            this.view.customSearchbox.tbxSearch.onTextChange = this.displaySearchedAccounts;
            var externalAccountsData = this.getExternalAccountsData();
            this.setExternalAccountsData(externalAccountsData);
            this.view.flxSearchOverLap.onClick = this.onEditSearchContext;
            this.view.customSearchbox.btnCancel.onClick = this.cancelSearch;
            var navigationManager = applicationManager.getNavigationManager();
            var isAccountDeletionFailed = navigationManager.getCustomInfo("externalAccountDeletionErrorResponse");
            if (isAccountDeletionFailed && isAccountDeletionFailed !== undefined && isAccountDeletionFailed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.externalAccounts.externalAccountDeletionErrorResponse"));
                navigationManager.setCustomInfo("externalAccountDeletionErrorResponse", false);
            }
            var isAccountDeletionSucceed = navigationManager.getCustomInfo("externalAccountDeletionSuccessResponse");
            if (isAccountDeletionSucceed && isAccountDeletionSucceed !== undefined && isAccountDeletionSucceed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.externalAccounts.externalAccountDeletionSuccessResponse"));
                navigationManager.setCustomInfo("externalAccountDeletionSuccessResponse", false);
            }
            var isNickNameUpdationFailed = navigationManager.getCustomInfo("ExternalAccountNickNameUpdationFailure");
            if (isNickNameUpdationFailed && isNickNameUpdationFailed !== undefined && isNickNameUpdationFailed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.Manage.nickNameUpdationFailed"));
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationFailure", false);
            }
            var isNickNameUpdationSucceed = navigationManager.getCustomInfo("ExternalAccountNickNameUpdationSuccess");
            if (isNickNameUpdationSucceed && isNickNameUpdationSucceed !== undefined && isNickNameUpdationSucceed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Manage.successUpdate"));
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationSuccess", false);
            }
            var isNewExternalAccountsAdditionSucceed = navigationManager.getCustomInfo("externalAccountAdditionSuccessResponse");
            if (isNewExternalAccountsAdditionSucceed && isNewExternalAccountsAdditionSucceed !== undefined && isNewExternalAccountsAdditionSucceed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.ExternalAccounts.addedAccountsSuccessfully"));
                navigationManager.setCustomInfo("externalAccountAdditionSuccessResponse", false);
            }
            var isNewExternalAccountsAdditionFailed = navigationManager.getCustomInfo("externalAccountAdditionErrorResponse");
            if (isNewExternalAccountsAdditionFailed && isNewExternalAccountsAdditionFailed !== undefined && isNewExternalAccountsAdditionFailed === true) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.ExternalAccounts.addedAccountsFailure"));
                navigationManager.setCustomInfo("externalAccountAdditionErrorResponse", false);
            }
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().logFormName(currentForm);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    cancelSearch: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : cancelSearch ####");
            var externalAccountsData = this.getExternalAccountsData();
            this.setExternalAccountsData(externalAccountsData);
            this.view.flxSearch.isVisible = true;
            this.view.flxTransactions.top = "40dp"
            this.view.flxHeaderSearchbox.isVisible = false;
            this.view.flxMainContainer.skin = "slFboxmb";
            this.view.customSearchbox.tbxSearch.text = "";
            this.view.customSearchbox.tbxSearch.setFocus(false);
            this.view.tbxSearch.setFocus(false);
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var titleBarAttributes = this.view.titleBarAttributes;
                titleBarAttributes["navigationBarHidden"] = false;
                this.view.titleBarAttributes = titleBarAttributes;
                this.view.flxHeaderSearchbox.top = "0dp";
                this.view.flxMainContainer.top = "0dp";
            } else {
                this.view.flxMainContainer.top = "56dp";
                this.view.flxHeader.isVisible = true;
            }
            this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onEditSearchContext: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : onEditSearchContext ####");
            this.view.flxSearch.isVisible = false;
            this.view.flxHeaderSearchbox.isVisible = true;
            this.view.flxMainContainer.skin = "sknFlxffffffmb";
            this.view.tbxSearch.setFocus(false);
            this.view.flxTransactions.top = "0dp"
            this.view.customSearchbox.tbxSearch.setFocus(true);
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var titleBarAttributes = this.view.titleBarAttributes;
                titleBarAttributes["navigationBarHidden"] = true;
                this.view.titleBarAttributes = titleBarAttributes;
                this.view.flxHeaderSearchbox.top = "15dp";
                this.view.flxMainContainer.top = "55dp";
            } else {
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeader.isVisible = false;
            }
            this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    getExternalAccountsData: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : getExternalAccountsData ####");
            var navManager = applicationManager.getNavigationManager();
            return navManager.getCustomInfo("frmManageExternalAccounts");
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    setExternalAccountsData: function(data) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : setExternalAccountsData ####");
            this.view.segTransactions.widgetDataMap = {
                'lblAccountHolderName': 'AccountHolder',
                'lblBankName': 'BankName',
                'imgBank': 'BankLogo',
                'imgAlert':'errorLogo',
                'lblAccountName': 'displayAccountName',
                'lblAccountType': 'TypeDescription'
            };
          if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null) {
            if (this.segTransactionsSwipeInfo.position === 2) {
              this.executeSwipe(this.segTransactionsSwipeInfo.indices.row, this.segTransactionsSwipeInfo.indices.section, 2);
            }
          }
          this.segTransactionsSwipeInfo = null;
          if(data.length > 0) {
              this.view.segTransactions.isVisible = true;
              this.view.flxNoTransactions.isVisible = false;
          } else {
              this.view.segTransactions.isVisible = false;
              this.view.flxNoTransactions.isVisible = true;
          }
		  this.view.segTransactions.setData(data);
          this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    navigateToExtenalBanksList: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : navigateToExtenalBanksList ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            accountMod.presentationController.navigateToSelectExternalBanks();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    navigateToExternalAccountDetails: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : navigateToExternalAccountDetails ####");
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
			accountModule.presentationController.commonFunctionForNavigation("frmExternalAccountDetails");
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    searchAccounts: function(list, searchString) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : searchAccounts ####");
            if (!list || (list === undefined || list.length === 0)) {
                return;
            }
            if (!searchString || (searchString === undefined || searchString.trim() === "")) {
                return;
            }
            var matchingAccounts = [];
            for (var i in list) {
                for (var j in list[i][1]) {
                    if (list[i][1][j].AccountName && list[i][1][j].AccountName !== undefined && list[i][1][j].AccountName.toLowerCase().search(searchString.toLowerCase()) !== -1) {
                        matchingAccounts.push(list[i][1][j]);
                        continue;
                    }
                    if (list[i][1][j].BankName && list[i][1][j].BankName !== undefined && list[i][1][j].BankName.toLowerCase().search(searchString.toLowerCase()) !== -1) {
                        matchingAccounts.push(list[i][1][j]);
                        continue;
                    }
                    if (list[i][1][j].TypeDescription && list[i][1][j].TypeDescription !== undefined && list[i][1][j].TypeDescription.toLowerCase().search(searchString.toLowerCase()) !== -1) {
                        matchingAccounts.push(list[i][1][j]);
                        continue;
                    }
                    if (list[i][1][j].NickName && list[i][1][j].NickName !== undefined && list[i][1][j].NickName.toLowerCase().search(searchString.toLowerCase()) !== -1) {
                        matchingAccounts.push(list[i][1][j]);
                        continue;
                    }
					if (list[i][1][j].AccountHolder && list[i][1][j].AccountHolder !== undefined && list[i][1][j].AccountHolder.toLowerCase().search(searchString.toLowerCase()) !== -1) {
                        matchingAccounts.push(list[i][1][j]);
                        continue;
                    }
                }
            }
            return matchingAccounts;
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    displaySearchedAccounts: function(textBox) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : displaySearchedAccounts ####");
            var searchString = textBox.text;
            var externalAccountsData = this.getExternalAccountsData();
            var modifiedList;
            if (searchString.trim() === "") {
                this.setExternalAccountsData(externalAccountsData);
            } else {
                modifiedList = this.searchAccounts(externalAccountsData, searchString);
                if (!modifiedList || (modifiedList === undefined || modifiedList.length <= 0)) {
                    this.setExternalAccountsData([]);
                } else if (modifiedList.length > 0) {
                    this.setExternalAccountsData(modifiedList);
                }
            }
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    fetchSingleExternalAccountDetails: function(segWidget) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : navigateToExtenalBanksList ####");
            var selectedSectionIndex = parseInt(this.view.segTransactions.selectedRowIndex[0], 10);
            var selectedRowIndex = parseInt(this.view.segTransactions.selectedRowIndex[1], 10);
            if (this.segTransactionsSwipeInfo === undefined || this.segTransactionsSwipeInfo === null)
                this.segTransactionsSwipeInfo = {
                    isSwiped: false,
                    position: 1,
                    indices: {
                        row: selectedRowIndex,
                        section: selectedSectionIndex
                    }
                };
            if (this.segTransactionsSwipeInfo.isSwiped === false) {
                if (this.segTransactionsSwipeInfo.position === 2) {
                    this.executeSwipe(this.segTransactionsSwipeInfo.indices.row, this.segTransactionsSwipeInfo.indices.section, 2);
                }
                applicationManager.getPresentationUtility().showLoadingScreen();
                var userManager = applicationManager.getUserPreferencesManager();
                var mainUserValue = userManager.getUserName();
                var seclectedAccount = segWidget.selectedRowItems[0];
                var bankIdValue = seclectedAccount.Bank_id;
                var accountNameValue = seclectedAccount.AccountName;
                var userNameValue = seclectedAccount.AccountHolder;
                var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountMod.presentationController.fetchSingleExternalAccountDetails({
                    mainUser: mainUserValue,
                    userName: userNameValue,
                    bankId: bankIdValue,
                    accountName: accountNameValue
                });
            }
        } catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    swipeDetected: function(widgetInfo, swipeInfo) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : swipeDetected ####");
            if (this.segTransactionsSwipeInfo === undefined || this.segTransactionsSwipeInfo === null)
                this.segTransactionsSwipeInfo = {
                    isSwiped: true,
                    position: 1,
                    indices: {
                        row: swipeInfo.row,
                        section: swipeInfo.section
                    }
                };
            this.segTransactionsSwipeInfo.isSwiped = true;
            if (!(swipeInfo.row === this.segTransactionsSwipeInfo.indices.row && swipeInfo.section === this.segTransactionsSwipeInfo.indices.section)) {
                if (this.segTransactionsSwipeInfo.position === 2) {
                    this.executeSwipe(this.segTransactionsSwipeInfo.indices.row, this.segTransactionsSwipeInfo.indices.section, 2);
                }
            }
            this.segTransactionsSwipeInfo.indices.row = swipeInfo.row;
            this.segTransactionsSwipeInfo.indices.section = swipeInfo.section;
            this.executeSwipe(swipeInfo.row, swipeInfo.section, swipeInfo.swipeDirection);
        } catch (err) {
          	if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
              this.segTransactionsSwipeInfo.isSwiped = false;
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    executeSwipe: function(row, section, direction) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : executeSwipe ####");
            var fstStepConfig = {
                "left": "0%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            };
            var lstStepConfig = {
                "left": "0%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            };
            if (direction === 1) {
                fstStepConfig.left = "0%";
                lstStepConfig.left = "-20%";
                this.segTransactionsSwipeInfo.position = 2;
            } else if (direction === 2) {
                fstStepConfig.left = "-20%";
                lstStepConfig.left = "0%";
                this.segTransactionsSwipeInfo.position = 1;
            }
            this.view.segTransactions.animateRows({
                rows: [{
                    sectionIndex: section,
                    rowIndex: row
                }],
                widgets: ["flxMainRowContainer"],
                animation: {
                    definition: kony.ui.createAnimation({
                        "0": fstStepConfig,
                        "100": lstStepConfig
                    }),
                    config: {
                        "delay": 0,
                        "iterationCount": 1,
                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                        "duration": 0.5,
                        "direction": kony.anim.DIRECTION_ALTERNATE
                    },
                    callbacks: {
                        animationEnd: function() {
                          if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
                            this.segTransactionsSwipeInfo.isSwiped = false;
                        }.bind(this)
                    }
                }
            });
        } catch (err) {
          if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
          	this.segTransactionsSwipeInfo.isSwiped = false;
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    deleteRowDetected: function(widgetInfo, rowData) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : swipeDetected ####");
          	if (this.segTransactionsSwipeInfo === undefined || this.segTransactionsSwipeInfo === null)
                this.segTransactionsSwipeInfo = {
                    isSwiped: true,
                    position: 2,
                    indices: {
                        row: rowData.row,
                        section: rowData.section
                    }
                };
            this.segTransactionsSwipeInfo.isSwiped = true;
            this.onClickOfDeleteAccount(rowData);
        } catch (err) {
          if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
          	this.segTransactionsSwipeInfo.isSwiped = false;
          loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onClickOfDeleteAccount: function(rowData) {
        var loggerManager = applicationManager.getLoggerManager();
        function alertHandler(response) {
            if (response === true) {
              	this.deleteExternalAccount(rowData);
            }
          else {
            if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
            	this.segTransactionsSwipeInfo.isSwiped = false;
          }
        }
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : onClickOfDeleteAccount");
            var alertmessage = kony.i18n.getLocalizedString("kony.mb.externalAccounts.deleteAccountAlert");
            var yesText = kony.i18n.getLocalizedString("kony.mb.common.Yes");
            var noText = kony.i18n.getLocalizedString("kony.mb.common.No");
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "",
                "yesLabel": yesText,
                "noLabel": noText,
                "message": alertmessage,
                "alertHandler": alertHandler.bind(this)
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
        } catch (error) {
            loggerManager.log("#### in catch of frmManageExternalAccountsController : onClickOfDeleteAccount" + JSON.stringify(err) + " ####");
        }
    },
    deleteExternalAccount: function(rowData) {
        var loggerManager = applicationManager.getLoggerManager();
		//var self = this;
        function onAccountDeletionSucceess(successResponse) {
          	applicationManager.getPresentationUtility().dismissLoadingScreen();
          	if (successResponse && (successResponse !== undefined && successResponse !== "")) {
              	if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null) {
                	if (this.segTransactionsSwipeInfo.position === 2) {
                  	this.executeSwipe(this.segTransactionsSwipeInfo.indices.row, this.segTransactionsSwipeInfo.indices.section, 2);
                	}
              	}
              	this.segTransactionsSwipeInfo = null;
                var navigationManager = applicationManager.getNavigationManager();
                navigationManager.setCustomInfo("externalAccountDeletionSuccessResponse", true);
                navigationManager.setCustomInfo("externalAccountDeletionErrorResponse", false);
                accountModule.presentationController.fetchExternalAccountsData(userManager.getUserName());
            }
          	if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
              	this.segTransactionsSwipeInfo.isSwiped = false;
        }
        function onAccountDeletionFailure(errorResponse) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          	if (errorResponse && errorResponse !== undefined) {
              	var navigationManager = applicationManager.getNavigationManager();
                navigationManager.setCustomInfo("externalAccountDeletionErrorResponse", true);
                navigationManager.setCustomInfo("externalAccountDeletionSuccessResponse", false);
                accountModule.presentationController.navigateToManageExternalAccounts();
                kony.print("error deleting the external account");
            }
          	if(this.segTransactionsSwipeInfo !== undefined && this.segTransactionsSwipeInfo !== null )
          		this.segTransactionsSwipeInfo.isSwiped = false;
        }
        try {
            loggerManager.log("#### start frmManageExternalAccountsController : deleteExternalAccount ####");
          	applicationManager.getPresentationUtility().showLoadingScreen();
            var accountModule;
            var navigationManager = applicationManager.getNavigationManager();
            var accountDetails = this.view.segTransactions.selectedRowItems;
            var userManager = applicationManager.getUserPreferencesManager();
            var keys = {
                mainUser: null,
                userName: null,
                bankId: null,
                accountName: null,
                loopCount: null
            };
            if (accountDetails && (accountDetails !== undefined && accountDetails.length > 0)) {
                keys.mainUser = userManager.getUserName();
                keys.userName = accountDetails[0].Username;
                keys.bankId = accountDetails[0].Bank_id;
                keys.accountName = accountDetails[0].AccountName;
                keys.loopCount = "1";
                accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountModule.presentationController.deleteExternalAccount(keys, onAccountDeletionSucceess.bind(this), onAccountDeletionFailure.bind(this));
            }
        } catch (err) {
          	applicationManager.getPresentationUtility().dismissLoadingScreen();
            loggerManager.log("#### in catch of frmManageExternalAccountsController : deleteExternalAccount" + JSON.stringify(err) + " ####");
        }
    },
});