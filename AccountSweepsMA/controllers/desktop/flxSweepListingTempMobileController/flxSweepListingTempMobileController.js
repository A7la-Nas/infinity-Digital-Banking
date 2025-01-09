define({ 
handleSegmentRowView: function() {
        var scope = this;
        try {
            const rowIndex = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.selectedRowIndex[1];
            const data = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.data;
            const breakpoint = kony.application.getCurrentBreakpoint();
            let expandedHeight;
            let collapsedHeight;
            if (kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.rowTemplate === "flxSweepListingTempMobile") {
                expandedHeight = "410dp";
                collapsedHeight = "75dp";
            }
            var pre_val;
            var requiredView = [];
            const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", collapsedHeight, "sknflxffffffnoborder",true,"1dp",false];
            const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "slFboxBGf8f7f8B0",false,"1dp",true];
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
            var scope = this;
            let data = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.data[index];
            const template = data.template;
            data.flxIdentifier.top = "0dp";
            data.lblDropdown = viewData[0];
            data.flxIdentifier.isVisible = viewData[1];
            data.flxIdentifier.height = viewData[4];
            data.flxIdentifier.skin = viewData[2];
            data.lblIdentifier.skin = viewData[3];
            data[template].height = viewData[4];
            data[template].skin = viewData[5];
            data.flxManageBeneficiaries.isVisible = viewData[6];
            data.flxManageBeneficiaries.top = viewData[7];
            data.flxDetail.isVisible=viewData[8];
            if(viewData[8]===true){
                data.flxDropDown2.accessibilityConfig={
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
            data.flxDropDown2.onClick = scope.handleSegmentRowView.bind(this);
            kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setDataAt(data, index);
            if(viewData[8]===true){
                kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setActive(index,-1,"flxSweepListingTempMobile.flxMainGroup.flxGroup.flxSelectedRowWrapper.flxDetail.flxRow.flxDropDown2");
            }
            else{
                kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setActive(index,-1,"flxSweepListingTempMobile.flxMainGroup.flxGroup.flxSelectedRowWrapper.flxManageBeneficiaries.flxDropdown");
            }
        } catch (err) {
            var errorObj = {
                "level": "ComponentController",
                "method": "toggleSegmentRowView",
                "error": err
            };
            this.onError(errorObj);
        }
    },
  toggleSegmentCollapseView: function(){
    const rowIndex = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.selectedRowIndex[1];
    let data = kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.data[rowIndex];
    const template = data.template;
    data.flxIdentifier.top = "70dp";
    const viewData = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "75dp", "sknflxffffffnoborder",true];
    data.lblDropdown = viewData[0];
    data.flxIdentifier.isVisible = viewData[1];
    data.flxIdentifier.skin = viewData[2];
    data.lblIdentifier.skin = viewData[3];
    data[template].height = viewData[4];
    data[template].skin = viewData[5];
    data.flxManageBeneficiaries.isVisible = viewData[6];
    kony.application.getCurrentForm().formTemplate12.flxContentTCCenter.segSweep.setDataAt(data, rowIndex);
  },

 });