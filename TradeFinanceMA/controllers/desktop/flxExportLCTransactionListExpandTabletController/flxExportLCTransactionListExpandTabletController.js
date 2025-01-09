define({ 

  onViewCreated:function(){
    try{
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxDropDown.imgDropdown.src = "uparrow.png";
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxLCTransactions.flxActionTab.btnAction.onClick = this.viewDetailsOnClick;
      this.view.flxMain.flxLCTransaction.flxLCRowDetails.flxActions.btnCreateNewLC.onClick = this.createNewDrawingOnClick;
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
  },

  createNewDrawingOnClick: function(eventobject, context) {
    try {
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("onClickCreateNewDrawing", {
        section: secIndex,
        row: rowIndex
      });
    } 
    catch (ex) {
      var errMsg = ex;
    }
  }
});