define(['CampaignUtility'], function(CampaignUtility){
  return{    
    payType : "",
    init : function() {
      try{
        kony.print("Entered init");      
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;          
      }catch(e){
        kony.print("Exception in init::"+e);}  
    },

    setFlowActions: function(){
      this.view.flxbtn.onClick = this.addToWallet;
      this.view.customHeader.flxBack.onClick = this.navigateToCardManage;
    },
	
    preShow: function() {      
      this.resetUI();
      this.setFlowActions();     
    },    

    postShow: function() {

    },              


    resetUI: function(){
      var navManager = applicationManager.getNavigationManager();
      payType = navManager.getCustomInfo("frmCardManagePay");
      var cardData = navManager.getCustomInfo("frmCardManagePay_cardDetails");
      var wallet = new WalletsIntegration();
      this.view.lblCardNoLastDigits.text = cardData.maskedCardNumber.substr(-4);
      if(payType === "ApplePay"){        
        this.view.lblText.text = "Add this card to Apple Pay";
        this.view.lblCardMsg.text = "Using Apple Pay with your iPhone or Apple Watch is quick and secure. It's a safer way to pay that helps you avoid touching buttons or exchanging cash.";
        this.view.imgWallet.src = "add_to_wallet.png";        
        wallet.isCardAlreadyAdded_Apay(cardData.cardId);         
      }
      else if(payType === "SamsungPay"){ 
        this.view.lblText.text = "Add this card to Samsung Pay";
        this.view.lblCardMsg.text = "Using Samsung Pay with your phone or Smart Watch is quick and secure. It's a safer way to pay that helps you avoid touching buttons or exchanging cash.";  
        this.view.imgWallet.src = "add_to_samsung_pay.png";        
        wallet.isCardAlreadyAdded_Spay(cardData.cardId,this.alreadyAdded);        
      }
      else{ 
        this.view.lblText.text = "Add this card to Google Pay";
        this.view.lblCardMsg.text = "Using Google Pay with your phone or Smart Watch is quick and secure. It's a safer way to pay that helps you avoid touching buttons or exchanging cash.";    
        this.view.imgWallet.src = "add_to_google_pay.png";                
        wallet.isCardAlreadyAdded_Gpay(cardData.cardId,this.alreadyAdded);    
      }
      this.view.imgTick.isVisible = false;      
      this.view.flxbtn.isVisible = true;
    },
    alreadyAdded: function(isCardAdded){
      if(isCardAdded.toString() === "true"){
        this.addedToCard();         
      }
      else{
        this.view.flxbtn.isVisible = true;   
      }
    },
    addToWallet: function(){     
       var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            var data = this.addCardData();
            if (payType === "ApplePay") {
                data.paymentService = "applePay";
                manageCardsModule.presentationController.enrollCard(data);
            } else if (payType === "SamsungPay") {
                data.paymentService = "samsungPay";
                manageCardsModule.presentationController.createCardDataForSamsungPay(data);
            } else {
                data.paymentService = "googlePay";
                manageCardsModule.presentationController.createCardDataForGooglePay(data);
            }
    
    },
    
    addCardData:function(){     
      var navManager = applicationManager.getNavigationManager();
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var userManager = applicationManager.getUserPreferencesManager();        
      var detailsJSON = navManager.getCustomInfo("frmCardManagePay_cardDetails");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      var cardDetails = {
        "cardID" : detailsJSON.cardId,                           
        "deviceID": deviceUtilManager.getDeviceInfo().deviceID,        
        "clientCustomerID": userManager.getUserId(),   
        "cardHolderName":  detailsJSON.cardHolderName,
        "billingAddress":JSON.stringify(manageCardsModule.presentationController.getBillingAddressJson(detailsJSON.billingAddress))
     
      };
      return cardDetails;
    },
    
    navigateToCardManage: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    },
    
    addedToCard : function(responseData){
      if(payType === "ApplePay"){
        this.view.lblText.text = "Added to Apple Pay";
        this.view.lblCardMsg.text = "You can make this your default card for Apple Pay by putting it at the top of your Apple Wallet. To change how you use this card with Apple pay, or to remove it from your Apple Wallet, go to 'Settings' on your iPhone, then 'Wallet & Apple Pay'.";                      
      }
      else if(payType === "SamsungPay"){ 
        this.view.lblText.text = "Added to Samsung Pay";
        this.view.lblCardMsg.text = "You can make this your default card for Samsung Pay by putting it at the top of your Samsung Pay. To change how you use this card with Samsung Pay, or to remove it from your Samsung Pay, open the Samsung Pay app on your phone, tap Menu, and then tap Cards. Select the card you want to remove, and then tap More options. Tap Delete card, and then choose a reason for removing the card.";                                
      }
      else{
        this.view.lblText.text = "Added to Google Pay";
        this.view.lblCardMsg.text = "You can make this your default card for Google Pay by putting it at the top of your Google Pay. To change how you use this card with Google Pay, or to remove it from your Google Pay, open the Google Pay app on your phone, at the top left, tap Menu, then Payment methods. Then tap the payment method you want to remove. At the top right, tap More, then Remove payment method.";                                     
      }
      this.view.imgTick.isVisible = true;      
      this.view.flxbtn.isVisible = false;   
    },
    
    showErrorPopUp : function(msg)
    {
      applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
    }
  };
});
