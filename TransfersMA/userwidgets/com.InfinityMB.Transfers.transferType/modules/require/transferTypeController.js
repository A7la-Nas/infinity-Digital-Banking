define(['./transferTypeStore','./transferTypeBusinessController'], function(transferTypeStore, BusinessController) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._dataMapping = {};
      this.businessController = new BusinessController();
      this.controllerScope = this;
      transferTypeStore.subscribe(this.render.bind(this));
      this.store = transferTypeStore;
      this.context = {};
      this.businessController.store = this.store;
      this.collectionObj = transferTypeStore.getState();
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
    },
    /**
	* @api : onBreakPointChange
 	* Gets invoked on change of breakpoint in UI
	* @return : NA
	*/
    onBreakPointChange: function() {

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
      this.collectionObj = transferTypeStore.getState();
      var dataMapping = this.controllerScope.dataMapping;
    },
    /**
	* @api : initActions
 	* Actions of buttons are initialized
	* @return : NA
	*/  
    initActions : function() {
      var scope = this;
      this.view.rtLearnMore.onClick = this.showDescriptionPage.bind(this);
      this.view.btnAction1.onClick = this.buttonAction.bind(this,"MakeTransfer");
      this.view.btnAction2.onClick = this.buttonAction.bind(this,"AddNewAccount");
      this.view.imgBackBtn.onTouchEnd = this.closeDescription.bind(this);

    },

    bindFieldsData : function(){
      var scope=this;
      this.view.lblTransactionType.text = this.businessController.getParsedDataBasedOnDataMapping("lblTransactionType", this.controllerScope._dataMapping);
      this.view.rtLearnMore.linkSkin = "ICSknLink4176A439PXmb";
      this.view.rtLearnMore.linkFocusSkin = "ICSknLink4176A439PXmb";
      var btn1Entitlement = this.businessController.isEntitled(this.businessController.getDataBasedOnDataMapping("MakeTransfer", this.controllerScope._dataMapping["entitlements"]));
      var btn2Entitlement = this.businessController.isEntitled(this.businessController.getDataBasedOnDataMapping("AddNewAccount", this.controllerScope._dataMapping["entitlements"]));
      var descriptionText = this.businessController.getParsedDataBasedOnDataMapping("lblDescription", this.controllerScope._dataMapping);
      this.view.rtLearnMore.text =this.getShortDescription(descriptionText);
      if(btn1Entitlement && btn2Entitlement){
        this.view.btnAction1.setVisibility(true);
        this.view.btnAction2.setVisibility(true);
        this.view.flxSeperator2.setVisibility(true);
      }
      else if(btn1Entitlement){
        this.view.btnAction1.setVisibility(true);
        this.view.btnAction2.setVisibility(false);
        this.view.flxSeperator2.setVisibility(false);
      }
      else if(btn2Entitlement){
        this.view.btnAction1.setVisibility(false);
        this.view.btnAction2.setVisibility(true);
        this.view.flxSeperator2.setVisibility(false);
      }
      else {
        scope.controllerScope.hideTile();
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
      var moreLink  = "<a href = "+"#>"+this.businessController.getParsedDataBasedOnDataMapping("MoreLink", this.controllerScope._dataMapping)+"</a>"; 
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
          scope.view.flxDescriptionTop.setVisibility(false);
        } else {
          scope.view.flxDescriptionTop.setVisibility(true);
        }
      this.view.lblDescriptionHeading.text = this.businessController.getParsedDataBasedOnDataMapping("lblTransactionType", this.controllerScope._dataMapping);
      this.view.lblDescription.text = this.businessController.getParsedDataBasedOnDataMapping("lblDescription", this.controllerScope._dataMapping);
      this.view.btnDescriptionActionBtn1.onClick =this.buttonAction.bind(this, "MakeTransfer");
      this.view.btnDescriptionActionBtn2.onClick =this.buttonAction.bind(this, "AddNewAccount");
      this.view.imgTransDescriptionIcon.src = this.businessController.getParsedDataBasedOnDataMapping("imgTransDescriptionIcon", this.controllerScope._dataMapping);
      this.popupObj = this.view.flxDescriptionPage.clone();	
      form.add(this.popupObj);
      this.popupObj.isVisible = true;
      scope.controllerScope.enableHideDescription(visibleDesc);
      this.view.flxTransferTypes.forceLayout();  
    },
    /**
     * @api : buttonAction
     * Handles the action of btnAction1 and btnAction2
     * @return : NA
     */
    buttonAction:function(clickedButton){
      var scope=this;
      var selectedTransferType = { "transferType" : this.businessController.getParsedDataBasedOnDataMapping("transferType", this.controllerScope._dataMapping),
                                  "id" : clickedButton
                                 };
      scope.controllerScope.buttonActionHandling(selectedTransferType);
    },
    
     
    closeDescription:function(){
      var scope=this;
      var visibilityDesc = false;
      var currForm = kony.application.getCurrentForm();
      this.popupObj.isVisible = false;
      scope.controllerScope.enableHideDescription(visibilityDesc);
      currForm.remove(this.popupObj);
    }
  };
});