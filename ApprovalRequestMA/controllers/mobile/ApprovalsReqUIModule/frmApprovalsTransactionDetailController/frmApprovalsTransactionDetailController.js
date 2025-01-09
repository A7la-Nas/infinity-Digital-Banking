define(["CommonUtilities"], function(CommonUtilities){ 

  return {
    formInfo:[],
    previousFormType:"",
    approvalOrReq : "",
    ACHModule:"",
    ApprovalModule:"",
    detailsData:"",
    timerCounter:0,
    _profileAccess :applicationManager.getUserPreferencesManager().profileAccess,

    _serviceCounter: 0,

    incServiceCount: function(){
      if(this._serviceCounter === 0){
        applicationManager.getPresentationUtility().showLoadingScreen();
      }
      this._serviceCounter = this._serviceCounter + 1;
    },

    decServiceCount: function(){
      if(this._serviceCounter > 0){
        this._serviceCounter = this._serviceCounter - 1;
      }
      if(this._serviceCounter === 0){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    clearServiceCount: function(){
      this._serviceCounter = 0;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    init:function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
        this.view.preShow = this.preShowActions;
        this.view.postShow = this.postShowAction;
      }catch(er){
      }
    },
    onNavigate:function() {
      try { 
      }catch(error){
        kony.print("frmApprovalsTransactionDetail onnavigateerror-->"+error);
      }
    },
    postShowAction:function(){
      try{
        this.setupNavBarSkinForiPhone();
        this.decServiceCount();
      }catch(er){
        this.clearServiceCount();
      }
      this.withdrawCalled = false;
    },
    preShowActions:function()
    {
      try {
        this.incServiceCount();
        // this.setACHTransactionalDetails();
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.flxHeader.isVisible = true;
        }
        this.view.segDestinationaccount.removeAll();
        this.view.segApprovalHistory.removeAll();
        this.view.segDatalist.removeAll();
        // this.ACHModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHModule');
        this.ApprovalModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqUIModule');
        var navManager = applicationManager.getNavigationManager();
        var formFlow = navManager.getCustomInfo("formFlow");
         var keyvalue="pendingApprovals";
         navManager.setCustomInfo("backForm",keyvalue);
        this.previousFormType=formFlow;     
        this.bindevents();
        var configManager = applicationManager.getConfigurationManager();
        this.view.flxWebApplitionTitle.isVisible=false;
        if(formFlow === "ACHFileList"){
          this.detailsData = navManager.getCustomInfo("ACHFileDetails");
          this.loadAchDetails(this.detailsData);	
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].Request_id});
          this.btnConfigApprovalDetails(formFlow,this.detailsData[0].amICreator, this.detailsData[0].amIApprover,this.detailsData[0].lblStatus);
        }else if(formFlow === "ACHTransactionsList"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          this.loadTransactionDetails(this.detailsData);
          this.view.lblTransfer.text=kony.i18n.getLocalizedString("kony.mb.Europe.TotalAmount");
          this.view.lblTransferValue.text=this.detailsData[0].lblAmount;
          this.fetchDestinationAccounts({"Transaction_id": this.detailsData[0].Transaction_id});
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = true;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].Request_id});
          this.btnConfigApprovalDetails(formFlow,this.detailsData[0].amICreator, this.detailsData[0].amIApprover,this.detailsData[0].Status);        
        }else if(formFlow === "TransactionDetailsApprovals"){  
          kony.print("formFlow ::"+formFlow);
          this.detailsData = navManager.getCustomInfo("generalTransactionDetails");
          this.loadTransactionDetailsApprovals(this.detailsData);
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransferAmount");
          this.view.lblTransferValue.text= this.getAmountVal(this.detailsData[0].data);
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);        
        }else if(formFlow ==="ACHTransactionDetailsApprovals"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadAchTransactionDetailsApprovals(this.detailsData);
          this.view.lblTransfer.text=kony.i18n.getLocalizedString("kony.mb.Europe.TotalAmount");
          var amountReq = kony.sdk.isNullOrUndefined(this.detailsData[0].data.amount) ? this.detailsData[0].data.transactionAmount : this.detailsData[0].data.amount;
          this.view.lblTransferValue.text=configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(amountReq,true);
          this.fetchDestinationAccounts({"Transaction_id": this.detailsData[0].data.transactionId});
          this.view.flxTransfer.isVisible = true;
          if(this.detailsData[0].data.featureName.toLowerCase() === "ach files"){
            this.view.flxdesinationaccount.isVisible = false;
            this.view.segDestinationaccount.isVisible = false;
          }else{
            this.view.flxdesinationaccount.isVisible = true;
            this.view.segDestinationaccount.isVisible = true;
          }
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);        
        }else if(formFlow === "ACHFileListApprovals"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          this.loadAchFileDetailsApprovals(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }else if(formFlow === "TransactionDetailsRequests"){  
          kony.print("formFlow ::"+formFlow);
          this.detailsData = navManager.getCustomInfo("generalTransactionDetails");
          this.loadTransactionDetailsRequest(this.detailsData);  
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransferAmount");
          this.view.lblTransferValue.text= this.getAmountVal(this.detailsData[0].data);
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsRequest(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);        
        }else if(formFlow ==="ACHTransactionDetailsRequests"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadAchTransactionDetailsRequest(this.detailsData);
          this.view.lblTransfer.text=kony.i18n.getLocalizedString("kony.mb.Europe.TotalAmount");
          this.view.lblTransferValue.text= configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(parseFloat((kony.sdk.isNullOrUndefined(this.detailsData[0].data.amount))? (parseFloat(this.detailsData[0].data.transactionAmount) + parseFloat(this.detailsData[0].data.serviceCharge)):detailsData[0].data.amount),true);
          this.fetchDestinationAccounts({"Transaction_id": this.detailsData[0].data.transactionId});
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = true;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsRequest(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);        
        }else if(formFlow === "ACHFileListRequests"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          this.loadAchFileDetailsRequest(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsRequest(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }else if(formFlow ==="ApprovalHistoryTransaction"){
          this.detailsData = navManager.getCustomInfo("ApprovalHistoryDetails");            
          this.loadApprovalsHistoryTransaction(this.detailsData);
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransferAmount");
          this.view.lblTransferValue.text = this.getAmountVal(this.detailsData[0].data);
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;  
          this.view.lblheaderapproval.text = kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
        }else if(formFlow ==="ApprovalHistoryACHTransaction"){
          this.detailsData = navManager.getCustomInfo("ApprovalHistoryDetails");                     
          this.loadApprovalsHistoryACHTransaction(this.detailsData);
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.Europe.TotalAmount");
          this.view.lblTransferValue.text = this.detailsData[0].amount;
          this.fetchDestinationAccounts({"Transaction_id": this.detailsData[0].transactionId});
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = true;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text = kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;               
        }else if(formFlow === "ApprovalHistoryACHFile"){
          this.detailsData = navManager.getCustomInfo("ApprovalHistoryDetails");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
          this.loadApprovalsHistoryACHFiles(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.lblheaderapproval.text = kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");          
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;               
        }else if(formFlow === "RequestHistoryTransaction"){  
          this.detailsData = navManager.getCustomInfo("RequestHistoryDetails");
          this.loadRequestHistoryTransaction(this.detailsData);  
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransferAmount");
          this.view.lblTransferValue.text= this.getAmountVal(this.detailsData[0].data);
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false; 
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
        }else if(formFlow ==="RequestHistoryACHTransaction"){
          this.detailsData = navManager.getCustomInfo("RequestHistoryDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadRequestHistoryACHTransaction(this.detailsData);
          this.view.lblTransfer.text=kony.i18n.getLocalizedString("kony.mb.Europe.TotalAmount");
          this.view.lblTransferValue.text= this.detailsData[0].amount;
          this.fetchDestinationAccounts({"Transaction_id": this.detailsData[0].transactionId});
          this.view.flxTransfer.isVisible = true;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = true;
          this.view.flxapprovalhistory.isVisible = true;
           this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false; 
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
        }else if(formFlow === "RequestHistoryACHFile"){
          this.detailsData = navManager.getCustomInfo("RequestHistoryDetails");
          this.loadRequestHistorydetail(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;  
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
        this.view.flxConfirmationPopUp.isVisible = false;
        this.setupNavBarSkinForiPhone();
        }
        else if(formFlow === "ApprovalHistoryBulkPayment"){
          this.detailsData = navManager.getCustomInfo("ApprovalHistoryDetails");
          this.loadApprovalHistoryBulkPayment(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
          this.view.flxConfirmationPopUp.isVisible = false;
          this.setupNavBarSkinForiPhone();
        }
        else if(formFlow === "RequestHistoryBulkPayment"){
          this.detailsData = navManager.getCustomInfo("RequestHistoryDetails");
          this.loadApprovalHistoryBulkPayment(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;  
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].requestId});
          this.view.flxConfirmationPopUp.isVisible = false;
          this.setupNavBarSkinForiPhone();
        }
        else if(formFlow ==="BulkPaymentRequests"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadRequestBulkPayment(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          //this.btnConfigApprovalDetailsRequest(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);        
        }
        else if(formFlow ==="BulkPaymentApproval"){
          this.detailsData = navManager.getCustomInfo("ACHTranactionDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadRequestBulkPayment(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = true;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=true;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }
        else if(formFlow === "ChequeBookRequests"){
          this.detailsData = navManager.getCustomInfo("chequeBookRequestDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadRequestChequeBook(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }
        else if(formFlow === "ChequeBookApprovals"){
          this.detailsData = navManager.getCustomInfo("chequeBookApprovalDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadApprovalsChequeBook(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }
        else if(formFlow === "RequestHistoryChequeBook"){
          this.detailsData = navManager.getCustomInfo("chequeBookRequestHistoryDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadRequestsChequeBookHistory(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=false;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.RequestHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          //this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }
        else if(formFlow === "ApprovalHistoryChequeBook"){
          this.detailsData = navManager.getCustomInfo("chequeBookApprovalHistoryDetails");
          kony.print("test"+JSON.stringify(this.detailsData[0]));
          this.loadApprovalsChequeBookHistory(this.detailsData);
          this.view.flxTransfer.isVisible = false;
          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
          this.view.flxapprovalhistory.isVisible = true;
          this.view.flximgDesniationacccount.isVisible=false;
          this.view.lblHeader.text=kony.i18n.getLocalizedString("kony.mb.accdetails.paymentDetails");
          this.view.flxWebApplitionTitle.isVisible=false;
          this.view.lblheaderapproval.text=kony.i18n.getLocalizedString("kony.mb.achtransationdetail.ApprovalHistoryInformation");
          this.getApprovalReqHistory({"Request_id":this.detailsData[0].data.requestId});
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          //this.btnConfigApprovalDetailsApprovalReq(formFlow,this.detailsData[0].data.amICreator, this.detailsData[0].data.amIApprover,this.detailsData[0].data.status);
        }
        
      }catch(error){
        this.clearServiceCount();
        kony.print("frmApprovalsTransactionDetail preShowActions-->"+error);
        kony.print(error);
      }
      
      try{
        this.withdrawCalled = false;
      }catch(err){}
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

    bindevents:function()
    {
      try {  
        this.view.segDestinationaccount.isVisible=true;
        this.view.flxRejectpopup.isVisible=false;
        this.view.imgUpArrow.src="blue_uparrow.png";
        this.view.imgapprovalhis.src="blue_uparrow.png";
        this.view.flximgDesniationacccount.onClick=this.showDesinationAccount;
        this.view.flximgApprovalhistory.onClick=this.showApprovalHistory;
        this.view.btnReject.onClick=this.rejectBtnOnClick;
        this.view.flxRejectpopup.onClick=this.dummyFunction;
        this.view.rejectPopUp.txtRejectreason.onTextChange=this.rejectEnabledButton;
        this.view.rejectPopUp.flxReject.onClick = this.onClickOkcommon;
        this.view.btnApprove.onClick = this.approveServicecall;
        this.view.btnWithdraw.onClick = this.confirmWithdrawalPopup;
        this.view.customHeader.flxBack.onClick = this.backNavigation;
        this.view.rejectPopUp.flxCancel.onClick = this.rejectCancel;
        this.view.flxConfirmationPopUp.onClick = this.closePopup;
        this.view.confirmationAlertPopup.onClickflxNo = this.closePopup;
        this.view.confirmationAlertPopup.onClickflxYes = this.withdrawHandler;
        this.view.rejectPopUp.flxContainer.onClick = this.dummyFunction;
        this.view.onDeviceBack=this.dummyFunction;
        //this.view.segApprovalHistory.onRowClick=this.ApprovalHistoryRowOnclick;
        if(this.previousFormType==="ACHTransactionsList"){
          this.view.flxTransfer.isVisible = true;
          this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransferAmount");
          this.view.lblTransferValue.text = "$15,00,000.54";
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }

        }
        else if(this.previousFormType==="ACHFileList"){
          this.view.flxTransfer.isVisible = false;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.FileDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.FileDetails");
          }
          if(this.previousFormType==="ACHTransactionDetailsApprovals"){ 
            this.view.flxdetails.isVisible = true;
            this.view.flxTransfer.isVisible = true;
            this.view.lblTransfer.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TotalAmount");
            this.view.lblTransferValue.text = "$15,00,000.54";
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.ACHTransactionDetails");
          }
        }
        else if(this.previousFormType==="TransactionDetailsApprovals"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }
        }
        else if(this.previousFormType==="ACHTransactionDetailsApprovals"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail. ACHTransactionDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail. ACHTransactionDetails");
          }
        }
        else if(this.previousFormType==="ACHFileListApprovals"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.ACHfileDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.ACHfileDetails");
          }
        }
        else if(this.previousFormType==="TransactionDetailsRequests"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TransactionDetails");
          }
        }
        else if(this.previousFormType==="ACHTransactionDetailsRequests"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail. ACHTransactionDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail. ACHTransactionDetails");
          }
        }
        else if(this.previousFormType==="ACHFileListRequests"){
          this.view.flxTransfer.isVisible = true;
          this.view.flxdetails.isVisible = true;
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.ACHfileDetails");
          }else{
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.ACHfileDetails");
          }
        }
      }catch(error){
        kony.print("frmApprovalsTransactionDetail bindevents-->"+error);
      }       
    },

    backNavigation:function(){
      try{
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      }catch(er){

      }
    },
    btnConfigApprovalDetailsApprovalReq:function(formFlow,amICreator,amIApprover,status){
      try{
        kony.print("Entered in btnConfigApprovalDetailsApprovalReq"+formFlow +" "+amICreator+" "+amIApprover+" "+status);
        if(status === "Executed" || status === "executed" || status === "Rejected" || status === "rejected" || status.toLowerCase() == "approved"){
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          return;
        }
        switch(formFlow){
          case "TransactionDetailsApprovals" :
            kony.print("swich case TransactionDetailsApprovals");
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
          case "ACHTransactionDetailsApprovals":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
          case "ACHFileListApprovals":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
            case "BulkPaymentApproval" :
            kony.print("swich case TransactionDetailsApprovals");
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            case "ChequeBookRequests":
            case "ChequeBookApprovals":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = true;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
        }
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
        kony.print("Exception in btnConfigApprovalDetailsApprovalReq"+er);
      }
    },
    formSupportingDocs:function(docs){
      if(kony.sdk.isNullOrUndefined(docs) || !Array.isArray(docs) || docs.length === 0)
        return null;
      var suppDocs = docs[0].fileNameValue;
      for(var i=1; i<docs.length; i++){
        suppDocs += ", "+ docs[i].fileNameValue;
      }
      return suppDocs;
    },
    loadTransactionDetailsApprovals:function(detailsData){
      try{   
        var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var payeeArray=[];
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.payee){
            payeeArray .push(accounts[k]);
          }            
        } 
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray .push(accounts[k]);
          }            
        }
              
              var payee;
              var payeeType;
              var from;
              var fromType;
              if(payeeArray.length===0){
                payee = detailsData[0].data.payee;
                payeeType = {text : "" , isVisible : false};        
              }else{
                payee = CommonUtilities.truncateStringWithGivenLength(payeeArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(payeeArray[0].accountID);
                payeeType= {text: payeeArray[0].accountType + " " + "Account",isVisible: true};
              }
        if(fromArray.length===0){
          from = detailsData[0].data.accountID;
          fromType = {text : "" , isVisible : false};        
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
          fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
        }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";//40dp
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var showIndicativeCharges = !kony.sdk.isNullOrUndefined(detailsData[0].data.indicativeRate) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount) && 
          !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionAmount) && !kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionCurrency)
          && (detailsData[0].data.fromAccountCurrency !== detailsData[0].data.transactionCurrency);
        var exchangeRates;

        if(showIndicativeCharges){
          if( detailsData[0].data.totalDebitAmount <= detailsData[0].data.transactionAmount){
            exchangeRates = "1,00 "+ detailsData[0].data.fromAccountCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.transactionCurrency;
          }
          else
            exchangeRates = "1,00 "+ detailsData[0].data.transactionCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.fromAccountCurrency;
        }
        var showSwiftCode = kony.sdk.isNullOrUndefined(detailsData[0].data.swiftCode) || detailsData[0].data.swiftCode === ""? false : true;
        var showCharges = kony.sdk.isNullOrUndefined(detailsData[0].data.charges) ? false : true;
        try{
          if(showCharges)
            detailsData[0].data.charges = JSON.parse(detailsData[0].data.charges);
        }
        catch(err){
          showCharges = false;
        }
        if (showCharges && typeof(detailsData[0].data.charges) === 'object' && detailsData[0].data.charges.length !== 0) {
          var chargeBreakdown = "";
          var formatManager = applicationManager.getFormatUtilManager();
          detailsData[0].data.charges.forEach(function(obj){
              var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
              var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
              if(chargeBreakdown === ""){
                  chargeBreakdown = `${str}`;
              }
              else{
                  chargeBreakdown = `${chargeBreakdown} ${str}`;
              };
          });
        }
        var featureActionId = detailsData[0].data.featureActionId;
        var showBeneficiaryName = false, showBeneficiaryAddress = false, showBeneficiaryBankAddr = false, showPaymentDetails = false, showPaymentMethod = false;
        if(!kony.sdk.isNullOrUndefined(featureActionId)){
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") ){
            showBeneficiaryName = true;
            showBeneficiaryAddress = true;
          }
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER")  || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER"))
            showBeneficiaryBankAddr = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER"))
            showPaymentMethod = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("TRANSFER_BETWEEN_OWN_ACCOUNT"))
            showPaymentDetails = true;
        }

        var suppDocuments = this.formSupportingDocs(detailsData[0].data.fileNames);

        var showEndDate = false;
        var frequency = detailsData[0].data.frequency
        if( !kony.sdk.isNullOrUndefined(frequency) && frequency.trim() !== "" && frequency.trim().toLowerCase() !== "once"){
          showEndDate = true;
        }

        var totalDebitVal = "";
        if(!kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount)){
          var formatManager = applicationManager.getFormatUtilManager();
          var currencySymbol = formatManager.getCurrencySymbol(detailsData[0].data.fromAccountCurrency);
          totalDebitVal = `${currencySymbol}${detailsData[0].data.totalDebitAmount}`; 
        }
        var detailsArr=[
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.from"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(from)?"-":from},
            "lblSubValue": fromType,
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon} 
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryName"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryName},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.toAccountName) || detailsData[0].data.toAccountName === "") ? "-" : detailsData[0].data.toAccountName },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.AccountNoIBAN"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(payee)?"-":payee},
            "lblSubValue": payeeType,
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentMethod"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showPaymentMethod},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.paymentType) || detailsData[0].data.paymentType === "") ? "-" : detailsData[0].data.paymentType },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.tab.addBen.swiftcode"),
            "lblColon": ":",
            "flxtemplate": { text: "",isVisible: showSwiftCode},
            "lblValue": { text: detailsData[0].data.swiftCode },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryBankAddress"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryBankAddr},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.beneficiaryBankAddress) || detailsData[0].data.beneficiaryBankAddress === "" ) ? "-" : detailsData[0].data.beneficiaryBankAddress },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: showIndicativeCharges},
            "lblValue": { text: exchangeRates },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.Europe.FeeBreakdown"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: showCharges},
            "lblValue": { text: chargeBreakdown },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
            "lblColon":":",
            "lblValue":{text:totalDebitVal},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
            "lblColon": ":",
            "flxtemplate": { isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.paidBy) },
            "lblValue": { text:  detailsData[0].data.paidBy === "" ? "-" : detailsData[0].data.paidBy },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.frequency)?"-":detailsData[0].data.frequency},
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionDate"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.processingDate)?"-":CommonUtilities.getFrontendDateString(detailsData[0].data.processingDate,"mm/dd/yyyy")},
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.creditValueDate"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.creditValueDate) && !showEndDate},
            "lblValue": { text: CommonUtilities.getFrontendDateString(detailsData[0].data.creditValueDate,"mm/dd/yyyy") },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.endDate"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showEndDate},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.frequencyEndDate) || detailsData[0].data.frequencyEndDate === "") ? "-" : CommonUtilities.getFrontendDateString(detailsData[0].data.frequencyEndDate,"mm/dd/yyyy") },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.supportingDocuments"),
            "lblColon": ":",
            "flxtemplate": { isVisible: true},
            "lblValue": { text: (suppDocuments == null ? "-" : suppDocuments), width: "90%" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentDetails"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showPaymentDetails},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.description) || detailsData[0].data.description === "") ? "-" : detailsData[0].data.description, width: "90%" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryNickName"),
            "lblColon": ":",
            "flxtemplate": { isVisible: true},
            "lblValue": { text: "-" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.TansfersEurope.BeneficiaryAddress"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryAddress},
            "lblValue": { text: "-" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.TransfersEurope.PaymentReference"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.transactionId)?"-":detailsData[0].data.transactionId},
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy)?"-":detailsData[0].data.sentBy},
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.recurrence"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.recurrence)?"-":detailsData[0].data.recurrence},
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.featureName)?"-":detailsData[0].data.featureName},
            "lblSubValue" : {text : detailsData[0].data.transactionType, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konybb.common.referenceId"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.requestId)?"-":detailsData[0].data.requestId},
            "lblSubValue" : {text : " ", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.customerName)?"-":detailsData[0].data.customerName+"-"+detailsData[0].data.customerId},
            "lblSubValue" : {text : " ", isVisible : false},
            "flxUserType":{isVisible:false},

          },
        ];
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
      }
    },
    loadApprovalsHistoryTransaction:function(detailsData){
      try{
        kony.print("Entered loadApprovalsHistoryTransaction"+JSON.stringify(detailsData[0]));
        var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var payeeArray=[];
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].payee){
            payeeArray .push(accounts[k]);
          }            
        } 
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].accountId){
            fromArray .push(accounts[k]);
          }            
        } 
              var payee;
              var payeeType;
              var from;
              var fromType;

              if(payeeArray.length===0){
                payee = detailsData[0].payee;
                payeeType = {text : "" , isVisible : false};        
              }else{
                payee = CommonUtilities.truncateStringWithGivenLength(payeeArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(payeeArray[0].accountID);
                payeeType= {text: payeeArray[0].accountType + " " + "Account",isVisible: true};
              }

              if(fromArray.length===0){
                from = detailsData[0].accountID;
                fromType = {text : "" , isVisible : false};        
              }else{
                from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
                fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
              }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var showIndicativeCharges = !kony.sdk.isNullOrUndefined(detailsData[0].data.indicativeRate) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount) && 
          !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionAmount) && !kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionCurrency)
          && (detailsData[0].data.fromAccountCurrency !== detailsData[0].data.transactionCurrency);
        var exchangeRates;

        if(showIndicativeCharges){
          if( detailsData[0].data.totalDebitAmount <= detailsData[0].data.transactionAmount){
            exchangeRates = "1,00 "+ detailsData[0].data.fromAccountCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.transactionCurrency;
          }
          else
            exchangeRates = "1,00 "+ detailsData[0].data.transactionCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.fromAccountCurrency;
        }
        var showSwiftCode = kony.sdk.isNullOrUndefined(detailsData[0].data.swiftCode) || detailsData[0].data.swiftCode === "" ? false : true;
        var showCharges = kony.sdk.isNullOrUndefined(detailsData[0].data.charges) ? false : true;
        try{
          if(showCharges)
            detailsData[0].data.charges = JSON.parse(detailsData[0].data.charges);
        }
        catch(err){
          showCharges = false;
        }
        var chargeBreakdown = "";
        if (showCharges && typeof(detailsData[0].data.charges) === 'object' && detailsData[0].data.charges.length !== 0) {
          var formatManager = applicationManager.getFormatUtilManager();
          detailsData[0].data.charges.forEach(function(obj){
              var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
              var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
              if(chargeBreakdown === ""){
                  chargeBreakdown = `${str}`;
              }
              else{
                  chargeBreakdown = `${chargeBreakdown}
${str}`;
              };
          });
        }
        var featureActionId = detailsData[0].data.featureActionId;
        var showBeneficiaryName = false, showBeneficiaryAddress = false, showBeneficiaryBankAddr = false, showPaymentDetails = false, showPaymentMethod = false;
        if(!kony.sdk.isNullOrUndefined(featureActionId)){
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") ){
            showBeneficiaryName = true;
            showBeneficiaryAddress = true;
          }
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER")  || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER"))
            showBeneficiaryBankAddr = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER"))
            showPaymentMethod = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("TRANSFER_BETWEEN_OWN_ACCOUNT"))
            showPaymentDetails = true;
        }

        var suppDocuments = this.formSupportingDocs(detailsData[0].data.fileNames);

        var showEndDate = false;
        var frequency = detailsData[0].data.frequency
        if( !kony.sdk.isNullOrUndefined(frequency) && frequency.trim() !== "" && frequency.trim().toLowerCase() !== "once"){
          showEndDate = true;
        }

        var totalDebitVal = "";
        if(!kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount)){
          var formatManager = applicationManager.getFormatUtilManager();
          var currencySymbol = formatManager.getCurrencySymbol(detailsData[0].data.fromAccountCurrency);
          totalDebitVal = `${currencySymbol}${detailsData[0].data.totalDebitAmount}`; 
        }
        var detailsArr = [
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.from"),
            "lblColon":":",
            "lblValue": {text:kony.sdk.isNullOrUndefined(from)?"-":from},
            "lblSubValue": fromType,
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryName"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryName},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.toAccountName) || detailsData[0].data.toAccountName === "") ? "-" : detailsData[0].data.toAccountName },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.AccountNoIBAN"),
            "lblColon": ":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(payee)?"-":payee},
            "lblSubValue": payeeType,
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentMethod"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showPaymentMethod},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.paymentType) || detailsData[0].data.paymentType === "") ? "-" : detailsData[0].data.paymentType },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.tab.addBen.swiftcode"),
            "lblColon": ":",
            "flxtemplate": { text: "",isVisible :showSwiftCode},
            "lblValue": { text: detailsData[0].data.swiftCode },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryBankAddress"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryBankAddr},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.beneficiaryBankAddress) || detailsData[0].data.beneficiaryBankAddress === "" ) ? "-" : detailsData[0].data.beneficiaryBankAddress },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: showIndicativeCharges},
            "lblValue": { text: exchangeRates },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.Europe.FeeBreakdown"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: showCharges},
            "lblValue": {text : chargeBreakdown},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
            "lblColon":":",
            "lblValue":{text: totalDebitVal},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
            "lblColon": ":",
            "flxtemplate": { isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.paidBy) },
            "lblValue": { text:  detailsData[0].data.paidBy === "" ? "-" : detailsData[0].data.paidBy },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].frequency},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionDate"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].sentDate},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.creditValueDate"),
            "lblColon": ":",
            "flxtemplate": {text: "", isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.creditValueDate) && !showEndDate},
            "lblValue": { text: CommonUtilities.getFrontendDateString(detailsData[0].data.creditValueDate,"mm/dd/yyyy") },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.endDate"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showEndDate},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.frequencyEndDate) || detailsData[0].data.frequencyEndDate === "") ? "-" : CommonUtilities.getFrontendDateString(detailsData[0].data.frequencyEndDate,"mm/dd/yyyy") },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.supportingDocuments"),
            "lblColon": ":",
            "flxtemplate": { isVisible: true},
            "lblValue": { text: (suppDocuments == null ? "-" : suppDocuments), width: "90%" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentDetails"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showPaymentDetails},
            "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.description) || detailsData[0].data.description === "") ? "-" : detailsData[0].data.description, width: "90%" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryNickName"),
            "lblColon": ":",
            "flxtemplate": { isVisible: true},
            "lblValue": { text: "-" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey": kony.i18n.getLocalizedString("kony.mb.TansfersEurope.BeneficiaryAddress"),
            "lblColon": ":",
            "flxtemplate": { isVisible: showBeneficiaryAddress},
            "lblValue": { text: "-" },
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false}
          },       
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.TransfersEurope.PaymentReference"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].transactionId},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].sentBy},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.recurrence"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].recurrence},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].featureName},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konybb.common.referenceId"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.requestId)?"-":detailsData[0].data.requestId},
            "lblSubValue" : {text : " ", isVisible : false},
            "flxUserType":{isVisible:false}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].customerName+"-"+detailsData[0].customerId},
            "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
            "flxUserType":{isVisible:false},
          },
        ];
        var jsonData={};
//         if(this.detailsData[0].Status === "pending" || this.detailsData[0].Status === "Pending"){
//           jsonData={
//             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
//             "lblColon":"",
//             "lblValue":this.detailsData[0].receivedApprovals +" "+"of"+" "+this.detailsData[0].requiredApprovals+" "+"Approved",
//             "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
//             "flxSeperatorTrans3":{isVisible: false},
//           };
//           detailsArr.push(jsonData);                  
//         }else if(this.detailsData[0].Status === "approved" || this.detailsData[0].Status === "Approved"){
//           jsonData={
//             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
//             "lblColon":"",
//             "lblValue":this.detailsData[0].receivedApprovals +" "+"of"+" "+this.detailsData[0].requiredApprovals+" "+"Approved",
//             "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
//             "flxSeperatorTrans3":{isVisible: false},
//           };
//           detailsArr.push(jsonData);                  
//         }
//         else if(this.detailsData[0].Status === "rejected" || this.detailsData[0].Status === "Rejected"){
//           jsonData={
//             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
//             "lblColon":"",
//             "lblValue":1+" "+kony.i18n.getLocalizedString("kony.mb.achtransactions.Rejection"),
//             "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
//             "flxSeperatorTrans3":{isVisible: false},
//           };
//           detailsArr.push(jsonData); 
//         }
//         else{
//           jsonData={
//             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
//             "lblColon":"",
//             "lblValue":this.detailsData[0].requiredApprovals+" "+kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus"),
//             "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
//             "flxSeperatorTrans3":{isVisible: false},
//           };
//           detailsArr.push(jsonData); 
//         }
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(er){
        kony.print("Exception loadApprovalsHistoryTransaction"+er);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    loadApprovalsHistoryACHTransaction:function(detailsData){
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
              var navManager = applicationManager.getNavigationManager();     
              var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
              var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
              var internalAccounts;
              var accounts;
              internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
              var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
              if(Array.isArray(externalAccounts)){
                if(externalAccounts.length===0){
                  accounts = internalAccounts.concat(externalAccounts);
                }else{
                  accounts = custominfoInt.accountData; 
                }
              }else{
                accounts = custominfoInt.accountData;
              }
              var accountsArray=[];              
              for(var k=0;k<accounts.length;k++){
                if(accounts[k].accountID===detailsData[0].data.accountId){
                  accountsArray .push(accounts[k]);
                }            
              } 
              var debitAccount;
              if(accountsArray.length===0){
                debitAccount = detailsData[0].data.accountId;      
              }else{
                debitAccount = CommonUtilities.truncateStringWithGivenLength(accountsArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(accountsArray[0].accountID);
              }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(accountsArray[0].isBusinessAccount==="true" || accountsArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var detailsArr=[
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateName"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].templateName},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].requestType},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].featureName},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.debitAccountNo"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(debitAccount)?"-":debitAccount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdOn"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].sentDate},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].sentBy},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.CompanyNameid"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].customerName+"-"+detailsData[0].companyId},
            "lblSubValue" : {text : " ", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          //           {
          //             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateDescription"),
          //             "lblColon":":",
          //             "lblValue":detailsData[0].sentDate,
          //             "lblSubValue" : {text :"", isVisible : false},
          //           },

          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.EffectiveDate"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].processingDate},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konymb.apptradet.ConfirmationNumber"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].confirmationNumber},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.Amount"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].amount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].status},
            "lblSubValue" : {text :"", isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
            "flxUserType":{isVisible:false},
          },
        ];
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
      
     loadApprovalsHistoryACHFiles:function(detailsData){
      try{

        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileName"),
                "lblColon":":",
                "lblValue":detailsData[0].fileName,
                "lblSubValue" : {text :"", isVisible : false},
              },{
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType"),
                "lblColon":":",
                "lblValue":detailsData[0].fileType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":detailsData[0].requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue":detailsData[0].customerName,
                "lblSubValue" : {text : " ", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                "lblColon":":",
                "lblValue":detailsData[0].status,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy"),
                "lblColon":":",
                "lblValue":detailsData[0].sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate"),
                "lblColon":":",
                "lblValue":detailsData[0].sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].totalCreditAmount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfDebits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfCredits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfPrenotes,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfRecords,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              }];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },
    
    btnConfigApprovalDetailsRequest:function(formFlow,amICreator,amIApprover,status){
      try{
        kony.print("Entered in btnConfigApprovalDetailsApprovalReq"+formFlow +" "+amICreator+" "+amIApprover+" "+status);
        if(status === "Executed" || status === "executed" || status === "Rejected" || status === "rejected" ||
           status.toLowerCase() === "approved" ||status === "Failed" || status ==="sent" || status === "Sent"){
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
          return;
        }
        switch(formFlow){
          case "TransactionDetailsRequests" :
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
          case "ACHTransactionDetailsRequests":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
          case "ACHFileListRequests":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
            case "BulkPaymentRequests":
            if(status.toLowerCase() === "pending"){
              if(amIApprover === "true" && amICreator ==="false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }else if(amIApprover === "false" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if (amIApprover === "true" && amICreator === "true"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = true;
              }else if(amIApprover === "false" && amICreator === "false"){
                this.view.flxbtnApproveReject.isVisible = false;
                this.view.flxbtnWithdraw.isVisible = false;
              }
            }else{
              this.view.flxbtnApproveReject.isVisible = false;
              this.view.flxbtnWithdraw.isVisible = false;
            }
            break;
        }
      }catch(er){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("Exception in btnConfigApprovalDetailsApprovalReq"+er);
      }
    },
    loadAchTransactionDetailsApprovals:function(detailsData){
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
              var navManager = applicationManager.getNavigationManager();     
              var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
              var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
              var internalAccounts;
              var accounts;
              internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
              var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
              if(Array.isArray(externalAccounts)){
                if(externalAccounts.length===0){
                  accounts = internalAccounts.concat(externalAccounts);
                }else{
                  accounts = custominfoInt.accountData; 
                }
              }else{
                accounts = custominfoInt.accountData;
              }
              var accountsArray=[];              
              for(var k=0;k<accounts.length;k++){
                if(accounts[k].accountID===detailsData[0].data.accountId){
                  accountsArray .push(accounts[k]);
                }            
              } 
        var debitAccount;

        if(accountsArray.length===0){
          debitAccount = detailsData[0].data.accountId;      
        }else{
          debitAccount = CommonUtilities.truncateStringWithGivenLength(accountsArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(accountsArray[0].accountID);
        }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(accountsArray[0].isBusinessAccount==="true" || accountsArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var detailsArr=[
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateName"),
            "lblColon":":",
            "lblValue":{text: kony.sdk.isNullOrUndefined(detailsData[0].data.templateName) ? "No Template Used" : detailsData[0].data.templateName},
            "lblSubValue": {
              text: "",
              isVisible: false
            },
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.featureName},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.requestType},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.debitAccountNo"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(debitAccount)?"-":debitAccount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdOn"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.sentDate},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.sentBy},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.CompanyNameid"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.companyId},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.EffectiveDate"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.processingDate)?"-":CommonUtilities.getFrontendDateString(detailsData[0].data.processingDate,"mm/dd/yyyy")},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konymb.apptradet.ConfirmationNumber"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.confirmationNumber},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.Amount"),
            "lblColon":":",
            "lblValue":{text: kony.sdk.isNullOrUndefined(detailsData[0].data.amount) ? detailsData[0].data.transactionAmount : detailsData[0].data.amount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.status},
            "lblSubValue" : {text :"", isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
            "flxUserType":{isVisible:false},
          },
          //            {
          //             "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
          //             "lblColon":":",
          //             "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].customerName)?"N/A":detailsData[0].customerName,
          //             "lblSubValue" : {text : " ", isVisible : false},

          //           },
        ];
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

     loadAchFileDetailsApprovals:function(detailsData){
      try{

        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileName"),
                "lblColon":":",
                "lblValue":detailsData[0].data.fileName,
                "lblSubValue" : {text :"", isVisible : false},
              },{
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType"),
                "lblColon":":",
                "lblValue":detailsData[0].data.fileType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                "lblColon":":",
                "lblValue":detailsData[0].data.status,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy"),
                "lblColon":":",
                "lblValue":detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate"),
                "lblColon":":",
                "lblValue":detailsData[0].data.sentDate,//tpdatedDateAndTime,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount"),
                "lblColon":":",
                "lblValue":CommonUtilities.getDateAndTimeInUTC(detailsData[0].data.totalCreditAmount),
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfDebits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfCredits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfPrenotes,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfRecords,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              },
//               {
//                 "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
//                 "lblColon":":",
//                 "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.customerName)?"N/A":detailsData[0].data.customerName,
//                 "lblSubValue" : {text : " ", isVisible : false},
//               },
            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadTransactionDetailsRequest:function(detailsData){
      try{
        kony.print("Entered loadTransactionDetailsRequest"+JSON.stringify(detailsData[0]));
        var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();  
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var payeeArray=[];
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.payee){
            payeeArray .push(accounts[k]);
          }            
        } 
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray .push(accounts[k]);
          }
        }    
                  var payee;
                  var payeeType;
                  var from;
                  var fromType; 

                  if(payeeArray.length===0){
                    payee = detailsData[0].data.payee;
                    payeeType = {text : "" , isVisible : false};        
                  }else{
                    payee = CommonUtilities.truncateStringWithGivenLength(payeeArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(payeeArray[0].accountID);
                    payeeType= {text: payeeArray[0].accountType + " " + "Account",isVisible: true};
                  }
                  if(fromArray.length===0){
                    from = detailsData[0].data.accountId;
                    fromType = {text : "" , isVisible : false};        
                  }else{
                    from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
                    fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
                  }
        var showIndicativeCharges = !kony.sdk.isNullOrUndefined(detailsData[0].data.indicativeRate) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount) && 
          !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionAmount) && !kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionCurrency)
          && (detailsData[0].data.fromAccountCurrency !== detailsData[0].data.transactionCurrency);
        var exchangeRates;

        if(showIndicativeCharges){
          if( detailsData[0].data.totalDebitAmount <= detailsData[0].data.transactionAmount){
            exchangeRates = "1,00 "+ detailsData[0].data.fromAccountCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.transactionCurrency;
          }
          else
            exchangeRates = "1,00 "+ detailsData[0].data.transactionCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.fromAccountCurrency;
        }
        var showSwiftCode = kony.sdk.isNullOrUndefined(detailsData[0].data.swiftCode) || detailsData[0].data.swiftCode === "" ? false : true;
        var showCharges = kony.sdk.isNullOrUndefined(detailsData[0].data.charges) ? false : true;
        try{
          if(showCharges)
            detailsData[0].data.charges = JSON.parse(detailsData[0].data.charges);
        }
        catch(err){
          showCharges = false;
        }
        var chargeBreakdown = "";
        if (showCharges && typeof(detailsData[0].data.charges) === 'object' && detailsData[0].data.charges.length !== 0) {
          var formatManager = applicationManager.getFormatUtilManager();
          detailsData[0].data.charges.forEach(function(obj){
              var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
              var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
              if(chargeBreakdown === ""){
                  chargeBreakdown = `${str}`;
              }
              else{
                  chargeBreakdown = `${chargeBreakdown}
${str}`;
              };
          });
        }
        var featureActionId = detailsData[0].data.featureActionId;
        var showBeneficiaryName = false, showBeneficiaryAddress = false, showBeneficiaryBankAddr = false, showPaymentDetails = false, showPaymentMethod = false;
        if(!kony.sdk.isNullOrUndefined(featureActionId)){
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") ){
            showBeneficiaryName = true;
            showBeneficiaryAddress = true;
          }
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER")  || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER"))
            showBeneficiaryBankAddr = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER"))
            showPaymentMethod = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("TRANSFER_BETWEEN_OWN_ACCOUNT"))
            showPaymentDetails = true;
        }

        var suppDocuments = this.formSupportingDocs(detailsData[0].data.fileNames);

        var showEndDate = false;
        var frequency = detailsData[0].data.frequency
        if( !kony.sdk.isNullOrUndefined(frequency) && frequency.trim() !== "" && frequency.trim().toLowerCase() !== "once"){
          showEndDate = true;
        }
        
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var totalDebitVal = "";
        if(!kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount)){
          var formatManager = applicationManager.getFormatUtilManager();
          var currencySymbol = formatManager.getCurrencySymbol(detailsData[0].data.fromAccountCurrency);
          totalDebitVal = `${currencySymbol}${detailsData[0].data.totalDebitAmount}`; 
        }
                var detailsArr = [
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.common.from"),
                    "lblColon":":",
                    "lblValue": {text:kony.sdk.isNullOrUndefined(from)?"-":from},
                    "lblSubValue":fromType,
                    "flxUserType":{
                      isVisible:iconVisible
                    },
                    "imgUserType":{
                      src:imgIcon
                    }
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryName"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showBeneficiaryName},
                    "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.toAccountName) || detailsData[0].data.toAccountName === "") ? "-" : detailsData[0].data.toAccountName },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.AccountNoIBAN"),
                    "lblColon": ":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(payee)?"-":payee} ,
                    "lblSubValue": payeeType,
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentMethod"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showPaymentMethod},
                    "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.paymentType) || detailsData[0].data.paymentType === "") ? "-" : detailsData[0].data.paymentType },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.tab.addBen.swiftcode"),
                    "lblColon": ":",
                    "flxtemplate": { text: "", isVisible :showSwiftCode},
                    "lblValue": { text: detailsData[0].data.swiftCode },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryBankAddress"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showBeneficiaryBankAddr},
                    "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.beneficiaryBankAddress) || detailsData[0].data.beneficiaryBankAddress === "" ) ? "-" : detailsData[0].data.beneficiaryBankAddress },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
                    "lblColon": ":",
                    "flxtemplate": {text: "", isVisible: showIndicativeCharges},
                    "lblValue": { text: exchangeRates },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.Europe.FeeBreakdown"),
                    "lblColon": ":",
                    "flxtemplate": {text: "", isVisible: showCharges},
                    "lblValue": {text: chargeBreakdown},
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                    "lblColon":":",
                    "lblValue":{text:totalDebitVal},
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false},
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.paidBy) },
                    "lblValue": { text:  detailsData[0].data.paidBy === "" ? "-" : detailsData[0].data.paidBy },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.frequency)?"-":detailsData[0].data.frequency},
                    "lblSubValue": {
                      text:"",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionDate"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.processingDate) ? "-" : CommonUtilities.getFrontendDateString(detailsData[0].data.processingDate, "mm/dd/yyyy")},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.creditValueDate"),
                    "lblColon": ":",
                    "flxtemplate": {text: "", isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.creditValueDate) && !showEndDate},
                    "lblValue": { text: CommonUtilities.getFrontendDateString(detailsData[0].data.creditValueDate,"mm/dd/yyyy") },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.endDate"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showEndDate},
                    "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.frequencyEndDate) || detailsData[0].data.frequencyEndDate === "") ? "-" : CommonUtilities.getFrontendDateString(detailsData[0].data.frequencyEndDate,"mm/dd/yyyy") },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.supportingDocuments"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: true},
                    "lblValue": { text: (suppDocuments == null ? "-" : suppDocuments), width: "90%" },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentDetails"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showPaymentDetails},
                    "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.description) || detailsData[0].data.description === "") ? "-" : detailsData[0].data.description, width: "90%" },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryNickName"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: true},
                    "lblValue": { text: "-" },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.TansfersEurope.BeneficiaryAddress"),
                    "lblColon": ":",
                    "flxtemplate": { isVisible: showBeneficiaryAddress},
                    "lblValue": { text: "-" },
                    "lblSubValue" : {text :"", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.TransfersEurope.PaymentReference"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.transactionId)?"-":detailsData[0].data.transactionId},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy)?"-":detailsData[0].data.sentBy},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.recurrence"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].reccurence)?"-":detailsData[0].reccurence},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.featureName)?"-":detailsData[0].data.featureName},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.featureName) ? "-" : detailsData[0].data.featureName},
                    "lblSubValue": {
                      text: "",
                      isVisible: false
                    },
                    "flxUserType":{
                      isVisible:false
                    }
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("i18n.konybb.common.referenceId"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.requestId)?"-":detailsData[0].data.requestId},
                    "lblSubValue" : {text : " ", isVisible : false},
                    "flxUserType":{isVisible:false}
                  },
                  {
                    "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                    "lblColon":":",
                    "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.customerName)?"-":detailsData[0].data.customerName+"-"+detailsData[0].data.customerId},
                    "lblSubValue" : {text : " ", isVisible : false},
                    "flxUserType":{
                      isVisible:false
                    }
                  },
        ];
        var jsonData={};
        if(this.detailsData[0].data.status === "pending" || this.detailsData[0].data.status === "Pending"){
          jsonData={
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
            "lblColon":"",
            "lblValue":this.detailsData[0].data.receivedApprovals +" "+"of"+" "+this.detailsData[0].data.requiredApprovals+" "+"Approved",
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
          };
          //detailsArr.push(jsonData);                 
        }else if(this.detailsData[0].data.status === "approved" || this.detailsData[0].data.status === "Approved"){
          jsonData={
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
            "lblColon":"",
            "lblValue":this.detailsData[0].data.requiredApprovals+" "+kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus"),
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
          };
          //detailsArr.push(jsonData);                 
        }
        else if(this.detailsData[0].data.status === "rejected" || this.detailsData[0].data.status === "Rejected"){
          jsonData={
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
            "lblColon":"",
            "lblValue":1+" "+kony.i18n.getLocalizedString("kony.mb.achtransactions.Rejection"),
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
          };
          //detailsArr.push(jsonData);
        }
        else{
          jsonData={
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
            "lblColon":"",
            "lblValue":this.detailsData[0].data.requiredApprovals+" "+kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus"),
            "lblSubValue" : {text : detailsData[0].data.TransactionType, isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
          };
          //detailsArr.push(jsonData);
        }
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(er){
        kony.print("Exception loadTransactionDetailsRequest"+er);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    loadAchTransactionDetailsRequest:function(detailsData){
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var accountsArray=[];              
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            accountsArray .push(accounts[k]);
          }            
        } 
        var debitAccount;
        if(accountsArray.length===0){
          debitAccount = detailsData[0].data.accountId;      
        }else{
          debitAccount = CommonUtilities.truncateStringWithGivenLength(accountsArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(accountsArray[0].accountID);
        }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(accountsArray[0].isBusinessAccount==="true" || accountsArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var detailsArr = [
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateName"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.templateName},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.featureName},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.requestType},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.debitAccountNo"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(debitAccount)?"-":debitAccount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdOn"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.sentDate},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.sentBy},
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.CompanyNameid"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.customerName+"-"+detailsData[0].data.companyId},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.EffectiveDate"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.processingDate)?"-":CommonUtilities.getFrontendDateString(detailsData[0].data.processingDate,"mm/dd/yyyy")},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konymb.apptradet.ConfirmationNumber"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.confirmationNumber},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.Amount"),
            "lblColon":":",
            "lblValue":{text:configManager.getCurrencyCode()+(kony.sdk.isNullOrUndefined(detailsData[0].data.amount))?detailsData[0].data.transactionAmount:detailsData[0].data.amount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].data.status},
            "lblSubValue" : {text :"", isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
            "flxUserType":{isVisible:false},
          },
        ];


        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
        kony.print("loadAchTransactionDetailsRequest catch--->"+er);
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    loadAchFileDetailsRequest:function(detailsData){
      try{
        kony.print("loadAchFileDetailsRequest"+detailsData);
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileName"),
                "lblColon":":",
                "lblValue":detailsData[0].data.fileName,
                "lblSubValue" : {text :"", isVisible : false},
              },{
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType"),
                "lblColon":":",
                "lblValue":detailsData[0].data.fileType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                "lblColon":":",
                "lblValue":detailsData[0].data.status,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy"),
                "lblColon":":",
                "lblValue":detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate"),
                "lblColon":":",
                "lblValue": CommonUtilities.getDateAndTimeInUTC(detailsData[0].data.sentDate),//updatedDateAndTime,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].data.totalCreditAmount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfDebits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfCredits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfPrenotes,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords"),
                "lblColon":":",
                "lblValue":detailsData[0].data.numberOfRecords,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              }];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },
    
    loadRequestHistoryTransaction:function(detailsData){

      try{
        kony.print("Entered loadRequestHistoryTransaction"+JSON.stringify(detailsData[0]));
         var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var payeeArray=[];
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].payee){
            payeeArray .push(accounts[k]);
          }            
        } 
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].accountId){
            fromArray .push(accounts[k]);
          }            
        } 
              var payee;
              var payeeType;
              var from;
              var fromType;

              if(payeeArray.length===0){
                payee = detailsData[0].payee;
                payeeType = {text : "" , isVisible : false};        
              }else{
                payee = CommonUtilities.truncateStringWithGivenLength(payeeArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(payeeArray[0].accountID);
                payeeType= {text: payeeArray[0].accountType + " " + "Account",isVisible: true};
              }

              if(fromArray.length===0){
                from = detailsData[0].accountId;
                fromType = {text : "" , isVisible : false};        
              }else{
                from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
                fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
              }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var showIndicativeCharges = !kony.sdk.isNullOrUndefined(detailsData[0].data.indicativeRate) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount) && 
          !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionAmount) && !kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.transactionCurrency)
          && (detailsData[0].data.fromAccountCurrency !== detailsData[0].data.transactionCurrency);
        var exchangeRates;

        if(showIndicativeCharges){
          if( detailsData[0].data.totalDebitAmount <= detailsData[0].data.transactionAmount){
            exchangeRates = "1,00 "+ detailsData[0].data.fromAccountCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.transactionCurrency;
          }
          else
            exchangeRates = "1,00 "+ detailsData[0].data.transactionCurrency +" = "+ detailsData[0].data.indicativeRate+ " " + detailsData[0].data.fromAccountCurrency;
        }
        var showSwiftCode = kony.sdk.isNullOrUndefined(detailsData[0].data.swiftCode) || detailsData[0].data.swiftCode === "" ? false : true;
        var showCharges = kony.sdk.isNullOrUndefined(detailsData[0].data.charges) ? false : true;
        try{
          if(showCharges)
            detailsData[0].data.charges = JSON.parse(detailsData[0].data.charges);
        }
        catch(err){
          showCharges = false;
        }
        var chargeBreakdown = "";
        if (showCharges && typeof(detailsData[0].data.charges) === 'object' && detailsData[0].data.charges.length !== 0) {
          var formatManager = applicationManager.getFormatUtilManager();
          detailsData[0].data.charges.forEach(function(obj){
              var currencySymbol = formatManager.getCurrencySymbol(obj.chargeCurrencyId);
              var str = `${obj.chargeName} : ${currencySymbol} ${obj.chargeAmount}`;
              if(chargeBreakdown === ""){
                  chargeBreakdown = `${str}`;
              }
              else{
                  chargeBreakdown = `${chargeBreakdown}
${str}`;
              };
          });
        }
        var featureActionId = detailsData[0].data.featureActionId;
        var showBeneficiaryName = false, showBeneficiaryAddress = false, showBeneficiaryBankAddr = false, showPaymentDetails = false, showPaymentMethod = false;
        if(!kony.sdk.isNullOrUndefined(featureActionId)){
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") ){
            showBeneficiaryName = true;
            showBeneficiaryAddress = true;
          }
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER")  || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER"))
            showBeneficiaryBankAddr = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER"))
            showPaymentMethod = true;
          if( featureActionId.includes("INTER_BANK_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("INTRA_BANK_FUND_TRANSFER") || featureActionId.includes("INTERNATIONAL_ACCOUNT_FUND_TRANSFER") || featureActionId.includes("TRANSFER_BETWEEN_OWN_ACCOUNT"))
            showPaymentDetails = true;
        }

        var suppDocuments = this.formSupportingDocs(detailsData[0].data.fileNames);

        var showEndDate = false;
        var frequency = detailsData[0].data.frequency
        if( !kony.sdk.isNullOrUndefined(frequency) && frequency.trim() !== "" && frequency.trim().toLowerCase() !== "once"){
          showEndDate = true;
        }

        var totalDebitVal = "";
        if(!kony.sdk.isNullOrUndefined(detailsData[0].data.fromAccountCurrency) && !kony.sdk.isNullOrUndefined(detailsData[0].data.totalDebitAmount)){
          var formatManager = applicationManager.getFormatUtilManager();
          var currencySymbol = formatManager.getCurrencySymbol(detailsData[0].data.fromAccountCurrency);
          totalDebitVal = `${currencySymbol}${detailsData[0].data.totalDebitAmount}`; 
        }
              var detailsArr = [
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.common.from"),
                  "lblColon":":",
                  "lblValue":{text:kony.sdk.isNullOrUndefined(from)?"-":from},
                  "lblSubValue":fromType,
                  "flxUserType":{isVisible:iconVisible},
                  "imgUserType":{src:imgIcon}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryName"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showBeneficiaryName},
                  "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.toAccountName) || detailsData[0].data.toAccountName === "") ? "-" : detailsData[0].data.toAccountName },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.AccountNoIBAN"),
                  "lblColon": ":",
                  "lblValue": kony.sdk.isNullOrUndefined(payee)?"-":payee,
                  "lblSubValue": payeeType
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentMethod"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showPaymentMethod},
                  "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.paymentType) || detailsData[0].data.paymentType === "") ? "-" : detailsData[0].data.paymentType },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.tab.addBen.swiftcode"),
                  "lblColon": ":",
                  "flxtemplate": {text: "", isVisible :showSwiftCode},
                  "lblValue": { text: detailsData[0].data.swiftCode },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryBankAddress"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showBeneficiaryBankAddr},
                  "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.beneficiaryBankAddress) || detailsData[0].data.beneficiaryBankAddress === "" ) ? "-" : detailsData[0].data.beneficiaryBankAddress },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate"),
                  "lblColon": ":",
                  "flxtemplate": {text: "", isVisible: showIndicativeCharges},
                  "lblValue": { text: exchangeRates },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.Europe.FeeBreakdown"),
                  "lblColon": ":",
                  "flxtemplate": {text: "", isVisible: showCharges},
                  "lblValue": {text: chargeBreakdown},
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                  "lblColon":":",
                  "lblValue":{text:totalDebitVal},
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false},
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.paidBy) },
                  "lblValue": { text:  detailsData[0].data.paidBy === "" ? "-" : detailsData[0].data.paidBy },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"),
                  "lblColon":":",
                  "lblValue":detailsData[0].frequency,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionDate"),
                  "lblColon":":",
                  "lblValue":detailsData[0].sentDate,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.creditValueDate"),
                  "lblColon": ":",
                  "flxtemplate": {text: "", isVisible: !kony.sdk.isNullOrUndefined(detailsData[0].data.creditValueDate) && !showEndDate},
                  "lblValue": { text: CommonUtilities.getFrontendDateString(detailsData[0].data.creditValueDate,"mm/dd/yyyy") },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.payments.endDate"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showEndDate},
                  "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.frequencyEndDate) || detailsData[0].data.frequencyEndDate === "") ? "-" : CommonUtilities.getFrontendDateString(detailsData[0].data.frequencyEndDate,"mm/dd/yyyy") },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.supportingDocuments"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: true},
                  "lblValue": { text: (suppDocuments == null ? "-" : suppDocuments), width: "90%" },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.paymentDetails"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showPaymentDetails},
                  "lblValue": { text: (kony.sdk.isNullOrUndefined(detailsData[0].data.description) || detailsData[0].data.description === "") ? "-" : detailsData[0].data.description, width: "90%" },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.common.beneficiaryNickName"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: true},
                  "lblValue": { text: "-" },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey": kony.i18n.getLocalizedString("kony.mb.TansfersEurope.BeneficiaryAddress"),
                  "lblColon": ":",
                  "flxtemplate": { isVisible: showBeneficiaryAddress},
                  "lblValue": { text: "-" },
                  "lblSubValue" : {text :"", isVisible : false},
                  "flxUserType":{isVisible:false}
                },    
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.TransfersEurope.PaymentReference"),
                  "lblColon":":",
                  "lblValue":detailsData[0].transactionId,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
                  "lblColon":":",
                  "lblValue":detailsData[0].customerName,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.recurrence"),
                  "lblColon":":",
                  "lblValue":detailsData[0].recurrence,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                  "lblColon":":",
                  "lblValue":detailsData[0].featureName,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("i18n.konybb.common.referenceId"),
                  "lblColon":":",
                  "lblValue":{text:kony.sdk.isNullOrUndefined(detailsData[0].data.requestId)?"-":detailsData[0].data.requestId},
                  "lblSubValue" : {text : " ", isVisible : false},
                  "flxUserType":{isVisible:false}
                },
                {
                  "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                  "lblColon":":",
                  "lblValue":detailsData[0].customerName,
                  "lblSubValue" : {text : detailsData[0].featureActionName, isVisible : false},
                },
        ]; 
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(er){
        //alert("Exception loadTransactionDetailsRequest"+er);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    
    loadRequestHistoryACHTransaction:function(detailsData){
      try{
          // applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
              var navManager = applicationManager.getNavigationManager();     
              var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
              var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
              var internalAccounts;
              var accounts;
              internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
              var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
              if(Array.isArray(externalAccounts)){
                if(externalAccounts.length===0){
                  accounts = internalAccounts.concat(externalAccounts);
                }else{
                  accounts = custominfoInt.accountData; 
                }
              }else{
                accounts = custominfoInt.accountData;
              }
              var accountsArray=[];              
              for(var k=0;k<accounts.length;k++){
                if(accounts[k].accountID===detailsData[0].data.accountId){
                  accountsArray .push(accounts[k]);
                }            
              } 
              var debitAccount;
              if(accountsArray.length===0){
                debitAccount = detailsData[0].data.accountId;      
              }else{
                debitAccount = CommonUtilities.truncateStringWithGivenLength(accountsArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(accountsArray[0].accountID);
              }
        if(this._profileAccess==="both"){
          var iconVisible=false;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(accountsArray[0].isBusinessAccount==="true" || accountsArray[0].isBusinessAccount === true){//
            imgIcon = "businessaccount.png";
            var left1="18dp";
          }else{
            imgIcon = "personalaccount.png";
            var left1="18dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        var detailsArr=[
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateName"),
            "lblColon":":",
            "lblValue":detailsData[0].templateName,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
            "lblColon":":",
            "lblValue":detailsData[0].requestType,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":detailsData[0].featureName,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.debitAccountNo"),
            "lblColon":":",
            "lblValue":{text:kony.sdk.isNullOrUndefined(debitAccount)?"-":debitAccount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:iconVisible},
            "imgUserType":{src:imgIcon}
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdOn"),
            "lblColon":":",
            "lblValue":detailsData[0].sentDate,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":detailsData[0].sentBy,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.CompanyNameid"),
            "lblColon":":",
            "lblValue":detailsData[0].customerName+"-"+detailsData[0].companyId,
            "lblSubValue" : {text : " ", isVisible : false},
          },
//           {
//             "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateDescription"),
//             "lblColon":":",
//             "lblValue":detailsData[0].sentDate,
//             "lblSubValue" : {text :"", isVisible : false},
//           },
        
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.EffectiveDate"),
            "lblColon":":",
            "lblValue": detailsData[0].processingDate,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("i18n.konymb.apptradet.ConfirmationNumber"),
            "lblColon":":",
            "lblValue":detailsData[0].confirmationNumber,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.Amount"),
            "lblColon":":",
            "lblValue":{text:detailsData[0].amount},
            "lblSubValue" : {text :"", isVisible : false},
            "flxUserType":{isVisible:false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
            "lblColon":":",
            "lblValue":detailsData[0].status,
            "lblSubValue" : {text :"", isVisible : false},
            "flxSeperatorTrans3":{isVisible: false},
          },
        ];
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
        kony.print("loadAchTransactionDetailsRequest catch--->"+er);
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    
    loadRequestHistorydetail:function(detailsData){
      try{
        kony.print("loadAchFileDetailsRequest"+detailsData);
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileName"),
                "lblColon":":",
                "lblValue":detailsData[0].fileName,
                "lblSubValue" : {text :"", isVisible : false},
              },{
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType"),
                "lblColon":":",
                "lblValue":detailsData[0].fileType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":detailsData[0].requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                "lblColon":":",
                "lblValue":detailsData[0].status,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy"),
                "lblColon":":",
                "lblValue":detailsData[0].sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate"),
                "lblColon":":",
                "lblValue":detailsData[0].sentDate,//updatedDateAndTime,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].totalCreditAmount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfDebits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfCredits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfPrenotes,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfRecords,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              }];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadTransactionDetails:function(detailsData){
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
        var detailsArr=[
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.TemplateName"),
            "lblColon":":",
            "lblValue":detailsData[0].TemplateName,
            "lblSubValue" : {text :"", isVisible : false},
          },{
            "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
            "lblColon":":",
            "lblValue":detailsData[0].TransactionTypeValue,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
            "lblColon":":",
            "lblValue":detailsData[0].RequestType,
            "lblSubValue" : {text :"", isVisible : false},
          },

          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.debitAccountNo"), 
            "lblColon":":",
            "lblValue":detailsData[0].AccountName,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdOn"),
            "lblColon":":",
            "lblValue":detailsData[0].createdOn,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.createdBy"),
            "lblColon":":",
            "lblValue":detailsData[0].createdBy,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransationdetail.EffectiveDate"),
            "lblColon":":",
            "lblValue":detailsData[0].EffectiveDate,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.common.Amount"),
            "lblColon":":",
            "lblValue":configManager.getCurrencyCode()+detailsData[0].amount,
            "lblSubValue" : {text :"", isVisible : false},
          },
          {
            "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
            "lblColon":":",
            "lblValue":detailsData[0].Status,
            "lblSubValue" : {text :"", isVisible : false},
          },
        ];
        this.view.segDatalist.removeAll();
        this.view.segDatalist.setData(detailsArr);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    loadAchDetails:function(detailsData){
      try{

        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileName"),
                "lblColon":":",
                "lblValue":detailsData[0].lblFilename,
                "lblSubValue" : {text :"", isVisible : false},
              },{
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.fileType"),
                "lblColon":":",
                "lblValue":detailsData[0].fileType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":detailsData[0].RequestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                "lblColon":":",
                "lblValue":detailsData[0].lblStatus,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy"),
                "lblColon":":",
                "lblValue":detailsData[0].lblAdmin,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate"),
                "lblColon":":",
                "lblValue":detailsData[0].uploadDate ? CommonUtilities.getDateAndTimeInUTC(detailsData[0].uploadDate) : "N/A",
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalDebitAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].totalDebitAccount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount"),
                "lblColon":":",
                "lblValue":detailsData[0].totalCreditAccount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfDebits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfCredits,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfPreNotes,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords"),
                "lblColon":":",
                "lblValue":detailsData[0].numberOfrecords,
                "lblSubValue" : {text :"", isVisible : false},
              }];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){

      }
    },
    
     loadApprovalHistoryBulkPayment:function(detailsData){
      try{
        kony.print("loadAchFileDetailsRequest"+detailsData);
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].accountId){
            fromArray .push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].accountId;
          fromType = {text : "" , isVisible : false};        
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
          fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
        }
        if(this._profileAccess==="both"){
          var iconVisible=true;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="40dp";//40dp
          }else{
            imgIcon = "personalaccount.png";
            var left1="40dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.description) ? "-" : detailsData[0].data.description,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.transferInitiated"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].lblDate) ? "-" : detailsData[0].lblDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.executionDate"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].processingDate) ? "-" : detailsData[0].processingDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.valueDate"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].sentDate) ? "-" : detailsData[0].sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TotalAmount"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].amount) ? "-" : detailsData[0].amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount"),
                "lblColon":":",
                "lblValue":{text:kony.sdk.isNullOrUndefined(from) ? "-" : from},
                "lblSubValue" : {text :"", isVisible : false},
                "flxUserType":{isVisible:iconVisible},
                "imgUserType":{src:imgIcon}
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.totalTransactions) ? "-" : detailsData[0].data.totalTransactions,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].transactionId) ? "-" : detailsData[0].transactionId,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.paymentFile"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.FileName) ? "-" : detailsData[0].data.FileName,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.processingMode"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.processingMode) ? "-" : detailsData[0].data.processingMode,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue":detailsData[0].customerName+"-"+detailsData[0].customerId,
                "lblSubValue" : {text :"", isVisible : false},
              },
//               {
//                 "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
//                 "lblColon":":",
//                 "lblValue":"-",
//                 "lblSubValue" : {text :"", isVisible : false},
//               },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].requestType) ? "-" : detailsData[0].featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              },

            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.widgetDataMap=this.getWidgetDataMap();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },
    getWidgetDataMap : function(){
      var dataMap = {
        "flxkeys" : "flxkeys",
        "lblKey" : "lblKey",
        "lblColon" : "lblColon",
        "flxValue" : "flxValue",
        "lblSubValue":"lblSubValue",
        "lblValue":"lblValue",
        "flxUserType":"flxUserType",
        "imgUserType":"imgUserType",
        "flxSeperatorTrans3":"flxSeperatorTrans3",
      };
      return dataMap;
    },
     loadRequestBulkPayment:function(detailsData){
      try{
        kony.print("loadAchFileDetailsRequest"+detailsData);
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray .push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].accountId;
          fromType = {text : "" , isVisible : false};        
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
          fromType= {text: fromArray[0].accountType + " " + "Account",isVisible: true};
        }
        if(this._profileAccess==="both"){
          var iconVisible=true;
          var imgIcon = "businessaccount.png";
          var left="18dp";
          if(fromArray[0].isBusinessAccount==="true" || fromArray[0].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
            var left1="40dp";//40dp
          }else{
            imgIcon = "personalaccount.png";
            var left1="40dp";
          }
        }else{
          var iconVisible=false;
          var left="18dp";
          var left1="18dp";
        }
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.description) ? "-" : detailsData[0].data.description,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.customerName) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.transferInitiated"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].sentDate) ? "-" : detailsData[0].sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.executionDate"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].processingDate) ? "-" : detailsData[0].processingDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.valueDate"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].sentDate) ? "-" : detailsData[0].sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TotalAmount"),
                "lblColon":":",
                "lblValue":configManager.getCurrencyCode()+" "+detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount"),
                "lblColon":":",
                "lblValue":{text:kony.sdk.isNullOrUndefined(from) ? "-" : from},
                "lblSubValue" : {text :"", isVisible : false},
                "flxUserType":{isVisible:iconVisible},
                "imgUserType":{src:imgIcon}
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.totalTransactions) ? "-" : detailsData[0].data.totalTransactions,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.transactionId) ? "-" : detailsData[0].data.transactionId,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.paymentFile"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.FileName) ? "-" : detailsData[0].data.FileName,
                "lblSubValue" : {text :"", isVisible : false},
              },    
              {
                "lblKey":kony.i18n.getLocalizedString("kony.i18n.common.processingMode"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.processingMode) ? "-" : detailsData[0].data.processingMode,
                "lblSubValue" : {text :"", isVisible : false},
              },     
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue":detailsData[0].data.customerName+" -"+detailsData[0].data.customerId,
                "lblSubValue" : {text :"", isVisible : false},
              },
//               {
//                 "lblKey":kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
//                 "lblColon":":",
//                 "lblValue":"-",
//                 "lblSubValue" : {text :"", isVisible : false},
//               },
              {
                "lblKey":kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue":kony.sdk.isNullOrUndefined(detailsData[0].data.featureActionName) ? "-" : detailsData[0].data.featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
                "flxSeperatorTrans3":{isVisible: false},
              },

            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.widgetDataMap=this.getWidgetDataMap();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadRequestChequeBook: function(detailsData){
      try{
        kony.print("loadRequestChequeBook"+detailsData);
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray.push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].data.accountId;       
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
        }
        var sentDate = kony.sdk.isNullOrUndefined(detailsData[0].data.sentDate) ? "-" :  detailsData[0].data.sentDate;
        if(sentDate.indexOf('T') !== -1){
          sentDate = sentDate.split('T')[0];
          sentDate = CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy");
        }     
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.featureActionName) ? "-" : detailsData[0].data.featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentDate"),
                "lblColon":":",
                "lblValue": sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentBy"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.requestType) ? "-" : detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.requestAccount"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(from) ? "-": from,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.noOfBooks"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.noOfBooks) ? "-": detailsData[0].data.noOfBooks,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.fees"),
                "lblColon":":",
                "lblValue": configManager.getCurrencyCode()+" "+detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.cardManage.RequestID"),
                "lblColon":":",
                "lblValue":  kony.sdk.isNullOrUndefined(detailsData[0].data.requestId) ? "-": detailsData[0].data.requestId,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.customerName) ? "-": detailsData[0].data.customerName,
                "lblSubValue" : {text :"", isVisible : false},
              }
            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadApprovalsChequeBook: function(detailsData){
      try{
        kony.print("loadApprovalsChequeBook"+detailsData);
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray.push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].data.accountId;       
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
        }
        var sentDate = kony.sdk.isNullOrUndefined(detailsData[0].data.sentDate) ? "-" :  detailsData[0].data.sentDate;
        if(sentDate.indexOf('T') !== -1){
          sentDate = sentDate.split('T')[0];
          sentDate = CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy");
        }     
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.featureActionName) ? "-" : detailsData[0].data.featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentDate"),
                "lblColon":":",
                "lblValue": sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentBy"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.requestType) ? "-" : detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.requestAccount"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(from) ? "-": from,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.noOfBooks"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.noOfBooks) ? "-": detailsData[0].data.noOfBooks,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.fees"),
                "lblColon":":",
                "lblValue": configManager.getCurrencyCode()+" "+detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.cardManage.RequestID"),
                "lblColon":":",
                "lblValue":  kony.sdk.isNullOrUndefined(detailsData[0].data.requestId) ? "-": detailsData[0].data.requestId,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.customerName) ? "-": detailsData[0].data.customerName,
                "lblSubValue" : {text :"", isVisible : false},
              }
            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadApprovalsChequeBookHistory: function(detailsData){
      try{
        kony.print("loadApprovalsChequeBookHistory"+detailsData);
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray.push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].data.accountId;       
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
        }
        var sentDate = kony.sdk.isNullOrUndefined(detailsData[0].data.sentDate) ? "-" :  detailsData[0].data.sentDate;
        if(sentDate.indexOf('T') !== -1){
          sentDate = sentDate.split('T')[0];
          sentDate = CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy");
        }      
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.featureActionName) ? "-" : detailsData[0].data.featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentDate"),
                "lblColon":":",
                "lblValue": sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentBy"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.requestType) ? "-" : detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.requestAccount"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(from) ? "-": from,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.noOfBooks"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.noOfBooks) ? "-": detailsData[0].data.noOfBooks,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.fees"),
                "lblColon":":",
                "lblValue": configManager.getCurrencyCode()+" "+detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.cardManage.RequestID"),
                "lblColon":":",
                "lblValue":  kony.sdk.isNullOrUndefined(detailsData[0].data.requestId) ? "-": detailsData[0].data.requestId,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.customerName) ? "-": detailsData[0].data.customerName,
                "lblSubValue" : {text :"", isVisible : false},
              }
            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    loadRequestsChequeBookHistory: function(detailsData){
      try{
        kony.print("loadRequestsChequeBookHistory"+detailsData);
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();     
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts =CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var fromArray=[];
        for(var k=0;k<accounts.length;k++){
          if(accounts[k].accountID===detailsData[0].data.accountId){
            fromArray.push(accounts[k]);
          }            
        } 
        var from;
        var fromType;
        if(fromArray.length===0){
          from = detailsData[0].data.accountId;       
        }else{
          from = CommonUtilities.truncateStringWithGivenLength(fromArray[0].accountName + "....", 20) + CommonUtilities.getLastSixDigit(fromArray[0].accountID);
        }
        var sentDate = kony.sdk.isNullOrUndefined(detailsData[0].data.sentDate) ? "-" :  detailsData[0].data.sentDate;
        if(sentDate.indexOf('T') !== -1){
          sentDate = sentDate.split('T')[0];
          sentDate = CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy");
        }      
        if(!kony.sdk.isNullOrUndefined(detailsData)){
          if(Array.isArray(detailsData)){
            var detailsArr=[
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.transactionType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.featureActionName) ? "-" : detailsData[0].data.featureActionName,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentDate"),
                "lblColon":":",
                "lblValue": sentDate,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.sentBy"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.sentBy) ? "-" : detailsData[0].data.sentBy,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.achfiledetail.requestType"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.requestType) ? "-" : detailsData[0].data.requestType,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.requestAccount"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(from) ? "-": from,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.chequeBookReq.noOfBooks"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.noOfBooks) ? "-": detailsData[0].data.noOfBooks,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.transaction.fees"),
                "lblColon":":",
                "lblValue": configManager.getCurrencyCode()+" "+detailsData[0].data.amount,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.cardManage.RequestID"),
                "lblColon":":",
                "lblValue":  kony.sdk.isNullOrUndefined(detailsData[0].data.requestId) ? "-": detailsData[0].data.requestId,
                "lblSubValue" : {text :"", isVisible : false},
              },
              {
                "lblKey": kony.i18n.getLocalizedString("kony.mb.accdetails.customerName"),
                "lblColon":":",
                "lblValue": kony.sdk.isNullOrUndefined(detailsData[0].data.customerName) ? "-": detailsData[0].data.customerName,
                "lblSubValue" : {text :"", isVisible : false},
              }
            ];
            this.view.segDatalist.removeAll();
            this.view.segDatalist.setData(detailsArr);
          }
        }
      }catch(er){
        kony.print("catch error"+er);
      }
    },

    ///////********showDesinationAccount is used to show the desination account flex*****////////

    showDesinationAccount:function()
    {
      try {  

        if(this.view. imgUpArrow.src=="blue_uparrow.png"){
          this.view.segDestinationaccount.isVisible = false;
          this.view. imgUpArrow.src = "blue_downarrow.png";
        }else{
          this.view.segDestinationaccount.isVisible = true;
          this.view. imgUpArrow.src = "blue_uparrow.png";
        }

      }catch(error){
        kony.print("frmApprovalsTransactionDetail bindevents-->"+error);
      }       
    },

    ///////********showApprovalHistory is used to show the Approvalhistory flex*****////////
    showApprovalHistory:function()
    {
      try {  

        if(this.view. imgapprovalhis.src==="blue_uparrow.png"){
          this.view.segApprovalHistory.isVisible = false;
          this.view. imgapprovalhis.src = "blue_downarrow.png";
        }else{
          this.view.segApprovalHistory.isVisible = true;
          this.view. imgapprovalhis.src = "blue_uparrow.png";
        }

      }catch(error){
        kony.print("frmApprovalsTransactionDetail bindevents-->"+error);
      }       
    },
    
     /*
     *rejectBtnOnClick - This function is called when user swipe and clics on reject button
     *
     */
    rejectBtnOnClick: function(widgetInfo,context) {
       var navManager = applicationManager.getNavigationManager();
        var formFlow = navManager.getCustomInfo("formFlow");
      if(formFlow == "BulkPaymentApproval" ){
        this.showReasonPage();
      }else{
        this.rejectDetails();
      }
    },
    
    showReasonPage : function(){//widgetInfo,context){
      try {
        kony.print("Entered showReasonPage::");
        
        var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
        var navObj = 
            {	
              requestData: req,
              "prevFormName" : "ApprovalsReqUIModule/frmApprovalsTransactionDetail"
            };
       
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmBulkRejectReason",navObj );// navObj);
        navManager.navigateTo("frmBulkRejectReason");
      } catch (error) {
        kony.print("Exception in  showReasonPage-->" + error);
      }
    },

    ///////********rejectDetails is used to showrejectpopup****////////
    rejectDetails:function()
    {
      try {  
        this.view.rejectPopUp.lblContent.isVisible = true;
        this.view.rejectPopUp.lblContentreject.isVisible = true;
        this.view.rejectPopUp.txtRejectreason.isVisible = true;
        this.view.rejectPopUp.lblTitle.top = "10dp";
        this.view.rejectPopUp.flxBtns.top = "10dp";
        this.view.rejectPopUp.lblTitle.text= kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject");
        this.view.rejectPopUp.lblYes.text= kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject");
        this.view.rejectPopUp.lblContent.text=kony.i18n.getLocalizedString("kony.mb.request.rejectmsg");
        this.view.rejectPopUp.lblContentreject.text=kony.i18n.getLocalizedString("kony.mb.approve.rejectreason");
        this.withdrawCalled = false;
        var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
        if(isiPhone) {
          this.view.rejectPopUp.lblTitle.skin = "sknLbl494949semibold45px";
          this.view.rejectPopUp.lblContent.skin = "sknlbl424242SSPR15dp";
          this.view.rejectPopUp.lblContentreject.skin = "sknlbl424242SSPR15dp";
        }
        this.view.rejectPopUp.txtRejectreason.text="";
        if(this.view.rejectPopUp.txtRejectreason.text==="" || this.view.rejectPopUp.txtRejectreason.text===null){
          this.view.rejectPopUp.flxReject.setEnabled(false);
        }else{
          this.view.rejectPopUp.flxReject.setEnabled(true);
        }
        this.view.flxRejectpopup.isVisible = true;
      }catch(error){
        kony.print("frmApprovalsTransactionDetail rejectDetails-->"+error);
      }       
    },
    rejectEnabledButton:function()
    {
      try {  
        if(this.view.rejectPopUp.txtRejectreason.text==="" || this.view.rejectPopUp.txtRejectreason.text===null){
          this.view.rejectPopUp.flxReject.setEnabled(false);
        }else{
          this.view.rejectPopUp.flxReject.setEnabled(true);
        }
      }catch(error){
        kony.print("frmApprovalsTransactionDetail rejectCancel-->"+error);
      }       
    },

    rejectCancel:function()
    {
      try {  
        this.view.flxRejectpopup.isVisible = false;
        this.view.rejectPopUp.txtRejectreason.text="";
      }catch(error){
        kony.print("frmApprovalsTransactionDetail rejectCancel-->"+error);
      }       
    },

    rejectServicecall:function()
    {
      try {  
        var formType=this.previousFormType;
        var scope =this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        switch(formType)
        {
          case "ACHTransactionsList":
            var request_id = this.detailsData[0].data.Request_id;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;

          case "ACHFileList":
             var request_id = this.detailsData[0].data.Request_id;
            var featureActionId = "ACH_FILE_UPLOAD";
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            //this.fetchRejectACHFilesSuccess();
            break;      
          case "TransactionDetailsApprovals": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;
          case "ACHTransactionDetailsApprovals": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;
          case "ACHFileListApprovals": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;
            case "BulkPaymentApproval": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;
            case "ChequeBookApprovals": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":comments
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.rejectPendingTransaction(navObj);
            break;
        }
      }catch(error){
        kony.print("frmApprovalsTransactionDetail rejectDetails-->"+error);
      }finally {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }       
    },


    approveServicecall:function()
    {
      try { 
        var formType=this.previousFormType;
        var scope=this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        switch(formType)
        {
          case "ACHTransactionsList":
             var request_id = this.detailsData[0].data.Request_id;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            //             this.fetchApproveACHTransactionsSuccess();
            break;
          case "ACHFileList": 
            var request_id = this.detailsData[0].data.Request_id;
            var featureActionId = "ACH_FILE_UPLOAD";
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            //             this.fetchApproveACHFilesSuccess();
            break;
          case "TransactionDetailsApprovals": 
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            break;
          case "ACHTransactionDetailsApprovals":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            break;
          case "ACHFileListApprovals":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            break;
            case "BulkPaymentApproval":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req =
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj =
                {   
                  requestData: req,
                  formData : scope
                };
            var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
            break;
            case "ChequeBookApprovals":
              var request_id = this.detailsData[0].data.requestId;
              var featureActionId = this.detailsData[0].data.featureActionId;
              var req =
                  {
                    "requestId":request_id,
                    "featureActionId": featureActionId,
                    "comments":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                  };
              var navObj =
                  {   
                    requestData: req,
                    formData : scope
                  };
              var ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
              ApprovalRequestsModule.presentationController.approvePendingTransactions(navObj);
              break;
        }

      }catch(error){
        kony.print("frmApprovalsTransactionDetail approveServicecall-->"+error);
      }finally {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }       
    },


    withdrawServicecall:function()
    {
      try { 
        var formType=this.previousFormType;
        var scope=this;
        // applicationManager.getPresentationUtility().showLoadingScreen();
        this.incServiceCount();
        var navigationObject={};
        var ApprovalRequestsModule;
        switch(formType)
        {
          case "ACHTransactionsList":
            var request_id = this.detailsData[0].data.Request_id;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
            //this.fetchACTransactionWithdrawlSuccess();
            break;
          case "ACHFileList":
           var request_id = this.detailsData[0].data.Request_id;
            var featureActionId ="ACH_FILE_UPLOAD";
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            // this.fetchACHFileWithdrawlSuccess();
            break;
          case "TransactionDetailsRequests":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
          case "ACHTransactionDetailsRequests":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
          case "ACHFileListRequests":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
            case "BulkPaymentRequests":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
            case "ChequeBookRequests":
            var request_id = this.detailsData[0].data.requestId;
            var featureActionId = this.detailsData[0].data.featureActionId;
            var comments = this.view.rejectPopUp.txtRejectreason.text;
            var req = 
                {
                  "requestId":request_id,
                  "featureActionId": featureActionId,
                  "comments": comments,//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")
                };
            var navObj = 
                {	
                  requestData: req,
                  formData : scope
                };
            ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            ApprovalRequestsModule.presentationController.withdrawPendingRequest(navObj);
            break;
        }
      }catch(error){
        kony.print("frmApprovalsTransactionDetail approveServicecall-->"+error);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }       
    },
    fetchApproveACHTransactionsSuccess : function(response){
      var formType=this.previousFormType;
      var formFlow={};
      var navManager = applicationManager.getNavigationManager();
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.decServiceCount();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Approved" || response.status==="Approved"){
          switch(formType){
            case "ACHTransactionsList":
              formFlow={
                "FormType" : "ACHTransaction",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
                "imgIconKey":"Approval",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;  
            case "ACHTransactionDetailsApprovals":
              formFlow={
                "FormType" : "ACHTransactionApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
                "imgIconKey":"Approval",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break; 
          }
          navManager.navigateTo("StausMessage");
        }
      }
    },
    fetchRejectACHTransactionsSuccess : function(response){
      var formType=this.previousFormType;
      var formFlow={};
      var navManager = applicationManager.getNavigationManager();
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.decServiceCount();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Rejected" || response.status==="Rejected"){
          switch(formType){
            case "ACHTransactionsList":
              formFlow={
                "FormType" : "ACHTransaction",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
                "imgIconKey":"Reject",
              };
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
            case "ACHTransactionDetailsApprovals":
              formFlow={
                "FormType" : "ACHTransactionApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
                "imgIconKey":"Reject",
              };
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
          }
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchApproveACHFilesSuccess : function(response){
      var formType=this.previousFormType;
      var formFlow={};
      var navManager = applicationManager.getNavigationManager();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Approved"){
          switch(formType){
            case "ACHFileList":
              formFlow={
                "FormType" : "ACHFiles",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
                "imgIconKey":"Approval",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
            case "ACHFileListApprovals":
              formFlow={
                "FormType" : "ACHFilesApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
                "imgIconKey":"Approval",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
          }
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchRejectACHFilesSuccess : function(response){
      var formType=this.previousFormType;
      var formFlow={};
      var navManager = applicationManager.getNavigationManager();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Rejected"){
          switch(formType){
            case "ACHFileList":
              formFlow={
                "FormType" : "ACHFiles",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
                "imgIconKey":"Reject",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
            case "ACHFileListApprovals":
              formFlow={
                "FormType" : "ACHFilesApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
                "imgIconKey":"Reject",
              };
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              navManager.setCustomInfo("ACHTransactionDetails",formFlow);
              break;
          }
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchACTransactionWithdrawlSuccess : function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formType=this.previousFormType;
      var formFlow={};
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Withdrawn" || response.status==="Withdrawn"){
          switch(formType){
            case "ACHTransactionsList":
              formFlow={
                "FormType" : "ACHTransaction",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
                "imgIconKey":"withdraw",
              };
              break;
            case "ACHTransactionDetailsRequests":
              formFlow={
                "FormType" : "ACHTransactionApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
                "imgIconKey":"withdraw",
              };
              break;
          }
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("ACHTransactionDetails",formFlow);
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchACHFileWithdrawlSuccess : function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formType=this.previousFormType;
      var formFlow={};
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Withdrawn"){
          switch(formType){          
            case "ACHFileList":
              formFlow={
                "FormType" : "ACHFiles",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
                "imgIconKey":"withdraw",
              };
              break;
            case "ACHFileListRequests":
              formFlow={
                "FormType" : "ACHFilesRequest",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
                "imgIconKey":"withdraw",
              };
              break;
            case "ACHFileListApprovals":
              formFlow={
                "FormType" : "ACHFilesApprovals",
                "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
                "imgIconKey":"withdraw",
              };
              break;
          }
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("ACHTransactionDetails",formFlow);
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchBBGeneralTransactionsSucces : function(response){
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.decServiceCount();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Approved" || response.status==="Approved"){
          var formType=this.previousFormType;
          if(formType==="ACHTransactionsList"){
            var formFlow={
            "FormType" : "ACHTransaction",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
            "imgIconKey":"Approval",
          };
          }else if(formType==="ACHFileList"){
             var formFlow={
            "FormType" : "ACHFiles",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
            "imgIconKey":"Approval",
          };
          }else{
           var formFlow={
            "FormType" : "GeneralTransactions",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"),
            "imgIconKey":"Approval",
          };  
          }
          // applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("ACHTransactionDetails",formFlow);
          navManager.navigateTo("StausMessage");
        }}
    },

    fetchRejectBBGeneralTransactionsSuccess : function(response){
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.decServiceCount();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Rejected" || response.status==="Rejected"){
          var formType=this.previousFormType;
          if(formType==="ACHTransactionsList"){
            var formFlow={
            "FormType" : "ACHTransaction",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
            "imgIconKey":"Reject",
          };
          }else if(formType==="ACHFileList"){
             var formFlow={
            "FormType" : "ACHFiles",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
            "imgIconKey":"Reject",
          };
          }
          else{
            var formFlow={
            "FormType" : "GeneralTransactions",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"),
            "imgIconKey":"Reject",
          };
          }
          // applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("ACHTransactionDetails",formFlow);
          navManager.navigateTo("StausMessage");
        }
      }
    },

    fetchBBGeneralTransactionsWithdrawlSuccess : function(response){
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.decServiceCount();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(response.Status==="Withdrawn" || response.status==="Withdrawn"){
          var formType=this.previousFormType;
          if(formType==="ACHTransactionsList"){
            var formFlow={
            "FormType" : "ACHTransaction",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
            "imgIconKey":"withdraw",
          };
          }else if(formType==="ACHFileList"){
             var formFlow={
            "FormType" : "ACHFiles",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
            "imgIconKey":"withdraw",
          };
          }
          else{
           var formFlow={
            "FormType" : "GeneralTransactions",
            "FormData" : kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"),
            "imgIconKey":"withdraw",
          }; 
          }
          // applicationManager.getPresentationUtility().dismissLoadingScreen();
          this.decServiceCount();
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("ACHTransactionDetails",formFlow);
          navManager.navigateTo("StausMessage");
        }
      }
    },

    dummyFunction : function(){
      kony.print("Entered do nothing");
    },
    /**
         * fetchDestinationAccounts : fetch the required transaction Records.
         * @member of {frmACHDashboardController}
         * @param {JSON Onject} inputparams - transaction details from Template or Transaction
         * @return {}
         * @throws {}
         */
    fetchDestinationAccounts: function (inputparams) {
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        this.incServiceCount();
        var scopeObj = this;
        var navObj = {
          requestData: inputparams,
        };
        scopeObj.ApprovalModule.presentationController.getDestinationAccountsRecords(navObj);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    getACHFilesDestinationAccntSuccessCallBack:function(response){
      try{
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        
        if(!kony.sdk.isNullOrUndefined(response)){

          if(Array.isArray(response)){
            this.view.segDestinationaccount.widgetDataMap={
              "lblRecipientname":"lblRecipientname",
              "lblAccountnumber":"lblAccountnumber",
              "lblAmount":"lblAmount",
              "flxSep":"flxSep",
              "flxSeperatorTrans4":"flxSeperatorTrans4",
            };
            if(response.length>0){
               this.view.flxdesinationaccount.isVisible = true;
              this.view.segDestinationaccount.isVisible = true;
              this.view.segDestinationaccount.setData(response);
            }else{
              this.view.segDestinationaccount.removeAll();
              var nodataArr=[];
              var nodataJson = {
                "lblRecipientname":"No data found",
                "lblAccountnumber":"",
                "lblAmount":"",
                "flxSep":{isVisible:false},
                "flxSeperatorTrans4":{isVisible:false},
              };
              nodataArr.push(nodataJson);
               this.view.flxdesinationaccount.isVisible = true;
              this.view.segDestinationaccount.isVisible = true;
              this.view.segDestinationaccount.setData(nodataArr);
            }
          }else{

            this.view.flxdesinationaccount.isVisible = false;
            this.view.segDestinationaccount.isVisible = false;
          }
        }else{

          this.view.flxdesinationaccount.isVisible = false;
          this.view.segDestinationaccount.isVisible = false;
        }
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }
      finally{
        this.decServiceCount();
      }
    },

    getApprovalReqHistory:function(inputparams){
      try{
        // applicationManager.getPresentationUtility().showLoadingScreen();
        this.incServiceCount();
        var navObj = {
          requestData: inputparams,
        };
        this.ApprovalModule.presentationController.getRequestsHistory(navObj);
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }finally {
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    getApprovalReqHistorySuccessCB:function(response){
      try{
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        var jsonData={};
        var nodataArr=[];
        var nodataJson = {};
        var self = this;
        
        if(!kony.sdk.isNullOrUndefined(response)){
          if(response.length <=0){
            jsonData={
              "lblRecipientname":{
                "text" : kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                "skin":"sknlbl949494SSPR13px",
              },
              "lblAccountnumber":{
                "text" : "N/A",
                "skin":"sknlbl424242ssp40px",
              },
              "lblAmount":{
                "text" : "",
              },
              "flxSep":{isVisible:false},
              "flxSeperatorTrans4":{isVisible:false},
            };
            response.push(jsonData);
            if(Array.isArray(response)){
              this.view.segApprovalHistory.widgetDataMap={
                "lblRecipientname":"lblRecipientname",
                "lblAccountnumber":"lblAccountnumber",
                "lblAmount":"lblAmount",
                "flxSep":"flxSep",
                "flxSeperatorTrans4":"flxSeperatorTrans4",
              };
              if(response.length > 0){
                this.view.segApprovalHistory.setData(response);
              }else{
                this.view.segApprovalHistory.removeAll();
                nodataArr=[];
                nodataJson = {
                  "lblRecipientname":"No Request History Records Found",
                  "lblAccountnumber":"",
                  "lblAmount":"",
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                nodataArr.push(nodataJson);
                this.view.segApprovalHistory.setData(nodataArr);
              }
            }
          }
          else{
            if(this.previousFormType === "ACHTransactionDetailsApprovals" || this.previousFormType === "ACHFileListApprovals" ||
               this.previousFormType === "ACHTransactionDetailsRequests" ||this.previousFormType === "ACHFileListRequests" ||
              this.previousFormType === "TransactionDetailsRequests" ||this.previousFormType === "TransactionDetailsApprovals"
              ||this.previousFormType === "BulkPaymentRequests" ||this.previousFormType === "BulkPaymentApproval"
              || this.previousFormType === "ChequeBookRequests" || this.previousFormType === "ChequeBookApprovals" || this.previousFormType === "RequestHistoryChequeBook" || this.previousFormType === "ApprovalHistoryChequeBook"){
              if(kony.sdk.isNullOrUndefined(this.detailsData[0].data.status))
              {
                //condition check for ACHFilerequest
                if(!kony.sdk.isNullOrUndefined(this.detailsData[0].data.FileStatus))
                {
                  this.detailsData[0].data.status=this.detailsData[0].data.FileStatus;
                }
              }
              if(this.detailsData[0].data.status === "pending" || this.detailsData[0].data.status === "Pending"){
                var navManager = applicationManager.getNavigationManager();
                var pendingRequestDetails = navManager.getCustomInfo("PendingRequestDetails");
                var isVisibleLink=false;
                if(!kony.sdk.isNullOrUndefined(pendingRequestDetails.pendingGroupRules)){ 
                   isVisibleLink=true;
                }else{
                   isVisibleLink=false;
                }
                jsonData={
                  "lblRecipientname":{
                    "text" :kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    //"text": kony.sdk.isNullOrUndefined(this.detailsData[0].lblStatus.text) ? "-" : this.detailsData[0].lblStatus.text,
                    "text":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Pending"),//this.detailsData[0].data.receivedApprovals + " " + "of" + " " + this.detailsData[0].data.requiredApprovals + " " + "Approved",
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "lblPendingApproval":{
                    "text":kony.i18n.getLocalizedString("i18n.payments.pendingApprovers"),
                    isVisible:isVisibleLink,
                  },
                  "flxSep":{isVisible:true},
                  "flxSeperatorTrans4":{isVisible:false},
                  "flxPendingApproval":{isVisible:true,
                                        onClick : self.ApprovalHistoryRowOnclick }
                  
                };
                response.push(jsonData); //change            
              }else if(this.detailsData[0].data.status === "approved" || this.detailsData[0].data.status === "Approved"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text": this.detailsData[0].data.requiredApprovals + `${ this.detailsData[0].data.requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData);                  
              }
              else if(this.detailsData[0].data.status === "rejected" || this.detailsData[0].data.status === "Rejected"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : 1+" "+kony.i18n.getLocalizedString("kony.mb.achtransactions.Rejection"),
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }else{
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : this.detailsData[0].data.requiredApprovals + `${ this.detailsData[0].data.requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }
            }
            else if(this.previousFormType ==="ACHTransactionsList"){
              if(this.detailsData[0].Status === "pending" || this.detailsData[0].Status === "Pending"){
                var navManager = applicationManager.getNavigationManager();
                var pendingRequestDetails = navManager.getCustomInfo("PendingRequestDetails");
                var isVisibleLink=false;
                if(!kony.sdk.isNullOrUndefined(pendingRequestDetails) && !kony.sdk.isNullOrUndefined(pendingRequestDetails.pendingGroupRules)){ 
                   isVisibleLink=true;
                }else{
                   isVisibleLink=false;
                }
                jsonData={
                  "lblPendingApproval":{
                      "text":kony.i18n.getLocalizedString("i18n.payments.pendingApprovers"),
                      isVisible:isVisibleLink,
                  },
                  "flxPendingApproval":{
                      isVisible:true,
                      onClick : self.ApprovalHistoryRowOnclick 
                  },
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : this.detailsData[0].receivedApprovals +" "+"of"+" "+this.detailsData[0].requiredApprovals+" "+"Approved",
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData);                  
              }else if(this.detailsData[0].Status === "approved" || this.detailsData[0].Status === "Approved"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text": this.detailsData[0].requiredApprovals + `${ this.detailsData[0].requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData);                  
              }
              else if(this.detailsData[0].Status === "rejected" || this.detailsData[0].Status === "Rejected"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : 1+" "+kony.i18n.getLocalizedString("kony.mb.achtransactions.Rejection"),
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }else{
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalStatus"),
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : this.detailsData[0].requiredApprovals + `${ this.detailsData[0].requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }
            }
            else{
              if(!kony.sdk.isNullOrUndefined(this.detailsData[0].status))
                {
                  this.detailsData[0].lblStatus=this.detailsData[0].status;
                }
              if(this.detailsData[0].lblStatus === "pending" || this.detailsData[0].lblStatus === "Pending"){
                var navManager = applicationManager.getNavigationManager();
                var pendingRequestDetails = navManager.getCustomInfo("PendingRequestDetails");
                var isVisibleLink=false;
                if(!kony.sdk.isNullOrUndefined(pendingRequestDetails) && !kony.sdk.isNullOrUndefined(pendingRequestDetails.pendingGroupRules)){ 
                   isVisibleLink=true;
                }else{
                   isVisibleLink=false;
                }
                jsonData={
                  "lblPendingApproval":{
                      "text":kony.i18n.getLocalizedString("i18n.payments.pendingApprovers"),
                      isVisible:isVisibleLink,
                  },
                  "flxPendingApproval":{
                      isVisible:true,
                      onClick : self.ApprovalHistoryRowOnclick 
                  },
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : this.detailsData[0].receivedApprovals +" "+"of"+" "+this.detailsData[0].requiredApprovals+" "+"Approved",
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }
              else if(this.detailsData[0].lblStatus === "approved" || this.detailsData[0].lblStatus === "Approved"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text": this.detailsData[0].requiredApprovals + `${ this.detailsData[0].requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData);                  
              }
              else if(this.detailsData[0].lblStatus === "rejected" || this.detailsData[0].lblStatus === "Rejected"){
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : 1+" "+kony.i18n.getLocalizedString("kony.mb.achtransactions.Rejection"),
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }else{
                jsonData={
                  "lblRecipientname":{
                    "text" : kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName")+" :",
                    "skin":"sknlbl949494SSPR13px",
                  },
                  "lblAccountnumber":{
                    "text" : this.detailsData[0].requiredApprovals + `${ this.detailsData[0].requiredApprovals !== '-' ? ' ' + kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalstatus") : ''}`,
                    "skin":"sknlbl424242ssp40px",
                  },
                  "lblAmount":{
                    "text" : "",
                  },
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                response.push(jsonData); 
              }
            }
            response.reverse();
            if(Array.isArray(response)){
              this.view.segApprovalHistory.widgetDataMap={
                "lblRecipientname":"lblRecipientname",
                "lblAccountnumber":"lblAccountnumber",
                "lblAmount":"lblAmount",
                "flxSep":"flxSep",
                "flxSeperatorTrans4":"flxSeperatorTrans4",
                "lblStatus":"lblStatus",
                "flxComments":"flxComments",
                "lblComments":"lblComments",
                "lblCommentsVal":"lblCommentsVal",
                "flxPendingApproval":"flxPendingApproval",
                "lblPendingApproval":"lblPendingApproval",
                "flxGroupName":"flxGroupName",
                "lblGroupName":"lblGroupName",
                "lblGroupNameVal":"lblGroupNameVal"
              };
              if(response.length > 0){
                this.view.segApprovalHistory.setData(response);
              }else{
                this.view.segApprovalHistory.removeAll();
                nodataArr=[];
                nodataJson = {
                  "lblRecipientname":"No Request History Records Found",
                  "lblAccountnumber":"",
                  "lblAmount":"",
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
                nodataArr.push(nodataJson);
                this.view.segApprovalHistory.setData(nodataArr);
              }
            }
          }
        }
      }catch(er){
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }
      finally{
        this.decServiceCount();
      }
    },
    btnConfigApprovalDetails:function(formFlow,amICreator,amIApprover,status){
      try{
        if(status.toLowerCase() === "pending"){
          var approvalRejectPermission = "";

          if(formFlow === "ACHFileList"){
            approvalRejectPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_FILE_APPROVE");
          }else if(formFlow === "TransactionDetailsApprovals" || formFlow === "ACHTransactionsList" ){
            if(this.detailsData[0].lblPayment.indexOf("Payment") > -1){
              approvalRejectPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_PAYMENT_APPROVE");
            }else if(this.detailsData[0].lblPayment.indexOf("Collection") > -1){
              approvalRejectPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_COLLECTION_APPROVE");
            }
            else if(this.detailsData[0].lblPayment.indexOf("Tax") > -1) //condition check for federal tax records
            {
              approvalRejectPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_PAYMENT_APPROVE");  
            }
          }
          if(!approvalRejectPermission){
            this.view.flxbtnApproveReject.isVisible = false;
            this.view.flxbtnWithdraw.isVisible = false;
            return;
          }

          if(amIApprover === "true" && amICreator ==="false"){
            this.view.flxbtnApproveReject.isVisible = true;
            this.view.flxbtnWithdraw.isVisible = false;
          }else if(amIApprover === "false" && amICreator === "true"){
            this.view.flxbtnApproveReject.isVisible = false;
            this.view.flxbtnWithdraw.isVisible = true;
          }else if (amIApprover === "true" && amICreator === "true"){
            this.view.flxbtnApproveReject.isVisible = true;
            this.view.flxbtnWithdraw.isVisible = true;
          }else if(amIApprover === "false" && amICreator === "false"){
            this.view.flxbtnApproveReject.isVisible = false;
            this.view.flxbtnWithdraw.isVisible = false;
          }
        }else{
          this.view.flxbtnApproveReject.isVisible = false;
          this.view.flxbtnWithdraw.isVisible = false;
        }
      }catch(er){
      }
    }, 

    /**
     * callback handler for service error handling
     */
    fetchErrorBack:function(response)
    {
      try { 
        this.view.flxPopupWrapper.setVisibility(false);
        if(!kony.sdk.isNullOrUndefined(response)){
          var scopeObj=this;
          var errorResponse = "";
          if(!kony.sdk.isNullOrUndefined(response.errorMessage)){
            errorResponse= response.errorMessage;
          }
          else{
            errorResponse= "Something went wrong while making service call.";
          }
          this.view.customPopup.lblPopup.text = errorResponse;    
          if(!kony.sdk.isNullOrUndefined(this.timerCounter)){
            this.timerCounter = parseInt(this.timerCounter)+1;
          }
          else{
            this.timerCounter = 1;
          }
          var timerId="timerPopupErrorACHTransactionDetail"+this.timerCounter;
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";   
          this.view.flxPopup.setVisibility(true);
          // applicationManager.getPresentationUtility().dismissLoadingScreen();
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
          }, 1.5, false);            
        }
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.decServiceCount();
      }catch(error){
        kony.print("frmACHTransactions ACHFileListload_rowclick-->"+error);
        // applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearServiceCount();
      }      
    },

    onClickOkcommon:function()
    {
      var formType=this.previousFormType;
      try{
        this.view.flxRejectpopup.setVisibility(false);
      }catch(err){}
      try{
        applicationManager.getPresentationUtility().showLoadingScreen();
      }catch(err){}
      if(this.withdrawCalled === true) return;
      else this.withdrawCalled = true;
      if(formType=== "TransactionDetailsRequests" || formType=== "ACHTransactionDetailsRequests" || formType === "ACHFileListRequests" || formType === "ACHFileList"){  
        this.withdrawServicecall();
      }else{
        this.rejectServicecall();
      }
    },

    /*This function is used to show the confiramation popup */
    confirmWithdrawalPopup:function()
    {
      try{
        var formType=this.previousFormType;
        this.view.rejectPopUp.lblTitle.text= kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw");
        this.view.rejectPopUp.lblYes.text=kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw");
        this.view.rejectPopUp.lblContent.text=kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
        this.view.rejectPopUp.lblContentreject.text=kony.i18n.getLocalizedString("kony.mb.withdrawreason");
        this.view.rejectPopUp.txtRejectreason.onTextChange = function(){
           kony.print("textChanged for txtRejectreason"); 
        };
        this.view.rejectPopUp.txtRejectreason.text = "";
        this.view.rejectPopUp.flxReject.setEnabled(true);
        /**withdraw flow for Request**///
        if(formType === "TransactionDetailsRequests" || formType === "ACHTransactionDetailsRequests" || formType === "ACHFileListRequests"){
          var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
          if(isiPhone) {
            var msgText = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
            var basicConfig = {message: msgText,
                               alertTitle:"",
                               alertIcon:null,
                               alertType: constants.ALERT_TYPE_CONFIRMATION,
                               yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ApprovalRequests.Withdraw"),
                               noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                               alertHandler: this.withdrawConfirmIphone
                              };
            var pspConfig = {};
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
          }else{
            this.view.flxRejectpopup.isVisible = true;
            this.view.rejectPopUp.lblTitle.isVisible = false;
            this.view.rejectPopUp.lblContent.skin = "sknLbl494949SSP40px";
            this.view.rejectPopUp.lblContentreject.skin = "sknLbl494949SSP40px";
            this.view.rejectPopUp.lblContent.isVisible = true;
            this.view.rejectPopUp.lblContentreject.isVisible = false;
            this.view.rejectPopUp.txtRejectreason.isVisible = true;
            this.view.rejectPopUp.txtRejectreason.onTextChange = function(a,b){
              var data = b;
              if(kony.sdk.isNullOrUndefined(data)) data = "";
              data = data.trim();
              var dataLen = data.length;
              if(dataLen===0){
                this.view.rejectPopUp.flxReject.setEnabled(false);
              }
              else
                this.view.rejectPopUp.flxReject.setEnabled(true);
            }.bind(this);
            this.view.rejectPopUp.lblContent.top = "25dp";
            this.view.rejectPopUp.flxBtns.top = "15dp";
            this.view.rejectPopUp.lblContent.text = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
            var data = this.view.rejectPopUp.txtRejectreason.text;
            if(kony.sdk.isNullOrUndefined(data)) data = "";
            data.trim();
            var dataLen = data.length;
            if(dataLen===0){
              this.view.rejectPopUp.flxReject.setEnabled(false);
            }
            else{
              this.view.rejectPopUp.flxReject.setEnabled(true);
            }
          }
        }
        else if(formType === "ChequeBookRequests"){
          var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
          if(isiPhone) {
            var msgText = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
            var basicConfig = {message: msgText,
                               alertTitle:"",
                               alertIcon:null,
                               alertType: constants.ALERT_TYPE_CONFIRMATION,
                               yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ApprovalRequests.Withdraw"),
                               noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                               alertHandler: this.withdrawConfirmIphone
                              };
            var pspConfig = {};
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
          }else{
            this.view.flxRejectpopup.isVisible = true;
            this.view.rejectPopUp.lblTitle.isVisible = false;
            this.view.rejectPopUp.lblContent.skin = "sknLbl494949SSP40px";
            this.view.rejectPopUp.lblContentreject.skin = "sknLbl494949SSP40px";
            this.view.rejectPopUp.lblContent.isVisible = true;
            this.view.rejectPopUp.lblContentreject.isVisible = false;
            this.view.rejectPopUp.txtRejectreason.isVisible = false;
            this.view.rejectPopUp.lblContent.top = "25dp";
            this.view.rejectPopUp.flxBtns.top = "15dp";
            this.view.rejectPopUp.flxReject.onClick = this.withdrawHandler;
            this.view.rejectPopUp.lblContent.text = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
          }
        }
        else{  
          /**withdraw flow for ACH**/
          this.view.flxRejectpopup.isVisible = true;
          this.view.rejectPopUp.lblTitle.isVisible = false;
          this.view.rejectPopUp.lblContent.skin = "sknLbl494949SSP40px";
          this.view.rejectPopUp.lblContentreject.skin = "sknLbl494949SSP40px";
          this.view.rejectPopUp.lblContent.isVisible = true;
          this.view.rejectPopUp.lblContentreject.isVisible = false;
          this.view.rejectPopUp.txtRejectreason.isVisible = true;
          this.view.rejectPopUp.lblContent.top = "25dp";
          this.view.rejectPopUp.flxBtns.top = "15dp";
          this.view.rejectPopUp.lblContent.text = kony.i18n.getLocalizedString("kony.mb.achwithdrawal.confirmpopup");
          //this.withdrawServicecall();       
        }

      }
      catch(er)
      {
        kony.print("catch of confirmWithdrawalPopup"+er); 
      }
    },

    getAmountVal: function(responseObj){
      var amount = "-";
      if(!kony.sdk.isNullOrUndefined(responseObj.transactionCurrency)
        && !kony.sdk.isNullOrUndefined(responseObj.transactionAmount)){
          var formatManager = applicationManager.getFormatUtilManager();
          var transactionCurrencySymbol = formatManager.getCurrencySymbol(responseObj.transactionCurrency); 
          amount = transactionCurrencySymbol + responseObj.transactionAmount;
      }
      return amount;
    },

    withdrawConfirmIphone : function(response){
      if(response === true)
      {
        this.withdrawServicecall();
      }
    },
    /*This function is used to handle the  popup action*/
    withdrawHandler:function()
    { 
      this.withdrawServicecall();
    },

    /*This function is used to close the popup */
    closePopup:function(obj){
      try{
        kony.print("try of closePopup");
        var id = obj.id;
        switch(id){
          case"flxConfirmationPopUp":
          case "flxNo":
            this.view.flxConfirmationPopUp.isVisible=false;
            break;
          default:
            break;
        }
      }catch(er){
        kony.print("catch of closePopup"+er);
      }
    },
    ApprovalHistoryRowOnclick:function(){
      try{
       var data=this.view.segApprovalHistory.selectedItems[0];
        if(data.flxPendingApproval.isVisible===true){
          var navManager = applicationManager.getNavigationManager();
          navManager.navigateTo("frmPendingApproversGroup");
        }
      }catch(er){
        kony.print(er);
      }
    }
  };
});