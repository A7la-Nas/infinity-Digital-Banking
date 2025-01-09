define(['./MakeATransferStore','./MakeATransferBusinessController'], function(MakeATransferStore, BusinessController) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.businessController = new BusinessController();
      this.controllerScope = this;
      MakeATransferStore.subscribe(this.render.bind(this));
      this.store = MakeATransferStore;
      this.businessController.store = this.store;
      this.context = {};
      this.collectionObj = MakeATransferStore.getState();
      this.stack = [];
      this.fromAccounts =[];
      this.toAccounts=[];
      this.headerTitleStack = [];
      this.segFromAccountsData ="";
      this.toAccSegmentData ="";
      this.filterFromAccounts = "Loan,CreditCard" ;
      this.filterType = "accountType";
      this.fileNamePrefix = 'Attachment';
      this.fileNames = [];
      this.fileContents = [];
      this.fileTypes = [];
      this.existingAttachments = [];
      this.fileSizeError = "";
      this.fileTypeError = "";
      this.fileSize = "";
      this.searchApplied = false;
      this.currentBankDate = "";
      this.flxname = "";
     this.lastScreen ="";
      this.highlightedDate = "";
      this.dateFlag = 0;
      this.keypadString = '0.00';
      this.isPeriodUsed = false;
      this.purposeCodesUpdated = false;
      this.clearingIdentifierCodesUpdated = false;
      this.bankCountriesUpdated = false;
      this.currencyFlowCheck="";
      this.selectedCurr = "";
      this.amountSelectedFlowType = "";
      this.isToAccountEdit = "false";
      this.fromAccountEdit= "false";
      this.validAddress = "";
      this.sendonDate="";
      this.Icons = {
        "CITI_BANK_IMAGE" : "citi.png",
        "CHASE_BANK_IMAGE" :"chase.png",
        "BOA_BANK_IMAGE" : "boa.png",
        "HDFC_BANK_IMAGE" : "business.png",
        "INFINITY_BANK_IMAGE" : "business.png",
        "EXTERNAL_BANK_IMAGE" : "external.png"        
      };
      this.setFeesPaidSelected="";
      this.disableOptions = "";
      this.selectFeesPaidByValue = "";
      this.selectedPaymentMethod = "SEPA"; //temp contxt
      this.isBusinessAccountListValue ="";
      this.expectedFileFormat ={"jpeg":{
        type:"image/jpeg",imgSrc:"jpeg.png"},
                                "pdf":{type:"application/pdf",imgSrc:"pdf.png"}
                               };
      this.iPhoneFileExtension ="com.adobe.pdf";
      this.importNativeClasses = null;
      this.vctrl = null;
      this.isIBANValid = "";
      this.setPaymentMethodValue = "";
      this.isPaymentMethodSelected = "";
      this.selectPaymentMethod = "";
      this.payeeFlow = "";
      this.keypadStringAccountNumber = "";
      this.skins={
        "sknHeaderBg" : "sknFlx0095e4",
        "sknCancelBtn": "ICSKnBtnffffff15px",
        "sknDescriptionBg":"sknFlxffffff",
        "sknHeaderLbl":"ICSknLblfffffSSPSemiBold76px",
        "sknDescriptionLbl":"ICSknLbl727272SSPReg34px",
        "sknDescriptionSeparator":"sknFlxSeparatora6a6a6",
        "errorValidationSkn":"ICSknLblEE000534px",
        "accNumInputLineSkin":"sknflxBorderf1f1f1",
        "sknEnableContexualBtn":"CopyICSknBtn0b3caed9e44cb4c",
        "accNumInputFieldSkin":"ICSknLbl94949487px",
        "textBoxNormalSkin":"ICSknTxtE3E3E31px34px",
        "sknInputBoxBorder":"ICSknTxt003E751px",
        "textBoxErrorSkin":"ICSknTxtF54B5EBorder",
        "reEnterAccNumInputFieldSkin":"ICSknLbl42424255pxmb"
      };
      this.flxNameAccountNoScreen = "";
      this.isAccountNumberMasked = false;
      this.initialAccountNumber = "";
      this.invokeRender = true;
      this.ContactNumberkeypadString = "";
      this.isRepeatFlow = false;
      this.isEditFlow = false;
      this.isToAccountEditable = true;
	  this.dateFormat = "dd/MM/yyyy";
      this.formatToDisplay = "d/m/Y";
      parent_scope = this;
      parent_scope.contactTypeForContacts = "";
      parent_scope.contactPickerObject = null;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'conditionalMappingKey', () => {
        return this._conditionalMappingKey;
      });
      defineSetter(this, 'conditionalMappingKey', value => {
        this._conditionalMappingKey = value;
      });
      defineGetter(this, 'conditionalMapping', () => {
        return this._conditionalMapping;
      });
      defineSetter(this, 'conditionalMapping', value => {
        this._conditionalMapping = value;
      });
    },

    /**
  * @api : preShow
  * Gets invoked initially before rendering of UI
  * @return : NA
  */
    preShow: function() {
      this.resetUTFTransactionData();
	  this.clearScreens();
      this.invokeRender = true;
      if(!this.isEmptyNullUndefined(this.context.repeatData)) {
        if(!this.isEmptyNullUndefined(this.context.repeatData.amount)) {
          this.invokeRender = true;
          this.isRepeatFlow = true;
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
          this.view.flxMMAmount.setVisibility(false);
          this.businessController.setDataInCollection("RepeatData",this.context.repeatData);
        }
        else {
          this.navigateTo("flxFromAccount","flxFromTop", "Transfer From");
        }
      }
      else if(!this.isEmptyNullUndefined(this.context.editData)){
        if(!this.isEmptyNullUndefined(this.context.editData.transactionId)) {
          this.invokeRender = true;
          this.isEditFlow = true;
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
          this.view.flxMMAmount.setVisibility(false);
          this.businessController.setDataInCollection("EditData",this.context.editData);
        }
        else {
          this.navigateTo("flxFromAccount","flxFromTop", "Transfer From");
        }
      }
      else {
        this.navigateTo("flxFromAccount","flxFromTop", "Transfer From");
      }
      this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.dataMapping);
      this.businessController.getMetaDataForAllObjects();
      this.businessController.getMetaDataForTransactionsObject();
      this.initActions();
      this.amountKeyboardDataSetting();
      this.OtherAmtKeyboardDataSetting();
      this.currentBankDate = kony.os.date(this.dateFormat);
      if (this.view.info === undefined || this.view.info === null) {
        this.view.info = {};
      }
      this.view.doLayout = function(){
        this.view.info.frame = this.view.frame;
      }.bind(this);
    },

    /**
   Component's All Actions
*/
    initActions : function(){
      var scope = this;
      this.view.onDeviceBack = this.goBack.bind(this);//osama
      this.view.tbxFromSearch.onTextChange = this.fromAccSearch.bind(this);
      this.view.tbxToSearch.onTextChange = this.toAccSearch.bind(this);
      this.view.imgFromCloseIcon.onTouchStart = this.clearTextBoxTexts.bind(this);
      this.view.segFromAccounts.onRowClick = this.getToAccountsScreen.bind(this);
      this.view.segToAccounts.onRowClick = this.getAmountScreen.bind(this);
      
      this.view.flxToBack.onTouchStart = this.goBack.bind(this);
      this.view.customCalendar.updateDateBullets = this.updateDateBullets.bind(this);
      this.view.imgToCloseIcon.onTouchStart =this.clearToSearchTxt.bind(this);
      this.view.flxClearAmount.onTouchEnd = this.clearAmountKeypad.bind(this);
      this.view.btnToTransferNewPayee.onClick = this.setAddNewPayeeData.bind(this);
      this.view.btnTransferNewPayee.onClick = this.setAddNewPayeeData.bind(this);
      this.view.btnCancel.onClick = this.onBack.bind(this);
      this.view.flxBack.onTouchStart = this.onBack.bind(this);
      this.view.btnToCancel.onClick = this.onBack.bind(this);
      if(kony.theme.getCurrentTheme() == "darkTheme"){
        scope.view.imgAddIcon.src = "add_attachment_dark.png";
      }else{
        scope.view.imgAddIcon.src = "add_attachment.png";
      }
      //this.view.flxCurrencyWrapper.onTouchStart= this.currencyCall.bind(this);
    },
    
    
    onBack : function(){
      var transMan = applicationManager.getTransactionManager();
      transMan.clearTransferObject();
      this.resetUTFTransactionData();
      this.onBackButtonClick();
    },
    
    clearScreens : function(){
      var screens = [
        "flxPopup",
        "flxFromAccount",
        "flxToAccount",
        "flxAmount",
        "flxFrequencySelection",
        "flxPurposeCodeSelection",
        "flxCurrencySelection",
        "flxAccountNumber",
        "flxReEnterAccountNumber",
        "flxRecipientsName",
        "flxFXRateReference",
        "flxPayeeNickname",
        "flxIntermediaryBIC",
        "flxE2E",
        "flxRequiredCode",
        "flxAddAddress",
        "flxBICSwift",
        "flxSwiftBICSearch",
        "flxSwiftBICSearchList",
        "flxBCCLookUp",
        "flxBCCSearchResult",
        "flxPayeeNicknameSuccess",
        "flxDate",
        "flxFeesPaidBy",
        "flxPaymentMethod",
        "flxOtherAmount",
        "flxContactType",
        "flxCountryCode",
        "flxVerifyDetails",
        "flxPayeeBankStreet",
        "flxPayeeBankTown",
        "flxPayeeBankCountry",
        "flxClearingIdentifierCode",
        "flxPayeeBankName"
    ];
      for(var i in screens){
        this.view[screens[i]].isVisible = false;
      }
      this.view["flxFromAccount"].isVisible = true;
    },
	
	resetUTFTransactionData: function(){
      this.invokeRender = false;
      this.isRepeatFlow = false;
      this.isEditFlow = false;
      this.businessController.setDataInCollection("Accounts",undefined);
      this.businessController.setDataInCollection("CreditCardAccounts",undefined);
      this.businessController.setDataInCollection("P2P",undefined);
      this.businessController.setDataInCollection("RepeatData",undefined);
      this.businessController.setDataInCollection("EditData",undefined);
      this.businessController.setDataInCollection("toAccounts",undefined);
      this.businessController.setDataInCollection("Recipients",undefined);
      this.businessController.setDataInCollection("TransactionObject",{});
	  this.businessController.setDataInCollection("FormattedData",{});
      this.businessController.setDataInCollection("validateResponse", {});
	  this.businessController.setDataInCollection("transactionResponse", {});
	  this.lastScreen = this.stack[this.stack.length -1];
	  this.stack=[];
      this.fileNames = [];
      this.fileContents = [];
      this.fileTypes = [];
      this.selectedCurr="";
      this.isToAccountEdit = "false";
      this.fromAccountEdit= "false";
      this.editTransactionId="";
	},

    
    postShow : function() {  
      this.setConditionalMappingKey();
      let collectionObj = MakeATransferStore.getState();
      collectionObj.Collection.TransactionObject["purposeCode"] = "";
      this.businessController.setController(this);
      this.businessController.setDataInCollection("TransactionObject",collectionObj.Collection.TransactionObject);
      this.businessController.invokeCustomVerbforGetFromAccounts();
      if(this.context.transferType ==="Within Same Bank"){
        this.businessController.invokeCustomVerbforGetCreditCardAccounts();
        this.businessController.invokeCustomVerbforGetExternalPayees();
      }
      if(this.context.transferType === "Domestic Transfer" || this.context.transferType === "International Transfer"){
        this.businessController.invokeCustomVerbforGetExternalPayees();  
        this.businessController.invokeCustomVerbforClearingIdentifierCodes();
        this.businessController.invokeCustomVerbforGetCountryCodesList();
      }
      if(this.context.transferType === "Pay a Person"){
        this.businessController.invokeCustomVerbforPayaPerson();
      }
      this.businessController.invokeCustomVerbforGetBankDate();
    },


    /**
  * @api : onBreakPointChange
  * Gets invoked on change of breakpoint in UI
  * @return : NA
  */
    onBreakPointChange: function() {

    }, 
    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function(context) {
      var scope = this;
      try{
        this.context = context;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SetContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    rowExpandCollapse : function(context){
      var scope = this;
      try{
        var stackLength = scope.stack.length;
        var currentScreen = scope.stack[stackLength - 1];
        if(currentScreen==="flxToAccount")
        {
          this.toAccRowExpandCollapse(context);      
        }
        else{
          var sectionIndex = context.section;
          if (this.segFromAccountsData === '') 
            this.segFromAccountsData = JSON.parse(JSON.stringify(this.view.segFromAccounts.data));

          var data = this.view.segFromAccounts.data;
          var selectedHeaderData = data[sectionIndex][0];
          if (!JSON.stringify(data).includes("flxNoRecords")) {
            if (selectedHeaderData["imgChevron"] === "groupexpandicon.png") {
              selectedHeaderData["imgChevron"] = "groupcollapseicon.png";
              data[sectionIndex][1] = [];
              this.view.segFromAccounts.setData(data);
            } else {
              selectedHeaderData["imgChevron"] = "groupexpandicon.png";
              data[sectionIndex][1] = this.segFromAccountsData[sectionIndex][1];
              this.view.segFromAccounts.setData(data);
            }
          }
        }
      }catch (err) {
        var errorObj = {
          "errorInfo": "Error in rowExpandCollapse",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    showRemoveAttachment : function(context){
      try {
        var scope = this;
        scope.view.flxSupportingDocRemove.setVisibility(true);
        scope.view.flxVerifyDetailMainContainer.setEnabled(false);
        scope.view.btnRemoveYes.onClick = function() {
          scope.removeConfirmationPopup(); 
          scope.deleteAttachment(context);
        }
        scope.view.btnRemoveNo.onClick = function() {
          scope.removeConfirmationPopup();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in showRemoveAttachment method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }  
    },

    /**
  * @api : render
  * This method will be invoked when collection is updated to refresh UI
  * @return : NA
  */
    render : function() {
      if(!this.invokeRender)
        return;
      var scope = this;
      this.collectionObj = MakeATransferStore.getState();
      if(this.collectionObj["Collection"]["BankDate"]){
          scope.currentBankDate = this.collectionObj["Collection"]["BankDate"][0]["currentWorkingDate"];
          scope.currentBankDate = new Date(scope.currentBankDate).format(this.formatToDisplay);
      }
      if (this.collectionObj.Collection["serviceCallError"]) {
//         if (!scope.isEmptyNullUndefined(this.collectionObj.Collection["serviceCallError"].method["errmsg"])) {
//           var errMsg = this.collectionObj.Collection["serviceCallError"].method["errmsg"];
//         } else if (!scope.isEmptyNullUndefined(this.collectionObj.Collection["serviceCallError"].method["errorMessage"])) {
//           var errMsg = this.collectionObj.Collection["serviceCallError"].method["errorMessage"];
//         } else {
//           var errMsg = this.collectionObj.Collection["serviceCallError"]["error"];
//         }
// 		  this.showToastMessageError(this, errMsg);
        var err = this.collectionObj.Collection["serviceCallError"].method;
        var errorObject = {};
        if (!scope.isEmptyNullUndefined(err.serverErrorRes)){
          if (err.serverErrorRes.errorDetails) {
            errorObject.messageDetails = err.serverErrorRes.errorDetails;
          } 
        } else {
          var formattedResponse = [];
          var errMsg = {};
          errMsg.message = err.errorMessage || err.errmsg;
          errMsg.imgIcon = " ";
          formattedResponse.push(errMsg);
          errorObject.messageDetails = JSON.stringify(formattedResponse);
        }
        var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
        errorObject.formattedFailedText = formattedText;
        errorObject.isSuccess = false;
        this.view.CancelTransactionPopup.setContext(errorObject);
        this.view.flxOverridesPopup.setVisibility(true);
        this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
          if(btnAction)
            scope.view.flxOverridesPopup.setVisibility(false);
        };
        this.invokeRender = false;
        this.businessController.setDataInCollection("serviceCallError","");
      }
      if(this.collectionObj.Collection["createServiceCallError"]){
        var err = this.collectionObj.Collection["createServiceCallError"];
        var errorObject = {};
        if (!scope.isEmptyNullUndefined(err.serverErrorRes)){
          if (err.serverErrorRes.errorDetails) {
            scope.disableButton("btnTransfer");
            errorObject.messageDetails = err.serverErrorRes.errorDetails;
            var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
            errorObject.formattedFailedText = formattedText;
            errorObject.isSuccess = false;
            this.view.CancelTransactionPopup.setContext(errorObject);
            this.view.flxOverridesPopup.setVisibility(true);
            this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
              if(btnAction)
                scope.view.flxOverridesPopup.setVisibility(false);
            };
          }
          else {
            this.createTransSuccessCallback(this.collectionObj.Collection["createServiceCallError"]);
          }
        } else {
            this.createTransSuccessCallback(this.collectionObj.Collection["createServiceCallError"]);
        }
        this.invokeRender = false;
        this.businessController.setDataInCollection("createServiceCallError","");
      }
      if(scope.stack.length >0){
        var stackLength = scope.stack.length;
        var currentScreen = scope.stack[stackLength - 1];
        scope.screenRender(currentScreen);
      }
      if(this.context.transferType ==="Within Same Bank"){
      if(this.collectionObj["Collection"]["BankDate"] && this.collectionObj["Collection"]["Accounts"] && this.collectionObj["Collection"]["CreditCardAccounts"] && this.collectionObj["Collection"]["Recipients"]) {
      scope.onRequestEnd();
         }
      } else {
      scope.onRequestEnd();
      }
    },

    screenRender : function(currentScreen){
      var scope = this;
      if(currentScreen === "flxFromAccount"){
        if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Accounts"])){
          this.getFromAccounts();
        }
      }
      if(currentScreen === "flxReEnterAccountNumber"){ 
        scope.onRequestEnd();
        this.collectionObj = MakeATransferStore.getState();
        if(this.collectionObj["Collection"]["TransactionObject"]["bankName"])
          this.onAccountNumberContinueNavigation();
        else{
          if(this.collectionObj["Collection"]["IBAN"] && this.isEmptyNullUndefined(this.isIBANValid)){
            var IBANResponse = this.collectionObj["Collection"]["IBAN"];
            this.onIBANSuccess(IBANResponse);
          }
        }
        if(this.collectionObj["Collection"][this.controllerScope._serviceParameters.GetBeneficiaryName.Object])
          this.fetchBeneficiaryDetailsSuccess();
      }
      if(currentScreen==="flxToAccount"){
        scope.onRequestEnd();
        if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["toAccounts"]) && this.invokeRender){
          if(scope.collectionObj.Collection["toAccounts"].length !== 0){
            scope.view.segToAccounts.setVisibility(true);
            scope.view.flxNoAccounts.setVisibility(false);
            scope.getToAccounts();
            if(scope.isToAccountEdit === "true"){
              if(scope.collectionObj.Collection["TransactionObject"]["toAccountType"]==="Loan"){
                //osama
                //scope.navigateTo("flxOtherAmount","flxOtherAmountTop","Other Amount");
                //scope.setTransferOtherAmount();
                scope.navigateTo("flxAmount", "flxAmountTop", "Amount");  
                scope.setTransferAmount(); 
              }
              else{
                scope.setVerifyDetails();
                scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
              }
            } else {
              scope.fileNames = [];
              scope.fileContents = [];
              scope.fileTypes= [];
              if((scope.collectionObj.Collection["TransactionObject"].hasOwnProperty("dueDate") ||scope.collectionObj.Collection["TransactionObject"]["toAccountType"]==="Loan" )&& this.context.transferType ==="Within Same Bank"){
                //osama
                //scope.navigateTo("flxOtherAmount","flxOtherAmountTop","Other Amount");
                //scope.setTransferOtherAmount();
                scope.navigateTo("flxAmount", "flxAmountTop", "Amount");  
                scope.setTransferAmount(); 
              } 
              if(scope.collectionObj.Collection["TransactionObject"].hasOwnProperty("toTransactionCurrency") && !kony.sdk.isNullOrUndefined(this.context.transferType) && (scope.collectionObj.Collection["TransactionObject"]["toAccountType"]!=="Loan" && scope.collectionObj.Collection["TransactionObject"]["toAccountType"]!=="CreditCard")){
                scope.navigateTo("flxAmount", "flxAmountTop", "Amount");  
                scope.setTransferAmount(); 
              } 
            }
          } else {
            scope.view.segToAccounts.setVisibility(false);
            scope.view.flxNoAccounts.setVisibility(true);
          } 
        }
      }
      if(currentScreen ==="flxIntermediaryBIC"){
        scope.onRequestEnd();
        var err = kony.i18n.getLocalizedString("kony.mb.UTF.invalidbic");
        var object = MakeATransferStore.getState();
        if(object["Collection"].hasOwnProperty("invalidbicerror")){
          scope.showToastMessageError(scope,err);
          delete object["Collection"]["invalidbicerror"];
          delete object["Collection"]["isBICValid"]
          object["Collection"]["TransactionObject"]["intermediaryBIC"] = "";
          var dataMapping = this.controllerScope.dataMapping;
          for(var i=1;i<18;i++){
            var fieldi18nLabel = scope.geti18nKey(dataMapping["flxVerifyDetails"]["lblField"+i+"Label"]);
            if(fieldi18nLabel === "kony.i18n.verifyDetails.intermediatoryBIC"){
              var fieldValue = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxVerifyDetails"]["lblField"+i+"Value"]);
              scope.view["lblField"+i+"Value"].text = fieldValue;  
              break;
            }
          }
        }
        else{
          delete object["Collection"]["isBICValid"]
          scope.setDataAndNavigateBasedOnPreviousScreen();
         // scope.setVerifyDetails();
         // scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"])); 
        }}
      if(currentScreen ==="flxRequiredCode"){
        scope.onRequestEnd();
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if(transactionObject["isBICValid"] === "NO") {
          scope.showToastMessageError(scope, kony.i18n.getLocalizedString("kony.mb.UTF.invalidbic"));
        }
        else {
          if (scope.context["selectedFlowType"] === "EDIT") {
            this.setVerifyDetails();
            this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
          }
          else {
            scope.navigateTo("flxAmount","flxAmountTop","Amount");
            scope.setTransferAmount();
          }  
        }
      }

      if(currentScreen ==="flxVerifyDetails"){
         if(this.isRepeatFlow === true && !Object.keys(this.collectionObj.Collection["validateResponse"]).length >0) {
          if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Accounts"]) && 
             !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Recipients"]) &&
             kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["toAccounts"])) {
            this.stack =['flxVerifyDetails'];
            this.setRepeatData();
          }
           else if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Accounts"]) &&
                   !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["P2P"]) && 
                   kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["toAccounts"]))  {
             this.stack =['flxVerifyDetails'];
             this.setRepeatData();
           }
        }
        if(this.isEditFlow === true && !Object.keys(this.collectionObj.Collection["validateResponse"]).length >0) {
          if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Accounts"]) && 
             !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Recipients"]) &&
             kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["toAccounts"])) {
            this.stack =['flxVerifyDetails'];
            this.setEditData();
          }
           else if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Accounts"]) &&
                   !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["P2P"]) && 
                   kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["toAccounts"]))  {
             this.stack =['flxVerifyDetails'];
             this.setEditData();
           }
        }
        if(scope.collectionObj.Collection["validateResponse"] && this.collectionObj.Collection["transactionResponse"]){
          if(Object.keys(this.collectionObj.Collection["transactionResponse"]).length >0)
            scope.successfulTransaction();
        }
        if(scope.collectionObj.Collection["validateResponse"])
          if(Object.keys(this.collectionObj.Collection["validateResponse"]).length >0)
            scope.successfulValidation();
        if (this.collectionObj.Collection["purposeCodes"] && this.collectionObj.Collection["purposeCodes"].length>0 && this.purposeCodesUpdated) {
          this.purposeCodesUpdated = false;
          this.setFetchedPurposeCodesList();
          this.navigateTo("flxPurposeCodeSelection", "flxPurposeCodeTop", "Purpose Code");
          this.setPurposeCodesUI();
        }
        /*if (this.collectionObj.Collection["countries"] && this.collectionObj.Collection["countries"].length>0 && this.bankCountriesUpdated) {
          this.bankCountriesUpdated = false;
          this.setFetchedBankCountryList();
          this.navigateTo("flxPayeeBankCountry", "flxBankCountryTop", "Country");
          this.setBankCountryUI();
        }
        if (this.collectionObj.Collection["clearingIdentifierCodes"] && this.collectionObj.Collection["clearingIdentifierCodes"].length>0 && this.clearingIdentifierCodesUpdated) {
          this.clearingIdentifierCodesUpdated=false
          this.setClearingIdentifierCodesList();
          this.navigateTo("flxClearingIdentifierCode", "flxClearingIdentifierCodeTop", "Clearing Identifier");
          this.setClearingIdentifierCodesUI();
        }*/
      }
      if(currentScreen ==="flxSwiftBICSearch"){
        scope.setbranchNameinCollection();
        scope.setBICCodeList();
      }
      if(currentScreen ==="flxBCCLookUp"){
        //scope.setbranchNameinCollection();
        // if(Object.keys(this.collectionObj.Collection.TransactionObject.clearingCodes).length >0) {}
        scope.setBCCList();
      }
      if(currentScreen ==="flxContactType"){
        if(scope.collectionObj.Collection["Country"]) {
          scope.setFetchedCountryCodesList();
          scope.navigateTo("flxCountryCode", "flxCountryCodeTop", "countryCode");
        }
      }
    },

    setPurposeCodesUI:function(){
      this.view.imgPurposeCodeBack.src = "backbutton.png";
      this.view.flxPurposeCodeHeaderTop.skin = "sknFlx0095e4";
      this.view.lblPurposeCodeHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblPurposeCodeHeader", this.controllerScope._dataMapping["segPurposeCodeOptions"]);
      this.view.lblPurposeCodeHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxPurposeCodeBack.onTouchStart=this.goBack;
      this.view.flxPurposeCodeMainContainer.height ="661dp";

      /*let height = this.view.flxPurposeCodeSelection.frame.height;
      if (this.view.flxPurposeCodeHeaderTop.isVisible) {
        height = height - this.view.flxPurposeCodeHeaderTop.frame.height;
      }
      this.view.flxPurposeCodeMainContainer.height = height+"dp";*/
    },

    setClearingIdentifierCodesUI:function(){
      this.view.imgClearingIdentifierCodeBack.src = "backbutton.png";
      this.view.flxClearingIdentifierCodeHeaderTop.skin = "sknFlx0095e4";
      this.view.lblClearingIdentifierCodeHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblClearingIdentifierCodeHeader", this.controllerScope._dataMapping["segClearingIdentifierCodeOptions"]);
      this.view.lblClearingIdentifierCodeHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxClearingIdentifierCodeBack.onTouchStart=this.goBack;
      this.view.flxPurposeCodeMainContainer.height ="661dp";
      /*let height = this.view.flxClearingIdentifierCode.frame.height;
      if (this.view.flxClearingIdentifierCodeHeaderTop.isVisible) {
        height = height - this.view.flxClearingIdentifierCodeHeaderTop.frame.height;
      }
      this.view.flxClearingIdentifierCodeMainContainer.height = height+"dp";
      this.view.flxClearingIdentifierCodeMainContainer.forceLayout();
      this.view.forceLayout();*/
    },

    setbranchNameinCollection : function(){
      kony.application.dismissLoadingScreen();
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var swiftCodes=[];
      swiftCodes=transactionObject.swiftCodes;
      for(var i = 0; i < swiftCodes.length;i++){
        var city = (!this.isEmptyNullUndefined(swiftCodes[i].city)? swiftCodes[i].city:"" ) + (!this.isEmptyNullUndefined(swiftCodes[i].country)? ",":"");
        var country = !this.isEmptyNullUndefined(swiftCodes[i].country)? swiftCodes[i].country : ""+ !this.isEmptyNullUndefined(swiftCodes[i].countryRegion)? ",":"";
        var bankName = !this.isEmptyNullUndefined(swiftCodes[i].bankName)?swiftCodes[i].bankName:"";
        swiftCodes[i]["branchDetails"]=bankName+city+country;
      }
      transactionObject["swiftCodes"]=swiftCodes;
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject",transactionObject);
    },

    setBICCodeList : function(){
      this.performDataMapping("segSwiftBICSearchList");
      this.performBICListUIActions();
    },

    setBCCList : function(){
      this.performDataMapping("segBCCSearchList");
      this.performBCCListUIActions();
    },

    performBCCListUIActions : function() {
      var scope = this;
      this.lastSelectedRow = "";
      var segRecords = this.view.segBCCSearchList.data;
      var recordsLength = segRecords.length;
      this.navigateTo("flxBCCSearchResult","flxBCCSearchTop","Clearing Code Search");
      this.view.lblBCCSearchListHeader.text = kony.i18n.getLocalizedString("i18n.payments.BCCSearchTitle");
     // this.view.onDeviceBack = this.goBack.bind(this);//osama
      this.view.imgBCCSearchListBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxBCCSearchListHeader.skin = "sknFlx0095e4";
      this.view.lblBCCSearchListHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxBCCSearchListDescription.skin = "sknFlxffffff";
      this.view.lblBCCSearchListDescription.skin = "ICSknLbl727272SSPReg34px";
      this.view.flxBCCSearchListSeparator.skin = "sknFlxSeparatora6a6a6";
      if(recordsLength > 0){
        this.view.flxBCCSearchListScroll.setVisibility(true);
        this.view.flxNoBCCSearchResult.setVisibility(false);
        var widgetMap = {
          "lblSwiftBICSearchListName":"lblSwiftBICSearchListName",
          "lblSwiftBICSearchListHeader":"lblSwiftBICSearchListHeader",
          "lblBICSwiftBICSearchListDescription":"lblBICSwiftBICSearchListDescription",
          "flxSwiftBICSearchOptions":"flxSwiftBICSearchOptions",
          "imgSwiftBICSearchListTick":"imgSwiftBICSearchListTick"
        };
        this.view.segBCCSearchList.widgetDataMap = widgetMap;
        this.view.segBCCSearchList.setData(segRecords);
        this.view.flxBCCSearchResult.forceLayout();
        this.view.segBCCSearchList.onRowClick = this.selectBankClearingCode.bind(this,segRecords);
      }else {
        this.view.flxBCCSearchListScroll.setVisibility(false);
        this.view.flxNoBCCSearchResult.setVisibility(true);
      }
      this.view.btnUseBCC.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.useCode");
      this.view.btnUseBCC.skin = "sknBtnOnBoardingInactive";
      this.view.btnUseBCC.setEnabled(false);
      this.view.btnBCCSearchAgain.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.searchAgain");
      this.view.btnBCCSearchAgain.onClick = this.goBack.bind(this);
      this.view.forceLayout();
    },

    // researchBankClearingCode : function(){
    //   var dataMapping = this.controllerScope._dataMapping;
    //   this.navigateTo("flxBCCLookUp","flxBCCSearchHeaderTop",this.businessController.getParsedDataBasedOnDataMapping("BCCLookupHeader",dataMapping["flxBCCLookUp"]));
    // },

    selectBankClearingCode : function(clearingCode){
      var rowIndex = this.view.segBCCSearchList.selectedRowIndex[1];
      if(rowIndex !== this.lastSelectedRow){
        clearingCode[rowIndex].flxSwiftBICSearchOptions.skin = "ICSknFlx04A615Selected";
        clearingCode[rowIndex].imgSwiftBICSearchListTick.isVisible = true;
        this.view.segBCCSearchList.setDataAt(clearingCode[rowIndex], rowIndex);
        this.view.flxSwiftBICSearchList.forceLayout();
        if(this.lastSelectedRow === "" || this.lastSelectedRow === null || this.lastSelectedRow.length === 0){
          this.lastSelectedRow =rowIndex;
        }else{
          var lastSwift = this.lastSelectedRow;
          clearingCode[lastSwift].flxSwiftBICSearchOptions.skin = "ICSknFlxE3E3E3NotSelected";
          clearingCode[lastSwift].imgSwiftBICSearchListTick.isVisible = false;
          this.view.segBCCSearchList.setDataAt(clearingCode[lastSwift], lastSwift);
          this.lastSelectedRow =rowIndex;
        }
        this.view.btnUseBCC.skin = "ICSknBtn003E7535PXmb";
        this.view.btnUseBCC.setEnabled(true);
        this.view.flxBCCSearchButtons.forceLayout();
        this.view.btnUseBCC.onClick = this.confirmBankClearingCode.bind(this,clearingCode[rowIndex]);
      }
    },

    confirmBankClearingCode : function(selectedSwift){
      var scope =this;
      if(scope.context.transferType === "Domestic Transfer" || scope.context.transferType === "International Transfer"){
        this.view.txtRequiredClearingCode1.text = selectedSwift.lblSwiftBICSearchListHeader;
        if(scope.validateIntNewPayeeBankDetails()){
          scope.enableButton("btnRequiredCodeContinue");
        }else {
            scope.disableButton("btnRequiredCodeContinue");
          }
        this.view.btnRequiredCodeContinue.skin = "ICSknBtn003E7535PXmb";
        // this.view.btnRequiredCodeContinue.setEnabled(true);
        this.navigateTo("flxRequiredCode","flxRequiredCodeTop","Required Code");
      }
      //scope.updateContext("toAvailableBalance",selectedSwift.bankName);
    },

    performBICListUIActions : function() {
      var scope = this;
      this.lastSelectedRow = "";
      var segRecords = this.view.segSwiftBICSearchList.data;
      var recordsLength = segRecords.length;
      this.navigateTo("flxSwiftBICSearchList","flxSwiftBICSearchTop","SWIFT BIC Search");
      this.view.lblSwiftBICSearchListHeader.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.swiftBicSearch");
      this.view.imgSwiftBICSearchListBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxSwiftBICSearchListHeader.skin = "sknFlx0095e4";
      this.view.lblSwiftBICSearchListHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxSwiftBICSearchListDescription.skin = "sknFlxffffff";
      this.view.lblSwiftBICSearchListDescription.skin = "ICSknLbl727272SSPReg34px";
      this.view.flxSwiftBICSearchListSeparator.skin = "sknFlxSeparatora6a6a6";
      if(recordsLength > 0){
        this.view.flxSwiftBICSearchListScroll.setVisibility(true);
        this.view.flxNoSearchResult.setVisibility(false);
        var widgetMap = {
          "lblSwiftBICSearchListName":"lblSwiftBICSearchListName",
          "lblSwiftBICSearchListHeader":"lblSwiftBICSearchListHeader",
          "lblBICSwiftBICSearchListDescription":"lblBICSwiftBICSearchListDescription",
          "flxSwiftBICSearchOptions":"flxSwiftBICSearchOptions",
          "imgSwiftBICSearchListTick":"imgSwiftBICSearchListTick"
        };
        this.view.segSwiftBICSearchList.widgetDataMap = widgetMap;
        this.view.segSwiftBICSearchList.setData(segRecords);
        this.view.flxSwiftBICSearchList.forceLayout();
        this.view.segSwiftBICSearchList.onRowClick = this.selectSwiftCode.bind(this,segRecords);
      }else {
        this.view.flxSwiftBICSearchListScroll.setVisibility(false);
        this.view.flxNoSearchResult.setVisibility(true);
      }
      this.view.btnUseSwift.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.useSwift");
      this.view.btnUseSwift.skin = "sknBtnOnBoardingInactive";
      this.view.btnUseSwift.setEnabled(false);
      this.view.btnSearchAgain.text = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.searchAgain");
      this.view.btnSearchAgain.onClick = this.researchSwiftCode.bind(this);
      this.view.forceLayout();
    },

    researchSwiftCode : function(){
      var dataMapping = this.controllerScope._dataMapping;
      this.navigateTo("flxSwiftBICSearch","flxSwiftBICSearchHeaderTop",this.businessController.getParsedDataBasedOnDataMapping("swiftLookupHeader",dataMapping["flxSwiftBICSearch"]));
    },

    selectSwiftCode : function(swiftCodes){
      var rowIndex = this.view.segSwiftBICSearchList.selectedRowIndex[1];
      if(rowIndex !== this.lastSelectedRow){
        swiftCodes[rowIndex].flxSwiftBICSearchOptions.skin = "ICSknFlx04A615Selected";
        swiftCodes[rowIndex].imgSwiftBICSearchListTick.isVisible = true;
        this.view.segSwiftBICSearchList.setDataAt(swiftCodes[rowIndex], rowIndex);
        this.view.flxSwiftBICSearchList.forceLayout();
        if(this.lastSelectedRow === "" || this.lastSelectedRow === null || this.lastSelectedRow.length === 0){
          this.lastSelectedRow =rowIndex;
        }else{
          var lastSwift = this.lastSelectedRow;
          swiftCodes[lastSwift].flxSwiftBICSearchOptions.skin = "ICSknFlxE3E3E3NotSelected";
          swiftCodes[lastSwift].imgSwiftBICSearchListTick.isVisible = false;
          this.view.segSwiftBICSearchList.setDataAt(swiftCodes[lastSwift], lastSwift);
          this.lastSelectedRow =rowIndex;
        }
        this.view.btnUseSwift.skin = "ICSknBtn003E7535PXmb";
        this.view.btnUseSwift.setEnabled(true);
        this.view.flxSwiftBICSearchButtons.forceLayout();
        this.view.btnUseSwift.onClick = this.confirmSwiftCode.bind(this,swiftCodes[rowIndex]);
      }
    },

    confirmSwiftCode : function(selectedSwift){
      var scope =this;
      if(scope.context.transferType === "Domestic Transfer" || scope.context.transferType === "International Transfer"){
        this.view.txtRequiredBICSwift.text = selectedSwift.lblSwiftBICSearchListHeader;
        this.view.btnRequiredCodeContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnRequiredCodeContinue.setEnabled(true);
        this.navigateTo("flxRequiredCode","flxRequiredCodeTop","Required Code");
      }
      //scope.updateContext("toAvailableBalance",selectedSwift.bankName);
    },

    /**     
   * Component onIBANSuccess
     * Method to be invoke on IBAN success call back.
    **/
    onIBANSuccess : function(response) {
      try {
        var scope = this;
        scope.isIBANValid = response.isIBANValid;
        if(scope.payeeFlow === "Existing") {  // To Do To Account Screen
          if(this.context["selectedFlowType"] === "EDIT") {
            if (this.isToAccountEdit == "true")
              scope.getBankDetailsFromSwift(false);
            else
              scope.getBankDetailsFromSwift(true);  
          } else {
            scope.getBankDetailsFromSwift();
          }
        } else {
          if(scope.isIBANValid === "YES") {
            this.collectionObj = MakeATransferStore.getState();
            var transactionObject = this.collectionObj["Collection"]["TransactionObject"];
            transactionObject["payeeAccountNumberOrIBAN"] = response.iban;
            transactionObject["IBANCountryCode"] = response.iban.slice(0, 2);
            this.invokeRender = false;
            this.businessController.setDataInCollection("TransactionObject",transactionObject);
            scope.invokeSwiftServiceFromIBAN();
          }
          else {
            scope.onAccountNumberContinueNavigation();
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onIBANSuccess method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    invokeSwiftServiceFromIBAN : function (){
      this.invokeRender = true;
      this.businessController.invokeSwiftServiceFromIBAN();
    },

    /**
  * @api : setConditionalMappingKey
  * Set the conditional mapping in global variable
  * @return : NA
  */
    setConditionalMappingKey : function() {
      var conditionalMappingKey = this.controllerScope.conditionalMappingKey;
      conditionalMappingKey = conditionalMappingKey.split(".");
      conditionalMappingKey = conditionalMappingKey[conditionalMappingKey.length - 1].replace("}",""); 
      this.conditionalMappingKey = conditionalMappingKey;
    },


    /**
  * @api : setFromAccounts
  * This method will do data mapping of from accounts with collection
  * @return : NA
  */
    getFromAccounts : function(){
      var scope = this;
      scope.view.imgBack.src="backbutton.png";
      scope.view.flxFromHeader.skin="sknFlx0095e4";
      scope.performDataMapping("segFromAccounts");
      scope.performFromAccountsUIActions();
    },


    getToAccounts : function(){
      var scope = this;
      scope.view.imgToBack.src="backbutton.png";
      scope.view.flxToHeader.skin="sknFlx0095e4";
      scope.performDataMapping("segToAccounts");
      scope.performToAccountsUIActions();
    },

    /**
  * @api : setFromAccounts
  * This method will do data mapping of from accounts with collection
  * @return : NA
  */
    groupToAccounts : function(rowData){
      var scope = this;
      var reqAccounts = scope.getToaccountsbasedonTransferType(rowData);
      this.invokeRender = true;
      this.businessController.setToAccountsonTransferType(reqAccounts);
    },

    getToAccountsByGroupType : function(data){
      var scope = this;
      var toAccountsData= [];  
      if(scope.isToSearchApplied)
        toAccountsData = this.groupResponseData(scope.filteredToAcc, "groupType");
      else{
        this.filteredToAcc =data;
        toAccountsData = this.groupResponseData(this.filteredToAcc, "groupType");
      } 
      // toAccountsData = this.groupResponseData(data, "groupType");
      var toAccountsDataKeys = Object.keys(toAccountsData);
      var sectionData = [];
      for (var i = 0; i < toAccountsDataKeys.length; i++) {
        var fromData = {};
        fromData = [{
          "lblHeaderName": {
            "text": toAccountsDataKeys[i] + "  (" + toAccountsData[toAccountsDataKeys[i]].length + ")",
            "skin": "sknLbl424242SSPReg33px"
          },
          "imgChevron": "groupexpandicon.png",
          "flxUnifiedTransferHeader": {
            "skin": "ICSknFlxF6F6F6"
          },
          "flxUpShadow": {
            "skin": "ICSknFlxShadow000fff"
          }
        }, toAccountsData[toAccountsDataKeys[i]]];
        sectionData.push(fromData);
      } 
      return sectionData;
    },

    getFromAccountsByAccountType : function(accountsData){
      var scope = this;
      var fromAccountsData=[];
      fromAccountsData =scope.groupBusinessAndRetail(accountsData);
      // var accounts = scope.collectionObj.Collection["Accounts"];
      /** 
    if(scope.searchApplied)
      fromAccountsData = this.groupResponseData(scope.filteredFromAcc, "accountType");
    else{
      scope.filteredFromAcc = this.filterRecordsList(accountsData);
      fromAccountsData = this.groupResponseData(scope.filteredFromAcc, "accountType");
    } */
      //  }
      var fromAccountsDataKeys = Object.keys(fromAccountsData);
      var sectionData = [];
      for (var i = 0; i < fromAccountsDataKeys.length; i++) {
        var fromData = {};
        if( this.isBusinessAccountListValue!=true){
          if(fromAccountsDataKeys[i]=="Savings" ||fromAccountsDataKeys[i]=="Checking"||fromAccountsDataKeys[i]=="Deposit"||fromAccountsDataKeys[i]=="Loan"||fromAccountsDataKeys[i]=="Credit Card")
          {
            fromData=[
              {"lblHeaderName":{
                "text" :fromAccountsDataKeys[i]+" Accounts  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
                "skin":"sknLbl424242SSPReg33px"
              }, 
               "imgChevron": "groupexpandicon.png",                 
               "flxUnifiedTransferHeader":{"skin":"ICSknFlxF6F6F6"},
               "flxUpShadow":{"skin":"ICSknFlxShadow000fff"}                           
              },fromAccountsData[fromAccountsDataKeys[i]]
            ]
            sectionData.push(fromData);
          }
        }
        else
        {
          fromData = [{
            "lblHeaderName": {
              "text": fromAccountsDataKeys[i] + "  (" + fromAccountsData[fromAccountsDataKeys[i]].length + ")",
              "skin": "sknLbl424242SSPReg33px"
            },
            "imgChevron": "groupexpandicon.png",
            "flxUnifiedTransferHeader": {
              "skin": "ICSknFlxF6F6F6"
            },
            "flxUpShadow": {
              "skin": "ICSknFlxShadow000fff"
            }
          }, fromAccountsData[fromAccountsDataKeys[i]]];
          sectionData.push(fromData);
        }
      } 
      return  sectionData;
    },

    getToaccountsbasedonTransferType : function(rowData){
      var scope = this;
      var data = scope.collectionObj.Collection["Recipients"];
      var accounts = [];
      if(this.context.transferType ==="Within Same Bank"){
        if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["CreditCardAccounts"])&&!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["Recipients"])){
          for(var i = 0; i < data.length;i++){
            if(data[i].isSameBankAccount === "true"){
              accounts.push(data[i]);
              accounts[accounts.length-1]["groupType"] = "All Payees";
              accounts[accounts.length-1]["beneType"] = "external"
            }
          }
          var internalAccounts=[];
          var internalAccounts =  scope.collectionObj.Collection["Accounts"];
          internalAccounts= scope.filterDataBasedOnPermissions(internalAccounts, this.context.transferType);
          var selectedFromAccount = rowData[0].accountID;
          for(var i=0; i<internalAccounts.length;i++){
            if(internalAccounts[i].accountID.indexOf(selectedFromAccount)===-1){
              // if(internalAccounts[i].accountID !== this.context.fromAccountNumber) {
              accounts.push(internalAccounts[i]);
              accounts[accounts.length-1]["groupType"] = internalAccounts[i].accountType;
              accounts[accounts.length-1]["beneType"] = "internal";
            }
          }
          var creditcardAccounts = scope.collectionObj.Collection["CreditCardAccounts"];
          for(var i=0; i<creditcardAccounts.length;i++){
            accounts.push(creditcardAccounts[i]);
            accounts[accounts.length-1]["groupType"] = creditcardAccounts[i].accountType;
            accounts[accounts.length-1]["beneType"] = "internal";
          }
        }
      }
      if(this.context.transferType ==="International Transfer"){
        for(var i = 0; i < data.length;i++){
          if(data[i].isSameBankAccount === "false" && data[i].isInternationalAccount === "true"){
            accounts.push(data[i]);
            accounts[accounts.length-1]["groupType"] = "All Payees";
            accounts[accounts.length-1]["beneType"] = "external";
          }
        }
      }
      if(this.context.transferType ==="Domestic Transfer"){
        for(var i = 0; i < data.length;i++){
          if(data[i].isSameBankAccount === "false" && data[i].isInternationalAccount === "false"){
            accounts.push(data[i]);
            accounts[accounts.length-1]["groupType"] = "All Payees";
            accounts[accounts.length-1]["beneType"] = "external";
          }
        }  
      }
      if(this.context.transferType ==="Pay a Person"){
        var p2pAccounts = scope.collectionObj.Collection["P2P"].PayPerson;
        for(var i = 0; i < p2pAccounts.length;i++){
          accounts.push(p2pAccounts[i]);
          accounts[accounts.length-1]["groupType"] = "All P2P Accounts";
          accounts[accounts.length-1]["beneType"] = "external";
        }
		this.view.btnTransferNewPayee.isVisible = false;  
      }
      return accounts;
    },

    performDataMapping : function(widgetId) {
      var scope = this;
      var dataMapping = this.controllerScope.dataMapping;
      var conditionalDataMapping = this.controllerScope.conditionalMapping;
      var segData = [];
      for(key in dataMapping){
        if(key === widgetId){
          if(widgetId === "segSwiftBICSearchList"){
            segData = scope.getBICSegmentDataFromMapping(dataMapping[widgetId], conditionalDataMapping[widgetId],widgetId);
          }
          else if(widgetId === "segBCCSearchList"){
            segData = scope.getBCCSegmentDataFromMapping(dataMapping[widgetId], conditionalDataMapping[widgetId],widgetId);
            scope.view[widgetId].rowTemplate = "flxSegSwiftBICSearchList";
          }//osama 
          else if (widgetId === "segFromAccounts")
          {
            segData = scope.getSegmentDataFromMappingfromaccount(dataMapping[widgetId], conditionalDataMapping[widgetId],widgetId);
          }//end osama
          else{
            segData = scope.getSegmentDataFromMapping(dataMapping[widgetId], conditionalDataMapping[widgetId],widgetId);
          }
          
          scope.view[widgetId].setData(segData);
        }
      }
    },

    /**
  * @api : performUIActions
  * This method will do ui changes and actions to be taken before rendering view
  * @return : NA
  */
    performFromAccountsUIActions : function() {
      var scope = this;
      var segFromAccountsHeight =scope.view.flxFromAccount.frame.height -(scope.view.flxFromHeader.frame.height + scope.view.flxFromDescription.frame.height);
      scope.view.segFromAccounts.height = segFromAccountsHeight+"dp";
      var segRecords = this.view.segFromAccounts.data;
      var recordsLength = segRecords.length;
      if(recordsLength > 0){
        this.view.segFromAccounts.setVisibility(true);
        this.view.flxFromNoResults.setVisibility(false);
        var sectionalData = this.getFromAccountsByAccountType(segRecords);
        this.view.segFromAccounts.widgetDataMap = scope.setFromAccountsSegmentWidgetDataMap();
        this.view.segFromAccounts.setData(sectionalData);
      }else {
        this.view.segFromAccounts.setVisibility(false);
        this.view.flxFromNoResults.setVisibility(true);
      }
      this.view.forceLayout();
    },
    /**
  * @api : performUIActions
  * This method will do ui changes and actions to be taken before rendering view
  * @return : NA
  */
    performToAccountsUIActions : function() {
      var scope = this;
      var segToAccountsHeight = scope.view.flxToAccount.frame.height -(scope.view.flxToHeader.frame.height + scope.view.flxToDescription.frame.height);
      scope.view.segToAccounts.height = segToAccountsHeight+"dp";
      var segRecords = this.view.segToAccounts.data;
      //osama
      //var recordsLength = segRecords.length;
      if(segRecords && segRecords.length > 0){
        this.view.segToAccounts.setVisibility(true);
        this.view.flxNoResults.setVisibility(false);
        var sectionalData =scope.getToAccountsByGroupType(segRecords);;
        this.view.segToAccounts.widgetDataMap = scope.setFromAccountsSegmentWidgetDataMap();
        this.view.segToAccounts.setData(sectionalData);
      }else {
        this.view.segToAccounts.setVisibility(false);
        this.view.flxNoResults.setVisibility(true);
      }
      this.view.forceLayout();
    },

    toAccRowExpandCollapse : function (context) {
      var self = this;
      try{
        var sectionIndex = context.section;
        if (this.toAccSegmentData === '') 
          this.toAccSegmentData = JSON.parse(JSON.stringify(this.view.segToAccounts.data));

        var data = this.view.segToAccounts.data;

        var selectedHeaderData = data[sectionIndex][0];
        if (!JSON.stringify(data).includes("flxNoRecords")) {
          if (selectedHeaderData["imgChevron"] === "groupexpandicon.png") {
            selectedHeaderData["imgChevron"] ="groupcollapseicon.png";
            data[sectionIndex][1] = [];
            this.view.segToAccounts.setData(data);
          } else {
            selectedHeaderData["imgChevron"] = "groupexpandicon.png";
            data[sectionIndex][1] = this.toAccSegmentData[sectionIndex][1];
            this.view.segToAccounts.setData(data);
          }
        }
      }catch (err) {
        var errorObj = {
          "errorInfo": "Error in rowExpandCollapse",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
  * @api : getSegmentDataFromMapping
  * This method will return the segement data from data mapping property
  * @return : Array
  */
    getSegmentDataFromMapping : function(segDataJSON,conditionalMapping,segId) {
      var scope = this;
      var segData = [];
      var segMasterDataToken = segDataJSON.segmentMasterData;
      segMasterDataToken = segMasterDataToken.split(".");
      if(segMasterDataToken[0].indexOf("Collection") != -1){
        var segMasterData = [];
        var key = segMasterDataToken[1].replace("}","");
        if(this.collectionObj.Collection[key]){
          segMasterData = this.collectionObj.Collection[key];
        }
        segMasterData = scope.determineUserType(segMasterData);
        segMasterData.map(function(record){
            if(record.accountType != "CreditCard"  && record.accountType != "Temp")//osama
            { 
            
          var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
          for(key in segRecord){
            if(key == "lblField1" && segRecord[key] == "${segmentMasterData.accountName}" && record.beneType == "internal")
            {
                var account_name = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
                var acc_frist_name = account_name.split(/[ .]/)[0];
                var account_currencyCode = scope.getFieldValueFromMappingtoaccount(key, "${segmentMasterData.currencyCode}", conditionalMapping, record);
                var account_account_id = scope.getFieldValueFromMappingtoaccount(key, "${segmentMasterData.Account_id}", conditionalMapping, record);
                var full_name = acc_frist_name + ' - ' + account_account_id + ' - ' + account_currencyCode;
                segRecord[key] = full_name;
            }
            else 
            {
            segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
            }
          }
          segRecord = scope.getOtherUIMappings(segRecord, record, segId);
          segData.push(segRecord);
          }
        });
      }
      return segData;
    },


    //osama this to get from account ditels
    getSegmentDataFromMappingfromaccount: function(segDataJSON, conditionalMapping, segId) {
            var scope = this;
            var segData = [];
            var segMasterDataToken = segDataJSON.segmentMasterData;
            segMasterDataToken = segMasterDataToken.split(".");
            if (segMasterDataToken[0].indexOf("Collection") != -1) {
                var segMasterData = [];
                var key = segMasterDataToken[1].replace("}", "");
                if (this.collectionObj.Collection[key]) {
                    segMasterData = this.collectionObj.Collection[key];
                }
                segMasterData = scope.determineUserType(segMasterData);
                segMasterData.map(function(record) {
                    if(record.accountType != "CreditCard" && record.accountType != "Temp")//osama
            {
                    var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
                    for (key in segRecord) {
                        if (key == "lblField1" && segRecord[key] == "${segmentMasterData.accountName}") {
                            var account_name = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
                            var acc_frist_name = account_name.split(/[ .]/)[0];
                            var account_currencyCode = scope.getFieldValueFromMapping(key, "${segmentMasterData.currencyCode}", conditionalMapping, record);
                            var account_account_id = scope.getFieldValueFromMapping(key, "${segmentMasterData.account_id}", conditionalMapping, record);
                            var full_name = acc_frist_name + ' - ' + account_account_id + ' - ' + account_currencyCode;
                            segRecord[key] = full_name;
                        } else {
                            segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
                        }
                    }
                    segRecord = scope.getOtherUIMappings(segRecord, record, segId);
                    segData.push(segRecord);
            }
                });
            }
            return segData;
        },
        //end osama

    /**
  * @api : getBICSegmentDataFromMapping
  * This method will return the segement data from data mapping property
  * @return : Array
  */
    getBICSegmentDataFromMapping : function(segDataJSON,conditionalMapping,segId) {
      var scope = this;
      var segData = [];
      var segMasterDataToken = segDataJSON.segmentMasterData;
      segMasterDataToken = segMasterDataToken.split(".");
      if(segMasterDataToken[0].indexOf("Collection") != -1){
        var segMasterData = [];
        var key = segMasterDataToken[2].replace("}","");
        if(this.collectionObj.Collection.TransactionObject[key]){
          segMasterData = this.collectionObj.Collection.TransactionObject[key];
        }
        segMasterData.map(function(record){
          var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
          for(key in segRecord){
            segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
          }
          segRecord = scope.getOtherUIMappings(segRecord, record, segId);
          segData.push(segRecord);
        });
      }
      return segData;
    },
    /**
  * @api : getBCCSegmentDataFromMapping
  * This method will return the segement data from data mapping property
  * @return : Array
  */
    getBCCSegmentDataFromMapping : function(segDataJSON,conditionalMapping,segId) {
      // var scope = this;
      // var segData = [];
      // var segMasterDataToken = segDataJSON.segmentMasterData;
      // segMasterDataToken = segMasterDataToken.split(".");
      // if(segMasterDataToken[0].indexOf("Collection") != -1){
      //   var segMasterData = [];
      //   var key = segMasterDataToken[2].replace("}","");
      //   if(this.collectionObj.Collection.TransactionObject[key]){
      //     segMasterData = this.collectionObj.Collection.TransactionObject[key];
      //   }
      //   segMasterData.map(function(record){
      //     var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
      //     for(key in segRecord){
      //       segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
      //     }
      //     segRecord = scope.getOtherUIMappings(segRecord, record, segId);
      //     segData.push(segRecord);
      //   });
      // }
      var segData = [
        {
          "lblSwiftBICSearchListName": "Bank Clearing Code:",
          "lblSwiftBICSearchListHeader": "123456",
          "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
          "flxSwiftBICSearchOptions": {
              "skin": "ICSknFlxE3E3E3NotSelected"
          },
          "imgSwiftBICSearchListTick": {
              "src": "selectedtick.png",
              "isVisible": false
          }
        },
        {
          "lblSwiftBICSearchListName": "Bank Clearing Code:",
          "lblSwiftBICSearchListHeader": "678912",
          "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
          "flxSwiftBICSearchOptions": {
              "skin": "ICSknFlxE3E3E3NotSelected"
          },
          "imgSwiftBICSearchListTick": {
              "src": "selectedtick.png",
              "isVisible": false
          }
        },
        {
          "lblSwiftBICSearchListName": "Bank Clearing Code:",
          "lblSwiftBICSearchListHeader": "345678",
          "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
          "flxSwiftBICSearchOptions": {
              "skin": "ICSknFlxE3E3E3NotSelected"
          },
          "imgSwiftBICSearchListTick": {
              "src": "selectedtick.png",
              "isVisible": false
          }
        }
      ]
      return segData;
    },
    UIMapping : function(ResponseArray, segDataJSON, key,conditionalMapping){
      var scope = this ;
      var tempData =[];
      ResponseArray.map(function(record){
        var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
        for(key in segRecord){
          segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
        }
        // segRecord = scope.getUIMappings(segRecord, record, segId);
        //  segRecord = scope.getOtherMappings(segRecord, segId)
        tempData.push(segRecord);
      });
      return tempData;
    },
    /**
  * @api : geti18nText
     * This method is used get the i18n text
     * return String
     */
    geti18nText : function(text) {
      var i18ntext = text.substring(text.indexOf("${i18n")+7,text.length-2);
      return kony.i18n.getLocalizedString(i18ntext);
    },
    /**
  * @api : setSegmentWidgetDataMap
  * This method will set the widget data map for segTransactions segment
  * @return : NA
  */
    setFromAccountsSegmentWidgetDataMap : function() {
      var dataMapping = {
        "flxUnifiedTransferHeader": "flxUnifiedTransferHeader",
        "flxTransactionsHeader": "flxTransactionsHeader",
		"flxUnifiedTransferRowTemplate": "flxUnifiedTransferRowTemplate",
        "flxUpShadow": "flxUpShadow",
        "flxIcon1": "flxIcon1",
        "flxIcon2": "flxIcon2",
        "flxIcon3": "flxIcon3",
        "flxIcon4": "flxIcon4",
        "imgIcon1": "imgIcon1",
        "imgIcon2": "imgIcon2",
        "imgIcon3": "imgIcon3",
        "imgIcon31": "imgIcon31",
        "imgIcon4": "imgIcon4",
        "lblHeaderName": "lblHeaderName",
        "lblField1": "lblField1",
        "lblField2": "lblField2",
        "lblField3": "lblField3",
        "lblField4": "lblField4",
        "flxGroup1": "flxGroup1",
        "flxGroup2": "flxGroup2",
        "flxGroup3": "flxGroup3",
        "flxGroup4": "flxGroup4",
        "lblCount": "lblCount",
        "flxSeparator": "flxSeparator",
        "transactionId": "transactionId",
        "flxNoRecords": "flxNoRecords",
        "imgChevron": "imgChevron",
        "lblNoRecords": "lblNoRecords",
        "imgIcon": "imgIcon",
        "flxRow": "flxRow"
      };
      return dataMapping;
    },
    /**
  * @api : getFieldValueFromMapping
  * Returns the data in collection using data mapping and conditional data mapping
  * @return : String
  */
    getFieldValueFromMapping : function(widget, fieldMapping, conditionalMapping, record) {
      var conditionalfieldMapping;
      if(conditionalMapping){
        var conditionalMappingKey = this.conditionalMappingKey;
        if(conditionalMapping[record[conditionalMappingKey]] != undefined){
          conditionalfieldMapping = conditionalMapping[record[conditionalMappingKey]][widget];
          if(conditionalfieldMapping === "") fieldMapping ="" ;
        }
      }
      if(conditionalfieldMapping) {
        fieldMapping = conditionalfieldMapping;
      }
      if(typeof fieldMapping === "string") {
        if(fieldMapping.indexOf("$") !== -1){
          if(fieldMapping.indexOf("${i18n") !== -1) {
            return this.geti18nText(fieldMapping);
          }
          else if (fieldMapping.indexOf("||") != -1) {
            fieldMapping = fieldMapping.split("||");
            var fieldMapping1 = fieldMapping[0].split(".");
            var fieldMapping2 = fieldMapping[1].split(".");
            fieldMapping1 = fieldMapping1[fieldMapping1.length - 1].replace("}", "");
            fieldMapping2 = fieldMapping2[fieldMapping2.length - 1].replace("}", "");
            return record[fieldMapping1] || record[fieldMapping2];
          }
          else{
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}","");
            return record[fieldMapping]; 
          }
        }
        else {
          return fieldMapping;
        }
      }
      else {
        return fieldMapping;
      }

    },

    //osama 
    //this to get name toAccount

    getFieldValueFromMappingtoaccount: function(widget, fieldMapping, conditionalMapping, record) {
            var conditionalfieldMapping;
            if (conditionalMapping) {
                var conditionalMappingKey = this.conditionalMappingKey;
                if (conditionalMapping[record[conditionalMappingKey]] != undefined) {
                    conditionalfieldMapping = conditionalMapping[record[conditionalMappingKey]][widget];
                    if (conditionalfieldMapping === "") fieldMapping = "";
                }
            }
            //if (conditionalfieldMapping) {
            //    fieldMapping = conditionalfieldMapping;
            //}
            if (typeof fieldMapping === "string") {
                if (fieldMapping.indexOf("$") !== -1) {
                    if (fieldMapping.indexOf("${i18n") !== -1) {
                        return this.geti18nText(fieldMapping);
                    } else if (fieldMapping.indexOf("||") != -1) {
                        fieldMapping = fieldMapping.split("||");
                        var fieldMapping1 = fieldMapping[0].split(".");
                        var fieldMapping2 = fieldMapping[1].split(".");
                        fieldMapping1 = fieldMapping1[fieldMapping1.length - 1].replace("}", "");
                        fieldMapping2 = fieldMapping2[fieldMapping2.length - 1].replace("}", "");
                        return record[fieldMapping1] || record[fieldMapping2];
                    } else {
                        fieldMapping = fieldMapping.split(".");
                        fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
                        return record[fieldMapping];
                    }
                } else {
                    return fieldMapping;
                }
            } else {
                return fieldMapping;
            }
        },



    /**
     * Component groupResponseData
     * group the service response by status decider
     * data {object} - should be array of objects
     * key {string} - should be a string 
     * @return : {boolean} - grouped response datas will be passed
     */
    groupResponseData : function (data, key) {
      var self = this;
      try{
        if(data!==undefined && data!="" && data!=null)
          return data.reduce(function (value, obj) {
            (value[obj[key]] = value[obj[key]] || []).push(obj);
            return value;
          }, {});
        else return {};
      }catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setting groupResponseData",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
    },
    /*
         * Component txtBoxOnKeyUp
         * Responsible to perform search operation and update segment data 
         */
    fromAccSearch : function() {
      var self = this;
      try {
        this.view.imgFromCloseIcon.setVisibility(true);
        var searchTxt = this.view.tbxFromSearch.text.toLowerCase();
        this.searchApplied = false;
        if (searchTxt !== "") {
          var result = [];
          var data = this.filteredFromAcc;
          for (var i = 0; i < data.length; i++) {
            if (data[i].lblField1.toLowerCase().indexOf(searchTxt) !== -1) {
              result.push(data[i]);
            }
          }
          if (!(result.length > 0)) {
            this.view.segFromAccounts.setVisibility(false);
            this.view.flxFromNoResults.setVisibility(true);
          } else {
            this.searchApplied = true;
            this.filteredFromAcc= result;
            this.performFromAccountsUIActions();
          }
        } else {
          this.clearTextBoxTexts();
        }
        this.view.forceLayout();
      } catch (e) {
        var errorObj = {
          "errorInfo": "Error in performing search",
          "errorLevel": "Buisness",
          "error": e
        };
        this.onError(errorObj);
      }
    },
    /*
     * Component clearTextBoxTexts
     * Responsible to clear text box texts  
     */
    clearTextBoxTexts : function(){
      this.view.tbxFromSearch.text="";
      this.view.imgFromCloseIcon.setVisibility(false);
      this.searchApplied = false;
      this.view.segFromAccounts.removeAll();
      this.getFromAccounts();
      this.view.segFromAccounts.setVisibility(true);
      this.view.flxFromNoResults.setVisibility(false);
    },
    /*
     * Component filterRecordsList
     * Responsible to perform filter operation based on the contract
     */
    filterRecordsList : function(data){
      var self = this;
      try{
        var stackLength = self.stack.length;
        var currentScreen = self.stack[stackLength - 1];
        if(currentScreen==="flxFromAccount"){
          if(self.filterFromAccounts && self.filterType){
            var filterList = self.filterFromAccounts.split(",");
            var filterVariable = self.filterType;
            var filteredRecords =data.filter(function (record) {
              var removeRecord =  false;
              for(var i=0;i<filterList.length;i++){
                if(record[filterVariable] === filterList[i])
                {
                  removeRecord =  true;
                }
              }  
              return !removeRecord;
            });
            data = filteredRecords;
          }
          return data;
        }
      }
      catch(e){
        var errorObj =
            {
              "errorInfo" : "Error in performing filter operation",
              "errorLevel" : "Buisness",
              "error": e
            };
        this.onError(errorObj);
      }
    },
    /**
         ** Component navigateTo
         * Using navigateTo we navigate one form to another form in that we store formName in a stack
         * @param {string} flxName , navigates to that form.
         * @param {string} flxHeaderName , Custom Header name.
         * @param {string} headerTitle , Header title.
         */
    navigateTo : function(flxName, flxHeaderName, headerTitle) {
      try {
        var scope = this;
        if (flxName) {
          scope.stack.push(flxName);
          var stackLength = scope.stack.length;
          var nextScreen = scope.stack[stackLength - 1];
         var currentScreen = [];
         if(stackLength <= 1)
             currentScreen = this.lastScreen;
          else
              currentScreen = scope.stack[stackLength - 2];
          if (!scope.isEmptyNullUndefined(flxHeaderName)) {
            scope.setHeaderProperties(flxHeaderName);
          }
          if(currentScreen)
          scope.view[currentScreen].setVisibility(false);
          scope.view[nextScreen].setVisibility(true);
          if (kony.os.deviceInfo().name === "iPhone" && !scope.isEmptyNullUndefined(headerTitle)) {
            scope.headerTitleStack.push(headerTitle);
            var properties = {
              "stack": scope.stack,
              "headerTitle": headerTitle,
              "cancelText":kony.i18n.getLocalizedString("kony.mb.common.Cancel"),
              "backButtonImage": "backbutton.png"
            };
            scope.iPhoneHeaderProps(properties);
          }
          scope.view.forceLayout();
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in navigateTo method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
         * Component setHeaderProperties
         * To make custom header visibility based on platform.
         */
    setHeaderProperties : function(headerFlex) {
      try {
        var scope = this;
        if (kony.os.deviceInfo().name === "iPhone") {
          scope.view[headerFlex].setVisibility(false);
        } else {
          scope.view[headerFlex].setVisibility(true);
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in setHeaderProperties method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Component getToAccountsScrren
     * Navigate to Next flex .
 */
    getToAccountsScreen : function(){
      var scope = this;
      var selectedData = this.view.segFromAccounts.selectedRowItems;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["Membership_id"] = selectedData[0].membershipId;
      this.invokeRender =false;
      scope.businessController.setDataInCollection("TransactionObject",transactionObject);
      scope.setSelectedFromAccountsData(selectedData);
      if(scope.amountSelectedFlowType === "From" && scope.fromAccountEdit === "false"){
        scope.navigateTo("flxAmount", "flxAmountTop", "Amount");  
        scope.setTransferAmount(); 
      }
      else if(scope.fromAccountEdit === "true"){
        scope.setVerifyDetails();
        scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails")); 
      }
      else
        scope.navigateTo("flxToAccount", "flxToTop", "Transfer To");
      scope.groupToAccounts(selectedData);
    },
    /**
     * Component bindDurationData
     * Reponsible to set field properties of Duration.
     */
    bindDurationData : function(){
       var scope=this;
      try{
        scope.view.imgDurationBack.src = "backbutton.png";
        this.view.flxDurationHeaderTop.skin = "sknFlx0095e4";
        this.view.lblDuratonHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblDurationHeader", this.controllerScope._dataMapping["segments"]);
        this.view.lblDuratonHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.flxDurationBack.onTouchStart=scope.goBack;
        var durationOptions=this.getMasterDataForDuration();
        var durationList=[];
        for(var i = 0; i < durationOptions.length;i++){
          var durationArr={};
          durationArr["lblFrequency"] = {
            "skin" : "sknLbl424242SSP26px",
            "text": durationOptions[i][0]
          }
          durationArr["id"] = durationOptions[i][1];
          this.collectionObj = MakeATransferStore.getState();
          if(!this.isEmptyNullUndefined(this.collectionObj["Collection"])  && !this.isEmptyNullUndefined(this.collectionObj["Collection"]["TransactionObject"]) && this.collectionObj["Collection"]["TransactionObject"]["duration"] == durationArr["id"]) 
          {
            durationArr["flxMain"] = {
              "skin" : "ICSknFlxF6F6F6Radius26px"
            }
          }else{
            durationArr["flxMain"] = {
              "skin" : ""
            }
          }
          durationList.push(durationArr);          
        }  
        var widgetMap = {
          "flxMain":"flxMain",
          "lblFrequency":"lblFrequency",
          "id":"id"
        };
        this.view.segDurationOptions.widgetDataMap = widgetMap;
        this.view.segDurationOptions.onRowClick = this.onDurationSelection.bind(this);
        this.view.segDurationOptions.setData(durationList);
        this.view.flxDurationMainContainer.forceLayout();
      }catch (err) {
        var self = this;
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the bindDurationMasterData of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Component bindFrequencyMasterData
     * Reponsible to set field properties of Frequency.
     */
    bindFrequencyMasterData : function()
    {
      var scope=this;
      try{
        scope.view.imgFrequencyBack.src = "backbutton.png";
        this.view.flxFrequencyHeaderTop.skin = "sknFlx0095e4";
        this.view.lblFrequencyHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblFrequencyHeader", this.controllerScope._dataMapping["segments"]);
        this.view.lblFrequencyHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.flxFrequencyBack.onTouchStart=scope.goBack;
        var frequencyOptions=this.getMasterDataForFrequency();
        var frequencyList=[];
        for(var i = 0; i < frequencyOptions.length;i++){
          var frequencyArr={};
          frequencyArr["lblFrequency"] = {
            "skin" : "sknLbl424242SSP26px",
            "text": frequencyOptions[i][0]
          }
          frequencyArr["id"] = frequencyOptions[i][1];
          this.collectionObj = MakeATransferStore.getState();
          if(!this.isEmptyNullUndefined(this.collectionObj["Collection"])  && !this.isEmptyNullUndefined(this.collectionObj["Collection"]["TransactionObject"]) && this.collectionObj["Collection"]["TransactionObject"]["frequency"] == frequencyArr["id"]) 
          {
            frequencyArr["flxMain"] = {
              "skin" : "ICSknFlxF6F6F6Radius26px"
            }
          }else{
            frequencyArr["flxMain"] = {
              "skin" : ""
            }
          }
          frequencyList.push(frequencyArr);          
        }  
        var widgetMap = {
          "flxMain":"flxMain",
          "lblFrequency":"lblFrequency",
          "id":"id"
        };
        this.view.segFrequencyOptions.widgetDataMap = widgetMap;
        this.view.segFrequencyOptions.onRowClick = this.onFrequencySelection.bind(this);
        this.view.segFrequencyOptions.setData(frequencyList);
        this.view.flxMainContainer.forceLayout();
      }catch (err) {
        var self = this;
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the bindFrequencyMasterData of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    getMasterDataForFrequency : function(){
      var masterData = [];
      try{
        var dataMapping = this.controllerScope._dataMapping;
        var labels = {};
        var values = {};
        if(dataMapping["segments"] && dataMapping["segments"]["segFrequencyOptions"]){
          labels = dataMapping["segments"]["segFrequencyOptions"]["Labels"];
          values = dataMapping["segments"]["segFrequencyOptions"]["Values"];
        }
        for(var key in labels){
          if(!labels[key].indexOf("${i18n")) {
            var fieldValue = labels[key];
            labels[key] = kony.i18n.getLocalizedString(fieldValue.substring
                                                       (fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? 
              kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, 
                                                                fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}")+1, fieldValue.length - 1)
            : fieldValue;
          }
          var field = [];
          field.push(labels[key]);
          field.push(values[key+"Value"]);
          masterData.push(field);
        }
        return masterData;
      }
      catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the getMasterDataForFrequency of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    getMasterDataForDuration : function(){
       var masterData = [];
      try{
        var dataMapping = this.controllerScope._dataMapping;
        var labels = {};
        var values = {};
        if(dataMapping["segments"] && dataMapping["segments"]["segDurationOptions"]){
          labels = dataMapping["segments"]["segDurationOptions"]["Labels"];
          values = dataMapping["segments"]["segDurationOptions"]["Values"];
        }
        for(var key in labels){
          if(!labels[key].indexOf("${i18n")) {
            var fieldValue = labels[key];
            labels[key] = kony.i18n.getLocalizedString(fieldValue.substring
                                                       (fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? 
              kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, 
                                                                fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}")+1, fieldValue.length - 1)
            : fieldValue;
          }
          var field = [];
          field.push(labels[key]);
          field.push(values[key+"Value"]);
          masterData.push(field);
        }
        return masterData;
      }
      catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the getMasterDataForDuration of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**     
   * Component selectDuration
     * To pass the selected data to next screen.
     */
    onDurationSelection : function(){
      try{
        var scope = this; 
        var segmentData=JSON.parse(JSON.stringify(this.view.segDurationOptions.data));
        var selectedData=this.view.segDurationOptions.selectedRowItems;
        var selectedRow=this.view.segDurationOptions.selectedRowIndex[1];            
        for(var i=0;i<segmentData.length;i++){         
          segmentData[i]["flxMain"] = {
            "skin" :""            
          };                    
        }
        selectedData[0]["flxMain"] = {
          "skin" : "ICSknFlxF6F6F6Radius26px"
        };
        this.view.segDurationOptions.setData(segmentData);       
        this.view.segDurationOptions.setDataAt(selectedData[0], selectedRow);   
        var duration = selectedData[0]["id"];
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formattedObject = object["Collection"]["FormattedData"];
        transactionObject["duration"] = duration;
        formattedObject["duration"] = duration;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
        this.setDate("flxStartDate"); 
        this.navigateTo("flxDate", "flxSendOnTop", kony.i18n.getLocalizedString("kony.mb.common.StartDate"));
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onDurationSelection method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component selectFrequency
     * To pass the selected data to next screen.
     */
    onFrequencySelection : function()
    {
      try{
        var scope = this;
        var segmentData=JSON.parse(JSON.stringify(this.view.segFrequencyOptions.data));
        var selectedData=this.view.segFrequencyOptions.selectedRowItems;
        var selectedRow=this.view.segFrequencyOptions.selectedRowIndex[1];            
        for(var i=0;i<segmentData.length;i++){         
          segmentData[i]["flxMain"] = {
            "skin" :""            
          };                    
        }
        selectedData[0]["flxMain"] = {
          "skin" : "ICSknFlxF6F6F6Radius26px"
        };
        this.view.segFrequencyOptions.setData(segmentData);       
        this.view.segFrequencyOptions.setDataAt(selectedData[0], selectedRow);   
        var frequency = selectedData[0]["id"];
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formattedObject = object["Collection"]["FormattedData"];
        transactionObject["frequency"] = frequency;
        formattedObject["frequencyType"] = frequency;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
        if(frequency == kony.i18n.getLocalizedString("kony.mb.MM.Once"))
        {
          this.setVerifyDetails(); 
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
        }
        else
        {
          this.bindDurationData();
          this.navigateTo("flxDurationSelection", "flxDurationTop","Duration");
//           this.setDate("flxStartDate"); 
//           this.navigateTo("flxDate", "flxSendOnTop", kony.i18n.getLocalizedString("kony.mb.common.StartDate"));
        }

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onFrequencySelection method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component onPurposeCodeSelection
     * To pass the selected data to next screen.
     */
    onPurposeCodeSelection : function(){
      try {
          var segmentData = this.view.segPurposeCodeOptions.data;
          var selectedData = this.view.segPurposeCodeOptions.selectedRowItems;
          var selectedRow = this.view.segPurposeCodeOptions.selectedRowIndex[1];
          for (var i = 0; i < segmentData.length; i++) {
              segmentData[i]["flxMain"] = {
                  skin: "",
              };
          }
          selectedData[0]["flxMain"] = {
              skin: "ICSknFlxF6F6F6Radius26px",
          };
          this.view.segPurposeCodeOptions.setData(segmentData);
          this.view.segPurposeCodeOptions.setDataAt(selectedData[0], selectedRow);
          var purposeCode = selectedData[0]["code"];
          this.invokeRender = false;
          var collectionObj = MakeATransferStore.getState();
          var transactionObject = collectionObj["Collection"]["TransactionObject"];
          transactionObject["purposeCode"] = purposeCode;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
      } catch (err) {
          var errObj = {
              errorInfo: "Error in onPurposeCodeSelection method of the component.",
              errorLevel: "Configuration",
              error: err,
          };
          this.onError(errObj);
      }
    },

        /**     
   * Component onBankCountrySelection
     * To pass the selected data to next screen.
     */
        onBankCountrySelection : function(){
          try {
              var segmentData = this.view.segBankCountryOptions.data;
              var selectedData = this.view.segBankCountryOptions.selectedRowItems;
              var selectedRow = this.view.segBankCountryOptions.selectedRowIndex[1];
              for (var i = 0; i < segmentData.length; i++) {
                  segmentData[i]["flxMain"] = {
                      skin: "",
                  };
              }
              selectedData[0]["flxMain"] = {
                  skin: "ICSknFlxF6F6F6Radius26px",
              };
              this.view.segBankCountryOptions.setData(segmentData);
              this.view.segBankCountryOptions.setDataAt(selectedData[0], selectedRow);
              var selectedCountry = selectedData[0]["code"];
              this.invokeRender = false;
              var collectionObj = MakeATransferStore.getState();
              var transactionObject = collectionObj["Collection"]["TransactionObject"];
              transactionObject["Country"] = selectedCountry;
              this.businessController.setDataInCollection("TransactionObject", transactionObject);
              //this.setVerifyDetails();
              this.goBack();
          } catch (err) {
              var errObj = {
                  errorInfo: "Error in onBankCountrySelection method of the component.",
                  errorLevel: "Configuration",
                  error: err,
              };
              this.onError(errObj);
          }
        },

           /**     
   * Component onClearingIdentifierCodeSelection
     * To pass the selected data to next screen.
     */
    onClearingIdentifierCodeSelection : function(){
      try {
          var segmentData = this.view.segClearingIdentifierCodeOptions.data;
          var selectedData = this.view.segClearingIdentifierCodeOptions.selectedRowItems;
          var selectedRow = this.view.segClearingIdentifierCodeOptions.selectedRowIndex[1];
          for (var i = 0; i < segmentData.length; i++) {
              segmentData[i]["flxMain"] = {
                  skin: "",
              };
          }
          selectedData[0]["flxMain"] = {
              skin: "ICSknFlxF6F6F6Radius26px",
          };
          this.view.segClearingIdentifierCodeOptions.setData(segmentData);
          this.view.segClearingIdentifierCodeOptions.setDataAt(selectedData[0], selectedRow);
          var clearingIdentifierCode = selectedData[0]["code"];
          this.invokeRender = false;
          var collectionObj = MakeATransferStore.getState();
          var transactionObject = collectionObj["Collection"]["TransactionObject"];
          transactionObject["clearingIdentifierCode"] = clearingIdentifierCode.split("-")[0].trim();
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
          this.setDataAndNavigateBasedOnPreviousScreen();
      } catch (err) {
          var errObj = {
              errorInfo: "Error in onClearingIdentifierCodeSelection method of the component.",
              errorLevel: "Configuration",
              error: err,
          };
          this.onError(errObj);
      }
    },

    /**
   * Using goBack we navigates to previous form from the current form
   * @param {string} navDetails , which contains all the details about current form
   */
    goBack : function() {
      try{
        var scope = this;
        var stackLength = scope.stack.length;
        var currentScreen = scope.stack[stackLength - 1];
        var previousScreen = scope.stack[stackLength - 2];
        scope.view[previousScreen].setVisibility(true);
        scope.view[currentScreen].setVisibility(false);
        scope.stack.pop();
        if(kony.os.deviceInfo().name === "iPhone") {
          scope.headerTitleStack.pop();
          var nativeTitle = scope.headerTitleStack[scope.headerTitleStack.length - 1];
          var properties ={
            "stack" : scope.stack,
            "headerTitle": nativeTitle,
            "cancelText" : !scope.isEmptyNullUndefined(kony.i18n.getLocalizedString("kony.mb.common.Cancel")) ? kony.i18n.getLocalizedString("kony.mb.common.Cancel") : "",
            "backButtonImage" : "backbutton.png"
          }
          scope.iPhoneHeaderProps(properties);
        }
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in goBack method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined : function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },

    hideData : function() {
      if(this.context["transferType"] === "Domestic Transfer") {
        if(this.payeeFlow === "Existing") {
          this.view.flxField14.setVisibility(false);
        }
      }
      else if(this.context["transferType"] === "International Transfer") {
        if(this.payeeFlow === "Existing") {
          this.view.flxField14.setVisibility(false);
          this.view.flxField15.setVisibility(false);
          this.view.flxField16.setVisibility(false);
          this.view.flxField17.setVisibility(false);
        }
      }
      else {
        // this.view.flxField14.setVisibility(true);
        // this.view.flxField15.setVisibility(true);
        // this.view.flxField16.setVisibility(true);
        // this.view.flxField17.setVisibility(true);
      }
    },

    setVerifyDetails : function(){
      var scope = this,flag = 0;
      var dataMapping=this.controllerScope._dataMapping
      scope.context["selectedFlowType"] = "ADD";
    
      scope.view.lblVerifyName.text = this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", dataMapping["flxVerifyDetails"]);
      scope.view.imgVerifyBack.src = "backbutton.png";
      scope.view.imgVerifyBack.onTouchStart = scope.onVerifyDetailsBack.bind(this);
      scope.view.btnVerifyCancel.onClick = scope.onBack.bind(this);
      scope.view.btnVerifyCancel.text =this.businessController.getParsedDataBasedOnDataMapping("btnVerifyCancel", dataMapping["flxVerifyDetails"]);
      scope.view.btnVerifyCancel.skin ="ICSKnBtnffffff15px";
      scope.view.flxVerifyHeader.skin ="sknFlx0095e4";
      scope.setSupportingDocuments();
      scope.setInitialVerifyDetails();
      scope.setFormattedValues();
      scope.setFromandToAccounts();
      scope.setFieldData();
      scope.hideData();
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      if(transactionObject["selectedPaymentMethod"]=== "Instant" || transactionObject["selectedPaymentMethod"]=== "Non - Instant" || scope.context["transferType"] == "Pay a Person") {
      scope.enableButton("btnTransfer"); 
      } else {
      scope.disableButton("btnTransfer");
      }
      //Desciption Mapping 
      scope.view.txtDescription.text = "";
      scope.view.lblDescription.text =this.businessController.getParsedDataBasedOnDataMapping("lblDescription", dataMapping["flxVerifyDetails"]);
      scope.view.lblDescription.skin = "sknMMLeftLabels";
      scope.view.txtDescription.placeholder = scope.businessController.getParsedDataBasedOnDataMapping("placeHolder", dataMapping["flxVerifyDetails"]["txtDescription"]);
      scope.view.txtDescription.restrictCharactersSet = scope.businessController.getParsedDataBasedOnDataMapping("restrictChars", dataMapping["flxVerifyDetails"]["txtDescription"]);
      scope.view.txtDescription.maxTextLength =scope.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxVerifyDetails"]["txtDescription"]);
      // create Transaction 
      scope.view.btnTransfer.setVisibility(true);
      scope.view.btnTransfer.text = this.businessController.getParsedDataBasedOnDataMapping("btnTransfer", dataMapping["flxVerifyDetails"]);
      scope.view.btnTransfer.onClick = function() {
         var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        transactionObject["notes"]=scope.view.txtDescription.text;
        scope.invokeRender=false;
        scope.isRepeatFlow = false;
        scope.businessController.setDataInCollection("TransactionObject",transactionObject);
        if (scope.payeeFlow === "New") {
           scope.invokeRender=true;
          scope.businessController.createOTTransaction();
        } else {
            if(scope.context["transferType"]=== "Within Same Bank"){
               if (transactionObject["beneType"]=== "internal"  && transactionObject["toAccountType"] === "CreditCard") {
                scope.invokeRender=true; 
               scope.businessController.createCreditCardTransaction();
               }
              if(transactionObject["beneType"]=== "internal" && transactionObject["toAccountType"] !== "CreditCard"){
                 scope.invokeRender=true;
                if(scope.isEditFlow == true && scope.isToAccountEditable == false)
                  scope.businessController.EditOwnAccountsTransferCreate();
                  else
                scope.businessController.CreateOwnAccountsTransfer();
              }
                  
              if(transactionObject["beneType"]=== "external"){
                 scope.invokeRender=true;
                if(scope.isEditFlow == true && scope.isToAccountEditable == false)
                  scope.businessController.createTransactionforEditFlow();
                else
                  scope.businessController.createTransaction();
              }    
             }
             else{
               scope.invokeRender=true;
              if(scope.isEditFlow == true && scope.isToAccountEditable == false)
                  scope.businessController.createTransactionforEditFlow();
                else
                  scope.businessController.createTransaction();
             }       
        }
      };

      scope.view.flxAddress.setVisibility(false);
      scope.view.flxAddressSeparator.setVisibility(false);
      if(transactionObject["beneType"] !== "internal")
      {
        scope.view.flxAddress.setVisibility(false);//osama
        scope.view.flxAddressSeparator.setVisibility(false);//osama
        var beneAddressLabel = this.businessController.getParsedDataBasedOnDataMapping("lblAddressLabel", dataMapping["flxAddress"]);
         if (scope.payeeFlow === "Existing"){
          scope.view.flxAddress.setEnabled(false);
          scope.view.imgBeneArrow.setVisibility(false);
          scope.view.flxAddress.skin = "ICSknFlxf9f9f9Plain";
        } else  {
          scope.view.flxAddress.setEnabled(false);//osama
          scope.view.imgBeneArrow.setVisibility(false);//osama
          scope.view.flxAddress.skin = "sknFlxffffff";
        }
		scope.view.flxAddress.onClick = function(){
          scope.context["selectedFlowType"] = "EDIT" 
          scope.setBeneficiaryAddress();
          scope.navigateTo("flxAddAddress", "flxAddAddressHeaderTop","Add Address");
        }
      }
	   if(scope.context["transferType"] == "Pay a Person"){
		scope.view.flxAddress.setVisibility(false);
		scope.view.flxAddressSeparator.setVisibility(false);
	   }
      var beneAddressLine1 = this.businessController.getParsedDataBasedOnDataMapping("lblAddress1", dataMapping["flxAddress"]);
      var beneAddressLine2 = this.businessController.getParsedDataBasedOnDataMapping("lblAddress2", dataMapping["flxAddress"]);
      var beneCity = this.businessController.getParsedDataBasedOnDataMapping("lblCityValue", dataMapping["flxAddress"]);
      var beneCountry = this.businessController.getParsedDataBasedOnDataMapping("lblCountryValue", dataMapping["flxAddress"]);
      var beneMobile = this.businessController.getParsedDataBasedOnDataMapping("lblMobileValue", dataMapping["flxAddress"]);
      var beneEmail = this.businessController.getParsedDataBasedOnDataMapping("lblEmailValue", dataMapping["flxAddress"]);
      var beneZipcode = this.businessController.getParsedDataBasedOnDataMapping("lblPostalCodeValue", dataMapping["flxAddress"]);
      var beneState = this.businessController.getParsedDataBasedOnDataMapping("lblStateValue", dataMapping["flxAddress"]);

      scope.view.lblAddressLabel.text = beneAddressLabel;
      scope.view.lblAddress1.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneAddressLine1))
      {
        scope.view.lblAddress1.setVisibility(true);
        scope.view.lblAddress1.text = beneAddressLine1;

      }
      scope.view.lblAddress2.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneAddressLine2))
      {
        scope.view.lblAddress2.setVisibility(true);
        scope.view.lblAddress2.text = beneAddressLine2;

      }
      scope.view.flxMobile.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneMobile))
      {
        scope.view.flxMobile.setVisibility(true);
        scope.view.lblMobileValue.text = beneMobile;

      }
      scope.view.flxEmail.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneEmail))
      {
        scope.view.flxEmail.setVisibility(true);
        scope.view.lblEmailValue.text = beneEmail;

      }
      scope.view.flxCity.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneCity))
      {
        scope.view.flxCity.setVisibility(true);
        scope.view.lblCityValue.text = beneCity;

      }
      scope.view.flxState.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneState))
      {
        scope.view.flxState.setVisibility(true);
        scope.view.lblStateValue.text = beneState;

      }
      scope.view.flxCountry.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneCountry))
      {
        scope.view.flxCountry.setVisibility(true);
        scope.view.lblCountryValue.text = beneCountry;

      }
      scope.view.flxPostalCode.setVisibility(false);
      if(!scope.isEmptyNullUndefined(beneZipcode))
      {
        scope.view.flxPostalCode.setVisibility(true);
        scope.view.lblPostalCodeValue.text = beneZipcode;

      }
      if (scope.payeeFlow === "New") {
         transactionObject["serviceName"] = scope.serviceParameters.validateOTTransaction.Service;
         transactionObject["operationName"] = scope.serviceParameters.validateOTTransaction.Verb;
         transactionObject["action"] = scope.serviceParameters.validateOTTransaction.Verb;
         transactionObject["dataModel"] = scope.serviceParameters.validateOTTransaction.Object;
          scope.invokeRender = false;
         scope.businessController.setDataInCollection("TransactionObject",transactionObject);
        scope.invokeRender = true;
        scope.businessController.ValidateOTTDetails();
      } else {
        if(scope.context["transferType"]=== "Within Same Bank"){
          if (transactionObject["beneType"]=== "internal"  && transactionObject["toAccountType"] === "CreditCard") {
             transactionObject["serviceName"] = scope.serviceParameters.validateCreditCardTransaction.Service;
             transactionObject["operationName"] = scope.serviceParameters.validateCreditCardTransaction.Verb;
             transactionObject["action"] = scope.serviceParameters.validateCreditCardTransaction.Verb;
             transactionObject["dataModel"] = scope.serviceParameters.validateCreditCardTransaction.Object;
             scope.invokeRender = false;
            scope.businessController.setDataInCollection("TransactionObject",transactionObject);
            scope.invokeRender = true;  
            scope.businessController.validateCreditCardTransaction();
          }
          if(transactionObject["beneType"]=== "internal" && transactionObject["toAccountType"] !== "CreditCard"){
            transactionObject["serviceName"] = scope.serviceParameters.OwnAccountsValidate.Service;
            transactionObject["operationName"] = scope.serviceParameters.OwnAccountsValidate.Verb;
            transactionObject["action"] = scope.serviceParameters.OwnAccountsValidate.Verb;
            transactionObject["dataModel"] = scope.serviceParameters.OwnAccountsValidate.Object;
             scope.invokeRender = false;
            scope.businessController.setDataInCollection("TransactionObject",transactionObject);
            scope.invokeRender = true;
            scope.businessController.ownAccountsValidate();
          }

          if(transactionObject["beneType"]=== "external"){
          transactionObject["serviceName"] = scope.serviceParameters.validateATransfer.Service;
            transactionObject["operationName"] = scope.serviceParameters.validateATransfer.Verb;
            transactionObject["action"] = scope.serviceParameters.validateATransfer.Verb;
            transactionObject["dataModel"] = scope.serviceParameters.validateATransfer.Object;
            scope.invokeRender = false; 
            scope.businessController.setDataInCollection("TransactionObject",transactionObject);
            scope.invokeRender = true;
            scope.businessController.ValidateDetails();
          }
        } else if(scope.context["transferType"]=== "Domestic Transfer"){
          this.setProprietary();
            transactionObject["serviceName"] = scope.serviceParameters.validateATransfer.Service;
            transactionObject["operationName"] = scope.serviceParameters.validateATransfer.Verb;
            transactionObject["action"] = scope.serviceParameters.validateATransfer.Verb;
            transactionObject["dataModel"] = scope.serviceParameters.validateATransfer.Object;
            scope.invokeRender = false; 
            scope.businessController.setDataInCollection("TransactionObject",transactionObject);
            scope.invokeRender = true;
            scope.businessController.ValidateDetails()
        }else if(scope.context["transferType"]=== "Pay a Person"){
        } else {
          transactionObject["serviceName"] = scope.serviceParameters.validateATransfer.Service;
         transactionObject["operationName"] = scope.serviceParameters.validateATransfer.Verb;
         transactionObject["action"] = scope.serviceParameters.validateATransfer.Verb;
         transactionObject["dataModel"] = scope.serviceParameters.validateATransfer.Object;
          scope.invokeRender = false; 
         scope.businessController.setDataInCollection("TransactionObject",transactionObject);
         scope.invokeRender = true;
          scope.businessController.ValidateDetails()
        }
        if (this.isEditFlow) {
          this.view.flxAddress.setEnabled(false);
          this.view.flxFromArrow.setVisibility(false);
          this.view.flxToArrow.setVisibility(false);
          this.view.flxSupportingDocuments.setEnabled(false);
          this.view.imgBeneArrow.setVisibility(false);
          this.view.flxAddiconWrapper.setVisibility(false);
        } else {
          this.view.flxAddress.setEnabled(false);//osama
          this.view.flxFromArrow.setVisibility(true);
          this.view.flxToArrow.setVisibility(true);
          this.view.flxSupportingDocuments.setEnabled(false);
          this.view.imgBeneArrow.setVisibility(true);
          this.view.flxAddiconWrapper.setVisibility(true);
        }
      }
      scope.view.forceLayout();

    },
    /**     
   * Component setBeneficiaryAddress
     * To add beneficiary address 
     * Enabling default parameters
    **/  
    setBeneficiaryAddress : function(){      
      try {
        var scope = this;
        scope.setAddAddressScreenData();
        var dataMapping=this.controllerScope._dataMapping;
        scope.view.btnSave.text= this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxAddAddress"]["addAddressBtn"]);
        for(var i=1;i<=8;i++){
          var addresslbl="addAddressField"+i+"Lbl";
          scope.view["lblAddressField"+i].text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxAddAddress"][addresslbl]);
        }
        var transferType = scope.context["selectedFlowType"];
        if(transferType === "EDIT") {
          scope.populateValuesforEdit();
          for(var i=1;i<=8;i++){
            var addlbl="addAddressField"+i+"Value";
            scope.view['txtAddressFieldValue'+i].skin = "ICSknTxtE3E3E31px34px";
            scope.view['txtAddressFieldValue'+i].focusSkin = "ICSknTxt003E751px";
            scope.view['txtAddressFieldValue' +i].maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxAddAddress"][addlbl]["length"]);
          }
        }else{
          for(var i=1;i<=8;i++){
            var addressValue="addAddressField"+i+"Value";
            var fieldJSON = this.businessController.getDataMappingforObject(dataMapping["flxAddAddress"][addressValue]);
            if(fieldJSON){
              scope.setTextBoxInputModeAndMasking(fieldJSON, "txtAddressFieldValue"+i); 
              scope.setTextBoxPlaceHolder(fieldJSON, "txtAddressFieldValue"+i);
              scope.updateContextAddAddress(("txtAddressFieldValue"+i), scope.view['txtAddressFieldValue' + i].text);  
              scope.view['txtAddressFieldValue'+i].maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxAddAddress"][addressValue]["length"]);
            }
          }
        }
        scope.enableButton("btnSave");
        scope.view.txtAddressFieldValue1.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue1",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField1Value"]));
        scope.view.txtAddressFieldValue2.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue2",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField2Value"]));
        scope.view.txtAddressFieldValue3.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue3",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField3Value"]));
        scope.view.txtAddressFieldValue4.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue4",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField4Value"]));
        scope.view.txtAddressFieldValue5.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue5",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField5Value"]));
        //scope.view.txtAddressFieldValue6.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue6",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField6Value"]));
        scope.view.txtAddressFieldValue7.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue7",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField7Value"]));
        scope.view.txtAddressFieldValue7.restrictCharactersSet = scope.businessController.getParsedDataBasedOnDataMapping("countryRestrictCharacterSet", dataMapping["flxAddAddress"]["addAddressField7Value"]);
		scope.view.txtAddressFieldValue8.onTextChange = scope.onBeneficiaryAddressTextChange.bind(this, "txtAddressFieldValue8",this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"]["addAddressField8Value"]));
        scope.view.flxAddAddress.flxBtnSave.btnSave.onClick = scope.onBeneficiaryAddressOnClick.bind(this);
        scope.view.flxAddAddressBack.onTouchEnd = scope.goBack.bind(this);
        scope.view.btnAddAddressCancel.onClick = scope.onBack.bind(this);
        scope.view.flxAddAddress.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setBeneficiaryAddress method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    onBeneficiaryAddressTextChange : function(fieldJSON,fieldType){
      try{
        var scope = this;
        var inputText = scope.view[fieldJSON].text;
        var fieldLength = scope.view[fieldJSON].length;
        scope.view.lblAddAddressErrorMsg.setVisibility(false);
        if(!scope.isEmptyNullUndefined(inputText)){
          if(fieldType === "phoneNumber"){
            scope.addressPhoneNumber = inputText;
            scope.addressPhoneNumber = scope.addressPhoneNumber.replace(/\+1/g, "");
            scope.addressPhoneNumber = scope.addressPhoneNumber.replace(/\(/g, "");
            scope.addressPhoneNumber = scope.addressPhoneNumber.replace(/\)/g, "");
            scope.addressPhoneNumber = scope.addressPhoneNumber.replace(/-/g, "");
            scope.addressPhoneNumber = scope.addressPhoneNumber.replace(/ /g, "");
            var phoneNoFormatted = "";
            var text =  scope.view[fieldJSON].text;
            var phoneNo = text;
            phoneNo = phoneNo.replace(/\+1/g, "");
            phoneNo = phoneNo.replace(/\(/g, "");
            phoneNo = phoneNo.replace(/\)/g, "");
            phoneNo = phoneNo.replace(/-/g, "");
            phoneNo = phoneNo.replace(/ /g, "");
            phoneNoFormatted= "+1 " + "(" + phoneNo.slice(0, 3) + ") " + phoneNo.slice(3, 6) + "-" + phoneNo.slice(6, 10);
            if(phoneNoFormatted == "+1 () -" || phoneNoFormatted == "+1 () " || phoneNoFormatted == "+1 "){
              phoneNoFormatted = "";
            }
            scope.view['fieldJSON'].text = phoneNoFormatted;
            scope.enableButton("btnSave");                                      
          }else{
            scope.enableButton("btnSave");                                      
          }
        }else{
          scope.view['fieldJSON'].skin = "ICSknTxtE3E3E31px34px";
          scope.enableButton("btnSave");                                            
        }
        scope.view.flxAddAddress.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onBeneficiaryAddressTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component setAddAddressScreenData
     * To set skin and text for widgets 
    **/  
    setAddAddressScreenData : function(){
      try{
        var scope =this;
        var dataMapping=this.controllerScope._dataMapping;
        //skins
        scope.view.flxAddAddressHeader.skin = "sknFlx0095e4"
        scope.view.imgAddAddressBack.src = "backbutton.png";
        scope.view.btnAddAddressCancel.skin = "ICSKnBtnffffff15px";
        scope.view.lblAddAddressHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.flxAddAddressDescription.skin = "sknFlxffffff";
        scope.view.lblAddAddressDescription.skin = "ICSknLbl727272SSPReg34px";
        scope.view.flxAddAddressSeparator.skin = "sknFlxSeparatora6a6a6";
        scope.view.lblAddAddressErrorMsg.skin = "ICSknLblEE000534px";
        scope.view.flxAddAddressMain.skin = "sknFlxffffff"
        scope.view.btnSave.focusSkin = "ICSknBtn003E7535PXmb";
        for(var i=1; i<=8; i++){
          var addressValue="addAddressField"+i+"Value";
          var fieldType = this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"][addressValue]);
          if(fieldType === "phoneNumber"){
            scope.view['txtAddressFieldValue'+i].textInputMode = "TEXTBOX_INPUT_MODE_NUMERIC";
          }
          scope.view['txtAddressFieldValue'+i].skin = "sknLbla0a0a0SSPReg22px";
          scope.view['txtAddressFieldValue'+i].skin = "ICSknTxtE3E3E31px34px";
          scope.view['txtAddressFieldValue'+i].focusSkin = "ICSknTxt003E751px";
        }
        //fieldText
        scope.view.lblAddAddressHeader.text = this.businessController.getParsedDataBasedOnDataMapping("titleAddAddress", dataMapping["flxAddAddress"]);      
        scope.view.lblAddAddressDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblAddAddress", dataMapping["flxAddAddress"]);
        scope.view.btnAddAddressCancel.text = this.businessController.getParsedDataBasedOnDataMapping("cancelButton", dataMapping["flxAddAddress"]);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setAddAddressScreenData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : populateValuesforEdit
     * populate the values for each text boxes on edit mode
     * @return : NA
     */
    populateValuesforEdit : function() {
      try{
        var scope = this;
        var dataMapping = this.controllerScope._dataMapping;
        for(var i=1;i<=8;i++){
          var addressValue="addAddressField"+i+"Value";
          var fieldJSON = this.businessController.getDataMappingforObject(dataMapping["flxAddAddress"][addressValue]);
          if(fieldJSON){
            scope.setTextBoxInputModeAndMasking(fieldJSON, "txtAddressFieldValue"+i); 
            scope.setTextBoxPlaceHolder(fieldJSON, "txtAddressFieldValue"+i);
            scope.populateTextIntoTextInput(fieldJSON, "txtAddressFieldValue"+i);
            scope.updateContextAddAddress(("txtAddressFieldValue"+i), scope.view['txtAddressFieldValue' + i].text);
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in populateValuesforEdit method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * setTextBoxInputModeAndMasking
     * @api : setTextBoxInputModeAndMasking
     * sets the input mode of the text box based on contract config
     * @return : NA
     */
    setTextBoxInputModeAndMasking : function(contractJSON, srcWidget) {
      try {
        var scope = this;
        var dataMapping = this.controllerScope._dataMapping;
        if(!(scope.isEmptyNullUndefined(contractJSON.inputMode))) {
          var characterSet = this.businessController.getParsedDataBasedOnDataMapping("addressRestrictCharacterSet", dataMapping["flxAddAddress"]); 
          if(contractJSON.inputMode === "NUMERIC" && contractJSON.fieldType !== "phoneNumber"){
            scope.view[srcWidget].restrictCharactersSet = characterSet;                                                                
          } 
          else if(contractJSON.inputMode === "NUMERIC" && contractJSON.fieldType === "phoneNumber"){
            scope.view[srcWidget].restrictCharactersSet =  this.businessController.getParsedDataBasedOnDataMapping("phoneNumberRestrictCharacterSet", dataMapping["flxAddAddress"]); 
          }else {
            scope.view[srcWidget].restrictCharactersSet = "";                      
          }
          return;
        } 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setTextBoxInputModeAndMasking method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * setTextBoxPlaceHolder
     * @api : setTextBoxPlaceHolder
     * maps the value of textbox to the placeholder assigned in contracts
     * @return : NA
     */
    setTextBoxPlaceHolder : function(contractJSON, tbxWidget) {
      try{
        var scope = this;
        //if(tbxWidget !== "txtAddressFieldValue5" || tbxWidget !== "txtAddressFieldValue6"){
        if(!(scope.isEmptyNullUndefined(contractJSON.placeHolder))) {
          var placeHolderValue = this.businessController.getParsedDataBasedOnDataMapping("placeHolder",contractJSON);
          scope.view[tbxWidget].placeholder =
            placeHolderValue ? placeHolderValue : "";
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setTextBoxPlaceHolder method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * populateTextIntoTextInput
     * @api : populateTextIntoTextInput
     * sets the data from the contractJSON to source widget
     * @return : NA
     */
    populateTextIntoTextInput : function(contractJSON, srcWidget) {
      try{
        var scope = this;
        if(!(scope.isEmptyNullUndefined(contractJSON))) {
          /*if(srcWidget === "txtAddressFieldValue5"){
            scope.view[srcWidget].selectedKey = scope.selectedCountry;
          }
          else if(srcWidget === "txtAddressFieldValue6"){
            scope.view[srcWidget].selectedKey = scope.selectedState;
          }*/        
          var contextValue = this.businessController.getParsedDataBasedOnDataMapping("text",contractJSON);
          scope.view[srcWidget].text = contextValue;
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in populateTextIntoTextInput method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /*
    * onBeneficiaryAddressOnClick
    * @api : onBeneficiaryAddressOnClick
    * button click event
    */
    onBeneficiaryAddressOnClick : function(){
      try{
        var scope = this;
        scope.onBeneficiaryAddressvalidation();
        if(scope.validAddress){
          scope.addressMinLengthValidation();
        }
        var noErrorText = scope.view.lblAddAddressErrorMsg.text;
        if(scope.isEmptyNullUndefined(noErrorText) && scope.validAddress === true) {
          scope.setVerifyDetails();
          scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
        }
        scope.view.flxAddAddress.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onBeneficiaryAddressOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * onBeneficiaryAddressvalidation
     * @api : onBeneficiaryAddressvalidation
     * validation for button onClick
     * @return : NA
     */
    onBeneficiaryAddressvalidation : function(){      
      try{
        var scope = this;
        var dataMapping=this.controllerScope._dataMapping;
        scope.view.lblAddAddressErrorMsg.text = "";
        for(var i=1; i<=8; i++){
          var fieldContext = "addAddressField"+i+"Value";
          var fieldType = this.businessController.getParsedDataBasedOnDataMapping("fieldType", dataMapping["flxAddAddress"][fieldContext]);
          var fieldText = scope.view['txtAddressFieldValue'+i].text;
          var fieldName = "txtAddressFieldValue"+i;
          if(!scope.isEmptyNullUndefined(fieldText)) {
            switch(fieldType){
              case "phoneNumber":
                var isValidPhoneNumber = this.businessController.isValidPhoneNumber(fieldText.toString());              
                if(isValidPhoneNumber){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              case "emailAddress":
                var isValidEmail = this.businessController.isValidEmail(fieldText);
                if(isValidEmail){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              case "postalCode":
                var isValidZip = this.businessController.isValidZip(fieldText);
                if(isValidZip){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              case "city":
                var isValidCity = this.businessController.isInvalidCharacterPresent(fieldText);
                if(isValidCity){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              case "country":
                var isValidCountry = this.businessController.isInvalidCharacterPresent(fieldText);
                if(isValidCountry){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              case "state":
                var isValidState = this.businessController.isInvalidCharacterPresent(fieldText);
                if(isValidState){
                  scope.updateContextAddAddress(fieldName, fieldText);
                }else{
                  scope.view[fieldName].skin = "ICSknTxtF54B5EBorder";
                  scope.view[fieldName].focusSkin = "ICSknTxtF54B5EBorder";
                  scope.view.lblAddAddressErrorMsg.setVisibility(true);
                  scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
                }
                break;
              default:
                scope.updateContextAddAddress(fieldName, fieldText);
            }
            var noErrorText = scope.view.lblAddAddressErrorMsg.text;
            if(!scope.isEmptyNullUndefined(noErrorText)) {
              scope.disableButton("btnSave");
              scope.validAddress = false;
              break;
            }else{
              scope.enableButton("btnSave");
              scope.validAddress = true;
            } 
          }else{
            scope.updateContextAddAddress(fieldName, fieldText);
            scope.validAddress = true;
          }
        }
        scope.view.flxAddAddress.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in onBeneficiaryAddressvalidation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * addressMinLengthValidation
     * @api : addressMinLengthValidation
     * validation for minimum length
     * @return : NA
     */
    addressMinLengthValidation : function(){
      try{
        var scope = this;
        scope.view.lblAddAddressErrorMsg.text = "";
        var dataMapping=this.controllerScope._dataMapping;
        for(var i=1; i<=8; i++){
          var inputText = scope.view['txtAddressFieldValue'+i].text;
          if(!this.isEmptyNullUndefined(inputText)) {
            var addlbl="addAddressField"+i+"Value";
            var minLength = this.businessController.getParsedDataBasedOnDataMapping("min", dataMapping["flxAddAddress"][addlbl]["length"]);
            var fieldLength = scope.view['txtAddressFieldValue'+i].text.length;
            if(fieldLength < minLength){
              scope.view['txtAddressFieldValue'+i].skin = "ICSknTxtF54B5EBorder";
              scope.view['txtAddressFieldValue'+i].focusSkin = "ICSknTxtF54B5EBorder";
              scope.view.lblAddAddressErrorMsg.setVisibility(true);
              scope.view.lblAddAddressErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("addAddressErrorMsg", dataMapping["flxAddAddress"]);
            }
            var noErrorText = scope.view.lblAddAddressErrorMsg.text;
            if(!scope.isEmptyNullUndefined(noErrorText)) {
              scope.disableButton("btnSave");
              scope.validAddress = false;
            }else{
              scope.enableButton("btnSave");
              scope.validAddress = true;
            } 
          }
        }
        scope.view.flxAddAddress.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in addressMinLengthValidation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : updateContextAddAddress
     * updates context
     * @return : NA
     */
    updateContextAddAddress : function(key, value) {
      try{
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formattedObject = object["Collection"]["FormattedData"];
        switch(key) 
        {
          case "txtAddressFieldValue1" :{
            transactionObject["phone"] = value;
            formattedObject["phone"] = value;
            break;
          }
          case "txtAddressFieldValue2" :{
            transactionObject["email"] = value;
            formattedObject["email"] = value;
            break;
          }
          case "txtAddressFieldValue3" :{
            transactionObject["addressLine1"] = value;
            formattedObject["addressLine1"] = value;
            break;
          }
          case "txtAddressFieldValue4" :{
            transactionObject["addressLine2"] = value;
            formattedObject["addressLine2"] = value;
            break;
          }
          case "txtAddressFieldValue5" :{
            transactionObject["country"] = value;
            formattedObject["country"] = value;
            break;
          }
          /*case "txtAddressFieldValue6" :{
            transactionObject["state"] = value;
            formattedObject["state"] = value;
            break;
          }*/
          case "txtAddressFieldValue7" :{
            transactionObject["city"] = value;
            formattedObject["city"] = value;
            break;
          }
          case "txtAddressFieldValue8" :{
            transactionObject["zipcode"] = value;
            formattedObject["zipcode"] = value;
            break;
          }
        }
        this.invokeRender = false;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in updateContextAddAddress method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component dateBackNavigation
     * Responsible to navigate to back scnearios from date screens
     * flxname - which is used to display sendon,startdate,enddate
     */
    dateBackNavigation : function()
    {
      var scope = this;
      if(this.flxname === "flxSendOn")
      {
        scope.goBack();
      }
      else if(this.flxname === "flxStartDate")
      {
        scope.goBack();
      }
      else if(this.flxname === "flxEndDate")
      {
        if(this.stack[this.stack.length-2] === "flxVerifyDetails")
        {
          scope.goBack();
        }
        else
        {
          for (let i =scope.stack.length-1; i >=0 ; i--) {
            if(scope.stack[i] === 'flxDate'){
              scope.stack.pop();
            }
            else{
              break;
            }
          }
          scope.setDate("flxStartDate");
          scope.navigateTo("flxDate", "flxSendOnTop", kony.i18n.getLocalizedString("kony.mb.common.StartDate"));    
        }
      }
    },

    /**
     * Component getTomorrowsDate
     * Responsible to view the date screens
     * flxname - which is used to display sendon,startdate,enddate
     */
    setDate : function(flxname)
    {
      var scope = this;
      var todaysDate=this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(scope.currentBankDate,this.dateFormat));
      this.flxname = flxname;
      scope.view.flxDateHeader.skin = "sknFlx0095e4";
      this.view.imgSendOnBack.src = "backbutton.png";
      this.view.imgSendOnBack.onTouchStart = this.dateBackNavigation.bind(this);
      scope.view.customCalendar.currentDate = todaysDate;
      if(this.dateFlag === 0)
      {
        scope.view.customCalendar.preShow();
      }
      this.dateFlag++;
      try{
        var date = new Date(todaysDate);
        date = new Date(date.setDate(date.getDate() + 1095));
        date = this.businessController.getFormattedDate(date);
        scope.view.customCalendar.setLastEnabledDate(date);
        this.collectionObj = MakeATransferStore.getState();
        var object = this.collectionObj["Collection"]["TransactionObject"];
        if(flxname === "flxSendOn")
        {
          scope.view.lblSendOnHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.SendOn");
          var sendOn = "";
          if(object["sendOn"]){
            sendOn = this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["sendOn"], this.dateFormat));;
          }
          scope.sendOnDate = (scope.isEmptyNullUndefined(sendOn)) ? todaysDate : sendOn;
          scope.view.customCalendar.setFirstEnabledDate(todaysDate);
          scope.view.customCalendar.setSelectedDate(scope.sendOnDate);
        }
        else if(flxname === "flxStartDate")
        {
          scope.view.lblSendOnHeader.text = kony.i18n.getLocalizedString("kony.mb.common.StartDate");
          scope.startDate = (scope.isEmptyNullUndefined(object["startDate"])) ? this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["sendOn"], this.dateFormat)) :
          this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["startDate"], this.dateFormat));
          scope.view.customCalendar.setFirstEnabledDate(todaysDate);
          scope.view.customCalendar.setSelectedDate(scope["startDate"]);
        }
        else if(flxname === "flxEndDate")
        {
          scope.view.lblSendOnHeader.text = kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate");
          scope.endDate = (scope.isEmptyNullUndefined(object["endDate"])) ? 
            scope.getTomorrowsDate(this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["startDate"],this.dateFormat))) : this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["endDate"], this.dateFormat));
          scope.view.customCalendar.setFirstEnabledDate(scope.getTomorrowsDate(this.businessController.getFormattedDate(this.businessController.getDateObjectFromCalendarString(object["startDate"],this.dateFormat))));
          scope.view.customCalendar.setSelectedDate(scope.endDate);
        }

        scope.view.btnDateContinue.setVisibility(true);
        scope.view.btnDateContinue.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        scope.view.btnDateContinue.onClick = scope.setDateToContext.bind(this, flxname);

        scope.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setDate method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Component updateDateBullets
     * Responsible to update the selected date value
     */
    updateDateBullets : function(selectedDate) {
      var scope = this;
      try{
        if(!scope.isEmptyNullUndefined(selectedDate)){
          if(typeof(selectedDate) == "object")
            this.highlightedDate = selectedDate.format(this.formatToDisplay);
          else
            this.highlightedDate = this.businessController.getDateObjectFromCalendarString(selectedDate, this.dateFormat);
        }
        var dateLabels = scope.view.flxDateValue.widgets();
        var dummy = '';
        var skin = '';
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        //var locale = "sv"
        if (scope.isEmptyNullUndefined(selectedDate)) {
          scope.disableButton("btnDateContinue");
          //         dummy = 'MM/DD/YYYY';
          if (locale == "en-us" || locale == "en") {
            dummy = 'DD/MM/YYYY';
          } else if (locale == "en-gb" || locale === "fr-fr" || locale == "es-es") {
            dummy = 'DD/MM/YYYY';
          } else if (locale == "de-de") {
            dummy = 'DD.MM.YYYY';
          } else if (locale == "sv-se") {
            dummy = 'YYYY-DD-MM';
          }

          skin = 'ICSknLbl42424218PXmb';
        } else {
          //sknBtn0095e4RoundedffffffSSP26px
          scope.enableButton("btnDateContinue");
          skin = 'ICSknLbl42424218PXmb';
          var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          };
          dummy = selectedDate.toLocaleDateString("nl", options);
          dummy = dummy.replace(/-/g, '/');
          //         dummy = this.getSelectedDate();
          kony.print("In update bullets getselectedDate mein ka dummy" + dummy)
        }
        for (var i = 0; i < dateLabels.length; i++) {
          dateLabels[i].text = dummy[i];
          dateLabels[i].skin = skin;
        }
        scope.view.forceLayout();
        kony.print("update bullets function ended");
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in update date bullets method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * @Component : enableButton
     * To set skin and enable specific button.
     * @return : NA
     */
    enableButton : function(btnName) {
      try {
        var scope = this;
        scope.view[btnName].setEnabled(true);
        scope.view[btnName].skin = "ICSknBtn003E7535PXmb";
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in enableButton method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @Component : disableButton
     * To set skin and disable specific button.
     * @return : NA
     */
    disableButton : function(btnName) {
      try {
        var scope = this;
        scope.view[btnName].setEnabled(false);
        scope.view[btnName].skin = "sknBtnOnBoardingInactive";
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in disableButton method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Component setDateToContext
     * {param} : flxname - used to identify the date screen
     */
    setDateToContext : function(flxname)
    {
      this.collectionObj = MakeATransferStore.getState();
      var scope = this,date = scope.highlightedDate;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formattedObject = object["Collection"]["FormattedData"];
      this.invokeRender = false;
      if(flxname === "flxSendOn")
      { 
        if(transactionObject["frequency"] === "Once")
        {
          transactionObject["sendOn"] = date;
          formattedObject["sendOnUI"] = date;
        }
        scope.sendOnDate = date;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
        scope.setVerifyDetails();
        scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
      }
      else if(flxname === "flxStartDate")
      {
		transactionObject["sendOn"] = date;
        this.sendonDate=date;
        transactionObject["startDate"] = date;
        formattedObject["startDateUI"] = date;
        scope.startDate = date;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
        if(transactionObject["duration"] === "Until I Cancel"){
          transactionObject["endDate"] = "";
          formattedObject["endDateUI"] = "Until I Cancel";
          scope.endDate = "";
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
          this.businessController.setDataInCollection("FormattedData", formattedObject);
          scope.setVerifyDetails();
          scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
        }
        else{
          scope.setDate("flxEndDate");
          scope.navigateTo("flxDate", "flxSendOnTop", kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate"));
        }
      }
      else if(flxname === "flxEndDate")
      {
        if(!kony.sdk.isNullOrUndefined(this.sendonDate)){
        transactionObject["sendOn"]= this.sendonDate;
        }
        transactionObject["endDate"] = date;
        formattedObject["endDateUI"] = date;
        scope.endDate = date;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formattedObject);
        scope.setVerifyDetails();
        scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
      }

    },
    /**
     * Component getTomorrowsDate
     * {param} : seheduledDate -  date in as "mm/dd/yyyy"
     * @return : {date} - tomorrow's date
     */
    getTomorrowsDate : function(scheduledDate) {
      try{
        var dateObject = new Date(scheduledDate);
        dateObject.setDate(dateObject.getDate() + 1);
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (date < 10) {
          date = "0" + date;
        }
        return month + "/" + date + "/" + dateObject.getFullYear();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in getTomorrowsdate method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /*
     * Component toAccSearch
     * Responsible to perform search operation and update segment data 
     */
    toAccSearch : function(){
      var self = this;
      try{
        var searchTxt = this.view.tbxToSearch.text.toLowerCase();
        this.isToSearchApplied = false;
        if(searchTxt != ""){
          var result=[];
          this.view.imgToCloseIcon.setVisibility(true);                        
          var data = this.filteredToAcc;
          for (var i = 0; i < data.length; i++) {
            if (data[i].lblField1.toLowerCase().indexOf(searchTxt) !== -1) {
              result.push(data[i]);
            }
          }
          if(!(result.length > 0)){
            this.view.segToAccounts.setVisibility(false);
            this.view.flxNoResults.setVisibility(true);
          }else{
            this.isToSearchApplied = true;
            this.filteredToAcc= result;
            this.performToAccountsUIActions();
          }
        }
        else{
          this.clearToSearchTxt();         
        }
        this.view.forceLayout();
      }
      catch(e){
        var errorObj =
            {
              "errorInfo" : "Error in performing search",
              "errorLevel" : "Buisness",
              "error": e
            };
        this.onError(errorObj);
      }

    },

    /*
     * Component clearToSearchTxt
     * Responsible to clear text box texts  
     */
    clearToSearchTxt : function(){
      this.toAccClearSearchApplied=true;
      this.view.tbxToSearch.text="";
      this.view.imgToCloseIcon.setVisibility(false);
      this.isToSearchApplied = false;
      this.view.segToAccounts.removeAll();
      this.getToAccounts(); 
      this.view.segToAccounts.setVisibility(true);
      this.view.flxNoResults.setVisibility(false);
    },
    /**
     * Component getAmountScrren
     * Navigate to Next flex .
 */
    getAmountScreen : function(){
      var scope = this;
      var selectedData = this.view.segToAccounts.selectedRowItems;
      this.setSelectedToAccountsData(selectedData);
      this.navigateToAmountScreen(selectedData);
      //scope.navigateTo("flxAmount", "flxAmountTop", "Amount");
    },

    amountKeyboardDataSetting : function(){
      this.view.flxKeypadRowOne.btnOne.onClick = this.setAmountKeypadChar.bind(this, 1);
      this.view.flxKeypadRowOne.btnTwo.onClick = this.setAmountKeypadChar.bind(this, 2);
      this.view.flxKeypadRowOne.btnThree.onClick = this.setAmountKeypadChar.bind(this, 3);
      this.view.flxKeypadRowTwo.btnFour.onClick = this.setAmountKeypadChar.bind(this, 4);
      this.view.flxKeypadRowTwo.btnFive.onClick = this.setAmountKeypadChar.bind(this, 5);
      this.view.flxKeypadRowTwo.btnSix.onClick = this.setAmountKeypadChar.bind(this, 6);
      this.view.flxKeypadRowThree.btnSeven.onClick = this.setAmountKeypadChar.bind(this, 7);
      this.view.flxKeypadRowThree.btnEight.onClick = this.setAmountKeypadChar.bind(this, 8);
      this.view.flxKeypadRowThree.btnNine.onClick = this.setAmountKeypadChar.bind(this, 9);
      this.view.flxKeypadRowFour.btnZero.onClick = this.setAmountKeypadChar.bind(this, 0);
      this.view.flxKeypadRowFour.imgClearKeypad.onTouchEnd = this.clearAmountKeypadChar.bind(this);
      this.view.flxClearAmount.onTouchEnd = this.clearAmountKeypad.bind(this);
    },

    setAmountKeypadChar : function(char){
      if (char === '.') {
        if(this.isPeriodUsed === false){
          this.isPeriodUsed = true;
        }
        else{
          return;
        }
      }
      this.keypadString = this.keypadString + char;
      var firstChar = this.keypadString[0];
      this.keypadString = this.keypadString.split("");
      for (var i = 1; i < this.keypadString.length; i++) {
        if(this.keypadString[i] === '.'){
          this.keypadString[i - 1] = this.keypadString[i + 3];
          break;
        } else {
          this.keypadString[i - 1] = this.keypadString[i];
        }
      }
      this.keypadString = this.keypadString.join("");
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      if (firstChar !== '0') {
        this.keypadString = firstChar + this.keypadString;
      }
      this.updateAmountValue();
    },

    /**     
   * Component updateAmountValue
     * To updating values by clicking the value from keyborad 
     */
    updateAmountValue : function () {
      if (this.keypadString === '0.00' || this.keypadString === '0') {
        this.view.flxAmountWrapper.skin = 'sknflxBorderf1f1f1';
        this.view.flxAmountWrapper.lblAmount.text = this.businessController.getFormattedAmountWithOutCurrency(this.keypadString);
        this.view.flxAmount.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.flxAmount.btnContinue.setEnabled(false);
        this.view.flxClearAmount.setVisibility(false);
      } else {
        var keypadStringCommas = '';
        var beforeDecimal = this.keypadString.split('.')[0];
        var afterDecimal = this.keypadString.split('.')[1];
        if (beforeDecimal.length > 3) {
          var withoutCommas = (beforeDecimal.length) % 3;
          var temp = '';
          if (withoutCommas !== 0) {
            temp = beforeDecimal.substr(0, withoutCommas) + ',';
          }
          for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
            temp += beforeDecimal.substr(i, 3) + ',';
          }
          beforeDecimal = temp.substr(0, temp.length - 1);
        }
        keypadStringCommas = beforeDecimal + '.' + afterDecimal;
        this.view.flxAmountWrapper.skin = 'ICSknFlx003E75Border1px';
        this.view.flxAmountWrapper.lblAmount.text = this.businessController.getFormattedAmountWithOutCurrency(this.keypadString);
        //Checking with Available balance
        this.view.flxMain.lblAmountErrorMsg.setVisibility(false);
        this.view.flxAmount.btnContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.flxAmount.btnContinue.setEnabled(true);
        this.view.flxClearAmount.setVisibility(true);
      }
    },

    /**     
   * Component clearAmountKeypadChar
     * To clear the data one by one while clicking on clear button from keyboard
     */  
    clearAmountKeypadChar : function () {
      if (this.keypadString === '0.00') return;
      this.keypadString = this.keypadString.split("");
      for (var i = this.keypadString.length - 2; i >= 0; i--) {
        if (this.keypadString[i] === '.') {
          //this.keypadString[i + 1] = this.keypadString[i - 1];
          this.keypadString.splice(i - 1, 1);
          break;
        } else {
          this.keypadString[i + 1] = this.keypadString[i];
        }
      }
      this.keypadString = this.keypadString.join("");
      //this.keypadString = this.keypadString.substr(1);
      if (this.keypadString[0] === '.') {
        this.keypadString = '0' + this.keypadString;
      }
      this.updateAmountValue();
    },

    /**     
   * Component clearAmountKeypad
     * To clear all the data while clicking on clear image
     */ 
    clearAmountKeypad : function(){
      this.keypadString ='0.00';
      this.updateAmountValue();
    },

    /**     
   * Component amountKeyboardDataSetting
     * To bind the functions for each keybroad butttons
     */
    OtherAmtKeyboardDataSetting : function(){
      this.view.btnOtherAmtKey1.onClick = this.setOtherAmtKeypadChar.bind(this, 1);
      this.view.btnOtherAmtKey2.onClick = this.setOtherAmtKeypadChar.bind(this, 2);
      this.view.btnOtherAmtKey3.onClick = this.setOtherAmtKeypadChar.bind(this, 3);
      this.view.btnOtherAmtKey4.onClick = this.setOtherAmtKeypadChar.bind(this, 4);
      this.view.btnOtherAmtKey5.onClick = this.setOtherAmtKeypadChar.bind(this, 5);
      this.view.btnOtherAmtKey6.onClick = this.setOtherAmtKeypadChar.bind(this, 6);
      this.view.btnOtherAmtKey7.onClick = this.setOtherAmtKeypadChar.bind(this, 7);
      this.view.btnOtherAmtKey8.onClick = this.setOtherAmtKeypadChar.bind(this, 8);
      this.view.btnOtherAmtKey9.onClick = this.setOtherAmtKeypadChar.bind(this, 9);
      this.view.btnOtherAmtKey0.onClick = this.setOtherAmtKeypadChar.bind(this, 0);
      this.view.imgOtherAmtKeyClearKeypad.onTouchEnd = this.clearOtherAmtKeypadChar.bind(this);
      this.view.imgOtherAmountClear.onTouchEnd = this.clearOtherAmtKeypad.bind(this);
    },

    /**     
   * Component setOtherAmtKeypadChar
     * To set the key and update the value based on clicked button in keyboard
     * char - parameter contain the clicked keyboard button value
     */
    setOtherAmtKeypadChar : function (char) {
      if (char === '.') {
        if (this.isPeriodUsed === false) {
          this.isPeriodUsed = true;
        } else {
          return;
        }
      }
      this.keypadString = this.keypadString + char;
      var firstChar = this.keypadString[0];
      this.keypadString = this.keypadString.split("");
      //osama
     /* var nobfordot = this.keypadString.length - 4;
      for (var i = 1; i < this.keypadString.length; i++) {
        if ((i-1) === (nobfordot - 1))
        {
            this.keypadString[i - 1] = char;
        }
        else{
        if (this.keypadString[i] === '.') {
          this.keypadString[i - 1] = this.keypadString[i + 1];
          i++;
        } else {
          this.keypadString[i - 1] = this.keypadString[i];
        }
        }
      }*/

      for (var i = 1; i < this.keypadString.length; i++) {
        if (this.keypadString[i] === '.') {
          this.keypadString[i - 1] = this.keypadString[i + 3];
          break;
        } else {
          this.keypadString[i - 1] = this.keypadString[i];
        }
      }
      this.keypadString = this.keypadString.join("");
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      if (firstChar !== '0') {
        this.keypadString = firstChar + this.keypadString;
      }
      this.updateOtherAmtValue();
    },

    /**     
   * Component clearOtherAmtKeypadChar
     * To clear the data one by one while clicking on clear button from keyboard
     */  
    clearOtherAmtKeypadChar : function () {
      if (this.keypadString === '0.00') return;
      this.keypadString = this.keypadString.split("");
      for (var i = this.keypadString.length - 2; i >= 0; i--) {
        if (this.keypadString[i] === '.') {
          //osama//this.keypadString[i + 1] = this.keypadString[i - 1];
          this.keypadString.splice(i - 1, 1);
          break;
        } else {
          this.keypadString[i + 1] = this.keypadString[i];
        }
      }
      this.keypadString = this.keypadString.join("");
      //this.keypadString = this.keypadString.substr(1);
      if (this.keypadString[0] === '.') {
        this.keypadString = '0' + this.keypadString;
      }
      this.updateOtherAmtValue();
    },

    /**     
   * Component clearOtherAmtKeypad
     * To clear all the data while clicking on clear image
     */ 
    clearOtherAmtKeypad : function(){
      this.keypadString ='0.00';
      this.updateOtherAmtValue();
    },

    /**     
   * Component updateOtherAmtValue
     * To updating values by clicking the value from keyborad 
     */  
    updateOtherAmtValue : function () {
      if (this.keypadString === '0.00' || this.keypadString === '0') {
        this.view.lblOtherAmount.text = this.businessController.getFormattedAmountWithOutCurrency(this.keypadString);
        this.view.btnOtherAmountContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnOtherAmountContinue.setEnabled(false);
        this.view.flxOtherAmountClear.setVisibility(false);
      } else {
        var keypadStringCommas = '';
        var beforeDecimal = this.keypadString.split('.')[0];
        var afterDecimal = this.keypadString.split('.')[1];
        if (beforeDecimal.length > 3) {
          var withoutCommas = (beforeDecimal.length) % 3;
          var temp = '';
          if (withoutCommas !== 0) {
            temp = beforeDecimal.substr(0, withoutCommas) + ',';
          }
          for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
            temp += beforeDecimal.substr(i, 3) + ',';
          }
          beforeDecimal = temp.substr(0, temp.length - 1);
        }
        keypadStringCommas = beforeDecimal + '.' + afterDecimal;
        this.view.lblOtherAmount.text = this.businessController.getFormattedAmountWithOutCurrency(this.keypadString);
        this.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnOtherAmountContinue.setEnabled(true);
        this.view.flxOtherAmountClear.setVisibility(true);
      }
    },

    setTransferAmount : function(){
      var scope=this;
      scope.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formatteddata = object["Collection"]["FormattedData"];
      var transferType = scope.context["selectedFlowType"]; 
      this.amountKeyboardDataSetting();
      //osama
      //scope.view.onDeviceBack = scope.goBack.bind(scope);
      scope.view.imgAmountBack.onTouchEnd = scope.goBack.bind(scope);
      scope.view.btnAmountCancel.onClick = scope.onBack.bind(scope);
      //scope.view.btnAmountCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;
      //scope.view.btnAmountCancel.text = scope.getFieldValuefromMapping(scope._cancelButton);
      scope.view.lblCurrencyTitle.text = scope.businessController.getParsedDataBasedOnDataMapping("lblCurrencyTitle", scope.controllerScope._dataMapping["flxAmount"]);
      scope.view.lblCurrencyTitle.skin = "sknLbla0a0a0SSPReg22px";
      scope.view.lblAmountHeader.text = scope.businessController.getParsedDataBasedOnDataMapping("lblAmountHeader", scope.controllerScope._dataMapping["flxAmount"]);
      if (this.isEditFlow !== true) {
        this.view.flxAmountFromAccount.setEnabled(true);
        this.view.flxAmountToAccount.setEnabled(true);
        this.view.flxCurrencyWrapper.skin = "sknflxBorderf1f1f1";
        this.view.flxCurrencyWrapper.setEnabled(true);
        this.view.flxFromImage.setVisibility(true);
        this.view.flxToImage.setVisibility(true);
        this.view.lblFromBalanceValue.right = "50dp";
        this.view.flxFromAccountValue.right = "50dp";
        this.view.flxToAccountValue.right = "50dp";
        this.view.lblToBalanceValue.right = "50dp";
        this.view.flxAmountFromAccount.onClick = function(){
          scope.amountSelectedFlowType = "From";
          scope.fromAccountEdit = "false";
          scope.navigateTo("flxFromAccount","flxFromTop");
          scope.getFromAccounts();
        };
        this.view.flxAmountToAccount.onClick = function(){
          scope.amountSelectedFlowType = "To";
          scope.isToAccountEdit = "false";
          scope.navigateTo("flxToAccount","flxToTop","Transfer To");
        };
      } else{
        this.view.flxAmountFromAccount.setEnabled(false);
        this.view.flxAmountToAccount.setEnabled(false);
        this.view.flxCurrencyWrapper.skin = "sknFlxf9f9f9Bordere3e3e32px";
        this.view.flxCurrencyWrapper.setEnabled(false);
        this.view.flxFromImage.setVisibility(false);
        this.view.flxToImage.setVisibility(false);
        this.view.lblFromBalanceValue.right = "20dp";
        this.view.flxFromAccountValue.right = "20dp";
        this.view.flxToAccountValue.right = "20dp";
        this.view.lblToBalanceValue.right = "20dp";
      }
      scope.view.imgAmountBack.src = "backbutton.png";  
      //osama
      //scope.view.lblFromAccountValue.text = formatteddata["formattedfromAccountName"];
      var fromName = transactionObject["fromAccountName"].split(/[ .]/)[0];
      scope.view.lblFromAccountValue.text = fromName + "...." +transactionObject["fromAccountNumber"];
      
      if(!scope.isEmptyNullUndefined(formatteddata["formattedfromAvailableBalance"])){ 
        scope.view.lblFromBalanceValue.text = formatteddata["formattedfromAvailableBalance"];
      }
      else
      {
        scope.view.lblFromavailableBal.text="";
        scope.view.lblFromBalanceValue.text="";
      }        
      if(!scope.isEmptyNullUndefined(formatteddata["formattedtoAccountName"])){
        //osama
        //scope.view.lblToAccountValue.text = formatteddata["formattedtoAccountName"];
        scope.view.lblToAccountValue.text = formatteddata["formattedtoAccountName"].split(/[ .]/)[0] + "...." +transactionObject["toAccountNumber"];
      }
      //start osama 
     
       if (!scope.isEmptyNullUndefined(transactionObject["toAvailableBalance"]) && isNaN(transactionObject["toAvailableBalance"]))
      {
        scope.view.lblToAvailableBalance.text = "المستفيد:";
        scope.view.lblToBalanceValue.text = transactionObject["toAvailableBalance"];
      }
      else if(!scope.isEmptyNullUndefined(formatteddata["balanceLabel"])){
        scope.view.lblToAvailableBalance.text = formatteddata["balanceLabel"];
        scope.view.lblToBalanceValue.text = formatteddata["formattedtoAvailableBalance"];
      }
      else 
      {
        scope.view.lblToAvailableBalance.text = formatteddata["balanceLabel"];
        scope.view.lblToBalanceValue.text = formatteddata["formattedtoAvailableBalance"];
      }
      //end osama
      //scope.view.lblToAvailableBalance.text = formatteddata["balanceLabel"];
      //scope.view.lblToBalanceValue.text = formatteddata["formattedtoAvailableBalance"];
      if(transferType!== "EDIT") { 
        scope.clearAmountKeypad();
        scope.view.flxAmountHeaderTop.skin = "sknFlx0095e4";
        scope.view.flxAmountFromAccount.lblFromAccount.text = scope.businessController.getParsedDataBasedOnDataMapping("lblFromAccount", scope.controllerScope._dataMapping["flxAmount"]);
        scope.view.flxAmountToAccount.lblToAccount.text = scope.businessController.getParsedDataBasedOnDataMapping("lblToAccount", scope.controllerScope._dataMapping["flxAmount"]);    
        scope.view.imgCurrenySelection.src="arrowdown.png";
        scope.view.flxSelectCurrency.lblCurrencyTitle.text = scope.businessController.getParsedDataBasedOnDataMapping("lblCurrencyTitle", scope.controllerScope._dataMapping["flxAmount"]);
        scope.view.flxSelectCurrency.lblCurrencyTitle.skin = "sknLbla0a0a0SSPReg22px";
        scope.view.flxCurrencyWrapper.onTouchStart=function()
        {          
          var currencyFlow=scope.setCurrency();
          scope.currencyFlowCheck=currencyFlow;
          if(currencyFlow==false)
          {
            scope.navigateTo("flxCurrencySelection","flxCurrencyTop",scope.businessController.getParsedDataBasedOnDataMapping("lblCurrencyTitle", scope.controllerScope._dataMapping["flxAmount"]));

          }
        }
        if(!scope.isEmptyNullUndefined(scope.selectedCurr) && !scope.isEmptyNullUndefined(formatteddata["currency"]))
        {
          scope.setCurrencySymbol(formatteddata["currency"]);   
          scope.selectedCurr="";
        }
        else
        {
          if( transactionObject["toAccountType"]=="Checking" || transactionObject["toAccountType"]=="Loan" )
          {
            scope.setCurrencySymbol(transactionObject["fromTransactionCurrency"]); 
          }
		  else if(scope.context["transferType"] == "Pay a Person"){
			  var transactioncurrency = applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE" ? "EUR" : "USD";
			  scope.setCurrencySymbol(transactioncurrency);
		  }

          else{
            scope.setCurrencySymbol(transactionObject["fromTransactionCurrency"]); 
          }
        }
        scope.view.flxMainAmount.lblAmountTitle.text= scope.businessController.getParsedDataBasedOnDataMapping("lblAmountTitle", scope.controllerScope._dataMapping["flxAmount"]);
        scope.view.flxMainAmount.lblAmountTitle.skin= "sknLbla0a0a0SSPReg22px";
        //scope.view.flxAmount.btnContinue.text = scope.getFieldValue(scope._amountBtn, "text");
        scope.view.flxAmount.btnContinue.onClick = scope.transferAmountContinue.bind(scope);
        //osama
        //scope.view.onDeviceBack = scope.goBack.bind(scope);
        scope.view.imgAmountBack.onTouchEnd = scope.goBack.bind(scope);
        scope.view.btnAmountCancel.onClick = scope.onBack.bind(scope);
        scope.view.flxAmount.forceLayout();
      }
      if(transferType === "EDIT") {
        //osama
        var transferAmount = formatteddata["formattedTransferAmount"];
		// Find the index of the first numeric character
		var firstNumericIndex = transferAmount.search(/\d/);
        scope.selectedCurr = transactionObject["transactionCurrency"];
        scope.view.flxAmountWrapper.lblAmount.text = formatteddata["formattedTransferAmount"].substring(firstNumericIndex);
        scope.setCurrencySymbol(formatteddata["currency"]);
        var formatedAmount = scope.businessController.getCurrencySymbol(transactionObject["transactionCurrency"])+scope.view.flxAmountWrapper.lblAmount.text;
        formatteddata["formattedTransferAmount"] = formatedAmount;
        if(scope.isRepeatFlow) {
          scope.keypadString = scope.view.flxAmountWrapper.lblAmount.text;
          scope.view.flxAmount.btnContinue.onClick = scope.transferAmountContinue.bind(scope);
          //osama
            //scope.view.onDeviceBack = scope.goBack.bind(scope);
          scope.view.imgAmountBack.onTouchEnd = scope.goBack.bind(scope);
          scope.view.btnAmountCancel.onClick = scope.onBack.bind(scope);
        }
        if(scope.isEditFlow) {
          scope.keypadString = scope.view.flxAmountWrapper.lblAmount.text;
          scope.view.flxAmount.btnContinue.onClick = scope.transferAmountContinue.bind(scope);
          //osama
         //scope.view.onDeviceBack = scope.goBack.bind(scope);
          scope.view.imgAmountBack.onTouchEnd = scope.goBack.bind(scope);
          scope.view.btnAmountCancel.onClick = scope.onBack.bind(scope);
        }
        scope.businessController.setDataInCollection("FormattedData", formatteddata);
      }
    },
    /**
     * Component setCurrency
     * Reponsible to set field properties of Currency.
      */
    setCurrency : function() {
      var scope=this;
      try{
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formatteddata = object["Collection"]["FormattedData"];
        scope.view.imgCurrencyBack.src = "backbutton.png";          
        this.view.flxCurrencyHeaderTop.skin = "sknFlx0095e4";         
        this.view.lblCurrencyHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblCurrencyHeader", this.controllerScope._dataMapping["segments"]);
        this.view.lblCurrencyHeader.skin = "ICSknLblfffffSSPSemiBold76px"; 
        scope.view.flxCurrencyBack.onTouchStart=scope.goBack.bind(this);
        if(scope.context["transferType"] == "Within Same Bank") {
          if(transactionObject["fromTransactionCurrency"]==transactionObject["toTransactionCurrency"])
          {
            scope.view.flxCurrencyWrapper.setEnabled(false);
            scope.currencyFlowCheck =true;
            return true;
          }
          else if(transactionObject["fromTransactionCurrency"]!=transactionObject["toTransactionCurrency"])
          {
            if(transactionObject["toTransactionCurrency"]=="" || transactionObject["toTransactionCurrency"]==undefined)
            {
              scope.view.flxCurrencyWrapper.setEnabled(false);
              scope.currencyFlowCheck =true;
              return true;
            }
            else
            {
              var CurrencyOptions= this.getMasterDataForCurrency();
              var currencyList=[];
              for(var i = 0; i < CurrencyOptions.length;i++){
                if(CurrencyOptions[i][0] == transactionObject["fromTransactionCurrency"] || CurrencyOptions[i][0] == transactionObject["toTransactionCurrency"] ) 
                {
                  var currencyArr={};
                  currencyArr["lblFrequency"] = {
                    "skin" : "sknLbl424242SSP26px",
                    "text": CurrencyOptions[i][0]
                  }
                  currencyArr["id"] = CurrencyOptions[i][1];
                  if(transactionObject["transactionCurrency"]!=null&&transactionObject["transactionCurrency"]!=undefined && transactionObject["transactionCurrency"]==CurrencyOptions[i])
                  {
                    currencyArr["flxMain"] = {
                      "skin" :  "ICSknFlxF6F6F6Radius26px"             
                    }
                  }else{
                    currencyArr["flxMain"] = {
                      "skin" : ""
                    }
                  }
                  currencyList.push(currencyArr);
                }
              };  
              var widgetMap = {
                "flxMain":"flxMain",
                "lblFrequency":"lblFrequency",
                "id":"id"
              };
              this.view.flxCurrencyMainContainer.segCurrencyOptions.widgetDataMap = widgetMap;
              var selectedCurrency = this.view.flxCurrencyMainContainer.segCurrencyOptions.onRowClick = this.selectCurrency.bind(this);
              this.view.flxCurrencyMainContainer.segCurrencyOptions.setData(currencyList);
              this.view.flxCurrencyMainContainer.forceLayout();
              scope.currencyFlowCheck =false;
              return false;
              if(selectedCurrency!="")
              {
                return selectedCurrency;
              }
            }
          }
        }
		else if(scope.context["transferType"] == "Pay a Person"){
			scope.view.flxCurrencyWrapper.setEnabled(false);
            scope.currencyFlowCheck =true;
            return true;
		}
        else {   
          var CurrencyOptions=this.getMasterDataForCurrency();
          var currencyList=[];
          if(scope.context["transferType"] == "Domestic Transfer") {
            for(var i = 0; i < (CurrencyOptions.length)-1;i++){
              var currencyArr={};
              currencyArr["lblFrequency"] = {
                "skin" : "sknLbl424242SSP26px",
                "text": CurrencyOptions[i][0]
              }
              currencyArr["id"] = CurrencyOptions[i][1];
              if(transactionObject["transactionCurrency"]!=null&&transactionObject["transactionCurrency"]!=undefined && transactionObject["transactionCurrency"]==CurrencyOptions[i])
              {
                currencyArr["flxMain"] = {
                  "skin" :  "ICSknFlxF6F6F6Radius26px"             
                }
              }else{
                currencyArr["flxMain"] = {
                  "skin" : ""
                }
              }
              currencyList.push(currencyArr);
            };    
          }
          else{
            for(var i = 0; i < CurrencyOptions.length;i++){
              var currencyArr={};
              currencyArr["lblFrequency"] = {
                "skin" : "sknLbl424242SSP26px",
                "text": CurrencyOptions[i][0]
              }
              currencyArr["id"] = CurrencyOptions[i][1];
              if(transactionObject["transactionCurrency"]!=null&&transactionObject["transactionCurrency"]!=undefined && transactionObject["transactionCurrency"]==CurrencyOptions[i])
              {
                currencyArr["flxMain"] = {
                  "skin" :  "ICSknFlxF6F6F6Radius26px"             
                }
              }else{ 
                currencyArr["flxMain"] = {
                  "skin" : ""
                }
              }
              currencyList.push(currencyArr);
            };      
          } 
          var widgetMap = {
            "flxMain":"flxMain",
            "lblFrequency":"lblFrequency",
            "id":"id"
          };
          this.view.flxCurrencyMainContainer.segCurrencyOptions.widgetDataMap = widgetMap;
          var selectedCurrency = this.view.flxCurrencyMainContainer.segCurrencyOptions.onRowClick = this.selectCurrency.bind(this);
          this.view.flxCurrencyMainContainer.segCurrencyOptions.setData(currencyList);
          this.view.flxCurrencyMainContainer.forceLayout();
          scope.currencyFlowCheck =false;
          return false;
          if(selectedCurrency!="")
          {
            return selectedCurrency;
          }

        }
      }

      catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the setCurrency of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    getMasterDataForCurrency : function(){
      var masterData = [];
      try{
        var dataMapping = this.controllerScope._dataMapping;
        var labels = {};
        var values = {};
        if(dataMapping["segments"] && dataMapping["segments"]["segCurrencyOptions"]){
          labels = dataMapping["segments"]["segCurrencyOptions"]["Labels"];
          values = dataMapping["segments"]["segCurrencyOptions"]["Values"];
        }
        for(var key in labels){
          if(!labels[key].indexOf("${i18n")) {
            var fieldValue = labels[key];
            labels[key] = kony.i18n.getLocalizedString(fieldValue.substring
                                                       (fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? 
              kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, 
                                                                fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}")+1, fieldValue.length - 1)
            : fieldValue;
          }
          var field = [];
          field.push(labels[key]);
          field.push(values[key+"Value"]);
          masterData.push(field);
        }
        return masterData;
      }
      catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the getMasterDataForFrequency of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**     
   * Component selectCurrency
     * To pass the selected data to next screen.
     */
    selectCurrency : function()
    {
      try{
        var scope = this;
        this.selectedCurr=true;
        var currencyFormatted="";
        var selectedData=this.view.segCurrencyOptions.selectedRowItems; 
        selectedData[0]["flxMain"] = {
          "skin" :  "ICSknFlxF6F6F6Radius26px"       
        };
        var transferType = scope.context["selectedFlowType"];   
        var selectedRow=this.view.segCurrencyOptions.selectedRowIndex[1];
        this.view.segCurrencyOptions.setDataAt(selectedData[0], selectedRow);
        var formatedAmount = selectedData[0]["id"]+this.view.flxAmountWrapper.lblAmount.text;
        this.view.lblCurrency.text = selectedData[0].lblFrequency.text+'('+selectedData[0]["id"]+')';
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formatteddata = object["Collection"]["FormattedData"];
        formatteddata["currency"] = this.view.lblCurrency.text;
        formatteddata["formattedTransferAmount"] = formatedAmount;
        transactionObject["transactionCurrency"] = selectedData[0].lblFrequency.text;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formatteddata);  
        var defaultPaymentContract = this.controllerScope._dataMapping["paymentMethod"]["servicePaymentValues"]
        var paymentUI = "";
        var paymentService = "";
          if(!scope.isEmptyNullUndefined(defaultPaymentContract[transactionObject["transactionCurrency"]]) )
          {
            paymentUI = defaultPaymentContract[transactionObject["transactionCurrency"]].name;
            paymentService = defaultPaymentContract[transactionObject["transactionCurrency"]].value;
          }
          else
          {
            paymentUI = defaultPaymentContract["other"]["name"];
            paymentService = defaultPaymentContract["other"]["value"];
          }
          transactionObject["selectedServicePayment"] = paymentService;
          transactionObject["selectedPaymentMethod"] = paymentUI;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.setTransferAmount();
        if(this.isRepeatFlow || transferType === "EDIT") {
          this.setVerifyDetails();
          scope.setPaymentMethodValue = "";
          scope.selectPaymentMethod = "";
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
        }
        else {
          this.navigateTo("flxAmount","flxAmountTop",this.businessController.getParsedDataBasedOnDataMapping("lblAmountTitle", this.controllerScope._dataMapping["flxAmount"]));
        }
        //}
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in selectCurrency method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setCurrencySymbol
     * To setting data to Currency-Symbol screen
     */
    setCurrencySymbol : function(currency){
      var scope=this; 
      scope.currencyFlowCheck =false;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formatteddata = object["Collection"]["FormattedData"];
      if( this.selectedCurr=="")
      {
        transactionObject["transactionCurrency"] = currency;   
      }           
      if(currency=="USD")
      {
        this.view.lblCurrency.text = currency+"($)";
      }
      else if(currency=="EUR")
      {
        this.view.lblCurrency.text = currency+"(€)";
      }
      else if(currency=="YEN")
      {
        this.view.lblCurrency.text = currency+"(¥)";
      }
      else if(currency=="INR")
      {
        this.view.lblCurrency.text = currency+"(₹)";
      }
      else if(currency=="GBP")
      {
        this.view.lblCurrency.text = currency+"(£)";
      }
      else if(currency=="BGN")
      {
        this.view.lblCurrency.text = currency+"(Лв)";
      }
      else if(currency=="YER")
      {
        this.view.lblCurrency.text = currency;
      }
      else if(currency=="SAR")
      {
        this.view.lblCurrency.text = currency;
      }
      formatteddata["currency"] = this.view.lblCurrency.text;
      this.businessController.setDataInCollection("FormattedData", formatteddata);
      this.businessController.setDataInCollection("TransactionObject", transactionObject);  
    },

    setSelectedFromAccountsData : function(data){
      var scope = this;
	  var object = MakeATransferStore.getState();
      var accountsData =  scope.collectionObj.Cache["Accounts"].Accounts;
	  if(object["Collection"].hasOwnProperty("TransactionObject") || object["Collection"].hasOwnProperty("FormattedData")){
		var transactiondata = object["Collection"]["TransactionObject"];
		var formattedtransactionData = object["Collection"]["FormattedData"];
	  }
	  else{
		var transactiondata ={};
		var formattedtransactionData ={};
	  }
      formattedtransactionData["formattedfromAccountName"] = data[0].lblField1;
      formattedtransactionData["formattedfromAvailableBalance"]= data[0].lblField2;
      formattedtransactionData["fromAccountType"] = data[0].lblField3;
      // var fromAcc = accountsData.find( o =>o.accountID === data[0].accountID);
      for(var i=0; i<accountsData.length;i++){
        if(accountsData[i].accountID === data[0].accountID){
          transactiondata["fromAccountNumber"] = accountsData[i]["accountID"],
            transactiondata["fromTransactionCurrency"] = accountsData[i]["currencyCode"];
          transactiondata["fromAvailableBalance"] = accountsData[i]["availableBalance"];
          transactiondata["fromAccountName"] = accountsData[i]["accountName"];
          transactiondata["fromAccountType"] = accountsData[i]["accountType"];
          transactiondata["fromIsBusinessAccount"] = accountsData[i]["isBusinessAccount"];
          transactiondata["fromMembershipName"] = accountsData[i]["MembershipName"];
          transactiondata["fromActions"] = accountsData[i]["actions"];
        }
      }
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject",transactiondata);
      this.businessController.setDataInCollection("FormattedData",formattedtransactionData);
    },

    setSelectedToAccountsData : function(data){
      var scope = this;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formattedObject = object["Collection"]["FormattedData"];
      var transactiondata = {};
      formattedObject["formattedtoAccountName"] = data[0].lblField1;
      if(data[0].groupType ==="All Payees"){
        formattedObject["bankName"] =data[0].lblField3;
        formattedObject["ibanBankName"] =data[0].lblField3;
        if(this.context.transferType ==="Domestic Transfer" || 
           this.context.transferType ==="International Transfer"||
           this.context.transferType ==="Within Same Bank"
          ){
        transactionObject["transactionType"] ="ExternalTransfer";
          formattedObject["formattedtoAvailableBalance"]= "";
          formattedObject["balanceLabel"] =data[0].lblField3;
          var accountsData =  scope.collectionObj.Cache["Recipients"];
          for(var i=0; i<accountsData.length;i++){
            if(accountsData[i].accountNumber === data[0].accountID){
              transactionObject["toAccountNumber"] = accountsData[i]["accountNumber"];
              transactionObject["ibanBankName"] = accountsData[i]["bankName"];
              transactionObject["externalAccountNumber"] = accountsData[i]["accountNumber"];
              accountsData[i]["currencyCode"] ? transactionObject["toTransactionCurrency"] = accountsData[i]["currencyCode"]: transactionObject["toTransactionCurrency"] = "";
              transactionObject["toAccountName"] = "";
              transactionObject["toAccountType"] = "";
              transactionObject["toAvailableBalance"] ="";
              transactiondata = accountsData[i];
            }
          }
          transactionObject = Object.assign(transactionObject,transactiondata)
        }
      }
      else if (data[0].groupType == "All P2P Accounts") {
        if(!this.isEmptyNullUndefined(data[0].phone)) {
          transactionObject["toAvailableBalance"] = data[0].phone;
          formattedObject["toAvailableBalance"] = data[0].phone;
          //scope.updateContext("toAvailableBalance", selectedData.phone);
        } else if(!this.isEmptyNullUndefined(data[0].email)) {
          transactionObject["toAvailableBalance"] =  data[0].email;
          formattedObject["toAvailableBalance"] = data[0].email;
          //scope.updateContext("toAvailableBalance", data[0].email);
        } else {
          transactionObject["toAvailableBalance"] = "";
          formattedObject["toAvailableBalance"] = "";
        }
        transactionObject["beneficiaryName"] = data[0].lblField1;
        transactionObject["beneficiaryPhone"] = data[0].phone;
        transactionObject["beneficiaryEmail"] = data[0].email;
        transactionObject["toAccountNumber"] = !this.isEmptyNullUndefined(data[0].accountID)? data[0].accountID:"";
        formattedObject["toAccountNumber"] = !this.isEmptyNullUndefined(data[0].accountID)? data[0].accountID:"";
      }
      else{
        formattedObject["formattedtoAvailableBalance"]= data[0].lblField2;
        formattedObject["balanceLabel"] =data[0].lblField4;
        formattedObject["toAccountType"] =data[0].lblField3;
       transactionObject["transactionType"] = "InternalTransfer"
        var frmdata =  scope.collectionObj.Cache["Accounts"].Accounts;
        var accountsData =frmdata.concat(scope.collectionObj.Cache.CreditCardAccounts.Accounts);
        for(var i=0; i<accountsData.length;i++){
          if(accountsData[i].accountID === data[0].accountID){
            if(transactionObject["accountNumber"])transactionObject["accountNumber"]= "";
            if(accountsData[i]["bankName"]){
              transactionObject["bankName"]= accountsData[i]["bankName"];
              formattedObject["bankName"]= accountsData[i]["bankName"];
            }
            else{
              transactionObject["bankName"]= "";
              formattedObject["bankName"]= "";
            }
            if(accountsData[i]["dueDate"]){
               transactionObject["dueDateUI"]= (new Date(accountsData[i]["dueDate"])).format(this.formatToDisplay);
              transactionObject["dueDate"] =accountsData[i]["dueDate"];
            } 
            else{
              transactionObject["dueDate"] ="";
              transactionObject["dueDateUI"] ="";
            } 
            transactionObject["externalAccountNumber"] ="";
            transactionObject["toAccountNumber"] = accountsData[i]["accountID"],
              transactionObject["toTransactionCurrency"] = accountsData[i]["currencyCode"];
            transactionObject["toAccountName"] = accountsData[i]["accountName"];
            transactionObject["toAccountType"] = accountsData[i]["accountType"];
            transactionObject["toIsBusinessAccount"] = accountsData[i]["isBusinessAccount"];
            if(accountsData[i].accountType === "Savings" || accountsData[i].accountType==="Checking"){
              transactionObject["toAvailableBalance"] = accountsData[i]["availableBalance"];
            } 
            if(accountsData[i].accountType === "Loan" ||accountsData[i].accountType === "CreditCard"){
              transactionObject["toAvailableBalance"] = accountsData[i]["outstandingBalance"];
              !this.isEmptyNullUndefined(accountsData[i].paymentDue)? transactionObject["paymentDue"]= accountsData[i].paymentDue :"";
              !this.isEmptyNullUndefined(accountsData[i].currentAmountDue)? transactionObject["currentAmountDue"]= accountsData[i].currentAmountDue :"";
            }
          }
        }
      }
	  transactionObject["beneType"]=!this.isEmptyNullUndefined(data[0].beneType)?data[0].beneType:"";
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject",transactionObject);
      this.businessController.setDataInCollection("FormattedData",formattedObject);
    },

    /**     
   * Component setScreenDataE2EReference
     * setting primary skins and data for the screen
    **/ 
    setScreenDataE2EReference : function(){
      try{
        var scope = this;
        //skins
        scope.view.flxE2EHeader.skin = "sknFlx0095e4";
        scope.view.imgE2EBack.src = "backbutton.png";
        scope.view.btnE2ECancel.skin = "ICSKnBtnffffff15px";
        scope.view.lblE2EHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.lblE2E.skin = "ICSknLbl72727234px";
        scope.view.btnE2EContinue.skin = "ICSknBtn003E7535PXmb";
        scope.view.txtE2E.skin = "ICSknTxtE3E3E31px34px"; 
        scope.view.txtE2E.focusSkin = "ICSknTxt003E751px";
        scope.view.skin = "sknFlxffffff";
        scope.view.btnE2EContinue.focusSkin = "ICSknBtn003E7535PXmb";
        //text
        scope.view.lblE2EHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblE2EHeader", this.controllerScope._dataMapping["flxE2E"]);
        scope.view.flxE2EMainContainer.lblE2E.text = this.businessController.getParsedDataBasedOnDataMapping("lblE2E", this.controllerScope._dataMapping["flxE2E"]);
        scope.view.btnE2EContinue.text =  this.businessController.getParsedDataBasedOnDataMapping("btnE2EContinue", this.controllerScope._dataMapping["flxE2E"]);
        //scope.view.btnE2ECancel.text = scope.getFieldValue(scope._cancelButton);
        //scope.view.btnE2ECancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setScreenDataE2EReference method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
   * Component setE2EReference
     * Enabling default parameters
    **/  
    setE2EReference : function(){      
      try {
        var scope = this;
        scope.setScreenDataE2EReference();  
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        scope.view.flxE2EWrapper.txtE2E.placeholder = this.businessController.getParsedDataBasedOnDataMapping("txtE2E", this.controllerScope._dataMapping["flxE2E"]);
        //scope.view.flxE2EWrapper.txtE2E.textInputMode = scope.getFieldValue(scope._txtInputE2ERef, "inputMode");
        scope.view.flxE2EWrapper.txtE2E.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("e2emaxlength", this.controllerScope._dataMapping["flxE2E"]);
        scope.view.flxE2EWrapper.txtE2E.onTextChange = scope.onE2EReferenceTextChange.bind(this);
        scope.view.btnE2EContinue.onClick = scope.btnE2EContinueOnClick.bind(this);
        scope.view.flxE2EBack.onTouchEnd = scope.goBack.bind(this);
        scope.view.btnE2ECancel.onClick = scope.onBack.bind(this);
        if(!this.isEmptyNullUndefined(transactionObject["e2eReference"])){
          scope.view.flxE2EWrapper.txtE2E.text = transactionObject["e2eReference"];
          this.enableButton("btnE2EContinue");
        } else { 
          if(this.isEmptyNullUndefined(scope.view.flxE2EWrapper.txtE2E.text)){
            this.disableButton("btnE2EContinue"); }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setE2EReference method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onE2EReferenceTextChange
     * Continue button Validation based on recipeintname limit.
     */
    onE2EReferenceTextChange : function() {
      try {
        var scope = this;
        var minlength = this.businessController.getParsedDataBasedOnDataMapping("e2eminlength", this.controllerScope._dataMapping["flxE2E"]);
        var title = scope.view.txtE2E.text;
        if(!scope.isEmptyNullUndefined(title)) {
          if(title.length >= minlength) {
            scope.enableButton("btnE2EContinue");
          } else {
            scope.disableButton("btnE2EContinue");
          }
        }else{
          scope.disableButton("btnE2EContinue");                                                
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onE2EReferenceTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component btnE2EContinueOnClick
     *Continue button action based of flow type
    **/
    btnE2EContinueOnClick : function(){
      try{
        var scope = this;
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if(!(scope.isEmptyNullUndefined(scope.view.txtE2E.text))) {
          transactionObject["e2eReference"] = scope.view.txtE2E.text;
          scope.view.txtE2E.text = "";
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
          scope.setVerifyDetails();
          scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnE2EContinueOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /*** Icon Visibility
   based on Account Data 
 */

    getOtherUIMappings : function(segRecord, record, segId){
      if(segId ==="segFromAccounts" || segId === "segToAccounts"){
        if (this.context.transferType === "Pay a Person") {
          segRecord["phone"] = record.phone || "";
          segRecord["email"] = record.email || "";
        }
        var bankIcon = (!kony.sdk.isNullOrUndefined(this.getBankIcon(record.bankName))) ? this.getBankIcon(record.bankName) : null;
        segRecord["imgIcon31"] = {
          "src": bankIcon,
          "isVisible": record.isSameBankAccount === "false" && !kony.sdk.isNullOrUndefined(bankIcon) ? true : false
        };
        if (record.MixedAccounts ==="true") {
          if (record.isBusinessAccount === "true" || record.isBusinessPayee === "1") {
            segRecord["imgIcon3"] = {
              "src": "business.png",
              "isVisible": true
            };
          } else if (record.isBusinessAccount === undefined && record.isBusinessPayee === undefined) {
            segRecord["imgIcon3"] = {
              "isVisible": false
            };
          } else {
            segRecord["imgIcon3"] = {
              "src": "personal.png",
              "isVisible": true
            };
          }
        }
        if ((!this.isEmptyNullUndefined(segRecord["imgIcon31"]) && segRecord["imgIcon31"].isVisible == true)) {
          if (!this.isEmptyNullUndefined(segRecord["imgIcon3"]) && segRecord["imgIcon3"].isVisible == true) {
            segRecord["flxIcon3"] = {
              "width": "50dp"
            }
          } else {
            segRecord["flxIcon3"] = {
              "width": "25dp"
            }
          }
        } else {
          if (!this.isEmptyNullUndefined(segRecord["imgIcon3"]) && segRecord["imgIcon3"].isVisible == true) {
            segRecord["flxIcon3"] = {
              "width": "25dp"
            }
          } else {
            segRecord["flxIcon3"] = {
              "width": "0dp"
            }
          }
        }
      }
      if(segId ==="segSwiftBICSearchList"){
        segRecord["flxSwiftBICSearchOptions"]={
          "skin":"ICSknFlxE3E3E3NotSelected"
        };
        segRecord["imgSwiftBICSearchListTick"]={
          "src":"selectedtick.png",
          "isVisible":false
        };
      }
      if(this.isEmptyNullUndefined(segRecord['lblField3']) && this.isEmptyNullUndefined(segRecord['lblField4'])){
        segRecord['flxUnifiedTransferRowTemplate'] = {
          "height" : "45dp"
        }
      }
      else{
        segRecord['flxUnifiedTransferRowTemplate'] = {
          "height" : "69dp"
        }
      }
      return segRecord;
    },
    /*
     * Component getBankIcon
     * Responsible to get bank icon based on bank name
     * return image
     */
    getBankIcon : function(bankName){
      var img ;
      if(!kony.sdk.isNullOrUndefined(bankName)){
        if(bankName.toLowerCase().includes("citi"))
          img= this.Icons.CITI_BANK_IMAGE;
        else if(bankName.toLowerCase().includes("chase"))
          img= this.Icons.CHASE_BANK_IMAGE;
        else if(bankName.toLowerCase().includes("boa") || bankName.toLowerCase().includes("america") )
          img= this.Icons.BOA_BANK_IMAGE;
        else if(bankName.toLowerCase().includes("hdfc"))
          img = this.Icons.HDFC_BANK_IMAGE;
        else if(bankName.toLowerCase().includes("infinity"))
          img = this.Icons.INFINITY_BANK_IMAGE;
        else
          img= this.Icons.EXTERNAL_BANK_IMAGE;
      }
      return img;
    },
    /*
     * Component isRetailAccount
     * Responsible to check retail accounts present in response
     */
    isRetailAccount : function(record)
    {
      var scope=this;
      var retailCount =0;
      for(var j=0;j<record.length;j++){
        if(record[j].isBusinessAccount==="false" || record[j].isBusinessPayee!="1"){
          retailCount++;
        }
      } 
      return retailCount;
    },

    /*
     * Component isBusinessAccount
     * Responsible to check retail accounts present in response
     */
    isBusinessAccount : function(record)
    {
      var scope=this;
      var businessCount=0;
      for(var j=0;j<record.length;j++){
        if(record.isBusinessAccount==="true" || record.isBusinessPayee==="1")
          businessCount++;   
      } 
      return businessCount;
    },


    determineUserType : function(data){
      var isBusiness = this.isBusinessAccount(data);
      var isRetail = this.isRetailAccount(data);
      if(isBusiness !==0 && isRetail !==0){
        for(var i =0 ; i <data.length;i++){
          data[i]["MixedAccounts"] ="true";
        }
      }else{
        for(var i =0 ; i <data.length;i++){
          data[i]["MixedAccounts"] ="false";
        }
      }
      return data;
    },

    /**
     * Component setFeesPaidBy
     * Reponsible to set field properties of FeesPaidBy.
     */
    setFeesPaidBy : function()
    {
      var scope=this;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      try{      
        this.view.flxFeesPaidByBack.onTouchStart=this.goBack.bind(this);
        if(scope.setFeesPaidSelected=="")
        {
          if(scope.context["transferType"] == "Pay a Person" || scope.context["transferType"] == "International Transfer" || scope.context["transferType"] == "Domestic Transfer") {
            this.setFeesPaidByFieldValues();
            for(var i=1;i<=3;i++)
            { 
              var defaultFeesPaidBy= this.businessController.getParsedDataBasedOnDataMapping("defaultFeesPaidBy", this.controllerScope._dataMapping["flxFeesPaidBy"]);
              if(scope.view["lblFeesPaidByOption"+i+"Header"].text ==  defaultFeesPaidBy)
              {
                scope.view["flxFeesPaidByOption"+i].skin = "ICSknFlx04A615Selected";
                scope.view["imgFeesPaidByTick"+i].setVisibility(true);
                var disableOptions=i;
                this.disableOptions =i;
                transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+i+"Header"].text;
              }
              scope.view["flxFeesPaidByOption"+i].onTouchStart = scope.selectFeesPaidByOption.bind(this, i);
            }
          }
//           else if(scope.context["transferType"] == "Domestic Transfer")
//           {
//             this.setFeesPaidByFieldValues();
//             if(transactionObject["selectedPaymentMethod"] == "SEPA" || transactionObject["selectedPaymentMethod"] == "INSTANT") 
//             {
//               for(var i=1;i<=3;i++)
//               {
//                 if(scope.view["lblFeesPaidByOption"+i+"Header"].text == "Both (Shared)" )
//                 {
//                   scope.view["flxFeesPaidByOption"+i].skin="ICSknFlx04A615Selected";
//                   scope.view["imgFeesPaidByTick"+i].setVisibility(true);
//                   var disableOptions=i;
//                   transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+i+"Header"].text;
//                 }
//                 else
//                 {
//                   scope.view["flxFeesPaidByOption"+i].setEnabled(false);
//                   scope.view["flxFeesPaidByOption"+i].skin="ICSknFlxE3E3E3NotSelected";
//                   scope.view["imgFeesPaidByTick"+i].setVisibility(false);
//                 }
//               }
//             }
//             else
//             {            
//               for(var i=1;i<=3;i++)
//               { 
//                 var defaultFeesPaidBy=this.businessController.getParsedDataBasedOnDataMapping("defaultFeesPaidBy", this.controllerScope._dataMapping["flxFeesPaidBy"]);
//                 if(scope.view["lblFeesPaidByOption"+i+"Header"].text ==  defaultFeesPaidBy)
//                 {
//                   scope.view["flxFeesPaidByOption"+i].skin="ICSknFlx04A615Selected";
//                   scope.view["imgFeesPaidByTick"+i].setVisibility(true);
//                   var disableOptions=i;
//                   this.disableOptions =i;
//                   transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+i+"Header"].text;
//                 }
//                 scope.view["flxFeesPaidByOption"+i].onTouchStart = scope.selectFeesPaidByOption.bind(this, i);
//               }
//             }
//           }
        }
        else
        {        
          for(i=1;i<=3;i++)
          {           
            if( this.disableOptions!=i){
              scope.view["flxFeesPaidByOption"+i].setEnabled(true);
              scope.view["flxFeesPaidByOption"+i].skin="ICSknFlxE3E3E3NotSelected";
              scope.view["imgFeesPaidByTick"+i].setVisibility(false);         
            }
            else
            {
              scope.view["flxFeesPaidByOption"+i].setEnabled(true);
              scope.view["flxFeesPaidByOption"+i].skin="ICSknFlx04A615Selected";
              scope.view["imgFeesPaidByTick"+i].setVisibility(true);
            }
            if(scope.isRepeatFlow && scope.context["transferType"]!== "DomesticTransfer") {
              scope.view["flxFeesPaidByOption"+i].onTouchStart = scope.selectFeesPaidByOption.bind(this, i);
            }
          }      
        }
        for(i=1;i<=3;i++)
        {
          if(scope.context["transferType"] == "Domestic Transfer" && scope.view["lblFeesPaidByOption"+i+"Header"].text !== "Both (Shared)") {
            scope.view["flxFeesPaidByOption"+i].setEnabled(false);
            scope.view["flxFeesPaidByOption"+i].skin="ICSknFlxf7f7f7bodere3e3e3"; 
            scope.view["imgFeesPaidByTick"+i].setVisibility(false);
          }
        }
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        scope.view.forceLayout();
      }catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the setFeesPaidBy of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**     
   * Component setFeesPaidByFieldValues
     * To pass the selected data to next screen.
     */
    setFeesPaidByFieldValues : function()
    {
      var scope=this;
      try
      {
        this.view.flxFeesPaidByHeader.skin="sknFlx0095e4";
        this.view.imgFeedPaidBack.src="backbutton.png";
        this.view.lblFeesPaidByHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByHeader", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        this.view.flxFeesPaidByBack.onTouchStart=this.goBack.bind(this);
        this.view.lblFeesPaidByDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByDescription", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.flxFeesPaidByDescription.skin="sknFlxffffff";
        this.view.lblFeesPaidByDescription.skin = "ICSknLbl727272SSPReg34px";
        this.view.flxFeesPaidBySeparator.skin="sknFlxSeparatora6a6a6";
        this.view.imgFeesPaidByTick1.src="selectedtick.png";
        this.view.imgFeesPaidByTick2.src="selectedtick.png";
        this.view.imgFeesPaidByTick3.src="selectedtick.png";
        this.view.lblFeesPaidByOption1Header.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption1Header", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByOption1Header.skin="ICSknLbl424242B41px";
        this.view.lblFeesPaidByOption1Description.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption1Description", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByOption1Description.skin="ICSknLbl72727230px";
        this.view.lblFeesPaidByOption2Header.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption2Header", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByOption2Header.skin="ICSknLbl424242B41px";
        this.view.lblFeesPaidByOption2Description.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption2Description", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByOption2Description.skin="ICSknLbl72727230px";
        this.view.lblFeesPaidByOption3Header.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption3Header", this.controllerScope._dataMapping["flxFeesPaidBy"]);
        this.view.lblFeesPaidByOption3Header.skin="ICSknLbl424242B41px";
        this.view.lblFeesPaidByOption3Description.text = this.businessController.getParsedDataBasedOnDataMapping("lblFeesPaidByOption3Description", this.controllerScope._dataMapping["flxFeesPaidBy"]);  
        this.view.lblFeesPaidByOption3Description.skin="ICSknLbl72727230px";
        this.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFeesPaidByFieldValues method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },


    /**     
   * Component selectFeesPaidBy
     * To pass the selected data to next screen.
     */   
    selectFeesPaidByOption : function(selectedFeesPaidBy)
    {
      try{
        var scope = this;   
        scope.setFeesPaidSelected=true;
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if(scope.context["transferType"] == "International Transfer" || scope.context["transferType"] == "Pay a Person") {
          if(this.disableOptions == "")
          {
            this.disableOptions =selectedFeesPaidBy;
            this.selectFeesPaidByValue=true;
            scope.view["flxFeesPaidByOption"+selectedFeesPaidBy].skin="ICSknFlx04A615Selected";
            scope.view["imgFeesPaidByTick"+selectedFeesPaidBy].setVisibility(true);
            transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+selectedFeesPaidBy+"Header"].text;
            scope.UpdateFeesPaidServiceValue(transactionObject["selectedFeesPaidBy"]);
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
          }
          else
          {
            scope.view["flxFeesPaidByOption"+this.disableOptions].skin="ICSknFlxE3E3E3NotSelected";
            scope.view["imgFeesPaidByTick"+this.disableOptions].setVisibility(false);             
            this.disableOptions =selectedFeesPaidBy;          
            scope.view["flxFeesPaidByOption"+selectedFeesPaidBy].skin="ICSknFlx04A615Selected";
            scope.view["imgFeesPaidByTick"+selectedFeesPaidBy].setVisibility(true);
            transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+selectedFeesPaidBy+"Header"].text;
            scope.UpdateFeesPaidServiceValue(transactionObject["selectedFeesPaidBy"]);
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
          }
        }
        else if(scope.context["transferType"] == "Domestic Transfer")
        {
          if( this.disableOptions == "")
          {
            this.disableOptions =selectedFeesPaidBy;
            this.selectFeesPaidByValue=true;
            scope.view["flxFeesPaidByOption"+selectedFeesPaidBy].skin="ICSknFlx04A615Selected";
            scope.view["imgFeesPaidByTick"+selectedFeesPaidBy].setVisibility(true);
            transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+selectedFeesPaidBy+"Header"].text;
            scope.UpdateFeesPaidServiceValue(transactionObject["selectedFeesPaidBy"]);
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
          }
          else
          {
            scope.view["flxFeesPaidByOption"+this.disableOptions].skin="ICSknFlxE3E3E3NotSelected";
            scope.view["imgFeesPaidByTick"+this.disableOptions].setVisibility(false);             
            this.disableOptions =selectedFeesPaidBy;          
            scope.view["flxFeesPaidByOption"+selectedFeesPaidBy].skin="ICSknFlx04A615Selected";
            scope.view["imgFeesPaidByTick"+selectedFeesPaidBy].setVisibility(true);
            transactionObject["selectedFeesPaidBy"] = scope.view["lblFeesPaidByOption"+selectedFeesPaidBy+"Header"].text;
            scope.UpdateFeesPaidServiceValue(transactionObject["selectedFeesPaidBy"]);
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
          }   
        }
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in selectFeesPaidBy method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component UpdateFeesPaidServiceValue
     * Reponsible to update the Fees paid service option value
     */  
    UpdateFeesPaidServiceValue : function(selectedFeesPaidBy)
    {
      var scope=this;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      try{
        var serviceFeesPaidOptions=this.controllerScope._dataMapping["flxFeesPaidBy"]["serviceFeesPaidValues"];
        var keys = Object.keys(serviceFeesPaidOptions);
        for(key=0;key<keys.length;key++)
        {
          if(selectedFeesPaidBy==keys[key])
          {
            var selectedValue=serviceFeesPaidOptions[keys[key]]["paidBy"];
            transactionObject["selectedServiceFeesPaidBy"] = selectedValue;
          }
        }
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in UpdateFeesPaidServiceValue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);

      }
    },
    /**     
   * Component groupBusinessAndRetail
     * To group business and retail accounts
     */
    groupBusinessAndRetail : function(data){
      var scope =this;
      try{
        var fromAccountsData=[];
        var data=scope.filterDataBasedOnPermissions(data, this.context.transferType);
        if(!this.isEmptyNullUndefined(data))
        {
          var businessAccountsList=[];
          var personalAccountsList=[],i=0,k=0;
          for(var j=0;j<data.length;j++)
          {
            if(data[j]["fromIsBusinessAccount"] =="true")
            {
              businessAccountsList[i]=data[j];
              i++;
            }
            else
            {
              personalAccountsList[k]=data[j];
              k++;
            }
          }
          if(businessAccountsList.length>0)               
          { 
            this.isBusinessAccountListValue=true;
            scope.filteredFromAcc = businessAccountsList;
            fromAccountsData = scope.groupResponseData(businessAccountsList,"fromMembershipName");
            if(personalAccountsList.length>0){
              scope.filteredFromAcc =businessAccountsList.concat(personalAccountsList);
              fromAccountsData["Personal Accounts"]=personalAccountsList;
            }
          }
          else if(personalAccountsList.length>0 && this.isBusinessAccountListValue==true)
          {
            fromAccountsData["Personal Accounts"]=personalAccountsList;
          }
        }
        if( this.isBusinessAccountListValue!=true)
        {                
          if(scope.searchApplied)
            fromAccountsData = this.groupResponseData(scope.filteredFromAcc, "accountType");
          else{
            scope.filteredFromAcc = this.filterRecordsList(data);
            fromAccountsData = this.groupResponseData(scope.filteredFromAcc, "accountType");
          }             
        }
        else{
          if(scope.searchApplied)
            fromAccountsData = this.groupResponseData(scope.filteredFromAcc, "fromMembershipName");
        }
        return fromAccountsData;
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in groupBusinessAndRetail",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**     
   * Component filterDataBasedOnPermissions
     * To filter Data Based On Permissions
     */
    filterDataBasedOnPermissions : function(data, transferTypeContext){
      var scope=this;
      try{
        var transferTypePermissions = [];
        switch (transferTypeContext) {
          case "Within Same Bank":
            transferTypePermissions.push("INTRA_BANK_FUND_TRANSFER_CREATE", "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
            break;
          case "Domestic Transfer":
            transferTypePermissions.push("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
            break;
          case "International Transfer":
            transferTypePermissions.push("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
            break;
          case "Pay a Person":
            transferTypePermissions.push("P2P_CREATE");
            break;
        }
        var dataPermissions=[],j=0;
        dataPermissions = data.filter(record => {
          if((!kony.sdk.isNullOrUndefined(record.fromActions)) || (!kony.sdk.isNullOrUndefined(record.actions))){
          var actions = record.fromActions? JSON.parse(record.fromActions) :JSON.parse(record.actions);
          return transferTypePermissions.some(permission => actions.includes(permission));
          }
        });
        if(dataPermissions.length==0)
        {
          data=[];
          return data;
        }
        else
        {
          return dataPermissions;
        }
      }catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in filterDataBasedOnPermissions",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /** Determines the Right screen to be navigated 

*/
    navigateToAmountScreen : function(rowData){
      var scope = this;
      if(this.context.transferType==="Within Same Bank"){
        if(rowData[0].beneType ==="external"){
          scope.invokeRender = true;
          scope.businessController.getCurrencyForThirdPartyToAccount();
        }
        if(rowData[0].beneType ==="internal"){
          if(rowData[0].groupType==="Loan" || rowData[0].groupType ==="CreditCard"){
            if(rowData[0].groupType==="Loan"){
              scope.invokeRender = true;
              scope.businessController.getLoanAccountDetails();
            }
            else{
              scope.navigateTo("flxOtherAmount","flxOtherAmountTop","Other Amount");
              scope.setTransferOtherAmount();
            } 
          }
          else{
            if(scope.isToAccountEdit === "true"){
              scope.setVerifyDetails();
              scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
            }
            else{
              scope.navigateTo("flxAmount", "flxAmountTop", "Amount");
              scope.setTransferAmount();
            }  
          }
        }
      }
      if(this.context.transferType ==="Domestic Transfer" || this.context.transferType ==="International Transfer"){
        scope.payeeFlow = "Existing";
        scope.invokeRender = true;
        scope.businessController.invokeValidateIBANService();
      }
      if (this.context.transferType === "Pay a Person") {
        scope.navigateTo("flxAmount", "flxAmountTop", "Amount");  
        scope.setTransferAmount();
      }
      scope.payeeFlow = "Existing";
    },

    /**     
   * Component setTransferOtherAmount
     * To setting data to other amount transfer screen
     */
    setTransferOtherAmount : function(){
      var scope = this;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var currencyCode = "";
      this.OtherAmtKeyboardDataSetting();
      if(transactionObject["toAccountType"]=="CreditCard"){
        for(i=0;i<object["Cache"]["CreditCardAccounts"]["Accounts"].length;i++){
          if(transactionObject["toAccountNumber"] == object["Cache"]["CreditCardAccounts"]["Accounts"][i]["accountID"])
            var selectedData = object["Cache"]["CreditCardAccounts"]["Accounts"][i];
        }
      }
      else{
        for(i=0;i<object["Cache"]["Accounts"]["Accounts"].length;i++){
          if(transactionObject["toAccountNumber"] == object["Cache"]["Accounts"]["Accounts"][i]["accountID"])
            var selectedData = object["Cache"]["Accounts"]["Accounts"][i];
        }
      }

      var date = transactionObject["dueDate"];
      if(!this.isEmptyNullUndefined(date)){
        date = this.businessController.getFormattedDate(new Date(date));
      }
      if(!this.isEmptyNullUndefined(transactionObject["dueDate"])){
        var dueDateLabel = this.businessController.getParsedDataBasedOnDataMapping("lblDueDate",this.controllerScope._dataMapping["flxDate"]);
        scope.view.lblDueDate.text = "("+dueDateLabel+" :"+ date +")";
        scope.view.lblDueDate.setVisibility(true);
      }
      else{
        scope.view.lblDueDate.setVisibility(false);
      }
      this.view.flxOtherAmountHeaderTop.skin = "sknFlx0095e4";
      this.view.lblOtherAmountHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblOtherAmountHeader", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.lblAmountType1.text = this.businessController.getParsedDataBasedOnDataMapping("lblAmountType1", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.lblAmount1.text = this.getFormattedData(this.controllerScope._dataMapping["flxOtherAmount"]["lblAmount1"], selectedData);
      this.view.btnOtherAmountContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnOtherAmountContinue", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.imgOtherAmountClear.onTouchEnd = this.clearOtherAmtKeypad.bind(this);
      this.view.btnOtherAmountContinue.onClick = this.transferOtherAmtContinue.bind(this);
      this.view.imgOtherAmountBack.onTouchEnd = this.goBack.bind(this);
      this.view.imgOtherAmountBack.src = "backbutton.png";
      this.view.btnOtherAmountCancel.onClick = this.onBack.bind(this);
      //scope.view.btnOtherAmountCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;
      //this.view.btnOtherAmountCancel.text = scope.getFieldValue(scope._cancelButton);
      this.view.flxOtherAmountInput.setVisibility(false);
      this.view.flxKeypad.setVisibility(false);
      this.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
      this.view.btnOtherAmountContinue.setEnabled(true);
      this.OtherAmtKeyboardDataSetting();
      this.view.flxOtherAmounts1.onClick = function(){
        scope.view.imgactive1.setVisibility(true);
        scope.view.imgactive2.setVisibility(false);
        scope.view.imgactive3.setVisibility(false);
        scope.view.imgactive4.setVisibility(false);
        scope.view.imgInactive1.setVisibility(false);
        scope.view.imgInactive2.setVisibility(true);
        scope.view.imgInactive3.setVisibility(true);
        scope.view.imgInactive4.setVisibility(true);
        scope.view.flxOtherAmountInput.setVisibility(false);
        scope.view.flxKeypad.setVisibility(false);
        scope.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
        scope.view.btnOtherAmountContinue.setEnabled(true);
        scope.view.flxOtherAmount.forceLayout();
      };

      this.view.lblAmountType2.text = this.businessController.getParsedDataBasedOnDataMapping("lblAmountType2", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.lblAmount2.text = this.getFormattedData(this.controllerScope._dataMapping["flxOtherAmount"]["lblAmount2"], selectedData);
      this.view.flxOtherAmounts2.onClick = function(){
        scope.view.imgactive1.setVisibility(false);
        scope.view.imgactive2.setVisibility(true);
        scope.view.imgactive3.setVisibility(false);
        scope.view.imgactive4.setVisibility(false);
        scope.view.imgInactive1.setVisibility(true);
        scope.view.imgInactive2.setVisibility(false);
        scope.view.imgInactive3.setVisibility(true);
        scope.view.imgInactive4.setVisibility(true);
        scope.view.flxOtherAmountInput.setVisibility(false);
        scope.view.flxKeypad.setVisibility(false);
        scope.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
        scope.view.btnOtherAmountContinue.setEnabled(true);
        scope.view.flxOtherAmount.forceLayout();
      };
      this.view.lblAmountType3.text = this.businessController.getParsedDataBasedOnDataMapping("lblAmountType3", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.lblAmount3.text = this.getFormattedData(this.controllerScope._dataMapping["flxOtherAmount"]["lblAmount3"], selectedData);
      this.view.flxOtherAmounts3.onClick = function(){
        scope.view.imgactive1.setVisibility(false);
        scope.view.imgactive2.setVisibility(false);
        scope.view.imgactive3.setVisibility(true);
        scope.view.imgactive4.setVisibility(false);
        scope.view.imgInactive1.setVisibility(true);
        scope.view.imgInactive2.setVisibility(true);
        scope.view.imgInactive3.setVisibility(false);
        scope.view.imgInactive4.setVisibility(true);
        scope.view.flxOtherAmountInput.setVisibility(false);
        scope.view.flxKeypad.setVisibility(false);
        scope.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
        scope.view.btnOtherAmountContinue.setEnabled(true);
        scope.view.flxOtherAmount.forceLayout();
      };

      this.view.lblAmountType4.text = this.businessController.getParsedDataBasedOnDataMapping("lblAmountType4", this.controllerScope._dataMapping["flxOtherAmount"]);
      this.view.lblCurrencySymbol.text =this.businessController.getCurrencySymbol(transactionObject["fromTransactionCurrency"]);
      this.view.flxOtherAmounts4.onClick = function(){
        scope.view.imgactive1.setVisibility(false);
        scope.view.imgactive2.setVisibility(false);
        scope.view.imgactive3.setVisibility(false);
        scope.view.imgactive4.setVisibility(true);
        scope.view.imgInactive1.setVisibility(true);
        scope.view.imgInactive2.setVisibility(true);
        scope.view.imgInactive3.setVisibility(true);
        scope.view.imgInactive4.setVisibility(false);
        scope.view.flxOtherAmountInput.setVisibility(true);
        scope.view.flxKeypad.setVisibility(true);

        if(scope.view.lblOtherAmount.text ==="0.00"||scope.view.lblOtherAmount.text ==="0"){
          scope.view.btnOtherAmountContinue.skin = "sknBtnOnBoardingInactive";
          scope.view.btnOtherAmountContinue.setEnabled(false);
        }else{
          scope.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
          scope.view.btnOtherAmountContinue.setEnabled(true);
        }
        scope.view.flxOtherAmount.forceLayout();
      };
      if(this.view.imgactive4.isVisible === true){
        scope.view.imgactive1.setVisibility(false);
        scope.view.imgactive2.setVisibility(false);
        scope.view.imgactive3.setVisibility(false);
        scope.view.imgactive4.setVisibility(true);
        scope.view.imgInactive1.setVisibility(true);
        scope.view.imgInactive2.setVisibility(true);
        scope.view.imgInactive3.setVisibility(true);
        scope.view.imgInactive4.setVisibility(false);
        scope.view.flxOtherAmountInput.setVisibility(true);
        scope.view.flxKeypad.setVisibility(true);
        if(scope.view.lblOtherAmount.text ==="0.00"||scope.view.lblOtherAmount.text ==="0"){
          scope.view.btnOtherAmountContinue.skin = "sknBtnOnBoardingInactive";
          scope.view.btnOtherAmountContinue.setEnabled(false);
        }else{
          scope.view.btnOtherAmountContinue.skin = "ICSknBtn003E7535PXmb";
          scope.view.btnOtherAmountContinue.setEnabled(true);
        }
        scope.view.flxOtherAmount.forceLayout();
      }
    },

    /**     
   * Component transferAmountContinue
     * To setting data on next of the amount flow
     */
    transferOtherAmtContinue : function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formatteddata = object["Collection"]["FormattedData"];
      if(this.view.imgactive1.isVisible === true){
        formatteddata["formattedTransferAmount"] = this.view.lblAmount1.text;
        transactionObject["transferAmount"] = this.view.lblAmount1.text.replace(/,/g, '').substring(1);
      }
      if(this.view.imgactive2.isVisible === true){
        formatteddata["formattedTransferAmount"] = this.view.lblAmount2.text;
        transactionObject["transferAmount"] = this.view.lblAmount2.text.replace(/,/g, '').substring(1);

      }
      if(this.view.imgactive3.isVisible === true){
        formatteddata["formattedTransferAmount"] = this.view.lblAmount3.text;
        transactionObject["transferAmount"] = this.view.lblAmount3.text.replace(/,/g, '').substring(1);

      }
      if(this.view.imgactive4.isVisible === true){
        formatteddata["formattedTransferAmount"] = this.businessController.getCurrencySymbol(transactionObject["fromTransactionCurrency"]) + this.view.lblOtherAmount.text;
        transactionObject["transferAmount"] = this.view.lblOtherAmount.text.replace(/,/g, '');
      }
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.businessController.setDataInCollection("FormattedData", formatteddata);  
      this.setVerifyDetails();
      this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop",this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
    },

    /**     
   * Component transferAmountContinue
     * To setting data on next of the amount flow
     */
    transferAmountContinue : function() {
      var scope = this;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      var formatteddata = object["Collection"]["FormattedData"];
      scope.amountSelectedFlowType = "";
      if(transactionObject["transactionCurrency"] === "EUR") {
        var amount = this.view.lblAmount.text.replace(/\./g, '');
        amount = amount.replace(/,/g, '.');
      } else {
        var amount = this.view.lblAmount.text.replace(/,/g, '');
      }
      if(amount >= 1) {
        var formatedAmount = this.businessController.getCurrencySymbol(transactionObject["transactionCurrency"])+this.view.flxAmountWrapper.lblAmount.text;
        formatteddata["formattedTransferAmount"] = formatedAmount;
        /////OSAMA
        transactionObject["transferAmount"] = this.view.flxAmountWrapper.lblAmount.text.replace(/,/g, '');
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        this.businessController.setDataInCollection("FormattedData", formatteddata);
        this.setVerifyDetails();
        this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
      } else {
        var symbol = this.businessController.getCurrencySymbol(transactionObject["transactionCurrency"]);
        var errMsg = kony.i18n.getLocalizedString("kony.mb.entitlements.minTransactionLimitUnreached")+" "+symbol+"1.00";
        scope.showToastMessageError(scope, errMsg);
        this.disableButton("btnContinue");
      }
    },

    /**
     * Component setPaymentMethod
     * Reponsible to set field properties of PaymentMethod.
     */    
    setPaymentMethod : function()
    {
      var scope=this;
      this.collectionObj = MakeATransferStore.getState();
      var transactionObject = this.collectionObj["Collection"]["TransactionObject"];
      try{     
        if(this.context["transferType"] == "Domestic Transfer") {
          this.setPaymentMethodFieldValues();
          if(this.isRepeatFlow === true) {
            for(var i=1;i<=4;i++) {
              if(scope.view["lblPaymentMethodOption"+i+"Header"].text == transactionObject.selectedPaymentMethod) {
                scope.setPaymentMethodValue = true;
                scope.selectPaymentMethod = i;
                break;
              }
            }
          }
          if(scope.isIBANValid=="NO" || this.collectionObj["Collection"]["IBAN"]["isIBANValid"] == "NO")
          {
            for(var i=1;i<=4;i++)
            {
              if(scope.view["lblPaymentMethodOption"+i+"Header"].text == "Instant" )
              {
                scope.view["flxPaymentMethodOption"+i].skin="ICSknFlx04A615Selected";
                scope.view["imgPaymentMethodTick"+i].setVisibility(true);                
                var disableOptions = i;
                this.invokeRender = false;
                var object = MakeATransferStore.getState();
                var transactionObject = object["Collection"]["TransactionObject"];
                var formattedObject = object["Collection"]["FormattedData"];
                transactionObject = transactionObject ? transactionObject : {};
                formattedObject = formattedObject ? formattedObject : {};
                transactionObject["selectedPaymentMethod"] = scope.view["lblPaymentMethodOption"+i+"Header"].text;
                formattedObject["paymentMethod"] = transactionObject["selectedPaymentMethod"];
                this.businessController.setDataInCollection("TransactionObject", transactionObject);
                this.businessController.setDataInCollection("FormattedData",formattedObject);                 
              }
              else
              {
                scope.view["flxPaymentMethodOption"+i].setEnabled(false);
                scope.view["flxPaymentMethodOption"+i].skin="ICSknFlxE3E3E3NotSelected";
                scope.view["imgPaymentMethodTick"+i].setVisibility(false);
              }
            }
          }
          else if(scope.isIBANValid=="YES" || this.collectionObj["Collection"]["IBAN"]["isIBANValid"] == "YES")
          {
            if(scope.setPaymentMethodValue=="")
            {
              for(var i=1;i<=4;i++)
              {
                if(scope.view["lblPaymentMethodOption"+i+"Header"].text == "Instant" && scope.setPaymentMethodValue =="")
                {
                  scope.view["flxPaymentMethodOption"+i].skin="ICSknFlx04A615Selected";
                  scope.view["imgPaymentMethodTick"+i].setVisibility(true);
                  var disableOptions = i;
                  this.invokeRender = false;
                  var object = MakeATransferStore.getState();
                  var transactionObject = object["Collection"]["TransactionObject"];
                  var formattedObject = object["Collection"]["FormattedData"];
                  transactionObject = transactionObject ? transactionObject : {};
                  formattedObject = formattedObject ? formattedObject : {};
                  transactionObject["selectedPaymentMethod"] = scope.view["lblPaymentMethodOption"+i+"Header"].text;
                  formattedObject["paymentMethod"] = transactionObject["selectedPaymentMethod"];
                  this.businessController.setDataInCollection("TransactionObject", transactionObject);
                  this.businessController.setDataInCollection("FormattedData",formattedObject);               
                }
                else
                {
                  if(scope.view["flxPaymentMethodOption"+i].skin == "ICSknFlx04A615Selected")
                  {
                    scope.view["flxPaymentMethodOption"+i].skin="ICSknFlxE3E3E3NotSelected";
                    scope.view["imgPaymentMethodTick"+i].setVisibility(false);
                  }
                  else{
                    scope.view["flxPaymentMethodOption"+i].setEnabled(true);
                    scope.view["flxPaymentMethodOption"+i].skin="ICSknFlxE3E3E3NotSelected";
                    scope.view["imgPaymentMethodTick"+i].setVisibility(false);
                  }
                }
                scope.view["flxPaymentMethodOption"+i].onTouchStart = scope.selectPaymentMethodOption.bind(this, i);
              }
            }
            else
            {
              for(var i=1;i<=4;i++){
                if( this.selectPaymentMethod !=i)
                {
                  scope.view["flxPaymentMethodOption"+i].setEnabled(true);
                  scope.view["flxPaymentMethodOption"+i].skin="ICSknFlxE3E3E3NotSelected";
                  scope.view["imgPaymentMethodTick"+i].setVisibility(false);
                }
                else
                {
                  scope.view["flxPaymentMethodOption"+i].setEnabled(true);
                  scope.view["flxPaymentMethodOption"+i].skin="ICSknFlx04A615Selected";
                  scope.view["imgPaymentMethodTick"+i].setVisibility(true);
                }
                scope.view["flxPaymentMethodOption"+i].onTouchStart = scope.selectPaymentMethodOption.bind(this, i);
              }
            }
          }
          for(var i=1;i<=4;i++)
            {
              if(scope.view["lblPaymentMethodOption"+i+"Header"].text == "Instant (High Value)" )
              {
                scope.view["flxPaymentMethodOption"+i].skin="ICSknFlxf7f7f7bodere3e3e3";
                scope.view["flxPaymentMethodOption"+i].setEnabled(false);
                break;
              }
            }
        } 
        scope.view.forceLayout();
      }catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the setPaymentMethod of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
  },

    /**     
   * Component selectPaymentMethodOption
     * To pass the selected data to next screen.
     */
    selectPaymentMethodOption : function(selectedPaymentMethods)
    {
      try{
        var scope = this; 
        this.isPaymentMethodSelected = true;
        this.setPaymentMethodValue = true;
        if(this.context["transferType"] == "Domestic Transfer") {
          if( this.selectPaymentMethod == "")
          {
            this.selectPaymentMethod = selectedPaymentMethods;
            for(var i=1;i<=4;i++)
            {
              if(scope.view["flxPaymentMethodOption"+i].skin == "ICSknFlx04A615Selected")
              {
                scope.view["flxPaymentMethodOption"+i].skin =  "ICSknFlxE3E3E3NotSelected";
                scope.view["imgPaymentMethodTick"+i].setVisibility(false);
              }
            }
            scope.view["flxPaymentMethodOption"+selectedPaymentMethods].skin = "ICSknFlx04A615Selected";
            scope.view["imgPaymentMethodTick"+selectedPaymentMethods].setVisibility(true);
            this.invokeRender = false;
            var object = MakeATransferStore.getState();
            var transactionObject = object["Collection"]["TransactionObject"];
            var formattedObject = object["Collection"]["FormattedData"];
            transactionObject = transactionObject ? transactionObject : {};
            formattedObject = formattedObject ? formattedObject : {};
            transactionObject["selectedPaymentMethod"] = scope.view["lblPaymentMethodOption"+selectedPaymentMethods+"Header"].text;
            formattedObject["paymentMethod"] = transactionObject["selectedPaymentMethod"];
            this.businessController.setDataInCollection("TransactionObject", transactionObject);
            this.businessController.setDataInCollection("FormattedData",formattedObject);
            scope.UpdatePaymentServiceValue(transactionObject["selectedPaymentMethod"]);
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
          }
          else
          {
            for(var i=1;i<=4;i++)
            {
              if(scope.view["flxPaymentMethodOption"+i].skin == "ICSknFlx04A615Selected" )
              {
                scope.view["flxPaymentMethodOption"+i].skin = "ICSknFlxE3E3E3NotSelected";
                scope.view["imgPaymentMethodTick"+i].setVisibility(false);
              }
            }
            scope.view["flxPaymentMethodOption"+this.selectPaymentMethod].skin = "ICSknFlxE3E3E3NotSelected";
            scope.view["imgPaymentMethodTick"+this.selectPaymentMethod].setVisibility(false);             
            this.selectPaymentMethod = selectedPaymentMethods;          
            scope.view["flxPaymentMethodOption"+selectedPaymentMethods].skin = "ICSknFlx04A615Selected";
            scope.view["imgPaymentMethodTick"+selectedPaymentMethods].setVisibility(true);
            this.invokeRender = false;
            var object = MakeATransferStore.getState();
            var transactionObject = object["Collection"]["TransactionObject"];
            var formattedObject = object["Collection"]["FormattedData"];
            transactionObject = transactionObject ? transactionObject : {};
            formattedObject = formattedObject ? formattedObject : {};
            transactionObject["selectedPaymentMethod"] = scope.view["lblPaymentMethodOption"+selectedPaymentMethods+"Header"].text;
            formattedObject["paymentMethod"] = transactionObject["selectedPaymentMethod"];
            this.businessController.setDataInCollection("TransactionObject", transactionObject);
            this.businessController.setDataInCollection("FormattedData",formattedObject);
            scope.UpdatePaymentServiceValue(transactionObject["selectedPaymentMethod"]);            
            scope.setVerifyDetails();
            scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
          }
        }
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in selectPaymentMethod method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component UpdatePaymentServiceValue
     * Reponsible to update the payment service option value
     */  
    UpdatePaymentServiceValue : function(selectedPayment)
    {
      var scope = this;
      try{
        var servicePaymentOptions = this.controllerScope._dataMapping["paymentMethod"]["servicePaymentMethodValues"];
        var keys = Object.keys(servicePaymentOptions);
        for(key = 0;key < keys.length; key++)
        {
          if(selectedPayment == keys[key])
          {
            var selectedValue = servicePaymentOptions[keys[key]]["paymentType"];
            this.invokeRender = false;
            var object = MakeATransferStore.getState();
            var transactionObject = object["Collection"]["TransactionObject"];
            var formattedObject = object["Collection"]["FormattedData"];
            transactionObject = transactionObject ? transactionObject : {};
            formattedObject = formattedObject ? formattedObject : {};
            transactionObject["selectedServicePayment"] = selectedValue;
            formattedObject["selectedServicePayment"] = selectedValue;
            this.businessController.setDataInCollection("TransactionObject", transactionObject);
            this.businessController.setDataInCollection("FormattedData",formattedObject);
          }
        }
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in UpdatePaymentServiceValue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);

      }
    },
    /**     
   * Component setPaymentMethodFieldValues
     * To pass the selected data to next screen.
     */
    setPaymentMethodFieldValues : function()
    {
      var scope = this;
      try{
          this.view.flxPaymentMethodHeader.skin = "sknFlx0095e4";
          this.view.imgPaymentMethodBack.src = "backbutton.png";
          this.view.lblPaymentMethodHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblPaymentMethodHeader", this.controllerScope._dataMapping["paymentMethod"]);
          this.view.lblPaymentMethodHeader.skin = "ICSknLblfffffSSPSemiBold76px";
          scope.view.flxPaymentMethodBack.onTouchStart = scope.goBack;
          this.view.lblPaymentMethodDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblPaymentMethodDescription", this.controllerScope._dataMapping["paymentMethod"]);
          this.view.lblPaymentMethodDescription.skin = "ICSknLbl727272SSPReg34px";
          this.view.flxPaymentMethodSeparator.skin = "sknFlxSeparatora6a6a6";
          this.view.flxPaymentMethodDescription.skin = "sknFlxffffff";
          this.view.imgPaymentMethodTick1.src = "selectedtick.png";
          this.view.imgPaymentMethodTick2.src = "selectedtick.png";
          this.view.imgPaymentMethodTick3.src = "selectedtick.png";
          this.view.lblPaymentMethodOption1Header.text = this.businessController.getParsedDataBasedOnDataMapping("optionValue", this.controllerScope._dataMapping["paymentMethod"]["option1"]);
          this.view.lblPaymentMethodOption1Header.skin = "ICSknLbl424242B41px";
          this.view.lblPaymentMethodOption1Description.text = this.businessController.getParsedDataBasedOnDataMapping("description", this.controllerScope._dataMapping["paymentMethod"]["option1"]);
          this.view.lblPaymentMethodOption1Description.skin = "ICSknLbl72727230px";
          this.view.lblPaymentMethodOption2Header.text = this.businessController.getParsedDataBasedOnDataMapping("optionValue", this.controllerScope._dataMapping["paymentMethod"]["option2"]);
          this.view.lblPaymentMethodOption2Header.skin = "ICSknLbl424242B41px";
          this.view.lblPaymentMethodOption2Description.text = this.businessController.getParsedDataBasedOnDataMapping("description", this.controllerScope._dataMapping["paymentMethod"]["option2"]);
          this.view.lblPaymentMethodOption2Description.skin = "ICSknLbl72727230px";
          this.view.lblPaymentMethodOption3Header.text = this.businessController.getParsedDataBasedOnDataMapping("optionValue", this.controllerScope._dataMapping["paymentMethod"]["option3"]);
          this.view.lblPaymentMethodOption3Header.skin = "ICSknLbl424242B41px";
          this.view.lblPaymentMethodOption3Description.text = this.businessController.getParsedDataBasedOnDataMapping("description", this.controllerScope._dataMapping["paymentMethod"]["option3"]);
          this.view.lblPaymentMethodOption3Description.skin = "ICSknLbl72727230px";
          this.view.flxPaymentMethodOption4Container.setVisibility(false);
          this.view.forceLayout();
      }catch (err) {
        kony.print(err.message);
        var errorObj = {
          "errorInfo": "Error in the setPaymentMethodField values of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    /**     
   * Component setIntermediaryBIC
     * To update the values of the  IntermediaryBIC fields
     */
    setIntermediaryBIC : function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      this.view.flxIntermediaryHeader.lblIntermediaryBICHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblIntermediaryBICHeader", this.controllerScope._dataMapping["flxIntermediaryBIC"]);
      this.view.imgIntermediaryBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxIntermediaryBICMainContainer.lblIntermediaryBIC.text = this.businessController.getParsedDataBasedOnDataMapping("lblIntermediaryBIC", this.controllerScope._dataMapping["flxIntermediaryBIC"]);
      this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxIntermediaryBIC"]["txtIntermediaryBIC"]);
      this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", this.controllerScope._dataMapping["flxIntermediaryBIC"]["txtIntermediaryBIC"]["length"]);
      this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.textInputMode = this.businessController.getParsedDataBasedOnDataMapping("inputMode", this.controllerScope._dataMapping["flxIntermediaryBIC"]["txtIntermediaryBIC"]);
      this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.onTextChange = this.enableIntermediaryBICBtn.bind(this);
      this.view.txtIntermediaryBIC.focusSkin = "ICSknTxt003E751px"  
      this.view.btnIntermediaryBICContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnIntermediaryBICContinue", this.controllerScope._dataMapping["flxIntermediaryBIC"]);
      this.view.btnIntermediaryBICContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnIntermediaryBICContinue.setEnabled(false);
      this.view.btnIntermediaryBICContinue.onClick = this.IntermediaryBICBtnContinue.bind(this);
      this.view.btnIntermediaryCancel.onClick = this.onBack.bind(this);
      //this.view.btnIntermediaryCancel.text = this.getFieldValue(this._cancelButton);
      //this.view.btnIntermediaryCancel.isVisible = !this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)) ? true : false;
      this.view.flxIntermediaryHeader.lblIntermediaryBICHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxIntermediaryHeader.skin = "sknFlx0095e4";
      if(!this.isEmptyNullUndefined(transactionObject["intermediaryBIC"])){
        this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text =transactionObject["intermediaryBIC"];
        this.enableButton("btnIntermediaryBICContinue");
      } else  {
        this.view.txtIntermediaryBIC.text = "";
        this.disableButton("btnIntermediaryBICContinue");
      }
    },

    /**     
   * Component enableIntermediaryBICBtn
     * To enable the continue button for Intermediary BIC page
     */
    enableIntermediaryBICBtn : function(){
      if(this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text.length === 8 || this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text.length === 11){
        this.view.btnIntermediaryBICContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnIntermediaryBICContinue.setEnabled(true);
      }else{
        this.view.btnIntermediaryBICContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnIntermediaryBICContinue.setEnabled(false);
      }
      this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text = this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text.toUpperCase();
    },

    /**     
   * Component IntermediaryBICBtnContinue
     * To navigate to next page with Intermediary BIC data
     */
    IntermediaryBICBtnContinue : function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["intermediaryBIC"] = this.view.flxIntermediaryBICWrapper.txtIntermediaryBIC.text;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.businessController.getBankDetailsFromBicCode();
    },


    /**
     * Component setFXRateReference
     * Reponsible to set field properties of Rate Reference.
     */
    setFXRateReference : function() {
      try {
        var scope = this;
        scope.view.flxFXRateReferenceBack.onTouchStart = scope.goBack.bind(this);
        scope.view.lblFXRateReferenceHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblFXRateReferenceHeader", this.controllerScope._dataMapping["flxFXRateReference"]);
        scope.view.lblFxRateReference.text = this.businessController.getParsedDataBasedOnDataMapping("lblFxRateReference", this.controllerScope._dataMapping["flxFXRateReference"]);
        scope.view.txtFXRateReference.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxFXRateReference"]["txtFXRateReference"]);
        scope.view.txtFXRateReference.restrictCharactersSet = this.businessController.getParsedDataBasedOnDataMapping("restrictChars", this.controllerScope._dataMapping["flxFXRateReference"]["txtFXRateReference"]);
        scope.view.btnFxRateContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnFxRateContinue", this.controllerScope._dataMapping["flxFXRateReference"]);
        scope.view.txtFXRateReference.onTextChange = scope.onFXRateReferenceTextChange.bind(this);
        scope.view.btnFxRateContinue.onClick = scope.onFXRateReferenceContinueClick.bind(this);
        scope.view.btnFxRateContinue.setEnabled(false);
        var transferType = this.context["selectedFlowType"];
        if(transferType === "EDIT") {
          scope.view.txtFXRateReference.text = scope.getFieldValue(scope._txtInputfxRateReference, "text");
          scope.onFXRateReferenceTextChange();
        } else {
          scope.view.txtFXRateReference.text = "";
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFXRateReference method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onFXRateReferenceTextChange
     * Continue button Validation based on recipeintname limit.
     */
    onFXRateReferenceTextChange : function(){
      try {
        var scope = this;
        var minlength = this.businessController.getParsedDataBasedOnDataMapping("min", this.controllerScope._dataMapping["flxFXRateReference"]["txtFXRateReference"]["length"]);
        var maxlength = this.businessController.getParsedDataBasedOnDataMapping("max", this.controllerScope._dataMapping["flxFXRateReference"]["txtFXRateReference"]["length"]);
        title = scope.view.txtFXRateReference.text;
        if(title.length >= minlength && title.length <= maxlength) {
          scope.view.btnFxRateContinue.setEnabled(true);
          scope.view.btnFxRateContinue.skin = "ICSknBtn003E7535PXmb";
        } else {
          scope.view.btnFxRateContinue.setEnabled(false);
          scope.view.btnFxRateContinue.skin = "sknBtnOnBoardingInactive";
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onFXRateReferenceTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },


    /**
     * Component onFXRateReferenceContinueClick
     * Navigate to next form based on transfer type.
     */
    onFXRateReferenceContinueClick : function(){
      try {
        var scope = this;
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if(!kony.sdk.isNullOrUndefined(scope.view.txtFXRateReference.text) && scope.view.txtFXRateReference.text !== "") {
          transactionObject["fxRateRef"] = scope.view.txtFXRateReference.text;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
        }
        var transferType = this.context["selectedFlowType"];
        if(transferType === "EDIT") {
          this.setVerifyDetails();
          scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.businessController.getParsedDataBasedOnDataMapping("lblVerifyName", this.controllerScope._dataMapping["flxVerifyDetails"]));
        } 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onFXRateReferenceContinueClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    setAddNewPayeeData : function() {
      try {
        var scope = this;
        scope.payeeFlow = "New";
        scope.fileNames = [];
        scope.fileContents = [];
        scope.fileTypes= [];
        this.invokeRender = false;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var formattedObject = object["Collection"]["FormattedData"];
        if (scope.context["transferType"] === "Within Same Bank") {
          transactionObject["isSameBankAccount"] = "true";
          transactionObject["isInternationalAccount"] = "false";
          formattedObject["isSameBankAccount"] = "true";
          formattedObject["isInternationalAccount"] = "false";
        }
        if (scope.context["transferType"] === "Domestic Transfer") {
          transactionObject["isSameBankAccount"] = "false";
          transactionObject["isInternationalAccount"] = "false";
          formattedObject["isSameBankAccount"] = "false";
          formattedObject["isInternationalAccount"] = "false";
          transactionObject["swiftCode"] = "";
        }
        if (scope.context["transferType"] === "International Transfer") {
          transactionObject["isSameBankAccount"] = "false";
          transactionObject["isInternationalAccount"] = "true";
          formattedObject["isSameBankAccount"] = "false";
          formattedObject["isInternationalAccount"] = "true";
          transactionObject["swiftCode"] = "";
        }
        if (scope.context["transferType"] === "Pay a Person") {
          transactionObject["isSameBankAccount"] = "true";
          transactionObject["isInternationalAccount"] = "false";
          formattedObject["isSameBankAccount"] = "true";
          formattedObject["isInternationalAccount"] = "false";
        }
        scope.businessController.setDataInCollection("TransactionObject", transactionObject);
        scope.businessController.setDataInCollection("FormattedData", formattedObject);
        scope.setRecipientName();
        scope.navigateTo("flxRecipientsName", "flxRecipientsNameTop", kony.i18n.getLocalizedString("i18n.unified.recipientsName"));
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in setAddNewPayeeData",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },

    setRecipientName : function() {
      try {
        var scope = this;
        scope.setRecipientNameWidgetProps();
        scope.view.btnRecipientsNameContinue.onClick = scope.onRecipientsContinueClick.bind(this);
        scope.view.txtRecipientName.onTextChange = scope.onRecipientNameTextChange.bind(this);
        scope.view.flxRecipientsNameBack.onTouchStart = scope.goBack;
        scope.view.btnRecipientsNameCancel.onClick = scope.onBack.bind(this);
        scope.view.txtRecipientName.setFocus(true);
        scope.view.txtRecipientName.text = "";
        scope.disableButton("btnRecipientsNameContinue");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setRecipientName method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    setRecipientNameWidgetProps : function() {
      try{
        var scope = this;
        // Skin for widget Properties.
        scope.view.flxRecipientsNameHeader.skin = "sknFlx0095e4";
        scope.view.imgRecipientsNameBack.src = "backbutton.png";
        scope.view.lblRecipientsNameHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.flxRecipientsNameDescription.skin = "sknFlxffffff";
        scope.view.lblRecipientsNameDescription.skin = "ICSknLbl727272SSPReg34px";
        scope.view.flxRecipientsnameSeparator.skin = "sknFlxSeparatora6a6a6";
        scope.view.txtRecipientName.skin = "ICSknTxtE3E3E31px34px";
        scope.view.txtRecipientName.focusSkin = "ICSknTxt003E751px";
        scope.view.btnRecipientsNameCancel.skin = "ICSKnBtnffffff15px";
        // Text Properties.
        scope.view.btnRecipientsNameCancel.text = scope.businessController.getParsedDataBasedOnDataMapping("btnRecipientsNameCancel", scope.controllerScope._dataMapping["flxRecipientsName"]);
        scope.view.btnRecipientsNameCancel.isVisible = !scope.isEmptyNullUndefined(scope.businessController.getParsedDataBasedOnDataMapping("btnRecipientsNameCancel", scope.controllerScope._dataMapping["flxRecipientsName"])) ? true : false;
        scope.view.lblRecipientsNameHeader.text = scope.businessController.getParsedDataBasedOnDataMapping("lblRecipientsNameHeader", scope.controllerScope._dataMapping["flxRecipientsName"]);
        scope.view.txtRecipientName.restrictCharactersSet = scope.getRecipientNameConfigurations()["restrictCharacters"];
        scope.view.lblRecipientsNameDescription.text = scope.businessController.getParsedDataBasedOnDataMapping("lblRecipientsNameDescription", scope.controllerScope._dataMapping["flxRecipientsName"]);
        scope.view.txtRecipientName.placeholder = scope.businessController.getParsedDataBasedOnDataMapping("placeHolder", scope.controllerScope._dataMapping["flxRecipientsName"]["txtRecipientName"]);
        scope.view.txtRecipientName.textInputMode = scope.getRecipientNameConfigurations()["textInputMode"];
        scope.view.txtRecipientName.maxTextLength = scope.getRecipientNameConfigurations()["maxTextLength"];
        scope.view.btnRecipientsNameContinue.text = scope.businessController.getParsedDataBasedOnDataMapping("btnRecipientsNameContinue", scope.controllerScope._dataMapping["flxRecipientsName"]);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setRecipientNameWidgetProps method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    setBankStreet: function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      this.view.imgPayeeBankStreetBack.src="backbutton.png";
      this.view.flxPayeeBankStreetHeader.lblPayeeBankStreetHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankStreetHeader", this.controllerScope._dataMapping["flxPayeeBankStreet"]);
      this.view.imgPayeeBankStreetBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxPayeeBankStreetDescription.lblPayeeBankStreetDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankStreetDescription", this.controllerScope._dataMapping["flxPayeeBankStreet"]);
      this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxPayeeBankStreet"]["txtPayeeBankStreet"]);
      this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", this.controllerScope._dataMapping["flxPayeeBankStreet"]["txtPayeeBankStreet"]["length"]);
      this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.onTextChange = this.enableBankStreetBtn.bind(this);
      this.view.txtPayeeBankStreet.focusSkin = "ICSknTxt003E751px"  
      this.view.btnPayeeBankStreetContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnPayeeBankStreetContinue", this.controllerScope._dataMapping["flxPayeeBankStreet"]);
      this.view.btnPayeeBankStreetContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnPayeeBankStreetContinue.setEnabled(false);
      this.view.btnPayeeBankStreetContinue.onClick = this.bankStreetBtnContinue.bind(this);
      this.view.btnPayeeBankStreetCancel.onClick = this.onBack.bind(this);
      this.view.flxPayeeBankStreetHeader.lblPayeeBankStreetHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxPayeeBankStreetHeader.skin = "sknFlx0095e4";
      if(!this.isEmptyNullUndefined(transactionObject["streetName"])){
        this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.text =transactionObject["streetName"];
        this.enableButton("btnPayeeBankStreetContinue");
      } else  {
        this.view.txtPayeeBankStreet.text = "";
        this.disableButton("btnPayeeBankStreetContinue");
      }
    },
    /**     
* Component enableBankStreet
 * To enable the continue button for Street page
 */
    enableBankStreetBtn: function () {
      if (this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.text.length <= 140) {
        this.view.btnPayeeBankStreetContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnPayeeBankStreetContinue.setEnabled(true);
      } else {
        this.view.btnPayeeBankStreetContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnPayeeBankStreetContinue.setEnabled(false);
      }
    },

    bankStreetBtnContinue: function () {
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["streetName"] = this.view.flxPayeeBankStreetWrapper.txtPayeeBankStreet.text;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.setDataAndNavigateBasedOnPreviousScreen();
    },

    setDataAndNavigateBasedOnPreviousScreen: function () {
      var stackLength = this.stack.length;
      var previousScreen = this.stack[stackLength - 2];
      if (previousScreen == "flxVerifyDetails")
        this.setVerifyDetails();
      else
        this.setRequiredCode();
      this.goBack();
    },
    setBankTown: function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      this.view.imgPayeeBankTownBack.src="backbutton.png";
      this.view.flxPayeeBankTownHeader.lblPayeeBankTownHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankTownHeader", this.controllerScope._dataMapping["flxPayeeBankTown"]);
      this.view.imgPayeeBankTownBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxPayeeBankTownDescription.lblPayeeBankTownDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankTownDescription", this.controllerScope._dataMapping["flxPayeeBankTown"]);
      this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxPayeeBankTown"]["txtPayeeBankTown"]);
      this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", this.controllerScope._dataMapping["flxPayeeBankTown"]["txtPayeeBankTown"]["length"]);
      this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.textInputMode = this.businessController.getParsedDataBasedOnDataMapping("inputMode", this.controllerScope._dataMapping["flxPayeeBankTown"]["txtPayeeBankTown"]);
      this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.onTextChange = this.enableBankTownBtn.bind(this);
      this.view.txtPayeeBankTown.focusSkin = "ICSknTxt003E751px"  
      this.view.btnPayeeBankTownContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnPayeeBankTownContinue", this.controllerScope._dataMapping["flxPayeeBankTown"]);
      this.view.btnPayeeBankTownContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnPayeeBankTownContinue.setEnabled(false);
      this.view.btnPayeeBankTownContinue.onClick = this.bankTownBtnContinue.bind(this);
      this.view.btnPayeeBankTownCancel.onClick = this.onBack.bind(this);
      this.view.flxPayeeBankTownHeader.lblPayeeBankTownHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxPayeeBankTownHeader.skin = "sknFlx0095e4";
      if(!this.isEmptyNullUndefined(transactionObject["townName"])){
        this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.text =transactionObject["townName"];
        this.enableButton("btnPayeeBankTownContinue");
      } else  {
        this.view.txtPayeeBankTown.text = "";
        this.disableButton("btnPayeeBankTownContinue");
      }
    },
    /**     
* Component enableBankTown
* To enable the continue button for Town page
*/
    enableBankTownBtn: function () {
      if (this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.text.length <= 140) {
        this.view.btnPayeeBankTownContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnPayeeBankTownContinue.setEnabled(true);
      } else {
        this.view.btnPayeeBankTownContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnPayeeBankTownContinue.setEnabled(false);
      }
    },

    bankTownBtnContinue: function () {
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["townName"] = this.view.flxPayeeBankTownWrapper.txtPayeeBankTown.text;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.setDataAndNavigateBasedOnPreviousScreen();
    },
 
    setPayeeBankName: function(){
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      this.view.imgPayeeBankNameBack.src="backbutton.png";
      this.view.flxPayeeBankNameHeader.lblPayeeBankNameHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankNameHeader", this.controllerScope._dataMapping["flxPayeeBankName"]);
      this.view.imgPayeeBankNameBack.onTouchEnd = this.goBack.bind(this);
      this.view.flxPayeeBankNameDescription.lblPayeeBankNameDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblPayeeBankNameDescription", this.controllerScope._dataMapping["flxPayeeBankName"]);
      this.view.flxPayeeBankNameWrapper.txtPayeeBankName.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxPayeeBankName"]["txtPayeeBankName"]);
      this.view.flxPayeeBankNameWrapper.txtPayeeBankName.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", this.controllerScope._dataMapping["flxPayeeBankName"]["txtPayeeBankName"]["length"]);
      this.view.flxPayeeBankNameWrapper.txtPayeeBankName.textInputMode = this.businessController.getParsedDataBasedOnDataMapping("inputMode", this.controllerScope._dataMapping["flxPayeeBankName"]["txtPayeeBankName"]);
      this.view.flxPayeeBankNameWrapper.txtPayeeBankName.onTextChange = this.enableBankNameBtn.bind(this);
      this.view.txtPayeeBankName.focusSkin = "ICSknTxt003E751px"  
      this.view.btnPayeeBankNameContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnPayeeBankNameContinue", this.controllerScope._dataMapping["flxPayeeBankName"]);
      this.view.btnPayeeBankNameContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnPayeeBankNameContinue.setEnabled(false);
      this.view.btnPayeeBankNameContinue.onClick = this.bankNameBtnContinue.bind(this);
      this.view.btnPayeeBankNameCancel.onClick = this.onBack.bind(this);
      this.view.flxPayeeBankNameHeader.lblPayeeBankNameHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxPayeeBankNameHeader.skin = "sknFlx0095e4";
      if(!this.isEmptyNullUndefined(transactionObject["bankName"])){
        this.view.flxPayeeBankNameWrapper.txtPayeeBankName.text =transactionObject["bankName"];
        this.enableButton("btnPayeeBankNameContinue");
      } else  {
        this.view.txtPayeeBankName.text = "";
        this.disableButton("btnPayeeBankNameContinue");
      }
    },

    enableBankNameBtn: function () {
      if (this.view.flxPayeeBankNameWrapper.txtPayeeBankName.text.length <= 105) {
        this.view.btnPayeeBankNameContinue.skin = "ICSknBtn003E7535PXmb";
        this.view.btnPayeeBankNameContinue.setEnabled(true);
      } else {
        this.view.btnPayeeBankNameContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnPayeeBankNameContinue.setEnabled(false);
      }
    },

    bankNameBtnContinue: function () {
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["bankName"] = this.view.flxPayeeBankNameWrapper.txtPayeeBankName.text;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.setDataAndNavigateBasedOnPreviousScreen();
    },

    getRecipientNameConfigurations : function() {
      try {
        return {
          "restrictCharacters" : "!@#&*_'-.,",
          "textInputMode": "ANY",
          "maxTextLength": 20,
          "minTextLength": 2
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getRecipientNameConfigurations method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    onRecipientsContinueClick : function() {
      try {
        var scope = this;
        scope.view.txtRecipientName.skin = "ICSknTxtE3E3E31px34px";
        if(!kony.sdk.isNullOrUndefined(scope.view.txtRecipientName.text) && scope.view.txtRecipientName.text !== "") {
          this.invokeRender = false;
          var object = MakeATransferStore.getState();
          var transactionObject = object["Collection"]["TransactionObject"];
          var formattedObject = object["Collection"]["FormattedData"];
          transactionObject["beneficiaryName"] = scope.view.txtRecipientName.text;
          formattedObject["beneficiaryName"] = scope.view.txtRecipientName.text;
          scope.businessController.setDataInCollection("TransactionObject", transactionObject);
          scope.businessController.setDataInCollection("FormattedData", formattedObject);
        }
        if (scope.context["transferType"] === "Pay a Person") {
          scope.setContactType();
          scope.navigateTo("flxContactType", "flxContactTypeTop", kony.i18n.getLocalizedString("i.i18n.unified.contactType"));
        }
        else {
          scope.navigateTo("flxAccountNumber", "flxAccountNumberTop", kony.i18n.getLocalizedString("i.kony.mb.enroll.accountNumber"));
          scope.setPayeeAccountNumber(); 
          scope.keyboardDataSettingAccountNumber();
        }
      } catch (err) {
        var errObj = {
          "errorInfo" : "Error in onRecipientsContinueClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    onRecipientNameTextChange : function() {
      try {
        var scope = this;
        var minlength = scope.getRecipientNameConfigurations()["minTextLength"]; 
        var maxlength = scope.getRecipientNameConfigurations()["maxTextLength"];  
        var title = scope.view.txtRecipientName.text;
        var isValidUserName = scope.businessController.isValidUserName(title, minlength, maxlength);
        if (isValidUserName) {
          scope.enableButton("btnRecipientsNameContinue");
        }
        else {
          scope.disableButton("btnRecipientsNameContinue");
        } 
      } catch (err) {
        var errObj = {
          "errorInfo" : "Error in onRecipientNameTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component setSupportingDocuments
     * To bind the events and field properties for supporting documents.
     */
    setSupportingDocuments : function() {
      try {
        var scope = this;
        var deviceName= kony.os.deviceInfo()["name"];
        scope.setSelectOptions();
        scope.view.imgAddIcon.onTouchStart = scope.showFileSelectionOption.bind(this);
        scope.view.flxSelectOptionsCancel.onTouchStart = scope.hideFileSelectionOption.bind(this);
        if(deviceName === "iPhone" || deviceName === "android" || deviceName === "Android") 
        {scope.view.camTakePhoto.onCapture = scope.openCamera.bind(this);}
        scope.view.lblPhotoLibrary.onTouchStart = scope.fileSelectionFromGallery.bind(this);
        scope.view.lblDrive.onTouchStart = scope.selectDocuments.bind(this);
        scope.view.btnSupportingCancel.onClick = scope.onSizePopupClick.bind(this);
        scope.view.flxVerifyDetailMainContainer.setEnabled(true);
        scope.view.flxSupportingDocRemove.setVisibility(false);
        scope.view.flxSupportingDocSizePopup.setVisibility(false);
        scope.view.flxSupportingDocSelectOptions.setVisibility(false);
        if(scope.fileNames.length > 0) {
          scope.view.flxSupportDocumentExpand.setVisibility(true);
        } else {
          scope.view.flxSupportDocumentExpand.setVisibility(false);
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSupportingDocuments method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setSelectOptions
     * To set the properties of select options.
     */
    setSelectOptions : function() {
      try {
        var scope = this;
        var deviceName= kony.os.deviceInfo()["name"];
        scope.view.lblDocumentTitle.text =this.businessController.getParsedDataBasedOnDataMapping("lblDocumentTitle", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        if (kony.theme.getCurrentTheme() == "darkTheme") {
            scope.view.imgAddIcon.src = "add_attachment_dark.png";
        } else {
            scope.view.imgAddIcon.src = "add_attachment.png";
        }
        // var visible1 = "{"text":"{i.i18n.unified.takePhoto}","visible":true}";
        if(deviceName === "iPhone" || deviceName === "android" || deviceName === "Android") 
        {scope.view.camTakePhoto.setVisibility(true);
         scope.view.camTakePhoto.text = this.businessController.getParsedDataBasedOnDataMapping("camTakePhoto", this.controllerScope._dataMapping["flxSupportingDocuments"]);
         scope.view.camTakePhoto.skin = "ICSkn007aff45px";}
        //var visible2 = "{"text":"{i.i18n.unified.photoLibrary}","visible":true}";
        scope.view.lblPhotoLibrary.setVisibility(true);
        scope.view.lblPhotoLibrary.text = this.businessController.getParsedDataBasedOnDataMapping("lblPhotoLibrary", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        // var visible3 = "{"text":"{i.i18n.unified.googleDrive}","visible":true}";
        scope.view.lblDrive.setVisibility(true);
        scope.view.lblDrive.text = this.businessController.getParsedDataBasedOnDataMapping("lblDrive", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        // var visible4 = "{"text":"{i.i18n.unified.dropBox}","visible":false}";
        scope.view.lblDropbox.setVisibility(false);
        scope.view.lblDropbox.text = this.businessController.getParsedDataBasedOnDataMapping("lblDropbox", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.lblSeperatorDocsCancel.text = this.businessController.getParsedDataBasedOnDataMapping("lblSeperatorDocsCancel", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.lblRemoveConfirmTitle.text =this.businessController.getParsedDataBasedOnDataMapping("lblRemoveConfirmTitle", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.btnRemoveYes.text = this.businessController.getParsedDataBasedOnDataMapping("btnRemoveYes", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.btnRemoveNo.text = this.businessController.getParsedDataBasedOnDataMapping("btnRemoveNo", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.lblSupportingTitle.text = this.businessController.getParsedDataBasedOnDataMapping("lblSupportingTitle", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        scope.view.btnSupportingCancel.text = this.businessController.getParsedDataBasedOnDataMapping("btnSupportingCancel", this.controllerScope._dataMapping["flxSupportingDocuments"]);
        // Widgets skins
        scope.view.lblDocumentTitle.skin = "sknMMLeftLabels"; 
        scope.view.lblPhotoLibrary.skin = "ICSkn007AFFSFReg45px";
        scope.view.lblDrive.skin = "ICSkn007AFFSFReg45px";
        scope.view.lblDropbox.skin = "ICSkn007AFFSFReg45px";
        scope.view.lblSeperatorDocsCancel.skin = "ICSknLbl007AFFSFDisplayBold45px";
        scope.view.lblRemoveConfirmTitle.skin = "ICSknLbl727272SSPReg34px";
        scope.view.btnRemoveYes.skin = "ICSknBtn4176A434px";
        scope.view.btnRemoveNo.skin = "ICSknBtn4176A434px";
        scope.view.lblSupportingTitle.skin = "ICSknLbl000000SB39px";
        scope.view.btnSupportingCancel.skin = "ICSkn007AFFSFReg34px";
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSelectOptions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component onSizePopupClick
     * To set the visibility of size error popup.
     */
    onSizePopupClick : function () {
      try {
        var scope = this;
        scope.view.flxSupportingDocSizePopup.setVisibility(false);
        scope.view.flxVerifyDetailMainContainer.setEnabled(true);
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onSizePopupClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component showFileSelectionOption
     * To set the visibility of selectoptions.
     */
    showFileSelectionOption : function () {
      try {
        var scope = this;
        scope.view.flxSupportingDocSelectOptions.setVisibility(true);
        scope.view.flxVerifyDetailMainContainer.setEnabled(false);
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in showFileSelectionOption method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component hideFileSelectionOption
     * To set the visibility of selectoptions.
     */
    hideFileSelectionOption: function () {
      try {
        var scope = this;
        scope.view.flxSupportingDocSelectOptions.setVisibility(false);
        scope.view.flxVerifyDetailMainContainer.setEnabled(true);
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in hideFileSelectionOption method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     ** Component fileSelectionFromGallery
     ** Select
     */
    fileSelectionFromGallery : function () {
      var scope = this;
      var queryContext = {
        mimetype:"image/*"
      };
      try {
        kony.phone.openMediaGallery(this.fileSelectionCallback.bind(scope),queryContext);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in fileSelectionFromGallery method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component selectDocuments
     * To open media gallery.
     */
    selectDocuments : function() {
      var scope = this;
      if (kony.os.deviceInfo().name === "iPhone") {
        scope.uploadIphoneDocument();
      } else{
        var queryContext = {
          mimetype: "application/*"
        };
        try{
          kony.phone.openMediaGallery(this.fileSelectionCallback.bind(scope), queryContext);
        } catch(err) {
          this.handleUploadDocError(err);
        }
      }
    },

    /**     
   * Component uploadIphoneDocument
     * To open file explorer in iphone.
     */
    uploadIphoneDocument : function() {
      try {
        var scope = this;
        kony.runOnMainThread(mainthread, []);
        function mainthread () {
          if(scope.importNativeClasses === null){
            scope.importNativeClasses = scope.initializeNativeImport();
          }
          scope.importNativeClasses.UIApplicationTransfer.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(scope.importNativeClasses.pvTransfer, true, {});
        } 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in uploadIphoneDocument method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    handleUploadDocError : function(err) {
      kony.print(err);
    },

    /**     
   * Component fileSelectionCallback
     * @param {string} rawbytes - rawbytes of image,permissionStatus - permission to access file, mimeType - file extension. 
     */
    fileSelectionCallback : function (rawBytes, permissionStatus, mimeType) {
      try {
        var scope = this;
        scope.hideFileSelectionOption();
        if (kony.os.deviceInfo().name === "iPhone") {
          mimeType = "image/jpeg";
        }
        var fileMimeType = mimeType.substring(mimeType.lastIndexOf("/") + 1);
        var fileName = scope.fileNamePrefix+(scope.fileNames.length+1) +"."+ fileMimeType;
        var maxFileSize = 2; 
        var typeError = kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentTypeErrorMsg2"); 
        var sizeError = kony.i18n.getLocalizedString("i18n.unified.attachmentSizeErrorMessage");
        var format = scope.expectedFileFormat;
        format = !scope.isEmptyNullUndefined(format[fileMimeType]) ? format[fileMimeType].type : "";
        if(mimeType !== format)
        {
          scope.view.lblSupportingErrorMessage.text = typeError;
          scope.view.flxSupportingDocSizePopup.setVisibility(true);
          scope.view.flxVerifyDetailMainContainer.setEnabled(false);
        } else {
          if (rawBytes !== null) {
            var base64 = kony.convertToBase64(rawBytes);
            if ( base64 !== null && base64 !== undefined && base64 !== "") {
              var fileSize = ((base64.length*0.75 )/1024);
              if(fileSize > (parseInt(maxFileSize)*1000)) {
                scope.view.lblSupportingErrorMessage.text = sizeError;
                scope.view.flxSupportingDocSizePopup.setVisibility(true);
                scope.view.flxVerifyDetailMainContainer.setEnabled(false);
              } else {
                scope.fileNames.push(fileName);
                scope.fileContents.push(base64);
                scope.fileTypes.push(fileMimeType);
                scope.setAttachmentsDataToSegment();
              }
            } 
          }
        } 
      } catch(err) {
        this.handleUploadDocError(err);
      }
    },

    /**     
   * Component setAttachmentsDataToSegment
     * Adding documents to segment. 
     */
    setAttachmentsDataToSegment : function() {
      try {
        var scope = this;
        scope.view.flxSupportDocumentExpand.setVisibility(true);
        var maxAttachmentsAllowed = 5;
        var attachmentsData = [], filedoc = {};
        scope.docs = "";
        for (var i = 0; i < scope.fileNames.length; i++) {
          attachmentsData[i] = {};
          attachmentsData[i].filename = scope.fileNames[i];
          if(scope.existingAttachments[i] && scope.existingAttachments[i].fileID && (scope.existingAttachments[i].fileName == scope.fileNames[i]))
          {
            attachmentsData[i].fileID = scope.existingAttachments[i].fileID;
          }
          var format = scope.expectedFileFormat;
          format = format[scope.fileTypes[i]].imgSrc;
          attachmentsData[i]["imgAttachment"] = {
            "src": format
          };
          attachmentsData[i]["imgRemoveAttachment"] = {
            "src": "clear_1x.png"
          };
        }
        scope.view.segAttachmentList.widgetDataMap = {
          "lblAttachment": "filename",
          "imgAttachment": "imgAttachment",
          "imgRemove" : "imgRemoveAttachment"
        };
        scope.view.segAttachmentList.setData(attachmentsData);
        for (var i = 0; i < scope.fileNames.length; i++) {
          if(i > 0) {
            scope.docs = scope.docs + ",";
          }
          var fileFormat = scope.expectedFileFormat;
          scope.docs = scope.docs + scope.fileNames[i] + "-" +fileFormat[scope.fileTypes[i]].type + "-" +scope.fileContents[i];
          filedoc[scope.fileNames[i]] = {
            "name" : scope.fileNames[i],
            "filetype" : fileFormat[scope.fileTypes[i]].imgSrc,
            "content" : scope.fileContents[i]
          };
        }

        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        transactionObject["supportingDocuments"] = scope.docs;
        transactionObject["originalDocuments"] = filedoc;
        this.invokeRender = false;
        this.businessController.setDataInCollection("TransactionObject", transactionObject);
        if (scope.fileNames.length >= maxAttachmentsAllowed) {
          scope.view.imgAddIcon.setVisibility(false);
        } else {
          scope.view.imgAddIcon.setVisibility(true);
        }
        scope.hideFileSelectionOption();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setAttachmentsDataToSegment method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component initializeNativeImport
     * To initialize and import native packages.
     * @return {Object} - returns the imported native classes.
     */
    initializeNativeImport : function() {
      try {
        var scope = this;
        var nativeClasses = {};
        var extension = scope.iPhoneFileExtension;
        var mimeType = extension.split(",");
        nativeClasses.UIDocumentPickerViewControllerTransfer = objc.import("UIDocumentPickerViewController");
        nativeClasses.UIViewControllerTransfer = objc.import("UIViewController");
        nativeClasses.UIApplicationTransfer = objc.import("UIApplication");
        nativeClasses.NSDataTransfer  = objc.import("NSData"); 
        nativeClasses.ViewControllerTransfer = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIDocumentPickerDelegate'], {
          documentPickerDidPickDocumentsAtURLs: function(controller, urls) {
            kony.print("Callback called");
            if (urls.length > 0) {
              var nsurl = urls[0];
              var fileName = nsurl.lastPathComponent;
              var fileType = nsurl.pathExtension;
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
        nativeClasses.pvTransfer = nativeClasses.UIDocumentPickerViewControllerTransfer.alloc().initWithDocumentTypesInMode(mimeType, UIDocumentPickerModeImport);
        nativeClasses.pvTransfer.delegate = this.vctrl;
        kony.print("end");
        return nativeClasses;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in initializeNativeImport method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     ** Component removeConfirmationPopup
     ** Removing the confirmation popup.
     */
    removeConfirmationPopup : function() {
      try {
        var scope = this;
        scope.view.flxSupportingDocRemove.setVisibility(false);
        scope.view.flxVerifyDetailMainContainer.setEnabled(true);
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in removeConfirmationPopup method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     ** Component deleteAttachment
     ** Logic to delete the attachment from array.
     */
    deleteAttachment : function(rowIndex) {
      try {
        var scope = this;  
        var sectionIndex = rowIndex.section;
        var rowIndex = rowIndex.row;
        var deletedAttachment = scope.view.segAttachmentList.data[rowIndex];
        scope.view.segAttachmentList.removeAt(rowIndex, sectionIndex);
        scope.removeAttachments(deletedAttachment);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in deleteAttachment method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     ** Component removeAttachments
     ** Logic to remove attachments from segment.
     */
    removeAttachments: function(file){ 
      try {
        var scope = this;
        for (var i = 0; i < scope.fileNames.length; i++) {
          if (scope.fileNames[i] === file.filename) {
            scope.fileNames.splice(i, 1);
            if(file.fileID){
              scope.existingAttachments.splice(i, 1);
              scope.deletedDocuments.push(file.fileID);
            }
            else{
              scope.fileContents.splice(i, 1);
              scope.fileTypes.splice(i, 1);
            }
            break;
          } 
        }

        scope.setAttachmentsDataToSegment();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in removeAttachments method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     ** Component openCamera
     ** Capture the picture and adding the image into segment.
     */
    openCamera : function () {
      try {
        var scope = this;
        scope.hideFileSelectionOption();
        var rawBytes = scope.view.camTakePhoto.rawBytes;
        var maxFileSize =2;
        var fileType = "jpeg";
        if (rawBytes) {
          var imgObject=kony.image.createImage(rawBytes);
          var base64 = "";
          var fileName = scope.fileNamePrefix+(scope.fileNames.length+1)+".jpeg";
          var fileSize = "";
          base64 = kony.convertToBase64(rawBytes);
          fileSize=((base64.length*0.75 )/1024);
          if(fileSize > maxFileSize*1000){
            var scaleLabel= (maxFileSize*1000)/(fileSize+1);
            imgObject.scale(scaleLabel);
            var tempRawBytes= imgObject.getImageAsRawBytes();
            base64 = kony.convertToBase64(tempRawBytes);
          }
          scope.fileContents.push(base64);
          scope.fileNames.push(fileName);
          scope.fileTypes.push(fileType);
          scope.setAttachmentsDataToSegment();
        }
        scope.onRequestEnd();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in openCamera method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },


    setFromandToAccounts : function(){
      var scope = this;
      var dataMapping=this.controllerScope._dataMapping;
      for(var j=1;j<=10;j++)
        scope.view["flxReadOnlyField"+j].setVisibility(false);
      var fromAccLabel =this.businessController.getParsedDataBasedOnDataMapping("lblFrom", dataMapping["flxVerifyDetails"]);
      var fromAccValue = this.businessController.getParsedDataBasedOnDataMapping("flxAccType", dataMapping["flxVerifyDetails"]);
      var fromAccBalLbl = this.businessController.getParsedDataBasedOnDataMapping("lblBalanceValue", dataMapping["flxVerifyDetails"]);
      var fromAccBalVal = this.businessController.getParsedDataBasedOnDataMapping("lblBalanceLabel", dataMapping["flxVerifyDetails"]);
      if(!(scope.isEmptyNullUndefined(fromAccLabel) || scope.isEmptyNullUndefined(fromAccValue)))
      {
        scope.view.lblFrom.text = fromAccLabel;
        scope.view.lblFrom.skin = "sknMMLeftLabels";
        scope.view.flxAccType.text = fromAccValue;
        scope.view.flxAccType.skin = "sknMMBlueLabel";
        if(!(scope.isEmptyNullUndefined(fromAccBalLbl) || scope.isEmptyNullUndefined(fromAccBalVal)))
        {
          scope.view.lblBalanceLabel.text = fromAccBalVal;
          scope.view.lblBalanceLabel.skin = "sknlbl727272SSP93pr";
          scope.view.lblBalanceValue.text = fromAccBalLbl;
          scope.view.lblBalanceValue.skin = "sknlbl727272SSP93pr";
        }
        if (scope.isEditFlow) {
          scope.view.flxToAcc.setEnabled(false);
        } else{
          scope.view.flxToAcc.setEnabled(true);
          scope.view.flxToAcc.onClick = function(){
            scope.context["selectedFlowType"] = "EDIT";
            scope.fromAccountEdit="true";
            scope.navigateTo("flxFromAccount","flxFromTop", "Transfer From");
            if(scope.isRepeatFlow) {
              scope.getFromAccounts();
            }
            if(scope.isEditFlow) {
              scope.getFromAccounts();
            }
          };
        }
      }
      var toAccLabel = this.businessController.getParsedDataBasedOnDataMapping("lblTo", dataMapping["flxVerifyDetails"]);
      var toAccValue = this.businessController.getParsedDataBasedOnDataMapping("lblToAccType", dataMapping["flxVerifyDetails"]);
      var toAccBalLbl = this.businessController.getParsedDataBasedOnDataMapping("lblAvailableBalanceToLabel", dataMapping["flxVerifyDetails"]);
      var toAccBalVal =this.businessController.getParsedDataBasedOnDataMapping("lblAvailableBalanceToValue", dataMapping["flxVerifyDetails"]);

      if(!(scope.isEmptyNullUndefined(toAccLabel) || scope.isEmptyNullUndefined(toAccValue)))
      {
        //osama
        scope.view.lblAvailableBalanceToLabel.text = "";
        scope.view.lblAvailableBalanceToValue.text = "";
        scope.view.lblTo.text = toAccLabel;
        scope.view.lblTo.skin = "sknMMLeftLabels";
        scope.view.lblToAccType.text = toAccValue;
        scope.view.lblToAccType.skin = "sknMMBlueLabel";
        if(!scope.isEmptyNullUndefined(toAccBalLbl) || !scope.isEmptyNullUndefined(toAccBalVal))
        {
          scope.view.lblAvailableBalanceToLabel.text = toAccBalLbl;
          scope.view.lblAvailableBalanceToLabel.skin = "sknlbl727272SSP93pr";
          scope.view.lblAvailableBalanceToValue.text = toAccBalVal;
          scope.view.lblAvailableBalanceToValue.skin = "sknlbl727272SSP93pr";
        }
        if (scope.isEditFlow) {
          scope.view.flxTo.setEnabled(false);
        } else{
          scope.view.flxTo.setEnabled(true);
          scope.view.flxTo.onClick = function(){
            if(scope.isToAccountEditable) {
              scope.context["selectedFlowType"] = "EDIT";
              scope.isToAccountEdit="true";
              scope.getToAccounts();
              scope.navigateTo("flxToAccount","flxToTop","Transfer To");
            }
          };
        }
      }
    },
    onVerifyDetailsBack : function() {
      try {
        var scope = this;
        var stackLength = scope.stack.length;
        for (var i = stackLength-1; i >= 0; i--){
          if(scope.stack[0] === "flxVerifyDetails") {
            scope.onBack();
            break;
          }
          if((scope.stack[i] === "flxVerifyDetails" && scope.stack[i-1] === "flxAmount") || (scope.stack[i] === "flxVerifyDetails" && scope.stack[i-1] === "flxOtherAmount")) {
            scope.goBack();
            break;
          } else {
            scope.stack.pop();
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchResult method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**  
   * Component keyboardDataSettingAccountNumber
     * To bind the functions for each keybroad butttons
     */
    keyboardDataSettingAccountNumber : function(){
      try{
        this.view.flxRowOne.btnNumber1.onClick = this.setKeypadCharAccountNumber.bind(this, 1);
        this.view.flxRowOne.btnNumber2.onClick = this.setKeypadCharAccountNumber.bind(this, 2);
        this.view.flxRowOne.btnNumber3.onClick = this.setKeypadCharAccountNumber.bind(this, 3);
        this.view.flxRowTwo.btnNumber4.onClick = this.setKeypadCharAccountNumber.bind(this, 4);
        this.view.flxRowTwo.btnNumber5.onClick = this.setKeypadCharAccountNumber.bind(this, 5);
        this.view.flxRowTwo.btnNumber6.onClick = this.setKeypadCharAccountNumber.bind(this, 6);
        this.view.flxRowThree.btnNumber7.onClick = this.setKeypadCharAccountNumber.bind(this, 7);
        this.view.flxRowThree.btnNumber8.onClick = this.setKeypadCharAccountNumber.bind(this, 8);
        this.view.flxRowThree.btnNumber9.onClick = this.setKeypadCharAccountNumber.bind(this, 9);
        this.view.flxRowFour.btnNumber0.onClick = this.setKeypadCharAccountNumber.bind(this, 0);
        this.view.flxRowFour.imgKeypadClear.onTouchEnd = this.clearKeypadCharAccountNumber.bind(this);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in keyboardDataSettingAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component keyboardDataSettingReEnterAccountNumber
     * To bind the functions for each keybroad butttons
     */
    keyboardDataSettingReEnterAccountNumber : function(){
      try{
        this.view.flxRow1.btnNumberOne.onClick = this.setKeypadCharAccountNumber.bind(this, 1);
        this.view.flxRow1.btnNumberTwo.onClick = this.setKeypadCharAccountNumber.bind(this, 2);
        this.view.flxRow1.btnNumberThree.onClick = this.setKeypadCharAccountNumber.bind(this, 3);
        this.view.flxRow2.btnNumberFour.onClick = this.setKeypadCharAccountNumber.bind(this, 4);
        this.view.flxRow2.btnNumberFive.onClick = this.setKeypadCharAccountNumber.bind(this, 5);
        this.view.flxRow2.btnNumberSix.onClick = this.setKeypadCharAccountNumber.bind(this, 6);
        this.view.flxRow3.btnNumberSeven.onClick = this.setKeypadCharAccountNumber.bind(this, 7);
        this.view.flxRow3.btnNumberEight.onClick = this.setKeypadCharAccountNumber.bind(this, 8);
        this.view.flxRow3.btnNumberNine.onClick = this.setKeypadCharAccountNumber.bind(this, 9);
        this.view.flxRow4.btnNumberZero.onClick = this.setKeypadCharAccountNumber.bind(this, 0);
        this.view.flxRow4.imgKeypadClearButton.onTouchEnd = this.clearKeypadCharAccountNumber.bind(this);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in keyboardDataSettingReEnterAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    getDefaultValuesForReEnterAccountNumber : function(){
      var defaultValues={
        "mask": false,
        "length": {
          "min": 5,
          "max": 20
        },
        "IBANLength": {
          "min": 5,
          "max": 34
        },
        "restrictChars": "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\ ",
        "placeHolder": "${i18n{kony.mb.addBen.ReenterBenAccNumorIBAN}}",
      }
      return defaultValues;
    },

    getDefaultValuesForEnterAccountNumber : function(){
      var defaultValues={
        "mask": true,
        "length": {
          "min": 5,
          "max": 20
        },
        "IBANLength": {
          "min": 5,
          "max": 34
        },
        "restrictChars": "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\ ",
        "placeHolder": "${i18n{kony.mb.addBen.enterBenAccNumorIBAN}}"
      }
      return defaultValues;
    },
    /**     
   * Component setPayeeReEnterAccountNumber
     * Re-entering account number for verification
     * Enabling default parameters
    **/
    setPayeeReEnterAccountNumber : function(){
      try {
        var scope = this;
        scope.setScreenDataReEnterAccountNumber();
        scope.keypadStringAccountNumber = '';
        scope.flxNameAccountNoScreen = "flxReInputAccNo";                                                                                                           
        scope.isAccountNumberMasked = this.getDefaultValuesForReEnterAccountNumber()["mask"];
        scope.view.btnReEnterAccNumberContinue.onClick = scope.btnReEnterAccountNumberContinueOnClick.bind(this);
        scope.view.flxReEnterAccountNumberBack.onTouchEnd = scope.btnReEnterAccNumberBackOnClick.bind(this);
        scope.view.txtReAccountNumberorIBAN.onTextChange = scope.onAccountNumberorIBANTextChange.bind(this);
        scope.view.btnReEnterAccountNumberCancel.onClick = scope.onBack.bind(this); // create event To do
        scope.incompleteCodeView();
        var transferType = this.context["selectedFlowType"];
        if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer") {
          scope.view.flxReEnterAccountNumberWrapper.setVisibility(false);
          scope.view.flxReEnterAccountNumberInputLine.setVisibility(false);
          scope.view.flxReEnterAccountNumberKeypad.setVisibility(false);
          scope.view.flxReAccountNumberorIBANWrapper.setVisibility(true);
          scope.view.txtReAccountNumberorIBAN.setFocus(true);
          if(transferType === "EDIT") {
            this.collectionObj = MakeATransferStore.getState();
            var object = this.collectionObj["Collection"]["TransactionObject"];
            scope.view.txtReAccountNumberorIBAN.text = object["toAccountNumber"];
            scope.onAccountNumberorIBANTextChange();
          } else {
            scope.view.txtReAccountNumberorIBAN.text = "";
          }
        } else if(this.context["transferType"] === "Within Same Bank") {
          if(transferType === "EDIT") {   
            this.collectionObj = MakeATransferStore.getState();
            var object = this.collectionObj["Collection"]["TransactionObject"];
            var accountNumberEdit = object["toAccountNumber"];
            for(var i=1; i<=16;i++){
              if(accountNumberEdit && i <= (accountNumberEdit.length)){
                for(var j=1; j<= accountNumberEdit.length; j++){
                  scope.view['lblDigit0'+j].text = accountNumberEdit[j-1];
                  scope.keypadStringAccountNumber = accountNumberEdit;
                }
              }else{
                scope.view['lblDigit0'+i].text = "";
              }
            }
            scope.enterCodePostAction();
          }else{
            for(var i=1; i<=16;i++){
              scope.view['lblDigit0'+i].text = "";
            }
          }
          scope.view.flxReEnterAccountNumberWrapper.setVisibility(true);
          scope.view.flxReEnterAccountNumberInputLine.setVisibility(false);
          scope.view.flxReEnterAccountNumberKeypad.setVisibility(false);
          scope.view.flxReAccountNumberorIBANWrapper.setVisibility(false);
        }   
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeReEnterAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setKeypadCharAccountNumber
     * Input parameter of char is passed from keyboard
     * Function to add input from keyboard to string
    **/
    setKeypadCharAccountNumber : function(char) {
      try{
        this.keypadStringAccountNumber = this.keypadStringAccountNumber + char;
        if (this.keypadStringAccountNumber.length > 0 && this.keypadStringAccountNumber.length < 17) {
          this.enterCodePostAction();
        } else if (this.keypadStringAccountNumber.length < 1) {
          this.incompleteCodeView();
        } else if (this.keypadStringAccountNumber.length > 16) {
          this.keypadStringAccountNumber = this.keypadStringAccountNumber.slice(0, 16);
          return;
        }
        this.updateInputBulletsAccountNumber(this.isAccountNumberMasked, this.flxNameAccountNoScreen);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setKeypadCharAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component clearKeypadCharAccountNumber
     * To clear char from keyboard
    **/
    clearKeypadCharAccountNumber : function() {
      try{
        if (this.keypadStringAccountNumber.length === 1) {
          this.keypadStringAccountNumber = '';
          this.updateInputBulletsAccountNumber(this.isAccountNumberMasked, this.flxNameAccountNoScreen);
        }
        if (this.keypadStringAccountNumber.length !== 0) {
          this.keypadStringAccountNumber = this.keypadStringAccountNumber.substr(0, this.keypadStringAccountNumber.length - 1);
          if (this.keypadStringAccountNumber.length < 1) {
            this.incompleteCodeView();
          }
          this.updateInputBulletsAccountNumber(this.isAccountNumberMasked, this.flxNameAccountNoScreen);
        }
        if (this.keypadStringAccountNumber.length < 1) {
          this.incompleteCodeView();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in clearKeypadCharAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component updateInputBulletsAccountNumber
     * Update field with underscore
    **/
    updateInputBulletsAccountNumber : function(isAccountNumberMasked, inputFlx) {
      try{
        var widgets = this.view[inputFlx].widgets();
        if(inputFlx === "flxInputAccNo"){
          isAccountNumberMasked = this.getDefaultValuesForEnterAccountNumber()["mask"];
        }
        for (var i = 0; i < this.keypadStringAccountNumber.length; i++) {
          //widgets[i].skin = "sknLbl484848sspReg50px";
          if(isAccountNumberMasked === true){
            //widgets[i].skin = "ICSknLbl94949487px";
            widgets[i].text = ".";
            widgets[i].skin = "ICSknLbl94949487px";
          }else{
            widgets[i].skin = "ICSknLbl42424255pxmb";
            widgets[i].text = this.keypadStringAccountNumber[i];
          }        
        }
        for (var i = this.keypadStringAccountNumber.length; i < widgets.length; i++) {
          //widgets[i].skin = "sknLble3e3e3SSP60px";
          widgets[i].text = '';
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in updateInputBulletsAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component enterCodePostAction
     * To enable button 
    **/
    enterCodePostAction : function() {
      try{
        if(this.flxNameAccountNoScreen === "flxInputAccNo"){
          var length = this.getDefaultValuesForEnterAccountNumber()["length"];
          var minlength = length["min"], maxlength = length["max"], title = this.keypadStringAccountNumber;
          if(title.length >= minlength && title.length <= maxlength) {
            this.enableButton("btnAccNumberContinue");                              
          }
          else{
            this.incompleteCodeView();
          }
        }
        if(this.flxNameAccountNoScreen === "flxReInputAccNo"){
          var length = this.getDefaultValuesForReEnterAccountNumber()["length"];
          var minlength = length["min"], maxlength = length["max"], title = this.keypadStringAccountNumber;
          if(title.length >= minlength && title.length <= maxlength) {
            this.enableButton("btnReEnterAccNumberContinue");                                
          }
          else{
            this.incompleteCodeView();
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in enterCodePostAction method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component incompleteCodeView
     * To disable button 
    **/
    incompleteCodeView : function() {
      try{
        if(this.flxNameAccountNoScreen === "flxInputAccNo"){
          this.enableButton("btnAccNumberContinue");                            
        }
        if(this.flxNameAccountNoScreen === "flxReInputAccNo"){
          this.enableButton("btnReEnterAccNumberContinue");                                
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in incompleteCodeView method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**   
   * Component btnInitialAccountNumberContinueOnClick
     * To navigate next page 
     * Validation for input account number
    **/
    btnInitialAccountNumberContinueOnClick : function() {
      var scope = this;
      try{ 
        this.collectionObj = MakeATransferStore.getState();
        var object = this.collectionObj["Collection"]["TransactionObject"];
        scope.view.lblAccNoErrorMsg.setVisibility(false);
        if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer"){
          if(this.businessController.isValidIBANNumber(scope.view.txtAccountNumberorIBAN.text) && isNaN(scope.view.txtAccountNumberorIBAN.text)) {
            var iBAN = scope.view.txtAccountNumberorIBAN.text;
            var iBANCode = iBAN.slice(0,2);
            if(/^[a-z]{2}/i.test(iBANCode)) {
              object["accountNumber"] = scope.view.txtAccountNumberorIBAN.text;
              object["toAccountNumber"] = scope.view.txtAccountNumberorIBAN.text;
              object["transactionType"] = "ExternalTransfer";
              this.invokeRender = false;
              scope.view.txtAccountNumberorIBAN.skin = this.skins.textBoxNormalSkin;
              scope.view.lblAccNoErrorMsg.setVisibility(false);
              this.businessController.setDataInCollection("TransactionObject",object);
              scope.navigateTo("flxReEnterAccountNumber", "flxReEnterAccountNumberTop", this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumber",this.controllerScope._dataMapping["AccountNumber"]));
              scope.keyboardDataSettingReEnterAccountNumber();
              scope.setPayeeReEnterAccountNumber();
            } else {
              scope.incompleteCodeView();                                  
              scope.view.lblAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("invalidAccNumberOrIBAN",this.controllerScope._dataMapping["AccountNumber"]);
              scope.view.txtAccountNumberorIBAN.skin = this.skins.textBoxErrorSkin;
              scope.view.txtAccountNumberorIBAN.focusSkin = this.skins.textBoxErrorSkin;
              scope.view.txtAccountNumberorIBAN.text = "";
              scope.view.lblAccNoErrorMsg.setVisibility(true);
            }
          } else if(this.businessController.isValidAccountNumber(scope.view.txtAccountNumberorIBAN.text)){
            object["accountNumber"] = scope.view.txtAccountNumberorIBAN.text;
            object["toAccountNumber"] = scope.view.txtAccountNumberorIBAN.text;
            object["transactionType"] = "ExternalTransfer";
            this.invokeRender = false;
            scope.view.txtAccountNumberorIBAN.skin = this.skins.textBoxNormalSkin;
            scope.view.lblAccNoErrorMsg.setVisibility(false);
            this.businessController.setDataInCollection("TransactionObject",object);
            scope.navigateTo("flxReEnterAccountNumber", "flxReEnterAccountNumberTop", this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumber",this.controllerScope._dataMapping["AccountNumber"]));
            scope.keyboardDataSettingReEnterAccountNumber();
            scope.setPayeeReEnterAccountNumber();
          } else {
            scope.incompleteCodeView();                                  
            scope.view.lblAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("invalidAccNumberOrIBAN",this.controllerScope._dataMapping["AccountNumber"]);
            scope.view.txtAccountNumberorIBAN.skin = this.skins.textBoxErrorSkin;
            scope.view.txtAccountNumberorIBAN.focusSkin = this.skins.textBoxErrorSkin;
            scope.view.txtAccountNumberorIBAN.text = "";
            scope.view.lblAccNoErrorMsg.setVisibility(true);
          } 
        } else {
            //osama
            this.keypadStringAccountNumber = this.view.txtAccountNo.text;
          if(this.businessController.isValidAccountNumber(scope.keypadStringAccountNumber)){
            this.invokeRender = false;
            object["accountNumber"] = scope.keypadStringAccountNumber;
            object["toAccountNumber"] = scope.keypadStringAccountNumber;
            object["transactionType"] = "InternalTransfer";
            scope.initialAccountNumber = scope.keypadStringAccountNumber;
            this.businessController.setDataInCollection("TransactionObject",object);
            scope.view.lblAccNoErrorMsg.setVisibility(false);
            scope.navigateTo("flxReEnterAccountNumber", "flxReEnterAccountNumberTop", this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumber",this.controllerScope._dataMapping["AccountNumber"]));
            scope.setPayeeReEnterAccountNumber();
            scope.keyboardDataSettingReEnterAccountNumber();                              
          } else {
            scope.keypadStringAccountNumber = '';
            scope.updateInputBulletsAccountNumber(this.isAccountNumberMasked, this.flxNameAccountNoScreen);
            scope.incompleteCodeView();                                  
            scope.view.lblAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("invalidAccNumber",this.controllerScope._dataMapping["AccountNumber"]);
            scope.view.lblAccNoErrorMsg.setVisibility(true);
          } 
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnInitialAccountNumberContinueOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component getLastNDigits
     * To get last n number of digits
    **/
    getLastNDigits : function(string, n){
      return string.substring(string.length - n)
    },

    /**     
   * Component isValidAccountNumberOrNot
     * Verifying both inputs are same
    **/
    isValidAccountNumberOrNot : function() {
      try {
        var scope = this;
        if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer") {
          if(scope.view.txtAccountNumberorIBAN.text === scope.view.txtReAccountNumberorIBAN.text) {
            scope.view.txtReAccountNumberorIBAN.skin = this.skins.textBoxNormalSkin;
            var object = this.collectionObj["Collection"]["TransactionObject"];
            var accountName = this.businessController.helperFormat("ACCOUNT_NAME", object["beneficiaryName"], scope.view.txtReAccountNumberorIBAN.text);
            this.collectionObj = MakeATransferStore.getState();
            var object = this.collectionObj["Collection"]["TransactionObject"];
			var formattedDataObj = this.collectionObj["Collection"]["FormattedData"];
            this.invokeRender = false;
            object["toAccountName"] = accountName;
			formattedDataObj["formattedtoAccountName"] = accountName;
            object["IBAN"] = scope.view.txtReAccountNumberorIBAN.text;
            object["toAccountNumber"] = scope.view.txtReAccountNumberorIBAN.text;
            object["payeeAccountNumberOrIBAN"] = scope.view.txtReAccountNumberorIBAN.text;
            object["accountNumber"] = scope.view.txtReAccountNumberorIBAN.text;
            this.businessController.setDataInCollection("TransactionObject",object);
			this.businessController.setDataInCollection("FormattedData",formattedDataObj);
            return true; 
          } else {
            return false;
          }
        } else {
          if(scope.initialAccountNumber === scope.keypadStringAccountNumber) {
            var object = this.collectionObj["Collection"]["TransactionObject"];
            var accountName = this.businessController.helperFormat("ACCOUNT_NAME", object["beneficiaryName"], scope.keypadStringAccountNumber);
            var object = this.collectionObj["Collection"]["TransactionObject"];
			var formattedDataObj = this.collectionObj["Collection"]["FormattedData"];
            this.invokeRender = false;
            object["toAccountName"] = accountName;
			formattedDataObj["formattedtoAccountName"] = accountName;
            object["toAccountNumber"] = scope.initialAccountNumber;
            object["accountNumber"] = scope.initialAccountNumber;
            this.businessController.setDataInCollection("TransactionObject",object);
			this.businessController.setDataInCollection("FormattedData",formattedDataObj);
            return true;
          } else {
            scope.keypadStringAccountNumber = '';
            scope.updateInputBulletsAccountNumber(scope.isAccountNumberMasked,"flxReInputAccNo");
            return false;
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in isValidAccountNumberOrNot method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component onAccountNumberContinueNavigation
     * Navigate to next screen based on flow type.
    **/
    onAccountNumberContinueNavigation : function() {
      try {
        var scope = this;
        var transferType = this.context["selectedFlowType"];
        if(transferType === "EDIT") {
          scope.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
        }
        else if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer") {                               
          scope.setRequiredCode(); 
          scope.navigateTo("flxRequiredCode","flxRequiredCodeTop", "Required Code");
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAccountNumberContinueNavigation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**     
   * Component setPayeeAccountNumber
     * To add beneficiary accountNumber 
     * Enabling default parameters
    **/  
    setPayeeAccountNumber : function(){     
      try {
        var scope = this;       
        scope.setScreenDataEnterAccountNumber();
        scope.keypadStringAccountNumber = '';
        scope.initialAccountNumber = '';
        scope.flxNameAccountNoScreen = "flxInputAccNo";                                                                                          
        scope.isAccountNumberMasked = this.getDefaultValuesForEnterAccountNumber()["mask"];
        scope.view.btnAccNumberContinue.onClick = scope.btnInitialAccountNumberContinueOnClick.bind(this);
        scope.view.flxAccountNumberBack.onTouchEnd = scope.goBack.bind(this);
        scope.view.txtAccountNumberorIBAN.onTextChange = scope.onAccountNumberorIBANTextChange.bind(this);
        scope.view.btnAccountNumberCancel.onClick = scope.onBack.bind(this);
        scope.incompleteCodeView();
        var transferType = this.context["transferType"];
        if(transferType == "Domestic Transfer" || transferType == "International Transfer") {
          scope.view.flxAccountNumberWrapper.setVisibility(false);
          scope.view.flxAccountNumberInputLine.setVisibility(false);
          scope.view.flxAccountNumberKeyboard.setVisibility(false);
          scope.view.flxAccountNumberorIBANWrapper.setVisibility(true);
          scope.view.txtAccountNumberorIBAN.setFocus(true);
          // To Do
          if(this.context["selectedFlowType"] === "EDIT") {
            this.collectionObj = MakeATransferStore.getStore();
            scope.view.txtAccountNumberorIBAN.text = this.collectionObj["Collection"]["TransactionObject"]["accountNumber"];
            scope.onAccountNumberorIBANTextChange();
          } else {
            scope.view.txtAccountNumberorIBAN.text = "";
          }
        } else if(transferType === "Within Same Bank") {  // To Do
            scope.view.txtAccountNo.setFocus(true);
            //scope.view.txtAccountNo.skin= 'CopydefTextBoxFocus0c5f2706c7b3147';
            //scope.view.txtAccountNo.skin = "ICSknTxtE3E3E31px34px";
            //scope.view.txtAccountNo.focusSkin = "ICSknTxt003E751px";
          if(this.context["selectedFlowType"] === "EDIT") {
            this.collectionObj = MakeATransferStore.getStore();
            var accountNumberEdit = this.collectionObj["Collection"]["TransactionObject"]["accountNumber"];
            for(var i=1; i<= 16; i++){
              if(accountNumberEdit && i <= (accountNumberEdit.length)){
                for(var j=1; j<= accountNumberEdit.length; j++){
                  scope.view['lblDigit'+j].text = accountNumberEdit[j-1];
                  scope.keypadStringAccountNumber = accountNumberEdit;
                }
              }else{
                scope.view['lblDigit'+i].text = "";
              }
            }
            scope.enterCodePostAction();
            scope.updateInputBulletsAccountNumber(scope.isAccountNumberMasked, scope.flxNameAccountNoScreen);
          }else{
            for(var i=1; i<=16;i++){
              scope.view['lblDigit'+i].text = "";
            }
          }
          scope.view.flxAccountNumberWrapper.setVisibility(true);
          scope.view.flxAccountNumberInputLine.setVisibility(false);
          scope.view.flxAccountNumberKeyboard.setVisibility(false);
          scope.view.flxAccountNumberorIBANWrapper.setVisibility(false);
        }    
        scope.view.flxAccountNumber.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component onAccountNumberorIBANTextChange
     * Enabling continue button based on characters.
    **/
    onAccountNumberorIBANTextChange : function() {
      try {
        var scope = this;
        if(scope.flxNameAccountNoScreen === "flxInputAccNo") {
          var length = this.getDefaultValuesForEnterAccountNumber()["IBANLength"];
          var minlength = length["min"], maxlength = length["max"], title = scope.view.txtAccountNumberorIBAN.text;
          if(title.length >= minlength && title.length <= maxlength) {
            scope.enableButton("btnAccNumberContinue");
          }
          else {
            scope.enableButton("btnAccNumberContinue");
          }
          scope.view.lblAccNoErrorMsg.setVisibility(false);
          scope.view.txtAccountNumberorIBAN.skin = this.skins.sknInputBoxBorder;
        }
        if(scope.flxNameAccountNoScreen === "flxReInputAccNo") {
          var length = this.getDefaultValuesForReEnterAccountNumber()["IBANLength"];
          var minlength = length["min"], maxlength = length["max"], title = scope.view.txtReAccountNumberorIBAN.text;
          if(title.length >= minlength && title.length <= maxlength) {
            scope.enableButton("btnReEnterAccNumberContinue");
          }
          else {
            scope.enableButton("btnReEnterAccNumberContinue");
          }
          scope.view.lblReEnterAccNoErrorMsg.setVisibility(false);
          scope.view.txtReAccountNumberorIBAN.skin = this.skins.sknInputBoxBorder;
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAccountNumberorIBANTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setScreenDataReEnterAccountNumber
     * setting primary skins and text
    **/
    setScreenDataReEnterAccountNumber : function(){
      try{
        var scope =this;
        //skins
        scope.view.flxReEnterAccountNumberHeader.skin = this.skins.sknHeaderBg;
        scope.view.imgReEnterAccountNumberBack.src = "backbutton.png";
        scope.view.btnReEnterAccountNumberCancel.skin = this.skins.sknCancelBtn;
        scope.view.lblReEnterAccountNumber.skin = this.skins.sknHeaderLbl;
        scope.view.flxReEnterAccountNumberDescription.skin = this.skins.sknDescriptionBg;
        scope.view.lblReEnterAccountNumberDescription.skin = this.skins.sknDescriptionLbl;
        scope.view.flxReEnterAccountNumberSeparator.skin = this.skins.sknDescriptionSeparator;
        scope.view.lblReEnterAccNoErrorMsg.skin = this.skins.errorValidationSkn;
        scope.view.txtReAccountNo.skin = this.skins.sknInputBoxBorder;
        scope.view.txtReAccountNo.setFocus(true);

        //scope.view.flxReEnterAccountNumberInputLine.skin =  this.skins.accNumInputLineSkin;
        for(var i=1; i<=16; i++){
          scope.view['lblDigit0'+i].skin = this.skins.reEnterAccNumInputFieldSkin;
        }
        scope.view.lblReEnterAccNoErrorMsg.setVisibility(false); 
        scope.view.btnReEnterAccNumberContinue.focusSkin = this.skins.sknEnableContexualBtn;
        //text
        scope.view.lblReEnterAccountNumber.text = this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumber",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.lblReEnterAccountNumberDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblReEnterAccountNumberDescription",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnReEnterAccNumberContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnAccNumberContinue",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnReEnterAccountNumberCancel.text = this.businessController.getParsedDataBasedOnDataMapping("cancelButton",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnReEnterAccountNumberCancel.isVisible = !scope.isEmptyNullUndefined(this.businessController.getParsedDataBasedOnDataMapping("cancelButton",this.controllerScope._dataMapping["AccountNumber"])) ? true : false;
        // Re-enter Account number or IBAN textbox properties.
        scope.view.txtReAccountNumberorIBAN.skin = this.skins.textBoxNormalSkin;
        scope.view.txtReAccountNumberorIBAN.focusSkin = this.skins.sknInputBoxBorder;
        scope.view.txtReAccountNumberorIBAN.restrictCharactersSet = this.getDefaultValuesForReEnterAccountNumber()["restrictChars"];
        scope.view.txtReAccountNumberorIBAN.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder",this.getDefaultValuesForReEnterAccountNumber());
        scope.view.txtReAccountNumberorIBAN.maxTextLength = this.getDefaultValuesForReEnterAccountNumber()["IBANLength"]["max"];
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setScreenDataReEnterAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setScreenDataEnterAccountNumber
     * setting primary skins and text
    **/
    setScreenDataEnterAccountNumber : function(){
      try{

        var scope =this;
        //skins
        scope.view.flxAccountNumberHeader.skin = this.skins.sknHeaderBg;
        scope.view.imgAccountNumberBack.src = "backbutton.png";
        scope.view.btnAccountNumberCancel.skin = this.skins.sknCancelBtn;      
        scope.view.lblAccountNumber.skin = this.skins.sknHeaderLbl;
        scope.view.flxAccountNumberDescription.skin = this.skins.sknDescriptionBg;
        scope.view.lblAccountNumberDescription.skin = this.skins.sknDescriptionLbl;
        scope.view.flxAccountNumberSeparator.skin = this.skins.sknDescriptionSeparator;
        scope.view.lblAccNoErrorMsg.skin = this.skins.errorValidationSkn;
        //scope.view.txtReAccountNo.setFocus(true);
        scope.view.txtAccountNo.skin = 'CopydefTextBoxFocus0c5f2706c7b3147';
        //scope.view.flxAccountNumberInputLine.skin = this.skins.accNumInputLineSkin;
        scope.view.btnAccNumberContinue.focusSkin = this.skins.sknEnableContexualBtn;
        for(var i=1; i<=16; i++){
          scope.view['lblDigit'+i].skin = this.skins.accNumInputFieldSkin;
        }
        //text
        scope.view.lblAccountNumber.text = this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumber",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.lblAccountNumberDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblAccountNumberDescription",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnAccNumberContinue.text = this.businessController.getParsedDataBasedOnDataMapping("btnAccNumberContinue",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnAccountNumberCancel.text = this.businessController.getParsedDataBasedOnDataMapping("cancelButton",this.controllerScope._dataMapping["AccountNumber"]);
        scope.view.btnAccountNumberCancel.isVisible = !scope.isEmptyNullUndefined(this.businessController.getParsedDataBasedOnDataMapping("cancelButton",this.controllerScope._dataMapping["AccountNumber"])) ? true : false;
        //Account Number or IBAN text box properties
        scope.view.txtAccountNumberorIBAN.skin = this.skins.textBoxNormalSkin;
        scope.view.txtAccountNumberorIBAN.focusSkin = this.skins.sknInputBoxBorder;
        scope.view.txtAccountNumberorIBAN.restrictCharactersSet = this.getDefaultValuesForEnterAccountNumber()["restrictChars"];
        scope.view.txtAccountNumberorIBAN.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder",this.getDefaultValuesForEnterAccountNumber());
        scope.view.txtAccountNumberorIBAN.maxTextLength = this.getDefaultValuesForEnterAccountNumber()["IBANLength"]["max"];
        scope.view.txtAccountNumberorIBAN.secureTextEntry = this.getDefaultValuesForEnterAccountNumber()["mask"];
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setScreenDataEnterAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component isExistingAccount
     * Checking whether it is existing account Number.
    **/
    isExistingAccount : function(accountNumber) { // To do
      try {
        var scope = this;
        var collectionObj = MakeATransferStore.getState();
        var existingAccounts = collectionObj["Collection"]["toAccounts"];
        for(var index in existingAccounts) {
          if(!scope.isEmptyNullUndefined(existingAccounts[index].accountNumber)) {
            if(accountNumber.toUpperCase() === existingAccounts[index].accountNumber.toUpperCase()) {
              return accountNumber;
            }
          }
          else if(!scope.isEmptyNullUndefined(existingAccounts[index].accountID)) {
            if(accountNumber.toUpperCase() === existingAccounts[index].accountID.toUpperCase()) {
              return accountNumber;
            }
          }
        }
        return "";
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in isExistingAccount method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
   * Component btnReEnterAccountNumberContinueOnClick
     * To navigate to next page 
     * Validation for input account number
     * Verifying both inputs are same
    **/
    btnReEnterAccountNumberContinueOnClick : function() {
      var scope = this;
      try {
        scope.view.lblReEnterAccNoErrorMsg.setVisibility(false);
        //osama
        this.keypadStringAccountNumber = this.view.txtReAccountNo.text;
        var isValidAccNo = scope.isValidAccountNumberOrNot();
        var transferType = this.context["selectedFlowType"];
        if(isValidAccNo) {
          if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer"){
            if(this.businessController.isValidIBANNumber(scope.view.txtAccountNumberorIBAN.text) || this.businessController.isValidAccountNumber(scope.view.txtAccountNumberorIBAN.text)){
              var existingToAccounts = scope.isExistingAccount(scope.view.txtAccountNumberorIBAN.text); // Start and To do
              if(existingToAccounts.length === 0) {
                this.invokeRender = true;
                scope.isIBANValid = "";
                scope.businessController.invokeValidateIBANService();
              } else {
                scope.view.lblReEnterAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("lblReEnterAccNoErrorMsg",this.controllerScope._dataMapping["AccountNumber"]);
                scope.view.lblReEnterAccNoErrorMsg.setVisibility(true);
                scope.view.txtReAccountNumberorIBAN.skin = this.skins.textBoxErrorSkin;
                scope.view.txtReAccountNumberorIBAN.focusSkin = this.skins.textBoxErrorSkin;
                scope.view.txtReAccountNumberorIBAN.text = "";
                scope.incompleteCodeView();
              }
            } else {
              scope.incompleteCodeView();                                  
              scope.view.lblReEnterAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("invalidAccNumberOrIBAN",this.controllerScope._dataMapping["AccountNumber"]);
              scope.view.txtReAccountNumberorIBAN.skin = this.skins.textBoxErrorSkin;
              scope.view.txtReAccountNumberorIBAN.focusSkin = this.skins.textBoxErrorSkin;
              scope.view.txtReAccountNumberorIBAN.text = "";
              scope.view.lblReEnterAccNoErrorMsg.setVisibility(true);
            }
          } else {
            var results = scope.isExistingAccount(scope.initialAccountNumber);
            if(results.length === 0) {            
              this.invokeRender = true;
              this.businessController.invokeCustomVerbforGetBeneficiaryName();
            } else {
              scope.view.lblReEnterAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("lblReEnterAccNoErrorMsg",this.controllerScope._dataMapping["AccountNumber"]);
              scope.view.lblReEnterAccNoErrorMsg.setVisibility(true);
              scope.keypadStringAccountNumber = '';
              scope.updateInputBulletsAccountNumber(scope.isAccountNumberMasked, "flxReInputAccNo");
              scope.incompleteCodeView();
            }
          }
        }
        else {
          scope.updateInputBulletsAccountNumber(this.isAccountNumberMasked, this.flxNameAccountNoScreen);
          scope.incompleteCodeView();
          scope.view.lblReEnterAccNoErrorMsg.skin = this.skins.errorValidationSkn;
          scope.view.lblReEnterAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("reEnterAccNumErrorMessage",this.controllerScope._dataMapping["AccountNumber"]);
          scope.view.lblReEnterAccNoErrorMsg.setVisibility(true);
          if(this.context["transferType"] === "Domestic Transfer" || this.context["transferType"] === "International Transfer"){
          scope.view.txtReAccountNumberorIBAN.focusSkin = this.skins.textBoxErrorSkin;
          scope.view.txtReAccountNumberorIBAN.text = "";
          } else {
          scope.keypadStringAccountNumber = '';
          scope.updateInputBulletsAccountNumber(scope.isAccountNumberMasked, "flxReInputAccNo");
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnReEnterAccountNumberContinueOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
      //osama
      this.view.txtReAccountNo.text="";
      this.view.txtAccountNo.text="";
    },

    fetchBeneficiaryDetailsSuccess : function() {
      try {
        var scope = this;
        scope.onRequestEnd();
        var transferType = this.context["transferType"];
        var collectionObj = MakeATransferStore.getState();
        if(transferType == "Within Same Bank"){
          var object = collectionObj["Collection"][this.controllerScope._serviceParameters.GetBeneficiaryName.Object];
          if(object.beneficiaryName == "" ) {
            scope.keypadStringAccountNumber = '';
            scope.updateInputBulletsAccountNumber(scope.isAccountNumberMasked, "flxReInputAccNo");
            scope.view.lblReEnterAccNoErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("accNumNoMatch",this.controllerScope._dataMapping["AccountNumber"]);
            scope.view.lblReEnterAccNoErrorMsg.setVisibility(true);
            scope.incompleteCodeView();
          } else {
            this.invokeRender = false;
            var transactionObject = collectionObj["Collection"]["TransactionObject"];
            transactionObject["toAvailableBalance"] = object.beneficiaryName;
            this.businessController.setDataInCollection("TransactionObject",transactionObject);
            if(this.context.selectedFlowType === "EDIT") {
              scope.setVerifyDetails();
              this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", kony.i18n.getLocalizedString("kony.mb.p2p.verifyDetails"));
            }
            else{
              if(this.context["transferType"] === "Within Same Bank"){
                scope.setTransferAmount();
                this.navigateTo("flxAmount","flxAmountTop",this.businessController.getParsedDataBasedOnDataMapping("lblAmountTitle", this.controllerScope._dataMapping["flxAmount"]));
              } 
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAccountNumberSuccess method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component btnReEnterAccNumberBackOnClick
     * Function for back navigation - Re-enter Account Number
    **/
    btnReEnterAccNumberBackOnClick : function(){
      try{
        var scope = this; 
        scope.flxNameAccountNoScreen = "flxInputAccNo";
        scope.keypadStringAccountNumber = scope.initialAccountNumber;
        scope.goBack();                           
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnReEnterAccNumberBackOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /*
     * Component getFormattedData
     * Responsible to format data based on the format contract
     * return String 
     */
    getFormattedData : function(contractJSON,record){
      var self = this;
      try{
        if(!this.isEmptyNullUndefined(contractJSON)){         
          var isMaskingRequired = contractJSON["isMaskingEnabled"];
          if(typeof(contractJSON) === "string"){
            var FieldMapping = JSON.parse(contractJSON);
          }else{
            var FieldMapping = contractJSON;
          }
          if(FieldMapping.fieldType == "AccountName"){
            var fields = FieldMapping.mapping;
            var data = "";
            for(var i=0;i<fields.length;i++){

              if(!this.isEmptyNullUndefined(fields[i])){

                var lblFieldMapping =  this.getInternalExternalFieldValue(fields[i],record);;
                var fieldData = record[lblFieldMapping];
                if(!this.isEmptyNullUndefined(fields[i].format))
                {
                  if(!this.isEmptyNullUndefined(fields[i].format.truncateLength)){
                    data = data + fieldData.substring(0,fields[i].format.truncateLength) + fields[i].format.appendString;
                  }
                  if(!this.isEmptyNullUndefined(fields[i].format.sliceLength)){                  
                    if(isMaskingRequired === true) {
                      data = data + fieldData.slice(fields[i].format.sliceLength);
                    } else {
                      data = data + fieldData;
                    }

                  }
                }else{
                  data = data + fieldData;
                }
              }
            }
            return data;
          }else if(FieldMapping.fieldType == "Amount"){
            var data = "";
            if(!this.isEmptyNullUndefined(FieldMapping.mapping[0])){
              var fieldMapping =  this.getInternalExternalFieldValue(FieldMapping.mapping[0],record);
              var fieldData = record[fieldMapping];
              var currencyMapping =  FieldMapping.currency;
              var currencyCode = record[currencyMapping];
              if(!this.isEmptyNullUndefined(fieldData)){
                data = this.businessController.getFormattedAmount(fieldData,currencyCode);
              }

              else{
                return data;
              }
              return data;
            }
          }
          else {
            var data = "";
            if(!this.isEmptyNullUndefined(FieldMapping.mapping[0])) {
              var fieldMapping =  this.getInternalExternalFieldValue(FieldMapping.mapping[0],record);
              if(!fieldMapping.includes(",")) {
                data = record[fieldMapping];
              } else {
                var fieldMapList = fieldMapping.split(",");
                for(var i=0;i<fieldMapList.length;i++){
                  if(record[fieldMapList[i]])
                    data = record[fieldMapList[i]];
                }
              }
            }
          }
          return data;
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in formatting data b",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
    },

    /*
     * Component getInternalExternalFieldValue
     * Responsible to check the account internal or external
     * return mapping value string 
     */
    getInternalExternalFieldValue : function(contractJSON,record){
      var scope = this;
      this.invokeRender = false;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      if(!this.isEmptyNullUndefined(transactionObject.beneType)){
        if(transactionObject.beneType === "external"){
          if(!this.isEmptyNullUndefined(contractJSON.external)){
            return this.getFieldValue(contractJSON.external.fieldMap);
          }else{
            return this.getFieldValue(contractJSON.fieldMap);
          }     
        }else if (transactionObject.beneType === "internal") {
          if(!this.isEmptyNullUndefined(contractJSON.internal)){
            var internalMapping = contractJSON.internal;
            if(!this.isEmptyNullUndefined(record.accountType)){
              if(record.accountType.toLowerCase().indexOf("creditcard") != -1){
                return internalMapping.creditcard.fieldMap;
              }else if(record.accountType.toLowerCase().indexOf("loan") != -1){
                return internalMapping.Loan.fieldMap;
              }else{
                return internalMapping.other.fieldMap;
              }
            }else{
              return internalMapping.other.fieldMap;
            }
          }
          else{
            return contractJSON.fieldMap;
          }
        }else{
          return contractJSON.fieldMap;
        }
      }else{
        return contractJSON.fieldMap;
      }
    },
    setFieldData : function(){
      var scope = this;
      var flag =0;
      var dataMapping = this.controllerScope.dataMapping;
       var object = MakeATransferStore.getState();
      var TransObject = object["Collection"]["TransactionObject"];
      for (var i = 1; i < 18; i++) {
        scope.view["flxField" + i].setVisibility(false);
        var fieldLabel = this.businessController.getParsedDataBasedOnDataMapping("lblField"+i+"Label", dataMapping["flxVerifyDetails"]);
        var fieldi18nLabel = scope.geti18nKey(dataMapping["flxVerifyDetails"]["lblField"+i+"Label"]);
        var fieldValue = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxVerifyDetails"]["lblField"+i+"Value"]);
        var fieldOptional = this.businessController.getParsedDataBasedOnDataMapping("optional", dataMapping["flxVerifyDetails"]["lblField"+i+"Value"]);
        if ((!(scope.isEmptyNullUndefined(fieldLabel) || scope.isEmptyNullUndefined(fieldValue))) || fieldOptional) {
          if (flag === 0 && fieldi18nLabel !== "kony.i18n.verifyDetails.removeRepeatingTransfer") {
            scope.view["lblField" + i + "Label"].text = fieldLabel;
            scope.view["lblField" + i + "Label"].skin = "sknMMLeftLabels";
            scope.view["lblField" + i + "Value"].text = fieldValue;
            scope.view["lblField" + i + "Value"].skin = "sknMMBlueLabel";
            scope.view["imgArrow" + i].src = "chevron.png";
            scope.view["flxField" + i].setVisibility(true);
          }
          if (flag === 1 && fieldi18nLabel === "kony.i18n.verifyDetails.removeRepeatingTransfer") {
            scope.view["lblField" + i + "Label"].text = "";
            scope.view["lblField" + i + "Value"].text = fieldValue;
            scope.view["lblField" + i + "Value"].skin = "sknMMBlueLabel";
            scope.view["imgArrow" + i].src = "";
            scope.view["lblField" + i + "Value"].right = "20dp";
            scope.view["flxField" + i].setVisibility(true);
            flag = 0;
          }
          if (fieldi18nLabel === "kony.i18n.verifyDetails.e2eReference") {
            if (scope.context["transferType"] === "Domestic Transfer") {
              if (TransObject["selectedPaymentMethod"] !== "Non - Instant" && TransObject["selectedPaymentMethod"] !== "Instant") {
                scope.view["flxField" + i].setVisibility(false);
              }
            }
          }
          if (this.isEditFlow) {
            switch (fieldi18nLabel) {
              case "kony.i18n.verifyDetails.amount":
                scope.view["flxField" + i].onClick = function () {
                  scope.context["selectedFlowType"] = "EDIT";
                  if (!(TransObject["toAccountType"] && (TransObject["toAccountType"] === "CreditCard" || TransObject["toAccountType"] === "Loan"))) {
                    scope.setTransferAmount();
                    scope.navigateTo("flxAmount", "flxAmountTop", "Amount");
                  } else {
                    scope.setTransferOtherAmount();
                    scope.navigateTo("flxOtherAmount", "flxOtherAmountTop", "Other Amount");
                  }
                };
                break;
              case "kony.i18n.verifyDetails.endDate":
                flag = 1;
                scope.view["flxField" + i].onClick = function () {
                  scope.context["selectedFlowType"] = "EDIT";
                  var TransObject = scope.collectionObj.Collection["TransactionObject"];
                  if (TransObject["duration"] === "Until I Cancel") {
                    scope.bindDurationData();
                    scope.navigateTo("flxDurationSelection", "flxDurationTop", "Duration");
                  } else {
                    scope.view.customCalendar.selectedDate = TransObject["endDate"];
                    scope.setDate("flxEndDate");
                    scope.navigateTo("flxDate", "flxSendOnTop", "End Date");
                  }
                };
                break;
                default:
                  scope.view["flxField" + i].setEnabled(false);
                  scope.view["imgArrow" + i].setVisibility(false);
                  scope.view["lblField" + i + "Value"].skin = "sknLbl424242SSP32px";
            }
          } else{
            scope.view["flxField" + i].skin = "slFbox";
            scope.view["flxField" + i].setEnabled(true);
            switch (fieldi18nLabel) {
              case "kony.i18n.verifyDetails.amount":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  if (!(TransObject["toAccountType"] && (TransObject["toAccountType"] === "CreditCard" || TransObject["toAccountType"] === "Loan"))) {
                    scope.setTransferAmount();
                    scope.navigateTo("flxAmount", "flxAmountTop", "Amount");
                  } else {
                    scope.setTransferOtherAmount();
                    scope.navigateTo("flxOtherAmount", "flxOtherAmountTop", "Other Amount");
                  }
                }
                break;
              case "kony.i18n.verifyDetails.transferCurrency":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  if(scope.isRepeatFlow) {
                    scope.view.flxAmountWrapper.lblAmount.text = TransObject["transferAmount"];
                  }
                  scope.setCurrency();
                  if (scope.currencyFlowCheck == false) {
                    scope.navigateTo("flxCurrencySelection", "flxCurrencyTop","Currency");
                  }
                }
                break;
              case "kony.i18n.verifyDetails.phoneNumber":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setContactType();
                  scope.navigateTo("flxContactType", "flxContactTypeTop", "Contact Type");
                }
                break;
              case "kony.i18n.verifyDetails.emailAddress":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setContactType();
                  scope.navigateTo("flxContactType", "flxContactTypeTop", "Contact Type");
                }
                break;
              case "kony.i18n.verifyDetails.sendOn":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"]= "EDIT";
                  var TransObject =scope.collectionObj.Collection["TransactionObject"];
                  scope.view.customCalendar.selectedDate = TransObject["sendOn"];
                  scope.setDate("flxSendOn");
                  scope.navigateTo("flxDate", "flxSendOnTop", "Send On");
                }
                break;
              case "kony.i18n.verifyDetails.currency":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setCurrency();
                  scope.navigateTo("flxCurrencySelection", "flxCurrencyTop", "Currency");
                }
                break;
              case "i18n.UnifiedTransfers.PurposeCodeOptional":
                scope.view["lblField" + i + "Label"].width = "40%";
                scope.view["lblField" + i + "Value"].width = "45%";
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.invokeRender=true;
                  scope.purposeCodesUpdated = true;
                  scope.businessController.invokeCustomVerbforPurposeCodes();
                }
                break;
              case "kony.i18n.verifyDetails.feesPaidBy":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setFeesPaidBy();
                  scope.navigateTo("flxFeesPaidBy", "flxFeesPaidByTop", "Fees Paid By");
                }
                break;
              case "kony.i18n.verifyDetails.paymentMethod":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setPaymentMethod();
                  scope.navigateTo("flxPaymentMethod", "flxPaymentMethodTop", "Payment Method");
                }
                break;
              case "kony.i18n.verifyDetails.startDate":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  var TransObject =scope.collectionObj.Collection["TransactionObject"];
                  scope.view.customCalendar.selectedDate =TransObject["startDate"];
                  scope.setDate("flxStartDate");
                  scope.navigateTo("flxDate", "flxSendOnTop", "Start Date");
                }
                break;
              case "kony.i18n.verifyDetails.endDate":
                flag = 1;
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  var TransObject =scope.collectionObj.Collection["TransactionObject"];
                  if(TransObject["duration"] ==="Until I Cancel"){
                    scope.bindDurationData();
                    scope.navigateTo("flxDurationSelection", "flxDurationTop","Duration");
                  }
                  else{
                    scope.view.customCalendar.selectedDate = TransObject["endDate"];
                    scope.setDate("flxEndDate");
                    scope.navigateTo("flxDate", "flxSendOnTop", "End Date");
                  }
                }
                break;
              case "kony.i18n.verifyDetails.removeRepeatingTransfer":
                scope.view["flxField" + i].onClick = function() {
                  var TransObject =scope.collectionObj.Collection["TransactionObject"];
                  TransObject["frequency"] = "Once";
                  TransObject["startDate"] = "";
                  TransObject["endDate"] = "";
                  TransObject["sendOn"] = "";
                  TransObject["ISOStartDate"] = "";
                  TransObject["ISOEndDate"] = "";
                  TransObject["startDateUI"] = "";
                  TransObject["endDateUI"] = "";
                  scope.invokeRender =false;
                  scope.businessController.setDataInCollection("TransactionObject", TransObject);
                  scope.setVerifyDetails();
                }
                break;
              case "kony.i18n.verifyDetails.frequency":
                if (!(TransObject["toAccountType"] && (TransObject["toAccountType"] === "CreditCard" || TransObject["toAccountType"] === "Loan"))) {
                  scope.view["flxField" + i].onClick = function() {
                    scope.context["selectedFlowType"] = "EDIT";
                    scope.bindFrequencyMasterData();
                    scope.navigateTo("flxFrequencySelection", "flxFrequencyTop", "Frequency");
                  }
                } else {
                  scope.view["flxField" + i].isVisible = false;
                }
                break;
              case "kony.i18n.verifyDetails.bicSwift":
                if (scope.payeeFlow === "New") {
                  scope.view["flxField" + i].onClick = function() {
                    scope.context["selectedFlowType"] = "EDIT";
                    scope.setRequiredCode();
                    scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", "Required Code");
                  }
                  scope.view["imgArrow" + i].setVisibility(true);
                  scope.view["lblField" + i + "Value"].right = "50dp";
                  scope.view["lblField" + i + "Value"].skin = "sknMMBlueLabel";
                } else {
                  scope.view["flxField" + i].onClick = function() {}
                  scope.view["imgArrow" + i].setVisibility(false);
                  scope.view["lblField" + i + "Value"].right = "20dp";
                  scope.view["lblField" + i + "Value"].skin = "ICSknLbl727272SSPReg34px";
                }
                break;
              case "kony.i18n.verifyDetails.intermediatoryBIC":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setIntermediaryBIC();
                  scope.navigateTo("flxIntermediaryBIC", "flxIntermediaryTop", "Intermediary BIC");
                }
                break;
              case "kony.i18n.verifyDetails.e2eReference":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setE2EReference();
                  scope.navigateTo("flxE2E", "flxE2ETop", "E2E Ref");
                }
                break;
              case "i18n.unifiedTransfers.bankClearingCode":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setRequiredCode();
                  scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", "Required Code");
                }
                break;
              case "kony.i18n.verifyDetails.clearingCode2":
                scope.view["flxField" + i].onClick = function() {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setRequiredCode();
                  scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", "Required Code");
                }
                break;
              case "i18n.payments.clearingIdentifierCode":
                    scope.view["lblField" + i + "Label"].width = "40%";
                    scope.view["lblField" + i + "Value"].width = "45%";
                    scope.view["flxField" + i].onClick = function() {
                      scope.context["selectedFlowType"] = "EDIT";
                      scope.invokeRender=true;
                      if( scope.clearingIdentifierCodesUpdated === false)
                      scope.businessController.invokeCustomVerbforClearingIdentifierCodes();
                     else{
                      scope.setClearingIdentifierCodesList();
                      scope.navigateTo("flxClearingIdentifierCode", "flxClearingIdentifierCodeTop", "Clearing Identifier");
                      scope.setClearingIdentifierCodesUI();
                     }
                  }
                break;
              case "kony.i18n.verifyDetails.accountNumber":
                if (scope.payeeFlow === "New") {
                  scope.view["flxField" + i].onClick = function() {
                    scope.context["selectedFlowType"] = "EDIT";
                    scope.setKeypadCharAccountNumber();
                    scope.setPayeeAccountNumber();
                    scope.navigateTo("flxAccountNumber", "flxAccountNumberTop", "Account Number");
                  }
                  scope.view["imgArrow" + i].setVisibility(true);
                  if(kony.i18n.getCurrentLocale() === "ar_AE"){
                    scope.view["lblField" + i + "Value"].left = "50dp";
                  }
                  else{
                    scope.view["lblField" + i + "Value"].right = "50dp";
                  }          
                  scope.view["lblField" + i + "Value"].skin = "sknMMBlueLabel";
                } else {
                  scope.view["flxField" + i].onClick = function() {}
                  scope.view["imgArrow" + i].setVisibility(false);
                  if(kony.i18n.getCurrentLocale() === "ar_AE"){
                    scope.view["lblField" + i + "Value"].left = "20dp";
                  }
                  else{
                    scope.view["lblField" + i + "Value"].right = "20dp";
                  }     
                  scope.view["lblField" + i + "Value"].right = "20dp";
                  scope.view["lblField" + i + "Value"].skin = "ICSknLbl727272SSPReg34px";
                }
                break;
              case "i18n.UnifiedTransfers.StreetName":
                scope.view["flxField" + i].onClick = function () {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setBankStreet();
                  scope.navigateTo("flxPayeeBankStreet", "flxPayeeBankStreetTop", "Street");
                }
                break;
              case "i18n.UnifiedTransfers.TownName":
                scope.view["flxField" + i].onClick = function () {
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.setBankTown();
                  scope.navigateTo("flxPayeeBankTown", "flxPayeeBankTownTop", "Town");
                }
                break;
              case "i18n.UnifiedTransfers.CountryName":
                scope.view["flxField" + i].onClick = function () {
                  scope.view["lblField" + i + "Label"].width = "40%";
                  scope.view["lblField" + i + "Value"].width = "45%";
                  scope.context["selectedFlowType"] = "EDIT";
                  scope.invokeRender=true;
                  scope.businessController.invokeCustomVerbforGetCountryCodesList();
                }
                break;
              case "i18n.transfers.bankName":
                  var TransObject =scope.collectionObj.Collection["TransactionObject"];
                  if(TransObject["ibanBankName"]!="" && TransObject["ibanBankName"]!=null){
                  scope.view["imgArrow" + i].setVisibility(false);
                  scope.view["lblField" + i + "Value"].skin = "ICSknLbl727272SSPReg34px";
                  }
                  else{
                  scope.view["imgArrow" + i].setVisibility(true);
                  scope.view["lblField" + i + "Value"].skin = "sknMMBlueLabel";
                  }
                  scope.view["flxField" + i].onClick = function () {
                    scope.context["selectedFlowType"] = "EDIT";
                    scope.setPayeeBankName();
                    scope.navigateTo("flxPayeeBankName", "flxPayeeBankNameTop", "Bank Name");
                  }
                  break;
            }
          }
        }
      }
    },

    geti18nKey : function(fieldValue){
      if(fieldValue && !fieldValue.indexOf("${i18n")){
        var i18nKey = fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"));
        return i18nKey;
      }
      else
        return fieldValue;
    },
    /**     
   * Component setRequiredCode
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    setRequiredCode : function(){
      var scope = this;
      kony.application.dismissLoadingScreen();
      var dataMapping = this.controllerScope._dataMapping;
	    this.view.flxClearingCode2.setVisibility(false);
      this.view.flxRequiredClearingCode1Separator.setVisibility(false);
      this.view.imgRequireCodeBack.onTouchEnd = this.goBack.bind(this);
      this.view.imgRequireCodeBack.src ="backbutton.png";
      this.view.lblRequiredCodeHeader.text = this.businessController.getParsedDataBasedOnDataMapping("titleRequiredCode", dataMapping["flxRequiredCode"]);
      this.view.lblRequiredCodeDescription.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeLbl", dataMapping["flxRequiredCode"]);
      this.view.lblRequiredBICSwift.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField1Lbl", dataMapping["flxRequiredCode"]);
      this.view.txtRequiredBICSwift.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", dataMapping["flxRequiredCode"]["requiredCodeField1Value"]);
      this.view.txtRequiredBICSwift.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxRequiredCode"]["requiredCodeField1Value"]["length"]);
      this.view.txtRequiredBICSwift.onTextChange = this.enableRequireCodeContinue.bind(this);
      this.view.txtRequiredBICSwift.onEndEditing=this.invokeBankDetailsfromBIC.bind(this);
      this.view.btnRequiredBICSwiftCodeLookUp.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["swiftBICBtn"]);
      this.view.btnRequiredBICSwiftCodeLookUp.onClick= this.setSwiftSearchInput.bind(this);
      this.view.btnRequiredClearingCode1LookUp.onClick = this.setBCCSearchInput.bind(this);
      this.view.lblRequiredClearingCode1.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField2Lbl", dataMapping["flxRequiredCode"]);
      this.view.txtRequiredClearingCode1.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", dataMapping["flxRequiredCode"]["requiredCodeField2Value"]);
      this.view.txtRequiredClearingCode1.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxRequiredCode"]["requiredCodeField2Value"]["length"]);
      this.view.txtRequiredClearingCode1.onTextChange = this.enableRequireCodeContinue.bind(this);
      this.view.lblRequiredClearingCode2.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField3Lbl", dataMapping["flxRequiredCode"]);
      this.view.txtRequiredClearingCode2.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", dataMapping["flxRequiredCode"]["requiredCodeField3Value"]);
      this.view.txtRequiredClearingCode2.maxTextLength = this.businessController.getParsedDataBasedOnDataMapping("max", dataMapping["flxRequiredCode"]["requiredCodeField3Value"]["length"]);
      this.view.txtRequiredClearingCode2.onTextChange = this.enableRequireCodeContinue.bind(this);
      this.view.lblClearingIdentifierLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField4Lbl", dataMapping["flxRequiredCode"]);
      this.view.lblClearingIdentifierValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField4Value"]);
      this.view.lblBankNameLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField8Lbl", dataMapping["flxRequiredCode"]);
      this.view.lblBankNameValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField8Value"]);
      if(this.context["transferType"] === "International Transfer") {
        this.view.lblBankStreetLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField5Lbl", dataMapping["flxRequiredCode"])+":";
        this.view.lblBankStreetValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField5Value"]);
        this.view.lblBankTownLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField6Lbl", dataMapping["flxRequiredCode"])+":";
        this.view.lblBankTownValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField6Value"]);
        this.view.lblBankCountryLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField7Lbl", dataMapping["flxRequiredCode"])+":";
        this.view.lblBankCountryValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField7Value"]);
        this.view.lblBankIntermediaryBICLabel.text = this.businessController.getParsedDataBasedOnDataMapping("requiredCodeField9Lbl", dataMapping["flxRequiredCode"]);
        this.view.lblBankIntermediaryBICValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField9Value"]);
        this.view.flxBankStreet.onClick = function () {
          //scope.context["selectedFlowType"] = "EDIT";
          scope.setBankStreet();
          scope.navigateTo("flxPayeeBankStreet", "flxPayeeBankStreetTop", "Street");
        }
        this.view.flxBankTown.onClick = function () {
         // scope.context["selectedFlowType"] = "EDIT";
          scope.setBankTown();
          scope.navigateTo("flxPayeeBankTown", "flxPayeeBankTownTop", "Town");
        }
        this.view.flxBankCountry.onClick = function () {
          //scope.context["selectedFlowType"] = "EDIT";
          if (scope.bankCountriesUpdated === true) {
            scope.setFetchedBankCountryList();
            scope.navigateTo("flxPayeeBankCountry", "flxBankCountryTop", "Country");
            scope.setBankCountryUI();
          }
        }
        this.view.flxBankIntermediaryBIC.onClick = function () {
          //scope.context["selectedFlowType"] = "EDIT";
          scope.setIntermediaryBIC();
          scope.navigateTo("flxIntermediaryBIC", "flxIntermediaryTop", "Intermediary BIC");
        }
      }
      else if(this.context["transferType"] === "Domestic Transfer") {
        this.view.flxBankTown.setVisibility(false);
        this.view.flxBankCountry.setVisibility(false);
        this.view.flxBankStreet.setVisibility(false);
        this.view.flxBankIntermediaryBIC.setVisibility(false);
      }
      this.view.flxBankName.onClick = function () {
        //scope.context["selectedFlowType"] = "EDIT";
        scope.setPayeeBankName();
        scope.navigateTo("flxPayeeBankName", "flxPayeeBankNameTop", "Bank Name");
      }
      this.view.flxClearingIdentifierField.onClick = function () {
        scope.view.lblClearingIdentifierLabel.width = "40%";
        scope.view.lblClearingIdentifierValue.width = "45%";
        //scope.context["selectedFlowType"] = "EDIT";
        if (scope.clearingIdentifierCodesUpdated === true) {
          scope.setClearingIdentifierCodesList();
          scope.navigateTo("flxClearingIdentifierCode", "flxClearingIdentifierCodeTop", "Clearing Identifier");
          scope.setClearingIdentifierCodesUI();
        }
      }
      this.view.flxRequiredCodeDescription.skin = "sknFlxffffff";
      this.view.lblRequiredCodeHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.lblRequiredCodeDescription.skin = "ICSknLbl727272SSPReg34px";
      this.view.flxRequiredCodeHeader.skin = "sknFlx0095e4";
      this.view.flxRequiredCodeSeparator.skin = "sknFlxSeparatora6a6a6";
      this.view.txtRequiredBICSwift.focusSkin = "ICSknTxt003E751px";
      this.view.txtRequiredClearingCode1.focusSkin = "ICSknTxt003E751px";
      this.view.txtRequiredClearingCode2.focusSkin = "ICSknTxt003E751px";
      var clearingCode1btn= this.businessController.getParsedDataBasedOnDataMapping("clearingCode1Btn",dataMapping["flxRequiredCode"]);
      if(!this.isEmptyNullUndefined(clearingCode1btn)){
        this.view.btnRequiredClearingCode1LookUp.text = clearingCode1btn;
      }else{
        this.view.btnRequiredClearingCode1LookUp.setVisibility(false);
      } 
      var clearingCode2btn= this.businessController.getParsedDataBasedOnDataMapping("clearingCode2btn",dataMapping["flxRequiredCode"]);
      if(!this.isEmptyNullUndefined(clearingCode2btn)){
        this.view.btnRequiredClearingCode2LookUp.text = clearingCode2btn;
        this.view.flxRequiredClearingCode2Or.setVisibility(true);
      }else{
        this.view.btnRequiredClearingCode2LookUp.setVisibility(false);
        this.view.flxRequiredClearingCode2Or.setVisibility(false);
      }
      this.view.btnRequiredCodeContinue.text = this.businessController.getParsedDataBasedOnDataMapping("text",dataMapping["flxRequiredCode"]["requiredCodeBtn"]);
      this.view.btnRequiredCodeContinue.onClick = this.onRequireCodeContinue.bind(this);
      this.view.btnRequiredCodeContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnRequiredCodeContinue.setEnabled(false);
      this.view.btnRequireCodeCancel.onClick = this.onBack.bind(this);
      // scope.view.btnRequireCodeCancel.text = scope.getFieldValue(scope._cancelButton);
      //scope.view.btnRequireCodeCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;
      if(scope.context["selectedFlowType"] === "EDIT") {
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if(!this.isEmptyNullUndefined(transactionObject.swiftCode)){
          this.view.txtRequiredBICSwift.text =transactionObject.swiftCode;
          this.view.btnRequiredCodeContinue.skin = "ICSknBtn003E7535PXmb";
          this.view.btnRequiredCodeContinue.setEnabled(true);
        }
        if(!this.isEmptyNullUndefined(transactionObject.clearingCode1)){
          this.view.txtRequiredClearingCode1.text =transactionObject.clearingCode1;
          this.view.btnRequiredCodeContinue.skin = "ICSknBtn003E7535PXmb";
          this.view.btnRequiredCodeContinue.setEnabled(true);
        }
        if(!this.isEmptyNullUndefined(transactionObject.clearingCode2)){
          this.view.txtRequiredClearingCode2.text =transactionObject.clearingCode2;
          this.view.btnRequiredCodeContinue.skin = "ICSknBtn003E7535PXmb";
          this.view.btnRequiredCodeContinue.setEnabled(true);
        }
        if(!this.isEmptyNullUndefined(transactionObject.clearingIdentifierCode)){
          this.view.lblClearingIdentifierValue.text =transactionObject.clearingIdentifierCode;
        }
        if(this.context["transferType"] === "International Transfer") {
          if(!this.isEmptyNullUndefined(transactionObject.streetName)){
            this.view.lblBankStreetValue.text =transactionObject.streetName;
          }
          if(!this.isEmptyNullUndefined(transactionObject.townName)){
            this.view.lblBankTownValue.text =transactionObject.townName;
          }
          if(!this.isEmptyNullUndefined(transactionObject.countryName)){
            this.view.lblBankCountryValue.text =transactionObject.countryName;
          }
          if(!this.isEmptyNullUndefined(transactionObject.intermediaryBIC)){
            this.view.lblBankIntermediaryBICValue.text =transactionObject.intermediaryBIC;
          }
        }
      } else {
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        if (!this.isEmptyNullUndefined(transactionObject.swiftCode)) {
          this.view.txtRequiredBICSwift.text = transactionObject["swiftCode"];
          //this.enableButton("btnRequiredCodeContinue");
        } else {
          this.view.txtRequiredBICSwift.text = "";
         // this.disableButton("btnRequiredCodeContinue");
        }
        if(!this.isEmptyNullUndefined(transactionObject.ibanBankName)){
          this.view.imgBankNameArrow.setVisibility(false);
          this.view.flxBankName.setEnabled(false);
          this.view.lblBankNameValue.skin="ICSknLbl727272SSPReg34px";
        }
        else {
          this.view.imgBankNameArrow.setVisibility(true);
          this.view.flxBankName.setEnabled(true);
          this.view.lblBankNameValue.text=transactionObject.bankName;
          this.view.lblBankNameValue.skin="sknMMBlueLabel";
        }
        this.view.txtRequiredBICSwift.skin = "ICSknTxtE3E3E31px34px";
        this.view.txtRequiredBICSwift.setEnabled(true);
        this.view.btnRequiredBICSwiftCodeLookUp.isVisible = true;
        this.view.txtRequiredClearingCode1.text = transactionObject.clearingCode1?transactionObject.clearingCode1:"";
        this.view.txtRequiredClearingCode2.text = "";
      }
      this.enableRequireCodeContinue();
      this.setScrollHeight(this.view.flxRequiredCodeContainer, 80, 90);
    },

    setScrollHeight : function(scrollWidget,subHeaderHeight,buttonHeight){
      if (kony.os.deviceInfo().name === "iPhone") {
        scrollWidget.height = "75%";
        return;
      }
      let screenSize = this.view.info.frame.height;
      if(kony.os.deviceInfo().name !== "iPhone") {
        screenSize = screenSize - 110;
      }
      //removing subHeader and shadow
      if (subHeaderHeight) {
        screenSize = screenSize - subHeaderHeight - 15;
      }
      //removing button
      if (buttonHeight) {
        screenSize = screenSize - buttonHeight;
      }
      scrollWidget.height = screenSize + "dp";
    },
    /**     
   * Component enableRequireCodeContinue
     * To enable the continue button based on the data
     */
    invokeBankDetailsfromBIC:function() {
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["swiftCode"]=this.view.txtRequiredBICSwift.text;
      this.invokeRender= false;
      this.businessController.getBankDetailsFromSwift();
      var dataMapping = this.controllerScope._dataMapping;
      //this.view.lblBankNameValue.text = this.businessController.getParsedDataBasedOnDataMapping("text", dataMapping["flxRequiredCode"]["requiredCodeField8Value"]);
      //this.setRequiredCode(); 
    },
    enableRequireCodeContinue : function() {
      var scope = this;
      // var dataMapping = this.controllerScope._dataMapping;
      //var requiredBICLength = this.businessController.getDataMappingforObject(dataMapping["flxRequiredCode"]["requiredCodeField1Value"]["length"]);
      //var clearingCode1Length = this.businessController.getDataMappingforObject(dataMapping["flxRequiredCode"]["requiredCodeField2Value"]["length"]);
      //var clearingCode2Length = this.businessController.getDataMappingforObject(dataMapping["flxRequiredCode"]["requiredCodeField3Value"]["length"]);
      //if((this.view.txtRequiredBICSwift.text !== null && scope.view.txtRequiredBICSwift.text.length >= requiredBICLength["min"] && scope.view.txtRequiredBICSwift.text.length <= requiredBICLength["max"]) || (this.view.txtRequiredClearingCode1.text !== null && this.view.txtRequiredClearingCode1.text.length >= clearingCode1Length["min"] && this.view.txtRequiredClearingCode1.text.length <= clearingCode1Length["max"]) || (this.view.txtRequiredClearingCode2.text !== null && this.view.txtRequiredClearingCode2.text.length >= clearingCode2Length["min"] && this.view.txtRequiredClearingCode2.text.length <= clearingCode2Length["max"]) ){
      //  scope.enableButton("btnRequiredCodeContinue");
     // } 
    if(scope.validateIntNewPayeeBankDetails()){
      scope.enableButton("btnRequiredCodeContinue");
    }else {
        scope.disableButton("btnRequiredCodeContinue");
      }
    },

        /**
     * Checks if mandatory combination of feilds are filled. 
     * Returns true if filled, false if not.
     * @returns boolean
     */
        validateIntNewPayeeBankDetails: function(){
          var object = MakeATransferStore.getState();
          var transactionObj = object["Collection"]["TransactionObject"];
          transactionObj["clearingCode1"]=this.view.txtRequiredClearingCode1.text;
          var dataMapping = this.controllerScope._dataMapping;
          var requiredBICLength = this.businessController.getDataMappingforObject(dataMapping["flxRequiredCode"]["requiredCodeField1Value"]["length"]);
          var clearingCode1Length = this.businessController.getDataMappingforObject(dataMapping["flxRequiredCode"]["requiredCodeField2Value"]["length"]);
          if(this.view.txtRequiredBICSwift.text !== "" && this.view.txtRequiredBICSwift.text !== null && this.view.txtRequiredBICSwift.text.length >= requiredBICLength["min"] && this.view.txtRequiredBICSwift.text.length <= requiredBICLength["max"]){
            //swift bic is present
            return true;
          }
          if(this.view.txtRequiredClearingCode1.text !== "" && this.view.txtRequiredClearingCode1.text !== null && this.view.txtRequiredClearingCode1.text.length >= clearingCode1Length["min"] && this.view.txtRequiredClearingCode1.text.length <= clearingCode1Length["max"] && transactionObj.clearingIdentifierCode){
            //bank's Clearing code with Clearing Identifier code is present
            return true;
          }
          if (this.view.txtPayeeBankName.text !== "" && this.view.txtPayeeBankName.text !== null && transactionObj.townName && transactionObj.countryName) {
            // bank's name with Town and Country is present
            return true;
          }
          if (this.view.txtIntermediaryBIC.text !== "" && this.view.txtIntermediaryBIC.text !== null && this.view.txtPayeeBankName.text !== ""  && this.view.txtPayeeBankName.text !== null) {
            //Bank's name and Intermediary BIC is present
            return true;
          }
          //mandatory combination of feilds are not filled
          return false;
        },

    /**     
   * Component onRequireCodeContinue
     * To set swift/bic and go to next page
     */
    onRequireCodeContinue : function(){
      var scope=this;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["swiftCode"]=this.view.txtRequiredBICSwift.text;
      transactionObject["clearingCode1"]=this.view.txtRequiredClearingCode1.text;
      transactionObject["streetName"]=this.view.txtPayeeBankStreet.text;
      transactionObject["townName"]=this.view.txtPayeeBankTown.text;
      transactionObject["countryName"]=this.view.lblBankCountryValue.text;
      transactionObject["bankName"]=this.view.txtPayeeBankName.text;
      if( !(transactionObject["ibanBankName"])){
        transactionObject["ibanBankName"]=this.view.txtPayeeBankName.text;
      }
      transactionObject["intermediaryBIC"]=this.view.txtIntermediaryBIC.text;
      this.invokeRender = true;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      if(scope.context["selectedFlowType"] !== "EDIT") {
        //if (!this.isEmptyNullUndefined(this.view.txtRequiredBICSwift.text)){
			//this.invokeRender = true;
			//this.businessController.getBankDetailsFromSwift();
		//}
          
       // else {
          scope.navigateTo("flxAmount","flxAmountTop","Amount");
          scope.setTransferAmount();
       // }  
      }
      if(scope.context["selectedFlowType"] === "EDIT") {
        if (!this.isEmptyNullUndefined(this.view.txtRequiredBICSwift.text)){
          this.invokeRender = true;          
          this.businessController.getBankDetailsFromSwift();
        }
        else {  
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop","Verify Details");
        } 
      }
    },
    /**
  * A UI function to display a generic error toast message (i18n conversion is not done in this function. A converted localised string is to be given)
  * @param {scope} scope - scope of current  controller(generally "this")
  * @param {String} msg  - a msg to be displayed
  * @param {function} callBack - a callback function defined in given scope
*/
    showToastMessageError : function(scope, msg, func)
    {
      if(scope && scope.view && scope.view.flxPopup){
        this.showToast("sknflxff5d6e", "errormessage.png", msg,func,scope);
      }
    },
    /** Tost Messages util*/
    showToast : function(skin, image, message,func,scope) {
      var deviceName= kony.os.deviceInfo()["name"];
      if(deviceName === "iPhone")
      {
        if (scope.view.flxMainContainer != null || scope.view.flxMainContainer != undefined) {
          scope.view.flxMainContainer.top = "65dp";
        }
        if (scope.view.titleBarAttributes != null || scope.view.titleBarAttributes != undefined) {
          var titleBarAttributes = scope.view.titleBarAttributes;
          titleBarAttributes["navigationBarHidden"] = true;
          scope.view.titleBarAttributes = titleBarAttributes;
          titleBarAttributes["navigationBarHidden"] = false;
        }
      }
      scope.view.flxPopup.isVisible = true;
      if (this.timerCounter == undefined || this.timerCounter == null)
        this.timerCounter = 0;
      this.timerCounter=parseInt(this.timerCounter)+1;
      var timerId="timerPopupSuccess"+this.timerCounter;
      scope.view.flxPopup.skin = "" + skin;
      scope.view.customPopup.imgPopup.src = "" + image;
      scope.view.customPopup.lblPopup.text = message;
      try{
        kony.print(timerId);
        kony.timer.schedule(timerId, function() {
          scope.view.flxPopup.isVisible = false;
          if (deviceName === "iPhone") {
            if (scope.view.flxMainContainer != null || scope.view.flxMainContainer != undefined) {
              scope.view.flxMainContainer.top = "0dp";
            }
            if (scope.view.titleBarAttributes != null || scope.view.titleBarAttributes != undefined) {
              scope.view.titleBarAttributes = titleBarAttributes
            }
          }
          if(!(func === null || func === undefined))
            func.call(scope);
        }, 5, false);
      }
      catch(e)
      {
        kony.print(timerId);
        kony.print(e);
      }
    },



    setFormattedValues : function()
    {
      var scope = this;
      var object = this.collectionObj.Collection["TransactionObject"];
      object["sendOnUI"] = (new Date(object["ISOSendOn"])).format(this.formatToDisplay);
      object["startDateUI"] = (new Date(object["ISOStartDate"])).format(this.formatToDisplay);
      if(object["duration"] === "On a Specific Date" && object["ISOEndDate"]!=""){
      object["endDateUI"] = (new Date(object["ISOEndDate"])).format(this.formatToDisplay);
      }
      else{
        object["endDateUI"]="Until I Cancel";
      }
      if((object["toAccountType"] && (object["toAccountType"] === "CreditCard" || object["toAccountType"] === "Loan")) || object["frequency"] === "Once")
      {
        object["startDateUI"]= "";
        object["endDateUI"]= "";
      }
      if(object["frequency"]!=="Once")
      {
        object["sendOn"] = "";
        object["sendOnUI"] = "";
        //scope.context["ISOSendOn"] = "";
      }
      if(object["frequency"]==="Once")
      {
        //           scope.context["ISOStartDate"] = "";
        object["ISOEndDate"] = "";
        object["startDate"] = "";
        object["startDateUI"] = "";
        object["endDateUI"] = "";
        object["endDate"] = "";
      }
      scope.invokeRender =false;
      this.businessController.setDataInCollection("TransactionObject", object);
    },

    setInitialVerifyDetails : function(){
      var scope = this;
      //To- do on click for paymentMethod
      this.collectionObj = MakeATransferStore.getState();
      var object = this.collectionObj["Collection"]["TransactionObject"];
      var defaultPaymentContract = this.controllerScope._dataMapping["paymentMethod"]["servicePaymentValues"];
      var paymentUI = "";
      var paymentService = "";
      if(!scope.isEmptyNullUndefined(defaultPaymentContract[object["transactionCurrency"]]))
      {
        paymentUI = defaultPaymentContract[object["transactionCurrency"]].name;
        paymentService = defaultPaymentContract[object["transactionCurrency"]].value;
      }
      else
      {
        paymentUI = defaultPaymentContract["other"]["name"];
        paymentService = defaultPaymentContract["other"]["value"];
      }

      object["selectedServiceFeesPaidBy"] = (scope.isEmptyNullUndefined(object["selectedServiceFeesPaidBy"])) ? "SHA" : object["selectedServiceFeesPaidBy"];
      object["selectedFeesPaidBy"] = (scope.isEmptyNullUndefined(object["selectedFeesPaidBy"])) ? "Both (Shared)" : object["selectedFeesPaidBy"];
      object["selectedServicePayment"]  = (!object["selectedServicePayment"]) ? paymentService : object["selectedServicePayment"] ;
      object["selectedPaymentMethod"]  = (!object["selectedPaymentMethod"]) ? paymentUI : object["selectedPaymentMethod"] ;
      object["frequency"] = (scope.isEmptyNullUndefined(object["frequency"])) ? "Once" : object["frequency"];
      object["duration"]=(scope.isEmptyNullUndefined(object["duration"])) ? "On a Specific Date" : object["duration"];
      object["sendOn"] = (scope.isEmptyNullUndefined(object["sendOn"])) ? scope.currentBankDate : object["sendOn"];
      if(object["sendOn"] == scope.currentBankDate && object["frequency"] == "Once"){
          object["isScheduled"] = "0";
      }
      else{
          object["isScheduled"] = "1";
      }
	  var ISOStartDate = (scope.isEmptyNullUndefined(object["startDate"])) ? object["sendOn"] : object["startDate"];
      if(ISOStartDate)
      object["ISOStartDate"] = scope.businessController.getDateObjectFromCalendarString(ISOStartDate, this.dateFormat).toISOString();
      if(object["sendOn"] && object["frequency"]=="Once"){
      object["ISOSendOn"] = scope.businessController.getDateObjectFromCalendarString(object["sendOn"], this.dateFormat).toISOString();
      }
      else if(object["ISOStartDate"] && object["frequency"]!=="Once"){
        object["ISOSendOn"]=object["ISOStartDate"];
      }
      if(object["duration"]==='Until I Cancel'){
        object["ISOEndDate"]="";
      }
      else{
      var ISOEndDate = (scope.isEmptyNullUndefined(object["endDate"])) ? "" : object["endDate"];
      if(ISOEndDate)
      object["ISOEndDate"] = scope.businessController.getDateObjectFromCalendarString(ISOEndDate, this.dateFormat).toISOString();  
      }
	  if(scope.payeeFlow)
	  object["payeeFlow"] = scope.payeeFlow;  
      scope.invokeRender =false;
      scope.businessController.setDataInCollection("TransactionObject", object);
    },


    // On success of Validate Call
    /**
     * Component successfulValidation
     * Responsible to process the successfulValidation
     */
    successfulValidation : function(){
      var scope = this;
      try{
        var response = scope.collectionObj.Collection["validateResponse"];
        if(!scope.isEmptyNullUndefined(response["dbpErrMsg"]) || !scope.isEmptyNullUndefined(response["errMsg"]))
        {
          var errMsg = response["dbpErrMsg"] || response["errMsg"] || kony.i18n.getLocalizedString("kony.error.StandardErrorMessage");
          scope.showToastMessageError(scope, errMsg);
        }     
        else
        {
          if (response.messageDetails) {
            var messageObject = {};
            messageObject.messageDetails = response.messageDetails;
            var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
            messageObject.formattedSuccessText = formattedText;
            messageObject.isSuccess = "";
            this.view.CancelTransactionPopup.setContext(messageObject);
            this.view.flxOverridesPopup.setVisibility(true);
            this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
              if(btnAction)
                scope.view.flxOverridesPopup.setVisibility(false);
            };
          }
          var TransObject = this.collectionObj.Collection["TransactionObject"];
        response["exchangeRate"] ? TransObject["exchangeRate"] = response["exchangeRate"] :TransObject["exchangeRate"] ="";
          TransObject["totalAmountUI"] = scope.businessController.getFormattedAmount(response["totalAmount"],TransObject["fromTransactionCurrency"]);
          // scope.updateContext("totalAmount", !this.isEmptyNullUndefined(response.totalAmount)? scope.FormatUtils.appendCurrencySymbol(response["totalAmount"],this.context["fromAccountCurrency"]): "");
          TransObject["payeeFlow"]= scope.payeeFlow;
          if(this.isEditFlow == true && !scope.isEmptyNullUndefined(this.editTransactionId)){
            TransObject["transactionId"]= this.editTransactionId;
          }
          else{
          TransObject["transactionId"]= response["referenceId"] || "";
          }
          TransObject["transferTypeContext"]= scope.context["transferType"];
          //         scope.updateContext("serviceName", scope._transObjectServiceName);
          //         scope.updateContext("operationName", scope.mfaOperationName);                                               
          //         scope.updateContext("action", scope.mfaOperationName);  
          //         scope.updateContext("dataModel",scope._transObjectName);          
          //         scope.updateContext("flowType", response["serviceName"]);
           if(response["creditValueDate"]){
            TransObject["creditValueDate"]= response["creditValueDate"];
            TransObject["creditValueDateUI"]= (new Date(response["creditValueDate"])).format(this.formatToDisplay); 
           }
          else{
            TransObject["creditValueDate"]="";
             TransObject["creditValueDateUI"]="";
          }
          if(!scope.isEmptyNullUndefined(response["charges"]))
          {
            var charges = JSON.parse(response["charges"]);
            for(var i in charges)
            {
              TransObject["TXNFEE"]=scope.businessController.getFormattedAmount(charges[i].chargeAmount,charges[i].chargeCurrency);
            }
        }
         else{
            TransObject["TXNFEE"]= "";
          }
          scope.invokeRender =false;
          scope.businessController.setDataInCollection("TransactionObject",TransObject);
          scope.setReadOnlyTransferCharges();
          scope.enableButton("btnTransfer");
        }
        scope.resetParams();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in successfulValidation method of the component.",
        }}},
   successfulTransaction : function(){
     var scope = this;
     var transResponse = Object.assign(scope.collectionObj.Collection["TransactionObject"],scope.collectionObj.Collection["FormattedData"]);
     transResponse =  Object.assign(transResponse, scope.collectionObj.Collection["transactionResponse"]);
    scope.createTransSuccessCallback(transResponse);
    this.resetUTFTransactionData();
   },
    /**     
   * Component setSwiftSearchInput
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    setSwiftSearchInput : function(){
      var dataMapping = this.controllerScope._dataMapping;
      this.view.imgSwiftBICSearchBack.src = "backbutton.png";
      this.navigateTo("flxSwiftBICSearch","flxSwiftBICSearchHeaderTop",this.businessController.getParsedDataBasedOnDataMapping("swiftLookupHeader",dataMapping["flxSwiftBICSearch"]));
      this.view.lblSwiftBICSearchHeader.text = this.businessController.getParsedDataBasedOnDataMapping("swiftLookupHeader",dataMapping["flxSwiftBICSearch"]);
      this.view.imgSwiftBICSearchBack.onTouchEnd = this.goBack.bind(this);
      this.view.lblSwiftBICSearchDescription.text =this.businessController.getParsedDataBasedOnDataMapping("swiftLookupDescription",dataMapping["flxSwiftBICSearch"]);
      this.view.flxSwiftBICSearchHeader.skin = "sknFlx0095e4";
      this.view.lblSwiftBICSearchHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxSwiftBICSearchDescription.skin = "sknFlxffffff";;
      this.view.lblSwiftBICSearchDescription.skin = "ICSknLbl727272SSPReg34px";
      this.view.flxSwiftBICSearchSeparator.skin = "sknFlxSeparatora6a6a6";
      for(var i=1 ; i<=4 ;i++){
        var searchfieldlbl="searchField"+i+"Label";
        var searchfieldValue="searchField"+i+"Value";
        this.view["lblSwiftBICSearchField"+i].text = this.businessController.getParsedDataBasedOnDataMapping(searchfieldlbl,dataMapping["flxSwiftBICSearch"]);
        this.view["txtSwiftBICSearchValue"+i].placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder",dataMapping["flxSwiftBICSearch"][searchfieldValue]);
      }
      this.view.btnGetDetails.text = this.businessController.getParsedDataBasedOnDataMapping("text",dataMapping["flxSwiftBICSearch"]["getDetailsBtn"]);
      this.view.btnGetDetails.onClick = this.getSwiftResult.bind(this);
      this.view.btnGetDetails.skin = "ICSknBtn003E7535PXmb";
      this.view.forceLayout();

    }, 

    /**     
   * Component setBCCSearchInput
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    setBCCSearchInput : function(){
      var dataMapping = this.controllerScope._dataMapping;
      this.view.imgBCCSearchBack.src = "backbutton.png";
      this.navigateTo("flxBCCLookUp","flxBCCSearchHeaderTop",this.businessController.getParsedDataBasedOnDataMapping("BCCLookupHeader",dataMapping["flxBCCLookUp"]));
      this.view.lblBCCSearchHeader.text = this.businessController.getParsedDataBasedOnDataMapping("BCCLookupHeader",dataMapping["flxBCCLookUp"]);
      this.view.imgBCCSearchBack.onTouchEnd = this.goBack.bind(this);
      this.view.lblBCCSearchDescription.text =this.businessController.getParsedDataBasedOnDataMapping("BCCLookupDescription",dataMapping["flxBCCLookUp"]);
      this.view.flxBCCSearchHeader.skin = "sknFlx0095e4";
      this.view.lblBCCSearchHeader.skin = "ICSknLblfffffSSPSemiBold76px";
      this.view.flxBCCSearchDescription.skin = "sknFlxffffff";;
      this.view.lblBCCSearchDescription.skin = "ICSknLbl727272SSPReg34px";
      this.view.flxBCCSearchSeparator.skin = "sknFlxSeparatora6a6a6";
      for(var i=1 ; i<=3 ;i++){
        var searchfieldlbl="searchField"+i+"Label";
        var searchfieldValue="searchField"+i+"Value";
        this.view["lblBCCSearchField"+i].text = this.businessController.getParsedDataBasedOnDataMapping(searchfieldlbl,dataMapping["flxBCCLookUp"]);
        this.view["txtBCCSearchValue"+i].placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder",dataMapping["flxBCCLookUp"][searchfieldValue]);
        this.view["txtBCCSearchValue"+i].onDone = this.validateBCCLookup;
        this.view["txtBCCSearchValue"+i].onEndEditing = this.validateBCCLookup;
      }
      this.view.btnBCCGetDetails.text = this.businessController.getParsedDataBasedOnDataMapping("text",dataMapping["flxBCCLookUp"]["getDetailsBtn"]);
      this.view.btnBCCGetDetails.onClick = this.getBCCResult.bind(this);
      this.view.btnBCCGetDetails.skin = "ICSknBtn003E7535PXmb";
      this.view.forceLayout();
      this.validateBCCLookup();
    }, 

    validateBCCLookup: function(){
      if(this.view.txtBCCSearchValue1.text !== "" && this.view.txtBCCSearchValue1.text !== null) {
        //BCC is present
        this.view.btnBCCGetDetails.setEnabled(true);
      }
      else if((this.view.txtBCCSearchValue2.text !== "" && this.view.txtBCCSearchValue2.text !== null) && (this.view.txtBCCSearchValue3.text !== "" && this.view.txtBCCSearchValue3.text !== null)) {
        //Bank and branch/city is present
        this.view.btnBCCGetDetails.setEnabled(true);
      }
      else {
        this.view.btnBCCGetDetails.setEnabled(false);
      }
    },

    getBCCResult : function(){
      var searchInput = [];
      for(var i=1; i<=3;i++){
        var searchfieldValue="searchField"+i+"Value";
        var dataMapping = this.controllerScope._dataMapping;
        var dataMappingforid = this.businessController.getParsedDataBasedOnDataMapping("id",dataMapping["flxBCCLookUp"][searchfieldValue]);
        if(dataMappingforid === "clearingCode"){
          searchInput["clearingCode"] = this.view["txtBCCSearchValue"+i].text;
        }else if(dataMappingforid === "bankName"){
          searchInput["bankName"] = this.view["txtBCCSearchValue"+i].text;
        }else if(dataMappingforid === "branchOrCity"){
          searchInput["branchOrCity"] = this.view["txtBCCSearchValue"+i].text;
        }
      }
      var criteria = {
        "clearingCode":"",
        "bankName":"",
        "branchOrCity":"",
      }
      for(var key in criteria){
        if(searchInput[key] !== null){
          criteria[key] = searchInput[key];
        }else{
          criteria[key] = "";
        }
      }
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["bcclookupcode"]=criteria.clearingCode;
      transactionObject["bcclookupbankName"]=criteria.bankName;
      transactionObject["bcclookupbranch"]=criteria.branchOrCity;
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.businessController.getBCCFromBankDetails();

    },

    getSwiftResult : function(){
      var searchInput = [];
      for(var i=1; i<=4;i++){
        var searchfieldValue="searchField"+i+"Value";
        var dataMapping = this.controllerScope._dataMapping;
        var dataMappingforid = this.businessController.getParsedDataBasedOnDataMapping("id",dataMapping["flxSwiftBICSearch"][searchfieldValue]);
        if(dataMappingforid === "bankName"){
          searchInput["bankName"] = this.view["txtSwiftBICSearchValue"+i].text;
        }else if(dataMappingforid === "country"){
          searchInput["country"] = this.view["txtSwiftBICSearchValue"+i].text;
        }else if(dataMappingforid === "city"){
          searchInput["city"] = this.view["txtSwiftBICSearchValue"+i].text;
        }else if(dataMappingforid === "branchName"){
          searchInput["branch"] = this.view["txtSwiftBICSearchValue"+i].text;
        }
      }
      var criteria = {
        "bankName":"",
        "country":"",
        "city":"",
        "branch":""
      }
      for(var key in criteria){
        if(searchInput[key] !== null){
          criteria[key] = searchInput[key];
        }else{
          criteria[key] = "";
        }
      }
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      transactionObject["lookupbankName"]=criteria.bankName;
      transactionObject["lookupbranch"]=criteria.branch;
      transactionObject["lookupcity"]=criteria.city;
      transactionObject["lookupcountry"]=criteria.country;
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject", transactionObject);
      this.invokeRender = true;
      this.businessController.getBICFromBankDetails();

    },

    /**
     * Component setContactType
     * Reponsible to set field properties of ContactType.
     */
    setContactType : function() {
      try {
        var scope = this;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        scope.setContactTypeWidgetProps();
        scope.view.btnContactTypeContinue.onClick = scope.onContactTypeContinueClick.bind(this);
        scope.view.btnChooseContactList.onClick = scope.navigateToContacts.bind(this, "phone");
        scope.view.btnChooseFromContactsEmail.onClick = scope.navigateToContacts.bind(this, "email");
        scope.view.flxMobileNumber.onTouchStart = scope.onContactNumberTouch.bind(this);
        scope.view.txtContactTypeEmail.onTextChange = scope.onContactEmailTextChange.bind(this);
        scope.view.txtContactTypeEmail.onDone = scope.onContactTypeEmailDone.bind(this);
        scope.view.btnContactTypeDone.onClick = scope.onContactNumberKeyboardDone.bind(this);
        scope.view.imgContactTypeKeypadClear.onTouchStart = scope.clearContactNumberKeypadChar.bind(this);
        scope.view.flxContactTypeBack.onTouchStart = scope.goBack.bind(this);
        scope.view.flxFlagAndCodeContainer.onClick = scope.onFlagandCodeFlexClick.bind(this);
        scope.view.imgContactTypeFlag.setVisibility(this.businessController.getParsedDataBasedOnDataMapping("countryFlagVisibility", this.controllerScope._dataMapping["flxContactType"]));
        scope.view.btnContactTypeCancel.onClick = scope.onBack.bind(this); //Enable after cancel feature is implemented.
        if(scope.context["selectedFlowType"] === "EDIT") {
          var phoneNumber = transactionObject["MobileNumber"];
          var email = transactionObject["EmailID"];
          if(!scope.isEmptyNullUndefined(phoneNumber)) {
            phoneNumber = phoneNumber.split("-");
            scope.view.lblMobileNumber.text = phoneNumber[1];  
          }
          if(!scope.isEmptyNullUndefined(email)) {
            scope.view.txtContactTypeEmail.text = email;
          }
          scope.enableButton("btnContactTypeContinue");
        } else {
          scope.view.lblMobileNumber.text = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
          scope.view.txtContactTypeEmail.text = "";
          scope.disableButton("btnContactTypeContinue");
        }
        for (var i =0; i <= 9; i++) {
          scope.view["btnContactType"+i].onClick = scope.setContactNumberKeyboardChar.bind(this, i);
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContactType method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setContactTypeWidgetProps
     * Setting the field label and skin properties of contact type screen.
     */
    setContactTypeWidgetProps : function() {
      try {
        var scope = this;
        scope.view.flxContactTypeHeader.skin = "sknFlx0095e4";
        scope.view.imgContactTypeBack.src = "backbutton.png";
        scope.view.btnContactTypeCancel.skin = "ICSKnBtnffffff15px";
        scope.view.lblContactTypeHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.lblContactTypeDescription.skin = "ICSknLbl727272SSPReg34px";
        scope.view.flxContactTypeSeparator.skin = "sknFlxSeparatora6a6a6";
        scope.view.lblEmailErrorMsg.skin = "ICSknLblEE000534px";
        scope.view.lblContactTypePhoneNumber.skin = "ICSknLbl72727234px";
        scope.view.flxFlagAndCodeContainer.skin = "sknflxBorderf1f1f1";
        scope.view.lblMobileNumber.skin = "ICSknLbl727272SSPReg34px";
        scope.view.lblContactCode.skin = "ICSknLbl727272SSPReg34px";
        scope.view.flxMobileNumber.skin = "sknflxBorderf1f1f1";
        scope.view.lblContactTypeOr.skin = "sknflxBorderf1f1f1";
        scope.view.flxContactTypeNumberSeparator.skin = "sknflxBorderf1f1f1";
        scope.view.txtContactTypeEmail.skin = "ICSknTxtE3E3E31px34px";
        scope.view.lblContactTypeEmailOr.skin = "sknflxBorderf1f1f1";
        scope.view.lblContactTypeEmailAddress.skin = "sknflxBorderf1f1f1";
        scope.view.btnChooseContactList.skin = "ICSknBtn4176A434px";
        scope.view.lblContactTypeEmailAddress.skin = "sknLbla0a0a0SSPReg22px";
        scope.view.btnChooseFromContactsEmail.skin = "ICSknBtn4176A434px";
        scope.view.btnContactTypeCancel.skin = "ICSKnBtnffffff15px";
        // Text Properties.
        scope.view.lblContactTypeHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblContactTypeHeader", this.controllerScope._dataMapping["flxContactType"]);
        //scope.view.btnContactTypeCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;
        scope.view.btnContactTypeCancel.text = this.businessController.getParsedDataBasedOnDataMapping("btnContactTypeCancel", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.lblContactTypeDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblContactTypeDescription", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.lblEmailErrorMsg.text = this.businessController.getParsedDataBasedOnDataMapping("lblEmailErrorMsg", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.lblContactTypePhoneNumber.text = this.businessController.getParsedDataBasedOnDataMapping("lblContactTypePhoneNumber", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.lblContactCode.text = this.businessController.getParsedDataBasedOnDataMapping("defaultCountryCode", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
        scope.view.lblMobileNumber.text = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
        scope.view.lblContactTypeOr.text = this.businessController.getParsedDataBasedOnDataMapping("lblContactTypeOr", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.btnChooseContactList.text = this.businessController.getParsedDataBasedOnDataMapping("text", this.controllerScope._dataMapping["flxContactType"]["btnChooseContactList"]);
        scope.view.lblContactTypeEmailAddress.text = this.businessController.getParsedDataBasedOnDataMapping("lblContactTypeEmailAddress", this.controllerScope._dataMapping["flxContactType"]);
        scope.view.txtContactTypeEmail.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtContactTypeEmailPlaceholder"]);
        scope.view.btnChooseFromContactsEmail.text = this.businessController.getParsedDataBasedOnDataMapping("text", this.controllerScope._dataMapping["flxContactType"]["btnChooseFromContactsEmail"]);
        scope.view.btnContactTypeContinue.text = this.businessController.getParsedDataBasedOnDataMapping("text", this.controllerScope._dataMapping["flxContactType"]["btnContactTypeContinue"]);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContactTypeWidgetProps method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component navigateToContacts.
     * Validation based on Access permissions.
     */
    navigateToContacts : function(type) {
      try {
        var scope = this;
        parent_scope.contactTypeForContacts = type;
        var options = {
          isAccessModeAlways:true
        };
        var result = kony.application.checkPermission(kony.os.RESOURCE_CONTACTS,options);
        if(result.status === kony.application.PERMISSION_DENIED) {
          kony.application.requestPermission(kony.os.RESOURCE_CONTACTS,function success(response){
            if(response.status === kony.application.PERMISSION_GRANTED) {
              parent_scope.pickContact();
            }
            else if(response.status === kony.application.PERMISSION_DENIED) {
             kony.print("Contacts permission Denied");
            }
          });
        }
        else if(result.status === kony.application.PERMISSION_GRANTED ) {
          this.pickContact();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in navigateToContacts method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    pickContact : function() {
      try {
        var scope = this;
        var contactsAPI = java.import("com.konyffi.contacts.ContactPicker");
        if(!parent_scope.contactPickerObject) {
          parent_scope.contactPickerObject = new contactsAPI();
        }
        if(parent_scope.contactTypeForContacts === "phone") {
          parent_scope.contactPickerObject.selectSinglePhoneNumber(parent_scope.contactCallBack.bind(parent_scope));
        } else {
          parent_scope.contactPickerObject.selectSingleEmail(parent_scope.contactCallBack);
        } } catch(err){
          var errObj = {
            "errorInfo" : "Error in pickContact method of the component.",
            "errorLevel" : "Configuration",
            "error": err
          };
          scope.onError(errObj);
        }
    },

    contactCallBack : function(object) {
      try {
        var scope = this;
        var resultContact=(JSON.parse(object));
        if(parent_scope.contactTypeForContacts === "phone") {
          if(resultContact.phone)
            parent_scope.view.lblMobileNumber.text = resultContact.phone;
          parent_scope.onContactTypeEmailDone();
        } else {
          if(resultContact.email)
            parent_scope.view.txtContactTypeEmail.text = resultContact.email;
          parent_scope.onContactTypeEmailDone();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in contactCallBack method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onFlagandCodeFlexClick
     * Responsible to set Country code field properties.
     * Navigate to Country code screen.
     */
    onFlagandCodeFlexClick : function() {
      try {
        var scope = this;
        this.setCountryCode();
        this.invokeRender = true;
        this.businessController.invokeCustomVerbforGetCountryCodesList();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onFlagandCodeFlexClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
       kony.print("Error");
      }
    },

    /**
     * Component setCountryCode
     * Reponsible to set field properties of Countrycode.
     */
    setCountryCode : function() {
      try {
        var scope = this;
        scope.view.flxCountryCodeHeader.skin = "sknFlx0095e4";
        scope.view.imgCountryCodeBack.src = "backbutton.png";
        scope.view.lblCountryCodeHeader.skin = "ICSknLblfffffSSPSemiBold76px";
        scope.view.imgCountryCodeSearch.src = "search_1.png";
        scope.view.lblCountryCodeHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblCountryCodeHeader", this.controllerScope._dataMapping["segCountryCode"]);
        scope.view.tbxCountryCodeSearch.placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["segCountryCode"]["tbxCountryCodeSearch"]);
        scope.view.tbxCountryCodeSearch.skin = "ICSknTbxSSPR42424215px";
        scope.view.imgCountryCodeCloseIcon.skin = "closecircle.png";
        scope.view.lblCountryCodeNoResults.text = this.businessController.getParsedDataBasedOnDataMapping("lblCountryCodeNoResults", this.controllerScope._dataMapping["segCountryCode"]);
        scope.view.imgCountryCodeCloseIcon.setVisibility(false);
        scope.view.tbxCountryCodeSearch.text = "";
        scope.view.flxCountryCodeBack.onTouchStart = scope.goBack.bind(this);
        scope.view.segCountryCode.onRowClick = scope.onSegCountryCodeClick.bind(this);
        scope.view.tbxCountryCodeSearch.onTextChange = scope.onCountryCodeSearch.bind(this);
        scope.view.tbxCountryCodeSearch.onDone = scope.countrySearchFilter.bind(this);
        scope.view.tbxCountryCodeSearch.onCancel = scope.countrySearchFilter.bind(this);
        scope.view.imgCountryCodeSearch.onTouchStart = scope.countrySearchFilter.bind(this);
        scope.view.imgCountryCodeCloseIcon.onTouchStart = scope.onCountrySearchClear.bind(this);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCode method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);

      }
    },

    /**
     * Component setFetchedCountryCodesList
     * Setting the country name and country code to segment..
     */
    setFetchedCountryCodesList : function() {
      try{
        var scope = this;
        var dataMapping = this.controllerScope.dataMapping;
        var conditionalDataMapping = "";
        var widgetId = "segCountryCode";
        var countryServiceIdentifier = this.businessController.getParsedDataBasedOnDataMapping("countryServiceIdentifier", this.controllerScope._dataMapping["segCountryCode"]);
        for(key in dataMapping){
          if(key === widgetId){
            var segData = [];
            var segMasterDataToken = dataMapping[widgetId].segmentMasterData;
            segMasterDataToken = segMasterDataToken.split(".");
            if(segMasterDataToken[0].indexOf("Collection") != -1){
              var segMasterData = [];
              var key = segMasterDataToken[1].replace("}","");
              if(this.collectionObj.Collection[key]){
                segMasterData = this.collectionObj.Collection[key][countryServiceIdentifier];
              }
              segMasterData.map(function(record){
                var segRecord = JSON.parse(JSON.stringify(dataMapping[widgetId].segmentUI));
                for(key in segRecord){
                  segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalDataMapping, record);
                }
                segData.push(segRecord);
              });
              scope.view[widgetId].setData(segData);
              scope.countryDetails = scope.view[widgetId].data;
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFetchedCountryCodesList method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

        /**
     * Component segBankCountry
     * Reponsible to set field properties of BankCountry.
     */
        setBankCountryUI : function() {
          try {
            var scope = this;
            scope.view.flxBankCountryHeaderTop.skin = "sknFlx0095e4";
            scope.view.imgBankCountryBack.src = "backbutton.png";
            scope.view.lblBankCountryHeader.skin = "ICSknLblfffffSSPSemiBold76px";
            scope.view.lblBankCountryHeader.text = this.businessController.getParsedDataBasedOnDataMapping("lblBankCountryHeader", this.controllerScope._dataMapping["segBankCountryOptions"]);
            //scope.view.lblCountryCodeNoResults.text = this.businessController.getParsedDataBasedOnDataMapping("lblCountryCodeNoResults", this.controllerScope._dataMapping["segBankCountryOptions"]);
            scope.view.flxBankCountryBack.onTouchStart = scope.goBack.bind(this);
            scope.view.segBankCountryOptions.onRowClick = scope.onBankCountryCodeSelection.bind(this);
          } catch(err) {
            var errObj = {
              "errorInfo" : "Error in segBankCountryOptions method of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
            this.onError(errObj);
    
          }
        },

                   /**     
   * Component onBankCountryCodeSelection
     * To pass the selected data to next screen.
     */
    onBankCountryCodeSelection : function(){
      try {
          var segmentData = this.view.segBankCountryOptions.data;
          var selectedData = this.view.segBankCountryOptions.selectedRowItems;
          var selectedRow = this.view.segBankCountryOptions.selectedRowIndex[1];
          for (var i = 0; i < segmentData.length; i++) {
              segmentData[i]["flxMain"] = {
                  skin: "",
              };
          }
          selectedData[0]["flxMain"] = {
              skin: "ICSknFlxF6F6F6Radius26px",
          };
          this.view.segBankCountryOptions.setData(segmentData);
          this.view.segBankCountryOptions.setDataAt(selectedData[0], selectedRow);
          var bankCountryCode = selectedData[0]["code"];
          this.invokeRender = false;
          var collectionObj = MakeATransferStore.getState();
          var transactionObject = collectionObj["Collection"]["TransactionObject"];
          transactionObject["countryName"] = bankCountryCode;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
          this.setDataAndNavigateBasedOnPreviousScreen();
      } catch (err) {
          var errObj = {
              errorInfo: "Error in onBankCountryCodeSelection method of the component.",
              errorLevel: "Configuration",
              error: err,
          };
          this.onError(errObj);
      }
    },

         /**
     * Component setFetchedBankCountryList
     * Setting the bank country to segment..
     */
    setFetchedBankCountryList : function() {
      try{
        var scope = this;
        var dataMapping = this.controllerScope.dataMapping;
        var widgetId = "segBankCountryOptions";
        this.view.segBankCountryOptions.onRowClick = this.onBankCountrySelection;
        for(key in dataMapping){
          if(key === widgetId){
            var segData = [];
            var segMasterDataToken = dataMapping[widgetId].segmentMasterData;
            segMasterDataToken = segMasterDataToken.split(".");
            if(segMasterDataToken[0].indexOf("Collection") != -1){
              var segMasterData = [];
              var key = segMasterDataToken[1].replace("}","");
              if(this.collectionObj.Collection[key]){
                segMasterData = this.collectionObj.Collection[key];
              }
              segMasterData.forEach(country => {
                segData.push({
                  "lblFrequency":country[1],
                  "code":country[1]
                });
              })
              scope.view[widgetId].setData(segData);
              scope.bankCountryDetails = scope.view[widgetId].data;
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFetchedPurposeCodesList method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },
    /**
     * Component setFetchedPurposeCodesList
     * Setting the country name and country code to segment..
     */
    setFetchedPurposeCodesList : function() {
      try{
        var scope = this;
        var dataMapping = this.controllerScope.dataMapping;
        var widgetId = "segPurposeCodeOptions";
        this.view.segPurposeCodeOptions.onRowClick = this.onPurposeCodeSelection;
        for(key in dataMapping){
          if(key === widgetId){
            var segData = [];
            var segMasterDataToken = dataMapping[widgetId].segmentMasterData;
            segMasterDataToken = segMasterDataToken.split(".");
            if(segMasterDataToken[0].indexOf("Collection") != -1){
              var segMasterData = [];
              var key = segMasterDataToken[1].replace("}","");
              if(this.collectionObj.Collection[key]){
                segMasterData = this.collectionObj.Collection[key];
              }
              segMasterData.forEach(purposeCode => {
                segData.push({
                  "lblFrequency":purposeCode,
                  "code":purposeCode
                });
              })
              scope.view[widgetId].setData(segData);
              scope.purposeCodesDetails = scope.view[widgetId].data;
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFetchedPurposeCodesList method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

        /**
     * Component setClearingIdentifierCodesList
     * Setting the clearing Identifier Code to segment..
     */
        setClearingIdentifierCodesList : function() {
          try{
            var scope = this;
            var dataMapping = this.controllerScope.dataMapping;
            var widgetId = "segClearingIdentifierCodeOptions";
            this.view.segClearingIdentifierCodeOptions.onRowClick = this.onClearingIdentifierCodeSelection;
            for(key in dataMapping){
              if(key === widgetId){
                var segData = [];
                var segMasterDataToken = dataMapping[widgetId].segmentMasterData;
                segMasterDataToken = segMasterDataToken.split(".");
                if(segMasterDataToken[0].indexOf("Collection") != -1){
                  var segMasterData = [];
                  var key = segMasterDataToken[1].replace("}","");
                  if(this.collectionObj.Collection[key]){
                    segMasterData = this.collectionObj.Collection[key];
                  }
                  segMasterData.forEach(clearingIdentifierCode => {
                    segData.push({
                      "lblFrequency":clearingIdentifierCode,
                      "code":clearingIdentifierCode
                    });
                  })
                  scope.view[widgetId].setData(segData);
                  scope.clearingIdentifierDetails = scope.view[widgetId].data;
                }
              }
            }
          } catch(err) {
            var errObj = {
              "errorInfo" : "Error in setClearingIdentifierCodesList method of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
            this.onError(errObj);
          } 
        },

    /**
     * Component onSegCountryCodeClick
     * Getting selected row item values.
     */
    onSegCountryCodeClick : function() {
      try {
        var scope = this;
        var selectedRowItem = scope.view.segCountryCode.selectedRowItems[0];
        if(this.businessController.getParsedDataBasedOnDataMapping("btnContactTypeCancel", this.controllerScope._dataMapping["flxContactType"])) { 
          scope.view.imgContactTypeFlag.src = selectedRowItem.imgCountryCodeFlag.src;
        }
        scope.view.lblContactCode.text = selectedRowItem.lblCountryCode;
        scope.goBack();  
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onSegCountryCodeClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onCountryCodeSearch
     * Invoking the search functionality.
     */
    onCountryCodeSearch : function() {
      try {
        var scope = this;
        scope.view.imgCountryCodeCloseIcon.setVisibility(true);
        scope.countrySearchFilter();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onCountryCodeSearch method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component countrySearchFilter
     * Setting the search response to segment.
     */
    countrySearchFilter : function() {
      try {
        var scope = this;
        var result = [];
        if(!scope.isEmptyNullUndefined(scope.view.tbxCountryCodeSearch.text)) {  
          result = scope.getSearchResult(scope.countryDetails, scope.view.tbxCountryCodeSearch.text);      
        } else {
          result = scope.countryDetails;
        }
        if(result.length > 0) {
          scope.view.segCountryCode.setVisibility(true);
          scope.view.flxCountryCodeNoResults.setVisibility(false);
          scope.view.segCountryCode.setData(result);
        } else {
          scope.view.segCountryCode.setVisibility(false);
          scope.view.flxCountryCodeNoResults.setVisibility(true);
        }
        scope.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in countrySearchFilter method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
   ** Component getSearchResult
   *  Filter by Countryname and CountryCode.
   *  @param {string} segData ,searchValue.
   *  return searchData, Search results.
   */
    getSearchResult : function(segData, searchValue) {
      try {
        var scope = this;  
        var searchData = [];
        for (var i = 0; i < segData.length; i++) {
          if (segData[i] !== null || segData[i] !== undefined) {
            var searchText = "",searchCode = "";
            if(!(scope.isEmptyNullUndefined(segData[i].lblCountryName) && scope.isEmptyNullUndefined(segData[i].lblCountryCode))) {
              searchText = segData[i].lblCountryName;
              searchCode = segData[i].lblCountryCode;
            }
            var pattern = searchValue;
            if ((searchText.search(pattern.trim()) !== -1) ||(searchCode.search(pattern.trim()) !== -1)) {
              searchData.push(segData[i]);
            }
          }
        }
        return searchData; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchResult method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onCountrySearchClear
     * Clearing the search and setting old response to segment.
     */
    onCountrySearchClear : function() {
      try {
        var scope = this;
        scope.view.imgCountryCodeCloseIcon.setVisibility(false);
        scope.view.tbxCountryCodeSearch.text = "";
        scope.countrySearchFilter();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onCountrySearchClear method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactTypeContinueClick
     * Navigate to next screen.
     */
    onContactTypeContinueClick : function() {
      try {
        this.invokeRender = false;
        var scope = this;
        var object = MakeATransferStore.getState();
        var transactionObject = object["Collection"]["TransactionObject"];
        var phoneNumber = scope.view.lblMobileNumber.text;
        var placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
        if(phoneNumber !== placeholder) {
          var value = scope.view.lblContactCode.text + "-" +scope.view.lblMobileNumber.text;
          transactionObject["MobileNumber"] = value;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
        }
        if(!kony.sdk.isNullOrUndefined(scope.view.txtContactTypeEmail.text) && scope.view.txtContactTypeEmail.text !== "") {
          transactionObject["EmailID"] = value;
          this.businessController.setDataInCollection("TransactionObject", transactionObject);
        }
        if(scope.context["selectedFlowType"] === "EDIT") {
         kony.print("Include after Verify Details screen is done.");
          scope.setVerifyDetails(); //Flow Yet to be Developed
          scope.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", "Verify Details");
        } else {
          if(scope.context["transferType"] === "Pay a Person") {
           kony.print("Include after Amount screen is done.");
            scope.setTransferAmount(); //Flow Yet to be Developed
            scope.navigateTo("flxAmount","flxAmountTop","Amount");
          } 
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactTypeContinueClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },


    setReadOnlyTransferCharges : function()
    {
      var scope = this;
      var dataMapping =scope.controllerScope._dataMapping;
      for(var j=1;j<=10;j++)
      {
        var readOnlyFieldLabel =this.businessController.getParsedDataBasedOnDataMapping("lblReadOnlyField"+j+"Label", dataMapping["flxVerifyDetails"]);
        var readOnlyFieldValue = this.businessController.getParsedDataBasedOnDataMapping("lblReadOnlyField"+j+"Value", dataMapping["flxVerifyDetails"]);
        scope.view["flxReadOnlyField"+j].setVisibility(false);
        if(!(scope.isEmptyNullUndefined(readOnlyFieldLabel) || scope.isEmptyNullUndefined(readOnlyFieldValue)))
        {
          scope.view["flxReadOnlyField"+j].setVisibility(true);
          scope.view["lblReadOnlyField"+j+"Label"].text = readOnlyFieldLabel;
          scope.view["lblReadOnlyField"+j+"Label"].skin = "sknMMLeftLabels";
          scope.view["lblReadOnlyField"+j+"Value"].text = readOnlyFieldValue;
          scope.view["lblReadOnlyField"+j+"Value"].skin = "ICSknLbl727272SSPReg34px";
        }
        if(readOnlyFieldLabel === kony.i18n.getLocalizedString("kony.mb.addBen.bankName")) {
          if(readOnlyFieldValue.length > 70) {
            this.view.flxReadOnlyField10.height = "100dp";
          } else if (readOnlyFieldValue.length > 40 && readOnlyFieldValue.length <= 70) {
            this.view.flxReadOnlyField10.height = "75dp";
          } else {
            this.view.flxReadOnlyField10.height = "54dp";
          }
        }
      }
      scope.view.forceLayout();
    },


    resetParams : function()
    {
      var scope = this;
  //    var response = scope.collectionObj.Collection["validateResponse"];
//       response["dbpErrCode"]="";
//       response["dbpErrMsg"]="";
//       response["message"]="";
//       response["referenceId"]="";
//       response["status"]="";
      scope.invokeRender=false;
      scope.businessController.setDataInCollection("validateResponse", {});
      scope.view.forceLayout();
    },


    /**
     * Component onContactNumberTouch.
     * set the visibility of contact number keypad.
     */
    onContactNumberTouch : function(){
      try {
        var scope = this;
        scope.view.flxContactTypeNumberKeypad.setVisibility(true);
        scope.view.flxMobileNumber.skin = "ICSknFlx003E75Border1px";
        scope.view.flxContactType.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactNumberTouch method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactEmailTextChange.
     * Email Vaidation.
     */
    onContactEmailTextChange : function() {
      try{
        var scope = this;
        scope.view.lblEmailErrorMsg.setVisibility(false);
        scope.view.txtContactTypeEmail.skin = "ICSknTxt003E751px"; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactEmailTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactTypeEmailDone.
     * Email Vaidation.
     */
    onContactTypeEmailDone : function() {
      try {
        var scope = this;
        var email = scope.view.txtContactTypeEmail.text;
        var phoneNumber = scope.view.lblMobileNumber.text;
        var placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
        if(!scope.isEmptyNullUndefined(email)) {
          if(kony.string.isValidEmail(email)) {
            scope.view.txtContactTypeEmail.skin = "ICSknTxtE3E3E31px34px";
            scope.enableButton("btnContactTypeContinue");
          } else {
            scope.view.lblEmailErrorMsg.setVisibility(true);
            scope.view.txtContactTypeEmail.skin = "ICSknTxtF54B5EBorder";
            scope.disableButton("btnContactTypeContinue");
          }
          scope.view.flxMobileNumber.setEnabled(false);
          scope.view.flxFlagAndCodeContainer.setEnabled(false);
        } 
        else {
          scope.view.flxMobileNumber.setEnabled(true);
          scope.view.flxFlagAndCodeContainer.setEnabled(true);
          scope.enableButton("btnContactTypeContinue");
        }
      }  catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactTypeEmailDone method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactNumberKeyboardDone.
     * To set the visbility of Number keypad.
     */
    onContactNumberKeyboardDone : function() {
      try {
        var scope = this;
        var length = this.businessController.getParsedDataBasedOnDataMapping("length", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);
        var minlength = length["min"], maxlength = length["max"];
        var phoneNumber = scope.view.lblMobileNumber.text;
        var placeholder = this.businessController.getParsedDataBasedOnDataMapping("placeHolder", this.controllerScope._dataMapping["flxContactType"]["txtMobileNumber"]);;
        var email = scope.view.txtContactTypeEmail.text;
        scope.view.flxContactTypeNumberKeypad.setVisibility(false);
        scope.view.flxMobileNumber.skin = "sknflxBorderf1f1f1";
        if(scope.view.lblMobileNumber.text.length > minlength && scope.view.lblMobileNumber.text.length < maxlength && phoneNumber !== placeholder) {
          scope.enableButton("btnContactTypeContinue");
          scope.view.txtContactTypeEmail.setEnabled(false);
        } else {
          if(scope.view.lblMobileNumber.text.length === 0) {
            scope.view.lblMobileNumber.text = placeholder;
            scope.view.txtContactTypeEmail.setEnabled(true);
            scope.disableButton("btnContactTypeContinue");
          } else {
            scope.view.txtContactTypeEmail.setEnabled(false);
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactNumberKeyboardDone method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setContactNumberKeyboardChar.
     * To append keypad string to the label.
     */
    setContactNumberKeyboardChar : function(char) {
      try {
        var scope = this;
        scope.ContactNumberkeypadString = scope.ContactNumberkeypadString + char;
        scope.view.lblMobileNumber.text = scope.ContactNumberkeypadString;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContactNumberKeyboardChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component clearContactNumberKeypadChar.
     * To Clear last character of entered digits.
     */
    clearContactNumberKeypadChar : function() {
      try {
        var scope = this;
        if(scope.ContactNumberkeypadString.length >= 1)
        {
          scope.ContactNumberkeypadString = scope.ContactNumberkeypadString.substr(0, scope.ContactNumberkeypadString.length - 1);
        }
        scope.view.lblMobileNumber.text = scope.ContactNumberkeypadString;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in clearContactNumberKeypadChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    setRepeatData : function() {
      this.view.flxFromAccount.setVisibility(false);
      var object = MakeATransferStore.getState();
      var transactionObject = {};
      var formatteddata = {};
      var count = 1;
      var fromAccounts = object["Collection"]["Accounts"];
      var toAccounts = object["Collection"]["Recipients"];
      var fromAccountNumber = this.businessController.getParsedDataBasedOnDataMapping("fromAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      var toAccountNumber = this.businessController.getParsedDataBasedOnDataMapping("toAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      var transactionCurrency = this.businessController.getParsedDataBasedOnDataMapping("transactionCurrency", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      var transferAmount = this.businessController.getParsedDataBasedOnDataMapping("transferAmount", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      var paidByServiceMappings = this.businessController.getParsedDataBasedOnDataMapping("serviceFeesPaidValues", this.controllerScope._dataMapping["flxFeesPaidBy"]);
      var selectedServiceFeesPaidBy = this.businessController.getParsedDataBasedOnDataMapping("selectedFeesPaidBy", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      if(transferAmount.indexOf(".") === -1)
        transferAmount = transferAmount + ".00";
      var formatedAmount = this.businessController.getCurrencySymbol(transactionCurrency)+transferAmount;
      for(i=0;i<fromAccounts.length;i++) {
        if(fromAccounts[i].accountID === fromAccountNumber) {
          var selectedFromAccountData = fromAccounts[i];
          formatteddata["formattedfromAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedfromAccountName", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          if(this.isEmptyNullUndefined(formatteddata["formattedfromAccountName"]))
            formatteddata["formattedfromAccountName"] = fromAccounts[i].accountName;
          transactionObject["fromTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("fromTransactionCurrency", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          transactionObject["fromAccountNumber"] = fromAccountNumber;
          formatteddata["formattedfromAvailableBalance"] = fromAccounts[i].availableBalance;
          }
      }
      if(this.context.transferType === "Within Same Bank") {
        selectedFromAccountData[0] = {"lblField1":fromAccountNumber};
      }
      this.groupToAccounts(selectedFromAccountData);
      object = MakeATransferStore.getState();
      toAccounts = object["Collection"]["toAccounts"];
      let isAccountFound = false;
      for(i=0;i<toAccounts.length;i++) {
        if(toAccounts[i].accountNumber === toAccountNumber || toAccounts[i].accountID === toAccountNumber || toAccounts[i].PayPersonId === toAccountNumber) {
          this.isToAccountEditable = false;
          isAccountFound = true;
          formatteddata["formattedtoAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedtoAccountName", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          if(this.isEmptyNullUndefined(formatteddata["formattedtoAccountName"]))
            formatteddata["formattedtoAccountName"] = this.isEmptyNullUndefined(toAccounts[i].beneficiaryName) ? toAccounts[i].accountName || toAccounts[i].name : toAccounts[i].beneficiaryName;
          transactionObject["beneficiaryName"] = this.businessController.getParsedDataBasedOnDataMapping("beneficiaryName", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          if(this.isEmptyNullUndefined(transactionObject["beneficiaryName"]))
            transactionObject["beneficiaryName"] = toAccounts[i].beneficiaryName || toAccounts[i].name;
          transactionObject["externalAccountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("externalAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          if(this.isEmptyNullUndefined(transactionObject["externalAccountNumber"]))
            transactionObject["externalAccountNumber"] = toAccountNumber;
          transactionObject["toAccountNumber"] = toAccountNumber;
          if(this.context.transferType === "Pay a Person") {
            transactionObject["beneficiaryPhone"] = toAccounts[i].phone;
            transactionObject["beneficiaryEmail"] = toAccounts[i].email;
          }
          transactionObject["swiftCode"] = toAccounts[i].swiftCode;
          transactionObject["toAccountName"] = "";
          transactionObject["toTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountCurrency", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
          formatteddata["formattedtoAvailableBalance"] = toAccounts[i].bankName;
          transactionObject["beneType"] = toAccounts[i].beneType;
          break;
        }
        else {
          formatteddata["formattedtoAccountName"] = "Account not found";
        }
      }
      if (isAccountFound === false) {
        //This case occurs when the user repeats a transaction done to a deleted beneficiary
        //The data is set to the formatted data and transaction object from data from manage transactions
        //The data from manage transactions currently doesn't have optional fields like benificiary address
        //The API has to be enhanced to get the details.
        this.isToAccountEditable = false;
        const repeatDataForUI = this.collectionObj.Collection.RepeatData;

        formatteddata["formattedtoAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedtoAccountName", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
        if(this.isEmptyNullUndefined(formatteddata["formattedtoAccountName"])){
          formatteddata["formattedtoAccountName"] = this.isEmptyNullUndefined(repeatDataForUI.toProcessedName) ? repeatDataForUI.toAccountName || repeatDataForUI.beneficiaryName : repeatDataForUI.toProcessedName;
        }

        transactionObject["beneficiaryName"] = this.businessController.getParsedDataBasedOnDataMapping("beneficiaryName", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
        if(this.isEmptyNullUndefined(transactionObject["beneficiaryName"])){
          transactionObject["beneficiaryName"] = repeatDataForUI.beneficiaryName || repeatDataForUI.toAccountName;
        }

        transactionObject["externalAccountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("externalAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
        if(this.isEmptyNullUndefined(transactionObject["externalAccountNumber"])){
          transactionObject["externalAccountNumber"] = toAccountNumber;
        }

        transactionObject["toAccountNumber"] = toAccountNumber;
        if(this.context.transferType === "Pay a Person") {
          transactionObject["beneficiaryPhone"] = repeatDataForUI.beneficiaryPhone;
          transactionObject["beneficiaryEmail"] = repeatDataForUI.beneficiaryEmail;
        }
        transactionObject["swiftCode"] = repeatDataForUI.swiftCode || repeatDataForUI.beneficiaryBIC;
        transactionObject["toAccountName"] = "";

        transactionObject["toTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountCurrency", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
        formatteddata["formattedtoAvailableBalance"] = repeatDataForUI.bankName;
        if(repeatDataForUI.transactionType==="ExternalTransfer") {
          transactionObject["beneType"] = "external";
        }else{
          transactionObject["beneType"] = "internal";
        }
      }
      for(items in paidByServiceMappings) {
        this.disableOptions = count;
        if(paidByServiceMappings[items].paidBy === selectedServiceFeesPaidBy) {
          this.setFeesPaidSelected = true;
          var selectedFeesPaidBy = items;
          break;
        }
        count++;
      }
      transactionObject["transactionType"] = this.businessController.getParsedDataBasedOnDataMapping("transactionType", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["transferAmount"] = transferAmount;
      transactionObject["IBAN"] = toAccountNumber;
      formatteddata["formattedTransferAmount"] = formatedAmount;
      transactionObject["selectedFeesPaidBy"] = selectedFeesPaidBy;
      transactionObject["selectedServiceFeesPaidBy"] = selectedServiceFeesPaidBy;
      transactionObject["selectedServicePayment"] = this.businessController.getParsedDataBasedOnDataMapping("selectedServicePayment", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["selectedPaymentMethod"] = transactionObject["selectedServicePayment"] === "INSTPAY" ? "Instant" : this.businessController.getParsedDataBasedOnDataMapping("selectedPaymentMethod", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["accountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["frequency"] = this.businessController.getParsedDataBasedOnDataMapping("frequency", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["sendOn"] = this.currentBankDate;
      transactionObject["intermediaryBIC"] = this.businessController.getParsedDataBasedOnDataMapping("intermediaryBIC", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["e2eReference"] = this.businessController.getParsedDataBasedOnDataMapping("e2eReference", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
      transactionObject["Id"] = "";
      transactionObject["purposeCode"] = this.businessController.getParsedDataBasedOnDataMapping("purposeCode", this.controllerScope._dataMapping["flxVerifyDetailsRepeat"]);
	    this.payeeFlow='Existing';
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject",transactionObject);
      this.businessController.setDataInCollection("FormattedData",formatteddata);
      if(this.context.transferType === "Domestic Transfer") {
        this.businessController.invokeValidateIBANService();
      }
      this.setCurrencySymbol(transactionCurrency);
      this.setCurrency();
      this.setFeesPaidBy();
      this.setProprietary();
      this.setVerifyDetails();
      this.view.flxMMAmount.setVisibility(true);
    },
    setProprietary : function() {
      var scope=this;
      var object = MakeATransferStore.getState();
      var transactionObject = object["Collection"]["TransactionObject"];
      if(scope.context["transferType"]=== "Domestic Transfer"){
        if(transactionObject["selectedPaymentMethod"]=== "Instant") {
          transactionObject["localInstrumentProprietary"] = "INST";
        } else {
          transactionObject["localInstrumentProprietary"] = "";
        }
        if(transactionObject["selectedPaymentMethod"]!== "Instant" ||transactionObject["transactionCurrency"]=== "EUR") {
          transactionObject["serviceLevelProprietary"] = "SEPA";
        } else {
          transactionObject["serviceLevelProprietary"] = "";
        }
        this.invokeRender = false;
        scope.businessController.setDataInCollection("TransactionObject",transactionObject);
      }
    },

    setEditData : function() {
      this.view.flxFromAccount.setVisibility(false);
      var object = MakeATransferStore.getState();
      var transactionObject = {};
      var formatteddata = {};
      var count = 1;
      var fromAccounts = object["Collection"]["Accounts"];
      var toAccounts = object["Collection"]["Recipients"];
      var fromAccountNumber = this.businessController.getParsedDataBasedOnDataMapping("fromAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      var toAccountNumber = this.businessController.getParsedDataBasedOnDataMapping("toAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      var transactionCurrency = this.businessController.getParsedDataBasedOnDataMapping("transactionCurrency", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      var transferAmount = this.businessController.getParsedDataBasedOnDataMapping("transferAmount", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      var paidByServiceMappings = this.businessController.getParsedDataBasedOnDataMapping("serviceFeesPaidValues", this.controllerScope._dataMapping["flxFeesPaidBy"]);
      var selectedServiceFeesPaidBy = this.businessController.getParsedDataBasedOnDataMapping("selectedFeesPaidBy", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      if(transferAmount.indexOf(".") === -1)
        transferAmount = transferAmount + ".00";
      var formatedAmount = this.businessController.getCurrencySymbol(transactionCurrency)+transferAmount;
      for(i=0;i<fromAccounts.length;i++) {
        if(fromAccounts[i].accountID === fromAccountNumber) {
          var selectedFromAccountData = fromAccounts[i];
          formatteddata["formattedfromAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedfromAccountName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          if(this.isEmptyNullUndefined(formatteddata["formattedfromAccountName"]))
          formatteddata["formattedfromAccountName"] = fromAccounts[i].accountName;
          transactionObject["fromTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("fromTransactionCurrency", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          transactionObject["fromAccountNumber"] = fromAccountNumber;
          formatteddata["formattedfromAvailableBalance"] = fromAccounts[i].availableBalance;
          transactionObject["fromAccountName"]=this.businessController.getParsedDataBasedOnDataMapping("formattedfromAccountName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
        }
      }
      if(this.context.transferType === "Within Same Bank") {
        selectedFromAccountData[0] = {"lblField1":fromAccountNumber};
      }
      this.groupToAccounts(selectedFromAccountData);
      object = MakeATransferStore.getState();
      toAccounts = object["Collection"]["toAccounts"];
      let isAccountFound = false;
      for(i=0;i<toAccounts.length;i++) {
        if(toAccounts[i].accountNumber === toAccountNumber || toAccounts[i].accountID === toAccountNumber || toAccounts[i].PayPersonId === toAccountNumber) {
          this.isToAccountEditable = false;
          isAccountFound = true;
          formatteddata["formattedtoAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedtoAccountName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          if(this.isEmptyNullUndefined(formatteddata["formattedtoAccountName"]))
            formatteddata["formattedtoAccountName"] = this.isEmptyNullUndefined(toAccounts[i].beneficiaryName) ? toAccounts[i].accountName || toAccounts[i].name : toAccounts[i].beneficiaryName;
          transactionObject["beneficiaryName"] = this.businessController.getParsedDataBasedOnDataMapping("beneficiaryName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          if(this.isEmptyNullUndefined(transactionObject["beneficiaryName"]))
            transactionObject["beneficiaryName"] = toAccounts[i].beneficiaryName || toAccounts[i].name;
          transactionObject["externalAccountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("externalAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          if(this.isEmptyNullUndefined(transactionObject["externalAccountNumber"]))
            transactionObject["externalAccountNumber"] = toAccountNumber;
          transactionObject["toAccountNumber"] = toAccountNumber;
          if(this.context.transferType === "Pay a Person") {
            transactionObject["beneficiaryPhone"] = toAccounts[i].phone;
            transactionObject["beneficiaryEmail"] = toAccounts[i].email;
          }
          transactionObject["swiftCode"] = toAccounts[i].swiftCode;
          transactionObject["toAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          transactionObject["toTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountCurrency", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
          formatteddata["formattedtoAvailableBalance"] = toAccounts[i].bankName;
          transactionObject["beneType"] = toAccounts[i].beneType;
          break;
        }
        else {
          formatteddata["formattedtoAccountName"] = "Account not found";
        }
      }
      if (isAccountFound === false) {
        //This case occurs when the user repeats a transaction done to a deleted beneficiary
        //The data is set to the formatted data and transaction object from data from manage transactions
        //The data from manage transactions currently doesn't have optional fields like benificiary address
        //The API has to be enhanced to get the details.
        this.isToAccountEditable = false;
        const editDataForUI = this.collectionObj.Collection.EditData;

        formatteddata["formattedtoAccountName"] = this.businessController.getParsedDataBasedOnDataMapping("formattedtoAccountName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
        if(this.isEmptyNullUndefined(formatteddata["formattedtoAccountName"])){
          formatteddata["formattedtoAccountName"] = this.isEmptyNullUndefined(editDataForUI.toProcessedName) ? editDataForUI.toAccountName || editDataForUI.beneficiaryName : editDataForUI.toProcessedName;
        }

        transactionObject["beneficiaryName"] = this.businessController.getParsedDataBasedOnDataMapping("beneficiaryName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
        if(this.isEmptyNullUndefined(transactionObject["beneficiaryName"])){
          transactionObject["beneficiaryName"] = editDataForUI.beneficiaryName || editDataForUI.toAccountName;
        }

        transactionObject["externalAccountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("externalAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
        if(this.isEmptyNullUndefined(transactionObject["externalAccountNumber"])){
          transactionObject["externalAccountNumber"] = toAccountNumber;
        }

        transactionObject["toAccountNumber"] = toAccountNumber;
        if(this.context.transferType === "Pay a Person") {
          transactionObject["beneficiaryPhone"] = editDataForUI.beneficiaryPhone;
          transactionObject["beneficiaryEmail"] = editDataForUI.beneficiaryEmail;
        }
        transactionObject["swiftCode"] = editDataForUI.swiftCode || editDataForUI.beneficiaryBIC;
        transactionObject["toAccountName"] = "";

        transactionObject["toTransactionCurrency"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountCurrency", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
        formatteddata["formattedtoAvailableBalance"] = editDataForUI.bankName;
        if(editDataForUI.transactionType==="ExternalTransfer") {
          transactionObject["beneType"] = "external";
        }else{
          transactionObject["beneType"] = "internal";
        }
      }
      for(items in paidByServiceMappings) {
        this.disableOptions = count;
        if(paidByServiceMappings[items].paidBy === selectedServiceFeesPaidBy) {
          this.setFeesPaidSelected = true;
          var selectedFeesPaidBy = items;
          break;
        }
        count++;
      }
      transactionObject["transactionType"] = this.businessController.getParsedDataBasedOnDataMapping("transactionType", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["transferAmount"] = transferAmount;
      transactionObject["IBAN"] = toAccountNumber;
      formatteddata["formattedTransferAmount"] = formatedAmount;
      transactionObject["selectedFeesPaidBy"] = selectedFeesPaidBy;
      transactionObject["selectedServiceFeesPaidBy"] = selectedServiceFeesPaidBy;
      transactionObject["selectedServicePayment"] = this.businessController.getParsedDataBasedOnDataMapping("selectedServicePayment", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["selectedPaymentMethod"] = transactionObject["selectedServicePayment"] === "INSTPAY" ? "Instant" : this.businessController.getParsedDataBasedOnDataMapping("selectedPaymentMethod", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["accountNumber"] = this.businessController.getParsedDataBasedOnDataMapping("toAccountNumber", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["frequency"] = this.businessController.getParsedDataBasedOnDataMapping("frequency", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["intermediaryBIC"] = this.businessController.getParsedDataBasedOnDataMapping("intermediaryBIC", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["e2eReference"] = this.businessController.getParsedDataBasedOnDataMapping("e2eReference", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["Id"] = "";
      transactionObject["transactionId"]=this.businessController.getParsedDataBasedOnDataMapping("transactionId", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      this.editTransactionId=transactionObject["transactionId"];
      transactionObject["startDate"]=this.businessController.getParsedDataBasedOnDataMapping("frequencyStartDate", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["endDate"]=this.businessController.getParsedDataBasedOnDataMapping("frequencyEndDate", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["serviceName"]=this.businessController.getParsedDataBasedOnDataMapping("serviceName", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["sendOn"]=this.businessController.getParsedDataBasedOnDataMapping("scheduledDate", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["transactionDate"]=this.businessController.getParsedDataBasedOnDataMapping("scheduledDate", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      transactionObject["payeeCurrency"]=transactionCurrency;
      if(!this.isEmptyNullUndefined(transactionObject["sendOn"])){
        transactionObject["sendOn"]=this.getFormattedDateForEdit(transactionObject["sendOn"]);
      }
      if(!this.isEmptyNullUndefined(transactionObject["startDate"])){
        transactionObject["startDate"]=this.getFormattedDateForEdit(transactionObject["startDate"]);
      }
      if(!this.isEmptyNullUndefined(transactionObject["endDate"])){
        transactionObject["endDate"]=this.getFormattedDateForEdit(transactionObject["endDate"]);
      }
      if(this.isEmptyNullUndefined(transactionObject["endDate"])){
        transactionObject["duration"]="Until I Cancel";
      }
      else{
        transactionObject["duration"]="On a Specific Date";
      }
      transactionObject["purposeCode"] = this.businessController.getParsedDataBasedOnDataMapping("purposeCode", this.controllerScope._dataMapping["flxVerifyDetailsEdit"]);
      this.payeeFlow='Existing';
      this.invokeRender = false;
      this.businessController.setDataInCollection("TransactionObject",transactionObject);
      this.businessController.setDataInCollection("FormattedData",formatteddata);
      if(this.context.transferType === "Domestic Transfer") {
        this.businessController.invokeValidateIBANService();
      }
      this.setCurrencySymbol(transactionCurrency);
      this.setCurrency();
      this.setFeesPaidBy();
      this.setProprietary();
      this.setVerifyDetails();
      this.view.flxMMAmount.setVisibility(true);
    },
    
    getFormattedDateForEdit : function(scheduledDate) {
      try{
        var dateObject = new Date(scheduledDate);
        dateObject.setDate(dateObject.getDate());
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (date < 10) {
          date = "0" + date;
        }
        return date + "/" + month + "/" + dateObject.getFullYear();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in getTomorrowsdate method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
        /**     
	 * Component uploadNativeFile
     * @param {Object} documentObject - Object which contains detail about selected document.
     */
    uploadNativeFile: function (documentObject) { 
      var scope = this;
      scope.hideFileSelectionOption();
      var fileMimeType = documentObject.type;
      var fileName = documentObject.fileName;
      var fileSize = documentObject.size;
       var maxFileSize = 2;
      try {
       var typeError = kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentTypeErrorMsg2"); 
        var sizeError = kony.i18n.getLocalizedString("i18n.unified.attachmentSizeErrorMessage");
        var format = scope.expectedFileFormat;
        if (scope.isEmptyNullUndefined(format[fileMimeType])) {
          scope.view.lblSupportingErrorMessage.text = typeError;
          scope.view.flxSupportingDocSizePopup.setVisibility(true);
          scope.view.flxVerifyDetailMainContainer.setEnabled(false);
        }
        else {
          if (documentObject.content !== null) {
            var base64 = documentObject.content;
            if (base64 !== null && base64 !== undefined && base64 !== "") {
              if (fileSize > maxFileSize * 1000) {
                scope.view.lblSupportingErrorMessage.text = sizeError;
                scope.view.flxSupportingDocSizePopup.setVisibility(true);
                scope.view.flxVerifyDetailMainContainer.setEnabled(false);
              } else {
                scope.fileNames.push(fileName);
                scope.fileTypes.push(fileMimeType);
                scope.setAttachmentsDataToSegment();
              }
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in uploadNativeFile method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

  };
});