define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_ebf923d10eff47afb54194adff6cd2cc: function AS_BarButtonItem_ebf923d10eff47afb54194adff6cd2cc(eventobject) {
        var self = this;
        this.onClickCancel();
    },
    AS_BarButtonItem_ffeff9d3ba2641b2adafbdf365c27cc4: function AS_BarButtonItem_ffeff9d3ba2641b2adafbdf365c27cc4(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    /** init defined for frmEnterBenAccNumorIBAN **/
    AS_Form_ae379a3fa4874bca8ef0643584ac1919: function AS_Form_ae379a3fa4874bca8ef0643584ac1919(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmEnterBenAccNumorIBAN **/
    AS_Form_d1dd2dbf49984316b0eca9d0fb1df3e9: function AS_Form_d1dd2dbf49984316b0eca9d0fb1df3e9(eventobject) {
        var self = this;
        return self.frmPreShow.call(this);
    }
});