define({
  //Type your controller code here
  bindGenericError : function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
  });