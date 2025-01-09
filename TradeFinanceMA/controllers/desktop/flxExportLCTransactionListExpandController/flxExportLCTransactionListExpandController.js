define({ 

  //Type your controller code here 
  onViewCreated:function(){
    try{
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxDropDown.imgDropdown.src = "uparrow.png";
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
      this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxLCTransactions.flxActionTab.btnAction.onClick = this.viewDetailsOnClick; 
      this.view.flxMain.flxLCTransaction.flxLCRowDetails.flxActions.btnCreateNewLC.onClick = this.createNewDrawingOnClick;
	  }catch(exc){
        kony.print("Exception in onViewCreated!!!"+exc);
      }
  },
  rowOnClick :function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("segLOCOnRowClick",{section:secIndex,row:rowIndex});
    }catch(exc){
      kony.print("exception in rowonClick!!!"+exc);
    }
  },
  viewDetailsOnClick: function(eventobject, context) {
    try {
      kony.print("Entered viewDetailsOnClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("onClickViewDetails", {
        section: secIndex,
        row: rowIndex
      });
    } catch (exc) {
      kony.print("exception in viewDetailsOnClick!!!" + exc);
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