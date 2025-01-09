define({ 

 //Type your controller code here 
    downloadSingleFile: function() {
        var index = kony.application.getCurrentForm().segDownloadItems.selectedRowIndex;
        var rowIndex = index[1];
        var downloadedAttachment = kony.application.getCurrentForm().segDownloadItems.data[rowIndex];
        var controller = kony.mvc.getController('frmPastPaymentsEurNew', true);
        controller.downloadSingleFile(downloadedAttachment);
    },
});