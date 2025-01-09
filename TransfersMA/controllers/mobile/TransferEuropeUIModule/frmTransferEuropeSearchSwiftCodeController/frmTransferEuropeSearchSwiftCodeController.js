define({
  init : function(){
	var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    this.initActions();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
   
    this.populateData();
	var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navigateToForm = navManager.getEntryPoint("searchCountry");
        if (navigateToForm === "frmBenSwiftCodeEurope" || navigateToForm === "frmLookUpResults") {
          this.view.lblSelect.text=kony.i18n.getLocalizedString("kony.mb.common.select");
        }
  },
  initActions : function(){
    var scope=this;
        
    this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = scope.onClickCancel;
   // this.view.txtCountry.onTextChange = scope.enableordisableButton;
    this.view.txtBankName.onTextChange = scope.enableordisableButton;
    this.view.tbxCity.onTextChange = scope.enableordisableButton;
    this.view.btnSearch.onClick=scope.btncontinueOnClick;
    this.view.flxCountry.onClick=function(){
       var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
       transferModule.fetchCountriesList();
    };
     
  },
  enableordisableButton:function(){
    if((this.view.lblSelect.text && this.view.lblSelect.text.length>0)||
       (this.view.tbxCity.text && this.view.tbxCity.text.length>0)||
       (this.view.txtBankName.text && this.view.txtBankName.text.length>0)){
      this.enableContinueButton();
    }
    else{
      this.disableContinueButton();
    }
  },
  btncontinueOnClick:function(){
    var searchData={};
    applicationManager.getPresentationUtility().showLoadingScreen();
     if((this.view.lblSelect.text) && (this.view.lblSelect.text!==kony.i18n.getLocalizedString("kony.mb.common.select"))){
      searchData.country=this.view.lblSelect.text;
    }
    if(this.view.tbxCity.text && this.view.tbxCity.text.length>0){
      searchData.city=this.view.tbxCity.text;
    }
    if(this.view.txtBankName.text && this.view.txtBankName.text.length>0){
      searchData.bankName = this.view.txtBankName.text;
    }
      var transferMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transferMod.searchAllSwiftBICCode(searchData);
  },
//   countryTextChange: function(){
//     if(this.view.txtCountry.text.length>0){
//       this.enableContinueButton();
//     }
//     else{
//       this.disableContinueButton();
//     }
//   },
//   cityTextChange:function(){
//     if(this.view.tbxCity.text.length>0){
//       this.enableContinueButton();
//     }
//     else{
//       this.disableContinueButton();
//     }
//   },
//   bankNameTextChange:function(){
//     if(this.view.txtBankName.text.length>0){
//       this.enableContinueButton();
//     }
//     else{
//       this.disableContinueButton();
//     }
//   },
  populateData : function(){
    var scope=this;    
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var searchData=transferModPresentationController.searchSwiftData;
    var navManager = applicationManager.getNavigationManager();
    var navigateToBICSearch = navManager.getEntryPoint("searchCountry");
   // this.view.txtCountry.text=(searchData && searchData.country)?searchData.country:"";
    if (navigateToBICSearch !== "frmBenCountryEurope"){
    this.view.txtBankName.text=(searchData && searchData.bankName)?searchData.bankName:"";
    this.view.tbxCity.text=(searchData && searchData.city)?searchData.city:"";
    }
    var countryName=transferModPresentationController.getCountryName();
    if(countryName){
      this.view.lblSelect.text=countryName;
    }    
    scope.enableordisableButton();
  },
  enableContinueButton:function(){
    this.view.btnSearch.setEnabled(true);
    this.view.btnSearch.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinueButton: function() {
    this.view.btnSearch.setEnabled(false);
    this.view.btnSearch.skin = "sknBtna0a0a0SSPReg26px";
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModPresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
});