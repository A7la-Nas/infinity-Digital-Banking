define(['CommonUtilities'], function(CommonUtilities) {

  return {
    postshow: function(){
      let widgets = [
        [this.view.tbxMatchPassword, this.view.flxMatchPassword],
        [this.view.tbxNewPassword, this.view.flxNewPassword],
        [this.view.tbxNewUserName, this.view.flxNewUserName]
      ]
      for(let i=0; i<widgets.length; i++){
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    }
  };
});