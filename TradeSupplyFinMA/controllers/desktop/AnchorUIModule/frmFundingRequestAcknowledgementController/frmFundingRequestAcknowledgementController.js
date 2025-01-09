define(["FormControllerUtility"], function (FormControllerUtility) {
  let scope, presenter, contentScope, breakpoint;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    /**
     * Handles the navigation.
     */
    onNavigate: function () {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Handles the breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (form, width) {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      fundingRequestData = JSON.parse(JSON.stringify(presenter.fundingRequest.data));
      this.view.formTemplate12.hideBannerError();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      let roadmapData = [];
      for (const [key, value] of Object.entries(presenter.fundingRequest.roadmap)) {
        roadmapData.push({
          'currentRow': key === 'step5',
          'rowLabel': value.text,
          'rowStatus': 'done'
        });
      }
      contentScope.ProgressTracker.setData({
        'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequest'),
        'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${fundingRequestData.fundingRequestId || '-'}`,
        'data': roadmapData
      });
    },
    /**
     * Initialises the form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'AnchorUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.btnSubmit.onClick = () => scope.backToDashbord();
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
      if (viewModel.submitFundingRequest) {
        this.setData(viewModel.submitFundingRequest);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    setData: function (data) {
      contentScope.lblReferenceNumber.text = data.fundingRequestId;
    },
    backToDashbord: function () {
      presenter.loadScreenWithContext({
        'context': 'anchorDashboard'
      });
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});