define(['OLBConstants', 'CommonUtilities'], function(OLBConstants, CommonUtilities) {
  var userCreationFlowType;  
  function BusinessBankingPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }
    inheritsFrom(BusinessBankingPresentationController, kony.mvc.Presentation.BasePresenter);

    BusinessBankingPresentationController.prototype.getUserManagementData = function() {
        return JSON.parse(JSON.stringify(this.userManagementData));
    };
    BusinessBankingPresentationController.prototype.setUserManagementData = function(data) {
        this.userManagementData = JSON.parse(JSON.stringify(data));
      applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };
	BusinessBankingPresentationController.prototype.getTransactionLimitsData = function() {
        return JSON.parse(JSON.stringify(this.transactionLimitsData));
    };
    BusinessBankingPresentationController.prototype.setTransactionLimitsData = function(data) {
        this.transactionLimitsData = JSON.parse(JSON.stringify(data));
        applicationManager.getConfigurationManager().enableCreateFlag = true;
    };
    BusinessBankingPresentationController.prototype.setAccountLevelPermissions = function(data) {
        this.userManagementData.accountLevelPermissions = JSON.parse(JSON.stringify(data));
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };
    BusinessBankingPresentationController.prototype.getAccountLevelPermissions = function(data) {
        return JSON.parse(JSON.stringify(this.userManagementData.accountLevelPermissions));
    };
    BusinessBankingPresentationController.prototype.getUserDetails = function() {
        return JSON.parse(JSON.stringify(this.userManagementData.userDetails));
    };
    BusinessBankingPresentationController.prototype.getFeaturePermissionsFromUserManagement = function(companyId, accountId) {
        let jpath = "accountLevelPermissions,cif=" + companyId + ",accounts,accountId=" + accountId;
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.userManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.setFeaturePermissionsFromUserManagement = function(companyId, accountId, data) {
        let jpath = "accountLevelPermissions,cif=" + companyId + ",accounts,accountId=" + accountId;
        data = JSON.parse(JSON.stringify(data));
        CommonUtilities.updateObjectFromPath(this.userManagementData, jpath, data);
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };

    BusinessBankingPresentationController.prototype.getAccountLevelPermissionsByCompany = function(companyId) {
        let jpath = "accountLevelPermissions,cif=" + companyId;
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.userManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.setAccountLevelPermissionsByCompany = function(companyId, data) {
        let jpath = "accountLevelPermissions,cif=" + companyId;
        data = JSON.parse(JSON.stringify(data));
        CommonUtilities.updateObjectFromPath(this.userManagementData, jpath, data);
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };
    BusinessBankingPresentationController.prototype.getAccountLevelPermissionsInitByCompany = function(companyId) {
        let jpath = "accountLevelPermissions,cif=" + companyId;
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.initUserManagementData, jpath)));
        return data;
    };

    BusinessBankingPresentationController.prototype.getGlobalLevelPermissionsFromUserManagement = function() {
        let jpath = "globalLevelPermissions";
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.userManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.setGlobalLevelPermissionsFromUserManagement = function(data) {
        let jpath = "globalLevelPermissions";
        data = JSON.parse(JSON.stringify(data));
        CommonUtilities.updateObjectFromPath(this.userManagementData, jpath, data);
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };
    BusinessBankingPresentationController.prototype.getTransactionLimitsFromUserManagement = function() {
        let jpath = "transactionLimits";
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.userManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.setTransactionLimitsFromUserManagement = function(data) {
        let jpath = "transactionLimits";
        data = JSON.parse(JSON.stringify(data));
        CommonUtilities.updateObjectFromPath(this.userManagementData, jpath, data);
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };
    BusinessBankingPresentationController.prototype.getInitUserManagementData = function() {
        return JSON.parse(JSON.stringify(this.initUserManagementData));
    };
    BusinessBankingPresentationController.prototype.getInitAccountLevelPermissions = function() {
        return JSON.parse(JSON.stringify(this.initUserManagementData.accountLevelPermissions));
    };
    BusinessBankingPresentationController.prototype.getFeaturePermissionsFromInitUserManagement = function(companyId, accountId) {
        let jpath = "accountLevelPermissions,cif=" + companyId + ",accounts,accountId=" + accountId;
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.initUserManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.getGlobalLevelPermissionsFromInitUserManagement = function() {
        let jpath = "globalLevelPermissions";
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.initUserManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.getTransactionLimitsFromInitUserManagement = function() {
        let jpath = "transactionLimits";
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.initUserManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.getGlobalLevelPermissionsFromInitUserManagement = function(cif) {
        let jpath = "globalLevelPermissions,cif=" + cif;
        let data = JSON.parse(JSON.stringify(CommonUtilities.getObjectFromPath(this.initUserManagementData, jpath)));
        return data;
    };
    BusinessBankingPresentationController.prototype.initializePresentationController = function() {
        this.navManager = applicationManager.getNavigationManager();
        this.frmUserManagementForm = "frmUserManagement";
        this.frmBBUsersDashboardForm = "frmBBUsersDashboard";
        this.frmPermissionsTemplateForm = "frmPermissionsTemplate";
        this.frmBBCreateCustomRole = "frmBBCreateCustomRole";
        this.frmCreateUserManually = "frmCreateUserManually";
        this.userManagementFlowType = "";
        this.userManagementFlow = "";
        this.userCreationFlow = "";
        this.userPermissionFlow = '';
        this.userNavigationType = '';
        this.selectedContractId = "";
        this.selectedContractName = "";
        this.userObject = {};
        this.customRoleName = "";
        this.isEditFlow = false;
        this.userManagementData = {};
		this.transactionLimitsData = {};
        this.initUserManagementData = {};
        this.orgGroupFeatures = {};
        this.businessUserManager = applicationManager.getBusinessUserManager();
        this.authManager = applicationManager.getAuthManager();
        this.formatUtil = applicationManager.getFormatUtilManager();
        this.defaultSortConfig = {
            'sortBy': 'createdts',
            'order': OLBConstants.DESCENDING_KEY,
            'offset': OLBConstants.DEFAULT_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
    };
    /**
     * Entry Method for business banking module
     * @param {object} context - context object for
     */
    BusinessBankingPresentationController.prototype.showUserManagent = function(context) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('userFlow','userFlow');
        switch (context.show) {
            case "createNewUser":
                this.showCreateUser();
                break;
            case "creatUMUser": {
                this.initializeFlowConfigs("createUser");
                navManager.setCustomInfo('addToEntityFlow',undefined);
				var appName = _kony.mvc.getCurrentAppName();
				if(appName === "UserManagementMA")
					applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
				else
					applicationManager.getNavigationManager().navigateTo({"appName": "UserManagementMA","friendlyName": 		 "BusinessBankingUIModule/frmCreateUserManually"
					});
                break;
            }
          case "addToEntity": {
            this.initializeFlowConfigs("addToEntity");
                navManager.setCustomInfo('addToEntityFlow',"addToEntity");
				var appName = _kony.mvc.getCurrentAppName();
				if(appName === "UserManagementMA")
					applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
				else
					applicationManager.getNavigationManager().navigateTo({"appName": "UserManagementMA","friendlyName": 		 "BusinessBankingUIModule/frmCreateUserManually"
					});
                break;
          }
            case "showAllUsers": {
              this.getLegalEntities(this.getLegalEntitiesSuccess.bind(this));
                this.fetchAssociatedContractUsers(this.fetchAssociatedContractUsersSuccess.bind(this));
                break;
            }
            case "createNewCustomRole":
                this.initializeFlowConfigs("createRole");
                this.showCreateCustomRole("", "", context.userObject);
                break;
            case "showUserRoles":
                this.navigateToUserRoles();
                break;
            default:
                //no context.
        }
    };
    BusinessBankingPresentationController.prototype.viewEditUserPermissions = function(id) {
        this.initializeFlowConfigs("editUser");
        this.viewInfinityUser(id);
    };
		BusinessBankingPresentationController.prototype.viewEditRole = function(id) {
		this.initializeFlowConfigs("editRole");
		this.businessUserManager.getDetailsOfCustomRole({"id":id}, this.viewCustomRoleDetailsSuccess.bind(this), this.viewCustomRoleDetailsFailure.bind(this));
    };
	/** Method to handle success response of getCustomRoleDetails
     */
	 BusinessBankingPresentationController.prototype.viewCustomRoleDetailsSuccess = function(userData) {
        this.userManagementData = userData;
        this.userManagementData.companyList.forEach((eachCompany) => {
			let flag = false;
			eachCompany.accounts.forEach(account=>{
				if(account.hasOwnProperty("isEnabled"))flag = flag || account.isEnabled.toString() === 'true';
			});
            eachCompany.isEnabled = flag;
        });
		if (Array.isArray(this.userManagementData.customRoleDetails)) this.userManagementData.customRoleDetails = this.userManagementData.customRoleDetails[0];
        //this.generateTransactionLimits(JSON.parse(JSON.stringify(this.userManagementData.accountLevelPermissions)));
        this.sortUserManagementData();
        this.initUserManagementData = JSON.parse(JSON.stringify(this.userManagementData));
        this.navManager.updateForm({
            'viewCustomRoleDetailsSuccess': this.userManagementData,
            'progressBar': false
        });
    };
    /** Method to handle failure response of getCustomRoleDetails
     */
    BusinessBankingPresentationController.prototype.viewCustomRoleDetailsFailure = function(errmsg) {
        this.navManager.updateForm({
            "viewCustomRoleDetailsFailure": errmsg,
            "progressBar": false
        });
    };
    BusinessBankingPresentationController.prototype.getUserManagementFlow = function() {
        return this.userManagementFlow;
    };
    BusinessBankingPresentationController.prototype.setUserManagementFlow = function(userManagementFlow) {
        this.userManagementFlow = userManagementFlow;
    };
    BusinessBankingPresentationController.prototype.getUserCreationFlow = function() {
        return this.userCreationFlow;
    };
    BusinessBankingPresentationController.prototype.setUserCreationFlow = function(userCreationFlow) {
        this.userCreationFlow = userCreationFlow;
        var userCreationFlowType = userCreationFlow;
    };
    BusinessBankingPresentationController.prototype.getIsEditFlow = function() {
        return this.isEditFlow;
    };
    BusinessBankingPresentationController.prototype.setIsEditFlow = function(flag) {
        this.isEditFlow = flag;
    };
    BusinessBankingPresentationController.prototype.setCustomRoleData = function(roleData) {
        this.roleData = roleData;
    };
    BusinessBankingPresentationController.prototype.getUserPermissionFlow = function() {
        return this.userPermissionFlow;
    };
    BusinessBankingPresentationController.prototype.setUserPermissionFlow = function(userPermissionFlow) {
        this.userPermissionFlow = userPermissionFlow;
    };
    BusinessBankingPresentationController.prototype.getUserNavigationType = function() {
        return this.userNavigationType;
    };
    BusinessBankingPresentationController.prototype.setUserNavigationType = function(userNavigationType) {
        this.userNavigationType = userNavigationType;
    };
    BusinessBankingPresentationController.prototype.getFlowConfigs = function() {
        return {
            "userManagementFlow": this.userManagementFlow,
            "userCreationFlow": ((this.userCreationFlow === "") ? userCreationFlowType : this.userCreationFlow),
            "userPermissionFlow": this.userPermissionFlow,
            "userNavigationType": this.userNavigationType
        };
    };
    BusinessBankingPresentationController.prototype.initializeFlowConfigs = function(mode) {
        switch (mode) {

            case 'createUser':
                this.userManagementFlow = OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION;
                this.userNavigationType = OLBConstants.USER_MANAGEMENT_TYPE.CREATE;
                this.userPermissionFlow = '';
                this.userCreationFlow = '';
                this.isEditFlow = false;
                this.selectedContractId = "";
				this.selectedContractName = "";
                this.userObject = {};
                this.customRoleName = "";
                this.isEditFlow = false;
                this.loggedInUserData = {};
                this.userManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                this.initUserManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                break;
            case 'addToEntity':
                this.userManagementFlow = OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION;
                this.userNavigationType = OLBConstants.USER_MANAGEMENT_TYPE.CREATE;
                this.userPermissionFlow = '';
                this.userCreationFlow = '';
                this.isEditFlow = false;
                this.selectedContractId = "";
				this.selectedContractName = "";
                this.userObject = {};
                this.customRoleName = "";
                this.isEditFlow = false;
                this.loggedInUserData = {};
                this.userManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                this.initUserManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                break;
            case 'editUser':
                this.userManagementFlow = OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION;
                this.userNavigationType = OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT;
                this.userPermissionFlow = '';
                this.userCreationFlow = '';
                this.isEditFlow = false;
                this.selectedContractId = "";
				this.selectedContractName = "";
                this.userObject = {};
                this.customRoleName = "";
                this.loggedInUserData = {};
                this.userManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                this.initUserManagementData = {
                    'userDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                break;
            case 'createRole':
                this.userManagementFlow = OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE;
                this.userNavigationType = OLBConstants.USER_MANAGEMENT_TYPE.CREATE;
                this.userPermissionFlow = '';
                this.userCreationFlow = '';
                this.isEditFlow = false;
                this.selectedContractId = "";
				this.selectedContractName = "";
                this.userObject = {};
                this.customRoleName = "";
                this.loggedInUserData = {};
                this.userManagementData = {
                    'customRoleDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                this.initUserManagementData = {
                    'customRoleDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                break;
            case 'editRole':
                this.userManagementFlow = OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE;
                this.userNavigationType = OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT;
                this.userPermissionFlow = '';
                this.userCreationFlow = '';
                this.isEditFlow = false;
                this.selectedContractId = "";
				this.selectedContractName = "";
                this.userObject = {};
                this.customRoleName = "";
                this.loggedInUserData = {};
                this.userManagementData = {
                    'customRoleDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                this.initUserManagementData = {
                    'customRoleDetails': {},
                    'companyList': [],
                    'accountLevelPermissions': [],
                    'globalLevelPermissions': [],
                    'transactionLimits': []
                };
                break;
            default:
                break;
        }
    };
    BusinessBankingPresentationController.prototype.navigateToUMDashboard = function(flag) {
        applicationManager.getNavigationManager().navigateTo("frmBBUsersDashboard");
    };
    BusinessBankingPresentationController.prototype.navigateToConfirmationScreen = function(flag) {
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
    };



    /**
     * Method to navigate user roles dashboard.
     */
    BusinessBankingPresentationController.prototype.navigateToUserRoles = function() {
        var appName = _kony.mvc.getCurrentAppName();
		if(appName === "UserManagementMA")
			applicationManager.getNavigationManager().navigateTo("frmBBUsersDashboard");
        else
			applicationManager.getNavigationManager().navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/frmBBUsersDashboard"});
        applicationManager.getNavigationManager().updateForm({
            progressBar: true
        });
        applicationManager.getNavigationManager().updateForm({
            "showRolesDashboard": true,
        }, this.frmBBUsersDashboardForm);
    };


    BusinessBankingPresentationController.prototype.navigateToManagePermissions = function(customRoleID, parentRoleID, completionCallback = this.navigateToManagePermissionsSuccess.bind(this), failureCallback = this.navigateToManagePermissionsFailure.bind(this), formName = this.frmPermissionsTemplateForm) {
        this.navManager.updateForm({
            progressBar: true
        });
        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getBusinessUserManager(), "getDetailsOfCustomRole", [{
                    "customRoleId": customRoleID
                }]),
                asyncManager.asyncItem(applicationManager.getBusinessUserManager(), "getUserRoleActions", [{
                    "groupId": parentRoleID
                }])
            ], completionCallback.bind(this, formName, failureCallback));

    };


    BusinessBankingPresentationController.prototype.fetchExistingCustomRoleDetailsSuccess = function(formName, failureCallback, asyncResponse) {
        if (asyncResponse.isAllSuccess()) {
            var customRoleObject = asyncResponse.responses[0].data;
            this.businessUserManager.createCustomRoleObject();
            this.businessUserManager.setCustomRoleAttribute("customRoleName", customRoleObject.CustomRoleName);
            this.businessUserManager.setCustomRoleAttribute("Group_Name", customRoleObject.ParentRole);
            this.businessUserManager.setCustomRoleAttribute("Group_id", customRoleObject.ParentRoleId);
            this.businessUserManager.setCustomRoleAttribute("accounts", customRoleObject.accounts);
            this.businessUserManager.setCustomRoleAttribute("Role_id", customRoleObject.id);
            this.businessUserManager.setCustomRoleAttribute("isExistingUserSelected", true);
            this.businessUserManager.setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);
            this.businessUserManager.setCustomRoleAttribute("SelectedRoleId", customRoleObject.ParentRoleId);
            this.businessUserManager.setCustomRoleAttribute("defaultOrexistingRoleSelected", true);

            customRoleObject["defaultLimitsForSelectedRole"] = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions) || [];

            if (kony.application.getCurrentForm().id !== formName) {
                applicationManager.getNavigationManager().navigateTo(this.frmPermissionsTemplateForm);
            }
            applicationManager.getNavigationManager().updateForm({
                "selectedUser": customRoleObject,
                "progressBar": false
            }, formName);
        } else {
            var errorData = {};
            for (i = 0; i < 2; i++) {
                if (!asyncResponse.responses[i].isSuccess) {
                    errorData = asyncResponse.responses[i].data;
                }
            }
            failureCallback(errorData);
        }
    };

    BusinessBankingPresentationController.prototype.fetchExistingCustomRoleDetailsForUserCreationSuccess = function(formName, failureCallback, asyncResponse) {
        if (asyncResponse.isAllSuccess()) {
            var userObject = asyncResponse.responses[0].data;
            this.businessUserManager.createUserObject();
            this.businessUserManager.setUserAttribute("customRoleName", userObject.CustomRoleName);
            this.businessUserManager.setUserAttribute("Group_Name", userObject.ParentRole);
            this.businessUserManager.setUserAttribute("Group_id", userObject.ParentRoleId);
            this.businessUserManager.setUserAttribute("accounts", userObject.accounts);
            this.businessUserManager.setUserAttribute("Role_id", userObject.id);
            this.businessUserManager.setUserAttribute("isExistingUserSelected", true);
            this.businessUserManager.setUserAttribute("isPermissionsFromSelectedUserEdited", false);
            this.businessUserManager.setUserAttribute("SelectedRoleId", userObject.ParentRoleId);
            this.businessUserManager.setUserAttribute("defaultOrexistingRoleSelected", true);

            userObject["defaultLimitsForSelectedRole"] = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions) || [];

            if (kony.application.getCurrentForm().id !== formName) {
                applicationManager.getNavigationManager().navigateTo(formName);
            }
            applicationManager.getNavigationManager().updateForm({
                "selectedUser": userObject,
                "progressBar": false
            }, formName);
        } else {
            var errorData = {};
            for (i = 0; i < 2; i++) {
                if (!asyncResponse.responses[i].isSuccess) {
                    errorData = asyncResponse.responses[i].data;
                }
            }
            failureCallback(errorData);
        }
    };

    BusinessBankingPresentationController.prototype.fetchExistingCustomRoleDetailsFailureCallback = function(error) {
        this.navManager.updateForm({
            "errorData": error,
            "fetchUserDetailsFailure": true,
            "progressBar": false
        });
    };

    BusinessBankingPresentationController.prototype.navigateToManagePermissionsSuccess = function(formName, failureCallback, asyncResponse) {
        if (asyncResponse.isAllSuccess()) {
            var customRoleObject = asyncResponse.responses[0].data;
            this.businessUserManager.createCustomRoleObject();
            this.businessUserManager.setCustomRoleAttribute("id", customRoleObject.id);
            this.businessUserManager.setCustomRoleAttribute("customRoleName", customRoleObject.CustomRoleName);
            this.businessUserManager.setCustomRoleAttribute("Group_Name", customRoleObject.ParentRole);
            this.businessUserManager.setCustomRoleAttribute("Group_id", customRoleObject.ParentRoleId);
            this.businessUserManager.setCustomRoleAttribute("accounts", customRoleObject.accounts);
            this.businessUserManager.setCustomRoleAttribute("SelectedRoleId", customRoleObject.ParentRoleId);
            this.businessUserManager.setCustomRoleAttribute("postShowflag", 0);

            customRoleObject["defaultLimitsForSelectedRole"] = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions) || [];

            if (kony.application.getCurrentForm().id !== this.frmPermissionsTemplateForm) {
                applicationManager.getNavigationManager().navigateTo(this.frmPermissionsTemplateForm);
            }
            applicationManager.getNavigationManager().updateForm({
                "manageCustomRoleDetailsSuccess": customRoleObject,
                "progressBar": false
            }, this.frmPermissionsTemplateForm);

        } else {
            failureCallback();
        }

    };

    BusinessBankingPresentationController.prototype.navigateToManagePermissionsFailure = function(error) {
        this.navManager.updateForm({
            "serverError": true,
            "progressBar": false
        }, this.frmBBUsersDashboardForm);
    };

    /**
      * Method to call service to apply custom role to users.
      @param - json containing CustomRolename, CustomRoleId and list of users to apply custom role for.
     */
    BusinessBankingPresentationController.prototype.applyCustomRole = function(param) {
        this.businessUserManager.applyCustomRole(param, this.applyCustomRoleSuccess.bind(this), this.applyCustomRoleFailure.bind(this));
    };

    /**
     * applyCustomRole SucessCallBack
     * @param {object} - response
     */
    BusinessBankingPresentationController.prototype.applyCustomRoleSuccess = function(response) {
        this.navManager.updateForm({
            "applyCustomeRoleSuccess": response
        }, this.frmPermissionsTemplateForm);
    };

    /**
     * applyCustomRole FailureCallBack
     * @param {object} error - error response
     */
    BusinessBankingPresentationController.prototype.applyCustomRoleFailure = function(error) {
        this.navManager.updateForm({
            "applyCustomRoleFailure": error
        }, this.frmPermissionsTemplateForm);
    };

    /**
     * Method to fetch permissions for custom role flow.
     */
    BusinessBankingPresentationController.prototype.fetchCustomRoleDetails = function(customRoleID, successcallback, failurecallback) {
        // this.businessUserManager.fetchAllRoles(customRoleID, successcallback , failurecallback);
        this.fetchCustomRoleDetailsSuccess();
    };
    BusinessBankingPresentationController.prototype.callfetchCustomRoleDetails = function(customRoleID) {
        this.fetchCustomRoleDetails(customRoleID, this.fetchCustomRoleDetailsSuccess.bind(this), this.fetchCustomRoleDetailsFailure.bind(this));
    };

    /**
     * fetchUserPermissions SuccessCallBack
     * @param {object} response response
     */
    BusinessBankingPresentationController.prototype.fetchCustomRoleDetailsSuccess = function(response) {
        response = {};
        this.navManager.updateForm({
            "customRoleDetailsSuccess": response
        }, this.frmPermissionsTemplateForm);
    };

    /**
     * fetchUserPermissions FailureCallBack
     * @param {object} error - error response
     */
    BusinessBankingPresentationController.prototype.fetchCustomRoleDetailsFailure = function(error) {
        this.navManager.updateForm({
            "customRoleDetailsFailure": error
        }, this.frmPermissionsTemplateForm);
    };

    BusinessBankingPresentationController.prototype.deleteCustomRole = function(roleId, successCallback = this.deleteCustomRoleSuccess.bind(this),
            failureCallBack = this.deleteCustomRoleFailure.bind(this)) {
            this.navManager.updateForm({
                progressBar: true
            });
            this.businessUserManager.deleteTheCustomRole({
                "customRoleId": roleId
            }, successCallback, failureCallBack);
        },

        BusinessBankingPresentationController.prototype.deleteCustomRoleSuccess = function(response) {
            this.navigateToUserRoles();
            this.navManager.updateForm({
                "CustomRoleDeletedSuccessfully": response,
            }, this.frmBBUsersDashboardForm);
        },

        BusinessBankingPresentationController.prototype.deleteCustomRoleFailure = function(error) {
            this.navigateToUserRoles();
            this.navManager.updateForm({
                "CustomRoleDeletionFailed": error,
            }, this.frmBBUsersDashboardForm);
        },

        BusinessBankingPresentationController.prototype.fetchUserRoles = function(success = this.fetchUserRolesSuccess.bind(this), failure = this.fetchUserRolesFailure.bind(this), formName = this.frmBBUsersDashboardForm) {
            this.navManager.updateForm({
                progressBar: true
            }, formName);
            this.businessUserManager.fetchAllRoles(success.bind(this, formName), failure.bind(this, formName));
        };

    BusinessBankingPresentationController.prototype.fetchUserRolesSuccess = function(formName, response) {
        this.navManager.updateForm({
            "organizationRolesSuccess": response.CustomRoles,
            "isLoading": false,
        }, formName);
    };

    BusinessBankingPresentationController.prototype.fetchUserRolesFailure = function(formName, error) {
        this.navManager.updateForm({
            "organizationRolesFailure": error,
            "isLoading": false,
        }, formName);
    };


    BusinessBankingPresentationController.prototype.fetchCustomRoleSuccess = function(formName, response) {
        var customRoleList = [];
        var roleRecords = [];
        roleRecords = response.CustomRoles;
        for (var i = 0; i < roleRecords.length; i++) {
            var customRole = {
                imgSelectRole: {
                    "src": "radioinactivebb.png",
                    "isVisible": true
                },
                lblRoleName: roleRecords[i].name,
                lblRoleId: roleRecords[i].id,
                parent_id: roleRecords[i].parent_id,
                flxInnerRole: {
                    skin: "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
                }
            };

            customRole.lblRoleName = {
                text: truncateFeatureName(roleRecords[i].name, 25, false),
                toolTip: roleRecords[i].name
            };

            customRole.imgArrow = {
                isVisible: false
            };
            customRoleList.push(customRole);
        }
        this.navManager.updateForm({
            "organizationRolesSuccess": customRoleList
        }, formName);
    };


    BusinessBankingPresentationController.prototype.fetchCustomRoleFailure = function(formName, errorResponse) {
        var errorMessage = "";
        if (!kony.sdk.isNullOrUndefined(errorResponse.errorMessage)) {
            errorMessage = errorResponse.errorMessage;
        }
        if (!kony.sdk.isNullOrUndefined(errorResponse.dbpErrMsg)) {
            errorMessage = errorResponse.dbpErrMsg;
        }
        this.navManager.updateForm({
            "organizationRolesFailure": true,
            "errorMessage": errorMessage,
        }, formName);
    };


    /**
     * Method to navigate crete user ui.
     * @param {object} userObj - user object /user id for update User - as per final imp .
     */
    BusinessBankingPresentationController.prototype.showCreateUser = function(userObj, formName) {
        if (userObj) { //update user ui
            this.navManager.updateForm({
                "updateUser": this.businessUserManager.getUserObject(),
                "id": this.businessUserManager.getUserAttribute("id")
            }, this.frmUserManagementForm);
        } else {
            if (kony.application.getCurrentForm().id !== this.frmUserManagementForm) {
                var appName = _kony.mvc.getCurrentAppName();
				if(appName === "UserManagementMA")
					this.navManager.navigateTo(this.frmUserManagementForm);
				else
					this.navManager.navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/"+this.frmUserManagementForm});
            }
            this.businessUserManager.clearDataMembers();
            this.businessUserManager.createUserObject();
            var prevForm = false;
            if (formName === "fromAllUsers") {
                prevForm = true;
            }
            this.navManager.updateForm({
                "createNewUser": "createNewUser",
                "progressBar": true,
                "prevForm": prevForm
            }, this.frmUserManagementForm);
        }
    };
    /**
     * used to show the username policies
     */
    BusinessBankingPresentationController.prototype.getUserNamePolicies = function() {
        var self = this;
        applicationManager.getUserPreferencesManager().fetchUsernameRulesAndPolicy(self.getUserNamePoliciesSuccessCallBack.bind(this), self.onServerError.bind(this));
    };
    /**
     * getUserNamePoliciesSuccessCallBack
     * @param {object} response response
     */
    BusinessBankingPresentationController.prototype.getUserNamePoliciesSuccessCallBack = function(response) {
        var validationUtility = applicationManager.getValidationUtilManager();
        validationUtility.createRegexForUsernameValidation(response.usernamerules);
        this.navManager.updateForm({
            "userNamePolicies": {
                usernamerules: response.usernamerules
            },
            progressBar: false
        }, this.frmUserManagementForm);
    };
    /**
     * Method to handle server error.
     * @param {object} errorResponse - error response object
     */
    BusinessBankingPresentationController.prototype.onServerError = function(errorResponse) {
        var errorMessage = "";
        if (!kony.sdk.isNullOrUndefined(errorResponse.errorMessage)) {
            errorMessage = errorResponse.errorMessage;
        }
        if (!kony.sdk.isNullOrUndefined(errorResponse.dbpErrMsg)) {
            errorMessage = errorResponse.dbpErrMsg;
        }
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorMessage,
            progressBar: false
        },kony.application.getCurrentForm().id);
    };
    /**
     * Method to update user details in user module.
     * @param {object} userObj - user details
     */
    BusinessBankingPresentationController.prototype.updateUserDetails = function(userObj, isBack, isManageUser) {
        this.navManager.updateForm({
            progressBar: true
        });
        this.businessUserManager.validateUser({
            "Ssn": userObj.ssn,
            "DateOfBirth": CommonUtilities.sendDateToBackend(userObj.dob)
        }, this.onValidateUserSuccess.bind(this, userObj, isBack, isManageUser), this.onServerError.bind(this));
    };
    /**
     * Method to update user details in user module on sucess of valid user.
     * @param {object} userObj - user details
     * @param {object} response - respose object
     */
    BusinessBankingPresentationController.prototype.onValidateUserSuccess = function(userObj, isBack, isManageUser, response) {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmUserManagementForm);
        if (response.isValid) {
            this.businessUserManager.setUserAttribute("FirstName", userObj.firstName);
            this.businessUserManager.setUserAttribute("MiddleName", userObj.middleName);
            this.businessUserManager.setUserAttribute("LastName", userObj.lastName);
            this.businessUserManager.setUserAttribute("Email", userObj.email);
            this.businessUserManager.setUserAttribute("Ssn", userObj.ssn);
            this.businessUserManager.setUserAttribute("DrivingLicenseNumber", userObj.driverLicenseNumber);
            this.businessUserManager.setUserAttribute("Phone", userObj.phoneNumber);
            this.businessUserManager.setUserAttribute("UserName", userObj.userName);
            this.businessUserManager.setUserAttribute("DateOfBirth", CommonUtilities.sendDateToBackend(userObj.dob));
            if (!isBack) {
                //this.fetchRoles( this.onFetchUserRolesSuccess.bind( this ) );
                this.navManager.updateForm({
                    "createNewUserRole": "createNewUserRole",
                    progressBar: false
                }, this.frmUserManagementForm);
            } else {
                applicationManager.getBusinessUserManager().setUserAttribute("EditFlagForUpdateUser", true);
                if (!isManageUser) {
                    this.saveAccountListAndNavigate(this.businessUserManager.getUserAttribute("SelectedAccounts"));
                }
            }

        } else {
            this.navManager.updateForm({
                "invalidUserError": response,
                progressBar: false
            }, this.frmUserManagementForm);
        }
    };
    /**
     * Validate username availability errorcallback
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onValidateUsernameError = function(response) {
        this.navManager.updateForm({
            "invalidUserError": response,
            progressBar: false
        }, this.frmUserManagementForm);
    };
    /**
     * Validate user name availability
     * @param {object} username  user name
     * */
    BusinessBankingPresentationController.prototype.validateUserName = function(username) {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmUserManagementForm)
        this.businessUserManager.validateUserName(username, this.onValidateUserNameSuccess.bind(this), this.onValidateUserNameError.bind(this));
    };
    /**
     * Validate user name availability success callback
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onValidateUserNameSuccess = function(response) {
        this.navManager.updateForm({
            userNameAvailability: {
                isAvailable: response.isAvailable
            },
            progressBar: false
        }, this.frmUserManagementForm);
    };
    /**
     * Validate user name availability errorcallback
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onValidateUserNameError = function(response) {
        this.navManager.updateForm({
            "invalidUser": true,
            progressBar: false
        }, this.frmUserManagementForm);
    };
    /**
     * Validate Identification Number
     * @param {object} Identification No. SSN
     * */
    BusinessBankingPresentationController.prototype.validateIdentificationNumber = function(identificationnumber) {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmUserManagementForm)
        this.businessUserManager.checkIfOrganisationUserExists({
            "Ssn": identificationnumber
        }, this.onValidateIdentificationNumberSuccess.bind(this), this.onServerError.bind(this));
    };
    /**
     * Validate Identification Number success callback
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onValidateIdentificationNumberSuccess = function(response) {

        var status = false;
        if (response.isUserExists === "true") {
            status = true;
        }
        this.navManager.updateForm({
            "identificationNumberExists": status,
            progressBar: false
        }, this.frmUserManagementForm);
    };

    /**
     * Method to know if its Edit flow or Create flow
     */
    BusinessBankingPresentationController.prototype.isEditMode = function() {
        return !(this.businessUserManager.getUserAttribute("id") === undefined || this.businessUserManager.getUserAttribute("id") === null || this.businessUserManager.getUserAttribute("id") === "");
    };



    /**
     * filter other features actions and set the widget master data
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.fetchOtherFeaturesActions = function(store) {

        var NONM = store.NON_MONETARY;
        var len = NONM.length;
        var main = [];
        for (var i = 0; i < len; i++) {
            var FeatureData = NONM[i];
            var obj = {
                "lblFeatureHeader": FeatureData.featureName
            };
            for (var j = 0; j < FeatureData.Actions.length; j++) {
                obj["lblActionName" + (j + 1)] = {
                    "text": FeatureData.Actions[j].actionName
                };
                obj["lblActiveSelection" + (j + 1)] = {
                    "text": "F",
                    "skin": (FeatureData.Actions[j].isSelected) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                };
            }
            main.push(obj);
        }

        return main;
    };


    BusinessBankingPresentationController.prototype.fetchAllFeaturesAction = function(response) {
        var len = response.FeatureActions.length;
        var main = [];
        for (var i = 0; i < len; i++) {
            var JsonArr = [];
            var FeatureData = response.FeatureActions[i];

            var header = {
                "lblSegRoleSeparator": {
                    "text": "-"
                },
                "headerName": FeatureData.featureName
            };
            var arrayActions = [];
            for (var j = 0; j < FeatureData.Actions.length; j++) {
                arrayActions.push({
                    "id": FeatureData.Actions[j].actionName
                });
            }
            JsonArr.push(header);
            JsonArr.push(arrayActions);
            main.push(JsonArr);
        }

        return main;

    };

    /**
     * Method to fetch user role feature-actions set based on the selected rolw.
     */
    BusinessBankingPresentationController.prototype.fetchUserRoleActions = function(selectedRoleId) {
        this.navManager.updateForm({
            progressBar: true
        });
        this.getUserRoleActionsCall({
            "groupId": selectedRoleId
        }, this.fetchUserRoleActionsSuccess.bind(this), this.onServerError.bind(this));
    };

    BusinessBankingPresentationController.prototype.getUserRoleActionsCall = function(params, successCallback, failureCallback) {
        this.businessUserManager.getUserRoleActions(params, successCallback, failureCallback);
    }

    /**
     * Success callback for fetchUserRolesAction
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.fetchUserRoleActionsSuccess = function(response) {

        /* segregate the data on monetary and non monetary basis and prepare two separate payloads */
        var store = segregateFeatureData(response.FeatureActions);
        var allFeatureData = this.fetchAllFeaturesAction(response);
        var otherFeatureData = this.fetchOtherFeaturesActions(store);

        this.navManager.updateForm({
            fetchOtherRoleAction: otherFeatureData,
            fetchRoleAction: allFeatureData,
            storeUserDataTransaction: store,
            progressBar: false
        }, this.frmUserManagementForm);
    };
    /**
     * Method to fetch user roles or groups.
     */
    BusinessBankingPresentationController.prototype.fetchRoles = function(successCallback, formName = this.frmPermissionsTemplateForm) {
        this.navManager.updateForm({
            progressBar: true
        });
        this.businessUserManager.getUserRoles(successCallback.bind(this, formName), this.onServerError.bind(this));
    };
    /**
     * fetch user roles success scenario
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onFetchUserRolesSuccess = function(formName, response) {
        var ids = [];
        var grecords = [];
        var isEditManager = this.businessUserManager.getUserAttribute("isEditManager");
        grecords = response["GroupRecords"];
        this.businessUserManager.setUserAttribute("NumRoles", grecords.length);
        for (var i = 0; i < grecords.length; i++) {
            var userRole = {
                description: grecords[i].Description,
                imgSelectRole: {
                    "src": "radioinactivebb.png",
                    "isVisible": true
                },
                lblRoleName: grecords[i].Name,
                lblRoleId: grecords[i].id,
                flxInnerRole: {
                    skin: "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
                }
            };

            userRole.lblRoleName = {
                text: truncateFeatureName(grecords[i].Name, 25, false),
                toolTip: grecords[i].Name
            };

            if (grecords[i].id === this.businessUserManager.getUserAttribute("SelectedRoleId")) {
                userRole.imgArrow = {
                    isVisible: true
                };
            } else {
                userRole.imgArrow = {
                    isVisible: false
                };
            }
            ids.push(userRole);
        }

        if (this.isEditMode() && !isEditManager) {
            this.navManager.navigateTo(this.frmUserManagementForm);
        }
        this.navManager.updateForm({
            userRoles: ids,
            selectedRoleId: this.businessUserManager.getUserAttribute("SelectedRoleId"),
            id: this.businessUserManager.getUserAttribute("id"),
            progressBar: false
        }, this.frmUserManagementForm);
    };


    /**
     * update user roles
     * @param {object} roleObj - response object
     * */
    BusinessBankingPresentationController.prototype.confirmRole = function(roleObj) {
        var prevRoleId = this.businessUserManager.getUserAttribute("Role_id");
        this.businessUserManager.setUserAttribute("Role_id", roleObj.id); // create user
        this.businessUserManager.setUserAttribute("Group_Name", roleObj.Name); //for user ack screen
        this.businessUserManager.setUserAttribute("Group_Description", roleObj.Description); //for user ack screen
        if (roleObj.id !== prevRoleId) {
            this.businessUserManager.resetTransactionLimits();
            this.businessUserManager.setUserAttribute("services", []);
        }
    };
    /**
     * Method to navigate to user management dashboard and fetch list of users
     * @param {JSON} viewModel - consists context and parameters
     */

    BusinessBankingPresentationController.prototype.navigateToUsers = function(successCallBack, sortingInputs, formName = this.frmBBUsersDashboardForm, failureCallBack = this.onServerError.bind(this)) {
        if (kony.application.getCurrentForm().id !== formName) {
            this.navManager.navigateTo(formName);
        }
        this.navManager.updateForm({
            "progressBar": true
        }, formName);
        applicationManager.getPaginationManager().resetValues();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {};
        params = applicationManager.getPaginationManager().getValues(this.defaultSortConfig, sortingInputs);
        if (typeof searchString === "string" && searchString.length > 0) {
            params.searchString = searchString;
        } else if (searchString !== null && searchString !== undefined) {
            if (searchString.trim().length === 0) {
                params.sortBy = 'createdts';
                params.order = OLBConstants.DESCENDING_KEY;
            }
        } else {}
        params.limit = "";
        params.offset = "";
        this.businessUserManager.getAllUsers(params, successCallBack.bind(this, searchString, formName), failureCallBack.bind(this));
    };

    //fetchSubUsersSuccess
    /** Method to Navigate to Accountslanding dashboard on create user cancellation    
     */
    BusinessBankingPresentationController.prototype.navigateToBBAccountsLandingDashboard = function(sortingInputs) {
        this.businessUserManager.clearDataMembers();
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
        accountsModule.presentationController.showAccountsDashboard();
    };


    /** Method to handle success response of updating user status
     * @param {object} viewModel - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.setUserStatusSuccess = function(viewModel) {
        var viewProperties = {};
        viewProperties.statusSuccess = viewModel;
        viewProperties.progressBar = false;
        this.navManager.updateForm(viewProperties, this.frmBBUsersDashboardForm);
    };

    /** Need to add more fields when the service is called
     * Method to handle success response of fetch sub users
     * @param {object} viewModel - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.fetchSubUsersSuccess = function(searchString, formName, viewModel) {
        var paginationValues = applicationManager.getPaginationManager().getValues(this.defaultSortConfig);
        if (searchString !== null && searchString !== undefined) {
            if (searchString.trim().length === 0) {
                paginationValues.sortBy = 'createdts';
                paginationValues.order = OLBConstants.DESCENDING_KEY;
            }
        }
        paginationValues.limit = viewModel.length;
        if (viewModel.length > 0 || paginationValues.offset === 0) {
            this.navManager.updateForm({
                "allUsers": {
                    users: viewModel,
                    config: paginationValues,
                    searchString: searchString,
                    "isLoading": false,
                }
            }, formName);
        } else if (paginationValues.offset !== 0) {
            this.navManager.updateForm({
                noMoreRecords: true
            });
        }
    };
    /** Need to add more fields and parameters when the service is called
     * Method to update user status
     */
    BusinessBankingPresentationController.prototype.setUserStatus = function(params) {
        this.businessUserManager.updateUserStatus(params, this.setUserStatusSuccess.bind(this), this.onServerError.bind(this));
    };

    /** Method to handle success response of updating user status
     * @param {object} viewModel - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.setUserStatusSuccess = function(viewModel) {
        var viewProperties = {};
        viewProperties.statusSuccess = viewModel;
        viewProperties.progressBar = false;
        this.navManager.updateForm(viewProperties, this.frmBBUsersDashboardForm);
    };

    /** Need to add more fields when the service is called
     * Method to handle success response of updating user status
     * @param {object} viewModel - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.showAllAccounts = function(viewModel) {
        //Need to handle the success senario based on the response, when the call is successful
        var viewProperties = {};
        viewProperties.statusSuccess = viewModel;
        viewProperties.progressBar = false;
        this.navManager.updateForm(viewProperties, this.frmBBUsersDashboardForm);
    };

    /**Method to make service call to fetch Accounts
     */
    BusinessBankingPresentationController.prototype.showAllAccounts = function(selectedRole, isEdit) {
        this.navManager.updateForm({
            progressBar: true
        });
        if (this.businessUserManager.getUserAttribute("isEditManger") !== true && !isEdit) {
            this.getAllAccountsCall(this.fetchAccountsSuccess.bind(this), this.onServerError.bind(this));
        } else {
            this.saveAccountListAndNavigate(this.businessUserManager.userObj.SelectedAccounts);
        }
    };

    BusinessBankingPresentationController.prototype.getAllAccountsCall = function(successCallback, failureCallback) {
        this.businessUserManager.getAllAccounts(successCallback, failureCallback);
    }


    BusinessBankingPresentationController.prototype.saveAccountListAndNavigate = function(selectedAccounts) {
        this.navManager.updateForm({
            progressBar: true
        });
        var userAggregate = {};
        var userObj = {};
        var middleName = "";
        var firstName = "";
        var lastName = "";
        if (!kony.sdk.isNullOrUndefined(this.businessUserManager.getUserAttribute("MiddleName"))) {
            middleName = this.businessUserManager.getUserAttribute("MiddleName");
        }
        if (!kony.sdk.isNullOrUndefined(this.businessUserManager.getUserAttribute("FirstName"))) {
            firstName = this.businessUserManager.getUserAttribute("FirstName");
        }
        if (!kony.sdk.isNullOrUndefined(this.businessUserManager.getUserAttribute("LastName"))) {
            lastName = this.businessUserManager.getUserAttribute("LastName");
        }
        userObj["Full Name"] = firstName + " " + middleName + " " + lastName;
        userObj["Date Of Birth"] = this.businessUserManager.getUserAttribute("DateOfBirth");
        userObj["Email Address"] = this.businessUserManager.getUserAttribute("Email");
        userObj["Social Security Number(SSN)"] = this.businessUserManager.getUserAttribute("Ssn");
        userObj["Driver's License Number"] = this.businessUserManager.getUserAttribute("DrivingLicenseNumber");
        userObj["Registered Phone Number"] = this.businessUserManager.getUserAttribute("Phone");
        userObj["Username"] = this.businessUserManager.getUserAttribute("UserName");
        userAggregate.SelectedRoleName = this.businessUserManager.getUserAttribute("SelectedRoleName");
        userAggregate.SelectedRoleId = this.businessUserManager.getUserAttribute("SelectedRoleId");
        userAggregate.selectedAccounts = selectedAccounts;
        userAggregate.userObject = userObj;
        this.businessUserManager.setUserAttribute("SelectedAccounts", selectedAccounts);
        this.businessUserManager.setUserAttribute("accounts", selectedAccounts);
        this.navManager.updateForm({
            progressBar: false,
            verifyUser: userAggregate,
        }, this.frmUserManagementForm);
    };


    BusinessBankingPresentationController.prototype.saveAccountListAndNavigateToVerifyUser = function(selectedAccounts, userObjVal) {
        this.navManager.updateForm({
            progressBar: true
        });
        var userAggregate = {};
        var middleName = "";
        var firstName = "";
        var lastName = "";
        var userObj = {};
        if (!kony.sdk.isNullOrUndefined(userObjVal.middleName)) {
            middleName = userObjVal.middleName;
        }
        if (!kony.sdk.isNullOrUndefined(userObjVal.firstName)) {
            firstName = userObjVal.firstName;
        }
        if (!kony.sdk.isNullOrUndefined(userObjVal.lastName)) {
            lastName = userObjVal.lastName;
        }
        userObj["Full Name"] = firstName + " " + middleName + " " + lastName;
        userObj["Date Of Birth"] = CommonUtilities.sendDateToBackend(userObjVal.dob);
        userObj["Email Address"] = userObjVal.email;
        userObj["Social Security Number(SSN)"] = userObjVal.ssn;
        userObj["Driver's License Number"] = userObjVal.driverLicenseNumber;
        userObj["Registered Phone Number"] = userObjVal.phoneNumber;
        userObj["Username"] = userObjVal.userName;
        userAggregate.SelectedRoleName = this.businessUserManager.getUserAttribute("SelectedRoleName");
        userAggregate.SelectedRoleId = this.businessUserManager.getUserAttribute("SelectedRoleId");
        userAggregate.selectedAccounts = selectedAccounts;
        userAggregate.userObject = userObj;
        this.businessUserManager.setUserAttribute("SelectedAccounts", selectedAccounts);
        this.businessUserManager.setUserAttribute("accounts", selectedAccounts);
        this.navManager.updateForm({
            progressBar: false,
            verifyUser: userAggregate,
        }, this.frmUserManagementForm);
    };

    /** Method for fetch Accounts success
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.fetchAccountsSuccess = function(response) {
        if (this.isEditMode()) {
            //this.navManager.navigateTo(this.frmUserManagementForm);
        }
        this.navManager.updateForm({
            progressBar: false,
            accounts: response,
            selectedAccounts: this.businessUserManager.getUserAttribute("accounts"),
            id: this.businessUserManager.getUserAttribute("id")
        }, this.frmUserManagementForm);
    };
    /** Method to update the selected accounts in the Business Manager
     * @param {object} selectedAccounts - which consists of list of selected accounts of the user
     */
    BusinessBankingPresentationController.prototype.confirmAccounts = function(selectedAccounts) {
        this.businessUserManager.setUserAttribute("accounts", selectedAccounts);
    };
    /**Method to make service call to fetch Transaction Limits
     */
    BusinessBankingPresentationController.prototype.fetchTransactionLimits = function() {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmUserManagementForm);
        this.businessUserManager.getTransactionLimits(this.businessUserManager.getUserAttribute("Role_id"), this.fetchTransactionLimitsSuccess.bind(this), this.onServerError.bind(this));
    };
    /** Method for fetch Transaction Limit success
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.fetchTransactionLimitsSuccess = function(response) {
        if (response.length) {
            this.navManager.updateForm({
                progressBar: false,
                transactionLimits: response,
                selectedLimits: this.businessUserManager.getUserAttribute("services"),
                id: this.businessUserManager.getUserAttribute("id")
            }, this.frmUserManagementForm);
        } else {
            this.businessUserManager.createOrUpdateUser(this.createOrUpdateUserSuccess.bind(this), this.onServerError.bind(this));
        }
    };
    BusinessBankingPresentationController.prototype.addTransactionLimitsOnBack = function(transactionLimits) {
        this.businessUserManager.setUserAttribute("services", transactionLimits);
    };
    /** Method to update the transaction limits in the Business Manager
     * @param {object} transactionLimits - which consists of list of transaction limits of the user
     */
    BusinessBankingPresentationController.prototype.confirmTransactionLimits = function(transactionLimits) {
        this.businessUserManager.setUserAttribute("services", transactionLimits);
        this.businessUserManager.createOrUpdateUser(this.createOrUpdateUserSuccess.bind(this), this.onServerError.bind(this));
    };

    BusinessBankingPresentationController.prototype.updateUser = function(userAggregate, userDataStore, templimitstorejson, tryUpdate) {
        this.navManager.updateForm({
            progressBar: true
        });
        var self = this;
        self.userObj = self.businessUserManager.getUserObject();
        if (tryUpdate === 1) {
            self.userObj["SelectedAccounts"] = userAggregate["SelectedAccounts"];
            if (!kony.sdk.isNullOrUndefined(userAggregate["newData"])) {
                self.userObj["FirstName"] = userAggregate["newData"]["firstName"];
                self.userObj["MiddleName"] = userAggregate["newData"]["middleName"];
                self.userObj["LastName"] = userAggregate["newData"]["lastName"];
                self.userObj["Email"] = userAggregate["userObject"]["Email Address"];
                self.userObj["DrivingLicenseNumber"] = userAggregate["userObject"]["Driver's License Number"];
                self.userObj["Phone"] = userAggregate["userObject"]["Registered Phone Number"];
                self.userObj["UserName"] = userAggregate["userObject"]["Username"];
                self.userObj["DateOfBirth"] = userAggregate["userObject"]["Date Of Birth"];
                self.userObj["Ssn"] = userAggregate["userObject"]["Social Security Number(SSN)"];
            }
        }
        self.userObjForUpdate = createUserObjectForCreation(userAggregate, self.userObj, userDataStore, templimitstorejson);
        self.userObjForUpdate["id"] = this.userObj["id"];
        this.businessUserManager.UpdateBBUser(self.userObjForUpdate, this.createOrUpdateUserSuccess.bind(this, userAggregate), this.onServerError.bind(this));
    };
    /** Method for fetch Transaction Limit success
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.createOrUpdateUserSuccess = function(userAggregate, response) {
        if (response) {
            var userObj = this.businessUserManager.getUserObject();
            this.navManager.updateForm({
                progressBar: false
            });
            if (response.errorMessage) {
                this.navManager.updateForm({
                    progressBar: false,
                    updateUserSuccessFailure: true,
                    errMsg: response.errorMessage
                });
            } else {
                this.navManager.updateForm({
                    progressBar: false,
                    updateUserSuccess: true,
                    verifyUser: userAggregate,
                    referenceNumber: response.id,
                    userObject: userObj
                });
            }
        }
    };
    /** Method to resend Activation Link
     * @param {String} username - contains username
     */
    BusinessBankingPresentationController.prototype.resendActivationLink = function(username) {
        this.businessUserManager.resendActivationLink(username, this.resendActivationLinkSuccess.bind(this), this.resendActivationLinkFailure.bind(this));
    };
	/** Method to resend Activation Code
     * @param {String} username - contains userID
     */
    BusinessBankingPresentationController.prototype.resendActivationCode = function(username) {
        this.businessUserManager.resendActivationCode(username, this.resendActivationLinkSuccess.bind(this), this.resendActivationLinkFailure.bind(this));
    };
    /** Method to handle success response of resendActivationLink
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.resendActivationLinkSuccess = function() {
        this.navManager.updateForm({
            "activationLinkSuccess": true,
            "progressBar": false
        }, this.frmBBUsersDashboardForm);
    };
    /** Method to handle failure response of resendActivationLink
     */
    BusinessBankingPresentationController.prototype.resendActivationLinkFailure = function() {
        this.navManager.updateForm({
            "serverError": true,
            "progressBar": false
        });
    };
    /** Method to fetch User details
     * @param {String} username - contains username
     */
    BusinessBankingPresentationController.prototype.fetchUserDetails = function(username, rolename, completionCallback = this.fetchUserDetailsCompletionCallback.bind(this), failureCallback = this.fetchUserDetailsFailure.bind(this), formName = this.frmPermissionsTemplateForm) {

        this.navManager.updateForm({
            progressBar: true
        });
        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getBusinessUserManager(), "fetchUserDetails", [username]),
                asyncManager.asyncItem(applicationManager.getBusinessUserManager(), "getUserRoleActions", [{
                    "groupId": rolename
                }])
            ], completionCallback.bind(this, failureCallback, formName));
    };

    BusinessBankingPresentationController.prototype.fetchUserDetailsCompletionCallback = function(failureCallback, formName, asyncResponse) {
        var scopeObj = this;
        if (asyncResponse.isAllSuccess()) {
            var userObject = asyncResponse.responses[0].data;
            scopeObj.updateUserObjManager(userObject);
            scopeObj.businessUserManager.setUserAttribute("postShscopeObjowflag", 0);
            var store = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions);
            userObject["defaultLimitsForSelectedRole"] = store;
            if (kony.application.getCurrentForm().id !== formName) {
                applicationManager.getNavigationManager().navigateTo(formName);
            }
            applicationManager.getNavigationManager().updateForm({
                "manageUser": userObject,
                "progressBar": false
            }, formName);
        } else {
            failureCallback();
        }
    };

    BusinessBankingPresentationController.prototype.fetchExistingUserDetailsCompletionCallback = function(failureCallback, formName, asyncResponse) {
        var scopeObj = this;
        if (asyncResponse.isAllSuccess()) {
            var userObject = asyncResponse.responses[0].data;
            scopeObj.updateCustomRoleObjManager(userObject);
            var store = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions);
            userObject["defaultLimitsForSelectedRole"] = store;

            if (kony.application.getCurrentForm().id !== formName) {
                applicationManager.getNavigationManager().navigateTo(formName);
            }
            applicationManager.getNavigationManager().updateForm({
                "selectedUser": userObject,
                "progressBar": false
            }, formName);
        } else {
            var errorData = {};
            for (i = 0; i < 2; i++) {
                if (!asyncResponse.responses[i].isSuccess) {
                    errorData = asyncResponse.responses[i].data;
                }
            }
            failureCallback(errorData);
        }
    };


    BusinessBankingPresentationController.prototype.updateUserObjHelper = function(userObject) {
        this.businessUserManager.setUserAttribute("FirstName", userObject.FirstName);
        this.businessUserManager.setUserAttribute("MiddleName", userObject.MiddleName);
        this.businessUserManager.setUserAttribute("LastName", userObject.LastName);
        this.businessUserManager.setUserAttribute("Email", userObject.Email);
        this.businessUserManager.setUserAttribute("Ssn", userObject.Ssn);
        this.businessUserManager.setUserAttribute("DrivingLicenseNumber", userObject.DrivingLicenseNumber);
        this.businessUserManager.setUserAttribute("Phone", userObject.Phone);
        this.businessUserManager.setUserAttribute("UserName", userObject.Username);
        this.businessUserManager.setUserAttribute("DateOfBirth", userObject.DateOfBirth);
        this.businessUserManager.setUserAttribute("Role_id", userObject.Group_id);
        this.businessUserManager.setUserAttribute("Group_id", userObject.Group_id);
        this.businessUserManager.setUserAttribute("Group_Name", userObject.Group_Name);
        this.businessUserManager.setUserAttribute("Group_Description", userObject.Group_Description);
        this.businessUserManager.setUserAttribute("accounts", userObject.accounts);
        this.businessUserManager.setUserAttribute("services", userObject.services);
        this.businessUserManager.setUserAttribute("monetary", userObject.monetary);
        this.businessUserManager.setUserAttribute("nonmonetary", userObject.nonmonetary);
    }

    BusinessBankingPresentationController.prototype.fetchExistingUserDetailsForUserCreationCompletionCallback = function(failureCallback, formName, asyncResponse) {
        var scopeObj = this;
        if (asyncResponse.isAllSuccess()) {
            var userObject = asyncResponse.responses[0].data;
            this.businessUserManager.createUserObject();
            this.updateUserObjHelper(userObject);
            this.businessUserManager.setUserAttribute("defaultOrexistingRoleSelected", true);
            var store = segregateFeatureData(asyncResponse.responses[1].data.FeatureActions);
            userObject["defaultLimitsForSelectedRole"] = store;

            if (kony.application.getCurrentForm().id !== formName) {
                applicationManager.getNavigationManager().navigateTo(formName);
            }
            applicationManager.getNavigationManager().updateForm({
                "selectedUser": userObject,
                "progressBar": false
            }, formName);
        } else {
            var errorData = {};
            for (i = 0; i < 2; i++) {
                if (!asyncResponse.responses[i].isSuccess) {
                    errorData = asyncResponse.responses[i].data;
                }
            }
            failureCallback(errorData);
        }
    };


    BusinessBankingPresentationController.prototype.fetchExistingUserDetailsFailureCallback = function(error) {
        this.navManager.updateForm({
            "errorData": error,
            "fetchUserDetailsFailure": true,
            "progressBar": false
        });
    }

    /** Method to handle failure response of fetchUserDetails
     */
    BusinessBankingPresentationController.prototype.fetchUserDetailsFailure = function() {
        this.navManager.updateForm({
            "serverError": true,
            "progressBar": false
        });
    };

    /** Method to UPDATE User object in manager
     * @param {object} userObj - which consists of the user object
     */
    BusinessBankingPresentationController.prototype.updateUserObjManager = function(userObj) {
        this.businessUserManager.createUserObject();
        this.businessUserManager.setUserAttribute("id", userObj.id);
        this.updateUserObjHelper(userObj);
    };

    BusinessBankingPresentationController.prototype.updateCustomRoleObjManager = function(customRoleObject) {
        this.businessUserManager.createCustomRoleObject();
        this.businessUserManager.setCustomRoleAttribute("Role_id", customRoleObject.Group_id);
        this.businessUserManager.setCustomRoleAttribute("Group_id", customRoleObject.Group_id);
        this.businessUserManager.setCustomRoleAttribute("Group_Name", customRoleObject.Group_Name);
        this.businessUserManager.setCustomRoleAttribute("accounts", customRoleObject.accounts);
        this.businessUserManager.setCustomRoleAttribute("services", customRoleObject.services);
        this.businessUserManager.setCustomRoleAttribute("monetary", customRoleObject.monetary);
        this.businessUserManager.setCustomRoleAttribute("nonmonetary", customRoleObject.nonmonetary);
        this.businessUserManager.setCustomRoleAttribute("SelectedRoleName", customRoleObject.UserName);
        this.businessUserManager.setCustomRoleAttribute("SelectedRoleId", customRoleObject.Group_id);
        this.businessUserManager.setCustomRoleAttribute("isExistingUserSelected", true);
        this.businessUserManager.setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);
        this.businessUserManager.setCustomRoleAttribute("defaultOrexistingRoleSelected", true);
    };

    BusinessBankingPresentationController.prototype.showPrintPage = function(data) {
        var self = this;
        data.printKeyValueGroupModel.printCallback = function() {
            self.onPrintCancel();
        }
        applicationManager.getNavigationManager().navigateTo('frmPrintTransfer');
        applicationManager.getNavigationManager().updateForm(data, 'frmPrintTransfer');
    };
    BusinessBankingPresentationController.prototype.onPrintCancel = function() {
        this.navManager.navigateTo(this.frmBBUsersDashboardForm);
        this.navManager.updateForm({
            "isPrintCancelled": true
        }, this.frmBBUsersDashboardForm);
    };

    BusinessBankingPresentationController.prototype.showEditFeaturePermissions = function(formName, userObject) { //openFeaturePermissions
        this.navManager.updateForm({
            progressBar: true
        });
        this.navManager.updateForm({
            featureActions: true
        }, formName);
        this.navManager.updateForm({
            progressBar: false
        });
    };

    BusinessBankingPresentationController.prototype.showEditTransactionLimits = function(formName) { //openEditTransactionLimits
        this.navManager.updateForm({
            progressBar: true
        });
        this.navManager.updateForm({
            transactionDetails: true
        }, formName);
        this.navManager.updateForm({
            progressBar: false
        });
    };

    BusinessBankingPresentationController.prototype.showAccountLevelPermissions = function(formName, userObject) { //openAccountLevelPermissions
        this.navManager.updateForm({
            progressBar: true
        });
        this.navManager.updateForm({
            accountLevelPermissions: true
        }, formName);
        this.navManager.updateForm({
            progressBar: false
        });
    };

    BusinessBankingPresentationController.prototype.navigateToVerifyCustomRole = function(formName, userAggregate) {
        this.navManager.updateForm({
            progressBar: true
        });
        if (!kony.sdk.isNullOrUndefined(applicationManager.getBusinessUserManager().getCustomRoleAttribute("isEditManager")) && applicationManager.getBusinessUserManager().getCustomRoleAttribute("isEditManager")) {
            this.navManager.updateForm({
                verifyCustomRole: userAggregate
            }, formName);
        } else {
            this.navManager.updateForm({
                verifyUser: userAggregate
            }, formName);
        }
        this.navManager.updateForm({
            progressBar: false
        });
    };

    BusinessBankingPresentationController.prototype.navigateToVerifyUser = function(formName, userAggregate) {
        this.navManager.updateForm({
            progressBar: true
        });
        this.navManager.updateForm({
            verifyUser: userAggregate
        }, formName);

        this.navManager.updateForm({
            progressBar: false
        });
    };


    //Custome role name duplicate check for Primary details page

    BusinessBankingPresentationController.prototype.checkDuplicateRoleName = function(custRoleNameVal) {
        this.navManager.updateForm({
            progressBar: true
        });
        var custRoleNameObj = {
            "customRoleName": custRoleNameVal
        }
        applicationManager.getBusinessUserManager().duplicateCheckCustomRole(custRoleNameObj, this.duplicateCheckCustomeRoleSuccess.bind(this), this.duplicateCheckCustomeRoleFailure.bind(this));
    };


    BusinessBankingPresentationController.prototype.duplicateCheckCustomeRoleSuccess = function(response) {
        this.navManager.updateForm({
            "isDuplicateResponse": response,
            progressBar: false
        }, this.frmPermissionsTemplateForm);
    };

    BusinessBankingPresentationController.prototype.duplicateCheckCustomeRoleFailure = function(errorResponse) {
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorResponse.errorMessage,
            progressBar: false
        })
    };

    // method to create custom role template
    BusinessBankingPresentationController.prototype.createCustomRoleTemplate = function(userAggregate, userDataStore, templimitstorejson) {
        this.navManager.updateForm({
            progressBar: true
        });
        var self = this;
        self.userAggregateObj = userAggregate;
        self.customRoleObj = self.businessUserManager.getCustomRoleObject();
        self.customRoleObjForCreation = createCustomRoleObjectForCreation(userAggregate, self.customRoleObj, userDataStore, templimitstorejson);
        applicationManager.getBusinessUserManager().createCustomRole(self.customRoleObjForCreation, this.createCustomRoleSuccessCallBack.bind(this), this.createCustomRoleFailureCallBack.bind(this));
    };


    BusinessBankingPresentationController.prototype.createCustomRoleSuccessCallBack = function(response) {
        var self = this;
        self.customRoleObjForCreation["customRoleId"] = response["customRoleId"];
        self.customRoleObjForCreation["createdby"] = response["createdby"];
        self.customRoleObjForCreation["createdts"] = response["createdts"];
        this.navManager.updateForm({
            showAck: self.customRoleObjForCreation
        });
        this.navManager.updateForm({
            progressBar: false
        });
    };

    BusinessBankingPresentationController.prototype.createCustomRoleFailureCallBack = function(errorResponse) {
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorResponse.errorMessage,
            progressBar: false
        })
    };

    BusinessBankingPresentationController.prototype.createUser = function(userAggregate, userDataStore, templimitstorejson) {
        this.navManager.updateForm({
            progressBar: true
        });
        var self = this;
        self.userAggregateObj = userAggregate;
        self.userObj = self.businessUserManager.getUserObject();
        self.userObjForCreation = createUserObjectForCreation(userAggregate, self.userObj, userDataStore, templimitstorejson);
        applicationManager.getBusinessUserManager().createBBUser(self.userObjForCreation, this.createUserSuccessCallBack.bind(this), this.createUserFailureCallBack.bind(this));
    };

    BusinessBankingPresentationController.prototype.createUserSuccessCallBack = function(response) {
        var self = this;
        self.userObjForCreation["Reference_ID"] = response["id"];
        this.navManager.updateForm({
            showAck: self.userObjForCreation
        });
        this.navManager.updateForm({
            progressBar: false
        });
    };

  BusinessBankingPresentationController.prototype.getBBCampaigns = function() {
    var scope = this;
    if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
      var asyncManager = applicationManager.getAsyncManager();
      var directMktManager = applicationManager.getDirectMarketingManager();
      asyncManager.callAsync(
        [
          asyncManager.asyncItem(directMktManager, 'getAds', ["accountDashboardCampaignsWeb"])
        ],
        function(asyncResponses) {
          scope.getCampaigns(asyncResponses.responses[0].data);
        }
      )
    } else {
      scope.getCampaignsSuccess([]);
    }
  };
    /**
     *Method is used for fetching of campaigns
     * @param {Object}- list of campaigns
     */
    BusinessBankingPresentationController.prototype.getCampaigns = function(response) {
        if (response.campaignSpecifications)
            this.getCampaignsSuccess(response);
        else
            this.getCampaignsFailure(response);
    };
    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    BusinessBankingPresentationController.prototype.getCampaignsSuccess = function(res) {
        applicationManager.getNavigationManager().updateForm({
            "campaignRes": res["campaignSpecifications"]
        });
    };
    /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
    BusinessBankingPresentationController.prototype.getCampaignsFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            "campaignError": error
        });
    };


    BusinessBankingPresentationController.prototype.createUserFailureCallBack = function(errorResponse) {
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorResponse.errorMessage,
            progressBar: false
        })
    };


    /**
     * Method to navigate crete custom role ui.
     * @param {object} userObj - user object /user id for update User - as per final imp .
     */
    BusinessBankingPresentationController.prototype.showCreatePermissionsTemplate = function(userObj, formName, userObject) {
        var scopeObj = this;
        if (userObj) { //update custom role ui
            this.navManager.updateForm({
                "updateCustomRole": this.businessUserManager.getCustomRoleObject(),
                "id": this.businessUserManager.setCustomRoleAttribute("id")
            }, this.frmPermissionsTemplateForm);
        } else {
            if (kony.application.getCurrentForm().id !== scopeObj.frmPermissionsTemplateForm) {
                this.navManager.navigateTo(this.frmPermissionsTemplateForm);
            }
            this.businessUserManager.clearDataMembers();
            this.businessUserManager.createCustomRoleObject();
            var prevForm = false;
            if (formName === "fromAllCustomRoles") {
                prevForm = true;
            }
            if (userObject === undefined) {
                this.navManager.updateForm({
                    "createNewCustomRole": "createNewCustomRole",
                    "progressBar": true,
                    "prevForm": prevForm
                }, this.frmPermissionsTemplateForm);
            } else {
                this.navManager.updateForm({
                    "userObject": userObject,
                    "progressBar": true,
                    "prevForm": prevForm
                }, this.frmPermissionsTemplateForm);
            }

        }
    };

    /**
     * Method to navigate crete custom role ui.
     * @param {object} userObj - user object /user id for update User - as per final imp .
     */
    BusinessBankingPresentationController.prototype.showCreateCustomRole = function(userObj, formName, userObject) {
        var scopeObj = this;
        if (userObj) { //update custom role ui
            this.navManager.updateForm({
                "updateCustomRole": this.businessUserManager.getCustomRoleObject(),
                "id": this.businessUserManager.setCustomRoleAttribute("id")
            }, this.frmBBCreateCustomRole);
        } else {
            if (kony.application.getCurrentForm().id !== scopeObj.frmBBCreateCustomRole) {
                var appName = _kony.mvc.getCurrentAppName();
				if(appName === "UserManagementMA")
					this.navManager.navigateTo(this.frmBBCreateCustomRole);
				else
					this.navManager.navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/"+this.frmBBCreateCustomRole });
            }
            this.businessUserManager.clearDataMembers();
            this.businessUserManager.createCustomRoleObject();
            var prevForm = false;
            if (formName === "fromAllCustomRoles") {
                prevForm = true;
            }
            if (userObject === undefined) {
                this.navManager.updateForm({
                    "createNewCustomRole": "createNewCustomRole",
                    "progressBar": true,
                    "prevForm": prevForm
                }, this.frmBBCreateCustomRole);
            } else {
                this.navManager.updateForm({
                    "userObject": userObject,
                    "progressBar": true,
                    "prevForm": prevForm
                }, this.frmBBCreateCustomRole);
            }

        }
    };

    BusinessBankingPresentationController.prototype.updateCustomRole = function(customRoleAggregate, customRoleDataStore, templimitstorejson, tryUpdate) {
        this.navManager.updateForm({
            progressBar: true
        });
        var self = this;
        self.customRoleObj = self.businessUserManager.getCustomRoleObject();
        if (tryUpdate === 1) {
            self.customRoleObj["SelectedAccounts"] = customRoleAggregate["SelectedAccounts"];
            if (!kony.sdk.isNullOrUndefined(customRoleAggregate["newData"])) {
                self.customRoleObj["templateName"] = customRoleAggregate["newData"]["templateName"];
            }
        }

        customRoleAggregate["userObject"]["templateName"] = applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName");
        self.customRoleObjForUpdate = createCustomRoleObjectForCreation(customRoleAggregate, self.customRoleObj, customRoleDataStore, templimitstorejson);
        self.customRoleObjForUpdate["id"] = this.customRoleObj["id"];
        this.businessUserManager.updateCustomRole(self.customRoleObjForUpdate, this.updateCustomRoleSuccess.bind(this, customRoleAggregate), this.onServerError.bind(this));
    };


    /** Method to update the user details.
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.updateCustomRoleSuccess = function(userAggregate, response) {
        if (response) {
            this.navManager.updateForm({
                progressBar: false
            });
            if (response.errorMessage) {
                this.navManager.updateForm({
                    progressBar: false,
                    updateUserSuccessFailure: true,
                    errMsg: response.errorMessage
                }, this.frmPermissionsTemplateForm);
            } else {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("id", response.customRoleId);
                this.navManager.updateForm({
                    progressBar: false,
                    updateUserSuccess: true,
                    verifyCustomRole: userAggregate,
                    referenceNumber: response.customRoleId,
                }, this.frmPermissionsTemplateForm);
            }
        }
    };

    /**
     * Method to update cutome role details in Business User module.
     * @param {object} userObj - user details
     * @param {object} response - respose object
     */
    BusinessBankingPresentationController.prototype.updateCustomRoleDetails = function(customRoleObj, isBack, isManageCustomRole, formName = this.frmPermissionsTemplateForm) {
        this.navManager.updateForm({
            progressBar: true
        }, formName);

        if (!kony.sdk.isNullOrUndefined(customRoleObj)) {
            this.businessUserManager.setCustomRoleAttribute("templateName", customRoleObj.templateName);
        }
        if (!isBack) {
            this.fetchRoles(this.onFetchDefaultUserRolesSuccess.bind(this), formName);
        } else {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
            if (!isManageCustomRole) {
                this.saveAccountsAndNavigate(this.businessUserManager.getCustomRoleAttribute("SelectedAccounts"));
            }
        }
    };

    /**
     * fetch user roles success scenario
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onFetchDefaultUserRolesSuccess = function(formName, response) {
        var userRoles = [];
        var grecords = [];
        this.businessUserManager.createUserObject();
        var isEditManager = this.businessUserManager.getCustomRoleAttribute("isEditManager");
        grecords = response["GroupRecords"];
        this.businessUserManager.setCustomRoleAttribute("NumRoles", grecords.length);
        for (var i = 0; i < grecords.length; i++) {
            var userRole = {
                description: grecords[i].Description,
                imgSelectRole: {
                    "src": "radioinactivebb.png",
                    "isVisible": true
                },
                lblRoleName: grecords[i].Name,
                lblRoleId: grecords[i].id,
                flxInnerRole: {
                    skin: "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
                }
            };

            userRole.lblRoleName = {
                text: truncateFeatureName(grecords[i].Name, 25, false),
                toolTip: grecords[i].Name
            };

            if (grecords[i].id === this.businessUserManager.getCustomRoleAttribute("SelectedRoleId")) {
                userRole.imgArrow = {
                    isVisible: true
                };
            } else {
                userRole.imgArrow = {
                    isVisible: false
                };
            }
            userRoles.push(userRole);
        }

        var isEditMode = !(this.businessUserManager.getCustomRoleAttribute("id") === undefined ||
            this.businessUserManager.getCustomRoleAttribute("id") === null ||
            this.businessUserManager.getCustomRoleAttribute("id") === "");

        if (isEditMode && !isEditManager) {
            this.navManager.navigateTo(formName);
        }

        this.navManager.updateForm({
            userRoles: userRoles,
            selectedRoleId: this.businessUserManager.getCustomRoleAttribute("SelectedRoleId"),
            id: this.businessUserManager.getCustomRoleAttribute("id"),
            progressBar: false
        }, formName);
    };

    /**
     * Method to fetch user role feature-actions set based on the selected rolw.
     */
    BusinessBankingPresentationController.prototype.fetchDefaultRoleActions = function(selectedRoleId) {
        this.navManager.updateForm({
            progressBar: true
        });
        this.getUserRoleActionsCall({
            "groupId": selectedRoleId
        }, this.fetchDefaultrRoleActionsSuccess.bind(this), this.onServerError.bind(this));
    };

    /**
     * Success callback for fetchUserRolesAction
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.fetchDefaultrRoleActionsSuccess = function(response) {

        /* segregate the data on monetary and non monetary basis and prepare two separate payloads */
        var store = segregateFeatureData(response.FeatureActions);
        var allFeatureData = this.fetchAllFeaturesAction(response);
        var otherFeatureData = this.fetchOtherFeaturesActions(store);

        this.navManager.updateForm({
            fetchOtherRoleAction: otherFeatureData,
            fetchRoleAction: allFeatureData,
            storeUserDataTransaction: store,
            progressBar: false
        }, this.frmPermissionsTemplateForm);
    };

    BusinessBankingPresentationController.prototype.fetchUsersList = function(customRoleObj, formName = this.frmPermissionsTemplateForm) {
        this.navManager.updateForm({
            progressBar: true
        }, formName);

        this.navigateToUsers(this.onFetchUsersListSuccess.bind(this), null, formName, this.onFetchUsersListFailure.bind(this));
    };

    BusinessBankingPresentationController.prototype.onFetchUsersListFailure = function(errorResponse) {
        var errorMessage = "";
        if (!kony.sdk.isNullOrUndefined(errorResponse.errorMessage)) {
            errorMessage = errorResponse.errorMessage;
        }
        if (!kony.sdk.isNullOrUndefined(errorResponse.dbpErrMsg)) {
            errorMessage = errorResponse.dbpErrMsg;
        }
        this.navManager.updateForm({
            fetchUsersListFailure: true,
            errorMessage: errorMessage,
        });
    };

    BusinessBankingPresentationController.prototype.onFetchUsersListSuccess = function(searchString, formName, response) {
        var userNamesList = [];
        var userRecords = [];
        userRecords = response;
        for (var i = 0; i < userRecords.length; i++) {
            var userRole = {
                imgSelectRole: {
                    "src": "radioinactivebb.png",
                    "isVisible": true
                },
                lblRoleName: userRecords[i].UserName,
                lblRoleId: userRecords[i].id,
                lblName: userRecords[i].FirstName + " " + userRecords[i].MiddleName + " " + userRecords[i].LastName,
                flxInnerRole: {
                    skin: "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
                },
                roleName: userRecords[i].role_name,
                group_id: userRecords[i].Group_id
            };

            userRole.lblRoleName = {
                text: truncateFeatureName(userRecords[i].UserName, 25, false),
                toolTip: userRecords[i].UserName
            };
            userRole.imgArrow = {
                isVisible: false
            };
            userNamesList.push(userRole);
        }

        this.navManager.updateForm({
            userNamesList: userNamesList
        }, formName);
    };

    /**Method to make service call to fetch Accounts
     */
    BusinessBankingPresentationController.prototype.showAllAvailableAccounts = function(selectedRole, isEdit) {
        this.navManager.updateForm({
            progressBar: true
        });
        if (this.businessUserManager.getCustomRoleAttribute("isEditManger") !== true && !isEdit) {
            this.getAllAccountsCall(this.getAllAccountsSuccess.bind(this), this.onServerError.bind(this));
        } else {
            this.saveAccountsAndNavigate(this.businessUserManager.customRoleObj.SelectedAccounts);
        }
    };

    /** Method for getAllAccounts success
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.getAllAccountsSuccess = function(response) {
        this.navManager.updateForm({
            progressBar: false,
            accounts: response,
            selectedAccounts: this.businessUserManager.getCustomRoleAttribute("accounts"),
            id: this.businessUserManager.getCustomRoleAttribute("id")
        }, this.frmPermissionsTemplateForm);
    };

    BusinessBankingPresentationController.prototype.saveAccountsAndNavigate = function(selectedAccounts) {
        this.navManager.updateForm({
            progressBar: true
        });
        var userAggregate = {};
        var userObj = {};
        var templateName = "";

        if (!kony.sdk.isNullOrUndefined(this.businessUserManager.getCustomRoleAttribute("templateName"))) {
            templateName = this.businessUserManager.getCustomRoleAttribute("templateName");
        }
        userObj["templateName"] = templateName;
        userAggregate.SelectedRoleName = this.businessUserManager.getCustomRoleAttribute("SelectedRoleName");
        userAggregate.SelectedRoleId = this.businessUserManager.getCustomRoleAttribute("SelectedRoleId");
        userAggregate.selectedAccounts = selectedAccounts;
        userAggregate.userObject = userObj;
        this.businessUserManager.setCustomRoleAttribute("SelectedAccounts", selectedAccounts);
        this.navManager.updateForm({
            progressBar: false,
            verifyUser: userAggregate,
        }, this.frmPermissionsTemplateForm);
    };

    /** Method to update the selected accounts in the Business Manager
     * @param {object} selectedAccounts - which consists of list of selected accounts of the user
     */
    BusinessBankingPresentationController.prototype.setSelectedAccounts = function(selectedAccounts) {
        this.businessUserManager.setCustomRoleAttribute("accounts", selectedAccounts);
    };

    /**
     * Validate Identification Number
     * @param {object} Identification No. SSN
     * */
    BusinessBankingPresentationController.prototype.validateUMIdentificationNumber = function(identificationnumber) {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmCreateUserManually)
        this.businessUserManager.checkIfOrganisationUserExists({
            "Ssn": identificationnumber
        }, this.onValidateUMIdentificationNumberSuccess.bind(this), this.onServerError.bind(this));
    };
    /**
     * Validate Identification Number success callback
     * @param {object} response - response object
     * */
    BusinessBankingPresentationController.prototype.onValidateUMIdentificationNumberSuccess = function(response) {
        if (response && response.isUserExists) {
            var status = response.isUserExists;
            this.navManager.updateForm({
                "identificationNumberExists": status,
                progressBar: false
            }, this.frmCreateUserManually);
        }
    };
    /**
     * Method to update user details in user module.
     * @param {object} userObj - user details
     */
    BusinessBankingPresentationController.prototype.UserOFACCheck = function(userObj) {
        this.navManager.updateForm({
            progressBar: true
        }, this.frmCreateUserManually);
        this.businessUserManager.validateUser({
            "Ssn": userObj.taxId,
            "DateOfBirth": CommonUtilities.sendDateToBackend(userObj.dateOfBirth)
        }, this.UserOFACCheckSuccess.bind(this, userObj), this.UserOFACCheckError.bind(this));
    };
    BusinessBankingPresentationController.prototype.UserOFACCheckSuccess = function(userObj, response) {
        //user array which is created in Presentation controller will be updated      
        if (response && response.isValid) {
            var status = response.isValid;
            this.navManager.updateForm({
                "UserOFACCheckStatus": status,
                progressBar: false
            }, this.frmCreateUserManually);
        }
      else{
        this.navManager.updateForm({
          progressBar: false
        }, this.frmCreateUserManually);
        this.onServerError(error);
      }
    };
    BusinessBankingPresentationController.prototype.UserOFACCheckError = function(error) {
        //user array which is created in Presentation controller will be updated   
        this.navManager.updateForm({
            progressBar: false
        }, this.frmCreateUserManually);
        this.onServerError(error);
    };
    /**
     * Method to get List of customers
     */
    BusinessBankingPresentationController.prototype.getListofCompanies = function() {
        this.navManager.updateForm({
            progressBar: true
        });
        //this.navManager.updateForm({ progressBar: true }, this.frmCreateUserManually);
        this.businessUserManager.getCompanies(this.getListofCompaniesSuccess.bind(this), this.onServerError.bind(this));
    };
    BusinessBankingPresentationController.prototype.getListofCompaniesSuccess = function(response) {
        //user array which is created in Presentation controller will be updated      
        if (response) {
            this.navManager.updateForm({
                "ListofCompanies": response,
              progressBar : false
            }, this.frmCreateUserManually);
            if(response.customers.length>0){
              this.navManager.updateForm({
                progressBar: true
              });
              this.getUsersOfCompany(response.customers[0].coreCustomerId, this.getUsersOfCompanySuccess.bind(this), this.getUsersOfCompanyError.bind(this));
            }
        }
        //       this.navManager.updateForm({
        //       "companyList": response,
        //       progressBar: false
        //     }, "frmTransactionLimits");

    };
    BusinessBankingPresentationController.prototype.getListofCompaniesFailure = function(error) {
        //user array which is created in Presentation controller will be updated      
        this.navManager.updateForm({
            "userError": error,
            progressBar: false
        }, this.frmCreateUserManually);
    };
    /**
     * Method to get List of Legal Entities
     */
    BusinessBankingPresentationController.prototype.getLegalEntities = function() {
        this.navManager.updateForm({
            progressBar: true
        });
        //this.navManager.updateForm({ progressBar: true }, this.frmCreateUserManually);
        this.businessUserManager.getLegalEntities({},this.getLegalEntitiesSuccess.bind(this), this.getLegalEntitiesFailure.bind(this));
    };
    BusinessBankingPresentationController.prototype.getLegalEntitiesSuccess = function(response) {
        //user array which is created in Presentation controller will be updated      
        if (response) {
            this.navManager.updateForm({
                "legalEntitySuccess": response,
              progressBar : false
            }, this.frmBBUsersDashboard);
        }
    };
    BusinessBankingPresentationController.prototype.getLegalEntitiesFailure = function(error) {
        //user array which is created in Presentation controller will be updated      
        this.navManager.updateForm({
            "EntityError": error,
            progressBar: false
        }, this.frmBBUsersDashboard);
    };
  
    BusinessBankingPresentationController.prototype.getCompaniesList = function() {
        this.navManager.updateForm({
            progressBar: true
        });
        //this.navManager.updateForm({ progressBar: true }, this.frmCreateUserManually);
        this.businessUserManager.getCompanies(this.getCompaniesListSuccess.bind(this), this.onServerError.bind(this));
    };
    BusinessBankingPresentationController.prototype.getCompaniesListSuccess = function(response) {
        //user array which is created in Presentation controller will be updated      
        //         if (response) {
        //             this.navManager.updateForm({
        //                 "ListofCompanies": response,
        //             }, this.frmCreateUserManually);
        //             this.getUsersOfCompany(response.customers[0].coreCustomerId, this.getUsersOfCompanySuccess.bind(this), this.getUsersOfCompanyError.bind(this));
        //         }
        this.navManager.updateForm({
            "companyList": response,
            //progressBar: false
        }, "frmTransactionLimits");

    };
    BusinessBankingPresentationController.prototype.getCompaniesListFailure = function(error) {
        //user array which is created in Presentation controller will be updated      
        this.navManager.updateForm({
            "userError": error,
            progressBar: false
        }, "frmTransactionLimits");
    };

    /**
     * Method to get List of Eligible Customers
     * @param {String} id -core Customer Id
     */
    BusinessBankingPresentationController.prototype.getUsersOfCompany = function(coreCustomerId) {
        //user array which is created in Presentation controller will be updated      
        this.businessUserManager.getUsersOfCompany(coreCustomerId, this.getUsersOfCompanySuccess.bind(this), this.getUsersOfCompanyError.bind(this));
    };
    BusinessBankingPresentationController.prototype.createInfinityUser = function() {
        //user array which is created in Presentation controller will be updated      
        this.businessUserManager.createInfinityUser("", this.createInfinityUserSuccess.bind(this), this.createInfinityUserSuccess.bind(this));
    };
    BusinessBankingPresentationController.prototype.createInfinityUserSuccess = function(companyId) {
        //user array which is created in Presentation controller will be updated      
        var data = this;
    };
    BusinessBankingPresentationController.prototype.getUsersOfCompanySuccess = function(response) {
        //user array which is created in Presentation controller will be updated      
        if (response) {
            this.navManager.updateForm({
                "ListofCompanyUsers": response.customers,
                progressBar: false
            }, this.frmCreateUserManually);
        }
    };
    BusinessBankingPresentationController.prototype.getUsersOfCompanyError = function(error) {
        //user array which is created in Presentation controller will be updated      
        this.navManager.updateForm({
            "userError": error,
            progressBar: false
        }, this.frmCreateUserManually);
    };
    /**
     * Method to get User Management Flow Type
     */
    BusinessBankingPresentationController.prototype.getUserManagementFlowType = function() {
        this.userManagementFlowType = OLBConstants.CLIENT_PROPERTIES.OLB_USER_MANGEMENT_FLOW;
        return this.userManagementFlowType;
    };

    /**
     * Method to get Custom Role Details
     * @param {String} id -custom role ID
     */
    BusinessBankingPresentationController.prototype.getCustomRoleDetails = function(params) {
        this.businessUserManager.getDetailsOfCustomRole(params, this.getCustomRoleDetailsSuccess.bind(this), this.getCustomRoleDetailsFailure.bind(this));
    };
    /** Method to handle success response of getCustomRoleDetails
     * @param {object} userData - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.getCustomRoleDetailsSuccess = function(userData) {
        var contractID = this.selectedContractId !== "" ? this.selectedContractId : "";
        let intersectObject = this.intersect(this.loggedInUserData, userData, contractID);
        intersectObject.userDetails = this.userManagementData.userDetails;
        this.userManagementData = intersectObject;
        this.userManagementData.companyList.forEach((company) => {
           let flag = false;
		   company.accounts.forEach(account=>{
			flag = flag || account.isEnabled.toString() === 'true';
		   });
		   company.isEnabled = flag;
        });
        //this.generateTransactionLimits(JSON.parse(JSON.stringify(this.userManagementData.accountLevelPermissions)));
        this.sortUserManagementData();
        this.initUserManagementData = JSON.parse(JSON.stringify(this.userManagementData));

        this.navManager.updateForm({
            'getUserDetailsSuccess': this.userManagementData,
            'progressBar': false
        });
        //this.navManager.updateForm({ "isLoading": false, "customRoleDetailsSuccess": this.userManagementData });
    };
    /** Method to handle failure response of getCustomRoleDetails
     */
    BusinessBankingPresentationController.prototype.getCustomRoleDetailsFailure = function() {
        this.navManager.updateForm({
            "customRoleDetailsFailure": true,
            "progressBar": false
        });
    };

    /**
     * Method to fetch Account Level Permissions
     */
    BusinessBankingPresentationController.prototype.fetchAccountLevelPermissions = function() {
        this.fetchAccountLevelPermissionsSuccess();
    };

    BusinessBankingPresentationController.prototype.fetchAccountLevelPermissionsSuccess = function(response) {
        let self = this;
        this.navManager.updateForm({
            "isLoading": false,
            "accountLevelPermissionsSuccess": self.userManagementData.accountLevelPermissions
        }, this.frmBBCopyPermission);
    };

    BusinessBankingPresentationController.prototype.updateUseObject = function(userData) {
      applicationManager.getNavigationManager().setCustomInfo("userData",userData);
        this.userManagementData.userDetails.firstName = userData.firstName;
        this.userManagementData.userDetails.lastName = userData.lastName;
        this.userManagementData.userDetails.middleName = userData.middleName;
        this.userManagementData.userDetails.dob = userData.dateOfBirth;
        this.userManagementData.userDetails.phoneCountryCode = userData.phoneCountryCode;
        this.userManagementData.userDetails.phoneNumber = userData.phone;
        this.userManagementData.userDetails.email = userData.email;
        this.userManagementData.userDetails.coreCustomerID = userData.coreCustomerId;
        this.userManagementData.userDetails.ssn = userData.taxId;
        this.userManagementData.userDetails.drivingLicenseNumber = userData.drivingLicenseNumber;
     	this.userManagementData.userDetails.coreCustomerId = userData.coreCustomerId;
       applicationManager.getConfigurationManager().enableCreateFlag = true ;
    };

    /**
     * Method to update userDetails
     */
    BusinessBankingPresentationController.prototype.updateUserDetails = function(userData) {
        var userDetailsData = CommonUtilities.updateObjectFromPath(this.userManagementData, "userDetails", userData);
        this.userManagementData = userDetailsData;
    };

   BusinessBankingPresentationController.prototype.getLoginUserPermissions = function() {
		var params = {};
        var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
        if (isAddToEntityFlow === "addToEntity"){
            var navManager = applicationManager.getNavigationManager();
            var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
            params = {"legalEntityId": entityId};
        }
        this.businessUserManager.getInfinityUser(params, this.getLoginDetailsSuccessCallBack.bind(this), this.getInfinityUserFailureCallBack.bind(this));

    };
  
    BusinessBankingPresentationController.prototype.getInfinityUserDetails = function(params) {

        if (params === undefined) {
            params = {};
        }
        this.navManager.updateForm({
            progressBar: true
        }, "frmTransactionLimits");
        this.businessUserManager.getInfinityUser(params, this.getInfinityUserDetailsSuccessCallBack.bind(this), this.getInfinityUserFailureCallBack.bind(this));
    };
    BusinessBankingPresentationController.prototype.getInfinityUser = function(params, contractID) {
        this.selectedContractId = contractID;
        if (params === undefined) {
            params = {};
        }
        //     else
        //       params ={"coreCustomerId":coreCustomerId};
        this.businessUserManager.getInfinityUser(params, this.getInfinityUserSuccessCallBack.bind(this), this.getInfinityUserFailureCallBack.bind(this));
    };
    BusinessBankingPresentationController.prototype.getLoginDetailsSuccessCallBack = function(userData) {
        this.loggedInUserData = userData;
		applicationManager.getConfigurationManager().setLoggedInUserPermissionsData(JSON.parse(JSON.stringify(userData)));
		this.setTransactionLimitsData(userData.transactionLimits);
        this.navManager.setCustomInfo("cif",userData.companyList[0].cif);
        this.navManager.setCustomInfo("serviceDefinition",userData.companyList[0].serviceDefinition);
        this.navManager.updateForm({
            'getInfinityUserSuccess': true
        });
    };
    BusinessBankingPresentationController.prototype.getInfinityUserSuccessCallBack = function(userData) {
        this.getCustomRoleDetailsSuccess(userData);

    };
    BusinessBankingPresentationController.prototype.getInfinityUserDetailsSuccessCallBack = function(userData) {
        applicationManager.getConfigurationManager().getLimitsData = userData;
        this.navManager.updateForm({
            "companyDetails": userData,
            progressBar: false
        }, "frmTransactionLimits");


    };
    BusinessBankingPresentationController.prototype.getInfinityUserFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'getInfinityUserFailure': 'Error fetching logged in user details'
        });
    };
    BusinessBankingPresentationController.prototype.viewInfinityUser = function(id) {
        this.businessUserManager.getInfinityUser({
            'id': id
        }, this.viewInfinityUserSuccessCallBack.bind(this), this.viewInfinityUserFailureCallBack.bind(this));
    };
     BusinessBankingPresentationController.prototype.viewInfinityUserSuccessCallBack = function(userManagementData,id) {
        this.userManagementData = userManagementData;
        this.userManagementData.companyList = this.userManagementData.companyList.map(company => {
			let flag = false;
			company.accounts.forEach(account=>{
				flag = flag || account.isEnabled.toString() === 'true';
			});
            company.isEnabled = flag;
            return company;
        });
        if (Array.isArray(this.userManagementData.userDetails)) {
            this.userManagementData.userDetails = this.userManagementData.userDetails[0];
        }
		this.userManagementData.userDetails.id = id;
        this.sortUserManagementData();
        //this.generateTransactionLimits(JSON.parse(JSON.stringify(userManagementData.accountLevelPermissions)));
        this.initUserManagementData = JSON.parse(JSON.stringify(userManagementData));
        this.navManager.updateForm({
            'getInfinityUserSuccess': 'Logged in user fetch success'
        });

    };
    BusinessBankingPresentationController.prototype.viewInfinityUserFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'getInfinityUserFailure': errmsg
        });
    };

    /** Method to get Associated Contract Users
     */
    BusinessBankingPresentationController.prototype.getAssociatedContractUsers = function() {
        var param = {};
        if (this.selectedContractID != "" && this.userManagementFlowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
            param = {
                "contractID": this.selectedContractID,
            };
        }
        else{
            var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
                if (isAddToEntityFlow === "addToEntity"){
                var navManager = applicationManager.getNavigationManager();
                var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
                param ={"legalEntityId":entityId}
            }
        }
        this.businessUserManager.getAssociatedContractUsers(param, this.getAssociatedContractUsersSuccess.bind(this), this.getAssociatedContractUsersFailure.bind(this));
    };

    /** Method to handle success response of getAssociatedContractUsers
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.getAssociatedContractUsersSuccess = function(existingUsers) {
        this.navManager.updateForm({
            "associatedContractUsersSuccess": existingUsers
        },kony.application.getCurrentForm().id);
    };
    /** Method to handle failure response of getAssociatedContractUsers
     */
    BusinessBankingPresentationController.prototype.getAssociatedContractUsersFailure = function() {
        this.navManager.updateForm({
            "associatedContractUsersFailure": true
        });
    };

    /** Method to get Company Level CustomRoles
     */
    BusinessBankingPresentationController.prototype.getCompanyLevelCustomRoles = function() {
      var param = {};
      if (this.selectedContractID != "" && this.userManagementFlowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
        param = {
          "contractID": this.selectedContractID,
           };
      }
      else{
        var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
        if (isAddToEntityFlow === "addToEntity"){
          var navManager = applicationManager.getNavigationManager();
          var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
          param ={
                "legalEntityId":entityId
        };
        }
      }
		this.navManager.updateForm({
		  "progressBar": true,
          "roleData": this.roleData
		},kony.application.getCurrentForm().id);
        this.businessUserManager.getCompanyLevelCustomRoles(param, this.getCompanyLevelCustomRolesSuccess.bind(this), this.getCompanyLevelCustomRolesFailure.bind(this));
    };
    /** Method to handle success response of getCompanyLevelCustomRoles
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.getCompanyLevelCustomRolesSuccess = function(customRoles) {
        this.navManager.updateForm({
            "companyLevelCustomRolesSuccess": customRoles,
			"progressBar": false
        },kony.application.getCurrentForm().id);
    };
    /** Method to handle failure response of getCompanyLevelCustomRoles
     */
    BusinessBankingPresentationController.prototype.getCompanyLevelCustomRolesFailure = function() {
        this.navManager.updateForm({
            "companyLevelCustomRolesFailure": true,
            "progressBar": false
        },kony.application.getCurrentForm().id);
    };
    BusinessBankingPresentationController.prototype.createUserAnotherEntity = function(userManagementData) {
        //removing all companies and accounts with isEnabled as false
        let companyList = [];
        var updatedLE = applicationManager.getNavigationManager().getCustomInfo("addToEntityDetails").addToEntityId;
        
        userManagementData = JSON.parse(JSON.stringify(userManagementData));
        userManagementData.companyList.map(company => {
                let accounts = [], flag = false;
                company.accounts.map(account => {
                    if (account.isEnabled.toString() === 'true') {
                        accounts.push(account);
                      flag = true;
                    }
                });
                company.accounts = accounts;
          if(flag){
                companyList.push(company);
          }
        });
        userManagementData.companyList = companyList;
        userManagementData.companyList.forEach(function(data) {
            data.legalEntityId = updatedLE;
        });
        userManagementData.accountLevelPermissions.forEach(function(data) {
            data.legalEntityId = updatedLE;
            data.accounts.forEach(function(accounts){
              accounts.featurePermissions.forEach(function(featurePermissions){
                featurePermissions.permissions.forEach(function(permissions){
                  permissions.legalEntityId=updatedLE;
                });
              });
            });
        });
        userManagementData.globalLevelPermissions.forEach(function(data) {
            data.legalEntityId = updatedLE;
           data.features.forEach(function(features){
              features.permissions.forEach(function(permissions){
                  permissions.legalEntityId=updatedLE;
              });
            });
        });
        userManagementData.transactionLimits.forEach(function(data) {
            data.legalEntityId=updatedLE;
          data.accounts.forEach(function(accounts){
              accounts.featurePermissions.forEach(function(featurePermissions){
                  featurePermissions.legalEntityId=updatedLE;
              });
            });
            
        });
      userManagementData.userDetails.legalEntityId=updatedLE;
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        this.businessUserManager.updateInfinityUser(userManagementData, this.updateuserSuccessCallBack.bind(this), this.updateUserFailureCallBack.bind(this));
    };
    BusinessBankingPresentationController.prototype.updateuserSuccessCallBack = function(res) {
        //this.createInfinityUserSuccess = res;
        this.navManager.updateForm({
            'createUserSuccess': res,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.updateUserFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'createUserFailure': errmsg,
          'isLoading': false
        });
    };

    BusinessBankingPresentationController.prototype.createInfinityUser = function(userManagementData) {
        //removing all companies and accounts with isEnabled as false
        let companyList = [];
        userManagementData = JSON.parse(JSON.stringify(userManagementData));
        userManagementData.companyList.map(company => {
                let accounts = [], flag = false;
                company.accounts.map(account => {
                    if (account.isEnabled.toString() === 'true') {
                        accounts.push(account);
                      flag = true;
                    }
                });
                company.accounts = accounts;
          if(flag){
                companyList.push(company);
          }
        });
        userManagementData.companyList = companyList;
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        this.businessUserManager.createInfinityUser(userManagementData, this.createInfinityUserSuccessCallBack.bind(this), this.createInfinityUserFailureCallBack.bind(this));
    };
    BusinessBankingPresentationController.prototype.createInfinityUserSuccessCallBack = function(res) {
        this.createInfinityUserSuccess = res;
        this.navManager.updateForm({
            'createInfinityUserSuccess': res,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.createInfinityUserFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'createInfinityUserFailure': errmsg,
          'isLoading': false
        });
    };

    /** Method to get Access Policies
     */
    BusinessBankingPresentationController.prototype.getAccessPolicies = function() {
        this.businessUserManager.getAccessPolicies(this.getAccessPoliciesSuccess.bind(this), this.getAccessPoliciesFailure.bind(this));
    };
    /** Method to handle success response of getAccessPolicies
     * @param {object} response - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.getAccessPoliciesSuccess = function(accessPolicies) {
        this.navManager.updateForm({
            "accessPoliciesSuccess": accessPolicies,
            "progressBar": false
        });
    };
    /** Method to handle failure response of getAccessPolicies
     */
    BusinessBankingPresentationController.prototype.getAccessPoliciesFailure = function() {
        this.navManager.updateForm({
            "serverError": true,
            "progressBar": false
        });
    };

  BusinessBankingPresentationController.prototype.updateInfinityUserForCreate = function(userManagementData,flag) {
        //removing all companies and accounts with isEnabled as false
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      this.updateFlag = flag;
        userManagementData = JSON.parse(JSON.stringify(userManagementData));
        let companyList = [];
        let removedCompanies = [];
        userManagementData.companyList.map(company => {
          let accounts = [], flag = false;
          company.accounts.map(account => {
            if (account.isEnabled.toString() === 'true') {
              accounts.push(account);
              flag = true;
            }
          });
          company.accounts = accounts;
          if(flag){
            companyList.push(company);
          }
          else{                              
            removedCompanies.push(company);
          }
        });
      
        userManagementData.companyList = companyList;
        userManagementData.removedCompanies = [];
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        this.businessUserManager.updateInfinityUser(userManagementData, this.updateInfinityUserForCreateSuccessCallBack.bind(this), this.updateInfinityUserForCreateFailureCallBack.bind(this));
    };
  
   BusinessBankingPresentationController.prototype.updateInfinityUserForCreateSuccessCallBack = function(res) {
        this.createInfinityUserSuccess = res;
        this.navManager.updateForm({
            'createInfinityUserSuccess': res,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.updateInfinityUserForCreateFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'createInfinityUserFailure': errmsg,
          'isLoading': false
        });
    };

  
    BusinessBankingPresentationController.prototype.updateInfinityUser = function(userManagementData,flag) {
        //removing all companies and accounts with isEnabled as false
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      this.updateFlag = flag;
      var updatedLE = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
        userManagementData = JSON.parse(JSON.stringify(userManagementData));
        let companyList = [];
        let removedCompanies = [];
        userManagementData.companyList.map(company => {
          let accounts = [], flag = false;
          company.accounts.map(account => {
            if (account.isEnabled.toString() === 'true') {
              accounts.push(account);
              flag = true;
            }
          });
          userManagementData.userDetails.legalEntityId = updatedLE;
          company.accounts = accounts;
          if(flag){
            companyList.push(company);
          }
          else{                              
            removedCompanies.push(company);
          }
        });
      
        userManagementData.companyList = companyList;
        userManagementData.removedCompanies = removedCompanies;
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        this.businessUserManager.updateInfinityUser(userManagementData, this.updateInfinityUserSuccessCallBack.bind(this), this.updateInfinityUserFailureCallBack.bind(this));
    };
    
  BusinessBankingPresentationController.prototype.editInfinityUserForRemovedCompanies = function(userManagementData) {
    //removing all companies and accounts with isEnabled as false
    //userManagementData = JSON.parse(JSON.stringify(userManagementData));
    this.businessUserManager.updateInfinityUser(userManagementData,
                                                this.editInfinityUserForRemovedCompaniesSuccessCallBack.bind(this), 
                                                this.editInfinityUserForRemovedCompaniesFailureCallBack.bind(this));
  };


  BusinessBankingPresentationController.prototype.editInfinityUserForRemovedCompaniesSuccessCallBack = function(res) {
    this.fetchAssociatedContractUsers(this.fetchAssociatedContractUsersSuccess.bind(this));
    //this.navManager.navigateTo("frmBBUsersDashboard");
  };
  BusinessBankingPresentationController.prototype.editInfinityUserForRemovedCompaniesFailureCallBack = function(errmsg) {
    this.navManager.updateForm({
      'updateInfinityUserFailure': errmsg,
      'isLoading': false
    });
  };
    
    BusinessBankingPresentationController.prototype.updateInfinityUserSuccessCallBack = function(res) {
        if(this.updateFlag === "accountAccess"){
        this.navManager.updateForm({
            'updateInfinityUserSuccess': res,
            'isLoading': true
        },"frmBBAccountAccessAndRole");
      }
      if(this.updateFlag === "accountLevel"){
        this.navManager.updateForm({
            'updateInfinityUserSuccess': res,
          'isLoading': true
        },"frmFeaturePermissions");
      }
      if(this.updateFlag === "globalLevel"){
        this.navManager.updateForm({
            'updateInfinityUserSuccess': res,
          'isLoading': true
        },"frmNonAccountLevelFeature");
      }
      if(this.updateFlag === "limits"){
        this.navManager.updateForm({
            'updateInfinityUserSuccess': res,
          'isLoading': true
        },"frmTransactionLimits");
      }
    };
    BusinessBankingPresentationController.prototype.updateInfinityUserFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'updateInfinityUserFailure': errmsg,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.createCustomRole = function(userManagementData) {
      let companyList = [];
        userManagementData = JSON.parse(JSON.stringify(userManagementData));
        userManagementData.companyList.map(company => {
                let accounts = [], flag = false;
                company.accounts.map(account => {
                    if (account.isEnabled.toString() === 'true') {
                        accounts.push(account);
                      flag = true;
                    }
                });
                company.accounts = accounts;
          if(flag){
                companyList.push(company);
          }
        });
        userManagementData.companyList = companyList;
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        this.businessUserManager.createInfinityCustomRole(userManagementData, this.createInfinityCustomRoleSuccessCallBack.bind(this), this.createInfinityCustomRoleFailureCallBack.bind(this));
    };
    BusinessBankingPresentationController.prototype.createInfinityCustomRoleSuccessCallBack = function(res) {
        this.createCustomRoleSuccess = res;
        this.navManager.updateForm({
            'createCustomRoleSuccess': res,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.createInfinityCustomRoleFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'createCustomRoleFailure': errmsg,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.updateCustomRole = function(userManagementData,roleflag) {
      this.roleflag = roleflag;  
      userManagementData = JSON.parse(JSON.stringify(userManagementData));
        for (var i in userManagementData) {
            if (typeof(userManagementData[i]) === 'object') {
                userManagementData[i] = JSON.stringify(userManagementData[i]);
            }
        }
        applicationManager.getNavigationManager().setCustomInfo("accountAccessEdit",roleflag);
        this.businessUserManager.updateInfinityCustomRole(userManagementData, this.updateInfinityCustomRoleSuccessCallBack.bind(this), this.updateInfinityCustomRoleFailureCallBack.bind(this));
    };
//     BusinessBankingPresentationController.prototype.updateInfinityCustomRoleSuccessCallBack = function(res) {
//         this.updateCustomRoleSuccess = res;
//         this.navManager.updateForm({
//             'updateCustomRoleSuccess': res,
//           'isLoading': false
//         });
//     };
  BusinessBankingPresentationController.prototype.updateInfinityCustomRoleSuccessCallBack = function(res) {
        this.updateCustomRoleSuccess = res;
      if(this.roleflag === "accountAccess"){
        this.navManager.updateForm({
          'updateInfinityRoleSuccess': res,
          'isLoading': true
        },"frmBBAccountAccessAndRole");
      }
      if(this.roleflag === "accountLevel"){
        this.navManager.updateForm({
          'updateInfinityRoleSuccess': res,
          'isLoading': true
        },"frmFeaturePermissions");
      }
      if(this.roleflag === "globalLevel"){
        this.navManager.updateForm({
          'updateInfinityRoleSuccess': res,
          'isLoading': true
        },"frmNonAccountLevelFeature");
      }
      if(this.roleflag === "limits"){
        this.navManager.updateForm({
          'updateInfinityRoleSuccess': res,
          'isLoading': true
        },"frmTransactionLimits");
      }
    };

    BusinessBankingPresentationController.prototype.updateInfinityCustomRoleFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'updateCustomRoleFailure': errmsg,
          'isLoading': false
        });
    };
    BusinessBankingPresentationController.prototype.setUSMToLoggedInUserData = function(errmsg) {
        this.userPermissionFlow = OLBConstants.USER_MANAGEMENT_TYPE.SKIP;
        let data = JSON.parse(JSON.stringify(this.loggedInUserData));
        data.userDetails = this.userManagementData.userDetails;
        data.companyList = data.companyList.map(company => {
            company.accounts = company.accounts.map(account => {
                account.isEnabled = false;
                return account;
            });
            company.isEnabled = false;
            company.userRole = '';
            company.roleId = '';
            return company;
        });
		let eligible = {};
		
		//filter out companies with appropriate permissions
		data.companyList = data.companyList.filter(company=>{
			eligible[company.cif] = this.isEligible(company.cif);
			return eligible[company.cif];
		});
		data.accountLevelPermissions = data.accountLevelPermissions.filter(company=>{
			return eligible[company.cif];
		});
		data.globalLevelPermissions = data.globalLevelPermissions.filter(company=>{
			return eligible[company.cif];
		});
		data.transactionLimits = data.transactionLimits.filter(company=>{
			return eligible[company.cif];
		});
		
        this.userManagementData = data;
        this.initUserManagementData = JSON.parse(JSON.stringify(data));
    };

    BusinessBankingPresentationController.prototype.setUSMForCopy = function(errmsg) {
        var scope = this;
        this.userPermissionFlow = OLBConstants.USER_MANAGEMENT_TYPE.COPY;
        let data = JSON.parse(JSON.stringify(this.userManagementData));
        if (data.hasOwnProperty('userDetails')) {
            delete data["userDetails"];
        }
        var obj = {
            "customRoleName": scope.customRoleName,
            "description": scope.customRoleName
        };
        data["customRoleDetails"] = obj;
        this.userManagementData = data;
        this.initUserManagementData = JSON.parse(JSON.stringify(data));
    };

    BusinessBankingPresentationController.prototype.setUSMForSkip = function(errmsg) {
        var scope = this;
        this.userPermissionFlow = OLBConstants.USER_MANAGEMENT_TYPE.SKIP;
        let data = JSON.parse(JSON.stringify(this.loggedInUserData));
        if (data.hasOwnProperty('userDetails')) {
            delete data["userDetails"];
        }
        var obj = {
            "customRoleName": scope.customRoleName,
            "description": scope.customRoleName
        };
        data["customRoleDetails"] = obj;
        data.companyList = data.companyList.map(company => {
            company.accounts = company.accounts.map(account => {
                account.isEnabled = false;
                return account;
            });
            company.isEnabled = false;
            company.userRole = '';
            company.roleId = '';
            return company;
        });
		let eligible = {};
		//filter out companies with appropriate permissions
		data.companyList = data.companyList.filter(company=>{
			eligible[company.cif] = this.isEligible(company.cif);
			return eligible[company.cif];
		});
		data.accountLevelPermissions = data.accountLevelPermissions.filter(company=>{
			return eligible[company.cif];
		});
		data.globalLevelPermissions = data.globalLevelPermissions.filter(company=>{
			return eligible[company.cif];
		});
		data.transactionLimits = data.transactionLimits.filter(company=>{
			return eligible[company.cif];
		});
		
        this.userManagementData = data;
        this.generateTransactionLimits(JSON.parse(JSON.stringify(this.userManagementData.accountLevelPermissions)));
        this.sortUserManagementData();
        this.initUserManagementData = JSON.parse(JSON.stringify(data));
    };

    BusinessBankingPresentationController.prototype.getOrgGrpActionLimit = function(companyList) {
        let cif = '',
            groupId = '',
            serviceDefinitionId = '',
            count = 0;
        for (let i = 0; i < companyList.length; i++) {
            if (companyList[i].isEnabled.toString() === 'true') {
                //if (this.orgGroupFeatures.hasOwnProperty(companyList[i].cif)) {
                    if(companyList[i].coreCustomerId === undefined){
                        companyList[i].coreCustomerId = companyList[i].cif;
                      }
                        if (this.orgGroupFeatures.hasOwnProperty(companyList[i].coreCustomerId)) {
                          if(companyList[i].cif === undefined){
                            companyList[i].cif = companyList[i].coreCustomerId;
                          }
                    if (this.orgGroupFeatures[companyList[i].cif].hasOwnProperty(companyList[i].roleId)) {
                         cif += '||' + companyList[i].coreCustomerId;
                        groupId += '||' + companyList[i].roleId;
                        serviceDefinitionId += '||' + companyList[i].serviceDefinitionId;
                        count++;
                    }
                } else {
                    cif += '||' + companyList[i].coreCustomerId;
                    groupId += '||' + companyList[i].roleId;
                    serviceDefinitionId += '||' + companyList[i].serviceDefinitionId;
                    count++;
                }
            }
        }
        cif = cif.substr(2);
        groupId = groupId.substr(2);
        serviceDefinitionId = serviceDefinitionId.substr(2);
        if (cif === '' || groupId === '') {
            this.createUserManagementData(companyList);
            this.navManager.updateForm({
                'createUserManagementDataSuccess': "Success"
            });
        }
        var params = {};
                var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
                if (isAddToEntityFlow === "addToEntity") {
                    var navManager = applicationManager.getNavigationManager();
                    var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
                    params = {
                        'coreCustomerId': cif,
                        'roleId': groupId,
                        'value': count,
                        "legalEntityId": entityId
                    };
                }else {
                 params = {
                    'coreCustomerId': cif,
                    'roleId': groupId,
                    'value': count
                };
            }
    //BusinessBankingPresentationController.prototype.getOrgGrpActionLimitSuccessCallBack = function(cif, groupId, features, companyList) {
         //var paramValue = {"coreCustomerRoleIdList":JSON.stringify(params)};
         this.businessUserManager.getOrgGrpActionLimit(params, companyList, this.getOrgGrpActionLimitSuccessCallBack.bind(this), this.getOrgGrpActionLimitFailureCallBack.bind(this));
        };
        BusinessBankingPresentationController.prototype.getOrgGrpActionLimitSuccessCallBack = function(cif, groupId, features,companyList) {
        cif = cif.split('||');
        groupId = groupId.split('||');
        let ci = 0,
            gi = 0;
        for (let i = 0; i < features.length; i++) {
            if (this.orgGroupFeatures.hasOwnProperty(cif[ci])) {
                if (!this.orgGroupFeatures[cif[ci]].hasOwnProperty(groupId[gi])) {
                    this.orgGroupFeatures[cif[ci]][groupId[gi]] = features[i];
                }
            } else {
                this.orgGroupFeatures[cif[ci]] = {};
                this.orgGroupFeatures[cif[ci]][groupId[gi]] = features[i];
            }
            if (i < cif.length) {
                ci++;
            }
            if (i < groupId.length) {
                gi++;
            }
        }
        this.createUserManagementData(companyList);
        this.navManager.updateForm({
            'createUserManagementDataSuccess': "Success"
        });
    };
    BusinessBankingPresentationController.prototype.getOrgGrpActionLimitFailureCallBack = function(errmsg) {
        this.navManager.updateForm({
            'createUserManagementDataFailure': errmsg
        });
    };
    BusinessBankingPresentationController.prototype.getActions = function(actions) {
        let userManagementActns = [
            [],
            [],
            []
        ];
        actions.map(action => {
            action.isEnabled = true;
            if (action.actionLevelId === "ACCOUNT_LEVEL") {
                if (action.typeId == "NON_MONETARY") {
                    userManagementActns[0].push(action);
                } else if (action.typeId == "MONETARY") {
                    let actionClone = JSON.parse(JSON.stringify(action));
                    delete actionClone.limits;
                    userManagementActns[0].push(actionClone);
                    let temp = {};
                    for (var i = 0; i < action.limits.length; i++) {
                        temp[action.limits[i].id] = action.limits[i].value;
                    }
                    if (!temp.hasOwnProperty("PRE_APPROVED_DAILY_LIMIT")) {
                        action.limits.push({
                            "id": "PRE_APPROVED_DAILY_LIMIT",
                            "value": "0.00"
                        });
                    }
                    if (!temp.hasOwnProperty("AUTO_DENIED_DAILY_LIMIT")) {
                        action.limits.push({
                            "id": "AUTO_DENIED_DAILY_LIMIT",
                            "value": temp.DAILY_LIMIT
                        });
                    }
                    if (!temp.hasOwnProperty("PRE_APPROVED_WEEKLY_LIMIT")) {
                        action.limits.push({
                            "id": "PRE_APPROVED_WEEKLY_LIMIT",
                            "value": "0.00"
                        });
                    }
                    if (!temp.hasOwnProperty("PRE_APPROVED_TRANSACTION_LIMIT")) {
                        action.limits.push({
                            "id": "PRE_APPROVED_TRANSACTION_LIMIT",
                            "value": "0.00"
                        });
                    }
                    if (!temp.hasOwnProperty("AUTO_DENIED_WEEKLY_LIMIT")) {
                        action.limits.push({
                            "id": "AUTO_DENIED_WEEKLY_LIMIT",
                            "value": temp.WEEKLY_LIMIT
                        });
                    }
                    if (!temp.hasOwnProperty("AUTO_DENIED_TRANSACTION_LIMIT")) {
                        action.limits.push({
                            "id": "AUTO_DENIED_TRANSACTION_LIMIT",
                            "value": temp.MAX_TRANSACTION_LIMIT
                        });
                    }
                    userManagementActns[2].push(action);
                }
            } else if (action.actionLevelId === "CUSTOMERID_LEVEL") {
                userManagementActns[1].push(action);
            }
        });
        return userManagementActns;
    };

    BusinessBankingPresentationController.prototype.getFeatureActions = function(orgGrpActionLimits) {
        let userManagementFAs = [
            [],
            [],
            []
        ];
        orgGrpActionLimits.features.map(orgGrpActionLimit => {
            let orgGrpActions = this.getActions(orgGrpActionLimit.actions);
            delete orgGrpActionLimit.actions;
            let orgGrpActionLimit0 = JSON.parse(JSON.stringify(orgGrpActionLimit));
            let orgGrpActionLimit1 = JSON.parse(JSON.stringify(orgGrpActionLimit));
            if (orgGrpActions[0].length > 0) {
                orgGrpActionLimit0.permissions = orgGrpActions[0];
                userManagementFAs[0].push(orgGrpActionLimit0);
            }
            if (orgGrpActions[1].length > 0) {
                orgGrpActionLimit1.permissions = orgGrpActions[1];
                userManagementFAs[1].push(orgGrpActionLimit1);
            }
            if (orgGrpActions[2].length > 0) {
                for (let n = 0; n < orgGrpActions[2].length; n++) {
                    let orgGrpActionLimit2 = JSON.parse(JSON.stringify(orgGrpActionLimit));
                    for (let key in orgGrpActions[2][n]) {
                        orgGrpActionLimit2[key] = orgGrpActions[2][n][key];
                    }
                    userManagementFAs[2].push(orgGrpActionLimit2);
                }
            }

        });
        return userManagementFAs;
    };

    BusinessBankingPresentationController.prototype.createUserManagementDataForCompany = function(company, orgGrpActionLimit) {
        let featureactions = this.getFeatureActions(orgGrpActionLimit);
        let userManagementData = {};
        let accountLevelPermissions = JSON.parse(JSON.stringify(company));
        let globalLevelPermissions = JSON.parse(JSON.stringify(company));
        let transactionLimits = JSON.parse(JSON.stringify(company));
        globalLevelPermissions.features = featureactions[1];
        delete globalLevelPermissions.accounts;
        for (let j = 0; j < company.accounts.length; j++) {
            accountLevelPermissions.accounts[j].featurePermissions = featureactions[0];
            transactionLimits.accounts[j].featurePermissions = featureactions[2];
        }
        userManagementData["accountLevelPermissions"] = accountLevelPermissions;
        userManagementData["globalLevelPermissions"] = globalLevelPermissions;
        userManagementData["transactionLimits"] = transactionLimits;
        return userManagementData;
    };

    BusinessBankingPresentationController.prototype.createUserManagementData = function(companyList) {
        for (let i = 0; i < companyList.length; i++) {
            let j;
//             for (j = 0; j < this.userManagementData.companyList.length; j++) {
//                 if (companyList[i].cif === this.userManagementData.companyList[j].cif) {
//                     break;
//                 }
//             }

//             //enabled a company
           if (companyList[i].isEnabled.toString() === 'true' /*&& this.userManagementData.companyList[j].isEnabled.toString() === 'false'*/) {
                let k;
                //delete companies accountLevelPermissions
                for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                  if(this.userManagementData.accountLevelPermissions[k].cif === undefined)
                    {
                      this.userManagementData.accountLevelPermissions[k].cif = this.userManagementData.accountLevelPermissions[k].coreCustomerId;
                    }
                    if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                        this.userManagementData.accountLevelPermissions.splice(k, 1);
                        break;
                    }
                }
                //delete companies globalLevelPermissions
                for (k = 0; k < this.userManagementData.globalLevelPermissions.length; k++) {
                  if(this.userManagementData.globalLevelPermissions[k].cif === undefined)
                    {
                      this.userManagementData.globalLevelPermissions[k].cif = this.userManagementData.globalLevelPermissions[k].coreCustomerId;
                    }
                    if (companyList[i].cif === this.userManagementData.globalLevelPermissions[k].cif) {
                        this.userManagementData.globalLevelPermissions.splice(k, 1);
                        break;
                    }
                }
                //delete companies transactionLimits
                for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                  if(this.userManagementData.transactionLimits[k].cif === undefined)
                    {
                      this.userManagementData.transactionLimits[k].cif = this.userManagementData.transactionLimits[k].coreCustomerId;
                    }
                    if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                        this.userManagementData.transactionLimits.splice(k, 1);
                        break;
                    }
                }
let orgGrpActionLimit = JSON.parse(JSON.stringify(this.orgGroupFeatures[companyList[i].coreCustomerId][companyList[i].roleId]));
                let enabled = JSON.parse(JSON.stringify(companyList[i]));
                enabled.accounts = enabled.accounts.filter(account => {
                    return account.isEnabled.toString() === 'true';
                });
                let res = this.createUserManagementDataForCompany(enabled, orgGrpActionLimit);
                this.userManagementData.accountLevelPermissions.push(res.accountLevelPermissions);
                this.userManagementData.globalLevelPermissions.push(res.globalLevelPermissions);
                this.userManagementData.transactionLimits.push(res.transactionLimits);
            }
            //disabled a company
            else if (companyList[i].isEnabled.toString() === 'false') {
                let k;
                //delete companies accountLevelPermissions
                for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                    if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                        this.userManagementData.accountLevelPermissions.splice(k, 1);
                        break;
                    }
                }
                //delete companies globalLevelPermissions
                for (k = 0; k < this.userManagementData.globalLevelPermissions.length; k++) {
                    if (companyList[i].cif === this.userManagementData.globalLevelPermissions[k].cif) {
                        this.userManagementData.globalLevelPermissions.splice(k, 1);
                        break;
                    }
                }
                //delete companies transactionLimits
                for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                    if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                        this.userManagementData.transactionLimits.splice(k, 1);
                        break;
                    }
                }
            }
            //changed a role of a company
            else if (companyList[i].roleId !== this.userManagementData.companyList[j].roleId) {
                let k;
                let orgGrpActionLimit = JSON.parse(JSON.stringify(this.orgGroupFeatures[companyList[i].cif][companyList[i].roleId]));
                let enabled = JSON.parse(JSON.stringify(companyList[i]));
                enabled.accounts = enabled.accounts.filter(account => {
                    return account.isEnabled.toString() === 'true';
                });
                let res = this.createUserManagementDataForCompany(enabled, orgGrpActionLimit);
                //change companies accountLevelPermissions
                for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                    if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                        this.userManagementData.accountLevelPermissions[k] = res.accountLevelPermissions;
                        break;
                    }
                }

                //change companies globalLevelPermissions
                for (k = 0; k < this.userManagementData.globalLevelPermissions.length; k++) {
                    if (companyList[i].cif === this.userManagementData.globalLevelPermissions[k].cif) {
                        this.userManagementData.globalLevelPermissions[k] = res.globalLevelPermissions;
                        break;
                    }
                }

                //change companies transactionLimits
                for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                    if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                        this.userManagementData.transactionLimits[k] = res.transactionLimits;
                        break;
                    }
                }

            }
            //if any accounts inside company are enabled or disabled
            else if (companyList[i].isEnabled.toString() === 'true' && this.userManagementData.companyList[j].isEnabled.toString() === 'true') {
                let l;
                let enabledAcc = [];
                for (l = 0; l < companyList[i].accounts.length; l++) {
                    let m;
                    for (m = 0; m < this.userManagementData.companyList[j].accounts.length; m++) {
                        if (companyList[i].accounts[l].accountId === this.userManagementData.companyList[j].accounts[m].accountId) {
                            break;
                        }
                    }
                    //if account is enabled

                    if (companyList[i].accounts[l].isEnabled.toString() === 'true' && this.userManagementData.companyList[j].accounts[m].isEnabled.toString() === 'false') {
                        let k, n;
                        for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                            if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                                for (n = 0; n < this.userManagementData.accountLevelPermissions[k].accounts.length; n++) {
                                    if (companyList[i].accounts[l].accountId === this.userManagementData.accountLevelPermissions[k].accounts[n].accountId) {
                                        this.userManagementData.accountLevelPermissions[k].accounts.splice(n, 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                            if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                                for (n = 0; n < this.userManagementData.transactionLimits[k].accounts.length; n++) {
                                    if (companyList[i].accounts[l].accountId === this.userManagementData.transactionLimits[k].accounts[n].accountId) {
                                        this.userManagementData.transactionLimits[k].accounts.splice(n, 1);
                                        break;
                                    }
                                }

                                break;
                            }
                        }
                        enabledAcc.push(companyList[i].accounts[l].accountId);
                    }
                    //if account is disabled
                    else if (companyList[i].accounts[l].isEnabled.toString() === 'false') {
                        let k, n;
                        for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                            if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                                for (n = 0; n < this.userManagementData.accountLevelPermissions[k].accounts.length; n++) {
                                    if (companyList[i].accounts[l].accountId === this.userManagementData.accountLevelPermissions[k].accounts[n].accountId) {
                                        this.userManagementData.accountLevelPermissions[k].accounts.splice(n, 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                            if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                                for (n = 0; n < this.userManagementData.transactionLimits[k].accounts.length; n++) {
                                    if (companyList[i].accounts[l].accountId === this.userManagementData.transactionLimits[k].accounts[n].accountId) {
                                        this.userManagementData.transactionLimits[k].accounts.splice(n, 1);
                                        break;
                                    }
                                }

                                break;
                            }
                        }
                    }
                }
                if (enabledAcc.length > 0) {
                    let k, enabled = JSON.parse(JSON.stringify(companyList[i]));
                    enabled.accounts = enabled.accounts.filter(account => {
                        return enabledAcc.includes(account.accountId)
                    });
                    let orgGrpActionLimit = JSON.parse(JSON.stringify(this.orgGroupFeatures[companyList[i].cif][companyList[i].roleId]));
                    let res = this.createUserManagementDataForCompany(enabled, orgGrpActionLimit);
                    for (k = 0; k < this.userManagementData.accountLevelPermissions.length; k++) {
                        if (companyList[i].cif === this.userManagementData.accountLevelPermissions[k].cif) {
                            this.userManagementData.accountLevelPermissions[k].accounts = this.userManagementData.accountLevelPermissions[k].accounts.concat(res.accountLevelPermissions.accounts);
                            break;
                        }
                    }
                    for (k = 0; k < this.userManagementData.transactionLimits.length; k++) {
                        if (companyList[i].cif === this.userManagementData.transactionLimits[k].cif) {
                            this.userManagementData.transactionLimits[k].accounts = this.userManagementData.transactionLimits[k].accounts.concat(res.transactionLimits.accounts);
                            break;
                        }
                    }
                }
            }
        }
        this.userManagementData.companyList = JSON.parse(JSON.stringify(companyList));
        this.generateTransactionLimits(JSON.parse(JSON.stringify(this.userManagementData.accountLevelPermissions)));
        this.sortUserManagementData();
        this.initUserManagementData = JSON.parse(JSON.stringify(this.userManagementData));
    }
    BusinessBankingPresentationController.prototype.generateTransactionLimits = function(accountLevelPermissions) {
        var activefeatures = {};
        accountLevelPermissions.map(company => {
            if(company.cif === undefined && company.companyName === undefined){
                company.cif = company.coreCustomerId;
                company.companyName = company.coreCustomerName;
              }
            activefeatures[company.cif] = {}
            company.accounts.map(account => {
                activefeatures[company.cif][account.accountId] = [];
                account.featurePermissions.map(featurePermission => {
                    let flag = false;
                    featurePermission.permissions.map(permission => {
                        if (permission.typeId === "MONETARY" && permission.isEnabled.toString() === 'true') {
                            activefeatures[company.cif][account.accountId].push(featurePermission.featureId + '$' + permission.actionId);
                        }
                    });
                });
            });
        });

        for (var i = 0; i < this.userManagementData.transactionLimits.length; i++) {
            if(this.userManagementData.transactionLimits[i].cif === undefined && this.userManagementData.transactionLimits[i].companyName === undefined){
                this.userManagementData.transactionLimits[i].cif = this.userManagementData.transactionLimits[i].coreCustomerId;
                this.userManagementData.transactionLimits[i].companyName = this.userManagementData.transactionLimits[i].coreCustomerName;
              }
          if(this.userManagementData.accountLevelPermissions[i].cif === undefined && this.userManagementData.accountLevelPermissions[i].companyName === undefined){
                this.userManagementData.accountLevelPermissions[i].cif = this.userManagementData.accountLevelPermissions[i].coreCustomerId;
                this.userManagementData.accountLevelPermissions[i].companyName = this.userManagementData.accountLevelPermissions[i].coreCustomerName;
              }
          if(this.userManagementData.globalLevelPermissions[i].cif === undefined && this.userManagementData.globalLevelPermissions[i].companyName === undefined){
                this.userManagementData.globalLevelPermissions[i].cif = this.userManagementData.globalLevelPermissions[i].coreCustomerId;
                this.userManagementData.globalLevelPermissions[i].companyName = this.userManagementData.globalLevelPermissions[i].coreCustomerName;
              }
          if(this.userManagementData.companyList[i].cif === undefined && this.userManagementData.companyList[i].companyName === undefined && this.userManagementData.companyList[i].serviceDefinition === undefined){
                this.userManagementData.companyList[i].cif = this.userManagementData.companyList[i].coreCustomerId;
                this.userManagementData.companyList[i].companyName = this.userManagementData.companyList[i].coreCustomerName;
                this.userManagementData.companyList[i].serviceDefinition = this.userManagementData.companyList[i].serviceDefinitionId;
              }
            var cif = this.userManagementData.transactionLimits[i].cif;
            var limitGroups = {};
            for (var j = 0; j < this.userManagementData.transactionLimits[i].accounts.length; j++) {
                var account = this.userManagementData.transactionLimits[i].accounts[j].accountId;
                for (var k = 0; k < this.userManagementData.transactionLimits[i].accounts[j].featurePermissions.length; k++) {
                    var feature = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].featureId;
                    var action = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].actionId;
                    if (activefeatures[cif][account].includes(feature + '$' + action)) {
                        this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].isEnabled = true;
                        var limitGroupId = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limitGroupId;
                        if (!limitGroups.hasOwnProperty(limitGroupId)) {
                            limitGroups[limitGroupId] = {
                                'limitGroupId': limitGroupId,
                                "limits": [{
                                        "id": "DAILY_LIMIT",
                                        "value": 0.0
                                    },
                                    {
                                        "id": "WEEKLY_LIMIT",
                                        "value": 0.0
                                    },
                                    {
                                        "id": "MAX_TRANSACTION_LIMIT",
                                        "value": 0.0
                                    }
                                ]
                            };
							if(this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].hasOwnProperty("limitGroupName"))
							{
								limitGroups[limitGroupId]["limitGroupName"] = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limitGroupName;
							}
							if(this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].hasOwnProperty("limitGroupDescription"))
							{
								limitGroups[limitGroupId]["limitGroupDescription"] = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limitGroupDescription;
							}
                        }
                        for (var l = 0; l < this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limits.length; l++) {
                            var id = this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limits[l].id;
                            if (id === 'WEEKLY_LIMIT') {
                                limitGroups[limitGroupId].limits[1].value += parseFloat(this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limits[l].value);
                            } else if (id === 'MAX_TRANSACTION_LIMIT') {
                                let value = parseFloat(this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limits[l].value);
                                if (limitGroups[limitGroupId].limits[2].value < value) {
                                    limitGroups[limitGroupId].limits[2].value = value;
                                }
                            } else if (id === 'DAILY_LIMIT') {
                                limitGroups[limitGroupId].limits[0].value += parseFloat(this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].limits[l].value);
                            }
                        }
                    } else {
                        this.userManagementData.transactionLimits[i].accounts[j].featurePermissions[k].isEnabled = false;
                    }
                }
            }
            var arr = [];
            for (var key in limitGroups) {
                arr.push(limitGroups[key]);
            }
            this.userManagementData.transactionLimits[i].limitGroups = arr;
        }
    };
    BusinessBankingPresentationController.prototype.intersect = function(loggedInUserData, selectedData, contractId) {
        loggedInUserData = JSON.parse(JSON.stringify(loggedInUserData));
        selectedData = JSON.parse(JSON.stringify(selectedData));
        let intersectData = {
            'companyList': [],
            'accountLevelPermissions': [],
            'globalLevelPermissions': [],
            'transactionLimits': [],
          'signatoryGroups' : []
        };
        //getting the list of cifs from loggedInUserData companyList 
        let loggedInUserCompanies = loggedInUserData.companyList.map(company => {
            if (contractId) {
                if (company.contractId === contractId && this.isEligible(company.cif)) {
                    return company.cif;
                }
            } else {
                if(this.isEligible(company.cif)){return company.cif};
            }
        });
        let commonCompanies = [];
        //populating common companies from selectedData to intersectData
        selectedData.companyList.map(company => {
            if (loggedInUserCompanies.includes(company.cif)) {
                intersectData.companyList.push(company);
                commonCompanies.push(company.cif);
            }
        });
        selectedData.accountLevelPermissions.map(company => {
            if (loggedInUserCompanies.includes(company.cif)) {
                intersectData.accountLevelPermissions.push(company);
            }
        });
        selectedData.globalLevelPermissions.map(company => {
            if (loggedInUserCompanies.includes(company.cif)) {
                intersectData.globalLevelPermissions.push(company);
            }
        });
        selectedData.transactionLimits.map(company => {
            if (loggedInUserCompanies.includes(company.cif)) {
                intersectData.transactionLimits.push(company);
            }
        });
      if(selectedData.signatoryGroups !== undefined){
        selectedData.signatoryGroups.map(company => {
          if (loggedInUserCompanies.includes(company.cif)) {
            intersectData.signatoryGroups.push(company);
          }
        });
      }
        //populating companies that are there in loggedInUserData but not in intersectData and disabling them
        loggedInUserData.companyList.map(company => {
            if (!commonCompanies.includes(company.cif) && this.isEligible(company.cif)) {
                if (contractId) {
                    if (company.contractId === contractId) {
                        company.accounts = company.accounts.map(account => {
                            account.isEnabled = false;
                            return account;
                        });
                        company.isEnabled = false;
                        company.userRole = '';
                        company.roleId = '';
                        intersectData.companyList.push(company);
                    }
                } else {
                    company.accounts = company.accounts.map(account => {
                        account.isEnabled = false;
                        return account;
                    });
                    company.isEnabled = false;
                    company.userRole = '';
                    company.roleId = '';
                    intersectData.companyList.push(company);
                }
            }
        });
        return intersectData;
    };

    BusinessBankingPresentationController.prototype.sortUserManagementData = function() {
        this.userManagementData.companyList = this.userManagementData.companyList.sort(function(a, b) {
            if (a.companyName > b.companyName) return 1;
            else return -1;
        });
        this.userManagementData.accountLevelPermissions = this.userManagementData.accountLevelPermissions.sort(function(a, b) {
            if (a.companyName > b.companyName) return 1;
            else return -1;
        });
        this.userManagementData.globalLevelPermissions = this.userManagementData.globalLevelPermissions.sort(function(a, b) {
            if (a.companyName > b.companyName) return 1;
            else return -1;
        });
        this.userManagementData.transactionLimits = this.userManagementData.transactionLimits.sort(function(a, b) {
            if (a.companyName > b.companyName) return 1;
            else return -1;
        });
    };

    //Custom role name duplicate check for Primary details page 
    BusinessBankingPresentationController.prototype.verifyCustomRoleName = function(custRoleNameVal) {
        this.navManager.updateForm({
            progressBar: true
        });
        var custRoleNameObj = {
            "name": custRoleNameVal
        }
        applicationManager.getBusinessUserManager().verifyCustomRoleName(custRoleNameObj, this.verifyCustomRoleNameSuccess.bind(this), this.verifyCustomRoleNameFailure.bind(this));
    };


    BusinessBankingPresentationController.prototype.verifyCustomRoleNameSuccess = function(response) {
        this.navManager.updateForm({
            "isDuplicateResponse": response,
            progressBar: false
        }, this.frmBBCreateCustomRoleForm);
    };

    BusinessBankingPresentationController.prototype.verifyCustomRoleNameFailure = function(errorResponse) {
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorResponse.errorMessage,
            progressBar: false
        })
    };
	BusinessBankingPresentationController.prototype.isEligible = function(cif) {
		let feature = "", permission = "";
		if(this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION){
		  feature = "USER_MANAGEMENT";
		  if(this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE){
			permission = "USER_MANAGEMENT_CREATE";
		  }
		  else{
			permission = "USER_MANAGEMENT_EDIT";
			//USER_MANAGEMENT_VIEW
		  }
		}
		else if(this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE){
		  feature = "CUSTOM_ROLES";
		  if(this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE){
			permission = "CUSTOM_ROLES_CREATE";
		  }
		  else {
			permission = "CUSTOM_ROLES_CREATE";
		  }
		}
		return applicationManager.getConfigurationManager().checkCompanyLevelPermission(cif, feature, permission);
	};
  /**
 * Method to navigate to user management dashboard and fetch list of users
 * @param {JSON} viewModel - consists context and parameters
 */

  BusinessBankingPresentationController.prototype.fetchAssociatedContractUsers = function (successCallBack,formName = this.frmBBUsersDashboardForm , failureCallBack = this.onServerError.bind(this)) {
    var params = {};
    if( kony.application.getCurrentForm().id !== formName) {
      var appName = _kony.mvc.getCurrentAppName();
		if(appName === "UserManagementMA")
            this.navManager.navigateTo(formName);
		else
			this.navManager.navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/"+formName});
    }
    this.navManager.updateForm({ "progressBar": true }, formName);
    applicationManager.getPaginationManager().resetValues();
    this.businessUserManager.getAssociatedContractUsers(params, successCallBack.bind(this,formName), failureCallBack.bind(this));
  };
  
  /** Need to add more fields when the service is called
     * Method to handle success response of fetch associated contract users
     * @param {object} viewModel - which consists of response from backend
     */
    BusinessBankingPresentationController.prototype.fetchAssociatedContractUsersSuccess = function(formName, viewModel) {
      this.navManager.updateForm({
        "allUsers": {
          users: viewModel,
          "isLoading": false,
        }
      }, formName);
    };
    BusinessBankingPresentationController.prototype.fetchEmailAndPhone = function(cust) {
        
        var custRoleNameObj ={
          "Customer_id" : cust
        }
        applicationManager.getBusinessUserManager().fetchEmailAndPhone(custRoleNameObj, this.fetchEmailAndPhoneSuccess.bind(this), this.fetchEmailAndPhoneFailure.bind(this));
    };


    BusinessBankingPresentationController.prototype.fetchEmailAndPhoneSuccess = function(response) {
        this.navManager.updateForm({
            "emailAndPhone": response,
            progressBar: false
        }, this.frmBBUsersDashboard);
    };

    BusinessBankingPresentationController.prototype.fetchEmailAndPhoneFailure = function(errorResponse) {
        this.navManager.updateForm({
            serverError: true,
            errorMessage: errorResponse.errorMessage,
            progressBar: false
        })
    };
    BusinessBankingPresentationController.prototype.getContractDetails = function(cust,autoSyncFlag) {
        this.autoSyncFlag = autoSyncFlag;
        this.navManager.updateForm({ progressBar: true }, this.frmBBUsersDashboard);
       this.initializeFlowConfigs("editUser");
           var custRoleNameObj ={
             "userId" : cust
           }
           applicationManager.getBusinessUserManager().getContractDetails(custRoleNameObj, this.getContractDetailsSuccess.bind(this), this.getContractDetailsFailure.bind(this));
       };
   
   
       BusinessBankingPresentationController.prototype.getContractDetailsSuccess = function(response) {
         if(this.autoSyncFlag === "autoSync"){
           this.navManager.updateForm({
             "contractDetails": response,
             progressBar: false
           }, "frmBBAccountAccessAndRole");
         }
         else{
           this.navManager.updateForm({
             "contractDetails": response,
             progressBar: false
           }, this.frmBBUsersDashboard);
         }
       };
   
       BusinessBankingPresentationController.prototype.getContractDetailsFailure = function(errorResponse) {
           this.navManager.updateForm({
               serverError: true,
               errorMessage: errorResponse.errorMessage,
               progressBar: false
           })
       };
       
       BusinessBankingPresentationController.prototype.getInfinityUserServiceDefsRoles = function(cust,contract) {
         this.navManager.updateForm({ progressBar: true }, "frmBBAccountAccessAndRole");
         var navMan = applicationManager.getNavigationManager();
         var createrolename = navMan.getCustomInfo("createroleManually");
         var addToEntityFlow = navMan.getCustomInfo("addToEntityFlow");
            if(createrolename === "createroleManually" )
            {
                this.initializeFlowConfigs("createRole");
            }
            else
            {
              if(addToEntityFlow){
                this.initializeFlowConfigs("addToEntity");
              }
              else{
                this.initializeFlowConfigs("createUser");
              }
            } 
            var custRoleNameObj = {};
            var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
            if (isAddToEntityFlow === "addToEntity") {
                var navManager = applicationManager.getNavigationManager();
                var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
                custRoleNameObj = {
                    "id": cust,
                    "legalEntityId": entityId
                };
            }else {
             custRoleNameObj = {
                "id": cust,
				"contractId": contract
            }
           }
         applicationManager.getBusinessUserManager().getInfinityUserServiceDefsRoles(custRoleNameObj, this.getInfinityUserServiceDefsRolesSuccess.bind(this), this.getInfinityUserServiceDefsRolesFailure.bind(this));
       };
   
   
     BusinessBankingPresentationController.prototype.getInfinityUserServiceDefsRolesSuccess = function(response) {
   
       let navManager = applicationManager.getNavigationManager();
       navManager.setCustomInfo("userDetails", response.userDetails);
       this.navManager.updateForm({
         "infinityUserServiceDefsRoles": response,
         progressBar: false
       }, "frmBBAccountAccessAndRole");
   
     };
   
       BusinessBankingPresentationController.prototype.getInfinityUserServiceDefsRolesFailure = function(errorResponse) {
           this.navManager.updateForm({
               serverError: true,
               errorMessage: errorResponse.errorMessage,
               progressBar: false
           })
       };
       
       BusinessBankingPresentationController.prototype.getInfinityUserAccounts = function(cust,contract,infinityAccFlag) {
         this.infinityAccFlag = infinityAccFlag;
         var custRoleNameObj = {};
         this.navManager.updateForm({ progressBar: true }, this.frmBBUsersDashboard);
         var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
                 if (isAddToEntityFlow === "addToEntity") {
                     var navManager = applicationManager.getNavigationManager();
                     var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
                         custRoleNameObj = {
                         "userId": cust,
                         "legalEntityId": entityId
                         }
                  }else {
                  custRoleNameObj = {
                     "userId": cust,
					 "contractId":contract
                 }
               }
           applicationManager.getBusinessUserManager().getInfinityUserAccounts(custRoleNameObj, this.getInfinityUserAccountsSuccess.bind(this), this.getInfinityUserAccountsFailure.bind(this));
       };
   
   
       BusinessBankingPresentationController.prototype.getInfinityUserAccountsSuccess = function(responseInput) {
        var responseFilter = function(inp){
            try{
                let out = JSON.parse(JSON.stringify(inp));
                var filterAccounts = function (input) {
                    try {
                      let accountData = JSON.parse(JSON.stringify(input));
                      let filteredAccountData = accountData.filter(item =>  (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
                      return filteredAccountData;
                    } catch(err){
                      return input;
                    }
                  };
                for(let i = 0;i<out["contracts"].length;i++) {
                    for(let j = 0;j<out["contracts"][i]["contractCustomers"].length;j++) {
                        out["contracts"][i]["contractCustomers"][j]["coreCustomerAccounts"] = filterAccounts(out["contracts"][i]["contractCustomers"][j]["coreCustomerAccounts"]);
                    }
                }
                return out;
            } catch(err) {
                return inp;
            }
        };
        let response = responseFilter(responseInput);
         if(this.infinityAccFlag === "autoSync"){
           this.navManager.updateForm({
             "userAccounts": response,
             progressBar: false
           }, "frmBBAccountAccessAndRole");
         }
         else if(this.infinityAccFlag === "skipFlow"){
           this.navManager.updateForm({
             "getAccounts": response,
             progressBar: false
           }, "frmBBAccountAccessAndRole");
         }
         else{
           this.navManager.updateForm({
             "userAccounts": response,
             progressBar: false
           }, this.frmBBUsersDashboard);
         }
       };
   
       BusinessBankingPresentationController.prototype.getInfinityUserAccountsFailure = function(errorResponse) {
           this.navManager.updateForm({
               serverError: true,
               errorMessage: errorResponse.errorMessage,
               progressBar: false
           })
       };
     
     BusinessBankingPresentationController.prototype.getInfinityUserData = function(userId,contractId,coreCustomerId,flag) {
       this.navManager.updateForm({ progressBar: true }, "frmConfirmAndAck");
           this.flag = flag;
       this.userIdEditFlow = userId;
       var custRoleNameObj ={
         "id": userId,
         "contractId": contractId,
         "coreCustomerId": coreCustomerId
       }
           applicationManager.getBusinessUserManager().getInfinityUserData(custRoleNameObj, this.getInfinityUserDataSuccess.bind(this), this.getInfinityUserDataFailure.bind(this));
       };
       BusinessBankingPresentationController.prototype.getInfinityUserDataSuccess = function(response) {
        this.userManagementData = response;
        this.userManagementData.companyList = this.userManagementData.companyList.map(company => {
          let flag = false;
          company.accounts.forEach(account=>{
            flag = flag || account.isEnabled.toString() === 'true';
          });
          company.isEnabled = flag;
          return company;
        });
        if (Array.isArray(this.userManagementData.userDetails)) {
          this.userManagementData.userDetails = this.userManagementData.userDetails[0];
        }
        this.userManagementData.userDetails.id = this.userIdEditFlow;
        this.sortUserManagementData();
        // this.generateTransactionLimits(JSON.parse(JSON.stringify(userManagementData.accountLevelPermissions)));
        this.initUserManagementData = JSON.parse(JSON.stringify(response));
        if(this.flag === "accountAccess"){
          this.navManager.updateForm({
            "infinityUserData": response,
            progressBar: true
          }, "frmConfirmAndAck");
        }
        else if(this.flag === "accountPermissionLevel"){
          this.navManager.updateForm({
            "setDataForAccountDropDown": response,
            progressBar: true
          }, "frmConfirmAndAck");
        }
        else if(this.flag === "otherPermissionLevel"){
          this.navManager.updateForm({
            "setDataForOtherDropDown": response,
            progressBar: true
          }, "frmConfirmAndAck");
        }
        else if(this.flag === "limits"){
          this.navManager.updateForm({
            "setDataForLimits": response,
            progressBar: true
          }, "frmConfirmAndAck");
        }
        else if(this.flag === "autoSync"){
          this.userManagementData = response;
          this.navManager.updateForm({
            "autoSyncAccounts" : response,
            progressBar: true
          }, "frmConfirmAndAck");
        }
      };
  
      BusinessBankingPresentationController.prototype.getInfinityUserDataFailure = function(errorResponse) {
          this.navManager.updateForm({
              serverError: true,
              errorMessage: errorResponse.errorMessage,
              progressBar: false
          })
      };
    
BusinessBankingPresentationController.prototype.getExistingUserDetails = function(userId,contractId,coreCustomerId) {
       //this.navManager.updateForm({ progressBar: true }, "frmConfirmAndAck");
           //this.flag = flag;
       //this.userIdEditFlow = userId;
       var custRoleNameObj ={
         "id": userId,
         "contractId": contractId,
         "coreCustomerId": coreCustomerId
       }
           applicationManager.getBusinessUserManager().getInfinityUserData(custRoleNameObj, this.getUserDetailsSuccess.bind(this), this.getUserDetailsFailure.bind(this));
       };
       BusinessBankingPresentationController.prototype.getUserDetailsSuccess = function(response) {
        //this.userManagementData = response;   
          this.navManager.updateForm({
            "userDetailsSuccess" : response,
            progressBar: true
          }, "frmCreateUserManually");     
      };
  
      BusinessBankingPresentationController.prototype.getUserDetailsFailure = function(errorResponse) {
          this.navManager.updateForm({
              serverError: true,
              errorMessage: errorResponse.errorMessage,
              progressBar: false
          })
      };
    /** 
     * This function will return the transform object value which can used to mirror the image for Arabic Locale
     * 
     */
    BusinessBankingPresentationController.prototype.getImgTransformObj = function() {
        var imgTransformObj = kony.ui.makeAffineTransform();
        if (kony.i18n.getCurrentLocale() === "ar_AE") {
          imgTransformObj.rotate(180);
        } else {
          imgTransformObj.rotate(0);
        }
        return imgTransformObj;
    };

    return BusinessBankingPresentationController;
});