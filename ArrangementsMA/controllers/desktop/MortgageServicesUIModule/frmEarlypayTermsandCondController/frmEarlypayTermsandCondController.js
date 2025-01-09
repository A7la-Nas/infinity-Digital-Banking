define("ArrangementsMA/MortgageServicesUIModule/userfrmEarlypayTermsandCondController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {

  //Type your controller code here

  var orientationHandler = new OrientationHandler();
  var mortgageAccDetails = undefined;
  var details = undefined;
  return {

    frmPreShow: function() {
      var navMan = applicationManager.getNavigationManager();
      var scope = this;
      this.setAccessibility(false);
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
      }).presentationController.getEarlypayoffTermsAndConditions();
      var formTemplateContext = {
        "sessionTimeOut": {
          "timer": 4
        },
        "breadCrumbBack": {
          "flag": false
        }
      }
     if (orientationHandler.isMobile) {
			this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.top = "40dp";
     }	
      this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.lblPageTitle.skin = "bbSknLbl424242SSP20Px";
	  this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.skin = "slfBoxffffffB1R5";
	  this.view.formTemplate12.flxContentTCCenter.flxContentMain.lblMainHeader.isVisible = false;
      this.view.formTemplate12.setContext(formTemplateContext);
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.imgCheckbox.src = "inactivecheckbox.png";
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.skin = "sknBtnE2E9F0radius2";
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.setEnabled(false);
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnCancel.onClick = this.backToFacility;
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnCancel.accessibilityConfig={
              "a11yLabel":"Cancel simulate early pay off",
              "a11yARIA":{
                "tabindex":0,
                "role":"button"
              }
            }  
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.onClick = this.navSelect;
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.accessibilityConfig={
              "a11yLabel":"Continue to simulate early pay off",
              "a11yARIA":{
                "tabindex":0,
                "role":"button" }
            };
      
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.flxCheckboxImage.onClick = this.imgCheckBox.bind(this);
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.flxCheckboxImage.accessibilityConfig={
              "a11yLabel":"I accept the Terms & Conditions",
              "a11yARIA":{
                "tabindex":0,
                "role":"checkbox",
                "aria-checked":false
              }
            };
    },
    updateFormUI: function (uiData) {
      if (uiData) {
        if (uiData.showLoadingIndicator) {
          if (uiData.showLoadingIndicator.status === true) {
            FormControllerUtility.showProgressBar(this.view)
          } else {
            FormControllerUtility.hideProgressBar(this.view)
          }
        }
        if(uiData.TnCresponse) {
          this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.RichTextMessage.text = uiData.TnCresponse.termsAndConditionsContent;
        }
      }
    },
    postshow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.height = "550dp";
      }
	  if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
			this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.RichTextMessage.top = "10dp";
			this.view.formTemplate12.flxContentPopup.parent.flxMainWrapper.height = "1050dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.height = "1020dp";
			this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.height = "120dp";
			this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.appFooter.height = "110dp";				
	  }
      if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() > 1366) {
			this.view.formTemplate12.flxPageFooter.top = "30dp";
			this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.height = "120dp";
			this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.appFooter.height = "110dp";
		}
        this.view.title= "Simulate Early Pay Off";
        this.view.formTemplate12.pageTitlei18n = "i18n.Accounts.SimulateEarlyPayOffNew";
	},

    setAccessibility: function(visibility) {
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.flxCheckboxImage.accessibilityConfig = {
              "a11yLabel": "I accept the Terms & Conditions",
              "a11yARIA": {
                 "tabindex": 0,
                 "aria-checked": visibility,
                 "role": "checkbox"
                }
            }
        },
    
    imgCheckBox: function() {
      if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.imgCheckbox.src == "inactivecheckbox.png"){
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.imgCheckbox.src = "activecheckbox.png";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.skin = "sknBtn293276radius3";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.setEnabled(true);
        this.setAccessibility(true);
        
      } else {
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.imgCheckbox.src = "inactivecheckbox.png";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.skin = "sknBtnE2E9F0radius2";
        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.btnContinue.setEnabled(false);
        this.setAccessibility(false);
      }
      this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxEarlyPayoff.flxEarlyPayoffSection.TermsAndCondition1.flxCheckboxImage.setActive(true);
      
          },
    backToFacility: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "AccountsUIModule/frmMortgageAccountDetails"
            });
        },
    navSelect: function() {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
			"moduleName": "AccountsUIModule",
			"appName": "ArrangementsMA"
		  }).presentationController.createEarlypayoffTermsAndConditions();
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