define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var userManagementData = {};
    return /** @alias module:frmUserManagementController */ {
        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
      segData:"",
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
          var scope=this;
           var data = scope.segData;
           data=(scope.segData!=="")? scope.segData:scope.view.segmentAccRole.data;
          var datamap={
            "flxUserManagement": "flxUserManagement",
            "flxUserManagementAccAccessRole": "flxUserManagementAccAccessRole",
            "flxUserManagementAccPermissions": "flxUserManagementAccPermissions",
            "lblLeftSideContent": "lblLeftSideContent",
            "lblRIghtSideContent": "lblRIghtSideContent",
            "lblRightMostContent": "lblRightMostContent",
            "lblSeparator": "lblSeparator",
            "lblRightContentAuto": "lblRightContentAuto",
          };
          scope.view.segmentAccRole.rowTemplate="flxUserManagementAccAccessRole";
          scope.view.segmentAccRole.widgetDataMap=datamap;
          scope.view.segmentAccRole.setData(data);
             if (width <= 640 || orientationHandler.isMobile) {
                scope.view.segmentAccRole.setData(data);
             } else if (width <= 1024) {
                scope.view.segmentAccRole.setData(data);
            } else if (width <= 1366) {
                scope.view.segmentAccRole.setData(data);
            } else {
                scope.view.segmentAccRole.setData(data);
            }
          
          var breakPointData = scope.breakPointData;
          //data=(scope.segData!=="")? scope.segData:scope.view.segmentAccRole.data;
          if(breakPointData !== undefined){
            var breakPointdatamap = {
              "flxUserManagement" : "flxUserManagement",
              "lblLeftSideContent" : "lblLeftSideContent",
              "lblRIghtSideContent" : "lblRIghtSideContent",
              "flxWarning" : "flxWarning",
              "imgNoSigGrps" : "imgNoSigGrps",
              "lblRightContentAuto" : "lblRightContentAuto"
            };
            //scope.view.segSignatoryGroup.rowTemplate="flxUserManagementAccAccessRole";
            scope.view.segSignatoryGroup.widgetDataMap=breakPointdatamap;
            scope.view.segSignatoryGroup.setData(breakPointData);
            if (width <= 640 || orientationHandler.isMobile) {
              scope.view.segSignatoryGroup.setData(breakPointData);
            } else if (width <= 1024) {
              scope.view.segSignatoryGroup.setData(breakPointData);
            } else if (width <= 1366) {
              scope.view.segSignatoryGroup.setData(breakPointData);
            } else {
              scope.view.segSignatoryGroup.setData(breakPointData);
            }
          }
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
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },

        loadAccountModule: function() {
          return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "HomepageMA",
            "moduleName": "AccountsUIModule"
          });
      },
        clearOldData : function(){
          this.segData = [];
          this.view.lblBillerValue.text = "";
          this.view.lblAccountTypeValue.text = "";
          this.view.lblAccountNumberValue.text = "";
          this.view.lblBeneficiaryNameValue.text = "";
          this.view.lblAccountNickNameValue.text = "";
          this.view.lblDriverLicenceNumber.text = "";
          this.view.segmentAccRole.setData([]);
          this.view.segSignatoryGroup.setData([]);
          this.view.segAccPermissionsSeg.setData([]);
          this.view.segOtherFeaturePermissionsSegMain.setData([]);
          this.view.segTransactionLimitsMain.setData([]);
        },
        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
            var self = this;
            this.view.customheadernew.forceCloseHamburger();
          	this.view.btnAckCreateUser.setVisibility(false);
            this.configManager = applicationManager.getConfigurationManager();
          	this.view.flxContentAckContainer.setVisibility(false);
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.currencyCode = this.loadAccountModule().presentationController.accounts[0].currencyCode;
            this.view.customheadernew.btnHamburgerNew.skin = "btnHamburgerskn";
          	if(this.view.customheadernew.flxMenu !== undefined){
            this.view.customheadernew.flxMenu.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            }
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;

            //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User");          
            this.currentVisibleFlex = "flxUserDetails";
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
            //applicationManager.getNavigationManager().applyUpdates(this);
            let businessBankingPresentationController = this.loadBusinessBankingModule().presentationController;
            let data = businessBankingPresentationController.getUserManagementData();
            applicationManager.getNavigationManager().updateForm({
              ackDetails: data,
            }, "frmConfirmAndAck");
            var navManager = applicationManager.getNavigationManager();
            var flowValue = navManager.getCustomInfo('editUserFlow');
            this.view.customheadernew.btnSkipNav.onClick = function(){
            self.view.lblContentHeader.setActive(true);
        };  
          if(flowValue === "editFlow")
            {
              this.contractDetails = navManager.getCustomInfo("contractDetails");
              this.userAccounts = navManager.getCustomInfo("userAccounts");
              var userId = navManager.getCustomInfo("userId");
              var contractId = this.contractDetails.contracts[0].contractId;
              var coreCustomerId = this.contractDetails.contracts[0].contractCustomers[0].id;
              var getInfinityUser = navManager.getCustomInfo('getInfinityUser');
              if(getInfinityUser !== "true")
              this.getInfinityUser(userId,contractId,coreCustomerId,"accountAccess");
            }
        },
        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            this.onBreakpointChange();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.lblReferenceId.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
            this.view.lblAccountAccess.text = kony.i18n.getLocalizedString("i18n.konyolb.userMgmt.Autoaccess");
            //this.view.customheadernew.activateMenu("User Management", "Create A User");
            this.flowConfig = this.loadBusinessBankingModule().presentationController.getFlowConfigs();
            this.userManagementFlow = this.flowConfig.userManagementFlow || '';
            this.userCreationFlow = this.flowConfig.userCreationFlow || '';
            this.userPermissionFlow = this.flowConfig.userPermissionFlow || '';
            this.userNavigationType = this.flowConfig.userNavigationType || '';
            var navManager = applicationManager.getNavigationManager();
            var flowValue = navManager.getCustomInfo('editUserFlow');
            if(flowValue !== "editFlow"){
            	this.showAllUserDetails();  
            }
          applicationManager.getConfigurationManager().editFlag = false;
          var sigGrps = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          //this.count = false;
          var self = this;
          var userData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          this.compName = [];
          userData.globalLevelPermissions.forEach(function(item){
            item.features.forEach(function(feature){
              if(feature.featureId === "APPROVAL_MATRIX"){
                feature.permissions.forEach(function(permission){
                  if(permission.actionId === "APPROVAL_MATRIX_MANAGE"){
                    if(permission.isEnabled){
                      self.compName.push(item.companyName);
                    }
                  }
                });
              }
            });
          });
          if(this.compName.length === 0){
            this.setSegmentVisibility(false);
          }
          else{
            if(applicationManager.getConfigurationManager().skipFlag ){
              this.setSegmentVisibility(false);
            }
            else{
              if(sigGrps.signatoryGroups !== undefined && sigGrps.signatoryGroups.length > 0){
                this.setSegmentVisibility(true);
                this.populateSigGrps();
              }
              else{
                var compNames = applicationManager.getConfigurationManager().compNameArr;
                if(compNames !== undefined){
                  this.populateNoSigGrps(compNames);
                  this.setSegmentVisibility(true);
                }
                else{
                  this.setSegmentVisibility(false);
                }
              }
            }
          }
          
            applicationManager.getNavigationManager().applyUpdates(this);
            // FormControllerUtility.hideProgressBar(this.view);
            if(!this.view.btnAckCreateUser.isVisible)
              this.view.btnAckBack.text = kony.i18n.getLocalizedString('konyolb.usermanagement.BackAllUsers');
            else
              this.view.btnAckBack.text = kony.i18n.getLocalizedString('i18n.CardManagement.Back');
        },
      
      setSegmentVisibility : function(bool){
        this.view.flxSignatoryGroups.setVisibility(bool);
        this.view.flxSignatoryGroupTitle.setVisibility(bool);
        this.view.flxSignatoryGroupSeg.setVisibility(bool);
      }, 

      onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.customheader.headermenu.btnLogout.setActive(true);
                }
                
            }
        },

      populateSigGrps : function(){
        var scope = this;
        this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
        this.view.btnViewEdit.onClick = function() {
            scope.onSigGrpEdit();
          }.bind(this);
        applicationManager.getConfigurationManager().backFlag = true;
        var dataMap = {
          "flxUserManagement" : "flxUserManagement",
          "lblLeftSideContent" : "lblLeftSideContent",
          "lblRIghtSideContent" : "lblRIghtSideContent",
          "lblSeparator" : "lblSeparator",
          "flxWarning" : "flxWarning",
          "imgNoSigGrps" : "imgNoSigGrps",
          "lblRightContentAuto" : "lblRightContentAuto"
        };
        var scopeObj = this;
        var dropDownRowData = [];
        var sigGrps = this.loadBusinessBankingModule().presentationController.getUserManagementData();
        var selectedGroup;
        var bool;
        var count = 0;
        for (var i = 0; i < sigGrps.signatoryGroups.length; i++) {
          if(sigGrps.signatoryGroups[i].groups.length === 0 ){
            selectedGroup = kony.i18n.getLocalizedString("i18n.common.none");
            bool = true;
          }
          else{
            sigGrps.signatoryGroups[i].groups.forEach(function(item){
              if(item.isAssociated === "true"){
                selectedGroup = item.signatoryGroupName;
                count++;
                bool = false;
              }
              if(item.isAssociated === "false" && count === 0){
                selectedGroup = kony.i18n.getLocalizedString("i18n.common.none");
                bool = true;
              }
            });
          }
          var RowVal = {
            lblLeftSideContent: {
              "text": sigGrps.signatoryGroups[i].companyName
            },
            lblRIghtSideContent : {
              "text" : selectedGroup
            },
            flxWarning : {
              "isVisible" : false
            },
            lblSeparator : {
              "isVisible" : true
            },
            imgNoSigGrps : {
              "src" : "error_yellow_2.png"
            },
            lblRightContentAuto : {
              "text" : "User does not have any approval permission"
            }
          };
          dropDownRowData.push(RowVal);
        }
        this.breakPointData = dropDownRowData;
        this.view.segSignatoryGroup.widgetDataMap = dataMap;
        this.view.segSignatoryGroup.setData(dropDownRowData);
      },
      
      populateNoSigGrps : function(compNames){
        var scope = this;
        this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
        this.view.btnViewEdit.onClick = function() {
          scope.onSigGrpEdit();
        }.bind(this);
        applicationManager.getConfigurationManager().backFlag = true;
        var dataMap = {
          "flxUserManagement" : "flxUserManagement",
          "lblLeftSideContent" : "lblLeftSideContent",
          "lblRIghtSideContent" : "lblRIghtSideContent",
          "flxWarning" : "flxWarning",
          "imgNoSigGrps" : "imgNoSigGrps",
          "lblRightContentAuto" : "lblRightContentAuto"
        };
        var scopeObj = this;
        var dropDownRowData = [];
        var sigGrps = this.loadBusinessBankingModule().presentationController.getUserManagementData();
        var selectedGroup;
        var bool;
        var count = 0;
        //var compNames = applicationManager.getConfigurationManager().compNameArr;
        for (var i = 0; i < compNames.length; i++) {

          var RowVal = {
            lblLeftSideContent: {
              "text": compNames[i]
            },
            lblRIghtSideContent : {
              "text" : kony.i18n.getLocalizedString("i18n.common.none")
            },
            flxWarning : {
              "isVisible" : true
            },
            imgNoSigGrps : {
              "src" : "error_yellow_2.png"
            },
            lblRightContentAuto : {
              "text" : kony.i18n.getLocalizedString("konybb.userMgmt.errorsignatorygroup")
            }
          };
          dropDownRowData.push(RowVal);
        }
        this.view.segSignatoryGroup.widgetDataMap = dataMap;
        this.view.segSignatoryGroup.setData(dropDownRowData);
      },
      
        showAllUserDetails: function(userDetailsData) {
          this.userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
          var navManager =  applicationManager.getNavigationManager();
          var isManualFlow = navManager.getCustomInfo("manualFlow");
          if(isManualFlow === "manualFlow" || this.userManagementData.customRoleDetails === undefined){
          if (this.userManagementData.hasOwnProperty('customRoleDetails')) {
        		delete this.userManagementData.customRoleDetails;
            }
            var customRoleDetails = navManager.getCustomInfo('customRoleDetails');
            this.userManagementData.customRoleDetails = customRoleDetails;
            }
          navManager.setCustomInfo("updateSuccessData",null);
		  this.loadBusinessBankingModule().presentationController.setUserManagementData(this.userManagementData);
          var flowValue = navManager.getCustomInfo('editUserFlow');
          var addToEntityFlow = navManager.getCustomInfo('addToEntityFlow');
          var entityDetails = navManager.getCustomInfo('addToEntityDetails');
          if(userDetailsData !== undefined)
            this.userDetailsData = userDetailsData.userDetails;
            var flowType = this.userManagementFlow;
            var navManager = applicationManager.getNavigationManager();
            var CustomName = navManager.getCustomInfo("CustomerName");
            var CustomEmailId = navManager.getCustomInfo("CustomerEmailId");
            var userFullName = "";
            var userEmailId = "";
            var userfullName = "";
            var useremailId = "";
            if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
                this.view.lblName.isVisible = true;
                this.view.lblEmail.isVisible = true;
                userFullName = CustomName;
                userEmailId = CustomEmailId;
                this.view.lblName.text = userFullName;
                this.view.lblEmail.text = userEmailId;
            } else {
              if(addToEntityFlow === "addToEntity"){
                this.view.flxAddToOtherEntityDetails.setVisibility(true);
                this.view.lblEntityDetails.text = "Adding "+'"'+entityDetails.userDetails.selectedUserName+'"'+" to "+'"'+entityDetails.addToEntityName+'"'+" entity";
              }
                if (flowValue === "editFlow") {
                    if (userDetailsData !== undefined) 
                    userfullName = CustomName;
                    useremailId = CustomEmailId;
                } else 
                userfullName = CustomName;
                useremailId = CustomEmailId;
                this.view.lblName.isVisible = true;
                this.view.lblEmail.isVisible = true;
                this.view.lblName.text = userfullName;
                this.view.lblEmail.text = useremailId;
                //if (flowValue === "editFlow")
                //    if (userDetailsData !== undefined) this.view.lblEmail.text = userDetailsData.userDetails.email;
                //    else this.view.lblEmail.text = this.userManagementData.userDetails.email;
            }
            if (this.flowConfig.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
              navManager.setCustomInfo("EditType","userEdit");
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    this.setAllUseri18nTexts();
                    this.view.customheadernew.activateMenu("User Management", "Create UM User");
                    this.view.btnViewNEdit.onClick = this.navigateToAccountAccessandRole;
                    this.view.btnEdit.onClick = this.navigateToAccountLevelFeaturePermissions;
                    this.view.btnPermissionsEdit.onClick = this.navToNonAccountFeaturePermission;
                    this.view.btnTransactionEdit.onClick = this.navToTransactionLimits;
                    this.view.btnViewNEdit.isVisible = false;
                    this.view.btnEdit.isVisible = false;
                    this.view.btnViewEdit.isVisible = true;
                    this.view.btnPermissionsEdit.isVisible = false;
                    this.view.btnTransactionEdit.isVisible = false;
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.userManagement.verifyUserDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.lblUserDetailsHeading, kony.i18n.getLocalizedString("i18n.konybb.common.UserDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.btnAckCreateUser, kony.i18n.getLocalizedString("i18n.konybb.Common.CreateUser"), accessibilityConfig);
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.verifyUserDetails");
                    this.view.lblUserDetailsHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.UserDetails");
                    this.view.btnAckCreateUser.text = kony.i18n.getLocalizedString("i18n.konybb.Common.CreateUser");
                    this.view.btnAckCreateUser.isVisible = true;
                    this.view.btnAckCancel.isVisible = true;
                    this.view.btnAckBack.isVisible = true;

                  var navMan=applicationManager.getNavigationManager();
                  var profileExistsFlag = navMan.getCustomInfo("frmCreateUserManually");
                  var retriveExistingUserFlag = navManager.getCustomInfo("retieveFlag");
                  var scope = this;

                  if(retriveExistingUserFlag === true && retriveExistingUserFlag !== undefined) {
                  	if(profileExistsFlag.isProfileExists === "true"){
                       this.view.btnAckCreateUser.onClick = function(){
                       scope.createInfinityUser("edit");
                     };
                    }
                     if(profileExistsFlag.isProfileExists === "false"){                 
                        this.view.btnAckCreateUser.onClick = function(){
                        scope.createInfinityUser("create");
                        }
                     }              
                  }
                  else {
		                     if(addToEntityFlow==="addToEntity"){
                        //CommonUtilities.setText(this.view.btnAckCreateUser, "Add User", accessibilityConfig);
                        this.view.btnAckCreateUser.text = "Add User";
                        this.view.lblContentHeader.text="Verify User Details";
                        this.view.lblName.isVisible = false;
                        this.view.btnAckCreateUser.onClick = function(){
                        scope.createUserAnotherEntity();
                         }
                      }
                     else{
                        this.view.btnAckCreateUser.onClick = this.createInfinityUser;
                         }
                  }
                    this.view.btnAckCancel.onClick = this.onCancelClick;
                    if (this.flowConfig.userPermissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.SKIP) {
                        this.view.btnAckBack.onClick = this.onBackClickUserSkip;
                    } else if (this.flowConfig.userPermissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.COPY) {
                        this.view.btnAckBack.onClick = this.onBackClickUserCopy;
                    }
                } else if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    this.view.customheadernew.activateMenu("User Management", "All Users");
                    let isEditable = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_EDIT");
                    let isNotLoggedInUserData = applicationManager.getUserPreferencesManager().getUserId() !== this.userManagementData.userDetails.id;
                    //this.view.btnAckBack.onClick = this.loadBusinessBankingModule().presentationController.navigateToUMDashboard;
                    this.view.btnAckBack.onClick = this.onBackClickUserManagement;
                    if (isEditable && isNotLoggedInUserData) {
                        this.view.btnViewNEdit.onClick = this.navigateToAccountAccessandRole;
                        this.view.btnEdit.onClick = this.navigateToAccountLevelFeaturePermissions;
                        this.view.btnPermissionsEdit.onClick = this.navToNonAccountFeaturePermission;
                        this.view.btnTransactionEdit.onClick = this.navToTransactionLimits;
                        this.view.btnViewNEdit.isVisible = false;
                        this.view.btnEdit.isVisible = false;
                      	this.view.btnViewEdit.isVisible = false;
                        this.view.btnPermissionsEdit.isVisible = false;
                        this.view.btnTransactionEdit.isVisible = false;
                        //this.view.btnAckCreateUser.isVisible = true;
                    } else {
                        this.view.btnViewNEdit.isVisible = false;
                        this.view.btnEdit.isVisible = false;
                      this.view.btnViewEdit.isVisible = false;
                        this.view.btnPermissionsEdit.isVisible = false;
                        this.view.btnTransactionEdit.isVisible = false;
                        this.view.btnAckCreateUser.isVisible = false;
                    }
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.userManagement.verifyUserDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.lblUserDetailsHeading, kony.i18n.getLocalizedString("i18n.konybb.common.UserDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.btnAckBack, kony.i18n.getLocalizedString("konyolb.usermanagement.BackAllUsers"), accessibilityConfig);
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.verifyUserDetails");
                    this.view.lblUserDetailsHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.UserDetails");
                    this.view.btnAckBack.setVisibility(true);
                  	this.view.btnAckCancel.setVisibility(false);
                  if(applicationManager.getConfigurationManager().enableCreateFlag === false || applicationManager.getConfigurationManager().enableCreateFlag === undefined ){
						FormControllerUtility.enableButton(this.view.btnAckCreateUser);
                  } else {
						FormControllerUtility.enableButton(this.view.btnAckCreateUser);
					}
//                     this.view.btnAckCancel.isVisible = false;
//                     this.view.btnAckBack.isVisible = true;
//                     this.view.btnAckBack.onClick = this.onCancelClick;
                }
            } else if (this.flowConfig.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
              navManager.setCustomInfo("EditType","roleEdit");
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
                    this.view.btnViewNEdit.isVisible = false;
                    this.view.btnEdit.isVisible = false;
                    this.view.btnViewEdit.isVisible = true;
                    this.view.btnPermissionsEdit.isVisible = false;
                    this.view.btnTransactionEdit.isVisible = false;
                    this.view.btnViewNEdit.onClick = this.navigateToAccountAccessandRole;
                    this.view.btnEdit.onClick = this.navigateToAccountLevelFeaturePermissions;
                    this.view.btnPermissionsEdit.onClick = this.navToNonAccountFeaturePermission;
                    this.view.btnTransactionEdit.onClick = this.navToTransactionLimits;
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.userManagement.verifyCreateRoleDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.lblUserDetailsHeading, kony.i18n.getLocalizedString("i18n.userManagement.roleDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.btnAckCreateUser, kony.i18n.getLocalizedString("i18n.userManagement.CreateRole"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.lblAccAccess,  kony.i18n.getLocalizedString("i18n.userManagement.customerRoles"), accessibilityConfig);
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.verifyCreateRoleDetails");
                    this.view.lblUserDetailsHeading.text = kony.i18n.getLocalizedString("i18n.userManagement.roleDetails");
                    this.view.btnAckCreateUser.text = kony.i18n.getLocalizedString("i18n.userManagement.CreateRole");
                    this.view.lblAccAccess.text = kony.i18n.getLocalizedString("i18n.userManagement.customerRoles");
                    this.view.btnAckCreateUser.isVisible = true;
                    this.view.btnAckCancel.isVisible = true;
                    this.view.btnAckBack.isVisible = true;
                    this.view.btnAckCreateUser.onClick = this.createCustomRole;
                    this.view.btnAckCancel.onClick = this.loadBusinessBankingModule().presentationController.navigateToUserRoles;
                    if (this.flowConfig.userPermissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.SKIP) {
                        this.view.btnAckBack.onClick = this.onBackClickUserSkip;
                    } else if (this.flowConfig.userPermissionFlow === OLBConstants.USER_MANAGEMENT_TYPE.COPY) {
                        this.view.btnAckBack.onClick = this.onBackClickRoleCopy;
                    }
                } else if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    this.view.customheadernew.activateMenu("User Management", "User Roles");
                    let isEditable = applicationManager.getConfigurationManager().checkUserPermission("CUSTOM_ROLES_CREATE");
                    this.view.btnAckBack.onClick = this.loadBusinessBankingModule().presentationController.navigateToUserRoles;
                    this.view.btnAckCreateUser.setVisibility(false);
                    if (isEditable) {
                        this.view.btnViewNEdit.onClick = this.navigateToAccountAccessandRole;
                        this.view.btnEdit.onClick = this.navigateToAccountLevelFeaturePermissions;
                        this.view.btnPermissionsEdit.onClick = this.navToNonAccountFeaturePermission;
                        this.view.btnTransactionEdit.onClick = this.navToTransactionLimits;
                        this.view.btnViewNEdit.isVisible = false;
                        this.view.btnEdit.isVisible = false;
                      this.view.btnViewEdit.isVisible = true;
                        this.view.btnPermissionsEdit.isVisible = false;
                        this.view.btnTransactionEdit.isVisible = false;
                        this.view.btnAckCreateUser.isVisible = true;
                        this.view.btnAckCreateUser.onClick = this.loadBusinessBankingModule().presentationController.navigateToUserRoles;
                    } else {
                        this.view.btnViewNEdit.isVisible = false;
                        this.view.btnEdit.isVisible = false;
                       this.view.btnViewEdit.isVisible = false;
                        this.view.btnPermissionsEdit.isVisible = false;
                        this.view.btnTransactionEdit.isVisible = false;
                        this.view.btnAckCreateUser.isVisible = false;
                    }
                    this.setLocaleStringsForViewEditCustomRoleScreen();
                    // CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.userManagement.verifyCreateRoleDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.lblUserDetailsHeading, kony.i18n.getLocalizedString("i18n.userManagement.roleDetails"), accessibilityConfig);
                    // CommonUtilities.setText(this.view.btnAckCreateUser, kony.i18n.getLocalizedString("i18n.PayAPerson.Update"), accessibilityConfig);
                    this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.userManagement.verifyCreateRoleDetails");
                    this.view.lblUserDetailsHeading.text = kony.i18n.getLocalizedString("i18n.userManagement.roleDetails");
                    this.view.btnAckCreateUser.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                    this.view.btnAckCancel.isVisible = false;
                    this.view.btnAckBack.isVisible = true;
                    this.view.btnAckBack.onClick = this.loadBusinessBankingModule().presentationController.navigateToUserRoles;
                }
            }
             if (this.width <= 640 || orientationHandler.isMobile) {
               this.view.btnEdit.isVisible = false;
               this.view.btnViewNEdit.isVisible = false;
               this.view.btnViewEdit.isVisible = false;
               this.view.btnPermissionsEdit.isVisible = false;
               this.view.btnTransactionEdit.isVisible = false;
               this.view.btnAckCreateUser.isVisible = false;
              this.view.forceLayout();
            }
            if(flowValue === "editFlow"){
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            this.showPermissionDetails(this.contractDetails);
          }
          else{
            let navMan = applicationManager.getNavigationManager();
            var createFlowType = navMan.getCustomInfo("createManualFlow");
            if(createFlowType === "createManualFlow"){
              this.view.btnEdit.isVisible = false;
              this.view.btnViewNEdit.isVisible = false;
              this.view.btnViewEdit.isVisible = true;
              this.view.btnPermissionsEdit.isVisible = false;
              this.view.btnTransactionEdit.isVisible = false;
              
              this.view.flxFullName.isVisible = true;
              this.view.flxDOB.isVisible = true;
              this.view.flxEmailAddress.isVisible = true;
              this.view.flxRegisteredPhnNo.isVisible = true;
              this.view.flxDriversLicence.isVisible = true;
              this.view.flxAccountNickName.isVisible = true;
              
              delete this.userManagementData.userDetails;
              var userDetails = navManager.getCustomInfo("userDetails");
              var firstName = navMan.getCustomInfo("firstName");
              var lastName = navMan.getCustomInfo("lastName");
              var middleName = navMan.getCustomInfo("middleName");
              var coreCustomerId = navMan.getCustomInfo("coreCustomerId");
              var email = navMan.getCustomInfo("email");
              var phone = navMan.getCustomInfo("phone");
              var phoneCountryCode = navMan.getCustomInfo("phoneCountryCode");
              var dateOfBirth = navMan.getCustomInfo("dateOfBirth");
              var taxId = navMan.getCustomInfo("taxId");
              var drivingLicenseNumber = navMan.getCustomInfo("drivingLicenseNumber");
              
              userDetails.firstName = firstName;
              userDetails.lastName = lastName;
              userDetails.middleName = middleName;
              userDetails.email = email;
              userDetails.phoneNumber = phone;
              userDetails.dob = dateOfBirth;
              userDetails.id = coreCustomerId;
              userDetails.ssn = taxId;
              userDetails.drivingLicenseNumber = drivingLicenseNumber;
              this.userManagementData.userDetails = userDetails;
	              var fullName = userDetails.firstName + " " + userDetails.lastName;
            //   CommonUtilities.setText(this.view.lblAccountNickNameValue, userDetails.ssn, CommonUtilities.getaccessibilityConfig());
            //   CommonUtilities.setText(this.view.lblBillerValue, fullName, CommonUtilities.getaccessibilityConfig());
            //   CommonUtilities.setText(this.view.lblAccountTypeValue, userDetails.dob, CommonUtilities.getaccessibilityConfig());	
            //   CommonUtilities.setText(this.view.lblAccountNumberValue, userDetails.email, CommonUtilities.getaccessibilityConfig());
            //   CommonUtilities.setText(this.view.lblBeneficiaryNameValue, userDetails.phoneNumber, CommonUtilities.getaccessibilityConfig());
            //   CommonUtilities.setText(this.view.lblDriverLicenceNumber, userDetails.drivingLicenseNumber, CommonUtilities.getaccessibilityConfig());
              this.view.lblAccountNickNameValue.text = userDetails.ssn;
              this.view.lblBillerValue.text = fullName;
              this.view.lblAccountTypeValue.text = userDetails.dob;
              this.view.lblAccountNumberValue.text = userDetails.email;
              this.view.lblBeneficiaryNameValue.text = userDetails.phoneNumber;
              this.view.lblDriverLicenceNumber.text = userDetails.drivingLicenseNumber;
              navManager.setCustomInfo("userDetailsManual",userDetails);
              this.showPermissionDetails(this.userManagementData);
            }
            else if(createFlowType === "createCopyFlow"){
              this.showPermissionDetails(this.userManagementData);
            }
            else{
              delete this.userManagementData.userDetails;
              let navManager = applicationManager.getNavigationManager();
              var userDetails = navManager.getCustomInfo("userDetails");
              if(userDetails !== undefined)
              {
                var phoneNumber = userDetails.phoneNumber;
                userDetails.id = userDetails.coreCustomerId;//phoneNumber.substring(0,3) + "-" + phoneNumber.substring(3);
                if(phoneNumber !== undefined){
                   userDetails.phoneNumber = phoneNumber.substring(1,3) + phoneNumber.substring(3);
                }
                this.userManagementData.userDetails = userDetails;
                this.showPermissionDetails(this.userManagementData);
              }
              else{
                 this.showPermissionDetails(this.userManagementData);
              }
            }
          }
        },
        setAllUseri18nTexts: function() {
            let accessibilityConfig = CommonUtilities.getaccessibilityConfig();

            // Edit Buttons
            // CommonUtilities.setText(this.view.btnViewNEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnViewEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnTransactionEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnPermissionsEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnViewMoreDetails, kony.i18n.getLocalizedString("kony.mb.common.Edit"), accessibilityConfig);
            this.view.btnViewNEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnViewEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnTransactionEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnPermissionsEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnViewMoreDetails.text = kony.i18n.getLocalizedString("kony.mb.common.Edit");

            // Labels at top
            // CommonUtilities.setText(this.view.lblAccountType, kony.i18n.getLocalizedString("i18n.NAO.DOB"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblBeneficiaryName, kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredPhoneNo"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblLicenceNumber, kony.i18n.getLocalizedString("i18n.konybb.createUser.DriversLicenseNumber"), accessibilityConfig);
            this.view.lblAccountType.text = kony.i18n.getLocalizedString("i18n.NAO.DOB");
            this.view.lblBeneficiaryName.text = kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredPhoneNo");
            this.view.lblLicenceNumber.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.DriversLicenseNumber");

            // Account Access & Role
            // CommonUtilities.setText(this.view.lblAccountAccess, kony.i18n.getLocalizedString("i18n.konyolb.userMgmt.Autoaccess"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblReferenceId, kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts"), accessibilityConfig);
            // CommonUtilities.setText(this.view.CopylblBankName0d407e605ff1141, kony.i18n.getLocalizedString("i18n.konybb.Common.Role"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblAccountName, kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer"), accessibilityConfig);
            this.view.lblAccountAccess.text = kony.i18n.getLocalizedString("i18n.konyolb.userMgmt.Autoaccess");
            this.view.lblReferenceId.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
            this.view.CopylblBankName0d407e605ff1141.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            this.view.lblAccountName.text = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer");

            // Other Feature Permissions
            //CommonUtilities.setText(this.view.segOtherFeaturePermissions, kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission"), accessibilityConfig);
            this.view.segOtherFeaturePermissions.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission");
        },
        
        setLocaleStringsForViewEditCustomRoleScreen: function() {
            let accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            // CommonUtilities.setText(this.view.btnViewNEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnViewEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnTransactionEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnPermissionsEdit, kony.i18n.getLocalizedString("i18n.signatory.vieworedit"), accessibilityConfig);
            // CommonUtilities.setText(this.view.btnViewMoreDetails, kony.i18n.getLocalizedString("kony.mb.common.Edit"), accessibilityConfig);
            this.view.btnViewNEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnViewEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnTransactionEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnPermissionsEdit.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            this.view.btnViewMoreDetails.text = kony.i18n.getLocalizedString("kony.mb.common.Edit");

            // Account Access & Role
            // CommonUtilities.setText(this.view.lblAccountAccess, kony.i18n.getLocalizedString("i18n.konyolb.userMgmt.Autoaccess"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblReferenceId, kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts"), accessibilityConfig);
            // CommonUtilities.setText(this.view.CopylblBankName0d407e605ff1141, kony.i18n.getLocalizedString("i18n.konybb.Common.Role"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblAccountName, kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer"), accessibilityConfig);
            this.view.lblAccountAccess.text = kony.i18n.getLocalizedString("i18n.konyolb.userMgmt.Autoaccess");
            this.view.lblReferenceId.text =  kony.i18n.getLocalizedString("i18n.AccountsAggregation.SelectedAccounts");
            this.view.CopylblBankName0d407e605ff1141.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            this.view.lblAccountName.text = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer");

            // Signatory Group
            // CommonUtilities.setText(this.view.lblSignatoryGroup, kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblCustomers, kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer"), accessibilityConfig);
            // CommonUtilities.setText(this.view.lblSigGroup, kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup"), accessibilityConfig); 
            this.view.lblSignatoryGroup.text = kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup");
            this.view.lblCustomers.text = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.Customer");
            this.view.lblSigGroup.text = kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup");

            // Account level feature permissions
            //CommonUtilities.setText(this.view.lblAccFeaturePermissions, kony.i18n.getLocalizedString("i18n.userManagement.featurePermissions"), accessibilityConfig);
            this.view.lblAccFeaturePermissions.text = kony.i18n.getLocalizedString("i18n.userManagement.featurePermissions");

            // Other Feature Permissions
            //CommonUtilities.setText(this.view.segOtherFeaturePermissions, kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission"), accessibilityConfig);
            this.view.segOtherFeaturePermissions.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission");

            // Transaction Limits
            //CommonUtilities.setText(this.view.lbltransactionLimits, kony.i18n.getLocalizedString("i18n.konybb.TransactionLimits"), accessibilityConfig);
            this.view.lbltransactionLimits.text = kony.i18n.getLocalizedString("i18n.konybb.TransactionLimits");
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
                if (viewModel.createInfinityUserSuccess) {
                    applicationManager.getNavigationManager().navigateTo("frmUserCreationSuccess");
                } else if (viewModel.createInfinityUserFailure) {
                    this.view.flxMainWrapper.isVisible = true;
                    this.view.flxDowntimeWarning.isVisible = true;
                    //CommonUtilities.setText(this.view.lblDowntimeWarning, viewModel.createInfinityUserFailure.serverErrorRes.dbpErrMsg, accessibilityConfig);
                    this.view.lblDowntimeWarning.text = viewModel.createInfinityUserFailure.serverErrorRes.dbpErrMsg;
                }
                if (viewModel.updateInfinityUserSuccess) {
                    //this.loadBusinessBankingModule().presentationController.navigateToUMDashboard();
                    this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
                } else if (viewModel.updateInfinityUserFailure) {
                    //this.view.flxMainWrapper.isVisible = true;
                    //this.view.flxDowntimeWarning.isVisible = true;
                    //this.view.lblDowntimeWarning.text = viewModel.updateInfinityUserFailure.errorMessage;
                  	this.view.flxContentAckContainer.setVisibility(true);
                    this.view.lblAckContent.text = kony.i18n.getLocalizedString("konyolb.usermanagement.editFailAck");
                    this.view.imgAck.src = "failed_icon.png";
                  	this.view.btnAckBack.setVisibility(true);
                }
                if (viewModel.createCustomRoleSuccess) {
                    applicationManager.getNavigationManager().navigateTo("frmCustomRoleAcknowledgement");
                } else if (viewModel.createCustomRoleFailure) {
                    this.view.flxMainWrapper.isVisible = true;
                    this.view.flxDowntimeWarning.isVisible = true;
                    this.view.lblDowntimeWarning.text = viewModel.createCustomRoleFailure.errorMessage;
                }
                if (viewModel.contractDetails) {
                    this.contractDetails = viewModel.contractDetails;
                    var navManager = applicationManager.getNavigationManager();
                    var userId = navManager.getCustomInfo('userId');
                    var contractId = this.contractDetails.contracts[0].contractId;
                    var coreCustomerId = this.contractDetails.contracts[0].contractCustomers[0].id;
                    this.getInfinityUser(userId, contractId, coreCustomerId);
                }
                if(viewModel.infinityUserData){
                    var updateSuccessData = applicationManager.getNavigationManager().getCustomInfo("updateSuccessData");
                    if(updateSuccessData  && (updateSuccessData.errorMessage === null || updateSuccessData.errorMessage === undefined)) {
                      this.view.flxContentAckContainer.setVisibility(true);
                    	this.view.lblAckContent.text = kony.i18n.getLocalizedString("konyolb.usermanagement.editSuccessAck");
                    	this.view.imgAck.src = "success_green_2.png";
                    } else if (updateSuccessData && updateSuccessData.errorMessage) {
                    	this.view.flxContentAckContainer.setVisibility(true);
                    	this.view.lblAckContent.text = kony.i18n.getLocalizedString("konyolb.usermanagement.editFailAck");
                    	this.view.imgAck.src = "failed_icon.png";
                  		this.view.btnAckBack.setVisibility(true);
                    }
                    this.showAllUserDetails(viewModel.infinityUserData);
              }
              if(viewModel.setDataForAccountDropDown){
                FormControllerUtility.hideProgressBar(this.view);
                this.setAccountLevelPermissionsData(viewModel.setDataForAccountDropDown);
              }
              if(viewModel.setDataForOtherDropDown){
                FormControllerUtility.hideProgressBar(this.view);
                this.setOtherLevelPermissionsData(viewModel.setDataForOtherDropDown);
              }
              if(viewModel.setDataForLimits){
                FormControllerUtility.hideProgressBar(this.view);
                this.setTransactionLimitsData(viewModel.setDataForLimits);
              }
              if(viewModel.autoSyncAccounts){
                FormControllerUtility.hideProgressBar(this.view);
                this.navigateToAutoSyncAccounts();
              }
              if(viewModel.createUserSuccess){
                FormControllerUtility.hideProgressBar(this.view);
                applicationManager.getNavigationManager().navigateTo("frmUserCreationSuccess");
              }
              if(viewModel.ackDetails){
                FormControllerUtility.hideProgressBar(this.view);
              }
            }
        },
      
      getInfinityUser : function(userId,contractId,coreCustomerId,flag){
        kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
        this.loadBusinessBankingModule().presentationController.getInfinityUserData(userId,contractId,coreCustomerId,flag);
      },
      /**
         * Method to call all the methods which will populate Data in the segments
         * @param {JSON} data 
         **/
        showPermissionDetails: function(permissionDetails) {
		            var navManager = applicationManager.getNavigationManager();
	            var flowValue = navManager.getCustomInfo('editUserFlow');

            if (this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
                if(flowValue==="editFlow"){
                  if(this.userDetailsData !== undefined)
                    this.showUserDetails(this.userDetailsData);
                }
               else
                {
                  this.showUserDetails(permissionDetails.userDetails);
                }
            } else if (this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
                this.showUserDetails(permissionDetails.customRoleDetails);
            }
            if(flowValue === "editFlow"){
          this.showAccountAccessEditFlow(permissionDetails);
          this.showAccountLevelPermissionsEditFlow(permissionDetails);
          this.showOtherFeaturePermissionsEditFlow(permissionDetails);
          this.showTransactionLimitsEditFlow(permissionDetails);
        }
        else{
          permissionDetails.companyList.forEach(function(data) {
            if(data.cif === undefined && data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined && data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }

          });
          permissionDetails.accountLevelPermissions.forEach(function(data) {
            if(data.cif === undefined && data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined && data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
          permissionDetails.globalLevelPermissions.forEach(function(data) {
            if(data.cif === undefined && data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined && data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
          permissionDetails.transactionLimits.forEach(function(data) {
            if(data.cif === undefined && data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined && data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
          this.showAccountAccess(permissionDetails.companyList);
          this.showAccountLevelPermissions(permissionDetails.accountLevelPermissions);
          this.showOtherFeaturePermissions(permissionDetails.globalLevelPermissions);
          this.showTransactionLimits(permissionDetails.transactionLimits);
        }
        },
        /**
         * Method to populate user Details
         * @param {JSON} data 
         **/
        showUserDetails: function(details) {
            var scope = this;
            this.userManagementData = this.loadBusinessBankingModule().presentationController.getUserManagementData();
            var navManager =  applicationManager.getNavigationManager();
            var customRoleDetails={};
            if (!this.userManagementData.hasOwnProperty('customRoleDetails')) {
        	customRoleDetails = navManager.getCustomInfo('customRoleDetails');
            this.userManagementData.customRoleDetails = customRoleDetails;
            }
            if (this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
                if (this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    if (this.userCreationFlow === OLBConstants.USER_MANAGEMENT_TYPE.MANUAL) {
                        this.view.btnViewMoreDetails.isVisible = true;
                        this.view.btnViewMoreDetails.onClick = this.navigateToCreateUser;
                        this.view.flxFullName.isVisible = true;
                        this.view.flxDOB.isVisible = true;
                        this.view.flxEmailAddress.isVisible = true;
                        this.view.flxRegisteredPhnNo.isVisible = true;
                        this.view.flxDriversLicence.isVisible = true;
                        this.view.flxAccountNickName.isVisible = true;
                        //CommonUtilities.setText(this.view.lblBankName, kony.i18n.getLocalizedString("i18n.ProfileManagement.FullName"), CommonUtilities.getaccessibilityConfig());
                        this.view.lblBankName.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.FullName");

                        let fullName = (details.firstName || '') + " " + (details.lastName || '');
                        // CommonUtilities.setText(this.view.lblBillerValue, fullName, CommonUtilities.getaccessibilityConfig());
                        // CommonUtilities.setText(this.view.lblAccountTypeValue, CommonUtilities.getFrontendDateString(details.dob, applicationManager.getFormatUtilManager().getDateFormat()), CommonUtilities.getaccessibilityConfig());
                        // CommonUtilities.setText(this.view.lblAccountNumberValue, details.email, CommonUtilities.getaccessibilityConfig());
                        this.view.lblBillerValue.text = fullName;
                        this.view.lblAccountTypeValue.text = CommonUtilities.getFrontendDateString(details.dob, applicationManager.getFormatUtilManager().getDateFormat());
                        this.view.lblAccountNumberValue.text = details.email;
                        let phoneNumber = (details.phoneCountryCode || '') + (details.phoneNumber || '');
                        // CommonUtilities.setText(this.view.lblBeneficiaryNameValue, phoneNumber, CommonUtilities.getaccessibilityConfig());
                        // CommonUtilities.setText(this.view.lblDriverLicenceNumber, c, CommonUtilities.getaccessibilityConfig());
                        // CommonUtilities.setText(this.view.lblAccountNickNameValue, details.ssn, CommonUtilities.getaccessibilityConfig());
                        this.view.lblBeneficiaryNameValue.text = phoneNumber;
                        this.view.lblDriverLicenceNumber.text = details.drivingLicenseNumber;
                        this.view.lblAccountNickNameValue.text = details.ssn;
                    } else {
                        let navMan = applicationManager.getNavigationManager();
                        var createFlowType = navMan.getCustomInfo("createManualFlow");
                        if(createFlowType === "createManualFlow"){
                          this.view.btnViewMoreDetails.isVisible = true;
                          this.view.btnViewMoreDetails.onClick = this.navigateToCreateUser;
                          this.view.flxFullName.isVisible = true;
                          this.view.flxDOB.isVisible = true;
                          this.view.flxEmailAddress.isVisible = true;
                          this.view.flxRegisteredPhnNo.isVisible = true;
                          this.view.flxDriversLicence.isVisible = true;
                          this.view.flxAccountNickName.isVisible = true;
                          //CommonUtilities.setText(this.view.lblAccountNickNameValue, details.ssn, CommonUtilities.getaccessibilityConfig());
                          this.view.lblAccountNickNameValue.text = details.ssn;
                    	}
                      else{
                        this.view.btnViewMoreDetails.isVisible = false;
                          this.view.flxFullName.isVisible = false;
                          this.view.flxDOB.isVisible = false;
                          this.view.flxEmailAddress.isVisible = false;
                          this.view.flxRegisteredPhnNo.isVisible = false;
                          this.view.flxDriversLicence.isVisible = false;
                          this.view.flxAccountNickName.isVisible = true;
                          //CommonUtilities.setText(this.view.lblAccountNickNameValue, details.ssn, CommonUtilities.getaccessibilityConfig());
                          this.view.lblAccountNickNameValue.text = details.ssn;
                      }  
                    }
                } else if (this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    if (this.userManagementData.userDetails.coreCustomerId) {
                        this.view.btnViewMoreDetails.isVisible = false;
                    } else {
                        this.view.btnViewMoreDetails.isVisible = true;
                        this.view.btnViewMoreDetails.onClick = this.navigateToCreateUser;
                    }
                    this.view.flxFullName.isVisible = true;
                    this.view.flxDOB.isVisible = true;
                    this.view.flxEmailAddress.isVisible = true;
                    this.view.flxRegisteredPhnNo.isVisible = true;
                    this.view.flxDriversLicence.isVisible = true;
                    this.view.flxAccountNickName.isVisible = true;
                    // CommonUtilities.setText(this.view.lblBankName, kony.i18n.getLocalizedString("i18n.ProfileManagement.FullName"), CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblAccountType, kony.i18n.getLocalizedString("i18n.NAO.DOB"), CommonUtilities.getaccessibilityConfig());
                    this.view.lblBankName.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.FullName");
                    this.view.lblAccountType.text = kony.i18n.getLocalizedString("i18n.NAO.DOB");
                    let fullName = (details.firstName || '') + " " + (details.lastName || '');
                    // CommonUtilities.setText(this.view.lblBillerValue, fullName, CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblAccountTypeValue, CommonUtilities.getFrontendDateString((details.dob ? details.dob : details.dateOfBirth), applicationManager.getFormatUtilManager().getDateFormat()), CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblAccountNumberValue, details.email, CommonUtilities.getaccessibilityConfig());
                    this.view.lblBillerValue.text =  fullName;
                    this.view.lblAccountTypeValue.text =  CommonUtilities.getFrontendDateString((details.dob ? details.dob : details.dateOfBirth), applicationManager.getFormatUtilManager().getDateFormat());
                    this.view.lblAccountNumberValue.text = details.email;
                    let phoneNumber = details.phoneNumber || '';
                    // CommonUtilities.setText(this.view.lblBeneficiaryNameValue, phoneNumber, CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblDriverLicenceNumber, details.drivingLicenseNumber, CommonUtilities.getaccessibilityConfig());
                    // CommonUtilities.setText(this.view.lblAccountNickNameValue, details.ssn, CommonUtilities.getaccessibilityConfig());
                    this.view.lblBeneficiaryNameValue.text = phoneNumber;
                    this.view.lblDriverLicenceNumber.text = details.drivingLicenseNumber;
                    this.view.lblAccountNickNameValue.text = details.ssn;
                }
            } else if (this.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
                this.view.flxFullName.isVisible = true;
                this.view.flxDOB.isVisible = false;
                this.view.flxEmailAddress.isVisible = false;
                this.view.flxRegisteredPhnNo.isVisible = false;
                this.view.flxDriversLicence.isVisible = false;
                this.view.flxAccountNickName.isVisible = false;
                var customRoleName = "";
                if (!kony.sdk.isNullOrUndefined(scope.userManagementData.customRoleDetails[0])) {
                    customRoleName = scope.userManagementData.customRoleDetails[0].customRoleName;
                } else {
                    customRoleName = scope.userManagementData.customRoleDetails.customRoleName;
                }
                this.customRoleName = customRoleName;
                // CommonUtilities.setText(this.view.lblBankName, kony.i18n.getLocalizedString("i18n.konybb.Common.Name"), CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(this.view.lblAccountType, kony.i18n.getLocalizedString("i18n.Enroll.ContractName"), CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(this.view.lblBillerValue, customRoleName, CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(this.view.lblAccountTypeValue, scope.userManagementData.companyList[0].contractName, CommonUtilities.getaccessibilityConfig());
                this.view.lblBankName.text =  kony.i18n.getLocalizedString("i18n.konybb.Common.Name");
                this.view.lblAccountType.text = kony.i18n.getLocalizedString("i18n.Enroll.ContractName");
                this.view.lblBillerValue.text = customRoleName;
                this.view.lblAccountTypeValue.text = scope.userManagementData.companyList[0].contractName;
                if (this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                    scope.view.btnViewMoreDetails.isVisible = true;
                    scope.view.btnViewMoreDetails.onClick = function() {
                        scope.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
                        scope.navigateToCreateRole();
                    };
                } else if (this.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
                    this.view.btnViewMoreDetails.isVisible = false;
                }
            }
        },
        /**
         * Method to populate account access details
         * @param {JSON} data 
         **/
        showAccountAccess: function(companyList) {
            var newCompanyList = [];
          var scope = this;
            for (let i = 0; i < companyList.length; i++) {
                if (companyList[i].userRole != "") {
                    let companyAccountAccess = companyList[i];
                    let selectedAccCount = 0;
                    for (let j = 0; j < companyAccountAccess.accounts.length; j++) {
                        if (companyAccountAccess.accounts[j].isEnabled === "true") {
                            selectedAccCount++;
                        }
                    }
                    companyList[i].selectedAccCount = selectedAccCount;
                    newCompanyList.push(companyList[i]);
                    var companyId = companyList[i].cif;
                    if (companyId.length > 4) {
                        companyId = companyId.substring(companyId.length - 4, companyId.length);
                    }
                    companyList[i].lastFourDigitOfCompanyId = companyId;
                }
            }
            let segRowData = newCompanyList.map(function(newCompanyList,index) {
              var compName = CommonUtilities.truncateStringWithGivenLength(newCompanyList.companyName + "...", 10);
              var userRole = CommonUtilities.truncateStringWithGivenLength(newCompanyList.userRole + "...", 10);
               var width="36%";
              if(kony.application.getCurrentBreakpoint() !== 640){
              if( kony.application.getCurrentBreakpoint() <= 1024) width="32%";
                return {
                    "lblLeftSideContent":{
                      "text": newCompanyList.companyName + " - " + newCompanyList.lastFourDigitOfCompanyId,
                       "width":width                 
                    },
                   
                    "flxSeparator":{
                    "isVisible" : true
                  },
                   "lblSeparator":{
                    "isVisible" : true
                  },
                    "lblRIghtSideContent": newCompanyList.userRole,
                    "lblRightMostContent": newCompanyList.selectedAccCount + "",
                    "lblRightContentAuto":(newCompanyList.autoSyncAccounts==="true")?"On":"Off",
                    "btnViewEdit" : {
                         "onClick" : scope.navigateToAccountAccessandRole.bind(this,scope.view.segmentAccRole,index),
                         "accessibilityConfig": {
                            "a11yLabel": scope.view.btnViewEdit.text+" for customer "+ newCompanyList.companyName + " - " + newCompanyList.lastFourDigitOfCompanyId
                        }
                    }
                };
            }
              else{
                return {
                 "lblLeftSideContent": {
                            "text": compName + " - " + newCompanyList.lastFourDigitOfCompanyId,
                            "toolTip": newCompanyList.companyName + " - " + newCompanyList.lastFourDigitOfCompanyId,
                           
                
                        },
                  "lblRIghtSideContent": {
                    "text" : userRole,
                    "toolTip" : newCompanyList.userRole
                  },
              
                  "flxSeparator":{
                    "isVisible" : true
                  },
                   "lblSeparator":{
                    "isVisible" : true
                  },
                    "lblRightMostContent": newCompanyList.selectedAccCount + "",
                    "lblRightContentAuto":(newCompanyList.autoSyncAccounts==="true")?"On":"Off",
                    "btnViewEdit" : {
                         "onClick" : scope.navigateToAccountAccessandRole.bind(this,scope.view.segmentAccRole,index),
                        "accessibilityConfig": {
                            "a11yLabel": scope.view.btnViewEdit.text+" for customer "+ newCompanyList.companyName + " - " + newCompanyList.lastFourDigitOfCompanyId
                        }

                    }
                };
              }
            });
           this.segData=segRowData;
           var datamap={
            "flxUserManagement": "flxUserManagement",
            "flxUserManagementAccAccessRole": "flxUserManagementAccAccessRole",
            "flxUserManagementAccPermissions": "flxUserManagementAccPermissions",
            "lblLeftSideContent": "lblLeftSideContent",
            "lblRIghtSideContent": "lblRIghtSideContent",
            "lblRightMostContent": "lblRightMostContent",
            "lblSeparator": "lblSeparator",
             "flxSeparator": "flxSeparator",
            "lblRightContentAuto": "lblRightContentAuto",
             "btnViewEdit" : "btnViewEdit"
          };
          this.view.segmentAccRole.rowTemplate="flxUserManagementAccAccessRole";
          this.view.segmentAccRole.widgetDataMap=datamap;
            this.view.segmentAccRole.setData(segRowData);
        },
        /**
         * Method to populate Account Level Permissions
         * @param {JSON} data 
         **/
        showAccountAccessEditFlow: function (contactDetails) {
            var scope = this;
            this.view.btnViewNEdit.isVisible =  false;
            var navManager =  applicationManager.getNavigationManager();
            var userId = navManager.getCustomInfo('userId');
            var companyList = contactDetails.contracts;
            var accounts = this.userAccounts.contracts;
            // var newCompanyList = [];
            for (let i = 0; i < accounts.length; i++) {
              //if (companyList[i].contractCustomers[0].userRole != "") {
              let companyAccountAccess = accounts[i].contractCustomers[0];//companyList[i];
              let autoSyncAccounts = accounts[i].contractCustomers[0].autoSyncAccounts;
              let selectedAccCount = 0;
              for (let j = 0; j < companyAccountAccess.coreCustomerAccounts.length; j++) {
                if (companyAccountAccess.coreCustomerAccounts[j].isEnabled === "true") {
                  selectedAccCount++;
                }
                if (autoSyncAccounts === "true") {
                  companyList[i].autoSyncAccounts = autoSyncAccounts;
                }
              }
              companyList[i].selectedAccCount = selectedAccCount;
    
              //                     newCompanyList.push(companyList[i]);
              var companyId = companyList[i].contractCustomers[0].id;
              if (companyId.length > 4) {
                companyId = companyId.substring(companyId.length - 4, companyId.length);
              }
              companyList[i].lastFourDigitOfCompanyId = companyId;
              // }
            }
            let segRowData = companyList.map(function (newCompanyList,index) {
              var companyIdVal = newCompanyList.contractCustomers[0].id;
              var contractId = newCompanyList.contractId;
              var compName = CommonUtilities.truncateStringWithGivenLength(newCompanyList.contractCustomers[0].name + "...", 10);
              var userRole = CommonUtilities.truncateStringWithGivenLength(newCompanyList.contractCustomers[0].userRoleName + "...", 10);
              var width = "36%";
              if (kony.application.getCurrentBreakpoint() !== 640) {
                if (kony.application.getCurrentBreakpoint() <= 1024) width = "32%";
                return {
                  "lblLeftSideContent": {
                    "text": newCompanyList.contractCustomers[0].name + " - " + newCompanyList.lastFourDigitOfCompanyId,
                    "width": width
                  },
               
                  "lblRIghtSideContent": newCompanyList.contractCustomers[0].userRoleName,
                  "lblRightMostContent": newCompanyList.selectedAccCount + "",
                  "lblRightContentAuto": (newCompanyList.autoSyncAccounts === "true") ? "On" : "Off",
                  "lblContractId" : {
                    "text" : contractId,
                    "isVisible" : false
                  },
                  "lblCoreCustId" : {
                    "text" : companyIdVal,
                    "isVisible" : false
                  },
                  "btnViewEdit" : {
                    "onClick" : scope.navigateToAccountAccessandRole.bind(this,scope.view.segmentAccRole,index),
                    "isVisible" : true,
                    "accessibilityConfig": {
                            "a11yLabel": scope.view.btnViewEdit.text+" for customer "+ newCompanyList.contractCustomers[0].name + " - " + newCompanyList.lastFourDigitOfCompanyId
                        }
                  }
                };
              }
              else {
                return {
                  "lblLeftSideContent": {
                    "text": compName + " - " + newCompanyList.lastFourDigitOfCompanyId,
                    "toolTip": newCompanyList.contractCustomers[0].name + " - " + newCompanyList.lastFourDigitOfCompanyId,
                  },
                  "lblRIghtSideContent": {
                    "text": userRole,
                    "toolTip": newCompanyList.contractCustomers[0].userRoleName
                  },
                  "lblRightMostContent": "--",//newCompanyList.selectedAccCount + "",
                  "lblRightContentAuto": "--"//(newCompanyList.autoSyncAccounts === "true") ? "On" : "Off"
    
                };
              }
            });
            this.segData = segRowData;
            var datamap = {
              "flxUserManagement": "flxUserManagement",
              "flxUserManagementAccAccessRole": "flxUserManagementAccAccessRole",
              "flxUserManagementAccPermissions": "flxUserManagementAccPermissions",
              "lblLeftSideContent": "lblLeftSideContent",
              "lblRIghtSideContent": "lblRIghtSideContent",
              "lblRightMostContent": "lblRightMostContent",
              "lblSeparator": "lblSeparator",
              "lblRightContentAuto": "lblRightContentAuto",
              "btnViewEdit" : "btnViewEdit"
            };
            this.view.segmentAccRole.rowTemplate = "flxUserManagementAccAccessRole";
            this.view.segmentAccRole.widgetDataMap = datamap;
            this.view.segmentAccRole.setData(segRowData);
            kony.application.dismissLoadingScreen();
          },
            /**
             * Method to populate Account Level Permissions
             * @param {JSON} data 
             **/
        showAccountLevelPermissions: function(accountLevelPermissions) {
            let self = this;
            let segRowData = accountLevelPermissions.map(function(accountLevelPermissionsPerCompany, index) {
                let result = self.getAccountLevelDetailsToShow(accountLevelPermissionsPerCompany);
                let lastFourDigitOfCompanyId = accountLevelPermissionsPerCompany.cif ? accountLevelPermissionsPerCompany.cif : accountLevelPermissionsPerCompany.companyId;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
          let contractId = accountLevelPermissionsPerCompany.contractId;
          let coreCustomerId = accountLevelPermissionsPerCompany.coreCustomerId;
              var name =accountLevelPermissionsPerCompany.companyName?accountLevelPermissionsPerCompany.companyName:accountLevelPermissionsPerCompany.coreCustomerName; 
                return {
                    "lblRecipient": {
                        "text": name + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            "a11yLabel": accountLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                        }
                    },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segAccPermissionsSeg, index,contractId,coreCustomerId,"accountPermissionLevel"),
                         "accessibilityConfig": {
                            "a11yLabel": "Show more details about feature permissions for account "+name + " - " + lastFourDigitOfCompanyId,
                            "a11yARIA":{
                                "aria-expanded": false,
                                "role": "button",
                                "tabindex": 0
                             }
                        }
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                    "lblDefaultPermissionsSet": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
                        }
                    },
                    "lblTotalFeaturesSelected": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
                        }
                    },
                    "lblTxtDefaultPermissionsSet": {
                        "text": result.DefaultPermissionSet,
                        "accessibilityConfig": {
                            "a11yLabel": result.DefaultPermissionSet
                        }
                    },
                   "lblSeparator" : {
                     "isVisible" : true
                   },
                    "lblTxtTotalFeaturesSelected": {
                        "text": result.TotalFeaturesSelected,
                        "accessibilityConfig": {
                            "a11yLabel": result.TotalFeaturesSelected
                        }
                    },
                };
            });
            this.view.segAccPermissionsSeg.setData(segRowData);
            this.view.forceLayout();
        },
      showAccountLevelPermissionsEditFlow: function (accountLevelPermissionsData) {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        let self = this;
        this.view.btnEdit.isVisible = false;
        var accountLevelPermissions = accountLevelPermissionsData.contracts;
        let segRowData = accountLevelPermissions.map(function (accountLevelPermissionsPerCompany, index) {
          // let result = self.getAccountLevelDetailsToShow(accountLevelPermissionsPerCompany);
          let lastFourDigitOfCompanyId = accountLevelPermissionsPerCompany.contractCustomers[0].id;
          if (lastFourDigitOfCompanyId.length > 4) {
            lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
          }
          let contractId = accountLevelPermissionsPerCompany.contractId;
          let coreCustomerId = accountLevelPermissionsPerCompany.contractCustomers[0].id;
          return {
            "lblRecipient": {
              "text": accountLevelPermissionsPerCompany.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
              "accessibilityConfig": {
                "a11yLabel": accountLevelPermissionsPerCompany.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
              }
            },
            "lblDropdown": "O",
            "flxDropdown": {
              "onClick": self.showAccountLevelAccessDetailsEditFlow.bind(this, self.view.segAccPermissionsSeg, index,coreCustomerId,contractId,"accountPermissionLevel"),
              "accessibilityConfig": {
                "a11yLabel": "Show more details about feature permissions for account "+accountLevelPermissionsPerCompany.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
                 "a11yARIA":{
                    "aria-expanded": false,
                    "role": "button",
                    "tabindex": 0
                }
              }
              
            },
            "flxDetails": {
              "isVisible": false
            },
            "lblDefaultPermissionsSet": {
              "text": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
              "accessibilityConfig": {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DefaultPermissionSet"),
              }
            },
            "lblTotalFeaturesSelected": {
              "text": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
              "accessibilityConfig": {
                "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
              }
            },
            "lblTxtDefaultPermissionsSet": {
              "text": "",//result.DefaultPermissionSet,
              "accessibilityConfig": {
                "a11yLabel": "",//result.DefaultPermissionSet
              }
            },
            "lblTxtTotalFeaturesSelected": {
              "text": "",//result.TotalFeaturesSelected,
              "accessibilityConfig": {
                "a11yLabel": "",//result.TotalFeaturesSelected
              }
            },
              "btnViewEditAccountLevel" : {
                "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
                "isVisible" : false,
                 "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ accountLevelPermissionsPerCompany.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId
                }
              }
            //},
          };
        });
        var datamap = {
          "flxDropdown" : "flxDropdown",
          "btnViewEditAccountLevel" : "btnViewEditAccountLevel"
        };
        //this.view.segAccPermissionsSeg.widgetDataMap = datamap;
        this.view.segAccPermissionsSeg.setData(segRowData);
        this.view.forceLayout();
        kony.application.dismissLoadingScreen();
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
        /**
         * Method to populate other feature Permissions
         * @param {JSON} data 
         **/
        showOtherFeaturePermissions: function(globalLevelPermissions) {
            let self = this;
            let segRowData = globalLevelPermissions.map(function(globalLevelPermissions, index) {
                let lastFourDigitOfCompanyId = globalLevelPermissions.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                let selected = 0,
                    total = 0;
                globalLevelPermissions.features.map(feature => {
                    feature.permissions.map(permission => {
                        total++;
                        if (permission.isEnabled.toString() === 'true') selected++;
                    });
                });
                let lblTxtTotalFeaturesSelected;
                if (total == selected) {
                    lblTxtTotalFeaturesSelected = selected + " of " + total + ' (Default)';
                } else {
                    lblTxtTotalFeaturesSelected = selected + " of " + total + ' (custom)';
                }

          let contractId = globalLevelPermissions.contractId;
          let coreCustomerId = globalLevelPermissions.coreCustomerId;
              var name = globalLevelPermissions.companyName?globalLevelPermissions.companyName:globalLevelPermissions.coreCustomerName;
                return {
                  "lblRecipient": {
                    "text" : name+ " - " + lastFourDigitOfCompanyId
                  },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segOtherFeaturePermissionsSegMain, index,contractId,coreCustomerId,"otherPermissionLevel"),
                        "accessibilityConfig": {
                            "a11yLabel": "Show more details about other permissions for account "+name + " - " + lastFourDigitOfCompanyId,
                            "a11yARIA":{
                                "aria-expanded": false,
                                "role": "button",
                                "tabindex": 0
                            }
                        }
                        
                    },
                    "flxDetails": {
                        "isVisible": false,
                        "height": '60dp'
                    },
                    "flxDetails2": {
                        "height": '25dp'
                    },
                    "flxDetails1": {
                        "isVisible": false
                    },
                    "flxDetails3": {
                        "isVisible": false
                    },
                    "lblSeparator": {
                      "isVisible" : true
                    },
                    "lblTotalFeaturesSelected": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
                    "lblTxtTotalFeaturesSelected": lblTxtTotalFeaturesSelected
                };
            });
            this.view.segOtherFeaturePermissionsSegMain.setData(segRowData);
            this.view.forceLayout();
        },
        /**
         * Method for dropdown functionality
         * @param segmentName 
         **/
      showOtherFeaturePermissionsEditFlow: function (globalLevelPermissionsData) {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        let self = this;
        this.view.btnPermissionsEdit.isVisible = false;
        var globalLevelPermissions = globalLevelPermissionsData.contracts;
        let segRowData = globalLevelPermissions.map(function (globalLevelPermissions, index) {
          let lastFourDigitOfCompanyId = globalLevelPermissions.contractCustomers[0].id;
          if (lastFourDigitOfCompanyId.length > 4) {
            lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
          }
          //                 let selected = 0,
          //                     total = 0;
          //                 globalLevelPermissions.features.map(feature => {
          //                     feature.permissions.map(permission => {
          //                         total++;
          //                         if (permission.isEnabled.toString() === 'true') selected++;
          //                     });
          //                 });
          //                 let lblTxtTotalFeaturesSelected;
          //                 if (total == selected) {
          //                     lblTxtTotalFeaturesSelected = selected + " of " + total + ' (Default)';
          //                 } else {
          //                     lblTxtTotalFeaturesSelected = selected + " of " + total + ' (custom)';
          //                 }

          let contractId = globalLevelPermissions.contractId;
          let coreCustomerId = globalLevelPermissions.contractCustomers[0].id;
          return {
            "lblRecipient": {
              "text": globalLevelPermissions.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId
            },
            "lblDropdown": "O",
            "flxDropdown": {
              "onClick": self.showAccountLevelAccessDetailsEditFlow.bind(this, self.view.segOtherFeaturePermissionsSegMain, index,coreCustomerId,contractId,"otherPermissionLevel"),
              "accessibilityConfig": {
                "a11yLabel": "Show more details about other permissions for account "+globalLevelPermissions.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
                 "a11yARIA":{
                    "aria-expanded": false,
                    "role": "button",
                    "tabindex": 0
                }
              }
            },
            "flxDetails": {
              "isVisible": false,
              "height": '60dp'
            },
            "flxDetails2": {
              "height": '25dp'
            },
            "flxDetails1": {
              "isVisible": false
            },
            "flxDetails3": {
              "isVisible": false
            },
            "lblTotalFeaturesSelected": kony.i18n.getLocalizedString("i18n.usermanagement.TotalFeaturesSelected"),
            "lblTxtTotalFeaturesSelected": "",//lblTxtTotalFeaturesSelected,
            "btnViewEditAccountLevel" : {
                "onClick" : self.navToNonAccountFeaturePermission.bind(this),
                "isVisible" : false,
               "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +globalLevelPermissions.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId
                }
              }
          };
        });
        var datamap = {
          "flxDropdown": "flxDropdown",
          "btnViewEditAccountLevel" : "btnViewEditAccountLevel"
        };
        //this.view.segOtherFeaturePermissionsSegMain.widgetDataMap = datamap;
        this.view.segOtherFeaturePermissionsSegMain.setData(segRowData);
        this.view.forceLayout();
        kony.application.dismissLoadingScreen();
      },
        /**
         * Method for dropdown functionality
         * @param segmentName 
         **/
        showAccountLevelAccessDetails: function(selectedSegment, i,contractId,coreCustomerId,flag) {
            let segData = selectedSegment.data;
            let rowData = segData[i];
            let self = this;
        
        if(flag === "accountPermissionLevel"){
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
                "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
                "accessibilityConfig": {
                    "a11yLabel": "Hide details about account feature permissions for account "+rowData.lblRecipient.text,
                     "a11yARIA":{
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": true
                    }
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
                "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
               "accessibilityConfig": {
                    "a11yLabel": "Show more details about feature permissions for account "+rowData.lblRecipient.text,
                     "a11yARIA":{
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
               }
          };
        }
        selectedSegment.setDataAt(rowData, i);
        this.view.segAccPermissionsSeg.setActive(i, -1, "flxUserManagementBBCopyBoldText.flxtransferActivityWrapper.flxUserManagementAccPermissions.flxSegBulkWireAckWrapper.flxDropdown");
        }
        
        if(flag === "otherPermissionLevel"){
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
                "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
                "accessibilityConfig": {
                    "a11yLabel": "Hide details about other feature permissions for account "+rowData.lblRecipient.text,
                     "a11yARIA":{
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": true
                    }
                }
          };
          }else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
            "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
            "accessibilityConfig": {
                "a11yLabel": "Show more details about other feature permissions for account "+rowData.lblRecipient.text,
                 "a11yARIA":{
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": false
                }
            }
          };
        }
        selectedSegment.setDataAt(rowData, i);
        this.view.segOtherFeaturePermissionsSegMain.setActive(i, -1, "flxUserManagementBBCopyBoldText.flxtransferActivityWrapper.flxUserManagementAccPermissions.flxSegBulkWireAckWrapper.flxDropdown");
        }
        
        if(flag === "limits"){
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
                "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
                "accessibilityConfig": {
                    "a11yLabel": "Hide transaction limits for account "+rowData.lblRecipient.text,
                     "a11yARIA":{
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": true
                    }
                }
          };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
            rowData.flxDropdown = {
                "onClick": self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, contractId, coreCustomerId, flag),
                "accessibilityConfig": {
                    "a11yLabel": "Show transaction limits for account "+rowData.lblRecipient.text,
                     "a11yARIA":{
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                }
          };
        }
        selectedSegment.setDataAt(rowData, i);
        this.view.segTransactionLimitsMain.setActive(i, -1, "flxUserManagementPermissionsBBCopyLimits.flxtransferActivityWrapper.flxUserManagementAccPermissions.flxSegBulkWireAckWrapper.flxDropdown");
        }
           // selectedSegment.setDataAt(rowData, i);
        
        },
      
      showAccountLevelAccessDetailsEditFlow: function (selectedSegment, i,coreCustomerId,contractId,flag) {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var navManager =  applicationManager.getNavigationManager();
        var userId = navManager.getCustomInfo('userId');
        navManager.setCustomInfo('getInfinityUser',"true");
        this.getInfinityUser(userId,contractId,coreCustomerId,flag);
        this.selectedSegment = selectedSegment;
        this.index = i;
      },

      setAccountLevelPermissionsData : function(data){
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var self = this;
        let segData = this.selectedSegment.data;
        let rowData = segData[this.index];
        if(data.accountLevelPermissions.length > 0)
        {
          let result = this.getAccountLevelDetailsToShow(data.accountLevelPermissions[0]);
          let accountLevelData = data.accountLevelPermissions;
          var navManager =  applicationManager.getNavigationManager();
          navManager.setCustomInfo('accountLevelPermissions',accountLevelData);
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblTxtDefaultPermissionsSet = {
              "text": result.DefaultPermissionSet,
              "accessibilityConfig": {
                "a11yLabel": result.DefaultPermissionSet
              }
            };
            rowData.lblTxtTotalFeaturesSelected = {
              "text": result.TotalFeaturesSelected,
              "accessibilityConfig": {
                "a11yLabel": result.TotalFeaturesSelected
              }
            };
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
        else{
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblTxtDefaultPermissionsSet = {
              "text": "No Features Found",//result.DefaultPermissionSet,
              "accessibilityConfig": {
                "a11yLabel": "No Features Found"
              }
            };
            rowData.lblTxtTotalFeaturesSelected = {
              "text": "No Features Found",
              "accessibilityConfig": {
                "a11yLabel": "No Features Found"
              }
            };
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navigateToAccountLevelFeaturePermissions.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
      },

      setOtherLevelPermissionsData :  function(data){
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var self = this;
        let segData = this.selectedSegment.data;
        let rowData = segData[this.index];
        let selected = 0,
            total = 0;
        var otherLevelData = data.globalLevelPermissions;
        var navManager =  applicationManager.getNavigationManager();
        navManager.setCustomInfo('otherLevelPermissions',otherLevelData);
        if(data.globalLevelPermissions.length > 0){
          data.globalLevelPermissions[0].features.map(feature => {
            feature.permissions.map(permission => {
              total++;
              if (permission.isEnabled.toString() === 'true') selected++;
            });
          });
          let lblTxtTotalFeaturesSelected;
          if (total == selected) {
            lblTxtTotalFeaturesSelected = selected + " of " + total + ' (Default)';
          } else {
            lblTxtTotalFeaturesSelected = selected + " of " + total + ' (custom)';
          }
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblTxtTotalFeaturesSelected = {
              "text": lblTxtTotalFeaturesSelected,
              "accessibilityConfig": {
                "a11yLabel": lblTxtTotalFeaturesSelected
              }
            };
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
        else{
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblTxtTotalFeaturesSelected = {
              "text": "No Features Found",
              "accessibilityConfig": {
                "a11yLabel": "No Features Found"
              }
            };
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditAccountLevel = {
              "onClick" : self.navToNonAccountFeaturePermission.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View") + "-" +rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
      },

      setTransactionLimitsData :  function(data){
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        let segData = this.selectedSegment.data;
        let self = this;
        let rowData = segData[this.index];
        if(data.transactionLimits.length > 0){
          let limits = this.getLimits(data.transactionLimits[0]);
          let limitNames = this.getLimitNames(data.transactionLimits[0]);
          var limitsData = data.transactionLimits;
          var navManager =  applicationManager.getNavigationManager();
          navManager.setCustomInfo('limitsData',limitsData);

          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblSubHeader = {
              "text":limitNames[0],
              "accessibilityConfig": {
                "a11yLabel":limitNames[0],
              }
            };
            userCurrency = applicationManager.getConfigurationManager().getCurrency(this.currencyCode);
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo('userCurrency', userCurrency);
            rowData.lblTxtPerTransactionLimits = {
              "text": self.getFormattedLimit(userCurrency, limits[0]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[0]),
              }
            };
            rowData.lblTxtDailyTransactionLimits = {
              "text": self.getFormattedLimit(userCurrency, limits[1]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[1]),
              }
            };
            rowData.lblTxtWeeklyTransactionLimits = {
              "text": self.getFormattedLimit(userCurrency, limits[2]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[2]),
              }
            };
            rowData.lblHeader1 = {
              "text": limitNames[1],
              "accessibilityConfig": {
                "a11yLabel": limitNames[1],
              }
            };
            rowData.lblPerTransactionLimitValue = {
              "text": self.getFormattedLimit(userCurrency, limits[3]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[3]),
              }
            };
            rowData.lblDailyTransactionLimitValue = {
              "text": self.getFormattedLimit(userCurrency, limits[4]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[4]),
              }
            };
            rowData.lblWeeklyTransactionLimitValue1 = {
              "text": self.getFormattedLimit(userCurrency, limits[5]),
              "accessibilityConfig": {
                "a11yLabel": self.getFormattedLimit(userCurrency, limits[5]),
              }
            };
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : true,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
        else{
          if (rowData.lblDropdown === "O") {
            rowData.lblDropdown = "P";
            rowData.flxDetails.isVisible = true;
            rowData.lblSubHeader = {
              "text":"No Limits Found",
              "accessibilityConfig": {
                "a11yLabel":"No Limits Found",
              }
            };
            rowData.lblTxtPerTransactionLimits = {
              "isVisible" : false
            };
            rowData.lblTxtDailyTransactionLimits = {
              "isVisible" : false
            };
            rowData.lblTxtWeeklyTransactionLimits = {
              "isVisible" : false
            };
            rowData.lblHeader1 = {
              "isVisible" : false
            };
            rowData.lblPerTransactionLimitValue = {
              "isVisible" : false
            };
            rowData.lblDailyTransactionLimitValue = {
              "isVisible" : false
            };
            rowData.lblWeeklyTransactionLimitValue1 = {
              "isVisible" : false
            };
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
          } else {
            rowData.lblDropdown = "O";
            rowData.flxDetails.isVisible = false;
            rowData.btnViewEditLimits = {
              "onClick" : self.navToTransactionLimits.bind(this),
              "isVisible" : false,
              "accessibilityConfig": {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ rowData.lblRecipient.text
                }
            };
          }
          this.selectedSegment.setDataAt(rowData, this.index);
          kony.application.dismissLoadingScreen();
        }
      },
      
      
        /**
         * Method to populate Transaction Limits
         * @param {JSON} data 
         **/
        showTransactionLimits: function(transactionLimits) {
            let self = this;
            let segRowData = transactionLimits.map(function(transactionLimits, index) {
                let limits = self.getLimits(transactionLimits);
                				let limitNames = self.getLimitNames(transactionLimits);
                let lastFourDigitOfCompanyId = transactionLimits.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
          let contractId = transactionLimits.contractId;
          let coreCustomerId = transactionLimits.coreCustomerId;
              var name = transactionLimits.companyName?transactionLimits.companyName:transactionLimits.coreCustomerName;
                return {
                    "lblRecipient": {
                        "text": name + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            "a11yLabel": transactionLimits.companyName + " - " + lastFourDigitOfCompanyId,
                        }
                    },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segTransactionLimitsMain, index,contractId,coreCustomerId,"limits"),
                         "accessibilityConfig": {
                            "a11yLabel": "Show transaction limits for account "+name + " - " + lastFourDigitOfCompanyId,
                            "a11yARIA":{
                                "aria-expanded": false,
                                "role": "button",
                                "tabindex": 0
                            }
                        }
                    },
                    "CopylblSeparator0c9708b6517574b" : {
                      "isVisible" : true
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                    "lblHeader": {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits")
                        }
                    },
                    "lblSubHeader": {
                        "text": limitNames[0],
                        "accessibilityConfig": {
                            "a11yLabel": limitNames[0],
                        }
                    },
                    "lblPerTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        }
                    },
                    "lblDailyTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        }
                    },
                    "lblWeeklyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        }
                    },
                    "lblTxtPerTransactionLimits": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[0]),//CommonUtilities.getDisplayCurrencyFormat(limits[0]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[0]),
                        }
                    },
                    "lblTxtDailyTransactionLimits": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[1]),//CommonUtilities.getDisplayCurrencyFormat(limits[1]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[1]),
                        }
                    },
                    "lblTxtWeeklyTransactionLimits": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[2]),//CommonUtilities.getDisplayCurrencyFormat(limits[2]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[2]),
                        }
                    },
                    "lblHeader1": {
                        "text": limitNames[1],
                        "accessibilityConfig": {
                            "a11yLabel": limitNames[1],
                        }
                    },
                    "lblPerTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        }
                    },
                    "lblDailyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        }
                    },
                    "lblWeeklyTransactionLimit1": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        }
                    },
                    "lblPerTransactionLimitValue": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[3]),//CommonUtilities.getDisplayCurrencyFormat(limits[3]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[3]),
                        }
                    },
                    "lblDailyTransactionLimitValue": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[4]),//CommonUtilities.getDisplayCurrencyFormat(limits[4]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[4]),
                        }
                    },
                    "lblWeeklyTransactionLimitValue1": {
                        "text": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[5]),//CommonUtilities.getDisplayCurrencyFormat(limits[5]),
                        "accessibilityConfig": {
                            "a11yLabel": applicationManager.getConfigurationManager().getCurrency(self.currencyCode) + applicationManager.getFormatUtilManager().formatAmount(limits[5])
                        }
                    },
                   
                };
            });
            this.view.segTransactionLimitsMain.setData(segRowData);
            this.view.forceLayout();
        },

        showTransactionLimitsEditFlow: function (transactionLimitsData) {
          kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            let self = this;
          this.view.btnTransactionEdit.isVisible = false;
          var transactionLimits = transactionLimitsData.contracts;
            let segRowData = transactionLimits.map(function (transactionLimits, index) {
               // let limits = self.getLimits(transactionLimits);
               // let limitNames = self.getLimitNames(transactionLimits);
                let lastFourDigitOfCompanyId = transactionLimits.contractCustomers[0].id;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
              let contractId = transactionLimits.contractId;
              let coreCustomerId = transactionLimits.contractCustomers[0].id;
                return {
                    "lblRecipient": {
                        "text": transactionLimits.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            "a11yLabel": transactionLimits.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
                        }
                    },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetailsEditFlow.bind(this, self.view.segTransactionLimitsMain, index,coreCustomerId,contractId,"limits"),
                        "accessibilityConfig": {
                            "a11yLabel": "Hide transaction limits for account "+transactionLimits.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId,
                            "a11yARIA":{
                                "aria-expanded": false,
                                "role": "button",
                                "tabindex": 0
                            }
                        }
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                    "lblHeader": {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.UserManagement.GlobalTransactionLimits")
                        }
                    },
                    "lblSubHeader": {
                        "text":"",// limitNames[0],
                        "accessibilityConfig": {
                            "a11yLabel":""// limitNames[0],
                        }
                    },
                    "lblPerTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        }
                    },
                    "lblDailyTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        }
                    },
                    "lblWeeklyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        }
                    },
                    "lblTxtPerTransactionLimits": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[0]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[0]),
                        }
                    },
                    "lblTxtDailyTransactionLimits": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[1]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[1]),
                        }
                    },
                    "lblTxtWeeklyTransactionLimits": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[2]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[2]),
                        }
                    },
                    "lblHeader1": {
                        "text": "",//limitNames[1],
                        "accessibilityConfig": {
                            "a11yLabel": ""//limitNames[1],
                        }
                    },
                    "lblPerTransactionLimit": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.PerTransactionLimit"),
                        }
                    },
                    "lblDailyTransactionLimits": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.DailyTransactionLimit"),
                        }
                    },
                    "lblWeeklyTransactionLimit1": {
                        "text": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.usermanagement.WeeklyTransactionLimit"),
                        }
                    },
                    "lblPerTransactionLimitValue": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[3]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[3]),
                        }
                    },
                    "lblDailyTransactionLimitValue": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[4]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[4]),
                        }
                    },
                    "lblWeeklyTransactionLimitValue1": {
                        "text": "",//self.getFormattedLimit(self.currencyCode, limits[5]),
                        "accessibilityConfig": {
                            "a11yLabel": ""//self.getFormattedLimit(self.currencyCode, limits[5]),
                        }
                    },
                  "btnViewEditLimits" : {
                    "onClick" : self.navToTransactionLimits.bind(this),
                    "isVisible" : false,
                    "accessibilityConfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.userManagement.View")+"-"+ transactionLimits.contractCustomers[0].name + " - " + lastFourDigitOfCompanyId
                    }
                  }
                };
            });
            this.view.segTransactionLimitsMain.setData(segRowData);
            this.view.forceLayout();
          kony.application.dismissLoadingScreen();
        },
      getFormattedLimit: function (currency, limit) {
        if (limit === null || limit === undefined) return "";
        return currency + applicationManager.getFormatUtilManager().formatAmount(limit);
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
      		getLimitNames: function(transactionLimits) {
            let limitNames = [
								          kony.i18n.getLocalizedString("i18n.usermanagement.IndividualTransactionLimits"),
							          kony.i18n.getLocalizedString("i18n.usermanagement.BulkTransactionLimits")
							                ];
            transactionLimits.limitGroups.forEach(function(limitGroup) {
                if (limitGroup.limitGroupId === "BULK_PAYMENT") {
                    if(limitGroup.hasOwnProperty('limitGroupName'))limitNames[1] = limitGroup.limitGroupName;
                } else if (limitGroup.limitGroupId === "SINGLE_PAYMENT") {
                    if(limitGroup.hasOwnProperty('limitGroupName'))limitNames[0] = limitGroup.limitGroupName;
                }
            });
            return limitNames;
        },
        createUserAnotherEntity: function() {
            let navMan = applicationManager.getNavigationManager();
            var addToEntityFlow = navMan.getCustomInfo("addToEntityFlow");
                FormControllerUtility.showProgressBar(this.view);
                this.userManagementData.companyList.forEach(function(data) {
                    data.serviceDefinition = navMan.getCustomInfo("serviceDefinition");
                    data.cif =navMan.getCustomInfo("cif");
                });
                this.userManagementData.accountLevelPermissions.forEach(function(data) {
                    data.serviceDefinition = navMan.getCustomInfo("serviceDefinition");
                    data.cif =navMan.getCustomInfo("cif");
                });
                this.userManagementData.globalLevelPermissions.forEach(function(data) {
                    data.serviceDefinition = navMan.getCustomInfo("serviceDefinition");
                    data.cif =navMan.getCustomInfo("cif");
                });
                this.userManagementData.transactionLimits.forEach(function(data) {
                    data.serviceDefinition = navMan.getCustomInfo("serviceDefinition");
                    data.cif =navMan.getCustomInfo("cif");
                });
                    this.userManagementData.userDetails.coreCustomerId = "";
                    this.userManagementData.userDetails.id = "";
                    this.userManagementData.userDetails.firstName = "";
                    this.userManagementData.userDetails.lastName = "";
                    this.userManagementData.userDetails.email = "";
                    this.userManagementData.userDetails.dob = "";
                    this.userManagementData.userDetails.ssn = "";
				                    this.userManagementData.userDetails.legalEntityId = "";
                    //var navMan=applicationManager.getNavigationManager();
                    delete this.userManagementData.userDetails.id;
                    this.userManagementData.userDetails.firstName = navMan.getCustomInfo("firstName");
                    this.userManagementData.userDetails.lastName = navMan.getCustomInfo("lastName");
                    this.userManagementData.userDetails.id = navMan.getCustomInfo("userId");
                    this.userManagementData.userDetails.coreCustomerId = navMan.getCustomInfo("cif");
                    this.userManagementData.userDetails.email = navMan.getCustomInfo("email");
                    this.userManagementData.userDetails.phoneNumber = navMan.getCustomInfo("phone");
                    this.userManagementData.userDetails.dob = navMan.getCustomInfo("dateOfBirth");
                    this.userManagementData.userDetails.ssn = navMan.getCustomInfo("taxId");
                    applicationManager.getNavigationManager().setCustomInfo('userDetailsSuccess', this.userManagementData.userDetails);
                this.loadBusinessBankingModule().presentationController.createUserAnotherEntity(this.userManagementData);
        },
        createInfinityUser: function(flowType) {
            let navMan = applicationManager.getNavigationManager();
            var createFlowType = navMan.getCustomInfo("createManualFlow");
            if (createFlowType === "createCopyFlow") {
                FormControllerUtility.showProgressBar(this.view);
                this.loadBusinessBankingModule().presentationController.createInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData);
            } else {
                FormControllerUtility.showProgressBar(this.view);
                this.userManagementData.companyList.forEach(function(data) {
                    data.serviceDefinition = data.serviceDefinitionId;
                    data.cif = data.coreCustomerId;
                });
                this.userManagementData.accountLevelPermissions.forEach(function(data) {
                    data.serviceDefinition = data.serviceDefinitionId;
                    data.cif = data.coreCustomerId;
                });
                this.userManagementData.globalLevelPermissions.forEach(function(data) {
                    data.serviceDefinition = data.serviceDefinitionId;
                    data.cif = data.coreCustomerId;
                });
                this.userManagementData.transactionLimits.forEach(function(data) {
                    data.serviceDefinition = data.serviceDefinitionId;
                    data.cif = data.coreCustomerId;
                });
                var navManager = applicationManager.getNavigationManager();
                let navMan = applicationManager.getNavigationManager();
                var phNum = navMan.getCustomInfo("phone");
                var phoneNumber;
                if (phNum !== undefined) {
                    phoneNumber = phNum.split("-")[1]; //phNum.substring(1, 3) + phNum.substring(3);
                }
                var createFlowType = navMan.getCustomInfo("createManualFlow");
                var createSkipFlow = navMan.getCustomInfo("createSkipFlow");
                var createCopySkipflow = navMan.getCustomInfo("createCopySkipflow");
                if (createFlowType === "createManualFlow") {
                        this.userManagementData.userDetails.coreCustomerId = "";
                        this.userManagementData.userDetails.id = "";
                        this.userManagementData.userDetails.firstName = "";
                        this.userManagementData.userDetails.lastName = "";
                        this.userManagementData.userDetails.email = "";
                        this.userManagementData.userDetails.dob = "";
                        this.userManagementData.userDetails.ssn = "";
                        //var navMan=applicationManager.getNavigationManager();
                        delete this.userManagementData.userDetails.id;     
                        this.userManagementData.userDetails.firstName = navMan.getCustomInfo("firstName");
                        this.userManagementData.userDetails.lastName = navMan.getCustomInfo("lastName");
                        this.userManagementData.userDetails.id = navMan.getCustomInfo("coreCustomerId");
                        this.userManagementData.userDetails.coreCustomerId = navMan.getCustomInfo("coreCustomerId");
                        this.userManagementData.userDetails.email = navMan.getCustomInfo("email");
                        this.userManagementData.userDetails.phoneNumber= navMan.getCustomInfo("phone");
                        this.userManagementData.userDetails.phoneCountryCode= navMan.getCustomInfo("phoneCountryCode");
                        this.userManagementData.userDetails.dob = navMan.getCustomInfo("dateOfBirth");
                        this.userManagementData.userDetails.ssn = navMan.getCustomInfo("taxId");
                        navManager.setCustomInfo('userDetailsSuccess', this.userManagementData.userDetails);

                        this.loadBusinessBankingModule().presentationController.createInfinityUser(this.userManagementData);
                }
                /* this.userManagementData.userDetails.coreCustomerId = "";
                   this.userManagementData.userDetails.id = "";
                   this.userManagementData.userDetails.firstName = "";
                   this.userManagementData.userDetails.lastName = "";
                   this.userManagementData.userDetails.email = "";
                   this.userManagementData.userDetails.dob = "";
                   this.userManagementData.userDetails.ssn = "";
                   var navMan=applicationManager.getNavigationManager();*/
                /* delete this.userManagementData.userDetails.id;     
                    this.userManagementData.userDetails.firstName = navMan.getCustomInfo("firstName");
                    this.userManagementData.userDetails.lastName = navMan.getCustomInfo("lastName");
                    this.userManagementData.userDetails.id = navMan.getCustomInfo("coreCustomerId");
                    this.userManagementData.userDetails.coreCustomerId = navMan.getCustomInfo("coreCustomerId");
                    this.userManagementData.userDetails.email = navMan.getCustomInfo("email");
                    this.userManagementData.userDetails.phoneNumber= phoneNumber;//navMan.getCustomInfo("phone");
                    this.userManagementData.userDetails.dob = navMan.getCustomInfo("dateOfBirth");
                    this.userManagementData.userDetails.ssn = "23213432432";//navMan.getCustomInfo("taxId");
                    navManager.setCustomInfo('userDetailsSuccess', this.userManagementData.userDetails);*/
                      else if(createCopySkipflow ==="createCopySkipflow"){ 
                        
                        if (flowType === "create") {   //createUser
                          
                        this.userManagementData.userDetails.coreCustomerId = "";
                        //this.userManagementData.userDetails.id = "";
                        this.userManagementData.userDetails.firstName = "";
                        this.userManagementData.userDetails.lastName = "";
                        this.userManagementData.userDetails.email = "";
                        this.userManagementData.userDetails.dob = "";
                        this.userManagementData.userDetails.ssn = "";
                        //var navMan=applicationManager.getNavigationManager();
                        //delete this.userManagementData.userDetails.id;     
                        this.userManagementData.userDetails.firstName = navMan.getCustomInfo("firstName");
                        this.userManagementData.userDetails.lastName = navMan.getCustomInfo("lastName");
                        //this.userManagementData.userDetails.id = navMan.getCustomInfo("coreCustomerId");
                        this.userManagementData.userDetails.coreCustomerId = navMan.getCustomInfo("coreCustomerId");
                        this.userManagementData.userDetails.email = navMan.getCustomInfo("email");
                        this.userManagementData.userDetails.phoneNumber= phoneNumber;
                        this.userManagementData.userDetails.dob = navMan.getCustomInfo("dateOfBirth");
                        this.userManagementData.userDetails.ssn = navMan.getCustomInfo("taxId");
                        navManager.setCustomInfo('userDetailsSuccess', this.userManagementData.userDetails);                          
                        this.loadBusinessBankingModule().presentationController.createInfinityUser(this.userManagementData);
                          
                        } else {   //editUser

                          var updatedLE = applicationManager.getUserPreferencesManager().getCurrentLegalEntity();
                        this.userManagementData.userDetails.coreCustomerId = "";
                        this.userManagementData.userDetails.id = "";
                        this.userManagementData.userDetails.firstName = "";
                        this.userManagementData.userDetails.lastName = "";
                        this.userManagementData.userDetails.email = "";
                        this.userManagementData.userDetails.dob = "";
                        this.userManagementData.userDetails.ssn = "";
                          this.userManagementData.userDetails.legalEntityId = "";
                        //var navMan=applicationManager.getNavigationManager();
                        delete this.userManagementData.userDetails.id;
                        delete this.userManagementData.userDetails.coreCustomerId;
                        this.userManagementData.userDetails.firstName = navMan.getCustomInfo("firstName");
                        this.userManagementData.userDetails.lastName = navMan.getCustomInfo("lastName");
                        this.userManagementData.userDetails.id = navMan.getCustomInfo("coreCustomerId");
                        //this.userManagementData.userDetails.coreCustomerId = navMan.getCustomInfo("coreCustomerId");
                        this.userManagementData.userDetails.email = navMan.getCustomInfo("email");
                        this.userManagementData.userDetails.phoneNumber= phoneNumber;
                        this.userManagementData.userDetails.dob = navMan.getCustomInfo("dateOfBirth");
                        this.userManagementData.userDetails.ssn = navMan.getCustomInfo("taxId");
                          this.userManagementData.userDetails.legalEntityId = updatedLE;
                        navManager.setCustomInfo('userDetailsSuccess', this.userManagementData.userDetails);
                          
                        this.userManagementData.userDetails.id = navMan.getCustomInfo("userId");
                        this.loadBusinessBankingModule().presentationController.updateInfinityUserForCreate(this.userManagementData);
                        }
                      }
                else{
                    delete this.userManagementData.userDetails;
                    this.userManagementData.customRoleDetails = navMan.getCustomInfo("customRoleDetails");
                    navManager.setCustomInfo('data', this.userManagementData);
                    this.userManagementData.signatoryGroups = {};
                    this.loadBusinessBankingModule().presentationController.createCustomRole(this.userManagementData);
                }
            }
        },
        updateInfinityUser: function() {
            applicationManager.getNavigationManager().navigateTo("frmBBUsersDashboard");
            /*FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData);*/
        },
        createCustomRole: function() {
            FormControllerUtility.showProgressBar(this.view);
            var userManagementData = this.loadBusinessBankingModule().presentationController.userManagementData;   
          userManagementData.companyList.forEach(function(data) {
            if(data.cif === undefined || data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined || data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
            if(data.serviceDefinition === undefined){
              data.serviceDefinition = data.serviceDefinitionId;
            }

          });
          userManagementData.accountLevelPermissions.forEach(function(data) {
            if(data.cif === undefined || data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined || data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
          userManagementData.globalLevelPermissions.forEach(function(data) {
            if(data.cif === undefined || data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined || data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
          userManagementData.transactionLimits.forEach(function(data) {
            if(data.cif === undefined || data.companyName === undefined){
              data.cif = data.coreCustomerId;
              data.companyName = data.coreCustomerName;
            }
            if(data.coreCustomerId === undefined || data.coreCustomerName === undefined){
              data.coreCustomerId = data.cif;
              data.coreCustomerName = data.companyName;
            }
          });
            this.loadBusinessBankingModule().presentationController.createCustomRole(userManagementData);
        },
        updateCustomRole: function() {
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData);
        },
        navigateToCreateUser: function() {
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
            applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
        },
        navigateToCreateRole: function() {
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
            applicationManager.getNavigationManager().navigateTo("frmBBCreateCustomRole");
        },
        navigateToAccountAccessandRole: function() {
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
          if(!kony.sdk.isNullOrUndefined(this.userManagementData.userDetails)){
            var isEnroll;
            if(this.userManagementData.userDetails.isEnrolled === "true")
              isEnroll = true;
            else
              isEnroll = false;
            applicationManager.getConfigurationManager().isEnrolled = isEnroll;
          }
            applicationManager.getNavigationManager().navigateTo("frmBBAccountAccessAndRole");
        },
        navigateToAccountLevelFeaturePermissions: function() {
            let self = this;
          var navManager =  applicationManager.getNavigationManager();
          var flowValue = navManager.getCustomInfo('editUserFlow');
          var accountLevelPermissions = navManager.getCustomInfo('accountLevelPermissions');
          var paramValue;
          if(flowValue === "editFlow")
            paramValue = accountLevelPermissions;
          else
            paramValue = self.userManagementData.accountLevelPermissions;

            let param = {
                "flowType": "FROM_ACK_FORM",
                "accountLevelPermissions": paramValue
            };
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
            applicationManager.getNavigationManager().navigateTo("frmFeaturePermissions",true,param);
        },
        navToNonAccountFeaturePermission: function() {
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
            applicationManager.getNavigationManager().navigateTo("frmNonAccountLevelFeature");
        },
        navToTransactionLimits: function() {
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(true);
            applicationManager.getNavigationManager().navigateTo("frmTransactionLimits");
        },
        onCancelClick: function() {
            //this.loadBusinessBankingModule().presentationController.navigateToUMDashboard();
            this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
        },
      onBackClickUserSkip: function() {
        this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
        if(this.compName.length !== 0)
          applicationManager.getNavigationManager().navigateTo("frmSelectSignatoryGroup");
        else
          applicationManager.getNavigationManager().navigateTo("frmBBAccountAccessAndRole");
      },
      onSigGrpEdit: function() {
            //this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
            applicationManager.getNavigationManager().navigateTo("frmSelectSignatoryGroup");
        },
        onBackClickRoleCopy: function() {
            var param = {
                "roleName": this.customRoleName
            };
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
            this.loadBusinessBankingModule().presentationController.setCustomRoleData(param);
            applicationManager.getNavigationManager().navigateTo("frmBBCreateCustomRole");
        },
        onBackClickUserCopy: function() {
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
            applicationManager.getNavigationManager().navigateTo("frmBBCopyPermission");
        },
        onBackClickUserManagement: function() {
            this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsers(this.loadBusinessBankingModule().presentationController.fetchAssociatedContractUsersSuccess.bind(this.loadBusinessBankingModule().presentationController));
        }
    };
});