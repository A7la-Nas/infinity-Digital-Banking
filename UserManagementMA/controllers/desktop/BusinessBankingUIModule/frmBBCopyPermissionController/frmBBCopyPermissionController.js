define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var responsiveUtils = new ResponsiveUtils();
    var orientationHandler = new OrientationHandler();
    var isAddToEntityFlow = false;
    var activeSegmentId = "";
    var isRowClicked = false;
    var rowNumber = null;
    return {
        segData:"",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.initActions();
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            this.view.customheadernew.onBreakpointChangeComponent(width);
            var scope=this;
            var data = scope.segData;
            data=(scope.segData!=="")? scope.segData:scope.view.segmentAccRoleMain.data;
            var datamap={
              "flxUserManagement": "flxUserManagement",
              "flxUserManagementAccAccessRole": "flxUserManagementAccAccessRole",
              "flxUserManagementAccPermissions": "flxUserManagementAccPermissions",
              "lblLeftSideContent": "lblLeftSideContent",
              "lblSample1":"lblSample1",
              "lblSample2":"lblSample2",
              "lblSample3":"lblSample3",
              "lblSample4":"lblSample4",
              "lblRIghtSideContent": "lblRIghtSideContent",
              "lblRightMostContent": "lblRightMostContent",
              "lblSeparator": "lblSeparator",
              "lblRightContentAuto": "lblRightContentAuto",
            };
            scope.view.segmentAccRoleMain.rowTemplate="flxUserManagementAccAccessRole";
            scope.view.segmentAccRoleMain.widgetDataMap=datamap;
            scope.view.segmentAccRoleMain.setData(data);

            if (width <= 640 || orientationHandler.isMobile) {
              scope.view.segmentAccRoleMain.setData(data);
            } else if (width <= 1024) {
              scope.view.segmentAccRoleMain.setData(data);
            } else if (width <= 1366) {
              scope.view.segmentAccRoleMain.setData(data);
            } else {
              //for hd desktop
              scope.view.segmentAccRoleMain.setData(data);
            }
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.flxRightContainerMain.skin = "bbFlxSeperatore3e3e3RightBorder";
            }
        },
        preShow: function() {
          this.serviceCount = 0;
            this.loadBusinessBankingModule().presentationController.getLoginUserPermissions();
            this.getCustomRoles();
            this.getExistingUsers();
            this.view.Search.txtSearch.text = "";
            this.selectedMap = {};
            this.view.flxRightContainerMain.isVisible = false;
            this.view.lblAccAccessMain.text=kony.i18n.getLocalizedString("i18n.UserManagement.AccountAccessAndRole");
            this.view.segOtherFeaturePermissionsMain.text=kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission");
            this.imgArrowTransform = this.loadBusinessBankingModule().presentationController.getImgTransformObj();
            this.view.Search.flxtxtSearchandClearbtn.skin =  "sknFlxffffffBorder3px";
          applicationManager.getConfigurationManager().skipFlag = false;
        },
        postShow: function () {
            this.onBreakpointChange();
            isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
            if (isAddToEntityFlow === "addToEntity") {
                var navManager = applicationManager.getNavigationManager();
                var entityDetails = navManager.getCustomInfo("addToEntityDetails");
                var userName = [];
                userName = entityDetails.userDetails.selectedUserName.split(' ');
                this.view.lblAddAccountHeading.text = "Copy Permission";
                this.view.flxSeparatorNew.setVisibility(true);
                this.view.flxSeparatorNew.width = "100%";
                this.view.flxSeparatorNew.left = "0%";
                this.view.flxSeparator.width = "100%";
                this.view.flxSeparator.left = "0%";
                this.view.flxEntityHeader.setVisibility(true);
                this.view.lblEntityHeader.setVisibility(true);
                this.view.lblEntityHeader.text = "Adding " + '"' + entityDetails.userDetails.selectedUserName + '"' + " to " + '"' + entityDetails.addToEntityName + '"' + " entity";
                this.view.lblEntityHeader.skin = "sknSSPSB42424218Px";
            }
            this.view.customheadernew.activateMenu("User Management", "Create UM User");
            this.view.lblBankNameMain.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            this.view.lblReferenceIdMain.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
            this.view.lblAccountNameMain.text = kony.i18n.getLocalizedString("i18n.approvals.customer");
            this.view.lblSubMainHeaderMain.text = kony.i18n.getLocalizedString("konybb.i18n.userMgmt.PermissionDetails");
            this.view.lblHeader.text = kony.i18n.getLocalizedString("konybb.i18n.userMgmt.CopyPermissionsFromLbl");
            this.view.lblSample3.text = kony.i18n.getLocalizedString("i18n.approvals.customer");
            this.view.lblSample2.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
            this.view.lblSample1.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            this.view.Search.txtSearch.placeholder = "Search with role or user";
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                if (kony.application.getCurrentBreakpoint() <= 1024) {
                    this.view.flxAccountAccessMain.left = "65%";
                }
            }
            if (kony.application.getCurrentBreakpoint() <= 1024) {
                this.view.lblReferenceIdMain.width = "70dp";
                this.view.lblAccountAccess.width = "90dp";
                this.view.btnCancel.width = "120dp"
            }
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            var scope = this;
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scope.view.lblAddAccountHeading.setActive(true);
            }
            this.view.segTransactionLimitsMain.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            }
            this.view.Search.btnConfirm.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            }
            this.view.Search.txtSearch.accessibilityConfig = {
                a11yARIA: {
                    "aria-autocomplete": "list",
                    "tabindex": 0
                }
            }
            this.view.Search.lblSearch.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "aria-hidden": true,
                }
            }
            this.view.Search.btnConfirm.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "aria-hidden": true,
                }
            }
        },

        onKeyPressCallBack: function (eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDialogs.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
            }
            self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
        },
        //Init Actions
        initActions: function() {
            var scopeObj = this;
            this.view.segCustomRoles.onRowClick = function() {
                scopeObj.RoleOrUserSelected(scopeObj.view.segCustomRoles, scopeObj.view.segExistingUsers);
            };
            this.view.segExistingUsers.onRowClick = function() {
                scopeObj.RoleOrUserSelected(scopeObj.view.segExistingUsers, scopeObj.view.segCustomRoles);
            };
            this.view.Search.txtSearch.onkeyup = function() {
                scopeObj.searchRoleOrUser(scopeObj.view.Search.txtSearch.text);
            };
            this.view.btnProceedRoles.onClick = function() {
              FormControllerUtility.showProgressBar(this.view);
                scopeObj.navToNextForm();
            };
            this.view.btnSkip.onClick = function() {
              FormControllerUtility.showProgressBar(this.view);
                scopeObj.navToSkipForm();
            };
            this.view.btnBackAccessRoles.onClick = this.onBackClick;
            this.view.btnCancel.onClick = this.onCancelClick;
            this.view.Search.flxClearBtn.onClick = function() {
                scopeObj.view.Search.txtSearch.text = "";
                scopeObj.searchRoleOrUser(scopeObj.view.Search.txtSearch.text);
            };
            this.view.btnBackAccessRoles.onClick = this.onBackClick;
            this.view.btnCancel.onClick = this.onCancelClick;
            FormControllerUtility.disableButton(this.view.btnProceedRoles);
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.progressBar === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.progressBar === false) {
                    //FormControllerUtility.hideProgressBar(this.view);
                }
                //getCustomRoles success
                if (viewModel.companyLevelCustomRolesSuccess) {
                  this.serviceCount++;
                    this.generateCustomRolesArr(viewModel.companyLevelCustomRolesSuccess);
                    this.showCustomRoles(this.customRoles);
                } else if (viewModel.companyLevelCustomRolesFailure) {
                  this.serviceCount++;
                    this.showCustomRoles([]);
                }
                //getExistingUsers success
                if (viewModel.associatedContractUsersSuccess) {
                  this.serviceCount++;
                    this.generateExistingUsersArr(viewModel.associatedContractUsersSuccess);
                    this.showExistingUsers(this.existingUsers);
                } else if (viewModel.associatedContractUsersFailure) {
                  this.serviceCount++;
                    this.showExistingUsers([]);
                }

                if (viewModel.getInfinityUserFailure) {
                  this.serviceCount++;
                    this.view.flxDowntimeWarning.isVisible = true;
                    this.view.rtxDowntimeWarning.text = viewModel.getInfinityUserFailure;
                    this.view.btnSkip.enable = false;
                }
                if (viewModel.getInfinityUserSuccess) {
                  this.serviceCount++;
                    this.view.flxDowntimeWarning.isVisible = false;
                    this.view.btnSkip.enable = true;
                }
                if (viewModel.getUserDetailsSuccess) {
                    this.showPermissionDetails(viewModel.getUserDetailsSuccess);
                }
              if(this.serviceCount >= 3){
                FormControllerUtility.hideProgressBar(this.view);
              }
            }
            this.view.forceLayout();
            if(isRowClicked === true){
                activeSegmentId.setActive(rowNumber, 0, "flxSelectRoleContainer.flxInnerRole");
                activeSegmentId = "";
                isRowClicked = false;
                rowNumber = null;
            }
        },
        showServerError: function(errmsg) {},
        /** Adjust Screen after click of dropdown in segment */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
                }
            } else {
                this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
            }
            this.view.forceLayout();
        },
      navToNextForm: function() {
        this.loadBusinessBankingModule().presentationController.setUserPermissionFlow(OLBConstants.USER_MANAGEMENT_TYPE.COPY);
        //applicationManager.getConfigurationManager().skipFlag = true;
        var userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
        this.loadBusinessBankingModule().presentationController.setUserManagementData(userManagementData);
        var navMan=applicationManager.getNavigationManager();
        navMan.setCustomInfo("createManualFlow","createCopyFlow");
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      },
        navToSkipForm: function() {
           var navMan=applicationManager.getNavigationManager();
        navMan.setCustomInfo("createCopySkipflow","createCopySkipflow");
            this.loadBusinessBankingModule().presentationController.setUSMToLoggedInUserData();
            var userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          for (var i = 0; i < userManagementData.companyList.length; i++) {
            userManagementData.companyList[i].autoSyncAccounts = "false";
          }
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo('createroleManually', "createusermanual");
          this.loadBusinessBankingModule().presentationController.setUserManagementData(userManagementData);	
            applicationManager.getNavigationManager().navigateTo("frmBBAccountAccessAndRole");
        },
        getCustomRoles: function() {
            //FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.getCompanyLevelCustomRoles();
        },
        //load BusinessBanking Module
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        // Method to show Custom Roles UI
        showCustomRoles: function(customRoles) {
            let self = this;
            let segHeader = {
                "lblDropdown": {
                    "text": "P",
                },
                "flxDropdown": {
                    "onClick": self.showOrHideCustomRolesOrExistingUsers.bind(this, self.view.segCustomRoles),
                    "accessibilityConfig":{
                        a11yLabel:kony.i18n.getLocalizedString("konybb.i18n.userMgmt.CustomRoles"),
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":true
                        }
                    }
                },
                "lblFromAccountNo": {
                    "text": kony.i18n.getLocalizedString("konybb.i18n.userMgmt.CustomRoles"),
                },
                "imgAcknowledged": {
                    "isVisible": self.selectedMap["selectedSeg"] === self.view.segCustomRoles.id
                }
            };
            let segRowData = [];
            this.view.segCustomRoles.isVisible = true;
            if (customRoles === null || customRoles === undefined || customRoles === -1 || customRoles.length === 0) {
                this.view.NoCustomRoles.isVisible = true;
                //this.view.lblNoCustomRole.isVisible = true;
                this.view.rtxNoPaymentMessage1.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
                this.view.forceLayout();
            } else {
                this.view.NoCustomRoles.isVisible = false;
                //this.view.lblNoCustomRole.isVisible = false;
                segRowData = customRoles.map(function(customRoles) {
                    return {
                        "flxSelectRoleContainer": {
                            "isVisible": true
                        },
                        "imgSelectRole": {
                            "src": self.selectedMap["selectedRow"] === customRoles.id ? "radiobtn_active.png" : "radio_btn_inactive.png"
                        },
                        "imgArrow": {
                            "transform": self.imgArrowTransform,
                            "isVisible": self.selectedMap["selectedRow"] === customRoles.id
                        },
                        "flxInnerRole": {
                          "skin": self.selectedMap["selectedRow"] === customRoles.id ? "sknflxfbfbfb1pxShadowc0c0c0" : "skne3e3e3br3pxradius",
                          "accessibilityConfig": {
                            "a11yLabel": customRoles.customRoleName,
                            a11yARIA:{
                                "role":"radio",
                                "tabindex":0,
                                "aria-checked":self.selectedMap["selectedRow"] === customRoles.id ? true : false,
                            }
                          }
                        },
                        "lblRoleName": {
                            "text": customRoles.customRoleName,
                            "value": customRoles.customRoleName,
                        },
                        "id": customRoles.id
                    };
                });
            }
            var segDataModel = [
                [segHeader, segRowData]
            ];
            this.view.segCustomRoles.setData(segDataModel);
        },
        //On Rowclick of Custom Role segment or ExistingUsers Segment
        RoleOrUserSelected: function(activeSegment, inactiveSegment) {
            isRowClicked = true;
            FormControllerUtility.showProgressBar(this.view);
            //To get details
            isAddToEntityFlow = applicationManager.getNavigationManager().getCustomInfo("addToEntityFlow");
            if (isAddToEntityFlow === "addToEntity") {
                var navManager = applicationManager.getNavigationManager();
                var entityId = navManager.getCustomInfo("addToEntityDetails").addToEntityId;
            let businessBankingPresentationController = this.loadBusinessBankingModule().presentationController;
            var scope = this;
            this.selectedMap["selectedSeg"] = activeSegment.id;
            if (activeSegment.id === "segExistingUsers") {
                let userName = activeSegment.selectedRowItems[0].lblRoleName.value;
                this.selectedMap["selectedRow"] = userName;
                let param = {
                    "userName": userName,
                    "legalEntityId": entityId
                };
                businessBankingPresentationController.getInfinityUser(param);
            } else {
                let id = activeSegment.selectedRowItems[0].id;
                this.selectedMap["selectedRow"] = id;
                businessBankingPresentationController.getCustomRoleDetails({
                    "id": id,
                    "legalEntityId": entityId
                });
            }
        }
        else
        {
            let businessBankingPresentationController = this.loadBusinessBankingModule().presentationController;
            var scope = this;
            this.selectedMap["selectedSeg"] = activeSegment.id;
            if (activeSegment.id === "segExistingUsers") {
                let userName = activeSegment.selectedRowItems[0].lblRoleName.value;
                this.selectedMap["selectedRow"] = userName;
                let param = {
                    "userName": userName,
                };
                businessBankingPresentationController.getInfinityUser(param);
            } else {
                let id = activeSegment.selectedRowItems[0].id;
                this.selectedMap["selectedRow"] = id;
                businessBankingPresentationController.getCustomRoleDetails({
                    "id": id,
                });
            }
        }
            //For Active Segment
            var segData = activeSegment.data;
            var index = activeSegment.selectedRowIndex[1];
            segData[0][0].imgAcknowledged = {
                "isVisible": true
            };
            segData[0][1].forEach(function(arrayElement, i) {
                if (i == index) {
                    arrayElement.imgArrow = {
                        "transform": scope.imgArrowTransform,
                        "isVisible": true
                    };
                    arrayElement.flxInnerRole = {
                        "skin": "sknflxfbfbfb1pxShadowc0c0c0",
                        "accessibilityConfig": {
                            "a11yLabel": arrayElement.lblRoleName.text,
                            a11yARIA: {
                                "role": "radio",
                                "tabindex": 0,
                                "aria-checked": true ,
                            }
                        }
                    };
                    arrayElement.imgSelectRole = {
                        "src": "radiobtn_active.png"
                    };
                } else {
                    arrayElement.imgArrow = {
                        "transform": scope.imgArrowTransform,
                        "isVisible": false
                    };
                    arrayElement.flxInnerRole = {
                        "skin": "skne3e3e3br3pxradius",
                        "accessibilityConfig": {
                            "a11yLabel": arrayElement.lblRoleName.text,
                            a11yARIA: {
                                "role": "radio",
                                "tabindex": 0,
                                "aria-checked": false,
                            }
                        }
                    };
                    arrayElement.imgSelectRole = {
                        "src": "radio_btn_inactive.png"
                    };
                }
            });
            activeSegment.setData(segData);
            activeSegmentId = activeSegment;
            rowNumber = index;
            // activeSegment.setActive(index, 0, "flxSelectRoleContainer.flxInnerRole");
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
                arrayElement.flxInnerRole = {
                    "skin": "skne3e3e3br3pxradius",
                    "accessibilityConfig": {
                        "a11yLabel": arrayElement.lblRoleName.text,
                        a11yARIA: {
                            "role": "radio",
                            "tabindex": 0,
                            "aria-checked": false,
                        }
                    }
                };
                arrayElement.imgSelectRole = {
                    "src": "radio_btn_inactive.png"
                };
            });
            inactiveSegment.setData(segData1);
            // activeSegment.setActive(index, 0, "flxSelectRoleContainer.flxInnerRole");
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
        },
        //Get Existing Users
        getExistingUsers: function() {
            //FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.getAssociatedContractUsers();
        },
        //Method to show ExistingUsers
        showExistingUsers: function(existingUsers) {
            let self = this;
            let segHeader = {
                "lblDropdown": {
                    "text": "P",
                },
                "flxDropdown": {
                    "onClick": self.showOrHideCustomRolesOrExistingUsers.bind(this, self.view.segExistingUsers),
                    "accessibilityConfig":{
                        a11yLabel: kony.i18n.getLocalizedString("konybb.i18n.userMgmt.ExistingUsers"),
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":true
                        }
                    }
                },
                "lblFromAccountNo": {
                    "text": kony.i18n.getLocalizedString("konybb.i18n.userMgmt.ExistingUsers"),
                },
                "imgAcknowledged": {
                    "isVisible": self.selectedMap["selectedSeg"] === self.view.segExistingUsers.id
                }
            };
            let segRowData = [];
            if (existingUsers === null || existingUsers === undefined || existingUsers === -1 || existingUsers.length === 0) {
                this.view.NoExistingUsers.isVisible = true;
                //this.view.lblNoExistingUser.isVisible = true;
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
                this.view.forceLayout();
            } else {
                this.view.NoExistingUsers.isVisible = false;
                //this.view.lblNoExistingUser.isVisible = false;
                segRowData = existingUsers.map(function(user) {
                    return {
                        "flxSelectRoleContainer": {
                            "isVisible": true
                        },
                        "imgSelectRole": {
                            "src": self.selectedMap["selectedRow"] === user.userName ? "radiobtn_active.png" : "radio_btn_inactive.png"
                        },
                        "imgArrow": {
                            "transform": self.imgArrowTransform,
                            "isVisible": self.selectedMap["selectedRow"] === user.userName
                        },
                        "flxInnerRole": {
                            "skin": self.selectedMap["selectedRow"] === user.userName ? "sknflxfbfbfb1pxShadowc0c0c0" : "skne3e3e3br3pxradius",
                            "accessibilityConfig": {
                                "a11yLabel": user.name,
                                a11yARIA: {
                                    "role": "radio",
                                    "tabindex": 0,
                                    "aria-checked": false
                                    // "aria-checked": self.selectedMap["selectedRow"] === customRoles.id ? true : false,
                                }
                            }
                        },
                        "lblRoleName": {
                            "text": user.name,
                            "value": user.userName,
                        },
                        "name": user.name
                    };
                });
            }
            let segDataModel = [
                [segHeader, segRowData]
            ];
            this.view.segExistingUsers.setData(segDataModel);
        },
        showOrHideCustomRolesOrExistingUsers: function(selectedSegment) {
            let segHeaderData = selectedSegment.data[0][0];
            let segRowData = selectedSegment.data[0][1];
            if (segHeaderData.lblDropdown.text === "O") {
                segHeaderData.lblDropdown.text = "P";
                segRowData.forEach(function(arrayElement) {
                    arrayElement.flxSelectRoleContainer = {
                        "isVisible": true
                    };
                });
                segHeaderData.flxDropdown.accessibilityConfig = {
                    a11yLabel: segHeaderData.lblFromAccountNo.text,
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":true
                        }
                }
            } else {
                segHeaderData.lblDropdown.text = "O";
                segRowData.forEach(function(arrayElement) {
                    arrayElement.flxSelectRoleContainer = {
                        "isVisible": false
                    };
                });
                segHeaderData.flxDropdown.accessibilityConfig = {
                    a11yLabel: segHeaderData.lblFromAccountNo.text,
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":false
                        }
                }
            }
            selectedSegment.setData([
                [segHeaderData, segRowData]
            ]);
            selectedSegment.setActive(-1, 0, "flxCopyPermissionHeader.flxSegCopyPermissionsWrapper.flxDropdown");
        },
        searchRoleOrUser: function(searchString) {
            if (searchString === "") {
                this.view.Search.flxClearBtn.isVisible = false;
            } else {
                this.view.Search.flxClearBtn.isVisible = true;
            }
            //sortField,sortType,searchParams,searchString
            let customRolesSearchResult = CommonUtilities.sortAndSearchJSON(this.customRoles, null, null, "customRoleName", searchString);
            this.showCustomRoles(customRolesSearchResult);
            let existingUsersSearchResult = CommonUtilities.sortAndSearchJSON(this.existingUsers, null, null, "userName", searchString);
            this.showExistingUsers(existingUsersSearchResult);
            this.view.Search.txtSearch.placeholder = "Search with role or user";
        },
        showPermissionDetails: function(permissionDetails) {
            this.showAccountAccess(permissionDetails.companyList);
            this.showAccountLevelPermissions(permissionDetails.accountLevelPermissions);
            this.showOtherFeaturePermissions(permissionDetails.globalLevelPermissions);
            this.showTransactionLimits(permissionDetails.transactionLimits);
            FormControllerUtility.enableButton(this.view.btnProceedRoles);
        },
        showAccountAccess: function(companyList) {
            var lbltext1 = this.view.lblAccountNameMain.text;
            var lbltext2 = this.view.lblBankNameMain.text;
            var lbltext3 = this.view.lblReferenceIdMain.text;
            var lbltext4 = this.view.lblAccountAccess.text;
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
            console.log(companyList);
            this.view.flxRightContainerMain.isVisible = true;
            let segRowData = companyList.map(function(companyList) {
                let lastFourDigitOfCompanyId = companyList.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                return {
                    "lblLeftSideContent": {
                        "text": companyList.companyName + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            a11yARIA: {
                                "aria-hidden": true
                            }
                        }
                    },
                    "lblSample1": {
                        "text": lbltext1 + companyList.companyName + " - " + lastFourDigitOfCompanyId,
                    },
                    "lblRIghtSideContent": {
                        "text": companyList.userRole,
                        "accessibilityConfig": {
                            a11yARIA: {
                                "aria-hidden": true
                            }
                        }
                    },
                    "lblSample2": {
                        "text": lbltext2 + " " + companyList.userRole,
                    },
                    "lblRightMostContent": {
                        "text": companyList.selectedAccCount.toString(),
                        "accessibilityConfig": {
                            a11yARIA: {
                                "aria-hidden": true
                            }
                        }
                    },
                    "lblSample3": {
                        "text": lbltext3 + " " + companyList.selectedAccCount.toString(),
                    },
                    "lblSeparator": {
                        "isVisible": true
                    },
                    "lblRightContentAuto": {
                        "text": (companyList.autoSyncAccounts === "true") ? "On" : "Off",
                        "accessibilityConfig": {
                            a11yARIA: {
                                "aria-hidden": true
                            }
                        }
                    },
                    "lblSample4": {
                        "text": (companyList.autoSyncAccounts === "true") ? lbltext4 + " On" : lbltext4 + " Off",
                    },
                    "btnViewEdit": {
                        "isVisible": false
                    },
                    "flxViewEdit": {
                        "isVisible": false
                    }

                };
            });
            this.segData=segRowData;
             var datamap={
              "flxUserManagement": "flxUserManagement",
              "flxUserManagementAccAccessRole": "flxUserManagementAccAccessRole",
              "flxUserManagementAccPermissions": "flxUserManagementAccPermissions",
              "lblSample1":"lblSample1",
              "lblSample2":"lblSample2",
              "lblSample3":"lblSample3",
              "lblSample4":"lblSample4",
              "lblLeftSideContent": "lblLeftSideContent",
              "lblRIghtSideContent": "lblRIghtSideContent",
              "lblRightMostContent": "lblRightMostContent",
              "lblSeparator": "lblSeparator",
              "lblRightContentAuto": "lblRightContentAuto",
              "flxViewEdit": "flxViewEdit",
               "btnViewEdit" : "btnViewEdit"
            };
            this.view.segmentAccRoleMain.rowTemplate="flxUserManagementAccAccessRole";
            this.view.segmentAccRoleMain.widgetDataMap=datamap;
            this.view.segmentAccRoleMain.setData(segRowData);
        },
        showAccountLevelPermissions: function(accountLevelPermissions) {
            let self = this;
            let lbl = this.view.lblAccFeaturePermissionsMain.text;
            let segRowData = accountLevelPermissions.map(function(accountLevelPermissionsPerCompany, index) {
                let result = self.getAccountLevelDetailsToShow(accountLevelPermissionsPerCompany);
                let lastFourDigitOfCompanyId = accountLevelPermissionsPerCompany.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                return {
                    "lblRecipient": {
                        "text": accountLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                    },
                    "lblDropdown": {
                        "text": "O",
                    },
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segAccPermissionsSegMain, index),
                        "accessibilityConfig": {
                            "a11yLabel": lbl + " for " + accountLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                            a11yARIA: {
                                "role": "button",
                                "aria-expanded": false
                            }
                        }
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                    "lblSeparator2" : {
                       "isVisible" : true
                    },
                    "lblDefaultPermissionsSet": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
                    },
                    "lblTotalFeaturesSelected": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
                    },
                    "lblTxtDefaultPermissionsSet": {
                        "text": result.DefaultPermissionSet,
                    },
                    "lblTxtTotalFeaturesSelected": {
                        "text": result.TotalFeaturesSelected,
                    },
                  "btnViewEditAccountLevel" : {
                    //"onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
                    "isVisible" : false
                  }
                };
            });
            this.view.segAccPermissionsSegMain.setData(segRowData);
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
            let policySet = Object.keys(policyMap).join(", ");
            let result = {
                "DefaultPermissionSet": Object.keys(policyMap).join(", "),
                "TotalFeaturesSelected": enabledCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + totalCount
            }
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
            let policySet = Object.keys(policyMap).join(", ");
            let result = {
                "DefaultPermissionSet": Object.keys(policyMap).join(", "),
                "TotalFeaturesSelected": enabledCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + totalCount
            }
            return result;
        },
        showOtherFeaturePermissions: function(globalLevelPermissions) {
            let self = this;
            let lbl = this.view.segOtherFeaturePermissionsMain.text;
            let segRowData = globalLevelPermissions.map(function(globalLevelPermissionsPerCompany, index) {
                let result = self.getGlobalLevelDetailsToShow(globalLevelPermissionsPerCompany);
                let lastFourDigitOfCompanyId = globalLevelPermissionsPerCompany.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                return {
                    "lblRecipient": {
                        "text": globalLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                    },
                    "lblDropdown": {
                        "text": "O",
                    },
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segOtherFeaturePermissionsSegMain, index),
                        "accessibilityConfig": {
                            "a11yLabel": lbl + " for " + globalLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                            a11yARIA: {
                                "role": "button",
                                "aria-expanded": false
                            }
                        }
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                  "lblSeparator2" : {
                       "isVisible" : true
                    },
                    "lblDefaultPermissionsSet": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
                    },
                    "lblTotalFeaturesSelected": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
                    },
                    "lblTxtDefaultPermissionsSet": {
                        "text": result.DefaultPermissionSet,
                    },
                    "lblTxtTotalFeaturesSelected": {
                        "text": result.TotalFeaturesSelected,
                    },
                  "btnViewEditAccountLevel" : {
                    //"onClick" : self.navToNonAccountFeaturePermission.bind(this),
                    "isVisible" : false
                  }
                };
            });
            this.view.segOtherFeaturePermissionsSegMain.setData(segRowData);
        },
        showAccountLevelAccessDetails: function(selectedSegment, i) {
            let segData = selectedSegment.data;
            let rowData = segData[i];
            if (rowData.lblDropdown.text === "O") {
                rowData.lblDropdown.text = "P";
                rowData.flxDetails.isVisible = true;
                // rowData.flxDropdown.accessibilityConfig = {
                //     "a11yLabel": rowData.lblRecipient.text,
                //     a11yARIA: {
                //         "role": "button",
                //         "aria-expanded": true
                //     }
                // }
                if (selectedSegment.id === "segAccPermissionsSegMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.lblAccFeaturePermissionsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": true
                        }
                    }
                }
                if (selectedSegment.id === "segOtherFeaturePermissionsSegMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.segOtherFeaturePermissionsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": true
                        }
                    }
                }
                if (selectedSegment.id === "segTransactionLimitsMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.lbltransactionLimitsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": true
                        }
                    }
                }
            } else {
                rowData.lblDropdown.text = "O";
                rowData.flxDetails.isVisible = false;
                // rowData.flxDropdown.accessibilityConfig = {
                //     "a11yLabel": rowData.lblRecipient.text,
                //     a11yARIA: {
                //         "role": "button",
                //         "aria-expanded": false
                //     }
                // }
                if (selectedSegment.id === "segAccPermissionsSegMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.lblAccFeaturePermissionsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": false
                        }
                    }
                }
                if (selectedSegment.id === "segOtherFeaturePermissionsSegMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.segOtherFeaturePermissionsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": false
                        }
                    }
                }
                if (selectedSegment.id === "segTransactionLimitsMain") {
                    rowData.flxDropdown.accessibilityConfig = {
                        "a11yLabel": this.view.lbltransactionLimitsMain.text + " for " + rowData.lblRecipient.text,
                        a11yARIA: {
                            "role": "button",
                            "aria-expanded": false
                        }
                    }
                }
            }
            selectedSegment.setDataAt(rowData, i);
            selectedSegment.setActive(i, 0, "flxUserManagementBBCopyBoldText.flxtransferActivityWrapper.flxUserManagementAccPermissions.flxSegBulkWireAckWrapper.flxDropdown");
        },
        showTransactionLimits: function(transactionLimits) {
            let self = this;
            let lbl = this.view.lbltransactionLimitsMain.text;
            let segRowData = transactionLimits.map(function(transactionLimits, index) {
                let limits = self.getLimits(transactionLimits);
                let lastFourDigitOfCompanyId = transactionLimits.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                return {
                    "lblRecipient": {
                        "text": transactionLimits.companyName + " - " + lastFourDigitOfCompanyId,
                    },
                    "lblDropdown": {
                        "text": "O",
                    },
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segTransactionLimitsMain, index),
                        "accessibilityConfig": {
                            "a11yLabel": lbl + " for " + transactionLimits.companyName + " - " + lastFourDigitOfCompanyId,
                            a11yARIA: {
                                "role": "button",
                                "aria-expanded": false
                            }
                        }
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                  "lblSeparator": {
                     "isVisible" : false
                  },
                    "lblHeader": {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits"),
                    },
                    "lblSubHeader": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.IndividualTransactionLimits"),
                    },
                    "lblPerTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        
                    },
                    "lblDailyTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                    },
                    "lblWeeklyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        
                    },
                    "lblTxtPerTransactionLimits": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[0]),
                        
                    },
                    "lblTxtDailyTransactionLimits": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[1]),
                        
                    },
                    "lblTxtWeeklyTransactionLimits": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[2]),
                        
                    },
                    "lblHeader1": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.BulkTransactionLimits"),
                        
                    },
                    "lblPerTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        
                    },
                    "lblDailyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        
                    },
                    "lblWeeklyTransactionLimit1": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        
                    },
                    "lblPerTransactionLimitValue": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[3]),
                       
                    },
                    "lblDailyTransactionLimitValue": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[4]),
                        
                    },
                    "lblWeeklyTransactionLimitValue1": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[5]),
                       
                    },
                  "btnViewEditLimits" : {
                    //"onClick" : self.navToTransactionLimits.bind(this),
                    "isVisible" : false
                  }
                };
            });
            this.view.segTransactionLimitsMain.setData(segRowData);
        },
        onBackClick: function() {
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (flowType === true) {
                this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
                this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
            } else {
                var navObject = new kony.mvc.Navigation("frmCreateUserManually");
                navObject.navigate("frmCopyPermission");
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
        }
    };
});