define({  
  onSectionClick :function(context){
    this.executeOnParent("sectionClicked",context);
  },
  toggleCheckBox: function(context){
    this.executeOnParent("toggleSegmentAccountCheckbox",context);
  },
});