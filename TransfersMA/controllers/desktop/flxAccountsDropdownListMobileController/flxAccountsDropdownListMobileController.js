define({ 
    onKeyPressCallBack: function(eventObject, eventPayload, context) {
       var form = kony.application.getCurrentForm();
       if (eventPayload.keyCode === 9) {
            if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer"  || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer") {
                form.UnifiedTransfer.setSegAccessibility(eventObject, eventPayload, context);
           }
       }
       if (eventPayload.keyCode === 27) {
           if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer"  || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer") {
                form.UnifiedTransfer.fromAndToSegmentShiftTab(eventObject, eventPayload, context);
           }    
        }    
    }
});