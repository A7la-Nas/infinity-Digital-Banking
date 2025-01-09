define(['./PrintReportStore','./PrintReportBusinessController','FormatUtil'],function(PrintReportStore, BusinessController, FormatUtil) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._dataMapping = {};
      this._serviceParameters = {};
      this.context = {};
      PrintReportStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.collectionObj = PrintReportStore.getState();
      this.store = PrintReportStore;
      this.formatUtil = new FormatUtil();
      this.collectionObj = PrintReportStore.getState();
      this.businessController.store = this.store;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
    },
    setContext: function(context){
      var scope = this;
      scope.context = context; 
      if ((scope.context.dashboardForm === true && scope.context.isLetterOfCreditsPrint === true) ||(scope.context.previousFormName = "frmImportLCDetails" && scope.context.isLetterOfCreditsPrint === true)) {
      scope.fromContext = JSON.parse(JSON.stringify(context));
      }           
    },
    /**
	* @api : preShow
	* This method will be invoked on preShow
	* @return : NA
	*/
    preShow: function(){
      var scope = this;
      try{
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "preShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : postShow
	* This method will be invoked on postShow
	* @return : NA
	*/
    postShow: function() {
      var scope = this;
      try {
        this.view.imgInfinityPage1.src = "digital_banking.png";
        this.view.imgInfinityPage2.src = "digital_banking.png";
        this.view.imgInfinityPage3.src = "digital_banking.png";
        if ((scope.context.dashboardForm === true && scope.context.isDrawingsPrint === true) || (scope.context.isDrawingDetailsPrint === true) || (scope.context.isReportDrawingPrint === true)) {
          this.serviceParameters.getDrawingsByID.Criteria.drawingsSrmsReqOrderID = this.context.drawingsSrmsReqOrderID;
          this.fetchTransactions(this.serviceParameters.getDrawingsByID);
        } else {
          this.serviceParameters.getAllDrawings.Criteria.filterByValue = this.context.srmsReqOrderID;
          this.fetchTransactions(this.serviceParameters.getAllDrawings);
          //scope.businessController.storeContextInCollection(scope.context);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : fetchTransactions
         * To get meta data and get data from object model
         * @return : NA
         */
    fetchTransactions: function(serviceParameters) {
      var scope = this;
      try {
        scope.businessController.setProperties(serviceParameters, this.breakpoints);
        scope.businessController.fetchTransactions(scope.context);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "fetchTransactions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : render
         * This method will be invoked when collection is updated to refresh UI
         * @return : NA
         */
    render: function() {
      var scope = this;
      try {
        scope.collectionObj = PrintReportStore.getState();
        scope.letterOfCredits = JSON.parse(JSON.stringify(scope.collectionObj));				
        if ((scope.context.dashboardForm === true && scope.context.isLetterOfCreditsPrint === true) ||(scope.context.previousFormName = "frmImportLCDetails" && scope.context.isLetterOfCreditsPrint === true)) {
          scope.drawingsResponse = JSON.parse(JSON.stringify(scope.collectionObj.Collection.Object.drawings));
          scope.collectionObj.Collection.Object = {};
          scope.collectionObj.Collection.Object = scope.fromContext;
        }
        if (scope.collectionObj.Collection.Object.hasOwnProperty("isLetterOfCreditsPrint") || scope.collectionObj.Collection.Object.Drawing.hasOwnProperty("isLOCReportPrint")) {
          this.view.lblHeaderPage1.text = "Import Letter of Credit - Report";
          this.view.lblHeaderPage2.text = "Import Letter of Credit - Report";
          this.view.lblHeaderPage3.text = "Import Letter of Credit - Report";
          this.setPrintDataLOC();
        } else {
          if (scope.collectionObj.Collection.Object.hasOwnProperty("Drawing")) {
            scope.drawingsByID = true;
            scope.previousCollection = JSON.parse(JSON.stringify(scope.collectionObj));
            scope.collectionObj.Collection.Object = scope.collectionObj.Collection.Object.Drawing[0];
          } else {
            scope.drawingsByID = false;
          }
          this.view.lblHeaderPage1.text = "Import - Drawing";
          this.view.lblHeaderPage2.text = "Import - Drawing";
          this.view.lblHeaderPage3.text = "Import - Drawing";
          this.setPrintDataDrawings();
        }
        this.printPage();
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "render",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : setPrintDataLOC 
         *  To set field values for UI
         *  return : NA
         */
    setPrintDataLOC: function() {
      var scope = this;
      try {
        //VisibilityOFF
        for (var i = 5; i <= 8; i++) {
          this.view["flxBeneficiaryRow" + i].setVisibility(false);
        }
        this.view.flxShipmentDetails.setVisibility(true);
        this.view.flxSwiftMessagesAdvices.setVisibility(false);
        this.view.flxRow15.setVisibility(true);
        this.view.flxFooterPage1.setVisibility(true);
        this.view.flxFooterPage3.setVisibility(false);
        this.view.flxHeader3.setVisibility(false);
        this.view.lblDocumentTermsValue5.width = "100dp";
        //Document Status
        this.view.flxDocumentsAndStatus.setVisibility(false);
        this.view.flxDocumentTerms.top = "40dp";
        //Credit Details visibility on
        this.view.flxRow7.setVisibility(true);
        this.view.flxRow8.setVisibility(true);
        this.view.flxRow9.setVisibility(true);
        this.view.flxRow11.setVisibility(true);
        this.view.flxRow12.setVisibility(true);
        this.view.flxRow13.setVisibility(true);
        this.view.flxRow14.setVisibility(true);
        this.view.flxRow15.setVisibility(true);
        this.view.flxFooterPage1.setVisibility(true);
        //if (scope.collectionObj.Collection.Object.status === 'Self Approved') {
        if (scope.drawingsResponse !== undefined && scope.drawingsResponse.length >0) {
          this.view.flxDrawingDetails.setVisibility(true);
          this.view.flxFooterPage2.setVisibility(false);
          this.setDrawingDetailsData();
        } else {
          this.view.flxDrawingDetails.setVisibility(false);
          this.view.flxFooterPage2.setVisibility(true);
        }
        //Credit Details
        this.view.lblCreditDetails.text = scope.getContextValue("creditDetails", scope.dataMapping);
        this.view.label1.text = scope.getContextValue("lblReferenceNumber", scope.dataMapping) + ":";
        this.view.labelValue1.text = scope.getContextValue("tbxReferenceNumber", scope.dataMapping);
        this.view.label2.text = scope.getContextValue("lblCreditAmount", scope.dataMapping) + ":";
        this.view.labelValue2.text = scope.getContextValue("tbxCreditAmount", scope.dataMapping);
        this.view.label3.text = scope.getContextValue("lblTolerencePercentage", scope.dataMapping) + ":";
        this.view.labelValue3.text = scope.getContextValue("tbxTolerencePercentage", scope.dataMapping);
        this.view.label4.text = scope.getContextValue("lblMaximumCreditAmount", scope.dataMapping) + ":";
        this.view.labelValue4.text = scope.getContextValue("tbxMaximumCreditAmount", scope.dataMapping);
        this.view.label5.text = scope.getContextValue("lblAdditionalPaymentAmount", scope.dataMapping) + ":";
        this.view.labelValue5.text = scope.getContextValue("tbxAdditionalPaymentAmount", scope.dataMapping);
        this.view.label6.text = "Approver:";
        this.view.labelValue6.text = scope.getContextValue("tbxPaymentTerms", scope.dataMapping);
        this.view.label7.text = scope.getContextValue("lblPaymentTerms", scope.dataMapping) + ":";
        this.view.labelValue7.text = scope.getContextValue("tbxPaymentTerms", scope.dataMapping);
        this.view.label8.text = scope.getContextValue("lblAvailableWith", scope.dataMapping) + ":";
        this.view.labelValue8.text = scope.getContextValue("tbxAvailableWith1", scope.dataMapping);
        this.view.label8SubValue2.text = scope.getContextValue("tbxAvailableWith2", scope.dataMapping);
        this.view.label8SubValue3.text = scope.getContextValue("tbxAvailableWith3", scope.dataMapping);
        this.view.label9.text = scope.getContextValue("lblIssueDate", scope.dataMapping) + ":";
        this.view.labelValue9.text = scope.getContextValue("tbxIssueDate", scope.dataMapping);
        this.view.label11.text = scope.getContextValue("lblExpiryDate", scope.dataMapping);
        this.view.labelValue11.text = scope.getContextValue("tbxExpiryDate", scope.dataMapping);
        this.view.label12.text = scope.getContextValue("lblChargesAccount", scope.dataMapping) + ":";
        this.view.labelValue12.text = scope.getSelectedValueFromAccountsDropdown("tbxChargesAccount");
        this.view.label13.text = scope.getContextValue("lblMarginAccount", scope.dataMapping) + ":";
        this.view.labelValue13.text = scope.getSelectedValueFromAccountsDropdown("tbxMarginAccount");
        this.view.label14.text = scope.getContextValue("lblCommissionAccount", scope.dataMapping) + ":";
        this.view.labelValue14.text = scope.getSelectedValueFromAccountsDropdown("tbxCommissionAccount");
        this.view.label15.text = scope.getContextValue("lblMessageToBank", scope.dataMapping) + ":";
        this.view.labelValue15.text = scope.getContextValue("tbxMessageToBank", scope.dataMapping);
        //Beneficiary Details
        this.view.lblBeneficiaryDetails.text = scope.getContextValue("beneficiaryDetails", scope.dataMapping);
        this.view.lblBeneficiary1.text = scope.getContextValue("lblBeneficiaryName", scope.dataMapping) + ":";
        this.view.lblBeneficiaryValue1.text = scope.getContextValue("tbxBeneficiaryName", scope.dataMapping);
        this.view.lblBeneficiary2.text = scope.getContextValue("lblBeneficiaryAddress", scope.dataMapping);
        this.view.lblBeneficiaryValue2.text = scope.getContextValue("tbxBeneficiaryAddress", scope.dataMapping);
        this.view.lblBeneficiary3.text = scope.getContextValue("lblBeneficiaryBank", scope.dataMapping);
        this.view.lblBeneficiaryValue3.text = scope.getContextValue("tbxBeneficiaryBank", scope.dataMapping);
        this.view.lblBeneficiary4.text = scope.getContextValue("lblBeneficiaryBankAddress", scope.dataMapping);
        this.view.lblBeneficiaryValue4.text = scope.getContextValue("tbxBeneficiaryBankAddress", scope.dataMapping);
        //Shipment Details
        this.view.lblShipmentDetails.text = scope.getContextValue("shipmentDetails", scope.dataMapping);
        this.view.lblShipment1.text = scope.getContextValue("lblPlaceOfCharge", scope.dataMapping) + ":";
        this.view.lblShipmentValue1.text = scope.getContextValue("tbxPlaceOfCharge", scope.dataMapping);
        this.view.lblShipment2.text = scope.getContextValue("lblPortLoading", scope.dataMapping) + ":";
        this.view.lblShipmentValue2.text = scope.getContextValue("tbxPortLoading", scope.dataMapping);
        this.view.lblShipment3.text = scope.getContextValue("lblPortDisCharge", scope.dataMapping) + ":";
        this.view.lblShipmentValue3.text = scope.getContextValue("tbxPortCharge", scope.dataMapping);
        this.view.lblShipment4.text = scope.getContextValue("lblFinalDeliveryPlace", scope.dataMapping) + ":";
        this.view.lblShipmentValue4.text = scope.getContextValue("tbxFinalDeliveryPlace", scope.dataMapping);
        this.view.lblShipment5.text = scope.getContextValue("lblLatestShipmentDate", scope.dataMapping) + ":";
        this.view.lblShipmentValue5.text = scope.getContextValue("tbxLatestShipmentDate", scope.dataMapping);
        this.view.lblShipment6.text = scope.getContextValue("lblTranshipment", scope.dataMapping) + ":";
        this.view.lblShipmentValue6.text = scope.getContextValue("tbxTranshipment", scope.dataMapping);
        this.view.lblShipment7.text = scope.getContextValue("lblPartialShipment", scope.dataMapping);
        this.view.lblShipmentValue7.text = scope.getContextValue("tbxPartialShipment", scope.dataMapping);
        this.view.lblShipment8.text = scope.getContextValue("lblIncoTerms", scope.dataMapping) + ":";
        this.view.lblShipmentValue8.text = scope.getContextValue("tbxIncoTerms", scope.dataMapping);
        this.view.lblShipment9.text = scope.getContextValue("lblShipmentMode", scope.dataMapping) + ":";
        this.view.lblShipmentValue9.text = scope.getContextValue("tbxShipmentMode", scope.dataMapping);
        //Document Terms
        this.view.lblDocumentTerms.text = scope.getContextValue("documentTerms", scope.dataMapping);
        this.view.lblDocumentTerms1.text = scope.getContextValue("lblDescriptionGoods", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue1.text = scope.getContextValue("tbxDescription", scope.dataMapping);
        this.view.lblDocumentTerms2.text = scope.getContextValue("lblDocumentsRequired", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue2.text = scope.getContextValue("tbxDocumentsRequired", scope.dataMapping);
        this.view.lblDocumentTerms3.text = scope.getContextValue("lblAdditionalCondition", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue3.text = scope.getContextValue("tbxAdditionalCondition", scope.dataMapping);
        this.view.lblDocumentTerms4.text = scope.getContextValue("lblOtherCondition", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue4.text = scope.getContextValue("tbxOtherCondition", scope.dataMapping);
        this.view.lblDocumentTerms5.text = scope.getContextValue("lblCharges", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue5.text = scope.getContextValue("tbxCharges", scope.dataMapping);
        this.view.lblDocumentTerms6.text = scope.getContextValue("lblConfirmationInstruction", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue6.text = scope.getContextValue("tbxConfirmationInstruction", scope.dataMapping);
        this.view.lblDocumentTerms7.text = scope.getContextValue("lblTransferable", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue7.text = scope.getContextValue("tbxTransferable", scope.dataMapping);
        this.view.lblDocumentTerms8.text = scope.getContextValue("lblStandByLC", scope.dataMapping) + ":";
        this.view.lblDocumentTermsValue8.text = scope.getContextValue("tbxStandByLC", scope.dataMapping);
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setPrintDataLOC",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : setDrawingDetailsData 
         *  To set segment data for drawingDetails
         *  return : NA
         */
    setDrawingDetailsData: function() {
      var scope = this;
      try{
        var segDrawingDetailsData = [];
        scope.drawingsResponse.forEach((element) => {
          segDrawingDetailsData.push({
            lblCoulmnTabValue1: {
              text: element.beneficiaryName ? element.beneficiaryName : "NA",
              isVisible: true
            },
            lblCoulmnTabValue2: {
              text: element.drawingReferenceNo ? element.drawingReferenceNo : "NA",
              isVisible: true
            },
            lblCoulmnTabValue3: {
              text: element.drawingAmount ? element.drawingAmount : "NA",
              isVisible: true
            },
            lblCoulmnTabValue4: {
              text: element.drawingCreationDate ? scope.getFormattedDate(element.drawingCreationDate) : "NA",
              isVisible: true
            },
            lblColumnTabValue5: {
              text: element.paymentStatus ? element.paymentStatus : "NA",
              isVisible: true
            }
          });
        });
        scope.view.segDrawingDetails.removeAll();
        scope.view.segDrawingDetails.setData(segDrawingDetailsData);
        scope.view.forceLayout();		
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setPrintDataLOC",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : setSwiftMessagesData 
         *  To set segment data for SwiftMessages
         *  return : NA
         */
    setSwiftMessagesData: function() {
      var scope = this;
      try{
        var segSwiftMessagesData = [];
        scope.swiftMessages.forEach((element) => {
          segSwiftMessagesData.push({
            lblCoulmnTabValue1: {
              text: element.beneficiaryName ? "Transfer to " + element.beneficiaryName + "'s Savings Account" : "NA",
              isVisible: true
            },
            lblCoulmnTabValue2: {
              text: element.swiftDate ? scope.getFormattedDate(element.swiftDate) : "NA",
              isVisible: true
            },
            lblCoulmnTabValue3: {
              text: element.swiftMessageType ? element.swiftMessageType : "NA",
              isVisible: true
            },
            lblCoulmnTabValue4: {
              text: element.swiftCategory ? element.swiftCategory : "NA",
              isVisible: true
            },
            lblColumnTabValue5: {
              text: element.swiftMessage ? element.swiftMessage : "NA",
              isVisible: true
            }
          });
        });
        this.view.segSwiftMessages.removeAll();
        this.view.segSwiftMessages.setData(segSwiftMessagesData);
        this.view.forceLayout();	
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setPrintDataLOC",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : setPrintDataDrawings 
         *  To set field values for UI
         *  return : NA
         */
    setPrintDataDrawings: function() {
      var formatData = {
        "locale": "",
        "positiveFormat": "{CS}{D}",
        "negativeFormat": "-({CS}{D})",
        "fractionDigits": "2"
      };
      var scope = this;
      try {
        //this.view.flxDocumentTerms.top = "2500dp";
        //this.view.flxHeader3.top = "500dp";
        //LCSummary flex on
        this.view.flxBeneficiaryRow5.setVisibility(true);
        this.view.flxBeneficiaryRow6.setVisibility(true);
        this.view.flxBeneficiaryRow7.setVisibility(true);
        this.view.flxBeneficiaryRow8.setVisibility(true);
        this.view.flxRow15.setVisibility(false);
        //Drawing Details Visibility off
        this.view.flxRow7.setVisibility(false);
        this.view.flxRow8.setVisibility(false);
        this.view.flxRow9.setVisibility(false);
        this.view.flxRow11.setVisibility(false);
        this.view.flxRow12.setVisibility(false);
        this.view.flxRow13.setVisibility(false);
        this.view.flxRow14.setVisibility(false);
        this.view.flxRow15.setVisibility(false);
        this.view.flxFooterPage1.setVisibility(false);
        //Document Details flex off
        this.view.flxDocumentTermsRow6.setVisibility(false);
        this.view.flxDocumentTermsRow7.setVisibility(false);
        this.view.flxDocumentTermsRow8.setVisibility(false);
        this.view.flxDocumentTermsRow9.setVisibility(false);
        this.view.flxShipmentDetails.setVisibility(false);
        this.view.lblDocumentTermsValue5.width = "25%";
        //Document Status
        this.view.flxDocumentsAndStatus.setVisibility(true);
        this.view.flxShipmentDetails.setVisibility(false);
        this.view.flxHeader3.setVisibility(true);
        this.view.flxFooterPage3.setVisibility(true);
        this.view.flxDrawingDetails.setVisibility(false);
        //LC Summary
        this.view.lblCreditDetails.text = scope.getContextValue("lcSummary", scope.dataMapping);
        this.view.label1.text = scope.getContextValue("lblBeneficiary", scope.dataMapping) + ":";
        this.view.labelValue1.text = scope.getContextValue("tbxBeneficiary", scope.dataMapping);
        this.view.label2.text = scope.getContextValue("lblReferenceNumber", scope.dataMapping) + ":";
        this.view.labelValue2.text = scope.getContextValue("tbxReferenceNumber", scope.dataMapping);
        this.view.label3.text = scope.getContextValue("lblCreditAmount", scope.dataMapping) + ":";
        this.view.labelValue3.text = scope.collectionObj.Collection.Object ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.getContextValue("tbxCreditAmount", scope.dataMapping), scope.collectionObj.Collection.Object.lcCurrency, formatData, "").text : "NA";
        this.view.label4.text = scope.getContextValue("lblIssueDate", scope.dataMapping) + ":";
        this.view.labelValue4.text = scope.getFormattedDate(scope.getContextValue("tbxIssueDate", scope.dataMapping));
        this.view.label5.text = scope.getContextValue("lblExpiryDate", scope.dataMapping) + ":";
        this.view.labelValue5.text = scope.getFormattedDate(scope.getContextValue("tbxExpiryDate", scope.dataMapping));
        this.view.label6.text = scope.getContextValue("lblPaymentTerms", scope.dataMapping) + ":";
        this.view.labelValue6.text = scope.getContextValue("tbxPaymentTerms", scope.dataMapping);
        //Drawing Details
        this.view.lblBeneficiaryDetails.text = scope.getContextValue("drawingDetails", scope.dataMapping);
        this.view.lblBeneficiary1.text = scope.getContextValue("lblDrawingAmount", scope.dataMapping) + ":";
        this.view.lblBeneficiaryValue1.text = scope.collectionObj.Collection.Object ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.getContextValue("tbxDrawingAmount", scope.dataMapping), scope.collectionObj.Collection.Object.lcCurrency, formatData, "").text : "NA";
        this.view.lblBeneficiary2.text = scope.getContextValue("lblCreationDate", scope.dataMapping);
        this.view.lblBeneficiaryValue2.text = scope.getFormattedDate(scope.getContextValue("tbxCreationDate", scope.dataMapping));
        this.view.lblBeneficiary3.text = scope.getContextValue("lblDocumentStatus", scope.dataMapping);
        this.view.lblBeneficiaryValue3.text = scope.getContextValue("tbxDocumentStatus", scope.dataMapping);
        this.view.lblBeneficiary4.text = scope.getContextValue("lblPresenter", scope.dataMapping);
        this.view.lblBeneficiaryValue4.text = scope.getContextValue("tbxPresenter", scope.dataMapping);
        this.view.lblBeneficiary5.text = scope.getContextValue("lblPresenterReference", scope.dataMapping);
        this.view.lblBeneficiaryValue5.text = scope.getContextValue("tbxPresenterReference", scope.dataMapping);
        this.view.lblBeneficiary6.text = scope.getContextValue("lblForwardContract", scope.dataMapping);
        this.view.lblBeneficiaryValue6.text = scope.getContextValue("tbxForwardContract", scope.dataMapping);
        this.view.lblBeneficiary7.text = scope.getContextValue("lblShippingGuaranteeReference", scope.dataMapping);
        this.view.lblBeneficiaryValue7.text = scope.getContextValue("tbxShippingGuaranteeReference", scope.dataMapping);
        this.view.lblBeneficiary8.text = scope.getContextValue("lblMessageFromBank", scope.dataMapping);
        this.view.lblBeneficiaryValue8.text = scope.getContextValue("tbxMessageFromBank", scope.dataMapping);
        //Document Status
        this.view.lblDocumentStatusHeader.text = scope.getContextValue("documentStatus", scope.dataMapping);
        this.view.lblDocumentStatus1.text = scope.getContextValue("lblDocumentStatus1", scope.dataMapping);
        this.view.lblDocumentStatusValue1.text = scope.getContextValue("tbxDocumentStatus1", scope.dataMapping);
        this.view.lblDocumentStatus2.text = scope.getContextValue("lblDocumentStatus2", scope.dataMapping);
        //this.view.lblDocumentStatusValue2.text = scope.getContextValue("tbxDocumentStatus2", scope.dataMapping);
        var documentName = scope.getContextValue("tbxDocumentStatus2", scope.dataMapping);
        var documentNameArray = [];
        var documentNameObject = '';
        documentName = documentName.split("||");
        documentName.forEach((element) => {
          documentNameArray.push({
            imgBillingLetter: {
              "src": "download.png",
              isVisible: false
            },
            lblBillingLetter: {
              text: element ? element : "NA",
              isVisible: true
            },
            flxCommentlbl: {
              text: "Comment",
              isVisible: false
            }
          });
        });
        this.view.segDocumentsName.removeAll();
        scope.view.segDocumentsName.setData(documentNameArray);
        this.view.forceLayout();
        this.view.lblDocumentStatus3.text = scope.getContextValue("lblDocumentStatus3", scope.dataMapping);
        this.view.lblDocumentStatusValue3.text = scope.getContextValue("tbxDocumentStatus3", scope.dataMapping);
        this.view.lblDocumentStatus4.text = scope.getContextValue("lblDocumentStatus4", scope.dataMapping);
        //this.view.lblDocumentStatusValue4.text = scope.getContextValue("tbxDocumentStatus4", scope.dataMapping);
        var documentDiscrepancies = scope.getContextValue("tbxDocumentStatus4", scope.dataMapping);
        documentDiscrepancies = documentDiscrepancies.split("||");
        var documentDiscrepanciesArray = [];
        var documentDiscrepanciesObject = '';
        documentDiscrepancies.forEach((element) => {
          documentDiscrepanciesArray.push({
            imgBillingLetter: {
              "src": "download.png",
              isVisible: false
            },
            lblBillingLetter: {
              text: element ? element : "NA",
              isVisible: true
            },
            flxCommentlbl: {
              text: "Comment",
              isVisible: false
            }
          });
        });
        this.view.segDiscrepancies.removeAll();
        this.view.segDiscrepancies.setData(documentDiscrepanciesArray);
        this.view.forceLayout();
        this.view.lblDocumentStatus5.text = scope.getContextValue("lblDocumentStatus5", scope.dataMapping);
        this.view.lblDocumentStatusValue5.text = scope.getContextValue("tbxDocumentStatus5", scope.dataMapping);
        //Payment Details
        var status = "";
        var drawingStatus = scope.collectionObj.Collection.Object.Drawing;
        if (drawingStatus !== undefined) {
          if (scope.collectionObj.Collection.Object.Drawing[0].status === "Completed") {
            status = true;
          } else {
            status = false;
          }
        } else {
          if (scope.collectionObj.Collection.Object.status === "Completed") {
            status = true;
          } else {
            status = false;
          }
        }
        //Payment Details
        if (status === true) {
          this.view.flxFooterPage2.setVisibility(false);
          this.view.lblDocumentTerms.text = scope.getContextValue("paymentDetails", scope.dataMapping);
          this.view.lblDocumentTerms1.text = scope.getContextValue("lblDocumentTerms1", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue1.text = scope.getContextValue("tbxDocumentTerms1", scope.dataMapping);
          this.view.lblDocumentTerms2.text = scope.getContextValue("lblDocumentTerms2", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue2.text = scope.getContextValue("tbxDocumentTerms2", scope.dataMapping);
          this.view.lblDocumentTerms3.text = scope.getContextValue("lblDocumentTerms3", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue3.text = scope.collectionObj.Collection.Object ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.getContextValue("tbxDocumentTerms3", scope.dataMapping), scope.collectionObj.Collection.Object.lcCurrency, formatData, "").text : "NA";
          this.view.lblDocumentTerms4.text = scope.getContextValue("lblDocumentTerms4", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue4.text = scope.getSelectedValueFromAccountsDropdown("tbxDocumentTerms4");
          this.view.lblDocumentTerms5.text = scope.getContextValue("lblDocumentTerms5", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue5.text = scope.getContextValue("tbxDocumentTerms5", scope.dataMapping);
          scope.swiftMessages = scope.previousCollection.Collection.Object.SwiftsAndAdvises;
          if (scope.swiftMessages.length > 0 && scope.swiftMessages !== undefined) {
            this.view.flxSwiftMessagesAdvices.setVisibility(true);
            this.setSwiftMessagesData();
          } else {
            this.view.flxSwiftMessagesAdvices.setVisibility(false);
          }
        } else {
          this.view.flxDocumentTermsRow1.setVisibility(false);
          this.view.flxDocumentTermsRow2.setVisibility(false);
          this.view.flxSwiftMessagesAdvices.setVisibility(false);
          this.view.flxFooterPage2.setVisibility(true);
          this.view.lblDocumentTerms.text = scope.getContextValue("paymentDetails", scope.dataMapping);
          this.view.lblDocumentTerms3.text = scope.getContextValue("lblDocumentTerms3", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue3.text = scope.collectionObj.Collection.Object ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.getContextValue("tbxDocumentTerms3", scope.dataMapping), scope.collectionObj.Collection.Object.lcCurrency, formatData, "").text : "NA";
          this.view.lblDocumentTerms4.text = scope.getContextValue("lblDocumentTerms4", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue4.text = scope.getSelectedValueFromAccountsDropdown("tbxDocumentTerms4");
          this.view.lblDocumentTerms5.text = scope.getContextValue("lblDocumentTerms5", scope.dataMapping) + ":";
          this.view.lblDocumentTermsValue5.text = scope.getContextValue("tbxDocumentTerms5", scope.dataMapping);
          this.view.forceLayout();
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setPrintDataDrawings",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : getFieldValue 
         *  To get the value of a field
         *  return : returns field value
         */
    getContextValue: function(fieldName, dataMapping) {
      var scope = this;
      var fieldValue = this.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      return fieldValue ? fieldValue : "NA";
    },
    getFieldValue: function(fieldName, listValues, isDropdown) {
      var scope = this;
      var resultValue = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      if (isDropdown) {
        var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue, listValues);
        return fieldValue ? fieldValue : "NA";
      }
      return resultValue ? resultValue : "NA";
    },
    getDataBasedOnDataMapping: function(widget, dataMapping) {
      var collectionObj = this.store.getState();
      for (var record in dataMapping) {
        var keyValues = dataMapping[record];
        for (var key in keyValues) {
          if (widget === key) {
            var fieldValue = dataMapping[record][widget];
            if (typeof fieldValue === "string") {
              if (!fieldValue.indexOf("${Collection")) {
                var group = fieldValue.split(".")[1];
                var fieldType = fieldValue.split(".")[2].replace("}", "");
                if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                  if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                    return collectionObj.Collection[group][fieldType];
                  }
                }
              } else if (!fieldValue.indexOf("${i18n")) {
                return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
              } else {
                return fieldValue;
              }
            } else if (typeof fieldValue === "object") {
              var data = this.getDataSpecificToBreakpoint(fieldValue);
              if (!data.indexOf("${Collection")) {
                var group = data.split(".")[1];
                var fieldType = data.split(".")[2].replace("}", "");
                if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                  if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                    return collectionObj.Collection[group][fieldType];
                  }
                }
              } else if (!data.indexOf("${i18n")) {
                return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{") + 7, data.length - 2));
              } else {
                return data;
              }
            }
          }
        }
      }
      return "";
    },
    /**
         * @api : getFormattedDate
         * gets date string for formatting
         * @return : formattedDate
         */
    getFormattedDate: function(dateString) {
      var date = new Date(dateString);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var formatDate = date.getDate();
      if (formatDate < 10) {
        formatDate = '0' + formatDate;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return (month + '/' + formatDate + '/' + year);
    },
    /**
         * @api : getDataSpecificToBreakpoint
         * gets data specified to the corresponding breakpoint
         * @return : NA
         */
    getDataSpecificToBreakpoint: function(inputJSON) {
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      if (Object.keys(this.breakpoints).length !== 0) {
        for (var key in this.breakpoints) {
          if (currentBreakpoint === this.breakpoints[key]) {
            if (!kony.sdk.isNullOrUndefined(inputJSON.key)) {
              return inputJSON.key;
            }
          }
        }
      }
      if (inputJSON.hasOwnProperty("default")) {
        return inputJSON["default"];
      }
    },
    printPage: function() {
      var scope = this;
      try {
        var data = "";
        var widget = this.view.flxMain;
        if (scope.drawingsByID === true) {
          data = scope.context;
        } else {
          if (scope.previousCollection !== undefined) {
            data = scope.previousCollection.Collection.Object;
          } else {
            data = scope.collectionObj.Collection.Object;
          }
        }
        this.invokePrint(widget, data);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "printPage",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /*  Method : getSelectedValueFromAccountsDropdown 
	 *  To get the selected value from accounts dropdown
     *  return : returns selected dropdown value
      */
    getSelectedValueFromAccountsDropdown: function(fieldName) {
      var scope = this;
      this.collectionObj = PrintReportStore.getState();
      var selectedAccountID = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
      var accountDropdownValues = this.context.userAccounts;
      if (accountDropdownValues && selectedAccountID) {
        var selectedAccount = accountDropdownValues.find(({
          accountID
        }) => accountID === selectedAccountID);
        if (selectedAccount) {
          var accountNumberFormatted = selectedAccount.Account_id.slice(selectedAccount.Account_id.length - 4);
          var accountNameFormatted = selectedAccount.AccountName+"..."+accountNumberFormatted;
          return selectedAccount.AccountName ? accountNameFormatted : "NA";
        } else {
          return "NA";
        }
      }
      return "NA";
    },
    /**
      * @api : onError
      * Error thrown from catch block in component and shown on the form
      * @return : NA
      */
    onError: function(err) {
      var error = err;
      //alert(JSON.stringify(err));
    }
  }
});