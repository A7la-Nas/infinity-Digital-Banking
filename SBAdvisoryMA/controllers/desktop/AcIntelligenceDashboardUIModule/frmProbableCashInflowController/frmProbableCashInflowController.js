define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
    var probableChartData = {};
    var contentScope;
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
                    "level": "frmProbableCashInflow",
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
                contentScope = this.view.formTemplate12.flxContentTCCenter;
                this.view.preShow = this.preShow;
                this.view.postShow = this.postShow;
            } catch (err) {
                var errorObj = {
                    //"level": "frmProbableCashInflow",
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
                    "level": "frmProbableCashInflow",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setProbableChartData: function () {
            var scope = this;
            try {
                probableChartData.data = [{
                    "x": new Date('05 Apr 2017 00:00 Z').getTime(),
                    "label": "Inspire Fitness Co.",
                    "business": "Inspire Fitness Co.",
                    "paymentDays": "47",
                    "dueDate": new Date('05 Apr 2017 00:00 Z').getTime(),
                    "probableDate": new Date('22 May 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "100",
                    "o": 100.00,
                    "h": 100.00,
                    "l": 130.00,
                    "c": 130.00
                }, {
                    "x": new Date('22 May 2017 00:00 Z').getTime(),
                    "label": "Inspire Fitness Co.",
                    "business": "Inspire Fitness Co.",
                    "paymentDays": "47",
                    "dueDate": new Date('05 Apr 2017 00:00 Z').getTime(),
                    "probableDate": new Date('22 May 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "100",
                    "o": 99.8,
                    "h": 99.8,
                    "l": 69.8,
                    "c": 69.8
                }, {
                    "x": new Date('11 Jun 2017 00:00 Z').getTime(),
                    "label": "Epic Adventure Inc.",
                    "business": "Epic Adventure Inc.",
                    "paymentDays": "1",
                    "dueDate": new Date('11 Jun 2017 00:00 Z').getTime(),
                    "probableDate": new Date('12 Jun 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "300",
                    "o": 300.00,
                    "h": 300.00,
                    "l": 330.00,
                    "c": 330.00
                }, {
                    "x": new Date('12 Jun 2017 00:00 Z').getTime(),
                    "label": "Epic Adventure Inc.",
                    "business": "Epic Adventure Inc.",
                    "paymentDays": "1",
                    "dueDate": new Date('11 Jun 2017 00:00 Z').getTime(),
                    "probableDate": new Date('12 Jun 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "300",
                    "o": 299.00,
                    "h": 299.00,
                    "l": 269.00,
                    "c": 269.00
                }, {
                    "x": new Date('13 Jul 2017 00:00 Z').getTime(),
                    "label": "Eco Focus",
                    "business": "Eco Focus",
                    "paymentDays": "1",
                    "dueDate": new Date('13 Jul 2017 00:00 Z').getTime(),
                    "probableDate": new Date('14 Jul 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "300",
                    "o": 500.00,
                    "h": 500.00,
                    "l": 530.00,
                    "c": 530.00
                }, {
                    "x": new Date('14 Jul 2017 00:00 Z').getTime(),
                    "label": "Eco Focus",
                    "business": "Eco Focus",
                    "paymentDays": "1",
                    "dueDate": new Date('13 Jul 2017 00:00 Z').getTime(),
                    "probableDate": new Date('14 Jul 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "300",
                    "o": 499.00,
                    "h": 499.00,
                    "l": 469.00,
                    "c": 469.00
                }, {
                    "x": new Date('16 Aug 2017 00:00 Z').getTime(),
                    "label": "Candor Corp.",
                    "business": "Eco Focus",
                    "paymentDays": "7",
                    "dueDate": new Date('16 Aug 2017 00:00 Z').getTime(),
                    "probableDate": new Date('23 Aug 2017 00:00 Z').getTime(),
                    "invoiceCount": "2",
                    "amount": "200",
                    "o": 500.00,
                    "h": 500.00,
                    "l": 530.00,
                    "c": 530.00
                }, {
                    "x": new Date('23 Aug 2017 00:00 Z').getTime(),
                    "label": "Candor Corp.",
                    "business": "Eco Focus",
                    "paymentDays": "7",
                    "dueDate": new Date('16 Aug 2017 00:00 Z').getTime(),
                    "probableDate": new Date('23 Aug 2017 00:00 Z').getTime(),
                    "invoiceCount": "2",
                    "amount": "200",
                    "o": 499.00,
                    "h": 499.00,
                    "l": 469.00,
                    "c": 469.00
                }, {
                    "x": new Date('21 Oct 2017 00:00 Z').getTime(),
                    "label": "Candor Corp.",
                    "business": "Candor Corp.",
                    "paymentDays": "1",
                    "dueDate": new Date('21 Oct 2017 00:00 Z').getTime(),
                    "probableDate": new Date('22 Oct 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "700",
                    "o": 700.00,
                    "h": 700.00,
                    "l": 730.00,
                    "c": 730.00
                }, {
                    "x": new Date('22 Oct 2017 00:00 Z').getTime(),
                    "label": "Candor Corp.",
                    "business": "Candor Corp.",
                    "paymentDays": "1",
                    "dueDate": new Date('21 Oct 2017 00:00 Z').getTime(),
                    "probableDate": new Date('22 Oct 2017 00:00 Z').getTime(),
                    "invoiceCount": "1",
                    "amount": "700",
                    "o": 699.00,
                    "h": 699.00,
                    "l": 669.00,
                    "c": 669.00
                }];
                contentScope.ProbableChart.data = JSON.stringify(probableChartData);
                contentScope.ProbableChart.text1 = "DueDate";
                contentScope.ProbableChart.text2 = "Probable Date";
            } catch (err) {
                var errorObj = {
                    "level": "frmProbableCashInflow",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmProbableCashInflow";
            // kony.ui.Alert(errMsg);
        }
    }
});