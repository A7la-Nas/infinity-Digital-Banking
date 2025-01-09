define({ 

 //Type your controller code here 
 onViewCreated:function(){
    try{
      this.view.flxImgChevron.onClick = this.rowOnClick;
      //this.view.flxTransactionsHeader.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!"+exc);
    }
  },

  rowOnClick :function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var navManager = applicationManager.getNavigationManager();
      var formName=navManager.getCurrentForm();
      if(formName ==="UnifiedTransferFlowUIModule/frmSameBankNew"|| formName ==="UnifiedTransferFlowUIModule/frmDomesticTransferNew" ||
         formName.friendlyName ==="UnifiedTransferFlowUIModule/frmP2PTransferNew" || formName ==="UnifiedTransferFlowUIModule/frmInternationalTransferNew"){
         var controller =_kony.mvc.GetController("MakeATransferUTF", true);
      }
     else
      var controller =_kony.mvc.GetController("MakeATransfer", true);
      controller.rowExpandCollapse({section:secIndex,row:rowIndex});      
    }
    catch(exc){
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },

 });