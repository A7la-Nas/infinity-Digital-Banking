define({ 
  onKeyPressCallBack: function(eventobject, eventPayload, context){
        let frm = kony.application.getCurrentForm();
        if (frm.id === "frmLogin") {

            if (eventPayload.keyCode === 27) {
                frm.flxLegalEntityCombine.setVisibility(false);
                eventPayload.preventDefault();
                frm.flxLegalEntityDropDown.setActive(true);
                
            frm.flxLegalEntityDropDown.accessibilityConfig={
                "a11yLabel": "Show List of Entities",
                a11yARIA: {
                  "aria-expanded": false,
                  "aria-labelledby": "lblSelectEntity",
                  "aria-required": true,
                  "role":"combobox",
                  "aria-controls":"flxLegalEntityCombine"
              }
            };

            frm.imgdropdownExpand.src = "listboxuparrow.png";
            }

            if (context.rowIndex === context.widgetInfo.data.length - 1) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        eventPayload.preventDefault();
                        frm.segLegalEntity.setActive(context.rowIndex - 1, 0, "flxsegList");
                    }
                    else {
                        frm.flxLegalEntityCombine.setVisibility(false);
                        eventPayload.preventDefault();
                        frm.flxLegalEntityDropDown.setActive(true);
                        
            frm.flxLegalEntityDropDown.accessibilityConfig={
                "a11yLabel": "Show List of Entities",
                a11yARIA: {
                  "aria-expanded": false,
                  "aria-labelledby": "lblSelectEntity",
                  "aria-required": true,
                  "role":"combobox",
                  "aria-controls":"flxLegalEntityCombine"
              }
            };

            frm.imgdropdownExpand.src = "listboxuparrow.png";
                    }
                }
            }

            if (context.rowIndex === 0) {
                if (eventPayload.keyCode === 9) {
                    if (eventPayload.shiftKey) {
                        frm.flxLegalEntityCombine.setVisibility(false);
                        eventPayload.preventDefault();
                        frm.flxLegalEntityDropDown.setActive(true);
                        
            frm.flxLegalEntityDropDown.accessibilityConfig={
                "a11yLabel": "Show List of Entities",
                a11yARIA: {
                  "aria-expanded": false,
                  "aria-labelledby": "lblSelectEntity",
                  "aria-required": true,
                  "role":"combobox",
                  "aria-controls":"flxLegalEntityCombine"
              }
            };

            frm.imgdropdownExpand.src = "listboxuparrow.png";
                    }
                }
            }


        }
    
}

});