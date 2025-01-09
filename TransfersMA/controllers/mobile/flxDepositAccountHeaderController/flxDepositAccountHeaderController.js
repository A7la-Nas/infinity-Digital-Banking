define({ 

 

 //Type your controller code here 
 onViewCreated:function(){
    try{
      this.view.flxImage.onClick = this.rowOnClick;
      //this.view.flxTransactionsHeader.onClick = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!"+exc);
    }
  },

 

  rowOnClick :function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      var controller =_kony.mvc.GetController("P2PActivation", true);
      controller.rowExpandCollapse({section:secIndex,row:rowIndex});  
    }
    catch(exc){
      //alert(JSON.stringify(exc));
      console.error(exc);
      kony.print("exception in rowonClick!!!"+exc);
    }
  },

 

 });