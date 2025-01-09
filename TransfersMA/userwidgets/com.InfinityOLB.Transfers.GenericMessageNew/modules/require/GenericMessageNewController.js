define(['./GenericMessageNewBusinessController','./GenericMessageNewStore'], function(businessController,GenericMessageNewStore) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.context = {};
      this.store = GenericMessageNewStore;
      GenericMessageNewStore.subscribe(this.render.bind(this));
      this.businessController = new businessController();
      this.businessController.store = this.store;
      this.collectionObj = GenericMessageNewStore.getState();
    },

    initGettersSetters: function() {
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
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
    },

    preShow: function() {
      this.view.flxCross.onClick = this.closepopup;
      
    },

    /**
	* @api : postShow
 	* Gets invoked initially after rendering of UI
	* @return : NA
	*/
    postShow: function() {
      var scope = this;
      try {
        this.businessController.setProperties(this.dataMapping);
        this.businessController.getGenericMessage(this.context);
      }
      catch(err) {
        var errObj =
            {
              "errorInfo": "Error in postShow method",
              "errorLevel": "Component",
              "error": err
            }
        //scope.onError(errObj);            
        }
    },
    
    setContext: function(context) {
      var scope = this;
      try{
        this.context = context;
        this.postShow();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SetContext",
              "error": err
            };
        //scope.onError(errorObj);
      }
    },
    /**
	* @api : onBreakPointChange
 	* Gets invoked on change of breakpoint in UI
	* @return : NA
	*/
    onBreakPointChange: function() {
      this.viewController.onBreakPointChange();
    },
    
        /**
    * @api : render
    * This method will be invoked when collection is updated to refresh UI
    * @return : NA
    */    
    render: function() {
      this.collectionObj = GenericMessageNewStore.getState();
      this.performUIActions();
    },
            /**
    * @api : performUIActions
    * This method will be used to set the UI 
    * @return : NA
    */  
	performUIActions : function() {
        var details = this.collectionObj.Slave["details"];
		var parsedData = "";
		var data = details["message"];
		this.view.lblSuccess.setVisibility(false);
		this.view.flxCross.setVisibility(false);
		this.view.RichTextMsg1.setVisibility(false);
		this.view.RichTextGenMsg.setVisibility(false);
        if(details["key"]){this.view.lblSuccess.text = details["key"];
        this.view.lblSuccess.setVisibility(true);
		this.view.flxCross.setVisibility(true);}
        this.view.imgErrorMessage.src = details["img"];
        this.view.flxMessageList.setVisibility(false);
		if(!data)return;
        if (typeof(data) !== "string") {
          if (data.length > 1) {
            this.view.flxMessageList.setVisibility(true);
            this.view.RichTextGenMsg.text = kony.i18n.getLocalizedString("i18n.common.PleaseFollow")
          } else {
            this.view.RichTextGenMsg.text = data[0].message;
          }
        }
        else{
          this.view.RichTextGenMsg.text = data;
        }
      for (var i = 0; i < data.length; i++) {
        parsedData += "<span style='color:#727272; font-size:2mm;position:relative;top:-3px;'>&#11044;&nbsp;&nbsp;&nbsp;</span>" + data[i].message + "<br aria-hidden=true>" + "<br aria-hidden=true>";
      }
		this.view.RichTextMsg1.text = parsedData;
		this.view.RichTextMsg1.setVisibility(true);
		this.view.RichTextGenMsg.setVisibility(true);
    }

    
  };
});