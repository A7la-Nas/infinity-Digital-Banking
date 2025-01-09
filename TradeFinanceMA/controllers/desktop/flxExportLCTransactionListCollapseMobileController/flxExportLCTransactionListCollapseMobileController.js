define({ 

 onViewCreated:function(){
    try{
      this.view.flxMain.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
    }
   catch(ex){
      var errMsg = ex;
    }
  },
  
  rowOnClick :function(eventobject,context){
    try{
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("segLOCOnRowClick",{section:secIndex,row:rowIndex});
    }
    catch(ex){
      var errMsg = ex;
    }
  }
 
 });