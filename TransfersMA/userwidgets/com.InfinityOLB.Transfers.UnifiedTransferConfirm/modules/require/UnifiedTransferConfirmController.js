define(['./UnifiedTransferConfirmBusinessController', './UnifiedTransferConfirmStore','CommonUtilities'], function (BusinessController, UnifiedTransferConfirmStore, CommonUtilities) {
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakpoints = {};
      this._contListServiceParameters = {};
      this._contListDataMapping = {};
      this._contListDataFormatting = {};
      this._contListBreakpoints = {};
      this._ROContListServiceParameters = {};
      this._ROContListDataMapping = {};
      this._ROContListDataFormatting = {};
      this._ROContListBreakpoints = {};
      this.businessController = new BusinessController();
      this.store = UnifiedTransferConfirmStore;
      this.businessController.store = this.store;
      this.collectionObj = UnifiedTransferConfirmStore.getState();

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
      defineGetter(this, 'contListServiceParameters', () => {
        return this._contListServiceParameters;
      });
      defineSetter(this, 'contListServiceParameters', value => {
        this._contListServiceParameters = value;
      });
      defineGetter(this, 'contListDataMapping', () => {
        return this._contListDataMapping;
      });
      defineSetter(this, 'contListDataMapping', value => {
        this._contListDataMapping = value;
      });
      defineGetter(this, 'contListDataFormatting', () => {
        return this._contListDataFormatting;
      });
      defineSetter(this, 'contListDataFormatting', value => {
        this._contListDataFormatting = value;
      });
      defineGetter(this, 'contListBreakpoints', () => {
        return this._contListBreakpoints;
      });
      defineSetter(this, 'contListBreakpoints', value => {
        this._contListBreakpoints = value;
      });
      defineGetter(this, 'ROContListServiceParameters', () => {
        return this._ROContListServiceParameters;
      });
      defineSetter(this, 'ROContListServiceParameters', value => {
        this._ROContListServiceParameters = value;
      });
      defineGetter(this, 'ROContListDataMapping', () => {
        return this._ROContListDataMapping;
      });
      defineSetter(this, 'ROContListDataMapping', value => {
        this._ROContListDataMapping = value;
      });
      defineGetter(this, 'ROContListDataFormatting', () => {
        return this._ROContListDataFormatting;
      });
      defineSetter(this, 'ROContListDataFormatting', value => {
        this._ROContListDataFormatting = value;
      });
      defineGetter(this, 'ROContListBreakpoints', () => {
        return this._ROContListBreakpoints;
      });
      defineSetter(this, 'ROContListBreakpoints', value => {
        this._ROContListBreakpoints = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
    },

    /**
    * @api : preShow
     * Gets invoked initially before rendering of UI
    * @return : NA
    */
    preShow: function () {
      var scope = this;
	  this.view.btnAction3.toolTip = "";
      this.view.btnAction2.toolTip = "";
      this.view.btnAction1.toolTip = "";
      try {
        this.initActionsOfButtons();
        this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.dataMapping, this.breakpoints);
        this.businessController.setDataInCollection(this.context);
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : postShow
    * Gets invoked initially after rendering of UI
    * @return : NA
    */
    postShow: function () {
      var scope = this;
      try {
        scope.view.lblKeyDocumentName.text = kony.i18n.getLocalizedString("i18n.TransfersEur.SupportingDocuments") + ":";
        scope.view.btnAction3.accessibilityConfig = {
          a11yLabel: "Confirm money transfer details"
        };
        scope.view.btnAction2.accessibilityConfig = {
          a11yLabel: "Modify money transfer details"
        };
        scope.view.btnAction1.accessibilityConfig = {
          a11yLabel: "Cancel money transfer"
        };
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function (context) {
      var scope = this;
      try {
        this.unsubscribe = UnifiedTransferConfirmStore.subscribe(this.render.bind(this));
        this.context = context;
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "setContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onBreakPointChange
    * Gets invoked on change of breakpoint in UI
    * @return : NA
    */
    onBreakPointChange: function () {
      var scope = this;
      try {
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "onBreakPointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : unsubscribeStore
     * Method to unsubscribe the store's listener
     * @return : NA
     */
    unsubscribeStore: function () {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    },

    /**
    * @api : setAcknowledgement
    * This method will be invoked when navigating to acknowledgement screen
    * @return : NA
    */
    setAcknowledgement: function () {
      var scope = this;
      scope.buttonConfirmOnClick(scope.collectionObj);
    },
    /**
    * @api : render
    * This method will be invoked when collection is updated to refresh UI
    * @return : NA
    */
    render: function () {
      var scope = this;
      this.collectionObj = UnifiedTransferConfirmStore.getState();
        if (!scope.isEmptyNullOrUndefined(scope.collectionObj.Collection["ErrorDetails"])) {
          var form = kony.application.getCurrentForm();
          scope.buttonModifyOnClick(scope.collectionObj);
          scope.businessController.resetCollection("ErrorDetails");
        }
      if (!scope.isEmptyNullOrUndefined(this.collectionObj.Collection)) {
        scope.setUIData();
      }
      if (!scope.isEmptyNullOrUndefined(this.collectionObj.Collection["Transaction"])) {
        if (this.collectionObj.Collection["Transaction"]["createSuccess"] === "true") {
          scope.setAcknowledgement();
        } else if (this.collectionObj.Collection["Transaction"]["createSuccess"] === "false") {
          scope.buttonModifyOnClick(scope.collectionObj);
        } else if (this.collectionObj.Collection["Transaction"]["MFAAttributes"]) {
          scope.confirmTransferMFA(scope.collectionObj.Collection["Transaction"])
        }
      }
    },
    /**
    * @api : setUIData
    * This method will be invoked to refresh UI
    * @return : NA
    */
    setUIData: function () {
      for (var i = 1; i <= 28; i++) {
        this.view["lblKey" + i].text = this.businessController.getDataBasedOnDataMapping("lblKey" + i);
        if (this.view["lblKey" + i].text.charAt(this.view["lblKey" + i].text.length - 1) !== ":") {
          this.view["lblKey" + i].text = this.view["lblKey" + i].text + ":";
        }
        this.view["lblValue" + i].text = this.businessController.getDataBasedOnDataMapping("lblValue" + i);
      }
      if(this.context.BankDetails){
        if(this.context.BankDetails.bankNameWithCountryCode) {
          this.view.lblValue5.text = this.context.BankDetails.bankNameWithCountryCode;      
        }
      }
      if (this.context.Transaction.payeeType === "New Payee") {
        this.view.lblValue2.text = this.context.Recipients.payeeName;
        this.view.lblKey10.text =  kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountNumber");
		this.view.lblValue10.text = this.context.Recipients.accountNumber;
      }
      this.showOrHideUIFlex();
      this.populateDocumentsName();
      this.populateChargesBreakdown();
      this.populateAddressDetails();
      this.setFrequencyData();
    },

    /**
     * @api : populateDocumentsName
     * To set the visibility of the flex for supporting documents  based on the input documents
     * @return : NA
     */
    populateDocumentsName: function () {
      var containDocument = false;
      var documentList = this.context.Transaction.attachedFileList;
      // set all files to visibility false.
      for (var val = 1; val <= 5; val++) {
        this.view["flxValueDocName" + val].isVisible = false;
      }
      if (documentList) {
        this.view.flxConfirmSupportingDocs.setVisibility(true);
        for (var i = 0; i < documentList.length; i++) {
          var j = i + 1;
          this.view["lblValueDocName" + j].text = documentList[i][0];
          this.view["icon" + j].src = documentList[i][1];
          containDocument = true;
          this.view["lblValueDocName" + j].isVisible = true;
          this.view["icon" + j].isVisible = true;
          this.view["flxValueDocName" + j].isVisible = true;
        }
      }
      if (containDocument === false) {
        this.view.flxConfirmSupportingDocs.setVisibility(true);
        this.view.flxValueDocName1.setVisibility(true);
        this.view.icon1.setVisibility(false);
        this.view.lblValueDocName1.setVisibility(true);
        this.view.lblValueDocName1.text = kony.i18n.getLocalizedString("i18n.common.none");
      }
    
    },

    /**
     * @api : populateChargesBreakdown
     * To set the visibility of the flex for charges breakdown based on the input charges
     * @return : NA
     */
    populateChargesBreakdown: function () {
      try {
        this.view.flxConfirmChargesBreakdown.setVisibility(true);
        var chargeJSON = this.context.Transaction.formattedCharges;
        if (chargeJSON) {
          for (var i = 0, j = 1; j <= chargeJSON.length / 2; i += 2, j++) {
            var chargeLabel = chargeJSON[i];
            var chargeValue = chargeJSON[i + 1];
            if (chargeValue) {
              this.view["lblCharge" + j].text = chargeLabel;
              this.view["lblChargeValue" + j].text = chargeValue;
              this.view["lblChargeValue" + j].isVisible = true;
              this.view["lblCharge" + j].isVisible = true;
              this.view["flxValueField" + j].isVisible = true;
            }
            else
              this.view["flxValueField" + j].isVisible = false;
          }
        } else
          this.view.flxConfirmChargesBreakdown.setVisibility(false);

      } catch (err) {
        var errorObj =
        {
          "errorInfo": "Error in Charges breakdown method of the component",
          "errorLevel": "Business",
          "error": err
        };
      }
    },

    /**
    * @api : showOrHideUIFlex
     * Show the Ui FLex Based on the values obtained
    * @return : NA
    */
    showOrHideUIFlex: function () {
      for (var j = 1; j <= 28; j++) {
        fieldValue = "lblValue" + j;
        keyValue = "lblKey" + j;
        if (this.view[keyValue].text === ":") {
          this.view["flxConfirmDetail" + j].isVisible = false;
        }
        else {
          if (this.view[fieldValue].text !== ('undefined' && 'null' && "" && "Label")) {
              this.view["flxConfirmDetail" + j].isVisible = true;
          }
          else {
            if (this.view[keyValue].text === kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountNumber")) {
              this.view["flxConfirmDetail" + j].isVisible = false;
            }
            else {
              this.view[fieldValue].text = kony.i18n.getLocalizedString("i18n.common.none");
              this.view["flxConfirmDetail" + j].isVisible = true;
            }
          }
        }
      }
      if (this.context.Transaction.payeeType === "Existing Payee") {
        this.view.flxConfirmDetail15.isVisible = false;
        this.view.flxConfirmDetail26.isVisible = false;
        this.view.flxConfirmDetail27.isVisible = false;
        this.view.flxConfirmDetail28.isVisible = false;
      }
    },

    /**
     * @api : setFrequencyData
     * sets the frequency data based on the type pf frequency
     * @return : NA
     */
    setFrequencyData: function () {
      if (this.context.Transaction.frequencyType === kony.i18n.getLocalizedString("i18n.transfers.frequency.once")) { //freq is once
        this.view.flxConfirmDetail8.isVisible = true;
        this.view.flxConfirmDetail9.isVisible = false;
        this.view.flxConfirmDetail18.isVisible = false;
        this.view.lblKey8.text = kony.i18n.getLocalizedString("kony.i18n.verifyDetails.sendOn");
      }
      else {
        if (this.context.Transaction.numberOfRecurrences !== "") { //frequency is not once and has number of recurrences
          this.view.flxConfirmDetail9.isVisible = false;
          this.view.flxConfirmDetail8.isVisible = true;
          this.view.flxConfirmDetail18.isVisible = true;
          this.view.lblKey8.text = kony.i18n.getLocalizedString("i18n.savingsPot.startDate");
        }
        else { //frequency is not once and has an end date
          this.view.flxConfirmDetail9.isVisible = true;
          this.view.flxConfirmDetail18.isVisible = false;
          this.view.flxConfirmDetail8.isVisible = true;
          this.view.lblKey8.text = kony.i18n.getLocalizedString("i18n.savingsPot.startDate");
        }
      }
    },

    /**
     * populateAddressDetails
     * @api : populateAddressDetails
     * populates address details based on contracts
     * @return : NA
     */
    populateAddressDetails: function () {
      var scope = this;
      var phoneNumber = this.context.Recipients.phone;
      var emailId = this.context.Recipients.email;
      var addressLine1 = this.context.Recipients.addressLine1;
      var addressLine2 = this.context.Recipients.addressLine2;
      var city = this.context.Recipients.city;
      var state = this.context.Recipients.state;
      var country = this.context.Recipients.country;
      var zipCode = this.context.Recipients.zipCode;
      var address = [addressLine1, addressLine2, city, state, country, zipCode].join(",");
      address = address.replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
      this.view.lblValue23.text = address;
      var transactionType = this.context.Transaction.transactionType; 
      if ((scope.isEmptyNullOrUndefined(address) && scope.isEmptyNullOrUndefined(phoneNumber) && scope.isEmptyNullOrUndefined(emailId)) || transactionType === "P2P") {
        this.view.flxSection2.setVisibility(false);
        this.view.flxSeparator2.setVisibility(false);
      } else {
        this.view.flxSection2.setVisibility(true);
        this.view.flxSeparator2.setVisibility(true);
      }
    },
    /**
    * @api : initActionsOfButtons
     * Actions of buttons are initialized
    * @return : NA
    */
    initActionsOfButtons: function () {
      var scope = this;
      this.view.btnAction3.onClick = function () {
        if(scope.context.transferFlow === "Edit" || scope.context.transferFlow === "EditModify"){
          scope.businessController.invokeCustomVerbforEditTransaction();
        }else{
          scope.businessController.invokeCustomVerbforCreateTransaction();
        }
      };
      this.view.btnAction2.onClick = function () {
        scope.buttonModifyOnClick(scope.collectionObj);
      };
      this.view.btnAction1.onClick = this.showCancelPopup.bind(this);
    },
    /**
     * @api : showCancelPopup
     * displays popup on click of cancel button
     * @return : NA
     */
    showCancelPopup: function () {
      var scope = this;
      try {
        if (kony.application.getCurrentForm()) {
          var flxPopupFlex = new kony.ui.FlexScrollContainer({
            id: "flxComNamePopup",
            isVisible: true,
            layoutType: kony.flex.FREE_FORM,
            skin: "ICSknScrlFlx000000OP40",
            left: "0dp",
            top: "0dp",
            width: "100%",
            height: "100%",
            zIndex: 1200,
            enableScrolling: true,
            scrollDirection: kony.flex.SCROLL_VERTICAL,
            verticalScrollIndicator: true,
            bounces: true,
            allowVerticalBounce: true,
            bouncesZoom: true,
            accessibilityConfig : {
              a11yARIA:{
                "tabindex":-1
              }
            }
          }, {}, {});
          flxPopupFlex.setDefaultUnit(kony.flex.DP);
          kony.application.getCurrentForm().add(flxPopupFlex);
          var CustomPopup = new com.InfinityOLB.Resources.CustomPopup({
            autogrowMode: kony.flex.AUTOGROW_NONE,
            id: "cancelPopup",
            top: "0dp",
            layoutType: kony.flex.FREE_FORM,
            masterType: constants.MASTER_TYPE_DEFAULT,
            isModalContainer: true,
            isVisible: true,
            appName: "ResourcesMA",
          });
          flxPopupFlex.add(CustomPopup);
          CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        }
        CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        CustomPopup.flxCross.accessibilityConfig = {
          a11yLabel: "Close this cancel dialog",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.btnYes.accessibilityConfig = {
          a11yLabel: "Yes, cancel the process",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.btnNo.accessibilityConfig = {
          a11yLabel: "No, don't cancel the process",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.PayAPerson.CancelAlert");
        CustomPopup.flxCross.onClick = () => {
          flxPopupFlex.setVisibility(false);
          scope.view.btnAction1.setActive(true);
          kony.application.getCurrentForm().remove(flxPopupFlex);
        }
        CustomPopup.btnNo.onClick = () => {
          flxPopupFlex.setVisibility(false);
          scope.view.btnAction1.setActive(true);
          kony.application.getCurrentForm().remove(flxPopupFlex);
        }
        CustomPopup.btnYes.onClick = () => {
          flxPopupFlex.setVisibility(false);
          kony.application.getCurrentForm().remove(flxPopupFlex);
          scope.btnCancelOnClick();
        }
        if (kony.application.getCurrentBreakpoint() <= 640) {
          kony.application.getCurrentForm().flxComNamePopup.top = "0dp";
          kony.application.getCurrentForm().cancelPopup.height = "250dp";
        }
        CustomPopup.onKeyPress = this.onKeyPressCallback.bind(this,flxPopupFlex);
        CustomPopup.lblHeading.setActive(true);
        CustomPopup.accessibilityConfig = {
          "a11yARIA":{
            "tabindex": -1,
            "role": "dialog"
          }
       };
        scope.view.forceLayout();

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "showCancelPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onKeyPressCallback: function (flxPopupFlex, eventObject, eventPayload) {
      var scopeObj = this;
      if (eventPayload.keyCode === 27) {
          if(flxPopupFlex.isVisible === true) {
              flxPopupFlex.setVisibility(false);
              kony.application.getCurrentForm().remove(flxPopupFlex);
              scopeObj.view.btnAction1.setActive(true);
          }
      }
    },
    /**
      * @api : isEmptyNullOrUndefined
      * Verifies if the value is empty, null or undefined
      * data {any} - value to be verified
      * @return : {boolean} - validity of the value passed
      */
    isEmptyNullOrUndefined: function (data) {
      if (data === null || data === undefined || data === "") return true;
      if (typeof data === "object") {
        if (Array.isArray(data)) return data.length === 0;
        return Object.keys(data).length === 0;
      }
      return false;
    },
  };
}); 
