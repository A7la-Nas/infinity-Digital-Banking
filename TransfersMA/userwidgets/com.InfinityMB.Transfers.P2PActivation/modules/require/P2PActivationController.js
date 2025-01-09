define(['./P2PActivationBusinessController','./P2PActivationStore', 'DataValidationFramework/DataValidationHandler', 'CommonUtilities'], function(BusinessController, P2PActivationStore, DataValidationHandler, CommonUtilities) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.store = P2PActivationStore;
      this.collectionObj = P2PActivationStore.getState();
      P2PActivationStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.businessController.store = this.store;
      this.dataValidationHandler = new DataValidationHandler();
      this.stack = [];
      this.headerTitleStack = [];
      this.contactList = [];
      this.keypadString = '0.00',
      this.isPeriodUsed = false;
      this.filterAccounts = "Loan,CreditCard,Deposit";
      this.filterType = "accountType";
      this.searchApplied = false;
      this.segAccountsData = "";
      this.activateP2PDetails = {};
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'dataFormatting', () => {
      return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
    },

    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext : function(context) {
      var scope = this;
      try {
        scope.context = context;
        scope.businessController.context = context;
      }
      catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : postShow
 	* Gets invoked initially after rendering of UI
	* @return : NA
	*/
      postShow : function() {
        var scope = this;
        try {
          scope.businessController.setProperties(scope._serviceParameters, scope._dataFormatting);
          scope.businessController.getMetaDataForAllObjects();      
          scope.setFlexVisibilty();
          if(scope.context.flowType === "Activation") {
            scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
          } else {
            scope.navigateToP2PDeactivationFlow();
          }
          scope.storeContextData();
        }
        catch(err) {
          var errorObj = {
            "level" : "ComponentController",
            "method" : "postShow",
            "error": err
          };
          scope.onError(errorObj);
        }
      },

   /**
	* @api : navigateToP2PDeactivationFlow
	* Responsible to bind data and Actions for Deactivate flow.
	* @return : NA
	*/
   navigateToP2PDeactivationFlow :  function() {
     var scope = this;
     try {
       scope.view.lblDeactivateSubHeading.text = scope.businessController.getDataBasedOnDataMapping("lblGuidelinesDescripttion", scope._dataMapping);
       scope.bindDeactivationGuidelinesMasterData();
       scope.view.btnDeactivateConfirm.onClick = function() {
       scope.businessController.invokeCustomVerbforDeactivateP2P();
       };
       scope.navigateTo("flxDeactivateP2P", scope.businessController.getDataBasedOnDataMapping("lblHeaderDeactivateP2P", scope._dataMapping));
     } catch(err) {
       var errorObj = {
         "level" : "ComponentController",
         "method" : "navigateToP2PDeactivationFlow",
         "error": err
       };
       scope.onError(errorObj);
     }
     },

    /**
	* @api : bindDeactivationGuidelinesMasterData
	* Responsible to map Guidelines options.
	* @return : NA
	*/
    bindDeactivationGuidelinesMasterData : function() {
      var scope = this;
      try {
      var masterData = scope.getSegmentMasterData("segDeactivationGuideliness", "segmentUI", "");
      var featureList = [];
      for(var i = 0; i < masterData.length;i++) {
        var segmentJSON = {};
        segmentJSON["lblService"] = {
          "skin" : "sknLbl424242SSP93prSansRegularPro",
          "text": masterData[i][0]
        };
        segmentJSON["lblBullet"] = {
          "skin" : "sknLblcfcfcfOp100cfcfcf100Radius"
        };
        featureList.push(segmentJSON);          
      } 
      var widgetMap = {
        "lblService" : "lblService",
        "lblBullet" : "lblBullet",
      };
      scope.view.segDeactivateGuidelines.widgetDataMap = widgetMap;
      scope.view.segDeactivateGuidelines.setData(featureList);
      } catch(err) {
       var errorObj = {
         "level" : "ComponentController",
         "method" : "bindDeactivationGuidelinesMasterData",
         "error": err
       };
       scope.onError(errorObj);
     }
    },

    /**
	* @api : storeContextData
 	* stores context data into Collection.
	* @return : NA
	*/
    storeContextData : function() {
      var scope = this;
      try {
        var userData = {};
        userData[scope.getMappedValueForWidget("field1Value", scope._dataMapping)]   = scope.context.hasOwnProperty("name") ? scope.context["name"] : "";
        userData[scope.getMappedValueForWidget("field2Value", scope._dataMapping)]   = kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo");
        userData[scope.getMappedValueForWidget("phoneValue", scope._dataMapping)]    = scope.getPhoneNumberOrEmail(scope.context["ContactNumbers"]);
        userData[scope.getMappedValueForWidget("emailValue", scope._dataMapping)]    = scope.getPhoneNumberOrEmail(scope.context["EmailIds"]);
        userData["selectedDefaultAccount"] = (scope.context.hasOwnProperty("default_to_account_p2p") && !kony.sdk.isNullOrUndefined(scope.context["default_to_account_p2p"])) ? scope.context["default_to_account_p2p"] : kony.i18n.getLocalizedString("kony.mb.common.add");
        userData[scope.getMappedValueForWidget("field4Value", scope._dataMapping)]    = scope.context.hasOwnProperty("formattedDepositAccount") ? scope.context["formattedDepositAccount"] :  kony.i18n.getLocalizedString("kony.mb.common.add");
        userData[scope.getMappedValueForWidget("field5Value", scope._dataMapping)]    = kony.i18n.getLocalizedString("kony.mb.common.add");
        userData[scope.getMappedValueForWidget("tbxCurrency", scope._dataMapping)]    = "USD";
        scope.businessController.setDataInCollection(scope._serviceParameters.ActivateP2P.Object, userData);
      } catch(err) {
       var errorObj = {
         "level" : "ComponentController",
         "method" : "storeContextData",
         "error": err
       };
       scope.onError(errorObj);
     }
    },

    /**
	* @api : navigateToP2PActivationFlow
 	* prepares UI for Activation Flow
	* @return : NA
	*/
    navigateToP2PActivationFlow : function() {
      var scope = this;
      try {
        scope.setConfirmDetailsScreenLabelText();
        scope.setActivateScreenValue();
        scope.setContactTypeFieldValues();
        scope.setConfirmDetailsActions();
      }  catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "navigateToP2PActivationFlow",
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
      try {
      scope.collectionObj = P2PActivationStore.getState();
      var serviceParameters = scope._serviceParameters;
      if(scope.context.flowType === "Activation") {
      scope.performActionBasedOnVisibility();
      if(scope.collectionObj.Collection.hasOwnProperty("ServiceAcknowledgement")) {
        var collectionData = scope.collectionObj.Collection[serviceParameters.ActivateP2P.Object];
        scope.activateP2PDetails = collectionData;
        collectionData["result"] = scope.collectionObj.Collection.ServiceAcknowledgement.result;
        var filterContext = scope.getUserCollectionData(collectionData);
        scope.activateP2PCallback(collectionData);
        }
      } else {
       if(scope.collectionObj.Collection.hasOwnProperty("deactivateP2PAcknowledgement")) {
        var deActivationData = scope.collectionObj.Collection[serviceParameters.ActivateP2P.Object];
        deActivationData["result"] = "Success";
        if(scope.businessController.getDataBasedOnDataMapping("tbxTransferLimit", scope._dataMapping) === kony.i18n.getLocalizedString("kony.mb.common.add")) {
          delete deActivationData[scope.getMappedValueForWidget("field5Value", scope._dataMapping)];
        }
        scope.activateP2PCallback(deActivationData);
       }
      }
      scope.setServiceToastMessage();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "render",
          "error": err
        };
        scope.onError(errorObj);
     }
    },

    /**
	* @api : performActionBasedOnVisibility
 	* Invoke action based on screen visibility.
	* @return : NA
	*/
    performActionBasedOnVisibility :  function() {
      var scope = this;
      try {
      if(scope.view.flxConfirmDetails.isVisible) {
        scope.navigateToP2PActivationFlow();
      }
      if(scope.view.flxNationalID.isVisible) {
        scope.performNationalIDScreenActions();
      }
      if(scope.view.flxTransferLimit.isVisible) {
        scope.setTransferLimitTextBoxValue();
      }
      if(scope.view.flxPhnoEmailDetails.isVisible) {
        scope.setContactListDatainSegment();
      }
      if(scope.view.flxDepositAccounts.isVisible) {
        scope.setDepositAccountScreenData();
      }
      scope.view.forceLayout();
      }  catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "performActionBasedOnVisibility",
          "error": err
        };
        scope.onError(errorObj);
     }
    },

    /**
	* @api : setDepositAccountScreenData
 	* binds deposit account screen actions and set segment data.
	* @return : NA
	*/
    setDepositAccountScreenData :  function() {
      var scope = this;
      try {
        scope.collectionObj = P2PActivationStore.getState();
        var serviceParameters = scope._serviceParameters;
        if(scope.collectionObj.Collection.hasOwnProperty(serviceParameters.getDepositAccounts.Object)) {
          if(scope.collectionObj.Collection[serviceParameters.getDepositAccounts.Object].length > 0) {
            scope.view.segAccounts.setVisibility(true);
            scope.view.flxNoRecords.setVisibility(false);
            scope.setDepositAccountScreenActions();
            scope.performDataMapping(); 
          } else {
            scope.view.flxNoRecords.setVisibility(true);
            scope.view.segAccounts.setVisibility(false);
          }
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setDepositAccountScreenData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getUserCollectionData
 	* filters the context data based on currenct current type.
	* @return : NA
	*/
    getUserCollectionData :  function(collectionData) {
      var scope = this;
      try {
      var currentContactType = scope.view.lblField2Value.text;
      var dataMapping = scope._dataMapping;
      if(currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo")) {
         if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("emailValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("emailValue", dataMapping)];
         } if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("nationalIDValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("emailValue", dataMapping)];
         }
      } else if(currentContactType === kony.i18n.getLocalizedString("i18n.payments.eMail")) {
        if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("phoneValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("phoneValue", dataMapping)];
         } if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("nationalIDValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("emailValue", dataMapping)];
         }
      } else {
        if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("emailValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("emailValue", dataMapping)];
         } if(collectionData.hasOwnProperty(scope.getMappedValueForWidget("phoneValue", dataMapping))) {
           delete collectionData[scope.getMappedValueForWidget("phoneValue", dataMapping)];
         }
      }
      return collectionData;
      }  catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getUserCollectionData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api setServiceToastMessage
     * responsible to set display error as toast message.
     * @return : NA
     */
    setServiceToastMessage : function() {
      var scope = this;
      try {
      scope.collectionObj = P2PActivationStore.getState();
      if(scope.collectionObj.Collection.hasOwnProperty("getMetaDataFromModel")) {
        scope.showToastMessageError("Error while retrieving Meta Data from model");
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbforDepositAccount")) {
        scope.showToastMessageError(scope.collectionObj.Collection["invokeCustomVerbforDepositAccount"].error);
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbForNationalID")) {
        scope.showToastMessageError(scope.collectionObj.Collection["invokeCustomVerbForNationalID"].error);
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbToValidateTransferLimit")) {
        scope.showToastMessageError(scope.collectionObj.Collection["invokeCustomVerbToValidateTransferLimit"].error);
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbforActivateP2P")) {
        scope.setFailDescription("invokeCustomVerbforActivateP2P");
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbToUpdateAccounts")) {
       scope.setFailDescription("invokeCustomVerbToUpdateAccounts");
      }
      if(scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbforDeactivateP2P")) {
       scope.setFailDescription("invokeCustomVerbforDeactivateP2P");
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setServiceToastMessage",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api setFailDescription
     * responsible to set Failure description message based on flow type.
     * @return : NA
     */
    setFailDescription :  function(errorKey) {
      var scope = this;
      try {
      var context = {};
      scope.collectionObj = P2PActivationStore.getState();
      var errorMsg = scope.collectionObj.Collection[errorKey].error;
      context["dbpErrMsg"] = !scope.isEmptyNullUndefined(errorMsg) ? errorMsg : (scope.context.flowType === "Activation") ? kony.i18n.getLocalizedString("i18n.P2PActivation.failDescription") : kony.i18n.getLocalizedString("i18n.P2PDeactivation.failDescription");
      scope.activateP2PCallback(context);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setFailDescription",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api setDepositAccountScreenActions
     * responsible for Deposit Account Screen Actions.
     * @return : NA
     */
    setDepositAccountScreenActions : function() {
      var scope = this;
      try {
      scope.view.tbxSearchBox.onTextChange = scope.onAccountSearch.bind(scope);
      scope.view.imgCloseIcon.onTouchStart = scope.clearTextBoxTexts.bind(scope);
      scope.view.segAccounts.onRowClick    = scope.onAccountSelection.bind(scope);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setDepositAccountScreenActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    }, 

     /**
	* @api : performNationalIDScreenActions
 	* gets invoked when national ID data updated in collection.
	* @return : NA
	*/  
    performNationalIDScreenActions : function() {
      var scope = this;
      try {
        var dvfError = "";
        scope.collectionObj = P2PActivationStore.getState();
        var validateObject = scope.serviceParameters.validateNationalID.Object;
        if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["minenableButton"]) && !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection["maxenableButton"])) {
          this.enableOrDisableContinueButton(dvfError);
        }
        if(scope.collectionObj.Collection.hasOwnProperty("dvfError")) {
          dvfError = scope.collectionObj.Collection.dvfError;
          scope.validateNationalIDData(dvfError);
        }
        if(validateObject !== "" && scope.collectionObj.Collection.hasOwnProperty(validateObject) && !scope.collectionObj.Collection.hasOwnProperty("dvfError")) {
          scope.navigateToP2PActivationFlow();
          scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
        }  
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "performNationalIDScreenActions",
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
    validateNationalIDData : function(dataValidator) {
      var scope = this;
      try {
      if(dataValidator === "") {
        scope.view.txtNationalID.skin = "sknTbxFontSSPR727272BdrE9E9E9";
        scope.view.lblNationalIDErrorMsg.setVisibility(false);
        scope.enableButton("btnNationalIDContinue");
        var serviceParamters = scope.serviceParameters;
        if(serviceParamters["validateNationalID"].Service !== "" && serviceParamters["validateNationalID"].Object !== "") {
          scope.businessController.invokeCustomVerbForNationalID();
        } else {
          scope.navigateToP2PActivationFlow();
          scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
        }
      } else if(dataValidator !== "") {
        scope.invokedvfFieldErrorParser(dataValidator);
        scope.disableButton("btnNationalIDContinue");
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "validateNationalIDData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
 	* responsible to store selected account in collection.
	* @return : NA
	*/
  onAccountSelection : function() {
    var scope = this;
    try {
      var segmentData = JSON.parse(JSON.stringify(scope.view.segAccounts.data));
      var selectedData = scope.view.segAccounts.selectedRowItems;  
      var selectedAccountName = selectedData[0].lblField1;
      var selectedDepositAccount = selectedData[0].accountNumber;
      scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
      scope.businessController.updateDataInCollection(selectedAccountName,"field4Value", scope._dataMapping);
      scope.businessController.updateDataInCollection(selectedDepositAccount,"selectedDepositAccount", scope._dataMapping);
    } catch(err) {
      var errorObj = {
        "level" : "ComponentController",
        "method" : "onAccountSelection",
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
      var scope = this; 
      try {
        var txtField, iterator;
        for(iterator in dvfError) {
          if("nationalID" === iterator) {
            scope.view.txtNationalID.skin = "ICSknTbxF54B5E1Bdr34px";
            txtField = "National ID";
          }
        } 
        var errorText = dvfError[iterator];
        errorText = errorText.replace(iterator, txtField);
        scope.view.lblNationalIDErrorMsg.text = errorText;
        scope.view.lblNationalIDErrorMsg.setVisibility(true);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "invokedvfFieldErrorParser",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setConfirmDetailsScreenLabelText
  * sets the data in labels in ConfirmDetails Screen
  * @return : NA
  */
    setConfirmDetailsScreenLabelText : function() {
      var scope = this;
      try {
        scope.view.lblField1Label.text = scope.businessController.getDataBasedOnDataMapping("field1Label", scope._dataMapping);
        scope.view.lblField2Label.text = scope.businessController.getDataBasedOnDataMapping("field2Label", scope._dataMapping);
        scope.view.lblField4Label.text = scope.businessController.getDataBasedOnDataMapping("field4Label", scope._dataMapping);
        scope.view.lblField5Label.text = scope.businessController.getDataBasedOnDataMapping("field5Label", scope._dataMapping);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setConfirmDetailsScreenLabelText",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setActivateScreenValue
  * sets the data for values in ConfirmDetails Screen
  * @return : NA
  */
    setActivateScreenValue : function() {
      var scope = this;
      try {
      scope.view.lblField1Value.text = scope.businessController.getDataBasedOnDataMapping("field1Value", scope._dataMapping);
      scope.view.lblField2Value.text = scope.businessController.getDataBasedOnDataMapping("field2Value", scope._dataMapping);
      scope.view.lblField4Value.text = scope.businessController.getDataBasedOnDataMapping("field4Value", scope._dataMapping);
      scope.view.lblField5Value.text = scope.businessController.getDataBasedOnDataMapping("field5Value", scope._dataMapping);
      if(scope.view.lblField5Value.text !== kony.i18n.getLocalizedString("kony.mb.common.add") && scope.view.lblField4Value.text !== kony.i18n.getLocalizedString("kony.mb.common.add")) {
        scope.enableButton("btnCTAButton1");
      } else {
        scope.disableButton("btnCTAButton1");
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setActivateScreenValue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : onCancelPopup
  * enables the cancel popup.
  * @return : NA
  */
    onCancelPopup : function() {
      var scope = this;
      try {
        scope.view.lblMessage.text = (scope.context.flowType === "Activation") ? scope.businessController.getDataBasedOnDataMapping("lblActivationFlowDescription", scope._dataMapping) : scope.businessController.getDataBasedOnDataMapping("lblDeactivationFlowDescription", scope._dataMapping);
        scope.view.flxCancelPopUp.setVisibility(true);
        scope.view.btnYes.onClick = function() {
          scope.view.flxCancelPopUp.setVisibility(false);
          scope.navigateToLanding("yes");
        };
        scope.view.btnNo.onClick = function() {
          scope.navigateToLanding("no");
          scope.view.flxCancelPopUp.setVisibility(false);
        };
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onCancelPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setContactTypeFieldValues
  * sets the label and field for Contact type fields in Confirm Details Screen.
  * @return : NA
  */
    setContactTypeFieldValues : function() {
      var scope = this;
      try {
      var currentContactType = scope.view.lblField2Value.text;
      if(currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo")) {
        scope.view.lblField3Label.text = scope.businessController.getDataBasedOnDataMapping("phoneLabel", scope._dataMapping);
        scope.view.lblField3Value.text = scope.businessController.getDataBasedOnDataMapping("phoneValue", scope._dataMapping);
        scope.contactList = scope.context["ContactNumbers"];
      } else if(currentContactType === kony.i18n.getLocalizedString("i18n.payments.eMail")) {
        scope.view.lblField3Label.text = scope.businessController.getDataBasedOnDataMapping("emailLabel", scope._dataMapping);
        scope.view.lblField3Value.text = scope.businessController.getDataBasedOnDataMapping("emailValue", scope._dataMapping);
        scope.contactList = scope.context["EmailIds"];
      } else {
        scope.view.lblField3Label.text = scope.businessController.getDataBasedOnDataMapping("nationalIDLabel", scope._dataMapping);
        scope.view.lblField3Value.text = scope.businessController.getDataBasedOnDataMapping("nationalIDValue", scope._dataMapping);
      }
      if(scope.contactList.length > 1 || currentContactType === kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.nationalID")) {
        scope.view.imgArrow3.setVisibility(true);
        scope.view.lblField3Value.right = "50dp";
        scope.view.lblField3Value.skin = "ICSknLblSSPR0a78d134px";
      } else {
        scope.view.imgArrow3.setVisibility(false);
        scope.view.lblField3Value.right = "20dp";
        scope.view.lblField3Value.skin = "ICSkn424242SPPR45px";
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setContactTypeFieldValues",
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
      try {
      scope.collectionObj = P2PActivationStore.getState();
      var minFillReq = scope.collectionObj.Collection.minenableButton;
      var maxFillReq = scope.collectionObj.Collection.maxenableButton;
      scope.view.txtNationalID.skin = "sknTbxFontSSPR727272BdrE9E9E9";
      scope.view.lblNationalIDErrorMsg.setVisibility(false);
      if(minFillReq && dvfError === "" && maxFillReq) {
        scope.enableButton("btnNationalIDContinue");
      } else {
        scope.disableButton("btnNationalIDContinue");
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "enableOrDisableContinueButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : formatPhoneNumber
  * @return formatted mobile number based on given format.
  */
    formatPhoneNumber : function(phoneNumberStr) {
      var scope = this;
      try {
      var data = ('' + phoneNumberStr).replace(/\D/g, '');
      var phno = data.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (phno) {
        var intialCode = (phno[1] ? '+1 ' : '');
        return [intialCode, '(', phno[2], ') ', phno[3], '-', phno[4]].join('');
      }
      return phoneNumberStr;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "enableOrDisableContinueButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : getPhoneNumberOrEmail
  * responsible to get Contact list value based on Email or Phone.
  * @ return Array.
  */
    getPhoneNumberOrEmail : function(contactArrayList) {
      var scope = this;
      try {
        if(Array.isArray(contactArrayList)) { 
          for (var index = 0; index < contactArrayList.length; index++) {
            var data  = contactArrayList[index];
            var userData = ((data["Type_id"]).toLowerCase() === ("COMM_TYPE_PHONE").toLowerCase()) ? scope.formatPhoneNumber(data.phoneNumber) : data.Value;
            if(data.isPrimary) {
              return userData;
            } else if(contactArrayList.length === 1) {
              return userData;
            }
          }
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getPhoneNumberOrEmail",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*
   * Component onAccountSearch
   * Responsible to perform search operation and update segment data 
   */
    onAccountSearch : function() {
      var scope = this;
      try {
        scope.view.imgCloseIcon.setVisibility(true);
        var searchTxt = scope.view.tbxSearchBox.text.toLowerCase();
        scope.searchApplied = false;
        if (searchTxt !== "") {
          var result = [];
          var data = scope.filteredFromAcc;
          for (var i = 0; i < data.length; i++) {
            if (data[i].accountName.toLowerCase().indexOf(searchTxt) !== -1 || data[i].accountID.toLowerCase().indexOf(searchTxt) !== -1) {
              result.push(data[i]);
            }
          }
          if (!(result.length > 0)) {
            scope.view.segAccounts.setVisibility(false);
            scope.view.flxNoRecords.setVisibility(true);
          } else {
            scope.searchApplied = true;
            scope.filteredFromAcc = result;
            scope.performDataMapping();
          }
        } else {
          scope.clearTextBoxTexts();
        }
        scope.view.forceLayout();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onAccountSearch",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*
     * Component clearTextBoxTexts
     * Responsible to clear text box texts  
     */
    clearTextBoxTexts : function() {
      var scope = this;
      try {
        scope.view.tbxSearchBox.text = "";
        scope.view.imgCloseIcon.setVisibility(false);
        scope.searchApplied = false;
        scope.view.segAccounts.removeAll();
        scope.performDataMapping();   
        scope.view.segAccounts.setVisibility(true);
        scope.view.flxNoRecords.setVisibility(false);
      }  catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "clearTextBoxTexts",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : performDataMapping
	* This method will do data mapping with collection
	* @return : NA
	*/
    performDataMapping : function() {
      var scope = this;
      try {
        var dataMapping = this._dataMapping;
        for(key in dataMapping) {
          if(key === "segments"){
            var widgets = dataMapping[key];
            for(key in widgets) {
              if(key === "segAccounts") {
                var widgetId = key;
                var segData = scope.getSegmentDataFromMapping(widgets[widgetId],widgetId);
                scope.view[widgetId].setData(segData);
              }
            }
          }
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "performDataMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getSegmentDataFromMapping
	* This method will return the segement data from data mapping property
	* @return : Array
	*/
    getSegmentDataFromMapping : function(segDataJSON,segId) {
      var scope = this;
      try {
      var segData = [];
      var depositAccountsData= [];
      var depositAccountsSection =[];
      var segMasterDataToken = segDataJSON.segmentMasterData;
      segMasterDataToken = segMasterDataToken.split(".");
      scope.collectionObj = P2PActivationStore.getState();
      if(segMasterDataToken[0].indexOf("Collection") !== -1) {
        var segMasterData = [];
        var key = segMasterDataToken[1].replace("}","");
        if(scope.collectionObj.Collection[key]) {
          segMasterData = scope.collectionObj.Collection[key]; 
        }
        if(segMasterData.length > 0) {
          if(scope.searchApplied)
            depositAccountsData = scope.groupBusinessAndRetail(scope.filteredFromAcc, segDataJSON, key);
          else {
            scope.filteredFromAcc = scope.filterRecordsList(segMasterData);
            depositAccountsData = scope.groupBusinessAndRetail(scope.filteredFromAcc, segDataJSON, key);
          }
          return depositAccountsData;
        }
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getSegmentDataFromMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : UIMapping
	* This method is responsible to map based on mappings.
	* @return : Array
	*/
    UIMapping : function(ResponseArray, segDataJSON, key){
      var scope = this;
      try {
      var tempData = [];
      ResponseArray.map(function(record){
        var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
        for(key in segRecord) {
          if(key === "imgUserIcon") {
            segRecord[key] = (!kony.sdk.isNullOrUndefined(record["isBusinessAccount"]) && record["isBusinessAccount"] === "true") ? "businessicon.png" : "personalicon.png";
          } else if(key === "imgBankIcon") {
            segRecord[key]=  (!kony.sdk.isNullOrUndefined(scope.getBankIcon(record.bankName))) ? scope.getBankIcon(record.bankName) : "null";      
          } else {
            segRecord[key] = scope.getFieldValueFromMapping(segRecord[key], record);
          }
        }
        segRecord["accountNumber"] = record.accountID;
        tempData.push(segRecord);
      });
      return tempData;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "UIMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : groupBusinessAndRetail
	* This method is responsible to group response data based on account type.
	* @return : Array
	*/
    groupBusinessAndRetail : function(data,segDataJSON, key) {
      var scope =this;
      try {
        var fromAccountsData=[];
        if(!scope.isEmptyNullUndefined(data)) {
          var businessAccountsList = [];
          var personalAccountsList = [], i=0, k=0;
          for(var j=0; j<data.length; j++) {
            if(data[j]["isBusinessAccount"] === "true" && !scope.isEmptyNullUndefined(data[j]["isBusinessAccount"])) {
              businessAccountsList[i] = data[j];
              i++;
            } else {
              personalAccountsList[k] = data[j];
              k++;
            }
          }
          if(businessAccountsList.length > 0) {
            scope.isBusinessAccountListValue = true;
            fromAccountsData = scope.groupResponseData(businessAccountsList,"MembershipName");
            if(personalAccountsList.length > 0){
              fromAccountsData["Personal Accounts"] = personalAccountsList;
            }
          }
          else if(personalAccountsList.length > 0 && scope.isBusinessAccountListValue === true) {
            fromAccountsData["Personal Accounts"] = personalAccountsList;
          }
        }
        if(scope.isBusinessAccountListValue !== true) {                
          fromAccountsData = scope.groupResponseData(data,"accountType");               
        }
        var fromAccountsDataKeys = Object.keys(fromAccountsData);
        var sectionData = [];
        for(i=0; i<fromAccountsDataKeys.length; i++) {
          var fromData = {};
          fromData = [{
            "lblHeader": {
              "text" : scope.isBusinessAccountListValue !== true ? fromAccountsDataKeys[i] +" Accounts  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")" : fromAccountsDataKeys[i]+"  ("+fromAccountsData[fromAccountsDataKeys[i]].length+")",
              "skin": "ICSkn424242SPPR45px"
            }, 
            "imgArrow": "arrowup.png",                 
            "flxFromAccountHeader": {
              "skin": "ICSknFlxF6F6F6"
            }                           
          }, scope.UIMapping(fromAccountsData[fromAccountsDataKeys[i]],segDataJSON, key)];
          sectionData.push(fromData);
        }
        return sectionData;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "groupBusinessAndRetail",
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
    getBankIcon : function(bankName) {
      var scope = this;
      try {
      var bankIcon;
      if(!kony.sdk.isNullOrUndefined(bankName)){
        if(bankName.toLowerCase().includes("citi"))
          bankIcon = "banklogo2.png";
        else if(bankName.toLowerCase().includes("chase"))
          bankIcon = "banklogo3.png";
        else if(bankName.toLowerCase().includes("boa") || bankName.toLowerCase().includes("america"))
          bankIcon = "bankofamerica.png";
        else if(bankName.toLowerCase().includes("hdfc"))
          bankIcon = "bank_icon_hdfc.png";
        else if(bankName.toLowerCase().includes("infinity"))
          bankIcon = "bank_icon_infinity.png";
        else
          bankIcon = "bank_icon_external.png";
      }
      return bankIcon;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getBankIcon",
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
    getFieldValueFromMapping : function(fieldMapping, record) {
      var scope = this;
      try {
      if(typeof fieldMapping === "string") {
        if(fieldMapping.indexOf("$") !== -1) {
          if(fieldMapping.indexOf("${i18n") !== -1) {
            var i18ntext = fieldMapping.substring(fieldMapping.indexOf("${i18n")+7, fieldMapping.length-2);
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
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getFieldValueFromMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**     
	 * Component rowExpandCollapse
     * To expand and collapse group
    **/ 
    rowExpandCollapse : function (context) {
      var scope = this;
      try {
      var sectionIndex = context.section;
      if (scope.segAccountsData === '') {
        scope.segAccountsData = JSON.parse(JSON.stringify(scope.view.segAccounts.data));
      }
      var data = scope.view.segAccounts.data;
      var selectedHeaderData = data[sectionIndex][0];
      if (!JSON.stringify(data).includes("flxNoRecords")) {
        if (selectedHeaderData["imgArrow"] === "arrowup.png") {
          selectedHeaderData["imgArrow"] = "arrowdown.png";
          data[sectionIndex][1] = [];
          scope.view.segAccounts.setData(data);
        } else {
          selectedHeaderData["imgArrow"] = "arrowup.png";
          data[sectionIndex][1] = this.segAccountsData[sectionIndex][1];
          scope.view.segAccounts.setData(data);
        }
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "rowExpandCollapse",
          "error": err
        };
        scope.onError(errorObj);
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
      var scope = this;
      try {
        if(data !== undefined && data !== "" && data !== null)
          return data.reduce(function (value, obj) {
            (value[obj[key]] = value[obj[key]] || []).push(obj);
            return value;
          }, {});
        else return {};
      } catch(err) {
        var errorObj = {
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
    filterRecordsList : function(data) {
      var scope = this;
      try {
      if(scope.filterAccounts && scope.filterType){
        var filterList = scope.filterAccounts.split(",");
        var filterVariable = scope.filterType;
        var filteredRecords = data.filter(function (record) {
          var removeRecord =  false;
          for(var i=0; i<filterList.length; i++) {
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
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "filterRecordsList",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Component setFlexVisibilty
     * To set all the flex visbility as off.
     **/
    setFlexVisibilty : function() {
      var scope = this;
      try {
      var widgets = scope.view.widgets();
      for(var i=0; i<widgets.length; i++) {
        widgets[i].isVisible = false;
      }
      scope.stack = [];
      scope.headerTitleStack = [];
      scope.contactList = [];
      scope.keypadString = '0.00',
      scope.isPeriodUsed = false;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setFlexVisibilty",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : bindContactTypeMasterData
	* Responsible to map contact type screen segment data
	* @return : NA
	*/
    bindContactTypeMasterData : function() {
      var scope = this;
      try {
      var contactTypeMasterData = scope.getSegmentMasterData("segContactType", "segmentUI", "backendMapping");
      var contactList = [];
      for(var i = 0; i < contactTypeMasterData.length;i++) {
        var contactTypeList = {};
        contactTypeList["lblContactType"] = {
          "skin" : "ICSknLbl42424215pxmb",
          "text": contactTypeMasterData[i][0]
        };
        contactTypeList["backendIDValue"] = contactTypeMasterData[i][1];
        if(scope.view.lblField2Value.text === contactTypeMasterData[i][0])
        {
          contactTypeList["flxContactTypeMain"] = {
            "skin" : "ICSknFlxF6F6F6Radius26px"           
          };
        } else {
          contactTypeList["flxContactTypeMain"] = {
            "skin" : ""
          };
        }
        contactList.push(contactTypeList);          
      } 
      var widgetMap = {
        "flxContactTypeMain" : "flxContactTypeMain",
        "lblContactType" : "lblContactType",
        "backendIDValue" : "backendIDValue"
      };
      scope.view.segContactType.widgetDataMap = widgetMap;
      scope.view.segContactType.setData(contactList);
      scope.view.segContactType.onRowClick = scope.onContactTypeSelection.bind(scope);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "bindContactTypeMasterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setConfirmDetailsActions
	* Responsible to map confirm detail screen Actions.
	* @return : NA
	*/
    setConfirmDetailsActions : function() {
      var scope = this;
      try {
      var currentContactType = scope.view.lblField2Value.text;
      scope.view.flxField2.onClick = function() {
        scope.bindContactTypeMasterData();
        scope.navigateTo("flxContactType", scope.businessController.getDataBasedOnDataMapping("lblContactTypeHeader", scope._dataMapping));
      };
      scope.view.flxField3.onClick = function() {
        if((currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo") || currentContactType === kony.i18n.getLocalizedString("i18n.payments.eMail"))) {
          if(scope.contactList.length > 1) {
            scope.view.lblPhnoSubHeader.text = (currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo")) ? scope.businessController.getDataBasedOnDataMapping("lblPreferredMobile", scope._dataMapping) : scope.businessController.getDataBasedOnDataMapping("lblPreferredEmail", scope._dataMapping);
            scope.navigateTo("flxPhnoEmailDetails", currentContactType);
            scope.businessController.updateDataInCollection(scope.contactList,"segContactDetails", scope._dataMapping);
          }
        } else {
          scope.setNationalIDScreenActions();
          scope.navigateTo("flxNationalID", currentContactType);
        }
      };
      scope.view.flxField4.onClick = function() {
        scope.businessController.invokeCustomVerbforDepositAccount();
        scope.navigateTo("flxDepositAccounts", scope.businessController.getDataBasedOnDataMapping("lblDepositAccountHeader", scope._dataMapping));
      };
      scope.view.flxField5.onClick = function() {
        scope.setTransferLimitActions();
        scope.navigateTo("flxTransferLimit", scope.businessController.getDataBasedOnDataMapping("lblTransferLimit", scope._dataMapping));
      };
      scope.view.btnCTAButton1.onClick = function() {
        scope.setActivateP2PGuideliness();
        scope.navigateTo("flxActivateP2P", scope.businessController.getDataBasedOnDataMapping("lblHeaderActivateP2P", scope._dataMapping));
      };
     } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setConfirmDetailsActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : bindCurrencyMasterData
	* Responsible to map currency options in  screen segment data
	* @return : NA
	*/
    bindCurrencyMasterData : function() {
      var scope = this;
      try {
      var masterData = scope.getSegmentMasterData("segCurrency", "segmentUI", "backendMapping");
      var currentOption = !scope.isEmptyNullUndefined(scope.businessController.getDataBasedOnDataMapping("segCurrencyOption", scope._dataMapping)) ? scope.businessController.getDataBasedOnDataMapping("segCurrencyOption", scope._dataMapping) : "USD";
      var currencyList = [];
      for(var i = 0; i < masterData.length;i++) {
        var segmentJSON = {};
        segmentJSON["lblFrequency"] = {
          "skin" : "ICSknLbl42424215pxmb",
          "text": masterData[i][0]
        };
        segmentJSON["backendIDValue"] = masterData[i][1];
        if(currentOption === masterData[i][0])
        {
          segmentJSON["flxMain"] = {
            "skin" : "ICSknFlxF6F6F6Radius26px"           
          };
        } else {
          segmentJSON["flxMain"] = {
            "skin" : ""
          };
        }
        currencyList.push(segmentJSON);          
      } 
      var widgetMap = {
        "flxMain" : "flxMain",
        "lblFrequency" : "lblFrequency",
        "backendIDValue" : "backendIDValue"
      };
      scope.view.segCurrency.widgetDataMap = widgetMap;
      scope.view.segCurrency.setData(currencyList);
      scope.view.segCurrency.onRowClick = scope.onCurrencySelection.bind(scope);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "bindCurrencyMasterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getSegmentMasterData
	* Responsible to group data based on field mappings
	* @return : Array
	*/
    getSegmentMasterData : function(segmentName, UIMappingData, BackendMappingData) {
      var scope = this;
      try {
      var dataMapping =  JSON.parse(JSON.stringify(scope._dataMapping));
      var segWidgetLabel = {};
      var segWidgetBackendMapping = {};
      if(dataMapping["segments"] && dataMapping["segments"][segmentName]) {
        segWidgetLabel = dataMapping["segments"][segmentName][UIMappingData];
        if(!kony.sdk.isNullOrUndefined(BackendMappingData) && BackendMappingData !== "") {
        segWidgetBackendMapping = dataMapping["segments"][segmentName][BackendMappingData];
        }
      }
      var masterData= [];
      for(var key in segWidgetLabel) {
       var groupData = [];
        segWidgetLabel[key] = scope.getFieldValueFromMapping(segWidgetLabel[key]);
        groupData.push(segWidgetLabel[key]);
        if(!kony.sdk.isNullOrUndefined(BackendMappingData) && BackendMappingData !== "") {
        groupData.push(segWidgetBackendMapping[key + "Value"]);
        }
        masterData.push(groupData);
      }
      return masterData;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getSegmentMasterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setContactListDatainSegment
	* To set the segment field value based on contract mappings.
	* @return : Array
	*/
    setContactListDatainSegment : function() {
      var scope = this;
      try {
      var contactArrayList = [],primaryDetail,currentContactType;
      primaryDetail = scope.view.lblField3Value.text;
      currentContactType = scope.view.lblField2Value.text;
      var ContactList = scope.businessController.getDataBasedOnDataMapping("segContactDetails", scope._dataMapping);
      for (var each in ContactList) {
        if(scope.isEmptyNullUndefined(ContactList[each].Description)) {
          ContactList[each].Description = currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo") ? "Alternate Mobile" : "Alternate Email";
        }
        var segmentData = {
          "lblField1" :  ContactList[each].isPrimary === "true" ? ContactList[each].Description + ":" + kony.i18n.getLocalizedString("i18n.P2PActivation.primary") : ContactList[each].Extension +":",
          "lblField2" :  currentContactType === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo") ? scope.formatPhoneNumber(ContactList[each].Value) : ContactList[each].Value,
          "imgPrimary" : (ContactList[each].Value === primaryDetail || primaryDetail === scope.formatPhoneNumber(ContactList[each].Value)) ? {"isVisible": true} : {"isVisible":false},
        };
        contactArrayList.push(segmentData);
      }
      scope.view.segVerticalDetails.setData(contactArrayList);
      scope.view.segVerticalDetails.onRowClick = scope.onPrimaryContactSelection.bind(scope);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setContactListDatainSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setActivateP2PGuideliness
	* Binds the events and screen navigations of Activate P2P Screen.
	* @return : Array
	*/
    setActivateP2PGuideliness : function() {
      var scope = this; 
      try {
      scope.view.imgCheckbox.src = "inactive_checkbox.png";
      var terms_conditions =  kony.i18n.getLocalizedString("i18n.common.TnC");
      scope.view.rtxAgreeTermsandCondition.text = kony.i18n.getLocalizedString("i18n.P2P.TC") + " " + terms_conditions.fontcolor('#4176A4');
      scope.disableButton("btnActivateP2PContinue");
      scope.view.lblActivate.text = scope.businessController.getDataBasedOnDataMapping("lblGuidelinessDescription", scope._dataMapping);
      scope.bindActivationGuidelinesMasterData();
      scope.view.flxCbxImageContainer.onTouchStart = function() {
        scope.onTermsandConditionsAgree();
      };
      scope.view.flxAgreeTC.onTouchStart = function() {
        scope.navigateTo("flxTermsandConditions", scope.businessController.getDataBasedOnDataMapping("lblTermsandConditions", scope._dataMapping));
        scope.view.rtTermsConditionContent.setVisibility(!CommonUtilities.isMirrorLayoutEnabled());
        scope.view.rtTermsConditionContentArb.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
      };
      scope.view.btnActivateP2PContinue.onClick = function() {
        scope.businessController.invokeCustomVerbforActivateP2P();
      };
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setActivateP2PGuideliness",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : bindActivationGuidelinesMasterData
	* Responsible to map Guidelines options.
	* @return : NA
	*/
    bindActivationGuidelinesMasterData : function() {
      var scope = this;
      try {
      var masterData = scope.getSegmentMasterData("segActivationGuideliness", "segmentUI", "");
      var featureList = [];
      for(var i = 0; i < masterData.length;i++){
        var segmentJSON = {};
        segmentJSON["lblService"] = {
          "skin" : "sknLbl424242SSP93prSansRegularPro",
          "text": masterData[i][0]
        };
        segmentJSON["lblBullet"] = {
          "skin" : "sknLblcfcfcfOp100cfcfcf100Radius"
        };
        featureList.push(segmentJSON);          
      } 
      var widgetMap = {
        "lblService" : "lblService",
        "lblBullet" : "lblBullet",
      };
      scope.view.segActivationGuidelines.widgetDataMap = widgetMap;
      scope.view.segActivationGuidelines.setData(featureList);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "bindActivationGuidelinesMasterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**     
     * Component onTermsandConditionsAgree
     * switches the options on toggle event. 
     */
    onTermsandConditionsAgree : function() {
      var scope = this;
      try {
        if(scope.view.imgCheckbox.src === "inactive_checkbox.png") {
          scope.view.imgCheckbox.src = "checkbox.png";
          scope.enableButton("btnActivateP2PContinue");
        } else if(scope.view.imgCheckbox.src === "checkbox.png") {
          scope.view.imgCheckbox.src = "inactive_checkbox.png";
          scope.disableButton("btnActivateP2PContinue");
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onTermsandConditionsAgree",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

     /**     
     * Component onPrimaryContactSelection
     * To pass the selected primary data to next screen.
     */
    onPrimaryContactSelection : function() {
      var scope = this;
      try {
      var segmentData = JSON.parse(JSON.stringify(scope.view.segVerticalDetails.data));
      var selectedData = scope.view.segVerticalDetails.selectedRowItems;  
      var selectedRow = scope.view.segVerticalDetails.selectedRowIndex[1];            
      for(var i = 0; i < segmentData.length; i++) {         
        segmentData[i]["imgPrimary"] = {
           "isVisible" : false           
        };                    
      }
      selectedData[0]["imgPrimary"] = {
        "isVisible" : true             
      };
      scope.view.segVerticalDetails.setData(segmentData);       
      scope.view.segVerticalDetails.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblField2;
      scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
      if(scope.view.lblField2Value.text === kony.i18n.getLocalizedString("i18n.konybb.manageUser.PhoneNo")) {
        scope.businessController.updateDataInCollection(updateOption,"phoneValue", scope._dataMapping);
      } else {
        scope.businessController.updateDataInCollection(updateOption,"emailValue", scope._dataMapping);
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onPrimaryContactSelection",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**     
	 * Component setTransferLimitValue
     * To bind transfer limit widget actions and update data in collection.
     * return NA
     */
    setTransferLimitActions : function() {
      var scope = this;
      try {
      var transferLimit = scope.businessController.getDataBasedOnDataMapping("tbxTransferLimit", scope._dataMapping);
      if(!kony.sdk.isNullOrUndefined(transferLimit) && transferLimit !== "" && transferLimit !== kony.i18n.getLocalizedString("kony.mb.common.add")) {
        scope.view.lblDollar.text = transferLimit.substring(1);
        scope.enableButton("btnAmountContinue");
      } else {
        scope.view.lblCurrencyDropdown.text = "USD";
        scope.view.lblDollar.text = "0.00";
        scope.keypadString = "0.00";
        scope.disableButton("btnAmountContinue");
      }
      for(var i=0; i<=9; i++) {
        scope.view["btn" +i].onClick = scope.setTransferLimitValue.bind(scope, i);
      }
      scope.view.flxClearImage.onTouchStart = scope.clearAmountKeypadChar.bind(scope);
      scope.view.ImageClear.onTouchEnd = scope.clearAmountKeypadChar.bind(scope);
      scope.view.flxCurrencyWrapper.onTouchEnd = function() {
        scope.bindCurrencyMasterData();
        scope.navigateTo("flxCurrency", scope.businessController.getDataBasedOnDataMapping("lblCurrencyHeader", scope._dataMapping));
      };
      scope.view.btnAmountContinue.onClick = function() {
          var getFieldKey = scope.getMappedValueForWidget("tbxTransferLimit", scope._dataMapping);
          var data = scope.businessController.getFormattedData(scope._serviceParameters.ActivateP2P.Object, scope.keypadString, getFieldKey);
          scope.businessController.updateDataInCollection(data,"tbxTransferLimit", scope._dataMapping);
      };
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setTransferLimitActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**     
	 * Component setTransferLimitValue
     * To set the key and update the value based on clicked button in keyboard
     * char - parameter contain the clicked keyboard button value
     */
    setTransferLimitValue : function(char) {
      var scope = this;
      try {
      if (char === '.') {
        if (scope.isPeriodUsed === false) {
          scope.isPeriodUsed = true;
        } else {
          return;
        }
      }
      scope.keypadString = scope.keypadString + char;
      var firstChar = scope.keypadString[0];
      scope.keypadString = scope.keypadString.split("");
      for (var i = 1; i < scope.keypadString.length; i++) {
        if (scope.keypadString[i] === '.') {
          scope.keypadString[i - 1] = scope.keypadString[i + 1];
          i++;
        } else {
          scope.keypadString[i - 1] = scope.keypadString[i];
        }
      }
      scope.keypadString = scope.keypadString.join("");
      scope.keypadString = scope.keypadString.substr(0, scope.keypadString.length - 1);
      if (firstChar !== '0') {
        scope.keypadString = firstChar + scope.keypadString;
      }
      scope.updateAmountValue();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setTransferLimitValue",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
	 * Component clearAmountKeypadChar
     * To clear the data one by one while clicking on clear button from keyboard
     */  
    clearAmountKeypadChar : function () {
      var scope = this;
      try {
      if (scope.keypadString === '0.00') return;
      scope.keypadString = scope.keypadString.split("");
      for (var i = scope.keypadString.length - 2; i >= 0; i--) {
        if (scope.keypadString[i] === '.') {
          scope.keypadString[i + 1] = scope.keypadString[i - 1];
          i--;
        } else {
          scope.keypadString[i + 1] = scope.keypadString[i];
        }
      }
      scope.keypadString = scope.keypadString.join("");
      scope.keypadString = scope.keypadString.substr(1);
      if (scope.keypadString[0] === '.') {
        scope.keypadString = '0' + scope.keypadString;
      }
      scope.updateAmountValue();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "clearAmountKeypadChar",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
	 * Component clearAmountKeypad
     * To clear all the data while clicking on clear image
     */ 
    clearAmountKeypad : function() {
      var scope = this;
      try {
      scope.keypadString ='0.00';
      scope.updateAmountValue();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "clearAmountKeypad",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
	 * Component updateAmountValue
     * To updating values by clicking the value from keyborad 
     */  
    updateAmountValue : function () {
      var scope = this;
      try {
      var getFieldKey = scope.getMappedValueForWidget("tbxTransferLimit", scope._dataMapping);
      if (scope.keypadString === '0.00' || scope.keypadString === '0') {
        scope.view.lblDollar.text = scope.businessController.getFormattedData(scope._serviceParameters.ActivateP2P.Object, this.keypadString, getFieldKey).substring(1);
        scope.view.ImageClear.setVisibility(false);
        scope.disableButton("btnAmountContinue");
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
        scope.view.lblDollar.text = (scope.businessController.getFormattedData(scope._serviceParameters.ActivateP2P.Object, this.keypadString, getFieldKey)).substring(1);
        scope.view.ImageClear.setVisibility(true);
        scope.enableButton("btnAmountContinue");
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "updateAmountValue",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
     * Component onContactTypeSelection
     * To pass the selected currency to next screen.
     * @return NA.
     */
   onCurrencySelection : function() {
      var scope = this;
     try {
      var segmentData = JSON.parse(JSON.stringify(scope.view.segCurrency.data));
      var selectedData = scope.view.segCurrency.selectedRowItems;  
      var selectedRow = scope.view.segCurrency.selectedRowIndex[1];            
      for(var i = 0; i < segmentData.length; i++) {         
        segmentData[i]["flxMain"] = {
          "skin" : ""            
        };                    
      }
      selectedData[0]["flxMain"] = {
        "skin" : "ICSknFlxF6F6F6Radius26px"              
      };
      scope.view.segCurrency.setData(segmentData);       
      scope.view.segCurrency.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblFrequency.text;
      scope.navigateTo("flxTransferLimit", scope.businessController.getDataBasedOnDataMapping("lblTransferLimit", scope._dataMapping));
      scope.businessController.updateDataInCollection(kony.i18n.getLocalizedString("kony.mb.common.add"),"tbxTransferLimit", scope._dataMapping);
      scope.businessController.updateDataInCollection(updateOption,"segCurrencyOption", scope._dataMapping);
     } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onCurrencySelection",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
     * Component setTransferLimitTextBoxValue
     * To map the field value based on data mappings.
     */
    setTransferLimitTextBoxValue : function() {
      var scope = this;
      try {
      var serviceParamters = scope.serviceParameters;
      var transferLimit = scope.businessController.getDataBasedOnDataMapping("tbxTransferLimit", scope._dataMapping);
      if(!scope.isEmptyNullUndefined(scope.businessController.getDataBasedOnDataMapping("tbxCurrency", scope._dataMapping)) && transferLimit === kony.i18n.getLocalizedString("kony.mb.common.add")) {
        scope.view.lblCurrencyDropdown.text = scope.businessController.getDataBasedOnDataMapping("tbxCurrency", scope._dataMapping);
        scope.view.lblDollar.text = "0.00";
        scope.keypadString = "0.00";
        scope.disableButton("btnAmountContinue");
      }
      if(transferLimit !== kony.i18n.getLocalizedString("kony.mb.common.add")) {
        if(serviceParamters["validateTransferLimit"].Service !== "" && serviceParamters["validateTransferLimit"].Object !== "") {
          if(!scope.collectionObj.Collection.hasOwnProperty(serviceParamters["validateTransferLimit"].Object) && !scope.collectionObj.Collection.hasOwnProperty("invokeCustomVerbToValidateTransferLimit")) {
            scope.businessController.invokeCustomVerbToValidateTransferLimit();
          } else if(scope.collectionObj.Collection.hasOwnProperty(serviceParamters["validateTransferLimit"].Object)) {
            scope.navigateToP2PActivationFlow();
            scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
          }
        }  else {
          scope.navigateToP2PActivationFlow();
          scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
        }
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setTransferLimitTextBoxValue",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**     
     * Component onContactTypeSelection
     * To pass the selected contact type to next screen.
     */
    onContactTypeSelection : function() {
      var scope = this;
      try {
      var segmentData = JSON.parse(JSON.stringify(scope.view.segContactType.data));
      var selectedData = scope.view.segContactType.selectedRowItems;  
      var selectedRow = scope.view.segContactType.selectedRowIndex[1];            
      for(var i = 0; i < segmentData.length; i++) {         
        segmentData[i]["flxContactTypeMain"] = {
          "skin" : ""            
        };                    
      }
      selectedData[0]["flxContactTypeMain"] = {
        "skin" : "ICSknFlxF6F6F6Radius26px"              
      };
      scope.view.segContactType.setData(segmentData);       
      scope.view.segContactType.setDataAt(selectedData[0], selectedRow);
      var updateOption = selectedData[0].lblContactType.text;
      var id = selectedData[0].backendIDValue;
      if(id === "National ID") {
        scope.businessController.resetServiceResponse("dvfError");
        scope.setNationalIDScreenActions();
        scope.navigateTo("flxNationalID", scope.businessController.getDataBasedOnDataMapping("lblNationalIDHeader", scope._dataMapping));
      } else {
        scope.navigateTo("flxConfirmDetails", scope.businessController.getDataBasedOnDataMapping("lblActivateP2P", scope._dataMapping));
      }
      scope.businessController.updateDataInCollection(updateOption,"field2Value", scope._dataMapping);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "onContactTypeSelection",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**
	* @api : setNationalIDScreenActions
 	* binds widgets actionns for National ID Screen.
	* @return : NA
	*/
    setNationalIDScreenActions : function() {
      var scope = this;
      try {
      var nationalID = scope.businessController.getDataBasedOnDataMapping("nationalIDValue", scope._dataMapping);
      if(!kony.sdk.isNullOrUndefined(nationalID) && nationalID !== "") {
        scope.view.txtNationalID.text = nationalID;
        scope.enableButton("btnNationalIDContinue");
      } else {
        scope.view.txtNationalID.text = "";
        scope.disableButton("btnNationalIDContinue");
      }
      scope.view.txtNationalID.onTextChange = function() {
        var DataJSON = {
          "nationalID": scope.view.txtNationalID.text,
        };
        scope.businessController.minFillValidate(DataJSON);
        scope.businessController.maxFillValidate(DataJSON);
      };
      scope.view.btnNationalIDContinue.onClick = function() {
        scope.processDataValidation(scope.view.txtNationalID, "nationalIDValue");
      };
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setNationalIDScreenActions",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**
	* @api : processDataValidation
 	* makes data ready for performing data valodation
	* @return : NA
	*/
    processDataValidation : function (widgetScope, widgetName) {
      var scope = this;
      try {
      var mappedValueForWidget = scope.getMappedValueForWidget(widgetName, scope._dataMapping);
      var inputData = widgetScope.text;
      if(inputData) {
        scope.businessController.performDataValidation(inputData, mappedValueForWidget, widgetName, scope._dataMapping);
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "processDataValidation",
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
      var scope = this;
      try {
      for(var record in dataMapping) {
        var keyValues = dataMapping[record];
        for(var key in keyValues) {
          if(widget === key) {
            var fieldValue = dataMapping[record][widget];
            fieldValue = fieldValue.split(".")[2].replace("}","");
            return fieldValue;
          } } }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "getMappedValueForWidget",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   ** Component navigateTo
   * Using navigateTo we navigate one form to another form in that we store formName in a stack
   * @param {string} flxName , navigates to that form.
   * @param {string} headerTitle , Header title.
   */
    navigateTo : function(flxName, headerTitle) {
      var scope = this;
      try {
      if(flxName) {
        this.stack.push(flxName);
        var stackLength = this.stack.length;
        var nextScreen = this.stack[stackLength - 1];
        var currentScreen = this.stack[stackLength - 2];
        if(currentScreen !== null && currentScreen !== undefined) {
          scope.view[currentScreen].setVisibility(false);
        }
        this.view[nextScreen].setVisibility(true);
        if(!scope.isEmptyNullUndefined(headerTitle)) {
          scope.headerTitleStack.push(headerTitle);
          var properties = {
            "stack" : scope.stack,
            "headerTitle": headerTitle
          };
          this.HeaderProperties(properties);
        }
        scope.view.forceLayout();
      }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "navigateTo",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * Using goBack we navigates to previous form from the current form
      * @param {string} navDetails , which contains all the details about current form
      */
    goBack : function() {
      var scope = this;
      try {
      var stackLength = scope.stack.length;
      var currentScreen = scope.stack[stackLength - 1];
      var previousScreen = scope.stack[stackLength - 2];
      scope.view[previousScreen].setVisibility(true);
      scope.view[currentScreen].setVisibility(false);
      scope.stack.pop();
      scope.headerTitleStack.pop();
      var nativeTitle = scope.headerTitleStack[scope.headerTitleStack.length - 1];
      var properties = {
        "stack" : scope.stack,
        "headerTitle": nativeTitle,
      };
      this.HeaderProperties(properties);
      scope.view.forceLayout();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "goBack",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined : function (data) {
      var scope = this;
      try {
      if (data === null || data === undefined || data === "") {
        return true;
      }
      return false;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "isEmptyNullUndefined",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @Component : enableButton
     * To set skin and enable specific button.
     * @return : NA
     */
    enableButton : function(btnName) {
      var scope = this;
      try {
      scope.view[btnName].setEnabled(true);
      scope.view[btnName].skin = "ICSknBtn003E7535PXmb";
      scope.view[btnName].focusSkin = "ICSknBtn003E7535PXmb";
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "enableButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @Component : disableButton
     * To set skin and disable specific button.
     * @return : NA
     */
    disableButton : function(btnName) {
      var scope = this;
      try {
      scope.view[btnName].setEnabled(false);
      scope.view[btnName].skin = "ICSknBtnInactive";
      scope.view[btnName].focusSkin = "ICSknBtnInactive";
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "disableButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  };
});