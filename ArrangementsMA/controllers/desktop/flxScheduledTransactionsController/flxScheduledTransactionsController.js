define({
    showSelectedRow: function() {
        var currentForm = kony.application.getCurrentForm();
        var index = currentForm.scheduledTransactions.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = currentForm.scheduledTransactions.segTransactions.data;
        var ClosedTemplate = 'flxScheduledTransactions';
        var OpenedTemplate = 'flxScheduledTransactionsSelected';
        var collapseAll = function(segments) {
            segments.forEach(function(segment, i) {
                if (segment.template == OpenedTemplate) {
                    segment.template = ClosedTemplate;
                    segment.imgDropdown = "O";
                    currentForm.scheduledTransactions.segTransactions.setDataAt(segment, i, sectionIndex);
                }
            });
        };
        if (data[sectionIndex][1]) {
            if (data[sectionIndex][1][rowIndex].template == ClosedTemplate) {
                collapseAll(data[sectionIndex][1]);
                data[sectionIndex][1][rowIndex].imgDropdown = "P";
                data[sectionIndex][1][rowIndex].template = OpenedTemplate;
            } else {
                data[sectionIndex][1][rowIndex].imgDropdown = "O";
                data[sectionIndex][1][rowIndex].template = ClosedTemplate;
            }
            currentForm.scheduledTransactions.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
        } else {
            if (data[rowIndex].template == ClosedTemplate) {
                collapseAll(data);
                data[rowIndex].imgDropdown = "P";
                data[rowIndex].template = OpenedTemplate;
            } else {
                data[rowIndex].imgDropdown = "O";
                data[rowIndex].template = ClosedTemplate;
            }
            currentForm.scheduledTransactions.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
        currentForm.forceLayout();
        this.AdjustScreen();
    },
    showEditRule: function() {
        kony.print("edit rule pressed");
        var currentForm = kony.application.getCurrentForm();
        currentForm.flxEditRule.isVisible = true;
        this.AdjustScreen(30);
        currentForm.forceLayout();
    },
    rememberCategory: function() {
        var currentForm = kony.application.getCurrentForm();
        var index = currentForm.transactions.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = currentForm.transactions.segTransactions.data;
        if (data[sectionIndex][1][rowIndex].imgRememberCategory == "unchecked_box.png") {
            data[sectionIndex][1][rowIndex].imgRememberCategory = "checked_box.png";
        } else {
            data[sectionIndex][1][rowIndex].imgRememberCategory = "unchecked_box.png";
        }
        currentForm.transactions.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
        this.AdjustScreen(30);
    },
    AdjustScreen: function(data) {
        if (data === null || data === undefined) {
            data = 0;
        }
        var currentForm = kony.application.getCurrentForm();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currentForm.customheader.frame.height + currentForm.flxMainWrapper.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currentForm.flxFooter.frame.height;
            if (diff > 0)
                currentForm.flxFooter.top = mainheight + diff + "dp";
            else
                currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        } else {
            currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        }
    },
});