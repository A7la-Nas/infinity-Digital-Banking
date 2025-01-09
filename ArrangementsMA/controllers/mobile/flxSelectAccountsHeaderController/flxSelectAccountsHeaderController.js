define({ 

 //Type your controller code here 
	onSectionClick :function(context){
    //var sectionIndex = context.sectionIndex;
    this.executeOnParent("sectionClicked",context);
  }
 });