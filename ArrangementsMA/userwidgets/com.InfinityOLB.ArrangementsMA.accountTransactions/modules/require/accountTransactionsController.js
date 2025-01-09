define(function() {

	return {
		enableSearchButton: function () {
			this.view.btnSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";
			this.view.btnSearch.setEnabled(true);
			this.view.btnSearch.hoverSkin = "sknbtnSSPffffff0278ee15pxbr3px";
			this.view.btnSearch.focusSkin="sknbtnSSPffffff0278ee15pxbr3px";
		},
		disableSearchButton: function () {
			this.view.btnSearch.setEnabled(false);
			this.view.btnSearch.skin="sknBtnBlockedSSPFFFFFF15Px";
			this.view.btnSearch.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";  
			this.view.btnSearch.focusSkin="sknBtnBlockedSSPFFFFFF15Px"; 
		},
		showByDateWidgets: function () {
			this.view.lblByDate.setVisibility(true);
			this.view.flxByDate.setVisibility(true);
			this.view.flxBlankSpace.setVisibility(false);
		},
		hideByDateWidgets: function () {
			this.view.lblByDate.setVisibility(false);
			this.view.flxByDate.setVisibility(false);
			this.view.flxBlankSpace.setVisibility(true);
		},
		setSearchVisible: function (isVisible,isMobile) {
			this.view.flxSeparatorSearch.setVisibility(isVisible);
			this.view.flxSearchContainer.setVisibility(isVisible);
            if(isVisible === true  && isMobile === true){
               // this.view.txtKeyword.setFocus(true);
               // this.view.lblByKeyword.setFocus(true);
            }
			this.view.imgSearch.src = (isVisible || this.view.flxSearchResults.isVisible) ? "selecetd_search.png": "search_blue.png"  			
		},
		setSearchResultsVisible : function(isVisible) {
			this.view.imgSearch.src = (isVisible || this.view.flxSearchContainer.isVisible) ? "selecetd_search.png": "search_blue.png"
			this.view.flxSeparatorSearch.setVisibility(isVisible);
			this.view.flxSearchResults.setVisibility(isVisible);
            if(isVisible === true){
              this.view.lblYouHaveSearchedFor.setFocus(true);
            }
		}
	};
});