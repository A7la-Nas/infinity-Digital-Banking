define({ 

 //Type your controller code here 
  
onKeyPressCallBack: function(eventObject,eventPayload,context) {
    var form = kony.application.getCurrentForm();
    if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer"  || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer") {
        form.UnifiedTransfer.setSegAccessibility(eventObject, eventPayload, context);
    }
},

 });