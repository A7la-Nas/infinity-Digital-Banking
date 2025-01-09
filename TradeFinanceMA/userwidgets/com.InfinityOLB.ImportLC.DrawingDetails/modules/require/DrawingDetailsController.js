/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Copyright © Temenos Headquarters SA 2021. All rights reserved.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
define(['./DrawingDetailsBusinessController', './DrawingDetailsStore'], function(BusinessController,DrawingDetailsStore) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataMapping = {}; 
      DrawingDetailsStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.store = DrawingDetailsStore;
      this.collectionObj = DrawingDetailsStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.frmType = "";
      this.checkDrawingsFlow = "";
      this.accountID = "";
      this.formFlowType = "";
      this.isValidate;
      this.acceptance;
      this.presenter;
      let isTablet = false;
    },

    /**
      * @api : preShow
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    preShow: function(){
      var scope = this;
      try{
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
 	* Gets invoked initially after rendering of UI
	* @return : NA
	*/
    postShow : function() {
      var scope = this;
      try{ 
        scope.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' });
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if (scope.view.flxVerticalEllipsisDropdown.isVisible) {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        scope.view.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);  
        scope.resetData();
        scope.businessController.storeFetchedData(scope.context);    
        scope.serviceParameters.getImportLCDrawingById.Criteria.drawingsSrmsReqOrderID = scope.context.LetterOfCredit.drawingsSrmsReqOrderID;
        scope.businessController.setProperties(scope.serviceParameters.getImportLCDrawingById);
        scope.businessController.fetchTransactions();
        scope.initButtonActions();
        scope.getLOCbyID();
        scope.view.txtMessageToBankValue.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\""; 
        scope.setSortActions();
        scope.view.forceLayout();
      } catch(err)
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
	* @api : resetData
 	* Resets the data while rendering the screen
	* @return : NA
	*/
    /**
         * @api : resetData
         * Resets the data while rendering the screen
         * @return : NA
         */
    resetData: function() {
      var scope = this;
      try {
        scope.checkDrawingsFlow = "";
        scope.view.txtMessageToBankValue.text = "";
        scope.isValidate = true;
        scope.view.flxSegDebitedFromDropdown.setVisibility(false);
        scope.view.imgApproveRadio.src = "radio_btn_inactive.png";
        scope.view.imgRejectRadioBtn.src = "radio_btn_inactive.png";
        scope.view.flxBankAccountValue.setEnabled(true);
        scope.view.flxBankAccountValue.skin = "ICSknFlxE3E3E3Border";
        scope.view.lblBankAccountValue.skin = "bbSknLbl424242SSP15Px";
        scope.view.imgBankAccountDropDown.src = "listboxuparrow.png";
        scope.view.btnDrawingDetailsSubmit.skin = "ICSknbtnDisablede2e9f036px";
        scope.view.btnDrawingDetailsSubmit.setEnabled(false);
        scope.view.flxDrawingDetailsBottomSeparator.setVisibility(true);
        scope.view.lblBankAccountValue.text = scope.businessController.getDataBasedOnDataMapping("selectHere", scope.dataMapping);
        if((!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection)) && (!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.error)))
        {
          if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.error.dbpErrCode))
            scope.collectionObj.Collection.error.dbpErrCode = null;
        }					
        scope.view.imgBeneficiary.src = "sortingfinal.png";
        scope.view.imgDate.src = "sorting_previous.png";
        scope.view.imgMessageType.src = "sortingfinal.png";
        scope.view.imgMessageCategory.src = "sortingfinal.png";
        scope.sortFields = {
          "imgBeneficiary": "beneficiaryName",
          "imgDate": "swiftDate",
          "imgMessageType": "swiftMessageType",
          "imgMessageCategory": "swiftCategory"
        };
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "resetData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setSortActions
 	* Action items for sort icons
	* @return : NA
	*/
    setSortActions : function(){
      var scope = this;
      try{
        scope.view.imgBeneficiary.onTouchStart = scope.sortRecords.bind(scope, "imgBeneficiary");
        scope.view.imgDate.onTouchStart = scope.sortRecords.bind(scope, "imgDate");
        scope.view.imgMessageType.onTouchStart = scope.sortRecords.bind(scope, "imgMessageType");
        scope.view.imgMessageCategory.onTouchStart = scope.sortRecords.bind(scope, "imgMessageCategory");
      } catch(err)
      {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setSortActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : sortRecords
 	* sorting for Swifts and Advises
	* @return : NA
	*/
    sortRecords : function(columnName) {
      var scope = this;
      try {
        var sortType = "";
        var field = scope.sortFields[columnName];	
        if(scope.view[columnName].src === "sortingfinal.png"){
          scope.view[columnName].src = "sorting_previous.png";
          sortType = "DESC";
        }
        else if(scope.view[columnName].src === "sorting_previous.png"){
          scope.view[columnName].src = "sorting_next.png";
          sortType = "ASC";
        }
        else{
          scope.view[columnName].src = "sorting_previous.png";
          sortType = "DESC";
        }        
        var imgNames = ["imgBeneficiary", "imgDate", "imgMessageType", "imgMessageCategory"];
        imgNames.splice(imgNames.indexOf(columnName), 1);
        imgNames.forEach((element)=>{
          scope.view[element].src = "sortingfinal.png";
        });
        scope.serviceParameters.getImportLCDrawingById.Criteria.sortByParam = field;
        scope.serviceParameters.getImportLCDrawingById.Criteria.sortOrder = sortType;
        scope.serviceParameters.getImportLCDrawingById.Criteria.drawingsSrmsReqOrderID = scope.context.LetterOfCredit.drawingsSrmsReqOrderID;
        scope.businessController.setProperties(scope.serviceParameters.getImportLCDrawingById);
        scope.businessController.fetchTransactions();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getLOCbyID
 	* Service call for getLetterOfCreditsById
	* @return : NA
	*/
    getLOCbyID : function() {
      var scope = this;
      try {
        scope.serviceParameters.getLetterOfCreditsById.Criteria.srmsReqOrderID = scope.context.LetterOfCredit.lcSrmsReqOrderID;
        scope.businessController.setProperties(scope.serviceParameters.getLetterOfCreditsById);
        scope.businessController.fetchTransactions();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getLOCbyID",
          "error": err
        };
        scope.onError(errorObj);
      }     
    },

    /**
	* @api : onBreakpointChange
 	* This method is invoked on changing breakpoints
	* @return : NA
	*/
    onBreakpointChange : function() {
      var scope = this;
      try {
        scope.render();
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onBreakpointChange",
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
    setContext : function(context) {
      var scope = this;
      try {
        scope.context = context;
        scope.frmType = context.frmType;
        scope.formFlowType = context.LetterOfCredit.formFlowType;
      } catch(err)
      {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : formatAccount
     * Returns formatted account name 
     * @return : Formatted account name or NA
     */
    formatAccount : function (fieldName) {
      var scope = this;
      try {
        scope.collectionObj = DrawingDetailsStore.getState();
        var selectedAccountID = scope.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
        var accountDropdownValues = scope.collectionObj.Collection.DigitalArrangements;
        if (accountDropdownValues && selectedAccountID) {
          var selectedAccount = accountDropdownValues.find(({ accountID }) => accountID === selectedAccountID);
          if (selectedAccount) {
            return selectedAccount.accountNameFormatted ? selectedAccount.accountNameFormatted : "NA";
          } else {
            return "NA";
          }
        }
        return "NA";
      } catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "formatAccount",
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
    render: function() {
      var scope = this;
      try {
        scope.collectionObj = DrawingDetailsStore.getState();
        if (scope.checkDrawingsFlow === "Submit") {
          scope.checkDrawingsFlow = "";
          var serviceSuccessMsg = "true";
         if((!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection)) && (!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.error)))
          {
            if(!kony.sdk.isNullOrUndefined(scope.collectionObj.Collection.error.dbpErrCode))
              serviceSuccessMsg = "false";
          }	
          var lcData = scope.collectionObj.Collection.LetterOfCredits;
          var ackData = scope.collectionObj.Collection.dashboard;
          ackData["serviceSuccessMsg"] = serviceSuccessMsg;
          ackData["frmType"] = "Drawings";
          ackData["accountNameFormatted"] = (scope.view.lblBankAccountValue.text === scope.businessController.getDataBasedOnDataMapping("selectHere", scope.dataMapping)) ? "NA" : scope.view.lblBankAccountValue.text;
          ackData["messageToBank"] = scope.view.txtMessageToBankValue.text;
          var data = {
            "contextData": {}
          };
          data.contextData["LetterOfCredit"] = ackData;
          data.contextData["LOCReportData"] = lcData;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCAcknowledgment"
          }).navigate(data);
        } else {
          scope.setDrawingsDataUI();
          scope.setAccountsDropdown();
          scope.setDrawingsData();
          scope.view.forceLayout();
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "render",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : initButtonActions
 	* Actions of buttons are initialized
	* @return : NA
	*/
    initButtonActions : function() {
      var scope = this;
      try {
        scope.setExpandCollapseOnClick();
        scope.view.flxViewLCDetails.onClick = scope.contextualActionButtonOnClick.bind(scope, "lcDetails");
        scope.view.flxViewLCDetailsMobile.onClick = scope.contextualActionButtonOnClick.bind(scope, "lcDetails");
        scope.view.btnDrawingDetailsBack.onClick = scope.contextualActionButtonOnClick.bind(scope, "back");
        scope.view.btnDrawingDetailsSubmit.onClick = scope.contextualActionButtonOnClick.bind(scope, "submit");
        scope.view.flxApprove.onClick = scope.setAcceptOrReject.bind(scope, "accept");
        scope.view.flxReject.onClick = scope.setAcceptOrReject.bind(scope, "reject");
        scope.view.flxBankAccountValue.onClick = scope.accountsDropdownExpandCollapse.bind(scope);
        scope.view.txtMessageToBankValue.onTextChange = scope.setValidation.bind(scope);;
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }    
    },

    renderPrintAndDownload: function () {
      var scope = this;
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
              onClick: scope.onPrintAndDownloadRowClick.bind(scope, item.id),
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
        var errorObj =
        {
          "level": "ComponentController",
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
          if (scope.getFieldValue("dashboardStatus", scope.dataMapping) == 'Paid') { 
            return true;
          } else {
            return false;
          }
        }
        if (isTablet && id == 'print') {
          return false;
        }
        return true;
      } catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "contextualItemCondition",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          var scope = this;
          var data = [];
          data["drawingsSrmsReqOrderID"] = scope.collectionObj.Collection.dashboard.drawingsSrmsReqOrderID;
          if (!kony.sdk.isNullOrUndefined(data["drawingsSrmsReqOrderID"])) {
            data["isDrawingDetailsPrint"] = true;
          }
          data["previousFormName"] = "frmImportLCDrawingViewDetails";
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCPrint"
          }).navigate(data);
        } else if (id == "download") {
          var srmsID = scope.collectionObj.Collection.dashboard.drawingsSrmsReqOrderID;
          scope.serviceParameters.Download.Criteria.drawingsSrmsReqOrderID = srmsID;
          scope.fetchTransactions();
        } else if (id == 'raiseQuery') {
          let queryObj = {};
          queryObj.descriptionObj = {};
          var params = scope.collectionObj.Collection.dashboard;
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${params.drawingsSrmsReqOrderID}`;
          params.lcAmountFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = params.lcAmountFormatted);
          params.lcReferenceNo && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo")] = params.lcReferenceNo);
          params.drawingCreationDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate")] = params.drawingCreationDateFormatted);
          params.lcExpiryDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate")] = params.lcExpiryDateFormatted);
          params.creditAccount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto")] = params.creditAccount);
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setDrawingsDataUI
 	* prepares UI for Drawings Screen
	* @return : NA
	*/
    setDrawingsDataUI : function() {
      var scope = this;
      try {
        scope.setBackBtn();
        if(scope.frmType === "VerifyAndSubmit")
          scope.setDrawingsVerifyAndSubmitUI();
        else if(scope.frmType === "ViewDetails")
          scope.setDrawingViewDetailsUI();
      } catch(err) {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDrawingsDataUI",
              "error": err
            };
        scope.onError(errorObj);
      } 
    },

    /**
	* @api : setDrawingsVerifyAndSubmitUI
 	* prepares UI for Drawings Verify And Submit
	* @return : NA
	*/
    setDrawingsVerifyAndSubmitUI : function() {
      var scope = this;
      try {
        //Turning widget visibility on for Verify and Submit Screen
        scope.view.flxDrawingDetailsBottom.setVisibility(true);
        scope.view.flxBankAccount.setVisibility(true);
        scope.view.flxBankAccountValue.setVisibility(true);
        scope.view.flxApproveRejectHeader.setVisibility(true);
        scope.view.flxMessageToBank.setVisibility(true);
        scope.view.flxMessageToBankValue.setVisibility(true);
        scope.view.flxDiscrepancies.setVisibility(true);
        //Turning widget visibility off of View Details Screen for Verify and Submit Screen
        scope.view.flxMainPopupView.setVisibility(false);
        scope.view.flxWarningLbl.setVisibility(false);
        scope.view.flxSwiftMessage.setVisibility(false);
        scope.view.flxDocumentStatusDecrepancies.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDrawingsVerifyAndSubmitUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setDrawingsVerifyAndSubmitUI
 	* prepares UI for Drawings View Details
	* @return : NA
	*/
    setDrawingViewDetailsUI : function() {
      var scope = this;
      try {
        //Turning widget visibility on of Verify and Submit Screen for View Details Screen
        scope.view.flxDiscrepancies.setVisibility = true;	
        scope.view.flxDocumentStatusDecrepancies.setVisibility(true);
        scope.view.flxDrawingDetailsBottom.setVisibility(true);
        //Turning widget visibility off for View Details Screen
        scope.view.flxBankAccount.setVisibility(false);
        scope.view.flxBankAccountValue.setVisibility(false);
        scope.view.flxApproveRejectHeader.setVisibility(false);
        scope.view.flxMessageToBank.setVisibility(false);
        scope.view.flxMessageToBankValue.setVisibility(false);     
        scope.view.flxSwiftMessage.setVisibility(false);	
        scope.view.flxMainView.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDrawingViewDetailsUI",
          "error": err
        };
        scope.onError(errorObj);
      }    	
    },

    /**
	* @api : setSwiftMessagePopupUI
 	* prepares UI for Swifts and Advises Pop UI
	* @return : NA
	*/
    setSwiftMessagePopupUI : function(index){ 
      var scope = this;
      try {
        var swiftsandadvices = scope.getFieldValue("swiftsandadvices");
        var selectedSwiftsData = swiftsandadvices[index];
        scope.view.lblRightValue1.text = selectedSwiftsData.beneficiaryName;
        scope.view.lblRightValue2.text = scope.getFormattedDate(selectedSwiftsData.swiftDate);
        scope.view.lblRightValue3.text = selectedSwiftsData.swiftMessageType;
        scope.view.lblRightValue4.text = selectedSwiftsData.swiftCategory;
        var form = kony.application.getCurrentForm();
        var popupObj = scope.view.flxMainPopupView.clone();
        form.remove(popupObj);
        form.add(popupObj);
        popupObj.isVisible = true;
        popupObj.flxMainView.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.flxMainView.flxPopupView.flxButton.btnClose.onClick = function() {
          form.remove(popupObj);
        };
        popupObj.flxMainView.flxPopupView.flxPopupHeaderView.flxSearch.onClick = function() {
          form.remove(popupObj);
        };
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setSwiftMessagePopupUI",
          "error": err
        };
        scope.onError(errorObj);
      }    	
    }, 

    /**
	* @api : expandCollapseForSwiftsAndAdvises
 	* Handles expand and collapse for Swifts and Advises
	* @return : NA
	*/
    expandCollapseForSwiftsAndAdvises : function(){
      var scope = this;
      try{
        var index = scope.view.segSwiftMessageList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scope.view.segSwiftMessageList.data;
        var rowData = data[rowIndex];
        scope.rowData = rowData;
        var section = data.length;
        var segTemplate = scope.getSegmentTemplateForSwiftsAndAdvices();
        if (data[rowIndex].template !== segTemplate.expand) {
          if(scope.previousIndex !== null && scope.previousIndex !== undefined && scope.previousIndex !== ""){
            data[scope.previousIndex].template = segTemplate.collapse;
            data[scope.previousIndex].imgDropdown = {
              src: "arrow_down.png"
            };
            scope.view.segSwiftMessageList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            src: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expand;
          scope.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          scope.view.segSwiftMessageList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          data[rowIndex].imgDropdown = {
            src: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.collapse;
          scope.view.segSwiftMessageList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "expandCollapseForSwiftsAndAdvises",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getSegmentTemplateForSwiftsAndAdvices
 	* The method to get template for Swifts and advises
	* @return : NA
	*/
    getSegmentTemplateForSwiftsAndAdvices : function() { 
      var scope = this;
      try{
        var segmentTemplate = {};
        var breakpoint = kony.application.getCurrentBreakpoint();
        if(breakpoint === 640){        
          segmentTemplate["collapse"] = "flxDrawingsViewDetailsListCollapseMobile";
          segmentTemplate["expand"] = "flxDrawingsViewDetailsListExpandMobile";
        }
        return segmentTemplate;
      } catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentTemplateForSwiftsAndAdvices",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setDrawingsData
 	* Sets Data for Drawings Screen
	* @return : NA
	*/
    setDrawingsData : function() {
      var scope = this;
      try {
        scope.seti18nForLabelAndBtn();
        scope.setDrawingsSegData();
        if(scope.frmType === "VerifyAndSubmit")
          scope.setVerifyAndSubmitSegData();
        else if(scope.frmType === "ViewDetails") {												 
          scope.seti18nForLabelAndBtnViewDetails();
          scope.setViewDetailsSegData();		   
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setDrawingsData",
          "error": err
        };
        scope.onError(errorObj);
      }  
    },

    /**
	* @api : setDrawingsSegData
 	* Sets Data for Drawings Screen
	* @return : NA
	*/
    setDrawingsSegData : function() {
      var scope = this;
      try{
        scope.view.segDocuments.widgetDataMap = {
          "lblBillingLetter" : "lblBillingLetter"
        };
        if(scope.collectionObj.Collection.dashboard && scope.collectionObj.Collection.dashboard.documentName) {
          var documentNames = scope.collectionObj.Collection.dashboard.documentName.split("||"), segDocumentNames = [];
          documentNames.forEach(element => {
            segDocumentNames.push(
              {	
                lblBillingLetter: { text: element.trim()}
              }
            );
          });
          scope.view.segDocuments.setData(segDocumentNames);
        }
        scope.view.segDiscrepancies.widgetDataMap = {
          "lblBillingLetter" : "lblBillingLetter"
        };
        if(scope.collectionObj.Collection.dashboard && scope.collectionObj.Collection.dashboard.discrepancies) {
          var discrepancyNames = scope.collectionObj.Collection.dashboard.discrepancies.split("||"), segDiscrepenyNames = [];
          discrepancyNames.forEach(element => {
            segDiscrepenyNames.push(
              {	
                lblBillingLetter: { text: element.trim()}
              }
            );
          });
          scope.view.segDiscrepancies.setData(segDiscrepenyNames);
        }
        scope.view.segLCSummaryContent.widgetDataMap = {
          "lblReview":"lblReview",
          "lblReviewValue1":"lblReviewValue1"
        };
        var lcSummaryData = [
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("beneficiary", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardBeneficiaryName", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("referenceNumber", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardLCReferenceNo", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("creditAmount", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardLCAmountFormatted", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("issueDate", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardLCIssueDateFormatted", scope.dataMapping), isVisible:true}
          },

          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("expiryDate", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardLCExpiryDateFormatted", scope.dataMapping), isVisible:true}           
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("paymentTerms", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardLCType", scope.dataMapping), isVisible:true}
          }
        ];
        scope.view.segDrawingDetailsContent.widgetDataMap = {
          "lblReview":"lblReview",
          "lblReviewValue1":"lblReviewValue1"
        };
        var drawingsData = [
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("drawingAmount", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardDrawingAmountFormatted", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("creationDate", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardDrawingCreationDateFormatted", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("documentReceived", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardDocumentsReceived", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("presenter", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardpresentorName", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("presenterReference", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardPresentorReference", scope.dataMapping), isVisible:true}           
          },		  
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("farwordContract", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardForwardContact", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("shippingGuaranteeReference", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardShippingGuaranteeReference", scope.dataMapping), isVisible:true}
          },
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("messageFromBank", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardMessageFromBank", scope.dataMapping), isVisible:true}           
          }
        ];
        scope.view.segLCSummaryContent.setData(lcSummaryData);
        scope.view.segDrawingDetailsContent.setData(drawingsData);      
        scope.setDocumentAndStatusBasedonStatus();
        scope.view.lblTotalDocumentValue.text = scope.getFieldValue("dashboardTotalDocuments", scope.dataMapping); 
        scope.view.lblDocumentStatusValue.text = scope.getFieldValue("dashboardDocumentStatus", scope.dataMapping);
        scope.view.lblDocumentStatusValueDiscrepancies.text = scope.getFieldValue("dashboardAcceptance", scope.dataMapping);
        scope.view.forceLayout();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setDrawingsSegData",
          "error": err
        };
        scope.onError(errorObj);
      }     
    },

    /**
	* @api : setDocumentAndStatusBasedonStatus
 	* Sets Data for Drawings document based on document status
	* @return : NA
	*/
    setDocumentAndStatusBasedonStatus : function() {
      var scope = this;
      try {
        var documentStatus = scope.getFieldValue("dashboardDocumentStatus", scope.dataMapping);
        if(documentStatus.toUpperCase() === ("Clean").toUpperCase() && scope.frmType === "ViewDetails") {
          scope.view.flxApproveRejectHeader.setVisibility(false);
          scope.view.flxDiscrepancies.setVisibility(false);
          scope.view.flxDocumentStatusDecrepancies.setVisibility(false);
        } 
        else if(documentStatus.toUpperCase() === ("Discrepant").toUpperCase() && scope.frmType === "ViewDetails"){ 
          scope.view.flxDiscrepancies.setVisibility(true);
          scope.view.flxDocumentStatusDecrepancies.setVisibility(true);
        }
        else if(documentStatus.toUpperCase() === ("Discrepant").toUpperCase() && scope.frmType === "VerifyAndSubmit") {
          scope.view.flxApproveRejectHeader.setVisibility(true);
          scope.view.flxDiscrepancies.setVisibility(true);
          scope.view.flxDocumentStatusDecrepancies.setVisibility(false);
        } 
        else if(documentStatus.toUpperCase() === ("Clean").toUpperCase() && scope.frmType === "VerifyAndSubmit"){ 
          scope.view.flxApproveRejectHeader.setVisibility(false);
          scope.view.flxDiscrepancies.setVisibility(false);
          scope.view.flxDocumentStatusDecrepancies.setVisibility(false);
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setDocumentAndStatusBasedonStatus",
          "error": err
        };
        scope.onError(errorObj);
      }  
    },

    /**
	* @api : setBackBtn
 	* Sets Back button for Verify & Submit and View Details screens
	* @return : NA
	*/
    setBackBtn : function() {
      var scope =this;
      try{
        var breakpoint = kony.application.getCurrentBreakpoint();
        if(scope.frmType === "VerifyAndSubmit") {
          if(breakpoint > 640) {
            scope.view.btnDrawingDetailsBack.right = "200dp";
            scope.view.btnDrawingDetailsBack.width = "150dp";
            scope.view.btnDrawingDetailsSubmit.setVisibility(true);
          }
          else if(breakpoint <= 640) {
            scope.view.btnDrawingDetailsSubmit.setVisibility(true);
            scope.view.btnDrawingDetailsBack.left = "6.25%";
            scope.view.btnDrawingDetailsBack.width = "40.5%";			
          }
        }
        else if(scope.frmType === "ViewDetails") {
          if(breakpoint > 640) {
            scope.view.btnDrawingDetailsBack.right = "20dp";
            scope.view.btnDrawingDetailsBack.width = "150dp";
            scope.view.btnDrawingDetailsSubmit.setVisibility(false);
          }
          else if(breakpoint <= 640) {
            scope.view.btnDrawingDetailsSubmit.setVisibility(false);
            scope.view.btnDrawingDetailsBack.left = "15dp";
            scope.view.btnDrawingDetailsBack.width = "91%";			
          }
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setBackBtn",
          "error": err
        };
        scope.onError(errorObj);
      }     
    },

    /**
	* @api : setVerifyAndSubmitSegData
 	* Sets Data for Drawings Verify And Submit
	* @return : NA
	*/
    setVerifyAndSubmitSegData : function(){
      var scope = this;
      try {
        scope.view.segPaymentDetails.widgetDataMap = {
          "lblReview":"lblReview",
          "lblReviewValue1":"lblReviewValue1"
        };
        var paymentData = [ 
          {
            lblReview:{text:scope.businessController.getDataBasedOnDataMapping("totalAmountToBePaid", scope.dataMapping)+":", isVisible:true},
            lblReviewValue1:{text:scope.getFieldValue("dashboardTotalAmountToBePaid", scope.dataMapping), isVisible:true}
          },
        ];
        scope.view.segPaymentDetails.setData(paymentData);
        scope.view.forceLayout();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setVerifyAndSubmitSegData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setViewDetailsSegData
    * Sets Data for View Details
    * @return : NA
    */
    setViewDetailsSegData : function() {
      var scope = this;
      try {
        var PaymentStatus = scope.getFieldValue("dashboardPaymentStatus", scope.dataMapping);
        if (PaymentStatus.toUpperCase() === ("Settled").toUpperCase() && scope.collectionObj.Collection.hasOwnProperty("swiftsAndAdvices")) {
          scope.view.flxSwiftMessage.setVisibility(true);
          scope.view.flxDrawingDetailsBottomSeparator.setVisibility(false);
          scope.view.forceLayout();
          scope.view.segSwiftMessageList.widgetDataMap = {          
            "flxDrawingsViewListDetailsCollapse":"flxDrawingsViewListDetailsCollapse",
            "flxMain":"flxMain",
            "flxLCTransactionListRow":"flxLCTransactionListRow",
            "flxLCTransactions":"flxLCTransactions",
            "flxColumn":"flxColumn",
            "lblCoulmnTabValue1": "lblCoulmnTabValue1",
            "lblCoulmnTabValue2": "lblCoulmnTabValue2",
            "lblCoulmnTabValue3": "lblCoulmnTabValue3",
            "lblCoulmnTabValue4": "lblCoulmnTabValue4",
            "lblCoulmnTabValue5": "lblCoulmnTabValue5",
            "lblCoulmnTabValue6": "lblCoulmnTabValue6",
            "lblCoulmnTabValue7": "lblCoulmnTabValue7",
            "flxColumn7":"flxColumn7",
            "btnAction1":"btnAction1",
            "flxDropDown":"flxDropDown",
            "imgDropdown":"imgDropdown"
          };                 
          var swiftsandadvices = scope.collectionObj.Collection.swiftsAndAdvices.SwiftsAndAdvises;
          var segSwiftsAndAdvicesData = [];
          swiftsandadvices.forEach((element,index) => {
            segSwiftsAndAdvicesData.push({
              lblCoulmnTabValue1: {
                text: element.beneficiaryName ? element.beneficiaryName : "NA",
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
              btnAction1: {
                text: scope.businessController.getDataBasedOnDataMapping("View", scope.dataMapping),
                isVisible: true,
                onClick: scope.setSwiftMessagePopupUI.bind(scope, index)
              },
              flxDropDown:{
                onClick: scope.expandCollapseForSwiftsAndAdvises.bind(scope)
              },
              imgDropdown:{}
            });
          });
          scope.view.segSwiftMessageList.removeAll();
          scope.view.segSwiftMessageList.setData(segSwiftsAndAdvicesData);
        }else {
          scope.view.flxSwiftMessage.setVisibility(false);
        }
        scope.view.segPaymentDetails.widgetDataMap = {
          "lblReview": "lblReview",
          "lblReviewValue1": "lblReviewValue1"
        };
        var paymentData1 = [];
        var drawingStatus;
        drawingStatus = scope.getFieldValue("dashboardStatus", scope.dataMapping);
        PaymentStatus = scope.getFieldValue("dashboardPaymentStatus", scope.dataMapping);
        if (PaymentStatus.toUpperCase() === ("Settled").toUpperCase()) {
          scope.view.flxPaymentDetails.setVisibility(true);
          paymentData1 = [{
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("PaymentStatus", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardPaymentStatus", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("PaymentDate", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardPaymentDate", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("totalAmountToBePaid", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardTotalAmountToBePaid", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("amountToBeDebitedFrom", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.formatAccount("dashboardAmountToBeDebitedFrom"),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("yourMessageToBank", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardYourMessageToBank", scope.dataMapping),
              isVisible: true
            }
          }, ];
          scope.view.segPaymentDetails.setData(paymentData1);
        } else if (PaymentStatus.toUpperCase() === ("Rejected By Bank").toUpperCase()) {
          scope.view.flxPaymentDetails.setVisibility(true);
          paymentData1 = [];
          paymentData1 = [{
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("PaymentStatus", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardPaymentStatus", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("RejectedDate", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardRejectedDate", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("totalAmountToBePaid", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardTotalAmountToBePaid", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("amountToBeDebitedFrom", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.formatAccount("dashboardAmountToBeDebitedFrom"),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("yourMessageToBank", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardYourMessageToBank", scope.dataMapping),
              isVisible: true
            }
          }, ];
          scope.view.segPaymentDetails.setData(paymentData1);
        } else if (PaymentStatus.toUpperCase() === ("Pending with Bank").toUpperCase() || (drawingStatus.toUpperCase() === "New".toUpperCase())) {
          scope.view.flxPaymentDetails.setVisibility(true);
          paymentData1 = [];
          paymentData1 = [{
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("PaymentStatus", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardPaymentStatus", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("totalAmountToBePaid", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardTotalAmountToBePaid", scope.dataMapping),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("amountToBeDebitedFrom", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.formatAccount("dashboardAmountToBeDebitedFrom"),
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.businessController.getDataBasedOnDataMapping("yourMessageToBank", scope.dataMapping) + ":",
              isVisible: true
            },
            lblReviewValue1: {
              text: scope.getFieldValue("dashboardYourMessageToBank", scope.dataMapping),
              isVisible: true
            }
          }, ];
          scope.view.segPaymentDetails.setData(paymentData1);
        } else {
          scope.view.flxPaymentDetails.setVisibility(false);
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setViewDetailsSegData",
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
	* @api : setVerifyAndSubmitSegData
 	* Sets Data for Drawings Verify And Submit
	* @return : NA
	*/
    seti18nForLabelAndBtn : function(){
      var scope = this;
      try {
        scope.view.lblLCSummary.text = scope.businessController.getDataBasedOnDataMapping("lcSummary", scope.dataMapping);
        scope.view.lblDrawingDetailsContent.text = scope.businessController.getDataBasedOnDataMapping("drawingDetails", scope.dataMapping);
        scope.view.lblDrawingsAndStatus.text = scope.businessController.getDataBasedOnDataMapping("documentStatus", scope.dataMapping);
        scope.view.lblPaymentDetails.text = scope.businessController.getDataBasedOnDataMapping("paymentDetails", scope.dataMapping);
        scope.view.lblTotalDocument.text = scope.businessController.getDataBasedOnDataMapping("totalDocuments", scope.dataMapping)+":";
        scope.view.lblDocumentName.text = scope.businessController.getDataBasedOnDataMapping("documents", scope.dataMapping)+":";
        scope.view.lblDocumentStatus.text = scope.businessController.getDataBasedOnDataMapping("documentStatus", scope.dataMapping)+":";
        scope.view.lblDiscrepancies.text = scope.businessController.getDataBasedOnDataMapping("discrepancies", scope.dataMapping)+":";
        scope.view.lblApproveReject.text = scope.businessController.getDataBasedOnDataMapping("acceptOrRejectDiscrepancies", scope.dataMapping);
        scope.view.lblApprove.text = scope.businessController.getDataBasedOnDataMapping("accept", scope.dataMapping);
        scope.view.lblReject.text = scope.businessController.getDataBasedOnDataMapping("reject", scope.dataMapping);
        scope.view.lblBankAccount.text = scope.businessController.getDataBasedOnDataMapping("amountToBeDebitedFrom", scope.dataMapping)+":";
        scope.view.lblMessageToBank.text = scope.businessController.getDataBasedOnDataMapping("yourMessageToBank", scope.dataMapping)+":";
        scope.view.btnDrawingDetailsBack.text = scope.businessController.getDataBasedOnDataMapping("back", scope.dataMapping);
        scope.view.btnDrawingDetailsSubmit.text = scope.businessController.getDataBasedOnDataMapping("submit", scope.dataMapping);
        scope.view.lblDrawingDetails.text = scope.businessController.getDataBasedOnDataMapping("drawingDetailsVerifySubmit", scope.dataMapping);
        scope.view.lblViewLCDetails.text = scope.businessController.getDataBasedOnDataMapping("viewLCDetails", scope.dataMapping);
        scope.view.lblViewLCDetailsMobile.text = scope.businessController.getDataBasedOnDataMapping("viewLCDetails", scope.dataMapping);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "seti18nForLabelAndBtn",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setViewDetailsSegData
 	* Sets Data for View Details
	* @return : NA
	*/
    seti18nForLabelAndBtnViewDetails : function(){ 
      var scope = this; 
      try{ 
        scope.view.lblDrawingDetails.text = scope.businessController.getDataBasedOnDataMapping("DrawingDetailsHeader", scope.dataMapping);
        scope.view.lblDocumentStatusDescrepancies.text = scope.businessController.getDataBasedOnDataMapping("DiscrepanciesAcceptance", scope.dataMapping); 
        scope.view.lblSwiftMessage.text =  scope.businessController.getDataBasedOnDataMapping("SwiftMessages&Advices", scope.dataMapping); 
        scope.view.bntBeneficiary.text =  scope.businessController.getDataBasedOnDataMapping("Beneficiary", scope.dataMapping); 
        scope.view.btnDate.text =  scope.businessController.getDataBasedOnDataMapping("Date", scope.dataMapping); 
        scope.view.btnMessageType.text =  scope.businessController.getDataBasedOnDataMapping("MessageType", scope.dataMapping); 
        scope.view.btnMessageCategory.text = scope.businessController.getDataBasedOnDataMapping("MessageCategory", scope.dataMapping); 
        scope.view.btnAction.text = scope.businessController.getDataBasedOnDataMapping("Actions", scope.dataMapping); 
        scope.view.lblViewLCDetails.text = scope.businessController.getDataBasedOnDataMapping("viewLCDetails", scope.dataMapping);
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "seti18nForLabelAndBtnViewDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setAcceptOrReject
 	* Sets Accept or reject values for Discrepencies
	* @return : NA
	*/
    setAcceptOrReject : function(acceptOrReject) {
      var scope = this;
      try {
        if(acceptOrReject === "accept") {
          scope.view.imgApproveRadio.src = "radiobtn_active.png";
          scope.view.imgRejectRadioBtn.src = "radio_btn_inactive.png";
          scope.view.flxBankAccountValue.setEnabled(true);
          scope.view.flxBankAccountValue.skin = "ICSknFlxE3E3E3Border";
          scope.view.lblBankAccountValue.skin = "bbSknLbl424242SSP15Px";
          scope.view.imgBankAccountDropDown.src = "listboxuparrow.png";
        } else if (acceptOrReject === "reject") {
          scope.view.lblBankAccountValue.text = scope.businessController.getDataBasedOnDataMapping("selectHere", scope.dataMapping);
          scope.view.imgApproveRadio.src = "radio_btn_inactive.png";
          scope.view.imgRejectRadioBtn.src = "radiobtn_active.png";
          scope.view.flxBankAccountValue.setEnabled(false);
          scope.view.imgBankAccountDropDown.src = "listboxuparrow.png";
          scope.view.flxSegDebitedFromDropdown.setVisibility(false);
          scope.view.flxBankAccountValue.skin = "ICSknFlxF7F8F7Border";
          scope.view.lblBankAccountValue.skin = "bbsknLbl94949415px";
          scope.view.imgBankAccountDropDown.src = "disabledown.png";
        }
        scope.setValidation();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setAcceptOrReject",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : setExpandCollapseOnClick
 	* Sets Handles expand Collapse of drawings screen
	* @return : NA
	*/
    setExpandCollapseOnClick : function() {
      var scope = this;
      try {
        scope.view.flxLCSummaryDropdown.onClick = scope.onClickExpandCollapse.bind(scope, "segLCSummaryContent", "imgLCSummaryDropdown", "flxBottomSeparator");
        scope.view.flxDrawingDetailsDropdown.onClick = scope.onClickExpandCollapse.bind(scope, "segDrawingDetailsContent", "imgDrawingDetailsDropdown", "flxBottomSeparator1");
        scope.view.flxDocumentAndStatusDropDown.onClick = scope.onClickExpandCollapse.bind(scope, "flxDocumentsAndStatusContent", "imgDocumentAndStatus", "flxBottomSeparator2");
        scope.view.flxPaymentDropDown.onClick = scope.onClickExpandCollapse.bind(scope, "flxPaymentDetailsContent", "imgPaymentDropDown", "flxBottomSeparator3");
        scope.view.flxSwiftAndMessagesDropDown.onClick = scope.onClickExpandCollapse.bind(scope, "flxSwiftMessageBody", "imgSwiftAndMessagesDropDown", "flxBottomSeparator4");
      }catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "setExpandCollapseOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : onClickExpandCollapse
 	* Handles expand Collapse of drawings screen
	* @return : NA
	*/
    onClickExpandCollapse : function(flexName, flxImage, flxSeparator) {
      var scope = this;
      try {
        if (scope.view[flxImage].src === "dropdown.png") {
          scope.view[flexName].setVisibility(true);
          scope.view[flxImage].src = "arrowup_sm.png";
          scope.view[flxSeparator].setVisibility(true);
        } else if (scope.view[flxImage].src === "arrowup_sm.png") {
          scope.view[flexName].setVisibility(false);
          scope.view[flxImage].src = "dropdown.png";
          scope.view[flxSeparator].setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDrawingsDataUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : fetchTransactions
 	* Service call for download
	* @return : NA
	*/
    fetchTransactions : function() {
      var scope = this;
      try {
        scope.businessController.setProperties(scope.serviceParameters.Download);
        scope.businessController.downloadTransactions();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "fetchTransactions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /*  Method : getFieldValue 
	 *  To get the value of a field
     *  return : returns field value
     */
    getFieldValue : function(fieldName, listValues, isDropdown) {
      var scope = this;
      try {
        var resultValue = scope.businessController.getDataBasedOnDataMapping(fieldName, scope.dataMapping);
        if (isDropdown) {
          var fieldValue = scope.businessController.getDataBasedOnDataMapping(resultValue, listValues);
          return fieldValue ? fieldValue : "NA";
        }
        return resultValue ? resultValue : "NA";
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getFieldValue",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /*  Method : setAccountsDropdown 
	 *  Method to set data in account list dropdown 
     *  return : NA
     */
    setAccountsDropdown : function() {
      var scope = this;
      try {
        var segmentData = [];
        scope.collectionObj = DrawingDetailsStore.getState();
        if (scope.collectionObj.Collection.DigitalArrangements) {
          var accountList = scope.collectionObj.Collection.DigitalArrangements;
          scope.view.segDebitedFromDropdown.widgetDataMap = {
            "lblListValue": "value",
            "selectedKey": "key",
            "flxDropdownValue": "flxDropdownValue"
          };
          for (var key in accountList) {
            segmentData.push({
              "key": accountList[key].accountID,
              "value": accountList[key].accountNameFormatted,
              "flxDropdownValue": {onClick:scope.accountsRowOnClick.bind(scope, accountList[key].accountID)}
            });
          }
        }
        scope.view.segDebitedFromDropdown.setData(segmentData);
      } catch(err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setAccountsDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : accountsDropdownExpandCollapse 
	 *  sets data for accounts dropdown 
     *  return : NA
     */
    accountsDropdownExpandCollapse : function() {
      var scope = this;
      try {
        if(scope.view.imgBankAccountDropDown.src === "arrowup_sm.png") {
          scope.view.imgBankAccountDropDown.src = "listboxuparrow.png";
          scope.view.flxSegDebitedFromDropdown.setVisibility(false);
        }
        else if(scope.view.imgBankAccountDropDown.src === "listboxuparrow.png") {
          scope.view.imgBankAccountDropDown.src = "arrowup_sm.png";
          scope.view.flxSegDebitedFromDropdown.setVisibility(true);
        }
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "accountsRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : accountsRowOnClick 
	 *  set data from accounts dropdown to label
     *  return : NA
     */
    accountsRowOnClick : function(accID) {
      var scope = this;
      try {
        scope.accountID = accID;
        var data = scope.view.segDebitedFromDropdown.data;
        var index = scope.view.segDebitedFromDropdown.selectedRowIndex;
        scope.view.lblBankAccountValue.text = data[index[1]].value;
        scope.view.imgBankAccountDropDown.src = "listboxuparrow.png";
        scope.view.flxSegDebitedFromDropdown.setVisibility(false);
        scope.setValidation();
      } catch(err) {
        var errorObj = {
          "level" : "ComponentController",
          "method" : "accountsRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },

    /*  Method : contextualActionButtonOnClick 
	 *  handles form navigation 
     *  return : NA
     */
    contextualActionButtonOnClick : function(buttonName) {
      var scope = this;
      try {
        var LOCData = scope.collectionObj.Collection.LetterOfCredits;
        LOCData["previousFormName"] = "frmImportLCDrawingViewDetails";
        LOCData["issueDate"] = scope.getFieldValue("dashboardLCIssueDateFormatted", scope.dataMapping);
        LOCData["expiryDate"] = scope.getFieldValue("dashboardLCExpiryDateFormatted", scope.dataMapping);
        if (buttonName === "lcDetails") {          
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDetails"
          }).navigate(LOCData);
        } else if (buttonName === "back") {
          LOCData.isDrawingsBack = true;
          if(scope.context.LetterOfCredit.previousFormName !== "frmImportLCAcknowledgment"){
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/" + scope.context.LetterOfCredit.previousFormName
            }).navigate(LOCData);
          }else{
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
            }).navigate();
          }
        } else if (buttonName === "submit") {
          scope.setDataforSubmit();
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

    /*  Method : setValidation 
	 *  sets validation for submit service calls
     *  return : NA
     */
    setValidation: function() {
      var scope = this;
      try {
        if (((scope.view.imgApproveRadio.src === "radiobtn_active.png") && scope.getFieldValue("dashboardDocumentStatus", scope.dataMapping).toUpperCase() === ("Discrepant").toUpperCase()) || (scope.getFieldValue("dashboardDocumentStatus", scope.dataMapping).toUpperCase() === ("Clean").toUpperCase())) {        
          scope.acceptance = "APPROVED";
          if (scope.view.lblBankAccountValue.text === scope.businessController.getDataBasedOnDataMapping("selectHere", scope.dataMapping) || scope.view.txtMessageToBankValue.text === "") {
            scope.isValidate = true;
          } else {
            scope.isValidate = false;
          }
        } else if (scope.view.imgRejectRadioBtn.src === "radiobtn_active.png") {
          scope.acceptance = "REJECTED";
          scope.accountID = "";
          if (scope.view.txtMessageToBankValue.text === "") {
            scope.isValidate = true;
          } else {
            scope.isValidate = false;
          }
        }
        if (scope.isValidate === false) {
          scope.view.flxWarningLbl.setVisibility(false);
          scope.view.btnDrawingDetailsSubmit.setEnabled(true);
          scope.view.btnDrawingDetailsSubmit.skin = "sknBtnNormalSSPFFFFFF15Px";
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setValidation",
          "error": err
        };
        scope.onError(errorObj);
      }    
    },

    /*  Method : setDataforSubmit 
	 *  sets data for submit service calls
     *  return : NA
     */
    setDataforSubmit: function() {
      var scope = this;
      try {
        if (scope.isValidate === undefined || scope.isValidate === true) {
          scope.view.flxWarningLbl.setVisibility(true);
          scope.view.btnDrawingDetailsSubmit.skin = "ICSknbtnDisablede2e9f036px";
          scope.view.btnDrawingDetailsSubmit.setEnabled(false);
        } else if (scope.isValidate === false) {
          scope.view.btnDrawingDetailsSubmit.setEnabled(true);
          scope.view.btnDrawingDetailsSubmit.skin = "sknBtnNormalSSPFFFFFF15Px";
          scope.view.flxWarningLbl.setVisibility(false);
          scope.checkDrawingsFlow = "Submit";
          scope.serviceParameters.submitImportLCDrawing.Criteria.acceptance = scope.acceptance;
          scope.serviceParameters.submitImportLCDrawing.Criteria.accountToBeDebited = scope.accountID;
          scope.serviceParameters.submitImportLCDrawing.Criteria.messageToBank = scope.view.txtMessageToBankValue.text;
          scope.serviceParameters.submitImportLCDrawing.Criteria.drawingsSRMSID = scope.getFieldValue("dashboardDrawingsSrmsReqOrderID", scope.dataMapping);
          scope.businessController.setProperties(scope.serviceParameters.submitImportLCDrawing);
          scope.businessController.fetchTransactions();
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDataforSubmit",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : onError 
	 *  popups the error object the functions
     *  return : NA*/
    onError: function(err) {
      var errorMsg = JSON.stringify(err);
    }
  };
});