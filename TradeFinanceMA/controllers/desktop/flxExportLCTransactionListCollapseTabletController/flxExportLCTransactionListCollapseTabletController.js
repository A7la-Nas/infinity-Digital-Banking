define({ 

  onViewCreated:function(){
    try{
      this.view.flxMain.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
      this.view.flxMain.flxLCTransactionListRow.flxLCTransactions.flxColumn.flxColumn7.btnAction1.onClick = this.viewDetailsOnClick;
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
  },
  
  viewDetailsOnClick: function(eventobject, context) {
    try {
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("onClickViewDetails", {
        section: secIndex,
        row: rowIndex
      });
    } 
    catch (ex) {
      var errMsg = ex;
    }
  }
});