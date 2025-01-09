define(function() {
	
  	return {
      
      	constructor: function(baseConfig, layoutConfig, pspConfig) {
          	this._isI18nEnabled = true;
          	this._searchPlaceHolder = "Search";
          	this.invokePreShow();
        },
      
        initGettersSetters: function() {
            defineGetter(this, "isI18nEnabled", function() {
              return this._isI18nEnabled;
            });
          
            defineSetter(this,"isI18nEnabled", function(val){
              this._isI18nEnabled = val;
            });
          
            defineGetter(this, "searchBarPlaceholder", function() {
              return this._searchPlaceHolder;
            });

            defineSetter(this,"searchBarPlaceholder", function(val){
              this._searchPlaceHolder = val;
            });
        },
      
        invokePreShow : function(){
			this.setupView();
        },
      
        setupView : function() {
			this.view.tbxSearch.text = "";
            if(this._isI18nEnabled) {
                this.view.tbxSearch.placeholder = kony.i18n.getLocalizedString(this._searchPlaceHolder);
            }
            else {
              	this.view.tbxSearch.placeholder = this._searchPlaceHolder;
            }
        },
      	
      	clearFilterSelection: function() {
          this.view.listBoxViewType.selectedKeys = null;
        }
	};
});