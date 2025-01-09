define(['./ViewDetailsStore','./ViewDetailsBusinessController', 'FormatUtil','FormControllerUtility' , 'CommonUtilities'],function(ViewDetailsStore, BusinessController, FormatUtil,FormControllerUtility, CommonUtilities) {
  var orientationHandler = new OrientationHandler();
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameter = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakpoints = {};
      ViewDetailsStore.subscribe(this.render.bind(this));
      this.store = ViewDetailsStore;
      this.formatUtil = new FormatUtil();
      this.businessController = new BusinessController();
      this.collectionObj = ViewDetailsStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.segViewDetailsTempData = "";
      this.currentTab = "LetterofCredits";
      this.viewDetailsObj = "";
      this.paymentAdvices = [];
      this.swiftMessages = [];
      this.isTablet = false;
      this.presenter;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParameter', () => {
        return this._serviceParameter;
      });
      defineSetter(this, 'serviceParameter', value => {
        this._serviceParameter = value;
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

    /**
      * @api : preShow
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    preShow: function(){
      var scope = this;
      try{
        scope.view.segViewDetails.removeAll();
        scope.serviceParameter.SwiftAndAdvices.Criteria.orderId = "LC0001222";
        scope.businessController.setProperties(this.serviceParameter, this.dataFormatting, this.breakpoints);
        scope.businessController.fetchSwiftAndAdvices();
        scope.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' });
        scope.view.flxVerticalEllipsis.setVisibility(true);
        scope.view.flxDownload.setVisibility(false);
        scope.view.flxPrint.setVisibility(false);
      }
      catch(err)
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
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    postShow: function(){
      var scope = this;
      try{
        this.formatData = {
          "locale": "",
          "positiveFormat": "{CS}{D}",
          "negativeFormat": "-({CS}{D})",
          "fractionDigits": "2"
        };
        scope.view.flxAmendmentsContent.setVisibility(true);
        var segTemplate = scope.getSegmentTemplate();
        scope.view.segViewDetails.rowTemplate = segTemplate.row;
        scope.view.segViewDetails.sectionHeaderTemplate = segTemplate.header;		
        scope.view.btnAmendLC.onClick = scope.navAmendments.bind(this);          
        scope.view.btnBack.onClick = this.onBackClick;
        scope.view.btnBack.text = this.getDataBasedOnDataMapping("btnBack", this.dataMapping);
        scope.currentTab = "LetterofCredits";
        if(scope.context.previousFormName === "frmImportLCDashboard")
          scope.setTabData("LetterOfCredits");
        scope.view.lblHeader.text = "Import LC Details";
        scope.view.lblImportLC.text = "Import LC - LC Report"+" - "+scope.getDataBasedOnDataMapping("tbxReferenceNumber", scope.dataMapping);
        scope.view.flxSwiftAndAdvicesInfo.setVisibility(false);
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        scope.view.flxRightIcon.onClick = this.animateFlex.bind(this);        
        var configurationManager = applicationManager.getConfigurationManager();
        
        var drawingPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_VIEW');
        var amendPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_AMENDMENT_CREATE');
        if(drawingPermission === true){
          if(scope.context.status === "Approved"){
            scope.view.flxDrawingsContent.setVisibility(true);
          }
          else{
            scope.view.flxDrawingsContent.setVisibility(false);
          }
        }
        else{
          scope.view.flxDrawingsContent.setVisibility(false);
        }
        if(scope.collectionObj.Collection.Object.status === "Approved" && amendPermission)
          this.view.btnAmendLC.setVisibility(true);
        else
          this.view.btnAmendLC.setVisibility(false);
        scope.view.btnLOC.onClick = scope.setTabData.bind(scope, "LetterOfCredits");
        scope.view.btnDrawing.onClick = scope.setTabData.bind(scope, "Drawings");  
        scope.view.btnAmendments.onClick = scope.setTabData.bind(scope, "Amendments"); 
        scope.view.flxRightIcon.onClick = this.animateFlex.bind(this);
        scope.view.ImportLCListing.contextualActionButtonOnClick = this.contextualButtonOnClick.bind(this);
        scope.view.ImportLCListing.navAmend = this.navAmendments.bind(this);
        scope.lcSrmsReqOrderID = scope.context.srmsReqOrderID;
        scope.view.flxSwiftAndAdvices.onClick = this.renderSwiftAndAdvices.bind(this);
        scope.view.flxVerticalEllipsis.onClick = this.renderPrintAndDownload.bind(this);
      }catch(err)
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
    navAmendments: function(){
      var scope = this;
      var importLCData = scope.collectionObj.Collection;
      var form = kony.application.getCurrentForm();
      var popupObj = scope.view.flxPopup.clone();
      form.remove(popupObj);
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxConfirmPopup.centerY = "50%";
      popupObj.flxConfirmPopup.top = "0dp";
      popupObj.flxConfirmPopup.flxButtons.btnAction1.onClick = function() {
        form.remove(popupObj);
      };
      popupObj.flxConfirmPopup.flxPopupHeader.flxConfirm.onClick = function() {
        form.remove(popupObj);
      };
      popupObj.flxConfirmPopup.flxButtons.btnAction2.onClick = function() {
        form.remove(popupObj);
        FormControllerUtility.showProgressBar(this.view);
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCAmend"
        }).navigate(importLCData.Object);
      };
    },

    /**
      * @api : setTabData
      * To set segment data for tab on button click
      * @return : NA
      */
    setTabData: function(tabName) {			 
      var scope = this;
      try {
        scope.currentTab = tabName;
        scope.setTabNavigation();
        scope.render();
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setTabNavigation
      * To set segment data on TabNavigation
      * @return : NA
      */
    setTabNavigation: function() {
      var scope = this;
      var breakpoint = kony.application.getCurrentBreakpoint();
      try{
        if (scope.currentTab === "LetterOfCredits") {
          if (breakpoint === 640){
            scope.view.flxContentSwitchHeader.height = 55+"dp";
          }
          else{
            scope.view.flxContentSwitchHeader.height = 55+"dp";
          }
          scope.view.flxListHeader.height = 50 +"dp";
          scope.view.flxViewDetails.setVisibility(true);
          scope.view.flxBottomSeparator.setVisibility(true);
          scope.view.flxTabSeparator.setVisibility(false);
          scope.view.flxDrawingsDetails.setVisibility(false);
          scope.view.btnDrawing.skin = "ICSknBtnAccountSummaryUnselected2";
          scope.view.btnLOC.skin = "ICSknBtnAccountSummarySelected2";
          scope.view.btnAmendments.skin = "ICSknBtnAccountSummaryUnselected2";
          if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
            scope.FooterVisibility(true);
            scope.view.flxFooter.setVisibility(false);	            
          }
          scope.view.flxVerticalEllipsis.setVisibility(true);
          scope.view.flxSwiftAndAdvices.setVisibility(true);
        }
        else if (scope.currentTab === "Drawings" || scope.currentTab === "Amendments") {
          if(scope.currentTab === "Drawings"){
            scope.context["Tab"] = "Drawings";
            scope.view.btnDrawing.skin = "ICSknBtnAccountSummarySelected2";
            scope.view.btnLOC.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnAmendments.skin = "ICSknBtnAccountSummaryUnselected2"
          }
          else if(scope.currentTab === "Amendments"){
            scope.context["Tab"] = "Amendments";
            scope.view.btnDrawing.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnLOC.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnAmendments.skin = "ICSknBtnAccountSummarySelected2"
          }
          scope.view.ImportLCListing.setContext(scope.context);

          if (breakpoint === 640){
            scope.view.flxContentSwitchHeader.height = 55+"dp";
            scope.view.flxTabSeparator.setVisibility(false);
          }
          else{
            scope.view.flxContentSwitchHeader.height= 55+"dp";
            scope.view.flxTabSeparator.setVisibility(true);
          }
          scope.view.flxViewDetails.setVisibility(false);
          scope.view.flxListHeader.height = 60 +"dp";
          scope.view.flxDrawingsDetails.setVisibility(true);
          scope.view.flxSwiftAndAdvicesContent.setVisibility(false);
          scope.view.flxBottomSeparator.setVisibility(false);
          scope.view.flxDownload.setVisibility(false);
          scope.view.flxPrint.setVisibility(false);
          scope.view.flxVerticalEllipsis.setVisibility(false);
          scope.view.flxSwiftAndAdvices.setVisibility(false);
          if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
            scope.FooterVisibility(false);
          }
          else{
            scope.FooterVisibility(true);
          }
        }
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setTabNavigation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : contextualButtonOnClick
      * To send data of importlclisting component to viewdetails form
      * @return : NA
      */
    contextualButtonOnClick: function(id, data, LOCData = null){
      var scope = this;
      try{
        data["isLOCReportPrint"] = true;
        scope.contextualActionButtonOnClick(id, data, LOCData);
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "contextualButtonOnClick",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
       * @api : setContext
       * Method to set the context value 
       * @return : NA
       */
    setContext: function(context) {
      var scope = this;
      try{
        scope.context = context;
        scope.businessController.storeContextInCollection(scope.context);
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
	* @api : render
	* This method will be invoked when collection is updated to refresh UI
	* @return : NA
	*/
    render: function() {
      var scope = this;
      try{
        if(ViewDetailsStore.getState().Collection.Object.lcReferenceNo) {
          scope.collectionObj = ViewDetailsStore.getState();
        }
        if(ViewDetailsStore.getState().Collection.Object.PaymentAdvices || ViewDetailsStore.getState().Collection.Object.SwiftMessages){
          this.paymentAdvices = ViewDetailsStore.getState().Collection.Object.PaymentAdvices;
          this.swiftMessages = ViewDetailsStore.getState().Collection.Object.SwiftMessages;
          this.renderButtons();
        }
        scope.setViewDetailsData();
        scope.setTabNavigation();
      }
      catch(err)
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
      * @api : setViewDetailsData
      * Sets Data for LC report
      * @return : NA
      */
    setViewDetailsData: function(){
      var scope = this;
      try{
        scope.formatData = {
          "locale": "",
          "positiveFormat": "{CS}{D}",
          "negativeFormat": "-({CS}{D})",
          "fractionDigits": "2"
        };
        scope.view.segViewDetails.widgetDataMap = {
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
        var reviewData=[
          [ {
            "lblTransactionHeader": {text:scope.getDataBasedOnDataMapping("creditDetails", scope.dataMapping)},
            "imgDropDown":{"src":"dropdown_collapse.png"},
            "flxDropDown":{onClick: scope.onActionClick.bind(this)},
            "flxSeparator2": { isVisible:true}
          },           
           [
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblReferenceNumber", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxReferenceNumber"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblCreditAmount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text: scope.getFieldValue("tbxCreditAmount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblTolerencePercentage", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxTolerencePercentage") !== "NA" ? scope.getFieldValue("tbxTolerencePercentage")+"%" : "NA", isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblMaximumCreditAmount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text: scope.getFieldValue("tbxMaximumCreditAmount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblAdditionalPaymentAmount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text: scope.getFieldValue("tbxAdditionalPaymentAmount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblPaymentTerms", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxPaymentTerms"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblAvailableWith", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxAvailableWith1"), isVisible:true},
              lblReviewValue2:{text:scope.getFieldValue("tbxAvailableWith2"), isVisible:scope.getFieldValue("tbxAvailableWith2") !== "NA" ? true :  false},
              lblReviewValue3:{text:scope.getFieldValue("tbxAvailableWith3"), isVisible:scope.getFieldValue("tbxAvailableWith3") !=="NA" ? true :  false},
              lblReviewValue4:{text:scope.getFieldValue("tbxAvailableWith4"), isVisible:scope.getFieldValue("tbxAvailableWith4") !=="NA" ? true :  false}
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblIssueDate", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxIssueDate"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblExpiryDate", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxExpiryDate"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblChargesAccount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("tbxChargesAccount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblMarginAccount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("tbxMarginAccount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblCommissionAccount", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getSelectedValueFromAccountsDropdown("tbxCommissionAccount"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblMessageToBank", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxMessageToBank"), isVisible:true},
              flxRowTemplateSeparator:{isVisible:true}
             }
           ]],
          [{
            "lblTransactionHeader": {text:scope.getDataBasedOnDataMapping("beneficiaryDetails", scope.dataMapping)},
            "imgDropDown":{"src":"dropdown_collapse.png"},
            "flxDropDown":{onClick: scope.onActionClick.bind(this)},
            "flxSeparator2": { isVisible:true}
          },
           [
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblBeneficiaryName", scope.dataMapping)+":", isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxBeneficiaryName"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblBeneficiaryAddress", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxBeneficiaryAddress"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblBeneficiaryBank", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxBeneficiaryBank"), isVisible:true},
             },
             {lblReview:{text:scope.getDataBasedOnDataMapping("lblBeneficiaryBankAddress", scope.dataMapping), isVisible:true},
              lblReviewValue1:{text:scope.getFieldValue("tbxBeneficiaryBankAddress"), isVisible:true},
              flxRowTemplateSeparator:{isVisible:true}
             }
           ]],
          [{
            "lblTransactionHeader": {text:scope.getDataBasedOnDataMapping("shipmentDetails", scope.dataMapping)},
            "imgDropDown":{"src":"dropdown_collapse.png"},
            "flxDropDown":{onClick: scope.onActionClick.bind(this)},
            "flxSeparator2": { isVisible:true}
          },[
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblPlaceOfCharge", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxPlaceOfCharge"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblPortLoading", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxPortLoading"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblPortDisCharge", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxPortCharge"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblFinalDeliveryPlace", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxFinalDeliveryPlace"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblLatestShipmentDate", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxLatestShipmentDate")!== "NA" ? scope.getFormattedDate(scope.getFieldValue("tbxLatestShipmentDate")) : "NA", isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblTranshipment", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxTranshipment"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblPartialShipment", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxPartialShipment"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblIncoTerms", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxIncoTerms"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblShipmentMode", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxShipmentMode"), isVisible:true},
             flxRowTemplateSeparator:{isVisible:true}
            }
          ]],
          [ {
            "lblTransactionHeader": {text:"Document and Terms"},
            "imgDropDown":{"src":"dropdown_collapse.png"},
            "flxDropDown":{onClick: scope.onActionClick.bind(this)},
            "flxSeparator2": { isVisible:true}
          },[
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblDescriptionGoods", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxDescription"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblDocumentsRequired", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxDocumentsRequired"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblAdditionalCondition", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxAdditionalCondition"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblOtherCondition", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxOtherCondition"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblCharges", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text: scope.getFieldValue("tbxCharges"),isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblConfirmationInstruction", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxConfirmationInstruction"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblTransferable", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxTransferable"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblStandByLC", scope.dataMapping)+":", isVisible:true},
             lblReviewValue1:{text:scope.getFieldValue("tbxStandByLC"), isVisible:true},
            },
            {lblReview:{text:scope.getDataBasedOnDataMapping("lblUploadFiles", scope.dataMapping)+":", isVisible:false},
             flxReviewValues:{isVisible:false},
             flxDocuments:{isVisible:false},
             flxDocument1:{isVisible:false},
             flxDocument2:{isVisible:false},
             flxDocument3:{isVisible:false},
             lblDocumentName1:{text:"Document1.pdf", isVisible:false},
             lblDocumentName2:{text:"Document2.pdf", isVisible:false},
             lblDocumentName3:{text:"Document3.pdf", isVisible:false},
             flxRowTemplateSeparator:{isVisible:false},
             flxreviewRows: {
               height : "0dp",
               top : "0dp"
             }
            }
          ]]
        ];
        scope.view.segViewDetails.removeAll();
        scope.view.segViewDetails.setData(reviewData);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setViewDetailsData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*  Method : getContextValue 
	 *  To get the value of a field
     *  return : returns field value
      */
    getContextValue: function(fieldName){
      var scope = this;
      try{
        var fieldValue = scope.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
        return fieldValue ? fieldValue : "NA";  
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getContextValue",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*  Method : getFieldValue 
	 *  To get the value of a field
     *  return : returns field value
      */
    getFieldValue: function(fieldName,listValues,isDropdown){
      var scope = this;
      try{
        var resultValue = scope.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping, scope.collectionObj);
        if(isDropdown){
          var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue,listValues, scope.collectionObj);
          return fieldValue ? fieldValue : "NA";  
        }
        return resultValue ? resultValue : "NA";
      } catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFieldValue",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getDataBasedOnDataMapping
     * gets the corresponding data of each widget from collection
     * @return : NA
     */
    getDataBasedOnDataMapping: function(widget, dataMapping) { 
      try{
        var collectionObj = this.collectionObj;
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
                }else if (!data.indexOf("${i18n")) {
                  return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{") + 7, data.length - 2));
                } else {
                  return data;
                }
              }
            }
          }
        }
        return "";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getDataBasedOnDataMapping",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
     * @api : getDataSpecificToBreakpoint
     * gets data specified to the corresponding breakpoint
     * @return : NA
     */
    getDataSpecificToBreakpoint: function(inputJSON) {
      try{
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if(Object.keys(this.breakpoints).length !== 0) {
          for(var key in this.breakpoints) {
            if(currentBreakpoint === this.breakpoints[key]) {
              if(!kony.sdk.isNullOrUndefined(inputJSON.key)) {
                return inputJSON.key;
              } }
          } }
        if(inputJSON.hasOwnProperty("default")) {
          return inputJSON["default"];
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getDataSpecificToBreakpoint",
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
      try{
        this.collectionObj = this.collectionObj;;
        var selectedAccountID = this.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping, scope.collectionObj);
        var accountDropdownValues = this.collectionObj.Collection.Object.userAccounts;
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
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSelectedValueFromAccountsDropdown",
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
      var error = err;
    },

    /**
         * @api : onActionClick
         * Triggerd on click of dropdown in segment
         * @return : NA
         */
    onActionClick: function() {
      var scopeObj = this;
      try {
        var index = scopeObj.view.segViewDetails.selectedRowIndex;
        var sectionIndex = index[0];
        var data = scopeObj.view.segViewDetails.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (this.segViewDetailsTempData === "") {
          this.segViewDetailsTempData = JSON.parse(JSON.stringify(this.view.segViewDetails.data));
        }
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
          //selectedHeaderData["flxSeparator2"].isVisible = true;
          this.view.segViewDetails.setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          data[sectionIndex][1] = [];
          //selectedHeaderData["flxSeparator2"].isVisible = false;
          this.view.segViewDetails.setData(data);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
         * @api : onDownloadActionClick
         * Triggerd on click of download button
         * @return : NA
         */
    onDownloadActionClick: function() {
      var scopeObj = this;
      try{
        var selectedData = scopeObj.collectionObj.Collection.Object["srmsReqOrderID"];
        scopeObj.serviceParameter.Download.Criteria.srmsReqOrderID = selectedData;
        scopeObj.fetchTransactions();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onDownloadActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
      * @api : fetchTransactions
      * To get meta data and get data from object model
      * @return : NA
      */
    fetchTransactions: function() {
      var scope = this;
      try {
        //scope.businessController.getMetaData();
        scope.businessController.setProperties(this.serviceParameter, this.dataFormatting, this.breakpoints);
        scope.businessController.downloadTransactions(scope.context);
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
       * @api : setDataToPrintScreen
       * Method invoked on onclick of print button
       * @return : NA
       */
    setDataToPrintScreen: function(){
      var scope = this;
      let isSwiftEnabled = scope_configManager.swiftEnabled === 'True';
      try{
        var data = kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.Object) ? {} : scope.collectionObj.Collection.Object;
        if (!kony.sdk.isNullOrUndefined(data)) {
          data["viewDetails"] = true;
          data["isLetterOfCreditsPrint"] = true;
        }
        if (isSwiftEnabled)
          data["isSwiftFormatPrint"] = true;
	//this code is for visibility of swift codes in print UI 
        //if (!scope_configManager.swiftEnabled)
        //data["isSwiftFormatPrintWithoutCode"] = true;
        scope.navigateToPrintScreen(data);
      } 
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDataToPrintScreen",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
       * @api : onBreakpointChange
       * Method invoked on chaning break points
       * @return : NA
       */
    onBreakPointChange: function() {
      var scope = this;
      try{
        var segTemplate = scope.getSegmentTemplate();
        let currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          // Tablet screen
          scope.isTablet = true;
        } else if (currentBreakpoint > 1024 || currentBreakpoint <= 1380) {
          // Browser screen
          scope.isTablet = false;
        }
        scope.view.segViewDetails.rowTemplate = segTemplate.row;
        scope.view.segViewDetails.sectionHeaderTemplate = segTemplate.header;
        scope.render();
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onBreakPointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : getSegmentTemplate
      * This metod will return segment template for breakpoint
      * @return : {JSON}
      */
    getSegmentTemplate: function() {
      var scope = this;
      try {
        var segmentTemplate = {};
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 640) {
          segmentTemplate["row"] = "flxReviewRowMobileTemplate";
          segmentTemplate["header"] = "flxReviewHeadeMobile";
        } else {
          segmentTemplate["row"] = "flxReviewRowTemplate";
          segmentTemplate["header"] = "flxReviewHeader";
        }
        return segmentTemplate;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getSegmentTemplate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getFormattedDate
     * gets date string for formatting
     * @return : formattedDate
     */
    getFormattedDate : function(dateString){
      var scope = this;
      try {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var formatDate = date.getDate();

        if (formatDate < 10) {
          formatDate = '0' + formatDate;
        }
        if (month < 10) {
          month = '0' + month;
        }
        return(month+'/'+formatDate+'/'+year);

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getFormattedDate",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /**
      * @api : animateFlex
      * This metod animate the Subheader of the Report screen for Mobile
      * @return : {JSON}
      */
    animateFlex: function(){
      var scope = this;
      var imageName = scope.view.imgRightIcon.src;
      var deviceWidth = (kony.os.deviceInfo().deviceWidth/100)*93.75;
      var flexLeft ="";
      if(imageName === "right_arrow.png"){
        scope.view.imgRightIcon.src = "arrow_left.png";
        flexLeft = -(366 - deviceWidth);
      }
      else{
        scope.view.imgRightIcon.src = "right_arrow.png";
        flexLeft = 0;
      }
      var animDefinition = {
        "100": {
          "left": flexLeft,
          "top": "0dp"
        }
      };
      var animDef = kony.ui.createAnimation(animDefinition);
      function animConfig() {
        var config = {
          "duration": 1,
          "iterationCount": 1,
          "delay": 0,
          "fillMode": kony.anim.FILL_MODE_BOTH
        };
        return config;
      }
      scope.view.flxContentSwitchHeader.animate(animDef,animConfig(),null);
    },

    renderButtons: function() {
      var scope = this;
      scope.view.flxSwiftAndAdvices.setVisibility(true);
      scope.view.lblSwiftAndAdvices.text = kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices") + '(' + (this.paymentAdvices.length + this.swiftMessages.length) + ')';
    },

    renderSwiftAndAdvices: function() {
      var scope = this;
      scope.view.segSwiftAndAdvices.widgetDataMap = {
        'lblListValue' : 'lblListValue',
        'flxListDropdown': 'flxListDropdown'
      };
      if(scope.view.flxSwiftAndAdvicesInfo.isVisible) {
        scope.view.flxSwiftAndAdvicesInfo.setVisibility(false)
      } else {
        this.populateSwiftAndAdvices();
      }
    },

    populateSwiftAndAdvices: function() {
      var scope = this;
      var data = [];
      var response = ViewDetailsStore.getState();
      scope.view.flxSwiftAndAdvicesInfo.setVisibility(true)
      let paymentAdvices = response.Collection.Object.PaymentAdvices;
      let swiftMessages = response.Collection.Object.SwiftMessages;
      let paymentAdvicesMasterData = [];
      let swiftMessagesMasterData = [];

      paymentAdvices.map(item => {
        paymentAdvicesMasterData.push({
          flxListDropdown: {
            cursorType: 'pointer',
            onClick: scope.renderPopup.bind(scope, item)
          },
          lblListValue: kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice") + ' (' + CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')'
        });
      });

      swiftMessages.map(item => {
        swiftMessagesMasterData.push({
          flxListDropdown: {
            cursorType: 'pointer',
            onClick: scope.renderPopup.bind(scope, item)
          },
          lblListValue: 'SWIFT MT ### - Advice of...' + ' (' + CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')'
        });
      });

      data = [
        ...paymentAdvicesMasterData,
        ...swiftMessagesMasterData,
      ];
      scope.view.segSwiftAndAdvices.setData(data);
    },

    renderPopup: function(record) {
      this.view.flxSwiftAndAdvicesInfo.setVisibility(false);
        let payload = {
          fileName: record.fileName,
          fileId: record.fileId,
        };
      this.presenter.getFileResponse(payload, 'frmImportLCDetails', record);
    },
    renderPrintAndDownload: function () {
      var scope = this;
      scope.view.flxVerticalEllipsisDropdown.setVisibility(!scope.view.flxVerticalEllipsisDropdown.isVisible);
      try {
        scope.view.segVerticalDropdownEllipsis.widgetDataMap = {
          flxLCAccountType: 'flxLCAccountType',
          imgLCCheckbox: 'imgLCCheckbox',
          lblLCCheckbox: 'lblLCCheckbox',
          lblLCAccountType: 'lblLCAccountType'
        };

        let masterData = [];
        scope.presenter.contextualMenuData.map(item => {
          masterData.push({
            flxLCAccountType: {
              bottom: '0dp',
              height: '40dp',
              onClick: scope.onContextualMenuRowClick.bind(scope, item.id),
              cursorType: 'pointer',
              isVisible: scope.contextualItemCondition(item.id)
            },
            imgLCCheckbox: {
              isVisible: true,
              src: item.src
            },
            lblLCCheckbox: {
              isVisible: false
            },
            lblLCAccountType: item.text
          });
        });
        scope.view.segVerticalDropdownEllipsis.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderPrintAndDownload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    contextualItemCondition: function (id) {
      var scope = this;
      try {
        if (id == 'raiseQuery') {
          if (scope.collectionObj.Collection.Object.status == 'Approved') {
            return true;
          } else {
            return false;
          }
        }
        if (scope.isTablet && id == 'print') {
          return false;
        }
        return true;
      } catch (err) {
        var errorObj = {
          "method": "contextualItemCondition",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onContextualMenuRowClick: function (id) {
      var scope = this;
      try {
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'download') {
          scope.onDownloadActionClick();
        } else if (id == 'print') {
          scope.setDataToPrintScreen();
        } else if (id == 'raiseQuery') {
          let params = scope.collectionObj.Collection.Object;
          let queryObj = {};
          queryObj.descriptionObj = {};
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${params.srmsReqOrderID}`;
          params.lcAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = params.lcAmount);
          params.paymentTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms")] = params.paymentTerms);
          params.incoTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IncoTerms")] = params.incoTerms);
          params.expiryDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate")] = params.expiryDate);
          params.beneficiaryName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("kony.i18n.common.beneficiary")] = params.beneficiaryName);
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

  };
});