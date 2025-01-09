define({
  keypadString : "",
  confirmTransferInit: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    this.renderTitleBar();
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.btnConfirm.onClick = this.btnConfirmOnClick;
    this.view.txtDescription.onTextChange = this.descTextChange;
    this.setInitialUI();
    this.setFlxData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar: function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if (isIphone) {
      this.view.flxHeader.setVisibility(false);
    }
  },
  flxBackOnClick:function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onCancelClick: function() {
    this.keypadString = "";
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    checkDepositModule.presentationController.cancelDeposit();
  },
  btnConfirmOnClick:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    checkDepositModule.presentationController.createDeposit(this.keypadString);
  },
  setFlxData: function() {
    var navManager = applicationManager.getNavigationManager();
    var depositObject	= navManager.getCustomInfo("frmConfirmTransferCD");
    var flxData	= navManager.getCustomInfo("frmDepositAmountCD");
    var configurationManager = applicationManager.getConfigurationManager();
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
      this.view.flxAccountType.isVisible = false;
    }else{
      if(profileAccess === "both"){
        this.view.flxAccountType.isVisible = true;
        this.view.imgAccountType.src = (flxData.accountInfo.isBusinessAccount === "false") ? "personalaccount.png" : "businessaccount.png";
      }else{
        this.view.flxAccountType.isVisible = false;
      }
    }
      
    this.view.lblAmountValue.text = depositObject.amount;
    this.view.lblToAccountValue.text = depositObject.toAccountName;
    this.view.lblBankName.text = depositObject.toBankName;
    this.view.imgFront.base64 = depositObject.checkImage;
    this.view.imgBack.base64 = depositObject.checkImageBack;
  },
  setInitialUI: function() {
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    var depObj = checkDepositModule.presentationController.getDepositObjInView();
    if(!depObj.transactionsNotes)
    {
      this.view.txtDescription.text = "";
      this.keypadString = "";
    }
    else {
      this.view.txtDescription.text = depObj.notes;
      this.keypadString = depObj.notes;
    }
  },
  descTextChange: function() {
    this.keypadString = this.view.txtDescription.text;
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
    checkDepositModule.presentationController.setNotesToDepositObject(this.keypadString);
  }
});