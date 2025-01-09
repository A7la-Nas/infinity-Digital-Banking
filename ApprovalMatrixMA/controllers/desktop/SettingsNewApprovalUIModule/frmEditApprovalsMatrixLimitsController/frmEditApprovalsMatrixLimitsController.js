define(['FormControllerUtility','CommonUtilities'], function(FormControllerUtility,CommonUtilities){

  return{
	onInit: function(){
      this.prevApprovalMatrixData = {};
      this.frequencyTypes = {
        "MAX_TRANSACTION_LIMIT" : kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.perTransactionLimit"),
        "DAILY_LIMIT" : kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.dailyTransactionLimit"),
        "WEEKLY_LIMIT" : kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.weeklyTransactionLimit")
      };
      this.approversList = [];
      this.approvalRules = [];
      this.accountCustomer = 1;
    },
    onPreShow: function(){
      this.CurrentStateMatrix = null;
      this.view.flxDowntimeWarning.isVisible = false;
      this.view.flxErrorMessage.isVisible = false;
      this.view.customheadernew.activateMenu("Settings", "Approval Matrix");
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approvalMatrix"));  
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader','flxFooter','flxMain','flxMatrixSegmentWrapper','flxFeatureActionHeader','flxErrorMessage', 'flxContent','flxFormContent']);
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      this.configManager = applicationManager.getConfigurationManager();
      this.currencyCode = this.configManager.configurations.items.CURRENCYCODE;
      this.fetchApprovalRules();
      this.initActions();
      this.setIdleTimeOut();
    },
    onPostShow: function(){
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    updateFormUI : function(viewModel){
      if(viewModel){
        if(!kony.sdk.isNullOrUndefined(viewModel.isLoading)){
          if(viewModel.isLoading){
            FormControllerUtility.showProgressBar(this.view);
          }
          else{
            FormControllerUtility.hideProgressBar(this.view);
          }
        }
        if(viewModel.editData){
          this.getListOfApprovers(viewModel.editData);
          this.showView(viewModel.editData);
        }
        else if( viewModel.approversResponse ) {
          this.processApproversResponse(viewModel.approversResponse);
        }
        else if( viewModel.approversRules ) {
          this.approvalRules = viewModel.approversRules.rules;
        }
        else if(viewModel.approvalMatrixUpdated){
          this.onSaveCompletion(viewModel.approvalMatrixUpdated);
        }
      }
    },
    initActions: function(){
      //this.view.btnBack.onClick = this.navigateBack.bind(this);
      this.view.btnAddAnotherRow.onClick =  this.onClickOfBtnAddAnotherRow.bind(this);
    },
    navigateBack : function(){
      
    },
    setIdleTimeOut : function(){
      kony.application.registerForIdleTimeout(
        applicationManager.getConfigurationManager().constants.IDLE_TIMEOUT, this.doLogout.bind(this, "SessionExpired"));
    },
    doLogout : function(contextAction){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "AuthenticationMA",moduleName: "AuthUIModule"});
      var context = {
        action: contextAction
      };
      authModule.presentationController.doLogout(context);
    },
    processApproversResponse : function(approversResponse){
      if( !kony.sdk.isNullOrUndefined(approversResponse.error) ) {
        this.approversList = [];
        this.showErrorMessageOnAppprovalMatrixEdit( true, approversResponse.error );
        FormControllerUtility.hideProgressBar(this.view);
        return;              
      }
      if(kony.sdk.isNullOrUndefined(approversResponse["approvers"]) || approversResponse["approvers"].length === 0) {
        this.approversList = [];
        this.showErrorMessageOnAppprovalMatrixEdit(true, kony.i18n.getLocalizedString("i18n.common.errorCodes.21000"));
        FormControllerUtility.hideProgressBar(this.view);
        return;
      }
      approversResponse["approvers"].sort(function(a, b) {  
        if (a["fullName"] > b["fullName"]) {  
          return 1;  
        } else if (a["fullName"] < b["fullName"]) {  
          return -1;  
        }  
        return 0;  
      });
      this.approversList = approversResponse.approvers;
      FormControllerUtility.hideProgressBar(this.view);
    },
    getMatrixHeader : function(data){
      var header;
      if(this.isMonetary){
        header = this.frequencyTypes[data.frequency] + " - ";
        header += data.featureAction.featureActionDescription;
      }
      else 
        header = data.featureAction.featureActionDescription;

      return header;
    },
    showView: function(data) {
      this.CurrentStateMatrix = data;
      this.showTopHeaderData(data);
      this.isMonetary = data.isMonetary;
      if(kony.sdk.isNullOrUndefined(data["featureAction"]["isAccountLevel"]) || data["featureAction"]["isAccountLevel"] == "1"){
         this.accountCustomer = 1;
      } else
        {
           this.accountCustomer = 0;
        }
     
      if(this.isMonetary){
        this.limitCapForThisFeatureAction = data["featureAction"]["featureActionLimit"];
        this.view.lblMaxLimitValue.text = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(this.limitCapForThisFeatureAction);
        this.view.flxImportantInfo.setVisibility(true);
        this.view.flxAddRowContainer.setVisibility(true);
        this.view.flxMaxLimitContainer.setVisibility(true);
        this.view.lblImportantInfoSeparator.setVisibility(true);
      }
      else{
        this.view.flxImportantInfo.setVisibility(false);
        this.view.flxAddRowContainer.setVisibility(false);
        this.view.flxMaxLimitContainer.setVisibility(false);
        this.view.lblImportantInfoSeparator.setVisibility(false);
      }
      this.view.TabBodyNew.segTemplates.rowTemplate = "flxEditApprovalLimit";
      this.view.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxAccountFrequencyHeader";
      this.view.lblFeatureActionHeader.text = this.getMatrixHeader(data);
      this.view.TabBodyNew.setRowDataMap([this.getLimitsDataMap()]);
      this.view.TabBodyNew.setDefaultValues([this.getDefaultValuesForLimits(data)]);
      this.view.TabBodyNew.setSectionData([this.getSectionData()]);
      this.view.TabBodyNew.addDataForSections([this.isMonetary ? this.setDataFromViewPageOnEditFlow(data["limitStatements"]) : this.setDataFromViewPageOnEditFlowNonFin(data["limitStatements"])]);
      this.view.TabBodyNew.setEmptyRowData([this.getBlankLimitRecord()]);
      this.view.TabBodyNew.setProceedWidget(this.view.EditActions.btnNext);
      var rows = this.view.TabBodyNew.segTemplates.data;
      if (rows.length === 0) {
        this.onClickOfBtnAddAnotherRow();
      }
      if (rows[0][1].length === 1) {
        rows[0][1][0]["btnDelete"]["isVisible"] = false;
      } else {
        rows[0][1][0]["btnDelete"]["isVisible"] = true;
      }
      this.view.TabBodyNew.enableOrDisableProceedWidget();
      if(this.isMonetary)
        this.view.TabBodyNew.setMasterDataOfListBox();
      this.view.flxPopupIcon.onClick = this.displayFeatureActionInfoPopup.bind(this, data.featureAction["featureActionDescription"]);
      this.createApprovalMatrixPopupUI(data);
      FormControllerUtility.hideProgressBar(this.view);
      this.AdjustScreen();
    },
    showTopHeaderData: function(data){
      var coreCustomerName;
      var contractName; 
      var coreCustomerNameTruncated;
      var contractNameTruncated;      
      if(!kony.sdk.isNullOrUndefined(data.coreCustomerName)) {
        coreCustomerName = data.coreCustomerName.slice();
		coreCustomerNameTruncated = coreCustomerName;
        if(data.coreCustomerName.length > 25) {
          coreCustomerNameTruncated = data.coreCustomerName.substring(0,22) + "...";
        }
      }
      if(!kony.sdk.isNullOrUndefined(data.contractName)) {
        contractName = data.contractName.slice();
        contractNameTruncated = contractName;
        if(data.contractName.length > 25) {
          contractNameTruncated = data.contractName.substring(0,22) + "...";
        }
      }  
      
      if(!kony.sdk.isNullOrUndefined(data.accountId) && data.accountId!==""){
         this.view.lblAccountHeaderValue.text = data.accountName || "";
         this.view.flxAccountsName.setVisibility(true);
         this.accountOnlyMatrix = true;
      }
      else{
        this.view.flxAccountsName.setVisibility(false);
        this.accountOnlyMatrix = false;
      }
      this.view.lblCustomerHeaderValue.text = coreCustomerNameTruncated || "";
      this.view.lblCustomerHeaderValue.toolTip = coreCustomerName || "";
      this.view.lblCustomerIDValue.text = data.coreCustomerID || "";
      this.view.lblContractValue.text = contractNameTruncated || "";
      this.view.lblContractValue.toolTip = contractName || ""; 
    },
    onClickOfBtnAddAnotherRow: function(){
      this.view.TabBodyNew.addEmptyRow();
      this.updateRowHeaders();
      this.view.TabBodyNew.enableOrDisableProceedWidget();
      this.view.TabBodyNew.setMasterDataOfListBox();
      this.AdjustScreen();
    },
    updateRowHeaders : function() {
      var rows = this.view.TabBodyNew.segTemplates.data;
      
      for( var i = 0; i < rows[0][1].length; i++ ) {
        rows[0][1][i]["lblLimitHeader"]["text"] = "Approval Limit " + ( i + 1);
      }
      
      if( rows[0][1].length == 1 ) {
        rows[0][1][0]["btnDelete"]["isVisible"] = false;
      }
      else {
        rows[0][1][0]["btnDelete"]["isVisible"] = true;
      }           
      
      this.view.TabBodyNew.segTemplates.setData( rows );
    },
    /**
     *AdjustScreen- function to adjust the footer
     */
    AdjustScreen: function() {
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + "dp";
        else
          this.view.flxFooter.top = mainheight + "dp";
      } else {
        this.view.flxFooter.top = mainheight + "dp";
      }
      this.view.forceLayout();
    },
    getSectionData : function(){
      return{
        "flxHeader" : {isVisible : false},
        "lblHeadingSeperator" : {isVisible : false}
      };
    },
    onSaveCompletion : function(response){
      if(response.isSuccessful){
        this.closeEditApprovalMatrixFlow(this.CurrentStateMatrix, response);
      }
      else{
        this.view.flxDowntimeWarning.isVisible = true;
        this.view.rtxDowntimeWarning.text = response.errorMessage;
        FormControllerUtility.hideProgressBar(this.view);
      }
      this.view.forceLayout();
    },
     showAddRemoveApproversPopup : function( eventObject, context ) {
        var scopeObj = this;
        var header = kony.i18n.getLocalizedString("i18n.konybb.ApproversHeader");
        var selection = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
        var selectionConfig = {
            imageIdentifier: "imgCheckbox",
            selectedStateImage: "active.png",
            unselectedStateImage: "inactive.png"
        };
        var template = "flxViewApprovers";
        var dataMap = {
            "imgCheckbox" : "imgCheckbox",
            "lblName"	  : "fullName",
            "lblRole"	  : "role",
            "lblSeperator": "lblSeperator",
            "lblId" : "id",
			"flxCheckbox":"flxCheckbox"
          };
        var data = this.approversList;
        var selectedIndices = [];
        var ids = this.view.TabBodyNew.segTemplates.data[context["sectionIndex"]][1][context["rowIndex"]]["lblApproversValue"]["ids"];
        for( var i = 0; i < data.length; i++ ) {
          data[i]["lblSeperator"] = "-";
          data[i]["imgCheckbox"] = "imgCheckbox";
          data[i]["fullName"] = data[i]["firstname"] + " " + data[i]["lastname"];
          if(ids.includes(data[i]["id"])) 
            selectedIndices.push(i);
        }     
        var selected =    [
           [0, selectedIndices],
        ];
        this.view.formActionsNew.btnNext.onClick = scopeObj.setApprovers.bind(scopeObj, context);
        this.view.lblHeader.text = header;
        
        this.view.segData.rowTemplate = template;
        this.view.segData.widgetDataMap = dataMap;
        
        this.view.segData.setData(data);
		this.view.segData.selectionBehavior = selection;
        this.view.segData.selectionBehaviorConfig = selectionConfig;
        this.view.segData.selectedRowIndices = selected;
        selected[0][1].length > 0 ? CommonUtilities.enableButton(this.view.formActionsNew.btnNext) : CommonUtilities.disableButton(this.view.formActionsNew.btnNext);
        this.view.flxApprovalMatrixPopup.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
        this.view.flxApprovalMatrixPopup.isVisible = true;
        this.view.scrollToWidget(this.view.imgCross);
        this.AdjustScreen();
        FormControllerUtility.hideProgressBar(scopeObj.view);
    },
    createApprovalMatrixPopupUI : function( currentState ) {
      CommonUtilities.disableButton(this.view.formActionsNew.btnNext);
      this.view.formActionsNew.btnCancel.onClick = this.closeApprovalMatrixPopup.bind(this);
      this.view.flxCross.onClick = this.closeApprovalMatrixPopup.bind(this);
      this.view.EditActions.btnCancel.onClick = this.closeEditApprovalMatrixFlow.bind( this, currentState );
      this.view.EditActions.btnNext.onClick = function(){
        this.invokeConfirmPopup();
      }.bind(this);
      this.view.confirmpopup.flxPopupContainer.flxHeader.imgClose.onTouchStart = this.dismissConfirmPopup;
      this.view.segData.onRowClick = this.toggleSaveButtonOfAMPopup.bind( this );
      this.view.confirmpopup.formActionsNew.btnNext.onClick = this.saveApprovalMatrix.bind( this, currentState );
      this.view.confirmpopup.formActionsNew.btnCancel.onClick = this.dismissConfirmPopup;
    },
    invokeConfirmPopup : function(){
        var scope = this;
         if(scope.accountCustomer == 0 && scope.accountOnlyMatrix === false){
          this.view.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.customerPopup");
          this.view.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
        else if(scope.accountCustomer == 1 && scope.accountOnlyMatrix === false){
           this.view.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.accountPopup");
           this.view.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Account");
        }
        else if (  scope.accountOnlyMatrix === true){
           this.view.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.accountOnlyPopup");
          this.view.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Account");
        }
        
      scope.view.flxConfirmPopup.setVisibility(true);
      scope.view.forceLayout();
    },
    dismissConfirmPopup : function(){
      var scope = this;
      scope.view.flxConfirmPopup.setVisibility(false);
      scope.view.forceLayout();
    },

    /**
      Method toggles approval rule and approvers selection popup
    **/        
    toggleSaveButtonOfAMPopup : function( ) {
      
      if( this.view.segData.selectedRowItems !== null  && this.view.segData.selectedRowItems.length > 0 ) {
        CommonUtilities.enableButton(this.view.formActionsNew.btnNext);
      }
      else {
        CommonUtilities.disableButton(this.view.formActionsNew.btnNext);
      }
    },
    saveApprovalMatrix : function( currentState ) {
      this.dismissConfirmPopup();
      try{
        var scopeObj = this;
      var validityResponse = this.isDataValid();
      if( !validityResponse.valid ) {
        this.showErrorMessageOnAppprovalMatrixEdit( true, validityResponse.error );
        return;
      }
      else {
        FormControllerUtility.showProgressBar( scopeObj.view );
        this.view.flxErrorMessage.isVisible = false;
        this.view.lblErrorSeparator.isVisible = false;
        var newState = {
          cif : currentState["coreCustomerID"],
          contractId : currentState["contractId"],
          accountId : currentState["accountId"],
          actionId : currentState["featureAction"]["featureActionId"],
          limitTypeId : currentState["frequency"],
          limits: scopeObj.getCurrentStateOfEditPage()
        };
  //This is to verify if the user actually made any changes to the Approval Matrix
        if(JSON.stringify(scopeObj.prevApprovalMatrixData) !== JSON.stringify(newState)){
           var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
          settingsnewModule.saveApprovalMatrixForAccountAndFeatureAction( newState );  
        }
        else{
          this.closeEditApprovalMatrixFlow(currentState);
        }
      }
      }catch(err){}
    },
    getCurrentStateOfEditPage: function() {
      var data = this.view.TabBodyNew.segTemplates.data[0][1];
      var limits = [];
      for (var i = 0; i < data.length; i++) {
        var approversList = [];
        if (data[i].flxApprovers.isVisible) {
          for (var j = 0; j < data[i]["lblApproversValue"]["ids"].length; j++) {
            approversList.push({
              "approverId": data[i]["lblApproversValue"]["ids"][j]
            });
          }
        }
        if ((data[i]["lstType"].selectedKey)=="Above" || (data[i]["lstType"].selectedKey)=="UpTo"){
          data[i]["flxUpperLimitContainer"].isVisible = false;
        }else{
          data[i]["flxUpperLimitContainer"].isVisible = true; 
        }
        if(this.isMonetary){
          var deformattedLower = applicationManager.getFormatUtilManager().deFormatAmount(data[i]["tbxLowerLimit"].text);
          var deformattedUpper = applicationManager.getFormatUtilManager().deFormatAmount(data[i]["tbxUpperLimit"].text);
          var selectedKey = this.getSelectedKeyValue(data[i]["lstType"].masterData, data[i]["lstType"].selectedKey);
          var limit = {
            lowerlimit: deformattedLower,
            upperlimit: deformattedLower,
            approvalruleId: data[i]["lblRuleValue"]["ruleId"],
            approvers: approversList
          }
          switch(selectedKey.toLowerCase()){
            case "above" : limit.upperlimit = "-1";
              break;
            case "upto" : limit.lowerlimit = "-1";
              break;
            default : limit.upperlimit = deformattedUpper;
              break;
          }
          limits.push(limit);
        }
        else{
          var limit = {
            lowerlimit: "-1",
            upperlimit: "-1",
            approvalruleId: data[i]["lblRuleValue"]["ruleId"],
            approvers: approversList
          }
          limits.push(limit);
        }

      }
      return limits;
    },
    
    getSelectedKeyValue: function(masterData, selectedKey) {
      var value = null;
      masterData.forEach(function(data) {
        if (data[0] === selectedKey)
          value = data[1];
      });
      return value;
    },
    
    isDataValid: function() {
      if(this.isMonetary){
        if (this.view.TabBodyNew.isAllFieldsAreValid()) {
          if (this.areAllRangesValid()) {
            var data = this.view.TabBodyNew.segTemplates.data[0][1];
            if (!this.allRulesAndApproversRequirementsMatch(data)) {
              return {
                "valid": false,
                "error": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approverValidation")
              }
            }
            var limitRanges = [];
            for (var i = 0; i < data.length; i++) {
              var limitRange = [];
              if (this.getSelectedKeyValue(data[i]["lstType"].masterData, data[i]["lstType"].selectedKey) == "Above") {
                limitRange.push(data[i]["tbxLowerLimit"].text);
                limitRange.push(this.limitCapForThisFeatureAction);
              } else if (this.getSelectedKeyValue(data[i]["lstType"].masterData, data[i]["lstType"].selectedKey) == "UpTo") {
                limitRange.push("0");
                limitRange.push(data[i]["tbxLowerLimit"].text);
              } else {
                limitRange.push(data[i]["tbxLowerLimit"].text);
                limitRange.push(data[i]["tbxUpperLimit"].text);
              }
              limitRanges.push(limitRange);
            }
            limitRanges.sort(function(a, b) {
              return a[0] - b[0];
            })
            var areValidInterval = this.checkForValidIntervals(limitRanges);
            return {
              "valid": areValidInterval,
              "error": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.intervalvalidation")
            };
          } else {
            return {
              "valid": false,
              "error": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.upperlimitValidation")
            }
          }
        } else {
          return {
            "valid": false,
            "error": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.amountValidation")
          }
        }
      }
      else{
        var data = this.view.TabBodyNew.segTemplates.data[0][1];
        if (!this.allRulesAndApproversRequirementsMatch(data)) {
          return {
            "valid": false,
            "error": kony.i18n.getLocalizedString("i18n.Settings.ApprovalMatrix.approverValidation")
          }
        }
        return {
          "valid": true,
          "error": ""
        };
      }

    },
    checkForValidIntervals : function( limitRanges ) {
      var first = applicationManager.getFormatUtilManager().deFormatAmount(limitRanges[0][0]);
      var second = applicationManager.getFormatUtilManager().deFormatAmount(limitRanges[0][1]);
      if( limitRanges.length == 1 ) {
        return (Number(first) == 0) && (Number(second) == this.limitCapForThisFeatureAction);
      }
      var i=0;
      var flag = false;
      while( i < limitRanges.length - 1 )
      {
        first = applicationManager.getFormatUtilManager().deFormatAmount(limitRanges[i][1]);
        second = applicationManager.getFormatUtilManager().deFormatAmount(limitRanges[i+1][0]);

        if(first == second){
          i = i + 1;
          flag = true;
        }
        else{
          flag = false;
          return flag;
        }
      }
      return flag && Number(applicationManager.getFormatUtilManager().deFormatAmount(limitRanges[i][1])) == Number(this.limitCapForThisFeatureAction);          
    },
    areAllRangesValid : function() {
     var segData = this.view.TabBodyNew.segTemplates.data;

     if (segData === null) return false;
     else{
       var rows = segData[0][1];
       for( var rowIndex = 0; rowIndex < rows.length; rowIndex++ ){
         var rowWidgets = rows[rowIndex];
         var lowerWidgetData = rows[rowIndex]["tbxLowerLimit"];
         var lowerLimit = applicationManager.getFormatUtilManager().deFormatAmount(lowerWidgetData.text);
         var upperWidgetData = rows[rowIndex]["tbxUpperLimit"];
         var upperLimit = applicationManager.getFormatUtilManager().deFormatAmount(upperWidgetData.text);
         var limitType = this.getSelectedKeyValue(rows[rowIndex]["lstType"].masterData,rows[rowIndex]["lstType"].selectedKey);
         
         if( limitType == "Range" ) {
            if ( Number( upperLimit ) > Number( lowerLimit ) ) {
             if(upperWidgetData.skin === "skntxtSSP424242BorderFF0000Op100Radius2px"){
               upperWidgetData.skin = "sknTextBoxSSP42424215PxNoBor";
               this.view.TabBodyNew.updateKeyAt("tbxUpperLimit",upperWidgetData,rowIndex,0);
               this.view.TabBodyNew.onSegmentReload();
             }
             else{
               //no need to update and reload the segment
             }
           }
           else{
             upperWidgetData.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
             this.view.TabBodyNew.updateKeyAt("tbxUpperLimit",upperWidgetData,rowIndex,0);
             this.view.TabBodyNew.onSegmentReload();
             return false;
           }              
         }

       }
     }
     return true;
   },
	allRulesAndApproversRequirementsMatch : function( approvalMatrixRows ) {
      for( var i = 0; i < approvalMatrixRows.length; i++ ) {
        if( approvalMatrixRows[i]["lblApproversValue"]["ids"].length < approvalMatrixRows[i]["lblRuleValue"]["numberOfApprovals"] ) {
          return false;
        }
      }
      return true;
    },
    setApprovers : function( editRowData, widget ) {
      var approverIds = [];
      var approvers = this.view.segData.selectedRowItems[0]["fullName"];
      approverIds.push( this.view.segData.selectedRowItems[0]["id"] );
      for (var i = 1; i < this.view.segData.selectedRowItems.length; i++) {
        approvers = approvers + ", " + this.view.segData.selectedRowItems[i]["fullName"];
        approverIds.push( this.view.segData.selectedRowItems[i]["id"] );
      }
      var data = this.view.TabBodyNew.segTemplates.data[editRowData["sectionIndex"]][1][editRowData["rowIndex"]];
      data.lblApproversValue = {
        text: approvers,
        ids : approverIds
      }
      var btnChangeRuleCofig = data.btnChangeRule;

      if( approverIds.length <= 0 ) {
        btnChangeRuleCofig.isVisible = false;
      }
      else {
        btnChangeRuleCofig.isVisible = true;
      }

      data.btnChangeRule = btnChangeRuleCofig;         
      
      this.view.TabBodyNew.segTemplates.setDataAt(data, editRowData["rowIndex"], editRowData["sectionIndex"]);
      
      if(!this.isMonetary && this.enableOrDisableSave())
        CommonUtilities.enableButton(this.view.EditActions.btnNext);
      else
        this.view.TabBodyNew.enableOrDisableProceedWidget();
      this.closeApprovalMatrixPopup();
    },
    enableOrDisableSave: function(){
      var data = this.view.TabBodyNew.segTemplates.data[0][1][0];
      if(data.lblRuleValue.ruleId !== "")
        return true;
      return false;
    },
    showErrorMessageOnAppprovalMatrixEdit : function( toShow, error ) {
      if( toShow ) {
        this.view.flxErrorMessage.lblError.text = error;
        this.view.flxErrorMessage.isVisible = true;
        this.view.lblErrorSeparator.isVisible = true;        
      }
      else {
        this.view.flxErrorMessage.lblError.text = error;
        this.view.flxErrorMessage.isVisible = false;
        this.view.lblErrorSeparator.isVisible = false;            
      }
      this.AdjustScreen();   
    }, 
    closeApprovalMatrixPopup : function(){
      this.view.flxApprovalMatrixPopup.isVisible = false;
      this.view.forceLayout();
    },
     /**
      Method returns the datamap for the editing the approval matrix
    **/

    getLimitsDataMap : function() {
      return{
        "btnDelete" : "btnDelete",
        "btnAddorRemoveApprovers" : "btnAddorRemoveApprovers",
        "btnChangeRule" : "btnChangeRule",
        "lstType" : "lstType",
        "lblApproversKey" : "lblApproversKey",
        "lblRuleKey" : "lblRuleKey",
        "flxTopSeperator" : "flxTopSeperator",
        "flxBottomSeperator" : "flxBottomSeperator",
        "flxSeperator" : "flxSeperator",
        "flxLimitContainer": "flxLimitContainer",
        "flxLimitHeaderContainer":"flxLimitHeaderContainer",
        "flxUpperLimitContainer" : "flxUpperLimitContainer",
        "flxLowerLimit" : "flxLowerLimit",
        "imgInfoIcon" : "imgInfoIcon",
        "flxInfoIcon" : "flxInfoIcon",
        "lblLimitHeader" : "lblLimitHeader",
        "lblApproversValue" : "lblApproversValue",
        "lblRuleValue" : "lblRuleValue",
        "lblType" : "lblType",
        "tbxLowerLimit" : "tbxLowerLimit",
        "tbxUpperLimit" : "tbxUpperLimit",
        "lblCurrSymbol" : "lblCurrSymbol",
        "lblUpperCurrSymbol" : "lblUpperCurrSymbol",
        "lblAccountFrequency" : "lblAccountFrequency",
        "imgIcon"	: "imgIcon",
        "lblHeadingSeperator" : "lblHeadingSeperator",
        "flxHeader" : "flxHeader",
        "flxApprovers":"flxApprovers"
      };
    },
    
    /**
      Method used to set the default values for editing approval matrix
    **/
    getDefaultValuesForLimits : function( currentState ){
      var scope = this;
      return {
        btnDelete : {
          "text" : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
          "isVisible": scope.isMonetary,
          "onClick" : function(eventobject, context) {
            scope.view.TabBodyNew.removeRowAt(context.rowIndex, context.sectionIndex);
            scope.updateRowHeaders();
            scope.view.TabBodyNew.enableOrDisableProceedWidget();
            scope.view.TabBodyNew.setMasterDataOfListBox();
            scope.AdjustScreen();
          }.bind(scope)
        },
        btnAddorRemoveApprovers : {
          "text" : kony.i18n.getLocalizedString("i18n.konybb.AddorRemoveApprovers"),
          "onClick" : scope.showAddRemoveApproversPopup.bind(scope)
        },
        btnChangeRule : {
          "text" : kony.i18n.getLocalizedString("i18n.konybb.ChangeApprovalRule"),
          "onClick" : scope.showChangeRulePopup.bind(scope),
          "isVisible" : true
        },
        lblApproversKey : {
          "text" : kony.i18n.getLocalizedString("i18n.konybb.Approvers") + " :"
        },
        lblRuleKey : {
          "text" : kony.i18n.getLocalizedString("i18n.konybb.Rule") + " :"
        },
        lblTopSeperator : {
          "text" : "-"
        },
        lblBottomSeperator : {
          "text" : "-"
        },
        lblSeperator : {
          "text" : "-"
        },
        imgInfoIcon : {
          "src" : "info_grey.png"
        },
        flxInfoIcon : {
          "onClick" : function(eventobject, context) {                       
            scope.displayApprovalRuleInfoPopup(this.isMonetary ? kony.i18n.getLocalizedString("i18n.settings.approvalMatrix.changeRuleInfo") : kony.i18n.getLocalizedString("i18n.settings.approvalMatrix.changeRuleInfoNonFin"));
          }.bind(scope)              
        },
        flxLimitContainer: {
          "isVisible" : scope.isMonetary
        },
        flxLimitHeaderContainer: {
          "isVisible": scope.isMonetary
        },
        lblType : {
          "text" : kony.i18n.getLocalizedString("i18n.common.Type")+" :"
        },
        lblCurrSymbol : {
          "text" : scope.currencyCode
        },
        lblUpperCurrSymbol : {
          "text" : scope.currencyCode
        }
      };
    },
    getListOfApprovers : function( currentState ) {
      var scopeObj = this;
      FormControllerUtility.showProgressBar(scopeObj.view);
       var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      var requestParams = { 
          "accountId" : (!kony.sdk.isNullOrUndefined(currentState["accountId"]) && currentState["accountId"]!=="") 
						? currentState["accountId"] : "", 
          "Cif":currentState["coreCustomerID"],
          "contractId": currentState["contractId"],
          "actionId" : currentState["featureAction"]["featureActionId"]
      };
      settingsnewModule.getAccountActionCustomerApproverList( requestParams );          
    },
    fetchApprovalRules : function() {
      var scopeObj = this;
      FormControllerUtility.showProgressBar(scopeObj.view);
      var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      settingsnewModule.fetchApprovalRules();
    },
    setDataFromViewPageOnEditFlowNonFin: function(permission) {
      var scopeObj = this;
      var rows = [];
      if (permission.length === 0 || permission[0].approvers[0].approverName === "" || permission[0].approvalRuleId === "NO_APPROVAL"){
        rows.push({
          flxLimitContainer: {
            "isVisible" : this.isMonetary
          },
          tbxLowerLimit: {
            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
            "text": ""
          },
          flxLowerLimit: {
            "isVisible": true
          },
          tbxUpperLimit: {
            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
            "text": ""
          },
          flxUpperLimitContainer: {
            "isVisible": true
          },
          lstType: scopeObj.getListData(0, 0),
          lblLimitHeader: {
            "text": ""
          },
          lblApproversValue: {
            "text": "",
            "ids": []
          },
          lblRuleValue: {
            "text": "",
            "ruleId": "",
            numberOfApprovals: ""
          },
          flxApprovers: {
            "isVisible": true
          }
        });
      }
      else {
        for (var i = 0; i < permission.length; i++) {
          rows.push({
            tbxLowerLimit: {
              "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
              "isVisible" : false
            },
            flxLowerLimit: {
              "isVisible": false
            },
            tbxUpperLimit: {
              "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
              "isVisible" : false
            },
            flxUpperLimitContainer: {
              "isVisible" : false
            },
            lstType: {
              "isVisible" : false
            },
            lblLimitHeader: {
              "text": ""
            },
            lblApproversValue: {
              "text": scopeObj.getApprovers(permission[i]["approvers"]),
              "ids": scopeObj.getApproversIds(permission[i]["approvers"])
            },
            lblRuleValue: {
              "text": permission[i]["approvalRuleName"],
              "ruleId": permission[i]["approvalRuleId"],
              numberOfApprovals: permission[i]["numberOfApprovals"]
            },
            flxApprovers: {
              "isVisible": permission[i]["numberOfApprovals"] !== 0 ? true : false
            }
          });
        }
      }
      return rows;
    },
    setDataFromViewPageOnEditFlow : function( limits ) {
      var scopeObj = this;
      var rows = [];
      
      if( ( kony.sdk.isNullOrUndefined(limits) || !Array.isArray(limits) || limits.length === 0 ) || 
          ( limits.length === 1 && (limits[0]["lowerlimit"] === "-1.00" && limits[0]["upperlimit"] === "-1.00")) ) {
            rows.push({
                tbxLowerLimit : {
                  "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
                  "text" : ""
                },
                flxLowerLimit : {
                  "isVisible" : true
                },
                tbxUpperLimit : {
                  "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
                  "text" : ""             
                },
                flxUpperLimitContainer : {
                   "isVisible" : true              
                },
                lstType : scopeObj.getListData( 0, 0 ),
                lblLimitHeader : {
                  "text" : "Approval Limit " + 1
                },
                lblApproversValue : {
                  "text" : "",
                  "ids" : []
                },
                lblRuleValue : {
                  "text" : "" ,
                  "ruleId" : "",
                  numberOfApprovals : ""
                },
                flxApprovers : {
                  "isVisible": true
                }
            });
      }
      else {
        for( var i = 0; i < limits.length; i++ ) {           
          var lower = Number(limits[i]["lowerlimit"]);
          var upper = Number(limits[i]["upperlimit"]) ;
          var formattedLower = applicationManager.getFormatUtilManager().formatAmount(limits[i]["lowerlimit"]);
          var formattedUpper = applicationManager.getFormatUtilManager().formatAmount(limits[i]["upperlimit"]);
          rows.push({
            tbxLowerLimit : {
              "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
              "text" : lower !== -1 ? (formattedLower) : ( upper !== -1 ? (formattedUpper) : "1" )
            },
            flxLowerLimit : {
              "isVisible" : true
            },
            tbxUpperLimit : {
              "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
              "text" : lower !== -1 ? ( upper !== -1 ? (formattedUpper) : "1" ) : "1"               
            },
            flxUpperLimitContainer : {
               "isVisible" : lower !== -1 ? ( upper !== -1 ? true : false ) : false               
            },
            lstType : scopeObj.getListData( lower, upper ),
            lblLimitHeader : {
              "text" : "Approval Limit " + (i + 1)
            },
            lblApproversValue : {
              "text" : scopeObj.getApprovers(limits[i]["approvers"]),
              "ids" : scopeObj.getApproversIds(limits[i]["approvers"])
            },
            lblRuleValue : {
              "text" : limits[i]["approvalRuleName"] ,
              "ruleId" : limits[i]["approvalRuleId"],
              numberOfApprovals : limits[i]["numberOfApprovals"]
            },
            flxApprovers : {
              "isVisible": limits[i]["numberOfApprovals"] !== 0 ? true : false
            }            
          });
        }
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

    getApproversIds: function(approvalsList) {
      var approvers = [];

      for (var i = 0; i < approvalsList.length; i++) {
        approvers.push(approvalsList[i]["approverId"]);
      }
      return approvers;
    },
    
    getBlankLimitRecord : function() {
      var scope = this;
      return {
        tbxLowerLimit : {
          "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
          "text" : ""
        },
        flxUpperLimitContainer : {
          "isVisible" : true              
        },            
        tbxUpperLimit : {
          "placeholder" : kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
          "text" : ""
        },
        lstType : scope.getListData( 0, 0 ),
        lblLimitHeader : {
          "text" : "Approval Limit "
        },
        lblApproversValue : {
          text: "",
          ids : []
        },
        lblRuleValue : {
          text : "",
          ruleId: "",
          numberOfApprovals: ""
        }
      };
    },
    getListData : function( lowerLimit, upperLimit ) {
      var masterData = [["key1","Range"],["key2","UpTo"],["key3","Above"]];
      var selectedKeyValues;
      
      if( lowerLimit != -1 && upperLimit != -1 ) {
        selectedKeyValues = masterData[0][0];
      }
      else if( lowerLimit == -1 && upperLimit == -1 ) {
        selectedKeyValues = masterData[2][0];
      }          
      else if( upperLimit != -1 ) {
        selectedKeyValues = masterData[1][0];
      }         
      else if( lowerLimit != -1 ) {
        selectedKeyValues = masterData[2][0];
      }
      return {
        "masterData": masterData,
        "selectedKey": selectedKeyValues
      };
    },
    closeEditApprovalMatrixFlow : function(currentState, success) {
      var settingsnewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      FormControllerUtility.showProgressBar(this.view);
      if(!kony.sdk.isNullOrUndefined(success) && success.isSuccessful){      
        settingsnewModule.fetchApprovalMatrix(currentState);
      }
      else{
        settingsnewModule.noServiceNavigateToViewMatrix();
      }
   },
    showChangeRulePopup : function( widget, context ) {
        var scopeObj = this;
         var maximumApprovalsPossible = !kony.sdk.isNullOrUndefined(this.approversList) ? this.approversList.length : 0; 
      
        var header = kony.i18n.getLocalizedString("i18n.konybb.ChangeApprovalRules");
        var  selection = constants.SEGUI_SINGLE_SELECT_BEHAVIOR;
        var  selectionConfig = {
              imageIdentifier: "imgRadioButton",
              selectedStateImage: "radiobtn_active.png",
              unselectedStateImage: "radio_btn_inactive.png"
            };
        var  template = "flxApprovalRule";
        var  dataMap = {
            "imgRadioButton":"imgRadioButton",
            "lblRule":"name",
            "lblRuleId" : "id",
            "lblNumberOfApprovals" : "numberOfApprovals",
            "lblSeperator": "lblSeperator"
          };
          if( !kony.sdk.isNullOrUndefined( this.view.TabBodyNew.segTemplates.data[context["sectionIndex"]][1][context["rowIndex"]]["lblRuleValue"]["ruleId"] ) ) {
            var selectedId = this.view.TabBodyNew.segTemplates.data[context["sectionIndex"]][1][context["rowIndex"]]["lblRuleValue"]["ruleId"];
          }
                    
          var data = this.getApprovalRules(this.approvalRules);

          data = this.getListOfPossibleRulesBasedOnNumberOfApprovers( data, maximumApprovalsPossible );
          var selectedRowIndex;
          if( !kony.sdk.isNullOrUndefined( selectedId ) ) {
             selectedRowIndex = this.getSelectedRule( data, selectedId );
          }
          else {
            selectedRowIndex = [0,0];
          }
                
        CommonUtilities.disableButton(this.view.formActionsNew.btnNext);
        this.view.formActionsNew.btnNext.onClick = scopeObj.setApprovalRule.bind( scopeObj, context );
        this.view.lblHeader.text = header;
        
        this.view.segData.rowTemplate = template;
        this.view.segData.widgetDataMap = dataMap;
        this.view.segData.setData(data);
		this.view.segData.selectionBehavior = selection;
        this.view.segData.selectionBehaviorConfig = selectionConfig;
        this.view.segData.selectedRowIndex = selectedRowIndex;
        this.view.segData.selectedRowIndex.length > 0 ? CommonUtilities.enableButton(this.view.formActionsNew.btnNext) : CommonUtilities.disableButton(this.view.formActionsNew.btnNext);          
        this.view.flxApprovalMatrixPopup.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height+ "dp";
        this.view.flxApprovalMatrixPopup.isVisible = true;
        this.view.scrollToWidget(this.view.imgCross);
        this.AdjustScreen();         
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    getApprovalRules : function(approvalRules){
        var rules = JSON.parse(JSON.stringify(approvalRules));
                
        for( var i = 0; i < rules.length; i++ ) {
          rules[i].imgRadioButton = "radio_btn_inactive.png";
          rules[i].lblSeperator = "-";
          rules[i].ruleName = rules[i].name;
          
        }
        
        return rules; 
    },
	getListOfPossibleRulesBasedOnNumberOfApprovers : function( rules, numberOfApprovers ) {
      if( numberOfApprovers < 0 ) {
        return [];
      }
      
      rules.sort((a, b) => (a.numberOfApprovals - b.numberOfApprovals));
      
	  var finalRules = [];
      
      //Pushing No Approval Rule First
      for (var i = 0; i < rules.length; i++) {
        if (rules[i]["numberOfApprovals"] == 0) {
          finalRules.push(rules[i]);
          break;
        }
      }
      
	  if(numberOfApprovers == 0){
        return finalRules;
      }
      
      //Pushing remaining rules in sorted order
      for( var i = 0; i < rules.length; i++ ) {
        if( rules[i]["numberOfApprovals"] != 0 && rules[i]["numberOfApprovals"] <= numberOfApprovers ) {
          finalRules.push( rules[i] );
        }
      }
      
      return finalRules;
    },
    setApprovalRule : function( editRowData, widget ) {          
      var data = this.view.TabBodyNew.segTemplates.data[editRowData["sectionIndex"]][1][editRowData["rowIndex"]];
      var numberofApprovers = parseInt(this.view.segData.selectedRowItems[0]["numberOfApprovals"]);

      data.lblRuleValue = {
        text : this.view.segData.selectedRowItems[0]["ruleName"],
        ruleId : this.view.segData.selectedRowItems[0]["id"],
        numberOfApprovals : this.view.segData.selectedRowItems[0]["numberOfApprovals"]
      };
      data.flxApprovers = {
        "isVisible" : numberofApprovers !==0 ? true : false
      };
      data.lblApproversValue.text = numberofApprovers !== 0 ? "" : "-";
      this.view.TabBodyNew.segTemplates.setDataAt(data, editRowData["rowIndex"], editRowData["sectionIndex"]);
      
      this.view.TabBodyNew.enableOrDisableProceedWidget();
      if(!this.isMonetary && numberofApprovers == 0)
        CommonUtilities.enableButton(this.view.EditActions.btnNext);
      this.closeApprovalMatrixPopup();
    },
    getSelectedRule: function( data, id ) {
      var index = -1;
      for( var i = 0; i < data.length; i++ ) {
        if( data[i]["id"] === id ) {
          index = i;
        }
      }

      return index == - 1 ? [0, 0] : [0, index];
    },
    displayFeatureActionInfoPopup: function(popupInfo) {
      var currForm = kony.application.getCurrentForm();
      var currTop = currForm.flxHeader.info.frame.y +currForm.flxMain.info.frame.y + currForm.flxMatrixSegmentWrapper.info.frame.y + currForm.flxFeatureActionHeader.info.frame.height + 5;

      var currLeft = currForm.flxContent.info.frame.x + currForm.flxMatrixSegmentWrapper.info.frame.x + 20;
      currTop = currTop + "dp";
      currLeft = currLeft + "dp";
      this.toggleInfoPopupForRule(currTop, currLeft, popupInfo);
    },
    toggleInfoPopupForRule: function(top, left, popupInfo) {
      this.view.InfoIconPopups.flxCross.onClick = function() {
        this.view.InfoIconPopups.isVisible = false;
      }.bind(this);
      var currForm = kony.application.getCurrentForm();

      if (currForm.InfoIconPopups.isVisible === true) {
        currForm.InfoIconPopups.top = 155;
        currForm.InfoIconPopups.isVisible = false;
        currForm.forceLayout();
      } else {
        currForm.InfoIconPopups.top = top;
        currForm.InfoIconPopups.left = left;
        currForm.InfoIconPopups.RichTextInfo.text = popupInfo;
        currForm.InfoIconPopups.isVisible = true;
        currForm.forceLayout();
      }
    },
    displayApprovalRuleInfoPopup: function(popupInfo) {
      var currForm = kony.application.getCurrentForm();
      var section = currForm.TabBodyNew.segTemplates.selectedRowIndex[0]
      var index = currForm.TabBodyNew.segTemplates.selectedRowIndex[1];
      var segmentData = currForm.TabBodyNew.segTemplates.data[section][1];

      var currTop = 0;
      currForm.InfoIconPopups.top = 155;

      //currTop = currForm.InfoIconPopups.top;
      currTop = parseInt(currTop);
      var indexCount = 0;
      for (var i = 0; i < section; i++) {
        indexCount += (currForm.TabBodyNew.segTemplates.data[i][1].length);
      }
      currTop += ((242 * indexCount) + (50 * (section + 1)) + (((index + 1) * 242) + 200));

      if (currForm.flxErrorMessage.isVisible === true) {
        currTop += currForm.flxErrorMessage.info.info.frame.height;
      }

      currTop = currForm.flxHeader.info.frame.y + currForm.flxMain.info.frame.y + currTop + 10 
      if(!this.isMonetary)
        currTop = currTop - 273;
      currTop = currTop + "dp";

      var currLeft = currForm.flxContent.info.frame.x + currForm.flxMatrixSegmentWrapper.info.frame.x + 20;
      currLeft = currLeft + "dp";

      this.toggleInfoPopupForRule(currTop, currLeft, popupInfo);
    }
  };
});