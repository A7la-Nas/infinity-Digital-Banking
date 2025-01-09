define(['./CancelTransactionPopupBusinessController','./CancelTransactionPopupStore'], function(BusinessController, CancelTransactionPopupStore) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this.context = {};
      this.businessController = new BusinessController();
      CancelTransactionPopupStore.subscribe(this.renderSuccessOrFailureUI.bind(this));
      this.store = CancelTransactionPopupStore;
      this.businessController.store = this.store;
      this.collectionObj = CancelTransactionPopupStore.getState();
    },
    //Logic for getters/setters of custom properties
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
        },

    /**
	* @api : preShow
 	* Gets invoked initially before rendering of UI
	* @return : NA
	*/
    preShow: function() {
       var scope = this;
      this.businessController.setProperties(this._serviceParameters, this._dataFormatting, this._dataMapping);
      this.businessController.setDataInCollection(this.context);
      this.initActions();
    },
    
    
     /**
	* @api : initActions
 	* Gets invoked initially before rendering of UI
	* @return : NA
	*/ 
    
     initActions : function() {  
     var scope = this;
     var btnId1 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction1", this._dataMapping);
     var btnId2 = this.businessController.getDataBasedOnDataMapping("btnSuccessAction2", this._dataMapping);
     scope.view.BtnMessage.onClick = function() {
     scope.contextualActionButtonOnClick(btnId1);
    };
     scope.view.BtnCancel.onClick = function() {
     scope.contextualActionButtonOnClick(btnId2);
    };
   },

    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function(context) {
      var scope = this;
      try{
        this.context = context;
        this.preShow();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SetContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
     * @api : renderSuccessOrFailureUI
 	* Renders Success or Error Container
	* @return : NA
     */
    
    renderSuccessOrFailureUI : function() {
    var scope = this;
    var flag = this.businessController.getDataBasedOnDataMapping("flagCheck", this._dataMapping);
    if(flag === kony.i18n.getLocalizedString('i18n.payments.warning')){
      scope.view.flxPopup.width = "80%";
      scope.view.imgStatusIcon.bottom = "0dp";
      scope.view.imgStatusIcon.src = "infoappbar.png";
      scope.view.lblPopupHeader.width = "90%";
      scope.view.lblPopupHeader.text = this.businessController.getDataBasedOnDataMapping("lblWarnTitle", this._dataMapping);
      scope.view.lblPopupHeader.skin = "ICSknRobotoBold68Px";
      scope.view.lblPopupHeader.bottom = "0dp";
      scope.view.flxMessage2.setVisibility(false);
      scope.view.flxMessage1.setVisibility(true);
      scope.view.lblMessage1.skin = "ICSknLbl72727245px";
      scope.view.lblMessage1.text = this.businessController.getDataBasedOnDataMapping("messageDetails", this._dataMapping);
      scope.view.BtnCancel.setVisibility(true);
      scope.view.BtnMessage.bottom = "0dp";
      scope.view.BtnMessage.width = "90%";
      scope.view.BtnCancel.width = "90%";
      scope.view.BtnMessage.text = this.businessController.getDataBasedOnDataMapping("btnWarnTitle", this._dataMapping);
      scope.view.BtnCancel.text = this.businessController.getDataBasedOnDataMapping("btnCancelTitle", this._dataMapping);
      scope.view.BtnMessage.skin = "ICSknBtnF6F6F615px";
      scope.view.BtnCancel.skin = "ICSknBtnFFFFFF003E7515px";
      scope.view.lblReferenceNumber.setVisibility(false);
    } else {
      scope.view.flxMessage2.setVisibility(true);
      scope.view.flxMessage1.setVisibility(false);
      scope.setSuccessOrFailureAcknowledgementDetails();
      if(flag === false) {
      scope.view.flxPopup.width = "90%";
      scope.view.imgStatusIcon.bottom = "15dp";
      scope.view.imgStatusIcon.src = "failed.png";
      scope.view.lblPopupHeader.text = this.businessController.getDataBasedOnDataMapping("lblFailTitle", this._dataMapping);
      scope.view.lblPopupHeader.skin = "ICSknRobotoBold68Px";
      scope.view.lblPopupHeader.bottom = "0dp";
      scope.view.BtnMessage.bottom = "20dp";
      scope.view.BtnMessage.text = this.businessController.getDataBasedOnDataMapping("btnFailTitle", this._dataMapping);
      scope.view.BtnMessage.skin = "ICSknBtnFFFFFF003E7515px";
      scope.view.BtnCancel.setVisibility(false);
      scope.view.lblReferenceNumber.setVisibility(false);
    } else if(flag === true) {
      scope.view.flxPopup.width = "90%";
      scope.view.imgStatusIcon.bottom = "15dp";
      scope.view.imgStatusIcon.src = "greentickack.png";
      scope.view.lblPopupHeader.text = this.businessController.getDataBasedOnDataMapping("lblSuccessTitle", this._dataMapping);
      scope.view.lblPopupHeader.skin = "ICSknRobotoBold68Px";
      scope.view.lblPopupHeader.bottom = "10dp";
      scope.view.BtnMessage.bottom = "20dp";
      scope.view.BtnMessage.text = this.businessController.getDataBasedOnDataMapping("btnSuccessTitle", this._dataMapping);
      scope.view.BtnMessage.skin = "ICSknBtnF6F6F615px";
      var referenceText = this.businessController.getDataBasedOnDataMapping("lblReferenceText", this._dataMapping);
      var referenceID = this.businessController.getDataBasedOnDataMapping("lblReferenceID", this._dataMapping);
      scope.view.BtnCancel.setVisibility(false);
      scope.view.lblReferenceNumber.setVisibility(false);
      if((!scope.isEmptyNullUndefined(referenceText) && !scope.isEmptyNullUndefined(referenceID)))
      {
        scope.view.lblReferenceNumber.setVisibility(true);
        scope.view.lblReferenceNumber.text = referenceText + ": " + referenceID;
        scope.view.lblReferenceNumber.skin = "ICSknLbl72727245px";
      }
    } else {
      scope.view.flxPopup.width = "90%";
      scope.view.imgStatusIcon.bottom = "15dp";
      scope.view.imgStatusIcon.src = "warninground.png";
      scope.view.lblPopupHeader.text = this.businessController.getDataBasedOnDataMapping("lblSuccessTitle", this._dataMapping);
      scope.view.lblPopupHeader.skin = "ICSknRobotoBold68Px";
      scope.view.lblPopupHeader.bottom = "0dp";
      scope.view.BtnMessage.bottom = "20dp";
      scope.view.BtnMessage.text = this.businessController.getDataBasedOnDataMapping("btnSuccessTitle", this._dataMapping);
      scope.view.BtnMessage.skin = "ICSknBtnF6F6F615px";
      scope.view.BtnCancel.setVisibility(false);
      scope.view.lblReferenceNumber.setVisibility(false);
      }
   }
  },
  
   /**
       * Component setSuccessOrFailureAcknowledgementDetails
       * Reponsible to set the failure scknowledgment details in segment
       */
  setSuccessOrFailureAcknowledgementDetails : function()
  {
    {
     var scope = this;
      try{
        var messageDetails = this.businessController.getDataBasedOnDataMapping("messageDetails", this._dataMapping);
        if(messageDetails !== null && messageDetails !== "" && messageDetails !== undefined) {
        messageDetails = JSON.parse(messageDetails); 
        if (messageDetails.length > JSON.parse(this._dataMapping.maxLength)) {
            messageDetails = messageDetails.slice(0, JSON.parse(this._dataMapping.maxLength));
          }
        if(messageDetails.length>1) {
          for (i=0; i<messageDetails.length; i++)
          {
            messageDetails[i].imgIcon = "inactivegreydot.png";
          }
          scope.view.segMessageDetails.widgetDataMap = {"lblGenericMsgInfo":"message","imgIcon":"imgIcon"};
          scope.view.segMessageDetails.setData(messageDetails);
          scope.view.segMessageDetails.setVisibility(true);
        } else {
          messageDetails[0].imgIcon = "";
          scope.view.segMessageDetails.widgetDataMap = {"lblGenericMsgInfo":"message","imgIcon":"imgIcon"};
          scope.view.segMessageDetails.setData(messageDetails);
          scope.view.segMessageDetails.setVisibility(true);
        }
       } else {
          scope.view.segMessageDetails.setVisibility(false);
       }
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set success acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
       scope.onError(errorObj);
      }
      scope.view.forceLayout();
    }
  },
  
  /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
  isEmptyNullUndefined : function(data) {
    if (data === null || data === undefined || data === "")
      return true;

    return false;
  }
  };
});