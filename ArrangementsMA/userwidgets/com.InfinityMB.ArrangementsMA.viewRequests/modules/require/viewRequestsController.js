define(['./viewRequestsStore','./viewRequestsBusinessController', 'DataValidationFramework/DataValidationHandler'],function(ViewRequestsStore, BusinessController, DataValidationHandler) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      ViewRequestsStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.dataValidationHandler = new DataValidationHandler();
      this.store = ViewRequestsStore;
      this.collectionObj = ViewRequestsStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.filteredAcc ="";
      this.fromDateVal = "";
      this.toDateVal = "";
      this.segmentData = "";
      this.currentFlex = 'flxServiceRequests';
      this.allSetviceAccounts = [];
      this.searchPerformed = false;
      this.searchMenuInit ={};
      this.fromDate;
      this.toDate;
      this.serviceReqMaxPeriod = 1;
      this.segUIMapping = {
        "segRequestsList": {
          "flxRow": {onClick: this.onRequestListSegmentRowClick.bind(this)}
        }
      };
      this.today = new Date();
      this.pastDate = (this.today.getMonth() - this.serviceReqMaxPeriod + 1) + "/" + this.today.getDate() + "/" + (this.today.getFullYear() );
      this.currentDate = (this.today.getMonth() + 1) + "/" + (this.today.getDate() + 1) + "/" + this.today.getFullYear();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'field0', () => {
                return this._field0;
            });
            defineSetter(this, 'field0', value => {
                this._field0 = value;
            });
            defineGetter(this, 'field1', () => {
                return this._field1;
            });
            defineSetter(this, 'field1', value => {
                this._field1 = value;
            });
            defineGetter(this, 'field2', () => {
                return this._field2;
            });
            defineSetter(this, 'field2', value => {
                this._field2 = value;
            });
            defineGetter(this, 'field3', () => {
                return this._field3;
            });
            defineSetter(this, 'field3', value => {
                this._field3 = value;
            });
            defineGetter(this, 'field4', () => {
                return this._field4;
            });
            defineSetter(this, 'field4', value => {
                this._field4 = value;
            });
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
            defineGetter(this, 'conditionalMappingKey', () => {
                return this._conditionalMappingKey;
            });
            defineSetter(this, 'conditionalMappingKey', value => {
                this._conditionalMappingKey = value;
            });
            defineGetter(this, 'conditionalMapping', () => {
                return this._conditionalMapping;
            });
            defineSetter(this, 'conditionalMapping', value => {
                this._conditionalMapping = value;
            });
        },

    preShow: function(){
      var scope = this;
      try {
        this.businessController.context = this.context;
        this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.breakpoints);
        this.businessController.getMetaDataForAllObjects();
        this.parseSearchMenu();
        this.searchMenuInit = JSON.parse(JSON.stringify(this.dataMapping.searchMenu));
        this.view.flxDetails.setVisibility(false);
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

    postShow: function(){

      this.initActions(); 
      this.businessController.invokeCustomVerbforServiceOrder();
                  

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
	* @api : render
 	* gets invoked when collection gets updated
	* @return : NA
	*/
    render: function () {
      var scope = this;
      var dvfError = "";
      this.collectionObj = ViewRequestsStore.getState();
      this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.serviceRequestTitle.lblHeaderName);
      this.performDataMapping();
      this.performUIActions();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    /**
	* @api : performDataMapping
	* This method will do data mapping with collection
	* @return : NA
	*/
    performDataMapping : function() {
      var scope = this;
      try{
        var dataMapping = this.dataMapping;
        for(key in dataMapping){
          if(key === "segments"){
            var widgets = dataMapping[key];
            for(key in widgets){
              var widgetId = key;
              var segData = scope.getSegmentDataFromMapping(widgets[widgetId], widgetId);
              scope.view[widgetId].setData(segData);
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
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
      try{
        var segData = [];
        var segMasterDataToken = segDataJSON.segmentMasterData;
        segMasterDataToken = segMasterDataToken.split(".");
        if(segMasterDataToken[0].indexOf("Collection") != -1){
          var segMasterData = [];
          var key = segMasterDataToken[1].replace("}","");
          if(this.collectionObj.Collection[key]){
            this.getData(this.collectionObj.Collection[key],function(records){
              segMasterData = records; 
            });
          }
          segMasterData.map(function(record){
            var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
            for(key in segRecord){
              segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key],  record);
            }
            segRecord = scope.getUIMappings(segRecord, record, segId);
            segData.push(segRecord);
          });
        }
        return segData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentDataFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : performUIActions
	* This method will do ui changes and actions to be taken before rendering view
	* @return : NA
	*/
    performUIActions : function() {
      var scope = this;
      try{
        var segRecords = this.view.segRequestsList.data;
        if (segRecords && segRecords.length > 0) {
          this.view.flxServiceRequests.setVisibility(true);
          this.view.flxRequestsList.setVisibility(true);
          this.view.flxNoRequestsSearch.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(false);
          this.setSegmentWidgetDataMap();
          this.view.segRequestsList.setData(segRecords);
        } else {
          if(this.searchPerformed){
            this.view.flxServiceRequests.setVisibility(true);
            this.view.flxRequestsList.setVisibility(false);
            this.view.flxNoRequestsSearch.setVisibility(true);
            this.searchPerformed = false;

          }else{
            this.view.flxServiceRequests.setVisibility(false);
            this.view.flxNoTransactions.setVisibility(true);
          }
          this.view.forceLayout();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performUIActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    getData: function(requests, callBack){
      requests.map(function(request){
        return request;
      });
      callBack(requests);
    },
    /**
	* @api : getFieldValueFromMapping
	* Returns the data in collection using data mapping and conditional data mapping
	* @return : String
	*/
    getFieldValueFromMapping : function(widget, fieldMapping,  record) {
      var scope = this;
      try{
        if(typeof fieldMapping === "string") {
          if(fieldMapping.indexOf("$") !== -1){
            if(fieldMapping.indexOf("${i18n") !== -1) {
              return this.geti18nText(fieldMapping);
            }
            else{
              fieldMapping = fieldMapping.split(".");
              fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}","");
              if ((fieldMapping == "currentBalance") || (fieldMapping == "closingReason") ||(fieldMapping == "supportingDocumentData")){
                return record.serviceReqRequestIn[fieldMapping];
              }
              else{
                return record[fieldMapping]; 
              }
            }
          }
          else {
            return fieldMapping;
          }
        }
        else if(typeof fieldMapping === "object") {
          var keys = Object.keys(fieldMapping);
          if(JSON.stringify(keys).indexOf("BP1") != -1 || JSON.stringify(keys).indexOf("BP2") != -1 || JSON.stringify(keys).indexOf("BP3") != -1){
            var fieldValue = this.getBreakpointBasedValue(fieldMapping, kony.application.getCurrentBreakpoint());
            return this.getFieldValueFromMapping(widget, fieldValue,{}, record);
          }else{
            for(key in fieldMapping){
              if(typeof fieldMapping[key] === "string"){
                if(fieldMapping[key].indexOf("${") !== -1){
                  fieldMapping[key] = this.getFieldValueFromMapping(widget, fieldMapping[key], {}, record);
                } 
              }
            } 
          }
          return fieldMapping;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFieldValueFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : getUIMappings
	* This method will do ui mapping and return the segment record
	* @return : {JSON}
	*/
    getUIMappings : function(segRecord, record, segId) { 
      var scope = this;
      try{
        var segUIMappings = this.segUIMapping[segId];
        for(key in segUIMappings) {
          segRecord[key] = this.getFieldValueFromMapping(key, segUIMappings[key], record);
        }
        return segRecord;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getUIMappings",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : setSegmentWidgetDataMap
	* This method will set the widget data map for segRequestsList segment
	* @return : NA
	*/
    setSegmentWidgetDataMap : function() {
      this.view.segRequestsList.widgetDataMap = {
        "flxRow": "flxRow",
        "accountId": "accountId",
        "accountName": "accountName",
        "lblRequest" : "lblRequest",
        "requestId": "requestId",
        "lblRequestStatus" : "lblRequestStatus",
        "lblDate" : "lblDate"
      };
    }, 
  
    onRequestListSegmentRowClick: function() {
      var scope = this;
      if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
        let requestDataIphone = scope.view.segRequestsList.selectedRowItems[0];
        scope.updateRequestDetails(requestDataIphone);
      }
      else{
        let rowindex = Math.floor(scope.view.segRequestsList.selectedRowIndex[1]);
        let requestData = scope.view.segRequestsList.data[rowindex];
        scope.updateRequestDetails(requestData);
      }
     
    },

    updateRequestDetails: function(data){
      this.currentFlex = 'flxDetails';
      this.view.flxServiceRequests.setVisibility(false); 
      this.view.flxDetails.setVisibility(true);
      this.view.flxNoTransactions.setVisibility(false);
      this.view.lblHeaderName.text = this.lblChange();
      var reqDetails = this.dataMapping.details;
      if(data[reqDetails.lblDetailsValue]==="Account Closure" ){
        this.view.lblDetailsValue1.text = data[reqDetails.lblDetailsValue];
        this.view.lblDetailsTitle2.text = kony.i18n.getLocalizedString("i18n.serviceRequests.ReferenceNumber");
        this.view.lblDetailsValue2.text =  data[reqDetails.lblDetailsValue6];
        this.view.lblDetailsTitle3.text = kony.i18n.getLocalizedString("kony.mb.chequeManagement.account");
        let accountName = data[reqDetails.lblDetailsValue3];
        if (accountName === 'NA')
          this.view.flxDetails3.setVisibility(false);
        else{
          this.view.flxDetails3.setVisibility(true);
          this.view.lblDetailsValue3.text = accountName;
        }
        this.view.lblDetailsTitle4.text = kony.i18n.getLocalizedString("i18n.common.currentBalanceWithColon");
        this.view.lblDetailsValue4.text = data[reqDetails.lblDetailsValue8];
        this.view.lblDetailsTitle5.text = "Reason for Closure:"
        this.view.lblDetailsValue5.text = data[reqDetails.lblDetailsValue9]
        this.view.lblDetailsTitle6.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Status:");
        this.view.lblDetailsValue6.text = data[reqDetails.lblDetailsValue2];
        this.view.flxDetails7.isVisible = false;
        this.view.lblDetailsValue7.isVisible = false;
        this.view.flxSeparatorSR1.width = "100%";
        this.view.flxSeparatorSR4.width = "100%";
        this.view.flxSeparatorSR5.width = "100%";
        this.view.flxSeparatorSR6.width = "100%";
        this.view.flxSupportingDocs.isVisible = true;
        this.view.lblDetailsTitle8.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SupportingDocuments");
        if(!kony.sdk.isNullOrUndefined(data[reqDetails.lblDetailsValue10]) && data[reqDetails.lblDetailsValue10].length>0){
          this.view.flxSupportingDocs.setVisibility(true);
          this.supportingDocDataMapping(JSON.parse(data[reqDetails.lblDetailsValue10].replaceAll(/'/g, '\"')));
        }
        else{
          this.view.flxSupportingDocs.setVisibility(false);
        }
      }
      else{
        this.view.lblDetailsValue1.text = data[reqDetails.lblDetailsValue1];
        this.view.lblDetailsTitle2.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Status:");
        this.view.lblDetailsValue2.text = data[reqDetails.lblDetailsValue2];
        this.view.lblDetailsTitle3.text = kony.i18n.getLocalizedString("kony.mb.common.FromAccountColon");
        let accountName = data[reqDetails.lblDetailsValue3];
        if (accountName === 'NA')
          this.view.flxDetails3.setVisibility(false);
        else{
          this.view.flxDetails3.setVisibility(true);
          this.view.lblDetailsValue3.text = accountName;
        }
        this.view.lblDetailsTitle4.text = kony.i18n.getLocalizedString("i18n.serviceRequests.RequestedDate");
        this.view.lblDetailsValue4.text = data[reqDetails.lblDetailsValue4];
        this.view.lblDetailsTitle5.text = kony.i18n.getLocalizedString("i18n.serviceRequests.ProcessedDate");
        this.view.lblDetailsValue5.text = data[reqDetails.lblDetailsValue5];
        this.view.lblDetailsTitle6.text = kony.i18n.getLocalizedString("i18n.serviceRequests.ReferenceNumber");
        this.view.lblDetailsValue6.text = data[reqDetails.lblDetailsValue6];
        this.view.lblDetailsTitle7.text = kony.i18n.getLocalizedString("i18n.serviceRequests.SignatoryApproval");
        if (data.signatoryApprovalRequired === 'false')
          this.view.flxDetails7.setVisibility(false);
        else{
          this.view.flxDetails7.setVisibility(true);
          this.view.lblDetailsValue7.text = 'Yes';
        }
        this.view.flxSupportingDocs.isVisible = false;
      }
    },
    supportingDocDataMapping:function(supportingDocs){
      var scope=this;
      this.view.flxSupportingDocs.setVisibility(true);
      var attachmentsData = [];   
      for (var i = 0; i < supportingDocs.length; i++) {
        attachmentsData[i] = {};
        attachmentsData[i].filename = supportingDocs[i].fileName;
        //attachmentsData[i].lblAttachmentId=supportingDocs[i].docId;
        attachmentsData[i]["imgRemoveAttachment"] = {
          "src": "bbdownloadicon_1.png",
          "onTouchEnd" : scope.downloadDocuments.bind(this,supportingDocs[i].docId)
        };
        var arr=supportingDocs[i].fileType.split('/');
        var fileType=arr[1];
        if(fileType === "doc"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "doc_image.png"
     	 }
        } else if(fileType === "pdf"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "pdf_image.png"
     	 }
        }else if(fileType === "docx"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "docx_image.png"
     	 }
        }else if(fileType === "jpeg"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "jpeg_image.png"
     	 }
        }else if(fileType === "png"){
          attachmentsData[i]["imgAttachment"] = {
        	"src": "png_image.png"
     	 }
        }
      }
      this.view.segSupportingDocs.widgetDataMap = {
        "lblAttachment": "filename",
        "imgRemoveAttachment": "imgRemoveAttachment",
        "imgAttachment":"imgAttachment",
        //"lblAttachmentId":"lblAttachmentId"
      };
      this.view.segSupportingDocs.setData(attachmentsData);
    },
    downloadDocuments:function(docId){
      var servMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA","moduleName":"AccountServicesUIModule"}); 
      servMod.presentationController.downloadSupportingDocument({"documentId":docId});
    },
    lblChange:function(){
      return this.getDisplayText(this.dataMapping.requestDetailsTitle.lblHeaderName);
      // this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.requestDetailsTitle.lblHeaderName);
    },

    initActions: function(){

      this.view.flxBackList.onClick = this.selectBackAction.bind(this);
      this.view.customHeader.flxBack.onClick = this.selectBackAction.bind(this);
      this.view.flxAdvancedFilter.onClick = this.advancedSearchInit.bind(this);
      this.view.flxCancel.onClick = this.cancelAdvancedSearch.bind(this);
      this.view.tbxSearch.onTextChange = this.searchAccountNameId.bind(this);
      this.view.txtSearchBox.onTextChange = this.searchServiceKeyword.bind(this);
      this.view.btnSearch.onClick = this.searchServiceRequest.bind(this);
      this.view.serviceReqCalendar.sendSelectedData = this.setSearchDate.bind(this);

      this.view.txtSearchBox.text = '';
      this.serviceReqMaxPeriod = this.businessController.getMaxPeriod();

      this.view.flxServiceRequests.setVisibility(true); 
      this.currentFlex = 'flxServiceRequests';
      this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.serviceRequestTitle.lblHeaderName);
      this.showBackFlex(true);


    },


    // based on where the user is, back is sending him to propper flex or humburger menu
    selectBackAction:function(){


      switch(this.currentFlex) {
        case 'flxServiceRequests':
          this.dataMapping.searchMenu = JSON.parse(JSON.stringify(this.searchMenuInit));
          this.onClickBack();
          break;
        case 'flxDetails':
          this.backToList();
          break;         
        case 'flxSearchMenu':
          this.backToList();
          break;
        case this.dataMapping.searchMenu[0].flxName:
          this.hideSearchModals(this.currentFlex);
          break;
        case this.dataMapping.searchMenu[1].flxName:
          this.hideSearchModals(this.currentFlex);
          break;
        case this.dataMapping.searchMenu[2].flxName:
          this.hideSearchModals(this.currentFlex);
          break;
        case this.dataMapping.searchMenu[3].flxName:
          this.hideSearchModals(this.currentFlex);
          break;
        case this.dataMapping.searchMenu[4].flxName:
          this.hideSearchModals(this.currentFlex);
          break;
        default:
          this.onClickBack();
      }      

    },


    backToList:function(){

      this.view.flxServiceRequests.setVisibility(true); 
      this.view.flxSearchMenu.setVisibility(false);
      this.view.flxDetails.setVisibility(false);
      this.showBackFlex(true);

      this.currentFlex = 'flxServiceRequests';
      this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.serviceRequestTitle.lblHeaderName);

    },

    advancedSearchInit:function(){
      var scope = this;
      this.view.flxServiceRequests.setVisibility(false); 
      this.view.flxDetails.setVisibility(false);
      this.view.flxSearchMenu.setVisibility(true);
      this.currentFlex = 'flxSearchMenu';
 //     this.showBackFlex(false);
      this.showBackFlex(true);
      this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.advancedSearchTitle.lblHeaderName);
      this.requestCategoryValues(this.collectionObj.Cache.ServiceRequest);
      this.serviceRequestValues(this.collectionObj.Cache.ServiceRequest);
      this.statusTypeValues(this.collectionObj.Cache.ServiceRequest);
      this.view.serviceReqCalendar.setFirstEnabledDate(this.pastDate);
      this.view.serviceReqCalendar.setLastEnabledDate(this.currentDate);
      this.view.serviceReqCalendar.preShow();

      this.view.serviceReqCalendar.selectedDate = this.currentDate;

      this.filteredAcc = this.context;
      this.view.segSearchMenu.widgetDataMap = scope.getWidgetDataMapMenu();
      this.view.segSearchMenu.setData(this.dataMapping.searchMenu);
      this.view.segSearchMenu.onRowClick = scope.getMenuItem;
      this.view.segRequestCateqory.widgetDataMap = scope.getWidgetDataMapFields();
      this.view.segRequestCateqory.setData(this._field0);
      this.view.segServiceRequest.widgetDataMap = scope.getWidgetDataMapFields();
      this.view.segServiceRequest.setData(this._field1);
      this.view.segStatusType.widgetDataMap = scope.getWidgetDataMapFields();
      this.view.segStatusType.setData(this._field2);
      this.view.segAccounts.widgetDataMap = this.setAccountsSegmentWidgetDataMap();
      this.view.segAccounts.setData(this.accountListValues(this.collectionObj.Cache.ServiceRequest));
     // this.view.imgFromCloseIcon.onTouchStart = this.clearTextBoxTexts.bind(this);
      this.setActiveSearchBtn();
      this.view.txtSearchBox.text = '';
    },


    cancelAdvancedSearch:function(){     

      this.dataMapping.searchMenu = JSON.parse(JSON.stringify(this.searchMenuInit));
      this.fromDate = '';
      this.toDate = '';
      this.view.txtSearchBox.text = '';

      this.businessController.resetDataList();

      this.backToList();     

    },


    getWidgetDataMapMenu: function() {
      return {
        "lblName" : "name",
        "lblValue": "values"
      };
    },
    getWidgetDataMapFields: function() {
      return {
        "lblField" : "value"
      };
    },
    getMenuItem: function(seguiWidget, sectionNumber, rowNumber) {
      this.toggleSearchItems(seguiWidget.data[rowNumber]);
    },
    toggleSearchItems: function(item){
      this.showBackFlex(true);

      switch (item.name){
        case this.dataMapping.searchMenu[0].name:          
          this.view.flxRequestCategory.isVisible = true;
          this.view.flxSearchMenu.setVisibility(false);
          this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.searchMenu[0].name);
          this.currentFlex = this.dataMapping.searchMenu[0].flxName;
          this.view.segRequestCateqory.onRowClick = this.setValuesToSegments.bind(this, item.name);
        //  this.view.segRequestCateqory.onRowClick = this.activateServiceRequest.bind(this, item.name);
          break;
        case this.dataMapping.searchMenu[1].name:          
          this.view.flxServiceRequest.isVisible = true;
          this.view.flxSearchMenu.setVisibility(false);
          this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.searchMenu[1].name);
          this.currentFlex = this.dataMapping.searchMenu[1].flxName;
          this.view.segServiceRequest.onRowClick = this.setValuesToSegments.bind(this, item.name);
          break;
        case this.dataMapping.searchMenu[2].name:          
          this.view.flxStatusType.isVisible = true;
          this.view.flxSearchMenu.setVisibility(false);
          this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.searchMenu[2].name);
          this.currentFlex = this.dataMapping.searchMenu[2].flxName;
          this.view.segStatusType.onRowClick = this.setValuesToSegments.bind(this, item.name);
          break;
        case this.dataMapping.searchMenu[3].name:          
          this.view.flxAccounts.isVisible = true;
          this.view.flxSearchMenu.setVisibility(false);
          this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.searchMenu[3].name);
          this.currentFlex = this.dataMapping.searchMenu[3].flxName;
          this.view.flxAllAccounts.onClick = this.setValuesToSegments.bind(this, item.name);
          this.view.segAccounts.onRowClick = this.setValuesToSegments.bind(this, item.name);
          break;
        case this.dataMapping.searchMenu[4].name:
          this.view.flxDateRange.isVisible = true;
          this.view.flxSearchMenu.setVisibility(false);
          this.currentFlex = this.dataMapping.searchMenu[4].flxName;
          this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.searchMenu[4].name);
          break;
        default:
          this.view.flxDateRange.isVisible = false;
          this.view.flxAccounts.isVisible = false;
          this.view.flxRequestCategory.isVisible = false;
          this.view.flxServiceRequest.isVisible = false;
          this.view.flxStatusType.isVisible = false;

      }
    },
    hideSearchModals: function(item){
      this.view[item].setVisibility(false);

      this.view.flxSearchMenu.setVisibility(true);
      this.currentFlex = 'flxSearchMenu';
      this.showBackFlex(false);
      this.view.lblHeaderName.text = this.getDisplayText(this.dataMapping.advancedSearchTitle.lblHeaderName);

      //  this.view.top = "56dp";
    },
    setValuesToSegments: function(itemName, seguiWidget, sectionNumber, rowNumber, selectedState){
      let valueOfItem = itemName;
      let valueOfList;
      if(seguiWidget.data){
        if(seguiWidget.data[sectionNumber][rowNumber])
          valueOfList = seguiWidget.data[sectionNumber][rowNumber];
        else
          valueOfList = seguiWidget.data[rowNumber].value;

        if(itemName===this.dataMapping.searchMenu[3].name){
          let selected = seguiWidget.selectedRowIndex;
          valueOfList = seguiWidget.data[selected[0]][1][selected[1]].accountName;
        }
      }
      else {
        valueOfList = this.view.lblAllAccounts.text;
      }
      this.dataMapping.searchMenu = this.dataMapping.searchMenu.map(p => p.name === valueOfItem? Object.defineProperty(p, "values", {value : valueOfList}) : p);
      this.view.segSearchMenu.setData(this.dataMapping.searchMenu);
      this.hideSearchModals(this.currentFlex);
      this.setActiveSearchBtn();

    },
    requestCategoryValues: function(data){
      let values = [...new Set(data.map(item => item.type_description))];
      this.field0 = [{value: this.searchMenuInit[0].values}];
      for (const val of values) {
        this.field0.push({value: val});
      }
    },
    serviceRequestValues: function(data){
      let values = [...new Set(data.map(item => item.subType_description))];
      this.field1 = [{value: this.searchMenuInit[1].values}];
      for (const val of values) {
        this.field1.push({value: val});
      }
    },
    statusTypeValues: function(data){
      let values = [...new Set(data.map(item => item.serviceReqStatus))];
      this.field2 = [{value: this.searchMenuInit[2].values}];
      for (const val of values) {
        this.field2.push({value: val});
      }
    },

    setAccountsSegmentWidgetDataMap : function() {
      var dataMapping = {
        "lblHeaderName": "lblTypeName",
        "lblAccountName": "accountName",
        "imgChevron": "imgChevron"
      };
      return dataMapping;
    },
    /*
     * Component clearTextBoxTexts
     * Responsible to clear text box texts  
     */
    clearTextBoxTexts : function(){
      this.view.tbxFromSearch.text="";
      this.view.imgFromCloseIcon.setVisibility(false);
      this.view.segAccounts.removeAll();
      this.filteredAcc = this.context;
      this.view.segAccounts.setData(this.context);
      this.view.segAccounts.setVisibility(true);
      this.view.flxFromNoResults.setVisibility(false);
      this.view.forceLayout();
    },


    showBackFlex:function(visible){
      this.view.flxBackList.setVisibility(visible);
      this.view.flxCancel.setVisibility(!visible);
    },

    accountListValues: function(data, filterBy){

      let listUniqueAccountIds = this.extractAccountTypes(data);
      let accountsForSegment;

      if(filterBy){
        accountsForSegment = listUniqueAccountIds.filter(function(k) {
          return ((k["accountId"]&&k["accountId"].toUpperCase().includes(filterBy.toUpperCase()))) || k["accountName"].toUpperCase().includes(filterBy.toUpperCase());
        });


      }else
        accountsForSegment = listUniqueAccountIds;
      this.allSetviceAccounts = this.getAccountListForSegment(accountsForSegment);

      return this.allSetviceAccounts;

    },

    extractAccountTypes:function(data){

      let list3DetAccount = data.map(elem => ({accountId:elem['accountId'], accountName:elem['accountName'], accountType:elem['accountType']}));
      return list3DetAccount.filter((elem, i, array) => array.findIndex(elem2 => elem2['accountId'] === elem['accountId']) === i);

    },

    getAccountListForSegment:function(listUniqueAccountIds){

      let typesList = listUniqueAccountIds.reduce(function (r, a) {
        r[a.accountType] = r[a.accountType] || [];
        r[a.accountType].push(a);
        return r;
      }, Object.create(null));


      let finalList =  Object.values(typesList);


      var accountType = '';
      let accountList;
      let flag=false;
      let localIndex = 0;
      let result = [];


      for( let typeIndex = 0; typeIndex<finalList.length; typeIndex++){
        accountList = [];
        for( let accountIndex = 0; accountIndex<finalList[typeIndex].length; accountIndex++){

          if (finalList[typeIndex][accountIndex].accountType !== 'NA'){
            accountType = finalList[typeIndex][accountIndex].accountType;
            accountList.push({
              "accountName": finalList[typeIndex][accountIndex].accountName,
              "flxSeparator": {
                "isVisible": true
              }});
          }
        }
        if(accountList.length>0){
          this.view.flxFromNoResults.setVisibility(false);
          this.view.segAccounts.setVisibility(true);
          flag=true;
          result[localIndex]= [
            {
              "flxSeperator": {
                "isVisible": true
              },
              "lblTypeName": {
                "text": accountType + ' (' + finalList[typeIndex].length + ')' 
              },
              "imgChevron": "groupexpandicon.png"
            },
            accountList
          ];
          localIndex ++;
        }else{
          if(flag===false){
             this.view.flxFromNoResults.setVisibility(true);
             this.view.segAccounts.setVisibility(false);
          }
        }
      }

      return result;

    },

    searchAccountNameId:function(){
      try {

        var searchKeyword = this.view.tbxSearch.text;
        if (searchKeyword.length >= 1) {         
          this.view.segAccounts.setData(this.accountListValues(this.collectionObj.Cache.ServiceRequest, searchKeyword));
        }
        else {
          this.view.segAccounts.setData(this.accountListValues(this.collectionObj.Cache.ServiceRequest));

        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while sending Search text to form.",
          "error": err
        };
        this.onError(errObj);
      }

    },

    searchServiceRequest:function(){

      var searchCriteria = [];  
      var fromDate;
      var toDate;
      this.searchPerformed = true;

      if (this.dataMapping.searchMenu[0].values !== this.searchMenuInit[0].values)
        searchCriteria.push([this.dataMapping.searchMenu[0].criteria, this.getDisplayText(this.dataMapping.searchMenu[0].values) ]);            
      if (this.dataMapping.searchMenu[1].values !== this.searchMenuInit[1].values)
        searchCriteria.push([this.dataMapping.searchMenu[1].criteria, this.dataMapping.searchMenu[1].values ]); 
      if (this.dataMapping.searchMenu[2].values !== this.searchMenuInit[2].values)
        searchCriteria.push([this.dataMapping.searchMenu[2].criteria, this.dataMapping.searchMenu[2].values ]); 
      if (this.dataMapping.searchMenu[3].values !== this.searchMenuInit[3].values)
        searchCriteria.push([this.dataMapping.searchMenu[3].criteria, this.dataMapping.searchMenu[3].values]); 
      if (this.dataMapping.searchMenu[4].values !== this.searchMenuInit[4].values){
        let dates = this.dataMapping.searchMenu[4].values.split(' - ');
        fromDate = dates[0];
        toDate = dates[1];        
      }

      this.businessController.fetchServiceRequestsBySearch(searchCriteria, fromDate, toDate);

      this.backToList();

    },

    searchServiceKeyword:function(){
      try {
        var searchKeyword = this.view.txtSearchBox.text;
        if (searchKeyword.length >= 3) {  
          this.searchPerformed = true;
          this.businessController.filterData(searchKeyword);
        }
        else { 
          if (searchKeyword.length === 0){
            this.businessController.resetDataList();
          }
        }

      } catch (err) {
        var errObj = {
          "errorInfo": "Error while sending Search text to form.",
          "error": err
        };
        this.onError(errObj);
      }

    },

    setSearchDate:function(fromDate, toDate){

      let valueOfList = fromDate + ' - ' + toDate;
      this.fromDate = fromDate;
      this.toDate = toDate;

      this.dataMapping.searchMenu = this.dataMapping.searchMenu.map(p => p.name === this.dataMapping.searchMenu[4].name? Object.defineProperty(p, "values", {value : valueOfList}) : p);
      this.view.segSearchMenu.setData(this.dataMapping.searchMenu);
      this.hideSearchModals(this.currentFlex);
      this.setActiveSearchBtn();

    },

    activateServiceRequest:function(itemName, seguiWidget, sectionNumber, rowNumber, selectedState){

      let valueOfList = seguiWidget.data[rowNumber].value;
      let valueOfItem = itemName;

      this.dataMapping.searchMenu = this.dataMapping.searchMenu.map(p => p.name === valueOfItem? Object.defineProperty(p, "values", {value : valueOfList}) : p);
      this.view.segSearchMenu.setData(this.dataMapping.searchMenu);
      this.hideSearchModals(this.currentFlex);

      var data = this.collectionObj.Cache.ServiceRequest;

      var typeSubTypeList = data.map(elem => ({
        type_description: elem[this.dataMapping.searchMenu[0].criteria],
        subType_description: elem[this.dataMapping.searchMenu[1].criteria]
      }));
      var uniqueTypesSubtypes = typeSubTypeList.filter((elem, i, array) => array.findIndex(elem2 => elem2[this.dataMapping.searchMenu[0].criteria] === elem[this.dataMapping.searchMenu[0].criteria] && elem2[this.dataMapping.searchMenu[1].criteria] === elem[this.dataMapping.searchMenu[1].criteria]) === i);

      var serviceRequestList = uniqueTypesSubtypes.filter(elem => elem[this.dataMapping.searchMenu[0].criteria] === this.dataMapping.searchMenu[0].values);
      this.serviceRequestValues(serviceRequestList);
      this.view.segServiceRequest.setData(this._field1);
      this.setActiveSearchBtn();
    },
    /**     
	 * Component rowExpandCollapse
     * To expand and collapse group
    **/ 
    rowExpandCollapse: function (context) {
      var self = this;
      try{
        var sectionIndex = context.section;
        if (this.segmentData === '') 
          this.segmentData = JSON.parse(JSON.stringify(this.view.segAccounts.data));

        var data = this.view.segAccounts.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (!JSON.stringify(data).includes("flxNoRecords")) {
          if (selectedHeaderData["imgChevron"] === "groupexpandicon.png") {
            selectedHeaderData["imgChevron"] = "groupcollapseicon.png";
            data[sectionIndex][1] = [];
            this.view.segAccounts.setData(data);
          } else {
            selectedHeaderData["imgChevron"] = "groupexpandicon.png";
            data[sectionIndex][1] = this.segmentData[sectionIndex][1];
            this.view.segAccounts.setData(data);
          }
        }
        this.view.forceLayout();
      }catch (err) {
        var errorObj = {
          "errorInfo": "Error in rowExpandCollapse",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    /**
	* @api : geti18nText
     * This method is used get the i18n text
     * return String
     */
    geti18nText : function(text) {
      var i18ntext = text.substring(text.indexOf("${i18n")+7,text.length-2);
      return kony.i18n.getLocalizedString(i18ntext);
    },
    /**
	* @api : getDisplayText
     * This method is used to get display text
     * return String
     */
    getDisplayText : function(text) {
      if(text.indexOf("${i18n") !== -1){
        return this.geti18nText(text);
      }
      return text;
    },
    setActiveSearchBtn: function(){
      if((this.dataMapping.searchMenu[0].values === this.searchMenuInit[0].values) && (this.dataMapping.searchMenu[1].values === this.searchMenuInit[1].values) && (this.dataMapping.searchMenu[2].values === this.searchMenuInit[2].values) && (this.dataMapping.searchMenu[3].values === this.searchMenuInit[3].values) && (this.dataMapping.searchMenu[4].values === this.searchMenuInit[4].values)){
        this.view.btnSearch.setEnabled(false);
        this.view.btnSearch.skin = "sknBtnOnBoardingInactive";
      } else {
        this.view.btnSearch.setEnabled(true);
        this.view.btnSearch.skin = "sknBtn055BAF26px";
      }
    },
    parseSearchMenu: function(){
      for(i=0;i<this.dataMapping.searchMenu.length;i++){
        this.dataMapping.searchMenu[i].name = this.getDisplayText(this.dataMapping.searchMenu[i].name);
        this.dataMapping.searchMenu[i].values = this.getDisplayText(this.dataMapping.searchMenu[i].values);        
      }
    }
  };
});