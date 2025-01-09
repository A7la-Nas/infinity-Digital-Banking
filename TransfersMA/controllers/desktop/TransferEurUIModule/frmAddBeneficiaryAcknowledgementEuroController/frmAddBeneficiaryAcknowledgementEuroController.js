define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
var orientationHandler = new OrientationHandler();   
  return {
    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      var scopeObj = this;
      this.euroPresenter =   applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"});
      this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
      this.accountsPresenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController;
      scopeObj.view.btnManageBeneficiaries.onClick = function() {
        scopeObj.ManageActivitiesPresenter.showTransferScreen({
          context: "ManageBeneficiaries"
        })
      };
      scopeObj.view.btnAccounts.onClick = function() {
        scopeObj.accountsPresenter.showAccountsDashboard()
      };
      scopeObj.view.btnManageBeneficiary.onClick = function() {
        scopeObj.ManageActivitiesPresenter.showTransferScreen({
          context: "ManageBeneficiaries"
        })
      };
      scopeObj.view.btnAccount.onClick = function() {
        scopeObj.accountsPresenter.showAccountsDashboard()
      };
    },
    onBreakpointChange: function(form, width) {
      var scope = this;
      this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
      FormControllerUtility.setupFormOnTouchEnd(width);   
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      if ((kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) && orientationHandler.isDesktop) {
        this.view.lblAddressKey.width = "88%";
        this.view.lblNameKey.width = "88%";
      }
    },
    preShow: function() {
      this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Beneficiaries");
        this.view.btnAccounts.accessibilityConfig = {
            a11yLabel: "Accounts overview"
        };
        this.view.btnManageBeneficiary.accessibilityConfig = {
            a11yLabel: "Go to Manage Beneficiaries"
        };
        this.view.btnAccount.accessibilityConfig = {
            a11yLabel: "Go to accounts overview"
        };
//       this.view.btnManageBeneficiaries.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
//       this.view.btnMakePayment.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment");
//       this.view.btnAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
//       this.view.btnManageBeneficiary.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
//       this.view.btnAccounts.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
    },
    postShow: function() {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.customheadernew.btnSkipNav.onClick = this.skipToMainContent.bind(this);
      this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
    },
    
    skipToMainContent: function() {
            this.view.lblAddBeneficiary.setActive(true);
        },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
        }
        this.view.customheadernew.btnLogout.setFocus(true);
      }
        },
    /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
    updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.showAddBeneficiaryAck) {
        this.showAddBeneficiaryAck(viewModel.showAddBeneficiaryAck);
      }
      if (viewModel.showEditBeneficiaryAck) {
        this.showEditBeneficiaryAck(viewModel.showEditBeneficiaryAck);
      }
    },
    /**
         * show add beneficiary acknowledgement screen
         * @param {Object} data contains added beneficiary details
         */
    showAddBeneficiaryAck: function(data) {
      var scopeObj = this;
      var payment_method;
      if (data.isInternationalAccount === false && data.isSameBankAccount === false) {
        payment_method = "Domestic";
      } else if (data.isInternationalAccount === true && data.isSameBankAccount === false) {
        payment_method = "International";
      } else if (data.isInternationalAccount === false && data.isSameBankAccount === true) {
        payment_method = "Within Bank";
      }
      var bankDetails = "-";
      if (data.bankName || data.bankCountry) {
        bankDetails = [data.bankName, data.bankCountry].filter(function(string) {
          if (string) {
            return true;
          }
          return false;
        }).join(', ');
      }
      if (data.isSameBankAccount || JSON.parse(data.isSameBankAccount)) {
        scopeObj.view.flxSwiftCode.setVisibility(false);
        scopeObj.view.flxBank.setVisibility(false);
      } else {
        scopeObj.view.flxSwiftCode.setVisibility(true);
        scopeObj.view.flxBank.setVisibility(true);
      }
      scopeObj.setFormattedAddress(data);
      scopeObj.view.btnMakePayment.onClick = function() {  
        if(scope_configManager.TransferFlowType === "CTF"){
          scopeObj.euroPresenter.showTransferScreen({
            context: "MakePayment",
            accountTo: data.beneficiaryId
          });
        }
        else{
          var navMan = applicationManager.getNavigationManager();
          var Userdata = applicationManager.getUserPreferencesManager().getUserObj();
          navMan.navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "frmUTFLanding"
          }, false, Userdata);
        }

      };
      scopeObj.view.flxAddAckButtons.setVisibility(true);
      scopeObj.view.flxEditAckButtons.setVisibility(false);
      scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AddNewBeneficiary");
      if(data.transactionStatus && data.transactionStatus.toUpperCase() === "PENDING"){
        scopeObj.view.lblSuccessMessage.text = data.beneficiaryName + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.SubmittedForApproval");
		}else{
      scopeObj.view.lblSuccessMessage.text = data.beneficiaryName + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.HasBeenAdded");
		}if(data.referenceId){
      scopeObj.view.lblRefrenceNumberValue.text = data.referenceId;
		}else{
      scopeObj.view.lblRefrenceNumberValue.text = data.beneficiaryId;
		}
      scopeObj.view.lblAccountNumberValue.text = data.accountNumber;
      if(data.swiftCode){
        scopeObj.view.lblSwiftCodeValue.text = data.swiftCode;
      }
      else{
        scopeObj.view.lblSwiftCodeValue.text ="None";
      }
      scopeObj.view.lblBankValue.text = bankDetails;
      scopeObj.view.lblNameValue.text = data.beneficiaryName;
      if(data.nickName){
        scopeObj.view.lblNicknameValue.text = data.nickName;
      }
      else{
        scopeObj.view.lblNicknameValue.text = "None";
      }
      if(data.phone){
        scopeObj.view.lblPhoneNumberValue.text = data.phone;
      }
      else{
        scopeObj.view.lblPhoneNumberValue.text = "None";
      }
      if(data.email){
        scopeObj.view.lblEmailAddressValue.text = data.email;
      }
      else{
        scopeObj.view.lblEmailAddressValue.text = "None";
      }
      scopeObj.view.lblPaymentMethodKey.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod");
      scopeObj.view.lblPaymentMethodValue.text = payment_method;
      if (data.contractsData && data.contractsData.length > 0) {
        scopeObj.view.flxContractsComponent.setVisibility(true);
        scopeObj.view.screenConfirm.setAckScreenContractsData(data.cifSegData);
        scopeObj.view.screenConfirm.flxHorizontalLine1.setVisibility(false);
      } else {
        scopeObj.view.flxContractsComponent.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    },

    /**
         * Method to set formatted beneficiary address
         * @param {Object} data - beneficiary data
         */
    setFormattedAddress: function(data) {
      var scopeObj = this;
      if (!data.addressLine1 && !data.addressLine2 && !data.city && !data.zipcode && !data.country) {
        scopeObj.view.lblAddress1.setVisibility(true);
        scopeObj.view.lblAddress2.setVisibility(false);
        scopeObj.view.lblAddress3.setVisibility(false);
        scopeObj.view.lblAddress1.text = "None";
        return;
      }
      if (!data.addressLine1) {
        scopeObj.view.lblAddress1.setVisibility(false);
      } else {
        scopeObj.view.lblAddress1.setVisibility(true);
        scopeObj.view.lblAddress1.text = data.addressLine1;
      }
      if (!data.addressLine2) {
        scopeObj.view.lblAddress2.setVisibility(false);
      } else {
        scopeObj.view.lblAddress2.setVisibility(true);
        scopeObj.view.lblAddress2.text = data.addressLine2;
      }
      if (!data.city && !data.zipcode && !data.country) {
        scopeObj.view.lblAddress3.setVisibility(false);
      } else {
        scopeObj.view.lblAddress3.setVisibility(true);
        var strings = [data.city, data.country, data.zipcode];
        CommonUtilities.setText(scopeObj.view.lblAddress3, strings.filter(function(string) {
          if (string) {
            return true;
          }
          return false;
        }).join(', '), CommonUtilities.getaccessibilityConfig());
      }
      scopeObj.view.forceLayout();
    },
    /**
         * show edited beneficiary acknowledgement screen
         * @param {Object} data contains edited beneficiary details
         */
    showEditBeneficiaryAck: function(data) {
      var scopeObj = this;
      var payment_method;
      if (data.isInternationalAccount === "false" && data.isSameBankAccount === "false") {
        payment_method = "Domestic";
      } else if (data.isInternationalAccount === "true" && data.isSameBankAccount === "false") {
        payment_method = "International";
      } else if (data.isInternationalAccount === "false" && data.isSameBankAccount === "true") {
        payment_method = "Within Bank";
      }
      if (data.isSameBankAccount || JSON.parse(data.isSameBankAccount)) {
        scopeObj.view.flxSwiftCode.setVisibility(false);
        scopeObj.view.flxBank.setVisibility(false);
      } else {
        scopeObj.view.flxSwiftCode.setVisibility(true);
        scopeObj.view.flxBank.setVisibility(true);
      }
      scopeObj.setFormattedAddress(data);
      scopeObj.view.flxAddAckButtons.setVisibility(false);
      scopeObj.view.flxEditAckButtons.setVisibility(true);
      scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.TransfersEur.EditBeneficiary");
      if(data.transactionStatus && data.transactionStatus.toUpperCase() === "PENDING"){
         CommonUtilities.setText(scopeObj.view.lblSuccessMessage, (data.beneficiaryName || data.nickName) + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AmendmentRequestForApproval"), CommonUtilities.getaccessibilityConfig());
      }else{
         CommonUtilities.setText(scopeObj.view.lblSuccessMessage, (data.beneficiaryName || data.nickName) + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AmendmentUpdateSuccessfull"), CommonUtilities.getaccessibilityConfig());
      }
      scopeObj.view.lblRefrenceNumberValue.text = data.Id;
      CommonUtilities.setText(scopeObj.view.lblAccountNumberValue, data.IBAN || data.accountNumber, CommonUtilities.getaccessibilityConfig());
      if (data.swiftCode) {
        scopeObj.view.lblSwiftCodeValue.text = data.swiftCode;
      }
      else {
        scopeObj.view.lblSwiftCodeValue.text = "None";
      }
      scopeObj.view.lblBankValue.text = data.bankName;
      CommonUtilities.setText(scopeObj.view.lblNameValue, data.beneficiaryName || "-", CommonUtilities.getaccessibilityConfig());
      scopeObj.view.lblNicknameValue.text = data.nickName;
      if (data.phone) {
        scopeObj.view.lblPhoneNumberValue.text = data.phone;
      }
      else {
        scopeObj.view.lblPhoneNumberValue.text = "None";
      }
      if (data.email) {
        scopeObj.view.lblEmailAddressValue.text = data.email;
      }
      else {
        scopeObj.view.lblEmailAddressValue.text = "None";
      }
      scopeObj.view.lblPaymentMethodKey.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod");
      scopeObj.view.lblPaymentMethodValue.text = payment_method;
      if (data.contractsData && data.contractsData.length > 0) {
        scopeObj.view.flxContractsComponent.setVisibility(true);
        // scopeObj.view.screenConfirm.setAckScreenContractsData(data.cifSegData);
        this.view.screenConfirm.setConfirmScreenContractsData(data.contractsData)
        scopeObj.view.screenConfirm.flxHorizontalLine1.setVisibility(false);
      } else {
        scopeObj.view.flxContractsComponent.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    }
  };
});