define(['ParserUtilsManager'],function(ParserUtilsManager){ 
  return {
  contextData:{},
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function() {
      this.view.flxMainContainer.showFadingEdges = false;
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
      else{
         this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      }
      this.view.flxMainContainer.skin="slfSbox";
      this.initActions();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
 
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      if(!kony.sdk.isNullOrUndefined(scope.contextData)){
        if(scope.contextData['billerCategoryId'])
          {
            navMan.navigateTo("frmBillPayPhoneNumber", false, scope.contextData);
          }
        else{
          navMan.goBack();
        }
      }      
      else{
        navMan.goBack();
      } 
    };
    },
  
   onNavigate:function(context){ 
     var scope = this; 
    pManager = new ParserUtilsManager();
    pManager.clearContext();  
    scope.contextData = context;
     if(context === null || context === undefined || context === "") {
      var navMan=applicationManager.getRecipientsManager();
      context = navMan.listOfPayees;
    }
    context['pManager'] = pManager;
    this.view.payeeLinkedCustomerID.setContext(context,scope);
    //for edit flow check'
    /*
    if(inputs['flowType'] == "edit"){
      var params = {
        "payeeId": "1793",
        "cif": "[{\"contractId\":\"7321457251\",\"coreCustomerId\":\"1425958,1578660\"}]",
        "flowType":"EDIT",
        "companyName":"sample company",
        "accountNumber": "09890",
        "cityName": "sample city",
        "isManuallyAdded": "true",
        "payeeAccountNumber": "09890",        
        "payeeName": "Sample payeessname",
        "payeeNickName": "sample nickname",
        "state": "edit state",
        "zipCode": "09090",
        "countryName": "sample country ",
        "nameOnBill": "sample name on bill",
        "street": "sample street name",
        "addressLine2": "sample addline2"
      };
      this.view.payeeLinkedCustomerID.setContext(params,scope);
    }
    
else{
      this.view.payeeLinkedCustomerID.setContext(context,scope);
 }
  */
  },
  
  
  continueAction: function(context){
      var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmBillPayVerifyDetails",false,context);
  },
  
  continueActionEdit: function(context){
      var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmPayeeAcknowledgement",false,context);
  }
  };
});