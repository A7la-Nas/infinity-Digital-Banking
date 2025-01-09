define({ 
    onKeyPressCallBack: function(eventObject, eventPayload, context) {
        var form = kony.application.getCurrentForm();
        if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
        if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer" || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer") {
            var params=[];
             params.push(eventObject);
     params.push(eventPayload);
     params.push(context);
                 this.executeOnParent("iconSeg", params);
     }
    }
        if (eventPayload.keyCode === 9) {
            if(eventPayload.shiftKey){
                if (context.sectionIndex === 0) {
                   if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer"  || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer" ) {
                    form.UnifiedTransfer.fromAndToSegmentShiftTab(eventObject, eventPayload, context);
                    }
               }
            } 
           }
        if (eventPayload.keyCode === 27) {
            if (form.id === "frmUTFSameBankTransfer" || form.id === "frmUTFDomesticTransfer" || form.id === "frmUTFInternationalTransfer" || form.id === "frmUTFP2PTransfer") {
                form.UnifiedTransfer.fromAndToSegmentShiftTab(eventObject, eventPayload, context);
            }
        }
    }
});