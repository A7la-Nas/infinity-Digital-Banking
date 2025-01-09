define(['FormControllerUtility', 'CommonUtilities', 'OLBConstants', 'ViewConstants'], function(FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
    function TermsAndConditionsPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(TermsAndConditionsPresentationController, kony.mvc.Presentation.BasePresenter);
    /** Presents TermsAndConditions Form
     * @param {object} viewModel - To handle the flow of where it is suppose to go
     */
    TermsAndConditionsPresentationController.prototype.presentTermsAndConditions = function(viewModel) {
        if (kony.application.getCurrentForm().id !== frmPreTermsandCondition) {
            applicationManager.getNavigationManager().navigateTo(frmPreTermsandCondition);
        }
        applicationManager.getNavigationManager().updateForm(viewModel, frmPreTermsandCondition);
    };
    /**
     * Method to create Tnc when user agree to Tnc
     * @member of Class TermsAndConditionsPresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
    TermsAndConditionsPresentationController.prototype.createTnC = function(flowType) {
        params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": flowType
        };
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            applicationManager.getTermsAndConditionManager().createTermsAndConditionsLogin(params, this.onSuccessCreateTnC.bind(this, flowType), this.onFailureCreateTnC.bind(this, flowType));
        }
    };
    TermsAndConditionsPresentationController.prototype.onSuccessCreateTnC = function(flowType) {
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "AuthenticationMA", "moduleName" : "AuthUIModule"});
            authModule.presentationController.doPostLoginWork();
        }
    };
    TermsAndConditionsPresentationController.prototype.onFailureCreateTnC = function(flowType, response) {
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            applicationManager.getNavigationManager().updateForm({
                error: response
            }, "frmPreTermsandCondition");
        }
    };
    /**
     * Method to fetch terms and conditions information terms and conditions
     * @member of Class TermsAndConditionsPresentationController
     * @param flowType - flow value from OLBConstants.TNC_FLOW_TYPES
     * @param success - success callback
     * @param failure - failure callback
     * @returns {void} - None
     * @throws {void} -None
     */
    TermsAndConditionsPresentationController.prototype.showTermsAndConditions = function(flowType, success, failure) {
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
    TermsAndConditionsPresentationController.prototype.onSuccessShowTermsAndConditions = function(flowType, success, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            if (response.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                window.open(response.termsAndConditionsContent);
            } else {
                navManager.navigateTo("frmContactUsPrivacyTandC");
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
    TermsAndConditionsPresentationController.prototype.onFailureShowTermsAndConditions = function(flowType, failure, response) {
        var navManager = applicationManager.getNavigationManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            navManager.navigateTo("frmContactUsPrivacyTandC");
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
    /**
     * navigateToServerDownScreen :Function to navigate to server down screen
     */
    TermsAndConditionsPresentationController.prototype.navigateToServerDownScreen = function() {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "AuthenticationMA", "moduleName" : "AuthUIModule"});
        authModule.presentationController.showLoginScreen({
            "hideProgressBar": true,
            "action": "ServerDown"
        });
    };
    return TermsAndConditionsPresentationController;
});