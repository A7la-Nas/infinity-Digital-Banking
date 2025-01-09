define({
    showSelectedRow: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.segmentTransfers.selectedRowIndex[1];
        var data = currForm.segmentTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].imgDropdown = "chevron_up.png";
                data[i].template = "flxFastScheduledTransfersSelected";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxFastScheduledTransfers";
            }
        }
        currForm.segmentTransfers.setData(data);
    },
});