define("ArrangementsMA/MortgageServicesUIModule/userfrmChangeRepaymentAccountAcknowledgeController", ['FormControllerUtility', 'CommonUtilities'], function(FormControllerUtility, CommonUtilities) {
    var orientationHandler = new OrientationHandler();
    return {
        //Type your controller code here 
        accountList: {},
        payLoad: {},
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
                    this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.text = uiData.response.Id;
                }
                if (uiData.pageDownloadFile) {
                    this.downloadPageDoc(uiData.pageDownloadFile);
                }
                if (uiData.showError){
                    this.showErrorScreen(uiData.error);
                }
            }
        },
        frmPreShow: function() {
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            this.accountList = navMan.getCustomInfo("frmChangeRepaymentAccountAcknowledge");
            this.payLoad = navMan.getCustomInfo("frmChangeRepaymentAccountAcknowledge");
            this.account = navMan.getCustomInfo("frmChangeRepaymentAccountAcknowledge");            
            this.setUpFormData();
            this.view.formTemplate66.flxTCButtons.flxButton.flxDownload.onClick = this.downloadPage;
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
            this.view.onBreakpointChange = this.onBreakpoint;
            this.view.formTemplate66.setContext(formTemplateContext);
            this.view.formTemplate66.flxPageFooter.flxAck.btnBackToFacility.onClick = this.backToFacility;
            this.view.formTemplate66.flxTCButtons.flxButton.flxPrint.onClick = this.print;
            scopeObj = this;
            scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.accessibilityConfig = {
                "a11yLabel": "View new repayment account number, your new repayment account number is currently hidden",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            };
            this.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.payload;
                if (scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblShowIcon.text == 'g') {
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblShowIcon.text = 'h';
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValNewRepaymentAcctNo.text = scopeObj.payLoad.requestDetails[1].newValue;
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.accessibilityConfig = {
                        "a11yLabel": "Hide new repayment account number, your new repayment account number is currently visible",
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    };
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.setActive(true);
                } else {
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblShowIcon.text = 'g';
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValNewRepaymentAcctNo.text = "************" + scopeObj.payLoad.requestDetails[1].newValue.slice(-4);
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.accessibilityConfig = {
                        "a11yLabel": "View new repayment account number, your new repayment account number is currently hidden",
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    };
                    scopeObj.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.flxShowIcon.setActive(true);
                }
            }
            this.view.formTemplate66.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
        },
        onBreakpoint: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {    
                this.view.formTemplate66.pageTitleVisibility = false;    
                this.view.formTemplate66.pageTitle = "Acknowledgement";   
            }    
            else{    
                this.view.formTemplate66.pageTitleVisibility = true;    
                this.view.formTemplate66.pageTitle = "Acknowledgement";    
            }    
        },
        setResponsiveUI: function() {
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isDesktop) {} else if (kony.application.getCurrentBreakpoint() === 780 || orientationHandler.isTablet) {} else if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.width = "95%";
            }
        },
        downloadPage: function(){
            payload = {};
            payload.referenceNumber = this.referenceId;
            payload.loanName = this.payLoad.loanName + ' - ' + this.payLoad.accountID.slice(-4);
            payload.newRepaymentAccountHolderName = this.payLoad.requestDetails[0].newValue;
            payload.newRepaymentAccountHolderName = this.payLoad.requestDetails[1].newValue;
            payload.bankName = this.payLoad.requestDetails[2].newValue;
            payload.contentType = "pdf";
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.downloadAccountPage(payload);
        },
        downloadPageDoc: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.title = kony.i18n.getLocalizedString("i18n.mortgageAccount.changeRepaymentAccountAcknowledgement");            
            if(kony.application.getCurrentBreakpoint() === 640)
                this.view.formTemplate66.pageTitle = kony.i18n.getLocalizedString("i18n.mortgageAccount.ChangeRepaymentAccount");
            else
                this.view.formTemplate66.pageTitle = kony.i18n.getLocalizedString("i18n.mortgageAccount.changeRepaymentAccountAcknowledgement");
        },
        print: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPrintAccountAcknowledge"
            });
        },
        setUpFormData: function() {
            this.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValLoan.text = this.payLoad.loanName + ' - ' + this.payLoad.accountID.slice(-4);
            this.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValNewRepaymentAcctHoldName.text = this.payLoad.requestDetails[0].newValue;
            this.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValNewRepaymentAcctNo.text = "************" + this.payLoad.requestDetails[1].newValue.slice(-4);
            this.view.formTemplate66.flxContentTCRight.flxContRight.flxRepaymentDetails.flxRepaymentContent.lblValBankName.text = this.payLoad.requestDetails[2].newValue;
            // kony.application.dismissLoadingScreen();
        },
        backToFacility: function() {
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showAccountDetails(account);
        },
        resetUI: function(){
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceID.isVisible = true;
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.isVisible = true;
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.imgGreenTick.src = "confirmation_tick.png";
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.lblMsg.text = "You have successfully submitted the change repayment account request.";
        },
        showErrorScreen:function(error){
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceID.isVisible = false;
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.lblReferenceValue.isVisible = false;
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.imgGreenTick.src = "failed_icon.png";
            this.view.formTemplate66.flxContentTCLeft.flxContLeft.flxLeftContent.flxMsg.lblMsg.text = "Failed to Capture the Service Request, Try again later";//error["errorMessage"] || "";
            this.view.forceLayout();
        }
    }
});