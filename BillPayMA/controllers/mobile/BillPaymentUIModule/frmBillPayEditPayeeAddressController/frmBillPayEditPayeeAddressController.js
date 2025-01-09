define({
    timerCounter: 0,
    isEditMode: true,
  /*  onNavigate: function(obj) {
        if (obj === undefined) {
            return;
        }
        if (obj === "edit") {
            this.isEditMode = true;
        } else if (obj === "addManually") {
            this.isEditMode = false;
        }
    },*/
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
//	  var FormValidator = require("FormValidatorManager")
//      this.fv = new FormValidator(4);
    },
    preShow: function() {
        var scope = this;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
            this.view.title = kony.i18n.getLocalizedString("kony.mb.BillPay.EditPayeeAddress");
        }
      else{
         this.view.flxHeader.isVisible = true;
         this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.BillPay.EditPayeeAddress");
      }
      /*
      this.view.flxResidentialAddressDummy.height = "40dp";
      this.view.flxSearch.isVisible = true;
      this.view.flxPayeeAddress.top="55dp";
      this.fv.submissionView(this.view.btnSave);
      this.view.tbxSearch.onTouchStart = this.showSearch;
      this.view.customSearchbox.btnCancel.onClick = this.showSearch;
      this.view.flxMainContainer.skin="slFboxmb";
      */
      this.initActions();
      /*
      this.restrictSpecialCharacters();
      this.setDataBasedOnEntryPoint();
      this.searchActions();
      */
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
     // this.showDummy();
    },
  
   initActions : function(){
     var scope= this;
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
      this.view.customHeader.btnRight.onClick = function() {
        scope.onClickCancel();
      };
   },
    onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
	billPayMod.presentationController.commonFunctionForNavigation("frmBillPayPayeeDetails");
        
  },
   onNavigate:function(context){ 
    var scope = this;     
    this.view.payeeAddress.setContext(context ,scope);
  },
  navigateToAckScreen: function(context) {
     var scope = this;
    if(context.hasOwnProperty('response')){
      context.payeeId = context.response.payeeId;
   }
     scope.navigateTofrmAccount(context,"editFlow");
  },
  navigateTofrmAccount : function(context,flowType){
    if(context.hasOwnProperty('isSearchFlow') && context.isSearchFlow === false){
      if(context.hasOwnProperty('addressLine2') && context.addressLine2 !== ""){
        context.street = context.street+","+" "+context.addressLine2;
      }
      if(context.hasOwnProperty('cityName') && context.cityName !== ""){
        context.street = context.street+","+" "+context.cityName;
      }
      if(context.hasOwnProperty('state') && context.state !== ""){
        context.street = context.street+","+" "+context.state;
      }
      if(context.hasOwnProperty('countryName') && context.countryName !== ""){
        context.street = context.street+","+" "+context.countryName;
      }
      if(context.hasOwnProperty('zipCode') && context.zipCode !== ""){
        context.street = context.street+","+" "+context.zipCode;
      }
    }
    if(flowType === "editFlow") {
     var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmPayeeAcknowledgement",false,context);
    } else {
     var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayEnterAccNo",false,context);
  }}

  /*
  initActions : function(){
    var scope=this;
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var address={};
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
    var navManager = applicationManager.getNavigationManager();
    var entryPoint=navManager.getEntryPoint("editBillPayPayee");
        this.view.txtAddressLineOne.onTextChange = function(){
      var text = scope.view.txtAddressLineOne.text;
      scope.fv.checkAndUpdateStatusForNull(0,text);
    };
    this.view.txtCity.onTextChange = function(){
      var text = scope.view.txtCity.text;
      scope.fv.checkAndUpdateStatusForNull(1,text);
    };
    this.view.txtState.onTextChange = function(){
      var text = scope.view.txtState.text;
      scope.fv.checkAndUpdateStatusForNull(2,text);
    };
    this.view.txtZipCode.onTextChange = function(){
      var text = scope.view.txtZipCode.text;
      billPayMod.presentationController.isValidZipCode(text,"frmBillPayEditAddress");
    };
    var flowType=billPayMod.presentationController.getFlowType();
    if(flowType==="editBillPay"){
      var payeeDetails=billPayMod.presentationController.getPayeeDetails();
      this.view.btnSave.onClick = function() {
          address.payeeId=payeeDetails.payeeId;
          address.cif=payeeDetails.cif;
          address.addressLine1=scope.view.txtAddressLineOne.text;
          //address.street=scope.view.txtAddressLineOne.text;
          address.addressLine2=scope.view.txtAddressLineTwo.text;
          address.cityName=scope.view.txtCity.text;
          address.state=scope.view.txtState.text;
          address.zipCode=scope.view.txtZipCode.text;
          applicationManager.getPresentationUtility().showLoadingScreen();
          billPayMod.presentationController.updatePayeeAddress(address);
      };
      this.view.customHeader.btnRight.onClick = function() {
        scope.onClickCancel();
      };
    }
    else{
      this.view.btnSave.onClick = function() {
          address.addressLine1=scope.view.txtAddressLineOne.text;
          //address.street=scope.view.txtAddressLineOne.text;
          address.addressLine2=scope.view.txtAddressLineTwo.text;
          address.cityName=scope.view.txtCity.text;
          address.state=scope.view.txtState.text;
          address.zipCode=scope.view.txtZipCode.text;
          billPayMod.presentationController.navToBillPayPayeeAccNum(address,"frmBillPayEnterAccNo");
      };
      this.view.customHeader.btnRight.onClick = function() {
        scope.onClickCancel();
      };
    }
  },
  showDummy : function(){
    var self = this;
    this.view.txtAddressLineOne.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtAddressLineOne.onDone = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
    this.view.txtAddressLineTwo.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtAddressLineTwo.onDone = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
    this.view.txtCity.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtCity.onDone = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
    this.view.txtState.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtState.onDone = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
    this.view.txtCountry.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtCountry.onDone = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
    this.view.txtZipCode.onTouchStart = function(){
      self.view.flxResidentialAddressDummy.height = "220dp";
    };
    this.view.txtZipCode.onEndEditing = function(){
      self.view.flxResidentialAddressDummy.height = "40dp";
    };
  },
   validateFormUI : function(){
    var formValues =[];
    formValues.push(this.view.txtAddressLineOne.text);
    formValues.push(this.view.txtCity.text);
    formValues.push(this.view.txtState.text);
    formValues.push(this.view.txtZipCode.text);
    this.fv.preshowCheck(formValues);
  },
    showSearch: function() {
      var scope = this;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.view.flxSearchAddress.isVisible === true) {
              this.view.flxMainContainer.skin="slFboxmb";
               this.view.flxMainContainer.isVisible = true;
                this.view.flxSearch.isVisible = true;
              this.view.flxSearchAddress.isVisible = false;
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxSearchAddress.isVisible = true;
                this.view.flxMainContainer.isVisible = false;
              this.view.flxMainContainer.skin="sknFlxffffffmb";
                //this.view.customSearchbox.tbxSearch.setFocus(true);
                 kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.1, false);
            }
        } else {
            if (this.view.flxSearchAddress.isVisible === true) {
              this.view.flxMainContainer.skin="slFboxmb";
                this.view.flxSearchAddress.isVisible = false;
              this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.isVisible = true;
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.flxSearchAddress.isVisible = true;
              this.view.flxMainContainer.skin="sknFlxffffffmb";
                this.view.flxMainContainer.isVisible = false;
                //this.view.customSearchbox.tbxSearch.setFocus(true);
                 kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.1, false);
            }
        }
      this.view.segAddresses.removeAll();
      this.view.customSearchbox.tbxSearch.text = "";
       this.view.tbxSearch.text = "";
    },
    setDataBasedOnEntryPoint:function(){
      var scope=this;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
      var navManager = applicationManager.getNavigationManager();
      var flowType=billPayMod.presentationController.getFlowType();
      if(flowType==="editBillPay"){
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = "Edit Address";
        }
       scope.view.customHeader.lblLocateUs.text="Edit Address";
       scope.view.btnSave.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.save","Save");
       scope.setDataToForm(billPayMod.presentationController.getPayeeDetails());
      }
      else{
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = "Payee Address";
        }
        scope.view.customHeader.lblLocateUs.text="Payee Address";
        scope.view.btnSave.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.continue","Continue");
        scope.setDataToForm(billPayMod.presentationController.getPayeeAddressDetails());
      }
    },
  setDataToForm:function(payeeData){
    var scope=this;
      var address="";
      scope.view.txtAddressLineOne.text = (payeeData.addressLine1 && payeeData.addressLine1 !== "" && payeeData.addressLine1 !== null)?payeeData.addressLine1:
      (payeeData.street && payeeData.street !== "" && payeeData.street !== null)?payeeData.street:"";
      scope.view.txtAddressLineTwo.text = (payeeData.addressLine2 && payeeData.addressLine2 !== "" && payeeData.addressLine2!== null)?payeeData.addressLine2:"";
      scope.view.txtCity.text = (payeeData.cityName && payeeData.cityName !== "" && payeeData.cityName!== null)?payeeData.cityName:"";
      scope.view.txtState.text = (payeeData.state && payeeData.state!== "" &&payeeData.state!== null)?payeeData.state:"";
      scope.view.txtZipCode.text = (payeeData.zipCode && payeeData.zipCode !== "" && payeeData.zipCode!== null)?payeeData.zipCode:"";
    scope.validateFormUI();
  },
  searchActions : function(){
    var scope=this;
    var searchParams = {};
    this.view.customSearchbox.tbxSearch.onTextChange = function(){
      var searchText = scope.view.customSearchbox.tbxSearch.text;
      searchParams.text = searchText;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
      billPayMod.presentationController.addressSearch(searchParams);
    };
    this.view.segAddresses.onRowClick = function(){
      var data = scope.view.segAddresses.selectedItems[0].formattedAddress;
      var address = data.split(",");
      address.reverse();
      scope.fetchZipCode(scope.view.segAddresses.selectedItems[0].placeID);
      scope.view.txtCountry.text = address[0];
      scope.view.txtState.text = address[1];
      scope.view.txtCity.text = address[2];
      var length = address.length;
      var mid = Math.floor((length-3)/2);
      var i,addressline1="";
      var addressline2="";
      if(address[3]){
        for(i=length-1;i>=3+mid;i--)
          addressline1+=address[i]+",";
        for(i=2+mid;i>=3;i--)
          addressline2+=address[i]+",";
      }
      addressline1=addressline1.slice(0,-1);
      addressline2=addressline2.slice(0,-1);
      scope.view.txtAddressLineTwo.text = addressline2;
      scope.view.txtAddressLineOne.text = addressline1;
      scope.showSearch();
      scope.validateFormUI();
    };
  },
  fetchZipCode : function(placeID){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    billPayMod.presentationController.fetchZipCode(placeID,this.bindZipCodeToUi);
  },
  bindZipCodeToUi : function(res){
    var scope = this;
    scope.view.txtZipCode.text = res[0]["zipCode"];
    scope.validateFormUI();
  },
   setSearchData : function(data){
    if(data && data!== null){
      this.view.segAddresses.widgetDataMap = {
        "lblAddress": "formattedAddress"
      };
      this.view.segAddresses.setData(data);
    }
   },
  onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var flowType=billPayMod.presentationController.getFlowType();
    if(flowType==="editBillPay"){
      //billPayMod.presentationController.commonFunctionForNavigation("frmBillPayPayeeDetails");
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    else{
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    }
  },
  bindGenericError : function(msg){
     this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
     this.view.btnSave.setEnabled(false);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  enableContinue : function(){
    var text = this.view.txtZipCode.text;
    this.fv.checkAndUpdateStatusForNull(3,text);
  },
  restrictSpecialCharacters: function () {
    var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
    var alphabetsSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numericSet = "0123456789";

    this.view.txtAddressLineOne.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
    this.view.txtAddressLineTwo.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
    this.view.txtCity.restrictCharactersSet = numericSet + specialCharactersSet;
    this.view.txtState.restrictCharactersSet = numericSet + specialCharactersSet;
    this.view.txtCountry.restrictCharactersSet = numericSet + specialCharactersSet;
    this.view.txtZipCode.restrictCharactersSet = specialCharactersSet;
   
    this.view.txtAddressLineOne.maxTextLength = 50;
    this.view.txtAddressLineTwo.maxTextLength = 50;
    this.view.txtCity.maxTextLength = 50;
    this.view.txtState.maxTextLength = 50;
    this.view.txtCountry.maxTextLength = 50;
    this.view.txtZipCode.maxTextLength = 35;
  }
  */
});