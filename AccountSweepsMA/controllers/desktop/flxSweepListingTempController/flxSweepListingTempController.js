define({ 

     handleSegmentRowView: function() {
        try {
            const rowIndex = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.selectedRowIndex[1];
            const data = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.data;
            const breakpoint = kony.application.getCurrentBreakpoint();
            let expandedHeight;
            let collapsedHeight;
            if (kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.rowTemplate === "flxSweepListingTemp") {
                if(breakpoint === 1024){
                expandedHeight = "180dp";
                } else {
                expandedHeight = "133dp";
                }
                collapsedHeight = "53dp";
            }
            var pre_val;
            var requiredView = [];
            const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", collapsedHeight, "sknflxffffffnoborder", false, true,"sknLblSSP15pxtrucation",false];
            const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "slFboxBGf8f7f8B0", true, false,"slLabel0d8a72616b3cc47",true];
            if (previous_index === rowIndex) {
                requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
                this.toggleSegmentRowView(rowIndex, requiredView);
            } else {
                if (previous_index >= 0) {
                    pre_val = previous_index;
                    this.toggleSegmentRowView(pre_val, collapsedView);
                }
                pre_val = rowIndex;
                this.toggleSegmentRowView(rowIndex, expandedView);
            }
            previous_index = rowIndex;
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "handleSegmentRowView",
                "error": err
            };
            this.onError(errorObj);
        }
    },

    toggleSegmentRowView: function(index, viewData) {
        try {
            scope = this;
            let data = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.data[index];
            const template = data.template;
            data.lblDropdown = viewData[0];
            data.flxDetails.isVisible = viewData[9];
            data.flxIdentifier.isVisible = viewData[1];
            data.flxIdentifier.skin = viewData[2];
            data.lblIdentifier.skin = viewData[3];
            data[template].height = viewData[4];
            data[template].skin = viewData[5];
            data.lblSeparator.isVisible = viewData[6];
            data.lblSeperatorMain.isVisible = viewData[7];
            data.lblCoulmn1.skin = viewData[8];
            data.lblCoulmn2.skin = viewData[8];
            if(viewData[9]===true){
                data.flxDropdown.accessibilityConfig={
                    "a11yLabel":"Hide details of sweep for primary account "+data.lblCoulmn1.text,
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0,
                        "aria-expanded":true
                    }
                }
            }
            else{
                data.flxDropdown.accessibilityConfig={
                    "a11yLabel":"Show more details of sweep for primary account "+data.lblCoulmn1.text,
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0,
                        "aria-expanded":false
                    }
                }
            }
            kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setDataAt(data, index);
            kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setActive(index,-1,"flxSweepListingTemp.flxMainGroup.flxGroup.flxMain.flxDropdown");
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "toggleSegmentRowView",
                "error": err
            };
            this.onError(errorObj);
        }
    },
 });