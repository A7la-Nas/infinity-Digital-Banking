define(["CommonUtilities","OLBConstants"], function(CommonUtilities,OLBConstants){
return{
  scinstance:null,
  base64: null,
  fileNames: [],
  fileContents: [],
  requestPayload: {},
  fileTypes: [],
  existingAttachments: [],
  deletedDocuments: [],
  fileNamePrefix:'Attachment',
  importNativeClasses:null,
  vctrl:null,
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    var optional = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional");
    this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+optional+")";   
    this.view.segAttachmentsList.setData([]);
    this.fileNames=[];
    this.fileContents=[];
    this.fileTypes=[];  
  },
  addComponentforSCA : function()
              {
                if(this.scinstance!=null)
                  return;
                  var currform = kony.application.getCurrentForm();
                this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
                  "height": "100%",
                  "id": "SCAComponent",
                  "isVisible": true,
                  "left": "0dp",
                  "masterType": constants.MASTER_TYPE_USERWIDGET,
                  "isModalContainer": false,
                  "skin": "slFboxmb",
                  "top": "0dp",
                  "width": "100%",
                  "appName": "ResourcesHIDMA",
                  "viewType": "SCAComponent",
                  "shouldGroup": false,
                  "overrides": {
                    "SCAComponent": {
                      "right": "viz.val_cleared",
                      "bottom": "viz.val_cleared",
                      "minWidth": "viz.val_cleared",
                      "minHeight": "viz.val_cleared",
                      "maxWidth": "viz.val_cleared",
                      "maxHeight": "viz.val_cleared",
                      "centerX": "viz.val_cleared",
                      "centerY": "viz.val_cleared"
                    }
                  }
                }, {
                  "paddingInPixel": false,
                  "overrides": {}
                }, {
                  "overrides": {}
                });
                this.scinstance.flowType = "";
                this.scinstance.servicekey = "";
                currform.add(this.scinstance);

              },
              addComponentforSCAUniken : function()
              {
                if(this.scinstance!=null)
                  return;
                  var currform = kony.application.getCurrentForm();
                this.scinstance = new com.temenos.infinity.mb.sca.transactions.uniken.SCAComponent({
                  "height": "100%",
                  "id": "SCAComponent",
                  "isVisible": true,
                  "left": "0dp",
                  "masterType": constants.MASTER_TYPE_USERWIDGET,
                  "isModalContainer": false,
                  "skin": "slFboxmb",
                  "top": "0dp",
                  "width": "100%",
                  "appName": "ResourcesUnikenMA",
                  "viewType": "SCAComponent",
                  "shouldGroup": false,
                  "overrides": {
                    "SCAComponent": {
                      "right": "viz.val_cleared",
                      "bottom": "viz.val_cleared",
                      "minWidth": "viz.val_cleared",
                      "minHeight": "viz.val_cleared",
                      "maxWidth": "viz.val_cleared",
                      "maxHeight": "viz.val_cleared",
                      "centerX": "viz.val_cleared",
                      "centerY": "viz.val_cleared"
                    }
                  }
                }, {
                  "paddingInPixel": false,
                  "overrides": {}
                }, {
                  "overrides": {}
                });
                this.scinstance.flowType = "";
                this.scinstance.servicekey = "";
                currform.add(this.scinstance);

              },
  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  
  preShow: function () {
      if (1 === CommonUtilities.getSCAType()) {
                this.addComponentforSCA();
                this.view.SCAComponent.zIndex = 1;
                this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
                this.view.SCAComponent.onFailureCallback =this.scaFailureCallback;
            }
      else if (2 === CommonUtilities.getSCAType()) {
                this.addComponentforSCAUniken();
               // applicationManager.getPresentationUtility().showLoadingScreen();
                this.view.SCAComponent.zIndex = 1;
                this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
                this.view.SCAComponent.onFailureCallback =this.scaFailureCallback;
            }
     if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    if(kony.theme.getCurrentTheme() == "darkTheme"){
        this.view.imgAdd.src = "add_attachment_dark.png";
    }else{
        this.view.imgAdd.src = "add_attachment.png";
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    if(navMan.getCustomInfo("removeAttachments")){
      this.view.segAttachmentsList.setData([]);
      this.fileNames = [];
      this.fileContents = [];
      this.fileTypes = [];
      this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional")+")";
      navMan.setCustomInfo("removeAttachments", false);
    }
    this.view.btnTransfer.skin="sknBtnOnBoardingInactive";
    this.view.btnTransfer.setEnabled(false);
    this.view.flxMMAmount.setVisibility(false);
    if(this.fileNames.length<5){
      this.view.flxAddIcon.setVisibility(true);
    }
    var userPrefManager = applicationManager.getUserPreferencesManager();
    this.singleCustomerID=userPrefManager.isSingleCustomerProfile;
    this.accessibleCustomerIds =userPrefManager.accessibleCustomerIds;
    this.primaryCustomerId = userPrefManager.primaryCustomerId;
    this.isIconVisible = false;
    this.setIconVisibility();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.getReviewScreenData();
    this.resetWidgetVisibility();
  },
  scaSuccessCallback : function(response){
    var navManager = applicationManager.getNavigationManager();
    var resp = navManager.getCustomInfo("frmMFAValidation");
    response.buttonIdentifier =resp.response.buttonIdentifier;
    applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
  },

  scaFailureCallback : function(response){
    var scopeObj =this;
    scopeObj.setErrorMessageAndLogout(response);
  },
  setErrorMessageAndLogout: function (response){
    if (response.hasOwnProperty("isLogoutUser") && response.isLogoutUser) {
      let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
      loginData = loginData ? loginData : {};
      loginData.toastMessage = response.errorMessage;
      applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
      const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
      authMod.presentationController.onLogout();
    } else {
      applicationManager.getPresentationUtility().MFA.onMFAError(response);
    }
  },
  proceedWithPreshow: function(segData){
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transMod.getTransObject();
    if(!kony.sdk.isNullOrUndefined(this.singleCustomerID) && this.singleCustomerID){
      this.view.imgPersonal.setVisibility(false);
      this.view.imgIcon.setVisibility(false);
    }
    else{
       if(!kony.sdk.isNullOrUndefined(this.isIconVisible) && this.isIconVisible){
         var navMan=applicationManager.getNavigationManager();
        var iconMappingData=[];
        var fromIconsrc={};
        this.view.imgPersonal.setVisibility(true);
        var arr = this.getFromAndToAccountIcons(transObj);
        this.view.imgPersonal.src = arr[0];
        fromIconsrc={"fromIconsrc":arr[0]};
        iconMappingData.push(fromIconsrc);
        if(transObj.transactionType.toLowerCase().includes("internaltransfer")){
          var toIconsrc={};
          this.view.imgIcon.src = arr[1];
          this.view.imgIcon.setVisibility(true);
          toIconsrc={"toIconsrc":arr[1]};
          iconMappingData.push(toIconsrc);
        }
        else{
          this.view.imgIcon.setVisibility(false);
        }
         navMan.setCustomInfo("iconMappingData",iconMappingData)
      }
      else{
        this.view.imgPersonal.setVisibility(false);
        this.view.imgIcon.setVisibility(false);
      }
    }
    transObj.validate = true;
    if (transObj['toAccountType'] === "CreditCard") {
      this.afterValidateTransaction(segData);
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    transMod.validateATransfer(segData);
  },
  
  setIconVisibility: function(){
    this.accessibleCustomerIds.forEach((item,index)=>{
        if(index!==0){
         if(this.accessibleCustomerIds[0].type!==item.type){
           this.isIconVisible=true;
         }
       }
      });
  },
  
  getFromAndToAccountIcons:function(transObj){
    var fromIcon = "businessaccount.png", toIcon = "businessaccount.png";
    for(var i =0;i<this.accessibleCustomerIds.length;i++){
      if(transObj.fromAccountMembershipId === this.accessibleCustomerIds[i].id){
        if(this.accessibleCustomerIds[i].type === "personal"){
          fromIcon = "personalaccount.png";
        }
      }
      if(transObj.toAccountMembershipId === this.accessibleCustomerIds[i].id ){
        if(this.accessibleCustomerIds[i].type === "personal"){
          toIcon = "personalaccount.png";
        }
      }
    }
    return [fromIcon,toIcon];
  },
  
  afterValidateTransaction:function(segData){
    this.view.flxMMAmount.setVisibility(true);
    this.view.btnTransfer.skin="sknBtn0095e4RoundedffffffSSP26px";
    this.view.btnTransfer.setEnabled(true);
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transMod.getTransObject();
    this.changeButtonText();
    this.setFromAccountData();
    this.setToAccountData();
    this.setAmountData();
    this.setSegmentData(segData);
    this.initActions();
   
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);

    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow: function(){
    this.view.flxAddIcon.onClick = this.showFileSelectionOption;
    this.hideFileSelectionOption();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.btnPhoto.onClick = this.fileSelectionFromGallery;
    this.view.btnDocument.onClick = this.selectDocuments;
    this.view.btnClose.onClick = this.hideFileSelectionOption;
    this.view.Camera.onCapture = this.openCamera;
    this.view.lblAttachmentError.text = "";
    /*this.view.lblTitle.text = "";
    this.view.flxAttachmentsList.setVisibility(true);
    var optional = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional");
    this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+optional+")";   
    this.view.segAttachmentsList.setData([]);
    this.fileNames=[];
    this.fileContents=[];
    this.fileTypes=[];      
    */
    this.view.btnTransfer.onClick = this.continueOnClick;
  },
  initActions: function () {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segDetails.onRowClick = function() {
      transMod.initializeStateData(true,"frmEuropeVerifyTransferDetails");
      transMod.commonFunctionForNavigation("frmEuropeFrequency");
    }
    this.view.flxFromAccount.onTouchEnd = function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("europeTransferFlow", "frmEuropeVerifyTransferDetails");
      transMod.initializeStateData(true,"frmEuropeVerifyTransferDetails");
      transMod.commonFunctionForNavigation("frmEuropeTransferFromAccount");
    }
    this.view.flxToAccount.onTouchEnd = function(){
      transMod.initializeStateData(true,"frmEuropeVerifyTransferDetails");
      if (transMod.europeFlowType === "INTERNAL") {
        transMod.filterToAccountsByExludingFromAccount();
        transMod.commonFunctionForNavigation("frmEuropeTransferToAccount");
      }
      else {
        transMod.commonFunctionForNavigation("frmEuropeTransferToAccountSM");
      }
    }
    this.view.flxAmount.onTouchEnd = function(){
      var transactionObject = transMod.getTransObject();
      if (transactionObject.toAccountType === "CreditCard") {
        transMod.initializeStateData(false, "");
        var formname = "frmEuropeCreditCardDetails";
        var index = navMan.getFormIndex(formname);
        var stackLength = navMan.stack.length;
        if (index === null) navMan.setFormIndex(formname, stackLength - 1);
        else {
          for (var i = stackLength - 1; i > index; i--) {
            navMan.removeFormIndex(navMan.stack[i]);
            navMan.stack.pop();
          }   
        }
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("isScheduled", "0");
        transactionManager.setTransactionAttribute("amount", null);
        transactionManager.setTransactionAttribute("reference", null);
        transactionManager.setTransactionAttribute("transactionsNotes", null);
        transMod.commonFunctionForNavigation("frmEuropeCreditCardDetails");
      }
      else {
        transMod.initializeStateData(true,"frmEuropeVerifyTransferDetails");
        transMod.commonFunctionForNavigation("frmEuropeTransferAmount");
      }  
    }
    this.view.segDetails.onRowClick = this.segmentOnROwClick;
    this.view.btnTransfer.onClick = this.continueOnClick;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
  },
  cancelOnClick:function(){
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },
  segmentOnROwClick:function(){
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var rowindex = this.view.segDetails.selectedRowIndex[1];
    var selectedRow = this.view.segDetails.data[rowindex];
    if ((selectedRow.property!== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails") && selectedRow.value !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer"))){
    	transMod.initializeStateData(false, "frmEuropeVerifyTransferDetails");
    }
    else{
      transMod.initializeStateData(false, "");
    }
    transMod.reviewRowClick(selectedRow);
  },

  getWidgetDataMap:function(){
    var map = {
      lblTitle:"property",
      lblValue:"value",
      imgArrow:"chevronImg"
    }
    return map;
  },
  
  setSegmentData: function(segData){
    // var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    //var segData = transMod.getReviewScreenData();
    // if (segData !== null) {
      this.bindDataToSegment(segData);
    // }
  },

  bindDataToSegment : function(segData) {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    var countToCheckEnabled = 1;
    for (var row in segData){
      if(segData[row].property === applicationManager.getPresentationUtility().getStringFromi18n("i18n.transfers.lblendingonPayABill")) {
        if(segData[row].value === "" || segData[row].value === null || segData[row].value === undefined){
          segData[row].value = "mm/dd/yyyy";
        }
      }
      if ((segData[row].property !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails") && segData[row].value !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer")) && (segData[row].property !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.PaymentReference")) && (segData[row].property !== applicationManager.getPresentationUtility().getStringFromi18n("i18n.transfers.lblendingonPayABill"))) {
               if (!(segData[row].value)) {
                countToCheckEnabled = 0;
                break;
               }
          } 
    }
    var fromaccountdata= transMod.getTransferObjectById();
    var toAccountData = transMod.getToAccountData();
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    if(transMod.getTransObject().frequencyEndDate !== null) {
    var endDate = forUtility.getDateObjectFromCalendarString(transMod.getTransObject().frequencyEndDate, configManager.getCalendarDateFormat());
    }
    var startDate = forUtility.getDateObjectFromCalendarString(transMod.getTransObject().frequencyStartDate, configManager.getCalendarDateFormat());
    if (kony.sdk.isNullOrUndefined(fromaccountdata[0].accountID)){
      countToCheckEnabled = 0;
      this.clearFromAccountData();
    }
    if (kony.sdk.isNullOrUndefined(toAccountData.toAccountNumber) && kony.sdk.isNullOrUndefined(toAccountData.IBAN)) {
      countToCheckEnabled = 0;
      this.clearToAccountData();
    }
    /*if(fromaccountdata[0].accountID == toAccountData.toAccountNumber){
      countToCheckEnabled=0;
      this.clearToAccountData();
    }*/
    if(transMod.getTransObject().frequencyEndDate !== null) {
    if(startDate && endDate && startDate >= endDate){
      segData = this.clearEndDate(segData);
      countToCheckEnabled=0;
     }
    }
    if(countToCheckEnabled==0){
      this.view.btnTransfer.skin="sknBtnOnBoardingInactive";
      this.view.btnTransfer.setEnabled(false);
    }
    else{
      this.view.btnTransfer.skin="sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnTransfer.setEnabled(true);
    }
    
    for (var row in segData){
      if(segData[row].property === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.PaymentReference")){
       segData[row].value = (!kony.sdk.isNullOrUndefined(segData[row].value) && segData[row].value.length>20) ? segData[row].value.substring(0,21)+"..." : segData[row].value;
      	break; 
      }
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
  setFromAccountData:function()
  {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var fromaccountdata = transMod.getTransferObjectById("from");
    var name="";
    //if (fromaccountdata[0].nickName === null || fromaccountdata[0].nickName === undefined) {
      name = fromaccountdata[0].accountName;
    /*} else {
      name =fromaccountdata[0].nickName;
    }*/
    this.view.lblFromAccountValue.text=applicationManager.getPresentationUtility().formatText(name,10,fromaccountdata[0].accountID,4);
    this.view.lblFromBalanceValue.text=fromaccountdata[0].availableBalance;
    this.view.lblFromavailableBal.text=fromaccountdata[0].accountBalanceType + ":";
//     var config = applicationManager.getConfigurationManager();
//     if (config.awaitingFundsOverride) {
//       this.view.imgWarning.isVisible = true;
//       this.view.lblFromavailableBal.skin = "sknlblFEA90ESSP26px";
//       this.view.lblFromBalanceValue.skin = "sknlblFEA90ESSP26px";
//       this.view.flxInsufficientFunds.isVisible = true;
//     }
//     else {
      this.view.imgWarning.isVisible = false;
      this.view.lblFromavailableBal.skin = "sknlbl727272SSP93pr";
      this.view.lblFromBalanceValue.skin = "sknlbl727272SSP93pr";
      this.view.flxInsufficientFunds.isVisible = false;
//     }
  },
  setToAccountData:function(){
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan=applicationManager.getNavigationManager();
    var entryPoint=navMan.getEntryPoint("europeTransferFlow");
    var toAccountData = (entryPoint === "frmTransferActivitiesTransfersEurope" || entryPoint === "frmTransferActivitiesRecurringEurope" ) ? transMod.getToAccountDataEditFlow() : transMod.getToAccountData();
    if(entryPoint==="frmAccountDetails" && toAccountData.toAccountType === "Loan") {
      this.setUIForCreateFlow();
      this.setDisabledToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(false);
      this.view.flxToAccountDisabled.setVisibility(true);
    }
    else if (entryPoint === "frmTransferActivitiesTransfersEurope" || entryPoint === "frmTransferActivitiesRecurringEurope") {
      this.setUIForEditFlow();
      this.view.lblToAccountValueEdit.text = toAccountData.toProcessedName || toAccountData.toAccountName;
    }
    else {
      this.setUIForCreateFlow();
      this.setEditableToAccount(toAccountData);
      this.view.flxToAccount.setVisibility(true);
      this.view.flxToAccountDisabled.setVisibility(false);
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
   setAmountData:function(){
    var amountValue = "";
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
     var transObj= transMod.getTransObject();
     var navMan = applicationManager.getNavigationManager();
     var entryPoint = navMan.getEntryPoint("selectedcurrency");
     var transactionManager = applicationManager.getTransactionManager();
     if (transMod.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") || transMod.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
       if(entryPoint !== "frmEuropeSelectCurrency") {
         if (transObj.transactionCurrency !== transObj.fromAccountCurrency) {
         transactionManager.setTransactionAttribute("transactionCurrency", transObj.fromAccountCurrency);
         amountValue = transMod.formatAmountAndAppendCurrencyEurope(transObj.amount, transObj.transactionCurrency);
         } else {
         amountValue = transMod.formatAmountAndAppendCurrencyEurope(transObj.amount, transObj.fromAccountCurrency); }
       } else {
         if(transObj.transactionCurrency !== transObj.selectedCurrency)
           transactionManager.setTransactionAttribute("transactionCurrency", transObj.selectedCurrency);
           amountValue = transMod.formatAmountAndAppendCurrencyEurope(transObj.amount, transObj.transactionCurrency);
       }  
     } else {
        amountValue = transMod.formatAmountAndAppendCurrencyEurope(transObj.amount, transObj.transactionCurrency);
     }
    /*if (transMod.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || transMod.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")){
      if (transObj.transactionCurrency !== transObj.fromAccountCurrency) {
        amountValue = null;
      }
    } */   
    this.view.lblAmountValue.text = amountValue;
     //if not international payment, don't show the exchange rate
    if(transObj.exchangeRate && transObj.fromAccountCurrency !== transObj.transactionCurrency){
      this.view.lblAmountValue.top ="15dp";
       this.view.flxAmountDetails.setVisibility(true);
      if(transObj.quoteCurrency !== transObj.transactionCurrency){
      this.view.lblExchangeRateValue.text = transMod.formatAmountAndAppendCurrencyEurope(1,transObj.quoteCurrency)  + ' = ' + transMod.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate,transObj.transactionCurrency);
      } else {
        this.view.lblExchangeRateValue.text = transMod.formatAmountAndAppendCurrencyEurope(1,transObj.quoteCurrency)  + ' = ' + transMod.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate,transObj.fromAccountCurrency);
      } 
    } else {
      this.view.lblAmountValue.top ="25dp";
      this.view.flxAmountDetails.setVisibility(false);
    }
   },
  continueOnClick: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    this.constructFileInput();
    transMod.checkForOverrides(this.requestPayload);
    this.view.flxAttachmentsList.setVisibility(false);
    this.view.segAttachmentsList.setData([]);
    this.existingAttachments = [];
    this.fileNames = [];
    this.fileContents = [];
    this.fileTypes = [];
    var optional = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional");
    this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+optional+")"; 
   
  },
  changeButtonText : function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transObj= transMod.getTransObject();
    if (transObj.isScheduled === "1")
      this.view.btnTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ScheduledTransfer");
    else if(transMod.getEuropeFlowType() === "INTERNAL"){
      this.view.btnTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Confirm");
    }else{
      this.view.btnTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.continue");
    }
  },
  
  setUIForEditFlow: function(){
    this.view.flxToAccountEditFlow.isVisible = true;
    this.view.flxToAccount.isVisible = false;
    this.view.flxToAccountDisabled.isVisible = false;
    this.view.flxAmount.top = "74dp";
    this.view.flxToAndFrom.height = "146dp";
    this.view.flxAttachment.setVisibility(true);
    this.preFillAttachmentsDataToSegment();
  },

  setUIForCreateFlow: function(){
     this.view.flxToAccountEditFlow.isVisible = false;
    this.view.flxToAccount.isVisible = true;
    this.view.flxToAccountDisabled.isVisible = false;
    this.view.flxAmount.top = "146dp";
    this.view.flxToAndFrom.height = "220dp";
    this.view.flxAttachment.setVisibility(true);
    this.existingAttachments = [];
  },

  preFillAttachmentsDataToSegment: function() {
    this.view.flxAttachmentsList.setVisibility(true);
    var attachmentsData = [];
    this.deletedDocuments = [];
    this.fileNames = [];
    this.fileTypes = [];
    this.fileContents = [];
    var navMan = applicationManager.getNavigationManager();
    this.existingAttachments = navMan.getCustomInfo("existingAttachments");
    if(kony.sdk.isNullOrUndefined(this.existingAttachments)){
      this.existingAttachments =[];
    }
    for (var i = 0; this.existingAttachments && i < this.existingAttachments.length; i++) {
        attachmentsData[i] = {};
        attachmentsData[i].filename = this.existingAttachments[i].fileName;
        attachmentsData[i].fileID = this.existingAttachments[i].fileID;
        this.fileNames.push(this.existingAttachments[i].fileName);
        attachmentsData[i]["imgRemoveAttachment"] = {
            "src": "remove_attachment.png"
        };
    }
    this.view.segAttachmentsList.widgetDataMap = {
        "lblAttachment": "filename",
        "imgRemoveAttachment": "imgRemoveAttachment",
        "lblAttachedDocumentID":"fileID"
    };
    if (this.fileNames.length === 0){
      this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional")+")";
    }
      this.view.segAttachmentsList.setData(attachmentsData);
    this.view.forceLayout();
},

  fileSelectionFromGallery: function () {
    var queryContext = {
      mimetype:"image/*"
    };
    try {
      kony.phone.openMediaGallery(this.fileSelectionCallback.bind(this),queryContext);
    } catch (error) {
      this.handleError(error);
    }
  },
  
  selectDocuments: function() {
    var scope=this;
    if (kony.os.deviceInfo().name === "iPhone") {
      scope.uploadIphoneDocument();
    }else{
      var queryContext = {
        mimetype: "application/*"
      };
      try {
        kony.phone.openMediaGallery(this.fileSelectionCallback.bind(this), queryContext);
      } catch (error) {
        this.handleError(error);
      }
    }
  },

  uploadIphoneDocument: function() {
    var scope=this;
    kony.runOnMainThread(mainthread, []);
    function mainthread () {
      if(scope.importNativeClasses===null){
        scope.importNativeClasses=scope.initializeNativeImport();
      }
      scope.importNativeClasses.UIApplicationTransfer.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(scope.importNativeClasses.pvTransfer, true, {});
    }
  },

  initializeNativeImport: function(){
    var scope=this;
    var nativeClasses={};
    nativeClasses.UIDocumentPickerViewControllerTransfer = objc.import("UIDocumentPickerViewController");
    nativeClasses.UIViewControllerTransfer = objc.import("UIViewController");
    nativeClasses.UIApplicationTransfer = objc.import("UIApplication");
    nativeClasses.NSDataTransfer  = objc.import("NSData"); 
    nativeClasses.ViewControllerTransfer = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIDocumentPickerDelegate'], {
      documentPickerDidPickDocumentsAtURLs: function(controller, urls) {
        kony.print("Callback called");
        if (urls.length > 0) {
          var nsurl = urls[0];
          var fileType = nsurl.pathExtension;
          var fileName = scope.fileNamePrefix+(scope.fileNames.length+1)+"."+fileType;
          var fileData = nativeClasses.NSDataTransfer.dataWithContentsOfURL(nsurl);
          var base64 = fileData.base64Encoding();
          var fileObject = {};
          fileObject.content = base64;
          fileObject.fileName = fileName;
          fileObject.type = fileType;
          fileObject.size = (base64.length * 0.75) / 1024;
          scope.uploadNativeFile(fileObject);
        }
      },
    });
    if(this.vctrl === null){
      this.vctrl = nativeClasses.ViewControllerTransfer.alloc().jsinit();
    }
    nativeClasses.pvTransfer = nativeClasses.UIDocumentPickerViewControllerTransfer.alloc().initWithDocumentTypesInMode(["com.adobe.pdf"], UIDocumentPickerModeImport);
    nativeClasses.pvTransfer.delegate = this.vctrl;
    kony.print("end");
    return nativeClasses;
  },

  uploadNativeFile: function (documentObject) {
    this.hideFileSelectionOption();
    var fileMimeType = documentObject.type;
    var fileName = documentObject.fileName;
    var fileSize = documentObject.size;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize = configManager.maxFileSizeAllowed;
    try {
      var selectedFile = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg1");
      var typeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg2");
      var sizeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentSizeErrorMsg") + maxFileSize + "mb.";
      if (fileMimeType !== "jpeg" && fileMimeType !== "pdf") {
        this.view.lblAttachmentError.text = selectedFile + " " + fileName + " " + typeError;
        this.view.flxAttachmentsError.setVisibility(true);
        this.view.lblAttachmentError.setVisibility(true);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      else {
        if (documentObject.content !== null) {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var base64 = documentObject.content;
          if (base64 !== null && base64 !== undefined && base64 !== "") {
            if (fileSize > maxFileSize * 1000) {
              this.view.lblAttachmentError.text = selectedFile + " " + fileName + " " + sizeError;
              this.view.flxAttachmentsError.setVisibility(true);
              this.view.lblAttachmentError.setVisibility(true);
              applicationManager.getPresentationUtility().dismissLoadingScreen();
            } else {
              this.fileNames.push(fileName);
              var navMan = applicationManager.getNavigationManager();
              navMan.setCustomInfo("uploadedAttachments", this.fileNames);
              this.fileContents.push(base64);
              this.fileTypes.push(fileMimeType);
              this.setAttachmentsDataToSegment();
            }
          }
        }
      }
    }catch (errMesage) {
     kony.print(errMesage.message);
      kony.print(errMesage);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  fileSelectionCallback: function (rawBytes, permissionStatus, mimeType) {
    this.hideFileSelectionOption();
        if (kony.os.deviceInfo().name === "iPhone") {
            mimeType = "image/jpeg";
        }
    var fileMimeType = mimeType.substring(mimeType.lastIndexOf("/")+1);
    var fileName = this.fileNamePrefix+(this.fileNames.length+1)+"."+fileMimeType;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize =  configManager.maxFileSizeAllowed;
    var selectedFile = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg1");
    var typeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg2");
    var sizeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentSizeErrorMsg")+maxFileSize+"mb.";    
    if(mimeType !== "image/jpeg" && mimeType !== "application/pdf")
    {
      this.view.lblAttachmentError.text = selectedFile+" "+fileName+" "+typeError;
      this.view.flxAttachmentsError.setVisibility(true);
      this.view.lblAttachmentError.setVisibility(true);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }else{
      if (rawBytes !== null) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var base64 = kony.convertToBase64(rawBytes);
        if ( base64 !== null && base64 !== undefined && base64 !== "") {
          var fileSize = ((base64.length*0.75 )/1024);
          if(fileSize > (maxFileSize*1000)){
            this.view.lblAttachmentError.text = selectedFile+" "+fileName+" "+sizeError;
            this.view.flxAttachmentsError.setVisibility(true);
            this.view.lblAttachmentError.setVisibility(true);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          }else {
            this.fileNames.push(fileName);
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("uploadedAttachments", this.fileNames);
            this.fileContents.push(base64);
            this.fileTypes.push(fileMimeType);
            this.setAttachmentsDataToSegment();
          }
        } 
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  openCamera: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.hideFileSelectionOption();
    var rawBytes = this.view.Camera.rawBytes;
    var configManager = applicationManager.getConfigurationManager();
    var maxFileSize =  configManager.maxFileSizeAllowed;
    var fileType = "jpeg";
    if (rawBytes) {
      var imgObject=kony.image.createImage(rawBytes);
      var base64 = "";
      var fileName = this.fileNamePrefix+(this.fileNames.length+1)+".jpeg";
      var fileSize = "";
      base64 = kony.convertToBase64(rawBytes);
      fileSize=((base64.length*0.75 )/1024);
      // for(var scaleLabel=1;scaleLabel>0;){
      //   var rawBytesTemp = rawBytes;
      //   imgObject=kony.image.createImage(rawBytesTemp);
      //   imgObject.scale(scaleLabel);
      //   var tempRawBytes= imgObject.getImageAsRawBytes();
      //   base64 = kony.convertToBase64(tempRawBytes);
      //   fileSize=((base64.length*0.75 )/1024);
      //   if(fileSize<=maxFileSize*1000){
      //     break;
      //   }
      //  scaleLabel= scaleLabel-0.25;
      // }
      if(fileSize > maxFileSize*1000){
        var scaleLabel= (maxFileSize*1000)/(fileSize+1);
        imgObject.scale(scaleLabel);
        var tempRawBytes= imgObject.getImageAsRawBytes();
        base64 = kony.convertToBase64(tempRawBytes);
      }
        this.fileContents.push(base64);
        this.fileNames.push(fileName);
        this.fileTypes.push(fileType);
        this.setAttachmentsDataToSegment();

        // var selectedFile = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentTypeErrorMsg1");
        // var sizeError = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentSizeErrorMsg")+maxFileSize+"mb.";
        // this.view.lblAttachmentError.text = selectedFile+" "+fileName+" "+sizeError;
        // this.view.flxAttachmentsError.setVisibility(true);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  setAttachmentsDataToSegment: function(){
    this.view.flxAttachmentsList.setVisibility(true);
    var configManager = applicationManager.getConfigurationManager();
    var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
    var attachmentsData = [];
    for (var i = 0; i < this.fileNames.length; i++) {
      attachmentsData[i] = {};
      attachmentsData[i].filename = this.fileNames[i];
      if(this.existingAttachments[i] && this.existingAttachments[i].fileID && (this.existingAttachments[i].fileName == this.fileNames[i]))
      {
          attachmentsData[i].fileID = this.existingAttachments[i].fileID;
      }
      attachmentsData[i]["imgRemoveAttachment"] = {
        "src": "remove_attachment.png"
      };
    }
    this.view.segAttachmentsList.widgetDataMap = {
      "lblAttachment": "filename",
      "imgRemoveAttachment": "imgRemoveAttachment",
      "lblAttachedDocumentID": "fileID"
    };
    this.view.segAttachmentsList.setData(attachmentsData);
    var configManager = applicationManager.getConfigurationManager();
    var maxAttachmentsAllowed =  configManager.maxAttachmentsAllowed;
    this.view.flxAttachmentsList.setVisibility(true);
    
    if (this.fileNames.length === 0){
      this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.AttachmentsOptional")+")";
    this.view.flxAttachmentsList.setVisibility(false);
    }
   if (this.fileNames.length >= maxAttachmentsAllowed) {
      this.view.flxAddIcon.setVisibility(false);
      this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
     applicationManager.getPresentationUtility().dismissLoadingScreen();
    } else{
      this.view.flxAddIcon.setVisibility(true);
      this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Attachments")+" ("+this.fileNames.length+"/"+maxAttachmentsAllowed+")";
    }
    this.hideFileSelectionOption();
    this.constructFileInput();
    this.view.lblAttachmentError.text = "";
    this.view.lblAttachmentError.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  showFileSelectionOption: function () {
    this.view.flxActions.setVisibility(true);
  },

  hideFileSelectionOption: function () {
    this.view.flxActions.setVisibility(false);
  },
  
  removeAttachments: function(file){
    for (var i = 0; i < this.fileNames.length; i++) {
      if (this.fileNames[i] === file.filename) {
        this.fileNames.splice(i, 1);
        if(file.fileID){
          this.existingAttachments.splice(i, 1);
          this.deletedDocuments.push(file.fileID);
        }
        else{
          this.fileContents.splice(i, 1);
          this.fileTypes.splice(i, 1);
        }
        break;
      }
    }
    this.constructFileInput();
    this.setAttachmentsDataToSegment();
  },
  
  constructFileInput: function(){
    var uploadattachments = [];
    for(var i=0;i< this.fileTypes.length; i++){
      var fileInputs = "";
      var j = i + this.existingAttachments.length;
      fileInputs = this.fileNames[j]+'-'+this.fileTypes[i]+'-'+this.fileContents[i];
      uploadattachments.push(fileInputs);
    }
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("deletedDocuments", this.deletedDocuments);
    this.requestPayload = uploadattachments.toString();
  },
  
  handleError: function(error){
    this.view.lblAttachmentError.text = error;
    this.view.flxAttachmentsError.setVisibility(true);
    this.view.lblAttachmentError.setVisibility(true);
  },
  SCAComponentCall: function (response) {
    var scopeObj = this;
    if (CommonUtilities.getSCAType() == 1 || CommonUtilities.getSCAType() == 2) {
      try {
        scopeObj.view.SCAComponent.setVisibility(true);
        scopeObj.view.SCAComponent.setContext(response);
      } catch (e) {
        this.bindGenericError(e);
      }
    }
    else
      scopeObj.view.SCAComponent.setVisibility(false);
  },

  resetWidgetVisibility: function(){
    this.view.flxConfirmationPopUp.setVisibility(false);
    this.view.flxValidationPopup.setVisibility(false);
    this.view.flxActions.setVisibility(false);
    this.view.flxPopup.setVisibility(false);
    if (1 === CommonUtilities.getSCAType() || 2 === CommonUtilities.getSCAType())
      this.view.SCAComponent.setVisibility(false);
    this.view.flxToAccountEditFlow.setVisibility(false);
  },
  
  bindGenericError: function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    var errorObject = {};
    if (err.serverErrorRes.errorDetails) {
      errorObject.messageDetails = err.serverErrorRes.errorDetails;
    } else {
      var formattedResponse = [];
      var errMsg = {};
      errMsg.message = err.errorMessage;
      errMsg.imgIcon = " ";
      formattedResponse.push(errMsg);
      errorObject.messageDetails = JSON.stringify(formattedResponse);
    }
    var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
    errorObject.formattedFailedText = formattedText;
    errorObject.isSuccess = false;
    this.view.CancelTransactionPopup.setContext(errorObject);
    this.view.flxValidationPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxValidationPopup.setVisibility(false);
    };
  }
}
});
