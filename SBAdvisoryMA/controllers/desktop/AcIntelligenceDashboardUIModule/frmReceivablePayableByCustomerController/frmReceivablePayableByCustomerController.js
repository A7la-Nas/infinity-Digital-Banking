define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
    var StackedBarChart = {};
    var BreakdownChart = {};
    var contentScope;
    var simulationData;
    var byCustomerData;
    var totalPercentage;
    var PayablesByCustomerData;
    let isReceivable = false;
    return {

        /**
         * @api : onNavigate
         * This function for executing the preShow and postShow
         * @return : NA
         */
        onNavigate: function (data) {
            var scope = this;
            try {
                simulationData = data.simulationData || {
                    buttonType: false
                };
                scope.intializePresentationControllers();
                contentScope = this.view.formTemplate12.flxContentTCCenter;
                if (data.id === accountsIntelligencePresenter.Receivables) {
                    accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcReceivable, contentScope.btnCashflowPrediction, contentScope.btnAcPayable);
                    isReceivable = true;
                    scope.callReceivablesByCustomer();
                    scope.setByCustomerData(accountsIntelligencePresenter.receivableSummaryData);
                } else if (data.id === accountsIntelligencePresenter.Payables) {
                    accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable);
                    isReceivable = false;
                    scope.callReceivablesByCustomer();
                    scope.setByCustomerData(accountsIntelligencePresenter.receivablePayableData);
                }
                accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnByCustomer, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnUpcoming);
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * Sets the initial actions for form
         */
        init: function () {
            try {
                this.view.preShow = this.preShow;
                this.view.postShow = this.postShow;
                this.view.onBreakpointChange = this.onBreakpointChange;
            } catch (err) {
                var errorObj = {
                    //"level": "frmReceivablePayableByCustomer",
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function () {
            var scope = this;
            try {
                presenter.cursorTypePointer(
                    [
                        contentScope.lblSearch,
                        contentScope.lblDownload,
                        contentScope.lblDropdown
                    ]);
                this.initFormActions();
            } catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function () {
            var scope = this;
            try {
                scope.onClickActions();
                scope.setSegTypeData();
            } catch (err) {
                var errorObj = {
                    //"level": "frmReceivablePayableByCustomer",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
    * @api :initFormActions
    * Contains button/user actions
    * @arg : NA
    * @return : NA
    */
        initFormActions: function () {
            var scope = this;
            try {
                contentScope.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                contentScope.flxTypeDropDownList.setVisibility(false);
                contentScope.lblSearch.onTouchEnd = scope.keepCursorInTextBox.bind(scope);
                if (isReceivable) {
                    contentScope.DetailedTable.setVisibility(true);
                    contentScope.BySuplierDetailedTable.setVisibility(false);
                } else {
                    contentScope.DetailedTable.setVisibility(false);
                    contentScope.BySuplierDetailedTable.setVisibility(true);
                }
                contentScope.txtSearch.onKeyUp = () => {
                    if (contentScope.txtSearch.text.length > 0) {
                        contentScope.flxCross.setVisibility(true);
                    } else {
                        contentScope.flxCross.setVisibility(false);
                    }
                    if (isReceivable) {
                        contentScope.DetailedTable.setSearchString(byCustomerData, contentScope.txtSearch.text);
                    } else {
                        contentScope.BySuplierDetailedTable.setSearchString(PayablesByCustomerData, contentScope.txtSearch.text);
                    }
                };
                contentScope.flxCross.onClick = () => {
                    contentScope.txtSearch.text = "";
                    if (isReceivable) {
                        contentScope.DetailedTable.setSearchString(byCustomerData, contentScope.txtSearch.text);
                    } else {
                        contentScope.BySuplierDetailedTable.setSearchString(PayablesByCustomerData, contentScope.txtSearch.text);
                    }
                    contentScope.flxCross.setVisibility(false);
                };
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "initFormActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : updateFormUI
         * This function for handles the responses from presentation controller
         * @return : NA
         */
        updateFormUI: function (viewModel) {
            var scope = this;
            try {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.ReceivablesByCustomer) {
                    byCustomerData = JSON.parse(JSON.stringify(viewModel.ReceivablesByCustomer));
                    var ReceivablesByCustomerAmount = JSON.parse(JSON.stringify(viewModel.ReceivablesByCustomer));
                    scope.setTotalReceivablesData(ReceivablesByCustomerAmount);
                    scope.setDetailedTableData(viewModel.ReceivablesByCustomer);
                    scope.setStackedbarChartData(ReceivablesByCustomerAmount);
                    scope.setBreakdownChartData(ReceivablesByCustomerAmount);
                }
                if (viewModel.PayableBySupplier) {
                    PayablesByCustomerData = JSON.parse(JSON.stringify(viewModel.PayableBySupplier));
                    var PayablesByCustomerDatarAmount = JSON.parse(JSON.stringify(viewModel.PayableBySupplier));
                    scope.setTotalReceivablesData(PayablesByCustomerDatarAmount);
                    scope.setStackedbarChartData(PayablesByCustomerDatarAmount);
                    scope.setDetailedTableData(viewModel.PayableBySupplier);
                    scope.setBreakdownChartData(PayablesByCustomerDatarAmount);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "updateFormUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : setStackedbarChartData
         * This function for constructing stacked bar chart data
         * @return : NA
         */
        setStackedbarChartData: function (responseData) {
            var scope = this;
            responseData = accountsIntelligencePresenter.sortAndReturnTop5Values(responseData, "rankByAmt");
            StackedBarChart.chartProperties = {
                id: contentScope.StackedCustomerBarChart.customContainerID,
                legend: 'none',
                height: '400',
                width: '735',
                colors: [isReceivable ? '#E45A42' : '#FF9928', isReceivable ? '#4A9810' : '#0072BD', isReceivable ? '#7EC34A' : '#3A9EE1', isReceivable ? '#A0D975' : '#71B8E7', isReceivable ? '#C1ECA0' : '#A6D7F7'],
                isStacked: true,
                tooltip: {
                    isHtml: true
                },
                hAxis: {
                    format: 'short',
                    gridlines: {
                        count: 10
                    }
                },
                bar: {
                    groupWidth: '50%'
                },
                annotations: {
                    style: 'line',
                },
            };
            StackedBarChart.data = [
                ['x', 'v1', {
                    type: 'string',
                    role: 'tooltip',
                    p: {
                        html: true
                    }
                }, 'v2', {
                        type: 'string',
                        role: 'tooltip',
                        p: {
                            html: true
                        }
                    }, 'v3', {
                        type: 'string',
                        role: 'tooltip',
                        p: {
                            html: true
                        }
                    }, 'v4', {
                        type: 'string',
                        role: 'tooltip',
                        p: {
                            html: true
                        }
                    }, 'v5', {
                        type: 'string',
                        role: 'tooltip',
                        p: {
                            html: true
                        }
                    }]
            ];
            scope.constructStackedBarData(responseData);
            contentScope.StackedCustomerBarChart.data = JSON.stringify(StackedBarChart);
            contentScope.StackedCustomerBarChart.text1 = kony.i18n.getLocalizedString("i18n.AccountSummary.overdue");
            contentScope.StackedCustomerBarChart.text2 = "0-10 Days";
            contentScope.StackedCustomerBarChart.text3 = "11-30 Days";
            contentScope.StackedCustomerBarChart.text4 = "31-60 Days";
            contentScope.StackedCustomerBarChart.text5 = ">60 Days";
            contentScope.StackedCustomerBarChart.skin1 = isReceivable ? "ICSknFlxe45a42Round" : "ICSknFlxff9928Round";
            contentScope.StackedCustomerBarChart.skin2 = isReceivable ? "ICSknFlx4a9810Round" : "ICSknFlx0072bdRound";
            contentScope.StackedCustomerBarChart.skin3 = isReceivable ? "ICSknFlx7ec34aRound" : "ICSknFlx3a9ee1Round";
            contentScope.StackedCustomerBarChart.skin4 = isReceivable ? "ICSknFlxa0d975Round" : "ICSknFlx71b8e7Round";
            contentScope.StackedCustomerBarChart.skin5 = isReceivable ? "ICSknFlxc1eca0Round" : "ICSknFlxa6d7f7Round";
        },

        constructStackedBarData: function (responseData) {
            var scope = this;
            var totalReceivables = 0;
            try {
                if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue")) {
                    responseData.map((data) => {
                        totalReceivables = parseInt(data.overdueAmt) + parseInt(isReceivable ? data.sumCount0to10Days : data.billsSum0to10Days) + parseInt(isReceivable ? data.sumCount11to30Days : data.billsSum11to30Days) + parseInt(isReceivable ? data.sumCount31to60Days : data.billsSum31to60Days) + parseInt(isReceivable ? data.sumCountBeyond60Days : data.billsSumBeyond60Days);
                        StackedBarChart.data.push(
                            [data.customerName, parseInt(data.overdueAmt), scope.setStackedBarTooltipContent('Overdue', accountsIntelligencePresenter.formatAmount(parseInt(data.overdueAmt)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#E45A42' : '#FF9928'),
                            parseInt(isReceivable ? data.sumCount0to10Days : data.billsSum0to10Days), scope.setStackedBarTooltipContent('0-10 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.sumCount0to10Days : data.billsSum0to10Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#4A9810' : '#0072BD'),
                            parseInt(isReceivable ? data.sumCount11to30Days : data.billsSum11to30Days), scope.setStackedBarTooltipContent('11-30 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.sumCount11to30Days : data.billsSum11to30Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#7EC34A' : '#3A9EE1'),
                            parseInt(isReceivable ? data.sumCount31to60Days : data.billsSum31to60Days), scope.setStackedBarTooltipContent('31-60 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.sumCount31to60Days : data.billsSum31to60Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#A0D975' : '#71B8E7'),
                            parseInt(isReceivable ? data.sumCountBeyond60Days : data.billsSumBeyond60Days), scope.setStackedBarTooltipContent('>60 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.sumCountBeyond60Days : data.billsSumBeyond60Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#C1ECA0' : '#A6D7F7')
                            ]);
                    });
                } else if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount")) {
                    responseData.map((data) => {
                        totalReceivables = parseInt(isReceivable ? data.countOfOverdueInvoices : data.countOfOverdueBills) + parseInt(isReceivable ? data.invoiceCount0to10Days : data.billsCount0to10Days) + parseInt(isReceivable ? data.invoiceCount11to30Days : data.billsCount11to30Days) + parseInt(isReceivable ? data.invoiceCount31to60Days : data.billsCount31to60Days) + parseInt(isReceivable ? data.invoiceCountBeyond60Days : data.billsCountBeyond60Days);
                        StackedBarChart.data.push(
                            [data.customerName, parseInt(isReceivable ? data.countOfOverdueInvoices : data.countOfOverdueBills), scope.setStackedBarTooltipContent('Overdue', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.countOfOverdueInvoices : data.countOfOverdueBills)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#E45A42' : '#FF9928'),
                            parseInt(isReceivable ? data.invoiceCount0to10Days : data.billsCount0to10Days), scope.setStackedBarTooltipContent('0-10 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.invoiceCount0to10Days : data.billsCount0to10Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#4A9810' : '#0072BD'),
                            parseInt(isReceivable ? data.invoiceCount11to30Days : data.billsCount11to30Days), scope.setStackedBarTooltipContent('11-30 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.invoiceCount11to30Days : data.billsCount11to30Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#7EC34A' : '#3A9EE1'),
                            parseInt(isReceivable ? data.invoiceCount31to60Days : data.billsCount31to60Days), scope.setStackedBarTooltipContent('31-60 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.invoiceCount31to60Days : data.billsCount31to60Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#A0D975' : '#71B8E7'),
                            parseInt(isReceivable ? data.invoiceCountBeyond60Days : data.billsCountBeyond60Days), scope.setStackedBarTooltipContent('>60 days', accountsIntelligencePresenter.formatAmount(parseInt(isReceivable ? data.invoiceCountBeyond60Days : data.billsCountBeyond60Days)), accountsIntelligencePresenter.formatAmount(totalReceivables), data.customerName, isReceivable ? '#C1ECA0' : '#A6D7F7')
                            ]);
                    });
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "constructStackedBarData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : setStackedBarTooltipContent
         * This function for customizing stacked bar tooltip content
         * @return : NA
         */
        setStackedBarTooltipContent: function (lbl, val, totalVal, heading, circleColor) {
            var scope = this;
            try {
                return ('<div class="stackedMainContent" style="width:250px;height:85px"><div class="stackedHeader"><p id="heading">' + heading + '</p></div><div class="rowContent"><div class="row"><div class="leftlabel"><div class="circle"style="background:' + circleColor + '"></div><span class="label">' + lbl + '</div></span></span><span class="value"><b>' + val + '</b></span></div><div class="row"><div class="leftlabel"><span class="totalLabel">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.totalReceivables") + '</span></div><span class="value"><b>' + totalVal + '</b></span></div></div></div>')
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setStackedBarTooltipContent",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setBreakdownChartData: function (responseData) {
            var scope = this;
            try {
                responseData = accountsIntelligencePresenter.sortAndReturnTop5Values(responseData, isReceivable ? "rankByAmt" : "rankByInvoice");
                BreakdownChart.chartProperties = {
                    legend: 'none',
                    height: '300',
                    width: '410',
                    pieHole: 0.5,
                    pieSliceText: 'none',
                    colors: ['#E6417A', '#B95EE8', '#3645A7', '#E8705B', '#6753EC', '#BDBDBD'],
                    tooltip: {
                        isHtml: true,
                        textStyle: {
                            fontName: 'Source Sans Pro',
                            fontSize: '15',
                        }
                    },
                };
                BreakdownChart.data = [
                    ["x", "amount", {
                        "type": "string",
                        "role": "tooltip",
                        "p": {
                            "html": true,
                            "role": "tooltip"
                        }
                    }],
                ];
                scope.constructBreakdownData(responseData);
                contentScope.BreakdownDoughnutChart.data = JSON.stringify(BreakdownChart);
                contentScope.BreakdownDoughnutChart.text1 = BreakdownChart.data[1][0] + ":";
                contentScope.BreakdownDoughnutChart.text2 = accountsIntelligencePresenter.getPercentageValue(BreakdownChart.data[1][1]);
                contentScope.BreakdownDoughnutChart.text3 = BreakdownChart.data[4][0] + ":";
                contentScope.BreakdownDoughnutChart.text4 = accountsIntelligencePresenter.getPercentageValue(BreakdownChart.data[4][1]);
                contentScope.BreakdownDoughnutChart.text5 = BreakdownChart.data[2][0] + ":";
                contentScope.BreakdownDoughnutChart.text6 = accountsIntelligencePresenter.getPercentageValue(BreakdownChart.data[2][1]);
                contentScope.BreakdownDoughnutChart.text7 = BreakdownChart.data[5][0] + ":";
                contentScope.BreakdownDoughnutChart.text8 = accountsIntelligencePresenter.getPercentageValue(BreakdownChart.data[5][1]);
                contentScope.BreakdownDoughnutChart.text9 = BreakdownChart.data[3][0] + ":";
                contentScope.BreakdownDoughnutChart.text10 = accountsIntelligencePresenter.getPercentageValue(BreakdownChart.data[3][1]);
                contentScope.BreakdownDoughnutChart.text11 = kony.i18n.getLocalizedString("i18n.SBAdvisory.remaining");
                contentScope.BreakdownDoughnutChart.text12 = accountsIntelligencePresenter.getPercentageValue(100 - totalPercentage);
                contentScope.BreakdownDoughnutChart.skin1 = "ICSknFlxe6417aRound";
                contentScope.BreakdownDoughnutChart.skin2 = "ICSknFlxe8705bRound";
                contentScope.BreakdownDoughnutChart.skin3 = "ICSknFlxb95ee8Round";
                contentScope.BreakdownDoughnutChart.skin4 = "skn6753ECPFM";
                contentScope.BreakdownDoughnutChart.skin5 = "ICSknFlx3645a7Round";
                contentScope.BreakdownDoughnutChart.skin6 = "ICSknFlxbdbdbdRound";
                contentScope.BreakdownDoughnutChart.isVisible3 = true;
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setBreakdownChartData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        constructBreakdownData: function (responseData) {
            var scope = this;
            try {
                totalPercentage = 0;
                if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue")) {
                    responseData.map((data, index) => {
                        BreakdownChart.data.push(
                            [data.customerName, parseInt(isReceivable ? data.percentOfAllInvoiceAmountsDue : data.percentOfAllBillAmountsDue), scope.setBreakdownTooltipContent(data.customerName, accountsIntelligencePresenter.getPercentageValue(parseInt(isReceivable ? data.percentOfAllInvoiceAmountsDue : data.percentOfAllBillAmountsDue)), BreakdownChart.chartProperties.colors[index])],)
                        totalPercentage += parseInt(isReceivable ? data.percentOfAllInvoiceAmountsDue : data.percentOfAllBillAmountsDue);
                    });
                } else if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount")) {
                    responseData.map((data, index) => {
                        BreakdownChart.data.push(
                            [data.customerName, parseInt(isReceivable ? data.percentOfAllInvoicesDue : data.percentOfAllBillsDue), scope.setBreakdownTooltipContent(data.customerName, accountsIntelligencePresenter.getPercentageValue(parseInt(isReceivable ? data.percentOfAllInvoicesDue : data.percentOfAllBillsDue)), BreakdownChart.chartProperties.colors[index])],)
                        totalPercentage += parseInt(isReceivable ? data.percentOfAllInvoicesDue : data.percentOfAllBillsDue);
                        // );
                    });
                }
                BreakdownChart.data.push(
                    [kony.i18n.getLocalizedString("i18n.SBAdvisory.remaining"), parseInt(100 - totalPercentage), scope.setBreakdownTooltipContent(kony.i18n.getLocalizedString("i18n.SBAdvisory.remainingWithOutColon"), accountsIntelligencePresenter.getPercentageValue(parseInt(100 - totalPercentage)), BreakdownChart.chartProperties.colors[BreakdownChart.chartProperties.colors.length - 1])]);
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setBreakdownChartData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
        * @api : setBreakdownTooltipContent
        * This function for constructing breakdown chart tooltip content
        * @return : NA
        */
        setBreakdownTooltipContent: function (lbl, val, circleColor) {
            var scope = this;
            try {
                return ('<div><div class="doughnutMainContent" style= "height:64px;width:' + (lbl.length > 13 ? '250' : '200') + 'px"><div class="content"><div class="circle"style="background:' + circleColor + '"></div><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setBreakdownTooltipContent",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : intializePresentationControllers
         * this function for intializing the presentation controllers
         * @arg1 : NA
         * @return : NA
         */
        intializePresentationControllers: function () {
            var scope = this;
            try {
                presenter = applicationManager.getModulesPresentationController({
                    appName: 'SBAdvisoryMA',
                    moduleName: 'EnrolmentModule'
                });
                accountsIntelligencePresenter = applicationManager.getModulesPresentationController({
                    appName: 'SBAdvisoryMA',
                    moduleName: 'AcIntelligenceDashboardUIModule'
                });
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "intializePresentationControllers",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : onClickActions
         * this function responsible for onclick of widgets in the forms
         * @arg1 : NA
         * @return : NA
         */
        onClickActions: function () {
            var scope = this;
            try {
                contentScope.flxDownload.onClick = () => {
                    if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
                        accountsIntelligencePresenter.downloadReceivableSummary(this.view.id);
                    } else {
                        accountsIntelligencePresenter.downloadPayableSummary(this.view.id);
                    }
                };
                contentScope.flxDownloadContainer.onClick = () => {
                    if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
                        scope.callReceivableByCustomerDownload(true);
                    } else {
                        scope.callReceivableByCustomerDownload(false);
                    }
                };
                //Tabs OnClick 
                contentScope.btnAcReceivable.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
                        id: "Receivable"
                    });
                };
                contentScope.btnAcPayable.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
                        id: "Payable"
                    });
                };
                contentScope.btnCashflowPrediction.onClick = () => {
                    presenter.navigateToScreens("SBAStimulation", simulationData);
                };
                //Options OnClick
                contentScope.btnSummary.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
                        id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
                    });
                };
                contentScope.btnOverdue.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableOverdue", {
                        id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
                    });
                };
                contentScope.btnUpcoming.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnUpcoming, contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer, contentScope.btnOverdue, "SBAReceivablePayableUpcoming", {
                        id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
                    });
                };
                contentScope.btnAveragePaymentDays.onClick = () => {
                    accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer, "SBAReceivablePayablePayment", {
                        id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
                    });
                };
                //search related code
                contentScope.flxDropdown.onClick = scope.showOrHideTypeList.bind(this);
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "intializePresentationControllers",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setByCustomerData
         * this function responsible for setting upcoming header data
         * @arg1 : NA
         * @return : NA
         */
        setByCustomerData: function (responseData) {
            var scope = this;
            try {
                contentScope.lblTotalReceivableAmountValue.text = accountsIntelligencePresenter.formatAmount(parseFloat(responseData.summaryOverdueUpcomingAmt));
                contentScope.lblInvoiceCountValue.text = Math.abs(parseFloat(isReceivable ? responseData.summaryOverdueInvoices : responseData.CountOfOverdueBills) + parseFloat(isReceivable ? responseData.summaryOverdueUpcomingInvoices : responseData.summaryOverdueUpcomingBills)).toString();
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setByCustomerData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : callReceivablesByCustomer
         * this function responsible for calling service for receivables by customer
         * @arg1 : NA
         * @return : NA
         */
        callReceivablesByCustomer: function () {
            var scope = this;
            try {
                if (isReceivable) {
                    contentScope.txtSearch.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.searchByCustomerName");
                    accountsIntelligencePresenter.getReceivablesByCustomer({
                        "queryParam": "ReceivablesByCustomer",
                        "modelName": "ReceivablesByCustomer",
                        "topParam": "ReceivablesByCustomer",
                        "orderParam": "ReceivablesByCustomer",
                        "Subscriber": "ReceivablesByCustomer"
                    }, this.view.id);
                } else {
                    contentScope.txtSearch.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.searchBySupplierName");
                    accountsIntelligencePresenter.getPayableBySupplier({
                        "modelName": "PayableBySupplier",
                        "topParam": "PayableBySupplier",
                        "orderParam": "PayableBySupplier",
                        "queryParam": "PayableBySupplier"
                    }, this.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "callReceivablesByCustomer",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setTotalReceivablesData: function (responseData) {
            var scope = this;
            try {
                contentScope.lblListingTitle.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.customersList") : kony.i18n.getLocalizedString("i18n.SBAdvisory.suppliersList");
                contentScope.lblByCustomer.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.byCustomer") : kony.i18n.getLocalizedString("i18n.SBAdvisory.bySupplier");
                contentScope.btnByCustomer.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.byCustomer") : kony.i18n.getLocalizedString("i18n.SBAdvisory.bySupplier");
                contentScope.lblTotalReceivableAmount.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.totalReceivableAmount") : kony.i18n.getLocalizedString("i18n.SBAdvisory.totalPayableAmount");
                contentScope.lblInvoiceCount.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.invoiceCount") : kony.i18n.getLocalizedString("i18n.SBAdvisory.billsCount");
                if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue")) {
                    contentScope.lblPercentageBreakdownHeader.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.percentageBreakdownofTotalReceivables" : "i18n.SBAdvisory.PercentageBreakdownOfTotalPayables")}`
                    contentScope.lblLeftTotalReceivablesGraphHeader.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.top5CustomersbyTotalReceivables" : "i18n.SBAdvisory.top5CustomersByTotalPayables")}` + " " + accountsIntelligencePresenter.formatAmount((parseInt(responseData[0].totDueAmtOfTop5) + parseInt(responseData[0].totAmtOfTop)));
                } else if (contentScope.lblTypeValue.text == kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount")) {
                    contentScope.lblPercentageBreakdownHeader.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.percentageBreakdownofInvoiceCount" : "i18n.SBAdvisory.PercentageBreakdownOfTotalPayables")}`
                    responseData = accountsIntelligencePresenter.sortAndReturnTop5Values(responseData, "rankByInvoice");
                    contentScope.lblLeftTotalReceivablesGraphHeader.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.top5CustomersbyInvoiceCount" : "i18n.SBAdvisory.top5CustomersByBillsCount")}` + " " + (parseInt(`${accountsIntelligencePresenter.addAndReturnSum(responseData, isReceivable ? "countOfOverdueInvoices" : "countOfOverdueBills")}`) + parseInt(`${accountsIntelligencePresenter.addAndReturnSum(responseData, isReceivable ? "countOfOverdueInvoices0to10" : "billsCount0to10Days")}`) + parseInt(`${accountsIntelligencePresenter.addAndReturnSum(responseData, isReceivable ? "countOfOverdueInvoices11to30" : "billsCount11to30Days")}`) + parseInt(`${accountsIntelligencePresenter.addAndReturnSum(responseData, isReceivable ? "countOfOverdueInvoices31to60" : "billsCount31to60Days")}`) + parseInt(`${accountsIntelligencePresenter.addAndReturnSum(responseData, isReceivable ? "countOfOverdueInvoicesBeyond60" : "billsCountBeyond60Days")}`));
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "callReceivablesByCustomer",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
  * @api : onBreakpointChange
  * This function for changing the UI depending upon breakpoint
  * @return : NA
  */
        onBreakpointChange: function () {
            var scope = this;
            try { } catch (err) {
                var errorObj = {
                    "method": "onBreakpointChange",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : setDetailedTableData
         * This function for setting the data Detailed Table
         * @return : NA
         */
        setDetailedTableData: function (responseData) {
            var scope = this;
            try {
                for (let i = 0; i < responseData.length; i++) {
                    let totalAmount = parseInt(responseData[i].overdueAmt) + parseInt(responseData[i].totDueAmt)
                    responseData[i]["totalAmount"] = totalAmount
                }
                //contentScope.DetailedTable.setContext(responseData);
                if (isReceivable) {
                    contentScope.DetailedTable.setContext(responseData);
                } else {
                    contentScope.BySuplierDetailedTable.setContext(responseData);
                }
                contentScope.DetailedTable.initiateSortService = function (keyToSort, ascOrDescOrder) {
                    // Pass keyToSort, ascOrDescOrder to sorting service/API
                    // Call below function after sort success call back
                    // contentScope.DetailedTable.sortResponse(detailedTableSampleData2);
                };

            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setDetailedTableData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
   * @api : keepCursorInTextBox
   * Keeping cursor in text box
   * @arg1 : NA
   * @return : NA
   */
        keepCursorInTextBox: function () {
            var scope = this;
            try {
                contentScope.txtSearch.setFocus(true);
            } catch (err) {
                var errorObj = {
                    "method": "keepCursorInTextBox",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : showOrHideTypeList
         * This function is resposible for showing or hiding TypeList dropdown
         * @return : NA
         */
        showOrHideTypeList: function () {
            var scope = this;
            try {
                if (contentScope.lblDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
                    contentScope.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    contentScope.flxTypeDropDownList.setVisibility(false);
                } else {
                    contentScope.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    contentScope.flxTypeDropDownList.setVisibility(true);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmConnectAccount2",
                    "method": "showOrHideTypeList",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setSegTypeData: function () {
            var scope = this;
            var segmentData = [];
            try {
                contentScope.lblTypeValue.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue");
                contentScope.segTypeList.widgetDataMap = {
                    "lblDropDownValue": "lblDropDownValue",
                    "flxSbaListDropDown": "flxSbaListDropDown"
                };
                segmentData.push({
                    "lblDropDownValue": kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue"),
                    "flxSbaListDropDown": {
                        onClick: this.segTypeListRowOnClick.bind(this, kony.i18n.getLocalizedString("i18n.SBAdvisory.amountDue"))
                    }
                }, {
                    "lblDropDownValue": kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount"),
                    "flxSbaListDropDown": {
                        onClick: this.segTypeListRowOnClick.bind(this, kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount"))
                    }
                });
                contentScope.segTypeList.setData(segmentData);
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "setSegTypeData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
 * @api : segTypeListRowOnClick
 * This function is defines the actions to be performed for selecting my company from dropdown
 * @return : NA
 */
        segTypeListRowOnClick: function (selectedData) {
            var scope = this;
            try {
                if (isReceivable) {
                    contentScope.lblTypeValue.text = selectedData;
                    scope.setTotalReceivablesData(byCustomerData);
                    scope.setDetailedTableData(byCustomerData);
                    scope.setStackedbarChartData(byCustomerData);
                    scope.setBreakdownChartData(byCustomerData);
                    scope.showOrHideTypeList();
                } else {
                    contentScope.lblTypeValue.text = selectedData;
                    scope.setTotalReceivablesData(PayablesByCustomerData);
                    scope.setDetailedTableData(PayablesByCustomerData);
                    scope.setStackedbarChartData(PayablesByCustomerData);
                    scope.setBreakdownChartData(PayablesByCustomerData);
                    scope.showOrHideTypeList();
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "segTypeListRowOnClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
           * @api : callReceivableBycustomerDownload
           * This function is responsible for triggering average payment service call
           * @return : NA
           */
        callReceivableByCustomerDownload: function () {
            var scope = this;
            try {
                if (isReceivable) {
                    accountsIntelligencePresenter.getReceivablesByCustomerScreenDownload({

                        "queryParam": "ReceivablesByCustomerDownload",
                        "modelName": "ReceivablesByCustomerDownload",
                        "Subscriber": "ReceivablesByCustomerDownload",
                        "topParam": "ReceivablesByCustomerDownload",
                        "orderParam": "ReceivablesByCustomerDownload",
                        "type": "Bycustomer",
                        "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
                    }, this.view.id);
                } else {
                    accountsIntelligencePresenter.getPayableSupplierDownload({
                        "queryParam": "ReceivablesByCustomerDownload",
                        "modelName": "ReceivablesByCustomerDownload",
                        "Subscriber": "ReceivablesByCustomerDownload",
                        "topParam": "ReceivablesByCustomerDownload",
                        "orderParam": "ReceivablesByCustomerDownload",
                        "type": "Bysupplier",
                        "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
                    }, this.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableByCustomer",
                    "method": "callReceivableOverdue",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmReceivablePayableByCustomer";
            // kony.ui.Alert(errMsg);
        }
    };
});