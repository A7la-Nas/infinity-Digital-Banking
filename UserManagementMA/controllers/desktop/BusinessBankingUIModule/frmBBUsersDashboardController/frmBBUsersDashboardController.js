define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var addToEntityDetails = {};
    var selectedUserDetails = {};
    var selectedRowIndex;
    return {
        /**
         * Update Ui method starts here.
         * @param {String} - View Model.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.campaignRes) {
              try {
                this.campaignSuccess(viewModel.campaignRes);
              } catch(e){}
            }
            if (viewModel.campaignError) {
              try {
                this.view.flxBannerContainerDesktop.setVisibility(false);
              } catch(e){}
              try {
                this.view.flxBannerContainerMobile.setVisibility(false);
              } catch(e){}
            }

            if (viewModel.serverError) {
                if (viewModel.serverError === true) {
                    viewModel.show = true;
                    this.showServerError(viewModel);
                } else {
                    viewModel.show = false;
                    this.showServerError(viewModel);
                }
            }
            if (viewModel.serverDown) {
                CommonUtilities.showServerDownScreen();
            }
            if (viewModel.allUsers) {
             this.view.customheader.forceCloseHamburger();
              if(this.focusedTabId === undefined || this.focusedTabId === 2){
                this.companyList = viewModel.allUsers.users;
                this.generateExistingUsersArr(viewModel.allUsers.users);
              this.usersList = this.existingUsers;
              this.initializeAllUserVariablesOnLoad();
              this.setDropdownPropertiesOnLoad();
              this.setUsersDataToDashboard(this.usersList);
              }
              else{
                this.companyList = viewModel.allUsers.users;
              }
              FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.activationLinkSuccess) {
                //code for success activation
            }
            if (viewModel.statusSuccess) {
                this.updateUserStatusSuccess(viewModel.statusSuccess);
            }
            if (viewModel.manageUser) {
                this.showManageUser(viewModel.manageUser);
            }
            if (viewModel.createUserSuccess) {
                this.showAcknowledgementManageUser();
            }
            if (viewModel.isPrintCancelled) {
                this.showAcknowledgementScreenOnPrintCancel();
            }
            if (viewModel.showRolesDashboard) {
                this.focusedTabId = 2;
                this.tabClickListener({
                    "text": kony.i18n.getLocalizedString("i18n.customRoles.userRoles")
                });
            }
            if (viewModel.organizationRolesFailure) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.organizationRolesSuccess) {
                //this.setDataForUserRolesDashboard(viewModel.organizationRolesSuccess);
            }
            if (viewModel.CustomRoleDeletedSuccessfully) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.CustomRoleDeletionFailed) {
                viewModel.show = true;
                this.showServerError(viewModel);
            }
          if( viewModel.companyLevelCustomRolesSuccess ) {
            this.setContractData(viewModel.companyLevelCustomRolesSuccess);
          }
          if (viewModel.getInfinityUserFailure) {
              var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            	this.view.flxDowntimeWarning.isVisible = true;
            	CommonUtilities.setText(this.view.lblDowntimeWarning,viewModel.getInfinityUserFailure,accessibilityConfig);
            	FormControllerUtility.hideProgressBar(this.view);
          }
          if (viewModel.getInfinityUserSuccess) {
            applicationManager.getConfigurationManager().skipFlag = false;
            applicationManager.getConfigurationManager().copyFlag = undefined;
            	this.view.flxDowntimeWarning.isVisible = false;
            	FormControllerUtility.hideProgressBar(this.view);
           	applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
          }
          if (viewModel.viewCustomRoleDetailsSuccess) {
            applicationManager.getNavigationManager().setCustomInfo("customRoleDetails",viewModel.viewCustomRoleDetailsSuccess.customRoleDetails);
            applicationManager.getConfigurationManager().skipFlag = false;
            applicationManager.getConfigurationManager().copyFlag = undefined;
            FormControllerUtility.hideProgressBar(this.view);
            applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
          }
          if (viewModel.viewCustomRoleDetailsFailure) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.flxDowntimeWarning.isVisible = true;
            CommonUtilities.setText(this.view.lblDowntimeWarning,viewModel.viewCustomRoleDetailsFailure,accessibilityConfig);
            FormControllerUtility.hideProgressBar(this.view);
          }
          if (viewModel.emailAndPhone) {
            var res = viewModel.emailAndPhone;
            this.phoneNumber = res.CoreCustomer[0].phone;
            this.email = res.CoreCustomer[0].email;
            this.populateEmailAndPhone();
          }
          if (viewModel.contractDetails) {
            let navManager = applicationManager.getNavigationManager();
            FormControllerUtility.hideProgressBar(this.view);
            navManager.setCustomInfo("contractDetails", viewModel.contractDetails);
            this.getUserAccounts();
            //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
          }
          if (viewModel.userAccounts) {
            let navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("userAccounts", viewModel.userAccounts);
            FormControllerUtility.hideProgressBar(this.view);
            if(navManager.getCustomInfo("addToEntityFlow")==="addToEntity"){
              var userModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
             userModule.presentationController.showUserManagent({
                                "show": 'addToEntity'
                            });
            }
            else{
            applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
            }
          }
          if(viewModel.legalEntitySuccess){
            let navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("legalEntityList", viewModel.legalEntitySuccess);
            //this.view.AddToOtherEntity.flxDropDown.info = viewModel.legalEntitySuccess;
            FormControllerUtility.hideProgressBar(this.view);
          }
        },
      
      getUserAccounts : function(){
        var navManager =  applicationManager.getNavigationManager();
        var userId = navManager.getCustomInfo("userId");
        if(navManager.getCustomInfo("addToEntityFlow")==="addToEntity")
        this.loadBusinessBankingModule().presentationController.getInfinityUserAccounts(applicationManager.getUserPreferencesManager().getUserId());
        else
        this.loadBusinessBankingModule().presentationController.getInfinityUserAccounts(userId);
        },
    
        campaignSuccess : function(data){
			  var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
        CampaignManagementModule.presentationController.updateCampaignDetails(data);
        var self =this;
        if(data.length === 0){
       
        this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
      	}
        else {
            this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(true);
           
        	this.view.dbRightContainerNew.imgBanner.src = data[0].imageURL;
       		this.view.dbRightContainerNew.imgBanner.onTouchStart =function(){
              CampaignUtility.onClickofInAppCampaign(data[0].destinationURL); 
            };
        }
        this.adjustScreen();
		},
    
		tabClickListener : function(eventobject) {
          this.view.flxActiveDeactAcknow.setVisibility(false);
          var btnText = eventobject.text;
          var focusTabId = 1;
          if (btnText === kony.i18n.getLocalizedString("i18n.userManagement.allUsers")) {
            focusTabId = 1;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.setVisibility(true);
            this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
            this.generateExistingUsersArr(this.companyList);
            this.usersList = this.existingUsers;
            this.initializeAllUserVariablesOnLoad();
            this.setDropdownPropertiesOnLoad();
            this.setUsersDataToDashboard(this.usersList);            
            this.updateHamburgerMenu("User Management", "All Users");
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("kony.userMgmt.SearchUserByNameUserId"); 
			this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.userManagement.allUsers");
          } else if (btnText === kony.i18n.getLocalizedString("i18n.customRoles.userRoles")) {
            this.custRoleData = [];
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.userManagement.allUserRoles");
            focusTabId = 2;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.setVisibility(true);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "arrowdown_sm.png";
            //this.loadBusinessBankingModule().presentationController.fetchUserRoles();
            const configManager = applicationManager.getConfigurationManager();
        	this.loadBusinessBankingModule().presentationController.getCompanyLevelCustomRoles();
            this.updateHamburgerMenu("User Management", "User Roles");
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.customRole.searchByRoleUserID");
          }
          this.focusedTabId = focusTabId;
          this.view.TabPane.TabsHeaderNew.focusTab(focusTabId);

        },

        /**
         * Show No Search results - UI logic
         * @param {String} errorMsg to be displayed
         **/
        showNoRecords: function(errorMsg) {
            this.resetUI();
            this.view.TabPane.TabBodyNew.flxNoTransactions.setVisibility(true);
            this.view.TabPane.TabSearchBarNew.flxSearch.setVisibility(true);
            this.view.flxContent.setVisibility(true);
            this.view.TabPane.TabBodyNew.rtxNoPaymentMessage.text = errorMsg;
        },
        /**
         * Method to load data after successful update of user's status
         * @param {object} userStatus - response
         */
        updateUserStatusSuccess: function(userStatus) {
            this.view.flxActiveDeactAcknow.setVisibility(true);
            if (userStatus === "ACTIVE") {
                this.view.lblActiveSuccessMsg.text = kony.i18n.getLocalizedString("konybb.userMgmt.userActivate");
            }
            if (userStatus === "SUSPENDED") {
                this.view.lblActiveSuccessMsg.text = kony.i18n.getLocalizedString("konybb.userMgmt.userDeactivate");
            }
            if (this.view.flxContentDetails.isVisible) {
                //manage user screen
                this.view.lblStatusKeyValue.text = this.statusConfig(userStatus, false);
                this.view.lblUserStatusIndicator.skin = this.setStatusImageConfig(userStatus, true);
                this.showActivateButton(userStatus, this.view.lblUserNameValue.text);
            } else {
                //BB users dashboard
                var scopeObj = this;
                var segData = this.view.TabPane.TabBodyNew.segTemplates.data;
                var index = this.selectedUserRowIndex;
                var tempData = segData[index];
                this.usersList[index].status = userStatus;
                tempData.lblUserStatus = {
                    "text": scopeObj.statusConfig(userStatus, false),
                };
                tempData.btnChangeStatus = {
                    onClick: scopeObj.onClickOfChangeStatus.bind(this, index,"btnChangeStatus"),
                    "text": scopeObj.setStatusImageConfig(userStatus, false)
                };
                tempData.lblUserStatusIndicator = {
                    isVisible: true,
                    skin: scopeObj.setStatusImageConfig(userStatus, true)
                };
                this.view.TabPane.TabBodyNew.segTemplates.setDataAt(tempData, index);
            }
            this.adjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Method to load and returns the Business User Module Object
         * @returns {object} Method to load and returns the Business User Module Object
         */
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {
            this.view.flxContent.setVisibility(false);
            this.view.flxContentDetails.setVisibility(false);
            this.view.flxPopupConfirmation.setVisibility(false);
            this.view.TabPane.TabBodyNew.flxNoTransactions.setVisibility(false);
            this.view.TabPane.TabBodyNew.segTemplates.setVisibility(false);
            this.view.TabPane.TabSearchBarNew.flxNoSearchResult.setVisibility(false);
            this.view.TabPane.TabSearchBarNew.flxSearch.setVisibility(false);
            this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(false);
            this.showServerError({
                show: false
            });
        },
        /**
         * Method to navigate to create User page
         */
        navigateToCreateUser: function() {
            //this.loadBusinessBankingModule().presentationController.showCreateUser(false,"fromAllUsers");
            var presentationScope = this.loadBusinessBankingModule().presentationController;
            presentationScope.initializeFlowConfigs("createUser");
            applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
        },

        navigateToTransactionLimits: function() {
            applicationManager.getNavigationManager().navigateTo("frmTransactionLimits");
        },
		
		setDataForTabsHeader : function() {
          this.view.TabPane.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.userManagement.allUsers");
          this.view.TabPane.TabsHeaderNew.btnTab1.skin = "sknBtnSSP72727217PxUnSelectedTab";
          this.view.TabPane.TabsHeaderNew.btnTab1.onClick = this.tabClickListener;
          this.view.TabPane.TabsHeaderNew.btnTab1.setVisibility(true);
			
          this.view.TabPane.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.customRoles.userRoles");
          this.view.TabPane.TabsHeaderNew.btnTab2.skin = "sknBtnSSP72727217PxUnSelectedTab";
          this.view.TabPane.TabsHeaderNew.btnTab2.onClick = this.tabClickListener;
          this.view.TabPane.TabsHeaderNew.btnTab2.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_VIEW")
                                                               		&& !(kony.application.getCurrentBreakpoint()==640 || orientationHandler.isMobile) );
          
          this.view.TabPane.TabsHeaderNew.btnTab3.setVisibility(false);
          this.view.TabPane.TabsHeaderNew.btnTab4.setVisibility(false);
          this.view.TabPane.TabsHeaderNew.btnTab5.setVisibility(false);
          this.view.TabPane.TabsHeaderNew.btnTab6.setVisibility(false);
        },

		setDataForAllUsersDashboard: function(){
          this.usersSortMap = [ 
            {
              name: 'FullName',
              imageFlx:this.view.TabPane.TabBodyNew.imgName,
              clickContainer: this.view.TabPane.TabBodyNew.flxName
            },
            {
              name: 'Role',
              imageFlx: this.view.TabPane.TabBodyNew.imgRole,
              clickContainer: this.view.TabPane.TabBodyNew.flxRole
            },
            {
              name: 'UserName',
              imageFlx: this.view.TabPane.TabBodyNew.imgUsername,
              clickContainer: this.view.TabPane.TabBodyNew.flxUsername
            },
            {
              name: 'Status',
              imageFlx: this.view.TabPane.TabBodyNew.imgStatus,
              clickContainer: this.view.TabPane.TabBodyNew.flxStatus
            }
          ];
          this.view.TabPane.TabBodyNew.segTemplates.widgetDataMap = {
            "imgBottonSeparator":"imgBottonSeparator",
            "flxBottomSeperator":"flxBottomSeperator",
            "flxActions":"flxActions",
            "flxManageUsers":"flxManageUsers",
            "lblUserStatusIndicator":"lblUserStatusIndicator",
            "btnManageUsers":"btnManageUsers",
            "flxDetails":"flxDetails",
            "lblLastSignedInTitle":"lblLastSignedInTitle",
            "lblEmailTitle":"lblEmailTitle",
            "lblLastSignedIn":"lblLastSignedIn",
            "lblEmailValue":"lblEmailValue",
            "lblPhoneNumberTitle":"lblPhoneNumberTitle",
            "lblRoleTitle":"lblRoleTitle",
            "lblPhoneNumber":"lblPhoneNumber",
            "btnAddEntity":"btnAddEntity",
            "lblUsernameValue":"lblUsernameValue",
            "flxUserDetails":"flxUserDetails",
            "flxUserCommonRowDetails":"flxUserCommonRowDetails",
            "flxUserCommonRowHeader":"flxUserCommonRowHeader",
            "flxViewUserDetails":"flxViewUserDetails",
            "btnViewDetails":"btnViewDetails",
            "flxBottomSeperatorEnd":"flxBottomSeperatorEnd",
            "imgBottomSeperatorEnd":"imgBottomSeperatorEnd",
            "flxDropDown":"flxDropDown",
            "lblDropdown":"lblDropdown",
            "flxUserHeader":"flxUserHeader",
            "lblName":"lblName",
            "lblRole":"lblRole",
            "lblUserName":"lblUserName",
            "lblUserNameTitle":"lblUserNameTitle",
            "flxUserStatusIcon":"flxUserStatusIcon",
            "lblUserStatus":"lblUserStatus",
            "flxUserStatusChange":"flxUserStatusChange",
            "btnChangeStatus":"btnChangeStatus",
            "lblLastSignIn":"lblLastSignIn",
            "flxSeparatorForHeader":"flxSeparatorForHeader",
            "imgSeparatorHeader":"imgSeparatorHeader",
          };
		},
      
		navigateToCreateCustomRole : function() {
			this.loadBusinessBankingModule().presentationController.initializeFlowConfigs("createRole");
			this.loadBusinessBankingModule().presentationController.showCreateCustomRole();
        },


        /**
         * Method will invoke on form init
         */
        onInit: function() {
            var self = this;
            var val = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE") && !(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile);
            this.view.onDeviceBack = function() {};
            this.setDataForTabsHeader();

            this.view.dbRightContainerNew.flxActions.isVisible = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_CREATE");
            this.view.dbRightContainerNew.btnAction1.onClick = this.navigateToCreateUser;
            //this.view.dbRightContainerNew.btnAction3.onClick = this.navigateToTransactionLimits;

            this.view.dbRightContainerNew.flxAction2.setVisibility(val);
            this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.customRole.createCustomRole");
            this.view.dbRightContainerNew.btnAction2.onClick = this.navigateToCreateCustomRole;

            this.view.TabPane.TabSearchBarNew.tbxSearch.onKeyUp = this.checkSearchForm.bind(this);
            this.view.imgCloseDowntimeWarning.onTouchEnd = this.showServerError.bind(this, {
                show: false
            });
            this.view.onBreakpointChange = this.onBreakpointChange.bind(this, kony.application.getCurrentBreakpoint());

            //Manager user code
            this.view.btnEdit.onClick = function() {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    self.loadBusinessBankingModule().presentationController.showCreateUser({
                        "edit": true
                    });
                } else {}
            };
            this.view.btnEditUserRoles.onClick = function() {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    self.loadBusinessBankingModule().presentationController.fetchRoles(this.loadBusinessBankingModule().presentationController.onFetchUserRolesSuccess.bind(this.loadBusinessBankingModule().presentationController), "frmUserManagement");
                } else {}
            };
            this.view.btnEditUserPermissions.onClick = function() {
                if (kony.application.getCurrentBreakpoint() !== 640) {
                    self.loadBusinessBankingModule().presentationController.showAllAccounts();
                } else {}
            };
            this.view.btnViewAllUsers.onClick = function() {
                //code for going back to all users
                //self.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
              	self.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
            };
            this.view.flxInfoIcon.onClick = function() {
                if (self.view.InfoIconPopup.isVisible === true) {
                    self.view.InfoIconPopup.setVisibility(false);
                    // Populate the correct flex here
                } else {
                    self.view.InfoIconPopup.setVisibility(true);
                    self.view.InfoIconPopup.left = self.view.flxInfoIcon.frame.x + self.view.flxContentContainer.frame.x - 40 + "dp";
                    if (self.view.flxAcknowledgement.isVisible === true) {
                        self.view.InfoIconPopup.top = self.view.flxInfoIcon.frame.y + self.view.flxAcknowledgement.info.frame.height + 755 + "dp";
                    } else
                        self.view.InfoIconPopup.top = self.view.flxInfoIcon.frame.y + 755 + "dp";
                }
                self.view.InfoIconPopup.lblInfo.text = kony.i18n.getLocalizedString("i18n.konybb.accountAcessDetailstext");
            };
            this.view.flxInfoTransactionAccess.onClick = function() {
                if (self.view.InfoIconPopup.isVisible === true) {
                    self.view.InfoIconPopup.setVisibility(false);
                    // Populate the correct flex here
                } else {
                    self.view.InfoIconPopup.setVisibility(true);
                    if (self.view.flxAcknowledgement.isVisible === true) {
                        if (self.view.flxAccountsAndPermissons.isVisible === true) {
                            self.view.InfoIconPopup.top = self.view.flxInfoTransactionAccess.frame.y + self.view.flxAccountsAndPermissons.info.frame.height + self.view.flxAcknowledgement.info.frame.height + 816 + "dp";
                        } else
                            self.view.InfoIconPopup.top = self.view.flxInfoTransactionAccess.frame.y + self.view.flxAcknowledgement.info.frame.height + 816 + "dp";
                    } else {
                        if (self.view.flxAccountsAndPermissons.isVisible === true) {
                            self.view.InfoIconPopup.top = self.view.flxInfoTransactionAccess.frame.y + self.view.flxAccountsAndPermissons.info.frame.height + 816 + "dp";
                        } else
                            self.view.InfoIconPopup.top = self.view.flxInfoTransactionAccess.frame.y + 816 + "dp";
                    }
                    self.view.InfoIconPopup.left = self.view.flxInfoTransactionAccess.frame.x + self.view.flxContentContainer.frame.x - 40 + "dp";
                }
                self.view.InfoIconPopup.lblInfo.text = kony.i18n.getLocalizedString("i18n.konybb.transactionAccessDetailstext");
            };
            this.view.InfoIconPopup.flxCross.onClick = function() {
                self.view.InfoIconPopup.isVisible = false;
            };
            this.view.flxActiveDeactAcknow.setVisibility(false);
          this.view.AddToOtherEntity.btnContinue.onClick = function(){
            
            self.navigateToAddToEntityFlow();
             /*userModule.presentationController.showUserManagent({
                                "show": 'addToEntity'
                            });*/
          };
          this.view.AddToOtherEntity.btnCancelSelection.onClick = function(){
            self.view.flxLegalEntityPopup.setVisibility(false);
          };

          this.view.AddToOtherEntity.imgClosePopup.onTouchEnd = function(){
            self.view.flxLegalEntityPopup.setVisibility(false);
          };

          this.view.AddToOtherEntity.flxEntityTextBox.onTouchEnd = function(){
            self.view.AddToOtherEntity.flxDropDown.setVisibility(!self.view.AddToOtherEntity.flxDropDown.isVisible);
            self.view.AddToOtherEntity.btnContinue.setEnabled(false);
            self.view.AddToOtherEntity.lblErrorMessage.setVisibility(false);
            if(self.view.AddToOtherEntity.flxDropDown.isVisible){
              self.view.AddToOtherEntity.flxBody.height="270px";
              self.view.AddToOtherEntity.flxLegalEntity.height="230px";
              self.view.AddToOtherEntity.flxLegalEntitySelection.height="190px";          
              self.setEntityData();
              }
            else{
              self.view.AddToOtherEntity.flxBody.height="230px";
              self.view.AddToOtherEntity.flxLegalEntity.height="190px";
              self.view.AddToOtherEntity.flxLegalEntitySelection.height="150px";
            }
          };
        },
        /**
       *  Pre show Method
       */
        onPreShow: function () {
          var scope = this;
          this.seti18nValues();
          this.focusedTabId=undefined;
          this.view.TabPane.TabsHeaderNew.btnTab1.width="81px";
          this.view.TabPane.TabsHeaderNew.btnTab2.width="94px";
          this.view.TabPane.TabsHeaderNew.btnTab2.left="1%";
          this.view.TabPane.TabSearchBarNew.flxBoxSearch.left="15dp";
          this.view.TabPane.TabSearchBarNew.flxSearch.left="-1.5%";
          this.view.TabPane.TabsHeaderNew.left="-1.3%";
          this.view.dbRightContainerNew.left="0.6%";
          applicationManager.getConfigurationManager().skipFlag = true;
              this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
               if(this.view.customheader.topmenu.flxMenu !== undefined){
                this.view.customheader.topmenu.flxMenu.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
              }
              this.view.TabPane.TabSearchBarNew.tbxSearch.skin = "ICSknSSPRegular727272op10015px";
              this.view.TabPane.TabSearchBarNew.tbxSearch.placeholderSkin = "bbSknTbx949494SSP15px";
              this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.skin = "slFbox"
              this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.skin="sknFlxffffffborderradE3E3E3";
              FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxAcknowledgment', 'flxAccountsAndPermissons','flxHeader', 'flxMain', 'flxFooter','flxFormContent']);
              this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
              this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
              this.view.customheader.forceCloseHamburger();
          	this.view.TabPane.TabBodyNew.btnName.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
          	if(kony.application.getCurrentBreakpoint()==640 || orientationHandler.isMobile){
          		this.view.TabPane.TabsHeaderNew.btnTab1.skin = "sknLblSSP42424213px";
              	// this.view.TabPane.TabSearchBarNew.flxSearch.skin = "bbSknFlxf8f7f8";
                this.view.TabPane.TabSearchBarNew.skin = "bbsknf8f7f8WithoutBorder";
          		this.view.TabPane.TabSearchBarNew.flxBoxSearch.skin = "sknFlxffffffborderradE3E3E3";
             	this.view.PopupHeaderUM.lblHeader.skin = "bbSknLbl424242SSP15Px";
              	this.view.PopupHeaderUM.lblPopupMsg.skin = "bbSknLbl424242SSP15Px";
                this.view.PopupHeaderUM.imgClose.src = "icon_close_grey.png";
            } else {
                this.view.TabPane.TabsHeaderNew.btnTab1.skin = "sknBtnSSP72727217PxUnSelectedTab";
                this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.skin = "sknFlxBgfbfbfbBor1pxTBe3e3e3";
            }
            this.view.TabPane.TabBodyNew.btnRole.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.TabPane.TabBodyNew.btnUsername.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.TabPane.TabBodyNew.btnStatus.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.TabPane.TabBodyNew.lblActions.skin = "slLabel0d8a72616b3cc47";
            this.view.TabPane.skin = "CopybbSknFlxffffffWithoutShadowBlur";
            this.view.TabPane.TabBodyNew.imgName.src = "sorting_next.png";
            this.view.TabPane.TabBodyNew.imgRole.src = "sorting_next.png";
            this.view.TabPane.TabBodyNew.imgUsername.isVisible = false;
            this.view.TabPane.TabBodyNew.imgStatus.src = "sorting_next.png";
            this.view.TabPane.TabSearchBarNew.flxSearchimg.isVisible = true;
            this.view.PopupHeaderUM.lblHeader.skin = "sknlblUserName";
            this.view.PopupHeaderUM.lblPopupMsg.skin = "sknlblUserName";
            this.view.flxAcknowledgementNew1.flxImgPrint.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
            scope.setDropdownVisiblility();
          }.bind(this);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxAll.lblAll.onTouchEnd = function() {
            if(this.focusedTabId === 1){
              this.setAllUsersRecords();         		
        	}else{
              this.setAllRecords();
            }           
          }.bind(this);
          this.view.forceLayout();
          if (kony.i18n.getCurrentLocale() === "ar_AE") {
            this.view.enableScrolling = false;
          }
        },
        /**
         * onPostshow event Function
         **/
        onPostShow: function() {
            var scopeObj = this;
            var navManager = applicationManager.getNavigationManager().setCustomInfo("addToEntityFlow",undefined);
            this.view.AddToOtherEntity.flxDropDown.setVisibility(false);
			//this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.left = "1000%";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.accessibilityFocusSetup();
            var val = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE") && !(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile);
            this.view.dbRightContainerNew.flxAction2.setVisibility(val);
            if (kony.application.getCurrentBreakpoint() <= 1024 || this.orientationHandler.isTablet) {
                this.view.dbRightContainerNew.isVisible = false;
//                 this.view.customfooter.flxFooterMenu.left = "20.5%";
//                   this.view.customfooter.flxFooterMenu.width = "100%";
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
            if(kony.os.deviceInfo().deviceWidth >= 1280){
                this.view.TabPane.TabSearchBarNew.flxSearchimg.left = "0dp";
                }
            else if(kony.os.deviceInfo().deviceWidth >640 && kony.os.deviceInfo().deviceWidth<=1024){
                this.view.TabPane.TabSearchBarNew.flxSearchimg.left = "1dp";
            }
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE"){
                if (kony.application.getCurrentBreakpoint() > 1024) {
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblView.width = "18%";
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblView.left = "5%";
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblViewType.left = "18%";
                }
            }
            else {
                if (kony.application.getCurrentBreakpoint() > 1024) {
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblView.width = "18%";
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblView.left = "5%";
                    this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblViewType.left = "24%";
                }
            }

          if (kony.application.getCurrentBreakpoint() >= 1380) {
            this.view.flxFooter.top = "847dp";
          }

          if(kony.application.getCurrentBreakpoint() <= 1024) {
            this.view.flxFooter.top = "754dp";
          }
          	this.view.forceLayout();
          	this.footerAlign();
            this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.skin="sknFlxBgfbfbfbBor1pxTBe3e3e3";
  			//this.adjustScreen();
        },

        // Footer gets aligned according to the device type - "ARB-36351"
        footerAlign: function() {
            if (kony.application.getCurrentBreakpoint() < 1380 && kony.application.getCurrentBreakpoint() !== 1024){
                this.adjustScreen();
            }
        },

        /**
         * Set i18n values
         */
        seti18nValues: function() {
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblView.text = kony.i18n.getLocalizedString("i18n.konybb.ACH.viewColon");
          this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.common.UserManagement");
          CommonUtilities.setFooterButtonToolTips(this.view.customfooter);
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.TabPane.TabSearchBarNew.tbxSearch, this.view.TabPane.TabSearchBarNew.flxBoxSearch],
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
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
                case "active":
                    //return needImage === true ? ViewConstants.SKINS.ACTIVE_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.deactivate");
                	return needImage === true ? ViewConstants.SKINS.ACTIVE_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                case "suspend":
                    //return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.activate");
                	return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                case "suspended":
                    //return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.activate");
                	return needImage === true ? ViewConstants.SKINS.SUSPENDED_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                default:
                    return needImage === true ? ViewConstants.SKINS.NEW_STATUS_SKIN : kony.i18n.getLocalizedString("i18n.userManagement.resendLink");
            }
        },

        getDataMapForUserRoles: function() {
            return {
                "lblRoleName": "name",
                "lblCreatedOn": "createdts",
                "lblCreatedBy": "userName",
                "btnViewPermissions": "btnViewPermissions",
                "lblSeparator": "lblSeparator",
                "parentRoleName": "parentRoleName",
                "statusValue": "statusValue",
                "description": "description",
                "userName": "userName",
                "softdeleteflag": "softdeleteflag",
                "parent_id": "parent_id",
                "organization_id": "organization_id",
                "modifiedby": "modifiedby",
                "id": "id",
            };
        },

        getDefaultValuesForCustomRoles: function() {
            return {
                btnViewPermissions: {
                    "text": kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions"),
                    "onClick": this.viewPermissionsOfCustomRole
                },
                lblSeparator: {
                    "text": "-"
                }
            }
        },

        viewPermissionsOfCustomRole: function(eventobject, context) {
            FormControllerUtility.showProgressBar(this.view);
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPane.TabBodyNew.getData()[section][1][row];
            this.loadBusinessBankingModule().presentationController.viewEditRole(selectedRowData.id.text);
        },

        /**
         * Method to sort the list of custom roles based on the property sent as param
         *  @param  param - value in the array of json
         */
        getSortOrder: function(param) {
            return function(a, b) {
                let property1 = a[param];
                let property2 = b[param];
                if (!kony.sdk.isNullOrUndefined(property1["toolTip"])) {
                    property1 = property1["toolTip"].toLowerCase();
                    property2 = property2["toolTip"].toLowerCase();
                }

                if (property1 > property2) {
                    return 1;
                } else if (property1 < property2) {
                    return -1;
                }
                return 0;
            };
        },
        
      navigateToAddToEntityFlow : function(){
        var self=this;
            //var userModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
             var navManager = applicationManager.getNavigationManager();
             navManager.setCustomInfo("addToEntityFlow","addToEntity");
             var userId = this.usersList[selectedRowIndex].id;
              navManager.setCustomInfo('userId', userId);
              this.loadBusinessBankingModule().presentationController.getContractDetails(userId);
      },
        setEntityData : function(){
          var self=this;
            let navManager = applicationManager.getNavigationManager();
            var legalEntities = navManager.getCustomInfo("legalEntityList");
            /*var legalEntities = [{"closeDate":"2045-09-20","countryCode":"EU","companyName":"Europe","description":"LE for Europe","typeId":"LEGALENTITY","language":"EN","id":"GB0010001","region":"Europe","parentId":"GR23698574","baseCurrency":"Euro","effectiveDate":"1990-09-20"},
	{"closeDate":"2046-09-20","countryCode":"IN","companyName":"India","description":"LE for India","typeId":"LEGALENTITY","language":"IN","id":"GB0010002","region":"India","parentId":"GR23698575","baseCurrency":"Rupee","effectiveDate":"1990-09-20"},
	{"closeDate":"2047-09-20","countryCode":"CA","companyName":"Canada","description":"LE for Canada","typeId":"LEGALENTITY","language":"EN","id":"GB0010003","region":"Canada","parentId":"GR23698576","baseCurrency":"Dollar","effectiveDate":"1990-09-20"}
	];*/
			var entityData = [];
            var widgetMap = {
              "lblEntityName": "lblEntityName",
              "flxDropDown": "entityId"
            };
          legalEntities = legalEntities.filter(test => self.selectedUserDetails.SelectedUserEntityId!==test.id)
          entityData = legalEntities.map(function(le){
           return{
             "lblEntityName": le.companyName,
             "entityId": le.id
           };
          });
          /*"lblEntityName": le.companyName,
              "entityId": le.id*/
          this.view.AddToOtherEntity.segEntityDropdown.widgetDataMap=widgetMap;
          this.view.AddToOtherEntity.segEntityDropdown.setData(entityData);
          this.view.AddToOtherEntity.segEntityDropdown.onRowClick = function(){
            var index=self.view.AddToOtherEntity.segEntityDropdown.selectedRowIndex[1];
            self.view.AddToOtherEntity.lblSelectedEntity.text = entityData[index].lblEntityName;
            var valid= self.setEntityValidation(entityData[index].entityId);
            if(valid===true){
            self.view.AddToOtherEntity.btnContinue.setEnabled(true);
            self.view.AddToOtherEntity.btnContinue.skin="sknBtnNormalSSPFFFFFF15Px";
            self.view.AddToOtherEntity.btnContinue.hoverSkin="sknBtnNormalSSPFFFFFFHover15Px";
            self.view.AddToOtherEntity.flxBody.height="230px";
            self.view.AddToOtherEntity.flxLegalEntity.height="190px";
            self.view.AddToOtherEntity.flxLegalEntitySelection.height="150px";
            self.view.AddToOtherEntity.flxDropDown.setVisibility(false);
            self.addToEntityDetails =  {"addToEntityId":entityData[index].entityId,
                                        "addToEntityName":entityData[index].lblEntityName,
                                        "contractId":self.companyList.companyList[0].contractId,
                                        "coreCustomerId":self.companyList.companyList[0].companies[0].coreCustomerId,
                                        "userDetails":self.selectedUserDetails};
            navManager.setCustomInfo("addToEntityDetails",self.addToEntityDetails);
            }
            else{
              self.view.AddToOtherEntity.btnContinue.setEnabled(false);
              self.view.AddToOtherEntity.btnContinue.skin="sknBtnBlockedSSP0273e315px";
              self.view.AddToOtherEntity.lblErrorMessage.setVisibility(true);
              self.view.AddToOtherEntity.flxBody.height="200px";
              self.view.AddToOtherEntity.flxDropDown.setVisibility(false);
            }
          };
        },
        sortCustomRoles: function(keyForSorting, imgForSorting, otherImages) {
            var scopeObj = this;
            var section = scopeObj.segDataForCustomRoles[0];
            var sectionHeader = section[0];
            var rows = section[1];
            rows.sort(scopeObj.getSortOrder(keyForSorting));
            if (scopeObj.view.TabPane.TabBodyNew[imgForSorting].src === "sorting.png") {
                scopeObj.view.TabPane.TabBodyNew[imgForSorting].src = "sorting_next.png";
            } else if (scopeObj.view.TabPane.TabBodyNew[imgForSorting].src === "sorting_previous.png") {
                scopeObj.view.TabPane.TabBodyNew[imgForSorting].src = "sorting_next.png";
            } else {
                scopeObj.view.TabPane.TabBodyNew[imgForSorting].src = "sorting_previous.png";
                rows.reverse();
            }

            for (var i = 0; i < otherImages.length; i++) {
                scopeObj.view.TabPane.TabBodyNew[otherImages[i]].src = "sorting.png";
            }
            var finalData = [sectionHeader, rows];
            scopeObj.view.TabPane.TabBodyNew.segTemplates.setData([finalData]);
        },
      
        setEntityValidation: function(entityId){
          	var index = applicationManager.getNavigationManager().getCustomInfo("selectedRowIndex");
          var userLegalEntities=JSON.parse(this.usersList[index].userLegalEntities);            
          var isValid=true;
          userLegalEntities.forEach(function(data){
		              if(data===entityId)
							               {
                  isValid = false;
                }
          });
            /*if(this.usersList[index].userLegalEntities.contains(entityId))
              return false;
            else
              return true;*/
          return isValid;
        },
        
      setDataForUserRolesDashboard: function(rolesData) {
            var scopeObj = this;
            var errorMsg = "";
            scopeObj.view.TabPane.TabBodyNew.flxUserRolesHeader.setVisibility(true);
            scopeObj.view.TabPane.TabBodyNew.flxRoleName.onClick = function() {
                scopeObj.sortCustomRoles("lblRoleName", "imgRoleName", ["imgCreatedOn", "imgCreatedBy"]);
            };

            scopeObj.view.TabPane.TabBodyNew.flxCreatedOn.onClick = function() {
                scopeObj.sortCustomRoles("lblCreatedOn", "imgCreatedOn", ["imgRoleName", "imgCreatedBy"]);
            };

            scopeObj.view.TabPane.TabBodyNew.flxCreatedBy.onClick = function() {
                scopeObj.sortCustomRoles("lblCreatedBy", "imgCreatedBy", ["imgRoleName", "imgCreatedOn"]);
            };

            scopeObj.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(false);
            if (rolesData.length !== 0) {
                scopeObj.view.TabPane.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxRoleSectionHeader";
                scopeObj.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxUserRoles";
                scopeObj.view.TabPane.TabBodyNew.setRowDataMap([scopeObj.getDataMapForUserRoles()]);
                scopeObj.view.TabPane.TabBodyNew.setDefaultValues([scopeObj.getDefaultValuesForCustomRoles()]);
                scopeObj.view.TabPane.TabBodyNew.setSectionData(scopeObj.getSectionDataForRoles(rolesData));
                scopeObj.view.TabPane.TabBodyNew.addDataForSections([scopeObj.getRowDataForRoles(rolesData)]);

                scopeObj.segDataForCustomRoles = scopeObj.view.TabPane.TabBodyNew.segTemplates.data;
            } else {
                errorMsg = kony.i18n.getLocalizedString("i18n.konybb.NoCustomRoleFound");
                this.showNoRecords(errorMsg);
            }
            scopeObj.configureSearch("", scopeObj.searchRolesHandler);
            FormControllerUtility.hideProgressBar(scopeObj.view);
            this.footerAlign();
            //scopObj.adjustScreen();
        },
        /**
         * Method to configure  sorting handler  for the list of custom roles
         *  @param {JSON} obj - sorting parameters
         */
        searchRolesHandler: function(obj) {
            var scopeObj = this;
          	if(kony.sdk.isNullOrUndefined(scopeObj.segDataForCustomRoles)){
				return;
			}
            var section = scopeObj.segDataForCustomRoles[0];
            var sectionHeader = section[0];
            var rows = section[1];
            if (obj.searchString !== "") {
                var filteredRows = rows.filter(function(customRoleJson) {
                    return customRoleJson.lblRoleName.toolTip.toLowerCase().includes(obj.searchString.toLowerCase()) || customRoleJson.lblCreatedBy.toLowerCase().includes(obj.searchString.toLowerCase()) ||
                        customRoleJson.lblCreatedOn.includes(obj.searchString);
                });

                if (filteredRows.length === 0) {
                    var errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.noRecords");
                    if (!kony.sdk.isNullOrUndefined(obj.searchString) && obj.searchString !== "") {
                        errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.emptySearchMsg");
                    }
                    this.showNoRecords(errorMsg);
                } else {
                    var finalData = [sectionHeader, filteredRows];
                    scopeObj.view.TabPane.TabBodyNew.segTemplates.setData([finalData]);
                    this.showRolesRecords();
                }
            } else {
                scopeObj.view.TabPane.TabBodyNew.segTemplates.setData([
                    [sectionHeader, rows]
                ]);
                this.showRolesRecords();
            }
        },

        showRolesRecords: function() {
            this.view.TabPane.TabBodyNew.flxNoTransactions.setVisibility(false);
            this.view.TabPane.TabBodyNew.segTemplates.setVisibility(true);
        },

        getSectionDataForRoles: function(roles) {
            return [{
                lblHeader: {
                    "text": kony.i18n.getLocalizedString("konybb.i18n.userMgmt.CustomRoles") + " (" + roles.length + ")"
                },
                lblSeparator: {
                    "text": "-"
                }
            }];
        },
        getRowDataForRoles: function(roles) {
            for (var i = 0; i < roles.length; i++) {
              if(!kony.sdk.isNullOrUndefined(roles[i].createdts)){
                roles[i].createdts = roles[i].createdts.replace(" ", "T");
                roles[i].createdts = roles[i].createdts ? CommonUtilities.getFrontendDateString(roles[i].createdts) : "N/A";
              }
              else{
                roles[i].createdts = "NA";
              }
                roles[i].name = {
                    "text": CommonUtilities.truncateStringWithGivenLength(roles[i].name, 18),
                    "toolTip": roles[i].name
                };
              roles[i].id = {
                    "text": roles[i].id
                };
            }
            return roles;
        },
        /**
         *  Method on click of btnYes of deactivate/activate popup.
         * @param {Object} params -  contains Status and Username
         */
        updateUserStatus: function(params) {
            FormControllerUtility.showProgressBar(this.view);
            this.view.flxPopupConfirmation.setVisibility(false);
            this.loadBusinessBankingModule().presentationController.setUserStatus(params);
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
         *  Method on click of activate/deactivate button.
         * @param {String} status - Status
         * @param {String} userName - username
         */
        onClickOfChangeStatus: function(index,btnName) {
          applicationManager.getConfigurationManager().enableCreateFlag = false ;
            var scopeObj = this;
            this.selectedUserRowIndex = index;
            var status = this.usersList[index].status;
            var userName = this.usersList[index].userName;
            var userId = this.usersList[index].id;
            var legalEntityId= this.usersList[index].legalEntityId;
            var btnChangeStatusText = this.view.TabPane.TabBodyNew.segTemplates.data[index].btnChangeStatus.text;
          var btnManageUsersText = this.view.TabPane.TabBodyNew.segTemplates.data[index].btnManageUsers.text;
          if(btnName === "btnChangeStatus"){
            if (btnChangeStatusText === kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions")) {
              //this.showUserDetails(userName, this.usersList[index].roleId);
              applicationManager.getConfigurationManager().editUser = true;
              FormControllerUtility.showProgressBar(this.view);
              //this.loadBusinessBankingModule().presentationController.viewEditUserPermissions(userId);
              var navManager =  applicationManager.getNavigationManager();
              navManager.setCustomInfo('userId', userId);
              navManager.setCustomInfo('editUserFlow',"editFlow");
              navManager.setCustomInfo('getInfinityUser',"false");
              navManager.setCustomInfo('selectedLegalEntityId',legalEntityId);
              navManager.setCustomInfo('selectedUserStatus',status);
              this.loadBusinessBankingModule().presentationController.getContractDetails(userId);
            }
            else{
              applicationManager.getConfigurationManager().editUser = false;
              this.view.PopupHeaderUM.formActionsNew.btnCancel.onClick = function() {
                scopeObj.view.flxPopupConfirmation.setVisibility(false);
                FormControllerUtility.hideProgressBar(scopeObj.view);
              };
              this.view.PopupHeaderUM.imgClose.onTouchEnd = function() {
                scopeObj.view.flxPopupConfirmation.setVisibility(false);
                FormControllerUtility.hideProgressBar(scopeObj.view);
              };
              var statusName = scopeObj.statusConfig(status.toLowerCase().trim(), true);
              var params = {
                "Status": statusName,
                "UserName": userName
              };
              FormControllerUtility.enableButton(scopeObj.view.PopupHeaderUM.formActionsNew.btnNext);
              this.view.PopupHeaderUM.formActionsNew.btnNext.onClick = this.updateUserStatus.bind(this, params);
              if (status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE").toLowerCase().trim()) {
                this.view.flxPopupConfirmation.setVisibility(true);
                this.view.flxPopupConfirmation.setFocus(true);
                this.view.flxPopupConfirmation.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
                this.view.PopupHeaderUM.lblHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.DeactivateUser");
                this.view.PopupHeaderUM.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.SuspendUserConfirm");
              } else if (status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.konybb.manageUser.Suspend").toLowerCase().trim() || status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.userManagement.suspended").toLowerCase().trim()) {
//                 this.view.flxPopupConfirmation.setVisibility(true);
//                 this.view.flxPopupConfirmation.setFocus(true);
//                 this.view.flxPopupConfirmation.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
//                 this.view.PopupHeaderUM.lblHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.ActivateUser");
//                 this.view.PopupHeaderUM.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.ActivateUserConfirm");
              } else {
                this.view.flxPopupConfirmation.setVisibility(false);
                this.resendActivationLink(userId);
              }
            }
          }
          else{
            if (btnManageUsersText === kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions")) {
              //this.showUserDetails(userName, this.usersList[index].roleId);
              FormControllerUtility.showProgressBar(this.view);
              applicationManager.getConfigurationManager().editUser = false;
              var navManager =  applicationManager.getNavigationManager();
              navManager.setCustomInfo('userId', userId);
              navManager.setCustomInfo('editUserFlow',"editFlow");
              navManager.setCustomInfo('getInfinityUser',"false");
              this.loadBusinessBankingModule().presentationController.viewEditUserPermissions(userId);
              this.loadBusinessBankingModule().presentationController.getContractDetails(userId);
            }
          }
        },
        /**
         * on click of dropdown in segment row
         *  @param {object} userObj - user object
         */
        onUserDropdownClick: function(userObj, eventObject, x, y, context) {
          var scopeObj = this;
          selectedRowIndex=context.rowIndex;
		          applicationManager.getNavigationManager().setCustomInfo("selectedRowIndex",context.rowIndex);
		          this.userObj = context.widgetInfo.data[context.rowIndex].lblUsername.toolTip;//userObj;
          this.selectedUserDetails = {"selectedUserName":scopeObj.usersList[context.rowIndex].name,"selectedUserDob":scopeObj.usersList[context.rowIndex].dob,"SelectedUserEntityId":scopeObj.usersList[context.rowIndex].legalEntityId};
          this.context = context;
          this.loadBusinessBankingModule().presentationController.fetchEmailAndPhone(this.userObj);
        },

					        populateEmailAndPhone : function(){
            var scopeObj = this;
            var userObj = this.userObj;
            var context = this.context;
            var break_point = kony.application.getCurrentBreakpoint();
            var segData = this.view.TabPane.TabBodyNew.segTemplates.data;
            var sectionIndex = context.sectionIndex;
            var rowIndex = context.rowIndex;
            var collapseAll = function(segments) {
                segments.forEach(function(segment, i) {
                    if (segment.template === "flxBBUserBasicDetailsSelected" || segment.template === "flxBBUserBasicDetailsMobileSelected") {
                        if (break_point === 640) {
                            segment.template = "flxBBUserBasicDetailsMobile";
                        } else
                            segment.template = "flxBBUserBasicDetails";
                        segment.lblDropdown = {
                            text: "O",
                            onTouchEnd: scopeObj.onUserDropdownClick.bind(this, userObj)
                        };
                      segment.lblEmailValue = {
                        text: scopeObj.email
                      };

                      segment.lblPhoneNumber = {
                        text: scopeObj.phoneNumber
                      };
                        scopeObj.view.TabPane.TabBodyNew.segTemplates.setDataAt(segment, i, sectionIndex);
                    }
                });
            };
            var prevData = segData[rowIndex].template;
            collapseAll(segData);
            var tempData = scopeObj.view.TabPane.TabBodyNew.segTemplates.data[rowIndex];
            if ((tempData.template === "flxBBUserBasicDetails" && prevData === "flxBBUserBasicDetailsSelected") || (tempData.template === "flxBBUserBasicDetailsMobile" && prevData === "flxBBUserBasicDetailsMobileSelected")) {
                if (break_point === 640) {
                    tempData.template = "flxBBUserBasicDetailsMobile";
                } else
                    tempData.template = "flxBBUserBasicDetails";
                tempData.lblDropdown = {
                    text: "O",
                    onTouchEnd: scopeObj.onUserDropdownClick.bind(this, userObj)
                };
            } else {
                tempData.lblDropdown = {
                    text: "P",
                    onTouchEnd: scopeObj.onUserDropdownClick.bind(this, userObj)
                };
              tempData.lblEmailValue = {
                text: scopeObj.email
              };

              tempData.lblPhoneNumber = {
                text: scopeObj.phoneNumber
              };
                if (break_point === 640) {
                    tempData.template = "flxBBUserBasicDetailsMobileSelected";
                } else
                    tempData.template = "flxBBUserBasicDetailsSelected";
            }
            this.view.TabPane.TabBodyNew.segTemplates.setDataAt(tempData, rowIndex);
            this.footerAlign();
            //this.adjustScreen();
        },
        /**
         *  Method to show error flex.
         * @param {String} response - Response containing Error message and boolean variable to validate whether error flex should be displayed.
         */
        showServerError: function(response) {
            this.view.flxDowntimeWarning.setVisibility(response.show);
            this.view.lblDowntimeWarning.text = response.errorMessage || kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
            this.view.flxMainWrapper.setVisibility(response.show);
            this.footerAlign();
          //this.adjustScreen();
            this.view.flxDowntimeWarning.setFocus(response.show);
        },
        /**
         * AdjustScreen - Method that sets the height of footer properly.
         */
        adjustScreen: function() {
            this.view.forceLayout();
            this.view.flxFooter.isVisible = true;
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            if(this.view.flxHeader.info.frame === undefined){
             mainheight = this.view.flxHeader.frame.height + this.view.flxMain.frame.height;  
            }
            else{
           		 mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
            }
            var diff = screenheight - mainheight;
          if (kony.application.getCurrentBreakpoint() > 640) {
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
          }
            this.view.forceLayout();
        },
      	hidePopups: function() {
            var currFormObj = kony.application.getCurrentForm(); 
            if (currFormObj.customheader.topmenu.flxContextualMenu.isVisible === true) {
                setTimeout(function() {
                    currFormObj.customheader.topmenu.flxContextualMenu.setVisibility(false);
                    currFormObj.customheader.topmenu.imgLblTransfers.text = "O";
                }, "17ms")
            }
        },
        /**
         * Method that updates Hamburger Menu.
         */
        updateHamburgerMenu: function(menuId, subMenuId) {
            this.view.customheader.customhamburger.activateMenu(menuId, subMenuId);
        },
        /**
         * Method to show User Details
         * @param {String} username - contains the username
         */
        showUserDetails: function(username, rolename) {
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.fetchUserDetails(username, rolename, this.loadBusinessBankingModule().presentationController.fetchUserDetailsCompletionCallback.bind(this.loadBusinessBankingModule().presentationController),
                this.loadBusinessBankingModule().presentationController.fetchUserDetailsFailure.bind(this.loadBusinessBankingModule().presentationController), "frmUserManagement");
        },
        /**
         * Method to Resend Activation link
         * @param {String} username - contains the username
         */
        resendActivationLink: function(username) {
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.resendActivationCode(username);
        },
        /**
         * Method to show manage user flex.
         * @param {Object} userDetails - contains the user details
         */
        showManageUser: function(userDetails) {
            this.populateUserDetails(userDetails);
            this.view.flxAcknowledgement.isVisible = false;
            if (applicationManager.getUserPreferencesManager().getCurrentUserName() !== userDetails.Username) {
                this.showActivateButton(userDetails.Status, userDetails.Username);
                this.view.btnEdit.isVisible = true;
                this.view.btnEditUserRoles.isVisible = true;
                this.view.btnEditUserPermissions.isVisible = true;
            } else {
                this.view.btnAddAnother.isVisible = false;
                this.view.btnEdit.isVisible = false;
                this.view.btnEditUserRoles.isVisible = false;
                this.view.btnEditUserPermissions.isVisible = false;
            }
            this.view.btnViewAllUsers.text = kony.i18n.getLocalizedString("i18n.userManagement.BackToAllUsers");
            this.view.btnViewAllUsers.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.BackToAllUsers");
            this.view.lblStatusKey.isVisible = true;
            this.view.flxStatusValue.isVisible = true;
            this.view.lblStatusKeyValue.text = this.statusConfig(userDetails.Status, false);
            this.view.lblUserStatusIndicator.skin = this.setStatusImageConfig(userDetails.Status, true);
            this.adjustScreen();
        },
        /**
         * Method to manipulate text and click functionality of button btnAddAnother
         * @param {String} status - contains the status
         * @param {String} username - contains the username
         */
        showActivateButton: function(status, username) {
            this.view.btnAddAnother.isVisible = true;
            var scopeObj = this;
            if (status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE").toLowerCase().trim()) {
                this.view.btnAddAnother.text = kony.i18n.getLocalizedString("i18n.userManagement.DeactivateUser");
                this.view.btnAddAnother.onClick = this.updateUserStatus.bind(this, {
                    "UserName": username,
                    "Status": scopeObj.statusConfig(status.toLowerCase().trim(), true)
                });
                this.view.btnAddAnother.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.DeactivateUser");
            } else if (status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.konybb.manageUser.Suspend").toLowerCase().trim() || status.toLowerCase().trim() === kony.i18n.getLocalizedString("i18n.userManagement.suspended").toLowerCase().trim()) {
                this.view.btnAddAnother.text = kony.i18n.getLocalizedString("i18n.userManagement.ActivateUser");
                this.view.btnAddAnother.onClick = this.updateUserStatus.bind(this, {
                    "UserName": username,
                    "Status": scopeObj.statusConfig(status.toLowerCase().trim(), true)
                });
                this.view.btnAddAnother.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.ActivateUser");
            } else {
                this.view.btnAddAnother.text = kony.i18n.getLocalizedString("i18n.userManagement.resendLink");
                this.view.btnAddAnother.onClick = this.resendActivationLink.bind(this, username);
                this.view.btnAddAnother.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.resendLink");
            }
        },
        /**
         * Method to show manage user flex.
         * @param {Object} userDetails - contains the user details
         * @param {String} referenceNumber - contains the reference Number
         */
        showAcknowledgement: function(userDetails, referenceNumber) {
            this.populateUserDetails(userDetails);
            if (CommonUtilities.isPrintEnabled()) {
                this.view.flxAcknowledgementNew1.flxImgPrint.setVisibility(true);
                this.view.flxAcknowledgementNew1.flxImgPrint.onClick = this.printAcknowledgement.bind(this);
            } else {
                this.view.flxAcknowledgementNew1.flxImgPrint.setVisibility(false);
            }
            this.view.flxAcknowledgement.isVisible = true;
            var ackMsg = "";
            if (referenceNumber !== undefined && referenceNumber !== null && referenceNumber !== "") {
                ackMsg = kony.i18n.getLocalizedString("i18n.konybb.manageUser.UserAddedSuccess") + "\n" + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + " " + referenceNumber;
            } else {
                ackMsg = kony.i18n.getLocalizedString("i18n.konybb.manageUser.UserUpdatedSuccess") + "\n" + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + " " + userDetails.id;
            }
            this.view.flxAcknowledgementNew1.rTextSuccess.text = ackMsg;
            this.view.btnEdit.isVisible = false;
            this.view.btnEditUserRoles.isVisible = false;
            this.view.btnEditUserPermissions.isVisible = false;
            this.view.btnAddAnother.isVisible = true;
            this.view.btnAddAnother.text = kony.i18n.getLocalizedString("i18n.userManagement.AddAnotherUser");
            var self = this;
            this.view.btnAddAnother.onClick = function() {
                self.loadBusinessBankingModule().presentationController.showCreateUser();
            };
            this.view.btnViewAllUsers.text = kony.i18n.getLocalizedString("i18n.userManagement.ViewAllUsers");
            this.view.btnViewAllUsers.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.ViewAllUsers");
            this.view.lblStatusKey.isVisible = false;
            this.view.flxStatusValue.isVisible = false;
            this.adjustScreen();
        },
        showAcknowledgementManageUser: function() {
            //this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
          	this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
        },
        /**
         * Method to populate User details
         * @param {Object} userDetails - contains the user details
         */
        populateUserDetails: function(userDetails) {
            this.view.flxContent.isVisible = false;
            this.view.flxContentDetails.isVisible = true;
            if (userDetails.MiddleName === undefined) {
                userDetails.MiddleName = "";
            }
            this.view.lblFullNameValue.text = CommonUtilities.getFullName(userDetails.FirstName, userDetails.MiddleName, userDetails.LastName);
            this.view.lblEmailIdValue.text = userDetails.Email;
            this.view.lblDateOfBirthValue.text = CommonUtilities.getFrontendDateString(userDetails.DateOfBirth);
            this.view.lblSSNValue.text = userDetails.Ssn;
            this.view.lblDriverLicenseValue.text = userDetails.DrivingLicenseNumber || "--";
            this.view.lblPhoneNumberValue.text = userDetails.Phone;
            this.view.lblUserNameValue.text = userDetails.Username || userDetails.UserName;
            this.view.lblSelectedRole.text = userDetails.Group_Name;
            this.view.RichTextSelectedRole.text = userDetails.Group_Description;
            var self = this;
            var hasAccounts = false;
            var hasServices = false;
            var segData;
            //Resetting User Persmissions flexes
            this.view.flxNoAccountAccessUsers.isVisible = false;
            this.view.flxAccountsAndPermissons.isVisible = false;
            this.view.imgDropDownAccount.src = ViewConstants.IMAGES.BUTTON_DOWN;
            this.view.flxTransferPermissions.isVisible = false;
            this.view.flxNoPermissionsUsers.isVisible = false;
            this.view.imgDropDownTransaction.src = ViewConstants.IMAGES.BUTTON_DOWN;
            if (userDetails.accounts[0].hasOwnProperty("AccountName") || userDetails.accounts[0].hasOwnProperty("Account_Name")) {
                segData = userDetails.accounts.map(function(dataItem) {
                    var data = {
                        "lblGeneralAccountName": (dataItem.AccountName || dataItem.Account_Name) + "-X" + CommonUtilities.getLastFourDigit(dataItem.Account_id || dataItem.id) //need to update object pro
                    }
                    return data;
                });
                this.view.segAccountPermissions.setData(segData);
                hasAccounts = true;
            } else {
                this.view.segAccountPermissions.setData([{}]);
                hasAccounts = false;
            }
            this.view.flxDropDownAccount.onClick = function() {
                if (self.view.flxAccountsAndPermissons.isVisible) {
                    self.view.flxNoAccountAccessUsers.isVisible = false;
                    self.view.flxAccountsAndPermissons.isVisible = false;
                    self.view.imgDropDownAccount.src = ViewConstants.IMAGES.BUTTON_DOWN;
                } else {
                    if (hasAccounts)
                        self.view.flxNoAccountAccessUsers.isVisible = false;
                    else
                        self.view.flxNoAccountAccessUsers.isVisible = true;
                    self.view.flxAccountsAndPermissons.isVisible = true;
                    self.view.imgDropDownAccount.src = ViewConstants.IMAGES.BUTTON_UP;
                }
                self.adjustScreen();
            }
            if (userDetails.services === null) {
                hasServices = false;
                this.view.segTransferLimits.setData([{}]);
            } else if (userDetails.services.length === 0) {
                hasServices = false;
                this.view.segTransferLimits.setData([{}]);
            } else {
                hasServices = true;
                var segData = userDetails.services.map(function(dataItem) {
                    var data = {
                        "lblTransferType": dataItem.Name,
                        "lblMaxTransactionLimit": kony.i18n.getLocalizedString("i18n.konybb.createUser.MaxTransactionLimit"),
                        "lblMaxDailyLimit": kony.i18n.getLocalizedString("i18n.konybb.createUser.MaxDailyLimit"),
                        "lblMaxTransactionLimitValue": CommonUtilities.formatCurrencyWithCommas(dataItem.MaxTransactionLimit),
                        "lblMaxDailyLimitValue": CommonUtilities.formatCurrencyWithCommas(dataItem.MaxDailyLimit)
                    }
                    return data;
                });
                this.view.segTransferLimits.setData(segData);
            }
            this.view.flxDropDownTransaction.onClick = function() {
                if (self.view.flxTransferPermissions.isVisible) {
                    self.view.flxTransferPermissions.isVisible = false;
                    self.view.flxNoPermissionsUsers.isVisible = false;
                    self.view.imgDropDownTransaction.src = ViewConstants.IMAGES.BUTTON_DOWN;
                } else {
                    if (hasServices)
                        self.view.flxNoPermissionsUsers.isVisible = false;
                    else
                        self.view.flxNoPermissionsUsers.isVisible = true;
                    self.view.flxTransferPermissions.isVisible = true;
                    self.view.imgDropDownTransaction.src = ViewConstants.IMAGES.BUTTON_UP;
                };
                self.adjustScreen();
            }
            this.view.customheader.imgKony.setFocus(true);
        },
        /**
         * Method to switch to users dashboard UI
         */
        showDashboardUI: function() {
            this.resetUI();
            this.view.TabPane.TabSearchBarNew.flxSearch.setVisibility(true);
            this.view.TabPane.TabBodyNew.segTemplates.setVisibility(true);
            this.view.TabPane.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("kony.userMgmt.SearchUserByNameUserId");
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(false);
            } else
                this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(true);
            this.view.flxContent.setVisibility(true);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.UserManagement");
        },
        /**
         * Method to populate the Segment with user-list
         *  @param {object} context - which consists of list of users, context
         *  Searching|Sorting
         */
        setUsersDataToDashboard: function(context) {
            var scopeObj = this;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.setVisibility(true);
          if( ! kony.sdk.isNullOrUndefined(context) && Array.isArray(context)){
            if (context.length === 0) {
                var errorMsg =  kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.noRecords");
                if(! kony.sdk.isNullOrUndefined(this.searchString) && this.searchString !== "" ){
                   errorMsg = kony.i18n.getLocalizedString("i18n.NotificationsAndMessages.emptySearchMsg");
                }
                this.showNoRecords(errorMsg);
            }
            else if(context.length > 0){
              this.showDashboardUI();
              this.setDataForAllUsersDashboard();
              var segData = context.map(function (dataItem, index) {
                var lblUserStatusValue = "N/A";
                var statusIndicatorForSkin = scopeObj.setStatusImageConfig("",true);
                var statusIndicatorForText = scopeObj.setStatusImageConfig("",false);
                if(!kony.sdk.isNullOrUndefined(dataItem.status)) {
                  lblUserStatusValue = scopeObj.statusConfig(dataItem.status,false);
                  statusIndicatorForSkin = scopeObj.setStatusImageConfig(dataItem.status,true);
                  if(dataItem.userName !== applicationManager.getUserPreferencesManager().getCurrentUserName() && applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_ACTIVATE_OR_SUSPEND")){
                    statusIndicatorForText = scopeObj.setStatusImageConfig(dataItem.status,false);
                  }
                  else{
                    statusIndicatorForText = kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions");
                  }
                }
                var isBtnChangeStatusVisible = (dataItem.userName !== applicationManager.getUserPreferencesManager().getCurrentUserName() 
                                                && applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_ACTIVATE_OR_SUSPEND") )
                								|| (applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT"));
                var userFirstName = dataItem.name;
                if(dataItem.userName === applicationManager.getUserPreferencesManager().getCurrentUserName()){
                  userFirstName = userFirstName + " " + kony.i18n.getLocalizedString("konybb.i18n.userMgmt.loggedInUserTitle");
                        }
                var btnAddEntityVisibility=function(){
                  var flag=true;
                  var legalEntities = applicationManager.getNavigationManager().getCustomInfo("legalEntityList");
                  
                  //adding the below condition for AAC-14432
                 if(applicationManager.getConfigurationManager().checkUserPermission("ADD_USER_ANOTHER_ENTITY") === true)
                   {
                     flag = true;
                   }
                  else if(applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") === true){
                    flag = false;
                  }
                  else if(legalEntities){
                    if(legalEntities.length <=1){
                      flag = false;
                    }
                  }
                  return flag;
                };
                        var data = {
                            "flxUserCommonRowDetails": "flxUserCommonRowDetails",
                            "btnManageUsers": {
                                onClick: scopeObj.onClickOfChangeStatus.bind(scopeObj, index,"btnManageUsers"),//scopeObj.showUserDetails.bind(scopeObj, dataItem.userName, dataItem.roleId),
                                text:kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions"), //applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_EDIT") ? kony.i18n.getLocalizedString("i18n.konybb.manageUser.manageUsers") : kony.i18n.getLocalizedString("i18n.customRoles.ViewPermissions"),
                                isVisible: (dataItem.userName !== applicationManager.getUserPreferencesManager().getCurrentUserName()) && dataItem.status === "NEW"
                                //isVisible: true
                            },
                            "flxMain": "flxMain",
                            "flxDropDown": "flxDropDown",
                            "lblDropdown": {
                                text: "O",
                                onTouchEnd: scopeObj.onUserDropdownClick.bind(this, dataItem)
                            },
                            "flxDetailsHighlighter": "flxDetailsHighlighter",
                            "flxDetails": "flxDetails",
                            "imgSample": "imgSample",
                            "flxSeparatorForHeader": "flxSeparatorForHeader",
                            "imgSeparatorHeader": "imgSeparatorHeader",
                            "lblRoleTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.userManagement.userRole"),
                                isVisible: false
                            },
                            "lblPhoneNumberTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo"),
                            },
                            "lblLastSignedInTitle": {
                              /*onTouchEnd : function(){
                                  scopeObj.view.flxLegalEntityPopup.setVisibility(true);
                                scopeObj.view.AddToOtherEntity.btnContinue.setEnabled(false);
                                },*/
                                "text": kony.i18n.getLocalizedString("i18n.konybb.manageUser.LastSignedIn"),
                            },
                            "lblUserNameTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.Common.UserName"),
                            },
                            "lblEmailTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.manageUser.EmailID"),
                            },
                            "flxActions": "flxActions",
                            "flxManageUsers": "flxManageUsers",
                            "flxViewUserDetails": "flxViewUserDetails",
                            "btnViewDetails": {
                                "text": kony.i18n.getLocalizedString("i18n.konybb.common.ViewUserDetails"),
                                onClick: scopeObj.showUserDetails.bind(this, dataItem.userName, dataItem.roleId),
                            },
                            "flxBottomSeperatorEnd": "flxBottomSeperatorEnd",
                            "imgBottomSeperatorEnd": "imgBottomSeperatorEnd",
                            "lblEmailValue": {
                                "text": dataItem.email ? dataItem.email : "",
                            },
                            "lblLastSignedIn": {
                                "text": dataItem.lastSignedIn ? CommonUtilities.getFrontendDateString(dataItem.lastSignedIn) : "N/A",
                            },
                            "lblUserName": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.id, 15),
                                "toolTip": dataItem.id,
                            },
                            "lblLastSignIn": {
                                "text": dataItem.lastSignedIn ? CommonUtilities.getFrontendDateString(dataItem.lastSignedIn) : "N/A",
                            },
                            "lblPhoneNumber": {
                                "text": dataItem.phoneNumber ? dataItem.phoneNumber : "",
                            },
                          "btnAddEntity": {
                                isVisible: btnAddEntityVisibility(),
                                onClick: function(){
                              scopeObj.view.flxLegalEntityPopup.setVisibility(true);
                              scopeObj.view.AddToOtherEntity.btnContinue.setEnabled(false);
                              scopeObj.view.AddToOtherEntity.btnContinue.skin = "sknBtnBlockedSSP0273e315px";
                              scopeObj.view.AddToOtherEntity.lblSelectedEntity.text="Select";
                                }
                             },
                            "lblName": {
                                "text": CommonUtilities.truncateStringWithGivenLength(userFirstName, 15),
                                "toolTip": userFirstName,
                            },
                            "lblUsernameValue": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.userName, 25),
                                "toolTip": dataItem.userName,
                            },
                            //"template":"flxBBUserBasicDetails",
                            "lblRole": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.roleId, 15),
                                "toolTip": dataItem.roleId ? dataItem.roleId : "",
                              	isVisible:true
                            },
                            "lblUsername": {
                                "text": CommonUtilities.truncateStringWithGivenLength(dataItem.id, 15),
                                "toolTip": dataItem.id,
                            },
                            "flxUserStatusIcon": "flxUserStatusIcon",
                            "lblUserStatus": {
                                "text": lblUserStatusValue,
                              	isVisible:true
                            },
                            "btnChangeStatus": {
                                onClick: scopeObj.onClickOfChangeStatus.bind(this, index,"btnChangeStatus"),
                                "text": statusIndicatorForText,
                                isVisible: isBtnChangeStatusVisible
                            },
                            "lblUserStatusIndicator": {
                                isVisible:true,
                                skin: statusIndicatorForSkin
                            },
                        };
                        return data;
                    });
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetailsMobile";
                        this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(false);
                        this.view.customheader.flxSeperatorHor2.setVisibility(false);
                    } else {
                        this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetails";
                        this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.setVisibility(true);
                        this.view.customheader.flxSeperatorHor2.setVisibility(true);
                    }
                    this.view.TabPane.TabBodyNew.segTemplates.setData(segData);
                    FormControllerUtility.setSortingHandlers(this.usersSortMap, this.sortUsersHandler, this);
                    FormControllerUtility.updateSortFlex(this.usersSortMap, this.sortConfig);
                }
            }
            this.view.TabPane.TabBodyNew.flxUserRolesHeader.setVisibility(false);
            this.view.TabPane.TabsHeaderNew.focusTab(1);
            this.updateHamburgerMenu("User Management", "All Users");
            this.configureSearch(this.searchString, this.searchUsersHandler);
            this.footerAlign();
          //this.adjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Method to configure  sorting handler  for the list of users
         *  @param {JSON} obj - sorting parameters
         */
        searchUsersHandler: function(obj) {
            //this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), obj);
          	this.searchString = obj.searchString;
          	var searchData = [];
            var emptyArray = [];
            if (this.searchString != null && this.searchString != "") {
            	searchData = CommonUtilities.sortAndSearchJSON(this.filterData,null,null,"name,userName",this.searchString);
            	if(searchData!= -1){
              		this.setUsersDataToDashboard(searchData);
            	}
            	else{
              		this.setUsersDataToDashboard(emptyArray);
            	}
          	}
          	else{
            	this.setUsersDataToDashboard(this.filterData);
          	}
        },
        /**
         * Method to configure  sorting handler  for the list of users
         * @param {EventObject} event - event
         *  @param {JSON} obj - sorting parameters
         */
        sortUsersHandler: function(event, obj) {
            //this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), obj);
          var sortBy = obj.sortBy;
          this.sortConfig = {};
          this.sortConfig.sortBy = sortBy;
          this.sortConfig.offset = OLBConstants.DEFAULT_OFFSET;
          this.sortConfig.paginationRowLimit = OLBConstants.PAGING_ROWS_LIMIT;
          var sortData = {};
          if (sortBy === "FullName") {
            if (this.view.TabPane.TabBodyNew.imgName.src === OLBConstants.IMAGES.SORTING || this.view.TabPane.TabBodyNew.imgName.src === OLBConstants.IMAGES.SORTING_NEXT) {
                this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "name", "ASC", "name,id", this.searchString);
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "name", "ASC", null, null);
                }
            } else if (this.view.TabPane.TabBodyNew.imgName.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "name", "DESC", "name,id", this.searchString)
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "name", "DESC", null, null);
                }
            } else {
                this.view.TabPane.TabBodyNew.imgName.src = OLBConstants.IMAGES.SORTING;
                sortData = this.filterData;
            }
          } else if (sortBy === "Role") {
            if (this.view.TabPane.TabBodyNew.imgRole.src === OLBConstants.IMAGES.SORTING || this.view.TabPane.TabBodyNew.imgRole.src === OLBConstants.IMAGES.SORTING_NEXT) {
                this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "roleId", "ASC", "name,id", this.searchString);
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "roleId", "ASC", null, null);
                }
            } else if (this.view.TabPane.TabBodyNew.imgRole.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "roleId", "DESC", "name,id", this.searchString)
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "roleId", "DESC", null, null);
                }
            } else {
                this.view.TabPane.TabBodyNew.imgName.src = OLBConstants.IMAGES.SORTING;
                sortData = this.filterData;
            }
          } else if (sortBy === "Status") {
            if (this.view.TabPane.TabBodyNew.imgStatus.src === OLBConstants.IMAGES.SORTING || this.view.TabPane.TabBodyNew.imgStatus.src === OLBConstants.IMAGES.SORTING_NEXT) {
                this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "status", "ASC", "name,id", this.searchString);
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "status", "ASC", null, null);
                }
            } else if (this.view.TabPane.TabBodyNew.imgStatus.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                if (this.searchString != null && this.searchString !== "") {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "status", "DESC", "name,id", this.searchString)
                } else {
                    sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "status", "DESC", null, null);
                }
            } else {
                this.view.TabPane.TabBodyNew.imgName.src = OLBConstants.IMAGES.SORTING;
                sortData = this.filterData;
            }
          }
          else if(sortBy === "UserId"){
            if (this.view.TabPane.TabBodyNew.imgUsername.src === OLBConstants.IMAGES.SORTING) {
              this.sortConfig.order = OLBConstants.ASCENDING_KEY;
              if(this.searchString != null && this.searchString !== ""){
                sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "id", "ASC", "name,id", this.searchString);
              }
              else{
                sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "id", "ASC", null, null);
              }
            } 
            else if (this.view.TabPane.TabBodyNew.imgUsername.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
              this.sortConfig.order = OLBConstants.DESCENDING_KEY;
              if(this.searchString != null && this.searchString !== ""){
                sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "id", "DESC", "name,id", this.searchString)
              }
              else{
                sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "id", "DESC", null, null);
              }
            } 
            else {
              this.view.TabPane.TabBodyNew.imgUsername.src = OLBConstants.IMAGES.SORTING;
              sortData = this.filterData;
            }
          }
          this.sortConfig.limit = sortData.length;
          this.setUsersDataToDashboard(sortData);
        },
        /**
         * Method to configure search logic  for the list of users
         *  @param {String} searchText - search String
         *  @param {Method} onSearch - callback
         */
        configureSearch: function(searchText, onSearch) {
            this.view.TabPane.TabSearchBarNew.flxSearch.setVisibility(true);
            this.view.TabPane.TabSearchBarNew.tbxSearch.text = searchText || "";
            this.checkSearchForm();
            this.view.TabPane.TabSearchBarNew.tbxSearch.onDone = function() {
                onSearch({
                    searchString: this.view.TabPane.TabSearchBarNew.tbxSearch.text.trim()
                });
                this.checkSearchForm();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.flxSearchimg.onClick = function() {
                onSearch({
                    searchString: this.view.TabPane.TabSearchBarNew.tbxSearch.text.trim()
                });
                this.checkSearchForm();
            }.bind(this);
            this.view.TabPane.TabSearchBarNew.flxClose.onClick = function() {
                onSearch({
                    searchString: ""
                });
                this.view.TabPane.TabSearchBarNew.tbxSearch.text = "";
                this.checkSearchForm();
            }.bind(this)
        },
        /**
         * Method to check whether the user typed anything in the search bar and making the UI compatible according to the actions of the user
         */
        checkSearchForm: function() {
            if (this.view.TabPane.TabSearchBarNew.tbxSearch.text.trim() === "") {
                this.view.TabPane.TabSearchBarNew.flxClose.height = "0dp";
            } else {
                this.view.TabPane.TabSearchBarNew.flxClose.height = "40dp";
            }
            this.view.TabPane.TabSearchBarNew.forceLayout();
        },
        orientationHandler: null,
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            var scope = this;
            this.seti18nValues();
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, kony.application.getCurrentBreakpoint());
            if (this.orientationHandler === null) {
                this.orientationHandler = new OrientationHandler();
            }
            this.orientationHandler.onOrientationChange(this.onBreakpointChange);
            this.view.customheader.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
            this.view.customfooter.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
            //var responsiveFonts = new ResponsiveFonts();
            if (width === 640 || this.orientationHandler.isMobile) {
                //this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
                this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetailsMobile";
                //this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(250);
                this.view.PopupHeaderUM.lblHeader.skin = "bbSknLbl424242SSP15Px";
                this.view.PopupHeaderUM.lblPopupMsg.skin = "bbSknLbl424242SSP15Px";
                this.view.PopupHeaderUM.imgClose.src = "icon_close_grey.png";
                this.view.customheader.lblHeaderMobile.isVisible = true;
                //responsiveFonts.setMobileFonts();
            } else {
                //this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBUserDashboardCommonHeader";
                if (this.focusedTabId && this.focusedTabId == 1)
                    this.view.TabPane.TabBodyNew.segTemplates.rowTemplate = "flxBBUserBasicDetails";
                this.view.TabPane.TabBodyNew.flxBBUsersDashboardHeader.skin = "sknFlxBgfbfbfbBor1pxTBe3e3e3";
                this.view.TabPane.TabBodyNew.flxUserRolesHeader.skin = "sknFlxf9f9f9Bordere3e3e32px";
                this.view.customheader.lblHeaderMobile.isVisible = false;
                this.view.customheader.lblHeaderMobile.text = "";
                //responsiveFonts.setDesktopFonts();
            }
            //this.adjustScreen();
            const configManager = applicationManager.getConfigurationManager();
            const isCampaignMAPresent = configManager.isMicroAppPresent('CampaignMA');
            if (isCampaignMAPresent) {
            	this.loadBusinessBankingModule().presentationController.getBBCampaigns();
            }
            if (kony.application.getCurrentBreakpoint() <= 1024 || this.orientationHandler.isTablet) {
                //this.view.customfooter.lblCopyright.width = "22%";
//                 this.view.customfooter.flxFooterMenu.left = "2.5%";
//                 this.view.customfooter.flxFooterMenu.width = "40%";
              this.view.customheader.topmenu.btnHamburger.left = "14dp";
              this.view.customheader.flxImgKony.left = "-5dp";
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    this.view.customfooter.lblCopyright.left = "20.5%";
                } 
//               else {
//                     //this.view.customfooter.lblCopyright.left = "21.5%";
//                 }
            } 
            else if (kony.application.getCurrentBreakpoint() > 1024) {
                if (kony.i18n.getCurrentLocale() === "ar_AE") {
                    if (kony.application.getCurrentBreakpoint() <= 1366 && kony.application.getCurrentBreakpoint() > 1024) {
                        this.view.customfooter.lblCopyright.left = "9.5%";
                        this.view.customfooter.flxFooterMenu.left = "10%";
                        this.view.customfooter.lblCopyright.width = "21%";
                    } else {
                        this.view.customfooter.lblCopyright.left = "6%";
                        this.view.customfooter.flxFooterMenu.left = "6%";
                    }
                } else {
                    this.view.customfooter.flxFooterMenu.width = "40%"
                    if (kony.application.getCurrentBreakpoint() <= 1366 && kony.application.getCurrentBreakpoint() > 1024) {
                        this.view.customfooter.lblCopyright.left = "10%";
                        this.view.customfooter.flxFooterMenu.left = "10%";
                    } else {
                        this.view.customfooter.lblCopyright.left = "6%";
                        this.view.customfooter.flxFooterMenu.left = "6%";
                    }
                }
            }  
          if (kony.application.getCurrentBreakpoint() > 1380) {
                this.view.dbRightContainerNew.width = "34.3%";
                this.view.customheader.imgKony.left = "5dp";
                this.view.AddToOtherEntity.flxOptionsNext.height = "80dp";
                this.view.AddToOtherEntity.btnCancelSelection.left = "32%";
                this.view.AddToOtherEntity.btnCancelSelection.right = "190dp";                    
                this.view.AddToOtherEntity.btnContinue.left = "66%";
                this.view.AddToOtherEntity.btnContinue.right = "20dp";
                this.view.AddToOtherEntity.imgClosePopup.right = "20dp";
            }
          this.view.forceLayout();
        },

        printAcknowledgement: function() {
            var tableList = [{
                    tableHeader: kony.i18n.getLocalizedString("i18n.userManagement.userInfo"),
                    tableRows: this.getUserData()
                },
                {
                    tableHeader: kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                    tableRows: this.getUserPermissions()
                }
            ];
            if (this.view.segTransferLimits.data.length > 1) {
                tableList.push({
                    tableHeader: kony.i18n.getLocalizedString("i18n.userManagement.transPermission"),
                    tableRows: this.getTransactionsAccess()
                });
            }
            var viewModel = {
                moduleHeader: this.view.lblContentHeader.text,
                tableList: tableList
            };
            this.loadBusinessBankingModule().presentationController.showPrintPage({
                printKeyValueGroupModel: viewModel
            });
        },
        getUserData: function() {
            var self = this;
            var userData = [];
            userData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: self.view.flxAcknowledgementNew1.rTextSuccess.text,
            });
            userData.push({
                key: self.view.lblFullNameKey.text,
                value: self.view.lblFullNameValue.text
            })
            userData.push({
                key: self.view.lblDriverLicenseKey.text,
                value: self.view.lblDriverLicenseValue.text
            })
            userData.push({
                key: self.view.lblEmailIdKey.text,
                value: self.view.lblEmailIdValue.text
            })
            userData.push({
                key: self.view.lblPhoneNumberKey.text,
                value: self.view.lblPhoneNumberValue.text,
            })
            userData.push({
                key: self.view.lblDateOfBirthKey.text,
                value: self.view.lblDateOfBirthValue.text
            })
            userData.push({
                key: self.view.lblUserNameKey.text,
                value: self.view.lblUserNameValue.text
            })
            userData.push({
                key: self.view.lblSSNKey.text,
                value: self.view.lblSSNValue.text,
            })
            userData.push({
                key: kony.i18n.getLocalizedString("i18n.konybb.manageUser.UserRoles"),
                value: self.view.lblSelectedRole.text
            })
            userData.push({
                key: " ",
                value: self.view.RichTextSelectedRole.text
            })
            return userData
        },
        getUserPermissions: function() {
            var accounts = [];
            var data = this.view.segAccountPermissions.data;
            if (data) {
                data.forEach(function(item) {
                    accounts.push({
                        key: kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                        value: item.lblGeneralAccountName
                    });
                });
            }
            return accounts;
        },
        getTransactionsAccess: function() {
            var transactionsAccess = [];
            var data = this.view.segTransferLimits.data;
            if (data) {
                data.forEach(function(item) {
                    transactionsAccess.push({
                        key: item.lblTransferType,
                        value: item.lblMaxDailyLimit + " - " + item.lblMaxDailyLimitValue + "\n" + item.lblMaxTransactionLimit + " - " + item.lblMaxTransactionLimitValue
                    });
            });
        }
        return transactionsAccess;
   },
    showAcknowledgementScreenOnPrintCancel : function(){
         this.view.flxAcknowledgement.setVisibility(true);
         if (CommonUtilities.isPrintEnabled()) {
            this.view.flxAcknowledgementNew1.flxImgPrint.setVisibility(true);
          } else {
            this.view.flxAcknowledgementNew1.flxImgPrint.setVisibility(false);
          }
    },
      
      setContractData : function(response){
        this.custRoleData = response;
        var custRoleNames = [];
        var userName;
        var createdts;
        response.companyList.forEach(function(item){
//           if(!kony.sdk.isNullOrUndefined(item.customRoles[0].userName)){
//             userName = item.customRoles[0].createdby;
//           }
//           else{
//             userName = "NA";
//           }
//           custRoleNames.push({
//             "name" : item.customRoles[0].customRoleName,
//             "userName" : userName
//           });
          item.customRoles.forEach(function(data){
            if(!kony.sdk.isNullOrUndefined(data.createdby)){
              userName = item.customRoles[0].createdby;
            }
            else{
              userName = "NA";
            }
            if(!kony.sdk.isNullOrUndefined(data.createdts)){
              createdts = data.createdts;
            }
            else{
              createdts = "NA";
            }
            custRoleNames.push({
              "name" : data.customRoleName,
              "id" : data.id,
              "userName" : userName,
              "createdts" : createdts
            });

          });
        });
        var custRoleNamesWithoutDuplicates = [];
		var obj = {};
        for ( var i=0, len=custRoleNames.length; i < len; i++ ){
          obj[custRoleNames[i]['id']] = custRoleNames[i];
        }

        for ( var key in obj ){
          custRoleNamesWithoutDuplicates.push(obj[key]);
        }
        this.setDataForUserRolesDashboard(custRoleNamesWithoutDuplicates);
      },
      
      setDropdownVisiblility: function() {
        if (this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin=false;
          return;
        }

        if (!this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.setVisibility(true);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setVisibility(true);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxCurrencyHeader.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxSeperatorCurrency.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxApprovalTypeSeparator.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "arrowup_sm.png";
          if (this.focusedTabId && this.focusedTabId == 1){
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblAllValue.text = kony.i18n.getLocalizedString("i18n.userManagement.allUsers");
          }else{
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.lblAllValue.text = kony.i18n.getLocalizedString("i18n.userManagement.allUserRoles");
          }
          this.setFilterSegmentRowData();
          //this.setDropdownData();
        }
        else{
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setVisibility(false);
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "arrowdown_sm.png";
        }
		      this.footerAlign();
        //this.adjustScreen(1500);
      },
      
      setDropdownData : function(){
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.sectionHeaderTemplate = "flxHeaderTitle";
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.rowTemplate = "flxTimePeriodMain";
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxApproveType.flxCurrencyBody.segCurrency.widgetDataMap = this.dropdownDataMap();
        if(this.focusedTabId === 1){
          this.addOnlyContractSectionHeaders(this.setFilterSegmentHeaderData());
        }else{
          this.addOnlySectionHeaders(this.getSectionHeadersMonetaryFeaturesReadOnly()); 
        }
      },
      
      dropdownDataMap : function(){
        var obj = {};
        obj["flxHeaderTitle"] = "flxHeaderTitle",
          obj["lblHedaerContent"] = "lblHedaerContent",
          obj["flxTimePeriodMain"] = "flxTimePeriodMain",
          obj["flxFeatureRow"] = "flxFeatureRow",
          obj["lblCheckFeature"] = "lblCheckFeature",
          obj["lblFeatureName"] = "lblFeatureName",
          obj["lblDummy"] = "lblDummy"
        return obj;
      },
      
      getSectionHeadersMonetaryFeaturesReadOnly: function() {
        var custData = this.custRoleData;
        //var count = data.records;
        var headerKeys = [];
        //var other = "Other";
        custData.companyList.forEach(function(item){
          if(!headerKeys.includes(item.contractName))
            headerKeys.push(item.contractName);
        });
        var res = [];
        var template;
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          //template = "flxAccountSelectionMobile";
        } else {
          template = "flxHeaderTitle";
        }
        headerKeys.forEach(function(element) {
          res.push({
            "lblHedaerContent": {
              text: element,
            },
            "template": template
          });
        });

        return res;
      },

      addOnlySectionHeaders: function(sectionData) {
        var segData = [];
        for (var i = 0; i < sectionData.length; i++) {
          segData.push([
            sectionData[i],
            []
          ]);
        }
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
        for (var y = 0; y < sectionData.length; y++) {
          this.addRowsAndUpdateSection(this.getSectionHeadersMonetaryFeaturesReadOnlyValues(y), y);
        }
      },
      
     getSectionHeadersMonetaryFeaturesReadOnlyValues: function(index, tabName) {
            var scopeObj = this;
            var custData = this.custRoleData;
            var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
            var custRoles = [];
            var reqHeader = segData[index][0].lblHedaerContent.text;
            var countVal;
            custData.companyList.forEach(function(item) {
                if (reqHeader === item.contractName) {
                    //item.customRoles.forEach(function(data){
            if(!custRoles.includes(item.coreCustomerName))
              custRoles.push(item.coreCustomerName);
                    //});
                }
            });
            var segRowData = custRoles.map(function(item) {
                var dataMap = {
                    "lblCheckFeature": {
                        text: "L",
                        skin: "sknLblOlbFontIconsA0A0A014Px",
                        onTouchEnd: scopeObj.filterSelection.bind(this, item, reqHeader)
                    },
                    "lblFeatureName": {
              "text": item
            }
                };
                return dataMap;
            });
			            if (this.rolesSelected != null && this.rolesSelected != "") {
                for (var i = 0; i < segRowData.length; i++) {
                    if (segRowData[i].lblDummy.text === this.rolesSelected.coreCustomerId) {
                        segRowData[i].lblCheckFeature.text = "M";
                        segRowData[i].lblCheckFeature.skin = "sknLblOlbFontIcons003E7514Px";
                    }
                }
            }
            return segRowData;
        },
      addRowsAndUpdateSection: function(rowData, sectionIndex) {
        var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
        segData[sectionIndex].pop();
        segData[sectionIndex].push(rowData);
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
      },
      
    filterSelection: function(coreCustomerName, contractName) {
			var scope = this ;
			this.rolesSelected =  coreCustomerName ;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.text = "L";
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.skin = "sknLblOlbFontIconsA0A0A014Px";
            var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
            segData.forEach(function(item) {
                if (item[0].lblHedaerContent.text === contractName) {
                    item[1].forEach(function(data) {
              if (data.lblFeatureName.text === coreCustomerName) {
                            data.lblCheckFeature.text = "M";
                            data.lblCheckFeature.skin = "sknLblOlbFontIcons003E7514Px";
                        } else {
                            data.lblCheckFeature.text = "L";
                            data.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A014Px";
                        }
                    });
                }
            });
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = coreCustomerName;
            //this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
            var custRoleNames = [];
            var userName;
            var createdts;
        this.custRoleData.companyList.forEach(function(item){
          if(item.coreCustomerName === coreCustomerName){
            item.customRoles.forEach(function(data){
              if(!kony.sdk.isNullOrUndefined(data.createdby)){
                            userName = item.customRoles[0].createdby;
              }
              else{
                            userName = "NA";
                        }
                        if (!kony.sdk.isNullOrUndefined(data.createdts)) {
                            createdts = data.createdts.replace(" ", "T");
                            createdts = data.createdts ? CommonUtilities.getFrontendDateString(data.createdts) : "N/A";
                        } else {
                            createdts = "NA";
                        }
                        custRoleNames.push({
                            "name": data.customRoleName,
                            "id": data.id,
                            "userName": userName,
                            "createdts": createdts
                        });
                    });
                }
            });
			this.setDropdownVisiblility();
            this.setDataForUserRolesDashboard(custRoleNames);
        },
      setAllRecords : function(){
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.text = "M";
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.skin ="sknLblOlbFontIcons003E7514Px";
        var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
        segData.forEach(function(item){
          item[1].forEach(function(data){
            data.lblCheckFeature.text = "L";
            data.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A014Px";
          });

        });
        this.rolesSelected = {};
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
        this.focusedTabId = 2;
        this.tabClickListener({
          "text": kony.i18n.getLocalizedString("i18n.customRoles.userRoles")
        });
      },
      setAllUsersRecords : function(){
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.text = "M";
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.skin ="sknLblOlbFontIcons003E7514Px";
        var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
//         segData.forEach(function(item){
//           item[1].forEach(function(data){
//             data.lblCheckFeature.text = "L";
//             data.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A014Px";
//           });

//         });
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
			  this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.userManagement.allUsers");
        this.focusedTabId = 1;
			  this.setDropdownVisiblility();
        this.tabClickListener({
          "text": kony.i18n.getLocalizedString("i18n.userManagement.allUsers")
        });
      },
		usersFilterSelection: function(coreCustomerDetails, contractName) {
			this.selectedCustomerDetails = coreCustomerDetails ;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.text = "L";
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.skin = "sknLblOlbFontIconsA0A0A014Px";
            var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
//             segData.forEach(function(item) {
//                 if (item[0].lblHedaerContent.text === contractName) {
//                     item[1].forEach(function(data) {
//                         if (data.lblDummy.text === coreCustomerDetails.coreCustomerId) {
//                             data.lblCheckFeature.text = "M";
//                             data.lblCheckFeature.skin = "sknLblOlbFontIcons003E7514Px";
//                         } else {
//                             data.lblCheckFeature.text = "L";
//                             data.lblCheckFeature.skin = "sknLblOlbFontIconsA0A0A014Px";
//                         }
//                     });
//                 }
//             });
			
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = coreCustomerDetails.truncatedCoreCustomerName;
			this.filterData = [];
			for(var i=0;i<this.existingUsers.length;i++){
				var flag = false;
				for(var j=0;j<this.existingUsers[i].coreCustomerId.length;j++){
					if(coreCustomerDetails.coreCustomerId === this.existingUsers[i].coreCustomerId[j]){
						this.filterData.push(this.existingUsers[i]);
						flag = true;
					}
					if(flag === true){
						break;
					}	
				}
			}
			this.setDropdownVisiblility();
			this.setUsersDataToDashboard(this.filterData);
        },
      setFilterSegmentHeaderData: function() {
        var custData = this.companyList;
        var headerKeys = [];
        for(var i=0; i < custData.companyList.length; i++){
            if (!headerKeys.includes( custData.companyList[i].contractName)){ 
              var truncatedContractName = this.formatContractName(custData.companyList[i].contractName);
              var headerDetails = {
						"contractName": custData.companyList[i].contractName,
            			"truncatedContractName": truncatedContractName
					}
              
                headerKeys.push(headerDetails);
            }
        }
        var res = [];
        var template;
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        } else {
          template = "flxHeaderTitle";
        }
        headerKeys.forEach(function(element) {
          res.push({
            "lblHedaerContent": {
              text: element.truncatedContractName,
              toolTip: element.contractName
            },
            "template": template
          });
        });

        return res;
      },
      addOnlyContractSectionHeaders: function(sectionData) {
        var segData = [];
        for (var i = 0; i < sectionData.length; i++) {
          segData.push([
            sectionData[i],
            []
          ]);
        }
        this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segData);
        for (var y = 0; y < sectionData.length; y++) {
          this.addRowsAndUpdateSection(this.setFilterSegmentRowData(y), y);
        }
      },
        setFilterSegmentRowData: function(index) {
        var scopeObj = this;
        var custData = this.companyList;
        var segData = this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.data;
        var companyRowList = [];
        //var reqHeader = segData[index][0].lblHedaerContent.text;
			for(var i=0; i < custData.companyList.length; i++){
				for(var j=0; j < custData.companyList[i].companies.length; j++) {
					var coreCustomerName = custData.companyList[i].companies[j].coreCustomerName.concat(" - ",custData.companyList[i].companies[j].coreCustomerId.slice(-4));
          			var truncatedCoreCustomerName = this.formatCoreCustomerName(custData.companyList[i].companies[j].coreCustomerName, custData.companyList[i].companies[j].coreCustomerId);
					var subCompanyDetails = {
						"coreCustomerId": custData.companyList[i].companies[j].coreCustomerId,
						"coreCustomerName": coreCustomerName,
            			"truncatedCoreCustomerName": truncatedCoreCustomerName
					}
					companyRowList.push(subCompanyDetails);
				}
			}
        var segRowData = companyRowList.map(function(item) {
          var dataMap = {
            "lblCheckFeature": {
              text: "L",
              skin : "sknLblOlbFontIconsA0A0A014Px",
              onTouchEnd: scopeObj.usersFilterSelection.bind(this, item)
            },
            "lblFeatureName": {
              "text": item.truncatedCoreCustomerName,
              "toolTip": item.coreCustomerName
            },
            "lblDummy": {
              "text": item.coreCustomerId
            }
          };
          return dataMap;
        });
			if (this.selectedCustomerDetails != null && this.selectedCustomerDetails != ""){
				for (var i = 0; i < segRowData.length; i++){
                    if (segRowData[i].lblDummy.text === this.selectedCustomerDetails.coreCustomerId) {
                            segRowData[i].lblCheckFeature.text = "M";
                            segRowData[i].lblCheckFeature.skin = "sknLblOlbFontIcons003E7514Px";
                    }
				}
			}
        //return segRowData;
          this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setData(segRowData);
      },
      
      generateExistingUsersArr: function(existingUsers) {
            let self = this;
            let usernames = {};
            this.existingUsers = [];
            let i = -1;
            existingUsers.companyList.forEach(function(companyList) {
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
            });
            this.filterData = JSON.parse(JSON.stringify(this.existingUsers));
        },
      	initializeAllUserVariablesOnLoad: function(){
              var scopeObj = this;
            this.view.onBreakpointChange = scopeObj.onBreakpointChange;
			this.focusedTabId = 1;
            this.searchString = "";
			this.sortConfig = {};
          	this.selectedCustomerDetails = {};
          this.rolesSelected = {};
		},
      	setDropdownPropertiesOnLoad: function(){
			this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.text = "M";
			this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxAll.lblAll.skin = "sknLblOlbFontIcons003E7514Px";
			this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.userManagement.allUsers");
			this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.setVisibility(false);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxDropdown.flxApproveType.flxCurrencyBody.segCurrency.setVisibility(false);
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
            this.view.TabPane.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "arrowdown_sm.png";
		},
        formatCoreCustomerName: function(coreCustomerName, coreCustomerId) {
            if (coreCustomerName.length >= 15) {
                return CommonUtilities.truncateStringWithGivenLength(coreCustomerName,15).concat(coreCustomerId.slice(-4));
            } else {
                return coreCustomerName.concat(" - ", coreCustomerId.slice(-4));
            }
        },
      	formatContractName: function(contractName) {
            if (contractName.length > 30) {
                return CommonUtilities.truncateStringWithGivenLength(contractName, 30);
            } else {
                return contractName;
            }
        },
          }
});