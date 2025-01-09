define(['./AcknowledgementComponentBusinessController','./AcknowledgementComponentStore', 'ComponentUtility'], function(BusinessController, AcknowledgementComponentStore, ComponentUtility) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.context = {};
      this.businessController = new BusinessController();
      this.componentUtility = new ComponentUtility();
      AcknowledgementComponentStore.subscribe(this.render.bind(this));
      this.store = AcknowledgementComponentStore;
      this.businessController.store = this.store;
      this.context = {};
      this.collectionObj = AcknowledgementComponentStore.getState();
      this.labelSkin = "sknMMLeftLabels";
      this.labelValue = "sknLbl424242SSpRegular35px";
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
      defineGetter(this, 'rowTemplateConfig', () => {
        return this._rowTemplateConfig;
      });
      defineSetter(this, 'rowTemplateConfig', value => {
        this._rowTemplateConfig = value;
      });
    },

    /**
	* @api : preShow
 	* Gets invoked initially before rendering of UI
	* @return : NA
	*/
    preShow: function() {
      var scope = this;
      this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this._dataMapping);
      this.resetData();
      var deviceName= kony.os.deviceInfo()["name"];
      if(deviceName === "iPhone")
      {
        scope.view.lblAcknowledgement.top = "10dp";
        scope.view.flxMain.top = "60dp";
      }
      scope.view.lblAcknowledgement.text = this.businessController.getDataBasedOnDataMapping("lblAcknowledgement", this._dataMapping);
      scope.view.lblAcknowledgement.skin = "ICSknHeaderFFF34px";
      scope.view.flxHeader.skin = "sknFlx0095e4";
      scope.view.imgBack.src = "backbutton.png";
      scope.setSegmentTemplate();
      this.businessController.setDataInCollection(this.context);
      this.initActions();
    },
    
    /**
	* @api : initActions
 	* Bind actions for UI Widget
	* @return : NA
	*/
    initActions: function() {
      var scope = this;

      scope.view.imgBack.onTouchStart = function(){
        scope.onBack();
      };
      var btnId1 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction1", this._dataMapping);
      scope.view.btnSuccessAction1.onClick = function() {
        scope.contextualActionButtonOnClick(btnId1,scope.context);
      };
      var btnId2 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction2", this._dataMapping);
      scope.view.btnSuccessAction2.onClick = function() {
        scope.contextualActionButtonOnClick(btnId2,scope.context);
      };
      var btnId3 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction3", this._dataMapping);
      scope.view.btnSuccessAction3.onClick = function() {
        scope.contextualActionButtonOnClick(btnId3,scope.context);
      };
      var btnId4 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction4", this._dataMapping);
      scope.view.btnSuccessAction4.onClick = function() {
        scope.contextualActionButtonOnClick(btnId4,scope.context);
      };
      var btnId5 = this.businessController.getDataBasedOnDataMapping("btnFailureAction1", this._dataMapping);
      scope.view.btnFailureAction1.onClick = function() {
        scope.contextualActionButtonOnClick(btnId5,scope.context);
      };
    },

    /**
	* @api : renderSuccessOrFailureUI
 	* Renders Success or Error Container
	* @return : NA
	*/
    renderSuccessOrFailureUI : function() {
      var scope = this;
      if(!scope.isEmptyNullUndefined(this.businessController.getDataBasedOnDataMapping("transactionID", this._dataMapping)))
      {
        scope.view.flxSuccess.setVisibility(true);
        scope.view.flxSuccessButtons.setVisibility(true);
        scope.view.flxFailureButtons.setVisibility(false);
        scope.view.flxFail.setVisibility(false);
        scope.bindDatatoSegment();
      }
      else
      {
        scope.view.flxSuccess.setVisibility(false);
        scope.view.flxFail.setVisibility(true);
        scope.view.flxSuccessButtons.setVisibility(false);
        scope.view.flxFailureButtons.setVisibility(true);
        scope.setFailureAcknowledgementDetails();
      }
    },

    /**
	* @api : setFailureAcknowledgementDetails
 	* Bind Error Details to Error Container
	* @return : NA
	*/
    setFailureAcknowledgementDetails : function()
   {
      var scope = this;
      try{
        scope.view.imgFail.src = "failed.png";
        var errorDetails = this.businessController.getDataBasedOnDataMapping("errorDetails", this._dataMapping);
        errorDetails = JSON.parse(errorDetails); 
        if (errorDetails.length > JSON.parse(this._dataMapping.maxLength)) {
          errorDetails = errorDetails.slice(0, JSON.parse(this._dataMapping.maxLength));
        }
        if(errorDetails.length>1) {
          for (i=0; i<errorDetails.length; i++)
          {
            errorDetails[i].imgIcon = "inactivegreydot.png";
          }
          scope.view.lblFailTitle.text = this.businessController.getDataBasedOnDataMapping("lblFailTitle", this._dataMapping);
          scope.view.lblFailTitle.skin = "sknLbl000000SSPSemiBold26px";
          scope.view.segErrorDetails.widgetDataMap = {"lblGenericMsgInfo":"message","imgIcon":"imgIcon"};
          scope.view.segErrorDetails.setData(errorDetails);
          scope.view.segErrorDetails.setVisibility(true);
        } else {
          //errorDetails[0].imgIcon = " ";
          scope.view.lblFailTitle.text = this.businessController.getDataBasedOnDataMapping("lblFailTitle", this._dataMapping);
          scope.view.lblFailTitle.skin = "sknLbl000000SSPSemiBold26px";
          scope.view.segErrorDetails.setVisibility(false);
         // scope.view.segErrorDetails.widgetDataMap = {"lblGenericMsgInfo":"message","imgIcon":"imgIcon"};
         // scope.view.segErrorDetails.setData(errorDetails);
        }
        try
        {
          let text = this.businessController.getDataBasedOnDataMapping("btnFailureAction1", this._dataMapping);
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnFailureAction1.text = text;
            scope.view.btnFailureAction1.skin= "ICSknBtn003E75RoundedffffffSSP26px";
            scope.view.btnFailureAction1.setVisibility(true);
          }
          else{
            scope.view.btnFailureAction1.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnFailureAction1.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set failure acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
      scope.view.forceLayout();
    },

    /**
	* @api : render
 	* Dispatch invokes render and sets the Initial container
	* @return : NA
	*/
    render : function() {  
      if(!this.view.flxDetails.isVisible)
        this.renderSuccessOrFailureUI();
    },

    /**
	* @api : bindDatatoSegment
 	* Helper method invoking various containers bind mehtods
	* @return : NA
	*/
    bindDatatoSegment : function() {  
      this.bindUIToSegment();
      this.bindUIToButtons();
      this.bindUIToSecondaryFields();
      this.bindUIToDocuments();
    },

    /**
	* @api : bindUIToDocuments
 	* Helper method bind documents data to the UI Contiainer
	* @return : NA
	*/
    bindUIToDocuments : function(){
      var scope = this;
      var documentsLabel = this.businessController.getDataBasedOnDataMapping("lblDocuementsLabel", this._dataMapping);
      var documentsValue = this.businessController.getDataBasedOnDataMapping("supportingDocuments", this._dataMapping);
      var documents = [],originalDocuments = {};
      if(!(scope.isEmptyNullUndefined(documentsLabel) || scope.isEmptyNullUndefined(documentsValue)))
      {
        scope.view.lblDocuementsLabel.text = documentsLabel;
        scope.view.lblDocuementsLabel.skin = this.labelSkin;
        scope.view.flxDocuments.setVisibility(true);
        documentsValue = documentsValue.split(',');
        originalDocuments = this.businessController.getDataBasedOnDataMapping("originalDocuments", this._dataMapping);
        for (var j=0; j<documentsValue.length; j++)
        {
          documents[j] = {
            "fileName" : {
              "text" : documentsValue[j],
              "skin" : this.labelValue
            },
            "imageName" : originalDocuments[documentsValue[j]].filetype,
            "flxAttachmentRemove" : {
              "isVisible" : false
            },
          };
        }
        var mapping = {
          "imgAttachment" : "imageName",
          "lblAttachment" : "fileName",
          "flxAttachmentRemove" : "flxAttachmentRemove"
        };
        scope.view.segAttachments.widgetDataMap = mapping;
        scope.view.segAttachments.setData(documents);
      }
    },

    /**
	* @api : bindUIToSecondaryFields
 	* Helper method bind optional data to the UI Contiainer
	* @return : NA
	*/
    bindUIToSecondaryFields : function() {
      var scope = this;
      var notesLabel = this.businessController.getDataBasedOnDataMapping("lblNotesLabel", this._dataMapping);
      var notesValue = this.businessController.getDataBasedOnDataMapping("lblNotesValue", this._dataMapping);
      if(!(scope.isEmptyNullUndefined(notesLabel) || scope.isEmptyNullUndefined(notesValue)))
      {
        scope.view.lblNotesLabel.text = notesLabel;
        scope.view.lblNotesLabel.skin = this.labelSkin;
        scope.view.lblNotesValue.text = notesValue;
        scope.view.lblNotesValue.skin = this.labelValue;
        scope.view.flxNotes.setVisibility(true);
      }

      var addressLabel = this.businessController.getDataBasedOnDataMapping("lblAddressLabel", this._dataMapping);
      if(!scope.isEmptyNullUndefined(addressLabel))
      {
        scope.view.lblAddressLabel.text = addressLabel;
        scope.view.lblAddressLabel.skin = this.labelSkin;
      }
      var address1 = this.businessController.getDataBasedOnDataMapping("lblAddress1", this._dataMapping);
      this.view.lblAddress1.setVisibility(false);
      if(!scope.isEmptyNullUndefined(address1))
      {
        scope.view.lblAddress1.text = address1;
        scope.view.lblAddress1.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.lblAddress1.setVisibility(true);
      }
      var address2 = this.businessController.getDataBasedOnDataMapping("lblAddress2", this._dataMapping);
      this.view.lblAddress2.setVisibility(false);
      if(!scope.isEmptyNullUndefined(address2))
      {
        scope.view.lblAddress2.text = address2;
        scope.view.lblAddress2.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.lblAddress2.setVisibility(true);
      }
      var mobileLabel = this.businessController.getDataBasedOnDataMapping("lblMobileLabel", this._dataMapping);
      var mobileValue = this.businessController.getDataBasedOnDataMapping("lblMobileValue", this._dataMapping);
      this.view.flxMobile.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(mobileLabel) || scope.isEmptyNullUndefined(mobileValue)))
      {
        scope.view.lblMobileLabel.text = mobileLabel;
        scope.view.lblMobileLabel.skin = this.labelSkin;
        scope.view.lblMobileValue.text = mobileValue;
        scope.view.lblMobileValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxMobile.setVisibility(true);
      }
      var emailLabel = this.businessController.getDataBasedOnDataMapping("lblEmailLabel", this._dataMapping);
      var emailValue = this.businessController.getDataBasedOnDataMapping("lblEmailValue", this._dataMapping);
      this.view.flxEmail.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(emailLabel) || scope.isEmptyNullUndefined(emailValue)))
      {
        scope.view.lblEmailLabel.text = emailLabel;
        scope.view.lblEmailLabel.skin = this.labelSkin;
        scope.view.lblEmailValue.text = emailValue;
        scope.view.lblEmailValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxEmail.setVisibility(true);
      }
      var cityLabel = this.businessController.getDataBasedOnDataMapping("lblCityLabel", this._dataMapping);
      var cityValue = this.businessController.getDataBasedOnDataMapping("lblCityValue", this._dataMapping);
      this.view.flxCity.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(cityLabel) || scope.isEmptyNullUndefined(cityValue)))
      {
        scope.view.lblCityLabel.text = cityLabel;
        scope.view.lblCityLabel.skin = this.labelSkin;
        scope.view.lblCityValue.text = cityValue;
        scope.view.lblCityValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxCity.setVisibility(true);
      }
      var stateLabel = this.businessController.getDataBasedOnDataMapping("lblStateLabel", this._dataMapping);
      var stateValue = this.businessController.getDataBasedOnDataMapping("lblStateValue", this._dataMapping);
      this.view.flxState.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(stateLabel) || scope.isEmptyNullUndefined(stateValue)))
      {
        scope.view.lblStateLabel.text = stateLabel;
        scope.view.lblStateLabel.skin = this.labelSkin;
        scope.view.lblStateValue.text = stateValue;
        scope.view.lblStateValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxState.setVisibility(true);
      }
      var countryLabel = this.businessController.getDataBasedOnDataMapping("lblCountryLabel", this._dataMapping);
      var countryValue = this.businessController.getDataBasedOnDataMapping("lblCountryValue", this._dataMapping);
      this.view.flxCountry.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(countryLabel) || scope.isEmptyNullUndefined(countryValue)))
      {
        scope.view.lblCountryLabel.text = countryLabel;
        scope.view.lblCountryLabel.skin = this.labelSkin;
        scope.view.lblCountryValue.text = countryValue;
        scope.view.lblCountryValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxCountry.setVisibility(true);
      }
      var postalCodeLabel = this.businessController.getDataBasedOnDataMapping("lblPostalCodeLabel", this._dataMapping);
      var postalCodeValue = this.businessController.getDataBasedOnDataMapping("lblPostalCodeValue", this._dataMapping);
      this.view.flxPostalCode.setVisibility(false);
      if(!(scope.isEmptyNullUndefined(postalCodeLabel) || scope.isEmptyNullUndefined(postalCodeValue)))
      {
        scope.view.lblPostalCodeLabel.text = postalCodeLabel;
        scope.view.lblPostalCodeLabel.skin = this.labelSkin;
        scope.view.lblPostalCodeValue.text = postalCodeValue;
        scope.view.lblPostalCodeValue.skin = this.labelValue;
        scope.view.flxAddress.setVisibility(true);
        this.view.flxPostalCode.setVisibility(true);
      }
    },

    /**
	* @api : bindUIToButtons
 	* Helper method bind skin and text to the UI widgets
	* @return : NA
	*/
    bindUIToButtons : function() {
      var scope =this;
      for(let i=1;i<=4;i++){
        let widgetId = "btnSuccessAction"+i;
        try
        {
          let text = this.businessController.getDataBasedOnDataMapping(widgetId, this._dataMapping);
          if(!scope.isEmptyNullUndefined(text)){
            scope.view[widgetId].text = text;
            if(i === 1)
              scope.view[widgetId].skin= "ICSknBtn003E75RoundedffffffSSP26px";
            else
              scope.view.btnSuccessAction2.skin= "ICSknBtnffffffRounded003e75SSP26px";
            scope.view[widgetId].setVisibility(true);
            var transferType = scope.context.transferTypeContext;
            if (scope.view[widgetId].text === kony.i18n.getLocalizedString("i18n.payments.saveNewPayee")) {
              if (scope.checkUserPermissionForTransferType(transferType))
                scope.view[widgetId].setVisibility(true);
              else
                scope.view[widgetId].setVisibility(false);
            }
          }
          else{
            scope.view[widgetId].setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view[widgetId].setVisibility(false);
        }
      }
      if(this.view.btnSuccessAction3.isVisible === true){
        scope.view.flxMain.height = "61%";
      }
      else{
        scope.view.flxMain.height = "68%";
      }
    },
    checkUserPermissionForTransferType: function (transferType) {
      switch (transferType) {
        case kony.i18n.getLocalizedString("i18n.payments.domesticTransfer"):
          return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
        case kony.i18n.getLocalizedString("i18n.payments.internationalTransfer"):
          return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
        //osama//case kony.i18n.getLocalizedString("i18n.payments.withinSameBank"):
        case "Within Same Bank":
          return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT");
        case kony.i18n.getLocalizedString("i18n.payments.payAPerson"):
          return applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE_RECEPIENT");
        default:
          return false;
      }
    },

    /**
	* @api : bindUIToSegment
 	* Helper method bind segment data to the main UI Conatiner
	* @return : NA
	*/
    bindUIToSegment : function()
    {
      var scope = this,data = [];
      try{
        scope.view.imgSuccess.src = "success.png";
        scope.view.lblSuccess.text = this.businessController.getDataBasedOnDataMapping("lblSuccess", this._dataMapping);
        scope.view.lblSuccess.skin = "sknLbl000000SSPSemiBold26px";
        this.updateDocumentUploadIntoContext();
        data = this.getProcessedDataForSegment();
        scope.view.segDetails.widgetDataMap = this.getWidgetDataMap();
        scope.view.segDetails.setData(data);
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set success acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
      scope.view.forceLayout();
    },

    /**
     * Component getWidgetDataMap
     * @return datamap
     */
    getWidgetDataMap: function(){
      var datamapping = {
        "lblFieldLabel" : "lblFieldLabel",
        "lblFieldValue" : "lblFieldValue",
        "flxSeparator" : "flxSeparator"
      };
      return datamapping;
    },

    /**
     * Component getProcessedDataForSegment
     * prepares segment data
     * @return data
     */
    getProcessedDataForSegment:function () {
      var scope = this;
      var data = [];
      var fieldLabel = "",fieldValue = "", flxSeparator= "";
      for (var i=1;i<31;i++)
      {
        fieldLabel = this.businessController.getDataBasedOnDataMapping("fieldLabel"+i, this._dataMapping);
        fieldValue = this.businessController.getDataBasedOnDataMapping("fieldValue"+i, this._dataMapping);
        if(this.businessController.getDataBasedOnDataMapping("transferType", this._dataMapping) === "Domestic Transfer" || "International Transfer") {
          if(this.businessController.getDataBasedOnDataMapping("payeeType", this._dataMapping) === "Existing") {
            if(fieldLabel === 'Clearing Identifier Code:') {
              continue;
            } 
            if(fieldLabel === 'Street Name:') {
              continue;
            } 
            if(fieldLabel === 'Town:') {
              continue;
            } 
            if(fieldLabel === 'Country:') {
              continue;
            }
          }
        }

        if(!scope.isEmptyNullUndefined(fieldValue))
        {
          fieldLabel = {
            "text" : fieldLabel,
            "skin" : scope.labelSkin
          };
          flxSeparator = {
            "skin" : "sknFlxfafafa",
            "isVisible" : true,
          };
          fieldValue = {
            "text" : fieldValue,
            "skin" : this.labelValue
          };
          scope.view.flxDetails.setVisibility(true);
          data.push(
            {
              "lblFieldLabel" : fieldLabel,
              "lblFieldValue" : fieldValue,
              "flxSeparator"  : flxSeparator
            }
          );
        }
      }
      return data;
    },

    /**
     * Component updateDocumentUploadIntoContext
     * update documents status into the context.
     * @return NA
     */
    updateDocumentUploadIntoContext : function() {
      var scope = this;
      if(!scope.isEmptyNullUndefined(scope.context["faileduploads"]))
      {
        var errorObj =
            {
              "level" : "ComponentViewController",
              "method" : "bindUIToSegment",
              "error": scope.context["faileduploads"]
            };
        scope.onError(errorObj);
      }
      if((!scope.isEmptyNullUndefined(this.businessController.getDataBasedOnDataMapping("payeeType", this._dataMapping)) && this.businessController.getDataBasedOnDataMapping("payeeType", this._dataMapping) === "New") || 
         (!scope.isEmptyNullUndefined(this.businessController.getDataBasedOnDataMapping("transferType", this._dataMapping)) && 
          this.businessController.getDataBasedOnDataMapping("transferType", this._dataMapping) === "Pay a Person"))
      {
        if(!scope.isEmptyNullUndefined(this.businessController.getDataBasedOnDataMapping("originalDocuments", this._dataMapping)))
        {
          this.collectionObj = AcknowledgementComponentStore.getState();
          if(this.collectionObj["context"]){
            this.collectionObj["context"]["successfulUploads"] = Object.keys(this.businessController.getDataBasedOnDataMapping("originalDocuments", this._dataMapping)).toString();
            this.businessController.setDataInCollection(this.collectionObj["context"]);
          }
        }
        if(!scope.isEmptyNullUndefined(scope.context["notes"]))
        {
          if(this.collectionObj["context"]){
            this.collectionObj["context"]["transactionsNotes"] = this.businessController.getDataBasedOnDataMapping("lblNotes", this._dataMapping);
            this.businessController.setDataInCollection(this.collectionObj["context"]);
          }
        }

      }
    },

    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined : function(data) {
      if (data === null || data === undefined || data === "")
        return true;

      return false;
    },

    /**
	* @api : resetData
 	* Helper method bind resets the UI initially
	* @return : NA
	*/
    resetData : function()
    {
      var scope = this;
      scope.view.segAttachments.removeAll();
      scope.view.segDetails.removeAll();
      scope.view.flxAddress.setVisibility(false);
      scope.view.flxNotes.setVisibility(false);
      scope.view.flxDocuments.setVisibility(false);
      scope.view.flxDetails.setVisibility(false);
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
    
    /**
     * @api : setSegmentTemplate
     * Sets the template of segment based on contract property
     * @return : NA
     */
    setSegmentTemplate: function() {
      var scope = this;
      try{
        if (!scope.componentUtility.isEmptyNullUndefined(scope.componentUtility.getDynamicTemplateName(scope._rowTemplateConfig))) {
            scope.view.segDetails.rowTemplate = scope.componentUtility.getDynamicTemplateName(scope._rowTemplateConfig);
          }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SetSegmentTemplate",
              "error": err
            };
        scope.onError(errorObj);
      }
    }
  };
});