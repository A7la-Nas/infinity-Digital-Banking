define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  var barChartData = {};
  var simulationData;
  return {

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function (data) {
      var scope = this;
      try {
        simulationData = data.simulationData || { buttonType: false };
        presenter = applicationManager.getModulesPresentationController({
          appName: 'SBAdvisoryMA',
          moduleName: 'EnrolmentModule'
        });
        accountsIntelligencePresenter = applicationManager.getModulesPresentationController({
          appName: 'SBAdvisoryMA',
          moduleName: 'AcIntelligenceDashboardUIModule'
        });
        contentScope = this.view.formTemplate12.flxContentTCCenter;
        if (data.id === accountsIntelligencePresenter.Receivables) {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcReceivable, contentScope.btnCashflowPrediction, contentScope.btnAcPayable);
          scope.callReceivablesOrPayables(true);
          scope.handleReceivablePermissionsUI();
        } else if (data.id === accountsIntelligencePresenter.Payables) {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable);
          scope.callReceivablesOrPayables(false);
          scope.handlePayablePermissionsUI();
        }
        accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "onNavigate",
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
        if (viewModel.Receivables) {
          accountsIntelligencePresenter.receivableSummaryData = viewModel.Receivables[0];
          scope.setReceivablesOrPayablesData(accountsIntelligencePresenter.receivableSummaryData, true);
          scope.setBarChartData(accountsIntelligencePresenter.receivableSummaryData, true);
        }
        if (viewModel.Payables) {
          accountsIntelligencePresenter.receivablePayableData = viewModel.Payables[0];
          scope.setReceivablesOrPayablesData(accountsIntelligencePresenter.receivablePayableData, false);
          scope.setBarChartData(accountsIntelligencePresenter.receivablePayableData, false);
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
    * Sets the initial actions for form
    */
    init: function () {
      try {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        this.view.onBreakpointChange = this.onBreakpointChange;
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
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
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
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
        scope.setDefaultUI();
        contentScope.flxDownLoad.onClick = () => {
          if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
            accountsIntelligencePresenter.downloadReceivableSummary(this.view.id);
          } else {

            accountsIntelligencePresenter.downloadPayableSummary(this.view.id);
          }
        };
        contentScope.btnAcReceivable.onClick = () => {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcReceivable, contentScope.btnCashflowPrediction, contentScope.btnAcPayable);
          scope.callReceivablesOrPayables(true);
        };
        contentScope.btnAcPayable.onClick = () => {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable);
          scope.callReceivablesOrPayables(false);
        };
        contentScope.btnCashflowPrediction.onClick = () => {
          presenter.navigateToScreens("SBAStimulation", simulationData);
        };
        contentScope.btnSummary.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer);
        };
        contentScope.btnAveragePaymentDays.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayablePayment", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
          });
        };
        contentScope.btnOverdue.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnOverdue, contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableOverdue", {
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
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables : accountsIntelligencePresenter.Payables
          });
        };

      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setTooltipContent
    * This function for executing the preShow and postShow
    * @return : NA
    */
    setTooltipContent: function (lbl, val, heading, isHeading, circleColor) {
      var scope = this;
      try {
        return ('<div><div class="mainContent" style= "height:' + (isHeading ? '80' : '60') + 'px">' + (isHeading ? '<div><p id="heading">' + heading + '</p></div>' : '') + '<div class="content"><div class="circle"style="background:' + circleColor + '"></div><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "setTooltipContent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setBarChartData: function (responseData, isReceivable) {
      var scope = this;
      try {
        barChartData.chartProperties = {
          id: 'VerticalBarSummary',
          legend: 'none',
          height: '260',
          width: '790',
          tooltip: {
            isHtml: true
          },
          bar: {
            groupWidth: '40%'
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
        scope.setSummaryChartData(responseData, isReceivable);
        contentScope.btnByCustomer.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.byCustomer") : kony.i18n.getLocalizedString("i18n.SBAdvisory.bySupplier");
        contentScope.VerticalSummaryBarchart.data = JSON.stringify(barChartData);
        contentScope.VerticalSummaryBarchart.text1 = kony.i18n.getLocalizedString("i18n.AccountSummary.overdue");
        contentScope.VerticalSummaryBarchart.text2 = kony.i18n.getLocalizedString("i18n.SBAdvisory.upcoming");
        contentScope.VerticalSummaryBarchart.skin1 = isReceivable ? "ICSknFlxe45a42Round" : "ICSknFlxff9928Round";
        contentScope.VerticalSummaryBarchart.skin2 = isReceivable ? "ICSknFlx7ec34aRound" : "ICSknFlx3a9ee1Round";
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "setBarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
 * @api : setDefaultUI
 * This function is responsible for showing initial UI changes
 * @return : NA
 */
    setDefaultUI: function () {
      var scope = this;
      try {
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReceivablesOrPayablesData
     * This function is responsible for setting receivables or payabales data
     * @return : NA
     */
    setReceivablesOrPayablesData: function (data, isReceivable) {
      var scope = this;
      try {
        contentScope.lblReceivables.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.totalReceivables") : kony.i18n.getLocalizedString("i18n.SBAdvisory.totalPayables");
        contentScope.lblContextTotalInvoices.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.TotalNoofInvoices") : kony.i18n.getLocalizedString("i18n.SBAdvisory.totalNoOfBills");
        contentScope.lblContextOverdueInvoices.text = isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.overdueInvoices") : kony.i18n.getLocalizedString("i18n.SBAdvisory.overdueBills");
        contentScope.lblAmount.text = accountsIntelligencePresenter.formatAmount(Math.abs(data.OverdueUpcomingAmount));
        contentScope.lblTotalInvoicesAmount.text = isReceivable ? Math.abs(data.TotalNoOfInvoices).toString() : Math.abs(data.TotalNoOfBills).toString();
        contentScope.lblOverdueAmount.text = accountsIntelligencePresenter.formatAmount(Math.abs(data.OverdueAmount));
        contentScope.lblOverdueInvoices.text = isReceivable ? Math.abs(data.OverdueInvoices).toString() : Math.abs(data.OverdueBills).toString();
        contentScope.lblOverdueAmountPercentage.text = `(${Math.abs(data.OverdueAmountPercentage)}%)`;
        contentScope.lblOverdueInvoicesPercentage.text = `(${isReceivable ? data.OverdueInvoicesPercentage : data.OverdueBillsPercentage}%)`;
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "setReceivablesOrPayablesData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setSummaryChartData
     * This function is responsible for constructing summary chart data
     * @return : NA
     */
    setSummaryChartData: function (responseData, isReceivable) {
      var scope = this;
      try {
        barChartData.data.push([
          kony.i18n.getLocalizedString("i18n.AccountSummary.overdue"),
          parseFloat(responseData.summaryOverdueAmt),
          isReceivable ? '#E34E35' : '#FF9928',
          scope.setTooltipContent(kony.i18n.getLocalizedString("i18n.AccountSummary.overdue"), accountsIntelligencePresenter.formatAmount(responseData.summaryOverdueAmt), "", false, isReceivable ? '#E34E35' : '#FF9928')
        ]);
        barChartData.data.push([
          '0-10 Days',
          parseFloat(responseData.summary0to10Days),
          isReceivable ? '#7EC34A' : '#3A9EE1',
          scope.setTooltipContent('0-10 Days', accountsIntelligencePresenter.formatAmount(responseData.summary0to10Days), isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingReceivables") : kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingPayables"), true, isReceivable ? '#7EC34A' : '#3A9EE1')
        ]);
        barChartData.data.push([
          '11-30 Days',
          parseFloat(responseData.summary11to30Days),
          isReceivable ? '#7EC34A' : '#3A9EE1',
          scope.setTooltipContent('11-30 Days', accountsIntelligencePresenter.formatAmount(responseData.summary11to30Days), isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingReceivables") : kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingPayables"), true, isReceivable ? '#7EC34A' : '#3A9EE1')
        ]);
        barChartData.data.push([
          '31-60 Days',
          parseFloat(responseData.summary31to60Days),
          isReceivable ? '#7EC34A' : '#3A9EE1',
          scope.setTooltipContent('31-60 Days', accountsIntelligencePresenter.formatAmount(responseData.summary31to60Days), isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingReceivables") : kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingPayables"), true, isReceivable ? '#7EC34A' : '#3A9EE1')
        ]);
        barChartData.data.push([
          '>60 Days',
          parseFloat(responseData.summary60Days),
          isReceivable ? '#7EC34A' : '#3A9EE1',
          scope.setTooltipContent('>60 Days', accountsIntelligencePresenter.formatAmount(responseData.summary60Days), isReceivable ? kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingReceivables") : kony.i18n.getLocalizedString("i18n.SBAdvisory.upcomingPayables"), true, isReceivable ? '#7EC34A' : '#3A9EE1')
        ]);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "setReceivablesOrPayablesData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : callReceivablesOrPayables
     * This function for trigging receivables Or Payables service call
     * @return : NA
     */
    callReceivablesOrPayables: function (isReceivable) {
      var scope = this;
      try {
        if (isReceivable) {
          accountsIntelligencePresenter.getReceivables({
            "queryParam": "Receivables",
            "modelName": "Receivables"
          }, this.view.id);
        } else {
          accountsIntelligencePresenter.getPayables({
            "queryParam": "Payables",
            "modelName": "Payables"
          }, this.view.id);
        }

      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "callReceivablesOrPayables",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : handleReceivablePermissionsUI
     * This function for handling UI related to receivable permissions
     * @return : NA
     */
    handleReceivablePermissionsUI: function () {
      var scope = this;
      try {
        if (applicationManager.getConfigurationManager().isSBAVisible.cashFlow) {
          contentScope.btnCashflowPrediction.setVisibility(true);
          contentScope.btnAcReceivable.left = "0dp";
        } else {
          contentScope.btnCashflowPrediction.setVisibility(false);
          contentScope.btnAcReceivable.left = "20dp";
        }
        if (applicationManager.getConfigurationManager().isSBAVisible.payables) {
          contentScope.btnAcPayable.setVisibility(true);
        } else {
          contentScope.btnAcPayable.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "handleReceivablePermissionsUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : handlePayablePermissionsUI
     * This function for handling UI related to Payable permissions
     * @return : NA
     */
    handlePayablePermissionsUI: function () {
      var scope = this;
      try {
        if (applicationManager.getConfigurationManager().isSBAVisible.cashFlow) {
          contentScope.btnCashflowPrediction.setVisibility(true);
          contentScope.btnAcPayable.left = "0dp";
        } else {
          contentScope.btnCashflowPrediction.setVisibility(false);
          contentScope.btnAcPayable.left = "20dp";
        }
        if (applicationManager.getConfigurationManager().isSBAVisible.receivables) {
          contentScope.btnAcReceivable.setVisibility(true);
        } else {
          contentScope.btnAcReceivable.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayableSummary",
          "method": "handlePayablePermissionsUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmReceivablePayableSummary";
      // kony.ui.Alert(errMsg);
    }
  };
});