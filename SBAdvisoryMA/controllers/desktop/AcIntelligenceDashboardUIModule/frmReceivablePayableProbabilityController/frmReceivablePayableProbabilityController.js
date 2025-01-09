define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
    var probableChartData = {};
    return {

        /**
         * @api : onNavigate
         * This function for executing the preShow and postShow
         * @return : NA
         */
        onNavigate: function () {
            var scope = this;
            try {
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableProbability",
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
            } catch (err) {
                var errorObj = {
                    //"level": "Form2",
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
                scope.setProbableChartData();
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableProbability",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setProbableChartData: function () {
            var scope = this;
            try {
                probableChartData.data = {
                    labels: ['05 Dec 24', '10 Jan 24', '15 Feb 24', '20 Mar 24', '25 Apr 24', '05 May 24', '10 Jul 24', '15 Jul 24', '20 Jul 24', '25 Jul 24'],
                    datasets: [{
                        label: 'test1',
                        data: [65, 78, 89, 39, 67, 90, 29, 900, 800, 1690, 100, 100],
                        fill: false,
                        borderColor: 'rgba(119, 188, 67, 1)',
                        tension: 0.1
                    },
                    {
                        label: 'test2',
                        data: [65, 98, 39, 27, 90, 67, 78, 89, 1200, 800, 500, 800],
                        borderColor: 'rgba(0, 132, 149, 1)',
                        fill: false,
                        borderDash: [5, 1],
                        tension: 0.1
                    }]
                }
                this.view.MultiLineChart.data = JSON.stringify(probableChartData);
            } catch (err) {
                var errorObj = {
                    "level": "frmReceivablePayableProbability",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmReceivablePayableProbability";
            // kony.ui.Alert(errMsg);
        }
    }
});