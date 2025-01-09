define(['FormControllerUtility'], function(FormControllerUtility) {
    return {
        menuPressed: function(data) {
            var currForm = kony.application.getCurrentForm();

            FormControllerUtility.updateWidgetsHeightInInfo(currForm, ['flxPasswordResetWarning',
                'flxDowntimeWarning',
                'flxOverdraftWarning',
                'flxOutageWarning',
                'flxAccountListAndBanner'
            ]);


            if (this.view.flxMenu.origin) {
                if (kony.application.getCurrentBreakpoint() !== 1024) {
                    this.view.flxMenu.origin = false;
                    return;
                }
            }
            var section = currForm.accountList.segAccounts.selectedRowIndex[0]
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            // for(var i=0;i<=segmentData.length;i++){
            //     segmentData[i].onQuickActions();
            // }
            segmentData[index].onQuickActions();
            //  currForm.accountListMenu.flxIdentifier.skin = segmentData[0].flxMenu.skin;
            var currTop = 0;
            currForm.accountListMenu.top = 155;
            if (currForm.accountListMenu.isVisible === true) {
                currForm.accountListMenu.top = 155;
                currForm.accountListMenu.isVisible = false;
                currForm.forceLayout();
            } else {
                //currTop = currForm.accountListMenu.top;
                currTop = parseInt(currTop);
                var indexCount = 0;
                for (var i = 0; i < section; i++) {
                    indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                }
                currTop += ((81 * indexCount) + (50 * (section + 1)) + (((index + 1) * 81) + 50));
                currForm.forceLayout();
                if (currForm.flxPasswordResetWarning.isVisible === true) currTop = currTop + currForm.flxPasswordResetWarning.info.frame.height + 26;
                if (currForm.flxDowntimeWarning.isVisible === true) currTop = currTop + currForm.flxDowntimeWarning.info.frame.height + 26;
                if (currForm.flxOverdraftWarning.isVisible === true) currTop = currTop + currForm.flxOverdraftWarning.info.frame.height + 26;
                if (currForm.flxOutageWarning.isVisible === true) currTop = currTop + currForm.flxOutageWarning.info.frame.height + 26;
                currForm.accountListMenu.top = currTop + "dp";
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                var leftAmount;
                var orientationHandler = new OrientationHandler();
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "10dp";
                } else if (currBreakpoint === 1024 || orientationHandler.isTablet) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "24dp";
                    currForm.accountListMenu.imgToolTip.right = "30dp";
                } else {
                    currForm.accountListMenu.imgToolTip.right = "17dp";
                    currForm.accountListMenu.right = "";
                    //ARB-9990 : Temporary solution to fix for 1366 windows.
                    var userAgent = kony.os.deviceInfo().userAgent;
                    if (userAgent.indexOf("Macintosh") != -1 && kony.application.getCurrentBreakpoint() == 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) + "dp";
                    else if (userAgent.indexOf("Macintosh") == -1 && kony.application.getCurrentBreakpoint() == 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 266) + "dp";
                    else
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) + "dp";
                }
                // currForm.accountListMenu.left = 593 + currForm.flxMainWrapper.frame.x + "dp";
                currForm.FavouriteAccountTypes.isVisible = false;
                currForm.accountListMenu.isVisible = true;
                //currForm.accountListMenu.imgToolTip.setFocus(true); //ARB-5672 :Page scrolls down when clicked on contextual actions
                currForm.forceLayout();
            }
        },
        setClickOrigin: function() {
            return;
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