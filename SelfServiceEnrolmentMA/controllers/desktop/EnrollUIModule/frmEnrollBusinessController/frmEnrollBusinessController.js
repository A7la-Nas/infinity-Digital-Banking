define([
  "CommonUtilities",
  "OLBConstants",
  "FormControllerUtility",
  "ViewConstants",
], function (
  CommonUtilities,
  OLBConstants,
  FormControllerUtility,
  ViewConstants
) {
  var orientationHandler = new OrientationHandler();
  var resGlobal = "";
  var btnFlag = "";
  var dropDownText = "";
  var totalAccountSelected = 0;
  return {
    /**
     * Method to load Enroll Module
     */
    loadEnrollModule: function () {
      return kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager()
        .getModule("EnrollModule");
    },
    /**
     * Method to update form using given context
     * @param {object} context depending on the context the appropriate function is executed to update view
     */
    updateFormUI: function (context) {
      if (context.progressBar === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (context.progressBar === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (context.serverError === true) {
        this.showServerErrorMessage({
          show: true,
          errorMessage: context.errorMessage,
        });
      }
      if (context.enrollSuccess) {
        this.showAcknowledgementUI(context.enrollSuccess);
      }
      if (context.termsAndConditionsSuccess) {
        this.showTermsAndConditions(
          context.termsAndConditionsSuccess.termsAndConditionsContent
        );
      }
      if (context.accountCentric) {
        this.showAccountCentricUI();
      }
      if (context.nonAccountCentric) {
        this.showCustomerCentricUI();
      }
      if (context.showAllFeatures) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("showAllFeatures", context.showAllFeatures);
        this.showAllFeaturesUI(context.showAllFeatures);
      }
      if (context.showOrganizatiionTypes) {
        organizationTypes = context.showOrganizatiionTypes;
        if (this.isCustomerCentric) {
          if (this.isDomainDetailsEditFlow) {
            this.showDomainDetailsUI(organizationTypes, true);
          } else {
            this.showDomainDetailsUI(organizationTypes, false);
          }
        } else {
          this.showCompanyDetailsUI(this.isEditFlow);
        }
      }
      if (context.checkCompanyExistsSuccess) {
        this.resetErrorMessage();
        this.isCompanyEnrolled(context.checkCompanyExistsSuccess);
      }
      if (context.showServiceError) {
        this.showServiceError(context.showServiceError);
      }
      if (context.noRolesFound) {
        this.setErrorMessage(context.noRolesFound.errorMessage);
        this.displayCompanyRolewithnull();
      }
      if (context.showBusinessAccounts) {
        this.showBusinessAccountsUI(context.showBusinessAccounts);
      }
      if (context.roleinCompany) {
        this.resetErrorMessage();
        this.displayCompanyRole(context.roleinCompany);
      }
      if (context.countryList) {
        this.countryList = {};
        this.getAddressSegmentData(context.countryList);
      }
      if (context.stateList) {
        this.stateList = {};
        this.getAddressSegmentData(context.stateList);
      }
      if (context.cityList) {
        this.cityList = {};
        this.getAddressSegmentData(context.cityList);
      }
      if (context.showAddedAccounts) {
        this.verifyAddedAccounts(context.showAddedAccounts);
      }
      if (context.navToAddedAccts) {
        this.fetchAccountsData(context.navToAddedAccts);
      }
      if (context.showScreenToEnterSecureCode) {
        this.showScreenToEnterSecureCode(context.showScreenToEnterSecureCode);
      }
      if (context.isEnteredOTPIncorrect) {
        this.showIncorrectOTPError(context.isEnteredOTPIncorrect);
      }
      if (context.isOTPReceived) {
        this.showScreentoEnterOTP(context.isOTPReceived);
      }
      if (context.isOTPRequestFailed) {
        this.showRequestOTPError(context.isOTPRequestFailed);
      }
      if (context.showVerifyCompanyDetails) {
        this.fetchCompanyAccounts();
      }
      if (context.getBusinessAccountSuccess) {
        this.verifyCompanyDetailsBusinessAccountsUI(
          context.getBusinessAccountSuccess,
          false
        );
        resGlobal=context.getBusinessAccountSuccess;
      }
      if (context.showSecureAccessCodeScreenAfterResend) {
        this.showSecureAccessCodeScreenAfterResend(
          context.showSecureAccessCodeScreenAfterResend
        );
      }
      if (context.domainNameExists) {
        this.domainNameExistsUI();
      }
      if (context.domainNameDoesNotExist) {
        FormControllerUtility.showProgressBar(this.view);
        this.getServiceDefinition();
      }
      if (context.serviceDefinition) {
        var navimang = applicationManager.getNavigationManager();
        navimang.setCustomInfo("showAllFeatures", context.serviceDefinition);
        this.showAllFeaturesUI(context.serviceDefinition);
      }
    },

    /**
     * method to show error msg in case of already existing domain name
     */
    domainNameExistsUI: function () {
      this.setErrorMessage(
        kony.i18n.getLocalizedString("konybb.i18n.domainNameAlreadyExists")
      );
      FormControllerUtility.hideProgressBar(this.view);
    },

    /**
     * Method to display server error.
     * @param {object} context - server error context object
     */
    showServerErrorMessage: function (context) {
      if (context.show) {
        this.view.flxMainWrapper.setVisibility(true);
        this.view.lblDowntimeWarning.text =
          context.errorMessage ||
          kony.i18n.getLocalizedString(
            context.errMsgi18nKey || "i18n.common.OoopsServerError"
          );
        this.view.flxDowntimeWarning.setFocus();
      } else {
        this.view.flxMainWrapper.setVisibility(false);
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
    },

    /**
         	Navigate to next form after about you without CIF
         	*/

    showCompanyDetailsUI: function (isEditFlow) {
      var scopeObj = this;
      this.resetUI();
      this.view.flxCompanyAndBusinessContainer.setVisibility(true);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.common.Aboutcompanyandbusinesstype"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.common.companysubheader"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.common.companysubheader");
      this.displayOrganizationTypes(organizationTypes);
      FormControllerUtility.hideProgressBar(this.view);
      this.skipNav();
      if (isEditFlow === true) {
        if (this.isBackFlow === true) {
          this.view.flxDetailsHeader.isVisible = true;
          FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
            "i18n.userManagement.Continue"
          );
          this.view.formActionsNew.btnNext.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
            "a11yARIA":{
              "tabindex":0
            }
          };
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.formActionsNew.btnNext.text= kony.i18n.getLocalizedString("i18n.userManagement.Continue");
          this.view.formActionsNew.btnNext.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
            "a11yARIA":{
              "tabindex":0
            }
          };
          this.isBackFlow = false;
          isEditFlow = false;
        } else {
          this.view.formActionsNew.btnOption.setVisibility(false);
          FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
          this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
            "i18n.konybb.common.SaveAndUpdate"
          );
          this.view.formActionsNew.btnNext.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
            "a11yARIA":{
              "tabindex":0
            }
          };
          this.view.formActionsNew.btnCancel.text =
            kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.formActionsNew.btnCancel.accessibilityConfig={
              "a11yLabel":kony.i18n.getLocalizedString(
                "i18n.transfers.Cancel"
              )+" Enrollment",
              "a11yARIA":{
                "tabindex":0
              }
            };
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
          this.view.formActionsNew.btnNext.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
            "a11yARIA":{
              "tabindex":0
            }
          };
          this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
          this.view.formActionsNew.btnCancel.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString(
              "i18n.transfers.Cancel"
            )+" Enrollment",
            "a11yARIA":{
              "tabindex":0
            }
          };
          this.view.formActionsNew.btnCancel.onClick =
            scopeObj.showVerifyDetailsUI.bind(this);
        }
        this.view.tbxBusinessCompanyName.text =
          this.businessInfo["companyList"][0].companyDetails.companyName;
        this.view.lstbTypeOfOrganisation.selectedKey =
          this.businessInfo["companyList"][0].companyDetails.companyTypeId;
        this.view.lstbTypeOfOrganisation.selectedKeyValue[0] =
          this.businessInfo["companyList"][0].companyDetails.companyTypeId;
        this.view.lstbTypeOfOrganisation.selectedKeyValue[1] =
          this.businessInfo["companyList"][0].companyDetails.companyType;
        this.view.lstbYourRoleinCompany.selectedKeyValue[1] =
          this.businessInfo["companyList"][0].companyDetails.companyRole;
        this.view.tbxEmailAddress.text =
          this.businessInfo["companyList"][0].companyDetails.emailAddress;
        this.view.tbxTelephoneNumber.text =
          this.businessInfo["companyList"][0].companyDetails.telephoneNumber;
        this.view.tbxCompanyTaxId.text =
          this.businessInfo["companyList"][0].companyDetails.taxID;
        this.view.tbxfax.text =
          this.businessInfo["companyList"][0].companyDetails.faxID;
        this.view.tbxAddressLine1.text =
          this.businessInfo["companyList"][0].companyDetails.addressLine1;
        this.view.tbxAddressLine2.text =
          this.businessInfo["companyList"][0].companyDetails.addressLine2;
        this.view.tbxCountry.text =
          this.businessInfo["companyList"][0].companyDetails.country;
        this.view.tbxState.text =
          this.businessInfo["companyList"][0].companyDetails.state;
        this.view.tbxCity.text =
          this.businessInfo["companyList"][0].companyDetails.city;
        this.view.tbxZipCode.text =
          this.businessInfo["companyList"][0].companyDetails.zipCode;
        scopeObj.view.flxCity.tbxCity.info = {
          isValid: true,
          data: this.businessInfo["companyList"][0].companyDetails.city,
        };
        scopeObj.view.flxCountry.tbxCountry.info = {
          isValid: true,
          data: this.businessInfo["companyList"][0].companyDetails.country,
        };
        scopeObj.view.flxState.tbxState.info = {
          isValid: true,
          data: this.businessInfo["companyList"][0].companyDetails.state,
        };
      } else {
        scopeObj.view.flxCity.tbxCity.info = {
          isValid: false,
          data: "",
        };
        scopeObj.view.flxCountry.tbxCountry.info = {
          isValid: false,
          data: "",
        };
        scopeObj.view.flxState.tbxState.info = {
          isValid: false,
          data: "",
        };
      }
      this.validationUtilManager =
        applicationManager.getValidationUtilManager();
      this.view.formActionsNew.btnNext.onClick = function () {
        if (isEditFlow === false || isFrombackflow === true) {
          scopeObj.onCompanyDetailsBtnContinueClickWithoutCIF();
          isFrombackflow = false;
        } else {
          scopeObj.onCompanyDetailsBtnContinueClickEditFlowWithoutCIF();
        }
      };
      this.view.formActionsNew.btnCancel.onClick = function () {
        if (isEditFlow === true) {
          scopeObj.showVerifyDetailsUI();
        } else {
          if (
            !kony.sdk.isNullOrUndefined(
              scopeObj.view.TabBodyNew.segTemplates.data
            ) &&
            scopeObj.view.TabBodyNew.segTemplates.data[0][1].length > 0
          ) {
            scopeObj.showBackPopUpWithoutCIF();
          } else {
            scopeObj.saveCompanyDetails();
            scopeObj.isEditPersonalDtls = true;
            scopeObj.isEditFlow = true;
            scopeObj.isBackFlow = true;
            isFrombackflow = true;
            scopeObj.showAccountCentricUI();
            scopeObj.adjustScreen(30);
          }
        }
      };
      /* binding call backs to user input fields of About You Screen */
      this.view.tbxBusinessCompanyName.onKeyUp =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      this.view.tbxEmailAddress.onKeyUp =
        this.onCompanyEmailChangedWithOutCIF.bind(this);
      this.view.tbxTelephoneNumber.onKeyUp =
        this.onEnteringCompanyPhoneNumberWithOutCIF.bind(this);
      this.view.tbxCompanyTaxId.onKeyUp =
        this.onEnteringTaxIdWithOutCIF.bind(this);
      this.view.tbxAddressLine1.onKeyUp =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      this.view.tbxAddressLine2.onKeyUp =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      this.view.tbxfax.onKeyUp =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      this.view.tbxZipCode.onKeyUp =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      scopeObj.view.flxTypeOfOrganisation.lstbTypeOfOrganisation.onSelection =
        function () {
          scopeObj.resetErrorMessage();
          FormControllerUtility.showProgressBar(scopeObj.view);
          var organization = scopeObj.view.lstbTypeOfOrganisation.selectedKey;
          scopeObj.getBusinessTypeRoles(organization);
          scopeObj.view.lstbYourRoleinCompany.selectedKey = "-1";
          scopeObj.view.lstbYourRoleinCompany.selectedKeyValue[1] =
            kony.i18n.getLocalizedString("i18n.common.selecthere");
          scopeObj.updateCompanyDetailsProceedStateWithOutCIF();
        };

      this.view.lstbYourRoleinCompany.onSelection =
        this.updateCompanyDetailsProceedStateWithOutCIF.bind(this);
      this.view.flxCountry.tbxCountry.onKeyUp = this.onCountryChange.bind(this);
      this.view.flxState.tbxState.onKeyUp = this.onStateChange.bind(this);
      this.view.flxCity.tbxCity.onKeyUp = this.onCityChange.bind(this);
      this.view.flxCountry.segSearchCountry.onRowClick = function () {
        scopeObj.assigningText(
          scopeObj.view.flxCountry.segSearchCountry,
          scopeObj.view.flxCountry.tbxCountry
        );
        scopeObj.clearValidation(
          scopeObj.view.flxCountry.tbxCountry,
          scopeObj.view.flxNoResultsFound,
          1
        );
        scopeObj.view.flxState.setVisibility(true);
        scopeObj.view.flxCity.setVisibility(true);
        scopeObj.view.segSearchCountry.setVisibility(false);
        scopeObj.updateCompanyDetailsProceedStateWithOutCIF();
      };
      this.view.flxState.segSearchState.onRowClick = function () {
        scopeObj.assigningText(
          scopeObj.view.flxState.segSearchState,
          scopeObj.view.flxState.tbxState
        );
        scopeObj.clearValidation(
          scopeObj.view.flxState.tbxState,
          scopeObj.view.flxNoResultsFound,
          1
        );
        scopeObj.view.flxCity.setVisibility(true);
        scopeObj.view.segSearchState.setVisibility(false);
        scopeObj.updateCompanyDetailsProceedStateWithOutCIF();
      };
      this.view.flxCity.segSearchCity.onRowClick = function () {
        scopeObj.assigningText(
          scopeObj.view.flxCity.segSearchCity,
          scopeObj.view.flxCity.tbxCity
        );
        scopeObj.clearValidation(
          scopeObj.view.flxCity.tbxCity,
          scopeObj.view.flxNoResultsFound,
          1
        );
        scopeObj.view.segSearchCity.setVisibility(false);
        scopeObj.updateCompanyDetailsProceedStateWithOutCIF();
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
    },

    /**
         	On Breakpont change function
         	*/
    onBreakpointChange: function (width) {
      kony.print("on breakpoint change");
      var scope = this;
      this.view.CustomPopup.onBreakpointChangeComponent(
        scope.view.CustomPopup,
        width
      );
      this.view.PopupHeaderUM.onBreakpointChangeComponent(
        scope.view.PopupHeaderUM,
        width
      );
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      var responsiveFonts = new ResponsiveFonts();
      this.view.customheader.onBreakpointChangeComponent(width);

      if (width <= 640 || orientationHandler.isMobile) {
        //for Mobile
      } else if (width <= 1024) {
        //for tablet
      } else if (width <= 1366) {
        //for desktop
      } else {
        //for hd desktop
      }
      this.adjustScreen(30);
    },

    /**
     * Method to display the footer at the end of the screen by calculating the size of screen dynamically
     * @param {integer} data value
     */
    adjustScreen: function(data) {
      this.view.forceLayout();
      this.view.flxFooter.isVisible = true;
      var mainheight = 0;
      var flxMainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      flxMainheight = this.view.flxMain.info.frame.height;
      mainheight = this.view.flxHeader.info.frame.height + flxMainheight;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0) this.view.flxFooter.top = flxMainheight + diff - data + "dp";
        else this.view.flxFooter.top = flxMainheight - data + "dp";
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = flxMainheight + "dp";
        this.view.flxCancelPopup.height = "100%";
        this.view.forceLayout();
      }
    },

    initCommonButtonActions: function () {
      this.view.flxActionsSeparator.setVisibility(true);
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnOption.setVisibility(true);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.BACK"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.setVisibility(true);
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.userManagement.Continue"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnOption.text= kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.setVisibility(true);
      this.adjustScreen(30);
    },

    /**
     * @function : function that clears input fields in frmEnrollBusiness
     *
     */
    clearInputFields: function () {
      this.view.tbxFirstNameWithCIF.text = "";
      this.view.tbxLastNameWithCIF.text = "";
      this.view.tbxSSNWithCIF.text = "";
      this.view.CustomDateWithCIF.setText("");
      this.view.tbxCIFNumber.text = "";
      this.view.tbxCompanyName.text = "";
      this.view.tbxTaxId.text = "";
      this.clearCompanyDetailsFieldsWithoutCIF();
      this.view.CustomDateWithCIF.clear();
      this.isValidPersonalDetails = false;
      this.view.flxCustomDateWithCIF.skin = "skne3e3e3br3pxradius";
      this.view.tbxSSNWithCIF.skin = ViewConstants.SKINS.BUSINESS_ENROLL_DEF;
    },

    /**
     * initActions : onInit event Function for the form, assigns actions to the widgets
     */
    initActions: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, [
        "flxHeader",
        "flxMain",
        "flxFooter",
        "flxFormContent",
      ]);
      var scopeObj = this;
      this.validationUtilManager =
        applicationManager.getValidationUtilManager();
      this.view.CustomDateWithCIF.setDateFormat(
        applicationManager.getFormatUtilManager().getDateFormat()
      );
      this.view.customDateWithOutCIF.setDateFormat(
        applicationManager.getFormatUtilManager().getDateFormat()
      );
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnOption.onClick = function () {
        scopeObj.showCancelPopUp();
      };
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.BACK"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.onClick = function () {
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance()
          .getModuleManager()
          .getModule("EnrollModule");
        enrollModule.presentationController.showEnrollPage();
      };
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.userManagement.Continue"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnOption.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.adjustScreen(30);
    },

    /**
     * preShow :  preShow event Function for the form
     */
    preShow: function () {
      //Global Variables
      this.isCustomerCentric = true;
      this.isSubmitted = false;
      this.organizationTypes = [];
      this.isEditPersonalDtls = false;
      this.accountMasterKey = "";
      this.accountServiceKey = "";
      this.accountSortType = "";

      this.isEditFlow = false;
      this.isBackFlow = false;
      this.isSelectService = false;

      this.isEditAccountDetails = false;
      this.isDomainDetailsEditFlow = false;

      var isFrombackflow = false;
      this.masterServiceKey = "";
      /**Static Data as expected by verify details page**/
      this.businessInfo = {};
      this.businessInfo["companyList"] = []; //Array of companyInfo Json's  (For account centric we will have only one company)
      this.businessInfo["domainDetails"] = [];
      this.companyInfo = {};
      this.availableFeatures = null;
      this.defaultFeatures = null;

      /***************/
      var scopeObj = this;
      if(applicationManager.getStorageManager().getStoredItem("langObj").language === "Arabic")
      {
        scopeObj.view.flxFirstNameWithCIF.left="75%";
        scopeObj.view.flxFirstNameWithCIF.right="2.1%";
        scopeObj.view.flxLastNameWithCIF.left="48.9%";
        scopeObj.view.flxLastNameWithCIF.right="28.1%";
        scopeObj.view.lblMethod1Header.text = kony.i18n.getLocalizedString("i18n.userManagement.method01");
        scopeObj.view.lblMethod2Header.text = kony.i18n.getLocalizedString("i18n.userManagement.method02");
        scopeObj.view.OTPPostLogin.tbxEnterOTPCode.left = "0px";
        scopeObj.view.OTPPostLogin.tbxEnterOTPCode.right = "0px";
        scopeObj.view.customfooter.lblCopyright.width = "-100%";
        scopeObj.view.flxLogout.left="100%";
      
      }
      this.view.customheader.headermenu.setVisibility(false);
	  var userPrefManager = applicationManager.getUserPreferencesManager();
	  if (userPrefManager.isLoggedIn !== true) {
		  this.view.customheader.showPreLoginView();
	  } else {
		  this.view.customheader.showPostLoginView();
	  }
      this.view.CustomDateWithCIF.setDateFormat(
        applicationManager.getFormatUtilManager().getDateFormat()
      );
      this.view.formActionsNew.btnNext.width = "14.14%";
      this.view.formActionsNew.btnNext.right = "2%";
      this.view.lstbYourRoleInTheDomain.masterData = [];
      if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true"
      )
        this.showAccountCentricUI();
      else this.showCustomerCentricUI();
      this.adjustScreen(30);
      this.availableSegData = [];
      this.view.imgOr.setVisibility(false);
      this.view.lblOr.skin="sknOr";
      this.view.lblOr.text="or";
      this.view.lblOr.top="3px";
      this.view.lblOr.left="7px";
      this.view.flxOr.setVisibility(true);
      this.view.flxOr.skin="sknFlxOr";
      this.view.flxOr.width="30dp";
      this.view.flxOr.height="30dp";
      this.view.flxOr.top="195dp";
      this.view.flxOr.left="-14dp";
      this.view.lblOr.text = kony.i18n.getLocalizedString("i18n.enrollNow.or");
    },

    /**
     * postShow :  postShow event Function for the form
     */
    postShow: function () {
      var form = kony.application.getCurrentForm();
      form.title = "Enroll Business";
      this.accessibilityFocusSetup();
      this.view.customheader.headermenu.flxMessages.right = "210dp";
      this.adjustScreen(30);
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.PopupHeaderUM.doLayout = CommonUtilities.centerPopupFlex;
      this.view.PopupHeaderUM.onKeyPress = this.onKeyPressCallBack;
      this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.flxTC.onKeyPress = this.onKeyPressCallBack;
      this.view.customheader.btnSkip.onClick = this.skipNav;
      this.view.flxLogout.isVisible=false;
      this.view.btnAddNewCompany.accessibilityConfig={
                "a11yLabel":"Add New Company",
                "a11yARIA":{
                    "role":"button"
                }
            }
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
    this.view.flxFormContent.accessibilityConfig={
      "a11yARIA":{
        "tabindex":-1
      }
    }
    this.view.PopupHeaderUM.lblPopupMessage.width="90%";
    this.view.CustomDateWithCIF.tbxDateInputKA.placeholder = "MM/DD/YYYY";
    this.view.tbxCompanyName.placeholder="Enter Registered Company Name";
    this.view.tbxTaxId.placeholder="Enter Tax Identification Number";
            this.view.CustomDateWithCIF.tbxDateInputKA.accessibilityConfig = {
                "a11yLabel": "Date of Birth",
                "a11yARIA": {
                    "tabindex": 0
                }
            }
            this.view.OTPPostLogin.btnResendCode.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0
                }
            }
            this.view.OTPPostLogin.imgViewOTPCode.src = "hide_password.png";
            this.view.OTPPostLogin.imgViewOTPCode.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.CustomDateWithCIF.flxDateInputKA.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.CustomDateWithCIF.lblEnteredDateKA.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.CustomDateWithCIF.lblDatePlaceholderKA.accessibilityConfig={
                "a11yHidden":true,
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.PopupHeaderUM.flxCross.accessibilityConfig = {
                "a11yLabel": "Close this Popup",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            this.view.btnEditDomainDetails.accessibilityConfig = {
                "a11yLabel": "Edit Contract Details",
                "a11yARIA": {
                    "tabindex": 0
                }
            }
    },
    skipNav: function(){
      var scope= this;
      scope.view.lblContentHeader.setActive(true);
  },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
        if (this.view.flxLogout.isVisible === true) {
            this.view.flxLogout.isVisible = false;
            this.view.customheader.headermenu.btnLogout.setFocus(true);
        }
        if(this.view.flxCancelPopup.isVisible === true){
          this.view.flxCancelPopup.isVisible = false;
          if (btnFlag != "") {
            btnFlag.setActive(true);
            btnFlag = "";
          }
        }
        if(this.view.flxTermsAndConditions.isVisible===true) {
          this.view.flxTermsAndConditions.isVisible = false;
          this.view.btnTermsAndConditions.setActive(true);
        }
    }
    },

    /**
     * Set foucs handlers for skin of parent flex on input focus
     */
    accessibilityFocusSetup: function () {
      let widgets = [
        [this.view.tbAccHolderName, this.view.flxAccHolderName],
        [this.view.tbAccNumber, this.view.flxAccNumber],
        [this.view.tbxAddressLine1, this.view.flxAddressLine1],
        [this.view.tbxAddressLine2, this.view.flxAddressLine2],
        [this.view.tbxBusinessCompanyName, this.view.flxBusinessCompanyName],
        [this.view.tbxCIFNumber, this.view.flxCIFNumber],
        [this.view.tbxCity, this.view.flxCity],
        [this.view.tbxCompanyName, this.view.flxCompanyName],
        [this.view.tbxCompanyTaxId, this.view.flxCompanyTaxId],
        [this.view.tbxCountry, this.view.flxCountry],
        [this.view.tbxDomainName, this.view.flxDomainName],
        [this.view.tbxEmailAddress, this.view.flxEmailAddress],
        [this.view.tbxEmailWithOutCIF, this.view.flxEmailWithOutCIF],
        [this.view.tbxfax, this.view.flxfax],
        [this.view.tbxFirstNameWithCIF, this.view.flxFirstNameWithCIF],
        [this.view.tbxLastNameWithCIF, this.view.flxLastNameWithCIF],
        [this.view.tbxLastNameWithOutCIF, this.view.flxLastNameWithOutCIF],
        [this.view.tbxMiddleNameWithOutCIF, this.view.flxMiddleNameWithOutCIF],
        [this.view.tbxNameWithOutCIF, this.view.flxNameWithOutCIF],
        [this.view.tbxPhoneNumWithOutCIF, this.view.flxPhoneNumWithOutCIF],
        [this.view.tbxSSNWithCIF, this.view.flxSSNWithCIF],
        [this.view.tbxSSNWithOutCIF, this.view.flxSSNWithOutCIF],
        [this.view.tbxState, this.view.flxState],
        [this.view.tbxTaxId, this.view.flxTaxId],
        [this.view.tbxTelephoneNumber, this.view.flxTelephoneNumber],
        [this.view.tbxZipCode, this.view.flxZipCode],
      ];
      for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(
          widgets[i][0],
          widgets[i][1],
          this
        );
      }
    this.view.PopupHeaderUM.flxCross.accessibilityConfig = {
        a11yARIA: {
            "role":"button",
            "aria-label": "Close the popup"
        },
    }
    this.view.PopupHeaderUM.btnYes.accessibilityConfig = {
        a11yARIA: {
            "role":"button",
            "aria-label": "Yes,Cancel"
        },
    }
    this.view.PopupHeaderUM.btnNo.accessibilityConfig = {
        a11yARIA: {
            "role":"button",
            "aria-label": "No,don't cancel"
        },
    }
    },

    /**
     * resetUI : function that hides all the UI flexes in frmEnrollBusiness
     */
    resetUI: function () {
      this.view.flxEnrollmentMethod.isVisible = false;
      this.view.flxPersonalDetailsWithCIF.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxVerifyDetials.isVisible = false;
      this.view.flxFeatureContainer.isVisible = false;
      this.view.flxVerifyCompanyDetails.isVisible = false;
      this.view.flxVerifyBusinessAccounts.isVisible = false;
      this.view.flxSuccessMsg.isVisible = false;
      this.view.flxCompanyAndBusinessContainer.isVisible = false;
      this.view.flxBusinessAccounts.isVisible = false;
      this.view.flxAboutYouContainer.isVisible = false;
      this.view.flxOTP.isVisible = false;
      this.view.flxDomainDetailsContainer.isVisible = false;
      this.view.btnAddNewCompany.isVisible = false;
      if (this.isValidPersonalDetails) {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
      this.adjustScreen(30);
    },

    /**
     * showCustomerCentricUI : function that sets UI for non customer centric type of enrollment
     */
    showCustomerCentricUI: function () {
      this.resetUI();
      this.resetErrorMessage();
      var scopeObj = this;
      this.isCustomerCentric = true;
      this.view.flxPersonalDetailsWithCIF.setVisibility(true);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.common.AboutYou"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.Enroll.provideBelowInformation"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.Enroll.provideBelowInformation");
      this.view.tbxFirstNameWithCIF.onKeyUp =
        this.enableDisableProceedOnValidUserDetails.bind(this);
      this.view.tbxLastNameWithCIF.onKeyUp =
        this.enableDisableProceedOnValidUserDetails.bind(this);
      this.view.tbxSSNWithCIF.onKeyUp = this.onEnteringSSNWithCIF.bind(this);
      this.view.CustomDateWithCIF.textChangeCallback =
        this.onEnteringDOBWithCIF.bind(this);
      this.view.formActionsNew.btnOption.onClick = function () {
        scopeObj.showCancelPopUp();
        scopeObj.view.PopupHeaderUM.btnYes.accessibilityConfig={
          "a11yLabel":"Yes, cancel the enrollment process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        scopeObj.view.PopupHeaderUM.btnNo.accessibilityConfig={
          "a11yLabel":"No, don't cancel the enrollment process",
          "a11yARIA":{
            "tabindex":0
          }
        },
         btnFlag=scopeObj.view.formActionsNew.btnOption;
      };
      this.view.formActionsNew.btnCancel.onClick = function () {
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance()
          .getModuleManager()
          .getModule("EnrollModule");
        enrollModule.presentationController.showEnrollPage();
        scopeObj.clearInputFields.call(this);
      };
      this.view.formActionsNew.btnNext.onClick =
        this.enrollmentMethodinit.bind(this); // Navigate to next form
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    showAccountCentricUI: function () {
      this.resetUI();
      this.clearPersonalFieldsData();
      this.isCustomerCentric = false;
      this.view.flxAboutYouContainer.setVisibility(true);
      this.view.customheader.topmenu.lblAccounts.text =
        kony.i18n.getLocalizedString("i18n.common.BusinessEnrollementHeader");
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.common.AboutYouHeader"
      );
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.common.AboutYou"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.common.AboutYouHeader");
      this.view.customheader.topmenu.lblAccounts.text=kony.i18n.getLocalizedString("i18n.common.BusinessEnrollementHeader");

      this.validationUtilManager =
        applicationManager.getValidationUtilManager();
      this.view.formActionsNew.btnNext.onClick =
        this.onPersonalDetailsBtnContinueClickWithoutCIF.bind(this, false);
      this.view.tbxNameWithOutCIF.onKeyUp =
        this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.tbxLastNameWithOutCIF.onKeyUp =
        this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.tbxPhoneNumWithOutCIF.onKeyUp =
        this.onEnteringPhoneNumberWithoutCIF.bind(this);
      this.view.tbxEmailWithOutCIF.onKeyUp =
        this.onEnteringEmailWithoutCIF.bind(this);
      this.view.tbxSSNWithOutCIF.onKeyUp =
        this.onEnteringSSNWithoutCIF.bind(this);
      this.view.customDateWithOutCIF.textChangeCallback =
        this.onEnteringDOBWithoutCIF.bind(this);
      this.view.tbxMiddleNameWithOutCIF.onKeyUp =
        this.enableDisabledProceedOnValidPersonalDetails.bind(this);
      this.view.formActionsNew.btnCancel.onClick = function () {
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance()
          .getModuleManager()
          .getModule("EnrollModule");
        enrollModule.presentationController.showEnrollPage();
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    /**
     * @funtion to validate all the user input details
     * Enables btnNext for all valid details, disables btnNext otherwise.
     */
    enableDisableProceedOnValidUserDetails: function () {
      if (
        CommonUtilities.isEmptyString(this.view.tbxFirstNameWithCIF.text) ||
        CommonUtilities.isEmptyString(this.view.tbxLastNameWithCIF.text) ||
        CommonUtilities.isEmptyString(this.view.CustomDateWithCIF.getText()) ||
        !this.validationUtilManager.isValidSSNNumber(
          this.view.tbxSSNWithCIF.text
        ) ||
        !this.validationUtilManager.isAgeValid(
          this.view.CustomDateWithCIF.getText()
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.isValidPersonalDetails = false;
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        this.isValidPersonalDetails = true;
        this.setUserDetails();
      }
    },

    /**
     * @function - set data for UserDetails global object
     *
     */
    setUserDetails: function () {
      var navManager = applicationManager.getNavigationManager();
      var enrolbusines = navManager.getCustomInfo("enrollPersonal");
      this.businessInfo["userDetails"] = {
        fullName:
          this.view.tbxFirstNameWithCIF.text +
          " " +
          this.view.tbxLastNameWithCIF.text,
        DOB: CommonUtilities.getBackendDateFormat(
          this.view.CustomDateWithCIF.getText(),
          applicationManager
            .getFormatUtilManager()
            .getDateFormat()
            .toLocaleLowerCase()
        ),
        SSN: this.view.tbxSSNWithCIF.text,
        firstName: this.view.tbxFirstNameWithCIF.text,
        lastName: this.view.tbxLastNameWithCIF.text,
        legalEntityId: enrolbusines
      };
    },

    /**
     * Validate on Change of SSNWithCIF Number
     *
     */
    onEnteringSSNWithCIF: function () {
      if (
        !this.validationUtilManager.isValidSSNNumber(
          this.view.tbxSSNWithCIF.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        if (!CommonUtilities.isEmptyString(this.view.tbxSSNWithCIF.text)) {
          this.view.tbxSSNWithCIF.skin =
            ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
          this.setErrorMessage(
            kony.i18n.getLocalizedString("i18n.login.incorrectSSN")
          );
        } else {
          this.view.tbxSSNWithCIF.skin = ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
          this.resetErrorMessage();
        }
      } else {
        this.view.tbxSSNWithCIF.skin = ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.resetErrorMessage();
        this.enableDisableProceedOnValidUserDetails();
      }
    },

    /**
     * Validates DOB
     *
     */
    onEnteringDOBWithCIF: function () {
      var dateObj = this.view.CustomDateWithCIF.getDateObject();
     var text = this.view.CustomDateWithCIF.getText();
      if (
        CommonUtilities.isEmptyString(this.view.CustomDateWithCIF.getText()) ||
        !this.validationUtilManager.isAgeValid(
          this.view.CustomDateWithCIF.getText()
        ) ||
        dateObj.status > 0
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        if(text.length ==10  ){
        this.view.flxCustomDateWithCIF.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        var locale = kony.i18n.getCurrentLocale();
        if( locale === 'ar_AE'){
                this.setErrorMessage(
                kony.i18n.getLocalizedString(
               "i18n.userManagement.InvalidDOB"
              )
              );
             }else {
               this.setErrorMessage(
                kony.i18n.getLocalizedString(
                "i18n.konybb.createUser.error.InvalidDOB"
               )
               );
            }
        }
        else {
            this.view.flxCustomDateWithCIF.skin = "skne3e3e3br3pxradius"; //Default skin
            this.resetErrorMessage();
        }
      } else {
        this.view.flxCustomDateWithCIF.skin = "skne3e3e3br3pxradius"; //Default skin
        this.resetErrorMessage();
        this.enableDisableProceedOnValidUserDetails();
      }
    },

    enrollMethod1ProceedState: function () {
      if (CommonUtilities.isEmptyString(this.view.tbxCIFNumber.text)) {
        return false;
      }
      return true;
    },

    enrollMethod2ProceedState: function () {
      if (CommonUtilities.isEmptyString(this.view.tbxCompanyName.text)) {
        return false;
      } else if (CommonUtilities.isEmptyString(this.view.tbxTaxId.text)) {
        return false;
      }
      return true;
    },

    validateFormFields: function () {
      if (this.enrollMethod1ProceedState() === true) {
        this.businessInfo["userDetails"]["CIF"] = this.view.tbxCIFNumber.text;
        this.businessInfo["userDetails"]["method"] = 1;
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      } else if (this.enrollMethod2ProceedState() === true) {
        this.businessInfo["userDetails"]["companyName"] =
          this.view.tbxCompanyName.text;
        this.businessInfo["userDetails"]["taxId"] = this.view.tbxTaxId.text;
        this.businessInfo["userDetails"]["method"] = 2;
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
    },

    enrollmentMethodinit: function () {
      var scopeObj = this;
      scopeObj.resetUI();
      scopeObj.initCommonButtonActions();
      if (
        !CommonUtilities.isEmptyString(this.view.tbxCIFNumber.text) ||
        (!CommonUtilities.isEmptyString(this.view.tbxCompanyName.text) &&
          !CommonUtilities.isEmptyString(this.view.tbxTaxId.text))
      )
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      else
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.Auth.ProvideCompanyDetails"
      );
      scopeObj.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.Auth.VerifyByOneMethod"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      scopeObj.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.konybb.Auth.VerifyByOneMethod");
      scopeObj.view.flxEnrollmentMethod.setVisibility(true);
      scopeObj.view.tbxCIFNumber.onKeyUp = this.validateFormFields.bind(this);
      scopeObj.view.tbxCompanyName.onKeyUp = this.validateFormFields.bind(this);
      scopeObj.view.tbxTaxId.onKeyUp = this.validateFormFields.bind(this);
      scopeObj.view.formActionsNew.btnOption.onClick = function () {
        scopeObj.showCancelPopUp();
        scopeObj.view.PopupHeaderUM.btnYes.accessibilityConfig={
          "a11yLabel":"Yes, cancel the enrollment process",
          "a11yARIA":{
            "tabindex":0
          }
        },
        scopeObj.view.PopupHeaderUM.btnNo.accessibilityConfig={
          "a11yLabel":"No, don't cancel the enrollment process.",
          "a11yARIA":{
            "tabindex":0
          }
        },
        btnFlag=scopeObj.view.formActionsNew.btnOption;
      };
      scopeObj.view.formActionsNew.btnCancel.onClick = function () {
        scopeObj.resetErrorMessage();
        if (scopeObj.businessInfo["companyList"].length === 0)
          scopeObj.showCustomerCentricUI();
        else scopeObj.verifyCompanyDetailsBusinessAccountsUI("", true);
      };
      scopeObj.view.formActionsNew.btnNext.onClick = function () {
        scopeObj
          .loadEnrollModule()
          .presentationController.checkExistingCompany(
            scopeObj.businessInfo["userDetails"]
          );
      };
      scopeObj.validateFormFields();
      FormControllerUtility.hideProgressBar(this.view);
      scopeObj.adjustScreen(30);
      scopeObj.skipNav();
    },

    addAnotherCompany: function () {
      var scopeObj = this;
      scopeObj.enrollmentMethodinit(this);
      scopeObj.view.tbxCIFNumber.text = "";
      scopeObj.view.tbxCompanyName.text = "";
      scopeObj.view.tbxTaxId.text = "";
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      scopeObj.view.formActionsNew.btnCancel.onClick = function () {
        scopeObj.resetErrorMessage();
        if (scopeObj.isSelectService === true) {
          scopeObj.showAllFeaturesUI(this);
          scopeObj.isSelectService = false;
        } else scopeObj.verifyCompanyDetailsBusinessAccountsUI("", true);
      };
      scopeObj.view.formActionsNew.btnNext.onClick = function () {
        scopeObj
          .loadEnrollModule()
          .presentationController.checkExistingCompany(
            scopeObj.businessInfo["userDetails"]
          );
      };
      scopeObj.adjustScreen(30);
    },

    fetchCompanyAccounts: function () {
      var scopeObj = this;
      var accountDetails;
      if (this.businessInfo.companyList["length"] === 0) {
        accountDetails = {
          serviceKey:
            this.companyInfo["companyDetails"]["serviceKey"]["MFAAttributes"][
              "serviceKey"
            ],
        };
      } else {
        accountDetails = {
          masterServiceKey:
            this.businessInfo.companyList[0]["companyDetails"]["serviceKey"][
              "MFAAttributes"
            ]["serviceKey"],
          serviceKey:
            this.companyInfo["companyDetails"]["serviceKey"]["MFAAttributes"][
              "serviceKey"
            ],
        };
      }
      scopeObj
        .loadEnrollModule()
        .presentationController.getBusinessAccount(accountDetails);
    },

    verifyCompanyDetailsBusinessAccountsUI: function (data, isEditFlow) {
      var scopeObj = this;
      var res = [];
      var sec = [];
      var index;
      var flagSortAccName = true;
      var flagSortAccNumber = true;
      var flagSortAccType = true;
      var isBackFlow = false;
      
      var defaultValues = {
        flxSelectClickable: {
          onClick: scopeObj.rowCheckBoxOnClick,
          accessibilityConfig: {  
            //"a11yLabel" : "Select Account Name",                    
            "a11yARIA": {
                "tabindex": 0,
                "role": "checkbox",
                "aria-labelledby":"lblAccountNameValue",
                "aria-checked": false
            }                 
        }  
        },
        lblRowSeparator: {
          text: "-",
          isVisible: true,
          accessibilityConfig:{
            "a11yHidden":true,
            "a11yARIA": {
                "tabindex": -1
            }                 
        }
        },
      };
      scopeObj.resetUI();
      scopeObj.initCommonButtonActions();
      if (isEditFlow && kony.sdk.isEmptyObject(data)) {
        isBackFlow = true;
        data = scopeObj.businessInfo["companyList"].length - 1;
      } else isBackFlow = false;
      if (isEditFlow) {
        index = data;
        scopeObj.view.flxDetailsHeader.isVisible = true;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        res = scopeObj.businessInfo["companyList"][index]["accountDetails"][1];
        sec = scopeObj.businessInfo["companyList"][index]["accountDetails"];
        res.forEach(function (element, i) {
          if (res[i]["lblSelectAllValue"].text === "C") totalAccountSelected++;
        });
        if (isBackFlow === false) {
          scopeObj.view.formActionsNew.btnOption.setVisibility(false);
          scopeObj.view.formActionsNew.btnNext.text =
            kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            scopeObj.view.formActionsNew.btnNext.accessibilityConfig={
              "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
              "a11yARIA":{
                "tabindex":0
              }
            };
          scopeObj.view.formActionsNew.btnCancel.text =
            kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            scopeObj.view.formActionsNew.btnCancel.accessibilityConfig={
              "a11yLabel":kony.i18n.getLocalizedString(
                "i18n.transfers.Cancel"
              )+" Enrollment",
              "a11yARIA":{
                "tabindex":0
              }
            };
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
          this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
          this.view.formActionsNew.btnNext.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
            "a11yARIA":{
              "tabindex":0
            }
          };
          this.view.formActionsNew.btnCancel.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString(
              "i18n.transfers.Cancel"
            )+" Enrollment",
            "a11yARIA":{
              "tabindex":0
            }
          };
          scopeObj.view.formActionsNew.btnCancel.onClick =
            this.showVerifyDetailsUI.bind(this);
          scopeObj.view.formActionsNew.btnNext.onClick = function () {
            scopeObj.businessInfo.companyList[index]["accountDetails"] =
              scopeObj.view.TabBodyAccountsDetails.getData()[0];
            scopeObj.saveCompanyDetailsWithCIF(
              scopeObj.view.lblDetailsCIFNumberValue.text,
              scopeObj.view.TabBodyAccountsDetails.segTemplates.data[0][1]
            );
            scopeObj.showVerifyDetailsUI();
          };
        } else {
          scopeObj.view.formActionsNew.btnCancel.text =
            kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            scopeObj.view.formActionsNew.btnCancel.accessibilityConfig={
              "a11yLabel":kony.i18n.getLocalizedString(
                "i18n.ProfileManagement.BACK"
              )+" to previous step",
              "a11yARIA":{
                "tabindex":0
              }
            };
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
          this.view.formActionsNew.btnCancel.accessibilityConfig={
            "a11yLabel":kony.i18n.getLocalizedString(
              "i18n.ProfileManagement.BACK"
            )+" to previous step",
            "a11yARIA":{
              "tabindex":0
            }
          };
          if (totalAccountSelected > 0)
            FormControllerUtility.enableButton(
              this.view.formActionsNew.btnNext
            );
          else
            FormControllerUtility.disableButton(
              this.view.formActionsNew.btnNext
            );
          scopeObj.view.formActionsNew.btnCancel.onClick = function () {
            scopeObj.showPopUp(
              kony.i18n.getLocalizedString("i18n.common.RemoveAccountsMsg"),
              scopeObj.navigateBackToMethodEnrollment.bind(this)
            );
          };
          scopeObj.view.formActionsNew.btnNext.onClick = function () {
            scopeObj.businessInfo.companyList[index]["accountDetails"] =
              scopeObj.view.TabBodyAccountsDetails.getData()[0];
            scopeObj.addCompanyPopUp();
          };
        }
        scopeObj.view.lblDetailsCompanyNameValue.text =
          scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "companyName"
          ];
        scopeObj.view.lblDetailsTaxIdValue.text =
          scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "taxId"
          ]===""?"None":scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "taxId"
          ];
        scopeObj.view.lblDetailsCIFNumberValue.text =
          scopeObj.businessInfo["companyList"][index]["companyDetails"]["CIF"];
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        scopeObj.view.lblDetailsCompanyNameValue.text=scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "companyName"
          ];
       scopeObj.view.lblDetailsTaxIdValue.text=scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "taxId"
          ]===""?"None":scopeObj.businessInfo["companyList"][index]["companyDetails"][
            "taxId"
          ];
      scopeObj.view.lblDetailsCIFNumberValue.text=scopeObj.businessInfo["companyList"][index]["companyDetails"]["CIF"];
      } else {
        sec.push({
                    flxAccountName:{
                      accessibilityConfig:{
                        "a11yLabel":"Account Name Coloumn, No sort applied, click to sort in ascending order",
                        "a11yARIA":{
                          "role":"button",
                          "tabindex":0
                        }
                      },
                      onClick: function (eventobject, context) {
                        if (flagSortAccName)
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountNameValue",
                            "ObjectText",
                            "Asc"
                          );
                        else
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountNameValue",
                            "ObjectText",
                            "Desc"
                          );
                        flagSortAccName = !flagSortAccName;
                      }.bind(this),
                    },
                    lblAccountName: {
                      text: kony.i18n.getLocalizedString("i18n.transfers.accountName"),
                      accessibilityconfig: {
                        a11yARIA:{
                          "tabindex":-1
                        }
                      },
                    },
                    imgAccountName: {
                      isVisible: true,
                      src:"sorting.png",
                      accessibilityConfig:{
                        "a11yHidden":true,
                        "a11yARIA":{
                          "tabindex":-1
                        }
                      }
                    },
                    flxAccountNumber:{
                      accessibilityConfig:{
                        "a11yLabel":"Account Number Coloumn, No sort applied, click to sort in ascending order",
                        "a11yARIA":{
                          "role":"button",
                          "tabindex":0
                        }
                      },
                      onClick: function (eventobject, context) {
                        if (flagSortAccNumber)
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountNumberValue",
                            "ObjectNumber",
                            "Asc"
                          );
                        else
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountNumberValue",
                            "ObjectNumber",
                            "Desc"
                          );
                        flagSortAccNumber = !flagSortAccNumber;
                      }.bind(this),
                    },
                    lblAccountNumber: {
                      text: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                      accessibilityconfig: {
                        a11ARIA:{
                          "tabindex":-1
                        }
                      }
                    },
                    imgAccountNumber: {
                      isVisible: true,
                      src:"sorting.png",
                      accessibilityConfig:{
                        "a11yHidden":true,
                        "a11yARIA":{
                          "tabindex":-1
                        }
                      }
                    },
                    flxAccountType:{
                      accessibilityConfig:{
                        "a11yLabel":"Account type Coloumn, No sort applied, click to sort in ascending order",
                        "a11yARIA":{
                          "role":"button",
                          "tabindex":0
                        }
                      },
                      onClick: function (eventobject, context) {
                        if (flagSortAccType)
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountTypeValue",
                            "ObjectText",
                            "Asc"
                          );
                        else
                          scopeObj.view.TabBodyAccountsDetails.sortData(
                            context.sectionIndex,
                            "",
                            "",
                            "lblAccountTypeValue",
                            "ObjectText",
                            "Desc"
                          );
                        flagSortAccType = !flagSortAccType;
                      }.bind(this),
                    },
                    lblAccountType: {
                      text: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
                      accessibilityconfig: {
                        a11yARIA:{
                          "tabindex":-1
                        }
                      }
                    },
                    imgAccountType: {
                      isVisible: true,
                      src:"sorting.png",
                      accessibilityConfig:{
                        "a11yHidden":true,
                        "a11yARIA":{
                          "tabindex":-1
                        }
                      }
                    },
                    lblSelectAll: {
                      isVisible: true,
                    },
                    flxSelectAllClickable: {
                      onClick: scopeObj.checkBoxOnClick,
            accessibilityConfig: {  
              "a11yLabel" : "Select All Accounts",                    
              "a11yARIA": {
                  "tabindex": 0,
                  "role": "checkbox",
                  "aria-checked": false
              }                 
          }  
          },
          lblSelectAllCheckBox: {
            isVisible: true,
            text: "D",
            accessibilityConfig: {
              "a11yHidden": true,
              "a11yARIA": {
                "tabindex": -1
              }
            }
          },
          lblHeaderSeparator: {
            text: "-",
            isVisible: true,
            accessibilityConfig:{
              "a11yHidden":true,
              "a11yARIA": {
                  "tabindex": -1
              }                 
          }
          },
        });
        if (data.Accounts.length > 0) {
          data.Accounts.forEach(function (element) {
            var obj = kony.sdk.isNullOrUndefined(element["accountHolderName"])
              ? {}
              : JSON.parse(element["accountHolderName"]);
            res.push({
              lblAccountNameValue: {
                text: obj["fullname"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountNumberValue: {
                text: element["accountId"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountTypeValue: {
                text: element["accountType"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountTypeIdValue: {
                text: element["typeId"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountMembershipIdValue: {
                text: element["membershipId"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountMembershipNameValue: {
                text: element["membershipName"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblAccountTaxIdValue: {
                text: element["taxId"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              lblSelectAllValue: {
                isVisible: true,
                text: "D",
                accessibilityConfig: {
                  a11yHidden:true,
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              accountHolderName: {
                text: element["accountHolderName"],
                accessibilityconfig: {
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
              },
              accountName: {
                text: element["accountName"],
                accessibilityconfig: {
                  a11yLabel: element["accountName"],
                },
              },
              ownerType: {
                text: element["ownerType"],
                accessibilityconfig: {
                  a11yLabel: element["ownerType"],
                },
              },
              accountStatus: {
                text: element["accountStatus"],
              },
              arrangementId: {
                text: kony.sdk.isNullOrUndefined(element["arrangementId"])
                  ? ""
                  : element["arrangementId"],
              },
            });
          });
          sec.push(res);
        } else {
          this.setErrorMessage(
            kony.i18n.getLocalizedString(
              "i18n.konybb.manageUser.noAccountAccess"
            )
          );
        }
        scopeObj.view.lblDetailsCompanyNameValue.text =
          scopeObj.companyInfo["companyDetails"]["companyName"];
        scopeObj.view.lblDetailsTaxIdValue.text =
          scopeObj.companyInfo["companyDetails"]["taxId"]===""?"None":scopeObj.companyInfo["companyDetails"]["taxId"];
        scopeObj.view.lblDetailsCIFNumberValue.text =
          scopeObj.companyInfo["companyDetails"]["CIF"];
          scopeObj.view.lblDetailsCompanyNameValue.text=scopeObj.companyInfo["companyDetails"]["companyName"];
          scopeObj.view.lblDetailsTaxIdValue.text=scopeObj.companyInfo["companyDetails"]["taxId"]===""?"None":scopeObj.companyInfo["companyDetails"]["taxId"];
          scopeObj.view.lblDetailsCIFNumberValue.text=scopeObj.companyInfo["companyDetails"]["CIF"];
        scopeObj.companyInfo["accountDetails"] = sec;
        scopeObj.businessInfo["companyList"].push(
          CommonUtilities.cloneJSON(this.companyInfo)
        );
        scopeObj.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showPopUp(
            kony.i18n.getLocalizedString("i18n.common.RemoveAccountsMsg"),
            scopeObj.navigateBackToMethodEnrollment.bind(this)
          );
          scopeObj.view.PopupHeaderUM.btnYes.accessibilityConfig={
            "a11yLabel":"Yes, continue to previous screen",
            "a11yARIA":{
              "tabindex":0
            }
          },
          scopeObj.view.PopupHeaderUM.btnNo.accessibilityConfig={
            "a11yLabel":"No, don't go to previous screen",
            "a11yARIA":{
              "tabindex":0
            }
          },
           btnFlag=scopeObj.view.formActionsNew.btnCancel;
        };
        scopeObj.view.formActionsNew.btnNext.onClick = function () {
          scopeObj.businessInfo.companyList[
            scopeObj.businessInfo.companyList["length"] - 1
          ]["accountDetails"] =
            scopeObj.view.TabBodyAccountsDetails.getData()[0];
          if (scopeObj.businessInfo["companyList"].length > 1) {
            scopeObj.view.lstbTypeOfDomain.masterData = [];
            scopeObj.view.tbxDomainName.text = "";
            scopeObj.view.lstbYourRoleInTheDomain.masterData = [];
            scopeObj.businessInfo["domainDetails"] = [];
          }
          scopeObj.addCompanyPopUp();
          btnFlag=scopeObj.view.formActionsNew.btnNext;
        };
      }
      scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.Auth.VerifyCompanyDetailsAndAccounts"
      );
      scopeObj.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.Auth.CompanyDetails"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      scopeObj.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.konybb.Auth.CompanyDetails");
      scopeObj.view.flxVerifyCompanyDetails.setVisibility(true);
      scopeObj.view.flxVerifyBusinessAccounts.setVisibility(true);
      scopeObj.view.TabBodyAccountsDetails.segTemplates.rowTemplate =
        "flxAuthBusinessAccounts";
      scopeObj.getTemplatesForAccounts();
      scopeObj.view.TabBodyAccountsDetails.segTemplates.sectionHeaderTemplate =
        "flxAuthBusinessAccountsHeader";
      scopeObj.view.TabBodyAccountsDetails.setSectionData([sec[0]]);
      scopeObj.view.TabBodyAccountsDetails.setDefaultValues([defaultValues]);
      scopeObj.view.TabBodyAccountsDetails.addOnlySectionHeaders([sec[0]]);
      scopeObj.view.TabBodyAccountsDetails.addDataForSections([sec[1]]);
      FormControllerUtility.hideProgressBar(this.view);
      scopeObj.view.flxActionsSeparator.setVisibility(false);
      scopeObj.view.formActionsNew.btnOption.onClick = function () {
        scopeObj.showCancelPopUp();
        scopeObj.view.PopupHeaderUM.btnYes.accessibilityConfig={
          "a11yLabel":"Yes, cancel the enrollment process",
          "a11yARIA":{
            "tabindex":0
          }
        },
        scopeObj.view.PopupHeaderUM.btnNo.accessibilityConfig={
          "a11yLabel":"No, don't cancel the enrollment process.",
          "a11yARIA":{
            "tabindex":0
          }
        },
        btnFlag=scopeObj.view.formActionsNew.btnOption;
      };
      FormControllerUtility.hideProgressBar(this.view);
      scopeObj.adjustScreen(30);
      scopeObj.skipNav();
    },
          rowCheckBoxOnClick : function(eventobject, context) {
            var scopeObj=this;
            var index = scopeObj.businessInfo["companyList"].length - 1;
            var res = scopeObj.businessInfo["companyList"][index]["accountDetails"][1];
            if (eventobject.lblSelectAllValue.text === "D") {
                totalAccountSelected++;
            } else {
                totalAccountSelected--;
            }
            if (totalAccountSelected > 0) {
                FormControllerUtility.enableButton(scopeObj.view.formActionsNew.btnNext);
                if (totalAccountSelected === res.length) {
                    scopeObj.view.TabBodyAccountsDetails.updateSectionAt("lblSelectAllCheckBox", {
                        text: "C",
                        accessibilityConfig: {
                            "a11yHidden": true,
                            "a11yARIA": {
                                "tabindex": -1
                            }
                        }
                    }, context.sectionIndex);
                    scopeObj.view.TabBodyAccountsDetails.updateSectionAt("flxSelectAllClickable", {
                        onClick: scopeObj.checkBoxOnClick,
                        accessibilityConfig: {  
                          "a11yLabel" : "Select All Accounts",                    
                          "a11yARIA": {
                              "tabindex": 0,
                              "role": "checkbox",
                              "aria-checked": true
                          }                 
                      }  
                      }, context.sectionIndex);
                } else {
                    scopeObj.view.TabBodyAccountsDetails.updateSectionAt("lblSelectAllCheckBox", {
                    text: "D",
                    accessibilityConfig: {
                            "a11yHidden": true,
                            "a11yARIA": {
                                "tabindex": -1
                            }
                        }
                }, context.sectionIndex);
                scopeObj.view.TabBodyAccountsDetails.updateSectionAt("flxSelectAllClickable", {
                    onClick: scopeObj.checkBoxOnClick,
                    accessibilityConfig: {  
                      "a11yLabel" : "Select All Accounts",                    
                      "a11yARIA": {
                          "tabindex": 0,
                          "role": "checkbox",
                          "aria-checked": false
                      }                 
                  }  
                  }, context.sectionIndex);
                }
            } else {
                FormControllerUtility.disableButton(scopeObj.view.formActionsNew.btnNext);
                scopeObj.view.TabBodyAccountsDetails.updateSectionAt("lblSelectAllCheckBox", {
                    text: "D",
                    accessibilityConfig: {
                        "a11yHidden": true,
                        "a11yARIA": {
                            "tabindex": -1
                        }
                    }
                }, context.sectionIndex);
                scopeObj.view.TabBodyAccountsDetails.updateSectionAt("flxSelectAllClickable", {
                    onClick: scopeObj.checkBoxOnClick,
                    accessibilityConfig: {  
                      "a11yLabel" : "Select All Accounts",                    
                      "a11yARIA": {
                          "tabindex": 0,
                          "role": "checkbox",
                          "aria-checked": false
                      }                 
                  }  
                  }, context.sectionIndex);
            }
            scopeObj.view.TabBodyAccountsDetails.updateKeyAt("lblSelectAllValue", {
                text: eventobject.lblSelectAllValue.text === "D" ? "C" : "D",
                accessibilityConfig: { 
                  a11yHidden:true,
                  a11yARIA:{
                    "tabindex":-1
                  }
                },
                isVisible:true
            }, context.rowIndex, context.sectionIndex);
            if(eventobject.lblSelectAllValue.text==="D"){
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt("flxSelectClickable", {
                    onClick: scopeObj.rowCheckBoxOnClick,
                    accessibilityConfig: {
                        //"a11yLabel": "Select Account Name",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "checkbox",
                            "aria-labelledby":"lblAccountNameValue",
                            "aria-checked": true
                        }
                    }
                },
                context.rowIndex, context.sectionIndex);
            }
            else{
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt("flxSelectClickable", {
                    onClick: scopeObj.rowCheckBoxOnClick,
                    accessibilityConfig: {
                        //"a11yLabel": "Select Account Name",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "checkbox",
                            "aria-labelledby":"lblAccountNameValue",
                            "aria-checked": false
                        }
                    }
                },
                context.rowIndex, context.sectionIndex);
            }
            scopeObj.view.forceLayout();
            scopeObj.adjustScreen(30);
            scopeObj.view.TabBodyAccountsDetails.segTemplates.setActive(context.rowIndex, context.sectionIndex, "flxAuthBusinessAccounts.flxRowHeaderTemplate.flxSelectClickable");
        },
        checkBoxOnClick : function (eventobject, context) {
            var scopeObj=this;
            var index = scopeObj.businessInfo["companyList"].length - 1;
            var res = scopeObj.businessInfo["companyList"][index]["accountDetails"][1];
            scopeObj.view.TabBodyAccountsDetails.updateSectionAt(
              "lblSelectAllCheckBox",
              {
                text:
                  eventobject.lblSelectAllCheckBox.text === "D" ? "C" : "D",
                   accessibilityConfig: {
                    "a11yHidden": true,
                    "a11yARIA": {
                        "tabindex": -1
                    }
                }
              },
              context.sectionIndex
            );
            if(eventobject.lblSelectAllCheckBox.text==="D"){
            scopeObj.view.TabBodyAccountsDetails.updateSectionAt(
                "flxSelectAllClickable",
                {
                    "onClick":scopeObj.checkBoxOnClick,
                    "accessibilityConfig":{
                    "a11yLabel":"Select All Accounts",
                    "a11yARIA":{
                        "role":"checkbox",
                        "tabindex":0,
                        "aria-checked":true
                    }
                  }},
                context.sectionIndex
              );
            }
            else{
                scopeObj.view.TabBodyAccountsDetails.updateSectionAt(
                    "flxSelectAllClickable",
                    {
                        "onClick":scopeObj.checkBoxOnClick,
                        "accessibilityConfig":{
                        "a11yLabel":"Select All Accounts",
                        "a11yARIA":{
                            "role":"checkbox",
                            "tabindex":0,
                            "aria-checked":false
                        }
                      }},
                    context.sectionIndex
                  );
            }
            if (eventobject.lblSelectAllCheckBox.text === "D") {
              res.forEach(function (element, i) {
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt(
                  "lblSelectAllValue",
                  {
                    text: "C",
                    accessibilityConfig: { 
                      a11yHidden:true,
                      a11yARIA:{
                        "tabindex":-1
                      }
                    },
                    isVisible:true
                  },
                  i,
                  0
                );
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt(
                    "flxSelectClickable",
                     {
                        onClick: scopeObj.rowCheckBoxOnClick,
                        accessibilityConfig: {
                            //"a11yLabel": "Select Account Name",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "checkbox",
                                "aria-labelledby":"lblAccountNameValue",
                                "aria-checked": true
                            }
                        }
                    },
                    i,
                    0
                  );
              });
              
              totalAccountSelected = res.length;
            } else {
              res.forEach(function (element, i) {
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt(
                  "lblSelectAllValue",
                  {
                    text: "D",
                    accessibilityConfig: { 
                      a11yHidden:true,
                      a11yARIA:{
                        "tabindex":-1
                      }
                    },
                    isVisible:true
                  },
                  i,
                  0
                );
                scopeObj.view.TabBodyAccountsDetails.updateKeyAt(
                    "flxSelectClickable",
                     {
                        onClick: scopeObj.rowCheckBoxOnClick,
                        accessibilityConfig: {
                            //"a11yLabel": "Select Account Name",
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "checkbox",
                                "aria-labelledby":"lblAccountNameValue",
                                "aria-checked": false
                            }
                        }
                    },
                    i,
                    0
                  );
              });
              totalAccountSelected = 0;
            }
            if (totalAccountSelected > 0) {
              FormControllerUtility.enableButton(
                scopeObj.view.formActionsNew.btnNext
              );
            } else {
              FormControllerUtility.disableButton(
                scopeObj.view.formActionsNew.btnNext
              );
            }
            scopeObj.view.forceLayout();
            scopeObj.adjustScreen(30);
            scopeObj.view.TabBodyAccountsDetails.segTemplates.setActive(-1,context.sectionIndex,"flxAuthBusinessAccountsHeader.flxSectionHeaderTemplate.flxSelectAllClickable");
          },
      getTemplatesForAccounts: function () {
      var widgetDataMap = {
        lblAccountNameValue: "lblAccountNameValue",
        lblAccountNumberValue: "lblAccountNumberValue",
        lblAccountTypeValue: "lblAccountTypeValue",
        lblSelectAllValue: "lblSelectAllValue",
        lblAccountName: "lblAccountName",
        flxAccountName:"flxAccountName",
        flxAccountNumber:"flxAccountNumber",flxAccountType:"flxAccountType",
        imgAccountName: "imgAccountName",
        lblAccountNumber: "lblAccountNumber",
        imgAccountNumber: "imgAccountNumber",
        lblAccountType: "lblAccountType",
        imgAccountType: "imgAccountType",
        lblSelectAll: "lblSelectAll",
        lblSelectAllCheckBox: "lblSelectAllCheckBox",
        lblRowSeparator: "lblRowSeparator",
        lblHeaderSeparator: "lblHeaderSeparator",
        flxSelectClickable: "flxSelectClickable",
        flxSelectAllClickable: "flxSelectAllClickable",
      };
      this.view.TabBodyAccountsDetails.segTemplates.widgetDataMap =
        widgetDataMap;
      this.view.TabBodyAccountsDetails.setRowDataMap([widgetDataMap]);
    },

    /**
     * show ui for domainDetails screen
     *
     */
    showDomainDetailsUI: function (organisationTypes, isEditFlow) {
      this.resetUI();
      this.resetErrorMessage();
      var scopeObj = this;
      var domainTypes = organisationTypes;
      this.view.lblContentHeader.text = "Domain Details";
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.businessEnroll.provideDomainDetails"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("kony.i18n.businessEnroll.provideDomainDetails");
      this.view.flxDomainDetailsContainer.isVisible = true;
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      var masterData = [];
      var domainTypeSelectedKey = "-1";
      if (this.isBackFlow) {
        scopeObj.enableDisabledProceedOnValidDomainDetails(isEditFlow);
      }
      if (isEditFlow) {
        scopeObj.view.formActionsNew.btnOption.isVisible = false;
      }
      masterData.push(["-1", kony.i18n.getLocalizedString("i18n.ACH.Select")]);
      for (var i = 0; i < domainTypes.length; i++) {
        if (
          domainTypes[i].name ===
          this.businessInfo["domainDetails"]["domainType"]
        ) {
          domainTypeSelectedKey = domainTypes[i].id;
        }
        masterData.push([domainTypes[i].id, domainTypes[i].name]);
      }
      this.view.lstbTypeOfDomain.masterData = masterData;
      this.view.lstbTypeOfDomain.selectedKey = "-1";
      if (!isEditFlow && !this.isBackFlow) {
        if (this.businessInfo["companyList"].length === 1) {
          this.view.tbxDomainName.text =
            this.businessInfo["companyList"][0]["companyDetails"][
              "companyName"
            ];
        } else {
          this.view.tbxDomainName.text = "";
        }
        masterData = [];
        masterData.push([
          "-1",
          kony.i18n.getLocalizedString("i18n.ACH.Select"),
        ]);
        this.view.lstbYourRoleInTheDomain.masterData = masterData;
        this.view.lstbYourRoleInTheDomain.selectedKey = "-1";
      } else {
        this.view.tbxDomainName.text =
          this.businessInfo["domainDetails"]["domainName"];
        this.view.lstbTypeOfDomain.selectedKey = domainTypeSelectedKey;
        this.view.lstbYourRoleInTheDomain.selectedKey =
          this.businessInfo["domainDetails"]["domainRoleId"];
      }
      this.view.lstbTypeOfDomain.onSelection = function () {
        scopeObj.resetErrorMessage();
        var organization = scopeObj.view.lstbTypeOfDomain.selectedKey;
        FormControllerUtility.showProgressBar(scopeObj.view);
        scopeObj.getBusinessTypeRoles(organization);
        scopeObj.view.lstbYourRoleInTheDomain.selectedKey = "-1";
        scopeObj.enableDisabledProceedOnValidDomainDetails(isEditFlow);
      };
      this.view.tbxDomainName.onKeyUp = function () {
        scopeObj.resetErrorMessage();
        scopeObj.enableDisabledProceedOnValidDomainDetails(isEditFlow);
      };
      this.view.lstbYourRoleInTheDomain.onSelection =
        this.enableDisabledProceedOnValidDomainDetails.bind(this);
      this.view.formActionsNew.btnNext.onClick = function () {
        scopeObj.isBackFlow = false;
        scopeObj.enableDisabledProceedOnValidDomainDetails(false); // Setting isEdit flag to false to enable setting of domain Details.
        scopeObj
          .loadEnrollModule()
          .presentationController.checkIfDomainNameExists(
            scopeObj.view.tbxDomainName.text,
            BBConstants.SEARCH_TYPE_NAME
          );
      };
      this.view.formActionsNew.btnCancel.onClick = function () {
        if (isEditFlow) {
          scopeObj.showVerifyDetailsUI();
        } else {
          scopeObj.isBackFlow = true;
          scopeObj.verifyCompanyDetailsBusinessAccountsUI("", true);
        }
      };
      if (isEditFlow && !this.isBackFlow) {
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.konybb.common.SaveAndUpdate"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
      } else {
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.userManagement.Continue"
        );
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    /**
     * Validate Domain Details
     *
     */
    enableDisabledProceedOnValidDomainDetails: function (isEditFlow) {
      if (
        CommonUtilities.isEmptyString(this.view.tbxDomainName.text) ||
        this.view.lstbTypeOfDomain.selectedKey === "-1" ||
        this.view.lstbYourRoleInTheDomain.selectedKey === "-1" ||
        this.view.lstbYourRoleInTheDomain.selectedKeyValue[1] ===
          "Select here" ||
        this.view.lstbTypeOfDomain.selectedKeyValue[1] === "Select here"
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
      if (!isEditFlow) {
        this.setDomainDetailsData();
      }
    },

    /**
     * Set domain details data
     *
     */
    setDomainDetailsData: function () {
      this.businessInfo["domainDetails"] = {
        domainName: this.view.tbxDomainName.text,
        domainType: this.view.lstbTypeOfDomain.selectedKeyValue[1],
        domainRole: this.view.lstbYourRoleInTheDomain.selectedKeyValue[1],
        domainRoleId: this.view.lstbYourRoleInTheDomain.selectedKeyValue[0],
      };
    },

    addCompanyPopUp: function () {
      var scope = this;
      this.saveCompanyDetailsWithCIF(
        this.view.lblDetailsCIFNumberValue.text,
        this.view.TabBodyAccountsDetails.segTemplates.data[0][1]
      );
      scope.view.flxCancelPopup.height = "100%";
      scope.view.PopupHeaderUM.isVisible =true;
      scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "kony.i18n.businessEnroll.AddOtherCompany"
      );
      scope.view.PopupHeaderUM.lblPopupMessage.text =
        kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.AddCompanyHeaderPopUp"
        );
        scope.view.PopupHeaderUM.btnYes.accessibilityConfig={
          "a11yLabel":"Yes, Add other company",
          "a11yARIA":{
            "tabindex":0
          }
        },
        scope.view.PopupHeaderUM.btnNo.accessibilityConfig={
          "a11yLabel":"No, don't add other company",
          "a11yARIA":{
            "tabindex":0
          }
        },
      scope.view.PopupHeaderUM.lblPopupMessage.skin = "slLabel0d8a72616b3cc47";
      scope.view.PopupHeaderUM.btnYes.text =
        kony.i18n.getLocalizedString("i18n.common.yes");
      scope.view.PopupHeaderUM.btnNo.text =
        kony.i18n.getLocalizedString("i18n.common.no");
      scope.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
      scope.view.PopupHeaderUM.btnNo.onClick = function () {
        if (!kony.sdk.isEmptyObject(this.businessInfo["domainDetails"]))
          this.isBackFlow = true;
        this.setDomainDetails(false);
      }.bind(this);
      scope.view.PopupHeaderUM.btnYes.onClick = function () {
        this.closePopUp(this);
        this.addAnotherCompany(this);
      }.bind(this);
      scope.view.flxCancelPopup.setVisibility(true);
      scope.view.flxCancelPopup.isModalContainer = true;
      scope.adjustScreen(30);
      scope.view.PopupHeaderUM.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
          "tagName": "h2"
        }
      }
      scope.view.PopupHeaderUM.lblHeading.setActive(true);
    },

    /**
     * set ui for domain details screen
     *
     */
    setDomainDetails: function (isEditFlow) {
      this.closePopUp();
      FormControllerUtility.showProgressBar(this.view);
      this.isDomainDetailsEditFlow = isEditFlow ? true : false;
      this.loadEnrollModule().presentationController.fetchOrganizationTypes();
    },

    /*
     * fetchAllFeatures: Method to fetch all features.
     */
    fetchAllFeatures: function () {
      var params = {
        serviceDefinitionId: this.view.lstbTypeOfDomain.selectedKey,
        groupId: this.view.lstbYourRoleInTheDomain.selectedKey,
      };
      this.loadEnrollModule().presentationController.fetchAllFeatures(params);
    },

    /*
     * showAllFeaturesUI : method to show all features UI
     */
    showAllFeaturesUI: function (data, isEdit) {
      var navMan = applicationManager.getNavigationManager();
      var is_edit = data;
      this.availableSegData = navMan.getCustomInfo("showAllFeatures");
      this.resetUI();
      var scopeObj = this;
      if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "false"
      ) {
        this.view.btnAddNewCompany.setVisibility(true);
        this.view.btnAddNewCompany.onClick = function () {
          scopeObj.isSelectService = true;
          FormControllerUtility.showProgressBar(this.view);
          scopeObj.addAnotherCompany(this);
        };
      } else {
        this.view.btnAddNewCompany.setVisibility(false);
      }
      this.view.flxFeatureContainer.setVisibility(true);
      this.view.flxDetailsHeader.isVisible = true;
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "konybb.enroll.SelectFeatures"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.businesEnroll.companyServices"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("kony.i18n.businesEnroll.companyServices");
      if(!kony.sdk.isNullOrUndefined(this.availableSegData)) {
        if (kony.sdk.isNullOrUndefined(scopeObj.availableFeatures))
          scopeObj.availableFeatures = this.availableSegData[0];
        if (kony.sdk.isNullOrUndefined(scopeObj.defaultFeatures))
          scopeObj.defaultFeatures = this.availableSegData[1];
      if (this.availableSegData.length === 0) {
        this.view.flxNoAvailableFeatures.setVisibility(true);
        this.view.lblCheckFeature.setVisibility(false);
        this.view.segAvailableFeatures.setVisibility(false);
      } else {
        this.view.flxNoAvailableFeatures.setVisibility(false);
        this.view.lblCheckFeature.setVisibility(true);
        var seglength = this.businessInfo["companyList"];
        var segData = [];
        var scope = this;
        this.view.segAvailableFeatures.sectionHeaderTemplate = "flxVerifySelectedServices";
        for (var j = 0; j < seglength.length; j++) {
          var segid = "selectedServicesFeatures" + j;
          var flexid = "flx" + j;
          var lblIconid = "lbl" + j;
          var lblCompany = "lblCompany" + j;
          this.view.flxAvailableFeatures.remove(this.view[segid]);
          this.view.flxAvailableFeatures.remove(this.view[flexid]);
          this.view.flxAvailableFeatures.remove(this.view[lblIconid]);
          this.view.flxAvailableFeatures.remove(this.view[lblCompany]);
        }

        //var featureData = this.populateFeatureSegment(data);

        this.segLength = [];
        for (var i = 0; i < seglength.length; i++) {
          this.segdatt = [];
          var flexid = "flx" + i;
          var flexContainer1 = new kony.ui.FlexContainer(
            {
              id: flexid,
              top: "0dp",
              left: "0dp",
              width: "100%",
              height: "50dp",
              zIndex: 1,
              skin: "sknFlxffffffborderradE3E3E3",
              onClick: this.visibleFeature.bind(this),
              isVisible: true,
              clipBounds: true,
              layoutType: kony.flex.FLOW_HORIZONTAL,
              accessibilityConfig: {
                "a11yLabel": "Show list of services for "+this.businessInfo["companyList"][i].companyDetails
                .companyName,
                "a11yARIA": {
                  "tabindex": 0,
                  "role": "button",
                  "aria-expanded": false
                }
              }
            },
            {
              padding: [0, 0, 0, 0],
            },
            {}
          );

          this.view.flxAvailableFeatures.add(flexContainer1);

          var lblid = "lbl" + i;
          var lblBasic = {
            id: lblid,
            skin: "sknlbldropdown",
            text: "O",
            accessibilityconfig: { 
              a11yHidden:true,
              a11yARIA:{
                "tabindex":-1
              }
            },
            centerY: "50%",
            left: "20dp",
            isVisible: true,
          };
          var lblLayout = {
            containerWeight: 100,
            padding: [5, 5, 5, 5],
            margin: [5, 5, 5, 5],
            hExpand: true,
            vExpand: false,
          };
          var lblLayout = {
            renderAsAnchor: true,
            wrapping: constants.WIDGET_TEXT_WORD_WRAP,
          };
          //Creating the label.
          var lbl = new kony.ui.Label(lblBasic, lblLayout, lblLayout);
          this.view[flexid].add(lbl);
          var lblCompanyid = "lblCompany" + i;
          var lblBasic = {
            id: lblCompanyid,
            skin: "bbSknLbl424242SSP15Px",
            text: this.businessInfo["companyList"][i].companyDetails
              .companyName,
            centerY: "50%",
            left: "20dp",
            isVisible: true,
          };
          var lblLayout = {
            containerWeight: 100,
            padding: [5, 5, 5, 5],
            margin: [5, 5, 5, 5],
            hExpand: true,
            vExpand: false,
          };
          var lblLayout = {
            renderAsAnchor: true,
            wrapping: constants.WIDGET_TEXT_WORD_WRAP,
          };
          //Creating the label.
          var lblcompany = new kony.ui.Label(lblBasic, lblLayout, lblLayout);
          this.view[flexid].add(lblcompany);

          var availvable = [
            {
              flxVerifySelectedServices: {
                height: "50Dp",
              },
              flxMain: {
                skin: "sknFlxBgfbfbfbBor1pxTBe3e3e3",
                isVisible: false,
              },
              flxAllFeatureRow: {
                skin: "slFboxffffff",
                onClick: scope.checkAllFeatures.bind(scope, i),
                accessibilityConfig: {
                  "a11yLabel": "All Available Services",
                  "a11yARIA": {
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": true
                  }
                }
              },
              lblAllCheckFeature: {
                skin: "sknlblOLBFonts0273E420pxOlbFontIcons",
                text: "C",
                accessibilityConfig: {
                  "a11yHidden":true,
                  "a11yARIA": {
                    "tabindex": -1
                  }
                }
              },
              lblAllFeatureName: {
                skin: "sknlbla0a0a015px",
                text: kony.i18n.getLocalizedString(
                  "kony.i18n.businessEnroll.AvailableServices"
                ),
              },
            },
          ];

          var featureService = [];
          var id = "selectedServicesFeatures" + i;
          this.segLength.push(id);
          var basicConf = {
            id: id,
            isVisible: false,
            widgetSkin: "seg2Normal",
            rowSkin: "seg2Normal",
            rowFocusSkin: "seg2Focus",
            alternateRowSkin: "seg2Normal",
            accessibilityConfig: {
              "a11yARIA": {
                "tabindex": -1,
              }
            },
            //sectionHeaderSkin:"seg2Normal",
            widgetDataMap: {
              flxVerifySelectedServices: "flxVerifySelectedServices",
              flxMain: "flxMain",
              lblDropDown: "lblDropDown",
              lblCompanyName: "lblCompanyName",
              lblCheckFeature: "lblCheckFeature",
              lblAllCheckFeature: "lblAllCheckFeature",
              lblAllFeatureName: "lblAllFeatureName",
              lblFeatureName: "lblFeatureName",
              flxFeatureRow:"flxFeatureRow",
              flxAllFeatureRow: "flxAllFeatureRow",
            },
            rowTemplate: "flxFeatureContainer",
            sectionHeaderTemplate: "flxVerifySelectedServices",
            retaincontentalignment: false,
            retainflexpositionproperties: false,
            retainselection: false,
            autogrowMode: kony.flex.AUTOGROW_HEIGHT,
            viewType: constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            layoutType: kony.flex.FREE_FORM,
          };

          var layoutConf = {
            padding: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            containerweight: 100,
            hasSections: true,
            indicator: "none",
            left: "0dp",
            orientation: 2,
            right: "0dp",
            top: "0dp",
          };

          var pspConf = {
            border: constants.SEGUI_BORDER_NONE,
            defaultSelection: true,
          };

          var segment1 = new kony.ui.SegmentedUI2(
            basicConf,
            layoutConf,
            pspConf
          );
          this.view.flxAvailableFeatures.add(segment1);
          var featureData = this.populateFeatureSegment(
            this.availableSegData,
            i
          );

          availvable.push(featureData);
          this.segdatt.push(availvable);
          this.view[id].setData(this.segdatt);
        }
      }
    }
      else {
        this.view.flxNoAvailableFeatures.setVisibility(true);
        this.view.lblCheckFeature.setVisibility(false);
        this.view.segAvailableFeatures.setVisibility(false);
      }
      //   var featureData = this.populateFeatureSegment(scopeObj.availableFeatures);

      // this.view.segDefaultFeatures.widgetDataMap = {
      //     "lblCheckFeature": "lblCheckFeature",
      //      "lblFeatureName": "lblFeatureName"
      // };
      //  this.view.segDefaultFeatures.setData(scopeObj.defaultFeatures);
      this.view.segAvailableFeatures.isVisible = false;
      this.view.lblCheckFeature.onTouchStart = this.checkAllFeatures.bind(this);
      var scopeObj = this;
      if (isEdit) {
        this.view.formActionsNew.btnOption.setVisibility(false);
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.konybb.common.SaveAndUpdate"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.onClick = function () {
          if (scopeObj.availableFeatures.length !== 0)
            scopeObj.availableFeatures =
              scopeObj.view.segAvailableFeatures.data;
          var seglength = scopeObj.businessInfo["companyList"];
          for (var i = 0; i < seglength.length; i++) {
            scopeObj.businessInfo["selectedFeatures" + i] = [];
            var segdata = [];
            segdata = scopeObj.view["selectedServicesFeatures" + i].data;
            //scopeObj.availableFeatures = segdata[0][1] ;
            scopeObj.businessInfo["selectedFeatures" + i] = segdata[0][1];
            scopeObj.businessInfo["selectedFeatures" + i] =
              scopeObj.sortFeatures(
                scopeObj.businessInfo["selectedFeatures" + i],
                "lblFeatureName"
              );
          }
          scopeObj.showVerifyDetailsUI();
        };
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          scopeObj.showVerifyDetailsUI.bind(this);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
      } else {
        this.view.formActionsNew.btnOption.setVisibility(true);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.userManagement.Continue"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.onClick = function () {
          if (scopeObj.availableFeatures.length !== 0)
            scopeObj.availableFeatures =
              scopeObj.view.segAvailableFeatures.data;
          var seglength = scopeObj.businessInfo["companyList"];
          for (var i = 0; i < seglength.length; i++) {
            scopeObj.businessInfo["selectedFeatures" + i] = [];
            var segdata = [];
            segdata = scopeObj.view["selectedServicesFeatures" + i].data;
            //scopeObj.availableFeatures = segdata[0][1] ;
            scopeObj.businessInfo["selectedFeatures" + i] = segdata[0][1];
            scopeObj.businessInfo["selectedFeatures" + i] =
              scopeObj.sortFeatures(
                scopeObj.businessInfo["selectedFeatures" + i],
                "lblFeatureName"
              );
          }
          //    scopeObj.businessInfo["selectedFeatures"] = [];
          //  scopeObj.businessInfo["selectedFeatures"] = scopeObj.availableFeatures;
          //  scopeObj.businessInfo["selectedFeatures"] = scopeObj.sortFeatures(scopeObj.businessInfo["selectedFeatures"], "lblFeatureName");
          scopeObj.showVerifyDetailsUI();
        };
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          this.onBackFromSelectFeautures.bind(this, false);
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        // this.addCompanySelectFeatures();
      }
      this.view.flxSelectAvailableFeatures.isVisible = false;
      this.view.flxDefaultFeatures.isVisible = false;
      this.view.lblDetailsHeaderSeparator.isVisible = false;
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },
    addCompanySelectFeatures: function () {
      var scope = this;
      this.saveCompanyDetailsWithCIF(
        this.view.lblDetailsCIFNumberValue.text,
        this.view.TabBodyAccountsDetails.segTemplates.data[0][1]
      );
      scope.view.flxCancelPopup.height = "100%";
      scope.view.PopupHeaderUM.isVisible =true;
      scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "kony.i18n.businessEnroll.AddOtherCompany"
      );
      scope.view.PopupHeaderUM.lblPopupMessage.text =
        kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.AddCompanyHeaderPopUp"
        );
      scope.view.PopupHeaderUM.lblPopupMessage.skin = "slLabel0d8a72616b3cc47";
      scope.view.PopupHeaderUM.btnYes.text =
        kony.i18n.getLocalizedString("i18n.common.yes");
      scope.view.PopupHeaderUM.btnNo.text =
        kony.i18n.getLocalizedString("i18n.common.no");
      scope.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
      scope.view.PopupHeaderUM.btnNo.onClick = function () {
        this.closePopUp(this);
      }.bind(this);
      scope.view.PopupHeaderUM.btnYes.onClick = function () {
        this.closePopUp(this);
        this.addAnotherCompany(this);
      }.bind(this);
      scope.view.flxCancelPopup.setVisibility(true);
      scope.adjustScreen(30);
    },
    rowVisibleFeatures: function (index) {
      var segData = this.view.segAvailableFeatures.data;

      //
      //	var sectionHeader = segData[index] ;
      for (var i = 0; i < segData.length; i++) {
        if (index === i) {
          if (segData[index][0].lblDropDown.text === "P") {
            segData[index][0].flxVerifySelectedServices.height = "90dp";
            segData[index][0].lblDropDown.text = "O";
            var featureData = this.populateFeatureSegment(
              this.availableSegData,
              index
            );
            segData[index][1] = featureData;
          } else {
            segData[index][0].flxVerifySelectedServices.height = "50dp";
            segData[index][0].lblDropDown.text = "P";
            //	var featureData = this.populateFeatureSegment(this.availableSegData);
            segData[index][1] = [];
          }
          var data = segData[index];
          this.view.segAvailableFeatures.setSectionAt(data, index);
        } else {
          segData[i][0].flxVerifySelectedServices.height = "50dp";
          segData[i][0].lblDropDown.text = "P";
          //	var featureData = this.populateFeatureSegment(this.availableSegData);
          segData[i][1] = [];
          var data1 = segData[i];
          this.view.segAvailableFeatures.setSectionAt(data1, i);
        }
      }

      this.adjustScreen(30);
    },
    visibleFeature: function (widget) {
      var id1 = widget.id;
      var seglength = this.businessInfo["companyList"];
      var split = id1.split("flx");
      var num = split[1];
      var numid = Number(num);
      if (this.view["lbl" + num].text === "P") {
        this.view["lbl" + num].text = "O";
        this.view["flx" + num].accessibilityConfig = {
          "a11yLabel": "Show list of services for "+this.businessInfo["companyList"][num].companyDetails
          .companyName,
          "a11yARIA": {
            "tabindex": 0,
            "role": "button",
            "aria-expanded": false
          }
        }
      } else {
        this.view["lbl" + num].text = "P";
        this.view["flx" + num].accessibilityConfig = {
          "a11yLabel": "Hide list of services for "+this.businessInfo["companyList"][num].companyDetails
          .companyName,
          "a11yARIA": {
            "tabindex": 0,
            "role": "button",
            "aria-expanded": true
          }
        }
      }
      this.view["flx" + num].setActive(true);
      for (var i = 0; i < seglength.length; i++) {
        if (numid === i) {
          if (this.view["selectedServicesFeatures" + num].isVisible) {
            this.view["selectedServicesFeatures" + num].isVisible = false;
          } else this.view["selectedServicesFeatures" + num].isVisible = true;
        } else {
          this.view["selectedServicesFeatures" + i].isVisible = false;
        }
      }
      this.adjustScreen(30);
    },
    /*
     * method to sort available and default features.
     */
    sortFeatures: function (array, key) {
      return array.sort(function (feature1, feature2) {
        var features1 = feature1[key];
        var features2 = feature2[key];
        return features1 < features2 ? -1 : features1 > features2 ? 1 : 0;
      });
    },
    populateDefaultFeatureSegment: function (features) {
      var scopeObj = this;
      return features.map(function (feature, index) {
        return {
          Feature_id: feature.id || feature.Feature_id,
          flxFeatureContainer: {
            isVisible: true,
          },
          lblFeatureName: feature.lblFeatureName,
          lblCheckFeature: {
            text: feature.lblCheckFeature.text,
            accessibilityConfig: {
              "a11yHidden":true,
              "a11yARIA": {
                "tabindex": -1
              }
            },
            skin: "sknBBLblOLBFontsInActiveC0C0C0",
          },
        };
      });
    },

    /*
     * populateFeatureSegment : method to populate available features segment
     */
    populateFeatureSegment: function (features, sectionIndex) {
      var scopeObj = this;
      return features.map(function (feature, index) {
        return {
          featureId: feature.featureId,
          featureName: feature.featureName,
          featureDescription: feature.featureDescription,
          flxFeatureRow: {
            onClick: scopeObj.onFeatureCheckboxClick.bind(scopeObj, index, sectionIndex),
            accessibilityConfig: {
              "a11yARIA": {
                "tabindex": 0,
                "aria-labelledby": "lblFeatureName",
                "role": "checkbox",
                "aria-checked": true
              }
            }
          },
          lblFeatureName: {
            text: feature.lblFeatureName,
          },
          lblCheckFeature: {
            text: feature.lblCheckFeature.text,
            accessibilityConfig: {
              "a11yHidden":true,
              "a11yARIA": {
                "tabindex": -1
              }
            },
          },
          flxFeatureContainer: {
            isVisible: true,
            // onClick: scopeObj.onFeatureCheckboxClick.bind(scopeObj, index, sectionIndex),
            "accessibilityConfig": {
              "a11yARIA": {
                "tabindex": -1
              }
            }
          },
        };
      });
    },
    /*
     * onFeatureCheckboxClick : Method to toggle checkbox.
     */
     onFeatureCheckboxClick: function(index, sectionIndex) {
            var scopeObj = this;
            var featureData = scopeObj.view["selectedServicesFeatures" + sectionIndex].data;
            FormControllerUtility.toggleFontCheckbox(featureData[0][1][index].lblCheckFeature);
            if(featureData[0][1][index].lblCheckFeature.text==="D"){
                featureData[0][1][index].flxFeatureRow.accessibilityConfig={
                    "a11yARIA":{
                      "aria-labelledby":"lblFeatureName",
                      "role":"checkbox",
                      "aria-checked":false,
                      "tabindex":0
                    }
                }
            }
            else{
                featureData[0][1][index].flxFeatureRow.accessibilityConfig={
                    "a11yARIA":{
                      "aria-labelledby":"lblFeatureName",
                      "role":"checkbox",
                      "aria-checked":true,
                      "tabindex":0
                    }
                }
            }
            scopeObj.view["selectedServicesFeatures" + sectionIndex].setDataAt(featureData[0][1][index], index, 0);
            FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
            scopeObj.view["selectedServicesFeatures" + sectionIndex].setActive(index,sectionIndex,"flxFeatureContainer.flxFeatureRow");
        },
    /*
     * checkAllFeatures : method to toggle all the checkboxes.
     */
    checkAllFeatures: function(index) {
            var sectionIndex = index;
            var scopeObj = this;
            var featureSegData = scopeObj.view["selectedServicesFeatures" + sectionIndex].data;
            FormControllerUtility.toggleFontCheckbox(featureSegData[0][0].lblAllCheckFeature);
            if (featureSegData[0][0].lblAllCheckFeature.text === "D") {
                featureSegData[0][0].flxAllFeatureRow.accessibilityConfig = {
                    "a11yLabel": "All Available Services",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": false
                    }
                }
            } else {
                featureSegData[0][0].flxAllFeatureRow.accessibilityConfig = {
                    "a11yLabel": "All Available Services",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "checkbox",
                        "aria-checked": true
                    }
                }
            }
            for (var i in featureSegData[0][1]) {
                featureSegData[0][1][i].lblCheckFeature.text = featureSegData[0][0].lblAllCheckFeature.text;
                if(featureSegData[0][1][i].lblCheckFeature.text==="D"){
                    featureSegData[0][1][i].flxFeatureRow.accessibilityConfig={
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-labelledby":"lblFeatureName",
                            "role": "checkbox",
                            "aria-checked": false
                        }
                    }
                }
                else{
                    featureSegData[0][1][i].flxFeatureRow.accessibilityConfig={
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-labelledby":"lblFeatureName",
                            "role": "checkbox",
                            "aria-checked": true
                        }
                    }
                }
                featureSegData[0][1][i].lblCheckFeature.skin = featureSegData[0][0].lblAllCheckFeature.skin;
            }
            this.view["selectedServicesFeatures" + sectionIndex].setData(featureSegData);
            FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
            this.view["selectedServicesFeatures" + sectionIndex].setActive(-1,index,"flxVerifySelectedServices.flxAllFeatureRow");
        },
        selectFeatureProceed: function(event, isBack) {
            var scopeObj = this;
            var featureSegData = scopeObj.view.segAvailableFeatures.data;
            for (var i in featureSegData) {
                if (FormControllerUtility.isFontIconChecked(featureSegData[i].lblCheckFeature)) {
                    this.selectedFeatures.push(featureSegData[i]);
                }
            }
        },
    /**
     * showVerifyDetailsUI : function that sets UI for verify Details Page
     */
    showVerifyDetailsUI: function () {
      //common code for both the flows
      this.resetUI();
      this.view.flxVerifyDetials.setVisibility(true);
      FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      this.view.lblContentHeader.text = this.isCustomerCentric
        ? kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.submitApplicationOrAddOtherCompany"
          )
        : kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.verifyandsubmitapplication"
          );
      var accessibilityText;
      if (this.isCustomerCentric)
        accessibilityText = kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.submitApplicationOrAddOtherCompany"
        );
      else
        accessibilityText = kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.verifyandsubmitapplication"
        );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.CustomerFeedback.Submit"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit")+" the Enrollment Application",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit")+" the Enrollment Application",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.TabBodyCompanyDetails.segTemplates.rowTemplate =
        "flxEnrollBusinessCompanyAccountsRowTemplate";
      this.view.TabBodyCompanyDetails.segTemplates.widgetDataMap =
        this.getWidgetDataMapForCompanyDetailsSegment();
      this.view.segSelectedServices.sectionHeaderTemplate = "flxVerifySelectedServices";
      var seglength = this.businessInfo["companyList"];
      var segData = [];
      for (var i = 0; i < seglength.length; i++) {
        var sectionData = [
          {
            flxVerifySelectedServices: {
              height: "50Dp",
            },
            flxMain: {
              skin: "sknFlxBgfbfbfbBor1pxTBe3e3e3",
              accessibilityConfig:{
                "a11yLabel":"Hide "+this.view.lblSelectedServices.text+" for "+this.businessInfo["companyList"][i]["companyDetails"][
                  "companyName"
                ],
                "a11yARIA":{
                  "tabindex":0,
                  "aria-expanded":true,
                  "role":"button"
                }
              },
              onClick: function (eventobject, context) {
                var scope = this;
                var segData = scope.view.segSelectedServices.data;
                var sectionData = segData[context.sectionIndex];
                var updateParams = {
                  lblDropDown: {
                    isVisible:true,
                    text: "P",
                    skin: "sknlbldropdown",
                    accessibilityConfig: {
                      "a11yHidden":true,
                      "a11yARIA": {
                        "tabindex": -1
                      }
                    }
                  },
                  flxAllFeatureRow: {
                    isVisible: true
                  }
                };
                var updateCollapseParams = {
                  lblDropDown: {
                    isVisible:true,
                    text: "O",
                    skin: "sknlbldropdown",
                    accessibilityConfig: {
                      "a11yHidden":true,
                      "a11yARIA": {
                        "tabindex": -1
                      }
                    }
                  },
                  flxAllFeatureRow: {
                    isVisible: false
                  }
                };
                FormControllerUtility.showProgressBar(scope.view);
                if (sectionData[0].lblDropDown.text === "O") {
                  segData[context.sectionIndex][0].lblDropDown = updateParams["lblDropDown"];
                  //segData[context.sectionIndex][0].lblDropDown = updateParams["flxAllFeatureRow"];
                  segData[context.sectionIndex][0].flxMain.accessibilityConfig={
                    "a11yLabel":"Hide "+scope.view.lblSelectedServices.text+" for "+segData[context.sectionIndex][0].lblCompanyName.text,
                    "a11yARIA":{
                      "tabindex":0,
                      "aria-expanded":true,
                      "role":"button"
                    }
                  };
                  segData[context.sectionIndex][1].forEach(function(element) {
                    element.flxEnrollBusinessSelectedServices.isVisible=true;
                  });
                } else {
                  segData[context.sectionIndex][0].lblDropDown = updateCollapseParams["lblDropDown"];
                 // segData[context.sectionIndex][0].lblDropDown = updateCollapseParams["flxAllFeatureRow"];
                  segData[context.sectionIndex][0].flxMain.accessibilityConfig={
                    "a11yLabel":"show "+scope.view.lblSelectedServices.text+" for "+segData[context.sectionIndex][0].lblCompanyName.text,
                    "a11yARIA":{
                      "tabindex":0,
                      "aria-expanded":false,
                      "role":"button"
                    }
                  };
                  segData[context.sectionIndex][1].forEach(function(element) {
                    element.flxEnrollBusinessSelectedServices.isVisible=false;
                  });
                }
                scope.view.segSelectedServices.setData(segData);
                scope.view.forceLayout();
                FormControllerUtility.hideProgressBar(scope.view);
                scope.adjustScreen(30);
                scope.view.segSelectedServices.setActive(-1,context.sectionIndex,"flxVerifySelectedServices.flxMain")
              }.bind(this)
            },
            flxAllFeatureRow: {
              skin: "slFboxffffff",
            },
            lblDropDown: {
              skin: "sknlbldropdown",
              text: "P",
              isVisible:true,
              accessibilityConfig: {
                "a11yHidden":true,
                "a11yARIA": {
                  "tabindex": -1
                }
              }
            },
            lblCompanyName: {
              skin: "bbSknLbl424242SSP15Px",
              text: this.businessInfo["companyList"][i]["companyDetails"][
                "companyName"
              ], //"data"+i,//
            },
          },
        ];
        var features = this.prepareSelectedServicesSegmentData(
          this.businessInfo["selectedFeatures" + i]
        );
        sectionData.push(features);
        segData.push(sectionData);
      }
      this.view.segSelectedServices.widgetDataMap = {
        flxVerifySelectedServices: "flxVerifySelectedServices",
        flxMain: "flxMain",
        flxAllFeatureRow: "flxAllFeatureRow",
        lblDropDown: "lblDropDown",
        lblCompanyName: "lblCompanyName",
        lblActiveSelection1: "lblActiveSelection1",
        flxEnrollBusinessSelectedServices:"flxEnrollBusinessSelectedServices",
        lblName: "lblName",
        imgWarning: "imgWarning",
        lblWarning: "lblWarning"
      };
      segData[0][0]["flxAllFeatureRow"]={
        "isVisible":false,
      }
      this.view.segSelectedServices.setData(segData);
      if(segData[0][1].length === 0) {
        this.view.segSelectedServices.setVisibility(false);
        this.view.flxDataUnavailable.setVisibility(true);
      }else {
        this.view.segSelectedServices.setVisibility(true);
        this.view.flxDataUnavailable.setVisibility(false);
      }
      this.view.formActionsNew.btnNext.onClick = this.onSubmit.bind(this);
      this.view.btnSelectedServicesEdit.onClick = this.showAllFeaturesUI.bind(
        this,
        true
      );
      this.view.flxDetailsHeader.isVisible = false;
      this.view.flxUserDetailHeader.isVisible = false;
      this.view.flxVerifyDetailsHeader.isVisible = true;
      this.view.btnEditUserDetails.isVisible = false;
      this.view.btnTermsAndConditions.onClick = function () {
        this.loadEnrollModule().presentationController.fetchTermsAndConditions();
      }.bind(this);
      var userDetails = {};
      var domainDetails = {};
      var fullName =  kony.i18n.getLocalizedString("i18n.konybb.manageUser.FullName");
      var dob = kony.i18n.getLocalizedString("i18n.Enroll.DOB");
      var ssn = kony.i18n.getLocalizedString("i18n.userMgmt.createUserManuallySSN");
      var email = kony.i18n.getLocalizedString("i18n.konybb.manageUser.EmailID");
      var mobile = kony.i18n.getLocalizedString("i18n.login.CantSignIn.MobileNumber");
      var contractName = kony.i18n.getLocalizedString("i18n.userManagement.contactName");
      var service = kony.i18n.getLocalizedString("kony.mb.Location.Services");
      var defaultRole = kony.i18n.getLocalizedString("i18n.userManagement.defaultRole");
      if (this.isCustomerCentric) {
        userDetails[fullName] = this.businessInfo["userDetails"]["fullName"],
          userDetails[dob] = this.businessInfo["userDetails"]["DOB"],
          userDetails[ssn] = this.maskData(
          this.businessInfo["userDetails"]["SSN"],
          3
        ),
//         userDetails = {
//           "Full Name": this.businessInfo["userDetails"]["fullName"],
//           dob: this.businessInfo["userDetails"]["DOB"],
//           ssn: this.maskData(
//             this.businessInfo["userDetails"]["SSN"],
//             3
//           ),
//         };
          domainDetails[contractName] = this.businessInfo["domainDetails"]["domainName"],
          domainDetails[service] = this.businessInfo["domainDetails"]["domainType"],
          domainDetails[defaultRole] = this.businessInfo["domainDetails"]["domainRole"],
//         domainDetails = {
//           contractName: this.businessInfo["domainDetails"]["domainName"],
//           service: this.businessInfo["domainDetails"]["domainType"],
//           defaultRole: this.businessInfo["domainDetails"]["domainRole"],
//         };
        this.view.segDomainDetails.setData(
          this.prepareUserSegmentData(domainDetails)
        );
        this.view.TabBodyCompanyDetails.segTemplates.sectionHeaderTemplate =
          "flxEnrollBusinessCompanyDetailsHeader";
        this.view.btnEditDomainDetails.onClick =
          this.onDomainDetailsEditClick.bind(this);
        this.view.btnEditCompanyDetails.isVisible = false;
        this.setCompanyDetailsDataSegmentData();
        if (this.masterServiceKey === "") {
          this.masterServiceKey =
            this.businessInfo[
              "companyList"
            ][0].companyDetails.serviceKey.MFAAttributes.serviceKey;
        }
      } else {
        userDetails = {
          fullName: this.businessInfo["userDetails"]["fullName"],
          email: this.businessInfo["userDetails"]["emailAddress"],
          mobile: this.businessInfo["userDetails"]["mobileNumber"],
          ssn: this.maskData(
            this.businessInfo["userDetails"]["SSN"],
            3
          ),
        };
        this.view.flxDomainDetails.isVisible = false;
        this.view.flxDomainDetailsSegment.isVisible = false;
        this.view.flxSeparator10.isVisible = false;
        this.view.flxSeparator11.isVisible = false;
        this.view.TabBodyCompanyDetails.segTemplates.sectionHeaderTemplate =
          "flxEnrollBusinessCompanyDetailsWitoutCIFHeader";
        this.view.btnEditCompanyDetails.onClick =
          this.showCompanyDetailsUI.bind(this, true);
        this.setCompanyDetailsDataSegmentData();
      }
      this.view.segUserDetails.setData(
        this.prepareUserSegmentData(userDetails)
      );
      this.view.formActionsNew.btnOption.setVisibility(true);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.BACK"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.onClick =
        this.showAllFeaturesUI.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    showTermsAndConditions: function (data) {
      this.view.setContentOffset(
        {
          x: "0%",
          y: "0%",
        },
        true
      );
      this.view.rtxTC.text = data;
      this.view.flxTermsAndConditions.isVisible = true;
      this.view.flxClose.onClick = function () {
        this.view.flxTermsAndConditions.isVisible = false;
        this.adjustScreen(30);
        this.view.btnTermsAndConditions.setActive(true);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.view.lblTermsAndConditions.setActive(true);
    },

    prepareUserSegmentData: function (userObj) {
      var data = [];
      for (var i in userObj) {
        data.push({
          lblLeftSideContent: i + ":",
          lblRIghtSideContent: userObj[i],
        });
      }
      return data;
    },

    prepareSelectedServicesSegmentData: function (selectedServices) {
      var data = [];
      for (var i in selectedServices) {
        data.push({
          flxEnrollBusinessSelectedServices:{
            "isVisible":true,
            accessibilityconfig: {
              a11yARIA:{
                "tabindex":-1
              }
            },
          },
          lblActiveSelection1: {
            skin:
              selectedServices[i]["lblCheckFeature"]["text"] === "C" ||
              selectedServices[i]["lblCheckFeature"]["text"] === "F"
                ? "sknBBLblOLBFontsActive04A615"
                : "sknBBLblOLBFontsInActiveC0C0C0",
            accessibilityConfig: {
              "a11yHidden":true,
              "a11yARIA": {
                "tabindex": -1
              }
            }
          },
          lblName: selectedServices[i]["lblFeatureName"],
        });
      }
      return data;
    },

    setCompanyDetailsDataSegmentData: function () {
      if (this.isCustomerCentric) {
        this.view.TabBodyCompanyDetails.addOnlySectionHeaders(
          this.getSectionHeadersForCompanyDetails()
        );
      } else {
        var res = [[]];
        res[0].push(this.getSectionHeadersForCompanyDetailsWithoutCIF(0));
        res[0].push(this.getAccountDetailsForSelectedCompany(0));
        this.view.TabBodyCompanyDetails.segTemplates.setData(res);
        this.view.TabBodyCompanyDetails.setSectionData([
          this.getSectionHeadersForCompanyDetailsWithoutCIF(0),
        ]);
      }
    },

    // Customer centric - Edit accounts onclick method
    onEditAccountsClick: function (sectionIndex) {
      this.verifyCompanyDetailsBusinessAccountsUI(sectionIndex, true);
    },

    // Customer centric - Delete company onclick method
    onDeleteCompanyClick: function (sectionIndex) {
      this.showDeletePopUp(sectionIndex);
    },

    // Customer Centric - Edit Domain Details onclick method
    onDomainDetailsEditClick: function () {
      this.setDomainDetails(true);
    },

    // Account Centric - Edit Account Details
    onEditAccountDetailsAccountCentricFlow: function () {
      this.showAddAccountsScreen(true);
    },

    //WidgetDataMap For Company Details Segement
    getWidgetDataMapForCompanyDetailsSegment: function () {
      var widgetDataMap = {
        lblCompanyNameValue: "lblCompanyNameValue",
        lblDropDown: "lblDropDown",
        lblAccountSelect: "lblAccountSelect",
        btnReset: "btnReset",
        btnEdit: "btnEdit",
        lblCompanyDetailsHeader: "lblCompanyDetailsHeader",
        lblCompanyName: "lblCompanyName",
        lblCompanyType: "lblCompanyType",
        lblCompanyTaxID: "lblCompanyTaxID",
        lblCompanyCIF: "lblCompanyCIF",
        lblCompanyNameValue: "lblCompanyNameValue",
        lblCompanyTypeValue: "lblCompanyTypeValue",
        lblCompanyTaxIDValue: "lblCompanyTaxIDValue",
        lblCompanyCIFValue: "lblCompanyCIFValue",
        lblBusinessAccounts: "lblBusinessAccounts",
        btnAccountName: "btnAccountName",
        imgSortTempName: "imgSortTempName",
        btnAccountNumber: "btnAccountNumber",
        imgRequestType: "imgRequestType",
        btnAccountType: "btnAccountType",
        imgAccountType: "imgAccountType",
        btnEditAccounts: "btnEditAccounts",
        lblAccountName: "lblAccountName",
        flxAccountName:"flxAccountName",
        flxAccountNumber:"flxAccountNumber",flxAccountType:"flxAccountType",

        lblAccountNumber: "lblAccountNumber",
        lblAccountType: "lblAccountType",
        lblHeadingTop: "lblHeadingTop",
        lblHeadingAccounts1: "lblHeadingAccounts1",
        lblHeadingAccounts2: "lblHeadingAccounts2",
        lblHeadingBottom: "lblHeadingBottom",
        lblEmailAddress: "lblEmailAddress",
        lblTelephoneNum: "lblTelephoneNum",
        lblEmailAddressValue: "lblEmailAddressValue",
        lblTelephoneNumVal: "lblTelephoneNumVal",
        lblFaxNumber: "lblFaxNumber",
        lblFaxValue: "lblFaxValue",
        lblCompanyAddress: "lblCompanyAddress",
        lblCompanyAddressVal: "lblCompanyAddressVal",
        lblCompanyAddressVal1: "lblCompanyAddressVal1",
        lblCompanyAddressVal2: "lblCompanyAddressVal2",
        flxCompanySelectionSubHeader: "flxCompanySelectionSubHeader",
        flxDropDown: "flxDropDown",
        lblRowSeperator: "lblRowSeperator",
        lblUserRole: "lblUserRole",
        lblUserRoleVal: "lblUserRoleVal",
        flxCompanyDetail9: "flxCompanyDetail9",
        flxCompanyDetail2: "flxCompanyDetail2",
        flxCompanyDetail5: "flxCompanyDetail5",
        flxCompanySelectionHeader: "flxCompanySelectionHeader",
      };
      return widgetDataMap;
    },

    getSectionHeadersForCompanyDetails: function() {
      var scope = this;
      var res = [];
      var companyList = CommonUtilities.cloneJSON(this.businessInfo["companyList"]);
      var flagSortAccName = true;
      var flagSortAccNumber = true;
      var flagSortAccType = true;
      companyList.forEach(function(element) {
          res.push({
              lblAccountSelect: {
                  text: element["companyDetails"]["companyName"],
              },
              lblDropDown: {
                  text: "O",
                  accessibilityConfig: {
                      "a11yHidden":true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  }
              },
              flxDropDown: {
                  accessibilityConfig: {
                      "a11yLabel": "Show Details for "+element["companyDetails"]["companyName"],
                      "a11yARIA": {
                          "tabindex": 0,
                          "role": "button",
                          "aria-expanded": false
                      }
                  },
                  onClick: scope.DropDownonClick,
              },
              flxCompanySelectionSubHeader: {
                  isVisible: false,
              },
              lblCompanyNameValue: {
                  text: element["companyDetails"]["companyName"],
              },
              lblCompanyTaxIDValue: {
                  text: scope.maskData(element["companyDetails"]["taxId"], 5)===""?"None":scope.maskData(element["companyDetails"]["taxId"], 5),
              },
              lblCompanyCIFValue: {
                  text: element["companyDetails"]["CIF"],
              },
              btnReset: {
                  text: kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
                  isVisible: false,
              },
              lblCompanyDetailsHeader: {
                  text: kony.i18n.getLocalizedString("i18n.konybb.Auth.CompanyDetails"),
              },
              lblCompanyName: {
                  text: kony.i18n.getLocalizedString("i18n.common.companyName") + ":",
              },
              lblCompanyTaxID: {
                  text: kony.i18n.getLocalizedString("i18n.common.taxId") + ":",
              },
              lblCompanyCIF: {
                  text: kony.i18n.getLocalizedString("i18n.konybb.Auth.CIFNumber") + ":",
              },
              lblBusinessAccounts: {
                  text: kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"),
              },
              btnAccountName: {
                  text: kony.i18n.getLocalizedString("i18n.transfers.accountName"),
                  accessibilityConfig : {
                      "a11yLabel": "Account Name Coloumn, No Sort Applied, click here to sort in ascending order",
                      "a11yARIA": {
                          "role": "button",
                          "tabindex": 0
                      }
                  },
                  onClick: function(eventobject, context) {
                      if (flagSortAccName) {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountName", "ObjectText", "Asc");
                      } else {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountName", "ObjectText", "Desc");
                      }
                      flagSortAccName = !flagSortAccName;
                  }.bind(this),
              },
              imgSortTempName: {
                  isVisible: false,
                  accessibilityConfig : {
                      "a11yHidden": true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  },
              },
              btnAccountNumber: {
                  text: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                  accessibilityConfig : {
                      "a11yLabel": "Account Number Coloumn, No Sort Applied, click here to sort in ascending order",
                      "a11yARIA": {
                          "role": "button",
                          "tabindex": 0
                      }
                  },
                  onClick: function(eventobject, context) {
                      if (flagSortAccNumber) {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Asc");
                      } else {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Desc");
                      }
                      flagSortAccNumber = !flagSortAccNumber;
                  }.bind(this),
              },
              imgRequestType: {
                  isVisible: false,
                  accessibilityConfig : {
                      "a11yHidden": true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  },
              },
              btnAccountType: {
                  text: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
                  accessibilityConfig : {
                      "a11yLabel": "Account Type Coloumn, No Sort Applied, click here to sort in ascending order",
                      "a11yARIA": {
                          "role": "button",
                          "tabindex": 0
                      }
                  },
                  onClick: function(eventobject, context) {
                      if (flagSortAccType) {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Asc");
                      } else {
                          scope.view.TabBodyCompanyDetails.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
                      }
                      flagSortAccType = !flagSortAccType;
                  }.bind(this),
              },
              imgAccountType: {
                  isVisible: false,
                  accessibilityConfig : {
                      "a11yHidden": true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  },
              },
              btnEditAccounts: {
                  text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                  accessibilityConfig:{
                    "a11yLabel":kony.i18n.getLocalizedString("i18n.billPay.Edit")+" "+kony.i18n.getLocalizedString("i18n.accounts.businessAccounts")
                  }
              },
              lblHeadingTop: {
                  text: "-",
                  isVisible: true,
                  accessibilityConfig: {
                      "a11yHidden":true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  }
              },
              lblHeadingAccounts1: {
                  text: "-",
                  accessibilityConfig: {
                      "a11yHidden":true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  }
              },
              lblHeadingAccounts2: {
                  text: "-",
                  accessibilityConfig: {
                     "a11yHidden":true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  }
              },
              flxCompanyDetail5: {
                  isVisible: false,
              },
              flxCompanyDetail2: {
                  isVisible: false,
              },
              lblHeadingBottom: {
                  isVisible: false,
                  text: "-",
                  accessibilityConfig : {
                      "a11yHidden": true,
                      "a11yARIA": {
                          "tabindex": -1
                      }
                  },
              },
          });
      });
      return res;
  },
    DropDownonClick: function (eventobject, context) {
      var scope = this;
      var segData = scope.view.TabBodyCompanyDetails.segTemplates.data;
      var sectionData = segData[context.sectionIndex];
      var updateParams = {
        lblDropDown: {
          text: "P",
          accessibilityConfig: {
            "a11yHidden":true,
            "a11yARIA": {
              "tabindex": -1
            }
          }
        },
        flxDropDown: {
          accessibilityConfig: {
            "a11yLabel": "Hide Details for "+segData[context.sectionIndex][0]["lblAccountSelect"].text,
            "a11yARIA": {
              "tabindex": 0,
              "role": "button",
              "aria-expanded": true
            }
          },
          onClick: this.DropDownonClick,

        },
        flxCompanySelectionSubHeader: {
          isVisible: true,
        },
        lblHeadingTop: {
          isVisible: true,
        },
        btnReset: {
          text: kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
          isVisible: scope.isSubmitted || scope.businessInfo["companyList"].length === 1 ? false : true,
          onClick: scope.onDeleteCompanyClick.bind(this, context.sectionIndex),
        },
        btnEditAccounts: {
          isVisible: scope.isSubmitted ? false : true,
          onClick: scope.onEditAccountsClick.bind(this, context.sectionIndex),
          accessibilityConfig:{
            "a11yLabel":kony.i18n.getLocalizedString("i18n.billPay.Edit")+" "+kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"),
            "a11yARIA":{
              "tabindex":0
            }
          }
        },
      };
      var updateCollapseParams = {
        lblDropDown: {
          text: "O",
          accessibilityConfig: {
            "a11yHidden":true,
            "a11yARIA": {
              "tabindex": -1
            }
          }
        },
        flxDropDown: {
          accessibilityConfig: {
            "a11yLabel": "Show Details for "+segData[context.sectionIndex][0]["lblAccountSelect"].text,
            "a11yARIA": {
              "tabindex": 0,
              "role": "button",
              "aria-expanded": false
            }
          },
          onClick: this.DropDownonClick,


        },
        flxCompanySelectionSubHeader: {
          isVisible: false,
        },
        lblHeadingTop: {
          isVisible: true,
        },
        btnReset: {
          isVisible: false,
        },
      };
      FormControllerUtility.showProgressBar(scope.view);
      if (sectionData[0].lblDropDown.text === "O") {
        scope.view.TabBodyCompanyDetails.addRowsAndUpdateSection(scope.getAccountDetailsForSelectedCompany(context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
        var segData = scope.view.TabBodyCompanyDetails.segTemplates.data;
        var sectionHeaderData = [];
        segData.forEach(function (element) {
          sectionHeaderData.push(element[0]);
        });
        scope.view.TabBodyCompanyDetails.setSectionData(sectionHeaderData);
      } else {
        scope.view.TabBodyCompanyDetails.collapseSection(updateCollapseParams);

      }
      FormControllerUtility.hideProgressBar(scope.view);
      scope.adjustScreen(30);
      scope.view.TabBodyCompanyDetails.segTemplates.setActive(context.rowIndex, context.sectionIndex, "flxEnrollBusinessCompanyDetailsHeader.flxCompanySelectionHeader.flxDropDown");
    },
    //converts accounts data as required for row template
    getAccountDetailsForSelectedCompany: function (index) {
      var scope = this;
      var res = [];
      var accountDetails = [];
      if (
        !kony.sdk.isNullOrUndefined(
          this.businessInfo["companyList"][index]["accountDetails"]
        )
      ) {
        if (this.isCustomerCentric) {
          accountDetails = CommonUtilities.cloneJSON(
            this.businessInfo["companyList"][index]["accountDetails"][1]
          );
        } else {
          accountDetails = CommonUtilities.cloneJSON(
            this.businessInfo["companyList"][index]["accountDetails"]
          );
        }

        accountDetails.forEach(function (element, i) {
          if (
            scope.isCustomerCentric &&
            element["lblSelectAllValue"]["text"] === "D"
          ) {
            return;
          } else {
            res.push({
              lblAccountName: {
                text: scope.isCustomerCentric
                  ? element["lblAccountNameValue"]["text"]
                  : element["lblAccountName"]["text"],
                  accessibilityconfig: {
                    a11yARIA:{
                      "tabindex":-1
                    }
                  },
              },
              lblAccountNumber: {
                text: scope.isCustomerCentric
                  ? element["lblAccountNumberValue"]["text"] + ""
                  : element["lblAccountNumber"]["text"] + "",
                  accessibilityconfig: {
                    a11yARIA:{
                      "tabindex":-1
                    }
                  },
              },
              lblAccountType: {
                text: scope.isCustomerCentric
                  ? element["lblAccountTypeValue"]["text"]
                  : element["lblAccountType"]["text"],
                  accessibilityconfig: {
                    a11yARIA:{
                      "tabindex":-1
                    }
                  },
              },
              lblRowSeperator: {
                isVisible: true,
                text: "-",
                accessibilityConfig: {
                  "a11yHidden":true,
                  "a11yARIA": {
                    "tabindex": -1
                  }
                }
              },
            });
          }
        });
      }
      return res;
    },

    getSectionHeadersForCompanyDetailsWithoutCIF: function (index) {
      var element = CommonUtilities.cloneJSON(this.businessInfo["companyList"][index]);
      var flagSortAccName = true;
      var flagSortAccNumber = true;
      var flagSortAccType = true;
      var res = {
        lblAccountSelect: {
          text: element["companyDetails"]["companyName"],
        },
        lblCompanyNameValue: {
          text: element["companyDetails"]["companyName"],
        },
        lblCompanyTaxIDValue: {
          text: this.maskData(element["companyDetails"]["taxID"], 5)===""?"None":this.maskData(element["companyDetails"]["taxID"], 5),
        },
        lblEmailAddressValue: {
          text: element["companyDetails"]["emailAddress"],
        },
        lblTelephoneNumVal: {
          text: element["companyDetails"]["telephoneNumber"],
        },
        lblFaxValue: {
          text:
            element["companyDetails"]["faxID"] === ""
              ? "N/A"
              : element["companyDetails"]["faxID"],
        },
        lblCompanyAddressVal: {
          text: element["companyDetails"]["companyAddress"],
        },
        lblCompanyAddressVal1: {
          text: element["companyDetails"]["companyAddress1"],
        },
        lblCompanyAddressVal2: {
          text: element["companyDetails"]["companyAddress2"],
        },
        flxCompanyDetail9: {
          isVisible: true,
        },
        flxCompanyDetail2: {
          isVisible: true,
        },
        lblCompanyType: {
          text:
            kony.i18n.getLocalizedString(
              "kony.i18n.businessEnroll.companyType"
            ) + ":",
        },
        lblCompanyTypeValue: {
          text: element["companyDetails"]["companyType"],
        },
        lblUserRole: {
          text:
            kony.i18n.getLocalizedString(
              "kony.i18n.businessEnroll.roleInCompany"
            ) + ":",
        },
        lblUserRoleVal: {
          text: element["companyDetails"]["companyRole"],
        },
        lblTelephoneNum: {
          text:
            kony.i18n.getLocalizedString("i18n.common.telephoneNumber") + ":",
        },
        lblCompanyDetailsHeader: {
          text: kony.i18n.getLocalizedString("i18n.konybb.Auth.CompanyDetails"),
        },
        lblCompanyName: {
          text: kony.i18n.getLocalizedString("i18n.common.companyName") + ":",
        },
        lblCompanyTaxID: {
          text: kony.i18n.getLocalizedString("i18n.common.taxId") + ":",
        },
        lblCompanyCIF: {
          text: kony.i18n.getLocalizedString("i18n.konybb.Auth.CIFNumber"),
        },
        lblBusinessAccounts: {
          text: kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"),
        },
        btnAccountName: {
          text: kony.i18n.getLocalizedString(
            "kony.i18n.common.accountHolderName"
          ),
          onClick: function (eventobject, context) {
            if (flagSortAccName) {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountName",
                "ObjectText",
                "Asc"
              );
            } else {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountName",
                "ObjectText",
                "Desc"
              );
            }
            flagSortAccName = !flagSortAccName;
          }.bind(this),
        },
        imgSortTempName: {
          isVisible: false,
          accessibilityConfig : {
            "a11yHidden": true,
            "a11yARIA": {
                "tabindex": -1
            }
        },
        },
        btnAccountNumber: {
          text: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
          onClick: function (eventobject, context) {
            if (flagSortAccNumber) {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountNumber",
                "ObjectNumber",
                "Asc"
              );
            } else {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountNumber",
                "ObjectNumber",
                "Desc"
              );
            }
            flagSortAccNumber = !flagSortAccNumber;
          }.bind(this),
        },
        imgRequestType: {
          isVisible: false,
        },
        btnAccountType: {
          text: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
          onClick: function (eventobject, context) {
            if (flagSortAccType) {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountType",
                "ObjectText",
                "Asc"
              );
            } else {
              this.view.TabBodyCompanyDetails.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountType",
                "ObjectText",
                "Desc"
              );
            }
            flagSortAccType = !flagSortAccType;
          }.bind(this),
        },
        imgAccountType: {
          isVisible: false,
        },
        btnEditAccounts: {
          text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
          isVisible: this.isSubmitted ? false : true,
          onClick: this.onEditAccountDetailsAccountCentricFlow.bind(this),
          accessibilityConfig:{
            "a11yLabel":kony.i18n.getLocalizedString("i18n.billPay.Edit")+" "+kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"),
            "a11yARIA":{
              "tabindex":0
            }
          }
        },
        lblHeadingTop: {
          text: "-",
          isVisible: false,
        },
        lblHeadingAccounts1: {
          text: "-",
        },
        lblHeadingAccounts2: {
          text: "-",
        },
        lblHeadingBottom: {
          text: "-",
        },
        lblEmailAddress: {
          text:
            kony.i18n.getLocalizedString("i18n.konybb.manageUser.EmailID") +
            ":",
        },
        lblFaxNumber: {
          text: "Fax Number" + ":",
        },
        lblCompanyAddress: {
          text:
            kony.i18n.getLocalizedString("i18n.common.companyAddress") + ":",
        },
        btnEdit: {
          text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
          isVisible: this.isSubmitted ? false : true,
        },
        flxCompanySelectionHeader: {
          isVisible: false,
        },
      };
      return res;
    },

    // Function to mask SSN and Taxid in verify and acknowledgment pages
    maskData: function (data, len) {
      var stringAccNum = "" + data;
      var isLastDigits = function (index) {
        return index > stringAccNum.length - (len + 1);
      };
      return stringAccNum
        .split("")
        .map(function (c, i) {
          return isLastDigits(i) ? c : "*";
        })
        .join("");
    },

    /* Function to show pop up when delete company is clicked in verify details page*/
    showDeletePopUp: function (index) {
      var scope = this;
      this.view.flxCancelPopup.height = "100%";
      this.view.setContentOffset(
        {
          x: "0%",
          y: "0%",
        },
        true
      );
      this.view.PopupHeaderUM.isVisible =true;
      this.view.PopupHeaderUM.btnNo.text =
        kony.i18n.getLocalizedString("i18n.common.no");
      this.view.PopupHeaderUM.btnYes.text =
        kony.i18n.getLocalizedString("i18n.common.yes");
      this.view.PopupHeaderUM.lblPopupMessage.text =
        kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.deleteCompanyMessage"
        );
      this.view.PopupHeaderUM.lblPopupMessage.skin = "slLabel0d8a72616b3cc47";
      this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "kony.i18n.businessEnroll.deleteCompanyHeader"
      );
      this.view.PopupHeaderUM.flxCross.onClick = this.closePopUp.bind(this);
      this.view.PopupHeaderUM.btnNo.onClick = this.closePopUp.bind(this);
      this.view.PopupHeaderUM.btnYes.onClick = function () {
        this.view.flxCancelPopup.setVisibility(false);
        this.adjustScreen(30);
        this.businessInfo["companyList"].splice(index, 1);
        this.showVerifyDetailsUI();
        var updateCollapseParams = {
          lblDropDown: {
            text: "O",
            accessibilityConfig: {
              "a11yHidden":true,
              "a11yARIA": {
                "tabindex": -1
              }
            }
          },
          flxCompanySelectionSubHeader: {
            isVisible: false,
          },
          lblHeadingTop: {
            isVisible: true,
          },
          btnReset: {
            isVisible: false,
          },
        };
        this.view.TabBodyCompanyDetails.collapseSection(updateCollapseParams);
      }.bind(this);
      this.view.flxCancelPopup.setVisibility(true);
      this.adjustScreen(30);
    },

    /*Fuction to close the pop up*/
    closePopUp: function () {
      this.view.flxCancelPopup.setVisibility(false);
      this.adjustScreen(30);
      if(btnFlag!==""){
            btnFlag.setActive(true);
            btnFlag="";
            }
      
    },

    /* Method to display error message */
    setErrorMessage: function (errorText) {
      this.view.flxErrorMessage.setVisibility(true);
      this.view.lblShowErrorMessage.text = errorText;
      this.view.flxErrorMessage.setFocus();
      this.adjustScreen(30);
    },

    /* Method to display service error message */
    showServiceError: function (errMsg) {
      this.view.flxErrorMessage.setVisibility(true);
      this.view.flxErrorMessage.setFocus();
      if (!kony.sdk.isNullOrUndefined(errMsg.errorMessage))
        this.view.lblShowErrorMessage.text = errMsg.errorMessage;
      else if (!kony.sdk.isNullOrUndefined(errMsg.serverErrorRes))
        this.view.lblShowErrorMessage.text = errMsg.serverErrorRes.dbpErrMsg;
      else
        this.view.lblShowErrorMessage.text = kony.i18n.getLocalizedString(
          "i18n.common.errorCodes.11025"
        );
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
    },

    /* Method to reset error message */
    resetErrorMessage: function () {
      this.view.flxErrorMessage.setVisibility(false);
      this.adjustScreen(30);
    },

    /* Method will validate the ssn number on text changed */
    onEnteringSSNWithoutCIF: function () {
      if (
        !this.validationUtilManager.isValidSSNNumber(
          this.view.tbxSSNWithOutCIF.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.tbxSSNWithOutCIF.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("i18n.login.incorrectSSN")
        );
      } else {
        this.view.tbxSSNWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.resetErrorMessage();
        this.enableDisabledProceedOnValidPersonalDetails();
      }
    },

    /* Method will execute on email text changed */
    onEnteringEmailWithoutCIF: function () {
      if (
        !this.validationUtilManager.isValidEmail(
          this.view.tbxEmailWithOutCIF.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.tbxEmailWithOutCIF.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString(
            "i18n.konybb.createUser.error.InvalidEmail"
          )
        );
      } else {
        this.resetErrorMessage();
        this.view.tbxEmailWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.enableDisabledProceedOnValidPersonalDetails();
      }
    },

    /* Method will validate the entered phone number */
    onEnteringPhoneNumberWithoutCIF: function () {
      if (
        !this.validationUtilManager.isValidPhoneNumber(
          this.view.tbxPhoneNumWithOutCIF.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.tbxPhoneNumWithOutCIF.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("i18n.profile.notAValidPhoneNumber")
        );
      } else {
        this.resetErrorMessage();
        this.view.tbxPhoneNumWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.enableDisabledProceedOnValidPersonalDetails();
      }
    },

    /* Method will validate the entered DOB */
    onEnteringDOBWithoutCIF: function () {
      var dateObj = this.view.customDateWithOutCIF.getDateObject();

      if (
        CommonUtilities.isEmptyString(
          this.view.customDateWithOutCIF.getText()
        ) ||
        !this.validationUtilManager.isAgeValid(
          this.view.customDateWithOutCIF.getText()
        ) ||
        dateObj.status > 0
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.flxDOBWithOutCIF.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString(
            "i18n.konybb.createUser.error.InvalidDOB"
          )
        );
      } else {
        this.resetErrorMessage();
        this.view.flxDOBWithOutCIF.skin = "skne3e3e3br3pxradius"; //Default skin
        this.enableDisabledProceedOnValidPersonalDetails();
      }
    },

    /* Method to handle continue button in about you withoutcif form. */
    onPersonalDetailsBtnContinueClickWithoutCIF: function () {
      //service call required to fetch type of organisation and saving user details in global variable.
      var navManager = applicationManager.getNavigationManager();
      var enrolBusines = navManager.getCustomInfo("enrollPersonal");
      this.businessInfo["userDetails"] = {
        fullName:
          this.view.tbxNameWithOutCIF.text +
          " " +
          this.view.tbxMiddleNameWithOutCIF.text +
          " " +
          this.view.tbxLastNameWithOutCIF.text,
        firstName: this.view.tbxNameWithOutCIF.text,
        middleName: this.view.tbxMiddleNameWithOutCIF.text,
        lastName: this.view.tbxLastNameWithOutCIF.text,
        DOB: this.view.customDateWithOutCIF.getText(),
        emailAddress: this.view.tbxEmailWithOutCIF.text,
        mobileNumber: this.view.tbxPhoneNumWithOutCIF.text,
        SSN: this.view.tbxSSNWithOutCIF.text,
        legalEntityId: enrolBusines
      };
      this.loadEnrollModule().presentationController.fetchCountry();
      this.loadEnrollModule().presentationController.fetchState();
      this.loadEnrollModule().presentationController.fetchCity();
      this.loadEnrollModule().presentationController.fetchOrganizationTypes();
    },

    onBackBtnClickInAccountsscreenWithoutCIF: function () {
      //service call required to fetch type of organisation and saving user details in global variable.
      this.resetErrorMessage();
      this.isEditFlow = true;
      this.isBackFlow = true;
      this.loadEnrollModule().presentationController.fetchCountry();
      this.loadEnrollModule().presentationController.fetchState();
      this.loadEnrollModule().presentationController.fetchCity();
      this.loadEnrollModule().presentationController.fetchOrganizationTypes();
    },

    onCompanyDetailsBtnContinueClickWithoutCIF: function () {
      //service call required to fetch type of organisation and saving user details in global variable.
      this.saveCompanyDetails();
      this.showBusinessAccountsUI();
    },

    /* validate all user details */
    enableDisabledProceedOnValidPersonalDetails: function () {
      if (
        CommonUtilities.isEmptyString(this.view.tbxNameWithOutCIF.text) ||
        CommonUtilities.isEmptyString(this.view.tbxLastNameWithOutCIF.text) ||
        CommonUtilities.isEmptyString(this.view.tbxEmailWithOutCIF.text) ||
        !this.validationUtilManager.isValidEmail(
          this.view.tbxEmailWithOutCIF.text
        ) ||
        !this.validationUtilManager.isValidPhoneNumber(
          this.view.tbxPhoneNumWithOutCIF.text
        ) ||
        !this.validationUtilManager.isValidSSNNumber(
          this.view.tbxSSNWithOutCIF.text
        ) ||
        CommonUtilities.isEmptyString(
          this.view.customDateWithOutCIF.getText()
        ) ||
        !this.validationUtilManager.isAgeValid(
          this.view.customDateWithOutCIF.getText()
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
    },

    onSubmit: function () {
      var scope = this;
      var res = {};
      //  res["Type"] = "";
      res["contractName"] = "";
      res["serviceDefinitionName"] = "";
      res["serviceDefinitionId"] = "";
      res["faxId"] = "";
      //res["Description"] = "";
      res["communication"] = [];
      res["address"] = [];
      //  res["AccountsList"] = [];
      res["contractCustomers"] = [];

      res["authorizedSignatory"] = [];
      res["authorizedSignatoryRoles"] = [];
      // res["Membership"] = "[]";
      // res["features"] = [];
      res["serviceKey"] = "";
      var contractCustomerArr = [];
      var contractCutomerObj = {};
      var authSignArr = [];
      if (this.isCustomerCentric) {
        // res["Type"] = this.businessInfo["domainDetails"]["domainType"];
        res["contractName"] = this.businessInfo["domainDetails"]["domainName"];
        res["communication"] = "[]"; // Not required for Customer centric flow
        res["address"] = "[]"; // Not required for Customer centric flow
        res["serviceDefinitionName"] =
          this.businessInfo["domainDetails"].domainType;
        res["serviceDefinitionId"] = this.view.lstbTypeOfDomain.selectedKey;

        //For Accounts
        var companyAccountsData = this.businessInfo["companyList"];
        for (var i = 0; i < companyAccountsData.length; i++) {
          var companyaccounts = [];
          var excludeAccounts = [];
          for (let a = 0; a < companyAccountsData.length; a++) {
            var accountsres = [];
            var excludeAcc = [];
            var accData = companyAccountsData[a]["accountDetails"][1];
            for (let b = 0; b < accData.length; b++) {
              if (accData[b]["lblSelectAllValue"]["text"] === "C") {
                accountsres.push({
                  //"AccountHolder": JSON.stringify(element["accountHolderName"]["text"]),
                  accountId: accData[b]["lblAccountNumberValue"]["text"],
                  accountType: accData[b]["lblAccountTypeValue"]["text"],
                  accountName: accData[b]["accountName"]["text"],
                  // "Membership_id": element["lblAccountMembershipIdValue"]["text"],
                  //  "TaxId": element["lblAccountTaxIdValue"]["text"],
                  typeId: accData[b]["lblAccountTypeIdValue"]["text"],
                  ownerType: accData[b]["ownerType"]["text"],
                  arrangementId: "",
                  accountStatus: accData[b]["accountStatus"]["text"],
                  accountHolderName: accData[b]["accountHolderName"]["text"],
                  // "MembershipName": element["lblAccountMembershipNameValue"]["text"],
                  // "IsOrganizationAccount": true
                });
              } else {
                excludeAcc.push({
                  //"AccountHolder": JSON.stringify(element["accountHolderName"]["text"]),
                  accountId: accData[b]["lblAccountNumberValue"]["text"],
                  accountType: accData[b]["lblAccountTypeValue"]["text"],
                  accountName: accData[b]["accountName"]["text"],
                  // "Membership_id": element["lblAccountMembershipIdValue"]["text"],
                  //  "TaxId": element["lblAccountTaxIdValue"]["text"],
                  typeId: accData[b]["lblAccountTypeIdValue"]["text"],
                  ownerType: accData[b]["ownerType"]["text"],
                  arrangementId: "",
                  accountStatus: accData[b]["accountStatus"]["text"],
                  accountHolderName: accData[b]["accountHolderName"]["text"],
                  // "MembershipName": element["lblAccountMembershipNameValue"]["text"],
                  // "IsOrganizationAccount": true
                });
              }
            }
            companyaccounts.push(accountsres);
            excludeAccounts.push(excludeAcc);
          }

          var seglength = this.view.segAvailableFeatures.data;
          // selectedServices =[];
          var featureData = [];
          var companyservice = [];
          for (var j = 0; j < seglength.length; j++) {
            var selectedServices = [];
            selectedServices = this.businessInfo["selectedFeatures" + j];

            for (var k in selectedServices) {
              if (
                selectedServices[k]["lblCheckFeature"]["text"] === "C" ||
                selectedServices[k]["lblCheckFeature"]["text"] === "F"
              ) {
                var data = {
                  featureId: selectedServices[k]["featureId"],
                  featureName: selectedServices[k]["featureName"],
                  featureDescription: selectedServices[k]["featureDescription"],
                  actions: "[]",
                };
                featureData.push(data);
                companyservice.push(featureData);
              }
            }
          }

          contractCutomerObj = {
            isPrimary: i === 0 ? "true" : "false",
            coreCustomerId:
              this.businessInfo["companyList"][i].companyDetails.CIF,
            coreCustomerName:
              this.businessInfo["companyList"][i].companyDetails.companyName,
            isBusiness: "true",
            accounts: companyaccounts[i],
            excludedAccounts: excludeAccounts[i],
            features: companyservice[i],
          };
          contractCustomerArr.push(contractCutomerObj);
          var authSign = {
            coreCustomerId:
              this.businessInfo["companyList"][i].companyDetails.CIF,
            authorizedSignatoryRoleId:
              this.businessInfo["domainDetails"].domainRoleId,
          };
          authSignArr.push(authSign);
        }

        //contractCutomerObj.accounts = accountsres;

        //  res["AccountsList"] = JSON.stringify(accountsres);
        res["contractCustomers"] = JSON.stringify(contractCustomerArr);
        res["authorizedSignatoryRoles"] = JSON.stringify(authSignArr);
        // res["AuthorizedSignatoryGroupId"] = this.businessInfo["domainDetails"]["domainRoleId"];
        res["serviceKey"] = this.masterServiceKey;
      } else {
        companyData = this.businessInfo["companyList"][0]["companyDetails"];
        res["Type"] = companyData["companyType"];
        res["Name"] = companyData["companyName"];
        var communicationData = [];
        communicationData.push({
          Phone: companyData["telephoneNumber"],
          Email: companyData["emailAddress"],
        });
        res["Communication"] = JSON.stringify(communicationData);
        //Address Data
        addressData = [
          {
            country: companyData["country"],
            cityName: companyData["city"],
            state: companyData["state"],
            zipCode: companyData["zipCode"],
            addressLine1: companyData["addressLine1"],
            addressLine2: companyData["addressLine2"],
          },
        ];
        res["Address"] = JSON.stringify(addressData);
        //Accounts
        var companyAccountsData =
          this.businessInfo["companyList"][0]["accountDetails"];
        var accountsres = [];
        companyAccountsData.forEach(function (arrayElement, i) {
          accountsres.push({
            AccountHolder: JSON.stringify(
              arrayElement["lblAccountHolderName"]["text"]
            ),
            Account_id: arrayElement["lblAccountNumber"]["text"],
            AccountName: arrayElement["lblAccountType"]["text"],
            Membership_id: "",
            TaxId: companyData["taxID"],
            Type_id: arrayElement["lblTypeId"]["text"],
            IsOrganizationAccount: true,
          });
        });
        res["AccountsList"] = JSON.stringify(accountsres);
        res["AuthorizedSignatoryGroupId"] = companyData["companyRoleId"];
        res["serviceKey"] =
          this.businessInfo["companyList"][0]["companyDetails"]["serviceKey"];
      }
      //Common code for both flows
      //Authorised Signatory Data
      var authorizedSignatoryData = [];
      authorizedSignatoryData.push({
        FirstName: this.businessInfo["userDetails"]["firstName"],
        LastName: this.businessInfo["userDetails"]["lastName"],
        DateOfBirth: scope.isCustomerCentric
          ? this.businessInfo["userDetails"]["DOB"]
          : CommonUtilities.sendDateToBackend(
              this.businessInfo["userDetails"]["DOB"]
            ),
        Ssn: this.businessInfo["userDetails"]["SSN"],
      });
      res["legalEntityId"] = this.businessInfo["userDetails"]["legalEntityId"];
      res["authorizedSignatory"] = JSON.stringify(authorizedSignatoryData);
      //feature Data
      // var featureData = [];

      // contractCustomerArr.push(contractCutomerObj);
      // res["contractCustomers"] = JSON.stringify(contractCustomerArr);

      //contractinfo.features = featureData ;

      //  res["features"] = JSON.stringify(featureData);
      this.loadEnrollModule().presentationController.enrollOrganization(res);
    },

    showAcknowledgementUI: function (data) {
      referenceId = data.contractId;
      this.resetUI();
      this.isSubmitted = true;
      this.view.flxAcknowledgement.isVisible = true;
      this.view.flxAcknowledgement.setFocus();
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.common.Acknowledgement"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.flxVerifyDetials.isVisible = true;
      this.view.flxDetailsHeader.isVisible = false;
      this.view.flxVerifyDetailsHeader.isVisible = true;
      this.view.lblverifyDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.konybb.common.UserDetails"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblverifyDetailsHeader.text=kony.i18n.getLocalizedString("i18n.konybb.common.UserDetails");
      this.view.btnEditUserDetails.isVisible = false;
      this.view.flxUserDetailHeader.isVisible = false;
      this.view.flxVerifyDetials.top = "30dp";
      this.view.flxVerifyDetials.skin = "slfBoxffffffB1R5";
      this.view.flxContent.skin = "skne3e3e3Bor";
      this.view.btnSelectedServicesEdit.isVisible = false;
      this.view.btnEditDomainDetails.isVisible = false;
      this.view.btnEditCompanyDetails.isVisible = false;
      this.view.flxTermsConditions.isVisible = false;
      this.view.flxTermsConditionsDetials.isVisible = false;
      this.view.formActionsNew.btnOption.isVisible = false;
      this.view.formActionsNew.btnCancel.isVisible = false;
      FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "kony.i18n.businessEnroll.BackTOLogin"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":"Back to login screen",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("kony.i18n.businessEnroll.BackTOLogin");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":"Back to login screen",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.onClick =
        this.backToLoginScreen.bind(this);
      this.view.formActionsNew.btnNext.right = "0dp";
      this.view.formActionsNew.btnNext.width = "20%";
      this.view.lblReferenceNumber.text = referenceId;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblReferenceNumber.text=referenceId;
      if (data.isAutoApproved === "true") {
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString(
          "kony.i18n.common.enrollmentSuccessMsg"
        );
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.lblSuccessMessage.text=kony.i18n.getLocalizedString("kony.i18n.common.enrollmentSuccessMsg");
      } else {
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString(
          "kony.i18n.common.enrollmentSuccessMsgFI"
        );
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          this.view.lblSuccessMessage.text=
          kony.i18n.getLocalizedString(
            "kony.i18n.common.enrollmentSuccessMsgFI"
          );
      }
      this.setCompanyDetailsDataSegmentData();
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    //Method to show login screen after successful Ack
    backToLoginScreen: function () {
      var authModule = kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager()
        .getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
      authModule.presentationController.showLoginScreen();
      this.view.flxContent.skin = "slfBoxffffffB1R5";
      this.view.flxVerifyDetials.skin = "slFboxffffff";
      this.view.flxDetailsHeader.isVisible = true;
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.formActionsNew.btnCancel.isVisible = true;
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.userManagement.Continue"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.flxVerifyDetials.top = "0dp";
      this.view.btnSelectedServicesEdit.isVisible = true;
      this.view.btnEditDomainDetails.isVisible = true;
      this.view.btnEditDomainDetails.accessibilityConfig={
        "a11yLabel":"Edit Contract Details",
        "a11yARIA":{
          "tabindex":0
        }
      }
      this.view.btnEditCompanyDetails.isVisible = true;
      this.view.flxTermsConditions.isVisible = true;
      this.view.flxPrint.setVisibility(false);
      this.isSubmitted = false;
      this.clearInputFields.call(this);
    },

    /**
     * @function : function that clears personal fields in About you frmEnrollBusiness
     *
     */
    clearPersonalFieldsData: function () {
      if (!this.isEditPersonalDtls) {
        this.companyInfo["accountDetails"] = [];
        this.view.tbxNameWithOutCIF.text = "";
        this.view.tbxMiddleNameWithOutCIF.text = "";
        this.view.tbxLastNameWithOutCIF.text = "";
        this.view.tbxEmailWithOutCIF.text = "";
        this.view.tbxPhoneNumWithOutCIF.text = "";
        this.view.tbxSSNWithOutCIF.text = "";
        this.view.customDateWithOutCIF.clear();
        this.resetErrorMessage();
        this.view.tbxSSNWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.view.tbxEmailWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.view.tbxPhoneNumWithOutCIF.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.view.flxDOBWithOutCIF.skin = "skne3e3e3br3pxradius"; //Default skin
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnOption.isVisible = true;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.userManagement.Continue"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.resetUI();
        this.clearCompanyDetailsFieldsWithoutCIF();
        this.view.formActionsNew.btnCancel.onClick = function () {
          var enrollModule = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule("EnrollModule");
          enrollModule.presentationController.showEnrollPage();
        };
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
    },

    showBusinessAccountsUI: function (data) {
      this.resetUI();
      this.view.flxBusinessAccounts.setVisibility(true);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.addBusinessAccounts"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.accountDataDescription"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("kony.i18n.common.accountDataDescription");
      FormControllerUtility.hideProgressBar(this.view);
      this.showAddAccountsScreen(false);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.skipNav();
    },

    assignBusinessRoleTypes: function (data) {
      var masterData = [];
      masterData.push(["-1", kony.i18n.getLocalizedString("i18n.ACH.Select")]);
      for (var i = 0; i < data.BusinessTypes.length; i++) {
        masterData.push([data.BusinessTypes[i].id, data.BusinessTypes[i].name]);
      }
      this.view.lstbTypeOfOrganisation.masterData = masterData;
      this.view.lstbTypeOfOrganisation.selectedKey = "-1";
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
    },
    /* Method will execute on email text changed */
    onCompanyEmailChangedWithOutCIF: function () {
      if (
        !this.validationUtilManager.isValidEmail(this.view.tbxEmailAddress.text)
      ) {
        this.view.tbxEmailAddress.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString(
            "i18n.konybb.createUser.error.InvalidEmail"
          )
        );
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        this.resetErrorMessage();
        this.view.tbxEmailAddress.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.updateCompanyDetailsProceedStateWithOutCIF();
      }
    },
    /* Method will validate the entered phone number */
    onEnteringCompanyPhoneNumberWithOutCIF: function () {
      if (
        !this.validationUtilManager.isValidPhoneNumber(
          this.view.tbxTelephoneNumber.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.tbxTelephoneNumber.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("i18n.profile.notAValidPhoneNumber")
        );
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        this.resetErrorMessage();
        this.view.tbxTelephoneNumber.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.updateCompanyDetailsProceedStateWithOutCIF();
      }
    },

    onEnteringTaxIdWithOutCIF: function () {
      if (
        !this.validationUtilManager.isValidTaxId(this.view.tbxCompanyTaxId.text)
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.tbxCompanyTaxId.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("i18n.profile.notAValidTaxId")
        );
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        this.resetErrorMessage();
        this.view.tbxCompanyTaxId.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.updateCompanyDetailsProceedStateWithOutCIF();
      }
    },

    updateCompanyDetailsProceedStateWithOutCIF: function () {
      if (
        CommonUtilities.isEmptyString(this.view.tbxBusinessCompanyName.text) ||
        CommonUtilities.isEmptyString(this.view.tbxCompanyTaxId.text) ||
        CommonUtilities.isEmptyString(this.view.tbxAddressLine1.text) ||
        CommonUtilities.isEmptyString(this.view.tbxZipCode.text) ||
        !this.validationUtilManager.isValidEmail(
          this.view.tbxEmailAddress.text
        ) ||
        !this.validationUtilManager.isValidPhoneNumber(
          this.view.tbxTelephoneNumber.text
        ) ||
        CommonUtilities.isEmptyString(this.view.tbxCountry.text) ||
        CommonUtilities.isEmptyString(this.view.tbxState.text) ||
        CommonUtilities.isEmptyString(this.view.tbxCity.text) ||
        this.view.lstbTypeOfOrganisation.selectedKey === "-1" ||
        this.view.lstbYourRoleinCompany.selectedKey === "-1" ||
        this.view.lstbTypeOfOrganisation.selectedKeyValue[1] ===
          kony.i18n.getLocalizedString("i18n.common.selecthere") ||
        this.view.lstbYourRoleinCompany.selectedKeyValue[1] ===
          kony.i18n.getLocalizedString("i18n.common.selecthere")
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
    },

    searchForAddress: function (tbxPath, segPath, noResultFlex, category) {
      var self = this;
      var searchText = tbxPath.text;
      var sourceData = [],
        dataToAssign = [];
      if (category === 1) {
        sourceData = countryList;
        dataToAssign = sourceData.filter(function (rec) {
          var name = rec.lblAddressCountry.text.toLowerCase();
          return name.indexOf(searchText.toLowerCase()) > -1;
        });
      } else if (category === 2) {
        sourceData = stateList;
        var country = self.view.flxCountry.tbxCountry.info.data;
        dataToAssign = sourceData.filter(function (rec) {
          var name = rec.lblAddressCountry.text.toLowerCase();
          return (
            name.indexOf(searchText.toLowerCase()) > -1 &&
            rec.Country_id === country.id
          );
        });
      } else if (category === 3) {
        sourceData = cityList;
        var state = self.view.flxState.tbxState.info.data;
        dataToAssign = sourceData.filter(function (rec) {
          var name = rec.lblAddressCountry.text.toLowerCase();
          return (
            name.indexOf(searchText.toLowerCase()) > -1 &&
            rec.Region_id === state.id
          );
        });
      }
      if (searchText === "") dataToAssign = [];
      segPath.setData(dataToAssign);
      if (dataToAssign.length > 0) {
        segPath.setVisibility(true);
        noResultFlex.setVisibility(false);
        if (noResultFlex === this.view.flxCountry.flxNoResultsFound) {
          this.view.flxCountry.zIndex = 2;
        } else {
          this.view.flxCountry.zIndex = 1;
        }
      } else {
        segPath.setVisibility(false);
        noResultFlex.setVisibility(true);
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        if (noResultFlex === this.view.flxCountry.flxNoResultsFound) {
          this.view.flxCountry.zIndex = 2;
        } else {
          this.view.flxCountry.zIndex = 1;
        }
      }
      self.view.forceLayout();
    },
    clearValidation: function (widget, errorFlex, type) {
      if (type === 1) widget.skin = "sknSSP42424215Opacity0";
      errorFlex.setVisibility(false);
    },

    displayCompanyRole: function (data) {
      var masterData = [];
      masterData.push([
        "-1",
        kony.i18n.getLocalizedString("i18n.common.selecthere"),
      ]);
      for (var i = 0; i < data.length; i++) {
        masterData.push([data[i].id, data[i].name, data[i].isDefaultGroup]);
      }
      if (this.isCustomerCentric) {
        this.view.lstbYourRoleInTheDomain.masterData = masterData;
        for (var i = 0; i < masterData.length; i++) {
          if (masterData[i][2] === "true") {
            this.view.lstbYourRoleInTheDomain.selectedKey = masterData[i][0];
          }
        }
      } else {
        this.view.flxYourRoleinCompany.lstbYourRoleinCompany.masterData =
          masterData;
        this.view.flxYourRoleinCompany.lstbYourRoleinCompany.selectedKey = "-1";
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.enableDisabledProceedOnValidDomainDetails(false);
      this.adjustScreen(30);
    },

    displayCompanyRolewithnull: function () {
      var masterData = [];
      masterData.push([
        "-1",
        kony.i18n.getLocalizedString("i18n.common.selecthere"),
      ]);
      if (this.isCustomerCentric) {
        this.view.lstbYourRoleInTheDomain.masterData = masterData;
        this.view.lstbYourRoleInTheDomain.selectedKey = "-1";
      } else {
        this.view.flxYourRoleinCompany.lstbYourRoleinCompany.masterData =
          masterData;
        this.view.flxYourRoleinCompany.lstbYourRoleinCompany.selectedKey = "-1";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
    },

    getAddressSegmentData: function (response) {
      var self = this;
      if (response !== "error") {
        if (response.httpresponse.url.includes("Countries") === true) {
          countryList = response.records.reduce(function (list, country) {
            return list.concat([
              {
                id: country.id,
                lblAddressCountry: {
                  text: country.Name,
                  left: "10dp",
                },
                template: "flxSearchAdressList",
              },
            ]);
          }, []);
        }
        if (response.httpresponse.url.includes("Regions") === true) {
          stateList = response.records.reduce(function (list, state) {
            return list.concat([
              {
                id: state.id,
                lblAddressCountry: {
                  text: state.Name,
                  left: "10dp",
                },
                Country_id: state.Country_id,
                template: "flxSearchAdressList",
              },
            ]);
          }, []);
        }
        if (response.httpresponse.url.includes("Cities") === true) {
          cityList = response.records.reduce(function (list, city) {
            return list.concat([
              {
                id: city.id,
                lblAddressCountry: {
                  text: city.Name,
                  left: "10dp",
                },
                Region_id: city.Region_id,
                template: "flxSearchAdressList",
              },
            ]);
          }, []);
        }
      }
      self.setAddressSegmentData();
      FormControllerUtility.hideProgressBar(this.view);
    },

    setAddressSegmentData: function () {
      var widgetMap = {
        flxSearchAdressList: "flxSearchAdressList",
        lblAddressCountry: "lblAddressCountry",
        Name: "Name",
        Region_id: "Region_id",
        Country_id: "Country_id",
      };
      this.view.flxCountry.segSearchCountry.widgetDataMap = widgetMap;
      this.view.flxState.segSearchState.widgetDataMap = widgetMap;
      this.view.flxCity.segSearchCity.widgetDataMap = widgetMap;
      /* this.view.flxCountry.segSearchCountry.setData(countryList);
                    this.view.flxCity.segSearchCity.setData(cityList);
                    this.view.flxState.segSearchState.setData(stateList); */
    },

    assigningText: function (segment, textBox) {
      var selectedRow = segment.data[segment.selectedRowIndex[1]];
      textBox.text = selectedRow.lblAddressCountry.text;
      textBox.info.isValid = true;
      textBox.info.data = selectedRow;
      segment.setVisibility(false);
      this.view.flxCountry.zIndex = 1;
      this.view.forceLayout();
    },

    /*Accounts listing screen entry method*/
    showAddAccountsScreen: function (isEditFlow) {
      this.view.flxDetailsHeader.isVisible = true;
      this.isEditAccountDetails = isEditFlow;
      this.resetUI();
      this.view.forceLayout();
      this.resetErrorMessage();
      this.view.flxBusinessAccounts.isVisible = true;
      FormControllerUtility.disableButton(this.view.bntAddAccount);
      if (
        !kony.sdk.isNullOrUndefined(this.view.TabBodyNew.segTemplates.data) &&
        this.view.TabBodyNew.segTemplates.data[0][1].length > 0
      ) {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      } else {
        this.view.flxAccountsSeparator.top = "150dp";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      }
      this.view.tbAccNumber.text = "";
      this.view.tbAccHolderName.text = "";
      this.view.formActionsNew.btnNext.onClick =
        this.onContinueFromAccountsListingScreen.bind(this);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.addBusinessAccounts"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.accountDataDescription"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("kony.i18n.common.accountDataDescription");
      this.validationUtilManager =
        applicationManager.getValidationUtilManager();
      this.view.tbAccHolderName.onKeyUp =
        this.onEnteringAccountNameWithoutCIF.bind(this);
      this.view.tbAccNumber.onKeyUp =
        this.onEnteringAccountNumberWithoutCIF.bind(this);
      this.view.TabBodyNew.segTemplates.rowTemplate = "flxAddedAccounts";
      this.view.TabBodyNew.segTemplates.widgetDataMap =
        this.getWidgetDataMapForNewAccounts();
      this.view.TabBodyNew.segTemplates.sectionHeaderTemplate =
        "flxAddedAccountsHeader";
      var typeSort = true;
      var numberSort = true;
      var nameSort = true;
      var sectionData = {
        btnAccountName: {
          text: kony.i18n.getLocalizedString("i18n.transfers.accountName"),
          onClick: function (eventobject, context) {
            if (nameSort) {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountName",
                "String",
                "Asc"
              );
              this.accountSortType = "AccountNameAsc";
            } else {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountName",
                "String",
                "Desc"
              );
              this.accountSortType = "AccountNameDesc";
            }
          }.bind(this),
        },
        imgAccountName: {
          isVisible: true,
        },
        btnAccountNumber: {
          text: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
          onClick: function (eventobject, context) {
            if (numberSort) {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountNumber",
                "ObjectNumber",
                "Asc"
              );
              this.accountSortType = "AccountNumberAsc";
            } else {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountNumber",
                "ObjectNumber",
                "Desc"
              );
              this.accountSortType = "AccountNumberDesc";
            }
            numberSort = !numberSort;
          }.bind(this),
        },
        imgAccountNumber: {
          isVisible: true,
        },
        btnAccountType: {
          text: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
          onClick: function (eventobject, context) {
            if (typeSort) {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountType",
                "ObjectText",
                "Asc"
              );
              this.accountSortType = "AccountTypeAsc";
            } else {
              this.view.TabBodyNew.sortData(
                context.sectionIndex,
                "",
                "",
                "lblAccountType",
                "ObjectText",
                "Desc"
              );
              this.accountSortType = "AccountTypeDesc";
            }
            typeSort = !typeSort;
          }.bind(this),
        },
        imgAccountType: {
          isVisible: true,
        },
        btnAction: {
          text: kony.i18n.getLocalizedString("i18n.wireTransfers.Actions"),
        },
        imgAction: {
          isVisible: false,
        },
        lblHeadingBottom: {
          text: "-",
        },
        lblHeadingAccounts1: {
          text: "-",
        },
        lblHeadingAccounts2: {
          text: "-",
        },
      };

      var rowDataMap = {
        lblAccountName: "lblAccountName",
        lblAccountNumber: "lblAccountNumber",
        lblAccountType: "lblAccountType",
      };

      var defaultValues = {
        btnAction: {
          text: kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
          accessibilityconfig: {
            a11yLabel: kony.i18n.getLocalizedString("i18n.bulkwires.Remove"),
          },
          onClick: function (eventobject, context) {
            this.view.PopupHeaderUM.lblHeading.text =
              kony.i18n.getLocalizedString("i18n.common.confirm");
            this.showPopUp(
              kony.i18n.getLocalizedString("kony.i18n.common.removeAccounts"),
              this.removeAccounts.bind(this, eventobject, context)
            );
          }.bind(this),
        },
        lblRowSeperator: {
          text: "-",
          accessibilityConfig: {
            "a11yHidden":true,
            "a11yARIA": {
              "tabindex": -1
            }
          }
        },
      };
      this.view.TabBodyNew.setSectionData([sectionData]);
      this.view.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TabBodyNew.setDefaultValues([defaultValues]);
      this.view.TabBodyNew.addOnlySectionHeaders(
        this.getSectionHeadersForNewAccounts()
      );
      this.view.bntAddAccount.onClick = this.checkIfAccountExists.bind(this);
      this.view.formActionsNew.btnOption.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnOption.setVisibility(true);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.BACK"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.setVisibility(true);
      this.view.formActionsNew.btnCancel.onClick =
        this.onBackBtnClickInAccountsscreenWithoutCIF.bind(this, false);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnOption.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.formActionsNew.btnOption.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      if (this.isEditAccountDetails === true) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.konybb.common.SaveAndUpdate"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnOption.setVisibility(false);
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          this.showVerifyDetailsUI.bind(this);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
      } else {
        this.view.formActionsNew.btnOption.isVisible = true;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.userManagement.Continue"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          this.storeSegData.bind(this);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
      }
      if (!kony.sdk.isNullOrUndefined(this.companyInfo["accountDetails"])) {
        var existingData = this.companyInfo["accountDetails"];
        this.view.TabBodyNew.addDataForSections([existingData]);
        if (this.companyInfo["accountDetails"].length === 0) {
          this.view.flxEmptyAccounts.setVisibility(true);
          FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
          this.view.flxAccountsSeparator.top = "150dp";
          if (kony.application.getCurrentBreakpoint() <= 1024) {
            this.view.flxTabletAccountsSeparator.setVisibility(false);
            this.view.TabBodyNew.setVisibility(false);
          }
        }
      }

      this.adjustScreen(30);
      this.skipNav();
    },

    removeAccounts: function (eventobject, context) {
      this.view.flxCancelPopup.setVisibility(false);
      this.view.flxSuccessMsg.isVisible = false;
      this.view.TabBodyNew.removeRowAt(context.rowIndex, context.sectionIndex);
      if (this.view.TabBodyNew.getData()[0][1].length === 0) {
        this.accountSortType = "";
        this.view.TabBodyNew.getDataForSections()[0] = [];
      } else
        this.view.TabBodyNew.getDataForSections()[0] =
          this.view.TabBodyNew.getData()[0][1];
      if (this.view.TabBodyNew.segTemplates.data[0][1].length > 0) {
        this.view.TabBodyNew.setVisibility(true);
        if (kony.application.getCurrentBreakpoint() <= 1024) {
          this.view.flxTabletAccountsSeparator.setVisibility(false);
        }
        this.view.flxAccountsSeparator.top = "0dp";
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        this.view.flxEmptyAccounts.setVisibility(false);
      } else {
        if (kony.application.getCurrentBreakpoint() <= 1024) {
          this.view.TabBodyNew.setVisibility(false);
          this.view.flxTabletAccountsSeparator.setVisibility(true);
        }
        this.view.flxAccountsSeparator.top = "150dp";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        this.view.flxEmptyAccounts.setVisibility(true);
      }
      this.view.forceLayout();
      this.adjustScreen(30);
    },

    /*Call to presentation controller for adding accounts*/
    checkIfAccountExists: function () {
      accountNumber = parseInt(this.view.tbAccNumber.text);
      flag = false;
      if (
        !kony.sdk.isNullOrUndefined(this.view.TabBodyNew.segTemplates.data) &&
        this.view.TabBodyNew.segTemplates.data[0][1].length > 0
      ) {
        segData = this.view.TabBodyNew.getData()[0][1];
        for (i = 0; i < segData.length; i++) {
          if (segData[i].lblAccountNumber.text === accountNumber) {
            flag = true;
            break;
          } else {
            flag = false;
          }
        }
        if (flag === false) this.addAccounts();
        else
          this.setErrorMessage(
            kony.i18n.getLocalizedString("kony.i18n.common.accountAlreadyAdded")
          );
        this.view.forceLayout();
      } else {
        this.addAccounts();
      }
    },

    addAccounts: function () {
      FormControllerUtility.showProgressBar(this.view);
      var accountDetails = {
        accountID: this.view.tbAccNumber.text,
        accountName: "",
        accountType: "",
        accountHolderName: this.view.tbAccHolderName.text,
        companyInformation:
          '[{"taxId":"' +
          this.view.tbxCompanyTaxId.text +
          '","name":"' +
          this.view.tbxBusinessCompanyName.text +
          '"}]',
        customerInformation:
          '[{"firstName":"' +
          this.view.tbxNameWithOutCIF.text +
          '","middleName":"' +
          this.view.tbxMiddleNameWithOutCIF.text +
          '","lastName":"' +
          this.view.tbxLastNameWithOutCIF.text +
          '","email":"' +
          this.view.tbxEmailWithOutCIF.text +
          '","phone":"' +
          this.view.tbxPhoneNumWithOutCIF.text +
          '","ssn":"' +
          this.view.tbxSSNWithOutCIF.text +
          '","dateOfBirth" : "' +
          CommonUtilities.sendDateToBackend(
            this.view.customDateWithOutCIF.getText()
          ) +
          '"}]',
      };
      this.loadEnrollModule().presentationController.addBusinessAccounts(
        accountDetails
      );
    },

    /*Widgetmap for accounts segment*/
    getWidgetDataMapForNewAccounts: function () {
      var widgetDataMap = {
        lblAccountName: "lblAccountName",
        flxAccountName:"flxAccountName",
        flxAccountNumber:"flxAccountNumber",flxAccountType:"flxAccountType",
        lblAccountNumber: "lblAccountNumber",
        lblAccountType: "lblAccountType",
        btnAction: "btnAction",
        btnAccountName: "btnAccountName",
        imgAccountName: "imgAccountName",
        btnAccountNumber: "btnAccountNumber",
        imgAccountNumber: "imgAccountNumber",
        btnAccountType: "btnAccountType",
        imgAccountType: "imgAccountType",
        imgAction: "imgAction",
        lblHeadingBottom: "lblHeadingBottom",
        lblHeadingAccounts1: "lblHeadingAccounts1",
        lblHeadingAccounts2: "lblHeadingAccounts2",
        lblRowSeperator: "lblRowSeperator",
      };
      return widgetDataMap;
    },

    /*Header data for accounts segment*/
    getSectionHeadersForNewAccounts: function () {
      var res = [];
      res[0] = {
        btnAccountName: {
          text: kony.i18n.getLocalizedString(
            "kony.i18n.common.accountHolderName"
          ),
        },
        imgAccountName: {
          isVisible: true,
        },
        btnAccountNumber: {
          text: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
        },
        imgAccountNumber: {
          isVisible: true,
        },
        btnAccountType: {
          text: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
        },
        imgAccountType: {
          isVisible: true,
        },
        btnAction: {
          text: kony.i18n.getLocalizedString("i18n.wireTransfers.Actions"),
        },
        imgAction: {
          isVisible: false,
        },
        lblHeadingBottom: {
          text: "-",
        },
        lblHeadingAccounts1: {
          text: "-",
        },
        lblHeadingAccounts2: {
          text: "-",
        },
      };
      return res;
    },

    /*setting the segment body data*/
    getNewlyAddedAccounts: function (data) {
      this.resetUI();
      this.view.forceLayout();

      this.view.flxBusinessAccounts.isVisible = true;
      FormControllerUtility.disableButton(this.view.bntAddAccount);
      this.adjustScreen(30);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.addBusinessAccounts"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.accountDataDescription"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("kony.i18n.common.accountDataDescription");
      this.view.formActionsNew.btnOption.isVisible = true;
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.BACK"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        )+" to previous step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      if (this.isEditAccountDetails === true) {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.konybb.common.SaveAndUpdate"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnOption.setVisibility(false);
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")+" process",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          this.showVerifyDetailsUI.bind(this);
      } else {
        this.view.formActionsNew.btnOption.isVisible = true;
        this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
          "i18n.ProfileManagement.BACK"
        );
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
          "i18n.userManagement.Continue"
        );
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
        this.view.formActionsNew.btnNext.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString("i18n.userManagement.Continue")+" to next step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.ProfileManagement.BACK"
          )+" to previous step",
          "a11yARIA":{
            "tabindex":0
          }
        };
        this.view.formActionsNew.btnCancel.onClick =
          this.storeSegData.bind(this);
      }
      this.view.formActionsNew.btnCancel.onClick = this.storeSegData.bind(this);
      var newAccount = {
        lblAccountName: {
          text: this.view.tbAccHolderName.text,
          accessibilityconfig: {
            a11yLabel: this.view.tbAccHolderName.text,
          },
        },
        lblAccountNumber: {
          text: kony.sdk.isNullOrUndefined(data[0].Account_id)
            ? "not recieved from server"
            : parseInt(data[0].Account_id) + "",
          accessibilityconfig: {
            a11yLabel: kony.sdk.isNullOrUndefined(data[0].Account_id)
              ? "not recieved from server"
              : parseInt(data[0].Account_id) + "",
          },
        },
        lblAccountType: {
          text: kony.sdk.isNullOrUndefined(data[0].accountType)
            ? "not recieved from server"
            : data[0].accountType,
          accessibilityconfig: {
            a11yLabel: kony.sdk.isNullOrUndefined(data[0].accountType)
              ? "not recieved from server"
              : data[0].accountType,
          },
        },
        lblTypeId: {
          text: kony.sdk.isNullOrUndefined(data[0].typeId)
            ? "not recieved from server"
            : data[0].typeId,
          accessibilityconfig: {
            a11yLabel: kony.sdk.isNullOrUndefined(data[0].typeId)
              ? "not recieved from server"
              : data[0].typeId,
          },
        },
        lblUsername: {
          text: kony.sdk.isNullOrUndefined(data[0].accountHolder)
            ? "not recieved from server"
            : JSON.parse(data[0].accountHolder).username,
          accessibilityconfig: {
            a11yLabel: kony.sdk.isNullOrUndefined(data[0].accountHolder)
              ? "not recieved from server"
              : JSON.parse(data[0].accountHolder).username,
          },
        },
        lblAccountHolderName: {
          text: kony.sdk.isNullOrUndefined(data[0].accountHolder)
            ? "not recieved from server"
            : JSON.parse(data[0].accountHolder),
          accessibilityconfig: {
            a11yLabel: kony.sdk.isNullOrUndefined(data[0].accountHolder)
              ? "not recieved from server"
              : JSON.parse(data[0].accountHolder),
          },
        },
      };

      if (
        this.view.TabBodyNew.getData()[0][1].length <= 0 &&
        this.view.TabBodyNew.getDataForSections().length === 0
      )
        var currentData = this.view.TabBodyNew.getDataForSections();
      else var currentData = this.view.TabBodyNew.getDataForSections()[0];
      currentData.unshift(newAccount);
      this.view.TabBodyNew.addDataForSections([currentData]);

      if (this.accountSortType === "AccountTypeAsc")
        this.view.TabBodyNew.sortData(
          0,
          "",
          "",
          "lblAccountType",
          "ObjectText",
          "Asc"
        );
      else if (this.accountSortType === "AccountTypeDesc")
        this.view.TabBodyNew.sortData(
          0,
          "",
          "",
          "lblAccountType",
          "ObjectText",
          "Desc"
        );
      else if (this.accountSortType === "AccountNumberAsc")
        this.view.TabBodyNew.sortData(
          0,
          "",
          "",
          "lblAccountNumber",
          "ObjectNumber",
          "Asc"
        );
      else if (this.accountSortType === "AccountNumberDesc")
        this.view.TabBodyNew.sortData(
          0,
          "",
          "",
          "lblAccountNumber",
          "ObjectNumber",
          "Desc"
        );
      else if (this.accountSortType === "AccountNameAsc")
        this.view.TabBodyNew.sortData(
          context.sectionIndex,
          "",
          "",
          "lblAccountName",
          "String",
          "Asc"
        );
      else if (this.accountSortType === "AccountNameDesc")
        this.view.TabBodyNew.sortData(
          context.sectionIndex,
          "",
          "",
          "lblAccountName",
          "String",
          "Desc"
        );

      this.view.flxSuccessMsg.setVisibility(true);
      this.view.imgSuccessMsg.src = ViewConstants.IMAGES.SUCCESS_GREEN;
      this.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
        "kony.i18n.common.accountAddedMsg"
      );
      FormControllerUtility.hideProgressBar(this.view);
      this.view.flxCloseMsg.onClick = this.closeSuccessMsg.bind(this);
      if (this.view.TabBodyNew.segTemplates.data[0][1].length > 0) {
        this.view.flxAccountsSeparator.top = "0dp";
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
        this.view.flxEmptyAccounts.setVisibility(false);
        this.view.TabBodyNew.setVisibility(true);
        if (kony.application.getCurrentBreakpoint() <= 1024) {
          this.view.flxTabletAccountsSeparator.setVisibility(false);
        }
      } else {
        this.view.flxAccountsSeparator.top = "150dp";
        this.view.flxEmptyAccounts.setVisibility(true);
        if (kony.application.getCurrentBreakpoint() <= 1024) {
          this.view.flxTabletAccountsSeparator.setVisibility(true);
          this.view.TabBodyNew.setVisibility(false);
        }
      }
      this.view.formActionsNew.btnNext.onClick =
        this.onContinueFromAccountsListingScreen.bind(this);
      this.view.tbAccNumber.text = "";
      this.view.tbAccHolderName.text = "";
      this.adjustScreen(30);
      this.skipNav();
    },

    /* Method will close the accounts added success message */
    closeSuccessMsg: function () {
      this.view.flxSuccessMsg.setVisibility(false);
    },

    /* Method will validate the entered account number */
    onEnteringAccountNumberWithoutCIF: function () {
      this.view.flxSuccessMsg.setVisibility(false);
      if (
        !this.validationUtilManager.isValidAccountNumber(
          this.view.tbAccNumber.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.bntAddAccount);
        this.view.tbAccNumber.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("i18n.common.errorCodes.12002")
        );
      } else {
        this.resetErrorMessage();
        this.view.tbAccNumber.skin = ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.enableDisabledProceedOnValidAccountDetails();
      }
    },

    /* Method will validate the entered account name */
    onEnteringAccountNameWithoutCIF: function () {
      this.view.flxSuccessMsg.setVisibility(false);
      if (
        !this.validationUtilManager.isValidAccountName(
          this.view.tbAccHolderName.text
        )
      ) {
        FormControllerUtility.disableButton(this.view.bntAddAccount);
        this.view.tbAccHolderName.skin =
          ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
        this.setErrorMessage(
          kony.i18n.getLocalizedString("kony.i18n.common.validAccountName")
        );
      } else {
        this.resetErrorMessage();
        this.view.tbAccHolderName.skin =
          ViewConstants.SKINS.BUSINESS_ENROLL_DEF; //Default skin
        this.enableDisabledProceedOnValidAccountDetails();
      }
    },

    /* Method will validate the entire accounts listing screen */
    enableDisabledProceedOnValidAccountDetails: function () {
      this.view.flxSuccessMsg.setVisibility(false);
      if (
        CommonUtilities.isEmptyString(this.view.tbAccHolderName.text) ||
        CommonUtilities.isEmptyString(this.view.tbAccNumber.text)
      ) {
        FormControllerUtility.disableButton(this.view.bntAddAccount);
      } else {
        FormControllerUtility.enableButton(this.view.bntAddAccount);
      }
    },

    onContinueFromAccountsListingScreen: function () {
      this.resetErrorMessage();
      this.view.flxSuccessMsg.setVisibility(false);
      this.companyInfo["accountDetails"] =
        this.view.TabBodyNew.segTemplates.data[0][1];
      if (this.isEditAccountDetails === true) {
        this.showVerifyDetailsUI();
      } else {
        this.loadEnrollModule().presentationController.fetchAllFeatures();
      }
    },

    storeSegData: function () {
      this.view.flxSuccessMsg.setVisibility(false);
      this.resetErrorMessage();
      this.companyInfo["accountDetails"] =
        this.view.TabBodyNew.segTemplates.data[0][1];
      this.onBackBtnClickInAccountsscreenWithoutCIF(false);
    },

    verifyAddedAccounts: function (accountDetails) {
      this.resetErrorMessage();
      if (!kony.sdk.isNullOrUndefined(accountDetails.isAccountExists)) {
        if (!kony.sdk.isNullOrUndefined(accountDetails.serviceKey)) {
          var inputParams = {
            MFAAttributes: {
              serviceKey: accountDetails.serviceKey,
            },
          };
          if (this.view.TabBodyNew.segTemplates.data[0][1].length === 0) {
            this.accountMasterKey = accountDetails.serviceKey;
            this.businessInfo["companyList"][0]["companyDetails"][
              "serviceKey"
            ] = accountDetails.serviceKey;
          } else this.accountServiceKey = accountDetails.serviceKey;
          this.companyInfo["accountDetails"] =
            this.view.TabBodyNew.segTemplates.data[0][1];
          this.loadEnrollModule().presentationController.requestBusinessEnrollOtp(
            inputParams
          );
        } else {
          this.accountErrorScreen();
        }
      } else {
        if (!kony.sdk.isNullOrUndefined(accountDetails[0]))
          this.getNewlyAddedAccounts(accountDetails);
        else this.accountErrorScreen();
      }
      FormControllerUtility.hideProgressBar(this.view);
    },

    accountErrorScreen: function () {
      this.adjustScreen(30);
      this.setErrorMessage(
        kony.i18n.getLocalizedString(
          "kony.i18n.businessEnroll.ErrorMsgEnrollMethod"
        )
      );
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    fetchAccountsData: function (data) {
      if (this.view.TabBodyNew.segTemplates.data[0][1].length === 0) {
        var accountDetails = {
          serviceKey: this.accountMasterKey,
        };
      } else {
        var accountDetails = {
          masterServiceKey: this.accountMasterKey,
          serviceKey: this.accountServiceKey,
        };
      }
      this.loadEnrollModule().presentationController.addBusinessAccounts(
        accountDetails
      );
    },

    getBusinessTypeRoles: function (typeoforg) {
      this.loadEnrollModule().presentationController.fetchRoleinCompany(
        typeoforg
      );
    },

    onCityChange: function () {
      this.clearValidation(
        this.view.flxCity.tbxCity,
        this.view.flxNoResultsFound,
        1
      );
      this.view.flxCity.segSearchCity.setVisibility(false);
      this.view.flxCity.zIndex = 2;
      this.searchForAddress(
        this.view.flxCity.tbxCity,
        this.view.flxCity.segSearchCity,
        this.view.flxCity.flxNoResultsFoundCity,
        3
      );
      if (this.view.flxCity.flxNoResultsFoundCity.isVisible === true) {
        this.view.flxCountry.setVisibility(true);
        this.view.flxState.setVisibility(true);
        this.view.flxCity.setVisibility(true);
      }
      this.view.forceLayout();
    },

    onCountryChange: function () {
      this.clearValidation(
        this.view.flxCountry.tbxCountry,
        this.view.flxNoResultsFound,
        1
      );
      this.view.flxCountry.segSearchCountry.setVisibility(false);
      this.view.flxCountry.zIndex = 2;
      this.searchForAddress(
        this.view.flxCountry.tbxCountry,
        this.view.flxCountry.segSearchCountry,
        this.view.flxCountry.flxNoResultsFound,
        1
      );
      if (this.view.flxCountry.tbxCountry.text === "") {
        this.view.flxState.tbxState.setEnabled(false);
        this.view.flxCity.tbxCity.setEnabled(false);
      } else {
        this.view.flxState.setVisibility(false);
        this.view.flxCity.setVisibility(false);
        this.view.flxState.tbxState.setEnabled(true);
      }
      if (this.view.flxCountry.flxNoResultsFound.isVisible === true) {
        this.view.flxState.setVisibility(true);
        this.view.flxCity.setVisibility(true);
      }
      this.view.flxState.tbxState.text = "";
      this.view.flxCity.tbxCity.text = "";
      this.view.forceLayout();
    },

    onStateChange: function () {
      this.clearValidation(
        this.view.flxState.tbxState,
        this.view.flxNoResultsFound,
        1
      );
      this.view.flxState.segSearchState.setVisibility(false);
      this.view.flxState.zIndex = 2;
      this.searchForAddress(
        this.view.flxState.tbxState,
        this.view.flxState.segSearchState,
        this.view.flxState.flxNoResultsFoundState,
        2
      );
      if (this.view.flxState.tbxState.text === "") {
        this.view.flxCity.tbxCity.setEnabled(false);
      } else {
        this.view.flxCity.setVisibility(false);
        this.view.flxCity.tbxCity.setEnabled(true);
      }
      if (this.view.flxState.flxNoResultsFoundState.isVisible === true) {
        this.view.flxCity.setVisibility(true);
      }
      this.view.flxCity.tbxCity.text = "";
      this.view.forceLayout();
    },

    onCompanyDetailsBtnContinueClickEditFlowWithoutCIF: function () {
      var sAddressLine2 = "";
      if (this.view.tbxAddressLine2.text != "") {
        sAddressLine2 = this.view.tbxAddressLine2.text + ",";
      }
      this.companyInfo["companyDetails"] = {
        companyName: this.view.tbxBusinessCompanyName.text,
        companyTypeId: this.view.lstbTypeOfOrganisation.selectedKeyValue[0],
        companyType: this.view.lstbTypeOfOrganisation.selectedKeyValue[1],
        companyRoleId: this.view.lstbYourRoleinCompany.selectedKeyValue[0],
        companyRole: this.view.lstbYourRoleinCompany.selectedKeyValue[1],
        emailAddress: this.view.tbxEmailAddress.text,
        telephoneNumber: this.view.tbxTelephoneNumber.text,
        taxID: this.view.tbxCompanyTaxId.text,
        faxID: this.view.tbxfax.text,
        addressLine1: this.view.tbxAddressLine1.text,
        addressLine2: this.view.tbxAddressLine2.text,
        country: this.view.tbxCountry.text,
        state: this.view.tbxState.text,
        city: this.view.tbxCity.text,
        zipCode: this.view.tbxZipCode.text,
        companyAddress: this.view.tbxAddressLine1.text + "," + sAddressLine2,
        companyAddress1:
          this.view.tbxCountry.text + "," + this.view.tbxState.text + ",",
        companyAddress2:
          this.view.tbxCity.text + "," + this.view.tbxZipCode.text,
        serviceKey: this.accountMasterKey,
      };
      this.showVerifyDetailsUI();
    },

    displayOrganizationTypes: function (data) {
      var masterData = [];
      masterData.push([
        "-1",
        kony.i18n.getLocalizedString("i18n.common.selecthere"),
      ]);
      for (var i = 0; i < data.length; i++) {
        masterData.push([data[i].id, data[i].name]);
      }
      this.view.lstbTypeOfOrganisation.masterData = masterData;
      this.view.lstbTypeOfOrganisation.selectedKey = "-1";
    },
    /*
     * method to check if company is enrolled or not.
     */
    isCompanyEnrolled: function (companyStatus) {
      var bExist = false;
      bExist = this.checkIfCompanyExist(companyStatus.membershipId);
      if (companyStatus.isEnrolled === "true" || bExist === true) {
        this.setErrorMessage(
          kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.ErrorMsgCompanyEnrolled"
          )
        );
        this.adjustScreen(30);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      } else {
        this.companyInfo["companyDetails"] = {};
        this.companyInfo["companyDetails"]["companyName"] =
          companyStatus.companyName;
        this.companyInfo["companyDetails"]["taxId"] = companyStatus.taxId;
        this.companyInfo["companyDetails"]["CIF"] = companyStatus.membershipId;

        var inputParams = {
          MFAAttributes: {
            serviceKey: companyStatus.serviceKey,
          },
        };
        this.companyInfo["companyDetails"]["serviceKey"] = inputParams;
        this.resetErrorMessage();
        this.loadEnrollModule().presentationController.requestBusinessEnrollOtp(
          inputParams
        );
      }
    },

    /*
     *	method to show resend screen incase of DISPLAY_ALL configuration
     */
    showScreentoEnterOTP: function (response) {
      var scopeObj = this;
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPPostLogin.btnResendCode.setVisibility(false);
      } else {
        this.bindUIForResendButton(response);
        this.view.OTPPostLogin.btnResendCode.setVisibility(true);
      }
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      if (response.MFAAttributes.isOTPExpired === "true") {
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(true);
        this.view.OTPPostLogin.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPPostLogin.lblWrongOTP.text= kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        FormControllerUtility.hideProgressBar(this.view);
      } else {
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(false);
      }
      this.view.flxOTP.setVisibility(true);
      this.view.OTPPostLogin.flxEnterOTP.setVisibility(false);
      this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.OTPPostLogin.rtxHeaderOTP.text = kony.i18n.getLocalizedString(
        "i18n.MFA.EnterSACOnPhone"
      );
      this.view.OTPPostLogin.rtxHeaderOTP.text=kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      this.view.OTPPostLogin.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPPostLogin.flxImgViewOTPCode.onClick =
        this.showOTP.bind(this);
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.Verify"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.OTPPostLogin.btnResendCode.text = kony.i18n.getLocalizedString(
        "i18n.login.ResendOtp"
      );
      this.view.OTPPostLogin.btnResendCode.text=kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPPostLogin.tbxEnterOTPCode.onKeyUp = function () {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPPostLogin.tbxEnterOTPCode.onDone = function () {
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(selectedData);
      }.bind(this);
      this.view.formActionsNew.btnNext.onClick = function () {
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(selectedData);
      }.bind(this);
      this.adjustScreen(30);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    /*
     * method to validate enabling of verify button
     */
    validatetoEnableContinueButton: function () {
      var otp = this.view.OTPPostLogin.tbxEnterOTPCode.text.trim();
      if (otp === "") {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
    },

    /*
     * method to verify entered otp
     */
    verifyOTP: function (data) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        MFAAttributes: {
          serviceKey: authManager.getServicekey(),
          OTP: data,
        },
      };
      this.loadEnrollModule().presentationController.verifyBusinessEnrollOtp(
        params
      );
    },

    /*
     * method to show mfa UI based on it's communication type.
     */
    showScreenToEnterSecureCode: function (response) {
      this.resetUI();
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString(
        "i18n.MFA.LetsAuthenticate"
      );
      this.view.lblDetailsHeader.text = kony.i18n.getLocalizedString(
        "i18n.MFA.SecureAccessCodeLbl"
      );
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblDetailsHeader.text=kony.i18n.getLocalizedString("i18n.MFA.SecureAccessCodeLbl");
      if (communicationType === OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showPhoneEmailScreen(response);
      } else if (
        communicationType === OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY
      ) {
        this.showPrimaryEmailScreen(response);
      } else if (
        communicationType === OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE
      ) {
        this.showDefaultPhoneEmailScreen(response);
      }
      this.skipNav();
    },

    /*
     * method to show select phone and email UI for DISPLAY_ALL type
     */
    showPhoneEmailScreen: function (response) {
      var scopeObj = this;
      FormControllerUtility.showProgressBar(this.view);
      this.bindUIForOTPMFAScreen(response.MFAAttributes.customerCommunication);
      scopeObj.view.formActionsNew.btnNext.onClick = function () {
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {};
        if (scopeObj.view.OTPPostLogin.lbxPhone.selectedKeyValue)
          selectedData.phone =
            scopeObj.view.OTPPostLogin.lbxPhone.selectedKeyValue[0];
        if (scopeObj.view.OTPPostLogin.lbxEmail.selectedKeyValue)
          selectedData.email =
            scopeObj.view.OTPPostLogin.lbxEmail.selectedKeyValue[0];
        scopeObj.customerPhone = selectedData.phone;
        scopeObj.customerEmail = selectedData.email;
        this.requestOTP(selectedData);
      }.bind(this);
      this.adjustScreen(30);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    /*
     * method to request otp
     */
    requestOTP: function (selectedData) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        MFAAttributes: {
          serviceKey: authManager.getServicekey(),
          OTP: selectedData,
        },
      };
      this.loadEnrollModule().presentationController.requestOTPUsingPhoneEmail(
        params
      );
    },

    /*
     * method to show enter secure access code UI in case of DISPLAY_ALL.
     */
    bindUIForOTPMFAScreen: function (customerCommunicationInfo) {
      this.view.flxOTP.setVisibility(true);
      this.view.OTPPostLogin.flxEnterSecureAccessCode.setVisibility(false);
      this.view.OTPPostLogin.lblHeader.setVisibility(false);
      this.view.OTPPostLogin.flxEnterOTP.setVisibility(true);
      this.view.OTPPostLogin.lblHeader.setVisibility(true);
      FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.OTPPostLogin.btnResendCode.text = kony.i18n.getLocalizedString(
        "i18n.login.ResendOtp"
      );
      this.view.OTPPostLogin.btnResendCode.text=kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.formActionsNew.btnOption.setVisibility(false);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var scopeObj = this;
      if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === true
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(true);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === false
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(false);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else
        this.view.formActionsNew.btnCancel.onClick =
          this.enrollmentMethodinit.bind(this);
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.common.proceed"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.common.proceed")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.common.proceed")+" to next step",
        "a11yARIA":{
          "tabindex":0
        }
      };
      if (customerCommunicationInfo.phone && customerCommunicationInfo.email) {
        this.view.OTPPostLogin.lblHeader.text = kony.i18n.getLocalizedString(
          "i18n.MFA.headerMessageForOTP"
        );
        this.view.OTPPostLogin.lblHeader.text=kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP");
        this.view.OTPPostLogin.lbxPhone.masterData =
          this.setDataForPhoneListBox(customerCommunicationInfo.phone);
        this.view.OTPPostLogin.lbxEmail.masterData =
          this.setDataForEmailListBox(customerCommunicationInfo.email);
        this.view.OTPPostLogin.lblRegisteredPhone.setVisibility(true);
        this.view.OTPPostLogin.lbxPhone.setVisibility(true);
        this.view.OTPPostLogin.lblRegisteredEmail.setVisibility(true);
        this.view.OTPPostLogin.lbxEmail.setVisibility(true);
        this.adjustScreen(30);
        this.view.forceLayout();
      } else {
        if (
          customerCommunicationInfo.phone ||
          customerCommunicationInfo.email
        ) {
          if (customerCommunicationInfo.phone) {
            this.view.OTPPostLogin.lblHeader.text =
              kony.i18n.getLocalizedString(
                "i18n.ProfileManagement.headerMessageForOTPPhone"
              );
            this.view.OTPPostLogin.lblHeader.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.headerMessageForOTPPhone");
            this.view.OTPPostLogin.lbxPhone.masterData =
              this.setDataForPhoneListBox(customerCommunicationInfo.phone);
            this.view.OTPPostLogin.lblRegisteredPhone.setVisibility(true);
            this.view.OTPPostLogin.lbxPhone.setVisibility(true);
            this.view.OTPPostLogin.lblRegisteredEmail.setVisibility(false);
            this.view.OTPPostLogin.lbxEmail.setVisibility(false);
            this.adjustScreen(30);
            this.view.forceLayout();
          } else if (customerCommunicationInfo.email) {
            this.view.OTPPostLogin.lblHeader.text =
              kony.i18n.getLocalizedString(
                "i18n.ProfileManagement.headerMessageForOTPEmail"
              );
            this.view.OTPPostLogin.lblHeader.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.headerMessageForOTPEmail");
            this.view.OTPPostLogin.lbxEmail.masterData =
              this.setDataForEmailListBox(customerCommunicationInfo.email);
            this.view.OTPPostLogin.lblRegisteredPhone.setVisibility(false);
            this.view.OTPPostLogin.lbxPhone.setVisibility(false);
            this.view.OTPPostLogin.lblRegisteredEmail.setVisibility(true);
            this.view.OTPPostLogin.lbxEmail.setVisibility(true);
            this.adjustScreen(30);
            this.view.forceLayout();
          }
        }
      }
      this.adjustScreen(30);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    /*
     *	method to set master data to phone list box.
     */
    setDataForPhoneListBox: function (phoneObj) {
      var phoneNumbers = phoneObj.map(function (dataItem) {
        var phoneNumber = [];
        phoneNumber.push(dataItem.unmasked);
        phoneNumber.push(dataItem.masked);
        return phoneNumber;
      });
      return phoneNumbers;
    },

    /*
     *  method to set master data to email list box.
     */
    setDataForEmailListBox: function (emailObj) {
      var emailsIds = emailObj.map(function (dataItem) {
        var email = [];
        email.push(dataItem.unmasked);
        email.push(dataItem.masked);
        return email;
      });
      return emailsIds;
    },

    /*
     * init method to show primary communcation screen.
     */
    showPrimaryEmailScreen: function (response) {
      this.bindUIForPrimaryScreen(response);
    },

    /*
     *	method to enter secure access code with DISPLAY_PRIMARY communication type.
     */
    bindUIForPrimaryScreen: function (response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPPostLogin.btnResendCode.setVisibility(false);
      } else {
        this.bindUIForResendButton(response);
        this.view.OTPPostLogin.btnResendCode.setVisibility(true);
      }
      this.view.formActionsNew.btnOption.setVisibility(false);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.formActionsNew.btnCancel.text=
        kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        this.view.formActionsNew.btnCancel.accessibilityConfig={
          "a11yLabel":kony.i18n.getLocalizedString(
            "i18n.transfers.Cancel"
          )+" Enrollment",
          "a11yARIA":{
            "tabindex":0
          }
        };
      var scopeObj = this;
      if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === true
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(true);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === false
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(false);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else
        this.view.formActionsNew.btnCancel.onClick =
          this.enrollmentMethodinit.bind(this);
      if (response.MFAAttributes.isOTPExpired === "true") {
        this.view.OTPPostLogin.lblWrongOTP.text = kony.i18n.getLocalizedString(
          "i18n.mfa.otpExpired"
        );
          this.view.OTPPostLogin.lblWrongOTP.text=
          kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(true);
        this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        FormControllerUtility.hideProgressBar(this.view);
      } else {
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(false);
      }
      this.view.flxOTP.setVisibility(true);
      this.view.OTPPostLogin.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPPostLogin.flxImgViewOTPCode.onClick =
        this.showOTP.bind(this);
      this.view.OTPPostLogin.flxEnterOTP.setVisibility(false);
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.Verify"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var phone = response.MFAAttributes.customerCommunication.phone[0].masked;
      var email = response.MFAAttributes.customerCommunication.email[0].masked;
      this.view.OTPPostLogin.rtxHeaderOTP.text =
        kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") +
        phone +
        " & " +
        email;
      this.view.OTPPostLogin.tbxEnterOTPCode.onKeyUp = function () {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPPostLogin.tbxEnterOTPCode.onDone = function () {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(params);
      }.bind(this);
      this.view.formActionsNew.btnNext.onClick = function () {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(params);
      }.bind(this);
      this.adjustScreen(30);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    /*
     *	init method to show default mfa screen.
     */
    showDefaultPhoneEmailScreen: function (customerCommunicationInfo) {
      this.bindUIForDefaultScreen(customerCommunicationInfo);
    },

    /*
     *	method to enter secure access code with DISPLAY_NO_VALUE communication type.
     */
    bindUIForDefaultScreen: function (response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPPostLogin.btnResendCode.setVisibility(false);
      } else {
        this.bindUIForResendButton(response);
        this.view.OTPPostLogin.btnResendCode.setVisibility(true);
      }
      this.view.formActionsNew.btnOption.setVisibility(false);
      this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnCancel.text=kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.formActionsNew.btnCancel.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString(
          "i18n.transfers.Cancel"
        )+" Enrollment",
        "a11yARIA":{
          "tabindex":0
        }
      };
      var scopeObj = this;
      if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === true
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(true);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else if (
        applicationManager
          .getConfigurationManager()
          .configurations.getItem("isAccountCentricCore") === "true" &&
        this.isEditAccountDetails === false
      )
        this.view.formActionsNew.btnCancel.onClick = function () {
          scopeObj.showAddAccountsScreen(false);
          scopeObj.view.flxCloseMsg.onClick =
            scopeObj.closeSuccessMsg.bind(this);
          scopeObj.view.flxSuccessMsg.setVisibility(true);
          scopeObj.view.imgSuccessMsg.src = ViewConstants.IMAGES.WARNING_MSG;
          scopeObj.view.lblSuccessMsg.text = kony.i18n.getLocalizedString(
            "kony.i18n.businessEnroll.AccountVerification"
          );
          scopeObj.adjustScreen(30);
        };
      else
        this.view.formActionsNew.btnCancel.onClick =
          this.enrollmentMethodinit.bind(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      if (response.isOTPExpired === "true") {
        this.view.OTPPostLogin.lblWrongOTP.text = kony.i18n.getLocalizedString(
          "i18n.mfa.otpExpired"
        );
          this.view.OTPPostLogin.lblWrongOTP.text=
          kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(true);
        this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        FormControllerUtility.hideProgressBar(this.view);
      } else {
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(false);
      }
      this.view.OTPPostLogin.rtxHeaderOTP.text = kony.i18n.getLocalizedString(
        "i18n.MFA.EnterSACOnPhone"
      );
        this.view.OTPPostLogin.rtxHeaderOTP.text=
        kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      this.view.flxOTP.setVisibility(true);
      this.view.OTPPostLogin.flxEnterOTP.setVisibility(false);
      this.view.OTPPostLogin.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPPostLogin.flxImgViewOTPCode.onClick =
        this.showOTP.bind(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString(
        "i18n.ProfileManagement.Verify"
      );
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      //var accessibilityConfig=CommonUtilities.getaccessibilityConfig();
      this.view.formActionsNew.btnNext.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.formActionsNew.btnNext.accessibilityConfig={
        "a11yLabel":kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")+" the OTP and Proceed",
        "a11yARIA":{
          "tabindex":0
        }
      };
      this.view.OTPPostLogin.btnResendCode.text = kony.i18n.getLocalizedString(
        "i18n.login.ResendOtp"
      );
      this.view.OTPPostLogin.btnResendCode.text=kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.OTPPostLogin.tbxEnterOTPCode.onKeyUp = function () {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPPostLogin.tbxEnterOTPCode.onDone = function () {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(params);
      }.bind(this);
      this.view.formActionsNew.btnNext.onClick = function () {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          securityKey: response.MFAAttributes.securityKey,
          otp: this.view.OTPPostLogin.tbxEnterOTPCode.text.trim(),
        };
        this.verifyOTP(params);
      }.bind(this);
      this.adjustScreen(30);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },

    /*
     * method to show up invalid secure access code UI.
     */
    showIncorrectOTPError: function (response) {
      var scopeObj = this;
      if (
        response.MFAAttributes &&
        response.MFAAttributes.remainingFailedAttempts &&
        response.MFAAttributes.remainingFailedAttempts > 0
      ) {
        this.view.OTPPostLogin.lblWrongOTP.setVisibility(true);
        var text =
          kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") +
          " " +
          response.MFAAttributes.remainingFailedAttempts +
          " " +
          kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.OTPPostLogin.lblWrongOTP.text = text;
        this.view.OTPPostLogin.lblWrongOTP.text=text;
        this.view.flxOTP.setVisibility(true);
        this.view.OTPPostLogin.flxEnterOTP.setVisibility(false);
        this.view.OTPPostLogin.flxEnterSecureAccessCode.setVisibility(true);
        this.view.OTPPostLogin.flxImgViewOTPCode.onClick =
          this.showOTP.bind(this);
        this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
        FormControllerUtility.hideProgressBar(this.view);
        this.adjustScreen(30);
        this.view.forceLayout();
      } else if (
        response.MFAAttributes &&
        response.MFAAttributes.remainingFailedAttempts === "0" &&
        response.MFAAttributes.logoutUser === "true"
      ) {
        var authModule = kony.mvc.MDAApplication.getSharedInstance()
          .getModuleManager()
          .getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
        authModule.presentationController.showLoginScreen();
      }
    },

    /*
     * method to show up request otp error.
     */
    showRequestOTPError: function (error) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.OTPPostLogin.lblWrongOTP.text = kony.i18n.getLocalizedString(
        "i18n.mfa.requestOTPMessageFailed"
      );
      this.view.OTPPostLogin.lblWrongOTP.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(30);
      this.view.forceLayout();
    },

    /*
     *	method to perform resend otp action
     */
    bindUIForResendButton: function (response) {
      var scopeObj = this;
      this.view.OTPPostLogin.tbxEnterOTPCode.text = "";
      FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      this.view.OTPPostLogin.btnResendCode.onClick = function () {
        FormControllerUtility.showProgressBar(scopeObj.view);
        if (response.MFAAttributes.customerCommunication) {
          var params = {
            phone:
              response.MFAAttributes.customerCommunication.phone[0].unmasked,
            email:
              response.MFAAttributes.customerCommunication.email[0].unmasked,
            securityKey: response.MFAAttributes.securityKey,
          };
        } else {
          var params = {
            phone: scopeObj.customerPhone,
            email: scopeObj.customerEmail,
            securityKey: response.MFAAttributes.securityKey,
          };
        }
        scopeObj.resendOTP(params);
      };
      this.adjustScreen(30);
    },

    /*
     * method to call resend otp service
     */
    resendOTP: function (params) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        UserName: authManager.getUserName(),
        MFAAttributes: {
          serviceKey: authManager.getServicekey(),
          OTP: params,
        },
      };
      this.loadEnrollModule().presentationController.resendBusinessEnrollOTP(
        params
      );
    },

    /*
     * method to mask or unmask otp
     */
    showOTP: function () {
      if (this.view.OTPPostLogin.tbxEnterOTPCode.secureTextEntry === true) {
        this.view.OTPPostLogin.tbxEnterOTPCode.secureTextEntry = false;
        this.view.OTPPostLogin.imgViewOTPCode.src="show_password.png";
        this.view.OTPPostLogin.flxImgViewOTPCode.accessibilityConfig = {
          "a11yLabel": "Hide Secure access code, your code is currently visible",
          "a11yARIA": {
            "tabindex": 0,
            "role": "button"
          }
        }
        this.view.OTPPostLogin.flxImgViewOTPCode.setActive(true);
      } else {
        this.view.OTPPostLogin.tbxEnterOTPCode.secureTextEntry = true;
        this.view.OTPPostLogin.imgViewOTPCode.src="hide_password.png";
        this.view.OTPPostLogin.flxImgViewOTPCode.accessibilityConfig = {
          "a11yLabel": "View Secure access code, your code is currently hidden",
          "a11yARIA": {
            "tabindex": 0,
            "role": "button"
          }
        }
        this.view.OTPPostLogin.flxImgViewOTPCode.setActive(true);
      }
    },

    /*
     * method to show UI after resend action.
     */
    showSecureAccessCodeScreenAfterResend: function (response) {
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showScreentoEnterOTP(response);
      } else if (
        communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY
      ) {
        this.showPrimaryEmailScreen(response);
      } else if (
        communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE
      ) {
        this.showDefaultPhoneEmailScreen(response);
      }
    },

    showPopUp: function (message, onYes) {
      var scope = this;

      scope.view.flxCancelPopup.height ="100%";
      FormControllerUtility.scrollToCenterY(scope.view.flxCancelPopup.height);

      function closePopUp() {
        this.view.flxCancelPopup.setVisibility(false);
        this.adjustScreen(30);
        if (btnFlag !== "") {
          btnFlag.setActive(true);
          btnFlag = "";
        }
        
      }
      scope.view.PopupHeaderUM.isVisible =true;
      scope.view.PopupHeaderUM.btnNo.text =
        kony.i18n.getLocalizedString("i18n.common.no");
      scope.view.PopupHeaderUM.btnYes.text =
        kony.i18n.getLocalizedString("i18n.common.yes");
      scope.view.PopupHeaderUM.lblPopupMessage.text = message;
      scope.view.PopupHeaderUM.lblPopupMessage.skin = "slLabel0d8a72616b3cc47";
      //scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");//head
      scope.view.PopupHeaderUM.flxCross.onClick = closePopUp.bind(this);
      scope.view.PopupHeaderUM.btnNo.onClick = closePopUp.bind(this);
      scope.view.PopupHeaderUM.btnYes.onClick = onYes;
      scope.view.flxCancelPopup.setVisibility(true);
      scope.view.flxCancelPopup.isModalContainer = true;
      scope.adjustScreen(30);
      scope.view.PopupHeaderUM.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      }
      scope.view.PopupHeaderUM.lblHeading.setActive(true);
    },

    saveCompanyDetails: function () {
      //service call required to fetch type of organisation and saving user details in global variable.
      var sAddressLine2 = "";
      if (this.view.tbxAddressLine2.text != "") {
        sAddressLine2 = this.view.tbxAddressLine2.text + ",";
      }
      this.companyInfo["companyDetails"] = {
        companyName: this.view.tbxBusinessCompanyName.text,
        companyTypeId: this.view.lstbTypeOfOrganisation.selectedKeyValue[0],
        companyType: this.view.lstbTypeOfOrganisation.selectedKeyValue[1],
        companyRoleId: this.view.lstbYourRoleinCompany.selectedKeyValue[0],
        companyRole: this.view.lstbYourRoleinCompany.selectedKeyValue[1],
        emailAddress: this.view.tbxEmailAddress.text,
        telephoneNumber: this.view.tbxTelephoneNumber.text,
        taxID: this.view.tbxCompanyTaxId.text,
        faxID: this.view.tbxfax.text,
        addressLine1: this.view.tbxAddressLine1.text,
        addressLine2: this.view.tbxAddressLine2.text,
        country: this.view.tbxCountry.text,
        state: this.view.tbxState.text,
        city: this.view.tbxCity.text,
        zipCode: this.view.tbxZipCode.text,
        companyAddress: this.view.tbxAddressLine1.text + "," + sAddressLine2,
        companyAddress1:
          this.view.tbxCountry.text + "," + this.view.tbxState.text + ",",
        companyAddress2:
          this.view.tbxCity.text + "," + this.view.tbxZipCode.text,
        serviceKey: this.accountMasterKey,
      };
      this.businessInfo["companyList"].push(this.companyInfo);
    },

    clearCompanyDetailsFieldsWithoutCIF: function () {
      if (
        !kony.sdk.isNullOrUndefined(
          this.view.lstbYourRoleinCompany.selectedKeyValue
        )
      ) {
        this.view.lstbYourRoleinCompany.selectedKeyValue[1] =
          this.view.lstbYourRoleinCompany.masterData[0][1];
        this.view.lstbYourRoleinCompany.selectedKey =
          this.view.lstbYourRoleinCompany.masterData[0][0];
      }
      this.view.tbxBusinessCompanyName.text = "";
      this.view.lstbTypeOfOrganisation.text = "";
      this.view.lstbYourRoleinCompany.text = "";
      this.view.tbxEmailAddress.text = "";
      this.view.tbxTelephoneNumber.text = "";
      this.view.tbxCompanyTaxId.text = "";
      this.view.tbxfax.text = "";
      this.view.tbxAddressLine1.text = "";
      this.view.tbxAddressLine2.text = "";
      this.view.tbxCountry.text = "";
      this.view.tbxState.text = "";
      this.view.tbxCity.text = "";
      this.view.tbxZipCode.text = "";
    },

    /*
     * method to show UI after back action from show feautures.
     */
    onBackFromSelectFeautures: function (response) {
      if (!this.isCustomerCentric) {
        this.isEditAccountDetails = true;
        this.showAddAccountsScreen();
      } else {
        this.isBackFlow = true;
        this.setDomainDetails(false);
      }
    },

    enableDisabledProceedOnValidCompanyDetails: function () {
      if (
        this.view.lstbTypeOfOrganisation.selectedKey === "-1" ||
        this.view.lstbYourRoleinCompany.selectedKey === "-1" ||
        this.view.lstbTypeOfOrganisation.selectedKeyValue[1] ===
          kony.i18n.getLocalizedString("i18n.common.selecthere") ||
        this.view.lstbYourRoleinCompany.selectedKeyValue[1] ===
          kony.i18n.getLocalizedString("i18n.common.selecthere")
      ) {
        FormControllerUtility.disableButton(this.view.formActionsNew.btnNext);
      } else {
        FormControllerUtility.enableButton(this.view.formActionsNew.btnNext);
      }
    },

    checkIfCompanyExist: function (cifId) {
      if (!kony.sdk.isNullOrUndefined(this.businessInfo.companyList)) {
        var companies = this.businessInfo.companyList;
        for (i = 0; i < companies.length; i++) {
          if (companies[i].companyDetails["CIF"] === cifId) {
            return true;
          }
        }
        return false;
      }
    },

    saveCompanyDetailsWithCIF: function (cifId, tabbodyaccdetails) {
      if (!kony.sdk.isNullOrUndefined(this.businessInfo.companyList)) {
        segData = this.businessInfo.companyList;
        for (i = 0; i < segData.length; i++) {
          if (segData[i].companyDetails["CIF"] === cifId) {
            for (j = 0; j < segData[i].accountDetails[1].length; j++) {
              for (k = 0; k < tabbodyaccdetails.length; k++) {
                if (
                  segData[i].accountDetails[1][j].lblAccountNumberValue.text ===
                  tabbodyaccdetails[k].lblAccountNumberValue.text
                ) {
                  segData[i].accountDetails[1][j].lblSelectAllValue.text =
                    tabbodyaccdetails[k].lblSelectAllValue.text;
                }
              }
            }
          }
        }
      }
    },

    showLoginScreen: function () {
      this.view.flxCancelPopup.setVisibility(false);
      this.clearInputFields.call(this);
      var authModule = kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager()
        .getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
      authModule.presentationController.showLoginScreen();
      this.adjustScreen(30);
    },

    resetCompanyDetailsAndNavigateToAboutYou: function () {
      this.view.flxCancelPopup.setVisibility(false);
      this.saveCompanyDetails();
      this.isEditPersonalDtls = true;
      this.isEditFlow = true;
      this.isBackFlow = true;
      isFrombackflow = true;
      this.companyInfo["accountDetails"] = [];
      this.showAccountCentricUI();
      this.adjustScreen(30);
    },

    resetDetailsAndNavigateToCustomercentricflow: function () {
      this.view.flxCancelPopup.setVisibility(false);
      this.clearInputFields();
      this.view.flxCancelPopup.setVisibility(false);
      this.showCustomerCentricUI();
      this.adjustScreen(30);
    },

    showCancelPopUp: function () {
      this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.showPopUp(
        kony.i18n.getLocalizedString("i18n.common.CancelMsg"),
        this.showLoginScreen.bind(this)
      );
    },

    showBackPopUpWithoutCIF: function () {
      this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.showPopUp(
        kony.i18n.getLocalizedString("i18n.common.Gotoprevscreen"),
        this.resetCompanyDetailsAndNavigateToAboutYou.bind(this)
      );
    },

    showBackPopUpWithCIF: function () {
      this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString(
        "i18n.transfers.Cancel"
      );
      this.showPopUp(
        kony.i18n.getLocalizedString("i18n.common.Gotoprevscreen"),
        this.resetDetailsAndNavigateToCustomercentricflow.bind(this)
      );
    },

    navigateBackToMethodEnrollment: function () {
      this.view.flxCancelPopup.setVisibility(false);
      this.companyInfo["companyDetails"] = {};
      this.businessInfo.companyList = this.businessInfo.companyList.slice(
        0,
        -1
      );
      this.enrollmentMethodinit();
      this.adjustScreen(30);
    },

    getServiceDefinition : function () {
      var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
      var serviceDefinition = this.view.lstbTypeOfDomain.selectedKey;
      var group = this.view.lstbYourRoleInTheDomain.selectedKey;
      var params = {serviceDefinitionId: serviceDefinition, groupId: group};
      enrollModule.presentationController.getServiceDefinition(params);
    },

  };
});
