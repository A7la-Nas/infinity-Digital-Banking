define(['ViewConstants'], function(ViewConstants) {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.pageSize = "";
      this.lowerLimit = 1;
      this.upperLimit = "";
      this.pageHeader = "";
      this.isMaxLimitReached = false;
      this.serviceDelegate = function(){};
    },

    onPreshow : function(){
      this.view.flxPaginationPrevious.onClick = this.onPreviousClick.bind(this);
      this.view.flxPaginationNext.onClick = this.onNextClick.bind(this);
      var imgSrc = kony.i18n.getCurrentLocale();
      if(imgSrc === "ar_AE")
      {
        this.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
        this.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        this.view .imgPaginationFirst.src = "pagination_last_active.png";
        this.view.imgPaginationLast.src = "pagination_inactive.png";
      }
      else
      {
        this.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        this.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
        this.view .imgPaginationFirst.src = "pagination_inactive.png";
        this.view.imgPaginationLast.src = "pagination_last_active.png";
      }
      this.setAccessibility();
    },

    setLowerLimit : function(lowerLimit){
      this.lowerLimit = lowerLimit;
    },

    setPageSize : function(pageSize){
      this.pageSize = pageSize;
      this.upperLimit = pageSize;
    },

    getPageSize : function(){
      return this.pageSize;
    },

    getPageOffset : function(){
      return this.upperLimit - this.pageSize;
    },

    setPageHeader : function(pageHeader){
      this.pageHeader = pageHeader;
    },

    getPageHeader : function(){
      return this.pageHeader;
    },

    getIntervalHeader : function(){
      return this.lowerLimit + " - " + this.upperLimit +"  "+ this.pageHeader;
    },

    setIntervalHeader : function(){
      this.view.lblPagination.text = this.getIntervalHeader();
      this.view.lblPagination.accessibilityConfig = {
        "a11yLabel": this.view.lblPagination.text
      };
    },

    getIntervalHeaderForBulkpayments : function(){
      return this.lowerLimit + " - " + this.upperLimit +" of " + this.upperLimit + " " + this.pageHeader;
    },

    setIntervalHeaderForBulkpayments : function(){
      this.view.lblPagination.text = this.getIntervalHeaderForBulkpayments();
      this.view.lblPagination.accessibilityConfig = {
        "a11yLabel": this.view.lblPagination.text
      };
    },

    setIsMaxLimitReached : function(isMaxLimitReached){
      this.isMaxLimitReached = isMaxLimitReached;
    },

    getIsMaxLimitReached : function(){
      return this.isMaxLimitReached;
    },

    updatePaginationLimitsForPreviousData : function(){
      if(this.lowerLimit !== 1){
        this.lowerLimit -= this.pageSize;
        this.upperLimit -= this.pageSize;
      }
      if(this.upperLimit<this.pageSize)
      {
        this.upperLimit = this.pageSize+this.lowerLimit-1;
      }
    },

    updatePaginationLimitsForNextData : function(){
      if(!this.isMaxLimitReached){
        this.lowerLimit += this.pageSize;
        this.upperLimit += this.pageSize;
      }
      if(this.lowerLimit>this.upperLimit)
      {
        this.upperLimit = this.lowerLimit+9;
      }
    },

    setServiceDelegate : function(serviceDelegate){
      this.serviceDelegate = serviceDelegate;
    },

    updateUI: function() {
      var previous = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
      var next = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
      var accessPrevious = {};
      var accessNext = {};
      if (this.lowerLimit === 1) {
        previous = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        accessPrevious = {
          "a11yARIA": {
            "role": "button"
          },
          "a11yLabel": kony.i18n.getLocalizedString("konybb.previousPage") 
        };
      }
      if (this.isMaxLimitReached) {
        next = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
        accessNext = {
          "a11yARIA": {
            "role": "button"
          },
          "a11yLabel": kony.i18n.getLocalizedString("konybb.nextPage") 
        };
      }
     
      if ( kony.i18n.getCurrentLocale()=== "ar_AE"){
        this.view.imgPaginationPrevious.src = next;
        this.view.flxPaginationPrevious.accessibilityConfig = accessPrevious ;
        this.view.imgPaginationNext.src = previous;
        this.view.flxPaginationNext.accessibilityConfig = accessNext ;
      }else {
        this.view.imgPaginationPrevious.src = previous;
        this.view.flxPaginationPrevious.accessibilityConfig = accessPrevious ;
        this.view.imgPaginationNext.src = next;
        this.view.flxPaginationNext.accessibilityConfig = accessNext ;
      }

  
    },

    setAccessibility: function(){
      this.view.flxPaginationLast.accessibilityConfig = {
        "a11yLabel": "Last page",
        "a11yARIA": {
          "role": "button"
        }
      }
        this.view.flxPaginationNext.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("konybb.nextPage") ,
        "a11yARIA" : {
          "role" : "button"
        }
      }
      this.view.flxPaginationPrevious.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("konybb.previousPage"),
        "a11yARIA": {
          "role": "button"
        }
      }
        this.view.flxPaginationFirst.accessibilityConfig = {
        "a11yLabel": "First page",
        "a11yARIA": {
          "role": "button"
        }
      }
    },

    onNextClick : function(){
      if(this.view.imgPaginationNext.src !== ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE){
        this.updatePaginationLimitsForNextData();
        this.setIntervalHeader();
        if(!kony.sdk.isNullOrUndefined(this.serviceDelegate)){
          this.serviceDelegate();
        }
      }
    },

    onPreviousClick : function(){
      if(this.view.imgPaginationPrevious.src !== ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE){
        this.updatePaginationLimitsForPreviousData();
        this.setIntervalHeader();
        if(!kony.sdk.isNullOrUndefined(this.serviceDelegate)){
          this.serviceDelegate();
        }
      }
    },

    setPaginationText: function(upperlimit) {
      this.view.lblPagination.text = this.getPaginationtext(upperlimit);
      this.view.lblPagination.accessibilityConfig = {
        "a11yLabel": this.view.lblPagination.text
      };
    },

    getPaginationtext: function(upperlimit) {
      return this.lowerLimit + " - " + upperlimit + " of " + upperlimit + " " + this.pageHeader;
    }
  };
});