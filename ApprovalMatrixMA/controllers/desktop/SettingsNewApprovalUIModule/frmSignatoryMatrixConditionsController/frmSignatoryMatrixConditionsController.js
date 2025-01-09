define(['FormControllerUtility'], function(FormControllerUtility) {
  //Type your controller code here 
  return {

    doInit: function() {
      this.allSignatoryValues = {};

      this.actionID = "";
      this.contractData = {};
      this.isTotalApproversVisible = false;
      this.isMatrixDisabled = false;
    },
    frmPreShow: function() {
      var scope = this;
      this.valueUpdated = "";
      this.view.flxConditionPartMain.removeAll(this.view.flxConditionPartMain.widgets());
      this.view.flxFormContent.onClick = this.closeAllDropDown;
      this.view.flxHeader.onClick = this.closeAllDropDown;
      this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix"));
      //    FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain', 'flxFormContent']);
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
      // this.view.btnBack.onClick = this.navigateToEntryPoint.bind(this);
      this.setIdleTimeOut();
      //       this.view.btnAccountLevelMatrix.onClick = this.navigateToAccountLevelForm.bind(this);
      //       this.view.tbxSearch.onKeyUp = this.searchFeature.bind(this);
      //       this.view.tbxSearch.text = "";
      //       this.view.flxDowntimeWarning.isVisible = false;
      //       this.isManageEnabled = applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_MANAGE');
      //       this.configManager = applicationManager.getConfigurationManager();
      //       this.currencyCode = this.configManager.configurations.items.CURRENCYCODE;
      //       this.view.btnBackSignatoryGruops.onClick = this.navigateToSignatoryform.bind(this);
      this.conditionCount = {};
      this.conditionFlex = [];
      this.andConditionFlex = {};
      this.prevSectionCount = "";
      this.prevCurrenctCondition = "";
      this.prevdropDownName = "";
      this.view.imgAckClose.onTouchEnd = function(){
        scope.view.flxAcknowledgementPopup.setVisibility(false);
      };
      this.sectionCount = 0;
      var navMan = applicationManager.getNavigationManager();
     // this.view.flxApprovalConditionContainer.height = "540dp";
      this.view.btnAddNewCondition.onClick = this.addNewCondition;
      this.allSignatoryGroupValues(navMan.getCustomInfo("AllSignatoryGroups"));
      this.rangeDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_RANGE");
      
      if(kony.sdk.isNullOrUndefined(this.rangeDetails.conditions.groupRule) || this.rangeDetails.conditions.groupRule ==="[]"){
        this.unfilledData = "Yes";
        FormControllerUtility.disableButton(this.view.btnConfirmSave);
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix") + " - " + kony.i18n.getLocalizedString("i18n.SignatoryMatrix.CreateRule")  + " - " + kony.i18n.getLocalizedString("i18n.SignatoryMatrix.AddCondition");
        this.createApprovalConditionSection(this.sectionCount);
      }else{
        this.unfilledData = "";
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix") + " - " + kony.i18n.getLocalizedString("i18n.SignatoryMatrix.CreateRule")  + " - " + kony.i18n.getLocalizedString("i18n.SignatoryMatrix.EditCondition");
        this.editApprovalConditions(this.rangeDetails.conditions.groupRule,this.rangeDetails.conditions.groupList);
      }
      this.updateCustomerDetails();
      this.view.btnAddNewCondition.zIndex = -1;
      this.view.flxBackContainer.zIndex = 0;
      this.view.btnConfirmSave.onClick = this.manipulateRulesConditions;
      this.view.deletepopup.formActionsNew.btnCancel.onClick = function(){
        scope.view.flxDeletePopup.setVisibility(false);
      };
	  this.view.deletepopup.imgClose.onTouchEnd = function() {
        scope.view.flxDeletePopup.setVisibility(false);
      };
      this.view.btnCancel.onClick = function(){
        if(scope.valueUpdated === "Yes"){
          scope.view.flxCancelPopup.setVisibility(true);
        }else{
          scope.backToRules();
        }
      };
      this.view.cancelpopup.formActionsNew.btnCancel.onClick = function(){
        scope.view.flxCancelPopup.setVisibility(false);
      }; 
      this.view.cancelpopup.imgClose.onTouchEnd = function(){
        scope.view.flxCancelPopup.setVisibility(false);
      };
      this.view.cancelpopup.formActionsNew.btnNext.onClick = this.backToRules;
      this.view.flxAcknowledgementPopup.setVisibility(false);
            this.view.forceLayout();
      //       this.view.btnCreateNewGroup.onClick = function() {
      //         scope.navigateToCreateNewGroup();
      //       }.bind(this);
      //       this.view.flxImgClose.onClick = function() {
      //         scope.view.flxAckHeader.isVisible = false;
      //       }.bind(this);
      //       this.view.btnPTRCreateMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this);
      //       this.view.btnCreateDailyLimitsMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this);
      //       this.view.btnWeeklyLimitsCreateMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this);
      //       this.permissionKey = this.presenter.getActionNameBasedOnPermissions();
      //       if(this.permissionKey === "View"){
      //         this.editPermission = false;
      //       }else if(this.permissionKey === "View/Edit"){
      //         this.editPermission = true;
      //       }else{
      //         this.editPermission = false;
      //       }
      if(kony.i18n.getCurrentLocale() === "ar_AE"){
        if(this.view.lblRangeValue.text === "Above"){
          this.view.lblRangeValue.text = kony.i18n.getLocalizedString("i18n.signatory.above");
        }
        else if (this.view.lblRangeValue.text === "Between"){
          this.view.lblRangeValue.text = kony.i18n.getLocalizedString("i18n.between");    
        }
        else if (this.view.lblRangeValue.text === "Upto"){
          this.view.lblRangeValue.text = kony.i18n.getLocalizedString("i18n.signatory.upto");
        }
      }
    },

    updateCustomerDetails:function(){
      var scope = this;
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      var data = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var currency = (kony.sdk.isNullOrUndefined(data["DAILY_LIMIT"][0].currency))?'USD':data["DAILY_LIMIT"][0].currency;
      this.currenctCurrency =   formatUtilManager.getCurrencySymbol(currency);
       if(!scope.isEmptyNullorUndefined(accountDetails.accountName)){
        scope.view.lblAccountNameHeader.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.account");
        scope.view.lblAccountNameValue.text = accountDetails.accountName;
      }
      if(!scope.isEmptyNullorUndefined(accountDetails.coreCustomerID)){
        scope.view.lblCustomerIDValue.text = accountDetails.coreCustomerID;
      }
      if(!scope.isEmptyNullorUndefined(accountDetails.coreCustomerName)){
        scope.view.lblAccountNameHeader.text = kony.i18n.getLocalizedString("i18n.approvals.groupName");
        scope.view.lblAccountNameValue.text = accountDetails.coreCustomerName;
        scope.view.lblCustomerHeaderValue.text = accountDetails.coreCustomerName;
      }
      if(!scope.isEmptyNullorUndefined(accountDetails.contractName)){
        scope.view.lblContractValue.text = accountDetails.contractName;
      }
      this.view.lblRangeValue.text = this.rangeDetails["key"][0].toUpperCase() + this.rangeDetails["key"].slice(1);
      this.view.lblApprovalRequiredValue.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      this.view.lblRangeLimit.text = kony.i18n.getLocalizedString("i18n.approvals.rangeLimit");
      this.view.lblApprovalRequired.text = kony.i18n.getLocalizedString("i18n.approvals.approvalRequired") + " :";
      this.view.lblRangeLimitValue.text ="$"+this.rangeDetails["conditions"]["lowerlimit"]+" - "+"$"+this.rangeDetails["conditions"]["upperlimit"];
      if(this.rangeDetails["conditions"]["lowerlimit"] === "-1.00"){
        this.view.lblRangeLimitValue.text = this.currenctCurrency+this.rangeDetails["conditions"]["upperlimit"];
      }else if(this.rangeDetails["conditions"]["upperlimit"] === "-1.00" || this.rangeDetails["conditions"]["upperlimit"] === "0.00"){
        this.view.lblRangeLimitValue.text = this.currenctCurrency+this.rangeDetails["conditions"]["lowerlimit"];
      }else{
        this.view.lblRangeLimitValue.text = this.currenctCurrency+this.rangeDetails["conditions"]["lowerlimit"]+" - "+this.currenctCurrency+this.rangeDetails["conditions"]["upperlimit"];
      }

    },

    navfrmAddRulesSignatoryGrp:function(){
      applicationManager.getNavigationManager().navigateTo("frmAddRulesSignatoryGrp");
    },
    navigateToCreateNewGroup: function() {
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroup");
    },
    frmPostShow: function() {
      this.valueUpdated = "";
      applicationManager.getNavigationManager().applyUpdates(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.flxAcknowledgementPopup.setVisibility(false);
      this.view.forceLayout();
    },
    navigateToSignatoryform: function() {
      this.presenter.getAllSignatoryGroupsbyCoreCustomerIds();
    },
    onBreakpointChange: function(form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      if (kony.application.getCurrentBreakpoint() <= 1024) {
        this.view.customfooternew.flxFooterMenu.width = "94%";
      }
    },
    setHeadersfromAccountLevel: function() {
      if (this.entryPoint === "frmAccountLevelMatrixSignatoryGrp") {
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
      this.view.flxAckHeader.isVisible = true;
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups();
    },
    setSignatoryGroups: function(response) {
      this.view.flxApprovalMatrixContainer.isVisible = false;
      this.view.flxSignatoryGroups.isVisible = true;
      this.view.flxAccountName.isVisible = false;
      //this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("konybb.settings.signatoryGroups");

      var data = response.data.signatoryGroups;
      applicationManager.getConfigurationManager().contractId = data[0].contractId;
      applicationManager.getConfigurationManager().coreCustomerId = data[0].coreCustomerId;
      this.contractsApprovalMatrix = [this.getSegmentDataForContracts(data)];
      this.view.segSignatoryGroups.widgetDataMap = this.getContractsWidgetDataMap();
      var sectionData = this.getSectionDataForContracts();
      this.view.segSignatoryGroups.setData(this.contractsApprovalMatrix);
      this.view.tbxSearchSignatoryGroups.onKeyUp = this.searchContractDetails ;

      var coreCustomerName;
      var contractName;
      var coreCustomerNameTruncated;
      var contractNameTruncated;
      if (!kony.sdk.isNullOrUndefined(data[0].coreCustomerName)) {
        coreCustomerName = data[0].coreCustomerName.slice();
        coreCustomerNameTruncated = coreCustomerName;
        if (data[0].coreCustomerName.length > 25) {
          coreCustomerNameTruncated = data[0].coreCustomerName.substring(0, 22) + "...";
        }
      }
      if (!kony.sdk.isNullOrUndefined(data[0].contractName)) {
        contractName = data[0].contractName.slice();
        contractNameTruncated = contractName;
        if (data[0].contractName.length > 25) {
          contractNameTruncated = data[0].contractName.substring(0, 22) + "...";
        }
      }
      this.view.lblCustomerHeaderValue.text = coreCustomerNameTruncated || "Temenos UK";
      this.view.lblCustomerHeaderValue.toolTip = coreCustomerName || "Temenos UK";
      this.view.lblCustomerIDValue.text = data[0].coreCustomerID || "34256452388";
      this.view.lblContractValue.text = contractNameTruncated || "Temenos Corp";
      this.view.lblContractValue.toolTip = contractName || "Temenos Corp";

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
          "text": "View/Edit",
          "onClick": function(eventobject, content) {
            var section = content.sectionIndex ;
            var rowIndex = content.rowIndex ;
            var signatoryId = scopeObj.view.segSignatoryGroups.data[0][1][rowIndex].signatoryGroupId ;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getSignatoryGroupDetails(signatoryId);
          },
        };
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
        "lblTopSeparator": "lblTopSeparator",
        "lblBottomSeparator": "lblBottomSeparator",
        "flxCustomerName": "flxCustomerName",
        "flxContract": "flxContract",
        "lblRowSeparator": "lblRowSeparator",
        "lblCustomerName": "signatoryGroupName",
        "lblCustomerID": "coreCustomerID",
        "lblContract": "createdts",
        "btnAction": "btnAction",
        "flxNoRecords": "flxNoRecords",
        "lblNoRecords": "lblNoRecords",
        "flxHeadersContainer": "flxHeadersContainer",
        "flxApprovalMatrixContractRow": "flxApprovalMatrixContractRow"
      });
    },
    getSectionDataForContracts: function() {
      return ({
        "lblCustomerNameHeader": {
          "text": "Group Name"
        },
        "lblCustomerIDHeader": {
          "text": "Total Users"
        },
        "lblContractHeader": {
          "text": "Created On"
        },
        "lblActionHeader": {
          "text": "Action"
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
        "flxCustomerName": {
          "onClick": this.sortContractsData.bind(this, "imgCustomerNameSort", this.getContractsWidgetDataMap()["lblCustomerName"])
        },
        "flxContract": {
          "onClick": this.sortContractsData.bind(this, "imgContractSort", this.getContractsWidgetDataMap()["lblContract"])
        }
      });
    },
    sortContractsData: function(imgWidget, sortKey) {
      FormControllerUtility.showProgressBar(this.view);
      var segmentData = this.view.segSignatoryGroups.data;
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
      this.isMatrixDisabled = applicationManager.getNavigationManager().getCustomInfo("CURRENT_CUSTOMER_MATRIX_STATUS");
      FormControllerUtility.showProgressBar(this.view);
      this.presenter.updateApprovalMatrixStatus(this.contractDetails,  this.isMatrixDisabled);
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
      //this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix");
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
      this.isMatrixDisabled = applicationManager.getNavigationManager().getCustomInfo("CURRENT_CUSTOMER_MATRIX_STATUS");
      if(this.isMatrixDisabled)
      {
        this.view.imgTurnOnOfApprovalCustLevl.src = "inactive_btn.png";
      }
      else
      {
        this.view.imgTurnOnOfApprovalCustLevl.src = "active_btn.png";
      }
      //this.view.switchApprovals.selectedIndex = (this.isMatrixDisabled) ? 0 : 1;
      //this.view.lblViewEditHeader.text = kony.i18n.getLocalizedString("i18n.locateus.view") + ((this.isMatrixDisabled) ? "" : " & " + kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent")) + " " + kony.i18n.getLocalizedString("i18n.konybb.permissions");
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showOrHideSwitch: function() {
      var accountId = this.contractDetails.accountId;
      if (kony.sdk.isNullOrUndefined(accountId) || accountId === "") {
        this.view.flxSwitchContainer.isVisible = false;
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
      //this.view.switchApprovals.onTouchEnd = this.disableApprovalMatrix.bind(this);
      this.view.imgTurnOnOfApprovalCustLevl.onTouchEnd = this.disableApprovalMatrix.bind(this);
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
      this.approvalMatrixList(approvalMatrix, sectionIndex);
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
        this.view.segApprovalMatrix.isVisible = false;
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
    /**     
	 * Funciton allSignatoryGroupValues
     * To groups based on ID and store globally
     */
    allSignatoryGroupValues:function(response){
      this.allSignatoryValues = {};
      this.signatoryByName = {};
      this.allSignatoryGroups = response;
      if(!kony.sdk.isNullOrUndefined(response.coreCustomers[0])){
      for(var i = 0;i<response.coreCustomers[0].signatoryGroups.length;i++){
        this.allSignatoryValues[response.coreCustomers[0].signatoryGroups[i].signatoryGroupId] = response.coreCustomers[0].signatoryGroups[i];
        this.signatoryByName[response.coreCustomers[0].signatoryGroups[i].signatoryGroupName] = response.coreCustomers[0].signatoryGroups[i];
      }
      }
    },

    /**     
	 * Funciton approvalMatrixList
     * To call the function based on monetary and non monetary
     */
    approvalMatrixList:function(segmentData, sectionIndex, errorMessage){
      this.view.flxDailyApprovalListValues.removeAll(this.view.flxDailyApprovalListValues.widgets());
      this.view.flxPTRApprovalListValues.removeAll(this.view.flxPTRApprovalListValues.widgets());
      this.view.flxWeeklyApprovalListValues.removeAll(this.view.flxWeeklyApprovalListValues.widgets());
      if (sectionIndex === 0) {
        //this.view.segApprovalMatrix.setData(this.prepareSegmentDataForApprovalMatrix(segmentData));
        this.setValuesForApprovalMatrix(segmentData);
      }
      else 
      {
        this.view.segApprovalMatrix.setData(this.prepareSegmentDataForApprovalMatrixNonMonetary(segmentData));
      }

    },

    /**     
	 * Funciton setValuesForApprovalMatrix
     * To call the function based on limits
     */
    setValuesForApprovalMatrix:function(segmentData){

      this.view.btnPTRCreateMatrix.setVisibility(this.editPermission);
      this.view.btnCreateDailyLimitsMatrix.setVisibility(this.editPermission);
      this.view.btnWeeklyLimitsCreateMatrix.setVisibility(this.editPermission);
      for(var keys in segmentData) {
        if(keys === "DAILY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxDailyLimitsNoRecords.setVisibility(false);
            this.setDailyLimitValues(segmentData[keys]);
          }else{
            this.view.flxDailyLimitsNoRecords.setVisibility(true);
          }
        }else if(keys === "WEEKLY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxWeeklyLimitsNoRecords.setVisibility(false);
            this.setWeeklyLimitValues(segmentData[keys]);
          }else{
            this.view.flxWeeklyLimitsNoRecords.setVisibility(true);
          }
        }else if(keys === "MAX_TRANSACTION_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxPTRNoRecords.setVisibility(false);
            this.setPTRLimitValues(segmentData[keys]);
          }else{
            this.view.flxPTRNoRecords.setVisibility(true);
          }
        }
      }
    },
    /**     
	 * Funciton setDailyLimitValues
     * To set the Daily limit values and create the UI
     */
    setDailyLimitValues:function(data){
      var nagativeRowCount = 0;
      for(var i=0 ;i<data.length;i++){
        if (data[i].lowerlimit !== "-1.00" && data[i].upperlimit !== "-1.00") {
          nagativeRowCount++;
          var approveRequired = "";
          var approvalLimit = "$"+data[i].lowerlimit+" - $"+data[i].upperlimit;
          var flxDailyApprovalLimit = new kony.ui.FlexContainer({
            "id":  "flxDailyApprovalLimit"+i, 
            "isVisible": true,
            "height":"50dp",
            "width": "100%",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM
          });

          var lblDailyApprovalLimitsValue = new kony.ui.Label({
            "id":  "lblDailyApprovalLimitsValue"+i,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": approvalLimit,
            "left":"3%",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"40%",
            "top":"15dp"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });
          if(data[i].groupList === "[]" || kony.sdk.isNullOrUndefined(data[i].groupList)){
            approveRequired = "No"
          }else{
            approveRequired = "Yes";
            flxDailyApprovalLimit["onTouchEnd"]= this.expandCollapseRow.bind(this,i,"DailyLimit"); 
          }
          var lblDailyApproverRequired ="";
          if(kony.application.getCurrentBreakpoint() === 1024){
            lblDailyApproverRequired = new kony.ui.Label({
              "id":  "lblDailyApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"35%",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }else{
            lblDailyApproverRequired = new kony.ui.Label({
              "id":  "lblDailyApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"300dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }
          var imgDailyRowExpand = new kony.ui.Image2({
            "id": "imgDailyRowExpand"+i,
            "isVisible": (approveRequired==="Yes")? true : false,
            "src": "arrow_down.png",
            "top":"15dp",
            "width":"20dp",
            "height":"20dp",
            "right":"30dp"
          },{
            "containerWeight": 100
          },{

          });
          var lblDailyValueSeparator = new kony.ui.Label({
            "id":  "lblDailyValueSeparator"+i,
            "isVisible": true,
            "skin": "sknSeparatore3e3e3",
            "text": "",
            "height":"1dp",
            "width":"100%",
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });
          flxDailyApprovalLimit.add(lblDailyApprovalLimitsValue);
          flxDailyApprovalLimit.add(lblDailyApproverRequired);
          flxDailyApprovalLimit.add(imgDailyRowExpand);
          this.view.flxDailyApprovalListValues.add(flxDailyApprovalLimit);
          this.view.flxDailyApprovalListValues.add(lblDailyValueSeparator);
          if(!kony.sdk.isNullOrUndefined(data[i].groupRule) || !kony.sdk.isNullOrUndefined(data[i].groupRule).groupList){
            this.view.flxDailyApprovalListValues.add(this.setDailyLimitDetails(i,data[i]));
          }  
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxDailyLimitsNoRecords.setVisibility(true);
      }
    },

    /**     
	 * Funciton expandCollapseRow
     * The function for expand  and collpse the row
     */
    expandCollapseRow: function(widgetId, limitType) {
      var preRow = "";
      if (this.prevWidgetId === widgetId && this.prevlimitType === limitType) {
        preRow = "Yes";
      }
      if (preRow !== "Yes") {
        if (this.prevWidgetId !== "" && this.prevlimitType !== "") {
          if (this.prevlimitType === "DailyLimit") {
            this.view.flxDailyApprovalListValues["flxDailyApprovalLimit" + this.prevWidgetId].isVisible = true;
            this.view.flxDailyApprovalListValues["flxDailyDetails" + this.prevWidgetId].isVisible = false;
          } else if (this.prevlimitType === "WeeklyLimit") {
            this.view.flxWeeklyApprovalListValues["flxWeeklyApprovalLimit" + this.prevWidgetId].isVisible = true;
            this.view.flxWeeklyApprovalListValues["flxWeeklyDetails" + this.prevWidgetId].isVisible = false;
          } else if (this.prevlimitType === "PTR") {
            this.view.flxPTRApprovalListValues["flxPTRApprovalLimit" + this.prevWidgetId].isVisible = true;
            this.view.flxPTRApprovalListValues["flxPTRDetails" + this.prevWidgetId].isVisible = false;
          }
        }
      }

      if (limitType === "DailyLimit") {
        if (this.view.flxDailyApprovalListValues["flxDailyApprovalLimit" + widgetId].isVisible) {
          this.view.flxDailyApprovalListValues["flxDailyApprovalLimit" + widgetId].isVisible = false;
          this.view.flxDailyApprovalListValues["flxDailyDetails" + widgetId].isVisible = true;
        } else {
          this.view.flxDailyApprovalListValues["flxDailyApprovalLimit" + widgetId].isVisible = true;
          this.view.flxDailyApprovalListValues["flxDailyDetails" + widgetId].isVisible = false;
        }
        this.prevWidgetId = widgetId;
        this.prevlimitType = limitType;
      } else if (limitType === "WeeklyLimit") {
        if (this.view.flxWeeklyApprovalListValues["flxWeeklyApprovalLimit" + widgetId].isVisible) {
          this.view.flxWeeklyApprovalListValues["flxWeeklyApprovalLimit" + widgetId].isVisible = false;
          this.view.flxWeeklyApprovalListValues["flxWeeklyDetails" + widgetId].isVisible = true;
        } else {
          this.view.flxWeeklyApprovalListValues["flxWeeklyApprovalLimit" + widgetId].isVisible = true;
          this.view.flxWeeklyApprovalListValues["flxWeeklyDetails" + widgetId].isVisible = false;
        }
        this.prevWidgetId = widgetId;
        this.prevlimitType = limitType;
      } else if (limitType === "PTR") {
        if (this.view.flxPTRApprovalListValues["flxPTRApprovalLimit" + widgetId].isVisible) {
          this.view.flxPTRApprovalListValues["flxPTRApprovalLimit" + widgetId].isVisible = false;
          this.view.flxPTRApprovalListValues["flxPTRDetails" + widgetId].isVisible = true;
        } else {
          this.view.flxPTRApprovalListValues["flxPTRApprovalLimit" + widgetId].isVisible = true;
          this.view.flxPTRApprovalListValues["flxPTRDetails" + widgetId].isVisible = false;
        }
        this.prevWidgetId = widgetId;
        this.prevlimitType = limitType;
      }

    },

    /**     
	 * Funciton setDailyLimitDetails
     * The function for set the details and update the UI
     * return dynamically created UI flex
     */
    setDailyLimitDetails:function(count,data){

      var approveRequired = "";
      var approvalLimit = "$"+data.lowerlimit+" - $"+data.upperlimit;
      var flxDailyDetails = new kony.ui.FlexContainer({
        "id":  "flxDailyDetails"+count, 
        "isVisible": false,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "skin":"ICSkn4176A4LeftBdr5px",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxDailySelectedRowWrapper = new kony.ui.FlexContainer({
        "id":  "flxDailySelectedRowWrapper"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblDailyDetails1Separator = new kony.ui.Label({
        "id":  "lblDailyDetails1Separator"+count,
        "isVisible": true,
        "skin": "ICSknLabelBgDBDBDB",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      if(data.groupList === "[]" || kony.sdk.isNullOrUndefined(data.groupList)){
        approveRequired = "No"
      }else{
        approveRequired = "Yes";
      }

      var flxDailyApprovalLimitDetail = new kony.ui.FlexContainer({
        "id":  "flxDailyApprovalLimitDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "height":"50dp",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });
      flxDailyApprovalLimitDetail["onTouchEnd"]= this.expandCollapseRow.bind(this,count,"DailyLimit"); 

      var lblDailyApprovalLimitsValueDetail = new kony.ui.Label({
        "id":  "lblDailyApprovalLimitsValueDetail"+count,
        "isVisible": true,
        "skin": "sknlbla0a0a015px",
        "text": approvalLimit,
        "left":"20dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"40%",
        "top":"15dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });
      var lblDailyApproverRequiredDetail = "";
      if(kony.application.getCurrentBreakpoint() === 1024){
        lblDailyApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblDailyApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"35%",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });

      }else{
        lblDailyApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblDailyApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"295dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });
      }
      var imgDailyRowCollapse = new kony.ui.Image2({
        "id": "imgDailyRowCollapse"+count,
        "isVisible": true,
        "src": "arrow_down.png",
        "top":"15dp",
        "width":"20dp",
        "height":"20dp",
        "right":"30dp"
      },{
        "containerWeight": 100
      },{

      });
      var lblDailyDetails2Separator = new kony.ui.Label({
        "id": "lblDailyDetails2Separator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxDailyHeaderApprovalConditons = new kony.ui.FlexContainer({
        "id":  "flxDailyHeaderApprovalConditons"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var lblDailyApprovalConditons = new kony.ui.Label({
        "id":  "lblDailyApprovalConditons"+count,
        "isVisible": true,
        "skin": "sknBBLabelSSPSB42424216px",
        "text": "Approval Rules & Conditions",
        "left":"20dp",
        "top":"15dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"85%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var btnDailyApprovalConditonEdit = new kony.ui.Button({
        "id": "btnDailyApprovalConditonEdit"+count,
        "isVisible": this.editPermission,
        "skin": "bbSknBtn4176A4TransparentBgSSP15px",
        "focusSkin": "bbSknBtn4176A4TransparentBgSSP15px",
        "text": "Edit",
        "top":"15dp",
        "right":"20dp",
        "bottom":"20dp",
        "height":"20dp"
      });

      var flxDailyApprovalMatrixDetail = new kony.ui.FlexContainer({
        "id":"flxDailyApprovalMatrixDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var flxDailyApprovalCondition = new kony.ui.FlexContainer({
        "id":"flxDailyApprovalCondition"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblDailyApproveIf = new kony.ui.Label({
        "id":"lblDailyApproveIf"+count,
        "isVisible": true,
        "skin": "ICSknSSPRegular42424215Px",
        "text": "Approve if",
        "left":"20dp",
        "top":"10dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":kony.flex.USE_PREFERRED_SIZE
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      flxDailyApprovalLimitDetail.add(lblDailyApprovalLimitsValueDetail);
      flxDailyApprovalLimitDetail.add(lblDailyApproverRequiredDetail);
      flxDailyApprovalLimitDetail.add(imgDailyRowCollapse);
      flxDailyHeaderApprovalConditons.add(lblDailyApprovalConditons);
      flxDailyHeaderApprovalConditons.add(btnDailyApprovalConditonEdit);
      flxDailySelectedRowWrapper.add(lblDailyDetails1Separator);
      flxDailySelectedRowWrapper.add(flxDailyApprovalLimitDetail);
      flxDailySelectedRowWrapper.add(lblDailyDetails2Separator);
      flxDailySelectedRowWrapper.add(flxDailyHeaderApprovalConditons);
      flxDailyApprovalCondition.add(lblDailyApproveIf);
      flxDailyApprovalCondition.add(this.manipulateDailyApprovalCodition(count,data));
      flxDailyApprovalMatrixDetail.add(flxDailyApprovalCondition);
      flxDailySelectedRowWrapper.add(flxDailyApprovalMatrixDetail);
      flxDailyDetails.add(flxDailySelectedRowWrapper);
      return flxDailyDetails;
      //       flxPTRDetails.add(flxPTRSelectedRowWrapper);
      //       flxPTRSelectedRowWrapper.add(lblPTRDetails1Separator);

    },

    /**     
	 * Funciton manipulateDailyApprovalCodition
     * The function for manipulate the group and rules of approvals
     * return dynamically created UI flex
     */
    manipulateDailyApprovalCodition:function(count,data){
      var groupRules = data.groupRule.replaceAll("][","],[");
      groupRules = JSON.parse(groupRules);
      var groupList = data.groupList;
      groupList = groupList.replaceAll("[","");
      groupList = groupList.replaceAll("]","");
      groupList = groupList.split(",");

      var flxDailyApprovalConditionRules = new kony.ui.FlexContainer({
        "id":"flxDailyApprovalConditionRules"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      //OR Loop
      for(var i=0;i<groupRules.length;i++){
        if(kony.sdk.isNullOrUndefined(groupRules[i].length)){

        }
        //AND Loop
        var flxApprovalDailyUserCondition = "";
        for(var j=0;j<groupRules[i].length;j++){

          var flxDailyRequiredApproval = new kony.ui.FlexContainer({
            "id":"flxDailyRequiredApproval"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "35%",
            "top":"0dp",
            "left":"45dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblDailyRequiredApprovals = new kony.ui.Label({
            "id":"lblDailyRequiredApprovals"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.RequiredApprovals"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblDailyRequiredApprovalsValue = new kony.ui.Label({
            "id":"lblDailyRequiredApprovalsValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "Any"+groupRules[i][j],
            "left":"30dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var flxDailyFromGroup = new kony.ui.FlexContainer({
            "id":"flxDailyFromGroup"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "50%",
            "top":"0dp",
            "left":"380dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblDailyFromGroup = new kony.ui.Label({
            "id":"lblDailyFromGroup"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.FromGroup"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblDailyFromGroupValue = new kony.ui.Label({
            "id":"lblDailyFromGroupValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": this.allSignatoryValues[groupList[j]].signatoryGroupName,
            "left":"30dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var lblDailyConditionValue = new kony.ui.Label({
            "id":"lblDailyConditionValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "AND",
            "left":"45dp",
            "top":"50dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          }); 

          flxApprovalDailyUserCondition = new kony.ui.FlexContainer({
            "id":"flxApprovalDailyUserCondition"+count+i+j, 
            "isVisible": true,
            "height":"70dp",
            "width": "100%",
            "top":"15dp",
            "left":"0dp",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM,
          });
          flxDailyRequiredApproval.add(lblDailyRequiredApprovals);
          flxDailyRequiredApproval.add(lblDailyRequiredApprovalsValue);
          flxDailyFromGroup.add(lblDailyFromGroup);
          flxDailyFromGroup.add(lblDailyFromGroupValue);
          flxApprovalDailyUserCondition.add(flxDailyRequiredApproval);
          flxApprovalDailyUserCondition.add(flxDailyFromGroup); 
          if(j!==groupRules[i].length-1){
            flxApprovalDailyUserCondition.add(lblDailyConditionValue);
            flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);
          }
        }
        var lblDailyConditionValueOR = new kony.ui.Label({
          "id":"lblDailyConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"45dp",
          "top":"60dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":kony.flex.USE_PREFERRED_SIZE
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });

        if(i!==groupRules.length-1){
          flxApprovalDailyUserCondition.add(lblDailyConditionValueOR); 
          flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);
        }else{
          flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);
        }

      }
      return flxDailyApprovalConditionRules;
    },

    /**     
	 * Funciton setWeeklyLimitValues
     * The function for set the list of limits
     * Create dynamic flex UI
     */
    setWeeklyLimitValues:function(data){
      var nagativeRowCount = 0;
      for(var i=0 ;i<data.length;i++){
        if (data[i].lowerlimit !== "-1.00" && data[i].upperlimit !== "-1.00") {
          nagativeRowCount++;
          var approveRequired = "";
          var approvalLimit = "$"+data[i].lowerlimit+" - $"+data[i].upperlimit;

          var flxWeeklyApprovalLimit = new kony.ui.FlexContainer({
            "id":  "flxWeeklyApprovalLimit"+i, 
            "isVisible": true,
            "height":"50dp",
            "width": "100%",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM
          });

          var lblWeeklyApprovalLimitsValue = new kony.ui.Label({
            "id":  "lblWeeklyApprovalLimitsValue"+i,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": approvalLimit,
            "left":"3%",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"40%",
            "top":"15dp"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });
          if(data[i].groupList === "[]" || kony.sdk.isNullOrUndefined(data[i].groupList)){
            approveRequired = "No"
          }else{
            approveRequired = "Yes";
            flxWeeklyApprovalLimit["onTouchEnd"]= this.expandCollapseRow.bind(this,i,"WeeklyLimit"); 
          }
          var lblWeeklyApproverRequired ="";
          if(kony.application.getCurrentBreakpoint() === 1024){
            lblWeeklyApproverRequired = new kony.ui.Label({
              "id":  "lblWeeklyApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"300dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }
          else{

            lblWeeklyApproverRequired = new kony.ui.Label({
              "id":  "lblWeeklyApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"300dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }
          var imgWeeklyRowExpand = new kony.ui.Image2({
            "id": "imgWeeklyRowExpand"+i,
            "isVisible": (approveRequired==="Yes")? true : false,
            "src": "arrow_down.png",
            "top":"15dp",
            "width":"20dp",
            "height":"20dp",
            "right":"30dp"
          },{
            "containerWeight": 100
          },{

          });
          var lblWeeklyValueSeparator = new kony.ui.Label({
            "id":  "lblWeeklyValueSeparator"+i,
            "isVisible": true,
            "skin": "sknSeparatore3e3e3",
            "text": "",
            "height":"1dp",
            "width":"100%",
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          flxWeeklyApprovalLimit.add(lblWeeklyApprovalLimitsValue);
          flxWeeklyApprovalLimit.add(lblWeeklyApproverRequired);
          flxWeeklyApprovalLimit.add(imgWeeklyRowExpand);
          this.view.flxWeeklyApprovalListValues.add(flxWeeklyApprovalLimit);
          this.view.flxWeeklyApprovalListValues.add(lblWeeklyValueSeparator);
          if(!kony.sdk.isNullOrUndefined(data[i].groupRule) || !kony.sdk.isNullOrUndefined(data[i].groupRule).groupList){
            this.view.flxWeeklyApprovalListValues.add(this.setWeeklyLimitDetails(i,data[i]));
          }
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxWeeklyLimitsNoRecords.setVisibility(true);
      }
    },

    /**     
	 * Funciton setWeeklyLimitDetails
     * The function for set the details of list
     * Create dynamic flex UI and update
     * retrun dynamically created UI flex
     */
    setWeeklyLimitDetails:function(count,data){
      var approveRequired = "";
      var approvalLimit = "$"+data.lowerlimit+" - $"+data.upperlimit;
      var flxWeeklyDetails = new kony.ui.FlexContainer({
        "id":  "flxWeeklyDetails"+count, 
        "isVisible": false,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "skin":"ICSkn4176A4LeftBdr5px",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxWeeklySelectedRowWrapper = new kony.ui.FlexContainer({
        "id":  "flxWeeklySelectedRowWrapper"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblWeeklyDetails1Separator = new kony.ui.Label({
        "id":  "lblWeeklyDetails1Separator"+count,
        "isVisible": true,
        "skin": "ICSknLabelBgDBDBDB",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      if(data.groupList === "[]" || kony.sdk.isNullOrUndefined(data.groupList)){
        approveRequired = "No"
      }else{
        approveRequired = "Yes";
      }

      var flxWeeklyApprovalLimitDetail = new kony.ui.FlexContainer({
        "id":  "flxWeeklyApprovalLimitDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "height":"50dp",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      flxWeeklyApprovalLimitDetail["onTouchEnd"]= this.expandCollapseRow.bind(this,count,"WeeklyLimit"); 
      var lblWeeklyApprovalLimitsValueDetail = new kony.ui.Label({
        "id":  "lblWeeklyApprovalLimitsValueDetail"+count,
        "isVisible": true,
        "skin": "sknlbla0a0a015px",
        "text": approvalLimit,
        "left":"20dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"40%",
        "top":"15dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });
      var lblWeeklyApproverRequiredDetail = "";

      if(kony.application.getCurrentBreakpoint() === 1024){
        lblWeeklyApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblWeeklyApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"35%",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });
      }else{
        lblWeeklyApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblWeeklyApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"295dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });
      }

      var imgWeeklyRowCollapse = new kony.ui.Image2({
        "id": "imgWeeklyRowCollapse"+count,
        "isVisible": true,
        "src": "arrow_down.png",
        "top":"15dp",
        "width":"20dp",
        "height":"20dp",
        "right":"30dp"
      },{
        "containerWeight": 100
      },{

      });
      var lblWeeklyDetails2Separator = new kony.ui.Label({
        "id": "lblWeeklyDetails2Separator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxWeeklyHeaderApprovalConditons = new kony.ui.FlexContainer({
        "id":  "flxWeeklyHeaderApprovalConditons"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var lblWeeklyApprovalConditons = new kony.ui.Label({
        "id":  "lblWeeklyApprovalConditons"+count,
        "isVisible": true,
        "skin": "sknBBLabelSSPSB42424216px",
        "text": "Approval Rules & Conditions",
        "left":"20dp",
        "top":"15dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"85%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var btnWeeklyApprovalConditonEdit = new kony.ui.Button({
        "id": "btnWeeklyApprovalConditonEdit"+count,
        "isVisible": this.editPermission,
        "skin": "bbSknBtn4176A4TransparentBgSSP15px",
        "focusSkin": "bbSknBtn4176A4TransparentBgSSP15px",
        "text": "Edit",
        "top":"15dp",
        "right":"20dp",
        "bottom":"20dp",
        "height":"20dp"
      });

      var flxWeeklyApprovalMatrixDetail = new kony.ui.FlexContainer({
        "id":"flxWeeklyApprovalMatrixDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var flxWeeklyApprovalCondition = new kony.ui.FlexContainer({
        "id":"flxWeeklyApprovalCondition"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblWeeklyApproveIf = new kony.ui.Label({
        "id":"lblWeeklyApproveIf"+count,
        "isVisible": true,
        "skin": "ICSknSSPRegular42424215Px",
        "text": "Approve if",
        "left":"20dp",
        "top":"10dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":kony.flex.USE_PREFERRED_SIZE
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      flxWeeklyApprovalLimitDetail.add(lblWeeklyApprovalLimitsValueDetail);
      flxWeeklyApprovalLimitDetail.add(lblWeeklyApproverRequiredDetail);
      flxWeeklyApprovalLimitDetail.add(imgWeeklyRowCollapse);
      flxWeeklyHeaderApprovalConditons.add(lblWeeklyApprovalConditons);
      flxWeeklyHeaderApprovalConditons.add(btnWeeklyApprovalConditonEdit);
      flxWeeklySelectedRowWrapper.add(lblWeeklyDetails1Separator);
      flxWeeklySelectedRowWrapper.add(flxWeeklyApprovalLimitDetail);
      flxWeeklySelectedRowWrapper.add(lblWeeklyDetails2Separator);
      flxWeeklySelectedRowWrapper.add(flxWeeklyHeaderApprovalConditons);
      flxWeeklyApprovalCondition.add(lblWeeklyApproveIf);
      flxWeeklyApprovalCondition.add(this.manipulateWeeklyApprovalCodition(count,data));
      flxWeeklyApprovalMatrixDetail.add(flxWeeklyApprovalCondition);
      flxWeeklySelectedRowWrapper.add(flxWeeklyApprovalMatrixDetail);
      flxWeeklyDetails.add(flxWeeklySelectedRowWrapper);
      return flxWeeklyDetails;
      //       flxPTRDetails.add(flxPTRSelectedRowWrapper);
      //       flxPTRSelectedRowWrapper.add(lblPTRDetails1Separator);

    },

    /**     
	 * Funciton manipulateWeeklyApprovalCodition
     * The function for manipulate the group and rules of approvals
     * return dynamically created UI flex
     */
    manipulateWeeklyApprovalCodition:function(count,data){
      var groupRules = data.groupRule.replaceAll("][","],[");
      groupRules = JSON.parse(groupRules);
      var groupList = data.groupList;
      groupList = groupList.replaceAll("[","");
      groupList = groupList.replaceAll("]","");
      groupList = groupList.split(",");

      var flxWeeklyApprovalConditionRules = new kony.ui.FlexContainer({
        "id":"flxWeeklyApprovalConditionRules"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      //OR Loop
      for(var i=0;i<groupRules.length;i++){
        if(kony.sdk.isNullOrUndefined(groupRules[i].length)){

        }
        //AND Loop
        var flxApprovalWeeklyUserCondition = "";
        for(var j=0;j<groupRules[i].length;j++){

          var flxWeeklyRequiredApproval = new kony.ui.FlexContainer({
            "id":"flxWeeklyRequiredApproval"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "35%",
            "top":"0dp",
            "left":"45dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblWeeklyRequiredApprovals = new kony.ui.Label({
            "id":"lblWeeklyRequiredApprovals"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.RequiredApprovals"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblWeeklyRequiredApprovalsValue = new kony.ui.Label({
            "id":"lblWeeklyRequiredApprovalsValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "Any"+groupRules[i][j],
            "left":"30dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var flxWeeklyFromGroup = new kony.ui.FlexContainer({
            "id":"flxWeeklyFromGroup"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "50%",
            "top":"0dp",
            "left":"380dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblWeeklyFromGroup = new kony.ui.Label({
            "id":"lblWeeklyFromGroup"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.FromGroup"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblWeeklyFromGroupValue = new kony.ui.Label({
            "id":"lblWeeklyFromGroupValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": this.allSignatoryValues[groupList[j]].signatoryGroupName,
            "left":"30dp",
            "top":"15",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var lblWeeklyConditionValue = new kony.ui.Label({
            "id":"lblWeeklyConditionValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "AND",
            "left":"45dp",
            "top":"50dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          }); 

          flxApprovalWeeklyUserCondition = new kony.ui.FlexContainer({
            "id":"flxApprovalWeeklyUserCondition"+count+i+j, 
            "isVisible": true,
            "height":"70dp",
            "width": "100%",
            "top":"15dp",
            "left":"0dp",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM,
          });
          flxWeeklyRequiredApproval.add(lblWeeklyRequiredApprovals);
          flxWeeklyRequiredApproval.add(lblWeeklyRequiredApprovalsValue);
          flxWeeklyFromGroup.add(lblWeeklyFromGroup);
          flxWeeklyFromGroup.add(lblWeeklyFromGroupValue);
          flxApprovalWeeklyUserCondition.add(flxWeeklyRequiredApproval);
          flxApprovalWeeklyUserCondition.add(flxWeeklyFromGroup); 
          if(j!==groupRules[i].length-1){
            flxApprovalWeeklyUserCondition.add(lblWeeklyConditionValue);
            flxWeeklyApprovalConditionRules.add(flxApprovalWeeklyUserCondition);
          }
        }
        var lblWeeklyConditionValueOR = new kony.ui.Label({
          "id":"lblWeeklyConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"45dp",
          "top":"60dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":kony.flex.USE_PREFERRED_SIZE
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });

        if(i!==groupRules.length-1){
          flxApprovalWeeklyUserCondition.add(lblWeeklyConditionValueOR); 
          flxWeeklyApprovalConditionRules.add(flxApprovalWeeklyUserCondition);
        }else{
          flxWeeklyApprovalConditionRules.add(flxApprovalWeeklyUserCondition);
        }

      }
      return flxWeeklyApprovalConditionRules;
    },

    /**     
	 * Funciton setPTRLimitValues
     * The function for set the List values for Per Transaction Limit
     * Create Dynamic UI 
     */
    setPTRLimitValues:function(data){
      var nagativeRowCount = 0;
      for(var i=0 ;i<data.length;i++){
        if (data[i].lowerlimit !== "-1.00" && data[i].upperlimit !== "-1.00") {
          nagativeRowCount++
          var approveRequired = "";
          var approvalLimit = "$"+data[i].lowerlimit+" - $"+data[i].upperlimit;
          var flxPTRApprovalLimit = new kony.ui.FlexContainer({
            "id":  "flxPTRApprovalLimit"+i, 
            "isVisible": true,
            "height":"50dp",
            "width": "100%",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM
          });

          var lblPTRApprovalLimitsValue = new kony.ui.Label({
            "id":  "lblPTRApprovalLimitsValue"+i,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": approvalLimit,
            "left":"3%",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"40%",
            "top":"15dp"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });
          if(data[i].groupList === "[]" || kony.sdk.isNullOrUndefined(data[i].groupList)){
            approveRequired = "No"
          }else{
            approveRequired = "Yes";
            flxPTRApprovalLimit["onTouchEnd"]= this.expandCollapseRow.bind(this,i,"PTR"); 
          }
          var lblPTRApproverRequired = "";
          if(kony.application.getCurrentBreakpoint() === 1024){
            lblPTRApproverRequired = new kony.ui.Label({
              "id":  "lblPTRApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"35%",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }
          else{
            lblPTRApproverRequired = new kony.ui.Label({
              "id":  "lblPTRApproverRequired"+i,
              "isVisible": true,
              "skin": "sknlbla0a0a015px",
              "text": approveRequired,
              "left":"300dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"30%",
              "top":"15dp"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });
          }
          var imgPTRRowExpand = new kony.ui.Image2({
            "id": "imgPTRRowExpand"+i,
            "isVisible": (approveRequired==="Yes")? true : false,
            "src": "arrow_down.png",
            "top":"15dp",
            "width":"20dp",
            "height":"20dp",
            "right":"30dp"
          },{
            "containerWeight": 100
          },{

          });
          var lblPTRValueSeparator = new kony.ui.Label({
            "id":  "lblPTRValueSeparator"+i,
            "isVisible": true,
            "skin": "sknSeparatore3e3e3",
            "text": "",
            "height":"1dp",
            "width":"100%",
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          flxPTRApprovalLimit.add(lblPTRApprovalLimitsValue);
          flxPTRApprovalLimit.add(lblPTRApproverRequired);
          flxPTRApprovalLimit.add(imgPTRRowExpand);
          this.view.flxPTRApprovalListValues.add(flxPTRApprovalLimit);
          this.view.flxPTRApprovalListValues.add(lblPTRValueSeparator);
          if(!kony.sdk.isNullOrUndefined(data[i].groupRule) || !kony.sdk.isNullOrUndefined(data[i].groupRule).groupList){
            this.view.flxPTRApprovalListValues.add(this.setPTRLimitDetail(i,data[i]));
          }
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxPTRNoRecords.setVisibility(true);
      }
      this.view.forceLayout();
    },

    /**     
	 * Funciton setPTRLimitDetail
     * The function for set the details and update the UI
     * return dynamically created UI flex
     */
    setPTRLimitDetail:function(count,data){
      var approveRequired = "";
      var approvalLimit = "$"+data.lowerlimit+" - $"+data.upperlimit;
      var flxPTRDetails = new kony.ui.FlexContainer({
        "id":  "flxPTRDetails"+count, 
        "isVisible": false,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "skin":"ICSkn4176A4LeftBdr5px",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxPTRSelectedRowWrapper = new kony.ui.FlexContainer({
        "id":  "flxPTRSelectedRowWrapper"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblPTRDetails1Separator = new kony.ui.Label({
        "id":  "lblPTRDetails1Separator"+count,
        "isVisible": true,
        "skin": "ICSknLabelBgDBDBDB",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      if(data.groupList === "[]" || kony.sdk.isNullOrUndefined(data.groupList)){
        approveRequired = "No"
      }else{
        approveRequired = "Yes";
      }

      var flxPTRApprovalLimitDetail = new kony.ui.FlexContainer({
        "id":  "flxPTRApprovalLimitDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "height":"50dp",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });
      flxPTRApprovalLimitDetail["onTouchEnd"]= this.expandCollapseRow.bind(this,count,"PTR"); 
      var lblPTRApprovalLimitsValueDetail = new kony.ui.Label({
        "id":  "lblPTRApprovalLimitsValueDetail"+count,
        "isVisible": true,
        "skin": "sknlbla0a0a015px",
        "text": approvalLimit,
        "left":"20dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"40%",
        "top":"15dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });
      var lblPTRApproverRequiredDetail = "";
      if(kony.application.getCurrentBreakpoint() === 1024){
        lblPTRApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblPTRApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"35%",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });
      }else{
        lblPTRApproverRequiredDetail = new kony.ui.Label({
          "id":  "lblPTRApproverRequiredDetail"+count,
          "isVisible": true,
          "skin": "sknlbla0a0a015px",
          "text": approveRequired,
          "left":"295dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":"30%",
          "top":"15dp"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });
      }
      var imgPTRRowCollapse = new kony.ui.Image2({
        "id": "imgPTRRowCollapse"+count,
        "isVisible": true,
        "src": "arrow_down.png",
        "top":"15dp",
        "width":"20dp",
        "height":"20dp",
        "right":"30dp"
      },{
        "containerWeight": 100
      },{

      });
      var lblPTRDetails2Separator = new kony.ui.Label({
        "id": "lblPTRDetails2Separator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"1dp",
        "width":"100%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxPTRHeaderApprovalConditons = new kony.ui.FlexContainer({
        "id":  "flxPTRHeaderApprovalConditons"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var lblPTRApprovalConditons = new kony.ui.Label({
        "id":  "lblPTRApprovalConditons"+count,
        "isVisible": true,
        "skin": "sknBBLabelSSPSB42424216px",
        "text": "Approval Rules & Conditions",
        "left":"20dp",
        "top":"15dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":"85%",
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var btnPTRApprovalConditonEdit = new kony.ui.Button({
        "id": "btnPTRApprovalConditonEdit"+count,
        "isVisible": this.editPermission,
        "skin": "bbSknBtn4176A4TransparentBgSSP15px",
        "focusSkin": "bbSknBtn4176A4TransparentBgSSP15px",
        "text": "Edit",
        "top":"15dp",
        "right":"20dp",
        "bottom":"20dp",
        "height":"20dp"
      });

      var flxPTRApprovalMatrixDetail = new kony.ui.FlexContainer({
        "id":"flxPTRApprovalMatrixDetail"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var flxPTRApprovalCondition = new kony.ui.FlexContainer({
        "id":"flxPTRApprovalCondition"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var lblApproveIf = new kony.ui.Label({
        "id":"lblApproveIf"+count,
        "isVisible": true,
        "skin": "ICSknSSPRegular42424215Px",
        "text": "Approve if",
        "left":"20dp",
        "top":"10dp",
        "height":kony.flex.USE_PREFERRED_SIZE,
        "width":kony.flex.USE_PREFERRED_SIZE
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      flxPTRApprovalLimitDetail.add(lblPTRApprovalLimitsValueDetail);
      flxPTRApprovalLimitDetail.add(lblPTRApproverRequiredDetail);
      flxPTRApprovalLimitDetail.add(imgPTRRowCollapse);
      flxPTRHeaderApprovalConditons.add(lblPTRApprovalConditons);
      flxPTRHeaderApprovalConditons.add(btnPTRApprovalConditonEdit);
      flxPTRSelectedRowWrapper.add(lblPTRDetails1Separator);
      flxPTRSelectedRowWrapper.add(flxPTRApprovalLimitDetail);
      flxPTRSelectedRowWrapper.add(lblPTRDetails2Separator);
      flxPTRSelectedRowWrapper.add(flxPTRHeaderApprovalConditons);
      flxPTRApprovalCondition.add(lblApproveIf);
      flxPTRApprovalCondition.add(this.manipulateApprovalCodition(count,data));
      flxPTRApprovalMatrixDetail.add(flxPTRApprovalCondition);
      flxPTRSelectedRowWrapper.add(flxPTRApprovalMatrixDetail);
      flxPTRDetails.add(flxPTRSelectedRowWrapper);
      return flxPTRDetails;
      //       flxPTRDetails.add(flxPTRSelectedRowWrapper);
      //       flxPTRSelectedRowWrapper.add(lblPTRDetails1Separator);

    },

    /**     
	 * Funciton manipulateApprovalCodition
     * The function for manipulate the group and rules of approvals
     * return dynamically created UI flex
     */
    manipulateApprovalCodition:function(count,data){
      var groupRules = data.groupRule.replaceAll("][","],[");
      groupRules = JSON.parse(groupRules);
      var groupList = data.groupList;
      groupList = groupList.replaceAll("[","");
      groupList = groupList.replaceAll("]","");
      groupList = groupList.split(",");

      var flxApprovalConditionRules = new kony.ui.FlexContainer({
        "id":"flxApprovalConditionRules"+count, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "top":"0dp",
        "left":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      //OR Loop
      for(var i=0;i<groupRules.length;i++){
        if(kony.sdk.isNullOrUndefined(groupRules[i].length)){

        }
        //AND Loop
        var flxApprovalUserCondition = "";
        for(var j=0;j<groupRules[i].length;j++){

          var flxRequiredApproval = new kony.ui.FlexContainer({
            "id":"flxRequiredApproval"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "35%",
            "top":"0dp",
            "left":"45dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblRequiredApprovals = new kony.ui.Label({
            "id":"lblRequiredApprovals"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.RequiredApprovals"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblRequiredApprovalsValue = new kony.ui.Label({
            "id":"lblRequiredApprovalsValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "Any"+groupRules[i][j],
            "left":"30dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var flxFromGroup = new kony.ui.FlexContainer({
            "id":"flxFromGroup"+count+i+j, 
            "isVisible": true,
            "height":"30dp",
            "width": "50%",
            "top":"0dp",
            "left":"380dp",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL
          });

          var lblFromGroup = new kony.ui.Label({
            "id":"lblFromGroup"+count+i+j,
            "isVisible": true,
            "skin": "sknlbla0a0a015px",
            "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.FromGroup"),
            "left":"0dp",
            "top":"15dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });

          var lblFromGroupValue = new kony.ui.Label({
            "id":"lblFromGroupValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": this.allSignatoryValues[groupList[j]].signatoryGroupName,
            "left":"30dp",
            "top":"15",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":"20%"
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          });    

          var lblConditionValue = new kony.ui.Label({
            "id":"lblConditionValue"+count+i+j,
            "isVisible": true,
            "skin": "ICSknSSPRegular42424215Px",
            "text": "AND",
            "left":"45dp",
            "top":"50dp",
            "height":kony.flex.USE_PREFERRED_SIZE,
            "width":kony.flex.USE_PREFERRED_SIZE
          },{
            "containerWeight": 100,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "margin": [1, 1, 1, 1],
            "padding": [0, 0, 0, 0],
          }, {
            //         wrapping:2
          }); 


          flxApprovalUserCondition = new kony.ui.FlexContainer({
            "id":"flxApprovalUserCondition"+count+i+j, 
            "isVisible": true,
            "height":"70dp",
            "width": "100%",
            "top":"15dp",
            "left":"0dp",
            "clipBounds": false,
            "layoutType": kony.flex.FREE_FORM,
          });
          flxRequiredApproval.add(lblRequiredApprovals);
          flxRequiredApproval.add(lblRequiredApprovalsValue);
          flxFromGroup.add(lblFromGroup);
          flxFromGroup.add(lblFromGroupValue);
          flxApprovalUserCondition.add(flxRequiredApproval);
          flxApprovalUserCondition.add(flxFromGroup); 
          if(j!==groupRules[i].length-1){
            flxApprovalUserCondition.add(lblConditionValue);
            flxApprovalConditionRules.add(flxApprovalUserCondition);
          }
        }
        var lblConditionValueOR = new kony.ui.Label({
          "id":"lblConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"45dp",
          "top":"60dp",
          "height":kony.flex.USE_PREFERRED_SIZE,
          "width":kony.flex.USE_PREFERRED_SIZE
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        }, {
          //         wrapping:2
        });

        if(i!==groupRules.length-1){
          flxApprovalUserCondition.add(lblConditionValueOR); 
          flxApprovalConditionRules.add(flxApprovalUserCondition);
        }else{
          flxApprovalConditionRules.add(flxApprovalUserCondition);
        }

      }
      return flxApprovalConditionRules;
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
      if (lowerLimit !== -1 && upperLimit !== -1) {
        result = this.currencyCode + formattedLowerLimit + " - " + this.currencyCode + formattedUpperLimit;
      } else if (lowerLimit === -1 && upperLimit === -1) {
        result = "Above " + 1;
      } else if (lowerLimit === -1) {
        result = "Up to " + this.currencyCode + formattedUpperLimit;
      } else if (upperLimit === -1) {
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
          featureActionLimit: ""
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

    addNewCondition:function(){
      this.valueUpdated = "Yes";
    //  var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
      //mainFlexHeight = mainFlexHeight + 135;
      //this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
      var sectionCount =this.sectionCount+1;
      this.sectionCount = sectionCount;
      var flxORText = new kony.ui.FlexContainer({
        "id": "flxORText"+sectionCount,
        "isVisible": true,
        "height":"70dp",
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "zIndex":-1,
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxORVerticalLineTop = new kony.ui.FlexContainer({
        "id":  "flxORVerticalLineTop"+sectionCount,
        "isVisible": true,
        "height":"20dp",
        "skin":"ICSknFlxe3e3e3Border1Px",
        "width": "1dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxORLabelContainer = new kony.ui.FlexContainer({
        "id":  "flxORLabelContainer"+sectionCount,
        "isVisible": true,
        "height":"30dp",
        "skin":"ICSknFlx424242Rds5pxBdr1px",
        "width": "50dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
      });

      var lblORText = new kony.ui.Label({
        "id":  "lblORText"+sectionCount,
        "isVisible": true,
        "skin": "slLabel0d8a72616b3cc47",
        "text": kony.i18n.getLocalizedString("i18n.approvals.OR"),
        "left":"0dp",
        "top":"0dp",
        "height": "20dp",
        "width": "30dp",
        "centerX":"50%",
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxORVerticalLineBottom = new kony.ui.FlexContainer({
        "id":  "flxORVerticalLineBottom"+sectionCount,
        "isVisible": true,
        "height":"20dp",
        "skin":"ICSknFlxe3e3e3Border1Px",
        "width": "1dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });
      flxORLabelContainer.add(lblORText);
      flxORText.add(flxORVerticalLineTop);
      flxORText.add(flxORLabelContainer);
      flxORText.add(flxORVerticalLineBottom);

      this.view["flxConditionPartMain"].add(flxORText);
      this.createApprovalConditionSection(sectionCount);

    },
    deletePopupEnable:function(flexType,sectionCount,currentCondition){
      var scope = this;
      this.view.flxDeletePopup.setVisibility(true);
      this.valueUpdated = "Yes";
      if(flexType === "section"){
        this.view.deletepopup.formActionsNew.btnNext.onClick = function(){
          scope.deleteCondition(sectionCount);
          scope.view.lblAckNotificationContent.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.DeleteSuccess");
          scope.view.flxAcknowledgementPopup.setVisibility(true);
          if(scope.prevSectionCount===sectionCount||scope.prevCurrenctCondition===currentCondition){
            scope.prevSectionCount = "";
            scope.prevCurrenctCondition = "";
          }
        };
      }else if(flexType === "condition"){
        this.view.deletepopup.formActionsNew.btnNext.onClick = function(){
          scope.deleteAndCondition(sectionCount,currentCondition);
          scope.view.lblAckNotificationContent.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.DeleteSuccess");
          scope.view.flxAcknowledgementPopup.setVisibility(true);
          if(scope.prevSectionCount===sectionCount||scope.prevCurrenctCondition===currentCondition){
            scope.prevSectionCount = "";
            scope.prevCurrenctCondition = "";
          }
        };
      }
    },

    createApprovalConditionSection: function(sectionCount){
      //this.conditionCount["section"+] = sectionCount;
      this.valueUpdated = "Yes";
      var stackRows = [];
      if(this.conditionFlex.length !== 0){
        stackRows = this.conditionFlex;
      }
      stackRows.push(""+sectionCount);

      this.conditionFlex = stackRows;
      this.sectionCount = sectionCount;
      var flxConditionSection = new kony.ui.FlexContainer({
        "id":  "flxConditionSection"+sectionCount, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "zIndex": 100 - sectionCount,
        "skin":"skne3e3e3br3pxradius",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxConditionHdr = new kony.ui.FlexContainer({
        "id":  "flxConditionHdr"+sectionCount, 
        "isVisible": true,
        "width": "100%",
        "height":"60dp",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": true,
        "layoutType": kony.flex.FREE_FORM
      });
      var lblConditoinHdr = new kony.ui.Label({
        "id":  "lblConditoinHdr"+sectionCount,
        "isVisible": true,
        "skin": "sknlbl424242SSP15pxSemibold",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Condition") + " " + stackRows.length,
        "left":"20dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "top":"20dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var btnDeleteCondition = new kony.ui.Button({
        "id": "btnDeleteCondition"+sectionCount,
        "isVisible": true,
        "skin": "bbSknBtn4176a4NoBorder",
        "focusSkin": "bbSknBtn4176a4NoBorder",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.DeleteCondition"),
        "right":"20dp",
        "width":kony.flex.USE_PREFERRED_SIZE,
        "height":kony.flex.USE_PREFERRED_SIZE,
        "centerY":"50%"
      });
      btnDeleteCondition["onClick"] = this.deletePopupEnable.bind(this,"section",sectionCount);
      var flxCreateApprovalCondition = new kony.ui.FlexContainer({
        "id":  "flxCreateApprovalCondition"+sectionCount, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxANDConditionBtnMain = new kony.ui.FlexContainer({
        "id":  "flxANDConditionBtnMain"+sectionCount, 
        "isVisible": true,
        "height":"35dp",
        "width": "100%",
        "left":"0dp",
        "top":"20dp",
        "bottom":"20dp",
        "zIndex": 10,
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });

      var flxANDBtn = new kony.ui.FlexContainer({
        "id":  "flxANDBtn"+sectionCount, 
        "isVisible": true,
        "height":"100%",
        "width": "80dp",
        "left":"20dp",
        "top":"0dp",
        "bottom":"20dp",
        "skin":"ICSknFlx003C7DBdr1PxRds5px",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_HORIZONTAL
      });
      flxANDBtn["onClick"] = this.newAddCondition.bind(this,sectionCount);
      var lblPlusSymbol = new kony.ui.Label({
        "id":  "lblPlusSymbol"+sectionCount,
        "isVisible": true,
        "skin": "ICSknLbl003D79Rds5PxSSPFFFFF26Px",
        "text": "+",
        "left":"0dp",
        "height": "100%",
        "width": "40%",
        "top":"0dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var lblAND = new kony.ui.Label({
        "id":  "lblAND"+sectionCount,
        "isVisible": true,
        "skin": "ICSknLbl003D79SSP15Px",
        "text": kony.i18n.getLocalizedString("i18n.approvals.AND"),
        "left":"10dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      flxANDBtn.add(lblPlusSymbol);
      flxANDBtn.add(lblAND);
      flxANDConditionBtnMain.add(flxANDBtn);

      flxConditionHdr.add(lblConditoinHdr);
      flxConditionHdr.add(btnDeleteCondition);
      flxConditionSection.add(flxConditionHdr);
      flxCreateApprovalCondition.add(this.addNewANDCondition(sectionCount));
      flxConditionSection.add(flxCreateApprovalCondition);
      flxConditionSection.add(flxANDConditionBtnMain);
      this.view.flxConditionPartMain.add(flxConditionSection);
      if(stackRows.length === 1){
        this.view["btnDeleteCondition"+this.conditionFlex[0]].setVisibility(false);
      }else{
        this.view["btnDeleteCondition"+this.conditionFlex[0]].setVisibility(true);
      }
      this.enableConfirmButton();
    },
    newAddCondition:function(sectionCount){
      this.valueUpdated = "Yes";
      var currentCondition = this.conditionCount["section"+sectionCount]+1;

      var flxANDText = new kony.ui.FlexContainer({
        "id":  "flxANDText"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"70dp",
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "zIndex": 1,
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });


      var flxAndVerticalLineTop = new kony.ui.FlexContainer({
        "id":  "flxAndVerticalLineTop"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"20dp",
        "skin":"ICSknFlxe3e3e3Border1Px",
        "width": "1dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });

      var flxANDLabelContainer = new kony.ui.FlexContainer({
        "id":  "flxANDLabelContainer"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"30dp",
        "skin":"ICSknFlx424242Rds5pxBdr1px",
        "width": "50dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
      });

      var lblANDText = new kony.ui.Label({
        "id":  "lblANDText"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "slLabel0d8a72616b3cc47",
        "text": kony.i18n.getLocalizedString("i18n.approvals.AND"),
        "left":"0dp",
        "top":"0dp",
        "height": "20dp",
        "width": "30dp",
        "centerX":"50%",
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxAndVerticalLineBottom = new kony.ui.FlexContainer({
        "id":  "flxAndVerticalLineBottom"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"20dp",
        "skin":"ICSknFlxe3e3e3Border1Px",
        "width": "1dp",
        "top":"0dp",
        "centerX":"50%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL
      });
      flxANDLabelContainer.add(lblANDText);
      flxANDText.add(flxAndVerticalLineTop);
      flxANDText.add(flxANDLabelContainer);
      flxANDText.add(flxAndVerticalLineBottom);

      this.view["flxCreateApprovalCondition"+sectionCount].add(flxANDText);
      this.view["flxCreateApprovalCondition"+sectionCount].add(this.addNewANDCondition(sectionCount));
      this.enableConfirmButton();
    },


    addNewANDCondition:function(sectionCount){
      var currentCondition = "";
      var stackRows = [];
      //var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
     // mainFlexHeight = mainFlexHeight + 170;
      //this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
      if(kony.sdk.isNullOrUndefined(this.andConditionFlex["section"+sectionCount])){
        stackRows = [];
      }else{
        stackRows = this.andConditionFlex["section"+sectionCount];
      }
      if(this.conditionCount["section"+sectionCount] === undefined){
        currentCondition = 0;
      }else{
        currentCondition = this.conditionCount["section"+sectionCount]+1;
        this.view["btnDeleteAndCondition"+this.andConditionFlex["section" + sectionCount][0]].setVisibility(true);
      }
      this.conditionCount["section"+sectionCount] = currentCondition;

      var flxApprovalConditionValue = new kony.ui.FlexContainer({
        "id":  "flxApprovalConditionValue"+sectionCount+currentCondition, 
        "isVisible": true,
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "100%",
        "left":"0dp",
        "top":"0dp",
        "clipBounds": false,
        "zIndex": 100 - currentCondition,
        "layoutType": kony.flex.FLOW_VERTICAL
      });
      stackRows.push(""+sectionCount+currentCondition);
      this.andConditionFlex["section"+sectionCount] = stackRows;
      var flxConditionInputs = new kony.ui.FlexContainer({
        "id":  "flxConditionInputs"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"110dp",
        "width": "96%",
        "left":"2%",
        "right":"2%",
        "zIndex":10,
        "top":"0dp",
        "skin":"skne3e3e3br3pxradius",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM
      });


      var flxRequiredApprovals = new kony.ui.FlexContainer({
        "id":  "flxRequiredApprovals"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"100%",
        "width": "200dp",
        "left":"20dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "centerY":"50%"
      });


      var lblRequiredApprovalsHdr = new kony.ui.Label({
        "id":  "lblRequiredApprovalsHdr"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "sknlbla0a0a015px",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.RequiredApprovalsNC"),
        "left":"0dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": "125dp",
        "top":"20dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxRequiredAppraovalSelected = new kony.ui.FlexContainer({
        "id":  "flxRequiredAppraovalSelected"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"40dp",
        "width": "190dp",
        "skin":"skne3e3e3br3pxradius",
        "left":"0dp",
        "top":"5dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM

      });

      var flxApprovalsDropDown= this.getCountDropDown(sectionCount, currentCondition);
      flxRequiredAppraovalSelected["onClick"] = this.dropDownExpand.bind(this,sectionCount,currentCondition,"ApprovalCount");

      var lblRequiredApprovalsCount = new kony.ui.Label({
        "id":  "lblRequiredApprovalsCount"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "bbSknLbl424242SSP15Px",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.SelectCount"),
        "left":"15dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var imgRequiredApprovalsDrop = new kony.ui.Image2({
        "id": "imgRequiredApprovalsDrop"+sectionCount+currentCondition,
        "isVisible": true,
        "src": "listboxuparrow.png",
        "width":"15dp",
        "height":"15dp",
        "right":"10dp",
        "centerY":"50%"
      },{
        "containerWeight": 100
      },{

      });

      var flxFromGroup = new kony.ui.FlexContainer({
        "id":  "flxFromGroup"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"100%",
        "width": "200dp",
        "left":"320dp",
        "top":"0dp",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "centerY":"50%"
      });

      var btnDeleteAndCondition = new kony.ui.Button({
        "id": "btnDeleteAndCondition"+sectionCount+currentCondition, 
        "isVisible": (currentCondition === 0)? false:true,
        "skin": "bbSknBtn4176a4NoBorder",
        "focusSkin": "bbSknBtn4176a4NoBorder",
        "text": kony.i18n.getLocalizedString("kony.mb.common.Delete"),
        "right":"20dp",
		"centerY":"50%",
        "width":kony.flex.USE_PREFERRED_SIZE,
        "height":kony.flex.USE_PREFERRED_SIZE
      });
      btnDeleteAndCondition["onClick"] = this.deletePopupEnable.bind(this,"condition",sectionCount,currentCondition);
      var lblFromGroupHdr = new kony.ui.Label({
        "id":  "lblFromGroupHdr"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "sknlbla0a0a015px",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.FromGroupNC"),
        "left":"0dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": "125dp",
        "top":"20dp"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var flxFromGroupSelected = new kony.ui.FlexContainer({
        "id":  "flxFromGroupSelected"+sectionCount+currentCondition, 
        "isVisible": true,
        "height":"40dp",
        "width": "190dp",
        "left":"0dp",
        "skin":"skne3e3e3br3pxradius",
        "top":"5dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM

      });



      var flxFromGroupDropDown= this.getFromGroupDropDown(sectionCount, currentCondition);
      flxFromGroupSelected["onClick"] = this.dropDownExpand.bind(this,sectionCount,currentCondition,"FromGroup");

      var lblFromGroupSelectedVal = new kony.ui.Label({
        "id":  "lblFromGroupSelectedVal"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "bbSknLbl424242SSP15Px",
        "text": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.SelectGroup"),
        "left":"15dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });

      var imgFromGroupDrop = new kony.ui.Image2({
        "id": "imgFromGroupDrop"+sectionCount+currentCondition,
        "isVisible": true,
        "src": "listboxuparrow.png",
        "width":"15dp",
        "height":"15dp",
        "right":"10dp",
        "centerY":"50%"
      },{
        "containerWeight": 100
      },{

      });

      var flxApprovalWarningMsg = new kony.ui.FlexContainer({
        "id":  "flxApprovalWarningMsg"+sectionCount+currentCondition, 
        "isVisible": false,
        "height":"50dp",
        "width": "100%",
        "left":"0dp",
        "top":"100dp",
        "zIndex": -2,
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_HORIZONTAL

      });

      var imgWarningIcon = new kony.ui.Image2({
        "id": "imgWarningIcon"+sectionCount+currentCondition,
        "isVisible": true,
        "src": "info.png",
        "width":"25dp",
        "height":"25dp",
        "centerY":"50%",
        "left":"20dp"
      },{
        "containerWeight": 100
      },{

      });

      var lblApprovalWarningMsg = new kony.ui.Label({
        "id":  "lblApprovalWarningMsg"+sectionCount+currentCondition, 
        "isVisible": true,
        "skin": "slLabel0d8a72616b3cc47",
        "text": "This signatory group does not have sufficient approvers",
        "left":"10dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "centerY":"50%"
      },{
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      }, {
        //         wrapping:2
      });
      flxApprovalWarningMsg.add(imgWarningIcon);
      flxApprovalWarningMsg.add(lblApprovalWarningMsg);
      flxRequiredApprovals.add(lblRequiredApprovalsHdr);
      flxRequiredAppraovalSelected.add(lblRequiredApprovalsCount);
      flxRequiredAppraovalSelected.add(imgRequiredApprovalsDrop);
      flxRequiredApprovals.add(flxRequiredAppraovalSelected);
      flxRequiredApprovals.add(flxApprovalsDropDown);
      flxConditionInputs.add(flxRequiredApprovals);

      flxFromGroup.add(lblFromGroupHdr);
      flxFromGroupSelected.add(lblFromGroupSelectedVal);
      flxFromGroupSelected.add(imgFromGroupDrop);
      flxFromGroup.add(flxFromGroupSelected);
      flxFromGroup.add(flxFromGroupDropDown);
      flxConditionInputs.add(flxFromGroup);
      flxConditionInputs.add(btnDeleteAndCondition);
      flxConditionInputs.add(flxApprovalWarningMsg);
      flxApprovalConditionValue.add(flxConditionInputs);
      return flxApprovalConditionValue;
    },

    deleteAndCondition: function(sectionCount, currentCondition) {
      var hideDeleteId = "";
      //var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
      //mainFlexHeight = mainFlexHeight - 170;
     // this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
      var allConditions = this.andConditionFlex["section" + sectionCount];
      if (allConditions[0] === "" + sectionCount + currentCondition) {
        this.view.remove(this.view["flxANDText" + allConditions[1]]);
      } else {
        this.view.remove(this.view["flxANDText" + sectionCount + currentCondition]);
      }
      this.view.remove(this.view["flxApprovalConditionValue" + sectionCount + currentCondition]);
      allConditions.splice(allConditions.indexOf("" + sectionCount + currentCondition), 1);
      if (this.view["flxCreateApprovalCondition" + sectionCount].widgets().length === 1) {
        hideDeleteId = this.view["flxCreateApprovalCondition" + sectionCount].widgets()[0]["id"];
        hideDeleteId = this.view[hideDeleteId].widgets()[0]["id"];
        this.view[hideDeleteId].widgets()[2].setVisibility(false);
      } else {
        this.view["btnDeleteAndCondition" + allConditions[0]].setVisibility(true);
      }
      this.andConditionFlex["section" + sectionCount] = allConditions;
      this.view.flxDeletePopup.setVisibility(false);
      this.enableConfirmButton();
    },

    deleteCondition: function(sectionCount) {
      var hideDeleteId = "";
      var allConditions = this.conditionFlex;
     /* var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
      for(var j=0;j<this.andConditionFlex["section" + sectionCount].length;j++){
        mainFlexHeight = mainFlexHeight - 170;
      }
      mainFlexHeight = mainFlexHeight - 130;
      this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";*/
      if (allConditions[0] === "" + sectionCount) {
        this.view.remove(this.view["flxORText" + allConditions[1]]);
      } else {
        this.view.remove(this.view["flxORText" + sectionCount]);
      }
      this.view.remove(this.view["flxConditionSection" + sectionCount]);
      allConditions.splice(allConditions.indexOf("" + sectionCount), 1);

      if (this.view["flxConditionPartMain"].widgets().length === 1) {
        hideDeleteId = this.view["flxConditionPartMain"].widgets()[0]["id"];
        hideDeleteId = this.view[hideDeleteId].widgets()[0]["id"];
        hideDeleteId = this.view[hideDeleteId].widgets()[1]["id"];
        this.view[hideDeleteId].setVisibility(false);
      } else {
        this.view["btnDeleteCondition" + allConditions[0]].setVisibility(true);
      }
      this.conditionFlex = allConditions;
      for(var i = 0;i<allConditions.length;i++){
        this.view["lblConditoinHdr"+allConditions[i]].text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Condition") + " " +(i+1);
      }
      delete this.andConditionFlex["section" + sectionCount];
      this.view.flxDeletePopup.setVisibility(false);
      this.enableConfirmButton();
    },
    
    closeAllDropDown:function(){
      
        if(this.prevSectionCount!==""&&this.prevCurrenctCondition!==""&&this.prevdropDownName!==""){
          this.dropDownExpand(this.prevSectionCount,this.prevCurrenctCondition,this.prevdropDownName);
        }
      
    },

     dropDownExpand: function(sectionCount, currentCondition, dropDownName) {
            var prevDropDown = "";
            this.outSideDropdown = "No";
            this.valueUpdated = "Yes";
            if (this.prevSectionCount === sectionCount && this.prevCurrenctCondition === currentCondition && this.prevdropDownName === dropDownName) {
                prevDropDown = "Yes";
            }
            if (prevDropDown !== "Yes") {
                if (this.prevdropDownName === "ApprovalCount") {
                    this.view["flxApprovalsDropDown" + this.prevSectionCount + this.prevCurrenctCondition].isVisible = false;
					this.view["imgRequiredApprovalsDrop"+this.prevSectionCount+this.prevCurrenctCondition].src = "listboxuparrow.png";
                } else if (this.prevdropDownName === "FromGroup") {
                    this.view["flxFromGroupDropDown" + this.prevSectionCount + this.prevCurrenctCondition].isVisible = false;
					this.view["imgFromGroupDrop"+this.prevSectionCount+this.prevCurrenctCondition].src = "listboxuparrow.png";
                }
            }
            if (dropDownName === "ApprovalCount") {
                if (this.view["flxApprovalsDropDown" + sectionCount + currentCondition].isVisible) {
                    this.view["flxApprovalsDropDown" + sectionCount + currentCondition].isVisible = false;
					this.view["imgRequiredApprovalsDrop"+sectionCount+currentCondition].src = "listboxuparrow.png";
                    this.view["flxANDConditionBtnMain" + sectionCount].zIndex = 10;
                } else {
                    this.view["flxApprovalsDropDown" + sectionCount + currentCondition].isVisible = true;
					this.view["imgRequiredApprovalsDrop"+sectionCount+currentCondition].src = "listboxdownarrow.png";
                    this.view["flxANDConditionBtnMain" + sectionCount].zIndex = -10;
                }
            } else if (dropDownName === "FromGroup") {
                if (this.view["flxFromGroupDropDown" + sectionCount + currentCondition].isVisible) {
                    this.view["flxFromGroupDropDown" + sectionCount + currentCondition].isVisible = false;
					this.view["imgFromGroupDrop"+sectionCount+currentCondition].src = "listboxuparrow.png";
                } else {
                    this.view["flxFromGroupDropDown" + sectionCount + currentCondition].isVisible = true;
					this.view["imgFromGroupDrop"+sectionCount+currentCondition].src = "listboxdownarrow.png";
                }
                this.disableSelectedRow(sectionCount, currentCondition);
            }
            this.prevSectionCount = sectionCount;
            this.prevCurrenctCondition = currentCondition;
            this.prevdropDownName = dropDownName;
        },

    getCountDropDown:function(sectionCount, currentCondition){

      var flxApprovalsDropDown = new kony.ui.FlexScrollContainer({
        "id": "flxApprovalsDropDown"+sectionCount+currentCondition,
        "top": "5dp",
        "left": "0dp",
        "width": "190dp",
        "height": "330dp",
        "skin":"ICSknFlx464545Rds3Px",
        "zIndex": 1022,
        "isVisible": false,
        "enableScrolling": true,
        "scrollDirection": kony.flex.SCROLL_VERTICAL,
        "verticalScrollIndicator": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "clipBounds": false,
      });

      for(var i = 0;i<10;i++){
        var listCount = i+1;
        var lblApprovalCount = new kony.ui.Label({
          "id":  "lblApprovalCount"+sectionCount+currentCondition+i, 
          "isVisible": true,
          "skin": "bbSknLbl72727217pxSSP",
          "hoverSkin":"ICSknLblF7F7F7SSP17Px",
          "text": ""+listCount,
          "top":"0dp",
          "height": "50dp",
          "width": "99%"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [10, 10, 10, 10],
        }, {
          //         wrapping:2
        });
        lblApprovalCount["onTouchEnd"] = this.selectApprovalCount.bind(this,lblApprovalCount["text"],sectionCount, currentCondition);
        flxApprovalsDropDown.add(lblApprovalCount);
      }

      return flxApprovalsDropDown;
    },
    selectApprovalCount:function(selectedValue,sectionCount,currentCondition){
      this.valueUpdated = "Yes";
      this.prevSectionCount ="" ;
      this.prevCurrenctCondition ="" ;
      this.prevdropDownName ="" ;
      this.view["lblRequiredApprovalsCount"+sectionCount+currentCondition].text = selectedValue;
      this.view["flxApprovalsDropDown"+sectionCount+currentCondition].isVisible = false;

      var selectedGroup= this.view["lblFromGroupSelectedVal"+sectionCount+currentCondition].text;
      var userCount = parseInt(selectedGroup.substring((selectedGroup.indexOf("(")+1), selectedGroup.indexOf(")")));
      var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
      if(parseInt(selectedValue) > userCount){
        this.view["flxApprovalWarningMsg"+sectionCount+currentCondition].isVisible = true;
        this.view["flxConditionInputs"+sectionCount+currentCondition].height = "160dp";
       // mainFlexHeight = mainFlexHeight + 50;
        //this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
      }else{
        this.view["flxApprovalWarningMsg"+sectionCount+currentCondition].isVisible = false;
        if(this.view["flxConditionInputs"+sectionCount+currentCondition].height === "160dp"){
       // mainFlexHeight = mainFlexHeight  - 50;
        //this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
        }
        this.view["flxConditionInputs"+sectionCount+currentCondition].height = "110dp";
      }
      this.enableConfirmButton();
    },
    getFromGroupDropDown:function(sectionCount, currentCondition){

      var flxFromGroupDropDown = new kony.ui.FlexScrollContainer({
        "id": "flxFromGroupDropDown"+sectionCount+currentCondition,
        "top": "5dp",
        "left": "0dp",
        "autogrowMode":kony.flex.AUTOGROW_HEIGHT,
        "width": "190dp",
        "maxHeight": "330dp",
        "skin":"ICSknFlx464545Rds3Px",
        "zIndex": 1022,
        "isVisible": false,
        "enableScrolling": true,
        "scrollDirection": kony.flex.SCROLL_VERTICAL,
        "verticalScrollIndicator": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "clipBounds":false
      });

      if(!kony.sdk.isNullOrUndefined(this.allSignatoryGroups.coreCustomers[0])){
      for(var i = 0;i<this.allSignatoryGroups.coreCustomers[0].signatoryGroups.length;i++){
        var signatoryGroupName = this.allSignatoryGroups.coreCustomers[0].signatoryGroups[i].signatoryGroupName;
        //var userCount = this.allSignatoryGroups.coreCustomers[0].signatoryGroups[i].noOfUsers;
        var userCount = (kony.sdk.isNullOrUndefined(this.allSignatoryGroups.coreCustomers[0].signatoryGroups[i].noOfUsers)) ? "0" : this.allSignatoryGroups.coreCustomers[0].signatoryGroups[i].noOfUsers;
        var lblFromGroupValue = new kony.ui.Label({
          "id":  "lblFromGroupValue"+sectionCount+currentCondition+i, 
          "isVisible": true,
          "skin": "bbSknLbl72727217pxSSP",
          "hoverSkin":"ICSknLblF7F7F7SSP17Px",
          "text": signatoryGroupName+" ("+userCount+")",
          "top":"0dp",
          "height": "50dp",
          "width": "99%"
        },{
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [6, 6, 6, 6],
        }, {
          //         wrapping:2
        });
        lblFromGroupValue["onTouchEnd"] = this.selectFromGroup.bind(this,lblFromGroupValue["text"],userCount,sectionCount, currentCondition);
        flxFromGroupDropDown.add(lblFromGroupValue);

      }
      }
      return flxFromGroupDropDown;
    },
    disableSelectedRow: function(sectionCount, currentCondition) {
      var selectedGroup = this.andConditionFlex["section" + sectionCount];
      var disableValueList = [];
      for (var i = 0; i < selectedGroup.length; i++) {
        for (var j = 0; j < this.allSignatoryGroups.coreCustomers[0].signatoryGroups.length; j++) {
          if (this.view["lblFromGroupValue" + sectionCount + currentCondition + j].text === this.view["lblFromGroupSelectedVal" + selectedGroup[i]].text) {
            this.view["lblFromGroupValue" + sectionCount + currentCondition + j].setEnabled(false);
            this.view["lblFromGroupValue" + sectionCount + currentCondition + j].skin = "ICSknLblF7F7F7SSP17Px";
            this.view["lblFromGroupValue" + sectionCount + currentCondition + j].hoverSkin = "ICSknLblF7F7F7SSP17Px";
            disableValueList.push(this.view["lblFromGroupValue" + sectionCount + currentCondition + j].text);
          } else {
            if(!disableValueList.includes(this.view["lblFromGroupValue" + sectionCount + currentCondition + j].text)){
              this.view["lblFromGroupValue" + sectionCount + currentCondition + j].setEnabled(true);
              this.view["lblFromGroupValue" + sectionCount + currentCondition + j].skin = "bbSknLbl72727217pxSSP";
              this.view["lblFromGroupValue" + sectionCount + currentCondition + j].hoverSkin = "ICSknLblF7F7F7SSP17Px";
            }
          }
        }
      }
    },

    selectFromGroup:function(selectedValue,userCount,sectionCount,currentCondition){
      this.valueUpdated = "Yes";
      this.prevSectionCount ="" ;
      this.prevCurrenctCondition ="" ;
      this.prevdropDownName ="" ;
      this.view["lblFromGroupSelectedVal"+sectionCount+currentCondition].text = selectedValue;
      this.view["flxFromGroupDropDown"+sectionCount+currentCondition].isVisible = false;
      var selectedAppCount= parseInt(this.view["lblRequiredApprovalsCount"+sectionCount+currentCondition].text);
      var mainFlexHeight  = parseInt(this.view.flxApprovalConditionContainer.height);
      if(selectedAppCount > parseInt(userCount)){
        this.view["flxApprovalWarningMsg"+sectionCount+currentCondition].isVisible = true;
        this.view["flxConditionInputs"+sectionCount+currentCondition].height = "160dp";
       // mainFlexHeight = mainFlexHeight + 50;
       // this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
      }else{
        this.view["flxApprovalWarningMsg"+sectionCount+currentCondition].isVisible = false;
        if(this.view["flxConditionInputs"+sectionCount+currentCondition].height === "160dp"){
        //mainFlexHeight = mainFlexHeight - 50;
        //this.view.flxApprovalConditionContainer.height = mainFlexHeight+"dp";
        }
        this.view["flxConditionInputs"+sectionCount+currentCondition].height = "110dp";
      }
      this.enableConfirmButton();
    },

    editApprovalConditions:function(rules, groupList) {
      groupList = groupList.replaceAll("[", "");
      groupList = groupList.replaceAll("]", "");
      groupList = groupList.split(",");
      rules = rules.replaceAll("][", "],[");
      rules = JSON.parse(rules);
      this.createApprovalConditionSection(0);
      this.selectApprovalCount("" + rules[0][0], 0, 0);
      var userCount = (kony.sdk.isNullOrUndefined(this.allSignatoryValues[groupList[0]].noOfUsers)) ? "0" : this.allSignatoryValues[groupList[0]].noOfUsers;
      var groupName = this.allSignatoryValues[groupList[0]].signatoryGroupName + " (" + userCount + ")";
      this.selectFromGroup(groupName, userCount, 0, 0);
      for (var k = 1; k < rules[0].length; k++) {
        this.newAddCondition(0);
        this.selectApprovalCount("" + rules[0][k], 0, k);
        userCount = (kony.sdk.isNullOrUndefined(this.allSignatoryValues[groupList[k]].noOfUsers)) ? "0" : this.allSignatoryValues[groupList[k]].noOfUsers;
        groupName = this.allSignatoryValues[groupList[k]].signatoryGroupName + " (" + userCount + ")";
        this.selectFromGroup(groupName, userCount, 0, k);
      }

      for (var i = 1; i < rules.length; i++) {
        this.addNewCondition();
        this.selectApprovalCount("" + rules[i][0], i, 0);
        userCount = (kony.sdk.isNullOrUndefined(this.allSignatoryValues[groupList[0]].noOfUsers)) ? "0" : this.allSignatoryValues[groupList[0]].noOfUsers;
        groupName = this.allSignatoryValues[groupList[0]].signatoryGroupName + " (" + userCount + ")";
        this.selectFromGroup(groupName, userCount, i, 0);
        for (var j = 1; j < rules[i].length; j++) {
          this.newAddCondition(i);
          this.selectApprovalCount("" + rules[i][j], i, j);
          userCount = (kony.sdk.isNullOrUndefined(this.allSignatoryValues[groupList[j]].noOfUsers)) ? "0" : this.allSignatoryValues[groupList[j]].noOfUsers;
          groupName = this.allSignatoryValues[groupList[j]].signatoryGroupName + " (" + userCount + ")";
          this.selectFromGroup(groupName, userCount, i, j);
        }
      }
      for(var n = 0 ;n<rules.length;n++){
        for (var m = 0; m < rules[n].length; m++) {
          if (rules[n][m] === 0) {
            this.deleteAndCondition(n, m);
          }   
        }
      }
    },

    manipulateRulesConditions: function() {
      var approveGrp = [];
      var groupList = "[";
      /*for (var i = 0; i < sectionCount; i++) {
        if (!kony.sdk.isNullOrUndefined(this.andConditionFlex["section" + i])) {
          for (var j = 0; j < this.andConditionFlex["section" + i].length; j++) {
            var conditionCount = this.andConditionFlex["section" + i][j];
            var fromGroup = this.view["lblFromGroupSelectedVal" + conditionCount].text;
            fromGroup = fromGroup.slice(0, fromGroup.indexOf("(") - 1);
            if (!approveGrp.includes(fromGroup)) {
              approveGrp.push(this.signatoryByName[fromGroup].signatoryGroupId);
            }
          }
        }
      }*/
      for(var key in this.andConditionFlex){
        for (var j = 0; j < this.andConditionFlex[key].length; j++) {
          var conditionCount = this.andConditionFlex[key][j];
          var fromGroup = this.view["lblFromGroupSelectedVal" + conditionCount].text;
          fromGroup = fromGroup.slice(0, fromGroup.indexOf("(") - 1);
          if (!approveGrp.includes(fromGroup)) {
            approveGrp.push(this.signatoryByName[fromGroup].signatoryGroupId);
          }
        }
      }

      var dummyCount = [];
      for (var n = 0; n < approveGrp.length; n++) {
        dummyCount.push(0);
        if (n === approveGrp.length - 1) {
          groupList = groupList + approveGrp[n];
        } else {
          groupList = groupList + approveGrp[n] + ",";
        }
      }
      groupList = groupList + "]";
      var ruleLists = "[";

      for(var keys in this.andConditionFlex){
        var rules = JSON.parse(JSON.stringify(dummyCount));
        var appRule = "[";
        if (!kony.sdk.isNullOrUndefined(this.andConditionFlex[keys])) {
          for (var m = 0; m < this.andConditionFlex[keys].length; m++) {
            var conditionNo = this.andConditionFlex[keys][m];
            var fromGroupRule = this.view["lblFromGroupSelectedVal" + conditionNo].text;
            fromGroupRule = fromGroupRule.slice(0, fromGroupRule.indexOf("(") - 1);
            var approveCount = this.view["lblRequiredApprovalsCount" + conditionNo].text;
            rules[approveGrp.indexOf(this.signatoryByName[fromGroupRule].signatoryGroupId)] = approveCount;
          }
          for (var p = 0; p < approveGrp.length; p++) {
            if (p === approveGrp.length - 1) {
              appRule = appRule + rules[p]+"]";
            } else {
              appRule = appRule + rules[p] + ",";
            }
          }
        }
        ruleLists = ruleLists+appRule;
      }
      ruleLists=ruleLists+"]";
      var groupRules = ruleLists.replaceAll("][","],[");
      var rangeDetails = this.rangeDetails;
      rangeDetails["conditions"]["groupRule"] = groupRules;
      rangeDetails["conditions"]["groupList"] = groupList;
      applicationManager.getNavigationManager().setCustomInfo("SELECTED_RANGE",rangeDetails);
      applicationManager.getNavigationManager().navigateTo("frmAddRulesSignatoryGrp");
    },
    backToRules:function(){
      applicationManager.getNavigationManager().setCustomInfo("SELECTED_RANGE",undefined);
      applicationManager.getNavigationManager().navigateTo("frmAddRulesSignatoryGrp");
    },
    isEmptyNullorUndefined : function(data){
      if(data === "" || data === null || data ===undefined)
        return true;
      else
        return false;
    },

    enableConfirmButton:function(){
      var sectionCount = this.andConditionFlex;
      this.unfilledData = "";
      for(var key in sectionCount){
        for(var i =0; i< sectionCount[key].length;i++){

          if(this.view["lblRequiredApprovalsCount" + sectionCount[key][i]].text ==="Select Count" || this.view["lblFromGroupSelectedVal" + sectionCount[key][i]].text ==="Select Group"){
            this.unfilledData = "Yes";
          }
        }
      } 
      if(this.unfilledData === "Yes"){
        FormControllerUtility.disableButton(this.view.btnConfirmSave);
      }else{
        FormControllerUtility.enableButton(this.view.btnConfirmSave);
      }

    }

  };
});