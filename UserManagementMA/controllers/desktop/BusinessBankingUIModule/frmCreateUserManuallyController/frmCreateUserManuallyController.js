define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var userData = {};
    var selectedUser = {};
    var lastUserSelected = {};
    var selectedCompany = {};
    var userDataDetails = [];
	var retrieveExistingUserFlag = false;
    var backNavigationFlag = false;
    var isAddToEntityFlow = false;
    createManually = true;
    return /** @alias module:frmUserManagementController */ {
        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(context) {
            if (context) {
                if (context.progressBar === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (context.progressBar === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (context.serverError) this.showServerError(context.serverError);
                else {
                    this.showServerError(false);
                    if (context.showLoadingIndicator) {
                        if (context.showLoadingIndicator.status === true) FormControllerUtility.showProgressBar(this.view);
                        else FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (context.showLoadingIndicator) {
                    if (context.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (context.identificationNumberExists === "true") {
                    this.showSSNExistsError();
                } else if (context.identificationNumberExists === "false") {
                    this.onValidSSN();
                }
                if (context.userError) {
                    // this.showErrorMsg(context.userError);
                }
               if(context.userDetailsSuccess){
                 this.showAddUserToEntityFlow(context.userDetailsSuccess);
                 FormControllerUtility.hideProgressBar(this.view);
               }
                if (context.UserOFACCheckStatus === true) {
                    this.onOFACCheckSucces();
                } else if (context.invalidUserError === false) {
                    this.setOFACError();
                } else if (context.ListofCompanies) {
                    this.setCompaniesListDropdown(context.ListofCompanies.customers);
                } else if (context.ListofCompanyUsers) {
                    this.userData = context.ListofCompanyUsers;
                    this.addIsSelectedFieldForUsers();
                    this.setUsersSegmentData(context.ListofCompanyUsers);
                }
            }
        },
        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
        /**
         * Method will invoke on form init
         */
        initActions: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.validationUtilManager = applicationManager.getValidationUtilManager();
            this.view.tbxName.onKeyUp = this.validateUserDetails.bind(this);
            this.view.tbLastName.onKeyUp = this.validateUserDetails.bind(this);
            this.view.DateInput.textChangeCallback = this.isDobValid.bind(this);
            this.view.tbxEmail.onKeyUp = this.onUserEmailChanged.bind(this);
            this.view.tbxCode.onKeyUp = this.onEnteringCountryCode.bind(this);
            this.view.tbxPhoneNum.onKeyUp = this.onEnteringPhoneNumber.bind(this);
            this.view.tbxSSN.onKeyUp = this.onEnteringSSN.bind(this);
            this.view.tbxDriversLicense.onKeyUp = this.onEnteringDrivingLicenseNumber.bind(this);
            this.view.btnProceedCreate.onClick = this.validateUMIdentificationNumber;
            this.view.btnCancelCreate.onClick = this.onCancelClick;
        },
        /**
         * Method will invoke on form pre show
         */
        preShow: function(){
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader', 'flxMain']);
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("i18n.konybb.Common.CreateUser"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateUserDetails"), CommonUtilities.getaccessibilityConfig());
            this.view.btnCancelCreate.toolTip=kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.btnProceedCreate.toolTip=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.lblAddedOn.text=kony.i18n.getLocalizedString("kony.i18n.verifyDetails.emailAddress");
            this.view.lblBankName.text=kony.i18n.getLocalizedString("i18n.Enroll.DOB");
            this.resetAddrecipientData();
            this.view.flxCreateControlButtons.width = "100%";
            this.view.lblCharacter.left = "13%";
            this.flowConfig = this.loadBusinessBankingModule().presentationController.getFlowConfigs();
            this.userManagementFlow = this.flowConfig.userManagementFlow || '';
            this.userCreationFlow = this.flowConfig.userCreationFlow || '';
            this.userPermissionFlow = this.flowConfig.userPermissionFlow || '';
            this.userNavigationType = this.flowConfig.userNavigationType || '';
            this.view.customheadernew.btnHamburgerNew.skin = "btnHamburgerskn";
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
			this.showUserManagementFlowType();
        },
        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            this.view.customheadernew.activateMenu("User Management", "Create UM User");
            this.view.flxAccountsRightContainer.onClick = this.selectCompanyDropdown;
            this.view.segAccountListActions.onRowClick = this.getCompanyUserList;
            this.view.DateInput.setDateFormat(applicationManager.getFormatUtilManager().getDateFormat());
            this.view.btnProceedCreate.onClick = this.validateUMIdentificationNumber;
            this.onBreakpointChange();
            this.view.flxContentContainer.minHeight = kony.os.deviceInfo().screenHeight - (this.view.flxFooter.info.frame.height + this.view.flxHeader.info.frame.height) + "dp";
            this.view.lblEnterManually.text=kony.i18n.getLocalizedString("i18n.userManagement.EnterManually");
            this.view.lblEmail.text=kony.i18n.getLocalizedString("kony.mb.Alerts.Email");
            this.view.lblRetrieveExistingUser.text=kony.i18n.getLocalizedString("i18n.userManagement.RetrieveExistingUser");
            this.view.forceLayout();
        },
        onNavigate: function(str) {
            backNavigationFlag = false;
            if (str === "frmCopyPermission") {
                this.backNavigationFlag = true;
            }
        },
        showUserManagementFlowType: function() {
            FormControllerUtility.disableButton(this.view.btnProceedCreate);
          this.view.lblBasicDetails.setVisibility(false);
          var navManager=applicationManager.getNavigationManager();
          isAddToEntityFlow = navManager.getCustomInfo("addToEntityFlow");
          var addToEntityDetails=navManager.getCustomInfo("addToEntityDetails");
          var contractDetails = navManager.getCustomInfo("contractDetails");
           if(isAddToEntityFlow === "addToEntity"){
             var userAccounts = navManager.getCustomInfo("userAccounts");
                var userId = navManager.getCustomInfo("userId");
                var contractId = addToEntityDetails.contractId;
                var coreCustomerId = addToEntityDetails.coreCustomerId;
                FormControllerUtility.showProgressBar(this.view);
                this.loadBusinessBankingModule().presentationController.getExistingUserDetails(userId, contractId, coreCustomerId, "accountAccess");
             //this.showAddUserToEntityFlow();
           }
          else{
            this.hideAddUserToEntityFlow();
            var flowType = OLBConstants.CLIENT_PROPERTIES.OLB_USER_MANGEMENT_FLOW;
            if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.HYBRID) {
                this.showHybridUserFlow();
            } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.MANUAL) {
                this.showManualUserFlow();
            } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.EXISTING) {
                this.showExistingUserFlow();
            } else {
                this.showHybridUserFlow();
            }
          }
            this.view.flxAccountsRightContainer.onClick = this.selectCompanyDropdown;
            this.view.segAccountListActions.onRowClick = this.getCompanyUserList;
            this.view.Search.txtSearch.onTextChange = this.searchUser;
            // if(backNavigationFlag){
            //     this.populateDataonBackNavigation();
            // }
            this.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
            var isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if ((isEditFlow || this.backNavigationFlag) && (this.loadBusinessBankingModule().presentationController.getUserCreationFlow() === OLBConstants.USER_MANAGEMENT_TYPE.MANUAL || this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT)) {
                var userData = (this.loadBusinessBankingModule().presentationController.getUserManagementData()).userDetails;
                if (isEditFlow) {
                    this.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                    this.populatefields(userData);
                }
                if (this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    this.showEditUserFlow(userData);
                } else {
                    this.populatefields(userData);
                }
            }
        },
        showEditUserFlow: function(userData) {
            this.view.btnProceedCreate.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
            this.view.btnProceedCreate.onClick = this.updateUserDataEdit;
            this.showManualUserFlow();
            this.populatefields(userData);
            this.disableFields();
            FormControllerUtility.hideProgressBar(this.view);
            FormControllerUtility.enableButton(this.view.btnProceedCreate);
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("i18n.konybb.Common.EditUser"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.Commons.EditUser"), CommonUtilities.getaccessibilityConfig());
        },
        showHybridUserFlow: function() {
            this.view.flxUserDetailsType.isVisible = true;
            this.view.flxDetailsContainer.isVisible = true;
            this.view.flxRetriveExistingUsersContainer.isVisible = false;
            this.view.flxTypeRadio1.onClick = this.showflxDetails;
            this.view.flxTypeRadio2.onClick = this.showUserLists;
            this.adjustScreen();
        },
        showManualUserFlow: function() {
            this.view.flxUserDetailsType.setVisibility(false); //isVisible = false;
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("i18n.konybb.Common.CreateUser"), CommonUtilities.getaccessibilityConfig());
            this.view.flxDetailsContainer.isVisible = true;
            this.view.flxRetriveExistingUsersContainer.isVisible = false;
            this.view.btnProceedCreate.onClick = this.validateUMIdentificationNumber;
            this.adjustScreen();
        },
        showExistingUserFlow: function() {
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("konybb.i18n.userMgmt.ViewExistingCustomers"), CommonUtilities.getaccessibilityConfig());
            this.view.flxUserDetailsType.setVisibility(false);
            this.view.flxDetailsContainer.isVisible = false;
            this.view.flxRetriveExistingUsersContainer.isVisible = true;
            this.view.btnProceedCreate.onClick = this.onUserDetailsProceedBtnClick;
            this.showUserLists();
            this.adjustScreen();
        },
        hideAddUserToEntityFlow: function(){
           this.view.tbxName.setEnabled(true);
            this.view.flxName.skin="skne3e3e3br3pxradius";
            this.view.tbxName.text="";
            this.view.tbxMiddleName.setEnabled(true);
            this.view.flxMiddleName.skin="skne3e3e3br3pxradius";
            this.view.tbLastName.setEnabled(true);
            this.view.flxLastName.skin="skne3e3e3br3pxradius";
            this.view.tbLastName.text="";
            this.view.DateInput.tbxDateInputKA.setEnabled(true);
            this.view.flxDOB.skin="skne3e3e3br3pxradius";
        },
        showAddUserToEntityFlow : function(userDetails){
          var navManager = applicationManager.getNavigationManager();
          var entityDetails=navManager.getCustomInfo("addToEntityDetails");
          var contractDetails=navManager.getCustomInfo("addToEntityDetails");
          var userData=userDetails.userDetails;
            this.view.flxRetriveExistingUsersContainer.isVisible = false;
            this.showflxDetails();
            this.view.flxUserDetailsType.setVisibility(false);
            this.view.lblContentHeader.text="User Details";
            this.view.lblTitleText.text="Adding "+'"'+entityDetails.userDetails.selectedUserName+'"'+" to "+'"'+entityDetails.addToEntityName+'"'+" entity";
            this.view.lblBasicDetails.setVisibility(true);
            this.view.lblBasicDetails.text="Basic Details";
            this.view.lblTitleText.skin = "sknSSPSB42424218Px";
            this.view.tbxName.setEnabled(false);
            this.view.flxName.skin="sknTbxf7f7f73px";
            this.view.tbxName.text=userData[0].firstName;
            this.view.tbxMiddleName.setEnabled(false);
            this.view.flxMiddleName.skin="sknTbxf7f7f73px";
            this.view.tbxMiddleName.text=userData[0].middleName?userData[0].middleName:"";
            this.view.tbLastName.setEnabled(false);
            this.view.flxLastName.skin="sknTbxf7f7f73px";
            this.view.tbLastName.text=userData[0].lastName;
            this.view.DateInput.tbxDateInputKA.setEnabled(false);
            this.view.flxDOB.skin="sknTbxf7f7f73px";
            var dob=userData[0].dob.replaceAll("-","/").split("/");
            var date=dob[1]+"/"+dob[2]+"/"+dob[0];
            this.view.DateInput.tbxDateInputKA.text=date;
            this.view.btnProceedCreate.onClick = this.validateUMIdentificationNumber;
        },
        showflxDetails: function() {
            var scopeObj = this;
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("i18n.konybb.Common.CreateUser"), CommonUtilities.getaccessibilityConfig());
            this.view.flxCreateUser.isVisible = true;
            scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType1, scopeObj.view.imgRadioBtnRecipientType2);
            this.view.flxRetriveExistingUsersContainer.isVisible = false;
            this.view.flxDetailsContainer.isVisible = true;
            this.view.btnProceedCreate.onClick = this.validateUMIdentificationNumber;
            this.adjustScreen();
        },
        showUserLists: function() {
            var scopeObj = this;
            CommonUtilities.setText(this.view.lblTitleText, kony.i18n.getLocalizedString("konybb.i18n.userMgmt.ViewExistingCustomers"), CommonUtilities.getaccessibilityConfig());
            scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType2, scopeObj.view.imgRadioBtnRecipientType1);
            this.view.flxDetailsContainer.isVisible = false;
            this.view.flxRetriveExistingUsersContainer.isVisible = true;
            this.view.btnProceedCreate.onClick = this.onUserDetailsProceedBtnClick;
            FormControllerUtility.showProgressBar(this.view);
            this.view.imgSortAccountName.onTouchStart = this.sortAccounts;
            this.loadBusinessBankingModule().presentationController.getListofCompanies();
            this.adjustScreen();
        },
        selectCompanyDropdown: function() {
            if (this.view.companyListMenu.isVisible === true) {
                this.view.companyListMenu.isVisible = false;
                this.view.lblImgDropdown.text = "O";
            } else {
                this.view.companyListMenu.isVisible = true;
                this.view.lblImgDropdown.text = "P";
            }
        },
        setCompaniesListDropdown: function(companies) {
            if (companies.length < 1) {
                this.view.flxAccountsRightContainer.enable = false;
                this.view.flxNoRecords.isVisible = true;
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.transfers.searchNoPayees");
                this.view.flxCreateUser.isVisible = false;
                this.view.segRetriveExistingUser.isVisible = false;
            } else {
                this.view.btnShowAllAccounts.text = this.getTruncatedCompany(companies[0], 15);
                var dataMap = {
                    "lblUsers": "coreCustomerName",
                    "lblCompanyId": "contractId",
                    "coreCustomerId": "coreCustomerId"
                }
                this.view.flxRetriveExistingUsersContainer.isVisible = true;
                this.view.segAccountListActions.rowTemplate = "flxAccountTypes";
                this.view.segAccountListActions.widgetDataMap = dataMap;
                this.view.segAccountListActions.setData(companies);
            }
          	this.view.forceLayout();
        },
        getTruncatedCompany: function(company, numberOfChar) {
            var companyId = company.coreCustomerId;
            if (companyId.length > 4) {
                companyId = companyId.substring(companyId.length - 4, companyId.length);
            }
            var str = company.coreCustomerName;
            if (str.length > (numberOfChar - 7)) {
                str = str.substring(0, numberOfChar) + " (" + companyId + ")";
            }
            return str;
        },
        setUsersSegmentData: function(data) {
            if (data.length === 0) {
                this.view.flxNoRecords.isVisible = true;
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.transfers.searchNoPayees");
                this.view.flxCreateUser.isVisible = false;
                this.view.segRetriveExistingUser.isVisible = false;
            } else {
                this.view.segRetriveExistingUser.isVisible = true;
                this.view.flxNoRecords.isVisible = false;
                this.view.flxCreateUser.isVisible = true;
                var individualCustData = [];
                data.forEach(function(item){
                  if(item.lastName !== "")
                    individualCustData.push(item);
                });   
                var formattedData = this.getFormattedUserData(individualCustData);
                var dataMap = {
                    "lblDropdown": "lblDropdown",
                    "lblAccountName": "fullName",
                    "lblBankName": "dateOfBirth",
                    "DateOfBirth": "dateOfBirth",
                    "lblAccountType": "phone",
                    "lblAddedBy": "email",
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "middleName": "middleName",
                    "phoneNumber": "phone",
                    "countryCode": "country",
                    "SSN": "taxId",
                    "diverslicense": "diverslicense",
                    "coreCustomerId": "coreCustomerId",
                    "emailID": "emailID",
                    "isAssociated": "isAssociated",
                    "isProfileExists": "isProfileExists",
                    "isValidUser": "isValidUser",
                    "flxErrorImg": "flxErrorImg",
                    "lblStatus": "lblStatus",
                    "flxStatus": "flxStatus",
                    "flxCustomerDetails": "flxCustomerDetails",
                    "flxDropdown": "flxDropdown",
                    "lblCustomerNameValue": "fullName",
                    "lblCustomerIDValue": "coreCustomerId",
                    "flxDisableBg": "flxDisableBg",
                  	"imgError": "imgError"
                };
                //var users = this.showFirstUserAsSelected(formattedData);
                this.view.segRetriveExistingUser.widgetDataMap = dataMap;
                this.view.segRetriveExistingUser.setData(formattedData);
            }
            this.view.lblAddedBy.text=kony.i18n.getLocalizedString("kony.i18n.verifyDetails.phoneNumber");
            this.view.lblAccountName.text=kony.i18n.getLocalizedString("i18n.konybb.Common.Name");
          	this.view.forceLayout();
            this.adjustScreen();
        },
        getCompanyUserList: function() {
          	this.view.lblImgDropdown.text = "O";
            this.view.companyListMenu.isVisible = false;
            var company = this.view.segAccountListActions.selectedRowItems[0];
            this.selectedCompany = company;
            this.view.btnShowAllAccounts.text = this.getTruncatedCompany(company, 17);
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.getUsersOfCompany(company.coreCustomerId);
        },
        sortAccounts: function() {
            var sortData = {};
            if (this.view.imgSortAccountName.src === "sorting.png") {
                this.view.imgSortAccountName.src = "sorting_next.png";
                sortData = CommonUtilities.sortAndSearchJSON(JSON.parse(JSON.stringify(this.userData)), "firstName", "ASC", null, null);
            } else if (this.view.imgSortAccountName.src === "sorting_next.png") {
                this.view.imgSortAccountName.src = "sorting_previous.png";
                sortData = CommonUtilities.sortAndSearchJSON(JSON.parse(JSON.stringify(this.userData)), "firstName", "DESC", null, null);
            } else {
                this.view.imgSortAccountName.src = "sorting.png";
                sortData = this.userData;
            }
            if (sortData === -1) {
                this.view.flxNoRecords.isVisible = true;
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.TransfersEur.noResults");
                this.view.flxMakeBulkTransfer.isVisible = false;
                this.view.flxCreateUser.isVisible = false;
                this.view.segRetriveExistingUser.isVisible = false;
            } else {
                this.view.flxNoRecords.isVisible = false;
                this.view.flxMakeBulkTransfer.isVisible = true;
                this.view.flxCreateUser.isVisible = true;
                this.view.segRetriveExistingUser.isVisible = true;
                var formattedData = this.getFormattedUserData(sortData);
                this.view.segRetriveExistingUser.removeAll();
                this.view.segRetriveExistingUser.setData(formattedData);
            }
          	this.view.forceLayout();
            this.adjustScreen();
        },
        searchUser: function() {
            var searchText = this.view.Search.txtSearch.text;
            var searchData = CommonUtilities.sortAndSearchJSON(this.userData, null, null, "firstName,coreCustomerId,dateOfBirth,phone,email", searchText);
            if (searchData === -1) {
                this.view.flxNoRecords.isVisible = true;
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("konybb.userMgmt.NoAuthorisedUsers");
                this.view.flxMakeBulkTransfer.isVisible = false;
                this.view.flxCreateUser.isVisible = false;
                this.view.segRetriveExistingUser.isVisible = false;
            } else {
                this.view.flxNoRecords.isVisible = false;
                this.view.flxMakeBulkTransfer.isVisible = true;
                this.view.flxCreateUser.isVisible = true;
                this.view.segRetriveExistingUser.isVisible = true;
                var formattedData = this.getFormattedUserData(searchData);
                this.view.segRetriveExistingUser.setData(formattedData);
            }
          	this.view.forceLayout();
            this.adjustScreen();
        },
        getFormattedUserData: function(users) {
            userDataDetails = users;
            var scopeObj = this;
            var checks = ["phone", "country", "taxId", "email", "coreCustomerId"];
            for (var i = 0; i < users.length; i++) {
                users[i].isValidUser = true;
                users[i].flxDropdown = {
                    onClick: scopeObj.showExistingUserDetails.bind(this, i)
                }
                users[i].flxDisableBg = {
                    "isVisible": false
                };
                users[i].lblDropdown = {
                    "text": "O"
                }
                users[i].flxCustomerDetails = {
                    "isVisible": false
                }
                users[i].flxErrorImg = {
                    "isVisible": false
                }
                users[i].imgError = {
                    "toolTip" : ""
                }
                users[i].flxStatus = {
                    "enable": true,
                    "skin": "slFbox",
                    onClick: scopeObj.onUserSelection.bind(this, i)
                }
                users[i].lblStatus = {
                    "text": "L",
                    "skin": "sknC0C0C020pxNotFontIconsMOD"
                }
                if (users[i].isSelected === "true") {
                    users[i].lblStatus = {
                        "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO,
                        "skin": ViewConstants.SKINS.RADIOBTN_SELECTED
                    };
                }
                users[i].fullName = users[i].firstName + " " + users[i].lastName;
                users[i].fullName = users[i].fullName || "-";
                var flag = false;
                for (var j = 0; j < checks.length; j++) {
                    if (!users[i][checks[j]]) {
                        flag = true;
                    }
                }
                if(!kony.sdk.isNullOrUndefined(users[i].isAssociated)){
                    if(users[i].phone !== "" && users[i].email !== ""){
                      if ((users[i].isProfileExists.toString() === 'true' && users[i].isAssociated.toString() === 'true')) {
                        users[i].isValidUser = false;
                        users[i].flxErrorImg = {
                          "isVisible": true
                        };
                        users[i].flxStatus = {
                          "enable": false,
                          onClick: scopeObj.onUserSelection.bind(this, i)
                        };
                        users[i].flxDisableBg = {
                          "isVisible": true
                        };
                        if(users[i].isProfileExists.toString() === 'true' && users[i].isAssociated.toString() === 'true'){
                          users[i].imgError.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.ProfileAlreadyExists");
                        }
                        else{
                          users[i].imgError.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.OtherPrimaryFields");
                        }
                      }else if ((users[i].isAssociated.toString() === 'false')) {
                        users[i].isValidUser = true;
                        users[i].flxErrorImg = {
                          "isVisible": false
                        };
                        users[i].flxStatus = {
                          "enable": true,
                          "skin": "slFbox",
                          onClick: scopeObj.onUserSelection.bind(this, i)
                        };
                        users[i].flxDisableBg = {
                          "isVisible": false
                        };
                        users[i].imgError.toolTip = "";
    
                        if(users[i].isProfileExists.toString() === 'true'){
                          this.view.btnProceedCreate.onClick = function(){
                            scopeObj.onUserDetailsProceedBtnClick();
                          }
                        }
                        else{
                          this.view.btnProceedCreate.onClick = function(){
                            scopeObj.onUserDetailsProceedBtnClick();
                          }
                        }
                      }
                    }
                    else{
                      users[i].isValidUser = false;
                      users[i].flxErrorImg = {
                        "isVisible": true
                      };
                      users[i].flxStatus = {
                        "enable": false,
                        onClick: scopeObj.onUserSelection.bind(this, i)
                      };
                      users[i].flxDisableBg = {
                        "isVisible": true
                      };
                      users[i].imgError.toolTip = "Email or Phone not found";
                    }
                  }
                  else{
                    users[i].isValidUser = false;
                    users[i].flxErrorImg = {
                        "isVisible": true
                    };
                    users[i].flxStatus = {
                        "enable": false,
                        onClick: scopeObj.onUserSelection.bind(this, i)
                    };
                    users[i].flxDisableBg = {
                        "isVisible": true
                    };
                  if(users[i].isProfileExists.toString() === 'true'){
                    users[i].imgError.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.UserAlreadyExists");
                  }
                  else{
                    users[i].imgError.toolTip = kony.i18n.getLocalizedString("konybb.userMgmt.OtherPrimaryFields");
                  }
                }
                users[i].phone = users[i].phone || "-";
                users[i].email = users[i].email || "-";
                users[i].coreCustomerId = users[i].coreCustomerId || "-";
                users[i].dateOfBirth = users[i].dateOfBirth || "-";
            }
            return users;
        },
        showFirstUserAsSelected: function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].flxStatus.enable === true) {
                    FormControllerUtility.enableButton(this.view.btnProceedCreate);
                    data[i].isSelected = "true";
                    data[i].lblStatus.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    data[i].lblStatus.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                    this.selectedUser = data[i];
                    break;
                }
            }
            return data;
        },
        onUserSelection: function(index) {
            var data = this.view.segRetriveExistingUser.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].flxStatus.enable === true) {
                    if (i === index) {
                        if (data[i].lblStatus.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO) {
                            FormControllerUtility.enableButton(this.view.btnProceedCreate);
                            data[i].lblStatus.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                            data[i].lblStatus.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                            data[i].isSelected = "true";
                            this.selectedUser = data[i];
                            this.updateUserData(this.selectedUser.taxId);
                        } else {
                            FormControllerUtility.disableButton(this.view.btnProceedCreate);
                            data[i].lblStatus.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                            data[i].lblStatus.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                            data[i].isSelected = "false";
                        }
                    } else {
                        data[i].lblStatus.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                        data[i].lblStatus.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                        data[i].isSelected = "false";
                    }
                }
            }
            var navMan=applicationManager.getNavigationManager();
            navMan.setCustomInfo("firstName",this.selectedUser.firstName);
            navMan.setCustomInfo("lastName",this.selectedUser.lastName);
            navMan.setCustomInfo("coreCustomerId",this.selectedUser.coreCustomerId);
            navMan.setCustomInfo("email",this.selectedUser.email);
            navMan.setCustomInfo("phone",this.selectedUser.phone);
            navMan.setCustomInfo("dateOfBirth",this.selectedUser.dateOfBirth);
            navMan.setCustomInfo("taxId",this.selectedUser.taxId);
			navMan.setCustomInfo("drivingLicenseNumber", this.selectedUser.drivingLicenseNumber);
            navMan.setCustomInfo("userId",this.selectedUser.userId); 
            this.view.segRetriveExistingUser.setData(data);
            this.adjustScreen();
        },
        showExistingUserDetails: function(index) {
            var data = this.view.segRetriveExistingUser.data;
            for (var i = 0; i < data.length; i++) {
                if (i === index) {
                    if (data[i].lblDropdown.text === "O") {
                        data[i].lblDropdown.text = "P";
                        data[i].flxCustomerDetails.isVisible = true;
                    } else {
                        data[i].lblDropdown.text = "O";
                        data[i].flxCustomerDetails.isVisible = false;
                    }
                } else {
                    data[i].lblDropdown.text = "O";
                    data[i].flxCustomerDetails.isVisible = false;
                }
            }
            this.view.segRetriveExistingUser.setData(data);
            this.adjustScreen();
        },
        updateUserData: function(taxId) {
            for (var i = 0; i < this.userData.length; i++) {
                if (this.userData[i].taxId === taxId) {
                    this.userData[i].isSelected = "true";
                } else {
                    this.userData[i].isSelected = "false";
                }
            }
        },
        addIsSelectedFieldForUsers: function() {
            for (var i = 0; i < this.userData.length; i++) {
                this.userData[i].isSelected = "false";
            }
        },
        /**
         * Breakpont change
         */
        onBreakpointChange: function(width) {
            this.view.customheadernew.onBreakpointChangeComponent(width);
        },
        /**
         * 
         */
        adjustScreen: function() {
            // this.view.forceLayout();
            // this.view.flxFooter.isVisible = true;
            // var mainheight = 0;
            // var screenheight = kony.os.deviceInfo().screenHeight;
            // mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
            // var diff = screenheight - mainheight;
            // if (mainheight < screenheight) {
            //     diff = diff - this.view.flxFooter.info.frame.height;
            //     if (diff > 0) {
            //         this.view.flxFooter.top = mainheight + diff + "dp";
            //     } else {
            //         this.view.flxFooter.top = mainheight + "dp";
            //     }
            //     this.view.forceLayout();
            // } else {
            //     this.view.flxFooter.top = mainheight + "dp";
            //     this.view.forceLayout();
            // }
        },
        populateDataonBackNavigation: function() {
            // var userData = (this.loadBusinessBankingModule().presentationController.getUserManagementData()).userDetails;
            //     var userCreationFlow = this.loadBusinessBankingModule().presentationController.getUserCreationFlow();
            //     if(userCreationFlow === OLBConstants.USER_MANAGEMENT_TYPE.MANUAL){
            //         this.populatefields(userData);
            //     }
            //     else{
            //     } 
        },
        /**
         * hide all ui flexes in user management form
         */
        resetUI: function() {
            this.adjustScreen();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateUserDetails"), accessibilityConfig);
        },
        /**
         * Method to load and returns the Business User Module Object
         * @returns {object} Method to load and returns the Business User Module Object
         */
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                this.view.rtxDowntimeWarning.text = status.errorMessage;
                this.view.rtxDowntimeWarning.toolTip = status.errorMessage;
                this.view.flxDowntimeWarning.setVisibility(true);
                //this.view.flxDowntimeWarningr.setFocus(true);
            }
            this.view.forceLayout();
        },
        /**
         * Toggles the Radio Button selection state for Image Labels rendered by font icons
         * @param {object} RadioBtn1 Refernce to image widget 1
         * @param {object} RadioBtn2 Refernce to image widget 2
         */
        RadioBtnAction: function(RadioBtn1, RadioBtn2) {
            if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.validateUserDetails();
            } else {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            }
        },
        /**
         *function to collect data entered in the form
         */
        enteredData: function() {
            var scope = this;
            var data = {
                firstName: this.view.tbxName.text,
                middleName: this.view.tbxMiddleName.text,
                lastName: this.view.tbLastName.text,
                dateOfBirth: this.getFormattedDOB(this.view.DateInput.tbxDateInputKA.text),
                email: this.view.tbxEmail.text,
                phoneCountryCode: this.view.tbxCode.text,
                phone: this.view.tbxPhoneNum.text,
                taxId: this.view.tbxSSN.text,
                drivingLicenseNumber: this.view.tbxDriversLicense.text,
                coreCustomerId: ""
            };
            scope.userData = data;
            return data;
        },
        /*
         * function to prepopulate fileds when Edit flow is triggered
         */
        populatefields: function(userData) {
            var phoneNumber, phoneCC, phone = userData.phoneNumber || "";
            var DOB = userData.dob;
            if (DOB.includes("-")) {
                DOB = CommonUtilities.getFrontendDateString(DOB, applicationManager.getFormatUtilManager().getDateFormat()) || "";
                DOB = DOB.replaceAll("-", "/");
            } else if (DOB.includes("/")) {
                DOB = DOB.replaceAll("/", "-");
                DOB = CommonUtilities.getFrontendDateString(DOB, applicationManager.getFormatUtilManager().getDateFormat()) || "";
                DOB = DOB.replaceAll("-", "/");
            }
            if (phone.includes("-")) {
                var index = phone.indexOf("-");
                phoneNumber = phone.substring(index + 1, phone.length);
                phoneCC = phone.substring(0, index);
                this.view.tbxCode.text = phoneCC || "";
                this.view.tbxPhoneNum.text = phoneNumber || "";
            } else {
                this.view.tbxCode.text = userData.phoneCountryCode || "";
                this.view.tbxPhoneNum.text = userData.phoneNumber || "";
            }
            this.view.tbxName.text = userData.firstName || "";
            this.view.tbxMiddleName.text = userData.middleName || "";
            this.view.tbLastName.text = userData.lastName || "";
            this.view.DateInput.setText("");
            this.view.DateInput.lblDatePlaceholderKA.isVisible = false;
            this.view.DateInput.tbxDateInputKA.text = DOB;
            //this.view.DateInput.setText((userData.dob).replaceAll("/",""));
            this.view.tbxEmail.text = userData.email || "";
            this.view.tbxSSN.text = userData.ssn || "";
            this.view.tbxDriversLicense.text = userData.drivingLicenseNumber || "";
            this.validateUserDetails();
        },
        getFormattedDOB: function(DOB) {
            if (DOB.includes("/")) {
                DOB = DOB.replaceAll("/", "-");
            }
            return DOB;
        },
        disableFields: function() {
            this.view.lblDOB.isVisible = false;
            this.view.lblEmail.isVisible = false;
            this.view.lblPhoneNum.isVisible = false;
            this.view.lblSSN.isVisible = false;
            this.view.flxDOB.isVisible = false;
            this.view.flxEmail.isVisible = false;
            this.view.flxMainPhnNo.isVisible = false;
			this.view.flxMainPhnNo.height = "0dp";			
            this.view.flxSSN.isVisible = false;
        },
        /*
         *Function to reset fields
         */
        resetAddrecipientData: function() {
            this.view.tbxName.text = "";
            this.view.tbxMiddleName.text = "";
            this.view.tbLastName.text = "";
            this.view.DateInput.setText("");
            this.view.tbxEmail.text = "";
            this.view.tbxCode.text = "";
            this.view.tbxPhoneNum.text = "";
            this.view.tbxSSN.text = "";
            this.view.tbxDriversLicense.text = "";
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
			this.view.flxErrorMessage.isVisible = false;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.flxErrorMessage.isVisible = false;
            this.view.lblDOB.isVisible = true;
            this.view.lblEmail.isVisible = true;
            this.view.lblPhoneNum.isVisible = true;
            this.view.lblSSN.isVisible = true;
            this.view.flxDOB.isVisible = true;
            this.view.flxEmail.isVisible = true;
            this.view.flxMainPhnNo.isVisible = true;
			this.view.flxMainPhnNo.height = "50dp";
            this.view.flxSSN.isVisible = true;
            this.view.DateInput.lblDatePlaceholderKA.isVisible = false;
            this.view.flxDOB.skin = "skne3e3e3br3pxradius";
            FormControllerUtility.disableButton(this.view.btnProceedCreate);
        },
        /**
         * Method to display error message
         */
        setErrorMessaage: function(context) {
            if (context.show) {
                CommonUtilities.setText(this.view.lblError, kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.StopPayments.errormessages.InvalidDetails"), CommonUtilities.getaccessibilityConfig());
                this.view.flxErrorMessage.setVisibility(true);
                this.view.flxErrorMessage.setFocus();
                this.view.forceLayout();
                //this.adjustScreen();        
            } else {
                if (this.view.flxErrorMessage.isVisible !== false) {
                    this.view.flxErrorMessage.setVisibility(false);
                    this.view.forceLayout();
                    //this.adjustScreen();
                }
            }
        },
        /**
         * Method will validate the entered DOB
         */
        isDobValid: function() {
            this.view.DateInput.lblDatePlaceholderKA.isVisible = false;
            if ((!CommonUtilities.isEmptyString(this.view.DateInput.getText())) && CommonUtilities.isValidDOB(this.view.DateInput.getText()) && this.validationUtilManager.isAgeValid(this.view.DateInput.getText())) {
                FormControllerUtility.disableButton(this.view.btnProceedCreate);
                this.setErrorMessaage({
                    show: false
                });
                this.view.flxDOB.skin = "skne3e3e3br3pxradius"; //Default skin
                this.validateUserDetails();
            } else {
                this.view.flxDOB.skin = "sknborderff0000error"; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.konybb.createUser.error.InvalidDOB"
                });
            }
        }, 
        /**
         * Method will execute on email text changed
         */
        onUserEmailChanged: function() {
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
                    this.validateUserDetails();
                }
            } else {
                this.validateUserDetails();
            }
        },
        /*
         */
        onEnteringCountryCode: function() {
            var countryCode = this.view.tbxCode.text;
            var validationUtilManager = applicationManager.getValidationUtilManager();
            if (countryCode != null || countryCode != undefined || countryCode != "") {
                if (countryCode.length == 1) {
                    if (countryCode != "+") this.view.tbxCode.text = "+" + this.view.tbxCode.text;
                    else this.view.tbxCode.text = "";
                } else if (countryCode.length > 1) {
                    if (countryCode.charAt(0) != "+") this.view.tbxCode.text = "+" + this.view.tbxCode.text;
                }
            }
            if (this.view.tbxCode.text.length > 0) {
                if (!this.validationUtilManager.isValidCountryCode(this.view.tbxCode.text)) {
                    FormControllerUtility.disableButton(this.view.btnProceedCreate);
                    this.view.tbxCode.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                    this.setErrorMessaage({
                        show: true,
                        errMsgi18nKey: "i18n.UserManagement.notValidCountryCode"
                    });
                } else {
                    this.setErrorMessaage({
                        show: false
                    });
                    this.view.tbxCode.skin = "sknSSP42424215Opacity0"; //Default skin
                    this.validateUserDetails();
                }
            } else {
                this.validateUserDetails();
            }
        },
        /**
         * function  validateCountryCode
         ** verifies weather countryCodee is valid or not
         */
        ValidateCountryCode: function(countryCode) {
            return (countryCode.charAt(0) == "+" && countryCode.length > 1);
        },
        /**
         * Method will validate the entered phone number
         */
        onEnteringPhoneNumber: function() {
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
                    this.validateUserDetails();
                }
            } else {
                this.validateUserDetails();
            }
        },
        /**
         * Method will validate the ssn number on text changed
         */
        onEnteringSSN: function() {
            if (this.view.tbxSSN.text.length > 0) {
                if (!this.validationUtilManager.isValidSSNNumber(this.view.tbxSSN.text)) {
                    FormControllerUtility.disableButton(this.view.btnProceedCreate);
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
                    this.validateUserDetails();
                }
            } else {
                this.validateUserDetails();
            }
        },
        /**
         * Method will validate the DrivingLicenseNumber number on text changed
         */
        onEnteringDrivingLicenseNumber: function() {
            if (this.view.tbxDriversLicense.text.length > 0) {
                if (!this.validationUtilManager.isValidDrivingLicenseNumber(this.view.tbxDriversLicense.text)) {
                    this.view.tbxDriversLicense.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                    this.setErrorMessaage({
                        show: true,
                        errMsgi18nKey: "i18n.login.incorrectDrivingLicenseNumber"
                    });
                } else {
                    this.setErrorMessaage({
                        show: false
                    });
                    this.view.tbxDriversLicense.skin = "sknSSP42424215Opacity0"; //Default skin
                    this.validateUserDetails();
                }
            } else {
                this.validateUserDetails();
            }
        },
        /**
         * validate all user details
         * @return {boolean} true:if all the user details are correct ,false: if user details are not valid
         */
        validateUserDetails: function() {
            FormControllerUtility.disableButton(this.view.btnProceedCreate);
            if (CommonUtilities.isEmptyString(this.view.tbxName.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.tbLastName.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.tbxEmail.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.tbxCode.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.tbxPhoneNum.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.tbxSSN.text)) {
                return false;
            }
            if (CommonUtilities.isEmptyString(this.view.DateInput.getText()) || !this.validationUtilManager.isAgeValid(this.view.DateInput.getText()) || !CommonUtilities.isValidDOB(this.view.DateInput.getText())) {
                this.view.flxDOB.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.konybb.createUser.error.InvalidDOB"
                });
                return false;
            }
            if (!this.validationUtilManager.isValidEmail(this.view.tbxEmail.text)) {
                this.view.tbxEmail.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.konybb.createUser.error.InvalidEmail"
                });
                return false;
            }
            if (!this.validationUtilManager.isValidPhoneNumber(this.view.tbxPhoneNum.text)) {
                this.view.tbxPhoneNum.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.profile.notAValidPhoneNumber"
                });
                return false;
            }
            if (!this.validationUtilManager.isValidCountryCode(this.view.tbxCode.text)) {
                this.view.tbxCode.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.profile.notAValidPhoneNumber"
                });
                return false;
            }
            if (!this.validationUtilManager.isValidSSNNumber(this.view.tbxSSN.text)) {
                this.view.tbxSSN.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX; //Error skin
                this.setErrorMessaage({
                    show: true,
                    errMsgi18nKey: "i18n.login.incorrectSSN"
                });
                return false;
            }
            if (!CommonUtilities.isEmptyString(this.view.tbxDriversLicense.text)) {
                if (!this.validationUtilManager.isValidDrivingLicenseNumber(this.view.tbxDriversLicense.text)) {
                    return false;
                }
            }
            FormControllerUtility.enableButton(this.view.btnProceedCreate);
        },
        /**
         * function to navigate to nect form       
         */
        onRetriveExistingUserFlex: function() {
            this.view.flxDetailsContainer.setVisibility(false);
            this.view.flxRetriveExistingUsersContainer.setVisibility(true);
        },
        getUserData: function(userDetails) {
            // var coreCustomerId = this.selectedCompany.coreCustomerId;
            var phoneNumber, phoneCC, phone = userDetails.phone || "";
            if (phone.includes("-")) {
                var index = phone.indexOf("-");
                phoneNumber = phone.substring(index + 1, phone.length);
                phoneCC = phone.substring(0, index);
            }
            var data = {
                firstName: userDetails.firstName || "",
                middleName: userDetails.middleName || "",
                lastName: userDetails.lastName || "",
                dateOfBirth: this.getFormattedDOB(userDetails.dateOfBirth) || "",
                email: userDetails.email || "",
                phoneCountryCode: phoneCC || "",
                phone: phoneNumber || "",
                taxId: userDetails.taxId || "",
                drivingLicenseNumber: userDetails.drivingLicenseNumber || "",
                coreCustomerId: userDetails.coreCustomerId || ""
            };
            return data;
        },
        /**
         * Method to handle proceed button in user details form.
         */
        onUserDetailsProceedBtnClick: function() {
            var navMan=applicationManager.getNavigationManager();
            var selectedUserData = this.getUserData(this.selectedUser);
          	navMan.setCustomInfo("firstName", this.selectedUser.firstName);
            navMan.setCustomInfo("lastName", this.selectedUser.lastName);
            navMan.setCustomInfo("coreCustomerId", this.selectedUser.coreCustomerId);
            navMan.setCustomInfo("email", this.selectedUser.email);
            navMan.setCustomInfo("phone", this.selectedUser.phone);
            navMan.setCustomInfo("dateOfBirth", this.selectedUser.dateOfBirth);
            navMan.setCustomInfo("taxId", this.selectedUser.taxId);
            var isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            this.loadBusinessBankingModule().presentationController.updateUseObject(selectedUserData);

			retrieveExistingUserFlag = true;
            navMan.setCustomInfo("retieveFlag", retrieveExistingUserFlag);
            if(retrieveExistingUserFlag) {
            for(var i=0; i<userDataDetails.length;i++) {

                if(userDataDetails[i].isProfileExists === "true"){
              		navMan.setCustomInfo("frmCreateUserManually",{"isProfileExists":"true"});
              		this.loadBusinessBankingModule().presentationController.userManagementData.userDetails.id = selectedUserData.id;
            	}
                else {
              		navMan.setCustomInfo("frmCreateUserManually",{"isProfileExists":"false"});
            		this.loadBusinessBankingModule().presentationController.setUserCreationFlow(OLBConstants.USER_MANAGEMENT_TYPE.EXISTING);
                }
              
             }
            }

//             if(this.isProfileExists === "true"){
//               navMan.setCustomInfo("frmCreateUserManually",{"isProfileExists":"true"});
//               this.loadBusinessBankingModule().presentationController.userManagementData.userDetails.id = selectedUserData.id;
//             }
//             if(this.isProfileExists === "false"){
//               navMan.setCustomInfo("frmCreateUserManually",{"isProfileExists":"false"});
//             }
//             this.loadBusinessBankingModule().presentationController.setUserCreationFlow(OLBConstants.USER_MANAGEMENT_TYPE.EXISTING);
          
            if (isEditFlow) {
               applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
            } else {
               navMan.setCustomInfo("createSkipFlow","createSkipFlow");
               applicationManager.getNavigationManager().navigateTo("frmBBCopyPermission");
            }
          },
        /**
         * Method to show error while SSN already exists in the backend
         */
        showSSNExistsError: function() {
            this.setErrorMessaage({
                show: true,
                errMsgi18nKey: "i18n.userManagement.SSNExistsError"
            });
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
        showErrorMsg: function(context) {
            this.setErrorMessaage({
                show: true,
                errMsgi18nKey: context.errorMessage
            });
        },
        /**
         * Method to check OFACCheck
         */
        onValidSSN: function() {
            var scope = this;
            var data = scope.enteredData();
            this.loadBusinessBankingModule().presentationController.UserOFACCheck(data);
        },
        validateUMIdentificationNumber: function() {
            var data = this.enteredData();
            this.loadBusinessBankingModule().presentationController.updateUseObject(data);
            this.loadBusinessBankingModule().presentationController.setUserCreationFlow(OLBConstants.USER_MANAGEMENT_TYPE.MANUAL);
            this.loadBusinessBankingModule().presentationController.UserOFACCheck(data);
        },
        updateUserDataEdit: function() {
            this.tempData = this.loadBusinessBankingModule().presentationController.getUserManagementData().userDetails;
            this.tempData.firstName = this.view.tbxName.text;
            this.tempData.middleName = this.view.tbxMiddleName.text;
            this.tempData.lastName = this.view.tbLastName.text;
            this.tempData.drivingLicenseNumber = this.view.tbxDriversLicense.text;
            applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
        },
        /*
         *navigate to next form
         */
        navigateToCopyPermission: function() {
            applicationManager.getNavigationManager().navigateTo("frmBBCopyPermission");
        },
        /*
         *function is called after the OFACCheck success
         */
        onOFACCheckSucces: function() {
            var scope = this;
            var data = scope.enteredData();
            var isEditFlow = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            this.loadBusinessBankingModule().presentationController.updateUseObject(data);
            if (isEditFlow) {
                applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
            } else {
              var navMan=applicationManager.getNavigationManager();
              
              navMan.setCustomInfo("createSkipFlow","createSkipFlow");
              navMan.setCustomInfo("createManualFlow","createManualFlow");
              navMan.setCustomInfo("firstName",data.firstName);
              navMan.setCustomInfo("lastName",data.lastName);
              navMan.setCustomInfo("middleName",data.middleName);
              navMan.setCustomInfo("coreCustomerId",data.coreCustomerId);
              navMan.setCustomInfo("email",data.email);
              navMan.setCustomInfo("phone",data.phone);
              navMan.setCustomInfo("phoneCountryCode",data.phoneCountryCode);
              navMan.setCustomInfo("dateOfBirth",data.dateOfBirth);
              navMan.setCustomInfo("taxId",data.taxId);
              navMan.setCustomInfo("drivingLicenseNumber",data.drivingLicenseNumber)
                applicationManager.getNavigationManager().navigateTo("frmBBCopyPermission");
            }
        },
        onCancelClick: function() {
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (flowType === true) {
                this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
                this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
            } else {
                this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
            }
        },
    };
});