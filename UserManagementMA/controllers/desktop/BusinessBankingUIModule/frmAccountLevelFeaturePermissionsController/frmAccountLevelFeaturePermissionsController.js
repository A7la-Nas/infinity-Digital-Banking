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
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.btnProceedRoles.onClick = this.navToNextForm;
      this.view.btnCancelRoles.onClick = this.cancelAndNavigateToNextForm;
      this.view.Search.txtSearch.onTextChange = function() {
        scopeObj.searchAccounts(scopeObj.view.Search.txtSearch.text);
      };
      this.view.Search.flxClearBtn.onClick = function() {
        scopeObj.view.Search.txtSearch.text = "";
        scopeObj.searchAccounts(scopeObj.view.Search.txtSearch.text);
        scopeObj.view.Search.txtSearch.setActive(true);
      };
      // this.view.flxStatus.onClick = function() {
      //   if (scopeObj.view.lblLoan2.text === "L") {
      //     scopeObj.view.lblLoan2.text = "M";
      //     scopeObj.view.lblLoan2.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.RadioButtonOn");
      //     scopeObj.viewOnlySelectedOnClick();
      //   } else {
      //     scopeObj.view.lblLoan2.text = "L";
      //     scopeObj.view.lblLoan2.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.RadioButtonOff");
      //     scopeObj.reloadAccounts();
      //   }
      // };
      this.view.btnApply.onClick = this.bulkUpdate;
      this.view.btnViewNEdit.onClick = this.resetToDefault;
      this.view.flxAccountsRightContainer1.onKeyPress = this.onKeyPressCallBack;
      this.view.flxAccountsRightContainer2.onKeyPress = this.onKeyPressCallBack;
      this.view.flxSubPermissionType.onKeyPress = this.onKeyPressCallBack;
    },

    /**
         * Method will invoke on form pre show
         */
    preShow: function() {
      this.view.customheadernew.forceCloseHamburger();
      //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User"); 
      var scope = this;
      this.view.toggleSwitch.selectedIndex = 1;
      this.view.flxStatus.onClick = function() {
        if (scope.view.lblToggleSwitch.text === "m") {
          scope.view.lblToggleSwitch.text = "n";
          scope.view.lblToggleSwitch.skin = "skn727272fonticons";
        }
        else {
          scope.view.lblToggleSwitch.text = "m";
          scope.view.lblToggleSwitch.skin = "sknfonticontoggleON45px";
        }
        scope.toggleSwitchAlerts();
      };
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblContentHeader.setActive(true);
    };
      this.currentVisibleFlex = "flxUserDetails";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
    },

    /**
         * Method will invoke on Navigate
         */
    onNavigate: function(param) {
      if (param.hasOwnProperty("flowType") && param.flowType === "FROM_FIRST_FORM") {
        this.accountLevelPermissions = JSON.parse(JSON.stringify(param.selectedCompanyAccountLevelPermissions));
        this.accountLevelPermissionsUnTouched = JSON.parse(JSON.stringify(param.selectedCompanyAccountLevelPermissions));
        this.updateButtonToShow = false;
      }
      if (param.hasOwnProperty("flowType") && param.flowType === "FROM_THIRD_FORM") {
        var jpath = "accounts,accountId=" + param.userObj.accountId;
        //data = JSON.parse(JSON.stringify(param.userObj));
        this.accountLevelPermissions = CommonUtilities.updateObjectFromPath(this.accountLevelPermissions, jpath, param.userObj);
        this.accountLevelPermissionsUnTouched = CommonUtilities.updateObjectFromPath(this.accountLevelPermissionsUnTouched, jpath, param.userObj);
      }
      this.updateButtonToShow ? FormControllerUtility.enableButton(this.view.btnProceedRoles) : FormControllerUtility.disableButton(this.view.btnProceedRoles);
      this.setUIForCompany();
    },





    /**
         * Method will invoke on form post show
         */
    postShow: function() {
      var flowType = this.getBusinessBankingPresentation().getUserManagementFlow();
      var createOrEditFlow = this.getBusinessBankingPresentation().getUserNavigationType();
      if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
        this.view.lblName.isVisible = false;
        this.view.lblEmail.isVisible = false;
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createRole_AccountLevelPermissions");
        } else {
          this.view.customheadernew.activateMenu("User Management", "User Roles");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.view_EditRole_AccountLevelPermissions");
        }
      } else {
        let userDetails = this.getBusinessBankingPresentation().getUserDetails();
        this.view.lblName.isVisible = true;
        this.view.lblEmail.isVisible = true;
        this.view.lblName.text = userDetails.firstName + " " + userDetails.lastName; 
        this.view.lblEmail.text = userDetails.email;
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.activateMenu("User Management", "Create UM User");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.createUser_AccountLevelPermissions");
        } else {
          this.view.customheadernew.activateMenu("User Management", "All Users");
          this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.UserManagement.view_EditUser_AccountLevelPermissions");
        }
      }
      this.setAccessibility();
      this.onBreakpointChange();
    },
    setAccessibility: function () {
      this.view.flxAccountsRightContainer1.accessibilityConfig = {
        "a11yARIA": {
          "aria-autocomplete": "list",
          "aria-controls": "CopycompanyListAllFeatures",
          "aria-expanded": false,
          "aria-required": true,
          "role": "combobox"
        },
        "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
      },
        this.view.flxAccountsRightContainer2.accessibilityConfig = {
          "a11yARIA": {
            "aria-autocomplete": "list",
            "aria-controls": "companyListAllFeatures2",
            "aria-expanded": false,
            "aria-required": true,
            "role": "combobox"
          },
          "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
        },
        this.view.flxSubPermissionType.accessibilityConfig = {
          "a11yARIA": {
            "aria-autocomplete": "list",
            "aria-controls": "companyListAllFeatures3",
            "aria-expanded": false,
            "aria-required": true,
            "role": "combobox"
          },
          "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
        }

    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      if (eventObject.id === "flxAccountsRightContainer1") {
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
          this.view.CopycompanyListAllFeatures.isVisible = false;
          this.view.lblImgDropdown1.text = "O";
          this.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
          }
        }
      } else if (eventObject.id === "flxAccountsRightContainer2") {
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
          this.view.companyListAllFeatures2.isVisible = false;
          this.view.lblImgDropdown2.text = "O";
          this.view.flxAccountsRightContainer2.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures2",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
          }
        }
      } else {
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
          this.view.companyListAllFeatures3.isVisible = false;
          this.view.lblImgDropdown3.text = "O";
          this.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
        }
      }
    },
    onSegKeyPressCallack: function (eventObject, eventPayload, context) {
      if (context.widgetInfo.id === "segAccountListActions1") {
        var data = this.view.segAccountListActions1.data;
        if (eventPayload.keyCode === 27) {
          this.view.CopycompanyListAllFeatures.isVisible = false;
          this.view.lblImgDropdown1.text = "O";
          this.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
          }
          this.view.flxAccountsRightContainer1.setActive(true);
        }
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey && context.rowIndex === 0 && context.sectionIndex === 0) {
          this.view.CopycompanyListAllFeatures.isVisible = false;
          this.view.lblImgDropdown1.text = "O";
          this.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
          }
          eventPayload.preventDefault();
          this.view.flxAccountsRightContainer1.setActive(true);
        }
        if (eventPayload.keyCode === 9 && !eventPayload.shiftKey && context.rowIndex === data.length - 1 && context.sectionIndex === 0) {
          this.view.CopycompanyListAllFeatures.isVisible = false;
          this.view.lblImgDropdown1.text = "O";
          this.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
          }
        }
      } else if (context.widgetInfo.id === "segAccountListActions2") {
        var data = this.view.segAccountListActions2.data;
        if (eventPayload.keyCode === 27) {
          this.view.companyListAllFeatures2.isVisible = false;
          this.view.lblImgDropdown2.text = "O";
          this.view.flxAccountsRightContainer2.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures2",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions." 
          }
          this.view.flxAccountsRightContainer2.setActive(true);
        }
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey && context.rowIndex === 0 && context.sectionIndex === 0) {
          this.view.companyListAllFeatures2.isVisible = false;
          this.view.lblImgDropdown2.text = "O";
          this.view.flxAccountsRightContainer2.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures2",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
          }
          eventPayload.preventDefault();
          this.view.flxAccountsRightContainer2.setActive(true);
        }
        if (eventPayload.keyCode === 9 && !eventPayload.shiftKey && context.rowIndex === data[0][1].length - 1 && context.sectionIndex === 0) {
          this.view.companyListAllFeatures2.isVisible = false;
          this.view.lblImgDropdown2.text = "O";
          this.view.flxAccountsRightContainer2.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures2",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
          }
        }
      } else {
        var data = this.view.segAccountListActions3.data;
        if (eventPayload.keyCode === 27) {
          this.view.companyListAllFeatures3.isVisible = false;
          this.view.lblImgDropdown3.text = "O";
          this.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
          this.view.flxSubPermissionType.setActive(true);
        }
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey && context.rowIndex === 0 && context.sectionIndex === 0) {
          this.view.companyListAllFeatures3.isVisible = false;
          this.view.lblImgDropdown3.text = "O";
          this.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
          eventPayload.preventDefault();
          this.view.flxSubPermissionType.setActive(true);
        }
        if (eventPayload.keyCode === 9 && !eventPayload.shiftKey && context.rowIndex === data.length - 1 && context.sectionIndex === 0) {
          this.view.companyListAllFeatures3.isVisible = false;
          this.view.lblImgDropdown3.text = "O";
          this.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
        }
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
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      } else {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
      }

    },
    navToNextForm: function() {
		var bussBankingPC = this.getBusinessBankingPresentation();
		bussBankingPC.setAccountLevelPermissionsByCompany(this.accountLevelPermissions.cif, this.accountLevelPermissions);
		bussBankingPC.generateTransactionLimits(JSON.parse(JSON.stringify(bussBankingPC.userManagementData.accountLevelPermissions)));
		let self = this;
		let params = {
			"flowType": "FROM_SECOND_FORM",
			"accountLevelPermissions": self.accountLevelPermissions
		};
		applicationManager.getNavigationManager().navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/frmFeaturePermissions"}, true, params);
	},

    cancelAndNavigateToNextForm: function() {
      let self = this;
      let params = {
        "flowType": "FROM_SECOND_FORM",
        "accountLevelPermissions": self.accountLevelPermissionsUnTouched
      };
      applicationManager.getNavigationManager().navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/frmFeaturePermissions"}, true, params);
    },

    populateAccounts: function() {
      //Dividing accounts by account type
      let accountTypeMap = {};
      for (let i = 0; i < this.accountLevelPermissions.accounts.length; i++) {
        if (!accountTypeMap.hasOwnProperty(this.accountLevelPermissions.accounts[i].accountType)) {
          accountTypeMap[this.accountLevelPermissions.accounts[i].accountType] = [];
        }
        accountTypeMap[this.accountLevelPermissions.accounts[i].accountType].push(this.accountLevelPermissions.accounts[i]);
      }

      this.accountTypeMap = accountTypeMap;
      this.totalAccountsCount = this.accountLevelPermissions.accounts.length;
      this.selectedAccountsCount = 0;
      this.isSelectedAccountMap = {};

      //Populating accounts segment
      let segData = [];
      let self = this;
      let index = -1;
      this.sortOrder = "ASC";
      for (let accountType in accountTypeMap) {
        this.isSelectedAccountMap[accountType] = 0;
        index += 1;
        let accountTypeRow = [];
        let segHeader = {
          "totalAccounts": accountTypeMap[accountType].length,
          "selectedAccounts": 0,
          "lblRecipientName": {
            "text": accountType,
            "accessibilityConfig": {
              "a11yLabel": accountType
            }
          },
          "lblAccountsSelectedNo": {
            "text": "0" + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + accountTypeMap[accountType].length
          },
          "flxSortMakeTransfers": {
            "isVisible": true
          },
          "CopyimgSortAccountLevel": {
            "src": "sorting.png"
          },
          "CopylblIcon0e1936ef51c5147": {
            "text": "O"
          },
          "imgSortAccountName": {
            "src": "sorting.png"
          },
          "flxImgSortFeatures": {
            "isVisible": false
          },
          "imgSortPermissionType": {
            "src": "sorting.png"
          },
          "lblAccountLevel": {
            "text": kony.i18n.getLocalizedString("i18n.UserManagement.editAccountLevel")
          },
          "flxAccountname": {
            "width": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "32%" : "43%"
          },
          "lblAccountname": {
            "text": kony.i18n.getLocalizedString("i18n.transfers.accountName")
          },
          "lblAccountsSelected": {
            "text": kony.i18n.getLocalizedString("konybb.i18n.AccountsSelected")
          },
          "lblDropDownIcon": {
            "text": "P"
          },
          "flxActions": {
            "accessibilityConfig": {
              "a11yARIA": {
                  "aria-expanded": true,
                  "role": "button"
              },
              "a11yLabel": "Hide list of " + accountType + " accounts"
          },
            "onClick": self.onDropdownClick.bind(this, index)
          },
          "flxFeaturesPermission": {
            "width": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "25%" : "19%"
          },
          "lblFeaturesPermission": {
            "text": kony.i18n.getLocalizedString("i18n.UserManagement.featurePermission")
          },
          "lblIcon": {
            "text": "s"
          },
          "flxPermissionType": {
            "width": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "22%" : "18%"
          },
          "lblPermissionType": {
            "text": kony.i18n.getLocalizedString("i18n.UserManagement.PermissionsType")
          },
          "lblSeparator": {
            "text": ""
          },
          "lblDropdown": {
            "text": "D"
          },
          "flxDropdown": {
            "accessibilityConfig": {
              "a11yARIA": {
                "aria-checked": false,
                "role": "checkbox"
              },
              "a11yLabel": "Select All " + accountType + " accounts"
            },
            "onClick": self.bulkSelectAccounts.bind(this, index)
          },
          "flxImgAccSort": {
            "onClick": self.sortAccounts.bind(this, index, "accountName"),
            "isVisible": false
          },
          "flxImgSortPermission": {
            "onClick": self.sortAccounts.bind(this, index, "permissionType"),
            "isVisible": false
          }
        }
        let segRow = self.getAccountsSegRowData(accountTypeMap[accountType], index);
        accountTypeRow.push(segHeader);
        accountTypeRow.push(segRow);

        segData.push(accountTypeRow);
      }
      this.accountsSegData = segData;

      this.view.flxSearch.isVisible = true;
      this.view.flxSegment.isVisible = true;
      this.view.segmentFileTransactions.setData(segData);
      CommonUtilities.setText(this.view.lblNoAccountsSelected, this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount, CommonUtilities.getaccessibilityConfig());
    },

    onDropdownClick: function(index) {
      let segData = this.view.segmentFileTransactions.data;
      var rowIndex = this.view.segmentFileTransactions.selectedRowIndex[1];
      if (segData[index][0].lblDropDownIcon.text === "O") {
        segData[index][0].lblDropDownIcon.text = "P";
        segData[index][0].flxSortMakeTransfers.isVisible = true;
        //         let searchString = this.view.Search.txtSearch.text;
        //         let accountsSearchResult = CommonUtilities.sortAndSearchJSON(this.accountTypeMap[segData[index][0].lblRecipientName.text], null, null, "accountName,accountId", searchString);
        //         if(accountsSearchResult !== -1 && accountsSearchResult !== null && accountsSearchResult !== undefined && accountsSearchResult.length != 0){
        //           segData[index][1] = this.getAccountsSegRowData(accountsSearchResult, index);
        //         }
        //         else{
        //           segData[index][1] = this.accountsSegData[index][1];
        //         }
        segData[index][1].forEach(function(row) {
          row.flxUserManagementSelectBulkTransactionLimits = {
            "isVisible": true
          };
        });
        segData[index][0].flxActions.accessibilityConfig = {
          "a11yARIA": {
            "aria-expanded": true,
            "role": "button"
          },
          "a11yLabel": "Hide list of " + segData[index][0].lblRecipientName.text + " accounts"
        }
      } else {
        segData[index][0].lblDropDownIcon.text = "O";
        segData[index][0].flxSortMakeTransfers.isVisible = false;
        //segData[index][1] = [];
        segData[index][1].forEach(function(row) {
          row.flxUserManagementSelectBulkTransactionLimits = {
            "isVisible": false
          };
        });
        segData[index][0].flxActions.accessibilityConfig = {
          "a11yARIA": {
            "aria-expanded": false,
            "role": "button"
          },
          "a11yLabel": "Show list of " + segData[index][0].lblRecipientName.text + " accounts"
        }
      }
      this.view.segmentFileTransactions.setData(segData);
      this.view.segmentFileTransactions.setActive(rowIndex, index, "flxUserManagementSelectBulkTransactionLimitsMain.flxGroup.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxActions");
      if (this.view.lblLoan2.text === "M") {
        this.viewOnlySelectedOnClick();
      }
    },

    selectAccount: function(index, rowIndex) {
      let segData = this.view.segmentFileTransactions.data;
      if (segData[index][1][rowIndex].lblDropdownRowICon.text === 'D') {
        segData[index][1][rowIndex].lblDropdownRowICon.text = 'C';
        segData[index][1][rowIndex].lblDropdownRowICon.skin = "sknlblDelete20px";
        segData[index][0].selectedAccounts += 1;
        this.selectedAccountsCount += 1;
        this.isSelectedAccountMap[segData[index][0].lblRecipientName.text] += 1;
        CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
        this.isSelectedAccountMap[segData[index][1][rowIndex].accountId] = true;
        segData[index][1][rowIndex].flxDropdownRow.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "role": "checkbox"
          },
          "a11yLabel": segData[index][1][rowIndex].lblRecipientNameRow.text
        }
      } else {
        segData[index][1][rowIndex].lblDropdownRowICon.text = 'D';
        segData[index][1][rowIndex].lblDropdownRowICon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
        segData[index][0].selectedAccounts -= 1;
        this.selectedAccountsCount -= 1;
        this.isSelectedAccountMap[segData[index][0].lblRecipientName.text] -= 1;
        CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
        
        this.isSelectedAccountMap[segData[index][1][rowIndex].accountId] = false;
        segData[index][1][rowIndex].flxDropdownRow.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "role": "checkbox"
          },
          "a11yLabel": segData[index][1][rowIndex].lblRecipientNameRow.text
        }
      }
      if (segData[index][0].selectedAccounts == segData[index][0].totalAccounts) {
        segData[index][0].lblDropdown.text = "C";
        segData[index][0].flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "role": "checkbox"
          },
          "a11yLabel": "Select All " + segData[index][0].lblRecipientName.text + " accounts"
        }
      } else if (segData[index][0].selectedAccounts == 0) {
        segData[index][0].lblDropdown.text = "D";
        segData[index][0].flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "role": "checkbox"
          },
          "a11yLabel": "Select All " + segData[index][0].lblRecipientName.text + " accounts"
        }
      } else {
        segData[index][0].lblDropdown.text = "z";
        segData[index][0].flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": "mixed",
            "role": "checkbox"
          },
          "a11yLabel": "Select All " + segData[index][0].lblRecipientName.text + " accounts"
        }
      }

      this.view.segmentFileTransactions.setData(segData);
      this.view.segmentFileTransactions.setActive(rowIndex, index, "flxUserManagementSelectBulkTransactionLimits.flxGroup.segBWTEditRecipientFileUnselectedWrapperRow.flxWrapper.flxRow.flxDropdownRow");
      this.view.lblNoAccountsSelected.text = this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount;
      if (this.view.lblLoan2.text === "M") {
        this.viewOnlySelectedOnClick();
      }
    },

    setUIForCompany: function() {
      let self = this;
      this.view.Search.txtSearch.text = "";
      this.view.lblLoan2.text = "L";
      this.view.lblLoan2.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.RadioButtonOff");
      FormControllerUtility.disableButton(this.view.btnApply);
      this.populateAccounts();
      //FormControllerUtility.enableButton(this.view.btnProceedRoles);

      let lastFourDigitOfCompanyId = this.accountLevelPermissions.cif;
      if (lastFourDigitOfCompanyId.length > 4) {
        lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
      }
      CommonUtilities.setText(this.view.lblCompanyName, this.accountLevelPermissions.companyName + " - " + lastFourDigitOfCompanyId, CommonUtilities.getaccessibilityConfig());

      //Features
      this.dependentActions = {};
      let featuresRowData = this.accountLevelPermissions.accounts[0].featurePermissions.map(function(features) {
        return {
          "flxRowDefaultAccounts": {
            "accessibilityConfig": {
              "a11yARIA": {
                "tabindex": 0
              }
            },
            "onKeyPress": self.onSegKeyPressCallack
          },
          "lblDefaultAccountName": {
            "text": features.featureName
          },
          "featureId": features.featureId,
          "lblDefaultAccountIcon": {
            "accessibilityConfig": {
              "a11yARIA": {
                "tabindex": -1
              },
              "a11yHidden": true
            },
            "isVisible": false
          }
        }
      });
      this.view.segAccountListActions1.setData(featuresRowData);
      this.view.lblShowAllFeatures.text = kony.i18n.getLocalizedString("i18n.common.none");
      this.view.lblShowAllFeatures2.text = kony.i18n.getLocalizedString("i18n.common.none");
      this.view.lblShowAllFeatures3.text = kony.i18n.getLocalizedString("i18n.common.none");
      this.view.flxAccountsRightContainer1.accessibilityConfig = {
        "a11yARIA": {
          "aria-autocomplete": "list",
          "aria-controls": "CopycompanyListAllFeatures",
          "aria-expanded": false,
          "aria-required": true,
          "role": "combobox"
        },
        "a11yLabel": "Features dropdown: currently selected " + this.view.lblShowAllFeatures.text + "Click to show list of features."
      }
      this.view.flxAccountsRightContainer2.accessibilityConfig = {
        "a11yARIA": {
          "aria-autocomplete": "list",
          "aria-controls": "companyListAllFeatures2",
          "aria-expanded": false,
          "aria-required": true,
          "role": "combobox"
        },
        "a11yLabel": "Actions Dropdown. Currently selected " + this.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
      }
      this.view.flxSubPermissionType.accessibilityConfig = {
        "a11yARIA": {
          "aria-autocomplete": "list",
          "aria-controls": "companyListAllFeatures3",
          "aria-expanded": false,
          "aria-required": true,
          "role": "combobox"
        },
        "a11yLabel": "Permissions Dropdown. Currently selected " + this.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
      }
      this.view.flxAccountsRightContainer1.onClick = function() {
        if (self.view.CopycompanyListAllFeatures.isVisible) {
          self.view.CopycompanyListAllFeatures.isVisible = false;
          self.view.lblImgDropdown1.text = "O";
          self.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + self.view.lblShowAllFeatures.text + "Click to show list of features."
          }
        }
        else {
          self.view.CopycompanyListAllFeatures.isVisible = true;
          self.view.lblImgDropdown1.text = "P";
          self.view.flxAccountsRightContainer1.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "CopycompanyListAllFeatures",
              "aria-expanded": true,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Features dropdown: currently selected " + self.view.lblShowAllFeatures.text + "Click to show list of features."
          }
        }
      };
      this.view.segAccountListActions1.onRowClick = function() {
        let index = self.view.segAccountListActions1.selectedRowIndex[1];
        let rowData = self.view.segAccountListActions1.data;
        let selectedFeature = rowData[index].lblDefaultAccountName.text;
        self.view.lblShowAllFeatures.text = selectedFeature;
        self.view.CopycompanyListAllFeatures.isVisible = false;
        self.view.lblImgDropdown1.text = "O";
        self.view.lblShowAllFeatures2.text = kony.i18n.getLocalizedString("i18n.common.none");
        self.generateDependentActions(index);

        let actionsHeaderData = {
          "totalActionsCount": self.accountLevelPermissions.accounts[0].featurePermissions[index].permissions.length,
          "selectedActionsCount": 0,
          "lastSelectedAction": "",
          "featureId": rowData[index].featureId,
          "flxTransfersFromListHeader": {
            "isVisible": false
          }
        };
        let actionsRowData = self.accountLevelPermissions.accounts[0].featurePermissions[index].permissions.map(function(actions) {
          return {
            "flxRowDefaultAccounts": {
              "accessibilityConfig": {
                "a11yARIA": {
                  "aria-checked": false,
                  "role": "checkbox",
                  "tabindex": 0
                },
                "a11yLabel": actions.actionName
              },
              "onKeyPress": self.onSegKeyPressCallack
            },
            "lblDefaultAccountName": {
              "text": actions.actionName
            },
            "actionId": actions.actionId,
            "lblDefaultAccountIcon": {
              "text": "D"
            }
          }
        });
        self.view.segAccountListActions2.setData([
          [actionsHeaderData, actionsRowData]
        ]);
        self.view.flxAccountsRightContainer1.accessibilityConfig = {
          "a11yARIA": {
            "aria-autocomplete": "list",
            "aria-controls": "CopycompanyListAllFeatures",
            "aria-expanded": false,
            "aria-required": true,
            "role": "combobox"
          },
          "a11yLabel": "Features dropdown: currently selected " + self.view.lblShowAllFeatures.text + "Click to show list of features."
        }
        self.view.flxAccountsRightContainer1.setActive(true);
        if (self.view.lblShowAllFeatures3.text !== kony.i18n.getLocalizedString("i18n.common.none") && self.view.lblShowAllFeatures2.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
          FormControllerUtility.enableButton(self.view.btnApply);
        } else {
          FormControllerUtility.disableButton(self.view.btnApply);
        }

      };

      //Actions
      this.view.flxAccountsRightContainer2.onClick = function() {
        if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
          if (self.view.companyListAllFeatures2.isVisible) {
            self.view.companyListAllFeatures2.isVisible = false;
            self.view.lblImgDropdown2.text = "O";
            self.view.flxAccountsRightContainer2.accessibilityConfig = {
              "a11yARIA": {
                "aria-autocomplete": "list",
                "aria-controls": "companyListAllFeatures2",
                "aria-expanded": false,
                "aria-required": true,
                "role": "combobox"
              },
              "a11yLabel": "Actions Dropdown. Currently selected " + self.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
            }
            let actionsSegData = self.view.segAccountListActions2.data;
            if (actionsSegData[0][0].selectedActionsCount === 1) {
              self.view.lblShowAllFeatures2.text = actionsSegData[0][0].lastSelectedAction;
            } else {
              self.view.lblShowAllFeatures2.text = kony.i18n.getLocalizedString("i18n.UserManagement.selected") + actionsSegData[0][0].selectedActionsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + actionsSegData[0][0].totalActionsCount;
            }
            if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none") && self.view.lblShowAllFeatures3.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
              FormControllerUtility.enableButton(self.view.btnApply);
            } else {
              FormControllerUtility.disableButton(self.view.btnApply);
            }
          } else {
            self.view.companyListAllFeatures2.isVisible = true;
            self.view.lblImgDropdown2.text = "P";
            self.view.flxAccountsRightContainer2.accessibilityConfig = {
              "a11yARIA": {
                "aria-autocomplete": "list",
                "aria-controls": "companyListAllFeatures2",
                "aria-expanded": true,
                "aria-required": true,
                "role": "combobox"
              },
              "a11yLabel": "Actions Dropdown. Currently selected " + self.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
            }
          }
        }
      };

      this.view.segAccountListActions2.onRowClick = function() {
        let index = self.view.segAccountListActions2.selectedRowIndex[1];
        let segData = self.view.segAccountListActions2.data;
        let selectedAction = segData[0][1][index].actionId;
        self.view.companyListAllFeatures2.isVisible = false;
        self.view.lblImgDropdown2.text = "O";

        let toSetIcon = "D",
            adder = -1,
            depIndex = 1,
            toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        if (segData[0][1][index].lblDefaultAccountIcon.text === "D") {
          toSetIcon = "C";
          toSetA11y = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
          adder = +1;
          depIndex = 0;
        }
        let oneSelectedAction = "";
        segData[0][1].forEach(function(eachAction) {
          if (eachAction.lblDefaultAccountIcon.text !== toSetIcon) {
            if (eachAction.actionId === selectedAction || self.dependentActions[segData[0][0].featureId][selectedAction][depIndex].indexOf(eachAction.actionId) >= 0) {
              eachAction.lblDefaultAccountIcon.text = toSetIcon;
              if (toSetIcon === "C"){
                eachAction.flxRowDefaultAccounts.accessibilityConfig = {
                  "a11yARIA": {
                    "aria-checked": true,
                    "role": "checkbox",
                    "tabindex": 0
                  },
                  "a11yLabel": eachAction.lblDefaultAccountName.text
                }
              } else {
                eachAction.flxRowDefaultAccounts.accessibilityConfig = {
                  "a11yARIA": {
                    "aria-checked": false,
                    "role": "checkbox",
                    "tabindex": 0
                  },
                  "a11yLabel": eachAction.lblDefaultAccountName.text
                }
              }
              segData[0][0].selectedActionsCount += adder;
            }
          }
          if (eachAction.lblDefaultAccountIcon.text === "C") {
            oneSelectedAction = eachAction.lblDefaultAccountName.text;
          }
        });
        if (segData[0][0].selectedActionsCount === 1) {
          segData[0][0].lastSelectedAction = oneSelectedAction;
          self.view.lblShowAllFeatures2.text = oneSelectedAction;
        } else {
          self.view.lblShowAllFeatures2.text = kony.i18n.getLocalizedString("i18n.UserManagement.selected") + segData[0][0].selectedActionsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[0][0].totalActionsCount;
        }
        self.view.segAccountListActions2.setData(segData);
        self.view.flxAccountsRightContainer2.accessibilityConfig = {
          "a11yARIA": {
            "aria-autocomplete": "list",
            "aria-controls": "companyListAllFeatures2",
            "aria-expanded": false,
            "aria-required": true,
            "role": "combobox"
          },
          "a11yLabel": "Actions Dropdown. Currently selected " + self.view.lblShowAllFeatures2.text + " actions. Click to show list of actions."
        }
        self.view.flxAccountsRightContainer2.setActive(true);
      };

      //Permissions

      let permissionsArr = [kony.i18n.getLocalizedString("i18n.Alerts.Enable"), kony.i18n.getLocalizedString("i18n.UserManagement.disable")];
      let permissionsSegData = permissionsArr.map(function(permission) {
        return {
          "flxRowDefaultAccounts": {
            "accessibilityConfig": {
              "a11yARIA": {
                "role": "button",
                "tabindex": 0
              }
            },
            "onKeyPress": self.onSegKeyPressCallack
          },
          "lblDefaultAccountName": {
            "text": permission
          },
          "lblDefaultAccountIcon": {
            "isVisible": false
          }
        }
      });
      this.view.segAccountListActions3.setData(permissionsSegData);

      this.view.flxSubPermissionType.onClick = function() {
        if(self.view.companyListAllFeatures3.isVisible){
          self.view.companyListAllFeatures3.isVisible = false;
          self.view.lblImgDropdown3.text = "O";
          self.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": false,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + self.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
        }
        else {
          self.view.companyListAllFeatures3.isVisible = true;
          self.view.lblImgDropdown3.text = "P";
          self.view.flxSubPermissionType.accessibilityConfig = {
            "a11yARIA": {
              "aria-autocomplete": "list",
              "aria-controls": "companyListAllFeatures3",
              "aria-expanded": true,
              "aria-required": true,
              "role": "combobox"
            },
            "a11yLabel": "Permissions Dropdown. Currently selected " + self.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
          }
        }
      };
      this.view.segAccountListActions3.onRowClick = function() {
        let index = self.view.segAccountListActions3.selectedRowIndex[1];
        let rowData = self.view.segAccountListActions3.data;
        self.view.lblShowAllFeatures3.text = rowData[index].lblDefaultAccountName.text;
        self.view.segAccountListActions3.setData(rowData);
        self.view.companyListAllFeatures3.isVisible = false;
        self.view.lblImgDropdown3.text = "O";
        if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none") && self.view.lblShowAllFeatures2.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
          FormControllerUtility.enableButton(self.view.btnApply);
        } else {
          FormControllerUtility.disableButton(self.view.btnApply);
        }
        self.view.flxSubPermissionType.accessibilityConfig = {
          "a11yARIA": {
            "aria-autocomplete": "list",
            "aria-controls": "companyListAllFeatures3",
            "aria-expanded": false,
            "aria-required": true,
            "role": "combobox"
          },
          "a11yLabel": "Permissions Dropdown. Currently selected " + self.view.lblShowAllFeatures3.text + " permissions. Click to show list of permissions."
        }
        self.view.flxSubPermissionType.setActive(true);
      };
      FormControllerUtility.hideProgressBar(this.view);
    },

    parseDepActions: function(dependentActionsString) {
      //console.log(dependentActionsString);
      return dependentActionsString.substr(1, dependentActionsString.length - 2).split(",").map(eachStr => eachStr.trim());
    },

    generateDependentActions: function(index) {
      let self = this;
      let featureId = this.accountLevelPermissions.accounts[0].featurePermissions[index].featureId;
      if (!(this.dependentActions.hasOwnProperty(featureId))) {
        this.dependentActions[featureId] = {};
        this.accountLevelPermissions.accounts[0].featurePermissions[index].permissions.map(function(action) {
          self.dependentActions[featureId][action.actionId] = [action.dependentActions === undefined ? [] : self.parseDepActions(action.dependentActions), []];
        });

        for (let actionId in self.dependentActions[featureId]) {
          self.dependentActions[featureId][actionId][0].forEach(function(depAction) {
            if (self.dependentActions[featureId].hasOwnProperty(depAction)) {
              self.dependentActions[featureId][depAction][1].push(actionId);
            }
          });
        }
      }
    },
    sortAccounts: function(index, sortParam) {
      let self = this;
      var rowIndex = this.view.segmentFileTransactions.selectedRowIndex[1];
      if (this.sortOrder === "ASC") {
        this.sortOrder = "DESC";
      } else {
        this.sortOrder = "ASC";
      }
      let segData = this.accountsSegData;
      //sortField,sortType,searchParams,searchString
      let accountsSortResult = CommonUtilities.sortAndSearchJSON(self.accountTypeMap[segData[index][0].lblRecipientName.text], sortParam, this.sortOrder, "accountName,accountId", this.view.Search.txtSearch.text);
      if (accountsSortResult !== -1 && accountsSortResult !== null && accountsSortResult !== undefined && accountsSortResult.length != 0) {
        segData[index][1] = self.getAccountsSegRowData(accountsSortResult, index);
        this.view.segmentFileTransactions.setData([]);
        this.view.segmentFileTransactions.setData(segData);
        if (sortParam === "accountName") {
          this.view.segmentFileTransactions.setActive(rowIndex, index, "flxUserManagementSelectBulkTransactionLimitsMain.flxGroup.segBWTEditRecipientFileUnselectedWrapper.flxSortMakeTransfers.flxAccountname.flxImgAccSort");
        } else {
          this.view.segmentFileTransactions.setActive(rowIndex, index, "flxUserManagementSelectBulkTransactionLimitsMain.flxGroup.segBWTEditRecipientFileUnselectedWrapper.flxSortMakeTransfers.flxPermissionType.flxImgSortPermission");
        }
        if (this.view.lblLoan2.text === "M") {
          this.viewOnlySelectedOnClick();
        }
      }
    },
    toggleSwitchAlerts: function() {
      var switchSegData = [];
      var index = [];
      var excludeIndex = [];
      var switchIndex = "";
      this.view.lblToggleSwitch.text === "m" ? switchIndex = 0 : switchIndex = 1;
      if (switchIndex === 0) {
        var segDataSwitch = this.view.segmentFileTransactions.data;
        for (var s = 0; s < segDataSwitch.length; s++) {
          segDataSwitch[s][1].forEach(function(data) {
            if (data.lblDropdownRowICon.text === "C") {
              switchSegData.push(data);
              index.push({
                "index": s
              });
            } else {
              if (!excludeIndex.includes(s)) {
                excludeIndex.push(s);
              }
            }
          });
        }
        var segmentForSwitch = [];
        for (var i = 0; i < switchSegData.length; i++) {
          segmentForSwitch.push(Object.assign(switchSegData[i], index[i]));
        }
        var result = segmentForSwitch.reduce(function(r, a) {
          r[a.index] = r[a.index] || [];
          r[a.index].push(a);
          return r;
        }, Object.create(null));
        var scope = this;
        var values = Object.values(result);
        values.forEach(function(item) {
          item.forEach(function(data) {
            delete data.index;
          });
        });
        var indexValues = [];
        var keys = Object.keys(result);
        excludeIndex.forEach(function(item) {
          if (!keys.includes(item.toString())) {
            indexValues.push(item.toString());
          }
        });
        var segData = this.view.segmentFileTransactions.data;
        for (var i = 0; i < keys.length; i++) {
          segData[i].pop();
          segData[i].push(values[i]);
          //scope.view.segmentFileTransactions.setData(segData);
        }
        for (var i = indexValues.length - 1; i >= 0; i--) {
          segData.splice(indexValues[i], 1);
        }
        scope.view.segmentFileTransactions.setData(segData);
        scope.view.flxStatus.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "role": "checkbox",
          },
          "a11yLabel": "View only selected accounts"
        }
      } else {
        //this.addOnlySectionHeaders(this.getSectionHeadersMonetaryFeaturesReadOnly());
        this.populateAccounts();
        this.view.flxStatus.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "role": "checkbox"
          },
          "a11yLabel": "View only selected accounts"
        }
      }
    },

    searchAccounts: function(searchString) {
      if (searchString === "") {
        this.view.Search.flxClearBtn.isVisible = false;
      } else {
        this.view.Search.flxClearBtn.isVisible = true;
      }
      let self = this;
      let searchSegData = [];
      let index = -1;
      this.accountsSegData.forEach(function(eachRow, i) {
        //sortField,sortType,searchParams,searchString
        let accountsSearchResult = CommonUtilities.sortAndSearchJSON(self.accountTypeMap[eachRow[0].lblRecipientName.text], null, null, "accountName,accountId", searchString);
        if (accountsSearchResult !== -1 && accountsSearchResult !== null && accountsSearchResult !== undefined && accountsSearchResult.length != 0) {
          index++;
          let segRow = self.getAccountsSegRowData(accountsSearchResult, index);
          eachRow[0].flxSortMakeTransfers.isVisible = true;
          eachRow[0].lblDropDownIcon.text = "P";
          //eachRow[0].lblDropDownIcon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.dropdownOpen");
          eachRow[0].selectedAccounts = self.isSelectedAccountMap[eachRow[0].lblRecipientName.text];
          eachRow[0].flxDropdown.onClick = self.bulkSelectAccounts.bind(this, index);
          eachRow[0].flxActions.onClick = self.onDropdownClick.bind(this, index);
          CommonUtilities.setText(eachRow[0].lblAccountsSelectedNo, eachRow[0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + eachRow[0].totalAccounts, CommonUtilities.getaccessibilityConfig());
          searchSegData.push([eachRow[0], segRow]);
        }
      });

      if (searchSegData.length === 0) {
        this.view.NoTransactions.isVisible = true;
        this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.onlineHelp.noSearchResults");
      } else {
        this.view.NoTransactions.isVisible = false;
      }
      this.view.segmentFileTransactions.setData(searchSegData);
      if (this.view.lblLoan2.text === "M") {
        this.viewOnlySelectedOnClick();
      }
    },

    setPermissionTypeToAccountsData: function(accountType, accountId, permissionType) {
      this.accountTypeMap[accountType].forEach(function(account) {
        if (account.accountId === accountId) {
          account.permissionType = permissionType;
        }
      });

    },
    getAccountsSegRowData: function(accounts, index) {
      let self = this;
      let segRow = accounts.map(function(account, rowIndex) {
        account.Id = account.accountId;
        account.accountNumber = account.accountId;

        let isSelected = false;
        if (account.accountId in self.isSelectedAccountMap) {
          isSelected = self.isSelectedAccountMap[account.accountId];
        } else {
          self.isSelectedAccountMap[account.accountId] = false;
          isSelected = false;
        }

        let totalPermissions = 0;
        let selectedPermissions = 0;
        account.featurePermissions.forEach(function(featurePermission) {
          totalPermissions += featurePermission.permissions.length;
          featurePermission.permissions.forEach(function(permission) {
            if (permission.isEnabled) {
              selectedPermissions++;
            }
          });
        });
        let permissionType = selectedPermissions === totalPermissions ? kony.i18n.getLocalizedString("i18n.UserManagement.default") : kony.i18n.getLocalizedString("i18n.UserManagement.custom");
        self.setPermissionTypeToAccountsData(account.accountType, account.accountId, permissionType);

        return {
          "lblActions": {
            "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
            "accessibilityConfig": {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.Edit")
            }
          },
          "flxActionsRow": {
            "accessibilityConfig": {
              "a11yARIA": {
                "role": "link"
              },
              "a11yLabel": "Edit account level feature permissions for " + CommonUtilities.getAccountDisplayName(account)
            },
            "onClick": self.editAccountLevel.bind(this, index, rowIndex)
          },
          "lblBankName": {
            "text": permissionType,
            "accessibilityConfig": {
              "a11yLabel": permissionType
            }
          },
          "lblDropdownRowICon": {
            "text": isSelected ? "C" : "D"
          },
          "flxDropdownRow": {
            "accessibilityConfig": {
              "a11yARIA": {
                "aria-checked": false,
                "role": "checkbox"
              },
              "a11yLabel": CommonUtilities.getAccountDisplayName(account)
            },
            "onClick": self.selectAccount.bind(this, index, rowIndex)
          },
          "lblIcon": {
            "text": "s"
          },
          "lblRecipientNameRow": {
            "text": CommonUtilities.getAccountDisplayName(account),
            "accessibilityConfig": {
              "a11yLabel": CommonUtilities.getAccountDisplayName(account),
            }
          },
          "lblSeparator": {
            "text": ""
          },
          "lblTransactionsType": {
            "text": selectedPermissions + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + totalPermissions,
            "accessibilityConfig": {
              "a11yLabel": selectedPermissions + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + totalPermissions,
            }
          },
          "accountId": account.accountId,
          "flxUserManagementSelectBulkTransactionLimits": {
            "isVisible": true
          }
        }
      });
      return segRow;
    },

    viewOnlySelectedOnClick: function() {
      let self = this;
      let segData = this.view.segmentFileTransactions.data;
      let selectedOnlySegData = [];;
      segData.forEach(function(eachAccountType, index) {
        let j = 0;
        eachAccountType[1].forEach(function(eachAccount) {
          if (eachAccount.lblDropdownRowICon.text === "C") {
            j += 1;
          } else {
            eachAccount.flxUserManagementSelectBulkTransactionLimits = {
              "isVisible": false
            };
          }
        });
        if (j === 0) {
          eachAccountType[0].lblDropDownIcon.text = "O";
          eachAccountType[0].lblDropDownIcon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.dropdownClose");
          eachAccountType[0].flxSortMakeTransfers.isVisible = false;
        }
      });
      this.view.segmentFileTransactions.setData(segData);
    },

    bulkSelectAccounts: function(index) {
      let self = this;
      let segData = this.view.segmentFileTransactions.data;
      var rowIndex = this.view.segmentFileTransactions.selectedRowIndex[1];
      if (segData[index][0].lblDropdown.text === "C" || segData[index][0].lblDropdown.text === "z") {
        segData[index][0].lblDropdown.text = "D"
        self.selectedAccountsCount -= segData[index][0].selectedAccounts;
        segData[index][0].selectedAccounts = 0;
        self.isSelectedAccountMap[segData[index][0].lblRecipientName.text] = 0;
        CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
        segData[index][1].forEach(function(eachRow) {
          eachRow.lblDropdownRowICon.text = 'D';
          eachRow.lblDropdownRowICon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
          self.isSelectedAccountMap[eachRow.accountId] = false;
          eachRow.flxDropdownRow.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": false,
              "role": "checkbox"
            },
            "a11yLabel": eachRow.lblRecipientNameRow.text
          }
        });
        segData[index][0].flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "role": "checkbox"
          },
          "a11yLabel": "Select All " + segData[index][0].lblRecipientName.text + " accounts"
        }
      } else {
        segData[index][0].lblDropdown.text = "C";
        self.selectedAccountsCount += segData[index][0].totalAccounts - segData[index][0].selectedAccounts;
        segData[index][0].selectedAccounts = segData[index][0].totalAccounts;
        self.isSelectedAccountMap[segData[index][0].lblRecipientName.text] = segData[index][0].totalAccounts;
        CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
        segData[index][1].forEach(function(eachRow) {
          eachRow.lblDropdownRowICon.text = 'C';
          eachRow.lblDropdownRowICon.skin = "sknlblDelete20px";
          self.isSelectedAccountMap[eachRow.accountId] = true;
          eachRow.flxDropdownRow.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": true,
              "role": "checkbox"
            },
            "a11yLabel": eachRow.lblRecipientNameRow.text
          }
        });
        segData[index][0].flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "role": "checkbox"
          },
          "a11yLabel": "Select All " + segData[index][0].lblRecipientName.text + " accounts"
        }
      }
      CommonUtilities.setText(this.view.lblNoAccountsSelected, this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount, CommonUtilities.getaccessibilityConfig());
      this.view.segmentFileTransactions.setData(segData);
      this.view.segmentFileTransactions.setActive(rowIndex, index, "flxUserManagementSelectBulkTransactionLimitsMain.flxGroup.segBWTEditRecipientFileUnselectedWrapper.flxWrapper.flxRow.flxDropdown");
      if (this.view.lblLoan2.text === "M") {
        this.viewOnlySelectedOnClick();
      }

    },

    bulkUpdate: function() {
      let self = this;
      let selectedFeature = this.view.lblShowAllFeatures.text;
      let selectedActions = [];
      let actionsSegData = this.view.segAccountListActions2.data;
      actionsSegData[0][1].forEach(function(eachRow) {
        if (eachRow.lblDefaultAccountIcon.text === "C") {
          selectedActions.push(eachRow.actionId);
        }
      });
      let bool = this.view.lblShowAllFeatures3.text === kony.i18n.getLocalizedString("i18n.Alerts.Enable") ? true : false;

      this.accountLevelPermissions.accounts.forEach(function(account) {
        if (self.isSelectedAccountMap[account.accountId] == true) {
          account.featurePermissions.forEach(function(eachFeature) {
            if (eachFeature.featureName === selectedFeature) {
              eachFeature.permissions.forEach(function(action) {
                if (selectedActions.indexOf(action.actionId) >= 0) {
                  action.isEnabled = bool;
                }
              });
            }
          });
        }
      });
      this.reloadAccounts();
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
    },

    reloadAccounts: function() {
      let segData = [];
      let self = this;
      let index = -1;
      let existingData = this.view.segmentFileTransactions.data;
      for (let accountType in this.accountTypeMap) {
        //this.isSelectedAccountMap[accountType] = this.accountTypeMap[accountType].length;
        index += 1;
        let accountTypeRow = [];
        let segHeader = existingData[index][0];
        segHeader.lblDropDownIcon.text = "P";
        segHeader.flxSortMakeTransfers.isVisible = true;
        let segRow = self.getAccountsSegRowData(this.accountTypeMap[accountType], index);
        accountTypeRow.push(segHeader);
        accountTypeRow.push(segRow);

        segData.push(accountTypeRow);
      }
      this.view.segmentFileTransactions.setData(segData);
    },

    getBusinessBankingPresentation() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule").presentationController;
    },

    editAccountLevel: function(index, rowIndex) {
      FormControllerUtility.showProgressBar(this.view);
      let self = this;
      let segData = this.view.segmentFileTransactions.data;
      let params = {
        "companyId": self.accountLevelPermissions.cif,
        "companyName": self.accountLevelPermissions.companyName,
        "accountId": segData[index][1][rowIndex].accountId,
        "userManagementData": {
          "accountLevelPermissions": [self.accountLevelPermissions]
        }
      }
      applicationManager.getNavigationManager().navigateTo({"appName" : "UserManagementMA", "friendlyName" : "BusinessBankingUIModule/frmAccountLevelFeature"}, true, params);
    },

    resetToDefault: function() {
      this.accountLevelPermissions = this.getBusinessBankingPresentation().getAccountLevelPermissionsInitByCompany(this.accountLevelPermissions.cif);
      this.updateButtonToShow = true;
      FormControllerUtility.enableButton(this.view.btnProceedRoles);
      this.setUIForCompany();
    }
  };
});