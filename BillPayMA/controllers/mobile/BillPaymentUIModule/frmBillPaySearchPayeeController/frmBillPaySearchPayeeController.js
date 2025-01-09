define(['ParserUtilsManager'],function(ParserUtilsManager){ 
  return{
    
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function() {
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
      else{
         this.view.flxHeader.isVisible = true;
        this.view.flxMainContainerNew.top = "56dp";
      }
        this.view.flxSearchAddress.isVisible = false;
        this.view.flxMainContainer.isVisible = false;
        this.initActions();
    //  	this.searchActions();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  onNavigate:function(context){ 
    var scope = this;     
    var navManager = applicationManager.getNavigationManager();
    var prevForm = navManager.getPreviousForm();
    if(prevForm === "frmBillPayAllPayees" || prevForm === "frmBillPaySelectPayee"){
    //clear previous context  
    pManager = new ParserUtilsManager();
    pManager.clearContext();  
    context = {};                    
    context["payeeId"] = "";
    context["flowType"] = "ADD";
    context['pManager'] = pManager;
    context["imgIconLink"] = "businessaccount.png";
    context["imgIconLinkPersonal"] = "personalaccount.png";  
    }
    
    this.view.autoDataFill.setContext(context,scope);
  },
    
     navigateToZipCode : function(context){
      var navManager = applicationManager.getNavigationManager(); 
	  if(context && context.flowType === "ADD"){
         context.zipCode = "";
      }
      navManager.navigateTo("frmBillPayZipCode",false,context);
  },
  navigateTofrmPhone: function(context){ 
      var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayPhoneNumber",false,context);
  },
  navigateTofrmPayeeName: function(context){
      var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayEditName",false,context);
},
      
  initActions: function() {
        this.view.customHeader.flxBack.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
        }
  },
  /*
    initActions: function() {
        var scope = this;
        this.view.customHeader.flxBack.onClick = function() {
          var navManager = applicationManager.getNavigationManager();
          navManager.goBack();
        }
        this.view.tbxSearch.onTouchStart = this.showSearch;
        this.view.customSearchbox.btnCancel.onClick = this.showSearch;
        this.view.flxAddManually.onClick = function(){
          var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
          billPayMod.presentationController.clearBillPayPayeeData();
          billPayMod.presentationController.setManuallyAddedFlag("true");
          billPayMod.presentationController.commonFunctionForNavigation("frmBillPayEditName");
        }
    },
  /*
    showSearch: function() {
      var scope = this;
        if (this.view.flxSearchAddress.isVisible === true) {
            this.view.flxSearchAddress.isVisible = false;
            this.view.flxMainContainer.isVisible = true;
        } else {
            this.view.flxSearchAddress.isVisible = true;
            this.view.flxMainContainer.isVisible = false;
            //this.view.customSearchbox.tbxSearch.setFocus(true);
           kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.1, false);
        }
      this.view.segAddresses.removeAll();
      this.view.customSearchbox.tbxSearch.text = "";
    },
  searchActions : function(){
    var scope=this;
    this.view.customSearchbox.tbxSearch.onTextChange = function(){
      var searchText = scope.view.customSearchbox.tbxSearch.text;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
      billPayMod.presentationController.payeeSearch(searchText);
    };
    this.view.segAddresses.onRowClick = function(){
        var rowid=scope.view.segAddresses.selectedRowIndex[1];
        var selectedPayeeDetails = scope.view.segAddresses.data[rowid];
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.clearBillPayPayeeData();
        billPayMod.presentationController.navTofrmZipCode(selectedPayeeDetails,"frmBillPayZipCode");
    };
  },
   setSearchData : function(data){
    if(data && data!== null){
      this.view.segAddresses.widgetDataMap = {
        "lblAddress": "billerName"
      };
      this.view.segAddresses.setData(data);
    }
   },
  */
  }
});