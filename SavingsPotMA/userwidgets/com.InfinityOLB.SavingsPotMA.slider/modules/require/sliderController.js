
define(function() {

  var accessibilityMinValue = kony.i18n.getLocalizedString('AccessibilityConfig.Slider.Min');
  var accessibilityMaxValue = kony.i18n.getLocalizedString('AccessibilityConfig.Slider.Max');
  
  var currentAmoutSkin = "sknTbxFont333333SSP30PxKA";
  var currentAmoutMobileSkin = "sknTbxFont333333SSP22PxKA";
  var currentCurrencySkin = "sknLblFont333333SSP30PxKA";
  var currentCurrencyMobileSkin = "sknLblFont333333SSP22PxKA";
  
  var amoutSkin = "sknLbl727272SSP18";
  var amoutMobileSkin = "sknLbl72727211";
  var defaultMin = 0;
  var defaultMax = 30000;
  var defaultValue = 0;
  var defaultStep = 100;
  var defaultPrefixFlag= true;
  var defaultPrefixSymbol = "$";
  var defaultSuffix = "";
  var defaultTarget = 0;

  var selectionCallback = function() {
   if(this.view.sldSlider.selectedValue >= this.maxValue){
      this.currentValue= this.view.sldSlider.selectedValue;
   }
    else if(this.currentValue > this.view.sldSlider.selectedValue ){
      this.view.sldSlider.selectedValue =  this.currentValue ?  parseInt(this.currentValue) - parseInt(this.stepValue) :parseInt(this.stepValue);
      this.currentValue= this.view.sldSlider.selectedValue;
    }
    else{
      this.view.sldSlider.selectedValue = this.currentValue ? parseInt(this.currentValue) + parseInt(this.stepValue) :parseInt(this.stepValue);
      this.currentValue= this.view.sldSlider.selectedValue;
    }
    if (this.onTouchEndCallback) {
      this.onTouchEndCallback();
    }
  };
  
  var onSlideCallback = function(view) {
    this.currentValue = view.selectedValue;
    if (this.onTouchEndCallback) {
        this.onTouchEndCallback();
    }
  };
  
      
  var updateView = function() {
    var suffix = this.suffix;
    var leftAmountText;
    var rightAmountText;
    this.view.sldSlider.min = this.minValue;
    this.view.sldSlider.max = this.maxValue;
    this.view.sldSlider.step = this.stepValue;
    if (this.prefixFlag) {
      leftAmountText = this.prefixSymbol +" "+ this.minValue;
      rightAmountText = this.prefixSymbol +" "+ this.maxValue;
    } else {
      leftAmountText = this.minValue + " " + suffix;
      rightAmountText = this.maxValue + " " + suffix;
    }

    this.view.lblLeftAmount.text = leftAmountText;
    this.view.lblLeftAmount.accessibilityConfig = {
      "a11yLabel": accessibilityMinValue + leftAmountText,
    };
    
    this.view.lblRightAmount.text = rightAmountText;
    this.view.lblRightAmount.accessibilityConfig = {
      "a11yLabel": accessibilityMaxValue + rightAmountText,
    };

    this.view.sldSlider.selectedValue = this.currentValue;
    this.view.sldSlider.onSlide = onSlideCallback.bind(this);
    this.view.sldSlider.onSelection = selectionCallback.bind(this);
    if(this.target > 0){
      this.view.sldSlider.setEnabled(true);
    }
    else {
      this.view.sldSlider.setEnabled(false);
    }
  };
  
  return {
    /**
    * Initialization of component
    */
    initialize: function(min, max, currentValue, step, prefixFlag, prefixSymbol, suffix, target) {
      this.minValue = min ? parseFloat(min) : defaultMin;
      this.maxValue = max ? parseFloat(max) : defaultMax;
      this.prefixFlag = prefixFlag;
      this.prefixSymbol =prefixSymbol? prefixSymbol : defaultPrefixSymbol;
      this.currentValue = currentValue ? parseFloat(currentValue) : defaultValue;
      this.stepValue = parseFloat(step)? parseFloat(step) : defaultStep;
      this.suffix = suffix ? suffix : defaultSuffix; 
      this.target = target  ? parseFloat(target) : defaultTarget;
      updateView.call(this);
    },

    /**
    * Update view of component on breakpoint change
    */
    onBreakPointChanged: function(mobileBreakPoint) {
      mobileBreakPoint = !mobileBreakPoint ? MOBILE_BREAKPOINT :  mobileBreakPoint;
      var breakPoint = kony.application.getCurrentBreakpoint();
      var isMobile = breakPoint <= mobileBreakPoint;
      this.view.tbxCurrentAmount.skin = isMobile ? currentAmoutMobileSkin : currentAmoutSkin;
      this.view.lblLeftAmount.skin = isMobile ? amoutMobileSkin : amoutSkin;
      this.view.lblRightAmount.skin = isMobile ? amoutMobileSkin : amoutSkin;
      this.view.flxHolder.top = isMobile ? "5dp" : "10dp";
      this.view.lblCurrencySymbol.top = isMobile ? "6dp" : "0dp";
      this.view.lblCurrencySymbol.skin = isMobile ? currentCurrencyMobileSkin : currentCurrencySkin;
      this.view.sldSlider.thumbImage = isMobile ? "slidericon.png":"slidericon.png";
      this.view.sldSlider.focusThumbImage = isMobile ? "slidericon.png":"slidericon.png";
    },

    /**
    * Set skin of slider
    * @param {string} skin
    */
    setSkin: function(skin) {
      this.view.skin = skin;
    },
    
    /**
    * Set skin of font size
    * @param {string} skin
    */
    setFontSize: function(skin) {
      this.view.lblLeftAmount.skin = skin;
      this.view.lblRightAmount.skin = skin;
    },
    
    /**
    * Set callback on touch end
    * @param {function} callback
    */
    setOnTouchEndCallback: function(callback) {
      this.onTouchEndCallback = callback;
    },
    
    /**
    * Get value from slider
    * @returns {number} value
    */
    getValue: function() {
      return this.currentValue;
    },
    
    /**
    * Set value to slider
    * @param {number} value - value to be set
    */
    setValue: function(value) {
      if(value >0){
        this.currentValue = parseFloat(value);
        this.view.sldSlider.selectedValue = this.currentValue;
      }
     },
    
    /**
    * Set minimum limit of slider
    * @param {number} value - value to be set
    */
    setMinimumLimit: function(value) {
      this.minValue = parseFloat(value);
      updateView.call(this);
    },
    
    /**
    * Set maximym limit of slider
    * @param {number} value - value to be set
    */
    setMaximumLimit: function(value) {
      this.maxValue = parseFloat(value);
      updateView.call(this);
    },
    
    /**
    * Set minimum limit of slider
    * @param {number} value - value to be set
    */
   getMinimumLimit: function() {
    return this.minValue ;
  },
  
  /**
  * Set maximym limit of slider
  * @param {number} value - value to be set
  */
  getMaximumLimit: function() {
    return this.maxValue ;
  }
  };
});