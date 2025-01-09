var chartData = null;
var labelData = null;
var currencyFormat = null;

function addMultiLineBarChart(labels, data, currencyFormat, selectedData) {
	chartData = data;
	labelData = labels;
	currencyFormat = currencyFormat;
	var labelIndex = getIndexFromURL(selectedData);
	var creditBalanace = data[0][labelIndex];
	var debitBalance = data[1][labelIndex];
	var availableBalance = data[2][labelIndex];
	populateData(creditBalanace, debitBalance, availableBalance, labelIndex);
	var depositBalances = new Chartist.Bar('#multiLinechart', {
		labels: labels,
		series: data
	}, {
		fullWidth: true,
		chartPadding: {
			right: 100,
			bottom: 50,
			top: -3
		},
		axisX: {
			showGrid: false,
		},
		axisY: {
			labelInterpolationFnc: function (value) {
				return currencyFormat + "" + formatMoney(value, 0);
			}
		}
	});

	function getIndexFromURL(dataselect) {
		var hashcode = 0;
		var finalIndex = -1;
		if (dataselect === null || dataselect === undefined) {
			if (window.location.hash.indexOf("#") < 0) {} else {
				hashcode = window.location.hash.substring(window.location.hash.indexOf("#") + 1, window.location.hash.length);
				var dataIndex = labelData.indexOf(hashcode);
				if(dataIndex >= 0 && dataIndex <= 3) {
					finalIndex = dataIndex;
				}
			}
		} else {
			if(dataselect >= 0 && dataselect <= 3) {
				finalIndex = dataselect;
			}
		}

		if(finalIndex === -1) finalIndex = 3;

		return finalIndex;
	}

	function formatMoney(number, decPlaces, decSep, thouSep) {
		decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
		decSep = typeof decSep === "undefined" ? "." : decSep;
		thouSep = typeof thouSep === "undefined" ? "," : thouSep;
		var sign = number < 0 ? "-" : "";
		if (number > 1000) {
			number = number / 1000;
		}
		var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
		var j = (j = i.length) > 3 ? j % 3 : 0;
		var valToDisplay = sign + (j ? i.substr(0, j) + thouSep : "") + i.substr(j).replace(/(decSep{3})(?=decSep)/g, "$1" + thouSep) + (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
		return valToDisplay + "k";
	}

	function myFunc(data, labels, eventObject) {
		var labeltext = eventObject.srcElement.textContent;
		var labelIndex = findIndex(labels, labeltext);
		var creditBalanace = data[0][labelIndex];
		var debitBalance = data[1][labelIndex];
		var availableBalance = data[2][labelIndex];
		populateData(creditBalanace, debitBalance, availableBalance, labelIndex);
	}

	function populateData(creditBalanace, debitBalance, availableBalance, labelIndex) {
		document.getElementById("creditValue").innerHTML = "+" + currencyFormat + creditBalanace;
		document.getElementById("debitValue").innerHTML = "<nobr>-" + currencyFormat + debitBalance + "</nobr>";
		document.getElementById("availableValue").innerHTML = currencyFormat + availableBalance;
		var leftLocation = [12, 32, 50, 62];
		document.getElementById("triangle").style.left = leftLocation[labelIndex] + "%";
		try {
			var baseURL = window.location.pathname;
			var newURL = baseURL + "#" + labelData[labelIndex];
			window.history.replaceState({}, "", newURL);
		} catch (e) {
			console.log(JSON.stringify(e));
		}
	}

	function findIndex(labels, labeltext) {
		var index = 0;
		for (var i = 0; i < labels.length; i++) {
			if (labeltext == labels[i]) {
				index = i;
				break;
			}
		}
		return index;
	}
	depositBalances.on('draw', function (data) {
		if (data.type === 'bar') {
			data.element.animate({
				y2: {
					dur: 1000,
					from: data.y1,
					to: data.y2,
					easing: Chartist.Svg.Easing.easeOutQuint
				},
				opacity: {
					dur: 1000,
					from: 0,
					to: 1,
					easing: Chartist.Svg.Easing.easeOutQuint
				}
			});
		}
		if (data.type === 'label' && data.axis.units.pos === 'y') {
			data.element.attr({
				x: data.axis.chartRect.width() + 60
			});
		}
		if (data.type === 'label') {
			data.element._node.onclick = myFunc.bind(data, chartData, labelData);
		}
	});
}