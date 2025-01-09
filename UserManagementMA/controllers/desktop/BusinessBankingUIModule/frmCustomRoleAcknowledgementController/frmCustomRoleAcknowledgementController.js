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
      this.view.btnAckCreateUser.onClick =  function() {
        scopeObj.navToNextForm();  
      }; 	          
    },

        loadBusinessBankingModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
    },

    /**
         * Method will invoke on form pre show
         */
        preShow: function() {
            var self = this;
      this.view.customheadernew.forceCloseHamburger();
      //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User");          
      this.currentVisibleFlex = "flxUserDetails";
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
      //applicationManager.getNavigationManager().applyUpdates(this);
     /* applicationManager.getNavigationManager().updateForm({
        ackDetails: data,
      }, "frmCustomRoleAcknowledgement");   */

            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblContentHeader.setActive(true);
            }

            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;     
       
    },
    /**
         * Method will invoke on form post show
         */
        postShow: function() {
      this.onBreakpointChange();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
             this.view.CopylblBankName0d407e605ff1141.text=kony.i18n.getLocalizedString("i18n.konybb.Common.Role");
            applicationManager.getNavigationManager().applyUpdates(this);
            let businessBankingPresentationController = this.loadBusinessBankingModule().presentationController;
         	this.flowConfig = this.loadBusinessBankingModule().presentationController.getFlowConfigs();
          	this.userManagementFlow = this.flowConfig.userManagementFlow || '';
          	this.userNavigationType = this.flowConfig.userNavigationType || '';
          	let data;
          	if (this.flowConfig.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
              if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                var navManager = applicationManager.getNavigationManager();
                data = navManager.getCustomInfo('data', this.userManagementData);
              }
			 }
          	else if (this.flowConfig.userManagementFlow === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
              if (this.flowConfig.userNavigationType === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
                data = businessBankingPresentationController.getUserManagementData();
              }
			}     
            this.createCustomRoleSuccess = businessBankingPresentationController.createCustomRoleSuccess;
           // CommonUtilities.setText(this.view.Label0b79c81bee1114a, this.createCustomRoleSuccess.id, CommonUtilities.getaccessibilityConfig());
            this.view.Label0b79c81bee1114a.text = this.createCustomRoleSuccess.id;
            this.hideEditButtons();
            this.showCustomRoleDetails(data.customRoleDetails);
            this.showAccountAccess(data.companyList);
            this.showAccountLevelPermissions(data.accountLevelPermissions);
            this.showOtherFeaturePermissions(data.globalLevelPermissions);
            this.showTransactionLimits(data.transactionLimits);
           this.view.btnAckCreateUser.left = '75%';
            this.view.btnAckCreateUser.onClick = this.loadBusinessBankingModule().presentationController.navigateToUserRoles;
           //this.view.customheader.topmenu.flxMenu.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            //this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            //this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU ; 
            if (kony.os.deviceInfo().deviceWidth <= 1024 && kony.os.deviceInfo().deviceWidth > 680) {
                this.view.lblAutoAccessAccounts.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.AutoAccessAccounts");
            }
            
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                if (kony.os.deviceInfo().deviceWidth <= 1024 && kony.os.deviceInfo().deviceWidth > 680) {
                   // this.view.lblAutoAccessAccounts.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.AutoAccessAccounts");
                    this.view.flxReference.width = "44%";
                }
                else if(kony.os.deviceInfo().deviceWidth > 1024){
                    this.view.flxReference.width = "25%";
                }
             }  
          
    },    
    /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(viewModel) {
     /* if(viewModel.ackDetails){
        this.showPermissionDetails(viewModel.ackDetails);
      }*/
    }, 
        showCustomRoleDetails: function(data) {
            var scope = this;
            var formatUtilManager = applicationManager.getFormatUtilManager();
            var createdBy = !kony.sdk.isNullOrUndefined(scope.createCustomRoleSuccess.createdby) ? scope.createCustomRoleSuccess.createdby : "";
            var createdDate = !kony.sdk.isNullOrUndefined(scope.createCustomRoleSuccess.createdts) ? formatUtilManager.getFormattedCalendarDate(scope.createCustomRoleSuccess.createdts) : "";
            /*
            CommonUtilities.setText(this.view.lblCustomRoleNameValue, data.customRoleName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblContractValue, data.contractName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblCreatedByValue, createdBy, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblCreatedDateValue, createdDate, CommonUtilities.getaccessibilityConfig());
          CommonUtilities.setText(this.view.lblCreatedByLabel, kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy"), CommonUtilities.getaccessibilityConfig());
          CommonUtilities.setText(this.view.lblCreatedDateLabel, kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn"), CommonUtilities.getaccessibilityConfig());*/

            this.view.lblCustomRoleNameValue.text = data.customRoleName;
            this.view.lblContractValue.text = data.contractName;
            this.view.lblCreatedByValue.text = createdBy;
            this.view.lblCreatedDateValue.text = createdDate;
            this.view.lblCreatedByLabel.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy");
            this.view.lblCreatedDateLabel.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");

        },
        hideEditButtons: function() {
            this.view.btnEdit.isVisible = false;
            this.view.btnPermissionsEdit.isVisible = false;
            this.view.btnViewNEdit.isVisible = false;
            this.view.btnTransactionEdit.isVisible = false;
            this.view.btnAckBack.isVisible = false;
            this.view.btnAckCancel.isVisible = false;
        },
        /*,
         * Method to populate account access details
         * @param {JSON} data 
         **/
        showAccountAccess: function(companyList) {
            //CommonUtilities.setText(this.view.lblContractValue, companyList[0].contractName || '', CommonUtilities.getaccessibilityConfig());
            this.view.lblContractValue.text = companyList[0].contractName || '';
            var newCompanyList = [];
          this.view.segmentAccRole.widgetDataMap ={
                       "lblLeftSideContent": "lblLeftSideContent",
                    "lblRIghtSideContent": "lblRIghtSideContent",
                    "lblRightMostContent": "lblRightMostContent",
                    "lblRightContentAuto": "lblRightContentAuto",
                    "btnViewEdit":"btnViewEdit" //AC
                };
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
            let segRowData = newCompanyList.map(function(newCompanyList) {
                return {
                    "lblLeftSideContent": newCompanyList.companyName + " - " + newCompanyList.lastFourDigitOfCompanyId,
                    "lblRIghtSideContent": newCompanyList.userRole,
                    "lblRightMostContent": newCompanyList.selectedAccCount + "",
                     "lblRightContentAuto":(newCompanyList.autoSyncAccounts === "true")?"ON":"OFF",
                     "btnViewEdit": {
                        "isVisible": false
                     } //AC
                };
            });
            this.view.segmentAccRole.setData(segRowData);
        },
        /**
         * Method to populate Account Level Permissions
         * @param {JSON} data 
         **/
        showAccountLevelPermissions: function(accountLevelPermissions) {
            let self = this;
            let segRowData = accountLevelPermissions.map(function(accountLevelPermissionsPerCompany, index) {
                let result = self.getAccountLevelDetailsToShow(accountLevelPermissionsPerCompany);
                let lastFourDigitOfCompanyId = accountLevelPermissionsPerCompany.cif;
                if (lastFourDigitOfCompanyId.length > 4) {
                    lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
                }
                return {
                    "lblRecipient": {
                        "text": accountLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            "a11yLabel": accountLevelPermissionsPerCompany.companyName + " - " + lastFourDigitOfCompanyId,
                        }
                    },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segAccPermissionsSeg, index, "Account level permissions"),
                        "accessibilityConfig":{
                            "a11yLabel": `show more details about Account level permissions for account ${name} - ${lastFourDigitOfCompanyId}`,
                            "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
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
                let name = globalLevelPermissions.companyName ? globalLevelPermissions.companyName : globalLevelPermissions.coreCustomerName;
                return {
                    "lblRecipient": globalLevelPermissions.companyName + " - " + lastFourDigitOfCompanyId,
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segOtherFeaturePermissionsSegMain, index, "other feature permissions"),
                        "accessibilityConfig":{
                            "a11yLabel": `show more details about other feature permissions for account ${name} - ${lastFourDigitOfCompanyId}`,
                            "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
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
        showAccountLevelAccessDetails: function(selectedSegment, i, title) {

            let self = this;
            let segData = selectedSegment.data;
            let rowData = segData[i];
            let dc = ""
            if (rowData.lblDropdown === "O") {
                rowData.lblDropdown = "P";
                rowData.flxDetails.isVisible = true;
                dc = "hide"
            } else {
                rowData.lblDropdown = "O";
                rowData.flxDetails.isVisible = false;
                dc = "show more"
            }

            rowData.flxDropdown = {
                "onClick":self.showAccountLevelAccessDetails.bind(this, selectedSegment, i, title),
                "accessibilityConfig":{
                    "a11yLabel": `${dc} details about ${title} for account ${rowData.lblRecipient.text}`,
                    "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": rowData.flxDetails.isVisible
                    }
                }
            }
            
            selectedSegment.setDataAt(rowData, i);
            selectedSegment.setActive(i, -1, "flxUserManagementBBCopyBoldText.flxtransferActivityWrapper.flxUserManagementAccPermissions.flxSegBulkWireAckWrapper.flxDropdown");
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
                return {
                    "lblRecipient": {
                        "text": transactionLimits.companyName + " - " + lastFourDigitOfCompanyId,
                        "accessibilityConfig": {
                            "a11yLabel": transactionLimits.companyName + " - " + lastFourDigitOfCompanyId,
                        }
                    },
                    "lblDropdown": "O",
                    "flxDropdown": {
                        "onClick": self.showAccountLevelAccessDetails.bind(this, self.view.segTransactionLimitsMain, index, "Transaction Limits"),
                        "accessibilityConfig":{
                            "a11yLabel": `show more details about transaction limits for account ${name} - ${lastFourDigitOfCompanyId}`,
                            "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
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
                        "text":limitNames[0],
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
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[0]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[0]),
                        }
                    },
                    "lblTxtDailyTransactionLimits": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[1]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[1]),
                        }
                    },
                    "lblTxtWeeklyTransactionLimits": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[2]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[2]),
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
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[3]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[3]),
                        }
                    },
                    "lblDailyTransactionLimitValue": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[4]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[4]),
                        }
                    },
                    "lblWeeklyTransactionLimitValue1": {
                        "text": CommonUtilities.getDisplayCurrencyFormat(limits[5]),
                        "accessibilityConfig": {
                            "a11yLabel": CommonUtilities.getDisplayCurrencyFormat(limits[5])
                        }
                    },
                };
            });
            this.view.segTransactionLimitsMain.setData(segRowData);
            this.view.forceLayout();
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
        navToNextForm: function() {
      applicationManager.getNavigationManager().navigateTo("frmUserCreationSuccess");                    
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

  };
});
