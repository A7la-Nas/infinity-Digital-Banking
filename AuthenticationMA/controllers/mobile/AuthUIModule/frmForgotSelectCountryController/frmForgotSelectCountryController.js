define({
  segmentData:null,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow : function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "55dp";
      this.view.flxBlueBg.isVisible = false;
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    this.view.customSearchbox.tbxSearch.text="";
    this.initActions();
    this.lodCountryCodes();
    this.segmentData = this.view.segCountry.data;
  },
  initActions: function () {
    var scope = this;
    this.view.segCountry.onRowClick = function () {
      scope.segmentRowClick();
    };
    this.view.customHeader.flxBack.onClick = function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authModule.presentationController.commonFunctionForNavigation("frmForgotEnterPhoneNumber");
    }; 
    this.view.tbxSearch.onTouchEnd =  function() {
      scope.showSearch();
    };
    this.view.customSearchbox.btnCancel.onClick =  function() {
      scope.cancelSearch();
    };
    this.view.customSearchbox.tbxSearch.onTextChange=scope.tbxSearchOnTextChange;
  },
  showSearch: function() {
    var scope = this;
    this.view.customSearchbox.btnCancel.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
    this.view.flxNoTransactions.isVisible=false;
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxBlueBg.isVisible = false;
      if (this.view.flxHeaderSearchbox.isVisible === true) {
        this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxMainContainer.skin = "slFboxmb";
        this.view.flxSearch.isVisible = true;
        this.view.flxMainContainer.top = "55dp";
      } else {
        this.view.flxMainContainer.skin = "sknFlxffffffmb";
        this.view.customSearchbox.tbxSearch.text="";
        this.view.flxHeaderSearchbox.isVisible = true;
        this.view.flxSearch.isVisible = false;
        this.view.flxMainContainer.top = "110dp";
        kony.timer.schedule("timerId", function() {
          scope.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.flxMainContainer.forceLayout();
      }
    } else {
      if (this.view.flxHeaderSearchbox.isVisible === true) {
        this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxMainContainer.skin = "slFboxmb";
        this.view.flxSearch.isVisible = true;
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      } else {
        this.view.customSearchbox.tbxSearch.text="";
        this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.isVisible = true;
        this.view.flxMainContainer.skin = "sknFlxffffffmb";
        kony.timer.schedule("timerId", function() {
          scope.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.flxMainContainer.forceLayout();
      }
    }
  },
  cancelSearch:function(){
    const scope = this;
    this.view.flxMainContainer.skin = "slFboxmb";
    this.view.flxNoTransactions.isVisible=false;
    this.view.tbxSearch.text = "";
    this.view.segCountry.isVisible=true;
    this.view.flxHeaderSearchbox.isVisible = false;
    this.view.flxSearch.isVisible = true;
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
      this.view.flxBlueBg.isVisible = false;
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    else{
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    kony.timer.schedule("timerId1", function() {
      scope.view.customSearchbox.tbxSearch.setFocus(false);
    }, 0.1, false);    
    this.view.segCountry.setData(this.segmentData);
  },
  setFormUI: function(data) {
    var widgetDataMap = {
      lblFrequency : "Name"
    };
    this.segmentData =data;
    this.view.segCountry.widgetDataMap = widgetDataMap;
    this.view.segCountry.setData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  segmentRowClick : function () {
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var phoneData = {};
    var navManager = applicationManager.getNavigationManager();
    phoneData = navManager.getCustomInfo("frmForgot");
    phoneData = (phoneData === undefined) ? {} : phoneData;
    phoneData.code = this.view.segCountry.selectedRowItems[0].ISDCode;
    navManager.setCustomInfo("frmForgot",phoneData);
    authModule.presentationController.commonFunctionForNavigation("frmForgotEnterPhoneNumber");
    this.view.segCountry.removeAll();
    this.cancelSearch();
  },
  tbxSearchOnTextChange:function(){
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    var data = this.segmentData;
    var searchSegmentData = applicationManager.getDataProcessorUtility().commonSegmentSearch("Name",searchtext,data);
    if(searchSegmentData.length===0){
      this.view.segCountry.isVisible=false;
      this.view.flxNoTransactions.isVisible=true;
    }
    else{
      this.view.flxNoTransactions.isVisible=false;
      this.view.segCountry.isVisible=true;
      this.view.segCountry.setData(searchSegmentData);
    }
  },
  
  /**
   * @function
   *
   */
  lodCountryCodes:function(){
    
	const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
	authMode.presentationController.getCountryCodes();
  },
  
  
  

});