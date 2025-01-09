define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  var horizontalBarChart = {};
  var contentScope;
  var simulationData;
  return {
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
          "level": "frmReceivablePayablePayment",
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
          "level": "frmReceivablePayablePayment",
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
        contentScope.btnSummary.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables  : accountsIntelligencePresenter.Payables
          });
        };
        contentScope.flxDownLoad.onClick = () => {
          if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
            accountsIntelligencePresenter.downloadReceivableSummary(this.view.id);
          } else {
            accountsIntelligencePresenter.downloadPayableSummary(this.view.id);
          }
        };
        contentScope.btnAveragePaymentDays.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer);
          if (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") {
            scope.callAveragePaymentDays(true);
          } else {
            scope.callAveragePaymentDays(false);
          }
        };
        contentScope.btnCashflowPrediction.onClick = () => {
          presenter.navigateToScreens("SBAStimulation", simulationData);
        };
        contentScope.btnAcPayable.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
            id: "Payable"
          });
        };
        contentScope.btnAcReceivable.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableSummary", {
            id: "Receivable"
          });
        };
        contentScope.btnOverdue.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnOverdue, contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnUpcoming, contentScope.btnByCustomer, "SBAReceivablePayableOverdue", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables  : accountsIntelligencePresenter.Payables
          });
        };
        contentScope.btnUpcoming.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnUpcoming, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnAveragePaymentDays, contentScope.btnByCustomer, "SBAReceivablePayableUpcoming", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables  : accountsIntelligencePresenter.Payables
          });
        };
        contentScope.btnByCustomer.onClick = () => {
          accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnByCustomer, contentScope.btnSummary, contentScope.btnAveragePaymentDays, contentScope.btnUpcoming, contentScope.btnOverdue, "SBAReceivablePayableByCustomer", {
            id: (contentScope.btnAcReceivable.skin === "sknBtnAccountSummarySelectedmod") ? accountsIntelligencePresenter.Receivables  : accountsIntelligencePresenter.Payables
          });
        };
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function (data) {
      var scope = this;
      try {
        simulationData = data.simulationData || { buttonType: false };
        accountsIntelligencePresenter = applicationManager.getModulesPresentationController({
          appName: 'SBAdvisoryMA',
          moduleName: 'AcIntelligenceDashboardUIModule'
        });
        contentScope = this.view.formTemplate12.flxContentTCCenter;
        if (data.id === accountsIntelligencePresenter.Payables) {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable);
          scope.callAveragePaymentDays(false);
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
        } else if (data.id === accountsIntelligencePresenter.Receivables) {
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcReceivable, contentScope.btnCashflowPrediction, contentScope.btnAcPayable);
          scope.callAveragePaymentDays(true);
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
        }
        accountsIntelligencePresenter.setOptionsUIFunctionality(contentScope.btnAveragePaymentDays, contentScope.btnSummary, contentScope.btnOverdue, contentScope.btnUpcoming, contentScope.btnByCustomer);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
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
        if (viewModel.ReceivablesAveragePayment) {
          var ReceivablesAveragePayment = viewModel.ReceivablesAveragePayment;
          scope.setHorizontalbarChartData(ReceivablesAveragePayment, true)
        }
        if (viewModel.PayablesAveragePayment) {
          var PayablesAveragePayment = viewModel.PayablesAveragePayment;
          scope.setHorizontalbarChartData(PayablesAveragePayment, false)
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
     * @api : setDefaultUI
     * This function is responsible for showing initial UI changes
     * @return : NA
     */
    setDefaultUI: function () {
      var scope = this;
      try {
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setHorizontalbarChartData
     * This function responsible for setting averge payment days horizontal bar chart data
     * @return : NA
     */
    setHorizontalbarChartData: function (responseData, isReceivable) {
      var scope = this;
      try {
        horizontalBarChart.chartProperties = {
          id: contentScope.HorizontalSummaryBarChart.customContainerID,
          legend: 'none',
          height: '450',
          width: '725',
          colors: [(isReceivable ? '#23A8B1' : '#4176A4')],
          tooltip: {
            isHtml: true
          },
          hAxis: {
            format: '',
            textStyle: {
              fontName: 'Source Sans Pro',
              fontSize: 13,
              color: "#727272"
            },
            gridlines: {
              count: 10
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
        scope.setAveragePaymentData(responseData, isReceivable);
        contentScope.btnByCustomer.text = isReceivable ?  kony.i18n.getLocalizedString("i18n.SBAdvisory.byCustomer") :kony.i18n.getLocalizedString("i18n.SBAdvisory.bySupplier");
        contentScope.HorizontalSummaryBarChart.data = JSON.stringify(horizontalBarChart);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "setHorizontalbarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAveragePaymentData
     * This function for constructing average payment chart data
     * @return : NA
     */
    setAveragePaymentData: function (responseData, isReceivable) {
      var scope = this;
      try {
        responseData.sort((data1, data2) => {
          return data1.rank.localeCompare(data2.rank);
        });
        responseData = responseData.slice(0, 5);
        responseData.map((data) => {
          horizontalBarChart.data.push([
            isReceivable ? data.customerName : data.supplierName,
            isReceivable ? parseInt(data.avgDaystoPay) : parseInt(data.avgDaysToPay),
            scope.setHorizontalTooltipContent("Average Payment Days", isReceivable ? parseInt(data.avgDaystoPay) : parseInt(data.avgDaysToPay).toString(), isReceivable ? data.customerName : data.supplierName),
            null
          ]);
        })
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "setAveragePaymentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setHorizontalTooltipContent
     * This function for designing tooltip for horizontal chart
     * @return : NA
     */
    setHorizontalTooltipContent: function (lbl, val, heading) {
      var scope = this;
      try {
        return ('<div><div class="mainContent" style= "height:88px"><div><p id="heading">' + heading + '</p></div>' + '<div class="content"><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
        //return ('<div><div class="mainContent" style= "height:60px"><div class="horizontalTooltipContent"><p>' + lbl + ': <b>' + val + '</b></p></div></div></div>')
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "setHorizontalTooltipContent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : callAveragePaymentDays
     * This function is responsible for triggering average payment service call
     * @return : NA
     */
    callAveragePaymentDays: function (isReceivable) {
      var scope = this;
      try {
        if (isReceivable) {
          contentScope.lblGraphHeader.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.ReceivableAvgPaymentDaysHeading");
          accountsIntelligencePresenter.getReceivablesAveragePayment({
            "queryParam": "AveragePaymentDays",
            "orderParam": "AveragePaymentDays",
            "topParam": "AveragePaymentDays",
            "modelName": "AveragePaymentDays"
          }, this.view.id);
        } else {
          contentScope.lblGraphHeader.text = kony.i18n.getLocalizedString("i18n.SBAdvisory.PayableAvgPaymentDaysHeading");
          accountsIntelligencePresenter.getPayablesAveragePayment({
            "queryParam": "AveragePaymentDays",
            "orderParam": "AveragePaymentDays",
            "topParam": "AveragePaymentDays",
            "modelName": "AveragePaymentDays"
          }, this.view.id);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivablePayablePayment",
          "method": "callAveragePaymentDays",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmReceivablePayablePayment";
      // kony.ui.Alert(errMsg);
    }
  };
});