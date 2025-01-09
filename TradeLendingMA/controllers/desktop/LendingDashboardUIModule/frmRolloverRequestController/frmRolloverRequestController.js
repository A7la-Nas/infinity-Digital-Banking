define(["FormControllerUtility", "TradeLendingUtils"], function (FormControllerUtility, TLUtils) {
  const fontIcons = {
    'radioSelected': 'M',
    'radioUnselected': 'L'
  },
    skins = {
      'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
      'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px',
    };
  let scope, presenter, contentScope, popupScope, breakpoint;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onTouchEnd = function () {
        kony.timer.schedule("touchEndTimer", TLUtils.hideSubscribedWidgetsIfVisible, 0.1, false);
      };
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    /**
     * Handles breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (formHandle, breakpoint) {
      breakpoint = kony.application.getCurrentBreakpoint();
      this.view.formTemplate12.hideBannerError();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      TLUtils.subscribeToTouchEnd([
        contentScope.FacilityDropdown,
        contentScope.LoanDropdown
      ]);
      this.resetForm();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeLendingMA',
        'moduleName': 'LendingDashboardUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxRadio1Icon,
        contentScope.flxRadio2Icon,
        contentScope.flxRadio3Icon
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.btnCancel.toolTip = kony.i18n.getLocalizedString('i18n.wealth.cancel');
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.wealth.submit');
      contentScope.btnBackToDashboard.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.goToDashboard');
      contentScope.flxRadio1Icon.onClick = this.toggleTermRadio.bind(this, 1);
      contentScope.flxRadio2Icon.onClick = this.toggleTermRadio.bind(this, 2);
      contentScope.flxRadio3Icon.onClick = this.toggleTermRadio.bind(this, 3);
      contentScope.tbxRolloverTerm.onTextChange = () => {
        contentScope.tbxRolloverTerm.text = contentScope.tbxRolloverTerm.text.replace(/^[^1-9]*|[\D]*$/g, '').substring(0, 4);
        FormControllerUtility[contentScope.tbxRolloverTerm.text ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
      };
      contentScope.btnCancel.onClick = () => scope.togglePopup('cancelRequest');
      contentScope.btnSubmit.onClick = () => scope.togglePopup('submitRequest');
      contentScope.btnBackToDashboard.onClick = () => presenter.loadScreenWithContext({
        'context': 'lendingDashboard'
      });
    },
    /**
     * Entry point method for the form controller.
     * @param {Object} viewModel - Specifies the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        this.view.formTemplate12.showLoading();
      } else if (viewModel.isLoading === false) {
        this.view.formTemplate12.hideLoading();
      }
      if (viewModel.rolloverRequestSuccess) {
        this.showAcknowledgement(viewModel.rolloverRequestSuccess);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    /**
     * Resets the form.
     */
    resetForm: function () {
      contentScope.flxRolloverDetails.setVisibility(true);
      contentScope.flxAcknowledgement.setVisibility(false);
      contentScope.flxLoanDropdown.setVisibility(false);
      contentScope.flxLoanDetails.setVisibility(false);
      contentScope.flxRolloverTerm.setVisibility(false);
      FormControllerUtility.disableButton(contentScope.btnSubmit);
      this.populateFacilityDropdown();
    },
    /**
     * Toggles the rollover term radio.
     * @param {string} idx - Specifes the selected radio index.
     */
    toggleTermRadio: function (idx) {
      for (let i = 1; i <= 3; i++) {
        contentScope[`lblRadio${i}Icon`].text = fontIcons.radioUnselected;
        contentScope[`lblRadio${i}Icon`].skin = skins.radioUnselected;
      }
      contentScope.tbxRolloverTerm.text = "";
      contentScope.tbxRolloverTerm.placeholder = "";
      FormControllerUtility.disableButton(contentScope.btnSubmit);
      FormControllerUtility.disableTextbox(contentScope.tbxRolloverTerm);
      if (!idx) {
        return;
      }
      contentScope[`lblRadio${idx}Icon`].text = fontIcons.radioSelected;
      contentScope[`lblRadio${idx}Icon`].skin = skins.radioSelected;
      contentScope.tbxRolloverTerm.placeholder = {
        1: kony.i18n.getLocalizedString('i18n.TradeLending.enterDays'),
        2: kony.i18n.getLocalizedString('i18n.TradeLending.enterMonths'),
        3: kony.i18n.getLocalizedString('i18n.TradeLending.enterYears')
      }[idx];
      FormControllerUtility.enableTextbox(contentScope.tbxRolloverTerm);
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'FacilityDropdown':
          this.popupalteLoans(selectedKey);
          break;
        case 'LoanDropdown':
          this.populateLoanDetails(selectedKey);
          break;
      }
    },
    /**
     * Populates the facility dropdown.
     */
    populateFacilityDropdown: function () {
      const facilityDropdownData = presenter.facilityRecords.reduce((acc, obj) => {
        acc[obj.account] = `${obj.shortTitle} / ${obj.account}`;
        return acc;
      }, {});
      contentScope.FacilityDropdown.setContext(facilityDropdownData);
      contentScope.FacilityDropdown.setDefaultText();
    },
    /**
     * Populates the loan dropdown.
     * @param {string} facilityId - Specifies the selected facility id.
     */
    popupalteLoans: function (facilityId) {
      const loans = presenter.loanRecords.filter(l => l.facilityId === facilityId);
      const loanDropdownData = loans.reduce((acc, obj) => {
        acc[obj.account] = `${obj.shortTitle} / ${obj.account}`;
        return acc;
      }, {});
      contentScope.LoanDropdown.setContext(loanDropdownData);
      contentScope.LoanDropdown.setDefaultText();
      contentScope.flxLoanDropdown.setVisibility(true);
    },
    /**
     * Populates the loan details.
     * @param {string} selectedKey - Specifies the selected loan id.
     */
    populateLoanDetails: function (loanId) {
      const selectedLoan = presenter.loanRecords.find(l => l.account === loanId);
      contentScope.flxLoanDetails.setVisibility(true);
      const currSymbol = presenter.configurationManager.getCurrency(selectedLoan.currency);
      let segLoanData = [{
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.loanAmountWithColon'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.totalCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.mortgageAccount.UtilisedAmount'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.utilisedCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.currentOutstandingAmountWithColon'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.availableCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
        'lblValue': selectedLoan.status
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
        'lblValue': presenter.formatUtilManager.getFormattedCalendarDate(selectedLoan.maturityDate),
      }];
      contentScope.segLoanDetails.setData(segLoanData);
      contentScope.flxRolloverTerm.setVisibility(true);
      this.toggleTermRadio();
    },
    /**
     * Toggles the popup.
     * @param {string} flow - Specifies the flow.
     */
    togglePopup: function (flow) {
      let popupContext = {};
      switch (flow) {
        case 'cancelRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.cancelRolloverRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.loadScreenWithContext({ 'context': 'lendingDashboard' })
          };
          break;
        case 'submitRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.submitRolloverRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.transfers.Cancel'),
            'yesText': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'yesClick': () => scope.submitRequest()
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Submits the rollover request.
     */
    submitRequest: function () {
      let formData = {
        "facilityId": contentScope.FacilityDropdown.getSelectedKey(),
        "loanId": contentScope.LoanDropdown.getSelectedKey()
      };
      formData[{
        [contentScope.lblRadio1Icon.text]: 'rolloverDays',
        [contentScope.lblRadio2Icon.text]: 'rolloverMonths',
        [contentScope.lblRadio3Icon.text]: 'rolloverYears'
      }[fontIcons.radioSelected]] = contentScope.tbxRolloverTerm.text;
      presenter.submitRolloverRequest(formData, this.view.id);
    },
    /**
     * Shows the acknowledgement.
     * @param {object} response - Specifies the response.
     */
    showAcknowledgement: function (response) {
      contentScope.flxRolloverDetails.setVisibility(false);
      contentScope.flxAcknowledgement.setVisibility(true);
      contentScope.lblReferenceValue.text = response.rolloverRequestId || '';
      contentScope.forceLayout();
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },
  };
});
