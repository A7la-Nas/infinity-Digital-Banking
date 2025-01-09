define(["FormControllerUtility"], function (FormControllerUtility) {
  const responsiveUtils = new ResponsiveUtils();
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initFormActions();
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'reviewAndSubmitDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'reviewAndSubmitDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      this.view.ProgressTracker.setData(roadmapData);
      FormControllerUtility.enableButton(this.view.btnSubmit);
      FormControllerUtility.enableButton(this.view.btnViewAllGuarantees);
      if (this.presenter.guaranteeData.isReviseFlow) {
        this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.issuedGtAndSblcReviseRequestReviewAndSubmit");
      } else {
        this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGtAndSblcCreateNewRequestReviewAndSubmit");
      }
      if (kony.application.getCurrentBreakpoint() > 1024) {
        this.view.flxLeft.width = "58.12%";
      }
      this.view.flxRight.setVisibility(true);
      this.view.flxActions.setVisibility(true);
      this.view.flxViewAllGuaranteesAction.setVisibility(false);
      let guaranteeDetails = JSON.parse(JSON.stringify(this.presenter.guaranteeData));
      delete guaranteeDetails.guaranteesSRMSId;
      this.view.GuaranteeDetails.setContext({ data: guaranteeDetails, showSwiftTags: scope_configManager.swiftEnabled === 'True' });
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, "saveOrDeleteDraft");
      this.view.btnBack.onClick = this.navigateBack;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.view.btnViewAllGuarantees.onClick = this.viewAllGuarantees;
    },
    /**
     * Entry point method for the form controller
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.guaranteesSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    togglePopup: function (visibility, flow) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case "saveOrDeleteDraft":
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.Popup.lblPopupMessage.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("i18n.TradeFinance.SaveOrDeleteLetterOfCredit") : kony.i18n.getLocalizedString("i18n.TradeFinance.saveThisRequestAsDraftOrClose");
            this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveasDraft&Close");
            this.view.Popup.btnNo.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("kony.mb.Messages.DeletePermanently") : kony.i18n.getLocalizedString("i18n.TradeFinance.closeWithoutSaving");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            this.view.Popup.btnNo.onClick = this.deletePermanently;
            break;
        }
        this.view.Popup.btnYes.toolTip = this.view.Popup.btnYes.text;
        this.view.Popup.btnNo.toolTip = this.view.Popup.btnNo.text;
      }
      this.view.flxDialogs.setVisibility(visibility);
      this.view.flxPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    showSuccessMessage: function (viewModel) {
      this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.lblTransactionReferenceValue.text = viewModel.relatedTransactionReference || viewModel.guaranteesSRMSId;
      if (!viewModel.saveDraft) {
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString('i18n.TradeFinance.submittedSuccessfully');
        this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString("i18n.TradeFinance.issuedGtAndSblcReviseRequestAcknowledgement") : kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGtAndSblcCreateNewRequestAcknowledgement");
        if (kony.application.getCurrentBreakpoint() > 1024) {
          this.view.flxLeft.width = "87.86%";
        }
        this.view.flxRight.setVisibility(false);
        this.view.flxActions.setVisibility(false);
        this.view.flxViewAllGuaranteesAction.setVisibility(true);
      } else {
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString('i18n.TradeFinance.requestSavedSuccessfullyMessage');
      }
      this.view.forceLayout();
    },
    showServerError: function (errorMsg) {
      if (errorMsg) {
        this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.lblErrorMessage.text = errorMsg;
        this.view.forceLayout();
      }
    },
    saveDraft: function (flow) {
      this.togglePopup(false);
      this.presenter.saveGuarantee(formData, this.view.id, flow);
    },
    submitDetails: function () {
      this.presenter.createBeneficiaryAndClause(this.view.id);
    },
    deletePermanently: function () {
      this.togglePopup(false);
      if (this.presenter.guaranteeData.guaranteesSRMSId) {
        this.presenter.deleteGuarantee(this.view.id);
      } else {
        this.presenter.showGuaranteesScreen({ context: 'viewGuarantees' });
      }
    },
    navigateBack: function () {
      this.presenter.showView({ form: 'frmClauseConditionDetails' });
    },
    viewAllGuarantees: function () {
      this.presenter.showGuaranteesScreen({ context: 'viewGuarantees' });
    }
  };
});