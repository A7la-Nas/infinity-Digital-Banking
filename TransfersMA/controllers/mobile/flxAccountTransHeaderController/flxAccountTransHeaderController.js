define({
  onViewCreated:function(){
    try{
      this.view.flximgUp.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!"+exc);
    }
  },

  rowOnClick :function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var formName = kony.application.getCurrentForm().id;
      if(formName === "frmEuropeTransferToAccount" || formName === "frmEuropeTransferToAccountSM" || formName === "frmEuropeTransferFromAccount" || formName === "frmQRFromAccount"){
        var controller = _kony.mvc.GetController(formName, true);
      }
      controller.rowExpandCollapse({section:secIndex,row:rowIndex});      
    }
    catch(exc){
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },


});