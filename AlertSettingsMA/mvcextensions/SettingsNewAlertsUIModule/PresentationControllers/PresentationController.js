define(['CommonUtilities','OLBConstants'], function(CommonUtilities,OLBConstants) {
this.securityQuestionsPayload  = "";
 this.newUserName = "";
 this.accountPrefObj = "";
 var saveState=false;
 var navigationArray = [];
 this.dataForSegment=[];
  this.accounts =[];
 this.features=[];
    function SettingsNew_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
		this.AlertCategories = "";
    }
    inheritsFrom(SettingsNew_PresentationController, kony.mvc.Presentation.BasePresenter);
    SettingsNew_PresentationController.prototype.initializeUserProfileClass = function() {
        this.PhoneTypes = {
            'Mobile': 'Mobile',
            'Work': 'Work',
            'Home': 'Home',
            'Other': 'Other'
        };
        this.AddressTypes = {
            "ADR_TYPE_WORK": 'Work',
            "ADR_TYPE_HOME": 'Home'
        };
        this.accountTypeConfig = {};
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)]= {
                sideImage: 'accounts_sidebar_turquoise.png',
                skin: 'sknflxhex26d0cecode',
                image: 'account_change_turquoise.png'
        };
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)]= {
            sideImage: 'accounts_sidebar_purple.png',
            skin: 'sknflxhex9060B7code',
            image: 'account_change_purple.png',
        };
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)]= {
            sideImage: 'accounts_sidebar_yellow.png',
            skin: 'sknflxhexf4ba22code',
            image: 'account_change_yellow.png',
        };
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)]= {
            sideImage: 'accounts_sidebar_blue.png',
            skin: 'sknflxhex4a90e2code',
            image: 'account_change_turquoise.png'
        };
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)]= {
            sideImage: 'accounts_sidebar_brown.png',
            skin: 'sknflxhex8D6429code',
            image: 'account_change_yellow.png',
        };
        this.accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)]= {
            sideImage: 'accounts_sidebar_brown.png',
            skin: 'sknflxhex8D6429code',
            image: 'account_change_yellow.png',
        };
        this.accountTypeConfig['Default']= {
            sideImage: 'accounts_sidebar_turquoise.png',
            skin: 'sknflxhex26d0cecode',
            image: 'account_change_turquoise.png'
            };
    };
	
	
     SettingsNew_PresentationController.prototype.setAlertsMenuValues = function (params) {
      this.AlertCategories = params;
    };
      SettingsNew_PresentationController.prototype.getAlertsMenuValues = function () {
        return this.AlertCategories;
      };
	
    /**
     * Method to fetch alerts and mapping to UI
     * @param {Object} addressSelection - contains if he selected country or state.
     */
    SettingsNew_PresentationController.prototype.getSpecifiedCitiesAndStates = function(addressSelection, addressId, states) {
        var self = this;
        var data = [];
        if (addressSelection === "country") {
            var statesList = [];
            statesList.push(["lbl1", "Select a State"]);
            for (var i = 0; i < Object.keys(states).length; ++i) {
                if (states[i][2] === addressId) {
                    statesList.push([states[i][0], states[i][1]]);
                }
            }
            data = {
                "states": statesList
            };
        } else if (addressSelection === "state") {
            var cityList = [];
            cityList.push(["lbl2", "Select a City"]);
            for (var j = 0; j < Object.keys(states).length; ++j) {
                if (states[j][2] === addressId) {
                    cityList.push([states[j][0], states[j][1]]);
                }
            }
            data = {
                "cities": cityList
            };
        }
        return data;
    };
    /**
     * Method to fetch user profile info and mapping to UI
     */
    SettingsNew_PresentationController.prototype.showProfileSettings = function() {
        this.showUserProfile();
        this.initializeUserProfileClass();
        applicationManager.getNavigationManager().updateForm({"isLoading":true});
    };
    /**
     * Method to show secure access code settings
     */
    SettingsNew_PresentationController.prototype.showSecureAccessSettings = function() {
        this.initializeUserProfileClass();
        var viewModel = {};
        viewModel.secureAccessSettings = true;
        applicationManager.getNavigationManager().updateForm(viewModel, 'frmProfileManagement');
    };
    /**
     * Method to show setting screen
     * @param {Object} viewModel - Data to be mapped at setting's screen
     */
    SettingsNew_PresentationController.prototype.showSettingsScreen = function(viewModel) {
        applicationManager.getNavigationManager().updateForm(viewModel, "frmProfileManagement");
        applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
    };
    /**
     * Method to get External Account edit data from the post show of frmProfileSettings
     * @returns {JSON} External Account Edit Object
     */
    SettingsNew_PresentationController.prototype.getEditExternalAccount= function(){
        if (this.editExternalAccountData) {
            var showEditExternalAccount=JSON.parse(JSON.stringify(this.editExternalAccountData));
            this.editExternalAccountData.flow='';
            return showEditExternalAccount;
        }
        return null;
    }
    /**
     * Method to edit external account
     * @param {Object} data - JSON consisting account data
     */
    SettingsNew_PresentationController.prototype.showEditExternalAccount = function(data) {
        this.editExternalAccountData={
            flow: 'editExternalAccounts',
            data:data
        }
        applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
    };
    /**
     * Method used to attach phone numbers to accounts after updation of phone numbers.
     * @param {Object} phoneId - contains the communication id.
     * @param {Object} accountIds - contains the account ids.
     */
    SettingsNew_PresentationController.prototype.attachPhoneNumberToAccounts = function(phoneId, accountIds) {
        var accountsArray = [];
        var i, params;
        if (accountIds.length === 0) {
            this.attachPhoneNumberToAccountsSuccess();
        } else {
            for (i = 0; i < accountIds.length; i++) {
                var accounts = {
                    "accountNumber": accountIds[i],
                    "phone": phoneId
                };
                accountsArray[i] = accounts;
            }
            accountsArray = JSON.stringify(accountsArray);
            accountsArray = accountsArray.replace(/"/g, "'");
            params = {
                "accountli": accountsArray
            };
        }
        applicationManager.getAccountManager().updateAccountPhoneNumber(params, this.attachPhoneNumberToAccountsSuccess.bind(this), this.attachPhoneNumberToAccountsFailure.bind(this));
    };
    /**
     * Method used as success call back for the attach phone numbers to accounts.
     *@param {Object} response - contains the service resonse.
     */
    SettingsNew_PresentationController.prototype.attachPhoneNumberToAccountsSuccess = function(response) {
      //  applicationManager.getAccountManager().fetchInternalAccounts(function(){},function(){});
        this.fetchUser("ContactNumbers");
    };
    /**
     * Method used as failure call back for the attach phone numbers to accounts service.
     *@param {String} errorMessage - contains the error message for the service.
     */
    SettingsNew_PresentationController.prototype.attachPhoneNumberToAccountsFailure = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            addPhoneViewModel: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileManagement");
    };
    /**
     * Method used to delete Phone.
     * @param {Object} phoneObj - contains the phone Obj.
     */
    SettingsNew_PresentationController.prototype.deletePhone = function(phoneObj) {
        this.showProgressBar("frmSettingsPhoneNumbers");
        var params = {
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "deleteCommunicationID": phoneObj.id,
			"communicationType": OLBConstants.DELETE_PHONE
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.deletePhoneSuccess.bind(this), this.deletePhoneFailure.bind(this));
    };
    /**
     *Method used to edit phone number in profile management.
     * @param {Object} id - contains the communication Id.
     * @param {Object} viewmodel - contains the viewModel.
     */
    SettingsNew_PresentationController.prototype.editPhoneNumber = function(id, viewModel) {
        this.showProgressBar("frmSettingsEditPhoneNumber");
        var phoneNumbers = [{
            "id": id,
            "Extension": viewModel.Extension,
            "isPrimary": (viewModel.isPrimary === true) ? "1" : "0",
            "isAlertsRequired": (viewModel.isAlertsRequired === true) ? "1" : "0",
            "phoneNumber": viewModel.phoneNumber,
            "phoneCountryCode":viewModel.phoneCountryCode,
            "phoneExtension":viewModel.phoneExtension,
            "isTypeBusiness":viewModel.isTypeBusiness
        }];
        phoneNumbers = JSON.stringify(phoneNumbers);
        phoneNumbers = phoneNumbers.replace(/"/g, "'");
        var params = {
            "phoneNumbers": phoneNumbers,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.editPhoneNumberSuccess.bind(this), this.editPhoneNumberFailure.bind(this));
    };
  
  	/**
     *Method used as success call back for edit phone Number service.
     * @para {Object} response - contains the service response.
     */
     SettingsNew_PresentationController.prototype.editPhoneNumberSuccess = function(response) {
       if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
         var mfaJSON = {
           "serviceName": applicationManager.getMFAManager().getServiceId(),
           "flowType": "UPDATE_PHONE_NUMBER",
           "response": response,
           "objectServiceDetails": {
             "action": "UPDATE_PHONE_NUMBER",
             "serviceName": "ExternalUserManagement",
             "dataModel": "ExternalUsers",
             "verifyOTPOperationName": "UpdateDetails",
             "requestOTPOperationName": "UpdateDetails",
             "resendOTPOperationName": "UpdateDetails",
           },
         };
         applicationManager.getMFAManager().initMFAFlow(mfaJSON);
       }
       else
         this.fetchUser("ContactNumbers");
     };
  
    /**
     *Method used as failure call back for the edit phone number.
     *@param {String} errorMessage - contains the error message.
     */
    SettingsNew_PresentationController.prototype.editPhoneNumberFailure = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            editPhoneViewModel: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsEditPhoneNumber");
    };
    /**
     * Method used to get the edit phone view.
     * @param {Object} phoneObj - contains the phone Obj.
     */
    SettingsNew_PresentationController.prototype.editPhoneView = function(phoneObj) {
        var accounts = applicationManager.getAccountManager().getInternalAccounts();
       /* var services = accounts.map(function(account) {
            return {
                id: account.accountID,
                name: CommonUtilities.getAccountDisplayName(account),
            };
        });*/
        var newPhoneModel = {
            phoneTypes: this.objectToListBoxArray(this.PhoneTypes),
            phoneTypeSelected: phoneObj.Extension,
            countryType: 'domestic',
            phoneNumber: '',
            phoneCountryCode:"",
            ext: '',
            isPrimary: false,
            isAlertsRequired: false,
        //    services: services,
            recievePromotions: false,
            isTypeBusiness: ''
        };
        newPhoneModel.Extension = phoneObj.Extension;
        newPhoneModel.value = phoneObj.Value;
        newPhoneModel.phoneNumber = phoneObj.phoneNumber;
        newPhoneModel.phoneCountryCode = phoneObj.phoneCountryCode;
        newPhoneModel.recievePromotions = phoneObj.receivePromotions === "1";
        newPhoneModel.isPrimary = phoneObj.isPrimary === "true";
        newPhoneModel.isAlertsRequired = phoneObj.isAlertsRequired === "true";
        newPhoneModel.isTypeBusiness = phoneObj.isTypeBusiness;
      /*  newPhoneModel.services = accounts.map(function(account) {
            return {
                id: account.accountID,
                name: CommonUtilities.getAccountDisplayName(account),
                selected: account.phoneId === phoneObj.phoneNumber
            };
        });*/
        newPhoneModel.id = phoneObj.id;
        newPhoneModel.onBack = this.getPhoneDetails.bind(undefined, phoneObj);
        var viewProperties = {
            editPhoneViewModel: newPhoneModel,
            isLoading: false
        };
        applicationManager.getNavigationManager().navigateTo("frmSettingsEditPhoneNumber");   
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsEditPhoneNumber");
    };
  
    /**
     *Method used as success call back for save phone Number service.
     * @param {Object} viewModel - contains the context to be shown in the profile.
     * @para {Object} response - contains the service response.
     */
    SettingsNew_PresentationController.prototype.savePhoneNumberSuccessCallBack = function(viewModel, response) {
        //this.attachPhoneNumberToAccounts(viewModel.phoneNumber);/*, viewModel.services);
      if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "serviceName": applicationManager.getMFAManager().getServiceId(),
          "flowType": "ADD_PHONE_NUMBER",
          "response": response,
          "objectServiceDetails": {
            "action": "ADD_PHONE_NUMBER",
            "serviceName": "ExternalUserManagement",
            "dataModel": "ExternalUsers",
            "verifyOTPOperationName": "UpdateDetails",
            "requestOTPOperationName": "UpdateDetails",
            "resendOTPOperationName": "UpdateDetails",
          },
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else
        this.fetchUser("ContactNumbers");
    };
  
    /**
     * Method used as failure call back for the save phone number.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.savePhoneNumberFailureCallBack = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            addPhoneViewModel: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsAddPhoneNumber");
    };
    /**
     * Method used to save phone Number in profile.
     *@param {Object} viewModel - contains the context to be shown in profile.
     */
    SettingsNew_PresentationController.prototype.savePhoneNumber = function(viewModel) {
        this.showProgressBar("frmSettingsAddPhoneNumber");
        var phoneNumbers = [{
            "isPrimary": (viewModel.isPrimary === true) ? "1" : "0",
            "isAlertsRequired": (viewModel.isAlertsRequired === true) ? "1" : "0",
            "phoneNumber": viewModel.phoneNumber,
            "phoneCountryCode":viewModel.phoneCountryCode,
            "phoneExtension":viewModel.phoneExtension,
            "Extension": viewModel.type
        }];
        phoneNumbers = JSON.stringify(phoneNumbers);
        phoneNumbers = phoneNumbers.replace(/"/g, "'");
        var params = {
            "phoneNumbers": phoneNumbers,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.savePhoneNumberSuccessCallBack.bind(this, viewModel), this.savePhoneNumberFailureCallBack.bind(this));
    };
    /**
     * Method used to show the user phone numbers in profile manangement.
     */
    SettingsNew_PresentationController.prototype.showUserPhones = function() {
        var viewProperties = {
            phoneList: applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers(),
            isLoading: false
        };
        if (kony.application.getCurrentForm().id !== "frmSettingsPhoneNumbers") {
            applicationManager.getNavigationManager().navigateTo("frmSettingsPhoneNumbers");
        }
       applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsPhoneNumbers");
    };
    /**
     * Method used to show the add user phone number in profile manangement.
     */
     SettingsNew_PresentationController.prototype.getAddPhoneNumberView = function() {
        var accounts = applicationManager.getAccountManager().getInternalAccounts();
        /*var services = accounts.map(function(account) {
            return {
                id: account.accountID,
                name: CommonUtilities.getAccountDisplayName(account),
            };
        });*/
        var phoneList = applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers();
        var isFirstPhoneNumber = phoneList.length > 0 ? false : true;
        var phoneViewModel = {
            phoneTypes: this.objectToListBoxArray(this.PhoneTypes),
            phoneTypeSelected: "Mobile",
            countryType: 'domestic',
            phoneNumber: '',
            phoneCountryCode:'',
            phoneExtension:'',
            ext: '',
            isPrimary: false,
            isAlertsRequired: false,
        //    services: services,
            isFirstPhoneNumber : isFirstPhoneNumber,
            recievePromotions: false
        };
        applicationManager.getNavigationManager().navigateTo("frmSettingsAddPhoneNumber");
        applicationManager.getNavigationManager().updateForm({
            isLoading: false,
            addPhoneViewModel: phoneViewModel
        }, "frmSettingsAddPhoneNumber");
    };
    /**
     * Method used to get phone details.
     * @param {Object} phoneObject - contains the phone object.
     */
    SettingsNew_PresentationController.prototype.getPhoneDetails = function(phoneObject) {
      /*  var accounts = applicationManager.getAccountManager().getInternalAccounts();
        var services = accounts.map(function(account) {
            return {
                id: account.accountID,
                name: CommonUtilities.getAccountDisplayName(account),
                selected: account.phoneId === phoneObject.phoneNumber
            };
        });*/
        applicationManager.getNavigationManager().updateForm({
            phoneDetails: {
                phone: phoneObject//,
             //   services: services
            },
            isLoading: false
        }, "frmProfileManagement");
    };
    /**
     * Method used to get list box array.
     * @param {Object} obj - contains the object containing the data to be used to construct the box array.
     */
    SettingsNew_PresentationController.prototype.objectToListBoxArray = function(obj) {
        var list = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.push([key, obj[key]]);
            }
        }
        return list;
    };
    /**
     * Method used to fetch entitlements.
     */
    SettingsNew_PresentationController.prototype.fetchUser = function(requiredView,alertsError) {
        applicationManager.getUserPreferencesManager().fetchUser(this.fetchUserSuccess.bind(this, requiredView, alertsError), this.fetchUserFailure.bind(this));
    };
    /**
     * Method used as the success call back for fetch entitlements service call.
     */
    SettingsNew_PresentationController.prototype.fetchUserSuccess = function(requiredView, alertsError,response) {
        var viewProperties;
        if (requiredView === "ContactNumbers") {
            viewProperties = {
                isLoading : false,
                phoneList: response[0].ContactNumbers,
            };
          if (kony.application.getCurrentForm().id !== "frmSettingsPhoneNumbers") {
            applicationManager.getNavigationManager().navigateTo("frmSettingsPhoneNumbers");
          }
          applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsPhoneNumbers");
        } else if (requiredView === "EmailIds") {
            viewProperties = {
                emailList: response[0].EmailIds
            };
            if (kony.application.getCurrentForm().id !== "frmProfileEmail") {
                applicationManager.getNavigationManager().navigateTo("frmProfileEmail");
              }
           applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEmail");
        } else if (requiredView === "Addresses") {
            viewProperties = {
                addressList: response[0].Addresses
            };
            if (kony.application.getCurrentForm().id !== "frmAddressSettings") {
                applicationManager.getNavigationManager().navigateTo("frmAddressSettings");
            }
            applicationManager.getNavigationManager().updateForm(viewProperties, "frmAddressSettings");
        }
         else if (requiredView === "AlertCommunication") {
            viewProperties = {
                alertCommunication: response[0]
            };
           applicationManager.getNavigationManager().updateForm(viewProperties, "frmAlertCommunication");
           if(alertsError!==""){
			 this.editAlertsFailure(alertsError);
           }
         }
     };
    /**
     * Method used as failure call back for fetch entitlements service call.
     */
    SettingsNew_PresentationController.prototype.fetchUserFailure = function(errorMessage) {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };
  
  	/**
     *Method used as success call back for save email service.
     * @para {Object} response - contains the service response.
     */
    SettingsNew_PresentationController.prototype.saveEmailSuccessCallBack = function(response) {
      if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "serviceName": applicationManager.getMFAManager().getServiceId(),
          "flowType": "ADD_EMAIL",
          "response": response,
          "objectServiceDetails": {
            "action": "ADD_EMAIL",
            "serviceName": "ExternalUserManagement",
            "dataModel": "ExternalUsers",
            "verifyOTPOperationName": "UpdateDetails",
            "requestOTPOperationName": "UpdateDetails",
            "resendOTPOperationName": "UpdateDetails",
          },
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else
        this.fetchUser("EmailIds");
    };
  
    /**
     * Method used as the failure call back for the save email service.
     * @param {String} errorMessage - contains the error message.
     */
    SettingsNew_PresentationController.prototype.saveEmailFailureCallBack = function(errorMessage) {
        this.hideProgressBar();
        var viewProperties = {
            isLoading: false,
            emailError: errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileAddEmail");
    };
    /**
     * Method used to save email.
     * @param {Object} context - contains the email id, value, description, extension .
     */
    SettingsNew_PresentationController.prototype.saveEmail = function(context) {
        var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
        this.showProgressBar();
        function sameEmail(emailIds, emailAddress) {
            for (var i = 0; i < emailIds.length; i++) {
                var existingEmail = emailIds[i].Value;
                if (existingEmail.toUpperCase() === emailAddress.toUpperCase()) {
                    return true;
                }
            }
            return false;
        }
        var entitlementEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
        var personalEmailIdCount=0;
        var emailIds;
        var params;
        if (sameEmail(entitlementEmailIds, context.value)) {
            this.saveEmailFailureCallBack(kony.i18n.getLocalizedString("i18n.profile.emailAlreadyExists"));
        } else {
          if(isCombinedUser){
            entitlementEmailIds.forEach(function(email){
              if(!email.isTypeBusiness)
                personalEmailIdCount = personalEmailIdCount+1;
            });
            if (personalEmailIdCount < 3) {
                emailIds = [{
                    "isPrimary": (context.isPrimary === true) ? "1" : "0",
                    "isAlertsRequired": (context.isAlertsRequired === true) ? "1" : "0",
                    "value": context.value,
                    "Extension": "Personal",
                  	"isTypeBusiness":context.isTypeBusiness
                }];
                emailIds = JSON.stringify(emailIds);
                emailIds = emailIds.replace(/"/g, "'");
                params = {
                    "EmailIds": emailIds,
                    "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
                    "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
                };
                applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.saveEmailSuccessCallBack.bind(this), this.saveEmailFailureCallBack.bind(this));
            } else {
                this.saveEmailFailureCallBack("We currently do not support adding more than three emails for a user");
            }
          }
          else{
            if (entitlementEmailIds.length < 3) {
                emailIds = [{
                    "isPrimary": (context.isPrimary === true) ? "1" : "0",
                    "isAlertsRequired": (context.isAlertsRequired === true) ? "1" : "0",
                    "value": context.value,
                    "Extension": "Personal"
                }];
                emailIds = JSON.stringify(emailIds);
                emailIds = emailIds.replace(/"/g, "'");
                params = {
                    "EmailIds": emailIds,
                    "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
                    "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
                };
                applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.saveEmailSuccessCallBack.bind(this), this.saveEmailFailureCallBack.bind(this));
            } else {
                this.saveEmailFailureCallBack("We currently do not support adding more than three emails for a user");
            }
          }
            
        }
    };
    /**
     * Method used to show the user email view of profile management.
     */
    SettingsNew_PresentationController.prototype.showUserEmail = function() {
        this.showProgressBar("frmProfileEmail");
        var viewProperties = {
            emailList: applicationManager.getUserPreferencesManager().getEntitlementEmailIds(),
            isLoading: false
        };
        if (kony.application.getCurrentForm().id !== "frmProfileEmail") {
            applicationManager.getNavigationManager().navigateTo("frmProfileEmail");
          }
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEmail");
    };
    /**
     * Method used to delete email.
     * @param {Object} emailObj - contains the email object.
     */
    SettingsNew_PresentationController.prototype.deleteEmail = function(emailObj) {
        this.showProgressBar("frmProfileEmail");
        var params = {
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "deleteCommunicationID": emailObj.id,
			"communicationType": OLBConstants.DELETE_EMAIL
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.deleteEmailSuccess.bind(this), this.deleteEmailFailure.bind(this));
    };
  
  /**
     *Method used as success call back for delete email service.
     * @para {Object} response - contains the service response.
     */
    SettingsNew_PresentationController.prototype.deleteEmailSuccess = function(response) {
      if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "serviceName": applicationManager.getMFAManager().getServiceId(),
          "flowType": "REMOVE_EMAIL",
          "response": response,
          "objectServiceDetails": {
            "action": "REMOVE_EMAIL",
            "serviceName": "ExternalUserManagement",
            "dataModel": "ExternalUsers",
            "verifyOTPOperationName": "UpdateDetails",
            "requestOTPOperationName": "UpdateDetails",
            "resendOTPOperationName": "UpdateDetails",
          },
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else
        this.fetchUser("EmailIds");
    };
  
    /**
     * Method used as the failure call back for delete email.
     * @param {String} errorMessage - contains the error message.
     */
    SettingsNew_PresentationController.prototype.deleteEmailFailure = function(errorMessage) {
        //navigating to serverDown Screen incase of delete email failure.
        //this.fetchUserFailure(errorMessage);
      var viewProperties = {
            isLoading: false,
            deleteEmailError: errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEmail");
    };
  
  	/**
     *Method used as success call back for delete phone Number service.
     * @para {Object} response - contains the service response.
     */
    SettingsNew_PresentationController.prototype.deletePhoneSuccess = function(response) {
      if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "serviceName": applicationManager.getMFAManager().getServiceId(),
          "flowType": "REMOVE_PHONE_NUMBER",
          "response": response,
          "objectServiceDetails": {
            "action": "REMOVE_PHONE_NUMBER",
            "serviceName": "ExternalUserManagement",
            "dataModel": "ExternalUsers",
            "verifyOTPOperationName": "UpdateDetails",
            "requestOTPOperationName": "UpdateDetails",
            "resendOTPOperationName": "UpdateDetails",
          },
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else
        this.fetchUser("ContactNumbers");
    };
  
 	/**
     * Method used as failure call back for the delete phone number.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.deletePhoneFailure = function(errorMessage) {
        //navigating to serverDown Screen incase of delete email failure.
        //this.fetchUserFailure(errorMessage);
      var viewProperties = {
            isLoading: false,
            deletePhoneError: errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmSettingsPhoneNumbers");
    };
    /**
     * Method used to show the progress bar in the profile management.
     */
    SettingsNew_PresentationController.prototype.showProgressBar = function(formName) {
        applicationManager.getNavigationManager().updateForm({
            "isLoading": true
        }, formName);
    };
    /**
     * Method used to hide the progress bar in the profile management.
     */
    SettingsNew_PresentationController.prototype.hideProgressBar = function(formName) {
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false
        }, formName);
    };
    /**
     * Method used to edit email in profile management.
     * @param {Object} context - contains the email value, id, extension, isPrimary, description.
     */
    SettingsNew_PresentationController.prototype.editEmail = function(Context) {
        this.showProgressBar("frmProfileEditEmail");
        var emailIds = [{
            "id": Context.id,
            "Extension": Context.extension,
            "isPrimary": (Context.isPrimary === true) ? "1" : "0",
            "isAlertsRequired": (Context.isAlertsRequired === true) ? "1" : "0",
            "isTypeBusiness":Context.isTypeBusiness,
            "value": Context.email
        }];
        emailIds = JSON.stringify(emailIds);
        emailIds = emailIds.replace(/"/g, "'");
        var params = {
            "EmailIds": emailIds,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.editEmailSuccess.bind(this), this.editEmailFailure.bind(this));
    };
   
  /**
     * Method used to edit alert communications in profile management.
     * @param {Object} context - contains the email value, id, extension, isPrimary, description.
     */
    SettingsNew_PresentationController.prototype.updateAlertCommunication = function(Context) {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var emailIds = Context.emailIds;
        emailIds = JSON.stringify(emailIds);
        emailIds = emailIds.replace(/"/g, "'");
        var phoneNumbers=Context.phoneNumbers;
        phoneNumbers = JSON.stringify(phoneNumbers);
        phoneNumbers = phoneNumbers.replace(/"/g, "'");
        var PhoneParams = {
            "phoneNumbers": phoneNumbers,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        var EmailParams = {
            "EmailIds": emailIds,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
       asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getUserPreferencesManager(), 'updateUserProfileDetails', [PhoneParams]),
                asyncManager.asyncItem(applicationManager.getUserPreferencesManager(), 'updateUserProfileDetails', [EmailParams])
            ], this.updateAlertsCommunicationCompletion.bind(this)
        );
    };
    SettingsNew_PresentationController.prototype.updateAlertsCommunicationCompletion = function(syncResponseObject){
      var self = this;
      if(syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess){
        self.fetchUser("AlertCommunication");
      } else if(syncResponseObject.responses[0].isSuccess){
        self.fetchUser("AlertCommunication",syncResponseObject.responses[1].data);
      } else if(syncResponseObject.responses[1].isSuccess){
        self.fetchUser("AlertCommunication",syncResponseObject.responses[0].data);
      } else{
		self.editAlertsFailure(syncResponseObject.responses[1].data);
      }
    };
    /**
     * Method used as the failure call back for the update alert communications service call.
     * @param {String} errorMessage - contains the error message for edit service.
     */
    SettingsNew_PresentationController.prototype.editAlertsFailure = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            editAlertCommError: errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmAlertCommunication");
    };
  
  /**
     *Method used as success call back for edit email service.
     * @para {Object} response - contains the service response.
     */
    SettingsNew_PresentationController.prototype.editEmailSuccess = function(response) {
      if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "serviceName": applicationManager.getMFAManager().getServiceId(),
          "flowType": "UPDATE_EMAIL",
          "response": response,
          "objectServiceDetails": {
            "action": "UPDATE_EMAIL",
            "serviceName": "ExternalUserManagement",
            "dataModel": "ExternalUsers",
            "verifyOTPOperationName": "UpdateDetails",
            "requestOTPOperationName": "UpdateDetails",
            "resendOTPOperationName": "UpdateDetails",
          },
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else
        this.fetchUser("EmailIds");
    };
  
    SettingsNew_PresentationController.prototype.editEmailFailure = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            editAlertCommError: errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEditEmail");
    };
    /**
     * Method used to show user addresses.
     */
    SettingsNew_PresentationController.prototype.showUserAddresses = function() {
        applicationManager.getNavigationManager().navigateTo("frmAddressSettings");
        applicationManager.getNavigationManager().updateForm({
            "addressList": applicationManager.getUserPreferencesManager().getEntitlementAddresses(),
            "isLoading": false
        }, "frmAddressSettings");
    };
    /**
     * Method used to delete user addresses.
     */
    SettingsNew_PresentationController.prototype.deleteAddress = function(AddressObj) {
        this.showProgressBar();
        var params = {
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "deleteAddressID": AddressObj.Address_id
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.fetchUser.bind(this, "Addresses"), this.deleteAddressFailure.bind(this));
    };
    /**
     * Method used as failure call back for the delete address.
     * @param {String} errorMessage - contains the service error message.
     */
    SettingsNew_PresentationController.prototype.deleteAddressFailure = function(errorMessage) {
         var viewProperties = {
            isLoading: false,
            addressList: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmAddressSettings");
       // CommonUtilities.showServerDownScreen();
    };
    SettingsNew_PresentationController.prototype.getAddNewAddressView = function() {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(userPrefManager, 'getCountryList'),
                asyncManager.asyncItem(userPrefManager, 'getStatesList'),
                //asyncManager.asyncItem(userPrefManager, 'getCityList'),
            ],
            this.getAddNewAddressViewSuccess.bind(this)
        );
    };
    /**
     * Method used to get the add address view model.
     * @param {Object} countries - contains the countries list.
     * @param {Object} states - contains the states list.
     * @param {Object} Cities - contains the cities list.
     */
    SettingsNew_PresentationController.prototype.AddAddressViewModel = function(countries, states, cities) {
        var countryNew = [];
        countryNew.push(["1", "Select a Country"]);
        var stateNew = [];
        stateNew.push(["lbl1", "Select a State"]);
        return {
            serverError: null,
            addressTypes: this.objectToListBoxArray(this.AddressTypes),
            addressTypeSelected: "Work",
            addressLine1: '',
            addressLine2: '',
            countries: countries.map(function(country) {
                return countryNew.push([country.id, country.Name]);
            }),
            countryNew: countryNew,
            states: states.map(function(state) {
                return stateNew.push([state.id, state.Name, state.Country_id]);
            }),
            stateNew: stateNew,
            stateSelected: states[0].id,
            countrySelected: countries[0].id,
            city: '',
            isPreferredAddress: false,
            zipcode: '',
        };
    };
    /**
     * Method used as success call back for the address view model.
     * @param {Object} syncResponseObject - contains the async response object.
     */
    SettingsNew_PresentationController.prototype.getAddNewAddressViewSuccess = function(syncResponseObject) {
        if (syncResponseObject.isAllSuccess()) {
            var viewModel = this.AddAddressViewModel(syncResponseObject.responses[0].data.records, syncResponseObject.responses[1].data.records);
            viewModel.addressTypeSelected = "ADR_TYPE_WORK";
            viewModel.countrySelected = "1";
            viewModel.stateSelected = "lbl1";
            viewModel.citySelected = "lbl2";
            applicationManager.getNavigationManager().navigateTo("frmAddNewAddress");
            applicationManager.getNavigationManager().updateForm({
                isLoading: false,
                addNewAddress: viewModel
            }, "frmAddNewAddress");
        } else {
            CommonUtilities.showServerDownScreen();
        }
        this.hideProgressBar();
    };
    /**
     * Method used to save address.
     * @param {Object} addressObj - contains the address Object.
     */
    SettingsNew_PresentationController.prototype.saveAddress = function(addressObj) {
        this.showProgressBar();
        var addresses = [{
            Addr_type: addressObj.Addr_type,
            addrLine1: addressObj.addrLine1,
            addrLine2: addressObj.addrLine2,
            City_id: addressObj.citySelected,
            countryCode: addressObj.countrySelected,
            ZipCode: addressObj.zipcode,
            isPrimary: (addressObj.isPreferredAddress === true) ? "1" : "0",
            Region_id: addressObj.stateSelected
        }];
        addresses = JSON.stringify(addresses);
        addresses = addresses.replace(/"/g, "'");
        var params = {
            "Addresses": addresses,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.fetchUser.bind(this, "Addresses"), this.saveAddressFailureCallBack.bind(this));
    };
    /**
     * Method used to get edit address view.
     * @param{Object} address - contains the address object.
     */
    SettingsNew_PresentationController.prototype.getEditAddressView = function(address) {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(userPrefManager, 'getCountryList'),
                asyncManager.asyncItem(userPrefManager, 'getStatesList'),
                //asyncManager.asyncItem(userPrefManager, 'getCityList'),
            ],
            this.getEditAddressViewSuccess.bind(this, address)
        );
    };
    /**
     * Method used as sucess call bakc for the get edit address vie.
     * @param {Object} address - contains the address object.
     * @param {Object} syncRespnoseObject - contains the async response object.
     */
    SettingsNew_PresentationController.prototype.getEditAddressViewSuccess = function(address, syncResponseObject) {
        if (syncResponseObject.isAllSuccess()) {
            var viewModel = this.AddAddressViewModel(syncResponseObject.responses[0].data.records, syncResponseObject.responses[1].data.records);
            viewModel.addressId = address.Address_id;
            viewModel.addressLine1 = address.AddressLine1;
            viewModel.addressLine2 = address.AddressLine2;
            viewModel.addressTypeSelected = address.AddressType;
            viewModel.city = address.CityName;
            viewModel.state= address.RegionName;
            viewModel.country= address.CountryName;
            viewModel.isPreferredAddress = address.isPrimary === "true";
            viewModel.zipcode = address.ZipCode;
            viewModel.countrySelected = address.Country_id;
            viewModel.stateSelected = address.Region_id;
            viewModel.citySelected = address.City_id;
            viewModel.hidePrefferedAddress = address.isPrimary === "true";
            applicationManager.getNavigationManager().navigateTo("frmEditAddress");
            applicationManager.getNavigationManager().updateForm({
                isLoading: false,
                editAddress: viewModel
            }, "frmEditAddress");
        } else {
            CommonUtilities.showServerDownScreen();
        }
        this.hideProgressBar();
    };
    /**
     * Method used to get the current user name.
     */
    SettingsNew_PresentationController.prototype.getUserName = function() {
        return applicationManager.getUserPreferencesManager().getCurrentUserName();
    };
    /**
     * Method used to get the password rules.
     */
    SettingsNew_PresentationController.prototype.getPasswordRules = function() {
        applicationManager.getUserPreferencesManager().getPasswordPolicies(this.getPasswordRulesSuccess.bind(this), this.getPasswordRulesFailure.bind(this));
    };
    /**
     * Method used as success call back for the password rules.
     * @param {Object} response - contains the service response for the password rules.
     */
    SettingsNew_PresentationController.prototype.getPasswordRulesSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            usernamepasswordRules: response.records
        }, "frmProfileManagement");
    };
    /**
     * Method used as failure call back for the get password rules.
     */
    SettingsNew_PresentationController.prototype.getPasswordRulesFailure = function() {
        CommonUtilities.showServerDownScreen();
    };
  SettingsNew_PresentationController.prototype.getPasswordRulesAndPolicies = function() {
        applicationManager.getUserPreferencesManager().fetchPasswordRulesAndPolicy(this.getPasswordRulesAndPoliciesSuccess.bind(this), this.getPasswordRulesAndPoliciesFailure.bind(this));
    };
    /**
     * Method used as success call back for the password rules.
     * @param {Object} response - contains the service response for the password rules.
     */
    SettingsNew_PresentationController.prototype.getPasswordRulesAndPoliciesSuccess = function(response) {
       var validationUtility = applicationManager.getValidationUtilManager();
       validationUtility.createRegexForPasswordValidation(response.passwordrules);
        applicationManager.getNavigationManager().navigateTo('frmEditPassword');
        applicationManager.getNavigationManager().updateForm({
            usernamepasswordRules: {"passwordpolicies" : response.passwordpolicy}
        }, "frmEditPassword");
    };
    /**
     * Method used as failure call back for the get password rules.
     */
    SettingsNew_PresentationController.prototype.getPasswordRulesAndPoliciesFailure = function() {
        CommonUtilities.showServerDownScreen();
    };
    /**
     * Method to check exisitng password
     * @param {Object} viewModel - Password entered by user
     */
    SettingsNew_PresentationController.prototype.checkExistingPassword = function(viewModel) {
        var password = viewModel;
        applicationManager.getUserPreferencesManager().checkExistingPassword(password, this.checkExistingPasswordSuccess.bind(this), this.checkExistingPasswordFailure.bind(this));
    };
    /**
     * Method to check exisitng password
     * @param {String} response - contains the existing password response.
     */
    SettingsNew_PresentationController.prototype.checkExistingPasswordSuccess = function(response) {
        if (response.result === "The user is verified") {
            applicationManager.getNavigationManager().updateForm({
                showVerificationByChoice: response
            }, "frmEditPassword");
        } else if(response.result === "Invalid Credentials"){
            applicationManager.getNavigationManager().updateForm({
                wrongPassword: "Wrong Password"
            }, "frmEditPassword");
        } else{
            applicationManager.getNavigationManager().updateForm({
                passwordExists: "password exists"
            }, "frmEditPassword");
        }
    };
    /**
     * Method to check exisitng password
     * @param {String} ErrorMessage - error message
     */
    SettingsNew_PresentationController.prototype.checkExistingPasswordFailure = function(viewModel) {
        applicationManager.getNavigationManager().updateForm({
            passwordExistsServerError: "password exists"
        }, "frmEditPassword");
    };
    /**
     * Method to request OTP
     */
    SettingsNew_PresentationController.prototype.requestOtp = function(securityQuestionsPayload) {
      this.securityQuestionsPayload = securityQuestionsPayload;
      var mfaManager = applicationManager.getMFAManager();
      var params = {
        "MFAAttributes": {
            "serviceKey": mfaManager.getServicekey()
        }
      }
        mfaManager.requestUpdateSecurityQuestionsOTP(params,this.requestOtpSuccess.bind(this),this.requestOtpFailure.bind(this));
    };
    /**
     * Method to check exisitng password
     */
    SettingsNew_PresentationController.prototype.requestOtpSuccess = function(response) {
       var mfaJSON = {
                    "flowType": "SECURITYQUESTION_RESET",
                    "response": response
                };
                applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    };
    /**
     * Method used as failure call back for requestOTP service.
     */
    SettingsNew_PresentationController.prototype.requestOtpFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            requestOtpError: response
        }, "frmSecuritySettings");
    };
    /**
     * Method to verify otp
     * @param {String} viewModel - OTP
     */
    SettingsNew_PresentationController.prototype.verifyOtp = function(viewModel) {
        var otpJSON = {
            "Otp": viewModel
        };
        applicationManager.getUserPreferencesManager().VerifySecureAccessCode(otpJSON, this.verifyOtpSuccess.bind(this), this.verifyOtpFailure.bind(this));
    };
    /**
     * Method used as success call back for verify otp.
     */
    SettingsNew_PresentationController.prototype.verifyOtpSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            verifyOtp: response.isOtpVerified
        }, "frmSecuritySettings");
    };
    /**
     * Method used as failure call back for verify otp.
     */
    SettingsNew_PresentationController.prototype.verifyOtpFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            verifyOtpError: response.errorMessage
        }, "frmSecuritySettings");
    };
    /**
     * Method to check existance of security questions
     */
    SettingsNew_PresentationController.prototype.checkSecurityQuestions = function() {
      applicationManager.getNavigationManager().navigateTo("frmSecuritySettings");
      applicationManager.getNavigationManager().updateForm({
            "isLoading": false
       }, 'frmSecuritySettings');
    };
    /**
     * Method to verify Security Question and answers
     * @param {JSON} data - JSON consisting of question and answers
     */
    SettingsNew_PresentationController.prototype.verifyQuestionsAnswer = function(data) {
        data = JSON.stringify(data);
        data = data.replace(/"/g ,  "'");
        applicationManager.getUserPreferencesManager().verifySecurityQuestions(data, this.verifyQuestionsAnswerSuccess.bind(this), this.verifyQuestionsAnswerFailure.bind(this));
    };
    /**
     * Method used as failure call back for requestOTP service.
     */
    SettingsNew_PresentationController.prototype.verifyQuestionsAnswerSuccess = function(response) {
        if (response.verifyStatus === 'true') {
            applicationManager.getNavigationManager().updateForm({
                verifyQuestion: "security questions"
            }, "frmProfileManagement");
        } else {
            applicationManager.getNavigationManager().updateForm({
                verifyQuestionAnswerError: "security questions"
            }, "frmProfileManagement");
        }
    };
    /**
     * Method used as failure call back for requestOTP service.
     */
    SettingsNew_PresentationController.prototype.verifyQuestionsAnswerFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            verifyQuestionAnswerError: "security questions"
        }, "frmProfileManagement");
    };
    /**
     * Method to get Security questions to be answeres
     */
    SettingsNew_PresentationController.prototype.getAnswerSecurityQuestions = function() {
        var scopeObj = this;
        var param = {
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
        };
        applicationManager.getUserPreferencesManager().fetchSecurityQuestions(param, this.getAnswerSecurityQuestionsSuccess.bind(this), this.getAnswerSecurityQuestionsFailure.bind(this));
    };
    /**
     * Method to get Security questions to be answeres
     */
    SettingsNew_PresentationController.prototype.getAnswerSecurityQuestionsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            answerSecurityQuestion: response.records
        }, "frmProfileManagement");
    };
    /**
     * Method to get Security questions to be answeres
     */
    SettingsNew_PresentationController.prototype.getAnswerSecurityQuestionsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            getAnswerSecurityQuestionError: response
        }, "frmProfileManagement");
    };
    /**
     * Method to change the answers of the security questions
     * @param {Object} data - questions and their answers
     */
    SettingsNew_PresentationController.prototype.updateSecurityQuestions = function() {
      var data = this.securityQuestionsPayload;
        data = JSON.stringify(data);
        data = data.replace(/"/g ,  "'");
        var params = {
              "MFAAttributes": {
        		"serviceKey": applicationManager.getMFAManager().getServicekey()
    	},
          "securityQuestions": data,
          "userName" : applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().resetSecurityQuestions(params, this.updateSecurityQuestionsSuccess.bind(this), this.updateSecurityQuestionsFailure.bind(this));
    };
    /**
     * Method to change the answers of the security questions
     * @param {Object} data - questions and their answers
     */
    SettingsNew_PresentationController.prototype.updateSecurityQuestionsSuccess = function(response) {
         applicationManager.getNavigationManager().navigateTo("frmSecurityAcknowledgement");
    	applicationManager.getNavigationManager().updateForm({
            "isLoading": false
        }, "frmSecurityAcknowledgement");
    };
    /**
     * Method to change the answers of the security questions
     * @param {Object} data - questions and their answers
     */
    SettingsNew_PresentationController.prototype.updateSecurityQuestionsFailure = function(data) {
         applicationManager.getNavigationManager().navigateTo("frmEditSecuritySettings");
        applicationManager.getNavigationManager().updateForm({
            updateSecurityQuestionError: "security questions"
        }, "frmEditSecuritySettings");
    };
    /**
     * Method to fetch all the security questions
     * @param {Object} context - JSON to handle the security questions
     * @param {function} staticSetQuestions - function binded to handle the response
     */
    SettingsNew_PresentationController.prototype.fetchSecurityQuestions = function(context) {
        applicationManager.getUserPreferencesManager().fetchAllSecurityQuestions(this.fetchSecurityQuestionsSuccess.bind(this, context), this.fetchSecurityQuestionsFailure.bind(this, context));
    };
    /**
     * Method to fetch all the security questions
     * @param {Object} context - JSON to handle the security questions
     * @param {function} staticSetQuestions - function binded to handle the response
     */
    SettingsNew_PresentationController.prototype.fetchSecurityQuestionsSuccess = function(context, response) {
      var mfaManager  = applicationManager.getMFAManager();
       mfaManager.setMFAFlowType("SECURITYQUESTION_RESET");
      mfaManager.setServicekey(response.serviceKey);
        var i = 0;
        while (i < response.records.length) {
            context.securityQuestions[i] = response.records[i].SecurityQuestion;
            context.flagToManipulate[i] = "false";
            i++;
        }
      applicationManager.getNavigationManager().navigateTo("frmEditSecuritySettings");
      applicationManager.getNavigationManager().updateForm({
        securityQuestion:{
          response: context,
          data : response.records
        }}, "frmEditSecuritySettings");
        
    };
    /**
     * Method to fetch all the security questions
     * @param {Object} context - JSON to handle the security questions
     * @param {function} staticSetQuestions - function binded to handle the response
     */
    SettingsNew_PresentationController.prototype.fetchSecurityQuestionsFailure = function(context, staticSetQuestions, response) {
        staticSetQuestions(context, response.records);
    };
    /**
     * Method to update secure access option
     * @param {Object} viewModel - Secure access data which needs to be updated
     */
    SettingsNew_PresentationController.prototype.updateSecureAccessOptions = function(context) {
        applicationManager.getUserPreferencesManager().updateSecureAccessSettings(context, this.updateSecureAccessOptionsSuccess.bind(this), this.updateSecureAccessOptionsFailure.bind(this));
    };
    /**
     * Method used as success call back for updateSecureAccessOptions
     * @param {Object} resonse - service response for updateSecureAccessOptions.
     */
    SettingsNew_PresentationController.prototype.updateSecureAccessOptionsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            secureAccessOption: response
        }, "frmProfileManagement");
    };
    /**
     * Method method used as failure call back for updateSecureAccessOptions.
     * @param {Object} resonse - service response for updateSecureAccessOptions.
     */
    SettingsNew_PresentationController.prototype.updateSecureAccessOptionsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            secureAccessOptionError: response
        }, "frmProfileManagement");
    };
    /**
     * Method used to fetch alerts.
     * @param {Object} alertType - contains the type of alert to fetch.
     */
    SettingsNew_PresentationController.prototype.fetchAlerts = function(alertType) {
        applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
        this.showProgressBar();
        var self = this;
        var params = {
            userName: applicationManager.getUserPreferencesManager().getCurrentUserName(),
            alertTypeName: alertType
        };
        applicationManager.getAlertsManager().fetchProfileAlerts(params, this.fetchAlertsSuccess.bind(this), this.fetchAlertsFailure.bind(this));
    };
    /**
     * Method method used as failure call back for updateSecureAccessOptions.
     * @param {Object} resonse - service response for updateSecureAccessOptions.
     */
    SettingsNew_PresentationController.prototype.fetchAlertsFailure = function(response) {
        applicationManager.getNavigationManager().navigateTo('frmProfileManagement');
        applicationManager.getNavigationManager().updateForm({
            "AlertsError": response
        }, 'frmProfileManagement');
    };
    /**
     * updateAlerts- Method to update alerts and mapping to UI
     * @param {Object} response -  alerts list and alert type
     */
    SettingsNew_PresentationController.prototype.updateAlerts = function(alertsData, responseData) {
        var self = this;
        this.showProgressBar();
//         var params = {
//             AlertCategoryId: alertsData.AlertCategoryId,
//             isSubscribed: alertsData.isSubscribed,
//             channelPreference: alertsData.channelPreference,
//             typePreference: alertsData.typePreference
//         };
//         if(alertsData.AccountId) {
//             params.AccountId = alertsData.AccountId;
//         } else if(alertsData.AccountTypeId) {
//             params.AccountTypeId = alertsData.AccountTypeId;
//         }
        applicationManager.getAlertsManager().setAlertPreferences(alertsData, this.updateAlertsSuccess.bind(this,responseData), this.updateAlertsFailure.bind(this));
    };
    /**
     * updateAlertsSuccess- Method to update alerts and mapping to UI
     * @param {Object} response -  alerts list and alert type
     */
    SettingsNew_PresentationController.prototype.updateAlertsSuccess = function(responseData) {
              this.fetchAccounts(applicationManager.getUserPreferencesManager().getCurrentUserName());
      if(responseData.AlertCategoryId === "ALERT_CAT_ACCOUNTS"){
         applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsNewAlertsUIModule/frmAccountAlertsList"});
          applicationManager.getNavigationManager().navigateTo("frmAccountAlertsList");
              this.fetchAccountAlerts(responseData.AlertCategoryId);
           } else {
               var params = {
                                "AlertCategoryId": responseData.AlertCategoryId
                            };
              this.fetchAlertsDataById(params);
          }
            this.hideProgressBar();
    };
    /**
     * updateAlerts- Method to update alerts and mapping to UI
     * @param {Object} response -  contains the error response.
     */
    SettingsNew_PresentationController.prototype.updateAlertsFailure = function(response) {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };
    /**
     * Method to get user emails.
     */
    SettingsNew_PresentationController.prototype.getUserEmail = function() {
        applicationManager.getNavigationManager().updateForm({
            "emails": userObjectToEmailList(applicationManager.getUserPreferencesManager().getEntitlementEmailIds())
        }, 'frmProfileManagement');
    };
    /**
     * Method used to fetch the profile
     */
    SettingsNew_PresentationController.prototype.showUserProfile = function() {
        applicationManager.getUserPreferencesManager().fetchUserProfile(this.showUserProfileSuccess.bind(this), this.showUserProfileFailure.bind(this));
    };
    /**
     * Method used to fetch the profile
     */
    SettingsNew_PresentationController.prototype.showUserProfileSuccess = function(response) {
        response[0].userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
        applicationManager.getNavigationManager().navigateTo('frmProfile');
        applicationManager.getNavigationManager().updateForm({
            "userProfile": response[0],
            "isLoading": false
        }, 'frmProfile');
    };
    /**
     * Method used to fetch the profile
     */
    SettingsNew_PresentationController.prototype.showUserProfileFailure = function(response) {
        CommonUtilities.showServerDownScreen();
    };
	
    /**
     * Method used to fetch the profile Image
     */
    SettingsNew_PresentationController.prototype.showUserProfileImage = function() {
        applicationManager.getUserPreferencesManager().fetchUserImage(this.showUserProfileImageSuccess.bind(this), this.showUserProfileImageFailure.bind(this));
    };
    /**
     * Method used to fetch the profile Image
     */
    SettingsNew_PresentationController.prototype.showUserProfileImageSuccess = function(response) {
        applicationManager.getNavigationManager().navigateTo('frmProfile');
        var formController = applicationManager.getPresentationUtility().getController('frmProfile',true);
        formController.bindUploadedImage(response.UserImage);
        this.hideProgressBar("frmProfile");
    };
    /**
     * Method used to fetch the profile Image
     */
    SettingsNew_PresentationController.prototype.showUserProfileImageFailure = function(response) {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };

    /**
     * Method to update the password
     * @param {Object} password - contains the password.
     */
    SettingsNew_PresentationController.prototype.updatePassword = function(oldPassword,newPassword) {
  var userPreferencesManager = applicationManager.getUserPreferencesManager();
        var params = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        };
        applicationManager.getUserPreferencesManager().updateUserPassword(params, this.updatePasswordSuccess.bind(this), this.updatePasswordFailure.bind(this));
    };
    /**
     * Method to update the password
     * @param {Object} response - contains the response from the service.
     */
    SettingsNew_PresentationController.prototype.updatePasswordSuccess = function(response) {
            var mfaManager = applicationManager.getMFAManager();
        if(response && response.MFAAttributes){
          if(response.MFAAttributes.isMFARequired == "true"){
            var mfaJSON = {
                "flowType": "UPDATE_PASSWORD",
                "response": response
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          }
       }else{
         var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
           authModule.presentationController.onPasswordChange();
       }
    };
    /**
     * Method used as the failure call back for update password.
     * @param {String} viewModel - Data required to update password
     */
    SettingsNew_PresentationController.prototype.updatePasswordFailure = function(response) {
      applicationManager.getNavigationManager().navigateTo('frmEditPassword');
      applicationManager.getNavigationManager().updateForm({
            passwordServerError: response.serverErrorRes
        }, "frmEditPassword");
    };
    /**
     * Method to Check existing secure access option
     */
    SettingsNew_PresentationController.prototype.checkSecureAccess = function() {
        applicationManager.getUserPreferencesManager().getSecureAccessCodeOptions(this.checkSecureAccessSuccess.bind(this), this.checkSecureAccessFailure.bind(this));
    };
    /**
     * Method to Check existing secure access option
     */
    SettingsNew_PresentationController.prototype.checkSecureAccessSuccess = function(response) {
        applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
        applicationManager.getNavigationManager().updateForm({
            securityAccess: response[0]
        }, "frmProfileManagement");
    };
    /**
     * Method to Check existing secure access option
     */
    SettingsNew_PresentationController.prototype.checkSecureAccessFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            checkSecurityAccessError: response
        }, "frmProfileManagement");
    };
    /**
     * Method to show setting screen
     * @param {String} userName - Contains the userName.
     */
  SettingsNew_PresentationController.prototype.updateUsername = function(userName) {
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
        var params =  {
            "newUserName":userName,
            "oldUserName" : userPreferencesManager.getCurrentUserName()
        };
     this.newUserName = userName;
        applicationManager.getUserPreferencesManager().updateUserName(params, this.updateUsernameSuccess.bind(this), this.updateUsernameFailure.bind(this));
    };
    /**
     * Method used as success call back for update username
     * @param {Object} response - contains the response .
     */
   SettingsNew_PresentationController.prototype.updateUsernameSuccess = function(response) {
     var mfaManager = applicationManager.getMFAManager();
     var userpreferencesManager =  applicationManager.getUserPreferencesManager();
        if(response && response.MFAAttributes){
          if(response.MFAAttributes.isMFARequired == "true"){
            var mfaJSON = {
                "flowType": "UPDATE_USERNAME",
                "response": response,
              	"userName":this.newUserName
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          }
       }  else{
           userpreferencesManager.setCurrentUserName(this.newUserName);
           userpreferencesManager.saveUserName(this.newUserName);
           var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
           authModule.presentationController.onUsernameChange();
       }
    };
    /**
     * Method used as failure call back for update user name
     * @param {Object} response - contains the response for update user name.
     */
    SettingsNew_PresentationController.prototype.updateUsernameFailure = function(response) {
      applicationManager.getNavigationManager().navigateTo('frmProfileManagement');
      applicationManager.getNavigationManager().updateForm({
            updateUsernameError: response
        }, "frmProfileManagement");
    };
    /**
     * Method used to update address.
     *@param {Object} context - contains the user address Object.
     */
    SettingsNew_PresentationController.prototype.updateAddress = function(context) {
        var addresses = [{
                "Addr_type": context.Addr_type,
                "isPrimary": (context.isPrimary === true) ? "1" : "0",
                "addrLine1": context.addrLine1,
                "addrLine2": context.addrLine2,
                "ZipCode": context.ZipCode,
                "City_id": context.City_id,
                "Addr_id": context.addressId,
                "Region_id": context.Region_id,
                "countryCode": context.countrySelected 
            }],
            addresses = JSON.stringify(addresses);
        addresses = addresses.replace(/"/g, "'");
        var params = {
            "Addresses": addresses,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, this.fetchUser.bind(this, "Addresses"), this.updateAddressFailureCallBack.bind(this));
    };
  
     /**
     * Method used to save the user profile pic.
     *@ param {String} base64String - contains the base 64 string.
     */
    SettingsNew_PresentationController.prototype.userImageUpdate = function(base64String) {
        var params = {
          "UserImage": base64String
        };
        applicationManager.getUserPreferencesManager().updateUserProfileImage(params, this.showUserProfileImage.bind(this), this.fetchUserFailure.bind(this));
    };
	  /**
     * Method used to Delete the user profile pic.
     *@ param {String} base64String - contains the base 64 string.
     */
     SettingsNew_PresentationController.prototype.userImageDelete = function() {
        var params = {}
        applicationManager.getUserPreferencesManager().deleteUserProfileImage(params, this.showUserProfileImage.bind(this), this.fetchUserFailure.bind(this));
    };
    /******************************************Ankit Refactored******************************************
     * ***************************************************************************************************
     * ***************************************************************************************************
     */
    /**
     * Method used to show the user email view of profile management.
     */
    SettingsNew_PresentationController.prototype.getUserEmail = function() {
        this.showProgressBar();
        var viewProperties = {
            emails: applicationManager.getUserPreferencesManager().getEntitlementEmailIds(),
            isLoading: false
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileManagement");
    };
    /**
     *Method to navigate frmProfileManagement and show account preference page where accounts are sorted as per their preference order
     */
    SettingsNew_PresentationController.prototype.showPreferredAccounts = function() {
        this.getPreferredAccounts();
    }
    /**
     * Method to show account preference page where accounts are sorted as per their preference order
     *
     */
    SettingsNew_PresentationController.prototype.getPreferredAccounts = function(){
        applicationManager.getNavigationManager().navigateTo('frmAccountPreferences');
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        }, 'frmAccountPreferences');
        var self = this;
        /* Commented this line as per the bug number ARB-11106. Removed the aggregate accounts call temperorily
        if (applicationManager.getConfigurationManager().getConfigurationValue("isAggregatedAccountsEnabled") === "true") {
            function completionCallback(asyncResponse) {
                if (asyncResponse.isAllSuccess()) {
                    self.fetchAccountsSuccess(asyncResponse.responses);
                } else {
                    self.fetchAccountsFailure();
                }
            }
            var username = applicationManager.getUserPreferencesManager().getUserObj().userName;
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync([
                asyncManager.asyncItem(
                    applicationManager.getAccountManager(),
                    "fetchInternalAccounts"
                ),
                asyncManager.asyncItem(
                    applicationManager.getAccountManager(),
                    "fetchExternalAccountsData", [username]
                )
            ], completionCallback);
        } else {
            applicationManager.getAccountManager().fetchInternalAccounts(this.fetchAccountsSuccess.bind(this), this.fetchAccountsFailure.bind(this));
        }
        */
        applicationManager.getAccountManager().fetchInternalAccounts(this.fetchAccountsSuccess.bind(this), this.fetchAccountsFailure.bind(this));
    }
    /**
     *Method is invoked when fetching of accounts is successful. It covers both scenarios of internal and external accounts
     * @param {Collection} accounts list of all the accounts i.e internal account and external accounts based on aggregatedAccount flag of configurations
     */
    SettingsNew_PresentationController.prototype.fetchAccountsSuccess = function(accounts) {
        var finalAccounts = [],
            self = this;
        /* Commented this line as per the bug number ARB-11106. Removed the aggregate accounts call temperorily
        if (applicationManager.getConfigurationManager().getConfigurationValue("isAggregatedAccountsEnabled") === "true") {
            accounts[0].data.forEach(function(internalAccount) {
                finalAccounts.push(internalAccount);
            });
            accounts[1].data.forEach(function(externalAccount) {
                finalAccounts.push(self.processExternalAccountsData(externalAccount));
            });
        } else {
            finalAccounts = accounts;
        }*/
        finalAccounts = accounts;
        if (kony.application.getCurrentForm().id !== "frmAccountPreferences") {
            applicationManager.getNavigationManager().navigateTo("frmAccountPreferences");
        }
        applicationManager.getNavigationManager().updateForm({
            isLoading:false,
            getPreferredAccountsList: finalAccounts
        }, 'frmAccountPreferences');
    };
    /**
     *  Process external Account Data
     * @param {Collection} rawData External accounts JSON
     * @returns Collection of altered data
     */
    SettingsNew_PresentationController.prototype.processExternalAccountsData = function(rawData) {
        var isError = function(error) {
            try {
                if (error && error.trim() !== "") {
                    return true;
                }
                return false;
            } catch (error) {
            }
        }
        var account = {};
        account.accountName = rawData.AccountName;
        account.nickName = rawData.NickName;
        account.accountID = rawData.Number;
        account.accountType = rawData.TypeDescription;
        account.availableBalance = rawData.AvailableBalance;
        account.currentBalance = rawData.AvailableBalance;
        account.outstandingBalance = rawData.AvailableBalance;
        account.availableBalanceUpdatedAt = (rawData.LastUpdated) ? (CommonUtilities.getTimeDiferenceOfDate(rawData.LastUpdated)) : kony.i18n.getLocalizedString('i18n.AcountsAggregation.timeDifference.justNow');
        if (String(rawData.FavouriteStatus).trim().toLowerCase() === "true") {
            account.favouriteStatus = "1";
        } else {
            account.favouriteStatus = "0";
        }
        account.bankLogo = rawData.BankLogo;
        account.isError = isError(rawData.error);
        account.israwData = true;
        account.bankName = rawData.BankName;
        account.userName = (rawData.Username) ? rawData.Username : rawData.username;
        account.bankId = rawData.Bank_id;
        account.externalAccountId = rawData.Account_id;
        account.accountHolder = rawData.AccountHolder;
        account.isExternalAccount= true;
        return account;
    };
    /**
     *Method that gets called in case fetching of accounts fails
     */
    SettingsNew_PresentationController.prototype.fetchAccountsFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            "getPreferredAccountsList": {
                "errorCase": true
            }
        }, 'frmAccountPreferences');
    };
    /**
     * Method to save preferred account data
     * @param {JSON} data -Json containing account info like favouriteStatus, NickName, E-statements etc
     */
    SettingsNew_PresentationController.prototype.savePreferredAccountsData = function(data) {
        if (data.external) {
            var newdata = {
                "NickName": data.NickName,
                "FavouriteStatus": data.FavouriteStatus,
                "Account_id": data.Account_id,
            }
            applicationManager.getAccountManager().updateExternalAccountFavouriteStatus(newdata,this.updateAccountPreferenceSuccess.bind(this), this.updateAccountPreferenceFailure.bind(this));
        } else {
            applicationManager.getAccountManager().updateUserAccountSettingsForEstatements(data, this.updateAccountPreferenceSuccess.bind(this), this.updateAccountPreferenceFailure.bind(this));
        }
    };
    /**
     * Method that gets called on success of saving account preferences
     */
    SettingsNew_PresentationController.prototype.updateAccountPreferenceSuccess = function() {
        this.getPreferredAccounts();
    }
    /**
     * Method that gets called in case of saving account preferences failure
     */
    SettingsNew_PresentationController.prototype.updateAccountPreferenceFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading:false,
            errorEditPrefferedAccounts: true
        }, 'frmEditAccountPreferences');
    }
    /**
     * * Method to change the preference Number of the accounts
     * @param {JSON} updatedAccounts Accounts with account number and their preference number
     */
    SettingsNew_PresentationController.prototype.setAccountsPreference = function(updatedAccounts) {
        var data = JSON.stringify(updatedAccounts);
        data = data.replace(/"/g ,  "'");
        var final = {};
        final['accountli'] = data;
        applicationManager.getAccountManager().setAccountsPreference(final, this.getPreferredAccounts.bind(this), this.getPreferredAccounts.bind(this));
    };
    /**
     * Method to get default user accounts from user object
     */
    SettingsNew_PresentationController.prototype.getDefaultUserProfile = function() {
        var userObj = applicationManager.getUserPreferencesManager().getUserObj();
        var data = {
            defaultTransferAccount: userObj['default_account_transfers'],
            defaultBillPayAccount: userObj['default_account_billPay'],
            defaultP2PAccount: userObj['default_from_account_p2p'],
            defaultCheckDepositAccount: userObj['default_account_deposit']
        };
        var getDefaultSelectedKey = function(data) {
            if (data && data !== "-1") {
                return data;
            } else {
                return 'undefined';
            }
        };
     
        var defaultNames = this.getDefaultAccountNames(data);
        var defaultAccountNum = {};
        var defaultAccounts = this.defaultAccounts;
        defaultAccountNum['defaultTransfersAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultTransferAccount);
        defaultAccountNum['defaultBillPayAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultBillPayAccount);
        defaultAccountNum['defaultP2PAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultP2PAccount);
        defaultAccountNum['defaultCheckDepositAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCheckDepositAccount);
        defaultNames.defaultAccountNum = defaultAccountNum;
        applicationManager.getNavigationManager().navigateTo("frmAccountSettingsDefaultAccount");
         applicationManager.getNavigationManager().updateForm({
            "showDefaultUserAccounts": defaultNames
        }, 'frmAccountSettingsDefaultAccount');
    };
    /**
     * Method to get Default account name for the default user accounts
     * @param {JSON} accountNumbers Default account numbers of logged in user
     */
    SettingsNew_PresentationController.prototype.getDefaultAccountNames = function(accountNumbers) {
        var defaultNames = [];
        this.defaultAccounts = accountNumbers;
        var accounts = applicationManager.getAccountManager().getInternalAccounts()
        for (var keys in accountNumbers) {
            if (accountNumbers[keys] && accountNumbers[keys] !== "-1") {
                for (var i in accounts) {
                    if (accountNumbers[keys] === accounts[i].accountID) {
                        defaultNames[keys] = accounts[i].accountName;
                        break;
                    }
                }
            } else {
                defaultNames[keys] = "None";
            }
        }
        return defaultNames;
    };
    /**
     * Method to get List of accounts for selecting default accounts for different transaction types
     */
     SettingsNew_PresentationController.prototype.getAccountsList = function() {
        var defaultAccounts = this.defaultAccounts;
        var getDefaultSelectedKey = function(data) {
            if (data && data !== "-1") {
                return data;
            } else {
                return 'undefined';
            }
        };
        var getAccountsListViewModel = {};
        getAccountsListViewModel['TransfersAccounts'] = applicationManager.getAccountManager().getFromTransferSupportedAccounts();
        getAccountsListViewModel['defaultTransfersAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultTransferAccount);
        getAccountsListViewModel['BillPayAccounts'] = applicationManager.getAccountManager().getBillPaySupportedAccounts();
        getAccountsListViewModel['defaultBillPayAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultBillPayAccount);
        getAccountsListViewModel['P2PAccounts'] = applicationManager.getAccountManager().getFromTransferSupportedAccounts();
        getAccountsListViewModel['defaultP2PAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultP2PAccount);
        getAccountsListViewModel['CheckDepositAccounts'] = applicationManager.getAccountManager().getDepositSupportedAccounts();
        getAccountsListViewModel['defaultCheckDepositAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCheckDepositAccount);
        var userObj = applicationManager.getUserPreferencesManager().getUserObj();
        var data = {
            defaultTransferAccount: userObj['default_account_transfers'],
            defaultBillPayAccount: userObj['default_account_billPay'],
            defaultP2PAccount: userObj['default_from_account_p2p'],
            defaultCheckDepositAccount: userObj['default_account_deposit']
        };
        var defaultNames = this.getDefaultAccountNames(data);
        getAccountsListViewModel.defaultNames = defaultNames;
      applicationManager.getNavigationManager().navigateTo("frmAccountSettingsSetDefaultAccount");
         applicationManager.getNavigationManager().updateForm({
            "getAccountsList": getAccountsListViewModel
        }, 'frmAccountSettingsSetDefaultAccount');
    };
    /**
     * Method to save default accounts for different type of transactions
     * @param {JSON} defaultAccounts Accounts with default account numbers
     */
    SettingsNew_PresentationController.prototype.saveDefaultAccounts = function(defaultAccounts) {
        applicationManager.getUserPreferencesManager().updateUserDetails(defaultAccounts, this.saveDefaultAccountsSuccess.bind(this), this.saveDefaultAccountsFailure.bind(this));
    };
    /**
     * Method that gets called when saving default accounts is successful
     */
    SettingsNew_PresentationController.prototype.saveDefaultAccountsSuccess = function() {
        applicationManager.getUserPreferencesManager().fetchUser(this.getDefaultUserProfile.bind(this), this.saveDefaultAccountsFailure.bind(this))
    };
    /**
     * Method that gets called when saving default accounts is failed
     */
    SettingsNew_PresentationController.prototype.saveDefaultAccountsFailure = function() {
        applicationManager.getNavigationManager().updateForm({
                showServerError: true
        }, 'frmAccountSettingsSetDefaultAccount');
    };
     /**
  * Method to save external account data
  * @member of SettingsNew_PresentationController
  * @param {JSON} data - accounts data
  * @returns {void} - None
  * @throws {void} -None
  */
  SettingsNew_PresentationController.prototype.saveExternalAccountsData=function(data){
    var newdata = {
      "NickName": data.NickName,
      "FavouriteStatus": data.FavouriteStatus,
      "Account_id": data.Account_id,
    }
    applicationManager.getAccountManager().updateExternalAccountFavouriteStatus(newdata, this.saveExternalAccountsDataSuccess.bind(this), this.saveExternalAccountsDataFailure.bind(this));
  };
  SettingsNew_PresentationController.prototype.saveExternalAccountsDataSuccess=function(){
    applicationManager.getNavigationManager().updateForm({errorSaveExternalAccounts:{error:false}});
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
    accountsModule.presentationController.showAccountsDashboard();
  }
  SettingsNew_PresentationController.prototype.saveExternalAccountsDataFailure=function(){
    applicationManager.getNavigationManager().updateForm({errorSaveExternalAccounts:true});
  }
    /**
     * Method to to fetch acoount alerts data.
     */
  SettingsNew_PresentationController.prototype.fetchAccountAlerts = function(alertID) {
    var scopeObj = this;
                  this.fetchAccounts(applicationManager.getUserPreferencesManager().getCurrentUserName());
    applicationManager.getNavigationManager().updateForm({
        isLoading: true
    }, 'frmAccountAlertsList');
    applicationManager.getAlertsManager().getCustomerAccountAlertPreference(this.fetchAccountAlertsSuccess.bind(this,alertID), this.fetchAccountAlertsFailure.bind(this));
  }
  /**Success callback for fetch account alerts
  * @param {Object} response - contains the service response for account type Alerts.
  */
  SettingsNew_PresentationController.prototype.fetchAccountAlertsSuccess = function(alertID, response) {
                  this.fetchAccounts(applicationManager.getUserPreferencesManager().getCurrentUserName());

    applicationManager.getNavigationManager().updateForm({
        isLoading: false,
        accountAlertsData:{
        "accountAlerts": response.accountInfo,
        "alertID": alertID
        }
    }, 'frmAccountAlertsList');
  }
  /**failure callback for fetch account alerts
 */
  SettingsNew_PresentationController.prototype.fetchAccountAlertsFailure = function() {
    this.fetchUserFailure(); // basically, sever down screen function
  }
  /**
     * Method to to fetch alerts data and channels basing on category to be shown.
     * @param {String} alertID - ID of the Alert Type
     * @param {Object}(optional) accountDetails - selected account details
     */
  SettingsNew_PresentationController.prototype.fetchAlertsDataById = function(params,accountDetails) {
        var scopeObj = this;
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        }, 'frmAccountAlertsEdit');
        function completionCallback(asyncResponse) {
            if (asyncResponse.isAllSuccess()) {
                scopeObj.fetchAlertsSuccess(asyncResponse.responses, params, accountDetails);
            } else {
                scopeObj.fetchUserFailure(); // basically, sever down screen function
            }
        }
        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getAlertsManager(), "fetchAlertsInCategory", [params]),
            ], completionCallback);
    };
  /**Success callback for fetch alerts by id
  * @param {Object} response - contains the service response for the Alerts channel and category.
  * @param {String} AlertId - ID of the Alert
  * @param {Object}(optional) accountDetails - selected account details
     */
    SettingsNew_PresentationController.prototype.fetchAlertsSuccess = function(responses, params, accountDetails) {
         var alertsData = {
            "alertsData":responses[0].data,
            "isAlertTypeSelected": responses[0].data.categorySubscription.isSubscribed,
            "isInitialLoad": responses[0].data.categorySubscription.isInitialLoad,
            "AlertCategoryId": params.AlertCategoryId,
            "accountId": params.AccountId,
            "accountTypeId": params.AccountTypeId,
            "accountDetails": accountDetails
        };
        applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsNewAlertsUIModule/frmAccountAlertsEdit"});
        applicationManager.getNavigationManager().navigateTo("frmAccountAlertsEdit");
        applicationManager.getNavigationManager().updateForm({
            AlertsDataById: alertsData
        }, 'frmAccountAlertsEdit');
    };
  /**
     * Method to to fetch the type of customer alert category to be shown.
     * @param {String} entryPoint - Dicides which flow to be called
     */
    SettingsNew_PresentationController.prototype.fetchAlertsCategory = function(entryPoint,accountID) {
        var self=this;
      var configurationManager = applicationManager.getConfigurationManager();
       /* if(entryPoint=="profileSettings"){
          applicationManager.getNavigationManager().navigateTo("frmProfile");
          this.showProgressBar("frmProfile");
        } else if(entryPoint=="securityQuestions"){
          self.checkSecurityQuestions();
        } else if(entryPoint === "alertSettings"){
          if(self.getenableSeparateContact()){
          	applicationManager.getNavigationManager().navigateTo("frmAlertCommunication");
          } else{
           applicationManager.getNavigationManager().navigateTo("frmAccountAlertsList");
		   this.showProgressBar("frmAccountAlertsList");
          }
        }*/
                    this.fetchAccounts(applicationManager.getUserPreferencesManager().getCurrentUserName());

        var asyncManager = applicationManager.getAsyncManager();
        var servicesToCallInAsync = [];
          if(applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT") )
          servicesToCallInAsync.push(asyncManager.asyncItem(applicationManager.getAlertsManager(), 'fetchAlertsCategory'));
         /* if(applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SETTINGS_VIEW") )
          servicesToCallInAsync.push(asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin',[{
            "languageCode": kony.i18n.getCurrentLocale().replace("_","-"),
            "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Estatements_TnC
          }]));*/
          //service call to fetch approval rules to be added once contract is ready
       
        if( applicationManager.getConfigurationManager().checkUserPermission("APPROVAL_MATRIX_VIEW") && configurationManager.isMicroAppPresent(configurationManager.microappConstants.APPROVALMATRIX)) {
          servicesToCallInAsync.push( asyncManager.asyncItem(applicationManager.getBusinessUserManager(), 'fetchAllAccountsForOrganization') );
          servicesToCallInAsync.push( asyncManager.asyncItem(applicationManager.getBusinessUserManager(), 'fetchApprovalRules') );
        }
        if(servicesToCallInAsync.length>0)
        asyncManager.callAsync(servicesToCallInAsync, self.onFetchCallComplete.bind(self, entryPoint, accountID));
        else
        self.fetchAlertsCategorySuccess(entryPoint,null,null,accountID);
    };
    SettingsNew_PresentationController.prototype.onFetchCallComplete = function(entryPoint,accountID,syncResponseObject) {
        var scopeObj = this;
		var configurationManager = applicationManager.getConfigurationManager();
        var approvalMatrixEntitlement = (applicationManager.getConfigurationManager().checkUserPermission("APPROVAL_MATRIX_VIEW") && configurationManager.isMicroAppPresent(configurationManager.microappConstants.APPROVALMATRIX));
        var alertPermission = applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT");
      var allServicesPassed;
      if( approvalMatrixEntitlement) {
        allServicesPassed = syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess && 
          syncResponseObject.responses[2].isSuccess;
      }
      else {
        allServicesPassed = syncResponseObject.responses[0].isSuccess;       
      }
      if ( allServicesPassed ) {
        if( approvalMatrixEntitlement ) {
          if(alertPermission){ 
            scopeObj.fetchAlertsCategorySuccess(entryPoint, syncResponseObject.responses[0].data, syncResponseObject.responses[1].data.OgranizationAccounts, accountID);
          } else{
            scopeObj.fetchAlertsCategorySuccess(entryPoint, null, syncResponseObject.responses[1].data.OgranizationAccounts, accountID);
          }
          scopeObj.setApprovalRulesForOrganization( syncResponseObject.responses[2].data );
        }
        else {
          if(alertPermission){ 
            scopeObj.fetchAlertsCategorySuccess(entryPoint, syncResponseObject.responses[0].data, null, accountID);              
          } else{
            scopeObj.fetchAlertsCategorySuccess(entryPoint, null, null, accountID);
          }
        }
      } else {
            applicationManager.getNavigationManager().updateForm({
                "isLoading": false
            });
            CommonUtilities.showServerDownScreen();
      }
    
    };
  
  	SettingsNew_PresentationController.prototype.setApprovalRulesForOrganization = function( approvalRules ) {
      var rules = [];
      
      for( var i = 0; i < approvalRules.length; i++ ) {
        var rule = {
                "ruleId":approvalRules[i]["id"],
                "ruleName":approvalRules[i]["name"],
                "numberOfApprovals" : approvalRules[i]["numberOfApprovals"]
        }
        rules.push( rule );
      }
      CommonUtilities.setApprovalRules( rules );
    };
  
    SettingsNew_PresentationController.prototype.getTnCOnSuccess = function(TnCresponse) {
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false,
            "TnCcontent": TnCresponse
        });
    };
    SettingsNew_PresentationController.prototype.setAlertsCategoryResponse = function(response){
      this.alertCategoryResponse = response;
      this.enableSeparateContact = (response.alertConfiguration[0].enableSeparateContact=="1")?true:false;
    };
    SettingsNew_PresentationController.prototype.getAlertsCategoryResponse = function(){
      return (this.alertCategoryResponse);
    };
    SettingsNew_PresentationController.prototype.getenableSeparateContact = function(){
      return (this.enableSeparateContact);
    };
    /**
     * Success callback for customer alert category to be shown.
     * @param {String} entryPoint - Dicides which flow to be called
     * @param {Object} response - contains the service response for the Alerts Category.
     */
    SettingsNew_PresentationController.prototype.fetchAlertsCategorySuccess=function(entryPoint , response, companyAccounts,accountID){
      var scopeObj = this;
      if( kony.sdk.isNullOrUndefined( companyAccounts ) ) {
        companyAccounts = [];
      }
      if(response){
            scopeObj.setAlertsCategoryResponse(response);
        }
      if (entryPoint === "profileSettings") {
        applicationManager.getNavigationManager().navigateTo("frmProfile");
          this.showProgressBar("frmProfile");
            this.showProfileSettings();
        }
       if(entryPoint=="securityQuestions"){
          scopeObj.checkSecurityQuestions();
        } 
        if (entryPoint === "accountSettings") {
            this.showPreferredAccounts();
        }
        if (entryPoint === "alertSettings") {
          if(scopeObj.getenableSeparateContact()){
          applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsNewAlertsUIModule/frmAlertCommunication"});  
          applicationManager.getNavigationManager().navigateTo("frmAlertCommunication");
            applicationManager.getNavigationManager().updateForm({
              alertCommunication: response
          }, 'frmAlertCommunication');
          } else{
            var AlertsData = this.getAlertsCategoryResponse();
            var Alert =  AlertsData.records[0].alertcategory_id;
            this.setAlertsMenuValues(Alert);
            if (AlertsData.records[0].alertcategory_accountLevel === "true") {
                var Alert =  AlertsData.records[0].alertcategory_id;
                this.setAlertsMenuValues(Alert);
                this.navigateToAccountAlerts("alertSettings2");
            } else if (AlertsData.records[0].alertcategory_accountLevel === "false") {
                 var params = {
                 "AlertCategoryId":  AlertsData.records[0].alertcategory_id
                  };
                 this.fetchAlertsDataById(params);
               }
          }
        }
		if(entryPoint  ===  "alertSettings2") {
           applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsNewAlertsUIModule/frmAccountAlertsList"});  
           applicationManager.getNavigationManager().navigateTo("frmAccountAlertsList");
		   this.showProgressBar("frmAccountAlertsList");
           applicationManager.getNavigationManager().updateForm({
              Alerts: response,
              companyAccounts: scopeObj.processOrganizationAccounts( companyAccounts.slice( 0, 10 ) )
          }, 'frmAccountAlertsList');
            this.fetchAccountAlerts();
        }
        if(entryPoint === "securityQuestions"){
           this.showSecurityQuestionsScreen();
       }
        if( entryPoint === "approvalMatrix") {
         this.fetchFirstAccountApprovalMatrix(companyAccounts);
       }
        
    };
  
    SettingsNew_PresentationController.prototype.processOrganizationAccounts = function( companyAccounts ) {
      
      if( companyAccounts.length === 0 ) {
        return companyAccounts;
      }
       var AccountsArray = [];
      	(companyAccounts).forEach( function(obj) {
          var AccObj = {};
          AccObj.displayName = obj.accountName + " - X" + CommonUtilities.getLastFourDigit(obj.Account_id);
          AccObj.AccountName = obj.accountName;
          AccObj.Account_id = obj.Account_id;
          AccountsArray.push(AccObj);
        }); 
      
      return AccountsArray;
    };
   /**
     * Error callback for customer alert category to be shown.
     */
    SettingsNew_PresentationController.prototype.fetchAlertsCategoryFailure=function(response){
    }
  /**
     * Entry method to profile settings
     * @param {String} entryPoint - Dicides which flow to be called
     */
    SettingsNew_PresentationController.prototype.enterProfileSettings = function(entryPoint) {
      this.showProgressBar();
      this.initializeUserProfileClass();
       if(entryPoint === "approvalMatrix"){
        this.setContractDetailsForApprovalMatrices();
      }
      else{
        this.fetchAlertsCategory(entryPoint);
      }
    };
  
    SettingsNew_PresentationController.prototype.setContractDetailsForApprovalMatrices = function(response){
      var index = 0;
  this.updatedCoreContracts = [];
      var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
        this.updateContracts(index);      
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    };
  SettingsNew_PresentationController.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function() {
        var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
        var coreCustomers = [];
        for (var i = 0; i < contracts.length; i++) {
            coreCustomers.push(contracts[i].coreCustomerID);
        }
        var corecutomer = {
            "coreCustomerIds": coreCustomers
        };
     
        var data = {
            "coreCustomers": [{
                "coreCustomerId": "11+1",
                "coreCustomerName": "rsj",
                "taxId": "",
                "address": "",
                "signatoryGroups": [{
                    "signatoryGroupId": "1234",
                    "signatoryGroupName": "AB",
                    "signatoryGroupDescription": "Description"
                }]
            }]
        };
     
         applicationManager.getSettingsManager().getAllSignatoryGroupsbyCoreCustomerIds(corecutomer, this.getAllSignatoryGroupsbyCoreCustomerIdsSuccess.bind(this), this.getAllSignatoryGroupsbyCoreCustomerIdsFailure.bind(this));
    };
   SettingsNew_PresentationController.prototype.getAllSignatoryGroupsbyCoreCustomerIdsSuccess = function(response) {
		response.coreCustomers.forEach(function(reponseObj){
			reponseObj.signatoryLenght = reponseObj.signatoryGroups.length.toString() ;
		});
      var contractFilterData = this.getSigContractsList(response.coreCustomers);
		 response.filter = contractFilterData ;
        applicationManager.getNavigationManager().navigateTo("frmSignatoryGroups");
		   applicationManager.getNavigationManager().updateForm({
            signatoryGroups: {
                "data": response,
                // "contractFilter": contractFilterData
            },
            "isLoading": true
        }, 'frmSignatoryGroups');
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false
        }, 'frmSignatoryGroups');
	};
    SettingsNew_PresentationController.prototype.getAllSignatoryGroupsbyCoreCustomerIdsFailure = function() {};
  
    SettingsNew_PresentationController.prototype.sortSegmentData = function(segmentData, sectionIndex, imgWidget, sortKey){
    var sortIcon = segmentData[sectionIndex][0][imgWidget].src;
    var rowData = segmentData[sectionIndex][1];
    var sortOrder = "desc";
    if(sortIcon === "sorting_previous.png"){
      sortOrder = "asc";
      segmentData[sectionIndex][0][imgWidget].src = "sorting_next.png";
    }
    else if(sortIcon === "sorting_next.png" || sortIcon === "sorting.png"){
      segmentData[sectionIndex][0][imgWidget].src = "sorting_previous.png";
    }
	rowData.sort(function(obj1, obj2){
      var order = (sortOrder === "desc") ? -1 : 1;
      if(obj1[sortKey] > obj2[sortKey]){
        return order;
      }
      else if(obj1[sortKey] < obj2[sortKey]){
        return -1 * order;
      }
      else{
        return 0;
      }
    });
	segmentData[sectionIndex][1] = rowData;
  };
  
  SettingsNew_PresentationController.prototype.filterSegmentData = function(segmentData, sectionIndex, filterValue){
    if(filterValue === "All")
      return segmentData;
    var rowData = segmentData[sectionIndex][1];
    var segData = [[segmentData[sectionIndex][0], []]];
    segData[sectionIndex][1] = rowData.filter(function(obj){
      return obj.contractName === filterValue;
    });
    return segData;
  };
  
  SettingsNew_PresentationController.prototype.searchSegmentData = function(segmentData, sectionIndex, searchKey){
    if(searchKey === "")
      return segmentData;
    searchKey = searchKey.toLowerCase();
    var rowData = segmentData[sectionIndex][1];
    var segData = [[segmentData[sectionIndex][0], []]];
    segData[sectionIndex][1] = rowData.filter(function(obj){
       var isContractName = obj.contractName ? obj.contractName.toLowerCase().includes(searchKey) : false;
            var isCustomerName = obj.coreCustomerName ? obj.coreCustomerName.toLowerCase().includes(searchKey) : false;
            var isCustomerID = obj.coreCustomerID ? obj.coreCustomerID.includes(searchKey) : false;
            var isSignatoryGroupName = obj.signatoryGroupName ? obj.signatoryGroupName.toLowerCase().includes(searchKey) : false;
			 var isCustomerNameuser = obj.customerName ? obj.customerName.toLowerCase().includes(searchKey) : false;
              var isRoleName = obj.role ? obj.role.toLowerCase().includes(searchKey) : false;
			 var isSigGroupDesc = obj.signatoryGroupDescription ? obj.signatoryGroupDescription.toLowerCase().includes(searchKey) : false;
            return isContractName || isCustomerName || isCustomerID || isSignatoryGroupName || isCustomerNameuser || isRoleName || isSigGroupDesc;
    });
    return segData;
  };
  
   SettingsNew_PresentationController.prototype.navigateToAccountLevel = function(contractDetails){
     var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
     if(isSignatory)
     {
       applicationManager.getNavigationManager().navigateTo("frmAccountLevelMatrixSignatoryGrp");
     }
     else{
       applicationManager.getNavigationManager().navigateTo("frmApprovalsMatrixAccountLevel");
     }    
    var viewModel={
      "isContractsPresent": true,
      "contractDetails" : contractDetails
    };    
    navigationArray.push(viewModel);
     if(isSignatory)
     {
       applicationManager.getNavigationManager().updateForm(viewModel,"frmAccountLevelMatrixSignatoryGrp");
     }
     else
     {
       applicationManager.getNavigationManager().updateForm(viewModel,"frmApprovalsMatrixAccountLevel");
     }
  };
  
  SettingsNew_PresentationController.prototype.fetchAccountsList = function(cif, contractID){
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
     if(isSignatory)
     {
       var formController = applicationManager.getPresentationUtility().getController('frmAccountLevelMatrixSignatoryGrp', true);
     }
    else{
      var formController = applicationManager.getPresentationUtility().getController('frmApprovalsMatrixAccountLevel', true);
    }
	
    formController.showLoadingScreen();
    var userId = applicationManager.getUserPreferencesManager().getUserId();
    var params = {"userId":userId};
    var businessUserManager = applicationManager.getBusinessUserManager();
    businessUserManager.getInfinityUserAccounts(params, this.fetchAccountsListSuccess.bind(this,cif,contractID),this.fetchAccountsListFailure.bind(this, cif));

  };

  SettingsNew_PresentationController.prototype.fetchAccountsListSuccess = function(cif, contractId, data){
    var data = data.contracts;
    var accountsList = [];
    var contractCustomers = []
    var accountsList = [];
   	for(var i=0;i<data.length;i++){
      if(!kony.sdk.isNullOrUndefined(data[i].contractId) && data[i].contractId==contractId){
        contractCustomers = data[i].contractCustomers;
        break;
      }
    }
    for(var i=0;i<contractCustomers.length;i++){
      if(!kony.sdk.isNullOrUndefined(contractCustomers[i].id) && contractCustomers[i].id==cif){
        accountsList = contractCustomers[i].coreCustomerAccounts;
        break;
      }
    }
    this.processAccountsData(accountsList);
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
     if(isSignatory)
     {
       var formController = applicationManager.getPresentationUtility().getController('frmAccountLevelMatrixSignatoryGrp', true);
     }
    else{
      var formController = applicationManager.getPresentationUtility().getController('frmApprovalsMatrixAccountLevel', true);
    }
    formController.hideLoadingScreen();
  };
  
  SettingsNew_PresentationController.prototype.fetchAccountsListFailure = function(cif,data){
    this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsModule');
    var accountsList = this.presenter.presentationController.accounts;
    var accountDataforCif=[];
    accountsList.forEach(item=>{
      if(item.Membership_id===cif){
        accountDataforCif.push(item);
      }
    });
    this.processAccountsData(accountDataforCif);
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
     if(isSignatory)
     {
       var formController = applicationManager.getPresentationUtility().getController('frmAccountLevelMatrixSignatoryGrp', true);
     }
    else{
      var formController = applicationManager.getPresentationUtility().getController('frmApprovalsMatrixAccountLevel', true);
    }
    formController.hideLoadingScreen();
  };
  
  SettingsNew_PresentationController.prototype.processAccountsData = function(data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].accountName;
      } else {
        name = data[i].nickName;
      }
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      var accountID = data[i].accountID || data[i].accountId;
      accProcessedData[i].accountID = accountID;
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].processedName = this.formatText(name, 24, accountID, 4);
    }
    this.processViewFormattedData(accProcessedData)
    };
  
   SettingsNew_PresentationController.prototype.formatText=function(accountName,noOfChars,accountNumber,beginIndex){
      var truncatedAccName = "";
      var truncatedAccNum="";
      var formattedAccName ="";
      if (accountName && accountNumber && accountName.length > noOfChars) {
        truncatedAccName = accountName.substring(0, noOfChars - 1);
      } else {
        truncatedAccName = accountName;
      }
      if (accountNumber && accountNumber.length > beginIndex) {
        truncatedAccNum = accountNumber.substr(accountNumber.length - beginIndex);
      } else {
        if(accountNumber){
          truncatedAccNum = accountNumber;
        }
      }
      if(truncatedAccNum){
        formattedAccName = truncatedAccName + "..." + truncatedAccNum;
      }
      else{
        formattedAccName = truncatedAccName ;
      }
      return formattedAccName;
    };
  SettingsNew_PresentationController.prototype.processViewFormattedData = function(data) {
    var processedData = {}
    for (var i = 0; i < data.length; i++) {
      if (!processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType] = [];
      }
      if (processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType].push(data[i]);
      }
    }
    processedData=this.orderByPriority(processedData);
    this.segregateAccountsByType(processedData);
     };
  
    SettingsNew_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };
  SettingsNew_PresentationController.prototype.orderByPriority = function(data) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key1 in metaData) {
      if (data[metaData[key1].backendValue]) {
        prioritizedData[metaData[key1].backendValue] = data[metaData[key1].backendValue];
      }
    }
    return prioritizedData;
  };
  SettingsNew_PresentationController.prototype.setSegmentDatainController = function(segData) {
    var viewModel={
      "isSegData":true,
      "data":segData
    };
        
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
     if(isSignatory)
     {
       applicationManager.getNavigationManager().updateForm(viewModel, "frmAccountLevelMatrixSignatoryGrp");
     }
    else{
      applicationManager.getNavigationManager().updateForm(viewModel, "frmApprovalsMatrixAccountLevel");
    }
    };
  
  SettingsNew_PresentationController.prototype.segregateAccountsByType = function (viewBindData){
    var segData=[];
    if(viewBindData){
        for(var key in viewBindData){
          var sectionHeaderData={};
          var combinedData=[];
          if(key !== "CreditCard"){
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = key + " "+ kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.accounts");
            } else {
              sectionHeaderData["lblHeader"] = key + " "+ kony.i18n.getLocalizedString("kony.18n.approvalMatrix.account");
            }
          }
          else{
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = kony.i18n.getLocalizedString("kony.18n.approvalMatrix.creditcards");
            } else {
              sectionHeaderData["lblHeader"] = kony.i18n.getLocalizedString("i18n.Accounts.backendCreditCard");
            }
          }
          var rowDataForSection=this.sortByPrefrence(viewBindData[key]);
          if(rowDataForSection.length>0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            segData.push(combinedData);
          }
        }
      }
    this.dataForSegment=segData;
    this.setSegmentDatainController(segData);
   };

  
   SettingsNew_PresentationController.prototype.searchFeaturesSegmentData = function(searchKey){
    var data=this.features;
    if(searchKey === ""){
      this.setFeaturesSegmentDatainController(data);
    }
    else{
      var searchData=[];
      searchData= data.filter(function(obj){
        return obj.actionName.text.toLowerCase().includes(searchKey.toLowerCase());
      });
      this.setFeaturesSegmentDatainController(searchData);
    }
  };
  
  SettingsNew_PresentationController.prototype.setFeaturesSegmentDatainController = function(searchData) {
    var viewModel={
      "isFeatures":true,
      "data":searchData
    };
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory)
    {
      applicationManager.getNavigationManager().updateForm(viewModel, "frmViewApprovalSignatoryMatrix");
    }else{
      applicationManager.getNavigationManager().updateForm(viewModel, "frmViewApprovalsMatrix");
    }
  };
  
  SettingsNew_PresentationController.prototype.filterNameArray=function(array,searchKey) {
    return array.filter(item=> ((item.accountName)?item.accountName.toLowerCase().includes(searchKey):"") || (item.accountID?item.accountID.toLowerCase().includes(searchKey):"") || (item.processedName?item.processedName.toLowerCase().includes(searchKey):""));

  };
  SettingsNew_PresentationController.prototype.searchSegmentDataforAccountLevel = function(searchKey){
    if(searchKey!==""){
      var segData=this.dataForSegment;
      var result=segData
      .map(data =>{
        const filteredData = this.filterNameArray(data[1],searchKey.toLowerCase());
        if(filteredData.length > 0){
          const tempArray = [];
          tempArray.push(data[0]);
          tempArray.push(filteredData);
          return tempArray;
        }
      })
      .filter(data => data !== (null || undefined ));
      this.setSegmentDatainController(result);
    }
    else{
      this.setSegmentDatainController(this.dataForSegment);
    }
  };
SettingsNew_PresentationController.prototype.sortSegmentDataforAccountLevel = function(segmentData, sectionIndex, imgWidget, sortKey){
    var sortIcon = segmentData[sectionIndex][1][0][imgWidget].src;
    var rowData = segmentData[sectionIndex][1];
    var sortOrder = "desc";
    if(sortIcon === "sorting_previous.png"){
      sortOrder = "asc";
      segmentData[sectionIndex][1][0][imgWidget].src = "sorting_next.png";
    }
    else if(sortIcon === "sorting_next.png" || sortIcon === "sorting.png"){
      segmentData[sectionIndex][1][0][imgWidget].src = "sorting_previous.png";
    }
	rowData.sort(function(obj1, obj2){
      var order = (sortOrder === "desc") ? -1 : 1;
      if(obj1[sortKey] > obj2[sortKey]){
        return order;
      }
      else if(obj1[sortKey] < obj2[sortKey]){
        return -1 * order;
      }
      else{
        return 0;
      }
    });
	segmentData[sectionIndex][1] = rowData;
  };
  
   SettingsNew_PresentationController.prototype.noServiceNavigateToViewMatrix = function(){
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory)
    {
      applicationManager.getNavigationManager().navigateTo("frmViewApprovalSignatoryMatrix");
      
    }
    else{
      applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
      
    }
  };
  
  SettingsNew_PresentationController.prototype.backNavigateToViewMatrix = function() {
    navigationArray.pop();
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory)
    {
      applicationManager.getNavigationManager().navigateTo("frmViewApprovalSignatoryMatrix");
      applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmViewApprovalSignatoryMatrix");
    }
    else{
      applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
      applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmViewApprovalsMatrix");
    }
    
  };
  
  SettingsNew_PresentationController.prototype.noServiceNavigateToAccountLevel = function() {
    navigationArray.pop();
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory)
    {
      applicationManager.getNavigationManager().navigateTo("frmAccountLevelMatrixSignatoryGrp");
      applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmAccountLevelMatrixSignatoryGrp");
    }
    else{
      applicationManager.getNavigationManager().navigateTo("frmApprovalsMatrixAccountLevel");
      applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmApprovalsMatrixAccountLevel");
    }
  };
  
  SettingsNew_PresentationController.prototype.isApprovalMatrixDisabled = function(rowData){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var request = {
      "contractId" : rowData.contractId,
      "cif" : rowData.coreCustomerID
    };
    applicationManager.getNavigationManager().updateForm({
      isLoading : true
    }, 'frmApprovalmatrix');
  	applicationManager.getBusinessUserManager().isApprovalMatrixDisabled(request, this.navigateToViewMatrix.bind(this, rowData), this.aprovalMatrixServiceFailure.bind(this, rowData));
  };
  
  SettingsNew_PresentationController.prototype.navigateToViewMatrix = function(rowData, response){
    var isDisabled = (response.isDisabled === "true");
    applicationManager.getNavigationManager().setCustomInfo("frmViewApprovalsMatrix", isDisabled);
    applicationManager.getNavigationManager().setCustomInfo("frmViewApprovalSignatoryMatrix", isDisabled);
    this.fetchApprovalMatrix(rowData);
  };
  
  SettingsNew_PresentationController.prototype.fetchApprovalMatrix = function(rowData){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var request = {
      "cif" : rowData.coreCustomerID,
      "contractId" : rowData.contractId,
      "accountId" : (kony.sdk.isNullOrUndefined(rowData.accountId))? "" : rowData.accountId
    };
    applicationManager.getBusinessUserManager().fetchApprovalMatrix(request, this.onFetchApprovalMatrixSuccess.bind(this, rowData),
                                                                    this.aprovalMatrixServiceFailure.bind(this, rowData));
  };
  
    SettingsNew_PresentationController.prototype.aprovalMatrixServiceFailure = function(contracts, error){
    var currentForm = kony.application.getCurrentForm().id;
    if(currentForm !== contracts.entryPoint){
      applicationManager.getNavigationManager().navigateTo(contracts.entryPoint);
    }
    applicationManager.getNavigationManager().updateForm({
      approvalMatrixError : error,
      isLoading : false
      }, contracts.entryPoint);
  };
  
  SettingsNew_PresentationController.prototype.noServiceNavigateToAccountLevel = function() {
    navigationArray.pop();
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory)
    {
    applicationManager.getNavigationManager().navigateTo("frmAccountLevelMatrixSignatoryGrp");
    applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmAccountLevelMatrixSignatoryGrp");
}
    else{
      applicationManager.getNavigationManager().navigateTo("frmApprovalsMatrixAccountLevel");
    applicationManager.getNavigationManager().updateForm(navigationArray[navigationArray.length-1], "frmApprovalsMatrixAccountLevel");
    }
    
  };
  
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatus = function(contracts, isDisabled){
    var request = {
      "contractId" : contracts.contractId,
      "cif" : contracts.coreCustomerID,
      "disable" : isDisabled
    };
    applicationManager.getBusinessUserManager().updateApprovalMatrixStatus(request, this.updateApprovalMatrixStatusSuccess.bind(this, contracts,isDisabled), this.updateApprovalMatrixStatusFailure.bind(this));
  };
  
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatusSuccess = function(contracts,isDisabled, response){
    var isSignatory = applicationManager.getNavigationManager().getCustomInfo("IS_SIGNATORY_GROUP");
    if(isSignatory){
      applicationManager.getNavigationManager().setCustomInfo("CURRENT_CUSTOMER_MATRIX_STATUS", !isDisabled); 
    }else{
      var isDisabled = applicationManager.getNavigationManager().getCustomInfo("frmViewApprovalsMatrix");
      applicationManager.getNavigationManager().setCustomInfo("frmViewApprovalsMatrix", !isDisabled); 
    }
    this.fetchApprovalMatrix(contracts);
  };
  
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatusFailure = function(error){
    applicationManager.getNavigationManager().updateForm({
      updateStatusError : error,
      isLoading : false
      }, "frmViewApprovalsMatrix");
  };
  
  SettingsNew_PresentationController.prototype.getCoreCustomerFeatureActionLimits = function( editData ) {
    var params = {
      "coreCustomerId" : editData.coreCustomerID
    };
    applicationManager.getBusinessUserManager().getCoreCustomerFeatureActionLimits(params, 
												this.onGetActionLimitSuccess.bind(this, editData),
                                                this.onGetActionLimitFailure.bind(this, editData));     
  };
  
  SettingsNew_PresentationController.prototype.onGetActionLimitSuccess = function( editData, actionLimitResponse ) {
    if(kony.sdk.isNullOrUndefined(actionLimitResponse["features"]) || actionLimitResponse["features"].length == 0)
      this.onGetActionLimitFailure();
    else{
      var features = actionLimitResponse["features"];
      for(var feature=0; feature<features.length; feature++){
        var actions = features[feature].actions;
        for(var action=0; action<actions.length; action++){
          if( editData["actionId"] === actions[action]["actionId"] ) {
            if(!kony.sdk.isNullOrUndefined(actions[action].limits)){
              var limits = actions[action].limits;
              for(var limit=0; limit<limits.length; limit++){
                if(limits[limit].id === editData["frequency"]){
                  editData["featureAction"]["featureActionLimit"] = limits[limit]["value"];
                  break;
                }
              }
            }
          }
        }
      }
	  applicationManager.getNavigationManager().navigateTo("frmEditApprovalsMatrixLimits");
      applicationManager.getNavigationManager().updateForm({
         editData : editData        
      }, "frmEditApprovalsMatrixLimits");   
    }
  };
  
  SettingsNew_PresentationController.prototype.onGetActionLimitFailure = function( editData, error ) {
    applicationManager.getNavigationManager().updateForm({
      EditModelError : {
        error : error        
      } 
    }, "frmViewApprovalsMatrix");  
  };   
  SettingsNew_PresentationController.prototype.getAllSignatoryGroups = function(data,response) {
        var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
        //  applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
        applicationManager.getNavigationManager().updateForm({
            "isLoading": true
        }, 'frmViewApprovalsMatrix');
        var input = {
            "contractId": data.contractId,
            "coreCustomerId": data.coreCutomerId,
        };
        applicationManager.getSettingsManager().getAllSignatoryGroups(input, this.getAllSignatoryGroupsSuccess.bind(this,response), this.getAllSignatoryGroupsFailue.bind(this,response));
    };
	SettingsNew_PresentationController.prototype.getAllSignatoryGroupsSuccess = function(deletes,response){
		applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
    	if(response.coreCustomers.length !== 0) {
        response.coreCustomers[0].signatoryGroups.forEach(function(data) {
            if (kony.sdk.isNullOrUndefined(data.noOfUsers)) data.noOfUsers = "-";
        });
		}
		 applicationManager.getNavigationManager().updateForm({
            signatoryGroups: {
                "data": response,
              "detele" :deletes ,
                // "contractFilter": contractFilterData
            },
            "isLoading": false
        }, 'frmViewApprovalsMatrix');
		
	};
	SettingsNew_PresentationController.prototype.getAllSignatoryGroupsFailue = function (){
		
	};
  SettingsNew_PresentationController.prototype.getSignatoryGroupDetails = function(signatoryId) {
        var data = {
            "signatoryGroupId": "1234",
            "signatoryGroupName": "AB",
            "signatoryGroupDescription": "",
            "coreCustomerId": "",
            "coreCustomerName": "",
            "createdBy": "",
            "createdOn": "",
            "lastModified": "",
            "signatories": [{
                "signatoryId": "",
                "customerId": "12344",
                "customerName": "",
                "role": "",
                "approvalPermission": ""
            }]
        };
        applicationManager.getNavigationManager().navigateTo("frmViewManageSignatoryGroup");
		 applicationManager.getNavigationManager().updateForm({
            "isLoading": true
        }, 'frmViewManageSignatoryGroup');
		var input = {
			"signatoryGroupId" : signatoryId
		};
        
		applicationManager.getSettingsManager().getSignatoryGroupDetails(input,this.getSignatoryGroupDetailsSuccess.bind(this),this.getSignatoryGroupDetailsFailue.bind(this) );
       
    };
	SettingsNew_PresentationController.prototype.getSignatoryGroupDetailsSuccess = function (response){
      	var roles = this.getRoleList(response.signatories);
		response.filterRole = roles ;
		applicationManager.getNavigationManager().updateForm({
            signatoryGroupDetails: {
                "data": response,
                // "contractFilter": contractFilterData
            },
            "isLoading": false
        }, 'frmViewManageSignatoryGroup');
	};
	SettingsNew_PresentationController.prototype.getSignatoryGroupDetailsFailue = function (response){
		
	};
   SettingsNew_PresentationController.prototype.getRoleList = function(response) {
        var contracts = new Set();
        var result = [];
       // contracts.add("All"); // default filter
        response.forEach(function(contract) {
            contracts.add(contract.role);
        });
        contracts.forEach(function(contract) {
            result.push({
                "role": contract
            });
        });
        return result;
    };
  SettingsNew_PresentationController.prototype.deleteSignatoryGroup = function() {
		 applicationManager.getNavigationManager().updateForm({
            deleteSignatoryDetails: {
                "data": "",
                // "contractFilter": contractFilterData
            },
            "isLoading": true
        }, 'frmViewApprovalsMatrix');
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false
        }, 'frmViewApprovalsMatrix');
		
	};


  
  SettingsNew_PresentationController.prototype.getActionNameBasedOnPermissions = function(){
    var isViewEnabled = applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_VIEW');
    var isEditEnabled = applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_MANAGE');
    var btnText = (isViewEnabled) ? kony.i18n.getLocalizedString("i18n.locateus.view") : "";
    btnText += (isViewEnabled && isEditEnabled) ? ("/" + kony.i18n.getLocalizedString("i18n.billPay.Edit"))
    											: ((isEditEnabled) ? kony.i18n.getLocalizedString("i18n.billPay.Edit") : "");
    //btnText += " " + kony.i18n.getLocalizedString("konybb.approvalMatrix.matrix");
    return btnText;
  };
  SettingsNew_PresentationController.prototype.getActionNameBasedOnPermissionsSignatory = function() {
        var isViewEnabled = applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_VIEW');
        var isEditEnabled = applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT');
        var btnText = (isViewEnabled) ? kony.i18n.getLocalizedString("i18n.locateus.view") : "";
        btnText += (isViewEnabled && isEditEnabled) ? ("/" + kony.i18n.getLocalizedString("i18n.billPay.Edit")) : ((isEditEnabled) ? kony.i18n.getLocalizedString("i18n.billPay.Edit") : "");
       // btnText += " " + kony.i18n.getLocalizedString("konybb.approvalMatrix.matrix");
        return btnText;
    };
  
   SettingsNew_PresentationController.prototype.getContractsList = function(response){
    var contracts = new Set();
    var result = [] , sectionData = [] , filterData = [] , output = [];
    //contracts.add("All"); // default filter
    response.forEach(function(contract){
      contracts.add(contract.contractName);
    });
    contracts.forEach(function(contract){
       result.push({"contract": contract,"imgFilterCheckbox":{
           "src" : "inactivecheckbox.png",
           "width" : "20px",
           "height" : "20px"
         }});	
     });
     output.push([{
       "lblNameHdr" : kony.i18n.getLocalizedString("i18n.approvals.contract")
     },result]);
     output.push([{
       "lblNameHdr" : kony.i18n.getLocalizedString("i18n.approvals.approvalode")
     },
       [
       {
         "contract" :  "Signatory Group",
         "imgFilterCheckbox":{
           "src" : "inactivecheckbox.png",
           "width" : "20px",
           "height" : "20px"
         }
       },
       {
         "contract" :  "User",
         "imgFilterCheckbox":{
           "src" : "inactivecheckbox.png",
           "width" : "20px",
           "height" : "20px"
         }
       }
     ]]);
     return output;
  };
  SettingsNew_PresentationController.prototype.getSigContractsList = function(response) {
        var contracts = new Set();
        var result = [];
		  response.forEach(function(contract) {
            contracts.add(contract.contractName);
        });
		contracts.add("All") ;
		contracts.forEach(function(contract){
      result.push({"contract": contract});	
    });
    return result;
	};
   SettingsNew_PresentationController.prototype.updateContracts = function(i){
     var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
     if(i<contracts.length){
  this.fetchApprovalMode(contracts[i],i);
    
     }
    else
       return JSON.parse(JSON.stringify(this.updatedCoreContracts));
  };
	  /**
     * Entry method to Alerts settings
     * @param {String} entryPoint - Dicides which flow to be called
     */
    SettingsNew_PresentationController.prototype.navigateToAccountAlerts = function(entryPoint) {
      this.showProgressBar();
      this.fetchAlertsCategory(entryPoint);    
    };
  /**
     * Method to navigate to profile form
     */
    SettingsNew_PresentationController.prototype.fetchFirstAlerttype = function() {
      applicationManager.getNavigationManager().updateForm({
            fetchFirstAlert: {}
        }, 'frmProfileManagement');
    };
      /**
     * Method to navigate to profile form
     */
    SettingsNew_PresentationController.prototype.fetchThirdAlerttype = function(accountID) {
      applicationManager.getNavigationManager().updateForm({
            fetchThirdAlert: {accountID}
        }, 'frmProfileManagement');
    };
  /**
     * Method to navigate to profile form - approvalMatrix
     */
    SettingsNew_PresentationController.prototype.fetchFirstAccountApprovalMatrix = function(companyAccounts) {
      applicationManager.getNavigationManager().updateForm({
            fetchFirstAccountApprovalMatrix: {
				"companyAccounts" : companyAccounts
			}
        }, 'frmProfileManagement');
    };  
  /**
     * Method to fetch the username rules and policies
     */
  SettingsNew_PresentationController.prototype.getUsernameRulesAndPolicies = function() {
     applicationManager.getUserPreferencesManager().fetchUsernameRulesAndPolicy(this.getUsernameRulesAndPoliciesSuccess.bind(this), this.getUsernameRulesAndPoliciesFailure.bind(this));
    };
    /**
     * Method used as success call back for the password rules.
     * @param {Object} response - contains the service response for the password rules.
     */
    SettingsNew_PresentationController.prototype.getUsernameRulesAndPoliciesSuccess = function(response) {
       var validationUtility = applicationManager.getValidationUtilManager();
       validationUtility.createRegexForUsernameValidation(response.usernamerules);
        applicationManager.getNavigationManager().updateForm({
            usernamepolicies: {"usernamepolicies" : response.usernamepolicy}
        }, "frmProfileManagement");
    };
  /**
     *failure callback of method getUsernameRulesAndPolicies
     */
  SettingsNew_PresentationController.prototype.getUsernameRulesAndPoliciesFailure = function() {
 };
   SettingsNew_PresentationController.prototype.showUserNameAndPassword = function() {
     applicationManager.getNavigationManager().navigateTo("frmUsernameAndPassword");
      applicationManager.getNavigationManager().updateForm({
            usernameAndPasswordLanding: {}
        }, 'frmUsernameAndPassword');
 };
   SettingsNew_PresentationController.prototype.showBankingAccess = function() {
     applicationManager.getNavigationManager().navigateTo("frmeBankingAccess");
      applicationManager.getNavigationManager().updateForm({
            eBankingAccessLanding: {}
        }, 'frmeBankingAccess');
 };
   SettingsNew_PresentationController.prototype.showSecurityQuestionsScreen = function() {
        applicationManager.getNavigationManager().updateForm({
            showSecurityQuestion: true,
            isLoading: true
        }, 'frmProfileManagement');
    };
  
  SettingsNew_PresentationController.prototype.getAccountActionCustomerApproverList = function(requestParams) {
        applicationManager.getBusinessUserManager().getAccountActionCustomerApproverList(requestParams, 
                                                                                         this.getAccountActionCustomerApproverListSuccess.bind(this),
                                                                                         this.getAccountActionCustomerApproverListFailure.bind(this));     
  };
  
  SettingsNew_PresentationController.prototype.getAccountActionCustomerApproverListSuccess = function( approversResponse ) {
    applicationManager.getNavigationManager().updateForm({
      approversResponse: {
        approvers : approversResponse["Approvers"]
      }
      
    }, "frmEditApprovalsMatrixLimits");
      
  };
  
  SettingsNew_PresentationController.prototype.getAccountActionCustomerApproverListFailure = function( error ) {
    applicationManager.getNavigationManager().updateForm({
      approversResponse: {
        error : error.errorMessage
      }     
    }, "frmEditApprovalsMatrixLimits");
  }; 
  
   SettingsNew_PresentationController.prototype.fetchApprovalRules = function() {
     applicationManager.getBusinessUserManager().fetchApprovalRules(this.fetchApprovalRulesSuccess.bind(this),
                                                                    this.fetchApprovalRulesFailure.bind(this));     
  };
  
  SettingsNew_PresentationController.prototype.fetchApprovalRulesSuccess = function( approversRules ) {
    applicationManager.getNavigationManager().updateForm({
      approversRules: {
        rules : approversRules
      },
      isLoading:false
    }, "frmEditApprovalsMatrixLimits");
      
  };
  
  SettingsNew_PresentationController.prototype.fetchApprovalRulesFailure = function( error ) {
    applicationManager.getNavigationManager().updateForm({
      approversResponse: {
        error : error.errorMessage
      }     
    }, "frmEditApprovalsMatrixLimits");
  }; 

  
  SettingsNew_PresentationController.prototype.fetchApprovalMatrixBasedOnAccountIdAndLimitTypeId = function( accountId, limitTypeId ) {
    var requestParams = { "accountId" : accountId, "limitTypeId" : limitTypeId };
    applicationManager.getBusinessUserManager().fetchApprovalMatrixBasedOnAccountIdAndLimitTypeId(requestParams, 
                                                                                                  this.onFetchApprovalMatrixSuccess.bind(this),
                                                                                                  this.onFetchApprovalMatrixFailure.bind(this));     
  };
  
   SettingsNew_PresentationController.prototype.onFetchApprovalMatrixSuccess = function(rowData, response){
     applicationManager.getNavigationManager().setCustomInfo("ORIGINAL_APPROVAL_RESPONSE", response); 
    var processedMatrix = this.getProcessedApprovalMatrix(response);
    var allFeatureMatrix = this.getFinAndNonFinMatrix(processedMatrix);
    var processedFeatures = this.getFeaturesFromMatrix(processedMatrix);
    this.features=processedFeatures;
     if(!kony.sdk.isNullOrUndefined(rowData.isSignatoryGroup) && rowData.isSignatoryGroup === true){
       applicationManager.getNavigationManager().navigateTo("frmViewApprovalSignatoryMatrix");
     }
     else
     {
       applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
     }
    var viewModel={
      isLoading: true,
      approvalMatrix: allFeatureMatrix[0],
      nonFinMatrix: allFeatureMatrix[1],
      features: processedFeatures,
      contractDetails: rowData,
      entryPoint: rowData.entryPoint
    };
    if(saveState){
      var tempentrypoint=navigationArray[navigationArray.length-1].entryPoint
      navigationArray.pop();
      navigationArray.push(viewModel);
      navigationArray[navigationArray.length-1].entryPoint=tempentrypoint;
      saveState=false;
    }
    else{
       navigationArray.push(viewModel);
    }
     if(!kony.sdk.isNullOrUndefined(rowData.isSignatoryGroup) && rowData.isSignatoryGroup === true){
       applicationManager.getNavigationManager().updateForm(viewModel, "frmViewApprovalSignatoryMatrix");
     }
     else
     {
       applicationManager.getNavigationManager().updateForm(viewModel, "frmViewApprovalsMatrix");
     }
  };
  
   SettingsNew_PresentationController.prototype.getProcessedApprovalMatrix = function(response, isCommonResponse) {
    var data = response.common !== undefined ? response.common.limitTypes : response.accounts[0].limitTypes;        
    return this.processLimitTypes(data);
  };
  
    SettingsNew_PresentationController.prototype.processLimitTypes = function(limitTypes){
    var processedData = {};
    for (var limitType = 0; limitType < limitTypes.length; limitType++) {
      var limitId = limitTypes[limitType].limitTypeId;
      var actions = limitTypes[limitType].actions;
      for (var action = 0; action < actions.length; action++) {
        if (kony.sdk.isNullOrUndefined(processedData[actions[action].actionId])) {
          processedData[actions[action].actionId] = {
            "actionName": actions[action]["actionName"],
            "actionId": actions[action]["actionId"],
            "featureId": actions[action]["featureId"],
            "featureName": actions[action]["featureName"],
            "actionType": actions[action]["actionType"],
            "maxAmount": (!kony.sdk.isNullOrUndefined(actions[action]["maxAmount"])) ? actions[action]["maxAmount"] : ""
          };
        }
        processedData[actions[action].actionId][limitId] = actions[action].limits;
      }
    }
    return processedData;
  };
  
  SettingsNew_PresentationController.prototype.getFeaturesFromMatrix = function(matrix){
    var features = [];
    var actions = Object.keys(matrix);
    for(var action = 0; action < actions.length; action++){
      var actionName = matrix[actions[action]]["featureName"]+" - "+matrix[actions[action]]["actionName"];
      var actionObject = {
        "text" : (actionName.length > 35) ? (actionName.substring (0,35) + "...") : actionName,
        "toolTip" : actionName
      }
      features.push({
        "actionId" : actions[action],
        "actionName" : actionObject,
        "imgArrow" : {
          "isVisible" : false
        },
        "flxSelectRole" : {
          "isVisible" : false
        },
        "isMonetary": matrix[actions[action]].actionType === "MONETARY" ? true : false
      });
    }
    return features;
  };
  
   SettingsNew_PresentationController.prototype.getFinAndNonFinMatrix = function(matrix) {
    var allFeatureMatrix = [];
    var finMatrix = {};
    var nonFinMatrix = {};
    var actions = Object.keys(matrix);
    for(var action = 0; action < actions.length; action++){
      var actionObj = matrix[actions[action]];
      if(actionObj.actionType === "NON_MONETARY"){
        nonFinMatrix[actionObj.actionId] = actionObj;
      }
      else
        finMatrix[actionObj.actionId] = actionObj;
    }
    allFeatureMatrix.push(finMatrix);
    allFeatureMatrix.push(nonFinMatrix);
    return allFeatureMatrix;
  };
  
  SettingsNew_PresentationController.prototype.processApprovalMatrixResponse = function( approvalMatrixResponse ) {
    var finalApprovalMatrix = {
      accountId : null,
      limitTypeId : null,
      actions : null
    };
    
    finalApprovalMatrix["accountId"] = approvalMatrixResponse["accounts"][0]["accountId"];
    finalApprovalMatrix["limitTypeId"] = approvalMatrixResponse["accounts"][0]["limitTypes"][0]["limitTypeId"];
    finalApprovalMatrix["actions"] = approvalMatrixResponse["accounts"][0]["limitTypes"][0]["actions"];
    
    return finalApprovalMatrix;
  };
  
  SettingsNew_PresentationController.prototype.onFetchApprovalMatrixFailure = function( error ) {
    applicationManager.getNavigationManager().updateForm({
      approvalMatrixFailure : {
        "errorMessage" : error.errorMessage
      }     
    }, "frmProfileManagement"); 
  }; 
  
  SettingsNew_PresentationController.prototype.saveApprovalMatrixForAccountAndFeatureAction = function( currentState ) {
    applicationManager.getBusinessUserManager().updateApprovalMatrixPerFeatureAction(currentState, 
                                                                                                  this.onSaveApprovalMatrixSuccess.bind(this),
                                                                                                  this.onSaveApprovalMatrixFailure.bind(this));     
  };
  
  SettingsNew_PresentationController.prototype.onSaveApprovalMatrixSuccess = function( approvalMatrix ) {
    applicationManager.getNavigationManager().updateForm({
      approvalMatrixUpdated : { isSuccessful : true }      
    }, "frmEditApprovalsMatrixLimits");      
  };
  
  SettingsNew_PresentationController.prototype.onSaveApprovalMatrixFailure = function( error ) {
    applicationManager.getNavigationManager().updateForm({
      approvalMatrixUpdated : { isSuccessful : false,
                                errorMessage : error.errorMessage
                              }      
    }, "frmEditApprovalsMatrixLimits");  
  }; 
  
  SettingsNew_PresentationController.prototype.getOrganizationLimitForGivenFeatureAction = function( editData ) {
    var featureAction = {
      "actionId" : editData["featureAction"]["featureActionId"]
    }
    applicationManager.getBusinessUserManager().getOrganizationLimitForGivenFeatureAction(featureAction, 
                                                                                                  this.onGetActionLimitSuccess.bind(this, editData),
                                                                                                  this.onGetActionLimitFailure.bind(this, editData));     
  };
   
  SettingsNew_PresentationController.prototype.showProfileLanguage = function(){
     applicationManager.getNavigationManager().navigateTo("frmProfileLanguage"); 
     applicationManager.getNavigationManager().updateForm({"isLoading":true});
     applicationManager.getNavigationManager().updateForm({"isLoading":false});
  }
  /**
   * Method used to get T&C for disable ebankingAccess.
   */
  SettingsNew_PresentationController.prototype.getTncContent = function(type) {
      var config = applicationManager.getConfigurationManager();
      var locale = config.getLocale();
      var termsAndConditions = config.getTermsAndConditions();
      var codeTnC = termsAndConditions["OnlineBankingAccess"];
      if (type === OLBConstants.TNC_FLOW_TYPES.Estatements_TnC) {
          codeTnC = OLBConstants.TNC_FLOW_TYPES.Estatements_TnC;
      }
      var param = {
          "languageCode": termsAndConditions[locale],
          "termsAndConditionsCode": codeTnC
      };
      applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin(param, this.getTermsandConditionsSuccessCallBack.bind(this, type), this.getTermsandConditionsErrorCallback.bind(this,type));
    };
 SettingsNew_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(type,response){
     if (type === OLBConstants.TNC_FLOW_TYPES.Estatements_TnC) {
        applicationManager.getNavigationManager().navigateTo("frmEditAccountPreferences");
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false,
            "TnCcontent": response,
           "onPreferenceAccountEdit":this.accountPrefObj.onPreferenceAccountEdit
        }, "frmEditAccountPreferences");

    }
     else {
         applicationManager.getNavigationManager().updateForm({
             termsAndConditionsContent: response.termsAndConditionsContent
         }, "frmeBankingAccess");
    }
  };
  SettingsNew_PresentationController.prototype.getTermsandConditionsErrorCallback = function(type,response){
      if (type === OLBConstants.TNC_FLOW_TYPES.Estatements_TnC)
          applicationManager.getNavigationManager().navigateTo("frmEditAccountPreferences");
      else
          CommonUtilities.showServerDownScreen();
  };

  SettingsNew_PresentationController.prototype.setAccountPrefContext = function(accountPrefObj){
    this.accountPrefObj= accountPrefObj;
 };
  /**
   * Method used to disable ebankingAccess.
   */
  SettingsNew_PresentationController.prototype.disableEBankingAccess = function(){
    var userManager = applicationManager.getUserPreferencesManager();
    var userName = userManager.getUserObj().userName;
    var params = {
      "UserName": userName,
      "Status":"SUSPENDED"
    };
    userManager.updateUserStatus(params,this.disableEBankingAccessSuccess,this.disableEBankingAccessError);
   };
    /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.saveAddressFailureCallBack = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            addNewAddress: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmAddNewAddress");
    };
   /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.updateAddressFailureCallBack = function(errorMessage) {
        var viewProperties = {
            isLoading: false,
            editAddress: {
                serverError: errorMessage
            }
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmEditAddress");
    };
  
   SettingsNew_PresentationController.prototype.disableEBankingAccessSuccess = function(response){
     if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
       var mfaJSON = {
         "serviceName": applicationManager.getMFAManager().getServiceId(),
         "flowType": "SUSPEND_USER",
         "response": response,
         "objectServiceDetails": {
           "action": "SUSPEND_USER",
           "serviceName": "ExternalUserManagement",
           "dataModel": "ExternalUsers_2",
           "verifyOTPOperationName": "updateUserStatus",
           "requestOTPOperationName": "updateUserStatus",
           "resendOTPOperationName": "updateUserStatus",
         },
       };
       applicationManager.getMFAManager().initMFAFlow(mfaJSON);
     }
     else{
       var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
       authMod.presentationController.disableEBankingLogout();
     }
   };

   SettingsNew_PresentationController.prototype.disableEBankingAccessError = function(error){
      CommonUtilities.showServerDownScreen();
   };
   /**
     * Method to update the signatory group
     * @param {Object} group - contains the group details.
     */
    SettingsNew_PresentationController.prototype.updateSignatoryGroupdetails = function(context) {
      applicationManager.getSettingsManager().updateSignatoryGroup(context, this.updateSignatorySuccess.bind(this), this.updateSignatoryFailure.bind(this));
    };
    /**
     * Method to update the Signatory group
     * @param {Object} response - contains the response from the service.
     */
    SettingsNew_PresentationController.prototype.updateSignatorySuccess = function(response) {
      var input = {
			"signatoryGroupId" : response.signatoryGroupId
		};
        
		applicationManager.getSettingsManager().getSignatoryGroupDetails(input,this.getSignatoryGroupDetailsSuccess.bind(this),this.getSignatoryGroupDetailsFailue.bind(this) );
        applicationManager.getNavigationManager().updateForm({
            updateSignatorySucess: response
        }, "frmViewManageSignatoryGroup");
            applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');

    };
    /**
     * Method used as the failure call back for update Signatory group.
     * @param {String} viewModel - Data required to update Signatory group
     */
    SettingsNew_PresentationController.prototype.updateSignatoryFailure = function(response) {
      applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');
      applicationManager.getNavigationManager().updateForm({
            updateSignatoryFailure: response.serverErrorRes,
        }, "frmViewManageSignatoryGroup");
    };

      SettingsNew_PresentationController.prototype.updateSignatoryGroupdetailsFromAddUsers = function(context) {
      applicationManager.getSettingsManager().updateSignatoryGroup(context, this.updateSignatoryGroupdetailsFromAddUsersSuccess.bind(this), this.updateSignatoryGroupdetailsFromAddUsersFailure.bind(this));
    };
    /**
     * Method to update the Signatory group
     * @param {Object} response - contains the response from the service.
     */
    SettingsNew_PresentationController.prototype.updateSignatoryGroupdetailsFromAddUsersSuccess = function(response) {
      var input = {
			"signatoryGroupId" : response.signatoryGroupId
		};
        
		applicationManager.getSettingsManager().getSignatoryGroupDetails(input,this.getSignatoryGroupDetailsSuccess.bind(this),this.getSignatoryGroupDetailsFailue.bind(this) );
        applicationManager.getNavigationManager().updateForm({
            updateSignatorySucessFromAddUsers: response
        }, "frmViewManageSignatoryGroup");
            applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');

    };
    /**
     * Method used as the failure call back for update Signatory group.
     * @param {String} viewModel - Data required to update Signatory group
     */
    SettingsNew_PresentationController.prototype.updateSignatoryGroupdetailsFromAddUsersFailure = function(response) {
      applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');
      applicationManager.getNavigationManager().updateForm({
            updateSignatoryFailureFromAddUsers: response.serverErrorRes,
        }, "frmViewManageSignatoryGroup");
    };

  
  SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsers = function(payLoad){
    applicationManager.getSettingsManager().getEligibleSignatoryUsers(payLoad,this.fetchEligibleSignatoryUsersSuccess.bind(this), this.fetchEligibleSignatoryUsersFailure.bind(this));
   };
    /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsersSuccess = function(response) {
    applicationManager.getNavigationManager().updateForm({
      "eligibleSignatoryGroups": response
    }, 'frmCreateSignatoryGroup');
  };
   /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsersFailure = function(errorMessage) {
        
    };
  
  SettingsNew_PresentationController.prototype.createSignatoryGroup = function(payLoad){
    applicationManager.getSettingsManager().createSignatoryGroup(payLoad,this.createSignatoryGroupSuccess.bind(this), this.createSignatoryGroupFailure.bind(this));
  };
  /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.createSignatoryGroupSuccess = function(response) {
    applicationManager.getNavigationManager().updateForm({
      "createSignatoryGroup": response
    }, 'frmCreateSignatoryGroupVerifyAndConfirm');
  };
  /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.createSignatoryGroupFailure = function(errorMessage) {
    var error = errorMessage;

  };
  
  
   SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsersForAddUSers = function(payLoad){
       applicationManager.getNavigationManager().navigateTo('frmAddUsers');
    applicationManager.getSettingsManager().getEligibleSignatoryUsers(payLoad,this.fetchEligibleSignatoryUsersForAddUSersSuccess.bind(this), this.fetchEligibleSignatoryUsersForAddUSersFailure.bind(this));
   };
    /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsersForAddUSersSuccess = function(response) {
    applicationManager.getNavigationManager().updateForm({
      "eligibleSignatoryGroups": response
    }, 'frmAddUsers');
  };
   /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
    SettingsNew_PresentationController.prototype.fetchEligibleSignatoryUsersForAddUSersFailure = function(errorMessage) {
        
    };
  
  
  SettingsNew_PresentationController.prototype.checkSigGrpAvailability = function(payLoad){
    applicationManager.getSettingsManager().checkSigGrpAvailability(payLoad,this.checkSigGrpAvailabilitySuccess.bind(this), this.checkSigGrpAvailabilityFailure.bind(this));
  };
  /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.checkSigGrpAvailabilitySuccess = function(response) {
    if (kony.application.getCurrentForm().id === "frmViewManageSignatoryGroup") {
      applicationManager.getNavigationManager().updateForm({
        "checkSigGrpAvailability": response
      }, 'frmViewManageSignatoryGroup');
      applicationManager.getNavigationManager().navigateTo("frmViewManageSignatoryGroup");
    }
    applicationManager.getNavigationManager().updateForm({
      "checkSigGrpAvailability": response
    }, 'frmCreateSignatoryGroup');
  };
  /**
     * Method used as failure call back for the add new address.
     * @param {String} errorMessage - contains the error message of the service call.
     */
  SettingsNew_PresentationController.prototype.checkSigGrpAvailabilityFailure = function(errorMessage) {

  };
  	 SettingsNew_PresentationController.prototype.isSignatoryGroupEligibleForDelete = function(input) {
		         var signatoryId = {
            "signatoryGroupId": input
        };
		applicationManager.getSettingsManager().isSignatoryGroupEligibleForDelete(signatoryId, this.isSignatoryGroupEligibleForDeleteSuccess.bind(this), this.isSignatoryGroupEligibleForDeleteFailure.bind(this));
	 };
	  SettingsNew_PresentationController.prototype.isSignatoryGroupEligibleForDeleteSuccess = function(res) {
		   applicationManager.getNavigationManager().updateForm({
            deleteSignatoryGroup : {
                "data": res,
                // "contractFilter": contractFilterData
            },
            "isLoading": true
        }, 'frmViewManageSignatoryGroup');
	  };
	   SettingsNew_PresentationController.prototype.isSignatoryGroupEligibleForDeleteFailure = function(res) {};
    SettingsNew_PresentationController.prototype.deleteSignatoryGroup = function(input) {
		 var data = {
            "signatoryGroupId": input
        };
		applicationManager.getSettingsManager().deleteSignatoryGroup(data, this.deleteSignatoryGroupSuccess.bind(this), this.deleteSignatoryGroupFailue.bind(this));
      
    };
	 SettingsNew_PresentationController.prototype.deleteSignatoryGroupSuccess = function(response) {
       applicationManager.getNavigationManager().updateForm({
            deleteSignatoryDetails: {
                "data": response,
                // "contractFilter": contractFilterData
            },
            "isLoading": true
        }, 'frmViewApprovalsMatrix');
     };
	  SettingsNew_PresentationController.prototype.deleteSignatoryGroupFailue = function(response) {
        
      };
   SettingsNew_PresentationController.prototype.getUserApprovalPermissions = function(input,segData) {
        var data = {
            "userId": input.userId ,
			"userName" : input.userName
			
        };
      applicationManager.getNavigationManager().navigateTo("frmViewPermissionSignatoryGroups");
        applicationManager.getSettingsManager().getUserApprovalPermissions(data, this.getUserApprovalPermissionsSuccess.bind(this,segData), this.getUserApprovalPermissionsFailue.bind(this,segData));
    };
	 SettingsNew_PresentationController.prototype.getUserApprovalPermissionsSuccess = function(segData,response) {
        applicationManager.getNavigationManager().updateForm({
            "featureDetails": {
                "data": response,
                "segData" :segData
                // "contractFilter": contractFilterData
            },
            "isLoading": true
        }, 'frmViewPermissionSignatoryGroups');
     };
	  SettingsNew_PresentationController.prototype.getUserApprovalPermissionsFailue = function(segData,response) {};
  
     /**
     * Method to update the signatory group with remove users
     * @param {Object} group - contains the group details.
     */
    SettingsNew_PresentationController.prototype.removeUsers = function(context) {
      applicationManager.getSettingsManager().updateSignatoryGroup(context, this.removeUsersSuccess.bind(this), this.removeUsersFailure.bind(this));
    };
    /**
     * Method to update the Signatory group with remove users
     * @param {Object} response - contains the response from the service.
     */
    SettingsNew_PresentationController.prototype.removeUsersSuccess = function(response) {
      var input = {
			"signatoryGroupId" : response.signatoryGroupId
		};
        
		applicationManager.getSettingsManager().getSignatoryGroupDetails(input,this.getSignatoryGroupDetailsSuccess.bind(this),this.getSignatoryGroupDetailsFailue.bind(this) );
        applicationManager.getNavigationManager().updateForm({
           removeUsersSuccess: response
        }, "frmViewManageSignatoryGroup");
       applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');
    };
    /**
     * Method used as the failure call back for update Signatory group with remove users.
     * @param {String} viewModel - Data required to update Signatory group
     */
    SettingsNew_PresentationController.prototype.removeUsersFailure = function(response) {
      applicationManager.getNavigationManager().navigateTo('frmViewManageSignatoryGroup');
      applicationManager.getNavigationManager().updateForm({
            removeUsersFailure: response.serverErrorRes,
        }, "frmViewManageSignatoryGroup");
    };
 
  

    /********************************************************************** */

  /**
     * Method for fetch approval mode service call
     * @param {Object} rowData - contains the  data
     * @param {Object} i - contains the index of rowdata
     */
  SettingsNew_PresentationController.prototype.fetchApprovalMode = function(rowData,i){
    var request = {
      "coreCustomerId" : rowData.coreCustomerID,
      "contractId" : rowData.contractId
    };
    applicationManager.getBusinessUserManager().fetchApprovalMode(request, this.onFetchApprovalModeSuccess.bind(this, rowData,i,this.updatedCoreContracts),
                                                                    this.onFetchApprovalModeFailure.bind(this, rowData));
  };
/**
     * Method for fetch approval mode success service call
     * @param {Object} rowData - contains the  data
     * @param {Object} i - contains the index of rowdata
     * @param {Object} response - contains the service success call
     */
  SettingsNew_PresentationController.prototype.onFetchApprovalModeSuccess = function(rowData,i,backup, response){
    this.updatedCoreContracts = backup;
     this.updatedCoreContracts.push(rowData);
	if(response.isGroupLevel)
      {
        this.updatedCoreContracts[i].AppgroupName = "Signatory Group";
        this.updatedCoreContracts[i].isSignatoryGroup = true;
      }
    else
      {
        this.updatedCoreContracts[i].AppgroupName = "User";
        this.updatedCoreContracts[i].isSignatoryGroup = false;
      }
    this.checkApprovalMatrixStatus(rowData,i);
  };
  SettingsNew_PresentationController.prototype.onFetchApprovalModeFailure = function(rowData,i, response){
   this.updatedCoreContracts.push(rowData);
	    this.updatedCoreContracts[i].AppgroupName = "N/A";
    kony.application.dismissLoadingScreen();
    this.updatedCoreContracts[i].isSignatoryGroup = false;
    this.checkApprovalMatrixStatus(rowData,i);
  };
   /**
     * Method for update approval matrix success service call
     * @param {Object} contracts - contains the  data
     * @param {Object} isDisabled - contains the disability of approval matrix
     */
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatusSGNew = function(contracts, isDisabled ,context){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var request = {
      "contractId" : contracts.contractId,
      "cif" : contracts.coreCustomerID,
      "disable" : isDisabled
    };
    applicationManager.getBusinessUserManager().updateApprovalMatrixStatus(request, this.updateApprovalMatrixStatusSuccessSGNew.bind(this, contracts,context), this.updateApprovalMatrixStatusFailureSGNew.bind(this, contracts,context));
  };
   /**
     * Method for update approval matrix success service call
     * @param {Object} rowData - contains the segment data
     * @param {Object} i - contains the index value of data
     * @param {Object} response - contains the service success call
     */
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatusSuccessSGNew = function(rowData,context, response){
    if(response.isDisabled === "true")
    {
      rowData.onOffMatrixEnabled = {
        "src" : "inactive_btn.png",
        "cursorType" : "Pointer"
      };
      rowData.isDisabledMatrix = true;
    }
    else
    {
      rowData.onOffMatrixEnabled = {
        "src" : "active_btn.png",
        "cursorType" : "Pointer"
      };
      rowData.isDisabledMatrix = false;
    }
    var controller = _kony.mvc.GetController("frmApprovalmatrix", true);
	controller.updateSegmentData(rowData,context);
    kony.application.dismissLoadingScreen();
  };
   /**
     * Method for update approval matrix service call
     * @param {Object} rowData - contains the segment data
     * @param {Object} i - contains the index value of data
     */
  SettingsNew_PresentationController.prototype.updateApprovalMatrixStatusFailureSGNew = function(rowData,context, response){
    kony.application.dismissLoadingScreen();
  };
  /**
     * Method for approval matrix service call
     * @param {Object} rowData - contains the segment data
     * @param {Object} i - contains the index value of data
     */
  SettingsNew_PresentationController.prototype.checkApprovalMatrixStatus = function(rowData,i){
    var request = {
      "contractId" : rowData.contractId,
      "cif" : rowData.coreCustomerID
    };
    applicationManager.getBusinessUserManager().isApprovalMatrixDisabled(request, this.checkApprovalMatSuccess.bind(this, rowData,i), this.checkApprovalMatFailures.bind(this, rowData,i));
  };
  /**
     * Method for the approval mat service success call
     * @param {Object} rowData - contains the segment data
     * @param {Object} i - contains the index value of data
     * @param {Object} response - contains the response of service call
     */
   SettingsNew_PresentationController.prototype.checkApprovalMatSuccess = function(rowData,i, response){
	if(response.isDisabled === "true")
      {
        this.updatedCoreContracts[i].onOffMatrixEnabled = {
          "src" : "inactive_btn.png",
          "cursorType" : "Pointer"
        };
        this.updatedCoreContracts[i].isDisabledMatrix = true;
      }
    else
      {
        this.updatedCoreContracts[i].onOffMatrixEnabled = {
          "src" : "active_btn.png",
          "cursorType" : "Pointer"
        };
        this.updatedCoreContracts[i].isDisabledMatrix = false;
      }
     ++i;
     var contractsDatas = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
     this.updatedCoreContracts = this.updateContracts(i);
     if(contractsDatas.length === this.updatedCoreContracts.length){
       this.updateFrmApprovalMatrixUI();
     }
  };
  /**
     * Method for failure service call
     * @param {Object} rowData - contains the segment data
     * @param {Object} i - contains index value of data
     */
  SettingsNew_PresentationController.prototype.checkApprovalMatFailures = function(rowData,i, response){
        this.updatedCoreContracts[i].onOffMatrixEnabled = "N/A";
    kony.application.dismissLoadingScreen();
     ++i;
    var contractsDatas = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
    if(contractsDatas.length === this.updatedCoreContracts.length){
       this.updateFrmApprovalMatrixUI();
     }
     this.updatedCoreContracts = this.updateContracts(i);
     
  };
  SettingsNew_PresentationController.prototype.updateFrmApprovalMatrixUI = function(){
    kony.application.dismissLoadingScreen();
    var contracts = JSON.parse(JSON.stringify(this.updatedCoreContracts));
    var contractFilterData = this.getContractsList(contracts);
      applicationManager.getNavigationManager().navigateTo("frmApprovalmatrix");
      if(contracts.length > 0){
        applicationManager.getNavigationManager().updateForm({
          approvalMatrixContractDetails: {
            "contractDetails" : contracts,
            "contractFilter" : contractFilterData
          },
          "isLoading" : true
        }, 'frmApprovalmatrix');
      }
      else{
        this.aprovalMatrixServiceFailure({"entryPoint" : "frmApprovalmatrix"}, {
          "errorMessage" : "No Core Customers are available", // adding a custom message for dev purpose 
          "isContractsEmpty" : true
        })
      }
  };
  /**
     * Method to return the selected filter data
     * @param {Object} segmentData - contains the segment data
     * @param {Object} filterValue - contains the filterValues
     */
  SettingsNew_PresentationController.prototype.applyFilterSegmentData = function(segmentData,filterValue){
    var data = [];
    data[0] = [];data[0].push(segmentData[0][0]);
    data[0][1] = [];
    if(filterValue === "")
      return segmentData;
    filterValue = filterValue.toLocaleLowerCase();
    
    for(var i=0;i<segmentData[0][1].length;i++)
	{
      if(filterValue.split(',').some(item => Object.values(segmentData[0][1][i]).toString().toLocaleLowerCase().includes(item)))
        {
          data[0][1].push(segmentData[0][1][i]);
        }
    }
    return data;
  };    
  
  SettingsNew_PresentationController.prototype.fetchAllSignatoryGroups = function(request) {
    //var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
   // var contracts = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers;
    //  applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
    //  applicationManager.getNavigationManager().navigateTo("frmViewApprovalsMatrix");
    applicationManager.getNavigationManager().updateForm({
      "isLoading": true
    }, 'frmViewApprovalSignatoryMatrix');
    var input = {
      "contractId": request.contractId ,
      "coreCustomerId" : request.coreCustomerID,
    };

    applicationManager.getSettingsManager().getAllSignatoryGroups(input,this.getAllSignatoryGroupData.bind(this,request),this.getAllSignatoryGroupsFailue.bind(this) );
  };
    
  SettingsNew_PresentationController.prototype.getAllSignatoryGroupData = function(request,response){
   
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("AllSignatoryGroups",response);
     var controller = _kony.mvc.GetController("frmApprovalmatrix", true);
      controller.navigateToViewApprovalMatrix(request);
    
  };
  
  SettingsNew_PresentationController.prototype.updateApprovalMatrixSG = function(data) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var request = {};
    request["actionId"] = data.actionId;
    request["limitTypeId"] = data.limitTypeId;
    request["cif"] = data.cif;
    request["contractId"] = data.contractId;
    if(!kony.sdk.isNullOrUndefined(data.accountId)){
      request["accountId"] = data.accountId;
    }
    request["isGroupMatrix"] = "1";
    request["limits"] = data.limits;
    applicationManager.getBusinessUserManager().updateApprovalMatrixPerFeatureAction(request,this.updateApprovalMatrixSuccessSG.bind(this,data.limitTypeId),this.updateApprovalMatrixFailureSG.bind(this,data.limitTypeId));
  };

  SettingsNew_PresentationController.prototype.updateApprovalMatrixSuccessSG = function(limitTypeId,response) {
    if(limitTypeId==="NON_MONETARY_LIMIT"){
      var controller = _kony.mvc.GetController("frmSignatoryNonMonetaryConditions", true);
      controller.navigateToApprovalMatrix();
      
    }
    else{
      var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
      controller.updateApprovalMatrixSuccessCallback(response);
      kony.application.dismissLoadingScreen();
    }
  };

  SettingsNew_PresentationController.prototype.updateApprovalMatrixFailureSG = function(limitTypeId,response) {
    if(limitTypeId==="NON_MONETARY_LIMIT"){
      var controller = _kony.mvc.GetController("frmSignatoryNonMonetaryConditions", true);
      controller.showErrorMessage();
      applicationManager.getNavigationManager().navigateTo("frmSignatoryNonMonetaryConditions")
      kony.application.dismissLoadingScreen();
    }else{
    var controller = _kony.mvc.GetController("frmAddRulesSignatoryGrp", true);
    controller.updateApprovalMatrixFailureCallback(response);  
    kony.application.dismissLoadingScreen();
    }
  };
   SettingsNew_PresentationController.prototype.showOnServerError = function() {
        CommonUtilities.showServerDownScreen();
    };
    SettingsNew_PresentationController.prototype.fetchAccounts = function(userName) {
        var self = this;

        function completionCallback(accountsData) {
            this.accounts = accountsData;
           
        }
        this.isAccountsLoading = true;
        applicationManager.getAccountManager().fetchInternalAccounts(completionCallback.bind(this), this.showOnServerError.bind(this));

    };
  SettingsNew_PresentationController.prototype.fetchAlertsCategoryNew = function(entryPoint, accountID) {
    var navManager = applicationManager.getNavigationManager();
    var userFlow =  navManager.getCustomInfo('userFlow');
    if(userFlow != 'userFlow'){
    var self = this;
    var configurationManager = applicationManager.getConfigurationManager();
    var servicesToCallInAsync = [];
    var asyncManager = applicationManager.getAsyncManager()
    if (applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT")) 
      servicesToCallInAsync.push(asyncManager.asyncItem(applicationManager.getAlertsManager(), 'fetchAlertsCategory'));
    if (servicesToCallInAsync.length > 0)	
      asyncManager.callAsync(servicesToCallInAsync,self.onFetchCallCompleteNew.bind(self,entryPoint,accountID));
    else self.fetchAlertsCategoryNewSuccess(entryPoint, null, null, accountID);
    }
  };
  SettingsNew_PresentationController.prototype.onFetchCallCompleteNew = function(entryPoint, accountID, syncResponseObject) {      
    var alertPermission = applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT");
    var scopeObj = this;
    var allServicesPassed;  
    allServicesPassed = syncResponseObject.responses[0].isSuccess;
    if (allServicesPassed) { 
      if (alertPermission) {
        scopeObj.fetchAlertsCategoryNewSuccess(entryPoint, syncResponseObject.responses[0].data, null, accountID);
      } else {
        scopeObj.fetchAlertsCategoryNewSuccess(entryPoint, null, null, accountID);
      }
    }
  };
  SettingsNew_PresentationController.prototype.fetchAlertsCategoryNewSuccess = function(entryPoint, response, companyAccounts, accountID) {
    var scopeObj = this;
    if (kony.sdk.isNullOrUndefined(companyAccounts)) {
      companyAccounts = [];
    }
    if (response) {
      scopeObj.setAlertsCategoryResponse(response);
    }
  };
    return SettingsNew_PresentationController;
});