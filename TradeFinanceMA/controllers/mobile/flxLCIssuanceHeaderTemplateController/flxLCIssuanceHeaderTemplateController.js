define({ 

 //Type your controller code here 
   /* Method Name : onViewCreated
    * Method to bind the row click event.
	 @return : NA
   */
 onViewCreated:function(){
   
    try{
      this.view.flxImgLCIsuanceHeader.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!" + exc);
    }
  },

  /* Method Name : rowOnClick
   * Method to get the selected section and row index.
	 @return : NA
   */

  rowOnClick:function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
       var controller = _kony.mvc.GetController("DetailType", true);
       controller.expandCollapse({section:secIndex,row:rowIndex});
    }
    catch(exc){ 
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },
 
 });