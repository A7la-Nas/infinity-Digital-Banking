define(function() {

    return {

        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._filterKeys = [];
        },
        init: function() {
        },

        searchAndFilterData: function(event) {
            var enteredText = this.view.TabSearchBarNew.tbxSearch.text;

            if (!kony.sdk.isNullOrUndefined(enteredText) && this._filterKeys.length) {
                this.view.TabBodyNew.searchAndSetCustomFilter(this._filterKeys, enteredText);
            }

        },
        setSearchData: function(arr) {
            this._filterKeys = arr;
        }
    };
});