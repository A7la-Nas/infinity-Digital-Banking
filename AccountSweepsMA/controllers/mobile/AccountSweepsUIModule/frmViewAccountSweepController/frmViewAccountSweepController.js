define({
  primaryName: "",
  secondaryName: "",
  //Type your controller code here
  /**
   * init is called when the form is loaded , initialisation happen here
   */
  init: function () {
    var scope = this;
    this.view.preShow = this.preShowForm;
    this.view.postShow = this.postShowForm;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, scope.navigateCustomBack);
      this.presenter = applicationManager.getModulesPresentationController({
        moduleName: "AccountSweepsUIModule",
        appName: "AccountSweepsMA",
      });
  },

  /***
   * OnNavigate is called when the form is navigated after init
   */
  onNavigate: function () {},

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
	this.presenter.commonFunctionForgoBack();
    //this.presenter.cancelCommon("frmAccountSweepsDashBoard");
  },
  /**
   * preShowForm is called when the form is pre loaded
   */
  preShowForm: function () {
    let scope = this;
    scope.initActions();
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else{
      this.view.flxHeader.isVisible = true;
    }
  },

  /**
   * postShowForm is called when the form is post loaded
   */
  postShowForm: function () {},

  /**
   * initActions has all form action declarations
   */
  initActions: function () {
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customHeader.flxBack.onTouchStart = this.navigateCustomBack;
    this.view.nativePopup.setVisibility(false);
    this.setEditDetils();
    // this.view.btnSubmit.isVisible = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_EDIT");
    // this.view.btnModify.isVisible = applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SWEEP_DELETE");
    this.view.btnSubmit.onClick = this.onEdit;
    this.view.btnModify.onClick = this.onDelete;
  },

  setEditDetils: function () {
    //this.view.btnModify.setVisibility(false);
    var Editcontext = this.presenter.getAccountSweepsObject();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    primaryName = applicationManager
      .getPresentationUtility()
      .formatText(
        Editcontext.primaryAccountName,
        10,
        Editcontext.primaryAccountNumber,
        4
      );
    secondaryName = applicationManager
      .getPresentationUtility()
      .formatText(
        Editcontext.secondaryAccountName,
        10,
        Editcontext.secondaryAccountNumber,
        4
      );
    accountSweepMan.setSweepsAttribute("processedPrimaryName", primaryName);
    accountSweepMan.setSweepsAttribute("processedSecondaryName", secondaryName);
    this.view.lblPrimaryAccountValue.text = primaryName;
    this.view.lblSecondaryAccountValue.text = secondaryName;
    this.view.rtxSweepCondition.isVisible = true;
    this.setSweepCondition(Editcontext, primaryName, secondaryName);
    this.view.lblStatusValue.text = Editcontext.sweepStatus;
    this.view.imgStatusIndicator.src = Editcontext.sweepStatusImage;
    var visible = (Editcontext.sweepStatus === kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE")) ? true : false;
    this.view.btnModify.isVisible = visible;
    this.view.lblFrequencyValue.text = Editcontext.frequency;
    this.view.lblStartingFromValue.text = Editcontext.startDate;
    this.view.lblEndDateValue.text = this.presenter.isEmptyNullUndefined(Editcontext.endDate) ? kony.i18n.getLocalizedString("i18n.accountsweeps.endManually") : Editcontext.endDate;
    if (Editcontext.serviceRequestId) {
      this.view.flxReferenceNumber.isVisible = true;
      this.view.lblReferenceNumberValue.text = Editcontext.serviceRequestId;
    } else {
      this.view.flxReferenceNumber.isVisible = false;
    }
    this.view.btnSubmit.text =
      kony.i18n.getLocalizedString("i18n.accounts.edit");
  },

  setSweepCondition: function (context, primary, secondary) {
    this.view.rtxSweepCondition.isVisible = true;
    if (!this.presenter.isEmptyNullUndefined(context.belowSweepAmount) && !this.presenter.isEmptyNullUndefined(context.aboveSweepAmount)) {
      this.view.rtxSweepCondition.text =
        "If the balance in" + " " + primary + " " + ":";
      this.view.flxSweep.isVisible = true;
      this.view.rtxPoint2.text =
        "goes <b>above" +
        " " +
        this.formattedAmount(
          context.aboveSweepAmount,
          context.currencyCode,
          "Above"
        ) +
        "</b> " +
        "then <b>transfer excess</b> amount to" +
        " " +
        secondary;
      this.view.rtxPoint1.text =
        "goes <b>below" +
        " " +
        this.formattedAmount(
          context.belowSweepAmount,
          context.currencyCode,
          "Below"
        ) +
        "</b> " +
        "then <b>topup</b> amount from" +
        " " +
        secondary;
      this.view.lblSweepConditionHeader.text = kony.i18n.getLocalizedString("i18n.accountsweeps.both");
    } else if (!this.presenter.isEmptyNullUndefined(context.belowSweepAmount)) {
      this.view.rtxSweepCondition.text =
        "If the balance in" +
        " " +
        primary +
        " " +
        "goes <b>below" +
        " " +
        this.formattedAmount(
          context.belowSweepAmount,
          context.currencyCode,
          "Below"
        ) + "</b>" +
        " " +
        "then <b>topup</b> amount from" +
        " " +
        secondary;
      this.view.lblSweepConditionHeader.text = kony.i18n.getLocalizedString("i18n.accountsweeps.below");
      this.view.flxSweep.isVisible = false;
    } else {
      this.view.rtxSweepCondition.text =
        "If the balance in" +
        " " +
        primary +
        " " +
        "goes <b>above" +
        " " +
        this.formattedAmount(
          context.belowSweepAmount,
          context.currencyCode,
          "Above"
        ) +
        "</b> " +
        "then <b>transfer excess</b> amount to" +
        " " +
        secondary;
      this.view.lblSweepConditionHeader.text = kony.i18n.getLocalizedString("i18n.signatory.above");
      this.view.flxSweep.isVisible = false;
    }
  },

  formattedAmount: function (amount, currencyCode, sweepType) {
    var forUtility = applicationManager.getFormatUtilManager();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var formatAmount = forUtility.formatAmount(
      amount,
    );
    sweepType === "Above" ? accountSweepMan.setSweepsAttribute("processedAboveSweepAmount", formatAmount) : accountSweepMan.setSweepsAttribute("processedBelowSweepAmount", formatAmount);
    var processedAmount = forUtility.getCurrencySymbol(currencyCode) + formatAmount;
    return processedAmount;
  },

  onEdit: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("AccountSweepsFlow", "Edit");
    this.presenter.getAllAccounts("frmSweepsAmount", "frmViewAccountSweep", this.presenter.coreCustomerId);
  },

  onDelete: function () {
    var Editcontext = this.presenter.getAccountSweepsObject();
    this.deleteRow(Editcontext);
  },

  deleteRow: function (rowData) {
    var scope = this;
    var bankDate = this.presenter.bankDate["currentWorkingDate"];
    var bankDate = new Date(bankDate).getTime();
    var popupMessageText = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepPresent");
    if (!kony.sdk.isNullOrUndefined(rowData.endDate)) {
        var endDate = rowData.endDate.split("/");
        endDate = new Date(endDate[2], endDate[1] - 1, endDate[0])
        endDate = endDate.getTime();
        if (bankDate < endDate) {
            popupMessageText = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepFuture");
            popupMessageText = popupMessageText.replace("*", rowData.endDate ? rowData.endDate : "Future Date");
        }
    }
    this.view.nativePopup.btnCancel.onClick = function(){
        scope.view.nativePopup.setVisibility(false);
    }
    this.view.nativePopup.btnContinue.onClick = scope.deleteHandler.bind(scope, rowData, true);
    this.view.nativePopup.lblPopupMessage.text = popupMessageText;
    this.view.nativePopup.setVisibility(true);
    // var basicProperties = {
    //   message:
    //     kony.i18n.getLocalizedString("i18n.accountsweeps.deleteTheRule") +
    //     ' " ' +
    //     rowData.processedPrimaryName +
    //     ' " ' +
    //     "?",
    //   alertType: constants.ALERT_TYPE_CONFIRMATION,
    //   yesLabel: kony.i18n.getLocalizedString("i18n.common.yes"),
    //   noLabel: kony.i18n.getLocalizedString("i18n.common.no"),
    //   alertHandler: scope.deleteHandler.bind(scope, rowData),
    // };
    // var pspConfig = {};
    // kony.ui.Alert(basicProperties, pspConfig);
  },

  deleteHandler: function (rowIndex, response) {
    if (response == true) {
      this.presenter.getSweepsDelete(rowIndex);
      this.view.nativePopup.setVisibility(false);
    }
  },

  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMsg);
  },
});
