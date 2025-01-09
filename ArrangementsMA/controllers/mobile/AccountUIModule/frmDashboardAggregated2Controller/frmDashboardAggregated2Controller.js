/*
add the following
    this.startY=y; to onTouchStart of ads flex
    this.adsOnTouchMove(y); to onTouchMove of ads fex
    this.adsOnTouchEnd(); to onTouchEnd of ads flex
*/
define({
    //mobile controller
    accountDetails: null,
    segLength: 0,
    totalLength: 0,
    startY: 0,
    isChartCollapsed: true,
    dashboardHeight: 0,
    shouldAnimateBar: true,
    barHeights: [],
    setAccountsData: function () { //add param "data" to the function to assign to the segment
        var widgetDataMap = {
            "flxAccountName": "flxAccountName",
            "flxAccounts": "flxAccounts",
            "flxAccountsHeaderDashboard": "flxAccountsHeaderDashboard",
            "flxBank": "flxBank",
            "flxDelete": "flxDelete",
            "flxHeaderSeperator": "flxHeaderSeperator",
            "flxHeaderShadows": "flxHeaderShadows",
            "flxMain": "flxMain",
            "flxSeparator": "flxSeparator",
            "flxShadowBottom": "flxShadowBottom",
            "flxTypeOneShadow": "flxTypeOneShadow",
            "imgBank": "imgBank",
            "imgDelete": "imgDelete",
            "imgError": "imgError",
            "lblAccountBal": "lblAccountBal",
            "lblAccountBalValue": "lblAccountBalValue",
            "lblAccountName": "lblAccountName",
            "lblAccountNumber": "lblAccountNumber",
            "lblBankName": "lblBankName",
            "lblDelete": "lblDelete",
            "lblTypeName": "lblTypeName",
            "lblTypeValue": "lblTypeValue"
        };
        var data = [
            [{
                    "lblAccountBal": {
                        "text": "Available Balance"
                    },
                    "lblTypeName": {
                        "text": "Checking Accounts (3)"
                    },
                    "lblTypeValue": {
                        "text": "$127,912.00"
                    }
                },
                [{
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": ""
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": ""
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    }
                ]
            ],
            [{
                    "lblAccountBal": {
                        "text": "Available Balance"
                    },
                    "lblTypeName": {
                        "text": "Checking Accounts (3)"
                    },
                    "lblTypeValue": {
                        "text": "$127,912.00"
                    }
                },
                [{
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    }
                ]
            ],
            [{
                    "lblAccountBal": {
                        "text": ""
                    },
                    "lblTypeName": {
                        "text": "Checking Accounts (3)"
                    },
                    "lblTypeValue": {
                        "text": ""
                    }
                },
                [{
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    }
                ]
            ],
            [{
                    "lblAccountBal": {
                        "text": ""
                    },
                    "lblTypeName": {
                        "text": "Checking Accounts (3)"
                    },
                    "lblTypeValue": {
                        "text": ""
                    }
                },
                [{
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    },
                    {
                        "imgBank": {
                            "src": ""
                        },
                        "imgDelete": {
                            "src": ""
                        },
                        "imgError": {
                            "src": ""
                        },
                        "lblAccountBal": {
                            "text": ""
                        },
                        "lblAccountBalValue": {
                            "text": "test"
                        },
                        "lblAccountName": {
                            "text": ""
                        },
                        "lblAccountNumber": {
                            "text": ""
                        },
                        "lblBankName": {
                            "text": ""
                        },
                        "lblDelete": {
                            "text": ""
                        }
                    }
                ]
            ]
        ];
        this.view.segAccounts.widgetDataMap = widgetDataMap;
        this.view.segAccounts.setData(data);
    },
    //adds dummy rows to the existing segment to cover the charts and ads
    addDummyRows: function () {
        var topEmptySpace = 325; //empty row height for graphs
        var bottomEmptySpace = 405; //empty row height for ads
        var segWidgetDataMap = this.view.segAccounts.widgetDataMap;
        segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
        segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
        this.view.segAccounts.widgetDataMap = segWidgetDataMap;
        var segData = this.view.segAccounts.data;
        var segLength = 0;
        for (let i = 0; i < segData.length; i++) {
            segLength = segLength + (segData[i][1].length * 70) + 82; //row height is 70 and header height is 82
        }
        segData.unshift([{
                "template": "flxEmptyHeader",
                "flxEmptyHeader": {
                    "height": "0dp"
                }
            },
            [{
                "template": "flxEmptyRow",
                "flxEmptyRow": {
                    "height": topEmptySpace + "dp"
                }
            }]
        ]);
        segLength = segLength + topEmptySpace; //subtract header shadow height from this
        segData.push([{
                "template": "flxEmptyHeader",
                "flxEmptyHeader": {
                    "height": "0dp"
                }
            },
            [{
                "template": "flxEmptyRow",
                "flxEmptyRow": {
                    "height": bottomEmptySpace + "dp" //change the height to ads height
                }
            }]
        ])
        this.view.segAccounts.setData(segData);
        this.view.flxSuggestedOffers.top = segLength + "dp";
        this.segLength = segLength;
        this.totalLength = this.segLength + bottomEmptySpace;
    },
    preShow: function () {
        var self = this;
        if (applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone") {
            this.view.flxTitle.setVisibility(false);
        } else {
            this.view.flxMenu.setVisibility(false);
        }
        this.view.segAccounts.onScrolling = function () {
            self.segAccountsOnScrolling();
        };
        // this.view.flxSuggestedOffers.onTouchStart = function(){
        //     this.startY=y;
        // };
        // this.view.flxSuggestedOffers.adsOnTouchEnd = function(){
        //     self.adsOnTouchEnd();
        // };
        this.view.flxShowAllAccountTypes.onClick = function () {
            // alert("before on show" +  !self.view.flxAccountTypes.isVisible);
            var isAccountsVisible = self.view.flxAccountTypes.isVisible;
            self.view.flxAccountTypes.isVisible = !isAccountsVisible;
            // self.view.forceLayout();
            // alert("after on show");
        };
        this.view.flxChartSizeToggle.onTouchEnd = this.chartSizeToggleOnClick;
        // this.setAccountsData(); //setting data to transaction segment
        this.addDummyRows(); //adds dummy rows for graph at the top and ads at the bottom
        this.RotateLablesCalls();
        this.view.flxHScroll.onScrolling = this.pageIndicatorHighlight;
    },
    postShow: function () {
        this.dashboardHeight = this.view.flxDashboard.frame.height;
        this.view.segAccounts.height = this.dashboardHeight + 12 + "dp";
        this.view.forceLayout();
    },
    segAccountsOnScrolling: function () {
        var parallaxSpeed = 1; //range is 0 to 1. 1 -> goes along with segment. 0 -> doesn't move
        var yOffset = this.view.segAccounts.contentOffsetMeasured.y;
        this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxHScroll.top = 0 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxShadow.top = 225 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxPageIndicators.top = 225 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxChartSizeToggle.top = 250 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxSelectAccount.top = 285 - (yOffset * parallaxSpeed) + "dp";
        this.view.flxSuggestedOffers.top = this.segLength - 160 - (yOffset * parallaxSpeed) + "dp";
    },
    adsOnTouchMove: function (moveY) {
        var newY = this.view.segAccounts.contentOffsetMeasured.y + (this.startY - moveY) + "dp";
        this.view.segAccounts.contentOffset = {
            x: "0dp",
            y: newY
        };
    },
    adsOnTouchEnd: function () {
        if (this.view.segAccounts.contentOffsetMeasured.y > (this.totalLength - this.view.segAccounts.frame.height)) {
            this.view.segAccounts.contentOffset = {
                x: "0dp",
                y: (this.totalLength - this.view.segAccounts.frame.height) + "dp"
            };
        }
    },
    pageIndicatorHighlight: function () {
        for (let index = 1; index <= this.view.flxPageIndicators.widgets().length; index++) {
            this.view["flxPageIndicator" + index].skin = "sknFlxPageIndicatorUnselected";
        }
        var scrollX = this.view.flxHScroll.contentOffsetMeasured.x;
        var screenWidth = kony.os.deviceInfo().screenWidth;
        var chartNum = Math.round(scrollX / screenWidth) + 1;
        this.view["flxPageIndicator" + chartNum].skin = "sknFlxPageIndicatorSelected";
        kony.print("chart num" + chartNum);
        if (chartNum === 3 && this.shouldAnimateBar) {
            this.shouldAnimateBar = false;
            this.animateBarChart();
        }
    },
    animateBarChart: function () {
        var scope = this;
        var balanceBars = this.view.allBalanceBars.widgets();
        for (var p = 0; p < balanceBars.length; p++) {
            // alert("inside for loop");
            var thisBar = "bar" + p;
            var thisHeight = this.barHeights[p];
            var thisHeightExtend = thisHeight + (thisHeight * 0.15);
            this.view[thisBar].animate(
                kony.ui.createAnimation({
                    0: {
                        height: 0,
                        opacity: 0,
                        "stepConfig": {}
                    },
                    80: {
                        height: thisHeightExtend,
                        opacity: .8,
                        "stepConfig": {}
                    },
                    100: {
                        height: thisHeight + "dp",
                        opacity: 1,
                        "stepConfig": {}
                    }
                }), {
                    delay: (p * .05),
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: .55
                }, {
                    animationEnd: function () {
                        if (thisBar === "bar11") {
                            scope.shouldAnimateBar = true;
                            kony.print("animation ended");
                        }
                    }
                });
            var thisChildLabel = "barLabel" + p;
            this.view[thisChildLabel].animate(
                kony.ui.createAnimation({
                    0: {
                        opacity: 0,
                        "stepConfig": {}
                    },
                    100: {
                        opacity: 1,
                        "stepConfig": {}
                    }
                }), {
                    delay: (p * .045),
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: .4
                }, {
                    animationEnd: function () {}
                });
        }
        // this.view.forceLayout();
    },
    RotateLablesCalls: function () {
        var self = this;
        this.RotateLables(self.view.barLabel0);
        this.RotateLables(self.view.barLabel1);
        this.RotateLables(self.view.barLabel2);
        this.RotateLables(self.view.barLabel3);
        this.RotateLables(self.view.barLabel4);
        this.RotateLables(self.view.barLabel5);
        this.RotateLables(self.view.barLabel6);
        this.RotateLables(self.view.barLabel7);
        this.RotateLables(self.view.barLabel8);
        this.RotateLables(self.view.barLabel9);
        this.RotateLables(self.view.barLabel10);
        this.RotateLables(self.view.barLabel11);
    },
    RotateLables: function (labelWidget) {
        var trans100 = kony.ui.makeAffineTransform();
        trans100.rotate(45);
        labelWidget.animate(
            kony.ui.createAnimation({
                "100": {
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    },
                    "transform": trans100
                }
            }), {
                "delay": 0,
                "iterationCount": 1,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": 0.25
            }, {});
    },
    chartSizeToggleOnClick: function () {
        //scrolling the segment to the top then doing the animation
        this.view.flxChartSizeToggle.setEnabled(false);
        var dashboardBottom;
        var animationTime = 0.5;
        var scope = this;
        this.view.segAccounts.contentOffset = {
            x: "0dp",
            y: "0dp"
        };
        var newHeight = this.dashboardHeight;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            dashboardBottom = 0;
        } else {
            dashboardBottom = 60;
        }
        newHeight = newHeight + dashboardBottom - 35; // adding the custom footer height and subtracting the toggle height
        var segMaxHeight = newHeight - 260; //newheight - top of the segment
        this.view.flxSummarySegment.height = segMaxHeight + "dp";
        this.view.flxDonutSegment.height = segMaxHeight + "dp";
        this.view.flxBarSegment.height = segMaxHeight + "dp";
        var trans100 = kony.ui.makeAffineTransform();
        if (this.isChartCollapsed) { //Expand animation
            trans100.rotate(180);
            this.view.imgChartSizeToggle.animate(
                kony.ui.createAnimation({
                    100: {
                        stepConfig: {
                            "timingFunction": kony.anim.EASE
                        },
                        transform: trans100
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {
                        scope.isChartCollapsed = false;
                        scope.view.flxChartSizeToggle.setEnabled(true);
                    }
                }
            );
            scope.view.flxDashboard.animate(
                kony.ui.createAnimation({
                    0: {
                        height: newHeight - dashboardBottom + 35 + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: newHeight + 35,
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxMenu.animate(
                kony.ui.createAnimation({
                    0: {
                        bottom: "0dp",
                        "stepConfig": {}
                    },
                    100: {
                        bottom: "-60dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxHScroll.animate(
                kony.ui.createAnimation({
                    0: {
                        height: "250dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: newHeight + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxShadow.animate(
                kony.ui.createAnimation({
                    0: {
                        top: "225dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: newHeight + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxChartSizeToggle.animate(
                kony.ui.createAnimation({
                    0: {
                        top: "250dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: newHeight + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxSelectAccount.animate(
                kony.ui.createAnimation({
                    0: {
                        top: "285dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: newHeight + 35 + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxGradient.animate(
                kony.ui.createAnimation({
                    0: {
                        height: "260dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: newHeight + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {
                    }
                }
            );
        } else { //Collapse animation
            trans100.rotate(0);
            this.view.imgChartSizeToggle.animate(
                kony.ui.createAnimation({
                    100: {
                        stepConfig: {
                            "timingFunction": kony.anim.EASE
                        },
                        transform: trans100
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {
                        scope.isChartCollapsed = true;
                        scope.view.flxChartSizeToggle.setEnabled(true);
                    }
                }
            );
            scope.view.flxDashboard.animate(
                kony.ui.createAnimation({
                    0: {
                        height: newHeight + 35,
                        "stepConfig": {}
                    },
                    100: {
                        height: newHeight - dashboardBottom + 35 + "dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxMenu.animate(
                kony.ui.createAnimation({
                    0: {
                        bottom: "-60dp",
                        "stepConfig": {}
                    },
                    100: {
                        bottom: "0dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxHScroll.animate(
                kony.ui.createAnimation({
                    0: {
                        height: newHeight + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: "250dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxShadow.animate(
                kony.ui.createAnimation({
                    0: {
                        top: newHeight + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: "225dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxChartSizeToggle.animate(
                kony.ui.createAnimation({
                    0: {
                        top: newHeight + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: "250dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxSelectAccount.animate(
                kony.ui.createAnimation({
                    0: {
                        top: newHeight + 35 + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        top: "285dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
            scope.view.flxGradient.animate(
                kony.ui.createAnimation({
                    0: {
                        height: newHeight + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: "260dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: animationTime
                }, {
                    animationEnd: function () {}
                }
            );
        }
    }
});