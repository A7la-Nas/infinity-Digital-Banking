define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil', 'CampaignUtility'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil, CampaignUtility) {
let recordData = null; 
  let finalResponse = {};
  let drawingDate;
  return{
  //Type your controller code here 
  onNavigate: function(record){
    recordData = record;
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
    this.view.init = this.init;
    
  },
    /**
    * @api : onBreakpointChange
    * This function for changing the UI depending upon breakpoint
    * @return : NA
    */
    onBreakpointChange: function() {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  preShow: function(){
    var scope = this;
    FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
    scope.view.customheadernew.forceCloseHamburger();
    scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
    FormControllerUtility.showProgressBar(this.view);
    this.setDataFori18n();
    this.initButtonActions();
    this.navManager = applicationManager.getNavigationManager();
  },
    

  initButtonActions: function(){
    var scope = this;
    try{
      this.view.flxDrawingDetailsDropdown1.cursorType = "pointer";
      this.view.flxDrawingDetailsDropdown1.onClick = scope.toggleDrawingDetailsVisibility.bind(this, "DrawingSummary", this.view.imgDrawingDetailsDropdown1);
      this.view.flxDiscrepancyDropdown.cursorType = "pointer";
      this.view.flxDiscrepancyDropdown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, "ResponsetoDiscrepancy", this.view.imgDiscrepancyDropdown);
      this.view.flxDrawingDetailsDropdown.cursorType = "pointer";
      this.view.flxDrawingDetailsDropdown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, "DrawingDetails", this.view.imgDrawingDetailsDropdown);
      this.view.btnActionsDrawings.onClick = scope.formNavigation.bind(this, "btnActionsDrawings");
      this.view.btnActionsExportLC.onClick = scope.formNavigation.bind(this, "btnActionsExportLC");
      this.view.btnViewLCReport.onClick = scope.formNavigation.bind(this, "btnViewLCReport");
      this.view.flxCloseBtn.onClick = scope.closeAckMsg.bind(this);
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "frmExportLCDrawingAcknowledgementController",
            "method" : "initButtonActions",
            "error": err
          };
      scope.onError(errorObj);
    }
  },
         /**
         * @api : setDataFori18n
         * Assigning i18n keys
         * @arg: NA
         * @return : NA
         */
  setDataFori18n: function(){
      var scope = this;
      try{
        scope.view.lblExportLCAck.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports")+"-"+kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing")+"-"+kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
        scope.view.lblDrawingStatus.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingStatus")+":" ;
        scope.view.lblDrawingRefNo.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo")+":" ;
        scope.view.lblDrawingDate.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate")+":" ;
        scope.view.lblApplicant.text =  kony.i18n.getLocalizedString("i18n.ExportLC.Applicant")+":" ;
        scope.view.lblAdvisingRefNo.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo")+":" ;
        scope.view.lblLCAmount.text =  kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount")+":" ;
        scope.view.lblExpiryDate.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate")+":" ;
        scope.view.lblTotalDocuments.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments")+":" ;
        scope.view.lblDocuments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Documents")+":" ;
        scope.view.lblDocStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus")+":" ;
        scope.view.lblAmountCreditedValueInfo.text = "("+kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName")+")";
        scope.view.lblDiscrepanciesValueInfo.text ="("+kony.i18n.getLocalizedString("i18n.TradeFinance.KindlyForwardDoc")+")";
      }catch(err) {
        var errorObj = {
          "level": "frmExportLCDrawingAcknowledgementController",
          "method": "setDataFori18n",
          "error": err
        };
      }
    }, 
    
     /**
         * @api : updateFormUI
         * Method to initiate loading values into UI
         * @arg: viewModel - response of service
         * @return : NA
         */
    updateFormUI: function(viewModel) {
      var scope = this;
      try{
        if (viewModel.getExportDrawing) {
          finalResponse = viewModel.getExportDrawing;
          scope.drawingAcknowledgeSuccessUI();
          drawingDate = CommonUtilities.getFrontendDateStringInUTC(finalResponse.drawingCreatedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
          scope.setDrawingSummaryUI();
          scope.returnByBankDiscrepancies();
          scope.setDrawingDetailsData();
          scope.setLCSummaryData();  
          FormControllerUtility.hideProgressBar(this.view);
        }
        else{
          finalResponse = viewModel;
          scope.drawingAcknowledgeSuccessUI();
        }
        
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "updateFormUI",
              "error": err
            };
        scope.onError(errorObj);
      }
    }, 
    
    closeAckMsg: function(){
      var scope = this;
      try{
        scope.view.flxAck.setVisibility(false);
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "closeAckMsg",
              "error": err
            };
        scope.onError(errorObj);
      }
      
    },
    
    
    drawingAcknowledgeSuccessUI: function(){
      var scope = this;
      try{
           if(finalResponse.status === OLBConstants.EXPORT_DRAWING_STATUS.SUBMITTED_TO_BANK){
           scope.view.lblExportSuccess.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportLCSuccessMessage");
           scope.view.imgSuccessIcon.src = "success_green.png";
          }
          else{
          scope.view.lblExportSuccess.text = finalResponse.serverError;
            scope.view.imgSuccessIcon.src = "close_red.png";
            FormControllerUtility.hideProgressBar(this.view);
          }
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "drawingAcknowledgeSuccessUI",
              "error": err
            };
        scope.onError(errorObj);
      }      
    },
      
    setDrawingSummaryUI: function(){
      var scope = this;
      try{
        scope.view.lblDrawingSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingSummary");
        scope.view.lblDrawingStatusValue.text = finalResponse.status;
        scope.view.lblDrawingRefNoValue.text = finalResponse.drawingReferenceNo;
        scope.view.lblDrawingDateValue.text = drawingDate;       
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "setDrawingSummaryUI",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    order: function(number) {
      var scope = this;
      try{
      if(number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

      switch(number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
      }

      return number + "th";
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCViewDetailsReturnedController",
              "method" : "order",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
   returnByBankDiscrepancies: function(){
        var scope = this;
        try{
        var wholeDiscrepencies = 0;
        var discrepenciesCheckResponse = finalResponse;
        for( var objval in discrepenciesCheckResponse){
          if(objval.slice(0, -1) === "discrepanciesHistory"){
            wholeDiscrepencies += 1;
          }
        }
        var disOrder = scope.order(wholeDiscrepencies+1);
        var discrepancy = finalResponse.discrepencies;
        discrepancy = discrepancy.replace(/'/g, '"');
        discrepancy = JSON.parse(discrepancy);
        //var disOrder = scope.order(finalResponse.drawingResponse.wholeDiscrepanciesHistory.length - 1);
        if(finalResponse.hasOwnProperty("discrepanciesHistory1")){
          scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies") + " (" + (disOrder) + ")";
        }
          else{
          scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies") + " (1st)";         }
        //scope.view.lblViewReturnedByBankHistory.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewReturnedbyBankHistory") + " (" + finalResponse.drawingResponse.wholeDiscrepanciesHistory.length + ")";
        scope.view.lblTotalDocumentsValue.text = finalResponse.totalDocuments;
        scope.view.segDocumentsValueContainer.widgetDataMap = { lblHeading: "lblHeading" };
        // Processing document data
        var docMasterData = [];
        JSON.parse(finalResponse.returnedDocuments).map(function (documentData) {
          docMasterData.push({ lblHeading: documentData });
        });
        // setting data into segment
        scope.view.segDocumentsValueContainer.setData(docMasterData);
        scope.view.lblDocStatusValue.text = finalResponse.documentStatus;
        scope.view.segDiscrepancyResponse.widgetDataMap = {
          lblLeft1: "lblLeft1",
          lblRight1: "lblRight1"
        };
        // segment data
        // let discrepancyMasterData = finalResponse.drawingResponse.discrepanciesAndResponse;
        //set the data to segment
        var discrepanciesData = [];
        discrepancy.forEach((element,index)=>{
          var key = Object.keys(element)[0];
          discrepanciesData.push({
            lblLeft1 : {text : kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy"+(index+1)) + ":"  },
            lblRight1: {text : key , skin:"ICSknlbl424242SSP15pxSemibold"}
          },
          {
            lblLeft1 : {text :"D" + (index+1) + " " + "User Response" + ":" },
            lblRight1: {text :element[key].userResponse}                    
          },
            {
            lblLeft1 : {text :"D" + (index+1) + " " + "User Comment" + ":" },
            lblRight1: {text :element[key].userComment ? element[key].userComment : "NA" }                    
          })
        })
        if ('returnMessageToBank' in finalResponse && finalResponse.returnMessageToBank.length > 0) {
          discrepanciesData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": finalResponse.returnMessageToBank
          });
        } else {
          discrepanciesData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": kony.i18n.getLocalizedString("i18n.common.NA")
          });
        }
          scope.view.segDiscrepancyResponse.setData(discrepanciesData);
        }
        catch(err){
          var errorObj =
              {
                "level" : "frmExportLCViewDetailsReturnedController",
                "method" : "returnByBankDiscrepancies",
                "error": err
              };
          scope.onError(errorObj);
        }
      },
    
    setDrawingDetailsData: function(){
      var scope =this;
      try{
        if(finalResponse.hasOwnProperty('creditAccount')){
          this.view.lblAmountCreditedValueInfo.setVisibility(false);
          scope.view.lblAmountCreditedValue.text = finalResponse.amountToBeCreditedTo ? CommonUtilities.getMaskedAccName(finalResponse.amountToBeCreditedTo)[0] : kony.i18n.getLocalizedString("i18n.common.NA");
        }else{
          this.view.lblAmountCreditedValueInfo.setVisibility(true);
          scope.view.lblAmountCreditedValue.text = finalResponse.amountToBeCreditedTo;
        }
        scope.view.lblDrawingRefValue.text = recordData.amountFormatted ? recordData.amountFormatted : applicationManager.getConfigurationManager().getCurrency(finalResponse.currency) + " " + applicationManager.getFormatUtilManager().formatAmount(finalResponse.drawingAmount);
        scope.view.lblFinanceUSValue.text = finalResponse.financeBillFormatted;
        // Setting upload documents data into segment
        scope.view.segUploadDocuments.widgetDataMap = {
          lblListValue: "lblListValue",
          "flxDropdownValue": "flxDropdownValue"
        };
        // Processing upload documents data
        var uploadDocData = [];
        JSON.parse(finalResponse.uploadedDocuments).map(function(docData) {
          uploadDocData.push({
            lblListValue: docData,
            "flxDropdownValue": {
              "hoverSkin": "slFbox"
            },
          })
        });
        // setting data into segment
        scope.view.segUploadDocuments.setData(uploadDocData);
        // Setting physical documents data into segment
        scope.view.segPhysicalDocuments.widgetDataMap = {
          lblListValue: "lblListValue",
          "flxDropdownValue": "flxDropdownValue"
        };
        // Processing physical documents data
        var uploadPhysicalDocData = [];
        finalResponse.physicalDocumentsFormatted.map(function(physicalDocData, index) {
          if (index === 0) {
            uploadPhysicalDocData.push({
              lblListValue: {
                text: physicalDocData,
                skin: "sknlbl424242SSP15pxSemibold"
              },
              "flxDropdownValue": {
                "hoverSkin": "slFbox"
              },
            })
          } else {
            uploadPhysicalDocData.push({
              lblListValue: physicalDocData,
              "flxDropdownValue": {
                "hoverSkin": "slFbox"
              },
            })
          }
        });
        // setting data into segment
        scope.view.segPhysicalDocuments.setData(uploadPhysicalDocData);
        scope.view.lblDiscrepanciesValue.text = finalResponse.forwardDocumentsFormatted;
        scope.view.lblChargesDebitValue.text = finalResponse.chargesDebitAccount ? CommonUtilities.getMaskedAccName(finalResponse.chargesDebitAccount)[0] : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblMsgToBankValue.text = ('messageToTheBank' in finalResponse && finalResponse.messageToTheBank.length > 0) ? finalResponse.messageToTheBank : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.forceLayout();
        scope.view.forceLayout();
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "setDrawingDetailsData",
              "error": err
            };
        scope.onError(errorObj);

      }
    },
    

  formNavigation: function(widgetName){
    var scope = this;
    try{
      var formFriendlyName;
      var formFlow;
      if(widgetName === "btnActionsDrawings" || widgetName === "btnActionsExportLC"){
        if(widgetName === "btnActionsDrawings"){
          formFriendlyName = "frmExportLCDashboard";
          formFlow = 'GetAllExportDrawings';
        }
        else if(widgetName === "btnActionsExportLC"){
          formFriendlyName = "frmExportLCDashboard";
          formFlow = 'GetAllExportLettersOfCredit';
        }
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: "ExportLCUIModule" + "/" + formFriendlyName
        }, false, {
          flowType: formFlow
        }, recordData);
      }
      else if(widgetName === "btnViewLCReport"){
        formFriendlyName = "frmExportLCDetails";
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ExportLCUIModule" + "/" + formFriendlyName
        }).navigate(recordData.lcResponse);
      }   
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "frmExportLCDrawingAcknowledgementController",
            "method" : "formNavigation",
            "error": err
          };
      scope.onError(errorObj);
    }
  },
    
    
    setLCSummaryData: function(){
      var scope = this;
      try{
        scope.view.lblApplicantValue.text = recordData.applicant;
        scope.view.lblAdvisingRefValue.text = recordData.exportLCId;
        scope.view.lblLCAmoutValue.text =  recordData.amountFormatted ? recordData.amountFormatted : applicationManager.getConfigurationManager().getCurrency(finalResponse.currency) + " " + applicationManager.getFormatUtilManager().formatAmount(finalResponse.lcAmount); 
        scope.view.lblExpiryDateValue.text = recordData.expiryDateFormatted ? recordData.expiryDateFormatted : CommonUtilities.getFrontendDateStringInUTC(finalResponse.expiryDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
      }
      catch(err){
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "setLCSummaryData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    
      toggleDrawingDetailsVisibility: function(flxName, imgDropdown){
        var scope = this;
        try{
          if(imgDropdown.src === "arrowup_sm.png"){
            imgDropdown.src = "dropdown.png";
            if(flxName === "DrawingSummary"){
              scope.view.flxDrawingSummary.height = 55 + "dp";
              scope.view.flxBottomSeparatorDrawing.setVisibility(false);
              scope.view.flxBodyContentSummary.setVisibility(false);
              scope.view.flxBodyContentSummary2.setVisibility(false);
              scope.view.flxBodyContentSummary3.setVisibility(false);                        
            }
            else if(flxName === "ResponsetoDiscrepancy"){
              scope.view.flxDiscrepanciesMain.setVisibility(false);
              scope.view.flxBottomSeparater02.setVisibility(false);
            }
            else if(flxName  === "DrawingDetails"){
              scope.view.flxDrawingContent.setVisibility(false);
              scope.view.flxSeparator.setVisibility(false);
            }
          }
          else{
            imgDropdown.src = "arrowup_sm.png";
            if(flxName === "DrawingSummary"){
              scope.view.flxDrawingSummary.height = 201 + "dp";
              scope.view.flxBottomSeparatorDrawing.setVisibility(true);
              scope.view.flxBodyContentSummary.setVisibility(true);
              scope.view.flxBodyContentSummary2.setVisibility(true);
              scope.view.flxBodyContentSummary3.setVisibility(true);                        
            }
            else if(flxName === "ResponsetoDiscrepancy"){
              scope.view.flxDiscrepanciesMain.setVisibility(true);
              scope.view.flxBottomSeparater02.setVisibility(true);
            }
            else if(flxName  === "DrawingDetails"){
              scope.view.flxDrawingContent.setVisibility(true);
              scope.view.flxSeparator.setVisibility(true);
            }
          }
        }
        catch(err)
        {
          var errorObj =
              {
                "level" : "frmExportLCDrawingAcknowledgementController",
                "method": "toggleDrawingDetailsVisibility",
                "error": err
              };
          scope.onError(errorObj);
        }
      },
    
      /**
     * @api : getFormattedDate
     * This function is for formatting the date
     * @arg: NA
     * @return : NA
     */
    getFormattedDate: function(dateString) {
      var scope = this;
      try{
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var formatDate = date.getDate();
        if (formatDate < 10) {
          formatDate = "0" + formatDate;
        }
        if (month < 10) {
          month = "0" + month;
        }
        return month + "/" + formatDate + "/" + year;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "frmExportLCDrawingAcknowledgementController",
              "method" : "getFormattedDate",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
  
      /**
	  * @api : onError
 	  * Error thrown from catch block in component and shown on the form
	  * @return : NA
	  */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
    },

};
});