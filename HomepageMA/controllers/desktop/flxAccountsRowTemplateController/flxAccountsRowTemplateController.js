define(['FormControllerUtility'], function(FormControllerUtility) {
    return {

        menuPressed: function() {
            var currForm = kony.application.getCurrentForm();

            FormControllerUtility.updateWidgetsHeightInInfo(currForm, ['flxPasswordResetWarning',
                'flxDowntimeWarning',
                'flxOverdraftWarning',
                'flxOutageWarning',
                'flxMainWrapper',
                'flxLeftContainer'
            ]);
            if (this.view.flxMenu.origin) {
                if (kony.application.getCurrentBreakpoint() !== 1024) {
                    this.view.flxMenu.origin = false;
                    return;
                }
            }
            if(currForm.accountListMenu.isVisible === true){
              this.view.flxMenu.accessibilityConfig = {
                "a11yLabel": "Contextual Menu",
                "a11yARIA": {
                  "role": "button",
                  "aria-expanded": false,
                }
              }
            }
            else {
              this.view.flxMenu.accessibilityConfig = {
                "a11yLabel": "Contextual Menu",
                "a11yARIA" : {
                  "role" : "button",
                  "aria-expanded": true,
                }
              }
            }       
            var section = currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            var orientationHandler = new OrientationHandler();
            segmentData[index].onQuickActions();

            currForm.accountListMenu.top = 155;
            if (currForm.accountListMenu.isVisible === true) {
                currForm.accountListMenu.top = 155;
                currForm.accountListMenu.isVisible = false;
                currForm.forceLayout();
            } else {
//               hidePopups();	
                var currTop = 0;
                var indexCount = 0;
                var totalCount = 0;
              	var popUpCount = 0;

                for (var i = 0; i < section; i++) {
                    if (currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalance" || currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalanceMobile") {
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length - 1);
                        totalCount += 1;
                    } else
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                  if(currForm.accountList.segAccounts.data[i][0]["lblDropDown"].text === "O"){
                    indexCount = 0;
                    totalCount = 0;
                  }
                }

                currTop = parseInt(currTop);
                if (currBreakpoint === 640 || orientationHandler.isMobile)
                    currTop += ((78 * indexCount) + (50 * totalCount) + (40 * (section + 1)) + ((index+1) * 78) + 80);
                else
                    currTop += ((78 * indexCount) + (115 * totalCount) + (40 * (section + 1)) + (((index + 1) * 78) + 80));

                currForm.forceLayout();
                if (currForm.flxPasswordResetWarning.isVisible === true) {
                  popUpCount++;
                  currTop = currTop + currForm.flxPasswordResetWarning.info.frame.height;
                }
                if (currForm.flxDowntimeWarning.isVisible === true) {
                  popUpCount++;
                  currTop = currTop + currForm.flxDowntimeWarning.info.frame.height;
                }
                if (currForm.flxOverdraftWarning.isVisible === true) {
                  popUpCount++;
                  currTop = currTop + currForm.flxOverdraftWarning.info.frame.height;
                }
                if (currForm.flxOutageWarning.isVisible === true) {
                  popUpCount++;
                  currTop = currTop + currForm.flxOutageWarning.info.frame.height;
                }
              if(popUpCount>0) currTop += 30 + (popUpCount-1)*26;
                if (currForm.flxInvestmentSummaryContainer.isVisible === true) currTop = currTop + currForm.flxInvestmentSummaryContainer.info.frame.height + 26;
				if(currBreakpoint === 640 || orientationHandler.isMobile || currBreakpoint === 1024 || orientationHandler.isTablet){
					if (currForm.flxApprovalAndRequest.isVisible === true)
						currTop = currTop + currForm.flxApprovalAndRequest.info.frame.height;
				}
               if (currForm.flxAccountsHeader.isVisible === false) {
                    currTop = currTop - 80;
                } else {
                    currTop = currTop;
                }
                //if (currBreakpoint === 640 || orientationHandler.isMobile) currTop -= 16*indexCount ;
                if (currBreakpoint ===1366 && orientationHandler.isDesktop) currTop -= (20*totalCount +20);
                currForm.accountListMenu.top = currTop + "dp";
              if (currBreakpoint ===1024 && orientationHandler.isTablet) currTop -= (20*totalCount +20);
                currForm.accountListMenu.top = currTop + 70 +"dp";

                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "40dp";
                    currForm.accountListMenu.width = "200dp";
                } else if (currBreakpoint === 1024 || orientationHandler.isTablet) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "40dp";
                } else {
                    currForm.accountListMenu.right = "";
                    currForm.accountListMenu.left = "510dp";
                    //ARB-9990 : Temporary solution to fix for 1366 windows.
                    var userAgent = kony.os.deviceInfo().userAgent;
                    if (userAgent.indexOf("Macintosh") !== -1 && kony.application.getCurrentBreakpoint() === 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) +6+ "dp";
                    else if (userAgent.indexOf("Macintosh") === -1 && kony.application.getCurrentBreakpoint() === 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 266) +6+ "dp";
                    else if (currBreakpoint ===1380 || currBreakpoint > 1380)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 263) + "dp";
                    else
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) +6+ "dp";
                }

                currForm.accountListMenu.isVisible = true;
                currForm.forceLayout();
              currForm.accountListMenu.segAccountListActions.setActive(0,0,"flxActionsMenu");
            }
        },

        setClickOrigin: function() {
            return;
        },
        imgPressed: function(context) {
            var currForm = kony.application.getCurrentForm();
            var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].toggleFavourite();
        },
        accountPressed: function(context) {
            var currForm = kony.application.getCurrentForm();
            var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].onAccountClick(index);
        }
    };
});