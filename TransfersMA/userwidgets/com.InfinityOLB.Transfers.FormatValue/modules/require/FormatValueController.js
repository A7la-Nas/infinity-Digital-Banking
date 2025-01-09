define(['./FomatValueUtils'], function (FomatValueUtils) {

  return {

    constructor: function (baseConfig, layoutConfig, pspConfig) {
      /**@member {OBJECT}  contains all currency codes*/
      this.currencyCode = {
        USD: '$', // US Dollar
        EUR: '€', // Euro
        CRC: '₡', // Costa Rican Colón
        GBP: '£', // British Pound Sterling
        ILS: '₪', // Israeli New Sheqel
        INR: '₹', // Indian Rupee
        JPY: '¥', // Japanese Yen
        KRW: '₩', // South Korean Won
        NGN: '₦', // Nigerian Naira
        PHP: '₱', // Philippine Peso
        PLN: 'zł', // Polish Zloty
        PYG: '₲', // Paraguayan Guarani
        THB: '฿', // Thai Baht
        UAH: '₴', // Ukrainian Hryvnia
        VND: '₫', // Vietnamese Dong
        AUD: '$', // Australian Dollar
        CAD: '$', // Canadian Dollar
        CHF: 'Fr.', //Swiss Franc
      };
      this.formatUtils = new FomatValueUtils();
      this._textSkin = "";
      this._currencyFormat = "";
      this._positiveAmountSkin = "";
      this._negativeAmountSkin = "";
      this._positiveFormat = "";
      this._negativeFormat = "";
      this._dateFormat = "";
      this._backenddateformat = "";
      this._dateSkin = "";
      this._accountNumberformat = "";
      this._masking = false;
      this._maskeyeicon = "";
      this._unmaskeyeicon = "";
      this._maskeyeiconskin = "";
      this._unmaskeyeiconskin = "";
      this._accountNumberSkin = "";
      this._FieldType = "";
      this._FieldValue = "";
      this._FieldSkin = "";
      this._FieldFormat = "";
      this._currencySymbolCode = "";
      this._percentageSkin = "";
      this.startIconSkin = "";
      this.startIconText = "";
    },
    initGettersSetters: function () {
      defineSetter(this, "textSkin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._textSkin = val;
        }
      });
      defineGetter(this, "textSkin", function () {
        return this._textSkin;
      });
      defineSetter(this, "currencyFormat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._currencyFormat = val;
        }
      });
      defineGetter(this, "currencyFormat", function () {
        return this._currencyFormat;
      });
      defineSetter(this, "positiveAmountSkin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._positiveAmountSkin = val;
        }
      });
      defineGetter(this, "positiveAmountSkin", function () {
        return this._positiveAmountSkin;
      });
      defineSetter(this, "negativeAmountSkin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._negativeAmountSkin = val;
        }
      });
      defineGetter(this, "negativeAmountSkin", function () {
        return this._negativeAmountSkin;
      });
      defineSetter(this, "positiveFormat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._positiveFormat = val;
        }
      });
      defineGetter(this, "positiveFormat", function () {
        return this._positiveFormat;
      });
      defineSetter(this, "negativeFormat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._negativeFormat = val;
        }
      });
      defineGetter(this, "negativeFormat", function () {
        return this._negativeFormat;
      });
      defineSetter(this, "dateFormat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._dateFormat = val;
        }
      });
      defineGetter(this, "dateFormat", function () {
        return this._dateFormat;
      });
      defineSetter(this, "backenddateformat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._backenddateformat = val;
        }
      });
      defineGetter(this, "backenddateformat", function () {
        return this._backenddateformat;
      });
      defineSetter(this, "dateSkin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._dateSkin = val;
        }
      });
      defineGetter(this, "dateSkin", function () {
        return this._dateSkin;
      });
      defineSetter(this, "accountNumberformat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._accountNumberformat = val;
        }
      });
      defineGetter(this, "accountNumberformat", function () {
        return this._accountNumberformat;
      });
      defineSetter(this, "masking", function (val) {
        if ((typeof val == 'boolean') && (val != "")) {
          this._masking = val;
        }
      });
      defineGetter(this, "masking", function () {
        return this._masking;
      });
      defineSetter(this, "maskeyeicon", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._maskeyeicon = val;
        }
      });
      defineGetter(this, "maskeyeicon", function () {
        return this._maskeyeicon;
      });
      defineSetter(this, "unmaskeyeicon", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._unmaskeyeicon = val;
        }
      });
      defineGetter(this, "unmaskeyeicon", function () {
        return this._unmaskeyeicon;
      });
      defineSetter(this, "maskeyeiconskin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._maskeyeiconskin = val;
        }
      });
      defineGetter(this, "maskeyeiconskin", function () {
        return this._maskeyeiconskin;
      });
      defineSetter(this, "unmaskeyeiconskin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._unmaskeyeiconskin = val;
        }
      });
      defineGetter(this, "unmaskeyeiconskin", function () {
        return this._unmaskeyeiconskin;
      });
      defineSetter(this, "accountNumberSkin", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._accountNumberSkin = val;
        }
      });
      defineGetter(this, "accountNumberSkin", function () {
        return this._accountNumberSkin;
      });
    },
    setFieldType: function (val) {
      this._FieldType = val;
    },
    setFieldValue: function (val) {
      this._FieldValue = val;
    },
    setFieldSkin: function (val) {
      this._FieldSkin = val;
    },
    setFieldFormat: function (val) {
      this._FieldFormat = val;
    },


    setTextSkin: function (val) {
      this._textSkin = val;
    },
    //-------- Amount Fields-----
    setCurrencyFormat: function (val) {
      this._currencyFormat = val;
    },
    setNegativeAmountSkin: function (val) {
      this._negativeAmountSkin = val;
    },
    setPositiveAmountSkin: function (val) {
      this._positiveAmountSkin = val;
    },
    setPositiveFormat: function (val) {
      this._positiveFormat = val;
    },
    setNegativeFormat: function (val) {
      this._negativeFormat = val;
    },
    setCurrencySymbol: function (val) {
      this._currencySymbolCode = val;
    },

    //---------- Date Fields
    setDateFormat: function (val) {
      this._dateFormat = val;
    },
    setBackenddateformat: function (val) {
      this._backenddateformat = val;
    },
    setDateSkin: function (val) {
      this._dateSkin = val;
    },

    //---------- Account Number Fields
    setAccountNumberformat: function (val) {
      this._accountNumberformat = val;
    },
    setMasking: function (val) {
      this._masking = val;
    },
    setMaskeyeicon: function (val) {
      this._maskeyeicon = val;
    },
    setUnmaskeyeicon: function (val) {
      this._unmaskeyeicon = val;
    },
    setUnmaskeyeiconskin: function (val) {
      this._unmaskeyeiconskin = val;
    },
    setAccountNumberSkin: function (val) {
      this._accountNumberSkin = val;
    },
    UpdateCustomProperties: function (data) {
      var defaultType = { "type": "Label" };
      this._FieldType = (data.FieldType) ? data.FieldType : defaultType;
      this._FieldValue = (data.FieldValue) ? data.FieldValue : "";
      this._textSkin = (data.textSkin) ? JSON.parse(data.textSkin) : "";
      this._currencyFormat = (data.amountFormat) ? JSON.parse(data.amountFormat) : "";
      this._positiveAmountSkin = (data.positiveAmountSkin) ? JSON.parse(data.positiveAmountSkin) : "";
      this._negativeAmountSkin = (data.negativeAmountSkin) ? JSON.parse(data.negativeAmountSkin) : "";
      this._dateFormat = (data.dateFormat) ? JSON.parse(data.dateFormat) : "";
      this._backenddateformat = "";
      this._dateSkin = (data.dateSkin) ? JSON.parse(data.dateSkin) : "";
      this._accountNumberformat = (data.accountNumberformat) ? JSON.parse(data.accountNumberformat) : "";
      this._masking = (data.masking) ? JSON.parse(data.masking) : "";
      this._maskeyeiconskin = (data.maskeyeiconskin) ? JSON.parse(data.maskeyeiconskin) : "";
      this._unmaskeyeiconskin = (data.unmaskeyeiconskin) ? JSON.parse(data.unmaskeyeiconskin) : "";
      this._maskeyeicon = (data.maskeyeicon) ? JSON.parse(data.maskeyeicon) : "";
      this._unmaskeyeicon = (data.unmaskeyeicon) ? JSON.parse(data.unmaskeyeicon) : "";
      this._accountNumberSkin = (data.accountNumberSkin) ? JSON.parse(data.accountNumberSkin) : "";
      this._currencySymbolCode = (data.currencySymbolCode) ? data.currencySymbolCode : "USD";
      this._percentageSkin = (data.percentageSkin) ? JSON.parse(data.percentageSkin) : "";
      this.startIconSkin = (data.startIconSkin) ? data.startIconSkin : "";
      this.startIconText = (data.startIconText) ? data.startIconText : "";
    },

    postShow: function () {
      var scopeObj = this;
      scopeObj.view.flxEyeIcon.accessibilityConfig = {
        "a11yLabel": "View Account Number, Your Account Number is currently hidden",
        "a11yARIA": {
          "role": "button",
          "tabindex": 0
        }
      }
    },
    formatText: function () {
      var scopeObj = this;
      //this._FieldValue
      //this._FieldFormat
      if (this._FieldType !== "Account Number") {
        scopeObj.view.lblEyeIcon.setVisibility(false);
        scopeObj.view.flxEyeIcon.setVisibility(false);
      }
      if (this._FieldType !== "TextWithIcon") {
        scopeObj.view.lblIconStart.setVisibility(false);
      }
      if (this._FieldType) {
        if (this._FieldType.type == "Label") {
          if (this._textSkin && this._textSkin.skin) {
            scopeObj.setSkinToLabel(this._textSkin.skin);
          }
          scopeObj.setTextToLabel(this._FieldValue.value);
        }
        else if (this._FieldType.type == "Amount") {
          var formattedAmount = "";
          //this._currencySymbolCode="USD";
          formattedAmount = this.formatUtils.formatAmountandAppendCurrencySymbol(this._FieldValue.value, this._currencySymbolCode, this._currencyFormat);
          var amount = parseInt(this._FieldValue.value);
          if (amount >= 0 || isNaN(amount)) {
            if (this._positiveAmountSkin.skin)
              scopeObj.setSkinToLabel(this._positiveAmountSkin.skin)
          }
          else {
            if (this._negativeAmountSkin.skin)
              scopeObj.setSkinToLabel(this._negativeAmountSkin.skin)
          }
          scopeObj.setTextToLabel(formattedAmount);
        }
        else if (this._FieldType.type == "Date") {
          if (this._dateFormat && this._dateFormat.format) {
            var dateObjFromString = this.formatUtils.getDateObjectfromString(this._FieldValue.value)
            scopeObj.setTextToLabel(this.formatUtils.getFormatedDateString(dateObjFromString, this._dateFormat.format));
          }
          if (this._dateSkin && this._dateSkin.skin)
            scopeObj.setSkinToLabel(this._dateSkin.skin)
        }
        else if (this._FieldType.type == "TextWithIcon") {
          scopeObj.view.lblIconStart.skin = this.startIconSkin;
          scopeObj.view.lblIconStart.text = this.startIconText;
          if (this.startIconSkin && this.startIconText) {
            scopeObj.view.lblIconStart.setVisibility(true);
          }
          else {
            scopeObj.view.lblIconStart.setVisibility(false);
          }
          if (this._textSkin) {
            scopeObj.setSkinToLabel(this._textSkin);
          }
          if (this._textSkin.skin) {
            scopeObj.setSkinToLabel(this._textSkin.skin);
          }
          scopeObj.setTextToLabel(this._FieldValue.value);
        }
        else if (this._FieldType.type == "Account Number") {
          if (this._masking.masking) {
            if (this._accountNumberformat) {
              this._accountNumberformat.format = (!this._accountNumberformat.format) ? "\\d(?=\\d{4})" : this._accountNumberformat.format;
              this._accountNumberformat.replaceCharacter = (!this._accountNumberformat.replaceCharacter) ? "X" : this._accountNumberformat.replaceCharacter;
              this._accountNumberformat.modifiers = (!this._accountNumberformat.modifiers) ? "g" : this._accountNumberformat.modifiers;
            }
            scopeObj.setTextToLabel(this.formatUtils.formatAccoutNumber(this._accountNumberformat, this._FieldValue.value));
            if (this._maskeyeicon.maskeyeicon) {
              scopeObj.view.flxEyeIcon.onClick = scopeObj.maskunmaskAccountNumber;
              scopeObj.setTextToEyeIcon(this._maskeyeicon.maskeyeicon);
              scopeObj.view.lblEyeIcon.setVisibility(true);
              scopeObj.view.flxEyeIcon.setVisibility(true);
            }
            else {
              scopeObj.view.lblEyeIcon.setVisibility(false);
              scopeObj.view.flxEyeIcon.setVisibility(false);
            }
            if (this._maskeyeiconskin) {
              scopeObj.setSkinToEyeIcon(this._maskeyeiconskin);
            }
            if (this._maskeyeiconskin.skin) {
              scopeObj.setSkinToEyeIcon(this._maskeyeiconskin.skin);
            }
          }
          else {
            scopeObj.setTextToLabel(this._FieldValue.value);
          }
          if (this._accountNumberSkin) {
            scopeObj.setSkinToLabel(this._accountNumberSkin);
          }
          if (this._accountNumberSkin.skin) {
            scopeObj.setSkinToLabel(this._accountNumberSkin.skin);
          }
        }
        else if (this._FieldType.type === "Percentage") {
          scopeObj.setTextToLabel(this.formatUtils.formatValueAndAppendPercentageSymbol(this._FieldValue.value));
          if (this._percentageSkin.skin) {
            scopeObj.setSkinToLabel(this._percentageSkin.skin);
          }
        }
      }
      this.view.flxData.setVisibility(true);
      this.view.flxAnimate.setVisibility(false);
      this.view.forceLayout();
    },
    setTextToLabel: function (data) {
      if (this.view.lblIconStart.isVisible) {
        this.view.lblFormat.left = "10dp";
      }
      else {
        this.view.lblFormat.left = "0dp";
      }
      this.view.lblFormat.text = data;
    },
    setTextToEyeIcon: function (data) {
      this.view.lblEyeIcon.text = data;
    },
    setSkinToLabel: function (skinName) {
      this.view.lblFormat.skin = skinName;
    },
    setSkinToEyeIcon: function (skinName) {
      this.view.lblEyeIcon.skin = skinName;
    },
    maskunmaskAccountNumber: function () {
      if (this.view.lblEyeIcon.text == this._maskeyeicon.maskeyeicon) {
        this.setTextToLabel(this._FieldValue.value);
        if (this._unmaskeyeiconskin && this._unmaskeyeiconskin.skin) {
          this.setSkinToEyeIcon(this._unmaskeyeiconskin.skin);
        }
        if (this._unmaskeyeicon && this._unmaskeyeicon.unmaskeyeicon)
          this.setTextToEyeIcon(this._unmaskeyeicon.unmaskeyeicon);

        this.view.flxEyeIcon.accessibilityConfig = {
          "a11yLabel": "Hide Account Number, Your Account Number is currently visible",
          "a11yARIA": {
            tabindex: 0,
            role: "button"
          }
        };
        this.view.flxEyeIcon.setActive(true);
      }
      else {
        if (this._maskeyeicon && this._maskeyeicon.maskeyeicon) {
          this.setTextToEyeIcon(this._maskeyeicon.maskeyeicon);
        }
        if (this._maskeyeiconskin && this._maskeyeiconskin.skin) {
          this.setSkinToEyeIcon(this._maskeyeiconskin.skin);
        }
        this.setTextToLabel(this.formatUtils.formatAccoutNumber(this._accountNumberformat, this._FieldValue.value));
        this.view.flxEyeIcon.accessibilityConfig = {
          "a11yLabel": "View Account Number, Your Account Number is currently hidden",
          "a11yARIA": {
            tabindex: 0,
            role: "button"
          }
        };
        this.view.flxEyeIcon.setActive(true);
      }
    },
    alignLabel: function (alignmentData) {
      if (alignmentData && alignmentData.width) {
        this.view.lblFormat.width = alignmentData.width;
      }
      if (alignmentData && alignmentData.alignmentPosition)
        this.view.lblFormat.contentAlignment = alignmentData.alignmentPosition;
    },

    animateFlex: function () {
      this.view.flxData.setVisibility(false);
      this.view.flxAnimate.setVisibility(true);
      try {
        //konymp.logger.trace("----------Entering animateSegmentRows Function---------", konymp.logger.FUNCTION_ENTRY);  
        var animaationDef = {
          "0": {
            "left": "-100%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          },
          "100": {
            "left": "105%",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true
          }
        };
        var animationConfig = {
          delay: Math.random(),
          duration: 0.7,
          iterationCount: 0,
          fillMode: kony.anim.FILL_MODE_NONE
        };
        var animationDefObject = kony.ui.createAnimation(animaationDef);
        this.view.imgGlow.animate(animationDefObject, animationConfig, null);
      } catch (e) {
        // konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
        throw (e);
      }
      //konymp.logger.trace("----------Exiting animateSegmentRows Function ---------", konymp.logger.FUNCTION_EXIT);
    },

  };
});