define(['CommonUtilities'], function(CommonUtilities) {

	return {
		postshow: function(){
          let widgets = [
            [this.view.tbxEnterpassword, this.view.flxEnterPassword],
            [this.view.tbxNewUsername, this.view.flxEnterUsername]
          ]
          for(let i=0; i<widgets.length; i++){
            CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
          }
        }
	};
});