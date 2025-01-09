define({ 

   /* Method Name : onViewCreated
    * Method to bind the row click event.
	 @return : NA
   */
 onViewCreated:function(){
   
    try{
      this.view.flxheaderWithDropdown.flxDropDown.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!" + exc);
    }
  },

  /* Method Name : rowOnClick
   * Method to get the selected section and row index.
	 @return : NA
   */

  rowOnClick :function(eventobject,context){
    try{
      this.view.flxDropDown.setEnabled(true);
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var currentform = kony.application.getCurrentForm().id;
			var controller="";
			if (currentform === "frmExportLCDetails"){
				  controller = _kony.mvc.GetController("ExportLCDetails", true);
			}else{
				  controller = _kony.mvc.GetController("LCIssuance", true);
			}
      controller.expandCollapse({section:secIndex,row:rowIndex});
    }
    catch(exc){ 
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },

 

 });