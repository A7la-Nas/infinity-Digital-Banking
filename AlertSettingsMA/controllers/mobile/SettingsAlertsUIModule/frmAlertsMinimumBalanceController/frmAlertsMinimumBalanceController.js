define({
    keypadString: '0.00',
    keypadString2: '0.00',
    isPeriodUsed: false,
	isTypePreferenceToggle:false,
    selectedTextbox:1,
  init : function() {
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }     
  },
  
    /**
     * Description
     * @method preShow
     * @return 
     */
    preShow: function() {
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxHeader.isVisible = false;
          this.view.flxEnable.top = "0dp";
          this.view.flxOpaque.top = "60dp";
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.resetUIToDefault();
        this.initActions();
        this.setKeyPadActions();
		this.isTypePreferenceToggle =  false; 
         var formatUtil = applicationManager.getFormatUtilManager();
      this.view.lblDollar.text = formatUtil.getCurrencySymbol(scope_SettingsPresenter.alertsCurrency);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      } 
     
    },
  
    initActions: function() {
      var scopeObj = this;
      this.view.customHeader.flxBack.onClick = function() {
        scopeObj.goBack();
      };
      this.view.flxAmountWrapper.onTouchEnd = function(){
       scopeObj.selectedTextbox = 1;
       scopeObj.view.flxAmountWrapper.skin = "sknFlxBgFFFFFFBr003e75Rad3px";
       scopeObj.view.flxToValueWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
      };
      this.view.flxToValueWrapper.onTouchEnd = function(){
        scopeObj.selectedTextbox = 2;
        scopeObj.view.flxToValueWrapper.skin = "sknFlxBgFFFFFFBr003e75Rad3px";
        scopeObj.view.flxAmountWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
      };
    },
  goBack : function()
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var ntf = new kony.mvc.Navigation("frmAlertsEditPreferences");
    ntf.navigate();
  },
  
  setHeaderTitle: function(title){
    this.view.title = title;
    this.view.customHeader.lblLocateUs.text = title;
  },
    /**
     * Description
     * @method setKeyPadActions
     * @return 
     */
    setKeyPadActions: function() {
      try {
        var scopeObj = this;
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnOne.onClick = function() {
            scopeObj.setKeypadChar(1);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnTwo.onClick = function() {
            scopeObj.setKeypadChar(2);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnThree.onClick = function() {
            scopeObj.setKeypadChar(3);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnFour.onClick = function() {
            scopeObj.setKeypadChar(4);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnFive.onClick = function() {
            scopeObj.setKeypadChar(5);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnSix.onClick = function() {
            scopeObj.setKeypadChar(6);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnSeven.onClick = function() {
            scopeObj.setKeypadChar(7);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnEight.onClick = function() {
            scopeObj.setKeypadChar(8);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnNine.onClick = function() {
            scopeObj.setKeypadChar(9);
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.keypad.btnZero.onClick = function() {
            scopeObj.setKeypadChar(0);
        };
        /**
         * Description
         * @method onTouchEnd
         * @return 
         */
        this.view.keypad.imgClearKeypad.onTouchEnd = function() {
            scopeObj.clearKeypadChar();
        };
        /**
         * Description
         * @method onClick
         * @return 
         */
        this.view.btnDot.onClick = function() {
            scopeObj.setKeypadChar('.');
        };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }         
    },

  /**
  * Description - to set the alert preferences
  * @method updateSelectedAlertValues
  * @param {object} setPreferenceData - contains the set alert preference request payload.
  * @param {Integer} option - identify the param to update,1- subscription,2-attribute value.	 
  */
  updateSelectedAlertValues: function(setPreferenceData, option) {
    try{
      var alertId = "", groupId = "",isValid = true;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      alertId = SettingsAlertsUIModule.presentationController.getAlertID();
      groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
      //update current alert values
      var updatedPayload = setPreferenceData;
      for(var i=0; i< setPreferenceData.alertSubscription.groups.length; i++){
        if(setPreferenceData.alertSubscription.groups[i].typeID === groupId){ 
          for(var j=0; j< setPreferenceData.alertSubscription.groups[i].alerts.length; j++){
            if(setPreferenceData.alertSubscription.groups[i].alerts[j].id === alertId){
              if(option === 1){ //update only subscriptions
                updatedPayload.alertSubscription.groups[i].alerts[j].isSub = this.view.switchReceiveAlerts.selectedIndex === 0 ? true : false;
                //update group subscription based on all alerts sub
                var groupSub = this.getGroupSubBasedOnAlertSub(updatedPayload.alertSubscription.groups[i].alerts);
                updatedPayload.alertSubscription.groups[i].isSub = groupSub;
              }else if(option === 2){ //update only attribute
                isValid = this.validateAttributeValue();
                updatedPayload.alertSubscription.groups[i].alerts[j]  = (isValid === true) ?
                  this.updateAlertAttributeValue(setPreferenceData.alertSubscription.groups[i].alerts[j]) : setPreferenceData.alertSubscription.groups[i].alerts[j];
              }
              break;
            }
          }
          break;
        }
      }
      if(isValid){
        this.resetUIToDefault();
        SettingsAlertsUIModule.presentationController.setAlertPreferences(updatedPayload, "frmAlertsMinimumBalance");
      } else{
        this.bindGenericError(kony.i18n.getLocalizedString("kony.mb.common.validAmount"));           
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
    catch(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    } 
  },
  /*
   *update group subscription based on all alerts sub
   *@param: prefPayload - set prefernces req payload
   *@return : group subscription - true/false
   */
  getGroupSubBasedOnAlertSub : function(alertsList){
    var trueCount = 0;
    for(var k=0;k<alertsList.length; k++){
      if(alertsList[k].isSub === true){
        trueCount = trueCount +1;
      }
    }
    if(trueCount === 0){
      return false;
    } else{
      return true;
    }
  },
  /**
  * validate the attribute values entered
  * @return {boolean} is valid or not	 
  */
  validateAttributeValue : function(){
    var amount2, isValid = true;
    var amount1 = this.keypadString.replace(/^0+/, '');
    isValid = (amount1 >= "1") ? true : false;
    if(isValid && this.view.flxToValue.isVisible === true){
      amount2 = this.keypadString2.replace(/^0+/, '');
      isValid = (amount2 >= "1") ? true : false;
      if(isValid && (parseFloat(this.keypadString) > parseFloat(this.keypadString2))){
        isValid = false;
      }
    }
    return isValid;
  },
  /**
  * update the attribute values for the alert
  * @param {object} alertObj - current alert object from set preferences payload 
  */
  updateAlertAttributeValue : function(alertObj){
    var amount2, amountWithoutCommas2, validAmountString2;
    var amount1 = this.keypadString.replace(/^0+/, '');
    if(amount1 === ".00")
      amount1 = "0.00";  
    var amountWithoutCommas1=amount1.replace(/,/g , '');
    var validAmountString1=""+amountWithoutCommas1;
    alertObj.value1 = validAmountString1;
    //second attribute
    if(this.view.flxToValue.isVisible === true){
      amount2 = this.keypadString2.replace(/^0+/, '');
      if(amount2 === ".00")
        amount2 = "0.00";  
      amountWithoutCommas2=amount2.replace(/,/g , '');
      validAmountString2=""+amountWithoutCommas2;
      alertObj["value2"]= validAmountString2;
    }
    return alertObj;
  },

  decimalPlaces: function(num) {
    try {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      if (!match) {
        return 0;
      }
      return Math.max(
        0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    }     
  },
  
  updateInputBullets: function() {
    if (this.keypadString === "") {
      this.view.lblNumber.text = "0";
      this.view.lblNumber.skin = "skinlblDarkened";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
    }
    else {
      this.view.lblNumber.text = this.keypadString;
      this.view.lblNumber.skin = "sknLbl4a4a4aSSP42px";
      if (parseInt(this.keypadString) !== 0) {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.focusSkin = "sknBtnOnBoardingInactive";
      }
    }
    this.view.forceLayout();
  },

  /**
   * Description
   * @method setKeypadChar
   * @param {char} char - each character from the amount entered.
   * @return 
   */
  setKeypadChar: function(char) {
    try{
      if(this.view.flxTransactionModeMain.isVisible){
        if (char === '.') {
          if (this.isPeriodUsed === false) {
            this.isPeriodUsed = true;
          } else {
            return;
          }
        }
        var keyPadStringValue = (this.selectedTextbox === 1) ? this.keypadString : this.keypadString2;
        keyPadStringValue = keyPadStringValue + char;
        var firstChar1 = keyPadStringValue[0];
        keyPadStringValue = keyPadStringValue.split("");
        for(var i=1; i<keyPadStringValue.length; i++){
          if(keyPadStringValue[i]==='.'){
            keyPadStringValue[i-1] = keyPadStringValue[i+1];
            i++;
          }else{
            keyPadStringValue[i-1]=keyPadStringValue[i];
          }
        }
        keyPadStringValue = keyPadStringValue.join("");
        keyPadStringValue = keyPadStringValue.substr(0, keyPadStringValue.length-1);
        if(firstChar1!=='0'){
          keyPadStringValue = firstChar1 + keyPadStringValue;
        }
        if(this.selectedTextbox === 1) this.keypadString = keyPadStringValue;
        else if(this.selectedTextbox === 2) this.keypadString2 = keyPadStringValue;
        this.updateAmountValue(this.selectedTextbox);
      }
      else{
        if(this.selectedTextbox === 1) this.keypadString = this.keypadString + char;
        else if(this.selectedTextbox === 2) this.keypadString2 = this.keypadString2 + char;
        this.updateInputBullets();
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    } 
  },

  /**
  * used to clear the amount value from the amount label.
  * @param {} 
  */
  clearKeypadChar: function () {
    try{
      var keyPadStringValue = (this.selectedTextbox === 1) ? this.keypadString : this.keypadString2;
      if(this.view.flxTransactionModeMain.isVisible){
        if(keyPadStringValue ==='0.00') return;

        keyPadStringValue = keyPadStringValue.split("");
        for(var i=keyPadStringValue.length-2; i>=0; i--){
          if(keyPadStringValue[i]=== '.'){
            keyPadStringValue[i+1] = keyPadStringValue[i-1];
            i--;
          }else{
            keyPadStringValue[i+1] = keyPadStringValue[i];
          }
        } 
        keyPadStringValue = keyPadStringValue.join("");
        keyPadStringValue = keyPadStringValue.substr(1);
        if(keyPadStringValue[0]=== '.'){
          keyPadStringValue = '0'+ keyPadStringValue;
        }
        if(this.selectedTextbox === 1) this.keypadString = keyPadStringValue;
        else if(this.selectedTextbox === 2) this.keypadString2 = keyPadStringValue;
        this.updateAmountValue(this.selectedTextbox);
      }
      else{
        if (keyPadStringValue.length === 1) {
          this.keypadString = '';
          this.updateInputBullets();
        }
        if (keyPadStringValue.length !== 0) {
          this.keypadString = keyPadStringValue.substr(0, keyPadStringValue.length - 1);
          this.updateInputBullets();
        }
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    } 
  },
  
  /**
  * used to update the amount value to the amount label.
  * @param :option- to identify the selected amount label 
  */

  updateAmountValue: function(option){
    try {
      if(option === 1 && (this.keypadString==='0.00' || this.keypadString==="")){
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblAmount.text = this.view.keypad.formatAmount('0.00');
      } else if(option === 2 && (this.keypadString2 ==='0.00' || this.keypadString2 ==="")){
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblToValue1.text = this.view.keypad.formatAmount('0.00');
      }
      else{
        var keypadStringCommas = '0.00';
        var beforeDecimal = (option === 1) ? this.keypadString.split('.')[0] :this.keypadString2.split('.')[0] ;
        var afterDecimal = (option === 1) ? this.keypadString.split('.')[1] : this.keypadString2.split('.')[1];
        if(afterDecimal === undefined) {
          afterDecimal = "00";
        }
        if(beforeDecimal.length>3){
          var withCommas = (beforeDecimal.length)/3;
          var withoutCommas = (beforeDecimal.length)%3;
          var temp = '';
          if(withoutCommas!==0){
            temp = beforeDecimal.substr(0, withoutCommas)+',';
          }
          for(var i = withoutCommas; i<beforeDecimal.length; i+=3){
            temp+=beforeDecimal.substr(i, 3)+',';
          }
          beforeDecimal = temp.substr(0, temp.length-1);
        }
        keypadStringCommas = beforeDecimal + '.'+afterDecimal;
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
        if(option === 1) this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
        else if(option === 2) this.view.lblToValue1.text = this.view.keypad.formatAmount(keypadStringCommas);
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }         
  },

    /**
* used to set the toggle UI.
* @param {String} state - state of switch of the selected alert type preference.
*/
  
  setToggleUI: function(state) {
    if(state === "true") {
      this.view.flxKeypad.setVisibility(true);
      this.view.flxKeypad.setEnabled(true);
      this.view.flxButtonContainer.setVisibility(true);
      this.view.lblErrorMsg.setVisibility(false);
      this.view.flxOpaque.setVisibility(false);
      this.view.switchReceiveAlerts.selectedIndex = 0;
    }
    else {
      this.view.flxKeypad.setVisibility(false);
      this.view.flxButtonContainer.setVisibility(false);
      this.view.lblErrorMsg.setVisibility(true);
      this.view.flxOpaque.setVisibility(true);
      this.view.switchReceiveAlerts.selectedIndex = 1;
    }
  },

  /**
  * used to initiate toggle action.
  * @param {object} currAlertData - current alert data.
  * @param {object} setPreferData - set preference payload datas.
  */

  switchToggle:function(currAlertData, setPreferData){
    this.isTypePreferenceToggle =  true; 
    if(this.view.switchReceiveAlerts.selectedIndex === 0){
      this.view.flxKeypad.setEnabled(true);
      this.setToggleUI("true");
      this.setKeypadStringValue(currAlertData);
      // this.updateAmountValue();
      this.updateSelectedAlertValues(setPreferData, 1);
    }
    else{
      this.view.flxKeypad.setEnabled(false);
      this.setToggleUI("false");
      this.setKeypadStringValue(currAlertData);
      this.updateSelectedAlertValues(setPreferData, 1);
    }
  },
   /*
  * assign variables with the alert values from data
  * @param: alert data
  */
  
  setKeypadStringValue: function(typeData){
    if(typeData.alertAttribute && typeData.alertAttribute.alertattribute_type === "AMOUNT"){
      if (typeData.alertsubtype_value1 !== undefined && typeData.alertsubtype_value1 !== "" && typeData.alertsubtype_value1 !== null) {
        if(typeData.alertsubtype_value1.indexOf(".")===-1)
          this.keypadString = typeData.alertsubtype_value1+".00";
        else
          this.keypadString = typeData.alertsubtype_value1;
      } else {
        this.keypadString = "0.00";
      }
      //in case of 2 values
      if (typeData.alertsubtype_value2 !== undefined && typeData.alertsubtype_value2 !== "" && typeData.alertsubtype_value2 !== null) {
        if(typeData.alertsubtype_value2.indexOf(".")===-1)
          this.keypadString2 = typeData.alertsubtype_value2+".00";
        else
          this.keypadString2 = typeData.alertsubtype_value2;
      } else {
        this.keypadString2 = "0.00";
      }
    }
    else{
      if (typeData.alertsubtype_value1 !== undefined && typeData.alertsubtype_value1 !== "" && typeData.alertsubtype_value1 !== null) {
        this.keypadString = typeData.alertsubtype_value1;
      } else {
        this.keypadString = "0";
      }
      //in case of 2 values
      if (typeData.alertsubtype_value2 !== undefined && typeData.alertsubtype_value2 !== "" && typeData.alertsubtype_value2 !== null) {
        this.keypadString2 = typeData.alertsubtype_value2;
      } else {
        this.keypadString2 = "0";
      }
    }
  },
  
  /**
  * used to set the alert data to the form.
  * @param {object} setPreferenceData - set alert preferences request.
  * @param {Integer} masterSwitchIndex - master switch index of alert category.
  */
  
  bindData: function(setPreferenceData, masterSwitchIndex) {
    var navManager = applicationManager.getNavigationManager();
    var alertsData = navManager.getCustomInfo("frmAlertsEditPreferences");
    var selAlertData = this.getSelectedAlertDetails(alertsData);
    this.setHeaderTitle(selAlertData.alertsubtypetext_displayName);  
    this.view.lblBodyText.text = selAlertData.alertsubtypetext_description;
    this.view.lblBodyTextDays.text = selAlertData.alertsubtypetext_description;
    this.view.flxKeypad.setEnabled(true);
    if(selAlertData.alertAttribute && selAlertData.alertAttribute.alertattribute_type === "AMOUNT"){
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.lblDollar.text = formatUtil.getCurrencySymbol(scope_SettingsPresenter.alertsCurrency);
      this.setKeypadStringValue(selAlertData);
      this.view.flxToValue.setVisibility(false);
      this.view.flxAmount.setEnabled(true);
      this.updateAmountValue(1);
      this.view.flxTransactionModeMain.setVisibility(true);
      this.view.flxTransactionModeDays.setVisibility(false);
      if(selAlertData.alertCondition && selAlertData.alertCondition.NoOfFields && selAlertData.alertCondition.NoOfFields === "2"){
        this.updateAmountValue(2);
        this.view.flxToValue.setVisibility(true);
        this.view.flxToValue.setEnabled(true);
      }
    }
    else{
      if (selAlertData.isSubscribed === "true") {
        this.setKeypadStringValue(selAlertData);
      } 
      this.updateInputBullets();
      this.view.flxTransactionModeMain.setVisibility(false);
      this.view.flxTransactionModeDays.setVisibility(true);
    }
    this.setToggleUI(selAlertData.isSubscribed);
    this.view.switchReceiveAlerts.onSlide = this.switchToggle.bind(this, selAlertData, setPreferenceData);
    this.view.btnContinue.onClick = this.continueOnClick.bind(this, setPreferenceData);
  },
  /*
  * on click of update button
  * @param: setPreferenceData - request param for set alert preferences
  */
  continueOnClick:function(setPreferenceData)
  {
    this.isTypePreferenceToggle=false;
    this.updateSelectedAlertValues(setPreferenceData,2);
  },
  /*
  * show error toast message
  * @param: errorMsg - message to be shown
  */
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  /*
  * get detils of selected alert from the category details response
  * @param: alertsData-category details response
  * @return: alertsData json updated with selected alert details
  */
  getSelectedAlertDetails : function(alertsData){
    var groupId = "", alertId ="",selectedAlert;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
    alertId = SettingsAlertsUIModule.presentationController.getAlertID();
    var alertGroups = alertsData.alertTypes;
    for(var i=0;i<alertGroups.length;i++){
      if(alertGroups[i].alerttype_id ===groupId){
        //get selected alert from selected group
        for(var j=0; j<alertGroups[i].alertSubTypes.length; j++){
          var alert = alertGroups[i].alertSubTypes[j];
          if(alertId === alert.alertsubtype_id){
            selectedAlert = alert;
            break;
          }
        }
        break;
      }
    }
    return selectedAlert;
  },
  /*
  * set UI to defaults
  */
  resetUIToDefault : function(){
    this.selectedTextbox = 1;
    this.view.flxAmountWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
    this.view.flxToValueWrapper.skin = "sknFlxffffffBorderf1f1f1Radius3px";
    this.view.flxRecurrenceWrapper.skin= "sknFlxffffffBorderf1f1f1Radius3px";
  },
});