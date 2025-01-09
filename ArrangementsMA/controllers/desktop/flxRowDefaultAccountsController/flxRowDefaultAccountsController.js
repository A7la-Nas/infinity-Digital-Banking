define({

    //Type your controller code here 
    accountsFocus: function(eventobject, eventPayload, context) {
        var form = kony.application.getCurrentForm();
        if(form.id === "frmStopPayments" && context.widgetInfo.id === "segAccountTypes"){
            if(eventPayload.keyCode === 9){
                var length=context.widgetInfo.data.length-1;
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0&&context.sectionIndex===0){
                    eventPayload.preventDefault();
                    this.showAccountTypesDropdown();
                    form.flxAccountTypes.setActive(true);
                    }
                }
               else if(context.sectionIndex===context.widgetInfo.data.length-1){
                    if(context.rowIndex===context.widgetInfo.data[length][1].length-1){
                      eventPayload.preventDefault();
                      this.showAccountTypesDropdown();
                      if (kony.application.getCurrentBreakpoint() === 640) {
                        form.summary.btnFocus();
                      } else {        
                        form.btnByPass1.setActive(true);
                      }
                    }
               }
            }
            if(eventPayload.keyCode === 27){
                this.showAccountTypesDropdown();
                eventPayload.preventDefault();
                form.flxAccountTypes.setActive(true);
                
            }
        } 
        if(form.id === "frmViewStatements" && context.widgetInfo.id === "segAccounts"){
            if(eventPayload.keyCode === 9){
                var length=context.widgetInfo.data.length-1;
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0&&context.sectionIndex===0){
                    eventPayload.preventDefault();
                    this.showAccountsDropdown();
                    form.viewStatementsnew.flxAccountInfo.setActive(true);
                    }
                }
               else if(context.sectionIndex===context.widgetInfo.data.length-1){
                    if(context.rowIndex===context.widgetInfo.data[length][1].length-1){
                      eventPayload.preventDefault();
                      this.showAccountsDropdown();
                    //   if (kony.application.getCurrentBreakpoint() === 640) {
                    //     form.summary.btnFocus();
                    //   } else {        
                        form.viewStatementsnew.flxYearInfo.setActive(true);
                    //   }
                    }
               }
            }
            if(eventPayload.keyCode === 27){
                this.showAccountsDropdown();
                eventPayload.preventDefault();
                form.viewStatementsnew.flxAccountInfo.setActive(true);
                
            }
        } 
        if(form.id === "frmStopPayments" && context.widgetInfo.id === "segTransferFrom"){
            this.dropDownFocus(eventPayload,context,form.flxFilterFromCancelAccount,form.flxFromSegment,"lblAccountSelectAccount");
        }
        if(form.id === "frmStopPayments" && context.widgetInfo.id === "segFromTransfer"){
            this.dropDownFocus(eventPayload,context,form.flxFilterFromCancel,form.flxSegmentContainer,"lblAccountSelect");
        }
    
      },
      dropDownFocus : function(eventPayload,context,setBackWidget,dropDown,labelWidget){
        if (eventPayload.keyCode === 27) {
            eventPayload.preventDefault();
            setBackWidget.accessibilityConfig={
                a11yARIA:{
                    "role":"button",
                    "aria-expanded":false,
                    "aria-labelledby":labelWidget,
                    "tabindex":0
                }
            };
            dropDown.isVisible=false;
            setBackWidget.setActive(true);
        }
        if (eventPayload.keyCode === 9) {
            var length = context.widgetInfo.data.length - 1;
            if (eventPayload.shiftKey) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    eventPayload.preventDefault();
                    setBackWidget.accessibilityConfig={
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":false,
                            "aria-labelledby":labelWidget,
                            "tabindex":0
                        }
                    };
                    dropDown.isVisible=false;
                    setBackWidget.setActive(true);
                }
            }
            else{
            if (context.sectionIndex === context.widgetInfo.data.length - 1) {
                if (context.rowIndex === context.widgetInfo.data[length][1].length - 1) {
                    eventPayload.preventDefault();
                    setBackWidget.accessibilityConfig={
                        a11yARIA:{
                            "role":"button",
                            "aria-expanded":false,
                            "aria-labelledby":labelWidget,
                            "tabindex":0
                        }
                    };
                    dropDown.isVisible=false;
                    setBackWidget.setActive(true);
                }
            }
        }
        }
        },
      showAccountTypesDropdown: function() {
          var form = kony.application.getCurrentForm();
              if(form.accountTypes.isVisible===true){
              form.accountTypes.isVisible = false;
              form.lblDropDown.text = "O";
              //isAccountTypeOpen = false;
              form.flxAccountTypes.accessibilityConfig = {
                  "a11yARIA": {
                      "role": "button",
                      "aria-labelledby": "lblAccountTypes",
                      "aria-expanded": false
                  }
              };
              form.flxAccountTypes.setActive(true);
      }
      },

      showAccountsDropdown: function() {
          var form = kony.application.getCurrentForm();
              if(form.viewStatementsnew.flxAccounts.isVisible===true){
              form.viewStatementsnew.flxAccounts.isVisible = false;
              //form.viewStatementsnew.lblAccountsDropdown.text = "O";
              //isAccountTypeOpen = false;
              form.viewStatementsnew.flxAccountInfo.accessibilityConfig = {
                  "a11yLabel": form.viewStatementsnew.lblKeySelectAccount.text + " Currently selected "+ form.viewStatementsnew.lblAccountName.text +" Click to select another account",
                    "a11yARIA": {
                        "role": "combobox",
                        "tabindex": 0,
                        "aria-controls": "lblKeySelectAccount",
                        "aria-expanded": false
                    }
              };
              form.viewStatementsnew.lblAccountsDropdown.text = "O";
              form.viewStatementsnew.flxAccountInfo.setActive(true);
      }
      } 

});