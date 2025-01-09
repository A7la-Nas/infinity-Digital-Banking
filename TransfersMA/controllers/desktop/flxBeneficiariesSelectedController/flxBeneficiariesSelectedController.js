define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().segmentBillpay.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        if (data[rowIndex].lblDropdown === "P") {
            data[rowIndex].lblDropdown = "O";
            //data[rowIndex].template = "flxMakeTransfersTransfersUnselected";
            data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
            data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons"
            data[rowIndex].flxBeneficiariesSelected.height = "80dp";
            data[rowIndex].flxdetails.isVisible = false;
			data[rowIndex].lblSeparator.isVisible = false;
            data[rowIndex].flxBeneficiariesSelected.skin = "sknflxffffffnoborder";
            kony.application.getCurrentForm().segmentBillpay.setDataAt(data[rowIndex], rowIndex);
        } else {
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    //kony.print("index:" + index);
                    data[i].lblDropdown = "P";
                    data[i].flxIdentifier.isVisible = true;
					data[i].lblSeparator.isVisible = true;
                    data[i].flxIdentifier.skin = "sknflx4a902";
                    data[i].lblIdentifier.skin = "sknSSP4176a415px";
                    data[i].flxBeneficiariesSelected.height = "350dp";
                    data[i].flxdetails.isVisible = true;
                    data[i].flxBeneficiariesSelected.skin = "slFboxBGf8f7f8B0";
                    //data[i].template = "flxWireTransferMakeTransfersSelected";
                } else {
                    data[i].imgDropdown = "O";
                    data[i].lblDropdown = "O";
                    data[i].lblSeparator.isVisible = false;
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknFlxIdentifier";
                    data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons"
                    data[i].flxBeneficiariesSelected.height = "80dp";
                    data[i].flxdetails.isVisible = false;
                    data[i].flxBeneficiariesSelected.skin = "sknflxffffffnoborder";
                    //data[i].template = "flxMakeTransfersTransfersUnselected";
                }
            }
            kony.application.getCurrentForm().segmentBillpay.setData(data);
        }
        kony.application.getCurrentForm().forceLayout();
    },
});