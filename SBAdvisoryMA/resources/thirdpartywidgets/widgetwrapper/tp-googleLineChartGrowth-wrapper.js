googleLineChartGrowth = {
    initializeWidget: function (parentNode, widgetModel, config) {
      //Assign custom DOM to parentNode to render this widget.
      parentNode.innerHTML = "<div class='visualization' id='" + this.getCustomContainerID(widgetModel) + "'></div>";
  
      if (this.crossCheckVariables(widgetModel)) {
        this.drawGraph(
          this.getData(widgetModel),
          this.getCustomContainerID(widgetModel),
          this.getCustomBackgroundColor(widgetModel)
        );
      }
    },
    modelChange: function (widgetModel, propertyChanged, propertyValue) {
      //Handle widget property changes to update widget's view and
      //trigger custom events based on widget state.
  
      if (propertyChanged === 'data') {  
        if (this.crossCheckVariables(widgetModel)) {
          this.drawGraph(
            this.getData(widgetModel),
            this.getCustomContainerID(widgetModel),
            this.getCustomBackgroundColor(widgetModel)
          );
        } 
      }
    },
    crossCheckVariables: function (widgetModel) {
      return (
        this.getCustomContainerID(widgetModel) !== '' &&
        this.getCustomBackgroundColor(widgetModel) !== ''
      );
    },
    getData: function (widget) {
      return JSON.parse(widget.data || '{}');
    },
    getCustomContainerID: function (widget) {
      return widget.customContainerID;
    },
    getCustomBackgroundColor: function (widget) {
      return widget.customBackgroundColor;
    },
    getIsHoverable: function (widget) {
      return widget.isHoverable;
    },
    drawGraph: function (customData, customContainerID, customBackgroundColor) {
      var options = {
        annotations: {
          style: 'line',
          textStyle: {
            color: '#646464',
            fontName: 'CircularStd-Book',
            fontSize: 11,
          },
        },
        backgroundColor: customBackgroundColor,
        chartArea: {
          bottom: 25,
          height: '252px',
          left: 90,
          right: 20,
          top: 20,
          width: '100%',
        },
        crosshair: {
          focused: { color: '#008392' },
          orientation: 'vertical',
          trigger: 'none',
        },
        curveType: 'function',
        focusTarget: 'category',
        hAxis: {
          allowContainerBoundaryTextCutoff: true,
          baseline: 0,
          format: 'MMM',
          maxValue: 12,
          minorGridlines: { count: 0 },
          minValue: 0,
          slantedText: false,
          textStyle: {
            color: '#2b2b2b',
            fontName: 'CircularStd-Book',
            fontSize: 12,
          },
		  showTextEvery: 1,
          viewWindow: { min: 0 },
        },
        height: '252px',
        width: '100%',
        legend: 'none',
        series: {
          0: { lineWidth: 4, color: '#008392' },
          1: { lineWidth: 4, color: '#008392' },
          2: { lineWidth: 4, color: '#008392' },
        },
        tooltip: {
          isHtml: true,
          trigger: 'selection',
        },
        vAxis: {
          format: '$###,###,###,###',
          maxValue: 10,
          //minValue: 0,
          textStyle: {
            color: '#2b2b2b',
            fontName: 'CircularStd-Book',
            fontSize: 12,
          },
          //viewWindow: { min: 0 },
        }
      };
  
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
  
      google.charts.load('visualization', { packages: ['corechart'] });
      google.setOnLoadCallback(drawVisualization);
  
      function drawVisualization() {
        var dt = new google.visualization.DataTable();
  
        dt.addColumn('string', 'x');
        dt.addColumn({ type: 'string', role: 'annotation' });
        dt.addColumn({ type: 'string', role: 'annotationText' });
        dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        dt.addColumn('number', 'Prediction');
        dt.addColumn({ type: 'boolean', role: 'certainty' });
        dt.addColumn('number', 'Closing Balance');
        dt.addColumn({ type: 'boolean', role: 'certainty' });
        dt.addColumn('number', 'Your Growth Plan');
        dt.addColumn({ type: 'boolean', role: 'certainty' });
  
        addRowsToGraph(dt);
  
        // Create and draw the visualization.
        var container = document.getElementById(customContainerID);
        var chart = new google.visualization.LineChart(container);
  
        var observer = new MutationObserver(function () {
          Array.prototype.forEach.call(
            container.getElementsByTagName('text'),
            function (annotation) {
              if (
                annotation.getAttribute('text-anchor') === 'middle' &&
                annotation.getAttribute('fill') === '#646464'
              ) {
                var chartLayout = chart.getChartLayoutInterface();
                annotation.setAttribute('transform', 'rotate(0)');
                annotation.setAttribute('pointer-events', 'none');
                annotation.setAttribute(
                  'y',
                  chartLayout.getChartAreaBoundingBox().top -
                    parseInt(annotation.getAttribute('font-size')) / 2
                );
  
                //set sibling
                var pathSibling = annotation.parentElement;
                pathSibling = pathSibling.nextSibling;
                pathSibling.setAttribute('transform', 'rotate(0)');
                pathSibling.setAttribute('pointer-events', 'none');
                pathSibling.setAttribute(
                  'y',
                  chartLayout.getChartAreaBoundingBox().top -
                    parseInt(pathSibling.getAttribute('font-size')) / 2
                );
              }
            }
          );
        });
  
        observer.observe(container, { childList: true, subtree: true });
  
        google.visualization.events.addListener(chart, 'click', clearSelection);
  
        document.body.addEventListener('click', clearSelection, false);
        chart.draw(dt, options);
  
        function clearSelection(e) {
          if (!container.contains(e.srcElement)) {
            chart.setSelection();
          }
        }
      }
  
      function setTooltipContent(dataTable) {
        var classChange;
        var sign;
  
        switch (dataTable.monthlyChangeStatus) {
          case 'positive': {
            classChange = 'plusChange';
            sign = '+';
            break;
          }
          case 'negative': {
            classChange = 'minusChange';
            sign = '-';
            break;
          }
          default: {
            classChange = '';
            sign = '';
            break;
          }
        }
  
        return (
          '<div class="tooltipContainer"><div class="tooltipTitle divider"><p>' +
          getDateMonthLongFormat(dataTable.date) +
          /* '</p><div class="closeBtnContainer"><button class="closeBtn" onClick="closeTooltip()">X</button></div></div><div class="tooltipInfoContainer"><div class="tooltipMoneyFlow divider"><div class="tooltipMoneyFlowList"><p class="tooltipMoneyFlowListItemLeft colorCircle ">Cash Inflow</p><p class="tooltipMoneyFlowListItemRight ' +
          classChange +
          '">' +
          sign + */
          /* formatter.format(dataTable.moneyIn) +
          '</p></div><div class="tooltipMoneyFlowList"><p class="tooltipMoneyFlowListItemLeft colorCircle orange">Cash Outflow</p><p class="tooltipMoneyFlowListItemRight">' +
          formatter.format(dataTable.moneyOut) + */
          '</p></div><div class="tooltipMoneyFlowList"><p style="text-indent: 10px;" class="tooltipMoneyFlowListItemLeft colorCircle teal">Cash on Hand</p><p class="tooltipMoneyFlowListItemRight">' + 
          formatter.format(dataTable.cashOnHand) +
          /* '</p></div></div><div class="tooltipMoneyFlow"><div class="tooltipMoneyFlowList"><p class="tooltipMoneyFlowListItemLeft">Closing Balance</p><p class="tooltipMoneyFlowListItemRight">' + */
          /* formatter.format(dataTable.closingBalance) +
          '</p></div><div class="tooltipMoneyFlowList"><p class="tooltipMoneyFlowListItemLeft">Monthly Total</p><p class="tooltipMoneyFlowListItemRight">' +
          formatter.format(dataTable.monthlyTotal) +
          '</p></div><div class="tooltipMoneyFlowList"><p class="tooltipMoneyFlowListItemLeft">Monthly Change</p><p class="tooltipMoneyFlowListItemRight">' +
          formatter.format(dataTable.monthlyChange) + */
          '</p></div></div></div></div>'
        );
      }
  
      function addRowsToGraph(data) {
        if (!isEmpty(customData)) {
          customData.recordsPast.forEach((historicalData, index) => {
            var shortMonth = getDateMonthShortFormat(historicalData.date);
  
            if (getDateMonthShortFormat(historicalData.date) === 'JAN') {
              data.addRow([
                shortMonth,
                getDateYear(historicalData.date),
                '',
                setTooltipContent(historicalData),
                parseFloatTwoDecimals(historicalData.closingBalancePrediction),
                true,
                parseFloatTwoDecimals(historicalData.cashOnHand),
                true,
                parseFloatTwoDecimals(historicalData.growthPlan),
                false,
              ]);
            } else if (index === customData.recordsPast.length - 1) {
              data.addRow([
                shortMonth,
                'Today',
                '',
                setTooltipContent(historicalData),
                parseFloatTwoDecimals(historicalData.closingBalancePrediction),
                true,
                parseFloatTwoDecimals(historicalData.cashOnHand),
                true,
                parseFloatTwoDecimals(historicalData.growthPlan),
                false,
              ]);
            } else if (index === 0) {
                    data.addRow([
					shortMonth,
                getDateYear(historicalData.date),
                '',
                setTooltipContent(historicalData),
                parseFloatTwoDecimals(historicalData.closingBalancePrediction),
                true,
                parseFloatTwoDecimals(historicalData.cashOnHand),
                true,
                parseFloatTwoDecimals(historicalData.growthPlan),
                false,
				]);
            } else {
              data.addRow([
                shortMonth,
                null,
                null,
                setTooltipContent(historicalData),
                parseFloatTwoDecimals(historicalData.closingBalancePrediction),
                true,
                parseFloatTwoDecimals(historicalData.cashOnHand),
                true,
                parseFloatTwoDecimals(historicalData.growthPlan),
                false,
              ]);
            }
          });
  
          customData.recordsPredictive.forEach((predictiveData) => {
            var shortMonth = getDateMonthShortFormat(predictiveData.date);
  
            if (getDateMonthShortFormat(predictiveData.date) === 'JAN') {
              data.addRow([
                shortMonth,
                getDateYear(predictiveData.date),
                '',
                setTooltipContent(predictiveData),
                parseFloatTwoDecimals(predictiveData.closingBalancePrediction),
                false,
                parseFloatTwoDecimals(predictiveData.cashOnHand),
                false,
                parseFloatTwoDecimals(predictiveData.growthPlan),
                false,
              ]);
            } else {
              data.addRow([
                shortMonth,
                null,
                null,
                setTooltipContent(predictiveData),
                parseFloatTwoDecimals(predictiveData.closingBalancePrediction),
                false,
                parseFloatTwoDecimals(predictiveData.cashOnHand),
                false,
                parseFloatTwoDecimals(predictiveData.growthPlan),
                false,
              ]);
            }
          });
        }
      }
  
      function getDateMonthLongFormat(date) {
        return new Date(date).toLocaleString('en', { month: 'long' });
      }
  
      function getDateMonthShortFormat(date) {
        return new Date(date)
          .toLocaleString('en', { month: 'short' })
          .toLocaleUpperCase();
      }
  
      function getDateYear(date) {
        return new Date(date).toLocaleString('en', { year: 'numeric' });
      }
  
      function parseFloatTwoDecimals(strAmount) {
        return parseFloat(parseFloat(strAmount).toFixed(2));
      }
  
      function isEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false;
          }
        }
  
        return JSON.stringify(obj) === JSON.stringify({});
      }
    },
};