define({
    //Type your controller code here

    shiftTabFocus: function(eventobject, eventPayload, context) {
        var scope = this;
        var form = kony.application.getCurrentForm();
        if(form.id === "frmConfirmClosure" && context.widgetInfo.id === "segReasons"){
          if(eventPayload.keyCode === 9){
              var length=context.widgetInfo.data.length-1;
              if(eventPayload.shiftKey){
                  if(context.rowIndex === 0 && context.sectionIndex === 0){
                     eventPayload.preventDefault();
                     form.formAccountClosure.flxContentTCCenter.flxDropDownMenu.isVisible = false;
                     form.formAccountClosure.flxContentTCCenter.lblDropdownIcon.text = "O";
                     form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.accessibilityConfig = {
                        "a11yLabel": form.formAccountClosure.flxContentTCCenter.lblDropdown.text==="Select"?"Please choose a reason for closing. Click to show list of reasons.": "Currently Selected " + form.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.lblDropdown.text + "Click to select a different reason. ",
                       
                        "a11yARIA": {
                            "aria-expanded": false,
                            "tabindex": 0,
                            "role": "button"
                        }
                    }
                     form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.setActive(true);
                  }
              }
              else if(context.rowIndex === context.widgetInfo.data.length-1){
                     eventPayload.preventDefault();
                    form.formAccountClosure.flxContentTCCenter.flxDropDownMenu.isVisible = false;
                    form.formAccountClosure.flxContentTCCenter.lblDropdownIcon.text = "O";
                    form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.accessibilityConfig = {
                        "a11yLabel":form.formAccountClosure.flxContentTCCenter.lblDropdown.text==="Select"?"Please choose a reason for closing. Click to show list of reasons.": "Currently Selected " + form.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.lblDropdown.text + "Click to select a different reason. ",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "tabindex": 0,
                            "role": "button"
                        }
                    }
                    form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.setActive(true);      
              }
         
        }
        if(eventPayload.keyCode === 27){
            eventPayload.preventDefault();
            form.formAccountClosure.flxContentTCCenter.flxDropDownMenu.isVisible = false;
            form.formAccountClosure.flxContentTCCenter.lblDropdownIcon.text = "O";
            form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.accessibilityConfig = {
                "a11yLabel": form.formAccountClosure.flxContentTCCenter.lblDropdown.text==="Select"?"Please choose a reason for closing. Click to show list of reasons.": "Currently Selected " + form.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.lblDropdown.text + "Click to select a different reason. ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button"
                }
            }
            form.formAccountClosure.flxContentTCCenter.flxClosingDropdown.setActive(true);
          
       }
    }
}


});