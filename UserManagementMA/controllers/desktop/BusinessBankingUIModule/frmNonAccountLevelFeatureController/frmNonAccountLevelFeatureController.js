define( ['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmUserManagementController */ {
        /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
        adjustScreen: function() {
            this.view.forceLayout();
        },
      
      updateFormUI: function(viewModel) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.progressBar === true) {
            FormControllerUtility.showProgressBar(this.view);
          } else if (viewModel.progressBar === false) {
            FormControllerUtility.hideProgressBar(this.view);
          }
          if(viewModel.updateInfinityUserSuccess){
            this.navToAckAfterUpdate(viewModel.updateInfinityUserSuccess);
          }
        }
      },
        /**
         * Breakpont change
         */
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            var scope = this;
            this.resetUI();
            if (width <= 640 || orientationHandler.isMobile) {} else if (width <= 1024) {
                //for tablet
            } else if (width <= 1366) {
                //for desktop
            } else {
                //for hd desktop
            }
            if (kony.application.getCurrentBreakpoint() > 1400) {
                this.view.segRolePermissions.rowTemplate = "flxUserManagementFeaturePermissionsTablet"; //templatename for that breakpoint //  
            } else if (kony.application.getCurrentBreakpoint() <= 1400 && kony.application.getCurrentBreakpoint() > 1024) {
                this.view.segRolePermissions.rowTemplate = "flxUserManagementFeaturePermissionsTablet";
            } else if (kony.application.getCurrentBreakpoint() >= 768 && kony.application.getCurrentBreakpoint() <= 1024) {
                this.view.segRolePermissions.rowTemplate = "flxUserManagementNonAccountTablet";
            } else if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.segRolePermissions.rowTemplate = "flxUserManagementNonAccountTablet";
            }
            this.view.customheadernew.onBreakpointChangeComponent(width);
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.flxRoleRightContainer.skin = "bbFlxSeperatore3e3e3RightBorder";
                if (width <= 1024 || orientationHandler.isTablet) {
                    this.view.flxContent.left = "19dp";
                }
            }
            this.adjustScreen()
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
//             this.view.preShow = this.preShow;
//             this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.segCompanies.onRowClick = this.setSegCompaniesUI.bind(this);
            this.view.btnResetSegment.onClick = this.onResetClick.bind(this);
            this.view.btnBackAccessRoles.onClick = this.onCancelClick;
            CommonUtilities.disableButton(this.view.btnProceedRoles);
            this.view.btnProceedRoles.onClick = function() {
                scopeObj.navToNextForm();
              	applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
            };
            
          this.view.btnBackAccessRoles.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
          this.view.btnProceedRoles.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
          this.view.btnCancelRoles.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
        },
        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
        },
        /**
         *
         */
        setCompanies: function(data) {

        },
        setFeaturePermissions: function(data) {
            this.view.segRolePermissions.setData(data);
        },
      onNavigate: function(){
        this.onBreakpointChange();
        var navManager =  applicationManager.getNavigationManager();
        var flowValue = navManager.getCustomInfo('editUserFlow');
        if(flowValue === "editFlow")
          this.initObj = navManager.getCustomInfo('otherLevelPermissions');
        else
        this.initObj = this.loadBusinessBankingModule().presentationController.getUserManagementData().globalLevelPermissions;
        var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
        var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
        if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
          this.view.lblUserName.isVisible = false;
          this.view.lblEmail.isVisible = false;
          if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
            this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createRole_NonAccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
          } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
            this.view.customheadernew.activateMenu("User Management", "User Roles");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.view_EditRole_NonAccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
          }
        } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
          this.view.lblUserName.isVisible = true;
          this.view.lblEmail.isVisible = true;
          this.userDetails = this.loadBusinessBankingModule().presentationController.getUserManagementData().userDetails;
		  CommonUtilities.setText(this.view.lblUserName, this.userDetails.firstName + " " + this.userDetails.lastName, CommonUtilities.getaccessibilityConfig());
          CommonUtilities.setText(this.view.lblEmail, this.userDetails.email, CommonUtilities.getaccessibilityConfig());
          if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
            this.view.customheadernew.activateMenu("User Management", "Create UM User");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.createUser_NonAccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
          } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
            this.view.customheadernew.activateMenu("User Management", "All Users");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.UserManagement.view_EditUser_NonAccountLevelPermissions"), CommonUtilities.getaccessibilityConfig());
          }
        }
        this.imgArrowTransform = this.getImgTransformObj();
        this.setSegData(this.initObj);
      },
        /**
         * Method will invoke on form post show
         */
        postShow: function() {
            
        },
        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        },
        setSegData: function(initObj) {
            let globalLevelPermissions = initObj.filter(company => {
                if (company.hasOwnProperty('isEnabled')) {
                    if (company.isEnabled === true || company.isEnabled === 'true') return 1;
                    else return 0;
                } else return 1;
            });
            let segCompaniesData = [];
            let segFeaturesData = [];
            var self = this;
            this.changed = [];
            this.enabledFeatures = [];
            for (i in globalLevelPermissions) {
                let data = globalLevelPermissions[i];
              if(data.cif === undefined){
                data.cif = data.coreCustomerId;
              }
              if(data.companyName === undefined){
                data.companyName = data.coreCustomerName;
              }
                let companyRow = {},
                    companyName;
                if (kony.application.getCurrentBreakpoint() > 1024) {
                    if (data.companyName.length + data.cif.length > 39) {
                        companyName = data.companyName.substring(0, 36 - data.cif.length) + '...';
                    } else companyName = data.companyName;
                } else if (kony.application.getCurrentBreakpoint() <= 1024) {
                    if (data.companyName.length + data.cif.length > 24) {
                        companyName = data.companyName.substring(0, 22 - data.cif.length) + '...';
                    } else companyName = data.companyName;
                }
                companyRow["lbCompany"] = {
                    "text": companyName + "-" + data.cif,
                    "accessibilityConfig": {
                        "a11yLabel": companyName + "-" + data.cif
                    }
                };
                companyRow["imgArrow"] = {};
                companyRow["imgArrow"]["src"] = "arrowtest.png";
                companyRow["imgArrow"]["isVisible"] = false;
                companyRow["imgArrow"]["transform"] = self.imgArrowTransform;
                companyRow["cif"] = data.cif;

                let segData = [];
                let change = [],
                    features = [];
                for (var i = 0; i < data.features.length; i++) {
                    var row = {},
                        rowChange = [],
                        allOn = true,
                        allOff = true;
                    row["lblPermissionName"] = {
                        "text": data.features[i].featureName,
                        "accessibilityConfig": {
                            "a11yLabel": data.features[i].featureName
                        }
                    };
                    row["lblDescription"] = {
                        "text": data.features[i].featureDescription,
                        "accessibilityConfig": {
                            "a11yLabel": data.features[i].featureDescription
                        }
                    };
                    row["lblimgPermissions"] = {
                        "text": "D",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox Unchecked"
                        }
                    };
                    row["lbltooltip"] = {
                        "text": "i",
                        "toolTip": data.features[i].featureDescription,
                        "accessibilityConfig": {
                            "a11yLabel": "Tooltip"
                        }
                    };
                    for (var j = 0, k = 1; j < data.features[i].permissions.length; j++, k++) {
                        row["lblAction" + k] = {
                            "text": data.features[i].permissions[j].actionName,
                            "accessibilityConfig": {
                                "a11yLabel": data.features[i].permissions[j].actionName
                            }
                        };
                        row["flxAction" + k] = {
                            "isVisible": true
                        };
                        row["lblTickBox" + k] = data.features[i].permissions[j].isEnabled.toString() == 'true' ? {
                            "text": "C",
                            "accessibilityConfig": {
                                "a11yLabel": "Checkbox checked"
                            }
                        } : {
                            "text": "D",
                            "accessibilityConfig": {
                                "a11yLabel": "Checkbox Unchecked"
                            }
                        };
                        row["lblFeatureSeparator"] = {
                            "isVisible": true
                        };
                        row["lblSeperator0"] = {
                          "isVisible": false
                        };
                        if (data.features[i].permissions[j].dependentActions !== undefined) {
                            row["isDependentOn" + k] = data.features[i].permissions[j].dependentActions.split(',');
                            for (var l = 1; l < row["isDependentOn" + k].length - 1; l++) {
                                row["isDependentOn" + k][l] = row["isDependentOn" + k][l].trim();
                            }
                            row["isDependentOn" + k][0] = row["isDependentOn" + k][0].replace('[', '');
                            row["isDependentOn" + k][row["isDependentOn" + k].length - 1] = row["isDependentOn" + k][row["isDependentOn" + k].length - 1].replace(']', '');
                        } else {
                            row["isDependentOn" + k] = [];
                        }
                        row["id" + k] = data.features[i].permissions[j].actionId;
                        data.features[i].permissions[j].isEnabled.toString() == 'true' ? allOff = false : allOn = false;
                        rowChange.push(false);
                    }
                    if (allOff == true) {
                        row["lblimgPermissions"] = {
                            "text": "D",
                            "accessibilityConfig": {
                                "a11yLabel": "Checkbox unchecked"
                            }
                        };
                        features.push(false);
                    } else if (allOn == true) {
                        row["lblimgPermissions"] = {
                            "text": "C",
                            "accessibilityConfig": {
                                "a11yLabel": "Checkbox checked"
                            }
                        };
                        features.push(true);
                    } else {
                        row["lblimgPermissions"] = {
                            "text": "z",
                            "accessibilityConfig": {
                                "a11yLabel": "Checkbox partially checked"
                            }
                        };
                        features.push(false);
                    }
                    segData.push(row);

                    segData[0].lblSeperator0 = {
                        "isVisible": false
                    };
                    change.push(rowChange);
                }
                segCompaniesData.push(companyRow)
                segFeaturesData.push(segData);
                this.changed.push(change);
                this.enabledFeatures.push(features);
            }
            segCompaniesData[0].imgArrow.isVisible = true;
            segCompaniesData[0].imgArrow.transform = self.imgArrowTransform;
            for (var i = 0; i < this.enabledFeatures.length; i++) {
                for (var j = 0; j < this.enabledFeatures[i].length; j++) {
                    if (this.enabledFeatures[i][j] === false) {
                        segCompaniesData[i]["lblDescription"] = {
                            "text": kony.i18n.getLocalizedString("i18n.UserManagement.Custom"),
                            "accessibilityConfig": {
                                "a11yLabel": "Custom"
                            }
                        };
                        break;
                    }
                }
                if (j === this.enabledFeatures[i].length && this.enabledFeatures[i][j - 1] === true) {
                    segCompaniesData[i]["lblDescription"] = {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.AccountDefault"),
                        "accessibilityConfig": {
                            "a11yLabel": "Deafult"
                        }
                    };
                }
            }
            this.view.segCompanies.setData(segCompaniesData);
            this.view.segRolePermissions.setData(segFeaturesData[0]);
            this.baseData = JSON.parse(JSON.stringify(segFeaturesData));
            this.baseDynamicData = segFeaturesData;
            CommonUtilities.disableButton(this.view.btnProceedRoles);
            this.changesInOtherCompany = false;
            this.baseSegData = this.baseData[0];
            this.currCompIndex = 0;
            //this.setFeaturePermissions();
            FormControllerUtility.hideProgressBar(this.view);
        },
        getImgTransformObj: function() {
            var imgTransformObj = kony.ui.makeAffineTransform();
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
              imgTransformObj.rotate(180);
            } else {
              imgTransformObj.rotate(0);
            }
            return imgTransformObj;
       },
        evaluateCustomOrDefaultForCurrentCompany: function() {
            let data = this.view.segCompanies.data[this.currCompIndex];
            for (var j = 0; j < this.enabledFeatures[this.currCompIndex].length; j++) {
                if (this.enabledFeatures[this.currCompIndex][j] === false) {
                    data["lblDescription"] = {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.Custom"),
                        "accessibilityConfig": {
                            "a11yLabel": "Custom"
                        }
                    };
                    break;
                }
            }
            if (j === this.enabledFeatures[this.currCompIndex].length && this.enabledFeatures[this.currCompIndex][j - 1] === true) {
                data["lblDescription"] = {
                    "text": kony.i18n.getLocalizedString("i18n.UserManagement.AccountDefault"),
                    "accessibilityConfig": {
                        "a11yLabel": "Deafult"
                    }
                };
            }
            this.view.segCompanies.setDataAt(data, this.currCompIndex, 0);
        },
        selectOrUnselectEntireFeature: function(segdata) {
            let lblIndex = segdata.eventobject.id.slice(-1);
            let widget = "lblimgPermissions";
            let toggle, toggleAcc, changed = false;
            let data = this.view.segRolePermissions.data;
            if (data[segdata.context.rowIndex][widget].text == 'C') {
                data[segdata.context.rowIndex][widget].text = 'D';
                data[segdata.context.rowIndex][widget].accessibilityConfig.a11yLabel = "Checkbox Unchecked";
                toggle = 'D';
                toggleAcc = "Checkbox Unchecked";
                if (this.baseSegData[segdata.context.rowIndex][widget].text !== data[segdata.context.rowIndex][widget].text) changed = true;
                this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = false;
                this.evaluateCustomOrDefaultForCurrentCompany();
            } else if (data[segdata.context.rowIndex][widget].text == 'D' || data[segdata.context.rowIndex][widget].text == 'z') {
                data[segdata.context.rowIndex][widget].text = 'C';
                data[segdata.context.rowIndex][widget].accessibilityConfig.a11yLabel = "Checkbox checked";
                toggle = 'C';
                toggleAcc = "Checkbox checked";
                if (this.baseSegData[segdata.context.rowIndex][widget].text !== data[segdata.context.rowIndex][widget].text) changed = true;
                this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = true;
                this.evaluateCustomOrDefaultForCurrentCompany();
            }
            widget = "lblTickBox";
            for (i = 1; i < 21; i++) {
                var locWidget = widget + i.toString();
                if (data[segdata.context.rowIndex][locWidget] == undefined) break;
                data[segdata.context.rowIndex][locWidget].text = toggle;
                data[segdata.context.rowIndex][locWidget].accessibilityConfig.a11yLabel = toggleAcc;
                if (this.baseSegData[segdata.context.rowIndex][locWidget].text !== data[segdata.context.rowIndex][locWidget].text) changed = true;
            }
            this.view.segRolePermissions.setDataAt(data[segdata.context.rowIndex], segdata.context.rowIndex, 0);
            this.changed[this.currCompIndex][segdata.context.rowIndex] = changed;
            this.updateChangesInOtherCompany();
            this.changesInOtherCompany || changed ? CommonUtilities.enableButton(this.view.btnProceedRoles) : CommonUtilities.disableButton(this.view.btnProceedRoles);
        },
        selectOrUnselectParentFeature: function(segdata) {
            let lblIndex = segdata.eventobject.id.slice(-2);
            if (lblIndex[0].match(/[a-zA-Z]/i)) {
                lblIndex = lblIndex[1];
            }
            let widget = "lblTickBox" + lblIndex;
            let data = this.view.segRolePermissions.data,
                changed = false;
            if (data[segdata.context.rowIndex][widget].text == 'C') {
                data[segdata.context.rowIndex][widget].text = 'D';
                data[segdata.context.rowIndex][widget].accessibilityConfig.a11yLabel = "Checkbox Unchecked";
                if (this.baseSegData[segdata.context.rowIndex][widget].text !== data[segdata.context.rowIndex][widget].text) changed = true;
                let allOff = 'D',
                    allOn = 'C';
                for (i = 1; i < 21; i++) {
                    let locWidget = "lblTickBox" + i.toString();
                    if (data[segdata.context.rowIndex][locWidget] == undefined) break;
                    if (data[segdata.context.rowIndex]["isDependentOn" + i].includes(data[segdata.context.rowIndex]["id" + lblIndex])) {
                        data[segdata.context.rowIndex][locWidget].text = 'D';
                        data[segdata.context.rowIndex][locWidget].accessibilityConfig.a11yLabel = "Checkbox unchecked";
                    }
                    if (data[segdata.context.rowIndex][locWidget].text == 'C') {
                        allOff = 'C';
                    } else {
                        allOn = 'D';
                    }
                    if (this.baseSegData[segdata.context.rowIndex][locWidget].text !== data[segdata.context.rowIndex][locWidget].text) changed = true;
                }
                if (allOn == 'C') {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'C';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox checked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = true;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                } else if (allOff == 'D') {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'D';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox unchecked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = false;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                } else {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'z';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox partially checked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = false;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                }
                //write policyset logic here
            } else if (data[segdata.context.rowIndex][widget].text == 'D') {
                let allOn = 'C',
                    allOff = 'D';
                data[segdata.context.rowIndex][widget].text = 'C';
                data[segdata.context.rowIndex][widget].accessibilityConfig.a11yLabel = "Checkbox checked";
                if (this.baseSegData[segdata.context.rowIndex][widget].text !== data[segdata.context.rowIndex][widget].text) changed = true;
                for (i = 1; i < 21; i++) {
                    let locWidget = "lblTickBox" + i.toString();
                    if (data[segdata.context.rowIndex][locWidget] == undefined) break;
                    if (data[segdata.context.rowIndex]["isDependentOn" + lblIndex].includes(data[segdata.context.rowIndex]["id" + i])) {
                        data[segdata.context.rowIndex][locWidget].text = 'C';
                        data[segdata.context.rowIndex][locWidget].accessibilityConfig.a11yLabel = "Checkbox checked";
                    }
                    if (this.baseSegData[segdata.context.rowIndex][locWidget].text !== data[segdata.context.rowIndex][locWidget].text) changed = true;
                    if (data[segdata.context.rowIndex][locWidget].text == 'C') {
                        allOff = 'C';
                    } else allOn = 'D';
                }
                if (allOn == 'C') {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'C';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox checked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = true;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                } else if (allOff == 'D') {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'D';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox unchecked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = false;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                } else {
                    data[segdata.context.rowIndex]["lblimgPermissions"].text = 'z';
                    data[segdata.context.rowIndex]["lblimgPermissions"].accessibilityConfig.a11yLabel = "Checkbox partially checked";
                    this.enabledFeatures[this.currCompIndex][segdata.context.rowIndex] = false;
                    this.evaluateCustomOrDefaultForCurrentCompany();
                }
            }
            this.view.segRolePermissions.setDataAt(data[segdata.context.rowIndex], segdata.context.rowIndex, 0);
            this.changed[this.currCompIndex][segdata.context.rowIndex] = changed;
            this.updateChangesInOtherCompany();
            this.changesInOtherCompany || changed ? CommonUtilities.enableButton(this.view.btnProceedRoles) : CommonUtilities.disableButton(this.view.btnProceedRoles);
        },
        onInfoTouchStart: function(eventObj) {
            //var widget = "flxShowDescription";
            //var data = this.view.segRolePermissions.data;
            //data[eventObj.context.rowIndex][widget] = {
            //   "isVisible": true
            //};
            //this.view.segRolePermissions.setDataAt(data[eventObj.context.rowIndex],eventObj.context.rowIndex,0);
        },
        onInfoTouchEnd: function(eventObj) {
            //var widget = "flxShowDescription";
            //var data = this.view.segRolePermissions.data;
            //data[eventObj.context.rowIndex][widget] = {
            //    "isVisible": false
            //};
            //this.view.segRolePermissions.setDataAt(data[eventObj.context.rowIndex],eventObj.context.rowIndex,0);
        },
        updateChangesInOtherCompany: function() {
            this.changesInOtherCompany = false;
            for (let j in this.changed) {
                for (let i in this.changed[j]) {
                    if (this.changed[j][i] == true) {
                        this.changesInOtherCompany = true;
                        break;
                    }
                }
                if (this.changesInOtherCompany == true) break;
            }
        },
        setSegCompaniesUI: function() {
            let selectedRow = this.view.segCompanies.selectedRowIndex[1];
            let data = this.view.segCompanies.data;
            var self = this;
            for (i = 0; i < data.length; i++) {
                data[i]["imgArrow"]["isVisible"] = false;
                data[i]["imgArrow"]["transform"] = self.imgArrowTransform;
            }
            data[selectedRow]["imgArrow"]["isVisible"] = true;
            data[selectedRow]["imgArrow"]["transform"] = self.imgArrowTransform;
            this.view.segCompanies.setData(data);
            this.view.segRolePermissions.setData(this.baseDynamicData[selectedRow]);
            this.baseSegData = this.baseData[selectedRow];
            this.currCompIndex = selectedRow;
            this.updateChangesInOtherCompany();
            this.view.forceLayout();
        },
        updateChanges: function() {
            for (var k = 0; k < this.view.segCompanies.data.length; k++) {
                let currIndex;
                for (var i = 0; i < this.initObj.length; i++) {
                    if (this.view.segCompanies.data[k].cif === this.initObj[i].cif) {
                        currIndex = i;
                        break;
                    }
                }
                let data = this.baseDynamicData[k];
                for (var i = 0; i < data.length; i++) {
                    for (var j = 1; j < 21; j++) {
                        if (data[i]["lblTickBox" + j] == undefined) break;
                        this.initObj[currIndex].features[i].permissions[j - 1].isEnabled = data[i]["lblTickBox" + j].text == 'C' ? true : false;
                    }
                }
            }
            this.loadBusinessBankingModule().presentationController.setGlobalLevelPermissionsFromUserManagement(this.initObj);
        },
        navToNextForm: function() {
            this.updateChanges();
            this.loadBusinessBankingModule().presentationController.setIsEditFlow(false);
        let navManager = applicationManager.getNavigationManager();
        FormControllerUtility.showProgressBar(this.view);
        var skipFlow = navManager.getCustomInfo('createSkipFlow');
        var editType = navManager.getCustomInfo('EditType');
        if(skipFlow !== "createSkipFlow"){
         if(editType==="userEdit"){
          this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"globalLevel");
        }
        else if(editType === "roleEdit"){
        this.loadBusinessBankingModule().presentationController.updateCustomRole(this.loadBusinessBankingModule().presentationController.userManagementData,"globalLevel");
        }
        }
        else{
            this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
        }
        //this.loadBusinessBankingModule().presentationController.updateInfinityUser(this.loadBusinessBankingModule().presentationController.userManagementData,"globalLevel");
        
            //CommonUtilities.showProgressBar();
        },
      
      navToAckAfterUpdate : function(updateSuccessData){
        let navManager = applicationManager.getNavigationManager();
        var skipFlow = navManager.getCustomInfo('createSkipFlow');
        navManager.setCustomInfo("updateSuccessData",updateSuccessData);
        if(skipFlow !== "createSkipFlow"){
          navManager.setCustomInfo('editUserFlow',"editFlow");
          navManager.setCustomInfo('getInfinityUser',"false");
          //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
          this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
          FormControllerUtility.showProgressBar(this.view);
        }
        else{
          this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
          FormControllerUtility.showProgressBar(this.view);
        }
      },
        setIndividualCompanyData: function(data) {
            let segdata = [];
            let change = [],
                feature = [];
            for (var i = 0; i < data.features.length; i++) {
                var row = {},
                    rowChange = [],
                    allOn = true,
                    allOff = true;
                row["lblPermissionName"] = {
                    "text": data.features[i].featureName,
                    "accessibilityConfig": {
                        "a11yLabel": data.features[i].featureName
                    }
                };
                row["lblDescription"] = {
                    "text": data.features[i].featureDescription,
                    "accessibilityConfig": {
                        "a11yLabel": data.features[i].featureDescription
                    }
                };
                row["lblimgPermissions"] = {
                    "text": "D",
                    "accessibilityConfig": {
                        "a11yLabel": "Checkbox Unchecked"
                    }
                };
                row["lbltooltip"] = {
                    "text": "i",
                    "toolTip": data.features[i].featureDescription,
                    "accessibilityConfig": {
                        "a11yLabel": "Tooltip"
                    }
                };
                for (var j = 0, k = 1; j < data.features[i].permissions.length; j++, k++) {

                    let diff = false
                    row["lblAction" + k] = {
                        "text": data.features[i].permissions[j].actionName,
                        "accessibilityConfig": {
                            "a11yLabel": data.features[i].permissions[j].actionName
                        }
                    };
                    row["flxAction" + k] = {
                        "isVisible": true
                    };
                    row["lblTickBox" + k] = data.features[i].permissions[j].isEnabled.toString() == 'true' ? {
                        "text": "C",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox checked"
                        }
                    } : {
                        "text": "D",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox Unchecked"
                        }
                    };
                    row["lblFeatureSeparator"] = {
                        "isVisible": true
                    };
                    row["lblSeperator0"] = {
                      "isVisible": false
                    };
                    if (data.features[i].permissions[j].dependentActions !== undefined) {
                        row["isDependentOn" + k] = data.features[i].permissions[j].dependentActions.split(',');
                        for (var l = 1; l < row["isDependentOn" + k].length - 1; l++) {
                            row["isDependentOn" + k][l] = row["isDependentOn" + k][l].trim();
                        }
                        row["isDependentOn" + k][0] = row["isDependentOn" + k][0].replace('[', '');
                        row["isDependentOn" + k][row["isDependentOn" + k].length - 1] = row["isDependentOn" + k][row["isDependentOn" + k].length - 1].replace(']', '');
                    } else {
                        row["isDependentOn" + k] = [];
                    }
                    row["id" + k] = data.features[i].permissions[j].actionId;
                    data.features[i].permissions[j].isEnabled.toString() == 'true' ? allOff = false : allOn = false;
                    if (this.baseSegData[i]["lblTickBox" + k].text !== row["lblTickBox" + k].text) diff = true;
                    rowChange.push(diff);
                }
                if (allOff == true) {
                    row["lblimgPermissions"] = {
                        "text": "D",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox unchecked"
                        }
                    };
                    feature.push(false);
                } else if (allOn == true) {
                    row["lblimgPermissions"] = {
                        "text": "C",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox checked"
                        }
                    };
                    feature.push(true);
                } else {
                    row["lblimgPermissions"] = {
                        "text": "z",
                        "accessibilityConfig": {
                            "a11yLabel": "Checkbox partially checked"
                        }
                    };
                    feature.push(true);
                }
                segdata.push(row);
                segdata[0].lblSeperator0 = {
                    "isVisible": false
                };
                change.push(rowChange);

            }
            this.enabledFeatures[this.currCompIndex] = feature;
            this.evaluateCustomOrDefaultForCurrentCompany();
            this.view.segRolePermissions.setData(segdata);
            this.baseDynamicData[this.currCompIndex] = segdata;
            this.changed[this.currCompIndex] = change;
            this.updateChangesInOtherCompany();
            this.changesInOtherCompany ? CommonUtilities.enableButton(this.view.btnProceedRoles) : CommonUtilities.disableButton(this.view.btnProceedRoles);
        },
        onResetClick: function() {
            FormControllerUtility.showProgressBar(this.view);
            let cif = this.view.segCompanies.data[this.currCompIndex].cif;
            let data = this.loadBusinessBankingModule().presentationController.getGlobalLevelPermissionsFromInitUserManagement(cif);
            this.setIndividualCompanyData(data);
            FormControllerUtility.hideProgressBar(this.view);

        },
        onCancelClick: function() {
            var flowType = this.loadBusinessBankingModule().presentationController.getIsEditFlow();
            if (flowType === true) {
              //kony.application.showLoadingScreen();
              //var navManager =  applicationManager.getNavigationManager();
              //navManager.setCustomInfo('editUserFlow',"editFlow");
              //navManager.setCustomInfo('getInfinityUser',"false");
                this.loadBusinessBankingModule().presentationController.navigateToConfirmationScreen();
            } else {
                this.loadBusinessBankingModule().presentationController.navigateToUMDashboard();
            }
        },
    };
});