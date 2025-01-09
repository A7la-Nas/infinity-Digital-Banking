define(["CommonUtilities"], function(CommonUtilities){ 
  return{
    mockDataApprovals : {"BBGeneralTransaction":[{"Status":"Pending","TransactionType":"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE","DebitOrCreditAccount":"200425033823231","AccountName":"Business Advantage Savings-X3231","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"2","CreatedOn":"2020-04-25 03:38:37.0","TransactionType_id":"INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE","Company_id":"200425033822747","Reccurence":"2","Frequency":"Yearly","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"AT&T Mobile-X1232","CreatedBy":"1610413996","TransactionDate":"31/01/2020T09:49:18Z","Transaction_id":"154","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1512","featureName":"International Account to Account Fund Transfer "},{"Status":"Pending","TransactionType":"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE","DebitOrCreditAccount":"200425033823231","AccountName":"Business Advantage Savings-X3231","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"12","CreatedOn":"2020-04-25 03:38:37.0","TransactionType_id":"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE","Company_id":"200425033822747","Frequency":"Once","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"Mobile -X3243","CreatedBy":"1610413996","TransactionDate":"02/02/2020T08:20:10Z","Transaction_id":"320","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1514","featureName":"Transfer between customer own accounts"},{"Status":"Pending","TransactionType":"BILL_PAY_CREATE","DebitOrCreditAccount":"200425033823303","AccountName":"Pro Business Checking-X3303","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"12","CreatedOn":"2020-04-25 03:38:37.0","TransactionType_id":"BILL_PAY_CREATE","Company_id":"200425033822747","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"AT&T Mobile","CreatedBy":"1610413996","TransactionDate":"03/02/2020T08:25:39Z","Transaction_id":"324","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1509","featureName":"Bill Payment Service"},{"Status":"Pending","TransactionType":"INTRA_BANK_FUND_TRANSFER_CREATE","DebitOrCreditAccount":"200425033823266","AccountName":"Progress Business Checking-X3266","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"12","CreatedOn":"2020-04-25 03:38:37.0","TransactionType_id":"INTRA_BANK_FUND_TRANSFER_CREATE","Company_id":"200425033822747","Frequency":"Once","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"Airtel comm...-X2343","CreatedBy":"1610413996","TransactionDate":"05/02/2020T08:29:17Z","Transaction_id":"179","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1511","featureName":"Intra Bank Fund Transfer"},{"Status":"Pending","TransactionType":"DOMESTIC_WIRE_TRANSFER_CREATE","DebitOrCreditAccount":"200425033823231","AccountName":"Business Advantage Savings-X3231","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"20","CreatedOn":"2020-04-25 03:38:38.0","TransactionType_id":"DOMESTIC_WIRE_TRANSFER_CREATE","Company_id":"200425033822747","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"AT&T-X3244","CreatedBy":"1610413996","TransactionDate":"03/02/2020T03:38:38Z","Transaction_id":"1996","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1516","featureName":"Domestic Wire Transfer"},{"Status":"Pending","TransactionType":"INTERNATIONAL_WIRE_TRANSFER_CREATE","DebitOrCreditAccount":"200425033823231","AccountName":"Business Advantage Savings-X3231","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"10","CreatedOn":"2020-04-25 03:38:38.0","TransactionType_id":"INTERNATIONAL_WIRE_TRANSFER_CREATE","Company_id":"200425033822747","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"L&T-X7382","CreatedBy":"1610413996","TransactionDate":"03/02/2020T03:38:38Z","Transaction_id":"1995","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1515","featureName":"International Wire Transfer"},{"Status":"Pending","TransactionType":"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE","DebitOrCreditAccount":"200425033823231","AccountName":"Business Advantage Savings-X3231","companyName":"Sugar Dough Bakers Inc._KalyaniFinalSB","Amount":"2","CreatedOn":"2020-04-25 03:38:37.0","TransactionType_id":"INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE","Company_id":"200425033822747","Reccurence":"2","Frequency":"Yearly","StatusValue":"Pending","userName":"KalyaniFinalSB","Payee":"Airtel c....-x3245","CreatedBy":"1610413996","TransactionDate":"03/02/2020T09:49:18Z","Transaction_id":"170","createdby":"1610413996","receivedApprovals":"0","requiredApprovals":"1","Request_id":"1510","featureName":"Interbank Account to Account Fund Transfer"}],"opstatus":0,"httpStatusCode":0},
    _prevFormData : {},
    _isApprovalsOrRequests : "",
    _constantsSkin : {"headerImgUp" : "arrowupblue.png", "imgReject" : "cancelreject.png","imgApprove" : "approvetick.png", "flxApproveSkin": "sknUnderlinef639afTab","flxRejectSkin" : "sknflxf6f6f6Bcg"},
    _fetchParams : {},
    _approvalsReqModule : null,
    _originalArrayRequests : [],
    _timerCounter : 0,
    _processedDataGeneralTransactionRequests : null,
    _processedDataACHTransactionRequests : null,
    _processedDataACHFilesRequests : null,
    _serviceCounter : 0,
    /*
     *init is called when the form is loaded , initialisation happen here
     *
     */
    init : function(){
      try{
        kony.print("Entered init");
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
        this._approvalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");

        this.view.preShow = this.preShowForm;
        this.view.postShow = this.postShowForm;

      }catch(e){
        kony.print("ExceptionLogger in init::"+e);}
    },

    /*
     *OnNavigate is called when the form is navigated after init , 
     *
     */
    onNavigate: function() {
      try {
        kony.print("onNavigate inside" );
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
      } catch (e) {
        kony.print("Exception in onNavigate" + e);
      }
    },

    //preShowForm is called when the form is pre loaded 
    preShowForm : function(){
      try{
        kony.print("Entered preShowForm");
        var MenuHandler =  applicationManager.getMenuHandler();
        //MenuHandler.setUpHamburgerForForm(this,"Approval & Request");
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        this.view.customHeader.imgBack.src = "backbutton.png";
        this.initActions();
        this.resetForm();
        this.fetchDataBasedOnPermissions();
        this.selectedFilter = "";
        this.hasFilterBeenSetup = false;
        this.view.filter.setVisibility(false);
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
			this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
			this.view.customHeader.flxBack.isVisible = true;
		}
      }catch(e){
        kony.print("Exception in preShowForm::"+e);}
    },

    fetchDataBasedOnPermissions : function(){
      var configManager = applicationManager.getConfigurationManager();
      var isViewGeneralTransactionsEnabled = configManager.getViewGeneralTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHTransactionsEnabled = configManager.getViewACHTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHFilesEnabled = configManager.getViewACHFilePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var requestData = {
        "sortByParam":"",
        "sortOrder": "", //createdts
        "searchString": "",
        "pageSize": "" ,
        "pageOffset": "",
        "filterByParam":"",
              "filterByValue": "",
             // "removeByParam": "featureActionId",
              //"removeByValue": "BULK_PAYMENT_REQUEST_SUBMIT"
      };
      this.fetchPendingRequests(requestData);
      /*if(isViewGeneralTransactionsEnabled){
        this.fetchGeneralTransactionRequests();
        this._serviceCounter += 1;
      }
      if(isViewACHTransactionsEnabled){
        this.fetchACHTransactionRequests(); 
        this._serviceCounter += 1;
      }
      if(isViewACHFilesEnabled){
        this.fetchACHFileRequests();
        this._serviceCounter += 1;
      }*/
    },
    
    fetchPendingRequests : function(requestData){
      var scopeObj = this;
      var navObj = requestData;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("formFlow","frmRequestList");
      scopeObj._approvalsReqModule.presentationController.getPendingRequests(navObj);
    },
    
    fetchMyPendingRequestSuccessCallBack :function(response){
      try {
        kony.print("Entered  view controller fetchMyPendingRequestSuccessCallBack"+JSON.stringify(response));
        this.view.segRequestList.removeAll();
        if(response.length === 1){
          if(response[0].template == "flxNoPending"){
             this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+" (0)";
          }else{
             this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+" ("+response.length+")";
          }
        }else{
           this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+" ("+response.length+")";
        }
       
        this._originalArrayRequests = CommonUtilities.cloneJSON(response);
        response.sort(function(a, b) {
          var c = new Date(a.data.sentDate);
          var d = new Date(b.data.sentDate);
          return d-c;
        });

        this.view.segRequestList.setData(response);
        this.view.forceLayout();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.flxPopup.setVisibility(false);
      } catch (error) {
        kony.print("Exception in  fetchMyPendingRequestSuccessCallBack-->" + error);
      }
    },

    setDataAfterServiceCalls : function(){
      var segData = this._approvalsReqModule.presentationController.dataFormToSegMyApprovals(
        this._processedDataGeneralTransactionRequests,
        this._processedDataACHTransactionRequests,
        this._processedDataACHFilesRequests);
      this._originalArrayRequests = CommonUtilities.cloneJSON(segData);
      this.setDataInRequestList(segData);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    //postShowForm is called when the form is post loaded 
    postShowForm : function(){
      try{
        kony.print("Entered postShowForm");
        this.setupNavBarSkinForiPhone();
        this.fetchCounts();
      }catch(e){
        kony.print("Exception in postShowForm::"+e);}
    },

    /*
     *initActions is to bind the actions form widgets
     *
     */
    initActions: function() {
      try {
        kony.print("Entered initActions");
        this.view.segRequestList.onRowClick = this.segListRequestsonRowClick;
        this.view.customHeader.flxBack.onClick = this.navToPrevForm;
        this.view.tbxSearch.onTextChange = this.searchRequestPendingOnEmpty;
        this.view.tbxSearch.onDone=this.searchMyApprovalsServiceCall;
        this.view.withdrawpopup.flxCancel.onClick = this.withdrawCancel;
        this.view.flxWithdrawpopup.onClick = this.dummyFunction;
        this.view.withdrawpopup.flxContainer.onClick = this.dummyFunction;
        this.view.withdrawpopup.txtRejectreason.onTextChange=this.withdrawEnabledButton;
        this.view.withdrawpopup.flxReject.onClick=this.withdrawFunction;
        this.view.onDeviceBack=this.dummyFunction;
        this.view.flxImgUp.onClick=this.showflxAdvSearch;
        this.view.flxImgUp.isVisible=true;

      } catch (e) {
        kony.print("Exception in initActions" + e);
      }
    },

    /*
     *resetForm is to reset the entire form widgets
     *
     */
    resetForm: function() {
      try {
        kony.print("Entered resetForm");
        this._prevFormData = {};
        this.initializeFetchParams();
        this.view.tbxSearch.text = "";
        this.view.flxPopup.isVisible = false;
        this.view.flxWithdrawpopup.isVisible=false;
        this._timerCounter = 0;
        this._serviceCounter = 0;
        this._originalArrayRequests = [];
        this.view.expandCollapseView.segList.removeAll();
        this.view.segRequestList.removeAll();

        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
          this.view.flxFooterMenu.isVisible = true;
          this.view.flxMainContainer.top = "0dp";
          this.view.flxMainContainer.bottom = "60dp";
          this.view.title =  kony.i18n.getLocalizedString("kony.mb.dashboard.pendingRequests");
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingRequests");
          this.view.flxFooterMenu.isVisible = false;
          this.view.flxMainContainer.top = "56dp";
          this.view.flxMainContainer.bottom = "0dp";
        }

         var widgetDataMapping = {
          "lblTransaction": "lblTransaction",
          "lblTransactionAmount": "lblTransactionAmount",
          "flxSeparator": "flxSeparator",
          "flxWrapper": "flxWrapper",
          "imgIndicator": "imgIndicator",
          "lblDate": "lblDate",
          "lblStatus": "lblStatus",
          "flxApprovalReqExpColHeader": "flxApprovalReqExpColHeader",
          "flxImgUp": "flxImgUp",
          "imgUpArrow": "imgUpArrow",
          "lblHeader": "lblHeader",
          "flxNoPending": "flxNoPending",
          "flxRequestList" : "flxRequestList",
          "flxApprove": "flxApprove",
          "imgApprove": "imgApprove",
          "lblApprove": "lblApprove",
          "lblTransactionPending" : "lblTransactionPending"
        };
        this.view.segRequestList.widgetDataMap = widgetDataMapping;
      } catch (e) {
        kony.print("Exception in resetForm" + e);
      }
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
    withdrawCancel :function(){
      this.view.flxWithdrawpopup.isVisible=false;
    },

    dummyFunction :function(){

    },
    withdrawEnabledButton:function()
    {
      try {  
        if(this.view.withdrawpopup.txtRejectreason.text==="" || this.view.withdrawpopup.txtRejectreason.text===null){
          this.view.withdrawpopup.flxReject.setEnabled(false);
        }else{
          this.view.withdrawpopup.flxReject.setEnabled(true);
        }
      }catch(error){
        kony.print("withdrawEnabledButton-->"+error);
      }       
    },

    initializeFetchParams : function(){
      this._fetchParams = {
        "searchString": "",
        "sortByParam": "createdts",
        "sortOrder": "DESC",
        "pageSize": 100,
        "pageOffset": 0,
        "filterByTransactionType" : "",
        "filterByStatus" : ""
      };
    },

    /*
     *setDataInRequestList - This function is to set the data inside the segment
     **
     */
    setDataInRequestList: function(segData) {
      try {
        kony.print("entered setDataInRequestList"+JSON.stringify(segData));

        var widgetDataMapping = {
          "lblTransaction": "lblTransaction",
          "lblTransactionAmount": "lblTransactionAmount",
          "flxSeparator": "flxSeparator",
          "flxWrapper": "flxWrapper",
          "imgIndicator": "imgIndicator",
          "lblDate": "lblDate",
          "lblStatus": "lblStatus",
          "flxApprovalReqExpColHeader": "flxApprovalReqExpColHeader",
          "flxImgUp": "flxImgUp",
          "imgUpArrow": "imgUpArrow",
          "lblHeader": "lblHeader",
          "flxNoPending": "flxNoPending",
          "flxRequestList" : "flxRequestList",
          "flxApprove": "flxApprove",
          "imgApprove": "imgApprove",
          "lblApprove": "lblApprove",
          "lblTransactionPending" : "lblTransactionPending"
        };
        var dataArr = [] ;
        dataArr = CommonUtilities.cloneJSON(segData);
         this.view.segRequestList.widgetDataMap(widgetDataMapping);
        //var addHeaderCountArr = this.setHeaderCount(dataArr);
        //this.view.expandCollapseView.setDataInList(widgetDataMapping, addHeaderCountArr);
        this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")+" ("+response.length+")";
        this.view.segRequestList.setData(segData);

      } catch (e) {
        kony.print("Exception in setDataInRequestList" + e);
      }
    },


    /*
    *setHeaderCount - Header count need to be added 
   *
    */
    setHeaderCount : function(segDataArr){
      try{
        kony.print("Entered setHeaderCount");

        for(var i = 0; i < segDataArr.length; i++){
          if(segDataArr[i][1].length > 0){
            var countOfRowInHeader = segDataArr[i][1].length ;
            if(segDataArr[i][1][0].template !== "flxNoPending"){
              segDataArr[i][0].lblHeader.text = segDataArr[i][0].lblHeader.text +" ("+countOfRowInHeader+")";
            }else{
              segDataArr[i][0].lblHeader.text = segDataArr[i][0].lblHeader.text +" (0)";
            }
          }
        }
        return segDataArr;
      }catch(e){
        kony.print("Exception in setHeaderCount::"+e);}
    },
    
      /*
  **searchMyApprovalsServiceCall
  **
  */
    searchMyApprovalsServiceCall : function(){
      try{
        kony.print("Entered searchMyApprovalsServiceCall");
        var searchText = this.view.tbxSearch.text;//CommonUtilities.validateSearchString(this.view.tbxSearch.text);
        if (searchText.includes("/") && /\d+\/\d+\/\d*/.test(searchText)) {
          searchText = CommonUtilities.getBackendDateFormat(searchText, "mm/dd/yyyy");
        }
        var requestData = {
        "sortByParam":"",
        "sortOrder": "", //createdts
        "searchString": searchText,
        "pageSize": "" ,
        "pageOffset": "",
        "filterByParam":"",
                  "filterByValue": "",
               //   "removeByParam": "featureActionId",
                 // "removeByValue": "BULK_PAYMENT_REQUEST_SUBMIT"
      };
      this.fetchPendingRequests(requestData);
     
      }catch(e){
        kony.print("Exception in searchMyApprovalsServiceCall::"+e);}
    },

    /**searchMyRequestsListLocal
  **
  */
    searchMyRequestsListLocal : function(){
      try{
        kony.print("Entered searchMyRequestsListLocal");

        var searchText = this.view.tbxSearch.text.toLowerCase();
        if(searchText === ""){
          this.setDataInRequestList(this._originalArrayRequests);
          return;
        }

        if(searchText.length > 2){
          var segData = CommonUtilities.cloneJSON(this._originalArrayRequests);

          var addSearchedArr = [];

          for(var i =0 ; i<segData.length; i++){
            kony.print("i::"+i);
            addSearchedArr = [];

            var rowItems = segData[i][1];
            if(rowItems.length > 0){
              if(rowItems[0].template !== "flxNoPending"){
                for(var j =0 ; j<rowItems.length; j++){
                  var lblTransactionAP = rowItems[j].lblTransaction.text.toLowerCase();
                  var lblDateAP = rowItems[j].lblDate.text.toLowerCase();
                  var achTransTemplateName = kony.sdk.isNullOrUndefined(rowItems[j].data.TemplateName) ? ""  : rowItems[j].data.TemplateName.toLowerCase();
                  var achTransReqType = kony.sdk.isNullOrUndefined(rowItems[j].data.RequestType) ? ""  : rowItems[j].data.RequestType.toLowerCase();
                  var achFileReqType = kony.sdk.isNullOrUndefined(rowItems[j].data.FileRequestType) ? ""  : rowItems[j].data.FileRequestType.toLowerCase();
                  var achFileName = kony.sdk.isNullOrUndefined(rowItems[j].data.FileName) ? ""  : rowItems[j].data.FileName.toLowerCase();
                  var debitorCreditAccount = kony.sdk.isNullOrUndefined(rowItems[j].data.DebitOrCreditAccount) ? ""  : rowItems[j].data.DebitOrCreditAccount.toLowerCase();
                  var debitAccounts = kony.sdk.isNullOrUndefined(rowItems[j].data.debitAccounts) ? ""  : rowItems[j].data.debitAccounts.toLowerCase();
                  var debitAccount = kony.sdk.isNullOrUndefined(rowItems[j].data.DebitAccount) ? ""  : rowItems[j].data.DebitAccount.toLowerCase();

                  if(lblTransactionAP.indexOf(searchText) > -1 || lblDateAP.indexOf(searchText) > -1 ||
                     achTransReqType.indexOf(searchText) > -1 || achTransTemplateName.indexOf(searchText) > -1 ||
                     achFileName.indexOf(searchText) > -1 || achFileReqType.indexOf(searchText) > -1 ||
                     debitorCreditAccount.indexOf(searchText) > -1 || debitAccounts.indexOf(searchText) > -1 ||
                     debitAccount.indexOf(searchText) > -1  ){
                    addSearchedArr.push(rowItems[j]);
                  }
                }//End of rowITems for loop

                if (addSearchedArr.length === 0) {
                  var pendingName = "";
                  if(segData[i][0].lblHeader.text === "Transactions"){
                    pendingName = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoTransactionRequests");
                  }else if(segData[i][0].lblHeader.text === "ACH Transactions"){
                    pendingName = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoACHTransactionRequests") ;        
                  }else if(segData[i][0].lblHeader.text === "ACH Files"){
                    pendingName = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoACHFileRequests");     
                  }
                  addSearchedArr.push({
                    "template": "flxNoPending",
                    "lblTransactionPending": {
                      "text": pendingName
                    },
                    "flxNoPending": {
                      "isVisible": true,
                      "height": "80dp"
                    }
                  });
                }
                segData[i].pop();
                segData[i].push(addSearchedArr);
              }
            }
          }//End of header for Loop
          kony.print("searchMyApprovalsListLocal segData"+JSON.stringify(segData));
          this.setDataInRequestList(segData);
        }
      }catch(e){
        kony.print("Exception in searchMyRequestsListLocal::"+e);}
    },

    /*
     *segListRequestsonRowClick - This function is to called on row click of the segment
     *
     */
    segListRequestsonRowClick: function() {
      try {
        kony.print("entered segListRequestsonRowClick:: ");
        var selectedHeaderIndex = this.view.segRequestList.selectedRowIndex;
        var selecteditems = this.view.segRequestList.selectedRowItems;
        var device = kony.os.deviceInfo();
        var type = device.name;
        var noPending;

        if(type !== "iPhone"){
          noPending = selecteditems[0].template.id;
        }else{
          noPending = selecteditems[0].template;
        } 
        if(noPending === "flxNoPending"){

        }else{
          var navManager = applicationManager.getNavigationManager();
          if(selecteditems[0].data.featureActionId == "ACH_PAYMENT_CREATE" || 
           selecteditems[0].data.featureActionId == "ACH_COLLECTION_CREATE"){
          navManager.setCustomInfo("formFlow","ACHTransactionDetailsRequests");        
          navManager.setCustomInfo("ACHTranactionDetails",selecteditems); 
          
        }else if(selecteditems[0].data.featureActionId == "ACH_FILE_UPLOAD" ){
          navManager.setCustomInfo("formFlow","ACHFileListRequests");        
          navManager.setCustomInfo("ACHTranactionDetails",selecteditems); 
          
        }else if(selecteditems[0].data.featureActionId == "BULK_PAYMENT_SINGLE_SUBMIT" ){
          navManager.setCustomInfo("formFlow","BulkPaymentRequests");        
          navManager.setCustomInfo("ACHTranactionDetails",selecteditems); 
        }else if(selecteditems[0].data.featureActionId == "BULK_PAYMENT_MULTIPLE_SUBMIT" ){
          navManager.setCustomInfo("formFlow","BulkPaymentRequests");        
          navManager.setCustomInfo("ACHTranactionDetails",selecteditems); 
        }
        else if(selecteditems[0].data.featureActionId === "CHEQUE_BOOK_REQUEST_CREATE"){
          navManager.setCustomInfo("formFlow", "ChequeBookRequests");
          navManager.setCustomInfo("chequeBookRequestDetails",selecteditems);
        }else{
          navManager.setCustomInfo("formFlow","TransactionDetailsRequests");        
          navManager.setCustomInfo("generalTransactionDetails",selecteditems); 
        }

          /*switch(selectedHeaderIndex[0]){
            case 0 : //Transaction Details
              navManager.setCustomInfo("formFlow","TransactionDetailsRequests");        
              navManager.setCustomInfo("generalTransactionDetails",selecteditems); 
              break;
            case 1 : //ACH Transactions
              navManager.setCustomInfo("formFlow","ACHTransactionDetailsRequests");        
              navManager.setCustomInfo("ACHTranactionDetails",selecteditems); 
              break;
            case 2 :
              navManager.setCustomInfo("formFlow","ACHFileListRequests");        
              navManager.setCustomInfo("ACHFileDetails",selecteditems);
              var ACHFieldID = selecteditems[0].ACHFileID;
              var navigationObject = {
                "requestData":{
                  "achFileId":ACHFieldID}
              };
              var ACHModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
              ACHModule.presentationController.getACHFileRecord(navigationObject);
              break;
          }*/
          
          navManager.navigateTo("ApprovalsReqUIModule/frmApprovalsTransactionDetail"); 
        }
      } catch (e) {
        kony.print("Exception in segListRequestsonRowClick" + e);
      }
    },
    
    getACHFileRecordsSuccessCB:function(response){
      try{
        var ACHFileRecordID = response;
        var navigationObject = {
          "requestData":{
            "achFileRecordId":ACHFileRecordID}
        };
         var ApprovalsReqUIModule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
         ApprovalsReqUIModule.presentationController.getACHFileSubRecord(navigationObject);
      }catch(er){
      }
    },


    /*
     *navToPrevForm - This function is to called to navigate back to prev form
     **
     */
    navToPrevForm: function() {
      try {
        kony.print("entered navToPrevForm");
        var navMan=applicationManager.getNavigationManager();
        var formFlow = navMan.getCustomInfo("formFlow");
        var previousForm=kony.application.getPreviousForm().id;
        if(formFlow==="StatusMessage" || previousForm==="frmStausMessage"){
          navMan.navigateTo("frmApprovalsAndRequestsTitle");
        }else if(formFlow==="BusinessDashboard"){
          navMan.navigateTo("frmBusinessDashboard");
        }else if(formFlow==="frmBulkRejectReason"){
          navMan.navigateTo("frmApprovalsAndRequestsTitle");
        }else{
          navMan.goBack();
        }
      } catch (e) {
        kony.print("exception navToPrevForm" + e);
      }
    },

    fetchGeneralTransactionRequests :function(){
      try{
        var navObj = 
            {	
              requestData: this._fetchParams,
              formData : this
            };
        this._approvalsReqModule.presentationController.fetchTransactionRequests(navObj);
      } catch (error) {
        kony.print("Exception in  fetchGeneralTransactionRequests-->" + error);
      }
    },

    fetchACHTransactionRequests : function(){
      var navObj = 
          {	
            requestData: this._fetchParams,
          };
      this._approvalsReqModule.presentationController.fetchACHTransactionRequests(navObj);
    },

    fetchACHFileRequests : function(){
      var navObj = 
          {	
            requestData: this._fetchParams,
          };
      this._approvalsReqModule.presentationController.fetchACHFileRequests(navObj);
    },

    fetchACHFilesMyRequestsSuccessCallBack : function(response){
      try {
        kony.print("Entered  view controller fetchACHFilesMyRequestsSuccessCallBack"+JSON.stringify(response));
        this._processedDataACHFilesRequests =  response;
        this._serviceCounter -= 1;
        if(this._serviceCounter === 0){
          this.setDataAfterServiceCalls();
        }
      } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("Exception in  fetchACHFilesMyRequestsSuccessCallBack-->" + error);
      }
    },

    /**
    * withdrawTransaction : call the presentation controller with navigation object to withdraw the Transaction
    * @member of {frmBBMyRequestsController}
    * @param {JSON Object} 
    * @return {} 
    * @throws {}
    */

    showWithdrawpopup:function(){ 
      var selectedItem = this.view.segRequestList.selectedRowItems;
      if(selectedItem[0].data.featureActionId == "BULK_PAYMENT_SINGLE_SUBMIT" || selectedItem[0].data.featureActionId == "BULK_PAYMENT_SINGLE_SUBMIT" ){
        alert("Cannot withdraw bulk payment transaction");
        return;
      }
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      if(isiPhone) {
        var msgText = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
        var basicConfig = {message: msgText,
                           alertTitle:"",
                           alertIcon:null,
                           alertType: constants.ALERT_TYPE_CONFIRMATION,
                           yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ApprovalRequests.Withdraw"),
                           noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel"),
                           alertHandler: this.withdrawConfirmIphone
                          };
        var pspConfig = {};
        applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
      }  else{
        this.view.withdrawpopup.lblTitle.skin = "sknLbl494949SSPsemibold13px";
        this.view.withdrawpopup.lblContent.skin = "sknlbl424242SSPR15dp";
        this.view.withdrawpopup.lblContentreject.skin = "sknLbl494949SSP40px";
        this.view.flxWithdrawpopup.isVisible=true;
        this.view.withdrawpopup.lblTitle.isVisible = false;
        this.view.withdrawpopup.lblContentreject.isVisible = false;
        this.view.withdrawpopup.lblYes.text=kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw");
        this.view.withdrawpopup.lblContent.top = "25dp";
        this.view.withdrawpopup.flxBtns.top = "15dp";
        this.view.withdrawpopup.lblContent.isVisible = true;
        this.view.withdrawpopup.lblContent.text=kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
        this.view.withdrawpopup.txtRejectreason.isVisible = true;
      }
    },

    withdrawConfirmIphone : function(response){
      if(response === true)
      {  this.withdrawFunction();
      }
    },

    withdrawFunction:function(){
      var scopeObj = this;
      var selectedHeaderIndex = this.view.segRequestList.selectedIndex;
      var selectedItems = this.view.segRequestList.selectedRowItems[0];
     var request_id = selectedItems.data.requestId;
      var featureActionId = selectedItems.data.featureActionId;
      var req = 
          {
            "requestId":request_id,
            "featureActionId": featureActionId,
            "comments": "",//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
          };
      var navObj = 
          {	
            requestData: req,
            formData : scopeObj
          };
      applicationManager.getPresentationUtility().showLoadingScreen();
      scopeObj._approvalsReqModule.presentationController.withdrawPendingRequest(navObj);
      this.view.flxWithdrawpopup.isVisible = false;
    },

    withdrawTransaction: function(request_id){  
      var scopeObj = this;
      var req = { "Request_id" : request_id };
      var navObj = 
          {	
            requestData: req,
            formData : scopeObj
          };
      this._approvalsReqModule.presentationController.fetchTransactionRequests(navObj);
      scopeObj._approvalsReqModule.presentationController.withdrawTransactionRequest(navObj);
      this.view.flxWithdrawpopup.isVisible = false;

    },

    /**
    * withdrawACHTransaction : call the presentation controller with navigation object to withdraw the ACH Transaction
    * @member of {frmBBMyRequestsController}
    * @param {JSON Object}
    * @return {} 
    * @throws {}
    */
    withdrawACHTransaction: function(request_id){ 
      var scopeObj = this;
      var req = { "Request_id" : request_id };
      var navObj = 
          {	
            requestData: req,
            formData : scopeObj
          };
      scopeObj._approvalsReqModule.presentationController.withdrawACHTransaction(navObj);
      this.view.flxWithdrawpopup.isVisible = false;
    },

    /**
    * withdrawACHFile : call the presentation controller with navigation object to withdraw the ACH File
    * @member of {frmBBMyRequestsController}
    * @param {JSON Object} inputParams - object with request_id and other needed data to withdraw a ACH File
    * @return {} 
    * @throws {}
    */
    withdrawACHFile: function(request_id){  
      var scopeObj = this;
      var req = { "Request_id" : request_id };
      var navObj = 
          {	
            requestData: req,
            formData : scopeObj
          };
      scopeObj._approvalsReqModule.presentationController.withdrawACHFileRequests(navObj);
      this.view.flxWithdrawpopup.isVisible = false;
    },

    showToastPopup : function(response,successOrfailure,message)
    {
      this.view.flxPopup.setVisibility(false);
      try {   
        if(!kony.sdk.isNullOrUndefined(response)){
          var scopeObj=this;
          var statusMessage = "";

          if(successOrfailure === "success"){
            statusMessage = message === "" ? "Successfully executed" : message;
            this.view.flxPopup.skin = "sknFlxBg43ce6eTab";
            this.view.customPopup.imgPopup.src = "confirmation_tick.png";  
          }else if(successOrfailure === "failure"){
            if(!kony.sdk.isNullOrUndefined(response.errorMessage)){
              statusMessage= response.errorMessage;
            }
            else{
              statusMessage= "Something went wrong while making service call.";
            }
            this.view.flxPopup.skin = "sknflxff5d6e";
            this.view.customPopup.imgPopup.src = "errormessage.png";  
          }

          this.view.customPopup.lblPopup.text = statusMessage;    
          if(!kony.sdk.isNullOrUndefined(this._timerCounter)){
            this._timerCounter = parseInt(this._timerCounter)+1;
          }
          else{
            this._timerCounter = 1;
          }
          var timerId="timerPopupErrorACHTransactionDetail"+this._timerCounter;

          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            if(successOrfailure === "failure"){
              scopeObj.view.flxPopup.setVisibility(false);
            }	
            if(successOrfailure === "success"){
              //scopeObj.fetchGeneralTransactionRequests();
              scopeObj._serviceCounter = 0;
              scopeObj.fetchDataBasedOnPermissions();
            }
          }, 2, false);            
        }
        if(successOrfailure === "failure"){
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
 
      }catch(error){
        kony.print("frmACHTransactions showToastMessage-->"+error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }      
    },
    transactionRequestSuccessCallback : function(transactions){
      this._processedDataGeneralTransactionRequests = transactions;
      this._serviceCounter -= 1;
      if(this._serviceCounter === 0){
        this.setDataAfterServiceCalls();
      }
    },
    

    showflxAdvSearch : function() {
      if(this.hasFilterBeenSetup) {
        this.view.filter.setVisibility(true);
      this.view.filter.btnAll.onClick = this.selectAll.bind(this);
      this.view.filter.segSingleTransactions.onRowClick = this.singleSegmentSelected.bind(this);
      this.view.filter.segBulkTransactions.onRowClick = this.bulkSegmentSelected.bind(this);
      this.view.filter.segOtherRequests.onRowClick = this.otherSegmentSelected.bind(this);
      this.view.forceLayout();
        return;
      }
      var scope = this;
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      var datasize = parseInt(presenter.presentationController.singleRequestsPendingCount)
      + parseInt(presenter.presentationController.bulkRequestsPendingCount)
      + parseInt(presenter.presentationController.otherRequestsPendingCount);
      this.view.filter.lblAllCounter.text = "(" + datasize + ")";
      scope.view.filter.btnSelectTransactionType.onClick = function(){
        var scopex = this;
        scopex.view.filter.setVisibility(false);
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

      if(presenter.presentationController.isSingleRequestsPendingAvailable) {
        var segSingleData = presenter.presentationController.singleRequestsPending;
        var i = 0;
        for(i = 0; i < segSingleData.length; i++) {
          if(this.selectedFilter !== "") {
            segSingleData[i]["lblText"] 
            if(segSingleData[i]["lblText"] === this.selectedFilter)
              segSingleData[i]["imgSelect"]["src"] = "tickmark_green.png";
            else
              segSingleData[i]["imgSelect"]["src"] = "transparent.png";
          }
          else {
            segSingleData[i]["imgSelect"]["src"]  = "transparent.png";
          }
     // segSingleData[i]["lblText"] =  segSingleData[i]["lblText"].substr(0, 35).trim();
        }
        scope.view.filter.segSingleTransactions.setData(segSingleData);
        scope.view.filter.segSingleTransactions.setVisibility(true);
        scope.view.filter.flxSingleTransactions.setVisibility(false);
      }
      else {
        scope.view.filter.flxSingleTransactions.setVisibility(false);
        scope.view.filter.segSingleTransactions.setVisibility(false);
      }

      if(presenter.presentationController.isBulkRequestsPendingAvailable) {
        var segBulkData = presenter.presentationController.bulkRequestsPending;
        var i = 0;
        for(i = 0; i < segBulkData.length; i++) {
          if(this.selectedFilter !== "") {
            if(segBulkData[i]["lblText"] === this.selectedFilter)
              segBulkData[i]["imgSelect"]["src"] = "tickmark_green.png";
            else
              segBulkData[i]["imgSelect"]["src"]= "transparent.png";
          }
          else {
            segBulkData[i]["imgSelect"]["src"] = "transparent.png";
          }
         //  segBulkData[i]["lblText"] =  segBulkData[i]["lblText"].substr(0, 35).trim();
        }
        scope.view.filter.segBulkTransactions.setData(segBulkData);
        scope.view.filter.segBulkTransactions.setVisibility(true);
        scope.view.filter.flxBulkTransactions.setVisibility(false);
      }
      else {
        scope.view.filter.flxBulkTransactions.setVisibility(false);
        scope.view.filter.segBulkTransactions.setVisibility(false);
      }

      if(presenter.presentationController.isOtherRequestsPendingAvailable) {
        var segOtherData = presenter.presentationController.otherRequestsPending;
        var i = 0;
        for(i = 0; i < segOtherData.length; i++) {
          if(this.selectedFilter !== "") {
            if(segOtherData[i]["lblText"] === this.selectedFilter)
              segOtherData[i]["imgSelect"]["src"] = "tickmark_green.png";
            else
              segOtherData[i]["imgSelect"]["src"] = "transparent.png";
          }
          else {
            segOtherData[i]["imgSelect"]["src"] = "transparent.png";
          }
          //  segOtherData[i]["lblText"] =  segOtherData[i]["lblText"].substr(0, 35).trim();
        }
        scope.view.filter.segOtherRequests.setData(segOtherData);
        scope.view.filter.segOtherRequests.setVisibility(true);
        scope.view.filter.flxOtherRequests.setVisibility(false);
      }
      else {
        scope.view.filter.segOtherRequests.setVisibility(false);
        scope.view.filter.flxOtherRequests.setVisibility(false);
      }
      scope.view.filter.lblAllCounter = "("+presenter.presentationController.allApprovalsPendingCount+")";
      if (applicationManager.getDeviceUtilManager().isIPhone()) {
      scope.view.filter.top = "0dp";
    }
    else {
      scope.view.filter.top = "171dp";
    }
            this.view.filter.setVisibility(true);
      this.view.filter.btnAll.onClick = this.selectAll.bind(this);
      this.view.filter.segSingleTransactions.onRowClick = this.singleSegmentSelected.bind(this);
      this.view.filter.segBulkTransactions.onRowClick = this.bulkSegmentSelected.bind(this);
      this.view.filter.segOtherRequests.onRowClick = this.otherSegmentSelected.bind(this);
      this.view.forceLayout();
      this.hasFilterBeenSetup = true;
    },

    fetchCounts : function() {
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
      presenter.presentationController.getAllCounts();
    },
    
    
    
    singleSegmentSelected : function(context1){
    //var selectedRowItem = context1["selectedRowItems"];
    this.view.filter.imgAll.src = "transparent.png";
    var data = this.view.filter.segSingleTransactions.data;
    var bulkTransactionData = this.view.filter.segBulkTransactions.data; 
    var otherTransactionData = this.view.filter.segOtherRequests.data;
    if(bulkTransactionData.length>0){
     for(var j =0 ;j<bulkTransactionData.length;j++){
       if(bulkTransactionData[j].imgSelect.src === "tickmark_green.png"){
            bulkTransactionData[j].imgSelect.src = "transparent.png"
       }
    }
    this.view.filter.segBulkTransactions.setData(bulkTransactionData);
    }
     if(otherTransactionData.length>0){
     for(var j =0 ;j<otherTransactionData.length;j++){
       if(otherTransactionData[j].imgSelect.src === "tickmark_green.png"){
            otherTransactionData[j].imgSelect.src = "transparent.png"
       }
    }
     this.view.filter.segOtherRequests.setData(otherTransactionData);
    }
    if(data.length>0){
    for(var j =0 ;j<data.length;j++){
       if(data[j].imgSelect.src === "tickmark_green.png"){
            data[j].imgSelect.src = "transparent.png"
       }
    }}
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  === "transparent.png"){
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "tickmark_green.png";
      var selectedData = this.view.filter.segSingleTransactions.selectedRowItems[0].lblText;
      var input = selectedData;
      var fields = input.split('(');
      var selectedDataName = fields[0];
      this.setupDataFromFilter(selectedDataName);
      this.view.filter.setVisibility(false);
    }else{
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "transparent.png";
    }
    this.view.filter.segSingleTransactions.data = data;
    //this.setupDataFromFilter(data[context1["selectedRowIndices"][0][1][0]]["lblText"]);
  },

  bulkSegmentSelected : function(context1){
    this.view.filter.imgAll.src = "transparent.png";
    var data = this.view.filter.segBulkTransactions.data;
    var otherTransactionData = this.view.filter.segOtherRequests.data;
    var SingleTransactionsData = this.view.filter.segSingleTransactions.data;
	  
	  if(otherTransactionData.length>0){
     for(var j =0 ;j<otherTransactionData.length;j++){
       if(otherTransactionData[j].imgSelect.src === "tickmark_green.png"){
            otherTransactionData[j].imgSelect.src = "transparent.png"
       }
    } 
    this.view.filter.segOtherRequests.setData(otherTransactionData);
    }
	
	 if(SingleTransactionsData.length>0){
    for(var j =0 ;j<SingleTransactionsData.length;j++){
       if(SingleTransactionsData[j].imgSelect.src === "tickmark_green.png"){
            SingleTransactionsData[j].imgSelect.src = "transparent.png"
       }
    }
         this.view.filter.segSingleTransactions.setData(SingleTransactionsData);
         }
    if(data.length>0){
     for(var j =0 ;j<data.length;j++){
     if(data[j].imgSelect.src === "tickmark_green.png"){
      data[j].imgSelect.src = "transparent.png"
      }
     }}
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  === "transparent.png"){
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "tickmark_green.png";
      var selectedData = this.view.filter.segBulkTransactions.selectedRowItems[0].lblText;
      var input = selectedData;
      var fields = input.split('(');
      var selectedDataName = fields[0];
      this.setupDataFromFilter(selectedDataName);
      this.view.filter.setVisibility(false);
    }
    else{
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "transparent.png";
    }
    this.view.filter.segBulkTransactions.data = data;
  },

  otherSegmentSelected : function(context1){
    try{
    this.view.filter.imgAll.src = "transparent.png";
    var data = this.view.filter.segOtherRequests.data;
    var SingleTransactionsData = this.view.filter.segSingleTransactions.data;
    var bulkTransactionData = this.view.filter.segBulkTransactions.data;
    if (bulkTransactionData.length > 0) {
                for (var j = 0; j < bulkTransactionData.length; j++) {
                    if (bulkTransactionData[j].imgSelect.src === "tickmark_green.png" ) {
                        bulkTransactionData[j].imgSelect.src = "transparent.png"
                    }
                   
                }
                this.view.filter.segBulkTransactions.setData(bulkTransactionData);
            }
    if(SingleTransactionsData.length>0){
    for(var j =0 ;j<SingleTransactionsData.length;j++){
       if(SingleTransactionsData[j].imgSelect.src === "tickmark_green.png"){
            SingleTransactionsData[j].imgSelect.src = "transparent.png"
       }
    }
         this.view.filter.segSingleTransactions.setData(SingleTransactionsData);
         }
    if(data.length>0){
     for(var j =0 ;j<data.length;j++){
     if(data[j].imgSelect.src === "tickmark_green.png"){
      data[j].imgSelect.src = "transparent.png"
     
      }
     }}
    if(data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  === "transparent.png"){
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "tickmark_green.png";
      var selectedData = this.view.filter.segOtherRequests.selectedRowItems[0].lblText;
      var input = selectedData;
      var fields = input.split('(');
      var selectedDataName = fields[0];
      this.setupDataFromFilter(selectedDataName);
      this.view.filter.setVisibility(false);
    }
    else{
      data[context1["selectedRowIndices"][0][1][0]]["imgSelect"]["src"]  = "transparent.png";
    }
    this.view.filter.segOtherRequests.data = data;
  }catch(er){
    kony.print(er);
  }
  },
  
  selectAll : function () {
    this.removeAllSelectedFromSegement();
    this.view.filter.imgAll.src = "tickmark_green.png";
    this.view.filter.setVisibility(false);
    var requestData = {
        "sortByParam":"",
        "sortOrder": "", //createdts
        "searchString": "",
        "pageSize": "" ,
        "pageOffset": "",
        "filterByParam":"",
              "filterByValue": "",
            //  "removeByParam": "featureActionId",
             // "removeByValue": "BULK_PAYMENT_REQUEST_SUBMIT"
      };
      this.fetchPendingRequests(requestData);
  },

  removeAllSelectedFromSegement : function() {
     this.view.filter.imgAll.src = "transparent.png";
    
    var data0 = this.view.filter.segOtherRequests.data;
    var data1 =  this.view.filter.segBulkTransactions.data;
    var data2 =  this.view.filter.segSingleTransactions.data;

    data0.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });

    data1.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });

    data2.forEach(function (entry) {
      entry["imgSelect"] = {
        "src" : "transparent.png"
      };
    });
    
     this.view.filter.segOtherRequests.data = data0;
    this.view.filter.segBulkTransactions.data = data1;
     this.view.filter.segSingleTransactions.data = data2;
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
        var requestData = {
        "sortByParam":"",
        "sortOrder": "", //createdts
        "searchString": "",
        "pageSize": "" ,
        "pageOffset": "",
        "filterByParam":datatype,
        "filterByValue": data,
       // "removeByParam": "featureActionId",
        //"removeByValue": "BULK_PAYMENT_REQUEST_SUBMIT"
      };
      this.fetchPendingRequests(requestData);
//this.setupApprovalHistory(datatype, data);
      //setupApprovalHistory : "filterByParam":datatype, "filterByValue":data
    },
    
    achTransactionRequestSuccessCallback : function(achTransactions){
      this._processedDataACHTransactionRequests = achTransactions;
      this._serviceCounter -= 1;
      if(this._serviceCounter === 0){
        this.setDataAfterServiceCalls();
      }
    },
    
    searchRequestPendingOnEmpty: function() {
        try {
            var searchText = this.view.tbxSearch.text;
            if (searchText === "") {
                this.fetchDataBasedOnPermissions();
            }
        } catch (err) {
            kony.print("Error search---->" + err);
        }
    },
    
  }});