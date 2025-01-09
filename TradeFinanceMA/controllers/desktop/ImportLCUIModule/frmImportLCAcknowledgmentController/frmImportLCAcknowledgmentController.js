

define({ 

  onNavigate: function(data){
    /* var selectedRecord = {
            "lcCurrency": "USD",
            "issueDate": "12/1/21",
            "paymentTerms": "Sight",
            "beneficiaryPostCode": "122",
            "beneficiaryCountry": "India",
            "beneficiaryCity": "Chennai",
            "beneficiaryState": "TN",
            "beneficiaryBank": "ABC Bank",
            "beneficiaryBankAdressLine1": "abc",
            "beneficiaryBankPostCode": "222",
            "beneficiaryBankCountry": "India",
            "beneficiaryBankCity": "Chennai",
            "beneficiaryBankState": "TN",
            "incoTerms": "FOB",
            "documentCharges": "12",
            "confirmationInstruction": "test",
            "transferable": "Yes",
            "standByLC": "No",
            "isDraft": "false",
            "status": "Request Initiated",
            "srmsReqOrderID": "LOCI21267NCS0S",
            "lcReferenceNo":"REFNO454",
			"lcAmount":"45",
			"expiryPlace":"Expiry",
			"availableWith1":"AvailableWith",
            "beneficiaryName":"Name",
			"beneficiaryAddressLine1":"Address"
        };*/
    this.view.preShow = this.preShow.bind(this);
    this.view.ImportLCAcknowledgement.setContext(data.contextData); 
    this.formType = data.contextData.frmType;
  },
  preShow: function(){
    var scope = this;
    scope.view.customheadernew.forceCloseHamburger();  
    scope.view.customheadernew.activateMenu("TradeFinance","Imports");	
    scope.view.ImportLCAcknowledgement.handleNavigation = function(context){
      scope.handleNavigation(context);
    }
  },
  postShow : function(){ 
    var scope = this; 
    if(this.formType === "Drawings")  { 
      scope.view.lblImportLCAck.text =kony.i18n.getLocalizedString("i18n.TradeFinance.ImportLC-DrawingAcknowledgement");
    } else 
      scope.view.lblImportLCAck.text = "Import LC - Acknowledgement";
  },
  handleNavigation: function(contextData){
    var obj;
    if(!contextData){
      obj = { "context" : this, "callbackModelConfig" : {"Dashboard": true, "previousFormName": "frmImportLCAcknowledgment"} }; 
      kony.mvc.getNavigationManager().navigate(obj);
    }else{
      obj = { "context" : this,  "params" : {contextData} , "callbackModelConfig" : {"Issuance": true} }; 
      kony.mvc.getNavigationManager().navigate(obj);
    }
  },
  onBreakpointChange: function(){
    this.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
    this.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
  }

});