define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_c3d24438b2a241389032a161e89d5a56: function AS_BarButtonItem_c3d24438b2a241389032a161e89d5a56(eventobject) {
        var self = this;
        return self.goBack.call(this);
    },
    AS_BarButtonItem_f89ce3215ea94c8c97202c090c2b124f: function AS_BarButtonItem_f89ce3215ea94c8c97202c090c2b124f(eventobject) {
        var self = this;
        this.onCancel();
    },
    /** onClick defined for btnNine **/
    AS_Button_b874a30780194781b743902cd6a9c901: function AS_Button_b874a30780194781b743902cd6a9c901(eventobject) {
        var self = this;
        this.setKeypadChar(9);
    },
    /** onClick defined for btnEight **/
    AS_Button_dbe99a4ad1034520ba1521c72da16d89: function AS_Button_dbe99a4ad1034520ba1521c72da16d89(eventobject) {
        var self = this;
        this.setKeypadChar(8);
    },
    /** onClick defined for btnFour **/
    AS_Button_dcbfa6fda52d42afb9b1a5e925929bd7: function AS_Button_dcbfa6fda52d42afb9b1a5e925929bd7(eventobject) {
        var self = this;
        this.setKeypadChar(4);
    },
    /** onClick defined for btnZero **/
    AS_Button_e56e668bcbc6486192e92b5cbfdc12ca: function AS_Button_e56e668bcbc6486192e92b5cbfdc12ca(eventobject) {
        var self = this;
        this.setKeypadChar(0);
    },
    /** onClick defined for btnSix **/
    AS_Button_e833b1c3516a426eb02d41eb6c5b288f: function AS_Button_e833b1c3516a426eb02d41eb6c5b288f(eventobject) {
        var self = this;
        this.setKeypadChar(6);
    },
    /** onClick defined for btnSeven **/
    AS_Button_f54cd4d798f74ae98ba45086cbbf50b6: function AS_Button_f54cd4d798f74ae98ba45086cbbf50b6(eventobject) {
        var self = this;
        this.setKeypadChar(7);
    },
    /** onClick defined for btnTwo **/
    AS_Button_f979a09590f54f1fb524be4032a533fe: function AS_Button_f979a09590f54f1fb524be4032a533fe(eventobject) {
        var self = this;
        this.setKeypadChar(2);
    },
    /** onClick defined for btnFive **/
    AS_Button_g6490ff8ab0b49638cdb0af863c330be: function AS_Button_g6490ff8ab0b49638cdb0af863c330be(eventobject) {
        var self = this;
        this.setKeypadChar(5);
    },
    /** onClick defined for btnOne **/
    AS_Button_j66da00585a548c28186a8e9a94caff9: function AS_Button_j66da00585a548c28186a8e9a94caff9(eventobject) {
        var self = this;
        this.setKeypadChar(1);
    },
    /** onClick defined for btnThree **/
    AS_Button_jf0b510478dc4f3d9121c0d59b245525: function AS_Button_jf0b510478dc4f3d9121c0d59b245525(eventobject) {
        var self = this;
        this.setKeypadChar(3);
    },
    /** preShow defined for frmTransfersPhoneNumberEurope **/
    AS_Form_ac12af6576434eb3929c224659cfba92: function AS_Form_ac12af6576434eb3929c224659cfba92(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmTransfersPhoneNumberEurope **/
    AS_Form_dfa2d6ccf2c34e81b4ccc6d28e81067b: function AS_Form_dfa2d6ccf2c34e81b4ccc6d28e81067b(eventobject) {
        var self = this;
        this.init();
    },
    /** onDownloadComplete defined for imgClearKeypad **/
    AS_Image_h92566d02fa64e6b81d186208d24e691: function AS_Image_h92566d02fa64e6b81d186208d24e691(eventobject, imagesrc, issuccess) {
        var self = this;
        this.clearKeypadChar();
    }
});