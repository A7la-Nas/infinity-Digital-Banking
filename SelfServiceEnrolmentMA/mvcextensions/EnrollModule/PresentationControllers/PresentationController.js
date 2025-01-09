define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    var cardsJSON = [];
    var userDetailsJSON = [];
    var userId = "";
    /**
     * Enroll Presenation to handle all enroll related functionalities. intialize members.
     * @class
     * @alias module:Enroll_PresentationController
     */
    function EnrollPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
        //scopeEnroll = this;
    }
    inheritsFrom(EnrollPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Method to intialize Enroll presentation scope data.
     */
    EnrollPresentationController.prototype.initializePresentationController = function() {
        this.enrollFormName = "frmEnrollNow";
    };
    /**
     * Entry Method - to navigate to enroll now form and display UI on the basis of context sent
     * @param {Object} [context] - object key data map to update view
     */
    EnrollPresentationController.prototype.showEnrollPage = function(context) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id !== "frmEnrollNow") {
            navManager.navigateTo("frmEnrollNow");
        }
        if (context) {
            navManager.updateForm(context);
        }
    };

  EnrollPresentationController.prototype.generateCaptchaForEnrollment = function(formCallBack) {
    applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
    applicationManager.getNewUserBusinessManager().getCaptcha({}, this.onGenerateCaptchaSuccess.bind(this, formCallBack), this.onGenerateCaptchaFailure.bind(this));
  };
  EnrollPresentationController.prototype.onGenerateCaptchaSuccess = function(formCallBack, successResponse) {
     applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
       });
    if (successResponse.encodedImage && successResponse.serviceKey) {
      let encodedimage = applicationManager.getAuthManager().getEncodedimage();
      let isLabelRefresh = (encodedimage === null || encodedimage === "") ? false : true;
      var testFormCallBack = false;
      if(!kony.sdk.isNullOrUndefined(formCallBack)) {
        var isEmpty = (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}');
        testFormCallBack = !isEmpty;
      }
      if (testFormCallBack) {
        try {
          formCallBack(
            {
              "captchaSuccess":{
                "response": successResponse,
                "isLabelRefresh": isLabelRefresh
              }
            }
          );
        }
        catch (e) {}
      }
      else {
        applicationManager.getNavigationManager().updateForm({
          "captchaSuccess": {
            "response": successResponse,
            "isLabelRefresh": isLabelRefresh
          }
        }, "EnrollUIModule/frmEnrollNow", "SelfEnrolmentMA");
      }
    }
  };
  EnrollPresentationController.prototype.onGenerateCaptchaFailure = function(errorResponse) {
    applicationManager.getNavigationManager().updateForm({
      "hideProgressBar": true,
      "captchaFailure": {}
      },"EnrollUIModule/frmEnrollNow", "SelfEnrolmentMA");
  };

    /**
     * Method to call verify user service in Auth Manager and call respective success or failure callback methods in Enroll Presenation controller.
     * Executed when the user clicks on Enroll button after entering the details.
     * @param {Object}  detailsJSON  - Parameters required to check if user is already enrolled
     * @param {string} [detailsJSON.Ssn] ssn number
     * @param {string} [detailsJSON.LastName] last name of user
     * @param {boolean} [detailsJSON.DateOfBirth] Date of birth
     */
    EnrollPresentationController.prototype.verifyUser = function(detailsJSON, callback) {
        applicationManager.getNewUserBusinessManager().setUserDetailsForEnroll(detailsJSON);
        //applicationManager.getAuthManager().VerifyUserisalreadyEnrolled(detailsJSON, this.onSuccessVerifyUSer.bind(this, detailsJSON), this.onFailureVerifyUSer.bind(this));
        applicationManager.getNewUserBusinessManager().enrollRetailUser(detailsJSON, this.onSuccessVerifyUSer.bind(this, detailsJSON, callback), this.onFailureVerifyUSer.bind(this, callback));
    };
    /**
     * Method for success callback of verify user
     * @param {string} [detailsJSON.Ssn] ssn number
     * @param {string} [detailsJSON.LastName] last name of user
     * @param {boolean} [detailsJSON.DateOfBirth] Date of birth
     * @param {Object} response response for whether user is already enrolled or not
     */
  EnrollPresentationController.prototype.onSuccessVerifyUSer = function(response, formCallBack,  detailsJSON) {
    var authManager = applicationManager.getAuthManager();
    authManager.setServicekey(detailsJSON.serviceKey);
    response.userDetails = detailsJSON;
    var context = {
      "action": "VerifyUserSuccess",
      "data": response
    };
    var testFormCallBack = false;
    if(!kony.sdk.isNullOrUndefined(formCallBack)) {
      var isEmpty = (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}');
      testFormCallBack = !isEmpty;
    }
    if (testFormCallBack) {
      try {
        formCallBack(context);
      }
      catch (e) {}
    }
    else {
      applicationManager.getNavigationManager().updateForm(context);
    }
  };
    /**
     * Method for failure callback of verify user
     * @param {Object} response response for whether user is already enrolled or not
     */
  EnrollPresentationController.prototype.onFailureVerifyUSer = function(response, formCallBack) {
    var context = {
      "action": "VerifyUserFailure",
      "data": formCallBack
    };
    var testFormCallBack = false;
    if(!kony.sdk.isNullOrUndefined(formCallBack)) {
      var isEmpty = (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}');
      testFormCallBack = !isEmpty;
    }
//     if (testFormCallBack) {
//       try {
//         formCallBack(context);
//       }
//       catch (e) {}
//     }
   // else {
      applicationManager.getNavigationManager().updateForm(context);
   // }
  };
    /**
     * Method to call fetch cards service in cards Manager and call respective success or failure callback methods in Enroll Presenation controller.
     * Executed when the user clicks on Enroll button after entering the details.
     * @param {Object}  detailsJSON  - Parameters required to fetch cards for enroll
     * @param {string} [detailsJSON.Ssn] ssn number
     * @param {string} [detailsJSON.LastName] last name of user
     * @param {boolean} [detailsJSON.DateOfBirth] Date of birth
     */
    EnrollPresentationController.prototype.goToPasswordResetOptionsPage = function(params) {
        applicationManager.getNavigationManager().updateForm({});
        applicationManager.getAuthManager().requestEnrollOTP(params, this.onrequestEnrollOTPSuccess.bind(this), this.onrequestEnrollOTPFailure.bind(this));
    };
    /**
     * Method for success callback of fetch cards for enroll
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    EnrollPresentationController.prototype.onrequestEnrollOTPSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        if (response && response.MFAAttributes) {
            authManager.setMFAResponse(response);
            authManager.setCommunicationType(response.MFAAttributes.communicationType);
            authManager.setServicekey(response.MFAAttributes.serviceKey);
        }
        var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Enroll_TnC, this.getTnCOnSuccess.bind(this, response), this.getTnCOnFailure.bind(this));
    };
    EnrollPresentationController.prototype.getTnCOnSuccess = function(OTPresponse, TnCresponse) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showScreenToEnterSecureCode": OTPresponse,
            "TnCcontent": TnCresponse
        });
    };
    EnrollPresentationController.prototype.getTnCOnFailure = function(response) {
        this.navigateToServerDownScreen();
    };
    /**
     * Method for failure callback of fetch cards for enroll
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    EnrollPresentationController.prototype.onrequestEnrollOTPFailure = function(response) {
        var context = {
            "action": "PasswordResetFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method to create cards JSON after successful fetching of cards
     * @param {Object} response  - response object for fetch cards which is required to create cards JSON
     */
    EnrollPresentationController.prototype.getCards = function(response) {
        var cardNumberJSON = response;
        cardsJSON = [];
        if (cardNumberJSON.length !== 0) {
            for (var index in cardNumberJSON) {
                var cardNumber = cardNumberJSON[index]["cardNumber"];
                var maskedcardNumber = this.maskCreditCardNumber(cardNumber); // TODO : Check for common method
                var tmpIndex = cardsJSON.length;
                cardsJSON[tmpIndex] = {};
                cardsJSON[tmpIndex][cardNumber] = maskedcardNumber;
            }
        }
    };
    /**
     * Method will mask credit card number as per requirements
     * @param {Number} cardNumber - card number required to get the masked card number
     */
    EnrollPresentationController.prototype.maskCreditCardNumber = function(cardNumber) {
        var maskedCreditNumber;
        var firstfour = cardNumber.substring(0, 4);
        var lastfour = cardNumber.substring(cardNumber.length - 4, cardNumber.length);
        maskedCreditNumber = firstfour + "XXXXXXXX" + lastfour;
        return maskedCreditNumber;
    };
    /**
     * Method will call service for validation of cvv and call success or failure callbacks
     * @param {Number} maskedCardNumber - masked card number which we received after masking
     * @param {Number} cvv - svv which user entered
     */
    EnrollPresentationController.prototype.cvvValidate = function(maskedCardNumber, cvv) {
        var cvvJSON = userDetailsJSON;
        cvvJSON.cvv = cvv;
        var unmaskedCardNumber = this.getUnMaskedCardNumber(maskedCardNumber); // TODO : check for common method
        cvvJSON.cardNumber = unmaskedCardNumber;
        applicationManager.getAuthManager().verifyCVV(cvvJSON, this.onSuccesscvvValidate.bind(this), this.onFailurecvvValidate.bind(this));
    };
    /**
     * Method called as success calback for cvvValidate
     * @param {Object} response - response from service for cvvValidate
     */
    EnrollPresentationController.prototype.onSuccesscvvValidate = function(response) {
        var context = {
            "action": "CVVValidateSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method called as failure calback for cvvValidate
     * @param {Object} response - response from service for cvvValidate
     */
    EnrollPresentationController.prototype.onFailurecvvValidate = function(response) {
        var context = {
            "action": "CVVValidateFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method to get unmasked card number from masked card number
     * @param {Number} maskedCardNumber - masked card number required for getting unmasked card number
     */
    EnrollPresentationController.prototype.getUnMaskedCardNumber = function(maskedCardNumber) {
        for (var key in cardsJSON) {
            if (cardsJSON.hasOwnProperty(key)) {
                var val = cardsJSON[key];
                if (CommonUtilities.substituteforIncludeMethod(JSON.stringify(val), maskedCardNumber)) {
                    var pos = JSON.stringify(val).indexOf(':', 1);
                    return JSON.stringify(val).substring(2, pos - 1);
                }
            }
        }
        return null;
    };
    /**
     * Method will call otp validate service from auth manager and call success or failure callbacks
     * @param {String} otp to be validated
     */
    EnrollPresentationController.prototype.otpValidate = function(otp) {
        var param = {
            "Otp": otp
        };
        applicationManager.getAuthManager().verifyOTP(param, this.onSuccessotpValidate.bind(this), this.onFailureotpValidate.bind(this));
    };
    /**
     * Method will be called as success callback for otp validate method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessotpValidate = function(response) {
        var context = {
            "action": "OTPValidateSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for otp validate method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailureotpValidate = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            var context = {
                "action": "OTPValidateFailure",
                "data": response.errorMessage
            };
            applicationManager.getNavigationManager().updateForm(context);
        }
    };
    /**
     * Method will be called to fetch otp by calling fetchOTP service of auth manager
     */
    EnrollPresentationController.prototype.requestOTP = function() {
        applicationManager.getAuthManager().fetchOTP({}, this.onSuccessrequestOTP.bind(this), this.onFailurerequestOTP.bind(this));
    };
    /**
     * Method will be called as success callback for requestOTP method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessrequestOTP = function(response) {
        var context = {
            "action": "OTPResponseSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for request otp method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailurerequestOTP = function(response) {
        var context = {
            "action": "OTPResponseFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called to invoke fetch otp service of auth manager
     */
    EnrollPresentationController.prototype.resendOTP = function() {
        applicationManager.getAuthManager().fetchOTP({}, this.onSuccessresendOTP.bind(this), this.onFailureresendOTP.bind(this));
    };
    /**
     * Method will be called as success callback for resendOTP method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessresendOTP = function(response) {
        var context = {
            "action": "OTPResendSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for resendOTP method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailureresendOTP = function(response) {
        var context = {
            "action": "OTPResendFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called to invoke create user service
     * @param {String} uName - username for creating user
     * @param {String} password - password for creating user
     */
    EnrollPresentationController.prototype.createUser = function(uName, password) {
        this.userName = uName;
        var userDetails = {
            "uName": uName,
            "password": password,
            "serviceKey": applicationManager.getAuthManager().getServicekey()
        }
        applicationManager.getNewUserBusinessManager().setUsernameAndPassword(userDetails);
        applicationManager.getNewUserBusinessManager().createUserForEnroll(this.onSuccessCreateUser.bind(this), this.onFailureCreateUser.bind(this));
    };
    /**
     * Method will be called as success callback for create user method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessCreateUser = function(response) {
        var context = {
            "action": "CreateUserSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for create user method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailureCreateUser = function(response) {
        var context = {
            "action": "CreateUserFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called to get security questions
     * @param {Object} response - response object which we receive from service which will have security questions
     */
    EnrollPresentationController.prototype.fetchSecurityQuestions = function() {
        applicationManager.getAuthManager().fetchSecurityQuestionsForEnroll(this.onSuccessfetchSecurityQuestions.bind(this), this.onFailurefetchSecurityQuestions.bind(this));
    };
    /**
     * Method will be called as success callback for get security questions method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessfetchSecurityQuestions = function(response) {
        var context = {
            "securityQuestions": [],
            "flagToManipulate": []
        };
        var i = 0;
        while (i < response.records.length) {
            context.securityQuestions[i] = response.records[i].SecurityQuestion;
            context.flagToManipulate[i] = "false";
            i++;
        }
        context = {
            "action": "FetchQuestionsSuccess",
            "data": {
                "context": context,
                "response": response.records
            }
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for get security questions method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailurefetchSecurityQuestions = function(response) {
        var context = {
            "action": "FetchQuestionsFailure",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * saveSecurityQuestions : function to save security questions and given answers
     * @param {Object} data questions and answers JSON
     */
    EnrollPresentationController.prototype.saveSecurityQuestions = function(data) {
        data = JSON.stringify(data);
        data = data.replace(/"/g, "'");
        var securityQuestionsData = {
            userName: this.userName,
            securityQuestions: data
        };
        applicationManager.getAuthManager().saveSecurityQuestionsForEnroll(securityQuestionsData, this.onSuccesSsaveSecurityQuestions.bind(this), this.onFailureSaveSecurityQuestions.bind(this));
    };
    /**
     * Method will be called as success callback for save security questions method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccesSsaveSecurityQuestions = function(response) {
        var context = {
            "action": "SaveQuestionsSuccess",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for save security questions method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailureSaveSecurityQuestions = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            var context = {
                "action": "SaveQuestionsFailure",
                "data": response.errorMessage
            };
            applicationManager.getNavigationManager().updateForm(context);
        }
    };
    /**
     * Method will be called for fetching username and password policies
     */
    EnrollPresentationController.prototype.getUserNameAndPasswordPolicies = function() {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var params = {
            "ruleForCustomer": true,
            "policyForCustomer": true
        };
        applicationManager.getAuthManager().getUsernameAndPasswordRulesAndPolicies(params, this.onSuccesUserNameAndPasswordPolicies.bind(this), this.onFailureUserNameAndPasswordPolicies.bind(this));
    };
    /**
     * Method will be called as success callback for get user name policies method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccesUserNameAndPasswordPolicies = function(response) {
        var context = {
            "action": "usernamePoliciesRules",
            "data": response
        };
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForUsernameValidation(response.usernamerules);
        validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for get user name policies method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailureUserNameAndPasswordPolicies = function(response) {
        var context = {
            "action": "usernamePoliciesRules",
            "data": response
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * navigateToServerDownScreen :Function to navigate to server down screen
     */
    EnrollPresentationController.prototype.navigateToServerDownScreen = function() {
        // var context = {
        //     "action": "ServerDown"
        // };
        // this.showEnrollPage(context); //issue with enroll ui for server down.
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
        authModule.presentationController.showLoginScreen({
            "hideProgressBar": true,
            "action": "ServerDown"
        });
    };
    /**
     * Entry Method - to navigate to enroll now form and display UI on the basis of context sent
     */
    EnrollPresentationController.prototype.showEnrollPage = function(context) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id !== "frmEnrollNow") {
            navManager.navigateTo({
                "appName": "SelfServiceEnrolmentMA",
                "friendlyName": "EnrollUIModule/frmEnrollNow"
                });
        }
        var configManager = applicationManager.getConfigurationManager();
        if (context && context.identifier) {
            this.showCreatePasswordUsingDeepLinkingPage(context.identifier);
        } else if (configManager.isBusinessBankingEnabled()) {
            navManager.updateForm({
                "enrollTypeSelectionRequired": true
            }, "frmEnrollNow");
        } else {
            navManager.updateForm({
                "enrollTypeSelectionNotRequired": true
            });
        }
    };
    EnrollPresentationController.prototype.checkIfBusinessBankingMemberExists = function(detailsJSON) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getNewUserBusinessManager().setUserDetailsForEnroll(detailsJSON);
        applicationManager.getAuthManager().vefifyUserOrMemberIsAlreadyEnrolled(detailsJSON, this.onSuccesscheckIfBusinessBankingMemberExists.bind(this), this.onFailurecheckIfBusinessBankingMemberExists.bind(this));
    };
    EnrollPresentationController.prototype.onSuccesscheckIfBusinessBankingMemberExists = function(response) {
        var authManager = applicationManager.getAuthManager();
        authManager.setServicekey(response.serviceKey);
        var params = {
            "MFAAttributes": {
                "serviceKey": authManager.getServicekey()
            }
        }
        applicationManager.getNewUserBusinessManager().requestOTPPreLoginMB(params, this.onSuccessrequestOTPPreLoginMB.bind(this), this.onFailurerequestOTPPreLoginMB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessrequestOTPPreLoginMB = function(response) {
        var authManager = applicationManager.getAuthManager();
        if (response && response.MFAAttributes) {
            authManager.setMFAResponse(response);
            authManager.setCommunicationType(response.MFAAttributes.communicationType);
            authManager.setServicekey(response.MFAAttributes.serviceKey);
        }
        var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Enroll_TnC, this.getTnCOnSuccessMBB.bind(this, response), this.getTnCOnFailure.bind(this));
    };
    EnrollPresentationController.prototype.getTnCOnSuccessMBB = function(OTPresponse, TnCresponse) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showScreenToEnterSecureCodeMB": OTPresponse,
            "TnCcontent": TnCresponse
        });
    };
    EnrollPresentationController.prototype.onFailurerequestOTPPreLoginMB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showErrorInUserDetailsPageBB": response.errorMessage
            });
        }
    };
    EnrollPresentationController.prototype.onFailurecheckIfBusinessBankingMemberExists = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showErrorInUserDetailsPageBB": response.errorMessage
            });
        }
    };
    /**
     * Method will be called to fetch otp by calling fetchOTP service of auth manager
     */
    EnrollPresentationController.prototype.requestOTPBB = function() {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getAuthManager().fetchOTP({}, this.onSuccessrequestOTPBB.bind(this), this.onFailurerequestOTPBB.bind(this));
    };
    /**
     * Method will be called as success callback for requestOTP method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onSuccessrequestOTPBB = function() {
        var context = {
            "hideProgressBar": true,
            "showSendOTPScreen2MBB": {}
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    /**
     * Method will be called as failure callback for request otp method
     * @param {Object} response - response object which we receive from service
     */
    EnrollPresentationController.prototype.onFailurerequestOTPBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
        }
        //this.onFailurerequestOTP(response);
    };
    EnrollPresentationController.prototype.validateOTPBB = function(otp) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var param = {
            "Otp": otp
        }
        applicationManager.getAuthManager().verifyOTP(param, this.onSuccessValidateOTPBB.bind(this), this.onFailureValidateOTPBB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessValidateOTPBB = function() {
        var params = {
            "ruleForCustomer": true,
            "policyForCustomer": true
        };
        applicationManager.getAuthManager().getUsernameAndPasswordRulesAndPolicies(params, this.onSuccessGetUsernamePoliciesMBB.bind(this), this.onFailureGetUsernamePoliciesMBB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessGetUsernamePoliciesMBB = function(response) {
        var context = {
            "hideProgressBar": true,
            "showCreateUserAndPasswordScreenMBB": response
        };
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForUsernameValidation(response.usernamerules);
        validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailureGetUsernamePoliciesMBB = function(response) {
        this.onFailureUserNamePolicies(response);
    };
    EnrollPresentationController.prototype.onFailureValidateOTPBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "otpValidationFailureBB": response.errorMessage
            });
        }
    };
    EnrollPresentationController.prototype.resendOTPBB = function() {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getAuthManager().fetchOTP({}, this.onSuccessResendOTPBB.bind(this), this.onFailureResendOTPBB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessResendOTPBB = function() {
        var context = {
            "hideProgressBar": true,
            "resendOtpBB": {}
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailureResendOTPBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
        }
    };
    EnrollPresentationController.prototype.createUserBB = function(uName, password) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var userDetails = {
            "uName": uName,
            "password": password,
            "serviceKey": applicationManager.getAuthManager().getServicekey()
        }
        applicationManager.getNewUserBusinessManager().setUsernameAndPassword(userDetails);
        applicationManager.getNewUserBusinessManager().createBBUserForEnroll(this.onSuccessCreateUserBB.bind(this), this.onFailureCreateUserBB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessCreateUserBB = function(response) {
        var isEsignAgreementRequired = false;
        if (response.isEAgreementRequired === "true" && response.isEagreementSigned === "false") {
            isEsignAgreementRequired = true;
        }
        var context = {
            "hideProgressBar": true,
            "showChooseSecuritySettingsScreenMBB": {
                "isEsignAgreementRequired": isEsignAgreementRequired
            }
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailureCreateUserBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            var context = {
                "hideProgressBar": true,
                "createUserBBFailure": response.errorMessage
            };
            applicationManager.getNavigationManager().updateForm(context);
        }
    };
    EnrollPresentationController.prototype.fetchSecurityQuestionsBB = function() {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getAuthManager().fetchSecurityQuestionsForEnroll(this.onSuccessfetchSecurityQuestionsBB.bind(this), this.onFailurefetchSecurityQuestions.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessfetchSecurityQuestionsBB = function(response) {
        var i = 0;
        var securityQuestions = [];
        var flagToManipulate = [];
        while (i < response.records.length) {
            securityQuestions[i] = response.records[i].SecurityQuestion;
            flagToManipulate[i] = "false";
            i++;
        }
        var context = {
            "hideProgressBar": true,
            "showSecurityQuestionsDetailsScreenMBB": {
                "data": {
                    securityQuestions: securityQuestions,
                    flagToManipulate: flagToManipulate
                },
                "backendResponse": response.records
            }
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailurefetchSecurityQuestionsBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
        }
    };
    EnrollPresentationController.prototype.saveSecurityQuestionsBB = function(data) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        data = JSON.stringify(data);
        data = data.replace(/"/g, "'");
        var securityQuestionsData = {
            userName: this.userName,
            securityQuestions: data
        };
        applicationManager.getAuthManager().saveSecurityQuestionsForEnroll(securityQuestionsData, this.onSuccesSsaveSecurityQuestionsBB.bind(this), this.onFailureSaveSecurityQuestionsBB.bind(this));
    };
    EnrollPresentationController.prototype.onSuccesSsaveSecurityQuestionsBB = function(response) {
        var context = {
            "hideProgressBar": true,
            "showEsignAgreementScreenMBB": {}
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailureSaveSecurityQuestionsBB = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "saveSecurityQuestionsFailureBB": response.errorMessage
            });
        }
        //this.onFailureSaveSecurityQuestions(response);
    };
    EnrollPresentationController.prototype.downloadESignAgreement = function() {
        var mfURL = KNYMobileFabric.mainRef.config.services_meta.RBObjects.url;
        var url = mfURL + "/operations/DbxUser/downloadEAgreementPdf";
        CommonUtilities.downloadFile({
            "url": url,
            "filename": "e-sign Agreement.pdf"
        });
    };
    EnrollPresentationController.prototype.showCreatePasswordUsingDeepLinkingPage = function(identifier) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        var params = {
            "identifier": identifier
        };
        applicationManager.getAuthManager().isResetPasswordLinkActive(params, this.onSuccessIsResetPasswordLinkActive.bind(this, identifier), this.onFailureIsResetPasswordLinkActive.bind(this));
    };
    EnrollPresentationController.prototype.onSuccessIsResetPasswordLinkActive = function(identifier, response) {
        var params = {
            "ruleForCustomer": true,
            "policyForCustomer": true
        };
        applicationManager.getAuthManager().getUsernameAndPasswordRulesAndPolicies(params, this.onSuccesUserNamePoliciesUsingResetLink.bind(this, identifier), this.onFailureUserNamePoliciesUsingResetLink.bind(this));
    };
    EnrollPresentationController.prototype.onFailureIsResetPasswordLinkActive = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "invalidPasswordLink": {
                    "errorMessage": response.errorMessage
                }
            });
        }
    };
    EnrollPresentationController.prototype.onSuccesUserNamePoliciesUsingResetLink = function(identifier, response) {
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForUsernameValidation(response.usernamerules);
        validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "showCreateUserAndPasswordScreenUsingResetLinkMBB": {
                "rules": response,
                "identifier": identifier
            }
        });
    };
    EnrollPresentationController.prototype.onFailureUserNamePoliciesUsingResetLink = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
        }
    };
    EnrollPresentationController.prototype.createPasswordForOrganizationEmployee = function(data) {
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        this.userName = data.UserName;
        var params = {
            "identifier": data.identifier,
            "UserName": data.UserName,
            "Password": data.Password
        };
        applicationManager.getAuthManager().setOrgPasswordForEmployee(params, this.onSuccesCreatePasswordForOrganizationEmployee.bind(this), this.onFailureCreatePasswordForOrganizationEmployee.bind(this));
    };
    EnrollPresentationController.prototype.onSuccesCreatePasswordForOrganizationEmployee = function(response) {
        var isEsignAgreementRequired = false;
        if (response.isEAgreementRequired === "true" && response.isEagreementSigned === "false") {
            isEsignAgreementRequired = true;
        }
        var context = {
            "hideProgressBar": true,
            "showChooseSecuritySettingsScreenMBB": {
                isEsignAgreementRequired: isEsignAgreementRequired
            }
        };
        applicationManager.getNavigationManager().updateForm(context);
    };
    EnrollPresentationController.prototype.onFailureCreatePasswordForOrganizationEmployee = function(response) {
        if (response.isServerUnreachable) {
            this.navigateToServerDownScreen();
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "createPasswordForOrganizationEmployeeFailure": response.errorMessage
            });
        }
    };
    EnrollPresentationController.prototype.verifyOTPPreLogin = function(params) {
        applicationManager.getAuthManager().verifyOTPPreLogin(params, this.verifyOTPPreLoginSuccess.bind(this), this.verifyOTPPreLoginFailure.bind(this));
    };
    EnrollPresentationController.prototype.verifyOTPPreLoginSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        var MFAResponse = authManager.getMFAResponse();
        if (response.MFAAttributes) {
            if (response.MFAAttributes.securityKey) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
                MFAResponse.MFAAttributes.isOTPExpired = false;
            } else if (response.MFAAttributes.isOTPExpired) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
            }
            authManager.setMFAResponse(MFAResponse);
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showSecureAccessCodeScreenAfterResend": authManager.getMFAResponse()
            });
        } else {
            this.onSuccessotpValidate();
        }
    };
    EnrollPresentationController.prototype.verifyOTPPreLoginFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isEnteredOTPIncorrect": response.serverErrorRes
        });
    };
    EnrollPresentationController.prototype.verifyOTPPreLoginMB = function(params) {
        applicationManager.getNewUserBusinessManager().verifyOTPPreLoginMB(params, this.verifyOTPPreLoginMBSuccess.bind(this), this.verifyOTPPreLoginMBFailure.bind(this));
    };
    EnrollPresentationController.prototype.verifyOTPPreLoginMBSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        var MFAResponse = authManager.getMFAResponse();
        if (response.MFAAttributes) {
            if (response.MFAAttributes.securityKey) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
                MFAResponse.MFAAttributes.isOTPExpired = false;
            } else if (response.MFAAttributes.isOTPExpired) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
            }
            authManager.setMFAResponse(MFAResponse);
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true,
                "showSecureAccessCodeScreenAfterResendMB": authManager.getMFAResponse()
            });
        } else {
            this.onSuccessValidateOTPBB();
        }
    };
    EnrollPresentationController.prototype.verifyOTPPreLoginMBFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isEnteredOTPIncorrectMB": response.serverErrorRes
        });
    };
    EnrollPresentationController.prototype.resendOTPMB = function(params) {
        applicationManager.getNewUserBusinessManager().requestOTPPreLoginMB(params, this.verifyOTPPreLoginMBSuccess.bind(this), this.verifyOTPPreLoginMBFailure.bind(this));
    };
    EnrollPresentationController.prototype.resendOTPForResetPassword = function(params) {
        applicationManager.getAuthManager().requestEnrollOTP(params, this.verifyOTPPreLoginSuccess.bind(this), this.verifyOTPPreLoginFailure.bind(this));
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneEmail = function(params) {
        applicationManager.getAuthManager().requestEnrollOTP(params, this.requestOTPUsingPhoneEmailSuccess.bind(this), this.requestOTPUsingPhoneEmailFailure.bind(this));
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneEmailSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        authManager.setMFAResponse(response);
        var MFAResponse = authManager.getMFAResponse();
        MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
        MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPReceived": authManager.getMFAResponse()
        });
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneEmailFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPRequestFailed": response.serverErrorRes
        });
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneAndEmailMB = function(params) {
        applicationManager.getNewUserBusinessManager().requestOTPPreLoginMB(params, this.requestOTPUsingPhoneEmailMBSuccess.bind(this), this.requestOTPUsingPhoneEmailMBFailure.bind(this));
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneEmailMBSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        authManager.setMFAResponse(response);
        var MFAResponse = authManager.getMFAResponse();
        MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
        MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPReceivedMB": authManager.getMFAResponse()
        });
    };
    EnrollPresentationController.prototype.requestOTPUsingPhoneEmailMBFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPRequestFailed": response.serverErrorRes
        });
    };

    /**
     * no service call navigation to frmEnrollBusiness
     */

    EnrollPresentationController.prototype.showBusinessEnrollScreen = function(accountCentric) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id !== "frmEnrollBusiness")
            navManager.navigateTo("frmEnrollBusiness");
        if (accountCentric)
            navManager.updateForm({
                "progressBar": true,
                "accountCentric": true,
            }, "frmEnrollBusiness");
        else
            navManager.updateForm({
                "progressBar": true,
                "nonAccountCentric": true
            }, "frmEnrollBusiness");
    };

    /*
     * Method to fetch all features
     */
    EnrollPresentationController.prototype.fetchAllFeatures = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
       var params = {
         "serviceDefinitionId": response.serviceDefinitionId ,
          "groupId": response.groupId
         };
        applicationManager.getAuthManager().fetchAllFeatures(params, this.fetchAllFeaturesSuccess.bind(this), this.fetchAllFeaturesFailure.bind(this));
    };

  EnrollPresentationController.prototype.fetchAllFeaturesSuccess = function(response) {
        var features = response.features;
        var allFeatures = [];
        var defaultFeatures = [];
        var availableFeatures = [];
        features.forEach(function(feature) {
            if (feature.featureStatus === "SID_FEATURE_ACTIVE") {
				feature.featureId = feature.featureId ;
				feature.featureName = feature.featureName ;
				feature.featureDescription=feature.featureDescription;
                feature.lblCheckFeature = {
                    "skin": "sknBBLblOLBFontsInActiveC0C0C0",
                    "text": "C"
                };
                feature.lblFeatureName = feature.featureName;
                availableFeatures.push(feature);
            }
        });
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "showAllFeatures": availableFeatures,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchAllFeaturesFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchOrganizationTypes = function() {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        var navManager = applicationManager.getNavigationManager();
        var enrollbusines = navManager.getCustomInfo("enrollPersonal");
        applicationManager.getAuthManager().fetchOrganizationTypes({"legalEntityId":enrollbusines}, this.fetchOrganizationTypesSuccess.bind(this), this.fetchOrganizationTypesFailure.bind(this));
    };

    EnrollPresentationController.prototype.fetchOrganizationTypesSuccess = function(response) {
		var data =[];
		response.ServiceDefinitionRecords.forEach(function(responseObj) {
			if(responseObj.serviceType === "TYPE_ID_BUSINESS"){
				
				data.push(responseObj) ;
			}
			
		});
       
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "showOrganizatiionTypes": data,
        }, "frmEnrollBusiness");
      
    };
  	
    EnrollPresentationController.prototype.fetchOrganizationTypesFailure = function(response) {	
        applicationManager.getNavigationManager().updateForm({	
            "showServiceError": response	
        }, "frmEnrollBusiness");	
    };	


    EnrollPresentationController.prototype.fetchRoleinCompany = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        var params = {
            "serviceDefinitionId": response
        }
        applicationManager.getAuthManager().fetchRoleinCompany(params, this.fetchRoleinCompanySuccess.bind(this), this.fetchRoleinCompanyFailure.bind(this));
    };
   EnrollPresentationController.prototype.fetchRoleinCompanySuccess = function(response) {
		var data =[];
		response.roles.forEach(function(responObj){
			if(responObj.status === "SID_ACTIVE"){
				data.push(responObj);
			}
		});
        
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "roleinCompany": data,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchRoleinCompanyFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "noRolesFound": response,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchCountry = function(response) {
        var self = this;
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        applicationManager.getAuthManager().fetchCountry({}, self.fetchCountrySuccess.bind(this), self.fetchCountryFailure.bind(this));
    };

    EnrollPresentationController.prototype.fetchCountrySuccess = function(response) {
        var countryList = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "countryList": countryList,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchCountryFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchState = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        applicationManager.getAuthManager().fetchState({}, this.fetchStateSuccess.bind(this), this.fetchStateFailure.bind(this));
    };

    EnrollPresentationController.prototype.fetchStateSuccess = function(response) {
        var stateList = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "stateList": stateList,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchStateFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchCity = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        applicationManager.getAuthManager().fetchCity({}, this.fetchCitySuccess.bind(this), this.fetchCityFailure.bind(this));
    };

    EnrollPresentationController.prototype.fetchCitySuccess = function(response) {
        var cityList = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "cityList": cityList,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.fetchCityFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.addBusinessAccounts = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        applicationManager.getAuthManager().addBusinessAccounts(params, this.addBusinessAccountsSuccess.bind(this), this.addBusinessAccountsFailure.bind(this));
    };
    EnrollPresentationController.prototype.addBusinessAccountsSuccess = function(response) {

        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "showAddedAccounts": response,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.addBusinessAccountsFailure = function(response) {
        var error = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "showAddedAccounts": error,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.getCompanyTypes = function(params) {
        var scopeObj = this;
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");

        authManager.getCompanyType(
            params,
            scopeObj.onGetCompanyTypeSuccess,
            scopeObj.onGetCompanyTypeFailure
        );
    };

    EnrollPresentationController.prototype.onGetCompanyTypeSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getCompanyTypesSuccess": response
        });
    };

    EnrollPresentationController.prototype.onGetCompanyTypeFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.checkExistingCompany = function(params) {
        var scopeObj = this;
        var authManager = applicationManager.getAuthManager();
        var authParams = {};
        var navManager = applicationManager.getNavigationManager();
        var enrollbusiness = navManager.getCustomInfo("enrollPersonal");
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");
        if (params.method === 1) {
            authParams = {
                "FirstName": params.firstName,
                "LastName": params.lastName,
                "dateOfBirth": params.DOB,
                "Ssn": params.SSN,
                "Cif": params.CIF,
                "legalEntityId": enrollbusiness
            };
        } else if (params.method === 2) {
            authParams = {
                "FirstName": params.firstName,
                "LastName": params.lastName,
                "dateOfBirth": params.DOB,
                "Ssn": params.SSN,
                "companyName": params.companyName,
                "Taxid": params.taxId,
                "legalEntityId": enrollbusiness
            };
        }
        authManager.checkCompanyExists(
            authParams,
            scopeObj.oncheckExistingCompanySuccess,
            scopeObj.oncheckExistingCompanyFailure
        );
    };

    EnrollPresentationController.prototype.oncheckExistingCompanySuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "checkCompanyExistsSuccess": response
        });
    };

    EnrollPresentationController.prototype.oncheckExistingCompanyFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };


    EnrollPresentationController.prototype.requestBusinessEnrollOtp = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        applicationManager.getAuthManager().requestBusinessEnrollOtp(params, this.requestEnrollOtpOnSuccess.bind(this), this.requestEnrollOtpOnFailure.bind(this));
    };

    EnrollPresentationController.prototype.requestEnrollOtpOnSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        if (response && response.MFAAttributes) {
            authManager.setMFAResponse(response);
            authManager.setCommunicationType(response.MFAAttributes.communicationType);
            authManager.setServicekey(response.MFAAttributes.serviceKey);
            applicationManager.getNavigationManager().updateForm({
                "showScreenToEnterSecureCode": response
            }, "frmEnrollBusiness");
        }
    };

    EnrollPresentationController.prototype.requestEnrollOtpOnFailure = function(response) {
        var error = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            "isOTPRequestFailed": response.serverErrorRes //"show_error_msg": error,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.requestEnrollOTPUsingPhoneEmail = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        applicationManager.getAuthManager().requestEnrollOTP(params, this.requestEnrollOTPUsingPhoneEmailSuccess.bind(this), this.requestEnrollOTPUsingPhoneEmailFailure.bind(this));
    };

    EnrollPresentationController.prototype.requestEnrollOTPUsingPhoneEmailSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        authManager.setMFAResponse(response);
        var MFAResponse = authManager.getMFAResponse();
        MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
        MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPReceived": authManager.getMFAResponse()
        });
    };

    EnrollPresentationController.prototype.requestEnrollOTPUsingPhoneEmailFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
            "isOTPRequestFailed": response.serverErrorRes
        });
    };

    EnrollPresentationController.prototype.verifyBusinessEnrollOtp = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        applicationManager.getAuthManager().verifyOTPPreLogin(params, this.verifyBusinessEnrollOtpSuccess.bind(this), this.verifyBusinessEnrollOtpFailure.bind(this));
    };

    EnrollPresentationController.prototype.verifyBusinessEnrollOtpSuccess = function(response) {
        var authManager = applicationManager.getAuthManager();
        var MFAResponse = authManager.getMFAResponse();
        if (response.MFAAttributes) {
            if (response.MFAAttributes.securityKey) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
                MFAResponse.MFAAttributes.isOTPExpired = false;
            } else if (response.MFAAttributes.isOTPExpired) {
                MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                MFAResponse.MFAAttributes.communicationType = authManager.getCommunicationType();
            }
            authManager.setMFAResponse(MFAResponse);
            applicationManager.getNavigationManager().updateForm({
                "showSecureAccessCodeScreenAfterResend": authManager.getMFAResponse()
            }, "frmEnrollBusiness");
        } else {
            if (applicationManager.getConfigurationManager().configurations.getItem("isAccountCentricCore") === "true") {
                applicationManager.getNavigationManager().updateForm({
                    "navToAddedAccts": response
                }, "frmEnrollBusiness");
            } else {
                applicationManager.getNavigationManager().updateForm({
                    "showVerifyCompanyDetails": response
                }, "frmEnrollBusiness");
            }
        }
    };

    EnrollPresentationController.prototype.verifyBusinessEnrollOtpFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "isEnteredOTPIncorrect": response.serverErrorRes
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.resendBusinessEnrollOTP = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        applicationManager.getAuthManager().requestBusinessEnrollOtp(params, this.verifyBusinessEnrollOtpSuccess.bind(this), this.requestEnrollOtpOnFailure.bind(this));
    };

    EnrollPresentationController.prototype.getBusinessAccount = function(params) {
        var scopeObj = this;
        var authManager = applicationManager.getAuthManager();
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmEnrollBusiness");

        authManager.getBusinessAccounts(
            params,
            scopeObj.onGetBusinessAccountSuccess,
            scopeObj.onGetBusinessAccountFailure
        );
    };

    EnrollPresentationController.prototype.onGetBusinessAccountSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBusinessAccountSuccess": response
        });
    };

    EnrollPresentationController.prototype.onGetBusinessAccountFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };

    /*Enroll Organization*/
    EnrollPresentationController.prototype.enrollOrganization = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        applicationManager.getAuthManager().enrollOrganization(params, this.enrollOrganizationSuccess.bind(this), this.enrollOrganizationFailure.bind(this));
    };

    EnrollPresentationController.prototype.enrollOrganizationSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "enrollSuccess": response,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.enrollOrganizationFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmEnrollBusiness");
    };

    /*Terms and Conditions*/
    EnrollPresentationController.prototype.fetchTermsAndConditions = function() {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": "BusinessEnrollment_TnC"
        };
        applicationManager.getAuthManager().fetchTermsAndConditions(params, this.fetchTermsAndConditionsSuccess.bind(this), this.fetchTermsAndConditionsFailure.bind(this));
    };
    EnrollPresentationController.prototype.fetchTermsAndConditionsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "termsAndConditionsSuccess": response,
        }, "frmEnrollBusiness");
    };
    EnrollPresentationController.prototype.fetchTermsAndConditionsFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.checkIfDomainNameExists = function(data, criteria) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true,
        });
        var params = null;
        switch (criteria) {
            case BBConstants.SEARCH_TYPE_ID:
                params = {
                    "id": data
                };
                break;
            case BBConstants.SEARCH_TYPE_NAME:
                params = {
                    "searchType": "Search",
                    "Name": data
                };
                break;
            case BBConstants.SEARCH_TYPE_EMAIL:
                params = {
                    "searchType": "Search",
                    "Email": data
                };
                break;
            default:
                break;
        }

//         var authenticationManager = applicationManager.getAuthManager();
//         authenticationManager.verifyIfCompanyExists(params,
//             this.checkIfDomainNameExistsSuccess.bind(this),
//             this.checkIfDomainNameExistsFailure.bind(this));
      applicationManager.getNavigationManager().updateForm({
            "domainNameDoesNotExist": true
        });
    };

    EnrollPresentationController.prototype.checkIfDomainNameExistsSuccess = function(response) {
        if (response["OrganisationDetails"].length != 0) {
            applicationManager.getNavigationManager().updateForm({
                "domainNameExists": response
            });
        } else {
            applicationManager.getNavigationManager().updateForm({
                "domainNameDoesNotExist": true
            });
        }
    };

    EnrollPresentationController.prototype.checkIfDomainNameExistsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "showServiceError": response
        }, "frmEnrollBusiness");
    };
    
    EnrollPresentationController.prototype.getServiceDefinition = function(response) {
        applicationManager.getNavigationManager().updateForm({"progressBar": true}, "frmEnrollBusiness");
        var params = {"serviceDefinitionId": response.serviceDefinitionId, "groupId": response.groupId};
        applicationManager.getAuthManager().fetchAllFeatures(params, this.getServiceDefinitionSuccess.bind(this), this.getServiceDefinitionFailure.bind(this));
    };

    EnrollPresentationController.prototype.getServiceDefinitionSuccess = function(response) {
        var features = response.features;
        var availableFeatures = [];
        features.forEach(function(feature) {
            if (feature.featureStatus === "SID_FEATURE_ACTIVE") {
				feature.featureId = feature.featureId ;
				feature.featureName = feature.featureName ;
				feature.featureDescription=feature.featureDescription;
                feature.lblCheckFeature = {"skin": "sknBBLblOLBFontsInActiveC0C0C0","text": "C"};
                feature.lblFeatureName = feature.featureName;
                availableFeatures.push(feature);
            }
        });
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({"serviceDefinition": availableFeatures,}, "frmEnrollBusiness");
    };

    EnrollPresentationController.prototype.getServiceDefinitionFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({"showServiceError": response}, "frmEnrollBusiness");
    };

    return EnrollPresentationController;
});