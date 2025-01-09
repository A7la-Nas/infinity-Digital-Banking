define({ 

 //Type your controller code here 
  removeClicked: function(eventObject,context) {
    var currentForm = kony.application.getCurrentForm();
    currentForm.setContentOffset({x:"0%",y:"0%"}, true);
    currentForm.flxConfirmationPopUp.setVisibility(true);
    currentForm.flxConfirmationPopUp.flxYes.onClick = this.deleteAttachment.bind(this,context.rowIndex);
    currentForm.flxConfirmationPopUp.flxNo.onClick = this.closeAttachmentsPopup;
  },
  deleteAttachment: function(rowIndex) {
    var deletedAttachment = kony.application.getCurrentForm().segAttachments.data[rowIndex];
    kony.application.getCurrentForm().segAttachments.removeAt(rowIndex);
    this.closeAttachmentsPopup();
    var formName = kony.application.getCurrentForm().id;
    var controller = _kony.mvc.GetController(formName, true);
    controller.removeAttachments(deletedAttachment);
  },
  closeAttachmentsPopup: function() {
    var currentForm = kony.application.getCurrentForm();
    currentForm.flxConfirmationPopUp.setVisibility(false);
  },
 });