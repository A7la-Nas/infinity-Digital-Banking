/**
 * Component controller
 *
 * @author KH2144
 * @author KH2281
 * @author KH2629
 */

define(['./AccountsDAO','./ParserUtilsManager','./EntitlementUtils'],function(AccountsDAO,ParserUtilsManager,EntitlementUtils) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // Tab 1 data properties
      this._tab1field1backendmapping = "";
      this._tab1field1inputvalue = "";
      this._tab1field2backendmapping = "";
      this._tab1field2inputvalue = "";
      this._tab1field3backendmapping = "";
      this._tab1field3inputvalue = "";
      this._tab1field4backendmapping = "";
      this._tab1field4inputvalue = "";
      this._tab1field5backendmapping = "";
      this._tab1field5inputvalue = "";
      this._tab1field7backendmapping = "";
      this._tab1field7inputvalue = "";
      this._tab1field6backendmapping = "";
      this._tab1field6inputvalue = "";
      //info icon 
      this._infoIcon = "";
      this._infoText = "";
      this._infoHeaderText = "";
      this._infoText = "";
      this._infoCrossButton = "";
      this._sknInfoHeader = "";
      this._sknInfoText = "";
      // Tab 2 data properties
      this._tab2field1backendmapping = "";
      this._tab2field1inputvalue = "";
      this._tab2field2backendmapping = "";
      this._tab2field2inputvalue = "";
      this._tab2field3backendmapping = "";
      this._tab2field3inputvalue = "";
      this._tab2field4backendmapping = "";
      this._tab2field4inputvalue = "";
      this._tab2field5backendmapping = "";
      this._tab2field5inputvalue = "";
      this._tab2field6backendmapping = "";
      this._tab2field6inputvalue = "";
      this._tab2field7backendmapping = "";
      this._tab2field7inputvalue = "";
      this._tab2field8backendmapping = "";
      this._tab2field8inputvalue = "";
      this._tab2field9backendmapping = "";
      this._tab2field9inputvalue = "";
      this._tab2field10backendmapping = "";
      this._tab2field10inputvalue = "";
      // Tab 3 data properties
      this._tab3field1backendmapping = "";
      this._tab3field1inputvalue = "";
      this._tab3field2backendmapping = "";
      this._tab3field2inputvalue = "";
      this._tab3field3backendmapping = "";
      this._tab3field3inputvalue = "";
      this._tab3field4backendmapping = "";
      this._tab3field4inputvalue = "";
      this._tab3field5backendmapping = "";
      this._tab3field5inputvalue = "";
      this._tab3field6backendmapping = "";
      this._tab3field6inputvalue = "";
      this._tab3field7backendmapping = "";
      this._tab3field7inputvalue = "";
      this._tab3field8backendmapping = "";
      this._tab3field8inputvalue = "";
      this._tab3field9backendmapping = "";
      this._tab3field9inputvalue = "";
      this._tab3field10backendmapping = "";
      this._tab3field10inputvalue = "";
      // Tab 4 data properties
      this._tab4field1backendmapping = "";
      this._tab4field1inputvalue = "";
      this._tab4field2backendmapping = "";
      this._tab4field2inputvalue = "";
      this._tab4field3backendmapping = "";
      this._tab4field3inputvalue = "";
      this._tab4field4backendmapping = "";
      this._tab4field4inputvalue = "";
      this._tab4field5backendmapping = "";
      this._tab4field5inputvalue = "";
      this._tab4field6backendmapping = "";
      this._tab4field6inputvalue = "";
      this._tab4field7backendmapping = "";
      this._tab4field7inputvalue = "";
      this._tab4field8backendmapping = "";
      this._tab4field8inputvalue = "";
      this._tab4field9backendmapping = "";
      this._tab4field9inputvalue = "";
      this._tab4field10backendmapping = "";
      this._tab4field10inputvalue = "";
      // Backup variables
      this._tab1label1inputvalue = "";
      this._tab1label2inputvalue = "";
      this._tab1label3inputvalue = "";
      this._tab1label4inputvalue = "";
      this._tab1label5inputvalue = "";
      this._tab1label7inputvalue = "";
      this._tab1label6inputvalue = "";
      this._tab2label1inputvalue = "";
      this._tab2label2inputvalue = "";
      this._tab2label3inputvalue = "";
      this._tab2label4inputvalue = "";
      this._tab2label5inputvalue = "";
      this._tab2label6inputvalue = "";
      this._tab2label7inputvalue = "";
      this._tab2label8inputvalue = "";
      this._tab2label9inputvalue = "";
      this._tab2label10inputvalue = "";
      this._tab3label1inputvalue = "";
      this._tab3label2inputvalue = "";
      this._tab3label3inputvalue = "";
      this._tab3label4inputvalue = "";
      this._tab3label5inputvalue = "";
      this._tab3label6inputvalue = "";
      this._tab3label7inputvalue = "";
      this._tab3label8inputvalue = "";
      this._tab3label9inputvalue = "";
      this._tab3label10inputvalue = "";
      this._tab1field1type = "";
      this._tab1field1typeoriginalValue = "";
      this._tab1field2type = "";
      this._tab1field2typeoriginalValue = "";
      this._tab1field3type = "";
      this._tab1field3typeoriginalValue = "";
      this._tab1field4type = "";
      this._tab1field4typeoriginalValue = "";
      this._tab1field5type = "";
      this._tab1field5typeoriginalValue = "";
      this._tab1field7type = "";
      this._tab1field7typeoriginalValue = "";
      this._tab1field6type = "";
      this._tab1field6typeoriginalValue = "";
      this._tab2field1type = "";
      this._tab2field1typeoriginalValue = "";
      this._tab2field2type = "";
      this._tab2field2typeoriginalValue = "";
      this._tab2field3type = "";
      this._tab2field3typeoriginalValue = "";
      this._tab2field4type = "";
      this._tab2field4typeoriginalValue = "";
      this._tab2field5type = "";
      this._tab2field5typeoriginalValue = "";
      this._tab2field6type = "";
      this._tab2field6typeoriginalValue = "";
      this._tab2field7type = "";
      this._tab2field7typeoriginalValue = "";
      this._tab2field8type = "";
      this._tab2field8typeoriginalValue = "";
      this._tab2field9type = "";
      this._tab2field9typeoriginalValue = "";
      this._tab2field10type = "";
      this._tab2field10typeoriginalValue = "";
      this._tab3field1type = "";
      this._tab3field1typeoriginalValue = "";
      this._tab3field2type = "";
      this._tab3field2typeoriginalValue = "";
      this._tab3field3type = "";
      this._tab3field3typeoriginalValue = "";
      this._tab3field4type = "";
      this._tab3field4typeoriginalValue = "";
      this._tab3field5type = "";
      this._tab3field5typeoriginalValue = "";
      this._tab3field6type = "";
      this._tab3field6typeoriginalValue = "";
      this._tab3field7type = "";
      this._tab3field7typeoriginalValue = "";
      this._tab3field8type = "";
      this._tab3field8typeoriginalValue = "";
      this._tab3field9type = "";
      this._tab3field9typeoriginalValue = "";
      this._tab3field10type = "";
      this._tab3field10typeoriginalValue = "";
      this._tab4field1type = "";
      this._tab4field1typeoriginalValue = "";
      this._tab4field2type = "";
      this._tab4field2typeoriginalValue = "";
      this._tab4field3type = "";
      this._tab4field3typeoriginalValue = "";
      this._tab4field4type = "";
      this._tab4field4typeoriginalValue = "";
      this._tab4field5type = "";
      this._tab4field5typeoriginalValue = "";
      this._tab4field6type = "";
      this._tab4field6typeoriginalValue = "";
      this._tab4field7type = "";
      this._tab4field7typeoriginalValue = "";
      this._tab4field8type = "";
      this._tab4field8typeoriginalValue = "";
      this._tab4field9type = "";
      this._tab4field9typeoriginalValue = "";
      this._tab4field10type = "";
      this._tab4field10typeoriginalValue = "";
      // Service properties
      this._objectServiceName1 = "";
      this._operationName1 = "";
      this._objectName1 = "";
      this._criteria1 = "";
      this._identifier1 = "";
      // Format Values
      this._textSkin = "";
      this._amountFormat = "";
      this._positiveAmountSkin = "";
      this._negativeAmountSkin = "";
      this._positiveFormat = "";
      this._negativeFormat = "";
      this._dateFormat = "";
      this._backenddateformat = "";
      this._dateSkin = "";	  
      this._accountNumberformat = "";
      this._masking = "";
      this._maskeyeicon = "";
      this._unmaskeyeicon = "";
      this._maskeyeiconskin = "";
      this._unmaskeyeiconskin = "";
      this._accountNumberSkin = "";
      this.currencyCode = "";
      this.accountID = "";
      this.accountType = "";
      this._highlightedFieldSkin = "";
      this._highlightedFieldSkin2 = "";
      this._percentageSkin = "";
      this._labelSkin = "";
      this._activeTabSkin = "";
      this._activeTabHoverSkin = "";
      this._inactiveTabHoverSkin = "";
      this._inactiveTabSkin = "";
      // Title properties
      this._tab1TitlebtnOriginalValue = "";
      this._tab2TitlebtnOriginalValue = "";
      this._tab3TitlebtnOriginalValue = "";
      this._tab4TitlebtnOriginalValue = "";
      // Installment Details
      this._installmentDetailTabVisibility = "";
      this._installmentDetailTab = "";
      this._installmentDetailSknLegend = "";
      this._installmentDetailSknData = "";
      this._installmentDetailSknTotalNumber = "";
      this._installmentDetailSknTotalText = "";
      this._installmentDetailField1 = "";
      this._installmentDetailField2 = "";
      this._installmentDetailField3 = "";
      this._installmentDetailField4 = "";
      this._installmentDetailField5 = "";
      this._installmentDetailField6 = "";
      this._installmentDetailsEntitlementKey = "";
      this.accountsDAO = new AccountsDAO();
      this.parserUtilsManager = new ParserUtilsManager();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      this._backUpDataExist = false;
      this._noOfFieldsInTab1LeftPanel = 0;
      this.map = {};
      this.skins = {};
      this.context = {};
      this.servicesCalled = 0;
      this.servicesCompleted = 0;
      this._accountTypeContextPath;
      this._currencyCodeContextPath;
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      // Tab 1 value setters and getters
      defineSetter(this, "tab1field1backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field1backendmapping = val;
          this._tab1field1inputvalue = val;
        }
      });
      defineGetter(this, "tab1field1backendmapping", function() {
        return this._tab1field1backendmapping;
      });

      defineSetter(this, "tab1field2backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field2backendmapping = val;
          this._tab1field2inputvalue = val;
        }      
      });
      defineGetter(this, "tab1field2backendmapping", function() {
        return this._tab1field2backendmapping;
      });

      defineSetter(this, "tab1field3backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field3backendmapping = val;
          this._tab1field3inputvalue = val;
        }
      });
      defineGetter(this, "tab1field3backendmapping", function() {
        return this._tab1field3backendmapping;
      });

      defineSetter(this, "tab1field4backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field4backendmapping = val;
          this._tab1field4inputvalue = val;
        }
      });
      defineGetter(this, "tab1field4backendmapping", function() {
        return this._tab1field4backendmapping;
      });

      defineSetter(this, "tab1field5backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field5backendmapping = val;
          this._tab1field5inputvalue = val;
        }
      });
      defineGetter(this, "tab1field5backendmapping", function() {
        return this._tab1field5backendmapping;
      });

      defineSetter(this, "tab1field7backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field7backendmapping = val;
          this._tab1field7inputvalue = val;
        }
      });
      defineGetter(this, "tab1field7backendmapping", function() {
        return this._tab1field7backendmapping;
      });

      defineSetter(this, "tab1field6backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field6backendmapping = val;
          this._tab1field6inputvalue = val;
        }
      });
      defineGetter(this, "tab1field6backendmapping", function() {
        return this._tab1field6backendmapping;
      });
      
      //Info icon 
      defineSetter(this, "infoIcon", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._infoIcon = val;
        }
      });
      defineGetter(this, "infoIcon", function() {
        return this._infoIcon;
      });
      
      defineSetter(this, "infoText", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._infoText = val;
        }
      });
      defineGetter(this, "infoText", function() {
        return this._infoText;
      });
      
      defineSetter(this, "infoHeaderText", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._infoHeaderText = val;
        }
      });
      defineGetter(this, "infoHeaderText", function() {
        return this._infoHeaderText;
      });
      
      defineSetter(this, "infoText", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._infoText = val;
        }
      });
      defineGetter(this, "infoText", function() {
        return this._infoText;
      });
            defineSetter(this, 'infoCrossButton', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._infoCrossButton = val;
        }
      });
            defineGetter(this, 'infoCrossButton', function () {
                return this._infoCrossButton;
      });
      
      defineSetter(this, "sknInfoHeader", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknInfoHeader = val;
        }
      });
      defineGetter(this, "sknInfoHeader", function() {
        return this._sknInfoHeader;
      });
      
      defineSetter(this, "sknInfoText", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknInfoText = val;
        }
      });
      defineGetter(this, "sknInfoText", function() {
        return this._sknInfoText;
      });

      // Tab 2 value setters and getters
      defineSetter(this, "tab2field1backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field1backendmapping = val;
          this._tab2field1inputvalue = val;
        }
      });
      defineGetter(this, "tab2field1backendmapping", function() {
        return this._tab2field1backendmapping;
      });

      defineSetter(this, "tab2field2backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field2backendmapping = val;
          this._tab2field2inputvalue = val;
        }      
      });
      defineGetter(this, "tab2field2backendmapping", function() {
        return this._tab2field2backendmapping;
      });

      defineSetter(this, "tab2field3backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field3backendmapping = val;
          this._tab2field3inputvalue = val;
        }
      });
      defineGetter(this, "tab2field3backendmapping", function() {
        return this._tab2field3backendmapping;
      });

      defineSetter(this, "tab2field4backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field4backendmapping = val;
          this._tab2field4inputvalue = val;
        }
      });
      defineGetter(this, "tab2field4backendmapping", function() {
        return this._tab2field4backendmapping;
      });

      defineSetter(this, "tab2field5backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field5backendmapping = val;
          this._tab2field5inputvalue = val;
        }
      });
      defineGetter(this, "tab2field5backendmapping", function() {
        return this._tab2field5backendmapping;
      });

      defineSetter(this, "tab2field6backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field6backendmapping = val;
          this._tab2field6inputvalue = val;
        }
      });
      defineGetter(this, "tab2field6backendmapping", function() {
        return this._tab2field6backendmapping;
      });

      defineSetter(this, "tab2field7backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field7backendmapping = val;
          this._tab2field7inputvalue = val;
        }
      });
      defineGetter(this, "tab2field7backendmapping", function() {
        return this._tab2field7backendmapping;
      });

      defineSetter(this, "tab2field8backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field8backendmapping = val;
          this._tab2field8inputvalue = val;
        }
      });
      defineGetter(this, "tab2field8backendmapping", function() {
        return this._tab2field8backendmapping;
      });

      defineSetter(this, "tab2field9backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field9backendmapping = val;
          this._tab2field9inputvalue = val;
        }
      });
      defineGetter(this, "tab2field9backendmapping", function() {
        return this._tab2field9backendmapping;
      });

      defineSetter(this, "tab2field10backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field10backendmapping = val;
          this._tab2field10inputvalue = val;
        }
      });
      defineGetter(this, "tab3field10backendmapping", function() {
        return this._tab3field10backendmapping;
      });

      // Tab 3 value setters and getters
      defineSetter(this, "tab3field1backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field1backendmapping = val;
          this._tab3field1inputvalue = val;
        }
      });
      defineGetter(this, "tab3field1backendmapping", function() {
        return this._tab3field1backendmapping;
      });

      defineSetter(this, "tab3field2backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field2backendmapping = val;
          this._tab3field2inputvalue = val;
        }      });
      defineGetter(this, "tab3field2backendmapping", function() {
        return this._tab3field2backendmapping;
      });

      defineSetter(this, "tab3field3backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field3backendmapping = val;
          this._tab3field3inputvalue = val;
        }
      });
      defineGetter(this, "tab3field3backendmapping", function() {
        return this._tab3field3backendmapping;
      });

      defineSetter(this, "tab3field4backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field4backendmapping = val;
          this._tab3field4inputvalue = val;
        }
      });
      defineGetter(this, "tab3field4backendmapping", function() {
        return this._tab3field4backendmapping;
      });

      defineSetter(this, "tab3field5backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field5backendmapping = val;
          this._tab3field5inputvalue = val;
        }
      });
      defineGetter(this, "tab3field5backendmapping", function() {
        return this._tab3field5backendmapping;
      });

      defineSetter(this, "tab3field6backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field6backendmapping = val;
          this._tab3field6inputvalue = val;
        }
      });
      defineGetter(this, "tab3field6backendmapping", function() {
        return this._tab3field6backendmapping;
      });

      defineSetter(this, "tab3field7backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field7backendmapping = val;
          this._tab3field7inputvalue = val;
        }
      });
      defineGetter(this, "tab3field7backendmapping", function() {
        return this._tab3field7backendmapping;
      });

      defineSetter(this, "tab3field8backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field8backendmapping = val;
          this._tab3field8inputvalue = val;
        }
      });
      defineGetter(this, "tab3field8backendmapping", function() {
        return this._tab3field8backendmapping;
      });

      defineSetter(this, "tab3field9backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field9backendmapping = val;
          this._tab3field9inputvalue = val;
        }
      });
      defineGetter(this, "tab3field9backendmapping", function() {
        return this._tab3field9backendmapping;
      });

      defineSetter(this, "tab3field10backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field10backendmapping = val;
          this._tab3field10inputvalue = val;
        }
      });
      defineGetter(this, "tab3field10backendmapping", function() {
        return this._tab3field10backendmapping;
      });

      // Tab 4 value setters and getters
      defineSetter(this, "tab4field1backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field1backendmapping = val;
          this._tab4field1inputvalue = val;
        }
      });
      defineGetter(this, "tab4field1backendmapping", function() {
        return this._tab4field1backendmapping;
      });

      defineSetter(this, "tab4field2backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field2backendmapping = val;
          this._tab4field2inputvalue = val;
        }      });
      defineGetter(this, "tab4field2backendmapping", function() {
        return this._tab4field2backendmapping;
      });

      defineSetter(this, "tab4field3backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field3backendmapping = val;
          this._tab4field3inputvalue = val;
        }
      });
      defineGetter(this, "tab4field3backendmapping", function() {
        return this._tab4field3backendmapping;
      });

      defineSetter(this, "tab4field4backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field4backendmapping = val;
          this._tab4field4inputvalue = val;
        }
      });
      defineGetter(this, "tab4field4backendmapping", function() {
        return this._tab4field4backendmapping;
      });

      defineSetter(this, "tab4field5backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field5backendmapping = val;
          this._tab4field5inputvalue = val;
        }
      });
      defineGetter(this, "tab4field5backendmapping", function() {
        return this._tab4field5backendmapping;
      });

      defineSetter(this, "tab4field6backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field6backendmapping = val;
          this._tab4field6inputvalue = val;
        }
      });
      defineGetter(this, "tab4field6backendmapping", function() {
        return this._tab4field6backendmapping;
      });

      defineSetter(this, "tab4field7backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field7backendmapping = val;
          this._tab4field7inputvalue = val;
        }
      });
      defineGetter(this, "tab4field7backendmapping", function() {
        return this._tab4field7backendmapping;
      });

      defineSetter(this, "tab4field8backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field8backendmapping = val;
          this._tab4field8inputvalue = val;
        }
      });
      defineGetter(this, "tab4field8backendmapping", function() {
        return this._tab4field8backendmapping;
      });

      defineSetter(this, "tab4field9backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field9backendmapping = val;
          this._tab4field9inputvalue = val;
        }
      });
      defineGetter(this, "tab4field9backendmapping", function() {
        return this._tab4field9backendmapping;
      });

      defineSetter(this, "tab4field10backendmapping", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field10backendmapping = val;
          this._tab4field10inputvalue = val;
        }
      });
      defineGetter(this, "tab4field10backendmapping", function() {
        return this._tab4field10backendmapping;
      });

      // Field type setters and getters
      defineSetter(this, "tab1field1type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field1type = val;
          this._tab1field1typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field1type", function() {
        return this._tab1field1type;
      });

      defineSetter(this, "tab1field2type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field2type = val;
          this._tab1field2typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field2type", function() {
        return this._tab1field2type;
      });

      defineSetter(this, "tab1field3type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field3type = val;
          this._tab1field3typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field3type", function() {
        return this._tab1field3type;
      });

      defineSetter(this, "tab1field4type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field4type = val;
          this._tab1field4typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field4type", function() {
        return this._tab1field4type;
      });

      defineSetter(this, "tab1field5type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field5type = val;
          this._tab1field5typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field5type", function() {
        return this._tab1field5type;
      });

      defineSetter(this, "tab1field7type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field7type = val;
          this._tab1field7typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field7type", function() {
        return this._tab1field7type;
      });

      defineSetter(this, "tab1field6type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab1field6type = val;
          this._tab1field6typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab1field6type", function() {
        return this._tab1field6type;
      });

      defineSetter(this, "tab2field1type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field1type = val;
          this._tab2field1typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field1type", function() {
        return this._tab2field1type;
      });

      defineSetter(this, "tab2field2type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field2type = val;
          this._tab2field2typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field2type", function() {
        return this._tab2field2type;
      });

      defineSetter(this, "tab2field3type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field3type = val;
          this._tab2field3typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field3type", function() {
        return this._tab2field3type;
      });

      defineSetter(this, "tab2field4type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field4type = val;
          this._tab2field4typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field4type", function() {
        return this._tab2field4type;
      });

      defineSetter(this, "tab2field5type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field5type = val;
          this._tab2field5typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field5type", function() {
        return this._tab2field5type;
      });

      defineSetter(this, "tab2field6type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field6type = val;
          this._tab2field6typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field6type", function() {
        return this._tab2field6type;
      });

      defineSetter(this, "tab2field7type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field7type = val;
          this._tab2field7typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field7type", function() {
        return this._tab2field7type;
      });

      defineSetter(this, "tab2field8type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field8type = val;
          this._tab2field8typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field8type", function() {
        return this._tab2field8type;
      });

      defineSetter(this, "tab2field9type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field9type = val;
          this._tab2field9typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field9type", function() {
        return this._tab2field9type;
      });

      defineSetter(this, "tab2field10type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab2field10type = val;
          this._tab2field10typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab2field10type", function() {
        return this._tab2field10type;
      });

      defineSetter(this, "tab3field1type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field1type = val;
          this._tab3field1typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field1type", function() {
        return this._tab3field1type;
      });

      defineSetter(this, "tab3field2type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field2type = val;
          this._tab3field2typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field2type", function() {
        return this._tab3field2type;
      });

      defineSetter(this, "tab3field3type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field3type = val;
          this._tab3field3typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field3type", function() {
        return this._tab3field3type;
      });

      defineSetter(this, "tab3field4type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field4type = val;
          this._tab3field4typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field4type", function() {
        return this._tab3field4type;
      });

      defineSetter(this, "tab3field5type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field5type = val;
          this._tab3field5typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field5type", function() {
        return this._tab3field5type;
      });

      defineSetter(this, "tab3field6type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field6type = val;
          this._tab3field6typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field6type", function() {
        return this._tab3field6type;
      });

      defineSetter(this, "tab3field7type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field7type = val;
          this._tab3field7typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field7type", function() {
        return this._tab3field7type;
      });

      defineSetter(this, "tab3field8type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field8type = val;
          this._tab3field8typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field8type", function() {
        return this._tab3field8type;
      });

      defineSetter(this, "tab3field9type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field9type = val;
          this._tab3field9typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab3field9type", function() {
        return this._tab3field9type;
      });

      defineSetter(this, "tab3field10type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab3field10type = val;
          this._tab3field10typeoriginalValue = val;
        }
      });
      defineGetter(this, "tab4field10type", function() {
        return this._tab4field10type;
      });

      defineSetter(this, "tab4field1type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field1type = val;
          this._tab4field1typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field1type", function() {
        return this._tab4field1type;
      });
      defineSetter(this, "tab4field2type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field2type = val;
          this._tab4field2typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field2type", function() {
        return this._tab4field2type;
      });
      defineSetter(this, "tab4field3type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field3type = val;
          this._tab4field3typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field3type", function() {
        return this._tab4field3type;
      });
      defineSetter(this, "tab4field4type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field4type = val;
          this._tab4field4typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field4type", function() {
        return this._tab4field4type;
      });
      defineSetter(this, "tab4field5type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field5type = val;
          this._tab4field5typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field5type", function() {
        return this._tab4field5type;
      });
      defineSetter(this, "tab4field6type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field6type = val;
          this._tab4field6typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field6type", function() {
        return this._tab4field6type;
      });
      defineSetter(this, "tab4field7type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field7type = val;
          this._tab4field7typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field7type", function() {
        return this._tab4field7type;
      });
      defineSetter(this, "tab4field8type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field8type = val;
          this._tab4field8typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field8type", function() {
        return this._tab4field8type;
      });
      defineSetter(this, "tab4field9type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field9type = val;
          this._tab4field9typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field9type", function() {
        return this._tab4field9type;
      });
      defineSetter(this, "tab4field10type", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._tab4field10type = val;
          this._tab4field10typeoriginalValue = val;
        }
      });

      defineGetter(this, "tab4field10type", function() {
        return this._tab4field10type;
      });

      // Service properties setters and getters
      defineSetter(this, "objectServiceName1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._objectServiceName1 = val;
        }
      });
      defineGetter(this, "objectServiceName1", function() {
        return this._objectServiceName1;
      });

      defineSetter(this, "operationName1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._operationName1 = val;
        }
      });
      defineGetter(this, "operationName1", function() {
        return this._operationName1;
      });

      defineSetter(this, "objectName1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._objectName1 = val;
        }
      });
      defineGetter(this, "objectName1", function() {
        return this._objectName1;
      });

      defineSetter(this, "criteria1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._criteria1 = val;
        }
      });
      defineGetter(this, "criteria1", function() {
        return this._criteria1;
      });

      defineSetter(this, "identifier1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._identifier1 = val;
        }
      });
      defineGetter(this, "identifier1", function() {
        return this._identifier1;
      });

      //Skin properties and format values setters and getters
      defineSetter(this, "textSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._textSkin = val;
        }
      });
      defineGetter(this, "textSkin", function() {
        return this._textSkin;
      });

      defineSetter(this, "amountFormat", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._amountFormat = val;
        }    
      });
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });

      defineSetter(this, "positiveAmountSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._positiveAmountSkin = val;
        }
      });
      defineGetter(this, "positiveAmountSkin", function() {
        return this._positiveAmountSkin;
      });

      defineSetter(this, "negativeAmountSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._negativeAmountSkin = val;
        }
      });
      defineGetter(this, "negativeAmountSkin", function() {
        return this._negativeAmountSkin;
      });

      defineSetter(this, "dateFormat", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._dateFormat = val;
        }
      });
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });

      defineSetter(this, "backenddateformat", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._backenddateformat = val;
        }      
      });
      defineGetter(this, "backenddateformat", function() {
        return this._backenddateformat;
      });

      defineSetter(this, "dateSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._dateSkin = val;
        }
      });
      defineGetter(this, "dateSkin", function() {
        return this._dateSkin;
      });

      defineSetter(this, "accountNumberFormat", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._accountNumberformat = val;
        }  
      });
      defineGetter(this, "accountNumberFormat", function() {
        return this._accountNumberformat;
      });

      defineSetter(this, "masking", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._masking = val;
        }
      });
      defineGetter(this, "masking", function() {
        return this._masking;
      });

      defineSetter(this, "maskeyeicon", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._maskeyeicon = val;
        }      
      });
      defineGetter(this, "maskeyeicon", function() {
        return this._maskeyeicon;
      });

      defineSetter(this, "unmaskeyeicon", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._unmaskeyeicon = val;
        }
      });
      defineGetter(this, "unmaskeyeicon", function() {
        return this._unmaskeyeicon;
      });

      defineSetter(this, "maskeyeiconskin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._maskeyeiconskin = val;
        }      
      });
      defineGetter(this, "maskeyeiconskin", function() {
        return this._maskeyeiconskin;
      });

      defineSetter(this, "unmaskeyeiconskin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._unmaskeyeiconskin = val;
        }
      });
      defineGetter(this, "unmaskeyeiconskin", function() {
        return this._unmaskeyeiconskin;
      });

      defineSetter(this, "accountNumberSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._accountNumberSkin = val;
        }      
      });
      defineGetter(this, "accountNumberSkin", function() {
        return this._accountNumberSkin;
      });

      defineSetter(this, "highlightedFieldSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._highlightedFieldSkin = val;
        }      
      });
      defineGetter(this, "highlightedFieldSkin", function() {
        return this._highlightedFieldSkin;
      });

      defineSetter(this, "highlightedFieldSkin2", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._highlightedFieldSkin2 = val;
        }      
      });
      defineGetter(this, "highlightedFieldSkin2", function() {
        return this._highlightedFieldSkin2;
      });

      defineSetter(this, "percentageSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._percentageSkin = val;
        }      
      });
      defineGetter(this, "percentageSkin", function() {
        return this._percentageSkin;
      });

      defineSetter(this, "accountTypeContextPath", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._accountTypeContextPath = val;
        }      
      });
      defineGetter(this, "accountTypeContextPath", function() {
        return this._accountTypeContextPath;
      });

      defineSetter(this, "currencyCodeContextPath", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._currencyCodeContextPath = val;
        }
      });
      defineGetter(this, "currencyCodeContextPath", function() {
        return this._currencyCodeContextPath;
      });

      defineSetter(this, "labelSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._labelSkin = val;
        }
      });
      defineGetter(this, "labelSkin", function() {
        return this._labelSkin;
      });

      defineSetter(this, "activeTabSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._activeTabSkin = val;
        }
      });
      defineGetter(this, "activeTabSkin", function() {
        return this._activeTabSkin;
      });

      defineSetter(this, "activeTabHoverSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._activeTabHoverSkin = val;
        }
      });
      defineGetter(this, "activeTabHoverSkin", function() {
        return this._activeTabHoverSkin;
      });

      defineSetter(this, "inactiveTabHoverSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._inactiveTabHoverSkin = val;
        }
      });
      defineGetter(this, "inactiveTabHoverSkin", function() {
        return this._inactiveTabHoverSkin;
      });

      defineSetter(this, "inactiveTabSkin", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._inactiveTabSkin = val;
        }
      });
      defineGetter(this, "inactiveTabSkin", function() {
        return this._inactiveTabSkin;
      });

      // Installment details properties setters and getters
      defineSetter(this, "installmentDetailTabVisibility", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailTabVisibility = val;
        }
      });
      defineGetter(this, "installmentDetailTabVisibility", function() {
        return this._installmentDetailTabVisibility;
      });

      defineSetter(this, "installmentDetailTab", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailTab = val;
        }
      });
      defineGetter(this, "installmentDetailTab", function() {
        return this._installmentDetailTab;
      });

      defineSetter(this, "installmentDetailSknLegend", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailSknLegend = val;
        }
      });
      defineGetter(this, "installmentDetailSknLegend", function() {
        return this._installmentDetailSknLegend;
      });

      defineSetter(this, "installmentDetailSknData", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailSknData = val;
        }
      });
      defineGetter(this, "installmentDetailSknData", function() {
        return this._installmentDetailSknData;
      });

      defineSetter(this, "installmentDetailSknTotalNumber", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailSknTotalNumber = val;
        }
      });
      defineGetter(this, "installmentDetailSknTotalNumber", function() {
        return this._installmentDetailSknTotalNumber;
      });

      defineSetter(this, "installmentDetailSknTotalText", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailSknTotalText = val;
        }
      });
      defineGetter(this, "installmentDetailSknTotalText", function() {
        return this._installmentDetailSknTotalText;
      });

      defineSetter(this, "installmentDetailField1", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField1 = val;
        }
      });
      defineGetter(this, "installmentDetailField1", function() {
        return this._installmentDetailField1;
      });

      defineSetter(this, "installmentDetailField2", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField2 = val;
        }
      });
      defineGetter(this, "installmentDetailField2", function() {
        return this._installmentDetailField2;
      });

      defineSetter(this, "installmentDetailField3", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField3 = val;
        }
      });
      defineGetter(this, "installmentDetailField3", function() {
        return this._installmentDetailField3;
      });

      defineSetter(this, "installmentDetailField4", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField4 = val;
        }
      });
      defineGetter(this, "installmentDetailField4", function() {
        return this._installmentDetailField4;
      });

      defineSetter(this, "installmentDetailField5", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField5 = val;
        }
      });
      defineGetter(this, "installmentDetailField5", function() {
        return this._installmentDetailField5;
      });

      defineSetter(this, "installmentDetailField6", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailField6 = val;
        }
      });
      defineGetter(this, "installmentDetailField6", function() {
        return this._installmentDetailField6;
      });
       defineSetter(this, "installmentDetailsEntitlementKey", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._installmentDetailsEntitlementKey = val;
        }
      });
      defineGetter(this, "installmentDetailsEntitlementKey", function() {
        return this._installmentDetailsEntitlementKey;
      });
    },

    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @param: criteria{string} - service criteria collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON = JSON.parse(criteria);
      for(var key in  criteriaJSON) {
        criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
      }
      return criteriaJSON;
    },

    /**
     * Component setContext
     * To collect the context object required for the component 
     * @param: context{JSONobject} - account object 
     */
    setContext: function(context) {
      this.context=context;
    },

    /**
     * Component setAccountTypeFromContext
     * To set account type from the context object
     */
    setAccountTypeFromContext: function() {
      this.accountType= this.parserUtilsManager.getParsedValue(this._accountTypeContextPath);
    },

    /**
     * Component setCurrencyCodeFromContext
     * To set currency code from the context object
     */
    setCurrencyCodeFromContext: function() {
      this.currencyCode = this.parserUtilsManager.getParsedValue(this._currencyCodeContextPath);
    },

    /**
     * Component postShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
                      Invoke the DAO layer to collect information from the service
     */
    postShow: function() {
      var scopeObj = this;
      var currentBreakPoint=kony.application.getCurrentBreakpoint();
      this.skins = {
        ACCOUNT_SUMMARY_SELECTED: this.breakPointParser(
          JSON.parse(this._activeTabSkin), currentBreakPoint).skin,
        ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER: this.breakPointParser(
          JSON.parse(this._activeTabHoverSkin), currentBreakPoint).skin,
        ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER: this.breakPointParser(
          JSON.parse(this._inactiveTabHoverSkin), currentBreakPoint).skin,
        TAB_INACTIVE: this.breakPointParser(
          JSON.parse(this._inactiveTabSkin), currentBreakPoint).skin,
      };
      this.storeBackUpData();
      this.resetData();
      this.parserUtilsManager.setContext(this.context);
      this.EntitlementUtils.setEntitlements(this.context);
      this.setAccountTypeFromContext();
      this.setCurrencyCodeFromContext();
      if(this._objectServiceName1 && this._operationName1 && this._objectName1) {
        this.servicesCalled++;
        this.requestStart();
        scopeObj.accountsDAO.fetchAccountDetails(
          this._objectServiceName1,this._operationName1,this._objectName1,
          this.getCriteria(this._criteria1),scopeObj.identifier1,scopeObj.prepareObjectForTheView,scopeObj.errorCallback);
      }
      this.bindAccountTypeStaticData();
      scopeObj.showTab1();
      if(this.servicesCalled == 0) {
        this.bindServiceResponse();
      }
      this.initActions();
      this.assignAccessibility();
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.information.onKeyPress = this.onKeyPressCallBack;
      this.view.flxTabs.clipBounds = false;
      this.setAriaSelectedAccessibility();
      this.view.flxTabs.accessibilityConfig = {
        "a11yARIA":{
            "role":"tablist",
            "tabindex":-1
        }
    }
    },

    onKeyPressCallBack: function (eventObject, eventPayload) {
       var scopeObj = this;
       if (eventObject.id === "information"){
            if (eventPayload.keyCode === 27) {
                scopeObj.view.information.isVisible = false;
                scopeObj.view.flxInfo.setActive(true);
            }
            else if(eventPayload.keyCode === 9)
            {
                    if (eventPayload.shiftKey) {
                        eventPayload.preventDefault();
                        scopeObj.view.information.isVisible = false;
                        scopeObj.view.flxInfo.setActive(true);
                    }
                        else if(eventPayload.keyCode === 9)
                        {
                            eventPayload.preventDefault();
                            scopeObj.view.information.isVisible = false;
                            scopeObj.view.flxInfo.setActive(true);
                        }
                    }
                  }
    },

    setAccessibility : function(path){
      path.accessibilityConfig={
      "a11yARIA" :{
        tabindex: -1
      }};
    },

    setAriaSelectedAccessibility: function () {
      for (var i = 1; i <= 4; i++) {
        if (this.view["btnTab" + i].skin === this.skins.ACCOUNT_SUMMARY_SELECTED) {
          this.view["btnTab" + i].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": true,
              "role":"tab"
            }
          }
        }
        else if (this.view["btnTab" + i].skin === this.skins.TAB_INACTIVE) {
          this.view["btnTab" + i].accessibilityConfig = {
            "a11yARIA": {
              "aria-selected": false,
              "role":"tab"
            }
          }
        }
      }
    },

    assignAccessibility: function(){
      this.view.imgInfo.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA" :{
          tabindex: -1
        }
      };
      this.view.lblInfo.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA" :{
          tabindex: -1
        }
      };
      
      this.view.flxInfo.accessibilityConfig = {
        "a11yARIA": {
          "role": "button",
          "aria-haspopup": "dialog",
          "aria-expanded": false
        },
        "a11yLabel": "Read more information about Available Balance"
      };
    },

    /**
     * Component initActions
     * Reponsible to initialize actions
     */
    initActions: function() {
      var scopeObj = this;
      this.view.btnTab1.onClick = function() {
        scopeObj.showTab1();
        scopeObj.setAriaSelectedAccessibility();
      };
      this.view.btnTab2.onClick = function() {
        scopeObj.showTab2();
        scopeObj.setAriaSelectedAccessibility();
      };
      this.view.btnTab3.onClick = function() {
        scopeObj.showTab3();
        scopeObj.setAriaSelectedAccessibility();
      };
      this.view.btnTab4.onClick = function() {
        scopeObj.showTab4();
        scopeObj.setAriaSelectedAccessibility();
      }
      this.view.btnInstallmentDetails.onClick = function() {
        scopeObj.showIntallmentTab();
      }
      this.view.flxSummaryDesktop.setVisibility(false);
      if (this.accountType == 'mortgageFacility'){
        this.view.btnTab3.setVisibility(false);
      }
    },

    /**
     * Component bindData
     * Reponsible to read the format values from configuration and 
     *            call the tab wise set data methods based on tab visibility
     */
    bindData: function() {
      var currentBreakPoint = kony.application.getCurrentBreakpoint()
      var formatValues = {
        "textSkin": JSON.stringify(
          this.breakPointParser(JSON.parse(this._textSkin), currentBreakPoint)),
        "amountFormat": this._amountFormat,
        "positiveAmountSkin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._positiveAmountSkin), currentBreakPoint)),
        "negativeAmountSkin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._negativeAmountSkin), currentBreakPoint)),
        "dateFormat": this._dateFormat,
        "backenddateformat": this._backenddateformat,
        "dateSkin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._dateSkin), currentBreakPoint)),
        "accountNumberformat": this._accountNumberformat,
        "masking": this._masking,
        "maskeyeicon": this._maskeyeicon,
        "unmaskeyeicon": this._unmaskeyeicon,
        "maskeyeiconskin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._maskeyeiconskin), currentBreakPoint)),
        "unmaskeyeiconskin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._unmaskeyeiconskin), currentBreakPoint)),
        "accountNumberSkin": JSON.stringify(this.breakPointParser(
          JSON.parse(this._accountNumberSkin), currentBreakPoint)),
        "currencySymbolCode": this.currencyCode,
        "percentageSkin":JSON.stringify(this.breakPointParser(
          JSON.parse(this._percentageSkin), currentBreakPoint))
      };
      this.setTab1Data(formatValues);
      if(this.view.btnTab2.isVisible) {
        this.setTab2Data(formatValues);
      }
      if(this.view.btnTab3.isVisible) {
        this.setTab3Data(formatValues);
      }
      if(this.view.btnTab4.isVisible) {
        this.setTab4Data(formatValues);
      }
      this.view.forceLayout();
      this.requestEnd();
    },

    /**
     * Component setTab1Data
     * Set the values in tab 1 
     * @param: formatValues{JSONObject} - format values taken from configuration
     */
    setTab1Data: function(formatValues) {
      var currentBreakPoint=kony.application.getCurrentBreakpoint();
      this.view.FormatValue1Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field1backendmapping, this._tab1field1type));
      this.view.FormatValue2Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field2backendmapping, this._tab1field2type));
      this.view.FormatValue3Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field3backendmapping, this._tab1field3type));
      this.view.FormatValue4Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field4backendmapping, this._tab1field4type));
      this.view.FormatValue5Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field5backendmapping, this._tab1field5type));
      var backupHiglighterSkin = formatValues["positiveAmountSkin"];
      formatValues["positiveAmountSkin"] = JSON.stringify(this.breakPointParser(
        JSON.parse(this._highlightedFieldSkin2), kony.application.getCurrentBreakpoint()));
      this.view.FormatValue6Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field6backendmapping, this._tab1field6type));
      formatValues["positiveAmountSkin"] = backupHiglighterSkin;
      var backupHiglighterSkin = formatValues["positiveAmountSkin"];
      formatValues["positiveAmountSkin"] = JSON.stringify(this.breakPointParser(
        JSON.parse(this._highlightedFieldSkin), kony.application.getCurrentBreakpoint()));
      this.view.FormatValue7Tab1.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab1field7backendmapping, this._tab1field7type));
      formatValues["positiveAmountSkin"] = backupHiglighterSkin;
      this.view.FormatValue1Tab1.formatText();
      this.view.FormatValue2Tab1.formatText();
      this.view.FormatValue3Tab1.formatText();
      this.view.FormatValue4Tab1.formatText();
      this.view.FormatValue5Tab1.formatText();
      this.view.FormatValue7Tab1.formatText();
      this.view.FormatValue6Tab1.formatText();
      var alignmentJson = {
        "width": "100%",
        "alignmentPosition": constants.CONTENT_ALIGN_MIDDLE_RIGHT
      }
      this.view.FormatValue7Tab1.left = "";
      if(kony.i18n.getCurrentLocale() === "ar_AE"){
        this.view.FormatValue7Tab1.right = "-160dp";
      } else {
        this.view.FormatValue7Tab1.right = "0dp";
      }
      this.view.FormatValue6Tab1.left = "";
      this.view.FormatValue7Tab1.alignLabel(alignmentJson);
      this.view.FormatValue6Tab1.alignLabel(alignmentJson);
      if(currentBreakPoint === 640) {
        this.view.FormatValue6Tab1.right = "0dp";
        if (this.view.flx6Tab1.isVisible) {
          this.view.flxDummy1.height = "35dp";
          this.view.flx7Wrapper.top = "0dp";
        } else {
          this.view.flxDummy1.height = "112dp";
          this.view.flx7Wrapper.top = "15.5dp";
        }
      /*  if (this._noOfFieldsInTab1LeftPanel <= 3) {
          this.view.flxDummy1.setVisibility(true);
          this.view.flxDummy2.setVisibility(false);
          this.view.flxDummy3.setVisibility(false);
        } else if (this._noOfFieldsInTab1LeftPanel === 4) {
          this.view.flxDummy1.setVisibility(true);
          this.view.flxDummy2.setVisibility(true);
          this.view.flxDummy3.setVisibility(false);
        } else {*/
          this.view.flxDummy1.setVisibility(false);
          this.view.flxDummy2.setVisibility(false);
          this.view.flxDummy3.setVisibility(false);
       // }
          this.view.FormatValue7Tab1.accountNumberSkin.skin = "sknlbl42424240px";
      }
      else {
        if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.FormatValue6Tab1.right = "-135dp";
        } else {
          this.view.FormatValue6Tab1.right = "3dp";
        }
        this.view.flxDummy1.setVisibility(false);
        this.view.flxDummy2.setVisibility(false);
        this.view.flxDummy3.setVisibility(false);
        if(this.view.flx6Tab1.isVisible) {
          this.view.flx7Wrapper.top = "10dp";
        }
        else {
          this.view.flx7Wrapper.top = "58dp";    
        }
      }
      this.view.flxSummaryDesktop.setVisibility(true);
      if(this.view.lbl6Tab1.text=='Total Overdue:'){
        this.view.FormatValue6Tab1.setSkinToLabel("ICSknsknLabelSSPFF000015Px")
      }
      this.view.forceLayout();
    },

    /**
     * Component setTab2Data
     * Set the values in tab 2 
     * @param: formatValues{JSONObject} - format values taken from configuration
     */
    setTab2Data: function(formatValues) {
      this.view.FormatValue1Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field1backendmapping, this._tab2field1type));
      this.view.FormatValue2Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field2backendmapping, this._tab2field2type));
      this.view.FormatValue3Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field3backendmapping, this._tab2field3type));
      this.view.FormatValue4Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field4backendmapping, this._tab2field4type));
      this.view.FormatValue5Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field5backendmapping, this._tab2field5type));
      this.view.FormatValue6Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field6backendmapping, this._tab2field6type));
      this.view.FormatValue7Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field7backendmapping, this._tab2field7type));
      this.view.FormatValue8Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field8backendmapping, this._tab2field8type));
      this.view.FormatValue9Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field9backendmapping, this._tab2field9type));
      this.view.FormatValue10Tab2.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab2field10backendmapping, this._tab2field10type)); 
      this.view.FormatValue1Tab2.formatText();
      this.view.FormatValue2Tab2.formatText();
      this.view.FormatValue3Tab2.formatText();
      this.view.FormatValue4Tab2.formatText();
      this.view.FormatValue5Tab2.formatText();
      this.view.FormatValue6Tab2.formatText();
      this.view.FormatValue7Tab2.formatText();
      this.view.FormatValue8Tab2.formatText();
      this.view.FormatValue9Tab2.formatText();
      this.view.FormatValue10Tab2.formatText();
    },

    /**
     * Component setTab3Data
     * Set the values in tab 3
     * @param: formatValues{JSONObject} - format values taken from configuration
     */
    setTab3Data: function(formatValues) {
      this.view.FormatValue1Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field1backendmapping, this._tab3field1type));
      this.view.FormatValue2Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field2backendmapping, this._tab3field2type));
      this.view.FormatValue3Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field3backendmapping, this._tab3field3type));
      this.view.FormatValue4Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field4backendmapping, this._tab3field4type));
      this.view.FormatValue5Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field5backendmapping, this._tab3field5type));
      this.view.FormatValue6Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field6backendmapping, this._tab3field6type));
      this.view.FormatValue7Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field7backendmapping, this._tab3field7type));
      this.view.FormatValue8Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field8backendmapping, this._tab3field8type));
      this.view.FormatValue9Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field9backendmapping, this._tab3field9type));
      this.view.FormatValue10Tab3.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab3field10backendmapping, this._tab3field10type));
      this.view.FormatValue1Tab3.formatText();
      this.view.FormatValue2Tab3.formatText();
      this.view.FormatValue3Tab3.formatText();
      this.view.FormatValue4Tab3.formatText();
      this.view.FormatValue5Tab3.formatText();
      this.view.FormatValue6Tab3.formatText();
      this.view.FormatValue7Tab3.formatText();
      this.view.FormatValue8Tab3.formatText();
      this.view.FormatValue9Tab3.formatText();
      this.view.FormatValue10Tab3.formatText();
    },

    /**
     * Component setTab4Data
     * Set the values in tab 4
     * @param: formatValues{JSONObject} - format values taken from configuration
     */
    setTab4Data: function(formatValues) {
      this.view.FormatValue1Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field1backendmapping, this._tab4field1type));
      this.view.FormatValue2Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field2backendmapping, this._tab4field2type));
      this.view.FormatValue3Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field3backendmapping, this._tab4field3type));
      this.view.FormatValue4Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field4backendmapping, this._tab4field4type));
      this.view.FormatValue5Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field5backendmapping, this._tab4field5type));
      this.view.FormatValue6Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field6backendmapping, this._tab4field6type));
      this.view.FormatValue7Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field7backendmapping, this._tab4field7type));
      this.view.FormatValue8Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field8backendmapping, this._tab4field8type));
      this.view.FormatValue9Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field9backendmapping, this._tab4field9type));
      this.view.FormatValue10Tab4.UpdateCustomProperties(this.setFormattedData(
        formatValues, this._tab4field10backendmapping, this._tab4field10type));
      this.view.FormatValue1Tab4.formatText();
      this.view.FormatValue2Tab4.formatText();
      this.view.FormatValue3Tab4.formatText();
      this.view.FormatValue4Tab4.formatText();
      this.view.FormatValue5Tab4.formatText();
      this.view.FormatValue6Tab4.formatText();
      this.view.FormatValue7Tab4.formatText();
      this.view.FormatValue8Tab4.formatText();
      this.view.FormatValue9Tab4.formatText();
      this.view.FormatValue10Tab4.formatText();
    },

    /**
     * Component onBreakPointChange
     * Set UI based on breakpoint
     */
    onBreakPointChange: function() {
      var currentBreakPoint = kony.application.getCurrentBreakpoint();
      this.skins = {
        ACCOUNT_SUMMARY_SELECTED: this.breakPointParser(
          JSON.parse(this._activeTabSkin), currentBreakPoint).skin,
        ACCOUNT_DETAILS_SUMMARY_SELECTED_HOVER: this.breakPointParser(
          JSON.parse(this._activeTabHoverSkin), currentBreakPoint).skin,
        ACCOUNT_DETAILS_SUMMARY_UNSELECTED_HOVER: this.breakPointParser(
          JSON.parse(this._inactiveTabHoverSkin), currentBreakPoint).skin,
        TAB_INACTIVE: this.breakPointParser(
          JSON.parse(this._inactiveTabSkin), currentBreakPoint).skin,
      };
      if(!this._tab1TitlebtnOriginalValue) {
        this.storeBackUpData();
        this.resetData();
      }
      try{
        var fieldlabelSkin = JSON.parse(this._labelSkin);
      }
      catch(e) {
        kony.print(e);
      }
      if(fieldlabelSkin) {
        var labelSkin = this.breakPointParser(fieldlabelSkin, currentBreakPoint);
        this.setLabelSkins(labelSkin.skin);
      }
      else {
        this.setLabelSkins(this._labelSkin);
      }
      var tab1inputJSON = this.parseJsonAndGetValue(this._tab1TitlebtnOriginalValue);
      this.view.btnTab1.text =  kony.i18n.getLocalizedString("i18n.AccountsAggregation.AccountSummary");
 
      var tab2inputJSON  = this.parseJsonAndGetValue(this._tab2TitlebtnOriginalValue);
      this.view.btnTab2.text =  kony.i18n.getLocalizedString("i18n.accountDetail.interestDetails");
      var tab3inputJSON = this.parseJsonAndGetValue(this._tab3TitlebtnOriginalValue);
      this.view.btnTab3.text =  kony.i18n.getLocalizedString("i18n.Accounts.AccountInfo");
      var tab4inputJSON = this.parseJsonAndGetValue(this._tab4TitlebtnOriginalValue);
      this.view.btnTab4.text =  tab4inputJSON;
      var highlighterSkinJSON=JSON.parse(this._highlightedFieldSkin);
      highlighterSkinJSON=this.breakPointParser(
        highlighterSkinJSON,kony.application.getCurrentBreakpoint());
      this.view.FormatValue7Tab1.setSkinToLabel(highlighterSkinJSON.skin);
      var highlighterSkin2JSON=JSON.parse(this._highlightedFieldSkin2);
      highlighterSkin2JSON=this.breakPointParser(
        highlighterSkin2JSON,kony.application.getCurrentBreakpoint());
      this.view.FormatValue7Tab1.setSkinToLabel(highlighterSkin2JSON.skin);
      if(currentBreakPoint===640) {
        this.view.flxTabs.clipBounds = false;
        this.view.flxLeftDummy.width = "5dp";
        this.view.flxRightDummy.width = "5dp";
        this.view.flxSummaryDesktop.left = "10dp";
        this.view.flxSummaryDesktop.right = "10dp";
        this.view.flxBalanceDetailDesktop.left = "10dp";
        this.view.flxBalanceDetailDesktop.right = "10dp";
        this.view.flxTab3.left = "10dp";
        this.view.flxTab3.right = "10dp";
        this.view.flxTab4.left = "10dp";
        this.view.flxTab4.right = "10dp";
        this.view.flxTabs.left = "0dp";
        this.view.flxTabs.right = "0dp";
        this.view.flxTabs.skin = "slFbox";
        if (this.view.flx6Tab1.isVisible) {
          this.view.flxDummy1.height = "52dp";
          this.view.flx7Wrapper.top = "15.5dp";
        } else {
          this.view.flxDummy1.height = "112dp";
          this.view.flx7Wrapper.top = "15.5dp";
        }
        if (this._noOfFieldsInTab1LeftPanel <= 3) {
          this.view.flxDummy1.setVisibility(true);
          this.view.flxDummy2.setVisibility(false);
          this.view.flxDummy3.setVisibility(false);
        } else if (this._noOfFieldsInTab1LeftPanel === 4) {
          this.view.flxDummy1.setVisibility(true);
          this.view.flxDummy2.setVisibility(true);
          this.view.flxDummy3.setVisibility(false);
        } else {
          this.view.flxDummy1.setVisibility(true);
          this.view.flxDummy2.setVisibility(true);
          this.view.flxDummy3.setVisibility(true);
        }
      }
      else{
        this.view.flxTabs.clipBounds = false;
        this.view.flxLeftDummy.width = "30dp";
        this.view.flxRightDummy.width = "30dp";
        this.view.flxSummaryDesktop.left = "30dp";
        this.view.flxSummaryDesktop.right = "30dp";
        this.view.flxBalanceDetailDesktop.left = "30dp";
        this.view.flxBalanceDetailDesktop.right = "30dp";
        this.view.flxTab3.left = "30dp";
        this.view.flxTab3.right = "30dp";
        this.view.flxTab4.left = "30dp";
        this.view.flxTab4.right = "30dp";
        this.view.flxTabs.left = "30dp";
        this.view.flxTabs.right = "30dp";
        this.view.flxDummy1.setVisibility(false);
        this.view.flxDummy2.setVisibility(false);
        this.view.flxDummy3.setVisibility(false);
        if(this.view.flx6Tab1.isVisible) {
          this.view.flx7Wrapper.top = "10dp";
        }
        else{
          this.view.flx7Wrapper.top = "58dp";    
        }
      }
      this.bindAccountTypeStaticData();
      this.setInstallmentDetailTabData();
      this.showTab1();
    },

    /**
     * Component setFormattedData
     * set value and type in format values
     * @param: formatValues{JSONobject} - format values 
     * @param: text{string} - value of the field taken from configuration
     * @param: type{string} - type of the field taken from configuration
     * @return : {JSONobject} - Processed value
     */
    setFormattedData: function(formatValues, text, type) {
      formatValues["FieldType"] = {"type": type};
      var fieldValue = text ? text: "";
      formatValues["FieldValue"] = {"value": fieldValue};
      return formatValues;
    },

    /**
     * Component storeBackUpData
     * set values in backup variables
     */
    storeBackUpData: function() {
      if(!this._backUpDataExist) {
        this._tab1TitlebtnOriginalValue = this.view.btnTab1.text;
        this._tab2TitlebtnOriginalValue = this.view.btnTab2.text;
        this._tab3TitlebtnOriginalValue = this.view.btnTab3.text;
        this._tab4TitlebtnOriginalValue = this.view.btnTab4.text;
        this._tab1label1inputvalue = this.view.lbl1Tab1.text;
        this._tab1label2inputvalue = this.view.lbl2Tab1.text;
        this._tab1label3inputvalue = this.view.lbl3Tab1.text;
        this._tab1label4inputvalue = this.view.lbl4Tab1.text;
        this._tab1label5inputvalue = this.view.lbl5Tab1.text;
        this._tab1label7inputvalue = this.view.lbl7Tab1.text;
        this._tab1label6inputvalue = this.view.lbl6Tab1.text;
        this._tab2label1inputvalue = this.view.lbl1Tab2.text;
        this._tab2label2inputvalue = this.view.lbl2Tab2.text;
        this._tab2label3inputvalue = this.view.lbl3Tab2.text;
        this._tab2label4inputvalue = this.view.lbl4Tab2.text;
        this._tab2label5inputvalue = this.view.lbl5Tab2.text;
        this._tab2label6inputvalue = this.view.lbl6Tab2.text;
        this._tab2label7inputvalue = this.view.lbl7Tab2.text;
        this._tab2label8inputvalue = this.view.lbl8Tab2.text;
        this._tab2label9inputvalue = this.view.lbl9Tab2.text;
        this._tab2label10inputvalue = this.view.lbl10Tab2.text;
        this._tab3label1inputvalue = this.view.lbl1Tab3.text;
        this._tab3label2inputvalue = this.view.lbl2Tab3.text;
        this._tab3label3inputvalue = this.view.lbl3Tab3.text;
        this._tab3label4inputvalue = this.view.lbl4Tab3.text;
        this._tab3label5inputvalue = this.view.lbl5Tab3.text;
        this._tab3label6inputvalue = this.view.lbl6Tab3.text;
        this._tab3label7inputvalue = this.view.lbl7Tab3.text;
        this._tab3label8inputvalue = this.view.lbl8Tab3.text;
        this._tab3label9inputvalue = this.view.lbl9Tab3.text;
        this._tab3label10inputvalue = this.view.lbl10Tab3.text;
        this._tab4label1inputvalue = this.view.lbl1Tab4.text;
        this._tab4label2inputvalue = this.view.lbl2Tab4.text;
        this._tab4label3inputvalue = this.view.lbl3Tab4.text;
        this._tab4label4inputvalue = this.view.lbl4Tab4.text;
        this._tab4label5inputvalue = this.view.lbl5Tab4.text;
        this._tab4label6inputvalue = this.view.lbl6Tab4.text;
        this._tab4label7inputvalue = this.view.lbl7Tab4.text;
        this._tab4label8inputvalue = this.view.lbl8Tab4.text;
        this._tab4label9inputvalue = this.view.lbl9Tab4.text;
        this._tab4label10inputvalue = this.view.lbl10Tab4.text;
        this._backUpDataExist = true;
      }
    },

    /**
     * Component resetData
     * reset the values from backup variables
     */
    resetData: function() {
      this.map = {};
      this.view.btnTab1.text = kony.i18n.getLocalizedString("i18n.AccountsAggregation.AccountSummary");
      this.view.btnTab2.text =  kony.i18n.getLocalizedString("i18n.accountDetail.interestDetails");
      this.view.btnTab3.text =  kony.i18n.getLocalizedString("i18n.Accounts.AccountInfo");
      this.view.btnTab4.text = this._tab4TitlebtnOriginalValue;
      this.view.lbl1Tab1.text = this._tab1label1inputvalue;
      this.view.lbl2Tab1.text = this._tab1label2inputvalue;
      this.view.lbl3Tab1.text = this._tab1label3inputvalue;
      this.view.lbl4Tab1.text = this._tab1label4inputvalue;
      this.view.lbl5Tab1.text = this._tab1label5inputvalue;
      this.view.lbl7Tab1.text = this._tab1label7inputvalue;
      this.view.lbl6Tab1.text = this._tab1label6inputvalue;
      this.view.lbl1Tab2.text = this._tab2label1inputvalue;
      this.view.lbl2Tab2.text = this._tab2label2inputvalue;
      this.view.lbl3Tab2.text = this._tab2label3inputvalue;
      this.view.lbl4Tab2.text = this._tab2label4inputvalue;
      this.view.lbl5Tab2.text = this._tab2label5inputvalue;
      this.view.lbl6Tab2.text = this._tab2label6inputvalue;
      this.view.lbl7Tab2.text = this._tab2label7inputvalue;
      this.view.lbl8Tab2.text = this._tab2label8inputvalue;
      this.view.lbl9Tab2.text = this._tab2label9inputvalue;
      this.view.lbl10Tab2.text = this._tab2label10inputvalue;
      this.view.lbl1Tab3.text = this._tab3label1inputvalue;
      this.view.lbl2Tab3.text = this._tab3label2inputvalue;
      this.view.lbl3Tab3.text = this._tab3label3inputvalue;
      this.view.lbl4Tab3.text = this._tab3label4inputvalue;
      this.view.lbl5Tab3.text = this._tab3label5inputvalue;
      this.view.lbl6Tab3.text = this._tab3label6inputvalue;
      this.view.lbl7Tab3.text = this._tab3label7inputvalue;
      this.view.lbl8Tab3.text = this._tab3label8inputvalue;
      this.view.lbl9Tab3.text = this._tab3label9inputvalue;
      this.view.lbl10Tab3.text = this._tab3label10inputvalue;
      this.view.lbl1Tab4.text = this._tab4label1inputvalue;
      this.view.lbl2Tab4.text = this._tab4label2inputvalue;
      this.view.lbl3Tab4.text = this._tab4label3inputvalue;
      this.view.lbl4Tab4.text = this._tab4label4inputvalue;
      this.view.lbl5Tab4.text = this._tab4label5inputvalue;
      this.view.lbl6Tab4.text = this._tab4label6inputvalue;
      this.view.lbl7Tab4.text = this._tab4label7inputvalue;
      this.view.lbl8Tab4.text = this._tab4label8inputvalue;
      this.view.lbl9Tab4.text = this._tab4label9inputvalue;
      this.view.lbl10Tab4.text = this._tab4label10inputvalue;
      this._tab1field1backendmapping = this._tab1field1inputvalue;
      this._tab1field2backendmapping = this._tab1field2inputvalue;
      this._tab1field3backendmapping = this._tab1field3inputvalue;
      this._tab1field4backendmapping = this._tab1field4inputvalue;
      this._tab1field5backendmapping = this._tab1field5inputvalue;
      this._tab1field7backendmapping = this._tab1field7inputvalue;
      this._tab1field6backendmapping = this._tab1field6inputvalue;
      if(this.view.btnTab2.isVisible) {
        this._tab2field1backendmapping = this._tab2field1inputvalue;
        this._tab2field2backendmapping = this._tab2field2inputvalue;
        this._tab2field3backendmapping = this._tab2field3inputvalue;
        this._tab2field4backendmapping = this._tab2field4inputvalue;
        this._tab2field5backendmapping = this._tab2field5inputvalue;
        this._tab2field6backendmapping = this._tab2field6inputvalue;
        this._tab2field7backendmapping = this._tab2field7inputvalue;
        this._tab2field8backendmapping = this._tab2field8inputvalue;
        this._tab2field9backendmapping = this._tab2field9inputvalue;
        this._tab2field10backendmapping = this._tab2field10inputvalue;
      }
      if(this.view.btnTab3.isVisible) {
        this._tab3field1backendmapping = this._tab3field1inputvalue;
        this._tab3field2backendmapping = this._tab3field2inputvalue;
        this._tab3field3backendmapping = this._tab3field3inputvalue;
        this._tab3field4backendmapping = this._tab3field4inputvalue;
        this._tab3field5backendmapping = this._tab3field5inputvalue;
        this._tab3field6backendmapping = this._tab3field6inputvalue;
        this._tab3field7backendmapping = this._tab3field7inputvalue;
        this._tab3field8backendmapping = this._tab3field8inputvalue;
        this._tab3field9backendmapping = this._tab3field9inputvalue;
        this._tab3field10backendmapping = this._tab3field10inputvalue;
      }
      if(this.view.btnTab4.isVisible) {
        this._tab4field1backendmapping = this._tab4field1inputvalue;
        this._tab4field2backendmapping = this._tab4field2inputvalue;
        this._tab4field3backendmapping = this._tab4field3inputvalue;
        this._tab4field4backendmapping = this._tab4field4inputvalue;
        this._tab4field5backendmapping = this._tab4field5inputvalue;
        this._tab4field6backendmapping = this._tab4field6inputvalue;
        this._tab4field7backendmapping = this._tab4field7inputvalue;
        this._tab4field8backendmapping = this._tab4field8inputvalue;
        this._tab4field9backendmapping = this._tab4field9inputvalue;
        this._tab4field10backendmapping = this._tab4field10inputvalue;
      }
      this.resetTab1FieldTypeData();
      this.resetTab2FieldTypeData();
      this.resetTab3FieldTypeData();
      this.resetTab4FieldTypeData();
    },

    /**
     * Component resetTab1FieldTypeData
     * Reset the tab 1 field values from backup variables
     */
    resetTab1FieldTypeData: function() {
      this._tab1field1type = this._tab1field1typeoriginalValue;
      this._tab1field2type = this._tab1field2typeoriginalValue;
      this._tab1field3type = this._tab1field3typeoriginalValue;
      this._tab1field4type = this._tab1field4typeoriginalValue;
      this._tab1field5type = this._tab1field5typeoriginalValue;
      this._tab1field7type = this._tab1field7typeoriginalValue;
      this._tab1field6type = this._tab1field6typeoriginalValue;
    },

    /**
     * Component resetTab1FieldTypeData
     * Reset the tab 2 field values from backup variables
     */
    resetTab2FieldTypeData: function() {
      this._tab2field1type = this._tab2field1typeoriginalValue;
      this._tab2field2type = this._tab2field2typeoriginalValue;
      this._tab2field3type = this._tab2field3typeoriginalValue;
      this._tab2field4type = this._tab2field4typeoriginalValue;
      this._tab2field5type = this._tab2field5typeoriginalValue;
      this._tab2field6type = this._tab2field6typeoriginalValue;
      this._tab2field7type = this._tab2field7typeoriginalValue;
      this._tab2field8type = this._tab2field8typeoriginalValue;
      this._tab2field9type = this._tab2field9typeoriginalValue;
      this._tab2field10type = this._tab2field10typeoriginalValue;
    },

    /**
     * Component resetTab1FieldTypeData
     * Reset the tab 3 field values from backup variables
     */
    resetTab3FieldTypeData: function() {
      this._tab3field1type = this._tab3field1typeoriginalValue;
      this._tab3field2type = this._tab3field2typeoriginalValue;
      this._tab3field3type = this._tab3field3typeoriginalValue;
      this._tab3field4type = this._tab3field4typeoriginalValue;
      this._tab3field5type = this._tab3field5typeoriginalValue;
      this._tab3field6type = this._tab3field6typeoriginalValue;
      this._tab3field7type = this._tab3field7typeoriginalValue;
      this._tab3field8type = this._tab3field8typeoriginalValue;
      this._tab3field9type = this._tab3field9typeoriginalValue;
      this._tab3field10type= this._tab3field10typeoriginalValue;
    },

    /**
     * Component resetTab1FieldTypeData
     * Reset the tab 4 field values from backup variables
     */
    resetTab4FieldTypeData: function() {
      this._tab4field1type = this._tab4field1typeoriginalValue;
      this._tab4field2type = this._tab4field2typeoriginalValue;
      this._tab4field3type = this._tab4field3typeoriginalValue;
      this._tab4field4type = this._tab4field4typeoriginalValue;
      this._tab4field5type = this._tab4field5typeoriginalValue;
      this._tab4field6type = this._tab4field6typeoriginalValue;
      this._tab4field7type = this._tab4field7typeoriginalValue;
      this._tab4field8type = this._tab4field8typeoriginalValue;
      this._tab4field9type = this._tab4field9typeoriginalValue;
      this._tab4field10type = this._tab4field10typeoriginalValue;
    },

    /**
     * Component prepareObjectForTheView
     * Assign the backend response to identifier and bind data to UI
     * @param: backendResponse{JSONObject} - backend service response
     * @param: unicode{string} - identifier string
     */
    prepareObjectForTheView: function(backendResponse, unicode) {
      if(this.accountType == 'mortgageFacility'){
        var navMan = applicationManager.getNavigationManager();
        var mortgageLoanDetails = navMan.getCustomInfo("mortgageLoanDetails");
        if (mortgageLoanDetails){
            backendResponse.Accounts[0].utilisedAmount = mortgageLoanDetails;
        }
      }
	    if(this.context.MembershipName){ 
	      backendResponse.Accounts[0].MembershipName = this.context.MembershipName;
	    }
      this.readObject(backendResponse);
      this.servicesCompleted++;
      this.parserUtilsManager.setResponseData(unicode, this.map);
      if(this.servicesCompleted == this.servicesCalled) {
        this.servicesCompleted = 0;
        this.servicesCalled = 0;
        this.bindServiceResponse();
      }
      this.view.forceLayout();
    },

    /**
     * Component setLabelSkins
     * Set skin to label
     * @param: skin{string} - skin to be set to the labels
     */
    setLabelSkins: function(skin) {
      this.view.lbl1Tab1.skin = skin;
      this.view.lbl2Tab1.skin = skin;
      this.view.lbl3Tab1.skin = skin;
      this.view.lbl4Tab1.skin = skin;
      this.view.lbl5Tab1.skin = skin;
      this.view.lbl7Tab1.skin = skin;
      this.view.lbl6Tab1.skin = skin;
      this.view.lbl1Tab2.skin = skin;
      this.view.lbl2Tab2.skin = skin;
      this.view.lbl3Tab2.skin = skin;
      this.view.lbl4Tab2.skin = skin;
      this.view.lbl5Tab2.skin = skin;
      this.view.lbl6Tab2.skin = skin;
      this.view.lbl7Tab2.skin = skin;
      this.view.lbl8Tab2.skin = skin;
      this.view.lbl9Tab2.skin = skin;
      this.view.lbl10Tab2.skin = skin;
      this.view.lbl1Tab3.skin = skin;
      this.view.lbl2Tab3.skin = skin;
      this.view.lbl3Tab3.skin = skin;
      this.view.lbl4Tab3.skin = skin;
      this.view.lbl5Tab3.skin = skin;
      this.view.lbl6Tab3.skin = skin;
      this.view.lbl7Tab3.skin = skin;
      this.view.lbl8Tab3.skin = skin;
      this.view.lbl9Tab3.skin = skin;
      this.view.lbl10Tab3.skin = skin;
      this.view.lbl1Tab4.skin = skin;
      this.view.lbl2Tab4.skin = skin;
      this.view.lbl3Tab4.skin = skin;
      this.view.lbl4Tab4.skin = skin;
      this.view.lbl5Tab4.skin = skin;
      this.view.lbl6Tab4.skin = skin;
      this.view.lbl7Tab4.skin = skin;
      this.view.lbl8Tab4.skin = skin;
      this.view.lbl9Tab4.skin = skin;
      this.view.lbl10Tab4.skin = skin;
    },

    /**
     * Component bindServiceResponse
     * Bind service response data to the properties
     */
    bindServiceResponse: function() {
      this._tab1field1backendmapping = this.parseJsonAndGetValue(
        this._tab1field1backendmapping);
      this._tab1field2backendmapping = this.parseJsonAndGetValue(
        this._tab1field2backendmapping);
      this._tab1field3backendmapping = this.parseJsonAndGetValue(
        this._tab1field3backendmapping);
      this._tab1field4backendmapping = this.parseJsonAndGetValue(
        this._tab1field4backendmapping);
      this._tab1field5backendmapping = this.parseJsonAndGetValue(
        this._tab1field5backendmapping);
      this._tab1field7backendmapping = this.parseJsonAndGetValue(
        this._tab1field7backendmapping);
      this._tab1field6backendmapping = this.parseJsonAndGetValue(
        this._tab1field6backendmapping)
      if(this.view.btnTab2.isVisible) {
        this._tab2field1backendmapping = this.parseJsonAndGetValue(
          this._tab2field1backendmapping);
        this._tab2field2backendmapping = this.parseJsonAndGetValue(
          this._tab2field2backendmapping);
        this._tab2field3backendmapping = this.parseJsonAndGetValue(
          this._tab2field3backendmapping);
        this._tab2field4backendmapping = this.parseJsonAndGetValue(
          this._tab2field4backendmapping);
        this._tab2field5backendmapping = this.parseJsonAndGetValue(
          this._tab2field5backendmapping);
        this._tab2field6backendmapping = this.parseJsonAndGetValue(
          this._tab2field6backendmapping);
        this._tab2field7backendmapping = this.parseJsonAndGetValue(
          this._tab2field7backendmapping);
        this._tab2field8backendmapping = this.parseJsonAndGetValue(
          this._tab2field8backendmapping);
        this._tab2field9backendmapping = this.parseJsonAndGetValue(
          this._tab2field9backendmapping);
        this._tab2field10backendmapping = this.parseJsonAndGetValue(
          this._tab2field10backendmapping);
      }
      if(this.view.btnTab3.isVisible) {
        this._tab3field1backendmapping = this.parseJsonAndGetValue(
          this._tab3field1backendmapping);
        this._tab3field2backendmapping = this.parseJsonAndGetValue(
          this._tab3field2backendmapping);
        this._tab3field3backendmapping = this.parseJsonAndGetValue(
          this._tab3field3backendmapping);
        this._tab3field4backendmapping = this.parseJsonAndGetValue(
          this._tab3field4backendmapping);
        this._tab3field5backendmapping = this.parseJsonAndGetValue(
          this._tab3field5backendmapping);
        this._tab3field6backendmapping = this.parseJsonAndGetValue(
          this._tab3field6backendmapping);
        this._tab3field7backendmapping = this.parseJsonAndGetValue(
          this._tab3field7backendmapping);
        this._tab3field8backendmapping = this.parseJsonAndGetValue(
          this._tab3field8backendmapping);
        this._tab3field9backendmapping = this.parseJsonAndGetValue(
          this._tab3field9backendmapping);
        this._tab3field10backendmapping = this.parseJsonAndGetValue(
          this._tab3field10backendmapping);
      }
      if(this.view.btnTab4.isVisible) {
        this._tab4field1backendmapping = this.parseJsonAndGetValue(
          this._tab4field1backendmapping);
        this._tab4field2backendmapping = this.parseJsonAndGetValue(
          this._tab4field2backendmapping);
        this._tab4field3backendmapping = this.parseJsonAndGetValue(
          this._tab4field3backendmapping);
        this._tab4field4backendmapping = this.parseJsonAndGetValue(
          this._tab4field4backendmapping);
        this._tab4field5backendmapping = this.parseJsonAndGetValue(
          this._tab4field5backendmapping);
        this._tab4field6backendmapping = this.parseJsonAndGetValue(
          this._tab4field6backendmapping);
        this._tab4field7backendmapping = this.parseJsonAndGetValue(
          this._tab4field7backendmapping);
        this._tab4field8backendmapping = this.parseJsonAndGetValue(
          this._tab4field8backendmapping);
        this._tab4field9backendmapping = this.parseJsonAndGetValue(
          this._tab4field9backendmapping);
        this._tab4field10backendmapping = this.parseJsonAndGetValue(
          this._tab4field10backendmapping);
      }
      this.setInstallmentDetailTabData();
      this.setValueFlexVisibility();
      this.bindData();
    },

    /**
     * Component readArray
     * Parse the array in response and add it to the map
     * @param: array{Array} - array in the response
     * @param: jsonPath{string} - JSON path in the map
     */
    readArray: function(array, jsonPath) {
      var parentPath = jsonPath;
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        jsonPath = parentPath + "[" + i + "]";
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        } else { // is a value
          if(isNaN(value) && (value.indexOf("{")>-1 || value.indexOf("[")>-1)){
            value=eval('('+value+')');
          }
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          }else{
            this.map[jsonPath] = value;
          }
        }
      }
    },

    /**
     * Component readObject
     * Parse the object in response and add it to the map
     * @param: obj{Object} - object in the response
     * @param: jsonPath{string} - JSON path in the map
     */
    readObject: function(obj, jsonPath) {
      var keysItr = Object.keys(obj);
      var parentPath = jsonPath;
      for (var i = 0; i < keysItr.length; i++) {
        var key = keysItr[i];
        var value = obj[key]
        if(parentPath){
          jsonPath = parentPath + "." + key;
        }
        else{
          jsonPath = key;
        }
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        } else { // is a value
          if(isNaN(value) && (value.indexOf("{")>-1 || value.indexOf("[")>-1)){
            value=eval('('+value+')');
          }
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          }else{
            this.map[jsonPath] = value;
          }
        }
      }
    },

    /**
     * Component showTab1
     * Show tab 1 and reset other tabs
     */
    showTab1: function() {
      this.resetTab();
      this.onSummaryTabClick("tab1");
      this.view.flxSummaryDesktop.isVisible = true;
      this.view.btnTab1.skin = this.skins.ACCOUNT_SUMMARY_SELECTED;
    },

    /**
     * Component showTab2
     * Show tab 2 and reset other tabs
     */
    showTab2: function() {
      this.resetTab(); 
      this.onSummaryTabClick("tab2");     
      this.view.flxBalanceDetailDesktop.isVisible = true;
      this.view.btnTab2.skin = this.skins.ACCOUNT_SUMMARY_SELECTED;
    },
    

    /**
     * Component showTab3
     * Show tab 3 and reset other tabs
     */
    showTab3: function() {
      this.resetTab();
      this.onSummaryTabClick("tab3");
      this.view.flxTab3.isVisible = true;
      this.view.btnTab3.skin = this.skins.ACCOUNT_SUMMARY_SELECTED;
    },

    /**
     * Component showTab4
     * Show tab 4 and reset other tabs
     */
    showTab4: function() {
      this.resetTab();
      this.view.flxTab4.isVisible = true;
      this.view.btnTab4.skin = this.skins.ACCOUNT_SUMMARY_SELECTED;
    },

    /**
     * Component showIntallmentTab
     * Show installment tab and reset other tabs
     */
    showIntallmentTab: function() {
      this.resetTab();
      this.view.flxInstallmentDetails.setVisibility(true);
      this.view.btnInstallmentDetails.skin = this.skins.ACCOUNT_SUMMARY_SELECTED;
    },

    /**
     * Component resetTab
     * Reset the skins and tabs
     */
    resetTab: function() {
      this.view.information.setVisibility(false);
      this.view.flxSummaryDesktop.isVisible = false;
      this.view.flxBalanceDetailDesktop.isVisible = false;
      this.view.flxTab3.isVisible = false;
      this.view.flxTab4.isVisible = false;
      this.view.flxInstallmentDetails.isVisible = false;
      this.view.btnTab1.skin = this.skins.TAB_INACTIVE;
      this.view.btnTab2.skin = this.skins.TAB_INACTIVE;
      this.view.btnTab3.skin = this.skins.TAB_INACTIVE;
      this.view.btnTab4.skin = this.skins.TAB_INACTIVE;
      this.view.btnInstallmentDetails.skin = this.skins.TAB_INACTIVE;
    },

    /**
     * Component parseJsonAndGetValue
     * Parse the value and returns the processed value for given account type
     * @param: Value{String} - String taken from configuration
     * @return: {String} - Processed value
     */
    parseJsonAndGetValue: function(Value) {
      try {
        var valueJson = Value;
        if(typeof(Value) == "string"){
          valueJson = JSON.parse(Value);
        }
        if (valueJson[this.accountType]) {
          if(typeof(valueJson[this.accountType])=="string")
            return this.getProcessedText(valueJson[this.accountType]);
          else{
            var text=this.breakPointParser(valueJson[this.accountType],
              kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } 
        else if(this.breakPointParser(valueJson,kony.application.getCurrentBreakpoint())) {
          var text=this.breakPointParser(valueJson,kony.application.getCurrentBreakpoint());
          if(typeof(text) == "string"){
            return this.getProcessedText(text);
          }
          return "";
        }
        else {
          return "";
        }
      } catch (e) {
        kony.print(e);
      }
      return this.getProcessedText(Value);
    },

    /**
     * Component setValueFlexVisibility
     * Set flex visibility based on value
     */
    setValueFlexVisibility: function() {
      this._noOfFieldsInTab1LeftPanel = 0;
      if(!this.isEmptyNullUndefined(this._tab1field1backendmapping)) {
        this.view.flx1Tab1.setVisibility(true);
        this._noOfFieldsInTab1LeftPanel++;
      }
      else{
        this.view.flx1Tab1.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._tab1field2backendmapping)) {
        this.view.flx2Tab1.setVisibility(true);
        this._noOfFieldsInTab1LeftPanel++;
      }
      else{
        this.view.flx2Tab1.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._tab1field3backendmapping)) {
        this.view.flx3Tab1.setVisibility(true);
        this._noOfFieldsInTab1LeftPanel++;
      }
      else{
        this.view.flx3Tab1.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._tab1field4backendmapping)) {
        this.view.flx4Tab1.setVisibility(true);
        this._noOfFieldsInTab1LeftPanel++;
      }
      else{
        this.view.flx4Tab1.setVisibility(false);
      }
      this.view.flxOverDrawn.setVisibility(false);
      if ((this.context.accountType.toLowerCase() === "savings" || this.context.accountType.toLowerCase() === "checking")) {
        if (this.context.availableBalance < 0) {
          this.view.flxOverDrawn.setVisibility(true);
          if (this.isEmptyNullUndefined(this._tab1field5backendmapping))
            this._tab1field5backendmapping = this.context.availableBalance;
        }
      }
      if(!this.isEmptyNullUndefined(this._tab1field5backendmapping)) {
        this.view.flx5Tab1.setVisibility(true);
        this._noOfFieldsInTab1LeftPanel++;
      }
      else{
        this.view.flx5Tab1.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._tab1field7backendmapping)) {
        this.view.flx7Wrapper.setVisibility(true);
      }
      else{
        this.view.flx7Wrapper.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._tab1field6backendmapping)) {
        this.view.flx6Tab1.setVisibility(true);
      }
      else
        this.view.flx6Tab1.setVisibility(false);
      if(this.view.btnTab2.isVisible) {
        if(!this.isEmptyNullUndefined(this._tab2field1backendmapping)) {
          this.view.flx1Tab2.setVisibility(true);
        }
        else{
          this.view.flx1Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field2backendmapping)) {
          this.view.flx2Tab2.setVisibility(true);
        }
        else{
          this.view.flx2Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field3backendmapping)) {
          this.view.flx3Tab2.setVisibility(true);
        }
        else{
          this.view.flx3Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field4backendmapping)) {
          this.view.flx4Tab2.setVisibility(true);
        }
        else{
          this.view.flx4Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field5backendmapping)) {
          this.view.flx5Tab2.setVisibility(true);
        }
        else
          this.view.flx5Tab2.setVisibility(false);
        if(!this.isEmptyNullUndefined(this._tab2field6backendmapping)) {
          this.view.flx6Tab2.setVisibility(true);
        }
        else{
          this.view.flx6Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field7backendmapping)) {
          this.view.flx7Tab2.setVisibility(true);
        }
        else
          this.view.flx7Tab2.setVisibility(false);
        if(!this.isEmptyNullUndefined(this._tab2field8backendmapping)) {
          this.view.flx8Tab2.setVisibility(true);
        }
        else{
          this.view.flx8Tab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2field9backendmapping)) {
          this.view.flx9Tab2.setVisibility(true);
        }
        else
          this.view.flx9Tab2.setVisibility(false);
        if(!this.isEmptyNullUndefined(this._tab2field10backendmapping)) {
          this.view.flx10Tab2.setVisibility(true);
        }
        else{
          this.view.flx10Tab2.setVisibility(false);
        }
      }
      if(this.view.btnTab3.isVisible) {
        if(!this.isEmptyNullUndefined(this._tab3field1backendmapping)) {
          this.view.flx1Tab3.setVisibility(true);
        }
        else{
          this.view.flx1Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field2backendmapping)) {
          this.view.flx2Tab3.setVisibility(true);
        }
        else{
          this.view.flx2Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field3backendmapping)) {
          this.view.flx3Tab3.setVisibility(true);
        }
        else{
          this.view.flx3Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field4backendmapping)) {
          this.view.flx4Tab3.setVisibility(true);
        }
        else{
          this.view.flx4Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field5backendmapping)) {
          this.view.flx5Tab3.setVisibility(true);
        }
        else{
          this.view.flx5Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field6backendmapping)) {
          this.view.flx6Tab3.setVisibility(true);
        }
        else{
          this.view.flx6Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field7backendmapping)) {
          this.view.flx7Tab3.setVisibility(true);
        }
        else
          this.view.flx7Tab3.setVisibility(false);
        if(!this.isEmptyNullUndefined(this._tab3field8backendmapping)) {
          this.view.flx8Tab3.setVisibility(true);
        }
        else{
          this.view.flx8Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field9backendmapping)) {
          this.view.flx9Tab3.setVisibility(true);
        }
        else{
          this.view.flx9Tab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3field10backendmapping)) {
          this.view.flx10Tab3.setVisibility(true);
        }
        else{
          this.view.flx10Tab3.setVisibility(false);
        }
      }
      if(this.view.btnTab4.isVisible) {
        if(!this.isEmptyNullUndefined(this._tab4field1backendmapping)) {
          this.view.flx1Tab4.setVisibility(true);
        }
        else{
          this.view.flx1Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field2backendmapping)) {
          this.view.flx2Tab4.setVisibility(true);
        }
        else{
          this.view.flx2Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field3backendmapping)) {
          this.view.flx3Tab4.setVisibility(true);
        }
        else{
          this.view.flx3Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field4backendmapping)) {
          this.view.flx4Tab4.setVisibility(true);
        }
        else{
          this.view.flx4Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field5backendmapping)) {
          this.view.flx5Tab4.setVisibility(true);
        }
        else{
          this.view.flx5Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field6backendmapping)) {
          this.view.flx6Tab4.setVisibility(true);
        }
        else{
          this.view.flx6Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field7backendmapping)) {
          this.view.flx7Tab4.setVisibility(true);
        }
        else{
          this.view.flx7Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field8backendmapping)) {
          this.view.flx8Tab4.setVisibility(true);
        }
        else{
          this.view.flx9Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field9backendmapping)) {
          this.view.flx9Tab4.setVisibility(true);
        }
        else{
          this.view.flx9Tab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4field10backendmapping)) {
          this.view.flx10Tab4.setVisibility(true);
        }
        else{
          this.view.flx10Tab4.setVisibility(false);
        }
      }
    },
	
     /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
	  {
        return true;
	  }
	  else
	  {
		return false;
	  }
    },

    /**
     * Component breakPointParser
     * Parse the value and returns the processed value for the breakpoint
     * @param: inputJSON{JSON} - Json with breakpoint values
     * @param: lookUpKey{String} - breakpoint value
     * @return: {String} - value for  the given breakpoint
     */
    breakPointParser: function(inputJSON,lookUpKey) {
      if(inputJSON.hasOwnProperty(lookUpKey)) {
        return inputJSON[lookUpKey];
      }
      else if(inputJSON["default"]) {
        return inputJSON["default"];
      }
      return inputJSON;
    },

    /**
     * Component setInstallmentDetailTabData
     * Set UI and data for installment details tab
     */
    setInstallmentDetailTabData: function() {
      var scope = this;
      var visibility;
	  if(scope._installmentDetailsEntitlementKey!== "" && scope._installmentDetailsEntitlementKey!== undefined && scope._installmentDetailsEntitlementKey!== null)
      {
        var valueJson = JSON.parse(scope._installmentDetailsEntitlementKey);
        valueJson = valueJson[this.accountType] ? valueJson[this.accountType] : "";
        if(scope.EntitlementUtils.isEntitled(valueJson))
        {
          visibility = scope.parseJsonAndGetValue(scope._installmentDetailTabVisibility);
        }
        else
        {
          visibility = "false";
        }
      }
      else
        {
            visibility = scope.parseJsonAndGetValue(scope._installmentDetailTabVisibility);
        }
      if (this.accountType == "mortgageFacility") {
        visibility = "true";
      }
      if(visibility && visibility == "true") {
        scope.view.btnInstallmentDetails.setVisibility(true);
      }
      else{
        scope.view.btnInstallmentDetails.setVisibility(false);
      }
      if(scope.view.btnInstallmentDetails.isVisible) {
        scope.view.btnInstallmentDetails.text = scope.parseJsonAndGetValue(scope._installmentDetailTab);
        let legendSkin = scope.parseJsonAndGetValue(scope._installmentDetailSknLegend);
        if(legendSkin) {
          scope.setLegendSkin(legendSkin);
        }
        let dataSkin = scope.parseJsonAndGetValue(scope._installmentDetailSknData);
        if(dataSkin) {
          scope.setLegendDataSkin(dataSkin);
        }
        let totalNumberSkin = scope.parseJsonAndGetValue(scope._installmentDetailSknTotalNumber);
        if(totalNumberSkin) {
          scope.view.lblTotalValue.skin = totalNumberSkin;
        }
        let totalTextSkin = scope.parseJsonAndGetValue(scope._installmentDetailSknTotalText);
        if(totalTextSkin) {
          scope.view.lblTotalText.skin = totalTextSkin;
        }
        scope.setGraphData();
        scope.setLegendData();
      }
    },

    /**
     * Component setLegendSkin
     * Set skins to legend labels
     */
    setLegendSkin: function(skin) {
      this.view.lblLegendText1.skin = skin;
      this.view.lblLegendText2.skin = skin;
      this.view.lblLegendText3.skin = skin;
      this.view.lblLegendText4.skin = skin;
      this.view.lblLegendText5.skin = skin;
      this.view.lblLegendText6.skin = skin;
    },

    /**
     * Component setLegendDataSkin
     * Set skins to legend values
     */
    setLegendDataSkin: function(skin) {
      this.view.lblLegendValue1.skin = skin;
      this.view.lblLegendValue2.skin = skin;
      this.view.lblLegendValue3.skin = skin;
      this.view.lblLegendValue4.skin = skin;
      this.view.lblLegendValue5.skin = skin;
      this.view.lblLegendValue6.skin = skin;
    },

    /**
     * Component setLegendData
     * Set data to legend labels and values
     */
    setLegendData: function() {
      var scope = this;
      var total = 0;
      var installmentDataJSON = {
        "field1" : scope._installmentDetailField1,
        "field2" : scope._installmentDetailField2,
        "field3" : scope._installmentDetailField3,
        "field4" : scope._installmentDetailField4,
        "field5" : scope._installmentDetailField5,
        "field6" : scope._installmentDetailField6,
      };
      for(var i = 1; i < 7; i++) {
        var fieldData = installmentDataJSON["field"+i];
        if(fieldData && typeof(fieldData) === "string") {
          fieldData = JSON.parse(fieldData);
        }
        if (fieldData) {
          scope.view["lblLegendText" + i].text = scope.parseJsonAndGetValue(fieldData.legend);
          scope.setAccessibility(scope.view["lblLegendText" + i]);
          scope.view["lblLegendValue" + i].text = scope.parseJsonAndGetValue(fieldData.data);
          scope.setAccessibility(scope.view["lblLegendValue" + i]);
          scope.view["flxLegendColor" + i].backgroundColor = scope.parseJsonAndGetValue(fieldData.color);
          if (scope.view["lblLegendValue" + i].text) {
            total = total + parseInt(scope.view["lblLegendValue" + i].text);
            scope.view["flxLegend" + i].setVisibility(true);
          } else {
            scope.view["flxLegend" + i].setVisibility(false);
          }
        } else {
          scope.view["flxLegend" + i].setVisibility(false);
        }
      }
      scope.view.lblTotalValue.text = total + "";
    },

    /**
     * Component setGraphData
     * Create Dounut chart and bind data
     */
    setGraphData: function() {
      var donutData = this.formatDonutChartData();
      this.view.donutchart.createChart(donutData);
    },

    /**
     * Component formatDonutChartData
     * Process the data for the chart
     * @return: {Array} - chart data
     */
    formatDonutChartData: function() {
      var scope = this;
      var donutChartData = {};
      var installmentData = [];
      for (var i = 1; i < 7; i++) {
        var fieldData = eval("scope._installmentDetailField" + i);
        if (fieldData && typeof(fieldData) === "string") {
          fieldData = JSON.parse(fieldData);
        }
        if (fieldData) {
          fieldData.colorWithoutHash = fieldData.color;
          fieldData.colors = "#" + fieldData.color;
          installmentData.push(fieldData)
        }
      }

      function addRequireDonutChartFields(installment) {
        installment.label = scope.parseJsonAndGetValue(installment.legend);
        installment.Value = scope.parseJsonAndGetValue(installment.data);
        installment.colorCode = scope.parseJsonAndGetValue(installment.colors);
        installment.colorWithoutHash = scope.parseJsonAndGetValue(installment.colorWithoutHash);
        return installment;
      }
      var donutChartData = installmentData.map(addRequireDonutChartFields);
      return donutChartData;
    },

    /**
     * Component bindAccountTypeStaticData
     * Bind static data to labels
     */
    bindAccountTypeStaticData: function() {
      var scopeObj = this;
      var dateFormat = applicationManager.getConfigurationManager().getDateFormatCP();
      if(dateFormat === "dmy"){
          scopeObj._dateFormat = "{\"format\": \"d/m/Y\"}";
      }else{
          scopeObj._dateFormat = "{\"format\": \"m/d/Y\"}";
      }
      var tab1inputJSON = this.parseJsonAndGetValue(this.view.btnTab1.text);
      var orientationHandler = new OrientationHandler();
      if (kony.application.getCurrentBreakpoint() <=640 || orientationHandler.isMobile) {
        this.view.btnTab1.text = kony.i18n.getLocalizedString("i18n.payments.summary");
      } 
      else {
        this.view.btnTab1.text =  kony.i18n.getLocalizedString("i18n.AccountsAggregation.AccountSummary"); 
      }
      this.view.lbl1Tab1.text = this.parseJsonAndGetValue(this.view.lbl1Tab1.text);
      this.setAccessibility(this.view.lbl1Tab1);
      this.view.lbl2Tab1.text = this.parseJsonAndGetValue(this.view.lbl2Tab1.text);
      this.setAccessibility(this.view.lbl2Tab1);
      this.view.lbl3Tab1.text = this.parseJsonAndGetValue(this.view.lbl3Tab1.text);
      this.setAccessibility(this.view.lbl3Tab1);
      this.view.lbl4Tab1.text = this.parseJsonAndGetValue(this.view.lbl4Tab1.text);
      this.setAccessibility(this.view.lbl4Tab1);
      this.view.lbl5Tab1.text = this.parseJsonAndGetValue(this.view.lbl5Tab1.text);
      this.setAccessibility(this.view.lbl5Tab1);
      this.view.lbl6Tab1.text = this.parseJsonAndGetValue(this.view.lbl6Tab1.text);
      this.setAccessibility(this.view.lbl6Tab1);
      this.view.lbl7Tab1.text = this.parseJsonAndGetValue(this.view.lbl7Tab1.text);
      this.setAccessibility(this.view.lbl7Tab1);
      let infoIconImg = this.parseJsonAndGetValue(scopeObj._infoIcon);
      this.view.information.setVisibility(false);
      if(infoIconImg){
        this.view.imgInfo.src = this._infoIcon;
        this.view.lbl7Tab1.right = "24dp";
        this.view.flxInfo.setVisibility(true);
        this.view.flxInfo.onClick = this.showInfo;
        this.view.information.crossOnClick = function(){
          scopeObj.view.information.setVisibility(false);
          scopeObj.view.flxInfo.accessibilityConfig = {
            "a11yARIA": {
              "role": "button",
              "aria-haspopup": "dialog",
              "aria-expanded": false
            },
            "a11yLabel": "Read more information about Available Balance"
          };
          scopeObj.view.flxInfo.setActive(true);
        }
        var infoFlexData = {
          headerText : scopeObj.parseJsonAndGetValue(scopeObj._infoHeaderText),
          headerSkin : scopeObj.parseJsonAndGetValue(scopeObj._sknInfoHeader),
          infoText : scopeObj.parseJsonAndGetValue(scopeObj._infoText),
          infoSkin : scopeObj.parseJsonAndGetValue(scopeObj._sknInfoText),
          crossButtonFontIcon : scopeObj.parseJsonAndGetValue(scopeObj._infoCrossButton)
        }
        this.view.information.setData(infoFlexData);
        this.view.information.setParentScope(this);
      }
      else{
        this.view.flxInfo.setVisibility(false);
        this.view.lbl7Tab1.right = "0dp";
      }
      this.parseTab1TypeData();
      if(this.view.btnTab2.isVisible) {
        var tab2inputJSON  = this.parseJsonAndGetValue(this.view.btnTab2.text);
        var orientationHandler = new OrientationHandler();
        if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
        	this.view.btnTab2.text =  kony.i18n.getLocalizedString("i18n.accountDetail.interestsDetails");        }
        else {
          this.view.btnTab2.text =  kony.i18n.getLocalizedString("i18n.accountDetail.interestDetails");
        }
        this.view.lbl1Tab2.text = this.parseJsonAndGetValue(this.view.lbl1Tab2.text);
        this.setAccessibility(this.view.lbl1Tab2);
        this.view.lbl2Tab2.text = this.parseJsonAndGetValue(this.view.lbl2Tab2.text);
        this.setAccessibility(this.view.lbl2Tab2);
        this.view.lbl3Tab2.text = this.parseJsonAndGetValue(this.view.lbl3Tab2.text);
        this.setAccessibility(this.view.lbl3Tab2);
        this.view.lbl4Tab2.text = this.parseJsonAndGetValue(this.view.lbl4Tab2.text);
        this.setAccessibility(this.view.lbl4Tab2);
        this.view.lbl5Tab2.text = this.parseJsonAndGetValue(this.view.lbl5Tab2.text);
        this.setAccessibility(this.view.lbl5Tab2);
        this.view.lbl6Tab2.text = this.parseJsonAndGetValue(this.view.lbl6Tab2.text);
        this.setAccessibility(this.view.lbl6Tab2);
        this.view.lbl7Tab2.text = this.parseJsonAndGetValue(this.view.lbl7Tab2.text);
        this.setAccessibility(this.view.lbl7Tab2);
        this.view.lbl8Tab2.text = this.parseJsonAndGetValue(this.view.lbl8Tab2.text);
        this.setAccessibility(this.view.lbl8Tab2);
        this.view.lbl9Tab2.text = this.parseJsonAndGetValue(this.view.lbl9Tab2.text);
        this.setAccessibility(this.view.lbl9Tab2);
        this.view.lbl10Tab2.text = this.parseJsonAndGetValue(this.view.lbl10Tab2.text);
        this.setAccessibility(this.view.lbl10Tab2);
        this.parseTab2TypeData();
      }
      if(this.view.btnTab3.isVisible) {
        var tab3inputJSON = this.parseJsonAndGetValue(this.view.btnTab3.text);
        if (kony.application.getCurrentBreakpoint() <=640 || orientationHandler.isMobile) {
          this.view.btnTab3.text = kony.i18n.getLocalizedString("kony.mb.NAO.Info");
        } 
        else {
          this.view.btnTab3.text =  kony.i18n.getLocalizedString("i18n.Accounts.AccountInfo"); 
        }
        this.view.lbl1Tab3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ibanWithColon");
        this.setAccessibility(this.view.lbl1Tab3);
        this.view.lbl2Tab3.text = this.parseJsonAndGetValue(this.view.lbl2Tab3.text);
        this.setAccessibility(this.view.lbl2Tab3);
         this.view.lbl3Tab3.text =  kony.i18n.getLocalizedString("i18n.accountDetail.customerName") + ":";
        this.setAccessibility(this.view.lbl3Tab3);
        this.view.lbl4Tab3.text = this.parseJsonAndGetValue(this.view.lbl4Tab3.text);
        this.setAccessibility(this.view.lbl4Tab3);
        this.view.lbl5Tab3.text = this.parseJsonAndGetValue(this.view.lbl5Tab3.text);
        this.setAccessibility(this.view.lbl5Tab3);
        this.view.lbl6Tab3.text = this.parseJsonAndGetValue(this.view.lbl6Tab3.text);
        this.setAccessibility(this.view.lbl6Tab3);
        this.view.lbl7Tab3.text = this.parseJsonAndGetValue(this.view.lbl7Tab3.text);
        this.setAccessibility(this.view.lbl7Tab3);
        this.view.lbl8Tab3.text = this.parseJsonAndGetValue(this.view.lbl8Tab3.text);
        this.setAccessibility(this.view.lbl8Tab3);
        this.view.lbl9Tab3.text = this.parseJsonAndGetValue(this.view.lbl9Tab3.text);
        this.setAccessibility(this.view.lbl9Tab3);
        this.view.lbl10Tab3.text = this.parseJsonAndGetValue(this.view.lbl10Tab3.text);
        this.setAccessibility(this.view.lbl10Tab3);
        this.parseTab3TypeData();
      }
      if(this.view.btnTab4.isVisible) {
        var tab4inputJSON = this.parseJsonAndGetValue(this.view.btnTab4.text);
        this.view.btnTab4.text =  tab4inputJSON;
        this.view.lbl1Tab4.text = this.parseJsonAndGetValue(this.view.lbl1Tab4.text);
        this.setAccessibility(this.view.lbl1Tab4);
        this.view.lbl2Tab4.text = this.parseJsonAndGetValue(this.view.lbl2Tab4.text);
        this.setAccessibility(this.view.lbl2Tab4);
        this.view.lbl3Tab4.text = this.parseJsonAndGetValue(this.view.lbl3Tab4.text);
        this.setAccessibility(this.view.lbl3Tab4);
        this.view.lbl4Tab4.text = this.parseJsonAndGetValue(this.view.lbl4Tab4.text);
        this.setAccessibility(this.view.lbl4Tab4);
        this.view.lbl5Tab4.text = this.parseJsonAndGetValue(this.view.lbl5Tab4.text);
        this.setAccessibility(this.view.lbl5Tab4);
        this.view.lbl6Tab4.text = this.parseJsonAndGetValue(this.view.lbl6Tab4.text);
        this.setAccessibility(this.view.lbl6Tab4);
        this.view.lbl7Tab4.text = this.parseJsonAndGetValue(this.view.lbl7Tab4.text);
        this.setAccessibility(this.view.lbl7Tab4);
        this.view.lbl8Tab4.text = this.parseJsonAndGetValue(this.view.lbl8Tab4.text);
        this.setAccessibility(this.view.lbl8Tab4);
        this.view.lbl9Tab4.text = this.parseJsonAndGetValue(this.view.lbl9Tab4.text);
        this.setAccessibility(this.view.lbl9Tab4);
        this.view.lbl10Tab4.text = this.parseJsonAndGetValue(this.view.lbl10Tab4.text);
        this.setAccessibility(this.view.lbl10Tab4);
        this.parseTab4TypeData();
      }
    },
    
    /**
     * Component showInfo
     * Set information component UI
     */
    showInfo: function(){
      var scopeObj = this;
      if (scopeObj.view.information.isVisible === false) {
          scopeObj.view.information.setVisibility(true);
            scopeObj.view.information.top = "-12dp";
            scopeObj.view.information.zIndex = 22;
            scopeObj.view.information.right = "25dp";
            scopeObj.view.information.left = "";
        if(kony.application.getCurrentBreakpoint() === 640){
          scopeObj.view.information.top = "70dp";
        }
        this.view.information.setFocusMethod();
        this.view.flxInfo.accessibilityConfig = {
          "a11yARIA": {
            "role": "button",
            "aria-haspopup": "dialog",
            "aria-expanded": true
          },
          "a11yLabel": "Read more information about Available Balance"
        }
      } else {
        scopeObj.view.information.setVisibility(false);
        scopeObj.view.information.zIndex = 10;
        this.view.flxInfo.accessibilityConfig = {
          "a11yARIA": {
            "role": "button",
            "aria-haspopup": "dialog",
            "aria-expanded": false
          },
          "a11yLabel": "Read more information about Available Balance"
        }
      }
        this.view.information.accessibilityConfig = {
          "a11yARIA": {
            tabindex: -1
          }
        }
    },

    /**
     * Component parseTab1TypeData
     * Get the type of each value in tab 1 for given account type and breakpoint
     */
    parseTab1TypeData: function() {
      this._tab1field1type = this.parseJsonAndGetValue(this._tab1field1type);
      this._tab1field2type = this.parseJsonAndGetValue(this._tab1field2type);
      this._tab1field3type = this.parseJsonAndGetValue(this._tab1field3type);
      this._tab1field4type = this.parseJsonAndGetValue(this._tab1field4type);
      this._tab1field5type = this.parseJsonAndGetValue(this._tab1field5type);
      this._tab1field7type = this.parseJsonAndGetValue(this._tab1field7type);
      this._tab1field6type = this.parseJsonAndGetValue(this._tab1field6type);
    },

    /**
     * Component parseTab2TypeData
     * Get the type of each value in tab 2 for given account type and breakpoint
     */
    parseTab2TypeData: function() {
      this._tab2field1type = this.parseJsonAndGetValue(this._tab2field1type);
      this._tab2field2type = this.parseJsonAndGetValue(this._tab2field2type);
      this._tab2field3type = this.parseJsonAndGetValue(this._tab2field3type);
      this._tab2field4type = this.parseJsonAndGetValue(this._tab2field4type);
      this._tab2field5type = this.parseJsonAndGetValue(this._tab2field5type);
      this._tab2field6type = this.parseJsonAndGetValue(this._tab2field6type);
      this._tab2field7type = this.parseJsonAndGetValue(this._tab2field7type);
      this._tab2field8type = this.parseJsonAndGetValue(this._tab2field8type);
      this._tab2field9type = this.parseJsonAndGetValue(this._tab2field9type);
      this._tab2field10type = this.parseJsonAndGetValue(this._tab2field10type);
    },

    /**
     * Component parseTab3TypeData
     * Get the type of each value in tab 3 for given account type and breakpoint
     */
    parseTab3TypeData: function() {
      this._tab3field1type = this.parseJsonAndGetValue(this._tab3field1type);
      this._tab3field2type = this.parseJsonAndGetValue(this._tab3field2type);
      this._tab3field3type = this.parseJsonAndGetValue(this._tab3field3type);
      this._tab3field4type = this.parseJsonAndGetValue(this._tab3field4type);
      this._tab3field5type = this.parseJsonAndGetValue(this._tab3field5type);
      this._tab3field6type = this.parseJsonAndGetValue(this._tab3field6type);
      this._tab3field7type = this.parseJsonAndGetValue(this._tab3field7type);
      this._tab3field8type = this.parseJsonAndGetValue(this._tab3field8type);
      this._tab3field9type = this.parseJsonAndGetValue(this._tab3field9type);
      this._tab3field10type = this.parseJsonAndGetValue(this._tab3field10type);
    },

    /**
     * Component parseTab4TypeData
     * Get the type of each value in tab 4 for given account type and breakpoint
     */
    parseTab4TypeData: function() {
      this._tab4field1type = this.parseJsonAndGetValue(this._tab4field1type);
      this._tab4field2type = this.parseJsonAndGetValue(this._tab4field2type);
      this._tab4field3type = this.parseJsonAndGetValue(this._tab4field3type);
      this._tab4field4type = this.parseJsonAndGetValue(this._tab4field4type);
      this._tab4field5type = this.parseJsonAndGetValue(this._tab4field5type);
      this._tab4field6type = this.parseJsonAndGetValue(this._tab4field6type);
      this._tab4field7type = this.parseJsonAndGetValue(this._tab4field7type);
      this._tab4field8type = this.parseJsonAndGetValue(this._tab4field8type);
      this._tab4field9type = this.parseJsonAndGetValue(this._tab4field9type);
      this._tab4field10type = this.parseJsonAndGetValue(this._tab4field10type);
    },

    /**
     * Component getProcessedText
     * Get the processed text from parser util
     * @param: text{String}/{Object} - text to be parsed
     * @return: {String}/{Object} - parsed text
     */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },
    
     /**
      * Component errorCallback
      * Handles errors in the comonent
      */
    errorCallback: function(errObj){
      this.servicesCompleted++;
      this.onError(errObj);
    }
  };
});
