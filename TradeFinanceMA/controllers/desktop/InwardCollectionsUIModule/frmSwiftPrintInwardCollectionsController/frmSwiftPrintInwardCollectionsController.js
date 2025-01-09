define(['CommonUtilities'], function (CommonUtilities) {
    let pritDataObj;
    let previousForm, pageTitle;
    let presenter;
    return {
        /**
         * @api : onNavigate
         * Will trigger when navigating from other form to this form
         * @return : NA
         */
        onNavigate: function (data) {
            var scope = this;
            try {
                pritDataObj = data.navData;
                scope.view.postShow = scope.postShow;
                scope.view.preShow = scope.preShow;
                previousForm = data.previousFormName;
                pageTitle = data.pageTitle;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
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
                presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'InwardCollectionsUIModule'
                });
                scope.seti18nKeys();
                scope.setCurrentTimeAndDate();
                scope.appendSwiftKeysAndValues();
            } catch (err) {
                var errorObj = {
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
                kony.os.print();
                //timeout is required to allow print popup to be visible.
                setTimeout(function () {
                    scope.afterPrintCallback();
                }, "17ms");
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : afterPrintCallback
         * It will help user to navigate back from print
         * @return : NA
         */
        afterPrintCallback: function () {
            var scope = this;
            try {
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `InwardCollectionsUIModule/${previousForm}`
                }).navigate(pritDataObj);
            } catch (err) {
                var errorObj = {
                    "method": "afterPrintCallback",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setCurrentTimeAndDate
         * Getting current time and date
         * @return : NA
         */
        setCurrentTimeAndDate: function () {
            var scope = this;
            try {
                let currentDateAndTime = new Date();
                scope.view.lblHeaderDate.text = currentDateAndTime.getDate() + " " + Date.replaceChars.longMonths[currentDateAndTime.getMonth()] + " " + currentDateAndTime.getFullYear();
                scope.view.lblHeaderTime.text = currentDateAndTime.getHours() + ":" + currentDateAndTime.getMinutes() + ":" + currentDateAndTime.getSeconds();
            } catch (err) {
                var errorObj = {
                    "method": "setCurrentTimeAndDate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : appendSwiftKeysAndValues
         * Appending swift values and keys dynamically
         * @return : NA
         */
        appendSwiftKeysAndValues: function () {
            var scope = this;
            try {
                let lblCount = 1;
                let swiftTagsWithDbValues = applicationManager.getConfigurationManager().swiftTagsWithDbValues;
                swiftTagsWithDbValues.map((item) => {
                    let existingValue = Object.keys(pritDataObj).indexOf(item.tagNameInDB) > -1;
                    if (existingValue && !presenter.isEmptyNullOrUndefined(pritDataObj[item.tagNameInDB])) {
                        scope.view[`flxRowSequence${lblCount}`].setVisibility(true);
                        scope.view[`lblRowSequence${lblCount}SwiftCode`].text = ":" + item.swiftTag + ":";
                        scope.view[`lblRowSequence${lblCount}SwiftKey`].text = item.tagName;
                        scope.view[`lblRowSequence${lblCount}SwiftValue`].text = pritDataObj[item.tagNameInDB];
                        lblCount++;
                    }
                });
                if (lblCount === 1) {
                    scope.view.flxRowSequence1.setVisibility(true);
                    scope.view.lblRowSequence1SwiftCode.setVisibility(false);
                    scope.view.lblRowSequence1SwiftKey.text = presenter.renderI18nKeys("i18n.common.unavailable");
                    scope.view.lblRowSequence1SwiftValue.setVisibility(false);
                }
            } catch (err) {
                var errorObj = {
                    "method": "appendSwiftKeysAndValues",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : seti18nKeys
         * Setting i18n keys
         * @return : NA
         */
        seti18nKeys: function () {
            var scope = this;
            try {
                scope.view.lblIncomingMessageTagDetails.text = presenter.renderI18nKeys("i18n.TradeFinance.incomingMessageTagDetails", false);
                scope.view.lblReceivedGuaranteeStandbyLC.text = presenter.renderI18nKeys(pageTitle, false);
                scope.view.lblMessageKey.text = presenter.renderI18nKeys("i18n.TradeFinance.messageKey", false);
                scope.view.lblMessageTypeKey.text = presenter.renderI18nKeys("i18n.ExportLC.MessageType", false);
                scope.view.lblReceiverDateAndTimeKey.text = presenter.renderI18nKeys("i18n.TradeFinance.receiverDateandTime", false);
                scope.view.lblSenderKey.text = presenter.renderI18nKeys("i18n.TradeFinance.sender", false);
                scope.view.lblReceiverKey.text = presenter.renderI18nKeys("i18n.TradeFinance.receiver", false);
                scope.view.lblMessage.text = presenter.renderI18nKeys("kony.tab.common.Message", false);
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
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
            errMsg.level = "frmSwiftPrintInwardCollections";
            // kony.ui.Alert(errMsg);
        }
    };
});