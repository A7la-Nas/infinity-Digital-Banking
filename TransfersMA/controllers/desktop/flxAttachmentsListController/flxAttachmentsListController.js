define({
    removeClicked: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.setContentOffset({
            x: "0%",
            y: "0%"
        }, true);
        currentForm.flxDialogs.setVisibility(true);
        currentForm.flxAttachmentsPopup.setVisibility(true);
        currentForm.flxAttachmentsPopup.AttachmentsPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupHeading");
        currentForm.flxAttachmentsPopup.AttachmentsPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.RemoveAttachmentPopupMsg");
        currentForm.flxAttachmentsPopup.AttachmentsPopup.btnYes.onClick = this.deleteAttachment;
        currentForm.flxAttachmentsPopup.AttachmentsPopup.btnNo.onClick = this.closeAttachmentsPopup;
        currentForm.forceLayout();
    },
    deleteAttachment: function() {
        var index = kony.application.getCurrentForm().segAddedDocuments.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var deletedAttachment = kony.application.getCurrentForm().segAddedDocuments.data[rowIndex];
        kony.application.getCurrentForm().segAddedDocuments.removeAt(rowIndex, sectionIndex);
        this.closeAttachmentsPopup();
        var controller = _kony.mvc.GetController('frmMakePayment', true);
        controller.removeAttachments(deletedAttachment);
    },
    closeAttachmentsPopup: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxAttachmentsPopup.setVisibility(false);
    },
    fileClicked: function() {
        var currentForm = kony.application.getCurrentForm();
        var index = kony.application.getCurrentForm().segAddedDocuments.selectedRowIndex;
        if (index.length >= 2) {
            var rowIndex = index[1];
            var attachmentClicked = {};
            attachmentClicked.fileName = kony.application.getCurrentForm().segAddedDocuments.data[rowIndex].filename;
            if (kony.application.getCurrentForm().segAddedDocuments.data[rowIndex].fileID)
                attachmentClicked.fileID = kony.application.getCurrentForm().segAddedDocuments.data[rowIndex].fileID;
            currentForm.setContentOffset({
                x: "0%",
                y: "0%"
            }, true);
            currentForm.flxDialogs.setVisibility(true);
            currentForm.flxDownloadsPopup.setVisibility(true);
            currentForm.btnCancel.onClick = this.closeFilesPopup;
            currentForm.btnDownload.onClick = this.downloadAttachment;
            this.setDownloadSegmentData(attachmentClicked);
        }
    },
    setDownloadSegmentData: function(attachmentClicked) {
        var currForm = kony.application.getCurrentForm();
        currForm.segDownloadItems.setData([]);
        var downloadAttachmentsData = [];
        downloadAttachmentsData[0] = {};
        downloadAttachmentsData[0].filename = attachmentClicked.fileName;
        if (attachmentClicked.fileID)
            downloadAttachmentsData[0].fileID = attachmentClicked.fileID;
        downloadAttachmentsData[0]["imgDownloadAttachment"] = {
            "src": "download_blue.png"
        };
        currForm.segDownloadItems.widgetDataMap = {
            "lblDownloadAttachment": "filename",
            "imgDownloadAttachment": "imgDownloadAttachment",
            "lblDownloadAttachmentID": "fileID"
        };
        currForm.segDownloadItems.setData(downloadAttachmentsData);
    },
    closeFilesPopup: function() {
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxDialogs.setVisibility(false);
        currentForm.flxDownloadsPopup.setVisibility(false);
    },
    downloadAttachment: function() {
        var currentForm = kony.application.getCurrentForm();
        var segmentData = currentForm.segDownloadItems.data;
        if (segmentData.length > 0) {
            var file = segmentData[0];
            var controller = _kony.mvc.GetController('frmMakePayment', true);
            controller.downloadAttachment(file);
        }
    },
});