define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function EnrolmentPresentationController() {
    this.SBAInfoScreen  = "frmConnectAccount1";
    this.SBAStimulation = "frmCashSimulation";
    this.SBAEnrolment = "frmConnectAccount2";
    this.SBALoginScreen = "frmAccProviderLogin";
    this.navigationManager = applicationManager.getNavigationManager();
    this.enrolmentManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      moduleName: 'EnrolmentManager',
      appName: 'SBAdvisoryMA'
    }).businessController;
    this.parameterValue = scope_configManager.sbaSimulationChange.valueChangeInSimulation,
    kony.mvc.Presentation.BasePresenter.call(this);
    this.SBAConstants = {
      SBA_XAI_DASHBOARD: 'SBA_XAI_DASHBOARD'
    };
  }

  inheritsFrom(EnrolmentPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  EnrolmentPresentationController.prototype.initializePresentationController = function() {

  };

  /**
    * Method to handle all navigations for Smart Banking Advisory
    * @param {object} param - form context
    */
  EnrolmentPresentationController.prototype.navigateToScreens = function (param, data) {
    let navObj = {
      appName: 'SBAdvisoryMA',
    };
    switch (param) {
      case 'SBAInfo':
        navObj.friendlyName = this.SBAInfoScreen;
        this.navigationManager.navigateTo(navObj);
        break;
      case 'SBAStimulation':
        navObj.friendlyName = this.SBAStimulation;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
      case 'SBAEnrolment':
        navObj.friendlyName = this.SBAEnrolment;
        this.navigationManager.navigateTo(navObj);
        break;
      case 'HomepageDashboard':
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule",
          "appName": "HomepageMA"
        });
        accountsModule.presentationController.showAccountsDashboard();
        break;
      case 'SBALoginScreen':
        navObj.friendlyName = this.SBALoginScreen;
        this.navigationManager.navigateTo(navObj);
        break;
    }
  };
  
  /**
   * Method to show a particular form
   * @param {object} param0 - contains info to load the particular form
   */
  EnrolmentPresentationController.prototype.showView = function({
    appName,
    form,
    data
  }) {
    if (kony.application.getCurrentForm().id !== form) {
      const navObj = {
        appName: appName || 'SBAdvisoryMA',
        friendlyName: form
      };
      this.navigationManager.navigateTo(navObj);
    }
    if (!this.isEmptyNullOrUndefined(data)) {
      this.navigationManager.updateForm(data, form);
    }
  };

  /**
   * Method to show the loading indicator
   */
  EnrolmentPresentationController.prototype.showProgressBar = function() {
    this.navigationManager.updateForm({
      isLoading: true
    });
  };
  /**
   * Method to hide the loading indicator
   */
  EnrolmentPresentationController.prototype.hideProgressBar = function() {
    this.navigationManager.updateForm({
      isLoading: false
    });
  };

  /**
   * Method to get Accounting Providers
   * @param {object} params - consist of payload to get Accounting Providers
   * @param {string} frm - form name
   */
  EnrolmentPresentationController.prototype.getAccountingProvider = function(params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.fetchAccountingProvider(params, this.getAccountingProviderSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };
  /**
   * Success callback for get Accounting Providers
   * @param {object} response - consist records
   */
  EnrolmentPresentationController.prototype.getAccountingProviderSuccess = function(form, callback, response) {
    this.hideProgressBar();
    this.collectionResponse = response;
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          AccountingProvider: response
        }
      });
    }
  };

  /**
   * Method to handle service failure
   * @param {string} form form id
   * @param {object} response contains error info
   */
  EnrolmentPresentationController.prototype.commonServiceFailureMethod = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        errResponse: response,
      }
    });
  };
  /**
   * Method to verify whether the value is empty, null or undefined
   * @param {any} data - value to be verified
   * @returns {boolean} - validity of the value passed
   */
  EnrolmentPresentationController.prototype.isEmptyNullOrUndefined = function(data) {
    try {
      data = JSON.parse(data);
    } catch (err) {}
    if (data === null || data === undefined || (typeof data === "string" && data.trim() === "")) return true;
    if (typeof data === "object") {
      if (Array.isArray(data)) return data.length === 0;
      return Object.keys(data).length === 0;
    }
    return false;
  };
  
    /**
   * Method to get Enroll
   * @param {object} params - consist of payload to get Enrolled
   * @param {string} frm - form name
   */
  EnrolmentPresentationController.prototype.getEnrolled = function(params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.EnrollSBA(params, this.getEnrolledSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };
  /**
   * Success callback for getting Enrolled
   * @param {object} response - consist records
   */
  EnrolmentPresentationController.prototype.getEnrolledSuccess = function(form, callback, response) {
    this.hideProgressBar();
    this.collectionResponse = response;
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
            isEnrolled: response
        }
      });
    }
  };

  /**
 * Method to get Enroll
 * @param {object} params - consist of payload to get Enrolled
 * @param {string} frm - form name
 */
  EnrolmentPresentationController.prototype.updateSBAStatus = function (params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.updateSBAStatus(params, this.updateSBAStatusSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for getting Enrolled
   * @param {object} response - consist records
   */
  EnrolmentPresentationController.prototype.updateSBAStatusSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          updateSBAStatus: response
        }
      });
    }
  };

  /**
  * Method to update SBA Status while cancel
  * @param {object} params - consist of payload to get canceled
  * @param {string} frm - form name
  */
  EnrolmentPresentationController.prototype.updateSBAStatusForCancel = function (params, form, callback) {
    this.showProgressBar();
    const now = new Date();
    let isoString = now.toISOString();
    let sbaEnrolmentStatus = JSON.stringify({
      "status": OLBConstants.SBA_ENROLMENT_STATUS_CONFIG.CANCELED,
      "eventDateTime": isoString
    });
    var payload = {
      "customerId": applicationManager.getSelectedSbaBusiness().Customer_id,
      "sbaEnrolmentStatus": sbaEnrolmentStatus
    }
    this.enrolmentManager.updateSBAStatus(payload, this.updateSBAStatusForCancelSuccess.bind(this), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for updating SBA status for cancel
   * @param {object} response - success for updation of SBA status
   */
  EnrolmentPresentationController.prototype.updateSBAStatusForCancelSuccess = function () {
    this.hideProgressBar();
    applicationManager.sbaJourney.map(data => {
      if (data.sbaEnrolmentStatus.customerId === applicationManager.getSelectedSbaBusiness().sbaEnrolmentStatus.customerId) {
        data.sbaEnrolmentStatus.status = OLBConstants.SBA_ENROLMENT_STATUS_CONFIG.CANCELED
      }
    });
    this.navigateToScreens('HomepageDashboard');
  };

  /**
    * Method to get Cash Flow Prediction
    * @param {object} params - consist of payload to get Cash Flow Prediction
    * @param {string} form - form name
    */
  EnrolmentPresentationController.prototype.getCashFlow = function (params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.fetchCashFlow(params, this.getCashFlowSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
    * Success callback for getting Cash Flow Prediction
    * @param {object} response - consist records
    */
  EnrolmentPresentationController.prototype.getCashFlowSuccess = function (form, callback, response) {
    this.hideProgressBar();
    this.navigationManager.updateForm({
      "cashFlowPrediction": response
    }, this.SBAStimulation);
  };

  /**
     * @api : replaceDriverValues
     * This function is resposible for replacing some values in driver details
     * @return : NA
     */
  EnrolmentPresentationController.prototype.replaceDriverValues = function(driverDetails,replacingValue){
    let finalDetail;
    if(this.isEmptyNullOrUndefined(driverDetails)){
      return "";
    }else{
      finalDetail = driverDetails.split("[")[0] + applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(replacingValue);
      return finalDetail;
    }
  };
  
  /**
    * Method to simulate Cash Flow
    * @param {object} params - consist of payload to simulate Cash Flow
    * @param {string} form - form name
    */
  EnrolmentPresentationController.prototype.simulateCashFlow = function (params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.simulateCashFlow(params, this.simulateCashFlowSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
    * Success callback for getting Cash Flow Prediction
    * @param {object} response - consist records
    */
  EnrolmentPresentationController.prototype.simulateCashFlowSuccess = function (form, callback, response) {
    this.hideProgressBar();
    this.navigationManager.updateForm({
      "simulationCashFlow": response.responseList[0]
    }, form);
  };
  
  /**
    * Method to Cash Flow
    * @param {object} params - consist of payload to Cash Flow
    * @param {string} form - form name
    */
  EnrolmentPresentationController.prototype.fetchCashFlow = function (params, form, callback) {
    this.showProgressBar();
    applicationManager.getAccountManager().fetchCashFlow(params, this.fetchCashFlowSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
    * Success callback for getting Cash Flow 
    * @param {object} response - consist records
    */
  EnrolmentPresentationController.prototype.fetchCashFlowSuccess = function (form, callback, response) {
    this.hideProgressBar();
    this.navigationManager.updateForm({
      "CashFlowData": response
    }, form);
  };
  
  /**
    * Method to download Excel
    * @param {object} params - consist of payload to download excel
    * @param {string} form - form name
    */
  EnrolmentPresentationController.prototype.downloadExcel = function (params, form, callback) {
    this.showProgressBar();
    this.enrolmentManager.downloadExcel(params, this.downloadExcelSuccess.bind(this, form, params, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
    * Success callback for generating excel file
    * @param {object} response - consist records
    */
  EnrolmentPresentationController.prototype.downloadExcelSuccess = function (form, params, callback, response) {
    if(response){
      var url = response.httpresponse.url;
      CommonUtilities.downloadAttachment(url, params);    
    }
    this.hideProgressBar();
  };
  
  /* Method to show cursor as pointer
   * @param {Array} widgetRef - form name
   * @returns : NA
   */
  EnrolmentPresentationController.prototype.cursorTypePointer = function (widgetRef) {
    try {
      widgetRef.map(item => {
        item.cursorType = "pointer";
      });
    } catch (err) {
      var errorObj = {
        "method": "cursorTypePointer",
        "error": err
      };
      scope.onError(errorObj);
    }
  };
 
  /**
   * Method to convert error object to json
   * @returns : NA
   */
  EnrolmentPresentationController.prototype.onError = function (err) {
    var errMsg = JSON.stringify(err);
  };
  
  return EnrolmentPresentationController;
});