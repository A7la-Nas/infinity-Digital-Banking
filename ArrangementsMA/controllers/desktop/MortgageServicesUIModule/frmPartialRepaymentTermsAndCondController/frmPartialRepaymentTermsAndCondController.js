define("ArrangementsMA/MortgageServicesUIModule/userfrmPartialRepaymentTermsAndCondController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {

  //Type your controller code here

  var orientationHandler = new OrientationHandler();
  var mortgageAccDetails = undefined;
  var details = undefined;
  return {

    frmPreShow: function() {
      var navMan = applicationManager.getNavigationManager();
      var scope = this;
      mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountServicesUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.mortgageDetails;
      mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountServicesUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.mortgagePlans;
      currAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountsUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.currentAccount;
      loanAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountServicesUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.repaymentAccount;
      val = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountsUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.isFromMortgage;
      if (kony.application.getPreviousForm().id === "frmAccountsDetails") {
        details = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule",
          "appName": "ArrangementsMA"
        }).presentationController.accountDetails;
      } else if (val === 1) {
        //no service call
      } else {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule",
          "appName": "ArrangementsMA"
        }).presentationController.showMortgageAccountDetails(loanAccount);
      }
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountsUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.getTermsAndConditions();
      var formTemplateContext = {
        "sessionTimeOut": {
          "timer": 4
        },
        "breadCrumbBack": {
          "flag": false
        }
      }
      if(orientationHandler.isMobile){
            this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.isVisible = false;
       }
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTermsAndCondition.flxTermsNoteSection.flxNoteSection2.flxNotes.flxNotes2.isVisible = false;
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTermsAndCondition.flxTermsNoteSection.flxNoteSection2.flxNotes.flxNotes3.isVisible = false;
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTermsAndCondition.flxTermsNoteSection.flxNoteSection2.flxNotes.flxNotes4.isVisible = false;
      this.view.formTemplate12.setContext(formTemplateContext);
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.imgCheckbox.src = "inactivecheckbox.png";
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.skin = "sknBtnE2E9F0radius2";
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.setEnabled(false);
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnCancel.onClick = this.backToFacility;
      if (val === 1){
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.onClick = this.navSelect;
      } else {
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.onClick = this.navSimulation;
      }
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTerms.onClick = this.handleVisibilityOfPopup.bind(this);
      this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.flxTermsAndConditionsHeader.flxClose.onClick = function() {
        scope.view.formTemplate12.flxContentPopup.flxPopUp.setVisibility(false);
        scope.view.formTemplate12.flxContentPopup.isVisible = false;
                scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTerms.setActive(true);
      }
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.onClick = this.imgCheckBox.bind(this);
            this.view.formTemplate12.flxContentPopup.flxTC.onKeyPress = this.onKeyPressCallBack;
            this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.doLayout = CommonUtilities.centerPopupFlex;
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.formTemplate12.flxContentPopup.flxTC.isVisible === true) {
                    self.view.formTemplate12.flxContentPopup.flxPopUp.setVisibility(false);
                    self.view.formTemplate12.flxContentPopup.isVisible = false;
                    self.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTerms.setActive(true);
                }
            }
        },
        updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.showLoadingIndicator) {
          if (uiData.showLoadingIndicator.status === true) {
            FormControllerUtility.showProgressBar(this.view)
          } else {
            FormControllerUtility.hideProgressBar(this.view)
          }
        }
        if(uiData.TnCresponse) {
          this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.flxTCContents.rtxTC.text = uiData.TnCresponse.termsAndConditionsContent;
        }
        if (uiData.mortgageAccDetails) {
          mortgageAccDetails = uiData.mortgageAccDetails;
          this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.text = "(" + mortgageAccDetails[0].accountName + " - " + mortgageAccDetails[0].accountID.substr(-4) + ")";
        }
      }
    },
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      if (details !== undefined) {
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.text = "(" + details.Accounts[0].accountName + " - " + details.Accounts[0].accountID.substr(-4) + ")";
      } else if (mortgageAccDetails !== undefined){
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.text = "(" + mortgageAccDetails[0].accountName + " - " + mortgageAccDetails[0].accountID.substr(-4) + ")";
      } 
      if (val === 1){
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.text = "(" + currAccount.accountName + " - " + currAccount.accountID.substr(-4) + ")";
      }
             if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckbox.flxCheckBoxContent.lblAccept.width = "28%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxHeader.flxRepay.lblRepay.text = "Repayment Details";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxHeader.flxRepay.lblRepay.accessibilityConfig = {
                    "tagName": "h2"
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.accessibilityConfig = {
                "a11yLabel": "I accept the terms and conditions",
                "a11yARIA": {
                    "aria-checked": false,
                    "tabindex": 0,
                    "role": "checkbox",
                }
            }
            this.view.formTemplate12.flxContentPopup.flxClose.width = "35px";
            this.view.formTemplate12.flxContentPopup.flxClose.accessibilityConfig = {
                "a11yLabel": "Close Terms and Conditions Popup"
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTerms.width = "48%";
            }
            if (kony.application.getCurrentBreakpoint() === 1024) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxTerms.width = "26%";
                 this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.top = "0px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.left = "-7px";
               this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblPleaseNote.top = "10px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblPleaseNote.left = "52px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxNotes1.left = "-10px";
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.accessibilityConfig = {
                "a11yLabel": "Continue to choose loan account for partial repayment",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnCancel.accessibilityConfig = {
                "a11yLabel": "Cancel partial repayment",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            if(kony.application.getCurrentBreakpoint() === 1024){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblUserAccount.width = "50%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.lblInfoMessage.left = "-6px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxImgInfo.left = "10px";
            }
    },
    handleVisibilityOfPopup: function() {
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.width = "75%";
        this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.top = "105dp";
        this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.flxTCContents.height = "460dp";
      }
      this.view.formTemplate12.flxContentPopup.flxPopUp.setVisibility(true);
      this.view.formTemplate12.flxContentPopup.flxPopUp.flxTC.flxTCContents.setVisibility(true);
      this.view.formTemplate12.flxContentPopup.isVisible = true;
            this.view.formTemplate12.flxContentPopup.lblTermsAndConditions.setActive(true);
    },
    imgCheckBox: function() {
      if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.imgCheckbox.src == "inactivecheckbox.png") {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.accessibilityConfig = {
                    "a11yLabel": "I accept the terms and conditions",
                    "a11yARIA": {
                        "aria-checked": true,
                        "tabindex": 0,
                        "role": "checkbox",
                    }
                }
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.imgCheckbox.src = "activecheckbox.png";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.skin = "sknBtn293276radius3";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.setEnabled(true);
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.setActive(true);
      } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.accessibilityConfig = {
                    "a11yLabel": "I accept the terms and conditions",
                    "a11yARIA": {
                        "aria-checked": false,
                        "tabindex": 0,
                        "role": "checkbox",
                    }
                }
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.imgCheckbox.src = "inactivecheckbox.png";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.skin = "sknBtnE2E9F0radius2";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.btnContinue.setEnabled(false);
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxPartialRepayment.flxPartialPaymentSection.TermsAndCondition.flxCheckboxImage.setActive(true);
      }
    },
        backToFacility: function() {
      var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
    },
    navSelect: function() {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("accountModifyFlow", false);
      navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmRepaymentLoanSelect"
      });
    },
    navSimulation: function () {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("accountModifyFlow", false);
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "moduleName": "AccountServicesUIModule",
        "appName": "ArrangementsMA"
      }).presentationController.repaymentAccount = loanAccount;
      if (mortgageAccDetails !== undefined) {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule",
          "appName": "ArrangementsMA"
        }).presentationController.mortgageAccDetails = mortgageAccDetails;
      } else {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule",
          "appName": "ArrangementsMA"
        }).presentationController.mortgageAccDetails = details.Accounts;
      }
      navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "MortgageServicesUIModule/frmRepaymentSimulation"
      });
    }
  }

});