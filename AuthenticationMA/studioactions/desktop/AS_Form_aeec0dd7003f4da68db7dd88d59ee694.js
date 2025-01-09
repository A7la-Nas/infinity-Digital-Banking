function AS_Form_aeec0dd7003f4da68db7dd88d59ee694(eventobject) {
    var self = this;
    this.onPostShow();
    if (!this.isOriginationFlow) {
        applicationManager.getTypeManager().initialiseAccountTypeManager();
        applicationManager.getTypeManager().initialiseTransactionTypeManager();
        applicationManager.getTypeManager().initialisePfmTypeManager();
    }
}