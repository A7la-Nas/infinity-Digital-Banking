define(function () {
  function BusinessController() {
    this.context = {};
    this.store = {};
    this.dataMapping = {};

  }
  BusinessController.prototype.setProperties = function(dataMapping) {
    this.dataMapping = dataMapping;
  };
   /**
   * @api : getGenericMessage
   * to get the details based on mesg type
   * @return : NA
   */
  BusinessController.prototype.getGenericMessage = function(context) {
    var scope = this;
    var data = {};
    this.context = context;
    data["message"] = context.dbpErrMsg;
    data["key"]= context.i18n;
    data["img"] = context.dbpErrMsg ? "failed_icon.png" : "success_green.png";
    if (context.errorDetails) {
      var errorDetails = this.checkMaxLength(JSON.parse(context.errorDetails));
      data["message"] = errorDetails;
    }
    if (context.messageDetails) {
      var messageDetails = this.checkMaxLength(JSON.parse(context.messageDetails));
      data["img"]= (context.warn) ? "error_yellow.png":"success_green.png";
      data["message"] = messageDetails;
    }
    this.store.dispatch({
      type: "UPDATE_SLAVE",
      data: data,
      key: "details"
    });
  };
   /**
   * @api : checkMaxLength
   * to check the max length of the details
   * @return : NA
   */
  BusinessController.prototype.checkMaxLength =  function(details){
    if(details.length > JSON.parse(this.dataMapping.maxLength)){details = details.slice(0,JSON.parse(this.dataMapping.maxLength));}
    return details;
  };
    /**
   * @api : getDataBasedOnDataMapping
   * gets the corresponding data of each widget from collection
   * @return : NA
   */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    for (var record in dataMapping) { 
      if (widget === record) {
        var fieldValue = dataMapping[widget];
        if (typeof fieldValue === "string") {
          if (!fieldValue.indexOf("${i18n")) {
            return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
          }
        } 
      }
    }
    return "";
  };
  return BusinessController;

});