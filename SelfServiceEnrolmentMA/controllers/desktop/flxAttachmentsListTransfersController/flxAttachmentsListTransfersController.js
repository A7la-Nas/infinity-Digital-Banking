define({
    removeClickedInTransfers: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.setContentOffset({
            x: "0%",
            y: "0%"
        }, true);
        currentForm.flxDialogs.setVisibility(true);
        currentForm.flxAttachmentsPopup.setVisibility(true);
        currentForm.flxAttachmentsPopup.AttachmentsPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupHeading");
        currentForm.flxAttachmentsPopup.AttachmentsPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg");
        currentForm.flxAttachmentsPopup.AttachmentsPopup.btnYes.onClick = this.deleteAttachmentInTransfers;
        currentForm.flxAttachmentsPopup.AttachmentsPopup.btnNo.onClick = this.closeAttachmentsPopup;
        this.view.forceLayout();
    },
    deleteAttachmentInTransfers: function() {
        var index = kony.application.getCurrentForm().transfermain.maketransfer.segAddedDocuments.selectedRowIndex;
        if (index.length >= 2) {
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var deletedAttachment = kony.application.getCurrentForm().transfermain.maketransfer.segAddedDocuments.data[rowIndex];
            kony.application.getCurrentForm().transfermain.maketransfer.segAddedDocuments.removeAt(rowIndex, sectionIndex);
            this.closeAttachmentsPopup();
            var controller = _kony.mvc.GetController('frmTransfersEur', true);
            controller.removeAttachments(deletedAttachment);
        }
    },
    closeAttachmentsPopup: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxAttachmentsPopup.setVisibility(false);
    },
    showDownloadPopup: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxDialogs.setVisibility(true);
        currentForm.flxDownloadsPopup.setVisibility(true);
    }
});