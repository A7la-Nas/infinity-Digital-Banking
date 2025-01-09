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
        onBreakpointChange: function(width) {},
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
            this.view.btnProceedRoles.onClick = function() {
                scopeObj.navToNextForm();
            };
        },
        /**
         * Method will invoke on form pre show
         */
        preShow: function() {
          var scope = this;
          this.view.tbxDenyLimit.text = "";
          this.view.tbxPreApproveLimit.text = "";
          this.view.lblErrorMessage.setVisibility(false);
          // this.configManager = applicationManager.getConfigurationManager();
          var navManager = applicationManager.getNavigationManager();
          this.currencyCode = navManager.getCustomInfo('userCurrency');
          this.view.flxPreApproveContainer.lblDollar.text = this.currencyCode;
          this.view.flxDenyContainer.lblDollar2.text = this.currencyCode;
          this.view.tbxDenyLimit.onTextChange = this.enableDisableApplyBtn;
          this.view.tbxPreApproveLimit.onTextChange = this.enableDisableApplyBtn;
          this.view.btnApply.toolTip=kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
          this.view.lblViewOnlySelected.toolTip=kony.i18n.getLocalizedString("i18n.bulkwires.viewonlyselected");
          this.view.btnProceedRoles.toolTip=kony.i18n.getLocalizedString("i18n.userManagement.Continue");
          this.view.btnCancelRoles.toolTip=kony.i18n.getLocalizedString("kony.tab.common.Cancel");
          this.transactionLimits = [];
          this.transactionLimitsMaster = this.loadBusinessBankingModule().getTransactionLimitsFromUserManagement();
          this.transactionLimitsMaster.forEach(function(item) {
            if (item.companyName === scope.selectedCompany) {
              scope.transactionLimits.push(item);
            }
          });
          
            this.view.customheadernew.forceCloseHamburger();
            //this.view.customheadernew.customhamburger.activateMenu("User Management","Create A User");          
            this.currentVisibleFlex = "flxUserDetails";
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);
            this.view.MobileCustomDropdown.width = "100%";
            this.view.MobileCustomDropdownTransaction.flxDropdown.top = "100%";
            this.view.Search.top = "51dp";
            this._ExpandedSection = -1;
            this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.onClick = function() {
                scope.setDropdownVisiblility();
            }.bind(this);
            this.view.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
                scope.setFeatureDropdownVisiblility();
            }.bind(this);
            //var data = this.loadBusinessBankingModule().getUserDetails();
//             var middleName;
//             if (!kony.sdk.isNullOrUndefined(data.middleName)) {
//                 middleName = data.middleName;
//             } else {
//                 middleName = "";
//             }
//             var name = data.firstName + " " + middleName + " " + data.lastName;
//             this.view.lblUserName.text = name;
//             this.view.lblEmail.text = data.email;
            
            this.view.toggleSwitch.selectedIndex = 1;
            this.view.toggleSwitch.onSlide = function() {
                scope.toggleSwitchAlerts();
            };
            this.view.btnViewNEdit.onClick = function() {
                scope.resetToDefault();
            };
            this.segData = this.view.segmentFileTransactions.data;
            
            this.view.btnCancelRoles.onClick = function() {
                scope.goBackFunction();
            };
          this.view.Search.txtSearch.onTextChange = function() {
            scope.searchAccounts(scope.view.Search.txtSearch.text);
          };
          this.view.Search.flxClearBtn.onClick = function() {
            scope.view.Search.txtSearch.text = "";
            scope.searchAccounts(scope.view.Search.txtSearch.text);
          };
          this.setUIForCompany();
          this.view.btnApply.onClick = this.bulkUpdate;
          this.view.btnProceedRoles.onClick = this.navToNextForm;
          FormControllerUtility.disableButton(this.view.btnProceedRoles);

        },
      navToNextForm: function() {
        let self = this;
        for(var i = 0; i < this.transactionLimitsMaster.length ; i++){
          if(self.transactionLimitsMaster[i].companyName === self.transactionLimits[0].companyName){
            self.transactionLimitsMaster.splice(i,1,self.transactionLimits[0]);
          }
        }
        this.loadBusinessBankingModule().setTransactionLimitsFromUserManagement(self.transactionLimitsMaster);

        let params = {
          //"flowType": "FROM_SECOND_FORM",
          "accountLevelPermissions": self.accountLevelPermissions
        };
        //applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck", true, params);
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");

      },
   
      reloadAccounts: function() {
        let segData = [];
        let self = this;
        let index = -1;
        let existingData = this.view.segmentFileTransactions.data;
        for (let accountType in this.accountTypeMap) {
          this.isSelectedAccountMap[accountType] = this.accountTypeMap[accountType].length;
          index += 1;
          let accountTypeRow = [];
          let segHeader = existingData[index][0];
          let segRow = self.getAccountsSegRowData(this.accountTypeMap[accountType], index);
          accountTypeRow.push(segHeader);
          accountTypeRow.push(segRow);

          segData.push(accountTypeRow);
        }
        this.view.segmentFileTransactions.setData(segData);
      },
      
      setUIForCompany: function() {
        let self = this;
        this.populateAccounts();
        FormControllerUtility.enableButton(this.view.btnProceedRoles);

        let lastFourDigitOfCompanyId = this.transactionLimits[0].cif;
        if (lastFourDigitOfCompanyId.length > 4) {
          lastFourDigitOfCompanyId = lastFourDigitOfCompanyId.substring(lastFourDigitOfCompanyId.length - 4, lastFourDigitOfCompanyId.length);
        }
        CommonUtilities.setText(this.view.lblCompanyName, this.transactionLimits[0].companyName + " - " + lastFourDigitOfCompanyId, CommonUtilities.getaccessibilityConfig());

        //Features
        this.dependentActions = {};
        
        let featuresRowData = this.transactionLimits[0].accounts[0].featurePermissions.map(function(features) {
          return {
            "lblDefaultAccountName": {
              "text": features.featureName,
              "accessibilityConfig": {
                "a11yLabel": features.featureName
              }
            },
            "featureId": features.featureId,
            "lblDefaultAccountIcon": {
              "isVisible": false
            }
          }
        });
        this.view.segAccountListActions1.setData(featuresRowData);
        CommonUtilities.setText(this.view.lblShowAllFeatures, kony.i18n.getLocalizedString("i18n.common.none"), CommonUtilities.getaccessibilityConfig());
        CommonUtilities.setText(this.view.lblShowAllFeatures2, kony.i18n.getLocalizedString("i18n.common.none"), CommonUtilities.getaccessibilityConfig());
        //CommonUtilities.setText(this.view.lblShowAllFeatures3, kony.i18n.getLocalizedString("i18n.common.none"), CommonUtilities.getaccessibilityConfig());

        this.view.flxAccountsRightContainer1.onClick = function() {
          if(self.view.CopycompanyListAllFeatures.isVisible === true)
            self.view.CopycompanyListAllFeatures.isVisible = false;
          else
            self.view.CopycompanyListAllFeatures.isVisible = true;
        };
        this.view.segAccountListActions1.onRowClick = function() {
          let index = self.view.segAccountListActions1.selectedRowIndex[1];
          let rowData = self.view.segAccountListActions1.data;
          let selectedFeature = rowData[index].lblDefaultAccountName.text;
          CommonUtilities.setText(self.view.lblShowAllFeatures, selectedFeature, CommonUtilities.getaccessibilityConfig());
          self.view.CopycompanyListAllFeatures.isVisible = false;
          CommonUtilities.setText(self.view.lblShowAllFeatures2, kony.i18n.getLocalizedString("i18n.common.none"), CommonUtilities.getaccessibilityConfig());

          self.generateDependentActions(index);

          let actionsHeaderData = {
            "totalActionsCount": 1,//self.accountLevelPermissions[0].accounts[0].featurePermissions[index].permissions.length,
            "selectedActionsCount": 0,
            "lastSelectedAction": "",
            "featureId": rowData[index].featureId,
            "flxTransfersFromListHeader": {
              "isVisible": false
            }
          };
          let actionsRowData = //self.accountLevelPermissions[0].accounts[0].featurePermissions[index].permissions.map(function(actions) {
             [{
              "lblDefaultAccountName": {
                "text": self.transactionLimits[0].accounts[0].featurePermissions[index].actionName,
                "accessibilityConfig": {
                  "a11yLabel": self.transactionLimits[0].accounts[0].featurePermissions[index].actionName
                }
              },
              "actionId": self.transactionLimits[0].accounts[0].featurePermissions[index].actionId,
              "lblDefaultAccountIcon": {
                "text": "D",
                "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected")
                }
              }
            }]
          //});
          self.view.segAccountListActions2.setData([
            [actionsHeaderData, actionsRowData]
          ]);
//           if (self.view.lblShowAllFeatures3.text !== kony.i18n.getLocalizedString("i18n.common.none") && self.view.lblShowAllFeatures2.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
//             FormControllerUtility.enableButton(self.view.btnApply);
//           } else {
//             FormControllerUtility.disableButton(self.view.btnApply);
//           }
          self.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text = "All Transaction";
          self.view.tbxDenyLimit.text = "";
          self.view.tbxPreApproveLimit.text = "";
          self.enableDisableApplyBtn();

        };

        //Actions
        this.view.flxAccountsRightContainer2.onClick = function() {
          if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
            if (self.view.companyListAllFeatures2.isVisible) {
              self.view.companyListAllFeatures2.isVisible = false;
              let actionsSegData = self.view.segAccountListActions2.data;
              if (actionsSegData[0][0].selectedActionsCount === 1) {
                CommonUtilities.setText(self.view.lblShowAllFeatures2, actionsSegData[0][0].lastSelectedAction, CommonUtilities.getaccessibilityConfig());
              } else {
                CommonUtilities.setText(self.view.lblShowAllFeatures2, kony.i18n.getLocalizedString("i18n.UserManagement.selected") + actionsSegData[0][0].selectedActionsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + actionsSegData[0][0].totalActionsCount, CommonUtilities.getaccessibilityConfig());
              }
//               if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
//                 FormControllerUtility.enableButton(self.view.btnApply);
//               } else {
//                 FormControllerUtility.disableButton(self.view.btnApply);
//               }
            } else {
              self.view.companyListAllFeatures2.isVisible = true;
            }
          }
        };

        this.view.segAccountListActions2.onRowClick = function() {
          let index = self.view.segAccountListActions2.selectedRowIndex[1];
          let segData = self.view.segAccountListActions2.data;
          let selectedAction = segData[0][1][index].actionId;

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
                eachAction.lblDefaultAccountIcon.accessibilityConfig.a11yLabel = toSetA11y;
                segData[0][0].selectedActionsCount += adder;
              }
            }
            if (eachAction.lblDefaultAccountIcon.text === "C") {
              oneSelectedAction = eachAction.lblDefaultAccountName.text;
            }
          });
          if (segData[0][0].selectedActionsCount === 1) {
            segData[0][0].lastSelectedAction = oneSelectedAction;
          }
          self.view.segAccountListActions2.setData(segData);
          self.enableDisableApplyBtn();
        };
        

        //Permissions

//         let permissionsArr = [kony.i18n.getLocalizedString("i18n.Alerts.Enable"), kony.i18n.getLocalizedString("i18n.UserManagement.disable")];
//         let permissionsSegData = permissionsArr.map(function(permission) {
//           return {
//             "lblDefaultAccountName": {
//               "text": permission,
//               "accessibilityConfig": {
//                 "a11yLabel": permission
//               }
//             },
//             "lblDefaultAccountIcon": {
//               "isVisible": false
//             }
//           }
//         });
//         this.view.segAccountListActions3.setData(permissionsSegData);

//         this.view.flxSubPermissionType.onClick = function() {
//           self.view.companyListAllFeatures3.isVisible = true;
//         };
//         this.view.segAccountListActions3.onRowClick = function() {
//           let index = self.view.segAccountListActions3.selectedRowIndex[1];
//           let rowData = self.view.segAccountListActions3.data;
//           CommonUtilities.setText(self.view.lblShowAllFeatures3, rowData[index].lblDefaultAccountName.text, CommonUtilities.getaccessibilityConfig());
//           self.view.segAccountListActions3.setData(rowData);
//           self.view.companyListAllFeatures3.isVisible = false;
//           if (self.view.lblShowAllFeatures.text !== kony.i18n.getLocalizedString("i18n.common.none") && self.view.lblShowAllFeatures2.text !== kony.i18n.getLocalizedString("i18n.common.none")) {
//             FormControllerUtility.enableButton(self.view.btnApply);
//           } else {
//             FormControllerUtility.disableButton(self.view.btnApply);
//           }
//         };
        FormControllerUtility.hideProgressBar(this.view);
      },

        goBackFunction: function() {
            applicationManager.getNavigationManager().navigateTo("frmTransactionLimits");
        },

        applyFilter: function() {
            
        },

      resetToDefault: function() {
        this.transactionLimits = this.loadBusinessBankingModule().getTransactionLimitsFromInitUserManagement();
        this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text = "All Transaction";
        this.view.tbxDenyLimit.text = "";
        this.view.tbxPreApproveLimit.text = "";
        this.setUIForCompany();
      },
        toggleSwitchAlerts: function() {
            var switchSegData = [];
            var index = [];
            var excludeIndex = [];
            var switchIndex = this.view.toggleSwitch.selectedIndex;
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
            } else {
                //this.addOnlySectionHeaders(this.getSectionHeadersMonetaryFeaturesReadOnly());
              this.populateAccounts();
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
        this.accountsSegData.forEach(function(eachRow, i) {
          //sortField,sortType,searchParams,searchString
          let accountsSearchResult = CommonUtilities.sortAndSearchJSON(self.accountTypeMap[eachRow[0].lblRecipientName.text], null, null, "accountName,accountId", searchString);
          if (accountsSearchResult !== -1 && accountsSearchResult !== null && accountsSearchResult !== undefined && accountsSearchResult.length != 0) {
            let segRow = self.getAccountsSegRowData(accountsSearchResult, i);
            eachRow[0].flxSortMakeTransfers.isVisible = true;
            eachRow[0].lblDropDownIcon.text = "P";
            eachRow[0].lblDropDownIcon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.dropdownOpen");
            eachRow[0].selectedAccounts = self.isSelectedAccountMap[eachRow[0].lblRecipientName.text];
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
        sortAccountName: function(context) {
            var sectionIndex = context.sectionIndex;
            var segData = this.view.segmentFileTransactions.data;
            var accountArr = segData[sectionIndex];
            var accountNames = [];
            var rowData = [];
            accountArr[1].forEach(function(item) {
                accountNames.push(item.lblRecipientNameRow.text);
            });
            accountNames.sort();
            //accountNames.reverse();
            accountNames.forEach(function(data) {
                accountArr[1].forEach(function(item) {
                    if (data === item.lblRecipientNameRow.text) {
                        rowData.push(item);
                    }
                });
            });
            segData[sectionIndex].pop();
            segData[sectionIndex].push(rowData);
            this.view.segmentFileTransactions.setData([]);
            this.view.segmentFileTransactions.setData(segData);
        },
        sortPermissions: function(context) {
            var sectionIndex = context.sectionIndex;
            var segData = this.view.segmentFileTransactions.data;
            var accountArr = segData[sectionIndex];
            var accountNames = [];
            var rowData = [];
            accountArr[1].forEach(function(item) {
                accountNames.push(item.lblBankName.text);
            });
            accountNames.sort();
            //accountNames.reverse();
            accountNames.forEach(function(data) {
                accountArr[1].forEach(function(item) {
                    if (data === item.lblBankName.text) {
                        rowData.push(item);
                    }
                });
            });
            segData[sectionIndex].pop();
            segData[sectionIndex].push(rowData);
            this.view.segmentFileTransactions.setData([]);
            this.view.segmentFileTransactions.setData(segData);
        },
        sortFeatures: function(context) {
            var sectionIndex = context.sectionIndex;
            var segData = this.view.segmentFileTransactions.data;
            var accountArr = segData[sectionIndex];
            var accountNames = [];
            var rowData = [];
            accountArr[1].forEach(function(item) {
                accountNames.push(item.lblTransactionsType.text);
            });
            accountNames.sort();
            //accountNames.reverse();
            accountNames.forEach(function(data) {
                accountArr[1].forEach(function(item) {
                    if (data === item.lblTransactionsType.text) {
                        rowData.push(item);
                    }
                });
            });
            segData[sectionIndex].pop();
            segData[sectionIndex].push(rowData);
            this.view.segmentFileTransactions.setData([]);
            this.view.segmentFileTransactions.setData(segData);
        },
      parseDepActions: function(dependentActionsString) {
        //console.log(dependentActionsString);
        return dependentActionsString.substr(1, dependentActionsString.length - 2).split(",").map(eachStr => eachStr.trim());
      },
      generateDependentActions: function(index) {
        let self = this;
        let featureId = this.transactionLimits[0].accounts[0].featurePermissions[index].featureId;
        let action = this.transactionLimits[0].accounts[0].featurePermissions[index];
        if (!(this.dependentActions.hasOwnProperty(featureId))) {
          this.dependentActions[featureId] = {};
          //this.transactionLimits[0].accounts[0].featurePermissions[index].permissions.map(function(action) {
            self.dependentActions[featureId][this.transactionLimits[0].accounts[0].featurePermissions[index].actionId] = [action.dependentActions === undefined ? [] : self.parseDepActions(action.dependentActions), []];
          //});

          for (let actionId in self.dependentActions[featureId]) {
            self.dependentActions[featureId][actionId][0].forEach(function(depAction) {
              if (self.dependentActions[featureId].hasOwnProperty(depAction)) {
                self.dependentActions[featureId][depAction][1].push(actionId);
              }
            });
          }
        }
      },
      populateAccounts: function() {
            var scope = this;
            var obj_arr = [];
            obj_arr = [{
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.UserManagement.AllTransaction"),
                }
            },{
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.perTransaction"),
                }
            }, {
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction"),
                }
            }, {
                "flxSeparator": {
                    "isVisible": false
                },
                "lblViewTypeName": {
                    text: kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction"),
                }
            }];

            

            this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setData(obj_arr);
            this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.onRowClick = function(context) {
                scope.setDropDownValue(context);
            };
         
            //Dividing accounts by account type
            let accountTypeMap = {};
            for (let i = 0; i < this.transactionLimits[0].accounts.length; i++) {
                if (!accountTypeMap.hasOwnProperty(this.transactionLimits[0].accounts[i].accountType)) {
                    accountTypeMap[this.transactionLimits[0].accounts[i].accountType] = [];
                }
                accountTypeMap[this.transactionLimits[0].accounts[i].accountType].push(this.transactionLimits[0].accounts[i]);
            }

            this.accountTypeMap = accountTypeMap;
            this.totalAccountsCount = this.transactionLimits[0].accounts.length;
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
                        "text": "0" + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + accountTypeMap[accountType].length,
                        "accessibilityConfig": {
                            "a11yLabel": "0" + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + accountTypeMap[accountType].length
                        }
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
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.editAccountLevel"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.UserManagement.editAccountLevel")
                        }
                    },
                    "lblAccountname": {
                        "text": kony.i18n.getLocalizedString("i18n.transfers.accountName"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.accountName")
                        }
                    },
                    "lblAccountsSelected": {
                        "text": kony.i18n.getLocalizedString("konybb.i18n.AccountsSelected"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("konybb.i18n.AccountsSelected")
                        }
                    },
                    "lblDropDownIcon": {
                        "text": "P",
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Accessibility.dropdownOpen")
                        }
                    },
                    "flxActions": {
                        "onClick": self.onDropdownClick.bind(this, index)
                    },
                    "lblFeaturesPermission": {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.featurePermission"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.UserManagement.featurePermission")
                        }
                    },
                    "lblIcon": {
                        "text": "s"
                    },
                    "lblPermissionType": {
                        "text": kony.i18n.getLocalizedString("i18n.UserManagement.PermissionsType"),
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.UserManagement.PermissionsType")
                        }
                    },
                    "lblSeparator": {
                        "text": ""
                    },
                    "lblDropdown": {
                        "text": "D",
                        "accessibilityConfig": {
                            "a11yLabel": kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected")
                        }
                    },
                    "flxDropdown": {
                        "onClick": self.bulkSelectAccounts.bind(this, index)
                    },
                    "flxImgAccSort": {
                        "onClick": self.sortAccounts.bind(this, index, "accountName")
                    },
                    "flxImgSortPermission": {
                        "onClick": self.sortAccounts.bind(this, index, "permissionType")
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
        	//this.enableDisableApplyBtn();
            CommonUtilities.setText(this.view.lblNoAccountsSelected, this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount, CommonUtilities.getaccessibilityConfig());
        
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
//           account.featurePermissions.forEach(function(featurePermission) {
//             totalPermissions += 1,//featurePermission.permissions.length;
//             featurePermission.permissions.forEach(function(permission) {
//               if (permission.isEnabled) {
//                 selectedPermissions++;
//               }
//             });
//           });
          totalPermissions = 1;
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
              "onClick": self.editAccountLevel.bind(this, index, rowIndex)
            },
            "lblBankName": {
              "text": permissionType,
              "accessibilityConfig": {
                "a11yLabel": permissionType
              }
            },
            "lblDropdownRowICon": {
              "text": isSelected ? "C" : "D",
              "accessibilityConfig": {
                "a11yLabel": isSelected ? kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected") : kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected")
              }
            },
            "flxDropdownRow": {
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
              "toolTip": kony.i18n.getLocalizedString("i18n.billPay.category"),
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
      setPermissionTypeToAccountsData: function(accountType, accountId, permissionType) {
        this.accountTypeMap[accountType].forEach(function(account) {
          if (account.accountId === accountId) {
            account.permissionType = permissionType;
          }
        });

      },
      
      onDropdownClick : function(index){
        let segData = this.view.segmentFileTransactions.data;
            if (segData[index][0].lblDropDownIcon.text === "O") {
                segData[index][0].lblDropDownIcon.text = "P";
                segData[index][0].lblDropDownIcon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.dropdownOpen");
                segData[index][0].flxSortMakeTransfers.isVisible = true;
                segData[index][1].forEach(function(row) {
                    row.flxUserManagementSelectBulkTransactionLimits = {
                        "isVisible": true
                    };
                });
            } else {
                segData[index][0].lblDropDownIcon.text = "O";
                segData[index][0].lblDropDownIcon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.dropdownClose");
                segData[index][0].flxSortMakeTransfers.isVisible = false;
                //segData[index][1] = [];
                segData[index][1].forEach(function(row) {
                    row.flxUserManagementSelectBulkTransactionLimits = {
                        "isVisible": false
                    };
                });
            }
            this.view.segmentFileTransactions.setData(segData);
            if (this.view.lblLoan2.text === "M") {
                this.viewOnlySelectedOnClick();
            }
      },
      bulkSelectAccounts: function(index) {
        let self = this;
        let segData = this.view.segmentFileTransactions.data;
        if (segData[index][0].lblDropdown.text === "C" || segData[index][0].lblDropdown.text === "z") {
          segData[index][0].lblDropdown.text = "D"
          segData[index][0].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
          self.selectedAccountsCount -= segData[index][0].selectedAccounts;
          segData[index][0].selectedAccounts = 0;
          self.isSelectedAccountMap[segData[index][0].lblRecipientName.text] = 0;
          CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
          segData[index][1].forEach(function(eachRow) {
            eachRow.lblDropdownRowICon.text = 'D';
            eachRow.lblDropdownRowICon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
            eachRow.lblDropdownRowICon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
            self.isSelectedAccountMap[eachRow.accountId] = false;
          });
        } else {
          segData[index][0].lblDropdown.text = "C";
          segData[index][0].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
          self.selectedAccountsCount += segData[index][0].totalAccounts - segData[index][0].selectedAccounts;
          segData[index][0].selectedAccounts = segData[index][0].totalAccounts;
          self.isSelectedAccountMap[segData[index][0].lblRecipientName.text] = segData[index][0].totalAccounts;
          CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
          segData[index][1].forEach(function(eachRow) {
            eachRow.lblDropdownRowICon.text = 'C';
            eachRow.lblDropdownRowICon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
            eachRow.lblDropdownRowICon.skin = "sknlblDelete20px";
            self.isSelectedAccountMap[eachRow.accountId] = true;
          });
        }
        CommonUtilities.setText(this.view.lblNoAccountsSelected, this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount, CommonUtilities.getaccessibilityConfig());
        this.enableDisableApplyBtn();
        this.view.segmentFileTransactions.setData(segData);

        if (this.view.lblLoan2.text === "M") {
          this.viewOnlySelectedOnClick();
        }

      },
      sortAccounts: function(index, sortParam) {
        let self = this;
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

          if (this.view.lblLoan2.text === "M") {
            this.viewOnlySelectedOnClick();
          }
        }
      },

      editAccountLevel: function(index, rowIndex) {
        FormControllerUtility.showProgressBar(this.view);
        let self = this;
        let segData = this.view.segmentFileTransactions.data;
        var accountName = segData[index][1][rowIndex].lblRecipientNameRow.text.split("....")[0].replace(/^\s+|\s+$/gm,'');
        let params = {
          "companyId": self.transactionLimits[0].cif,
          "companyName": self.transactionLimits[0].companyName,
          "accountId": segData[index][1][rowIndex].accountId,
          "accountName": accountName,
          "userManagementData": {
            "transactionLimits": [self.transactionLimits]
          },
          "companywithid":this.selectedCompanyWithId
        }
        var nav = new kony.mvc.Navigation("frmUserManagementTransactionLimit");
        nav.navigate(params);
        //applicationManager.getNavigationManager().navigateTo("frmUserManagementTransactionLimit", true, params);
      },
      selectAccount: function(index, rowIndex) {
        let segData = this.view.segmentFileTransactions.data;
        if (segData[index][1][rowIndex].lblDropdownRowICon.text === 'D') {
          segData[index][1][rowIndex].lblDropdownRowICon.text = 'C';
          segData[index][1][rowIndex].lblDropdownRowICon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
          segData[index][1][rowIndex].lblDropdownRowICon.skin = "sknlblDelete20px";
          segData[index][0].selectedAccounts += 1;
          this.selectedAccountsCount += 1;
          this.isSelectedAccountMap[segData[index][0].lblRecipientName.text] += 1;
          CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
          this.isSelectedAccountMap[segData[index][1][rowIndex].accountId] = true;
        } else {
          segData[index][1][rowIndex].lblDropdownRowICon.text = 'D';
          segData[index][1][rowIndex].lblDropdownRowICon.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
          segData[index][1][rowIndex].lblDropdownRowICon.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
          segData[index][0].selectedAccounts -= 1;
          this.selectedAccountsCount -= 1;
          this.isSelectedAccountMap[segData[index][0].lblRecipientName.text] -= 1;
          CommonUtilities.setText(segData[index][0].lblAccountsSelectedNo, segData[index][0].selectedAccounts + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + segData[index][0].totalAccounts, CommonUtilities.getaccessibilityConfig());
          if (this.view.lblLoan2.text === "M") {
            segData[index][1].splice(rowIndex, 1);
          }
          this.isSelectedAccountMap[segData[index][1][rowIndex].accountId] = false;
        }
        if (segData[index][0].selectedAccounts == segData[index][0].totalAccounts) {
          segData[index][0].lblDropdown.text = "C";
          segData[index][0].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxSelected");
        } else if (segData[index][0].selectedAccounts == 0) {
          segData[index][0].lblDropdown.text = "D";
          segData[index][0].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxUnSelected");
        } else {
          segData[index][0].lblDropdown.text = "z";
          segData[index][0].lblDropdown.accessibilityConfig.a11yLabel = kony.i18n.getLocalizedString("i18n.Accessibility.checkboxPartiallySelected");
        }

        this.view.segmentFileTransactions.setData(segData);
        CommonUtilities.setText(this.view.lblNoAccountsSelected, this.selectedAccountsCount + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + this.totalAccountsCount, CommonUtilities.getaccessibilityConfig());
		this.enableDisableApplyBtn();
        if (this.view.lblLoan2.text === "M") {
          this.viewOnlySelectedOnClick();
        }
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

      setDropDownValue: function(context) {
        var scope = this;
        this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text = context.selectedRowItems[0].lblViewTypeName.text;
        var transactionTxt = context.selectedRowItems[0].lblViewTypeName.text;
//         this.transactionLimits[0].accounts.forEach(function(data){
//           data.featurePermissions.forEach(function(item){
//             if(item.featureName === scope.view.lblShowAllFeatures.text)
//             {
//               item.limits.forEach(function(limit){
//                 if(transactionTxt === "Per Transaction"){
//                   if(limit.id === "PRE_APPROVED_TRANSACTION_LIMIT"){
//                     scope.view.tbxPreApproveLimit.text = limit.value;
//                   }
//                   if(limit.id === "AUTO_DENIED_TRANSACTION_LIMIT"){
//                     scope.view.tbxDenyLimit.text = limit.value;
//                   }
//                 }
//                 if(transactionTxt === "Daily Transaction"){
//                   if(limit.id === "PRE_APPROVED_DAILY_LIMIT"){
//                     scope.view.tbxPreApproveLimit.text = limit.value;
//                   }
//                   if(limit.id === "AUTO_DENIED_DAILY_LIMIT"){
//                     scope.view.tbxDenyLimit.text = limit.value;
//                   }
//                 }
//                 if(transactionTxt === "Weekly Transaction"){
//                   if(limit.id === "PRE_APPROVED_WEEKLY_LIMIT"){
//                     scope.view.tbxPreApproveLimit.text = limit.value;
//                   }
//                   if(limit.id === "AUTO_DENIED_WEEKLY_LIMIT"){
//                     scope.view.tbxDenyLimit.text = limit.value;
//                   }
//                 }
//                 if(transactionTxt === "All Transaction"){
//                   scope.view.tbxPreApproveLimit.text = "";
//                   scope.view.tbxDenyLimit.text = "";
//                 }
//               });
//             }
//           });
//         });
        this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setVisibility(false);
        this.enableDisableApplyBtn();

      },

      
      enableDisableApplyBtn : function(eventobject, context,bool){
        var scope = this;
        if(eventobject !== undefined){
          if (eventobject.id === "tbxDenyLimit" || eventobject.id === "tbxPreApproveLimit") {
            var deformatted = applicationManager.getFormatUtilManager().deFormatAmount(eventobject.text);
            if (deformatted.includes(".00"))
              deformatted = deformatted.replace(".00", "");
            var valid = ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(deformatted)) ? 1 : 0);
            if (valid) {
              if (deformatted.slice(-2) != ".0") {
                eventobject.text = applicationManager.getFormatUtilManager().formatAmount(deformatted);
              } else {
                deformatted = deformatted.replace(".0", "");
                eventobject.text = deformatted;
              }
            } else {
              //eventobject.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
            }
          }
        }
        if(this.view.lblShowAllFeatures.text !== "None" && this.view.lblShowAllFeatures2.text !== "None" 
           && this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text !== "All Transaction"
           && this.view.tbxDenyLimit.text !== "" && this.view.tbxPreApproveLimit.text !== ""){
          var maxLimit;
          var transactionTxt = scope.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text;
          this.transactionLimits[0].accounts.forEach(function(data){
          data.featurePermissions.forEach(function(item){
            if(item.featureName === scope.view.lblShowAllFeatures.text)
            {
              item.limits.forEach(function(limit){
                if( transactionTxt === "Per Transaction"){
                  if(limit.id === "MAX_TRANSACTION_LIMIT"){
                    maxLimit = limit.value;
                  }
                }
                if(transactionTxt === "Daily Transaction"){
                  if(limit.id === "DAILY_LIMIT"){
                    maxLimit = limit.value;
                  }
                }
                if(transactionTxt === "Weekly Transaction"){
                  if(limit.id === "WEEKLY_LIMIT"){
                    maxLimit = limit.value;
                  }
                }
              });
            }
          });
        });
          var deformatPreApproveLimit = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxPreApproveLimit.text);
          var deformatDenyLimit = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxDenyLimit.text);
          var accnts = this.view.lblNoAccountsSelected.text.split(" ")[0];
          if(parseInt(deformatPreApproveLimit) <= parseInt(deformatDenyLimit)
             && parseInt(deformatPreApproveLimit) <= maxLimit
             && parseInt(deformatDenyLimit) <= maxLimit
             && accnts !== "0"){
            this.view.flxPreApproveContainer.skin = "skne3e3e3br3pxradius";
            this.view.flxDenyContainer.skin = "skne3e3e3br3pxradius";
            FormControllerUtility.enableButton(scope.view.btnApply);
           this.view.lblErrorMessage.setVisibility(false);
          }
          else{
             var errFlag =0;
            if(parseInt(deformatPreApproveLimit) >= parseInt(deformatDenyLimit) || parseInt(deformatPreApproveLimit) >= maxLimit){
              this.view.flxPreApproveContainer.skin = "sknborderff0000error";
               this.view.lblErrorMessage.setVisibility(false);
              errFlag= errFlag+1;
            }
            else{
              this.view.flxPreApproveContainer.skin = "skne3e3e3br3pxradius";
             this.view.lblErrorMessage.setVisibility(false);
            }
            if(parseInt(deformatDenyLimit) <= parseInt(deformatPreApproveLimit) || parseInt(deformatDenyLimit) >= maxLimit){
              this.view.flxDenyContainer.skin = "sknborderff0000error";
               this.view.lblErrorMessage.setVisibility(true);
              errFlag= errFlag+1;
            }
            else
           {
                this.view.lblErrorMessage.setVisibility(false);
             this.view.flxDenyContainer.skin = "skne3e3e3br3pxradius";
          }
            this.view.lblErrorMessage.setVisibility(errFlag > 0);
//             if(parseInt(this.view.tbxPreApproveLimit.text) > maxLimit){
//               this.view.flxPreApproveContainer.skin = "sknborderff0000error";
//             }
//             else
//               this.view.flxPreApproveContainer.skin = "skne3e3e3br3pxradius";
//             if(parseInt(this.view.tbxDenyLimit.text) > maxLimit){
//               this.view.flxDenyContainer.skin = "sknborderff0000error";
//             }
//             else
//               this.view.flxDenyContainer.skin = "skne3e3e3br3pxradius";
            FormControllerUtility.disableButton(scope.view.btnApply);
          }
        }
        else{
          FormControllerUtility.disableButton(scope.view.btnApply);
        }
      },
      
      bulkUpdate: function() {
        FormControllerUtility.enableButton(this.view.btnProceedRoles);
        let self = this;
        let selectedFeature = this.view.lblShowAllFeatures.text;
        let selectedActions = [];
        let selectedAccounts = [];
        let actionsSegData = this.view.segAccountListActions2.data;
        actionsSegData[0][1].forEach(function(eachRow) {
          if (eachRow.lblDefaultAccountIcon.text === "C") {
            selectedActions.push(eachRow.actionId);
          }
        });
        let transactionTxt = this.view.MobileCustomDropdownTransaction.lblViewType.text;
        let preApproveText = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxPreApproveLimit.text);
        let denyText = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxDenyLimit.text);
        let segData = this.view.segmentFileTransactions.data;
        
        segData.forEach(function(item){
          item[1].forEach(function(data){
            if(data.lblDropdownRowICon.text === "C"){
              selectedAccounts.push(data.lblRecipientNameRow.text.split("....")[0]);
            }
          });
        });
        //let bool = this.view.lblShowAllFeatures3.text === kony.i18n.getLocalizedString("i18n.Alerts.Enable") ? true : false;

        this.transactionLimits[0].accounts.forEach(function(data){
          if(selectedAccounts.includes(data.accountName+" ")){
          data.featurePermissions.forEach(function(item){
            if(item.featureName === self.view.lblShowAllFeatures.text)
            {
              item.limits.forEach(function(limit){
                if(transactionTxt === "Per Transaction"){
                  if(limit.id === "PRE_APPROVED_TRANSACTION_LIMIT"){
                    limit.value = preApproveText;
                  }
                  if(limit.id === "AUTO_DENIED_TRANSACTION_LIMIT"){
                    limit.value = denyText;
                  }
                }
                if(transactionTxt === "Daily Transaction"){
                  if(limit.id === "PRE_APPROVED_DAILY_LIMIT"){
                    limit.value = preApproveText;
                  }
                  if(limit.id === "AUTO_DENIED_DAILY_LIMIT"){
                    limit.value = denyText;
                  }
                }
                if(transactionTxt === "Weekly Transaction"){
                  if(limit.id === "PRE_APPROVED_WEEKLY_LIMIT"){
                    limit.value = preApproveText;
                  }
                  if(limit.id === "AUTO_DENIED_WEEKLY_LIMIT"){
                    limit.value = denyText;
                  }
                }
              });
            }
          });
        }
        });
        
        this.reloadAccounts();
      },

      reloadAccounts: function() {
        let segData = [];
        let self = this;
        let index = -1;
        let existingData = this.view.segmentFileTransactions.data;
        for (let accountType in this.accountTypeMap) {
          this.isSelectedAccountMap[accountType] = this.accountTypeMap[accountType].length;
          index += 1;
          let accountTypeRow = [];
          let segHeader = existingData[index][0];
          let segRow = self.getAccountsSegRowData(this.accountTypeMap[accountType], index);
          accountTypeRow.push(segHeader);
          accountTypeRow.push(segRow);

          segData.push(accountTypeRow);
        }
        this.view.segmentFileTransactions.setData(segData);
      },

        loadBusinessBankingModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule").presentationController;
        },
        
        navigateToLimitPage: function(userObj, params) {
          var self = this;
            var navObj = {
                "companyName": this.selectedCompany,
                "accountName": userObj.acntName
            };
            var nav = new kony.mvc.Navigation("frmUserManagementTransactionLimit");
            nav.navigate(navObj);
        },
        setDropdownVisiblility: function() {
            if (!this.view.MobileCustomDropdownTransaction.flxDropdown.isVisible) {
                this.view.MobileCustomDropdownTransaction.flxDropdown.isVisible = true;
                this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setVisibility(true);
                this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.MobileCustomDropdownTransaction.imgDropdown.centerX = "50%";
                this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
            } else {
                this.view.MobileCustomDropdownTransaction.flxDropdown.isVisible = false;
                this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setVisibility(false);
                this.view.MobileCustomDropdownTransaction.imgDropdown.centerX = "50%";
                this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            }
        },
        setFeatureDropdownVisiblility: function() {
            if (!this.view.MobileCustomDropdown.flxDropdown.isVisible) {
                this.view.MobileCustomDropdown.flxDropdown.isVisible = true;
                this.view.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(true);
                this.view.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
                this.view.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
            } else {
                this.view.MobileCustomDropdown.flxDropdown.isVisible = false;
                this.view.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
                this.view.MobileCustomDropdown.imgDropdown.centerX = "50%";
                this.view.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
            }
        },
        /**
         * Method will invoke on form post show
         */
      postShow: function() {
        var flowType = this.loadBusinessBankingModule().getUserManagementFlow();
        var createOrEditFlow = this.loadBusinessBankingModule().getUserNavigationType();
        this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.UserManagement.AllTransaction");
        this.view.lblViewOnlySelected.text=kony.i18n.getLocalizedString("i18n.bulkwires.viewonlyselected");
        if (kony.i18n.getCurrentLocale() === "ar_AE") {
          if (kony.application.getCurrentBreakpoint() <= 1024) {
              this.view.flxAccountsSection.width="98%";
              this.view.flxSelectAccounts.width="99.5%";
              this.view.flxSelectAccounts.centerX="50%";
              this.view.flxSelectAccountBottom.width="96%";
           } else if (kony.application.getCurrentBreakpoint() >= 1366) {
              this.view.flxAccountsSection.width="98%";
              this.view.flxSelectAccounts.width="99.5%";
              this.view.flxSelectAccounts.centerX="50%";
              this.view.flxSelectAccountBottom.width="97%";
               }
           }
        if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
          this.view.lblUserName.isVisible = false;
          this.view.lblEmail.isVisible = false;
          if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
            this.view.customheadernew.activateMenu("User Management", "Create Custom Role");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
          } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
            this.view.customheadernew.activateMenu("User Management", "User Roles");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
          }
        } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
          this.userDetails = this.loadBusinessBankingModule().getUserDetails();
          this.view.lblUserName.isVisible = true;
          this.view.lblEmail.isVisible = true;
          CommonUtilities.setText(this.view.lblUserName, this.userDetails.firstName + " " + this.userDetails.lastName, CommonUtilities.getaccessibilityConfig());
          CommonUtilities.setText(this.view.lblEmail, this.userDetails.email, CommonUtilities.getaccessibilityConfig());
          if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
            this.view.customheadernew.activateMenu("User Management", "Create UM User");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
          } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
            this.view.customheadernew.activateMenu("User Management", "All Users");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
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
        updateFormUI: function(context) {
            if (context.selectedComp) {
                this.selectedCompany = context.selectedComp;
            }
        },
        onNavigate: function(context) {
            //var compName = context.slice(0, context.length - 10);
            this.selectedCompany = compName;
            this.selectedCompanyWithId = context;
            this.data = applicationManager.getConfigurationManager().getLimitsData;
        },
        
    };
});
define("BusinessBanking/frmUpdatePermissionsInBulkControllerActions", {
    /*
                    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
                  */
    /** onClick defined for btnYes **/
    AS_Button_c3acaf66900f46aa8d7f6301a73b1a5d: function AS_Button_c3acaf66900f46aa8d7f6301a73b1a5d(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNo **/
    AS_Button_haacf2bd9d8c4417b053f825e7b4f161: function AS_Button_haacf2bd9d8c4417b053f825e7b4f161(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for flxCross **/
    AS_FlexContainer_aae36bd4a8754bfaaaadc481e0986509: function AS_FlexContainer_aae36bd4a8754bfaaaadc481e0986509(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** init defined for frmUpdatePermissionsInBulk **/
    AS_Form_a2e829c4edbe44c5b054b552e5c646d2: function AS_Form_a2e829c4edbe44c5b054b552e5c646d2(eventobject) {
        var self = this;
        this.initActions();
    },
    /** preShow defined for frmUpdatePermissionsInBulk **/
    AS_Form_f0b08b08a6fc4fdca8566537a88f78a0: function AS_Form_f0b08b08a6fc4fdca8566537a88f78a0(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onTouchEnd defined for frmUpdatePermissionsInBulk **/
    AS_Form_c5226b39c41d4b4e8ce74a1d4cc9b05d: function AS_Form_c5226b39c41d4b4e8ce74a1d4cc9b05d(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** onBreakpointChange defined for frmUpdatePermissionsInBulk **/
    AS_Form_ed377e97c2b447baba80462f1f1cf2fe: function AS_Form_ed377e97c2b447baba80462f1f1cf2fe(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    }
});
define("UserManagementMA/BusinessBankingUIModule/frmUpdatePermissionsInBulkController", ["UserManagementMA/BusinessBankingUIModule/userfrmUpdatePermissionsInBulkController", "UserManagementMA/BusinessBankingUIModule/frmUpdatePermissionsInBulkControllerActions"], function() {
    var controller = require("UserManagementMA/BusinessBankingUIModule/userfrmUpdatePermissionsInBulkController");
    var controllerActions = ["UserManagementMA/BusinessBankingUIModule/frmUpdatePermissionsInBulkControllerActions"];
    return kony.visualizer.mixinControllerActions(controller, controllerActions);
});