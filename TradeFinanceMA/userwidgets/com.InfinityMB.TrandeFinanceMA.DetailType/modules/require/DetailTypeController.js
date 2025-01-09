define(['./DetailTypeBusinessController', './DetailTypeStore'], function (BusinessController, DetailTypeStore) {
  let fileName = '';
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataMapping = {};
      DetailTypeStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.store = DetailTypeStore;
      this.collectionObj = DetailTypeStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.segLCDetailsNewTempData = '';
      this.frmType = "ImportLC";
    },

    initGettersSetters: function () {
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
    },

    /**
  	  * Method : onDownloadAction
      * Performs the download functionality
      * @return :NA
      */
    onDownloadAction: function (id, data) {
      var scope = this;
      try {
        if (scope.frmType === "ImportLC") {
          scope.serviceParameters.generateLCSummary.Service = "TradeFinance";
          scope.serviceParameters.generateLCSummary.Object = "LCSummary";
          scope.serviceParameters.generateLCSummary.Verb = "generate";
          scope.serviceParameters.generateLCSummary.Criteria.srmsReqOrderID = scope.collectionObj.Collection.objName.srmsReqOrderID;
          fileName = "Import Letter Of Credit";
          scope.businessController.setProperties(scope.serviceParameters.generateLCSummary);
        }
        else if (scope.frmType === "ImportDrawings") {
          scope.serviceParameters.generateLCImportDrawingSummary.Service = "TradeFinance";
          scope.serviceParameters.generateLCImportDrawingSummary.Object = "LCImportDrawingSummary";
          scope.serviceParameters.generateLCImportDrawingSummary.Verb = "generate";
          scope.serviceParameters.generateLCImportDrawingSummary.Criteria.drawingsSrmsReqOrderID = scope.collectionObj.Collection.drawings.drawingsSrmsReqOrderID;
          fileName = "Import Drawing";
          scope.businessController.setProperties(scope.serviceParameters.generateLCImportDrawingSummary);
        }
        scope.businessController.downloadTransactions(scope.context, fileName);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "onDownloadAction",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : checkCurrentFlx
      * checks the current flex visible in the component
  	  * @return : Current flex screens stack of the component
  	  */
    checkCurrentFlx: function () {
      var scope = this;
      try {
        var CurrentFlexName = scope.context.screensName.flexName[scope.context.screensName.flexName.length - 1];
        var currentFormName = scope.context.screensName.frmType[scope.context.screensName.frmType.length - 1];
        if (scope.frmType === "ExportLC") {
          if (CurrentFlexName === "flxDetailTypeDisplayDetails" && currentFormName === "ExportLC") {
            scope.context.screensName.flexName.pop();
            scope.context.screensName.frmType.pop();
          }
          return {
            checkValue: true,
            screensName: scope.context.screensName
          };
        }
        else if (scope.frmType === "ImportDrawings") {
          if (scope.view.flxDetailTypeDisplayDetails.isVisible) {
            if (CurrentFlexName === "flxDetailTypeDisplayDetails" && currentFormName === "ImportDrawings") {
              scope.context.screensName.flexName.pop();
              scope.context.screensName.frmType.pop();
            }
            return {
              checkValue: true,
              screensName: scope.context.screensName
            };
          }
          else
            return {
              checkValue: false,
              screensName: scope.context.screensName
            };
        }
        else if (scope.frmType === "ImportLC") {
          if (CurrentFlexName === scope.context.screensName.flexName[scope.context.screensName.flexName.length - 2] && currentFormName !== scope.context.screensName.frmType[scope.context.screensName.frmType.length - 2]) {
            return {
              checkValue: false,
              screensName: scope.context.screensName
            };
          }
          else {
            if (scope.view.flxDetailTypeSelectDetails.isVisible) {
              if (CurrentFlexName === "flxDetailTypeSelectDetails" && currentFormName === "ImportLC") {
                scope.context.screensName.flexName.pop();
                scope.context.screensName.frmType.pop();
              }
              return {
                checkValue: true,
                screensName: scope.context.screensName
              };
            }
            else if (scope.view.flxDetailTypeDisplayDetails.isVisible)
              return {
                checkValue: false,
                screensName: scope.context.screensName
              };
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "checkCurrentFlx",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : goBack
      * Navigates to previosuly visible flex
  	  * @return : NA
  	  */
    goBack: function () {
      var scope = this;
      try {
        var CurrentFlexName = scope.context.screensName.flexName[scope.context.screensName.flexName.length - 1];
        var currentFormName = scope.context.screensName.frmType[scope.context.screensName.frmType.length - 1];
        if (scope.frmType === "ImportDrawings") {
          scope.changeFlexVisibility("flxDetailTypeSwiftDetails", "flxDetailTypeDisplayDetails");
          scope.flxIOSFooterVisibility(false);
        }
        else {
          if (CurrentFlexName === scope.context.screensName.flexName[scope.context.screensName.flexName.length - 2])
            scope.navigationForLCDetails("backward");
          else {
            scope.view.flxDetailTypeDisplayDetails.setVisibility(false);
            scope.view.flxDetailTypeSelectDetails.setVisibility(true);
            scope.hideDownloadBtn();
            scope.flxIOSFooterVisibility(true);
            if (CurrentFlexName === "flxDetailTypeDisplayDetails" && currentFormName === "ImportLC") {
              scope.context.screensName.flexName.pop();
              scope.context.screensName.frmType.pop();
            }
          }
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "goBack",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : navigationForLCDetails
      * Navigates from Drawing view details to LC view Details
  	  * @return : NA
  	  */
    navigationForLCDetails: function (navigationType) {
      var scope = this;
      try {
        scope.segLCDetailsNewTempData = "";
        if (navigationType === "forward") {
          scope.frmType = "ImportLC";
          scope.flexName = "flxDetailTypeDisplayDetails";
          scope.context.screensName.flexName.push("flxDetailTypeDisplayDetails");
          scope.context.screensName.frmType.push("ImportLC");
          scope.serviceParameters.getLetterOfCreditsById.Service = "TradeFinance";
          scope.serviceParameters.getLetterOfCreditsById.Object = "LetterOfCredit";
          scope.serviceParameters.getLetterOfCreditsById.Verb = "getLetterOfCreditsById";
          scope.serviceParameters.getLetterOfCreditsById.Criteria.srmsReqOrderID = scope.getFieldValue("lcSrmsReqOrderID");
          scope.businessController.setProperties(scope.serviceParameters.getLetterOfCreditsById, scope.context);
          scope.businessController.fetchTransactions();
          scope.view.flxDocumentAndStatusHeader.setVisibility(false);
          scope.view.flxDocumentAndStatusBody.setVisibility(false);
          scope.view.flxPaymentDetailsHeader.setVisibility(false);
          scope.view.SegPaymentDetails.setVisibility(false);
          scope.view.segSwiftMsgsAdvices.setVisibility(false);
          scope.view.flxSwiftsMsgsHeader.setVisibility(false);
          scope.changeHeaderText(scope.businessController.getDataBasedOnDataMapping("importLCDetails", scope.dataMapping));
        }
        else {
          scope.frmType = "ImportDrawings";
          scope.flexName = "flxDetailTypeDisplayDetails";
          scope.context.screensName.flexName.pop();
          scope.context.screensName.frmType.pop();
          scope.view.imgDocumentAndStatusHeader.src = "arrowdown.png";
          scope.view.imgPaymentDetailsHeader.src = "arrowdown.png";   
          scope.expandCollapseForDrawingsSegment("SegPaymentDetails", "imgPaymentDetailsHeader");
          scope.expandCollapseForDrawingsSegment("flxDocumentAndStatusBody", "imgDocumentAndStatusHeader");
          scope.view.lblLCReference.text = scope.businessController.getDataBasedOnDataMapping("drawingreference", scope.dataMapping);
          scope.view.lblLCReferenceNum.text = scope.getFieldValue("drawingreferenecenumber");
          scope.view.flxPaymentDetailsHeader.setVisibility(true);
          if(scope.getFieldValue("PDpaymentstatus").toUpperCase() === ("Settled").toUpperCase() && scope.collectionObj.Collection.swiftsAndAdvices && scope.collectionObj.Collection.swiftsAndAdvices.length){
            scope.view.imgLCIssuanceHeader.src = "arrowdown.png";  
            scope.expandCollapseForDrawingsSegment("segSwiftMsgsAdvices", "imgLCIssuanceHeader");
            scope.view.flxSwiftsMsgsHeader.setVisibility(true);
          }         
          scope.view.flxDocumentAndStatusHeader.setVisibility(true);
          scope.setLCDetailsStatus();
          scope.setLCDetailsData();
          scope.changeHeaderText(scope.businessController.getDataBasedOnDataMapping("importDrawing", scope.dataMapping));
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "navigationForLCDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : postShow
      * Gets invoked initially after rendering of UI
  	  * @return : NA
  	  */
    postShow: function () {
      var scope = this;
      try {
        scope.view.segLCDetailsNew.widgetDataMap = {
          "flxLCIssuanceHeaderTemplate": "",
          "flxTopSeperator": "flxTopSeperator",
          "lblLCIssuanceHeaderTemplate": "lblLCIssuanceHeaderTemplate",
          "flxImgLCIsuanceHeader": "flxImgLCIsuanceHeader",
          "imgLCIssuanceHeader": "imgLCIssuanceHeader",
          "flxGradient": "flxGradient",
          "flxBottomSeperator": "flxBottomSeperator",
          "flxLCIssuanceRowTemplate": "flxLCIssuanceRowTemplate",
          "flxLCIssuanceRow": "flxLCIssuanceRow",
          "lblRowValue1": "lblRowValue1",
          "lblRowValue2": "lblRowValue2",
          "lblRowValue3": "lblRowValue3",
          "lblRowValue4": "lblRowValue4",
          "flxRowDocLbl": "flxRowDocLbl",
          "flxRowDocLbl1": "flxRowDocLbl1",
          "flxRowDocLbl2": "flxRowDocLbl2",
          "flxRowDocLbl3": "flxRowDocLbl3",
          "lblLCIssuanceRow": "lblLCIssuanceRow",
          "lblRowDoc1": "lblRowDoc1",
          "lblRowDoc2": "lblRowDoc2",
          "lblRowDoc3": "lblRowDoc3",
          "flxRowImg1": "flxRowImg1",
          "flxRowImg2": "flxRowImg2",
          "flxRowImg3": "flxRowImg3",
          "flxInnerRowImg1": "flxInnerRowImg1",
          "flxInnerRowImg2": "flxInnerRowImg2",
          "flxInnerRowImg3": "flxInnerRowImg3",
          "imgdownload1": "imgdownload1",
          "imgdownload2": "imgdownload2",
          "imgdownload3": "imgdownload3",
          "flxRowValueLbl": "flxRowValueLbl",
          "flxLCIssuanceRowSeperator": "flxLCIssuanceRowSeperator",
          "flxViewLCDetails": "flxViewLCDetails",
          "lblViewLCDetails": "lblViewLCDetails"
        };
        scope.importLCViewPermission = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
        scope.importDrawingsViewPermission = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_DRAWINGS_VIEW");
        if (scope.frmType === "ImportDrawings")
          scope.businessController.storeFetchedData(scope.context, "drawings");
        else
          scope.businessController.storeFetchedData(scope.context, "objName");
        scope.initButtonActions();
        scope.view.flxDocumentAndStatusHeader.setVisibility(false);
        scope.view.flxDocumentAndStatusBody.setVisibility(false);
        scope.view.flxPaymentDetailsHeader.setVisibility(false);
        scope.view.SegPaymentDetails.setVisibility(false);
        scope.view.segSwiftMsgsAdvices.setVisibility(false);
        scope.view.flxSwiftsMsgsHeader.setVisibility(false);
        if (scope.frmType === "ImportLC" || scope.frmType === undefined) {
          if(scope.getFieldValue("lblStatus") === "Self Approved"){
            scope.serviceParameters.getImportLCDrawings.Service = "TradeFinance";
            scope.serviceParameters.getImportLCDrawings.Object = "LCImportDrawing";
            scope.serviceParameters.getImportLCDrawings.Verb = "getImportLCDrawings";
            scope.serviceParameters.getImportLCDrawings.Criteria.filterByValue = scope.context.letterOfCredits.srmsReqOrderID;
            scope.serviceParameters.getImportLCDrawings.Criteria.filterByParam = "lcSrmsReqOrderID";
            scope.businessController.setProperties(scope.serviceParameters.getImportLCDrawings, scope.context);
            scope.businessController.fetchDrawingsCount("drawingsCount");
          }
          scope.view.flxDetailTypeSelectDetails.flxSelectDetailsContent.flxSelectDetailsContent1.onClick = scope.flexVisibility;
          scope.view.flxDetailTypeSelectDetails.flxSelectDetailsContent.flxSelectDetailsContent2.onClick = scope.drawingsNavigation;
          scope.flexVisibilityImportLC();
        }
        else if (scope.frmType === "ExportLC") 
          scope.flexVisibilityExportLC();
        else if (scope.frmType === "ImportDrawings") {
          scope.setWidgetDataMapForDrawingsSegments();
          scope.serviceParameters.getImportLCDrawingById.Service = "TradeFinance";
          scope.serviceParameters.getImportLCDrawingById.Object = "LCImportDrawing";
          scope.serviceParameters.getImportLCDrawingById.Verb = "getImportLCDrawingById";
          scope.serviceParameters.getImportLCDrawingById.Criteria.drawingsSrmsReqOrderID = scope.context.letterOfCredits.drawingsSrmsReqOrderID;
          scope.businessController.setProperties(scope.serviceParameters.getImportLCDrawingById, scope.context);
          scope.businessController.fetchDrawingsCount("swiftsAndAdvices");
          scope.view.lblLCReference.text = scope.businessController.getDataBasedOnDataMapping("drawingreference", scope.dataMapping);
          scope.view.lblLCReferenceNum.text = scope.getFieldValue("drawingreferenecenumber");
          scope.setDataforDocumentAndStatus();
          scope.setDataforPaymentDetails();
          scope.view.flxDocumentAndStatusHeader.setVisibility(true);
          scope.view.flxDocumentAndStatusBody.setVisibility(true);
          scope.view.flxPaymentDetailsHeader.setVisibility(true);
          scope.view.SegPaymentDetails.setVisibility(true);
          scope.view.segSwiftMsgsAdvices.setVisibility(true);
          scope.view.flxSwiftsMsgsHeader.setVisibility(true);
          scope.view.imgDocumentAndStatusHeader.src = "arrowdown.png";
          scope.view.imgPaymentDetailsHeader.src = "arrowdown.png";
          scope.view.imgLCIssuanceHeader.src = "arrowdown.png";
          scope.expandCollapseForDrawingsSegment("segSwiftMsgsAdvices", "imgLCIssuanceHeader");
          scope.expandCollapseForDrawingsSegment("SegPaymentDetails", "imgPaymentDetailsHeader");
          scope.expandCollapseForDrawingsSegment("flxDocumentAndStatusBody", "imgDocumentAndStatusHeader");
          scope.flexVisibilityImportDrawings();
        }
      } catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "postShow",	
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : setWidgetDataMapForDrawingsSegments
      * Widget data map for drawings segment
  	  * @return : NA
  	  */
    setWidgetDataMapForDrawingsSegments:function(){
      var scope = this;
      try{
        scope.view.SegPaymentDetails.widgetDataMap = {
          "flxLCIssuanceRowTemplate": "flxLCIssuanceRowTemplate",
          "flxLCIssuanceRow": "flxLCIssuanceRow",
          "lblLCIssuanceRow": "lblLCIssuanceRow",
          "lblRowValue1": "lblRowValue1",
          "flxLCIssuanceRowSeperator": "flxLCIssuanceRowSeperator"
        };

        scope.view.segSwiftMsgsAdvices.widgetDataMap = {
          "lblBeneficiaryName": "lblBeneficiaryName",
          "lblSwiftNumber": "lblSwiftNumber",
          "lblSwiftDate": "lblSwiftDate",
          "imgSwiftAction": "imgSwiftAction"
        };

        scope.view.segSwiftDetails.widgetDataMap = {
          "flxLCIssuanceRowTemplate": "flxLCIssuanceRowTemplate",
          "flxLCIssuanceRow": "flxLCIssuanceRow",
          "lblLCIssuanceRow": "lblLCIssuanceRow",
          "lblRowValue1": "lblRowValue1",
          "flxLCIssuanceRowSeperator": "flxLCIssuanceRowSeperator"
        };

        scope.view.segDocumentNames.widgetDataMap = {
          "lblDocumentDetails": "lblDocumentDetails",
          "flxDocumentAndDescrepanciesTemplate": "flxDocumentAndDescrepanciesTemplate"
        };

        scope.view.segDiscrepanies.widgetDataMap = {
          "lblDocumentDetails": "lblDocumentDetails",
          "flxDocumentAndDescrepanciesTemplate": "flxDocumentAndDescrepanciesTemplate"
        };
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setWidgetDataMapForDrawingsSegments",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * Method : turnOffFlexVisibility
      * Turns off the visibility of flex
  	  * @return : NA
  	  */
    turnOffFlexVisibility:function(){
      var scope = this;
      try{
        scope.view.flxDetailTypeSelectDetails.setVisibility(false);
        scope.view.flxDetailTypeDisplayDetails.setVisibility(false);
        scope.view.flxDetailTypeSwiftDetails.setVisibility(false);
        scope.view.flxSelectDetailsContent2.setVisibility(false);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "turnOffFlexVisibility",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Method : initButtonActions
      * Actions items for widgets
      * @return : NA
      */
    initButtonActions: function () {
      var scope = this;
      try {
        scope.view.flxSwiftsMsgsHeader.onClick = scope.expandCollapseForDrawingsSegment.bind(this, "segSwiftMsgsAdvices", "imgLCIssuanceHeader");
        scope.view.flxImgPaymentDetailsHeader.onClick = scope.expandCollapseForDrawingsSegment.bind(this, "SegPaymentDetails", "imgPaymentDetailsHeader");
        scope.view.flxImgDocumentAndStatusHeader.onClick = scope.expandCollapseForDrawingsSegment.bind(this, "flxDocumentAndStatusBody", "imgDocumentAndStatusHeader");
        scope.view.segSwiftMsgsAdvices.onRowClick = scope.swiftsAndMessagesOnRowClick;
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "initButtonActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Method : drawingsNavigation
      * Naviation from flxDetailTypeSelectDetails(flex) to ImportLC(form) -> ImportLCViewDetails(flex)
      * @return : NA
      */
    drawingsNavigation: function () {
      var scope = this;
      try {
        scope.context["DrawingsData"] = scope.collectionObj.Collection.drawingsCount;
        scope.formNavigation(scope.context);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "drawingsNavigation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
  	  * @api : render
      * Gets invoked when collection gets updated
  	  * @return : NA
  	  */
    render: function () {
      var scope = this;
      try {
        scope.collectionObj = DetailTypeStore.getState();
        scope.setLCDetailsData();
        scope.setLCDetailsStatus();
        if(scope.frmType === "ImportLC"){
          scope.setLCDetailsDataExtra();
          if(scope.importLCViewPermission && scope.importDrawingsViewPermission){
            if (scope.collectionObj.Collection.drawingsCount) {
              if(scope.getFieldValue("lblStatus").toUpperCase() === ("Self Approved").toUpperCase()){
                scope.view.lblSelectDetailsContent2.text = scope.businessController.getDataBasedOnDataMapping("importDrawing", scope.dataMapping) + ` (${scope.collectionObj.Collection.drawingsCount.length})`;
                scope.view.flxSelectDetailsContent2.setVisibility(true);
                scope.view.flxSelectDetailsContent1.setVisibility(true);
              }
            }
            else{
              scope.view.flxSelectDetailsContent2.setVisibility(false);
              scope.view.flxSelectDetailsContent1.setVisibility(true);
            }
          }
          else
            scope.view.flxSelectDetailsContent2.setVisibility(false);
        }
        if(scope.getFieldValue("PDpaymentstatus").toUpperCase() === ("Settled").toUpperCase() && scope.frmType === "ImportDrawings")
          scope.setDataforSwiftsAndDetails();
        else{
          scope.view.segSwiftMsgsAdvices.setVisibility(false);
          scope.view.flxSwiftsMsgsHeader.setVisibility(false);
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "render",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setContext
      * Method to set the context value from Form
      * @return : NA
      */
    setContext: function (context, frmType) {
      var scope = this;
      try {
        scope.segLCDetailsNewTempData = "";
        scope.context = context;
        scope.frmType = frmType;
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Method : setLCDetailsDataExtra
      * Method to set i18n keys to additional labels
      * @return : NA
      */
    setLCDetailsDataExtra: function () {
      var scope = this;
      try {
        scope.view.lblSelectDetailsHeader.text = scope.businessController.getDataBasedOnDataMapping("selectDetailType", scope.dataMapping);
        scope.view.lblSelectDetailsContent1.text = scope.businessController.getDataBasedOnDataMapping("lcDetails", scope.dataMapping);
        scope.view.lblSelectDetailsContent2.text = scope.businessController.getDataBasedOnDataMapping("drawingDetails", scope.dataMapping);
        scope.view.lblSelectDetailsContent3.text = scope.businessController.getDataBasedOnDataMapping("swiftsAndAdvices", scope.dataMapping);
        scope.view.lblSelectDetailsContent4.text = scope.businessController.getDataBasedOnDataMapping("amendments", scope.dataMapping);
        scope.view.lblLCReference.text = scope.businessController.getDataBasedOnDataMapping("lcReference", scope.dataMapping);
        scope.view.lblLCReferenceNum.text = scope.getFieldValue("valueReferenceNumber");
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setLCDetailsDataExtra",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Method : setLCDetailsStatus
      * Method to assign the Status value
      * @return : NA
      */
    setLCDetailsStatus: function () {
      var scope = this;
      try {
        if (scope.frmType === "ImportDrawings") {
          scope.view.imgPending.setVisibility(true);
          if (scope.getFieldValue("drawingsStatus").toUpperCase() === ("Completed").toUpperCase()) {
            scope.view.lblStatus.text = "Completed";
            scope.view.imgPending.setVisibility(false);
          }
          else if (scope.getFieldValue("drawingsStatus").toUpperCase() === ("New").toUpperCase()) {
            scope.view.lblStatus.text = "New";
            scope.view.imgPending.src = "grey.png";
          }
          else if (scope.getFieldValue("drawingsStatus").toUpperCase() === ("Pending With Bank").toUpperCase()) {
            scope.view.lblStatus.text = "Pending with Bank";
            scope.view.imgPending.src = "orange.png";
          }
          else{
            scope.view.lblStatus.text = "NA";
            scope.view.imgPending.setVisibility(false);         
          }
        }
        else {
          scope.view.imgPending.setVisibility(true);
          if (scope.getFieldValue("lblStatus").toUpperCase() === ("Self Approved").toUpperCase()) {
            scope.view.lblStatus.text = "Self Approved";
            scope.view.imgPending.src = "selectedtick.png";
          }
          else if (scope.getFieldValue("lblStatus").toUpperCase() === ("Deleted").toUpperCase()) {
            scope.view.lblStatus.text = "Deleted";
            scope.view.imgPending.src = "rejected.png";
          }
          else if (scope.getFieldValue("lblStatus").toUpperCase() === ("Draft").toUpperCase()) {
            scope.view.lblStatus.text = "Draft";
            scope.view.imgPending.src = "orange.png";
          }
          else if (scope.getFieldValue("lblStatus")) {
            scope.view.lblStatus.text = "NA";
            scope.view.imgPending.src = "rejected.png";
          }
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setLCDetailsStatus",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Method : setLCDetailsData
      * Method to set user entered data in segAcknowledgeDetails segment
      * @return : NA
      */
    setLCDetailsData: function () {
      var scope = this;
      try {
        if (scope.frmType === "ImportLC") {
          var reviewDataImportLC = [
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("creditDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("referenceNumber", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueReferenceNumber"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("creditAmount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueAmount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("tolerencePercentage", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueTolerencePercentage") !== "NA" ? scope.getFieldValue("valueTolerencePercentage") + "%" : "NA", isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("maximumCreditAmount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueMaximumCreditAmount"), isVisible: true }
                },

                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("additionalPayableAmount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valuePayableAmount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("paymentTerms", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblValuePaymentTerms", scope.dataMapping["PaymentTermsDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("availableWith", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueAvailable1"), isVisible: true },
                  lblRowValue2: { text: scope.getFieldValue("valueAvailable2"), isVisible: scope.getFieldValue("tbxAvailable2") !== "NA" ? true : false },
                  lblRowValue3: { text: scope.getFieldValue("valueAvailable3"), isVisible: scope.getFieldValue("tbxAvailable3") !== "NA" ? true : false }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueIssueDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueExpiryDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("chargesAccount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.formatAccounts("valueSelectedChargeValue"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("marginAccount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.formatAccounts("valueCommissionAccount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("commissionAccount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.formatAccounts("valueMarginAccount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messageToBank", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueMessage"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("beneficiaryDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("beneficiaryName", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBeneficiaryName"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("beneficiaryAddress", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBeneficiaryAddress1"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("bankName", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBankName"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("bankAddress", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBankAddress1"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("shipmentDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("placeOfCharge", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valuePlaceOfCharge"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("portLoading", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valuePortLoading"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("portCharge", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valuePortCharge"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("finalDeliveryPlace", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueFinalDeliveryPlace"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("shipmentDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueshipmentDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("transhipment", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedTranshipment", scope.dataMapping["TranshipmentDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("partialShipment", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedPartialShipment", scope.dataMapping["PartialShipmentsDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("incoTerms", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedIncoTerms", scope.dataMapping["IncoTermsDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("shipmentMode", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedShipmentMode", scope.dataMapping["ModeOfShipmentDropdown"], true), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("documentsTerms", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("description", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueDescription"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("requiredDocuments", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueRequiredDocuments"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("additionalCondition", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueAdditionalCondition"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("otherCondition", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueOtherCondition"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("charges", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueCharges"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("confirmationInstruction", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedInstruction", scope.dataMapping["ConfirmationInstructionsDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("transferable", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedTransferable", scope.dataMapping["TransferableDropdown"], true), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("standByLC", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("lblSelectedStandByLC", scope.dataMapping["StandByLCDropdown"], true), isVisible: true }
                }
              ]
            ],
          ];
          scope.view.segLCDetailsNew.setData(reviewDataImportLC);
        }
        else if (scope.frmType === "ExportLC") {
          var reviewDataExportLC = [
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("lcType", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("lcReferenceNumber", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueLCReferenceNum"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("lcType", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueLCtype"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("applicant", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueApplicantDetails"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("applicantAddress", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueApplicantAddress"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("issuingBank", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueIssuingbankName"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("issuingBankAddress", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueIssuingBankAddress"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueIssueDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueExpiryDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("LCAmount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueLCAmount"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("beneficiaryDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("name", scope.dataMapping), isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBeneficiaryName"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("address", scope.dataMapping), isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueBeneficiaryAddress"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("goodAndShipmentDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("goodsDescription", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueDescriptionOfGoods"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("additionalConditions", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueAdditionalConditions"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("confirmInstructions", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueConfirmationInstruction"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("latestShipmentDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueLatestShippingDate"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("documentsAndTerms", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("documentName", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueDocumentName"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("swiftMessageAndAdvisesDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messageType", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueMessageType"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("deliveredToFrom", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueDeliveredToFrom"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("date", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueDeliveredDate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messageCategory", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("valueMessageCategory"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ]
          ];
          scope.view.segLCDetailsNew.setData(reviewDataExportLC);
        }
        else if (scope.frmType === "ImportDrawings") {
          var reviewDataImportDrawings = [
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("lcsummary", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: false },
                imgLCIssuanceHeader: { isVisible: false },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true },
                flxViewLCDetails: { isVisible: true, onClick: scope.navigationForLCDetails.bind(this, "forward") },
                lblViewLCDetails: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("beneficiary", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingbeneficiaryname"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("lcReferenceNumber", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawinglcreferencenumber"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("creditAmount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingcreditamount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingissuedate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingexpirydate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("paymentTerms", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingpaymentterms"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
            [
              {
                lblLCIssuanceHeaderTemplate: { text: scope.businessController.getDataBasedOnDataMapping("drawingDetails", scope.dataMapping) },
                flxImgLCIsuanceHeader: { isVisible: true },
                imgLCIssuanceHeader: { isVisible: true },
                flxGradient: { isVisible: true },
                flxBottomSeperator: { isVisible: true }
              },
              [
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("drawingamount", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingsamount"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("creationdate", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingscreationdate"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("documentreceived", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingsdocumentreceived"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("presenter", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingspresenter"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("presenterreference", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingspresenterreference"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("forwardcontract", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingsforwardcontract"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("shippingguaranteereference", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingsshippingguaranteereference"), isVisible: true }
                },
                {
                  lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messagefrombank", scope.dataMapping) + ":", isVisible: true },
                  lblRowValue1: { text: scope.getFieldValue("drawingsmessagefrombank"), isVisible: true },
                  flxLCIssuanceRowSeperator: { isVisible: false }
                }
              ]
            ],
          ];
          scope.view.segLCDetailsNew.setData(reviewDataImportDrawings);
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setLCDetailsData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : getFieldValue 
   	  * To get the value of a field
      * return : returns field value
      */
    getFieldValue: function (fieldName, listValues, isDropdown) {
      var scope = this;
      try {
        var resultValue = scope.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
        if (isDropdown) {
          var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue, listValues);
          return fieldValue ? fieldValue : "NA";
        }
        return resultValue ? resultValue : "NA";
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "getFieldValue",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : expandCollapseForDrawingsSegment 
   	  * Expand - collapse functionality for swifts and advice segment
      * return : NA
      */
    expandCollapseForDrawingsSegment: function (widgetName, imgName) {
      var scope = this;
      try {
        if (scope.view[imgName].src === "arrowdown.png") {
          scope.view[imgName].src = "arrowup.png";
          scope.view[widgetName].setVisibility(true);
          if (widgetName === "segSwiftMsgsAdvices") {
            scope.view.flxGradient.setVisibility(true);
            scope.view.flxBottomSeperator.setVisibility(true);
          }
          else if (widgetName === "SegPaymentDetails") {
            scope.view.flxPaymentDetailsGradient.setVisibility(true);
            scope.view.flxPaymentDetailsBottomSeparator.setVisibility(true);
          }
          else if (widgetName === "flxDocumentAndStatusBody") {
            scope.view.flxDocumentAndStatusGradient.setVisibility(true);
            scope.view.flxDocumentAndStatusBottomSeparator.setVisibility(true);
          }
        }
        else {
          scope.view[imgName].src = "arrowdown.png";
          scope.view[widgetName].setVisibility(false);
          if (widgetName === "segSwiftMsgsAdvices") {
            scope.view.flxGradient.setVisibility(false);
            scope.view.flxBottomSeperator.setVisibility(false);
          }
          else if (widgetName === "SegPaymentDetails") {
            scope.view.flxPaymentDetailsGradient.setVisibility(false);
            scope.view.flxPaymentDetailsBottomSeparator.setVisibility(false);
          }
          else if (widgetName === "flxDocumentAndStatusBody") {
            scope.view.flxDocumentAndStatusGradient.setVisibility(false);
            scope.view.flxDocumentAndStatusBottomSeparator.setVisibility(false);
          }
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "expandCollapseForDrawingsSegment",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : swiftsAndMessagesOnRowClick 
   	  * on Row click for swifts And Messages segment
      * return : NA
      */
    swiftsAndMessagesOnRowClick: function () {
      var scope = this;
      try {
        scope.view.segSwiftDetails.removeAll();
        var selectedRowIndex = scope.view.segSwiftMsgsAdvices.selectedRowIndex,swiftsAndDetailsData;
        var selectedData = scope.collectionObj.Collection.swiftsAndAdvices[selectedRowIndex[1]];
        scope.view.flxDetailTypeDisplayDetails.setVisibility(false);
        scope.view.flxDetailTypeSwiftDetails.setVisibility(true);
        swiftsAndDetailsData = [
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("beneficiary", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: selectedData.beneficiaryName ? selectedData.beneficiaryName : "NA", isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messageType", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: selectedData.swiftMessageType ? selectedData.swiftMessageType : "NA", isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messagecategory", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: selectedData.swiftCategory ? selectedData.swiftCategory : "NA" , isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("date", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: selectedData.swiftDate ? selectedData.swiftDate :"NA" , isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("messagefrombank", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: selectedData.swiftMessage ? selectedData.swiftMessage :"NA" , isVisible: true }
          },
        ];
        scope.view.segSwiftDetails.setData(swiftsAndDetailsData);
        scope.context.screensName.flexName.push("flxDetailTypeSwiftDetails");
        scope.context.screensName.frmType.push("ImportDrawings");
        scope.hideDownloadBtn();
        scope.changeHeaderText(scope.businessController.getDataBasedOnDataMapping("swiftmsgandadvice", scope.dataMapping));
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "swiftsAndMessagesOnRowClick",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : changeFlexVisibility 
   	  * Changes visibility for the flexes
      * return : NA
      */
    changeFlexVisibility: function (fromFlex, toFlex) {
      var scope = this;
      try {
        scope.view[fromFlex].setVisibility(false);
        scope.view[toFlex].setVisibility(true);
        var CurrentFlexName = scope.context.screensName.flexName[scope.context.screensName.flexName.length - 1];
        var currentFormName = scope.context.screensName.frmType[scope.context.screensName.frmType.length - 1];
        if (CurrentFlexName === fromFlex && currentFormName === scope.frmType) {
          scope.context.screensName.flexName.pop();
          scope.context.screensName.frmType.pop();
        }
        var headerText = "";
        if (scope.frmType === "ImportDrawings") {
          if (toFlex === "flxDetailTypeDisplayDetails") {
            scope.showDownloadBtn();
            headerText = scope.businessController.getDataBasedOnDataMapping("importDrawing", scope.dataMapping);
          }
          else if (toFlex === "flxDetailTypeSwiftDetails") {
            scope.hideDownloadBtn();
            headerText = scope.businessController.getDataBasedOnDataMapping("swiftmsgandadvice", scope.dataMapping);
          }
          scope.changeHeaderText(headerText);
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "changeFlexVisibility",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : setDataforPaymentDetails 
   	  * Sets data for segment Swift and Details
      * return : NA
      */
    setDataforPaymentDetails: function () {
      var scope = this;
      try {
        var paymentDetailsData = [];
        var paymentStatus = scope.getFieldValue("PDpaymentstatus").toUpperCase();
        scope.view.lblPaymentDetails = scope.businessController.getDataBasedOnDataMapping("paymentdetails", scope.dataMapping);
        if(scope.getFieldValue("drawingsStatus").toUpperCase() !== ("New").toUpperCase()){
          paymentDetailsData.push( 
            {
              lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("paymentstatus", scope.dataMapping) + ":", isVisible: true },
              lblRowValue1: { text: scope.getFieldValue("PDpaymentstatus"), isVisible: true },
              flxLCIssuanceRowSeperator: { isVisible: true },
              flxLCIssuanceRowTemplate: { isVisible: true },
              flxLCIssuanceRow: { isVisible: true }
            }
          );
          if(paymentStatus === ("Rejected by Bank").toUpperCase())
            paymentDetailsData.push({
              lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("rejecteddate", scope.dataMapping) + ":", isVisible: true },
              lblRowValue1: { text: scope.getFieldValue("PDrejecteddate"), isVisible: true },
              flxLCIssuanceRowSeperator: { isVisible: true },
              flxLCIssuanceRowTemplate: { isVisible: true },
              flxLCIssuanceRow: { isVisible: true }
            });
          else if(paymentStatus === ("Settled").toUpperCase()){
            paymentDetailsData.push({
              lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("paymentdate", scope.dataMapping) + ":", isVisible: true },
              lblRowValue1: { text: scope.getFieldValue("PDpaymentdate"), isVisible: true },
              flxLCIssuanceRowSeperator: { isVisible: true },
              flxLCIssuanceRowTemplate: { isVisible: true },
              flxLCIssuanceRow: { isVisible: true }
            });
          }
        }
        paymentDetailsData.push(              
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("totalamountotbepaid", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: scope.getFieldValue("PDtotalamounttobepaid"), isVisible: true },
            flxLCIssuanceRowSeperator: { isVisible: true },
            flxLCIssuanceRowTemplate: { isVisible: true },
            flxLCIssuanceRow: { isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("amounttobedebitedfrom", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: scope.formatAccounts("PDamounttobedebitedfrom"), isVisible: true },
            flxLCIssuanceRowSeperator: { isVisible: true },
            flxLCIssuanceRowTemplate: { isVisible: true },
            flxLCIssuanceRow: { isVisible: true }
          },
          {
            lblLCIssuanceRow: { text: scope.businessController.getDataBasedOnDataMapping("yourmessagetobank", scope.dataMapping) + ":", isVisible: true },
            lblRowValue1: { text: scope.getFieldValue("PDyourmessagetobank"), isVisible: true },
            flxLCIssuanceRowSeperator: { isVisible: false },
            flxLCIssuanceRowTemplate: { isVisible: true },
            flxLCIssuanceRow: { isVisible: true }
          }
        );
        scope.view.SegPaymentDetails.setData(paymentDetailsData);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setDataforPaymentDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : setDataforSwiftsAndDetails 
   	  * Sets data for segment Swift and Details
      * return : NA
      */
    setDataforSwiftsAndDetails: function () {
      var scope = this;
      try {
        var swiftsAndDetailsData = [], swiftsData = scope.collectionObj.Collection.swiftsAndAdvices;
        if(swiftsData && swiftsData.length){
          swiftsData.forEach(element =>{
            swiftsAndDetailsData.push({
              lblBeneficiaryName: { text: element.beneficiaryName ? element.beneficiaryName : "NA", isVisible: true },
              lblSwiftNumber: { text: element.swiftMessageType ? element.swiftMessageType : "NA", isVisible: true },
              lblSwiftDate: { text: element.swiftDate ? element.swiftDate : "NA", isVisible: true },
              imgSwiftAction: { src: "segmentarrow.png", isVisible: true }
            });
          });
          scope.view.segSwiftMsgsAdvices.setVisibility(true);
          scope.view.flxSwiftsMsgsHeader.setVisibility(true);
          scope.view.segSwiftMsgsAdvices.setData(swiftsAndDetailsData);
        }
        else{
          scope.view.segSwiftMsgsAdvices.setVisibility(false);
          scope.view.flxSwiftsMsgsHeader.setVisibility(false);
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setDataforSwiftsAndDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : setDataforDocumentAndStatus 
   	  * Sets data for segment Document and Status
      * return : NA
      */
    setDataforDocumentAndStatus: function () {
      var scope = this;
      try {
        scope.view.lblDocumentAndStatus.text = scope.businessController.getDataBasedOnDataMapping("documentstatus", scope.dataMapping);
        scope.view.lblTotalDocument.text = scope.businessController.getDataBasedOnDataMapping("totaldocuments", scope.dataMapping) + ":";
        scope.view.lblDocumentCount.text = scope.getFieldValue("DStotalcount").padStart(2, '0');
        scope.view.lblDocuments = scope.businessController.getDataBasedOnDataMapping("documents", scope.dataMapping) + ":";
        scope.view.lblDocumentStatus.text = scope.businessController.getDataBasedOnDataMapping("documentstatus", scope.dataMapping) + ":";
        scope.view.lblDocumentValue.text = scope.getFieldValue("DSdocumentstatus");
        scope.setDataForsegDocumentNames();
        if(scope.getFieldValue("DSdocumentstatus").toUpperCase() === ("Discrepant").toUpperCase()){
          scope.view.lblDiscrepancies.text = scope.businessController.getDataBasedOnDataMapping("discrepancies", scope.dataMapping) + ":";
          scope.setDataForsegDiscrepancies();
          scope.view.lblDocumentAcceptance.text = scope.businessController.getDataBasedOnDataMapping("documentacceptance", scope.dataMapping) + ":";
          scope.view.lblDocumentAcceptanceValue.text = scope.getFieldValue("DSdocumentacceptance");
          scope.view.flxDiscrepanciesContent.setVisibility(true);
          scope.view.flxDocumentAcceptanceContent.setVisibility(true);
          scope.view.flxDocumentStatusSeparator.setVisibility(true);
        }
        else{
          scope.view.flxDiscrepanciesContent.setVisibility(false);
          scope.view.flxDocumentAcceptanceContent.setVisibility(false);
          scope.view.flxDocumentStatusSeparator.setVisibility(false);
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setDataforDocumentAndStatus",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : setDataForsegDocumentNames 
   	  * Sets data for segment Document Names
      * return : NA
      */
    setDataForsegDocumentNames: function () {
      var scope = this;
      try {
        var documentNames = scope.collectionObj.Collection.drawings.documentName.split("||"),segDocumentNames = [];
        documentNames.forEach(element => {
          segDocumentNames.push(
            {
              lblDocumentDetails: { text: element.trim(), top: 12 }
            }
          );
        });
        scope.view.segDocumentNames.setData(segDocumentNames);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setDataForsegDocumentNames",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : setDataForsegDiscrepancies 
   	  * Sets data for segment Discrepancies
      * return : NA
      */
    setDataForsegDiscrepancies: function () {
      var scope = this;
      try {
        var documentDiscrepancies = scope.collectionObj.Collection.drawings.discrepancies.split("||"),segDiscrepanciesData = [];
        documentDiscrepancies.forEach(element => {
          segDiscrepanciesData.push(
            {
              lblDocumentDetails: { text: element.trim() }
            }
          );
        });
        scope.view.segDiscrepanies.setData(segDiscrepanciesData);
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "setDataForsegDiscrepancies",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : formatAccounts 
      * To get the selected value from accounts dropdown
      * return : returns selected dropdown value
      */
    formatAccounts: function (fieldName) {
      var scope = this;
      try {
        scope.collectionObj = DetailTypeStore.getState();
        var selectedAccountID = scope.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
        var allAccounts = scope.collectionObj.Collection.allAccounts;
        if (allAccounts && selectedAccountID) {
          var selectedAccount = allAccounts.find(({ accountID }) => accountID === selectedAccountID);
          if (selectedAccount)
            return selectedAccount.accountNameFormatted ? selectedAccount.accountNameFormatted : "NA";
          else 
            return "NA";
        }
        return "NA";
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "formatAccounts",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : expandCollapse for Commons records b/w LC and drawings
   	  * To expand collpse the review row data
      * return : NA
      */
    expandCollapse: function (context) {
      var scope = this;
      try {
        var sectionIndex = context.section;
        if (scope.segLCDetailsNewTempData === '')
          scope.segLCDetailsNewTempData = JSON.parse(JSON.stringify(scope.view.segLCDetailsNew.data));
        var data = scope.view.segLCDetailsNew.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (selectedHeaderData["imgLCIssuanceHeader"] === "arrowdown.png") {
          selectedHeaderData["imgLCIssuanceHeader"] = "arrowup.png";
          data[sectionIndex][1] = scope.segLCDetailsNewTempData[sectionIndex][1];
          selectedHeaderData["flxGradient"].isVisible = true;
          if (!((scope.frmType === "ImportLC" && sectionIndex === 3) || (scope.frmType === "ExportLC" && sectionIndex === 4)))
            selectedHeaderData["flxBottomSeperator"].isVisible = true;
          scope.view.segLCDetailsNew.setData(data);
        } else {
          if (!((scope.frmType === "ImportLC" && sectionIndex === 3) || (scope.frmType === "ExportLC" && sectionIndex === 4)))
            selectedHeaderData["flxBottomSeperator"].isVisible = false;
          selectedHeaderData["imgLCIssuanceHeader"] = "arrowdown.png";
          data[sectionIndex][1] = [];
          selectedHeaderData["flxGradient"].isVisible = false;
          scope.view.segLCDetailsNew.setData(data);
        }
      } catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "expandCollapse",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : flexVisibility 
   	  * To navigate from flxDetailTypeSelectDetails to flxDetailTypeDisplayDetails
      * return : NA
      */
    flexVisibility: function () {
      var scope = this;
      try {
        scope.view.flxDetailTypeSelectDetails.setVisibility(false);
        scope.view.flxDetailTypeDisplayDetails.setVisibility(true);
        scope.showDownloadBtn();
        scope.flxIOSFooterVisibility(false);
        scope.context.screensName.flexName.push("flxDetailTypeDisplayDetails");
        scope.context.screensName.frmType.push("ImportLC");
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "flexVisibility",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : flexVisibilityExportLC 
   	  * displays the necessary flexContainer for form Export LC
      * return : NA
      */
    flexVisibilityExportLC: function () {
      var scope = this;
      try {
        scope.view.flxDetailTypeSelectDetails.setVisibility(false);
        scope.view.flxDetailTypeDisplayDetails.setVisibility(true);
        scope.view.flxLCStatus.setVisibility(false);
        scope.flxIOSFooterVisibility(false);
        scope.context.screensName.flexName.push("flxDetailTypeDisplayDetails");
        scope.context.screensName.frmType.push("ExportLC");
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "flexVisibilityExportLC",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : flexVisibilityImportLC 
   	  * displays the necessary flexContainer for form Import LC
      * return : NA
      */
    flexVisibilityImportLC: function () {
      var scope = this;
      try {
        scope.view.flxDetailTypeSelectDetails.setVisibility(true);
        scope.view.flxDetailTypeDisplayDetails.setVisibility(false);
        scope.view.flxLCStatus.setVisibility(true);
        scope.flxIOSFooterVisibility(true);
        scope.context.screensName.flexName.push("flxDetailTypeSelectDetails");
        scope.context.screensName.frmType.push("ImportLC");
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "flexVisibilityImportLC",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : flexVisibilityImportDrawings 
   	  * displays the necessary flexContainer for form Import Drawings
      * return : NA
      */
    flexVisibilityImportDrawings: function () {
      var scope = this;
      try {
        scope.view.flxDetailTypeSelectDetails.setVisibility(false);
        scope.view.flxDetailTypeDisplayDetails.setVisibility(true);
        scope.view.flxLCStatus.setVisibility(true);
        scope.flxIOSFooterVisibility(false);
        scope.context.screensName.flexName.push("flxDetailTypeDisplayDetails");
        scope.context.screensName.frmType.push("ImportDrawings");
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "flexVisibilityImportDrawings",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** Method : onError 
   	  * Stores the error message
      * return : NA
      */
    onError: function (err) {
      var errMsg = JSON.stringify(err);
    }
  };
});