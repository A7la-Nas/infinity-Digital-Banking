define({
    showUnselectedRow: function() {
        var rowIndex = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().segmentTransfers.data;
        if (data[rowIndex].lblDropdown === "P") {
            data[rowIndex].lblDropdown = "O";
            data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
            data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons"
            data[rowIndex].flxFastPastTransfersSelected.height = "50dp";
            data[rowIndex].flxSelectedRowWrapper.skin = "slFbox";
            data[rowIndex].flxIdentifier.isVisible = true;
            kony.application.getCurrentForm().segmentTransfers.setDataAt(data[rowIndex], rowIndex);
        } else {
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    data[i].lblDropdown = "P";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknflxBg4a90e2op100NoBorder";
                    data[i].lblIdentifier.skin = "sknSSP4176a415px";
                    data[i].flxSelectedRowWrapper.skin = "sknFlxBackgroundfbfbfb";
                    data[i].flxFastPastTransfersSelected.height = "270dp";
                    kony.application.getCurrentForm().segmentTransfers.setDataAt(data[i], i);
                } else if (data[i].lblDropdown === "P") {
                    data[i].lblDropdown = "O";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknFlxIdentifier";
                    data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons"
                    data[i].flxFastPastTransfersSelected.height = "50dp";
                    data[i].flxSelectedRowWrapper.skin = "slFbox";
                    kony.application.getCurrentForm().segmentTransfers.setDataAt(data[i], i);
                }
            }
        }
    },
});