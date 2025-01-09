define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let formTemplateScope, contentScope, buttonScope, popupScope;
  let presenter, response;
  let isAccountSelected;
  let isMyCompanySelected;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let sbaEnrolmentStatuses;
  let userObject;
  let selectedCustomer;
  let selectedAccount;
  let backendIdentifiers;
  return {
    /**
     * Sets the initial actions for form
     */
    init: function() {
      sbaEnrolmentStatuses = OLBConstants.SBA_ENROLMENT_STATUS_CONFIG;
      SBA_ENROL_STATUS = OLBConstants.SBA_ENROL_STATUS;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      formTemplateScope = this.view.formTemplate12;
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      buttonScope = this.view.formTemplate12.flxTCButtons;
      popupScope = this.view.formTemplate12.flxContentPopup;
    },

    /**
     * Performs the actions required before rendering form
     */
    preShow: function() {
      var scope = this;
      try {

      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Performs the actions required after rendering form
     */
    postShow: function() {
      var scope = this;
      try {
        presenter = applicationManager.getModulesPresentationController({
          appName: 'SBAdvisoryMA',
          moduleName: 'EnrolmentModule'
        })
        userObject = applicationManager.getUserPreferencesManager().getUserObj();
        backendIdentifiers = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes.backendIdentifiers;
        backendIdentifiers = JSON.parse(backendIdentifiers.replace(/'/g, "\""));
        scope.setDefaultUI();
        scope.initOnclickActions();
        scope.setCompanyAndUserDetails();
        scope.getAccountingProvider();
        popupScope.lblTAndCClose.cursorType = "pointer";
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
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
    onNavigate: function(data) {
      var scope = this;
      try {} catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
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
        if (viewModel.AccountingProvider) {
          response = viewModel.AccountingProvider;
          let list = response.responseList;
          if (list.length > 0) {
            scope.setSegmentData();
          } else {
            formTemplateScope.showBannerError({
              dbpErrMsg: kony.i18n.getLocalizedString('i18n.SBAdvisory.itLooksLike')
            });
          }
        }
        if (viewModel.isEnrolled) {
          if (viewModel.isEnrolled.hasOwnProperty("errmsg_postConnection")) {
            scope.view.formTemplate12.showBannerError({
              dbpErrMsg: kony.i18n.getLocalizedString('i18n.SBAdvisory.accountingSoftwareError')
            });
          } else {
            applicationManager.setSBAUpdatedParty(sbaEnrolmentStatuses.INPROGRESS);
            presenter.navigateToScreens("SBALoginScreen");
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
     * This function responsible for setting up the initial UI
     * @return : NA
     */
    setDefaultUI: function() {
      var scope = this;
      try {
        isAccountSelected = false;
        isMyCompanySelected = false;
        contentScope.lblMyCompanyDropdownValue.text = kony.i18n.getLocalizedString("i18n.wealth.select");
        contentScope.flxSegMyCompany.setVisibility(false);
        contentScope.lblTermsAndCondCheckbox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        scope.enableOrDisableContinueButton(false);
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
     * @api : initOnclickActions
     * This function defines the all the onClick events in the form
     * @return : NA
     */
    initOnclickActions: function() {
      var scope = this;
      try {
        contentScope.flxMyCompanyDropdown.onClick = scope.showOrHideMyCompany.bind(this);
        contentScope.flxTermsAndCondCheckbox.onClick = scope.selectTermsAndCond.bind(this);
        contentScope.btnContinue.onClick = scope.navigateToLoginScreen.bind(this);
        contentScope.btnTermsAndCond.onClick = scope.setDataToPopup.bind(this, "TAndC");
        contentScope.btnLearnMore.onClick = scope.setDataToPopup.bind(this, "LearnMore");
        popupScope.flxTAndCClose.onClick = scope.termsAndConditionPopupVisibility.bind(this);
        contentScope.btnCancel.onClick = () => {
          presenter.updateSBAStatusForCancel();
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
     * @api : setCompanyAndUserDetails
     * This function responsible fot setting company and user details
     * @return : NA
     */
    setCompanyAndUserDetails: function() {
      var scope = this;
      try {
        scope.setSegMyCompanyData();
        contentScope.lblUserDropdownValue.text = (userObject.userfirstname && userObject.LastName) ? userObject.userfirstname + " " + userObject.LastName : NA;
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "setCompanyAndUserDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
  /**
     * @api : getAccountingProvider
     * This function involves service call for getting accounting provider 
     * @return : NA
     */
    getAccountingProvider: function() {
      var scope = this;
      try {
        presenter.getAccountingProvider({}, "frmConnectAccount2");
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "getAccountingProvider",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
  /**
     * @api : setSegmentData
     * This function is resposible for setting accounting provider data to seg
     * @return : NA
     */
    setSegmentData: function(data) {
      var scope = this;
      let AccountingData = [];
      var segData;
      var data;
      try {
        scope.setsegWidgetMap();
        for (i = 0; i < response.responseList.length; i += 6) {
          segData = [];
          segData.push({});
          segData[1] = [];
          var slicedData = response.responseList.slice(i, i + 6)
          data = {};
          slicedData.forEach((record, index) => {
            data = Object.assign(data, {
              ["flxAccountingProvider" + (index + 1)]: {
                isVisible: ((response.responseList.length - index) > 0) ? true : false
              },
              ["imgAccProvider" + (index + 1)]: {
                src: record.logoUrl
              },
              ["flxAccProvider" + (index + 1)]: {
                onClick: function () {
                  scope.onSelectingAccountProvider("lblAccProvider" + (index + 1))
                  isAccountSelected = true;
                  selectedAccount = response.responseList[index];
                  scope.enableOrDisableContinueButton(true);
                }
              },
              ["lblAccProvider" + (index + 1)]: {
                text: OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED
              }
            })
          });
          segData[1].push(data);
          AccountingData.push(segData);
        }
        contentScope.segAccProviders.setData(AccountingData);
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "setSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
  /**
     * @api : setsegWidgetMap
     * This function is resposible for setting widgetMap for segment inorder to display accounting provider
     * @return : NA
     */
    setsegWidgetMap: function() {
      contentScope.segAccProviders.widgetDataMap = {
        "flxMainAccountingProviders": "flxMainAccountingProviders",
        "flxAccountingProvider1": "flxAccountingProvider1",
        "flxAccountingProvider2": "flxAccountingProvider2",
        "flxAccountingProvider3": "flxAccountingProvider3",
        "flxAccountingProvider4": "flxAccountingProvider4",
        "flxAccountingProvider5": "flxAccountingProvider5",
        "flxAccountingProvider6": "flxAccountingProvider6",
        "imgAccProvider1": "imgAccProvider1",
        "lblAccProvider1": "lblAccProvider1",
        "imgAccProvider2": "imgAccProvider2",
        "lblAccProvider2": "lblAccProvider2",
        "imgAccProvider3": "imgAccProvider3",
        "lblAccProvider3": "lblAccProvider3",
        "imgAccProvider4": "imgAccProvider4",
        "lblAccProvider4": "lblAccProvider4",
        "imgAccProvider5": "imgAccProvider5",
        "lblAccProvider5": "lblAccProvider5",
        "imgAccProvider6": "imgAccProvider6",
        "lblAccProvider6": "lblAccProvider6",
        "flxAccProvider1": "flxAccProvider1",
        "flxAccProvider2": "flxAccProvider2",
        "flxAccProvider3": "flxAccProvider3",
        "flxAccProvider4": "flxAccProvider4",
        "flxAccProvider5": "flxAccProvider5",
        "flxAccProvider6": "flxAccProvider6",
      }
    },
    
  /**
     * @api : onSelectingAccountProvider
     * This function is resposible for actions to be performed on selecting account provider
     * @return : NA
     */
    onSelectingAccountProvider: function(selectedValue) {
      var scope = this;
      try {
        var segmentdata = contentScope.segAccProviders.data;
        var index = contentScope.segAccProviders.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var sections = segmentdata.length;
        for (let i = 0; i < sections; i++) {
          if (i === sectionIndex) {
            for (let item of Object.keys(segmentdata[i][1][rowIndex])) {
              if (item.includes('lblAccProvider')) {
                if (item === selectedValue) {
                  segmentdata[i][1][rowIndex][item].text = OLBConstants.FONT_ICONS.RADIOBUTTON_SELECTED;
                } else {
                  segmentdata[i][1][rowIndex][item].text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
                }
              }
            }
          } else {
            for (let item of Object.keys(segmentdata[i][1][rowIndex])) {
              segmentdata[i][1][rowIndex][item].text = OLBConstants.FONT_ICONS.RADIOBUTTON_UNSELECTED;
            }
          }
          contentScope.segAccProviders.setDataAt(segmentdata[i][1][0], rowIndex, i);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

  /**
     * @api : enableOrDisableContinueButton
     * This function is responsible for enable or disable submit button
     * @return : NA
     */
    enableOrDisableContinueButton: function(param) {
      var scope = this;
      try {
        if (param && contentScope.lblTermsAndCondCheckbox.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED && isAccountSelected && isMyCompanySelected) {
          contentScope.btnContinue.setEnabled(true);
          contentScope.btnContinue.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
        } else {
          contentScope.btnContinue.setEnabled(false);
          contentScope.btnContinue.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "enableOrDisableContinueButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
        /**
         * @api : selectTermsAndCond
     * This function is resposible for UI change for Terms and Conditions Checkbox
     * @return : NA
     */
    selectTermsAndCond: function() {
      var scope = this;
      try {
        if (contentScope.lblTermsAndCondCheckbox.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
          contentScope.lblTermsAndCondCheckbox.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
          scope.enableOrDisableContinueButton(true);
        } else {
          contentScope.lblTermsAndCondCheckbox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          scope.enableOrDisableContinueButton(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "selectTermsAndCond",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

   /**
     * @api : showOrHideMyCompany
     * This function is resposible for showing or hiding myCompany dropdown
     * @return : NA
     */
    showOrHideMyCompany: function() {
      var scope = this;
      try {
        if (contentScope.lblMyCompanyDropdownIcon.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
          contentScope.lblMyCompanyDropdownIcon.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          contentScope.flxSegMyCompany.setVisibility(false);
        } else {
          contentScope.lblMyCompanyDropdownIcon.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          contentScope.flxSegMyCompany.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "showOrHideMyCompany",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

   /**
     * @api : segMyCompanyRowOnClick
     * This function is defines the actions to be performed for selecting my company from dropdown
     * @return : NA
     */
    segMyCompanyRowOnClick: function(selectedData) {
      var scope = this;
      try {
        contentScope.flxCashFlowAnalysis.setVisibility(false);
        contentScope.flxTermsAndLearnMore.setVisibility(true);
        contentScope.flxSelectYourAccountingProvider.setVisibility(true);
        contentScope.flxSeparator.top="30px";
        applicationManager.setSelectedSbaBusiness(selectedData);
        contentScope.lblMyCompanyDropdownValue.text = selectedData.coreCustomerName;
        selectedCustomer = selectedData.coreCustomerID;
        contentScope.lblMyCompanyDropdownValue.skin = "sknLblSSP15pxtrucation";
        contentScope.lblMyCompanyDropdownIcon.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN
        contentScope.flxSegMyCompany.setVisibility(false);
        isMyCompanySelected = true;
        scope.enableOrDisableContinueButton(true);
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "segMyCompanyRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setSegMyCompanyData
      * This function is defines the setting of my company dropdown values
      * @return : NA
      */
    setSegMyCompanyData: function () {
      var scope = this;
      var segmentData = [];
      var myCompanyList = [];
      try {
        var coreCustomers = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
        applicationManager.sbaJourney.map(business => {
          coreCustomers.forEach((customer) => {
            if (customer.coreCustomerID === business.BackendId) {
              business["coreCustomerName"] = customer.coreCustomerName;
              if (business.hamburgerMenu && business.hamburgerMenu.enrol) {
                myCompanyList.push(business);
              }
            }
          });
        });
        if (myCompanyList.length > 1) {
          contentScope.flxCashFlowAnalysis.setVisibility(true);
          contentScope.flxTermsAndLearnMore.setVisibility(false);
          contentScope.flxSelectYourAccountingProvider.setVisibility(false);
          contentScope.flxSeparator.top = "125px";
          contentScope.flxMyCompanyDropdown.setEnabled(true);
          contentScope.flxMyCompanyDropdown.skin = "ICSknFlxE3E3E3Border";
          contentScope.lblMyCompanyDropdownIcon.skin = "ICSknOlbFontsIcons0273e3";
          contentScope.lblMyCompanyDropdownValue.skin = "ICSknLabelSSPRegular72727215px";
          contentScope.lblMyCompanyDropdownIcon.text = "O";
          myCompanyList.sort((obj1, obj2) => {
            return obj1.coreCustomerName.localeCompare(obj2.coreCustomerName);
          });
        } else if (myCompanyList.length == 1) {
          contentScope.flxCashFlowAnalysis.setVisibility(false);
          contentScope.flxMyCompanyDropdown.setEnabled(false);
          contentScope.flxMyCompanyDropdown.skin = "sknflxbgf7f7f7op100Bordere3e3e3radius2px";
          contentScope.lblMyCompanyDropdownIcon.skin = "ICSknLblClearFontIcon727272";
          contentScope.lblMyCompanyDropdownValue.skin = "ICSknLabelSSPRegular72727215px";
          contentScope.lblMyCompanyDropdownIcon.text = "d";
          contentScope.lblMyCompanyDropdownValue.text = myCompanyList[0].coreCustomerName;
          selectedCustomer = myCompanyList[0].coreCustomerID;
          isMyCompanySelected = true;
        }
        if (myCompanyList.length < 5) {
          rowHeight = (myCompanyList.length) * 40;
          this.view.formTemplate12.flxContentTCCenter.flxSegMyCompany.segMyCompany.height = rowHeight + "px";
        } else {
          this.view.formTemplate12.flxContentTCCenter.flxSegMyCompany.height = "200px";
        }
        contentScope.segMyCompany.widgetDataMap = {
          "lblDropDownValue": "lblDropDownValue",
          "flxSbaListDropDown": "flxSbaListDropDown"
        };
        for (let myCompany of myCompanyList) {
          segmentData.push({
            "lblDropDownValue": myCompany.coreCustomerName,
            "flxSbaListDropDown": {
              onClick: this.segMyCompanyRowOnClick.bind(this, myCompany)
            }
          });
        }
        contentScope.segMyCompany.setData(segmentData);
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "setSegMyCompanyData",
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
    onBreakpointChange: function() {
      var scope = this;
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
        isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
        isTablet = false;
      }
      try {} catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function(err) {
      var errMsg = JSON.stringify(err);
    },

    /**
     * @api : termsAndConditionPopupVisibility
     * This function is resposible for show and hide popup
     * @return : NA
     */
    termsAndConditionPopupVisibility: function () {
      popupScope.setVisibility(!popupScope.isVisible);
    },

    /**
     * @api : setPopupWidgetMap
     * This function is resposible for widget data mapping for popup
     * @return : NA
     */
    setPopupWidgetMap: function () {
      try {
        popupScope.segTermsAndConditions.widgetDataMap = {
          "flxHeaderTermsAndCond": "flxHeaderTermsAndCond",
          "lblHeaderTermsAndCond": "lblHeaderTermsAndCond",
          "flxRowTermsAndCond": "flxRowTermsAndCond",
          "flxTAndC": "flxTAndC",
          "lblTermsAndCond": "lblTermsAndCond"
        }
      }
      catch (err) {
        var errorObj =
        {
          "level": "frmConnectAccount2",
          "method": "setPopupWidgetMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDataToPopup
     * This function is resposible for setting data to Terms and conditions, Learn more.
     * @return : NA
     */
    setDataToPopup: function (action) {
      try {
        var scope = this;
        var data;
        popupScope.segTermsAndConditions.removeAll();
        if (action === "TAndC") {
          popupScope.lblTAndCHeading.text = kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
          data = scope_configManager.sbaTNCData;
        } else {
          popupScope.lblTAndCHeading.text = kony.i18n.getLocalizedString("kony.mb.login.learnMore");
          data = scope_configManager.sbaLearnMore;
        }
        scope.setPopupWidgetMap();
        let tempTnC = [];
        data.map((item) => {
          tempTnC.push(
            [
              {
                "lblHeaderTermsAndCond": item.heading
              },
              [
                {
                  "lblTermsAndCond": item.description
                }
              ],
            ]
          );
        });
        popupScope.segTermsAndConditions.setData(tempTnC);
        tempTnC = [];
        scope.termsAndConditionPopupVisibility();
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "setDataToPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
        },

    /**
     * @api : navigateToLoginScreen
     * This function is resposible for navigating to SBA Login Screen
     * @return : NA
     */
    navigateToLoginScreen: function () {
      var scope = this;
      try {
        applicationManager.sbaJourney.map(data => {
          if (data.coreCustomerID === selectedCustomer) {
            data.accountingSoftwareName = selectedAccount.name;
            data.accountingSoftwareId = selectedAccount.integrationId;
          }
        });
        presenter.navigateToScreens("SBALoginScreen");
      } catch (err) {
        var errorObj = {
          "level": "frmConnectAccount2",
          "method": "navigateToLoginScreen",
          "error": err
        };
        scope.onError(errorObj);
      }
    }
    };
});