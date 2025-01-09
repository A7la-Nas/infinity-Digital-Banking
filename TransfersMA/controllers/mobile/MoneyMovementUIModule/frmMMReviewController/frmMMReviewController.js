define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.commonFunctionForgoBack();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.view.btnTransfer.skin="sknBtn0095e4RoundedffffffSSP26px";
    this.view.btnTransfer.setEnabled(true);
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj= moneyMovementPresentationController.getTransObject();
    this.view.txtDescription.onTextChange = this.validateNotes.bind(this);
    this.changeButtonText();
    this.setFromAccountData();
    this.setToAccountData();
    this.setSegmentData();
    this.initActions();
    if(transObj.transactionsNotes)
      this.view.txtDescription.text = transObj.transactionsNotes;
    else
      this.view.txtDescription.text = "";
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow: function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segDetails.onRowClick = function() {
      moneyMovementPresentationController.initializeStateData(true,"frmMMReview");
      moneyMovementPresentationController.commonFunctionForNavigation("frmMMFrequency");
    }
    this.view.flxFromAccount.onTouchEnd = function(){
      moneyMovementPresentationController.initializeStateData(true,"frmMMReview");
      moneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferFromAccount");
    }
    this.view.flxToAccount.onTouchEnd = function(){
      moneyMovementPresentationController.initializeStateData(true,"frmMMReview");
      moneyMovementPresentationController.filterToAccountsByExludingFromAccount();
      moneyMovementPresentationController.commonFunctionForNavigation("frmMMTransferToAccount");
    }
    this.view.segDetails.onRowClick = this.segmentOnROwClick;
    this.view.btnTransfer.onClick = this.continueOnClick;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
  },
  cancelOnClick:function(){
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
  segmentOnROwClick:function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var rowindex = this.view.segDetails.selectedRowIndex[1];
    var selectedRow = this.view.segDetails.data[rowindex];
    if ((selectedRow.property!== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails") && selectedRow.value !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer"))){
    	moneyMovementPresentationController.initializeStateData(true, "frmMMReview");
    }
    else{
      	moneyMovementPresentationController.initializeStateData(false, "");
    }
    moneyMovementPresentationController.reviewRowClick(selectedRow);
  },
  getWidgetDataMap:function(){
    var map = {
      lblTitle:"property",
      lblValue:"value",
      imgArrow:"chevronImg"
    }
    return map;
  },
  setSegmentData: function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var segData = moneyMovementPresentationController.getReviewScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    var countToCheckEnabled=1;
    for (var row in segData){
      if ((segData[row].property!== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails") && segData[row].value !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer")) && !(segData[row].value)) {
        countToCheckEnabled=0;
        break;
      }
    }
    var fromaccountdata= moneyMovementPresentationController.getTransferObjectById();
    var toAccountData = moneyMovementPresentationController.getToAccountData();
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var endDate = forUtility.getDateObjectFromCalendarString(moneyMovementPresentationController.getTransObject().frequencyEndDate, configManager.getCalendarDateFormat());
    var startDate = forUtility.getDateObjectFromCalendarString(moneyMovementPresentationController.getTransObject().frequencyStartDate, configManager.getCalendarDateFormat());
    if (kony.sdk.isNullOrUndefined(fromaccountdata[0].accountID)){
      countToCheckEnabled = 0;
      this.clearFromAccountData();
    }
     if (toAccountData.transactionType !== "P2P" && kony.sdk.isNullOrUndefined(toAccountData.toAccountNumber)) {
      countToCheckEnabled = 0;
      this.clearToAccountData();
    }
    if(fromaccountdata[0].accountID == toAccountData.toAccountNumber){
      countToCheckEnabled=0;
      this.clearToAccountData();
    }
    if(startDate && endDate && startDate>=endDate){
      segData = this.clearEndDate(segData);
      countToCheckEnabled=0;
    }
    if(countToCheckEnabled==0){
      this.view.btnTransfer.skin="sknBtnOnBoardingInactive";
      this.view.btnTransfer.setEnabled(false);
    }
    else{
      this.view.btnTransfer.skin="sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnTransfer.setEnabled(true);
    }
    this.view.segDetails.setData(segData);
  },
  clearEndDate:function(segData){
    for(var i in segData){
      if(segData[i].property == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate")){
        segData[i].value = "";
        break;
      }
    }
    return segData;
  },
  clearToAccountData:function(){
    this.view.lblToAccountValue.text = "";
    this.view.lblToBalanceValue.text = "";
    this.view.lblToAvailableBalance.text = "";
    this.view.lblToAvailableBalance.setVisibility(true);
  },
  clearFromAccountData: function() {
    this.view.lblFromAccountValue.text = "";
    this.view.lblFromBalanceValue.text = "";
    this.view.lblFromavailableBal.text = "";
    this.view.lblFromavailableBal.setVisibility(true);
  },
    validateNotes: function() {
        var expression = /^[ A-Za-z0-9.?+:/()]*$/;
        if (expression.test(this.view.txtDescription.text)) {
        } else {
            this.view.txtDescription.text = this.view.txtDescription.text.replace(/[^a-zA-Z0-9.?:/()+ ]/g, "");
        }
    },
  setFromAccountData:function()
  {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var fromaccountdata= moneyMovementPresentationController.getTransferObjectById("from");
    var configurationManager = applicationManager.getConfigurationManager();
    var name="";
    if (fromaccountdata[0].nickName === null || fromaccountdata[0].nickName === undefined) {
      name = fromaccountdata[0].accountName;
    } else {
      name =fromaccountdata[0].nickName;
    }
    this.view.lblFromAccountValue.text=applicationManager.getPresentationUtility().formatText(name,10,fromaccountdata[0].accountID,4);
    this.view.lblFromBalanceValue.text=fromaccountdata[0].availableBalance;
    this.view.lblFromavailableBal.text=fromaccountdata[0].accountBalanceType + ":";
    
    this.view.flximgFromAccount.isVisible = false;
    this.view.imgFromAccountValue.isVisible = false;

    if(configurationManager.isCombinedUser === "true") {
      try {
        if(fromaccountdata[0]["isBusiness"] === 0) {
          this.view.flximgFromAccount.isVisible = true;
          this.view.imgFromAccountValue.isVisible = true;
          this.view.imgFromAccountValue.src = "personalaccount.png";
        } 
        else if(fromaccountdata[0]["isBusiness"] === 1) {
          this.view.flximgFromAccount.isVisible = true;
          this.view.imgFromAccountValue.isVisible = true;
          this.view.imgFromAccountValue.src = "businessaccount.png";
        }
      }
      catch(e) {
        kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
      }
    }
  },
  setToAccountData:function(){
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var toAccountData = moneyMovementPresentationController.getToAccountData();
    
    var navMan=applicationManager.getNavigationManager();
    var entryPoint=navMan.getEntryPoint("centralmoneymovement");
    this.view.flximgToAccount.isVisible = false;
   	this.view.imgToAccountValue.isVisible = false;
    //if entry point = frmAccountDetails and is to loan acc, then disable edit for To Accounts    
    if(entryPoint==="frmAccountDetails" && toAccountData.toAccountType === "Loan"){
      this.setDisabledToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(false);
      this.view.flxToAccountDisabled.setVisibility(true);
    }else{
      this.setEditableToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(true);
      this.view.flxToAccountDisabled.setVisibility(false);
    }
     if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
      try {
        if(toAccountData.isBusiness === 0 || toAccountData.isBusiness === "0" || toAccountData.isBusinessPayee === "0" || toAccountData.transactionType === "P2P") {
         this.view.flximgToAccount.isVisible = true;
    	 this.view.imgToAccountValue.isVisible = true;
         this.view.imgToAccountValue.src = "personalaccount.png";
        } 
        else if(toAccountData.isBusiness === 1 || toAccountData.isBusiness === "1" || toAccountData.isBusinessPayee === "1") {
          this.view.flximgToAccount.isVisible = true;
   		 this.view.imgToAccountValue.isVisible = true;
          this.view.imgToAccountValue.src = "businessaccount.png";
        }
      }
      catch(e) {
        kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
      }
     }
  },
  setEditableToAccount:function(toAccountData){
    if(toAccountData.transactionType == "P2P"){
      this.view.lblToAccountValue.text = toAccountData.payPersonName;
      this.view.lblToBalanceValue.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalance.setVisibility(false);
    }
    else if(toAccountData.transactionType == "InternalTransfer"){
      this.view.lblToAccountValue.text = toAccountData.toAccountName;
      this.view.lblToBalanceValue.text = toAccountData.availableBalance;
	  this.view.lblToAvailableBalance.text = toAccountData.accountBalanceType + ":";
      this.view.lblToAvailableBalance.setVisibility(true);
    }
    else{
      this.view.lblToAccountValue.text = toAccountData.toAccountName;
      this.view.lblToBalanceValue.text = toAccountData.bankName;
      this.view.lblToAvailableBalance.setVisibility(false);
    }
  },
  setDisabledToAccount:function(toAccountData){
    if(toAccountData.transactionType == "P2P"){
      this.view.lblToAccountValueDisabled.text = toAccountData.payPersonName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.p2pContact;
      this.view.lblToAvailableBalanceDisabled.setVisibility(false);
    }
    else if(toAccountData.transactionType == "InternalTransfer"){
      this.view.lblToAccountValueDisabled.text = toAccountData.toAccountName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.availableBalance;
	  this.view.lblToAvailableBalanceDisabled.text = toAccountData.accountBalanceType;
      this.view.lblToAvailableBalanceDisabled.setVisibility(true);
    }
    else{
      this.view.lblToAccountValueDisabled.text = toAccountData.toAccountName;
      this.view.lblToBalanceValueDisabled.text = toAccountData.bankName;
      this.view.lblToAvailableBalanceDisabled.setVisibility(false);
    }
  },
  continueOnClick: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var description=this.view.txtDescription.text;
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementPresentationController.makeATransfer(description);
  },
  changeButtonText : function() {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transObj= moneyMovementPresentationController.getTransObject();
    if (transObj.isScheduled == "1")
      this.view.btnTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ScheduledTransfer");
    else
      this.view.btnTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.transfer");
  }
});