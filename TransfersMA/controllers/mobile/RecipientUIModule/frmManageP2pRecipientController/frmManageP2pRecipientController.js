define({
	isEditLinkedCustomerAvailable : false,
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
      this.initActions();
      this.setContractDetails();
      this.setDataToForm();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function () {
      var scope = this;
      var deleteRecepient = applicationManager.getConfigurationManager().checkUserPermission("P2P_DELETE_RECEPIENT");
      scope.view.flxEditOptions.isVisible = false;
      if(deleteRecepient){
        this.view.btnDeleteRecipient.isVisible=true;
      }else{
        this.view.btnDeleteRecipient.isVisible=false;
      }
        this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
          	navMan.goBack();
        }
        this.view.customHeader.btnRight.onClick = function() {
          if(scope.isEditLinkedCustomerAvailable){
            scope.view.btnEditLinkedCustomer.setVisibility(true);
            scope.view.lblSeparatorPopupDocuments.setVisibility(true);
          }
          else{
            scope.view.btnEditLinkedCustomer.setVisibility(false);
            scope.view.lblSeparatorPopupDocuments.setVisibility(false);
          }
          scope.view.flxEditOptions.isVisible = true;
        };
        this.view.flxEditOptions.onClick = function(){
          scope.view.flxEditOptions.setVisibility(false);
        };
        this.view.btnEditRecipientDetails.onClick = function(){
          scope.onClickEdit();
        };
        this.view.btnEditLinkedCustomer.onClick = function(){
          scope.view.flxEditOptions.setVisibility(false);
          var navManager=applicationManager.getNavigationManager();
          var payAPersonModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
          navManager.setEntryPoint("contracts",navManager.getCurrentForm());
          payAPersonModule.presentationController.setFlowType("editP2P");
          payAPersonModule.presentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmContracts","appName": "TransfersMA"});
        }
        this.view.btnDeleteRecipient.onClick = function(){
          //kony.ui.Alert("Are You sure do you want to delete this user permanently", confirmDelete, constants.ALERT_TYPE_CONFIRMATION, "Yes", "No", "");
          var basicConfig={
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "yesLabel":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
            "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.deleteRecipient","Do you want to delete the recipient"),
            "alertHandler": scope.confirmDelete
          };
          applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});;
        }
        this.view.btnPayAPerson.onClick = function(){
          var navMan=applicationManager.getNavigationManager();
          var cm=applicationManager.getConfigurationManager();
          if(cm.isFastTransfersFlowEnabled()){
            var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
                navMan.setEntryPoint("makeatransferMoneyModule", "frmManageP2pRecipient");
            moneyMovementPresentationController.haveLimitsBeenFetched = false;
            moneyMovementPresentationController.initializeStateData(false, "");
            moneyMovementPresentationController.setP2PToAccountFromManageFlow();
          }
          else{
            var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
            var data=payeeMod.presentationController.getP2PPayeeDetails();
            navMan.setEntryPoint("payaperson","frmManageP2pRecipient");
            payeeMod.presentationController.getP2pAccounts(data);
          }
        }
    },
  setDataToForm : function(){
    var scope = this;
    var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    var recipientData=payeeMod.presentationController.getP2PPayeeDetails();
    if(recipientData){
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isCombinedUser === "true") {
        scope.view.imgAccountType.src="personalaccount.png";
        scope.view.flxAccountType.isVisible=true;
        scope.view.lblRecipientNameValue.left="10dp";
      } else{
        scope.view.flxAccountType.isVisible=false;
        scope.view.lblRecipientNameValue.left="20dp";         
      }
	scope.view.lblLinkedWithValue.text = recipientData.noOfCustomersLinked +" Customers ID";
    scope.view.lblRecipientNameValue.text=recipientData.name;
    scope.view.lblRecipientContact.text=recipientData.phone;
    scope.view.lblRecipientNickNameValue.text=recipientData.nickName;
   }
  },
  confirmDelete:function(response){
    if(response===true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      p2pMod.presentationController.deleteP2PRecipient();
    } else{
      kony.print("don't delete");
    }
  },
  onClickEdit :function(){
              applicationManager.getPresentationUtility().showLoadingScreen();
         	var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
            var accountDetails=p2pMod.presentationController.getP2PPayeeDetails();
    		p2pMod.presentationController.editBenificiaryNickName(accountDetails);
},
  setContractDetails:function(){
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    p2pMod.presentationController.setFlowType("editP2P");
    p2pMod.presentationController.getContractDetails("P2P_CREATE_RECEPIENT");
  },
  
  bindGenericError : function(errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  editOptionsForIphone: function(){
    var scope = this;
    if (applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet({
        "title": null,
        "message": null,
        "showCompletionCallback": null
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionNickName = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AccInfoEdit.Title"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": scope.onClickEdit
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionLinkedCustomer = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb/billpay.EditLinkedId"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": scope.view.btnEditLinkedCustomer.onClick
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionCancel = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.CANCEL"),
        "style": constants.ACTION_ITEM_STYLE_CANCEL,
        "action": scope.view.flxEditOptions.onClick
      });      
      actionSheetObject.addAction(actionNickName);
      if (scope.isEditLinkedCustomerAvailable)
        actionSheetObject.addAction(actionLinkedCustomer);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }
  }
});