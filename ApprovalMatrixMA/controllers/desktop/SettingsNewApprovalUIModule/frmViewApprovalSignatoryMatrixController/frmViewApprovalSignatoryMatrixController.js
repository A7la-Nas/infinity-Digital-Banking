define(['FormControllerUtility'], function(FormControllerUtility) {
  //Type your controller code here 
  return {
    contractsApprovalMatrix: null,
    doInit: function() {
      this.allSignatoryValues = {};

      this.actionID = "";
      this.contractData = {};
      this.isTotalApproversVisible = false;
      this.isMatrixDisabled = false;
    },
    frmPreShow: function() {
      var scope = this;
      this.selectedSegData = {};
	    this.seti18nValues();
      this.view.btnNonMonetaryEditRule.text=kony.i18n.getLocalizedString( "i18n.SignatoryMatrix.EditRule");
      this.imgArrowTransform = this.getImgTransformObj();
      this.view.imgTurnOnOfApprovalCustLevl.cursorType = "Pointer";
      this.view.imgWarningClose.onTouchStart = function(){
        this.view.flxDowntimeWarning.setVisibility(false);
      }.bind(this);
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
      //this.currenctCurrency = applicationManager.getConfigurationManager().configurations.items.CURRENCYCODE;
      this.isManageEnabled = applicationManager.getConfigurationManager().checkUserPermission('APPROVAL_MATRIX_MANAGE');
      this.configManager = applicationManager.getConfigurationManager();
      //this.currencyCode = this.configManager.configurations.items.CURRENCYCODE;
      this.view.btnBackSignatoryGruops.onClick = this.navigateToSignatoryform.bind(this);
      var navMan = applicationManager.getNavigationManager();
      this.allSignatoryGroupValues(navMan.getCustomInfo("AllSignatoryGroups"));
      this.view.btnCreateNewGroup.onClick = function() {
        scope.navigateToCreateNewGroup();
      }.bind(this);
      this.view.flxImgClose.onClick = function() {
        scope.view.flxAckHeader.isVisible = false;
      }.bind(this);
      this.view.btnPTRCreateMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this,"MAX_TRANSACTION_LIMIT");
      this.view.btnCreateDailyLimitsMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this,"DAILY_LIMIT");
      this.view.btnWeeklyLimitsCreateMatrix.onClick = this.navfrmAddRulesSignatoryGrp.bind(this,"WEEKLY_LIMIT");
      this.permissionKey = this.presenter.getActionNameBasedOnPermissions();
      if(this.permissionKey === kony.i18n.getLocalizedString("i18n.locateus.view")){
        this.editPermission = false;
      }else if(this.permissionKey === kony.i18n.getLocalizedString("i18n.locateus.view")+("/" + kony.i18n.getLocalizedString("i18n.billPay.Edit"))){
        this.editPermission = true;
      }else{
        this.editPermission = false;
      }
      this.view.imgAckClose.onTouchEnd = function(){
        scope.view.flxAcknowledgementPopup.setVisibility(false);
		navMan.setCustomInfo("NONMONETARY_MESSAGE", "");
      };
      if(!kony.sdk.isNullOrUndefined(navMan.getCustomInfo("NONMONETARY_MESSAGE")) && navMan.getCustomInfo("NONMONETARY_MESSAGE")!==""){
        this.view.flxAcknowledgementPopup.setVisibility(true);
        this.view.lblAckNotificationContent.text = navMan.getCustomInfo("NONMONETARY_MESSAGE");
      }else{
        this.view.flxAcknowledgementPopup.setVisibility(false);
      }
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      if(!scope.isEmptyNullorUndefined(accountDetails)){
        if(!scope.isEmptyNullorUndefined(accountDetails.accountName)){
          this.entryPoint = "frmAccountLevelMatrixSignatoryGrp";
        }
        else{
          this.entryPoint = "frmApprovalmatrix";
        }
      }
    },
    navfrmAddRulesSignatoryGrp:function(type){
      var limitDetails = {};
      limitDetails["limitType"] = type;
      limitDetails["limitFlow"] = "CREATE";

      applicationManager.getNavigationManager().setCustomInfo("SELECTED_LIMIT_DETAILS",limitDetails);
      applicationManager.getNavigationManager().navigateTo("SettingsNewApprovalUIModule/frmAddRulesSignatoryGrp");
    },
    navigateToCreateNewGroup: function() {
      applicationManager.getNavigationManager().navigateTo("SettingsNewApprovalUIModule/frmCreateSignatoryGroup");
    },
    frmPostShow: function() {
      this.view.imgPTRNoRecordsIcon.src = "info_blue.png";
      this.view.imgDailyLimitsNoRecordsIcon.src = "info_blue.png";
      this.view.imgWeeklyLimitsNoRecordsIcon.src = "info_blue.png";
      this.view.imgNonMonetaryNoRecordsIcon.src = "info_blue.png";
       if (kony.application.getCurrentBreakpoint() <= 1024)
            {
              this.view.customfooternew.flxFooterMenu.left="5.05%";
              this.view.customfooternew.lblCopyright.left="5.05%";
             }
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
      if (kony.application.getCurrentBreakpoint() <= 1024) {
      this.view.flxApprovalNonMonetaryAccountWrapper.left = "0px";
      } else if (kony.application.getCurrentBreakpoint() >= 1366) {
      this.view.flxApprovalNonMonetaryAccountWrapper.left = "0px";
      }
      }
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
	  this.seti18nValues();
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
          applicationManager.getNavigationManager().setCustomInfo("SELECTED_VIEWMODEL", viewModel);
          applicationManager.getNavigationManager().setCustomInfo("SELECTED_ACCOUNT_DETAILS",viewModel.contractDetails);
          this.showApprovalMatrixWrapper(viewModel);
        }
        if(this.isEmptyNullorUndefined(viewModel.approvalMatrix)){
          this.entryPoint = "frmApprovalmatrix";
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
      this.view.flxCustomerName.width = "35%";
      this.view.flxCustomerID.width = "28%";
      this.view.flxContract.width = "30%";
      this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("konybb.settings.signatoryGroups");

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
    getImgTransformObj: function() {
            var imgTransformObj = kony.ui.makeAffineTransform();
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
              imgTransformObj.rotate(180);
            } else {
              imgTransformObj.rotate(0);
            }
            return imgTransformObj;
     },
	seti18nValues: function() {
            this.view.lblDailyLimitsApprovalLimit.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.ApprovalRange");
            this.view.lblWeeklyApprovalLimits.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.ApprovalRange");
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
      if (this.entryPoint === "frmAccountLevelMatrixSignatoryGrp") {
        this.presenter.noServiceNavigateToAccountLevel();
      } else {
        this.presenter.enterProfileSettings("approvalMatrix");
      }
    },
    getFeatureSectionHeaders: function() {
      var currentbreakpoint = kony.application.getCurrentBreakpoint();
      return ([{
        "flxAccountSelection": {
          "onClick": function() {
            var segData = this.view.Features.segTemplates.data;
            var sectionData = segData[0][0];
            if (sectionData.lblDropDown.text === "O") {
              this.selectFirstFeature();
              if(this.selcetedSectionIndex === 1){
                this.segmentRowClickHandler(this.view.Features.segTemplates,0,0);
              }else{
                this.segmentRowClickHandler(this.view.Features.segTemplates,this.selcetedSectionIndex,this.selectedIndex);     
              }
            } else {
              this.collapseSection();
            }
            this.view.forceLayout();
          }.bind(this)
        },
        "flxInnerRole":{
          "skin":"skne3e3e3br3pxradius"
        },
        "lblDropDown": {
          "text": "O"
        },
        "lblAccountSelect": {
          "text": kony.i18n.getLocalizedString("konybb.approvals.monetary"),
          "left": (currentbreakpoint >= 1366) ? "55dp" : "40dp",
        },
        "lblHeadingTop":{
			"isVisible":true
		},
		"lblHeadingBottom":{
			"isVisible":true
		},
        "flxDropDown": {
            "left": (currentbreakpoint >= 1366) ? "15dp" : "8dp"
        }
      }, {
        "flxAccountSelection": {
          "onClick": function() {
            var segData = this.view.Features.segTemplates.data;
            var sectionData = segData[1][0];
            if (sectionData.lblDropDown.text === "O") {
              this.selectFirstNonFinFeature();
              if(this.selcetedSectionIndex === 0){
                this.segmentRowClickHandler(this.view.Features.segTemplates,1,0);
              }else{
                this.segmentRowClickHandler(this.view.Features.segTemplates,this.selcetedSectionIndex,this.selectedIndex);     
              }
            } else {
              this.collapseSection();
            }
            this.view.forceLayout();
          }.bind(this)
        },
        "flxInnerRole":{
          "skin":"skne3e3e3br3pxradius"
        },
        "lblDropDown": {
          "text": "O"
        },
        "lblAccountSelect": {
          "text": kony.i18n.getLocalizedString("konybb.approvals.nonmonetary"),
          "left": (currentbreakpoint >= 1366) ? "55dp" : "40dp",
        },
        "lblHeadingTop":{
			"isVisible":true,
			"top":"0dp"
		},
		"lblHeadingBottom":{
			"isVisible":true
		},
        "flxDropDown": {
            "left": (currentbreakpoint >= 1366) ? "15dp" : "8dp"
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
        "flxAccountSelection":"flxAccountSelection",
        "flxInnerRole":"flxInnerRole",
        "lblDropDown": "lblDropDown",
        "lblAccountSelect": "lblAccountSelect",
        "lblHeadingTop":"lblHeadingTop",
		"lblHeadingBottom":"lblHeadingBottom"
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
        this.view.flxCustomerName.width = "25%";
        this.view.flxCustomerID.width = "20%";
        this.view.flxContract.width = "24%";
        this.view.lblAccountNameValue.text = contractDetails.accountName || "";
      } else {
        this.view.flxAccountName.isVisible = false;
        this.view.flxCustomerName.width = "35%";
        this.view.flxCustomerID.width = "28%";
        this.view.flxContract.width = "30%";
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
      this.onOffMatrixButtonDisable();
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
    isEmptyNullorUndefined : function(data){
      if(data === "" || data === null || data===undefined)
        return true;
      else
        return false;
    },
    showApprovalMatrixWrapper: function(viewModel) {
      this.view.flxApprovalMatrixContainer.isVisible = true;
      this.view.flxSignatoryGroups.isVisible = false;
      this.entryPoint = kony.application.getPreviousForm().id;
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      if(!this.isEmptyNullorUndefined(accountDetails.accountName)){
		this.entryPoint = "frmAccountLevelMatrixSignatoryGrp";
      }
      else
      {
        this.entryPoint = "frmApprovalmatrix";
      }
      this.setFeatures(viewModel.features);
      this.showOrHideSwitch();
      this.collapseSection();
      this.setFeaturesComponent();
      this.selectFirstFeature();
      this.setContractDetails(viewModel.contractDetails);
      this.contractData = viewModel.contractDetails;
      var navMan = applicationManager.getNavigationManager();
      if ((!kony.sdk.isNullOrUndefined(navMan.getCustomInfo("SELECTED_NONMONETARY")) || !kony.sdk.isNullOrUndefined(navMan.getCustomInfo("SELECTED_LIMIT_DETAILS"))) || (this.entryPoint !== "frmApprovalmatrix" && this.entryPoint !== "frmAccountLevelMatrixSignatoryGrp")) {
        if(navMan.getCustomInfo("SELECTED_SECTIONINDEX") === 1){
          this.selectFirstNonFinFeature();
        } 
        //this.view.Features.segTemplates.setData(JSON.parse(navMan.getCustomInfo("SELECTED_SEGWIDGET")));
        this.segmentRowClickHandler(this.view.Features.segTemplates, navMan.getCustomInfo("SELECTED_SECTIONINDEX"), navMan.getCustomInfo("SELECTED_ROWINDEX"));
      } else {
        if (viewModel.entryPoint === "frmApprovalmatrix") this.segmentRowClickHandler(this.view.Features.segTemplates, 0, 0);
        else this.segmentRowClickHandler(this.view.Features.segTemplates, 0, this.selectedIndex);
        //this.view.switchApprovals.onTouchEnd = this.disableApprovalMatrix.bind(this);
      }
      //navMan.setCustomInfo("SELECTED_NONMONETARY", null);
      navMan.setCustomInfo("SELECTED_LIMIT_DETAILS", null);
      this.view.imgTurnOnOfApprovalCustLevl.onTouchEnd = this.disableApprovalMatrix.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
    },

    segmentRowClickHandler: function(segWidget, sectionIndex, rowIndex) {
      this.selectedIndex = rowIndex;
      this.selcetedSectionIndex = sectionIndex;
      this.selcetedSectionIndex = sectionIndex;
      FormControllerUtility.showProgressBar(this.view);
      this.setSelectedIndicator(segWidget, sectionIndex, rowIndex);
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("SELECTED_SEGWIDGET", JSON.stringify(segWidget.data));
      navMan.setCustomInfo("SELECTED_SECTIONINDEX", sectionIndex);
      navMan.setCustomInfo("SELECTED_ROWINDEX", rowIndex);
      this.setApprovalMatrixForFeature(segWidget.data[sectionIndex][1][rowIndex].actionId, sectionIndex);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.imgPTRNoRecordsIcon.src = "info_blue.png";
      this.view.imgDailyLimitsNoRecordsIcon.src = "info_blue.png";
      this.view.imgWeeklyLimitsNoRecordsIcon.src = "info_blue.png";
      this.view.imgNonMonetaryNoRecordsIcon.src = "info_blue.png";
    },
    setApprovalMatrixForFeature: function(actionId, sectionIndex) {
      this.actionID = actionId;
      var approvalMatrix = sectionIndex === 0 ? this.matrix[actionId] : this.nonFinMatrix[actionId];
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("SELECTED_FEATURE_DETAILS", approvalMatrix);
      var data = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var currency = "USD";
      try
      { 
        currency = (kony.sdk.isNullOrUndefined(data["DAILY_LIMIT"][0].currency))?'USD':data["DAILY_LIMIT"][0].currency;
      }catch(err){}
      this.currenctCurrency =   formatUtilManager.getCurrencySymbol(currency);
      this.approvalMatrixList(approvalMatrix, sectionIndex);
    },
    setSelectedIndicator: function(segWidget, sectionIndex, rowIndex) {
      var self = this;
      var segData = segWidget.data[sectionIndex][1];
      segData.forEach(function(row, index) {
        if (index === rowIndex) {
          row["imgArrow"].isVisible = true;
          row["imgArrow"].transform = self.imgArrowTransform;
          row["flxInnerRole"] ={
            "skin":"sknflxfbfbfb1pxShadowc0c0c0"
          };
        } else {
          row["imgArrow"].isVisible = false;
          row["imgArrow"].transform = self.imgArrowTransform;
          row["flxInnerRole"] ={
            "skin":"skne3e3e3br3pxradius"
          };
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
      this.allSignatoryGroups = response;
      if(!kony.sdk.isNullOrUndefined(response.coreCustomers[0])){
        this.view.flxDowntimeWarning.setVisibility(false);
      for(var i = 0;i<response.coreCustomers[0].signatoryGroups.length;i++){
        this.allSignatoryValues[response.coreCustomers[0].signatoryGroups[i].signatoryGroupId] = response.coreCustomers[0].signatoryGroups[i];
      }
      }else{
        this.view.flxDowntimeWarning.setVisibility(true);
        this.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("Konybb.SignatoryGroups.ThisCustomerDontHaveAnySignatoryGroups");
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
        this.view.flxApprovalMatrixAccountWrapper.setVisibility(true);
        this.view.flxApprovalNonMonetaryAccountWrapper.setVisibility(false);
      }
      else 
      {
        this.view.flxApprovalMatrixAccountWrapper.setVisibility(false);
        this.view.flxApprovalNonMonetaryAccountWrapper.setVisibility(true);
        this.view.flxNonMonetaryApprovalConditionDetail.removeAll(this.view.flxNonMonetaryApprovalConditionDetail.widgets());
        //this.view.segApprovalMatrix.setData(this.prepareSegmentDataForApprovalMatrixNonMonetary(segmentData));
        applicationManager.getNavigationManager().setCustomInfo("SELECTED_NONMONETARY",segmentData);
        this.setNonMonetaryLimitValues(segmentData);
      }
    },

    onOffMatrixButtonDisable:function(){
      var segmentData = this.selectedSegData;
      for(var keys in segmentData) {
        if(keys === "DAILY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            // this.view.flxDailyLimitsNoRecords.setVisibility(false);
            this.view.btnCreateDailyLimitsMatrix.setVisibility(false);
            this.view.btnEditDailyLimitsMatrix.setVisibility(this.editPermission);
          }else{
            // this.view.flxDailyLimitsNoRecords.setVisibility(true);
            this.view.btnEditDailyLimitsMatrix.setVisibility(false);
            this.view.btnCreateDailyLimitsMatrix.setVisibility(this.editPermission);
          }
          if(this.isMatrixDisabled){
            this.view.btnCreateDailyLimitsMatrix.setVisibility(false);
            this.view.btnEditDailyLimitsMatrix.setVisibility(false);
          }
        }else if(keys === "WEEKLY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            // this.view.flxWeeklyLimitsNoRecords.setVisibility(false);
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(false);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(this.editPermission);
          }else{
            // this.view.flxWeeklyLimitsNoRecords.setVisibility(true);
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(this.editPermission);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
          }
          if(this.isMatrixDisabled){
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(false);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
          }
        }else if(keys === "MAX_TRANSACTION_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            //   this.view.flxPTRNoRecords.setVisibility(false);
            this.view.btnPTRCreateMatrix.setVisibility(false);
            this.view.btnPTREditRule.setVisibility(this.editPermission);
          }else{
            //  this.view.flxPTRNoRecords.setVisibility(true);
            this.view.btnPTRCreateMatrix.setVisibility(this.editPermission);
            this.view.btnPTREditRule.setVisibility(false);
          }
          if(this.isMatrixDisabled){
            this.view.btnPTRCreateMatrix.setVisibility(false);
            this.view.btnPTREditRule.setVisibility(false);
          }
        }
      }
    },


    /**     
	 * Funciton setValuesForApprovalMatrix
     * To call the function based on limits
     */
    setValuesForApprovalMatrix:function(segmentData){
      this.selectedSegData = segmentData;
      this.view.lblSelectedFeatureValue.text = segmentData.featureName+" - "+segmentData.actionName;
      if(kony.application.getCurrentBreakpoint() === 1024){
      this.view.lblSelectedFeatureValue.text = this.view.lblSelectedFeatureValue.text.slice(0,35)+"...";
      }else if(kony.application.getCurrentBreakpoint() >= 1366){
        this.view.lblSelectedFeatureValue.text = this.view.lblSelectedFeatureValue.text.length > 100 ? 
          this.view.lblSelectedFeatureValue.text.slice(0,90)+"..." : this.view.lblSelectedFeatureValue.text ;
      }
      this.prevWidgetId = "";
      this.prevlimitType = "";
      for(var keys in segmentData) {
        if(keys === "DAILY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxDailyLimitsNoRecords.setVisibility(false);
            this.view.lblDailyLimitsSeparator3.setVisibility(false);
            this.view.flxDailyApprovalListValues.setVisibility(true);
            this.view.btnCreateDailyLimitsMatrix.setVisibility(false);
            this.view.btnEditDailyLimitsMatrix.setVisibility(this.editPermission);

            this.view.btnEditDailyLimitsMatrix.onClick = this.editApprovalMatrix.bind(this,"DAILY_LIMIT");
            this.setDailyLimitValues(segmentData[keys]);
          }else{
            this.view.flxDailyLimitsNoRecords.setVisibility(true);
            this.view.lblDailyLimitsSeparator3.setVisibility(true);
            this.view.flxDailyApprovalListValues.setVisibility(false);
            this.view.btnEditDailyLimitsMatrix.setVisibility(false);
            this.view.btnCreateDailyLimitsMatrix.setVisibility(this.editPermission);
          }
          if(this.isMatrixDisabled){
            this.view.btnCreateDailyLimitsMatrix.setVisibility(false);
            this.view.btnEditDailyLimitsMatrix.setVisibility(false);
          }
        }else if(keys === "WEEKLY_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxWeeklyLimitsNoRecords.setVisibility(false);
            this.view.lblWeeklyLimitsSeparator3.setVisibility(false);
            this.view.flxWeeklyApprovalListValues.setVisibility(true);
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(false);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(this.editPermission);
            this.view.btnWeeklyLimitsEditMatrix.onClick = this.editApprovalMatrix.bind(this,"WEEKLY_LIMIT");
            this.setWeeklyLimitValues(segmentData[keys]);
          }else{
            this.view.flxWeeklyLimitsNoRecords.setVisibility(true);
            this.view.lblWeeklyLimitsSeparator3.setVisibility(true);
            this.view.flxWeeklyApprovalListValues.setVisibility(false);
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(this.editPermission);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
          }
          if(this.isMatrixDisabled){
            this.view.btnWeeklyLimitsCreateMatrix.setVisibility(false);
            this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
          }
        }else if(keys === "MAX_TRANSACTION_LIMIT"){
          if(!kony.sdk.isNullOrUndefined(segmentData[keys].length) && segmentData[keys].length !== 0){
            this.view.flxPTRNoRecords.setVisibility(false);
            this.view.lblPTRSeparator3.setVisibility(false);
            this.view.flxPTRApprovalListValues.setVisibility(true);
            this.view.btnPTRCreateMatrix.setVisibility(false);
            this.view.btnPTREditRule.setVisibility(this.editPermission);
            this.view.btnPTREditRule.onClick = this.editApprovalMatrix.bind(this,"MAX_TRANSACTION_LIMIT");
            this.setPTRLimitValues(segmentData[keys]);
          }else{
            this.view.flxPTRNoRecords.setVisibility(true);
            this.view.lblPTRSeparator3.setVisibility(true);
            this.view.flxPTRApprovalListValues.setVisibility(false);
            this.view.btnPTRCreateMatrix.setVisibility(this.editPermission);
            this.view.btnPTREditRule.setVisibility(false);
          }
          if(this.isMatrixDisabled){
            this.view.btnPTRCreateMatrix.setVisibility(false);
            this.view.btnPTREditRule.setVisibility(false);
          }
        }
      }
    },
    /**     
	 * Funciton setDailyLimitValues
     * To set the Daily limit values and create the UI
     */
    setDailyLimitValues:function(data){
      this.view.flxDailyApprovalListValues.setVisibility(true);
      var nagativeRowCount = 0;
      for(var i=0 ;i<data.length;i++){
        if (!(data[i].lowerlimit === "-1.00" && data[i].upperlimit === "-1.00")) {
          if(data[i].groupRule){
          data[i].groupRule = data[i].groupRule.replaceAll("][", "],[");
          if (!kony.sdk.isNullOrUndefined(JSON.parse(data[i].groupRule)) && JSON.parse(data[i].groupRule).length === 1 && (JSON.parse(data[i].groupRule)[0].filter(x => x == 0).length === JSON.parse(data[i].groupRule)[0].length)) {
            data[i].groupList = "[]";
            data[i].groupRule = "[]";
          }
        }
          nagativeRowCount++;
          var approveRequired = "";
          var approvalLimit = "";
          if(data[i].upperlimit === "-1.00" || data[i].upperlimit === "0.00"){
            approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " "+this.currenctCurrency+data[i].lowerlimit;
          }else if(data[i].lowerlimit === "-1.00"){
            approvalLimit =kony.i18n.getLocalizedString("i18n.signatory.upto")+ " "+this.currenctCurrency+data[i].upperlimit;
          }
          else{
            approvalLimit = "Between "+this.currenctCurrency+data[i].lowerlimit+" - "+this.currenctCurrency+data[i].upperlimit;
          }
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
            approveRequired = kony.i18n.getLocalizedString( "i18n.SignatoryMatrix.No");
          }else{
            approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
            "isVisible": (approveRequired=== kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes"))? true : false,
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
          if (!kony.sdk.isNullOrUndefined(data[i].groupRule) && !kony.sdk.isNullOrUndefined(data[i].groupList) && data[i].groupList !=="[]" && data[i].groupRule !=="[]") {
            this.view.flxDailyApprovalListValues.add(this.setDailyLimitDetails(i,data[i]));
          }  
          this.view.flxDailyApprovalListValues.add(lblDailyValueSeparator);
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxDailyLimitsNoRecords.setVisibility(true);
        this.view.lblDailyLimitsSeparator3.setVisibility(true);
        this.view.flxDailyApprovalListValues.setVisibility(false);
        this.view.btnEditDailyLimitsMatrix.setVisibility(false);
        this.view.btnCreateDailyLimitsMatrix.setVisibility(this.editPermission);
        if(this.isMatrixDisabled){
          this.view.btnEditDailyLimitsMatrix.setVisibility(false);
          this.view.btnCreateDailyLimitsMatrix.setVisibility(false);
        }
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
      this.view.forceLayout();
    },

    /**     
	 * Funciton setDailyLimitDetails
     * The function for set the details and update the UI
     * return dynamically created UI flex
     */
    setDailyLimitDetails:function(count,data){

      var approveRequired = "";
      var approvalLimit = "";
      if(data.upperlimit === "-1.00" || data.upperlimit === "0.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " "+this.currenctCurrency+data.lowerlimit;
      }else if(data.lowerlimit === "-1.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " "+this.currenctCurrency+data.upperlimit;
      }
      else{
        approvalLimit = "Between "+this.currenctCurrency+data.lowerlimit+" - "+this.currenctCurrency+data.upperlimit;
      }
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
        "height":"0dp",
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
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      }else{
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
        "src": "dropdown_collapse.png",
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
        "text": "Approval Condition",
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
        "isVisible": false,
        "skin": "bbSknBtn4176A4TransparentBgSSP15px",
        "focusSkin": "bbSknBtn4176A4TransparentBgSSP15px",
        "text": "Edit",
        "top":"15dp",
        "right":"20dp",
        "bottom":"20dp",
        "height":"20dp"
      });
      // btnDailyApprovalConditonEdit["onClick"] = this.editApprovalMatrix.bind(this,"DAILY_LIMIT");

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
      
      var lblDailyDetailsBottomSeparator = new kony.ui.Label({
        "id": "lblDailyDetailsBottomSeparator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"0dp",
        "width":"100%",
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
      flxDailyDetails.add(lblDailyDetailsBottomSeparator);
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
      var stackAddedConditions = [];
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
          if(groupRules[i][j] !== 0){
            var flxDailyRequiredApproval = new kony.ui.FlexContainer({
              "id":"flxDailyRequiredApproval"+count+i+j, 
              "isVisible": true,
              "height":"30dp",
              "width": "35%",
              "top":"0dp",
              "left":"5%",
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
              "text": "Any "+groupRules[i][j],
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
              "left":"55%",
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
              "text": (this.allSignatoryValues[groupList[j]] && this.allSignatoryValues[groupList[j]].signatoryGroupName) ? this.allSignatoryValues[groupList[j]].signatoryGroupName : "",
              "left":"30dp",
              "top":"15dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"45%"
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
              "top":"45dp",
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
              "height":"50dp",
              "width": "100%",
              "top":"5dp",
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
            stackAddedConditions.push(""+count+i+j);
            if(j!==groupRules[i].length-1){
              flxApprovalDailyUserCondition.add(lblDailyConditionValue);
              flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);

            }
          }else{
            if(j===groupRules[i].length-1){
              flxDailyApprovalConditionRules.remove(flxDailyApprovalConditionRules["flxApprovalDailyUserCondition"+stackAddedConditions[stackAddedConditions.length-1]]);
              flxApprovalDailyUserCondition.remove(flxApprovalDailyUserCondition["lblDailyConditionValue" + stackAddedConditions[stackAddedConditions.length - 1]]);
            }
          }
        }
        var lblDailyConditionValueOR = new kony.ui.Label({
          "id":"lblDailyConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"20dp",
          "top":"45dp",
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

        if (i !== groupRules.length - 1) {
          flxApprovalDailyUserCondition.add(lblDailyConditionValueOR);
          flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);
        } else {
          flxDailyApprovalConditionRules.add(flxApprovalDailyUserCondition);
        }

      }
      return flxDailyApprovalConditionRules;
    },

    editApprovalMatrix:function(data){
      var limitDetails = {};
      limitDetails["limitType"] = data;
      limitDetails["limitFlow"] = "EDIT";
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("SELECTED_LIMIT_DETAILS",limitDetails);
      navMan.navigateTo("SettingsNewApprovalUIModule/frmAddRulesSignatoryGrp");
    },

    /**     
	 * Funciton setWeeklyLimitValues
     * The function for set the list of limits
     * Create dynamic flex UI
     */
    setWeeklyLimitValues:function(data){
      var nagativeRowCount = 0;
      this.view.flxWeeklyApprovalListValues.setVisibility(true);
      for(var i=0 ;i<data.length;i++){
        if (!(data[i].lowerlimit === "-1.00" && data[i].upperlimit === "-1.00")) {
          if(data[i].groupRule){
          data[i].groupRule = data[i].groupRule.replaceAll("][", "],[");
          if (!kony.sdk.isNullOrUndefined(JSON.parse(data[i].groupRule)) && JSON.parse(data[i].groupRule).length === 1 && (JSON.parse(data[i].groupRule)[0].filter(x => x == 0).length === JSON.parse(data[i].groupRule)[0].length)) {
            data[i].groupList = "[]";
            data[i].groupRule = "[]";
          }
        }
          nagativeRowCount++;
          var approveRequired = "";
          var approvalLimit = "";
          if(data[i].upperlimit === "-1.00" || data[i].upperlimit === "0.00"){
            approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " +this.currenctCurrency+data[i].lowerlimit;
          }else if(data[i].lowerlimit === "-1.00"){
            approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " " +this.currenctCurrency+data[i].upperlimit;
          }
          else{
            approvalLimit = "Between "+this.currenctCurrency+data[i].lowerlimit+" - "+this.currenctCurrency+data[i].upperlimit;
          }
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
            approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
          }else{
            approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
            "isVisible": (approveRequired===kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes"))? true : false,
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
          if (!kony.sdk.isNullOrUndefined(data[i].groupRule) && !kony.sdk.isNullOrUndefined(data[i].groupList) && data[i].groupList !=="[]" && data[i].groupRule !=="[]") {
            this.view.flxWeeklyApprovalListValues.add(this.setWeeklyLimitDetails(i,data[i]));
          }
          this.view.flxWeeklyApprovalListValues.add(lblWeeklyValueSeparator);
          
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxWeeklyLimitsNoRecords.setVisibility(true);
        this.view.lblWeeklyLimitsSeparator3.setVisibility(true);
        this.view.flxWeeklyApprovalListValues.setVisibility(false);
        this.view.btnWeeklyLimitsCreateMatrix.setVisibility(this.editPermission);
        this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
        if(this.isMatrixDisabled){
          this.view.btnWeeklyLimitsCreateMatrix.setVisibility(false);
          this.view.btnWeeklyLimitsEditMatrix.setVisibility(false);
        }
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
      var approvalLimit = "";
      if(data.upperlimit === "-1.00" || data.upperlimit === "0.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " +this.currenctCurrency+data.lowerlimit;
      }else if(data.lowerlimit === "-1.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " " +this.currenctCurrency+data.upperlimit;
      }
      else{
        approvalLimit = "Between "+this.currenctCurrency+data.lowerlimit+" - "+this.currenctCurrency+data.upperlimit;
      }
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
        "height":"0dp",
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
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      }else{
        approveRequired =kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
        "src": "dropdown_collapse.png",
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
        "text": "Approval Condition",
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
        "isVisible":false,
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
      
      var lblWeeklyDetailsBottomSeparator = new kony.ui.Label({
        "id": "lblWeeklyDetailsBottomSeparator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"0dp",
        "width":"100%",
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
      flxWeeklyDetails.add(lblWeeklyDetailsBottomSeparator);
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
      var stackAddedConditions = [];
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
          if(groupRules[i][j]!==0){
            var flxWeeklyRequiredApproval = new kony.ui.FlexContainer({
              "id":"flxWeeklyRequiredApproval"+count+i+j, 
              "isVisible": true,
              "height":"30dp",
              "width": "35%",
              "top":"0dp",
              "left":"5%",
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
              "text": "Any "+groupRules[i][j],
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
              "left":"55%",
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
              "top":"15dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"45%"
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
              "top":"45dp",
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
              "height":"50dp",
              "width": "100%",
              "top":"5dp",
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
            stackAddedConditions.push(""+count+i+j);
            if(j!==groupRules[i].length-1){
              flxApprovalWeeklyUserCondition.add(lblWeeklyConditionValue);
              flxWeeklyApprovalConditionRules.add(flxApprovalWeeklyUserCondition);
            }
          }else{
            if(j===groupRules[i].length-1){
              flxWeeklyApprovalConditionRules.remove(flxWeeklyApprovalConditionRules["flxApprovalWeeklyUserCondition"+stackAddedConditions[stackAddedConditions.length-1]]);
              flxApprovalWeeklyUserCondition.remove(flxApprovalWeeklyUserCondition["lblWeeklyConditionValue" + stackAddedConditions[stackAddedConditions.length - 1]]);

            }
          }
        }
        var lblWeeklyConditionValueOR = new kony.ui.Label({
          "id":"lblWeeklyConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"20dp",
          "top":"45dp",
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
      this.view.flxPTRApprovalListValues.setVisibility(true);
      var nagativeRowCount = 0;
      for(var i=0 ;i<data.length;i++){
        if (!(data[i].lowerlimit === "-1.00" && data[i].upperlimit === "-1.00")) {
          if(data[i].groupRule){
          data[i].groupRule = data[i].groupRule.replaceAll("][", "],[");
          if (!kony.sdk.isNullOrUndefined(JSON.parse(data[i].groupRule)) && JSON.parse(data[i].groupRule).length === 1 && (JSON.parse(data[i].groupRule)[0].filter(x => x == 0).length === JSON.parse(data[i].groupRule)[0].length)) {
            data[i].groupList = "[]";
            data[i].groupRule = "[]";
          }
        }
          nagativeRowCount++;
          var approveRequired = "";
          var approvalLimit = "";
          if(data[i].upperlimit === "-1.00" || data[i].upperlimit === "0.00"){
            approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " +this.currenctCurrency+data[i].lowerlimit;
          }else if(data[i].lowerlimit === "-1.00"){
            approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " " +this.currenctCurrency+data[i].upperlimit;
          }
          else{
            approvalLimit = "Between "+this.currenctCurrency+data[i].lowerlimit+" - "+this.currenctCurrency+data[i].upperlimit;
          }
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
            approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
          }else{
            approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
            "isVisible": (approveRequired===kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes"))? true : false,
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
          if (!kony.sdk.isNullOrUndefined(data[i].groupRule) && !kony.sdk.isNullOrUndefined(data[i].groupList) && data[i].groupList !=="[]" && data[i].groupRule !=="[]") {
            this.view.flxPTRApprovalListValues.add(this.setPTRLimitDetail(i,data[i]));
          }
          this.view.flxPTRApprovalListValues.add(lblPTRValueSeparator);
          
        }
      }
      if(nagativeRowCount === 0){
        this.view.flxPTRNoRecords.setVisibility(true);
        this.view.lblPTRSeparator3.setVisibility(true);
        this.view.flxPTRApprovalListValues.setVisibility(false);
        this.view.btnPTRCreateMatrix.setVisibility(this.editPermission);
        this.view.btnPTREditRule.setVisibility(false);
        if(this.isMatrixDisabled){
          this.view.btnPTRCreateMatrix.setVisibility(false);
          this.view.btnPTREditRule.setVisibility(false);
        }
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
      var approvalLimit = "";
      if(data.upperlimit === "-1.00" || data.upperlimit === "0.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " +this.currenctCurrency+data.lowerlimit;
      }else if(data.lowerlimit === "-1.00"){
        approvalLimit = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " " +this.currenctCurrency+data.upperlimit;
      }
      else{
        approvalLimit = "Between "+this.currenctCurrency+data.lowerlimit+" - "+this.currenctCurrency+data.upperlimit;
      }
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
        "height":"0dp",
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
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      }else{
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
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
        "src": "dropdown_collapse.png",
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
      var lblPTRDetailsBottomSeparator = new kony.ui.Label({
        "id": "lblPTRDetailsBottomSeparator"+count,
        "isVisible": true,
        "skin": "sknSeparatore3e3e3",
        "text": "",
        "height":"0dp",
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
        "text": kony.i18n.getLocalizedString("i18n.approvals.approvalcondition"),
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
        "isVisible":false,
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
        "text": kony.i18n.getLocalizedString("i18n.approvals.Approveif"),
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
      flxPTRDetails.add(lblPTRDetailsBottomSeparator);
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
      var stackAddedConditions = [];
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
          if(groupRules[i][j] !== 0){
            var flxRequiredApproval = new kony.ui.FlexContainer({
              "id":"flxRequiredApproval"+count+i+j, 
              "isVisible": true,
              "height":"30dp",
              "width": "35%",
              "top":"0dp",
              "left":"5%",
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
              "text": "Any "+groupRules[i][j],
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
              "left":"55%",
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
              "top":"15dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"45%"
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
              "text": kony.i18n.getLocalizedString("i18n.approvals.AND"),
              "left":"45dp",
              "top":"45dp",
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
              "height":"50dp",
              "width": "100%",
              "top":"5dp",
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
            stackAddedConditions.push(""+count+i+j);
            if(j!==groupRules[i].length-1){
              flxApprovalUserCondition.add(lblConditionValue);
              flxApprovalConditionRules.add(flxApprovalUserCondition);
            }
          }
          else{
            if(j===groupRules[i].length-1){
              flxApprovalConditionRules.remove(flxApprovalConditionRules["flxApprovalUserCondition"+stackAddedConditions[stackAddedConditions.length-1]]);
              flxApprovalUserCondition.remove(flxApprovalUserCondition["lblConditionValue" + stackAddedConditions[stackAddedConditions.length - 1]]);
            }
          }
        }
        var lblConditionValueOR = new kony.ui.Label({
          "id":"lblConditionValue"+count+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": kony.i18n.getLocalizedString("i18n.approvals.OR-Approveif"),
          "left":"20dp",
          "top":"45dp",
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
      if (this.entryPoint === "frmAccountLevelMatrixSignatoryGrp") {
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
      if (this.entryPoint === "frmAccountLevelMatrixSignatoryGrp") {
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
        result = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " + 1;
      } else if (lowerLimit === -1) {
        result = kony.i18n.getLocalizedString("i18n.signatory.upto")+ " " + this.currencyCode + formattedUpperLimit;
      } else if (upperLimit === -1) {
        result = kony.i18n.getLocalizedString("i18n.signatory.above")+ " " + this.currencyCode + formattedLowerLimit;
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
    /**     
	 * Funciton setNonMonetaryLimitValues
     * The function for set the list of limits
     * Create dynamic flex UI
     */
    setNonMonetaryLimitValues:function(data){
      var nonMonetary = data.NON_MONETARY_LIMIT[0];
      var approveRequired = "";
      // this.view.imgNonMonetaryRowExpand.setVisibility(true);
      this.view.lblSelectedFeatureValue.text = data.featureName +" - "+data.actionName;
      if(kony.application.getCurrentBreakpoint() === 1024){
      this.view.lblSelectedFeatureValue.text = this.view.lblSelectedFeatureValue.text.slice(0,35)+"...";
      }else if(kony.application.getCurrentBreakpoint() >= 1366){
        this.view.lblSelectedFeatureValue.text = this.view.lblSelectedFeatureValue.text.length > 100 ? 
          this.view.lblSelectedFeatureValue.text.slice(0,90)+"..." : this.view.lblSelectedFeatureValue.text ;
      }
      this.view.btnNonMonetaryCreateMatrix.onClick = function(){
        kony.application.destroyForm("frmSignatoryNonMonetaryConditions");
        applicationManager.getNavigationManager().navigateTo("frmSignatoryNonMonetaryConditions");

      };
      this.view.btnNonMonetaryEditRule.onClick = function(){
        kony.application.destroyForm("frmSignatoryNonMonetaryConditions");
        applicationManager.getNavigationManager().navigateTo("frmSignatoryNonMonetaryConditions");
      };
      if(nonMonetary.groupList === "[]" || kony.sdk.isNullOrUndefined(nonMonetary.groupList)){
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      }else{
        approveRequired = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      }
      this.view.lblNonMonetaryRequiredValue.text = approveRequired;
      this.view.imgNonMonetaryRowExandIcon.src = "dropdown_expand.png";
      this.view.lblPTRApprovalRequiredValueDetails.text = approveRequired;
      if (!kony.sdk.isNullOrUndefined(nonMonetary.groupRule) && !kony.sdk.isNullOrUndefined(nonMonetary.groupList) && nonMonetary.groupList !=="[]" && nonMonetary.groupRule !=="[]") {
        this.view.flxNonMonetaryNoRecords.isVisible = false;
        this.view.flxNonMonetaryApprovalListValues.isVisible = true;
        this.view.btnNonMonetaryCreateMatrix.setVisibility(false);
        this.view.btnNonMonetaryEditRule.setVisibility(this.editPermission);
        if(this.isMatrixDisabled){
          this.view.btnNonMonetaryCreateMatrix.setVisibility(false);
          this.view.btnNonMonetaryEditRule.setVisibility(false);
        }
        this.view.flxNonMonetaryApprovalConditionDetail.add(this.manipulateNonMonetaryCodition(nonMonetary));
        this.view.flxNonMonetaryApproval.onTouchEnd = this.nonMonetaryExpandCollapseRow;
        this.view.flxNonMonetaryApprovalDetails.onTouchEnd = this.nonMonetaryExpandCollapseRow;

      }else{
        this.view.btnNonMonetaryCreateMatrix.setVisibility(this.editPermission);
        this.view.btnNonMonetaryEditRule.setVisibility(false);
        this.view.flxNonMonetaryNoRecords.isVisible = true;
        this.view.flxNonMonetaryApprovalListValues.isVisible = false;
        if(this.isMatrixDisabled){
          this.view.btnNonMonetaryCreateMatrix.setVisibility(false);
          this.view.btnNonMonetaryEditRule.setVisibility(false);
        }
      }
    },

    /**     
	 * Funciton manipulateNonMonetaryApprovalCodition
     * The function for manipulate the group and rules of approvals
     * return dynamically created UI flex
     */
    manipulateNonMonetaryCodition:function(data){
      var groupRules = data.groupRule.replaceAll("][","],[");
      groupRules = JSON.parse(groupRules);
      var groupList = data.groupList;
      groupList = groupList.replaceAll("[","");
      groupList = groupList.replaceAll("]","");
      groupList = groupList.split(",");
      var stackAddedConditions = [];
      var flxNonMonetaryApprovalConditionRules = new kony.ui.FlexContainer({
        "id":"flxNonMonetaryApprovalConditionRules", 
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
        var flxApprovalNonMonetaryUserCondition = "";
        for(var j=0;j<groupRules[i].length;j++){
          if(groupRules[i][j]!==0){
            var flxNonMonetaryRequiredApproval = new kony.ui.FlexContainer({
              "id":"flxNonMonetaryRequiredApproval"+i+j, 
              "isVisible": true,
              "height":"30dp",
              "width": "35%",
              "top":"0dp",
              "left":"5%",
              "clipBounds": false,
              "layoutType": kony.flex.FLOW_HORIZONTAL
            });

            var lblNonMonetaryRequiredApprovals = new kony.ui.Label({
              "id":"lblNonMonetaryRequiredApprovals"+i+j,
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

            var lblNonMonetaryRequiredApprovalsValue = new kony.ui.Label({
              "id":"lblNonMonetaryRequiredApprovalsValue"+i+j,
              "isVisible": true,
              "skin": "ICSknSSPRegular42424215Px",
              "text": "Any "+groupRules[i][j],
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

            var flxNonMonetaryFromGroup = new kony.ui.FlexContainer({
              "id":"flxNonMonetaryFromGroup"+i+j, 
              "isVisible": true,
              "height":"30dp",
              "width": "50%",
              "top":"0dp",
              "left":"55%",
              "clipBounds": false,
              "layoutType": kony.flex.FLOW_HORIZONTAL
            });

            var lblNonMonetaryFromGroup = new kony.ui.Label({
              "id":"lblNonMonetaryFromGroup"+i+j,
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

            var lblNonMonetaryFromGroupValue = new kony.ui.Label({
              "id":"lblNonMonetaryFromGroupValue"+i+j,
              "isVisible": true,
              "skin": "ICSknSSPRegular42424215Px",
              "text": this.allSignatoryValues[groupList[j]].signatoryGroupName,
              "left":"30dp",
              "top":"15dp",
              "height":kony.flex.USE_PREFERRED_SIZE,
              "width":"45%"
            },{
              "containerWeight": 100,
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "margin": [1, 1, 1, 1],
              "padding": [0, 0, 0, 0],
            }, {
              //         wrapping:2
            });    

            var lblNonMonetaryConditionValue = new kony.ui.Label({
              "id":"lblNonMonetaryConditionValue"+i+j,
              "isVisible": true,
              "skin": "ICSknSSPRegular42424215Px",
              "text": "AND",
              "left":"45dp",
              "top":"45dp",
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

            flxApprovalNonMonetaryUserCondition = new kony.ui.FlexContainer({
              "id":"flxApprovalNonMonetaryUserCondition"+i+j, 
              "isVisible": true,
              "height":"50dp",
              "width": "100%",
              "top":"5dp",
              "left":"0dp",
              "clipBounds": false,
              "layoutType": kony.flex.FREE_FORM,
            });
            flxNonMonetaryRequiredApproval.add(lblNonMonetaryRequiredApprovals);
            flxNonMonetaryRequiredApproval.add(lblNonMonetaryRequiredApprovalsValue);
            flxNonMonetaryFromGroup.add(lblNonMonetaryFromGroup);
            flxNonMonetaryFromGroup.add(lblNonMonetaryFromGroupValue);
            flxApprovalNonMonetaryUserCondition.add(flxNonMonetaryRequiredApproval);
            flxApprovalNonMonetaryUserCondition.add(flxNonMonetaryFromGroup);
            stackAddedConditions.push(""+i+j);
            if(j!==groupRules[i].length-1){
              flxApprovalNonMonetaryUserCondition.add(lblNonMonetaryConditionValue);
              flxNonMonetaryApprovalConditionRules.add(flxApprovalNonMonetaryUserCondition);
            }
          }else{
            if(j===groupRules[i].length-1){
              flxNonMonetaryApprovalConditionRules.remove(flxNonMonetaryApprovalConditionRules["flxApprovalNonMonetaryUserCondition"+stackAddedConditions[stackAddedConditions.length-1]]);
              flxApprovalNonMonetaryUserCondition.remove(flxApprovalNonMonetaryUserCondition["lblNonMonetaryConditionValue" + stackAddedConditions[stackAddedConditions.length - 1]]);

            }
          }
        }
        var lblNonMonetaryConditionValueOR = new kony.ui.Label({
          "id":"lblNonMonetaryConditionValue"+i,
          "isVisible": true,
          "skin": "ICSknSSPRegular42424215Px",
          "text": "OR - Approve If",
          "left":"20dp",
          "top":"45dp",
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
          flxApprovalNonMonetaryUserCondition.add(lblNonMonetaryConditionValueOR); 
          flxNonMonetaryApprovalConditionRules.add(flxApprovalNonMonetaryUserCondition);
        }else{
          flxNonMonetaryApprovalConditionRules.add(flxApprovalNonMonetaryUserCondition);
        }

      }
      return flxNonMonetaryApprovalConditionRules;
    },

    /**     
	 * Funciton nonMonetaryExpandCollapseRow
     * The function for expand  and collpse the row
     */
    nonMonetaryExpandCollapseRow: function() {
      if (this.view.flxNonMonetaryApproval.isVisible) {
        this.view.flxNonMonetaryApproval.isVisible = false;
        this.view.flxNonMonetaryDetails.isVisible = true;
      } else {
        this.view.flxNonMonetaryApproval.isVisible = true;
        this.view.flxNonMonetaryDetails.isVisible = false;
      }
      this.view.forceLayout();
    }
  };
});
