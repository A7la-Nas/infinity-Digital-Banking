define({
    showSelectedRow: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.segmentTransfers.selectedRowIndex[1];
        var data = currForm.segmentTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].lblDropdown = "P";
                data[i].flxIdentifier.isVisible = true;
                data[i].flxIdentifier.skin = "sknflx4a902";
                data[i].lblIdentifier.skin = "sknSSP4176a415px";
                data[i].template = "flxFastPastTransfersSelectedMobile";
            } else {
                data[i].lblDropdown = "O";
                data[i].flxIdentifier.isVisible = false;
                data[i].flxIdentifier.skin = "sknFlxIdentifier";
                data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons"
                data[i].template = "flxFastPastTransfersMobile";
            }
        }
        currForm.segmentTransfers.setData(data);
    },
});