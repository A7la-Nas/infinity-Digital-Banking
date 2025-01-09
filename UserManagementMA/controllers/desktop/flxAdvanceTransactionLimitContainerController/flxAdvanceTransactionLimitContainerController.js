define({

    //Type your controller code here 
   onLimitChanged: function(eventobject, context) {
        var deformatted = applicationManager.getFormatUtilManager().deFormatAmount(eventobject.text);
     if(deformatted !== undefined){
       if (deformatted.includes(".00"))
         deformatted = deformatted.replace(".00", "");
       var valid = ((/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(deformatted)) ? 1 : 0);
       if (valid) {
         if (deformatted.slice(-2) != ".0") {
           eventobject.text = applicationManager.getFormatUtilManager().formatAmount(deformatted);
         } else {
           deformatted = deformatted.replace(".0", "");
           eventobject.text = deformatted;
         }
       } else {
         //eventobject.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
       }
     }
    }
});