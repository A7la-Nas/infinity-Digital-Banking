define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for SearchAndFilter **/
    AS_FlexContainer_a2ed2b596b24436bb131bb2ede554275: function AS_FlexContainer_a2ed2b596b24436bb131bb2ede554275(eventobject) {
        var self = this;
        return self.preShow.call(this);
    },
    /** onClick defined for flxCollapseFilter **/
    AS_FlexContainer_j0350ca92e564ff3a308286fb4f6c3fe: function AS_FlexContainer_j0350ca92e564ff3a308286fb4f6c3fe(eventobject) {
        var self = this;
        this.view.flxFiltersList.setVisibility(false);
    },
    /** onTextChange defined for txtSearchBox **/
    AS_TextField_bc23ef977b234f08a4e0c4a2f447df62: function AS_TextField_bc23ef977b234f08a4e0c4a2f447df62(eventobject, changedtext) {
        var self = this;
        return self.searchTextChange.call(this);
    }
});