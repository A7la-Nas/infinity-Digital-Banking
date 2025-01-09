define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
		},
      setPopupDetails:function(popupDetails){
        
        this.view.lblPopupTitle.text = popupDetails.tranferType;
        this.view.lblPopupDescription.text = popupDetails.description;
        this.view.lblTermsCondtion.text = popupDetails.termsCondtion;
        this.view.lblPopupTitle.skin = popupDetails.popupTitleSkin;
        this.view.lblPopupDescription.skin = popupDetails.popupDescriptionSkn;
        this.view.lblTermsCondtionTitle.skin = popupDetails.termsConditionTitleSkn;
        this.view.lblTermsCondtion.skin = popupDetails.termsConditionSkn;
        this.view.btnClosePopup.skin = popupDetails.popupCloseBtnSkn;
        this.view.flxCloseImg.onTouchStart = this.closePopup;
        this.view.flxMainPopup.forceLayout();
        return this.view.flxMainPopup.clone();
        
      },
//       closePopupDes:function(){
//         this.closePopup();
//       }
	};
  
});