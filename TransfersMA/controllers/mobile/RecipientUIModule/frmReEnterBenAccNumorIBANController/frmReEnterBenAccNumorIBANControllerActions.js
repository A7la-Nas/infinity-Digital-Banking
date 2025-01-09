define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_edf9be6c648b4d48901c5ef5b9740e57: function AS_BarButtonItem_edf9be6c648b4d48901c5ef5b9740e57(eventobject) {
        var self = this;
        this.onClickCancel();
    },
    AS_BarButtonItem_hb197826046f4564a5cd2e131567a140: function AS_BarButtonItem_hb197826046f4564a5cd2e131567a140(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    /** init defined for frmReEnterBenAccNumorIBAN **/
    AS_Form_f4fe0105a0bf410a95554a63abee029d: function AS_Form_f4fe0105a0bf410a95554a63abee029d(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmReEnterBenAccNumorIBAN **/
    AS_Form_if6474b67cf145fd8aea746388b27351: function AS_Form_if6474b67cf145fd8aea746388b27351(eventobject) {
        var self = this;
        return self.frmPreShow.call(this);
    }
});