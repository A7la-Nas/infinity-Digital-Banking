define({ 

 //Type your controller code here 
 onViewCreated:function(){
    try{
      this.view.flxShowHide.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!" + exc);
    }
  },

  rowOnClick :function(eventobject,context){
    try{
      this.view.flxShowHide.setEnabled(true);
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("rowExpandCollapse",{section:secIndex,row:rowIndex});
    }
    catch(exc){ 
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },

 });