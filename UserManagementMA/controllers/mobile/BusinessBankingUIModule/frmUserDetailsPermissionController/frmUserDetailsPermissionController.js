define({
  gblArray:[{Name:kony.i18n.getLocalizedString("kony.mb.user.levelPermission")},
            {Name:kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission")},
            {Name:kony.i18n.getLocalizedString("kony.mb.user.transationLimit")}],
  gblArrayDummy:[{Name:"Abitibi Consolidated Inc. (4789)"},
            {Name:"Temenos UK (4789)"},
            {Name:"Alstom (4789)"}],
  timerCounter:0,
  onNavigate : function() {
    try {
      kony.print("onNavigate");
      this.bindevents();
      this.segmentLoading();
      this.view.customHeader.flxBack.onClick = this.backNavigation;
      this.view.onDeviceBack = this.backNavigation;
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.userDetails.userDetails");

      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.userManagement.Selectcustomertoseethedetails");
    } catch(error) {
      kony.print("onNavigate error-->"+error);
    }
  },

  backNavigation:function(){
    try{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("UserDetails");
    }catch(er){
    }
  },

  bindevents : function() {
    try {
      this.view.flxPopup.isVisible = false;
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
      }
      this.view.segDetails.onRowClick=this.rowOnclickUserDetailsNew; //this.navigatetoPermission;

    } catch(err){
      kony.print("Bindevents error-->"+err);
    }
  },

  segmentLoading:function(){
    try{
//       var navManager = applicationManager.getNavigationManager();
//       var value = navManager.getCustomInfo("frmUserDetailsPermission");
//       var res=segregateFeatureDataForManageUser(value);
//       var areMonetaryPermissionpresent=cloneJSON(res["userDataStore"]["MONETARY"]);
//       var isuserCreatePermission = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_CREATE");
//       var row = this.gblArray;
//       if(areMonetaryPermissionpresent.length === 0)
//       {
//         row = [{Name:kony.i18n.getLocalizedString("kony.mb.user.levelPermission")},
//                {Name:kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission")}];

//       }
//       if(!isuserCreatePermission){
//         row = [{Name:kony.i18n.getLocalizedString("kony.mb.user.levelPermission")},
//                {Name:kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission")}];
//       }
      var navManager = applicationManager.getNavigationManager();
      var getUserdetailData = navManager.getCustomInfo("GetContractUserDetails");
      var row =getUserdetailData.companyList;
      var rowArray=[];
      if(row.length>0||row===undefined ||row===null){
        for(var i=0;i<row.length;i++){
          var obj={
            "lblNameVal":row[i].companyName+" ("+row[i].cif+")",
            "flxSeparate":{skin:"sknflxe7e7e7"},
            "imgArrowIcon":{src:"segmentarrow.png"},
            "data":row[i],
            
          };
          rowArray.push(obj);
        }
        this.view.segDetails.widgetDataMap = {
          "flxImg": "flxImg",
          "flxMain": "flxMain",
          "flxSeparate": "flxSeparate",
          "flxUserPermission": "flxUserPermission",
          "imgArrowIcon": "imgArrowIcon",
          "lblNameVal": "lblNameVal"
      }
        this.view.segDetails.setData(rowArray);
        this.view.segDetails.isVisible=true;
    }
    }catch(er){
      kony.print("transaction"+er);
    }
  },

  navigatetoPermission:function(){
    try{
      var fromname=this.view.segDetails.selectedRowItems[0];
      var heading;
      var formType;
      var navManager = applicationManager.getNavigationManager();
      if(fromname.lblNameVal === kony.i18n.getLocalizedString("kony.mb.user.levelPermission")){
        heading=kony.i18n.getLocalizedString("kony.mb.user.levelPermission");
        kony.print("navigatetoPermission--->");
        formType = "AccountLevelPermissions"; 
        navManager.setCustomInfo("userdetailpermission",formType);
        navManager.navigateTo("UserPermissions"); 
      }
      else if(fromname.lblNameVal === kony.i18n.getLocalizedString("kony.mb.user.transationLimit")){
        heading=kony.i18n.getLocalizedString("kony.mb.user.transationLimit");
        formType = "TransactionLimits"; 
        navManager.setCustomInfo("userdetailpermission",formType);
        navManager.navigateTo("UserPermissions");       
      }
      else if(fromname.lblNameVal === kony.i18n.getLocalizedString("kony.mb.usermanagement.otherfeaturepermission")){
        kony.print("navigatetoPermission--->");
        var value = navManager.getCustomInfo("UsermangementUsername");
        navManager.setCustomInfo("userdetailspermission","frmOtherFeaturePermissions");
        var  UserName =value.userName;
        var BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');      
        BussinessBankingModule.presentationController.fetchUserDetailsPermission(UserName);
      }

    }catch(er){
      kony.print("navigatetoPermission--->error"+er);
    }
  },
  rowOnclickUserDetailsNew:function(){
    try{
      var selectedItems = this.view.segDetails.selectedRowItems[0];
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("UserDetailsNew",selectedItems);
      navManager.navigateTo("frmUserDetailsNew");
    }catch(er){
      kony.print(er);
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