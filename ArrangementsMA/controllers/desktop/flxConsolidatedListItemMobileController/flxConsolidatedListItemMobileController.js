define({ 

 //Type your controller code here 
  toggleSegRowCheckBox: function(eventobject, context,isSecondRow){
    var rowIndex=context["rowIndex"];
    var sectionIndex=context["sectionIndex"];
    var params={"sectionIndex":sectionIndex,"rowIndex":rowIndex};
    this.executeOnParent("toggleSegmentRowCheckbox",params);
  },

 });