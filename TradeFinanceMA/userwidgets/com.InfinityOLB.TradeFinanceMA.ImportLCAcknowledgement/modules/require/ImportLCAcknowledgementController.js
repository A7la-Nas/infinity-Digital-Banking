


define(['./ImportLCAcknowledgementBusinessController', './ImportLCAcknowledgementStore','FormatUtil'], function(BusinessController,ImportLCAcknowledgementStore,FormatUtil) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakoints = {};     
      ImportLCAcknowledgementStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.formatUtil = new FormatUtil();
      this.store = ImportLCAcknowledgementStore;
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.segAcknowledgementNewTempData='';
      this.frmType= "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    onBreakpointChange : function()
    {
      var scope = this;
      if(this.frmType==="Drawings"){ 
        scope.drawingDetails();
        scope.setDrawingDetailButtonText(); 
        scope.setDrawingButtonText();
      } else{ 
        scope.view.flxCloseBtn.setVisibility(true);
        scope.setLabelandButtonText();
        scope.setAcknowledgementData(); 
        scope.importLCVisibility();
      }  
    },
    postShow : function()
    {
      var scope = this; 
      try{  
        if(this.frmType==="Drawings"){ 
          this.view.flxCloseBtn.setVisibility(true);
          this.view.flxTransactionReference.setVisibility(false);
          scope.drawingDetails();
          scope.setDrawingDetailButtonText(); 
          scope.setDrawingButtonText();
          scope.view.flxCloseBtn.onClick = scope.hideCloseBtn.bind(this); 
          scope.initButtonActionsOnclick(); 
          scope.setStatus();
        } else{ 
          this.view.flxCloseBtn.setVisibility(false);
          this.view.flxTransactionReference.setVisibility(true);
          this.view.lblTransactionReferenceValue.text = this.context['LetterOfCredit']['transactReference'] || this.context['LetterOfCredit']['srmsReqOrderID'];
          scope.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.breakpoints);
          scope.setLabelandButtonText();
          scope.setAcknowledgementData();
          scope.view.btnActions1.onClick = scope.copyAndCreateLC.bind(this);
          scope.view.btnActions2.onClick = scope.handleNavigation.bind(this,""); 
          scope.importLCVisibility();
          scope.view.flxAcknowledgementActions.height = "30dp";
          scope.view.flxCloseBtn.onClick = scope.hideCloseBtn.bind(this); 
        } 
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "postShow",
              "error": err
            };
      }
    }, 
    drawingDetails: function() { 
      var scope = this;
      scope.view.flxLCSummary.isVisible = true;
      scope.view.flxLCSummaryDrawings.isVisible = false;
      scope.view.flxAcknowledgementActions.isVisible = true;
      scope.view.flxAcknowledgementDetails.isVisible = false;
      scope.view.flxAcknowledgementContent.isVisible = false;
      scope.view.btnViewLCReport.isVisible = true;
      scope.view.btnActions2.text = "View All Drawings";
      scope.view.btnActions1.text = "View Drawing Detail";
      scope.view.btnViewLCReport.text = "View LC Report";
      scope.view.lblLCSummary7.isVisible = true;
      scope.view.lblLCSummary8.isVisible = true;
      scope.view.lblLCSummaryValue7.isVisible = true;
      scope.view.lblLCSummaryValue8.isVisible = true;
    },
    importLCVisibility: function() {
      var scope = this;
      scope.view.flxLCSummary.isVisible = true;
      scope.view.flxLCSummaryDrawings.isVisible = false;
      scope.view.flxAcknowledgementActions.isVisible = true;
      scope.view.flxAcknowledgementDetails.isVisible = true;
      scope.view.flxAcknowledgementContent.isVisible = false;
      scope.view.btnViewLCReport.isVisible = false;
      scope.view.btnViewLCReport.isVisible = false;
      scope.view.lblLCSummary7.isVisible = false;
      scope.view.lblLCSummary8.isVisible = false;
      scope.view.lblLCSummaryValue7.isVisible = false;
      scope.view.lblLCSummaryValue8.isVisible = false;
      // this.view.lblImportLCAck.text = "Import LC - Acknowledgement";
    },
    initButtonActionsOnclick: function() {
      var scope = this;
      try {
        scope.view.btnActions2.onClick = scope.contextualActionButtonOnClick.bind(this, "btnActions2");
        scope.view.btnActions1.onClick = scope.contextualActionButtonOnClick.bind(this, "btnActions1");
        scope.view.btnViewLCReport.onClick = scope.contextualActionButtonOnClick.bind(this, "btnViewLCReport");
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    contextualActionButtonOnClick: function(buttonName) {
      try {
        var data = {};
        data["previousFormName"] = "frmImportLCAcknowledgment";
        var buttonText = this.view[buttonName].text;
        if (buttonText === "View All Drawings") {
          data.isDrawingsBack = true;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
          }).navigate(data);
        } else if (buttonText === "View Drawing Detail") {
          var detailsData = this.context.LetterOfCredit;
          detailsData["previousFormName"] = "frmImportLCAcknowledgment";
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
          }).navigate(detailsData);
        } else if (buttonText === "Try Again") {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDrawingVerifySubmit"
          }).navigate(data);
        } else {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDetails"
          }).navigate(this.context.LOCReportData);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "contextualActionButtonOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    render: function () {
      var scope =  this;
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.LetterOfCredit) &&  !kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.DigitalArrangements))
        this.setAcknowledgementData();
    },

    setContext: function(context) {
      var scope = this;
      try {
        this.context = context;
        this.frmType = context.LetterOfCredit.frmType;
        this.businessController.storeContextInCollection(context);
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
	* @api : copyAndCreateLC
 	* Method to pass the data Issuance page to create a new LC
	* @return : NA
	*/
    copyAndCreateLC: function(){
      var scope = this;
      var recordToBeCopy = this.context["LetterOfCredit"];
      recordToBeCopy["isCopyDetail"] = true;
      delete recordToBeCopy["srmsReqOrderID"];
      scope.handleNavigation(recordToBeCopy);
    },
    hideCloseBtn: function()
    {
      var scope = this;
      scope.view.flxImportSuccess.setVisibility(false);
    },
    setLabelandButtonText: function()
    {
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      var scope = this;
      scope.view.lblLCSummary.text = scope.businessController.getDataBasedOnDataMapping("LCSummary", scope.dataMapping);
      scope.view.lblLCSummary1.text = scope.businessController.getDataBasedOnDataMapping("beneficiaryName", scope.dataMapping)+":";
      scope.view.lblLCSummary2.text = scope.businessController.getDataBasedOnDataMapping("referenceNumber", scope.dataMapping)+":";
      scope.view.lblLCSummary3.text = scope.businessController.getDataBasedOnDataMapping("creditAmount", scope.dataMapping)+":";
      scope.view.lblLCSummary4.text = scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping)+":";
      scope.view.lblLCSummary5.text = scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping)+":";
      scope.view.lblLCSummary6.text = scope.businessController.getDataBasedOnDataMapping("paymentTerms", scope.dataMapping)+":";
      scope.view.btnActions1.text = scope.businessController.getDataBasedOnDataMapping("copyAndCreateNewLC", scope.dataMapping);
      scope.view.btnActions2.text = scope.businessController.getDataBasedOnDataMapping("viewAllImportLC", scope.dataMapping);
    }, 
    setDrawingDetailButtonText: function() 
    { 
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      var scope = this; 
      var widgetName = '';
      var orientationHandler = new OrientationHandler();
      if (kony.application.getCurrentBreakpoint() === 640) {
        widgetName = "lblLCSummaryDrawings";
        scope.view.flxLCSummaryDrawings.isVisible = true;
        scope.view.flxLCSummary.isVisible = false;
      } else {
        widgetName = "lblLCSummary";
        scope.view.flxLCSummary.isVisible = true;
        scope.view.flxLCSummaryDrawings.isVisible = false;
      }
      scope.view[widgetName].text = scope.businessController.getDataBasedOnDataMapping("PaymentDetails", scope.dataMapping);
      scope.view[widgetName+"1"].text = scope.businessController.getDataBasedOnDataMapping("DrawingReference", scope.dataMapping)+":";
      scope.view[widgetName+"2"].text = scope.businessController.getDataBasedOnDataMapping("TotalDrawingAmount", scope.dataMapping)+":";
      scope.view[widgetName+"3"].text = scope.businessController.getDataBasedOnDataMapping("Accounttobedebitedfrom", scope.dataMapping)+":";
      scope.view[widgetName+"4"].text = scope.businessController.getDataBasedOnDataMapping("Presenter", scope.dataMapping)+":";
      scope.view[widgetName+"5"].text = scope.businessController.getDataBasedOnDataMapping("PresenterReference", scope.dataMapping)+":";
      scope.view[widgetName+"6"].text = scope.businessController.getDataBasedOnDataMapping("DocumentType", scope.dataMapping)+":";
      scope.view[widgetName+"7"].text = scope.businessController.getDataBasedOnDataMapping("TotalDocuments", scope.dataMapping)+":";
      scope.view[widgetName+"8"].text = scope.businessController.getDataBasedOnDataMapping("MessageToBank", scope.dataMapping)+":"; 
      scope.view.lblImportSuccess.text = scope.businessController.getDataBasedOnDataMapping("SuccessMessage", scope.dataMapping); 
      // scope.view.lblImportLCAck.text = scope.businessController.getDataBasedOnDataMapping("ImportLC-DrawingAcknowledgement", scope.dataMapping);
    }, 
    setDrawingButtonText : function () { 
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      var scope = this; 
      var widgetName = '';
      var orientationHandler = new OrientationHandler();
      if (kony.application.getCurrentBreakpoint() === 640) {
        widgetName = "lblLCSummaryDrawingsValue";
        scope.view.flxLCSummaryDrawings.isVisible = true;
        scope.view.flxLCSummary.isVisible = false;
      } else {
        widgetName = "lblLCSummaryValue";
        scope.view.flxLCSummary.isVisible = true;
        scope.view.flxLCSummaryDrawings.isVisible = false;
      }
      scope.view[widgetName+"1"].text = scope.getFieldValue("dashboardDrawingReferenceNo", scope.dataMapping);
      scope.view[widgetName+"2"].text = scope.getFieldValue("dashboardDrawingAmount",scope.dataMapping);
      scope.view[widgetName+"3"].text = scope.getFieldValue("dashboardAccountToBeDebitedFrom", scope.dataMapping);
      scope.view[widgetName+"4"].text = scope.getFieldValue("dashboardpresentorName", scope.dataMapping);
      scope.view[widgetName+"5"].text = scope.getFieldValue("dashboardPresentorReference", scope.dataMapping);
      scope.view[widgetName+"6"].text = scope.getFieldValue("dashboardDocumentStatus", scope.dataMapping);
      scope.view[widgetName+"7"].text = scope.getFieldValue("dashboardTotalDocuments",scope.dataMapping);
      scope.view[widgetName+"8"].text = scope.getFieldValue("dashboardMessageToBank", scope.dataMapping);
    },
    setStatus: function() {
      var scope = this;
      var serviceStatus = scope.collectionObj.Collection.LetterOfCredit.serviceSuccessMsg;
      if (serviceStatus === "true") {
        scope.view.imgSuccessIcon.src = "success_green.png";
        scope.view.lblImportSuccess.text = scope.businessController.getDataBasedOnDataMapping("SuccessMessage", scope.dataMapping);
        this.view.btnActions2.text = "View All Drawings";
        this.view.btnActions1.text = "View Drawing Detail";
        this.view.btnViewLCReport.text = "View LC Report";
      } else{
        scope.view.imgSuccessIcon.src = "close_red.png";
        scope.view.lblImportSuccess.text = scope.businessController.getDataBasedOnDataMapping("ErrorMessage", scope.dataMapping);
        scope.view.btnActions2.text = "Try Again";
        scope.view.btnActions1.text = "View All Drawings";
        this.view.btnViewLCReport.text = "View LC Report";
      }
    },
    /**
           Method: formatCurrencyWithCommas
	       Return: Returns formatted amount string. Adds commas and currency symbol to a given amount string.
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
    setAcknowledgementData: function(){
      this.collectionObj = ImportLCAcknowledgementStore.getState();
      var scope = this;
	  var formatUtils = applicationManager.getFormatUtilManager();
      this.view.segAcknowledgeDetails.widgetDataMap = {
        "flxDocument1": "flxDocument1",
        "flxDocument2": "flxDocument2",
        "flxDocument3": "flxDocument3",
        "flxDocuments": "flxDocuments",
        "flxDropDown": "flxDropDown",
        "flxReviewHeader": "flxReviewHeader",
        "flxReviewRight": "flxReviewRight",
        "flxReviewRowTemplate": "flxReviewRowTemplate",
        "flxReviewValues": "flxReviewValues",
        "flxSeparator1": "flxSeparator1",
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
        "lblTransactionHeader": "lblTransactionHeader"
      };
      var maxCreditAmount;
      if(scope.getFieldValue("valueMaximumCreditAmount") !== "NA"){
        maxCreditAmount = "$ "+this.formatCurrencyWithCommas(scope.getFieldValue("valueMaximumCreditAmount"), true, "", {"locale":"","positiveFormat":"{CS}{D}","negativeFormat":"-({CS}{D})","fractionDigits":"2"});
      }else
        maxCreditAmount = "NA"; 
      var amountWithCurrency = this.formatUtil.getCurrencySymbol(this.businessController.getDataBasedOnDataMapping("lblSelectedValueCurrency",this.dataMapping))+" "+scope.getFieldValue("valueformattedAmount");
      var payableAmountWithCurrency = scope.getFieldValue("valueFormattedPayableAmount") === "NA" ? "NA" : this.formatUtil.getCurrencySymbol(this.businessController.getDataBasedOnDataMapping("lblSelectedValuePayableCurrency",this.dataMapping))+" "+scope.getFieldValue("valueFormattedPayableAmount");
	  var chargesWithCurrency = formatUtils.formatAmountandAppendCurrencySymbol(scope.getFieldValue("valueCharges"), this.businessController.getDataBasedOnDataMapping("lblSelectedValueCurrency", this.dataMapping));
      var reviewData=[
        [ {
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("creditDetails", scope.dataMapping)},
          "flxSeparator2": { isVisible:true},
          "imgDropDown": "dropdown_collapse.png"
        },           
         [ 
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("referenceNumber", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("valueReferenceNumber"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("creditAmount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:amountWithCurrency, isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("tolerencePercentage", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text: scope.getFieldValue("valueTolerencePercentage") !== "NA" ? scope.getFieldValue("valueTolerencePercentage") +" %" :"NA", isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("maximumCreditAmount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:maxCreditAmount, isVisible:true}
           },

           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("additionalPayableAmount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:payableAmountWithCurrency, isVisible:true}            
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("paymentTerms", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("lblValuePaymentTerms",scope.dataMapping["PaymentTermsDropdown"],true), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("availableWith", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("valueAvailable1"), isVisible:true},
             lblReviewValue2:{text:scope.getFieldValue("valueAvailable2"), isVisible:scope.getFieldValue("valueAvailable2") !== "NA" ? true :  false},
             lblReviewValue3:{text:scope.getFieldValue("valueAvailable3"), isVisible:scope.getFieldValue("valueAvailable3") !=="NA" ? true :  false},
             lblReviewValue4:{text:scope.getFieldValue("valueAvailable4"), isVisible:scope.getFieldValue("valueAvailable4") !=="NA" ? true :  false}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("valueIssueDate"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("valueExpiryDate"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("chargesAccount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("valueSelectedChargeValue"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("marginAccount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("valueCommissionAccount"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("commissionAccount", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("valueMarginAccount"), isVisible:true}
           },
           {
             lblReview:{text:scope.businessController.getDataBasedOnDataMapping("messageToBank", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("valueMessage"), isVisible:true},
             flxRowTemplateSeparator: { isVisible:true}
           }
         ]
        ],
        [ 
          {
            lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("beneficiaryDetails", scope.dataMapping)},
            "flxSeparator2": { isVisible:true},
            "imgDropDown": "dropdown_collapse.png"
          },
          [
            {
              lblReview:{text:scope.businessController.getDataBasedOnDataMapping("beneficiaryName", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("valueBeneficiaryName"), isVisible:true}
            },
            {
              lblReview:{text:scope.businessController.getDataBasedOnDataMapping("beneficiaryAddress", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("valueBeneficiaryAddress1"), isVisible:true}
            },
            {
              lblReview:{text:scope.businessController.getDataBasedOnDataMapping("bankName", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("valueBankName") , isVisible:true}
            },
            {
              lblReview:{text:scope.businessController.getDataBasedOnDataMapping("bankAddress", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("valueBankAddress1"), isVisible:true},
              flxRowTemplateSeparator: { isVisible:true}
            }
          ]
        ],
        [ {
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("shipmentDetails", scope.dataMapping)},
          "flxSeparator2": { isVisible:true},
          "imgDropDown": "dropdown_collapse.png"
        },[
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("placeOfCharge", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valuePlaceOfCharge"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("portLoading", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valuePortLoading"), isVisible:true}    
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("portCharge", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valuePortCharge"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("finalDeliveryPlace", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueFinalDeliveryPlace"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("shipmentDate", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueshipmentDate"), isVisible:true}

          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("transhipment", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedTranshipment",scope.dataMapping["TranshipmentDropdown"],true), isVisible:true},
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("partialShipment", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedPartialShipment",scope.dataMapping["PartialShipmentsDropdown"],true), isVisible:true},
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("incoTerms", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedIncoTerms",scope.dataMapping["IncoTermsDropdown"],true), isVisible:true},
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("shipmentMode", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedShipmentMode",scope.dataMapping["ModeOfShipmentDropdown"],true), isVisible:true},
            flxRowTemplateSeparator: { isVisible:true}
          }
        ]
        ],[ {
          lblTransactionHeader: { text: scope.businessController.getDataBasedOnDataMapping("documentsTerms", scope.dataMapping)},
          "flxSeparator2": { isVisible:true},
          "imgDropDown": "dropdown_collapse.png"
        },[
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("description", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueDescription"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("requiredDocuments", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueRequiredDocuments"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("additionalCondition", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueAdditionalCondition"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("otherCondition", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("valueOtherCondition"), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("charges", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:chargesWithCurrency, isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("confirmationInstruction", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedInstruction",scope.dataMapping["ConfirmationInstructionsDropdown"],true), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("transferable", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedTransferable",scope.dataMapping["TransferableDropdown"],true), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("standByLC", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("lblSelectedStandByLC",scope.dataMapping["StandByLCDropdown"],true), isVisible:true}
          }
        ]
          ]
      ];
      this.view.segAcknowledgeDetails.setData(reviewData);
      this.setValuesToSummaryFields();
    },

    /**
	* @api : setValuesToSummaryFields
 	* Method to prepopulate the values of  of text boxes of Credit details 
	* @return : NA
	*/
    setValuesToSummaryFields: function(){
      var scope = this;
      try{
        var amountWithCurrency = this.formatUtil.getCurrencySymbol(this.businessController.getDataBasedOnDataMapping("lblSelectedValueCurrency",this.dataMapping))+" "+scope.getFieldValue("valueformattedAmount");
        this.view.lblLCSummaryValue1.text = scope.businessController.getDataBasedOnDataMapping("valueBeneficiaryName",scope.dataMapping);
        this.view.lblLCSummaryValue2.text = scope.businessController.getDataBasedOnDataMapping("valueReferenceNumber",scope.dataMapping);
        this.view.lblLCSummaryValue3.text = amountWithCurrency;
        this.view.lblLCSummaryValue4.text = scope.businessController.getDataBasedOnDataMapping("valueIssueDate",scope.dataMapping);
        this.view.lblLCSummaryValue5.text = scope.businessController.getDataBasedOnDataMapping("valueExpiryDate",scope.dataMapping);
        this.view.lblLCSummaryValue6.text = scope.getFieldValue("lblValuePaymentTerms",scope.dataMapping["PaymentTermsDropdown"],true);
      }catch(err){
        var errorObj =
            {
              "level" : "setValuesToSummaryFields",
              "method" : "postShow",
              "error": err
            };
      }
    },

    getFieldValue : function(fieldName,listValues,isDropdown){
      var scope = this;
      var resultValue = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      if(isDropdown){
        var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue,listValues);
        return fieldValue ? fieldValue : "NA";  
      }
      return resultValue && resultValue !== "Select here" ? resultValue : "NA";
    },

    getSelectedValueFromAccountsDropdown : function(fieldName){
      var scope = this;
      this.collectionObj = ImportLCAcknowledgementStore.getState();
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

    expandCollapse :function (context) {
      var scope = this;
      try{
        var sectionIndex = context.section;
        if (this.segAcknowledgementNewTempData === '') {
          this.segAcknowledgementNewTempData = JSON.parse(JSON.stringify(this.view.segAcknowledgeDetails.data));
        }
        var data = this.view.segAcknowledgeDetails.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {

          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segAcknowledgementNewTempData[sectionIndex][1];
          selectedHeaderData["flxSeparator2"].isVisible = true;
          //selectedHeaderData["flxGradient"].isVisible=true;
          this.view.segAcknowledgeDetails.setData(data);
        } else {

          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          // selectedHeaderData["flxSeparator2"].width = "100%";
          data[sectionIndex][1] = [];
          //selectedHeaderData["flxGradient"].isVisible=false;
          if(sectionIndex !== 3)
            selectedHeaderData["flxSeparator2"].isVisible = false;
          this.view.segAcknowledgeDetails.setData(data);

        }
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "expandCollapse",
              "error": err
            };
        //scope.onError(errorObj);
      }
    },
  };
});