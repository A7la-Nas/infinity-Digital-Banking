define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmUserManagementController */ {
        currentVisibleFlex: "flxUserDetails",
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
        /**
         * Breakpont change
         */
        onBreakpointChange: function(width) {
            this.view.customheadernew.onBreakpointChangeComponent(width);
        },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {

            this.adjustScreen();
        },

        /**
         * Method will invoke on form init
         */
        initActions: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.btnBackConfirmation.onClick = this.createNewUserFlow;
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnProceedAddServices.onClick = function() {
                scopeObj.navToNextForm();
            };
        },


        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User");          
            this.currentVisibleFlex = "flxUserDetails";
            this.view.btnProceedAddServices.text=kony.i18n.getLocalizedString("i18n.konybb.Common.ViewAllUsers");
            this.view.btnProceedAddServices.toolTip=kony.i18n.getLocalizedString("i18n.konybb.Common.ViewAllUsers");
            this.view.lblLoginDetails.text=kony.i18n.getLocalizedString("i18n.userManagement.loginDetails");
            this.view.lblAccountNumber.text=kony.i18n.getLocalizedString("kony.address.EmailAddress");
            this.view.lblAccountNickNameKey.text=kony.i18n.getLocalizedString("i18n.userManagement.SSN");
            this.view.btnBackConfirmation.toolTip=kony.i18n.getLocalizedString("i18n.userManagement.createAnotherUser");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
            this.view.lblSuccessMessage.text=kony.i18n.getLocalizedString("i18n.userManagement.usrSuccessfullyCreated");
            this.view.lblContentHeader.text=kony.i18n.getLocalizedString("i18n.createUser.Acknowledgmentlbl")
            this.view.flxRightHeader.setVisibility(true);
            this.view.flxLoginDetailsOfUser.setVisibility(true);
            this.view.btnBackConfirmation.setVisibility(true);
            this.view.btnProceedAddServices.width="200dp";
        },





        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            this.onBreakpointChange();
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
            this.dataval = JSON.parse(JSON.stringify(data.presentationController.getUserManagementData()));
            this.view.lblGeneratedUserName.text=kony.i18n.getLocalizedString("i18n.userManagement.GenertedUserName");
            this.view.lblNote.text=kony.i18n.getLocalizedString("i18n.userManagement.loginNote");
            this.view.btnBackConfirmation.text=kony.i18n.getLocalizedString("i18n.konybb.Common.CreateNewUser");
            this.view.lblBankName.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.FullName");
            this.view.lblAccountType.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.DOB");
            this.view.lblBeneficiaryName.text=kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredPhoneNo");
            this.view.lblDriverLicenceNumber.text=kony.i18n.getLocalizedString("i18n.konybb.createUser.DriversLicenseNumber");
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
            if (kony.application.getCurrentBreakpoint() <= 1024)
              {
                this.view.btnCreateRole.left="0dp";
                this.view.lblReferenceHeader.left="115dp";
                this.view.lblReferenceNumber.left="120dp";
              }
            else if (kony.application.getCurrentBreakpoint() === 1366) {
                this.view.lblSuccessMessage.left="0dp";
                this.view.flxAcknowledgementHeader.right="0dp";
                this.view.btnCreateRole.left="0dp";
                this.view.lblReferenceHeader.left="435dp";
                this.view.lblReferenceNumber.left="427dp";
            }
            }
            var contractId = [];
            this.dataval.companyList.map(company => {
                if (!contractId.includes(company.contractId)) contractId.push(company.contractId);
            });
            let roleCreation = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE");
            if (contractId.length === 1 && roleCreation) {
                this.view.flxCreateRole.isVisible = true;
                this.view.btnCreateRole.onClick = this.navigateToCreateRole;
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.lblCreateRole, kony.i18n.getLocalizedString("i18n.UserManagement.createRoleFromUser"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnCreateRole, kony.i18n.getLocalizedString("i18n.customRole.createCustomRole"), accessibilityConfig);
            } else {
                this.view.flxCreateRole.isVisible = false;
            }
          this.view.customheadernew.activateMenu("User Management", "Create UM User");
            this.createInfinityUserSuccess = data.presentationController.createInfinityUserSuccess;
            this.setDataUserDetails(this.dataval);
            let isEditable = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_VIEW");
            if (isEditable) {
                this.view.btnViewMoreDetails.isVisible = true;
                this.view.btnViewMoreDetails.onClick = this.navToViewEdit;
            } else {
                this.view.btnViewMoreDetails.isVisible = false;
            }
        },

        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.tbLastName, this.view.flxLastName],
                [this.view.tbxDriversLicense, this.view.flxDriversLicense],
                [this.view.tbxEmail, this.view.flxEmail],
                [this.view.tbxMiddleName, this.view.flxMiddleName],
                [this.view.tbxName, this.view.flxName],
                [this.view.tbxPhoneNum, this.view.flxPhoneNum],
                [this.view.tbxSSN, this.view.flxSSN]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },

        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(viewModel) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.getInfinityUserFailure) {
                    this.view.flxDowntimeWarning.isVisible = true;
                    CommonUtilities.setText(this.view.lblDowntimeWarning, viewModel.getInfinityUserFailure, accesibilityConfig);
                }
                if (viewModel.getInfinityUserSuccess) {
                    this.view.flxDowntimeWarning.isVisible = false;
                    applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                }
            }
            this.view.forceLayout();
        },
        createNewUserFlow: function() {
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
            data.presentationController.initializeFlowConfigs("createUser");
            applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
        },
        navToNextForm: function() {
            let bussBanking = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule").presentationController;
			bussBanking.fetchAssociatedContractUsers(bussBanking.fetchAssociatedContractUsersSuccess.bind(bussBanking));
            FormControllerUtility.hideProgressBar(this.view);
        },
        navToViewEdit: function() {
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
            data.presentationController.viewEditUserPermissions(this.createInfinityUserSuccess.id);
        },
        navigateToCreateRole: function() {
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
            data.presentationController.initializePresentationController();
            data.presentationController.initializeFlowConfigs("createRole");
            data.presentationController.userPermissionFlow = OLBConstants.USER_MANAGEMENT_TYPE.CREATE_ROLE;
            data.presentationController.userManagementData = this.dataval;
            data.presentationController.initUserManagementData = JSON.parse(JSON.stringify(this.dataval));
            applicationManager.getNavigationManager().navigateTo("frmBBCreateCustomRole");
        },
      loadBusinessBankingModule: function() {
        return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
      },
        setDataUserDetails: function(dataVal) {
            //data = data.userDetails;
            let navManager = applicationManager.getNavigationManager();
            var createFlowType = navManager.getCustomInfo("createManualFlow");
            var data;

            var retriveExistingUserFlag = navManager.getCustomInfo("retieveFlag");        
        
            if(retriveExistingUserFlag === true){
               var firstname1 = navManager.getCustomInfo("firstName");
               var lastname1 = navManager.getCustomInfo("lastName");
               var email = navManager.getCustomInfo("email");
               var dob = navManager.getCustomInfo("dateOfBirth");
               var phoneNumber = navManager.getCustomInfo("phone");
               var ssn = navManager.getCustomInfo("taxId");
               var drivingLN = navManager.getCustomInfo("taxId");
               
               this.view.lblBillerValue.text = firstname1 + " " + lastname1;
               this.view.lblAccountNumberValue.text = email;
               this.view.lblAccountTypeValue.text = dob; 
               this.view.lblBeneficiaryNameValue.text = phoneNumber;
               this.view.lblAccountNickNameValue.text = ssn;
               this.view.CopylblAccountNickNameValue0cd9c9252d13d46.text = drivingLN;
               this.view.lblReferenceNumber.text = this.createInfinityUserSuccess.id;
               this.view.lblRightName.text = this.createInfinityUserSuccess.userName;
            }   
            
            else {
                if(navManager.getCustomInfo('addToEntityFlow')==="addToEntity"){
                    var entityDetails=navManager.getCustomInfo('addToEntityDetails');
                    this.view.lblSuccessMessage.text=entityDetails.userDetails.selectedUserName+" has been succesfully added to "+'"'+entityDetails.addToEntityName+'"'+" entity";
                    this.view.lblContentHeader.text="Acknowledgement";
                    this.view.flxRightHeader.setVisibility(false);
                    this.view.flxLoginDetailsOfUser.setVisibility(false);
                    this.view.btnBackConfirmation.setVisibility(false);
                    this.view.btnProceedAddServices.text="Go to User Management";
                    this.view.btnProceedAddServices.width="230dp";
                  }
            if (createFlowType === "createCopyFlow") {
                var userData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
                data = userData.userDetails;
            } else data = navManager.getCustomInfo("userDetailsManual");
            this.view.lblBillerValue.text = data.firstName + " " + data.lastName;
            this.view.lblAccountNumberValue.text = data.email;
            this.view.lblAccountTypeValue.text = data.dob; //new
            this.view.lblBeneficiaryNameValue.text = data.phoneNumber;
            this.view.lblAccountNickNameValue.text = data.ssn;
            this.view.CopylblAccountNickNameValue0cd9c9252d13d46.text = data.drivingLicenseNumber;
            this.view.lblReferenceNumber.text = this.createInfinityUserSuccess.id;
            this.view.lblRightName.text = this.createInfinityUserSuccess.userName;
        }
      }

    };
});