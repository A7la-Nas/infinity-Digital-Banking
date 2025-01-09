define(function(){
  return {
    sample:0,
    timerCounter:0,
    previousFormType:"",
    _constantsImage : {"tickImage" : "tickmark_green.png"},
    AchModule:null,

    onInit : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.AchModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule');
      this.view.preShow = this.preShowActions; 
      this.view.postShow = this.postShowForm;
    },

    onNavigate:function()
    {
      try {       

      }catch(error){
        kony.print("frmACHTransactions onnavigateerror-->"+error);
      }
    },


    preShowActions:function()
    {
      var scope = this;
      try { 
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.flxHeader.isVisible = true;
        }
        var MenuHandler =  applicationManager.getMenuHandler();
        MenuHandler.setUpHamburgerForForm(scope,"ACH");
        var navManager = applicationManager.getNavigationManager()
        var navData = navManager.getCustomInfo("ACHTransactions");
        this.previousFormType = navData.formName;
        this.bindevents();
        if(this.previousFormType == "ACHTransaction"){
          var fetchTransationParams={};
          fetchTransationParams = {
            "searchString": "",
            "sortByParam":"createdts",
            "sortOrder":"DESC",
            "pageSize": "",
            "pageOffset": "",
            "filterByTransactionType" : "",
            "filterByStatus" : ""
          },
            this.fetchACHTransactionList(fetchTransationParams);
        }else{
          var navigationObject = {
            "requestData": {"searchString":"","sortByParam":"","sortOrder":"","pageSize":11,"pageOffset":"","filterByParam":"","filterByValue":""},
          };
          this.fetchACHFiles(navigationObject);
        }
      }catch(error){
        kony.print("frmACHTransactions onInitActions-->"+error);
      }
    },

    postShowForm : function(){
      try{    
        if(applicationManager.getPresentationFormUtility().getDeviceName()!=="iPhone"){
          this.view.customHeader.imgBack.src = "backbutton.png";
        }
      }catch(e){
        kony.print("Exception in postShowForm::"+e);
      }finally{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    ///////********bindevents is used to initialise the data*****////////

    bindevents:function()
    {
      try {  
        var device = kony.os.deviceInfo();
        var type = device.name;

        if(type !== "iPhone"){
          this.view.flxHeader.isVisible = true;
          this.view.flxFooter.isVisible = false;
          this.view.customHeader.imgBack.src = "backbutton.png";
          this.view.flxBody.bottom = "0dp";
        }
        else{
          this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
          this.view.flxBody.bottom="60dp";
        }

        if(this.previousFormType == "ACHTransaction"){
          this.view.segAchtransList.onRowClick = this.achTransactionList_rowclick;
        }else
        {
          this.view.segAchtransList.onRowClick = this.ACHFileOnSegmentRowClick;
        }

        this.view.flxfiltertype.onClick = this.showFilter;   
        this.view.flxclosefilter.onClick = this.closeChangeFilterType;     
        this.view.customHeader.flxBack.onClick = this.navigateBack;
        this.view.onDeviceBack=this.navigateBack;
        this.view.flxfiltertypes.isVisible = false;
        this.view.txtSearch.text ="";
        this.view.segAchtransList.removeAll();
        this.view.lblNodatafound.isVisible = false;
        this.view.flxPopup.isVisible = false;
        if(this.previousFormType==="ACHTransaction"){

          this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
          this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
          this.view.txtSearch.placeholder = kony.i18n.getLocalizedString("Kony.mb.ACHTransactions.search");
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactions.title");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.title");
          }

          this.view.txtSearch.onDone = this.searchACHTransation;
          this.view.txtSearch.onTextChange = this.searchACHTransationOnEmpty;   //for clearing the search field
          this.view.segFilterType.onRowClick =this.changeFilterType;
          this.achTransFitertypeLoad();
        }else{

          this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");     
          this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
          this.view.txtSearch.placeholder = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.search");
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.Achfile");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.Achfile");
          }

          this.view.txtSearch.onDone = this.searchACHFile;
          this.view.txtSearch.onTextChange = this.searchACHFileonEmpty;
          this.achFileFitertypeLoad();
          this.view.segFilterType.onRowClick =this.changeFilterType;
        }
      }catch(error){
        kony.print("frmACHTransactions bindevents-->"+error);
      }       
      
    },

    closeChangeFilterType:function()
    {
      try {   
        this.view.flxfiltertypes.isVisible = false;
        var fetchTransationParams={};



        if(this.previousFormType === "ACHTransaction"){
          if(this.view.lblFiltertype.text!==kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions")){
            this.achTransFitertypeLoad();
            this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
            this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
            fetchTransationParams = { "searchString": "",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize": "",
                                     "pageOffset": "",
                                     "filterByTransactionType" : "",
                                     "filterByStatus" : ""
                                    },
              this.fetchACHTransactionList(fetchTransationParams);
          }
        }
        else{
          if(this.view.lblFiltertype.text!==kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles")){
            this.achFileFitertypeLoad();
            this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
            this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
            var navigationObject = {
              "requestData": {"searchString":"","sortByParam":"","sortOrder":"DESC","pageSize":"","pageOffset":"","filterByParam":"","filterByValue":""},
            };
            this.fetchACHFiles(navigationObject);
          }
        }



      }catch(error){
        kony.print("closeChangeFilterType -->"+error);
      }       
    },

    achTransFitertypeLoad:function()
    {
      try {    
        this.view.segFilterType.removeAll();
        var achTransFiltertypeArray=[{"title":"All Transactions"},
                                     {"title":"Payment Only"},
                                     {"title":"Collection Only"},
                                     {"title":"Pending"},                          
                                     {"title":"Collection Pending"},
                                     {"title":"Payment Pending"}
                                    ];

        var segDataArray=[];
        if(Array.isArray(achTransFiltertypeArray)){
          for(var i=0;i<achTransFiltertypeArray.length;i++){
            var json={ 
              "lblTitle":achTransFiltertypeArray[i].title,
              "imgtick":{src:this._constantsImage.tickImage},
              "flximg":{isVisible:false},              
            };
            segDataArray.push(json);
            segDataArray[0].flximg.isVisible=true;
          }
        }else{
          kony.print("not a array -->");
        }
        this.view.segFilterType.setData(segDataArray);
      }catch(error){
        kony.print("ACHFileListload -->"+error);
      }       
    },

    achFileFitertypeLoad:function()
    {
      try {   
        this.view.segFilterType.removeAll();
        var achFileFiltertypeArray=[{"title":"All File"},
                                    {"title":"Sent"},
                                    {"title":"Completed"},
                                    {"title":"Pending Approval"},                                
                                   ];
        var segDataArray=[];
        if(Array.isArray(achFileFiltertypeArray)){
          for(var i=0;i<achFileFiltertypeArray.length;i++){
            var json={ 
              "lblTitle":achFileFiltertypeArray[i].title,
              "imgtick":{src:this._constantsImage.tickImage},
              "flximg":{isVisible:false}, 
            };
            segDataArray.push(json);
          }
        }else{
          kony.print("not a array -->");
        }
        segDataArray[0].flximg.isVisible=true;
        this.view.segFilterType.setData(segDataArray);
      }catch(error){
        kony.print("ACHFileListload -->"+error);
      }       
    },


    ///////********navigateBack is used previousfrm*****////////

    navigateBack:function()
    {
      try {    
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmACHList");
      }catch(error){
        kony.print("frmACHTransactions navigateBack-->"+error);
      }       
    },

    ///////********showfilter is used to show the filtertypes in ACHtrans and ACHfile*****////////

    showFilter:function()
    {
      try {    
        if(this.view.flxfiltertypes.isVisible == true){
          this.view.flxfiltertypes.isVisible=false;
        }else if(this.view.flxfiltertypes.isVisible == false){
          this.view.flxfiltertypes.isVisible=true;
        }
      }catch(error){
        kony.print("frmACHTransactions showfilter-->"+error);
      }       
    },

    ///////********changeFilterType is used to Onclick of filtertypes  in ACHtrans and ACHfile*****////////

    changeFilterType:function()
    {
      try {    
        var filterType = this.view.segFilterType.selectedRowItems[0].lblTitle;
        var filterData = this.view.segFilterType.data;
        var filterIndex = this.view.segFilterType.selectedRowIndex[1];
        var fetchTransationParams={};
        for(var i=0;i<filterData.length;i++)
        {
          if(i===filterIndex)
          {
            filterData[i].flximg.isVisible=true;
            this.view.segFilterType.setDataAt(filterData[i], i, 0);
          }

          else
          {
            filterData[i].flximg.isVisible=false;
            this.view.segFilterType.setDataAt(filterData[i], i, 0);  
          }
        }

        if(this.previousFormType == "ACHTransaction"){
          switch(filterType){              
            case "All Transactions": 
              this.view.flxfiltertypes.isVisible = false;        
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions");
              fetchTransationParams = { "searchString": "",
                                       "sortByParam":"createdts",
                                       "sortOrder":"DESC",
                                       "pageSize": "",
                                       "pageOffset": "",
                                       "filterByTransactionType" : "",
                                       "filterByStatus" : ""
                                      };
              this.fetchACHTransactionList(fetchTransationParams);         
              break;

            case "Payment Only":
              this.view.flxfiltertypes.isVisible = false;
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.PaymentsOnly");
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.PaymentsOnly");
              fetchTransationParams={"searchString":"",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize":"",
                                     "pageOffset":"",
                                     "filterByParam":"transactionTypeName",
                                     "filterByValue":"Payment"}
              this.fetchACHTransactionList(fetchTransationParams);
              break;

            case "Collection Only":
              this.view.flxfiltertypes.isVisible = false;  
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.CollectionsOnly");
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.CollectionsOnly");
              fetchTransationParams={"searchString":"",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize":"",
                                     "pageOffset":"",
                                     "filterByParam":"transactionTypeName",
                                     "filterByValue":"Collection"};
              this.fetchACHTransactionList(fetchTransationParams);         
              break;
            case "Pending":
              this.view.lblFiltertype.text = "Pending";
              this.view.lblFiltertypeSelect.text = "Pending";
              this.view.flxfiltertypes.isVisible = false;
              fetchTransationParams={"searchString":"",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize":"",
                                     "pageOffset":"",
                                     "filterByParam":"achtransaction.status",
                                     "filterByValue":"Pending"};
              this.fetchACHTransactionList(fetchTransationParams);
              break;

            case "Collection Pending":           
              this.view.flxfiltertypes.isVisible = false;
              this.view.lblFiltertype.text = "Collections Pending";
              this.view.lblFiltertypeSelect.text = "Collections Pending"; 
              fetchTransationParams={"searchString":"",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize":"",
                                     "pageOffset":"",
                                     "filterByParam":"transactionTypeName,achtransaction.status",
                                     "filterByValue":"Collection,Pending"};
              this.fetchACHTransactionList(fetchTransationParams);
              break;

            case "Payment Pending":
              this.view.flxfiltertypes.isVisible = false;
              this.view.lblFiltertype.text = "Payment Pending";
              this.view.lblFiltertypeSelect.text = "Payment Pending"; 
              fetchTransationParams={"searchString":"",
                                     "sortByParam":"createdts",
                                     "sortOrder":"DESC",
                                     "pageSize":"",
                                     "pageOffset":"",
                                     "filterByParam":"transactionTypeName,achtransaction.status",
                                     "filterByValue":"Payment,Pending"};
              this.fetchACHTransactionList(fetchTransationParams);
              break;

          }
        }else{
          switch(filterType){ 
            case "All File":
              this.view.flxfiltertypes.isVisible = false;
              var navigationObject = {
                "requestData":{"searchString":"","sortByParam":"","sortOrder":"DESC","pageSize":"","pageOffset":"","filterByParam":"","filterByValue":""}
              };
              this.fetchACHFiles(navigationObject);
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.AllFiles");
              break;
            case "Sent":
              this.view.flxfiltertypes.isVisible = false;
              var navigationObject = {
                "requestData":{"searchString":"","sortByParam":"","sortOrder":"DESC","pageSize":"","pageOffset":"","filterByParam":"achfile.status","filterByValue":"Sent"}
              };         
              this.fetchACHFiles(navigationObject);
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.Sent");
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.Sent");
              break;
            case "Completed":
              this.view.flxfiltertypes.isVisible = false;
              var navigationObject = {
                "requestData":{"searchString":"","sortByParam":"","sortOrder":"DESC","pageSize":"","pageOffset":"","filterByParam":"achfile.status","filterByValue":"Executed"}
              };

              this.fetchACHFiles(navigationObject);
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.Completed");
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.achtransactions.Completed");
              break;

            case "Pending Approval":
              this.view.flxfiltertypes.isVisible = false;
              var navigationObject = {
                "requestData":{"searchString":"","sortByParam":"","sortOrder":"DESC","pageSize":"","pageOffset":"","filterByParam":"achfile.status","filterByValue":"Pending"}
              };

              this.fetchACHFiles(navigationObject);
              this.view.lblFiltertype.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.PendingApproval");
              this.view.lblFiltertypeSelect.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.PendingApproval");
              break;
          }

        }

      }
      catch(error){
        kony.print("frmACHTransactions filtertypefunc-->"+error);
      }       
    },

    ///////********searchACHTransation is used to serach in ACHtrans *****////////

    searchACHTransation:function()
    {
      try{    
        var searchText = this.view.txtSearch.text;
        if(!kony.sdk.isNullOrUndefined(searchText) && searchText !== ""){
          var fetchTransationParams = {
            "searchString" 	: searchText,
            "sortByParam" 	: "createdts",
            "sortOrder" 	: "DESC",
            "pageSize" 		: "",
            "pageOffset" 	: "",
            "filterByTransactionType" : "",
            "filterByStatus" : ""
          };
          this.fetchACHTransactionList(fetchTransationParams);
        }
//         else{
//           var fetchTransationParams = {
//             "searchString" 	: "",
//             "sortByParam" 	: "createdts",
//             "sortOrder" 	: "DESC",
//             "pageSize" 		: "",
//             "pageOffset" 	: "",
//             "filterByTransactionType" : "",
//             "filterByStatus" : ""
//           };
//           this.fetchACHTransactionList(fetchTransationParams);
//         }
      }catch(err){ 
        kony.print("Error search---->"+err);
      } 
    },

     searchACHTransationOnEmpty:function()
    {
      try{    
        var searchText = this.view.txtSearch.text;
        if(searchText === ""){
           var fetchTransationParams = {
            "searchString" 	: "",
            "sortByParam" 	: "createdts",
            "sortOrder" 	: "DESC",
            "pageSize" 		: "",
            "pageOffset" 	: "",
            "filterByTransactionType" : "",
            "filterByStatus" : ""
          };
          this.fetchACHTransactionList(fetchTransationParams);
        }
      }catch(err){ 
        kony.print("Error search---->"+err);
      } 
    },
    
    searchACHFileonEmpty: function()
    {
      try{    
        var searchText = this.view.txtSearch.text;
        if(searchText === ""){
           var navigationObject = {
            "requestData" : {
              "searchString"	: "",
              "sortByParam"		: "",
              "sortOrder" 		: "DESC",
              "pageSize" 		: "",
              "pageOffset"		: "",
              "filterByParam"	: "",
              "filterByValue"	: ""
            }
          };
          this.fetchACHFiles(navigationObject);
        }
      }catch(err){ 
        kony.print("Error search---->"+err);
      } 
    },

    
    ///////********searchACHFileis used to serach in  ACHfile*****////////
    searchACHFile:function()
    {
      try{    
        var searchText = this.view.txtSearch.text;
        if(!kony.sdk.isNullOrUndefined(searchText) && searchText !== ""){
          var navigationObject = {
            "requestData" : {
              "searchString"	: searchText,
              "sortByParam"		: "",
              "sortOrder" 		: "DESC",
              "pageSize" 		: "",
              "pageOffset"		: "",
              "filterByParam"	: "",
              "filterByValue"	: ""
            }
          };
          this.fetchACHFiles(navigationObject);
        }else{
          var navigationObject = {
            "requestData" : {
              "searchString"	: "",
              "sortByParam"		: "",
              "sortOrder" 		: "DESC",
              "pageSize" 		: "",
              "pageOffset"		: "",
              "filterByParam"	: "",
              "filterByValue"	: ""
            }
          };
          this.fetchACHFiles(navigationObject);
          
        }
      }catch(err){ 
        kony.print("Error search---->"+err);
      } 
    },


    ///////********fetchACHTransactionList is used to Load the list in ACHtrans ****////////

    fetchACHTransactionList:function(navobj)
    {
      try {  
        this.view.lblNodatafound.isVisible = false;
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navigationObject={};
        navigationObject = {
          "requestData": navobj
        };
        this.AchModule.presentationController.getACHTransactionsData(navigationObject);
      }catch(error){
        kony.print("frmACHTransactions getACHTransactionsData-->"+error);
      }       
    },

    fetchACHTransactionSuccessCallBack :function(response){
      try { 
        if(Array.isArray(response)){
          if(response.length!==0){
            this.view.segAchtransList.widgetDataMap={
              "lblAmount":"lblAmount",
              "lblDate":"lblDate",
              "lblToAccount":"lblToAccount",
              "lblPayment":"lblPayment"
            };
            this.view.segAchtransList.setData(response);            
          }else{
            this.view.segAchtransList.removeAll();
            this.view.lblNodatafound.isVisible = true;        
          }      
        }   
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        kony.print("Exception in  fetchGenTransactionMyApprovalSuccessCallBack-->" + error);
      }
    },

    ///////********ACHTransactionList_rowclick is used to list RowonClick in ACHtrans ****////////

    achTransactionList_rowclick:function()
    {
      try {    
        var selecteditems=this.view.segAchtransList.selectedRowItems;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("formFlow","ACHTransactionsList");        
        navManager.setCustomInfo("ACHTranactionDetails",selecteditems);                    
        navManager.navigateTo("frmACHTransactionDetail");      
      }catch(error){
        kony.print("frmACHTransactions rowonclick-->"+error);
      }       
    },

    /**
         * fetchACHFiles : call to presentation controller to fetch ACHFiles
         * @member of {frmACHDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchACHFiles: function (navigationObject) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.view.lblNodatafound.isVisible = false;
      this.view.segAchtransList.removeAll();
      this.AchModule.presentationController.getAllACHFiles(navigationObject);
    },
    getACHFilesTransactionRecordsSuccessCallBack:function(response){
      try {
        if(!kony.sdk.isNullOrUndefined(response)){
          if(Array.isArray(response)){
            if(response.length!==0){
              this.view.segAchtransList.widgetDataMap={
                "lblStatus":"lblStatus",
                "lblAdmin":"lblAdmin",
                "lblFilename":"lblFilename",
              };
              this.view.segAchtransList.removeAll();
              this.view.segAchtransList.setData(response);             
            }else{
              this.view.segAchtransList.removeAll();
              this.view.lblNodatafound.isVisible = true;           
            }
          }
        }    
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        kony.print("Exception in  fetchGenTransactionMyApprovalSuccessCallBack-->" + error);
      } finally {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }

    },
    ///////********ACHFileOnSegmentRowClick is used to list rowonClick in ACHFile ****////////
    ACHFileOnSegmentRowClick:function()
    {
      try {    
        var navManager = applicationManager.getNavigationManager();
        var selecteditems=this.view.segAchtransList.selectedRowItems;
        var ACHFieldID = selecteditems[0].ACHFileID;
        var navigationObject = {
          "requestData":{
            "achFileId":ACHFieldID}
        };
        this.AchModule.presentationController.getACHFileRecord(navigationObject);
        navManager.setCustomInfo("formFlow","ACHFileList");
        navManager.setCustomInfo("ACHFileDetails",selecteditems);       
        navManager.navigateTo("frmACHTransactionDetail");
      }catch(error){
        kony.print("frmACHTransactions ACHFileListload_rowclick-->"+error);
      }       
    },
    getACHFileRecordsSuccessCB:function(response){
      try{
        var ACHFileRecordID = response;
        var navigationObject = {
          "requestData":{
            "achFileRecordId":ACHFileRecordID}
        };
        this.AchModule.presentationController.getACHFileSubRecord(navigationObject);
      }catch(er){
      }
    },
    fetchErrorcallBack:function(response)
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
    }
  };

});