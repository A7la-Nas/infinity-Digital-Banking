define({
  tabSelection:"",
  scope:this,
  hasStopPaymentFeat: false,
  hasChequeRequestFeat: false,
  hasViewChequesFeat: false,
  nbTabs: 0,
  currentView: "",
  hasCreateChequeBookRequestPermission: false,
  hasCreateNewStopPaymentPermission: false,
  hasCreateChequeBookPermacc: false,
  hasViewChequeBookPermacc: false,
  onNavigate: function(varPass, showView){
 /*   if(!varPass){
		this.renderStopChequeView(); 
    } */
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
	  var footerMenuUtility = require("FooterMenuUtility");
	  this.footerMenuUtility =
		footerMenuUtility.getFooterMenuUtilityInstance();
	  var cm = applicationManager.getConfigurationManager();
	  this.footerMenuUtility.entitlements = {
		features: cm.getUserFeatures(),
		permissions: cm.getUserPermissions(),
	  };
	  this.footerMenuUtility.scope = this;
	}
    var navMan = applicationManager.getNavigationManager();
    try {
      var tabSelected = navMan.getCustomInfo("frmChequeManagement").TAB;
    }
    catch(e) {
      var tabSelected = "";
    }
    if(tabSelected === "ChequeBook") {
      this.currentView = "ChequeBookView";
      this.renderChequeBooksView();
    }
    else if (tabSelected === "MyCheque" || varPass === "MyChequesView" || showView === "MyChequesView") {
      this.currentView = "MyChequesView";
		this.renderMyChequesView();  
    }
    else {
       this.currentView = "";
     }
    },
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    this.view.segStopCheque.onRowClick=scope.navigateToTransactionDetails;
    this.view.flxSearchIcon.onClick=scope.navigateToSearch;
    this.view.flxAccountDetails.onClick=scope.navigateToAccounts;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateCustomBack;
    this.view.onDeviceBack = scope.navigateCustomBack;
    this.view.flxStopChequeLabel.onClick=scope.renderStopChequeView;
    this.view.flxChequeBooksLabel.onClick=scope.renderChequeBooksView;
    this.view.flxMyChequesLabel.onClick=scope.renderMyChequesView;
    this.view.segStopCheque.removeAll();
  },
  navigateCustomBack: function() {
    var custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "AuthenticationMA", "moduleName" : "AuthUIModule"});
      authMod.presentationController.navigationAfterLogin();
    }else{
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountUIModule", "appName" : "ArrangementsMA"} );
      accountMod.presentationController.showDashboard();
    }
  },
  renderStopChequeView: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.view.segStopCheque.removeAll();
    var presentation = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    this.tabSelection="StopCheque";
    presentation.fetchStopChequeRequestsForAccount();
    this.view.segStopCheque.selectedRowIndex = [0, 0];
    this.view.flxStopChequeLabel.skin = "sknUnderlinef639afTab";
    this.view.lblStopCheque.skin="sknLblffffffSSPReg26px";
    this.view.flxChequeBooksLabel.skin = "sknFlxffffffmb";
    this.view.lblChequeBooks.skin="sknlbl003E7536px";
    this.view.flxMyChequesLabel.skin = "sknFlxffffffmb";
    this.view.lblMyCheques.skin="sknlbl003E7536px";
    this.view.flxStopCheques.top="110dp";
    this.view.btnNewRequest.text = kony.i18n.getLocalizedString("kony.mb.chequemanagement.newstopchequerequest");
    this.view.btnNewRequest.onClick = function() {
        var presentationController = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
        presentationController.commonFunctionForNavigation({"friendlyName" : "frmPayeeName", "appName" : "ArrangementsMA"} );
    };
    this.hasCreateNewStopPaymentPermission ? this.view.btnNewRequest.isVisible = true : this.view.btnNewRequest.isVisible = false;
    this.view.flxSearchInfo.isVisible = false;
    scope_ChequePresentationController.isReview="";
scope_ChequePresentationController.isInitial=true;
  },
  renderChequeBooksView: function() {
    this.tabSelection="ChequeBook";
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.view.segStopCheque.removeAll();
    this.view.segStopCheque.selectedRowIndex = [0, 0];
    var presentation = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    if (this.hasViewChequeBookPermacc) {
      presentation.fetchTransactionForAccount();
    } else {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }    
    this.view.flxStopChequeLabel.skin = "sknFlxffffffmb";
    this.view.lblStopCheque.skin="sknlbl003E7536px";
    this.view.flxChequeBooksLabel.skin = "sknUnderlinef639afTab";
    this.view.lblChequeBooks.skin="sknLblffffffSSPReg26px";
    this.view.flxMyChequesLabel.skin = "sknFlxffffffmb";
    this.view.lblMyCheques.skin="sknlbl003E7536px";
    this.view.flxStopCheques.top="110dp";
    this.view.btnNewRequest.text = kony.i18n.getLocalizedString("kony.mb.chequeManagement.newchequeBookRequest");
    this.view.btnNewRequest.onClick = function() {
      presentation.btnNewRequestOnClick();
    };
    //this.hasCreateChequeBookRequestPermission ? this.view.btnNewRequest.isVisible = true : this.view.btnNewRequest.isVisible = false;
    this.view.flxSearchInfo.isVisible = false;
    var configManager = applicationManager.getConfigurationManager();
    this.hasCreateChequeBookPermacc = configManager.checkAccountAction(presentation.accountId,"CHEQUE_BOOK_REQUEST_CREATE");
    this.hasCreateChequeBookPermacc ? this.view.btnNewRequest.isVisible = true : this.view.btnNewRequest.isVisible = false;
  },
  renderMyChequesView: function() {
    this.tabSelection="MyCheque";
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.view.segStopCheque.removeAll();
    var presentation = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    presentation.getChequeSupplements();
    this.view.segStopCheque.selectedRowIndex = [0, 0];
    this.view.flxStopChequeLabel.skin = "sknFlxffffffmb";
    this.view.lblStopCheque.skin="sknlbl003E7536px";
    this.view.flxChequeBooksLabel.skin = "sknFlxffffffmb";
    this.view.lblChequeBooks.skin="sknlbl003E7536px";
    this.view.flxMyChequesLabel.skin = "sknUnderlinef639afTab";
    this.view.lblMyCheques.skin="sknLblffffffSSPReg26px";
    this.view.flxStopCheques.top="180dp";
    this.view.btnNewRequest.text = kony.i18n.getLocalizedString("kony.mb.chequemanagement.newstopchequerequest");
    this.view.btnNewRequest.onClick = function() {
        var presentationController = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
        presentationController.commonFunctionForNavigation({"friendlyName" : "frmPayeeName", "appName" : "ArrangementsMA"});
    };
    this.hasCreateNewStopPaymentPermission ? this.view.btnNewRequest.isVisible = true : this.view.btnNewRequest.isVisible = false;
    this.view.flxSearchInfo.isVisible = true;
  },
  preShow:function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMenu.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMenu.isVisible = false;
	  this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
	  this.view.customHeader.flxBack.isVisible = false;
    }
    this.view. flxSearchInfo.isVisible=false;
    this.setFooter();
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(this,configManager.constants.MENUCHEQUEMANAGEMENT);
    var presentation = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    this.view.lblAccountDetails.text=presentation.processedName;
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var isIconVisibile = this.setIconVisibility();
    if (!isIconVisibile) {
      this.view.imgAccountType.src = presentation.isBusinessPayee === "true" ?  "businessaccount.png" : "personalaccount.png";
    //   this.view.imgAccountType.isVisible = true;
    //   this.view.flxAccountType.isVisible = true;
    //   this.view.lblAccountDetails.left = "40dp";
    } else {
      this.view.imgAccountType.src = "";
      this.view.imgAccountType.isVisible = false;
      this.view.flxAccountType.isVisible = false;
      this.view.lblAccountDetails.left = "20dp";
    }
    var navMan=applicationManager.getNavigationManager();
    
    this.nbTabs = 0;
    this.hasStopPaymentFeat = configManager.checkUserFeature("STOP_PAYMENT_REQUEST");
    if (this.hasStopPaymentFeat) {this.nbTabs += 1;}
    this.view.flxStopChequeLabel.setVisibility(this.hasStopPaymentFeat);         
    
    this.hasCreateChequeBookPermacc = configManager.checkAccountAction(presentation.accountId,"CHEQUE_BOOK_REQUEST_CREATE");
    this.hasViewChequeBookPermacc = configManager.checkAccountAction(presentation.accountId,"CHEQUE_BOOK_REQUEST_VIEW");
    var visibleChequeBooks = this.hasCreateChequeBookPermacc || this.hasViewChequeBookPermacc ;
    if (visibleChequeBooks) {
        this.nbTabs += 1;
    }
	this.view.flxChequeBooksLabel.setVisibility(visibleChequeBooks);    
    
    this.hasViewChequesFeat = configManager.checkUserFeature("VIEW_CHEQUES");
    if (this.hasViewChequesFeat) {this.nbTabs += 1;}
    this.view.flxMyChequesLabel.setVisibility(this.hasViewChequesFeat);
    this.view.flxSearchInfo.setVisibility(this.hasViewChequesFeat);

    var sizeInPercentage = Math.floor(100/this.nbTabs);
    this.view.flxStopChequeLabel.width = this.view.flxChequeBooksLabel.width = this.view.flxMyChequesLabel.width = sizeInPercentage + "%";
   
    navMan.setEntryPoint("chequemanagement", "frmChequeManagement");
    
    this.hasCreateChequeBookRequestPermission = configManager.checkUserPermission("CHEQUE_BOOK_REQUEST_CREATE");
    this.hasCreateNewStopPaymentPermission = configManager.checkUserPermission("STOP_PAYMENT_REQUEST_CREATE");
    
    if (this.currentView === "") {
      if (this.hasStopPaymentFeat) {
        this.renderStopChequeView(); 
      } else if (visibleChequeBooks) {
        this.renderChequeBooksView();
      } else {
        this.renderMyChequesView();
      }
    }      
  },
  setIconVisibility: function(){
    var isSingleCutomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    if(isSingleCutomerProfile){
      return false;
    }
    var unique = new Set();
    var showError = applicationManager.getUserPreferencesManager().accessibleCustomerIds.some(element => unique.size === unique.add(element.type).size);  
    var result = showError ? false : true;
    return result;
  },
  postShow:function(){
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
    var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
  },
  navigateToReviewScreen:function(){
    var review = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    review.commonFunctionForNavigation("frmCMReview");
  },
  navigateToTransactionDetails:function(){
    var navMan=applicationManager.getNavigationManager();
    var data = this.view.segStopCheque.data[this.view.segStopCheque.selectedIndex[1]];
    navMan.setCustomInfo("frmChequeTransactionDetails",{"data":data,"tabSelection":this.tabSelection});
    navMan.navigateTo({"friendlyName" : "frmChequeTransactionDetails", "appName" : "ArrangementsMA"});
  },
  navigateToSearch:function(){
    var search = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    search.commonFunctionForNavigation({"friendlyName" : "frmCMSearch", "appName" : "ArrangementsMA"});
  },
  navigateToAccounts:function(){
    var presentation = applicationManager.getModulesPresentationController({"moduleName" : "ChequeManagementUIModule", "appName" : "ArrangementsMA"});
    presentation.stateNavigation=true; // Setting the value for state management  
    presentation.stateTriggeredForm="frmChequeManagement";
    presentation.navigateToAccountScreen();
    presentation.entryFormForAccounts="frmChequeManagement";
  },
  getWidgetDataMap:function(){
    return {
      "lblChequeNo":"booksCount",
      "lblDate":"lblDate",
      "lblStatus":"lblStatus",
      "flxDot":"image",
      "lblAccountNo":"lblAccountNo"
    };
  },
  bindTransactions:function(data){
    this.view.segStopCheque.widgetDataMap=this.getWidgetDataMap();
    this.view.segStopCheque.setData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  navigateBack:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  setFooter:function(){
    this.view.customFooter.lblAccounts.skin = "sknlbl727272SSP20px";
    this.view.customFooter.flxAccSelect.setVisibility(false);
    this.view.customFooter.lblTransfer.skin = "sknlbl727272SSP20px";
    this.view.customFooter.flxTransferSel.setVisibility(false);
    this.view.customFooter.lblBillPay.skin = "sknlbl727272SSP20px";
    this.view.customFooter.flxBillSelected.setVisibility(false);
    this.view.customFooter.lblMore.skin = "sknLbl424242SSP20px";
    this.view.customFooter.flxMoreSelect.setVisibility(true);
  },
  bindError: function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
});