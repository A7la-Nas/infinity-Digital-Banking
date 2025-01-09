define({

    //Type your controller code here 
    downloadSingleFile: function() {
        var index = kony.application.getCurrentForm().segDownloadItems.selectedRowIndex;
        if (index.length >= 2) {
            var rowIndex = index[1];
            var currForm = kony.application.getCurrentForm();
            var formName = currForm.id;
            var downloadedAttachment = currForm.segDownloadItems.data[rowIndex];
            if (formName === "frmScheduledPaymentsEurNew" || formName === "frmAccountsDetails") {
                var controller = _kony.mvc.GetController(formName, true);
                controller.downloadSingleFile(downloadedAttachment);
            } else if (formName === "frmMakePayment") {
                var controller = _kony.mvc.GetController('frmMakePayment', true);
                controller.downloadAttachment(downloadedAttachment);
            }
        }
    }
});