define(["CommonUtilities"], function(CommonUtilities){ 
  return{

    _bulkRequestData : {},
    _originalArrayReason : [],
    _selectedReason : "",
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

        this.view.preShow = this.onpreShow;
        this.view.postShow = this.onPostShow;

      }catch(e){
        kony.print("Exception in init::"+e);
      }
    },  

    onNavigate : function(){
      try{


      }catch(e){
        kony.print("Exception in onNavigate"+e);
      }
    },

    onpreShow : function(){
      try{
        kony.print("Entered onpreShows");
        this.onBindEvents();
        this.resetForm();
        /*var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard");
        var configManager = applicationManager.getConfigurationManager();

         var bulkRejectReasonCusInfo = navManager.getCustomInfo("frmBulkRejectReason");
        this._bulkRequestData = bulkRejectReasonCusInfo;
        if(!kony.sdk.isNullOrUndefined(bulkRejectReasonCusInfo)){

        }*/

        this.fetchRejectReason();

      }catch(e){
        kony.print("Exception in onpreShow"+e);
      }
    },

    onPostShow: function(){
      try{
        kony.print("Entered onPostShow");

      }catch(e){
        kony.print("Exception in onPostShow"+e);
      }
    },

    resetForm : function(){
      try{
        kony.print("Entered resetForm");
        this.view.segRejectReason.rowFocusSkin = "sknSegf9f9f9Tab";
        this.view.flxRejectMenu.isVisible = false;
        this.view.flxPopup.isVisible = false;
        this.view.flxNoRows.isVisible = false;
         this.view.segRejectReason.isVisible = true;
        this.view.tbxSearch.text = "";
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
           this.view.flxMainContainer.top = "0dp";
           this.view.flxMainContainer.bottom = "60dp";
          this.view.title = kony.i18n.getLocalizedString("kony.mb.approve.rejectReasonTitle"); //"Approvals";//
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxMainContainer.top = "56dp";
          this.view.flxMainContainer.bottom = "0dp";
          this.view.customHeader.flxBack.isVisible = false;
          this.view.customHeader.flxSearch.isVisible = true;
          this.view.customHeader.imgSearch.src = "closewhite.png";
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.approve.rejectReasonTitle"); //"Approvals";//
        }

        this.view.segRejectReason.widgetDataMap = {
          "lblName" : "lblName",
          "imgSelection" : "imgSelection",
        };


      }catch(e){
        kony.print("Exception in resetForm"+e);
      }
    },

    onBindEvents : function(){
      try{
        kony.print("Entered onBindEvents");
        this.view.customHeader.flxSearch.onClick = this.onBack;
        this.view.onDeviceBack = this.onBack;

        this.view.rejectPopUp.txtRejectreason.onTextChange=this.rejectBtnEnableTextChange;
        this.view.flxRejectMenu.onClick = this.dummyFunction;
        this.view.rejectPopUp.flxContainer.onClick = this.dummyFunction
        this.view.tbxSearch.onTextChange = this.searchReasonLocal;

        this.view.segRejectReason.onRowClick = this.segRejReasononRowClick;
      }catch(e){
        kony.print("Exception in onBindEvents"+e);
      }
    },


    fetchRejectReason  : function(){
      try{
        kony.print("Entered onBindEvents");
        var scopeObj = this;
        var navObj = {};
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("formFlow","frmApprovalsList");
        scopeObj._approvalsReqModule.presentationController.getCancellationReasons(navObj);
      }catch(e){
        kony.print("Exception in onBindEvents"+e);
      }
    },

    fetchRejectReasonSuccessCallBack : function(response){
      try{
        kony.print("Entered onBindEvents");
        this.view.segRejectReason.removeAll();
        this._originalArrayReason = CommonUtilities.cloneJSON(response);
        this.view.segRejectReason.setData(response);
      }catch(e){
        kony.print("Exception in onBindEvents"+e);
      }
    },

    segRejReasononRowClick: function() {
      try {
        kony.print("Entered segRejReasononRowClick");
        var selectedItem = this.view.segRejectReason.selectedRowItems;
        var selectedIndex = this.view.segRejectReason.selectedRowIndex[1];
        var data = this.view.segRejectReason.data;
        for (var i = 0; i < data.length; i++) {
          if (i == selectedIndex ) {
            data[i].imgSelection.src = "tickmark_green.png";
          } else {
            data[i].imgSelection.src = "transparent.png";
          }
        }

        // this.view.segShowAccounts.setData([]);
        this.view.segRejectReason.setData(data);
        kony.print("Giving time");
        kony.print("Giving time");
        kony.print("Giving time");
        kony.print("Giving time");
        kony.print("Giving time");
        this._selectedReason = selectedItem[0].data.reason;
        this.showRejectPopup();
      }catch(e){
        kony.print("Exception in segRejReasononRowClick"+e);
      }
    },

    showRejectPopup: function(){
      try {
        kony.print("Entered showRejectPopup::");
        this.view.rejectPopUp.flxReject.onClick = this.btnRejectOnClick;
        this.view.rejectPopUp.flxCancel.onClick = this.rejectCancel;
        this.view.flxRejectMenu.isVisible = true;
        this.view.rejectPopUp.txtRejectreason.text = "";
        this.view.rejectPopUp.txtRejectreason.isVisible = true;
        this.view.rejectPopUp.lblContent.text=kony.i18n.getLocalizedString("kony.mb.request.rejectmsg");
        this.view.rejectPopUp.lblContentreject.isVisible = true;
        this.view.rejectPopUp.lblContentreject.text=kony.i18n.getLocalizedString("kony.mb.approve.rejectreason");
        this.view.rejectPopUp.lblTitle.text = "Reject";
        if(this.view.rejectPopUp.txtRejectreason.text==="" || this.view.rejectPopUp.txtRejectreason.text==="" ||  this.view.rejectPopUp.txtRejectreason.text.trim() === ''){
          this.view.rejectPopUp.flxReject.setEnabled(false);
          this.view.rejectPopUp.lblYes.skin = "sknlbl424242SSPSB18px";
        }else{
          this.view.rejectPopUp.flxReject.setEnabled(true);
           this.view.rejectPopUp.lblYes.skin = "sknlbl004B95SSPR13dp";
        }
        this.view.rejectPopUp.lblYes.text = "Reject";
      } catch (error) {
        kony.print("Exception in  showRejectPopup-->" + error);
      }
    },

    /**
    * btnRejectOnClick : onClick of Reject in Pop-up for Reject a General Transaction.
    * @member of {frmBBMyApprovalsController}
    * @param {}
    * @return {} 
    * @throws {}
    */
    btnRejectOnClick : function(){
      try{
        var scopeObj = this;
        var selectedReason = this._selectedReason;

        var navManager = applicationManager.getNavigationManager();
        var bulkRejectReasonCusInfo = navManager.getCustomInfo("frmBulkRejectReason");
        this._bulkRequestData = bulkRejectReasonCusInfo;
        
        if(!kony.sdk.isNullOrUndefined(bulkRejectReasonCusInfo)){
          var request_id = bulkRejectReasonCusInfo.requestData.requestId;
          var featureActionId = bulkRejectReasonCusInfo.requestData.featureActionId;
          var comments = this.view.rejectPopUp.txtRejectreason.text;
          var req = 
              {
                "requestId":request_id,
                //"featureActionId": featureActionId,
                "comments":comments,
                "rejectionreason":selectedReason
              };

          var navObj = 
              {	
                requestData: req,
                formData : scopeObj
              };
          scopeObj._approvalsReqModule.presentationController.rejectBulkPaymentRecord(navObj);
        }


      }catch(e){
        kony.print("Exception in btnRejectOnClick"+e);
      }
    },

    searchReasonLocal : function(){
      try{
        var searchText = this.view.tbxSearch.text.toLowerCase();
        if(searchText === ""){
          this.view.segRejectReason.setData(this._originalArrayReason);
          this.view.segRejectReason.isVisible = true;
          this.view.flxNoRows.isVisible = false;
          return;
        }

        if(searchText.length > 2){
          var segData = CommonUtilities.cloneJSON(this._originalArrayReason);

          var addSearchedArr = [];

          for(var i =0 ; i<segData.length; i++){
            //addSearchedArr = [];
            var rowItems = segData[i];
            var reason = kony.sdk.isNullOrUndefined(rowItems.data.reason) ? ""  : rowItems.data.reason.toLowerCase();

            if(reason.indexOf(searchText) > -1){
              addSearchedArr.push(rowItems);
            }
          }
          
          if(addSearchedArr.length === 0){
            this.view.flxNoRows.isVisible = true;
            this.view.segRejectReason.isVisible = false;
          }else{
             this.view.flxNoRows.isVisible = false;
            this.view.segRejectReason.isVisible = true;
          }
          this.view.segRejectReason.setData(addSearchedArr);
        }
      }catch(e){
        kony.print("Exception in btnRejectOnClick"+e);
      }
    },

    rejectBtnEnableTextChange: function(){
      try {
        if(this.view.rejectPopUp.txtRejectreason.text==="" || this.view.rejectPopUp.txtRejectreason.text==="" ||  this.view.rejectPopUp.txtRejectreason.text.trim() === ''){
          this.view.rejectPopUp.flxReject.setEnabled(false);
          this.view.rejectPopUp.lblYes.skin = "sknlbl424242SSPSB18px";

        }else{
          this.view.rejectPopUp.flxReject.setEnabled(true);
          this.view.rejectPopUp.lblYes.skin = "sknlbl004B95SSPR13dp";
        }
      } catch (error) {
        kony.print("Exception in  rejectBtnEnableTextChange-->" + error);
      }
    },

    rejectCancel:function()
    {
      try {  
        this.view.flxRejectMenu.isVisible = false;
        this.view.rejectPopUp.txtRejectreason.text="";
      }catch(error){
        kony.print("frmApprovalsTransactionDetail rejectCancel-->"+error);
      }       
    },

    showToastPopup : function(response,successOrfailure,message)
    {
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
          var timerId="timerPopupErrorBulkRejectReason"+this._timerCounter;

          if(this.view.flxRejectMenu.isVisible){
            this.view.flxRejectMenu.isVisible = false;
          }
          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
            if(successOrfailure === "success"){
              //scopeObj.fetchGeneralTransactionApprovals();
              scopeObj.onBack();
            }
          }, 2, false);            
        }

        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(error){
        kony.print("Exception in showToastMessage-->"+error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }      
    },


    onBack  : function(){
      try{
        // var navMan=applicationManager.getNavigationManager();
        // navMan.goBack();
        var navManager = applicationManager.getNavigationManager();
        var bulkRejectReasonCusInfo = navManager.getCustomInfo("frmBulkRejectReason");
        this._bulkRequestData = bulkRejectReasonCusInfo;
        if(!kony.sdk.isNullOrUndefined(bulkRejectReasonCusInfo)){

          if(bulkRejectReasonCusInfo.prevFormName == "ApprovalsReqUImodule/frmApprovalsTransactionDetail"){
             navManager.setCustomInfo("formFlow","BulkPaymentApproval");     
             var selItems = navManager.getCustomInfo("ACHTranactionDetails"); 
             navManager.setCustomInfo("ACHTranactionDetails",selItems); 
        	navManager.navigateTo("ApprovalsReqUImodule/frmApprovalsTransactionDetail"); 
          }else{
             navManager.setCustomInfo("formFlow","frmBulkRejectReason");
             navManager.navigateTo("ApprovalReqMain");
          }
        }

      }catch(e){
        kony.print("Exception in onBack"+e);
      }
    },

    dummyFunction : function(){
      try{
        kony.print("dummyFunction ");

      }catch(e){
        kony.print("Exception in dummyFunction"+e);
      }
    },

  }
});