define(['CommonUtilities'], function (CommonUtilities) {
  return {

    /**
     * @api : onNavigate
     * This function is invoked when we navigate to this screen
     * @return : NA
     */
    onNavigate: function (param) {
      var scope = this;
      try {
		this.view.lblDocumentCredit.right = "200dp";
        data = param;
        scope.preShow();
      }
      catch (err) {
        var errorObj =
        {
          "level": "FormController",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : preShow
     * This function is invoked before rendering of UI
     * @return : NA
     */
    preShow: function(){
      var scope = this;
      try {
        for (var i = 1; i <= 30; i++) {
          eval("this.view.lblRow" + i + "SwiftCode").width = "5%";
        }
      }
      catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "preShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
     * @api : postShow
     * This function is invoked after rendering of UI
     * @return : NA
     */
    postShow: function () {
      var scope = this;
      try {
        var ImportLCSwiftData = applicationManager.getConfigurationManager().corporateSwiftTags;
        if (!kony.sdk.isNullOrUndefined(data.swiftWithoutCode)) {
          scope.setDataWithoutCode(true);
        } else {
          scope.setDataWithoutCode(false);
        }
        scope.setViewDetailsData(ImportLCSwiftData, data);
        kony.os.print();
        //timeout is required to allow print popup to be visible.
        setTimeout(function () {
          scope.afterPrintCallback(data);
        }, "17ms");
      }
      catch (err) {
        var errorObj =
        {
          "level": "FormController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : afterPrintCallback
     * This function is responsible for navigation of forms after Print
     * @return : NA
     */
    afterPrintCallback: function (data) {
      try {
        if (data.viewDetails === true) {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDetails"
          }).navigate(data);
        } else {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
          }).navigate();
        }
      }
      catch (err) {
        var errorObj =
        {
          "level": "FormController",
          "method": "afterPrintCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
         * @api : setViewDetailsData
         * This function is responsible for mapping of data in UI
         * @return : NA
         */
    setViewDetailsData: function (ImportLCSwiftData, data) {
      var scope = this;
      try {
        var todayDate = new Date();
        var swiftDetails = [];
        scope.view.lblDate.text = todayDate.getDate() + " " + Date.replaceChars.longMonths[todayDate.getMonth()] + " " + todayDate.getFullYear();
        scope.view.lblTime.text = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
        swiftDetails.push({
          "Code": "sequenceOfTotal",
          "Key": "i18n.TradeFinance.sequenceofTotal",
          "Value": ""
        }, {
          "Code": "paymentTerms",
          "Key": "i18n.TradeFinance.formOfDocumentaryCredit",
          "Value": ""
        }, {
          "Code": "referenceNumber",
          "Key": "i18n.TradeFinance.trasactionReferenceNumber",
          "Value": "lcReferenceNo"
        }, {
          "Code": "issueDate",
          "Key": kony.i18n.getLocalizedString("i18n.StopcheckPayments.DateOfIssue"),
          "Value": "issueDate"
        }, {
          "Code": "applicableRules",
          "Key": "i18n.TradeFinance.applicableRules",
          "Value": ""
        }, {
          "Code": "expiryDate",
          "Key": "i18n.TradeFinance.dateAndPlaceOfExpiry",
          "Value": "expiryDate expiryPlace"
        }, {
          "Code": "applicant",
          "Key": "i18n.ExportLC.Applicant",
          "Value": ""
        }, {
          "Code": "beneficiaryName",
          "Key": "i18n.TransfersEur.Beneficiary",
          "Value": "beneficiaryName beneficiaryAddressLine1 beneficiaryAddressLine2 beneficiaryPostCode beneficiaryState"
        }, {
          "Code": "currencyAmount",
          "Key": kony.i18n.getLocalizedString("i18n.TradeFinance.currencyCode") + "," + kony.i18n.getLocalizedString("kony.mb.common.Amount"),
          "Value": "lcAmount lcCurrency"
        }, {
          "Code": "tolerancePercentage",
          "Key": "i18n.TradeFinance.percentageCreditAmountTolerance",
          "Value": "tolerancePercentage"
        }, {
          "Code": "availableWith",
          "Key": "i18n.TradeFinance.AvailableWith",
          "Value": "availableWith1 availableWith2 availableWith3 availableWith4"
        }, {
          "Code": "draftsAt",
          "Key": "i18n.TradeFinance.draftsAt",
          "Value": ""
        }, {
          "Code": "drawee",
          "Key": "i18n.TradeFinance.drawee",
          "Value": ""
        }, {
          "Code": "partialShipment",
          "Key": "i18n.TradeFinance.partialShipmentKey",
          "Value": "partialShipments"
        }, {
          "Code": "transhipment",
          "Key": "i18n.TradeFinance.transhipmentKey",
          "Value": "transshipment"
        }, {
          "Code": "loadonBoard",
          "Key": kony.i18n.getLocalizedString("i18n.TradeFinance.loadOnBoard") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.dispatch") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.takeCharge"),
          "Value": "placeOfTakingIncharge"
        }, {
          "Code": "portOfLoading",
          "Key": kony.i18n.getLocalizedString("i18n.TradeFinance.portOfLoadingKey") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.airportOf"),
          "Value": "portOfLoading"
        }, {
          "Code": "portOfDischarge",
          "Key": kony.i18n.getLocalizedString("i18n.TradeFinance.portOfDischargeKey") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.airport"),
          "Value": "portOfDischarge"
        }, {
          "Code": "placeOfFinalDelivery",
          "Key": "i18n.TradeFinance.forTransportationTo",
          "Value": ""
        }, {
          "Code": "latestShipmentDate",
          "Key": "i18n.TradeFinance.latestDateOfShipment",
          "Value": "latestShippingDate"
        }, {
          "Code": "incoTerms",
          "Key": "i18n.TradeFinance.shipmentPeriod",
          "Value": ""
        }, {
          "Code": "descriptionOfGoods",
          "Key": "i18n.TradeFinance.descriptionOfGoodsAndOrService",
          "Value": "descriptionOfGoods"
        }, {
          "Code": "documentsRequired",
          "Key": "i18n.TradeFinance.documentsRequiredKey",
          "Value": "documentsRequired"
        }, {
          "Code": "additionalCondition",
          "Key": "i18n.ExportLC.AdditionalConditions",
          "Value": "additionalConditionsCode"
        }, {
          "Code": "detailsofcharges",
          "Key": "i18n.TradeFinance.DetailsOfCharges",
          "Value": "documentCharges"
        }, {
          "Code": "periodforPresentation",
          "Key": "i18n.TradeFinance.periodForPresentationInDays",
          "Value": ""
        }, {
          "Code": "confirmationInstructions",
          "Key": "i18n.TradeFinance.ConfirmationInstructions",
          "Value": "confirmationInstruction"
        }, {
          "Code": "reimbursingBank",
          "Key": "i18n.TradeFinance.reimbursingBank",
          "Value": "documentCharges"
        }, {
          "Code": "instructionsToThePay",
          "Key": "i18n.TradeFinance.instructionsToThePAYAPTNEGBNK",
          "Value": ""
        }, {
          "Code": "senderToReceiverInformation",
          "Key": "i18n.TradeFinance.senderToReceiverInformation",
          "Value": ""
        });
        for (var i = 1; i <= 30; i++) {
          eval("this.view.lblRow" + i + "SwiftCode").text = ":" + ImportLCSwiftData[swiftDetails[i - 1].Code] + ":";
          if ((i !== 9 && i !== 16 && i !== 17 && i !== 18 && i !== 4)) {
            eval("this.view.lblRow" + i + "SwiftKey").text = kony.i18n.getLocalizedString(swiftDetails[i - 1].Key) + " :";
          } else {
            eval("this.view.lblRow" + i + "SwiftKey").text = swiftDetails[i - 1].Key + " :";
          }
          if ((i == 6 || i == 8 || i == 9 || i == 11 || i == 20)) {
            if (i == 6) {
              var expiryDate = data.expiryDate ? data.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA");
              var expiryPlace = data.expiryPlace ? data.expiryPlace : kony.i18n.getLocalizedString("i18n.common.NA");
              scope.view.lblRow6SwiftValue.text = expiryDate + "\n\n" + expiryPlace;
            } else if (i == 9) {
              scope.view.lblRow9SwiftValue.text = data.lcAmount ? data.lcAmount : kony.i18n.getLocalizedString("i18n.common.NA");
            } else if (i == 11) {
              var beneficiaryName = data.beneficiaryName ? data.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA");
              var beneficiaryAddressLine1 = data.beneficiaryAddressLine1 ? data.beneficiaryAddressLine1 : kony.i18n.getLocalizedString("i18n.common.NA");
              var beneficiaryAddressLine2 = data.beneficiaryAddressLine2 ? data.beneficiaryAddressLine2 : kony.i18n.getLocalizedString("i18n.common.NA");
              var beneficiaryPostCode = data.beneficiaryPostCode ? data.beneficiaryPostCode : kony.i18n.getLocalizedString("i18n.common.NA");
              var beneficiaryState = data.beneficiaryState ? data.beneficiaryState : kony.i18n.getLocalizedString("i18n.common.NA");
              scope.view.lblRow11SwiftValue.text = beneficiaryName + "\n\n" + beneficiaryAddressLine1 + "\n\n" + beneficiaryAddressLine2 + "\n\n" + beneficiaryState + "\n\n" + beneficiaryPostCode;
            } else if (i == 8) {
              var availableWith1 = data.availableWith1 ? data.availableWith1 : kony.i18n.getLocalizedString("i18n.common.NA");
              var availableWith2 = data.availableWith2 ? data.availableWith2 : kony.i18n.getLocalizedString("i18n.common.NA");
              var availableWith3 = data.availableWith3 ? data.availableWith3 : kony.i18n.getLocalizedString("i18n.common.NA");
              var availableWith4 = data.availableWith4 ? data.availableWith4 : kony.i18n.getLocalizedString("i18n.common.NA");
              scope.view.lblRow8SwiftValue.text = availableWith1 + "\n\n" + availableWith2 + "\n\n" + availableWith3 + "\n\n" + availableWith4;
            } else if (i == 20) {
              scope.view.lblRow20SwiftValue.text = data.latestShippingDate ? CommonUtilities.getFrontendDateStringInUTC(data.latestShippingDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) : kony.i18n.getLocalizedString("i18n.common.NA");
            }
          } else {
            eval("this.view.lblRow" + i + "SwiftValue").text = data[swiftDetails[i - 1].Value] ? data[swiftDetails[i - 1].Value] : kony.i18n.getLocalizedString("i18n.common.NA");
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setViewDetailsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDataWithoutCode
     * This function is responsible for setting data without swift code
     * @return : NA
     */
    setDataWithoutCode: function (value) {
      var scope = this;
      try {
        for (var i = 1; i <= 30; i++) {
          eval("this.view.lblRow" + i + "SwiftCode").setVisibility(!value);
          if (value)
            eval("this.view.lblRow" + i + "SwiftKey").left = "5dp";
          else
            eval("this.view.lblRow" + i + "SwiftKey").left = "0dp";
        }
      }
      catch (err) {
        var errorObj =
        {
          "level": "FormController",
          "method": "setDataWithoutCode",
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
      var error = err;
    },
  }
});