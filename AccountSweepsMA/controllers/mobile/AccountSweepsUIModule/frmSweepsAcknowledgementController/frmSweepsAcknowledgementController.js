define({
  keypadString: "0",

  /**
   * init is called when the form is loaded , initialisation happen here
   */
  init: function () {
    var scope = this;
    scope.view.preShow = scope.preShowForm;
    scope.view.postShow = scope.postShowForm;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", currentForm, scope.navigateCustomBack);
  },

  /***
   * OnNavigate is called when the form is navigated after init
   */
  onNavigate: function (context) {
    // var sweepMod = applicationManager.getModulesPresentationController({ "moduleName": "AccountSweepsUIModule", "appName": "AccountSweepsMA" });
    // var context = sweepMod.getAccountSweepsObject();
    this.presenter = applicationManager.getModulesPresentationController({
      moduleName: "AccountSweepsUIModule",
      appName: "AccountSweepsMA",
    });
    this.navManager = applicationManager.getNavigationManager();
    context = this.navManager.getCustomInfo("Confirmation");
    var delContext = this.navManager.getCustomInfo("AccountBySweep");
    let sweepflow = this.navManager.getEntryPoint("AccountSweepsFlow");
    if (sweepflow === "Delete") {
      if (!kony.sdk.isNullOrUndefined(delContext.serviceRequestId) || delContext["message"] == "Account Sweep cancelled successfully") {
        this.updateform(delContext);
      } else {
        this.bindGenericError(
          kony.i18n.getLocalizedString(
            "i18n.accountSweeps.SweepCouldNotBeCanceled"
          )
        );
      }
    } else {
     if (!kony.sdk.isNullOrUndefined(context.serviceRequestId)||(!kony.sdk.isNullOrUndefined(context.message)&&kony.sdk.isNullOrUndefined(context.dbpErrCode))) {
        this.updateform(context);
      } else {
        this.bindGenericError(context.errorMessage);
      }
    }
  },

  /***
   * navigateCustomBack is triggered native/ ios back event
   */
  navigateCustomBack: function () {
    this.presenter.commonFunctionForgoBack();
  },

  /***
   * native/ios cancel event
   */
  cancelOnClick: function () {
    if(this.presenter.flowType === "AccountSweep"){
    this.presenter.cancelCommon("frmAccountSweepsDashBoard");
    } else if(this.presenter.flowType === "AccountDetails"){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
  }
  },
  /**
   * preShowForm is called when the form is pre loaded
   */
  preShowForm: function () {
    let scope = this;
    scope.initActions();
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
  },

  /**
   * postShowForm is called when the form is post loaded
   */
  postShowForm: function () {
	   if(this.presenter.flowType === "AccountDetails"){
		this.view.btnDashboard.text = kony.i18n.getLocalizedString("i18n.accountSweeps.backtoAccountOverview");
	   } else {
		this.view.btnDashboard.text = kony.i18n.getLocalizedString("i18n.accountsweeps.viewExistingRules");
	   }
  },

  /**
   * initActions has all form action declarations
   */
  initActions: function () {
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customHeader.flxBack.onTouchStart = this.navigateCustomBack;
    this.view.btnTryAgain.onClick = this.tryAgain;
    this.view.btnDashboard.onClick = this.tryAgain;
    this.view.btnNewTransfer.onClick = this.createNewSweep;
  },
  /**
   * Updates the form UI
   */
  updateform: function (data) {
    let sweepflow = this.navManager.getEntryPoint("AccountSweepsFlow");
    if (sweepflow === "Delete") {
      this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString(
        "i18n.accountSweeps.sweepSuccessfullyCanceled"
      );
      this.setDeleteData(data);
    } else {
      sweepflow !== "Edit"
        ? (this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString(
            "i18n.accountsweeps.acknowledgementMsg"
          ))
        : (this.view.lblSuccessMessage.text =
            "You have successfully edited the account sweep");
      this.setAcknowledgeData(data);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  /**
   * It is used to set the Delete Service call context
   */
  setDeleteData: function (context) {
    this.view.flxConfirmationDetails.isVisible = false;
    this.view.btnNewTransfer.isVisible = true;
    this.view.btnDashboard.isVisible = true;
    this.view.flxError.isVisible = false;
    this.view.flxSuccessTransaction.isVisible = true;
    this.view.lblReference.isVisible = false;
    // this.view.lblReference.text =  kony.i18n.getLocalizedString("i18n.PayAPerson.ReferenceNumber") +" "+ context.serviceRequestId;
  },
  /**
   * It is used to set the Acknowledgment Service call context
   */
  setAcknowledgeData: function (data) {
    this.view.flxError.isVisible = false;
    this.view.flxConfirmationDetails.isVisible = true;
    this.view.flxSuccessTransaction.isVisible = true;
    var sweepData = this.presenter.getAccountSweepsObject();
    if(!kony.sdk.isNullOrUndefined(data.serviceRequestId))
    {
      this.view.lblReference.setVisibility(true);
      this.view.lblReference.text =kony.i18n.getLocalizedString("i18n.PayAPerson.ReferenceNumber")+" "+ data.serviceRequestId;
    }
    else
      this.view.lblReference.setVisibility(false);
    this.view.lblPrimaryAccountOneValue.text = sweepData.processedPrimaryName;
    this.view.lblSecondaryAccountValue.text = sweepData.processedSecondaryName;
    this.view.lblHeading.text = sweepData.sweepType;
    this.setSweepCondition(
      sweepData,
      sweepData.processedPrimaryName,
      sweepData.processedSecondaryName
    );
    this.view.lblFrequencyValue.text = sweepData.frequency;
    let sweepflow = this.navManager.getEntryPoint("AccountSweepsFlow");
    if(this.presenter.flowType === "AccountDetails" && sweepflow === "Edit"){
     this.view.lblStartingFromValue.text = this.presenter.startDate;
    } else {
    this.view.lblStartingFromValue.text = sweepData.startDate;
    }
    this.view.lblEnddateValue.text = this.presenter.isEmptyNullUndefined(
      sweepData.endDate
    )
      ? kony.i18n.getLocalizedString("i18n.accountsweeps.endManually")
      : sweepData.endDate;
  },
  /**
   * It is used to set the Sweep Condition for the context
   */
  setSweepCondition: function (context, primary, secondary) {
    var forUtility = applicationManager.getFormatUtilManager();
    if (
      context.sweepType === kony.i18n.getLocalizedString("i18n.signatory.above")
    ) {
      this.view.rtxSingleCase.text =
        "If the balance in" +
        " " +
        primary +
        " " +
        "goes <b>above" +
        " " +
        context.processedAboveSweepAmount +
        "</b>" +
        " " +
        "then <b>transfer excess</b> amount to" +
        " " +
        secondary;
      this.view.flxBoth.isVisible = false;
    } else if (
      context.sweepType ===
      kony.i18n.getLocalizedString("i18n.accountsweeps.below")
    ) {
      this.view.rtxSingleCase.text =
        "If the balance in" +
        " " +
        primary +
        " " +
        "goes" +
        " " +
        "<b>below" +
        " " +
        forUtility.getCurrencySymbol(context.currencyCode) +
        context.processedBelowSweepAmount +
        "</b>" +
        " " +
        "then <b>topup</b> amount from" +
        " " +
        secondary;
      this.view.flxBoth.isVisible = false;
    } else {
      this.view.rtxSingleCase.text =
        "If the balance in" + " " + primary + " " + ":";
      this.view.flxBoth.isVisible = true;
      this.view.rtxAbove.text =
        "goes below" +
        " " +
        "<b>" +
        forUtility.getCurrencySymbol(context.currencyCode) +
        context.processedAboveSweepAmount +
        "</b>" +
        " " +
        "then <b>topup</b> amount from" +
        " " +
        secondary;
      this.view.rtxBelow.text =
        "goes above" +
        " " +
        "<b>" +
        forUtility.getCurrencySymbol(context.currencyCode) +
        context.processedBelowSweepAmount +
        "</b>" +
        " " +
        "then <b>transfer excess</b> amount to" +
        " " +
        secondary;
    }
  },
  /**
   * It is called when user clicks on create new sweep
   */
  createNewSweep: function () {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    accountSweepMan.clearSweepsObject();
    this.presenter.isSecondaryEdit = false;
    this.presenter.isStartDateSelected = false;
    this.navManager.setEntryPoint("AccountSweepsFlow", "Create");
    this.presenter.getAllAccounts("frmAccountSweepsPrimaryAccount", "frmAccountSweepsDashBoard", this.presenter.coreCustomerId);
  },
  /**
   * It is called when user clicks on try again
   */
  tryAgain: function () {
    this.presenter.isStartDateSelected = false;
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    accountSweepMan.clearSweepsObject();
    this.presenter.isSecondaryEdit = false;
    if(this.presenter.flowType === "AccountDetails"){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
    } else {
    this.presenter.getSweeps(this.presenter.coreCustomerId);
    }
  },
  /**
   * It is called populate the error message
   */
  bindGenericError: function (errorMsg) {
    this.view.flxSuccessTransaction.isVisible = false;
    this.view.flxError.isVisible = true;
    let sweepflow = this.navManager.getEntryPoint("AccountSweepsFlow");
    sweepflow === "Create"
      ? (this.view.lblTitle.text = kony.i18n.getLocalizedString(
          "i18n.accountsweeps.sweepNotCreated"
        ))
      : (this.view.lblTitle.text = errorMsg);
    this.view.flxInfoList.isVisible = false;
    //this.view.lblError.text = errorMsg;
  },
});
