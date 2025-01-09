define({ 

  accountLevelActionsJson:"",
  accountLevelActionsMainCopy:"",
  otherFeaturesGlobalCopy:"",
  timerCounter:0,

  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.preShow = this.preShowfunction;
    this.BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');
  },

  onNavigate : function() {
    try {

    } catch(error) {
      alert("onNavigate error-->"+error);
    }
  },

  preShowfunction : function() {
    try {
      this.fetchAccounts();
      this.bindevents();
    } catch(err){

    }
  },

  bindevents : function() {
    try {
      this.view.segUserPermission.removeAll();
      this.view.lblNodatafound.isVisible = false;
      this.view.customHeader.flxBack.onClick = this.back;
      this.view.onDeviceBack = this.back;
      this.view.flxPopup.setVisibility = false;
      var navManager = applicationManager.getNavigationManager();
      var fromType = navManager.getCustomInfo("userdetailpermission");

      if(fromType==="AccountLevelPermissions"){//this condition for accountlevel permission
        this.view.segUserPermission.onRowClick = this.onRowclickAccountLevelPermissions;
        if(applicationManager.getPresentationFormUtility().getDeviceName() ==="iPhone"){       
          this.view.title =  kony.i18n.getLocalizedString("kony.mb.user.levelPermission");
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.user.levelPermission");
          this.view.flxHeader.isVisible = true;
        }    
      }else{/////this condition for Transtion Limit
        this.view.segUserPermission.onRowClick = this.onRowclickTranstionLimit;
        if(applicationManager.getPresentationFormUtility().getDeviceName() ==="iPhone"){
          this.view.title = kony.i18n.getLocalizedString("kony.mb.user.transationLimit");
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.user.transationLimit");
          this.view.flxHeader.isVisible = true;
        }  
      }

    } catch(err){
      alert("Bindevents error-->"+err);
    }
  },

  fetchAccounts:function(){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var data= navManager.getCustomInfo("UsermangementUsername");
      var  userName =data.userName;
      var BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');       
      BussinessBankingModule.presentationController.fetchUser(userName); 
    }catch(er){
      kony.print("transaction"+er);
    }
  },

  fetchUserRoleActionSuccessCallBack:function(response){
    try{
      this.dataProccess(response);     
      var segAccountArray=[];  
      if(!kony.sdk.isNullOrUndefined(response)){
        if(Array.isArray(response.accounts)){
          for(var j=0;j<response.accounts.length;j++){
            var json={ 
              "lblNameVal":response.accounts[j].AccountName,
              "accountName": response.accounts[j].AccountName,
              "imgArrowIcon":{src:"segmentarrow.png"}
            };
            segAccountArray.push(json);
          }
        }
      }
      else{
        kony.print("not a array -->");
      }
      this.view.segUserPermission.setData(segAccountArray);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(er){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("navigatetoPermission--->error"+er);
    }
  },

  dataProccess:function(response){
    try{
      var dataStore = segregateFeatureDataForManageUser(response);
      if(!(kony.sdk.isNullOrUndefined(dataStore["notAccountLevel"]))){			
        for(var i=0;i<dataStore["notAccountLevel"].length;i++){ //for every feature				
          var flag=0;
          for(var k=0;k<dataStore["notAccountLevel"][i]["Actions"].length;k++){
            if(dataStore["notAccountLevel"][i]["Actions"][k]["isSelected"]){
              flag=1;
              dataStore["notAccountLevel"][i]["isSelected"]=true;
              break;
            }
            if(flag===0){
              dataStore["notAccountLevel"][i]["isSelected"]=false;
            }
          }
        }
      }
      if (!(kony.sdk.isNullOrUndefined(dataStore["userDataStore"])) && !(kony.sdk.isNullOrUndefined(dataStore["accountlevelActions"])) && !(kony.sdk.isNullOrUndefined(dataStore))) {
        this.accountLevelActionsJson      =  cloneJSON(dataStore["accountlevelActions"]);
        this.accountLevelActionsMainCopy  =  cloneJSON(dataStore["accountlevelActions"]);
        this.otherFeaturesGlobalCopy      =  cloneJSON(dataStore["notAccountLevel"]);
      }
    }catch(er){
      kony.print("dataProccess--->error"+er);
    }
  },
  back:function(){
    try{
      var navMan=applicationManager.getNavigationManager();
      navMan.navigateTo("UserDetailsPermission");
    }catch(er){
      kony.print("navigatetoPermission--->error"+er);
    }
  },

  onRowclickAccountLevelPermissions:function(){
    try{
      var selectedItem=this.view.segUserPermission.selectedRowItems[0];
      var heading=selectedItem.accountName;
      var selectedRowData;
      for(var i=0;i<this. accountLevelActionsJson.length;i++)
      {
        if(heading===this.accountLevelActionsJson[i].accountName)
        {
          selectedRowData=this.accountLevelActionsJson[i];
        }
      }
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("usermgmtAccountName",heading); 
      navManager.setCustomInfo("usermgmtAccountlevelpermission",selectedRowData);
      navManager.navigateTo("AccountPermissions"); 

    }catch(er){
      kony.print("navigatetoPermission--->error"+er);
    }
  },

  onRowclickTranstionLimit:function(){
    try{
      var selectedItem=this.view.segUserPermission.selectedRowItems[0];
      var heading=selectedItem.accountName;
      var selectedRowData;
      for(var i=0;i<this. accountLevelActionsJson.length;i++)
      {
        if(heading===this.accountLevelActionsJson[i].accountName)
        {
          selectedRowData=this.accountLevelActionsJson[i];
        }
      }
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("usermgmtAccountName",heading); 
      navManager.setCustomInfo("usermgmtTranstionLimit",selectedRowData);
      navManager.navigateTo("UserManagementTransactionLimits"); 
    }catch(er){
      kony.print("onRowclickTranstionLimit--->error"+er);
    }
  },

  fetchErrorBack:function(response)
  {
    try {   
      if(!kony.sdk.isNullOrUndefined(response)){
        var scopeObj=this;
        var errorResponse = "";
        if(!kony.sdk.isNullOrUndefined(response.errorMessage)){
          errorResponse = response.errorMessage;
        }
        else{
          errorResponse = kony.i18n.getLocalizedString("kony.mb.servicesErrormsg");
        }
        this.view.customPopup.lblPopup.text = errorResponse;    
        if(!kony.sdk.isNullOrUndefined(this.timerCounter)){
          this.timerCounter = parseInt(this.timerCounter)+1;
        }
        else{
          this.timerCounter = 1;
        }
        var timerId="timerPopupError"+this.timerCounter;
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";   
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
          scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);            
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }  } 


});