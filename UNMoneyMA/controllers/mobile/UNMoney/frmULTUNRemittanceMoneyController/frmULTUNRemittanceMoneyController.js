define({ 
    

 //Type your controller code here 
 frmULTUNSendMoneyPreShow: function () {
    var dataAfRecv = null;
     this.clearDataRemittance();
    this.view.flxDataReviewMain.setVisibility(false);
    this.view.flxOtpMain.setVisibility(false);
    this.view.flxAlertsMain.setVisibility(false);
    this.view.flxConfermMain.setVisibility(false);
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxMainContainer.setEnabled(true);
    this.view.btnRemittance.onClick = this.onUNRemittanceData;
    this.view.btnCancel.onClick = this.onUNCancel;
    this.view.btnRecReviewTitleClose.onClick = this.onUNCancel;
    this.view.btnOtpCancel.onClick = this.onUNOtpCancel;
    this.view.btnConfirm.onClick = this.onUNApprovRemittance;
    this.view.btnOtpConfirm.onClick = this.onUNOtpApprovRemittance;
    this.view.btnAlertsCancle.onClick = this.UNunShowAlertsSendData;
    this.view.btnAlertsTitelClose.onClick = this.UNunShowAlertsSendData;
    this.view.btnOtpTitelClose.onClick = this.UNunShowAlertsSendData;
    this.view.btnConfermOK.onClick = this.UNConfermClose;

    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;


    this.view.txtSenderName.onTextChange =  this.onSenderNameChange;

    this.view.txtUNID.onTextChange =  this.enableRemittanceButton;
    this.view.txtAmount.onTextChange =  this.enableRemittanceButton;

    this.view.flxShowOtp.onTouchEnd= this.onShowOtp;

    this.view.btnTestRex.onClick = this.onTest;

//to lood accounts data and fill in seg
    var navManager = applicationManager.getNavigationManager();
    var custominfoInt = navManager.getCustomInfo("frmDashboard");
    const userPrefManager = applicationManager.getUserPreferencesManager();
    const userName = userPrefManager.getUserName();
    this.onCallAccountData(userName);
    //this.setDataTosegAccounts(custominfoInt);
    this.view.flxUNAccounts.onTouchEnd= this.onUNAccounts;
    
 },
 

onUNRemittanceData: function(){
    
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.UNRemittanceData();
},

 UNRemittanceData: function(){
    
    serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMonyReciveRemittance";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["creditAccountIdz"] = this.view.lblUNAccountsID.text;
    data["remNoz"] = this.view.txtUNID.text;
    data["debitAmount"] = this.view.txtAmount.text;
    //data["entredName"] = this.view.txtSenderName.text;
    
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
        // code for success call back
        dataAfRecv = res;
        this.UNafterRemittanceData(res);
         
       
    }
    function operationFailure(res){
        // code for failure call back
       try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        // Check if the response contains error details and display an appropriate alert
        if (res && res.error && res.error.errorDetails && res.error.errorDetails.length > 0) {
            //alert( res.error.errorDetails[0].message);
            this.UNShowAlertsSendData(res.error.errorDetails[0].message);
        } else {
            //alert("Error on transfer: An unknown error occurred.");
            this.UNShowAlertsSendData("هناك مشكلة في الشبكة الموحده");
        }
    } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        alert("Error on transfer: Unable to process the error details.");
        console.error("Error in operationFailure function: ", error);
    }
    }
        
    },


     UNafterRemittanceData: function(datarec){
        this.UNFullDataToReview(datarec);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.flxDataReviewMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },

     UNFullDataToReview: function(datarec){
        this.view.lblIDValue.text = datarec.body.remNo;
        this.view.lblAccountValue.text = datarec.body.creditAccountId + " - " + datarec.body.debitCurrency;
        this.view.lblSendNameValue.text = datarec.body.senderName;
        this.view.lblRecNameValue.text = datarec.body.recName;
        this.view.lblAmountValue.text = datarec.body.debitAmount;
        this.view.lblAmountText.text = datarec.body.debitCurrency;
        this.view.lblDateValue.text = datarec.body.debitValueDate;
     },

    onUNCancel: function(){
        
        this.afterUNCancel();
    },
     onUNOtpCancel: function(){
        
        this.view.flxOtpMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        this.view.txtOtpNumber.text="";

    },
    

    


    afterUNCancel: function(){
       
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
      
        
    },

    ///ApprovRemittance
    onUNApprovRemittance: function(){
        
        //applicationManager.getPresentationUtility().showLoadingScreen();
        //this.UNApprovRemittance();
        //this.view.flxDataReviewMain.setVisibility(false);
        this.view.imgViewOtp.src = "view.png";
        this.view.txtOtpNumber.secureTextEntry = true;
        this.view.flxOtpMain.setVisibility(true);
        this.view.flxDataReviewMain.setVisibility(false);
        //this.view.flxDataReviewMain.setEnabled(false);
    },

//to conform after Otp
    onUNOtpApprovRemittance: function(){
        
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.UNApprovRemittance();
        //this.view.flxDataReviewMain.setVisibility(false);
        
    },

    UNApprovRemittance: function(){
        var scopeObj = dataAfRecv;
        serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMonyApprovRecivRemittance";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["recordid"] = scopeObj.header.id;
    data["otp"] = this.view.txtOtpNumber.text;

    
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
        // code for success call back
        this.afterUNApprovRemittance();
         
       
    }
    function operationFailure(res){
        // code for failure call back
        //this.view.flxMainContainer.setEnabled(true);
        try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        // Check if the response contains error details and display an appropriate alert
        if (res && res.error && res.error.errorDetails && res.error.errorDetails.length > 0) {
            //alert( res.error.errorDetails[0].message);
            this.UNShowAlertsSendData(res.error.errorDetails[0].message);
        } else {
           // alert("Error on transfer: An unknown error occurred.");
            this.UNShowAlertsSendData("هناك مشكلة في الشبكة الموحده");
        }
    } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        alert("Error on transfer: Unable to process the error details.");
        console.error("Error in operationFailure function: ", error);
    }
    }

    },


    afterUNApprovRemittance: function(){
        this.clearDataRemittance();
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxOtpMain.setVisibility(false);
        this.view.flxConfermMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        //alert("تم اجراء عملية الإستلام بنجاح");
    },


    //to cleer data from send form

    clearDataRemittance : function()
    {
        this.view.txtAmount.text= "";
        this.view.txtUNID.text="";
        this.view.lblAccCurrency.setVisibility(false);
        this.view.lblUNAccounts.text= "إختر الحساب للسحب اليه";
        this.view.flxSegAccounts.setVisibility(false);
        this.view.txtOtpNumber.text="";
        this.view.flxMainContainer.setEnabled(true);
        this.enableRemittanceButton();

    },


   
   onTest: function()
   {
    //const userName = userPrefManager.getUserName();
    var navManager = applicationManager.getNavigationManager();
    var custominfoInt = navManager.getCustomInfo("frmDashboard");
    this.setDataTosegAccounts(custominfoInt);
    this.showOrHideSegAccounts();
    //var recName = this.view.txtUNName.text;
    //this.validateFullName(recName);
   },

   onUNAccounts: function()
   {
    //const userName = userPrefManager.getUserName();
    //var navManager = applicationManager.getNavigationManager();
    //var custominfoInt = navManager.getCustomInfo("frmDashboard");
    //this.setDataTosegAccounts(custominfoInt);
    this.showOrHideSegAccounts();
    //var recName = this.view.txtUNName.text;
    //this.validateFullName(recName);
   },

   



//start account data to seg

onCallAccountData: function(usernamedata){
       
        serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "getAccountInfo";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["customerid"] = usernamedata;
    
    
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
        // code for success call back
        
        this.setDataTosegAccounts(res);
       // this.afterUNApprovRemittance(res);
         
       
    }
    function operationFailure(res){
        // code for failure call back
        this.view.flxMainContainer.setEnabled(true);
        try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        // Check if the response contains error details and display an appropriate alert
        if (res && res.error && res.error.errorDetails && res.error.errorDetails.length > 0) {
            //alert( res.error.errorDetails[0].message);
            this.UNShowAlertsSendData(res.error.errorDetails[0].message);
        } else {
            this.UNShowAlertsSendData("هناك مشكلة في جلب الحسابات");
           // alert("هناك مشكلة في الشبكة الموحده");
        }
    } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        alert("Error on transfer: Unable to process the error details.");
        console.error("Error in operationFailure function: ", error);
    }
    }

    },

setDataTosegAccounts: function(accountdataa){
        var scopeObj = this;
        var segDataRegion = [];
        var storeDataRegion;
        for (var i = 0; i < accountdataa.body.length; i++) {
          var fullNickName = accountdataa.body[i].productName.replace(/[^\u0600-\u06FF\s]/g, '').trim();//.match(/[\u0600-\u06FF\s]+/g)?.join("").trim(); // "حساب جاري"

            // Extract the part after the first space
            var nickName = fullNickName.split(" ")[1];
            var accountfillNum = nickName + " \u200F- " + 
                 accountdataa.body[i].currency + " \u200F- " + 
                 accountdataa.body[i].accountId;
            storeDataRegion = {
              accountNum: accountdataa.body[i].accountId,
              accountCurrency: accountdataa.body[i].currency,
              fillAccountName:accountfillNum,
            };
            segDataRegion.push(storeDataRegion);
        }
        this.view.segUNAccount.widgetDataMap = {
            "flxSegAccount": "flxSegAccount",
            "lblSegAccounts": "accountNum",
            "lblSegCurrency": "accountCurrency",
            "lblSegFillName": "fillAccountName"
        };
        this.view.segUNAccount.setData(segDataRegion);
        this.view.segUNAccount.onRowClick = function() {
                scopeObj.segAccountsonRowClick();
            }
      },

    segAccountsonRowClick :function(){
        this.view.lblUNAccountsID.text = this.view.segUNAccount.selectedRowItems[0].accountNum;
        this.view.lblUNAccounts.text = this.view.segUNAccount.selectedRowItems[0].fillAccountName;
        this.view.lblAccCurrency.setVisibility(false);
        this.view.lblAccCurrency.text = this.view.segUNAccount.selectedRowItems[0].accountCurrency;
        this.showOrHideSegAccounts();
        this.enableRemittanceButton();
        // const navManager = applicationManager.getNavigationManager();
    		// this.previousData.legalEntityName = this.view.lblLegalEntity.text;
        // navManager.setCustomInfo("frmForgot", this.previousData);
         
        // this.setContinueButtonEnableState();
        // this.extractEntityIDfromName(this.view.lblLegalEntity.text);
      },

      showOrHideSegAccounts: function(){
        if(this.view.flxSegAccounts.isVisible){
          this.view.flxSegAccounts.setVisibility(false);
        }
        else{
          this.view.flxSegAccounts.setVisibility(true);
        }
      },
//end account to seg


//to validate full name 
onSenderNameChange: function()
   {
    var senderName = this.view.txtSenderName.text;
    this.validateFullName(senderName);
   },

    validateFullName: function(senderName) {
    const fullName = senderName; // Get input and trim whitespace
    
    // Regular expression to validate 4 Arabic words
    const arabicFullNameRegex = /^(?:[\u0621-\u064A]+(?:\s+|$)){4,5}$/;

    // Test the input against the regex
    if (arabicFullNameRegex.test(fullName)) {
       // alert("الاسم صحيح"); // Valid full name
       this.view.flxSenderNameErrorMess.setVisibility(false);
        this.view.txtSenderName.focusSkin = "CopydefTextBoxFocus0a04d54150dfd4a";
        this.view.txtSenderName.skin = "CopydefTextBoxNormal0j8e7db626d3341";
    } else {
        this.view.flxSenderNameErrorMess.setVisibility(true);
        this.view.txtSenderName.focusSkin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        this.view.txtSenderName.skin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        //alert("يرجى إدخال الاسم الرباعي باللغة العربية فقط (4 كلمات)"); // Invalid full name
    }
},

//end validate Full Name


 UNShowAlertsSendData: function(errmess){
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.lblAlertsData.text = errmess;
        this.view.flxAlertsMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        this.view.flxDataReviewMain.setEnabled(false);
        this.view.flxOtpMain.setEnabled(false);
        this.view.flxConfermMain.setEnabled(false);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },

     UNunShowAlertsSendData: function(){
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.txtOtpNumber.text="";
        this.view.flxAlertsMain.setVisibility(false);
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxOtpMain.setVisibility(false);
        this.view.flxConfermMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        this.view.flxDataReviewMain.setEnabled(true);
        this.view.flxOtpMain.setEnabled(true);
        this.view.flxConfermMain.setEnabled(true);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },

      UNConfermClose: function(){
        this.clearDataRemittance();
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.txtOtpNumber.text="";
        this.view.flxAlertsMain.setVisibility(false);
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxOtpMain.setVisibility(false);
        this.view.flxConfermMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },


     enableRemittanceButton: function(){        
      
      if(this.view.txtUNID.text!=='' && this.view.txtUNID.text!==null && this.view.txtUNID.text!==undefined && this.view.txtAmount.text!=='' && this.view.txtAmount.text!==null && this.view.txtAmount.text!==undefined && this.view.lblUNAccounts.text !== "إختر الحساب للسحب اليه" ){
        this.view.btnRemittance.setEnabled(true);
        this.view.btnRemittance.skin = "sknBtn0095e426pxEnabled";
      } else {
        this.view.btnRemittance.setEnabled(false);
        this.view.btnRemittance.skin = "sknBtna0a0a0SSPReg26px";
      }
    },

    flxBackOnClick: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNMoneyTypes");
        ntf.navigate();
      } catch (er) {}
    },


    onShowOtp: function() {
      if (this.view.imgViewOtp.src === "view.png") {
        this.view.imgViewOtp.src = "icon_hide.png";
        this.view.txtOtpNumber.secureTextEntry = false;
        this.view.flxOtp.forceLayout();
      } else {
        this.view.imgViewOtp.src = "view.png";
        this.view.txtOtpNumber.secureTextEntry = true;
        this.view.flxOtp.forceLayout();
      }
    },



 });