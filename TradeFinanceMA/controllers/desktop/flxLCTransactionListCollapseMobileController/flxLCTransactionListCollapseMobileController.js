define({ 

 //Type your controller code here 
 onViewCreated:function(){
    try{
      this.view.flxMain.flxLCTransactionListRow.flxDropDown.onClick = this.rowOnClick;
      //cvbnm,./this.view.flxDropDown.onTouchStart = this.rowOnClick;
    }catch(exc){
      kony.print("Exception in onViewCreated!!!"+exc);
    }
  },
//   rowOnClick :function(eventobject,context){
//     try{
//       kony.print("Entered rowonClick");
//       var secIndex = context["sectionIndex"];
//       var rowIndex = context["rowIndex"];
//       var navManager = applicationManager.getNavigationManager();
//       var formName=navManager.getCurrentForm();
//       if(formName ==="form2"){
//          var controller = kony.mvc.GetController("ImportLCList", true);
//       }
//      else
//       var controller = kony.mvc.GetController("ImportLCList", true);
//       controller.segClick({section:secIndex,row:rowIndex}); 
//     }
//     catch(exc){
//       //alert(JSON.stringify(exc));
//       console.error(exc);
//       kony.print("exception in rowonClick!!!"+exc);
//     }
//   },
  rowOnClick :function(eventobject,context){
    try{
      kony.print("Entered rowonClick");
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];
      this.executeOnParent("segClick",{section:secIndex,row:rowIndex});
    }catch(exc){
      kony.print("exception in rowonClick!!!"+exc);
    }
  }
 

 });