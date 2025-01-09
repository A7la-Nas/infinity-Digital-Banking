define({ 

 //Type your controller code here 
 yearsDropdownFocus: function(eventobject, eventPayload, context) {
        var form = kony.application.getCurrentForm();
        if (form.id === "frmViewStatements" && context.widgetInfo.id === "segYears") {
            if (eventPayload.keyCode === 9) {
                var length = context.widgetInfo.data.length - 1;
                if (eventPayload.shiftKey) {
                    if (context.rowIndex === 0) {
                        eventPayload.preventDefault();
                        this.showYearsDropdown();
                        form.viewStatementsnew.flxYearInfo.setActive(true);
                    }
                } else if (context.rowIndex === context.widgetInfo.data.length - 1) {
                        eventPayload.preventDefault();
                        this.showYearsDropdown();
                        // if (kony.application.getCurrentBreakpoint() === 640) {
                        //     form.summary.btnFocus();
                        // } else {
                            form.viewStatementsnew.flxSortDate.setActive(true);
                        // }
                    }
            }
            if (eventPayload.keyCode === 27) {
                this.showYearsDropdown();
                eventPayload.preventDefault();
                form.viewStatementsnew.flxYearInfo.setActive(true);
            }
        }
 
    },

     showYearsDropdown: function() {
        var form = kony.application.getCurrentForm();
        if (form.viewStatementsnew.flxYears.isVisible === true) {
            form.viewStatementsnew.flxYears.isVisible = false;
            form.viewStatementsnew.lblYearDropdown.text = "O";
            //isAccountTypeOpen = false;
            form.viewStatementsnew.flxYearInfo.accessibilityConfig = {
                "a11yARIA": {
                    "role": "combobox",
                    "aria-labelledby": "lblSelectYears",
                    "aria-expanded": false
                }
            };
            form.viewStatementsnew.flxYearInfo.setActive(true);
        }
    }

 });