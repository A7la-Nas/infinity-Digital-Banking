define({
    showUnselectedRow: function() {
        var index = kony.application.getCurrentForm().transfermain.segmentTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().transfermain.segmentTransfers.data;
        data[rowIndex].imgDropdown = "arrow_down.png";
        data[rowIndex].template = "flxRecentTransfers";
        kony.application.getCurrentForm().transfermain.segmentTransfers.setDataAt(data[rowIndex], rowIndex);
        this.AdjustScreen(0);
    },
    AdjustScreen: function(data) {
        var currentForm = kony.application.getCurrentForm();
        currentForm.forceLayout();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currentForm.customheader.frame.height + currentForm.flxMain.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currentForm.flxFooter.frame.height;
            if (diff > 0) currentForm.flxFooter.top = mainheight + diff + data + "dp";
            else currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        } else {
            currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        }
    },
});