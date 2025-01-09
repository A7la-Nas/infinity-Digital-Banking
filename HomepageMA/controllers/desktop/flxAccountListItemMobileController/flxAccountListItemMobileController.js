define(['FormControllerUtility'], function(FormControllerUtility) {
    return {
        menuPressed: function(data) {
            var currForm = kony.application.getCurrentForm();

            FormControllerUtility.updateWidgetsHeightInInfo(currForm, ['flxPasswordResetWarning',
                'flxDowntimeWarning',
                'flxOverdraftWarning',
                'flxOutageWarning',
                'flxMainWrapper'
            ]);

            if (this.view.flxMenu.origin) {
                this.view.flxMenu.origin = false;
                //return;
            }
            // for(var i=0;i<=segmentData.length;i++){
            //     segmentData[i].onQuickActions();
            // }
            //  currForm.accountListMenu.flxIdentifier.skin = segmentData[0].flxMenu.skin;
            if (currForm.accountListMenu.isVisible === true) {
                currForm.accountListMenu.top = 155;
                currForm.accountListMenu.isVisible = false;
                currForm.forceLayout();
            } else {
                //currTop = currForm.accountListMenu.top;
                var section = currForm.accountList.segAccounts.selectedRowIndex[0]
                var index = currForm.accountList.segAccounts.selectedRowIndex[1];
                var segmentData = currForm.accountList.segAccounts.data[section][1];
                currForm.accountListMenu.top = 155;
                segmentData[index].onQuickActions();
                var currTop = 0;
                var indexCount = 0;
                for (var i = 0; i < section; i++) {
                    indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                }
                currTop += ((81 * indexCount) + (50 * (section + 1)) + (((index + 1) * 81) + 50));
                if (currForm.flxPasswordResetWarning.isVisible === true) currTop = currTop + currForm.flxPasswordResetWarning.info.frame.height + 26;
                if (currForm.flxDowntimeWarning.isVisible === true) currTop = currTop + currForm.flxDowntimeWarning.info.frame.height + 26;
                if (currForm.flxOverdraftWarning.isVisible === true) currTop = currTop + currForm.flxOverdraftWarning.info.frame.height + 26;
                if (currForm.flxOutageWarning.isVisible === true) currTop = currTop + currForm.flxOutageWarning.info.frame.height + 26;
                currForm.accountListMenu.top = currTop + "dp";
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                var leftAmount;
                if (currBreakpoint === 640) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "10dp";
                    currForm.accountListMenu.imgToolTip.right = "5dp";
                } else if (currBreakpoint === 1024) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "20dp";
                } else if (currBreakpoint == 1366) {
                    currForm.accountListMenu.left = "";
                    leftAmount = 36 * (currForm.flxMainWrapper.info.frame.width / 100);
                    currForm.accountListMenu.right = parseInt(currForm.flxMainWrapper.info.frame.x + leftAmount) + "dp";
                } else {
                    currForm.accountListMenu.left = "";
                    leftAmount = 36 * (currForm.flxMainWrapper.info.frame.width / 100);
                    leftAmount += 3 * (currForm.accountList.info.frame.width / 100);
                    currForm.accountListMenu.right = parseInt(currForm.flxMainWrapper.info.frame.x + leftAmount) + "dp";
                }
                // currForm.accountListMenu.left = 593 + currForm.flxMainWrapper.frame.x + "dp";
                currForm.FavouriteAccountTypes.isVisible = false;
                currForm.accountListMenu.isVisible = true;
                //currForm.accountListMenu.imgToolTip.setFocus(true); //ARB-5672 :Page scrolls down when clicked on contextual actions
                currForm.forceLayout();
            }
        },
        setClickOrigin: function() {
            var currForm = kony.application.getCurrentForm();
            if (currForm.accountListMenu.isVisible) {
                this.view.flxMenu.origin = true;
            }
        },
        imgPressed: function() {
            var currForm = kony.application.getCurrentForm();
            var section = currForm.accountList.segAccounts.selectedRowIndex[0]
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].toggleFavourite();
        },
        accountPressed: function() {
            var currForm = kony.application.getCurrentForm();
            var section = currForm.accountList.segAccounts.selectedRowIndex[0]
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].onAccountClick(index);
        },
    }
});