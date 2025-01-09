define(["CommonUtilities"], function(CommonUtilities){
  return{
  timerCounter:0,
  //init calls after init
  init : function(){
    try{
      kony.print("Entered init");
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShowForm;
      this.view.postShow = this.postShowForm;
    }catch(e){
      kony.print("Exception in init::"+e);}
  },

  //onNavigate calls after init
  onNavigate : function(){
    try{

    }catch(e){
      kony.print("Exception in onNavigate"+e);
    }
  },

  //preShowForm is called when the form is pre loaded 
  preShowForm : function(){
    try{
      var MenuHandler =  applicationManager.getMenuHandler();
      //MenuHandler.setUpHamburgerForForm(this,"Approval & Request");
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      
     // kony.print("Entered preShowForm");
      this.setupNavBarSkinForiPhone();
      this.initActions();
      this.view.flxShowfilter.isVisible = true;
      var navManager = applicationManager.getNavigationManager();
      var formFlow = navManager.getCustomInfo("ApprovalandRequestHistory");
      if(formFlow === "RequestHistory"){
        this.fetchRequestHistory(); 
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
          this.view.title = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory");
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxFooter.isVisible = false;
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory");
        }

      }else{
        this.fetchApprovalsHistory();
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
          this.view.title = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxFooter.isVisible = false;
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory");
        }
      }

    }catch(e){
      kony.print("Exception in preShowForm::"+e);}
  },

  //postShowForm is called when the form is post loaded 
  postShowForm : function(){
    try{
      kony.print("Entered postShowForm");
      this.setupNavBarSkinForiPhone();
    }catch(e){
      kony.print("Exception in postShowForm::"+e);}
  },

  setupNavBarSkinForiPhone : function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") return;
    try{
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["tintColor"] = "003e7500";
      titleBarAttributes["translucent"] = false;
      this.view.titleBarAttributes = titleBarAttributes;
    }
    catch(er){
    }
  },

  initActions: function(){
    try{
      kony.print("Entered initActions");
      this.view.customHeader.flxBack.onClick = this.navToPrevForm;
      this.view.onDeviceBack=this.dummyFunction;      
      this.view.lblNodatafound.isVisible = false;
      this.view.flxPopup.setVisibility(false);
      this.view.segApprovalHistory.removeAll();
      this.view.txtSearch.text ="";
      //this.view.flxShowfilter.onClick = this.showflxAdvSearch;
      var navManager = applicationManager.getNavigationManager();
      var formFlow = navManager.getCustomInfo("ApprovalandRequestHistory");
      if(formFlow === "RequestHistory"){
        this.view.segApprovalHistory.onRowClick = this.onRowClickRequestHistory;
        this.view.txtSearch.onTextChange = this.searchRequestHistoryOnEmpty;
        this.view.txtSearch.onDone = this.searchRequestHistory;
      }else{
        this.view.segApprovalHistory.onRowClick = this.onRowClickApprovalHistory; 
        this.view.txtSearch.onTextChange = this.searchApprovalsHistoryOnEmpty;
        this.view.txtSearch.onDone = this.searchApprovalHistory;
      }
    }catch(e){kony.print("Exception in initActions"+e);}
  },

  /*
     *navToPrevForm - This function is to called to navigate back to prev form
     **
     */
  dummyFunction: function() {},
  navToPrevForm: function() {
    try {
      var navMan=applicationManager.getNavigationManager();
      navMan.navigateTo("frmApprovalsAndRequestsTitle");
    } catch (e) {
      kony.print("exception navToPrevForm" + e);
    }
  },

  searchApprovalHistory : function(){
    try{
      var scopeObj = this;     
      var searchText = this.view.txtSearch.text;//CommonUtilities.validateSearchString(this.view.txtSearch.text);
      if (searchText.includes("/") && /\d+\/\d+\/\d*/.test(searchText)) {
        searchText = CommonUtilities.getBackendDateFormat(searchText, "mm/dd/yyyy");
      }
      var requestData = {
        "sortByParam":"",
        "sortOrder": "",
        "searchString": searchText,
        "pageSize":"",
        "pageOffset":"",
        "filterByParam":"",
        "filterByValue": "",
      };         
       
        //////****  filter by transtype and status*****///
      var filterdata = this.getFilters();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var filterByStatus =  presenter.presentationController.getFiltersbyStatus();
      if(filterdata === "" && filterByStatus==="") {
        requestData["filterByParam"] = "";
        requestData["filterByValue"] = "";
      }else {
        if(filterdata !==""){
          var numOfFilter = (filterdata.match(/,/g) || []).length + 1;
          var filterddata = "";
          var i = 0;
          if(numOfFilter === 1) {          
              filterddata = "featureName";
            }
          else {
            filterddata = "featureName";
            for(i=0;i<numOfFilter-1;i++) {
              filterddata = filterddata + ",featureName";
            }
          }
        }
        
        if(filterByStatus !==""){
          var numOfFilterStatus = (filterByStatus.match(/,/g) || []).length + 1;
          var filterByStatusparam = "";
          var i = 0;
          if(numOfFilterStatus === 1) {
            if(filterByStatus==="Approved" || filterByStatus==="Rejected" || filterByStatus==="Pending"){
              filterByStatusparam = "status";
            }}
          else {
            filterByStatusparam = "status";
            for(i=0;i<numOfFilterStatus-1;i++) {
              filterByStatusparam = filterByStatusparam + ",status";
            }
          }
        }
        if(!kony.sdk.isNullOrUndefined(filterddata,filterByStatusparam)){
          requestData["filterByParam"] = filterddata+","+filterByStatusparam;
          requestData["filterByValue"] = filterdata+","+filterByStatus;
        }else if(!kony.sdk.isNullOrUndefined(filterddata)){
          requestData["filterByParam"] = filterddata;
          requestData["filterByValue"] = filterdata;
        }else{
          requestData["filterByParam"] = filterByStatusparam;
          requestData["filterByValue"] = filterByStatus;
        }
       
      }
       //////**** End filter by transtype and status*****///
      
      //////****filter by Duration*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterByDuration =  presenter.presentationController.getFiltersbyDuration();
      if(filterByDuration === "") {
        requestData["timeParam"] = "";
        requestData["timeValue"] = "";
      }else{
        requestData["timeParam"] = "sentDate";
        requestData["timeValue"] = filterByDuration;
      }
       //////**** End filter by Duration*****///
      
       //////****filter by Sort*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterBySort =  presenter.presentationController.getFiltersbySort();
      if(filterBySort === "") {
        requestData["sortByParam"] = "";
        requestData["sortOrder"] = "";
      }else{
        requestData["sortByParam"] = filterBySort;
        requestData["sortOrder"] = "ASC";
      }
       //////**** End filter by sort*****///         
      var ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      ApprovalsReqUIModule.presentationController.getApprovalsHistory(requestData);
    }catch(e){
      kony.print("Exception in setDataInSegment"+e);
    }
  },
  
  searchRequestHistory : function(){
    try{
      var scopeObj = this;     
      var searchText = this.view.txtSearch.text;//CommonUtilities.validateSearchString(this.view.txtSearch.text);
      if (searchText.includes("/") && /\d+\/\d+\/\d*/.test(searchText)) {
        searchText = CommonUtilities.getBackendDateFormat(searchText, "mm/dd/yyyy");
      }
      var requestData = {
        "sortByParam":"",
        "sortOrder": "",
        "searchString": searchText,
        "pageSize":"",
        "pageOffset":"",
        "filterByParam":"",
        "filterByValue": "",
      };         
       
       //////****  filter by transtype and status*****///
      var filterdata = this.getFilters();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var filterByStatus =  presenter.presentationController.getFiltersbyStatus();
      if(filterdata === "" && filterByStatus==="") {
        requestData["filterByParam"] = "";
        requestData["filterByValue"] = "";
      }else {
        if(filterdata !==""){
          var numOfFilter = (filterdata.match(/,/g) || []).length + 1;
          var filterddata = "";
          var i = 0;
          if(numOfFilter === 1) {          
              filterddata = "featureName";
            }
          else {
            filterddata = "featureName";
            for(i=0;i<numOfFilter-1;i++) {
              filterddata = filterddata + ",featureName";
            }
          }
        }
        
        if(filterByStatus !==""){
          var numOfFilterStatus = (filterByStatus.match(/,/g) || []).length + 1;
          var filterByStatusparam = "";
          var i = 0;
          if(numOfFilterStatus === 1) {
            if(filterByStatus==="Approved" || filterByStatus==="Rejected" || filterByStatus==="Pending"  || filterByStatus==="Withdrawn"){
              filterByStatusparam = "status";
            }}
          else {
            filterByStatusparam = "status";
            for(i=0;i<numOfFilterStatus-1;i++) {
              filterByStatusparam = filterByStatusparam + ",status";
            }
          }
        }
        if(!kony.sdk.isNullOrUndefined(filterddata,filterByStatusparam)){
          requestData["filterByParam"] = filterddata+","+filterByStatusparam;
          requestData["filterByValue"] = filterdata+","+filterByStatus;
        }else if(!kony.sdk.isNullOrUndefined(filterddata)){
          requestData["filterByParam"] = filterddata;
          requestData["filterByValue"] = filterdata;
        }else{
          requestData["filterByParam"] = filterByStatusparam;
          requestData["filterByValue"] = filterByStatus;
        }
       
      }
       //////**** End filter by transtype and status*****///
      
      //////****filter by Duration*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterByDuration =  presenter.presentationController.getFiltersbyDuration();
      if(filterByDuration === "") {
        requestData["timeParam"] = "";
        requestData["timeValue"] = "";
      }else{
        requestData["timeParam"] = "sentDate";
        requestData["timeValue"] = filterByDuration;
      }
       //////**** End filter by Duration*****///
      
       //////****filter by Sort*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterBySort =  presenter.presentationController.getFiltersbySort();
      if(filterBySort === "") {
        requestData["sortByParam"] = "";
        requestData["sortOrder"] = "";
      }else{
        requestData["sortByParam"] = filterBySort;
        requestData["sortOrder"] = "ASC";
      }
       //////**** End filter by sort*****///
      var ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      ApprovalsReqUIModule.presentationController.getRequestAllHistory(requestData);
    }catch(e){
      kony.print("Exception in setDataInSegment"+e);
    }
  },
  
  searchApprovalsHistoryOnEmpty:function()
  {
    try{    
      var searchText = this.view.txtSearch.text;
      if(searchText === ""){          
        this.fetchApprovalsHistory();
      }
    }catch(err){ 
      kony.print("Error search---->"+err);
    } 
  },
  
   searchRequestHistoryOnEmpty:function()
  {
    try{    
      var searchText = this.view.txtSearch.text;
      if(searchText === ""){          
        this.fetchRequestHistory();
      }
    }catch(err){ 
      kony.print("Error search---->"+err);
    } 
  },

  fetchApprovalsHistory : function(){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var scopeObj = this;      
      var requestData = {       
        "searchString":"",
        "pageSize":"",
        "pageOffset":"",
        "filterByParam":"",
        "filterByValue": "",  
      };         
         //////****  filter by transtype and status*****///
      var filterdata = this.getFilters();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var filterByStatus =  presenter.presentationController.getFiltersbyStatus();
      if(filterdata === "" && filterByStatus==="") {
        requestData["filterByParam"] = "";
        requestData["filterByValue"] = "";
      }else {
        if(filterdata !==""){
          var numOfFilter = (filterdata.match(/,/g) || []).length + 1;
          var filterddata = "";
          var i = 0;
          if(numOfFilter === 1) {          
              filterddata = "featureName";
            }
          else {
            filterddata = "featureName";
            for(i=0;i<numOfFilter-1;i++) {
              filterddata = filterddata + ",featureName";
            }
          }
        }
        
        if(filterByStatus !==""){
          var numOfFilterStatus = (filterByStatus.match(/,/g) || []).length + 1;
          var filterByStatusparam = "";
          var i = 0;
          if(numOfFilterStatus === 1) {
            if(filterByStatus==="Approved" || filterByStatus==="Rejected" || filterByStatus==="Pending"){
              filterByStatusparam = "status";
            }}
          else {
            filterByStatusparam = "status";
            for(i=0;i<numOfFilterStatus-1;i++) {
              filterByStatusparam = filterByStatusparam + ",status";
            }
          }
        }
        if(!kony.sdk.isNullOrUndefined(filterddata,filterByStatusparam)){
          requestData["filterByParam"] = filterddata+","+filterByStatusparam;
          requestData["filterByValue"] = filterdata+","+filterByStatus;
        }else if(!kony.sdk.isNullOrUndefined(filterddata)){
          requestData["filterByParam"] = filterddata;
          requestData["filterByValue"] = filterdata;
        }else{
          requestData["filterByParam"] = filterByStatusparam;
          requestData["filterByValue"] = filterByStatus;
        }
       
      }
       //////**** End filter by transtype and status*****///
      
      //////****filter by Duration*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterByDuration =  presenter.presentationController.getFiltersbyDuration();
      if(filterByDuration === "") {
        requestData["timeParam"] = "";
        requestData["timeValue"] = "";
      }else{
        requestData["timeParam"] = "sentDate";
        requestData["timeValue"] = filterByDuration;
      }
       //////**** End filter by Duration*****///
      
       //////****filter by Sort*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterBySort =  presenter.presentationController.getFiltersbySort();
      if(filterBySort === "") {
        requestData["sortByParam"] = "";
        requestData["sortOrder"] = "";
      }else{
        requestData["sortByParam"] = filterBySort;
        requestData["sortOrder"] = "ASC";
      }
       //////**** End filter by sort*****///
      
      var ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      ApprovalsReqUIModule.presentationController.getApprovalsHistory(requestData);
    }catch(e){
      kony.print("Exception in setDataInSegment"+e);
    }
  },

  fetchApprovalsHistorySuccesscallback : function(response){
    try{
      this.view.lblFiltertype.text="";
      if(Array.isArray(response)){
        if(response.length!==0){
          this.view.lblFiltertype.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+"("+response.length+")";
          this.view.lblNodatafound.isVisible = false; 
          this.view.segApprovalHistory.widgetDataMap={
            "lblPaymentType":"lblPaymentType",
            "lblDate":"lblDate",
            "lblPaymentMode":"lblPaymentMode",
            "lblName":"lblName",
            "imgStatus":"imgStatus"
          };
          this.view.segApprovalHistory.setData(response);           
        }else{
          this.view.segApprovalHistory.removeAll();
          this.view.lblNodatafound.isVisible = true;        
        }      
      }   
      applicationManager.getPresentationUtility().dismissLoadingScreen();

    }catch(e){
      kony.print("Exception in fetchApprovalsHistorySuccesscallback"+e);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  
  onRowClickApprovalHistory:function()
  {
    try{    
      var selecteditems=this.view.segApprovalHistory.selectedRowItems;
      var navManager = applicationManager.getNavigationManager(); 
       if(selecteditems[0].featureActionId === "ACH_PAYMENT_CREATE" || selecteditems[0].featureActionId === "ACH_COLLECTION_CREATE"){
        navManager.setCustomInfo("formFlow","ApprovalHistoryACHTransaction");        
        navManager.setCustomInfo("ApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");      
      }else if(selecteditems[0].featureActionId === "ACH_FILE_UPLOAD"){
        navManager.setCustomInfo("formFlow","ApprovalHistoryACHFile");        
        navManager.setCustomInfo("ApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT"){
        navManager.setCustomInfo("formFlow","ApprovalHistoryBulkPayment");        
        navManager.setCustomInfo("ApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT"){
        navManager.setCustomInfo("formFlow","ApprovalHistoryBulkPayment");        
        navManager.setCustomInfo("ApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "CHEQUE_BOOK_REQUEST_CREATE"){
        navManager.setCustomInfo("formFlow","ApprovalHistoryChequeBook");        
        navManager.setCustomInfo("chequeBookApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }
      else{
        navManager.setCustomInfo("formFlow","ApprovalHistoryTransaction");        
        navManager.setCustomInfo("ApprovalHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");
      }
      
    }catch(err){ 
      kony.print("Error onRowClickApprovalHistory---->"+err);
    } 
  },

  fetchRequestHistory : function(filterByParam, filterByValue){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var scopeObj = this;          
      var requestData = {
        "sortByParam":"",
        "sortOrder": "",
        "searchString":"",
        "pageSize":"",
        "pageOffset":"",
        "filterByParam":"",
        "filterByValue": "",
      };         
       
       //////****  filter by transtype and status*****///
      var filterdata = this.getFilters();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var filterByStatus =  presenter.presentationController.getFiltersbyStatus();
      if(filterdata === "" && filterByStatus==="") {
        requestData["filterByParam"] = "";
        requestData["filterByValue"] = "";
      }else {
        if(filterdata !==""){
          var numOfFilter = (filterdata.match(/,/g) || []).length + 1;
          var filterddata = "";
          var i = 0;
          if(numOfFilter === 1) {          
              filterddata = "featureName";
            }
          else {
            filterddata = "featureName";
            for(i=0;i<numOfFilter-1;i++) {
              filterddata = filterddata + ",featureName";
            }
          }
        }
        
        if(filterByStatus !==""){
          var numOfFilterStatus = (filterByStatus.match(/,/g) || []).length + 1;
          var filterByStatusparam = "";
          var i = 0;
          if(numOfFilterStatus === 1) {
            if(filterByStatus==="Approved" || filterByStatus==="Rejected" || filterByStatus==="Pending"  || filterByStatus==="Withdrawn"){
              filterByStatusparam = "status";
            }}
          else {
            filterByStatusparam = "status";
            for(i=0;i<numOfFilterStatus-1;i++) {
              filterByStatusparam = filterByStatusparam + ",status";
            }
          }
        }
        if(!kony.sdk.isNullOrUndefined(filterddata,filterByStatusparam)){
          requestData["filterByParam"] = filterddata+","+filterByStatusparam;
          requestData["filterByValue"] = filterdata+","+filterByStatus;
        }else if(!kony.sdk.isNullOrUndefined(filterddata)){
          requestData["filterByParam"] = filterddata;
          requestData["filterByValue"] = filterdata;
        }else{
          requestData["filterByParam"] = filterByStatusparam;
          requestData["filterByValue"] = filterByStatus;
        }
       
      }
       //////**** End filter by transtype and status*****///
      
      //////****filter by Duration*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterByDuration =  presenter.presentationController.getFiltersbyDuration();
      if(filterByDuration === "") {
        requestData["timeParam"] = "";
        requestData["timeValue"] = "";
      }else{
        requestData["timeParam"] = "sentDate";
        requestData["timeValue"] = filterByDuration;
      }
       //////**** End filter by Duration*****///
      
       //////****filter by Sort*****///
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var filterBySort =  presenter.presentationController.getFiltersbySort();
      if(filterBySort === "") {
        requestData["sortByParam"] = "";
        requestData["sortOrder"] = "";
      }else{
        requestData["sortByParam"] = filterBySort;
        requestData["sortOrder"] = "ASC";
      }
       //////**** End filter by sort*****///

      var ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      ApprovalsReqUIModule.presentationController.getRequestAllHistory(requestData);
    }catch(e){
      kony.print("Exception in fetchRequestHistory"+e);
    }
  },

  fetchRequestHistorySuccesscallback : function(response){
    try{
      if(Array.isArray(response)){
        this.view.lblFiltertype.text="";
        if(response.length!==0){
           this.view.lblFiltertype.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+"("+response.length+")";
          this.view.lblNodatafound.isVisible = false; 
          this.view.segApprovalHistory.widgetDataMap={
            "lblPaymentType":"lblPaymentType",
            "lblDate":"lblDate",
            "lblPaymentMode":"lblPaymentMode",
            "lblName":"lblName",
            "imgStatus":"imgStatus"
          };
          this.view.segApprovalHistory.setData(response);           
        }else{
          this.view.segApprovalHistory.removeAll();
          this.view.lblNodatafound.isVisible = true;        
        }      
      }   
      applicationManager.getPresentationUtility().dismissLoadingScreen();

    }catch(e){
      kony.print("Exception in fetchRequestHistorySuccesscallback"+e);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  
    onRowClickRequestHistory:function()
  {
    try{       
      var selecteditems=this.view.segApprovalHistory.selectedRowItems;
      var navManager = applicationManager.getNavigationManager(); 
      if(selecteditems[0].featureActionId === "ACH_PAYMENT_CREATE" || selecteditems[0].featureActionId === "ACH_COLLECTION_CREATE"){
        navManager.setCustomInfo("formFlow","RequestHistoryACHTransaction");        
        navManager.setCustomInfo("RequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail")
      }else if(selecteditems[0].featureActionId === "ACH_FILE_UPLOAD"){
        navManager.setCustomInfo("formFlow","RequestHistoryACHFile");        
        navManager.setCustomInfo("RequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "BULK_PAYMENT_SINGLE_SUBMIT"){
        navManager.setCustomInfo("formFlow","RequestHistoryBulkPayment");        
        navManager.setCustomInfo("RequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "BULK_PAYMENT_MULTIPLE_SUBMIT"){
        navManager.setCustomInfo("formFlow","RequestHistoryBulkPayment");        
        navManager.setCustomInfo("RequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");       
      }else if(selecteditems[0].featureActionId === "CHEQUE_BOOK_REQUEST_CREATE"){
        navManager.setCustomInfo("formFlow","RequestHistoryChequeBook");        
        navManager.setCustomInfo("chequeBookRequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail"); 
      }
      else{
        navManager.setCustomInfo("formFlow","RequestHistoryTransaction");        
        navManager.setCustomInfo("RequestHistoryDetails",selecteditems);                    
        navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail");
      }
       
    }catch(err){ 
      kony.print("Error onRowClickRequestHistory---->"+err);
    } 
  },
  
  errorCallback:function(response)
  {
    try {    
      if(!kony.sdk.isNullOrUndefined(response)){
        var scopeObj=this;
        var errorResponse = response.errorMessage;
        this.view.flxPopup.customPopup.lblPopup.text = errorResponse;      
        this.timerCounter=parseInt(this.timerCounter)+1;
        var timerId="timerPopupError"+this.timerCounter;
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";    
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
          scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);             
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      kony.print("frmACHTransactions fetchErrorcallBack-->"+error);
    }       
  },

  showflxAdvSearch : function() {
    var scope = this;
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    scope.view.filter.btnSelectTransactionType.onClick = function(){
      var scopex = this;
      scopex.view.filter.setVisibility(false);
      this.view.forceLayout();
    }.bind(scope);
    scope.view.filter.btnAll = function(){
      this.setupDataFromFilter("");
      this.view.filter.setVisibility(false);
      this.view.forceLayout();
    }.bind(scope);
    scope.view.filter.segSingleTransactions.onRowClick = function(context1,context2,context3){
      this.setupDataFromFilter("");
      this.view.filter.setVisibility(false);
      this.view.forceLayout();
    }.bind(scope);
    scope.view.filter.segBulkTransactions = function(context1,context2,context3){
      this.setupDataFromFilter("");
      this.view.filter.setVisibility(false);
      this.view.forceLayout();
    }.bind(scope);
    scope.view.filter.segOtherRequests = function(context1,context2,context3){
      this.setupDataFromFilter("");
      this.view.filter.setVisibility(false);
      this.view.forceLayout();
    }.bind(scope);
    scope.view.filter.segSingleTransactions.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };
    scope.view.filter.segBulkTransactions.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };
    scope.view.filter.segOtherRequests.widgetDataMap = {
      "flxApprovalsAndRequestFilter": "flxApprovalsAndRequestFilter",
      "flxText": "flxText",
      "imgSelect": "imgSelect",
      "lblCounter": "lblCounter",
      "lblSeperator": "lblSeperator",
      "lblText": "lblText"
    };

    if(presenter.presentationController.isSingleApprovalsPendingAvailable) {
      var segSingleData = presenter.presentationController.singleApprovalsPending;
      var i = 0;
      for(i = 0; i < segSingleData.length; i++) {
        if(this.selectedFilter !== "") {
          if(segSingleData[i]["lblText"] === this.selectedFilter)
            segSingleData[i]["imgSelect"] = "tickmark_green.png";
          else
            segSingleData[i]["imgSelect"] = "transparent.png";
        }
        else {
          segSingleData[i]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.filter.segSingleTransactions.setData(segSingleData);
      scope.view.filter.segSingleTransactions.setVisibility(true);
      scope.view.filter.flxSingleTransactions.setVisibility(true);
    }
    else {
      scope.view.filter.flxSingleTransactions.setVisibility(false);
      scope.view.filter.segSingleTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isBulkApprovalsPendingAvailable) {
      var segBulkData = presenter.presentationController.bulkApprovalsPending;
      var i = 0;
      for(i = 0; i < segBulkData.length; i++) {
        if(this.selectedFilter !== "") {
          if(segBulkData[i]["lblText"] === this.selectedFilter)
            segBulkData[i]["imgSelect"] = "tickmark_green.png";
          else
            segBulkData[i]["imgSelect"] = "transparent.png";
        }
        else {
          segBulkData[i]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.filter.segBulkTransactions.setData(segBulkData);
      scope.view.filter.segBulkTransactions.setVisibility(true);
      scope.view.filter.flxBulkTransactions.setVisibility(true);
    }
    else {
      scope.view.filter.flxBulkTransactions.setVisibility(false);
      scope.view.filter.segBulkTransactions.setVisibility(false);
    }

    if(presenter.presentationController.isOtherApprovalsPendingAvailable) {
      var segOtherData = presenter.presentationController.otherApprovalsPending;
      var i = 0;
      for(i = 0; i < segOtherData.length; i++) {
        if(this.selectedFilter !== "") {
          if(segOtherData[i]["lblText"] === this.selectedFilter)
            segOtherData[i]["imgSelect"] = "tickmark_green.png";
          else
            segOtherData[i]["imgSelect"] = "transparent.png";
        }
        else {
          segOtherData[i]["imgSelect"] = "transparent.png";
        }
      }
      scope.view.filter.segBulkTransactions.setData(segOtherData);
      scope.view.filter.segBulkTransactions.setVisibility(true);
      scope.view.filter.flxBulkTransactions.setVisibility(true);
    }
    else {
      scope.view.filter.flxBulkTransactions.setVisibility(false);
      scope.view.filter.segBulkTransactions.setVisibility(false);
    }
    scope.view.filter.lblAllCounter = "("+presenter.presentationController.allApprovalsPendingCount+")";
    if (applicationManager.getDeviceUtilManager().isIPhone()) {
      scope.view.filter.top = "0dp";
    }
    else {
      scope.view.filter.top = "50dp";
    }
    scope.view.filter.setVisibility(true);
    this.view.forceLayout();
  },

  setFilters : function(data) {
    if(kony.sdk.isNullOrUndefined(data)) data = "";
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    return presenter.presentationController.setFilters(data);
  },
  getFilters : function() {
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    return presenter.presentationController.getFilters();
  },

  fetchCounts : function() {
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
    if(presenter.presentationController.hasCountsServiceFailed === 0)
    presenter.presentationController.getAllCounts();
  },

  setupDataFromFilter : function(selectedData) {
    var data = "";
    var datatype = "";
    if(kony.sdk.isNullOrUndefined(selectedData)) {
      data = "";
      datatype = "";
    }
    else {
      data = selectedData;
      datatype = "featureName";
    }
    this.selectedFilter = data;
    this.fetchApprovalsHistory(datatype, data);
    //setupApprovalHistory : "filterByParam":datatype, "filterByValue":data
  },
}
});