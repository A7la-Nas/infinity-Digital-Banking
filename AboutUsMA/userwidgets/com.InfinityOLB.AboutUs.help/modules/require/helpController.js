define({
	preshowFunction : function(){
		this.setFlowActions();
		this.view.postShow = this.postShow;
	},
	postShow : function(){
		this.view.flxSubMenu1.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tablist",
			  "tabindex":-1
		  }
		}
		this.view.flxSubMenu1Option1.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":true
		  }
		}
		this.view.flxSubMenu1Option2.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu1Option3.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu1Option4.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu2.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tablist",
			  "tabindex":-1
		  }
		}
		this.view.flxSubMenu2Option1.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu2Option2.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu2Option3.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu2Option4.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu3.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tablist",
			  "tabindex":-1
		  }
		}
		this.view.flxSubMenu3Option1.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
		this.view.flxSubMenu3Option2.accessibilityConfig = {
		  a11yARIA:{
			  "role":"tab",
			  "tabindex":0,
			  "aria-selected":false
		  }
		}
	  },
	renderHelp:function(){
		var height=(this.view.flxSearch.isVisible?80:0)+this.view.flxHelpDetails.frame.height;
		if (height<700) {
			this.view.flxRight.height="700px";
			this.view.flxSeperator1.height="700px";
		} else if (height<1400 ){
			this.view.flxRight.height=height+"px";
			this.view.flxSeperator1.height=height+"px";
		} else{
			this.view.flxRight.height="1400px";
			this.view.flxSeperator1.height="1400px";
		}
	},
	setFlowActions:function(){
		var scopeObj=this;
		this.view.imgSearchIcon.onClick=function(){
			scopeObj.toggleSearch();
		};
		this.view.flxClearSearch.onClick=function(){
			scopeObj.clearSearch();
		};
		this.view.flxMenu1.onClick=function(){
			scopeObj.toggleSubMenu(1);
		};
		this.view.flxMenu2.onClick=function(){
			scopeObj.toggleSubMenu(2);
		};
		this.view.flxMenu3.onClick=function(){
			scopeObj.toggleSubMenu(3);
		};
		this.view.tbxHelpSearch.onKeyUp=function(){
			scopeObj.view.flxClearSearch.setVisibility(true);
		};
	},
	toggleSearch:function(){
		if (this.view.flxSearch.isVisible) {
			this.view.flxSearch.setVisibility(false);
			this.clearSearch();
		} else {
			this.view.flxSearch.setVisibility(true);
		}
		this.renderHelp();
	},
	clearSearch:function(){
		this.view.tbxHelpSearch.text="";
		this.view.flxClearSearch.setVisibility(false);
	},
	toggleSubMenu:function(menuNo){
		if (this.view["flxSubMenu"+menuNo].frame.height>0) {
			this.hideSubMenu(this.view["flxSubMenu"+menuNo]);
		} else {
			this.showSubMenu(this.view["flxSubMenu"+menuNo]);
		}
	},
	showSubMenu : function(subMenuFlex){
		var height=(subMenuFlex.widgets().length*40)+"px";
		var animationDefinition = {
			0: {
				"height": "0px"
			},
			100: {
				"height": height
			}
		};
		var animationConfiguration = {
			duration: 0.5,
			fillMode: kony.anim.FILL_MODE_FORWARDS
		};
		var callbacks = {
			animationEnd: function() {
				kony.print("sub menu show animation done");
			}
		};
		var animationDef = kony.ui.createAnimation(animationDefinition);
		subMenuFlex.animate(animationDef, animationConfiguration, callbacks);		
	},
	hideSubMenu : function(subMenuFlex){
		var animationDefinition = {
			0: {
				"height": subMenuFlex.frame.height+"px"
			},
			100: {
				"height": "0px"
			}
		};
		var animationConfiguration = {
			duration: 0.5,
			fillMode: kony.anim.FILL_MODE_FORWARDS
		};
		var callbacks = {
			animationEnd: function() {
				kony.print("sub menu hide animation done");
			}
		};
		var animationDef = kony.ui.createAnimation(animationDefinition);
		subMenuFlex.animate(animationDef, animationConfiguration, callbacks);		
	},
});