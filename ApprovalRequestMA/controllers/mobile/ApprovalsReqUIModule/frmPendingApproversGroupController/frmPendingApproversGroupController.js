define(function(){

  return {
    onInit : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShowfunc;  
    },


    onNavigate:function()
    {
      try { 
      }catch(error){
        kony.print(" onnavigateerror-->"+error);
      }
    },

    preShowfunc:function()
    {
      try {   
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.flxHeader.isVisible = true;
        }
        this.bindevents();
        this.pendingListLoad();
      }catch(error){
        kony.print(" preShowfunc-->"+error);
      }
    },


    ///////********bindevents is used set thewidgets onclick and initialise the data*****////////

    bindevents:function()
    {
      try {  
        this.view.customHeader.flxBack.onClick = this.backNavigation;
        this.view.onDeviceBack=this.backNavigation;
        this.view.segPendingApproverlist.onRowClick=this.onRowClickpendingList;     
      }catch(error){
        kony.print(" bindevents-->"+error);
      }       
    },
    backNavigation:function(){
     try{
      var navManager = applicationManager.getNavigationManager();    
        navManager.goBack();      
    }catch(er){
      kony.print(er);
    }
    },

    ///////********pendingListLoad is used set the list*****////////

    pendingListLoad:function()
    {
      try {
        var self=this;
        var navManager = applicationManager.getNavigationManager();
        var pendingRequestDetails = navManager.getCustomInfo("PendingRequestDetails");
        var perTrans = false;
        var dailyTrans = false;
        var weeklyTrans = false;
        var nonMonetoryLimit = false;
        var pendingListArray=[];
        if(!kony.sdk.isNullOrUndefined(pendingRequestDetails.pendingGroupRules)){              
          for(var j=0;j<pendingRequestDetails.pendingGroupRules.length;j++){
            if(pendingRequestDetails.pendingGroupRules[j].limitTypeId === "WEEKLY_LIMIT"){
              weeklyTrans=true;
            }else if(pendingRequestDetails.pendingGroupRules[j].limitTypeId === "DAILY_LIMIT"){
              dailyTrans=true;
            }else if(pendingRequestDetails.pendingGroupRules[j].limitTypeId === "MAX_TRANSACTION_LIMIT"){
              perTrans=true;
            }else if(pendingRequestDetails.pendingGroupRules[j].limitTypeId === "NON_MONETARY_LIMIT"){
              nonMonetoryLimit=true;
            }
          }
          
          if(perTrans){
            pendingListArray.push({"title":kony.i18n.getLocalizedString("i18n.pendingApprovers.PerTransactionApprovals")});
          }
          if(weeklyTrans){
            pendingListArray.push({"title":kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction")});
          }
          if(dailyTrans){
            pendingListArray.push({"title":kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction")});
          }
          if(nonMonetoryLimit){
            pendingListArray.push({"title":kony.i18n.getLocalizedString("i18n.ApprovalRequest.NonMonetoryLimit")});
          }
          
            if(!perTrans && !dailyTrans && !weeklyTrans && !nonMonetoryLimit){
               pendingListArray = [{"title":kony.i18n.getLocalizedString("i18n.transfers.noTransactions")}];
            }

        }else{
          pendingListArray = [{"title":kony.i18n.getLocalizedString("i18n.transfers.noTransactions")}];
        }

        var segDataArray=[];
        if(Array.isArray(pendingListArray)){
          for(var i=0;i<pendingListArray.length;i++){
            var json={ 
              "lblTitle":pendingListArray[i].title,
              "imgArrow":{src:(kony.i18n.getCurrentLocale() === 'ar_AE') ? "chevron_reverse.png":"chevron.png"},
              "lblSeparator":{isVisible:false},
              "flxsep":{skin:"sknflxe7e7e7"}
            };
            segDataArray.push(json);
          }
        }else{
          kony.print("not a array -->");
        }
        this.view.segPendingApproverlist.setData(segDataArray);
        
      }catch(error){
        kony.print("pendingListLoad -->"+error);
      }       
    },



    ///////********onRowClickpendingList is used to Navigation of list*****////////

    onRowClickpendingList:function()
    {
      try { 
        var index= this.view.segPendingApproverlist.selectedIndex[1];
        var selRowItems = this.view.segPendingApproverlist.selectedItems[0];
        var formFlow="";  
        var navManager = applicationManager.getNavigationManager();
        switch(selRowItems.lblTitle){
          case kony.i18n.getLocalizedString("i18n.pendingApprovers.PerTransactionApprovals"):
            formFlow = "MAX_TRANSACTION_LIMIT"
            navManager.setCustomInfo("PendingApproverRequestType",formFlow);
            navManager.navigateTo("frmPendingApprovers");
            break;

          case kony.i18n.getLocalizedString("kony.userMgmt.dailyTransaction"):
            formFlow ="DAILY_LIMIT";           
            navManager.setCustomInfo("PendingApproverRequestType",formFlow);
            navManager.navigateTo("frmPendingApprovers");
            break;

          case kony.i18n.getLocalizedString("kony.userMgmt.weeklyTransaction"):
            formFlow ="WEEKLY_LIMIT";              
            navManager.setCustomInfo("PendingApproverRequestType",formFlow);
            navManager.navigateTo("frmPendingApprovers");
            break;
            
            case kony.i18n.getLocalizedString("i18n.ApprovalRequest.NonMonetoryLimit"):
            formFlow ="NON_MONETARY_LIMIT";              
            navManager.setCustomInfo("PendingApproverRequestType",formFlow);
            navManager.navigateTo("frmPendingApprovers");
            break;
        }
      }catch(error){
        kony.print("onRowClickpendingList -->"+error);
      }       
    }

  };
});