define({ 

 onViewCreated:function(){
    try{
      this.view.flxMain.flxMainCollapse.flxLCTransactionListRow.flxDropDown.imgDropdown.src = "uparrow.png";
      this.view.flxMain.flxMainCollapse.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
      this.view.flxMain.flxMainExpand.flxLCTransaction.flxLCRow.flxLCDetails.flxActions.flxButtonRow1.btnViewDetails.onClick = this.viewDetailsOnClick;
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