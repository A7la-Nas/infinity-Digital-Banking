define(['FormControllerUtility', 'CommonUtilities', 'OLBConstants', 'ViewConstants'], function(FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
    function InformationContent_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(InformationContent_PresentationController, kony.mvc.Presentation.BasePresenter);
    InformationContent_PresentationController.prototype.initializePresentationController = function() {};
    /**
     * Takes category name of help as input parameter and calls command handler for getting the response from back-end. Differentiates between pre-login and postlogin view.
     * @member of {InformationContent_PresentationController}
     * @param {type} param: category name for help
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showOnlineHelp = function(param1) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmOnlineHelp"
        });
      navManager.navigateTo("frmOnlineHelp") ;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (userPrefManager.isLoggedIn !== true) {
            navManager.updateForm({
                "showOnlineHelp": {
                    param: "preLoginView"
                }
            });
        } else {
            navManager.updateForm({
                "showOnlineHelp": {
                    param: param1
                }
            });
        }
    };
    /**
     * Takes category name of help as input parameter and calls command handler for getting the response from back-end.
     * @member of {InformationContent_PresentationController}
     * @param {type} param: category name for help
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showOnlineHelpSubmenu = function(param, isSearchString) {
        var self = this;
        var searchStr = param;
        if (isSearchString === true) {
            param = {};
        }
        applicationManager.getInformationManager().fetchFAQs(this.onSuccessShowOnlineHelpSubmenu.bind(this, isSearchString, searchStr), this.onFailureShowOnlineHelpSubmenu.bind(this));
    };
    /**
     * Method will handle once Online Help response is successfull.
     * @param {string} [isSearchString] isSearchString, will determine if it is the search flow
     * @param {string} [searchStr] searchStr, Search string
     * @param {Object} response login success response object
     */
    InformationContent_PresentationController.prototype.onSuccessShowOnlineHelpSubmenu = function(isSearchString, searchStr, response) {
        var navManager = applicationManager.getNavigationManager();
        if (isSearchString === true) {
            var param = searchStr;
            navManager.updateForm({
                "showOnlineHelpResponse": {
                    responseData: response,
                    responseParam: param,
                    isSearchString: true
                }
            });
        } else {
            navManager.updateForm({
                "showOnlineHelpResponse": {
                    responseData: response,
                    responseParam: searchStr,
                    isSearchString: false
                }
            });
        }
    };
    /**
     * Method will handle once Online Help response is failure.
     * @param {Object} response login success response object
     */
    InformationContent_PresentationController.prototype.onFailureShowOnlineHelpSubmenu = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "showOnlineHelpResponse": {
                status: "error"
            }
        });
    };
    /**
     * Method to fetch contactUs information Show ContactUs Page
     * @member of Class InformationContent_PresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showContactUsPage = function() {
        var self = this;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        navManager.updateForm({
            loadingIndicator: {
                status: true
            }
        });
        if (userPrefManager.isLoggedIn !== true) {
            navManager.updateForm({
                viewType: "preLogin"
            });
        } else {
            navManager.updateForm({
                viewType: "postLogin"
            });
        }
        applicationManager.getInformationManager().fetchContactUs(this.onSuccessShowContactUsPage.bind(this), this.onFailureShowContactUsPage.bind(this));
    };
    /**
     * Method will handle once Contact Us response is successfull.
     * @param {Object} response success response object
     */
    InformationContent_PresentationController.prototype.onSuccessShowContactUsPage = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      	navManager.navigateTo("frmContactUsPrivacyTandC") ;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        navManager.updateForm({
            "showContactUs": response.records
        });
    };
    /**
     * Method will handle once Contact Us response is failure.
     * @param {Object} response failure response object
     */
    InformationContent_PresentationController.prototype.onFailureShowContactUsPage = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        navManager.updateForm({
            "showContactUs": {
                status: "error"
            }
        });
    };
    /**
     * Method to set Prelogin or PostLogin view on Show privacy policy screen
     * @member of Class InformationContent_PresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showPrivacyPolicyPage = function() {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        if (userPrefManager.isLoggedIn !== true) {
            navManager.updateForm({
                "showLoadingIndicatorPrivacyPolicy": {
                    view: "preLogin"
                }
            });
        } else {
            navManager.updateForm({
                "showLoadingIndicatorPrivacyPolicy": {
                    view: "postLogin"
                }
            });
        }
    };
    /**
     * Method to fetch privacy policy information Show privacy policy
     * @member of Class InformationContent_PresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showPrivacyPolicyAfterLoading = function() {
        applicationManager.getInformationManager().fetchPrivacyPolicy(this.onSuccessShowPrivacyPolicyAfterLoading.bind(this), this.onFailureShowPrivacyPolicyAfterLoading.bind(this));
    };
    /**
     * Method will handle once Privacy Policy response is successfull.
     * @param {Object} response success response object
     */
    InformationContent_PresentationController.prototype.onSuccessShowPrivacyPolicyAfterLoading = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        navManager.updateForm({
            "showPrivacyPolicy": {
                serviceData: response
            }
        });
    };
    /**
     * Method will handle once Privacy Policy response is failure.
     * @param {Object} response failure response object
     */
    InformationContent_PresentationController.prototype.onFailureShowPrivacyPolicyAfterLoading = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        navManager.updateForm({
            "showPrivacyPolicy": {
                serviceData: "error"
            }
        });
    };
    /**
     * Takes form name as input parameter and data and loads the view of form
     * @member of {InformationContent_PresentationController}
     * @param {type} param: form name and data
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showView = function(frm, data) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo(frm);
        navManager.updateForm(data);
    };
    /**
     * Method to fetch terms and conditions information terms and conditions
     * @member of Class InformationContent_PresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showTermsAndConditions = function() {
        var self = this;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationContentUIModule/frmContactUsPrivacyTandC"});
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        if (userPrefManager.isLoggedIn !== true) {
            navManager.updateForm({
                viewType: "preLogin"
            });
        } else {
            navManager.updateForm({
                viewType: "postLogin"
            });
        }
        applicationManager.getInformationManager().fetchTermsAndConditions(this.onSuccessShowTermsAndConditions.bind(this), this.onFailureShowTermsAndConditions.bind(this));
    };
    /**
     * Method will handle once Terms and conditions response is successfull.
     * @param {Object} response success response object
     */
    InformationContent_PresentationController.prototype.onSuccessShowTermsAndConditions = function(response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationContentUIModule/frmContactUsPrivacyTandC"});
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        if (userPrefManager.isLoggedIn !== true) {
            navManager.updateForm({
                "showTnC": {
                    serviceData: response,
                    param: "preLoginView"
                }
            });
        } else {
            FormControllerUtility.showProgressBar(this.view);
            navManager.updateForm({
                "showTnC": {
                    serviceData: response,
                    param: "postLoginView"
                }
            });
        }
    };
    /**
     * Method will handle once Terms and conditions response is failure.
     * @param {Object} response failure response object
     */
    InformationContent_PresentationController.prototype.onFailureShowTermsAndConditions = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
      navManager.navigateTo("frmContactUsPrivacyTandC") ;
        navManager.updateForm({
            "showTnC": {
                serviceData: "error"
            }
        });
    };
    /**
     * Method to fetch FAQ's information Show FAQs from footer link
     * @member of Class InformationContent_PresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    InformationContent_PresentationController.prototype.showFAQs = function() {
        this.showOnlineHelp();
    };
  
  InformationContent_PresentationController.prototype.showTermsAndConditions = function(flowType, success, failure) {
        params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
        };
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC) {
                params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Common_TnC;
                applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPreLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
            } else if (flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
                params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Common_TnC;
                applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
            }
        } else if (flowType === OLBConstants.TNC_FLOW_TYPES.Enroll_TnC) {
            params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Enroll_TnC;
            applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPreLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
        } else {
            params.termsAndConditionsCode = flowType;
            applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
        }
    };
    /**
     * Method will handle once Terms and conditions response is successfull.
     * @param {Object} response success response object
     */
    InformationContent_PresentationController.prototype.onSuccessShowTermsAndConditions = function(flowType, success, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            if (response.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                window.open(response.termsAndConditionsContent);
            } else {
                navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationContentUIModule/frmContactUsPrivacyTandC"});
              navManager.navigateTo("frmContactUsPrivacyTandC") ;
                if (userPrefManager.isLoggedIn !== true) {
                    navManager.updateForm({
                        viewType: "preLogin"
                    });
                } else {
                    navManager.updateForm({
                        viewType: "postLogin"
                    });
                }
            }
            if (userPrefManager.isLoggedIn !== true) {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: response,
                        param: "preLoginView"
                    }
                });
            } else {
                FormControllerUtility.showProgressBar(this.view);
                navManager.updateForm({
                    "showTnC": {
                        serviceData: response,
                        param: "postLoginView"
                    }
                });
                FormControllerUtility.hideProgressBar(this.view);
            }
        } else {
            success(response);
        }
    };
    /**
     * Method will handle once Terms and conditions response is failure.
     * @param {Object} response failure response object
     */
    InformationContent_PresentationController.prototype.onFailureShowTermsAndConditions = function(flowType, failure, response) {
        var navManager = applicationManager.getNavigationManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            navManager.navigateTo({
            "appName": "AboutUsMA",
            "friendlyName": "InformationContentUIModule/frmContactUsPrivacyTandC"
        });
          navManager.navigateTo("frmContactUsPrivacyTandC") ;
            if (userPrefManager.isLoggedIn !== true) {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: "error",
                        errorMessage: response.errorMessage,
                        param: "preLoginView"
                    }
                });
            } else {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: "error",
                        errorMessage: response.errorMessage,
                        param: "postLoginView"
                    }
                });
            }
        } else {
            if (response.isServerUnreachable) {
                this.navigateToServerDownScreen();
            } else {
                if (typeof failure === "function") {
                    failure(response.errorMessage);
                } else {
                    this.navigateToServerDownScreen();
                }
            }
        }
    };
  
    return InformationContent_PresentationController;
});