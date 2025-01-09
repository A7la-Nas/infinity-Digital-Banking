  var MyAccObj= {};
define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities){
  return{
  objRec: '',
  init : function(){
              var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  iPhoneHeaderHandler: function(){
      var scope = this;
      if(scope.view.flxContainer.contentOffsetMeasured.y > 50){
        scope.view.title = this.view.customHeader.lblLocateUs.text;
      }
      else if(scope.view.flxContainer.contentOffsetMeasured.y < 45){
        scope.view.title = "";
      }
  },
  onNavigate: function(obj) {
              var scope = this;
    if (obj === undefined) {
      var newObj = {
        "view": "familyCheckingAcc"
      };
      obj = newObj;
    }
    this.objRec = obj;
    var accNo = "";

    var ending = ".";
    
              var navMan = applicationManager.getNavigationManager();
              var contextObj = navMan.getCustomInfo("frmAccountInfo");
                   // this.view.customHeader.lblLocateUs.text = nickName + accNo;
                   for (var cont in contextObj) {
                    var index = cont.split(".");
                    var value = index[0];
                    var key = index[1];
                   if(key === "accountID") {
                     accNo=contextObj[cont];
                     var accountDetails = applicationManager.getAccountManager().getInternalAccountByID(accNo);
                     var nickName=accountDetails.nickName;
                     ending = ending.repeat(3);
                    accNo = (accNo.slice(accNo.length - 4));
                    nickName = nickName + ending;this.view.customHeader.lblLocateUs.text = nickName + accNo;
                    break;
                   }
                  }

              //this.view.customHeader.lblLocateUs.text = contextObj.headerText;
                   for (var cont in contextObj) {
                      var index = cont.split(".");
                      var value = index[0];
                      var key = index[1];
                     if(key === "isBusinessAccount") {
                        contextObj["userType"] = contextObj[cont] === "true" ? "business" : "Retail";
                       break;
                     }
                    }
              scope.view.information.setContext(contextObj);
  },
  accDetails:'',
  preshowAccInfo: function() {
              var scope = this;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
                  this.view.title = "";
    }
    this.view.flxContainer.onScrolling = function() {
             scope.iPhoneHeaderHandler();
    };
              scope.view.information.onError = function(errorObj) {
                  alert(errorObj.err);
              };
              scope.view.information.requestStart = function() {
                  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
              };
              scope.view.information.requestEnd = function() {
                  kony.application.dismissLoadingScreen();
              };
              scope.view.information.onContactUsButtonClick = function() {
                  scope.callBank();
              };
    var navigationManager =applicationManager.getNavigationManager();
              this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
              this.view.flxHeader.setEnabled(true);
     this.view.customHeader.btnRight.onClick=this.customHeaderBtnRightOnClick;
    this.view.btnCancel.onClick=this.btnCancelOnClick;
    this.view.btnEditNickName.onClick=this.btnEditNickNameOnClick;
    var customInfo = navigationManager.getCustomInfo("frmAccountDetails");
    this.accDetails = customInfo.selectedAccountData;
              /*
    this.accDetails =navigationManager.getCustomInfo("frmAccountDetails");
             if (this.accDetails.selectedAccountData["externalIndicator"] == "true"){
                        var bankCodes = this.accDetails.selectedAccountData["Account_id"].split('-');
                        this.accDetails.selectedAccountData["bankCode"]=bankCodes[0];
                              navigationManager.setCustomInfo("frmAccountDetails",this.accDetails);
                var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                   var targetDate = CommonUtilities.getDateAndTime(this.accDetails.selectedAccountData["expiresAt"]);
                   var expireDate = (targetDate.split(","))[0];
                   var today = kony.os.date(dateFormat);
                   var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                   var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                  var difference=targetDateObj-todayDateObj;
                  var count= Math.ceil(difference/ (1000 * 60 * 60 * 24));
                  MyAccObj.Count= count;
               MyAccObj.AlertDays= 100; //record.connectionAlertDays;
              if (MyAccObj.Count <= 0) {
                this.view.lblExpiryDetails.setVisibility(true);
            
                 this.view.lblExpiryDetails.text= "Your connection has expired"; 
              this.view.lblExpiryDetails= "sknlblFF5D6E";
              } 
      else {
          this.view.lblExpiryDetails.setVisibility(true);
          
                 this.view.lblExpiryDetails.text= "Your connection has " + MyAccObj.Count + " days remaining"; 
              this.view.lblExpiryDetails.skin= "skinLblSSPRegular4176A422px";
      }
              } */
    this.btnCancelOnClick();
              /*
    this.accDetails=this.accDetails.selectedAccountData;
    this.view.flxAccNoToggleHL.onClick = this.flxAccNoToggleHLToggleOnClick;
    this.view.flxAccNoToggleCC.onClick = this.flxAccNoToggleCCOnClick;
    this.view.flxAccNoToggle.onClick = this.flxAccNoToggleOnClick;
    this.view.flxRouteNoToggle.onClick = this.flxRouteNoToggleOnClick;
    this.view.customHeader.btnRight.onClick=this.customHeaderBtnRightOnClick;
    this.view.btnEditNickName.onClick=this.btnEditNickNameOnClick;
//               this.view.btnCancel.onClick = this.CancelOptions;
              this.view.btnCancel.onClick=this.btnCancelOnClick;
//               this.view.flxDismiss.onClick = this.CancelOptions;*/
    this.view.btnRefresh.onClick = this.refreshCallBack;
    this.view.btnDelete.onClick=this.deleteCallBack;
              // this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
           //   this.view.flxAccNoToggleDA.onClick = this.flxAccNoToggleDAOnClick; */
    this.view.flxPopupNickName.setVisibility(false);
//               this.view.customHeader.lblLocateUs.text = this.accDetails.nickName;
            
             // this.view.title = this.accDetails.nickName;
    this.view.btnRenew.onClick= this.goToTerms;
    var configManager = applicationManager.getConfigurationManager();
    this.checkCallBankPermission(configManager.checkUserPermission("CALL_BANK"));
    this.checkMessageBankPermission(configManager.checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
	applicationManager.getPresentationUtility().dismissLoadingScreen();
            /*
              if (this.accDetails.externalIndicator == "true") {
        this.createViewForInternalExtAcc();
    }
    else{
    if(String(this.accDetails.type).trim().toLowerCase() === "external") {
      this.createViewForExternalAccountDetails();
    } else {
      if (this.accDetails.accountType === configManager.constants.CHECKING ||this.accDetails.accountType === configManager.constants.SAVINGS) {
        this.createViewForFamilyCheckingAcc();
      }
      if (this.accDetails.accountType === configManager.constants.CREDITCARD) {
        this.createViewForCreditCard();
      }
      if (this.accDetails.accountType === configManager.constants.LOAN||this.accDetails.accountType === configManager.constants.MORTGAGE) {
        this.createViewForHomeLoanAcc();
      }
      if (this.accDetails.accountType === configManager.constants.DEPOSIT) {
        this.createViewForDepositAccount();
      }
                  }
              } */
    var currentForm=navigationManager.getCurrentForm();
    navigationManager.setCustomInfo("isBusinessUserFlow", false);
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
    
    checkCallBankPermission : function(isPermitted){
      this.view.btnCallBank.setVisibility(isPermitted);
      this.view.btnCallBankCC.setVisibility(isPermitted);
      this.view.btnCallBankHL.setVisibility(isPermitted);
      this.view.btnCallBankDA.setVisibility(isPermitted);
    },

    checkMessageBankPermission : function(isPermitted){
      this.view.btnMsgBank.setVisibility(isPermitted);
      this.view.btnMsgBankCC.setVisibility(isPermitted);
      this.view.btnMsgBankHL.setVisibility(isPermitted);
      this.view.btnMsgBankDA.setVisibility(isPermitted);
    },
    
  CancelOptions : function(){
    this.view.flxPopupNickName.setVisibility(false);
    this.view.flxHeader.setEnabled(true);
    this.view.flxContainerCheckingAcc.setEnabled(true);
    this.view.flxContainerCreditCard.setEnabled(true);
    this.view.flxContainerHomeLoan.setEnabled(true);
    this.view.flxContainerDepositAccount.setEnabled(true);
  },
  createViewForFamilyCheckingAcc: function() {
    this.view.flxContainerCheckingAcc.setVisibility(true);
    this.view.flxExternalAccountContainer.setVisibility(false);
    this.view.flxContainerCreditCard.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(false);
    this.view.btnCallBank.onClick=this.callBank;
    this.view.btnMsgBank.onClick=this.messageBank;
    this.PopulateCheckingAccount();
    this.view.forceLayout();
  },
    createViewForInternalExtAcc: function(){
      
    this.view.flxContainerCheckingAcc.setVisibility(false);
    this.view.flxExternalAccountContainer.setVisibility(true);
    this.view.flxContainerCreditCard.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(false);
    this.view.btnCallBank.onClick=this.callBank;
    this.view.btnMsgBank.onClick=this.messageBank;
    this.PopulateIntExtAccount();
    this.view.forceLayout();
    },
    
  PopulateIntExtAccount: function() {
    var forUtility=applicationManager.getFormatUtilManager();
    if(!kony.sdk.isNullOrUndefined(this.accDetails.nickName))
    {

      this.view.customHeader.lblLocateUs.text = this.accDetails.nickName;
      this.view.title=this.accDetails.nickName;
    }
    else
    {
      this.view.customHeader.lblLocateUs.text = this.accDetails.accountName;
      this.view.title=this.accDetails.accountName;
    }
    this.view.imgExternalAccountBank.src = "genericexternalbank.png";
    this.view.lblExternalAccountBankName.text= this.accDetails.bankName;
    this.view.lblExternalAccountAvailBalValue.text = forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.availableBalance);
    this.view.lblExternalAccountTypeValue.text = this.accDetails.accountType;
                       var a=this.accDetails.accountHolder;
                        var b = JSON.parse(a);
                        var c=b.fullname;
    this.view.lblExternalAccountHoldrValue.text = c;
    
    if(!kony.sdk.isNullOrUndefined(this.accDetails.nickName))
    {this.view.lblExternalAccountNickNameVal.text = this.accDetails.nickName;}
    else{
      this.view.lblExternalAccountNickNameVal.text = this.accDetails.accountName;
    }
    this.view.lblExternalAccountBankNameValue.text = this.accDetails.bankName;
    var accNo = this.accDetails.accountID;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxExternalAccountNumber.setVisibility(false);
    }
    else
    {
      this.view.lblExternalAccountNoValue.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxExternalAccountNumber.setVisibility(true);
    }
    var ibanNumber = this.accDetails.IBAN;
    if(kony.sdk.isNullOrUndefined(ibanNumber) || ibanNumber === '')
    {
      this.view.flxIBANExternalAcc.setVisibility(false);
    }
    else
    {
      this.view.lblIBANValueExternalAcc.text = forUtility.formatIBAN(ibanNumber);
      this.view.flxIBANExternalAcc.setVisibility(true);
    }
  },
  PopulateCheckingAccount:function()
  {
    var forUtility=applicationManager.getFormatUtilManager();
    this.view.lblAvailBal.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.availBal")+":";
    this.view.lblCurrBal.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.currBal")+":";
    this.view.lblPendingDeposit.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingDeposit")+":";
    this.view.lblPendingWithdraw.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingWithdrawal")+":";
    this.view.lblPaidOn.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.paidOn")+":";
    this.view.lblLastPaidInt.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.lastPaidInterest")+":";
    this.view.lblCreditInterestRate.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.creditIntRate")+":";
    this.view.lblPaidInterestYTD.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.paidInterest")+":";
    this.view.lblAccNum.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.accNumber")+":";
    this.view.lblRoutingNo.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.routingNumber")+":";
    this.view.lblSwiftCode.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.swiftCode")+":";
    this.view.lblAccHolder.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.customerName")+":";
    this.view.lblJointAccHolder.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointholder1")+":";
    this.view.lblJointAccountHolder2.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointholder2")+":";
    this.view.lblJointAccountHolder3.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointholder3")+":";
    this.view.lblJointAccountHolder4.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointholder4")+":";
    this.view.lblJointAccountHolder5.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointholder5")+":";
    this.view.lblOverdraftLimit.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.overdraftLimit")+":";
    this.view.lblBlockedAmount.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.blockedAmout")+":";
    
    this.view.flxJointAccHolder.isVisible = false;
    this.view.flxjointAccountHolder2.isVisible = false;
    this.view.flxJointAccountHolder3.isVisible = false;
    this.view.flxJointAccountHolder4.isVisible = false;
    this.view.flxJointAccountHolder5.isVisible = false;
    
	this.view.lblBankName.text = this.accDetails.bankName;
	if (this.accDetails.logoURL) {
                this.view.imgBank.src = this.accDetails.imgBank.src;
     }
    else {
                this.view.imgBank.src = "konybanklogo.png";
    }
    this.view.lblAvailBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.availableBalance,this.accDetails.currencyCode);
    this.view.lblCurrBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.currentBalance,this.accDetails.currencyCode);
    this.view.lblPendingDepValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.pendingDeposit,this.accDetails.currencyCode); 
    this.view.lblWithdrawValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.pendingWithdrawal,this.accDetails.currencyCode);
    this.view.lblBlockedAmountValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.blockedAmount,this.accDetails.currencyCode);
    this.view.lblOverdraftLimitValue.text= forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.transferLimit,this.accDetails.currencyCode);
    var dateobj=forUtility.getDateObjectfromString(this.accDetails.lastPaymentDate,"YYYY-MM-DD");
    this.view.lblPaidOnValue.text =  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    this.view.lblCreditInterestRateValue.text= this.accDetails.dividendRate + "%";
    if(! kony.sdk.isNullOrUndefined(this.accDetails.dividendLastPaidAmount)){
    if (this.accDetails.dividendLastPaidAmount.includes("|") || this.accDetails.dividendLastPaidAmount.includes(" ")) {
    var lastPaidInt = this.accDetails.dividendLastPaidAmount;
  	var lastPaidIntValue = "";
    if(lastPaidInt !== "" && lastPaidInt.indexOf("|")>0)  {
      lastPaidIntValue = lastPaidInt.split("|");
    } else {
      lastPaidIntValue = lastPaidInt.split(" ");
    this.view.lblLastPaidIntValue.text = forUtility.formatAmountandAppendCurrencySymbol(lastPaidIntValue[0], this.accDetails.currencyCode);
    	}  
    } else {
    this.view.lblLastPaidIntValue.text = forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.dividendLastPaidAmount,this.accDetails.currencyCode);
    }
    }else {
      this.view.lblLastPaidIntValue.text = "";
    }
    if(! kony.sdk.isNullOrUndefined(this.accDetails.dividendPaidYTD)){
    if (this.accDetails.dividendPaidYTD.includes("|") || this.accDetails.dividendPaidYTD.includes(" ") ) {
    var dividendPaid = this.accDetails.dividendPaidYTD;
    var paidDividendValue = "";
    if (dividendPaid !== "" && dividendPaid.indexOf("|") > 0) {
      paidDividendValue = dividendPaid.split("|");
    } else {
      paidDividendValue = dividendPaid.split(" ");
      this.view.lblPaidInterestYTDValue.text=forUtility.formatAmountandAppendCurrencySymbol(paidDividendValue[0],this.accDetails.currencyCode);
    }
    } else {
      this.view.lblPaidInterestYTDValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.dividendPaidYTD,this.accDetails.currencyCode);
    }
    }else{
      this.view.lblPaidInterestYTDValue.text = "";
    }
    this.view.lblAccTypeValue.text=this.accDetails.accountType;
    //this.view.lblAccHoldrValue.text=this.accDetails.accountHolder;
    var accJson1=JSON.parse(this.accDetails.accountHolder);
    this.view.lblAccHoldrValue.text=accJson1.fullname;
    var jointAccountHolders={};
    if(this.accDetails.jointHolders){
        jointAccountHolders=JSON.parse(this.accDetails.jointHolders);
        for(var i=0;i<jointAccountHolders.length;i++){
          switch(i){
            case 0:
              this.view.lblJointAccHoldrValue.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccHolder.isVisible = true;
              break;
            case 1:
              this.view.lblJointAccountHolderValue2.text=jointAccountHolders[i].fullname;
              this.view.flxjointAccountHolder2.isVisible = true;
              break;
            case 2:
              this.view.lblJointAccountHolderValue3.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolder3.isVisible = true;
              break;
            case 3:
              this.view.lblJointAccountHolderValue4.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolder4.isVisible = true;
              break;
            case 4:
              this.view.lblJointAccountHolderValue5.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolder5.isVisible = true;
          }
        }
    }
    this.view.lblAccNickNameVal.text=this.accDetails.nickName;
    var accNo= this.accDetails.accountID;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxAccountNumber.setVisibility(false);
    }
    else
    {
      this.view.lblAccNoValue.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxAccountNumber.setVisibility(true);
    }

    var configurationManager = applicationManager.getConfigurationManager();
	var region = configurationManager.getDeploymentGeography();
    if(region === "US")
    {
      this.view.flxIBAN.setVisibility(false);
      if(kony.sdk.isNullOrUndefined(this.accDetails.routingNumber) || this.accDetails.routingNumber === ''){
        this.view.lblRoutingNoValue.text = "";
      }
      else{
        this.view.lblRoutingNoValue.text = this.accDetails.routingNumber;
      } 
      this.view.flxRoutingNumber.setVisibility(true);
    }
    else
    {
      var ibanNumber = this.accDetails.IBAN;
      this.view.flxRoutingNumber.setVisibility(false);
      if(kony.sdk.isNullOrUndefined(ibanNumber) || ibanNumber === ''){
        this.view.lblIBANValue.text = "";
      }
      else{
        this.view.lblIBANValue.text = forUtility.formatIBAN(ibanNumber);
      }
      this.view.flxIBAN.setVisibility(true);
    }
    var swiftCode = this.accDetails.swiftCode;
    if(kony.sdk.isNullOrUndefined(swiftCode) || swiftCode === '')
    {
      this.view.flxSwiftCode.setVisibility(false);
    }
    else
    {
      this.view.lblSwiftCodeValue.text=swiftCode;
      this.view.flxSwiftCode.setVisibility(true);
    }
  },
  getJointHolderNames: function(jointHoldersList){
    var jntHldrList="";
    for(var jntHldrNum=0;jntHldrNum<jointHoldersList.length;jntHldrNum++){
      if(jntHldrList!=="")
        jntHldrList = jntHldrList+",";
      jntHldrList = jntHldrList+jointHoldersList[jntHldrNum]["fullname"];
    }
    return jntHldrList;
  },
    
  createViewForExternalAccountDetails: function() {
    this.view.flxExternalAccountContainer.setVisibility(true);
    this.view.flxContainerCheckingAcc.setVisibility(false);
    this.view.flxContainerCreditCard.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(false);
    this.view.btnCallBank.onClick = this.callBank;
    this.view.btnMsgBank.onClick = this.messageBank;
    this.populateExternalAccountDetail();
    this.view.forceLayout();
  },
  populateExternalAccountDetail: function() {
    var forUtility=applicationManager.getFormatUtilManager();
    var externalAccountDetails = this.accDetails.externalAccountDetails;
    var navMan = applicationManager.getNavigationManager();
    if(!kony.sdk.isNullOrUndefined(externalAccountDetails.NickName))
    {
      var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
      accountsDetails.selectedAccountData.nickName = externalAccountDetails.NickName;
      navMan.setCustomInfo("frmAccountDetails",accountsDetails);
      this.view.customHeader.lblLocateUs.text = externalAccountDetails.NickName;
      this.view.title=externalAccountDetails.NickName;
    }
    else
    {
      this.view.customHeader.lblLocateUs.text = externalAccountDetails.AccountName;
      this.view.title=externalAccountDetails.AccountName;
    }
    this.view.lblExternalAccountAvailBalValue.text = forUtility.formatAmountandAppendCurrencySymbol(externalAccountDetails.AvailableBalance);
    this.view.lblExternalAccountTypeValue.text = externalAccountDetails.TypeDescription;
    this.view.lblExternalAccountHoldrValue.text = externalAccountDetails.AccountHolder;
    this.view.lblExternalAccountNickNameVal.text = externalAccountDetails.NickName;
    this.view.lblExternalAccountBankNameValue.text = externalAccountDetails.BankName;
    var accNo = externalAccountDetails.Number;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxExternalAccountNumber.setVisibility(false);
    }
    else
    {
      this.view.lblExternalAccountNoValue.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxExternalAccountNumber.setVisibility(true);
    }
    var ibanNumber = this.accDetails.IBAN;
    if(kony.sdk.isNullOrUndefined(ibanNumber) || ibanNumber === '')
    {
      this.view.flxIBANExternalAcc.setVisibility(false);
    }
    else
    {
      this.view.lblIBANValueExternalAcc.text = forUtility.formatIBAN(ibanNumber);
      this.view.flxIBANExternalAcc.setVisibility(true);
    }
  },
  createViewForCreditCard: function() {
    this.view.flxContainerCheckingAcc.setVisibility(false);
    this.view.flxContainerCreditCard.setVisibility(true);
    this.view.flxExternalAccountContainer.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(false);
    this.populateCreditCardAccount();
    this.view.btnCallBankCC.onClick=this.callBank;
    this.view.btnMsgBankCC.onClick=this.messageBank;
    this.view.forceLayout();
  },
  populateCreditCardAccount:function()
  {
    var forUtility=applicationManager.getFormatUtilManager();
	this.view.lblBankNameCC.text = this.accDetails.bankName;
    if (this.accDetails.logoURL) {
                this.view.imgBankCC.src = this.accDetails.imgBank.src;
     }
    else {
                this.view.imgBankCC.src = "konybanklogo.png";
    }
    this.view.lblOutstandingBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.outstandingBalance,this.accDetails.currencyCode);
    this.view.lblUpcomingBalvalue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.currentAmountDue,this.accDetails.currencyCode);
    var dateobj=forUtility.getDateObjectfromString(this.accDetails.dueDate,"YYYY-MM-DD");
    this.view.lblDueDateValue.text=  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    this.view.lblCurrentBalanceValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.availableCredit,this.accDetails.currencyCode);
    this.view.lblCreditLmtValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.creditLimit,this.accDetails.currencyCode);
    this.view.lblRwdBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.availablePoints,this.accDetails.currencyCode);
    this.view.lblntRateValue.text=this.accDetails.interestRate + "%";
    this.view.lblLastStmtBalValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.lastStatementBalance,this.accDetails.currencyCode);
    this.view.lblMinDueAmntValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.minimumDue,this.accDetails.currencyCode);
    this.view.lblLastPmtAmntValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.lastPaymentAmount,this.accDetails.currencyCode);
    var dateobjLastDate=forUtility.getDateObjectfromString(this.accDetails.lastPaymentDate,"YYYY-MM-DD");
    this.view.lblLastPmtDateValue.text = forUtility.getFormatedDateString(dateobjLastDate,forUtility.getApplicationDateFormat());
    this.view.lblCardTypeValue.text=this.accDetails.displayName;
    var dateobj1=forUtility.getDateObjectfromString(this.accDetails.openingDate,"YYYY-MM-DD");
    this.view.lblCardIssueDateVal.text=  forUtility.getFormatedDateString(dateobj1,forUtility.getApplicationDateFormat());
    // this.view.lblCardHolderName.text=this.accDetails.accountHolder;
    var accJson=JSON.parse(this.accDetails.accountHolder);
    this.view.lblCardHolderNameVal.text=accJson.fullname;
    this.view.lblNickNameValue.text=this.accDetails.nickName;
    var accNo = this.accDetails.accountID;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxAccountNumberCC.setVisibility(false);
    }
    else
    {
      this.view.lblAccNoValueCC.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxAccountNumberCC.setVisibility(true);
    }
    var ibanNumber = this.accDetails.IBAN;
    if(kony.sdk.isNullOrUndefined(ibanNumber) || ibanNumber === '')
    {
      this.view.flxIBANAccDetail.setVisibility(false);
    }
    else
    {
      this.view.lblIBANValueAccDetail.text = forUtility.formatIBAN(ibanNumber);
      this.view.flxIBANAccDetail.setVisibility(true);
    }
  },
  createViewForHomeLoanAcc: function() {
    this.view.flxContainerCheckingAcc.setVisibility(false);
    this.view.flxContainerCreditCard.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(true);
    this.view.flxExternalAccountContainer.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(false);
    this.populateLoanAccount();
    this.view.btnCallBankHL.onClick=this.callBank;
    this.view.btnMsgBankHL.onClick=this.messageBank;
    this.view.forceLayout();
  },
  populateLoanAccount:function()
  {
    var forUtility=applicationManager.getFormatUtilManager();
	this.view.lblBankNameHL.text = this.accDetails.bankName;
    if (this.accDetails.logoURL) {
                this.view.imgBankHL.src = this.accDetails.imgBank.src;
     }
    else {
                this.view.imgBankHL.src = "konybanklogo.png";
    }
    
    if(kony.sdk.isNullOrUndefined(this.accDetails.outstandingBalance))
    {
       this.view.flxOutstandingBalance.setVisibility(false);
    }
    else
    {
       this.view.lblOutstandingBalVal.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.outstandingBalance,this.accDetails.currencyCode);
       this.view.flxOutstandingBalance.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(this.accDetails.originalAmount))
    {
       this.view.flxPrincipalAmount.setVisibility(false);
    }
    else
    {
      this.view.lblPrincipalAmtVal.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.originalAmount,this.accDetails.currencyCode);
      this.view.flxPrincipalAmount.setVisibility(true);
    }
    
    if(kony.sdk.isNullOrUndefined(this.accDetails.paymentDue))
    {
       this.view.flxTotalOverdue.setVisibility(false);
    }
    else
    {
     this.view.lblTotalOverdueValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.paymentDue,this.accDetails.currencyCode);
     this.view.flxTotalOverdue.setVisibility(true);
    }
    
              if (kony.sdk.isNullOrUndefined(this.accDetails.nextPaymentAmount)) {
                  this.view.flxCurrentOverdue.setVisibility(false);
              } else {
                  this.view.lblCurrentDueValue.text = forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.nextPaymentAmount, this.accDetails.currencyCode);
      this.view.flxCurrentOverdue.setVisibility(true);
    }
    
    if(kony.sdk.isNullOrUndefined(this.accDetails.nextPaymentDate))
    {
       this.view.flxDueDateBal.setVisibility(false);
    }
    else
    {
      var dateobj=forUtility.getDateObjectfromString(this.accDetails.nextPaymentDate,"YYYY-MM-DD");
      this.view.lblDueDateDetailValue.text=  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
      this.view.flxDueDateBal.setVisibility(true);
    }
   
    
    if(kony.sdk.isNullOrUndefined(this.accDetails.interestRate))
    {
       this.view.flxInterestRate.setVisibility(false);
    }
    else
    {
      this.view.lblInterestRateValue.text=this.accDetails.interestRate + "%";
      this.view.flxInterestRate.setVisibility(true);
    }
     if(kony.sdk.isNullOrUndefined(this.accDetails.interestPaidYTD))
    {
       this.view.flxInterestYTD.setVisibility(false);
    }
    else
    {
       this.view.lblInterestPaidValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.interestPaidYTD,this.accDetails.currencyCode);
       this.view.flxInterestYTD.setVisibility(true);
    }
    
              if (kony.sdk.isNullOrUndefined(this.accDetails.rePaymentFrequency)) {
       this.view.flxRepaymentFreq.setVisibility(false);
    }
    else
    {
       this.view.lblRepaymentFrequencyValue.text=this.accDetails.rePaymentFrequency;
      this.view.flxRepaymentFreq.setVisibility(true);
    }
    
      if(kony.sdk.isNullOrUndefined(this.accDetails.lastPaymentAmount))
    {
       this.view.flxLastPaymentAmt.setVisibility(false);
    }
    else
    {
       this.view.lblLastPmtAmtValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.lastPaymentAmount,this.accDetails.currencyCode);
      this.view.flxLastPaymentAmt.setVisibility(true);
    }
    
      if(kony.sdk.isNullOrUndefined(this.accDetails.lastPaymentDate))
    {
       this.view.flxLastPaymentDate.setVisibility(false);
    }
    else
    {
       var dateobj=forUtility.getDateObjectfromString(this.accDetails.lastPaymentDate,"YYYY-MM-DD");
      this.view.lblLastPmtDateValue.text=  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
      this.view.flxLastPaymentDate.setVisibility(true);
    }
    
      if(kony.sdk.isNullOrUndefined(this.accDetails.sanctionedAmount))
    {
       this.view.flxSanctionedAmount.setVisibility(false);
    }
    else
    {
       this.view.lblSanctionedAmountValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.sanctionedAmount,this.accDetails.currencyCode);
      this.view.flxSanctionedAmount.setVisibility(true);
    }
    
      if(kony.sdk.isNullOrUndefined(this.accDetails.sanctionedDate))
    {
       this.view.flxSanctionedDate.setVisibility(false);
    }
    else
    {
       var dateobj=forUtility.getDateObjectfromString(this.accDetails.sanctionedDate,"YYYY-MM-DD");
    this.view.lblSanctionedDateValue.text=  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());   
      this.view.flxSanctionedDate.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(this.accDetails.originalAmount))
    {
       this.view.flxPrincipalAmountInterest.setVisibility(false);
    }
    else
    {
       this.view.lblPrincipalAmountValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.originalAmount,this.accDetails.currencyCode);
      this.view.flxPrincipalAmountInterest.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(this.accDetails.maturityDate))
    {
       this.view.flxMaturityDate.setVisibility(false);
    }
    else
    {
      var dateobj=forUtility.getDateObjectfromString(this.accDetails.maturityDate,"YYYY-MM-DD");
      this.view.lblMaturityDateDetailValue.text=  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
      this.view.flxMaturityDate.setVisibility(true);
    }
  
    
    
    
    var accNo = this.accDetails.accountID;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxAccountNumberHL.setVisibility(false);
    }
    else
    {
      this.view.lblAccNoValueHL.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxAccountNumberHL.setVisibility(true);
    }
    this.view.lblAccTypeValHL.text=this.accDetails.accountType;
    this.view.lblRoutingNumberHLValue.text= this.accDetails.routingNumber;
    this.view.lblSwiftCodeValueHL.text= this.accDetails.swiftCode;
              var accName = JSON.parse(this.accDetails.accountHolder);
              if (!kony.sdk.isNullOrUndefined(accName))
              {
    this.view.lblCustomerNameValueHL.text=accName.fullname;
              this.view.flxAccountNumberHL.setVisibility(true);
              }
              else
              {
              this.view.flxAccountNumberHL.setVisibility(false);
              }
    var jointAccountHolders={};
    this.view.flxJointAccHolderHL1.isVisible = false;
    this.view.flxjointAccountHolderHL2.isVisible = false;
    this.view.flxJointAccountHolderHL3.isVisible = false;
    this.view.flxJointAccountHolderHL4.isVisible = false;
    this.view.flxJointAccountHolderHL5.isVisible = false;
    if(this.accDetails.jointHolders){
        jointAccountHolders=JSON.parse(this.accDetails.jointHolders);
        for(var i=0;i<jointAccountHolders.length;i++){
          switch(i){
            case 0:
              this.view.lblJointAccHoldrValueHL1.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccHolderHL1.isVisible = true;
              break;
            case 1:
              this.view.lblJointAccountHolderValueHL2.text=jointAccountHolders[i].fullname;
              this.view.flxjointAccountHolderHL2.isVisible = true;
              break;
            case 2:
              this.view.lblJointAccountHolderValueHL3.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolderHL3.isVisible = true;
              break;
            case 3:
              this.view.lblJointAccountHolderValueHL4.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolderHL4.isVisible = true;
              break;
            case 4:
              this.view.lblJointAccountHolderValueHL5.text=jointAccountHolders[i].fullname;
              this.view.flxJointAccountHolderHL5.isVisible = true;
          }
        }
    }
   
  },
  createViewForDepositAccount:function(){
    this.view.flxContainerCheckingAcc.setVisibility(false);
    this.view.flxContainerCreditCard.setVisibility(false);
    this.view.flxContainerHomeLoan.setVisibility(false);
    this.view.flxContainerDepositAccount.setVisibility(true);
    this.view.flxExternalAccountContainer.setVisibility(false);
    this.populateDepositAccount();
    this.view.btnCallBankDA.onClick=this.callBank;
    this.view.btnMsgBankDA.onClick=this.messageBank;
    this.view.forceLayout();
  },
  populateDepositAccount:function()
  {
    var forUtility=applicationManager.getFormatUtilManager();
    this.view.lblCurrBalDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.currBal")+":";
    this.view.lblInterestEarned.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.interestEarned")+":";
    this.view.lblMaturityAmt.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.maturityAmount")+":";
    this.view.lblMaturityDate.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.maturityDate")+":";
    this.view.lblCustomerNameDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.customerName")+":";
    this.view.lblDACustomerName.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.customerName")+":";
    this.view.lblMaturityOption.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.maturityOption")+":";
    this.view.lblDividentRate.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.creditIntRate")+":";
    this.view.lblPaidOnDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.paidOn")+":";
    this.view.lblDividentPaid.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.paidInterest")+":";
    this.view.lblSettlementAccount.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.settlementAccount")+":";
    this.view.lblAccNumDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.accNumber")+":";
    this.view.lbllAccHolderDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.primaryAccHolder")+":";
    this.view.lblJointAccHolderDA.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.jointAccHolder")+":";
    this.view.lblLastPaidInterest.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.lastPaidInterest")+":";
  this.view.blBankNameDA.text = this.accDetails.bankName;
  if(! kony.sdk.isNullOrUndefined(this.accDetails.dividendLastPaidAmount)){
    if (this.accDetails.dividendLastPaidAmount.includes("|") || this.accDetails.dividendLastPaidAmount.includes(" ")) {
    var lastPaidInt = this.accDetails.dividendLastPaidAmount;
  	var lastPaidIntValue = "";
    if(lastPaidInt !== "" && lastPaidInt.indexOf("|")>0)  {
      lastPaidIntValue = lastPaidInt.split("|");
    } else {
      lastPaidIntValue = lastPaidInt.split(" ");
      this.view.lblLastPaidInterestValue.text = forUtility.formatAmountandAppendCurrencySymbol(lastPaidIntValue[0], this.accDetails.currencyCode);
    	}  
    } else {
      this.view.lblLastPaidInterestValue.text = forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.dividendLastPaidAmount,this.accDetails.currencyCode);
    }
    }else {
      this.view.lblLastPaidInterestValue.text = "";
    }
    if (this.accDetails.logoURL) {
                this.view.imgBankLogo.src = this.accDetails.imgBank.src;
     }
    else {
                this.view.imgBankLogo.src = "konybanklogo.png";
    }
    this.view.lblAvailBalValueDA.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.availableBalance,this.accDetails.currencyCode);
    this.view.lblCurrBalValueDA.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.currentBalance,this.accDetails.currencyCode);
    this.view.lblInterestEarnedValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.interestEarned,this.accDetails.currencyCode);
    this.view.lblMaturityAmtValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.maturityAmount,this.accDetails.currencyCode);
    var dateobj=forUtility.getDateObjectfromString(this.accDetails.maturityDate,"YYYY-MM-DD");
    this.view.lblMaturityDateValue.text =  forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    var accJson1=JSON.parse(this.accDetails.accountHolder);
    this.view.lblCustomerNameValueDA.text=accJson1.fullname;
    this.view.lblDACustomerNameValue.text=accJson1.fullname;
    this.view.lblMaturityOptionValue.text=this.accDetails.maturityOption;
    this.view.lblSettlementAccountValue.text=this.accDetails.payoutAccount;
    this.view.lblDividentRateValue.text=this.accDetails.dividendRate + "%";
    this.view.lblDividentPaidValue.text=forUtility.formatAmountandAppendCurrencySymbol(this.accDetails.dividendPaidYTD,this.accDetails.currencyCode);
    var dateobj1=forUtility.getDateObjectfromString(this.accDetails.lastPaymentDate,"YYYY-MM-DD");
    this.view.lblPaidOnValueDA.text =  forUtility.getFormatedDateString(dateobj1,forUtility.getApplicationDateFormat());
    this.view.lblAccNoValueDA.text=applicationManager.getDataProcessorUtility().maskAccountNumber(this.accDetails.accountID);
    // this.view.lbllAccHolderValueDA.text=this.accDetails.accountHolder;
    var accJson=JSON.parse(this.accDetails.accountHolder);
    this.view.lbllAccHolderValueDA.text=accJson.fullname;
    if(this.accDetails.jointHolders){
      try{
      this.view.lblJointAccHolderValueDA.text=this.getJointHolderNamesDA(JSON.parse(this.accDetails.jointHolders));
      }
      catch(err){
        this.view.lblJointAccHolderValueDA.text=this.accDetails.jointHolders;
        }
    }
    else
      this.view.flxJointAccHolderDA.setVisibility(false);
    this.view.lblNickNameDAValue.text=this.accDetails.nickName;
    var accNo = this.accDetails.accountID;
    if(kony.sdk.isNullOrUndefined(accNo) || accNo === '')
    {
      this.view.flxAccountNumberDA.setVisibility(false);
    }
    else
    {
      this.view.lblAccNoValueDA.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accNo);
      this.view.flxAccountNumberDA.setVisibility(true);
    }
    var ibanNumber = this.accDetails.IBAN;
    if(kony.sdk.isNullOrUndefined(ibanNumber) || ibanNumber === '')
    {
      this.view.flxIBANDepositAccount.setVisibility(false);
    }
    else
    {
      this.view.lblIBANValueDepositAccount.text = forUtility.formatIBAN(ibanNumber);
      this.view.flxIBANDepositAccount.setVisibility(true);
    }
  },
  getJointHolderNamesDA: function(jointHoldersList){
    var jntHldrList="";
    for(var jntHldrNum=0;jntHldrNum<jointHoldersList.length;jntHldrNum++){
      if(jntHldrList!=="")
        jntHldrList = jntHldrList+",";
      jntHldrList = jntHldrList+jointHoldersList[jntHldrNum]["fullname"];
    }
    return jntHldrList;
  },
  flxAccNoToggleHLToggleOnClick: function() {
    if (this.view.imgAccNoToggleHL.src === "view.png") {
      this.view.imgAccNoToggleHL.src = "viewactive.png";
      this.view.lblAccNoValueHL.text = this.accDetails.accountID;
      this.view.flxAccountNumberHL.forceLayout();
    } else {
      this.view.imgAccNoToggleHL.src = "view.png";
      this.view.lblAccNoValueHL.text = applicationManager.getDataProcessorUtility().maskAccountNumber(this.accDetails.accountID);
      this.view.flxAccountNumberHL.forceLayout();
    }
  },
  flxAccNoToggleCCOnClick: function() {
    if (this.view.imgAccNoToggleCC.src === "view.png") {
      this.view.imgAccNoToggleCC.src = "viewactive.png";
      this.view.lblAccNoValueCC.text = this.accDetails.accountID;
      this.view.flxAccountNumberCC.forceLayout();
    } else {
      this.view.imgAccNoToggleCC.src = "view.png";
      this.view.lblAccNoValueCC.text = applicationManager.getDataProcessorUtility().maskAccountNumber(this.accDetails.accountID);
      this.view.flxAccountNumberCC.forceLayout();
    }
  },
  flxAccNoToggleOnClick: function() {
    if (this.view.imgAccNoToggle.src === "view.png") {
      this.view.imgAccNoToggle.src = "viewactive.png";
      this.view.lblAccNoValue.text = this.accDetails.accountID;
      this.view.flxAccountNumber.forceLayout();
    } else {
      this.view.imgAccNoToggle.src = "view.png";
      this.view.lblAccNoValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(this.accDetails.accountID);
      this.view.flxAccountNumber.forceLayout();
    }
  },
  flxRouteNoToggleOnClick: function() {
    if (this.view.imgRouteNoToggle.src === "view.png") {
      this.view.imgRouteNoToggle.src = "viewactive.png";
      this.view.lblRoutingNoValue.text = this.accDetails.routingNumber;
      this.view.flxRouteNoToggle.forceLayout();
    } else {
      this.view.imgRouteNoToggle.src = "view.png";
      this.view.lblRoutingNoValue.text = this.accDetails.routingNumber;
      this.view.flxRouteNoToggle.forceLayout();
    }
  },
  flxAccNoToggleDAOnClick:function(){
    if (this.view.imgAccNoToggleDA.src === "view.png") {
      this.view.imgAccNoToggleDA.src = "viewactive.png";
      this.view.lblAccNoValueDA.text = this.accDetails.accountID;
      this.view.flxAccNoToggleDA.forceLayout();
    } else {
      this.view.imgAccNoToggleDA.src = "view.png";
      this.view.lblAccNoValueDA.text = applicationManager.getDataProcessorUtility().maskAccountNumber(this.accDetails.accountID);
      this.view.flxAccNoToggleDA.forceLayout();
    }
  },
  customHeaderBtnRightOnClick: function() {
    if(applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet(
        {
          "title":null,
          "message":null,
          "showCompletionCallback": null
        }
      );
      applicationManager.actionSheetObject=actionSheetObject;
      var actionEditNickName = new kony.ui.ActionItem(
        {
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.editNickName"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.btnEditNickNameOnClick
        }
      );
      applicationManager.actionSheetObject=actionSheetObject;
      var actionRefresh = new kony.ui.ActionItem(
        {
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Accounts.refresh"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.refreshCallBack
        }
      );
      var actionDelete = new kony.ui.ActionItem(
        {
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.externalBank.DeleteAccount"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.deleteCallBack
        }
      );
      var actionCancel = new kony.ui.ActionItem(
        {
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel"),
          "style":constants.ACTION_ITEM_STYLE_CANCEL,
          "action": null
        }
      );
      if(this.accDetails.externalIndicator!== undefined && this.accDetails.externalIndicator === "true")
     {
       actionSheetObject.addAction(actionRefresh);
      actionSheetObject.addAction(actionDelete);
     }
      else
        {
      actionSheetObject.addAction(actionEditNickName);
        }
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }else{
      this.view.flxPopupNickName.setVisibility(true);
      this.view.flxHeader.setEnabled(false);
      this.view.flxContainerCheckingAcc.setEnabled(false);
      this.view.flxContainerCreditCard.setEnabled(false);
      this.view.flxContainerHomeLoan.setEnabled(false);
      this.view.flxContainerDepositAccount.setEnabled(false);
                  this.view.flxInformation.setEnabled(false);                
                  if (this.accDetails.externalIndicator !== undefined && this.accDetails.externalIndicator === "true") {
           this.view.btnDelete.setVisibility(true);
           //Refresh functionality for external accounts is disabled to be in sync with OLB
         //  this.view.btnRefresh.setVisibility(true);
           this.view.btnRefresh.setVisibility(false);
           this.view.btnEditNickName.setVisibility(false);
          this.view.flxPopupContainer.height="150dp";
         }
      else
        {
          
           this.view.btnDelete.setVisibility(false);
           this.view.btnRefresh.setVisibility(false);
           this.view.btnEditNickName.setVisibility(true);
           this.view.flxPopupContainer.height="100dp";
        }
    }
  },
  refreshCallBack: function(){
          applicationManager.getPresentationUtility().showLoadingScreen();
          var bank =this.accDetails.accountID.split("-")[0];
        //  var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
    	  var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "ExternalAccountsUIModule", "appName": "AccAggregationMA"});
          externalAccountMod.presentationController.refreshConsent(bank);
    },
  deleteCallBack: function() {
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.externalAccounts.deleteAccountAlert"),
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),

      "alertHandler": this.deleteConnection
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});

  },
  deleteConnection:function(response)
  {
    if(response===true)
    {
       applicationManager.getPresentationUtility().showLoadingScreen();
      var bank =this.accDetails.accountID.split("-")[0];
   //   var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
      var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "ExternalAccountsUIModule", "appName": "AccAggregationMA"});
      externalAccountMod.presentationController.deleteConnection(bank);
    }
  },
  btnCancelOnClick:function(){
    this.view.flxPopupNickName.setVisibility(false);
    this.view.flxHeader.setEnabled(true);
              this.view.flxInformation.setEnabled(true);
              // this.view.flxContainerCheckingAcc.setEnabled(true);
              //this.view.flxContainerCreditCard.setEnabled(true);
              //this.view.flxContainerHomeLoan.setEnabled(true);
              //this.view.flxContainerDepositAccount.setEnabled(true);
    // this.view.flxFooter.setEnabled(true);
  },
  goToTerms: function(){
      var params={
       bankCode :this.accDetails.bankCode,
       type :"reauthenticateConnection"
     };
//         var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthModule');
//         authModule.presentationController.launchExternalBankLogin(selectedItem);
         var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
         externalAccountMod.presentationController.getTermsAndConditions(params);
    
  },
  btnEditNickNameOnClick:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan=applicationManager.getNavigationManager();
    var isExternal = this.accDetails.type === "external" ? true : false ;
    if(isExternal) {
      var accountDetails = applicationManager.getAccountManager().getInternalAccountByID(this.accDetails.accountID);
      var nickName=accountDetails.nickName;
      //navMan.setCustomInfo("frmAccInfoEdit", this.accDetails.externalAccountDetails.NickName);
      navMan.setCustomInfo("frmAccInfoEdit", nickName);
    }
    else {
      var accountDetails = applicationManager.getAccountManager().getInternalAccountByID(this.accDetails.accountID);
      var nickName=accountDetails.nickName;
     // navMan.setCustomInfo("frmAccInfoEdit",this.accDetails.nickName);
     navMan.setCustomInfo("frmAccInfoEdit", nickName);
    }
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
    accountMod.presentationController.commonFunctionForNavigation("frmAccInfoEdit");
  },
  flxBackOnClick:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  callBank:function()
  {
       var configManager = applicationManager.getConfigurationManager();
      if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS))
        {      
     const isRegionalTransferMAPresent=  configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);  
    applicationManager.getPresentationUtility().showLoadingScreen();
    var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AboutUsMA",
                    "moduleName": "InformationUIModule"
                });
    infoCall.presentationController.onClickCallUs();
        }
  },
  showDial: function (phoneNumber) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.phone.dial(phoneNumber);
  },
  messageBank:function()
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("messageCategory","frmAccountInfo");
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesModule");
    messagesMod.presentationController.getCategories();
  }
  };
});
