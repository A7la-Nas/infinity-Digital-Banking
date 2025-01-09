define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let presenter;
  let allowAccess = 'Allow Access';
  let selectedSbaBusiness;
  let SBA_STAUS;
  let SBA_ENROL_STATUS;
  let isoString;
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      var scope = this;
      try {
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
        scope.view.onBreakpointChange = scope.onBreakpointChange;
      } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
          "method": "init",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      var scope = this;
      try {
        presenter = applicationManager.getModulesPresentationController({
          appName: 'SBAdvisoryMA',
          moduleName: 'EnrolmentModule'
        });
        selectedSbaBusiness = applicationManager.getSelectedSbaBusiness();
        SBA_STAUS = OLBConstants.SBA_ENROLMENT_STATUS_CONFIG;
        SBA_ENROL_STATUS = OLBConstants.SBA_ENROL_STATUS;
      } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
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
        scope.initOnclickActions();
      } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
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
      try { } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setDefaultUI
      * This function responsible for setting up the initial UI
      * @return : NA
      */
    setDefaultUI: function () {
      var scope = this;
      try {
        scope.view.imgAccProv.src = "accproviderinput.png";
        scope.view.btnAccProvider.text = kony.i18n.getLocalizedString("i18n.common.login");
        scope.view.btnCancel.text = kony.i18n.getLocalizedString("kony.tab.common.CANCEL");
        scope.view.btnCancel.onClick = () => {
          presenter.updateSBAStatusForCancel();
        }
      } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
       * @api : initOnclickActions
       * This function defines the all the onClick events in the form
       * @return : NA
       */
    initOnclickActions: function () {
      var scope = this;
      try {
        scope.view.btnAccProvider.onClick = scope.goToAllowAccess;
      } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
          "method": "initOnclickActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onBreakpointChange
     * This function for changing the UI depending upon breakpoint
     * @return : NA
     */
    onBreakpointChange: function () {
      var scope = this;
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
        isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
        isTablet = false;
      }
      try { } catch (err) {
        var errorObj = {
          "level": "frmAccProviderLogin",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : goToAllowAccess
     * This function for changing image and button text
     * @return : NA
     */
    goToAllowAccess: function () {
      var scope = this;
      let companyId;
      try {
        if (scope.view.btnAccProvider.text == allowAccess) {
          var userAttributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
          let sbaEnrolmentStatus = JSON.stringify(selectedSbaBusiness.sbaEnrolmentStatus);
          companyId = userAttributes.companyId;
          let payload = {
            "targetPlatform": selectedSbaBusiness.accountingSoftwareName || "",
            "companyId": companyId || "",
            "customerId": selectedSbaBusiness.Customer_id || "",
            "sbaEnrolmentStatus": sbaEnrolmentStatus || ""
          };
          presenter.getEnrolled(payload, this.view.id);
        } else {
          scope.view.btnAccProvider.text = allowAccess;
          scope.view.imgAccProv.src = "accprovideraccess.png";
          scope.view.imgAccProv.centerX = "50.8%";
        }
      } catch (err) {
        var errorObj = {
          "method": "goToAllowAccess",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        // Toggling the loader
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        } else if (viewModel.serverError) {
          // formTemplateScope.showBannerError({ dbpErrMsg: viewModel.serverError });
        }
        if (viewModel.isEnrolled) {
          const now = new Date();
          isoString = now.toISOString();
          let sbaEnrolmentStatus = JSON.stringify({
            "status": SBA_ENROL_STATUS.SBA_ILP_STARTED,
            "eventDateTime": isoString
          });
          let payload = {
            customerId: selectedSbaBusiness.Customer_id,
            sbaEnrolmentStatus: sbaEnrolmentStatus
          }
          presenter.updateSBAStatus(payload, scope.view.id);
        }
        if (viewModel.updateSBAStatus) {
          let SbaJourney = applicationManager.getSbaJourney();
          //let sbaHamburgerConfig = applicationManager.getConfigurationManager().isSBAVisible;
          SbaJourney.map((business, index) => {
            if (business.BackendId == selectedSbaBusiness.BackendId) {
              var isLive = business.sbaEnrolmentStatus && business.sbaEnrolmentStatus.hasOwnProperty("isLive") ? JSON.parse(business.sbaEnrolmentStatus.isLive) : true;
              if (isLive) {
                // getEnrollmentStatus/getStatus is enabled
                //updating enrolmentStatus after sucessCallback
                SbaJourney[index]["enrolmentStatus"] = {
                  EnrollmentState: SBA_ENROL_STATUS.SBA_ILP_STARTED,
                  eventDateTime: isoString,
                  EventMinutesAgo: 0,
                };
              } else {
                // getEnrollmentStatus/getStatus is disabled
                SbaJourney[index].sbaEnrolmentStatus.status = SBA_ENROL_STATUS.SBA_ILP_STARTED;
                SbaJourney[index].sbaEnrolmentStatus.eventDateTime = isoString;
                SbaJourney[index].sbaEnrolmentStatus.EventMinutesAgo = 0;
              }
            }
          });
          applicationManager.setSbaJourney(SbaJourney);
          presenter.navigateToScreens('HomepageDashboard');
        }
      } catch (err) {
        var errorObj = {
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function (err) {
      var errMsg = JSON.stringify(err);
      errMsg.level = "frmAccProviderLogin";
      // kony.ui.Alert(errMsg);
    },
  };
});