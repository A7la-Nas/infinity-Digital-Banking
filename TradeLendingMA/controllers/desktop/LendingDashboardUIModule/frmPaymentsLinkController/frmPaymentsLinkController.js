define({ 

  //Type your controller code here 
  frmPreShow : function()
  {
    this.view.formTemplate12.onError = function(errorObject) {
      alert(JSON.stringify(errorObject));
    };
  }
});