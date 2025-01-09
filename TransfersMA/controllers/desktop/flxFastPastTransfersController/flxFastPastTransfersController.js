define({
    showSelectedRow: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.segmentTransfers.selectedRowIndex[1];
        var data = currForm.segmentTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].imgDropdown = "chevron_up.png";
                data[i].template = "flxFastPastTransfersSelected";
                currForm.segmentTransfers.setDataAt(data[i], i);
            } else if (data[i].imgDropdown !== "arrow_down.png" || data[i].imgDropdown.src !== "arrow_down.png") {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxFastPastTransfers";
                currForm.segmentTransfers.setDataAt(data[i], i);
            }
        }
    },
});