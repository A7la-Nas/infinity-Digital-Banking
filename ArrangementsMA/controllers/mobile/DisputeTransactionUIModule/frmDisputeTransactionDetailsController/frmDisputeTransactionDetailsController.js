define({
  init : function(){
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow:function(){
    var deviceUtilManager =applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(isIphone){
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible=false;
    }
    else{
      this.view.flxHeader.isVisible = true;
    }
    this.view.btnCancelRequest.isVisible = false;
    this.populateData();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  populateData : function(){
  var navMan=applicationManager.getNavigationManager();
  var selectedTransaction = navMan.getCustomInfo("frmDisputedTransactionsList");
  this.view.lblDisputeDate.text= (selectedTransaction.formattedDisputeDate && selectedTransaction.formattedDisputeDate!=="" && selectedTransaction.formattedDisputeDate!==null) ?selectedTransaction.formattedDisputeDate:"-";
  this.view.lblDisputeIdValue.text = (selectedTransaction.orderId && selectedTransaction.orderId!=="" && selectedTransaction.orderId!==null) ?selectedTransaction.orderId:"-";
  this.view.lblTransferDescription.text= (selectedTransaction.description && selectedTransaction.description!=="" && selectedTransaction.description!==null) ?selectedTransaction.description:"-";
  this.view.lblTransferValue.text= (selectedTransaction.formattedAmount && selectedTransaction.formattedAmount!=="" && selectedTransaction.formattedAmount!==null) ?selectedTransaction.formattedAmount:"-";
  this.view.lblDisputeStatus.text= (selectedTransaction.orderStatus && selectedTransaction.orderStatus!=="" && selectedTransaction.orderStatus!==null) ?selectedTransaction.orderStatus:"-";
  this.view.lblReferenceValue.text= (selectedTransaction.transactionId && selectedTransaction.transactionId!=="" && selectedTransaction.transactionId!==null) ?selectedTransaction.transactionId:"";
  this.view.lblTransferredFromValue.text= (selectedTransaction.formattedfromAccountName && selectedTransaction.formattedfromAccountName!=="" && selectedTransaction.formattedfromAccountName!==null) ?selectedTransaction.formattedfromAccountName:
                                             (selectedTransaction.fromAccountName && selectedTransaction.fromAccountName!=="" && selectedTransaction.fromAccountName!==null) ?selectedTransaction.fromAccountName :   
                                             (selectedTransaction.fromAccountNumber && selectedTransaction.fromAccountNumber!=="" && selectedTransaction.fromAccountNumber!==null) ?selectedTransaction.fromAccountNumber:"-";
  this.view.lblTransferredToValue.text= (selectedTransaction.toAccountName && selectedTransaction.toAccountName!=="" && selectedTransaction.toAccountName!==null) ?selectedTransaction.toAccountName:
                                        (selectedTransaction.payPersonName && selectedTransaction.payPersonName!=="" && selectedTransaction.payPersonName!==null) ?selectedTransaction.payPersonName:"-";
  this.view.lblTransDateValueTrans.text= (selectedTransaction.formattedTransactionDate && selectedTransaction.formattedTransactionDate!=="" && selectedTransaction.formattedTransactionDate!==null) ?selectedTransaction.formattedTransactionDate:"";
  this.view.lblTransactionTypeValue.text= (selectedTransaction.transactionType && selectedTransaction.transactionType!=="" && selectedTransaction.transactionType!==null) ?selectedTransaction.transactionType:"-";
  this.view.lblDescValueTrans.text= (selectedTransaction.disputeReason && selectedTransaction.disputeReason!=="" && selectedTransaction.disputeReason!==null) ?selectedTransaction.disputeReason:"-";
  this.view.lblNotesValueTrans.text= (selectedTransaction.transactionsNotes && selectedTransaction.transactionsNotes!=="" && selectedTransaction.transactionsNotes!==null) ?selectedTransaction.transactionsNotes:"-";
  this.view.lblDesc.text = (selectedTransaction.disputeDescription && selectedTransaction.disputeDescription!=="" && selectedTransaction.disputeDescription!==null) ? selectedTransaction.disputeDescription:"-"; 
  },
  initActions:function(){
    var scope=this;
    this.view.btnCancelRequest.onClick=function(){
      var basicConfig={  
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": "",
        "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
        "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.DisputeTransaction.AlertCancelRequest","Are you sure you want to cancel this request?"),
        "alertHandler": scope.cancelDisputeTrans
      };
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
    };
    this.view.customHeader.flxBack.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      new kony.mvc.Navigation({"friendlyName": "frmDisputedTransactionsList","appName": "ArrangementsMA"}).navigate();
    }
    this.view.btnSendMessage.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"SecureMessageMA","moduleName":"MessagesUIModule"});
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("messageCategory","frmDisputeTransactionDetails");
      messagesModule.presentationController.getCategories();
    };
  },
  cancelDisputeTrans:function(response)
  {
    if(response===true)
    {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var disputeModule = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
      var navMan=applicationManager.getNavigationManager();
      var transactionData = navMan.getCustomInfo("frmDisputedTransactionsList");
      if (transactionData) 
      disputeModule.deleteTransaction(transactionData);
    }
  },
});