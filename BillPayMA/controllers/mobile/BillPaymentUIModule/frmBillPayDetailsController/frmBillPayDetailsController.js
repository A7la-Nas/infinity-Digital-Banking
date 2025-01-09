define({
data:null,
 //Type your controller code here
   init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
     this.view.btnBillPay.onClick=this.payBill;
     this.view.btnBillView.onClick=this.viewBill;
    },
  frmPreshow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
     // this.view.flxFooter.isVisible = true;
    }else{
      this.view.flxHeader.isVisible = true;
      this.view.flxFooter.isVisible = false;
    var configManager = applicationManager.getConfigurationManager();
        var MenuHandler =  applicationManager.getMenuHandler();
       var scope = this;
      MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUBILLPAY);
       this.view.customHeader.flxBack.onClick = function() {
       navManager.goBack();
	  }
    }
    this.bindData();
    this.checkPermissionBasedAccess();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.btnBillView.text=applicationManager.getPresentationUtility().getStringFromi18n("Kony.mb.EBill.ViewBill");
  },
  bindData:function()
  {
    var navMan = applicationManager.getNavigationManager();
    this.data=navMan.getCustomInfo("frmBillPayDetails");
    this.view.lblPayeeValue2.text=this.data.payeeName;
    this.view.lblAddress.text=this.data.payeeAddressLine1;
    var formatUtil=applicationManager.getFormatUtilManager();
    var billdateobj = formatUtil.getDateObjectfromString(this.data.billDueDate, "YYYY-MM-DD");
    this.data.transactionDate= formatUtil.getFormatedDateString(billdateobj, formatUtil.getApplicationDateFormat());
    this.view.lblTransactionDateValue.text= this.data.transactionDate;
    this.view.lblDueAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.data.dueAmount);
   // this.view.lblDueAmountValue.text=this.data.dueAmount;
    var billGDate=formatUtil.getDateObjectfromString(this.data.billGeneratedDate, "YYYY-MM-DD");
    this.data.billGenDate= formatUtil.getFormatedDateString(billGDate, formatUtil.getApplicationDateFormat());
    this.view.lblBillGenerationDateValue.text=this.data.billGenDate;
    this.view.lblAccountNumberValue.text=this.data.fromAccountNumber;
     var billPDate=formatUtil.getDateObjectfromString(this.data.paidDate, "YYYY-MM-DD");
    this.data.billPdate=formatUtil.getFormatedDateString(billPDate, formatUtil.getApplicationDateFormat())
    this.view.lblLastPaymentValue.text=this.data.billPdate;
  },
  checkPermissionBasedAccess : function(){
      var self = this;
      var createPayPermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE");

      if(createPayPermission){
        self.view.btnBillPay.isVisible = true;
      }else{
        self.view.btnBillPay.isVisible = false;
      }
     
    },
  viewBill:function()
  {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.viewBill(this.data.ebillURL);
  },
  payBill:function()
  {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      this.data.flowType = "payEBill"
      billPayMod.presentationController.navAfterSelectPayee(this.data);
  },
 });