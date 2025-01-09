define({
    init : function() {
         var navManager = applicationManager.getNavigationManager();
         var currentForm=navManager.getCurrentForm();
         applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShowUiSettings: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxHeader.isVisible = false;
                this.view.flxFooter.isVisible = false;
            } else {
                this.view.flxFooter.isVisible = false;
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
                this.view.customHeader.btnRight.onClick = this.onEdit;
                this.view.flxHeader.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.externalBank.AccountDetials");
            }
            loggerManager.log("#### start frmExternalAccountDetailsController : preShowUiSettings ####");
            var accountDetails = this.fetchAccountDetails();
            if (accountDetails && (accountDetails !== undefined && accountDetails.length > 0)) {
                this.setAccountDetails(accountDetails[0]);
            }
          	this.view.flxNickName.setVisibility(true);
            this.view.btnDeleteAccount.onClick = this.onClickOfDeleteAccount;
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    fetchAccountDetails: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : fetchAccountDetails ####");
            var navManager = applicationManager.getNavigationManager();
            return navManager.getCustomInfo("frmExternalAccountDetails");
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    setAccountDetails: function(data) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : setAccountDetails ####");
            if (data && (data !== undefined && typeof data === 'object')) {
                this.view.lblAccHolderValue.text = data.AccountHolder;
                this.view.lblAccNoValue.text = data.Number;
                this.view.lblAccTypeVal.text = data.TypeDescription;
                this.view.lblCardIssueDateVal.text = data.Address;
                this.view.lblBankNameValue.text = data.BankName;
              	if(!kony.sdk.isNullOrUndefined(data.NickName)){
                  this.view.lblNickNameValue.text = data.NickName;
                }else{
                  this.view.lblNickNameValue.text = "";
                }
                this.view.forceLayout();
            } else {
                this.view.lblAccHolderValue.text = "";
                this.view.lblAccNoValue.text = "";
                this.view.lblAccTypeVal.text = "";
                this.view.lblCardIssueDateVal.text = "";
                this.view.lblBankNameValue.text = "";
                this.view.lblNickNameValue.text = "";
                this.view.forceLayout();
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onClickOfDeleteAccount: function() {
        var loggerManager = applicationManager.getLoggerManager();
        function alertHandler(response) {
            if (response === true) {
                applicationManager.getPresentationUtility().showLoadingScreen();
                this.deleteExternalAccount();
            }
        }
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : onClickOfDeleteAccount");
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
            loggerManager.log("#### in catch of frmExternalAccountDetailsController : onClickOfDeleteAccount" + JSON.stringify(err) + " ####");
        }
    },
    deleteExternalAccount: function() {
        var loggerManager = applicationManager.getLoggerManager();
        function onAccountDeletionSucceess(successResponse) {
            if (successResponse && (successResponse !== undefined && successResponse !== "")) {
                var navigationManager = applicationManager.getNavigationManager();
                navigationManager.setCustomInfo("externalAccountDeletionSuccessResponse", true);
                navigationManager.setCustomInfo("externalAccountDeletionErrorResponse", false);
                accountModule.presentationController.fetchExternalAccountsData(userManager.getUserName());
            }
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
        }
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : deleteExternalAccount ####");
            var accountModule;
            var navigationManager = applicationManager.getNavigationManager();
            var accountDetails = navigationManager.getCustomInfo("frmExternalAccountDetails");
            var userManager = applicationManager.getUserPreferencesManager();
            var keys = {
                mainUser: null,
                userName: null,
                bankId: null,
                accountName: null,
                loopCount: null
            };
            if (accountDetails && (accountDetails !== undefined && accountDetails.length > 0)) {
                keys.mainUser = applicationManager.getUserPreferencesManager().getUserName();
                keys.userName = accountDetails[0].AccountHolder;
                keys.bankId = accountDetails[0].Bank_id;
                keys.accountName = accountDetails[0].AccountName;
                keys.loopCount = "1";
                accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountModule.presentationController.deleteExternalAccount(keys, onAccountDeletionSucceess, onAccountDeletionFailure);
            }
        } catch (err) {
            loggerManager.log("#### in catch of frmExternalAccountDetailsController : deleteExternalAccount" + JSON.stringify(err) + " ####");
        }
    },
    flxBackOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : flxBackOnClick ####");
            var navMan = applicationManager.getNavigationManager();
            navMan.goBack();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onEdit: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : onEdit ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navMan = applicationManager.getNavigationManager();
            var accountDetails = this.fetchAccountDetails();
            if (accountDetails && accountDetails !== undefined && accountDetails.length > 0) {
                var credentialsForUpdatingNickName = {
                    nickName: accountDetails[0].NickName,
                    accountId: accountDetails[0].Account_id,
                    mainUser: applicationManager.getUserPreferencesManager().getUserName(),
                    userName: accountDetails[0].AccountHolder,
                    bankId: accountDetails[0].Bank_id,
                    accountName: accountDetails[0].AccountName,
                    loopCount: "1"
                };
                navMan.setCustomInfo("frmEditNickName", credentialsForUpdatingNickName);
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
				accountModule.presentationController.commonFunctionForNavigation("frmEditNickName");
            } else {
                throw "AccountDetails is null or undefined or its an empty array";
            }
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    }
});