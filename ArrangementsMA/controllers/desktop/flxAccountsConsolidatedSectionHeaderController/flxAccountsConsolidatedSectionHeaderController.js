define({ 
 toggleCheckBox: function(eventobject, context){
   var rowIndex=context["rowIndex"];
   var sectionIndex=context["sectionIndex"];
   this.executeOnParent("toggleSegmentAccountCheckbox",sectionIndex,rowIndex);
    },
  toggleSegment: function (eventobject, context) {
     var sectionIndex = context["sectionIndex"];
     var rowIndex = context["rowIndex"];
     var currForm = kony.application.getCurrentForm();
     this.executeOnParent("toggleAccountsSegment",{sectionIndex:sectionIndex, rowIndex:rowIndex});
     currForm.forceLayout();
   }
 });