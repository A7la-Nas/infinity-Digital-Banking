define({ 

  //Type your controller code here 
  imgPressed: function(context) {
    var currForm = kony.application.getCurrentForm();
    var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
    var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
    var segmentData = currForm.segListOfDocuments.data[index];
    var data = {
			selectedDocData: segmentData
		};
		var navManager = applicationManager.getNavigationManager();
        navManager.updateForm(data);
  }
});