define({ 

 //Type your controller code here 
  removeClicked: function() {
    var currentForm = kony.application.getCurrentForm();
    currentForm.setContentOffset({x:"0%",y:"0%"}, true);
    currentForm.flxConfirmationPopUp.setVisibility(true);
    currentForm.flxConfirmationPopUp.flxYes.onClick = this.deleteAttachment;
    currentForm.flxConfirmationPopUp.flxNo.onClick = this.closeAttachmentsPopup;
  },
  deleteAttachment: function() {
    var index = kony.application.getCurrentForm().segAttachmentsList.selectedRowIndex;
    var sectionIndex = index[0];
    var rowIndex = index[1];
    var deletedAttachment = kony.application.getCurrentForm().segAttachmentsList.data[rowIndex];
    kony.application.getCurrentForm().segAttachmentsList.removeAt(rowIndex, sectionIndex);
    this.closeAttachmentsPopup();
    var controller = _kony.mvc.GetController('frmEuropeVerifyTransferDetails', true);
    controller.removeAttachments(deletedAttachment);
  },
  closeAttachmentsPopup: function() {
    var currentForm = kony.application.getCurrentForm();
    currentForm.flxConfirmationPopUp.setVisibility(false);
  },
 });