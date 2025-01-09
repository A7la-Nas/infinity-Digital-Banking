define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();

    return {
		//Type your controller code here 
        initActions: function() {
            var scopeObj = this;
            this.view.preShow = this.preShowActions;
            this.view.postShow = this.postShowActions;
            this.view.btnCancel.onClick = this.navtoFrmBack;

            this.view.btnCheckAvailability.onClick = this.checkDuplicateCustRoleName.bind(this);
            this.view.tbxRoleName.onKeyUp = this.onCustRoleNameonKeyUp.bind(this);
            this.view.tbxRoleName.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\"\\";
            this.view.btnCheckAvailability.setVisibility(true);
            this.view.flxAvailabilityStatus.setVisibility(false);
            if (this.view.tbxRoleName.text.length > 0) {
                this.view.btnCheckAvailability.setEnabled(true);
                this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_ENABLED;
            } else {
                this.view.btnCheckAvailability.setEnabled(false);
                this.view.btnCheckAvailability.skin = "sknBtn72727215pxSSPBgf8f7f8";
            }
          
          this.view.SegCustomRoles.onRowClick = function() {
            scopeObj.view.flxLeftContainer.setVisibility(true);
            scopeObj.RoleOrUserSelected(scopeObj.view.SegCustomRoles, scopeObj.view.SegExistingUsers);
          };
          this.view.SegExistingUsers.onRowClick = function() {
            scopeObj.view.flxLeftContainer.setVisibility(true);
            scopeObj.RoleOrUserSelected(scopeObj.view.SegExistingUsers, scopeObj.view.SegCustomRoles);
            
          };
          
          this.view.TabSearchBarNewCopy.tbxSearch.onTextChange = function() {
            scopeObj.searchRoleOrUser(scopeObj.view.TabSearchBarNewCopy.tbxSearch.text);
          };
            this.view.TabSearchBarNewCopy.flxClose.onClick = function() {
            scopeObj.view.TabSearchBarNewCopy.tbxSearch.text = "";
          };
            this.view.flxDropDown.onClick = function() {
            scopeObj.showOrHideCompanyList();
          };
            this.view.flxCloseDowntimeWarning.onClick = function(){
              scopeObj.view.flxMainWrapper.setVisibility(false);
            };
        },
      
        showOrHideCompanyList: function() {
            if (this.view.lblImgDropdown.text === "O") {
          this.view.lblImgDropdown.text = "P";
          this.view.companyListMenu.setVisibility(true);
            } else {
          this.view.lblImgDropdown.text = "O";
          this.view.companyListMenu.setVisibility(false);
        }
      },
      
      searchRoleOrUser: function(searchString) {
        if (searchString === "") {
          this.view.TabSearchBarNewCopy.flxClose.isVisible = false;
        } else {
          this.view.TabSearchBarNewCopy.flxClose.isVisible = true;
        }
        //sortField,sortType,searchParams,searchString
        let customRolesSearchResult = CommonUtilities.sortAndSearchJSON(this.customRoles, null, null, "customRoleName", searchString);
        this.showCustomRoles(customRolesSearchResult);
        let existingUsersSearchResult = CommonUtilities.sortAndSearchJSON(this.existingUsers, null, null, "userName", searchString);
        this.showExistingUsers(existingUsersSearchResult);
      },
        /**
		Method to check  for the availability of the role name being entered
        */
        checkDuplicateCustRoleName: function() {
            //isBack,event
            this.loadBusinessBankingModule().presentationController.verifyCustomRoleName(this.view.tbxRoleName.text);
        },

      /**
         * Method to load and returns the Business User Module Object
         * @returns {object} Method to load and returns the Business User Module Object
         */
      loadBusinessBankingModule: function() {
        return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
      },

      navtoFrmBack: function() {
            this.loadBusinessBankingModule().presentationController.initializePresentationController();
        this.loadBusinessBankingModule().presentationController.navigateToUserRoles();
      },

      preShowActions: function() {
            var scope = this;
        applicationManager.getConfigurationManager().skipFlag = false;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader', 'flxMain']);
            this.isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (this.isEditFlow) {
                scope.view.btnBackAccessRoles.setVisibility(true);
                scope.view.btnBackAccessRoles.onClick = function() {
                    scope.navToNextForm();
                };
                scope.view.btnCancel.setVisibility(false);
                scope.navigationFromCreateUser();
            } else {
                this.selectedContract = null;
                this.isManualFlow = true;
                this.view.btnBackAccessRoles.setVisibility(false);
                this.view.btnCancel.setVisibility(true);
                this.loadBusinessBankingModule().presentationController.getLoginUserPermissions();
                CommonUtilities.disableButton(this.view.btnProceedRoles); // to check if it is manual flow or copied permissions flow
                this.setDefaultView();
                this.setCustomRolesandUsersData();
            }
        this.view.flxFormContent.isVisible = true;
        this.view.flxTypeRadio1.onClick = this.onClickOfManualRoleSelection.bind(this);
        var navManager = applicationManager.getNavigationManager();
       	navManager.setCustomInfo('createroleManually', "createroleManually");
        this.view.flxTypeRadio2.onClick = this.onClickOfExistingRoleSelection.bind(this);
        this.view.btnProceedRoles.onClick = this.proceedToNextScreen;
        this.view.TabSearchBarNewCopy.tbxSearch.text = "";
        this.view.segAccountListActions.onRowClick = this.showSelectedContract.bind(this);
        this.imgArrowTransform = this.loadBusinessBankingModule().presentationController.getImgTransformObj();

        this.view.lblSelectedContract.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.SelectedContract");
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CreateCustomRoleprimarydet");
        this.view.lblViewAccountLevelPermissions.text = kony.i18n.getLocalizedString("i18n.customRole.ProvideInfoBelow");
        this.view.lblProvideUserDetails.text = kony.i18n.getLocalizedString("i18n.customRole.HowProvidePermRole");
        this.view.lblRetrieveExistingUser.text = kony.i18n.getLocalizedString("i18n.customRole.CopyPermission");
        this.view.lblCustomRoleName.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRoleName");
        this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
        this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
        this.view.btnCheckAvailability.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.CheckAvailability");
        this.view.lblSelectUserRole.text = kony.i18n.getLocalizedString("i18n.userManagement.selectUserRole");  
      },

        setCustomRolesandUsersData: function() {
            this.getExistingUsers();
            this.getCustomRoles();
        },

        showSelectedContract: function(param) {
            this.view.btnShowAllAccounts.text = param.selectedRowItems[0].lblUsers;
            this.view.lblImgDropdown.text = "O";
            this.view.companyListMenu.setVisibility(false);
            this.view.flxLeftContainer.setVisibility(false);
			applicationManager.getNavigationManager().setCustomInfo('currContractId',param.selectedRowItems[0].contractID);
            this.setCustomRolesandUsersData();
            this.selectedContract = param.selectedRowItems[0].contractID;
            this.loadBusinessBankingModule().presentationController.selectedContractId = param.selectedRowItems[0].contractID;
            this.loadBusinessBankingModule().presentationController.selectedContractName = param.selectedRowItems[0].lblUsers;
        },

        proceedToNextScreen: function() {
        var scope = this;

            if (this.isEditFlow) {
                scope.setUserManagementData();
                scope.navToNextForm();
            } else if (scope.permissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE_ROLE) {
                this.loadBusinessBankingModule().presentationController.setUserManagementFlow(OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE);
                this.loadBusinessBankingModule().presentationController.setUserNavigationType(OLBConstants.USER_MANAGEMENT_TYPE.CREATE);
                scope.setUserManagementData();
                scope.navToNextForm();
            } else if (scope.isManualFlow) {
                this.loadBusinessBankingModule().presentationController.setUserManagementFlow(OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE);
                this.loadBusinessBankingModule().presentationController.setUserNavigationType(OLBConstants.USER_MANAGEMENT_TYPE.CREATE);
                scope.loadBusinessBankingModule().presentationController.setUserPermissionFlow(OLBConstants.USER_MANAGEMENT_TYPE.SKIP);
                scope.loadBusinessBankingModule().presentationController.setUSMForSkip();
                scope.navToSkipForm();
            } else {
                this.loadBusinessBankingModule().presentationController.setUserManagementFlow(OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE);
                this.loadBusinessBankingModule().presentationController.setUserNavigationType(OLBConstants.USER_MANAGEMENT_TYPE.CREATE);
                scope.loadBusinessBankingModule().presentationController.setUserPermissionFlow(OLBConstants.USER_MANAGEMENT_TYPE.COPY);
                scope.loadBusinessBankingModule().presentationController.setUSMForCopy();
          scope.navToNextForm();
        }
      },
      
        setDefaultView: function() {
        this.view.tbxRoleName.text = "";
        this.view.flxAvailabilityStatus.setVisibility(false);
        this.view.btnCheckAvailability.setVisibility(true);
		this.onClickOfManualRoleSelection();
      },
      
        setUserManagementData: function() {
        var scope = this;
        var initialData = this.loadBusinessBankingModule().presentationController.userManagementData;
            if (initialData.hasOwnProperty('userDetails')) {
        delete initialData["userDetails"];
            }
        var obj = {
                "customRoleName": scope.customRoleName,
          "description": scope.customRoleName
        };
        initialData["customRoleDetails"] = obj;
        this.loadBusinessBankingModule().presentationController.userManagementData = initialData;
            this.loadBusinessBankingModule().presentationController.initUserManagementData = JSON.parse(JSON.stringify(initialData));
      },
      
      postShowActions: function() {
        var scope = this;  
      this.view.lblEnterManually.text = kony.i18n.getLocalizedString("i18n.userManagement.EnterManually");
      this.view.tbxRoleName.placeholder = kony.i18n.getLocalizedString("kony.tab.billpay.enterName");
      
      this.view.lblBasicPermission.text = kony.i18n.getLocalizedString("i18n.customRoles.basicPermissionDetails");
      this.view.lblAccountAccessRole.text = kony.i18n.getLocalizedString("i18n.UserManagement.AccountAccessAndRole");
      this.view.lblBankNameMain.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
      this.view.lblReferenceIdMain.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
      this.view.lblAccFeaturePermissionsMain.text = kony.i18n.getLocalizedString("i18n.userManagement.featurePermissions");
      this.view.segOtherFeaturePermissionsMain.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission");
      this.view.lbltransactionLimitsMain.text = kony.i18n.getLocalizedString("i18n.konybb.TransactionLimits");  
		this.view.TabSearchBarNewCopy.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.userManagement.searchForCutomRoleOrUser");
        this.view.lblAccountNameMain.text = kony.i18n.getLocalizedString("i18n.userManagement.Customer");
        this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
		this.permissionFlow = this.loadBusinessBankingModule().presentationController.userPermissionFlow;
            if (this.permissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE_ROLE) {
          scope.navigationFromCreateUser();
        }
        this.view.flxFormContent.minHeight = kony.os.deviceInfo().screenHeight - (this.view.flxFooter.info.frame.height + this.view.flxHeader.info.frame.height) + "dp";
        if (kony.application.getCurrentBreakpoint() <= 1024) {
          this.view.customheadernew.flxLogoAndActionsWrapper.width = "950dp";
          this.view.customheadernew.flxMenuWrapper.width = "950dp";
        }
        else if (kony.application.getCurrentBreakpoint() === 1366) {
          this.view.flxUserDetailsType.height = "150dp";
        }
        else {
          this.view.flxUserDetailsType.height = "115dp";
        }
        this.view.forceLayout();
      },

        navigationFromCreateUser: function() {
        var data = this.loadBusinessBankingModule().presentationController.userManagementData;
        this.view.btnShowAllAccounts.text = data.companyList[0].companyName;
        this.view.flxAccountsRightContainer.setEnabled(false);
        this.view.flxUserDetailsType.setVisibility(false);
        this.view.flxCopyPermissionsContent.setVisibility(false);
        
      },
      
        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if(context.roleData){
              let roleData = context.roleData;
              this.view.tbxRoleName.text = roleData.roleName;
              this.loadBusinessBankingModule().presentationController.verifyCustomRoleName(roleData.roleName);
            }
            if (context.createNewCustomRole) {
              CommonUtilities.disableButton(this.view.btnProceedRoles);
                this.showCreateTemplateUI(null, context.onCancel);
              FormControllerUtility.hideProgressBar(this.view);
            }

            if (context.userObject) {
                this.showRolesFromUser(context.userObject);
              CommonUtilities.enableButton(this.view.btnProceedRoles);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.customRoleDetailsSuccess) {
              this.showPermissionDetails(context.customRoleDetailsSuccess);
              FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.serverError === true) {
                this.setServerError({
                    show: true,
                    errorMessage: context.errorMessage
                });
            } else if (context.serverError === false) {
                this.setServerError({
                    show: false
                });
            }

          if (context.companyLevelCustomRolesSuccess) {
            this.generateCustomRolesArr(context.companyLevelCustomRolesSuccess);
            this.showCustomRoles(this.customRoles);
            } else if (context.companyLevelCustomRolesFailure) {
            this.showCustomRoles([]);
          }
          //getExistingUsers success
          if (context.associatedContractUsersSuccess) {
            this.generateExistingUsersArr(context.associatedContractUsersSuccess);
            this.showExistingUsers(this.existingUsers);
            } else if (context.associatedContractUsersFailure) {
            this.showExistingUsers([]);
          }

            if (context.getInfinityUserFailure) {
            this.view.flxMainWrapper.isVisible = true;
            this.view.lblDowntimeWarning.text = context.getInfinityUserFailure;
          }

            if (context.getInfinityUserSuccess) {
            this.view.flxMainWrapper.isVisible = false;
          }
			
            if (context.getUserDetailsSuccess) {
            this.fetchExistingDetailsSuccess = true;
            this.showPermissionDetails(context.getUserDetailsSuccess);
            this.enableContinueButton();
          }

            if (context.customRoleDetailsFailure) {
            this.fetchExistingDetailsSuccess = false;
            FormControllerUtility.hideProgressBar(this.view);
          }

            if (context.associatedContractUsersSuccess) {
            this.setContracts(context.associatedContractUsersSuccess);
          }

            if (context.associatedContractUsersFailure) {
            this.view.flxMainWrapper.isVisible = true;
            this.view.lblDowntimeWarning.text = context.associatedContractUsersFailure;
          }
   
          if (context.isDuplicateResponse) {
            if (context.isDuplicateResponse.isDuplicate === "true") {
              this.isEnableContinueButton = false;
              this.setServerError({
                show: true,
                errorMessage: kony.i18n.getLocalizedString("i18n.customRole.duplicateName")
              });
            } else {
              this.setServerError({
                show: false
              });
              this.isEnableContinueButton = true;
              this.customRoleName = this.view.tbxRoleName.text;
                    this.loadBusinessBankingModule().presentationController.customRoleName = this.view.tbxRoleName.text;
              //this.enableContinueButton();
              this.view.btnCheckAvailability.setVisibility(false);
              this.view.flxAvailabilityStatus.setVisibility(true);
              this.enableContinueButton();
              this.view.forceLayout();
            }
          }
        },

        /**
         * Method to handle custom role name keyup
         */
        onCustRoleNameonKeyUp: function() {
            FormControllerUtility.disableButton(this.view.btnProceedRoles);
            this.isEnableRolesButton = false;
            if (this.view.tbxRoleName.text.length > 0) {
                this.view.btnCheckAvailability.setEnabled(true);
                //this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_ENABLED;
                this.view.btnCheckAvailability.skin="sknBtnSSP0273e315px";
                this.view.btnCheckAvailability.setVisibility(true);
                this.view.flxAvailabilityStatus.setVisibility(false);
                this.adjustScreen();
            } else {
                this.view.btnCheckAvailability.skin = "sknBtn72727215pxSSPBgf8f7f8";
                this.view.btnCheckAvailability.setEnabled(false);
                this.view.flxAvailabilityStatus.setVisibility(false);
            }
        },

      /**
         * Method to show contracts
         * @param {object} contractsList - list of available contracts
         */
        setContracts: function(param) {
        var contracts = param.companyList;
        let segRowData = contracts.map(function(contracts) {
          return {
            "lblUsers": contracts.contractName,
            "contractID": contracts.contractId
          };
        });
        this.view.segAccountListActions.setData(segRowData);
		let contractId = applicationManager.getNavigationManager().getCustomInfo('currContractId');
		if(!contractId){
			this.view.btnShowAllAccounts.text = segRowData[0].lblUsers;
			applicationManager.getNavigationManager().setCustomInfo('currContractId', segRowData[0].contractID);
		}
        this.loadBusinessBankingModule().presentationController.selectedContractId = segRowData[0].contractID;
        this.loadBusinessBankingModule().presentationController.selectedContractName = segRowData[0].lblUsers;
      },
      
        /**
         * Method to display create template ui.
         * @param {object} customRoleObj - template details object
         */
        showCreateTemplateUI: function(customRoleObj) {
            this.manageCustomRoleData = [];
            this.manageCustomRoleData["manageCustomRoleFlow"] = 0;
            this.adjustScreen();
        },

        /**
         * Method to display server error.
         * @param {object} context - server error context object
         */
        setServerError: function(context) {
            if (context.show) {
                this.view.flxMainWrapper.setVisibility(true);
                this.view.lblDowntimeWarning.text = context.errorMessage || kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.common.OoopsServerError");
                this.view.flxDowntimeWarning.setFocus();
            } else {
                this.view.flxMainWrapper.setVisibility(false);
            }
            this.adjustScreen();
        },

      navToSkipForm: function() {
        var navMan=applicationManager.getNavigationManager();
        navMan.setCustomInfo("createSkipFlow","createSkipFlow");
        var customRoleDetails={};
        customRoleDetails.customRoleName = this.view.tbxRoleName.text;
        customRoleDetails.description = this.view.tbxRoleName.text;
        navMan.setCustomInfo("customRoleDetails",customRoleDetails); 
        var userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
         for (var i = 0; i < userManagementData.companyList.length; i++) {
                    userManagementData.companyList[i].autoSyncAccounts = "false";
                }
			this.loadBusinessBankingModule().presentationController.setUserManagementData(userManagementData);
        applicationManager.getNavigationManager().navigateTo("frmBBAccountAccessAndRole");
      },
      
      navToNextForm: function() {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("createSkipFlow", "createSkipFlow");
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      },
      
        generateCustomRolesArr: function(customRoles) {
        let self = this;
        let roles = {};
        this.customRoles = [];
            customRoles.companyList.forEach(function(company) {
                company.customRoles.forEach(function(role) {
                    if (!roles.hasOwnProperty(role.id)) {
              roles[role.id] = true;
              self.customRoles.push(role);
            }
          });
        });
      },

        generateExistingUsersArr: function(existingUsers) {
        let self = this;
        let usernames = {};
        this.existingUsers = [];
        let i = -1;
		let currContract = applicationManager.getNavigationManager().getCustomInfo('currContractId');
		let companyList;
			if(currContract){
				companyList = existingUsers.companyList.
					filter(company => company.contractId === currContract)[0];
			} else {
				companyList = existingUsers.companyList[0];
			}
                companyList.companies.forEach(function(company) {
                    company.users.forEach(function(user) {
                        if (!usernames.hasOwnProperty(user.userName)) {
                usernames[user.userName] = ++i;
                self.existingUsers.push(user);
                self.existingUsers[i].coreCustomerId = [company.coreCustomerId];
                self.existingUsers[i].contractId = [companyList.contractId];
                self.existingUsers[i].contractName = [companyList.contractName];

                        } else {
                self.existingUsers[usernames[user.userName]].coreCustomerId.push(company.coreCustomerId);
                            if (self.existingUsers[usernames[user.userName]].contractId.indexOf(companyList.contractId) < 0) {
                  self.existingUsers[usernames[user.userName]].contractId.push(companyList.contractId);
                }
                            if (self.existingUsers[usernames[user.userName]].contractName.indexOf(companyList.contractName) < 0) {
                  self.existingUsers[usernames[user.userName]].contractName.push(companyList.contractName);
                }
              }
            });
          });
      },
      
      showPermissionDetails: function(permissionDetails) {
            this.view.flxLeftContainer.setVisibility(true);
        this.showAccountAccess(permissionDetails.companyList);
        this.showAccountLevelPermissions(permissionDetails.accountLevelPermissions);
        this.showOtherFeaturePermissions(permissionDetails.globalLevelPermissions);
        this.showTransactionLimits(permissionDetails.transactionLimits);
        this.view.forceLayout();
      },
      
      showAccountAccess: function(companyList) {
        for (let i = 0; i < companyList.length; i++) {
          let companyAccountAccess = companyList[i];
          let selectedAccCount = 0;
          for (let j = 0; j < companyAccountAccess.accounts.length; j++) {
            if (companyAccountAccess.accounts[j].isEnabled === "true") {
              selectedAccCount++;
            }
          }
          companyAccountAccess.selectedAccCount = selectedAccCount;
        }
        // call the intersection method in presentaion.
        companyList = this.filterCompanyList(companyList);
        let segRowData = companyList.map(function(companyList) {
                var len = companyList.cif.length > 4 ? 4 : companyList.cif.length;
          return {
            "lblLeftSideContent": companyList.companyName + " - " + companyList.cif.substring(companyList.cif.length - len),
            "lblRIghtSideContent": companyList.userRole,
            "lblRightMostContent": companyList.selectedAccCount.toString(),
            "lblRightMostContent": {
              "width": "18.7%"
            },
            "lblSeparator": {
              "isVisible" : true
            },
            "flxViewEdit":{
              "isVisible": false
              }
          };
        });
        this.view.segmentAccRoleMain.setData(segRowData);
      },

      // to filter out the companies with no enabled accounts.
        filterCompanyList: function(res) {
        var finalList = [];
            var flag = false;
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res[i].accounts.length; j++) {
                    if (res[i].accounts[j].isEnabled === "true") {
                        flag = true;
            }
          }
                if (flag === true) {
            finalList.push(res[i]);
          }
        }
        return finalList;
      },
      
      showAccountLevelPermissions: function(accountLevelPermissions) {
        let self = this;
        let segRowData = accountLevelPermissions.map(function(accountLevelPermissions, index) {
          var totalFeaturesAvaialble = self.getAccountLevelDetailsToShow(accountLevelPermissions);
                var len = accountLevelPermissions.cif.length > 4 ? 4 : accountLevelPermissions.cif.length;
          return {
                    "lblRecipient": accountLevelPermissions.companyName + " - " + accountLevelPermissions.cif.substring(accountLevelPermissions.cif.length - len),
            "lblDropdown": "O",
            "flxDropdown": {
              "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segAccPermissionsSegMain, index)
            },
            "flxDetails": {
              "isVisible": false
            },
            "lblSeparator2": {
              "isVisible": true
            },
            "lblDefaultPermissionsSet": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
            "lblTotalFeaturesSelected": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
            "lblTxtDefaultPermissionsSet": totalFeaturesAvaialble.DefaultPermissionSet,
            "lblTxtTotalFeaturesSelected": totalFeaturesAvaialble.TotalFeaturesSelected,
          };
        });
        this.view.segAccPermissionsSegMain.setData(segRowData);
        this.view.forceLayout();
      },

        getAccountLevelDetailsToShow: function(accountLevelPermissionsPerCompany) {
        let policyMap = {};
            let enabledCount = 0,
                totalCount = 0;
            accountLevelPermissionsPerCompany.accounts.forEach(function(account) {
                account.featurePermissions.forEach(function(feature) {
            totalCount += feature.permissions.length;
                    feature.permissions.forEach(function(action) {
                        if (action.isEnabled.toString() === "true") {
                enabledCount++;
                policyMap[action.accessPolicyId] = true;
              }
            });
          });
        });
        let result = {
          "DefaultPermissionSet": Object.keys(policyMap).join(", "),
          "TotalFeaturesSelected": enabledCount + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + totalCount
        };
        return result;
      },
      
        getGlobalLevelDetailsToShow: function(globalLevelPermissionsPerCompany) {
        let policyMap = {};
            let enabledCount = 0,
                totalCount = 0;
            globalLevelPermissionsPerCompany.features.forEach(function(feature) {
          totalCount += feature.permissions.length;
                feature.permissions.forEach(function(action) {
                    if (action.isEnabled.toString() === "true") {
              enabledCount++;
              policyMap[action.accessPolicyId] = true;
            }
          });
        });
        let result = {
          "DefaultPermissionSet": Object.keys(policyMap).join(", "),
          "TotalFeaturesSelected": enabledCount + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " +  totalCount
        };
        return result;
      },

      showOtherFeaturePermissions: function(globalLevelPermissions) {
        let self = this;
        let segRowData = globalLevelPermissions.map(function(globalLevelPermissions, index) {
          var totalFeaturesAvaialble = self.getGlobalLevelDetailsToShow(globalLevelPermissions);
                var len = globalLevelPermissions.cif.length > 4 ? 4 : globalLevelPermissions.cif.length;
          return {
                    "lblRecipient": globalLevelPermissions.companyName + " - " + globalLevelPermissions.cif.substring(globalLevelPermissions.cif.length - len),
            "lblDropdown": "O",
            "flxDropdown": {
              "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segOtherFeaturePermissionsSegMain, index)
            },
            "flxDetails": {
              "isVisible": false
            },
            "lblSeparator2": {
              "isVisible": true
            },
            "lblTotalFeaturesSelected": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
            "lblTxtTotalFeaturesSelected": totalFeaturesAvaialble.TotalFeaturesSelected,
          };
        });
        this.view.segOtherFeaturePermissionsSegMain.setData(segRowData);
        this.view.forceLayout();
      },

      showAccountLevelAccessDetails: function(selectedSegment, i) {
        let segData = selectedSegment.data;
        let rowData = segData[i];
        if (rowData.lblDropdown === "O") {
          rowData.lblDropdown = "P";
          rowData.flxDetails.isVisible = true;
        } else {
          rowData.lblDropdown = "O";
          rowData.flxDetails.isVisible = false;
        }
        selectedSegment.setDataAt(rowData, i);
      },
      
      showTransactionLimits: function(transactionLimits) {
        let self = this;
        let segRowData = transactionLimits.map(function(transactionLimits, index) {
          let limits = self.getLimits(transactionLimits);
                var len = transactionLimits.cif.length > 4 ? 4 : transactionLimits.cif.length;
          return {
                    "lblRecipient": transactionLimits.companyName + " - " + transactionLimits.cif.substring(transactionLimits.cif.length - len),
            "lblDropdown": "O",
            "flxDropdown": {
              "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segTransactionLimitsMain, index)
            },
            "flxDetails": {
              "isVisible": false
            },
            "lblSeparator2": {
              "isVisible": true
            },
            "lblHeader": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits"),
            "lblSubHeader": kony.i18n.getLocalizedString("i18n.usermanagement.IndividualTransactionLimits"),
            "lblPerTransactionLimits": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
            "lblDailyTransactionLimit": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
            "lblWeeklyTransactionLimits": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
            "lblTxtPerTransactionLimits": CommonUtilities.getDisplayCurrencyFormat(limits[0]),
            "lblTxtDailyTransactionLimits": CommonUtilities.getDisplayCurrencyFormat(limits[1]),
            "lblTxtWeeklyTransactionLimits": CommonUtilities.getDisplayCurrencyFormat(limits[2]),
            "lblHeader1": kony.i18n.getLocalizedString("i18n.usermanagement.BulkTransactionLimits"),
            "lblPerTransactionLimit": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
            "lblDailyTransactionLimits": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
            "lblWeeklyTransactionLimit1": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
            "lblPerTransactionLimitValue": CommonUtilities.getDisplayCurrencyFormat(limits[3]),
            "lblDailyTransactionLimitValue": CommonUtilities.getDisplayCurrencyFormat(limits[4]),
            "lblWeeklyTransactionLimitValue1": CommonUtilities.getDisplayCurrencyFormat(limits[5])
          };
        });
        this.view.segTransactionLimitsMain.setData(segRowData);
        this.view.forceLayout();
      },

      getCustomRoles: function() {
        FormControllerUtility.showProgressBar(this.view);
        this.loadBusinessBankingModule().presentationController.getCompanyLevelCustomRoles();
      },
      
      // Method to show Custom Roles UI
      showCustomRoles: function(customRoles) {
        let self = this;
        if (customRoles === null || customRoles === undefined || customRoles === -1 || customRoles.length === 0) {
          this.view.SegCustomRoles.isVisible = false;
          this.view.flxCustomRoles.isVisible = true;
          this.view.lblNoCustomRole.isVisible = true;
          this.view.lblNoCustomRole.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
          this.view.lblNoCustomRole.skin = "bbSknLbl424242SSP15Px";
          this.view.forceLayout();
        } else {
          this.view.lblNoCustomRole.isVisible = false;
                this.view.flxCustomRoles.isVisible = false;
          this.view.SegCustomRoles.isVisible = true;
          var segHeader = {
            "lblDropdown": "P",
            "flxDropdown": {
              "onClick": self.showOrHideCustomRolesOrExistingUsers.bind(this, self.view.SegCustomRoles)
            },
            "lblFromAccountNo": kony.i18n.getLocalizedString("konybb.i18n.userMgmt.CustomRoles"),
            "imgAcknowledged": {
              "isVisible": false
            }
          };
          var segRowData = customRoles.map(function(customRoles) {
            return {
              "flxSelectRoleContainer": {
                "isVisible": true
              },
              "imgRole": {
                "src": "inactivecircle.png"
              },
              "imgArrow": {
                "transform": self.imgArrowTransform,
                "isVisible": false
              },
              "lblRoleName": {
                "text" :customRoles.customRoleName,
                "value":customRoles.customRoleName
              },
              "id": customRoles.id
            };
          });
          var segDataModel = [
            [segHeader, segRowData]
          ];
          this.view.SegCustomRoles.setData(segDataModel);
        }
      },

      //Get Existing Users
      getExistingUsers: function() {
        FormControllerUtility.showProgressBar(this.view);
        this.loadBusinessBankingModule().presentationController.getAssociatedContractUsers();
      },

      //Method to show ExistingUsers
      showExistingUsers: function(existingUsers) {
        let self = this;
        if (existingUsers === null || existingUsers === undefined || existingUsers === -1 || existingUsers.length === 0) {
          this.view.SegExistingUsers.isVisible = false;
          this.view.lblNoExistingUser.isVisible = true;
          this.view.flxExistingUsers.isVisible = true;
          this.view.lblNoExistingUser.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
          this.view.lblNoExistingUser.skin = "bbSknLbl424242SSP15Px";
          this.view.forceLayout();
        } else {
          this.view.SegExistingUsers.isVisible = true;
          this.view.flxExistingUsers.isVisible = false;
          this.view.lblNoExistingUser.isVisible = false;
          var segHeader = {
            "lblDropdown": "P",
            "flxDropdown": {
              "onClick": self.showOrHideCustomRolesOrExistingUsers.bind(this, self.view.SegExistingUsers)
            },
            "lblFromAccountNo": kony.i18n.getLocalizedString("konybb.i18n.userMgmt.ExistingUsers"),
            "imgAcknowledged": {
              "isVisible": false
            }
          };
          var segRowData = existingUsers.map(function(existingUsers) {
            return {
              "flxSelectRoleContainer": {
                "isVisible": true
              },
              "imgRole": {
                "src": "inactivecircle.png"
              },
              "imgArrow": {
                "transform": self.imgArrowTransform,
                "isVisible": false
              },
              "lblRoleName": {
                "text": existingUsers.name,
                "value": existingUsers.userName
              },
              "id": existingUsers.id
            };
          });
          var segDataModel = [
            [segHeader, segRowData]
          ];
          this.view.SegExistingUsers.setData(segDataModel);
        }
      },

      showOrHideCustomRolesOrExistingUsers: function(selectedSegment) {
        let segHeaderData = selectedSegment.data[0][0];
        let segRowData = selectedSegment.data[0][1];
        if (segHeaderData.lblDropdown === "O") {
          segHeaderData.lblDropdown = "P";
          segRowData.forEach(function(arrayElement) {
            arrayElement.flxSelectRoleContainer = {
              "isVisible": true
            };
          });
        } else {
          segHeaderData.lblDropdown = "O";
          segRowData.forEach(function(arrayElement) {
            arrayElement.flxSelectRoleContainer = {
              "isVisible": false
            };
          });
        }
        selectedSegment.setData([
          [segHeaderData, segRowData]
        ]);
      },
      
      //On Rowclick of Custom Role segment or ExistingUsers Segment
      RoleOrUserSelected: function(activeSegment, inactiveSegment) {
        FormControllerUtility.showProgressBar(this.view);
        //To get details
        let businessBankingPresentationController = this.loadBusinessBankingModule().presentationController;
        var scope = this;
        if (activeSegment.id === "SegExistingUsers") {
		let currentContractId = applicationManager.getNavigationManager().getCustomInfo('currContractId');
          let param = {
                    "userName": activeSegment.selectedRowItems[0].lblRoleName.value,
			  		"contractId":currentContractId
          };
          businessBankingPresentationController.getInfinityUser(param, scope.selectedContract);
        } else {
          let id = activeSegment.selectedRowItems[0].id;
                businessBankingPresentationController.getCustomRoleDetails({
                    "id": id
                });
        }
        //For Active Segment
        var segData = activeSegment.data;
        var index = activeSegment.selectedRowIndex[1];
        segData[0][0].imgAcknowledged = {
          "isVisible": true
        };
        segData[0][1].forEach(function(arrayElement, i) {
          if (i === index) {
            arrayElement.imgArrow = {
              "transform": scope.imgArrowTransform,
              "isVisible": true
            };
            arrayElement.imgRole = {
              "src": "activecircle.png",
              "height" : "20dp",
              "width" : "20dp",
              "left" : "0dp",
              "top" : "0dp"
            };
            arrayElement.flxInnerRole = {
              "skin" : "sknSegExistingUsers",
            };
          } else {
            arrayElement.imgArrow = {
              "transform": scope.imgArrowTransform,
              "isVisible": false
            };
            arrayElement.imgRole = {
              "src": "inactivecircle.png"
            };
            arrayElement.flxInnerRole = {
              "skin": "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
            };
          }
        });
        activeSegment.setData(segData);
        //For Inactive segment
        var segData1 = inactiveSegment.data;
        segData1[0][0].imgAcknowledged = {
          "isVisible": false
        };
        segData1[0][1].forEach(function(arrayElement) {
          arrayElement.imgArrow = {
            "transform": scope.imgArrowTransform,
            "isVisible": false
          };
          arrayElement.imgRole = {
            "src": "inactivecircle.png"
          };
          arrayElement.flxInnerRole = {
            "skin": "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
          };
        });
        inactiveSegment.setData(segData1);
      },
      
      onClickOfManualRoleSelection: function() {
        this.isManualFlow = true;
        applicationManager.getNavigationManager().setCustomInfo("manualFlow","manualFlow");
        this.enableContinueButton();
        this.view.flxCopyPermissionsContent.setVisibility(false);
        this.view.imgRadioBtnRecipientType1.text = "M";
        this.view.imgRadioBtnRecipientType1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons"
        this.view.imgRadioBtnRecipientType2.text = "L";
        this.view.imgRadioBtnRecipientType2.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
      },

      onClickOfExistingRoleSelection: function() {
        this.isManualFlow = false;
        applicationManager.getNavigationManager().setCustomInfo("manualFlow","copyFlow");
        this.view.flxCopyPermissionsContent.setVisibility(true);
        this.showCustomRoles(this.customRoles);
		this.showExistingUsers(this.existingUsers);
        CommonUtilities.disableButton(this.view.btnProceedRoles);
        this.view.flxLeftContainer.setVisibility(false);
        this.view.imgRadioBtnRecipientType1.text = "L";
        this.view.imgRadioBtnRecipientType1.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons"
        this.view.imgRadioBtnRecipientType2.text = "M";
        this.view.imgRadioBtnRecipientType2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
      },

      getLimits: function(transactionLimits) {
        let limits = [];
        let adder = 0;
            transactionLimits.limitGroups.forEach(function(limitGroup) {
                if (limitGroup.limitGroupId === "BULK_PAYMENT") {
            adder = 3;
                } else {
            adder = 0;
          }
                limitGroup.limits.forEach(function(eachLimit) {
            switch (eachLimit.id) {
              case "DAILY_LIMIT":
                            limits[1 + adder] = eachLimit.value;
                break;
              case "WEEKLY_LIMIT":
                            limits[2 + adder] = eachLimit.value;
                break;
              case "MAX_TRANSACTION_LIMIT":
                            limits[0 + adder] = eachLimit.value;
                break;
            }

          });
        });
        return limits;
      },
      
        showRolesFromUser: function(userObj) {
            var customRoleList = [];
            var customRole = {
                imgRole: {
                    "src": "activecircle.png",
                    "isVisible": true,
                },
                lblRoleName: userObj.userObject.Username,
                lblRoleId: userObj.SelectedRoleId,
                flxInnerRole: {
                    skin: "sknBGFFFFFBdrE3E3E3BdrRadius2Px"
                }
            };
            customRole.lblRoleName = {
                text: truncateFeatureName(userObj.userObject.Username, 25, false),
                toolTip: userObj.userObject.Username
            };
            customRole.imgArrow = {
                transform: this.imgArrowTransform,
                isVisible: true
            };
            customRoleList.push(customRole);
            this.showRolesListFromUserUI(customRoleList, userObj);
            this.adjustScreen();
        },

        enableContinueButton: function() {
        var scope = this;
            if (this.view.flxAvailabilityStatus.isVisible && this.view.btnShowAllAccounts.text.length > 0 &&
                (this.permissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE_ROLE || this.isEditFlow ||
            (this.isManualFlow || (!this.isManualFlow && scope.fetchExistingDetailsSuccess))
                )) {
          CommonUtilities.enableButton(scope.view.btnProceedRoles);
            } else {
          CommonUtilities.disableButton(scope.view.btnProceedRoles);
        }
      },
        // AdjustScreen - Method that sets the height of footer properly. 
        adjustScreen: function() {
        },

    };
});