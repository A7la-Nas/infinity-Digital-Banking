/**
 * Component controller
 *
 * @author KH2704
 */

define(['./AccountsDAO', './ParseUtilsManager', 'FormatValueUtils'], function(AccountsDAO, ParseUtilsManager, FormatValueUtils) {
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            // Tab 1 data properties.
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
            this._tab1field6backendmapping = "";
            this._tab1field6inputvalue = "";
            this._tab1field7backendmapping = "";
            this._tab1field7inputvalue = "";
            this._tab1field8backendmapping = "";
            this._tab1field8inputvalue = "";
            this._tab1field9backendmapping = "";
            this._tab1field9inputvalue = "";
            this._tab1field10backendmapping = "";
            this._tab1field10inputvalue = "";

            // Tab 2 data properties.
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

            // Tab 3 data properties.
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

            // Tab 4 data properties.
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

            // Tab 1 label values.
            this._tab1label1backendmapping = "";
            this._tab1label1inputvalue = "";
            this._tab1label2backendmapping = "";
            this._tab1label2inputvalue = "";
            this._tab1label3backendmapping = "";
            this._tab1label3inputvalue = "";
            this._tab1label4backendmapping = "";
            this._tab1label4inputvalue = "";
            this._tab1label5backendmapping = "";
            this._tab1label5inputvalue = "";
            this._tab1label6backendmapping = "";
            this._tab1label6inputvalue = "";
            this._tab1label7backendmapping = "";
            this._tab1label7inputvalue = "";
            this._tab1label8backendmapping = "";
            this._tab1label8inputvalue = "";
            this._tab1label9backendmapping = "";
            this._tab1label9inputvalue = "";
            this._tab1label10backendmapping = "";
            this._tab1label10inputvalue = "";

            // Tab 2 label values.
            this._tab2label1backendmapping = "";
            this._tab2label1inputvalue = "";
            this._tab2label2backendmapping = "";
            this._tab2label2inputvalue = "";
            this._tab2label3backendmapping = "";
            this._tab2label3inputvalue = "";
            this._tab2label4backendmapping = "";
            this._tab2label4inputvalue = "";
            this._tab2label5backendmapping = "";
            this._tab2label5inputvalue = "";
            this._tab2label6backendmapping = "";
            this._tab2label6inputvalue = "";
            this._tab2label7backendmapping = "";
            this._tab2label7inputvalue = "";
            this._tab2label8backendmapping = "";
            this._tab2label8inputvalue = "";
            this._tab2label9backendmapping = "";
            this._tab2label9inputvalue = "";
            this._tab2label10backendmapping = "";
            this._tab2label10inputvalue = "";

            // Tab 3 label values.
            this._tab3label1backendmapping = "";
            this._tab3label1inputvalue = "";
            this._tab3label2backendmapping = "";
            this._tab3label2inputvalue = "";
            this._tab3label3backendmapping = "";
            this._tab3label3inputvalue = "";
            this._tab3label4backendmapping = "";
            this._tab3label4inputvalue = "";
            this._tab3label5backendmapping = "";
            this._tab3label5inputvalue = "";
            this._tab3label6backendmapping = "";
            this._tab3label6inputvalue = "";
            this._tab3label7backendmapping = "";
            this._tab3label7inputvalue = "";
            this._tab3label8backendmapping = "";
            this._tab3label8inputvalue = "";
            this._tab3label9backendmapping = "";
            this._tab3label9inputvalue = "";
            this._tab3label10backendmapping = "";
            this._tab3label10inputvalue = "";

            // Tab 4 label values.
            this._tab4label1backendmapping = "";
            this._tab4label1inputvalue = "";
            this._tab4label2backendmapping = "";
            this._tab4label2inputvalue = "";
            this._tab4label3backendmapping = "";
            this._tab4label3inputvalue = "";
            this._tab4label4backendmapping = "";
            this._tab4label4inputvalue = "";
            this._tab4label5backendmapping = "";
            this._tab4label5inputvalue = "";
            this._tab4label6backendmapping = "";
            this._tab4label6inputvalue = "";
            this._tab4label7backendmapping = "";
            this._tab4label7inputvalue = "";
            this._tab4label8backendmapping = "";
            this._tab4label8inputvalue = "";
            this._tab4label9backendmapping = "";
            this._tab4label9inputvalue = "";
            this._tab4label10backendmapping = "";
            this._tab4label10inputvalue = "";

            // Tab 1 field types.
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
            this._tab1field6type = "";
            this._tab1field6typeoriginalValue = "";
            this._tab1field7type = "";
            this._tab1field7typeoriginalValue = "";
            this._tab1field8type = "";
            this._tab1field8typeoriginalValue = "";
            this._tab1field9type = "";
            this._tab1field9typeoriginalValue = "";
            this._tab1field10type = "";
            this._tab1field10typeoriginalValue = "";

            // Tab 2 field types.
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

            // Tab 3 field types.
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

            // Tab 4 field types.
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

            // Service properties.
            this._objectServiceName = "";
            this._operationName = "";
            this._objectName = "";
            this._criteria = "";
            this._serviceIdentifier = "";

            // Skins.
            this._bankNameSkin = "";
            this._tabHeaderSkin = "";
            this._labelNameSkin = "";
            this._defaultValueSkin = "";
            this._dateValueSkin = "";
            this._percentageValueSkin = "";
            this._positiveValueSkin = "";
            this._negativeValueSkin = "";
            this._accountNumberSkin = "";
            this._maskIconSkin = "";
            this._unmaskIconSkin = "";
            this._buttonSkin = "";
            this._pageHeaderLabelSkin = "";
            this._headerBgSkin = "";
            this._tabHeaderBgSkin = "";
            this._tabDetailsBgSkin = "";
            this._bankNameBgSkin = "";

            // Header Label Properties.
            this._accountName = "";
            this._nickName = "";
            this._noOfEllipsis = "";
            this._noOfCharacters = "";
            this._businessAccount = "";

            // Other Values.      
            this._dateFormat = "";
            this._backendDateFormat = "";
            this._amountFormat = "";
            this._accountNumberformat = "";
            this._masking = "";
            this._maskeyeicon = "";
            this._unmaskeyeicon = "";
            this.currencyCode = "";
            this.userType = "";
            this.accountID = "";
            this.accountType = "";

            // Title properties.
            this._tab1TitleValue = "";
            this._tab1TitlebtnOriginalValue = "";
            this._tab2TitleValue = "";
            this._tab2TitlebtnOriginalValue = "";
            this._tab3TitleValue = "";
            this._tab3TitlebtnOriginalValue = "";
            this._tab4TitleValue = "";
            this._tab4TitlebtnOriginalValue = "";
            this._visibleTab2 = "";
            this._visibleTab3 = "";
            this._visibleTab4 = "";
            this._editLabelSkin = "";
            this.accountsDAO = new AccountsDAO();
            this.parserUtilsManager = new ParseUtilsManager();
            this.formatValueUtils = new FormatValueUtils();
            this._backUpDataExist = false;
            this.map = {};
            this.skins = {};
            this.context = {};
            this.isExternalAccount = "";
            this.externalBankName = "";
            this.accReference = "";
            this._accountTypeContextPath = "";
            this._currencyCodeContextPath = "";
            this._userTypeContextPath = "";
            this._flexWidth = "";
            this._labelWidth = "";
            this.showIndication = "";
        },

        //Logic for getters/setters of custom properties.
        initGettersSetters: function() {
            // Header Skin getters amd setters. 
            defineSetter(this, "flexWidth", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._flexWidth = val;
                }
            });
            defineGetter(this, "flexWidth", function() {
                return this._flexWidth;
            });

            defineSetter(this, "labelWidth", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._labelWidth = val;
                }
            });
            defineGetter(this, "labelWidth", function() {
                return this._labelWidth;
            });

            defineSetter(this, "pageHeaderLabel", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._pageHeaderLabel = val;
                }
            });
            defineGetter(this, "pageHeaderLabel", function() {
                return this._pageHeaderLabel;
            });

            defineSetter(this, "pageHeaderLabelSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._pageHeaderLabelSkin = val;
                }
            });
            defineGetter(this, "pageHeaderLabelSkin", function() {
                return this._pageHeaderLabelSkin;
            });

            defineSetter(this, "visibleTab2", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._visibleTab2 = val;
                }
            });
            defineGetter(this, "visibleTab2", function() {
                return this._visibleTab2;
            });

            defineSetter(this, "visibleTab3", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._visibleTab3 = val;
                }
            });
            defineGetter(this, "visibleTab3", function() {
                return this._visibleTab3;
            });

            defineSetter(this, "visibleTab4", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._visibleTab4 = val;
                }
            });
            defineGetter(this, "visibleTab4", function() {
                return this._visibleTab4;
            });

            defineSetter(this, "editLabelSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._editLabelSkin = val;
                }
            });
            defineGetter(this, "editLabelSkin", function() {
                return this._editLabelSkin;
            });

            // Tab titles setters and getters.
            defineSetter(this, "titleTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1TitleValue = val;
                    this._tab1TitlebtnOriginalValue = val;
                }
            });
            defineGetter(this, "titleTab1", function() {
                return this._tab1TitleValue;
            });

            defineSetter(this, "titleTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2TitleValue = val;
                    this._tab2TitlebtnOriginalValue = val;
                }
            });
            defineGetter(this, "titleTab2", function() {
                return this._tab2TitleValue;
            });

            defineSetter(this, "titleTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3TitleValue = val;
                    this._tab3TitlebtnOriginalValue = val;
                }
            });
            defineGetter(this, "titleTab3", function() {
                return this._tab3TitleValue;
            });

            defineSetter(this, "titleTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4TitleValue = val;
                    this._tab4TitlebtnOriginalValue = val;
                }
            });
            defineGetter(this, "titleTab4", function() {
                return this._tab4TitleValue;
            });

            // Tab 1 value setters and getters.
            defineSetter(this, "field1ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field1backendmapping = val;
                    this._tab1field1inputvalue = val;
                }
            });
            defineGetter(this, "field1ValueTab1", function() {
                return this._tab1field1backendmapping;
            });

            defineSetter(this, "field2ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field2backendmapping = val;
                    this._tab1field2inputvalue = val;
                }
            });
            defineGetter(this, "field2ValueTab1", function() {
                return this._tab1field2backendmapping;
            });

            defineSetter(this, "field3ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field3backendmapping = val;
                    this._tab1field3inputvalue = val;
                }
            });
            defineGetter(this, "field3ValueTab1", function() {
                return this._tab1field3backendmapping;
            });

            defineSetter(this, "field4ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field4backendmapping = val;
                    this._tab1field4inputvalue = val;
                }
            });
            defineGetter(this, "field4ValueTab1", function() {
                return this._tab1field4backendmapping;
            });

            defineSetter(this, "field5ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field5backendmapping = val;
                    this._tab1field5inputvalue = val;
                }
            });
            defineGetter(this, "field5ValueTab1", function() {
                return this._tab1field5backendmapping;
            });

            defineSetter(this, "field6ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field6backendmapping = val;
                    this._tab1field6inputvalue = val;
                }
            });
            defineGetter(this, "field6ValueTab1", function() {
                return this._tab1field6backendmapping;
            });

            defineSetter(this, "field7ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field7backendmapping = val;
                    this._tab1field7inputvalue = val;
                }
            });
            defineGetter(this, "field7ValueTab1", function() {
                return this._tab1field7backendmapping;
            });

            defineSetter(this, "field8ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field8backendmapping = val;
                    this._tab1field8inputvalue = val;
                }
            });
            defineGetter(this, "field8ValueTab1", function() {
                return this._tab1field8backendmapping;
            });

            defineSetter(this, "field9ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field9backendmapping = val;
                    this._tab1field9inputvalue = val;
                }
            });
            defineGetter(this, "field9ValueTab1", function() {
                return this._tab1field9backendmapping;
            });

            defineSetter(this, "field10ValueTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field10backendmapping = val;
                    this._tab1field10inputvalue = val;
                }
            });
            defineGetter(this, "field10ValueTab1", function() {
                return this._tab1field10backendmapping;
            });

            // Tab 1 label setters and getters.
            defineSetter(this, "field1LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label1backendmapping = val;
                    this._tab1label1inputvalue = val;
                }
            });
            defineGetter(this, "field1LabelTab1", function() {
                return this._tab1label1backendmapping;
            });

            defineSetter(this, "field2LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label2backendmapping = val;
                    this._tab1label2inputvalue = val;
                }
            });
            defineGetter(this, "field2LabelTab1", function() {
                return this._tab1label2backendmapping;
            });

            defineSetter(this, "field3LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label3backendmapping = val;
                    this._tab1label3inputvalue = val;
                }
            });
            defineGetter(this, "field3LabelTab1", function() {
                return this._tab1label3backendmapping;
            });

            defineSetter(this, "field4LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label4backendmapping = val;
                    this._tab1label4inputvalue = val;
                }
            });
            defineGetter(this, "field4LabelTab1", function() {
                return this._tab1label4backendmapping;
            });

            defineSetter(this, "field5LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label5backendmapping = val;
                    this._tab1label5inputvalue = val;
                }
            });
            defineGetter(this, "field5LabelTab1", function() {
                return this._tab1label5backendmapping;
            });

            defineSetter(this, "field6LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label6backendmapping = val;
                    this._tab1label6inputvalue = val;
                }
            });
            defineGetter(this, "field6LabelTab1", function() {
                return this._tab1label6backendmapping;
            });

            defineSetter(this, "field7LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label7backendmapping = val;
                    this._tab1label7inputvalue = val;
                }
            });
            defineGetter(this, "field7LabelTab1", function() {
                return this._tab1label7backendmapping;
            });

            defineSetter(this, "field8LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label8backendmapping = val;
                    this._tab1label8inputvalue = val;
                }
            });
            defineGetter(this, "field8LabelTab1", function() {
                return this._tab1label8backendmapping;
            });

            defineSetter(this, "field9LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label9backendmapping = val;
                    this._tab1label9inputvalue = val;
                }
            });
            defineGetter(this, "field9LabelTab1", function() {
                return this._tab1label9backendmapping;
            });

            defineSetter(this, "field10LabelTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1label10backendmapping = val;
                    this._tab1label10inputvalue = val;
                }
            });
            defineGetter(this, "field10LabelTab1", function() {
                return this._tab1label10backendmapping;
            });

            // Tab 1 type setters and getters.
            defineSetter(this, "field1TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field1type = val;
                    this._tab1field1typeoriginalValue = val;
                }
            });
            defineGetter(this, "field1TypeTab1", function() {
                return this._tab1field1type;
            });

            defineSetter(this, "field2TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field2type = val;
                    this._tab1field2typeoriginalValue = val;
                }
            });
            defineGetter(this, "field2TypeTab1", function() {
                return this._tab1field2type;
            });

            defineSetter(this, "field3TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field3type = val;
                    this._tab1field3typeoriginalValue = val;
                }
            });
            defineGetter(this, "field3TypeTab1", function() {
                return this._tab1field3type;
            });

            defineSetter(this, "field4TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field4type = val;
                    this._tab1field4typeoriginalValue = val;
                }
            });
            defineGetter(this, "field4TypeTab1", function() {
                return this._tab1field4type;
            });

            defineSetter(this, "field5TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field5type = val;
                    this._tab1field5typeoriginalValue = val;
                }
            });
            defineGetter(this, "field5TypeTab1", function() {
                return this._tab1field5type;
            });

            defineSetter(this, "field6TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field6type = val;
                    this._tab1field6typeoriginalValue = val;
                }
            });
            defineGetter(this, "field6TypeTab1", function() {
                return this._tab1field6type;
            });

            defineSetter(this, "field7TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field7type = val;
                    this._tab1field7typeoriginalValue = val;
                }
            });
            defineGetter(this, "field7TypeTab1", function() {
                return this._tab1field7type;
            });

            defineSetter(this, "field8TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field8type = val;
                    this._tab1field8typeoriginalValue = val;
                }
            });
            defineGetter(this, "field8TypeTab1", function() {
                return this._tab1field8type;
            });

            defineSetter(this, "field9TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field9type = val;
                    this._tab1field9typeoriginalValue = val;
                }
            });
            defineGetter(this, "field9TypeTab1", function() {
                return this._tab1field9type;
            });

            defineSetter(this, "field10TypeTab1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab1field10type = val;
                    this._tab1field10typeoriginalValue = val;
                }
            });
            defineGetter(this, "field10TypeTab1", function() {
                return this._tab1field10type;
            });

            // Tab 2 value setters and getters.
            defineSetter(this, "field1ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field1backendmapping = val;
                    this._tab2field1inputvalue = val;
                }
            });
            defineGetter(this, "field1ValueTab2", function() {
                return this._tab2field1backendmapping;
            });

            defineSetter(this, "field2ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field2backendmapping = val;
                    this._tab2field2inputvalue = val;
                }
            });
            defineGetter(this, "field2ValueTab2", function() {
                return this._tab2field2backendmapping;
            });

            defineSetter(this, "field3ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field3backendmapping = val;
                    this._tab2field3inputvalue = val;
                }
            });
            defineGetter(this, "field3ValueTab2", function() {
                return this._tab2field3backendmapping;
            });

            defineSetter(this, "field4ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field4backendmapping = val;
                    this._tab2field4inputvalue = val;
                }
            });
            defineGetter(this, "field4ValueTab2", function() {
                return this._tab2field4backendmapping;
            });

            defineSetter(this, "field5ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field5backendmapping = val;
                    this._tab2field5inputvalue = val;
                }
            });
            defineGetter(this, "field5ValueTab2", function() {
                return this._tab2field5backendmapping;
            });

            defineSetter(this, "field6ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field6backendmapping = val;
                    this._tab2field6inputvalue = val;
                }
            });
            defineGetter(this, "field6ValueTab2", function() {
                return this._tab2field6backendmapping;
            });

            defineSetter(this, "field7ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field7backendmapping = val;
                    this._tab2field7inputvalue = val;
                }
            });
            defineGetter(this, "field7ValueTab2", function() {
                return this._tab2field7backendmapping;
            });

            defineSetter(this, "field8ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field8backendmapping = val;
                    this._tab2field8inputvalue = val;
                }
            });
            defineGetter(this, "field8ValueTab2", function() {
                return this._tab2field8backendmapping;
            });

            defineSetter(this, "field9ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field9backendmapping = val;
                    this._tab2field9inputvalue = val;
                }
            });
            defineGetter(this, "field9ValueTab2", function() {
                return this._tab2field9backendmapping;
            });

            defineSetter(this, "field10ValueTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field10backendmapping = val;
                    this._tab2field10inputvalue = val;
                }
            });
            defineGetter(this, "field10ValueTab2", function() {
                return this._tab2field10backendmapping;
            });

            // Tab 2 label setters and getters.
            defineSetter(this, "field1LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label1backendmapping = val;
                    this._tab2label1inputvalue = val;
                }
            });
            defineGetter(this, "field1LabelTab2", function() {
                return this._tab2label1backendmapping;
            });

            defineSetter(this, "field2LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label2backendmapping = val;
                    this._tab2label2inputvalue = val;
                }
            });
            defineGetter(this, "field2LabelTab2", function() {
                return this._tab2label2backendmapping;
            });

            defineSetter(this, "field3LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label3backendmapping = val;
                    this._tab2label3inputvalue = val;
                }
            });
            defineGetter(this, "field3LabelTab2", function() {
                return this._tab2label3backendmapping;
            });

            defineSetter(this, "field4LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label4backendmapping = val;
                    this._tab2label4inputvalue = val;
                }
            });
            defineGetter(this, "field4LabelTab2", function() {
                return this._tab2label4backendmapping;
            });

            defineSetter(this, "field5LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label5backendmapping = val;
                    this._tab2label5inputvalue = val;
                }
            });
            defineGetter(this, "field5LabelTab2", function() {
                return this._tab2label5backendmapping;
            });

            defineSetter(this, "field6LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label6backendmapping = val;
                    this._tab2label6inputvalue = val;
                }
            });
            defineGetter(this, "field6LabelTab2", function() {
                return this._tab2label6backendmapping;
            });

            defineSetter(this, "field7LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label7backendmapping = val;
                    this._tab2label7inputvalue = val;
                }
            });
            defineGetter(this, "field7LabelTab2", function() {
                return this._tab2label7backendmapping;
            });

            defineSetter(this, "field8LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label8backendmapping = val;
                    this._tab2label8inputvalue = val;
                }
            });
            defineGetter(this, "field8LabelTab2", function() {
                return this._tab2label8backendmapping;
            });

            defineSetter(this, "field9LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label9backendmapping = val;
                    this._tab2label9inputvalue = val;
                }
            });
            defineGetter(this, "field9LabelTab2", function() {
                return this._tab2label9backendmapping;
            });

            defineSetter(this, "field10LabelTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2label10backendmapping = val;
                    this._tab2label10inputvalue = val;
                }
            });
            defineGetter(this, "field10LabelTab2", function() {
                return this._tab2label10backendmapping;
            });

            // Tab 2 type setters and getters.          
            defineSetter(this, "field1TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field1type = val;
                    this._tab2field1typeoriginalValue = val;
                }
            });
            defineGetter(this, "field1TypeTab2", function() {
                return this._tab2field1type;
            });

            defineSetter(this, "field2TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field2type = val;
                    this._tab2field2typeoriginalValue = val;
                }
            });
            defineGetter(this, "field2TypeTab2", function() {
                return this._tab2field2type;
            });

            defineSetter(this, "field3TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field3type = val;
                    this._tab2field3typeoriginalValue = val;
                }
            });
            defineGetter(this, "field3TypeTab2", function() {
                return this._tab2field3type;
            });

            defineSetter(this, "field4TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field4type = val;
                    this._tab2field4typeoriginalValue = val;
                }
            });
            defineGetter(this, "field4TypeTab2", function() {
                return this._tab2field4type;
            });

            defineSetter(this, "field5TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field5type = val;
                    this._tab2field5typeoriginalValue = val;
                }
            });
            defineGetter(this, "field5TypeTab2", function() {
                return this._tab2field5type;
            });

            defineSetter(this, "field6TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field6type = val;
                    this._tab2field6typeoriginalValue = val;
                }
            });
            defineGetter(this, "field6TypeTab2", function() {
                return this._tab2field6type;
            });

            defineSetter(this, "field7TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field7type = val;
                    this._tab2field7typeoriginalValue = val;
                }
            });
            defineGetter(this, "field7TypeTab2", function() {
                return this._tab2field7type;
            });

            defineSetter(this, "field8TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field8type = val;
                    this._tab2field8typeoriginalValue = val;
                }
            });
            defineGetter(this, "field8TypeTab2", function() {
                return this._tab2field8type;
            });

            defineSetter(this, "field9TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field9type = val;
                    this._tab2field9typeoriginalValue = val;
                }
            });
            defineGetter(this, "field9TypeTab2", function() {
                return this._tab2field9type;
            });

            defineSetter(this, "field10TypeTab2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab2field10type = val;
                    this._tab2field10typeoriginalValue = val;
                }
            });
            defineGetter(this, "field10TypeTab2", function() {
                return this._tab2field10type;
            });

            // Tab 3 value setters and getters.
            defineSetter(this, "field1ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field1backendmapping = val;
                    this._tab3field1inputvalue = val;
                }
            });
            defineGetter(this, "field1ValueTab3", function() {
                return this._tab3field1backendmapping;
            });

            defineSetter(this, "field2ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field2backendmapping = val;
                    this._tab3field2inputvalue = val;
                }
            });
            defineGetter(this, "field2ValueTab3", function() {
                return this._tab3field2backendmapping;
            });

            defineSetter(this, "field3ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field3backendmapping = val;
                    this._tab3field3inputvalue = val;
                }
            });
            defineGetter(this, "field3ValueTab3", function() {
                return this._tab3field3backendmapping;
            });

            defineSetter(this, "field4ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field4backendmapping = val;
                    this._tab3field4inputvalue = val;
                }
            });
            defineGetter(this, "field4ValueTab3", function() {
                return this._tab3field4backendmapping;
            });

            defineSetter(this, "field5ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field5backendmapping = val;
                    this._tab3field5inputvalue = val;
                }
            });
            defineGetter(this, "field5ValueTab3", function() {
                return this._tab3field5backendmapping;
            });

            defineSetter(this, "field6ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field6backendmapping = val;
                    this._tab3field6inputvalue = val;
                }
            });
            defineGetter(this, "field6ValueTab3", function() {
                return this._tab3field6backendmapping;
            });

            defineSetter(this, "field7ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field7backendmapping = val;
                    this._tab3field7inputvalue = val;
                }
            });
            defineGetter(this, "field7ValueTab3", function() {
                return this._tab3field7backendmapping;
            });

            defineSetter(this, "field8ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field8backendmapping = val;
                    this._tab3field8inputvalue = val;
                }
            });
            defineGetter(this, "field8ValueTab3", function() {
                return this._tab3field8backendmapping;
            });

            defineSetter(this, "field9ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field9backendmapping = val;
                    this._tab3field9inputvalue = val;
                }
            });
            defineGetter(this, "field9ValueTab3", function() {
                return this._tab3field9backendmapping;
            });

            defineSetter(this, "field10ValueTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field10backendmapping = val;
                    this._tab3field10inputvalue = val;
                }
            });
            defineGetter(this, "field10ValueTab3", function() {
                return this._tab3field10backendmapping;
            });

            // Tab 3 label setters and getters.
            defineSetter(this, "field1LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label1backendmapping = val;
                    this._tab3label1inputvalue = val;
                }
            });
            defineGetter(this, "field1LabelTab3", function() {
                return this._tab3label1backendmapping;
            });

            defineSetter(this, "field2LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label2backendmapping = val;
                    this._tab3label2inputvalue = val;
                }
            });
            defineGetter(this, "field2LabelTab3", function() {
                return this._tab3label2backendmapping;
            });

            defineSetter(this, "field3LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label3backendmapping = val;
                    this._tab3label3inputvalue = val;
                }
            });
            defineGetter(this, "field3LabelTab3", function() {
                return this._tab3label3backendmapping;
            });

            defineSetter(this, "field4LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label4backendmapping = val;
                    this._tab3label4inputvalue = val;
                }
            });
            defineGetter(this, "field4LabelTab3", function() {
                return this._tab3label4backendmapping;
            });

            defineSetter(this, "field5LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label5backendmapping = val;
                    this._tab3label5inputvalue = val;
                }
            });
            defineGetter(this, "field5LabelTab3", function() {
                return this._tab3label5backendmapping;
            });

            defineSetter(this, "field6LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label6backendmapping = val;
                    this._tab3label6inputvalue = val;
                }
            });
            defineGetter(this, "field6LabelTab3", function() {
                return this._tab3label6backendmapping;
            });

            defineSetter(this, "field7LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label7backendmapping = val;
                    this._tab3label7inputvalue = val;
                }
            });
            defineGetter(this, "field7LabelTab3", function() {
                return this._tab3label7backendmapping;
            });

            defineSetter(this, "field8LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label8backendmapping = val;
                    this._tab3label8inputvalue = val;
                }
            });
            defineGetter(this, "field8LabelTab1", function() {
                return this._tab1label8backendmapping;
            });

            defineSetter(this, "field9LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label9backendmapping = val;
                    this._tab3label9inputvalue = val;
                }
            });
            defineGetter(this, "field9LabelTab3", function() {
                return this._tab3label9backendmapping;
            });

            defineSetter(this, "field10LabelTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3label10backendmapping = val;
                    this._tab3label10inputvalue = val;
                }
            });
            defineGetter(this, "field10LabelTab3", function() {
                return this._tab3label10backendmapping;
            });

            // Tab 3 type setters and getters.     
            defineSetter(this, "field1TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field1type = val;
                    this._tab3field1typeoriginalValue = val;
                }
            });
            defineGetter(this, "field1TypeTab3", function() {
                return this._tab3field1type;
            });

            defineSetter(this, "field2TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field2type = val;
                    this._tab3field2typeoriginalValue = val;
                }
            });
            defineGetter(this, "field2TypeTab3", function() {
                return this._tab3field2type;
            });

            defineSetter(this, "field3TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field3type = val;
                    this._tab3field3typeoriginalValue = val;
                }
            });
            defineGetter(this, "field3TypeTab3", function() {
                return this._tab3field3type;
            });

            defineSetter(this, "field4TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field4type = val;
                    this._tab3field4typeoriginalValue = val;
                }
            });
            defineGetter(this, "field4TypeTab3", function() {
                return this._tab3field4type;
            });

            defineSetter(this, "field5TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field5type = val;
                    this._tab3field5typeoriginalValue = val;
                }
            });
            defineGetter(this, "field5TypeTab3", function() {
                return this._tab3field5type;
            });

            defineSetter(this, "field6TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field6type = val;
                    this._tab3field6typeoriginalValue = val;
                }
            });
            defineGetter(this, "field6TypeTab3", function() {
                return this._tab3field6type;
            });

            defineSetter(this, "field7TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field7type = val;
                    this._tab3field7typeoriginalValue = val;
                }
            });
            defineGetter(this, "field7TypeTab3", function() {
                return this._tab3field7type;
            });

            defineSetter(this, "field8TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field8type = val;
                    this._tab3field8typeoriginalValue = val;
                }
            });
            defineGetter(this, "field8TypeTab3", function() {
                return this._tab3field8type;
            });

            defineSetter(this, "field9TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field9type = val;
                    this._tab3field9typeoriginalValue = val;
                }
            });
            defineGetter(this, "field9TypeTab3", function() {
                return this._tab3field9type;
            });

            defineSetter(this, "field10TypeTab3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab3field10type = val;
                    this._tab3field10typeoriginalValue = val;
                }
            });
            defineGetter(this, "field10TypeTab3", function() {
                return this._tab3field10type;
            });

            // Tab 4 value setters and getters.
            defineSetter(this, "field1ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field1backendmapping = val;
                    this._tab4field1inputvalue = val;
                }
            });
            defineGetter(this, "field1ValueTab4", function() {
                return this._tab4field1backendmapping;
            });

            defineSetter(this, "field2ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field2backendmapping = val;
                    this._tab4field2inputvalue = val;
                }
            });
            defineGetter(this, "field2ValueTab4", function() {
                return this._tab4field2backendmapping;
            });

            defineSetter(this, "field3ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field3backendmapping = val;
                    this._tab4field3inputvalue = val;
                }
            });
            defineGetter(this, "field3ValueTab4", function() {
                return this._tab4field3backendmapping;
            });

            defineSetter(this, "field4ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field4backendmapping = val;
                    this._tab4field4inputvalue = val;
                }
            });
            defineGetter(this, "field4ValueTab4", function() {
                return this._tab4field4backendmapping;
            });

            defineSetter(this, "field5ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field5backendmapping = val;
                    this._tab4field5inputvalue = val;
                }
            });
            defineGetter(this, "field5ValueTab4", function() {
                return this._tab4field5backendmapping;
            });

            defineSetter(this, "field6ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field6backendmapping = val;
                    this._tab4field6inputvalue = val;
                }
            });
            defineGetter(this, "field6ValueTab4", function() {
                return this._tab4field6backendmapping;
            });

            defineSetter(this, "field7ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field7backendmapping = val;
                    this._tab4field7inputvalue = val;
                }
            });
            defineGetter(this, "field7ValueTab4", function() {
                return this._tab4field7backendmapping;
            });

            defineSetter(this, "field8ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field8backendmapping = val;
                    this._tab4field8inputvalue = val;
                }
            });
            defineGetter(this, "field8ValueTab4", function() {
                return this._tab4field8backendmapping;
            });

            defineSetter(this, "field9ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field9backendmapping = val;
                    this._tab4field9inputvalue = val;
                }
            });
            defineGetter(this, "field9ValueTab4", function() {
                return this._tab4field9backendmapping;
            });

            defineSetter(this, "field10ValueTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field10backendmapping = val;
                    this._tab4field10inputvalue = val;
                }
            });
            defineGetter(this, "field10ValueTab4", function() {
                return this._tab4field10backendmapping;
            });

            // Tab 4 label setters and getters.
            defineSetter(this, "field1LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label1backendmapping = val;
                    this._tab4label1inputvalue = val;
                }
            });
            defineGetter(this, "field1LabelTab4", function() {
                return this._tab4label1backendmapping;
            });

            defineSetter(this, "field2LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label2backendmapping = val;
                    this._tab4label2inputvalue = val;
                }
            });
            defineGetter(this, "field2LabelTab4", function() {
                return this._tab4label2backendmapping;
            });

            defineSetter(this, "field3LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label3backendmapping = val;
                    this._tab4label3inputvalue = val;
                }
            });
            defineGetter(this, "field3LabelTab4", function() {
                return this._tab4label3backendmapping;
            });

            defineSetter(this, "field4LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label4backendmapping = val;
                    this._tab4label4inputvalue = val;
                }
            });
            defineGetter(this, "field4LabelTab4", function() {
                return this._tab4label4backendmapping;
            });

            defineSetter(this, "field5LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label5backendmapping = val;
                    this._tab4label5inputvalue = val;
                }
            });
            defineGetter(this, "field5LabelTab4", function() {
                return this._tab4label5backendmapping;
            });

            defineSetter(this, "field6LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label6backendmapping = val;
                    this._tab4label6inputvalue = val;
                }
            });
            defineGetter(this, "field6LabelTab4", function() {
                return this._tab4label6backendmapping;
            });

            defineSetter(this, "field7LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label7backendmapping = val;
                    this._tab4label7inputvalue = val;
                }
            });
            defineGetter(this, "field7LabelTab4", function() {
                return this._tab4label7backendmapping;
            });

            defineSetter(this, "field8LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label8backendmapping = val;
                    this._tab4label8inputvalue = val;
                }
            });
            defineGetter(this, "field8LabelTab4", function() {
                return this._tab4label8backendmapping;
            });

            defineSetter(this, "field9LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label9backendmapping = val;
                    this._tab4label9inputvalue = val;
                }
            });
            defineGetter(this, "field9LabelTab4", function() {
                return this._tab4label9backendmapping;
            });

            defineSetter(this, "field10LabelTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4label10backendmapping = val;
                    this._tab4label10inputvalue = val;
                }
            });
            defineGetter(this, "field10LabelTab4", function() {
                return this._tab4label10backendmapping;
            });

            // Tab 4 type setters and getters.     
            defineSetter(this, "field1TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field1type = val;
                    this._tab4field1typeoriginalValue = val;
                }
            });
            defineGetter(this, "field1TypeTab4", function() {
                return this._tab4field1type;
            });

            defineSetter(this, "field2TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field2type = val;
                    this._tab4field2typeoriginalValue = val;
                }
            });
            defineGetter(this, "field2TypeTab4", function() {
                return this._tab4field2type;
            });

            defineSetter(this, "field3TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field3type = val;
                    this._tab4field3typeoriginalValue = val;
                }
            });
            defineGetter(this, "field3TypeTab4", function() {
                return this._tab4field3type;
            });

            defineSetter(this, "field4TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field4type = val;
                    this._tab4field4typeoriginalValue = val;
                }
            });
            defineGetter(this, "field4TypeTab4", function() {
                return this._tab4field4type;
            });

            defineSetter(this, "field5TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field5type = val;
                    this._tab4field5typeoriginalValue = val;
                }
            });
            defineGetter(this, "field5TypeTab4", function() {
                return this._tab4field5type;
            });

            defineSetter(this, "field6TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field6type = val;
                    this._tab4field6typeoriginalValue = val;
                }
            });
            defineGetter(this, "field6TypeTab4", function() {
                return this._tab4field6type;
            });

            defineSetter(this, "field7TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field7type = val;
                    this._tab4field7typeoriginalValue = val;
                }
            });
            defineGetter(this, "field7TypeTab4", function() {
                return this._tab4field7type;
            });

            defineSetter(this, "field8TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field8type = val;
                    this._tab4field8typeoriginalValue = val;
                }
            });
            defineGetter(this, "field8TypeTab4", function() {
                return this._tab4field8type;
            });

            defineSetter(this, "field9TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field9type = val;
                    this._tab4field9typeoriginalValue = val;
                }
            });
            defineGetter(this, "field9TypeTab4", function() {
                return this._tab4field9type;
            });

            defineSetter(this, "field10TypeTab4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tab4field10type = val;
                    this._tab4field10typeoriginalValue = val;
                }
            });
            defineGetter(this, "field10TypeTab4", function() {
                return this._tab4field10type;
            });

            // Service properties setters and getters.
            defineSetter(this, "objectServiceName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectServiceName = val;
                }
            });
            defineGetter(this, "objectServiceName", function() {
                return this._objectServiceName;
            });

            defineSetter(this, "operationName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._operationName = val;
                }
            });
            defineGetter(this, "operationName", function() {
                return this._operationName;
            });

            defineSetter(this, "objectName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectName = val;
                }
            });
            defineGetter(this, "objectName", function() {
                return this._objectName;
            });

            defineSetter(this, "criteria", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._criteria = val;
                }
            });
            defineGetter(this, "criteria", function() {
                return this._criteria;
            });

            defineSetter(this, "serviceIdentifier", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._serviceIdentifier = val;
                }
            });
            defineGetter(this, "serviceIdentifier", function() {
                return this._serviceIdentifier;
            });

            //Skin properties and format values setters and getters.
            defineSetter(this, "bankNameSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._bankNameSkin = val;
                }
            });
            defineGetter(this, "bankNameSkin", function() {
                return this._bankNameSkin;
            });

            defineSetter(this, "headerBgSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._headerBgSkin = val;
                }
            });
            defineGetter(this, "headerBgSkin", function() {
                return this._headerBgSkin;
            });

            defineSetter(this, "tabHeaderSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tabHeaderSkin = val;
                }
            });
            defineGetter(this, "tabHeaderSkin", function() {
                return this._tabHeaderSkin;
            });

            defineSetter(this, "labelNameSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._labelNameSkin = val;
                }
            });
            defineGetter(this, "labelNameSkin", function() {
                return this._labelNameSkin;
            });

            defineSetter(this, "defaultValueSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._defaultValueSkin = val;
                }
            });
            defineGetter(this, "defaultValueSkin", function() {
                return this._defaultValueSkin;
            });

            defineSetter(this, "dateValueSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._dateValueSkin = val;
                }
            });
            defineGetter(this, "dateValueSkin", function() {
                return this._dateValueSkin;
            });

            defineSetter(this, "percentageValueSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._percentageValueSkin = val;
                }
            });
            defineGetter(this, "percentageValueSkin", function() {
                return this._percentageValueSkin;
            });

            defineSetter(this, "positiveValueSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._positiveValueSkin = val;
                }
            });
            defineGetter(this, "positiveValueSkin", function() {
                return this._positiveValueSkin;
            });

            defineSetter(this, "negativeValueSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._negativeValueSkin = val;
                }
            });
            defineGetter(this, "negativeValueSkin", function() {
                return this._negativeValueSkin;
            });

            defineSetter(this, "amountFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._amountFormat = val;
                }
            });
            defineGetter(this, "amountFormat", function() {
                return this._amountFormat;
            });

            defineSetter(this, "accountNumberSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountNumberSkin = val;
                }
            });
            defineGetter(this, "accountNumberSkin", function() {
                return this._accountNumberSkin;
            });

            defineSetter(this, "maskIconSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._maskIconSkin = val;
                }
            });
            defineGetter(this, "maskIconSkin", function() {
                return this._maskIconSkin;
            });

            defineSetter(this, "unmaskIconSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._unmaskIconSkin = val;
                }
            });
            defineGetter(this, "unmaskIconSkin", function() {
                return this._unmaskIconSkin;
            });

            defineSetter(this, "buttonSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._buttonSkin = val;
                }
            });
            defineGetter(this, "buttonSkin", function() {
                return this._buttonSkin;
            });

            defineSetter(this, "tabHeaderBGSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tabHeaderBgSkin = val;
                }
            });
            defineGetter(this, "tabHeaderBGSkin", function() {
                return this._tabHeaderBgSkin;
            });

            defineSetter(this, "tabDetailsBGSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._tabDetailsBgSkin = val;
                }
            });
            defineGetter(this, "tabDetailsBGSkin", function() {
                return this._tabDetailsBgSkin;
            });

            defineSetter(this, "bankNameBGSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._bankNameBgSkin = val;
                }
            });
            defineGetter(this, "bankNameBGSkin", function() {
                return this._bankNameBgSkin;
            });

            defineSetter(this, "dateFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._dateFormat = val;
                }
            });
            defineGetter(this, "dateFormat", function() {
                return this._dateFormat;
            });

            defineSetter(this, "backendDateFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._backendDateFormat = val;
                }
            });
            defineGetter(this, "backendDateFormat", function() {
                return this._backendDateFormat;
            });

            defineSetter(this, "accountNumberFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountNumberformat = val;
                }
            });
            defineGetter(this, "accountNumberFormat", function() {
                return this._accountNumberformat;
            });

            defineSetter(this, "maskingRequired", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._masking = val;
                }
            });
            defineGetter(this, "masking", function() {
                return this._masking;
            });

            defineSetter(this, "maskVizIcon", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._maskeyeicon = val;
                }
            });
            defineGetter(this, "maskVizIcon", function() {
                return this._maskeyeicon;
            });

            defineSetter(this, "unmaskVizIcon", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._unmaskeyeicon = val;
                }
            });
            defineGetter(this, "unmaskVizIcon", function() {
                return this._unmaskeyeicon;
            });

            defineSetter(this, "accountTypeContextPath", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountTypeContextPath = val;
                }
            });
            defineGetter(this, "accountTypeContextPath", function() {
                return this._accountTypeContextPath;
            });

            defineSetter(this, "currencyCodeContextPath", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._currencyCodeContextPath = val;
                }
            });
            defineGetter(this, "currencyCodeContextPath", function() {
                return this._currencyCodeContextPath;
            });

            defineSetter(this, "userTypeContextPath", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._userTypeContextPath = val;
                }
            });
            defineGetter(this, "userTypeContextPath", function() {
                return this._userTypeContextPath;
            });

            defineSetter(this, "accountName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountName = val;
                }
            });
            defineGetter(this, "accountName", function() {
                return this._accountName;
            });

            defineSetter(this, "nickName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._nickName = val;
                }
            });
            defineGetter(this, "nickName", function() {
                return this._nickName;
            });

            defineSetter(this, "noOfEllipsis", function(val) {
                if ((typeof val === 'number') && (val !== "")) {
                    this._noOfEllipsis = val;
                }
            });
            defineGetter(this, "noOfEllipsis", function() {
                return this._noOfEllipsis;
            });

            defineSetter(this, "noOfCharacters", function(val) {
                if ((typeof val === 'number') && (val !== "")) {
                    this._noOfCharacters = val;
                }
            });
            defineGetter(this, "noOfCharacters", function() {
                return this._noOfCharacters;
            });

            defineSetter(this, "businessAccount", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._businessAccount = val;
                }
            });
            defineGetter(this, "businessAccount", function() {
                return this._businessAccount;
            });
        },

        /**
         * Component getCriteria.
         * Parse the criteria from configuration.
         * @param: criteria{string} - service criteria collected from exposed contract.
         * @return : {JSONObject} - jsonvalue for criteria.
         */
        getCriteria: function(criteria) {
            var criteriaJSON = JSON.parse(criteria);
            for (var key in criteriaJSON) {
                criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
            }
            return criteriaJSON;
        },

        /**
         * Component setContext.
         * To collect the context object required for the component.
         * @param: context{JSONobject} - account object. 
         */
        setContext: function(context) {
            this.context = context;
        },

        /**
         * Component setUserContext.
         * To collect the user context value required for the component. 
         * @param: context{String}.
         */
        setUserContext: function(context) {
            var scope = this;
            scope.showIndication = context;
        },

        /**
         * Component setAccountTypeFromContext.
         * To set account type from the context object.
         */
        setAccountTypeFromContext: function() {
            this.accountType = this.parserUtilsManager.getParsedValue(this._accountTypeContextPath);
        },

        /**
         * Component setCurrencyCodeFromContext.
         * To set currency code from the context object.
         */
        setCurrencyCodeFromContext: function() {
            this.currencyCode = this.parserUtilsManager.getParsedValue(this._currencyCodeContextPath);
        },

        /**
         * Component setUserTypeFromContext.
         * To set user type from the context object.
         */
        setUserTypeFromContext: function() {
            this.userType = this.parserUtilsManager.getParsedValue(this._userTypeContextPath);
        },

        /**
         * Component restoreBackupdata.
         * To restore data from backup variables.
         */
        restoreBackupdata: function() {
            var scope = this;
            try {
                for (var i = 1; i <= 4; i++) {
                    scope["_tab" + i + "TitleValue"] = scope["_tab" + i + "TitlebtnOriginalValue"];
                    for (var j = 1; j <= 10; j++) {
                        scope["_tab" + i + "field" + j + "backendmapping"] = scope["_tab" + i + "field" + j + "inputvalue"];
                        scope["_tab" + i + "field" + j + "type"] = scope["_tab" + i + "field" + j + "typeoriginalValue"];
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in restoreBackupdata method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component postShow.
         * Reponsible to retain the data for custom properties for multiple entries into the component.
         * Invoke the DAO layer to collect information from the service.
         */
        postShow: function() {
            var scopeObj = this;
            try {
                if(kony.os.deviceInfo().name === "iPhone") {
                 this.view.flxHeader.setVisibility(true);
                } else {
                  this.view.flxHeader.setVisibility(false);
                }
                scopeObj.restoreBackupdata();
                scopeObj.parserUtilsManager.setContext(scopeObj.context);
                scopeObj.setAccountTypeFromContext();
                scopeObj.setCurrencyCodeFromContext();
                scopeObj.setUserTypeFromContext();
                scopeObj.setLabelSkins();
                scopeObj.bindAccountTypeStaticData();
                scopeObj.view.btnContactUs.onClick = scopeObj.onContactUsButtonClick;
                if (scopeObj._objectServiceName && scopeObj._operationName && scopeObj._objectName) {
                    scopeObj.requestStart();
                    scopeObj.accountsDAO.fetchAccountDetails(
                        scopeObj._objectServiceName, scopeObj._operationName, scopeObj._objectName,
                        scopeObj.getCriteria(scopeObj._criteria), scopeObj._serviceIdentifier, scopeObj.prepareObjectForTheView, scopeObj.errorCallback);
                } else {
                    scopeObj.bindServiceResponse();
                }
                scopeObj.view.forceLayout();
                scopeObj.requestEnd();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in postShow method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component bindData.
         * Reponsible to read the format values from configuration and 
         * call the tab wise set data methods based on tab visibility.
         */
        bindData: function() {
            var scope = this;
            try {
                var formatValues = {
                    "DETAILS_AMOUNT_SKIN": scope._defaultValueSkin,
                    "DATE_SKIN": scope._dateValueSkin,
                    "PERCENTAGE_SKIN": scope._percentageValueSkin,
                    "ACCOUNT_NUMBER_SKIN": scope._accountNumberSkin,
                    "AMOUNT_FORMAT": scope._amountFormat,
                    "TEXT_SKIN": scope._defaultValueSkin,
                    "POSITIVE_AMOUNT_SKIN": scope._positiveValueSkin,
                    "NEGATIVE_AMOUNT_SKIN": scope._negativeValueSkin,
                    "DATE_FORMAT": scope._dateFormat,
                    "BACKEND_DATE_FORMAT": scope._backendDateFormat,
                    "ACCOUNT_NUMBER_FORMAT": scope._accountNumberformat,
                    "MASKING": scope._masking,
                    "MASK_EYE_ICON": scope._maskeyeicon,
                    "UNMASK_EYE_ICON": scope._unmaskeyeicon,
                    "MASK_EYE_ICON_SKIN": scope._maskIconSkin,
                    "UNMASK_EYE_ICON_SKIN": scope._unmaskIconSkin,
                    "CURRENCY_SYMBOL_CODE": scope.currencyCode,
                };
                scope.setHeaderLabelText();
                scope.setIndicationsVisible();
                scope.setTab1FormatValue(formatValues);
                if (scope._visibleTab2) {
                    scope.setTab2FormatValue(formatValues);
                }
                if (scope._visibleTab3) {
                    scope.setTab3FormatValue(formatValues);
                }
                if (scope._visibleTab4) {
                    scope.setTab4FormatValue(formatValues);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in bindData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /** 
         * Component setTab1FormatValue.
         * Set the formatvalues for tab1
         * @param: formatValues{JSONObject} - format values taken from configuration.
         */
        setTab1FormatValue: function(formatValues) {
            var scope = this;
            try {
                var tab1field1data = {
                    "text": scope._tab1field1backendmapping,
                    "type": scope._tab1field1type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field1Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field1data, formatValues, scope.view.flxTab1Field1Value);
                } else {
                    scope.view.flxTab1Field1Value.addAt(scope.formatValueUtils.formatText(tab1field1data, formatValues, scope.view.flxTab1Field1Value), 1);
                }
                var tab1field2data = {
                    "text": scope._tab1field2backendmapping,
                    "type": scope._tab1field2type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field2inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field2inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field2Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field2data, formatValues, scope.view.flxTab1Field2Value);
                } else {
                    scope.view.flxTab1Field2Value.addAt(scope.formatValueUtils.formatText(tab1field2data, formatValues, scope.view.flxTab1Field2Value), 1);
                }
                var tab1field3data = {
                    "text": scope._tab1field3backendmapping,
                    "type": scope._tab1field3type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field3inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field3inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field3Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field3data, formatValues, scope.view.flxTab1Field3Value);
                } else {
                    scope.view.flxTab1Field3Value.addAt(scope.formatValueUtils.formatText(tab1field3data, formatValues, scope.view.flxTab1Field3Value), 1);
                }
                var tab1field4data = {
                    "text": scope._tab1field4backendmapping,
                    "type": scope._tab1field4type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field4inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field4inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field4Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field4data, formatValues, scope.view.flxTab1Field4Value);
                } else {
                    scope.view.flxTab1Field4Value.addAt(scope.formatValueUtils.formatText(tab1field4data, formatValues, scope.view.flxTab1Field4Value), 1);
                }
                var tab1field5data = {
                    "text": scope._tab1field5backendmapping,
                    "type": scope._tab1field5type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field5inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field5inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field5Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field5data, formatValues, scope.view.flxTab1Field5Value);
                } else {
                    scope.view.flxTab1Field5Value.addAt(scope.formatValueUtils.formatText(tab1field5data, formatValues, scope.view.flxTab1Field5Value), 1);
                }
                if (scope.context["Accounts[0].accountType"] === "Savings" || scope.context["Accounts[0].accountType"] === "Checking") {
                    if (scope.isEmptyNullUndefined(this._tab1field7backendmapping)) {
                        if (scope.context["Accounts[0].availableBalance"] < 0) {
                            scope.view.flxTab1Field7.isVisible = true;
                            scope.view.flxTab1Field6.isVisible = false;
                            this._tab1field7backendmapping = scope.context["Accounts[0].availableBalance"];
                        } else {
                            scope.view.flxTab1Field7.isVisible = false;
                            scope.view.flxTab1Field6.isVisible = false;
                        }
                    } else {
                        scope.view.flxTab1Field7.isVisible = true;
                        scope.view.flxTab1Field6.isVisible = true;
                    }
                }
                var tab1field6data = {
                    "text": scope._tab1field6backendmapping,
                    "type": scope._tab1field6type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field6inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field6inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field6Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field6data, formatValues, scope.view.flxTab1Field6Value);
                } else {
                    scope.view.flxTab1Field6Value.addAt(scope.formatValueUtils.formatText(tab1field6data, formatValues, scope.view.flxTab1Field6Value), 1);
                }
                var tab1field7data = {
                    "text": scope._tab1field7backendmapping,
                    "type": scope._tab1field7type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field7inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field7inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field7Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field7data, formatValues, scope.view.flxTab1Field7Value);
                } else {
                    scope.view.flxTab1Field7Value.addAt(scope.formatValueUtils.formatText(tab1field7data, formatValues, scope.view.flxTab1Field7Value), 1);
                }
                var tab1field8data = {
                    "text": scope._tab1field8backendmapping,
                    "type": scope._tab1field8type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field8inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field8inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field8Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field8data, formatValues, scope.view.flxTab1Field8Value);
                } else {
                    scope.view.flxTab1Field8Value.addAt(scope.formatValueUtils.formatText(tab1field8data, formatValues, scope.view.flxTab1Field8Value), 1);
                }
                var tab1field9data = {
                    "text": scope._tab1field9backendmapping,
                    "type": scope._tab1field9type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field9inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field9inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field9Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field9data, formatValues, scope.view.flxTab1Field9Value);
                } else {
                    scope.view.flxTab1Field9Value.addAt(scope.formatValueUtils.formatText(tab1field9data, formatValues, scope.view.flxTab1Field9Value), 1);
                }
                var tab1field10data = {
                    "text": scope._tab1field10backendmapping,
                    "type": scope._tab1field10type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field10inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab1field10inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab1Field10Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab1field10data, formatValues, scope.view.flxTab1Field10Value);
                } else {
                    scope.view.flxTab1Field10Value.addAt(scope.formatValueUtils.formatText(tab1field10data, formatValues, scope.view.flxTab1Field10Value), 1);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setTab1FormatValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /** 
         * Component setTab2FormatValue.
         * Set the formatvalues for tab2.
         * @param: formatValues{JSONObject} - format values taken from configuration.
         */
        setTab2FormatValue: function(formatValues) {
            var scope = this;
            try {
                var tab2field1data = {
                    "text": scope._tab2field1backendmapping,
                    "type": scope._tab2field1type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field1inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field1inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field1Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field1data, formatValues, scope.view.flxTab2Field1Value);
                } else {
                    scope.view.flxTab2Field1Value.addAt(scope.formatValueUtils.formatText(tab2field1data, formatValues, scope.view.flxTab2Field1Value), 1);
                }
                var tab2field2data = {
                    "text": this._tab2field2backendmapping,
                    "type": this._tab2field2type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field2inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field2inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field2Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field2data, formatValues, scope.view.flxTab2Field2Value);
                } else {
                    scope.view.flxTab2Field2Value.addAt(scope.formatValueUtils.formatText(tab2field2data, formatValues, scope.view.flxTab2Field2Value), 1);
                }
                var tab2field3data = {
                    "text": scope._tab2field3backendmapping,
                    "type": scope._tab2field3type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field3inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field3inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field3Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field3data, formatValues, scope.view.flxTab2Field3Value);
                } else {
                    scope.view.flxTab2Field3Value.addAt(scope.formatValueUtils.formatText(tab2field3data, formatValues, scope.view.flxTab2Field3Value), 1);
                }
                var tab2field4data = {
                    "text": scope._tab2field4backendmapping,
                    "type": scope._tab2field4type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field4inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field4inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field4Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field4data, formatValues, scope.view.flxTab2Field4Value);
                } else {
                    scope.view.flxTab2Field4Value.addAt(scope.formatValueUtils.formatText(tab2field4data, formatValues, scope.view.flxTab2Field4Value), 1);
                }
                var tab2field5data = {
                    "text": scope._tab2field5backendmapping,
                    "type": scope._tab2field5type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field5inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field5inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field5Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field5data, formatValues, scope.view.flxTab2Field5Value);
                } else {
                    scope.view.flxTab2Field5Value.addAt(scope.formatValueUtils.formatText(tab2field5data, formatValues, scope.view.flxTab2Field5Value), 1);
                }
                var tab2field6data = {
                    "text": scope._tab2field6backendmapping,
                    "type": scope._tab2field6type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field6inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field6inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field6Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field6data, formatValues, scope.view.flxTab2Field6Value);
                } else {
                    scope.view.flxTab2Field6Value.addAt(scope.formatValueUtils.formatText(tab2field6data, formatValues, scope.view.flxTab2Field6Value), 1);
                }
                var tab2field7data = {
                    "text": scope._tab2field7backendmapping,
                    "type": scope._tab2field7type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field7inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field7inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field7Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field7data, formatValues, scope.view.flxTab2Field7Value);
                } else {
                    scope.view.flxTab2Field7Value.addAt(scope.formatValueUtils.formatText(tab2field7data, formatValues, scope.view.flxTab2Field7Value), 1);
                }
                var tab2field8data = {
                    "text": scope._tab2field8backendmapping,
                    "type": scope._tab2field8type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field8inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field8inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field8Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field8data, formatValues, scope.view.flxTab2Field8Value);
                } else {
                    scope.view.flxTab2Field8Value.addAt(scope.formatValueUtils.formatText(tab2field8data, formatValues, scope.view.flxTab2Field8Value), 1);
                }
                var tab2field9data = {
                    "text": scope._tab2field9backendmapping,
                    "type": scope._tab2field9type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field9inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field9inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field9Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field9data, formatValues, scope.view.flxTab2Field9Value);
                } else {
                    scope.view.flxTab2Field9Value.addAt(scope.formatValueUtils.formatText(tab2field9data, formatValues, scope.view.flxTab2Field9Value), 1);
                }
                var tab2field10data = {
                    "text": scope._tab2field10backendmapping,
                    "type": scope._tab2field10type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field10inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab2field10inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab2Field10Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab2field10data, formatValues, scope.view.flxTab2Field10Value);
                } else {
                    scope.view.flxTab2Field10Value.addAt(scope.formatValueUtils.formatText(tab2field10data, formatValues, scope.view.flxTab2Field10Value), 1);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setTab2FormatValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /** 
         * Component setTab3FormatValue.
         * Set the formatvalues for tab3.
         * @param: formatValues{JSONObject} - format values taken from configuration.
         */
        setTab3FormatValue: function(formatValues) {
            var scope = this;
            try {
                var tab3field1data = {
                    "text": scope._tab3field1backendmapping,
                    "type": scope._tab3field1type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field1inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height"),
                        "reverseLayoutDirection": scope.parseJsonAndGetValue(scope._tab3field1inputvalue, "reverseLayoutDirection")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field1inputvalue, "labelWidth"),
                        "left": scope.parseJsonAndGetValue(scope._tab3field1inputvalue, "left"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field1Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field1data, formatValues, scope.view.flxTab3Field1Value);
                } else {
                    scope.view.flxTab3Field1Value.addAt(scope.formatValueUtils.formatText(tab3field1data, formatValues, scope.view.flxTab3Field1Value), 1);
                }
                var tab3field2data = {
                    "text": scope._tab3field2backendmapping,
                    "type": scope._tab3field2type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "height"),
                        "reverseLayoutDirection": scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "reverseLayoutDirection")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "labelWidth"),
                        "left": scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "left"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab3field2inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field2Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field2data, formatValues, scope.view.flxTab3Field2Value);
                } else {
                    scope.view.flxTab3Field2Value.addAt(scope.formatValueUtils.formatText(tab3field2data, formatValues, scope.view.flxTab3Field2Value), 1);
                }
                var tab3field3data = {
                    "text": scope._tab3field3backendmapping,
                    "type": scope._tab3field3type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field3inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field3inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field3Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field3data, formatValues, scope.view.flxTab3Field3Value);
                } else {
                    scope.view.flxTab3Field3Value.addAt(scope.formatValueUtils.formatText(tab3field3data, formatValues, scope.view.flxTab3Field3Value), 1);
                }
                var tab3field4data = {
                    "text": scope._tab3field4backendmapping,
                    "type": scope._tab3field4type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field4inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field4inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field4Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field4data, formatValues, scope.view.flxTab3Field4Value);
                } else {
                    scope.view.flxTab3Field4Value.addAt(scope.formatValueUtils.formatText(tab3field4data, formatValues, scope.view.flxTab3Field4Value), 1);
                }
                var tab3field5data = {
                    "text": scope._tab3field5backendmapping,
                    "type": scope._tab3field5type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field5inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field5inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field5Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field5data, formatValues, scope.view.flxTab3Field5Value);
                } else {
                    scope.view.flxTab3Field5Value.addAt(scope.formatValueUtils.formatText(tab3field5data, formatValues, scope.view.flxTab3Field5Value), 1);
                }
                var tab3field6data = {
                    "text": scope._tab3field6backendmapping,
                    "type": scope._tab3field6type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field6inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field6inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field6Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field6data, formatValues, scope.view.flxTab3Field6Value);
                } else {
                    scope.view.flxTab3Field6Value.addAt(scope.formatValueUtils.formatText(tab3field6data, formatValues, scope.view.flxTab3Field6Value), 1);
                }
                var tab3field7data = {
                    "text": scope._tab3field7backendmapping,
                    "type": scope._tab3field7type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field7inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field7inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field7Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field7data, formatValues, scope.view.flxTab3Field7Value);
                } else {
                    scope.view.flxTab3Field7Value.addAt(scope.formatValueUtils.formatText(tab3field7data, formatValues, scope.view.flxTab3Field7Value), 1);
                }
                var tab3field8data = {
                    "text": scope._tab3field8backendmapping,
                    "type": scope._tab3field8type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field8inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field8inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field8Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field8data, formatValues, scope.view.flxTab3Field8Value);
                } else {
                    scope.view.flxTab3Field8Value.addAt(scope.formatValueUtils.formatText(tab3field8data, formatValues, scope.view.flxTab3Field8Value), 1);
                }
                var tab3field9data = {
                    "text": scope._tab3field9backendmapping,
                    "type": scope._tab3field9type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field9inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field9inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field9Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field9data, formatValues, scope.view.flxTab3Field9Value);
                } else {
                    scope.view.flxTab3Field9Value.addAt(scope.formatValueUtils.formatText(tab3field9data, formatValues, scope.view.flxTab3Field9Value), 1);
                }
                var tab3field10data = {
                    "text": scope._tab3field10backendmapping,
                    "type": scope._tab3field10type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field10inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab3field10inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab3Field10Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab3field10data, formatValues, scope.view.flxTab3Field10Value);
                } else {
                    scope.view.flxTab3Field10Value.addAt(scope.formatValueUtils.formatText(tab3field10data, formatValues, scope.view.flxTab3Field10Value), 1);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setTab3FormatValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /** 
         * Component setTab4FormatValue.
         * Set the formatvalues for tab4.
         * @param: formatValues{JSONObject} - format values taken from configuration.
         */
        setTab4FormatValue: function(formatValues) {
            var scope = this;
            try {
                var tab4field1data = {
                    "text": scope._tab4field1backendmapping,
                    "type": scope._tab4field1type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field1inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field1inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field1Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field1data, formatValues, scope.view.flxTab4Field1Value);
                } else {
                    scope.view.flxTab4Field1Value.addAt(scope.formatValueUtils.formatText(tab4field1data, formatValues, scope.view.flxTab4Field1Value), 1);
                }
                var tab4field2data = {
                    "text": scope._tab4field2backendmapping,
                    "type": scope._tab4field2type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field2inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field2inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field2Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field2data, formatValues, scope.view.flxTab4Field2Value);
                } else {
                    scope.view.flxTab4Field2Value.addAt(scope.formatValueUtils.formatText(tab4field2data, formatValues, scope.view.flxTab4Field2Value), 1);
                }
                var tab4field3data = {
                    "text": scope._tab4field3backendmapping,
                    "type": scope._tab4field3type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field3inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field3inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field3Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field3data, formatValues, scope.view.flxTab4Field3Value);
                } else {
                    scope.view.flxTab4Field3Value.addAt(scope.formatValueUtils.formatText(tab4field3data, formatValues, scope.view.flxTab4Field3Value), 1);
                }
                var tab4field4data = {
                    "text": scope._tab4field4backendmapping,
                    "type": scope._tab4field4type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field4inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field4inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field4Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field4data, formatValues, scope.view.flxTab4Field4Value);
                } else {
                    scope.view.flxTab4Field4Value.addAt(scope.formatValueUtils.formatText(tab4field4data, formatValues, scope.view.flxTab4Field4Value), 1);
                }
                var tab4field5data = {
                    "text": scope._tab4field5backendmapping,
                    "type": scope._tab4field5type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field5inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field5inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field5Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field5data, formatValues, scope.view.flxTab4Field5Value);
                } else {
                    scope.view.flxTab4Field5Value.addAt(scope.formatValueUtils.formatText(tab4field5data, formatValues, scope.view.flxTab4Field5Value), 1);
                }
                var tab4field6data = {
                    "text": scope._tab4field6backendmapping,
                    "type": scope._tab4field6type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field6inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field6inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field6Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field6data, formatValues, scope.view.flxTab4Field6Value);
                } else {
                    scope.view.flxTab4Field6Value.addAt(scope.formatValueUtils.formatText(tab4field6data, formatValues, scope.view.flxTab4Field6Value), 1);
                }
                var tab4field7data = {
                    "text": scope._tab4field7backendmapping,
                    "type": scope._tab4field7type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field7inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field7inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field7Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field7data, formatValues, scope.view.flxTab4Field7Value);
                } else {
                    scope.view.flxTab4Field7Value.addAt(scope.formatValueUtils.formatText(tab4field7data, formatValues, scope.view.flxTab4Field7Value), 1);
                }
                var tab4field8data = {
                    "text": scope._tab4field8backendmapping,
                    "type": scope._tab4field8type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field8inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field8inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field8Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field8data, formatValues, scope.view.flxTab4Field8Value);
                } else {
                    scope.view.flxTab4Field8Value.addAt(scope.formatValueUtils.formatText(tab4field8data, formatValues, scope.view.flxTab4Field8Value), 1);
                }
                var tab4field9data = {
                    "text": scope._tab4field9backendmapping,
                    "type": scope._tab4field9type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field9inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field9inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field9Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field9data, formatValues, scope.view.flxTab4Field9Value);
                } else {
                    scope.view.flxTab4Field9Value.addAt(scope.formatValueUtils.formatText(tab4field9data, formatValues, scope.view.flxTab4Field9Value), 1);
                }
                var tab4field10data = {
                    "text": scope._tab4field10backendmapping,
                    "type": scope._tab4field10type,
                    "widgetProp": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field10inputvalue, "width"),
                        "height": scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "height")
                    },
                    "widgetPropLabel": {
                        "width": scope.parseJsonAndGetValue(scope._tab4field10inputvalue, "labelWidth"),
                        "contentAlignment": constants[scope.parseJsonAndGetValue(scope._tab1field1inputvalue, "contentAlignment")]
                    },
                };
                if (scope.view.flxTab4Field10Value.widgets().length > 0) {
                    scope.formatValueUtils.formatText(tab4field10data, formatValues, scope.view.flxTab4Field10Value);
                } else {
                    scope.view.flxTab4Field10Value.addAt(scope.formatValueUtils.formatText(tab4field10data, formatValues, scope.view.flxTab4Field10Value), 1);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setTab4FormatValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component setFormattedData.
         * set value and type in format values.
         * @param: formatValues{JSONobject} - format values.
         * @param: text{string} - value of the field taken from configuration.
         * @param: type{string} - type of the field taken from configuration.
         * @return : {JSONobject} - Processed value.
         */
        setFormattedData: function(formatValues, text, type) {
            try {
                formatValues["FieldType"] = {
                    "type": type
                };
                var fieldValue = text ? text : "";
                formatValues["FieldValue"] = {
                    "value": fieldValue
                };
                return formatValues;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setFormattedData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component prepareObjectForTheView.
         * Assign the backend response to identifier and bind data to UI.
         * @param: backendResponse{JSONObject} - backend service response.
         * @param: unicode{string} - identifier string.
         */
        prepareObjectForTheView: function(backendResponse, unicode) {
            var scope = this;
            try {
                this.readObject(backendResponse);
                if (!kony.sdk.isNullOrUndefined(scope.accReference) && scope.accReference !== "") {
                    var key = scope.accReference + "." + "bankName";
                    scope.externalBankName = this.map[key];
                }
                scope.setExternalFlexVisible();
                scope.parserUtilsManager.setResponseData(unicode, this.map);
                scope.bindServiceResponse();
                scope.view.forceLayout();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in prepareObjectForTheView method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component setLabelSkins.
         * Set skin to label.
         * @param: skin{string} - skin to be set to the labels.
         */
        setLabelSkins: function() {
            var scope = this;
            try {
                scope.view.lblAccountType.skin = JSON.parse(scope._pageHeaderLabelSkin).skin;
                scope.view.flxHeader.skin = JSON.parse(scope._headerBgSkin).skin;
                scope.view.flxBankName.skin = JSON.parse(scope._bankNameBgSkin).skin;
                scope.view.blBankNameDA.skin = JSON.parse(scope._bankNameSkin).skin;
               // scope.view.btnContactUs.skin = JSON.parse(scope._buttonSkin).skin;
                for (var i = 1; i <= 4; i++) {
                    scope.view["flxTab" + i].skin = JSON.parse(scope._tabHeaderBgSkin).skin;
                    scope.view["flxTab" + i + "DetailsContainer"].skin = JSON.parse(scope._tabDetailsBgSkin).skin;
                    scope.view["lblTab" + i + "Header"].skin = JSON.parse(scope._tabHeaderSkin).skin;
                    for (var j = 1; j <= 10; j++) {
                        scope.view["lblTab" + i + "Field" + j + "Label"].skin = JSON.parse(scope._labelNameSkin).skin;
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setLabelSkins method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component bindServiceResponse.
         * Bind service response data to the properties.
         */
        bindServiceResponse: function() {
            var scope = this;
            try {
                scope._tab1field1backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field1backendmapping);
                scope._tab1field2backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field2backendmapping);
                scope._tab1field3backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field3backendmapping);
                scope._tab1field4backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field4backendmapping);
                scope._tab1field5backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field5backendmapping);
                scope._tab1field6backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field6backendmapping);
                scope._tab1field7backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field7backendmapping);
                scope._tab1field8backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field8backendmapping);
                scope._tab1field9backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field9backendmapping);
                scope._tab1field10backendmapping = scope.parseJsonAndGetValue(
                    scope._tab1field10backendmapping);
                if (scope._visibleTab2) {
                    scope._tab2field1backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field1backendmapping);
                    scope._tab2field2backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field2backendmapping);
                    scope._tab2field3backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field3backendmapping);
                    scope._tab2field4backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field4backendmapping);
                    scope._tab2field5backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field5backendmapping);
                    scope._tab2field6backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field6backendmapping);
                    scope._tab2field7backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field7backendmapping);
                    scope._tab2field8backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field8backendmapping);
                    scope._tab2field9backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field9backendmapping);
                    scope._tab2field10backendmapping = scope.parseJsonAndGetValue(
                        scope._tab2field10backendmapping);
                }
                if (scope._visibleTab3) {
                    scope._tab3field1backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field1backendmapping);
                    scope._tab3field2backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field2backendmapping);
                    scope._tab3field3backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field3backendmapping);
                    scope._tab3field4backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field4backendmapping);
                    scope._tab3field5backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field5backendmapping);
                    scope._tab3field6backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field6backendmapping);
                    scope._tab3field7backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field7backendmapping);
                    scope._tab3field8backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field8backendmapping);
                    scope._tab3field9backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field9backendmapping);
                    scope._tab3field10backendmapping = scope.parseJsonAndGetValue(
                        scope._tab3field10backendmapping);
                }
                if (scope._visibleTab4) {
                    scope._tab4field1backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field1backendmapping);
                    scope._tab4field2backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field2backendmapping);
                    scope._tab4field3backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field3backendmapping);
                    scope._tab4field4backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field4backendmapping);
                    scope._tab4field5backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field5backendmapping);
                    scope._tab4field6backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field6backendmapping);
                    scope._tab4field7backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field7backendmapping);
                    scope._tab4field8backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field8backendmapping);
                    scope._tab4field9backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field9backendmapping);
                    scope._tab4field10backendmapping = scope.parseJsonAndGetValue(
                        scope._tab4field10backendmapping);
                }
                scope.setValueFlexVisibility();
                scope.bindData();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in bindServiceResponse method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component readArray.
         * Parse the array in response and add it to the map.
         * @param: array{Array} - array in the response.
         * @param: jsonPath{string} - JSON path in the map.
         */
        readArray: function(array, jsonPath) {
            var parentPath = jsonPath;
            try {
                for (var i = 0; i < array.length; i++) {
                    var value = array[i];
                    jsonPath = parentPath + "[" + i + "]";
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else { // is a value
                        if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                            value = eval('(' + value + ')');
                        }
                        if (value instanceof Array) {
                            this.readArray(value, jsonPath);
                        } else if (value instanceof Object) {
                            this.readObject(value, jsonPath);
                        } else {
                            this.map[jsonPath] = value;
                        }
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in readArray method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component readObject.
         * Parse the object in response and add it to the map.
         * @param: obj{Object} - object in the response.
         * @param: jsonPath{string} - JSON path in the map.
         */
        readObject: function(obj, jsonPath) {
            var scope = this;
            try {
                var keysItr = Object.keys(obj);
                var parentPath = jsonPath;
                for (var i = 0; i < keysItr.length; i++) {
                    var key = keysItr[i];
                    var value = obj[key]
                    if (!kony.sdk.isNullOrUndefined(parentPath)) {
                        if (key === "externalIndicator" && value === "true") {
                            scope.isExternalAccount = "true";
                            scope.accReference = parentPath;
                        }
                    }
                    if (parentPath) {
                        jsonPath = parentPath + "." + key;
                    } else {
                        jsonPath = key;
                    }
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else { // is a value
                        if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                            value = eval('(' + value + ')');
                        }
                        if (value instanceof Array) {
                            this.readArray(value, jsonPath);
                        } else if (value instanceof Object) {
                            this.readObject(value, jsonPath);
                        } else {
                            this.map[jsonPath] = value;
                        }
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in readObject method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
        isEmptyNullUndefined: function(data) {
            try {
                if (data === null || data === undefined || data === "")
                    return true;
                return false;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in isEmptyNullUndefined method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setHeaderLabelText.
         * This function is to set the header label text.
         */
        setHeaderLabelText: function() {
            var scope = this;
            try {
                var accNo = "";
                var ending = ".";
                accNo = scope.getCriteria(scope._criteria);
                accNo = accNo["accountID"];
                if (!scope.isEmptyNullUndefined(this._nickName) && !scope.isEmptyNullUndefined(scope.getProcessedText(this._nickName))) {
                    var nickName = scope.getProcessedText(this._nickName);
                    ending = ending.repeat(this._noOfEllipsis);
                    accNo = (accNo.slice(accNo.length - 4));
                    if (nickName.length > this._noOfCharacters) {
                        nickName = nickName.substring(0, this._noOfCharacters) + ending;
                    } else
                        nickName = nickName + ending;
                    scope.view.lblAccountType.text = nickName + accNo;
                } else if (!scope.isEmptyNullUndefined(this._accountName) && !this.isEmptyNullUndefined(scope.getProcessedText(this._accountName))) {
                    var accName = scope.getProcessedText(this._accountName);
                    ending = ending.repeat(this._noOfEllipsis);
                    accNo = (accNo.slice(accNo.length - 4));
                    if (accName.length > this._noOfCharacters) {
                        accName = accName.substring(0, this._noOfCharacters) + ending;
                    } else
                        accName = accName + ending;
                    scope.view.lblAccountType.text = accName + accNo;
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setHeaderLabelText method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setIndicationsVisible.
         * show the user profile account indication.
         */
        setIndicationsVisible: function() {
            var scope = this;
            try {
                var isSingleProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
                var profileStatus = applicationManager.getUserPreferencesManager().profileAccess;
                if (!isSingleProfile && profileStatus === "both") {
                    if (!scope.isEmptyNullUndefined(this._businessAccount) && !scope.isEmptyNullUndefined(scope.getProcessedText(this._businessAccount))) {
                        var isBusinessPayee = scope.getProcessedText(this._businessAccount);
                        scope.view.imgIndicator.src = isBusinessPayee === "false" ? "personal.png" : "business.png";
                        scope.view.lblAccountType.width = "80%";
                        scope.view.imgIndicator.setVisibility(true);
                    }
                } else {
                    scope.view.imgIndicator.setVisibility(false);
                    scope.view.lblAccountType.width = "100%";
                }
                scope.view.forceLayout();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setIndicationsVisible method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setExternalFlexVisible.
         */
        setExternalFlexVisible: function() {
            var scope = this;
            try {
                if (scope.isExternalAccount === "true") {
                    scope.view.blBankNameDA.text = scope.externalBankName;
                    scope.view.imgBankLogo.src = "banklogo.png";
                    scope.view.flxBankName.setVisibility(true);
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setExternalFlexVisible method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component parseJsonAndGetValue.
         * Parse the value and returns the processed value for given account type.
         * @param: Value{String} - String taken from configuration.
         * @return: {String} - Processed value.
         */
        parseJsonAndGetValue: function(Value, key) {
            try {
                var value = Value;
                var scope = this;
                if (typeof(Value) === "string") {
                    value = JSON.parse(Value);
                }
                if (value[this.accountType]) {
                    value = value[this.accountType];
                    if (!scope.isEmptyNullUndefined(key)) {
                        value = value[key] ? value[key] : "";
                    } else if (value["value"]) {
                        value = value["value"];
                    }
                } else {
                    value = "";
                }
                if (value !== null && value !== "" && value !== undefined) {
                    if (typeof(value) === "string")
                        return this.getProcessedText(value);
                    else if (typeof(value) === "boolean") {
                        return value;
                    } else {
                        var text = this.UserTypeParser(value, this.userType);
                        return this.getProcessedText(text);
                    }
                } else return "";
            } catch (err) {
                kony.print(err);
            }
            return this.getProcessedText(Value);
        },

        /**
         * Component UserTypeParser.
         * Helper method to parse the exposed contract based on the current user type.
         * inputJSON {JSONObject} - object containing information about various usertypes and associated texts.
         * lookUpKey {string}     - current usertype value to be looked upon the above object.
         * @return : value of the lookup key in the input object.
         */
        UserTypeParser: function(inputJSON, lookUpKey) {
            try {
                if (inputJSON.hasOwnProperty(lookUpKey)) {
                    return inputJSON[lookUpKey];
                } else if (inputJSON.hasOwnProperty("default")) {
                    return inputJSON["default"];
                }
                return inputJSON;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in parsing the user type",
                    "errorLevel": "Business",
                    "error": err
                };
                this.onError(errorObj);
            }
        },

        /**
         * Component setValueFlexVisibility.
         * Set flex visibility based on value.
         */
        setValueFlexVisibility: function() {
            var scope = this;
            var count = 0;
            try {
                if (scope._tab1field1backendmapping) {
                    scope.view.flxTab1Field1.setVisibility(true);
                } else {
                    scope.view.flxTab1Field1.setVisibility(false);
                }
                if (scope._tab1field2backendmapping) {
                    scope.view.flxTab1Field2.setVisibility(true);
                } else {
                    scope.view.flxTab1Field2.setVisibility(false);
                }
                if (scope._tab1field3backendmapping) {
                    scope.view.flxTab1Field3.setVisibility(true);
                } else {
                    scope.view.flxTab1Field3.setVisibility(false);
                }
                if (scope._tab1field4backendmapping) {
                    scope.view.flxTab1Field4.setVisibility(true);
                } else {
                    scope.view.flxTab1Field4.setVisibility(false);
                }
                if (scope._tab1field5backendmapping) {
                    scope.view.flxTab1Field5.setVisibility(true);
                } else {
                    scope.view.flxTab1Field5.setVisibility(false);
                }
                if (scope._tab1field6backendmapping) {
                    scope.view.flxTab1Field6.setVisibility(true);
                } else {
                    scope.view.flxTab1Field6.setVisibility(false);
                }
                if (scope._tab1field7backendmapping) {
                    scope.view.flxTab1Field7.setVisibility(true);
                } else {
                    scope.view.flxTab1Field7.setVisibility(false);
                }
                if (scope._tab1field8backendmapping) {
                    scope.view.flxTab1Field8.setVisibility(true);
                } else {
                    scope.view.flxTab1Field8.setVisibility(false);
                }
                if (scope._tab1field9backendmapping) {
                    scope.view.flxTab1Field9.setVisibility(true);
                } else {
                    scope.view.flxTab1Field9.setVisibility(false);
                }
                if (scope._tab1field10backendmapping) {
                    scope.view.flxTab1Field10.setVisibility(true);
                } else {
                    scope.view.flxTab1Field10.setVisibility(false);
                }
                if (scope._visibleTab2) {
                    scope.view.flxTab2.setVisibility(true);
                    count = 0;
                    if (scope._tab2field1backendmapping) {
                        scope.view.flxTab2Field1.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field1.setVisibility(false);
                    }
                    if (scope._tab2field2backendmapping) {
                        scope.view.flxTab2Field2.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field2.setVisibility(false);
                    }
                    if (scope._tab2field3backendmapping) {
                        scope.view.flxTab2Field3.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field3.setVisibility(false);
                    }
                    if (scope._tab2field4backendmapping) {
                        scope.view.flxTab2Field4.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field4.setVisibility(false);
                    }
                    if (scope._tab2field5backendmapping) {
                        scope.view.flxTab2Field5.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field5.setVisibility(false);
                    }
                    if (scope._tab2field6backendmapping) {
                        scope.view.flxTab2Field6.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field6.setVisibility(false);
                    }
                    if (scope._tab2field7backendmapping) {
                        scope.view.flxTab2Field7.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field7.setVisibility(false);
                    }
                    if (scope._tab2field8backendmapping) {
                        scope.view.flxTab2Field8.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field8.setVisibility(false);
                    }
                    if (scope._tab2field9backendmapping) {
                        scope.view.flxTab2Field9.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field9.setVisibility(false);
                    }
                    if (scope._tab2field10backendmapping) {
                        scope.view.flxTab2Field10.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab2Field10.setVisibility(false);
                    }
                    if (count === 0) {
                        scope.view.flxTab2.setVisibility(false);
                        scope.view.flxTab2DetailsContainer.setVisibility(false);
                    }
                }
                if (scope._visibleTab3) {
                    scope.view.flxTab3.setVisibility(true);
                    count = 0;
                    if (scope._tab3field1backendmapping) {
                        scope.view.flxTab3Field1.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field1.setVisibility(false);
                    }
                    if (scope._tab3field2backendmapping) {
                        scope.view.flxTab3Field2.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field2.setVisibility(false);
                    }
                    if (scope._tab3field3backendmapping) {
                        scope.view.flxTab3Field3.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field3.setVisibility(false);
                    }
                    if (scope._tab3field4backendmapping) {
                        scope.view.flxTab3Field4.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field4.setVisibility(false);
                    }
                    if (scope._tab3field5backendmapping) {
                        scope.view.flxTab3Field5.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field5.setVisibility(false);
                    }
                    if (scope._tab3field6backendmapping) {
                        scope.view.flxTab3Field6.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field6.setVisibility(false);
                    }
                    if (scope._tab3field7backendmapping) {
                        scope.view.flxTab3Field7.setVisibility(true);
                        count++;
                    } else
                        scope.view.flxTab3Field7.setVisibility(false);
                    if (scope._tab3field8backendmapping) {
                        scope.view.flxTab3Field8.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field8.setVisibility(false);
                    }
                    if (scope._tab3field9backendmapping) {
                        scope.view.flxTab3Field9.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field9.setVisibility(false);
                    }
                    if (scope._tab3field10backendmapping) {
                        scope.view.flxTab3Field10.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab3Field10.setVisibility(false);
                    }
                    if (count === 0) {
                        scope.view.flxTab3.setVisibility(false);
                        scope.view.flxTab3DetailsContainer.setVisibility(false);
                    }
                }
                if (scope._visibleTab4) {
                    scope.view.flxTab4.setVisibility(true);
                    count = 0;
                    if (scope._tab4field1backendmapping) {
                        scope.view.flxTab4Field1.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field1.setVisibility(false);
                    }
                    if (scope._tab4field2backendmapping) {
                        scope.view.flxTab4Field2.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field2.setVisibility(false);
                    }
                    if (scope._tab4field3backendmapping) {
                        scope.view.flxTab4Field3.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field3.setVisibility(false);
                    }
                    if (scope._tab4field4backendmapping) {
                        scope.view.flxTab4Field4.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field4.setVisibility(false);
                    }
                    if (scope._tab4field5backendmapping) {
                        scope.view.flxTab4Field5.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field5.setVisibility(false);
                    }
                    if (scope._tab4field6backendmapping) {
                        scope.view.flxTab4Field6.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field6.setVisibility(false);
                    }
                    if (scope._tab4field7backendmapping) {
                        scope.view.flxTab4Field7.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field7.setVisibility(false);
                    }
                    if (scope._tab4field8backendmapping) {
                        scope.view.flxTab4Field8.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field8.setVisibility(false);
                    }
                    if (scope._tab4field9backendmapping) {
                        scope.view.flxTab4Field9.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field9.setVisibility(false);
                    }
                    if (scope._tab4field10backendmapping) {
                        scope.view.flxTab4Field10.setVisibility(true);
                        count++;
                    } else {
                        scope.view.flxTab4Field10.setVisibility(false);
                    }
                    if (count === 0) {
                        scope.view.flxTab4.setVisibility(false);
                        scope.view.flxTab4DetailsContainer.setVisibility(false);
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setValueFlexVisibility method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },
        /**
         * Component getParsedI18nValue.
         * get i18n translated text .
         */
  		getParsedI18nValue: function(fieldValue) {
           try {
        		var i18ntext = kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
        		fieldValue = i18ntext;
        		return fieldValue;
          } catch (err) {
                var errObj = {
                    "errorInfo": "Error in getParsedI18nValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
           }
 		 },
        /**
         * Component getTitleI18nValue.
         * get Title from component property.
         */
 		 getTitleI18nValue: function(fieldValue) {
        	var scope = this;
        	var value;
            try {
                if (typeof(fieldValue) === "string") {
                    value = JSON.parse(fieldValue);
                }
                if (value[this.accountType]) {
                    value = value[this.accountType];
                }
                value = scope.getParsedI18nValue(value);
                return value;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in getTitleI18nValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
  		},      
        /**
         * Component bindAccountTypeStaticData.
         * Bind static data to labels.
         */
        bindAccountTypeStaticData: function() {
            var scope = this;
            try {
                if (!(scope._visibleTab2)) {
                    scope.view.flxTab2.setVisibility(false);
                    scope.view.flxTab2DetailsContainer.setVisibility(false);
                }
                if (!(scope._visibleTab3)) {
                    scope.view.flxTab3.setVisibility(false);
                    scope.view.flxTab3DetailsContainer.setVisibility(false);
                }
                if (!(scope._visibleTab4)) {
                    scope.view.flxTab4.setVisibility(false);
                    scope.view.flxTab4DetailsContainer.setVisibility(false);
                }
                scope.view.lblTab1Header.text = scope.getTitleI18nValue(scope._tab1TitleValue);
                scope.view.lblTab1Field1Label.text = scope.parseJsonAndGetValue(scope._tab1label1backendmapping);
                scope.view.lblTab1Field2Label.text = scope.parseJsonAndGetValue(scope._tab1label2backendmapping);
                scope.view.lblTab1Field3Label.text = scope.parseJsonAndGetValue(scope._tab1label3backendmapping);
                scope.view.lblTab1Field4Label.text = scope.parseJsonAndGetValue(scope._tab1label4backendmapping);
                scope.view.lblTab1Field5Label.text = scope.parseJsonAndGetValue(scope._tab1label5backendmapping);
                scope.view.lblTab1Field6Label.text = scope.parseJsonAndGetValue(scope._tab1label6backendmapping);
                scope.view.lblTab1Field7Label.text = scope.parseJsonAndGetValue(scope._tab1label7backendmapping);
                scope.view.lblTab1Field8Label.text = scope.parseJsonAndGetValue(scope._tab1label8backendmapping);
                scope.view.lblTab1Field9Label.text = scope.parseJsonAndGetValue(scope._tab1label9backendmapping);
                scope.view.lblTab1Field10Label.text = scope.parseJsonAndGetValue(scope._tab1label10backendmapping);
                scope.parseTab1TypeData();
                if (scope._visibleTab2) {
                    scope.view.lblTab2Header.text =  scope.getTitleI18nValue(scope._tab2TitleValue);
                    scope.view.lblTab2Field1Label.text = scope.parseJsonAndGetValue(scope._tab2label1backendmapping);
                    scope.view.lblTab2Field2Label.text = scope.parseJsonAndGetValue(scope._tab2label2backendmapping);
                    scope.view.lblTab2Field3Label.text = scope.parseJsonAndGetValue(scope._tab2label3backendmapping);
                    scope.view.lblTab2Field4Label.text = scope.parseJsonAndGetValue(scope._tab2label4backendmapping);
                    scope.view.lblTab2Field5Label.text = scope.parseJsonAndGetValue(scope._tab2label5backendmapping);
                    scope.view.lblTab2Field6Label.text = scope.parseJsonAndGetValue(scope._tab2label6backendmapping);
                    scope.view.lblTab2Field7Label.text = scope.parseJsonAndGetValue(scope._tab2label7backendmapping);
                    scope.view.lblTab2Field8Label.text = scope.parseJsonAndGetValue(scope._tab2label8backendmapping);
                    scope.view.lblTab2Field9Label.text = scope.parseJsonAndGetValue(scope._tab2label9backendmapping);
                    scope.view.lblTab2Field10Label.text = scope.parseJsonAndGetValue(scope._tab2label10backendmapping);
                    scope.parseTab2TypeData();
                }
                if (scope._visibleTab3) {
                    scope.view.lblTab3Header.text = scope.getTitleI18nValue(scope._tab3TitleValue);
                    scope.view.lblTab3Field1Label.text = scope.parseJsonAndGetValue(scope._tab3label1backendmapping);
                    scope.view.lblTab3Field2Label.text = scope.parseJsonAndGetValue(scope._tab3label2backendmapping);
                    scope.view.lblTab3Field3Label.text = scope.parseJsonAndGetValue(scope._tab3label3backendmapping);
                    scope.view.lblTab3Field4Label.text = scope.parseJsonAndGetValue(scope._tab3label4backendmapping);
                    scope.view.lblTab3Field5Label.text = scope.parseJsonAndGetValue(scope._tab3label5backendmapping);
                    scope.view.lblTab3Field6Label.text = scope.parseJsonAndGetValue(scope._tab3label6backendmapping);
                    scope.view.lblTab3Field7Label.text = scope.parseJsonAndGetValue(scope._tab3label7backendmapping);
                    scope.view.lblTab3Field8Label.text = scope.parseJsonAndGetValue(scope._tab3label8backendmapping);
                    scope.view.lblTab3Field9Label.text = scope.parseJsonAndGetValue(scope._tab3label9backendmapping);
                    scope.view.lblTab3Field10Label.text = scope.parseJsonAndGetValue(scope._tab3label10backendmapping);
                    scope.parseTab3TypeData();
                }
                if (scope._visibleTab4) {
                    scope.view.lblTab4Header.text = scope.getTitleI18nValue(scope._tab4TitleValue);
                    scope.view.lblTab4Field1Label.text = scope.parseJsonAndGetValue(scope._tab4label1backendmapping);
                    scope.view.lblTab4Field2Label.text = scope.parseJsonAndGetValue(scope._tab4label2backendmapping);
                    scope.view.lblTab4Field3Label.text = scope.parseJsonAndGetValue(scope._tab4label3backendmapping);
                    scope.view.lblTab4Field4Label.text = scope.parseJsonAndGetValue(scope._tab4label4backendmapping);
                    scope.view.lblTab4Field5Label.text = scope.parseJsonAndGetValue(scope._tab4label5backendmapping);
                    scope.view.lblTab4Field6Label.text = scope.parseJsonAndGetValue(scope._tab4label6backendmapping);
                    scope.view.lblTab4Field7Label.text = scope.parseJsonAndGetValue(scope._tab4label7backendmapping);
                    scope.view.lblTab4Field8Label.text = scope.parseJsonAndGetValue(scope._tab4label8backendmapping);
                    scope.view.lblTab4Field9Label.text = scope.parseJsonAndGetValue(scope._tab4label9backendmapping);
                    scope.view.lblTab4Field10Label.text = scope.parseJsonAndGetValue(scope._tab4label10backendmapping);
                    scope.parseTab4TypeData();
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in bindAccountTypeStaticData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component parseTab1TypeData.
         * Get the type of each value in tab 1 for given account type.
         */
        parseTab1TypeData: function() {
            var scope = this;
            try {
                scope._tab1field1type = scope.parseJsonAndGetValue(scope._tab1field1type);
                scope._tab1field2type = scope.parseJsonAndGetValue(scope._tab1field2type);
                scope._tab1field3type = scope.parseJsonAndGetValue(scope._tab1field3type);
                scope._tab1field4type = scope.parseJsonAndGetValue(scope._tab1field4type);
                scope._tab1field5type = scope.parseJsonAndGetValue(scope._tab1field5type);
                scope._tab1field6type = scope.parseJsonAndGetValue(scope._tab1field6type);
                scope._tab1field7type = scope.parseJsonAndGetValue(scope._tab1field7type);
                scope._tab1field8type = scope.parseJsonAndGetValue(scope._tab1field8type);
                scope._tab1field9type = scope.parseJsonAndGetValue(scope._tab1field9type);
                scope._tab1field10type = scope.parseJsonAndGetValue(scope._tab1field10type);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in parseTab1TypeData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component parseTab2TypeData.
         * Get the type of each value in tab 2 for given account type.
         */
        parseTab2TypeData: function() {
            var scope = this;
            try {
                scope._tab2field1type = scope.parseJsonAndGetValue(scope._tab2field1type);
                scope._tab2field2type = scope.parseJsonAndGetValue(scope._tab2field2type);
                scope._tab2field3type = scope.parseJsonAndGetValue(scope._tab2field3type);
                scope._tab2field4type = scope.parseJsonAndGetValue(scope._tab2field4type);
                scope._tab2field5type = scope.parseJsonAndGetValue(scope._tab2field5type);
                scope._tab2field6type = scope.parseJsonAndGetValue(scope._tab2field6type);
                scope._tab2field7type = scope.parseJsonAndGetValue(scope._tab2field7type);
                scope._tab2field8type = scope.parseJsonAndGetValue(scope._tab2field8type);
                scope._tab2field9type = scope.parseJsonAndGetValue(scope._tab2field9type);
                scope._tab2field10type = scope.parseJsonAndGetValue(scope._tab2field10type);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in parseTab2TypeData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component parseTab3TypeData
         * Get the type of each value in tab 3 for given account type and breakpoint
         */
        parseTab3TypeData: function() {
            var scope = this;
            try {
                scope._tab3field1type = scope.parseJsonAndGetValue(scope._tab3field1type);
                scope._tab3field2type = scope.parseJsonAndGetValue(scope._tab3field2type);
                scope._tab3field3type = scope.parseJsonAndGetValue(scope._tab3field3type);
                scope._tab3field4type = scope.parseJsonAndGetValue(scope._tab3field4type);
                scope._tab3field5type = scope.parseJsonAndGetValue(scope._tab3field5type);
                scope._tab3field6type = scope.parseJsonAndGetValue(scope._tab3field6type);
                scope._tab3field7type = scope.parseJsonAndGetValue(scope._tab3field7type);
                scope._tab3field8type = scope.parseJsonAndGetValue(scope._tab3field8type);
                scope._tab3field9type = scope.parseJsonAndGetValue(scope._tab3field9type);
                scope._tab3field10type = scope.parseJsonAndGetValue(scope._tab3field10type);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in parseTab3TypeData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component parseTab4TypeData.
         * Get the type of each value in tab 4 for given account type.
         */
        parseTab4TypeData: function() {
            var scope = this;
            try {
                scope._tab4field1type = scope.parseJsonAndGetValue(scope._tab4field1type);
                scope._tab4field2type = scope.parseJsonAndGetValue(scope._tab4field2type);
                scope._tab4field3type = scope.parseJsonAndGetValue(scope._tab4field3type);
                scope._tab4field4type = scope.parseJsonAndGetValue(scope._tab4field4type);
                scope._tab4field5type = scope.parseJsonAndGetValue(scope._tab4field5type);
                scope._tab4field6type = scope.parseJsonAndGetValue(scope._tab4field6type);
                scope._tab4field7type = scope.parseJsonAndGetValue(scope._tab4field7type);
                scope._tab4field8type = scope.parseJsonAndGetValue(scope._tab4field8type);
                scope._tab4field9type = scope.parseJsonAndGetValue(scope._tab4field9type);
                scope._tab4field10type = scope.parseJsonAndGetValue(scope._tab4field10type);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in parseTab4TypeData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component getProcessedText.
         * Get the processed text from parser util.
         * @param: text{String}/{Object} - text to be parsed.
         * @return: {String}/{Object} - parsed text.
         */
        getProcessedText: function(text) {
            try {
                return this.parserUtilsManager.getParsedValue(text);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in getProcessedText method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component errorCallback.
         * Handles errors in the comonent.
         */
        errorCallback: function(errObj) {
            this.onError(errObj);
        }
    };
});