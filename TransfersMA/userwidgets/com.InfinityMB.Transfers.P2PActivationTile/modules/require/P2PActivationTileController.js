define(['./P2PActivationTileBusinessController', './P2PActivationTileStore'], function(BusinessController, P2PActivationTileStore) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._dataMapping = {};
      this.businessController = new BusinessController();
      P2PActivationTileStore.subscribe(this.render.bind(this));
      this.store = P2PActivationTileStore;
      this.collectionObj = P2PActivationTileStore.getState();
      this.businessController.store = this.store;
      this.popupObj = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'dataMapping', () => {
                return this._dataMapping;
            });
            defineSetter(this, 'dataMapping', value => {
                this._dataMapping = value;
            });
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
        },
    /**
	* @api : preShow
 	* Gets invoked initially before rendering of UI
	* @return : NA
	*/
    preShow: function() {
      var scope = this;
      try {
        this.businessController.setDataInCollection(this.context);
        this.initActions();
        this.bindFieldsData();
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
    postShow: function() {
      var scope = this;
      try {
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "postShow",
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
    onBreakPointChange: function() {
      var scope = this;
      try{
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onBreakpointChange",
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
    setContext: function(context) {
      var scope = this;
      try {
        this.context = context;
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "SetContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  
  /**
	* @api : render
	* This method will be invoked when collection is updated to refresh UI
	* @return : NA
	*/
  render : function() {
    this.collectionObj = P2PActivationTileStore.getState();
     var dataMapping = this.dataMapping;
  },
  /**
	* @api : initActions
 	* Actions of buttons are initialized
	* @return : NA
	*/  
  initActions : function() {
    var scope = this;
    this.view.flxTransactionType.setVisibility(true);
    this.view.flxDescriptionPage.setVisibility(false);
    this.view.rtLearnMore.onClick = this.showDescriptionPage.bind(this);
    this.view.btnAction1.onClick = this.buttonActionHandling.bind(this, scope.businessController.getDataBasedOnDataMapping("btnAction1Label", this._dataMapping));
    this.view.imgBackBtn.onTouchEnd = this.closeDescription.bind(this);
  },
  
  bindFieldsData : function(){
    var scope=this;
    var btn1Entitlement = "";
    this.view.lblTransactionType.text = this.businessController.getDataBasedOnDataMapping("lblTransactionType", this._dataMapping);
    this.view.rtLearnMore.linkSkin = "ICSknLink4176A439PXmb";
    this.view.rtLearnMore.linkFocusSkin = "ICSknLink4176A439PXmb";
    var btnAction1Entitlement = this.businessController.getDataBasedOnDataMapping("btnAction1", this._dataMapping);
    if(!kony.sdk.isNullOrUndefined(btnAction1Entitlement) && btnAction1Entitlement !== "") {
      btn1Entitlement = this.businessController.isEntitled(this.businessController.getDataBasedOnDataMapping("btnAction1", this._dataMapping));
     } else {
      btn1Entitlement = true;
     }
    var descriptionText = this.businessController.getDataBasedOnDataMapping("lblDescription", this._dataMapping);
    this.view.rtLearnMore.text =this.getShortDescription(descriptionText);
    var btnAction1Label = scope.businessController.getDataBasedOnDataMapping("btnAction1Label", this._dataMapping);
    if(btn1Entitlement && !kony.sdk.isNullOrUndefined(btnAction1Label) && btnAction1Label !== "") {
      this.view.btnAction1.text = this.businessController.getDataBasedOnDataMapping("btnAction1Label", this._dataMapping);
      this.view.btnAction1.setVisibility(true);
    }
    else {
      scope.hideTile();
    }
    this.view.flxTransferTypes.forceLayout();
  },
  
 /**
     * @api : getShortDescription
     * Get formatted short description with the link
     * @return : short text
     */
  getShortDescription : function(description) {
    var descriptionRender=60;
    var moreLink  = "<a href = "+"#>"+this.businessController.getDataBasedOnDataMapping("MoreLink", this._dataMapping)+"</a>"; 
    var shortText = description.slice(0,descriptionRender) + "..." + moreLink;       
    return shortText;
  },
  /**
     * @api : getMappedValueForWidget
     * Get mapped data of the corresponding widget
     * @return : mapped value
     */
  getMappedValueForWidget : function(widget, dataMapping) {
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      for(var key in keyValues) {
        if(widget === key) {
          var fieldValue = dataMapping[record][widget];
          fieldValue = fieldValue.split(".")[3].replace("}","");
          return fieldValue;
        }
      }
    }
  },
  /**
     * @api : showDescriptionPage
     * Shows the description popup on click of learn more link
     * @return : NA
     */
    showDescriptionPage : function(){
    var form = kony.application.getCurrentForm();
    var scope=this;
    var visibleDesc = "true";
    if(kony.os.deviceInfo().name === "iPhone") {
      this.view.flxDescriptionTop.setVisibility(false);
    } else {
      this.view.flxDescriptionTop.setVisibility(true);
    }
    this.view.lblDescriptionHeading.text = this.businessController.getDataBasedOnDataMapping("lblTransactionType", this._dataMapping);
    this.view.lblDescription.text = this.businessController.getDataBasedOnDataMapping("lblDescription", this._dataMapping);
    this.view.btnDescriptionActionBtn1.text = scope.businessController.getDataBasedOnDataMapping("btnAction1Label", this._dataMapping);
    this.view.btnDescriptionActionBtn1.onClick =this.buttonActionHandling.bind(this, scope.businessController.getDataBasedOnDataMapping("btnAction1Label", this._dataMapping));
    this.view.imgTransDescriptionIcon.src = this.businessController.getDataBasedOnDataMapping("imgTransDescriptionIcon", this._dataMapping);
    this.popupObj = this.view.flxDescriptionPage.clone();	
    form.add(this.popupObj);
    this.popupObj.isVisible = true;
    scope.enableHideDescription(visibleDesc);
    this.view.flxTransferTypes.forceLayout();  
  },
  /**
     * @api : buttonActionHandling
     * Handles the action of btnAction1 and btnAction2
     * @return : NA
     */
   buttonActionHandling : function(clickedButton) {
    var scope=this;
    var selectedTransferType = { 
      "transferType" : this.businessController.getDataBasedOnDataMapping("transferType", this._dataMapping),
       "id" : clickedButton
      };
    scope.buttonActionHandling(selectedTransferType);
  },

   closeDescription : function(){
    var scope=this;
    var visibilityDesc = false;
    var currForm = kony.application.getCurrentForm();
    scope.enableHideDescription(visibilityDesc);
    currForm.remove(this.popupObj);
  },
  };
});