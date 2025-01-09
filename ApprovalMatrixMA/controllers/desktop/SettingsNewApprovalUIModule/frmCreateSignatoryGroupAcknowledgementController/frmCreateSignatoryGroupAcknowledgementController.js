define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();

  //Type your controller code here 
  return{
    
    preShow : function(){
      var scope = this;
      this.view.btnProceedAddServices.text = "View All Signatory Groups";
      this.view.btnBackConfirmation.text = "Create New Group";
      this.view.btnApplytoApprovalMatrix.text = "Apply To Approval Matrix";
      this.view.lblGroupDescKey.text=kony.i18n.getLocalizedString("i18n.approvals.groupDescription");
      this.view.lblTotalSelectedUsersKey.text=kony.i18n.getLocalizedString("i18n.approvals.totalSelectedUsers");
      this.view.lblCreatedOnKey.text=kony.i18n.getLocalizedString("i18n.AccountsDetails.CreatedonColon");
      this.view.lblCreatedByKey.text=kony.i18n.getLocalizedString("i18n.AccountsDetails.CreatedbyColon");
      this.view.lblCustomerNameKey.text=kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.customerName");
      this.view.lblCustomerIdKey.text=kony.i18n.getLocalizedString("kony.18n.approvalMatrix.lblCustomerID");
      this.view.lblContractKey.text=kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.contract");
      this.view.btnProceedAddServices.toolTip= kony.i18n.getLocalizedString("i18n.konybb.Common.ViewAllUsers");
      this.view.btnBackConfirmation.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.createAnotherUser");
      this.view.btnApplytoApprovalMatrix.toolTip =kony.i18n.getLocalizedString("i18n.userManagement.createAnotherUser");
     // this.view.lblGroupNameValue.text = applicationManager.getConfigurationManager().groupName;
      //this.view.lblGroupDescValue.text = applicationManager.getConfigurationManager().groupDesc;
      //this.view.lblTotalSelectedUsersValue.text = applicationManager.getConfigurationManager().totalSelectedUsers;
      this.setAckData();
      this.view.btnBackConfirmation.onClick = function () {
        scope.navigateToCreateSignatory();
      }.bind(this);
      this.view.btnProceedAddServices.onClick = function () {
        scope.navigateToSignatoryGroups();
      }.bind(this);
      this.view.btnApplytoApprovalMatrix.onClick = function () {
        scope.navigateToApprovalMatrix();
      }.bind(this);
    },
    onBreakpointChange: function(width) {
        this.view.customheadernew.onBreakpointChangeComponent(width);
      },
    postShow : function(){
      this.view.lblGroupNameKey.text=kony.i18n.getLocalizedString("i18n.approvals.groupName");
      this.view.btnProceedAddServices.text = kony.i18n.getLocalizedString("konybb.SignatoryGroups.ViewAllSignatoryGroups");
      this.view.btnBackConfirmation.text = kony.i18n.getLocalizedString("konybb.SignatoryGroup.CreateNewGroup");
      this.view.btnApplytoApprovalMatrix.text=kony.i18n.getLocalizedString("konybb.SignatoryGroup.ApplytoApprovalMatrix");
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
           if (kony.application.getCurrentBreakpoint() <= 1024) {
           this.view.lblContentHeader.left="65dp";
           this.view.btnBackConfirmation.right="3.15%";
           } else if (kony.application.getCurrentBreakpoint() >= 1366) {
           this.view.flxAcknowledgementHeader.right="0dp";
           }
       }
    }, 
    setAckData : function(){
      this.view.lblGroupNameVal.text = applicationManager.getConfigurationManager().groupName;
      this.view.lblGroupDescVal.text = applicationManager.getConfigurationManager().groupDesc;
      this.view.lblTotalSelectedUsersVal.text = applicationManager.getConfigurationManager().totalSelectedUsers;
      this.view.lblCreatedOnVal.text = applicationManager.getConfigurationManager().createdOn;
      this.view.lblCreatedByVal.text = applicationManager.getConfigurationManager().createdBy;
      this.view.lblCustomerNameVal.text = applicationManager.getConfigurationManager().coreCustomerName;
      this.view.lblCustomerIdVal.text = applicationManager.getConfigurationManager().coreCustomerID;
      this.view.lblContractVal.text = applicationManager.getConfigurationManager().contractName;
    },
    
    navigateToCreateSignatory : function(){
      applicationManager.getNavigationManager().navigateTo("frmCreateSignatoryGroup");
    },
    
    navigateToSignatoryGroups : function(){
       var e = {
                    "contractId": applicationManager.getConfigurationManager().contractId,
                    "coreCutomerId": applicationManager.getConfigurationManager().coreCustomerId
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule").presentationController.getAllSignatoryGroups(e);
    },
    navigateToApprovalMatrix : function(){
      var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsNewApprovalUIModule");
                    settingsModule.presentationController.setContractDetailsForApprovalMatrices();
    }


    //Type your controller code here 
  };
});