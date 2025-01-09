define({
    //Type your controller code here
    DeleteAttachment: function() {
        var index;
        var sectionIndex;
        var rowIndex;
        if (kony.application.getCurrentForm().id === "frmNewMessages" || kony.application.getCurrentForm().id === "frmMyMessages" || kony.application.getCurrentForm().id === "frmMessgaeDetailsMobile") {
            index = kony.application.getCurrentForm().segAttachment.selectedRowIndex;
            sectionIndex = index[0];
            rowIndex = index[1];
            kony.application.getCurrentForm().segAttachment.removeAt(rowIndex, sectionIndex);
        } else {
            index = kony.application.getCurrentForm().NotficationsAndMessages.segAttachment.selectedRowIndex;
            sectionIndex = index[0];
            rowIndex = index[1];
            kony.application.getCurrentForm().NotficationsAndMessages.segAttachment.removeAt(rowIndex, sectionIndex);
        }
    }
});