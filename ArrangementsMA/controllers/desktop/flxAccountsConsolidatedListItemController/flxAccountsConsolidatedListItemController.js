define({ 
  toggleSegRowCheckBox: function(eventobject, context,isSecondRow){
    var rowIndex=context["rowIndex"];
    var sectionIndex=context["sectionIndex"];
    var params={"sectionIndex":sectionIndex,"rowIndex":rowIndex,"isSecondRow":isSecondRow};
    this.executeOnParent("toggleSegmentRowCheckbox",params);
  },
});