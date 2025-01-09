define(['CommonUtilities'], function(CommonUtilities) {
  return {
    bankDate: "",
    chequeTypeId: "",
    hasRequestRevokeStopPaymentFeature: false,
    initActions: function () {
      var scope=this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm=currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.customHeader.flxBack.onTouchEnd = scope.navigateBack;
    },
    preShow:function(){
      //check features and permissions  
      var configManager = applicationManager.getConfigurationManager();
      this.hasRequestRevokeStopPaymentFeature = configManager.checkUserFeature("REVOKE_STOP_PAYMENT_REQUEST");

      if (kony.os.deviceInfo().name === "iPhone") {
        this.view.flxHeader.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = true;
      }
      var navMan=applicationManager.getNavigationManager();
      var details=navMan.getCustomInfo("frmChequeTransactionDetails");
      if(details.tabSelection==="ChequeBook"){
        this.renderChequeBookView(details.data);
      }
      else if(details.tabSelection==="StopCheque"){
        this.renderStopChequeView(details.data);
      }
      else{
        this.renderMyChequeView(details.data);
      }
      navMan.setCustomInfo("frmChequeManagement", {"TAB" : details.tabSelection});
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"}).presentationController.getBankDate();

    },
    postShow:function(){

    },
    renderChequeBookView:function(data){
      this.view.flxStopChequeDetails.isVisible=false;
      this.view.flxChequeBookDetails.isVisible=true;
      this.view.flxChequeDetails.isVisible=false;
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      this.view.lblNumberOfBooks.text=data.bookCount;
      this.view.lblStatus.text=data.lblStatus;
      this.view.lblAccountValue.text=presentation.processedName;
      if(data.description)
        this.view.lblAccountType.text=data.description;
      else
        this.view.lblAccountType.text="";
      if(data.lblDate)
        this.view.lblRequestDateValue.text=data.lblDate;
      else
        this.view.lblRequestDateValue.text="-";
      this.view.lblRefValue.text=data.chequeIssueId;
      if(data.notes)
        this.view.lblNotesValue.text=data.notes;
      else
        this.view.lblNotesValue.text="-";
      if(data.address)
        this.view.lblAddressValue.text=data.address;
      else
        this.view.lblAddressValue.text="-";
      if(data.fees)
        this.view.lblFeeValue.text=data.fees;
      else
        this.view.lblFeeValue.text="-";
      if(data.deliveryType)
        this.view.lblDeliveryTypeValue.text=data.deliveryType;
      else
        this.view.lblDeliveryTypeValue.text="-";
      //this.view.flxDeliveryType.isVisible=false;
      //this.view.flxAddress.isVisible=false;
      //this.view.flxFee.isVisible=false;
      this.view.flxButtons.isVisible=false; 
    },
    renderStopChequeView:function(data){
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      this.view.flxStopChequeDetails.isVisible=true;
      this.view.flxChequeBookDetails.isVisible=false;
      this.view.flxChequeDetails.isVisible=false;
      this.view.lblTransferValue.text=data.booksCount;
      this.view.lblSuccess.text=data.lblStatus;
      this.view.lblTransferredToValueTrans.text=presentation.processedName;
      if(data.accountType)
        this.view.lblAccTypeTrans.text=data.accountType;
      else
        this.view.lblAccTypeTrans.text="";
      if(data.payeeName)
        this.view.lblTransferredToValueP2P.text=data.payeeName;
      else
        this.view.lblTransferredToValueP2P.text="-";
      if(data.lblDate)
        this.view.lblTransferredFromValueTrans.text=data.lblDate;
      else
        this.view.lblTransferredFromValueTrans.text="-";
      if(data.checkDateOfIssue)
        this.view.lblDescValueTrans.text=data.checkDateOfIssue;
      else
        this.view.lblDescValueTrans.text="-";
      this.view.lblTransDateValueTrans.text=data.lblAccountNo;
      this.view.lblFreqTransValue.text=data.checkReason;
      if(data.amount)
        this.view.lblRecurrenceValueTrans.text=data.amount;
      else
        this.view.lblRecurrenceValueTrans.text="-";
      if (data.booksCount && data.booksCount.indexOf("-") > -1) {
        var res = data.booksCount.split("-");
        this.view.lblReferenceNoValueTrans.text=parseInt((res[1])-parseInt(res[0])+1);
      }
      else
        this.view.lblReferenceNoValueTrans.text="-";
      if(data.fee)
        this.view.lblIBANValue.text=data.fee;
      else
        this.view.lblIBANValue.text="-";
      if(data.notes)
        this.view.lblNotesValueTrans.text=data.notes;
      else
        this.view.lblNotesValueTrans.text="-";
      this.view.flxButtonsTrans.isVisible=false;
    },
    renderMyChequeView:function(data){
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      this.view.flxStopChequeDetails.isVisible=false;
      this.view.flxChequeBookDetails.isVisible=false;
      this.view.flxChequeDetails.isVisible=true;
      this.view.lblChequeNumberValue.text=data.booksCount;
      this.view.lblSuccesful.text=data.lblStatus;
      this.view.lblReasonVal.text=data.lblStatus||"-";
      this.view.lblNotesVal.text=data.notes||"-";
      this.view.lblFromValue.text=presentation.processedName;
      if(data.accountType)
        this.view.lblAcType.text=data.accountType;
      else
        this.view.lblAcType.text="";
      if(data.lblAccountNo)
        this.view.lblPayeeValue.text=data.lblAccountNo;
      else
        this.view.lblPayeeValue.text=data.lblAccountNo="-";
      this.view.lblAmountValue.text=data.lblDate;
      this.view.lblDateValue.text=data.issueDate;
      this.view.lblRefeValue.text=data.referenceNumber;
      this.chequeTypeId = data.chequeTypeId;
      // this.view.flexReason.isVisible=false;
      // this.view.flexNotes.isVisible=false;
      // Revoke stop check
     /*** commented the condition to cope up with the olb implementation for revoke button
     var checkStatus = kony.string.endsWith(this.view.lblSuccesful.text, "Stopped", true);
      if (checkStatus && this.hasRequestRevokeStopPaymentFeature) {
        this.view.buttonRevokeRequest.isVisible = true;
        this.view.buttonRevokeRequest.onClick = this.onClickOfRevokeStopCheck;
      } else {
        this.view.buttonRevokeRequest.isVisible = false;
      }***/
      this.view.buttonRevokeRequest.isVisible = true;
      this.view.buttonRevokeRequest.onClick = this.onClickOfRevokeStopCheck;
    },
    navigateBack:function(){
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    onClickOfRevokeStopCheck: function() {
      var loggerManager = applicationManager.getLoggerManager();
      function alertHandler(response) {
        if (response === true) {
          applicationManager.getPresentationUtility().showLoadingScreen();
          this.updateRevokeStopChequePayment();
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          //     this.navigateToRevokeStopCheck();
        }
      }
      try {
        loggerManager.log("#### start frmChequeTransactionDetailsController : onClickOfRevokeStopCheck");
        var alertmessage = kony.i18n.getLocalizedString("kony.mb.chequeManagement.revokeRequestMsg");
        var yesText = kony.i18n.getLocalizedString("kony.mb.common.Yes");
        var noText = kony.i18n.getLocalizedString("kony.mb.common.No");
        var basicConfig = {
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "alertTitle": "",
          "yesLabel": yesText,
          "noLabel": noText,
          "message": alertmessage,
          "alertHandler": alertHandler.bind(this)
        };
        applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
      } catch (error) {
        loggerManager.log("#### in catch of frmChequeTransactionDetailsController : onClickOfRevokeStopCheck" + JSON.stringify(err) + " ####");
      }
    },
    navigateToRevokeStopCheck: function(paramObj) { 

      var refId = paramObj.referenceId;
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmChequeRevokeAckn", {"referenceId": refId});
      navMan.navigateTo({"appName":"ArrangementsMA", "friendlyName":"frmChequeRevokeAckn"} );
    },
    /**
* Method to set the current working bank date
* @param {Object} bankDateObj object containing bank date
*/
    setBankDate: function(bankDateObj) {
      var scopeObj = this;
      var formatUtil = applicationManager.getFormatUtilManager();
      scopeObj.bankDate = bankDateObj;
      var serverDate = CommonUtilities.getServerDateObject();
      var formatServerDate = formatUtil.getFormatedDateString(serverDate, formatUtil.getBackendDateFormat());
      this.bankDate = bankDateObj.currentWorkingDate || formatServerDate;
      
    },
    updateRevokeStopChequePayment: function() {
      /**
         * Method to revoke stopped cheque payment 
         */ 
      params = {
        "checkNumber1": this.view.lblChequeNumberValue.text,
        "payeeName": this.view.lblPayeeValue.text,
        "revokeDate": this.bankDate,
        "chequeTypeId": this.chequeTypeId
      };
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"}).presentationController.updateRevokeStopChequePayment(params);
    },

    bindGenericError: function (errorMsg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
    }
  };
});