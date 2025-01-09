define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  return /** @alias module:frmUserManagementController */ {
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

      //this.adjustScreen();
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
//       this.view.btnProceedRoles.onClick = this.navToAckScreenAfterSaving;
//       this.view.btnCancelRoles.onClick = this.navToAckScreen;
      this.view.btnTransactionLimits.onClick = this.navigateToEditAdvancedPermissions;
      this.view.segCustomRoles.onRowClick = function() {
        scopeObj.view.flxSideSeparator.setVisibility(false);
        //save changes to accountLevelPermissions object
        scopeObj.saveChangesToAccountLevelPermissionsControllerObj();
        scopeObj.companySelected();
      };
      this.view.btnCancelRoles.onClick = function(){
        scopeObj.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
      };
      this.view.btnProceedRoles.onClick = function(){
        scopeObj.navToAckScreenAfterSaving();
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      };
      this.view.flxCross.onClick = function() {
        scopeObj.view.flxDialogs.isVisible = false;  
        scopeObj.view.flxEditPermissionsPopup.isVisible = false;
      };
      this.view.btnNo.onClick = function() {
        scopeObj.view.flxDialogs.isVisible = false;  
        scopeObj.view.flxEditPermissionsPopup.isVisible = false;
      };
      this.view.btnYes.onClick = this.editPermissionPolicyLevel;
      this.view.flxDropdown.onClick = this.bulkSelectFeatures;
      this.view.btnViewNEdit.onClick = this.resetToDefault;

      this.view.flxComponentSearch.txtSearch.onKeyUp = function() {
        scopeObj.searchFeatures(scopeObj.view.flxComponentSearch.txtSearch.text);
      };
      this.view.flxComponentSearch.flxClearBtn.onClick = function() {
        scopeObj.view.flxComponentSearch.txtSearch.text = "";
        scopeObj.view.flxComponentSearch.flxClearBtn.isVisible = false;
        scopeObj.showFeaturePermissions();
      };
      this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
      this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
    },


    /**
    * Method will invoke on form pre show
    */
    preShow: function() {
     this.imgArrowTransform = this.loadBusinessBankingModule().presentationController.getImgTransformObj();
    },

    /**
    * Method will invoke on Navigate
    */
    onNavigate: function(param) {
      FormControllerUtility.showProgressBar(this.view);
      if (param.flowType === "FROM_ACK_FORM") {
        this.accountLevelPermissions = JSON.parse(JSON.stringify(param.accountLevelPermissions));
        this.selectedCompanyIndex = 0;
        this.updateButtonToShow = false;
      } else {
        let paramAccountLevelPermissions = param.accountLevelPermissions;
        let jpath = "cif=" + paramAccountLevelPermissions.cif;
        //this.accountLevelPermissions = this.loadBusinessBankingModule().presentationController.getAccountLevelPermissions();
        this.accountLevelPermissions = CommonUtilities.updateObjectFromPath(this.accountLevelPermissions, jpath, param.accountLevelPermissions);
      }
      this.view.flxScrollRightContainer.isVisible = false;
      this.featureActionsMap = {};
      this.actionAndPolicyMap = {};
      this.accountsArr = {};
      this.updateButtonToShow ? FormControllerUtility.enableButton(this.view.btnProceedRoles) : FormControllerUtility.disableButton(this.view.btnProceedRoles);
      if (!kony.sdk.isNullOrUndefined(OLBConstants.CLIENT_PROPERTIES.ADVANCED_FEATURE_SELECTION) && OLBConstants.CLIENT_PROPERTIES.ADVANCED_FEATURE_SELECTION.toString() === "true") {
        this.view.btnTransactionLimits.isVisible = true;
      } else {
        this.view.btnTransactionLimits.isVisible = false;
      }
      this.loadBusinessBankingModule().presentationController.getAccessPolicies();
    },

    resetToDefault: function() {
      this.accountLevelPermissions = this.loadBusinessBankingModule().presentationController.getInitAccountLevelPermissions();
      this.featureActionsMap = {};
      this.actionAndPolicyMap = {};
      this.accountsArr = {};
      this.showAccountLevelPermissions();
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },

    /**
         * Method will invoke on form post show
         */
    postShow: function() {
      this.onBreakpointChange();
    },


    /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
    updateFormUI: function(viewModel) {
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      } else {
        if (viewModel.progressBar === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.progressBar === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.accessPoliciesSuccess) {
          this.accessPolicies = viewModel.accessPoliciesSuccess.AccessPolicyRecords;
          this.showAccountLevelPermissions();
        }
        if(viewModel.updateInfinityUserSuccess){
          this.navToAckAfterUpdate(viewModel.updateInfinityUserSuccess);
        }
      }
      if (viewModel.updateCustomRoleSuccess) {
        this.navToAckScreen();
        //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
                    //this.loadBusinessBankingModule().presentationController.navigateToUserRoles();
                } 
      else if (viewModel.updateCustomRoleFailure) {
                    this.view.flxMainWrapper.isVisible = true;
                    this.view.flxDowntimeWarning.isVisible = true;
                    this.view.lblDowntimeWarning.text = viewModel.updateCustomRoleFailure.errorMessage;
                }
    },
    navToAckScreen: function() {
      //kony.application.showLoadingScreen();
      var navManager =  applicationManager.getNavigationManager();
       navManager.setCustomInfo('editUserFlow',"editFlow");
      navManager.setCustomInfo('getInfinityUser',"false");
      applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
    },
    navToAckScreenAfterSaving: function() {
		//update this.accountLevelPermissions !!!!!!!
      let navManager = applicationManager.getNavigationManager();
		this.saveChangesToAccountLevelPermissionsControllerObj();
		var bussBankingPC = this.loadBusinessBankingModule().presentationController;
		bussBankingPC.setAccountLevelPermissions(this.accountLevelPermissions);
		bussBankingPC.generateTransactionLimits(JSON.parse(JSON.stringify(bussBankingPC.userManagementData.accountLevelPermissions)));
      var userDetails = this.loadBusinessBankingModule().presentationController.userManagementData.companyList;
      if(userDetails.id === undefined){
        userDetails.id = userDetails.coreCustomerId;
      }  ("EditType","userEdit")
      var editType = navManager.getCustomInfo('EditType')
      var skipFlow = navManager.getCustomInfo('createSkipFlow');
      if(skipFlow !== "createSkipFlow"){
        if(editType==="userEdit"){
          this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"accountLevel");
        }
        else if(editType === "roleEdit"){
        this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData,"accountLevel");
        }
      }
      else{
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
      }
      
	},
    
    navToAckAfterUpdate : function(updateSuccessData){
      var userDetails = this.loadBusinessBankingModule().presentationController.userManagementData.userDetails;
      if(userDetails.id === undefined){
        userDetails.id = userDetails.coreCustomerId;
      }
      var navManager =  applicationManager.getNavigationManager();
      navManager.setCustomInfo("userManagementData",userDetails);
      navManager.setCustomInfo("updateSuccessData",updateSuccessData);
      var skipFlow = navManager.getCustomInfo('createSkipFlow');
      if(skipFlow !== "createSkipFlow"){
        navManager.setCustomInfo('editUserFlow',"editFlow");
        navManager.setCustomInfo('getInfinityUser',"false");
		applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
        FormControllerUtility.showProgressBar(this.view);
      }else{
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
        FormControllerUtility.showProgressBar(this.view);
      }
	},
    //load BusinessBanking Module
    loadBusinessBankingModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
    },
   updateCustomRole: function() {
            FormControllerUtility.showProgressBar(this.view);
            this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData);
        },
    showAccessPolicies: function() {
      let self = this;
      let len = this.accessPolicies.length;
      let rowData = {};
      if (len <= 5) {
        rowData.flxCheckBoxes = {
          "isVisible": true
        };
        rowData.flxCheckBoxes1 = {
          "isVisible": false
        };
        rowData.flxCheckBoxes2 = {
          "isVisible": false
        };
      } else if (len <= 10) {
        rowData.flxCheckBoxes = {
          "isVisible": true
        };
        rowData.flxCheckBoxes1 = {
          "isVisible": true
        };
        rowData.flxCheckBoxes2 = {
          "isVisible": (kony.application.getCurrentBreakpoint() <= 1024)?true:false
        };
      } else {
        rowData.flxCheckBoxes = {
          "isVisible": true
        };
        rowData.flxCheckBoxes1 = {
          "isVisible": true
        };
        rowData.flxCheckBoxes2 = {
          "isVisible": true
        };
      }

      let indices = ["1", "2", "3", "4", "5", "11", "12", "13", "14", "15", "21", "22", "23", "24", "25"];
      for (let i = 0; i < 15; i++) {
        if (i < len) {
          rowData["flxCheckBox" + indices[i]] = {
            "isVisible": true
          };
          let checkBoxVal = self.getStatusOfAccessLevel(self.accessPolicies[i].id);
          if (checkBoxVal === null) {
            rowData["lblCheckBox" + indices[i]] = {
              "text": "D",
              "skin": "sknFontIconDisabled"
            };
            rowData["lblCheckBoxText" + indices[i]] = {
              "text": this.accessPolicies[i].name,
              "skin": "sknlbla0a0a015px"
            };
          } else {
            rowData["lblCheckBox" + indices[i]] = {
              "text": checkBoxVal,
              "skin": "sknlblDelete20px",
              "accessibilityConfig": {
                "a11yLabel": checkBoxVal === "C" ? kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected") : (checkBoxVal === "D" ? kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected") : kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected"))
              }
            };
            rowData["lblCheckBoxText" + indices[i]] = {
              "text": this.accessPolicies[i].name,
              "skin": "sknLabel42424215px",
              "accessibilityConfig": {
                "a11yLabel": this.accessPolicies[i].name
              }
            };
            rowData["lblCheckBox" + indices[i]].onTouchEnd = self.onClickOfAccessPolicy.bind(this, i);
          }
        } else {
          rowData["flxCheckBox" + indices[i]] = {
            "isVisible": false
          };
        }
      }
      this.view.segUserManagementPermissions.setData([rowData]);
    },

    onClickOfAccessPolicy: function(i) {
      let indices = ["1", "2", "3", "4", "5", "11", "12", "13", "14", "15", "21", "22", "23", "24", "25"];
      let selectedPolicy = this.accessPolicies[i].id;
      let segData = this.view.segUserManagementPermissions.data;
      let policyStatus = segData[0]["lblCheckBox" + indices[i]].text;
      let filler = 1;
      if (policyStatus === "C" || policyStatus === "y") {
        filler = 0;
      }
      this.updatePolicyOfAllFeatures(selectedPolicy, filler);
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },

    updatePolicyOfAllFeatures: function(policyId, filler) {
      let self = this;
      let subSequentActionsSet = "dependentActions";
      if (filler === 0) {
        subSequentActionsSet = "dependencyActions";
      }
      for (let feature in this.featureActionsMap[this.selectedCIF]) {
        if (this.featureActionsMap[this.selectedCIF][feature].policies.hasOwnProperty(policyId)) {
          let refObj = this.featureActionsMap[this.selectedCIF][feature];
          let rows = refObj.policies[policyId].selectedActions.length;
          let cols = refObj.policies[policyId].selectedActions[0].length;
          refObj.policies[policyId].selectedActions = new Array(rows).fill().map(() => new Array(cols).fill(filler));
          //let adder = refObj.policies[policyId]["totalCount"] * filler - refObj.policies[policyId]["enabledCount"];
          refObj.policies[policyId]["enabledCount"] = refObj.policies[policyId]["totalCount"] * filler;

          refObj["policies"][policyId][subSequentActionsSet].forEach(function(eachDepActionArr) {
            eachDepActionArr.forEach(function(eachDepAction) {
              if (self.actionAndPolicyMap[self.selectedCIF].hasOwnProperty(feature + "::" + eachDepAction) && self.actionAndPolicyMap[self.selectedCIF][feature + "::" + eachDepAction] !== policyId) {
                let depPolicy = self.actionAndPolicyMap[self.selectedCIF][feature + "::" + eachDepAction];
                let index = refObj["policies"][depPolicy].actions.indexOf(eachDepAction);
                let accountsTrackOfActionRef = refObj["policies"][depPolicy].selectedActions[index];
                let currSum = accountsTrackOfActionRef.reduce((a, b) => a + b, 0);
                refObj["policies"][depPolicy].selectedActions[index] = new Array(accountsTrackOfActionRef.length).fill(filler);
                refObj["policies"][depPolicy]["enabledCount"] += accountsTrackOfActionRef.length * filler - currSum;
              }
            });
          });
          let totalEnabledCount = 0;
          for (let eachPolicy in refObj["policies"]) {
            totalEnabledCount += refObj["policies"][eachPolicy]["enabledCount"];
          }
          refObj["stats"]["enabledCount"] = totalEnabledCount;
          //this.featureActionsMap[this.selectedCIF][feature].stats["enabledCount"] += adder;
        }
      }
      this.showAccessPolicies();
      this.showFeaturePermissions();
    },

    getStatusOfAccessLevel: function(policyId) {
      let bool = null;
      for (let feature in this.featureActionsMap[this.selectedCIF]) {
        if (this.featureActionsMap[this.selectedCIF][feature].policies.hasOwnProperty(policyId)) {
          let refObj = this.featureActionsMap[this.selectedCIF][feature].policies[policyId];
          if (refObj.totalCount === refObj.enabledCount) {
            if (bool !== null && bool !== "C") {
              bool = "y";
              break;
            } else {
              bool = "C";
            }
          } else if (refObj.enabledCount === 0) {
            if (bool !== null && bool !== "D") {
              bool = "y";
              break;
            } else {
              bool = "D";
            }
          } else {
            bool = "y";
            break;
          }
        }
      }
      return bool;
    },

    showAccountLevelPermissions: function() {
      let self = this;

      var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
      var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
      if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
        this.view.lblUserName.isVisible = false;
        this.view.lblEmail.isVisible = false;
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
        } else {
          this.view.customheadernew.activateMenu("User Management", "User Roles");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.view_EditRole_AccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
        }
      } else {
        let userDetails = this.loadBusinessBankingModule().presentationController.getUserDetails();
        this.view.lblUserName.isVisible = true;
        this.view.lblEmail.isVisible = true;
        CommonUtilities.setText(this.view.lblUserName, userDetails.firstName + " " + userDetails.lastName, CommonUtilities.getaccessibilityConfig());
        CommonUtilities.setText(this.view.lblEmail, userDetails.email, CommonUtilities.getaccessibilityConfig());
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.activateMenu("User Management", "Create UM User");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createUser_AccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
        } else {
          this.view.customheadernew.activateMenu("User Management", "All Users");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.view_EditUser_AccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
        }
      }

      if (self.accountLevelPermissions === null || self.accountLevelPermissions === undefined || self.accountLevelPermissions === -1 || self.accountLevelPermissions.length === 0) {
        this.view.segCustomRoles.isVisible = false;
      } else {
        this.view.segCustomRoles.isVisible = true;
        var segRowData = self.accountLevelPermissions.map(function(accountLevelPermission) {
          let permissionType = accountLevelPermission.hasOwnProperty("permissionType") ? accountLevelPermission.permissionType : kony.i18n.getLocalizedString("i18n.UserManagement.default");
          let accountLevelPermissionCif = (accountLevelPermission.cif ? accountLevelPermission.cif : accountLevelPermission.coreCustomerId);
          let lastFourDigitOfCompanyId = accountLevelPermissionCif;
          if (lastFourDigitOfCompanyId.length > 4) {
            lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
          }
          return {
            "imgArrow": {
              "transform": self.imgArrowTransform,
              "isVisible": false
            },
            "lblRoleName": {
              "text": (accountLevelPermission.companyName ? accountLevelPermission.companyName : accountLevelPermission.coreCustomerName) + " - " + lastFourDigitOfCompanyId,
              "accessibilityConfig": {
                "a11yLabel": accountLevelPermission.companyName + " - " + lastFourDigitOfCompanyId
              }
            },
            "lblPermision": {
              "text": permissionType,
              "isVisible": false,
              "accessibilityConfig": {
                "a11yLabel": permissionType
              }
            },
            "cif": accountLevelPermissionCif,
            "userRole": accountLevelPermission.userRole
          }
        });
        this.view.segCustomRoles.setData(segRowData);
      }

      this.companySelected(this.selectedCompanyIndex);
    },

    companySelected: function(index) {
      FormControllerUtility.showProgressBar(this.view);

      // Left Container
      if (index === undefined) {
        index = this.view.segCustomRoles.selectedRowIndex[1];
      }
      this.selectedCompanyIndex = index;
      var segData = this.view.segCustomRoles.data;
      var self=this;
      segData.forEach(function(arrayElement, i) {
        if (i == index) {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": true
          };
        } else {
          arrayElement.imgArrow = {
            "transform": self.imgArrowTransform,
            "isVisible": false
          };
        }
      });
      this.view.segCustomRoles.setData(segData);

      // Right Container
      this.selectedCIF = segData[index].cif;

      let selectedCompanyAccountLevelPermissions = {};
      for (let i = 0; i < this.accountLevelPermissions.length; i++) {
        if ((this.accountLevelPermissions[i].cif ? this.accountLevelPermissions[i].cif : this.accountLevelPermissions[i].coreCustomerId) === this.selectedCIF) {
          selectedCompanyAccountLevelPermissions = this.accountLevelPermissions[i];
          break;
        }
      }
      this.selectedCompanyAccountLevelPermissionsGlobal = selectedCompanyAccountLevelPermissions;
      this.showFeaturePermissions();
      this.view.forceLayout();
    },

    searchFeatures: function(searchString) {
      if (searchString === "") {
        this.view.flxComponentSearch.flxClearBtn.isVisible = false;
        this.view.forceLayout();
      } else {
        this.view.flxComponentSearch.flxClearBtn.isVisible = true;
        this.view.forceLayout();
      }
      let featureSearchResult = CommonUtilities.sortAndSearchJSON(this.selectedCompanyAccountLevelPermissionsGlobal.accounts[0].featurePermissions, null, null, "featureName", searchString);
      if (featureSearchResult === -1 || featureSearchResult === null || featureSearchResult === undefined || featureSearchResult.length === 0) {
        featureSearchResult = [];
      }
      this.showFeaturePermissions(featureSearchResult);
    },

    showFeaturePermissions: function(featureSet) {
      let self = this;
      this.generateFeatureActionsMap();

      this.numberOfSelections = {
        "C": 0,
        "y": 0,
        "D": 0
      };
      if (featureSet === undefined) {
        featureSet = this.selectedCompanyAccountLevelPermissionsGlobal.accounts[0].featurePermissions;
      }
      let featuresRowData = featureSet.map(function(features, index) {
        let featureStatsRef = self.featureActionsMap[self.selectedCIF][features.featureId]["stats"];
        let toSetIcon = "C",
            toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        let permissionType = kony.i18n.getLocalizedString("i18n.UserManagement.default");
        if (featureStatsRef["enabledCount"] === featureStatsRef["totalCount"]) {
          toSetIcon = "C";
        } else if (featureStatsRef["enabledCount"] === 0) {
          toSetIcon = "D";
          toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        } else {
          toSetIcon = "y";
          toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected");
          permissionType = kony.i18n.getLocalizedString("i18n.UserManagement.custom");
        }
        self.numberOfSelections[toSetIcon]++;

        return {
          "lblRecipientName": {
            "text": features.featureName,
            "accessibilityConfig": {
              "a11yLabel": features.featureName
            }
          },
          "featureId": features.featureId,
          "flxDropdown": {
            "onClick": self.onSelectFeature.bind(this, index)
          },
          "lblDropdown": {
            "text": toSetIcon,
            "accessibilityConfig": {
              "a11yLabel": toSetA11y
            }
          },
          "lblCheckBoxText1": {
            "text": permissionType,
            "isVisible":false,
            "accessibilityConfig": {
              "a11yLabel": permissionType,
            }
          },
          "btnTransactionLimits": {
            "onClick": self.onEditFeature.bind(this, index)
          },
          "flxActions": {
            "isVisible": toSetIcon === "D" ? false : true
          }
        }
      });
      this.showAccessPolicies();
      this.setMainCheckbox();
      FormControllerUtility.disableButton(self.view.btnYes);
      this.view.segTransactionLimits.setData(featuresRowData);
      this.view.flxScrollRightContainer.isVisible = true;
      FormControllerUtility.hideProgressBar(this.view);
    },

    generateFeatureActionsMap: function() {
      if (!(this.featureActionsMap.hasOwnProperty(this.selectedCIF))) {
        let self = this;
        let featureActionObj = {};
        featureActionObj[self.selectedCIF] = {};
        let noOfAccounts = self.selectedCompanyAccountLevelPermissionsGlobal.accounts.length;

        this.actionAndPolicyMap[self.selectedCIF] = {};
        self.selectedCompanyAccountLevelPermissionsGlobal.accounts[0].featurePermissions.forEach(function(feature) {
          let actionMap = {};
          feature.permissions.forEach(function(action) {
            self.actionAndPolicyMap[self.selectedCIF][feature.featureId + "::" + action.actionId] = action.accessPolicyId;
            if (actionMap.hasOwnProperty(action.accessPolicyId)) {
              //console.log(actionMap[action.accessPolicyId]);
              actionMap[action.accessPolicyId].actions.push(action.actionId);
              actionMap[action.accessPolicyId].dependencyActions.push([]);
              actionMap[action.accessPolicyId].dependentActions.push(action.dependentActions === undefined ? [] : self.parseDepActions(action.dependentActions));
              actionMap[action.accessPolicyId].selectedActions.push(new Array(noOfAccounts).fill(0));
            } else {
              //console.log(actionMap);
              actionMap[action.accessPolicyId] = {
                "actions": [action.actionId],
                "dependencyActions": [
                  []
                ],
                "dependentActions": [action.dependentActions === undefined ? [] : self.parseDepActions(action.dependentActions)],
                "selectedActions": [new Array(noOfAccounts).fill(0)]
              }
            }

          });
          featureActionObj[self.selectedCIF][feature.featureId] = {};
          featureActionObj[self.selectedCIF][feature.featureId]["policies"] = actionMap;
        });

        //Account level enabled actions
        let accountsArr = [];
        let i = -1;
        self.selectedCompanyAccountLevelPermissionsGlobal.accounts.forEach(function(account) {
          i++;
          accountsArr.push(account.accountId);
          account.featurePermissions.forEach(function(featurePermission) {
            featurePermission.permissions.forEach(function(action) {
              if (action.isEnabled.toString() === "true") {
                let featureRef = featureActionObj[self.selectedCIF][featurePermission.featureId]["policies"][action.accessPolicyId];
                // console.log(featurePermission.featureId);
                // console.log(featureRef);
                // console.log(action.actionId);
                let j = featureRef.actions.indexOf(action.actionId);
                featureRef.selectedActions[j][i] = 1;
              }
            });

          });
        });
        this.accountsArr[self.selectedCIF] = accountsArr;

        //setting dependency actions
        for (let permission in featureActionObj[self.selectedCIF]) {
          let totalFeatureAccountCount = 0;
          let enabledFeatureAccountCount = 0;
          for (let policy in featureActionObj[self.selectedCIF][permission]["policies"]) {
            let policyRefObj = featureActionObj[self.selectedCIF][permission]["policies"][policy];
            policyRefObj["totalCount"] = policyRefObj.selectedActions.length * policyRefObj.selectedActions[0].length;
            let calSum = 0;
            policyRefObj.selectedActions.forEach(function(eachAction) {
              calSum += eachAction.reduce(function(total, num) {
                return total + num;
              });
            });
            policyRefObj["enabledCount"] = calSum;

            totalFeatureAccountCount += policyRefObj["totalCount"];
            enabledFeatureAccountCount += policyRefObj["enabledCount"];

            policyRefObj.actions.forEach(function(action, i) {
              let depActions = policyRefObj.dependentActions[i];
              depActions.forEach(function(depAction) {
                if (self.actionAndPolicyMap[self.selectedCIF].hasOwnProperty(permission + "::" + depAction)) {
                  let refObj = featureActionObj[self.selectedCIF][permission]["policies"][self.actionAndPolicyMap[self.selectedCIF][permission + "::" + depAction]];
                  let j = refObj.actions.indexOf(depAction);
                  refObj.dependencyActions[j].push(action);
                }
              });
            });
          }
          featureActionObj[self.selectedCIF][permission]["stats"] = {};
          featureActionObj[self.selectedCIF][permission]["stats"]["totalCount"] = totalFeatureAccountCount;
          featureActionObj[self.selectedCIF][permission]["stats"]["enabledCount"] = enabledFeatureAccountCount;
        }

        this.featureActionsMap[self.selectedCIF] = featureActionObj[self.selectedCIF];
      }
    },

    parseDepActions: function(dependentActionsString) {
      return dependentActionsString.substr(1, dependentActionsString.length - 2).split(",").map(eachStr => eachStr.trim());
    },


    onEditFeature: function(index, mapInstruction) {
      let self = this;
      this.view.flxDialogs.isVisible = true;
      this.view.flxEditPermissionsPopup.isVisible = true;
      let segRow = this.view.segTransactionLimits.data[index];
      this.selectedFeatureIndex = index;
      let policyMap = this.featureActionsMap[self.selectedCIF][segRow.featureId]["policies"];
      if (mapInstruction === "useTempMap") {
        policyMap = this.featureActionsMapTemp[self.selectedCIF][segRow.featureId]["policies"];
      }
      let policySet = [];
      for (let j in policyMap) {
        policySet.push(j);
      }

      if (policySet.length <= 3) {
        this.view.flxCheckBoxes1.isVisible = true;
        this.view.flxCheckBoxes2.isVisible = false;
        this.view.flxCheckBoxes3.isVisible = false;
      } else if (policySet.length <= 6) {
        this.view.flxCheckBoxes1.isVisible = true;
        this.view.flxCheckBoxes2.isVisible = true;
        this.view.flxCheckBoxes3.isVisible = false;
      } else {
        this.view.flxCheckBoxes1.isVisible = true;
        this.view.flxCheckBoxes2.isVisible = true;
        this.view.flxCheckBoxes3.isVisible = true;
      }

      let checkboxSuffices = ["1", "2", "3", "21", "22", "23", "31", "32", "33"];
      policySet.forEach(function(policy, i) {

        if (policyMap[policy]["totalCount"] === policyMap[policy]["enabledCount"]) {
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text = "C";
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        } else if (policyMap[policy]["enabledCount"] === 0) {
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text = "D";
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        } else {
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text = "y";
          self.view["lblCheckBoxSelect" + checkboxSuffices[i]].accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected");
        }
        self.view["lblSelectCheckBoxText" + checkboxSuffices[i]].text = policy;

        self.view["lblSelectCheckBoxText" + checkboxSuffices[i]].isVisible = true;
        self.view["lblCheckBoxSelect" + checkboxSuffices[i]].isVisible = true;

        //setting Action
        self.view["lblCheckBoxSelect" + checkboxSuffices[i]].onTouchEnd = function() {
          if (self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text === "y" || self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text === "C") {
            self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text = "D";
            self.view["lblCheckBoxSelect" + checkboxSuffices[i]].accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
            self.updateFeatureActionsMapOnSelectingPolicy(segRow.featureId, policy, 0, index); 
          } else {
            self.view["lblCheckBoxSelect" + checkboxSuffices[i]].text = "C";
            self.view["lblCheckBoxSelect" + checkboxSuffices[i]].accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
            self.updateFeatureActionsMapOnSelectingPolicy(segRow.featureId, policy, 1, index);
          }
          FormControllerUtility.enableButton(self.view.btnYes);
        }

      });
      for (let i = policySet.length; i < 9; i++) {
        self.view["lblCheckBoxSelect" + checkboxSuffices[i]].isVisible = false;
        self.view["lblSelectCheckBoxText" + checkboxSuffices[i]].isVisible = false;
      }
    },

    editPermissionPolicyLevel: function() {
      let segData = this.view.segTransactionLimits.data;
      let featureId = segData[this.selectedFeatureIndex].featureId;
      this.featureActionsMap[this.selectedCIF][featureId] = JSON.parse(JSON.stringify(this.featureActionsMapTemp[this.selectedCIF][featureId]));
      this.featureActionsMapTemp = undefined;
      let featureStatsRef = this.featureActionsMap[this.selectedCIF][featureId]["stats"];
      let toSetIcon = "C",
          toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
      if (featureStatsRef["enabledCount"] === featureStatsRef["totalCount"]) {
        toSetIcon = "C";
        toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
      } else if (featureStatsRef["enabledCount"] === 0) {
        toSetIcon = "D";
        toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
      } else {
        toSetIcon = "y";
        toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected");
      }

      if (segData[this.selectedFeatureIndex].lblDropdown.text !== toSetIcon) {
        this.numberOfSelections[toSetIcon]++;
        this.numberOfSelections[segData[this.selectedFeatureIndex].lblDropdown.text]--;
        segData[this.selectedFeatureIndex].lblDropdown.text = toSetIcon;
        segData[this.selectedFeatureIndex].lblDropdown.accessibilityConfig.a11yLabel = toSetA11y;
        if (toSetIcon === "D") {
          segData[this.selectedFeatureIndex].flxActions.isVisible = false;
        } else {
          segData[this.selectedFeatureIndex].flxActions.isVisible = true;
          let permissionType = toSetIcon === "C" ? kony.i18n.getLocalizedString("i18n.UserManagement.default") : kony.i18n.getLocalizedString("i18n.UserManagement.custom");
          segData[this.selectedFeatureIndex].lblCheckBoxText1.text = permissionType;
          segData[this.selectedFeatureIndex].lblCheckBoxText1.accessibilityConfig.a11yLabel = permissionType;
        }
        this.setMainCheckbox();
        this.view.segTransactionLimits.setData(segData);
      }
      this.showAccessPolicies();
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
      this.view.flxDialogs.isVisible = false;
      this.view.flxEditPermissionsPopup.isVisible = false;
    },

    saveCurrentCompanyAccountLevelPermissions: function() {
      //Form selectedCompanyAccountLevelPermissionsGlobal first and then save
      this.loadBusinessBankingModule().presentationController.setAccountLevelPermissionsByCompany(this.selectedCIF, this.selectedCompanyAccountLevelPermissionsGlobal);
    },

    navigateToEditAdvancedPermissions: function() {
      FormControllerUtility.showProgressBar(this.view);
      let self = this;
      this.saveChangesToAccountLevelPermissionsControllerObj();
      let param = {
        "flowType": "FROM_FIRST_FORM",
        "selectedCompanyAccountLevelPermissions": self.selectedCompanyAccountLevelPermissionsGlobal
      };
      applicationManager.getNavigationManager().navigateTo("frmAccountLevelFeaturePermissions", true, param);
    },

    onSelectFeature: function(index) {
      let segData = this.view.segTransactionLimits.data;
      if (segData[index].lblDropdown.text === "D") {
        segData[index].lblDropdown.text = "C";
        segData[index].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        segData[index].flxActions.isVisible = true;
        segData[index].lblCheckBoxText1.text = kony.i18n.getLocalizedString("i18n.UserManagement.default");
        segData[index].lblCheckBoxText1.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.UserManagement.default");
        this.updateFeatureActionsMapOnSelectingFeature(segData[index].featureId, 1);
        this.numberOfSelections["C"]++;
        this.numberOfSelections["D"]--;
      } else {
        this.numberOfSelections[segData[index].lblDropdown.text]--;
        segData[index].lblDropdown.text = "D";
        segData[index].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        segData[index].flxActions.isVisible = false;
        this.updateFeatureActionsMapOnSelectingFeature(segData[index].featureId, 0);
        this.numberOfSelections["D"]++;
      }
      this.setMainCheckbox();
      this.view.segTransactionLimits.setData(segData);
      this.showAccessPolicies();
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },

    updateFeatureActionsMapOnSelectingFeature(featureId, filler) {
      let refObj = this.featureActionsMap[this.selectedCIF][featureId];
      if (refObj["stats"]["enabledCount"] !== refObj["stats"]["totalCount"] * filler) {
        for (let policy in refObj["policies"]) {
          let rows = refObj["policies"][policy].selectedActions.length;
          let cols = refObj["policies"][policy].selectedActions[0].length;
          refObj["policies"][policy].selectedActions = new Array(rows).fill().map(() => new Array(cols).fill(filler));
          refObj["policies"][policy]["enabledCount"] = refObj["policies"][policy]["totalCount"] * filler;
        }
        refObj["stats"]["enabledCount"] = refObj["stats"]["totalCount"] * filler;
      }
    },

    updateFeatureActionsMapOnSelectingPolicy: function(featureId, policy, filler, index) {
      let self = this;
      if (this.featureActionsMapTemp === undefined) {
        this.featureActionsMapTemp = JSON.parse(JSON.stringify(this.featureActionsMap));
      }

      let refObj = this.featureActionsMapTemp[this.selectedCIF][featureId];
      let rows = refObj["policies"][policy].selectedActions.length;
      let cols = refObj["policies"][policy].selectedActions[0].length;
      refObj["policies"][policy].selectedActions = new Array(rows).fill().map(() => new Array(cols).fill(filler));
      refObj["policies"][policy]["enabledCount"] = refObj["policies"][policy]["totalCount"] * filler;

      let subSequentActionsSet = "dependentActions";
      if (filler === 0) {
        subSequentActionsSet = "dependencyActions";
      }
      refObj["policies"][policy][subSequentActionsSet].forEach(function(eachDepActionArr) {
        eachDepActionArr.forEach(function(eachDepAction) {
          if (self.actionAndPolicyMap[self.selectedCIF].hasOwnProperty(featureId + "::" + eachDepAction) && self.actionAndPolicyMap[self.selectedCIF][featureId + "::" + eachDepAction] !== policy) {
            let depPolicy = self.actionAndPolicyMap[self.selectedCIF][featureId + "::" + eachDepAction];
            let index = refObj["policies"][depPolicy].actions.indexOf(eachDepAction);
            let accountsTrackOfActionRef = refObj["policies"][depPolicy].selectedActions[index];
            let currSum = accountsTrackOfActionRef.reduce((a, b) => a + b, 0);
            refObj["policies"][depPolicy].selectedActions[index] = new Array(accountsTrackOfActionRef.length).fill(filler);
            refObj["policies"][depPolicy]["enabledCount"] += accountsTrackOfActionRef.length * filler - currSum;
          }
        });
      });
      let totalEnabledCount = 0;
      for (let eachPolicy in refObj["policies"]) {
        totalEnabledCount += refObj["policies"][eachPolicy]["enabledCount"];
      }
      refObj["stats"]["enabledCount"] = totalEnabledCount;
      self.onEditFeature(index, "useTempMap");
    },

    bulkSelectFeatures: function() {
      let self = this;
      let toSetIcon = "D",
          filler = 0;
      let bool = true;
      let compSegData = this.view.segCustomRoles.data;
      let companyPermissionType = kony.i18n.getLocalizedString("i18n.UserManagement.default");
      if (this.view.lblDropdown.text === "C" || this.view.lblDropdown.text === "y") {
        this.view.lblDropdown.text = "D";
        this.view.lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        bool = false;
        companyPermissionType = kony.i18n.getLocalizedString("i18n.UserManagement.custom");
      } else {
        this.view.lblDropdown.text = "C";
        this.view.lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        toSetIcon = "C";
        filler = 1;
      }

      compSegData[this.selectedCompanyIndex].lblPermision.text = companyPermissionType;
      compSegData[this.selectedCompanyIndex].lblPermision.accessibilityConfig.a11yLabel = companyPermissionType;
      this.selectedCompanyAccountLevelPermissionsGlobal.permissionType = companyPermissionType;
      this.view.segCustomRoles.setData(compSegData);

      let segData = this.view.segTransactionLimits.data;
      for (let key in this.numberOfSelections) {
        if (key === toSetIcon) {
          this.numberOfSelections[key] = segData.length;
        } else {
          this.numberOfSelections[key] = 0;
        }
      }
      segData.forEach(function(eachRow, index) {
        eachRow.lblDropdown.text = toSetIcon;
        eachRow.flxActions.isVisible = bool;
        self.updateFeatureActionsMapOnSelectingFeature(eachRow.featureId, filler);
        if (bool) {
          eachRow.lblCheckBoxText1.text = kony.i18n.getLocalizedString("i18n.UserManagement.default");
          eachRow.lblCheckBoxText1.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.UserManagement.default");
        }
      });
      this.view.segTransactionLimits.setData(segData);
      this.showAccessPolicies();
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },

    setMainCheckbox: function() {
      let companyPermissionType = kony.i18n.getLocalizedString("i18n.UserManagement.default");
      if (this.numberOfSelections["y"] > 0 || this.numberOfSelections["D"] * this.numberOfSelections["C"] !== 0) {
        this.view.lblDropdown.text = "y";
        this.view.lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected");
        companyPermissionType = kony.i18n.getLocalizedString("i18n.UserManagement.custom");
      } else if (this.numberOfSelections["D"] === 0) {
        this.view.lblDropdown.text = "C";
        this.view.lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
      } else {
        this.view.lblDropdown.text = "D";
        this.view.lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        companyPermissionType = kony.i18n.getLocalizedString("i18n.UserManagement.custom");
      }
      let segData = this.view.segCustomRoles.data;
      segData[this.selectedCompanyIndex].lblPermision.text = companyPermissionType;
      segData[this.selectedCompanyIndex].lblPermision.accessibilityConfig.a11yLabel = companyPermissionType;
      this.selectedCompanyAccountLevelPermissionsGlobal.permissionType = companyPermissionType;
      this.view.segCustomRoles.setData(segData);
    },

    saveChangesToAccountLevelPermissionsControllerObj: function() {
      let self = this;
      this.selectedCompanyAccountLevelPermissionsGlobal.accounts.forEach(function(eachAccount) {
        let j = self.accountsArr[self.selectedCIF].indexOf(eachAccount.accountId);
        eachAccount.featurePermissions.forEach(function(eachFeature) {
          let featureRefObject = self.featureActionsMap[self.selectedCIF][eachFeature.featureId];
          let featureBool = false;
          eachFeature.permissions.forEach(function(eachAction) {
            let i = featureRefObject.policies[self.actionAndPolicyMap[self.selectedCIF][eachFeature.featureId + "::" + eachAction.actionId]].actions.indexOf(eachAction.actionId);
            let actionBool = featureRefObject.policies[self.actionAndPolicyMap[self.selectedCIF][eachFeature.featureId + "::" + eachAction.actionId]].selectedActions[i][j] === 0 ? false : true;
            if(actionBool){
              featureBool = true;
            }
            eachAction.isEnabled = actionBool;
          });
          eachFeature.isEnabled = featureBool;
        });
      });
      console.log(this.accountLevelPermissions);
    }
  };
});
