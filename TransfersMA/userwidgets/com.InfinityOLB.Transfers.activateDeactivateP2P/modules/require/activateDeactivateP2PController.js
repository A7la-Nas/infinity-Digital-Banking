
define(['CommonUtilities','./activateP2PStore','./activateP2PBusinessController', 'DataValidationFramework/DataValidationHandler'],function(CommonUtilities, ActivateP2PStore, BusinessController,DataValidationHandler) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.businessController = new BusinessController();
      ActivateP2PStore.subscribe(this.render.bind(this));
      this.dataValidationHandler = new DataValidationHandler();
      this.store = ActivateP2PStore;      
      this.businessController.store = this.store;
      this.valueList = this.view.segDropdownList;
      this.collectionObj = ActivateP2PStore.getState();
      this.unFormatPhoneNo="";
      this.billerList = [];
      this.contactList=[];  
      this.editFlag = "";
      this.selectedContact="no"
      this.errorIdentifier = "";
      this.isSearchFlow = "";
      this.segFromAccountsData ="";
      this.isBusinessAccountListValue="";
      this.filterFromAccounts = "Loan,CreditCard" ;
      this.filterType = "accountType";
      this.segDepositAccountList="";
      this.contactSegment="";
      this.searchApplied = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
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
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
    },
    
    /**
	* @api : postShow
 	* Gets invoked initially after rendering of UI
	* @return : NA
	*/
    postShow: function() {
      var scope = this;
      // this.view.btnActivate.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.activate");
      // this.view.btnActivated.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.activate");
      // this.view.btnActivateCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.flxDepositAccountValue.onKeyPress = this.keyPressCallBack;
      this.view.flxCurrencyLabel1.onKeyPress = this.keyPressCallBack;  
      try {
        this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.breakpoints);
        this.businessController.getMetaDataForAllObjects();   
        if(this.context.flowType==="Activation")
        {
          this.setHeaderLabel(this.businessController.getDataBasedOnDataMapping("headerLabelActivate", this._dataMapping));
          this.view.flxInputs.setVisibility(true);  
          this.view.flxActivate.setVisibility(false);
          this.view.flxDeactivate.setVisibility(false);
        }
        else
        {
          this.setHeaderLabel(this.businessController.getDataBasedOnDataMapping("headerLabelDeactivate", this._dataMapping));       
          this.view.flxDeactivate.setVisibility(true);
          this.view.flxInputs.setVisibility(false);  
          this.view.flxActivate.setVisibility(false);
        }
        this.contextData(); 
        if( this.selectedContact !== "yes" && this.context.flowType==="Activation")
        {
          this.disableContinueButton();
          this.setBasedOnContactType("lblRadioButton1");
        }
        this.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": this.view.flxDepositAccountValue.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts' : 'Default Deposit Account. Currently selected ' + this.view.flxDepositAccountValue.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": false,
            "role": "button",
            "tabindex": 0
          }
        };
        this.view.flxCurrencyLabel1.accessibilityConfig = {
          "a11yLabel": 'Transfer Limit. Currently selected ' + this.view.lblSelectedCurrency1.text + '. Click to show list of currencies.',
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": false,
            "role": "button"
          }
        };
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    keyPressCallBack: function(eventObject,eventPayload){
      var scope = this;
      if(eventPayload.keyCode === 9 && eventPayload.shiftKey === true && eventObject.parent.widgets().pop().isVisible){
        var a11yText = '';
        if(eventObject.id === 'flxDepositAccountValue'){
        a11yText = scope.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scope.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.';
        eventObject.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        }
        if(eventObject.id === 'flxCurrencyLabel1'){
        a11yText = 'Transfer Limit. Currently selected '+ scope.view.lblSelectedCurrency1.text +'. Click to show list of currencies.';
        eventObject.imgCurrencyDropdownIcon1.src = "arrow_down.png";
        }
        eventPayload.preventDefault();
        eventObject.accessibilityConfig = {
          "a11yLabel": a11yText,
          "a11yARIA": {
            "aria-expanded": false,
            "role": "button",
            "tabindex": 0
          }
        }
        eventObject.setActive(true);
        eventObject.parent.widgets().pop().setVisibility(false);
      }
    },

    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function(context) {
      var scope = this;
      try {
        this.context = context;        
        this.businessController.context = context;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : contextData
     * Method to set the selected context value 
     * @return : NA
     */
    contextData : function() {
      var scope=this;
      try{
      var contextJSON={
        "name":this.context["name"],
        "selectedType":"Phone Number",       
        "selectedPhoneNumber":this.getPhoneNumberOrEmail(this.context["ContactNumbers"]),
        "PhoneUnFormatted":this.unFormatPhoneNo,
        "selectedEmail":this.getPhoneNumberOrEmail(this.context["EmailIds"]),
        "formattedDeposiAccount":this.context["formattedDepositAccount"],
        "selectedAccountNumber":this.context["default_to_account_p2p"],
        "transferLimit":"add",
        "tbxNationalID":"",
        "currency":"USD",
        "currencyUI":"$ USD"
      };
      this.businessController.setUserContextInCollection(contextJSON);     
      this.businessController.setInitialContextInCollection(this.context,contextJSON["currency"]);
      }catch(err)
        {
           var errorObj =
            {
              "level" : "ComponentController",
              "method" : "contextData",
              "error": err
            };
        scope.onError(errorObj);
        }
    },

    /**
	* @api : onBreakPointChange
 	* Gets invoked on change of breakpoint in UI
	* @return : NA
	*/
    onBreakPointChanges : function() {
      var scope=this;
      try{
        if(this.view.flxInputs.isVisible) {
          this.setManualFlowInputScreenLabelText();
        }
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onBreakPointChanges",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * showTermsConditions
     * @api : showTermsConditions
     * displays terms popup
     * @return : NA
     */
    showTermsConditions : function() {
      var scope = this;
      try{
      var form = kony.application.getCurrentForm();
      var popupObj = scope.view.flxMainPopup.clone();
      form.add(popupObj);
      popupObj.flxTermsPopup.flxTCPoup.lblTermsCondtion.setVisibility(!CommonUtilities.isMirrorLayoutEnabled());
      popupObj.flxTermsPopup.flxTCPoup.lblTermsCondtionArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxTermsPopup.centerY = "50%";
      popupObj.flxTermsPopup.zIndex = 1000;
      popupObj.flxTermsPopup.skin = 'sknBGFFFFFBdrRadius4PxShadow303030';
      popupObj.flxTermsPopup.flxTermsHeader.clipBounds = true;
      popupObj.flxTermsPopup.flxTermsHeader.top = '0%';
      popupObj.isModalContainer = true;
      popupObj.flxTermsPopup.lblPopupTitle.setActive(true);
      popupObj.flxTermsPopup.doLayout = CommonUtilities.centerPopupFlex;
      popupObj.flxTermsPopup.onKeyPress = function (eventObject, eventPayload) {
          if (eventPayload.keyCode === 27) {
            form.remove(popupObj);
            scope.view.btnTermsAndConditions.setActive(true)
          }
      };
      // popupObj.flxTermsPopup.flxTermsHeader.flxCloseImg.onTouchStart = function() {
      popupObj.flxTermsPopup.flxTermsHeader.flxCloseImg.onClick = function() {
        form.remove(popupObj);
        scope.view.btnTermsAndConditions.setActive(true);
      };
      this.view.forceLayout();
      }catch(err){
         var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showTermsConditions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : render
 	* gets invoked when collection gets updated
	* @return : NA
	*/
    render : function () {
      var scope = this;
      try{
      var dvfError = "";
      var minError="";
      this.collectionObj = ActivateP2PStore.getState();
      if(this.view.flxInputs.isVisible) {
        this.navigateToManualFlow();
      }
      else if(this.view.flxDeactivate.isVisible)
      {
        this.navigateToDeactivateFlow();
      }
      if(this.collectionObj.Collection.dvfError !== undefined) {
        dvfError = this.collectionObj.Collection.dvfError;
        scope.validateData(dvfError);
      }
      if(this.collectionObj.Collection["NationalID"] !== undefined) {
        dvfError = this.collectionObj.Collection.NationalID;
        scope.validationData(dvfError);
      }
        if(this.collectionObj.Collection["TransferLimit"] !== undefined) {
        dvfError = this.collectionObj.Collection.TransferLimit;
        scope.validationData(dvfError);
      }
      if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection["enableButton"])) {
        minError = this.collectionObj.Collection.enableButton;
        scope.validateDataMin(minError,scope.collectionObj.Collection.dvfError,this.collectionObj.Collection.NationalID,this.collectionObj.Collection.TransferLimit);
        this.enableOrDisableContinueButton(scope.collectionObj.Collection.dvfError);
      }
      if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection["UpdatePreferredP2PAccounts"])){
        scope.navigateToAcknowledgement();
      }      
      if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection["DeactivateP2P"])){
        scope.navigateToDeactivateAcknowledgement();
      }   
      }catch(err)
        {
           var errorObj =
            {
              "level" : "ComponentController",
              "method" : "render",
              "error": err
            };
        scope.onError(errorObj);
        }

    },

    /**
	* @api : navigateToActivateScreen
 	* redirects from input screen to activate screen
	* @return : NA
	*/  
    navigateToActivateScreen : function () {
      var scope=this;
      try{
      this.view.flxInputs.setVisibility(false);
      this.setActivateScreenText();
      this.disableContinueButton();
      this.view.flxActivate.setVisibility(true);
      kony.application.getCurrentForm().customheadernew.btnSkipNav.setActive(true);
      }catch(err)
        {
           var errorObj =
            {
              "level" : "ComponentController",
              "method" : "navigateToActivateScreen",
              "error": err
            };
        scope.onError(errorObj);
        }
    },

    /**
	* @api : setActivateScreenText
 	* redirects from input screen to activate screen
	* @return : NA
	*/ 
    setActivateScreenText: function()
    {
      var scope=this;
      try{
        this.view.lblHeader.text = this.businessController.getDataBasedOnDataMapping("lblHeader", this._dataMapping);     
        this.view.lblField1.text = this.businessController.getDataBasedOnDataMapping("lblField1", this._dataMapping);
        this.view.lblField2.text = this.businessController.getDataBasedOnDataMapping("lblField2", this._dataMapping);
        this.view.lblField3.text = this.businessController.getDataBasedOnDataMapping("lblField3", this._dataMapping);
        this.view.lblField4.text = this.businessController.getDataBasedOnDataMapping("lblField4", this._dataMapping);
        this.view.btnActivated.text = this.businessController.getDataBasedOnDataMapping("btnActivated", this._dataMapping);
        this.view.btnActivateCancel.text = this.businessController.getDataBasedOnDataMapping("btnActivateCancel", this._dataMapping);
        this.view.lblAgreeTermsAndConditions.text = this.businessController.getDataBasedOnDataMapping("lblAccept", this._dataMapping);
        this.view.btnTermsAndConditions.text = this.businessController.getDataBasedOnDataMapping("btnT&C", this._dataMapping);
        this.view.imgIAgree.src="uncheckedbox.png";
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setActivateScreenText",
              "error": err
            };
        scope.onError(errorObj);

      }
    },

    /**
	* @api : callActivateService
 	* invokes activate service call
	* @return : NA
	*/  
    callActivateService : function () {
      var scope=this;
      try{
      this.businessController.invokeCustomVerbforActivateP2PForUser();
      }catch(err){
         var errorObj =
            {
              "level" : "ComponentController",
              "method" : "callActivateService",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : callDeActivateService
 	* invokes deactivate service call
	* @return : NA
	*/  
    callDeactivateService : function() {
      var scope=this;
      try{
        
      this.businessController.invokeCustomVerbforDeactivateP2PForUser();
      }catch(err){
         var errorObj =
            {
              "level" : "ComponentController",
              "method" : "callDeactivateService",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : checkTermsConditionEnabled
 	* checks terms & conditions are enabled
	* @return : NA
	*/  
    checkTermsConditionEnabled :function() {
      var scope=this;
      try{
      if(this.view.imgIAgree.src==="uncheckedbox.png")
      {
        this.view.imgIAgree.src="checked_box.png";
        scope.view.flxCheckbox.accessibilityConfig = {
          "a11yLabel":"I Agree to terms and conditions",
          "a11yARIA": {
            "tabindex": 0,
            "aria-checked": "true",
            "role":"checkbox"
          }
        };
        this.enableContinueButton();
        scope.view.flxCheckbox.setActive(true);
      }
      else
      {
        this.view.imgIAgree.src="uncheckedbox.png";
        scope.view.flxCheckbox.accessibilityConfig = {
          "a11yLabel":"I Agree to terms and conditions",
          "a11yARIA": {
            "tabindex": 0,
            "aria-checked": "false",
            "role":"checkbox"
          }
        };
        this.disableContinueButton();
        scope.view.flxCheckbox.setActive(true);
      }
      }catch(err)
        {
           var errorObj =
            {
              "level" : "ComponentController",
              "method" : "checkTermsConditionEnabled",
              "error": err
            };
        scope.onError(errorObj);
        }
    },

    /**
	* @api : navigateToDeactivateAcknowledgement
 	* gets invoked when service success
	* @return : NA
	*/
    navigateToDeactivateAcknowledgement :function()
    {
     
      var scope=this;
      try{
      this.collectionObj = ActivateP2PStore.getState();
      var data=this.collectionObj.Collection["DeactivateP2P"];
      this.context["DeactivateP2P"]=data;
      if(data==="Successful")
      { 
        var ackJSON={
          "flowType":this.context.flowType,
          "name":this.collectionObj.Collection.P2PContextJSON["name"],        
          "formattedDeposiAccount":this.collectionObj.Collection.P2PContextJSON["formattedDeposiAccount"],       
          "transferLimit1":this.collectionObj.Collection.P2PContextJSON["tbxAmount1"],
          "selectedPhoneNumber":this.collectionObj.Collection.P2PContextJSON["selectedPhoneNumber"],  
          "selectedEmail":this.collectionObj.Collection.P2PContextJSON["selectedEmail"],    
          "transferLimit2":""
        };
         ackJSON["Ack"]=JSON.parse(JSON.stringify(ackJSON));
        this.setAcknowledgementData(ackJSON);
         scope.businessController.resetServiceResponse("DigitalArrangements");
        scope.businessController.resetServiceResponse("P2PContextJSON");
        scope.businessController.resetServiceResponse("ActivateP2P");
        scope.businessController.resetServiceResponse("DeactivateP2P");
      }
      else{
        scope.businessController.resetServiceResponse("DigitalArrangements");
        scope.businessController.resetServiceResponse("P2PContextJSON");
        scope.businessController.resetServiceResponse("ActivateP2P");
        scope.businessController.resetServiceResponse("DeactivateP2P");

        scope.failAckService(scope.context);
      }}catch(err)
        {
           var errorObj =
            {
              "level" : "ComponentController",
              "method" : "navigateToDeactivateAcknowledgement",
              "error": err
            };
        scope.onError(errorObj);
        }
    },

    /**
	* @api : navigateToAcknowledgement
 	* gets invoked when service success
	* @return : NA
	*/
    navigateToAcknowledgement : function()
    {
      var scope=this;
      try{
      this.collectionObj = ActivateP2PStore.getState();
      var data=this.collectionObj.Collection["UpdatePreferredP2PAccounts"];
      var failAck={};
      this.context["UpdatePreferredP2PAccounts"]=data;
     
      if(data==="Updated Successfully")
      {  
        var ackJSON={};
        ackJSON={
          "flowType":this.context.flowType,
          "name":this.collectionObj.Collection.P2PContextJSON["name"],        
          "formattedDeposiAccount":this.collectionObj.Collection.P2PContextJSON["formattedDeposiAccount"],       
          "transferLimit1":this.collectionObj.Collection.P2PContextJSON["tbxAmount1"],
          "transferLimit2":""
        };
        if(this.view.lblRadioButton1.text==="M")
        {
          ackJSON["selectedPhoneNumber"]=this.collectionObj.Collection.P2PContextJSON["selectedPhoneNumber"];
        }
        else if(this.view.lblRadioButton2.text==="M")
        {
          ackJSON["selectedEmail"]=this.collectionObj.Collection.P2PContextJSON["selectedEmail"];
        }
        else if(this.view.lblRadioButton3.text==="M")
        {
          ackJSON["tbxNationalID"]=this.collectionObj.Collection.P2PContextJSON["tbxNationalID"];
        }    
      ackJSON["Ack"]=JSON.parse(JSON.stringify(ackJSON));
        this.setAcknowledgementData(ackJSON);
         scope.businessController.resetServiceResponse("DigitalArrangements");
        scope.businessController.resetServiceResponse("P2PContextJSON");
        scope.businessController.resetServiceResponse("ActivateP2P");
        scope.businessController.resetServiceResponse("UpdatePreferredP2PAccounts");
      }
      else{
        scope.businessController.resetServiceResponse("DigitalArrangements");
        scope.businessController.resetServiceResponse("P2PContextJSON");
        scope.businessController.resetServiceResponse("ActivateP2P");
        scope.businessController.resetServiceResponse("UpdatePreferredP2PAccounts");

        scope.failAckService(scope.context);
      }}catch(err){
         var errorObj =
            {
              "level" : "ComponentController",
              "method" : "navigateToAcknowledgement",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : formatPhoneNumbe
	* @return : returns the formatted phone number
	*/
    formatPhoneNumber : function(phoneNumberStr) {
      var scope=this;
      try{
      var data = ('' + phoneNumberStr).replace(/\D/g, '');
      var phno = data.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (phno) {
        var intialCode = (phno[1] ? '+1 ' : '');
        return [intialCode, '(', phno[2], ') ', phno[3], '-', phno[4]].join('');
      }
      return phoneNumberStr;
      }catch(err){
         var errorObj =
            {
              "level" : "ComponentController",
              "method" : "formatPhoneNumber",
              "error": err
            };
        scope.onError(errorObj);
      }

      },

    /**
	* @api : getPhoneNumberOrEmail
	* @return : returns the default phone number oe email
	*/
    getPhoneNumberOrEmail : function(contactArrayList) {
      var scope=this;
      try{
      if (Array.isArray(contactArrayList)) {
        for (var index = 0; index < contactArrayList.length; index++) {
          var data = contactArrayList[index];
          var userData ="";
          if(data.Type_id === "COMM_TYPE_PHONE") 
          {
            this.unFormatPhoneNo=data.phoneNumber;
            userData=this.formatPhoneNumber(data.phoneNumber)
          }
          else{
            userData=data.Value;
          }

          if (contactArrayList.length === 1) {
            return userData;
          } else {
            if (data.isPrimary==="true") return userData;
          }
        }
      }}catch(err){
             var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getPhoneNumberOrEmail",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**     
     * Component updateAmountValue
     * To updating values by entered for amount
     */  
    updateAmountValue : function () {
      var scope = this;
      try{
      this.collectionObj = ActivateP2PStore.getState();
      var getFieldKey = scope.getMappedValueForWidget("tbxAmount1", scope._dataMapping);
      var amount = this.view.tbxAmount1.text.replace(/[^0-9\.-]+/g, "");
      amount !== "" && amount >= 1 ? this.enableContinueButton() : this.disableContinueButton();
      if(scope.view.tbxAmount1.text !== ""){scope.view.tbxAmount1.text = scope.businessController.getFormattedAmount(this._serviceParameters.getDepositAccounts.Object, "P2PContextJSON", amount, getFieldKey);}
      scope.businessController.updateP2PDetailsCollection(scope.view.tbxAmount1.text,"tbxAmount1");
      if(scope.serviceParameters.validateTransferLimit.Service!=="")
      {
        scope.checkTransferLimitService1();
      }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "updateAmountValue",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
	* @api : navigateToManualFlow
 	* prepares UI for manual flow
	* @return : NA
	*/
    navigateToManualFlow : function() { 
      var scope=this;
      try{
      this.view.tbxAmount1.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\" ";
      this.view.tbxAmount2.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\" ";

      this.contactSegment = this.businessController.getDataBasedOnDataMapping("contactTypeSegment", this._dataMapping);
      if(this.contactSegment==="true")
      {
        this.view.flxEmail.setVisibility(true);
        this.view.flxContactType.setVisibility(false);

      }
      else
      {
        this.view.flxEmail.setVisibility(false);
        this.view.flxContactType.setVisibility(true);
      }
      this.setManualFlowInputScreenLabelText();
      this.setManualFlowInputScreenValueText();
      this.initActionsOfButtons();
      this.initActionsOfTextBoxes();
      this.view.flxShowError.setVisibility(false);
      }catch(err)
        {
            var errorObj =
            {
              "level" : "ComponentController",
              "method" : "navigateToManualFlow",
              "error": err
            };
        scope.onError(errorObj);
    
        }
    },


    /**
	* @api : navigateToDeactivateFlow
 	* prepares UI for manual flow
	* @return : NA
	*/
    navigateToDeactivateFlow : function()
    {
      var scope=this;
      try{
      this.setDeactivateScreenLabelText();
      this.initActionOfDeactivateButtons();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "navigateToDeactivateFlow",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
	* @api : initActionsOfButtons
 	* Actions of buttons are initialized
	* @return : NA
	*/  
    initActionsOfButtons : function() {
      var scope = this;  
      try{
      // this.view.lblRadioButton1.onTouchEnd=this.setBasedOnContactType.bind(this,"lblRadioButton1");
      // this.view.lblRadioButton2.onTouchEnd=this.setBasedOnContactType.bind(this,"lblRadioButton2");
      // this.view.lblRadioButton3.onTouchEnd=this.setBasedOnContactType.bind(this,"lblRadioButton3");
      this.view.flxRadioButton1.onClick=this.setBasedOnContactType.bind(this,"lblRadioButton1",true);
      this.view.flxRadioButton2.onClick=this.setBasedOnContactType.bind(this,"lblRadioButton2");
      this.view.flxRadioButton3.onClick=this.setBasedOnContactType.bind(this,"lblRadioButton3");   
      this.view.tbxAmount1.onKeyUp =scope.updateAmountValue.bind(this);   
      // this.view.flxDepositAccountValue.onTouchEnd=scope.setDepositAccount.bind(scope);
      this.view.flxDepositAccountValue.onClick=scope.setDepositAccount.bind(scope);     
      this.view.btnTermsAndConditions.onClick=this.showTermsConditions.bind(this);
      // this.view.flxCurrencyLabel1.onTouchEnd=this.showSegCurrency1.bind(this);
      this.view.flxCurrencyLabel1.onClick=this.showSegCurrency1.bind(this);
      this.view.btnCancel.onClick =  this.showCancelPopup.bind(this);
      this.view.btnActivateCancel.onClick =  this.showCancelPopup.bind(this);     
      this.view.btnActivateCancel.onClick =  this.showCancelPopup.bind(this);
      this.view.btnActivate.onClick =  this.navigateToActivateScreen.bind(this);
      this.view.btnActivated.onClick =this.callActivateService.bind(this);
      // this.view.flxCheckbox.onTouchStart=this.checkTermsConditionEnabled.bind(this);
      this.view.flxCheckbox.onClick=this.checkTermsConditionEnabled.bind(this);
      // this.view.flxEmailDefault.onTouchEnd=this.showContactTypeDropdown.bind(this);
      this.view.flxEmailDefault.onClick=this.showContactTypeDropdown.bind(this);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "initActionsOfButtons",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
	* @api : initActionOfDeactivateButtons
 	* Actions of buttons are initialized
	* @return : NA
	*/  
    initActionOfDeactivateButtons : function()
    {
      var scope=this;
      try{
      this.view.btnDeactivateButtons.onClick=this.callDeactivateService.bind(this);
      this.view.btnDeactivateCancel.onClick =  this.showCancelPopup.bind(this);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "initActionOfDeactivateButtons",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
	* @api : initActionsOfTextBoxes
 	* Actions of text boxes  are initialized
	* @return : NA
	*/
    initActionsOfTextBoxes : function () {
      var scope=this;
      try{
      this.performValidation();
      this.performMinimumDataFillValidation();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "initActionsOfTextBoxes",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
  * @api : setDeactivateScreenLabelText
  * sets the data in labels in manual flow input screen
  * @return : NA
  */
    setDeactivateScreenLabelText : function()
    {
      var scope=this;
      try{
      this.view.lblHeader.text = this.businessController.getDataBasedOnDataMapping("lblHeaderDeactivate", this._dataMapping);     
      this.view.lblField11.text = this.businessController.getDataBasedOnDataMapping("lblField11", this._dataMapping);
      this.view.lblField12.text = this.businessController.getDataBasedOnDataMapping("lblField12", this._dataMapping);
      this.view.lblField13.text = this.businessController.getDataBasedOnDataMapping("lblField13", this._dataMapping);
      this.view.lblField14.text = this.businessController.getDataBasedOnDataMapping("lblField14", this._dataMapping);
      this.view.btnDeactivateButtons.text = this.businessController.getDataBasedOnDataMapping("btnDectivated", this._dataMapping);
      this.view.btnDeactivateCancel.text = this.businessController.getDataBasedOnDataMapping("btnDeactivateCancel", this._dataMapping);
      this.view.lblCancel.text=this.businessController.getDataBasedOnDataMapping("lblDeactivateCancelMsg", this._dataMapping);
      }catch(err)
        {
            var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDeactivateScreenLabelText",
              "error": err
            };
        scope.onError(errorObj);
    
        }
    },

    /**
  * @api : setManualFlowInputScreenLabelText
  * sets the data in labels in manual flow input screen
  * @return : NA
  */
    setManualFlowInputScreenLabelText : function() {
      var scope=this;
      try{
      this.view.lblActivateHeader.text = this.businessController.getDataBasedOnDataMapping("lblActivateHeader", this._dataMapping);
      this.view.lblName.text = this.businessController.getDataBasedOnDataMapping("lblName", this._dataMapping);
      this.view.lblContactType.text = this.businessController.getDataBasedOnDataMapping("lblContactType", this._dataMapping);
      if(this.contactSegment==="true")
      {
        this.view.lblEmail.text = this.businessController.getDataBasedOnDataMapping("lblContactType", this._dataMapping);

      }
      else{
        if(this.view.lblRadioButton1.text==="M"){
          this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblPhone", this._dataMapping);
        }
        if(this.view.lblRadioButton2.text==="M"){
          this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblEmail", this._dataMapping);
        }
        if(this.view.lblRadioButton3.text==="M"){
          this.view.lblNationalID.text = this.businessController.getDataBasedOnDataMapping("lblNationalID", this._dataMapping);
        }
      }
      this.view.lblDepositAccount.text = this.businessController.getDataBasedOnDataMapping("lblDepositAccount", this._dataMapping);
      this.view.lblTransferLimit1.text = this.businessController.getDataBasedOnDataMapping("lblTransferLimit", this._dataMapping);
      this.view.lblTransferLimit2.text = this.businessController.getDataBasedOnDataMapping("lblTransferLimit2", this._dataMapping);
      this.view.btnActivate.text = this.businessController.getDataBasedOnDataMapping("btnActivate", this._dataMapping);
      this.view.btnCancel.text = this.businessController.getDataBasedOnDataMapping("btnCancel", this._dataMapping);
      this.view.lblCancel.text=this.businessController.getDataBasedOnDataMapping("lblActivateCancelMsg", this._dataMapping);
      }catch(err)
        {
            var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setManualFlowInputScreenLabelText",
              "error": err
            };
        scope.onError(errorObj);
    
        }

    },

    /**
  * @api : setManualFlowInputScreenValueText
  * sets the data in labels in manual flow input screen
  * @return : NA
  */
    setManualFlowInputScreenValueText : function() {
      var scope=this;  
      try{
      this.view.tbxNameValue.text = this.businessController.getDataBasedOnDataMapping("tbxNameValue", this._dataMapping);
      this.view.tbxNameValue.setEnabled(false);     
      this.view.lblSelectedAccount.text=this.businessController.getDataBasedOnDataMapping("lblSelectedAccount", this._dataMapping);
      if(this.contactSegment==="true"){
        this.view.lblSelectedEmail.text = this.collectionObj.Collection.P2PContextJSON["selectedType"];
      }
      else{
        if(this.view.lblRadioButton1.text==="M"){
          this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedValue", this._dataMapping);
        }
        if(this.view.lblRadioButton2.text==="M"){
          this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedEmail", this._dataMapping);
        }    
      }
      this.view.lblSelectedCurrency1.text=this.businessController.getDataBasedOnDataMapping("currencyUI", this._dataMapping);
      this.view.lblSelectedAccount.text !== "" ? this.enableContinueButton() : this.disableContinueButton();
      }catch(err)
        {
            var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setManualFlowInputScreenValueText",
              "error": err
            };
        scope.onError(errorObj);
    
        }
    },

    /**
  * @api : setContactTypeDropdown
  * invoke function based on contact type selection
  * @return : NA
  */
    setContactTypeDropdown:function()
    {
      var scope=this;
      try{
      if(this.view.lblSelectedEmail.text==="Phone Number")
      {
        this.selectOption1();
      }
      else if(this.view.lblSelectedEmail.text==="Email")
      {
        this.selectOption2();
      }
      else if(this.view.lblSelectedEmail.text==="National ID")
      {
        this.selectOption3();
      }
      else if(this.view.lblSelectedEmail.text==="Tax ID")
      {
        this.selectOption4();
      }
      else if(this.view.lblSelectedEmail.text==="ABN Number")
      {
        this.selectOption5();
      }
      }catch(err)
        {
            var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeDropdown",
              "error": err
            };
        scope.onError(errorObj);
    
        }
    },

    /**
  * @api : selectOption1
  * invoked when contact type selection 1
  * @return : NA
  */
    selectOption1 :function(){    
      var scope=this;
      try{
      this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblPhone", this._dataMapping);
      this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedValue", this._dataMapping);
      this.view.flxPhone.setVisibility(true);
      this.view.flxNationalID.setVisibility(false);
      this.view.flxDropdownList.setVisibility(false);
      this.view.flxDropdown.setEnabled(false);
      this.view.flxDropdown.skin="skndisabled";    
      if(this.context.ContactNumbers.length>1)
      {     
        this.view.flxDropdown.setEnabled(true);
        this.view.flxDropdown.skin="ICSknFlxffffffBordere3e3e31pxRadius2px";
        this.view.imgDropdownIcon.setVisibility(true);
        // scope.view.imgDropdownIcon.onTouchStart   =function()
        scope.view.flxDropdown.onClick = function()
        {
          scope.view.flxDropdown.accessibilityConfig = {
            'a11yLabel':'Currently selected'+scope.view.lblPhone.text +'.Click to show list of Registered Phone Number',
            "a11yARIA": {
              "aria-expanded": true,
              "role": "button",
              "tabindex": 0
            },
          }
          scope.editFlag="yes";    
          scope.setContactTypeSegment("ContactNumbers");
        };       
      }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectOption1",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
  * @api : selectOption2
  * invoked when contact type selection 2
  * @return : NA
  */
    selectOption2 :function(){   
      var scope=this;
      try{
      this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblEmail", this._dataMapping);
      this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedEmail", this._dataMapping);
      this.view.flxPhone.setVisibility(true);
      this.view.flxNationalID.setVisibility(false);
      this.view.flxDropdownList.setVisibility(false);
      this.view.flxDropdown.setEnabled(false);
      this.view.flxDropdown.skin="skndisabled";   
      if(this.context.EmailIds.length>1)
      {
        this.view.flxDropdown.setEnabled(true);
        this.view.flxDropdown.skin="ICSknFlxffffffBordere3e3e31pxRadius2px";
        this.view.imgDropdownIcon.setVisibility(true); 
        // scope.view.imgDropdownIcon.onTouchStart   =function()
        scope.view.flxDropdown.onClick = function()
        {
          scope.view.flxDropdown.accessibilityConfig = {
            'a11yLabel':'Currently selected'+scope.view.lblPhone.text +'.Click to show list of Registered Phone Number',
            "a11yARIA": {
              "aria-expanded": true,
              "role": "button",
              "tabindex": 0
            },
          }
          scope.editFlag="yes";       
          scope.setContactTypeSegment("EmailIds");
        }; 
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectOption2",
              "error": err
            };
        scope.onError(errorObj);
    
      }
    },

    /**
  * @api : selectOption3
  * invoked when contact type selection 3
  * @return : NA
  */
    selectOption3 :function(){  
      var scope=this;
      try{
      this.view.lblNationalID.text = this.businessController.getDataBasedOnDataMapping("lblNationalID", this._dataMapping);
      this.view.tbxNationalID.text = this.businessController.getDataBasedOnDataMapping("tbxNationalID", this._dataMapping);
      this.view.flxPhone.setVisibility(false);
      this.view.flxNationalID.setVisibility(true);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectOption3",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : selectOption4
  * invoked when contact type selection 4
  * @return : NA
  */
    selectOption4 :function(){   
      var scope=this;
      try{
      this.view.lblNationalID.text = this.businessController.getDataBasedOnDataMapping("lblTaxID", this._dataMapping);
      this.view.tbxNationalID.text = this.businessController.getDataBasedOnDataMapping("tbxNationalID", this._dataMapping);
      this.view.flxPhone.setVisibility(false);
      this.view.flxNationalID.setVisibility(true);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectOption4",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : selectOption5
  * invoked when contact type selection 5
  * @return : NA
  */
    selectOption5 :function(){   
      var scope=this;
      try{
      this.view.lblNationalID.text = this.businessController.getDataBasedOnDataMapping("lblABNNumber", this._dataMapping);
      this.view.tbxNationalID.text = this.businessController.getDataBasedOnDataMapping("tbxNationalID", this._dataMapping);
      this.view.flxPhone.setVisibility(false);
      this.view.flxNationalID.setVisibility(true);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectOption5",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
  * @api : setBasedOnContactType
  * invoke function based on contact type selection
  * @return : NA
  */
    setBasedOnContactType : function(selectedOption, radioOnclick = false) {
      var scope=this;   
      this.view.flxShowError.setVisibility(false);
      try{
      if(selectedOption==="lblRadioButton1")
      {
        this.setContactTypeOption1();
        radioOnclick ? this.view.flxRadioButton1.setActive(true) : null;  
      }
      else if(selectedOption==="lblRadioButton2")
      {
        this.selectedContact = "yes";
        this.setContactTypeOption2();
      }
      else if(selectedOption==="lblRadioButton3")
      {
       
        this.selectedContact = "yes";
        this.setContactTypeOption3();    
      }
      this.updateAmountValue();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setBasedOnContactType",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setContactTypeOption1
  * invoked when contact type selection 1
  * @return : NA
  */
    setContactTypeOption1 :function(){
      var scope=this;
      try{
      this.view.lblRadioButton1.text = "M";
      this.view.lblRadioButton1.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
      this.view.lblRadioButton2.text = "L";
      this.view.lblRadioButton2.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblRadioButton3.text = "L";
      this.view.lblRadioButton3.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblPhone", this._dataMapping);
      this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedValue", this._dataMapping);
      this.view.flxPhone.setVisibility(true);
      this.view.flxNationalID.setVisibility(false);
      this.view.flxDropdownList.setVisibility(false);
      this.view.flxDropdown.setEnabled(false);
      this.view.flxDropdown.skin="skndisabled";
      this.view.flxRadioButton1.accessibilityConfig = {
        "a11yARIA": {
            "aria-checked": true,
            "aria-labelledby": "lblRadioValue1",
            "role": "radio",
            "tabindex": 0
        },
    }
    this.view.flxRadioButton2.accessibilityConfig = {
        "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue2",
            "role": "radio",
            "tabindex": 0
        },
    }
    this.view.flxRadioButton3.accessibilityConfig = {
        "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue3",
            "role": "radio",
            "tabindex": 0
        },
      }    
      if(!kony.sdk.isNullOrUndefined(this.context.ContactNumbers.length)&& this.context.ContactNumbers.length>1)
      {     
        scope.view.imgDropdownIcon.src="arrow_down.png";
        this.view.flxDropdown.setEnabled(true);
        this.view.flxDropdown.skin="ICSknFlxffffffBordere3e3e31pxRadius2px";
        this.view.imgDropdownIcon.setVisibility(true);
        scope.view.flxDropdown.accessibilityConfig = {
          'a11yLabel':'Currently selected'+scope.view.lblPhone.text +'.Click to show list of Registered Phone Number',
          "a11yARIA": {
            "aria-expanded": false,
            "role": "button",
            "tabindex": 0
          },
        }
        // scope.view.imgDropdownIcon.onTouchStart   =function()
        scope.view.flxDropdown.onClick = function()
        {
          if(scope.view.imgDropdownIcon.src==="dropdown_collapse.png")
          {
            scope.view.imgDropdownIcon.src="arrow_down.png";
            scope.view.flxDropdownList.setVisibility(false); 
          }
          else
          {
            scope.view.flxDropdown.accessibilityConfig = {
              'a11yLabel':'Currently selected'+scope.view.lblPhone.text +'.Click to show list of Registered Phone Number',
              "a11yARIA": {
                "aria-expanded": true,
                "role": "button",
                "tabindex": 0
              },
            }
            scope.view.imgDropdownIcon.src="dropdown_collapse.png"
            scope.editFlag="yes";       
            scope.setContactTypeSegment("ContactNumbers");
            scope.view.flxDropdownList.setVisibility(true); 
          }

        };       
      }else{
        scope.view.flxDropdown.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1,
            "tagName":"div"
          },
        }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeOption1",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setContactTypeOption2
  * invoked when contact type selection 2
  * @return : NA
  */
    setContactTypeOption2 :function(){
      var scope=this;
      try{
      this.view.lblRadioButton1.text = "L";
      this.view.lblRadioButton1.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblRadioButton2.text = "M";
      this.view.lblRadioButton2.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
      this.view.lblRadioButton3.text = "L";
      this.view.lblRadioButton3.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblPhone.text = this.businessController.getDataBasedOnDataMapping("lblEmail", this._dataMapping);
      this.view.lblSelectedValue.text = this.businessController.getDataBasedOnDataMapping("lblSelectedEmail", this._dataMapping);
      this.view.flxPhone.setVisibility(true);
      this.view.flxNationalID.setVisibility(false);
      this.view.flxDropdownList.setVisibility(false);
      this.view.flxDropdown.setEnabled(false);
      this.view.flxDropdown.skin="skndisabled";
        this.view.flxRadioButton2.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "aria-labelledby": "lblRadioValue2",
            "role": "radio",
            "tabindex": 0
          },
        }
        this.view.flxRadioButton1.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue1",
            "role": "radio",
            "tabindex": 0
          },
        }
        this.view.flxRadioButton3.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue3",
            "role": "radio",
            "tabindex": 0
          },
        }
      this.view.flxRadioButton2.setActive(true);   
      if(this.context.EmailIds.length>1)
      {
        scope.view.imgDropdownIcon.src="arrow_down.png";
        this.view.flxDropdown.setEnabled(true);
        this.view.flxDropdown.skin="ICSknFlxffffffBordere3e3e31pxRadius2px";
        this.view.imgDropdownIcon.setVisibility(true); 
        // scope.view.imgDropdownIcon.onTouchStart   =function()
        scope.view.flxDropdown.onClick = function()
        {
          if(scope.view.imgDropdownIcon.src==="dropdown_collapse.png")
          {
            scope.view.imgDropdownIcon.src="arrow_down.png";
            scope.view.flxDropdownList.setVisibility(false); 
          }
          else
          {
            scope.view.flxDropdown.accessibilityConfig = {
              'a11yLabel':'Currently selected'+scope.view.lblPhone.text +'.Click to show list of Registered Phone Number',
              "a11yARIA": {
                "aria-expanded": true,
                "role": "button",
                "tabindex": 0
              },
            }
            scope.view.imgDropdownIcon.src="dropdown_collapse.png"
            scope.editFlag="yes";       
            scope.setContactTypeSegment("EmailIds");
            scope.view.flxDropdownList.setVisibility(true); 
          }

        }; 
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeOption2",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setContactTypeOption3
  * invoked when contact type selection 3
  * @return : NA
  */
    setContactTypeOption3 :function(){
      var scope=this;
      try{
      this.view.lblRadioButton1.text = "L";
      this.view.lblRadioButton1.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblRadioButton2.text = "L";
      this.view.lblRadioButton2.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
      this.view.lblRadioButton3.text = "M";
      this.view.lblRadioButton3.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
      this.view.lblNationalID.text = this.businessController.getDataBasedOnDataMapping("lblNationalID", this._dataMapping);
      this.view.tbxNationalID.text = this.businessController.getDataBasedOnDataMapping("tbxNationalID", this._dataMapping);
      this.view.flxPhone.setVisibility(false);
      this.view.flxNationalID.setVisibility(true);
        this.view.flxRadioButton3.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": true,
            "aria-labelledby": "lblRadioValue3",
            "role": "radio",
            "tabindex": 0
          },
        }
        this.view.flxRadioButton1.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue1",
            "role": "radio",
            "tabindex": 0
          },
        }
        this.view.flxRadioButton2.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblRadioValue2",
            "role": "radio",
            "tabindex": 0
          },
        }
        this.view.flxRadioButton3.setActive(true);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeOption3",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    segKeyPressed: function (eventObject, eventPayload, context) {
      var scopeObj = this;
      if (eventPayload.keyCode === 27) {
        if (context.widgetInfo.id === 'segDropdownList') {
          scopeObj.view.flxDropdownList.setVisibility(false);
          scopeObj.view.flxDropdown.imgDropdownIcon.src = "arrow_down.png";
          scopeObj.view.flxDropdown.accessibilityConfig = {
            'a11yLabel':'Currently selected'+scopeObj.view.lblPhone.text +'.Click to show list of Registered Phone Number',
            a11yARIA: {
              "aria-expanded": "flase",
              "role": "button",
              "tabindex": 0
            }
          };
          scopeObj.view.flxDropdown.setActive(true);
        }
        if (context.widgetInfo.id === 'segDropdownCurrencyList1') {
          scopeObj.view.flxCurrencyDropdown1.setVisibility(false);
          scopeObj.view.imgCurrencyDropdownIcon1.src = "arrow_down.png";
          scopeObj.view.flxCurrencyLabel1.accessibilityConfig = {
            "a11yLabel":'Transfer Limit. Currently selected '+ scopeObj.view.lblSelectedCurrency1.text +'. Click to show list of currencies.', 
            "a11yARIA": {
              "aria-expanded": false,
              "role": "button",
              "tabindex": 0
            }
          };
          scopeObj.view.flxCurrencyLabel1.setActive(true);
        }
      }
      else if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
        eventPayload.preventDefault();
        if (context.rowIndex === 0 && context.sectionIndex === 0) {
          if (context.widgetInfo.id === 'segDropdownList') {
            scopeObj.view.flxDropdownList.setVisibility(false);
            scopeObj.view.flxDropdown.imgDropdownIcon.src = "arrow_down.png";
            scopeObj.view.flxDropdown.accessibilityConfig = {
              'a11yLabel':'Currently selected'+scopeObj.view.lblPhone.text +'.Click to show list of Registered Phone Number',
              a11yARIA: {
                "aria-expanded": "flase",
                "role": "button",
                "tabindex": 0
              }
            };
            scopeObj.view.flxDropdown.setActive(true);
          }
          if (context.widgetInfo.id === 'segDropdownCurrencyList1') {
            scopeObj.view.flxCurrencyDropdown1.setVisibility(false);
            scopeObj.view.imgCurrencyDropdownIcon1.src = "arrow_down.png";
            scopeObj.view.flxCurrencyLabel1.accessibilityConfig = {
              "a11yLabel":'Transfer Limit. Currently selected '+ scopeObj.view.lblSelectedCurrency1.text +'. Click to show list of currencies.',
              a11yARIA: {
                "aria-expanded": false,
                "role": "button",
                "tabindex": 0
              }
            };
            scopeObj.view.flxCurrencyLabel1.setActive(true);
          }
        }
        else if (context.rowIndex > 0) {
          if (context.widgetInfo.id === 'segDropdownList')
            scopeObj.view.segDropdownList.setActive((context.rowIndex - 1), 0, "flxContactTypes");
          if (context.widgetInfo.id === 'segDropdownCurrencyList1')
            scopeObj.view.segDropdownCurrencyList1.setActive((context.rowIndex - 1), 0, "flxDropdownRecord");
        }
      } else if (context.rowIndex === context.widgetInfo.data.length - 1 && eventPayload.keyCode === 9) {
        if (context.widgetInfo.id === 'segDropdownList') {
          scopeObj.view.flxDropdownList.setVisibility(false);
          eventPayload.preventDefault();
          scopeObj.view.flxDropdown.imgDropdownIcon.src = "arrow_down.png";
          scopeObj.view.flxDropdown.accessibilityConfig = {
            'a11yLabel':'Currently selected'+scopeObj.view.lblPhone.text +'.Click to show list of Registered Phone Number',
            a11yARIA: {
              "aria-expanded": "flase",
              "role": "button",
              "tabindex": 0
            }
          };
          scopeObj.view.flxDropdown.setActive(true);
        }
        if (context.widgetInfo.id === 'segDropdownCurrencyList1') {
          scopeObj.view.flxCurrencyDropdown1.setVisibility(false);
          scopeObj.view.imgCurrencyDropdownIcon1.src = "arrow_down.png";
          eventPayload.preventDefault();
          scopeObj.view.flxCurrencyLabel1.accessibilityConfig = {
            "a11yLabel":'Transfer Limit. Currently selected '+ scopeObj.view.lblSelectedCurrency1.text +'. Click to show list of currencies.',
            a11yARIA: {
              "aria-expanded": false,
              "role": "button",
              "tabindex": 0
            }
          };
          scopeObj.view.flxCurrencyLabel1.setActive(true);

        }
      }
    },

    /**
	* @api : setContactTypeSegment
 	* sets the biller data in segment
	* @return : NA
	*/
    setContactTypeSegment : function(contactType) {
      var scope = this; 
      try{
      var contactData = [];
      var segmentData = [];
      var segRecord,lblFieldMapping;

      if(this.collectionObj.Collection.ActivateP2P !== undefined && this.editFlag==="yes") {
        contactData = this.collectionObj.Collection.ActivateP2P[contactType];
        if(contactData.length > 0) {
          this.contactList = contactData;
          var recordsLength = contactData.length;       
          lblFieldMapping=this.setContactTypeSegmentDataMapping();        
          for(var i = 0; i < recordsLength ;i++) {
            var contactRecord = contactData[i];
            if(this.view.lblRadioButton1.text==="M")
            {
              contactRecord.phoneNumber=this.formatPhoneNumber(contactRecord.phoneNumber);
              if(contactRecord.phoneNumber===(this.collectionObj.Collection.P2PContextJSON.selectedPhoneNumber)){
                segRecord = {
                  "flxContactTypes": {
                    "accessibilityConfig": {
                      "a11yARIA": {
                        "tabindex": 0
                      }
                    },
                    "onKeyPress": this.segKeyPressed
                  },
                  "lblsegmentPhone" : contactRecord[lblFieldMapping],
                  "flxPrimary":{ 
                    "isVisible": true
                  }
                };
              }
              else{
                segRecord = {
                  "flxContactTypes": {
                    "accessibilityConfig": {
                      "a11yARIA": {
                        "tabindex": 0
                      }
                    },
                    "onKeyPress": this.segKeyPressed
                  },
                  "lblsegmentPhone" : contactRecord[lblFieldMapping],
                  "flxPrimary":{ 
                    "isVisible": false
                  }
                };
              }
            }
            else
            {
              if(contactRecord.Value===this.view.lblSelectedValue.text)
              {
                segRecord = {
                  "flxContactTypes": {
                    "accessibilityConfig": {
                      "a11yARIA": {
                        "tabindex": 0
                      }
                    },
                    "onKeyPress": this.segKeyPressed
                  },
                  "lblsegmentEmail" : contactRecord[lblFieldMapping],
                  "flxPrimary":{ 
                    "isVisible": true
                  }
                };
              }
              else{
                segRecord = {
                  "flxContactTypes": {
                    "accessibilityConfig": {
                      "a11yARIA": {
                        "tabindex": 0
                      }
                    },
                    "onKeyPress": this.segKeyPressed
                  },
                  "lblsegmentEmail" : contactRecord[lblFieldMapping],
                  "flxPrimary":{ 
                    "isVisible": false
                  }
                };
              }
            }
            segmentData.push(segRecord);
          } 
        }
      }
      this.view.segDropdownList.setData(segmentData);
      scope.view.flxDropdownList.setVisibility(true);   
      this.view.forceLayout();
      this.view.segDropdownList.onRowClick = function() {
        scope.view.imgDropdownIcon.src="arrow_down.png";
        let rowindex =scope.view.segDropdownList.selectedRowIndex[1];
        let data = scope.view.segDropdownList.data[rowindex];
        scope.updateContactTypeDetails(data);
        scope.view.flxDropdownList.setVisibility(false);
        scope.view.flxDropdown.accessibilityConfig = {
          'a11yLabel':'Currently selected'+scopeObj.view.lblPhone.text +'.Click to show list of Registered Phone Number',
          "a11yARIA": {
            "aria-expanded": false,
            "role": "button",
            "tabindex": 0
          },
        },
        scope.view.flxDropdown.setActive(true);   
      };
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeSegment",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setContactTypeSegmentDataMapping
  * invoked when contact type selection 1
  * @return : NA
  */
    setContactTypeSegmentDataMapping : function() {
      var scope=this;
      var segRecord,lblFieldMapping;
      try{
      if(this.view.lblRadioButton1.text==="M")
      {
        lblFieldMapping  = this.getMappedValueForWidget("lblsegmentPhone", this._dataMapping);
        this.view.segDropdownList.widgetDataMap = {
          "flxContactTypes":"flxContactTypes",
          "lblListValue" : "lblsegmentPhone",
          "flxPrimary":"flxPrimary",
          "lblPrimary":"lblPrimary"
        };
      }
      else
      {
        lblFieldMapping  = this.getMappedValueForWidget("lblsegmentEmail", this._dataMapping);
        this.view.segDropdownList.widgetDataMap = {
          "flxContactTypes":"flxContactTypes",
          "lblListValue" : "lblsegmentEmail",
          "flxPrimary":"flxPrimary",
          "lblPrimary":"lblPrimary"
        };
      }
      return lblFieldMapping;
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContactTypeSegmentDataMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },


    /**
  * @api : setDepositAccount
  * invoked when selected deposit account
  * @return : NA
  */  
    setDepositAccount: function() {
      var scope=this;
      try{
      if(this.view.imgDepositAccountDropdownIcon.src==="dropdown_collapse.png")
      {
        this.view.imgDepositAccountDropdownIcon.src="arrow_down.png";
        scope.view.flxDepositAccountDropdown.setVisibility(false); 
      }
      else
      {
        this.view.imgDepositAccountDropdownIcon.src="dropdown_collapse.png"
        this.performDataMapping();
        this.view.flxDepositAccountDropdown.setVisibility(true);
        this.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": this.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ this.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": true,
            "role": "button",
            "tabindex": 0
          },
        }
        this.view.flxDepositAccountValue.setActive(true);
      }
      this.view.segDepositAccountList.onRowClick = function() {
        
         var selectedData = scope.view.segDepositAccountList.selectedRowItems;  
      var selectedAccountName = selectedData[0].lblName;
      var selectedDepositAccount = selectedData[0].selectedAccountNumber;
       
        scope.updateDepositAccountDetails(selectedAccountName,selectedDepositAccount);
        scope.view.flxDepositAccountDropdown.setVisibility(false);  
        scope.view.imgDepositAccountDropdownIcon.src="arrow_down.png";
        scope.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scope.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scope.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        }
        scope.view.flxDepositAccountValue.setActive(true);
      }}
      catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDepositAccount",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : showContactTypeDropdown
  * invoked when to show ContactTypeDropdown
  * @return : NA
  */        
    showContactTypeDropdown :function() {
      var scope = this;
      try{
      if(this.view.imgDropdownIconEmail.src==="dropdown_collapse.png")
      {
        this.view.imgDropdownIconEmail.src="arrow_down.png";
        scope.view.flxDropdownEmail.setVisibility(false); 
      }
      else
      {
        this.view.imgDropdownIconEmail.src="dropdown_collapse.png";     
        this.view.flxDropdownEmail.setVisibility(true); 
      }     
      var dataMapping = this.dataMapping;
      for(var key in dataMapping){
        if(key === "segDropdownContactType"){
          var widgets = dataMapping[key];
          for(var key1 in widgets){
            if(key1==="segmentUI")
              var segData = scope.getSegmentDataCurrencyMapping(widgets,key1);
          }
        }
      }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showContactTypeDropdown",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : showSegCurrency1
  * invoked when currency selection 1
  * @return : NA
  */        
    showSegCurrency1 :function() {
      var scope = this;   
      try{
      if(this.view.imgCurrencyDropdownIcon1.src==="dropdown_collapse.png")
      {
        this.view.imgCurrencyDropdownIcon1.src="arrow_down.png";
        scope.view.flxCurrencyDropdown1.setVisibility(false); 
      }
      else
      {
        this.view.imgCurrencyDropdownIcon1.src="dropdown_collapse.png";     
        this.view.flxCurrencyDropdown1.setVisibility(true);
        this.view.flxCurrencyLabel1.accessibilityConfig ={
          "a11yLabel":'Transfer Limit. Currently selected '+ this.view.lblSelectedCurrency1.text +'. Click to show list of currencies.',
          "a11yARIA" :{
            "tabindex": 0,
            "aria-expanded":true,
            "role":"button"
          }
        };
        this.view.flxCurrencyLabel1.setActive(true);
      }     
      var dataMapping = this.dataMapping;
      for(var key in dataMapping){
        if(key === "segDropdownCurrencyList1"){
          var widgets = dataMapping[key];
          for(var key1 in widgets){
            if(key1==="segmentUI")
              var segData = scope.getSegmentDataCurrencyMapping(widgets,key1);
          }
        }
      }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showSegCurrency1",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : getSegmentDataCurrencyMapping
  * invoked when currency selection 1
  * @return : NA
  */     
    getSegmentDataCurrencyMapping : function(segDataJSON,segId) {
      var scope = this;
      try{
      var segData = [];    
      var segMasterDataToken = segDataJSON.segmentMasterData;
      segMasterDataToken = segMasterDataToken.split(".");
      if(segMasterDataToken[0].indexOf("Collection") !== -1) {
        var segMasterData = [];
        var key = segMasterDataToken[1].replace("}","");
        if(this.collectionObj.Collection[key]){
          segMasterData = this.collectionObj.Collection[key]; 
        }
        var currencyArray = (segDataJSON.segmentUI.lblListValue).split(',');
        for(var i = 0; i < currencyArray.length; i++) {
          currencyArray[i] = currencyArray[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }
        // var currencyList=[];
        // for(var j = 0; j < currencyArray.length;j++){
        //   var currencyArr={};
        //   currencyArr["lblListValue"] =currencyArray[j];
        //   currencyList.push(currencyArr);          
        // }
        var widgetMap = {
          "flxDropdownRecord":"flxDropdownRecord",
          "lblListValue":"lblListValue"
        };
        var segData = currencyArray.map(function (dataItem) {
          return{
            "flxDropdownRecord": {
              "accessibilityConfig": {
                "a11yARIA": {
                  "tabindex": 0
                }
              },
              "onKeyPress": scope.segKeyPressed
            },
            "lblListValue": {
              "text": dataItem,
              "accessibilityConfig": {
                "a11yARIA": {
                  "tabindex": -1
                }
              }
            }
          };
        });
        this.view.segDropdownCurrencyList1.widgetDataMap = widgetMap;
        this.view.segDropdownCurrencyList2.widgetDataMap = widgetMap;
        this.view.segEmaildropdown.widgetDataMap=widgetMap;
        
        if(this.view.flxCurrencyDropdown1.isVisible)
        {
          this.view.segDropdownCurrencyList1.onRowClick = this.selectCurrency1.bind(this);
          // this.view.segDropdownCurrencyList1.setData(currencyList);
          this.view.segDropdownCurrencyList1.setData(segData);
        }
       else if(this.view.flxDropdownEmail.isVisible)
        {
          this.view.segEmaildropdown.onRowClick = this.selectContactTypeDropdown.bind(this);
          this.view.segEmaildropdown.setData(currencyList);
        }
        else
        {
          this.view.segDropdownCurrencyList2.onRowClick = this.selectCurrency2.bind(this);
          this.view.segDropdownCurrencyList2.setData(currencyList);         
        }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentDataCurrencyMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : selectContactTypeDropdown
  * invoked when select ContactTypeDropdown
  * @return : NA
  */  
    selectContactTypeDropdown: function() {
      var scope = this;
      try{
      this.view.imgDropdownIconEmail.src="arrow_down.png";
      this.view.flxDropdownEmail.setVisibility(false);
      var segmentData = JSON.parse(JSON.stringify(scope.view.segEmaildropdown.data));
      var selectedData = scope.view.segEmaildropdown.selectedRowItems;  
      var selectedRow = scope.view.segEmaildropdown.selectedRowIndex[1]; 
      scope.view.segEmaildropdown.setData(segmentData);       
      scope.view.segEmaildropdown.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblListValue;
      var updateCurrency;

      this.view.flxDropdownEmail.setVisibility(false);
      scope.businessController.updateP2PDetailsCollection(updateOption,"selectedType"); 
      this.view.lblSelectedEmail.text=updateOption;
      this.setContactTypeDropdown();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectContactTypeDropdown",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
  * @api : selectCurrency1
  * invoked when currency selection 1
  * @return : NA
  */  
    selectCurrency1: function() {
      var scope = this;
      try{
      this.view.imgCurrencyDropdownIcon1.src="arrow_down.png";
      this.view.flxCurrencyDropdown1.setVisibility(false);
      var segmentData = JSON.parse(JSON.stringify(scope.view.segDropdownCurrencyList1.data));
      var selectedData = scope.view.segDropdownCurrencyList1.selectedRowItems;  
      var selectedRow = scope.view.segDropdownCurrencyList1.selectedRowIndex[1]; 
      scope.view.segDropdownCurrencyList1.setData(segmentData);       
      scope.view.segDropdownCurrencyList1.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblListValue.text;
      var updateCurrency;
      if(updateOption.includes(" "))
      {
        updateCurrency=updateOption.split(" ");
        updateCurrency=updateCurrency[1];
      }
      this.view.flxCurrencyDropdown1.setVisibility(false);
      scope.businessController.updateP2PDetailsCollection(updateCurrency,"currency"); 
      scope.businessController.updateP2PDetailsCollection(updateOption,"currencyUI"); 
      scope.businessController.storeInCollection(updateCurrency,"segCurrency1", this._dataMapping);
      scope.view.flxCurrencyLabel1.accessibilityConfig = {
        "a11yLabel":'Transfer Limit. Currently selected '+ scope.view.lblSelectedCurrency1.text +'. Click to show list of currencies.',
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "tabindex": 0
        }
      };
      scope.view.flxCurrencyLabel1.setActive(true);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectCurrency1",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : showSegCurrency2
  * invoked when currency selection 2
  * @return : NA
  */  
    showSegCurrency2 :function() {
      var scope = this;   
      try{
      if(this.view.imgCurrencyDropdownIcon2.src==="dropdown_collapse.png")
      {
        this.view.imgCurrencyDropdownIcon2.src="arrow_down.png";
        scope.view.flxCurrencyDropdown2.setVisibility(false); 
      }
      else
      {
        this.view.imgCurrencyDropdownIcon2.src="dropdown_collapse.png";     
        this.view.flxCurrencyDropdown2.setVisibility(true); 
      }     

      var dataMapping = this.dataMapping;
      for(var key in dataMapping){
        if(key === "segDropdownCurrencyList2"){
          var widgets = dataMapping[key];
          for(var key1 in widgets){
            if(key1==="segmentUI")
              var segData = scope.getSegmentDataCurrencyMapping(widgets,key1);
          }
        }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showSegCurrency2",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : selectCurrency2
  * invoked when currency selection 2
  * @return : NA
  */  
    selectCurrency2: function() {
      var scope = this;
      try{
      this.view.imgCurrencyDropdownIcon2.src="arrow_down.png";
      this.view.flxCurrencyDropdown2.setVisibility(false);
      var segmentData = JSON.parse(JSON.stringify(scope.view.segDropdownCurrencyList2.data));
      var selectedData = scope.view.segDropdownCurrencyList2.selectedRowItems;  
      var selectedRow = scope.view.segDropdownCurrencyList2.selectedRowIndex[1]; 
      scope.view.segDropdownCurrencyList2.setData(segmentData);       
      scope.view.segDropdownCurrencyList2.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblListValue;
      var updateCurrency;
      if(updateOption.includes(" "))
      {
        updateCurrency=updateOption.split(" ");
        updateCurrency=updateCurrency[1];
      }
      this.view.flxCurrencyDropdown2.setVisibility(false);
      scope.businessController.updateP2PDetailsCollection(updateCurrency,"currency"); 
      scope.businessController.updateP2PDetailsCollection(updateOption,"currencyUI"); 
      scope.businessController.storeInCollection(updateCurrency,"segCurrency2", this._dataMapping);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "selectCurrency2",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : performDataMapping
  * invoked when perform DataMapping
  * @return : NA
  */  
    performDataMapping : function() {
      var scope = this;
      try{
      var dataMapping = this.dataMapping;
      for(key in dataMapping){
        if(key === "segments"){
          var widgets = dataMapping[key];
          for(key in widgets){
            var widgetId = key;
            var segData = scope.getSegmentDataFromMapping(widgets[widgetId],widgetId);
            if(segData!==undefined){
              scope.view[widgetId].setData(segData);
            }
          }
        }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performDataMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : getSegmentDataFromMapping
  * invoked when mapping segment
  * @return : NA
  */  
    getSegmentDataFromMapping : function(segDataJSON,segId) {
      var scope = this;
      try{
      var segData = [];
      var depositAccountsData= [];
      var depositAccountsSection =[];
      var segMasterDataToken = segDataJSON.segmentMasterData;
      segMasterDataToken = segMasterDataToken.split(".");
      if(segMasterDataToken[0].indexOf("Collection") !== -1) {
        var segMasterData = [];
        var key = segMasterDataToken[1].replace("}","");
        if(this.collectionObj.Collection[key]){
          segMasterData = this.collectionObj.Collection[key]; 
        }
        if(segMasterData.length > 0) {
          scope.filteredFromAcc =this.filterRecordsList(segMasterData);
          var sectionData = [];
          sectionData=this.groupBusinessAndRetail( scope.filteredFromAcc ,segDataJSON, key);
          return sectionData;
        }
        else if(segMasterData.length===0)
          {
             this.view.imgDepositAccountDropdownIcon.src="arrow_down.png";
            this.view.imgDepositAccountDropdownIcon.setVisibility(false);
             scope.view.flxDepositAccountDropdown.setVisibility(false); 
          }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentDataFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : UIMapping
  * invoked when mapping segment
  * @return : NA
  */  
    UIMapping:function(ResponseArray, segDataJSON, key){
      var scope = this;
      try{
      var tempData = [];
      ResponseArray.map(function(record){
        var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
        for(key in segRecord){
          if (key === "imgIcon") {
            segRecord[key] = ((!scope.isEmptyNullUndefined(record["isBusinessAccount"])) === "true" ) ? "businessaccount.png" : "personalaccount.png";
          }   
          else if(key==="imgBank"){
            segRecord[key]=  (!kony.sdk.isNullOrUndefined(scope.getBankIcon(record.bankName)))?scope.getBankIcon(record.bankName):"null";       
          }
          else{
            segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], record);
          }
        }
        segRecord["selectedAccountNumber"] = record.accountID;
        tempData.push(segRecord);
      });
      return tempData;
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "UIMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component getBankIcon
     * Responsible to get bank icon based on bank name
     * return image
     */
    getBankIcon :function(bankName){
      var self = this;
      try{
      var img ;    
      if(!kony.sdk.isNullOrUndefined(bankName)){
        if(bankName.toLowerCase().includes("citi"))
          img= "bank_icon_citi.png";
        else if(bankName.toLowerCase().includes("chase"))
          img="bank_icon_chase.png";
        else if(bankName.toLowerCase().includes("boa") || bankName.toLowerCase().includes("america") )
          img="bank_icon_boa.png";
        else if(bankName.toLowerCase().includes("hdfc"))
          img = "bank_icon_hdfc.png";
        else if(bankName.toLowerCase().includes("infinity"))
          img ="bank_icon_infinity.png";
        else
          img= "bank_icon_external.png";
      }
      return img;
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getBankIcon",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },

    /**     
	 * Component groupBusinessAndRetail
     * To group business and retail accounts
     */
    groupBusinessAndRetail: function(data,segDataJSON, key)
    {
      var scope =this;
      try{
        var fromAccountsData=[];
        if(!this.isEmptyNullUndefined(data))
        {
          var businessAccountsList=[];
          var personalAccountsList=[],i=0,k=0;
          for(var j=0;j<data.length;j++)
          {
            if(data[j]["isBusinessAccount"] ==="true" && !this.isEmptyNullUndefined(data[j]["isBusinessAccount"] ))
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
            fromAccountsData = scope.groupResponseData(businessAccountsList,"MembershipName");
            if(personalAccountsList.length>0){
              fromAccountsData["Personal Accounts"]=personalAccountsList;
            }
          }
          else if(personalAccountsList.length>0 && this.isBusinessAccountListValue===true)
          {
            fromAccountsData["Personal Accounts"]=personalAccountsList;
          }
        }
        if( this.isBusinessAccountListValue!=true)
        {                
          fromAccountsData = scope.groupResponseData(data,"accountType");               
        }
        var fromAccountsDataKeys = Object.keys(fromAccountsData);
        var sectionData=[];
        for(i=0;i<fromAccountsDataKeys.length;i++){
          var fromData={};
          if( this.isBusinessAccountListValue!=true){
            if(fromAccountsDataKeys[i]=="Savings" ||fromAccountsDataKeys[i]=="Checking"||fromAccountsDataKeys[i]=="Deposit"||fromAccountsDataKeys[i]=="Loan"||fromAccountsDataKeys[i]=="Credit Card")
            {
              fromData=[
                {"lblRecordsType":{
                  "text" :fromAccountsDataKeys[i]+" Accounts  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
                  "skin":"ICSknLbl42424215PX"
                }, 
                 "imgExpandCollapse":  "dropdown_collapse.png",                 
                 "flxRecordType":{"skin":""},
                 "flxTopSeparartor":{"skin":"ICSknFlxSeparator"},
                 "flxShowHide":{
                  "accessibilityConfig" :{
                    a11yLabel:fromAccountsDataKeys[i]+"  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
                    a11yARIA:{
                      "tabindex":0,
                      "role":"button",
                      "aria-expanded":true
                    }
                  },
                  "onKeyPress":this.headerKeyPressed
                 }                           
                }, this.UIMapping(fromAccountsData[fromAccountsDataKeys[i]],segDataJSON, key)
              ]
            }
          }
          else
          {
            fromData=[
              {"lblRecordsType":{
                "text" :fromAccountsDataKeys[i]+"  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
                "skin":"ICSknLbl42424215PX"
              }, 
               "imgExpandCollapse":  "dropdown_collapse.png",
               "flxRecordType":{"skin":""},
               "flxTopSeparartor":{"skin":"ICSknFlxSeparator"},
               "flxShowHide":{
                "accessibilityConfig" :{
                  a11yLabel:fromAccountsDataKeys[i]+"  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
                  a11yARIA:{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":true
                  }
                },
                "onKeyPress":this.headerKeyPressed
               }     
              },this.UIMapping(fromAccountsData[fromAccountsDataKeys[i]],segDataJSON, key)]
          }
          if(fromData.length!==undefined){
            sectionData.push(fromData);
          }
          
        }
        return sectionData;
      }catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in groupBusinessAndRetail",
          "errorLevel": "Configuration",
          "error": err
        };
      }
    },


    /**     
     * Component rowExpandCollapse
     * To expand and collapse group
    **/ 
    rowExpandCollapse :function (context) {
      var scope = this;
      try{
      var sectionIndex = context.section;
      if (this.segDepositAccountList === '') {
        this.segDepositAccountList = JSON.parse(JSON.stringify(this.view.segDepositAccountList.data));
      }
      var data = this.view.segDepositAccountList.data;
      var selectedHeaderData = data[sectionIndex][0];

      if (selectedHeaderData["imgExpandCollapse"] ===  "dropdown_collapse.png") {
        selectedHeaderData["imgExpandCollapse"] = "dropdown_expand.png";
        data[sectionIndex][1] = [];
        selectedHeaderData.flxShowHide.accessibilityConfig = {
          "a11yLabel":selectedHeaderData.lblRecordsType.text,
          a11yARIA:{
            "tabindex":0,
            "role":"button",
            "aria-expanded":false
          }
        }
        this.view.segDepositAccountList.setData(data);
        this.view.segDepositAccountList.setActive(context.row, context.section, 'flxACDropdownRecordHeader.flxShowHide');        
      } else {
        selectedHeaderData["imgExpandCollapse"] = "dropdown_collapse.png";
        data[sectionIndex][1] = this.segDepositAccountList[sectionIndex][1];
        selectedHeaderData.flxShowHide.accessibilityConfig = {
          "a11yLabel":selectedHeaderData.lblRecordsType.text,
          a11yARIA:{
            "tabindex":0,
            "role":"button",
            "aria-expanded":true
          }
        }
        this.view.segDepositAccountList.setData(data);
        this.view.segDepositAccountList.setActive(context.row, context.section, 'flxACDropdownRecordHeader.flxShowHide');
      }
    //   this.view.segDepositAccountList.setActive(context.row,context.section,'flxACDropdownRecordHeader.'+context.eventobject.id);
    }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "rowExpandCollapse",
              "error": err
            };
        scope.onError(errorObj);
      }

    },
    headerKeyPressed: function(eventObject,eventPayload,context){
      var scopeObj = this;
      if(eventPayload.keyCode === 27){
        scopeObj.view.flxDepositAccountDropdown.setVisibility(false);
        scopeObj.view.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        scopeObj.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scopeObj.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scopeObj.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        };    
        scopeObj.view.flxDepositAccountValue.setActive(true);
      } else if(eventPayload.keyCode === 9 && context.sectionIndex === context.widgetInfo.data.length - 1 && eventObject.imgExpandCollapse.src === 'dropdown_expand.png'){
        scopeObj.view.flxDepositAccountDropdown.setVisibility(false);
        scopeObj.view.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        scopeObj.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scopeObj.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scopeObj.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        };
        scopeObj.view.flxDepositAccountValue.setActive(true);
      } else if(eventPayload.shiftKey && eventPayload.keyCode === 9 && context.sectionIndex === 0){
        scopeObj.view.flxDepositAccountDropdown.setVisibility(false);
        eventPayload.preventDefault();
        scopeObj.view.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        scopeObj.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scopeObj.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scopeObj.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        };
        scopeObj.view.flxDepositAccountValue.setActive(true);
      }
    },
    onRowKeyPresssed: function(params){
      var scopeObj = this;
      if (params.eventPayload.keyCode === 27) {
        scopeObj.view.flxDepositAccountDropdown.setVisibility(false);
        scopeObj.view.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        scopeObj.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scopeObj.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scopeObj.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        }
        scopeObj.view.flxDepositAccountValue.setActive(true);
      } else if (params.eventPayload.shiftKey && params.eventPayload.keyCode === 9) {
          params.eventPayload.preventDefault();
          if (params.context.rowIndex === 0) {
            scopeObj.view.flxDepositAccountDropdown.segDepositAccountList.setActive((params.context.rowIndex - 1), params.context.sectionIndex, "flxACDropdownRecordHeader.flxShowHide");
          } else if (params.context.rowIndex > 0) {
            scopeObj.view.flxDepositAccountDropdown.segDepositAccountList.setActive((params.context.rowIndex - 1), 0, "flxDropdownAccList");
          }
      } else if (params.context.sectionIndex === params.context.widgetInfo.data.length-1 && params.eventPayload.keyCode === 9) {
        if(params.context.widgetInfo.data[params.context.widgetInfo.data.length-1][1].length-1 === params.context.rowIndex){
        scopeObj.view.flxDepositAccountDropdown.setVisibility(false);
        params.eventPayload.preventDefault();
        scopeObj.view.imgDepositAccountDropdownIcon.src = "arrow_down.png";
        scopeObj.view.flxDepositAccountValue.accessibilityConfig = {
          "a11yLabel": scopeObj.view.lblSelectedAccount.text === '' ? 'Default Deposit Account. Click to show list of default deposit accounts': 'Default Deposit Account. Currently selected '+ scopeObj.view.lblSelectedAccount.text + '. Click to show list of default deposit accounts.',
          "a11yARIA": {
            "aria-expanded": "false",
            "role": "button",
            "tabindex": 0
          }
        }
        scopeObj.view.flxDepositAccountValue.setActive(true);
       }
      }
    },


    /**
  * @api : groupResponseData
  * invoked for grouping business and personal
  * @return : NA
  */  
    groupResponseData : function (data, key) {
      var scope=this;
      try{
      if(data !== undefined && data !== "" && data !== null)
        return data.reduce(function (value, obj) {
          (value[obj[key]] = value[obj[key]] || []).push(obj);
          return value;
        }, {});
      else return {};
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "groupResponseData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },


    /*
     * Component filterRecordsList
     * Responsible to perform filter operation based on the contract
     */
    filterRecordsList :function(data) {
      var self = this;
      try{
      if(self.filterFromAccounts && self.filterType){
        var filterList = self.filterFromAccounts.split(",");
        var filterVariable = self.filterType;
        var filteredRecords = data.filter(function (record) {
          var removeRecord =  false;
          for(var i=0;i<filterList.length;i++) {
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
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "filterRecordsList",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
  * @api : performValidation
  * performs data validation for text boxes
  * @return : NA
  */
    performValidation : function() {
      var scope = this;
      try{
      this.view.tbxNationalID.onEndEditing = function() {
        scope.processDataValidation(scope.view.tbxNationalID, "tbxNationalID");
        if(scope.serviceParameters.validateNationalID.Service!=="")
        {
          scope.checkNationalIDService();
        }
      };
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performValidation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : checkNationalIDService
  *NationalID service invoked
  * @return : NA
  */
    checkNationalIDService : function() {
      var scope=this;
      try{
      scope.businessController.invokeCustomVerbforNationalID();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "checkNationalIDService",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : checkTransferLimitService1
  *TransferLimitService1 service invoked
  * @return : NA
  */
    checkTransferLimitService1 :function()
    {
      var scope=this;
      try{
      scope.businessController.invokeCustomVerbforTransferLimit1();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "checkTransferLimitService1",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : performMinimumDataFillValidation
  * performs minimum data validation for text boxes 
  * @return : NA
  */
    performMinimumDataFillValidation : function() {
      var scope = this;
      try{
      this.view.tbxNationalID.onEndEditing = function() {      
        scope.businessController.minFillValidation(scope.constructDVFInput(),scope._dataMapping);
      };
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performMinimumDataFillValidation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : enableOrDisableContinueButton
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    enableOrDisableContinueButton : function(dvfError) {
      var scope = this;
      try{
      this.collectionObj = ActivateP2PStore.getState();
      var enableButton = scope.collectionObj.Collection.enableButton;
      if(enableButton === "" && (dvfError === "" || dvfError===undefined)) {

        this.enableContinueButton();
      }
      else
        this.disableContinueButton();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "enableOrDisableContinueButton",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : enableContinueButton
  * enables continume button in initial screen
  * @return : NA
  */
    enableContinueButton : function() {
      var scope=this;
      try{
      if(this.view.flxActivate.isVisible===true)
      {
        this.view.btnActivated.setEnabled(true);
        this.view.btnActivated.skin = "sknbtnSSPffffff0278ee15pxbr3px";
        this.view.btnActivated.focusSkin="ICSknContinueEnabled";
      }
      else
      {       
       
        if(this.view.tbxAmount1.text!=="" )
        {
          this.view.btnActivate.setEnabled(true);
          this.view.btnActivate.skin = "sknbtnSSPffffff0278ee15pxbr3px";
          if(this.view.lblRadioButton3.text==="M" &&this.view.tbxNationalID.text==="")
          {
            this.disableContinueButton();
          }
          else if(this.view.lblRadioButton3.text==="M" &&this.view.tbxNationalID.text!=="")
          {
            if( this.collectionObj.Collection.enableButton==="" ||this.collectionObj.Collection.enableButton===undefined&&
               this.collectionObj.Collection.dvfError==="" || this.collectionObj.Collection.enableButton===undefined){
               this.view.btnActivate.setEnabled(true);
            this.view.btnActivate.skin = "sknbtnSSPffffff0278ee15pxbr3px"; 
            }
                   
          } 
          else if(this.contactSegment==="true"&& this.view.tbxNationalID.text==="")
          {
            this.disableContinueButton();
          }
        }      
        else{
          this.disableContinueButton();
        }
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "enableContinueButton",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : disableContinueButton
  * disables continume button in initial screen
  * @return : NA
  */
    disableContinueButton : function() {
      var scope=this;
      try{
      if(this.view.flxActivate.isVisible===true && this.view.imgIAgree.src==="uncheckedbox.png")
      {
        this.view.btnActivated.setEnabled(false);
        this.view.btnActivated.skin = "ICSknbtnDisablede2e9f036px";
      }
      else
      {
        this.view.btnActivate.setEnabled(false);
        this.view.btnActivate.skin = "ICSknbtnDisablede2e9f036px";
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "disableContinueButton",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * showCancelPopup
     * @api : showCancelPopup
     * displays popup on click of cancel button
     * @return : NA
     */
    showCancelPopup :function(){
      var scope = this;
      try{
      var form = kony.application.getCurrentForm();
      var popupObj = scope.view.flxPopup.clone("prefix");
      form.add(popupObj); 
      popupObj.isVisible = true;  
      //  popupObj.bottom = "0dp"; 
      popupObj.left = "0dp";  
      popupObj.height = "100%"; 
      popupObj.prefixflxClosePopup.centerY = "50%";
      popupObj.prefixflxClosePopup.doLayout = CommonUtilities.centerPopupFlex;
      popupObj.prefixflxClosePopup.prefixbtnCancelNo.onClick = function() { 
        form.remove(popupObj);
        if(scope.view.flxActivate.isVisible)
        scope.view.btnActivateCancel.setActive(true);
        else
        scope.view.btnCancel.setActive(true);  
      };
      popupObj.prefixlblCancelHeading.setActive(true);
      popupObj.isModalContainer  = true;
      popupObj.zIndex = 1000;
      popupObj.onKeyPress = function(eventObject, eventPayload){
        if(eventPayload.keyCode === 27){
          form.remove(popupObj);
          if(scope.view.flxActivate.isVisible)
          scope.view.btnActivateCancel.setActive(true);
          else
          scope.view.btnCancel.setActive(true); 
        }
      };
      popupObj.prefixflxClosePopup.prefixflxClose.onClick = function() {  
        form.remove(popupObj);
        if(scope.view.flxActivate.isVisible)
        scope.view.btnActivateCancel.setActive(true);
        else
        scope.view.btnCancel.setActive(true);   
      };
      popupObj.prefixflxClosePopup.prefixbtnCancelYes.onClick = function() {        
        form.remove(popupObj);
        scope.onCancelTransfer(scope.context);						 
      };
      this.view.forceLayout();
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showCancelPopup",
              "error": err
            };
        scope.onError(errorObj);
      }
    },


    /**
    * @api : getFieldValueFromMapping
    * Returns the data in collection using data mapping and conditional data mapping
    * @return : String
    */
    getFieldValueFromMapping : function(widget, fieldMapping, record) {
      var scope=this;
      try{
      if(typeof fieldMapping === "string") {
        if(fieldMapping.indexOf("$") !== -1) {
          if(fieldMapping.indexOf("${i18n") !== -1) {
            var i18ntext = fieldMapping.substring(fieldMapping.indexOf("${i18n")+7,fieldMapping.length-2);
            return kony.i18n.getLocalizedString(i18ntext);
          }
          else {
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
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFieldValueFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : validateData
 	* responsible for performing data validation
	* @return : NA
	*/
    validateData : function(dataValidator) {
      var scope = this;
      try{
      if(dataValidator === "" && scope.errorIdentifier !== 1){
        this.view.flxShowError.setVisibility(false);
        this.view.tbxNationalID.skin = "sknTbxSSPreg42424215pxF2F5F8	";
      }
      else if(dataValidator !== ""){
        this.invokedvfFieldErrorParser(dataValidator);
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "validateData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
     /**
	* @api : validationData
 	* responsible for performing data validation
	* @return : NA
	*/
    validationData : function(dataValidator) {
      var scope = this;
      try{
      if(dataValidator === "" && scope.errorIdentifier !== 1){
        this.view.flxShowError.setVisibility(false);
        this.view.tbxNationalID.skin = "sknTbxSSPreg42424215pxF2F5F8";
        this.view.tbxAmount1.skin="sknTbxSSPreg42424215pxF2F5F8";
      }
      else if(dataValidator !== ""){
        this.invokedvfFieldErrorParser(dataValidator);
      }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "validationData",
              "error": err
            };
        scope.onError(errorObj);
	}
    },

    /**
	* @api : validateDataMin
 	* responsible for performing data validation
	* @return : NA
	*/
    validateDataMin : function(dataValidator,dvfError,errNational,errTransfer) {
      var scope = this;
      try{
      if(dataValidator === "" && scope.errorIdentifier !== 1 && (dvfError === ""|| dvfError===undefined)&&
        (errNational === ""|| errNational===undefined) && (errTransfer === ""|| errTransfer===undefined)){
        this.view.flxShowError.setVisibility(false);
        this.view.tbxNationalID.skin = "sknTbxSSPreg42424215pxF2F5F8";
          this.view.tbxAmount1.skin="sknTbxSSPreg42424215pxF2F5F8";
      }
      else if(dataValidator !== ""){
        this.invokedvfFieldErrorParser(dataValidator);
      }}catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "validateDataMin",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : updateContactTypeDetails
 	* updates the collection based on the  selecte data
	* @return : NA
	*/
    updateContactTypeDetails : function(data) {
      var scope=this;
      try{
      var key=Object.keys(data);
      this.view.lblSelectedValue.text = data[key[0]];
      this.businessController.updateContactTypeDetails(data);
      this.view.flxDropdownList.isVisible = false;
      this.editFlag = "no";
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "updateContactTypeDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : updateDepositAccountDetails
 	* updates the collection based on the  selected data
	* @return : NA
	*/
    updateDepositAccountDetails : function(selectedDepositName,selectedDepositAccount) {
      var scope=this;
      try{
      
      this.view.lblSelectedAccount.text = selectedDepositName;
      this.businessController.updateDepositAccountDetails(selectedDepositName,selectedDepositAccount);
      this.view.flxDepositAccountDropdown.isVisible = false;
      this.editFlag = "no";
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "updateDepositAccountDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getMappedValueForWidget
     * Get mapped data of the corresponding widget
     * @return : mapped value
     */
    getMappedValueForWidget : function(widget, dataMapping) {
      var scope=this;
      try{
      for(var record in dataMapping) {
        var keyValues = dataMapping[record];
        for(var key in keyValues) {
          if(widget === key) {
            var fieldValue = dataMapping[record][widget];
            fieldValue = fieldValue.split(".")[2].replace("}","");
            return fieldValue;
          } } }
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getMappedValueForWidget",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : constructDVFInput
	* constructs input for data validation
	* @return : NA
	*/
    constructDVFInput : function() {
      var scope=this;
      try{
      var jsonToReturn = "";
      if(this.view.flxInputs.isVisible ) {
        jsonToReturn = {
          "tbxNationalID" : this.view.tbxNationalID.text,
          "tbxAmount1":this.view.tbxAmount1.text,
          "tbxAmount2":this.view.tbxAmount1.text        
        };
      } 
      return jsonToReturn; 
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "constructDVFInput",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
     * invokedvfFieldErrorParser
     * @api : invokedvfFieldErrorParser
     * gets invoked when validation fails
     * @return : NA
     */
    invokedvfFieldErrorParser : function(dvfError) {
      var self = this; 
      try {
        var txtField;
        for(var iterator in dvfError) {
          if("tbxNationalID" === iterator) {
            this.view.tbxNationalID.skin = "ICSknTextBoxEE0005";
            txtField = "National ID";
          }
           else if("tbxAmount1" === iterator) {
            this.view.tbxAmount1.skin = "ICSknTextBoxEE0005";
            txtField = "Transfer Limit";
          }

        }  
        var errorTxt = dvfError[iterator];
        errorTxt = errorTxt.replace(iterator, txtField);
        this.view.lblDisplayError.text = errorTxt;
        this.view.flxShowError.setVisibility(true);
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in invokedvfFieldErrorParser method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
	* @api : processDataValidation
 	* makes data ready for performing data valodation
	* @return : NA
	*/
    processDataValidation : function (widgetScope, widgetName) {
      var scope = this;
      try{
      var mappedValueForWidget = scope.getMappedValueForWidget(widgetName, this._dataMapping);
      var inputData = widgetScope.text;
      scope.businessController.performDataValidation(inputData, mappedValueForWidget, widgetName, this._dataMapping);
      }catch(err){
          var errorObj =
            {
              "level" : "ComponentController",
              "method" : "processDataValidation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : onBreakPointChange
 	* Gets invoked on change of breakpoint in UI
	* @return : NA
	*/
    onBreakPointChange: function() {
      var scope = this;
      try {
        this.onBreakPointChanges();
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onBreakPointChange",
              "error": err
            };
        scope.onError(errorObj);
      }
    }
  };
});