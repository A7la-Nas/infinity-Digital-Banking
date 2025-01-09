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
        kony.print("frmACH onnavigateerror-->"+error);
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
        this.achListLoad();
      }catch(error){
        kony.print("frmACHTransactionsdetails preShowfunc-->"+error);
      }
    },


    ///////********bindevents is used set thewidgets onclick and initialise the data*****////////

    bindevents:function()
    {
      try {  
        this.view.customHeader.flxBack.onClick = this.backNavigation;
        this.view.onDeviceBack=this.backNavigation;
        this.view.segAchlist.onRowClick=this.onRowClickACHList;     
      }catch(error){
        kony.print("frmACHTransactionsdetails bindevents-->"+error);
      }       
    },
    backNavigation:function(){
      try{
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule", "appName": "HomepageMA"});
        accountMod.presentationController.showDashboard();
      }catch(er){

      }
    },
    ///////********achListLoad is used set the Achlist*****////////

    achListLoad:function()
    {
      try {
        var self=this;
        var achFilesPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_FILE_VIEW");
        //var achTransactionArr = ["ACH_COLLECTION_VIEW","ACH_PAYMENT_VIEW"];
        //var achTransactionPermission = achTransactionArr.some(applicationManager.getConfigurationManager().checkUserPermission.bind(self));
        var achCollectionPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_COLLECTION_VIEW");
        var achPaymentPermission = applicationManager.getConfigurationManager().checkUserPermission("ACH_PAYMENT_VIEW");

        var achListArray= [];

        kony.print("achFilesPermission:"+ achFilesPermission+" achCollectionPermission:"+ achCollectionPermission+" achPaymentPermission::"+ achPaymentPermission);

        if((achCollectionPermission === true || achPaymentPermission === true) && achFilesPermission === true ){
          achListArray=[ {"title":"Transactions"},
                        {"title":"ACH Files"}];
        }else if((achCollectionPermission === true || achPaymentPermission === true) && achFilesPermission === false){
          achListArray=[ {"title":"Transactions"}
                       ];
        }else if((achCollectionPermission === false && achPaymentPermission === false)  && achFilesPermission === true){
          achListArray=[ {"title":"ACH Files"}
                       ];
        }

        var segDataArray=[];
        if(Array.isArray(achListArray)){
          for(var i=0;i<achListArray.length;i++){
            var json={ 
              "lblTitle":achListArray[i].title,
              "imgArrow":{src:"chevron.png"},
              "lblSeparator":{isVisible:false},
              "flxsep":{skin:"sknflxe7e7e7"}
            };
            segDataArray.push(json);
          }
        }else{
          kony.print("not a array -->");
        }
        this.view.segAchlist.setData(segDataArray);
      }catch(error){
        kony.print("ACHFileListload -->"+error);
      }       
    },



    ///////********achlist_rowclick is used to Navigation of list*****////////

    onRowClickACHList:function()
    {
      try { 
        var index= this.view.segAchlist.selectedRowIndex[1];
        var selRowItems = this.view.segAchlist.selectedRowItems[0];
        var formFlow={};  
        var navManager = applicationManager.getNavigationManager();
        switch(selRowItems.lblTitle){
          case "Transactions":
            formFlow = {
              "formName":"ACHTransaction"
            };                       

            navManager.setCustomInfo("ACHTransactions",formFlow);
            navManager.navigateTo("frmACHTransactions");
            break;

          case "ACH Files":
            formFlow = {
              "formName":"ACHFile"
            };   
            navManager.setCustomInfo("ACHTransactions",formFlow);
            navManager.navigateTo("frmACHTransactions");
            break;
        }
      }catch(error){
        kony.print("AchTransation -->"+error);
      }       
    }

  };
});