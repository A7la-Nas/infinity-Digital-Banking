define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let formTemplateScope, contentScope;
  let presenter;
  let sbaEnrolmentStatuses;
  let isAIDPermission = false;
  let isCashFlowPermission = false;
  return {
    /**
      * Sets the initial actions for form
      */
    init: function () {
      presenter = applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' });
      sbaEnrolmentStatuses = OLBConstants.SBA_ENROLMENT_STATUS_CONFIG;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      var scope = this;
      try {
        formTemplateScope = this.view.formTemplate12;
        contentScope = formTemplateScope.flxContentTCCenter;
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount1",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      var scope = this;
      try {
        scope.setDefaultUI();
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount1",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function (data) {
      var scope = this;
      try {
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount1",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * This function for handles the responses from presentation controller
     * @return : NA
     */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.errResponse) {
          if (viewModel.errResponse.hasOwnProperty("serverErrorRes")) {
            if (viewModel.errResponse.serverErrorRes.errmsg_getCodatApiToken) {
              scope.view.formTemplate12.showBannerError({
                dbpErrMsg: kony.i18n.getLocalizedString('i18n.SBAdvisory.ConnectionMSError')
              });
            }
          } else {
            scope.view.formTemplate12.setBannerFocus();
            scope.view.formTemplate12.showBannerError({
              dbpErrMsg: viewModel.errResponse.errmsg || viewModel.errResponse.errorMessage
            });
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "",
          "method": "",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDefaultUI
     * this function is responsible for setting Review screen UI
     * @return : NA
     */
    setDefaultUI: function () {
      var scope = this;
      try {
        var businesses = applicationManager.getSbaJourney();
        var userAttributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
        contentScope.lblHiUser.text = kony.i18n.getLocalizedString("i18n.WireTransfer.Hi") + ` ${userAttributes.FirstName + " " + userAttributes.LastName}!`; 
        formTemplateScope.pageTitle = kony.i18n.getLocalizedString("i18n.SBAdvisory.connectYourAccountingData");
        contentScope.btnCancel.onClick = () => {
          presenter.updateSBAStatusForCancel();
        }
        contentScope.btnContinue.onClick = () => {
          presenter.navigateToScreens('SBAEnrolment');
        }
        if (businesses.length === 1) {
          scope.handleInfoUI(businesses[0].featuresAndPermissions.SBA_XAI_DASHBOARD, businesses[0].featuresAndPermissions.SBA_AID);
        } else {
          businesses.map((business) => {
            isCashFlowPermission = isCashFlowPermission || business.featuresAndPermissions.SBA_XAI_DASHBOARD;
            isAIDPermission = isAIDPermission || business.featuresAndPermissions.SBA_AID;
          })
          scope.handleInfoUI(isCashFlowPermission, isAIDPermission);
        }
      } catch (err) {
        var errorObj = {
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : handleInfoUI
    * this function is responsible for setting info UI
    * @return : NA
    */
    handleInfoUI: function (permission1, permission2) {
      var scope = this;
      try {
        if (permission1 && permission2) {
          contentScope.flxIntroItems.setVisibility(false);
          contentScope.flxAIDandXAIIntroItems.setVisibility(true);
          contentScope.flxCashFlowPrediction.setVisibility(true);
          contentScope.flxAccountsPayable.left = "3%";
        } else if (permission1) {
          contentScope.flxIntroItems.setVisibility(true);
          contentScope.flxAIDandXAIIntroItems.setVisibility(false);
        } else if (permission2) {
          contentScope.flxIntroItems.setVisibility(false);
          contentScope.flxCashFlowPrediction.setVisibility(false);
          contentScope.flxAccountsPayable.left = "31%";
          contentScope.flxAIDandXAIIntroItems.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount1",
          "method": "handleInfoUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmConnectAccount1";
      // kony.ui.Alert(errMsg);
    }
  };
});