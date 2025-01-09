define({
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.data;
        for (i = 0; i < data.length; i++) {
            if (i == rowIndex) {
                kony.print("index:" + index);
                data[i].imgDropDown = "chevron_up.png";
                data[i].template = "flxDisputedChecksSelectedWrapper";
            } else {
                data[i].imgDropDown = "arrow_down.png";
                data[i].template = "flxDisputedChecksUnSelectedWrapper";
            }
        }
        kony.application.getCurrentForm().MyRequestsTabs.segTransactions.setData(data);
        kony.application.getCurrentForm().forceLayout();
        this.AdjustScreen();
    },
    //UI Code
    AdjustScreen: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.forceLayout();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currForm.customheader.frame.height + currForm.flxContainer.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currForm.flxFooter.frame.height;
            if (diff > 0)
                currForm.flxFooter.top = mainheight + diff + "dp";
            else
                currForm.flxFooter.top = mainheight + "dp";
        } else {
            currForm.flxFooter.top = mainheight + "dp";
        }
        currForm.forceLayout();
    },
});