define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_b518abc205e84068be47bd5678813513: function AS_BarButtonItem_b518abc205e84068be47bd5678813513(eventobject) {
        var self = this;
        this.iphoneInformationIcononClick();
    },
    AS_BarButtonItem_g91fcba8dc7b459a9cccaef795b8b887: function AS_BarButtonItem_g91fcba8dc7b459a9cccaef795b8b887(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    /** preShow defined for frmManageTransferRecipient **/
    AS_Form_a61f5305a38044e4b521eedada9f4f32: function AS_Form_a61f5305a38044e4b521eedada9f4f32(eventobject) {
        var self = this;
        this.preShow();
    },
    /** postShow defined for frmManageTransferRecipient **/
    AS_Form_b00050818e924d5ababb842e1c9fba76: function AS_Form_b00050818e924d5ababb842e1c9fba76(eventobject) {
        var self = this;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    /** init defined for frmManageTransferRecipient **/
    AS_Form_b3085755712f4421a4c62ad367cd41c1: function AS_Form_b3085755712f4421a4c62ad367cd41c1(eventobject) {
        var self = this;
        this.init();
    }
});