define(['CommonUtilities'], function(CommonUtilities) {

  return {
    postshow: function(){
      CommonUtilities.setA11yFoucsHandlers(this.view.txtSearch, this.view.flxtxtSearchandClearbtn, this)
    }
  };
});