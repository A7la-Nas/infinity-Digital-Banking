define(['CommonUtilities'], function(CommonUtilities) {

  return {
    postshow: function(){
      let widgets = [
        [this.view.tbxConfirmPIN, this.view.flexConfirmPIN],
        [this.view.tbxCurrentPIN, this.view.flxCurrentPIN],
        [this.view.tbxNewPIN, this.view.flxNewPIN],
        [this.view.tbxNote, this.view.flxNote],
        [this.view.tbxNoteOptional, this.view.flxNoteTextBox]
      ]
      for(let i=0; i<widgets.length; i++){
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    }
  };
});