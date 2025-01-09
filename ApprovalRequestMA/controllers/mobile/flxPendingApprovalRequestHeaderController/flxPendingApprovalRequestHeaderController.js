define({ 

 //Type your controller code here
   onViewCreated:function(){
    try{
      //this.view.flxContent.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!"+exc);
    }
  },

  rowOnClick :function(eventobject,context){
    try{
      alert("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.view.headerSelectionDetected({section:secIndex,row:rowIndex});
      //this.executeOnParent("headerSelectionDetected",{section:secIndex,row:rowIndex});
    }catch(exc){
      kony.print("exception in rowonClick!!!"+exc);
    }
  },

 });