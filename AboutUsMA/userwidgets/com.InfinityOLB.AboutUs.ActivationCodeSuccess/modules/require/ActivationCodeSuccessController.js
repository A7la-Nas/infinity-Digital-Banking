define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._headerBgSkin="";
      this._headerTextSkin="";
      this._screenTitleSkin="";
      this._screenDescTextSkin="";
      this._btnSubmitSkin="";

      this._greenTickImg="";

      this._headerText="";
      this._screenTitleText="";
      this._screenDescriptionText="";
      this._submitBtnText="";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "headerBgSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._headerBgSkin=val;
        }
      });
      defineGetter(this, "headerBgSkin", function(){
        return this._headerBgSkin;
      });
      defineSetter(this, "headerTextSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._headerTextSkin=val;
        }
      });
      defineGetter(this, "headerTextSkin", function(){
        return this._headerTextSkin;
      });
      defineSetter(this, "screenTitleSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._screenTitleSkin=val;
        }
      });
      defineGetter(this, "screenTitleSkin", function(){
        return this._screenTitleSkin;
      });
      defineSetter(this, "screenDescTextSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._screenDescTextSkin=val;
        }
      });
      defineGetter(this, "screenDescTextSkin", function(){
        return this._screenDescTextSkin;
      });
      defineSetter(this, "btnSubmitSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._btnSubmitSkin=val;
        }
      });
      defineGetter(this, "btnSubmitSkin", function(){
        return this._btnSubmitSkin;
      });
      defineSetter(this, "greenTickImg", function(val){
        if((typeof val=="string") && (val != "")){
          this._greenTickImg=val;
        }
      });
      defineGetter(this, "greenTickImg", function(){
        return this._greenTickImg;
      });
      defineSetter(this, "headerText", function(val){
        if((typeof val=="string") && (val != "")){
          this._headerText=val;
        }
      });
      defineGetter(this, "headerText", function(){
        return this._headerText;
      });
      defineSetter(this, "screenTitleText", function(val){
        if((typeof val=="string") && (val != "")){
          this._screenTitleText=val;
        }
      });
      defineGetter(this, "screenTitleText", function(){
        return this._screenTitleText;
      });
      defineSetter(this, "screenDescriptionText", function(val){
        if((typeof val=="string") && (val != "")){
          this._screenDescriptionText=val;
        }
      });
      defineGetter(this, "screenDescriptionText", function(){
        return this._screenDescriptionText;
      });
      defineSetter(this, "submitBtnText", function(val){
        if((typeof val=="string") && (val != "")){
          this._submitBtnText=val;
        }
      });
      defineGetter(this, "submitBtnText", function(){
        return this._submitBtnText;
      });
    },
    
    preShowActivationCode: function(){
      this.setTextFromi18n();
      this.resetUI();
      this.setFlowActions();
    },
    
    resetUI: function(){
      this.assignDefaultSkins();
      this.assignDefaultImages();
      this.assignDefaultText();
    },
    
    assignDefaultSkins: function(){
      this.view.flxHeader.skin = this._headerBgSkin;
      this.view.lblScreenName.skin = this._headerTextSkin;
      this.view.lblActivatedSuccessfully.skin = this._screenTitleSkin;
      this.view.lblActivationDescription.skin = this._screenDescTextSkin;
      this.view.btnActivateAccount.skin = this._btnSubmitSkin;
    },
    
    assignDefaultImages: function(){
      this.view.imgGreenTick.src = this._greenTickImg;
    },
    
    assignDefaultText: function(){
      this.view.lblScreenName.text = this._headerText;
      this.view.lblActivatedSuccessfully.text = this._screenTitleText;
      this.view.lblActivationDescription.text = this._screenDescriptionText;
      this.view.btnActivateAccount.text = this._submitBtnText;
    },
    
    setTextFromi18n: function(){
      this._headerText = this.getStringFromi18n(this._headerText);
      this._screenTitleText = this.getStringFromi18n(this._screenTitleText);
      this._screenDescriptionText = this.getStringFromi18n(this._screenDescriptionText);
      this._submitBtnText = this.getStringFromi18n(this._submitBtnText);
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },
    
    setFlowActions: function(){
      const scopeObj = this;
      this.view.btnActivateAccount.onClick = function(){
        if(scopeObj.closeComponent) scopeObj.closeComponent();
      };
    },
  };
});