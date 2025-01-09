define({

    //Type your controller code here 
  onTypeSelection: function(eventobject, context) {
    try{
        this.view.tbxUpperLimit.placeholder 
          = kony.i18n.getLocalizedString("i18n.transfers.amountlabel");
        
        var limitType = eventobject.selectedKeyValue[1];
        var isRangeSelected = (limitType === "Range");
        
        if(isRangeSelected) {
          this.view.flxUpperLimitContainer.isVisible = true;
          this.view.tbxUpperLimit.text = "";
          this.view.tbxUpperLimit.isVisible =  true;
          this.view.tbxUpperLimit.skin 
            = "skntbxffffffBordere3e3e3SSP15px424242";
        } else {
          this.view.flxUpperLimitContainer.isVisible = false;
          this.view.tbxUpperLimit.text = "-1";
          this.view.tbxUpperLimit.isVisible =  false;
          this.view.tbxUpperLimit.skin 
            = "skntbxffffffBordere3e3e3SSP15px424242";
        }
      }
    catch(err){}
  },

    onLimitValueChange: function(eventObject, context) {
        this.executeOnParent("enableOrDisableProceedWidget");
    },

    onLimitChanged: function(eventobject, context) {
      if(eventobject.text === "") {
        eventobject.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
        return;
      }
      try{
        var deformatted = applicationManager.getFormatUtilManager().deFormatAmount(eventobject.text);
        if (deformatted.includes(".00"))
          deformatted = deformatted.replace(".00", "");
        var valid = ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(deformatted)) ? 1 : 0);
        if (valid) {
            eventobject.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          if (deformatted.slice(-2) != ".0") {
            eventobject.text = applicationManager.getFormatUtilManager().formatAmount(deformatted);
          } else {
            deformatted = deformatted.replace(".0", "");
            eventobject.text = deformatted;
          }
        } else {
          eventobject.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
        }
      }catch(err){}
    }
});