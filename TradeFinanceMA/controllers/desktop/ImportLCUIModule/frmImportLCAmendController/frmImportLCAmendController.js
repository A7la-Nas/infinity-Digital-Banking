define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let parameters;
  let amountSelected = false;
  return {
    
    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function(data, isBackFlow) {
      var scope = this;
      parameters = data;
      this.view.preShow = this.preShow(data);
      this.view.postShow = this.postShow;
      if (!kony.sdk.isNullOrUndefined(data.isBackFlow) && data.isBackFlow) {
        scope.prePopulateUI(data);
      }
      FormControllerUtility.hideProgressBar(this.view);
    },
    
    /**
     * @api : preShow
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function(data) {
      var scope = this;
      scope.view.customheadernew.forceCloseHamburger();
      scope.view.customheadernew.activateMenu("TradeFinance", "Imports");
      var currencysymbol = scope.getCurrencySymbol(data.lcCurrency);
      data.currencySymbol = currencysymbol;
      scope.setDefaultUI(data);
      scope.setUIData(data);
      scope.handleOnClicks(data);
      scope.setAccountsDropdown();
      scope.setStaticData();
      scope.view.onBreakpointChange = function() {
        scope.onBreakpointChange();
      };
    },
    
    /**
     * @api : postShow
     * This function for executing the primary functions after rendering UI
     * @return : NA
     */
    postShow: function() {
      var scope = this;
      var breakpoint = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      if (kony.application.getCurrentBreakpoint() < 640 || orientationHandler.isMobile) {
        this.view.flxFooter.centerx = "35%";
      }
      this.view.flxMainContainer.doLayout = this.view.customfooternew.setMinHeight.bind(this, this.view.flxMain);
      this.view.flxMainContainer.doLayout();
      scope.view.flxActionButtons.zIndex = -1;
    },
    
    /**
     * @api : onBreakpointChange
     * This function to handle breakpoint changes
     * @return : NA
     */
    onBreakpointChange: function() {
      this.view.flxMainContainer.doLayout = this.view.customfooternew.setMinHeight.bind(this, this.view.flxMain);
      this.view.flxMainContainer.doLayout();
      this.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
      this.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
    },
    
    /**
     * @api : handleOnClicks
     * This function to handle all onClick events.
     * @return : NA
     */
    handleOnClicks: function(data) {
      this.view.btnCancel.onClick = this.navigateToDashboard.bind(this, data);
      this.view.btnContinue.onClick = this.navigateToReviewScreen.bind(this, data);
      this.view.flxCheckBoxExpiryDate.onClick = this.handleCheckBoxClick.bind(this, "expiry", false, false);
      this.view.flxCheckBoxShipmentDate.onClick = this.handleCheckBoxClick.bind(this, "shipment", false, false);
      this.view.flxCheckBoxPeriodOfPresentation.onClick = this.handleCheckBoxClick.bind(this, "pop", false, false);
      this.view.flxCheckBoxLCAmount.onClick = this.handleCheckBoxClick.bind(this, "amount", false, false);
      this.view.flxCheckBoxOtherAmendments.onClick = this.handleCheckBoxClick.bind(this, "other", false, false);
      this.view.flxIncrementRadio.onClick = this.handleRadioClick.bind(this, "increment");
      this.view.flxDecrementRadio.onClick = this.handleRadioClick.bind(this, "decrement");
      this.view.flxBeneficiaryRadio.onClick = this.handleRadioClick.bind(this, "Beneficiary");
      this.view.flxApplicantRadio.onClick = this.handleRadioClick.bind(this, "Applicant");
      this.view.flxAccountsDropDown.onClick = this.showOrHideAccounts.bind(this, data);
      this.view.expiryDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.expiryDate.tbxDateInputKA, "expiry", true, this.view.lblExpiryError);
      this.view.shipmentDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.shipmentDate.tbxDateInputKA, "shipment", true, this.view.lblShipmentError);
      this.view.tbxPeriodOfPresentation.onTextChange = this.handleCheckBoxClick.bind(this, "pop", false, true);
      this.view.txtOtherText.onTextChange = this.handleCheckBoxClick.bind(this, "other", false, true);
      this.view.expiryDate.textChangeCallback = this.checkDate.bind(this, this.view.expiryDate.tbxDateInputKA, "expiry", true, this.view.lblExpiryError);
      this.view.shipmentDate.textChangeCallback = this.checkDate.bind(this, this.view.shipmentDate.tbxDateInputKA, "shipment", true, this.view.lblShipmentError);
      this.view.tbxAmount.onEndEditing = this.validateAmountOnDone.bind(this, data);
    },

    /**
     * @api : validateAmountOnDone
     * This function calls the validate amount method
     * amountSelected is set to true to identify that there is some value in the textbox
     * @return : NA
     */
    validateAmountOnDone: function(data) {
      amountSelected = true;
      this.validateAmount(data);
    },
    
    /**
     * @api : checkdate
     * vchecking whether the entered date is valid or not
     * @return : NA */
    checkDate: function(widgetName, val, handleCheckBox, errLabel) {
      if (val === "expiry") {
        this.view.expiryDate.lblDatePlaceholderKA.isVisible = true;
      } else {
        this.view.shipmentDate.lblDatePlaceholderKA.isVisible = true;
      }
      if (handleCheckBox) {
        this.handleCheckBoxClick(val, false, true);
      }
      var dateArr = widgetName.text.split("/");
      var todayDate = this.getTodayDate();
      var month = parseInt(dateArr[0]);
      if (month > 12 || month < 1) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.enableOrDisableContinue();
        return;
      }
      var date = parseInt(dateArr[1]);
      if (date > 31 || date < 1) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.enableOrDisableContinue();
        return;
      }
      if (Date.parse(widgetName.text) < Date.parse(todayDate)) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        return;
      }
      errLabel.isVisible = false;
      widgetName.skin = "skntbxSSP42424215pxnoborder";
      this.enableOrDisableContinue();
    },
    
    /**
     * @api : getTodayDate
     * To get today date
     * @return : NA
     */
    getTodayDate: function() {
      var scope = this;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      return today;
    },
    
    /**
     * @api : setUIData
     * This function to set the LC data.
     * @return : NA
     */
    setUIData: function(data) {
      this.view.lblCurrencySymbol.text = data.currencySymbol;
      this.view.lblLCSummaryValue1.text = data.beneficiaryName;
      this.view.lblLCSummaryValue2.text = data.lcReferenceNo;
      this.view.lblLCSummaryValue3.text = data.lcAmount //applicationManager.getFormatUtilManager().appendCurrencySymbol(applicationManager.getFormatUtilManager().deFormatAmount(data.lcAmount),data.lcCurrency);  
      this.view.lblLCSummaryValue4.text = data.issueDate;
      this.view.lblLCSummaryValue5.text = data.expiryDate;
      this.view.lblLCSummaryValue6.text = data.paymentTerms;
    },
    
    /**
     * @api : setStaticData
     * This function to setting i18n keys for static data
     * @return : NA
     */
    setStaticData: function() {
      var scope = this;
      try {
        scope.view.lblImportLCAmend.text = kony.i18n.getLocalizedString("i18n.ImportLC.ImportLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.AmendImportLC");
        scope.view.lblImportLCSummaryHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ImportLCSummary");
        scope.view.lblLCSummary1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryWithColon");
        scope.view.lblLCSummary2.text = kony.i18n.getLocalizedString("i18n.serviceRequests.ReferenceNumber");
        scope.view.lblLCSummary3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreditAmount") + ":";
        scope.view.lblLCSummary4.text = kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon");
        scope.view.lblLCSummary5.text = kony.i18n.getLocalizedString("i18n.Wealth.expiryDate");
        scope.view.lblLCSummary6.text = kony.i18n.getLocalizedString("i18n.TradeFinance.paymentTermsWithColon");
        scope.view.lblAmendmentDetailsHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelectProvideAmendmentDetails");
        scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate");
        scope.view.lblShipmentDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate");
        scope.view.lblPeriodOfPresentation.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PeriodOfPresentation");
        scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount");
        scope.view.lblIncreaseAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IncreaseAmount");
        scope.view.lblDecreaseAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DecreaseAmount");
        scope.view.lblCurrency.text = kony.i18n.getLocalizedString("i18n.common.Currency");
        scope.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount");
        scope.view.lblOtherAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendments");
        scope.view.lblAmendmentChargersHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges");
        scope.view.lblSelectPayee.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendPaymentCharges");
        scope.view.lblBeneficiaryValue.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary");
        scope.view.lblApplicantValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantMe");
        scope.view.lblDebitAccountTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendDebitCharges");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setStaticData",
          "error": err
        };
      }
    },
    
    /**
     * @api : getCurrencySymbol
     * This function is for converting currency code to corresponding symbol
     * @return : NA
     */
    getCurrencySymbol: function(currencycode) {
      var scope = this;
      try {
        return new FormatUtil().getCurrencySymbol(currencycode);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "getCurrencySymbol",
          "error": err
        };
      }
    },
    
    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function(data) {
      this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.view.imgIncrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
      this.view.imgDecrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
      this.view.imgBeneficiaryRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
      this.view.imgAppplicantRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
      this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      this.view.lblAccountsDropDown.skin = ViewConstants.SKINS.BULKPAYMENTS_DROP_DOWN_SKIN;
      this.view.lblAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      this.view.lblSelectedAccount.text = kony.i18n.getLocalizedString("i18n.common.selecthere");
      this.view.lblSelectedAccount.skin = "bbSknLbl727272SSP15Px";
      this.view.tbxAmount.setEnabled(false);
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "ICSknbtnDisablede2e9f036px";
      this.view.expiryDate.tbxDateInputKA.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.shipmentDate.tbxDateInputKA.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.tbxAmount.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.view.tbxPeriodOfPresentation.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
      this.handleCheckBoxClick("expiry", true, false);
	  this.handleCheckBoxClick("shipment", true, false);
	  this.view.tbxAmount.skin = "sknTxtSSP15pxBorder727272Op201px";
      this.view.expiryDate.setText("");
      this.view.shipmentDate.setText("");
      this.view.tbxPeriodOfPresentation.text = "";
      this.view.tbxAmount.text = "";
      this.view.txtOtherText.text = "";
      this.view.flxDebitAccount.setVisibility(false);
      this.view.flxSegDebitedFromDropdown.setVisibility(false);
      this.view.lblAmountError.setVisibility(false);
      this.view.lblShipmentError.setVisibility(false);
      this.view.lblExpiryError.setVisibility(false);
    },
    
    /*  Method : setAccountsDropdown 
     *  Method to set data in account list dropdown 
     *  return : NA
     */
    setAccountsDropdown: function() {
      var scope = this;
      try {
        var segmentData = [];
        var accountList = applicationManager.getConfigurationManager().userAccounts;
        for (let i = 0; i < accountList.length; i++) {
          accountList[i].formattedName = CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
        }
        scope.view.segDebitedFromDropdown.widgetDataMap = {
          "lblListValue": "value",
          "selectedKey": "key",
          "flxDropdownValue": "flxDropdownValue"
        };
        for (var key in accountList) {
          segmentData.push({
            "key": accountList[key].accountID,
            "value": accountList[key].formattedName
          });
        }
        scope.view.segDebitedFromDropdown.setData(segmentData);
        scope.view.segDebitedFromDropdown.onRowClick = this.accountsRowOnClick;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setAccountsDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /*  Method : accountsRowOnClick 
     *  set data from accounts dropdown to label
     *  return : NA
     */
    accountsRowOnClick: function() {
      var scope = this;
      var data = scope.view.segDebitedFromDropdown.data;
      var index = scope.view.segDebitedFromDropdown.selectedRowIndex;
      scope.view.lblSelectedAccount.text = data[index[1]].value;
      scope.view.lblSelectedAccount.skin = "bbSknLbl424242SSP15Px";
      scope.showOrHideAccounts();
      scope.enableOrDisableContinue();
    },
    
    /**
     * @api : prePopulateUI
     * This function to handle all the data setting when navigated back from review screen.
     * @return : NA
     */
    prePopulateUI: function(data) {
      var scope = this;
      this.setUIData(data);
      if (data.amendmentExpiryDate !== "") {
        this.view.expiryDate.setText("");
        this.view.expiryDate.lblDatePlaceholderKA.isVisible = false;
      }
      this.view.expiryDate.tbxDateInputKA.text = data.amendmentExpiryDate;
      if (data.latestShippingDate !== "") {
        this.view.shipmentDate.setText("");
        this.view.shipmentDate.lblDatePlaceholderKA.isVisible = false;
      }
      this.view.shipmentDate.tbxDateInputKA.text = data.latestShippingDate;
      this.view.tbxPeriodOfPresentation.text = data.presentationPeriod;
      this.view.txtOtherText.text = data.otherAmendments;
      this.view.tbxAmount.text = data.newLcAmount;
      if (data.amendmentExpiryDate !== "") scope.handleCheckBoxClick("expiry", false, false);
      if (data.latestShippingDate !== "") scope.handleCheckBoxClick("shipment", false, false);
      if (data.presentationPeriod !== "") scope.handleCheckBoxClick("pop", false, false);
      if (this.view.txtOtherText.text !== "") {
        scope.handleCheckBoxClick("other", false, false);
      }
      if (this.view.txtOtherText.text === "") {
        scope.handleCheckBoxClick("other", true, false);
      }
      if (data.amountType === "increase") {
        scope.handleRadioClick("increment");
      }
      if (data.amountType === "decrease") {
        scope.handleRadioClick("decrement");
      }
      if (data.amendCharges === "Applicant") {
        scope.handleRadioClick("Applicant");
        this.view.lblSelectedAccount.text = data.accountSelected;
      }
      if (data.amendCharges === "Beneficiary") {
        scope.handleRadioClick("Beneficiary");
      }
      this.view.expiryDate.lblDatePlaceholderKA.text = "";
      this.view.shipmentDate.lblDatePlaceholderKA.text = "";
      this.enableOrDisableContinue();
    },
    
    /**
     * @api : handleRadioClick
     * This function to handle all radio button click events.
     * @return : NA
     */
    handleRadioClick: function(param) {
      switch (param) {
        case "increment": {
          this.view.imgIncrementRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.imgDecrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
          this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
          this.view.tbxAmount.setEnabled(true);
          this.view.tbxAmount.skin = 'sknTxtSSP15pxBorder727272Op201px';
          this.validateAmount(parameters);
          //this.enableOrDisableContinue();
          break;
        }
        case "decrement": {
          this.view.imgDecrementRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.imgIncrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
          this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
          this.view.tbxAmount.setEnabled(true);
          this.view.tbxAmount.skin = 'sknTxtSSP15pxBorder727272Op201px';
          this.validateAmount(parameters);
          //this.enableOrDisableContinue();
          break;
        }
        case "Beneficiary": {
          this.view.imgBeneficiaryRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.imgAppplicantRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.flxDebitAccount.setVisibility(false);
          this.enableOrDisableContinue();
          break;
        }
        case "Applicant": {
          this.view.imgAppplicantRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.imgBeneficiaryRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.flxDebitAccount.setVisibility(true);
          this.enableOrDisableContinue();
          break;
        }
        default: {
          break;
        }
      }
    },
    
    /**
     * @api : handleCheckBoxClick
     * This function to handle all checkbox click events.
     * @return : NA
     */
    handleCheckBoxClick: function(param, clearText, editText) {
      if (param === "expiry") {
        if (!kony.sdk.isNullOrUndefined(clearText) && clearText) {
          this.view.expiryDate.setText("");
          this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
          this.checkDate(this.view.expiryDate.tbxDateInputKA, "expiry", false, this.view.lblExpiryError);
        } else if (!kony.sdk.isNullOrUndefined(editText) && editText) {
          if (this.view.expiryDate.tbxDateInputKA.text === "") {
            this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.expiryDate.setText("");
            this.checkDate(this.view.expiryDate.tbxDateInputKA, "expiry", false, this.view.lblExpiryError);
          } else {
            this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          }
        } else {
          if (this.view.lblCheckBoxExpiryDate.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxExpiryDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxExpiryDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.expiryDate.setText("");
            this.checkDate(this.view.expiryDate.tbxDateInputKA, "expiry", false, this.view.lblExpiryError);
          }
        }
      } else if (param === "shipment") {
        if (!kony.sdk.isNullOrUndefined(clearText) && clearText) {
          this.view.shipmentDate.tbxDateInputKA.text = "";
          this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
          this.view.shipmentDate.setText("");
          this.checkDate(this.view.shipmentDate.tbxDateInputKA, "shipment", false, this.view.lblShipmentError);
        } else if (!kony.sdk.isNullOrUndefined(editText) && editText) {
          if (this.view.shipmentDate.tbxDateInputKA.text === "") {
            this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.shipmentDate.setText("");
            this.checkDate(this.view.shipmentDate.tbxDateInputKA, "shipment", false, this.view.lblShipmentError);
          } else {
            this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          }
        } else {
          if (this.view.lblCheckBoxShipmentDate.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxShipmentDate.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxShipmentDate.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.shipmentDate.setText("");
            this.checkDate(this.view.shipmentDate.tbxDateInputKA, "shipment", false, this.view.lblShipmentError);
          }
        }
      } else if (param === "pop") {
        if (!kony.sdk.isNullOrUndefined(clearText) && clearText) {
          this.view.tbxPeriodOfPresentation.text = "";
          this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
          this.enableOrDisableContinue();
        } else if (!kony.sdk.isNullOrUndefined(editText) && editText) {
          if (this.view.tbxPeriodOfPresentation.text === "") {
            this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.tbxPeriodOfPresentation.text = "";
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          }
        } else {
          if (this.view.lblCheckBoxPeriodOfPresentation.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxPeriodOfPresentation.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxPeriodOfPresentation.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.tbxPeriodOfPresentation.text = "";
            this.enableOrDisableContinue();
          }
        }
      } else if (param === "amount") {
        if (!kony.sdk.isNullOrUndefined(clearText) && clearText) {
          this.view.tbxAmount.text = "";
          this.view.tbxAmount.setEnabled(false);
          this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
          this.view.imgIncrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.imgDecrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.tbxAmount.skin = 'sknTxtSSP15pxBorder727272Op201px';
          this.view.lblAmountError.setVisibility(false);
          amountSelected = false;
          this.enableOrDisableContinue();
        } else {
          if (this.view.lblCheckBoxLCAmount.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxLCAmount.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxLCAmount.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.imgIncrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
            this.view.imgDecrementRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
            this.view.tbxAmount.text = "";
            amountSelected = false;
            this.view.tbxAmount.skin = 'sknTxtSSP15pxBorder727272Op201px';
            this.view.lblAmountError.setVisibility(false);
            this.enableOrDisableContinue();
          }
        }
      } else if (param === "other") {
        if (!kony.sdk.isNullOrUndefined(clearText) && clearText) {
          this.view.txtOtherText.text = "";
          this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
          this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
          this.enableOrDisableContinue();
        } else if (!kony.sdk.isNullOrUndefined(editText) && editText) {
          if (this.view.txtOtherText.text === "") {
            this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.txtOtherText.text = "";
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          }
        } else {
          if (this.view.lblCheckBoxOtherAmendments.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
            this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            this.enableOrDisableContinue();
          } else {
            this.view.lblCheckBoxOtherAmendments.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.lblCheckBoxOtherAmendments.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            this.view.txtOtherText.text = "";
            this.enableOrDisableContinue();
          }
        }
      }
    },
    
    /**
     * @api : showOrHideAccounts
     * This function to handle the visibitlity of accounts dropdown.
     * @return : NA
     */
    showOrHideAccounts: function(data) {
      if (this.view.lblAccountsDropDown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
        this.view.lblAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
        this.view.flxSegDebitedFromDropdown.setVisibility(false);
      } else {
        this.view.lblAccountsDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
        this.view.flxSegDebitedFromDropdown.setVisibility(true);
      }
    },
    
    /**
     * @api : enableOrDisableContinue
     * This function to enable the continue button after all validations and checks.
     * @return : NA
     */
    enableOrDisableContinue: function() {
      if (this.returnExpiryDateStatus() && this.returnShipmentDateStatus() && this.returnPopStatus() && this.returnAmountTextstatus() && this.returnOtherTextStatus() && this.checkMandatoryConditions()) {
        if (this.view.imgBeneficiaryRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE || (this.view.imgAppplicantRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE && this.view.lblSelectedAccount.text !== "")) {
          this.view.btnContinue.setEnabled(true);
          this.view.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
        } else {
          this.view.btnContinue.setEnabled(false);
          this.view.btnContinue.skin = "ICSknbtnDisablede2e9f036px";
        }
      } else {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "ICSknbtnDisablede2e9f036px";
      }
    },
    
    /**
     * @api : checkMandatoryConditions
     * This function to enable the continue button if Mandatory fields are checked.
     * @return : true if atleast onecheckbox is selected
     */
    checkMandatoryConditions: function() {
      if (this.view.lblCheckBoxExpiryDate.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED || 
          this.view.lblCheckBoxShipmentDate.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED || 
          this.view.lblCheckBoxPeriodOfPresentation.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED || 
          this.view.lblCheckBoxLCAmount.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED || 
          this.view.lblCheckBoxOtherAmendments.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
        return true;
      }
      return false;
    },
    
    /**
     * @api : returnExpiryDateStatus
     * This function to validate expiryDate Field
     * @return : returns true if expiry date field is valid 
     */
    returnExpiryDateStatus: function() {
      if ((this.view.lblCheckBoxExpiryDate.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && this.view.expiryDate.tbxDateInputKA.text !== "" && this.view.expiryDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005") || 
          (this.view.lblCheckBoxExpiryDate.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED && this.view.expiryDate.tbxDateInputKA.text === "" && this.view.expiryDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005")) {
        return true;
      } else {
        return false;
      }
    },
    
    /**
     * @api : returnShipmentDateStatus
     * This function to validate shipmentDate Field
     * @return : returns true if shipment date field is valid 
     */
    returnShipmentDateStatus: function() {
      if ((this.view.lblCheckBoxShipmentDate.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && this.view.shipmentDate.tbxDateInputKA.text !== "" && this.view.shipmentDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005") || 
          (this.view.lblCheckBoxShipmentDate.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED && this.view.shipmentDate.tbxDateInputKA.text === "" && this.view.shipmentDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005")) {
        return true;
      } else {
        return false;
      }
    },
    
    /**
     * @api : returnPopStatus
     * This function to validate pop field
     * @return : returns true if pop field is valid 
     */
    returnPopStatus: function() {
      if ((this.view.lblCheckBoxPeriodOfPresentation.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && this.view.tbxPeriodOfPresentation.text !== "") || 
          (this.view.lblCheckBoxPeriodOfPresentation.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED && this.view.tbxPeriodOfPresentation.text === "")) {
        return true;
      } else {
        return false;
      }
    },
    
    /**
     * @api : returnAmountTextstatus
     * This function to validate amount field
     * @return : returns true if amount field is valid
     */
    returnAmountTextstatus: function() {
      if ((this.view.tbxAmount.text !== "" && this.view.tbxAmount.skin !== "ICSknTextBoxEE0005" && this.view.lblCheckBoxLCAmount.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) || 
          (this.view.tbxAmount.text === "" && this.view.tbxAmount.skin !== "ICSknTextBoxEE0005" && this.view.lblCheckBoxLCAmount.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED)) {
        return true;
      } else {
        return false;
      }
    },
    
    /**
     * @api : returnOtherTextStatus
     * This function to validate OtherText field
     * @return : returns true if OtherText field is valid.
     */
    returnOtherTextStatus: function() {
      if ((this.view.lblCheckBoxOtherAmendments.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && this.view.txtOtherText.text !== "") || 
          (this.view.lblCheckBoxOtherAmendments.text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED && this.view.txtOtherText.text === "")) {
        return true;
      } else {
        return false;
      }
    },
    
    /**
     * @api : validateAmount
     * This function to validate amount field
     * @return : NA
     */
    validateAmount: function(data) {
      var scope = this;
      var amountWithoutSymbol = data.lcAmount.slice(1);
      var deFormattedAmount = new FormatUtil().deFormatAmount(amountWithoutSymbol);
      if (this.view.imgIncrementRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        if (Number(this.view.tbxAmount.text) > Number(deFormattedAmount)) {
          this.view.lblAmountError.setVisibility(false);
          this.view.tbxAmount.skin = "sknTxtSSP15pxBorder727272Op201px";
        } else if (amountSelected) {
          this.view.lblAmountError.setVisibility(true);
          this.view.tbxAmount.skin = "ICSknTextBoxEE0005";
        }
        scope.enableOrDisableContinue();
      } else if (this.view.imgDecrementRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        if ((Number(this.view.tbxAmount.text) < Number(deFormattedAmount)) && Number(this.view.tbxAmount.text) > 0) {
          this.view.lblAmountError.setVisibility(false);
          this.view.tbxAmount.skin = "sknTxtSSP15pxBorder727272Op201px";
        } else if (amountSelected) {
          this.view.lblAmountError.setVisibility(true);
          this.view.tbxAmount.skin = "ICSknTextBoxEE0005";
        }
        scope.enableOrDisableContinue();
      } else {
        this.view.lblAmountError.setVisibility(false);
        this.view.tbxAmount.skin = "sknTxtSSP15pxBorder727272Op201px";
        scope.enableOrDisableContinue();
      }
    },
    
    /**
     * @api : showError
     * This function to handle all error scenarios.
     * @return : NA
     */
    showError: function() {},
    
    /**
     * @api : setFinalData
     * This function to set the data to send to the review screen.
     * @return : NA
     */
    setFinalData: function(data) {
      var scope = this;
      var fin = data;
      if (this.view.imgAppplicantRadio.src == ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        var accountKey = scope.getAccountKey(data);
      }
      fin.amendmentExpiryDate = this.view.expiryDate.tbxDateInputKA.text;
      fin.chargesAccount = (this.view.imgAppplicantRadio.src == ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) ? accountKey : data.chargesAccount;
      fin.amountType = "";
      fin.chargesPaid = "";
      if(scope.view.tbxAmount.text === ""){
        fin.newLcAmount = scope.view.tbxAmount.text;
      }else{
        fin.newLcAmount = new FormatUtil().formatAmountAndAddCurrencySymbol(scope.view.tbxAmount.text, data.lcCurrency);
      }
      fin.latestShippingDate = this.view.shipmentDate.tbxDateInputKA.text;
      fin.presentationPeriod = this.view.tbxPeriodOfPresentation.text;
      if (this.view.imgIncrementRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        fin.amountType = "increase";
      }
      if (this.view.imgDecrementRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        fin.amountType = "decrease";
      }
      fin.otherAmendments = this.view.txtOtherText.text;
      fin.accountSelected = this.view.lblSelectedAccount.text;
      if (this.view.imgAppplicantRadio.src == ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        fin.segIndex = scope.view.segDebitedFromDropdown.selectedRowIndex;
      }
      fin.amendCharges = (this.view.imgBeneficiaryRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) ? "Beneficiary" : "Applicant";
      return fin;
    },
    
    /**
     * @api : getAccountKey
     * This function to get the selected account key.
     * @return : NA
     */
    getAccountKey: function(params) {
      var scope = this;
      var data = scope.view.segDebitedFromDropdown.data;
      if (params.isBackFlow && params.amendCharges === "Applicant") {
        var index = params.segIndex;
      } else {
        var index = scope.view.segDebitedFromDropdown.selectedRowIndex;
      }
      return data[index[1]].key;
    },
    
    /**
     * @api : navigateToDashboard
     * This function navigates to the ImportLC Dashboard.
     * @return : NA
     */
    navigateToDashboard: function(data) {
      FormControllerUtility.showProgressBar(this.view);
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
      }).navigate(data);
    },
    
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function(err) {
      var error = err;
    },
    
    /**
     * @api : navigateToReviewScreen
     * This function navigates to the Review Screen.
     * @return : NA
     */
    navigateToReviewScreen: function(data) {
      var finalData = this.setFinalData(data);
      finalData.isReviewScreen = true;
      FormControllerUtility.showProgressBar(this.view);
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": "ImportLCUIModule/frmImportLCAmendReviewAndAcknowledgement"
      }).navigate(finalData);
    }
  };
});