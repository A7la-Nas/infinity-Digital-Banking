define("ArrangementsMA/MortgageServicesUIModule/userfrmChangeRepaymentAccountController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function (CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        accountList: {},
        frmPreShow: function () {
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            this.view.formChangeRepaymentAccount.pageTitle = 'Change Repayment Account';
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxName.text = "";
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxMaskedAccNo.text = "";
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxUnmaskedAccNo.text = "";
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.text = "";
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBankName.text = "";
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnCancel.onClick = this.backToFacility;
            //this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.onClick = this.showConfirmation;
            scopeObj = this;
            scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.isVisible = false;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxName.onTextChange = this.validationFields;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxMaskedAccNo.onTextChange = this.validationFields;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxUnmaskedAccNo.onTextChange = this.validationFields;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.onTextChange = this.validationFields;
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBankName.onTextChange = this.validationFields;
            //this.setDataForForm();
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isDesktop) {
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.top = "49dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.top = "437dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.height = "538dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.height = "101dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSupportingDoc.width = "46%";
            }
            if (orientationHandler.isTablet || width === 1024) {
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.height = "728dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.skin = "skntbxffffffBordere3e3e3SSP15px424242";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSupportingDoc.width = "660dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.top = "550dp";
            }
            if (orientationHandler.isMobile || width === 640) {
                his.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.height = "761dp";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxRepaymentAccDetails.lblRepaymentAccDetails.skin = "skn4B4B4BSemiBold13px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblAccHoldName.skin = "ICSknLabelSSPRegular72727213px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblAccNo.skin = "ICSknLabelSSPRegular72727213px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblReAccNo.skin = "ICSknLabelSSPRegular72727213px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblBICSWIFT.skin = "ICSknLabelSSPRegular72727213px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.skin = "ICSknTxtE3E3E3Border1px424242SSPRegular13px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblBankName.skin = "ICSknLabelSSPRegular72727213px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblSuppDoc.skin = "ICSknlbl424242SSP13pxSemibold";
            }
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.imgSuppDocInfoIcon.onTouchStart = function () {
                scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.isVisible = !scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.isVisible;
                if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isDesktop) {
                    scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.height = "124dp";
                    scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.left = "260dp";
                    scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.top = "300dp";
                    scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.width = "300dp";
                }
            }
            this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.lblClose.onTouchStart = function () {
                scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.flxSuppDocInfo.isVisible = false;
            }
            this.view.formChangeRepaymentAccount.onError = function (errorObject) {
                alert(JSON.stringify(errorObject));
            };
        },
        postShow: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        setDataForForm: function () {
            //accountList = {};
            scopeObj = this;
            this.accountList.reAccHoldName = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxName.text;
            this.accountList.reAccNo = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxMaskedAccNo.text;
            this.accountList.reReEnterAccNo = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxUnmaskedAccNo.text;
            this.accountList.bicSwift = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.text;
            this.accountList.bankName = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBankName.text;
            kony.application.dismissLoadingScreen();
        },
        validationFields: function () {
            if ((this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxName.text !== "") && (this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxMaskedAccNo.text !== "") && (this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxUnmaskedAccNo.text !== "") && (this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBICSWIFT.text !== "") && (this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxBankName.text !== "")) {
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.setEnabled(true);
                FormControllerUtility.enableButton(this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue);
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.onClick = this.showConfirmation;
            } else {
                FormControllerUtility.disableButton(this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue);
            }
        },
        backToFacility: function () {
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showAccountDetails(account);
        },
        /*doValidate: function () {
            var accNo = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxMaskedAccNo.text;
            var reAccNo = this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.tbxUnmaskedAccNo.text;
            if (accNo == reAccNo) {
                this.setDataForForm();
                scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
                scopeObj.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.setEnabled(true);
                this.showConfirmation();
            } else {
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxCancelAndContinue.btnContinue.isEnabled = false;
                this.view.formChangeRepaymentAccount.flxContentTCCenter.flxContMain.flxAccountList.lblWarning.isVisible = true;
            }
        },*/
        showConfirmation: function () {
            this.setDataForForm();
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmCofirmRepaymentAccount", this.accountList);
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmConfirmRepaymentAccount"
            });
        }
    }
});

