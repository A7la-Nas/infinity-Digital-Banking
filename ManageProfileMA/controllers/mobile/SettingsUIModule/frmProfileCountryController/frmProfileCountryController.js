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
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    }; 
    this.view.tbxSearch.onTouchStart =  function() {
        scope.showSearch();
      };
   this.view.customSearchbox.btnCancel.onClick =  function() {
          scope.cancelSearch();
        };
   this.view.customSearchbox.tbxSearch.onTextChange=scope.tbxSearchOnTextChange;
  },
   showSearch: function() {
        this.view.flxNoTransactions.isVisible=false;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxBlueBg.isVisible = false;
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxMainContainer.skin = "slFbox";
                this.view.flxSearch.isVisible = true;
                this.view.flxMainContainer.top = "55dp";
            } else {
                this.view.flxMainContainer.skin = "sknFlxffffff";
                this.view.customSearchbox.tbxSearch.text="";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.flxSearch.isVisible = false;
                this.view.flxMainContainer.top = "110dp";
                this.view.customSearchbox.tbxSearch.setFocus(true);
                }
        } else {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxMainContainer.skin = "slFbox";
                this.view.flxSearch.isVisible = true;
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
              	this.view.customSearchbox.tbxSearch.text="";
                this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeaderSearchbox.isVisible = true;
                this.view.flxMainContainer.skin = "sknFlxffffff";
                this.view.customSearchbox.tbxSearch.setFocus(true);
            }
        }
    },
    cancelSearch:function(){
      this.view.flxMainContainer.skin = "slFbox";
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
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var phoneData = {};
    var navManager = applicationManager.getNavigationManager();
    phoneData = navManager.getCustomInfo("frmProfileEditPhoneNumberMain");
    if(phoneData &&  phoneData.data){
      phoneData.data.phoneCountryCode = this.view.segCountry.selectedRowItems[0].ISDCode;
    }
    else{
      phoneData.phoneCountryCode = this.view.segCountry.selectedRowItems[0].ISDCode;
    }
    navManager.setCustomInfo("frmProfileEditPhoneNumberMain",phoneData);
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileEditPhoneNumberMain");
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
  	}
});