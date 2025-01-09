define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil', 'SBADriverVariables'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil, SBADriverVariables) {
  let presenter;
  let formTemplateScope, contentScope, popupScope;
  let chartData = {};
  let cashFlowChartData = {};
  let DriverDetails;
  let isBtnSimulateCashFlowAccessed = false;
  let isOneYear = true;
  let buttonData;
  let cashFlowPredictionData;
  let recordsPastData;
  return {

    /**
     * @api : onNavigate
     * * Triggers when navigation come to this form
     * @return : NA
    */
    onNavigate: function (data) {
      var scope = this;
      try {
        buttonData = data || {
          buttonType: false
        };
        formTemplateScope = this.view.formTemplate12;
        contentScope = formTemplateScope.flxContentTCCenter;
        popupScope = formTemplateScope.flxContentPopup;
        if (applicationManager.getConfigurationManager().isSBAVisible.receivables) {
          contentScope.btnAcReceivable.setVisibility(true);
        } else {
          contentScope.btnAcReceivable.setVisibility(false);
        }
        if (applicationManager.getConfigurationManager().isSBAVisible.payables) {
          contentScope.btnAcPayable.setVisibility(true);
        } else {
          contentScope.btnAcPayable.setVisibility(false);
        }
        if ((!applicationManager.getConfigurationManager().isSBAVisible.receivables) && (!applicationManager.getConfigurationManager().isSBAVisible.payables)) {
          var businessNameData = applicationManager.getSelectedSbaBusiness();
          if (businessNameData && businessNameData.coreCustomerName) {
            formTemplateScope.pageTitle = `${kony.i18n.getLocalizedString("i18n.SBAdvisory.cashFlowAndPrediction")}` + " - " + `${businessNameData.coreCustomerName}`;
          } else {
            formTemplateScope.pageTitle = `${kony.i18n.getLocalizedString("i18n.SBAdvisory.cashFlowAndPrediction")}` + " - " + `${applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName}`;
          }
          contentScope.flxTabs.setVisibility(false);
          contentScope.flxTabSeparator.setVisibility(false);
        } else {
          contentScope.flxTabs.setVisibility(true);
          contentScope.flxTabSeparator.setVisibility(true);
          formTemplateScope.pageTitlei18n = "i18n.SBAdvisory.smartBankingAdvisor";
        }
      } catch (err) {
        var errorObj = {
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :init
     * Sets the initial actions for form
     * @arg : NA
     * @return : NA
     */
    init: function () {
      var scope = this;
      try {
        presenter = applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' });
        accountsIntelligencePresenter = applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'AcIntelligenceDashboardUIModule' });
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
      } catch (err) {
        var errorObj = {
          "method": "init",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : preShow
     * Will trigger before loading of UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        formTemplateScope.flxTCButtons.left = "0%";
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * Will trigger when UI is loaded
     * @return : NA
     */
    postShow: function () {
      var scope = this;
      try {
        scope.showCashFlowPrediction();
        scope.setDefaultUI();
        scope.addCursorPointer();
        contentScope.btnAcReceivable.onClick = () => {
          buttonData.buttonType = contentScope.flxSimulation.isVisible;
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcReceivable, contentScope.btnCashflowPrediction, contentScope.btnAcPayable, "SBAReceivablePayableSummary", {
            id: "Receivable",
            simulationData: buttonData
          });
        }
        contentScope.btnAcPayable.onClick = () => {
          buttonData.buttonType = contentScope.flxSimulation.isVisible;
          accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnAcPayable, contentScope.btnCashflowPrediction, contentScope.btnAcReceivable, "SBAReceivablePayableSummary", {
            id: "Payable",
            simulationData: buttonData
          });
        }
        contentScope.btnSimulateCashFlow.onClick = () => {
          isBtnSimulateCashFlowAccessed = true;
          scope.simulateCashFlow();
        };
        contentScope.flxTotalIncomeSub.onClick = scope.addOrSubValue.bind(this, contentScope.txtTotalIncome, false);
        contentScope.flxTotalIncomeAdd.onClick = scope.addOrSubValue.bind(this, contentScope.txtTotalIncome, true);
        contentScope.flxTotalExpenseSub.onClick = scope.addOrSubValue.bind(this, contentScope.txtTotalExpense, false);
        contentScope.flxTotalExpenseAdd.onClick = scope.addOrSubValue.bind(this, contentScope.txtTotalExpense, true);
        contentScope.btnShowAll.onClick = () => {
          popupScope.flxDriverDetailsMain.doLayout = CommonUtilities.centerPopupFlex;
          scope.showOrHideDriversViewDetailsPopup(true);
          scope.setsegDriversData(DriverDetails, true);
        };
        popupScope.flxClose.onClick = () => {
          scope.showOrHideDriversViewDetailsPopup(false);
        };
        contentScope.txtTotalIncome.onEndEditing = function () {
          contentScope.txtTotalIncome.text = scope.formatAmount(scope.deFormatAmount(contentScope.txtTotalIncome.text));
          scope.enableorDisablebtnSimulate();
        };
        contentScope.txtTotalExpense.onEndEditing = function () {
          contentScope.txtTotalExpense.text = scope.formatAmount(scope.deFormatAmount(contentScope.txtTotalExpense.text));
          scope.enableorDisablebtnSimulate();
        };
        contentScope.btnParameterReset.onClick = () => {
          contentScope.txtTotalIncome.text = scope.formatAmount("");
          contentScope.txtTotalExpense.text = scope.formatAmount("");
          scope.enableorDisablebtnSimulate();
          scope.showCashFlowPrediction();
        };
        contentScope.flxFactorsInfo.onClick = () => {
          contentScope.flxFactorInfoMsg.setVisibility(!contentScope.flxFactorInfoMsg.isVisible);
        };
        contentScope.flxFactorInfoClose.onClick = () => {
          contentScope.flxFactorInfoMsg.setVisibility(false);
        };
        contentScope.flxDownLoad.onClick = this.downloadExcel.bind(this);
        contentScope.btnOneYear.onClick = this.onClickofFilterButton.bind(this, true);
        contentScope.btnSixMonths.onClick = this.onClickofFilterButton.bind(this, false);
        contentScope.btnShowSimulation.onClick = this.showSimulationData.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "postShow",
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
      let selectedBusinessPermissions;
      try {
        accountsIntelligencePresenter.setTabsFunctionality(contentScope.btnCashflowPrediction, contentScope.btnAcReceivable, contentScope.btnAcPayable);
        selectedBusinessPermissions = applicationManager.getSelectedSbaBusiness().featuresAndPermissions;
        if (selectedBusinessPermissions.SBA_INSIGHTS) {
          contentScope.flxCashFlowDrivers.setVisibility(true);
          contentScope.flxCashFlowGraph.width = "48%";
          contentScope.flxPrediction.left = "2%";
          contentScope.flxPrediction.width = "40%";
          contentScope.flxClosingBal.width = "40%";
        } else {
          contentScope.flxCashFlowDrivers.setVisibility(false);
          contentScope.flxCashFlowGraph.width = "96%";
          contentScope.flxPrediction.left = "35%";
          contentScope.flxPrediction.width = "15%";
          contentScope.flxClosingBal.width = "15%";
        }
        contentScope.txtTotalIncome.text = scope.formatAmount("");
        contentScope.txtTotalExpense.text = scope.formatAmount("");
        contentScope.flxFactorInfoMsg.setVisibility(false);
        contentScope.flxSimulation.setVisibility(false);
        scope.restrictCharacter(contentScope.txtTotalIncome);
        scope.restrictCharacter(contentScope.txtTotalExpense);
        scope.enableorDisablebtnSimulate();
        if (buttonData && buttonData.buttonType) {
          contentScope.btnShowSimulation.setVisibility(false);
          if (selectedBusinessPermissions.SBA_SIMULATION)
            contentScope.flxSimulation.setVisibility(true);
        } else {
          if (selectedBusinessPermissions.SBA_SIMULATION)
            contentScope.btnShowSimulation.setVisibility(true);
          contentScope.flxSimulation.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * Updates the form UI
     * @return : NA
     */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        // Toggling the loader
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        } else if (viewModel.errResponse) {
          if (viewModel.errResponse.hasOwnProperty("serverErrorRes")) {
            if (viewModel.errResponse.serverErrorRes.dbpErrMsg) {
              scope.view.formTemplate12.showBannerError({
                dbpErrMsg: viewModel.errResponse.serverErrorRes.dbpErrMsg
              });
            }
          } else {
            scope.view.formTemplate12.setBannerFocus();
            scope.view.formTemplate12.showBannerError({
              dbpErrMsg: viewModel.errResponse.errmsg || viewModel.errResponse.errorMessage
            });
          }
          contentScope.flxMainContainer.setVisibility(false);
        }
        if (viewModel.cashFlowPrediction) {
          contentScope.flxMainContainer.setVisibility(true);
          cashFlowPredictionData = viewModel.cashFlowPrediction;
          recordsPastData = viewModel.cashFlowPrediction.recordsPast;
          viewModel.cashFlowPrediction.recordsPast = isOneYear ? viewModel.cashFlowPrediction.recordsPast.slice(-9) : viewModel.cashFlowPrediction.recordsPast.slice(-4);
          DriverDetails = viewModel.cashFlowPrediction;
          scope.loadCashFlowData(viewModel.cashFlowPrediction, false);
          scope.setsegDriversData(viewModel.cashFlowPrediction, false);
        }
        if (viewModel.simulationCashFlow) {
          contentScope.flxMainContainer.setVisibility(true);
          let income = Number(scope.deFormatAmount(contentScope.txtTotalIncome.text));
          let expense = Number(scope.deFormatAmount(contentScope.txtTotalExpense.text));
          let total = income + expense;
          let tempSimulateData = viewModel.simulationCashFlow;
          tempSimulateData.netDisposableIncomeMonth1 = (Math.round(tempSimulateData.netDisposableIncomeMonth1 * 100) / 100) + total;
          tempSimulateData.netDisposableIncomeMonth2 = (Math.round(tempSimulateData.netDisposableIncomeMonth2 * 100) / 100) + total;
          tempSimulateData.netDisposableIncomeMonth3 = (Math.round(tempSimulateData.netDisposableIncomeMonth3 * 100) / 100) + total;
          DriverDetails.simulateData = tempSimulateData;
          scope.loadCashFlowData(DriverDetails, true);
          scope.loadCashFlowData(DriverDetails, true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showCashFlowPrediction
     * Will call the Cash Flow Prediction service
     * @return : NA
     */
    showCashFlowPrediction: function () {
      var param = { "subscriber": "123456" };
      presenter.getCashFlow(param, this.view.id);
    },

    /**
      * @api : loadCashFlowData
      * Will assign data to cash flow chart
      * @return : NA
      */
    loadCashFlowData: function (responseData, isSimulateData) {
      var scope = this;
      try {
        chartData.chartProperties = {
          height: '100%',
          width: '100%',
          legend: 'none',
          slantedText: false,
          curveType: 'function',
          focusTarget: 'category',
          series: {
            0: {
              color: '#008495',
              lineWidth: 3
            }
          },
          tooltip: {
            isHtml: true
          },
          type: 'line',
          annotations: {
            style: 'line',
            textStyle: {
              color: '#646464',
              fontName: 'CircularStd-Book',
              fontSize: 13,
            },
          },
          chartArea: {
            bottom: 25,
            height: '257px',
            left: 65,
            right: 10,
            top: 20,
            width: '100%',
          },
          hAxis: {
            textStyle: {
              color: '#424242',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
            slantedText: false,
          },
          vAxis: {
            format: 'short',
            textStyle: {
              color: '#727272',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
          }
        };
        chartData.data = [
          ['x', {
            type: 'string',
            role: 'annotation'
          }, {
              type: 'string',
              role: 'annotationText'
            }, {
              type: 'string',
              role: 'tooltip',
              p: {
                html: true
              }
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand"), {
              type: 'boolean',
              role: 'certainty'
            }]
        ];
        scope.addGraphData(responseData, isSimulateData);
        if (!isSimulateData) {
          scope.loadChartFlowData();
          scope.addCashFlowGraphData(responseData);
          contentScope.chartCashFlowPrediction.data = JSON.stringify(cashFlowChartData);
        }
        contentScope.chartCashFlowSimulation.data = JSON.stringify(chartData);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "loadCashFlowData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : addGraphData
      * Will modifies cash flow chart data
      * @return : NA
      */
    addGraphData: function (customData, isSimulateData) {
      var scope = this;
      if (!scope.isEmpty(customData)) {
        customData.recordsPast = customData.recordsPast.slice(-9);
        customData.recordsPast.forEach((historicalData, index) => {
          var shortMonth = scope.getDateMonthShortFormat(historicalData.date);
          if (scope.getDateMonthShortFormat(historicalData.date) === 'Jan') {
            chartData.data.push([
              shortMonth,
              scope.getDateYear(historicalData.date), '',
              scope.setTooltipContent(historicalData, false),
              scope.parseFloatTwoDecimals(historicalData.cashOnHand),
              true
            ]);
          } else if (index === customData.recordsPast.length - 1) {
            chartData.data.push([
              shortMonth, kony.i18n.getLocalizedString("i18n.ImportLC.Today"), '',
              scope.setTooltipContent(historicalData, false),
              scope.parseFloatTwoDecimals(historicalData.cashOnHand),
              true
            ]);
          } else if (index === 0) {
            chartData.data.push([
              shortMonth,
              scope.getDateYear(historicalData.date), "",
              scope.setTooltipContent(historicalData, false),
              scope.parseFloatTwoDecimals(historicalData.cashOnHand),
              true
            ]);
          } else {
            chartData.data.push([
              shortMonth,
              null,
              null,
              scope.setTooltipContent(historicalData, false),
              scope.parseFloatTwoDecimals(historicalData.cashOnHand),
              true
            ]);
          }
        });
        let predictiveRecords = [];
        const date = new Date(customData.recordsPast[customData.recordsPast.length - 1].date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let fullYear = date.getFullYear();
        let simulationPredBal = scope.formatAmount(scope.calculateGraphValue(customData, 'predictedBalance'));
        let simulationChange = scope.calculateGraphValue(customData, 'simulationChangeIn');
        customData.recordsPredictive.map((item, index) => {
          let predictiveMonth = month + (index + 1);
          let year = (predictiveMonth) <= 12 ? fullYear : fullYear + ((predictiveMonth) % 12);
          let currentDate = `${year}-${predictiveMonth <= 12 ? predictiveMonth : (predictiveMonth % 12).toString().padStart(2, '0')}-${day}`;
          item.date = currentDate;
          if (isSimulateData) {
            item.netDisposableIncome = customData.simulateData['netDisposableIncomeMonth' + (index + 1)];
          }
          predictiveRecords.push(item);
        });
        predictiveRecords.forEach((predictiveData) => {
          var shortMonth = scope.getDateMonthShortFormat(predictiveData.date);
          chartData.data.push([
            shortMonth,
            null, null,
            scope.setTooltipContent(predictiveData, true),
            predictiveData.hasOwnProperty("netDisposableIncome") ? scope.parseFloatTwoDecimals(predictiveData.netDisposableIncome) : scope.parseFloatTwoDecimals(""),
            false
          ]);
        });
        contentScope.lblSimulationCurrentCashValue.text = scope.formatAmount(scope.calculateGraphValue(customData));
        contentScope.lblSimulationPredBalValue.text = simulationPredBal;
        contentScope.lblSimulationChangeInValue.text = simulationChange;
      }
    },

    /**
     * @api : addCashFlowGraphData
     * This function is resposible for adding data to cash flow graph
     * @return : NA
     */
    addCashFlowGraphData: function (customData) {
      try {
        var scope = this;
        if (!scope.isEmpty(customData)) {
          customData.recordsPast.forEach((historicalData, index) => {
            var shortMonth = scope.getDateMonthShortFormat(historicalData.date);
            if (scope.getDateMonthShortFormat(historicalData.date) === 'Jan') {
              cashFlowChartData.data.push([
                shortMonth,
                scope.getDateYear(historicalData.date), '',
                scope.setCashFlowTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else if (index === customData.recordsPast.length - 1) {
              cashFlowChartData.data.push([
                shortMonth,
                kony.i18n.getLocalizedString("i18n.ImportLC.Today"), '',
                scope.setCashFlowTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else if (index === 0) {
              cashFlowChartData.data.push([
                shortMonth,
                scope.getDateYear(historicalData.date), "",
                scope.setCashFlowTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            } else {
              cashFlowChartData.data.push([
                shortMonth,
                null,
                null,
                scope.setCashFlowTooltipContent(historicalData, false),
                scope.parseFloatTwoDecimals(historicalData.moneyIn),
                true,
                scope.parseFloatTwoDecimals(historicalData.moneyOut),
                true,
                scope.parseFloatTwoDecimals(historicalData.cashOnHand),
                true
              ]);
            }
          });
          let predictiveRecords = [];
          const date = new Date(customData.recordsPast[customData.recordsPast.length - 1].date);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let fullYear = date.getFullYear();
          customData.recordsPredictive.map((item, index) => {
            let predictiveMonth = month + (index + 1);
            let year = (predictiveMonth) <= 12 ? fullYear : fullYear + ((predictiveMonth) % 12);
            let currentDate = `${year}-${predictiveMonth <= 12 ? predictiveMonth : (predictiveMonth % 12).toString().padStart(2, '0')}-${day}`;
            item.date = currentDate;
            predictiveRecords.push(item);
          });
          predictiveRecords.forEach((predictiveData) => {
            var shortMonth = scope.getDateMonthShortFormat(predictiveData.date);
            cashFlowChartData.data.push([
              shortMonth,
              null, null,
              scope.setCashFlowTooltipContent(predictiveData, true),
              predictiveData.hasOwnProperty("moneyIn") ? scope.parseFloatTwoDecimals(predictiveData.moneyIn) : scope.parseFloatTwoDecimals(""),
              false,
              predictiveData.hasOwnProperty("moneyOut") ? scope.parseFloatTwoDecimals(predictiveData.moneyOut) : scope.parseFloatTwoDecimals(""),
              false,
              predictiveData.hasOwnProperty("netDisposableIncome") ? scope.parseFloatTwoDecimals(predictiveData.netDisposableIncome) : scope.parseFloatTwoDecimals(""),
              false
            ]);
          });
        }
        contentScope.lblCurrentCashValue.text = scope.formatAmount(scope.calculateGraphValue(customData));
        if (!isBtnSimulateCashFlowAccessed) {
          let projChangeValue = scope.formatAmount(scope.calculateGraphValue(customData, 'projectedChange'));
          let changeInValue = scope.calculateGraphValue(customData, 'predictionChangeIn');
          contentScope.lblProjChangeValue.text = projChangeValue;
          contentScope.lblChangeInValue.text = changeInValue;
        }
        contentScope.lblCashInFlowValue.text = scope.formatAmount(customData.currMoneyIn);
        contentScope.lblCashOutFlowValue.text = scope.formatAmount(customData.currMoneyOut);
        contentScope.lblCashOnHandValue.text = scope.formatAmount(customData.currCashOnHand);
      } catch (err) {
        var errorObj =
        {
          "level": "frmCashSimulation",
          "method": "addCashFlowGraphData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : isEmpty
      * Will check empty
      * @return : false
      */
    isEmpty: function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return JSON.stringify(obj) === JSON.stringify({});
    },

    /**
      * @api : getDateMonthLongFormat
      * Will modify month to long format
      * @return : long month as i18n value
      */
    getDateMonthLongFormat: function (date) {
      let month = new Date(date).toLocaleString('en', {
        month: 'long'
      });
      return kony.i18n.getLocalizedString(`kony.mb.Months.${month}`)
    },

    /**
      * @api : getDateMonthShortFormat
      * Will modify month to short
      * @return : short month
      */
    getDateMonthShortFormat: function (date) {
      return new Date(date).toLocaleString('en', {
        month: 'short'
      });
    },

    /**
      * @api : getDateYear
      * Will take date
      * @return : year
      */
    getDateYear: function (date) {
      return new Date(date).toLocaleString('en', {
        year: 'numeric'
      });
    },

    /**
      * @api : setTooltipContent
      * Will show tool tip
      * @return : html tag
      */
    setTooltipContent: function (dataTable, isPredictiveData) {
      var scope = this;
      if (isPredictiveData) {
        return (
          '<div class="tooltipContainer"><div class="tooltipTitlePrediction divider"><p>' +
          scope.getDateMonthLongFormat(dataTable.date) +
          '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><h4>' + kony.i18n.getLocalizedString("i18n.SBAdvisory.netDisposableIncome") + '</h4><br><br><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.projectedBalance") + '</p><p class="tooltipMoneyFlowListItemRight">' +
          scope.getMoneyFormat(parseFloat(dataTable.netDisposableIncome || 0)) +
          '</p></div>');
      } else {
        return (
          '<div class="tooltipContainer"><div class="tooltipTitlePrediction divider"><p>' +
          scope.getDateMonthLongFormat(dataTable.date) +
          '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><h4>' + kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand") + '</h4><br><br><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' + kony.i18n.getLocalizedString("i18n.SBAdvisory.closingBalance") + '</p><p class="tooltipMoneyFlowListItemRight">' +
          scope.getMoneyFormat(parseFloat(dataTable.cashOnHand || 0)) +
          '</p></div>');
      }
    },

    /**
     * @api : setCashFlowTooltipContent
     * This function is resposible for setting Tool tip for cash flow chart
     * @return : NA
     */
    setCashFlowTooltipContent: function (dataTable, isPredictiveData) {
      try {
        var scope = this;
        if (isPredictiveData) {
          return ('<div class="tooltipContainer"><div class="tooltipTitlePrediction divider"><p>' +
            scope.getDateMonthLongFormat(dataTable.date) +
            '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><h4>'
            + kony.i18n.getLocalizedString("i18n.SBAdvisory.netDisposableIncome") +
            '</h4><br><br><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.projectedBalance") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(parseFloat(dataTable.netDisposableIncome || 0)) +
            '</p></div>');
        } else {
          return ('<div class="tooltipContainer"><div class="tooltipTitlePrediction divider"><p>' +
            scope.getDateMonthLongFormat(dataTable.date) +
            '</p><div class="closeBtnContainer"><button id="closeBtn" class="closeBtn">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow"><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft"><img src= "./desktopweb/images/cashinflow.png">&nbsp;' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.cashInflow") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(dataTable.moneyIn || 0) +
            '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft"><img src="./desktopweb/images/cashoutflow.png">&nbsp;' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOutflow") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(parseFloat(dataTable.moneyOut || 0)) +
            '</p></div><div class="tooltipMoneyFlowListCashFlow divider"><p class="tooltipMoneyFlowListItemLeft"><img src="./desktopweb/images/cfonhandhand.png">&nbsp;' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(parseFloat(dataTable.cashOnHand || 0)) +
            '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.closingBalance") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(parseFloat(dataTable.closingBalance || 0)) +
            '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.monthlyTotal") +
            '</p><p class="tooltipMoneyFlowListItemRight">' +
            scope.getMoneyFormat(parseFloat(dataTable.monthlyTotal || 0)) +
            '</p></div><div class="tooltipMoneyFlowListCashFlow"><p class="tooltipMoneyFlowListItemLeft">' +
            kony.i18n.getLocalizedString("i18n.SBAdvisory.monthlyChange") +
            '</p><p class="tooltipMoneyFlowListItemRight">' + dataTable.monthlyChange +
            '</p></div>');
        }
      } catch (err) {
        var errorObj =
        {
          "level": "frmCashSimulation",
          "method": "setCashFlowTooltipContent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : getMoneyFormat
      * Will format the amount
      * @return : amount
      */
    getMoneyFormat: function (amount) {
      var scope = this;
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      });
      if (typeof (amount) === "string") {
        return amount;
      } else {
        if (isNaN(amount)) {
          return "-";
        } else {
          return formatter.format(amount)
        }
      }
    },

    /**
      * @api : parseFloatTwoDecimals
      * Will format amount to decimals
      * @return : amount
      */
    parseFloatTwoDecimals: function (strAmount) {
      return parseFloat(parseFloat(strAmount).toFixed(2));
    },

    /**
     * @api : setsegDriversWidgetMap
     * This function is resposible for setting widgetMap for segment inorder to display driver details
     * @return : NA
     */
    setsegDriversWidgetMap: function () {
      try {
        contentScope.segDrivers.widgetDataMap = {
          "flxContent": "flxContent",
          "flxHeading": "flxHeading",
          "flxMain": "flxMain",
          "flxMainContent": "flxMainContent",
          "flxSbaDrivers": "flxSbaDrivers",
          "imgDriver": "imgDriver",
          "imgHeading": "imgHeading",
          "lblField": "lblField",
          "lblHeader": "lblHeader",
          "lblIndicator": "lblIndicator",
          "lblValue": "lblValue",
          "flxIndicator": "flxIndicator",
          "lblPercentage": "lblPercentage"
        }
      }
      catch (err) {
        var errorObj =
        {
          "level": "frmCashSimulation",
          "method": "setsegDriversWidgetMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setsegDriversData
     * This function is resposible for setting driver details to segment
     * @return : NA
     */
    setsegDriversData: function (data, isShowAll) {
      var scope = this;
      var driversData = [];
      var section1 = [];
      var section2 = [];
      try {
        scope.setsegDriversWidgetMap();
        var postiveDrivers = isShowAll ? data.positiveDrivers : data.positiveDrivers.slice(0, 3);
        var negativeDrivers = isShowAll ? data.negativeDrivers : data.negativeDrivers.slice(0, 3);
        var driverVariable = SBADriverVariables.collection_variables.insightConstants;
        section1 = [{
          imgHeading: {
            src: "warning.png",
            isVisible: true
          },
          lblHeader: {
            text: `${kony.i18n.getLocalizedString("i18n.SBAdvisory.thingsThatNeedYourAttention")}` + " " + `(${data.negativeDrivers.length})`,
            skin: "ICSknLble5690b13pxSemibold"
          },
          flxHeading: {
            top: isShowAll ? "20dp" : "0dp"
          }
        }, []];
        negativeDrivers.forEach((negDriver, index) => {
          section1[1].push({
            lblValue: {
              text: presenter.replaceDriverValues(driverVariable.find(item => item.key === negDriver.driverDetails).value.negative, negDriver.value)
            },
            lblIndicator: {
              skin: "ICSknLblbge5690b",
              width: `${parseInt(negDriver.percentage)}%`
            },
            lblPercentage: {
              left: parseInt(negDriver.percentage) >= "97" ? "50%" : parseInt(negDriver.percentage) === 0 ? "2%" : `${parseInt(negDriver.percentage)}%`,
              text: `${parseInt(negDriver.percentage)}%`
            }
          })
        });
        section2 = [{
          imgHeading: {
            src: "like.png",
            isVisible: true
          },
          lblHeader: {
            text: `${kony.i18n.getLocalizedString("i18n.SBAdvisory.thingsThatAreGoingWellSmall")}` + " " + `(${data.positiveDrivers.length})`,
            skin: "ICSknLbl04a61513pxSemibold"
          },
          flxHeading: {
            top: "30dp"
          }
        }, []];
        postiveDrivers.forEach((posDriver, index) => {
          section2[1].push({
            lblValue: {
              text: presenter.replaceDriverValues(driverVariable.find(item => item.key === posDriver.driverDetails).value.positive, posDriver.value)
            },
            lblIndicator: {
              skin: "ICSknLblbg00850e",
              width: `${parseInt(posDriver.percentage)}%`
            },
            lblPercentage: {
              left: parseInt(posDriver.percentage) >= "97" ? "50%" : parseInt(posDriver.percentage) === 0 ? "2%" : `${parseInt(posDriver.percentage)}%`,
              text: `${parseInt(posDriver.percentage)}%`
            }
          })
        });
        driversData.push(section1);
        driversData.push(section2);
        if (isShowAll) {
          popupScope.segDriverViewDetails.setData(driversData);
        } else {
          contentScope.segDrivers.setData(driversData);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "setsegDriversData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
 * @api : formatAmount
 * format Amount after entering
 * @return : NA
 */
    formatAmount: function (amount) {
      var scope = this;
      try {
        return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "formatAmount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : restrictCharacter
     * This function responsible for restricting the widget
     * @return : NA
     */
    restrictCharacter: function (widget) {
      var scope = this;
      try {
        widget.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "restrictCharacter",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    simulateCashFlow: function () {
      var scope = this;
      try {
        var payload = {
          "income": scope.deFormatAmount(contentScope.txtTotalIncome.text),
          "expense": scope.deFormatAmount(contentScope.txtTotalExpense.text),
          "subscriber": "123456"
        };
        presenter.simulateCashFlow(payload, this.view.id);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "simulateCashFlow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : deFormatAmount
     * de-format Amount 
     * @return : NA
     */
    deFormatAmount: function (amount) {
      var scope = this;
      try {
        return applicationManager.getFormatUtilManager().deFormatAmount(amount);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "deFormatAmount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : enableorDisablebtnSimulate
     * resposoble for enable or disable the simulate button
     * @return : NA
     */
    enableorDisablebtnSimulate: function () {
      var scope = this;
      var income = parseInt(scope.deFormatAmount(contentScope.txtTotalIncome.text));
      var expense = parseInt(scope.deFormatAmount(contentScope.txtTotalExpense.text));
      try {
        if (income != 0 || expense != 0) {
          contentScope.btnSimulateCashFlow.setEnabled(true);
          contentScope.btnSimulateCashFlow.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
        } else {
          contentScope.btnSimulateCashFlow.setEnabled(false);
          contentScope.btnSimulateCashFlow.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "enableorDisablebtnSimulate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
 * @api : addOrSubValue
 * This function is responsible for adding or subtracting income or expense values
 * @return : NA
 */
    addOrSubValue: function (widget, isAdd) {
      var scope = this;
      try {
        var amount = parseInt(scope.deFormatAmount(widget.text));
        widget.text = scope.formatAmount(isAdd ? amount + presenter.parameterValue : amount - presenter.parameterValue);
        scope.enableorDisablebtnSimulate();
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "addOrSubValue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showOrHideDriversViewDetailsPopup
     * This function is responsible for showing or hiding drivers view details popup
     * @return : NA
     */
    showOrHideDriversViewDetailsPopup: function (param) {
      try {
        popupScope.setVisibility(param);
        popupScope.flxDriverViewDetailsPopup.setVisibility(param);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "showOrHideDriversViewDetailsPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    calculateGraphValue: function (data, valueField) {
      var scope = this;
      let pastDataLength = data.recordsPast.length - 1;
      let predictiveDataLength = data.recordsPredictive.length - 1;
      let returnValue;
      let todayData = data.recordsPast[pastDataLength];
      try {
        data.recordsPast.forEach((item) => {
          if (applicationManager.getFormatUtilManager().isTodayDate(applicationManager.getFormatUtilManager().getDateObjectfromString(item.date))) {
            todayData = item;
          }
        });
        switch (valueField) {
          case 'projectedChange':
            returnValue = data.recordsPredictive[predictiveDataLength].netDisposableIncome - todayData.cashOnHand;
            break;
          case 'predictionChangeIn':
          case 'simulationChangeIn':
            returnValue = `${(((data.recordsPredictive[predictiveDataLength].netDisposableIncome - todayData.cashOnHand) / todayData.cashOnHand) * 100).toFixed(2)} %`;
            break;
          case 'predictedBalance':
            returnValue = data.recordsPredictive[predictiveDataLength].netDisposableIncome;
            break;
          default:
            returnValue = todayData.cashOnHand;
            break;
        }
        return returnValue;
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "calculateGraphValue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : onError
   * Error thrown from catch block in component and shown on the form
   * @return : NA
   */
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      // kony.ui.Alert(errMsg);
    },

    /**
     * @api : addCursorPointer
     * Add cursor pointer to widgets
     * @return : NA
     */
    addCursorPointer: function () {
      presenter.cursorTypePointer([
        contentScope.lblFactorInfoClose,
        popupScope.lblClose,
        contentScope.flxDownLoad,
        contentScope.flxFactorsInfo
      ]);
    },

    /**
     * @api : downloadExcel
     * This function is responsible for downloading excel file
     * @return : NA
     */
    downloadExcel: function () {
      var scope = this;
      try {
        var payload = {
          "subscriber": "123456",
          "customerId": kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.customer_id,
        }
        presenter.downloadExcel(payload, this.view.id);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "downloadExcel",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onClickofFilterButton
     * This function is responsible for filtering of charts based on timeline like 6 months or 1 year
     * @return : NA
     */
    onClickofFilterButton: function (isYearEnabled) {
      var scope = this;
      try {
        if (isYearEnabled) {
          contentScope.btnOneYear.skin = "ICSknBtnAccountSummarySelected13px";
          contentScope.btnSixMonths.skin = "ICSknBtnAccountSummaryUnselected13px";
        } else {
          contentScope.btnOneYear.skin = "ICSknBtnAccountSummaryUnselected13px";
          contentScope.btnSixMonths.skin = "ICSknBtnAccountSummarySelected13px";
        }
        isOneYear = isYearEnabled;
        cashFlowPredictionData.recordsPast = isOneYear ? recordsPastData.slice(-9) : recordsPastData.slice(-4);
        scope.loadCashFlowData(cashFlowPredictionData, false);
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "onClickofFilterButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : loadChartFlowData
     * This function is responsible for adding properties to cashFlowChartData object for Cash flow graph
     * @return : NA
     */
    loadChartFlowData: function () {
      try {
        cashFlowChartData.chartProperties = {
          height: '100%',
          width: '100%',
          legend: 'none',
          slantedText: false,
          curveType: 'function',
          focusTarget: 'category',
          series: {
            0: {
              color: '#54D75D',
              lineWidth: 3,
              lineDashStyle: [4, 2]
            },
            1: {
              color: '#FF8600',
              lineWidth: 3,
              lineDashStyle: [2, 2]
            },
            2: {
              color: '#008495',
              lineWidth: 3,
            }
          },
          tooltip: {
            isHtml: true
          },
          type: 'line',
          annotations: {
            style: 'line',
            textStyle: {
              color: '#646464',
              fontName: 'CircularStd-Book',
              fontSize: 13,
            },
          },
          chartArea: {
            bottom: 25,
            height: '257px',
            left: 65,
            right: 10,
            top: 20,
            width: '100%',
          },
          hAxis: {
            textStyle: {
              color: '#424242',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
            slantedText: false,
          },
          vAxis: {
            format: 'short',
            textStyle: {
              color: '#727272',
              fontName: 'SourceSansPro-Regular',
              fontSize: 13,
            },
          },
          crosshair: {
            focused: {
              color: '#999999'
            },
            orientation: 'vertical',
            trigger: 'focus',
          }
        };
        cashFlowChartData.data = [
          ['x', {
            type: 'string',
            role: 'annotation'
          }, {
              type: 'string',
              role: 'annotationText'
            }, {
              type: 'string',
              role: 'tooltip',
              p: {
                html: true
              }
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashInflow"), {
              type: 'boolean',
              role: 'certainty'
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOutflow"), {
              type: 'boolean',
              role: 'certainty'
            }, kony.i18n.getLocalizedString("i18n.SBAdvisory.cashOnHand"), {
              type: 'boolean',
              role: 'certainty'
            }]
        ];
      } catch (err) {
        var errorObj = {
          "level": "frmCashSimulation",
          "method": "loadChartFlowData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showSimulationData
     * This function is responsible for showing simulation graph
     * @return : NA
     */
    showSimulationData: function () {
      var scope = this;
      cashFlowPredictionData.recordsPast = recordsPastData.slice(-9);
      contentScope.btnShowSimulation.setVisibility(false);
      contentScope.flxSimulation.setVisibility(true);
      scope.loadCashFlowData(cashFlowPredictionData, false);
    }
  };
});