define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_d4ea816308094b858db68af0a42e5b6c: function AS_BarButtonItem_d4ea816308094b858db68af0a42e5b6c(eventobject) {
        var self = this;
        return self.onClickCancel.call(this);
    },
    AS_BarButtonItem_df102037a04e4916bd469a3cd9d5103e: function AS_BarButtonItem_df102037a04e4916bd469a3cd9d5103e(eventobject) {
        var self = this;
        return self.flxBackOnClick.call(this);
    },
    /** onClick defined for btnContinue **/
    AS_Button_hbfc0d68a6784cd18e567f09afebcb78: function AS_Button_hbfc0d68a6784cd18e567f09afebcb78(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "TransfersMA",
            "friendlyName": "frmBenNameEurope"
        });
        ntf.navigate();
    },
    /** init defined for frmtransfersIBANEurope **/
    AS_Form_aa217f7297e54858a9fbfbcbcc0099b9: function AS_Form_aa217f7297e54858a9fbfbcbcc0099b9(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmtransfersIBANEurope **/
    AS_Form_hdd9bd35abc04f7aa33b1c84ae187ef2: function AS_Form_hdd9bd35abc04f7aa33b1c84ae187ef2(eventobject) {
        var self = this;
        this.preShow();
    }
});