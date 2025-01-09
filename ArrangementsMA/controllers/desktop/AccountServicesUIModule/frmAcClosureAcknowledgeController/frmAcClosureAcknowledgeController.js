define("ArrangementsMA/AccountServicesUIModule/userfrmAcClosureAcknowledgeController", ['FormControllerUtility', 'CommonUtilities', 'TopbarConfig'], function(FormControllerUtility, CommonUtilities, TopbarConfig) {
    var orientationHandler = new OrientationHandler();
    return {
        //Type your controller code here 
        account: {},
        referenceId: "",
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                    } else {
                        kony.application.dismissLoadingScreen();
                    }
                }
                if (uiData.response) {
                    this.referenceId = uiData.response.Id;
                    var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("frmPrintAccountAcknowledge1", this.referenceId);
                    this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.text = uiData.response.Id;
                    if (this.referenceId && this.referenceId !== "") {
                        this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceID.isVisible = true;
                        this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.isVisible = true;
                    } else {
                        this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceID.isVisible = false;
                        this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.isVisible = false;
                    }
                }
                if (uiData.pageDownloadFile) {
                    this.downloadPageDoc(uiData.pageDownloadFile);
                }
                if (uiData.showError) {
                    this.showErrorScreen(uiData.error);
                }
            }
        },
        frmPreShow: function() {
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            account = navMan.getCustomInfo("frmConfirmClosure");
            swiftCode = navMan.getCustomInfo("swiftCode");
            this.setUpFormData(account, swiftCode);
            this.view.frmAccountClosure.flxTCButtons.flxButton.flxDownload.onClick = this.downloadPage;
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": "false"
                }
            }
            this.resetUI();
            this.setResponsiveUI();
            this.view.frmAccountClosure.setContext(formTemplateContext);
            this.view.frmAccountClosure.flxPageFooter.flxAck.btnBackToFacility.onClick = TopbarConfig.config.ACCOUNTS.onClick;
            this.view.frmAccountClosure.flxTCButtons.flxButton.flxPrint.onClick = this.print;
            scopeObj = this;
            this.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.flxEyeIcon.onClick = function() {
                account = navMan.getCustomInfo("frmConfirmClosure");
                if (scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblShowIcon.text === 'g') {
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblShowIcon.text = 'h';
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.flxEyeIcon.accessibilityConfig = {
                    "a11yLabel": "Hide account number The number is currently visible",
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                 };
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblValAccountNumber.text = account.accountID;
                } else {
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblShowIcon.text = 'g';
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.flxEyeIcon.accessibilityConfig = {
                    "a11yLabel": "View account number The number is currently hidden",
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                 };
                    scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblValAccountNumber.text = "**" + account.accountID.slice(-4);
                }
                scopeObj.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.flxEyeIcon.setActive(true);
            }
            this.view.frmAccountClosure.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
            if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.frmAccountClosure.pageTitleVisibility = false;
                this.view.frmAccountClosure.pageTitle = "Account Closure Details";
            }
            if ( kony.application.getCurrentBreakpoint() >= 1366 || orientationHandler.isDesktop ) {
                this.view.frmAccountClosure.pageTitleVisibility = true;
                this.view.frmAccountClosure.pageTitle = "Account Closure";
            }
        },
        setResponsiveUI: function() {
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isDesktop) {} else if (kony.application.getCurrentBreakpoint() === 780 || orientationHandler.isTablet) {} else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.width = "95%";
            }
        },
        downloadPage: function() {
            payload = {};
            var navMan = applicationManager.getNavigationManager();
            account = navMan.getCustomInfo("frmConfirmClosure");
            payload.contentType = "pdf";
            payload.referenceNumber = this.referenceId;
            payload.accountName = account.accountName;
            payload.accountNumber = account.accountID;
            payload.accountType = account.accountType;
            payload.currentBalance = account.currentBalance;
            payload.swiftCode = navMan.getCustomInfo("swiftCode");
            payload.IBAN = account.IBAN;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.downloadClosurePage(payload);
        },
        downloadPageDoc: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            //this.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent.lblValIBAN.skin = "ICSknLblSSP42424212pxWordBreak";
        },
        print: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "AccountServicesUIModule/frmPrintAccountClosureAcknowledge"
            });
        },
        setUpFormData: function(account, swiftCode) {
            temp = this.view.frmAccountClosure.flxContentTCRight.flxContRight.flxAccountDetails.flxAccountContent
            temp.lblValAccountName.text = account.accountName;
            temp.lblValAccountNumber.text = "**" + account.accountID.slice(-4);
            temp.lblValAccountType.text = account.accountType;
            if (kony.sdk.isNullOrUndefined(account.IBAN) || account.IBAN.length < 1) {
                temp.lblValIBAN.isVisible = false;
                temp.lblIBAN.isVisible = false;
                temp.lblValCurrentBalance.top = temp.lblValIBAN.top;
                temp.lblCurrentBalance.top = temp.lblIBAN.top;
            } else {
                temp.lblValIBAN.text = account.IBAN;
                if(kony.application.getCurrentBreakpoint() === 1366){
                    temp.lblValCurrentBalance.top = "200px";
                    temp.lblCurrentBalance.top = "200px";
                }
            }
             if (kony.os.deviceInfo().screenHeight < 200) {
                if (temp.lblValIBAN.text.length > 15) {
                    var firstText = temp.lblValIBAN.text.slice(0, 15);
                    var secondText = temp.lblValIBAN.text.slice(15, temp.lblValIBAN.text.length);
                    temp.lblValIBAN.text = firstText + " " + secondText;
                }
           }
            temp.lblValSwiftCode.text = swiftCode;
            temp.lblValCurrentBalance.text = CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode);
            // kony.application.dismissLoadingScreen();
        },
        backToDashboard: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
        },
        resetUI: function() {
         
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.imgGreenTick.src = "confirmation_tick.png";
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.lblMsg.text = "Your request for account closure has been submitted successfully.";
        },
        showErrorScreen: function(error) {
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceID.isVisible = false;
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.isVisible = false;
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.imgGreenTick.src = "failed_icon.png";
            this.view.frmAccountClosure.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.lblMsg.text = "Failed to Capture the Service Request, Try again later"; //error["errorMessage"] || "";
            this.view.forceLayout();
        }
    }
}); 