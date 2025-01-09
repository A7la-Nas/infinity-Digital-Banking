define( ["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var responsiveUtils = new ResponsiveUtils();
    var orientationHandler = new OrientationHandler();
    var userManagementData = {};
    var userCompanies = {};
    var selectedCompanyDetails = {};
    var selectedCompanyIndex = {};
    var accounts = {};
    var accountSegmentData = {};
    var showAccountsFlag = true;
	var index = 0;
    
    return {
        /*closedTemplate: "flxCreateTempSelectRecipients",
                                                    selectedTemplate: "flxCreateTempSelectRecipientsSelected",
                                                    selectedRecordsID : new Set(),
                                                    RecipientResponse : "",
                                                    WireRecipientResponse : "",
                                                    searchResponse: "",*/
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.btnSkip.onClick = this.onCancelClick;
            this.view.btnBackAccessRoles.onClick = this.onBackClick;
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            this.view.btnCancelRoles.onClick = function() {
                scopeObj.navToNextForm();
            };
        },
        onBreakpointChange: function(form, width) {
            this.view.customheadernew.onBreakpointChangeComponent(width);
            var data = this.view.segCompanyNames.data;
            this.view.segCompanyNames.setData(data);
            data = this.view.segUserNames.data;
            this.view.segUserNames.setData(data);
        },
        preShow: function() {
            var scope=this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
          if(kony.i18n.getCurrentLocale()=== "ar_AE"){
            this.view.lblName.right = "85%";
            this.view.lblSelectedValue.right = "15px"; 
            this.view.lblSelected.left="60%";
        }
        this.view.flxAddUser.setVisibility(false);
          this.view.flxAccountName.left="19dp";
          this.view.CopyflxSeparatorSort0g00981b909044b.left = "20dp";
          this.view.CopyflxSeparatorSort0g00981b909044b.width="97%";
        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole");
        this.view.customheadernew.btnSkipNav.onClick = function() {
            scope.view.lblContentHeader.setActive(true);
        }
        this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                
                if (self.view.flxDialogs.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setActive(true);
                }
               
            }
        },
        postShow: function() {
            this.onBreakpointChange();
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            this.view.btnCancelRoles.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
            this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
            this.view.btnBackAccessRoles.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
            this.view.btnSkip.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.flowConfig = this.loadBusinessBankingModule().presentationController.getFlowConfigs();
            this.userManagementFlow = this.flowConfig.userManagementFlow || '';
            this.userCreationFlow = this.flowConfig.userCreationFlow || '';
            this.userPermissionFlow = this.flowConfig.userPermissionFlow || '';
            this.userNavigationType = this.flowConfig.userNavigationType || '';
            if (flowType) {
                this.view.btnCancelRoles.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
            }
            var navMan=applicationManager.getNavigationManager();
            var skipFlow = navMan.getCustomInfo("createSkipFlow");
            var isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
            if(skipFlow === "createSkipFlow"){
                if (isAddToEntityFlow === "addToEntity") {
                    this.onContinue();
                }
               var userPreferencesManager = applicationManager.getUserPreferencesManager();
               var userIdVal = userPreferencesManager.getUserId();
			   let contractId = applicationManager.getNavigationManager().getCustomInfo("currContractId");
               this.loadBusinessBankingModule().presentationController.getInfinityUserServiceDefsRoles(userIdVal,contractId);
            }
            else{
               this.setAccountAccessRole();
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.lblRecipientName.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
            this.view.Search.txtSearch.placeholder = "Search by Account";

        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.manageRecipients) {
                    //var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("WireTransferNew");
                    //var selectedRecipientData = wireTransferModule.presentationController.selectedRecipients;
                    //this.WireRecipientView(viewModel.manageRecipients.recipients, selectedRecipientData);
                }
                if (viewModel.createUserManagementDataFailure) {
                    this.view.flxDowntimeWarning.isVisible = true;
                    this.view.rtxDowntimeWarning.text = viewModel.createUserManagementDataFailure;
                }
                if (viewModel.createUserManagementDataSuccess) {
                    this.navToNextForm();
                }
               if(viewModel.updateInfinityUserSuccess){
                  this.callAccountAccessData(viewModel.updateInfinityUserSuccess);
                }
              if(viewModel.updateInfinityUserFailure){
				  this.accountAccessDataFailure(viewModel.updateInfinityUserFailure);
                }
              if(viewModel.updateInfinityRoleSuccess){
                var accountAccessEdit = applicationManager.getNavigationManager().getCustomInfo("accountAccessEdit");
                if(accountAccessEdit === "accountAccess")
                {
                  applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                }
                else
                {
                  this.callAccountAccessData();
                }
              }
              if(viewModel.contractDetails){
                let navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("contractDetails", viewModel.contractDetails);
                FormControllerUtility.hideProgressBar(this.view);
                this.getUserAccounts();
              }
              if (viewModel.userAccounts) {
                let navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("userAccounts", viewModel.userAccounts);
                FormControllerUtility.hideProgressBar(this.view);
                applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                FormControllerUtility.showProgressBar(this.view);
              }
              if(viewModel.infinityUserServiceDefsRoles){
                this.skipFlowCompanyListData = viewModel.infinityUserServiceDefsRoles;
                var userPreferencesManager = applicationManager.getUserPreferencesManager();
                var userIdVal = userPreferencesManager.getUserId();
				let contractId = applicationManager.getNavigationManager().getCustomInfo("currContractId");
				contractId = contractId ? contractId : '' ;
                this.loadBusinessBankingModule().presentationController.getInfinityUserAccounts(userIdVal,contractId,"skipFlow");
              }
              if (viewModel.getAccounts) {
                var getAccounts = viewModel.getAccounts;
                var self = this;
                var getAccountsValues = [];
                this.skipFlowCompanyListData.companyList.forEach(function(data){
                  getAccounts.contracts.forEach(function(acc){
					for(let i = 0; i < acc.contractCustomers.length;i++) {
						if(data.coreCustomerId === acc.contractCustomers[i].id){
							getAccountsValues.push(acc);
						}
					}
                  });
                });
                this.getAccounts = getAccountsValues;
                this.setAccountAccessRole();
              }             
            }
            this.view.forceLayout();
        },
        
        getUserAccounts : function(){
        var navManager =  applicationManager.getNavigationManager();
        var userId = navManager.getCustomInfo('userId');
		let contractId = applicationManager.getNavigationManager().getCustomInfo("currContractId");
		contractId = contractId ? contractId : '' ;
        this.loadBusinessBankingModule().presentationController.getInfinityUserAccounts(userId,contractId,"autoSync");
        },
        callAccountAccessData: function(updateUserStatus){
           var navManager =  applicationManager.getNavigationManager();
           var userId = navManager.getCustomInfo('userId');
           navManager.setCustomInfo('editUserFlow',"editFlow");
           navManager.setCustomInfo('getInfinityUser',"false");
		   if(updateUserStatus !== undefined && updateUserStatus !== null) {
		        navManager.setCustomInfo('updateSuccessData',updateUserStatus);
           }
           this.loadBusinessBankingModule().presentationController.getContractDetails(userId,"autoSync");
         },
      	accountAccessDataFailure : function(updateUserStatus) {
			var navManager =  applicationManager.getNavigationManager();
			navManager.setCustomInfo('updateSuccessData',updateUserStatus);
			applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
		},
        showServerError: function(errmsg) {},
        setAccountAccessRole: function() {
          var navMan=applicationManager.getNavigationManager();
          var skipFlow = navMan.getCustomInfo("createSkipFlow");
          if(skipFlow !== "createSkipFlow"){
            this.userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          }
          else{
            this.userManagementData = this.skipFlowCompanyListData;
          }         
          if(this.userManagementData.companyList.length < 1){
            this.view.flxNoRecords.isVisible = true;
            this.view.flxSelectRole.isVisible = false;
          }else{
            this.view.flxNoRecords.isVisible = false;
            this.view.flxSelectRole.isVisible = true;
            this.userManagementData.companyList = CommonUtilities.sortAndSearchJSON(this.userManagementData.companyList, "companyName", "ASC", null, null);
            isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
            var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
            var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
            if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
              if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
              } else {
                this.view.customheadernew.activateMenu("User Management", "User Roles");
              }
       			if(this.userManagementData.userDetails !== undefined)
				{                
                	this.view.lblName.isVisible = true;
                	this.view.lblEmail.isVisible = true;
               	 	var userFullName = this.userManagementData.userDetails[i].firstName + " " + this.userManagementData.userDetails[i].lastName;
                	var userMailId = this.userManagementData.userDetails[i].email;
                    this.view.lblName.text = userFullName;
                	//CommonUtilities.setText(this.view.lblName, userFullName, CommonUtilities.getaccessibilityConfig());
                	var navManager = applicationManager.getNavigationManager();
                	navManager.setCustomInfo("CustomerName", userFullName);
                    this.view.lblEmail.text = userMailId;
                	//CommonUtilities.setText(this.view.lblEmail, userMailId, CommonUtilities.getaccessibilityConfig());
                	navManager.setCustomInfo("CustomerEmailId", userMailId);
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole");
                    this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole");
                 	// CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole"), CommonUtilities.getaccessibilityConfig());
                 	// CommonUtilities.setText(this.view.lblHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole"), CommonUtilities.getaccessibilityConfig());
                }
              	else
                {
                  this.view.lblName.isVisible = false;
                  this.view.lblEmail.isVisible = false;
                  this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole");
                  this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole");
                //   CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole"), CommonUtilities.getaccessibilityConfig());
                //   CommonUtilities.setText(this.view.lblHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole"), CommonUtilities.getaccessibilityConfig());
                }
            } else {
              if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                this.view.customheadernew.activateMenu("User Management", "Create UM User");
              } else {
                this.view.customheadernew.activateMenu("User Management", "All Users");
              }
                if(this.userManagementData.userDetails[i] !== undefined)
                {
                    this.view.lblName.isVisible = true;
                    this.view.lblEmail.isVisible = true;
                    var userfullName = this.userManagementData.userDetails[i].firstName + " " + this.userManagementData.userDetails[i].lastName;
                    var usermailId = this.userManagementData.userDetails[i].email;
                    this.view.lblName.text = userFullName;
                    // CommonUtilities.setText(this.view.lblName, userfullName, CommonUtilities.getaccessibilityConfig());
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("CustomerName", userfullName);
                    this.view.lblEmail.text = userMailId;
                    //CommonUtilities.setText(this.view.lblEmail, usermailId, CommonUtilities.getaccessibilityConfig());
                    navManager.setCustomInfo("CustomerEmailId", usermailId);
                    if (isAddToEntityFlow === "addToEntity") {
                        this.view.lblContentHeader.text = "Account Access & User Role";
                        this.view.lblName.isVisible = false;
                      this.view.lblEmail.isVisible = false;
                      }else{
                        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole");
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("konybb.i18n.userMgmt.AccountAccess"), CommonUtilities.getaccessibilityConfig());
                      }
                      this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole");
                    //CommonUtilities.setText(this.view.lblHeader, kony.i18n.getLocalizedString("konybb.i18n.userMgmt.AssignAccountAccess"), CommonUtilities.getaccessibilityConfig());
                }
                else
                {
                    this.view.lblName.isVisible = false;
                    this.view.lblEmail.isVisible = false;
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole");
                    this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole");
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountAccesandUserRole"), CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_SelectAccountanduserRole"), CommonUtilities.getaccessibilityConfig());
                }
                
            }
            this.showAccountsFlag = OLBConstants.CLIENT_PROPERTIES.OLB_USER_MANGEMENT_ACCOUNT_LEVEL_SELECTION;
			//this.showAccountsFlag = "false" ;
            if (this.showAccountsFlag == "true" || this.showAccountsFlag == true) {
                this.view.flxRoleLeftContainer.isVisible = true;
				this.view.segCompanyNames.rowTemplate = "flxUserManagementSelectCompanyNames";
				 this.view.segCompanyNames.onRowClick = this.onCompanyRowClick;
            } else {
                this.view.flxRoleLeftContainer.isVisible = false;
                this.view.flxRightContainer.width = "100%";
				this.view.segCompanyNames.rowTemplate = "flxUserManagementAutoAccessEdit";
				
            }
            this.setCompanyNames();
            this.view.flxDropdown.onClick = this.selectOrDeselectAllAccount;
            this.view.Search.txtSearch.onTextChange = this.searchAccounts;
            this.view.flxSortAccountName.onClick = this.sortAccounts;
            this.view.btnReset.onClick = this.resetToDefault;
            this.view.btnCancelRoles.onClick = this.updateUMDataandNavigate;
        }          
          this.AdjustScreen();
        },
		enableAcessPermission : function (rowIndex){
			var data = this.view.segCompanyNames.data ;
			if(data[rowIndex].lblSwitch.skin === "sknfonticontoggleON45px" || data[rowIndex].lblSwitch.text === "n" ){
				data[rowIndex].lblSwitch.skin = "skn727272fonticons";
				data[rowIndex].lblSwitch.text = "m" ;
				 this.userManagementData.companyList[rowIndex].autoSyncAccounts = "false";
                this.userCompanies[rowIndex].autoSyncAccounts = "false";
				data[rowIndex].flxRow.skin = "sknflxfbfbfb1pxShadowc0c0c0" ;
				
			}else{
				data[rowIndex].lblSwitch.skin = "sknfonticontoggleON45px";
				data[rowIndex].lblSwitch.text = "n" ;
				 this.userManagementData.companyList[rowIndex].autoSyncAccounts = "true";
                 this.userCompanies[rowIndex].autoSyncAccounts = "true";
				 data[rowIndex].flxRow.skin = "sknfbfbfb" ;
			}
			
			this.view.segCompanyNames.setDataAt(data[rowIndex],rowIndex) ;
		},
        onCompanyRowClick: function() {
            this.index = this.view.segCompanyNames.selectedRowIndex[1];
            this.selectCompanyandShowAccounts(this.index);
        },
        setCompanyNames: function() {
            var companies = JSON.parse(JSON.stringify(this.userManagementData.companyList));
          	var formattedComapnyData;
         	var navMan=applicationManager.getNavigationManager();
          	var skipFlow = navMan.getCustomInfo("createSkipFlow");
          	if(skipFlow === "createSkipFlow")
            	formattedComapnyData = this.getFormattedDataforCompanySkipFlow(companies);
          	else
            	formattedComapnyData = this.getFormattedDataforCompany(companies);	
            //var formattedComapnyData = this.getFormattedDataforCompany(companies);
             var dataMap = {
                "flxDropdown": "flxDropdown",
                "lblDropdown": "lblDropdown",
                "lblRecipientName": "displayName",
               "lblAutoAcess" : "lblAutoAcess",
				"imgAutoInfo" : "imgAutoInfo",
                "lblAccountsSelectedType": "lblAccountsSelectedType",
                "lblAccountsValue": "lblAccountsValue",
                "lblSeparator": "lblSeparator",
                "lblUserRoleLabel": "lblUserRoleLabel",
                "lblAccountsSelected": "lblAccountsSelected",
                "imgArrow": "imgArrow",
                "companyName": "companyName",
                "ListBox1": "ListBox1",
                "contractId": "contractId",
                "contractName": "contractName",
                "cif": "cif",
                "isPrimary": "isPrimary",
                "serviceDefinition": "serviceDefinition",
                "userRoles": "userRoles",
                "userRole": "userRole",
                "accounts": "accounts",
                "flxRow": "flxRow",
                "flxWrapper": "flxWrapper",
                "flxUserManagementSelectCompanyNames": "flxUserManagementSelectCompanyNames",
                "isEnabled": "isEnabled",
                "lblSwitch": "lblSwitch",
				"flxPermission" : "flxPermission"
            };
            this.view.segCompanyNames.widgetDataMap = dataMap;
            this.showSelectedAccountsCount();
            this.enableContinueButton();
            this.view.segCompanyNames.setData(formattedComapnyData);
			var scope = this ;
//             this.view.flxSwitch.left="68dp";
			 this.view.flxSwitch.onClick = function() {
                scope.updateAutoAccess();
            };
            this.selectCompanyandShowAccounts(0);
            this.AdjustScreen();
        },
		 updateAutoAccess: function() {

            if (this.index === undefined) {
                this.index = 0;
            }
            if (this.view.lblSwitch.skin === "sknfonticontoggleON45px" && this.view.lblSwitch.text === "n") {
                this.view.flxSwitch.accessibilityConfig ={
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "radio",
                        "aria-checked": false,
                        "aria-labelledby": "lblAutoAcess"
                    }
                    
                }
                this.view.lblSwitch.skin = "skn727272fonticons";
                this.view.lblSwitch.text = "m";
                this.userManagementData.companyList[this.index].autoSyncAccounts = "false";
                this.userCompanies[this.index].autoSyncAccounts = "false";
            } else {
                this.view.flxSwitch.accessibilityConfig ={
                    "a11yARIA": {
                    "tabindex": 0,
                    "role": "radio",
                    "aria-checked": true,
                    "aria-labelledby": "lblAutoAcess"
                    }
                
            }
                this.view.lblSwitch.skin = "sknfonticontoggleON45px";
                this.view.lblSwitch.text = "n";
                this.userManagementData.companyList[this.index].autoSyncAccounts = "true";
                this.userCompanies[this.index].autoSyncAccounts = "true";
            }
            this.view.flxSwitch.setActive(true);
        },
         getFormattedDataforCompany: function(companies) {
            var scopeObj = this;
            var count = 0;
            var navMan=applicationManager.getNavigationManager();
            var skipFlow = navMan.getCustomInfo("createSkipFlow");
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            for (var i = 0; i < companies.length; i++) {
              //for(var j=0;j<this.getAccounts[0].contractCustomers.length;j++){
                //if(this.getAccounts[0].contractCustomers[j].id === companies[i].coreCustomerId){
                companies[i].accounts = (skipFlow === "createSkipFlow" ? this.getAccounts[0].contractCustomers[0].coreCustomerAccounts : companies[i].accounts);
                companies[i].totalAccounts = (skipFlow === "createSkipFlow" ? this.getAccounts[0].contractCustomers[0].coreCustomerAccounts.length : companies[i].accounts.length);
                companies[i].enabledAccounts = 0;
                companies[i].companyAccountStatus = "";
                companies[i].flxListBox = {
                    "isVisible": false
                };
                companies[i].displayName = (skipFlow === "createSkipFlow" ? companies[i].coreCustomerName : companies[i].companyName) + " - " + (skipFlow === "createSkipFlow" ? companies[i].coreCustomerId : companies[i].cif);
                companies[i].flxRow = {           
                    "skin": (this.showAccountsFlag === "true" )? "skne3e3e3br3pxradius" : (companies[i].autoSyncAccounts === "false")?"sknflxfbfbfb1pxShadowc0c0c0": "skne3e3e3br3pxradius" ,
                };
              companies[i].lblAutoAcess = {
					"isVisible":true
				};
				companies[i].imgAutoInfo = {
					"isVisible" : true
				};
                companies[i].imgArrow = {
                    "isVisible": false
                };
                companies[i].ListBox1 = {
                    "enable": false,
                    "isVisible": false,
                    "onSelection": function() {},
                    "masterData": {},
                    selectedKey: "",
                    "userRole": "",
                    "userRoles": ""
                };
                companies[i].lblAccountsSelectedType = {
                    "isVisible": false,
                    "text": ""
                };
                companies[i].lblUserRoleLabel = {
                    "isVisible": false
                };
                companies[i].lblAccountsValue = {
                    "text": "0"
                };
                companies[i].lblDropdown = {
                    "text": "D"
                };
                companies[i].flxDropdown = {
                    "enable": false,
                    onClick: scopeObj.onCompanySelectCheckBox.bind(this, i)
                };
                if (companies[i].totalAccounts != 0) {
                    companies[i].flxListBox = {
                        "isVisible": true
                    };
                    var userRole = companies[i].userRole;
                    var selectedKeyRole = "SELECT_USER";
                    if (userRole != "") {
                        selectedKeyRole = this.getIndexofSelectedRole(companies[i].validRoles, userRole);
                    }
                    if (companies[i].validRoles.length > 0) {
                        companies[i].ListBox1 = {
                            "enable": true,
                            "isVisible": true,
                            "onSelection": scopeObj.onUserRoleSelect.bind(this, i),
                            "masterData": scopeObj.getUserRoles(companies[i].validRoles),
                            selectedKey: selectedKeyRole,
                            "userRole": userRole,
                            "validRoles": companies[i].validRoles,
                        };
                    }
                    companies[i].flxDropdown = {
                        "enable": true,
                        onClick: scopeObj.onCompanySelectCheckBox.bind(this, i)
                    };
                    companies[i].enabledAccounts = scopeObj.getEnabledAccountsCount(skipFlow === "createSkipFlow" ? this.getAccounts[0].contractCustomers[0].coreCustomerAccounts : companies[i].accounts);
                    if (companies[i].enabledAccounts <= 0) {
                        companies[i].ListBox1.enable = false;
                    }
                    if (companies[i].enabledAccounts > 0) {
                        companies[i].isEnabled = "true";
                        companies[i].lblDropdown = {
                            "text": "C"
                        };
                        count = count + 1;
                    } else {
                        companies[i].lblDropdown = {
                            "text": "D"
                        };
                        companies[i].isEnabled = "false";
                    }
                    companies[i].companyAccountStatus = scopeObj.getComapnyAccountStatus(companies[i].enabledAccounts, companies[i].totalAccounts);
                    companies[i].lblAccountsValue = {
                        "text": companies[i].enabledAccounts + " of " + companies[i].totalAccounts
                    };
                    companies[i].lblAccountsSelectedType = {
                        "isVisible": true,
                        "text": "(" + companies[i].companyAccountStatus + ")"
                    };
                    companies[i].lblUserRoleLabel = {
                        "isVisible": true
                    };
					companies[i].flxPermission = {
						"onClick" : scopeObj.enableAcessPermission.bind(this,i),
						"isVisible" : true,
					};
                }
                 companies[i].lblSwitch = {
                    "skin": (flowType && (companies[i].autoSyncAccounts === "true")) ? "sknFontIconCheckBoxSelected30" : "sknFontIconCheckBoxSelected40cdcdcd",
                    "text": (flowType && (companies[i].autoSyncAccounts === "true")) ? "m" : "n"
                };
                //}
            //}
            }
            this.view.lblSelectedValue.text = count;
            //CommonUtilities.setText(this.view.lblSelectedValue, count + "", CommonUtilities.getaccessibilityConfig());
            this.userCompanies = companies;
            return companies;
        },
      
      getFormattedDataforCompanySkipFlow: function(companies) {
            var scopeObj = this;
            var count = 0;
            var navMan=applicationManager.getNavigationManager();
            var skipFlow = navMan.getCustomInfo("createSkipFlow");
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            for (var i = 0; i < companies.length; i++) {
              for(var j=0;j<this.getAccounts[i].contractCustomers.length;j++){
                if(this.getAccounts[i].contractCustomers[j].id === companies[i].coreCustomerId){
                companies[i].accounts = (skipFlow === "createSkipFlow" ? this.getAccounts[i].contractCustomers[0].coreCustomerAccounts : companies[i].accounts);
                companies[i].totalAccounts = (skipFlow === "createSkipFlow" ? this.getAccounts[i].contractCustomers[0].coreCustomerAccounts.length : companies[i].accounts.length);
                companies[i].enabledAccounts = 0;
                companies[i].companyAccountStatus = "";
                companies[i].flxListBox = {
                    "isVisible": false
                };
                companies[i].displayName = (skipFlow === "createSkipFlow" ? companies[i].coreCustomerName : companies[i].companyName) + " - " + (skipFlow === "createSkipFlow" ? companies[i].coreCustomerId : companies[i].cif);
                companies[i].flxRow = {           
                    "skin": (this.showAccountsFlag === "true" )? "skne3e3e3br3pxradius" : (companies[i].autoSyncAccounts === "false")?"sknflxfbfbfb1pxShadowc0c0c0": "skne3e3e3br3pxradius" ,
                };
              companies[i].lblAutoAcess = {
					"isVisible":true
				};
				companies[i].imgAutoInfo = {
					"isVisible" : true
				};
                companies[i].imgArrow = {
                    "isVisible": false
                };
                companies[i].ListBox1 = {
                    "enable": false,
                    "isVisible": false,
                    "onSelection": function() {},
                    "masterData": {},
                    selectedKey: "",
                    "userRole": "",
                    "userRoles": ""
                };
                companies[i].lblAccountsSelectedType = {
                    "isVisible": false,
                    "text": ""
                };
                companies[i].lblUserRoleLabel = {
                    "isVisible": false
                };
                companies[i].lblAccountsValue = {
                    "text": "0"
                };
                companies[i].lblDropdown = {
                    "text": "D"
                };
                companies[i].flxDropdown = {
                    "enable": false,
                    onClick: scopeObj.onCompanySelectCheckBox.bind(this, i)
                };
                if (companies[i].totalAccounts != 0) {
                    companies[i].flxListBox = {
                        "isVisible": true
                    };
                    var userRole = companies[i].userRole;
                    var selectedKeyRole = "SELECT_USER";
                    if (userRole != "") {
                        selectedKeyRole = this.getIndexofSelectedRole(companies[i].validRoles, userRole);
                    }
                    if (companies[i].validRoles.length > 0) {
                        companies[i].ListBox1 = {
                            "enable": true,
                            "isVisible": true,
                            "onSelection": scopeObj.onUserRoleSelect.bind(this, i),
                            "masterData": scopeObj.getUserRoles(companies[i].validRoles),
                            selectedKey: selectedKeyRole,
                            "userRole": userRole,
                            "validRoles": companies[i].validRoles,
                        };
                    }
                    companies[i].flxDropdown = {
                        "enable": true,
                        onClick: scopeObj.onCompanySelectCheckBox.bind(this, i)
                    };
                    companies[i].enabledAccounts = scopeObj.getEnabledAccountsCount(skipFlow === "createSkipFlow" ? this.getAccounts[i].contractCustomers[0].coreCustomerAccounts : companies[i].accounts);
                    if (companies[i].enabledAccounts <= 0) {
                        companies[i].ListBox1.enable = false;
                    }
                    if (companies[i].enabledAccounts > 0) {
                        companies[i].isEnabled = "true";
                        companies[i].lblDropdown = {
                            "text": "C"
                        };
                        count = count + 1;
                    } else {
                        companies[i].lblDropdown = {
                            "text": "D"
                        };
                        companies[i].isEnabled = "false";
                    }
                    companies[i].companyAccountStatus = scopeObj.getComapnyAccountStatus(companies[i].enabledAccounts, companies[i].totalAccounts);
                    companies[i].lblAccountsValue = {
                        "text": companies[i].enabledAccounts + " of " + companies[i].totalAccounts
                    };
                    companies[i].lblAccountsSelectedType = {
                        "isVisible": true,
                        "text": "(" + companies[i].companyAccountStatus + ")"
                    };
                    companies[i].lblUserRoleLabel = {
                        "isVisible": true
                    };
					companies[i].flxPermission = {
						"onClick" : scopeObj.enableAcessPermission.bind(this,i),
						"isVisible" : true,
					};
                }
                 companies[i].lblSwitch = {
                    "skin": (flowType && (companies[i].autoSyncAccounts === "true")) ? "sknFontIconCheckBoxSelected30" : "sknFontIconCheckBoxSelected40cdcdcd",
                    "text": (flowType && (companies[i].autoSyncAccounts === "true")) ? "m" : "n"
                };
                }
            }
            }
            this.view.lblSelectedValue.text = count;
            //CommonUtilities.setText(this.view.lblSelectedValue, count + "", CommonUtilities.getaccessibilityConfig());
            this.userCompanies = companies;
            return companies;
        },
        getComapnyAccountStatus: function(enabledAccounts, totalAccounts) {
            if (enabledAccounts === totalAccounts) return kony.i18n.getLocalizedString("i18n.UserManagement.AccountDefault");
            else return kony.i18n.getLocalizedString("i18n.UserManagement.Custom");
        },
        getEnabledAccountsCount: function(account) {
            var count = 0;
            for (var i = 0; i < account.length; i++) {
                if (account[i].isEnabled === true || account[i].isEnabled === "true") {
                    count = count + 1;
                }
            }
            return count;
        },
        getUserRoles: function(userRoles) {
            var roles = [];
            var key = "SELECT_USER";
            var data = [key];
            data.push(kony.i18n.getLocalizedString("i18n.userManagement.selectUserRole"));
            roles.push(data);
            for (var i = 0; i < userRoles.length; i++) {
                var key = userRoles[i].roleId;
                var data = [key];
                data.push(userRoles[i].userRole);
                roles.push(data);
            }
            return roles;
        },
        getIndexofSelectedRole: function(userRoles, selectedRole) {
            for (var i = 0; i < userRoles.length; i++) {
                if (userRoles[i].userRole === selectedRole) {
                    return userRoles[i].roleId;
                }
            }
            return "SELECT_USER";
        },
        onComapnySelectCheckBox: function(index) {
          
            if (this.userCompanies[index].lblDropdown.text === "D") {
                this.userCompanies[index].flxDropdown.accessibilityConfig ={
                    "a11yARIA": {
                        "aria-checked": true,
                        "role": "checkbox",
                        "tabindex": 0,
                        "aria-labelledby": "lblRecipientName"
                    }
                }
                this.userCompanies[index].lblDropdown.text = "C";
                this.userCompanies[index].ListBox1.enable = true;
                this.userCompanies[index].isEnabled = "true";
                for (var i = 0; i < this.userCompanies[index].accounts.length; i++) {
                    this.userCompanies[index].accounts[i].isEnabled = "true";
                }
                this.userCompanies[index].enabledAccounts = this.userCompanies[index].totalAccounts;
            } else {
                this.userCompanies[index].flxDropdown.accessibilityConfig ={
                   
                    "a11yARIA": {
                        "aria-checked": false,
                        "role": "checkbox",
                        "tabindex": 0,
                        "aria-labelledby": "lblRecipientName"
                    }
                }
                this.userCompanies[index].lblDropdown.text = "D";
                // this.userCompanies[index].ListBox1.selectedKey = "SELECT_USER";
                this.userCompanies[index].ListBox1.enable = false;
                this.userCompanies[index].isEnabled = "false";
                for (var i = 0; i < this.userCompanies[index].accounts.length; i++) {
                    this.userCompanies[index].accounts[i].isEnabled = "false";
                }
                this.userCompanies[index].enabledAccounts = "0";
            }
            this.enableContinueButton();
            this.showSelectedAccountsCount();
            this.view.segCompanyNames.setActive(index, -1, "flxUserManagementSelectCompanyNames.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxDropdown");
           
        },
        selectOrDeselectAllAccount: function() {
           
            var checkBoxStatus = "";
            
            if (this.view.lblDropdown.text === "C") {
                this.view.flxDropdown.accessibilityConfig ={
                    "a11yLabel" : "Select all companies",
                    "a11yARIA": {
                        "aria-checked": false,
                        "role": "checkbox",
                        "tabindex": 0
                    }
                }
                this.view.lblDropdown.text = "D";
                checkBoxStatus = "D";
            } else {
                this.view.flxDropdown.accessibilityConfig ={
                    "a11yLabel" : "Select all companies",
                    "a11yARIA": {
                        "aria-checked": true,
                        "role": "checkbox",
                        "tabindex": 0
                    }
                }
                this.view.lblDropdown.text = "C";
                checkBoxStatus = "C";
            }
            for (var i = 0; i < this.userCompanies.length; i++) {
                if (checkBoxStatus === "C") {
                    if (this.userCompanies[i].flxDropdown.enable === true) {

                        this.userCompanies[i].lblDropdown.text = "C";
                        this.userCompanies[i].ListBox1.enable = true;
                        this.userCompanies[i].isEnabled = "true";
                        for (var j = 0; j < this.userCompanies[i].accounts.length; j++) {
                            this.userCompanies[i].accounts[j].isEnabled = "true";
                        }
                        this.userCompanies[i].enabledAccounts = this.userCompanies[i].totalAccounts;
                    }
                } else {
                    if (this.userCompanies[i].flxDropdown.enable === true) {
                        this.userCompanies[i].lblDropdown.text = "D";
                        this.userCompanies[i].ListBox1.enable = false;
                        //this.userCompanies[i].ListBox1.selectedKey = "SELECT_USER";
                        this.userCompanies[i].isEnabled = "false";
                        for (var j = 0; j < this.userCompanies[i].accounts.length; j++) {
                            this.userCompanies[i].accounts[j].isEnabled = "false";
                        }
                        this.userCompanies[i].enabledAccounts = "0";
                    }
                }
                this.showAccountCountandStatus(i);
            }
            this.selectCompanyandShowAccounts(0);
            this.showSelectedAccountsCount();
            this.showAccountCountandStatus(this.selectedCompanyIndex);
            this.enableContinueButton();
            //this.view.segCompanyNames.setData(this.userCompanies);
            this.AdjustScreen();
            this.view.flxDropdown.setActive(true);
        },
        onUserRoleSelect: function(index) {
            var data = this.userCompanies[index].ListBox1.selectedKey;
            // if (data[0] === "0") {
            //     var flag = this.checkForOtherCompanies();
            //     if (flag === false) {
            //         FormControllerUtility.disableButton(this.view.btnCancelRoles);
            //     }
            // } else {
            //     this.userCompanies[index].lblDropdown.text = "C";
            //     FormControllerUtility.enableButton(this.view.btnCancelRoles);
            // }
            if (index === this.selectedCompanyIndex) {
                this.selectedCompanyDetails.ListBox1.selectedKey = data;
                this.selectedCompanyDetails.ListBox1.userRole = this.getValueofSelectedRole(this.userCompanies[index].ListBox1.validRoles, data);
            }
            this.userCompanies[index].ListBox1.selectedKey = data;
            this.userCompanies[index].ListBox1.userRole = this.getValueofSelectedRole(this.userCompanies[index].ListBox1.validRoles, data);
            this.view.segCompanyNames.setData(this.userCompanies);
            this.enableContinueButton();
            this.showSelectedAccountsCount();
            this.AdjustScreen();
        },
        getValueofSelectedRole: function(userRoles, selectedRole) {
            for (var i = 0; i < userRoles.length; i++) {
                if (userRoles[i].roleId === selectedRole) {
                    return userRoles[i].userRole;
                }
            }
            return kony.i18n.getLocalizedString("i18n.userManagement.selectUserRole");
        },
        enableContinueButton: function() {
          var scopeObj = this;
            FormControllerUtility.enableButton(scopeObj.view.btnCancelRoles);
            var count = 0;
            for (var i = 0; i < this.userCompanies.length; i++) {
                if (this.userCompanies[i].lblDropdown.text === "C") {
                    count = count + 1;
                    if (this.userCompanies[i].ListBox1.selectedKey === "SELECT_USER") {
                        FormControllerUtility.disableButton(scopeObj.view.btnCancelRoles);
                    }
                }
            }
          if (count === 0) {
            if(!kony.sdk.isNullOrUndefined(applicationManager.getConfigurationManager().isEnrolled) && !kony.sdk.isNullOrUndefined(applicationManager.getConfigurationManager().editUser)){
              if(applicationManager.getConfigurationManager().isEnrolled && applicationManager.getConfigurationManager().editUser){
                FormControllerUtility.enableButton(scopeObj.view.btnCancelRoles);
                this.view.btnCancelRoles.onClick = function() {
                  scopeObj.openConfirmationPopUp();
                };
              }
              else{
                FormControllerUtility.disableButton(scopeObj.view.btnCancelRoles);
              }
            }
            else{
              FormControllerUtility.disableButton(scopeObj.view.btnCancelRoles);
            }

          }
          else{
            FormControllerUtility.enableButton(scopeObj.view.btnCancelRoles);
            this.view.btnCancelRoles.onClick = function() {
	        	scopeObj.updateUMDataandNavigate();
            };
          }
        },
      
      openConfirmationPopUp : function(){
        var scopeObj = this;
        this.view.flxPopupConfirmation.setVisibility(true);
        this.view.flxPopupConfirmation.flxPopupNew.formActionsNew.btnCancel.onClick = function(){
          scopeObj.view.flxPopupConfirmation.setVisibility(false);
        };
        var removedCompanies = [];
        var isPrimaryValue;
        var legalEntityId;
        this.view.flxPopupConfirmation.flxPopupNew.formActionsNew.btnNext.onClick = function(){
          for (var i = 0; i < scopeObj.userManagementData.companyList.length; i++) {
            if(scopeObj.userManagementData.companyList[i].isPrimary === "true")
              isPrimaryValue = true;
            else
              isPrimaryValue = false;
            removedCompanies.push({
              "companyName": scopeObj.userManagementData.companyList[i].companyName,
              "contractId": scopeObj.userManagementData.companyList[i].contractId,
              "contractName": scopeObj.userManagementData.companyList[i].contractName,
              "cif": scopeObj.userManagementData.companyList[i].cif,
              "autoSyncAccounts": scopeObj.userManagementData.companyList[i].autoSyncAccounts,
              "isPrimary": isPrimaryValue,//scopeObj.userManagementData.companyList[i].isPrimary,
              "serviceDefinition": scopeObj.userManagementData.companyList[i].serviceDefinition,
              "roleId": scopeObj.userManagementData.companyList[i].roleId
            });
          }
          if(applicationManager.getNavigationManager().getCustomInfo("selectedUserStatus")==="ACTIVE")
          legalEntityId=applicationManager.getNavigationManager().getCustomInfo("selectedLegalEntityId");        
          var userDetails = {
            "id": scopeObj.userManagementData.userDetails.id,
            "legalEntityId": legalEntityId?legalEntityId:""
          };
          var removeAccessReponse = {
            "userDetails": JSON.stringify(userDetails),
            "removedCompanies":JSON.stringify(removedCompanies)
          };
          scopeObj.loadBusinessBankingModule().presentationController.editInfinityUserForRemovedCompanies(removeAccessReponse);
          scopeObj.view.flxPopupConfirmation.setVisibility(false);
          //applicationManager.getNavigationManager().navigateTo("frmBBUsersDashboard");
        };
      },
      
        onCompanySelectCheckBox: function(index) {
            this.onComapnySelectCheckBox(index);
            this.selectCompanyandShowAccounts(index);
        },
        selectCompanyandShowAccounts: function(index) {
            var selectedRow = this.userCompanies[index];
            this.view.lblCompanyName.text = selectedRow.companyName;
            this.view.lblAccountsValue.text = selectedRow.lblAccountsValue.text;
            // CommonUtilities.setText(this.view.lblCompanyName, selectedRow.companyName, CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblAccountsValue, selectedRow.lblAccountsValue.text, CommonUtilities.getaccessibilityConfig());
            if (this.showAccountsFlag === "true" || this.showAccountsFlag == true) {
                selectedRow.imgArrow.isVisible = true;
                selectedRow.flxRow.skin = "sknfbfbfb";
            } else {
                selectedRow.imgArrow.isVisible = false;
                selectedRow.flxRow.skin = "sknflxfbfbfb1pxShadowc0c0c0";
            }
            if (this.selectedCompanyDetails) {
                this.selectedCompanyDetails.flxRow.skin = "sknfbfbfb";
                this.selectedCompanyDetails.imgArrow.isVisible = false;
                this.view.segCompanyNames.setDataAt(this.selectedCompanyDetails, this.selectedCompanyIndex);
                this.userCompanies[this.selectedCompanyIndex].isEnabled = this.selectedCompanyDetails.isEnabled;
                this.userCompanies[this.selectedCompanyIndex].userRole = this.selectedCompanyDetails.ListBox1.userRole;
                this.userCompanies[this.selectedCompanyIndex].accounts = this.selectedCompanyDetails.accounts;
            }
            this.view.segCompanyNames.setDataAt(selectedRow, index);
            this.view.lblSwitch.text = "m";
            this.view.lblSwitch.skin = "skn727272fonticons";
            if (this.userManagementData.companyList[index].autoSyncAccounts === "true") {
                this.view.lblSwitch.skin = "sknfonticontoggleON45px";
                this.view.lblSwitch.text = "n";
            } else {
                this.view.lblSwitch.skin = "skn727272fonticons";
                this.view.lblSwitch.text = "m";
            }
            this.view.segUserNames.widgetDataMap = this.getsegAccountsDataMap();
            if (selectedRow.accounts.length === 0) {
                this.view.segUserNames.isVisible = false;
                this.view.lblNoRecord.isVisible = true;
            }
             else {
                this.view.segUserNames.isVisible = true;
                this.view.lblNoRecord.isVisible = false;
                if (selectedRow.accounts.length === 1){
                    this.view.imgSortAccountName.src="sortingfinal.png";
                }
                else if (selectedRow.accounts.length >1){
                    this.view.imgSortAccountName.src="sorting.png";
                    this.view.flxSortAccountName.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "button",
                            tabindex: "0"
                        },
                        "a11yLabel": "Accounts column. No Sort applied. Click to Sort in Ascending order."
                    }
                }
                if (this.showAccountsFlag == "true" || this.showAccountsFlag == true) {
                    var formattedAccountsList = this.getFormattedAccounts(selectedRow.accounts);
                    this.accounts = formattedAccountsList;
                    this.view.segUserNames.setData(formattedAccountsList);
                    this.accountSegmentData = this.view.segUserNames.data;
                }

            }
            if (this.selectedCompanyIndex != index) {
                this.selectedCompanyDetails = selectedRow;
                this.selectedCompanyIndex = index;
            }
            this.showAccountCountandStatus(this.selectedCompanyIndex);
            this.AdjustScreen();
        },
        getsegAccountsDataMap: function() {
            var dataMap = {
                "flxActions": "flxActions",
                "flxDropdown": "flxDropdown",
                "flxRecipientName": "flxRecipientName",
                "flxRow": "flxRow",
                "flxUserManagementSelectAccountNames": "flxUserManagementSelectAccountNames",
                "flxUserManagementSelectAccountNamesMain": "flxUserManagementSelectAccountNamesMain",
                "flxWrapper": "flxWrapper",
                "lblDropUp": "lblDropUp",
                "lblDropdown": "lblDropdown",
                "lblRecipientName": "lblRecipientName",
                "lblSeparator": "lblSeparator",
                "segBWTEditRecipientFileUnselectedWrapper": "segBWTEditRecipientFileUnselectedWrapper",
                "accountName": "accountName",
                "accountId": "accountId",
                "isEnabled": "isEnabled",
                "accountType": "accountType"
            };
            return dataMap;
        },
        getFormattedAccounts: function(accounts) {
            var scopeObj = this;
            var data = [];
            for (var i = 0; i < accounts.length; i++) {
                accounts[i].accountType = "Other";
                for (var j = 0; j < Object.keys(OLBConstants.ACCOUNT_TYPE).length; j++) {
                    if ((accounts[i].accountName).includes(Object.values(OLBConstants.ACCOUNT_TYPE)[j])) {
                        accounts[i].accountType = Object.values(OLBConstants.ACCOUNT_TYPE)[j];
                        break;
                    }
                }
                accounts[i].Id = accounts[i].accountId;
                accounts[i].accountNumber = accounts[i].accountId;
                accounts[i].flxUserManagementSelectAccountNames = {
                    "isVisible": false
                };
                accounts[i].lblRecipientName = {
                    "text": CommonUtilities.getAccountDisplayName(accounts[i])
                };
                if (accounts[i].isEnabled === "true") {
                    accounts[i].lblDropdown = {
                        "text": "C"
                    };
                } else {
                    accounts[i].lblDropdown = {
                        "text": "D"
                    };
                }
                if (i === 0) {
                    accounts[i].flxDropdown = {
                        onClick: scopeObj.selectAccountforCompany.bind(this, 0, 0)
                    };
                    var accountHeader = [{
                            "accountType": accounts[i].accountType,
                            "flxDropdown": {
                                onClick: scopeObj.onClickAccountsHeader.bind(this, 0),
                                accessibilityConfig:{ "a11yLabel" : "Select "+ accounts[i].accountType+" Accounts",
                                "a11yARIA": {
                                    "aria-checked": true,
                                    "role": "checkbox",
                                    "tabindex": 0
                                }
                            }
                            },
                            "lblDropdown": {
                                "text": "C"
                            },
                            "lblDropUp": {
                                "isVisible": true,
                                "text": "O"
                            },
                            "flxActions": {
                                onClick: scopeObj.onExpandAccountHeader.bind(this, 0),
                                accessibilityConfig : {
                   
                                    "a11yLabel" : "Show List of "+accounts[i].accountType+" Accounts",
                                    "a11yARIA": {
                                    "tabindex": 0,
                                    "aria-expanded": false,
                                    "role": "button",
                                    }
                                }
                                
                            },
                            "lblRecipientName": accounts[i].accountType
                        },
                        [accounts[i]]
                    ];
                    data.push(accountHeader);
                } else {
                    var flag = true;
                    for (var j = 0; j < data.length; j++) {
                        if (accounts[i].accountType === data[j][0].accountType) {
                            accounts[i].flxDropdown = {
                                onClick: scopeObj.selectAccountforCompany.bind(this, j, data[j][1].length)
                            };
                            data[j][1].push(accounts[i]);
                            flag = false;
                            break;
                        }
                    }
                    if (flag === true) {
                        accounts[i].flxDropdown = {
                            onClick: scopeObj.selectAccountforCompany.bind(this, j, 0)
                        };
                        var accountHeader = [{
                                "accountType": accounts[i].accountType,
                                "flxDropdown": {
                                    onClick: scopeObj.onClickAccountsHeader.bind(this, j),
                                    accessibilityConfig:{ "a11yLabel" : "Select "+ accounts[i].accountType+" Accounts",
                                    "a11yARIA": {
                                        "aria-checked": true,
                                        "role": "checkbox",
                                        "tabindex": 0
                                    }
                                }
                                },
                                "lblDropdown": {
                                    "text": "C"
                                },
                                "lblDropUp": {
                                    "isVisible": true,
                                    "text": "O"
                                },
                                "flxActions": {
                                    onClick: scopeObj.onExpandAccountHeader.bind(this, j),
                                    accessibilityConfig : {
                   
                                        "a11yLabel" : "Show List of "+accounts[i].accountType+" Accounts",
                                        "a11yARIA": {
                                         "tabindex": 0,
                                        "aria-expanded": false,
                                        "role": "button",
                                        }
                                    }
                                },
                                "lblRecipientName": accounts[i].accountType
                            },
                            [accounts[i]]
                        ];
                        data.push(accountHeader);
                    }
                }
            }
            data = this.showStatusofAccountsHeader(data);
            return data;
        },
        selectAccountforCompany: function(sectionIndex, rowIndex) {
            var data = this.view.segUserNames.data[sectionIndex][1][rowIndex];
            var count = parseInt(this.userCompanies[this.selectedCompanyIndex].enabledAccounts);
            if (data.lblDropdown.text === "C") {
                data.flxDropdown.accessibilityConfig={
                    "a11yARIA": {
                        "aria-checked": false,
                        "role": "checkbox",
                        "tabindex": 0,
                        "aria-labelledby": "lblRecipientName"
                    }
                }
                data.lblDropdown.text = "D";
                count = parseInt(count) - 1;
            } else {
                data.flxDropdown.accessibilityConfig={
                    "a11yARIA": {
                        "aria-checked": true,
                        "role": "checkbox",
                        "tabindex": 0,
                        "aria-labelledby": "lblRecipientName"
                    }
                }
                data.lblDropdown.text = "C";
                count = parseInt(count) + 1;
            }
            this.view.segUserNames.setDataAt(data, rowIndex, sectionIndex);
            this.view.segUserNames.setData(this.showStatusofAccountsHeader(this.view.segUserNames.data));
            this.accountSegmentData = this.view.segUserNames.data;
            this.userCompanies[this.selectedCompanyIndex].enabledAccounts = count;
            this.updateAccountsinLocal(this.view.segUserNames.data);
            this.showSelectedAccountsCount();
            this.showAccountCountandStatus(this.selectedCompanyIndex);
            this.view.segUserNames.setActive(rowIndex, sectionIndex, "flxUserManagementSelectAccountNames.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxDropdown");
            this.enableContinueButton();
        },
        onClickAccountsHeader: function(sectionIndex) {
            var data = this.view.segUserNames.data[sectionIndex];
            var accountType = data[sectionIndex].accountType;
            var count = 0;
            if (data[0].lblDropdown.text === "C") {
                data[0].flxDropdown.accessibilityConfig = {
                    "a11yLabel" : "Select "+ accountType+" Accounts",
                    "a11yARIA": {
                        "aria-checked": false,
                        "role": "checkbox",
                        "tabindex": 0
                    }
                }
                data[0].lblDropdown.text = "D";
            } else {
                data[0].flxDropdown.accessibilityConfig = {
                    "a11yLabel" : "UnSelect "+ accountType+" Accounts",
                    "a11yARIA": {
                        "aria-checked": true,
                        "role": "checkbox",
                        "tabindex": 0
                    }
                }
                data[0].lblDropdown.text = "C";
            }
            for (var i = 0; i < data[1].length; i++) {
                data[1][i].lblDropdown.text = data[0].lblDropdown.text;
            }
            this.view.segUserNames.setSectionAt(data, sectionIndex);
            this.view.segUserNames.setData(this.showStatusofAccountsHeader(this.view.segUserNames.data));
            this.accountSegmentData = this.view.segUserNames.data;
            for(var i=0;i<this.accountSegmentData.length;i++){
                var accountsList = this.accountSegmentData[i][1];
                for(var j=0;j<accountsList.length;j++){
                    if(accountsList[j].lblDropdown.text === "C"){
                        count = count +1;
                    }
                }
            }
            this.userCompanies[this.selectedCompanyIndex].enabledAccounts = count;
            this.updateAccountsinLocal(this.view.segUserNames.data);
            this.showSelectedAccountsCount();
            this.showAccountCountandStatus(this.selectedCompanyIndex);
            this.enableContinueButton();
            this.view.segUserNames.setActive(-1, sectionIndex, "flxUserManagementSelectAccountNamesMain.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxDropdown");
        },
        onExpandAccountHeader: function(index) {
            // var tempSegmentData = JSON.parse(JSON.stringify(this.accountSegmentData));
           
            var accountType = this.accountSegmentData[index][0].accountType;
            if (this.accountSegmentData[index][0].lblDropUp.text === "O") {
                
                this.accountSegmentData[index][0].flxActions.accessibilityConfig = {
                   
                    "a11yLabel" : "Hide List of "+ accountType+" Accounts",
                    "a11yARIA": {
                       
                    "tabindex": 0,
                    "aria-expanded": true,
                    "role": "button",
                    }
                }
                this.accountSegmentData[index][0].lblDropUp.text = "P";
            } else {
                this.accountSegmentData[index][0].flxActions.accessibilityConfig = {
                    "a11yLabel" : "Show List of "+ accountType+" Accounts",
                    "a11yARIA": {
                    "tabindex": 0,
                    "aria-expanded": false,
                    "role": "button",
                    }
                }
                this.accountSegmentData[index][0].lblDropUp.text = "O";
            }
            this.view.segUserNames.setData(this.accountSegmentData);
            this.showExpandedAccounts(index);
        },
        showExpandedAccounts: function(index) {
            var data = this.view.segUserNames.data;
            for (var i = 0; i < this.accountSegmentData.length; i++) {
                if (this.accountSegmentData[i][0].lblDropUp.text === "P") {
                    for (var j = 0; j < this.accountSegmentData[i][1].length; j++) {
                        this.accountSegmentData[i][1][j].flxUserManagementSelectAccountNames.isVisible = true;
                    }
                } else {
                    for (var j = 0; j < this.accountSegmentData[i][1].length; j++) {
                        this.accountSegmentData[i][1][j].flxUserManagementSelectAccountNames.isVisible = false;
                    }
                }
            }
            this.view.segUserNames.removeAll();
            this.view.segUserNames.setData(this.accountSegmentData);
            this.view.segUserNames.setActive(-1, index, "flxUserManagementSelectAccountNamesMain.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxActions");
        },
        sortAccounts: function() {
            var sortData = {};
            var data = this.selectedCompanyDetails.accounts;
            this.selectedCompanyDetails.accounts = data;
            if (this.view.imgSortAccountName.src === "sorting.png") {
               
                this.view.imgSortAccountName.src = "sorting_next.png";
                sortData = CommonUtilities.sortAndSearchJSON(data, "accountName", "ASC", null, null);
                this.view.flxSortAccountName.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button"
                    },
                    "a11yLabel": "Sorted in Ascending order. Click to Sort in Descending order."
                }
            } else if (this.view.imgSortAccountName.src === "sorting_next.png") {
               
                this.view.imgSortAccountName.src = "sorting_previous.png";
                sortData = CommonUtilities.sortAndSearchJSON(data, "accountName", "DESC", null, null);
                this.view.flxSortAccountName.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button"
                    },
                    "a11yLabel": "Sorted in Descending order. Click to Apply no Sort."
                }
            } else {
                this.view.imgSortAccountName.src = "sorting.png";
                sortData = data;
                this.view.flxSortAccountName.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button"
                    },
                    "a11yLabel": "Accounts column. No Sort applied. Click to Sort in Ascending order."
                }
            }
            if (sortData === -1) {
                this.view.segUserNames.isVisible = false;
                this.view.lblNoRecord.isVisible = true;
            } else {
                var formattedData = this.getFormattedAccounts(sortData);
                this.view.segUserNames.isVisible = true;
                this.view.lblNoRecord.isVisible = false;
                formattedData = this.showStatusofAccountsHeader(formattedData);
                this.view.segUserNames.setData(formattedData);
                this.accountSegmentData = this.view.segUserNames.data;
            }
            this.AdjustScreen();
        },
        searchAccounts: function() {
            var searchKey = this.view.Search.txtSearch.text;
            var data = this.selectedCompanyDetails.accounts;
            var searchData = CommonUtilities.sortAndSearchJSON(data, null, null, "accountName,accountId", searchKey);
            if (searchData === -1) {
                this.view.segUserNames.isVisible = false;
                this.view.lblNoRecord.isVisible = true;
            } else {
                var formattedData = this.getFormattedAccounts(searchData);
                this.view.segUserNames.isVisible = true;
                this.view.lblNoRecord.isVisible = false;
                formattedData = this.showStatusofAccountsHeader(formattedData);
                this.view.segUserNames.setData(formattedData);
                this.accountSegmentData = this.view.segUserNames.data;
            }
            this.AdjustScreen();
        },
        resetToDefault: function() {
            for (var i = 0; i < this.accounts.length; i++) {
                this.accounts[i][0].lblDropdown.text = "C";
                for (var j = 0; j < this.accounts[i][1].length; j++) {
                    this.accounts[i][1][j].lblDropdown.text = "C";
                }
                this.view.segUserNames.setSectionAt(this.accounts[i], i);
            }
            this.userCompanies[this.selectedCompanyIndex].enabledAccounts = this.userCompanies[this.selectedCompanyIndex].totalAccounts;
            this.updateAccountsinLocal(this.view.segUserNames.data);
            this.showAccountCountandStatus(this.selectedCompanyIndex);
            this.view.btnReset.setActive(true);
        },
        showAccountCountandStatus: function(index) {
            var accountStatus = "" + this.userCompanies[index].enabledAccounts + " of " + this.userCompanies[index].totalAccounts;
            this.view.lblAccountsValue.text = accountStatus;
            //CommonUtilities.setText(this.view.lblAccountsValue, accountStatus, CommonUtilities.getaccessibilityConfig());
            this.userCompanies[index].lblAccountsSelectedType.text = "(" + this.getComapnyAccountStatus(this.userCompanies[index].enabledAccounts, this.userCompanies[index].totalAccounts) + ")";
            this.userCompanies[index].lblAccountsValue.text = accountStatus;
            if (this.userCompanies[index].enabledAccounts == "0") {
                this.userCompanies[index].lblDropdown.text = "D";
                this.userCompanies[index].isEnabled = "false";
                this.userCompanies[index].ListBox1.enable = false;
                var tempData = this.userCompanies[index].ListBox1;
                tempData.selectedKey = "SELECT_USER";
                tempData.userRole = kony.i18n.getLocalizedString("i18n.userManagement.selectUserRole");
                try {
                    delete tempData.selectedKeys;
                } catch (e) {}
                this.userCompanies[index].ListBox1 = tempData;
            } else {
                this.userCompanies[index].lblDropdown.text = "C";
                this.userCompanies[index].ListBox1.enable = true;
                this.userCompanies[index].isEnabled = "true";
            }
            this.view.segCompanyNames.removeAll(); //(index);
            this.view.segCompanyNames.setData(this.userCompanies);
            // this.view.segCompanyNames.setDataAt(this.userCompanies[index], index);
            this.showSelectedAccountsCount();
            this.view.segCompanyNames.setActive(index, -1, "flxUserManagementSelectCompanyNames.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxDropdown");
            
            this.AdjustScreen();
        },
        showSelectedAccountsCount: function() {
            var count = 0;
            for (var i = 0; i < this.userCompanies.length; i++) {
                if (this.userCompanies[i].lblDropdown.text === "C") {
                    count = count + 1;
                }
            }
            if (count === this.userCompanies.length) {
                this.view.lblDropdown.text = "C";
            } else if (count === 0) {
                this.view.lblDropdown.text = "D";
            } else {
                this.view.lblDropdown.text = "y";
            }
            this.view.lblSelectedValue.text = count + "";
            this.AdjustScreen();
        },
        showStatusofAccountsHeader: function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                var count = 0;
                for (var j = 0; j < accounts[i][1].length; j++) {
                    if (accounts[i][1][j].lblDropdown.text === "C") {
                        count = count + 1;
                    }
                }
                if (count === 0) {
                    accounts[i][0].lblDropdown.text = "D";
                } else if (count === accounts[i][1].length) {
                    accounts[i][0].lblDropdown.text = "C";
                } else {
                    accounts[i][0].lblDropdown.text = "y";
                }
                accounts[i][0].lblRecipientName = accounts[i][0].accountType + " (" + count + ")";
            }
            return accounts;
        },
        updateAccountsinLocal: function(accountsTemp) {
            for (var i = 0; i < this.accounts.length; i++) {
                for (var j = 0; j < accountsTemp.length; j++) {
                    if (accountsTemp[j][0].accountType === this.accounts[i][0].accountType) {
                        for (var k = 0; k < this.accounts[i][1].length; k++) {
                            for (var l = 0; l < accountsTemp[j][1].length; l++) {
                                if (accountsTemp[j][1][l].accountId === this.accounts[i][1][k].accountId) {
                                    if (accountsTemp[j][1][l].lblDropdown.text === "C") {
                                        this.accounts[i][1][k].lblDropdown.text = "C";
                                        this.accounts[i][1][k].isEnabled = "true";
                                    } else {
                                        this.accounts[i][1][k].lblDropdown.text = "D";
                                        this.accounts[i][1][k].isEnabled = "false";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // this.updateAccountsinActualUMData();
        },
        updateAccountsinActualUMData: function() {
            if (this.accounts) {
                var accountsTemp = this.userCompanies[this.selectedCompanyIndex].accounts;
                for (var i = 0; i < this.accounts.length; i++) {
                    for (var j = 0; j < this.accounts[i][1].length; j++) {
                        for (var k = 0; k < accountsTemp.length; k++) {
                            if (accountsTemp[k].accountId === this.accounts[i][1][j].accountId) {
                                if (this.accounts[i][1][j].lblDropdown.text === "C") {
                                    accountsTemp[k].isEnabled = "true";
                                } else {
                                    accountsTemp[k].isEnabled = "false";
                                }
                            }
                        }
                    }
                }
                this.userCompanies[this.selectedCompanyIndex].accounts = accountsTemp;
            }
        },
        updateUMDataandNavigate: function() {
            FormControllerUtility.showProgressBar(this.view);
         
            for (var i = 0; i < this.userCompanies.length; i++) {
                this.userManagementData.companyList[i].isEnabled = this.userCompanies[i].isEnabled;
                for (var j = 0; j < this.userCompanies[i].accounts.length; j++) {
                  this.userManagementData.companyList[i].accounts = this.userCompanies[i].accounts;
                    this.userManagementData.companyList[i].accounts[j].isEnabled = this.userCompanies[i].accounts[j].isEnabled;
                }
                if (this.userCompanies[i].lblDropdown.text === "C") {
                    if (this.userCompanies[i].ListBox1.selectedKey != "SELECT_USER") {
                        this.userManagementData.companyList[i].userRole = this.userCompanies[i].ListBox1.userRole;
                        this.userManagementData.companyList[i].roleId = this.userCompanies[i].ListBox1.selectedKey;
                    } else {
                        this.userManagementData.companyList[i].userRole = "";
                        this.userManagementData.companyList[i].roleId = "";
                    }
                } else {
                    this.userManagementData.companyList[i].userRole = "";
                    this.userManagementData.companyList[i].roleId = "";
                }
            }
            this.loadBusinessBankingModule().presentationController.getOrgGrpActionLimit(this.userManagementData.companyList);
        },
        onBackClick: function() {
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (flowType === true) {
//                 var navManager =  applicationManager.getNavigationManager();
//                 navManager.setCustomInfo('editUserFlow',"editFlow");
//                 navManager.setCustomInfo('getInfinityUser',"false");
                this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
                this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
            }
            else if(this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE){
                applicationManager.getNavigationManager().navigateTo("frmBBCreateCustomRole");
            }
            else{
                applicationManager.getNavigationManager().navigateTo("frmBBCopyPermission");
            }

        },
        onContinue: function() {
            var navManager = applicationManager.getNavigationManager();
            var entityDetails = navManager.getCustomInfo("addToEntityDetails");
            this.view.flxAddUser.setVisibility(true);
            this.view.flxAddUser.height = "45dp";
            this.view.lblAddUser.left = "20dp";
            this.view.lblAddUser.top = "10dp";
            this.view.flxSeparator1.top = "44dp";
            this.view.flxSeparator1.left = "0%";
            this.view.flxSeparator1.width = "100%";
            this.view.lblAddUser.text = "Adding " + '"' + entityDetails.userDetails.selectedUserName + '"' + " to " + '"' + entityDetails.addToEntityName + '"' + " entity";
            this.view.lblAddUser.skin = "sknSSPSB42424218Px";
            this.view.lblContentHeader.text = "Account Access & User Role";
        },
        /** Adjust Screen after click of dropdown in segment */
        AdjustScreen: function() {
            // this.view.forceLayout();
            // var mainheight = 0;
            // var screenheight = kony.os.deviceInfo().screenHeight;
            // mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            // var diff = screenheight - mainheight;
            // if (mainheight < screenheight) {
            //     diff = diff - this.view.flxFooter.info.frame.height;
            //     if (diff > 0) {
            //         this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
            //     } else {
            //         this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
            //     }
            // } else {
            //     this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
            // }
            // this.view.forceLayout();
        },
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        navToNextForm: function() {
          var compName = [];
           applicationManager.getConfigurationManager().enableCreateFlag = true ;
          var userData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          userData.globalLevelPermissions.forEach(function(item){
            item.features.forEach(function(feature){
              if(feature.featureId === "APPROVAL_MATRIX"){
                feature.permissions.forEach(function(permission){
                  if(permission.actionId === "APPROVAL_MATRIX_MANAGE"){
                    if(permission.isEnabled){
                      if(item.companyName !== undefined)
                        compName.push(item.companyName);
                      else
                        compName.push(item.coreCustomerName);
                    }
                  }
                });
              }
            });
          });
          var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
          var navManager = applicationManager.getNavigationManager();
          var editType = navManager.getCustomInfo('EditType');
    
          if(compName.length !== 0 && flowType === false){
            applicationManager.getNavigationManager().navigateTo("frmSelectSignatoryGroup");
            applicationManager.getConfigurationManager().compNameArr = compName;
          }
          else{
            if(this.view.btnCancelRoles.text === kony.i18n.getLocalizedString("i18n.PayAPerson.Update")){
              let navManager = applicationManager.getNavigationManager();
              if(editType==="userEdit")
              {
              navManager.setCustomInfo('editUserFlow',"editFlow");
              navManager.setCustomInfo('getInfinityUser',"false");
              this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"accountAccess");
              }
              else if(editType === "roleEdit"){
                this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData,"accountAccess");
              }
            }
            else{
              applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
            }
            //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
          }
        },
      
//       navToNextForm: function() {
//         FormControllerUtility.showProgressBar(this.view);
//         if(this.view.btnCancelRoles.text === kony.i18n.getLocalizedString("i18n.PayAPerson.Update")){
//           let navManager = applicationManager.getNavigationManager();
//           navManager.setCustomInfo('editUserFlow',"editFlow");
//           navManager.setCustomInfo('getInfinityUser',"false");
//           this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"accountAccess");
//           //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
//           //FormControllerUtility.showProgressBar(this.view);
//         }
//         else{
//           applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
//         }
//       },
        onCancelClick: function() {
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (flowType === true) {
//                 var navManager = applicationManager.getNavigationManager();
//                 navManager.setCustomInfo('editUserFlow', "editFlow");
//                 navManager.setCustomInfo('getInfinityUser', "false");
                this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
                this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
            } else {
                this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
            }
        },
    };
});