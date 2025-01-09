define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmUserManagementController */ {
        currentVisibleFlex: "flxApplyCustomRole",

        //isEnableRolesButton: true,

        /**
         *Method to update form using given context
         *@param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.serverError === true) {
                this.setServerError({
                    show: true,
                    errorMessage: context.errorMessage
                });
                this.resetDataOnUpdateServiceError();
                if (this.currentVisibleFlex === "flxSelectRole") {
                    this.fetchRoleDetailsFailureFlag = true;
                    FormControllerUtility.disableButton(this.view.btnProceedRoles);
                }
            } else if (context.serverError === false) {
                this.setServerError({
                    show: false
                });
            }
            if (context.invalidUserError) {
                this.setOFACError();
            }
            if (context.updateUserSuccess) {
                this.manageCustomRoleData["updateSuccessFlag"] = 1;
            }
            if (context.updateUserSuccessFailure) {
                this.resetDataOnUpdateServiceError();
            }
            if (context.prevForm) {
                this.previousFormName = "allUsersDashboard";
            }
            if (context.applyCustomeRoleSuccess) {
                this.showAcknowledgementForCustomRole(context.applyCustomeRoleSuccess, true);
            }
            if (context.applyCustomRoleFailure) {
                this.showAcknowledgementForCustomRole(context.applyCustomRoleFailure, false);
            }
            if (context.invalidUser) {
                this.showInvalidUserError();
            }
            if (context.userNameAvailability) {
                this.showUserNameAvailabilityUI(context.userNameAvailability);
            }
            if (context.allUsers) {
                this.setUsersDataToApplyCustomRole(context.allUsers);
            }

            if (context.createNewCustomRole) {
                this.updateHamburgerMenu("User Management", "Create Custom Role");
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
                this.showCreateTemplateUI(null, context.onCancel);
                this.view.btnCancelCreate.setVisibility(true);
                this.view.btnBackCreate.setVisibility(false);
                this.view.btnCheckAvailability.setVisibility(false);
                this.view.flxAvailabilityStatus.setVisibility(true);
            }
            if (context.userObject) {
                this.showRolesFromUser(context.userObject);
                FormControllerUtility.hideProgressBar(this.view);
            }

            if (context.updateCustomRole) {
                this.showCreateTemplateUI(context.updateCustomRole, context.onCancel);
            }
            if (context.userRoles) {
                if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + kony.i18n.getLocalizedString("i18n.konybb.CreateUserAssignRole").slice(13, 27);
                } else {
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
                }
                this.showRolesUI(context.userRoles, context.selectedRoleId);
                FormControllerUtility.hideProgressBar(this.view);
            }

            if (context.userNamesList) {
                this.ExistingUsersSegmentLoaded = true;
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
                this.showUsersListUI(context.userNamesList);
                if (this.ExistingCustomRolesSegmentLoaded) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.ExistingUsersSegmentLoaded = false;
                    this.ExistingCustomRolesSegmentLoaded = false;
                }
            }

            if (context.fetchUsersListFailure) {
                this.ExistingUsersSegmentLoaded = true;
                this.view.flxExistingUsersExpand.setVisibility(false);
                this.view.flxExistingUsersCollapse.setVisibility(false);
                this.view.flxUsers.setVisibility(true);
                this.view.lblNoRecord.setVisibility(true);
                this.view.lblNoRecord.text = context.errorMessage;
                if (this.ExistingCustomRolesSegmentLoaded) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.ExistingUsersSegmentLoaded = false;
                    this.ExistingCustomRolesSegmentLoaded = false;
                }
            }

            if (context.organizationRolesSuccess) {
                this.ExistingCustomRolesSegmentLoaded = true;
                this.showRolesListUI(context.organizationRolesSuccess);
                if (this.ExistingUsersSegmentLoaded) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.ExistingUsersSegmentLoaded = false;
                    this.ExistingCustomRolesSegmentLoaded = false;
                }
            }

            if (context.organizationRolesFailure) {
                this.ExistingCustomRolesSegmentLoaded = true
                this.view.flxCustomRoleExpand.setVisibility(false);
                this.view.flxCustomRoleCollapse.setVisibility(false);
                if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                    this.view.flxCustomRole.setVisibility(true);
                    this.view.lblNoRecordRole.setVisibility(true);
                } else {
                    this.view.flxCustomRole.setVisibility(false);
                    this.view.lblNoRecordRole.setVisibility(false);
                }
                this.view.lblNoRecordRole.text = context.errorMessage;
                if (this.ExistingUsersSegmentLoaded) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.ExistingUsersSegmentLoaded = false;
                    this.ExistingCustomRolesSegmentLoaded = false;
                }
            }

            if (context.selectedUser) {
                this.fetchRoleDetailsFailureFlag = false;
                this.enableRolesButton();
                this.showUserNamesUI(context.selectedUser);
            }

            if (context.fetchUserDetailsFailure) {
                this.fetchRoleDetailsFailureFlag = true;
                this.view.flxMainWrapper.setVisibility(true);
                this.view.lblDowntimeWarning.text = context.errorData.errorMessage || kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.common.OoopsServerError");
                this.view.flxDowntimeWarning.setFocus();
                FormControllerUtility.disableButton(this.view.btnProceedRoles);

                this.adjustScreen();
            }

            if (context.accounts) {
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + kony.i18n.getLocalizedString("i18n.konybb.CreateUserAccountAccess").slice(11, 28);
                this.showAccountAccessUI(context.accounts, context.selectedAccounts);
            }
            if (context.transactionLimits) {
                this.showTransactionAccessUI(context.transactionLimits, context.selectedLimits);
            }
            if (context.userNamePolicies) {
                this.setuserNamePolicies(context.userNamePolicies.usernamerules);
            }
            if (context.createUserFail) {
                this.showUserCreationFailError(context.errMsg);
            }
            if (context.fetchRoleAction) {
                this.fetchRoleDetailsFailureFlag = false;
                this.showUserRolesUI(context.fetchRoleAction);
            }
            if (context.transactionDetails) {
                this.setupUIforTransactionDetails(this.userDataStore["MONETARY"]);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + kony.i18n.getLocalizedString("i18n.konybb.CreateUserTransactionLimits").slice(11, 31);
            }
            if (context.featureActions) {
                this.setupUIforFeaturePermissions(this.otherFeaturesGlobalCopy);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + kony.i18n.getLocalizedString("i18n.konybb.CreateUserOtherFeaturePermissions").slice(11, 38);
            }
            if (context.accountLevelPermissions) {
                this.setupUIforAccountLevelPermissions();
            }
            if (context.verifyUser) {
                this.updateDataOnUpdateServiceSuccess();
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", false);
                this.showVerifyUserUI(context.verifyUser);
            }
            if (context.verifyCustomRole) {
                this.updateDataOnUpdateServiceSuccess();
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", false);
                this.showVerifyCustomRoleUI(context.verifyCustomRole, 1);
            }
            if (context.manageUser) {
                if (applicationManager.getBusinessUserManager().getCustomRoleAttribute("postShowflag") === 0) {
                    this.postShow();
                }
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEditManager", true);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", true);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", false);
                this.manageCustomRoleData["manageCustomRoleFlow"] = 0;
                this.manageCustomRoleData["roleChanged"] = 0;
                this.showVerifyUserUI(context.manageUser);
            }
            if (context.storeUserDataTransaction) {
                this.userDataStore = context.storeUserDataTransaction;
            }
            if (context.fetchOtherRoleAction) {
                this.otherFeatureData = context.fetchOtherRoleAction;
            }
            if (context.showAck) {
                this.setupAcknowledgement(context.showAck);
            }
            if (context.manageCustomRoleDetailsSuccess) {
                if (applicationManager.getBusinessUserManager().getCustomRoleAttribute("postShowflag") === 0) {
                    this.postShow();
                }
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEditManager", true);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", true);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", false);
                this.manageCustomRoleData["manageCustomRoleFlow"] = 0;
                this.manageCustomRoleData["roleChanged"] = 0;
                this.showVerifyCustomRoleUI(context.manageCustomRoleDetailsSuccess);
            }
            if (context.isDuplicateResponse) {
                if (context.isDuplicateResponse.isDuplicate === "true") {
                    this.isEnableRolesButton = false;
                    this.setServerError({
                        show: true,
                        errorMessage: kony.i18n.getLocalizedString("i18n.customRole.duplicateName")
                    });
                } else {
                    this.setServerError({
                        show: false
                    });
                    this.isEnableRolesButton = true;
                    this.enableRolesButton();
                    this.view.btnCheckAvailability.setVisibility(false);
                    this.view.flxAvailabilityStatus.setVisibility(true);
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
                this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_ENABLED;
                this.view.btnCheckAvailability.setVisibility(true);
                this.view.flxAvailabilityStatus.setVisibility(false);
                this.adjustScreen();
            } else {
                this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_DISABLED;
                this.view.btnCheckAvailability.setEnabled(false);
                this.view.flxAvailabilityStatus.setVisibility(false);
            }
        },

        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
        adjustScreen: function() {
            this.view.forceLayout();
            this.view.flxFooter.isVisible = true;
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + "dp";
                } else {
                    this.view.flxFooter.top = mainheight + "dp";
                }
                this.view.forceLayout();
            } else {
                this.view.flxFooter.top = mainheight + "dp";
                this.view.forceLayout();
            }

        },
        responsiveViews: {},
        initializeResponsiveViews: function() {
            this.responsiveViews["segRoleNames"] = this.view.segRoleNames.isVisible;
            this.responsiveViews["searchRoleTemplate"] = this.view.searchRoleTemplate.isVisible;
            this.responsiveViews["flxCustomRole"] = this.view.flxCustomRole.isVisible;
            this.responsiveViews["flxUsers"] = this.view.flxUsers.isVisible;
            this.responsiveViews["segUserNames"] = this.view.segUserNames.isVisible;
            this.responsiveViews["imgRole"] = this.view.imgRole.isVisible;
            this.responsiveViews["imgUser"] = this.view.imgUser.isVisible;
            this.responsiveViews["flxCustomRoleCollapse"] = this.view.flxCustomRoleCollapse.isVisible;
            this.responsiveViews["flxCustomRoleExpand"] = this.view.flxCustomRoleExpand.isVisible;
            this.responsiveViews["flxExistingUsersCollapse"] = this.view.flxExistingUsersCollapse.isVisible;
            this.responsiveViews["flxExistingUsersExpand"] = this.view.flxExistingUsersExpand.isVisible;
        },
        /**
         * Breakpont change
         */
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.PopupHeaderUM.onBreakpointChangeComponent(scope.view.PopupHeaderUM, width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            this.view.customheader.onBreakpointChangeComponent(width);
            this.resetUI();
            if (width <= 640 || orientationHandler.isMobile) {
                this.view.btnEdit.setVisibility(false);
                this.view.btnRoleEdit.setVisibility(false);
                this.view.btnEditAccount.setVisibility(false);
                this.view.btnRolesPermissionEdit.setVisibility(false);
                this.view.btnOtherPermissionEdit.setVisibility(false);
                this.view.btnTransactionLimitsEdit.setVisibility(false);
            } else if (width <= 1024) {
                //for tablet

            } else if (width <= 1366) {
                //for desktop
            } else {
                //for hd desktop
            }
            if (this.currentVisibleFlex == "flxFeaturePermissions") {
                this.setupUIforFeaturePermissions(this.otherFeaturesGlobalCopy);
            } else if (this.currentVisibleFlex == "flxAccountLevelPermissions") {
                this.setupUIforAccountLevelPermissions(this.userDataStore["MONETARY"]);
            } else if (this.currentVisibleFlex === "flxVerifyUser") {
                this.setDataForUserSelectedRole(applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleName"), applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName"));
            }
            this.view[this.currentVisibleFlex].setVisibility(true);
            var scopeObj = this;
            views = Object.keys(this.responsiveViews);
            views.forEach(function(e) {
                scopeObj.view[e].isVisible = scopeObj.responsiveViews[e];
            });
            this.adjustScreen()
        },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {
            /* set all User Management flex's visibility to false */
            this.view.flxApplyCustomRole.setVisibility(false);
            this.view.flxSelectRole.setVisibility(false);
            this.view.flxSelectAccounts.setVisibility(false);
            this.view.flxVerifyUser.setVisibility(false);
            this.view.flxAcknowledgement.setVisibility(false);
            this.view.flxFeaturePermissions.setVisibility(false);
            this.view.flxAccountLevelPermissions.setVisibility(false);
            this.view.flxUserTransactionDetails.setVisibility(false);
            this.view.flxCancelPopup.setVisibility(false);
            this.setServerError({
                show: false
            });
            this.adjustScreen();
        },
        /**
         * Method will invoke on form init
         */
        initActions: function() {
            var scopeObj = this;
            this.validationUtilManager = applicationManager.getValidationUtilManager();
            this.view.btnProceedCreate.onClick = this.onUserDetailsProceedBtnClick.bind(this, false);
            this.view.btnCheckAvailability.onClick = this.checkDuplicateCustRoleProceedBtnClick.bind(this);
            this.view.btnCancelCreate.onClick = function() {
                scopeObj.showCancelPopUp();
                scopeObj.adjustScreen();
            };
            this.view.InfoIconPopup.flxCross.onClick = function() {
                scopeObj.view.InfoIconPopup.setVisibility(false);
            };
            /* binding call backs to user input fields of User Details Screen */
            this.view.imgCloseDowntimeWarning.onTouchEnd = this.setServerError.bind(this, {
                show: false
            });
            // this.view.tbxName.onKeyUp = this.updateUserDetailsProceedState.bind(this);
            this.view.searchRoleTemplate.tbxSearch.onKeyUp = function() {
                scopeObj.userSearch();
            };
            this.view.searchRoleTemplate.flxClose.onClick = function() {
                scopeObj.clearSearch();
            };
            this.view.tbxRoleName.onKeyUp = this.onCustRoleNameonKeyUp.bind(this);
            this.view.tbxRoleName.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\"\\";
            this.view.btnCheckAvailability.setVisibility(true);
            this.view.flxAvailabilityStatus.setVisibility(false);
            if (this.view.tbxRoleName.text.length > 0) {
                this.view.btnCheckAvailability.setEnabled(true);
                this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_ENABLED;
            } else {
                this.view.btnCheckAvailability.setEnabled(false);
                this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_DISABLED;
            }
        },

        checkDuplicateCustRoleProceedBtnClick: function() {
            //isBack,event
            this.loadBusinessBankingModule().presentationController.checkDuplicateRoleName(this.view.tbxRoleName.text);
        },

        userSearch: function() {
            this.view.searchRoleTemplate.imgClose.setVisibility(true);
            var roleSearch = [];
            var customRole = [];
            var searchVal = this.view.searchRoleTemplate.tbxSearch.text;
            if (!kony.sdk.isNullOrUndefined(this.roleList) && this.roleList.length !== 0) {
                this.roleList.forEach(function(item) {
                    if (item.lblRoleName.toolTip.includes(searchVal) || item.lblName.includes(searchVal)) {
                        if (!roleSearch.includes(item))
                            roleSearch.push(item);
                    }
                });
            }
            if (!kony.sdk.isNullOrUndefined(this.customRoleList) && this.customRoleList.length !== 0) {
                this.customRoleList.forEach(function(item) {
                    if (item.lblRoleName.toolTip.includes(searchVal)) {
                        customRole.push(item);
                    }
                });
            }

            this.setUserNamesRowData(roleSearch);
            this.setRolesNamesRowData(customRole);
            this.expandRoles();
            this.expandUsers();

            if (roleSearch.length === 0) {
                this.view.flxUsers.setVisibility(true);
                this.view.lblNoRecord.setVisibility(true);
                //this.view.lblSelectedUser.setVisibility(false);
                this.view.flxExistingUsersExpand.setVisibility(false);
                this.view.flxExistingUsersCollapse.setVisibility(false);
                this.view.segUserNames.setVisibility(false);
                if (this.view.lblNoRecord.text !== kony.i18n.getLocalizedString("i18n.permissionTemplate.noUsersFound")) {
                    this.view.lblNoRecord.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound");
                }
            } else {
                this.view.lblNoRecord.setVisibility(false);
            }

            if (customRole.length === 0) {
                if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                    this.view.flxCustomRole.setVisibility(true);
                    this.view.lblNoRecordRole.setVisibility(true);
                } else {
                    this.view.flxCustomRole.setVisibility(false);
                    this.view.lblNoRecordRole.setVisibility(false);
                }
                //this.view.lblSelectedRole.setVisibility(false);
                this.view.flxCustomRoleExpand.setVisibility(false);
                this.view.flxCustomRoleCollapse.setVisibility(false);
                this.view.segRoleNames.setVisibility(false);
                if (this.view.lblNoRecordRole.text !== kony.i18n.getLocalizedString("i18n.permissionTemplate.noCustomRoleFound")) {
                    this.view.lblNoRecordRole.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound");
                }
            } else {
                this.view.lblNoRecordRole.setVisibility(false);
            }
            this.adjustScreen();
        },

        clearSearch: function() {
            //        if(this.view.lblSelectedRole.text !== "")
            //         this.view.lblSelectedRole.setVisibility(true);
            //       if(this.view.lblSelectedUser.text !== "")
            //         this.view.lblSelectedUser.setVisibility(true);
            this.view.searchRoleTemplate.imgClose.setVisibility(false);
            if (this.view.lblNoRecord.text === kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound"))
                this.view.lblNoRecord.setVisibility(false);
            if (this.view.lblNoRecordRole.text === kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound"))
                this.view.lblNoRecordRole.setVisibility(false);
            this.view.searchRoleTemplate.tbxSearch.text = "";
            if (this.roleList.length !== 0) {
                this.view.segUserNames.setVisibility(true);
                this.view.flxExistingUsersExpand.setVisibility(false);
                this.view.flxExistingUsersCollapse.setVisibility(true);
                this.setUserNamesRowData(this.roleList);
            }
            if (this.customRoleList.length !== 0) {
                if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                    this.view.segRoleNames.setVisibility(true);
                } else {
                    this.view.segRoleNames.setVisibility(false);
                }
                this.view.flxCustomRoleExpand.setVisibility(false);
                this.view.flxCustomRoleCollapse.setVisibility(true);
                this.setRolesNamesRowData(this.customRoleList);
            }
        },


        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
            this.view.customheader.forceCloseHamburger();
            this.view.customheader.customhamburger.activateMenu("User Management", "Create A User");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter','flxFormContent']);
            this.currentVisibleFlex = "flxApplyCustomRole";
            this.view.applyCustomRoleComponent.TabBodyNew.btnName.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.applyCustomRoleComponent.TabSearchBarNew.flxSearch.skin = "bbSknFlxf8f7f8";
                this.view.applyCustomRoleComponent.TabSearchBarNew.flxBoxSearch.skin = "sknFlxffffffborderradE3E3E3";
            } else {
                this.view.applyCustomRoleComponent.TabsHeaderNew.btnTab1.skin = "slLabel0d8a72616b3cc47";
                this.view.applyCustomRoleComponent.TabBodyNew.flxBBUsersDashboardHeader.skin = "sknFlxf9f9f9Bordere3e3e32px";
            }
            this.view.applyCustomRoleComponent.TabBodyNew.btnRole.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.applyCustomRoleComponent.TabBodyNew.btnUsername.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.applyCustomRoleComponent.TabBodyNew.btnStatus.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.applyCustomRoleComponent.TabBodyNew.lblActions.setVisibility(false);
            this.view.applyCustomRoleComponent.TabBodyNew.imgName.src = "sorting_next.png";
            this.view.applyCustomRoleComponent.TabBodyNew.imgRole.src = "sorting_next.png";
            this.view.applyCustomRoleComponent.TabBodyNew.imgUsername.src = "sorting_next.png";
            this.view.applyCustomRoleComponent.TabBodyNew.imgStatus.src = "sorting_next.png";
            this.view.applyCustomRoleComponent.TabSearchBarNew.flxSearchimg.isVisible = true;
            this.selectedRowValues = [0, 0];
        },

        initUserRolesActions: function() {
            var scopeObj = this;
            this.view.btnBackAccessRoles.isVisible = false;
            this.view.btnCancelRoles.onClick = function() {
                scopeObj.showCancelPopUp();
                scopeObj.adjustScreen();
            };
            this.view.segUserNames.widgetDataMap = {
                "lblRoleName": "lblRoleName",
                "imgSelectRole": "imgSelectRole",
                "imgArrow": "imgArrow",
                "flxInnerRole": "flxInnerRole",
                "roleName": "roleName",
                "group_id": "group_id"
            };
        },

        /**
         *  This methods binds call-backs or actions to Back Cancel and Proceed
         *  buttons in the Select Roles Page
         * 	This should be invoked before loading theflxSelectRole Screen
         */
        initRolesActions: function(custRoleFlag) {
            var scopeObj = this;
            if (!custRoleFlag) {
                this.view.btnProceedRoles.onClick = this.onUserRolesProceedOrBackBtnClick.bind(this, false);
            }
            this.view.btnBackAccessRoles.isVisible = false;
            if (scopeObj.view.btnProceedRoles.text === kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate")) {
                scopeObj.view.btnBackAccessRoles.isVisible = true;
            } else {
                scopeObj.view.btnBackAccessRoles.isVisible = false;
            }
            this.view.btnBackAccessRoles.onClick = function() {
                scopeObj.view.btnCancelRoles.setVisibility(true);
                scopeObj.resetUI();
                scopeObj.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                scopeObj.view.btnProceedRoles.toolTip = "Continue";
                FormControllerUtility.enableButton(scopeObj.view.btnProceedRoles);
                scopeObj.view.flxVerifyUser.setVisibility(true);
                scopeObj.currentVisibleFlex = "flxVerifyUser";
                scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + " - " + kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                scopeObj.adjustScreen();
            };

            this.view.btnCancelRoles.onClick = function() {
                scopeObj.showCancelPopUp();
                scopeObj.adjustScreen();
            };
            this.view.segRoleNames.widgetDataMap = {
                "lblRoleName": "lblRoleName",
                "imgSelectRole": "imgSelectRole",
                "imgArrow": "imgArrow",
                "flxInnerRole": "flxInnerRole",
                "parent_id": "parent_id"
            };
        },

        updateHamburgerMenu: function(menuId, subMenuId) {
            this.view.customheader.customhamburger.activateMenu(menuId, subMenuId);
        },

        /**
         * Method to set data to segRoleName for User Roles.
         */
        setGroupRowData: function(data) {
            this.view.segRoleNames.setData(data);
            this.view.segRoleNames.selectedRowIndex = [0, 0];
            this.view.lblRoleDescription.text = data[0]["description"];
            this.adjustScreen();
        },

        initAccountAccessActions: function() {
            var scopeObj = this;
            FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
            scopeObj.view.btnProceedAccess.onClick = scopeObj.onUserAccountAccessProceedOrBackBtnClick.bind(this);
            scopeObj.view.btnBackAccess.onClick = function(event) {
                if (scopeObj.view.btnProceedAccess.text != kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                    scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + " - " + kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                    scopeObj.view.btnCancelAccess.setVisibility(true);
                    scopeObj.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                    scopeObj.view.btnProceedAccess.toolTip = "Continue"
                    scopeObj.resetUI();
                    scopeObj.view.flxVerifyUser.setVisibility(true);
                    scopeObj.currentVisibleFlex = "flxVerifyUser";
                    scopeObj.adjustScreen();
                } else {
                    scopeObj.resetUI();
                    scopeObj.initRolesActions();
                    scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
                    scopeObj.view.flxSelectRole.setVisibility(true);
                    scopeObj.currentVisibleFlex = "flxSelectRole";
                    scopeObj.adjustScreen();
                }
            };
            FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
            scopeObj.view.btnCancelAccess.onClick = function() {
                scopeObj.showCancelPopUp();
                scopeObj.adjustScreen();
            };
            scopeObj.view.segAccounts.widgetDataMap = {
                "lblCheckAccount": "lblCheckAccount",
                "lblAccountName": "lblAccountName"
            };
        },

        /**
         * Method to show cancel popup
         */
        showCancelPopUp: function(context) {
            var scope = this;

            scope.view.flxCancelPopup.height = scope.view.flxHeader.info.frame.height + scope.view.flxMain.info.frame.height + scope.view.flxFooter.info.frame.height;
            scope.view.PopupHeaderUM.centerY = "50%";

            function closePopUp() {
                this.view.flxCancelPopup.setVisibility(false);
                this.adjustScreen();
            }

            scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
            scope.view.PopupHeaderUM.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
            scope.view.PopupHeaderUM.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");

            if (context === "deleteTemplate") {
                scope.view.PopupHeaderUM.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.ACH.DeleteTemplateAlertMessage");
                scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            } else if (context === "applyRole") {
                scope.view.PopupHeaderUM.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.bulkwire.UploadCancelMsg").slice(0, 32) +
                    kony.i18n.getLocalizedString("i18n.customRole.applyCustomRoleText") +
                    kony.i18n.getLocalizedString("i18n.bulkwire.UploadCancelMsg").slice(48, 49);
                scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            } else {
                scope.view.PopupHeaderUM.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.customRole.CancelCustomRoleCreation"); //main text
                scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel"); //head
            }
            //scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");//head
            scope.view.PopupHeaderUM.flxCross.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnNo.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnYes.onClick = function() {
                if (context === "deleteTemplate") {
                    scope.loadBusinessBankingModule().presentationController.deleteCustomRole(applicationManager.getBusinessUserManager().getCustomRoleAttribute("id"));
                } else if (context === "applyRole") {
                    scope.loadBusinessBankingModule().presentationController.navigateToUserRoles();
                } else if (this.previousFormName === "BBAccountsLanding") {
                    this.navigateToBBAccountsLanding();
                } else {
                    this.navigateToBBUsersDashboard();
                }

                this.adjustScreen();
            }.bind(this);

            scope.view.flxCancelPopup.setVisibility(true);
            scope.view.PopupHeaderUM.setFocus(true);
            scope.adjustScreen();
        },

        showResetPopUp: function(context) {
            var scope = this;
            scope.TabBodyNewContext = context;
            scope.view.flxCancelPopup.height = kony.os.deviceInfo().screenHeight;
            scope.view.setContentOffset({
                x: "0%",
                y: "0%"
            }, true);

            function closePopUp() {
                this.view.flxCancelPopup.setVisibility(false);
                this.adjustScreen();
            }

            scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
            scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
            scope.view.PopupHeaderUM.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecurityQuestionResetHeader"); //main text
            scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel"); //head
            scope.view.PopupHeaderUM.flxCross.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnNo.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnYes.onClick = function() {
                var context = this.TabBodyNewContext;
                if (!(kony.sdk.isNullOrUndefined(context.sectionIndex))) {
                    this.view.TabBodyNew.reset(scope.getTransactionDefaultValues(context.sectionIndex), context.sectionIndex);
                }
                this.view.flxCancelPopup.setVisibility(false);
                this.adjustScreen();
            }.bind(this);

            scope.view.flxCancelPopup.setVisibility(true);
            scope.adjustScreen();
            return false;
        },
        /**
         * Method to set data to segTransferActions for Transfer features and actions
         */
        setRowData: function(data) {
            var widgetDataMap = {
                "lblHeader": "headerName",
                "lblSegRoleSeparator": "lblSegRoleSeparator",
                "lblActions": "id"
            };
            this.view.segRolePermissions.widgetDataMap = widgetDataMap;
            this.view.segRolePermissions.setData(data);
            this.adjustScreen();
        },

        /**
         * Method to handle static bindings for Account Access page
         */
        staticBindingForAccountAccess: function() {
            var scopeObj = this;
            scopeObj.view.btnProceedAccess.onClick = scopeObj.onUserAccountAccessProceedOrBackBtnClick.bind(this);
            scopeObj.view.btnCancelAccess.onClick = function() {
                scopeObj.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                scopeObj.showCancelPopUp();
                //scopeObj.adjustScreen();
            };
            scopeObj.view.btnBackAccess.onClick = function(e) {
                scopeObj.onUserAccountAccessProceedOrBackBtnClick(e, true);
                scopeObj.loadBusinessBankingModule().presentationController.fetchRoles(scopeObj.loadBusinessBankingModule().presentationController.onFetchDefaultUserRolesSuccess.bind(scopeObj.loadBusinessBankingModule().presentationController));
                scopeObj.view.btnCancelAccess.setVisibility(true);
                //scopeObj.adjustScreen();
            };
            scopeObj.view.flxInfoIcon.onClick = function() {
                scopeObj.view.InfoIconPopup.flxInformation.height = "105dp";
                if (scopeObj.view.InfoIconPopup.isVisible === true) {
                    scopeObj.view.InfoIconPopup.setVisibility(false);
                    // Populate the correct flex here
                } else {
                    scopeObj.view.InfoIconPopup.lblInfo.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.InfoIconTextForAccountAccess");
                    scopeObj.view.InfoIconPopup.setVisibility(true);
                    scopeObj.view.InfoIconPopup.top = scopeObj.view.flxInfoIcon.frame.y + 275 + "dp";
                    scopeObj.view.InfoIconPopup.left = scopeObj.view.flxInfoIcon.frame.x + 47 + "dp";
                }
            };
            this.view.segAccounts.widgetDataMap = {
                "lblGroupName": "lblGroupName",
                "lblCheckGroupView": "lblCheckGroupView",
                "lblViewTitle": "lblViewTitle",
                "lblCheckGroupTransaction": "lblCheckGroupTransaction",
                "lblTransactionTitle": "lblTransactionTitle",
                "lblAccountName": "lblAccountName",
                "lblViewAccess": "lblViewAccess",
                "lblTransactionAccess": "lblTransactionAccess",
                "lblAccountAccess": "lblAccountAccess",
                "lblNameValue": "lblNameValue",
                "lblCheckView": "lblCheckView",
                "flxImgCheckAccount": "flxImgCheckAccount",
                "lblCheckTransaction": "lblCheckTransaction",
                "lblCheckAccount": "lblCheckAccount"
            };
        },

        /**
         * Method to handle static bindings for Transaction Limits page
         */
        staticBindingForTransactionLimits: function() {
            var scopeObj = this;
            scopeObj.view.btnProceedTransferPermissions.onClick = scopeObj.onUserTransactionAccessNextBtnClick.bind(this);
            scopeObj.view.btnCancelTransferPermissions.onClick = function() {
                scopeObj.showCancelPopUp();
                //scopeObj.adjustScreen();
            };
            scopeObj.view.btnBackTransferPermission.onClick = function() {
                scopeObj.onBackTransferPermission();
                scopeObj.loadBusinessBankingModule().presentationController.showAllAccounts();
            };
            scopeObj.view.flxInfoTransactionAccess.onClick = function() {
                scopeObj.view.InfoIconPopup.flxInformation.height = "80dp";
                if (scopeObj.view.InfoIconPopup.isVisible === true) {
                    scopeObj.view.InfoIconPopup.setVisibility(false);
                    // Populate the correct flex here
                } else {
                    scopeObj.view.InfoIconPopup.lblInfo.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.InfoIconTextForTransactionAccess");
                    scopeObj.view.InfoIconPopup.setVisibility(true);
                    scopeObj.view.InfoIconPopup.top = scopeObj.view.flxInfoTransactionAccess.frame.y + 275 + "dp";
                    scopeObj.view.InfoIconPopup.left = scopeObj.view.flxInfoTransactionAccess.frame.x + 45 + "dp";
                }
            };
            scopeObj.view.segBBTransferPermissions.widgetDataMap = {
                "lblTransferType": "lblTransferType",
                "lblMaxTransactionLimit": "lblMaxTransactionLimit",
                "flxMaxTransactionLimit": "flxMaxTransactionLimit",
                "lblCurrSymbol": "lblCurrSymbol",
                "lblDailyLimitCurrSymbol": "lblDailyLimitCurrSymbol",
                "tbxMaxTransactionValue": "tbxMaxTransactionValue",
                "lblMaxDailyLimit": "lblMaxDailyLimit",
                "flxMaxDailyLimit": "flxMaxDailyLimit",
                "tbxMaxDailyValue": "tbxMaxDailyValue"
            };
        },

        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            this.adjustScreen();
            this.customRoleObj = [];
            this.selectedUsers = [];
            this.userDataStore = [];
            this.monetaryLimitsSegdata = [];
            this.accountLevelActionsJson = [];
            this.accountLevelActionsSegdata = [];
            this.accountLevelActionsMainCopy = [];
            this.currentUserRole = "";
            this.manageCustomRoleData = [];
            this.manageCustomRoleData["manageCustomRoleFlow"] = 0;
            this.manageCustomRoleData["currentEditFlow"] = "";
            this.manageCustomRoleData["updateSuccessFlag"] = 0;
            this.segDataOtherFeatures = [];
            this.otherFeaturesGlobalCopy = [];
            this.customRoleObjAfterUpdateTemp = [];
            this.roleDataBeforeUpdate = [];
            this.customRoleDataBeforeUpdate = [];
            this.isRoleEdited = false;
            this.ExistingUsersSegmentLoaded = false;
            this.ExistingCustomRolesSegmentLoaded = false;


            if (!kony.sdk.isNullOrUndefined(applicationManager.getBusinessUserManager().getCustomRoleObject())) {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("postShowflag", 1);
            }

            applicationManager.getNavigationManager().applyUpdates(this);
            this.previousFormName = "BBAccountsLanding";
            this.enableOrDisableUpdateButton = [];
            this.initializeResponsiveViews();
            this.accessibilityFocusSetup();
        },

        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch, this.view.applyCustomRoleComponent.TabSearchBarNew.flxBoxSearch],
                [this.view.tbxRoleName, this.view.flxCustRoleName],
                [this.view.searchRoleTemplate.tbxSearch, this.view.searchRoleTemplate.flxBoxSearch]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
         *  Method to set the username policies
         * @param {object} userNamePolicies - which consists of list of username policies
         */
        setuserNamePolicies: function(userNamePolicies) {
            var requiredString = kony.i18n.getLocalizedString("i18n.userManagement.UserNameRulesAdvanced");
            var symbols = "";
            if (!kony.sdk.isNullOrUndefined(userNamePolicies.symbolsAllowed)) {
                if (userNamePolicies.symbolsAllowed) {
                    symbols = userNamePolicies.supportedSymbols;
                    requiredString = kony.i18n.getLocalizedString("i18n.userManagement.UserNameRules");
                }
            } else {
                symbols = userNamePolicies.supportedSymbols;
                requiredString = kony.i18n.getLocalizedString("i18n.userManagement.UserNameRules");
            }
            var Obj = {
                mnLen: userNamePolicies.minLength,
                mxLen: userNamePolicies.maxLength,
                specialSym: symbols,
            };
            var reqString = requiredString.replace(/mnLen|mxLen|specialSym/gi, function(matched) {
                return Obj[matched];
            });
            this.view.rtxRulesUsername.text = reqString;
        },
        /**
         * Method to check whether user name is available or not.
         * @param {var} userNameAvailability is a boolean value
         */
        //     showUserNameAvailabilityUI: function (userNameAvailability) {
        //       if (userNameAvailability.isAvailable) {
        //         this.view.tbxUsername.skin = "sknSSP42424215Opacity0";//Default skin
        //         this.view.flxRulesUsername.setVisibility(false);
        //         this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
        //         this.view.btnCheckAvailability.setVisibility(false);
        //         this.view.flxAvailabilityStatus.setVisibility(true);
        //         this.view.flxUsernameAvailability.forceLayout();
        //         this.setErrorMessaage({ show: false });
        //       } else {
        //         this.showInvalidUserError();
        //         this.view.tbxUsername.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;//Error skin
        //         this.view.btnCheckAvailability.setVisibility(true);
        //         this.view.flxAvailabilityStatus.setVisibility(false);
        //       }
        //       this.adjustScreen();
        //       this.isUserNameAvailable = userNameAvailability.isAvailable;
        //       this.updateUserDetailsProceedState();
        //     },
        /**
         * Method to display error message on invalid user
         */
        showInvalidUserError: function() {
            this.setErrorMessaage({
                show: true,
                errMsgi18nKey: "i18n.userManagement.invalidUserNameText"
            }); //update i18n key
        },
        /**
         * Method to display the error message from the backend
         * @param {var} errorMessage is a string having the error from backend
         */
        showUserCreationFailError: function(errorMessage) {
            this.setServerError({
                show: true,
                errorMessage: errorMessage
            });
        },
        /**
         * Method to display error message
         */
        setErrorMessaage: function(context) {
            if (context.show) {
                if (orientationHandler.isTablet && this.view.flxErrorMessage.isVisible === true) {
                    var text = (!kony.sdk.isNullOrUndefined(context.errMsgi18nKey)) ? kony.i18n.getLocalizedString(context.errMsgi18nKey) : kony.i18n.getLocalizedString("i18n.StopPayments.errormessages.InvalidDetails");
                    if (this.view.lblError.text !== text) {
                        this.view.lblError.text = text;
                        this.view.flxErrorMessage.setFocus();
                        this.adjustScreen();
                    }
                } else {
                    this.view.lblError.text = kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.StopPayments.errormessages.InvalidDetails");
                    this.view.flxErrorMessage.setVisibility(true);
                    this.view.flxErrorMessage.setFocus();
                    this.adjustScreen();
                }
            } else {
                if (this.view.flxErrorMessage.isVisible !== false) {
                    this.view.flxErrorMessage.setVisibility(false);
                    this.adjustScreen();
                }
            }
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
        /**
         * Method to display OFAC/CIP  error.
         */
        setOFACError: function(context) {
            this.setErrorMessaage({
                show: true,
                errMsgi18nKey: "i18n.userManagement.OFAC/CIPCheck"
            });
        },
        /**
         * Method to load and returns the Business User Module Object
         * @returns {object} Method to load and returns the Business User Module Object
         */
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        /**
         * Method to display create template ui.
         * @param {object} customRoleObj - template details object
         */
        showCreateTemplateUI: function(customRoleObj) {
            this.manageCustomRoleData = [];
            this.manageCustomRoleData["manageCustomRoleFlow"] = 0;
            this.showCreateCustomRoleUI();
            //this.view.tbxRoleName.onKeyUp = this.enableRolesButton.bind(this,true);
            this.view.flxManual.onClick = this.onClickOfManualRoleSelection.bind(this, customRoleObj);
            this.view.flxCopy.onClick = this.onClickOfExistingRoleSelection.bind(this, customRoleObj);

            this.onClickOfExistingRoleSelection(customRoleObj);

            this.adjustScreen();
        },

        showCreateCustomRoleUI: function() {
            var scopeObj = this;
            scopeObj.resetUI();
            this.view.tbxRoleName.text = "";
            this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnProceedRoles.toolTip = "Continue";
            this.view.btnCancelRoles.setVisibility(true);
            this.view.btnBackAccessRoles.setVisibility(true);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
            this.view.flxSelectRole.setVisibility(true);
            this.view.flxRoleCreation.setVisibility(true);
            this.currentVisibleFlex = "flxSelectRole";
            FormControllerUtility.disableButton(this.view.btnProceedRoles);
        },

        onClickOfExistingRoleSelection: function(customRoleObj) {
            applicationManager.getBusinessUserManager().clearDataMembers();
            var scopeObj = this;
            this.collapseRoles();
            this.collapseUsers();
            this.selectedUser = "";
            this.selectedRoleName = "";
            this.view.segRoleNames.maxHeight = "300dp";
            this.view.imgRole.setVisibility(false);
            this.view.imgUser.setVisibility(false);
            //this.view.lblSelectedRole.setVisibility(false);
            //this.view.lblSelectedUser.setVisibility(false);
            this.view.lblNoRecord.setVisibility(false);
            this.view.lblNoRecordRole.setVisibility(false);
            this.view.searchRoleTemplate.tbxSearch.text = "";
            this.view.flxRoleSeparator.isVisible = true;
            this.view.flxAboutRoleSeparator.isVisible = true;
            this.view.flxPermissionSeparator.isVisible = true;
            this.view.searchRoleTemplate.tbxSearch.text = "";
            this.view.searchRoleTemplate.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
            this.view.imgCopy.src = "radiobtn_active.png";
            this.view.imgManual.src = "radioinactivebb.png";
            this.view.flxScrollRightContainer.isVisible = false;
            FormControllerUtility.disableButton(this.view.btnProceedRoles);
            this.view.lblRolePermissions.text = kony.i18n.getLocalizedString("i18n.userManagement.accountAccess");
            this.view.lblAboutRoleAndPermissions.text = kony.i18n.getLocalizedString("i18n.customRoles.basicPermissionDetails");
            this.view.lblAboutRole.text = kony.i18n.getLocalizedString("i18n.customRoles.assignedParentRole");
            this.view.flxExistingUsersCollapse.onClick = function() {
                scopeObj.collapseUsers();
            };
            this.view.flxExistingUsersExpand.onClick = function() {
                scopeObj.expandUsers();
            };
            this.view.flxCustomRoleCollapse.onClick = function() {
                scopeObj.collapseRoles();
            };
            this.view.flxCustomRoleExpand.onClick = function() {
                scopeObj.expandRoles();
            };
            this.view.searchRoleTemplate.imgClose.setVisibility(false);
            this.view.lblAddRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.selectUserRole");
            this.loadBusinessBankingModule().presentationController.fetchUsersList(customRoleObj);
            this.loadBusinessBankingModule().presentationController.fetchUserRoles(scopeObj.loadBusinessBankingModule().presentationController.fetchCustomRoleSuccess.bind(scopeObj.loadBusinessBankingModule().presentationController), scopeObj.loadBusinessBankingModule().presentationController.fetchCustomRoleFailure.bind(scopeObj.loadBusinessBankingModule().presentationController), "frmPermissionsTemplate");
            this.adjustScreen();
            this.initializeResponsiveViews();
        },

        onClickOfManualRoleSelection: function(customRoleObj) {
            applicationManager.getBusinessUserManager().clearDataMembers();
            this.selectedUser = "";
            this.selectedRoleName = "";
            this.view.segRoleNames.maxHeight = "600dp";
            this.view.lblNoRecord.setVisibility(false);
            this.view.lblNoRecordRole.setVisibility(false);
            this.view.searchRoleTemplate.tbxSearch.text = "";
            this.view.imgManual.src = "radiobtn_active.png";
            this.view.imgCopy.src = "radioinactivebb.png";
            this.view.lblRolePermissions.text = kony.i18n.getLocalizedString("i18n.userManagement.rolePermissions");
            this.view.lblAboutRoleAndPermissions.text = kony.i18n.getLocalizedString("i18n.userManagement.aboutRoleAndPermissions");
            this.view.lblAboutRole.text = kony.i18n.getLocalizedString("i18n.userManagement.aboutRole");
            this.view.flxScrollRightContainer.isVisible = true;
            this.view.flxRoleSeparator.isVisible = false;
            this.view.flxAboutRoleSeparator.isVisible = false;
            this.view.flxPermissionSeparator.isVisible = false;
            this.ExistingUsersSegmentLoaded = false;
            this.ExistingCustomRolesSegmentLoaded = false;
            this.view.imgRole.setVisibility(false);
            this.view.imgUser.setVisibility(false);

            this.loadBusinessBankingModule().presentationController.updateCustomRoleDetails(customRoleObj, false, false);
            this.adjustScreen();
            this.initializeResponsiveViews();
        },

        collapseUsers: function() {
            //       this.view.lblSelectedUser.text = "";
            //       this.view.lblSelectedUser.setVisibility(false);
            this.view.flxExistingUsersExpand.setVisibility(true);
            this.view.flxExistingUsersCollapse.setVisibility(false);
            //       if(this.selectedUser !== undefined && this.selectedUser !== "" && this.selectedUser !== null){
            //         this.view.lblSelectedUser.setVisibility(true);
            //         this.view.lblSelectedUser.text = this.selectedUser;
            //       }
            this.view.segUserNames.setVisibility(false);
            this.adjustScreen();
            this.initializeResponsiveViews();
        },

        collapseRoles: function() {
            //       this.view.lblSelectedRole.text = "";
            //       this.view.lblSelectedRole.setVisibility(false);
            this.view.flxCustomRoleExpand.setVisibility(true);
            this.view.flxCustomRoleCollapse.setVisibility(false);
            //       if(this.selectedRoleName !== undefined && this.selectedRoleName !== "" && this.selectedRoleName !== null){
            //         this.view.lblSelectedRole.setVisibility(true);
            //         this.view.lblSelectedRole.text = this.selectedRoleName;
            //       }
            this.view.segRoleNames.setVisibility(false);
            this.adjustScreen();
            this.initializeResponsiveViews();
        },

        expandUsers: function() {
            this.view.flxExistingUsersExpand.setVisibility(false);
            this.view.flxExistingUsersCollapse.setVisibility(true);
            //       this.view.lblSelectedUser.text = "";
            //       this.view.lblSelectedUser.setVisibility(false);
            this.view.segUserNames.setVisibility(true);
            this.adjustScreen();
            this.initializeResponsiveViews();
        },

        expandRoles: function() {
            this.view.flxCustomRoleExpand.setVisibility(false);
            this.view.flxCustomRoleCollapse.setVisibility(true);
            //       this.view.lblSelectedRole.text = "";
            //       this.view.lblSelectedRole.setVisibility(false);
            if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                this.view.segRoleNames.setVisibility(true);
            } else {
                this.view.segRoleNames.setVisibility(false);
            }
            this.adjustScreen();
            this.initializeResponsiveViews();
        },
        /**
         * Method to pre populate user details in create form.
         * @param {object} userObj - user details object
         */
        populateUserDetails: function(customRoleObj) {
            this.view.tbxName.text = customRoleObj.templateName || "";
        },
        /**
         * validate all user details
         * @return {boolean} true:if all the user details are correct ,false: if user details are not valid
         */
        updateUserDetailsProceedState: function() {
            FormControllerUtility.disableButton(this.view.btnProceedCreate);

            if (CommonUtilities.isEmptyString(this.view.tbxName.text)) {
                return false;
            }

            FormControllerUtility.enableButton(this.view.btnProceedCreate);

            //Extra conditions if it is a edit flow
            if (this.view.btnProceedCreate.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                var customRoleObjEditflow = applicationManager.getBusinessUserManager().getCustomRoleObject();
                if (this.view.tbxName.text !== customRoleObjEditflow.templateName) {
                    FormControllerUtility.enableButton(this.view.btnProceedCreate);
                } else {
                    FormControllerUtility.disableButton(this.view.btnProceedCreate);
                }
            }
        },
        /**
         * Method will validate the ssn number on text changed
         */
        onEnteringSSN: function() {
            this.view.flxRulesUsername.setVisibility(false);
            this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
            if (this.view.tbxSSN.text.length > 0) {
                if (!this.validationUtilManager.isValidSSNNumber(this.view.tbxSSN.text)) {
                    this.view.tbxSSN.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                    this.setErrorMessaage({
                        show: true,
                        errMsgi18nKey: "i18n.login.incorrectSSN"
                    });
                } else {
                    this.setErrorMessaage({
                        show: false
                    });
                    this.view.tbxSSN.skin = "sknSSP42424215Opacity0"; //Default skin
                    this.updateUserDetailsProceedState();
                }
            } else {
                this.updateUserDetailsProceedState();
            }
        },
        /**
         * Method will execute on email text changed
         */
        onUserEmailChanged: function() {
            this.view.flxRulesUsername.setVisibility(false);
            this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
            if (this.view.tbxEmail.text.length > 0) {
                FormControllerUtility.disableButton(this.view.btnProceedCreate);
                this.view.tbxEmail.skin = "sknSSP42424215Opacity0";
                if (!this.validationUtilManager.isValidEmail(this.view.tbxEmail.text)) {
                    this.view.tbxEmail.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                    this.setErrorMessaage({
                        show: true,
                        errMsgi18nKey: "i18n.konybb.createUser.error.InvalidEmail"
                    });
                } else {
                    this.setErrorMessaage({
                        show: false
                    });
                    this.view.tbxEmail.skin = "sknSSP42424215Opacity0"; //Default skin
                    this.updateUserDetailsProceedState();
                }
            } else {
                this.updateUserDetailsProceedState();
            }
        },
        /**
         * Method will validate the entered phone number
         */
        onEnteringPhoneNumber: function() {
            this.view.flxRulesUsername.setVisibility(false);
            this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
            if (this.view.tbxPhoneNum.text.length > 0) {
                if (!this.validationUtilManager.isValidPhoneNumber(this.view.tbxPhoneNum.text)) {
                    FormControllerUtility.disableButton(this.view.btnProceedCreate);
                    this.view.tbxPhoneNum.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                    this.setErrorMessaage({
                        show: true,
                        errMsgi18nKey: "i18n.profile.notAValidPhoneNumber"
                    });
                } else {
                    this.setErrorMessaage({
                        show: false
                    });
                    this.view.tbxPhoneNum.skin = "sknSSP42424215Opacity0"; //Default skin
                    this.updateUserDetailsProceedState();
                }
            } else {
                this.updateUserDetailsProceedState();
            }
        },
        /**
         * Method will validate the entered DOB
         */
        isDobValid: function() {
            this.view.flxRulesUsername.setVisibility(false);
            this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
            if (CommonUtilities.isEmptyString(this.view.CustomDate.getDate()) || !this.validationUtilManager.isAgeValid(this.view.CustomDate.getDate())) {
                FormControllerUtility.disableButton(this.view.btnProceedCreate);
                this.view.CustomDate.flxWrapper.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.konybb.createUser.error.InvalidDOB"
                });
            } else {
                this.setErrorMessaage({
                    show: false
                });
                this.view.CustomDate.flxWrapper.skin = "sknSSP42424215Opacity0"; //Default skin
                this.updateUserDetailsProceedState();
            }
        },
        //     /**
        //          * Method to handle user name start entered
        //          */
        //     onEnteringUserName: function() {
        //       var validationUtility = applicationManager.getValidationUtilManager();
        //       if (this.view.rtxRulesUsername.text && this.view.rtxRulesUsername.text.length !== 0) {
        //         this.view.flxRulesUsername.setVisibility(true);
        //       }
        //       if (!validationUtility.isUsernameValidForPolicy(this.view.tbxUsername.text) && this.view.tbxUsername.text.length !== 0) {
        //         this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
        //         this.view.btnCheckAvailability.setEnabled(false);
        //         this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_DISABLED;
        //         FormControllerUtility.disableButton(this.view.btnProceedCreate);
        //       } else {
        //         this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
        //       }
        //       this.view.flxUsernameAvailability.forceLayout();
        //       this.adjustScreen();
        //     },
        /**
         * Method to handle user name keyup
         */
        //     onUserNameonKeyUp: function() {
        //       FormControllerUtility.disableButton(this.view.btnProceedCreate);
        //       if(this.view.tbxUsername.text.length > 0){
        //         this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
        //         if(this.view.rtxRulesUsername.text && this.view.rtxRulesUsername.text.length !== 0){
        //           this.view.flxRulesUsername.setVisibility(true);
        //         }
        //         this.view.btnCheckAvailability.setVisibility(true);
        //         this.view.flxAvailabilityStatus.setVisibility(false);
        //         this.isUserNameAvailable = false;
        //         if(!this.validationUtilManager.isUsernameValidForPolicy(this.view.tbxUsername.text)) {
        //           this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_DISABLED;
        //           this.view.btnCheckAvailability.setEnabled(false);
        //         } else {
        //           this.isUserNameAvailable = true;
        //           this.view.flxDetailsContainer.lblValidUserName.setVisibility(false);
        //           this.view.btnCheckAvailability.setEnabled(true);
        //           this.view.btnCheckAvailability.skin = ViewConstants.SKINS.USER_BUTTON_ENABLED;
        //         }
        //         this.adjustScreen();
        //       }
        //     },
        /**
         * Method to handle on check user name availability button clicked.
         */
        onCheckUserNameBtnClick: function() {
            if (this.validationUtilManager.isUsernameValidForPolicy(this.view.tbxUsername.text)) {
                this.loadBusinessBankingModule().presentationController.validateUserName({
                    "UserName": this.view.tbxUsername.text.toString()
                });
                this.view.flxUsernameAvailability.forceLayout();
            }
        },
        /**
         * Method to handle proceed button in custom role details form.
         */
        onUserDetailsProceedBtnClick: function(isBack, event) {
            var templateDetails = {
                templateName: this.view.tbxName.text,
            };
            if (this.view.btnProceedCreate.text == kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                isBack = false;
            }
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", false);
            this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnProceedRoles.toolTip = "Continue";
            this.view.btnCancelRoles.setVisibility(true);
            this.view.btnBackAccessRoles.setVisibility(true);
            FormControllerUtility.enableButton(this.view.btnProceedRoles);
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                this.manageCustomRoleData["currentEditFlow"] = "customRoleDetailsEdit";
                //storing data before update service call 
                var templateName = "";


                if (!kony.sdk.isNullOrUndefined(applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName"))) {
                    templateName = applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName");
                }

                this.customRoleDataBeforeUpdate["templateName"] = templateName;

                this.loadBusinessBankingModule().presentationController.updateCustomRoleDetails(templateDetails, isBack, 1);
                //user obj after update

                var templateName1 = "";
                if (!kony.sdk.isNullOrUndefined(templateDetails["templateName"])) {
                    templateName1 = templateDetails["templateName"];
                }
                this.customRoleObjAfterUpdateTemp = cloneJSON(this.customRoleObj);
                this.customRoleObjAfterUpdateTemp["newData"] = [];
                this.customRoleObjAfterUpdateTemp["newData"]["templateName"] = templateName1;

                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObjAfterUpdateTemp, this.otherFeaturesGlobalCopy, this.accountLevelActionsJson, 1);
            } else {
                this.loadBusinessBankingModule().presentationController.updateCustomRoleDetails(templateDetails, isBack, 0);
                this.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                this.view.btnProceedCreate.toolTip = "Continue";
            }
        },


        setUserNamesRowData: function(data) {
            this.view.segUserNames.setData(data);
            this.adjustScreen();
        },

        setRolesNamesRowData: function(data) {
            this.view.segRoleNames.setData(data);
            this.adjustScreen();
        },

        showUsersListUI: function(roles) {
            if (roles.length === 0) {
                this.view.lblNoRecord.setVisibility(true);
                this.view.flxUsers.setVisibility(true);
                this.view.segUserNames.setVisibility(false);
                this.view.flxExistingUsersExpand.setVisibility(false);
                this.view.flxExistingUsersCollapse.setVisibility(false);
                this.view.lblNoRecord.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noUsersFound");
            } else {
                this.roleList = roles;
                var scopeObj = this;
                scopeObj.view.btnBackCreate.setVisibility(false);
                scopeObj.view.btnCancelCreate.setVisibility(true);
                scopeObj.initActions();
                scopeObj.resetUI();
                scopeObj.view.flxSelectRole.setVisibility(true);
                this.view.searchRoleTemplate.setVisibility(true);
                this.view.flxUsers.setVisibility(true);
                this.view.segUserNames.setVisibility(false);
                scopeObj.currentVisibleFlex = "flxSelectRole";
                scopeObj.initUserRolesActions();

                scopeObj.setUserNamesRowData(roles);
                scopeObj.view.segUserNames.onRowClick = this.selectUser;
                // scopeObj.findRole();
                //scopeObj.view.segRoleNames.onRowClick = this.selectRole;
                scopeObj.adjustScreen();
            }
        },

        showRolesListUI: function(roles) {
            if (roles.length === 0) {
                if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                    this.view.flxCustomRole.setVisibility(true);
                    this.view.lblNoRecordRole.setVisibility(true);
                } else {
                    this.view.flxCustomRole.setVisibility(false);
                    this.view.lblNoRecordRole.setVisibility(false);
                }
                this.view.segRoleNames.setVisibility(false);
                this.view.flxCustomRoleCollapse.setVisibility(false);
                this.view.flxCustomRoleExpand.setVisibility(false);
                this.view.lblNoRecordRole.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noCustomRoleFound");
            } else {
                this.customRoleList = roles;
                var scopeObj = this;
                scopeObj.view.btnBackCreate.setVisibility(false);
                scopeObj.view.btnCancelCreate.setVisibility(true);
                scopeObj.initActions();
                scopeObj.resetUI();
                scopeObj.view.flxSelectRole.setVisibility(true);
                this.view.searchRoleTemplate.setVisibility(true);
                if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                    this.view.flxCustomRole.setVisibility(true);
                } else {
                    this.view.flxCustomRole.setVisibility(false);
                }
                this.view.segRoleNames.setVisibility(false);
                this.view.flxUsers.setVisibility(true);
                scopeObj.currentVisibleFlex = "flxSelectRole";
                scopeObj.initRolesActions(true);

                scopeObj.setRolesNamesRowData(roles);
                scopeObj.view.segRoleNames.onRowClick = this.selectCustomRole;
                scopeObj.adjustScreen();
            }
            this.initializeResponsiveViews();
            /*var checkPerForApplyCustomRole =applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY");
            if(!checkPerForApplyCustomRole){
              this.view.flxCustomRole.setVisibility(false);
              this.view.segRoleNames.setVisibility(false);
            }*/
        },

        showRolesListFromUserUI: function(roles, userObj) {

            var scopeObj = this;
            //scopeObj.view.tbxRoleName.onKeyUp = scopeObj.enableRolesButton.bind(this,true);
            this.showCreateCustomRoleUI();
            scopeObj.view.btnBackCreate.setVisibility(false);
            scopeObj.view.btnCancelCreate.setVisibility(true);
            scopeObj.initActions();
            this.view.flxRoleCreation.setVisibility(false);
            this.view.searchRoleTemplate.setVisibility(false);
            this.view.flxCustomRole.setVisibility(false);
            this.view.segRoleNames.setVisibility(false);
            this.view.segUserNames.setVisibility(true);
            this.view.flxUsers.setVisibility(false);
            this.view.lblNoRecord.setVisibility(false);
            this.view.lblNoRecordRole.setVisibility(false);
            scopeObj.currentVisibleFlex = "flxSelectRole";
            scopeObj.initUserRolesActions();

            scopeObj.setUserNamesRowData(roles);
            this.selectUser(userObj, true);
            scopeObj.adjustScreen();
        },


        selectUser: function(context, fromUser) {
            var scopeObj = this;
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("defaultOrexistingRoleSelected", true);
            this.view.flxScrollRightContainer.isVisible = true;
            //       this.view.lblSelectedRole.text = "";
            //       this.view.lblSelectedRole.setVisibility(false);
            this.view.imgRole.setVisibility(false);
            this.view.imgUser.setVisibility(true);
            this.view.flxRoleSeparator.isVisible = true;
            this.view.flxAboutRoleSeparator.isVisible = true;
            this.view.flxPermissionSeparator.isVisible = true;
            var selectedRow;
            var groupId;
            if (fromUser) {
                selectedRow = [0, 0];
                this.view.lblAddRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.selectParentRole");
                groupId = context.SelectedRoleId;
            } else {
                selectedRow = context.selectedRowIndex;
                groupId = this.view.segUserNames.data[selectedRow[1]].group_id;
            }
            var selectedRoleName = this.view.segUserNames.data[selectedRow[1]].lblRoleName.toolTip;
            this.selectedUser = selectedRoleName;
            var selectedRoleId = this.view.segUserNames.data[selectedRow[1]].lblRoleId;
            if (!fromUser) {
                scopeObj.setImageDisplay(this.view.segUserNames, selectedRoleId, context);
                scopeObj.setImageDisable(this.view.segRoleNames);
            }
            this.selectedRoleName = "";
            this.enableRolesButton();

            if (scopeObj.view.btnProceedRoles.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                if (selectedRoleName !== this.currentUserRole) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedRoles);
                } else {
                    FormControllerUtility.disableButton(scopeObj.view.btnProceedRoles);
                }
            }

            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Role_id", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Group_Name", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isExistingUserSelected", true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);

            scopeObj.loadBusinessBankingModule().presentationController.fetchUserDetails(selectedRoleName, groupId,
                scopeObj.loadBusinessBankingModule().presentationController.fetchExistingUserDetailsCompletionCallback.bind(this.loadBusinessBankingModule().presentationController), scopeObj.loadBusinessBankingModule().presentationController.fetchExistingUserDetailsFailureCallback.bind(this.loadBusinessBankingModule().presentationController));
            scopeObj.adjustScreen();
            this.initializeResponsiveViews();
        },



        showUserNamesUI: function(userData) {
            var scopeObj = this;
            var accountsData = scopeObj.fetchAccountsData(userData);
            this.view.flxMainWrapper.setVisibility(false);
            this.view.btnProceedRoles.onClick = this.onExistingUserSelected.bind(this, userData);
            scopeObj.setRowData(accountsData);
            this.view.lblRoleDescription.text = applicationManager.getBusinessUserManager().getCustomRoleAttribute("Group_Name");
            scopeObj.adjustScreen();
        },


        fetchAccountsData: function(userData) {
            var len = userData.accounts.length;
            var accArray = [];
            for (var i = 0; i < len; i++) {
                var accountData = {
                    "id": userData.accounts[i].AccountName,
                };
                accArray.push(accountData);
            }
            return accArray;
        },

        onExistingUserSelected: function(userData) {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("templateName", this.view.tbxRoleName.text);
            this.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnProceedAccess.toolTip = "Continue";
            this.view.btnCancelAccess.setVisibility(true);
            this.view.btnCancelRoles.setVisibility(true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isExistingUserSelected", true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);
            if (this.view.btnProceedRoles.text != kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
            }
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", false);
            this.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnProceedRoles.toolTip = "Continue";

            this.showVerifyUserUI(userData);
            //in case of save and update , need to update the selected role and navigate to verify user page
            //this.loadBusinessBankingModule().presentationController.showAllAvailableAccounts(this.selectedRole,isBack);
        },


        showRolesFromUser: function(userObj) {
            var customRoleList = [];
            var customRole = {
                imgSelectRole: {
                    "src": "radiobtn_active.png",
                    "isVisible": true
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
                isVisible: true
            };
            customRoleList.push(customRole);
            this.showRolesListFromUserUI(customRoleList, userObj);
            this.adjustScreen();
        },


        /**
         * Method to show user roles screen where user has to select a role
         * @param {object} roles - which consists of list of roles
         * @param {object} selectedRoleId - consists of roles already selected
         */
        showRolesUI: function(roles, selectedRoleId) {
            var scopeObj = this;
            scopeObj.view.btnBackCreate.setVisibility(false);
            scopeObj.view.btnCancelCreate.setVisibility(true);
            scopeObj.initActions();
            scopeObj.resetUI();
            scopeObj.view.flxSelectRole.setVisibility(true);
            //scopeObj.view.tbxRoleName.onKeyUp = scopeObj.enableRolesButton.bind(this ,true);
            this.view.searchRoleTemplate.setVisibility(false);
            this.view.flxCustomRole.setVisibility(false);
            this.view.segRoleNames.setVisibility(true);
            this.view.flxUsers.setVisibility(false);
            this.view.segUserNames.setVisibility(false);
            this.view.lblNoRecordRole.setVisibility(false);
            this.view.lblNoRecord.setVisibility(false);
            scopeObj.currentVisibleFlex = "flxSelectRole";
            scopeObj.initRolesActions();
            scopeObj.setGroupRowData(roles);
            scopeObj.findRole();
            scopeObj.view.segRoleNames.onRowClick = this.selectRole;
            scopeObj.adjustScreen();
        },
        /**
         * Method to show user roles
         * @param {object} roles - which consists of list of roles
         * @param {object} selectedRoleId - consists of roles already selected
         */
        showUserRolesUI: function(roles, selectedRoleId) {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.view.flxSelectRole.setVisibility(true);
            scopeObj.currentVisibleFlex = "flxSelectRole";
            scopeObj.setRowData(roles);
            scopeObj.adjustScreen();
        },

        enableRolesButton: function(isTemplateNameChanged) {
            var defaultOrexistingRoleSelected = applicationManager.getBusinessUserManager().getCustomRoleAttribute("defaultOrexistingRoleSelected");
            if (defaultOrexistingRoleSelected && !CommonUtilities.isEmptyString(this.view.tbxRoleName.text) && !this.fetchRoleDetailsFailureFlag && this.isEnableRolesButton) {
                FormControllerUtility.enableButton(this.view.btnProceedRoles);
                if (isTemplateNameChanged && this.view.tbxRoleName.text === applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName")) {
                    FormControllerUtility.disableButton(this.view.btnProceedRoles);
                }
            } else {
                FormControllerUtility.disableButton(this.view.btnProceedRoles);
            }
        },
        /**
         * Method to select the previously selected role
         *  @param {object[]} roles - which consists of list of roles
         *  @param {object} selectedRoleId - consists of roles already selected
         *  @return {object} selectedRoleId - selected roles
         */
        selectRole: function(context) {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("defaultOrexistingRoleSelected", true);
            var scopeObj = this;
            scopeObj.currentVisibleFlex = "flxSelectRole";
            var selectedRow;
            if (context === undefined) {
                selectedRow = [0, 0];
            } else {
                selectedRow = context.selectedRowIndex;
                this.selectedRowValues = context.selectedRowIndex;
            }

            this.enableRolesButton();
            var selectedRoleName = this.view.segRoleNames.data[selectedRow[1]].lblRoleName.toolTip;
            var selectedRoleId = this.view.segRoleNames.data[selectedRow[1]].lblRoleId;
            scopeObj.setImageDisplay(this.view.segRoleNames, selectedRow, context, true);
            if (scopeObj.view.btnProceedRoles.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                if (selectedRoleName !== this.currentUserRole && !CommonUtilities.isEmptyString(this.view.tbxRoleName.text)) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedRoles);
                } else {
                    FormControllerUtility.disableButton(scopeObj.view.btnProceedRoles);
                }
            }
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleNameTemp", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleIdTemp", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isExistingUserSelected", false);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);
            this.view.lblRoleDescription.text = this.view.segRoleNames.data[selectedRow[1]].description;
            scopeObj.loadBusinessBankingModule().presentationController.fetchDefaultRoleActions(selectedRoleId);
            scopeObj.adjustScreen();
            this.initializeResponsiveViews();
        },

        selectCustomRole: function(context) {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("defaultOrexistingRoleSelected", true);
            var scopeObj = this;
            scopeObj.currentVisibleFlex = "flxSelectRole";
            var selectedRow;
            this.view.flxScrollRightContainer.isVisible = true;
            selectedRow = context.selectedRowIndex;
            //       this.view.lblSelectedUser.text = "";
            //       this.view.lblSelectedUser.setVisibility(false);
            this.view.imgRole.setVisibility(true);
            this.view.imgUser.setVisibility(false);
            var selectedRoleName = this.view.segRoleNames.data[selectedRow[1]].lblRoleName.toolTip;
            this.selectedRoleName = selectedRoleName;
            var selectedRoleId = this.view.segRoleNames.data[selectedRow[1]].lblRoleId;
            var parentId = this.view.segRoleNames.data[selectedRow[1]].parent_id;
            scopeObj.setImageDisplay(this.view.segRoleNames, selectedRoleId, context);
            this.enableRolesButton();
            this.selectedUser = "";
            scopeObj.setImageDisable(this.view.segUserNames);
            if (scopeObj.view.btnProceedRoles.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                if (selectedRoleName !== this.currentUserRole) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedRoles);
                } else {
                    FormControllerUtility.disableButton(scopeObj.view.btnProceedRoles);
                }
            }
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Role_id", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Group_Name", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isExistingUserSelected", true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);

            scopeObj.loadBusinessBankingModule().presentationController.navigateToManagePermissions(selectedRoleId, parentId, scopeObj.loadBusinessBankingModule().presentationController.fetchExistingCustomRoleDetailsSuccess.bind(scopeObj.loadBusinessBankingModule().presentationController), scopeObj.loadBusinessBankingModule().presentationController.fetchExistingCustomRoleDetailsFailureCallback.bind(scopeObj.loadBusinessBankingModule().presentationController));
            scopeObj.adjustScreen();
            this.initializeResponsiveViews();
        },
        /**
         * Method to select the previously selected role.
         */
        findRole: function() {
            var scopeObj = this;
            var selectedRow = [0, 0];
            scopeObj.currentVisibleFlex = "flxSelectRole";
            var len = applicationManager.getBusinessUserManager().getCustomRoleAttribute("NumRoles");
            for (var i = 0; i < len; i++) {
                selectedRow = [0, i]
                if (this.view.segRoleNames.data[selectedRow[1]].lblRoleId == applicationManager.getBusinessUserManager().customRoleObj.SelectedRoleId) {
                    selectedRow = [0, i];
                    scopeObj.view.segRoleNames.selectedRowIndex[1] = i;
                    break;
                } else {
                    selectedRow = [0, 0];
                }
            }
            var selectedRoleName = this.view.segRoleNames.data[selectedRow[1]].lblRoleName.toolTip;
            var selectedRoleId = this.view.segRoleNames.data[selectedRow[1]].lblRoleId;
            scopeObj.setImageDisplay(this.view.segRoleNames, selectedRow, "", true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("defaultOrexistingRoleSelected", true);
            if (scopeObj.view.btnProceedRoles.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                FormControllerUtility.disableButton(this.view.btnProceedRoles);
            } else {
                this.enableRolesButton();
            }
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleNameTemp", selectedRoleName);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleIdTemp", selectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isExistingUserSelected", false);
            this.view.lblRoleDescription.text = this.view.segRoleNames.data[selectedRow[1]].description;
            scopeObj.loadBusinessBankingModule().presentationController.fetchDefaultRoleActions(selectedRoleId);
            scopeObj.adjustScreen();
        },

        setImageDisplay: function(segmentName, selectedRow, context, isManual) {
            var scopeObj = this;
            var segData;
            var selectedId;
            if (!isManual) {
                if (segmentName.id === "segRoleNames") {
                    segData = this.customRoleList;
                    selectedId = selectedRow;
                } else {
                    segData = this.roleList;
                    selectedId = selectedRow;
                }
            } else {
                segData = segmentName.data;
                selectedId = selectedRow[1];
            }
            if (!kony.sdk.isNullOrUndefined(segData)) {
                var selectedSegId;
                segData.forEach(function(arrayElement, k) {

                    if (!isManual) {
                        selectedSegId = arrayElement.lblRoleId;
                    } else
                        selectedSegId = k;
                    if (selectedSegId === selectedId) {
                        arrayElement.imgArrow = {
                            isVisible: true
                        };
                        arrayElement.imgSelectRole = {
                            src: "radiobtn_active.png",
                            isVisible: true
                        };
                        arrayElement.flxInnerRole.skin = "sknflxfbfbfb1pxShadowc0c0c0";
                    } else {
                        arrayElement.imgArrow = {
                            isVisible: false
                        };
                        arrayElement.imgSelectRole = {
                            src: "radioinactivebb.png",
                            isVisible: true
                        };
                        arrayElement.flxInnerRole.skin = "sknFlxffffffborderradE3E3E3";
                    }
                });
                segmentName.setData(segmentName.data);
            }
        },
        setImageDisable: function(segmentName) {
            var segData;
            if (segmentName.id === "segRoleNames") {
                segData = this.customRoleList;
            } else {
                segData = this.roleList;
            }
            if (!kony.sdk.isNullOrUndefined(segData)) {
                segData.forEach(function(arrayElement) {

                    arrayElement.imgArrow = {
                        isVisible: false
                    };
                    arrayElement.imgSelectRole = {
                        src: "radioinactivebb.png",
                        isVisible: true
                    };
                    arrayElement.flxInnerRole.skin = "sknFlxffffffborderradE3E3E3";
                });
                segmentName.setData(segmentName.data);
            }
        },
        /**
         * Method to populate the Segment with roles
         * @param {object[]} roles - which consists of list of roles
         * @returns {object} mapping for the Roles segment
         */
        populateRolesSegment: function(roles) {
            var scopeObj = this;
            return roles.map(function(role) {
                return {
                    "lblRoleName": role.Name,
                    "roleData": role,
                    "richTextDescription": role.Description, //will depend on the form of backend data
                    "flxSelectRole": "flxSelectRole",
                    "imgSelectRole": {
                        src: ViewConstants.IMAGES.RADIO_BTN_INACTIVE,
                        onTouchEnd: scopeObj.rolesAccessValidation.bind(scopeObj)
                    }
                }
            });
        },
        /**createNewUser
         * Method to handle navigate to Business Banking account Dashboard on cancellation of Create User
         */
        rolesAccessValidation: function() {
            var scopeObj = this;
            var rolesSeg = scopeObj.view.SegSeachInfo;
            if (rolesSeg.selectedRowIndex) {
                FormControllerUtility.enableButton(scopeObj.view.btnProceedRoles);
                return;
            }
            FormControllerUtility.disableButton(scopeObj.view.btnProceedRoles);
        },
        /**Confirm role
         * Method to handle navigate account access after confirming the roles
         * @param {object} event - consists of event
         * @param {object} isBack - consists of parameter specifying if it is a back scenario
         */
        onUserRolesProceedOrBackBtnClick: function(isBack, event) {
            var scopeObj = this;
            var rolesSeg = scopeObj.view.segRoleNames;
            var selectedRole = {};

            var selectedRoleNameTemp = applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleNameTemp");
            var selectedRoleIdTemp = applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleIdTemp");
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", selectedRoleNameTemp);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", selectedRoleIdTemp);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Role_id", selectedRoleIdTemp);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("Group_Name", selectedRoleNameTemp);

            applicationManager.getBusinessUserManager().setCustomRoleAttribute("templateName", this.view.tbxRoleName.text);
            selectedRole = rolesSeg.data[scopeObj.selectedRowValues[1]].lblRoleName.toolTip;
            scopeObj.view.btnBackAccessRoles.setVisibility(true);
            this.selectedRole = {
                "roleName": rolesSeg.data[scopeObj.selectedRowValues[1]].lblRoleName.toolTip,
                "roleID": rolesSeg.data[scopeObj.selectedRowValues[1]].lblRoleId
            };
            this.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnProceedAccess.toolTip = "Continue";
            this.view.btnCancelAccess.setVisibility(true);
            this.view.btnBackAccess.setVisibility(true);
            //Manage user flow
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                scopeObj.view.btnCancelRoles.setVisibility(false);
                this.manageCustomRoleData["currentEditFlow"] = "roleEdit";
                //storing the old ones in case of failure use these to revert back the changes            	
                this.roleDataBeforeUpdate["accountLevelActionsMainCopy"] = cloneJSON(this.accountLevelActionsMainCopy);
                this.roleDataBeforeUpdate["accountLevelActionsJson"] = cloneJSON(this.accountLevelActionsJson);
                this.roleDataBeforeUpdate["otherFeaturesGlobalCopy"] = cloneJSON(this.otherFeaturesGlobalCopy);
                this.roleDataBeforeUpdate["SelectedRoleName"] = this.customRoleObj.SelectedRoleName;
                this.roleDataBeforeUpdate["SelectedRoleId"] = this.customRoleObj.SelectedRoleId;
                this.roleDataBeforeUpdate["Role_id"] = this.customRoleObj.SelectedRoleId;
                this.roleDataBeforeUpdate["Group_Name"] = this.customRoleObj.SelectedRoleName;

                //Check for any role change to reset all the changes for Manage Userflow
                if (!(kony.sdk.isNullOrUndefined(this.selectedRole.roleName)) && Array.isArray(this.accountLevelActionsJson)) {
                    if (this.accountLevelActionsJson.length !== 0 && (this.selectedRole.roleName !== this.currentUserRole)) {
                        this.accountLevelActionsJson = [];
                        this.accountLevelActionsMainCopy = [];
                        this.manageCustomRoleData["roleChanged"] = 1;
                        this.otherFeaturesGlobalCopy = cloneJSON(this.userDataStore["IsNotAccountLevel"]);
                    }
                }
                this.customRoleObjAfterUpdateTemp = cloneJSON(this.customRoleObj);
                this.customRoleObjAfterUpdateTemp["SelectedRoleName"] = this.selectedRole.roleName;
                this.customRoleObjAfterUpdateTemp["SelectedRoleId"] = this.selectedRole.roleID;
                this.Intializeglobaldata(0);
                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObjAfterUpdateTemp, this.otherFeaturesGlobalCopy, this.accountLevelActionsJson, 0);
            } else {
                scopeObj.view.btnCancelRoles.setVisibility(true);
                scopeObj.view.btnCancelAccess.setVisibility(true);
                if (scopeObj.view.btnProceedRoles.text != kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
                    isBack = true;
                }
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("isEdit", false);
                scopeObj.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                scopeObj.view.btnProceedRoles.toolTip = "Continue";
                this.loadBusinessBankingModule().presentationController.showAllAvailableAccounts(this.selectedRole, isBack);
            }
        },
        /**
         * Method to handle UI of the Account Access screen
         *  @param {object} accounts - which consists of list of selected accounts of the user
         *  @param {object} selectedAccounts - consists of accounts already selected
         */
        showAccountAccessUI: function(accounts, selectedAccounts) {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.initAccountAccessActions();
            this.isRoleEdited = false;
            scopeObj.view.flxSelectAccounts.setVisibility(true);
            scopeObj.currentVisibleFlex = "flxSelectAccounts";
            var data = this.populateAccountSegment(accounts, selectedAccounts);
            this.view.segAccounts.setData(data);
            if (!kony.sdk.isNullOrUndefined(selectedAccounts)) {
                if (selectedAccounts.length > 0) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedAccess);
                }
            }
            if (scopeObj.view.btnProceedAccess.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
            }
            scopeObj.adjustScreen();
        },

        onAccountSelectionProceedOrBackBtnClick: function() {

            var accountSelected = this.view.segAccounts.data;
            var selectedRows = this.view.segAccounts.selectedRowIndices[0][1];
            var accounts = [];
            for (var i = 0; i < selectedRows.length; i++) {
                accounts.push(accountSelected[i].lblAccountName);
            }
            this.loadBusinessBankingModule().presentationController.saveAccountsAndNavigate(accounts);

        },
        /**
         * Method to populate the Segment with account-list
         *  @param {object} accounts - which consists of list of accounts
         *  @param {object} selectedAccounts - consists of accounts already selected
         * @returns {object} formatted accounts in the segment
         */
        populateAccountSegment: function(accounts, selectedAccounts) {
            var scopeObj = this;
            var selectedAccounts = selectedAccounts ? selectedAccounts.map(function(account) {
                return account.Account_id || account.id;
            }) : [];
            return accounts.map(function(account, index) {
                return {
                    "Account_id": account.Account_id,
                    "lblAccountName": CommonUtilities.getAccountDisplayNameNew(account),
                    "lblCheckAccount": {
                        text: (selectedAccounts.indexOf(account.Account_id) >= 0) ? OLBConstants.FONT_ICONS.CHECBOX_SELECTED : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        skin: "sknlblDelete20px",
                        onTouchEnd: scopeObj.onAccountCheckboxClick.bind(scopeObj, index)
                    }
                };
            });
        },
        /**
         * Method to check or uncheck the checkbox
         * @param {var} index : specifies the row-index
         */
        onAccountCheckboxClick: function(index) {
            var scopeObj = this;
            var accountData = scopeObj.view.segAccounts.data;
            FormControllerUtility.toggleFontCheckbox(accountData[index].lblCheckAccount);
            scopeObj.view.segAccounts.setDataAt(accountData[index], index);
            scopeObj.accountAccessValidation();
            if (scopeObj.view.btnProceedAccess.text !== kony.i18n.getLocalizedString("i18n.userManagement.Continue")) {
                //checking for any data change
                var flag = 0;
                var accountDataLen = 0;

                for (var i = 0; i < accountData.length; i++) {
                    if (accountData[i]["lblCheckAccount"]["text"] === "C")
                        accountDataLen++;
                }
                if (this.customRoleObj.selectedAccounts.length !== accountDataLen) {
                    flag = 1;
                    if (accountDataLen === 0)
                        flag = 0;
                } else {
                    for (var i = 0; i < this.customRoleObj.selectedAccounts.length; i++) {
                        var accId = this.customRoleObj.selectedAccounts[i]["Account_id"];
                        for (var j = 0; j < accountData.length; j++) {
                            if (accId === accountData[j]["Account_id"] && this.customRoleObj.selectedAccounts[i]["lblCheckAccount"]["text"] !== accountData[j]["lblCheckAccount"]["text"]) {
                                flag = 1;
                                break;
                            }
                        }
                        if (flag === 1)
                            break;
                    }
                }
                if (flag)
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedAccess);
                else
                    FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
            }
        },
        /**
         * Method to handle navigate to Business Banking Users Dashboard on cancellation of Create User
         */
        accountAccessValidation: function() {
            var scopeObj = this;
            var accountSegData = scopeObj.view.segAccounts.data;
            for (var i in accountSegData) {
                if (FormControllerUtility.isFontIconChecked(accountSegData[i].lblCheckAccount)) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceedAccess);
                    return;
                }
            }
            FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
        },
        /**
         * Method to handle navigate to Business Banking Users Dashboard on cancellation of Create User
         */
        navigateToBBUsersDashboard: function() {
            this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
        },
        /**
         * Method to handle navigate to BBAccounts Dashboard on cancellation of Create User
         */
        navigateToBBAccountsLanding: function() {
            this.loadBusinessBankingModule().presentationController.navigateToBBAccountsLandingDashboard();
        },
        /**
         * Method to handle navigate to Business Banking Presentation Controller on click of Proceed on Account Selection screen
         *  @param {object} event - consists of event
         *  @param {object} isBack - consists of parameter specifying if it is a back scenario
         */
        onUserAccountAccessProceedOrBackBtnClick: function(event, isBack) {
            var scopeObj = this;
            var accounts = [];
            var accountSegData = scopeObj.view.segAccounts.data;
            for (var i in accountSegData) {
                if (FormControllerUtility.isFontIconChecked(accountSegData[i].lblCheckAccount)) {
                    accounts.push(accountSegData[i]);
                }
            }

            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                this.manageCustomRoleData["currentEditFlow"] = "accountAccessEdit";
                //making a service call to update the data first and if the service call is success then update the original global variables.(mock both userObj[accounts] and account level json)
                this.customRoleObjAfterUpdateTemp = cloneJSON(this.customRoleObj);
                this.customRoleObjAfterUpdateTemp["SelectedAccounts"] = accounts;
                this.customRoleObjAfterUpdateTemp["selectedAccounts"] = accounts;
                this.Intializeglobaldata(1, accounts);
                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObjAfterUpdateTemp, this.otherFeaturesGlobalCopy, this.accountLevelActionsJson, 1);
            } else {
                scopeObj.view.btnCancelAccess.setVisibility(true);
                scopeObj.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
                scopeObj.view.btnProceedAccess.toolTip = "Continue";
                this.loadBusinessBankingModule().presentationController.setSelectedAccounts(accounts);
                if (!isBack) {
                    this.loadBusinessBankingModule().presentationController.saveAccountsAndNavigate(accounts);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
                }
            }
        },


        initVerifyUserDetails: function() {
            var userDetailsWidgetDataMap = {
                "lblLeftSideContent": "lblLeftSideContent",
                "lblRIghtSideContent": "lblRIghtSideContent"
            };
            this.view.segUserDetails.widgetDataMap = userDetailsWidgetDataMap;
            var AccountWidgetDataMap = {
                "lblName": "lblAccountName"
            };
            this.view.segAccountNames.widgetDataMap = AccountWidgetDataMap;
        },

        prepareUserSegmentData: function(userObj) {
            var data = [];
            for (var i in userObj) {
                data.push({
                    "lblLeftSideContent": i + ":",
                    "lblRIghtSideContent": userObj[i]
                });
            }
            return data;
        },

        setDataForUserSelectedRole: function(selectedRole, templateName) {
            this.view.lblAssignedRole.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRoleName");
            this.view.lblRoleName.text = templateName;
            this.view.lblParentRoleValue.text = selectedRole;
            this.view.lblParentRoleKey.text = kony.i18n.getLocalizedString("i18n.customRole.ParentRole");
            this.view.lblUserRole.text = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");

        },

        setAccountSegData: function(selectedAccounts, isEdit) {
            var accdata = [];
            for (var i = 0; i < selectedAccounts.length; i++) {
                if (selectedAccounts[i].AccountName !== undefined) {
                    accdata.push({
                        "lblAccountName": selectedAccounts[i].AccountName
                    });
                } else {
                    accdata.push({
                        "lblAccountName": selectedAccounts[i].lblAccountName
                    });
                }
            }
            return accdata;
        },

        Intializeglobaldata: function(fromSaveAndUpdate, accounts) {
            //for Account access update service call
            var exisitingAccounts = [];
            if (fromSaveAndUpdate === 1 && !(kony.sdk.isNullOrUndefined(accounts))) {
                exisitingAccounts = this.customRoleObj.selectedAccounts;
                this.customRoleObj.selectedAccounts = accounts;
            }

            var data = this.userDataStore["IsAccountLevel"];
            var scope = this;
            //Check for any role change to reset all the changes for normal create user flow
            if (this.accountLevelActionsJson.length !== 0 && this.manageCustomRoleData["manageCustomRoleFlow"] === 0) {
                if (this.currentUserRole !== this.customRoleObj.SelectedRoleName) {
                    this.accountLevelActionsJson = [];
                    this.accountLevelActionsMainCopy = [];
                    this.otherFeaturesGlobalCopy = cloneJSON(this.userDataStore["IsNotAccountLevel"]);
                }
            }
            //Update AccountLevelJson when Accounts are Edited
            if (this.accountLevelActionsJson.length !== 0) {
                //updating the main copy to preserve the updates
                for (var i = 0; i < this.accountLevelActionsJson.length; i++) {
                    for (var j = 0; j < this.accountLevelActionsMainCopy.length; j++) {
                        var search = -1;
                        if (this.accountLevelActionsJson[i]["account_id"] === this.accountLevelActionsMainCopy[j]["account_id"]) {
                            search = j;
                            break;
                        }
                    }
                    //old Accounts to preserve any updates
                    if (search !== -1) {
                        this.accountLevelActionsMainCopy[search] = cloneJSON(this.accountLevelActionsJson[i]);
                    }
                    //pushing new Accounts if any
                    else {
                        var Maincopy = this.accountLevelActionsMainCopy;
                        Maincopy.push(
                            cloneJSON(scope.accountLevelActionsJson[i]));
                    }
                }

                //Checking for any change in account Selection
                var accountSelectionChanged = 0;
                if (this.accountLevelActionsJson.length !== 0 && (this.accountLevelActionsJson.length !== this.customRoleObj.selectedAccounts.length)) {
                    accountSelectionChanged = 1;
                } else {
                    for (var i = 0; i < this.accountLevelActionsJson.length; i++) {
                        if (this.accountLevelActionsJson[i]["account_id"] !== this.customRoleObj.selectedAccounts[i]["account_id"]) {
                            accountSelectionChanged = 1;
                            break;
                        }
                    }
                }

                //Reinitializing the Global accountLevelActionsJson to match with the current selection
                if (accountSelectionChanged === 1) {
                    var newaccountLevelActionsJson = [];
                    var accounts = cloneJSON(this.customRoleObj["selectedAccounts"]);
                    accounts.forEach(function(element, i) {
                        var index = -1;
                        //finding index for the matched ones
                        for (var i = 0; i < scope.accountLevelActionsMainCopy.length; i++) {
                            if (scope.accountLevelActionsMainCopy[i]["account_id"] === element["Account_id"]) {
                                index = i;
                                break;
                            }
                        }
                        if (index === -1) {
                            newaccountLevelActionsJson.push({
                                "account_id": element["Account_id"],
                                "accountName": element["lblAccountName"],
                                "isMonetarySelected": true,
                                "featureData": cloneJSON(data)
                            });
                        } else {
                            newaccountLevelActionsJson.push(
                                cloneJSON(scope.accountLevelActionsMainCopy[index])
                            );
                        }
                    });
                    //Finally pointing the new one to Global accountLevelActionsJson object 
                    this.accountLevelActionsJson = cloneJSON(newaccountLevelActionsJson);
                }
            }

            //initializing all the global Variables required to preserve the updates       

            //accountLevelActionsJson JsonData (Main)
            if (this.accountLevelActionsJson.length === 0) {
                var scope = this;
                var Acclevjson = this.accountLevelActionsJson;
                var accounts = cloneJSON(this.customRoleObj["selectedAccounts"]);
                accounts.forEach(function(element, i) {
                    Acclevjson.push({
                        "account_id": element["Account_id"],
                        "accountName": element["lblAccountName"],
                        "isMonetarySelected": true,
                        "featureData": cloneJSON(data)
                    });
                    //setting the role when verify user is loaded for first time
                    scope.currentUserRole = scope.customRoleObj["SelectedRoleName"];
                    if (scope.manageCustomRoleData["manageCustomRoleFlow"] === 1 && !(kony.sdk.isNullOrUndefined(scope.customRoleObjAfterUpdateTemp["SelectedRoleName"]))) {
                        scope.currentUserRole = scope.customRoleObjAfterUpdateTemp["SelectedRoleName"];
                    }
                })
                //Creating a global Copy to save state when accounts are edited.
                this.accountLevelActionsMainCopy = cloneJSON(Acclevjson);
            }
            //Monetary Limits Segmentdata
            for (var i = 0; i < this.customRoleObj.selectedAccounts.length; i++) {
                this.monetaryLimitsSegdata[i] = this.getTransactionDefaultValues(i);
            }
            //Accountlevel Segement data
            for (var i = 0; i < this.customRoleObj.selectedAccounts.length; i++) {
                this.accountLevelActionsSegdata[i] = cloneJSON(this.getDataForflxAccountSelectionPermissionsAccountLevelPermissionsForEditDefaultData(this.customRoleObj, i));
            }
            //Saveand update for Otherfeatures 
            if (this.otherFeaturesGlobalCopy.length === 0) {
                this.otherFeaturesGlobalCopy = cloneJSON(this.userDataStore["IsNotAccountLevel"]);
            }
            //reverting back for accounts update service call
            if (fromSaveAndUpdate === 1 && !(kony.sdk.isNullOrUndefined(accounts))) {
                this.customRoleObj.selectedAccounts = exisitingAccounts;
            }

        },

        setupUIbasedOnMonetaryPermissions: function(areAccountLevelPermissionsPresent, areMonetaryPermissionsPresent) {
            var scopeObj = this;
            if (areAccountLevelPermissionsPresent) {
                scopeObj.setupTabBodyNewAccountCollapsibleList();
                scopeObj.showFeatureActionReadOnly();
            }
            scopeObj.view.flxPermissionsHeader.setVisibility(areAccountLevelPermissionsPresent);
            scopeObj.view.flxTopSeparator11.setVisibility(areAccountLevelPermissionsPresent);
            scopeObj.view.flxAccountPermissionCollapsible.setVisibility(areAccountLevelPermissionsPresent);
            scopeObj.view.flxAccountTransactionLimits.setVisibility(areMonetaryPermissionsPresent);
            scopeObj.view.flxTopSeparator13.setVisibility(areMonetaryPermissionsPresent);
            scopeObj.view.flxTransactionLimitAccountCollapsible.setVisibility(areMonetaryPermissionsPresent);
            scopeObj.view.flxTopSeparator15.setVisibility(areAccountLevelPermissionsPresent);
            scopeObj.view.flxVerifyUser.forceLayout();
        },

        setDataForRoleDetailsContainer: function(roleData) {
            this.view.lblRoleName.text = roleData.RoleName;
            this.view.lblParentRoleValue.text = roleData.ParentRole;
        },

        setDataForAccountLevelFeatureActionsContainer: function(accountLevelFeatures) {
            this.view.TabBodyAccountWiseFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseFeatures.addOnlySectionHeaders(this.getSectionHeadersForReadOnlyMonetaryFeatures(accountLevelFeatures));
        },

        getSectionHeadersForReadOnlyMonetaryFeatures: function(accounts) {
            var scope = this;
            var res = [];
            var template;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                template = "flxAccountSelectionMobile"
            } else {
                template = "flxAccountSelectionPermissions"
            }
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.accountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "lblHeadingTop": {
                        "isVisible": true
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var segData = scope.view.TabBodyAccountWiseFeatures.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyAccountWiseFeatures.addRowsAndUpdateSection(scope.getFeaturesDataForSelectedAccount(accounts, context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
                                scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                                scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
                            } else {
                                scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },
                    "template": template
                });
            });
            return res;
        },

        getFeaturesDataForSelectedAccount: function(accounts, index) {
            var features = cloneJSON(accounts[index]["featureData"]);
            features.forEach(function(featureType, j) {
                if (features.length !== j + 1) {
                    featureType["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                featureType["lblFeatureHeader"] = featureType["featureName"];
                var actions = featureType["Actions"];
                actions.forEach(function(element, i) {
                    featureType["lblActionName" + (i + 1)] = {
                        text: (element["actionName"]),
                        toolTip: element["actionName"]
                    };
                    featureType["lblActiveSelection" + (i + 1)] = {
                        text: "F",
                        skin: (element["isSelected"]) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                    };
                });
            });
            return features;
        },

        getOtherFeatureActionsData: function(notAccountLevel) {
            var otherFeatures = cloneJSON(notAccountLevel);
            var len = otherFeatures.length;
            var main = [];
            for (var i = 0; i < len; i++) {
                var FeatureData = otherFeatures[i];
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
                if (i !== len - 1) {
                    obj["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                main.push(obj);
            }
            return main;
        },

        setDataForOtherFeatureActionsContainer: function(otherFeatures) {
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseOtherFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseOtherFeatures.addOnlySectionHeaders(this.getSectionHeadersOtherFeatures(otherFeatures));
        },

        getActionLimitsReadOnlyDataMap: function() {
            return {
                "btnReset": "btnReset",
                "flxAccountSelection": "flxAccountSelection",
                "flxAccountSelectionPermissions": "flxAccountSelectionPermissions",
                "flxCreateUserTransDetails": "flxCreateUserTransDetails",
                "flxDailyTransApproveLimit": "flxDailyTransApproveLimit",
                "flxDailyTransApproveLimitHolder": "flxDailyTransApproveLimitHolder",
                "flxDailyTransDenialLimit": "flxDailyTransDenialLimit",
                "flxDailyTransDenialLimitHolder": "flxDailyTransDenialLimitHolder",
                "flxDailyTransaction": "flxDailyTransaction",
                "flxDropDown": "flxDropDown",
                "flxLimitsHeader": "flxLimitsHeader",
                "flxPerTransApproveLimit": "flxPerTransApproveLimit",
                "flxPerTransApproveLimitHolder": "flxPerTransApproveLimitHolder",
                "flxPerTransDenialLimit": "flxPerTransDenialLimit",
                "flxPerTransDenialLimitHolder": "flxPerTransDenialLimitHolder",
                "flxPerTransaction": "flxPerTransaction",
                "flxTransactionTable": "flxTransactionTable",
                "flxWeeklyTransApproveLimit": "flxWeeklyTransApproveLimit",
                "flxWeeklyTransApproveLimitHolder": "flxWeeklyTransApproveLimitHolder",
                "flxWeeklyTransDenialLimit": "flxWeeklyTransDenialLimit",
                "flxWeeklyTransDenialLimitHolder": "flxWeeklyTransDenialLimitHolder",
                "flxWeeklyTransaction": "flxWeeklyTransaction",
                "lblAccountSelect": "lblAccountSelect",
                "lblDailyTransApproveAmount": "lblDailyTransApproveAmount",
                "lblDailyTransApproveSymbol": "lblDailyTransApproveSymbol",
                "lblDailyTransDenialAmount": "lblDailyTransDenialAmount",
                "lblDailyTransDenialSymbol": "lblDailyTransDenialSymbol",
                "lblDailyTransHeader": "lblDailyTransHeader",
                "lblDailyTransLimit": "lblDailyTransLimit",
                "lblDenialLimit": "lblDenialLimit",
                "lblDropDown": "lblDropDown",
                "lblFeatureHeader": "lblFeatureHeader",
                "lblHeaderSeperator": "lblHeaderSeperator",
                "lblHeadingBottom": "lblHeadingBottom",
                "lblHeadingTop": "lblHeadingTop",
                "lblPerTransApproveLimit": "lblPerTransApproveLimit",
                "lblPerTransApproveSymbol": "lblPerTransApproveSymbol",
                "lblPerTransDenialLimit": "lblPerTransDenialLimit",
                "lblPerTransDenialSymbol": "lblPerTransDenialSymbol",
                "lblPerTransHeader": "lblPerTransHeader",
                "lblPerTransLimit": "lblPerTransLimit",
                "lblPreApprovalLimit": "lblPreApprovalLimit",
                "lblRowSeperator": "lblRowSeperator",
                "lblTransactionLimit": "lblTransactionLimit",
                "lblTransactionType": "lblTransactionType",
                "lblWeeklyTransApproveAmount": "lblWeeklyTransApproveAmount",
                "lblWeeklyTransApproveSymbol": "lblWeeklyTransApproveSymbol",
                "lblWeeklyTransDenialAmount": "lblWeeklyTransDenialAmount",
                "lblWeeklyTransDenialSymbol": "lblWeeklyTransDenialSymbol",
                "lblWeeklyTransHeader": "lblWeeklyTransHeader",
                "lblWeeklyTransLimit": "lblWeeklyTransLimit",
                "tbxDailyTransApproveAmount": "tbxDailyTransApproveAmount",
                "tbxDailyTransDenialAmount": "tbxDailyTransDenialAmount",
                "tbxPerTransApproveAmount": "tbxPerTransApproveAmount",
                "tbxPerTransDenialAmount": "tbxPerTransDenialAmount",
                "tbxWeeklyTransApproveAmount": "tbxWeeklyTransApproveAmount",
                "tbxWeeklyTransDenialAmount": "tbxWeeklyTransDenialAmount",
                "flxTransactionLimitsMobile": "flxTransactionLimitsMobile",
                "flxTransactionLimitValues": "flxTransactionLimitValues",
                "flxGroupHeaderComp": "flxGroupHeaderComp",
                "flxTransactionLimitValuesSection": "flxTransactionLimitValuesSection",
                "flxPreapprovalLimitValuesSection": "flxPreapprovalLimitValuesSection",
                "flxDenialLimitValuesSection": "flxDenialLimitValuesSection",
                "lblRowHeaderTitle": "lblRowHeaderTitle",
                "lblHeaderSeparator": "lblHeaderSeparator",
                "lblTransactionLimitHeaderTitle": "lblTransactionLimitHeaderTitle",
                "lblPreApprovalLimitHeaderTitle": "lblPreApprovalLimitHeaderTitle",
                "lblDenialLimitheaderTitle": "lblDenialLimitheaderTitle",
                "lblPerTransaction1": "lblPerTransaction1",
                "lblPerTransaction2": "lblPerTransaction2",
                "lblPerTransaction3": "lblPerTransaction3",
                "lblDailyTransaction1": "lblDailyTransaction1",
                "lblDailyTransaction2": "lblDailyTransaction2",
                "lblDailyTransaction3": "lblDailyTransaction3",
                "lblWeeklyTransaction1": "lblWeeklyTransaction1",
                "lblWeeklyTransaction2": "lblWeeklyTransaction2",
                "lblWeeklyTransaction3": "lblWeeklyTransaction3",
                "lblPerTransactionValue1": "lblPerTransactionValue1",
                "lblPerTransactionValue2": "lblPerTransactionValue2",
                "lblPerTransactionValue3": "lblPerTransactionValue3",
                "lblDailyTransactionValue1": "lblDailyTransactionValue1",
                "lblDailyTransactionValue2": "lblDailyTransactionValue2",
                "lblDailyTransactionValue3": "lblDailyTransactionValue3",
                "lblWeeklyTransactionValue1": "lblWeeklyTransactionValue1",
                "lblWeeklyTransactionValue2": "lblWeeklyTransactionValue2",
                "lblWeeklyTransactionValue3": "lblWeeklyTransactionValue3",
                "lblRowSeparator": "lblRowSeparator",
                "lblRowSeparator1": "lblRowSeparator1",
                "lblRowSeparato2": "lblRowSeparato2",
            };
        },

        getDataForCustomRoleActionLimits: function(accounts) {
            var scope = this;
            var res = [];
            var template;
            var show = false;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                template = "flxAccountSelectionMobile"
                show = true;
            } else {
                template = "flxAccountSelectionPermissions"
                show = false;
            }
            //filter the accounts first(Enhancement)
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.accountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var segData = scope.view.TabBodyNewAccountCollapsibleList.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": true
                                },
                                "lblHeadingTop": {
                                    "isVisible": true
                                },
                                "btnReset": {
                                    "text": "Reset to default",
                                    "isVisible": false
                                },
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "lblHeadingTop": {
                                    "isVisible": show
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyNewAccountCollapsibleList.addRowsAndUpdateSection(scope.getActionLimitsData(accounts, context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
                                scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                                scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
                            } else {
                                scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },
                    "lblHeadingTop": {
                        "text": "-"
                    },
                    "lblHeadingBottom": {
                        "text": "-"
                    },
                    "flxLimitsHeader": {
                        "isVisible": false
                    },
                    "btnReset": {
                        "isVisible": false
                    },
                    lblTransactionType: {
                        "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType")
                    },
                    lblTransactionLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblTransactionLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblPreApprovalLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblPreApprovalLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblDenialLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    lblDenialLimitheaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    "template": template
                });
            })
            return res;
        },

        getActionLimitsData: function(accountLevelActionsJson, index) {
            var res = [];
            var features = accountLevelActionsJson[index]["featureData"];
            features.forEach(function(featureType) {
                var actions = featureType["Actions"]
                actions.forEach(function(element) {
                    if (element["isSelected"] === true && element["actionType"] === "MONETARY") {
                        res.push({
                            lblPerTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
                            },
                            lblDailyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
                            },
                            lblWeeklyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
                            },
                            lblTransactionLimitHeaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                            },
                            lblPreApprovalLimitHeaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                            },
                            lblDenialLimitheaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                            },
                            lblHeaderSeperator: {
                                "text": "-"
                            },
                            lblHeaderSeparator: {
                                "text": "-"
                            },
                            lblRowSeperator: {
                                "text": "-"
                            },
                            lblRowSeparator: {
                                "text": "-"
                            },
                            lblRowSeparato2: {
                                "text": "-"
                            },
                            lblRowSeparator1: {
                                "text": "-"
                            },
                            lblFooterSeperator: {
                                "text": "-"
                            },
                            lblFeatureHeader: {
                                "text": element["actionName"]
                            },
                            lblRowHeaderTitle: {
                                "text": element["actionName"]
                            },
                            lblPerTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblDailyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblPerTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["MAX_TRANSACTION_LIMIT"]) ? "0" : element["MAX_TRANSACTION_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["MAX_TRANSACTION_LIMIT"]) ? "0" : element["MAX_TRANSACTION_LIMIT"]), true) + " "
                            },
                            lblDailyTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_LIMIT"]) ? "0" : element["DAILY_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_LIMIT"]) ? "0" : element["DAILY_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_LIMIT"]) ? "0" : element["WEEKLY_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_LIMIT"]) ? "0" : element["WEEKLY_LIMIT"]), true) + " "
                            },
                            lblPerTransApproveLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_APPROVE_LIMIT"]) ? "0" : element["PER_TRANSACTION_APPROVE_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_APPROVE_LIMIT"]) ? "0" : element["PER_TRANSACTION_APPROVE_LIMIT"]), true) + " "
                            },
                            lblPerTransDenialLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_DENIAL_LIMIT"]) ? "0" : element["PER_TRANSACTION_DENIAL_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_DENIAL_LIMIT"]) ? "0" : element["PER_TRANSACTION_DENIAL_LIMIT"]), true) + " "
                            },
                            lblDailyTransApproveAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_APPROVE_LIMIT"]) ? "0" : element["DAILY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_APPROVE_LIMIT"]) ? "0" : element["DAILY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblDailyTransDenialAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_DENIAL_LIMIT"]) ? "0" : element["DAILY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_DENIAL_LIMIT"]) ? "0" : element["DAILY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransApproveAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_APPROVE_LIMIT"]) ? "0" : element["WEEKLY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_APPROVE_LIMIT"]) ? "0" : element["WEEKLY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransDenialAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_DENIAL_LIMIT"]) ? "0" : element["WEEKLY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_DENIAL_LIMIT"]) ? "0" : element["WEEKLY_DENIAL_LIMIT"]), true) + " "
                            },

                        });
                    }
                });
            });
            return res;
        },

        setDataForMonetaryActionsLimitsContainer: function(accountlevelActions) {
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.sectionHeaderTemplate = "flxAccountSelectionMobile";
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.rowTemplate = "flxTransactionLimitsMobile";
            } else {
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.rowTemplate = "flxCreateUserTransDetails";
            }
            this.view.TabBodyNewAccountCollapsibleList.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyNewAccountCollapsibleList.segTemplates.widgetDataMap = this.getActionLimitsReadOnlyDataMap();
            this.view.TabBodyNewAccountCollapsibleList.addOnlySectionHeaders(this.getDataForCustomRoleActionLimits(accountlevelActions));
        },

        showManageCustomRoleContainer: function() {
            this.resetUI();
            this.currentVisibleFlex = "flxVerifyUser";
            var editVisibility = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE");
            var deleteTempPermission = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_DELETE");
            var applyRolePermission = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY") &&
                applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_CREATE");
            this.setEditButtonsVisibility(editVisibility);
            this.view.btnBackCreate.setVisibility(false);
            this.view.btnCancelCreate.setVisibility(true);
            this.view.btnBacktoAllUsers.setVisibility(false);
            this.view.flxVerifyUser.setVisibility(true);
            this.view.flxParentRole.setVisibility(true);
            this.view.flxUserDetailHeader.setVisibility(false);
            this.view.flxTopSeparator5.setVisibility(false);
            this.view.flxUserDetailsSegment.setVisibility(false);
            this.view.flxTopSeparator6.setVisibility(false);
            this.view.btnVerifyUserActionsCancel.setVisibility(deleteTempPermission);
            this.view.btnSaveAndProceed.setVisibility(applyRolePermission);
        },

        setContentForManageCustomRoleContainer: function() {
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + " - " + kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
            this.view.lblAssignedRole.text = kony.i18n.getLocalizedString("i18n.customRole.RoleName");
            this.view.lblParentRoleKey.text = kony.i18n.getLocalizedString("i18n.customRole.ParentRole");
            this.view.lblUserRole.text = kony.i18n.getLocalizedString("i18n.bulkWire.primaryDetails");
            if (applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY")) {
                this.view.btnSaveAndProceed.setVisibility(true);
                this.view.btnSaveAndProceed.text = kony.i18n.getLocalizedString("i18n.LocateUs.APPLY") + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
                this.view.btnSaveAndProceed.toolTip = kony.i18n.getLocalizedString("i18n.LocateUs.APPLY") + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            } else {
                this.view.btnSaveAndProceed.setVisibility(false);
            }
            this.view.btnVerifyUserActionsCancel.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            this.view.btnVerifyUserActionsCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            this.view.btnVerifyUserActionsBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        },

        setEventListenersForManageCustomRoleContainer: function(customRoleResponse) {
            //all the event listeners that are part of manage custom role container are defined here
            var scopeObj = this;
            scopeObj.view.btnVerifyUserActionsCancel.onClick = function() {
                scopeObj.showCancelPopUp("deleteTemplate");
            };
            scopeObj.view.btnSaveAndProceed.onClick = function() {
                scopeObj.loadBusinessBankingModule().presentationController.navigateToUsers(scopeObj.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(scopeObj.loadBusinessBankingModule().presentationController), null, "frmPermissionsTemplate");
            };
            scopeObj.view.btnVerifyUserActionsBack.onClick = function() {
                scopeObj.loadBusinessBankingModule().presentationController.navigateToUserRoles();
            };
            scopeObj.view.btnBacktoAllUsers.onClick = function() {
                scopeObj.loadBusinessBankingModule().presentationController.navigateToUserRoles();
            };
            scopeObj.view.btnRoleEdit.onClick = scopeObj.editRoleSelection;
            scopeObj.view.btnEditAccount.onClick = scopeObj.editAccountSelection;
        },

        setDataForManageCustomRoleContainer: function(obj, saveAndUpdate) {
            var scopeObj = this;
            // need to delete these helper methods if they are not required in manage custom role flow
            //       this.setDataForAccountLevelFeatureActionsContainer(customRoleObject.accountlevelActions);
            //       this.setDataForOtherFeatureActionsContainer(this.getOtherFeatureActionsData(customRoleObject.notAccountLevel));
            //       this.setDataForMonetaryActionsLimitsContainer(customRoleObject.accountlevelActions);

            var templateValue = saveAndUpdate == 1 ? obj.userObject.templateName : obj.CustomRoleName
            this.setDataForRoleDetailsContainer({
                "RoleName": templateValue,
                "ParentRole": saveAndUpdate == 1 ? obj.SelectedRoleName : obj.ParentRole,
            });

            applicationManager.getBusinessUserManager().setCustomRoleAttribute("templateName", templateValue); // change the value as per payload.
            var accountsData = saveAndUpdate == 1 ? obj.SelectedAccounts : obj.accounts;
            var accdata = this.setAccountSegData(accountsData, true) || [];
            scopeObj.view.segAccountNames.setData(accdata);
            scopeObj.setupUIforOtherfeatures(this.fetchOtherFeaturesActions(this.otherFeaturesGlobalCopy));
            scopeObj.setupUIbasedOnMonetaryPermissions(scopeObj.userDataStore["IsAccountLevel"].length !== 0, scopeObj.userDataStore["MONETARY"].length !== 0);
            this.collapseAllSegments();
        },

        showVerifyUserUI: function(obj) {
            var scopeObj = this;
            //used in case of create custom role flow when existing user is selected
            var isExistingUserSelected = applicationManager.getBusinessUserManager().getCustomRoleAttribute("isExistingUserSelected");
            //used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            var isPermissionsFromSelectedUserEdited = applicationManager.getBusinessUserManager().getCustomRoleAttribute("isPermissionsFromSelectedUserEdited");
            this.setEditButtonsVisibility(true);
            scopeObj.view.btnBackCreate.setVisibility(false);
            scopeObj.view.btnCancelCreate.setVisibility(true);
            scopeObj.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.konybb.common.Proceed");
            scopeObj.initActions();
            scopeObj.resetUI();
            scopeObj.view.flxVerifyUser.setVisibility(true);
            this.currentVisibleFlex = "flxVerifyUser";
            scopeObj.initVerifyUserDetails();
            scopeObj.customRoleObj = obj;
            scopeObj.view.btnRoleEdit.onClick = scopeObj.editRoleSelection.bind();
            scopeObj.view.btnEditAccount.onClick = scopeObj.editAccountSelection.bind();
            scopeObj.view.btnEdit.onClick = scopeObj.editCreateCustomRole.bind();

            if (isExistingUserSelected === true || (this.isRoleEdited)) {
                scopeObj.view.btnVerifyUserActionsBack.onClick = function() {
                    scopeObj.resetUI();
                    scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRoles.rolesHeader");
                    scopeObj.view.flxSelectRole.setVisibility(true);
                    scopeObj.view.btnBackAccessRoles.isVisible = false;
                    scopeObj.currentVisibleFlex = "flxSelectRole";
                    scopeObj.adjustScreen();
                }.bind(this);
            } else {
                scopeObj.view.btnVerifyUserActionsBack.onClick = function() {
                    this.loadBusinessBankingModule().presentationController.showAllAvailableAccounts(this.customRoleObj["SelectedRole"], false);
                    scopeObj.view.btnBackAccessRoles.isVisible = false;
                    this.adjustScreen();
                }.bind(this);
            }

            scopeObj.view.btnVerifyUserActionsCancel.onClick = function() {
                this.showCancelPopUp();
                this.adjustScreen();
            }.bind(this);

            scopeObj.view.btnSaveAndProceed.onClick = function() {
                this.loadBusinessBankingModule().presentationController.createCustomRoleTemplate(scopeObj.customRoleObj, this.otherFeaturesGlobalCopy, this.accountLevelActionsJson);
                this.adjustScreen();
            }.bind(this);

            if (!kony.sdk.isNullOrUndefined(this.manageCustomRoleData["manageCustomRoleFlow"]) && this.manageCustomRoleData["manageCustomRoleFlow"] == 1) {
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.viewAndEditDetails");
            }

            scopeObj.view.btnSaveAndProceed.setVisibility(true);
            scopeObj.view.btnVerifyUserActionsCancel.setVisibility(true);
            scopeObj.view.btnVerifyUserActionsBack.setVisibility(true);
            scopeObj.view.btnBacktoAllUsers.setVisibility(false);
            scopeObj.view.btnVerifyUserActionsBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            scopeObj.view.btnVerifyUserActionsCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            scopeObj.view.btnSaveAndProceed.text = kony.i18n.getLocalizedString("i18n.common.confirm");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.CustomRoleVerifyCreate");
            var accdata = [];
            var userdata;
            if (isExistingUserSelected === true && !isPermissionsFromSelectedUserEdited) {

                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.Group_id);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.Group_Name);

                //added in case of existing custom role template selected  
                if (!kony.sdk.isNullOrUndefined(obj.ParentRoleId)) {
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.ParentRoleId);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.ParentRole);
                }
                accdata = scopeObj.setAccountSegData(obj.accounts, true);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedAccounts", obj.accounts);
                this.setupManageUserBasedOnMonetaryPermissions(obj);

                this.CustomRoleObjBc = applicationManager.getBusinessUserManager().getCustomRoleObject();
                this.customRoleObj = {};

                this.customRoleObj.SelectedRoleName = this.CustomRoleObjBc["SelectedRoleName"];
                this.customRoleObj.SelectedRoleId = this.CustomRoleObjBc["SelectedRoleId"];
                var SelectedAcc = this.CustomRoleObjBc["SelectedAccounts"];
                SelectedAcc.forEach(function(element, i) {
                    SelectedAcc[i]["lblAccountName"] = SelectedAcc[i]["AccountName"];
                    SelectedAcc[i]["lblCheckAccount"] = {
                        "text": "C"
                    };
                });
                this.customRoleObj.selectedAccounts = SelectedAcc;
                this.customRoleObj.SelectedAccounts = SelectedAcc;
                this.currentUserRole = this.CustomRoleObjBc["SelectedRoleName"];
            } else {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.SelectedRoleId);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.SelectedRoleName);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("Role_id", obj.SelectedRoleId);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("Group_Name", obj.SelectedRoleName);
                var role;
                if (applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleName") === undefined) {
                    role = applicationManager.getBusinessUserManager().customRoleObj.Group_Name;
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", role);
                }
                accdata = scopeObj.setAccountSegData(obj.selectedAccounts, false);
            }
            this.Intializeglobaldata(0);
            scopeObj.view.segUserDetails.isVisible = false;
            this.view.flxUserDetailHeader.isVisible = false;
            this.view.flxTopSeparator5.isVisible = false;
            this.view.flxTopSeparator6.isVisible = false;
            scopeObj.setDataForUserSelectedRole(applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleName"), applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName"));
            scopeObj.view.segAccountNames.setData(accdata);
            scopeObj.setupUIforOtherfeatures(this.fetchOtherFeaturesActions(this.otherFeaturesGlobalCopy));
            scopeObj.setupUIbasedOnMonetaryPermissions(scopeObj.userDataStore["IsAccountLevel"].length !== 0, scopeObj.userDataStore["MONETARY"].length !== 0);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", false);
            this.collapseAllSegments();
            scopeObj.adjustScreen();
        },

        setupManageUserBasedOnMonetaryPermissions: function(data) {
            var scopeObj = this;
            var dataStore = segregateFeatureDataForManageUser(data);

            //setting feature level isselected for other features when manage user is clicked
            if (!(kony.sdk.isNullOrUndefined(dataStore["notAccountLevel"]))) {
                for (var i = 0; i < dataStore["notAccountLevel"].length; i++) { //for every feature				
                    var flag = 0;
                    for (var k = 0; k < dataStore["notAccountLevel"][i]["Actions"].length; k++) {
                        if (dataStore["notAccountLevel"][i]["Actions"][k]["isSelected"]) {
                            flag = 1;
                            dataStore["notAccountLevel"][i]["isSelected"] = true;
                            break;
                        }
                        if (flag === 0) {
                            dataStore["notAccountLevel"][i]["isSelected"] = false;
                        }
                    }
                }
            }

            if (!(kony.sdk.isNullOrUndefined(dataStore["userDataStore"])) && !(kony.sdk.isNullOrUndefined(dataStore["accountlevelActions"])) && !(kony.sdk.isNullOrUndefined(dataStore))) {
                this.accountLevelActionsJson = cloneJSON(dataStore["accountlevelActions"]);
                this.accountLevelActionsMainCopy = cloneJSON(dataStore["accountlevelActions"]);
                this.otherFeaturesGlobalCopy = cloneJSON(dataStore["notAccountLevel"]);
                this.userDataStore["IsAccountLevel"] = cloneJSON(dataStore["userDataStore"]["IsAccountLevel"]);
                this.userDataStore["MONETARY"] = cloneJSON(dataStore["userDataStore"]["MONETARY"]);
                this.userDataStore["NON_MONETARY"] = cloneJSON(dataStore["userDataStore"]["NON_MONETARY"]);
                this.userDataStore["IsNotAccountLevel"] = cloneJSON(dataStore["userDataStore"]["IsNotAccountLevel"]);
                //Storing the copy in manage user data object
                this.manageCustomRoleData["userDataStoreIsAccountLevel"] = cloneJSON(this.userDataStore["IsAccountLevel"]);
                this.manageCustomRoleData["manageAccountLevelActionsJson"] = cloneJSON(this.accountLevelActionsJson);
            }
            scopeObj.view.flxVerifyUser.forceLayout();
            this.adjustScreen();
        },

        fetchOtherFeaturesActions: function(store) {
            var NONM = store;
            var len = NONM.length;
            var main = [];
            for (var i = 0; i < len; i++) {
                var FeatureData = NONM[i];
                var obj = {
                    "lblFeatureHeader": FeatureData.featureName
                };
                for (var j = 0; j < FeatureData.Actions.length; j++) {
                    obj["flxActions" + (j + 1)] = {
                        "isVisible": true
                    };
                    obj["lblActionName" + (j + 1)] = {
                        "text": FeatureData.Actions[j].actionName
                    };
                    obj["lblActiveSelection" + (j + 1)] = {
                        "text": "F",
                        "skin": (FeatureData.Actions[j].isSelected) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                    };
                }
                if (i !== len - 1) {
                    obj["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                main.push(obj);
            }

            return main;
        },

        setupFeatureDataForManageUser: function(data) {
            data.forEach(function(FeatureData) {

                FeatureData["lblFeatureHeader"] = FeatureData["featureName"];

                for (var i = 0; i < FeatureData.actions.length; i++) {
                    FeatureData["lblActionName" + (i + 1)] = {
                        "text": FeatureData.actions[i].actionName
                    };

                    FeatureData["lblActiveSelection" + (i + 1)] = {
                        "text": "F",
                        "skin": (FeatureData.actions[i].isSelected) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                    };
                }
            });
            this.customRoleObj["featureData"] = data;
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseOtherFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseOtherFeatures.addOnlySectionHeaders(this.getSectionHeadersOtherFeatures(this.customRoleObj["featureData"]));
        },

        setupAccountLevelPermissionsForManageUser: function(data) {
            data.forEach(function(FeatureData) {
                FeatureData["lblFeatureHeader"] = FeatureData["featureName"];
                for (var i = 0; i < FeatureData.actions.length; i++) {
                    FeatureData["lblActionName" + (i + 1)] = {
                        "text": FeatureData.actions[i].actionName
                    };

                    FeatureData["lblActiveSelection" + (i + 1)] = {
                        "text": "F",
                        "skin": (FeatureData.actions[i].isSelected) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                    };
                }
            });
            this.customRoleObj["accountLevelFeatureData"] = data;

            this.view.TabBodyAccountWiseFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseFeatures.addOnlySectionHeaders(this.getSectionHeadersOtherFeatures(this.customRoleObj["accountLevelFeatureData"]));
        },

        setupAccountLevelLimitsForManageUser: function(data) {
            //this.view.TabBodyNewAccountCollapsibleList.segTemplates
        },

        collapseAllSegments: function() {
            var updateCollapseParams = {
                "lblDropDown": {
                    "text": "O"
                },
                "flxLimitsHeader": {
                    "isVisible": false
                },
                "btnReset": {
                    "isVisible": false
                }
            };
            this.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
            this.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
            this.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
            this.view.TabBodyNew.collapseSection(updateCollapseParams);
            this.view.TabBodyAccountLevelPermissions.collapseSection(updateCollapseParams);
        },

        /**
         * Method to show select Roles screen on edit from verify user screen.
         */
        editRoleSelection: function() {
            var scopeObj = this;
            scopeObj.resetUI();
            // isPermissionsFromSelectedUserEdited used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", true);
            var isExistingUserSelected = applicationManager.getBusinessUserManager().getCustomRoleAttribute("isExistingUserSelected");
            if (isExistingUserSelected) {
                this.isRoleEdited = true;
            }
            scopeObj.view.flxSelectRole.setVisibility(true);
            scopeObj.view.flxRoleCreation.setVisibility(false);
            scopeObj.currentVisibleFlex = "flxSelectRole";
            scopeObj.view.btnProceedRoles.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            scopeObj.view.tbxRoleName.text = applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName");
            scopeObj.view.btnCancelRoles.setVisibility(false);
            scopeObj.view.btnProceedRoles.toolTip = "Save And Update";
            scopeObj.view.btnProceedRoles.onClick = this.onUserRolesProceedOrBackBtnClick.bind(this, true);
            FormControllerUtility.disableButton(scopeObj.view.btnProceedRoles);
            scopeObj.loadBusinessBankingModule().presentationController.fetchRoles(scopeObj.loadBusinessBankingModule().presentationController.onFetchDefaultUserRolesSuccess.bind(scopeObj.loadBusinessBankingModule().presentationController));
            scopeObj.adjustScreen();
        },

        /**
         * Method to show Accounts screen on edit from verify user screen.
         */
        editAccountSelection: function() {
            var scopeObj = this;
            scopeObj.resetUI();
            //isPermissionsFromSelectedUserEdited used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", true);
            scopeObj.initVerifyUserDetails();
            scopeObj.view.flxSelectAccounts.setVisibility(true);
            scopeObj.loadBusinessBankingModule().presentationController.showAllAvailableAccounts(applicationManager.getBusinessUserManager().getCustomRoleAttribute("SelectedRoleName"), false);
            scopeObj.view.btnProceedAccess.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            scopeObj.view.btnProceedAccess.toolTip = "Save And Update";
            FormControllerUtility.disableButton(scopeObj.view.btnProceedAccess);
            scopeObj.view.btnCancelAccess.setVisibility(false);
            scopeObj.adjustScreen();
        },

        /**
         * Method to show User Details screen on edit from verify user screen.
         */
        editCreateCustomRole: function() {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.view.flxApplyCustomRole.setVisibility(true);
            scopeObj.view.btnBackCreate.setVisibility(true);
            scopeObj.view.btnCancelCreate.setVisibility(false);
            scopeObj.loadBusinessBankingModule().presentationController.showCreatePermissionsTemplate({
                "edit": true
            });
            this.currentVisibleFlex = "flxApplyCustomRole"; //change the flex name as per requirement.
            scopeObj.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            scopeObj.view.btnProceedCreate.toolTip = "Save And Update";
            FormControllerUtility.disableButton(scopeObj.view.btnProceedCreate);
            scopeObj.view.btnProceedCreate.onClick = this.onUserDetailsProceedBtnClick.bind(this, true);
            scopeObj.view.btnBackCreate.onClick = function() {
                scopeObj.view.btnBackCreate.setVisibility(false);
                scopeObj.view.btnCancelCreate.setVisibility(true);
                scopeObj.resetUI();
                scopeObj.view.flxVerifyUser.setVisibility(true);
                scopeObj.currentVisibleFlex = "flxVerifyUser";
                if (!kony.sdk.isNullOrUndefined(applicationManager.getBusinessUserManager().getCustomRoleAttribute("isEditManager")) && applicationManager.getBusinessUserManager().getCustomRoleAttribute("isEditManager")) {
                    scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.viewAndEditDetails");
                } else {
                    scopeObj.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.createAndVerifyUser");
                }
                scopeObj.adjustScreen();
            }
            scopeObj.adjustScreen();
        },
        /**
         * Method to handle the display of Transaction Limit screen UI
         *  @param {object} limits - which consists of list of accounts
         *  @param {object} selectedLimits - consists of limits already entered
         */
        showTransactionAccessUI: function(limits, selectedLimits) {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.view.flxLeftContainerTransferPermissions.setVisibility(true);
            var transactionLimitsData = scopeObj.populateTransferLimitSegment(limits, selectedLimits);
            scopeObj.view.segBBTransferPermissions.setData(transactionLimitsData);
            scopeObj.validateTransactionLimitsUI();
            scopeObj.adjustScreen();
        },
        /**
         * Method to populate the Segment for transaction limits
         * @param {object} limits - which consists of list of account-limits
         * @param {object} selectedLimits - consists of limits already entered
         * @returns {object} formatted accounts in the segment
         */
        populateTransferLimitSegment: function(limits, selectedLimits) {
            var scopeObj = this;
            var selectedLimitsMap = {};
            if (selectedLimits) {
                selectedLimits.forEach(function(obj) {
                    selectedLimitsMap[obj.Id || obj.Service_id] = obj;
                })
            }
            return limits.map(function(limit, index) {
                return {
                    "lblTransferType": limit.Name,
                    "maxTransactionLimit": limit.MaxTransferLimit,
                    "minTransferLimit": limit.MinTransferLimit,
                    "lblMaxTransactionLimit": kony.i18n.getLocalizedString("i18n.konybb.createUser.MaxTransactionLimit"),
                    "lblMaxDailyLimit": kony.i18n.getLocalizedString("i18n.konybb.createUser.MaxDailyLimit"),
                    "lblDailyLimitCurrSymbol": applicationManager.getConfigurationManager().configurations.getItem("CURRENCYCODE"),
                    "lblCurrSymbol": applicationManager.getConfigurationManager().configurations.getItem("CURRENCYCODE"),
                    "maxDailyLimit": limit.MaxDailyLimit,
                    "serviceId": limit.Service_id,
                    "tbxMaxTransactionValue": {
                        text: selectedLimitsMap[limit.Service_id] ? selectedLimitsMap[limit.Service_id].MaxTransactionLimit : "",
                        onKeyUp: scopeObj.validateTransactionLimitsUI.bind(scopeObj)
                    },
                    "flxMaxTransactionLimit": {
                        skin: ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20
                    },
                    "flxMaxDailyLimit": {
                        skin: ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20
                    },
                    "tbxMaxDailyValue": {
                        text: selectedLimitsMap[limit.Service_id] ? selectedLimitsMap[limit.Service_id].MaxDailyLimit : "",
                        onKeyUp: scopeObj.validateTransactionLimitsUI.bind(scopeObj)
                    }
                }
            });
        },
        /**
         * Method to handle validation of Transaction Limits
         */
        validateTransactionLimitsUI: function() {
            var scopeObj = this;
            scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
            this.adjustScreen();
            var limitsSegData = scopeObj.view.segBBTransferPermissions.data;
            FormControllerUtility.disableButton(this.view.btnProceedTransferPermissions);
            for (var i in limitsSegData) {
                if (limitsSegData[i].tbxMaxTransactionValue.text === "" || limitsSegData[i].tbxMaxDailyValue.text === "") {
                    FormControllerUtility.disableButton(this.view.btnProceedTransferPermissions);
                    return;
                }
            }
            FormControllerUtility.enableButton(this.view.btnProceedTransferPermissions);
        },
        /**
         * Method to handle back of Transaction Limits
         */
        onBackTransferPermission: function() {
            var scopeObj = this;
            scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
            var limits = [];
            var limitsSegData = scopeObj.view.segBBTransferPermissions.data;
            for (var i in limitsSegData) {
                var limit = {
                    "Service_id": limitsSegData[i].serviceId,
                    "MaxTransactionLimit": limitsSegData[i].tbxMaxTransactionValue.text,
                    "MaxDailyLimit": limitsSegData[i].tbxMaxDailyValue.text
                };
                limits.push(limit);
            }
            scopeObj.loadBusinessBankingModule().presentationController.addTransactionLimitsOnBack(limits);
        },
        /**
         * Method to handle validation of Transaction Limits
         * @returns {object} limits
         */
        validateTransactionLimitsWithServiceLimits: function() {
            var scopeObj = this;
            scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
            var limits = [];
            var flag = 0;
            var limitsSegData = scopeObj.view.segBBTransferPermissions.data;
            for (var i in limitsSegData) {
                var tbxMaxTranValue = Number.parseInt(CommonUtilities.deFormatAmount(limitsSegData[i].tbxMaxTransactionValue.text));
                var tbxMaxDailyValue = Number.parseInt(CommonUtilities.deFormatAmount(limitsSegData[i].tbxMaxDailyValue.text));
                var maxTranValue = Number.parseInt(CommonUtilities.deFormatAmount(limitsSegData[i].maxTransactionLimit));
                var maxDailyLimit = Number.parseInt(CommonUtilities.deFormatAmount(limitsSegData[i].maxDailyLimit));
                var minTransferLimit = Number.parseInt(CommonUtilities.deFormatAmount(limitsSegData[i].minTransferLimit));
                if ((tbxMaxTranValue <= maxTranValue && tbxMaxTranValue >= minTransferLimit) && (tbxMaxDailyValue <= maxDailyLimit && tbxMaxDailyValue >= minTransferLimit)) {
                    var limit = {
                        "Service_id": limitsSegData[i].serviceId,
                        "Name": limitsSegData[i].lblTransferType,
                        "MaxTransactionLimit": CommonUtilities.deFormatAmount(limitsSegData[i].tbxMaxTransactionValue.text),
                        "MaxDailyLimit": CommonUtilities.deFormatAmount(limitsSegData[i].tbxMaxDailyValue.text)
                    };
                    limitsSegData[i].flxMaxTransactionLimit.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                    limitsSegData[i].flxMaxDailyLimit.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20
                    limits.push(limit);
                } else {
                    FormControllerUtility.disableButton(this.view.btnProceedTransferPermissions);
                    if (tbxMaxTranValue > maxTranValue || tbxMaxTranValue < minTransferLimit) {
                        limitsSegData[i].flxMaxTransactionLimit.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                    } else {
                        limitsSegData[i].flxMaxTransactionLimit.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                    }
                    if (tbxMaxDailyValue > maxDailyLimit || tbxMaxDailyValue < minTransferLimit) {
                        limitsSegData[i].flxMaxDailyLimit.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                    } else {
                        limitsSegData[i].flxMaxDailyLimit.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                    }
                    flag = 1;
                }
            }
            if (flag === 1) {
                this.view.lblErrorMessageTransferPermissions.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.ErrorMessageTransactionLimits");
                scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(true);
                scopeObj.view.flxErrorMessageTransferPermissions.setFocus();
                limits = [];
            }
            scopeObj.view.segBBTransferPermissions.setData(limitsSegData);
            scopeObj.adjustScreen();
            return limits;
        },
        /**
         * Method to handle validation of Transaction Limits
         */
        onUserTransactionAccessNextBtnClick: function() {
            var scopeObj = this;
            var limits = scopeObj.validateTransactionLimitsWithServiceLimits();
            if (limits.length) {
                FormControllerUtility.showProgressBar(this.view);
                scopeObj.loadBusinessBankingModule().presentationController.confirmTransactionLimits(limits);
            }
        },

        setupUIforAccountLevelPermissions: function() {
            var data = this.userDataStore["MONETARY"];
            var scopeObj = this;

            function jsonConcat(o1, o2) {
                for (var key in o2) {
                    o1[key] = o2[key];
                }
                return o1;
            }
            var widgetDataMap = {};
            var rowtemplate = "flxFeaturePermissions";
            widgetDataMap = jsonConcat(widgetDataMap, this.getWidgetDataMapForSegAccountLevelPermissions());
            if (kony.application.getCurrentBreakpoint() <= 1024) {
                widgetDataMap = this.getWidgetDataMapForSegAccountLevelPermissionsForTablet();
                rowtemplate = "flxFeaturePermissionsTablet";
            }
            widgetDataMap = jsonConcat(widgetDataMap, this.getWidgetDataMapForSegAccountSelection());
            this.resetUI();
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") + kony.i18n.getLocalizedString("i18n.konybb.CreateUserAccountLevelPermissions").slice(11, 38);
            this.view.TabBodyAccountLevelPermissions.segTemplates.rowTemplate = rowtemplate;
            this.view.TabBodyAccountLevelPermissions.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountLevelPermissions.segTemplates.widgetDataMap = widgetDataMap;
            this.view.btnViewAccountLevelPermissionsActionsCancel.onClick = this.backToVerifyUser.bind(this);
            this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate.onClick = this.saveAndUpdateAccountLevelActions.bind(this);
            FormControllerUtility.disableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
            this.view.TabBodyAccountLevelPermissions.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountLevelPermissions.addOnlySectionHeaders(this.getDataForflxAccountSelectionPermissionsAccountLevelPermissionsForEdit());
            scopeObj.view.TabBodyAccountLevelPermissions.setFormView(scopeObj);
            this.view.flxAccountLevelPermissions.isVisible = true;
            scopeObj.currentVisibleFlex = "flxAccountLevelPermissions";
            this.adjustScreen();
        },

        saveAndUpdateAccountLevelActions: function() {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
            var segData = this.view.TabBodyAccountLevelPermissions.segTemplates.data;
            for (var i = 0; i < this.customRoleObj.selectedAccounts.length; i++) {
                if (segData[i][1].length !== 0)
                    this.accountLevelActionsSegdata[i] = segData[i][1];
            }
            //Navigating to verify user page 	
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                this.manageCustomRoleData["currentEditFlow"] = "accountLevelFeaturesEdit";
                //making a service call to update the data first and if the service call is success then update the original global variables.
                var accountLevelActionsJsonAfterUpdate = this.updateFeatureActionsJson(this.accountLevelActionsJson, this.accountLevelActionsSegdata);
                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObj, this.otherFeaturesGlobalCopy, accountLevelActionsJsonAfterUpdate, 0);
            } else {
                //update json data on save and proceed
                this.accountLevelActionsJson = this.updateFeatureActionsJson(this.accountLevelActionsJson, this.accountLevelActionsSegdata);
                this.loadBusinessBankingModule().presentationController.navigateToVerifyUser("frmPermissionsTemplate", this.customRoleObj);
            }
        },


        getDataForflxAccountSelectionPermissionsAccountLevelPermissionsForEdit: function() {
            var data = this.userDataStore["MONETARY"];
            var accounts = this.customRoleObj["selectedAccounts"];
            var scope = this;
            var res = [];
            var accounts = this.customRoleObj["selectedAccounts"];
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.lblAccountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "lblHeadingTop": {
                        "isVisible": true,
                        "text": "-"
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var segData = scope.view.TabBodyAccountLevelPermissions.segTemplates.data;
                            for (var i = 0; i < accounts.length; i++) {
                                if (segData[i][1].length !== 0)
                                    scope.accountLevelActionsSegdata[i] = segData[i][1];
                            }
                            var segData = scope.view.TabBodyAccountLevelPermissions.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": true
                                },
                                "btnReset": {
                                    "text": "Reset to default",
                                    "isVisible": false
                                }
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyAccountLevelPermissions.addRowsAndUpdateSection(scope.accountLevelActionsSegdata[context.sectionIndex], context.sectionIndex, updateParams, updateCollapseParams);
                                var segData = scope.view.TabBodyAccountLevelPermissions.segTemplates.data;

                                for (var i = 0; i < segData.length; i++) {
                                    var sdata = segData[i][1];
                                    sdata.forEach(function(arrayElement, k) {
                                        arrayElement.lblDescription = {
                                            isVisible: false
                                        };
                                        arrayElement.flxShowDescription = {
                                            isVisible: false
                                        };
                                        arrayElement.flxPermissionTooltip = {
                                            isVisible: true,
                                            onClick: function(eventobject, context) {
                                                var sddData = scope.view.TabBodyAccountLevelPermissions.segTemplates.data;
                                                var pdata = sddData[context.sectionIndex][1];
                                                var rowData = pdata[context.rowIndex];
                                                if (rowData.flxShowDescription.isVisible === true) {
                                                    rowData.flxShowDescription = {
                                                        isVisible: false
                                                    };
                                                    rowData.lblDescription = {
                                                        isVisible: false
                                                    };
                                                } else {
                                                    rowData.flxShowDescription = {
                                                        isVisible: true
                                                    };
                                                    rowData.lblDescription = {
                                                        text: rowData["featureDescription"],
                                                        isVisible: true
                                                    };
                                                }
                                                scope.view.TabBodyAccountLevelPermissions.segTemplates.setDataAt(rowData, context.rowIndex, context.sectionIndex);
                                                scope.adjustScreen();
                                            }
                                        }

                                    });
                                    segData[i][1] = sdata;
                                }
                                scope.view.TabBodyAccountLevelPermissions.segTemplates.setData(segData);

                            } else {
                                scope.view.TabBodyAccountLevelPermissions.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },
                    "lblHeadingBottom": {
                        "text": "-"
                    },
                    "flxLimitsHeader": {
                        "isVisible": false
                    },
                    "btnReset": {
                        "isVisible": false
                    },
                    "template": "flxAccountSelectionPermissions"
                });
            });
            return res;
        },


        getDataForflxAccountSelectionPermissionsAccountLevelPermissionsForEditDefaultData: function(data, index) {
            var features = cloneJSON(this.accountLevelActionsJson[index]["featureData"]);
            features.forEach(function(featureType, j) {
                featureType.lbltooltip = {
                    text: "i"
                };
                if (features.length !== j + 1) {
                    featureType["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                var truncateValue = 35;
                if (kony.application.getCurrentBreakpoint() <= 1024) {
                    truncateValue = 25;
                }
                var Actions = featureType["Actions"];
                if ((Actions.length !== 0)) {
                    Actions.forEach(function(element, i) {
                        featureType["flxAction" + (i + 1)] = {
                            isVisible: true
                        };
                        featureType["lblAction" + (i + 1)] = {
                            text: truncateFeatureName(element["actionName"], truncateValue, true),
                            toolTip: element["actionName"]
                        };
                        featureType["lblTickBox" + (i + 1)] = {
                            text: (element["isSelected"]) ? "C" : "D"
                        };
                    });
                }
                featureType["lblimgPermissions"] = (featureType["isSelected"]) ? "C" : "D";
                featureType["lblPermissionName"] = featureType["featureName"];
            });
            return features;
        },


        setupUIforFeaturePermissions: function(data) {
            this.resetUI();
            var scopeObj = this;
            this.view.lblFeaturePermissions.text = kony.i18n.getLocalizedString("i18n.userMgmt.viewOrEditOtherFeaturePermissions");
            var widgetDataMap = this.getWidgetDataMapForSegFeaturePermissions();
            var truncateValue = 35;
            if (kony.application.getCurrentBreakpoint() <= 1024) {
                truncateValue = 25;
                widgetDataMap = this.getWidgetDataMapForSegFeaturePermissionsForTablet();
                this.view.TabBodyOtherFeaturePermission.segTemplates.rowTemplate = "flxFeaturePermissionsTablet";
            } else {
                this.view.TabBodyOtherFeaturePermission.segTemplates.rowTemplate = "flxFeaturePermissions";
            }
            data.forEach(function(arrayElement, k) {
                arrayElement.lbltooltip = {
                    text: "i"
                };
                arrayElement.lblDescription = {
                    isvisible: false
                };
                arrayElement.flxShowDescription = {
                    isvisible: false
                };
                arrayElement.flxPermissionTooltip = {
                    isVisible: true,
                    onClick: function(eventobject, context) {

                        var segData = scopeObj.view.TabBodyOtherFeaturePermission.segTemplates.data;
                        var rowData = segData[context.rowIndex];
                        if (rowData.flxShowDescription.isVisible === true) {
                            rowData.flxShowDescription = {
                                isVisible: false
                            };
                            rowData.lblDescription = {
                                isVisible: false
                            };
                        } else {
                            rowData.flxShowDescription = {
                                isVisible: true
                            };
                            rowData.lblDescription = {
                                text: rowData["featureDescription"],
                                isVisible: true
                            };
                        }
                        scopeObj.view.TabBodyOtherFeaturePermission.segTemplates.setDataAt(rowData, context.rowIndex);
                        scopeObj.adjustScreen();

                    }
                };
                arrayElement.lblimgPermissions = {
                    isVisible: true,
                    text: (arrayElement["isSelected"]) ? "C" : "D"
                };

                arrayElement["lblPermissionName"] = {
                    "text": arrayElement.featureName
                };
                if (data.length !== k + 1) {
                    arrayElement["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                var Actions = arrayElement.Actions;
                if ((Actions.length !== 0)) {
                    Actions.forEach(function(element, i) {
                        arrayElement["flxAction" + (i + 1)] = {
                            isVisible: true
                        };
                        arrayElement["lblAction" + (i + 1)] = {
                            text: truncateFeatureName(element["actionName"], truncateValue, true),
                            toolTip: element["actionName"]
                        };
                        arrayElement["lblTickBox" + (i + 1)] = {
                            text: (element["isSelected"]) ? "C" : "D"
                        };
                    });
                }
            });
            this.view.TabBodyOtherFeaturePermission.segTemplates.widgetDataMap = widgetDataMap;
            this.view.TabBodyOtherFeaturePermission.segTemplates.setData(data);
            this.view.btnFeaturePermissionsBack.onClick = this.backToVerifyUser.bind(this);
            this.view.btnFeaturePermissionsSave.onClick = this.saveAndUpdateFeatures.bind(this);
            FormControllerUtility.disableButton(this.view.btnFeaturePermissionsSave);
            scopeObj.view.TabBodyOtherFeaturePermission.setFormView(scopeObj);
            this.view.flxFeaturePermissions.isVisible = true;
            scopeObj.currentVisibleFlex = "flxFeaturePermissions";
            this.adjustScreen();
        },

        /**
          	This method is used to handle the children checkboxes feature permission checking
          **/
        selectOrUnselectParentFeature: function(contextEventObject) {
            FormControllerUtility.showProgressBar(this.view);
            var context = contextEventObject.context;
            var eventobject = contextEventObject.eventobject;
            var segData = this.view.segFeaturePermissions.data;
            var rowData = segData[context.rowIndex];
            var permissionCheck = rowData[eventobject.children[0]].text;
            var updateCheck = permissionCheck ? permissionCheck : rowData[eventobject.children[0]];
            updateCheck = (updateCheck === "D") ? "C" : "D";
            if (permissionCheck) {
                rowData[eventobject.children[0]].text = updateCheck;
            } else {
                rowData[eventobject.children[0]] = updateCheck;
            }
            segData[context.rowIndex] = rowData;
            this.view.segFeaturePermissions.setData(segData);
            FormControllerUtility.hideProgressBar(this.view);
            this.adjustScreen();
        },

        onEditBackBtnClick: function(event, isBack) {
            var scopeObj = this;
            var rolesSeg = scopeObj.view.segRoleNames;
            var selectedRole = {};
            selectedRole = rolesSeg.selectedRowItems[0].lblRoleName.toolTip;
            this.loadBusinessBankingModule().presentationController.showAllAccounts(selectedRole);
        },

        /**
          	This method returns the data map for other feature permissions segment
          **/
        getOtherFeaturesDataMap: function() {
            var obj = {};
            for (var i = 1; i < 21; i++) {
                obj["flxActions" + (i)] = "flxActions" + (i);
                obj["lblActionName" + (i)] = "lblActionName" + (i);
                obj["lblActiveSelection" + (i)] = "lblActiveSelection" + (i);
            }
            obj["lblFeatureHeader"] = "lblFeatureHeader";
            obj["lblAccountSelect"] = "lblAccountSelect";
            obj["lblHeadingTop"] = "lblHeadingTop";
            obj["lblDropDown"] = "lblDropDown";
            obj["flxDropDown"] = "flxDropDown";
            obj["lblFeatureSeparator"] = "lblFeatureSeparator";
            return obj;
        },

        /**
          	This method returns the data map for to create segment
          **/
        getTransactionDetailsDataMap: function() {
            return {
                "lblFeatureHeader": "lblFeatureHeader",
                "lblHeadingTop": "lblHeadingTop",
                "lblTransactionType": "lblTransactionType",
                "lblTransactionLimit": "lblTransactionLimit",
                "lblPreApprovalLimit": "lblPreApprovalLimit",
                "lblDenialLimit": "lblDenialLimit",
                "lblHeadingBottom": "lblHeadingBottom",
                "lblPerTransHeader": "lblPerTransHeader",
                "lblPerTransLimit": "lblPerTransLimit",
                "flxPerTransApproveLimit": "flxPerTransApproveLimit",
                "lblPerTransApproveSymbol": "lblPerTransApproveSymbol",
                "tbxPerTransApproveAmount": "tbxPerTransApproveAmount",
                "flxPerTransDenialLimit": "flxPerTransDenialLimit",
                "lblPerTransDenialSymbol": "lblPerTransDenialSymbol",
                "tbxPerTransDenialAmount": "tbxPerTransDenialAmount",
                "lblDailyTransHeader": "lblDailyTransHeader",
                "lblDailyTransLimit": "lblDailyTransLimit",
                "flxDailyTransApproveLimit": "flxDailyTransApproveLimit",
                "lblDailyTransApproveSymbol": "lblDailyTransApproveSymbol",
                "tbxDailyTransApproveAmount": "tbxDailyTransApproveAmount",
                "flxDailyTransDenialLimit": "flxDailyTransDenialLimit",
                "lblDailyTransDenialSymbol": "lblDailyTransDenialSymbol",
                "tbxDailyTransDenialAmount": "tbxDailyTransDenialAmount",
                "lblWeeklyTransHeader": "lblWeeklyTransHeader",
                "lblWeeklyTransLimit": "lblWeeklyTransLimit",
                "flxWeeklyTransApproveLimit": "flxWeeklyTransApproveLimit",
                "lblWeeklyTransApproveSymbol": "lblWeeklyTransApproveSymbol",
                "tbxWeeklyTransApproveAmount": "tbxWeeklyTransApproveAmount",
                "flxWeeklyTransDenialLimit": "flxWeeklyTransDenialLimit",
                "lblWeeklyTransDenialSymbol": "lblWeeklyTransDenialSymbol",
                "tbxWeeklyTransDenialAmount": "tbxWeeklyTransDenialAmount",
                "lblFooterSeperator": "lblFooterSeperator",
                "lblRowSeperator": "lblRowSeperator",
                "lblDropDown": "lblDropDown",
                "lblAccountSelect": "lblAccountSelect",
                "btnReset": "btnReset",
                "flxDropDown": "flxDropDown",
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxLimitsHeader": "flxLimitsHeader",
                "lblHeaderSeperator": "lblHeaderSeperator",
                "flxTransactionLimitsMobile": "flxTransactionLimitsMobile",
                "flxTransactionLimitValues": "flxTransactionLimitValues",
                "flxGroupHeaderComp": "flxGroupHeaderComp",
                "flxTransactionLimitValuesSection": "flxTransactionLimitValuesSection",
                "flxPreapprovalLimitValuesSection": "flxPreapprovalLimitValuesSection",
                "flxDenialLimitValuesSection": "flxDenialLimitValuesSection",
                "lblRowHeaderTitle": "lblRowHeaderTitle",
                "lblHeaderSeparator": "lblHeaderSeparator",
                "lblTransactionLimitHeaderTitle": "lblTransactionLimitHeaderTitle",
                "lblPreApprovalLimitHeaderTitle": "lblPreApprovalLimitHeaderTitle",
                "lblDenialLimitheaderTitle": "lblDenialLimitheaderTitle",
                "lblPerTransaction1": "lblPerTransaction1",
                "lblPerTransaction2": "lblPerTransaction2",
                "lblPerTransaction3": "lblPerTransaction3",
                "lblDailyTransaction1": "lblDailyTransaction1",
                "lblDailyTransaction2": "lblDailyTransaction2",
                "lblDailyTransaction3": "lblDailyTransaction3",
                "lblWeeklyTransaction1": "lblWeeklyTransaction1",
                "lblWeeklyTransaction2": "lblWeeklyTransaction2",
                "lblWeeklyTransaction3": "lblWeeklyTransaction3",
                "lblPerTransactionValue1": "lblPerTransactionValue1",
                "lblPerTransactionValue2": "lblPerTransactionValue2",
                "lblPerTransactionValue3": "lblPerTransactionValue3",
                "lblDailyTransactionValue1": "lblDailyTransactionValue1",
                "lblDailyTransactionValue2": "lblDailyTransactionValue2",
                "lblDailyTransactionValue3": "lblDailyTransactionValue3",
                "lblWeeklyTransactionValue1": "lblWeeklyTransactionValue1",
                "lblWeeklyTransactionValue2": "lblWeeklyTransactionValue2",
                "lblWeeklyTransactionValue3": "lblWeeklyTransactionValue3",
                "lblRowSeparator": "lblRowSeparator",
                "lblRowSeparator1": "lblRowSeparator1",
                "lblRowSeparato2": "lblRowSeparato2",
            };
        },

        getWidgetDataMapForSegAccountLevelPermissions: function() {
            var widgetDataMap = {
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxAccountPermissions": "flxAccountPermissions",
                "lblFeatureSeparator": "lblFeatureSeparator",
                "flxAction1": "flxAction1",
                "flxAction10": "flxAction10",
                "flxAction11": "flxAction11",
                "flxAction12": "flxAction12",
                "flxAction13": "flxAction13",
                "flxAction14": "flxAction14",
                "flxAction15": "flxAction15",
                "flxAction16": "flxAction16",
                "flxAction17": "flxAction17",
                "flxAction18": "flxAction18",
                "flxAction19": "flxAction19",
                "flxAction2": "flxAction2",
                "flxAction20": "flxAction20",
                "flxAction3": "flxAction3",
                "flxAction4": "flxAction4",
                "flxAction5": "flxAction5",
                "flxAction6": "flxAction6",
                "flxAction7": "flxAction7",
                "flxAction8": "flxAction8",
                "flxAction9": "flxAction9",
                "flxFeaturePermissions": "flxFeaturePermissions",
                "flxPermission1": "flxPermission1",
                "flxPermission2": "flxPermission2",
                "flxPermissionClickable": "flxPermissionClickable",
                "flxPermissionTooltip": "flxPermissionTooltip",
                "flxPermissions": "flxPermissions",
                "flxSelectionRow1": "flxSelectionRow1",
                "flxSelectionRow2": "flxSelectionRow2",
                "flxSelectionRow3": "flxSelectionRow3",
                "flxSelectionRow4": "flxSelectionRow4",
                "flxSelectionRow5": "flxSelectionRow5",
                "flxSeperator0": "flxSeperator0",
                "flxTooltip": "flxTooltip",
                "lblAction1": "lblAction1",
                "lblAction10": "lblAction10",
                "lblAction11": "lblAction11",
                "lblAction12": "lblAction12",
                "lblAction13": "lblAction13",
                "lblAction14": "lblAction14",
                "lblAction15": "lblAction15",
                "lblAction16": "lblAction16",
                "lblAction17": "lblAction17",
                "lblAction18": "lblAction18",
                "lblAction19": "lblAction19",
                "lblAction2": "lblAction2",
                "lblAction20": "lblAction20",
                "lblAction3": "lblAction3",
                "lblAction4": "lblAction4",
                "lblAction5": "lblAction5",
                "lblAction6": "lblAction6",
                "lblAction7": "lblAction7",
                "lblAction8": "lblAction8",
                "lblAction9": "lblAction9",
                "lblPermissionName": "lblPermissionName",
                "lblTickBox1": "lblTickBox1",
                "lblTickBox10": "lblTickBox10",
                "lblTickBox11": "lblTickBox11",
                "lblTickBox12": "lblTickBox12",
                "lblTickBox13": "lblTickBox13",
                "lblTickBox14": "lblTickBox14",
                "lblTickBox15": "lblTickBox15",
                "lblTickBox16": "lblTickBox16",
                "lblTickBox17": "lblTickBox17",
                "lblTickBox18": "lblTickBox18",
                "lblTickBox19": "lblTickBox19",
                "lblTickBox2": "lblTickBox2",
                "lblTickBox20": "lblTickBox20",
                "lblTickBox3": "lblTickBox3",
                "lblTickBox4": "lblTickBox4",
                "lblTickBox5": "lblTickBox5",
                "lblTickBox6": "lblTickBox6",
                "lblTickBox7": "lblTickBox7",
                "lblTickBox8": "lblTickBox8",
                "lblTickBox9": "lblTickBox9",
                "lblimgPermissions": "lblimgPermissions",
                "lbltooltip": "lbltooltip",
                "flxShowDescription": "flxShowDescription",
                "lblDescription": "lblDescription"
            };
            return widgetDataMap;
        },
        getWidgetDataMapForSegAccountLevelPermissionsForTablet: function() {
            var widgetDataMap = {
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxAccountPermissions": "flxAccountPermissions",
                "lblFeatureSeparator": "lblFeatureSeparator",
                "flxAction1": "flxAction1",
                "flxAction10": "flxAction10",
                "flxAction11": "flxAction11",
                "flxAction12": "flxAction12",
                "flxAction13": "flxAction13",
                "flxAction14": "flxAction14",
                "flxAction15": "flxAction15",
                "flxAction16": "flxAction16",
                "flxAction17": "flxAction17",
                "flxAction18": "flxAction18",
                "flxAction19": "flxAction19",
                "flxAction2": "flxAction2",
                "flxAction20": "flxAction20",
                "flxAction3": "flxAction3",
                "flxAction4": "flxAction4",
                "flxAction5": "flxAction5",
                "flxAction6": "flxAction6",
                "flxAction7": "flxAction7",
                "flxAction8": "flxAction8",
                "flxAction9": "flxAction9",
                "flxFeaturePermissions": "flxFeaturePermissions",
                "flxPermission1": "flxPermission1",
                "flxPermission2": "flxPermission2",
                "flxPermissionClickable": "flxPermissionClickable",
                "flxPermissionTooltip": "flxPermissionTooltip",
                "flxPermissions": "flxPermissions",
                "flxSelectionRow1": "flxSelectionRow1",
                "flxSelectionRow2": "flxSelectionRow2",
                "flxSelectionRow3": "flxSelectionRow3",
                "flxSelectionRow4": "flxSelectionRow4",
                "flxSelectionRow5": "flxSelectionRow5",
                "flxSelectionRow6": "flxSelectionRow6",
                "flxSelectionRow7": "flxSelectionRow7",
                "flxSeperator0": "flxSeperator0",
                "flxTooltip": "flxTooltip",
                "lblAction1": "lblAction1",
                "lblAction10": "lblAction10",
                "lblAction11": "lblAction11",
                "lblAction12": "lblAction12",
                "lblAction13": "lblAction13",
                "lblAction14": "lblAction14",
                "lblAction15": "lblAction15",
                "lblAction16": "lblAction16",
                "lblAction17": "lblAction17",
                "lblAction18": "lblAction18",
                "lblAction19": "lblAction19",
                "lblAction2": "lblAction2",
                "lblAction20": "lblAction20",
                "lblAction3": "lblAction3",
                "lblAction4": "lblAction4",
                "lblAction5": "lblAction5",
                "lblAction6": "lblAction6",
                "lblAction7": "lblAction7",
                "lblAction8": "lblAction8",
                "lblAction9": "lblAction9",
                "lblPermissionName": "lblPermissionName",
                "lblTickBox1": "lblTickBox1",
                "lblTickBox10": "lblTickBox10",
                "lblTickBox11": "lblTickBox11",
                "lblTickBox12": "lblTickBox12",
                "lblTickBox13": "lblTickBox13",
                "lblTickBox14": "lblTickBox14",
                "lblTickBox15": "lblTickBox15",
                "lblTickBox16": "lblTickBox16",
                "lblTickBox17": "lblTickBox17",
                "lblTickBox18": "lblTickBox18",
                "lblTickBox19": "lblTickBox19",
                "lblTickBox2": "lblTickBox2",
                "lblTickBox20": "lblTickBox20",
                "lblTickBox3": "lblTickBox3",
                "lblTickBox4": "lblTickBox4",
                "lblTickBox5": "lblTickBox5",
                "lblTickBox6": "lblTickBox6",
                "lblTickBox7": "lblTickBox7",
                "lblTickBox8": "lblTickBox8",
                "lblTickBox9": "lblTickBox9",
                "lblimgPermissions": "lblimgPermissions",
                "lbltooltip": "lbltooltip",
                "flxShowDescription": "flxShowDescription",
                "lblDescription": "lblDescription"
            };
            return widgetDataMap;
        },


        getWidgetDataMapForSegAccountSelection: function() {
            var widgetDataMap = {
                "btnReset": "btnReset",
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxAccountSelection": "flxAccountSelection",
                "flxAccountSelectionPermissions": "flxAccountSelectionPermissions",
                "flxDropDown": "flxDropDown",
                "lblAccountSelect": "lblAccountSelect",
                "lblDropDown": "lblDropDown"
            };
            return widgetDataMap;
        },

        getWidgetDataMapForSegFeaturePermissions: function() {
            var widgetDataMap = {
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxAction1": "flxAction1",
                "flxAction10": "flxAction10",
                "flxAction11": "flxAction11",
                "flxAction12": "flxAction12",
                "flxAction13": "flxAction13",
                "flxAction14": "flxAction14",
                "flxAction15": "flxAction15",
                "flxAction16": "flxAction16",
                "flxAction17": "flxAction17",
                "flxAction18": "flxAction18",
                "flxAction19": "flxAction19",
                "flxAction2": "flxAction2",
                "flxAction20": "flxAction20",
                "flxAction3": "flxAction3",
                "flxAction4": "flxAction4",
                "flxAction5": "flxAction5",
                "flxAction6": "flxAction6",
                "flxAction7": "flxAction7",
                "flxAction8": "flxAction8",
                "flxAction9": "flxAction9",
                "flxFeaturePermissions": "flxFeaturePermissions",
                "flxPermission1": "flxPermission1",
                "flxPermission2": "flxPermission2",
                "flxPermissionClickable": "flxPermissionClickable",
                "flxPermissionTooltip": "flxPermissionTooltip",
                "flxPermissions": "flxPermissions",
                "flxSelectionRow1": "flxSelectionRow1",
                "flxSelectionRow2": "flxSelectionRow2",
                "flxSelectionRow3": "flxSelectionRow3",
                "flxSelectionRow4": "flxSelectionRow4",
                "flxSelectionRow5": "flxSelectionRow5",
                "flxSeperator0": "flxSeperator0",
                "flxTooltip": "flxTooltip",
                "lblAction1": "lblAction1",
                "lblAction10": "lblAction10",
                "lblAction11": "lblAction11",
                "lblAction12": "lblAction12",
                "lblAction13": "lblAction13",
                "lblAction14": "lblAction14",
                "lblAction15": "lblAction15",
                "lblAction16": "lblAction16",
                "lblAction17": "lblAction17",
                "lblAction18": "lblAction18",
                "lblAction19": "lblAction19",
                "lblAction2": "lblAction2",
                "lblAction20": "lblAction20",
                "lblAction3": "lblAction3",
                "lblAction4": "lblAction4",
                "lblAction5": "lblAction5",
                "lblAction6": "lblAction6",
                "lblAction7": "lblAction7",
                "lblAction8": "lblAction8",
                "lblAction9": "lblAction9",
                "lblPermissionName": "lblPermissionName",
                "lblTickBox1": "lblTickBox1",
                "lblTickBox10": "lblTickBox10",
                "lblTickBox11": "lblTickBox11",
                "lblTickBox12": "lblTickBox12",
                "lblTickBox13": "lblTickBox13",
                "lblTickBox14": "lblTickBox14",
                "lblTickBox15": "lblTickBox15",
                "lblTickBox16": "lblTickBox16",
                "lblTickBox17": "lblTickBox17",
                "lblTickBox18": "lblTickBox18",
                "lblTickBox19": "lblTickBox19",
                "lblTickBox2": "lblTickBox2",
                "lblTickBox20": "lblTickBox20",
                "lblTickBox3": "lblTickBox3",
                "lblTickBox4": "lblTickBox4",
                "lblTickBox5": "lblTickBox5",
                "lblTickBox6": "lblTickBox6",
                "lblTickBox7": "lblTickBox7",
                "lblTickBox8": "lblTickBox8",
                "lblTickBox9": "lblTickBox9",
                "lblimgPermissions": "lblimgPermissions",
                "lblFeatureSeparator": "lblFeatureSeparator",
                "lbltooltip": "lbltooltip",
                "flxShowDescription": "flxShowDescription",
                "lblDescription": "lblDescription"
            };
            return widgetDataMap;
        },
        getWidgetDataMapForSegFeaturePermissionsForTablet: function() {
            var widgetDataMap = {
                "flxAccountLevelPermissionsSeperator": "flxAccountLevelPermissionsSeperator",
                "flxAction1": "flxAction1",
                "flxAction10": "flxAction10",
                "flxAction11": "flxAction11",
                "flxAction12": "flxAction12",
                "flxAction13": "flxAction13",
                "flxAction14": "flxAction14",
                "flxAction15": "flxAction15",
                "flxAction16": "flxAction16",
                "flxAction17": "flxAction17",
                "flxAction18": "flxAction18",
                "flxAction19": "flxAction19",
                "flxAction2": "flxAction2",
                "flxAction20": "flxAction20",
                "flxAction3": "flxAction3",
                "flxAction4": "flxAction4",
                "flxAction5": "flxAction5",
                "flxAction6": "flxAction6",
                "flxAction7": "flxAction7",
                "flxAction8": "flxAction8",
                "flxAction9": "flxAction9",
                "flxFeaturePermissions": "flxFeaturePermissions",
                "flxPermission1": "flxPermission1",
                "flxPermission2": "flxPermission2",
                "flxPermissionClickable": "flxPermissionClickable",
                "flxPermissionTooltip": "flxPermissionTooltip",
                "flxPermissions": "flxPermissions",
                "flxSelectionRow1": "flxSelectionRow1",
                "flxSelectionRow2": "flxSelectionRow2",
                "flxSelectionRow3": "flxSelectionRow3",
                "flxSelectionRow4": "flxSelectionRow4",
                "flxSelectionRow5": "flxSelectionRow5",
                "flxSelectionRow6": "flxSelectionRow6",
                "flxSelectionRow7": "flxSelectionRow7",
                "flxSeperator0": "flxSeperator0",
                "flxTooltip": "flxTooltip",
                "lblAction1": "lblAction1",
                "lblAction10": "lblAction10",
                "lblAction11": "lblAction11",
                "lblAction12": "lblAction12",
                "lblAction13": "lblAction13",
                "lblAction14": "lblAction14",
                "lblAction15": "lblAction15",
                "lblAction16": "lblAction16",
                "lblAction17": "lblAction17",
                "lblAction18": "lblAction18",
                "lblAction19": "lblAction19",
                "lblAction2": "lblAction2",
                "lblAction20": "lblAction20",
                "lblAction3": "lblAction3",
                "lblAction4": "lblAction4",
                "lblAction5": "lblAction5",
                "lblAction6": "lblAction6",
                "lblAction7": "lblAction7",
                "lblAction8": "lblAction8",
                "lblAction9": "lblAction9",
                "lblPermissionName": "lblPermissionName",
                "lblTickBox1": "lblTickBox1",
                "lblTickBox10": "lblTickBox10",
                "lblTickBox11": "lblTickBox11",
                "lblTickBox12": "lblTickBox12",
                "lblTickBox13": "lblTickBox13",
                "lblTickBox14": "lblTickBox14",
                "lblTickBox15": "lblTickBox15",
                "lblTickBox16": "lblTickBox16",
                "lblTickBox17": "lblTickBox17",
                "lblTickBox18": "lblTickBox18",
                "lblTickBox19": "lblTickBox19",
                "lblTickBox2": "lblTickBox2",
                "lblTickBox20": "lblTickBox20",
                "lblTickBox3": "lblTickBox3",
                "lblTickBox4": "lblTickBox4",
                "lblTickBox5": "lblTickBox5",
                "lblTickBox6": "lblTickBox6",
                "lblTickBox7": "lblTickBox7",
                "lblTickBox8": "lblTickBox8",
                "lblTickBox9": "lblTickBox9",
                "lblimgPermissions": "lblimgPermissions",
                "lblFeatureSeparator": "lblFeatureSeparator",
                "lbltooltip": "lbltooltip",
                "lblDescription": "lblDescription"
            };
            return widgetDataMap;
        },
        /**
		This method will set the default values to the transaction details segement      
      **/
        getTransactionDefaultValues: function(index) {
            var res = [];
            var features = this.accountLevelActionsJson[index]["featureData"];
            features.forEach(function(featureType) {
                var actions = featureType["Actions"];
                actions.forEach(function(element) {
                    if (element["isSelected"] === true && element["actionType"] === "MONETARY") {
                        res.push({
                            lblFeatureHeader: {
                                "text": element["actionName"]
                            },
                            lblRowHeaderTitle: {
                                "text": element["actionName"]
                            },
                            lblPerTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
                            },
                            lblDailyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
                            },
                            lblWeeklyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
                            },
                            lblHeaderSeperator: {
                                "text": "-"
                            },
                            lblRowSeparator: {
                                "text": "-"
                            },
                            lblRowSeparator1: {
                                "text": "-"
                            },
                            lblRowSeparato2: {
                                "text": "-"
                            },
                            lblPerTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblDailyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblRowSeperator: {
                                "text": "-"
                            },
                            lblFooterSeperator: {
                                "text": "-"
                            },
                            lblPerTransLimit: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["MAX_TRANSACTION_LIMIT"], true)
                            },
                            lblPerTransactionValue1: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["MAX_TRANSACTION_LIMIT"], true)
                            },
                            lblDailyTransLimit: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["DAILY_LIMIT"], true)
                            },
                            lblDailyTransactionValue1: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["DAILY_LIMIT"], true)
                            },
                            lblWeeklyTransLimit: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["WEEKLY_LIMIT"], true)
                            },
                            lblWeeklyTransactionValue1: {
                                "text": "$ " + CommonUtilities.formatCurrencyWithCommas(element["WEEKLY_LIMIT"], true)
                            },
                            lblPerTransApproveSymbol: {
                                "text": "$"
                            },
                            lblPerTransDenialSymbol: {
                                "text": "$"
                            },
                            lblDailyTransApproveSymbol: {
                                "text": "$"
                            },
                            lblDailyTransDenialSymbol: {
                                "text": "$"
                            },
                            lblWeeklyTransApproveSymbol: {
                                "text": "$"
                            },
                            lblWeeklyTransDenialSymbol: {
                                "text": "$"
                            },
                            flxPerTransApproveLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            flxPerTransDenialLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            flxDailyTransApproveLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            flxDailyTransDenialLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            flxWeeklyTransApproveLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            flxWeeklyTransDenialLimit: {
                                "skin": "skne3e3e3br3pxradius"
                            },
                            tbxPerTransApproveAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["PER_TRANSACTION_APPROVE_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                            tbxPerTransDenialAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["PER_TRANSACTION_DENIAL_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                            tbxDailyTransApproveAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["DAILY_APPROVE_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                            tbxDailyTransDenialAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["DAILY_DENIAL_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                            tbxWeeklyTransApproveAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["WEEKLY_APPROVE_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                            tbxWeeklyTransDenialAmount: {
                                "placeholder": "Amount",
                                "text": CommonUtilities.formatCurrencyWithCommas(element["WEEKLY_DENIAL_LIMIT"], true),
                                "skin": "skntbxffffffBordere3e3e3SSP15px424242"
                            },
                        });
                    }
                });
            });
            return res;
        },

        getSectionHeaders: function(data) {
            data = this.customRoleObj;
            var scope = this;
            var res = [];
            var accounts = data["selectedAccounts"];
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.lblAccountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var currsegdata = scope.view.TabBodyNew.segTemplates.data;
                            for (var i = 0; i < accounts.length; i++) {
                                if (currsegdata[i][1].length !== 0)
                                    scope.monetaryLimitsSegdata[i] = currsegdata[i][1];
                            }
                            var segData = scope.view.TabBodyNew.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": true
                                },
                                "btnReset": {
                                    "text": "Reset to default",
                                    "isVisible": true,
                                    "onClick": function(eventobject, context) {
                                        scope.view.TabBodyNew.resetPopup(eventobject, context);
                                    }.bind(this)
                                }
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyNew.addRowsAndUpdateSection(scope.monetaryLimitsSegdata[context.sectionIndex], context.sectionIndex, updateParams, updateCollapseParams);
                            } else {
                                scope.view.TabBodyNew.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },
                    "lblHeadingTop": {
                        "text": "-"
                    },
                    "lblHeadingBottom": {
                        "text": "-"
                    },
                    "flxLimitsHeader": {
                        "isVisible": false
                    },
                    "btnReset": {
                        "isVisible": false
                    },
                    lblTransactionType: {
                        "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType")
                    },
                    lblTransactionLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblTransactionLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblPreApprovalLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblPreApprovalLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblDenialLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    lblDenialLimitheaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    "template": "flxAccountSelectionPermissions"
                });
            });
            return res;
        },

        /**
          	method to get section header for other features access
          **/
        getSectionHeadersOtherFeatures: function(main) {
            var scope = this;
            var res = [];
            res.push({
                "lblAccountSelect": {
                    "text": "View All Permissions"
                },
                "lblDropDown": {
                    "text": "O"
                },
                "flxDropDown": {
                    "onClick": function(eventobject, context) {
                        var segData = scope.view.TabBodyAccountWiseOtherFeatures.segTemplates.data;
                        var sectionData = segData[context.sectionIndex];
                        var updateParams = {
                            "lblDropDown": {
                                "text": "P"
                            },
                            "lblHeadingTop": {
                                "isVisible": true
                            },
                        };
                        var updateCollapseParams = {
                            "lblDropDown": {
                                "text": "O"
                            },
                            "flxLimitsHeader": {
                                "isVisible": false
                            },
                            "lblHeadingTop": {
                                "isVisible": false
                            },
                            "btnReset": {
                                "isVisible": false
                            }
                        };
                        FormControllerUtility.showProgressBar(scope.view);
                        if (sectionData[0].lblDropDown.text === "O") {
                            scope.view.TabBodyAccountWiseOtherFeatures.addRowsAndUpdateSection(main, context.sectionIndex, updateParams, updateCollapseParams);
                            scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
                            scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
                        } else {
                            scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                        }
                        FormControllerUtility.hideProgressBar(scope.view);
                        scope.adjustScreen();
                    }.bind(this)
                },

                "template": "flxAccountSelectionPermissions"
            });
            return res;
        },

        /**
          	method to reload segTemplates segment
          **/

        segReloadAction: function() {
            this.adjustScreen();
        },
        /**
		This method is used to setup the UI for assigning transaction limits to user
      **/
        setupUIforTransactionDetails: function(data) {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.customRoleObj["NON_MONETARY"] = this.userDataStore["NON_MONETARY"];
            scopeObj.customRoleObj["MONETARY"] = this.userDataStore["MONETARY"];
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxAccountSelectionMobile";
                scopeObj.view.TabBodyNew.segTemplates.rowTemplate = "flxTransactionLimitsMobile";
            } else {
                scopeObj.view.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
                scopeObj.view.TabBodyNew.segTemplates.rowTemplate = "flxCreateUserTransDetails";
            }
            scopeObj.view.TabBodyNew.setSegmentReloadAction(this.segReloadAction);
            scopeObj.view.TabBodyNew.segTemplates.widgetDataMap = this.getTransactionDetailsDataMap();
            scopeObj.view.TabBodyNew.addOnlySectionHeaders(this.getSectionHeaders(this.customRoleObj));
            scopeObj.view.btnUserTransactionDetailsActionsCancel.onClick = this.backToVerifyUser.bind(this);
            scopeObj.disableOrEnableProceedBtnOnTransactionDetails(false);
            scopeObj.view.TabBodyNew.setFormView(scopeObj);
            scopeObj.view.flxUserTransactionDetails.setVisibility(true);
            scopeObj.currentVisibleFlex = "flxUserTransactionDetails";
            scopeObj.adjustScreen();
        },
        /**
		This method is used to disable Or Enable Proceed button On TransactionDetails
      **/
        disableOrEnableProceedBtnOnTransactionDetails: function(toEnable) {
            var scopeObj = this;
            if (toEnable) {
                scopeObj.view.btnUserTransactionDetailsActionsSaveAndUpdate.onClick = function() {
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
                    if (this.view.TabBodyNew.areAllFieldsValid()) {
                        var currsegdata = scopeObj.view.TabBodyNew.segTemplates.data;
                        for (var i = 0; i < scopeObj.customRoleObj.selectedAccounts.length; i++) {
                            if (currsegdata[i][1].length !== 0)
                                scopeObj.monetaryLimitsSegdata[i] = currsegdata[i][1];
                        }
                        //Navigating to verify user page 	
                        if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                            this.manageCustomRoleData["currentEditFlow"] = "limitsEdit";
                            //making a service call to update the data first and if the service call is success then update the original global variables.
                            var accountLevelActionsJsonAfterUpdate = this.updatejson(scopeObj.accountLevelActionsJson, scopeObj.monetaryLimitsSegdata);
                            this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObj, this.otherFeaturesGlobalCopy, accountLevelActionsJsonAfterUpdate, 0);
                        } else {
                            //update json data on save and proceed					
                            this.accountLevelActionsJson = this.updatejson(scopeObj.accountLevelActionsJson, scopeObj.monetaryLimitsSegdata);
                            this.loadBusinessBankingModule().presentationController.navigateToVerifyUser("frmPermissionsTemplate", this.customRoleObj);
                        }
                    } else {
                        this.adjustScreen();
                    }
                }.bind(scopeObj);
                FormControllerUtility.enableButton(scopeObj.view.btnUserTransactionDetailsActionsSaveAndUpdate);
            } else {
                FormControllerUtility.disableButton(scopeObj.view.btnUserTransactionDetailsActionsSaveAndUpdate);
            }
        },

        /**
		This method is used to setup the UI for showing other feature permissions of the user.
      **/
        setupUIforOtherfeatures: function(data) {
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseOtherFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseOtherFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseOtherFeatures.addOnlySectionHeaders(this.getSectionHeadersOtherFeatures(data));
            this.customRoleObj["featureData"] = data;
            this.adjustScreen();
        },

        /**
		This method is used to setup the UI for assigning feature actions to user in verify details page
      **/
        showFeatureActionReadOnly: function() {
            this.view.TabBodyAccountWiseFeatures.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
            this.view.TabBodyAccountWiseFeatures.segTemplates.rowTemplate = "flxFeatureActionList";
            this.view.TabBodyAccountWiseFeatures.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyAccountWiseFeatures.segTemplates.widgetDataMap = this.getOtherFeaturesDataMap();
            this.view.TabBodyAccountWiseFeatures.addOnlySectionHeaders(this.getSectionHeadersMonetaryFeaturesReadOnly());
        },

        getSectionHeadersMonetaryFeaturesReadOnly: function() {
            var scope = this;
            var res = [];
            var accounts = this.customRoleObj["selectedAccounts"];
            var template;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                template = "flxAccountSelectionMobile"
            } else {
                template = "flxAccountSelectionPermissions"
            }
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.lblAccountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "lblHeadingTop": {
                        "isVisible": true
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var segData = scope.view.TabBodyAccountWiseFeatures.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyAccountWiseFeatures.addRowsAndUpdateSection(scope.getSectionHeadersMonetaryFeaturesReadOnlyValues(context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
                                scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                                scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
                            } else {
                                scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },

                    "template": template
                });
            })
            return res;
        },


        getSectionHeadersMonetaryFeaturesReadOnlyValues: function(index) {
            var features = cloneJSON(this.accountLevelActionsJson[index]["featureData"]);
            features.forEach(function(featureType, j) {
                if (features.length !== j + 1) {
                    featureType["lblFeatureSeparator"] = {
                        "text": "-"
                    };
                }
                featureType["lblFeatureHeader"] = featureType["featureName"];
                var actions = featureType["Actions"];
                actions.forEach(function(element, i) {
                    featureType["flxActions" + (i + 1)] = {
                        isVisible: true
                    };
                    featureType["lblActionName" + (i + 1)] = {
                        text: (element["actionName"]),
                        toolTip: element["actionName"]
                    };
                    featureType["lblActiveSelection" + (i + 1)] = {
                        text: "F",
                        skin: (element["isSelected"]) ? "sknBBLblOLBFontsActive04A615" : "sknBBLblOLBFontsInActiveC0C0C0"
                    };
                });
            });

            return features;
        },

        /*
          This method will fetch all selected accoutns to be displayed as collapisble header*/

        getCollapsibleAccountsList: function() {

        },

        setupTabBodyNewAccountCollapsibleList: function() {
            var widgetdatamap = {
                "btnReset": "btnReset",
                "flxAccountSelection": "flxAccountSelection",
                "flxAccountSelectionPermissions": "flxAccountSelectionPermissions",
                "flxCreateUserTransDetails": "flxCreateUserTransDetails",
                "flxDailyTransApproveLimit": "flxDailyTransApproveLimit",
                "flxDailyTransApproveLimitHolder": "flxDailyTransApproveLimitHolder",
                "flxDailyTransDenialLimit": "flxDailyTransDenialLimit",
                "flxDailyTransDenialLimitHolder": "flxDailyTransDenialLimitHolder",
                "flxDailyTransaction": "flxDailyTransaction",
                "flxDropDown": "flxDropDown",
                "flxLimitsHeader": "flxLimitsHeader",
                "flxPerTransApproveLimit": "flxPerTransApproveLimit",
                "flxPerTransApproveLimitHolder": "flxPerTransApproveLimitHolder",
                "flxPerTransDenialLimit": "flxPerTransDenialLimit",
                "flxPerTransDenialLimitHolder": "flxPerTransDenialLimitHolder",
                "flxPerTransaction": "flxPerTransaction",
                "flxTransactionTable": "flxTransactionTable",
                "flxWeeklyTransApproveLimit": "flxWeeklyTransApproveLimit",
                "flxWeeklyTransApproveLimitHolder": "flxWeeklyTransApproveLimitHolder",
                "flxWeeklyTransDenialLimit": "flxWeeklyTransDenialLimit",
                "flxWeeklyTransDenialLimitHolder": "flxWeeklyTransDenialLimitHolder",
                "flxWeeklyTransaction": "flxWeeklyTransaction",
                "lblAccountSelect": "lblAccountSelect",
                "lblDailyTransApproveAmount": "lblDailyTransApproveAmount",
                "lblDailyTransApproveSymbol": "lblDailyTransApproveSymbol",
                "lblDailyTransDenialAmount": "lblDailyTransDenialAmount",
                "lblDailyTransDenialSymbol": "lblDailyTransDenialSymbol",
                "lblDailyTransHeader": "lblDailyTransHeader",
                "lblDailyTransLimit": "lblDailyTransLimit",
                "lblDenialLimit": "lblDenialLimit",
                "lblDropDown": "lblDropDown",
                "lblFeatureHeader": "lblFeatureHeader",
                "lblHeaderSeperator": "lblHeaderSeperator",
                "lblHeadingBottom": "lblHeadingBottom",
                "lblHeadingTop": "lblHeadingTop",
                "lblPerTransApproveLimit": "lblPerTransApproveLimit",
                "lblPerTransApproveSymbol": "lblPerTransApproveSymbol",
                "lblPerTransDenialLimit": "lblPerTransDenialLimit",
                "lblPerTransDenialSymbol": "lblPerTransDenialSymbol",
                "lblPerTransHeader": "lblPerTransHeader",
                "lblPerTransLimit": "lblPerTransLimit",
                "lblPreApprovalLimit": "lblPreApprovalLimit",
                "lblRowSeperator": "lblRowSeperator",
                "lblTransactionLimit": "lblTransactionLimit",
                "lblTransactionType": "lblTransactionType",
                "lblWeeklyTransApproveAmount": "lblWeeklyTransApproveAmount",
                "lblWeeklyTransApproveSymbol": "lblWeeklyTransApproveSymbol",
                "lblWeeklyTransDenialAmount": "lblWeeklyTransDenialAmount",
                "lblWeeklyTransDenialSymbol": "lblWeeklyTransDenialSymbol",
                "lblWeeklyTransHeader": "lblWeeklyTransHeader",
                "lblWeeklyTransLimit": "lblWeeklyTransLimit",
                "tbxDailyTransApproveAmount": "tbxDailyTransApproveAmount",
                "tbxDailyTransDenialAmount": "tbxDailyTransDenialAmount",
                "tbxPerTransApproveAmount": "tbxPerTransApproveAmount",
                "tbxPerTransDenialAmount": "tbxPerTransDenialAmount",
                "tbxWeeklyTransApproveAmount": "tbxWeeklyTransApproveAmount",
                "tbxWeeklyTransDenialAmount": "tbxWeeklyTransDenialAmount",
                "flxTransactionLimitsMobile": "flxTransactionLimitsMobile",
                "flxTransactionLimitValues": "flxTransactionLimitValues",
                "flxGroupHeaderComp": "flxGroupHeaderComp",
                "flxTransactionLimitValuesSection": "flxTransactionLimitValuesSection",
                "flxPreapprovalLimitValuesSection": "flxPreapprovalLimitValuesSection",
                "flxDenialLimitValuesSection": "flxDenialLimitValuesSection",
                "lblRowHeaderTitle": "lblRowHeaderTitle",
                "lblHeaderSeparator": "lblHeaderSeparator",
                "lblTransactionLimitHeaderTitle": "lblTransactionLimitHeaderTitle",
                "lblPreApprovalLimitHeaderTitle": "lblPreApprovalLimitHeaderTitle",
                "lblDenialLimitheaderTitle": "lblDenialLimitheaderTitle",
                "lblPerTransaction1": "lblPerTransaction1",
                "lblPerTransaction2": "lblPerTransaction2",
                "lblPerTransaction3": "lblPerTransaction3",
                "lblDailyTransaction1": "lblDailyTransaction1",
                "lblDailyTransaction2": "lblDailyTransaction2",
                "lblDailyTransaction3": "lblDailyTransaction3",
                "lblWeeklyTransaction1": "lblWeeklyTransaction1",
                "lblWeeklyTransaction2": "lblWeeklyTransaction2",
                "lblWeeklyTransaction3": "lblWeeklyTransaction3",
                "lblPerTransactionValue1": "lblPerTransactionValue1",
                "lblPerTransactionValue2": "lblPerTransactionValue2",
                "lblPerTransactionValue3": "lblPerTransactionValue3",
                "lblDailyTransactionValue1": "lblDailyTransactionValue1",
                "lblDailyTransactionValue2": "lblDailyTransactionValue2",
                "lblDailyTransactionValue3": "lblDailyTransactionValue3",
                "lblWeeklyTransactionValue1": "lblWeeklyTransactionValue1",
                "lblWeeklyTransactionValue2": "lblWeeklyTransactionValue2",
                "lblWeeklyTransactionValue3": "lblWeeklyTransactionValue3",
                "lblRowSeparator": "lblRowSeparator",
                "lblRowSeparator1": "lblRowSeparator1",
                "lblRowSeparato2": "lblRowSeparato2",
            };
            var defaultData = {
                lblHeaderSeperator: {
                    "text": "-"
                },
                lblRowSeparator: {
                    "text": "-"
                },
                lblRowSeparator1: {
                    "text": "-"
                },
                lblRowSeparato2: {
                    "text": "-"
                },
                lblPerTransaction1: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                },
                lblPerTransaction2: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                },
                lblPerTransaction3: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                },
                lblDailyTransaction1: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                },
                lblDailyTransaction2: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                },
                lblDailyTransaction3: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                },
                lblWeeklyTransaction1: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                },
                lblWeeklyTransaction2: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                },
                lblWeeklyTransaction3: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                },
                lblPerTransHeader: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                },
                lblDailyTransHeader: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction")
                },
                lblWeeklyTransHeader: {
                    "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction")
                },
            };

            var data = this.userDataStore["MONETARY"];
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.sectionHeaderTemplate = "flxAccountSelectionMobile";
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.rowTemplate = "flxTransactionLimitsMobile";
            } else {
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.sectionHeaderTemplate = "flxAccountSelectionPermissions";
                this.view.TabBodyNewAccountCollapsibleList.segTemplates.rowTemplate = "flxCreateUserTransDetails";
            }
            this.view.TabBodyNewAccountCollapsibleList.setSegmentReloadAction(this.segReloadAction);
            this.view.TabBodyNewAccountCollapsibleList.segTemplates.widgetDataMap = widgetdatamap;
            this.view.TabBodyNewAccountCollapsibleList.addOnlySectionHeaders(this.getSampleDataforTabBodyNewAccountCollapsibleList());
            this.view.btnTransactionLimitsEdit.onClick = this.openEditTransactionLimits.bind(this);
            this.view.btnOtherPermissionEdit.onClick = this.openFeaturePermissions.bind(this);
            this.view.btnRolesPermissionEdit.onClick = this.openAccountLevelPermissions.bind(this);
        },

        openEditTransactionLimits: function() {
            //disabling the save and update button every time edit is opened.
            //isPermissionsFromSelectedUserEdited used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", true);
            this.enableOrDisableUpdateButton["transactionLimitsEditFlow"] = false;
            this.updatelimitstore(this.accountLevelActionsJson, this.monetaryLimitsSegdata);
            this.loadBusinessBankingModule().presentationController.showEditTransactionLimits("frmPermissionsTemplate");
        },

        openFeaturePermissions: function() {
            //disabling the save and update button every time edit is opened.
            //isPermissionsFromSelectedUserEdited used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", true);
            this.enableOrDisableUpdateButton["notAccountLevelPermissionsEditFlow"] = true;
            this.enableOrDisableUpdateButton["accountLevelPermissionsEditFlow"] = false;
            this.loadBusinessBankingModule().presentationController.showEditFeaturePermissions("frmPermissionsTemplate");
        },

        openAccountLevelPermissions: function() {
            //disabling the save and update button every time edit is opened.
            //isPermissionsFromSelectedUserEdited used in case of create custom role flow when existing user is selected and permissions edited on verify details page
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("isPermissionsFromSelectedUserEdited", true);
            this.enableOrDisableUpdateButton["accountLevelPermissionsEditFlow"] = true;
            this.enableOrDisableUpdateButton["notAccountLevelPermissionsEditFlow"] = false;
            this.updateFeatureActionsSeg(this.accountLevelActionsJson, this.accountLevelActionsSegdata);
            this.loadBusinessBankingModule().presentationController.showAccountLevelPermissions("frmPermissionsTemplate");
        },

        backToVerifyUser: function() {
            this.loadBusinessBankingModule().presentationController.navigateToVerifyCustomRole("frmPermissionsTemplate", this.customRoleObj);
        },

        saveAndUpdateFeatures: function() {
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("EditFlagForUpdateCustomRole", true);
            this.segDataOtherFeatures = this.view.TabBodyOtherFeaturePermission.segTemplates.data;
            //Navigating to verify user page
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                this.manageCustomRoleData["currentEditFlow"] = "otherFeaturesEdit";
                //making a service call to update the data first and if the service call is success then update the original global variables.
                var otherFeaturesAfterUpdate = this.updateOtherFeaturesGlobalCopyOnsaveAndUpdate(this.otherFeaturesGlobalCopy, this.segDataOtherFeatures);
                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.customRoleObj, otherFeaturesAfterUpdate, this.accountLevelActionsJson, 0);
            } else {
                //updating the otherfeatures global copy 
                this.otherFeaturesGlobalCopy = this.updateOtherFeaturesGlobalCopyOnsaveAndUpdate(this.otherFeaturesGlobalCopy, this.segDataOtherFeatures);
                this.loadBusinessBankingModule().presentationController.navigateToVerifyUser("frmPermissionsTemplate", this.customRoleObj);
            }
        },

        getAccountDefaultValues: function() {
            var res = [];
            if (kony.sdk.isNullOrUndefined(this.customRoleObj["MONETARY"])) {
                this.customRoleObj["NON_MONETARY"] = this.userDataStore["NON_MONETARY"];
                this.customRoleObj["MONETARY"] = this.userDataStore["MONETARY"];
            }
            var features = this.customRoleObj["MONETARY"];
            features.forEach(function(arrayElement) {
                arrayElement.lblimgPermissions = {
                    isVisible: false
                };
                arrayElement.flxPermissionClickable = {
                    onClick: {}
                };
                arrayElement["lblPermissionName"] = {
                    "text": arrayElement.featureName
                }
                var Actions = arrayElement.Actions;
                if ((Actions.length !== 0)) {
                    Actions.forEach(function(element, i) {
                        arrayElement["flxAction" + (i + 1)] = {
                            isVisible: true
                        };
                        arrayElement["lblAction" + (i + 1)] = {
                            text: truncateFeatureName(element["actionName"], 40, true),
                            toolTip: element["actionName"]
                        };
                        arrayElement["lblTickBox" + (i + 1)] = {
                            text: (element["isSelected"]) ? "C" : "D"
                        };
                    });
                }
                arrayElement["lblimgPermissions"] = {
                    "text": (arrayElement["isSelected"]) ? "C" : "D"
                };
            });
            return res;
        },

        getSampleTransactionDefaultValues: function(index) {
            var res = [];
            var features = this.accountLevelActionsJson[index]["featureData"];
            features.forEach(function(featureType) {
                var actions = featureType["Actions"]
                actions.forEach(function(element) {
                    if (element["isSelected"] === true && element["actionType"] === "MONETARY") {
                        res.push({
                            lblPerTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
                            },
                            lblDailyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
                            },
                            lblWeeklyTransHeader: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
                            },
                            lblTransactionLimitHeaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                            },
                            lblPreApprovalLimitHeaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                            },
                            lblDenialLimitheaderTitle: {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                            },
                            lblHeaderSeperator: {
                                "text": "-"
                            },
                            lblHeaderSeparator: {
                                "text": "-"
                            },
                            lblRowSeperator: {
                                "text": "-"
                            },
                            lblRowSeparator: {
                                "text": "-"
                            },
                            lblRowSeparato2: {
                                "text": "-"
                            },
                            lblRowSeparator1: {
                                "text": "-"
                            },
                            lblFooterSeperator: {
                                "text": "-"
                            },
                            lblFeatureHeader: {
                                "text": element["actionName"]
                            },
                            lblRowHeaderTitle: {
                                "text": element["actionName"]
                            },
                            lblPerTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblPerTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.perTranscation")
                            },
                            lblDailyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblDailyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction1: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction2: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblWeeklyTransaction3: {
                                "text": kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction").slice(0, -11)
                            },
                            lblPerTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["MAX_TRANSACTION_LIMIT"]) ? "0" : element["MAX_TRANSACTION_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["MAX_TRANSACTION_LIMIT"]) ? "0" : element["MAX_TRANSACTION_LIMIT"]), true) + " "
                            },
                            lblDailyTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_LIMIT"]) ? "0" : element["DAILY_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_LIMIT"]) ? "0" : element["DAILY_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_LIMIT"]) ? "0" : element["WEEKLY_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue1: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_LIMIT"]) ? "0" : element["WEEKLY_LIMIT"]), true) + " "
                            },
                            lblPerTransApproveLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_APPROVE_LIMIT"]) ? "0" : element["PER_TRANSACTION_APPROVE_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_APPROVE_LIMIT"]) ? "0" : element["PER_TRANSACTION_APPROVE_LIMIT"]), true) + " "
                            },
                            lblPerTransDenialLimit: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_DENIAL_LIMIT"]) ? "0" : element["PER_TRANSACTION_DENIAL_LIMIT"]), true) + " "
                            },
                            lblPerTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_DENIAL_LIMIT"]) ? "0" : element["PER_TRANSACTION_DENIAL_LIMIT"]), true) + " "
                            },
                            lblDailyTransApproveAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_APPROVE_LIMIT"]) ? "0" : element["DAILY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_APPROVE_LIMIT"]) ? "0" : element["DAILY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblDailyTransDenialAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_DENIAL_LIMIT"]) ? "0" : element["DAILY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblDailyTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_DENIAL_LIMIT"]) ? "0" : element["DAILY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransApproveAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_APPROVE_LIMIT"]) ? "0" : element["WEEKLY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue2: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_APPROVE_LIMIT"]) ? "0" : element["WEEKLY_APPROVE_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransDenialAmount: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_DENIAL_LIMIT"]) ? "0" : element["WEEKLY_DENIAL_LIMIT"]), true) + " "
                            },
                            lblWeeklyTransactionValue3: {
                                "text": "$" + CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_DENIAL_LIMIT"]) ? "0" : element["WEEKLY_DENIAL_LIMIT"]), true) + " "
                            },

                        });
                    }
                });
            });
            return res;
        },

        setupAcknowledgement: function(data) {
            this.resetUI();
            var userModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.CustomRole") +
                kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
                kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
            this.view.flxContentHeader.setVisibility(true);
            this.view.flxTopSeparator4.setVisibility(true);
            var roleName = applicationManager.getBusinessUserManager().getCustomRoleAttribute("Group_Name");
            this.view.btnViewMoreDetails.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                userModule.presentationController.navigateToManagePermissions(data["customRoleId"], data["parentRoleId"], this.loadBusinessBankingModule().presentationController.navigateToManagePermissionsSuccess.bind(this.loadBusinessBankingModule().presentationController));
            }.bind(this);
            this.view.btnCancelAddServices.onClick = function() {
                userModule.presentationController.showUserManagent({
                    show: 'createNewCustomRole'
                });
            }.bind(this); //Create Another custom role
            this.view.btnProceedAddServices.onClick = function() {
                userModule.presentationController.showUserManagent({
                    show: 'showUserRoles'
                });
            }.bind(this); //Show All Roles
            this.view.segUserInfo.widgetDataMap = {
                "flxUserDetailsContainer": "flxUserDetailsContainer",
                "lblLeftSideContent": "lblLeftSideContent",
                "lblRIghtSideContent": "lblRIghtSideContent"
            };

            data.createdts = data.createdts.replace(" ", "T");
            var segdata = [{
                    "lblLeftSideContent": "Custom Role Name:",
                    "lblRIghtSideContent": data["customRoleName"]
                },
                {
                    "lblLeftSideContent": "Parent Role:",
                    "lblRIghtSideContent": roleName
                },
                {
                    "lblLeftSideContent": "Created by:",
                    "lblRIghtSideContent": data["createdby"]
                },
                {
                    "lblLeftSideContent": "Creation date:",
                    "lblRIghtSideContent": CommonUtilities.getFrontendDateString(data.createdts)
                }
            ]
            this.view.segUserInfo.setData(segdata);
            this.view.btnCancelAddServices.text = kony.i18n.getLocalizedString("i18n.customRole.createNewCustomRole")
            this.view.btnProceedAddServices.text = kony.i18n.getLocalizedString("i18n.customRole.viewAllCustomRoles");
            this.view.flxAcknowledgement.setVisibility(true);
            this.currentVisibleFlex = "flxAcknowledgement";
            this.view.lblReferenceNumber.text = data["customRoleId"];
            this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.customRole.customRoleCreatedSuccessfully");
            this.view.lblReferenceNumber.setVisibility(true);
            this.adjustScreen();
        },

        getSampleDataforTabBodyNewAccountCollapsibleList: function() {
            var scope = this;
            var res = [];
            var accounts = this.customRoleObj["selectedAccounts"];
            var template;
            var show = false;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                template = "flxAccountSelectionMobile"
                show = true;
            } else {
                template = "flxAccountSelectionPermissions"
                show = false;
            }
            //filter the accounts first(Enhancement)
            accounts.forEach(function(element) {
                res.push({
                    "lblAccountSelect": {
                        "text": element.lblAccountName
                    },
                    "lblDropDown": {
                        "text": "O"
                    },
                    "flxDropDown": {
                        "onClick": function(eventobject, context) {
                            var segData = scope.view.TabBodyNewAccountCollapsibleList.segTemplates.data;
                            var sectionData = segData[context.sectionIndex];
                            var updateParams = {
                                "lblDropDown": {
                                    "text": "P"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": true
                                },
                                "lblHeadingTop": {
                                    "isVisible": true
                                },
                                "btnReset": {
                                    "text": "Reset to default",
                                    "isVisible": false
                                },
                            };
                            var updateCollapseParams = {
                                "lblDropDown": {
                                    "text": "O"
                                },
                                "flxLimitsHeader": {
                                    "isVisible": false
                                },
                                "lblHeadingTop": {
                                    "isVisible": show
                                },
                                "btnReset": {
                                    "isVisible": false
                                }
                            };
                            FormControllerUtility.showProgressBar(scope.view);
                            if (sectionData[0].lblDropDown.text === "O") {
                                scope.view.TabBodyNewAccountCollapsibleList.addRowsAndUpdateSection(scope.getSampleTransactionDefaultValues(context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
                                scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                                scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
                            } else {
                                scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
                            }
                            FormControllerUtility.hideProgressBar(scope.view);
                            scope.adjustScreen();
                        }.bind(this)
                    },
                    "lblHeadingTop": {
                        "text": "-"
                    },
                    "lblHeadingBottom": {
                        "text": "-"
                    },
                    "flxLimitsHeader": {
                        "isVisible": false
                    },
                    "btnReset": {
                        "isVisible": false
                    },
                    lblTransactionType: {
                        "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType")
                    },
                    lblTransactionLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblTransactionLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.maxTransactionLimit")
                    },
                    lblPreApprovalLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblPreApprovalLimitHeaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.preApproveUpto")
                    },
                    lblDenialLimit: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    lblDenialLimitheaderTitle: {
                        "text": kony.i18n.getLocalizedString("i18n.konybb.denyAbove")
                    },
                    "template": template
                });
            })
            return res;
        },

        updateFeatureActionsJson: function(jsonData, SegdataAccountLevel) {
            var jsonDataTemp = cloneJSON(jsonData);

            for (var i = 0; i < jsonDataTemp.length; i++) { //for every account
                for (var j = 0; j < jsonDataTemp[i]["featureData"].length; j++) { //for every feature
                    for (var k = 1; k <= jsonDataTemp[i]["featureData"][j].Actions.length; k++) {
                        var isSelected1 = true;
                        if (SegdataAccountLevel[i][j]["lblTickBox" + k]["text"] === "D") {
                            isSelected1 = false;
                        }
                        jsonDataTemp[i]["featureData"][j]["Actions"][k - 1]["isSelected"] = isSelected1;
                    }
                }
            }
            //setting feature level isselected 
            for (var i = 0; i < jsonDataTemp.length; i++) { //for every account
                for (var j = 0; j < jsonDataTemp[i]["featureData"].length; j++) { //for every feature
                    var flag = 0;
                    for (var k = 1; k <= jsonDataTemp[i]["featureData"][j].Actions.length; k++) {
                        if (SegdataAccountLevel[i][j]["lblTickBox" + k]["text"] === "C") {
                            flag = 1;
                            jsonDataTemp[i]["featureData"][j]["isSelected"] = true;
                            break;
                        }
                        if (flag === 0) {
                            jsonDataTemp[i]["featureData"][j]["isSelected"] = false;
                        }
                    }
                }
            }
            //setting Account level monetary selected?
            for (var i = 0; i < jsonDataTemp.length; i++) { //for every account
                for (var j = 0; j < jsonDataTemp[i]["featureData"].length; j++) { //for every feature
                    var flag = 0;
                    for (var k = 1; k <= jsonDataTemp[i]["featureData"][j].Actions.length; k++) {
                        if (jsonDataTemp[i]["featureData"][j]["Actions"][k - 1]["actionType"] === "MONETARY" && jsonDataTemp[i]["featureData"][j]["Actions"][k - 1]["isSelected"] === true) {
                            flag = 1;
                            break;
                        }
                    }
                    if (flag === 1)
                        break;
                }
                if (flag === 0)
                    jsonDataTemp[i]["isMonetarySelected"] = false;
            }

            return jsonDataTemp;
        },


        updateFeatureActionsSeg: function(Jsondata, SegdataAccountLevel) {
            for (var i = 0; i < Jsondata.length; i++) { //for every account
                for (var j = 0; j < Jsondata[i]["featureData"].length; j++) { //for every feature
                    for (var k = 1; k <= Jsondata[i]["featureData"][j].Actions.length; k++) {
                        if (Jsondata[i]["featureData"][j]["Actions"][k - 1]["isSelected"] === true) {
                            SegdataAccountLevel[i][j]["lblTickBox" + k]["text"] = "C";
                        } else {
                            SegdataAccountLevel[i][j]["lblTickBox" + k]["text"] = "D";
                        }
                    }
                }
            }
            //setting feature level tickbox 
            for (var i = 0; i < SegdataAccountLevel.length; i++) { //for every account
                for (var j = 0; j < SegdataAccountLevel[i].length; j++) { //for every feature
                    var flag = 0;
                    for (var k = 1; k <= SegdataAccountLevel[i][j].Actions.length; k++) {
                        if (SegdataAccountLevel[i][j]["lblTickBox" + k]["text"] === "C") {
                            flag = 1;
                            SegdataAccountLevel[i][j]["lblimgPermissions"] = "C";
                            break;
                        }
                        if (flag === 0) {
                            SegdataAccountLevel[i][j]["lblimgPermissions"] = "D";
                        }
                    }
                }
            }
        },


        //Edit flow for save and update in monetary Limits sections

        findjslimits: function(JSONarray, findWhat) {
            for (var y = 0; y < JSONarray.length; y++) {
                for (x in JSONarray[y]) {
                    if (kony.sdk.isNullOrUndefined(JSONarray[y][x]))
                        continue;
                    if (JSONarray[y][x].text == findWhat)
                        return y;
                }
            }
            return -1;
        },

        updatejson: function(json, segMonetary) {
            var jsonDataTemp = cloneJSON(json);
            if (Array.isArray(jsonDataTemp) && !(kony.sdk.isNullOrUndefined(jsonDataTemp))) {
                for (var i = 0; i < jsonDataTemp.length; i++) {
                    if (Array.isArray(jsonDataTemp[i]["featureData"]) && !(kony.sdk.isNullOrUndefined(jsonDataTemp[i]["featureData"]))) {
                        for (var j = 0; j < jsonDataTemp[i]["featureData"].length; j++) {
                            if (Array.isArray(jsonDataTemp[i]["featureData"][j].Actions) && !(kony.sdk.isNullOrUndefined(jsonDataTemp[i]["featureData"][j].Actions))) {
                                for (var k = 1; k <= jsonDataTemp[i]["featureData"][j].Actions.length; k++) {
                                    if (jsonDataTemp[i]["featureData"][j]["Actions"][k - 1]["isSelected"] === true && jsonDataTemp[i]["featureData"][j]["Actions"][k - 1]["actionType"] === "MONETARY") {
                                        var actionName = jsonDataTemp[i]["featureData"][j].Actions[k - 1].actionName;
                                        var index = this.findjslimits(segMonetary[i], actionName);

                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].PER_TRANSACTION_APPROVE_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxPerTransApproveAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxPerTransApproveAmount.text + "")) : 0;
                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].PER_TRANSACTION_DENIAL_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxPerTransDenialAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxPerTransDenialAmount.text + "")) : 0;
                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].DAILY_APPROVE_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxDailyTransApproveAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxDailyTransApproveAmount.text + "")) : 0;
                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].DAILY_DENIAL_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxDailyTransDenialAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxDailyTransDenialAmount.text + "")) : 0;
                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].WEEKLY_APPROVE_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxWeeklyTransApproveAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxWeeklyTransApproveAmount.text + "")) : 0;
                                        jsonDataTemp[i]["featureData"][j].Actions[k - 1].WEEKLY_DENIAL_LIMIT = !isNaN(parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxWeeklyTransDenialAmount.text + ""))) ? parseFloat(this.convertCommaSeperatedCurrency(segMonetary[i][index].tbxWeeklyTransDenialAmount.text + "")) : 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return jsonDataTemp;
        },


        updatelimitstore: function(json, segMonetary) {
            var normalFlxScreen = "skntbxSSP42424215pxnoborder";
            if (Array.isArray(json) && !(kony.sdk.isNullOrUndefined(json))) {
                for (var i = 0; i < json.length; i++) {
                    if (Array.isArray(json[i]["featureData"]) && !(kony.sdk.isNullOrUndefined(json[i]["featureData"]))) {
                        for (var j = 0; j < json[i]["featureData"].length; j++) {
                            if (Array.isArray(json[i]["featureData"][j].Actions) && !(kony.sdk.isNullOrUndefined(json[i]["featureData"][j].Actions))) {
                                for (var k = 1; k <= json[i]["featureData"][j].Actions.length; k++) {
                                    if (json[i]["featureData"][j]["Actions"]["isSelected"] === true && json[i]["featureData"][j]["Actions"][k - 1]["actionType"] === "MONETARY") {
                                        var actionName = json[i]["featureData"][j].Actions[k - 1].actionName;
                                        var index = this.findjslimits(segMonetary[i], actionName);
                                        segMonetary[i][index].tbxPerTransApproveAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].PER_TRANSACTION_APPROVE_LIMIT);
                                        segMonetary[i][index].tbxPerTransDenialAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].PER_TRANSACTION_DENIAL_LIMIT);
                                        segMonetary[i][index].tbxDailyTransApproveAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].DAILY_APPROVE_LIMIT);
                                        segMonetary[i][index].tbxDailyTransDenialAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].DAILY_DENIAL_LIMIT);
                                        segMonetary[i][index].tbxWeeklyTransApproveAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].WEEKLY_APPROVE_LIMIT);
                                        segMonetary[i][index].tbxWeeklyTransDenialAmount.text = parseFloat(json[i]["featureData"][j].Actions[k - 1].WEEKLY_DENIAL_LIMIT);
                                        segMonetary[i][index].tbxPerTransApproveAmount.skin = normalFlxScreen;
                                        segMonetary[i][index].tbxPerTransDenialAmount.skin = normalFlxScreen;
                                        segMonetary[i][index].tbxDailyTransApproveAmount.skin = normalFlxScreen;
                                        segMonetary[i][index].tbxDailyTransDenialAmount.skin = normalFlxScreen;
                                        segMonetary[i][index].tbxWeeklyTransApproveAmount.skin = normalFlxScreen;
                                        segMonetary[i][index].tbxWeeklyTransDenialAmount.skin = normalFlxScreen;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        //Syncing the global object whenever save and update is pressed in edit other features page
        updateOtherFeaturesGlobalCopyOnsaveAndUpdate: function(otherFeaturesData, otherFeatureSegData) {
            var otherFeaturesDataTemp = cloneJSON(otherFeaturesData);
            for (var i = 0; i < otherFeaturesDataTemp.length; i++) { //for every feature				
                if (otherFeatureSegData[i]["lblimgPermissions"] === "C" || otherFeatureSegData[i]["lblimgPermissions"]["text"] === "C") {
                    otherFeaturesDataTemp[i]["isSelected"] = true;
                } else {
                    otherFeaturesDataTemp[i]["isSelected"] = false;
                }
                for (var k = 1; k <= otherFeaturesDataTemp[i].Actions.length; k++) {
                    var isSelected1 = true;
                    if (otherFeatureSegData[i]["lblTickBox" + k]["text"] === "D") {
                        isSelected1 = false;
                    }
                    otherFeaturesDataTemp[i]["Actions"][k - 1]["isSelected"] = isSelected1;
                }
            }

            return otherFeaturesDataTemp;
        },

        //resetting the data on unsucessfull update
        resetDataOnUpdateServiceError: function() {
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                if (this.manageCustomRoleData["currentEditFlow"] === "roleEdit") {
                    this.accountLevelActionsMainCopy = cloneJSON(this.roleDataBeforeUpdate["accountLevelActionsMainCopy"]);
                    this.accountLevelActionsJson = cloneJSON(this.roleDataBeforeUpdate["accountLevelActionsJson"]);
                    this.otherFeaturesGlobalCopy = cloneJSON(this.roleDataBeforeUpdate["otherFeaturesGlobalCopy"]);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", this.roleDataBeforeUpdate["SelectedRoleName"]);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", this.roleDataBeforeUpdate["SelectedRoleId"]);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("Role_id", this.roleDataBeforeUpdate["Role_id"]);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("Group_Name", this.roleDataBeforeUpdate["Group_Name"]);
                    this.currentUserRole = this.roleDataBeforeUpdate["SelectedRoleName"];
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "customRoleDetailsEdit") {
                    this.loadBusinessBankingModule().presentationController.updateCustomRoleDetails(this.customRoleDataBeforeUpdate, true, 1);
                }
                this.manageCustomRoleData["currentEditFlow"] = "";
            }
        },

        //resetting the data on unsucessfull update
        updateDataOnUpdateServiceSuccess: function() {
            //On successfull update updating global variables in Mangage user flow.
            if (this.manageCustomRoleData["manageCustomRoleFlow"] === 1) {
                if (this.manageCustomRoleData["currentEditFlow"] === "accountLevelFeaturesEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    this.accountLevelActionsJson = this.updateFeatureActionsJson(this.accountLevelActionsJson, this.accountLevelActionsSegdata);
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "limitsEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    this.accountLevelActionsJson = this.updatejson(this.accountLevelActionsJson, this.monetaryLimitsSegdata);
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "otherFeaturesEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    this.otherFeaturesGlobalCopy = this.updateOtherFeaturesGlobalCopyOnsaveAndUpdate(this.otherFeaturesGlobalCopy, this.segDataOtherFeatures);
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "accountAccessEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    var accounts = cloneJSON(this.customRoleObjAfterUpdateTemp["SelectedAccounts"]);
                    applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedAccounts", accounts);
                    this.loadBusinessBankingModule().presentationController.setSelectedAccounts(accounts);
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "roleEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    //evrything is taken care
                }
                if (this.manageCustomRoleData["currentEditFlow"] === "customRoleDetailsEdit" && this.manageCustomRoleData["updateSuccessFlag"] === 1) {
                    //evrything is taken care
                }
                this.manageCustomRoleData["currentEditFlow"] = "";
                this.manageCustomRoleData["updateSuccessFlag"] = 0;
            }
        },

        // Enable or Disable for save and update in Limits edit flow. 
        checkForDataChange: function(dataObj, selectedSectionIndex, selectedRowIndex) {
            var dataChanged = 0;
            var limitsData = cloneJSON(this.monetaryLimitsSegdata[selectedSectionIndex][selectedRowIndex]);
            //No need to enter this is once updated.        
            if (!(this.enableOrDisableUpdateButton["transactionLimitsEditFlow"])) {
                var dataObjOrg = {
                    "PRE_APPROVED_TRANSACTION_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxPerTransApproveAmount"]["text"] + ""),
                    "AUTO_DENIED_TRANSACTION_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxPerTransDenialAmount"]["text"] + ""),
                    "PRE_APPROVED_DAILY_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxDailyTransApproveAmount"]["text"] + ""),
                    "AUTO_DENIED_DAILY_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxDailyTransDenialAmount"]["text"] + ""),
                    "PRE_APPROVED_WEEKLY_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxWeeklyTransApproveAmount"]["text"] + ""),
                    "AUTO_DENIED_WEEKLY_LIMIT": this.convertCommaSeperatedCurrency(limitsData["tbxWeeklyTransDenialAmount"]["text"] + ""),
                    "MAX_TRANSACTION_LIMIT": !isNaN(parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblPerTransLimit"]["text"].slice(2)))) ? parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblPerTransLimit"]["text"].slice(2))) : 0,
                    "DAILY_LIMIT": !isNaN(parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblDailyTransLimit"]["text"].slice(2)))) ? parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblDailyTransLimit"]["text"].slice(2))) : 0,
                    "WEEKLY_LIMIT": !isNaN(parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblWeeklyTransLimit"]["text"].slice(2)))) ? parseFloat(this.convertCommaSeperatedCurrency(limitsData["lblWeeklyTransLimit"]["text"].slice(2))) : 0,
                }
                if (JSON.stringify(dataObj) !== JSON.stringify(dataObjOrg)) {
                    dataChanged = 1;
                }
            }
            if (dataChanged === 1) {
                this.enableOrDisableUpdateButton["transactionLimitsEditFlow"] = true;
            }

            if (this.enableOrDisableUpdateButton["transactionLimitsEditFlow"]) {
                this.disableOrEnableProceedBtnOnTransactionDetails(true);
            } else {
                this.disableOrEnableProceedBtnOnTransactionDetails(false);
            }
        },


        // Enable or Disable for save and update in Account and other feature permissions flow. 
        checkForDataChangeInAccountAndOtherFeaturePermissions: function() {
            if (this.enableOrDisableUpdateButton["accountLevelPermissionsEditFlow"]) {
                FormControllerUtility.enableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
            }
            if (this.enableOrDisableUpdateButton["notAccountLevelPermissionsEditFlow"]) {
                FormControllerUtility.enableButton(this.view.btnFeaturePermissionsSave);
            }
        },

        //method to convert comma seperated amount to without comma .
        convertCommaSeperatedCurrency: function(value) {
            if (typeof(value) == "string") {
                while (value.includes(",")) {
                    value = value.replace(',', "")
                }
            }
            return value;
        },

        /** ----------------------------------------APPLY CUSTOM ROLE TO USERS FLOW----------------------------------------------------------------------------------------- */
        /**
         * Method to populate the Segment with user-list
         *  @param {object} context - which consists of list of users, context
         *  Searching|Sorting
         */
        setUsersDataToApplyCustomRole: function(context) {
            var scopeObj = this;
            this.resetUI();
            this.view.flxApplyCustomRole.setVisibility(true);
            this.currentVisibleFlex = "flxApplyCustomRole";
            this.view.applyCustomRoleComponent.TabsHeaderNew.setVisibility(false);
            this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.applyrole.search");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.applyCustomRoleHeader");
            this.view.lblTitleText.text = kony.i18n.getLocalizedString("i18n.customRole.applyCustomRole");
            CommonUtilities.disableButton(scopeObj.view.btnProceedCreate);
            this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.onRowClick = function() {
                var users = scopeObj.view.applyCustomRoleComponent.TabBodyNew.segTemplates.selectedRowItems;
                if (!kony.sdk.isNullOrUndefined(users) && users.length > 0) {
                    CommonUtilities.enableButton(scopeObj.view.btnProceedCreate);
                } else {
                    CommonUtilities.disableButton(scopeObj.view.btnProceedCreate);
                }
            }
            this.usersSortMap = [{
                    name: 'FirstName',
                    imageFlx: this.view.applyCustomRoleComponent.TabBodyNew.imgName,
                    clickContainer: this.view.applyCustomRoleComponent.TabBodyNew.flxName
                },
                {
                    name: 'role_name',
                    imageFlx: this.view.applyCustomRoleComponent.TabBodyNew.imgRole,
                    clickContainer: this.view.applyCustomRoleComponent.TabBodyNew.flxRole
                },
                {
                    name: 'UserName',
                    imageFlx: this.view.applyCustomRoleComponent.TabBodyNew.imgUsername,
                    clickContainer: this.view.applyCustomRoleComponent.TabBodyNew.flxUsername
                },
                {
                    name: 'Status_id',
                    imageFlx: this.view.applyCustomRoleComponent.TabBodyNew.imgStatus,
                    clickContainer: this.view.applyCustomRoleComponent.TabBodyNew.flxStatus
                }
            ];
            scopeObj.view.applyCustomRoleComponent.TabBodyNew.segTemplates.widgetDataMap = {
                "flxMain": "flxMain",
                "lblUserStatusIndicator": "lblUserStatusIndicator",
                "lblUsernameValue": "lblUsernameValue",
                "flxUserCommonRowHeader": "flxUserCommonRowHeader",
                "btnViewDetails": "btnViewDetails",
                "flxUserHeader": "flxUserHeader",
                "lblName": "lblName",
                "imgCheckbox": "imgCheckbox",
                "lblRole": "lblRole",
                "flxUserStatusIcon": "flxUserStatusIcon",
                "lblUserStatus": "lblUserStatus",
                "btnChangeStatus": "btnChangeStatus",
                "flxDropDown": "flxDropDown",
                "flxCheckBox": "flxCheckBox",
                "flxSeparatorForHeader": "flxSeparatorForHeader",
                "id": "id"
            };
            if (!kony.sdk.isNullOrUndefined(context.users) && Array.isArray(context.users)) {
                const userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
                context.users = context.users.filter((user) => user.UserName != userName);
                if (context.users.length === 0) {
                    var errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.noRecords");
                    if (!kony.sdk.isNullOrUndefined(context.searchString) && context.searchString !== "") {
                        errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.emptySearchMsg");
                    }
                    this.showNoRecords(errorMsg, true);
                } else if (context.users.length > 0) {
                    this.showNoRecords("", false);
                    var selection = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
                    var selectionConfig = {
                        imageIdentifier: "imgCheckbox",
                        selectedStateImage: "activecheckbox.png",
                        unselectedStateImage: "inactivecheckbox.png"
                    };
                    var segData = context.users.map(function(dataItem) {
                        var data = {
                            "flxUserCommonRowDetails": "flxUserCommonRowDetails",
                            "flxMain": "flxMain",
                            "imgCheckbox": "imgCheckbox",
                            "flxUserHeader": "flxUserHeader",
                            "flxSeparatorForHeader": "flxSeparatorForHeader",
                            "lblName": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.FirstName + " " + dataItem.LastName, 15),
                                "toolTip": dataItem.FirstName + " " + dataItem.LastName
                            },
                            "lblUsernameValue": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.UserName, 15),
                                "toolTip": dataItem.UserName,
                            },
                            "lblRole": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.role_name, 15),
                                "toolTip": dataItem.role_name,
                            },
                            "flxUserStatusIcon": "flxUserStatusIcon",
                            "lblUserStatus": {
                                "text": scopeObj.statusConfig(dataItem.status, false),
                            },
                            "id": dataItem.id,
                            "lblUserStatusIndicator": {
                                isVisible: true,
                                skin: scopeObj.setStatusImageConfig(dataItem.status, true)
                            },
                            "flxDropDown": {
                                "isVisible": false
                            },
                            "flxCheckBox": {
                                "isVisible": true
                            },
                        };
                        return data;
                    });
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetailsMobile";
                    } else {
                        this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetails";
                    }
                    this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.removeAll();
                    this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.selectionBehavior = selection;
                    this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.selectionBehaviorConfig = selectionConfig;
                    this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.setData(segData);
                    FormControllerUtility.setSortingHandlers(this.usersSortMap, this.sortUsersHandler, this);
                    FormControllerUtility.updateSortFlex(this.usersSortMap, context.config);
                }
            }
            this.configureSearch(context.searchString, this.searchUsersHandler);
            this.view.btnProceedCreate.onClick = function() {
                scopeObj.selectedUsers = scopeObj.view.applyCustomRoleComponent.TabBodyNew.segTemplates.selectedRowItems;
                scopeObj.showVerifyPageUI(scopeObj.customRoleObj);
            }
            this.view.btnCancelCreate.onClick = function() {
                scopeObj.showCancelPopUp("applyRole");
            }
            this.adjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
        },

        /**
         * Method to configure  sorting handler  for the list of users
         *  @param {JSON} obj - sorting parameters
         */
        searchUsersHandler: function(obj) {
            this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), obj, "frmPermissionsTemplate");
        },

        /**
         * Show No Search results - UI logic
         * @param {String} errorMsg to be displayed
         **/
        showNoRecords: function(errorMsg, isVisible) {
            // this.resetUI(); //uncomment after resetUI is defined.
            this.view.applyCustomRoleComponent.TabBodyNew.flxNoTransactions.setVisibility(isVisible);
            this.view.applyCustomRoleComponent.TabBodyNew.segTemplates.setVisibility(!isVisible);
            this.view.applyCustomRoleComponent.TabSearchBarNew.flxSearch.setVisibility(true);
            this.view.flxContent.setVisibility(true);
            this.view.applyCustomRoleComponent.TabBodyNew.rtxNoPaymentMessage.text = errorMsg;
        },

        /**
         * Method to configure search logic  for the list of users
         *  @param {String} searchText - search String
         *  @param {Method} onSearch - callback
         */
        configureSearch: function(searchText, onSearch) {
            this.view.applyCustomRoleComponent.TabSearchBarNew.flxSearch.setVisibility(true);
            this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.text = searchText || "";
            this.checkSearchForm();
            this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.onDone = function() {
                onSearch({
                    searchString: this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.text.trim()
                });
                this.checkSearchForm();
            }.bind(this);
            this.view.applyCustomRoleComponent.TabSearchBarNew.flxSearchimg.onClick = function() {
                onSearch({
                    searchString: this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.text.trim()
                });
                this.checkSearchForm();
            }.bind(this);
            this.view.applyCustomRoleComponent.TabSearchBarNew.flxClose.onClick = function() {
                onSearch({
                    searchString: ""
                });
                this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.text = "";
                this.checkSearchForm();
            }.bind(this)
        },

        /**
         * Method to check whether the user typed anything in the search bar and making the UI compatible according to the actions of the user
         */
        checkSearchForm: function() {
            if (this.view.applyCustomRoleComponent.TabSearchBarNew.tbxSearch.text.trim() === "") {
                this.view.applyCustomRoleComponent.TabSearchBarNew.flxClose.setVisibility(false);
            } else {
                this.view.applyCustomRoleComponent.TabSearchBarNew.flxClose.setVisibility(true);
            }
            this.view.applyCustomRoleComponent.TabSearchBarNew.forceLayout();
        },

        /**
         *  Method to provide status to updateUserStatus method basing on present status of the user
         * @param {String} status -  status to which the user has to change
         * @param {Boolean} needConversion -  Bpolean that specifies conversion needed or not
         * @returns {String} - Status
         */
        statusConfig: function(status, needConversion) {
            switch (status.toLowerCase().trim()) {
                case "Active".toLowerCase().trim():
                    return needConversion === true ? kony.i18n.getLocalizedString("i18n.userManagement.suspended").toUpperCase() : kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
                case "Suspend".toLowerCase().trim():
                    return needConversion === true ? kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE").toUpperCase() : kony.i18n.getLocalizedString("i18n.userManagement.suspended");
                case "Suspended".toLowerCase().trim():
                    return needConversion === true ? kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE").toUpperCase() : kony.i18n.getLocalizedString("i18n.userManagement.suspended");
                case "New".toLowerCase().trim():
                    return needConversion === true ? kony.i18n.getLocalizedString("i18n.userManagement.new").toUpperCase() : kony.i18n.getLocalizedString("i18n.userManagement.new");
                default:
                    return status;
            }
        },

        /**
         * Method to load status image
         * @param {String} status -  contains Status
         * @param {Boolean} needImage -  contains Boolean if need image or not
         * @returns {String} - may contain Skin for label or Status
         */
        setStatusImageConfig: function(status, needImage) {
            switch (status.toLowerCase().trim()) {
                case kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE").toLowerCase().trim():
                    return needImage === true ? ViewConstants.SKINS.ACTIVE_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.deactivate");
                case kony.i18n.getLocalizedString("i18n.konybb.manageUser.Suspend").toLowerCase().trim() || kony.i18n.getLocalizedString("i18n.userManagement.suspended").toLowerCase().trim():
                    return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.activate");
                case kony.i18n.getLocalizedString("i18n.userManagement.suspended").toLowerCase().trim():
                    return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.activate");
                default:
                    return needImage === true ? ViewConstants.SKINS.NEW_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.resendLink");
            }
        },

        /**
         * Method to configure  sorting handler  for the list of users
         * @param {EventObject} event - event
         *  @param {JSON} obj - sorting parameters
         */
        sortUsersHandler: function(event, obj) {
            this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), obj, "frmPermissionsTemplate");
        },

        showApplyCustomRoleUserListPage: function(customRoleId) {
            var scopeObj = this;
            scopeObj.resetUI();
            scopeObj.view.flxApplyCustomRole.setVisibility(true);

            scopeObj.customRoleId = customRoleId;
            scopeObj.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), null, "frmPermissionsTemplate");
        },

        /**
         * Method to set visibility of edit buttons in verify user page.
         *  @param {JSON} param -boolean value
         */
        setEditButtonsVisibility: function(param) {
            this.view.btnEdit.setVisibility(param);
            this.view.btnRoleEdit.setVisibility(param);
            this.view.btnEditAccount.setVisibility(param);
            this.view.btnRolesPermissionEdit.setVisibility(param);
            this.view.btnOtherPermissionEdit.setVisibility(param);
            this.view.btnTransactionLimitsEdit.setVisibility(param);
        },

        /**
         * Method to show verify user page.
         *  @param {JSON} obj - resposne from service
         */
        showVerifyPageUI: function(obj) {
            var scopeObj = this;
            this.resetUI();
            scopeObj.view.flxVerifyUser.setVisibility(true);
            this.currentVisibleFlex = "flxVerifyUser";
            this.setEditButtonsVisibility(false);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.applyCustomRoleText") +
                kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
                kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
            this.view.lblUserDetails.text = kony.i18n.getLocalizedString("i18n.customRole.selectedUsers");
            this.view.btnSaveAndProceed.text = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
            this.view.btnSaveAndProceed.toolTip = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
            this.view.btnVerifyUserActionsCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.btnVerifyUserActionsCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.btnVerifyUserActionsBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.flxUserDetailHeader.setVisibility(true);
            this.view.flxTopSeparator5.setVisibility(true);
            this.view.flxUserDetailsSegment.setVisibility(true);
            this.view.flxTopSeparator6.top = "0dp";
            this.view.flxTopSeparator6.setVisibility(false);
            this.view.flxParentRole.setVisibility(false);
            this.view.flxUserRoleSegment.height = "50dp";
            this.view.flxRoleName.height = "50dp";
            this.view.lblUserRole.text = kony.i18n.getLocalizedString("i18n.userManagement.userRole");

            var selectedUsersList = this.selectedUsers;
            var size = 51 * (this.selectedUsers.length) + 42;
            var accountWidgetDataMap = {
                "lblName": "lblAccountName"
            };
            this.view.segUserDetails.setVisibility(true);
            this.view.segUserDetails.sectionHeaderTemplate = "flxUsersListHeader";
            this.view.segUserDetails.rowTemplate = "flxBBUserBasicDetails";
            this.view.segUserDetails.height = size + "dp";
            this.view.segUserDetails.widgetDataMap = this.widgetDataMapForCustomRoleUsersSegment();
            var sectionData = {
                "btnName": {
                    "text": "Name",
                    "skin": "sknBtnAccountSummaryUnselectedTransfer424242"
                },
                "imgName": {
                    "src": "sorting.png",
                },
                "flxUsername": {
                    "left": "18.5%",
                },
                "btnUsername": {
                    "text": "Username",
                    "skin": "sknBtnAccountSummaryUnselectedTransfer424242"
                },
                "imgUsername": {
                    "src": "sorting.png"
                },
                "flxImgName": {
                    "onClick": function() {
                        var array = selectedUsersList.sort(scopeObj.getSortOrder("lblName", "toolTip"));
                        if (sectionData["imgName"]["src"] == "sorting.png") {
                            sectionData["imgName"]["src"] = "sorting_next.png";
                        } else if (sectionData["imgName"]["src"] == "sorting_previous.png") {
                            sectionData["imgName"]["src"] = "sorting_next.png";
                        } else {
                            sectionData["imgName"]["src"] = "sorting_previous.png";
                            array = array.reverse();
                        }
                        sectionData["imgUsername"]["src"] = "sorting.png";
                        var segData = scopeObj.getMappedDataForCustomRoleSelection(array);
                        var finalData = [sectionData, segData];
                        scopeObj.view.segUserDetails.setData([finalData]);
                    },
                },
                "flxImgUsername": {
                    "onClick": function() {
                        var array = selectedUsersList.sort(scopeObj.getSortOrder("lblUsernameValue", "toolTip"));
                        if (sectionData["imgUsername"]["src"] == "sorting.png") {
                            sectionData["imgUsername"]["src"] = "sorting_next.png";
                        } else if (sectionData["imgUsername"]["src"] == "sorting_previous.png") {
                            sectionData["imgUsername"]["src"] = "sorting_next.png";
                        } else {
                            sectionData["imgUsername"]["src"] = "sorting_previous.png";
                            array = array.reverse();
                        }
                        sectionData["imgName"]["src"] = "sorting.png";
                        var segData = scopeObj.getMappedDataForCustomRoleSelection(array);
                        var finalData = [sectionData, segData];
                        scopeObj.view.segUserDetails.setData([finalData]);
                    },
                }
            };
            var segData = this.getMappedDataForCustomRoleSelection(selectedUsersList);
            var finalData = [sectionData, segData];
            this.view.segUserDetails.setData([finalData]);
            scopeObj.customRoleObj = obj;
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.SelectedRoleId);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.SelectedRoleName);
            var accdata = scopeObj.setAccountSegData(obj.SelectedAccounts, true);
            applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedAccounts", obj.SelectedAccounts);
            scopeObj.currentUserRole = obj.SelectedRoleName;
            this.manageCustomRoleData["manageCustomRoleFlow"] = 1;
            this.manageCustomRoleData["manageUserRole"] = obj.SelectedRoleName;
            this.CustomRoleObjBc = applicationManager.getBusinessUserManager().getCustomRoleObject();
            this.customRoleObj = {};
            var customRoleAggregate = {};
            this.customRoleObj.SelectedRoleName = this.CustomRoleObjBc["SelectedRoleName"];
            this.customRoleObj.SelectedRoleId = this.CustomRoleObjBc["SelectedRoleId"];
            var SelectedAcc = this.CustomRoleObjBc["SelectedAccounts"];
            this.customRoleObj.selectedAccounts = SelectedAcc;
            this.customRoleObj.SelectedAccounts = SelectedAcc;
            this.customRoleObj.userObject = customRoleAggregate;
            this.currentUserRole = this.CustomRoleObjBc["SelectedRoleName"];
            this.view.lblAssignedRole.text = kony.i18n.getLocalizedString("i18n.userManagement.assignedRole");
            this.view.lblRoleName.text = obj.SelectedRoleName;
            scopeObj.view.segAccountNames.widgetDataMap = accountWidgetDataMap;
            scopeObj.view.segAccountNames.setData(accdata);
            scopeObj.setupUIforOtherfeatures(this.fetchOtherFeaturesActions(this.otherFeaturesGlobalCopy));
            scopeObj.setupUIbasedOnMonetaryPermissions(scopeObj.userDataStore["IsAccountLevel"].length !== 0, scopeObj.userDataStore["MONETARY"].length !== 0);
            this.collapseAllSegments();
            this.view.btnSaveAndProceed.onClick = function() {
                var params = scopeObj.createApplyCustomRolePayload();
                scopeObj.loadBusinessBankingModule().presentationController.applyCustomRole(params);
            }
            this.view.btnVerifyUserActionsBack.onClick = function() {
                scopeObj.backToSelectUsers();
            }
            this.view.btnVerifyUserActionsCancel.onClick = function() {
                scopeObj.showCancelPopUp("applyRole");
            }
            scopeObj.adjustScreen();
        },

        /**
         * Method to go back to select users page to apply custom role.
         */
        backToSelectUsers: function() {
            var scopeObj = this;
            this.resetUI();
            this.currentVisibleFlex = "flxApplyCustomRole";
            this.view.flxApplyCustomRole.setVisibility(true);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.applyCustomRoleHeader");
            scopeObj.adjustScreen();
        },

        /**
         * Method to sort the create a payload for apply custom role.
         * @return  params - json containing required fileds for payload.
         */
        createApplyCustomRolePayload: function() {
            var scopeObj = this;
            var params = {};
            params["customRoleId"] = applicationManager.getBusinessUserManager().getCustomRoleAttribute("id");
            params["users"] = JSON.stringify(scopeObj.getUsersDatatoApplyCustomRole(scopeObj.selectedUsers));
            return params;
        },

        /**
         * Method to sort the list of users based on the property sent as param
         *  @param  param - value in the array of json
         *  @param prop - property of the param.
         */
        getSortOrder: function(param, prop) {
            return function(a, b) {
                if (a[param][prop] > b[param][prop]) {
                    return 1
                } else if (a[param][prop] < b[param][prop]) {
                    return -1
                }
                return 0
            }
        },

        /**
         * Method to create users data as required in apply custom role payload.
         *  @return   - json array of selected users data.
         */
        getUsersDatatoApplyCustomRole: function(param) {
            var segData = param.map(function(dataItem) {
                var data = {
                    "UserName": dataItem.lblUsernameValue.toolTip,
                    "UserId": dataItem.id,
                };
                return data;
            });
            return segData;
        },

        /**
         * Method to sort the list of users based on the property sent as param
         *  @param  param - json array of selected users.
         */
        getMappedDataForCustomRoleSelection: function(param) {
            var segData = param.map(function(dataItem) {
                var data = {
                    "flxUserCommonRowDetails": "flxUserCommonRowDetails",
                    "flxMain": "flxMain",
                    "flxUserHeader": {
                        "left": "0%",
                    },
                    "flxSeparatorForHeader": "flxSeparatorForHeader",
                    "lblName": {
                        "text": CommonUtilities.truncateStringWithGivenLength(dataItem.lblName.text, 15),
                        "toolTip": dataItem.lblName.toolTip,
                        "left": "2.5%",
                    },
                    "lblUsernameValue": {
                        "text": CommonUtilities.truncateStringWithGivenLength(dataItem.lblUsernameValue.text, 15),
                        "toolTip": dataItem.lblUsernameValue.toolTip,
                        "left": "19.5%",
                    },
                };
                return data;
            });
            return segData;
        },

        /**
         * Method to sort the widget dataMapping for users segment in Custom Role Flow.
         */
        widgetDataMapForCustomRoleUsersSegment: function() {
            var mapping = {
                "flxMain": "flxMain",
                "flxUserCommonRowHeader": "flxUserCommonRowHeader",
                "flxUserHeader": "flxUserHeader",
                "lblName": "lblName",
                "lblUsernameValue": "lblUsernameValue",
                "flxSeparatorForHeader": "flxSeparatorForHeader",
                "flxUserListHeader": "flxUserListHeader",
                "flxName": "flxName",
                "flxImgName": "flxImgName",
                "flxImgUsername": "flxImgUsername",
                "btnName": "btnName",
                "imgName": "imgName",
                "flxUsername": "flxUsername",
                "btnUsername": "btnUsername",
                "imgUsername": "imgUsername",
            };
            return mapping;
        },

        /**
         * Method to show Acknowledgement in Custom Role Flow.
         */
        showAcknowledgementForCustomRole: function(response, success) {
            var scopeObj = this;
            if (success) {
                this.resetUI();
                this.view.flxAcknowledgement.setVisibility(true);
                this.currentVisibleFlex = "flxAcknowledgement";
                this.view.btnProceedAddServices.setVisibility(false);
                this.view.flxRoleTitle.setVisibility(true);
                this.view.flxSeparator.setVisibility(true);
                this.view.flxRoleDetails.setVisibility(true);
                this.view.flxTopSeparator4.setVisibility(false);
                this.view.lblSelectedRoleValue.text = applicationManager.getBusinessUserManager().getCustomRoleAttribute("templateName");
                var selectedUsersList = this.selectedUsers;
                this.view.btnCancelAddServices.text = "Back to Custom Roles";
                this.view.btnCancelAddServices.onClick = function() {
                    scopeObj.loadBusinessBankingModule().presentationController.navigateToUserRoles();
                }.bind(this);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.customRole.applyCustomRoleText") +
                    kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
                    kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.lblSuccessMessage.text = "Custom role has been applied successfully";
                this.view.flxRightHeader.setVisibility(false);
                this.view.lblUserDetailsHeading.text = kony.i18n.getLocalizedString("i18n.customRole.selectedUsers");
                this.view.flxViewMoreDetailsAck.setVisibility(false);
                this.view.flxUserSegment.left = "0dp";
                this.view.flxUserSegment.top = "0dp";
                this.view.segUserInfo.sectionHeaderTemplate = "flxUsersListHeader";
                this.view.segUserInfo.rowTemplate = "flxBBUserBasicDetails";
                this.view.segUserInfo.widgetDataMap = this.widgetDataMapForCustomRoleUsersSegment();
                var segData = this.getMappedDataForCustomRoleSelection(this.selectedUsers);
                var sectionData = {
                    "btnName": {
                        "text": "Name",
                        "skin": "sknBtnAccountSummaryUnselectedTransfer424242"
                    },
                    "imgName": {
                        "src": "sorting.png",
                    },
                    "flxUsername": {
                        "left": "18.5%",
                    },
                    "btnUsername": {
                        "text": "Username",
                        "skin": "sknBtnAccountSummaryUnselectedTransfer424242"
                    },
                    "imgUsername": {
                        "src": "sorting.png"
                    },
                    "flxImgName": {
                        "onClick": function() {
                            var array = selectedUsersList.sort(scopeObj.getSortOrder("lblName", "toolTip"));
                            if (sectionData["imgName"]["src"] == "sorting.png") {
                                sectionData["imgName"]["src"] = "sorting_next.png";
                            } else if (sectionData["imgName"]["src"] == "sorting_previous.png") {
                                sectionData["imgName"]["src"] = "sorting_next.png";
                            } else {
                                sectionData["imgName"]["src"] = "sorting_previous.png";
                                array = array.reverse();
                            }
                            sectionData["imgUsername"]["src"] = "sorting.png";
                            var segData = scopeObj.getMappedDataForCustomRoleSelection(array);
                            var finalData = [sectionData, segData];
                            scopeObj.view.segUserInfo.setData([finalData]);
                        },
                    },
                    "flxImgUsername": {
                        "onClick": function() {
                            var array = selectedUsersList.sort(scopeObj.getSortOrder("lblUsernameValue", "toolTip"));
                            if (sectionData["imgUsername"]["src"] == "sorting.png") {
                                sectionData["imgUsername"]["src"] = "sorting_next.png";
                            } else if (sectionData["imgUsername"]["src"] == "sorting_previous.png") {
                                sectionData["imgUsername"]["src"] = "sorting_next.png";
                            } else {
                                sectionData["imgUsername"]["src"] = "sorting_previous.png";
                                array = array.reverse();
                            }
                            sectionData["imgName"]["src"] = "sorting.png";
                            var segData = scopeObj.getMappedDataForCustomRoleSelection(array);
                            var finalData = [sectionData, segData];
                            scopeObj.view.segUserInfo.setData([finalData]);
                        },
                    }
                };
                var finalData = [sectionData, segData];
                var size = 51 * (this.selectedUsers.length + 1);
                this.view.flxUserSegment.height = size + "dp";
                this.view.segUserInfo.height = size + "dp";
                this.view.segUserInfo.setData([finalData]);
            } else {
                this.view.flxMainWrapper.setVisibility(true);
                this.view.lblDowntimeWarning.text = response.errorMessage;
            }
            scopeObj.adjustScreen();
        },

        showVerifyCustomRoleUI: function(obj, saveAndUpdate) {
            var scopeObj = this;
            this.showManageCustomRoleContainer();
            this.setContentForManageCustomRoleContainer();
            this.setEventListenersForManageCustomRoleContainer(obj);

            scopeObj.initVerifyUserDetails();

            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.segUserDetails.rowTemplate = "flxUserDetailsMobileVertical";
                this.setEditButtonsVisibility(false);
                this.view.btnSaveAndProceed.setVisibility(false);
                this.view.btnVerifyUserActionsCancel.setVisibility(false);
                this.view.btnVerifyUserActionsBack.setVisibility(false);
                this.view.btnBacktoAllUsers.setVisibility(true);
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.customRoles.userRoles");
                this.view.btnBacktoAllUsers.text = kony.i18n.getLocalizedString("i18n.customRoles.backToUserRoles");
            } else {
                this.view.segUserDetails.rowTemplate = "flxUserDetailsContainer";
                this.setEditButtonsVisibility(applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE"));
                this.view.btnSaveAndProceed.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_APPLY") &&
                    applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_CREATE"));
                this.view.btnVerifyUserActionsCancel.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_DELETE"));
                this.view.btnVerifyUserActionsBack.setVisibility(true);
                this.view.btnBacktoAllUsers.setVisibility(false);
            }
            if (!kony.sdk.isNullOrUndefined(saveAndUpdate) && saveAndUpdate) {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.SelectedRoleId);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.SelectedRoleName);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedAccounts", obj.SelectedAccounts);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("templateName", obj.userObject.templateName);

                this.currentUserRole = obj.SelectedRoleName;
                this.manageCustomRoleData["manageUserRole"] = obj.SelectedRoleName;
            } else {
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleId", obj.ParentRoleId);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedRoleName", obj.ParentRole);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("SelectedAccounts", obj.accounts);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("templateName", obj.CustomRoleName);
                applicationManager.getBusinessUserManager().setCustomRoleAttribute("id", obj.id);

                this.setupManageUserBasedOnMonetaryPermissions(obj);
                this.currentUserRole = obj.ParentRole;
                this.manageCustomRoleData["manageUserRole"] = obj.ParentRole;
            }
            this.manageCustomRoleData["manageCustomRoleFlow"] = 1;
            //Recreating the old User object
            this.CustomRoleObjBc = applicationManager.getBusinessUserManager().getCustomRoleObject();

            var customRoleAggregate = {};
            customRoleAggregate["templateName"] = this.CustomRoleObjBc["templateName"];

            this.customRoleObj = {};
            this.customRoleObj.SelectedRoleName = this.CustomRoleObjBc["SelectedRoleName"];
            this.customRoleObj.SelectedRoleId = this.CustomRoleObjBc["SelectedRoleId"];
            var SelectedAcc = this.CustomRoleObjBc["SelectedAccounts"];

            if (!kony.sdk.isNullOrUndefined(saveAndUpdate) && saveAndUpdate) {
                //do nothing.
            } else {
                SelectedAcc.forEach(function(element, i) {
                    SelectedAcc[i]["lblAccountName"] = SelectedAcc[i]["AccountName"];
                    SelectedAcc[i]["lblCheckAccount"] = {
                        "text": "C"
                    };
                });
            }
            this.customRoleObj.selectedAccounts = SelectedAcc;
            this.customRoleObj.SelectedAccounts = SelectedAcc;
            this.customRoleObj.userObject = customRoleAggregate;

            this.currentUserRole = this.CustomRoleObjBc["SelectedRoleName"];

            this.Intializeglobaldata(0);

            this.setDataForManageCustomRoleContainer(obj, saveAndUpdate);
            scopeObj.adjustScreen();
        },
    };
});