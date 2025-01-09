define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  this.editMode = 0;
  return {
    updateFormUI: function(viewModel) {
      if(!this.isEmptyNullorUndefined(viewModel.isLoading)){
        this.changeProgressBarState(viewModel.isLoading);
      }
    },
    frmPreShow : function(){
      var scope = this;
      if(kony.application.getPreviousForm().id === "frmSignatoryMatrixConditions"){return;}
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      scope.dropdownTopInitial = 55;
      scope.rowTopInitial = 70;
      scope.selectedRow = 0;
      scope.setAccountDetails();
      scope.disableButton();
      scope.setIdleTimeOut();
      scope.setFlowActions();
      scope.closeAcknowledgementBanner();
      scope.closeWarningMsg();
      scope.view.onDeviceBack = scope.doLogout;
      scope.view.onBreakpointChange = scope.onBreakpointChange;
      this.editMode = 0;
      scope.view.forceLayout();
    },
    navigateToAcknowledgement : function(){
      var scope = this;
      var data = this.getRowData();
      this.editMode = 1;
      for(var i=0;i<this.getRowDataLength();i++){
        data[i].txtAmount1.skin = "sknTbxBkGrndf6f6f6SSP42424215px";
        data[i].txtAmount1.placeholderSkin = "sknTbxBkGrndf6f6f6SSP42424215px";
        data[i].txtAmount2.skin = "sknTbxBkGrndf6f6f6SSP42424215px";
        data[i].lblAppRequired.skin = "bbSknLbl424242SSP15Px";
        data[i].imgAction.src = "disablebin.png";
        data[i].flxCheckbox.skin = "ICSknDisabledValue";
        if(data[i].imgStatus.src === "active.png")
        {
          data[i].imgStatus.src = "disableactivebox.png";
        }
        if(data[i].imgStatus.src === "inactive.png")
        {
          data[i].imgStatus.src = "disableinactivebox.png";
        }
      }
      scope.view.segAddRules.setData(data);
      scope.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.accounts.editRule");
      scope.view.btnCancel.onClick = scope.navigateToApprovalMatrix;
      scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.accounts.gotoapprovalmatrix");
      this.view.btnDeleteRule.setVisibility(false);
      scope.view.btnConfirm.onClick = scope.navigateToEditRule;
      scope.enableButton();
      scope.view.segAddRules.setEnabled(false);
      scope.view.btnAddRange.setVisibility(false);
      scope.closeWarningMsg();
      scope.view.forceLayout();
    },
    navigateToEditRule : function(){
      var scope = this;
      var data = this.getRowData();
      this.editMode = 1;
      this.view.btnDeleteRule.setVisibility(true);
      this.view.btnDeleteRule.onClick = function(){
        this.view.flxDeletePopup.deletepopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.signatory.deletetherule");
        this.view.flxDeletePopup.deletepopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.approvals.headerDeleteRule");
        this.view.flxDeletePopup.setVisibility(true);
        this.editMode = 1;
        this.view.deletepopup.formActionsNew.btnNext.onClick = this.deleteAllRule;
      }.bind(this);
      this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.accounts.approvaleditrule");
      for(var i=0;i<this.getRowDataLength();i++){
        data[i].imgAction.src = "bin.png";
        if(this.getRowDataLength() === 1 || data[i].key === "upto")
          data[i].flxCheckbox.skin = "slFbox";
        if(i === 0){
          data[i].txtAmount1.skin = "sknTxtBrodere0e0e0";  
          data[i].txtAmount1.placeholderSkin = "ICSknTbxPlaceholderSSP72727215px";
        }
        else
          data[i].txtAmount1.skin = "sknTbxBkGrndf6f6f6SSP42424215px";
        data[i].txtAmount2.skin = "sknTxtBrodere0e0e0";
        if(data[i].conditions.groupList.length>0 && JSON.parse(data[i].conditions.groupRule).length>0){
          data[i].lblAppRequired.skin = "bbSknLblSSP4176A415Px";
        }
        else{
          data[i].lblAppRequired.skin = "bbSknLbl424242SSP15Px";
        }
        if((data[i].imgStatus.src === "disableactivebox.png" && data[i].key === "upto") || (data[i].imgStatus.src === "disableactivebox.png" && this.getRowDataLength() === 1))
        {
          data[i].imgStatus.src = "active.png";
        }
        if(data[i].imgStatus.src === "disableinactivebox.png")
        {
          data[i].imgStatus.src = "inactive.png";
        }
      }
      scope.view.segAddRules.setData(data);
      scope.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.accounts.confirmandsave");
      scope.view.btnConfirm.onClick = scope.invokeConfirmPopup;
      scope.view.btnCancel.onClick = scope.invokeCancelPopup;
      scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
      scope.disableButton();
      scope.closeAcknowledgementBanner();
      scope.closeWarningMsg();
      scope.view.segAddRules.setEnabled(true);
      this.view.btnAddRange.top = this.getAddButtonTop();
      scope.view.btnAddRange.setVisibility(true);
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      if(!scope.isEmptyNullorUndefined(accountDetails.accountName)){
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.singatorygrp.accleveledit");
      }
      scope.view.forceLayout();
    },
    navigateToAddConditionsScreen : function(context,index){
      var scope = this;
      context.row = index;
      this.editMode = 1;
      var data = this.getRowData();
      if(data[context.row].lblAppRequired.text !== "N/A"){
        scope.closeWarningMsg();
        scope.closeAcknowledgementBanner();
        applicationManager.getNavigationManager().setCustomInfo("BACKUP_DATA", scope.getRowData());
        applicationManager.getNavigationManager().setCustomInfo("SELECTED_RANGE", context);
        applicationManager.getNavigationManager().navigateTo("frmSignatoryMatrixConditions");
      }
      scope.view.forceLayout();
    },
    getDropdownTop : function(index){
      var scope = this;
      return ((index * this.rowTopInitial)+this.dropdownTopInitial).toString()+"dp";
    },
    navigateToApprovalMatrix : function(){
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      settingsnew.isApprovalMatrixDisabled(accountDetails);
    },
    getAddButtonTop : function(index){
      var scope = this;
      index = scope.getRowDataLength();
      return ((index * this.rowTopInitial)+30).toString()+"dp";
    },
    invokeDeletePopup : function(context){
      var scope = this;
      var data = this.getRowData();
      this.editMode = 1;
      scope.selectedRow = context.row;
	  if(!kony.sdk.isNullOrUndefined(data[context.row]) && !kony.sdk.isNullOrUndefined(data[context.row].imgAction) && data[context.row].imgAction.isVisible){
		  this.view.deletepopup.formActionsNew.btnNext.onClick = this.deleteRowData;
		  if(data[context.row].key === "between"){
			scope.view.flxDeletePopup.deletepopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.signatory.confirmtodeleterange")+this.baseCurrency+data[context.row].txtAmount1.text+" - "+this.baseCurrency+data[context.row].txtAmount2.text+"'?";
             scope.view.flxDeletePopup.deletepopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.approvals.headerDeleteRange");
          }
		  else{
			scope.view.flxDeletePopup.deletepopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.signatory.deletetherange");
            scope.view.flxDeletePopup.deletepopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.approvals.headerDeleteRange");
          }
		  scope.view.flxDeletePopup.setVisibility(true);
		  scope.view.forceLayout();
	  }
    },
    getMessages : function(value){
      return {
        "SD" : "‘"+kony.i18n.getLocalizedString("i18n.between")+" "+value+"’ " +kony.i18n.getLocalizedString("i18n.deletedsuccessfully"),
        "NR" : "‘"+kony.i18n.getLocalizedString("i18n.between")+" "+value+"’ " +kony.i18n.getLocalizedString("i18n.addedsuccessfully"),
        "SU" : kony.i18n.getLocalizedString("i18n.approvals.rulesupdated"),
        "SC" : kony.i18n.getLocalizedString("i18n.rulescreated"),
        "ALL" : kony.i18n.getLocalizedString("i18n.allaccountscustomer"),
        "GR" : kony.i18n.getLocalizedString("i18n.signatory.greatervalue")+" "+this.baseCurrency+value,
        "ADD" : kony.i18n.getLocalizedString("i18n.signatory.addconditionfor")+" '"+value+"' "+kony.i18n.getLocalizedString("i18n.signatory.tocontinue"),
        "ABW" : kony.i18n.getLocalizedString("i18n.signatory.addbetweenrange")+" "+value+" "+kony.i18n.getLocalizedString("i18n.signatory.tocontinue")
      };
    },
    dismissDeletePopup : function(){
      var scope = this;
      scope.view.flxDeletePopup.setVisibility(false);
      scope.view.forceLayout();
    },
    invokeConfirmPopup : function(){
      var scope = this;
      this.editMode = 1;
      scope.setContentToConfirmPopup();
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      if(flow["limitFlow"] === "EDIT"){
        scope.view.flxConfirmPopup.confirmpopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.signatory.editapprovalrule");
        scope.view.flxConfirmPopup.confirmpopup.flxBody.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
      }
      else{
        scope.view.flxConfirmPopup.confirmpopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.signatory.createrule");
        scope.view.flxConfirmPopup.confirmpopup.flxBody.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.enrollNow.Create");
      }
      scope.view.flxConfirmPopup.setVisibility(true);
      scope.view.forceLayout();
    },
    dismissConfirmPopup : function(){
      var scope = this;
      scope.view.flxConfirmPopup.setVisibility(false);
      scope.view.forceLayout();
    },
    invokeCancelPopup : function(){
      var scope = this;
      if(this.editMode === 1){
      scope.view.flxCancelPopup.setVisibility(true);
      }
      else{
        this.backNavigation();
      }
      scope.view.forceLayout();
    },
    dismissCancelPopup : function(){
      var scope = this;
      scope.view.flxCancelPopup.setVisibility(false);
      scope.view.forceLayout();
    },
    frmPostShow : function(){
      var scope = this;
      var data = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      this.view.btnDeleteRule.text = kony.i18n.getLocalizedString("i18n.approvals.headerDeleteRule");
      this.view.cancelpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.confirmcancelchanges");
      this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("i18n.signatory.createrule");
      this.view.deletepopup.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
      this.view.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.approvals.approvalRequired");
      this.view.btnAddRange.text = "+ " + kony.i18n.getLocalizedString("i18n.SignatoryMatrix.AddRange");
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
        if (kony.application.getCurrentBreakpoint() <= "1024") {
          this.view.lblAppRequired.right = "38.5%";
          this.view.flxCustomerID.right = "0%";
        } else if (kony.application.getCurrentBreakpoint() >= "1366") {
          this.view.lblAppRequired.right = "42.5%";
        }
      }
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var currency = (kony.sdk.isNullOrUndefined(data["DAILY_LIMIT"][0].currency))?'USD':data["DAILY_LIMIT"][0].currency;
      this.baseCurrency =   formatUtilManager.getCurrencySymbol(currency);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      scope.setAccountDetails();
      this.view.btnAddRange.setVisibility(true);
      this.view.btnAddRange.top = this.getAddButtonTop();
      if(kony.application.getPreviousForm().id === "frmSignatoryMatrixConditions"){
        this.editMode = 1;
        var range = applicationManager.getNavigationManager().getCustomInfo("SELECTED_RANGE");
        var backup = applicationManager.getNavigationManager().getCustomInfo("BACKUP_DATA");
        if(!scope.isEmptyNullorUndefined(range)){
          scope.view.segAddRules.removeAll();
          range.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
          scope.view.segAddRules.widgetDataMap = scope.getRowWidgetDataMap();
          backup[range.row] = range;
          if(backup[range.row].key === "between"){
            var rangeof = this.baseCurrency+backup[range.row].txtAmount1.text+" - "+this.baseCurrency+backup[range.row].txtAmount2.text;
            scope.showAcknowledgementBanner(scope.getMessages(rangeof)["NR"],0);
          }else{
            scope.showAcknowledgementBanner("'"+backup[range.row].lblDropdown.text+"' " + kony.i18n.getLocalizedString("i18n.addedsuccessfully"),0);
          }
          scope.view.segAddRules.setData(backup);
          this.view.btnAddRange.setVisibility(true);
          this.view.btnAddRange.top = this.getAddButtonTop();
          scope.checkConditionsAvailability();
          return;
        }
        else
        {
          backup = applicationManager.getNavigationManager().getCustomInfo("BACKUP_DATA");
          scope.view.segAddRules.removeAll();
          scope.view.segAddRules.widgetDataMap = scope.getRowWidgetDataMap();
          scope.view.segAddRules.setData(backup);
          this.view.btnAddRange.setVisibility(true);
          this.view.btnAddRange.top = this.getAddButtonTop();
          scope.checkConditionsAvailability();
          return;
        }
      }
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      scope.view.flxError.setVisibility(false);
      this.view.flxSubDetails.height = "110dp";
      this.view.flxApprovalMatrixContainer.height = "800dp";
      scope.view.segAddRules.removeAll();
      if(flow["limitFlow"] === "EDIT"){
        scope.loadPreFilledData();
        scope.setContentToConfirmPopup();
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.accounts.approvaleditrule");
        this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("i18n.accounts.editRule");
        this.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.accounts.confirmandsave");
        this.view.btnDeleteRule.setVisibility(true);
        this.view.btnDeleteRule.onClick = function(){
          this.view.flxDeletePopup.deletepopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.signatory.deletetherule");
          this.view.flxDeletePopup.deletepopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.approvals.headerDeleteRule");
          this.view.flxDeletePopup.setVisibility(true);
          this.editMode = 1;
          this.view.deletepopup.formActionsNew.btnNext.onClick = this.deleteAllRule;
        }.bind(this);
        this.view.segAddRules.setEnabled(true);
        scope.disableButton();
      }
      else
      {
        scope.loadInitialData();
        scope.setContentToConfirmPopup();
        this.view.btnDeleteRule.setVisibility(false);
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.approvals.confirmandcreatenewrule");
        this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("i18n.signatory.createrule");
        this.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.approvals.confirmAndCreate");
        this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
        this.view.segAddRules.setEnabled(true);
        scope.disableButton();
      }
      scope.setAccountDetails();
      scope.view.forceLayout();
    },

    setContentToConfirmPopup: function(){
      var scope  = this;
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
        var feature = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
         if(kony.sdk.isNullOrUndefined(accountDetails["accountId"]) || accountDetails["accountId"]==""){
           scope.accountOnlyMatrix = false;
         } else {
           scope.accountOnlyMatrix = true;
         }
        
         if(( feature["isAccountLevel"] == "0") && scope.accountOnlyMatrix == false){
          scope.view.flxConfirmPopup.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.customerPopup");
          scope.view.flxConfirmPopup.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.approvals.customer");
        }
        else if(feature["isAccountLevel"] == "1"  && scope.accountOnlyMatrix == false){
           scope.view.flxConfirmPopup.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.accountPopup");
           scope.view.flxConfirmPopup.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Account");
        }
        else if (  scope.accountOnlyMatrix == true){
           scope.view.flxConfirmPopup.confirmpopup.lblPopupMsg.text = kony.i18n.getLocalizedString("i18n.approvals.accountOnlyPopup");
          scope.view.flxConfirmPopup.confirmpopup.lblActionLevelValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Account");
        }
      },
    updateApprovalMatrixSuccessCallback : function(response){
      var scope = this;
      this.editMode = 1;
      if(scope.view.flxDeletePopup.deletepopup.lblPopupMsg.text !== kony.i18n.getLocalizedString("i18n.signatory.deletetherule")){
        var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
        if(flow["limitFlow"] === "EDIT"){
          scope.showAcknowledgementBanner(scope.getMessages()["SU"], 0);
          scope.view.btnCancel.onClick = scope.navigateToApprovalMatrix;
          scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.accounts.gotoapprovalmatrix");
          this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.approvals.editAck");
          this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("i18n.accounts.editRule");
          scope.navigateToAcknowledgement();
        }
        else{
          scope.showAcknowledgementBanner(scope.getMessages()["SC"], 0);
          scope.view.btnCancel.onClick = scope.navigateToApprovalMatrix;
          scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.accounts.gotoapprovalmatrix");
          this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.approvals.createAck");
          this.view.lblCustomerLevelHeader.text = kony.i18n.getLocalizedString("i18n.signatory.createrule");
          flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
          flow["limitFlow"] = "EDIT";
          applicationManager.getNavigationManager().setCustomInfo("SELECTED_LIMIT_DETAILS",flow);
          scope.navigateToAcknowledgement();
        }
        var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
        if(!scope.isEmptyNullorUndefined(accountDetails.accountName)){
          this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.singatorygrp.accleveleditAck");
        }
      }
      else{
        this.dismissDeletePopup();
		var navMan = applicationManager.getNavigationManager();
		navMan.setCustomInfo("NONMONETARY_MESSAGE",kony.i18n.getLocalizedString("i18n.approvals.rulesdeleted"));
        FormControllerUtility.showProgressBar(this.view);
        this.backNavigation();
      }
      scope.view.forceLayout();
    },
    updateApprovalMatrixFailureCallback : function(response){
      var scope = this;
      scope.showAcknowledgementBanner(response["errormessage"], 1);
      scope.disableButton();
      scope.view.forceLayout();
    },
    loadPreFilledData : function(){
      var scope = this,data;
      var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      scope.view.flxError.setVisibility(false);
      this.view.flxSubDetails.height = "110dp";
      this.view.flxApprovalMatrixContainer.height = "800dp";
      scope.view.segAddRules.removeAll();
      scope.view.btnAddRange.setVisibility(true);
      scope.view.flxDropdownValues.setVisibility(false);
      var limitDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      limitDetails = limitDetails[flow["limitType"]];
      data = scope.processLimitsData(limitDetails);
      scope.view.segAddRules.widgetDataMap = scope.getRowWidgetDataMap();
      scope.view.segAddRules.setData(data);
      scope.view.btnAddRange.top = scope.getAddButtonTop(0);
      scope.view.btnCancel.onClick = scope.invokeCancelPopup;
      scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      scope.view.btnConfirm.text = kony.i18n.getLocalizedString("i18n.accounts.confirmandsave");
      scope.view.forceLayout();
    },
    pickLimitsFromRules : function(){
      var scope = this,output = [];
      var data = scope.getRowData();
      for(var i=0;i<scope.getRowDataLength();i++){
        if(!scope.isEmptyNullorUndefined(data[i].conditions)){
          output.push(data[i].conditions);
        } 
      }
      return output;
    },
    showWarningMsg : function(message){
      this.view.lblWarningImp.text = message;
      this.view.imgWarningImp.src = "error_yellow.png";
      this.view.flxSubDetails.height = "140dp";
      this.view.flxApprovalMatrixContainer.height = "864dp";
      this.view.flxWarning.setVisibility(false);
      this.view.forceLayout();
    },
    closeWarningMsg : function(){
      var scope = this;
      scope.view.flxWarning.setVisibility(false);
      this.view.flxSubDetails.height = "110dp";
      this.view.flxApprovalMatrixContainer.height = "800dp";
      this.view.forceLayout();
    },
    showAcknowledgementBanner : function(message,code){
      var scope = this;
      scope.view.lblDowntimeWarning.text = message;
      if(code === 0){
        scope.view.imgDowntimeWarning.src = "bulk_billpay_success.png";
      }
      else{
        scope.view.imgDowntimeWarning.src = "error_yellow.png";
      }
      scope.view.flxDowntimeWarning.setVisibility(true);
      scope.view.forceLayout();
    },
    closeAcknowledgementBanner : function(){
      var scope = this;
      scope.view.flxDowntimeWarning.setVisibility(false);
      scope.view.forceLayout();
    },
    processLimitsData : function(data){
      var scope = this,output = [],dummy = {};
      for(var i=0;i<data.length;i++){
        if(data[i].lowerlimit === "-1.00" && data[i].upperlimit !== "-1.00"){
          dummy = this.getInitialRowData();
          dummy.lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.upto");
          dummy.key = "upto";
          dummy.txtAmount1.enable = true;
          dummy.imgChevron.src = "disabledown.png";
          dummy.imgChevron.cursorType = "inherit";
          dummy.conditions = data[i];
          if(data[i].upperlimit.includes(".") || data[i].upperlimit.includes(",")){
            dummy.txtAmount1.text = data[i].upperlimit.slice(0,-3);  
          }
          else{
            dummy.txtAmount1.text = data[i].upperlimit;
          }
          if(data[i].groupRule && data[i].groupList.length>0 && JSON.parse(data[i].groupRule).length>0){
            dummy.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            dummy.lblAppRequired.skin = "bbSknLblSSP4176A415Px";
            dummy.imgStatus.src = "active.png";
          }
          else{
            dummy.lblAppRequired.text = "N/A";
            dummy.lblAppRequired.skin = "";
            dummy.imgStatus.src = "inactive.png";
          }
          output.push(dummy);
        }
        else if(data[i].upperlimit === "-1.00" && data[i].lowerlimit !== "-1.00" && data[i].lowerlimit !== "0.00"){
          dummy = this.getAboveRowData();
          if(data[i].lowerlimit.includes(".") || data[i].lowerlimit.includes(",")){
            dummy.txtAmount1.text = data[i].lowerlimit.slice(0,-3);  
          }
          else{
            dummy.txtAmount1.text = data[i].lowerlimit;
          }
          dummy.conditions = data[i];
          dummy.imgChevron.src = "disabledown.png";
          dummy.imgChevron.cursorType = "inherit";
          if((output.length === 1)){
            output[0].imgAction.src = "bin.png";
            output[0].imgAction.isVisible = true;
          }
          if(data[i].groupRule && data[i].groupList.length>0 && JSON.parse(data[i].groupRule).length>0){
            dummy.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            dummy.lblAppRequired.skin = "bbSknLblSSP4176A415Px";
            dummy.imgStatus.src = "disableactivebox.png";
          }
          else{
            dummy.lblAppRequired.text = "N/A";
            dummy.lblAppRequired.skin = "";
            dummy.imgStatus.src = "inactive.png";
          }
          output.push(dummy);
        }
        else if(data[i].upperlimit === "-1.00" && data[i].lowerlimit === "0.00"){
          dummy = this.getInitialRowData();
          dummy.key = "above";
          dummy.lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.above");
          dummy.imgChevron.src = "disabledown.png";
          dummy.imgChevron.cursorType = "inherit";
          dummy.imgStatus.src = "disableactivebox.png";
          dummy.txtAmount1.enable = true;
          dummy.txtAmount1.text = "0";
          dummy.imgAction.src = "bin.png";
          dummy.imgAction.isVisible = true;
          dummy.conditions = data[i];
          if(data[i].groupRule && data[i].groupList.length>0 && JSON.parse(data[i].groupRule).length>0){
            dummy.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
            dummy.lblAppRequired.skin = "bbSknLblSSP4176A415Px";
            dummy.imgStatus.src = "active.png";
          }
          else{
            dummy.lblAppRequired.text = "N/A";
            dummy.lblAppRequired.skin = "";
            dummy.imgStatus.src = "inactive.png";
          }
          output.push(dummy);
        }
        else{
          dummy = this.getBetweenRowData();
          dummy.imgChevron.src = "disabledown.png";
          dummy.imgChevron.cursorType = "inherit";
          dummy.txtAmount1.text = data[i].lowerlimit.slice(0,-3);
          dummy.txtAmount2.text = data[i].upperlimit.slice(0,-3);
          dummy.conditions = data[i];
          dummy.lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
          dummy.lblAppRequired.skin = "bbSknLblSSP4176A415Px";
          output.push(dummy);
          output[0].imgAction.src = "bin.png";
          output[0].imgAction.isVisible = false;
        }
      }
      scope.view.forceLayout();
      return output;
    },
    onClickedDropdownValue : function(key){
      var scope = this,data;
      this.editMode = 1;
      if(scope.getRowDataLength()>2)
        key = "between";
      if(key === "upto")
      {
        data = this.getRowData();
        data[scope.selectedRow].lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.upto");
        data[scope.selectedRow].imgAction.isVisible = true;
        data[scope.selectedRow].key = "upto";
        data[scope.selectedRow].txtAmount1.enable = true;
        data[scope.selectedRow].imgChevron.src = "disabledown.png";
        data[scope.selectedRow].imgChevron.cursorType = "inherit";
        scope.view.flxDropdownValues.setVisibility(false);
        this.setRowData(data[scope.selectedRow], scope.selectedRow);
        if(data.length === 1){
          scope.disableButton();
          scope.addRowData(scope.getAboveRowData(),scope.selectedRow+1);
        }
        if(data.length === 2){
          data = this.getRowData();
          var data1 = scope.getAboveRowData();
          data1.txtAmount1.text = data[0].txtAmount1.text;
          scope.setRowData(data1,1);
        }
        scope.view.btnAddRange.setVisibility(true);
        scope.view.btnAddRange.top = scope.getAddButtonTop(scope.selectedRow);
      }
      if(key === "above")
      {
        scope.view.segAddRules.removeAll();
        data = scope.getInitialRowData();
        data.lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.above");
        data.key = "above";
        data.imgStatus.src = "inactive.png";
        data.txtAmount1.text = "0";
        data.txtAmount1.enable = true;
        data.imgAction.isVisible = true;
        scope.view.segAddRules.widgetDataMap = scope.getRowWidgetDataMap();
        scope.view.segAddRules.setData([data]);
        scope.view.btnAddRange.setVisibility(true);
        scope.view.flxDropdownValues.setVisibility(false);
        scope.enableButton();
        scope.view.btnAddRange.top = scope.getAddButtonTop(0);
      }
      if(key === "between")
      {
        data = this.getRowData();
        data[0].imgAction.isVisible = false;
        this.setRowData(data[0], 0);
        this.view.flxDropdownValues.setVisibility(false);
        var newData = scope.getBetweenRowData();
        if(data[scope.selectedRow-1].txtAmount2.isVisible){
          newData.txtAmount1.text = data[scope.selectedRow-1].txtAmount2.text;  
        }
        else{
          newData.txtAmount1.text = data[scope.selectedRow-1].txtAmount1.text;  
        }
        this.setRowData(newData, scope.selectedRow);
      }
      scope.view.forceLayout();
    },
    setFlowActions : function(){
      var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      this.view.btnAddRange.onClick = this.addNewRange;
      this.view.imgWarningClose.onTouchStart = this.closeAcknowledgementBanner;
      this.view.flxDropdownValues.flxUpto.onClick = this.onClickedDropdownValue.bind(this,"upto");
      this.view.flxDropdownValues.flxAbove.onClick = this.onClickedDropdownValue.bind(this,"above");
      this.view.flxDropdownValues.flxBetween.onClick = this.onClickedDropdownValue.bind(this,"between");
      this.view.confirmpopup.formActionsNew.btnCancel.onClick = this.dismissConfirmPopup;
      this.view.confirmpopup.formActionsNew.btnNext.onClick = function(){
        var request = {};
        this.createLimits();
        request = this.getUpdateMatrixServiceRequest();
        request.limits = this.pickLimitsFromRules();
        settingsnew.updateApprovalMatrixSG(request);
        this.dismissConfirmPopup();
      }.bind(this);
      this.view.deletepopup.formActionsNew.btnCancel.onClick = this.dismissDeletePopup;
      this.view.deletepopup.formActionsNew.btnNext.onClick = this.deleteRowData;
      this.view.btnCancel.onClick = this.invokeCancelPopup;
      this.view.btnConfirm.onClick = function(){
        this.invokeConfirmPopup();
      }.bind(this);
      this.view.cancelpopup.flxPopupContainer.flxHeader.imgClose.onTouchStart = this.dismissCancelPopup;
      this.view.confirmpopup.flxPopupContainer.flxHeader.imgClose.onTouchStart = this.dismissConfirmPopup;
      this.view.deletepopup.flxPopupContainer.flxHeader.imgClose.onTouchStart = this.dismissDeletePopup;
      this.view.cancelpopup.formActionsNew.btnNext.onClick = function(){
        this.dismissCancelPopup();
        this.backNavigation();
      }.bind(this);
      this.view.cancelpopup.formActionsNew.btnCancel.onClick = this.dismissCancelPopup;
    },
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    backNavigation : function(){
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      settingsnew.isApprovalMatrixDisabled(accountDetails);
    },
    deleteAllRule : function(){
      var scope = this;
      this.editMode = 1;
      var settingsnew = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController;
      this.loadInitialData();
      var request = {};
      this.createLimits();
      request = this.getUpdateMatrixServiceRequest();
      request.limits = this.pickLimitsFromRules();
      settingsnew.updateApprovalMatrixSG(request);
      scope.view.forceLayout();
    },
    loadInitialData : function(){
      var scope = this;
      var data = [];
      scope.closeAcknowledgementBanner();
      scope.closeWarningMsg();
      scope.view.btnAddRange.setVisibility(false);
      scope.disableButton();
      scope.view.segAddRules.removeAll();
      data.push(scope.getInitialRowData());
      scope.view.segAddRules.widgetDataMap = scope.getRowWidgetDataMap();
      scope.view.segAddRules.setData(data);
      scope.view.forceLayout();
    },
    onBreakpointChange: function(form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      if (kony.application.getCurrentBreakpoint() <= 1024) {
        this.view.customfooternew.lblCopyright.left = "4%";
      }
      this.frmPostShow();
    },
    addNewRange : function(){
      var scope = this;
      this.editMode = 1;
      var index = this.getRowDataLength();
      this.addRowData(this.getInitialRowData(), index-1);
      this.view.btnAddRange.top = this.getAddButtonTop();
    },
    addRowData : function(data,rowIndex){
      this.view.segAddRules.addDataAt(data, rowIndex);
      this.view.btnAddRange.top = this.getAddButtonTop();
      this.disableButton();
      this.view.forceLayout();
    },
    createLimits : function(){
      var scope = this;
      var data = this.getRowData();
      for(var i=0;i<this.getRowDataLength();i++){
        if(data[i].key === "upto"){
          data[i].conditions.lowerlimit = "-1.00";
          data[i].conditions.upperlimit = data[i].txtAmount1.text;
        }
        if(data[i].key === "between"){
          data[i].conditions.lowerlimit = data[i].txtAmount1.text;
          data[i].conditions.upperlimit = data[i].txtAmount2.text;
        }
        if(data[i].key === "above"){
          data[i].conditions.lowerlimit = data[i].txtAmount1.text;
          data[i].conditions.upperlimit = "-1.00";
        }
        scope.setRowData(data[i],i);
      }
      scope.view.forceLayout();
    },
    addViewEditCondition : function(context){
      var scope = this,data;
      this.editMode = 1;
      scope.createLimits();
      data = scope.getRowData();
      scope.navigateToAddConditionsScreen(data[context.row], context.row);
      scope.view.forceLayout();
    },
    addRemoveCondition : function(context){
      var scope = this;
      var data = scope.getRowData();
      this.editMode = 1;
      var key = data[context.row].key;
      var image = data[context.row].imgStatus.src;
      if(key === "between" || key === "select" || (key === "above" && scope.getRowDataLength()!==1)){}
      else{
        scope.closeWarningMsg();
        scope.closeAcknowledgementBanner();
        if(image === "inactive.png" && data[context.row].conditions.groupList.length>0 && JSON.parse(data[context.row].conditions.groupRule).length === 0){
          data[context.row].imgStatus.src = "active.png";
          data[context.row].lblAppRequired.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.AddCondition");
          data[context.row].lblAppRequired.skin = "bbSknLblSSP4176A415Px";
          scope.setRowData(data[context.row], context.row);
        }
        else if(image === "inactive.png" && data[context.row].conditions.groupList.length>0 && JSON.parse(data[context.row].conditions.groupRule).length > 0){
          data[context.row].imgStatus.src = "active.png";
          data[context.row].lblAppRequired.text = kony.i18n.getLocalizedString("i18n.signatory.vieworedit");
          data[context.row].lblAppRequired.skin = "bbSknLblSSP4176A415Px";
          scope.setRowData(data[context.row], context.row);
        }
        else{
          data[context.row].imgStatus.src = "inactive.png";
          data[context.row].lblAppRequired.text = "N/A";
		  data[context.row].conditions.groupList ="[]";
		  data[context.row].conditions.groupRule ="[]";
          data[context.row].lblAppRequired.skin = "bbSknLbl424242SSP15Px";
          scope.setRowData(data[context.row], context.row);
        }
      }
      scope.checkConditionsAvailability();
      scope.view.forceLayout();
    },
    fromAmountValue : function(index){
      var scope = this;
      var data = this.getRowData();
      this.editMode = 1;
      if(data[index].key === "select"){
        data[index].txtAmount1.text = "";
        scope.setRowData(data[index],index);
        return;
      }
      if(data.length>1)
      {
        data[index+1].txtAmount1.text = data[index].txtAmount1.text;
        scope.setRowData(data[index+1],index+1);
      }
      if(data.length === 2){
        if(data[index+1].conditions.groupList.length>0 && JSON.parse(data[index+1].conditions.groupRule).length>0){}
        else{
          scope.showWarningMsg(scope.getMessages(data[index+1].lblDropdown.text)["ADD"]);
          scope.view.flxError.setVisibility(false);
          this.view.flxSubDetails.height = "140dp";
          this.view.flxApprovalMatrixContainer.height = "864dp";
        }
      }
      if((data[0].imgStatus.src === "active.png" || data[0].imgStatus.src === "disableactivebox.png") && data[0].conditions.groupList.length>0 && JSON.parse(data[0].conditions.groupRule).length>0){}
      else{
        if(data[0].imgStatus.src === "inactive.png"){}
        else{
          scope.showWarningMsg(scope.getMessages(data[0].lblDropdown.text)["ADD"]);
          scope.view.flxError.setVisibility(false);
          this.view.flxSubDetails.height = "140dp";
          this.view.flxApprovalMatrixContainer.height = "864dp";
        }
      }
      if(data.length === 1 && parseInt(data[0].txtAmount1.text)>0 && data[0].key === "above")
      {
        var txt = data[0].txtAmount1.text;
        data = this.getInitialRowData();
        data.lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.upto");
        data.imgAction.isVisible = true;
        data.key = "upto";
        data.imgChevron.src = "disabledown.png";
        data.imgChevron.cursorType = "inherit";
        var data1 = this.getAboveRowData();
        data1.txtAmount1.text = txt;
        data.txtAmount1.text = txt;
        data.txtAmount1.enable = true;
        scope.addRowData(data,0);
        scope.setRowData(data1,1);
        scope.disableButton();
      }
      scope.checkConditionsAvailability();
      scope.view.forceLayout();
    },
    toAmountValue : function(index){
      var scope = this; 
      var data = this.getRowData();
      this.editMode = 1;
      if(data[index].key === "select"){
        data[index].txtAmount1.text = "";
        data[index].txtAmount2.text = "";
        scope.setRowData(data[index],index);
        return;
      }
      data[index].txtAmount2.skin = "sknTxtBrodere0e0e0";
      scope.view.flxError.setVisibility(false);
      this.view.flxSubDetails.height = "110dp";
      this.view.flxApprovalMatrixContainer.height = "800dp";
      scope.setRowData(data[index],index);
      if(data[index].conditions.groupList.length>0 && JSON.parse(data[index].conditions.groupRule).length>0){}
      else{
        scope.showWarningMsg(scope.getMessages(this.baseCurrency+data[index].txtAmount1.text+" - "+this.baseCurrency+data[index].txtAmount2.text)["ABW"]);
      }
      if(data.length>1)
      {
        data[index+1].txtAmount1.text = data[index].txtAmount2.text;
        if(parseInt(data[index].txtAmount2.text) <= parseInt(data[index].txtAmount1.text)){
          data[index].txtAmount2.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
          this.view.flxWarning.setVisibility(false);
          scope.view.flxError.setVisibility(true);
          scope.closeWarningMsg();
          this.view.flxSubDetails.height = "140dp";
          this.view.flxApprovalMatrixContainer.height = "864dp";
          scope.view.flxError.lblErrorValue.text = scope.baseCurrency + data[index].txtAmount1.text;
          scope.setRowData(data[index],index);
          this.view.forceLayout();
          scope.disableButton();
        }
        scope.setRowData(data[index+1],index+1);
      }
      if(data[index].txtAmount2.skin !== "skntxtSSP424242BorderFF0000Op100Radius2px"){
        scope.checkConditionsAvailability();
      }
      scope.view.forceLayout();
    },
    enableButton : function(){
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      if(kony.sdk.isNullOrUndefined(accountDetails.accountName)){
         this.showWarningMsg(kony.i18n.getLocalizedString("i18n.allaccountscustomer"));
      }
      else{
        this.showWarningMsg(kony.i18n.getLocalizedString("i18n.selectedAccountsCustomer"));
      }
      this.view.btnConfirm.skin = "sknBtnNormalSSPFFFFFF4vs";
      this.view.btnConfirm.setEnabled(true);
    },
    disableButton : function(){
      this.view.btnConfirm.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.btnConfirm.setEnabled(false);
    },
    deleteRowData : function(){
      var scope = this,data;
      this.editMode = 1;
      this.view.flxError.setVisibility(false);
      var index = scope.selectedRow;
      var backdata = this.getRowData();
      if(backdata[index].key === "between")
      {
        var rangeof = this.baseCurrency+backdata[index].txtAmount1.text+" - "+this.baseCurrency+backdata[index].txtAmount2.text;
      }
      this.view.segAddRules.removeAt(index);
      if(this.getRowDataLength() === 0){
        this.view.segAddRules.removeAll();
        data = [this.getInitialRowData()];
        this.view.segAddRules.widgetDataMap = this.getRowWidgetDataMap();
        this.view.segAddRules.setData(data);
        this.view.btnAddRange.setVisibility(false);
      }
      else if(this.getRowDataLength() === 1){
        data= this.getInitialRowData();
        data.lblDropdown.text = kony.i18n.getLocalizedString("i18n.signatory.above");
        data.key = "above";
        data.txtAmount1.enable = true;
        data.imgChevron.src = "disabledown.png";
        data.imgChevron.cursorType = "inherit";
        data.txtAmount1.text = "0";
        data.imgAction.isVisible = true;
        this.setRowData(data, 0);
        this.enableButton();
      }
      else if(this.getRowDataLength()<3){
        data = this.getRowData();
        data[0].imgAction.isVisible = true;
        data[1].txtAmount1.text = data[0].txtAmount1.text;
        this.setRowData(data[0], 0);
        this.setRowData(data[1], 1);
      }
      data = this.getRowData();
      for (var i = 0; i < this.getRowDataLength() - 1; i++) {
        if (!scope.isEmptyNullorUndefined(data[i].txtAmount1.text)) {
          data[i + 1].txtAmount1.text = data[i].txtAmount1.text;
          this.setRowData(data[i + 1], i + 1);
        }
        if (!scope.isEmptyNullorUndefined(data[i].txtAmount2.text)) {
          data[i + 1].txtAmount1.text = data[i].txtAmount2.text;
          this.setRowData(data[i + 1], i + 1);
        }
      }
      this.dismissDeletePopup();
      scope.closeAcknowledgementBanner();
      scope.closeWarningMsg();
      if(!scope.isEmptyNullorUndefined(rangeof)){
        this.showAcknowledgementBanner(this.getMessages(rangeof)["SD"], 0);  
      }
      this.view.btnAddRange.top = this.getAddButtonTop();
      scope.checkConditionsAvailability();
      if(this.getRowDataLength() === 1){scope.enableButton();}
      this.view.forceLayout();
    },
    setRowData : function(data,index){
      this.view.segAddRules.setDataAt(data,index);
      this.view.forceLayout();
    },
    setDropdownValues : function(key){
      var scope = this;
      this.editMode = 1;
      if(scope.getRowDataLength()>2)
        key = "between";
      else if(scope.getRowDataLength() === 2)
        key = "upto";
      else
        key = "select";
      if(key === "between"){
        scope.view.flxAbove.setVisibility(false);
        scope.view.flxUpto.setVisibility(false);
        scope.view.flxBetween.setVisibility(true);
      }
      if(key === "select"){
        scope.view.flxAbove.setVisibility(true);
        scope.view.flxUpto.setVisibility(true);
        scope.view.flxBetween.setVisibility(false);
      }
      if(key === "upto"){
        scope.view.flxAbove.setVisibility(false);
        scope.view.flxUpto.setVisibility(true);
        scope.view.flxBetween.setVisibility(false);
      }
      scope.view.forceLayout();
    },
    dropdownExpandCollapse : function(context){
      var scope = this;
      var data = this.getRowData();
      if(data[context.row].key === "select"){
        this.editMode = 1;
        if(data[context.row].imgChevron.src === "uparrow.png")
        {
          data[context.row].imgChevron.src = "disabledown.png";
          data[context.row].imgChevron.cursorType = "inherit";
          scope.view.flxDropdownValues.setVisibility(false);
          this.setRowData(data[context.row], context.row);
        }
        else
        {
          data[context.row].imgChevron.src = "uparrow.png";
          scope.view.flxDropdownValues.setVisibility(true);
          scope.setDropdownValues();
          scope.selectedRow = context.row;
          scope.view.flxDropdownValues.top = scope.getDropdownTop(context.row);
          this.setRowData(data[context.row], context.row);
        }
      }
      this.view.forceLayout();
    },
    getRowData : function(){
      var data = this.view.segAddRules.data;
      return data;
    },
    getRowDataLength : function(){
      var data = this.view.segAddRules.data;
      return data.length;
    },
    getRowWidgetDataMap : function(){
      var datamapping = {
        "lblDropdown" : "lblDropdown",
        "imgChevron" : "imgChevron",
        "lblAppConditions" : "lblAppConditions",
        "txtAmount1" : "txtAmount1",
        "txtAmount2" : "txtAmount2",
        "lblAmtSeparator" : "lblAmtSeparator",
        "imgStatus" : "imgStatus",
        "lblAppRequired" : "lblAppRequired",
        "imgAction" : "imgAction",
        "flxAmt1" : "flxAmt1",
        "flxAmt2" : "flxAmt2",
        "lblCurrency1" : "lblCurrency1",
        "lblCurrency2" : "lblCurrency2"
      };
      return datamapping;
    },
    checkConditionsAvailability : function(){
      var scope = this,data,flag = 0;
      data = this.getRowData();
      for(var i=0;i<scope.getRowDataLength();i++){
        if(data[i].imgStatus.src === "active.png" || data[i].imgStatus.src === "disableactivebox.png"){
          if(data[i].conditions.groupList.length>0 && JSON.parse(data[i].conditions.groupRule).length>0 && !scope.isEmptyNullorUndefined(data[i].txtAmount1.text)){
            if(data[i].key === "between"){
              if(!scope.isEmptyNullorUndefined(data[i].txtAmount2.text)){
                flag = 1;
              }
              else
              {
                flag=0;
                break;
              }
            }
            else
              flag = 1;
          }
          else
          {
            flag = 0;
            break;
          }
        }
        else{
          if(data[i].imgStatus.src === "inactive.png" && scope.getRowDataLength() === 1 && data[i].txtAmount1.text === 0){
            flag = 1;
          }
          else
          {}
        }
      }
      if(flag === 1)
        scope.enableButton();
      else
        scope.disableButton();
    },
    getInitialRowData : function(){
      return {
        "key" : "select",
        "lblDropdown" : {
          "text" : kony.i18n.getLocalizedString("i18n.ACH.Select")
        },
        "imgChevron" : {
          "src" : "arrow_down.png",
          "cursorType" : "Pointer"
        },
        "txtAmount1" : {
          "text" : "",
          "placeholder" : kony.i18n.getLocalizedString("i18n.signatory.valueplaceholder"),
          "skin" : "sknTxtBrodere0e0e0",
          "focusSkin" : "sknTxtBrodere0e0e0",
          "placeholderSkin" : "ICSknTbxPlaceholderSSP72727215px",
          "isVisible" : true,
          "enable" : false
        },
        "txtAmount2" : {
          "text" : "",
          "placeholder" : kony.i18n.getLocalizedString("i18n.signatory.valueplaceholder"),
          "isVisible" : false
        },
        "flxAmt1" : {
          "isVisible" : true
        },
        "flxAmt2" : {
          "isVisible" : false
        },
        "lblCurrency1" : {
          "text" : this.baseCurrency
        },
        "flxCheckbox" : {
          "skin" : "slFbox"
        },
        "lblCurrency2" : {
          "text" : this.baseCurrency
        },
        "conditions" : {
          "groupRule" : "[]",
          "groupList" : "[]",
          "upperlimit" : "-1.00",
          "lowerlimit" : "-1.00"
        },
        "lblAmtSeparator" : {
          "isVisible" : false
        },
        "imgStatus" : {
          "src" : "inactive.png"
        },
        "lblAppRequired" : {
          "text" : "N/A"
        },
        "imgAction" : {
          "isVisible" : false,
          "src" : "bin.png"
        }
      };
    },
    getBetweenRowData : function(){
      return {
        "key" : "between",
        "lblDropdown" : {
          "text" : kony.i18n.getLocalizedString("i18n.signatory.between")
        },
        "imgChevron" : {
          "src" : "disabledown.png"
        },
        "txtAmount1" : {
          "text" : "",
          "placeholder" :kony.i18n.getLocalizedString("i18n.signatory.valueplaceholder"),
          "enable" : false,
          "skin" : "sknTbxBkGrndf6f6f6SSP42424215px",
          "focusSkin" : "sknTbxBkGrndf6f6f6SSP42424215px",
          "placeholderSkin" : "sknTbxBkGrndf6f6f6SSP42424215px",
          "isVisible" : true
        },
        "txtAmount2" : {
          "text" : "",
          "placeholder" : kony.i18n.getLocalizedString("i18n.signatory.valueplaceholder"),
          "enable" : true,
          "skin" : "sknTxtBrodere0e0e0",
          "focusSkin" : "sknTxtBrodere0e0e0",
          "placeholderSkin" : "ICSknTbxPlaceholderSSP72727215px",
          "isVisible" : true
        },
        "flxAmt1" : {
          "isVisible" : true
        },
        "flxAmt2" : {
          "isVisible" : true
        },
        "lblCurrency1" : {
          "text" : this.baseCurrency
        },
        "lblCurrency2" : {
          "text" : this.baseCurrency
        },
        "flxCheckbox" : {
          "skin" : "ICSknDisabledValue"
        },
        "lblAmtSeparator" : {
          "isVisible" : true
        },
        "imgStatus" : {
          "src" : "disableactivebox.png"
        },
        "conditions" : {
          "groupRule" : "[]",
          "groupList" : "[]",
          "upperlimit" : "-1.00",
          "lowerlimit" : "-1.00"
        },
        "lblAppRequired" : {
          "text" : kony.i18n.getLocalizedString("i18n.signatory.addcondition"),
          "skin" : "bbSknLblSSP4176A415Px"
        },
        "imgAction" : {
          "isVisible" : true,
          "src" : "bin.png"
        }
      };
    },
    getAboveRowData : function(){
      return {
        "key" : "above",
        "lblDropdown" : {
          "text" : kony.i18n.getLocalizedString("i18n.signatory.above")
        },
        "imgChevron" : {
          "src" : "disabledown.png"
        },
        "txtAmount1" : {
          "text" : "",
          "placeholder" :kony.i18n.getLocalizedString("i18n.signatory.valueplaceholder"),
          "enable" : false,
          "isVisible" : true
        },
        "txtAmount2" : {
          "text" : "",
          "isVisible" : false
        },
        "lblAmtSeparator" : {
          "isVisible" : false
        },
        "flxCheckbox" : {
          "skin" : "ICSknDisabledValue"
        },
        "flxAmt1" : {
          "isVisible" : true
        },
        "flxAmt2" : {
          "isVisible" : false
        },
        "lblCurrency1" : {
          "text" : this.baseCurrency
        },
        "lblCurrency2" : {
          "text" : this.baseCurrency
        },
        "imgStatus" : {
          "src" : "disableactivebox.png"
        },
        "lblAppRequired" : {
          "text" : kony.i18n.getLocalizedString("i18n.signatory.addcondition"),
          "skin" : "bbSknLblSSP4176A415Px"
        },
        "conditions" : {
          "groupRule" : "[]",
          "groupList" : "[]",
          "upperlimit" : "-1.00",
          "lowerlimit" : "-1.00"
        },
        "imgAction" : {
          "isVisible" : false,
          "src" : "bin.png"
        }
      };
    },
    getMaxLimit : function(){
      var scope = this,value = 0;
      var feature = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      var data = applicationManager.getNavigationManager().getCustomInfo("ORIGINAL_APPROVAL_RESPONSE");
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      if(!scope.isEmptyNullorUndefined(data["common"])){
        data = data["common"].limitTypes;
      }
      else if(!scope.isEmptyNullorUndefined(data["accounts"])){
        data = data["accounts"][0]["limitTypes"];
      }
      else{
        data = [];
      }
      for(var i=0;i<data.length;i++){
        if(data[i].limitTypeId === flow["limitType"]){
          for(var j=0;j<data[i]["actions"].length;j++){
            if(feature["featureName"] === data[i]["actions"][j].featureName){
              value = data[i]["actions"][j].maxAmount;
              break;
            }
          }
          break;
        }
      }
      return value;
    },
    setAccountDetails : function(){
      var scope = this;
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      var feature = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      if(flow["limitType"] === "DAILY_LIMIT")
        this.view.lblTypeValue.text = kony.i18n.getLocalizedString("i18n.Transfers.Daily");
      if(flow["limitType"] === "MAX_TRANSACTION_LIMIT")
        this.view.lblTypeValue.text = kony.i18n.getLocalizedString("kony.mb.user.PerTransaction");
      if(flow["limitType"] === "WEEKLY_LIMIT")
        this.view.lblTypeValue.text = kony.i18n.getLocalizedString("i18n.Transfers.Weekly");
      this.view.lblFeatureValue.text = feature["featureName"] + " - " + feature["actionName"];
      this.view.lblFeatureLabel.text = kony.i18n.getLocalizedString("i18n.approvals.feature");
      this.view.lblTypeLabel.text = kony.i18n.getLocalizedString("i18n.common.Type");
      this.view.lblMaxLimitValue.text = "("+ kony.i18n.getLocalizedString("i18n.approvals.maxlimit") + this.baseCurrency+""+parseInt(scope.getMaxLimit()).toString()+")";
      if(kony.sdk.isNullOrUndefined(feature["isAccountLevel"]) || feature["isAccountLevel"] == "1"){
        this.view.lblActionValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Account");
      } else {
        this.view.lblActionValue.text = kony.i18n.getLocalizedString("i18n.approvals.customer");
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
      if(!scope.isEmptyNullorUndefined(accountDetails.accountName)){
        scope.view.lblAccountNameHeader.text = kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.account");
        scope.view.lblAccountNameValue.text = accountDetails.accountName;
        this.view.lblApprovalMatrixHeader.text = kony.i18n.getLocalizedString("i18n.singatorygrp.accleveledit");
      }
    },
    doLogout: function(contextAction) {
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "AuthenticationMA",moduleName: "AuthUIModule"});
      var context = {
        action: contextAction
      };
      authModule.presentationController.doLogout(context);
    },
    setIdleTimeOut: function() {
      kony.application.registerForIdleTimeout(applicationManager.getConfigurationManager().constants.IDLE_TIMEOUT, this.doLogout.bind(this, "SessionExpired"));
    },
    isEmptyNullorUndefined : function(data){
      if(data === "" || data === null || data ===undefined)
        return true;
      else
        return false;
    },
    getUpdateMatrixServiceRequest : function(){
      var scope = this,data = {};
      var flow = applicationManager.getNavigationManager().getCustomInfo("SELECTED_LIMIT_DETAILS");
      var feature = applicationManager.getNavigationManager().getCustomInfo("SELECTED_FEATURE_DETAILS");
      var accountDetails = applicationManager.getNavigationManager().getCustomInfo("SELECTED_ACCOUNT_DETAILS");
      if(!scope.isEmptyNullorUndefined(accountDetails.accountId)){
        data["accountId"] = accountDetails["accountId"];
      }
      data["cif"] = accountDetails["coreCustomerID"];
      data["contractId"] = accountDetails["contractId"];
      data["limitTypeId"] = flow["limitType"];
      data["actionId"] = feature["actionId"];
      data["isGroupMatrix"] = "1";
      return data;
    },  
  };
});