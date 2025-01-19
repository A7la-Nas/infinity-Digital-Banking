define({ 
    

 //Type your controller code here 
 frmULTUNSendMoneyPreShow: function () {
    var dataAfSend = null;
    var dataafApprov = null;

     this.clearDataSend();
    this.view.flxDataReviewMain.setVisibility(false);
    this.view.flxAcknowledgementMain.setVisibility(false);
    this.view.flxAlertsMain.setVisibility(false);
    this.view.flxContactsAccessMain.setVisibility(false);
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxMainContainer.setEnabled(true);
    this.view.btnContacts.onClick = this.openContacts;
    this.view.btnSend.onClick = this.onUNSendData;
    this.view.btnCancel.onClick = this.onUNCancel;
    this.view.btnRevTitleClose.onClick = this.onUNCancel;
    this.view.btnConfirm.onClick = this.onUNApprovRemittance;
    this.view.btnTestRex.onClick = this.onTest;
    this.view.txtUNName.onTextChange = this.onRecNameChange.bind(this);
    this.view.txtPhonNumber.onTextChange = this.onPhoneNumberchange;
    this.view.txtAmount.onTextChange = this.enableSendButton;
    this.view.btnAlertsTitelClose.onClick = this.UNunShowAlertsSendData;
    this.view.btnAlertsCancle.onClick = this.UNunShowAlertsSendData;
    this.view.btnAcknowTitleClose.onClick=this.onUNAcknowledgementClose;

    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;

    this.view.flxContactsBack.onClick = this.onflxContactsBack;
     this.view.segContacts.onRowClick = this.segContactsonRowClick;

    this.view.btnAcknowledgementHome.onClick= this.onAcknowledgementHome;
    this.view.btnAcknowledgementNew.onClick= this.onAcknowledgementNew;

//to lood accounts data and fill in seg
    var configManager = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    var custominfoInt = navManager.getCustomInfo("frmDashboard");
    let loginData = navManager.getCustomInfo("frmLogin");
    var userNameDetails = applicationManager.getStorageManager().getStoredItem("maskUserName");
    const userPrefManager = applicationManager.getUserPreferencesManager();
    const userName = userPrefManager.getUserName();
    this.onCallAccountData(userName);
    //this.setDataTosegAccounts(custominfoInt);
    this.view.flxUNAccounts.onTouchEnd= this.onUNAccounts;
    
 },

 onAcknowledgementHome: function() {
      try {
       var self = this;
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();
      } catch (er) {}
    },
    onAcknowledgementNew: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTNetworkTransfers");
        ntf.navigate();
      } catch (er) {}
    },
 openContacts: function() {
    try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.txtContactsSearch.text = '';
       var data = kony.contact.find("*", true);
    this.contactsList = data;
    this.contactsListBackup = data;
    this.setChooseFromContactsActions("phone");
    this.setChooseFromContactsSegmentData(data, "phone");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.flxContactsAccessMain.setVisibility(true);
    } catch (err) {
        kony.print("Exception occurred: " + err.message);
        alert("عذرا ، ستم انزال هذه الميزه قريبا .");
    }
},

onUNSendData: function(){
    
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.UNSendData();
},

 UNSendData: function(){
    
    serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMSendRemittanceWithOutApprov";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["debitAccountId"] = this.view.lblAccountID.text;
    data["debitCurrency"] = this.view.lblAccCurrency.text;
    data["debitAmount"] = this.view.txtAmount.text;
    data["recPhoneNo"] = this.view.txtPhonNumber.text;
    data["recName"] = this.view.txtUNName.text;
    data["purpose"] = this.view.txtNotes;
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
        // code for success call back
        dataAfSend = res;
        this.UNafterSendData(res);
         
       
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
           // alert("Error on transfer: An unknown error occurred.");
            this.UNShowAlertsSendData("Error on transfer: An unknown error occurred.");
        }
    } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        alert("Error on transfer: Unable to process the error details.");
        console.error("Error in operationFailure function: ", error);
    }
    }
        
    },


     UNafterSendData: function(datarec){
        this.UNFullDataToReview(datarec);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.flxDataReviewMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },


     UNShowAlertsSendData: function(errmess){
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.lblAlertsData.text = errmess;
        this.view.flxAlertsMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        this.view.flxDataReviewMain.setEnabled(false);
        this.view.flxAcknowledgementMain.setEnabled(false);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },

     UNunShowAlertsSendData: function(){
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        
        this.view.flxAlertsMain.setVisibility(false);
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxAcknowledgementMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        this.view.flxDataReviewMain.setEnabled(true);
        this.view.flxAcknowledgementMain.setEnabled(true);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },


     onUNAcknowledgementClose: function(){
        
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.clearDataSend();
        this.view.flxAlertsMain.setVisibility(false);
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxAcknowledgementMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        // alert("تم عمل التحويل بنجاح");
        //this.view.flxDataReviewMain.setVisibility(true);

     },

     UNFullDataToReview: function(datarec){
        this.view.lblAccountValue.text = datarec.body.debitAccountId + " - " + datarec.body.debitCurrency;
        this.view.lblRecNameValue.text = datarec.body.recName;
        this.view.lblRecPhoneValue.text = datarec.body.recPhoneNo;
        this.view.lblAmountValue.text = datarec.body.debitAmount + " - "+datarec.body.debitCurrency;
        var commissionAmounts = datarec.body.commissionAmounts;
        var commission1 = parseFloat(commissionAmounts[0].commissionAmount.replace(/[^\d.-]/g, ''));
        var commission2 = parseFloat(commissionAmounts[1].commissionAmount.replace(/[^\d.-]/g, ''));
        var totalCommission = commission1 + commission2;
        var formattedTotalCommission = totalCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.view.lblCommissionAmountValue.text = formattedTotalCommission + " - " + datarec.body.debitCurrency;
         var commissionAmount = parseFloat(totalCommission); // Remove currency symbols or text
        var debitAmount = parseFloat(datarec.body.debitAmount);
        
         // Calculate total and update lblTotalValue
         var totalAmount = commissionAmount + debitAmount;
         totalAmount = parseFloat(totalAmount.toFixed(2));
         var formattedTotalAmount = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.view.lblTotalValue.text = formattedTotalAmount;
        this.view.lblTotalText.text= datarec.body.debitCurrency;
     },

    onUNCancel: function(){
       // applicationManager.getPresentationUtility().showLoadingScreen();
        //this.UNCancel();
        //this.view.flxDataReviewMain.setVisibility(false);
        this.afterUNCancel();
    },

    // UNCancel: function(){
    //     var scopeObj = dataAfSend;
    //     serviceName = "UNMoneyService";
    // integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    // operationName =  "UnMonyCancelRemeitince";
    // //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    // data = {};
    
    // data["recordId"] = scopeObj.header.id;
    
    // headers= {};
    // integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    // function operationSuccess(res){
    //     // code for success call back
    //     this.afterUNCancel();
         
       
    // }
    // function operationFailure(res){
    //     // code for failure call back 
    //     this.view.flxMainContainer.setEnabled(true);
    //     try {
    //     applicationManager.getPresentationUtility().dismissLoadingScreen();

    //     // Check if the response contains error details and display an appropriate alert
    //     if (res && res.error && res.error.errorDetails && res.error.errorDetails.length > 0) {
    //         alert( res.error.errorDetails[0].message);
            
    //     } else {
    //         alert("Error on transfer: An unknown error occurred.");
    //     }
    // } catch (error) {
    //     applicationManager.getPresentationUtility().dismissLoadingScreen();
    //     alert("Error on transfer: Unable to process the error details.");
    //     console.error("Error in operationFailure function: ", error);
    // }
       
    // }

    // },


    afterUNCancel: function(){
       
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        //applicationManager.getPresentationUtility().dismissLoadingScreen();
        
    },

    ///ApprovRemittance
    onUNApprovRemittance: function(){
        
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.UNApprovRemittance();
        //this.view.flxDataReviewMain.setVisibility(false);
    },

    UNApprovRemittance: function(){
        var scopeObj = dataAfSend;
        serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMSendRemittanceWithApprov";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["debitAccountId"] = scopeObj.body.debitAccountId;
    data["debitCurrency"] = scopeObj.body.debitCurrency;
    data["debitAmount"] = scopeObj.body.debitAmount;
    data["recPhoneNo"] = scopeObj.body.recPhoneNo;
    data["recName"] = scopeObj.body.recName;
    data["purpose"] = scopeObj.body.purpose;
    
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
        // code for success call back
         dataafApprov =res;
        this.UNApprovRemittanceGetID();
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
            this.UNShowAlertsSendData("هناك مشكلة في الشبكة الموحده");
           // alert("هناك مشكلة في الشبكة الموحده");
        }
    } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        alert("Error on transfer: Unable to process the error details.");
        console.error("Error in operationFailure function: ", error);
    }
    }

    },

    UNApprovRemittanceGetID: function(){
        var scopeObj = dataafApprov;
        serviceName = "UNMoneyService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

    operationName =  "UnMonyGetRemittanceNo";
    //data= {"debitAccountId": "<place-holder>","debitCurrency": "<place-holder>","debitAmount": "<place-holder>","recPhoneNo": "<place-holder>","recName": "<place-holder>","purpose": "<place-holder>"};
    data = {};
    
    data["remNo"] = scopeObj.header.id;
    
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess.bind(this), operationFailure.bind(this));
    
    function operationSuccess(res){
       
        this.afterUNApprovRemittanceGetID(res);
        this.afterUNApprovRemittance(dataafApprov);
       // alert("okkkkkkkkkk");
         
       
    }
    function operationFailure(res){
        // code for failure call back
        //this.view.flxMainContainer.setEnabled(true);
        try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        // Check if the response contains error details and display an appropriate alert
        if (res && res.error  && res.error > 0) {
            //alert( res.error.message);
            this.UNShowAlertsSendData(res.error.message);
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

    afterUNApprovRemittanceGetID: function(dataID){
        this.view.lblAcknowledgementIDValue.text=dataID.body[0].remNumber;
    },

    afterUNApprovRemittance: function(res){
        this.UNFullDataToAcknowledgement(res);
        this.clearDataSend();
        this.view.flxDataReviewMain.setVisibility(false);
        this.view.flxAcknowledgementMain.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        //alert("تم اجراء عملية التحويل بنجاح");
    },

     UNFullDataToAcknowledgement: function(datarec){
        this.view.lblAcknowledgementAccountValue.text = datarec.body.debitAccountId + " - " + datarec.body.debitCurrency;
        this.view.lblAcknowledgementRecNameValue.text = datarec.body.recName;
        this.view.lblAcknowledgementRecPhoneValue.text = datarec.body.recPhoneNo;
        this.view.lblAcknowledgementDateValue.text = datarec.body.debitValueDate;
        var commissionAmounts = datarec.body.commissionAmounts;
        var commission1 = parseFloat(commissionAmounts[0].commissionAmount.replace(/[^\d.-]/g, ''));
        var commission2 = parseFloat(commissionAmounts[1].commissionAmount.replace(/[^\d.-]/g, ''));
        var totalCommission = commission1 + commission2;
        this.view.lblAcknowledgementCommissionAmountValue.text = totalCommission + " - " + datarec.body.debitCurrency;
        var commissionAmount = parseFloat(totalCommission); // Remove currency symbols or text
        var debitAmount = parseFloat(datarec.body.debitAmount);
    
         // Calculate total and update lblTotalValue
         var totalAmount = commissionAmount + debitAmount;
        this.view.lblAcknowledgementTotalValue.text = totalAmount;
        this.view.lblAcknowledgementTotalText.text = datarec.body.debitCurrency;
        
     },

    //to cleer data from send form

    clearDataSend : function()
    {
        this.view.txtAmount.text= "";
        this.view.txtPhonNumber.text ="";
        this.view.txtUNName.text="";
        this.view.txtNotes.text ="";
        this.view.lblAccCurrency.setVisibility(false);
        this.view.lblUNMoney.text= "إختر الحساب المحول منه";
        this.view.flxSegAccounts.setVisibility(false);
        this.enableSendButton();

    },


   //to check if the name is 4 

   onRecNameChange: function()
   {
    var recName = this.view.txtUNName.text;
    this.validateFullName(recName);
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
    
    this.showOrHideSegAccounts();
    
   },

    validateFullName: function(recName) {
    const fullName = recName; // Get input and trim whitespace
    
    // Regular expression to validate 4 Arabic words
    const arabicFullNameRegex = /^(?:[\u0621-\u064A]+(?:\s+|$)){4,5}$/;

    // Test the input against the regex
    if (arabicFullNameRegex.test(fullName)) {
       // alert("الاسم صحيح"); // Valid full name
       this.view.flxNameErrorMess.setVisibility(false);
        this.view.txtUNName.focusSkin = "CopydefTextBoxFocus0a04d54150dfd4a";
        this.view.txtUNName.skin = "CopydefTextBoxNormal0j8e7db626d3341";
        this.enableSendButton();
    } else {
        this.view.flxNameErrorMess.setVisibility(true);
        this.view.txtUNName.focusSkin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        this.view.txtUNName.skin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        this.enableSendButton();
        //alert("يرجى إدخال الاسم الرباعي باللغة العربية فقط (4 كلمات)"); // Invalid full name
    }
},

//end check 4 name

//start check phone number

 onPhoneNumberchange: function()
   {
    var recPhoneNumber = this.view.txtPhonNumber.text;
    this.validatePhoneNumber(recPhoneNumber);
   },

validatePhoneNumber: function(phonenumb) {
    const phoneNumber = phonenumb; // Get input and trim whitespace

    // Regular expression to validate 9 digits starting with "7"
    const phoneRegex = /^(77|73|71|70|78)\d{7}$/;

    // Test the input against the regex
    if (phoneRegex.test(phoneNumber)) {
        this.view.flxPhoneErrorMess.setVisibility(false);
        this.view.txtPhonNumber.focusSkin = "CopydefTextBoxFocus0a04d54150dfd4a";
        this.view.txtPhonNumber.skin = "CopydefTextBoxNormal0j8e7db626d3341";// Valid phone number
        this.enableSendButton();
    } else {
        this.view.flxPhoneErrorMess.setVisibility(true);
        this.view.txtPhonNumber.focusSkin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        this.view.txtPhonNumber.skin = "CopydefTextBoxFocus0ab2af9d09f6f47";
        this.enableSendButton();
    }
},
//end check phone number


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
        this.view.lblUNMoney.text = this.view.segUNAccount.selectedRowItems[0].fillAccountName;
        this.view.lblAccountID.text = this.view.segUNAccount.selectedRowItems[0].accountNum;
        this.view.lblAccCurrency.setVisibility(false);
        this.view.lblAccCurrency.text = this.view.segUNAccount.selectedRowItems[0].accountCurrency;
        this.showOrHideSegAccounts();
        this.enableSendButton();
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


enableSendButton: function(){        
      
      if(this.view.txtAmount.text!=='' && this.view.txtAmount.text!==null && this.view.txtAmount.text!==undefined && this.view.txtPhonNumber.text!=='' && this.view.txtPhonNumber.text!==null && this.view.txtAmount.text!==undefined && this.view.txtUNName.text!=='' && this.view.txtUNName.text!==null && this.view.txtUNName.text!==undefined  && !this.view.flxPhoneErrorMess.isVisible && !this.view.flxNameErrorMess.isVisible &&   this.view.lblUNMoney.text !== "إختر الحساب المحول منه"){
        this.view.btnSend.setEnabled(true);
        this.view.btnSend.skin = "sknBtn0095e426pxEnabled";
      } else {
        this.view.btnSend.setEnabled(false);
        this.view.btnSend.skin = "sknBtna0a0a0SSPReg26px";
      }
    },


    flxBackOnClick: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNMoneyTypes");
        ntf.navigate();
      } catch (er) {}
    },
  

  //start contacts code

   onflxContactsBack: function() {
      try {
        this.view.flxContactsAccessMain.setVisibility(false);
          this.view.flxMainContainer.setVisibility(true);
           this.view.flxMainContainer.setEnabled(true);
        
      } catch (er) {}
    },


    setChooseFromContactsSegmentData : function(data,flow)
    {
      try{
        
        var alphabetsArray = [] , contactsArray = [];
        var id = (flow === "phone") ? "number" : "id";
        if(!this.isEmptyNullUndefined(data) && data.length>0)
        {
          for(var i=0;i<data.length;i++)
          {
            if(!this.isEmptyNullUndefined(data[i][[flow]]) && data[i][[flow]].length>0)
            {
              data[i].contactName = data[i].displayname[0].toUpperCase()+data[i].displayname.slice(1).toLowerCase() + "  ( " + data[i][[flow]][0][[id]] + " )";
              data[i].id = data[i][[flow]][0][[id]];
              if(!JSON.stringify(alphabetsArray).includes(data[i].contactName[0]))
              {
                alphabetsArray.push({"alphabet" : data[i].contactName[0]});
              }
              contactsArray.push(data[i]);
            }
          }
          var contactsMapping = {
            "contact" : "id",
            "lblContactsName" : "contactName"
          };
          var alphabetsMapping = {
            "lblCountryCodeNo" : "alphabet"
          };
          this.view.segContacts.widgetDataMap = contactsMapping;
          this.view.segContacts.setData(contactsArray);
          //this.view.segCfcAlphabetsList.widgetDataMap = alphabetsMapping;
          //this.view.segCfcAlphabetsList.setData(alphabetsArray);
          this.contactsList = contactsArray;
          this.view.flxContactsList.setVisibility(true);
          this.view.flxContactsNoResults.setVisibility(false);
        }
        else
        {
          this.view.flxContactsList.setVisibility(false);
          this.view.flxContactsNoResults.setVisibility(true);
        }
        this.view.flxMainContainer.setEnabled(false);
       
        //this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsSegmentData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
            
        };
        alert("errrrr");
        //this.onError(errObj);
      } 
    },

    segContactsonRowClick :function(){
        var selectedContact = this.view.segContacts.selectedRowItems;
        //this.view.txtContacts.text  = selectedContact[0].id.replace(/\s/g, "");
        this.view.txtPhonNumber.text = selectedContact[0].id.replace(/\s/g, "").slice(-9);
        this.onPhoneNumberchange();
        this.view.flxContactsAccessMain.setVisibility(false);
        this.view.flxMainContainer.setEnabled(true);
        this.view.txtPhonNumber.setFocus();
      },

     /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },


    getSearchResults: function(segData, searchValue) {
      try {
       
        var searchData = [];
        searchValue = searchValue.toLocaleLowerCase();
        if(!this.isEmptyNullUndefined(segData) && !this.isEmptyNullUndefined(searchValue))
        {
          for (var i = 0; i < segData.length; i++) 
          {
            if(Object.values(segData[i]).toString().toLocaleLowerCase().includes(searchValue))
            {
              searchData.push(segData[i]);
            }
          }
        }
        else
        {
          return ""; 
        }
        return searchData; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchResults method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },



    setChooseFromContactsActions : function(flow)
    {
      try{
        var scope = this;
        
        scope.view.txtContactsSearch.onTextChange = function(){
          var searchedKey = scope.view.txtContactsSearch.text;
          if(searchedKey.length > 0)
          {
            scope.setChooseFromContactsSegmentData(scope.getSearchResults(scope.contactsListBackup, searchedKey),flow);
          }
          else
          {
            scope.setChooseFromContactsSegmentData(scope.contactsListBackup,flow);
          }
        };
        
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    //end contacts code
         
         

 });