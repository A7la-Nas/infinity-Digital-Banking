define(['./LCIssuanceBusineessController', './LCIssuanceStore','DataValidationFramework/DataValidationHandler','FormatUtil'], function(BusinessController, LCIssuanceStore,DataValidationHandler,FormatUtil) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakoints = {};      
      LCIssuanceStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.dataValidationHandler = new DataValidationHandler();
      this.formatUtil = new FormatUtil();
      this.store = LCIssuanceStore;
      this.collectionObj = LCIssuanceStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.segReviewTempData = '';
      this.currentFlow = "Credit details";
      this.actualFlow = "Credit details";
      this.isCreateLCServiceCheck = false;
      this.isSaveAction = false;
      this.isSaveAndCloseAction = false;
      this.isDeleteAndCloseAction = false;
      this.allowSpacesAndSpecialCharacters = false;
      this.isSwiftCodeAvailable = false;
      this.importLcSwiftTags;
      this.popUpObjDetails = {};
      this.lookUpData = {};
      const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    },
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
            defineGetter(this, 'breakpoints', () => {
                return this._breakpoints;
            });
            defineSetter(this, 'breakpoints', value => {
                this._breakpoints = value;
            });
        },
    preShow : function(){
     
    },
    /**
	* @api : postShow
 	* Gets invoked initially after rendering of UI
	* @return : NA
	*/
    postShow: function() {
      var scope = this;
      try {
        scope.importLcSwiftTags = applicationManager.getConfigurationManager().corporateSwiftTags;
        this.isSwiftCodeAvailable = scope_configManager.swiftEnabled === 'True';
        scope.currentFlow = "Credit details";
        scope.actualFlow = "Credit details";
        scope.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.breakpoints);
        scope.businessController.getMetaDataForAllObjects();
        scope.setCreditDetails();
        scope.initActionsOfButtons();
        scope.view.flxCreditDetails.onClick = scope.hideAllCreditDropdowns.bind(this);
        scope.view.flxShipmentDetails.onClick = scope.hideAllShipmentDropdowns.bind(this);
        scope.view.flxDocuments.onClick = scope.hideAllDocumentDropdowns.bind(this);
        scope.initActionsOfhideDropdownsOfCreditDetails();
        scope.initActionsOfhideDropdownsOfShipmentDetails();	
        scope.initActionsOfhideDropdownsOfDocumentsDetails();
        scope.checkClearSaveButtonEnable();
        scope.swiftCodeDecision();
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
    /**
	* @api : onBreakPointChange
 	* Gets invoked on change of breakpoint in UI
	* @return : NA
	*/
    onBreakPointChange: function() {
      var scope = this;
      try {
        if(scope.currentFlow === "Credit details"){
        scope.setCreditDetails();
      }else if(scope.currentFlow === "Beneficiary details"){
        scope.setBeneficiaryDetails();
      }else if(scope.currentFlow === "Shipment details"){
        scope.setShipmentDetails();
      }else if(scope.currentFlow === "Documents and Terms"){
        scope.setDocumentTermsDetails();
      }else if(scope.currentFlow === "ReviewAndSubmit"){
        scope.view.btnBack.isVisible =  true;
        scope.view.btnSaveContinue.text = "Submit";
        scope.view.flxCreditDetails.isVisible = false;
        scope.view.flxBeneficiaryDetails.isVisible = false;
        scope.view.flxShipmentDetails.isVisible = false;
        scope.view.flxDocuments.isVisible = false;
        scope.view.flxReview.isVisible = true;
        scope.view.flxSeparatorReview.isVisible = true;
        scope.setReviewData(); 
      }
        scope.checkClearSaveButtonEnable();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onBreakPointChange",
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
    render: function () {
      var scope = this;
      var dvfError = "";   
      this.collectionObj = LCIssuanceStore.getState();  
      if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection.LookUp)){
        this.lookUpData = this.collectionObj.Collection.LookUp.swiftCodes;
        this.setBankViewDetails(this, this.popUpObjDetails)
      }
      if(scope.collectionObj.Collection.LetterOfCredit && scope.collectionObj.Collection.LetterOfCredit.isCopyDetail){
        delete(scope.collectionObj.Collection.LetterOfCredit["isCopyDetail"]);
        this.setCreditDetails();
      }
      if(this.collectionObj.Collection.dvfResult !== undefined) {
        dvfError = this.collectionObj.Collection.dvfResult.dvfError;
        var widgetId = this.collectionObj.Collection.dvfResult.widgetId;
        scope.validateData(dvfError, widgetId);
      }
      if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.DigitalArrangements)){
        this.setAccountsDropdown(scope.view.segChargesAccount);
        this.setAccountsDropdown(scope.view.segCommissionAccount);
        this.setAccountsDropdown(scope.view.segMarginAccount); 
      }
      if(this.currentFlow === "Credit details"){
        this.checkNavigationCreditDetails(dvfError);
      }else if(this.currentFlow === "Beneficiary details"){
        this.checkNavigationBeneficiaryDetails(dvfError);
      }else if(this.currentFlow === "Shipment details"){
        this.checkNavigationShipmentDetails(dvfError);
      }if(this.currentFlow === "Documents and Terms"){
        this.checkNavigationDocuments(dvfError);
      }     
      if(this.isCreateLCServiceCheck || this.isSaveAction || this.isSaveAndCloseAction || this.isDeleteAndCloseAction){
        scope.checkServiceStatus();
      }
    },
    /**
	* @api : initActionsOfButtons
 	* Actions of buttons are initialized
	* @return : NA
	*/  
    initActionsOfButtons: function() {
      var scope = this;
      scope.view.btnSaveContinue.onClick = this.onClickOfSaveContinue.bind(this);
      scope.view.btnBack.onClick = this.handleBackNavigation.bind(this);
      scope.view.btnSaveClose.onClick = this.showSaveClosePopup.bind(this);
      scope.view.lblBeneficiaryClear.onTouchEnd = this.showClearPopup.bind(this);
      scope.view.lblShipmentDetailClear.onTouchEnd = this.showClearPopup.bind(this);
      scope.view.lblDocumentsClear.onTouchEnd = this.showClearPopup.bind(this);
      scope.view.lblClear.onTouchEnd = this.showClearPopup.bind(this);
      scope.view.lblSave.onTouchEnd = this.showSaveAsDraftPopup.bind(this);
      scope.view.lblBeneficiarySave.onTouchEnd = this.showSaveAsDraftPopup.bind(this);
      scope.view.lblShipmentDetailSave.onTouchEnd = this.showSaveAsDraftPopup.bind(this);
      scope.view.lblDocumentsSave.onTouchEnd = this.showSaveAsDraftPopup.bind(this);
      scope.view.btnBack.isVisible =  false;
      scope.view.btnSaveClose.text=scope.businessController.getDataBasedOnDataMapping("btnClose", scope.dataMapping) ;
      scope.view.btnBack.text=scope.businessController.getDataBasedOnDataMapping("btnBack", scope.dataMapping) ;
      scope.view.btnSaveContinue.text=scope.businessController.getDataBasedOnDataMapping("btnSaveAndContinue", scope.dataMapping) ;
      scope.view.flxLookUpButton.onClick = this.showLookUpPopup.bind(this);
    },
    /**
	* @api : setCreditDetails
 	* prepares UI for Credit Details Screen
	* @return : NA
	*/
    setCreditDetails: function() {   
      var scope = this;
      let data = [];
      this.setCreditDetailsScreenLabelText();
      scope.setCreditDetailsTextBoxPropery();
      scope.view.btnBack.isVisible =  false;
      scope.view.flxCreditDetails.isVisible = true;
      scope.view.flxBeneficiaryDetails.isVisible = false;
      scope.view.flxShipmentDetails.isVisible = false;
      scope.view.flxDocuments.isVisible = false;
      scope.view.flxReview.isVisible = false;     
      scope.preFillCreditDetailsTextbox();
      scope.preFillCreditDetailsAccountsDropdown();
      scope.initActionsOfTextBoxesOfCreditDetails();
      scope.initActionsOfDropdownOfCreditDetails();
      scope.initActionsofDateFieldOfCreditDetails();
      scope.view.flxSeparatorReview.isVisible = false;
      data = [{
        "currentRow": true,
        "rowLabel": "Credit Details",
        "rowStatus": "Inprogress"
      }, {
        "currentRow": false,
        "rowLabel": "Beneficiary Details",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Shipment Details",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Documents and Terms",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Review & Submit",
        "rowStatus": "Incomplete"
      }];
      scope.updateProgressBar(data);
      scope.setHeaderText(scope.currentFlow);
    },
    /**
	* @api : setCreditDetails
 	* prepares UI for Beneficiary Details Screen
	* @return : NA
	*/
    setBeneficiaryDetails: function() {   
      var scope = this;
      let data = [];
      this.setBeneficiaryDetailsScreenLabelText();
      scope.setBeneficiaryDetailsTextBoxPropery();
      scope.view.btnBack.isVisible =  true;
      scope.view.flxCreditDetails.isVisible = false;
      scope.view.flxBeneficiaryDetails.isVisible = true;
      scope.view.flxShipmentDetails.isVisible = false;
      scope.view.flxDocuments.isVisible = false;
      scope.view.flxReview.isVisible = false;      
       scope.disableContinueButton();
       scope.businessController.resetButtonStatus(false);
      scope.preFillBeneficiaryDetailsTextbox();
       scope.initActionsOfTextBoxesOfBeneficiaryDetails();
      scope.initActionsOfDropdownOfCreditDetails();
      data = [{
        "currentRow": false,
        "rowLabel": "Credit Details",
        "rowStatus": "done"
      }, {
        "currentRow": true,
        "rowLabel": "Beneficiary Details",
        "rowStatus": "Inprogress"
      }, {
        "currentRow": false,
        "rowLabel": "Shipment Details",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Documents and Terms",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Review & Submit",
        "rowStatus": "Incomplete"
      }];
      scope.updateProgressBar(data);
    },
    /**
	* @api : setShipmentDetails
 	* prepares UI for setShipment Details Screen
	* @return : NA
	*/
    setShipmentDetails: function() {   
      var scope = this;
      let data = [];
      this.setShipmentDetailsScreenLabelText();
      scope.setShipmentDetailsTextBoxPropery();
      scope.view.btnBack.isVisible =  true;
      scope.view.flxCreditDetails.isVisible = false;
      scope.view.flxBeneficiaryDetails.isVisible = false;
      scope.view.flxShipmentDetails.isVisible = true;
      scope.view.flxDocuments.isVisible = false;
      scope.view.flxReview.isVisible = false;  
      scope.disableContinueButton();
      scope.businessController.resetButtonStatus(false);
      scope.preFillShipmentDetailsTextbox();
      scope.initActionsOfTextBoxesOfShipmentDetails();
      scope.initActionsOfDropdownOfShipmentDetails();
      scope.initActionsofDateFieldOfShipmentDetails();
      data = [{
        "currentRow": false,
        "rowLabel": "Credit Details",
        "rowStatus": "done"
      }, {
        "currentRow": false,
        "rowLabel": "Beneficiary Details",
        "rowStatus": "done"
      }, {
        "currentRow": true,
        "rowLabel": "Shipment Details",
        "rowStatus": "Inprogress"
      }, {
        "currentRow": false,
        "rowLabel": "Documents and Terms",
        "rowStatus": "Incomplete"
      }, {
        "currentRow": false,
        "rowLabel": "Review & Submit",
        "rowStatus": "Incomplete"
      }];
      scope.updateProgressBar(data);
    },
    /**
	* @api : setDocumentTermsDetails
 	* prepares UI for setDocumentTerms Details Screen
	* @return : NA
	*/
    setDocumentTermsDetails: function() {   
      var scope = this;
      let data = [];
      this.setDocumentsTermsScreenLabelText();
      scope.setDocumentsTermsTextBoxPropery();
      scope.view.btnBack.isVisible =  true;
      scope.view.flxCreditDetails.isVisible = false;
      scope.view.flxBeneficiaryDetails.isVisible = false;
      scope.view.flxShipmentDetails.isVisible = false;
      scope.view.flxDocuments.isVisible = true;
      scope.view.flxReview.isVisible = false;   
      scope.disableContinueButton();
      scope.businessController.resetButtonStatus(false);
      scope.preFillDocumentsTermsTextbox();
      scope.initActionsOfTextBoxesOfDocumentTerms();
      scope.initActionsOfDropdownOfDocumentTerms();
      data = [{
        "currentRow": false,
        "rowLabel": "Credit Details",
        "rowStatus": "done"
      }, {
        "currentRow": false,
        "rowLabel": "Beneficiary Details",
        "rowStatus": "done"
      }, {
        "currentRow": false,
        "rowLabel": "Shipment Details",
        "rowStatus": "done"
      }, {
        "currentRow": true,
        "rowLabel": "Documents and Terms",
        "rowStatus": "Inprogress"
      }, {
        "currentRow": false,
        "rowLabel": "Review & Submit",
        "rowStatus": "Incomplete"
      }];
      scope.updateProgressBar(data);
    },
    /**
  * @api : setCreditDetailsTextBoxPropery
  * set Text box Propery
  * @return : NA
  */
    setCreditDetailsTextBoxPropery: function() { 
      this.view.tbxReferenceNumber.maxTextLength = 35;
      this.view.tbxAmount.maxTextLength = 35;
      this.view.tbxTotalPercentage.maxTextLength = 35;
      this.view.tbxPayableAmount.maxTextLength = 35;
      this.view.tbxMaxCredit.maxTextLength = 35;
      this.view.tbxAvailable1.maxTextLength = 50;
      this.view.tbxAvailable2.maxTextLength = 50;
      this.view.tbxAvailable3.maxTextLength = 50;
      this.view.tbxAvailable4.maxTextLength = 50;
      this.view.tbxExpiryPlace.maxTextLength = 35;
      this.view.tbxMessage.maxTextLength = 200;
    },
    /**
  * @api : setBeneficiaryDetailsTextBoxPropery
  * set Text box Propery
  * @return : NA
  */
    setBeneficiaryDetailsTextBoxPropery: function() { 
      this.view.tbxBeneficiaryName.maxTextLength = 35;
      this.view.tbxBeneficiaryAddress1.maxTextLength = 50;
      this.view.tbxBeneficiaryAddress2.maxTextLength = 50;
      this.view.tbxCity.maxTextLength = 35;
      this.view.tbxBeneficiaryZipCode.maxTextLength = 35;
      this.view.tbxBankName.maxTextLength = 35;
      this.view.tbxBankAddress1.maxTextLength = 50;
      this.view.tbxBankAddress2.maxTextLength = 50;
      this.view.tbxBankCity.maxTextLength = 35;
      this.view.tbxBankZipCode.maxTextLength = 35;
    },
    /**
  * @api : setShipmentDetailsTextBoxPropery
  * set Text box propery
  * @return : NA
  */
    setShipmentDetailsTextBoxPropery: function() { 
      this.view.tbxPlaceOfCharge.maxTextLength = 35;
      this.view.tbxPortLoading.maxTextLength = 35;
      this.view.tbxPortCharge.maxTextLength = 35;
      this.view.tbxFinalDeliveryPlace.maxTextLength = 35;
    },
    /**
  * @api : setDocumentsTermsTextBoxPropery
  * set Text box propery
  * @return : NA
  */
    setDocumentsTermsTextBoxPropery: function() { 
      this.view.tbxDescription.maxTextLength = 35;
      this.view.tbxRequiredDocuments.maxTextLength = 35;
      this.view.tbxAdditionalCondition.maxTextLength = 35;
      this.view.tbxOtherCondition.maxTextLength = 35;
      this.view.tbxCharges.maxTextLength = 35;
    },
    /**
  * @api : setCreditDetailsScreenLabelText
  * sets the data in labels in CreditDetails screen
  * @return : NA
  */
    setCreditDetailsScreenLabelText: function() { 
      var scope = this;
      this.view.lblActivateHeader.text = this.businessController.getDataBasedOnDataMapping("lblProvideCreditDetails", scope.dataMapping);
      this.view.lblReferenceNumber.text = this.businessController.getDataBasedOnDataMapping("lblReferenceNumber", scope.dataMapping);
      this.view.lblCurrency.text = this.businessController.getDataBasedOnDataMapping("lblCurrency", scope.dataMapping);
      this.view.lblAmount.text = this.businessController.getDataBasedOnDataMapping("lblAmount", scope.dataMapping);
      this.view.lblPercentage.text = this.businessController.getDataBasedOnDataMapping("lblPercentage", scope.dataMapping);
      this.view.lblMaxCredit.text = this.businessController.getDataBasedOnDataMapping("lblMaxCredit", scope.dataMapping);
      this.view.lblPayableCurrency.text = this.businessController.getDataBasedOnDataMapping("lblPayableCurrency", scope.dataMapping);
      this.view.lblPayableAmount.text = this.businessController.getDataBasedOnDataMapping("lblPayableAmount", scope.dataMapping);
      this.view.lblPaymentTerms.text = this.businessController.getDataBasedOnDataMapping("lblPaymentTerms", scope.dataMapping);
      this.view.lblAvailable.text = this.businessController.getDataBasedOnDataMapping("lblAvailable", scope.dataMapping);
      this.view.lblIssueDate.text = this.businessController.getDataBasedOnDataMapping("lblIssueDate", scope.dataMapping);
      this.view.lblExpiryDate.text = this.businessController.getDataBasedOnDataMapping("lblExpiryDate", scope.dataMapping);
      this.view.lblExpiryPlace.text = this.businessController.getDataBasedOnDataMapping("lblExpiryPlace", scope.dataMapping);
      this.view.lblChargesAccount.text = this.businessController.getDataBasedOnDataMapping("lblChargesAccount", scope.dataMapping);
      this.view.lblCommissionAccount.text = this.businessController.getDataBasedOnDataMapping("lblCommissionAccount", scope.dataMapping);
      this.view.lblMarginAccount.text = this.businessController.getDataBasedOnDataMapping("lblMarginAccount", scope.dataMapping);
      this.view.lblMessage.text = this.businessController.getDataBasedOnDataMapping("lblMessage", scope.dataMapping);
    },
     /**
  * @api : setBeneficiaryDetailsScreenLabelText
  * sets the data in labels in Beneficiary details screen
  * @return : NA
  */
    setBeneficiaryDetailsScreenLabelText: function() { 
      var scope = this;
      this.view.lblHeadingBeneficiary.text = this.businessController.getDataBasedOnDataMapping("lblProvideBeneficiaryDetails", scope.dataMapping);
      this.view.lblReferenceNumber.text = this.businessController.getDataBasedOnDataMapping("lblReferenceNumber", scope.dataMapping);
      this.view.lblBeneficiaryName.text = this.businessController.getDataBasedOnDataMapping("lblBeneficiaryName", scope.dataMapping);
      this.view.lblBeneficiaryAddress.text = this.businessController.getDataBasedOnDataMapping("lblBeneficiaryAddress", scope.dataMapping);
      this.view.lblCity.text = this.businessController.getDataBasedOnDataMapping("lblCity", scope.dataMapping);
      this.view.lblBeneficiaryState.text = this.businessController.getDataBasedOnDataMapping("lblBeneficiaryState", scope.dataMapping);
      this.view.lblBeneficiaryZipCode.text = this.businessController.getDataBasedOnDataMapping("lblBeneficiaryZipCode", scope.dataMapping);
      this.view.lblBankName.text = this.businessController.getDataBasedOnDataMapping("lblBankName", scope.dataMapping);
      this.view.lblBankAddress.text = this.businessController.getDataBasedOnDataMapping("lblBankAddress", scope.dataMapping);
      this.view.lblBankCity.text = this.businessController.getDataBasedOnDataMapping("lblBankCity", scope.dataMapping);
      this.view.lblBankState.text = this.businessController.getDataBasedOnDataMapping("lblBankState", scope.dataMapping);
      this.view.lblBankZipCode.text = this.businessController.getDataBasedOnDataMapping("lblBankZipCode", scope.dataMapping);
    },
    /**
  * @api : setShipmentDetailsScreenLabelText
  * sets the data in labels in Shipment details screen
  * @return : NA
  */
    setShipmentDetailsScreenLabelText: function() { 
      var scope = this;
       this.view.lblHeaderShipmentDetail.text = this.businessController.getDataBasedOnDataMapping("lblProvideShipmentDetails", scope.dataMapping);
      this.view.lblPlaceOfCharge.text = this.businessController.getDataBasedOnDataMapping("lblPlaceOfCharge", scope.dataMapping);
      this.view.lblPortLoading.text = this.businessController.getDataBasedOnDataMapping("lblPortLoading", scope.dataMapping);
      this.view.lblPortCharge.text = this.businessController.getDataBasedOnDataMapping("lblPortCharge", scope.dataMapping);
      this.view.lblFinalDeliveryPlace.text = this.businessController.getDataBasedOnDataMapping("lblFinalDeliveryPlace", scope.dataMapping);
      this.view.lblShipmentDate.text = this.businessController.getDataBasedOnDataMapping("lblShipmentDate", scope.dataMapping);
      this.view.lblTranshipment.text = this.businessController.getDataBasedOnDataMapping("lblTranshipment", scope.dataMapping);
      this.view.lblPartialShipment.text = this.businessController.getDataBasedOnDataMapping("lblPartialShipment", scope.dataMapping);
      this.view.lblIncoTerms.text = this.businessController.getDataBasedOnDataMapping("lblIncoTerms", scope.dataMapping);
      this.view.lblShipmentMode.text = this.businessController.getDataBasedOnDataMapping("lblShipmentMode", scope.dataMapping);
    },
     /**
  * @api : setDocumentsTermsScreenLabelText
  * sets the data in labels in Document and Terms screen
  * @return : NA
  */
    setDocumentsTermsScreenLabelText: function() { 
      var scope = this;
      this.view.lblDocumentsHeader.text = this.businessController.getDataBasedOnDataMapping("lblDocumentsTerms", scope.dataMapping);
      this.view.lblDescription.text = this.businessController.getDataBasedOnDataMapping("lblDescription", scope.dataMapping);
      this.view.lblRequiredDocuments.text = this.businessController.getDataBasedOnDataMapping("lblRequiredDocuments", scope.dataMapping);
      this.view.lblAdditionalCondition.text = this.businessController.getDataBasedOnDataMapping("lblAdditionalCondition", scope.dataMapping);
      this.view.lblOtherCondition.text = this.businessController.getDataBasedOnDataMapping("lblOtherCondition", scope.dataMapping);
      this.view.lblCharges.text = this.businessController.getDataBasedOnDataMapping("lblCharges", scope.dataMapping);
      this.view.lblConfirmationInstruction.text = this.businessController.getDataBasedOnDataMapping("lblConfirmationInstruction", scope.dataMapping);
      this.view.lblTransferable.text = this.businessController.getDataBasedOnDataMapping("lblTransferable", scope.dataMapping);
      this.view.lblStandByLC.text = this.businessController.getDataBasedOnDataMapping("lblStandByLC", scope.dataMapping);
      this.view.lblUploadDocs.text = this.businessController.getDataBasedOnDataMapping("lblUploadDocs", scope.dataMapping);
    },
     /**
	* @api : setAccountsDropdown
 	* Method to set data in account list dropdown 
	* @return : NA
	*/
    setAccountsDropdown : function(seg){
      var scope = this;
      var segmentData = [];
      scope.collectionObj = LCIssuanceStore.getState();
      if (scope.collectionObj.Collection.DigitalArrangements) {
        var accountList = scope.collectionObj.Collection.DigitalArrangements;
        seg.widgetDataMap = {
          "lblListValue": "value",
          "selectedKey": "key"
        };
        for (var key in accountList) {
          segmentData.push({
            "key": accountList[key].accountID,
            "value": accountList[key].accountNameFormatted
          });
        }
      }
      seg.setData(segmentData);
    },
     /**
	* @api : initActionsOfDropdownOfCreditDetails
 	* Initializing Dropdown in the Credit details 
	* @return : NA
	*/
    initActionsOfDropdownOfCreditDetails: function(){
      var scope = this;
      var defaultCurrency = "USD";
      scope.setDropdownValues(this.view.segPaymentTerms, scope.dataMapping["PaymentTermsDropdown"], "lblValuePaymentTerms");
      scope.view.segPaymentTerms.onRowClick = this.onDropdownSelection.bind(this,this.view.segPaymentTerms,"lblValuePaymentTerms",this.view.flxSegPaymentTerms,this.view.imgPaymentTermsDropdownIcon,scope.dataMapping["PaymentTermsDropdown"]);
      scope.view.flxValuePaymentTerms.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegPaymentTerms, this.view.imgPaymentTermsDropdownIcon);

      scope.setDropdownValues(this.view.segDropdownListCurrency, scope.dataMapping["CurrencyDropdown"], "lblSelectedValueCurrency",defaultCurrency);
      scope.view.segDropdownListCurrency.onRowClick = this.onDropdownSelection.bind(this,this.view.segDropdownListCurrency,"lblSelectedValueCurrency",this.view.flxDropdownListCurrency,this.view.imgDropdownIconCurrency,scope.dataMapping["CurrencyDropdown"]);
      scope.view.flxDropdownCurrency.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxDropdownListCurrency, this.view.imgDropdownIconCurrency);

      scope.setDropdownValues(this.view.segDropdownListPayableCurrency, scope.dataMapping["CurrencyDropdown"], "lblSelectedValuePayableCurrency",defaultCurrency);
      scope.view.segDropdownListPayableCurrency.onRowClick = this.onDropdownSelection.bind(this,this.view.segDropdownListPayableCurrency,"lblSelectedValuePayableCurrency",this.view.flxDropdownListPayableCurrency,this.view.imgDropdownIconPayableCurrency,scope.dataMapping["CurrencyDropdown"]);
      scope.view.flxDropdownPayableCurrency.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxDropdownListPayableCurrency, this.view.imgDropdownIconPayableCurrency);
      
	scope.view.segChargesAccount.onRowClick = this.onDropdownSelection.bind(this,this.view.segChargesAccount,"lblSelectedChargeValue",this.view.flxSegChargesAccount,this.view.imgChargeSelectIcon);
    scope.view.flxValueChargeAmount.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegChargesAccount, this.view.imgChargeSelectIcon);
    scope.view.segCommissionAccount.onRowClick = this.onDropdownSelection.bind(this,this.view.segCommissionAccount,"lblValueCommissionAccount",this.view.flxSegCommissionAccount,this.view.imgDropdownCommissionIcon);
    scope.view.flxValueCommissionAccount.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegCommissionAccount, this.view.imgDropdownCommissionIcon);
    scope.view.segMarginAccount.onRowClick = this.onDropdownSelection.bind(this,this.view.segMarginAccount,"lblValueMarginAccount",this.view.flxSegMarginAccount,this.view.imgDropdownIconMarginAccount);
    scope.view.flxValueMarginAccount.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegMarginAccount, this.view.imgDropdownIconMarginAccount);

    },  
    /**
	* @api : initActionsofDateFieldOfCreditDetails
 	* validating the date field on end editing 
	* @return : NA */
    initActionsofDateFieldOfCreditDetails: function() {
      var scope = this;
      this.view.IssueDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.IssueDate.tbxDateInputKA,this.view.lblErrIssueDate,"tbxIssueDate"); 
      this.view.ExpiryDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.ExpiryDate.tbxDateInputKA,this.view.lblErrExpiryDate,"tbxExpiryDate");
    },
    /* @api : initActionsofDateFieldOfShipmentDetails
 	* validating the date field on end editing 
	* @return : NA */
    initActionsofDateFieldOfShipmentDetails: function() {
      var scope = this;
      this.view.LatestShipmentDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.LatestShipmentDate.tbxDateInputKA,this.view.lblErrLatestShipmentDate,"tbxshipmentDate");      
    },
    /**
	* @api : checkdate
 	* vchecking whether the entered date is valid or not
	* @return : NA */
    checkDate: function(widgetName,errLabel,widgetPropertyName) {
      var dateArr = widgetName.text.split("/");
      var todayDate = this.getTodayDate();
      var month = parseInt(dateArr[0]);
       this.checkClearSaveButtonEnable();
      if (month > 12) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.businessController.resetButtonStatus(false);        
        return;
      }
      var date = parseInt(dateArr[1]);
      if (date > 31) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.businessController.resetButtonStatus(false);
        return;
      }
      if (Date.parse(widgetName.text) < Date.parse(todayDate)) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.businessController.resetButtonStatus(false);
        return;
      }
      errLabel.isVisible = false;
      widgetName.skin = "skntbxSSP42424215pxnoborder";
      this.businessController.storeInCollection(widgetName.text, widgetPropertyName, this.dataMapping);      
    },
    /**
	* @api : initActionsOfDropdownOfBeneficiaryDetails
 	* Initializing Dropdown in the Beneficiary details 
	* @return : NA
	*/
    initActionsOfDropdownOfBeneficiaryDetails: function(){
    
  },
     /**
	* @api : initActionsOfDropdownOfShipmentDetails
 	* Initializing Dropdown related things in  Shipment details Screen
	* @return : NA
	*/
    initActionsOfDropdownOfShipmentDetails: function(){
    var scope = this;
    scope.setDropdownValues(this.view.segTranshipment, scope.dataMapping["TranshipmentDropdown"], "lblSelectedTranshipment");
    scope.view.segTranshipment.onRowClick = this.onDropdownSelection.bind(this,this.view.segTranshipment,"lblSelectedTranshipment",this.view.flxSegTranshipment,this.view.imgSelectTranshipment,scope.dataMapping["TranshipmentDropdown"]);
    scope.view.flxValueTranshipment.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegTranshipment, this.view.imgSelectTranshipment);
    scope.setDropdownValues(this.view.segPartialShipment, scope.dataMapping["PartialShipmentsDropdown"], "lblSelectedPartialShipment");
    scope.view.segPartialShipment.onRowClick = this.onDropdownSelection.bind(this,this.view.segPartialShipment,"lblSelectedPartialShipment",this.view.flxSegPartialShipment,this.view.imgPartialShipmentSelectIcon,scope.dataMapping["PartialShipmentsDropdown"]);
    scope.view.flxValuePartialShipment.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegPartialShipment, this.view.imgPartialShipmentSelectIcon);
    scope.setDropdownValues(this.view.segIncoTerms, scope.dataMapping["IncoTermsDropdown"], "lblSelectedIncoTerms");
    scope.view.segIncoTerms.onRowClick = this.onDropdownSelection.bind(this,this.view.segIncoTerms,"lblSelectedIncoTerms",this.view.flxSegIncoTerms,this.view.imgIncoTermSelect,scope.dataMapping["IncoTermsDropdown"]);
    scope.view.flxValueIncoTerms.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegIncoTerms, this.view.imgIncoTermSelect);
    scope.setDropdownValues(this.view.segShipmentMode, scope.dataMapping["ModeOfShipmentDropdown"], "lblSelectedShipmentMode");
    scope.view.segShipmentMode.onRowClick = this.onDropdownSelection.bind(this,this.view.segShipmentMode,"lblSelectedShipmentMode",this.view.flxSegShipmentMode,this.view.imgShipmentModeSelectIcon,scope.dataMapping["ModeOfShipmentDropdown"]);
    scope.view.flxValueShipmentMode.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegShipmentMode, this.view.imgShipmentModeSelectIcon);
  },
     /**
	* @api : initActionsOfDropdownOfDocumentTerms
 	* Initializing Dropdown in the Dcouemtna dn Terms Screen 
	* @return : NA
	*/
    initActionsOfDropdownOfDocumentTerms: function(){
    var scope = this;
    scope.setDropdownValues(this.view.segInstruction, scope.dataMapping["ConfirmationInstructionsDropdown"], "lblSelectedInstruction");
    scope.view.segInstruction.onRowClick = this.onDropdownSelection.bind(this,this.view.segInstruction,"lblSelectedInstruction",this.view.flxSegInstruction,this.view.imgInstructionSelectIcon, scope.dataMapping["ConfirmationInstructionsDropdown"]);
    scope.view.flxValueConfirmationInstuction.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegInstruction, this.view.imgInstructionSelectIcon);
    scope.setDropdownValues(this.view.segTransferable, scope.dataMapping["TransferableDropdown"], "lblSelectedTransferable");
    scope.view.segTransferable.onRowClick = this.onDropdownSelection.bind(this,this.view.segTransferable,"lblSelectedTransferable",this.view.flxSegTransferable,this.view.imgTransferableSelectIcon, scope.dataMapping["TransferableDropdown"]);
    scope.view.flxValueTransferable.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegTransferable, this.view.imgTransferableSelectIcon);
    scope.setDropdownValues(this.view.segStandByLC, scope.dataMapping["StandByLCDropdown"], "lblSelectedStandByLC");
    scope.view.segStandByLC.onRowClick = this.onDropdownSelection.bind(this,this.view.segStandByLC,"lblSelectedStandByLC",this.view.flxSegStandByLC,this.view.imgStandByLCSelectIcon,scope.dataMapping["StandByLCDropdown"]);
    scope.view.flxValueStandBy.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSegStandByLC, this.view.imgStandByLCSelectIcon);
    
  },
     /**
	* @api : preFillCreditDetailsTextbox
 	* Method to prepopulate the values of  of text boxes of Credit details 
	* @return : NA 
	*/
    preFillCreditDetailsTextbox: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.view.tbxReferenceNumber.text =scope.businessController.getDataBasedOnDataMapping("tbxReferenceNumber",scope.dataMapping);
      this.view.tbxAmount.text = scope.businessController.getDataBasedOnDataMapping("tbxAmount",scope.dataMapping);
      this.onAmountChanged(this.view.tbxAmount);
      this.view.tbxPayableAmount.text = scope.businessController.getDataBasedOnDataMapping("tbxPayableAmount",scope.dataMapping);
      this.onAmountChanged(this.view.tbxPayableAmount);
      this.view.tbxTotalPercentage.text = scope.businessController.getDataBasedOnDataMapping("tbxTotalPercentage",scope.dataMapping);
      this.view.tbxMaxCredit.text = scope.businessController.getDataBasedOnDataMapping("tbxMaxCredit",scope.dataMapping);
      this.view.IssueDate.setText(scope.businessController.getDataBasedOnDataMapping("tbxIssueDate", scope.dataMapping));
      this.view.ExpiryDate.setText(scope.businessController.getDataBasedOnDataMapping("tbxExpiryDate", scope.dataMapping));
      this.view.tbxAvailable1.text = scope.businessController.getDataBasedOnDataMapping("tbxAvailable1",scope.dataMapping);
      this.view.tbxAvailable2.text = scope.businessController.getDataBasedOnDataMapping("tbxAvailable2",scope.dataMapping);
      this.view.tbxAvailable3.text = scope.businessController.getDataBasedOnDataMapping("tbxAvailable3",scope.dataMapping);
      this.view.tbxAvailable4.text = scope.businessController.getDataBasedOnDataMapping("tbxAvailable4",scope.dataMapping);
      this.view.tbxExpiryPlace.text = scope.businessController.getDataBasedOnDataMapping("tbxExpiryPlace",scope.dataMapping);
      this.view.tbxMessage.text = scope.businessController.getDataBasedOnDataMapping("tbxMessage",scope.dataMapping);
      scope.businessController.minFillValidation(scope.constructDVFInput());
      }catch(err)
      {
        var errorObj =
            {
              "level" : "preFillCreditDetailsTextbox",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
     /**
	* @api : preFillCreditDetailsAccountsDropdown
 	* Method to prepopulate the values of accounts dropdown
	* @return : NA
	*/
    preFillCreditDetailsAccountsDropdown: function(){
      var scope = this; 
      if(scope.getSelectedValueFromAccountsDropdown("lblSelectedChargeValue") !== "NA")
        this.view.lblSelectedChargeValue.text =  scope.getSelectedValueFromAccountsDropdown("lblSelectedChargeValue");
      else
        this.view.lblSelectedChargeValue.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);  
      if(scope.getSelectedValueFromAccountsDropdown("lblValueCommissionAccount") !== "NA")
        this.view.lblValueCommissionAccount.text =  scope.getSelectedValueFromAccountsDropdown("lblValueCommissionAccount");
      else
        this.view.lblValueCommissionAccount.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping); 
      if(scope.getSelectedValueFromAccountsDropdown("lblValueMarginAccount") !== "NA")
        this.view.lblValueMarginAccount.text =  scope.getSelectedValueFromAccountsDropdown("lblValueMarginAccount");      
      else
        this.view.lblValueMarginAccount.text = scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping); 
    },
      /**
	* @api : preFillBeneficiaryDetailsTextbox
 	* Method to prepopulate the values of  of text boxes of Beneficiary details 
	* @return : NA
	*/
    preFillBeneficiaryDetailsTextbox: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.view.tbxBeneficiaryName.text = scope.businessController.getDataBasedOnDataMapping("tbxBeneficiaryName",scope.dataMapping);
      this.view.tbxBeneficiaryAddress1.text = scope.businessController.getDataBasedOnDataMapping("tbxBeneficiaryAddress1",scope.dataMapping);
      this.view.tbxBeneficiaryAddress2.text = scope.businessController.getDataBasedOnDataMapping("tbxBeneficiaryAddress2",scope.dataMapping);
      this.view.tbxCity.text = scope.businessController.getDataBasedOnDataMapping("tbxCity",scope.dataMapping);
      this.view.tbxBeneficiaryZipCode.text = scope.businessController.getDataBasedOnDataMapping("tbxBeneficiaryZipCode",scope.dataMapping);
      this.view.tbxBankName.text = scope.businessController.getDataBasedOnDataMapping("tbxBankName",scope.dataMapping);
      this.view.tbxBankAddress1.text = scope.businessController.getDataBasedOnDataMapping("tbxBankAddress1",scope.dataMapping);
      this.view.tbxBankAddress2.text = scope.businessController.getDataBasedOnDataMapping("tbxBankAddress2",scope.dataMapping);
      this.view.tbxBankCity.text = scope.businessController.getDataBasedOnDataMapping("tbxBankCity",scope.dataMapping);
      this.view.tbxBankZipCode.text = scope.businessController.getDataBasedOnDataMapping("tbxBankZipCode",scope.dataMapping);
      scope.businessController.minFillValidation(scope.constructDVFInput());
      }catch(err)
      {
        var errorObj =
            {
              "level" : "preFillBeneficiaryDetailsTextbox",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : preFillShipmentDetailsTextbox
 	* Method to prepopulate the values of  of text boxes of Shipment details 
	* @return : NA
	*/
    preFillShipmentDetailsTextbox: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.view.tbxPlaceOfCharge.text = scope.businessController.getDataBasedOnDataMapping("tbxPlaceOfCharge",scope.dataMapping);
      this.view.tbxPortLoading.text = scope.businessController.getDataBasedOnDataMapping("tbxPortLoading",scope.dataMapping);
      this.view.tbxPortCharge.text = scope.businessController.getDataBasedOnDataMapping("tbxPortCharge",scope.dataMapping);
      this.view.tbxFinalDeliveryPlace.text = scope.businessController.getDataBasedOnDataMapping("tbxFinalDeliveryPlace",scope.dataMapping);     
      this.view.LatestShipmentDate.setText(scope.businessController.getDataBasedOnDataMapping("tbxshipmentDate", scope.dataMapping));        
      scope.businessController.minFillValidation(scope.constructDVFInput());
      }catch(err)
      {
        var errorObj =
            {
              "level" : "preFillShipmentDetailsTextbox",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : preFillDocumentsTermsTextbox
 	* Method to prepopulate the values of  of text boxes of Documents details 
	* @return : NA
	*/
    preFillDocumentsTermsTextbox: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.view.tbxDescription.text = scope.businessController.getDataBasedOnDataMapping("tbxDescription",scope.dataMapping);
      this.view.tbxRequiredDocuments.text = scope.businessController.getDataBasedOnDataMapping("tbxRequiredDocuments",scope.dataMapping);
      this.view.tbxAdditionalCondition.text = scope.businessController.getDataBasedOnDataMapping("tbxAdditionalCondition",scope.dataMapping);
      this.view.tbxOtherCondition.text = scope.businessController.getDataBasedOnDataMapping("tbxOtherCondition",scope.dataMapping);     
      this.view.tbxCharges.text = scope.businessController.getDataBasedOnDataMapping("tbxCharges",scope.dataMapping);     
      scope.businessController.minFillValidation(scope.constructDVFInput());
      }catch(err)
      {
        var errorObj =
            {
              "level" : "preFillShipmentDetailsTextbox",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : initActionsOfTextBoxesOfCreditDetails
 	* Actions of text boxes of Credit details are initialized
	* @return : NA
	*/
    initActionsOfTextBoxesOfCreditDetails: function () {
      var scope= this;
      this.performValidationScreen1();
      this.performMinimumDataFillValidationScreen1();
      this.view.tbxAmount.onEndEditing = function(){
        scope.view.tbxAmount.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.onAmountChanged(this,scope.view.tbxAmount);};
      this.view.tbxPayableAmount.onEndEditing = function(){
        scope.view.tbxPayableAmount.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.onAmountChanged(this,scope.view.tbxPayableAmount);};
      this.view.tbxMaxCredit.onEndEditing = function(){
        scope.view.tbxMaxCredit.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.onAmountChanged(this,scope.view.tbxMaxCredit);};
      this.view.tbxAmount.onBeginEditing = function(){
        scope.view.tbxAmount.skin = "ICSknsknSSP42424215PxBorder4A90E2";
        scope.onEditAmount(this,scope.view.tbxAmount);};
      this.view.tbxPayableAmount.onBeginEditing = function(){
        scope.view.tbxPayableAmount.skin = "ICSknsknSSP42424215PxBorder4A90E2";
        scope.onEditAmount(this,scope.view.tbxPayableAmount);};
      this.view.tbxMaxCredit.onBeginEditing = function(){
        scope.view.tbxMaxCredit.skin = "ICSknsknSSP42424215PxBorder4A90E2";
        scope.onEditAmount(this,scope.view.tbxMaxCredit);
      };
      this.view.tbxAmount.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.tbxPayableAmount.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.tbxMaxCredit.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.IssueDate.tbxDateInputKA.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.ExpiryDate.tbxDateInputKA.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      // Credit details
      scope.restrictLessThanGreaterThan("tbxReferenceNumber");
      scope.restrictLessThanGreaterThan("tbxAvailable1");
      scope.restrictLessThanGreaterThan("tbxAvailable2");
      scope.restrictLessThanGreaterThan("tbxAvailable3");
      scope.restrictLessThanGreaterThan("tbxAvailable4");
      scope.restrictLessThanGreaterThan("tbxExpiryPlace");
      scope.restrictLessThanGreaterThan("tbxMessage");
      // Beneficiary details
      scope.restrictLessThanGreaterThan("tbxBeneficiaryName");
      scope.restrictLessThanGreaterThan("tbxBeneficiaryAddress1");
      scope.restrictLessThanGreaterThan("tbxBeneficiaryAddress2");
      scope.restrictLessThanGreaterThan("tbxCity");
      scope.restrictLessThanGreaterThan("tbxBeneficiaryZipCode");
      scope.restrictLessThanGreaterThan("tbxBankName");
      scope.restrictLessThanGreaterThan("tbxBankAddress1");
      scope.restrictLessThanGreaterThan("tbxBankAddress2");
      scope.restrictLessThanGreaterThan("tbxBankCity");
      scope.restrictLessThanGreaterThan("tbxBankZipCode");
      // Shipment Details
      scope.restrictLessThanGreaterThan("tbxPlaceOfCharge");
      scope.restrictLessThanGreaterThan("tbxPortLoading");
      scope.restrictLessThanGreaterThan("tbxPortCharge");
      scope.restrictLessThanGreaterThan("tbxFinalDeliveryPlace");
      // Documents and terms
      scope.restrictLessThanGreaterThan("tbxDescription");
      scope.restrictLessThanGreaterThan("tbxRequiredDocuments");
      scope.restrictLessThanGreaterThan("tbxAdditionalCondition");
      scope.restrictLessThanGreaterThan("tbxOtherCondition");
      scope.restrictLessThanGreaterThan("tbxCharges");
    },
    /**
	* @api : initActionsOfTextBoxesOfBeneficiaryDetails
 	* Actions of text boxes of Credit details are initialized
	* @return : NA
	*/
    initActionsOfTextBoxesOfBeneficiaryDetails: function () { 
      var scope = this;
      this.performValidationScreen2();
      this.performMinimumDataFillValidationScreen2();
      this.view.tbxBeneficiaryName.onBeginEditing = function() {
         scope.view.tbxBeneficiaryName.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBeneficiaryAddress1.onBeginEditing = function() {
        scope.view.tbxBeneficiaryAddress1.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
       this.view.tbxBeneficiaryAddress2.onBeginEditing = function() {
         scope.view.tbxBeneficiaryAddress2.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxCity.onBeginEditing = function() {
        scope.view.tbxCity.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBeneficiaryZipCode.onBeginEditing = function() {
        scope.view.tbxBeneficiaryZipCode.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankName.onBeginEditing = function() {
       scope.view.tbxBankName.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankAddress1.onBeginEditing = function() {
        scope.view.tbxBankAddress1.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankAddress2.onBeginEditing = function() {
        scope.view.tbxBankAddress2.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankCity.onBeginEditing = function() {
         scope.view.tbxBankCity.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankZipCode.onBeginEditing = function() {
        scope.view.tbxBankZipCode.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
    },
     /**
	* @api : initActionsOfTextBoxesOfShipmentDetails
 	* Actions of text boxes of Credit details are initialized
	* @return : NA
	*/
    initActionsOfTextBoxesOfShipmentDetails: function () {
      var scope = this;
      this.performValidationScreen3();
      this.performMinimumDataFillValidationScreen3();
      this.view.tbxPlaceOfCharge.onBeginEditing = function() {
        scope.view.tbxPlaceOfCharge.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxPortLoading.onBeginEditing = function() {
       scope.view.tbxPortLoading.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxPortCharge.onBeginEditing = function() {
       scope.view.tbxPortCharge.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxFinalDeliveryPlace.onBeginEditing = function() {
         scope.view.tbxFinalDeliveryPlace.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.LatestShipmentDate.tbxDateInputKA.restrictCharactersSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
    },
     /**
	* @api : initActionsOfTextBoxesOfShipmentDetails
 	* Actions of text boxes of Credit details are initialized
	* @return : NA
	*/
    initActionsOfTextBoxesOfDocumentTerms: function () {
      var scope = this;
      this.performValidationScreen4();
     this.performMinimumDataFillValidationScreen4();
      this.view.tbxDescription.onBeginEditing = function() {
       scope.view.tbxDescription.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxRequiredDocuments.onBeginEditing = function() {
         scope.view.tbxRequiredDocuments.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxAdditionalCondition.onBeginEditing = function() {
        scope.view.tbxAdditionalCondition.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxOtherCondition.onBeginEditing = function() {
        scope.view.tbxOtherCondition.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxCharges.onBeginEditing = function() {
        scope.view.tbxCharges.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
    },
    /**
  * @api : performValidationScreen1
  * performs data validation for text boxes in Credit Details
  * @return : NA
  */
    performValidationScreen1: function() {
      var scope = this;
      this.view.tbxReferenceNumber.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxReferenceNumber.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxReferenceNumber, "tbxReferenceNumber", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxTotalPercentage.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxTotalPercentage.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxTotalPercentage, "tbxTotalPercentage", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxAvailable1.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxAvailable1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxAvailable1, "tbxAvailable1", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxAvailable2.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxAvailable2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxAvailable2, "tbxAvailable2", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxAvailable3.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxAvailable3.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxAvailable3, "tbxAvailable3", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxAvailable4.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxAvailable4.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxAvailable4, "tbxAvailable4", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxExpiryPlace.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxExpiryPlace.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxExpiryPlace, "tbxExpiryPlace", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxMessage.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxMessage.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxMessage, "tbxMessage", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };

    },
    /**
  * @api : performMinimumDataFillValidationScreen1
  * performs minimum data validation for text boxes in Screen 1
  * @return : NA
  */
    performMinimumDataFillValidationScreen1: function() { 
      var scope = this;
      this.view.tbxReferenceNumber.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxReferenceNumber.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxTotalPercentage.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxTotalPercentage.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxAvailable1.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxAvailable1.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxExpiryPlace.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxExpiryPlace.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxAmount.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxAmount.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxPayableAmount.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxPayableAmount.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxMessage.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
		scope.view.tbxMessage.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.IssueDate.tbxDateInputKA.onTextChange = function(){
         scope.businessController.minFillValidation(scope.constructDVFInput());
      };
      this.view.ExpiryDate.tbxDateInputKA.onTextChange = function(){
         scope.businessController.minFillValidation(scope.constructDVFInput());
      }
    },

    /*onAmountChanged : defining format of amount*/
    onAmountChanged: function(widgetName) {
      //var formatData = this.getParsedValue(this._amountFormat);
      this.validateAndFormatAmount(widgetName,{"locale":"","positiveFormat":"{CS}{D}","negativeFormat":"-({CS}{D})","fractionDigits":"2"});
     this.checkClearSaveButtonEnable();
    },
    /**
	      validateAndFormatAmount: Validates the amount in the given amount field reference and then formats it if the amount is valid.
	      */
    validateAndFormatAmount : function(widgetId, formatData){
      var scope = this;
      var amount = widgetId.text;
      var formattedAmount;
      if(!this.isValidAmount(amount)){
        if(widgetId.id ==="tbxAmount"){
          this.businessController.storeInCollection("",widgetId.id,scope.dataMapping);
          this.businessController.storeInCollection("","formattedAmount",scope.dataMapping);
        }else if(widgetId.id === "tbxPayableAmount"){
          this.businessController.storeInCollection("",widgetId.id,scope.dataMapping);      
          this.businessController.storeInCollection("","formattedPayableAmount",scope.dataMapping);
        }else if (widgetId.id === "tbxMaxCredit") {                   
          this.businessController.storeInCollection(amount, "tbxMaxCredit", scope.dataMapping);
        }
        return false;
      }else{   
        if(widgetId.id ==="tbxAmount"){
          formattedAmount = this.formatCurrencyWithCommas(amount, true, "", formatData);
          if(formattedAmount !== "Infinity"){
          widgetId.text = formattedAmount;
          this.businessController.storeInCollection(widgetId.text.replace(/,/g, ''),widgetId.id,scope.dataMapping);
          this.businessController.storeInCollection(formattedAmount,"formattedAmount",scope.dataMapping);
          }else{
            widgetId.text = "";
            this.businessController.storeInCollection("",widgetId.id,scope.dataMapping);
            this.businessController.storeInCollection("","formattedAmount",scope.dataMapping);
          }
        }else if(widgetId.id === "tbxPayableAmount"){
          formattedAmount =  this.formatCurrencyWithCommas(amount, true, "", formatData);
          if(formattedAmount !== "Infinity"){
          widgetId.text = formattedAmount;
          this.businessController.storeInCollection(widgetId.text.replace(/,/g, ''),widgetId.id,scope.dataMapping);      
          this.businessController.storeInCollection(formattedAmount,"formattedPayableAmount",scope.dataMapping);
          }else{
            widgetId.text = "";
            this.businessController.storeInCollection("",widgetId.id,scope.dataMapping);      
            this.businessController.storeInCollection("","formattedPayableAmount",scope.dataMapping);
          }
        }
        else if (widgetId.id === "tbxMaxCredit") {                   
          this.businessController.storeInCollection(amount, "tbxMaxCredit", scope.dataMapping);
        }
        scope.businessController.minFillValidation(scope.constructDVFInput());
      }
    },
    /**
   isValidAmount : Method to validat amount field
         */
    isValidAmount : function(amount) {
      return amount !== undefined && amount !== null && !isNaN(amount) && amount !== "";
    },
    /**
	      formatCurrencyWithCommas - Returns formatted amount string. Adds commas and currency symbol to a given amount string.
	      */
    formatCurrencyWithCommas : function(amount, currencySymbolNotRequired, currencySymbolCode, formatData){
      amount = this.formatUtil.deFormatAmount(amount);
      if (currencySymbolNotRequired) {
        return this.formatUtil.formatAmount(amount,formatData);
      } else if(currencySymbolCode){
        return this.formatUtil.formatAmountandAppendCurrencySymbol(amount,currencySymbolCode,formatData);
      } else {
        return this.formatUtil.formatAmountandAppendCurrencySymbol(amount,"",formatData);
      }
    },

    /**
				     * onEditAmount
				     * @api : onEditAmount
				     * triggered when amount gets edited
				     * @return : NA
				     */
    onEditAmount: function(widgetName) {
      this.removeCurrencyWithCommas(widgetName);
    },

    /**
				      validateAndFormatAmount: Validates the amount in the given amount field reference and then formats it if the amount is valid.
				      */
    removeCurrencyWithCommas : function(widgetId){
      var amount = widgetId.text;
      if(amount === undefined || amount === null || amount === ""){
        return false;
      }else{
        widgetId.text = this.formatUtil.deFormatAmount(amount);
        return true;
      }
    },
    /**
  * @api : performValidationScreen2
  * performs data validation for text boxes in Beneficiary Details
  * @return : NA
  */
    performValidationScreen2: function() {
      var scope = this;
      this.view.tbxBeneficiaryName.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBeneficiaryName.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBeneficiaryName, "tbxBeneficiaryName", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBeneficiaryAddress1.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBeneficiaryAddress1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBeneficiaryAddress1, "tbxBeneficiaryAddress1", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
       this.view.tbxBeneficiaryAddress2.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
         scope.view.tbxBeneficiaryAddress2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBeneficiaryAddress2, "tbxBeneficiaryAddress2", this.allowSpacesAndSpecialCharacters);
         scope.checkClearSaveButtonEnable();
      };
      this.view.tbxCity.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxCity.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxCity, "tbxCity", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBeneficiaryZipCode.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBeneficiaryZipCode.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBeneficiaryZipCode, "tbxBeneficiaryZipCode", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBankName.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBankName.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBankName, "tbxBankName", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBankAddress1.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBankAddress1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBankAddress1, "tbxBankAddress1", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBankAddress2.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBankAddress2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBankAddress2, "tbxBankAddress2", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBankCity.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBankCity.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBankCity, "tbxBankCity", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxBankZipCode.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxBankZipCode.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxBankZipCode, "tbxBankZipCode", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
    },
    /**
  * @api : performMinimumDataFillValidationScreen2
  * performs minimum data validation for text boxes in Screen 2
  * @return : NA
  */
    performMinimumDataFillValidationScreen2: function() { 
      var scope = this;
       this.view.tbxBeneficiaryName.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
         scope.view.tbxBeneficiaryName.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBeneficiaryAddress1.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBeneficiaryAddress1.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxCity.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxCity.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBeneficiaryZipCode.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBeneficiaryZipCode.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankName.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBankName.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankAddress1.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBankAddress1.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankAddress2.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBankAddress2.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBeneficiaryAddress2.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBeneficiaryAddress2.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankCity.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBankCity.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      this.view.tbxBankZipCode.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
        scope.view.tbxBankZipCode.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
            
    },
     /**
  * @api : performValidationScreen3
  * performs data validation for text boxes in Shipment Details
  * @return : NA
  */
    performValidationScreen3: function() {
      var scope = this;
      this.view.tbxPlaceOfCharge.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxPlaceOfCharge.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxPlaceOfCharge, "tbxPlaceOfCharge", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxPortLoading.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxPortLoading.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxPortLoading, "tbxPortLoading", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxPortCharge.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxPortCharge.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxPortCharge, "tbxPortCharge", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxFinalDeliveryPlace.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxFinalDeliveryPlace.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxFinalDeliveryPlace, "tbxFinalDeliveryPlace", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      
    },
    /**
  * @api : performMinimumDataFillValidationScreen3
  * performs minimum data validation for text boxes in Screen 3
  * @return : NA
  */
    performMinimumDataFillValidationScreen3: function() {       
    },
    /**
  * @api : performValidationScreen4
  * performs data validation for text boxes in Documents and Terms Screen
  * @return : NA
  */
    performValidationScreen4: function() {
      var scope = this;
      this.view.tbxDescription.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxDescription.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxDescription, "tbxDescription", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxRequiredDocuments.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxRequiredDocuments.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxRequiredDocuments, "tbxRequiredDocuments", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxAdditionalCondition.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxAdditionalCondition.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxAdditionalCondition, "tbxAdditionalCondition", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxOtherCondition.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxOtherCondition.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxOtherCondition, "tbxOtherCondition", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      this.view.tbxCharges.onEndEditing = function() {
        this.allowSpacesAndSpecialCharacters = true;
        scope.view.tbxCharges.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" : "ICSknTextBoxSSPR42424215px";
        scope.processDataValidation(scope.view.tbxCharges, "tbxCharges", this.allowSpacesAndSpecialCharacters);
        scope.checkClearSaveButtonEnable();
      };
      
    },
    /**
  * @api : performMinimumDataFillValidationScreen4
  * performs minimum data validation for text boxes in Screen 4
  * @return : NA
  */
    performMinimumDataFillValidationScreen4: function() {   
      var scope = this;
      this.view.tbxCharges.onKeyUp = function() {
        scope.businessController.minFillValidation(scope.constructDVFInput());
         scope.view.tbxCharges.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
    },
     /**
	* @api : processDataValidation
 	* makes data ready for performing data valodation
	* @return : NA
	*/
    processDataValidation: function (widgetScope, widgetName, allowSpacesAndSpecialChar) {
      var scope = this;
      var mappedValueForWidget = scope.getMappedValueForWidget(widgetName, scope.dataMapping);
      var inputData = widgetScope.text;
      if(inputData) {
        let dataValadationObj = {
          inputData,
          mappedValueForWidget,
          widgetName,
          dataMapping: scope.dataMapping,
          allowSpacesAndSpecialChar
        };
        scope.businessController.performDataValidation(dataValadationObj);
      }else {
        this.businessController.storeInCollection("", widgetName, scope.dataMapping);
      }
    },
    /**
     * @api : getMappedValueForWidget
     * Get mapped data of the corresponding widget
     * @return : mapped value
     */
    getMappedValueForWidget: function(widget, dataMapping) {
      for(var record in dataMapping) {
        var keyValues = dataMapping[record];
        for(var key in keyValues) {
          if(widget === key) {
            var fieldValue = dataMapping[record][widget];
            fieldValue = fieldValue.split(".")[2].replace("}","");
            return fieldValue;
          } } }
    },

    /**
	* @api : constructDVFInput
	* constructs input for data validation
	* @return : JSON for DVF input
	*/
    constructDVFInput: function() {
      var scope = this;
      var jsonToReturn = "";
      if(scope.view.flxCreditDetails.isVisible ) {
        jsonToReturn = {
          "tbxReferenceNumber" : scope.view.tbxReferenceNumber.text,
          "tbxAmount" : scope.view.tbxAmount.text,
          "tbxAvailable1" : scope.view.tbxAvailable1.text,
          "tbxExpiryPlace" : scope.view.tbxExpiryPlace.text,
          "tbxMessage" : scope.view.tbxMessage.text,
          "tbxIssueDate" : scope.view.IssueDate.tbxDateInputKA.text,
          "tbxExpiryDate" : scope.view.ExpiryDate.tbxDateInputKA.text
        };
      }
      else if(scope.view.flxBeneficiaryDetails.isVisible ) {
        jsonToReturn = {
          "tbxBeneficiaryName" : this.view.tbxBeneficiaryName.text,
          "tbxBeneficiaryAddress1" : this.view.tbxBeneficiaryAddress1.text,
          "tbxCity" : this.view.tbxCity.text, 
          "tbxBankName" : this.view.tbxBankName.text,
          "tbxBankAddress1" : this.view.tbxBankAddress1.text,
          "tbxBankAddress2": this.view.tbxBankAddress2.text,
          "tbxBeneficiaryAddress2": this.view.tbxBeneficiaryAddress2.text,
          "tbxBankCity" : this.view.tbxBankCity.text
        };
      }
         else if(scope.view.flxShipmentDetails.isVisible ) {
        jsonToReturn = {
          
        };
      }else if(scope.view.flxDocuments.isVisible ) {
        jsonToReturn = {
          "tbxCharges" : this.view.tbxCharges.text,
        };
      }
      return jsonToReturn; 
    },
    /**
	* @api : validateData
 	* responsible for performing data validation
	* @return : NA
	*/
    validateData: function(dataValidator, widgetId) {
      var scope = this;
      if(dataValidator === "") {
    //    this.view.flxWarning.setVisibility(false);
        this.hideErrorMessage(dataValidator, widgetId);
        this.view[widgetId].skin = "ICSknTextBoxSSPR42424215px";
      }
     else if(dataValidator !== "") {
        this.invokedvfFieldErrorParser(dataValidator,widgetId);
      }
    },
    /**
     * invokedvfFieldErrorParser
     * @api : invokedvfFieldErrorParser
     * gets invoked when validation fails
     * @return : NA
     */
    invokedvfFieldErrorParser: function(dvfError,widgetId) {
      var self = this;
      var txtField, iterator;
       var errWidget = widgetId.replace("tbx","lblErr");
      for(iterator in dvfError) {
        if((iterator === "tbxAvailable1" || iterator === "tbxAvailable2" || iterator === "tbxAvailable3"|| iterator === "tbxAvailable4") && dvfError !== "") {
          this.view[widgetId].skin = "ICSknTextBoxEE0005";
          this.view.lblErrAvailableWith.isVisible = true;
        //  txtField = "Reference Number";
        }
        else if(iterator === "tbxBeneficiaryAddress1" && dvfError !== "") {
          this.view.tbxBeneficiaryAddress1.skin = "ICSknTextBoxEE0005";
          this.view.lblErrBeneficiaryAddress.isVisible = true;
        }
        else if(iterator === "tbxBeneficiaryAddress2" && dvfError !== "") {
          this.view.tbxBeneficiaryAddress2.skin = "ICSknTextBoxEE0005";
          this.view.lblErrBeneficiaryAddress.isVisible = true;
        }
        else if(iterator === "tbxBankAddress1" && dvfError !== "") {
          this.view.tbxBankAddress1.skin = "ICSknTextBoxEE0005";
          this.view.lblErrBankAddress.isVisible = true;
        }
        else if(iterator === "tbxBankAddress2" && dvfError !== "") {
          this.view.tbxBankAddress2.skin = "ICSknTextBoxEE0005";
          this.view.lblErrBankAddress.isVisible = true;
        }
        else if(errWidget && dvfError !== "") {
          this.view[widgetId].skin = "ICSknTextBoxEE0005";
          this.view[errWidget].isVisible = true;
         // txtField = "Expiry Place";
        }
      }  
    },
     /**
  * @api : hideErrorMessage
  * Method to hide error message
  * @return : NA
  */
    hideErrorMessage: function(dvfError,widgetId){
      var scope = this;
      var errWidget = widgetId.replace("tbx","lblErr");
        if((widgetId === "tbxAvailable1" || widgetId === "tbxAvailable2" || widgetId === "tbxAvailable3" || widgetId === "tbxAvailable4") && dvfError === ""){
          this.view.lblErrAvailableWith.isVisible = false;
        }
        else if((widgetId === "tbxBeneficiaryAddress1" || widgetId === "tbxBeneficiaryAddress2") && dvfError === ""){
          this.view.lblErrBeneficiaryAddress.isVisible = false;
        }
        else if((widgetId === "tbxBankAddress1" || widgetId === "tbxBankAddress2" ) && dvfError === ""){
         this.view.lblErrBankAddress.isVisible = false;
        }
        else if(errWidget && scope.view[errWidget]){
          this.view[errWidget].isVisible = false;
        }
    },
    /**
  * @api : enableOrDisableContinueButton
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    enableOrDisableContinueButton: function(dvfError) {
      var scope = this;
      this.collectionObj = LCIssuanceStore.getState();
      var enableButton = scope.collectionObj.Collection.enableButton;
      var errorMessageExist = this.checkErrorMessageExist();
      if(enableButton && dvfError === "" && !errorMessageExist) {
          this.enableContinueButton();
      }
      else
        this.disableContinueButton();
    },
    /**
  * @api : checkErrorMessageExist
  * Check whether error message exist or not in current screen
  * @return : NA
  */
    checkErrorMessageExist: function() {
      if(this.view.flxCreditDetails.isVisible){
        if(this.view.lblErrReferenceNumber.isVisible  || this.view.lblErrTotalPercentage.isVisible || this.view.lblErrAvailableWith.isVisible ||
           this.view.lblErrIssueDate.isVisible || this.view.lblErrExpiryDate.isVisible || this.view.lblErrExpiryPlace.isVisible || this.view.lblErrMessage.isVisible)
          return true;
      }
        else if(this.view.flxBeneficiaryDetails.isVisible){
          if(this.view.lblErrBeneficiaryName.isVisible || this.view.lblErrBeneficiaryAddress.isVisible  || this.view.lblErrCity.isVisible || this.view.lblErrBeneficiaryZipCode.isVisible ||
             this.view.lblErrBankName.isVisible || this.view.lblErrBankAddress.isVisible || this.view.lblErrBankCity.isVisible || this.view.lblErrBankZipCode.isVisible)
            return true;
        }
          else if(this.view.flxShipmentDetails.isVisible){
            if(this.view.lblErrPlaceOfCharge.isVisible || this.view.lblErrPortLoading.isVisible  || this.view.lblErrPortCharge.isVisible || this.view.lblErrFinalDeliveryPlace.isVisible ||
               this.view.lblErrLatestShipmentDate.isVisible )
              return true;
          }
            else if(this.view.flxDocuments.isVisible){
              if(this.view.lblErrDescription.isVisible || this.view.lblErrRequiredDocuments.isVisible  || this.view.lblErrAdditionalCondition.isVisible
                || this.view.lblErrOtherCondition.isVisible || this.view.lblErrCharges.isVisible)
                return true;
              }
              return false;
            
          },
      /**
  * @api : checkNavigationCreditDetails
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    checkNavigationCreditDetails: function(dvfError) {
      var scope = this;
      var enableButton = false;
      this.collectionObj = LCIssuanceStore.getState();
     // var enableButton = scope.collectionObj.Collection.enableButton;
      if(scope.businessController.getDataBasedOnDataMapping("lblValuePaymentTerms", scope.dataMapping)){
       enableButton = true;
      }else
        this.disableContinueButton();        
      if(this.collectionObj.Collection["enableButton"] && enableButton) {
        this.enableOrDisableContinueButton(dvfError);
      }else{
        this.disableContinueButton();
      }
      
    },
     /**
  * @api : checkNavigationBeneficiaryDetails
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    checkNavigationBeneficiaryDetails: function(dvfError) {
      var scope = this;
      var enableButton = false;
      this.collectionObj = LCIssuanceStore.getState();
      if(this.collectionObj.Collection["enableButton"]) {
        this.enableOrDisableContinueButton(dvfError);
      }else{
        this.disableContinueButton();
      }
      
    },
     /**
  * @api : checkNavigationShipmentDetails
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    checkNavigationShipmentDetails: function(dvfError) {
      var scope = this;
      var enableButton = false;
      this.collectionObj = LCIssuanceStore.getState();
      if(scope.businessController.getDataBasedOnDataMapping("lblSelectedIncoTerms", scope.dataMapping)){
       enableButton = true;
        if(!scope.collectionObj.Collection.enableButton)
        scope.businessController.resetButtonStatus(true);
      }else
        this.disableContinueButton(); 
      if(this.collectionObj.Collection["enableButton"] && enableButton) {
        this.enableOrDisableContinueButton(dvfError);
      }else{
        this.disableContinueButton();
      }
      
    },
     /**
  * @api : checkNavigationDocuments
  * decides whether the continue button shuold be enabled or not
  * @return : NA
  */
    checkNavigationDocuments: function(dvfError) {
      var scope = this;
      var enableButton = false;
      this.collectionObj = LCIssuanceStore.getState();
      if(scope.businessController.getDataBasedOnDataMapping("lblSelectedInstruction", scope.dataMapping) &&
        scope.businessController.getDataBasedOnDataMapping("lblSelectedTransferable", scope.dataMapping) &&
        scope.businessController.getDataBasedOnDataMapping("lblSelectedStandByLC", scope.dataMapping)){
         enableButton = true;
      }
      else{
       enableButton = false;
      }
      if(this.collectionObj.Collection["enableButton"] && enableButton) {
        this.enableOrDisableContinueButton(dvfError);
      }else{
        this.disableContinueButton();
      }
    },
    /**
  * @api : enableContinueButton
  * enables continume button
  * @return : NA
  */
    enableContinueButton: function() { 
      this.view.btnSaveContinue.setEnabled(true);
      this.view.btnSaveContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
    },

    /**
  * @api : disableContinueButton
  * disables continume button 
  * @return : NA
  */
    disableContinueButton: function() { 
      this.view.btnSaveContinue.setEnabled(false);
      this.view.btnSaveContinue.skin = "ICSknbtnDisablede2e9f036px";
    },
    /**
    * setDropdownValues
    * @api : setDropdownValues
    * set values in dropdown
    * @return : NA
    */
    setDropdownValues: function (seg, listValues, lblSelectedValue,defaultValue) {
      var scope = this;
      try {
        var segmentData = [];
        var dropDownValues = listValues.DropdownValues;
        if (listValues) {          
          seg.widgetDataMap = {
            "lblListValue": "value",
            "selectedKey": "key"
          };
          for (key in dropDownValues) {
            segmentData.push({
              "key": key,
              "value": scope.businessController.getDataBasedOnDataMapping(key,listValues)
            });
          }
          if(scope.businessController.getDataBasedOnDataMapping(lblSelectedValue,scope.dataMapping))
             this.view[lblSelectedValue].text = scope.businessController.getDataBasedOnDataMapping(scope.businessController.getDataBasedOnDataMapping(lblSelectedValue,scope.dataMapping),listValues);
          // this.view[lblSelectedValue].text = this.businessController.getValueFromString(listValues["SelectedValue"]);
          else if(defaultValue){
            this.businessController.storeInCollection(defaultValue,lblSelectedValue,this.dataMapping);
            this.view[lblSelectedValue].text = scope.businessController.getDataBasedOnDataMapping(scope.businessController.getDataBasedOnDataMapping(lblSelectedValue,scope.dataMapping),listValues);
          }else
           this.view[lblSelectedValue].text = scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
          seg.setData(segmentData);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDropdownValues",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : getTodayDate
     * To get today date
     * @return : NA
     */
    getTodayDate: function () {
      var scope = this;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      return today;
    },
    /**
     * @api : toggleDropdownVisibility
     * toggle Custom dropdown visibility
     * @return : NA
     */
    toggleDropdownVisibility: function (flxDropdwonList, imgDropdownIcon) {
      if (flxDropdwonList.isVisible) {
        flxDropdwonList.isVisible = false;
        imgDropdownIcon.src =  "dropdown_expand.png";
      } else {
        this.hideAllCreditDropdowns();
        this.hideAllShipmentDropdowns();
        this.hideAllDocumentDropdowns();
        flxDropdwonList.isVisible = true;
        imgDropdownIcon.src =  "dropdown_collapse.png";        
      }
    },
    /**
     * @api : onDropdownSelection
     * Method to set the selected value from dropdown
     * @return : NA
     */
    onDropdownSelection: function(segName,lblSelectedValue,flxDropdown,imgDropdownIcon,dropDownValues){
        var selectedData = segName.selectedRowItems[0];  
        var scope = this;
        if(lblSelectedValue === "lblSelectedChargeValue"){
          this.view.lblSelectedChargeValue.skin = "ICSknLbl42424215PX";
        }
        if(lblSelectedValue === "lblValueCommissionAccount"){
          this.view.lblValueCommissionAccount.skin = "ICSknLbl42424215PX";
        }
        if(lblSelectedValue === "lblValueMarginAccount"){
          this.view.lblValueMarginAccount.skin = "ICSknLbl42424215PX";
        }
        flxDropdown.isVisible = false;
        imgDropdownIcon.src =  "dropdown_expand.png";
        this.view[lblSelectedValue].text = selectedData["value"];
        this.businessController.storeInCollection(selectedData["key"],lblSelectedValue,this.dataMapping);
        this.checkClearSaveButtonEnable();
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
       this.businessController.storeDataFetchedFromExistingRecord(context);
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
     * onClickOfSaveContinue
     * Method to create invoke service and perform navigation accordingly 
     * @return : NA
     */
    onClickOfSaveContinue: function(){
      this.hideAllCreditDropdowns();
      this.hideAllShipmentDropdowns();
      this.hideAllDocumentDropdowns();
      this.checkAndUpdateFlowType();
      this.isCreateLCServiceCheck = true;
      this.businessController.invokeCreateLetterOfCreditsService();
    },
       /**
     * checkAndUpdateFlowType
     * Method to set the params before invoke service 
     * @return : NA
     */
    checkAndUpdateFlowType: function(){
      this.collectionObj = LCIssuanceStore.getState();
      this.dataJSON = this.collectionObj.Collection[this.serviceParameters.CreateLC.Object];
      if(this.currentFlow === "Beneficiary details"){
      this.dataJSON["beneficiaryState"] = "New York";
      this.dataJSON["beneficiaryBankState"] = "New York";
      this.dataJSON["beneficiaryBank"] = this.view.tbxBankName.text;
      this.dataJSON["beneficiaryBankAdressLine1"] = this.view.tbxBankAddress1.text;
      this.dataJSON["beneficiaryBankAdressLine2"] = this.view.tbxBankAddress2.text;
      this.dataJSON["beneficiaryBankCity"] = this.view.tbxBankCity.text;
      this.dataJSON["beneficiaryBankPostCode"] = this.view.tbxBankZipCode.text;

 //     this.dataJSON["beneficiaryCountry"] = "BeneficiaryCountry";
  //    this.dataJSON["beneficiaryBankCountry"] = "BankCounty";
      }
    //  this.dataJSON["isDraft"] = this.currentFlow === "ReviewAndSubmit" ? "No" : "Yes";
      this.dataJSON["flowType"] = this.currentFlow === "ReviewAndSubmit" && this.isSaveAndCloseAction !== true ? "finalSubmit" : "Draft";
      if(!this.isDeleteAndCloseAction)
      this.dataJSON["status"] = this.currentFlow === "ReviewAndSubmit" && this.isSaveAndCloseAction !== true ? "finalSubmit" : "Draft";
      else{
      this.dataJSON["status"] = "Delete";
      this.isDeleteAndCloseAction = false;
      }
      this.isSaveAndCloseAction = false;
      this.updateCriteria();
      this.businessController.updateCollectionObject(this.dataJSON,this.serviceParameters.CreateLC.Object);      
    },
    /**
     * performSaveDeleteClose
     * Method to invoke  service to save entered data and close the create flow 
     * @return : NA
     */
    performSaveDeleteClose: function(){
      this.checkAndUpdateFlowType();
      this.isDeleteAndCloseAction = true;
      this.businessController.invokeDeleteLetterOfCreditsService();
    },
    /**
     * performSaveAction
     * Method to perform save action
     * @return : NA
     */
    performSaveAction: function(){
      this.checkAndUpdateFlowType();
      this.isSaveAction = true;
      this.businessController.invokeCreateLetterOfCreditsService();
    },
    /**
     * performSaveCloseAction
     * Method to perform save and close action
     * @return : NA
     */
    performSaveCloseAction: function(){
      this.isSaveAndCloseAction = true;
      this.checkAndUpdateFlowType();
      this.isSaveAndCloseAction = true;
      this.businessController.invokeCreateLetterOfCreditsService();
    },
    /**
     * updateCriteria
     * Method to update service criteria
     * @return : NA
     */
     updateCriteria: function(){
       var scope = this;
       var serviceCriteria;
       if(scope.actualFlow === "Credit details"){        
       serviceCriteria  = Object.assign({},  scope.serviceParameters.CreateLC.CreditDetailsCriteria);
      }else if(scope.actualFlow === "Beneficiary details"){
       serviceCriteria = Object.assign({},  scope.serviceParameters.CreateLC.CreditDetailsCriteria,scope.serviceParameters.CreateLC.BeneficiaryDetailsCriteria);
      }else if(scope.actualFlow === "Shipment details"){
       serviceCriteria = Object.assign({},  scope.serviceParameters.CreateLC.CreditDetailsCriteria,scope.serviceParameters.CreateLC.BeneficiaryDetailsCriteria,scope.serviceParameters.CreateLC.ShipmentDetailsCriteria);
      }else if(scope.actualFlow === "Documents and Terms" || scope.actualFlow === "ReviewAndSubmit"){
       serviceCriteria = Object.assign({},  scope.serviceParameters.CreateLC.CreditDetailsCriteria,scope.serviceParameters.CreateLC.BeneficiaryDetailsCriteria,scope.serviceParameters.CreateLC.ShipmentDetailsCriteria,scope.serviceParameters.CreateLC.DocumentsTermsCriteria);
      }
       this.serviceParameters.CreateLC["Criteria"] = serviceCriteria;
       scope.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.breakpoints);
     },
    /**
     * doContinue
     * Method to update progress tracker and navigate to next section
     * @return : NA
     */
    doContinue: function(){
      var scope = this;
      var data = [];
      if(scope.view.flxCreditDetails.isVisible){
        data = [{"currentRow" : false,"rowLabel": "Credit Details","rowStatus":"done"},
                {"currentRow" : true,"rowLabel": "Beneficiary Details","rowStatus":"Inprogress"},
                {"currentRow" : false,"rowLabel": "Shipment Details","rowStatus":"Incomplete"},
                {"currentRow" : false,"rowLabel": "Documents and Terms","rowStatus":"Incomplete"},
                {"currentRow" : false,"rowLabel": "Review & Submit","rowStatus":"Incomplete"}
               ];
        if(scope.currentFlow === scope.actualFlow){
        scope.actualFlow = "Beneficiary details";
      }
        this.currentFlow = "Beneficiary details";
        this.setBeneficiaryDetails();
      }else if(scope.view.flxBeneficiaryDetails.isVisible){
        data = [{"currentRow" : false,"rowLabel": "Credit Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Beneficiary Details","rowStatus":"done"},
                {"currentRow" : true,"rowLabel": "Shipment Details","rowStatus":"Inprogress"},
                {"currentRow" : false,"rowLabel": "Documents and Terms","rowStatus":"Incomplete"},
                {"currentRow" : false,"rowLabel": "Review & Submit","rowStatus":"Incomplete"}
               ];     
         if(scope.currentFlow === scope.actualFlow)
        scope.actualFlow = "Shipment details";
        this.currentFlow = "Shipment details";
        this.setShipmentDetails();
      }else if(scope.view.flxShipmentDetails.isVisible){
        data = [{"currentRow" : false,"rowLabel": "Credit Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Beneficiary Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Shipment Details","rowStatus":"done"},
                {"currentRow" : true,"rowLabel": "Documents and Terms","rowStatus":"Inprogress"},
                {"currentRow" : false,"rowLabel": "Review & Submit","rowStatus":"Incomplete"}
               ];
        if(scope.currentFlow === scope.actualFlow)
         scope.actualFlow = "Documents and Terms";
         this.currentFlow = "Documents and Terms";
         this.setDocumentTermsDetails();
      }else if(scope.view.flxDocuments.isVisible){
        data = [{"currentRow" : false,"rowLabel": "Credit Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Beneficiary Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Shipment Details","rowStatus":"done"},
                {"currentRow" : false,"rowLabel": "Documents and Terms","rowStatus":"done"},
                {"currentRow" : true,"rowLabel": "Review & Submit","rowStatus":"Inprogress"}
               ];
        if(scope.currentFlow === scope.actualFlow)
          scope.actualFlow = "ReviewAndSubmit";
        scope.currentFlow = "ReviewAndSubmit";
        scope.view.btnBack.isVisible =  true;
        scope.view.btnSaveContinue.text = "Submit";
        scope.view.flxDocuments.isVisible = false;
        scope.view.flxReview.isVisible = true;
        scope.view.flxSeparatorReview.isVisible = true;
        scope.setReviewData();          
      }else if(scope.view.flxReview.isVisible){
        this.collectionObj = LCIssuanceStore.getState();
        scope.handleNavigation(this.collectionObj.Collection);
     // new kony.mvc.Navigation({"appName" : "TradeFinanceMA", "friendlyName" : "ImportLCUIModule/frmImportLCAcknowledgment"}).navigate(this.collectionObj.Collection);
      }
      data["currentFlow"] = this.currentFlow;
      data["actualFlow"] = this.actualFlow;
      this.setHeaderText(scope.currentFlow);
      this.updateProgressBar(data);
      scope.checkClearSaveButtonEnable();
      this.view.forceLayout();
    },
    /**
     * handleBackNavigation
     * Method to update progress tracker and navigate to next section
     * @return : NA
     */
    handleBackNavigation: function(){
      var scope = this;
      if(scope.currentFlow === "Beneficiary details"){
        scope.currentFlow = "Credit details";
        this.setHeaderText(scope.currentFlow);
        scope.setCreditDetails();
      }else if(scope.currentFlow === "Shipment details"){
        scope.currentFlow = "Beneficiary details";
        this.setHeaderText(scope.currentFlow);
        scope.setBeneficiaryDetails();
      }else if(scope.currentFlow === "Documents and Terms"){
        scope.currentFlow = "Shipment details";
        this.setHeaderText(scope.currentFlow);
        scope.setShipmentDetails();
      }else if(scope.currentFlow === "ReviewAndSubmit"){
        scope.currentFlow = "Documents and Terms";
        this.setHeaderText(scope.currentFlow);
        scope.setDocumentTermsDetails();
      }
      scope.view.btnSaveContinue.text = "Save & Continue";
       scope.view.flxSeparatorReview.isVisible = false;
    },
    /**
     * showSaveAsDraftPopup
     * Method to display the confirmation popup to save the data as draft
     * @return : NA
     */
    showSaveAsDraftPopup: function(){
      var scope = this; 
      scope.hideAllCreditDropdowns();
      scope.hideAllShipmentDropdowns();
      scope.hideAllDocumentDropdowns();
      scope.view.lblPopupText.text = scope.businessController.getDataBasedOnDataMapping("lblPopupSaveDraft", scope.dataMapping) ;
      scope.view.btnAction1.text = "No";  
      scope.view.btnAction2.text = "Yes"; 
      scope.view.lblClose.text = "Save Draft";
	  scope.view.btnAction1.setVisibility(true);										
      var form = kony.application.getCurrentForm();      
      var popupObj = this.view.flxPopup.clone();
      popupObj.flxClosePopup.setVisibility(true);
      popupObj.flxLookUpPopUp.setVisibility(false);
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      popupObj.flxClosePopup.btnAction1.onClick = function() {
        form.remove(popupObj);
      };
       popupObj.flxClosePopup.flxClose.onClick = function() {
        form.remove(popupObj);
      };
      popupObj.flxClosePopup.btnAction2.onClick = function() {
        form.remove(popupObj);
        scope.performSaveAction();
      };     
      this.view.forceLayout();
    },
    
    /**
     * showLookUpPopup
     * Method to display the confirmation popup to display bank details data
     * @return : NA
     */
    showLookUpPopup: function () {
      var scope = this;
      try {
        var form = kony.application.getCurrentForm();
        var popupObj = this.view.flxPopup.clone();
        popupObj.flxClosePopup.setVisibility(false);
        popupObj.flxLookUpPopUp.setVisibility(true);
        form.add(popupObj);
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "120%";
        popupObj.flxLookUpPopUp.centerY = "15%";
        popupObj.flxLookUpPopUp.flxLookUpPopUpHeader.lblLookUpPopUp.text = kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryBankLookUp") + "-" + kony.i18n.getLocalizedString("i18n.TransfersEur.LookUp");
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow1.flxLookUpBankName.lblLookUpBankName.text = kony.i18n.getLocalizedString("i18n.verifyDetails.bankName") + ":";
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow1.flxLookUpCity.lblLookUpCity.text = kony.i18n.getLocalizedString("kony.tab.common.City") + ":";
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow2.flxLookUpCountry.lblLookUpCountry.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Country") + ":";
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow3.flxLookUpBankCode.lblLookUpBankCode.text = kony.i18n.getLocalizedString("i18n.TradeFinance.bicSwiftCodeKey") + ":";
        scope.serviceParameters.LookUp.Criteria.bankName = "";
        scope.serviceParameters.LookUp.Criteria.city = "";
        scope.serviceParameters.LookUp.Criteria.country = "";
        scope.serviceParameters.LookUp.Criteria.branchName = "";
        scope.serviceParameters.LookUp.Criteria.iban = "";
        this.popUpObjDetails = popupObj;
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow3.flxLookUpPopUpSearch.btnLookUpPopUpSearch.onClick = function () {
          var bicSwiftCode = popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow3.flxLookUpBankCode.txtLookUpBankCode.text;
          if (bicSwiftCode === "") {
            scope.serviceParameters.LookUp.Criteria.bankName = popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow1.flxLookUpBankName.txtLookUpBankName.text;
            scope.serviceParameters.LookUp.Criteria.city = popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow1.flxLookUpCity.txtLookUpCity.text;
            scope.serviceParameters.LookUp.Criteria.country = popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow2.flxLookUpCountry.txtLookUpCountry.text;
            scope.serviceParameters.LookUp.Criteria.branchName = popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpSearchDetails.flxBankDetailsRow2.flxLookUpBranchName.txtLookUpBranchName.text;
            scope.serviceParameters.LookUp.Criteria.iban = "";
          } else {
            scope.serviceParameters.LookUp.Criteria.bankName = "";
            scope.serviceParameters.LookUp.Criteria.city = "";
            scope.serviceParameters.LookUp.Criteria.country = "";
            scope.serviceParameters.LookUp.Criteria.branchName = "";
            scope.serviceParameters.LookUp.Criteria.iban = bicSwiftCode;
          }
          scope.businessController.setProperties(scope.serviceParameters, this.dataFormatting, this.breakpoints);
          scope.businessController.invokeLookUpService();
        };
        popupObj.flxLookUpPopUp.flxLookUpPopUpHeader.imgLookUpPopUpClear.onTouchEnd = function () {
          form.remove(popupObj);
        };
        this.view.forceLayout();
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "showLookUpPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * setBankViewDetails
     * Method to configure the bank details data into segment
     * @return : NA
     */
    setBankViewDetails: function (scope, popupObj) {
      var scope = this;
      var data = this.lookUpData;
      var breakpoint = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      try {
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpBankDetails.flxLookUpPopUpBankDetailsList.segLookUpPopUpBankDetails.widgetDataMap = {
          lblValue1: "lblValue1",
          lblValue2: "lblValue2",
          flxValue3: "flxValue3",
          lblValue3: "lblValue3",
          flxBottomSeparator: "flxBottomSeparator"
        };
        var bankDetails = [];
        data.forEach(response => {
          bankDetails.push({
            lblValue1: {
              text: response.bic
            },
            lblValue2: {
              text: response.bankName + "," + response.branchName + "," + response.city + "," + response.country,
              skin: "ICSKNLbl42424215PxWordBreak",
              width: (breakpoint === 1024 || orientationHandler.isTablet) ? "297dp": "350dp"
            },
            flxValue3: {
              onClick: scope.onSelectClick.bind(scope, popupObj, data)
            },
            lblValue3: {
              text: kony.i18n.getLocalizedString("kony.mb.common.select")
            },
            flxBottomSeparator: {
              isVisible: true
            }
          });
        });
        popupObj.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpBankDetails.flxLookUpPopUpBankDetailsList.segLookUpPopUpBankDetails.setData(bankDetails);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setBankViewDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * onSelectClick
      * This Method defines the action need to be done for on click of select option 
      * @return : NA
      */
    onSelectClick: function (scope, popupObj) {
      var popupscope = scope;
      var scope = this;
      try {
        var form = kony.application.getCurrentForm();
        var index = popupscope.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpBankDetails.flxLookUpPopUpBankDetailsList.segLookUpPopUpBankDetails.selectedRowIndex;
        var rowIndex = index[1];
        var Data = popupscope.flxLookUpPopUp.flxLookUpPopUpContent.flxLookUpBankDetails.flxLookUpPopUpBankDetailsList.segLookUpPopUpBankDetails.data;
        var selectedData = Data[rowIndex];
        var bankDetails = this.collectionObj.Collection.LookUp.swiftCodes[rowIndex];
        var bankAddress = bankDetails.bankAddress ? bankDetails.bankAddress.split(",") : NA;
        scope.view.tbxBankName.text = bankDetails.bankName ? bankDetails.bankName : NA;
        scope.view.tbxBankAddress1.text = bankDetails.bankAddress ? bankAddress[0] : bankAddress;
        scope.view.tbxBankAddress2.text = bankDetails.bankAddress ? bankAddress[1] : bankAddress;
        scope.view.tbxBankCity.text = bankDetails.city ? bankDetails.city : NA;
        scope.view.tbxBankZipCode.text = bankDetails.zipcode ? bankDetails.zipcode : NA;
        scope.view.lblSelectedBankState.text = bankDetails.country ? bankDetails.country : NA;
        scope.enableContinueButton();
        scope.businessController.minFillValidation(scope.constructDVFInput());
        form.remove(popupscope);
        scope.view.forceLayout();
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "onSelectClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
     * showClearPopup
     * Method to display the confirmation popup to clear the current screen data
     * @return : NA
     */
    showClearPopup :function(){
      var scope = this; 
      scope.hideAllCreditDropdowns();
      scope.hideAllShipmentDropdowns();
      scope.hideAllDocumentDropdowns();
      scope.view.lblPopupText.text = scope.businessController.getDataBasedOnDataMapping("lblPopupClearDetails", scope.dataMapping)+""+this.actualFlow;
      scope.view.btnAction1.text = "No";  
      scope.view.btnAction2.text = "Yes"; 
      scope.view.lblClose.text = "Clear";
	  scope.view.btnAction1.setVisibility(true);										
      var form = kony.application.getCurrentForm();      
      var popupObj = this.view.flxPopup.clone();
      popupObj.flxClosePopup.setVisibility(true);
      popupObj.flxLookUpPopUp.setVisibility(false);    
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      popupObj.flxClosePopup.btnAction1.onClick = function() {
        form.remove(popupObj);
      };
       popupObj.flxClosePopup.flxClose.onClick = function() {
        form.remove(popupObj);
      };
      popupObj.flxClosePopup.btnAction2.onClick = function() {
        form.remove(popupObj);
        if(scope.currentFlow === "Credit details"){
          scope.clearFilledCreditDetails();
        }else if(scope.currentFlow === "Beneficiary details"){
          scope.clearFilledBeneficiaryDetails();
        }else if(scope.currentFlow === "Shipment details"){
          scope.clearFilledShipmentDetails();
        }else if(scope.currentFlow === "Documents and Terms"){       
          scope.clearFilledDocumentsTermsDetails();
        } 
        scope.showServiceMessage({"clearMessage": scope.currentFlow+" are cleared successfully"});
      };     
      this.view.forceLayout();
    },
    /**
     * showSaveClosePopup
     * @api : showlPopup
     * To display the popup
     * @return : NA
     */
    showSaveClosePopup :function(){
      var scope = this;
	  var configurationManager = applicationManager.getConfigurationManager();
      var deletePermission =  applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DELETE');
      if(deletePermission === true){
        scope.view.btnAction1.setVisibility(true);
      }else{
        scope.view.btnAction1.setVisibility(false);
      }
      scope.hideAllCreditDropdowns();
      scope.hideAllShipmentDropdowns();
      scope.hideAllDocumentDropdowns();
      scope.view.lblPopupText.text = scope.businessController.getDataBasedOnDataMapping("lblPopupSaveorDeleteLC", scope.dataMapping) ;
      scope.view.btnAction1.text = "Delete Permanently";  
      scope.view.btnAction2.text = "Save as Draft & Close"; 
      scope.view.lblClose.text = "Close";
      var form = kony.application.getCurrentForm();      
      var popupObj = this.view.flxPopup.clone();
      popupObj.flxClosePopup.setVisibility(true);
      popupObj.flxLookUpPopUp.setVisibility(false);  
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      popupObj.flxClosePopup.btnAction1.onClick = function() {
        form.remove(popupObj);
        scope.isDeleteAndCloseAction = true;
        scope.performSaveDeleteClose();
      };
      popupObj.flxClosePopup.flxClose.onClick = function() {
        form.remove(popupObj);        
      };
      popupObj.flxClosePopup.btnAction2.onClick = function() {
        form.remove(popupObj);
        scope.performSaveCloseAction();
      };     
      this.view.forceLayout();
    },
     /**
     * clearFilledCreditDetails
     * Method clear the field values in the credit details screen
     * @return : NA
     */
    clearFilledCreditDetails: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.dataJSON = this.collectionObj.Collection[scope.serviceParameters.CreateLC.Object];
      if(scope.collectionObj.Collection && scope.collectionObj.Collection["dvfResult"] && scope.collectionObj.Collection["dvfResult"].dvfError)
      delete(scope.collectionObj.Collection["dvfResult"]);
      this.dataJSON["lcReferenceNo"] = "";
      this.dataJSON["lcAmount"] = "";
      this.dataJSON["tolerancePercentage"] = "";
      this.dataJSON["maximumCreditAmount"] = "";  
      this.dataJSON["additionalAmountPayable"] = "";
      this.dataJSON["availableWith1"] = "";
      this.dataJSON["availableWith2"] = "";
      this.dataJSON["availableWith3"] = "";
      this.dataJSON["availableWith4"] = "";
      this.dataJSON["issueDate"] = "";
      this.dataJSON["expiryDate"] = "";        
      this.dataJSON["expiryPlace"] = "";
      this.dataJSON["messageToBank"] = "";
      this.dataJSON["formattedAmount"] = "";
      this.dataJSON["formattedPayableAmount"] = "";
      this.dataJSON["chargesAccount"] = "";
      this.dataJSON["commisionAccount"] = "";   
      this.dataJSON["marginAccount"] = "";
      this.dataJSON["paymentTerms"] = "";     
      this.view.lblValuePaymentTerms.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedChargeValue.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblValueCommissionAccount.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblValueMarginAccount.text = scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.businessController.updateCollectionObject(this.dataJSON,this.serviceParameters.CreateLC.Object);
      scope.preFillCreditDetailsTextbox();
      scope.checkClearSaveButtonEnable();
      this.clearCreditDetailsErrorMessage();
      }catch(err)
      {
        var errorObj =
            {
              "level" : "Component contoller",
              "method" : "clearFilledCreditDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * clearFilledBeneficiaryDetails
     * Method to clear the field values in the BeneficiaryDetails screen
     * @return : NA
     */
    clearFilledBeneficiaryDetails: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.dataJSON = this.collectionObj.Collection[scope.serviceParameters.CreateLC.Object];
      if(scope.collectionObj.Collection && scope.collectionObj.Collection["dvfResult"] && scope.collectionObj.Collection["dvfResult"].dvfError)
      delete(scope.collectionObj.Collection["dvfResult"]);
      this.dataJSON["beneficiaryName"] = "";
      this.dataJSON["beneficiaryAddressLine1"] = "";
      this.dataJSON["beneficiaryAddressLine2"] = "";
      this.dataJSON["beneficiaryCity"] = "";
      this.dataJSON["beneficiaryPostCode"] = "";
      this.dataJSON["beneficiaryBank"] = "";
      this.dataJSON["beneficiaryBankAdressLine1"] = "";
      this.dataJSON["beneficiaryBankAdressLine2"] = "";
      this.dataJSON["beneficiaryBankCity"] = "";
      this.dataJSON["beneficiaryBankPostCode"] = "";
      this.businessController.updateCollectionObject(this.dataJSON,this.serviceParameters.CreateLC.Object);
      scope.preFillBeneficiaryDetailsTextbox();
      scope.checkClearSaveButtonEnable();
      this.clearBeneficiaryDetailsErrorMessage();
      }catch(err)
      {
        var errorObj =
            {
              "level" : "Component contoller",
              "method" : "clearFilledBeneficiaryDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * clearFilledShipmentDetails
     * Method to clear the field values in the Shipment Details screen
     * @return : NA
     */
    clearFilledShipmentDetails: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.dataJSON = this.collectionObj.Collection[scope.serviceParameters.CreateLC.Object];
      if(scope.collectionObj.Collection && scope.collectionObj.Collection["dvfResult"] && scope.collectionObj.Collection["dvfResult"].dvfError)
      delete(scope.collectionObj.Collection["dvfResult"]);
      this.dataJSON["placeOfTakingIncharge"] = "";
      this.dataJSON["portOfLoading"] = "";
      this.dataJSON["portOfDischarge"] = "";
      this.dataJSON["placeOfFinalDelivery"] = "";
      this.dataJSON["latestShippingDate"] = "";
      this.dataJSON["transshipment"] = "";
      this.dataJSON["partialShipments"] = "";
      this.dataJSON["incoTerms"] = "";
      this.dataJSON["modeOfShipment"] = "";
      this.view.lblSelectedTranshipment.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedPartialShipment.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedIncoTerms.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedShipmentMode.text = scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.businessController.updateCollectionObject(this.dataJSON,this.serviceParameters.CreateLC.Object);
      scope.preFillShipmentDetailsTextbox();
      scope.checkClearSaveButtonEnable();
      this.clearShipmentDetailsErrorMessage();
      }catch(err){
        var errorObj =
            {
              "level" : "Component contoller",
              "method" : "clearFilledShipmentDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * clearFilledDocumentsTermsDetails
     * Method to clear the field values in the Documents and Terms screen
     * @return : NA
     */
    clearFilledDocumentsTermsDetails: function(){
      var scope = this;
      try{
      this.collectionObj = LCIssuanceStore.getState();  
      this.dataJSON = this.collectionObj.Collection[scope.serviceParameters.CreateLC.Object];
      if(scope.collectionObj.Collection && scope.collectionObj.Collection["dvfResult"] && scope.collectionObj.Collection["dvfResult"].dvfError)
      delete(scope.collectionObj.Collection["dvfResult"]);
      this.dataJSON["descriptionOfGoods"] = "";
      this.dataJSON["documentsRequired"] = "";
      this.dataJSON["additionalConditionsCode"] = "";
      this.dataJSON["otherAdditionalConditions"] = "";
      this.dataJSON["documentCharges"] = "";
      this.dataJSON["confirmationInstruction"] = "";
      this.dataJSON["transferable"] = "";
      this.dataJSON["standByLC"] = "";
      this.view.lblSelectedInstruction.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedTransferable.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);
      this.view.lblSelectedStandByLC.text =  scope.businessController.getDataBasedOnDataMapping("dropDownPlaceholder", scope.dataMapping);     
      this.businessController.updateCollectionObject(this.dataJSON,this.serviceParameters.CreateLC.Object);
      scope.preFillDocumentsTermsTextbox();
      scope.checkClearSaveButtonEnable();
      this.clearDocumentsTermsErrorMessage();
      }catch(err){
        var errorObj =
            {
              "level" : "Component contoller",
              "method" : "clearFilledDocumentsTermsDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * setReviewData
     * Method to set user entered data in review segment
     * @return : NA
     */
    setReviewData: function(){
       this.collectionObj = LCIssuanceStore.getState();
      var scope = this;
	  var formatUtil = applicationManager.getFormatUtilManager();
      this.view.segReview.widgetDataMap = {
        "flxDocument1": "flxDocument1",
        "flxDocument2": "flxDocument2",
        "flxDocument3": "flxDocument3",
        "flxDocuments": "flxDocuments",
        "flxDropDown": "flxDropDown",
        "flxReviewHeader": "flxReviewHeader",
        "flxReviewRight": "flxReviewRight",
        "flxReviewRowTemplate": "flxReviewRowTemplate",
        "flxReviewValues": "flxReviewValues",
        "flxSeparator2": "flxSeparator2",
        "flxRowTemplateSeparator" : "flxRowTemplateSeparator",
        "flxheaderWithDropdown": "flxheaderWithDropdown",
        "flxreviewRows": "flxreviewRows",
        "imgDownloadIcon1": "imgDownloadIcon1",
        "imgDownloadIcon2": "imgDownloadIcon2",
        "imgDownloadIcon3": "imgDownloadIcon3",
        "imgDropDown": "imgDropDown",
        "lblDocumentName1": "lblDocumentName1",
        "lblDocumentName2": "lblDocumentName2",
        "lblDocumentName3": "lblDocumentName3",
        "lblReview": "lblReview",
        "lblReviewValue1": "lblReviewValue1",
        "lblReviewValue2": "lblReviewValue2",
        "lblReviewValue3": "lblReviewValue3",
        "lblReviewValue4": "lblReviewValue4",
        "lblTransactionHeader": "lblTransactionHeader",
        "flxSwiftCodeContainer": "flxSwiftCodeContainer",
        "lblSwiftCode": "lblSwiftCode"
      };
      var maxCreditAmount;
      if (scope.getFieldValue("tbxMaxCredit") !== "NA") {
        maxCreditAmount = "$ "+this.formatCurrencyWithCommas(scope.getFieldValue("tbxMaxCredit"), true, "", {
          "locale": "",
          "positiveFormat": "{CS}{D}",
          "negativeFormat": "-({CS}{D})",
          "fractionDigits": "2"
        });
      } else maxCreditAmount = "NA";
      var amountWithCurrency = this.formatUtil.getCurrencySymbol(this.businessController.getDataBasedOnDataMapping("lblSelectedValueCurrency",this.dataMapping))+" "+scope.getFieldValue("formattedAmount");
      var payableAmountWithCurrency = scope.getFieldValue("formattedPayableAmount") === "NA" ? "NA" : this.formatUtil.getCurrencySymbol(this.businessController.getDataBasedOnDataMapping("lblSelectedValuePayableCurrency",this.dataMapping))+" "+scope.getFieldValue("formattedPayableAmount");
	  var chargesWithCurrency = formatUtil.formatAmountandAppendCurrencySymbol(scope.getFieldValue("tbxCharges"), this.businessController.getDataBasedOnDataMapping("lblSelectedValueCurrency", this.dataMapping));
      var reviewData = [
        [{
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("lblCreditDetails", scope.dataMapping) },
          "flxSeparator2": { isVisible: true },
          "imgDropDown": "dropdown_collapse.png"
        },
        [{
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.referenceNumber },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblReferenceNumber", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxReferenceNumber"), isVisible: true },
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.currencyAmount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblCreditAmountReview", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: amountWithCurrency, isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.tolerancePercentage },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPercentage", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxTotalPercentage") !== "NA" ? scope.getFieldValue("tbxTotalPercentage") + " %" : "NA", isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.maximumCreditAmount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblMaxCredit", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: maxCreditAmount, isVisible: true },
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.currencyAdditionalPayableAmount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPayableAmount", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: payableAmountWithCurrency, isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.paymentTerms },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPaymentTerms", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("lblValuePaymentTerms", scope.dataMapping["PaymentTermsDropdown"], true), isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.availableWith },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblAvailable", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxAvailable1"), isVisible: true },
          lblReviewValue2: { text: scope.getFieldValue("tbxAvailable2"), isVisible: scope.getFieldValue("tbxAvailable2") !== "NA" ? true : false },
          lblReviewValue3: { text: scope.getFieldValue("tbxAvailable3"), isVisible: scope.getFieldValue("tbxAvailable3") !== "NA" ? true : false },
          lblReviewValue4: { text: scope.getFieldValue("tbxAvailable4"), isVisible: scope.getFieldValue("tbxAvailable4") !== "NA" ? true : false }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.issueDate },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblIssueDate", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxIssueDate"), isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.expiryDate },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblExpiryDate", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxExpiryDate"), isVisible: true },
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.chargesAccount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblChargesAccount", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getSelectedValueFromAccountsDropdown("lblSelectedChargeValue"), isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.marginAccount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblCommissionAccount", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getSelectedValueFromAccountsDropdown("lblValueCommissionAccount"), isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.commissionAccount },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblMarginAccount", scope.dataMapping) + ":", isVisible: true },
          lblReviewValue1: { text: scope.getSelectedValueFromAccountsDropdown("lblValueMarginAccount"), isVisible: true }
        }, {
          flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
          lblSwiftCode: { text: scope.importLcSwiftTags.messageToBank },
          lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblMessage", scope.dataMapping), isVisible: true },
          lblReviewValue1: { text: scope.getFieldValue("tbxMessage"), isVisible: true },
          flxRowTemplateSeparator: { isVisible: true }
        }
        ]
        ],
        [{
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("lblBeneficiaryDetails", scope.dataMapping) },

          "flxSeparator2": { isVisible: true },
          "imgDropDown": "dropdown_collapse.png"
        }, [
          {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.beneficiaryBankName },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblBeneficiaryName", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxBeneficiaryName"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.beneficiaryBankAddress },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblBeneficiaryAddress", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxBeneficiaryAddress1"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.beneficiaryBankCity },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblBankNameReview", scope.dataMapping), isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxBankName"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.beneficiaryBankAddress },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblBankAddressReview", scope.dataMapping), isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxBankAddress1"), isVisible: true },
            flxRowTemplateSeparator: { isVisible: true }
          }]
        ],
        [{
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("lblShipmentDetails", scope.dataMapping) },
          "flxSeparator2": { isVisible: true },
          "imgDropDown": "dropdown_collapse.png"
        }, [
          {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.placeOfTakingInCharge },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPlaceOfCharge", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxPlaceOfCharge"), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.portOfDischarge },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPortCharge", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxPortCharge"), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.portOfLoading },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPortLoading", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxPortLoading"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.placeOfFinalDelivery },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblFinalDeliveryPlace", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxFinalDeliveryPlace"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.latestShipmentDate },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblShipmentDate", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxshipmentDate"), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.transhipment },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblTranshipment", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedTranshipment", scope.dataMapping["TranshipmentDropdown"], true), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.partialShipment },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblPartialShipment", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedPartialShipment", scope.dataMapping["PartialShipmentsDropdown"], true), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.incoTerms },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblIncoTerms", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedIncoTerms", scope.dataMapping["IncoTermsDropdown"], true), isVisible: true },
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.modeOfShipment },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblShipmentMode", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedShipmentMode", scope.dataMapping["ModeOfShipmentDropdown"], true), isVisible: true },
            flxRowTemplateSeparator: { isVisible: true }
          }]
        ], [{
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("lblDocumentsTerms", scope.dataMapping) },
          "flxSeparator2": { isVisible: true },
          "imgDropDown": "dropdown_collapse.png"
        }, [
          {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.descriptionOfGoods },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblDescription", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxDescription"), isVisible: true }
          },
          {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.documentsRequired },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblRequiredDocuments", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxRequiredDocuments"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.additionalCondition },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblAdditionalCondition", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxAdditionalCondition"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.otherAdditionalCondition },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblOtherCondition", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("tbxOtherCondition"), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.charges },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblCharges", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: chargesWithCurrency, isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.confirmationInstructions },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblConfirmationInstruction", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedInstruction", scope.dataMapping["ConfirmationInstructionsDropdown"], true), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.transferable },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblTransferable", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedTransferable", scope.dataMapping["TransferableDropdown"], true), isVisible: true }
          }, {
            flxSwiftCodeContainer: { isVisible: this.isSwiftCodeAvailable ? true : false },
            lblSwiftCode: { text: scope.importLcSwiftTags.standByLC },
            lblReview: { text: scope.businessController.getDataBasedOnDataMapping("lblStandByLC", scope.dataMapping) + ":", isVisible: true },
            lblReviewValue1: { text: scope.getFieldValue("lblSelectedStandByLC", scope.dataMapping["StandByLCDropdown"], true), isVisible: true }
          }]
        ]
      ];
      this.view.segReview.onRowClick = this.expandCollapse.bind(this);
      this.view.segReview.setData(reviewData);
    },
    /*  Method : getFieldValue 
	 *  To get the value of a field
     *  return : returns field value
      */
    getFieldValue : function(fieldName,listValues,isDropdown){
      var scope = this;
      var resultValue = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      if(isDropdown){
        var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue,listValues);
        return fieldValue ? fieldValue : "NA";  
      }
      return resultValue ? resultValue : "NA";
    },
     /*  Method : getSelectedValueFromAccountsDropdown 
	 *  To get the selected value from accounts dropdown
     *  return : returns selected dropdown value
      */
    getSelectedValueFromAccountsDropdown : function(fieldName){
      var scope = this;
      this.collectionObj = LCIssuanceStore.getState();
      var selectedAccountID = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      var accountDropdownValues = this.collectionObj.Collection.DigitalArrangements;
      if(accountDropdownValues && selectedAccountID){
        var selectedAccount = accountDropdownValues.find( ({ accountID }) => accountID === selectedAccountID );
       if(selectedAccount){
         return selectedAccount.accountNameFormatted ? selectedAccount.accountNameFormatted : "NA";
       }else{
         return "NA";
       }
      }
      return "NA";
    },
     /*  Method : checkServiceStatus 
	 *  Method to check the create LC service response
     *  return : NA
      */
    checkServiceStatus :function (context) {
      var scope = this;
      this.collectionObj = LCIssuanceStore.getState();            
      try{
      if(this.collectionObj.Collection.LetterOfCredit["srmsReqSuccess"] && this.isCreateLCServiceCheck){ 
        this.isCreateLCServiceCheck = false;
        this.doContinue();
      }else if(this.collectionObj.Collection.LetterOfCredit["srmsReqSuccess"] && this.isSaveAction){ 
       this.isSaveAction = false;
       scope.showServiceMessage({"saveMessage": "Import LC has been saved successfully."});
      }else if(this.collectionObj.Collection.LetterOfCredit["srmsReqSuccess"] && (this.isSaveAndCloseAction || this.isDeleteAndCloseAction)){ 
       this.isSaveAndCloseAction = false;
       this.isDeleteAndCloseAction = false;
       this.handleNavigation();
      }
      else if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection.LetterOfCredit.errorObjFail)){  
        var errMsg;
        if(scope.collectionObj.Collection.LetterOfCredit.errorObjFail.hasOwnProperty("serverErrorRes"))
           errMsg = scope.collectionObj.Collection.LetterOfCredit.errorObjFail.serverErrorRes["dbpErrMsg"];
        else
         errMsg = scope.collectionObj.Collection.LetterOfCredit.errorObjFail["dbpErrMsg"] || scope.collectionObj.Collection.LetterOfCredit.errorObjFail["errmsg"];
          scope.showServiceMessage({"errObjFail": errMsg});   
          delete(scope.collectionObj.Collection.LetterOfCredit["errorObjFail"]);
       }
      else if(!kony.sdk.isNullOrUndefined(this.collectionObj.Collection.LetterOfCredit["errcode"])){
        scope.showServiceMessage({"errcode": scope.collectionObj.Collection.LetterOfCredit["errcode"]});
      }
         this.isCreateLCServiceCheck = false;
         this.isSaveAction = false;
         this.isSaveAndCloseAction = false;
         this.isDeleteAndCloseAction = false;
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "checkServiceStatus",
              "error": err
            };
      //  scope.onError(errorObj);
      }
    },
    /*  Method : expandCollapse 
	 *  To expand collpse the review row data
     *  return : NA
      */
    expandCollapse :function (context) {
      var scope = this;
      try{
        var sectionIndex = context.section;
        if (this.segReviewTempData === '') {
          this.segReviewTempData = JSON.parse(JSON.stringify(this.view.segReview.data));
        }
        var data = this.view.segReview.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (selectedHeaderData["imgDropDown"] ===  "dropdown_collapse.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          selectedHeaderData["flxSeparator2"].width = "100%";
          data[sectionIndex][1] = [];
          this.view.segReview.setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          var BP = kony.application.getCurrentBreakpoint();
          if(BP >=1024)
          selectedHeaderData["flxSeparator2"].width = "97%";
          selectedHeaderData["flxSeparator2"].isVisible =  true;
          data[sectionIndex][1] = this.segReviewTempData[sectionIndex][1];
          this.view.segReview.setData(data);
        }
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "expandCollapse",
              "error": err
            };
        scope.onError(errorObj);
      }
    },    
    /**
     * @api : initActionsOfhideDropdownsOfCreditDetails
     * Method will initialize the event to hide the expanded view of dropdown
     * @return : NA
     */
    initActionsOfhideDropdownsOfCreditDetails: function(){
      var scope = this;
      scope.view.flxActivateHeader.onClick = scope.hideAllCreditDropdowns.bind(this);
      scope.view.flxWarning.onClick = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxReferenceNumber.onBeginEditing = function() {
        scope.view.tbxReferenceNumber.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };
      scope.view.tbxTotalPercentage.onBeginEditing = function() {
        scope.view.tbxTotalPercentage.skin = "ICSknsknSSP42424215PxBorder4A90E2";
      };			
      scope.view.tbxAvailable1.onBeginEditing = function() {
        scope.view.tbxAvailable1.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxAvailable2.onBeginEditing = function() {
        scope.view.tbxAvailable2.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxAvailable3.onBeginEditing = function() {
        scope.view.tbxAvailable3.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxAvailable4.onBeginEditing = function() {
        scope.view.tbxAvailable4.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxExpiryPlace.onBeginEditing = function() {
        scope.view.tbxExpiryPlace.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxMessage.onBeginEditing = function() {
        scope.view.tbxMessage.skin = "ICSknsknSSP42424215PxBorder4A90E2";							
      };
      scope.view.tbxReferenceNumber.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxAmount.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxTotalPercentage.onTouchStart =  scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxMaxCredit.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxPayableAmount.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxAvailable1.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxAvailable2.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxAvailable3.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxAvailable4.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.IssueDate.tbxDateInputKA.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.ExpiryDate.tbxDateInputKA.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxExpiryPlace.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
      scope.view.tbxMessage.onTouchStart = scope.hideAllCreditDropdowns.bind(this);
    },  
    /**
     * @api : initActionsOfhideDropdownsOfShipmentDetails
     * Method will initialize the event to hide the expanded view of dropdown
     * @return : NA
     */
    initActionsOfhideDropdownsOfShipmentDetails: function()
    {
      var scope = this;
      scope.view.flxShipmentDetailHeader.onClick = scope.hideAllShipmentDropdowns.bind(this);
      scope.view.tbxPlaceOfCharge.onTouchStart = scope.hideAllShipmentDropdowns.bind(this);
      scope.view.tbxPortLoading.onTouchStart = scope.hideAllShipmentDropdowns.bind(this);
      scope.view.tbxPortCharge.onTouchStart = scope.hideAllShipmentDropdowns.bind(this);
      scope.view.tbxFinalDeliveryPlace.onTouchStart = scope.hideAllShipmentDropdowns.bind(this);
      scope.view.LatestShipmentDate.tbxDateInputKA.onTouchStart = scope.hideAllShipmentDropdowns.bind(this);
    },
    /**
     * @api : initActionsOfhideDropdownsOfDocumentsDetails
     * Method will initialize the event to hide the expanded view of dropdown
     * @return : NA
     */
    initActionsOfhideDropdownsOfDocumentsDetails: function()
    {
      var scope = this;
      scope.view.flxDocumentsHeader.onClick = scope.hideAllDocumentDropdowns.bind(this);
      scope.view.tbxDescription.onTouchStart = scope.hideAllDocumentDropdowns.bind(this);
      scope.view.tbxRequiredDocuments.onTouchStart = scope.hideAllDocumentDropdowns.bind(this);
      scope.view.tbxAdditionalCondition.onTouchStart = scope.hideAllDocumentDropdowns.bind(this);
      scope.view.tbxOtherCondition.onTouchStart = scope.hideAllDocumentDropdowns.bind(this);
      scope.view.tbxCharges.onTouchStart = scope.hideAllDocumentDropdowns.bind(this);
    },
     /**
     * @api : hideAllCreditDropdowns
     * Method will hide dropdown expanded view
     * @return : NA
     */
    hideAllCreditDropdowns: function(){
      var scope = this;      
        scope.view.flxSegPaymentTerms.isVisible = false;
        scope.view.imgPaymentTermsDropdownIcon.src = "dropdown_expand.png";
        scope.view.flxDropdownListCurrency.isVisible = false;
        scope.view.imgDropdownIconCurrency.src = "dropdown_expand.png";
        scope.view.flxDropdownListPayableCurrency.isVisible = false; 
        scope.view.imgDropdownIconPayableCurrency.src = "dropdown_expand.png";
        scope.view.flxSegChargesAccount.isVisible = false;
        scope.view.imgChargeSelectIcon.src = "dropdown_expand.png";
        scope.view.flxSegCommissionAccount.isVisible = false;
        scope.view.imgDropdownCommissionIcon.src = "dropdown_expand.png";
        scope.view.flxSegMarginAccount.isVisible = false;
        scope.view.imgDropdownIconMarginAccount.src = "dropdown_expand.png";
    },
    /**
     * @api : hideAllShipmentDropdowns
     * Method will hide dropdown expanded view
     * @return : NA
     */
     hideAllShipmentDropdowns: function(){
      var scope = this;      
        scope.view.flxSegTranshipment.isVisible = false;
        scope.view.imgSelectTranshipment.src = "dropdown_expand.png";
        scope.view.flxSegPartialShipment.isVisible = false;
        scope.view.imgPartialShipmentSelectIcon.src = "dropdown_expand.png";
        scope.view.flxSegIncoTerms.isVisible = false; 
        scope.view.imgIncoTermSelect.src = "dropdown_expand.png";
        scope.view.flxSegShipmentMode.isVisible = false;
        scope.view.imgShipmentModeSelectIcon.src = "dropdown_expand.png";
    },
     /**
     * @api : hideAllDocumentDropdowns
     * Method will hide dropdown expanded view
     * @return : NA
     */
     hideAllDocumentDropdowns: function(){
      var scope = this;      
        scope.view.flxSegInstruction.isVisible = false;
        scope.view.imgInstructionSelectIcon.src = "dropdown_expand.png";
        scope.view.flxSegTransferable.isVisible = false;
        scope.view.imgTransferableSelectIcon.src = "dropdown_expand.png";
        scope.view.flxSegStandByLC.isVisible = false; 
        scope.view.imgStandByLCSelectIcon.src = "dropdown_expand.png";
    },
    /**
     * @api : checkClearSaveButtonEnable
     * Method to enable clear and save buttton if user entered any data.
     * @return : NA
     */
    checkClearSaveButtonEnable :function() {
      var scope = this;
      var widget = this.view;  
      var clearWidget,saveWidget;
      if(scope.currentFlow === "Credit details"){        
        clearWidget = scope.view.lblClear;
        saveWidget = scope.view.lblSave;
        if(widget.tbxReferenceNumber.text || widget.tbxAvailable1.text || widget.tbxAvailable1.text ||  
           widget.tbxAvailable2.text || widget.tbxAvailable3.text ||  widget.tbxAvailable4.text || 
           widget.tbxExpiryPlace.text || widget.tbxMessage.text || widget.IssueDate.tbxDateInputKA.text || 
           widget.ExpiryDate.tbxDateInputKA.text || widget.tbxAmount.text || widget.tbxPayableAmount.text || 
           widget.tbxMaxCredit.text || widget.lblValuePaymentTerms.text !== "Select here" || widget.lblSelectedChargeValue.text !== "Select here" ||
           widget.lblValueCommissionAccount.text !== "Select here"|| widget.lblValueMarginAccount.text !== "Select here" ){
          this.enableOrDisableSaveClearIcon(true,clearWidget,saveWidget);
        }else
          this.enableOrDisableSaveClearIcon(false,clearWidget,saveWidget);
      }else if(scope.currentFlow === "Beneficiary details"){
        clearWidget = scope.view.lblBeneficiaryClear;
        saveWidget = scope.view.lblBeneficiarySave;
        if(widget.tbxBeneficiaryName.text || widget.tbxBeneficiaryAddress1.text || widget.tbxBeneficiaryAddress2.text
           || widget.tbxCity.text ||widget.tbxBeneficiaryZipCode.text || widget.tbxBankName.text || 
           widget.tbxBankAddress1.text || widget.tbxBankAddress2.text || widget.tbxBankCity.text || widget.tbxBankZipCode.text){
          this.enableOrDisableSaveClearIcon(true,clearWidget,saveWidget);
        }else
          this.enableOrDisableSaveClearIcon(false,clearWidget,saveWidget);
      }else if(scope.currentFlow === "Shipment details"){
        clearWidget = scope.view.lblShipmentDetailClear;
        saveWidget = scope.view.lblShipmentDetailSave;
        this.applyLabelSkin(widget.lblSelectedTranshipment);
        this.applyLabelSkin(widget.lblSelectedPartialShipment);
        this.applyLabelSkin(widget.lblSelectedIncoTerms);
        this.applyLabelSkin(widget.lblSelectedShipmentMode);
        if(widget.tbxPlaceOfCharge.text || widget.tbxPortLoading.text || widget.tbxPortCharge.text || 
           widget.tbxFinalDeliveryPlace.text || widget.LatestShipmentDate.tbxDateInputKA.text || 
           widget.lblSelectedTranshipment.text !== "Select here"|| widget.lblSelectedPartialShipment.text!== "Select here"||
           widget.lblSelectedIncoTerms.text !== "Select here"|| widget.lblSelectedShipmentMode.text !== "Select here" ){
          this.enableOrDisableSaveClearIcon(true,clearWidget,saveWidget);
        }else
          this.enableOrDisableSaveClearIcon(false,clearWidget,saveWidget);
      }else if(scope.currentFlow === "Documents and Terms"){
        clearWidget = scope.view.lblDocumentsClear;
        saveWidget = scope.view.lblDocumentsSave;
        if(widget.tbxDescription.text || widget.tbxRequiredDocuments.text || widget.tbxAdditionalCondition.text ||
           widget.tbxOtherCondition.text ||  widget.tbxCharges.text || widget.lblSelectedInstruction.text !== "Select here" || 
           widget.lblSelectedTransferable.text !== "Select here" || widget.lblSelectedStandByLC.text !== "Select here"){
         this.enableOrDisableSaveClearIcon(true,clearWidget,saveWidget);
        }else
          this.enableOrDisableSaveClearIcon(false,clearWidget,saveWidget);
      }
    },
    /**
     * @api : enableOrDisableSaveClearIcon
     * Method to perform enable or disable clear and save buttton.
     * @return : NA
     */
    enableOrDisableSaveClearIcon: function(enable,clearWidget,saveWidget){
      if(enable){
        clearWidget.setEnabled(true);
        saveWidget.setEnabled(true);
        clearWidget.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknLabelSSPRegular4176A413px" : "ICSkn3343a8labelSSPRegular15px";
        saveWidget.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknLabelSSPRegular4176A413px" : "ICSkn3343a8labelSSPRegular15px";
      }else{
        clearWidget.setEnabled(false);
        saveWidget.setEnabled(false);
        clearWidget.skin = "sknLblHamburgerUnSelected";
        saveWidget.skin = "sknLblHamburgerUnSelected";
      }
    },
    /**
     * @api : clearCreditDetailsErrorMessage
     * Method to clear the Error message
     * @return : NA
     */
    clearCreditDetailsErrorMessage: function(){
      this.view.lblErrReferenceNumber.isVisible = false;
      this.view.lblErrTotalPercentage.isVisible = false;
      this.view.lblErrAvailableWith.isVisible = false;
      this.view.lblErrIssueDate.isVisible = false;
      this.view.lblErrExpiryDate.isVisible = false;
      this.view.lblErrExpiryPlace.isVisible = false;
      this.view.lblErrMessage.isVisible = false;
      this.view.tbxReferenceNumber.skin =  kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxTotalPercentage.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxAvailable1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxAvailable2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxAvailable3.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxAvailable4.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxExpiryPlace.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxMessage.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.IssueDate.tbxDateInputKA.skin = "skntbxSSP42424215pxnoborder";
      this.view.ExpiryDate.tbxDateInputKA.skin =   "skntbxSSP42424215pxnoborder";
    },
     /**
     * @api : clearBeneficiaryDetailsErrorMessage
     * Method to clear the Error message
     * @return : NA
     */
    clearBeneficiaryDetailsErrorMessage: function(){
      this.view.lblErrBeneficiaryName.isVisible = false;
      this.view.lblErrBeneficiaryAddress.isVisible = false;
      this.view.lblErrCity.isVisible = false;
      this.view.lblErrBeneficiaryZipCode.isVisible = false;
      this.view.lblErrBankName.isVisible = false;
      this.view.lblErrBankAddress.isVisible = false;
      this.view.lblErrBankCity.isVisible = false;
      this.view.lblErrBankZipCode.isVisible = false;
      this.view.tbxBeneficiaryName.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBeneficiaryAddress1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBeneficiaryAddress2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxCity.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBeneficiaryZipCode.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBankName.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBankAddress1.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBankAddress2.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBankCity.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxBankZipCode.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
    },
     /**
     * @api : clearShipmentDetailsErrorMessage
     * Method to clear the Error message
     * @return : NA
     */
     clearShipmentDetailsErrorMessage: function(){
      this.view.lblErrPlaceOfCharge.isVisible = false;
      this.view.lblErrPortLoading.isVisible = false;
      this.view.lblErrPortCharge.isVisible = false;
      this.view.lblErrFinalDeliveryPlace.isVisible = false;
      this.view.lblErrLatestShipmentDate.isvisible = false;
      this.view.tbxPlaceOfCharge.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxPortLoading.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxPortCharge.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxFinalDeliveryPlace.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.LatestShipmentDate.tbxDateInputKA.skin = "skntbxSSP42424215pxnoborder";
     },
     /**
     * @api : clearDocumentsTermsErrorMessage
     * Method to clear the Error message
     * @return : NA
     */
     clearDocumentsTermsErrorMessage: function(){
      this.view.lblErrDescription.isVisible = false;
      this.view.lblErrRequiredDocuments.isVisible = false;
      this.view.lblErrAdditionalCondition.isVisible = false;
      this.view.lblErrOtherCondition.isVisible = false;
      this.view.lblErrCharges.isVisible = false;  
      this.view.tbxDescription.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxRequiredDocuments.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxAdditionalCondition.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
      this.view.tbxOtherCondition.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";     
      this.view.tbxCharges.skin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknTxtE3E3E3Border1pxRad2px424242SSPRegular13px" :"ICSknTextBoxSSPR42424215px";
     },

    /**
      * @api : swiftCodeDecision
      * Rendering the swift code based on condition
      * @arg: NA
      * @return : NA
      */
    swiftCodeDecision: function () {
      var scope = this;
      try {
        if (!this.isSwiftCodeAvailable) {
          // Credit Details
          scope.hideSwiftCodes("flxRefNoSwiftCodeContainer", "tbxReferenceNumber");
          scope.hideSwiftCodes("flxCurrencySwiftCodeContainer", "flxCurrencyInputContainer");
          scope.hideSwiftCodes("flxTolerancePercSwiftCodeContainer", "tbxTotalPercentage");
          scope.hideSwiftCodes("flxMaxCreditSwiftCodeContainer", "tbxMaxCredit");
          scope.hideSwiftCodes("flxAddCurrencySwiftCodeContainer", "flxAddCurrencyInputContainer");
          scope.hideSwiftCodes("flxPaymentTermsSwiftCodeContainer", "flxPaymentTermsInputContainer");
          scope.hideSwiftCodes("flxAvailableWithSwiftCodeContainer", "flxAvailableWithInputContainer");
          scope.hideSwiftCodes("flxIssueDateSwiftCodeContainer", "flxIssueDateInputContainer");
          scope.hideSwiftCodes("flxExpiryDateSwiftCodeContainer", "flxExpiryDateInputContainer");
          scope.hideSwiftCodes("flxExpiryPlaceSwiftCodeContainer", "tbxExpiryPlace");
          scope.hideSwiftCodes("flxChargesAcSwiftCodeContainer", "flxChargesAcInputContainer");
          scope.hideSwiftCodes("flxCommissionAmountSwiftCodeContainer", "flxCommissionAmountInputContainer");
          scope.hideSwiftCodes("flxMarginAcSwiftCodeContainer", "flxMarginAcInputContainer");
          scope.hideSwiftCodes("flxMessageToBSwiftCodeContainer", "tbxMessage");
          // Beneficiary Details
          scope.hideSwiftCodes("flxBenNameSwiftCodeContainer", "tbxBeneficiaryName");
          scope.hideSwiftCodes("flxBenAddressSwiftCodeContainer", "flxBenAddressInputContainer");
          scope.hideSwiftCodes("flxCitySwiftCodeContainer", "tbxCity");
          scope.hideSwiftCodes("flxStateInputContainer", "flxStateSwiftCodeContainer");
          scope.hideSwiftCodes("flxZipCodeSwiftCodeContainer", "tbxBeneficiaryZipCode");
          scope.hideSwiftCodes("flxBNameSwiftCodeContainer", "tbxBankName");
          scope.hideSwiftCodes("flxBAddressSwiftCodeContainer", "flxBAddressInputContainer");
          scope.hideSwiftCodes("flxBCitySwiftCodeContainer", "tbxBankCity");
          scope.hideSwiftCodes("flxStateTwoSwiftCodeContainer", "flxStateTwoInputContainer");
          scope.hideSwiftCodes("flxZipCodeTwoSwiftCodeContainer", "tbxBankZipCode");
          // Shipment details
          scope.hideSwiftCodes("flxPlaceOfTakingSwiftCodeContainer", "tbxPlaceOfCharge");
          scope.hideSwiftCodes("flxPortOfLoadingSwiftCodeContainer", "tbxPortLoading");
          scope.hideSwiftCodes("flxPortOfDisSwiftCodeContainer", "tbxPortCharge");
          scope.hideSwiftCodes("flxPlaceOfFinalSwiftCodeContainer", "tbxFinalDeliveryPlace");
          scope.hideSwiftCodes("flxLatestShipmentSwiftCodeContainer", "flxLatestShipmentInputContainer");
          scope.hideSwiftCodes("flxTranshipSwiftCodeContainer", "flxTranshipInputContainer");
          scope.hideSwiftCodes("flxPartialShipSwiftCodeContainer", "flxPartialShipInputContainer");
          scope.hideSwiftCodes("flxIncoTermsSwiftCodeContainer", "flxIncoTermsInputContainer");
          scope.hideSwiftCodes("flxModeOfShipSwiftCodeContainer", "flxModeOfShipInputContainer");
          // Documents and Terms
          scope.hideSwiftCodes("flxDescOfGoodsSwiftCodeContainer", "tbxDescription");
          scope.hideSwiftCodes("flxDecReqSwiftCodeContainer", "tbxRequiredDocuments");
          scope.hideSwiftCodes("flxAddCondSwiftCodeContainer", "tbxAdditionalCondition");
          scope.hideSwiftCodes("flxOtherAddCondSwiftCodeContainer", "tbxOtherCondition");
          scope.hideSwiftCodes("flxChargesSwiftCodeContainer", "tbxCharges");
          scope.hideSwiftCodes("flxConfirmationSwiftCodeContainer", "flxConfirmationInputContainer");
          scope.hideSwiftCodes("flxTransfersSwiftCodeContainer", "flxTransfersInputContainer");
          scope.hideSwiftCodes("flxStandBySwiftCodeContainer", "flxStandByInputContainer");
        } else {
          // Assigning swift tags to labels from CommonsMA
          // Credit Details
          this.view.lblRefNoSwiftCode.text = scope.importLcSwiftTags.referenceNumber;
          this.view.lblCurrencySwiftCode.text = scope.importLcSwiftTags.currencyAmount;
          this.view.lblTolerancePercSwiftCode.text = scope.importLcSwiftTags.tolerancePercentage;
          this.view.lblMaxCreditSwiftCode.text = scope.importLcSwiftTags.maximumCreditAmount;
          this.view.lblAddCurrencySwiftCode.text = scope.importLcSwiftTags.currencyAdditionalPayableAmount;
          this.view.lblPaymentTermsSwiftCode.text = scope.importLcSwiftTags.paymentTerms;
          this.view.lblAvailableWithSwiftCode.text = scope.importLcSwiftTags.availableWith;
          this.view.lblIssueDateSwiftCode.text = scope.importLcSwiftTags.issueDate;
          this.view.lblExpiryDateSwiftCode.text = scope.importLcSwiftTags.expiryDate;
          this.view.lblExpiryPlaceSwiftCode.text = scope.importLcSwiftTags.expiryPlace;
          this.view.lblChargesAcSwiftCode.text = scope.importLcSwiftTags.chargesAccount;
          this.view.lblCommissionAmountSwiftCode.text = scope.importLcSwiftTags.commissionAccount;
          this.view.lblMarginAcSwiftCode.text = scope.importLcSwiftTags.marginAccount;
          this.view.lblMessageToBSwiftCode.text = scope.importLcSwiftTags.messageToBank;
          // Beneficiary Details
          this.view.lblBenNameSwiftCode.text = scope.importLcSwiftTags.beneficiaryName;
          this.view.lblBenAddressSwiftCode.text = scope.importLcSwiftTags.beneficiaryAddress;
          this.view.lblCitySwiftCode.text = scope.importLcSwiftTags.beneficiaryCity;
          this.view.lblStateSwiftCode.text = scope.importLcSwiftTags.beneficiaryState;
          this.view.lblZipCodeSwiftCode.text = scope.importLcSwiftTags.beneficiaryZipCode;
          this.view.lblBNameSwiftCode.text = scope.importLcSwiftTags.beneficiaryBankName;
          this.view.lblBAddressSwiftCode.text = scope.importLcSwiftTags.beneficiaryBankAddress;
          this.view.lblBCitySwiftCode.text = scope.importLcSwiftTags.beneficiaryBankCity;
          this.view.lblStateTwoSwiftCode.text = scope.importLcSwiftTags.beneficiaryBankState;
          this.view.lblZipCodeTwoSwiftCode.text = scope.importLcSwiftTags.beneficiaryBankZipCode;
          // Shipment details
          this.view.lblPlaceOfTakingSwiftCode.text = scope.importLcSwiftTags.placeOfTakingInCharge;
          this.view.lblPortOfLoadingSwiftCode.text = scope.importLcSwiftTags.portOfLoading;
          this.view.lblPortOfDisSwiftCode.text = scope.importLcSwiftTags.portOfDischarge;
          this.view.lblPlaceOfFinalSwiftCode.text = scope.importLcSwiftTags.placeOfFinalDelivery;
          this.view.lblLatestShipmentSwiftCode.text = scope.importLcSwiftTags.latestShipmentDate;
          this.view.lblTranshipSwiftCode.text = scope.importLcSwiftTags.transhipment;
          this.view.lblPartialShipSwiftCode.text = scope.importLcSwiftTags.partialShipment;
          this.view.lblIncoTermsSwiftCode.text = scope.importLcSwiftTags.incoTerms;
          this.view.lblModeOfShipSwiftCode.text = scope.importLcSwiftTags.modeOfShipment;
          // Documents and Terms
          this.view.lblDescOfGoodsSwiftCode.text = scope.importLcSwiftTags.descriptionOfGoods;
          this.view.lblDecReqSwiftCode.text = scope.importLcSwiftTags.documentsRequired;
          this.view.lblAddCondSwiftCode.text = scope.importLcSwiftTags.additionalCondition;
          this.view.lblOtherAddCondSwiftCode.text = scope.importLcSwiftTags.otherAdditionalCondition;
          this.view.lblChargesSwiftCode.text = scope.importLcSwiftTags.charges;
          this.view.lblConfirmationSwiftCode.text = scope.importLcSwiftTags.confirmationInstructions;
          this.view.lblTransfersSwiftCode.text = scope.importLcSwiftTags.transferable;
          this.view.lblStandBySwiftCode.text = scope.importLcSwiftTags.standByLC;
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "swiftCodeDecision",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onError
     * Method to catch  error
     * @return : NA
     */
    onError: function (err) {
      var error = err;
    },
    
    /**
      * @api : hideSwiftCodes
      * Aligning UI based on swift code configuration
      * @arg1: swiftCodeContainerFlexRef: Reference of flex to hide
      * @arg2: inputContentRef: Reference of input/tbx to align left
      * @return : NA
      */
    hideSwiftCodes: function (swiftCodeContainerFlexRef, inputContentRef) {
      var scope = this;
      try {
        scope.view[swiftCodeContainerFlexRef].setVisibility(false);
        scope.view[inputContentRef].left = "2.5%";
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "hideSwiftCodes",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : restrictLessThanGreaterThan
      * Restricting the < and > from user input
      * @arg1: inputTextField: Reference of input text box
      * @return : NA
      */
    restrictLessThanGreaterThan: function (inputTextFieldRef) {
      var scope = this;
      try {
        scope.view[inputTextFieldRef].restrictCharactersSet = "<>=*";
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "restrictLessThanGreaterThan",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    applyLabelSkin: function(widget) {
      if(widget.text === kony.i18n.getLocalizedString("i18n.common.selecthere")) {
        widget.skin = "ICSknLbl727272SSPRegular15px";
      }
      else {
        widget.skin = "ICSknLbl42424215PX";
      }
    }
  };
});