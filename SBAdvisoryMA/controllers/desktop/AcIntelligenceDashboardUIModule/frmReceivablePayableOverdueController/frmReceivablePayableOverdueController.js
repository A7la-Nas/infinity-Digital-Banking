define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  var barChartData = {};
  var horizontalBarChart = {};
  var breakdownDoughnutChart = {};
  var contentScope;
  var presenter;
  var ReceivablesByCustomerData;
  var PayablesByCustomerData;
  let isReceivable = false;
  return {
    /*
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
          scope.callReceivableOverdue();
          scope.setVerticalBarChartData(accountsIntelligencePresenter.receivableSummaryData);
          scope.setBreakdownChartData(accountsIntelligencePresenter.receivableSummaryData);
          scope.setOverdueData(accountsIntelligencePresenter.receivableSummaryData);
        } else if (data.id === accountsIntelligencePresenter.Payables) {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable);
          isReceivable = false;
          scope.callReceivableOverdue();
          scope.setOverdueData(accountsIntelligencePresenter.receivablePayableData);
          scope.setVerticalBarChartData(accountsIntelligencePresenter.receivablePayableData);
          scope.setBreakdownChartData(accountsIntelligencePresenter.receivablePayableData);
        }
        accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnOverdue, contentScope.btnSummary, contentScope.btnUpcoming, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableOverdue",
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
          ]
        );
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
        // scope.setHorizontalbarChartData();
      } catch (err) {
        var errorObj = {
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
        contentScope.lblSearch.onTouchEnd = scope.keepCursorInTextBox.bind(scope);
        if (isReceivable) {
          contentScope.DetailedTable.setVisibility(true);
          contentScope.OverdueDetailedTable.setVisibility(false);
        } else {
          contentScope.DetailedTable.setVisibility(false);
          contentScope.OverdueDetailedTable.setVisibility(true);
        }
        contentScope.txtSearch.onKeyUp = () => {
          if (contentScope.txtSearch.text.length > 0) {
            contentScope.flxCross.setVisibility(true);
          } else {
            contentScope.flxCross.setVisibility(false);
          }
          if (isReceivable) {
            contentScope.DetailedTable.setSearchString(ReceivablesByCustomerData, contentScope.txtSearch.text);
          } else {
            contentScope.OverdueDetailedTable.setSearchString(PayablesByCustomerData, contentScope.txtSearch.text);
          }
        };
        contentScope.flxCross.onClick = () => {
          contentScope.txtSearch.text = "";
          if (isReceivable) {
            contentScope.DetailedTable.setSearchString(ReceivablesByCustomerData, contentScope.txtSearch.text);
          } else {
            contentScope.OverdueDetailedTable.setSearchString(PayablesByCustomerData, contentScope.txtSearch.text);
          }
          contentScope.flxCross.setVisibility(false);
        };
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableUpcoming",
          "method": "initFormActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
* @api : setReviewData
* This function for mapping review data to segment
* @return : NA
*/
    setReviewData: function (ByCustomerData) {
      //let SegData = [];
      var segInvoiceData = [];
      var segInvoiceHeaderData = [];
      var segInvoicesRowData = [];
      try {

        var SegWidgetDataMap = {
          "flxListingHeader": "flxListingHeader",
          "flxHeading": "flxHeading",
          "lblCustomerName": "lblCustomerName",
          "lblInvoiceCount": "lblInvoiceCount",
          "flxRowListing": "flxRowListing",
          "flxRowList": "flxRowList",
          "lblRowCustomerName": "lblRowCustomerName",
          "flxListingSeparator": "flxListingSeparator",
          "lblRowInvoiceCount": "lblRowInvoiceCount",
        };
        contentScope.segInvoiceHeader.widgetDataMap = SegWidgetDataMap;
        ByCustomerData = accountsIntelligencePresenter.sortAndReturnTop5Values(ByCustomerData, "rankByInvoice");
        contentScope.lblInvoice.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoice" : "i18n.SBAdvisory.billsCount")}` + ` ${accountsIntelligencePresenter.addAndReturnSum(ByCustomerData, isReceivable ? "countOfOverdueInvoices" : "CountOfOutstandingBills")}`;
        segInvoiceHeaderData = [{
          lblCustomerName: {
            text: kony.i18n.getLocalizedString("i18n.accountDetail.customerName"),
            isVisible: true
          },
          lblInvoiceCount: {
            text: kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.invoiceCount" : "i18n.SBAdvisory.billsCount"),
            isVisible: true
          },
        }];

        ByCustomerData.forEach((data, index) => {
          segInvoicesRowData.push({
            lblRowCustomerName: {
              text: data.customerName
            },
            lblRowInvoiceCount: {
              text: isReceivable ? data.countOfOverdueInvoices : data.CountOfOutstandingBills
            },
            flxListingSeparator: {
              isVisible: index === (ByCustomerData.length - 1) ? false : true
            }
          });
        });
        segInvoiceHeaderData.push(segInvoicesRowData);
        segInvoiceData.push(segInvoiceHeaderData);
        contentScope.segInvoiceHeader.setData(segInvoiceData);

      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setReviewData",
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
    /**
         * @api : setSummaryChartData
         * This function is responsible for constructing breakdown chart data
         * @return : NA
         */
    setSummaryChartData: function (responseData) {
      var scope = this;
      try {
        barChartData.data.push(['1-10 Days',
          parseFloat(responseData.overdue0to10Days),
          isReceivable ? '#B61B00' : '#E17700',
          scope.setVerticalTooltipContent('1-10 Days', accountsIntelligencePresenter.formatAmount(responseData.overdue0to10Days), "", false, isReceivable ? '#B61B00' : '#E17700')
        ]);
        barChartData.data.push(['11-30 Days',
          parseFloat(responseData.overdue11to30Days),
          isReceivable ? '#E34E35' : '#FF9928',
          scope.setVerticalTooltipContent('11-30 Days', accountsIntelligencePresenter.formatAmount(responseData.overdue11to30Days), "", false, isReceivable ? '#E34E35' : '#FF9928')
        ]);
        barChartData.data.push(['31-60 Days',
          parseFloat(responseData.overdue31to60Days),
          isReceivable ? '#FA9280' : '#FFB767',
          scope.setVerticalTooltipContent('31-60 Days', accountsIntelligencePresenter.formatAmount(responseData.overdue31to60Days), "", false, isReceivable ? '#FA9280' : '#FFB767')
        ]);
        barChartData.data.push(['>60 Days',
          parseFloat(responseData.overdue60Days),
          isReceivable ? '#FFC7BF' : '#FFD6A8',
          scope.setVerticalTooltipContent('>60 Days', accountsIntelligencePresenter.formatAmount(responseData.overdue60Days), "", false, isReceivable ? '#FFC7BF' : '#FFD6A8')
        ]);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableOverdue",
          "method": "setVerticalBarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setVerticalBarChartData: function (responseData) {
      var scope = this;
      try {
        barChartData.chartProperties = {
          id: 'VerticalBarSummary',
          legend: 'none',
          height: '300',
          width: '750',
          tooltip: {
            isHtml: true
          },
          bar: {
            groupWidth: '30%'
          },
          vAxis: {
            format: 'short',
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: 13,
              color: "#727272"
            }
          },
          hAxis: {
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: 13,
              color: "#727272"
            },
            gridlines: {
              count: 10
            }
          }
        };
        barChartData.data = [
          ["x", "amount", {
            "type": 'string',
            "role": 'style'
          }, {
              "type": "string",
              "role": "tooltip",
              "p": {
                "html": true,
                "role": "tooltip"
              }
            }],

        ];
        scope.setSummaryChartData(responseData);
        contentScope.VerticalSummaryBarchart.data = JSON.stringify(barChartData);
        contentScope.VerticalSummaryBarchart.visibility = false;
      } catch (err) {
        var errorObj = {
          "method": "setVerticalBarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setVerticalTooltipContent
     * This function for executing the preShow and postShow
     * @return : NA
     */
    setVerticalTooltipContent: function (lbl, val) {
      var scope = this;
      try {
        return ('<div><div class="mainContent" style= "height:60px"><div class="content"><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
      } catch (err) {
        var errorObj = {
          "method": "setVerticalTooltipContent",
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
          "level": "frmReceivablePayableUpcoming",
          "method": "intializePresentationControllers",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setHorizontalbarChartData: function (ByCustomerData) {
      var scope = this;
      var receivableAmount;
      try {
        responseData = accountsIntelligencePresenter.sortAndReturnTop5Values(ByCustomerData, "rankByAmt");
        receivableAmount = accountsIntelligencePresenter.addAndReturnSum(ByCustomerData, isReceivable ? "totAmtOfTop" : "totDueAmtOfTop5");
        horizontalBarChart.chartProperties = {
          id: contentScope.HorizontalSummaryBarChart.customContainerID,
          legend: 'none',
          height: '400',
          width: '725',
          colors: [isReceivable ? '#E34E35' : '#FF9928'],
          tooltip: {
            isHtml: true
          },
          hAxis: {
            format: 'short',
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: 13,
              color: "#727272"
            }
          },
          vAxis: {
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: 13,
              color: "#424242"
            }
          },
          bar: {
            groupWidth: '50%'
          },
          annotations: {
            style: 'line',
          },
        };
        horizontalBarChart.data = [
          [
            "x",
            "amount",
            {
              "type": "string",
              "role": "tooltip",
              "p": {
                "html": true,
                "role": "tooltip"
              }
            },
            { "type": 'string', "role": 'annotation' }
          ],
        ];
        scope.SetHorizontalOvredue(ByCustomerData);
        contentScope.lblReceivableAmount.text = `${kony.i18n.getLocalizedString(isReceivable ? "i18n.SBAdvisory.receivableAmount" : "i18n.SBAdvisory.payableAmount")}` + " " + `${accountsIntelligencePresenter.formatAmount(receivableAmount)}`;
        contentScope.HorizontalSummaryBarChart.data = JSON.stringify(horizontalBarChart);
      } catch (err) {
        var errorObj = {
          "method": "setHorizontalbarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
* @api : SetHorizontalOvredue
* This function for constructing average payment chart data
* @return : NA
*/
    SetHorizontalOvredue: function (ByCustomerData) {
      var scope = this;
      try {
        ByCustomerData.sort((data1) => {
          return data1.rankByAmt;
        });
        ByCustomerData = ByCustomerData.slice(0, 5);
        ByCustomerData.map((data) => {
          horizontalBarChart.data.push([
            data.customerName,
            parseInt(data.overdueAmt),
            scope.setHorizontalTooltipContent(data.customerName, accountsIntelligencePresenter.formatAmount(parseFloat(data.overdueAmt))),
            null
          ]);
        })
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableOverdue",
          "method": "SetHorizontalOvredue",
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
        contentScope.flxOverdueDownLoad.onClick = () => {
          if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
            accountsIntelligencePresenter.downloadReceivableSummary(this.view.id);
          } else {
            accountsIntelligencePresenter.downloadPayableSummary(this.view.id);
          }
        };

        contentScope.flxDownloadtable.onClick = () => {
          if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
            scope.callReceivableOverdueDownload(true);
          } else {
            scope.callReceivableOverdueDownload(false);
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
        contentScope.btnUpcoming.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnUpcoming, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer, "SBAReceivablePayableUpcoming", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
          });
        };
        contentScope.btnByCustomer.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnByCustomer, contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnUpcoming, contentScope.btnOverdue, "SBAReceivablePayableByCustomer", {
            id: "Receivable"
          });
        };
        contentScope.btnAveragePaymentDays.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer, "SBAReceivablePayablePayment", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
          });
        };
      } catch (err) {
        var errorObj = {
          "level": "SBAReceivablePayableOverdue",
          "method": "intializePresentationControllers",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setHorizontalTooltipContent
     * This function for executing the preShow and postShow
     * @return : NA
     */
    setHorizontalTooltipContent: function (lbl, val) {
      var scope = this;
      try {
        return ('<div><div class="mainContent" style= "height:60px;width:' + (lbl.length > 13 ? '275' : '200') + 'px"><div class="horizontalTooltipContent"><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
      } catch (err) {
        var errorObj = {
          "method": "setHorizontalTooltipContent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setBreakdownChartData: function (responseData) {
      var scope = this;
      try {
        breakdownDoughnutChart.chartProperties = {
          legend: 'none',
          height: '300',
          width: '410',
          pieHole: 0.5,
          pieSliceText: 'none',
          colors: [isReceivable ? '#B61B00' : '#E17700', isReceivable ? '#FA9280' : '#FFB767', isReceivable ? '#E34E35' : '#FF9928', isReceivable ? '#FFC7BF' : '#FFD6A8'],
          tooltip: {
            isHtml: true,
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: '15',
            }
          },
        };
        breakdownDoughnutChart.data = [
          ["x", "amount", {
            "type": "string",
            "role": "tooltip",
            "p": {
              "html": true,
              "role": "tooltip"
            }
          }],
        ];
        scope.setDoughnutChartData(responseData);
        contentScope.BreakdownDoughnutChart.data = JSON.stringify(breakdownDoughnutChart);
        contentScope.BreakdownDoughnutChart.text1 = "1-10 Days :";
        contentScope.BreakdownDoughnutChart.text2 = accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent0to10Days) * 100);
        contentScope.BreakdownDoughnutChart.text3 = "31-60 Days :";
        contentScope.BreakdownDoughnutChart.text4 = accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent11to30Days) * 100);
        contentScope.BreakdownDoughnutChart.text5 = "11-30 Days :";
        contentScope.BreakdownDoughnutChart.text6 = accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent31to60Days) * 100);
        contentScope.BreakdownDoughnutChart.text7 = "> 60 Days :";
        contentScope.BreakdownDoughnutChart.text8 = accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent60Days) * 100);
        contentScope.BreakdownDoughnutChart.skin1 = isReceivable ? "ICSknFlxb61b00Round" : "ICSknFlxe17700Round";
        contentScope.BreakdownDoughnutChart.skin2 = isReceivable ? "ICSknFlxfa9280Round" : "ICSknFlxffb767Round";
        contentScope.BreakdownDoughnutChart.skin3 = isReceivable ? "ICSknFlxe34e35Round" : "ICSknFlxff9928Round";
        contentScope.BreakdownDoughnutChart.skin4 = isReceivable ? "ICSknFlxffc7bfRound" : "ICSknFlxffd6a8Round";
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableUpcoming",
          "method": "setBreakdownChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setDoughnutChartData
     * This function is responsible for constructing doughnut chart data
     * @return : NA
     */
    setDoughnutChartData: function (responseData) {
      var scope = this;
      try {
        breakdownDoughnutChart.data.push(["1-10 Days",
          Math.round(parseFloat(responseData.overduePercent0to10Days) * 100),
          scope.setBreakdownTooltipContent("1-10 Days", accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent0to10Days) * 100), isReceivable ? '#B61B00' : '#E17700')
        ]);
        breakdownDoughnutChart.data.push(['11-30 Days',
          Math.round(parseFloat(responseData.overduePercent11to30Days) * 100),
          scope.setBreakdownTooltipContent('11-30 Days', accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent11to30Days) * 100), isReceivable ? '#FA9280' : '#FF9928')
        ]);
        breakdownDoughnutChart.data.push(['31-60 Days',
          Math.round(parseFloat(responseData.overduePercent31to60Days) * 100),
          scope.setBreakdownTooltipContent('31-60 Days', accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent31to60Days) * 100), isReceivable ? '#E34E35' : '#FFB767')
        ]);
        breakdownDoughnutChart.data.push(['> 60 Days ',
          Math.round(parseFloat(responseData.overduePercent60Days) * 100),
          scope.setBreakdownTooltipContent('> 60 Days ', accountsIntelligencePresenter.getPercentageValue(parseFloat(responseData.overduePercent60Days) * 100), isReceivable ? '#FFC7BF' : '#FFD6A8')
        ]);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableUpcoming",
          "method": "setReceivablesOrPayablesData",
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
        return ('<div><div class="doughnutMainContent" style= "height:64px"><div class="content"><div class="circle"style="background:' + circleColor + '"></div><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableUpcoming",
          "method": "setBreakdownTooltipContent",
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
          ReceivablesByCustomerData = JSON.parse(JSON.stringify(viewModel.ReceivablesByCustomer));
          var ReceivablesByCustomerAmount = JSON.parse(JSON.stringify(viewModel.ReceivablesByCustomer));
          var ReceivablesByCustomerInvoice = JSON.parse(JSON.stringify(viewModel.ReceivablesByCustomer));
          scope.setHorizontalbarChartData(ReceivablesByCustomerAmount, true);
          scope.setReviewData(ReceivablesByCustomerInvoice, true);
          scope.setDetailedTableData(viewModel.ReceivablesByCustomer);

        }
        if (viewModel.PayableBySupplier) {
          //var Payables = viewModel.Payables[0];
          PayablesByCustomerData = JSON.parse(JSON.stringify(viewModel.PayableBySupplier));
          var PayablesByCustomerDatarAmount = JSON.parse(JSON.stringify(viewModel.PayableBySupplier));
          scope.setHorizontalbarChartData(PayablesByCustomerDatarAmount, false);
          scope.setReviewData(PayablesByCustomerDatarAmount, false);
          scope.setDetailedTableData(viewModel.PayableBySupplier);
        }
      } catch (err) {
        var errorObj = {
          "level": "",
          "method": "",
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
    setDetailedTableData: function (ByCustomerData) {
      var scope = this;
      try {
        if (isReceivable) {
          contentScope.DetailedTable.setContext(ByCustomerData);
        } else {
          contentScope.OverdueDetailedTable.setContext(ByCustomerData);
        }
        contentScope.DetailedTable.initiateSortService = function (keyToSort, ascOrDescOrder) {
          // Pass keyToSort, ascOrDescOrder to sorting service/API
          // Call below function after sort success call back
          // contentScope.DetailedTable.sortResponse(detailedTableSampleData2);
        };
      } catch (err) {
        var errorObj = {
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
      * @api : setOverdueData
      * this function responsible for setting upcoming header data
      * @arg1 : NA
      * @return : NA
      */

    setOverdueData: function (responseData) {
      var scope = this;
      try {
        contentScope.lblInvoiceCount.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.invoiceCount") : kony.i18n.getLocalizedString("i18n.SBAdvisory.overdueBills");
        contentScope.btnByCustomer.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.byCustomer") : kony.i18n.getLocalizedString("i18n.SBAdvisory.bySupplier");
        contentScope.lblAmount.text = accountsIntelligencePresenter.formatAmount(Math.abs(parseFloat((responseData.summaryOverdueAmt))));
        contentScope.lblInvoiceAmount.text = isReceivable ? Math.abs(responseData.summaryOverdueInvoices).toString() : Math.abs(responseData.CountOfOverdueBills).toString();
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableOverdue",
          "method": "setOverdueData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : callReceivableOverdue
     * This function is responsible for triggering average payment service call
     * @return : NA
     */
    callReceivableOverdue: function () {
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
          "level": "frmReceivablePayableOverdue",
          "method": "callReceivableOverdue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmReceivablePayableOverdue";
      // kony.ui.Alert(errMsg);
    },

    /**
     * @api : callReceivableOverdueDownload
    * This function is responsible for triggering average payment service call
    * @return : NA
    */
    callReceivableOverdueDownload: function () {
      var scope = this;
      try {
        if (isReceivable) {
          accountsIntelligencePresenter.getReceivablesByCustomerDownload({
            "queryParam": "ReceivablesByCustomerDownload",
            "modelName": "ReceivablesByCustomerDownload",
            "Subscriber": "ReceivablesByCustomerDownload",
            "topParam": "ReceivablesByCustomerDownload",
            "orderParam": "ReceivablesByCustomerDownload",
            "type": "Overdue",
            "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
          }, this.view.id);
        } else {
          accountsIntelligencePresenter.getPayableSupplierDownload({
            "queryParam": "ReceivablesByCustomerDownload",
            "modelName": "ReceivablesByCustomerDownload",
            "Subscriber": "ReceivablesByCustomerDownload",
            "topParam": "ReceivablesByCustomerDownload",
            "orderParam": "ReceivablesByCustomerDownload",
            "type": "Overdue",
            "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
          }, this.view.id);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableOverdue",
          "method": "callReceivableOverdue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmReceivablePayableOverdue";
      // kony.ui.Alert(errMsg);
    }


  };
});

