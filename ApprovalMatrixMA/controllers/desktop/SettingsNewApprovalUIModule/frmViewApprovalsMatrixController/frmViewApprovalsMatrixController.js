define(['CommonUtilities','FormControllerUtility'], function(CommonUtilities,FormControllerUtility) {
    //Type your controller code here 
    return {
		 contractsApprovalMatrix: null,
        doInit: function() {
            this.actionID = "";
            this.contractData = {};
            this.isTotalApproversVisible = false;
            this.isMatrixDisabled = false;
        },
        frmPreShow: function() {
            var scope = this;
            this.isMatrixDisabled = applicationManager.getNavigationManager().getCustomInfo("frmViewApprovalsMatrix");
            this.view.switchApprovals.selectedIndex = (this.isMatrixDisabled) ? 0 : 1;
            this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix"));
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxFormContent']);
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
            this.view.btnBack.onClick = this.navigateToEntryPoint.bind(this);
            this.setIdleTimeOut();
            this.view.btnAccountLevelMatrix.onClick = this.navigateToAccountLevelForm.bind(this);
            this.view.tbxSearch.onKeyUp = this.searchFeature.bind(this);
            this.view.tbxSearch.text = "";
            this.view.flxDowntimeWarning.isVisible = false;
            this.isManageEnabled = applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_MANAGE');
            this.configManager = applicationManager.getConfigurationManager();
            this.currencyCode = this.configManager.configurations.items.CURRENCYCODE;
            this.view.btnBackSignatoryGruops.onClick = this.navigateToSignatoryform.bind(this);
          this.isEditEnabled = applicationManager.getConfigurationManager().checkUserPermission('SIGNATORY_GROUP_CREATE_EDIT');
          if (this.isEditEnabled === false)
             this.view.btnCreateNewGroup.setVisibility(false);
          else
            this.view.btnCreateNewGroup.setVisibility(true);
            this.view.btnCreateNewGroup.onClick = function() {
                scope.navigateToCreateNewGroup();
            }.bind(this);
            this.view.flxImgClose.onClick = function() {
                scope.view.flxAckHeader.isVisible = false;
            }.bind(this);
        },
        navigateToCreateNewGroup: function() {
            applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroup");
        },
        frmPostShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        navigateToSignatoryform: function() {
            this.presenter.getAllSignatoryGroupsbyCoreCustomerIds();
        },
        onBreakpointChange: function(form, width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        setHeadersfromAccountLevel: function() {
            if (this.entryPoint === "frmApprovalsMatrixAccountLevel") {
                this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.accountlevelmatrix");
                this.view.btnAccountLevelMatrix.text = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.viewAccounts");
            } else {
                this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("kony.18n.approvalMatrix.customerLevellbl");
                this.view.btnAccountLevelMatrix.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.accountLevelbtn");
            }
        },
        updateFormUI: function(viewModel) {
            if (viewModel) {
                if (!kony.sdk.isNullOrUndefined(viewModel.isLoading)) {
                    if (viewModel.isLoading) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (viewModel.approvalMatrix) {
                    this.matrix = viewModel.approvalMatrix;
                    this.nonFinMatrix = viewModel.nonFinMatrix;
                    this.contractDetails = viewModel.contractDetails;
                    this.showApprovalMatrixWrapper(viewModel);
                }
                if (viewModel.approvalMatrixFailure) {
                    this.showApprovalMatrix([], 0, viewModel.approvalMatrixFailure.errorMessage);
                }
                if (viewModel.updateStatusError) {
                    this.showErrorMessage(viewModel.updateStatusError);
                }
                if (viewModel.isFeatures) {
                    this.setFeatures(viewModel.data);
                    this.setFeaturesComponent();
                    if (this.nonFinDropDown !== undefined && this.nonFinDropDown === "P") this.selectFirstNonFinFeature();
                    else this.selectFirstFeature();
                }
                if (viewModel.signatoryGroups) {
                    this.setSignatoryGroups(viewModel.signatoryGroups);
                }
                if (viewModel.deleteSignatoryDetails) {
                    this.deleteSignatoryGroup(viewModel.deleteSignatoryDetails);
                }
            }
        },
       deleteSignatoryGroup: function(response) {
         //   this.view.flxAckHeader.isVisible = true;
         var input = {
           "contractId": applicationManager.getConfigurationManager().contractId,
           "coreCutomerId": applicationManager.getConfigurationManager().coreCustomerId
         };
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups(input,response);
           // kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewUIModule").presentationController.getAllSignatoryGroups();
        },
      setSignatoryGroups: function(response) {
        this.view.flxApprovalMatrixContainer.isVisible = false;
        this.view.flxSignatoryGroups.isVisible = true;
        this.view.flxAccountName.isVisible = false;
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("konybb.settings.signatoryGroups");

        var status = response.detele;
        if (status === undefined) {
          this.view.flxAckHeader.isVisible = false;
        } else {
          if (status.data.status) {
            this.view.flxAckHeader.isVisible = true;
          }
        }
        if (response.data.coreCustomers.length === 0) {
          this.view.flxSegSignatoryGroups.isVisible = false;
          this.view.flxSearchContainer.isVisible = false;
          this.view.flxNoRecords.isVisible = true;
          this.view.lblCustomerHeaderValue.text = applicationManager.getConfigurationManager().coreCustomerNameTruncated  || "";
          this.view.lblCustomerHeaderValue.toolTip = applicationManager.getConfigurationManager().coreCustomerName || "";
          this.view.lblCustomerIDValue.text = applicationManager.getConfigurationManager().coreCustomerID || "";
          this.view.lblContractValue.text =  applicationManager.getConfigurationManager().contractNameTruncated || "";
          this.view.lblContractValue.toolTip =  applicationManager.getConfigurationManager().contractName || "";
        } else {
          var data = response.data.coreCustomers[0].signatoryGroups;
          this.view.flxSegSignatoryGroups.isVisible = true;
          this.view.flxSearchContainer.isVisible = true;
          this.view.flxNoRecords.isVisible = false;
          applicationManager.getConfigurationManager().contractId = response.data.coreCustomers[0].contractId;
          applicationManager.getConfigurationManager().coreCustomerId = response.data.coreCustomers[0].coreCustomerId;
          this.contractsApprovalMatrix = [this.getSegmentDataForContracts(data)];
          this.view.segSignatoryGroups.widgetDataMap = this.getContractsWidgetDataMap();
          var sectionData = this.getSectionDataForContracts();
          this.view.segSignatoryGroups.setData(this.contractsApprovalMatrix);
          this.sortContractsData("imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"])
          this.view.tbxSearchSignatoryGroups.onKeyUp = this.searchContractDetails;
          var coreCustomerName;
          var contractName;
          var coreCustomerNameTruncated;
          var contractNameTruncated;
          if (!kony.sdk.isNullOrUndefined(response.data.coreCustomers[0].coreCustomerName)) {
            coreCustomerName = response.data.coreCustomers[0].coreCustomerName.slice();
            coreCustomerNameTruncated = coreCustomerName;
            if (response.data.coreCustomers[0].coreCustomerName.length > 25) {
              coreCustomerNameTruncated = response.data.coreCustomers[0].coreCustomerName.substring(0, 22) + "...";
            }
          }
          if (!kony.sdk.isNullOrUndefined(response.data.coreCustomers[0].contractName)) {
            contractName = response.data.coreCustomers[0].contractName.slice();
            contractNameTruncated = contractName;
            if (response.data.coreCustomers[0].contractName.length > 25) {
              contractNameTruncated = response.data.coreCustomers[0].contractName.substring(0, 22) + "...";
            }
          }
          this.view.lblCustomerHeaderValue.text = coreCustomerNameTruncated || "";
          this.view.lblCustomerHeaderValue.toolTip = coreCustomerName || "";
          this.view.lblCustomerIDValue.text = response.data.coreCustomers[0].coreCustomerId || "";
          this.view.lblContractValue.text = contractNameTruncated || "";
          this.view.lblContractValue.toolTip = contractName || "";
          applicationManager.getConfigurationManager().coreCustomerNameTruncated = coreCustomerNameTruncated;
          applicationManager.getConfigurationManager().coreCustomerName = coreCustomerName;
          applicationManager.getConfigurationManager().coreCustomerID = response.data.coreCustomers[0].coreCustomerId;
          applicationManager.getConfigurationManager().contractNameTruncated = contractNameTruncated;
          applicationManager.getConfigurationManager().contractName = contractName;
        }

      },
		 getSegmentDataForContracts: function(contracts) {
            var sectionData = this.getSectionDataForContracts();
            var rowData = this.getRowDataForContracts(contracts);
            return ([sectionData, rowData]);
        },
		 getRowDataForContracts: function(data) {
            var scopeObj = this;
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            if (data.length === 0) {
                return ([this.adjustRowContainers(data)]);
            }
            data.forEach(contract => {
                contract.btnAction = {
                    "text": settingsnew.getActionNameBasedOnPermissionsSignatory() ,
                    "onClick": function(eventobject, content) {
                      var section = content.sectionIndex ;
						var rowIndex = content.rowIndex ;
						var signatoryId = scopeObj.view.segSignatoryGroups.data[0][1][rowIndex].signatoryGroupId ;
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getSignatoryGroupDetails(signatoryId);
                    },
                };
              contract.createdDate = CommonUtilities.getFrontendDateStringInUTC(contract.createdDate, "mm/dd/yyyy") ;
                contract = Object.assign(contract, this.adjustRowContainers(data));
            });
            return data;
        },
		 searchContractDetails: function() {
            FormControllerUtility.showProgressBar(this.view);
            var seachKey = this.view.tbxSearchSignatoryGroups.text;
            var segmentData = this.contractsApprovalMatrix;
          
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            var filteredData = settingsnew.searchSegmentData(segmentData, 0, seachKey);
            if (filteredData[0][1].length === 0) filteredData[0][1] = [this.adjustRowContainers([])];
            this.view.segSignatoryGroups.setData(filteredData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
		 adjustRowContainers: function(rowData) {
            var isEmpty = (rowData.length === 0);
            return ({
                "flxNoRecords": {
                    "isVisible": isEmpty
                },
                "lblNoRecords": {
                    "text": "No records are available"
                },
                "flxHeadersContainer": {
                    "isVisible": !isEmpty
                },
                "lblRowSeparator": {
                    "isVisible": !isEmpty,
                    "text": "-"
                },
                "flxApprovalMatrixContractRow": {
                    "height": isEmpty ? "300dp" : "45dp"
                }
            });
        },
        getContractsWidgetDataMap: function() {
            return ({
                "lblCustomerNameHeader": "lblCustomerNameHeader",
                "lblCustomerIDHeader": "lblCustomerIDHeader",
                "lblContractHeader": "lblContractHeader",
                "lblActionHeader": "lblActionHeader",
                "imgCustomerNameSort": "imgCustomerNameSort",
                "imgContractSort": "imgContractSort",
                "imgCustIDSort":"imgCustIDSort",
                "lblTopSeparator": "lblTopSeparator",
                "lblBottomSeparator": "lblBottomSeparator",
                "flxCustomerName": "flxCustomerName",
                "flxContract": "flxContract",
                "flxCustID":"flxCustID",
                "lblRowSeparator": "lblRowSeparator",
                "lblCustomerName": "signatoryGroupName",
                "lblCustomerID": "noOfUsers",
                "lblContract": "createdDate",
                "btnAction": "btnAction",
                "flxNoRecords": "flxNoRecords",
                "lblNoRecords": "lblNoRecords",
                "flxHeadersContainer": "flxHeadersContainer",
                "flxApprovalMatrixContractRow": "flxApprovalMatrixContractRow"
            });
        },
        getSectionDataForContracts: function() {
		  var GroupName = kony.i18n.getLocalizedString("i18n.accountDetail.customerName");
          var CreatedOn = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
          var Action = kony.i18n.getLocalizedString("i18n.transfers.lblAction");
          var Totalusers = kony.i18n.getLocalizedString("i18n.approvals.totalUser");
            return ({
                "lblCustomerNameHeader": {
                    "text": GroupName
                },
                "lblCustomerIDHeader": {
                    "text": Totalusers
                },
                "lblContractHeader": {
                    "text": CreatedOn
                },
                "lblActionHeader": {
                    "text": Action
                },
                "lblTopSeparator": {
                    "text": "-"
                },
                "lblBottomSeparator": {
                    "text": "-"
                },
                "imgCustomerNameSort": {
                    "src": "sorting.png"
                },
                "imgContractSort": {
                    "src": "sorting.png"
                },
               "imgCustIDSort": {
                "src": "sorting.png"
               },
              "flxCustomerName": {
                "onClick": this.sortContractsData.bind(this, "imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"])
              },
              "flxContract": {
                "onClick": this.sortContractsData.bind(this, "imgContractSort", this.getContractsWidgetDataMap()["lblContract"])
              },
              "flxCustID": {
                "onClick": this.sortContractsData.bind(this, "imgCustIDSort", this.getContractsWidgetDataMap()["lblCustomerID"])
              }
            });
        },
		sortContractsData: function(imgWidget, sortKey) {
            FormControllerUtility.showProgressBar(this.view);
            var segmentData = this.view.segSignatoryGroups.data;
            if(imgWidget!== "imgCustomerNameSort")segmentData[0][0]["imgCustomerNameSort"].src = "sorting.png";
            if(imgWidget!== "imgContractSort")segmentData[0][0]["imgContractSort"].src = "sorting.png";
            if(imgWidget!== "imgCustIDSort")segmentData[0][0]["imgCustIDSort"].src = "sorting.png";
            var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
            settingsnew.sortSegmentData(segmentData, 0, imgWidget, sortKey);
            this.view.segSignatoryGroups.setData(segmentData);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        showErrorMessage: function(error) {
            this.view.flxDowntimeWarning.isVisible = true;
            this.view.rtxDowntimeWarning.text = error.errorMessage;
            this.view.forceLayout();
        },
        searchFeature: function() {
            var segData = this.view.Features.segTemplates.data;
            this.nonFinDropDown = segData[1][0].lblDropDown.text;
            this.collapseSection();
            var searchKey = this.view.tbxSearch.text;
            this.presenter.searchFeaturesSegmentData(searchKey);
        },
        navigateToAccountLevelForm: function() {
            this.presenter.navigateToAccountLevel(this.contractDetails);
        },
        doLogout: function(contextAction) {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "AuthenticationMA",moduleName: "AuthUIModule"});
            var context = {
                action: contextAction
            };
            authModule.presentationController.doLogout(context);
        },
        disableApprovalMatrix: function() {
            var selectedIndex = this.view.switchApprovals.selectedIndex;
            var isDisabled = "false";
            if (selectedIndex === 1) {
                isDisabled = "true";
            }
            FormControllerUtility.showProgressBar(this.view);
            this.presenter.updateApprovalMatrixStatus(this.contractDetails, isDisabled);
        },
        setIdleTimeOut: function() {
            kony.application.registerForIdleTimeout(applicationManager.getConfigurationManager().constants.IDLE_TIMEOUT, this.doLogout.bind(this, "SessionExpired"));
        },
        navigateToEntryPoint: function() {
            if (this.entryPoint === "frmApprovalsMatrixAccountLevel") {
                this.presenter.noServiceNavigateToAccountLevel();
            } else {
                this.presenter.enterProfileSettings("approvalMatrix");
            }
        },
        getFeatureSectionHeaders: function() {
            return ([{
                "flxDropDown": {
                    "onClick": function() {
                        var segData = this.view.Features.segTemplates.data;
                        var sectionData = segData[0][0];
                        if (sectionData.lblDropDown.text === "O") {
                            this.selectFirstFeature();
                        } else {
                            this.collapseSection();
                        }
                        this.view.forceLayout();
                    }.bind(this)
                },
                "lblDropDown": {
                    "text": "O"
                },
                "lblAccountSelect": {
                    "text": kony.i18n.getLocalizedString("konybb.approvals.monetary")
                }
            }, {
                "flxDropDown": {
                    "onClick": function() {
                        var segData = this.view.Features.segTemplates.data;
                        var sectionData = segData[1][0];
                        if (sectionData.lblDropDown.text === "O") {
                            this.selectFirstNonFinFeature();
                        } else {
                            this.collapseSection();
                        }
                        this.view.forceLayout();
                    }.bind(this)
                },
                "lblDropDown": {
                    "text": "O"
                },
                "lblAccountSelect": {
                    "text": kony.i18n.getLocalizedString("konybb.approvals.nonmonetary")
                }
            }]);
        },
        collapseSection: function() {
            this.view.Features.collapseSection({
                "lblDropDown": {
                    "text": "O"
                }
            });
        },
        selectFirstFeature: function() {
            this.view.Features.addRowsAndUpdateSection(this.features, 0, {
                "lblDropDown": {
                    "text": "P"
                }
            }, {
                "lblDropDown": {
                    "text": "O"
                }
            });
        },
        selectFirstNonFinFeature: function() {
            this.view.Features.addRowsAndUpdateSection(this.nonFinFeatures, 1, {
                "lblDropDown": {
                    "text": "P"
                }
            }, {
                "lblDropDown": {
                    "text": "O"
                }
            });
        },
        setFeaturesComponent: function() {
            this.view.Features.segTemplates.rowTemplate = "flxFeaturesContainer";
            this.view.Features.segTemplates.sectionHeaderTemplate = "flxFeatureSelectionPermissions";
            this.view.Features.segTemplates.widgetDataMap = {
                "lblRoleName": "actionName",
                "flxSelectRole": "flxSelectRole",
                "imgArrow": "imgArrow",
                "flxDropDown": "flxDropDown",
                "lblDropDown": "lblDropDown",
                "lblAccountSelect": "lblAccountSelect"
            };
            this.view.Features.addOnlySectionHeaders(this.getFeatureSectionHeaders());
            this.view.Features.segTemplates.onRowClick = this.segmentRowClickHandler.bind(this);
        },
        setContractDetails: function(contractDetails) {
            this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix");
            var coreCustomerName;
            var contractName;
            var coreCustomerNameTruncated;
            var contractNameTruncated;
            this.setHeadersfromAccountLevel();
            if (!kony.sdk.isNullOrUndefined(contractDetails.coreCustomerName)) {
                coreCustomerName = contractDetails.coreCustomerName.slice();
                coreCustomerNameTruncated = coreCustomerName;
                if (contractDetails.coreCustomerName.length > 25) {
                    coreCustomerNameTruncated = contractDetails.coreCustomerName.substring(0, 22) + "...";
                }
            }
            if (!kony.sdk.isNullOrUndefined(contractDetails.contractName)) {
                contractName = contractDetails.contractName.slice();
                contractNameTruncated = contractName;
                if (contractDetails.contractName.length > 25) {
                    contractNameTruncated = contractDetails.contractName.substring(0, 22) + "...";
                }
            }
            this.view.lblCustomerHeaderValue.text = coreCustomerNameTruncated || "";
            this.view.lblCustomerHeaderValue.toolTip = coreCustomerName || "";
            this.view.lblCustomerIDValue.text = contractDetails.coreCustomerID || "";
            this.view.lblContractValue.text = contractNameTruncated || "";
            this.view.lblContractValue.toolTip = contractName || "";
            this.isTotalApproversVisible = true;
            if (!kony.sdk.isNullOrUndefined(contractDetails.accountId) && contractDetails.accountId !== "") {
                this.view.flxAccountName.isVisible = true;
                this.view.lblAccountNameValue.text = contractDetails.accountName || "";
            } else {
                this.view.flxAccountName.isVisible = false;
            }
            this.view.lblViewEditHeader.text = kony.i18n.getLocalizedString("i18n.locateus.view") + ((this.isMatrixDisabled) ? "" : " & " + kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent")) + " " + kony.i18n.getLocalizedString("i18n.konybb.permissions");
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        showOrHideSwitch: function() {
            var accountId = this.contractDetails.accountId;
            if (kony.sdk.isNullOrUndefined(accountId) || accountId === "") {
                this.view.flxSwitchContainer.isVisible = this.isManageEnabled;
            } else {
                this.view.flxSwitchContainer.isVisible = false;
            }
        },
        setFeatures: function(allFeatures) {
            this.features = [];
            this.nonFinFeatures = [];
            var scope = this;
            allFeatures.forEach(function(feat) {
                if (feat.isMonetary) scope.features.push(feat);
                else scope.nonFinFeatures.push(feat);
            });
        },
        showApprovalMatrixWrapper: function(viewModel) {
            this.view.flxApprovalMatrixContainer.isVisible = true;
            this.view.flxSignatoryGroups.isVisible = false;
            this.entryPoint = viewModel.entryPoint;
            this.setFeatures(viewModel.features);
            this.showOrHideSwitch();
            this.collapseSection();
            this.setFeaturesComponent();
            this.selectFirstFeature();
            this.setContractDetails(viewModel.contractDetails);
            this.contractData = viewModel.contractDetails;
            if (viewModel.entryPoint === "frmApprovalmatrix") this.segmentRowClickHandler(this.view.Features.segTemplates, 0, 0);
            else this.segmentRowClickHandler(this.view.Features.segTemplates, 0, this.selectedIndex);
            this.view.switchApprovals.onTouchEnd = this.disableApprovalMatrix.bind(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        segmentRowClickHandler: function(segWidget, sectionIndex, rowIndex) {
            this.selectedIndex = rowIndex;
            FormControllerUtility.showProgressBar(this.view);
            this.setSelectedIndicator(segWidget, sectionIndex, rowIndex);
            this.setApprovalMatrixForFeature(segWidget.data[sectionIndex][1][rowIndex].actionId, sectionIndex);
            FormControllerUtility.hideProgressBar(this.view);
        },
        setApprovalMatrixForFeature: function(actionId, sectionIndex) {
            this.actionID = actionId;
            var approvalMatrix = sectionIndex === 0 ? this.matrix[actionId] : this.nonFinMatrix[actionId];
            this.showApprovalMatrix(approvalMatrix, sectionIndex);
        },
        setSelectedIndicator: function(segWidget, sectionIndex, rowIndex) {
            var segData = segWidget.data[sectionIndex][1];
            segData.forEach(function(row, index) {
                if (index === rowIndex) {
                    row["imgArrow"].isVisible = true;
                } else {
                    row["imgArrow"].isVisible = false;
                }
            });
            segWidget.setData(segWidget.data);
            this.view.forceLayout();
        },
        showApprovalMatrix: function(segmentData, sectionIndex, errorMessage) {
            this.view.flxApprovalMatrixContainer.isVisible = true;
            this.view.flxSignatoryGroups.isVisible = false;
            if (kony.sdk.isNullOrUndefined(segmentData) || segmentData.length <= 0) {
                this.view.segApprovalMatrix.isVisible = false;
                this.view.flxNoApprovalMatrixData.isVisible = true;
                var serviceFailure = !kony.sdk.isNullOrUndefined(errorMessage);
                this.view.flxNoApprovalMatrixData.lblNoApprovalMatrixData.text = serviceFailure === true ? errorMessage : kony.i18n.getLocalizedString("i18n.approvalMatrix.emptyListOfAprovalMatrix");
            } else {
                this.view.segApprovalMatrix.isVisible = true;
                this.view.flxNoApprovalMatrixData.isVisible = false;
                this.view.flxNoApprovalMatrixData.lblNoApprovalMatrixData.text = "";
                this.view.segApprovalMatrix.widgetDataMap = {
                    "flxApprovalMatrixRow": "flxApprovalMatrixRow",
                    "flxLimit1": "flxLimit1",
                    "lblFeatureAction": "limitType",
                    "btnEditMatrix": "btnEditMatrix",
                    "lblSeparator1": "lblSeparator1",
                    "lblSeparator2": "lblSeparator2",
                    "lblSeparator3": "lblSeparator3",
                    "lblApprovalLimits": "lblApprovalLimits",
                    "lblApprovers": "lblApprovers",
                    "lblNumOfApprovers": "lblNumOfApprovers",
                    "lblApprovalRule": "lblApprovalRule",
                    "lblApprovalLimitsValue": "range",
                    "lblApproversValue": "approvers",
                    "lblApprovalNumbers": "totalApprovals",
                    "lblApprovalRuleValue": "rule",
                    "lblNoApprovalRulesDefined": "noApprovalRulesDefined",
                    "flxNoRecords": "flxNoRecords",
                    "imgNoRecordsIcon": "imgNoRecordsIcon"
                };
                if (sectionIndex === 0) this.view.segApprovalMatrix.setData(this.prepareSegmentDataForApprovalMatrix(segmentData));
                else this.view.segApprovalMatrix.setData(this.prepareSegmentDataForApprovalMatrixNonMonetary(segmentData));
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        prepareSegmentDataForApprovalMatrixNonMonetary: function(approvalMatrix) {
            var self = this;
            var segData = [];
            segData.push([{
                "limitType": approvalMatrix.actionName
            }]);
            var i = 0;
            segData.forEach(function(section) {
                section[0]["lblSeparator2"] = "A";
                section[0]["lblSeparator3"] = "A";
                section[0]["btnEditMatrix"] = {
                    isVisible: self.isManageEnabled && !self.isMatrixDisabled,
                    text: kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"),
                    onClick: self.onEditOfFeatureAction.bind(self, false)
                };
                section[0]["lblApprovalLimits"] = {
                    "isVisible": false
                };
                section[0]["lblApprovers"] = {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.common.Approver") + "/s",
                    "left": "3.33%"
                };
                section[0]["lblNumOfApprovers"] = {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ApprovalMatrix.TotalApprovers"),
                    "isVisible": self.isTotalApproversVisible
                };
                section[0]["lblApprovalRule"] = kony.i18n.getLocalizedString("i18n.konybb.ApprovalMatrix.ApprovalRule");
                section[1] = self.prepareApprovalNonFinMatrixViewRows(approvalMatrix["NON_MONETARY_LIMIT"][i]);
                i++;
            });
            return segData;
        },
        prepareApprovalNonFinMatrixViewRows: function(permission) {
            var rows = [];
            var scopeObj = this;
            if (this.entryPoint === "frmApprovalsMatrixAccountLevel") {
                rule = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.noapproval");
            } else {
                rule = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.customerlevelruleNonFin");
            }
            if (permission === undefined || (permission.approvers[0].approverName === "") || (permission.approvalRuleId === "NO_APPROVAL")) {
                rows.push({
                    flxLimit1: {
                        isVisible: false
                    },
                    flxApprovalMatrixRow: {
                        height: "100dp"
                    },
                    range: "",
                    approvers: {
                        text: "",
                        toolTip: ""
                    },
                    lblSeparator1: "A",
                    rule: "",
                    totalApprovals: {
                        "text": "-",
                        "isVisible": this.isTotalApproversVisible
                    },
                    flxNoRecords: {
                        isVisible: true
                    },
                    imgNoRecordsIcon: {
                        src: "info_grey.png"
                    },
                    noApprovalRulesDefined: {
                        text: rule
                    }
                });
                return rows;
            }
            var approversExtendedList = scopeObj.getApprovers(permission["approvers"]);
            var approversShortendList = approversExtendedList.length > 30 ? approversExtendedList.substring(0, 30) + "..." : approversExtendedList;
            var row = {
                flxLimit1: {
                    isVisible: true
                },
                flxApprovalMatrixRow: {
                    height: "50dp"
                },
                range: {
                    "text": "",
                    "isVisible": false
                },
                approvers: {
                    text: approversShortendList,
                    toolTip: approversExtendedList,
                    left: "3.33%"
                },
                rule: kony.sdk.isNullOrUndefined(permission["approvalRuleName"]) ? "No Approval Rule set" : permission["approvalRuleName"],
                noApprovalRulesDefined: {
                    isVisible: false
                },
                totalApprovals: {
                    "text": (permission["approvers"][0].approverName === "") ? "0" : permission["approvers"].length.toString(),
                    "isVisible": scopeObj.isTotalApproversVisible
                },
                lblSeparator1: "A",
                flxNoRecords: {
                    isVisible: false
                }
            };
            rows.push(row);
            return rows;
        },
        getApprovalMatrixSectionHeaders: function() {
            return ([
                [{
                    "limitType": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.perTransactionLimit")
                }],
                [{
                    "limitType": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.dailyTransactionLimit")
                }],
                [{
                    "limitType": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.weeklyTransactionLimit")
                }]
            ]);
        },
        getLimitIdBasedOnType: function(limit) {
            if (limit === kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.dailyTransactionLimit")) {
                return "DAILY_LIMIT";
            } else if (limit === kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.perTransactionLimit")) {
                return "MAX_TRANSACTION_LIMIT";
            } else if (limit === kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.weeklyTransactionLimit")) {
                return "WEEKLY_LIMIT";
            }
        },
        prepareSegmentDataForApprovalMatrix: function(approvalMatrix) {
            var self = this;
            var segData = this.getApprovalMatrixSectionHeaders();
            segData.forEach(function(section) {
                section[0]["lblSeparator2"] = "A";
                section[0]["lblSeparator3"] = "A";
                section[0]["btnEditMatrix"] = {
                    isVisible: self.isManageEnabled && !self.isMatrixDisabled,
                    text: kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"),
                    onClick: self.onEditOfFeatureAction.bind(self, true)
                };
                section[0]["lblApprovalLimits"] = kony.i18n.getLocalizedString("i18n.konybb.approvalMatrix.ApprovalLimits");
                section[0]["lblApprovers"] = kony.i18n.getLocalizedString("i18n.konybb.common.Approver") + "/s";
                section[0]["lblNumOfApprovers"] = {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.ApprovalMatrix.TotalApprovers"),
                    "isVisible": self.isTotalApproversVisible
                };
                section[0]["lblApprovalRule"] = kony.i18n.getLocalizedString("i18n.konybb.ApprovalMatrix.ApprovalRule");
                section[1] = self.prepareApprovalMatrixViewRows(approvalMatrix[self.getLimitIdBasedOnType(section[0].limitType)]);
            });
            return segData;
        },
        prepareApprovalMatrixViewRows: function(limits) { //noApprovalRulesDefined to be added for first time scenario
            var scopeObj = this;
            var rows = [];
            var rule;
            if (this.entryPoint === "frmApprovalsMatrixAccountLevel") {
                rule = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.noapproval");
            } else {
                rule = kony.i18n.getLocalizedString("kony.18n.approvalmatrix.customerlevelrule");
            }
            if (limits.length === 0 || (limits[0]["lowerlimit"] === "-1.00" && limits[0]["upperlimit"] === "-1.00")) {
                rows.push({
                    flxLimit1: {
                        isVisible: false
                    },
                    flxApprovalMatrixRow: {
                        height: "100dp"
                    },
                    range: "",
                    approvers: {
                        text: "",
                        toolTip: ""
                    },
                    lblSeparator1: "A",
                    rule: "",
                    totalApprovals: {
                        "text": "-",
                        "isVisible": scopeObj.isTotalApproversVisible
                    },
                    flxNoRecords: {
                        isVisible: true
                    },
                    imgNoRecordsIcon: {
                        src: "info_grey.png"
                    },
                    noApprovalRulesDefined: {
                        text: rule
                    }
                });
                return rows;
            }
            for (var i = 0; i < limits.length; i++) {
                var approversExtendedList = scopeObj.getApprovers(limits[i]["approvers"]);
                var approversShortendList = approversExtendedList.length > 30 ? approversExtendedList.substring(0, 30) + "..." : approversExtendedList;
                var row = {
                    flxLimit1: {
                        isVisible: true
                    },
                    flxApprovalMatrixRow: {
                        height: "50dp"
                    },
                    range: scopeObj.calculateRange(limits[i]["lowerlimit"], limits[i]["upperlimit"]),
                    approvers: {
                        text: approversShortendList,
                        toolTip: approversExtendedList
                    },
                    rule: kony.sdk.isNullOrUndefined(limits[i]["approvalRuleName"]) ? "No Approval Rule set" : limits[i]["approvalRuleName"],
                    noApprovalRulesDefined: {
                        isVisible: false
                    },
                    totalApprovals: {
                        "text": (limits[i]["approvers"][0].approverName === "") ? "0" : limits[i]["approvers"].length.toString(),
                        "isVisible": scopeObj.isTotalApproversVisible
                    },
                    lblSeparator1: "A",
                    flxNoRecords: {
                        isVisible: false
                    }
                };
                rows.push(row);
            }
            return rows;
        },
        getApprovers: function(approvalsList) {
            var approvers = approvalsList[0]["approverName"];
            for (var i = 1; i < approvalsList.length; i++) {
                approvers = approvers + ", " + approvalsList[i]["approverName"];
            }
            if (approvers === "") {
                approvers += "No Approvers set";
            }
            return approvers;
        },
        calculateRange: function(lowerLimit, upperLimit) {
            var result = "";
            var formattedLowerLimit = applicationManager.getFormatUtilManager().formatAmount(lowerLimit);
            var formattedUpperLimit = applicationManager.getFormatUtilManager().formatAmount(upperLimit);
            if (lowerLimit != -1 && upperLimit != -1) {
                result = this.currencyCode + formattedLowerLimit + " - " + this.currencyCode + formattedUpperLimit;
            } else if (lowerLimit == -1 && upperLimit == -1) {
                result = "Above " + 1;
            } else if (lowerLimit == -1) {
                result = "Up to " + this.currencyCode + formattedUpperLimit;
            } else if (upperLimit == -1) {
                result = "Above " + this.currencyCode + formattedLowerLimit;
            }
            return result;
        },
        onEditOfFeatureAction: function(isMonetary, eventObject, context) {
            var scopeObj = this;
            var sectionIndex = context.sectionIndex;
            var actionID = this.actionID;
            var selectedActionFeature = isMonetary ? this.matrix[actionID] : this.nonFinMatrix[actionID];
            var limitstatements = [];
            var frequency = "";
            if (isMonetary) {
                if (sectionIndex === 0) {
                    frequency = "MAX_TRANSACTION_LIMIT";
                    limitstatements = selectedActionFeature["MAX_TRANSACTION_LIMIT"];
                }
                if (sectionIndex === 1) {
                    frequency = "DAILY_LIMIT";
                    limitstatements = selectedActionFeature["DAILY_LIMIT"];
                }
                if (sectionIndex === 2) {
                    frequency = "WEEKLY_LIMIT";
                    limitstatements = selectedActionFeature["WEEKLY_LIMIT"];
                }
            } else {
                frequency = "NON_MONETARY_LIMIT";
                limitstatements = selectedActionFeature["NON_MONETARY_LIMIT"];
            }
            FormControllerUtility.showProgressBar(scopeObj.view);
            scopeObj.prevApprovalMatrixData = {
                accountId: this.contractData.accountId ? this.contractData.accountId : "",
                accountName: this.contractData.accountName ? this.contractData.accountName : "",
                coreCustomerID: this.contractData.coreCustomerID,
                coreCustomerName: this.contractData.coreCustomerName,
                contractName: this.contractData.contractName,
                contractId: this.contractData.contractId,
                featureAction: {
                    featureActionId: selectedActionFeature.actionId,
                    featureActionName: selectedActionFeature.featureName,
                    featureActionDescription: selectedActionFeature.actionName,
                    featureActionLimit: "",
                    isAccountLevel: selectedActionFeature.isAccountLevel
                },
                frequency: frequency,
                actionId: selectedActionFeature.actionId,
                limits: scopeObj.getLimitsFromEditData(limitstatements),
                limitStatements: limitstatements,
                isMonetary: isMonetary
            };
            this.presenter.getCoreCustomerFeatureActionLimits(scopeObj.prevApprovalMatrixData);
        },
        getLimitsFromEditData: function(limitStatments) {
            var limits = [];
            var approversList = [];
            for (var i = 0; i < limitStatments.length; i++) {
                var limitStatment = limitStatments[i];
                for (var j = 0; j < limitStatment["approvers"].length; j++) {
                    approversList.push({
                        "approverId": limitStatment["approvers"][j]["approverId"]
                    });
                }
                var deformattedLower = applicationManager.getFormatUtilManager().deFormatAmount(limitStatment["lowerlimit"]);
                var deformattedUpper = applicationManager.getFormatUtilManager().deFormatAmount(limitStatment["upperlimit"]);
                var limit = {
                    lowerlimit: deformattedLower,
                    upperlimit: deformattedUpper,
                    approvalruleId: limitStatment["approvalRuleId"],
                    approvers: approversList
                }
                limits.push(limit);
            }
            return limits;
        },
    };
});